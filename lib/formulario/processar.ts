// Processamento do pedido de agendamento (Etapa 10). Roda na Função da Cloudflare (functions/api/agendamento.ts).
// Fluxo aprovado (docs/SCHEMA.md, 14/10/2026): antirrobô → validação → banco E aviso por e-mail em paralelo →
// sucesso se pelo menos um deu certo → confirmação ao visitante. Nunca devolve detalhe técnico ao navegador.

import { pedido as esquemaDoPedido, digitosDoTelefone, errosPorCampo, VERSAO_POLITICA, type Pedido } from "./esquema";

export type Ambiente = {
  SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
  RESEND_API_KEY?: string;
  /** E-mail institucional que recebe o aviso de cada pedido. */
  LEAD_NOTIFY_TO?: string;
  /** Remetente dos e-mails, ex.: "Black River Consultoria <site@blackriverconsultoria.com.br>". */
  EMAIL_FROM?: string;
  TURNSTILE_SECRET_KEY?: string;
  /** Origens aceitas, separadas por vírgula (ex.: "https://www.blackriverconsultoria.com.br"). */
  ALLOWED_ORIGINS?: string;
  /** Só para testes locais: endereços falsos dos serviços externos. */
  TURNSTILE_VERIFY_URL?: string;
  RESEND_API_URL?: string;
};

export type Resposta = { status: number; corpo: Record<string, unknown> };

type Dependencias = { fetch: typeof fetch; ip?: string | null; origem?: string | null; log?: (msg: string) => void };

const NOMES_DAS_FRENTES: Record<string, string> = {
  diagnostico: "Análise e Diagnóstico de Operações Logísticas",
  projeto_cd: "Projeto de Centro de Distribuição",
  eficiencia_cd: "Eficiência Operacional em Centro de Distribuição",
  abastecimento_estoques: "Gestão de Abastecimento e Estoques",
  verbas_logisticas: "Negociação de Verbas Logísticas com Fornecedores",
  tecnologia: "Tecnologia da Informação aplicada a Supply Chain",
  transporte_malha: "Transporte e Malha Logística",
  nao_sei: "Ainda não sabe",
};

const ERRO_GERAL = { ok: false, erro: "envio" };

export async function processarPedido(corpoBruto: unknown, env: Ambiente, deps: Dependencias): Promise<Resposta> {
  const log = deps.log ?? (() => {});

  // 1. Origem: só o próprio site envia (navegadores sempre mandam o cabeçalho Origin num POST).
  const permitidas = (env.ALLOWED_ORIGINS ?? "").split(",").map((o) => o.trim()).filter(Boolean);
  if (permitidas.length && deps.origem && !permitidas.includes(deps.origem)) {
    log(`origem recusada: ${deps.origem}`);
    return { status: 403, corpo: ERRO_GERAL };
  }

  // 2. Armadilha para robôs (campo invisível preenchido): responde como se tivesse dado certo e não faz nada.
  //    Vem antes da validação para o robô nunca receber pistas sobre os campos.
  const armadilha = (corpoBruto as { site?: unknown } | null)?.site;
  if (typeof armadilha === "string" && armadilha.trim() !== "") {
    log("honeypot preenchido: pedido descartado");
    return { status: 200, corpo: { ok: true } };
  }

  // 3. Formato e regras de cada campo.
  const resultado = esquemaDoPedido.safeParse(corpoBruto);
  if (!resultado.success) {
    return { status: 422, corpo: { ok: false, erro: "campos", campos: errosPorCampo(resultado) } };
  }
  const p = resultado.data;

  // 4. Turnstile (antirrobô da Cloudflare).
  if (!(await turnstileValido(p.turnstile, env, deps))) {
    log("turnstile recusado");
    return { status: 403, corpo: { ok: false, erro: "robo" } };
  }

  // 5. Banco e aviso por e-mail em paralelo, um independente do outro.
  const [banco, aviso] = await Promise.allSettled([gravarNoBanco(p, env, deps), enviarAviso(p, env, deps, null)]);
  const gravou = banco.status === "fulfilled";
  const avisou = aviso.status === "fulfilled";
  if (!gravou) log(`banco falhou: ${motivo(banco)}`);
  if (!avisou) log(`aviso por e-mail falhou: ${motivo(aviso)}`);

  if (!gravou && !avisou) return { status: 502, corpo: ERRO_GERAL };

  // Banco fora do ar, aviso enviado: manda um segundo aviso curto deixando claro que o pedido não está no banco.
  if (!gravou) {
    await enviarAviso(p, env, deps, "Atenção: este pedido NÃO foi gravado no banco (Supabase fora do ar). Guarde este e-mail.").catch(
      (e) => log(`aviso de falha do banco não saiu: ${String(e)}`),
    );
  }

  // 6. Confirmação ao visitante (não muda a resposta se falhar).
  await enviarConfirmacao(p, env, deps).catch((e) => log(`confirmação ao visitante falhou: ${String(e)}`));

  return { status: 200, corpo: { ok: true } };
}

