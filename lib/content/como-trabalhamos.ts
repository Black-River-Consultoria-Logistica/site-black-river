// Textos da página Como trabalhamos — fonte: docs/CONTEUDO.md (aprovado pelo João em 14/10/2026).
// Estrutura aprovada no esboço da Etapa 5: abertura com linha do tempo, conversa, etapas em linhas, CTA.

export const abertura = {
  titulo: "Como funciona a consultoria de logística da Black\u00a0River",
  texto:
    "Uma consultoria de logística da Black River funciona em três etapas: diagnóstico validado pelo cliente, cronograma com entregas definidas e execução conjunta dentro da operação. O projeto termina quando o seu time sustenta o resultado sem a consultoria.",
};

export type Passo = {
  id: string;
  rotulo: string;
  titulo: string;
  /** Nome curto na linha do tempo. */
  curto: string;
  texto: string[];
  entrega?: string;
  caixa?: { titulo: string; texto: string };
};

export const passos: Passo[] = [
  {
    id: "conversa",
    rotulo: "Antes de tudo",
    titulo: "A conversa de diagnóstico",
    curto: "Conversa de diagnóstico, sem custo",
    texto: [
      "O primeiro passo é uma conversa sem custo, online ou presencial. Nela entendemos o momento da sua operação e dizemos com franqueza se e como podemos ajudar.",
    ],
  },
  {
    id: "etapa-1",
    rotulo: "Etapa 1",
    titulo: "Diagnóstico validado",
    curto: "Diagnóstico validado",
    texto: [
      "Mapeamos a operação no lugar onde ela acontece: Centros de Distribuição, lojas, transporte e as rotinas de gestão. Cruzamos o que vemos com os dados da operação para chegar à causa raiz de cada problema.",
    ],
    entrega:
      "Um diagnóstico com as oportunidades priorizadas, a causa raiz de cada uma e as metas propostas. Ele só é dado como pronto depois de validado pelo seu time.",
    caixa: {
      titulo: "O que é um diagnóstico logístico",
      texto:
        "É o levantamento estruturado de como a operação logística funciona hoje (processos, pessoas, estrutura, sistemas e indicadores) para identificar onde estão as perdas e o que as causa. Um bom diagnóstico separa o que pode ser corrigido já, com processo e rotina, do que depende de investimento.",
    },
  },
  {
    id: "etapa-2",
    rotulo: "Etapa 2",
    titulo: "Cronograma e entregas definidos",
    curto: "Cronograma e entregas definidos",
    texto: [
      "Com o diagnóstico aprovado, montamos o plano: quais frentes atacar, em que ordem, com que equipe e com quais metas. Você sabe, antes de começar, o que será entregue, em qual prazo e quanto custa.",
    ],
    entrega: "Cronograma, escopo por frente, equipe alocada e metas de cada indicador.",
  },
  {
    id: "etapa-3",
    rotulo: "Etapa 3",
    titulo: "Execução conjunta",
    curto: "Execução conjunta",
    texto: [
      "Nossos consultores trabalham dentro da operação, ao lado do seu time. Revisamos processos, criamos rotinas e controles, treinamos as equipes e acompanhamos os indicadores até as metas serem atingidas.",
    ],
    entrega:
      "Processos implantados, equipes treinadas e uma rotina de gestão que continua funcionando depois que o projeto termina.",
  },
];

// Último ponto da linha do tempo (texto do esboço aprovado).
export const resultado = { rotulo: "Resultado", texto: "Seu time sustenta o resultado sozinho" };

// Espaço reservado (decisão do João, 14/10/2026): só aparece quando o Luis confirmar
// o prazo típico do diagnóstico e a duração por frente de trabalho (pendência #4).
export const prazos: { titulo: string; texto: string; itens?: { rotulo: string; prazo: string }[] } | null = null;

export const ctaFinal = {
  titulo: "O primeiro passo é sempre o mesmo.",
  texto: "Uma conversa franca sobre os desafios da sua operação, online ou presencial.",
};
