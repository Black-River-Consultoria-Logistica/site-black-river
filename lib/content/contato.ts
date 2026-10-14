// Textos de Contato e Obrigado. Fonte: docs/CONTEUDO.md › "Contato, Obrigado e 404" (aprovado).

export const contato = {
  titulo: "Agende uma conversa de diagnóstico",
  abertura:
    "Uma conversa franca, sem custo, online ou presencial, sobre a operação logística da sua empresa. Preencha o formulário e a Black River retorna em até 1 dia útil para marcar o horário.",
  oQueEsperar: {
    titulo: "O que esperar",
    itens: [
      "Retornamos em até 1 dia útil para combinar data e formato.",
      "Na conversa, entendemos o momento da operação e os problemas mais urgentes.",
      "Você sai com uma leitura franca: se e como a Black River pode ajudar.",
    ],
  },
  rotulos: {
    nome: "Nome",
    email: "E-mail corporativo",
    empresa: "Empresa",
    cargo: "Cargo",
    telefone: "Telefone ou WhatsApp",
  },
  consentimento: {
    antes: "Autorizo a Black River a usar estes dados para retornar o contato, conforme a ",
    link: "Política de Privacidade",
    depois: ".",
  },
  botao: "Enviar e agendar",
  botaoEnviando: "Enviando...",
  // Versão curta (João, 14/10/2026). A frase se monta com os canais configurados em lib/site.ts:
  // só e-mail → "Não conseguimos enviar. Tente de novo ou escreva para contato@…."
  // e-mail + WhatsApp → "Não conseguimos enviar. Tente de novo, escreva para contato@… ou chame no WhatsApp."
  falha: {
    inicio: "Não conseguimos enviar.",
    tenteDeNovo: "Tente de novo",
    email: "escreva para",
    whatsapp: "chame no WhatsApp",
    tentarDeNovo: "Tentar de novo",
  },
} as const;

export const obrigado = {
  titulo: "Recebemos o seu pedido.",
  texto:
    "A Black River vai entrar em contato em até 1 dia útil para marcar a conversa de diagnóstico. Enviamos uma confirmação para o seu e-mail.",
  enquantoIsso: "Enquanto isso: Leia o que aprendemos dentro das operações.",
  link: { rotulo: "Ir para Insights", href: "/insights" },
} as const;