function motivo(r: PromiseSettledResult<unknown>) {
  return r.status === "rejected" ? String(r.reason) : "";
}

async function turnstileValido(token: string | undefined, env: Ambiente, deps: Dependencias) {
  if (!token || !env.TURNSTILE_SECRET_KEY) return false;
  const corpo = new URLSearchParams({ secret: env.TURNSTILE_SECRET_KEY, response: token });
  if (deps.ip) corpo.set("remoteip", deps.ip);
  try {
    const r = await deps.fetch(env.TURNSTILE_VERIFY_URL ?? "https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: corpo,
    });
    const dados = (await r.json()) as { success?: boolean };
    return dados.success === true;
  } catch {
    return false;
  }
}

async function gravarNoBanco(p: Pedido, env: Ambiente, deps: Dependencias) {
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) throw new Error("Supabase não configurado");
  const linha = {
    nome: p.nome,
    email: p.email,
    empresa: p.empresa,
    cargo: p.cargo,
    telefone: digitosDoTelefone(p.telefone),
    modulo_interesse: p.modulo_interesse ?? null,
    pagina_origem: p.pagina_origem ?? null,
    utm_source: p.utm_source ?? null,
    utm_medium: p.utm_medium ?? null,
    utm_campaign: p.utm_campaign ?? null,
    consentimento_lgpd: true,
    versao_politica: VERSAO_POLITICA,
  };
  const r = await deps.fetch(`${env.SUPABASE_URL}/rest/v1/leads`, {
    method: "POST",
    headers: {
      apikey: env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(linha),
  });
  if (!r.ok) throw new Error(`Supabase ${r.status}`);
}

async function enviarEmail(env: Ambiente, deps: Dependencias, para: string, assunto: string, texto: string, responderPara?: string) {
  if (!env.RESEND_API_KEY || !env.EMAIL_FROM) throw new Error("Resend não configurado");
  const r = await deps.fetch(env.RESEND_API_URL ?? "https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: env.EMAIL_FROM, to: [para], subject: assunto, text: texto, reply_to: responderPara }),
  });
  if (!r.ok) throw new Error(`Resend ${r.status}`);
}

/** Aviso interno: todos os campos, com o visitante como "responder para". */
async function enviarAviso(p: Pedido, env: Ambiente, deps: Dependencias, alerta: string | null) {
  if (!env.LEAD_NOTIFY_TO) throw new Error("LEAD_NOTIFY_TO não configurado");
  const linhas = [
    alerta,
    alerta ? "" : null,
    `Nome: ${p.nome}`,
    `E-mail: ${p.email}`,
    `Empresa: ${p.empresa}`,
    `Cargo: ${p.cargo}`,
    `Telefone/WhatsApp: ${p.telefone}`,
    `Frente de trabalho: ${p.modulo_interesse ? NOMES_DAS_FRENTES[p.modulo_interesse] : "não informada"}`,
    `Página de origem: ${p.pagina_origem ?? "não informada"}`,
    p.utm_source || p.utm_medium || p.utm_campaign
      ? `Campanha: ${[p.utm_source, p.utm_medium, p.utm_campaign].filter(Boolean).join(" / ")}`
      : null,
    "",
    "Prazo combinado no site: retorno em até 1 dia útil.",
    "Registro no painel do Supabase: tabela leads (status inicial: novo).",
  ].filter((l): l is string => l !== null);
  const assunto = `${alerta ? "[NÃO GRAVADO] " : ""}Novo pedido de diagnóstico — ${p.empresa}`;
  await enviarEmail(env, deps, env.LEAD_NOTIFY_TO, assunto, linhas.join("\n"), p.email);
}

/** Confirmação ao visitante. Formato provisório até a pendência #5 (e-mail com case ou conteúdo útil). */
async function enviarConfirmacao(p: Pedido, env: Ambiente, deps: Dependencias) {
  const primeiroNome = p.nome.split(/\s+/)[0];
  const texto = [
    `Olá, ${primeiroNome}.`,
    "",
    "Recebemos o seu pedido de conversa de diagnóstico. A Black River vai entrar em contato em até 1 dia útil para marcar a data e o formato, online ou presencial.",
    "",
    "Enquanto isso, leia o que aprendemos dentro das operações: https://www.blackriverconsultoria.com.br/insights",
    "",
    "Black River Consultoria",
    "https://www.blackriverconsultoria.com.br",
  ].join("\n");
  await enviarEmail(env, deps, p.email, "Recebemos o seu pedido — Black River Consultoria", texto, env.LEAD_NOTIFY_TO);
}
