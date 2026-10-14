// Regras do formulário de agendamento (Etapa 10), as mesmas no navegador e na Função da Cloudflare.
// Campos e mensagens: docs/CONTEUDO.md › Contato (aprovado em 14/10/2026). Decisões do João (14/10/2026):
// telefone obrigatório; nenhum campo opcional visível; a frente de trabalho vem escondida do link (?modulo=).
// Limites: os mesmos da tabela `leads` (supabase/migrations).

import { z } from "zod";

export const VERSAO_POLITICA = "2026-10";

export const CODIGOS_DE_FRENTE = [
  "diagnostico",
  "projeto_cd",
  "eficiencia_cd",
  "abastecimento_estoques",
  "verbas_logisticas",
  "tecnologia",
  "transporte_malha",
  "nao_sei",
] as const;

export const mensagens = {
  nome: "Informe o seu nome.",
  email: "Informe um e-mail válido, como nome@empresa.com.br.",
  empresa: "Informe o nome da empresa.",
  cargo: "Informe o seu cargo.",
  telefone: "Confira o número, com DDD.",
  consentimento: "Para enviar, marque a autorização.",
} as const;

/** Só os dígitos do telefone. Aceita "+55 (11) 9 9999-9999", "11999999999" etc. */
export function digitosDoTelefone(valor: string) {
  return valor.replace(/\D/g, "");
}

/** Telefone brasileiro com DDD: 10 ou 11 dígitos, ou 12–13 com o 55 na frente. */
export function telefoneValido(valor: string) {
  const d = digitosDoTelefone(valor);
  const nacional = d.length >= 12 && d.startsWith("55") ? d.slice(2) : d;
  return /^[1-9][1-9]\d{8,9}$/.test(nacional);
}

const textoObrigatorio = (min: number, max: number, mensagem: string) =>
  z.string({ required_error: mensagem, invalid_type_error: mensagem }).trim().min(min, mensagem).max(max, mensagem);

const textoOpcional = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v ? v : undefined));

// O que o visitante preenche (validado campo a campo na tela).
export const camposVisiveis = z.object({
  nome: textoObrigatorio(2, 120, mensagens.nome),
  email: z
    .string({ required_error: mensagens.email })
    .trim()
    .max(254, mensagens.email)
    .email(mensagens.email)
    .regex(/^[^@\s]+@[^@\s]+\.[^@\s]+$/, mensagens.email),
  empresa: textoObrigatorio(2, 160, mensagens.empresa),
  cargo: textoObrigatorio(2, 120, mensagens.cargo),
  telefone: z
    .string({ required_error: mensagens.telefone })
    .trim()
    .max(20, mensagens.telefone)
    .refine(telefoneValido, mensagens.telefone),
  consentimento: z.literal(true, {
    errorMap: () => ({ message: mensagens.consentimento }),
  }),
});

// O que vai junto, sem aparecer: frente do link, página de origem e UTMs.
export const camposOcultos = z.object({
  modulo_interesse: z.enum(CODIGOS_DE_FRENTE).optional().catch(undefined),
  pagina_origem: textoOpcional(300).catch(undefined),
  utm_source: textoOpcional(120).catch(undefined),
  utm_medium: textoOpcional(120).catch(undefined),
  utm_campaign: textoOpcional(120).catch(undefined),
});

// Corpo completo do POST para /api/agendamento.
export const pedido = camposVisiveis.merge(camposOcultos).extend({
  // Armadilha para robôs: campo invisível que pessoas não preenchem.
  site: z.string().max(200).optional(),
  // Token do Turnstile (antirrobô da Cloudflare).
  turnstile: z.string().max(4096).optional(),
});

export type CamposVisiveis = z.input<typeof camposVisiveis>;
export type Pedido = z.output<typeof pedido>;
export type CampoVisivel = keyof typeof mensagens;

/** Erros por campo, na ordem do formulário (o primeiro recebe o foco). */
export function errosPorCampo(resultado: z.SafeParseError<unknown>) {
  const erros: Partial<Record<CampoVisivel, string>> = {};
  for (const problema of resultado.error.issues) {
    const campo = problema.path[0] as CampoVisivel;
    if (campo in mensagens && !erros[campo]) erros[campo] = mensagens[campo];
  }
  return erros;
}
