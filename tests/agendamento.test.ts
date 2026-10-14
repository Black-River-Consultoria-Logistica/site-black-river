// Testes da Função do formulário (Etapa 10): todos os caminhos do APP_FLOW, sem internet.
// Rodar: npm test. Os serviços externos (Turnstile, Supabase, Resend) são simulados.

import { test } from "node:test";
import assert from "node:assert/strict";
import { processarPedido, type Ambiente } from "../lib/formulario/processar";
import { telefoneValido } from "../lib/formulario/esquema";

const ENV: Ambiente = {
  SUPABASE_URL: "https://banco.teste",
  SUPABASE_SERVICE_ROLE_KEY: "chave-de-servico-de-teste",
  RESEND_API_KEY: "chave-resend-de-teste",
  LEAD_NOTIFY_TO: "avisos@empresa.teste",
  EMAIL_FROM: "Site <site@empresa.teste>",
  TURNSTILE_SECRET_KEY: "segredo-turnstile-de-teste",
  ALLOWED_ORIGINS: "https://www.blackriverconsultoria.com.br",
};

const VALIDO = {
  nome: "Maria Souza",
  email: "maria@varejo.com.br",
  empresa: "Varejo Exemplo",
  cargo: "Diretora de Supply Chain",
  telefone: "(11) 98765-4321",
  consentimento: true,
  modulo_interesse: "verbas_logisticas",
  pagina_origem: "/solucoes/negociacao-de-verbas-logisticas",
  utm_source: "linkedin",
  site: "",
  turnstile: "token-ok",
};

type Chamada = { url: string; corpo: string; headers: Record<string, string> };

function simular(opcoes: { turnstile?: boolean; banco?: number; email?: number | ((n: number) => number); quebrarBanco?: boolean } = {}) {
  const chamadas: Chamada[] = [];
  let emails = 0;
  const fetchFalso = (async (url: string | URL, init?: RequestInit) => {
    const u = String(url);
    chamadas.push({ url: u, corpo: String(init?.body ?? ""), headers: (init?.headers ?? {}) as Record<string, string> });
    if (u.includes("turnstile")) return Response.json({ success: opcoes.turnstile ?? true });
    if (u.startsWith("https://banco.teste")) {
      if (opcoes.quebrarBanco) throw new Error("rede fora");
      return new Response(null, { status: opcoes.banco ?? 201 });
    }
    if (u.includes("resend")) {
      emails += 1;
      const s = typeof opcoes.email === "function" ? opcoes.email(emails) : (opcoes.email ?? 200);
      return Response.json({}, { status: s });
    }
    throw new Error(`endereço inesperado: ${u}`);
  }) as typeof fetch;
  const logs: string[] = [];
  const deps = { fetch: fetchFalso, ip: "203.0.113.7", origem: "https://www.blackriverconsultoria.com.br", log: (m: string) => logs.push(m) };
  return { deps, chamadas, logs, emails: () => chamadas.filter((c) => c.url.includes("resend")) };
}

test("pedido válido: grava, avisa, confirma e responde OK", async () => {
  const s = simular();
  const r = await processarPedido(VALIDO, ENV, s.deps);
  assert.equal(r.status, 200);
  assert.deepEqual(r.corpo, { ok: true });

  const banco = s.chamadas.find((c) => c.url === "https://banco.teste/rest/v1/leads");
  assert.ok(banco, "gravou no Supabase");
  const linha = JSON.parse(banco.corpo);
  assert.equal(linha.telefone, "11987654321", "telefone só com dígitos");
  assert.equal(linha.modulo_interesse, "verbas_logisticas");
  assert.equal(linha.consentimento_lgpd, true);
  assert.equal(linha.versao_politica, "2026-10");
  assert.equal(linha.utm_source, "linkedin");
  assert.equal(linha.site, undefined, "armadilha não vai para o banco");
  assert.equal(banco.headers.apikey, ENV.SUPABASE_SERVICE_ROLE_KEY);

  const [aviso, confirmacao] = s.emails().map((c) => JSON.parse(c.corpo));
  assert.deepEqual(aviso.to, ["avisos@empresa.teste"]);
  assert.match(aviso.subject, /^Novo pedido de diagnóstico — Varejo Exemplo$/);
  assert.match(aviso.text, /Negociação de Verbas Logísticas com Fornecedores/);
  assert.equal(aviso.reply_to, "maria@varejo.com.br");
  assert.deepEqual(confirmacao.to, ["maria@varejo.com.br"]);
  assert.match(confirmacao.text, /^Olá, Maria\./);

  const verificacao = s.chamadas.find((c) => c.url.includes("turnstile"));
  assert.match(verificacao!.corpo, /remoteip=203\.0\.113\.7/);
});

test("campos inválidos: 422 com a mensagem de cada campo, nada gravado", async () => {
  const s = simular();
  const r = await processarPedido(
    { ...VALIDO, nome: "M", email: "maria@", telefone: "1234", consentimento: false, empresa: undefined },
    ENV,
    s.deps,
  );
  assert.equal(r.status, 422);
  assert.deepEqual(r.corpo.campos, {
    nome: "Informe o seu nome.",
    email: "Informe um e-mail válido, como nome@empresa.com.br.",
    empresa: "Informe o nome da empresa.",
    telefone: "Confira o número, com DDD.",
    consentimento: "Para enviar, marque a autorização.",
  });
  assert.equal(s.chamadas.length, 0);
});

test("frente desconhecida no link: ignorada, pedido segue", async () => {
  const s = simular();
  const r = await processarPedido({ ...VALIDO, modulo_interesse: "qualquer-coisa" }, ENV, s.deps);
  assert.equal(r.status, 200);
  const linha = JSON.parse(s.chamadas.find((c) => c.url.includes("banco"))!.corpo);
  assert.equal(linha.modulo_interesse, null);
});

test("robô pela armadilha: finge sucesso e não chama nenhum serviço", async () => {
  const s = simular();
  const r = await processarPedido({ ...VALIDO, site: "https://spam.example" }, ENV, s.deps);
  assert.equal(r.status, 200);
  assert.equal(s.chamadas.length, 0);
  assert.ok(s.logs.some((l) => l.includes("honeypot")));
});

test("robô pelo Turnstile: 403, nada gravado", async () => {
  const s = simular({ turnstile: false });
  const r = await processarPedido(VALIDO, ENV, s.deps);
  assert.equal(r.status, 403);
  assert.equal(s.chamadas.filter((c) => !c.url.includes("turnstile")).length, 0);
});

test("sem token do Turnstile: 403 sem consultar a Cloudflare", async () => {
  const s = simular();
  const r = await processarPedido({ ...VALIDO, turnstile: undefined }, ENV, s.deps);
  assert.equal(r.status, 403);
  assert.equal(s.chamadas.length, 0);
});

test("origem de outro site: 403", async () => {
  const s = simular();
  const r = await processarPedido(VALIDO, ENV, { ...s.deps, origem: "https://outro-site.example" });
  assert.equal(r.status, 403);
  assert.equal(s.chamadas.length, 0);
});

test("banco fora do ar (Free pausado): aviso sai, alerta de NÃO GRAVADO, visitante recebe OK", async () => {
  const s = simular({ quebrarBanco: true });
  const r = await processarPedido(VALIDO, ENV, s.deps);
  assert.equal(r.status, 200);
  const assuntos = s.emails().map((c) => JSON.parse(c.corpo).subject as string);
  assert.equal(assuntos.length, 3, "aviso, alerta de não gravado e confirmação");
  assert.ok(assuntos.some((a) => a.startsWith("[NÃO GRAVADO]")));
  assert.ok(s.logs.some((l) => l.startsWith("banco falhou")));
});

test("e-mail fora do ar: banco grava e visitante recebe OK", async () => {
  const s = simular({ email: 500 });
  const r = await processarPedido(VALIDO, ENV, s.deps);
  assert.equal(r.status, 200);
  assert.ok(s.logs.some((l) => l.startsWith("aviso por e-mail falhou")));
  assert.ok(s.logs.some((l) => l.startsWith("confirmação ao visitante falhou")));
});

test("banco e e-mail fora do ar: erro genérico, sem detalhe técnico", async () => {
  const s = simular({ banco: 503, email: 500 });
  const r = await processarPedido(VALIDO, ENV, s.deps);
  assert.equal(r.status, 502);
  assert.deepEqual(r.corpo, { ok: false, erro: "envio" });
});

test("só a confirmação falha: visitante recebe OK mesmo assim", async () => {
  const s = simular({ email: (n) => (n === 1 ? 200 : 500) });
  const r = await processarPedido(VALIDO, ENV, s.deps);
  assert.equal(r.status, 200);
});

test("sem variáveis de ambiente: erro genérico (não quebra)", async () => {
  const s = simular();
  const r = await processarPedido(VALIDO, { TURNSTILE_SECRET_KEY: "x" }, s.deps);
  assert.equal(r.status, 502);
});

test("telefone: formatos brasileiros aceitos e recusados", () => {
  for (const ok of ["(11) 98765-4321", "11 3456-7890", "+55 11 98765-4321", "5511987654321", "21987654321"]) {
    assert.ok(telefoneValido(ok), ok);
  }
  for (const ruim of ["98765-4321", "(01) 98765-4321", "123", "", "11 98765-43210-1"]) {
    assert.ok(!telefoneValido(ruim), ruim);
  }
});
