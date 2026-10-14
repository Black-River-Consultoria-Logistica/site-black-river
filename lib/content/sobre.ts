// Textos da página Sobre — fonte: docs/CONTEUDO.md (aprovado pelo João em 14/10/2026).
// Ordem aprovada no esboço da Etapa 5: abertura, Luis, diferenciais, (história), onde atendemos, CTA.

export const abertura = {
  // Espaço não separável: "Black River" nunca quebra em duas linhas.
  titulo: "Sobre a Black\u00a0River Consultoria",
  texto:
    "A Black River é uma consultoria em logística e supply chain especializada na operação de varejistas, atacadistas, indústrias e distribuidores que vendem para o varejo. São mais de 30 cases de sucesso em 15 anos de atuação, conduzidos por um time que esteve à frente de grandes operações do varejo antes de virar consultor.",
  provas: [
    { numero: "30+", legenda: "cases de sucesso" },
    { numero: "15 anos", legenda: "de atuação" },
  ],
};

export type Pessoa = {
  nome: string;
  cargo: string;
  /** Headshot P&B 4:5. null = a seção mostra só o texto, sem espaço vazio. */
  foto: { src: string; largura: number; altura: number } | null;
  bio: string[];
  /** Onde a pessoa foi diretora, com o segmento (texto aprovado na objeção 2 da Home). */
  trajetoria?: { titulo: string; itens: { segmento: string; empresas: string }[] };
  linkedin?: string;
};

// Lista para receber outras pessoas do time no futuro sem refazer o layout.
export const equipe: Pessoa[] = [
  {
    nome: "Luis Ricardo Pedro",
    cargo: "Sócio-diretor",
    foto: { src: "/fotos/luis-ricardo-pedro.webp", largura: 640, altura: 800 },
    bio: [
      "Luis Ricardo Pedro tem 30 anos de carreira em Supply Chain. Foi diretor de Supply Chain no Grupo Pão de Açúcar, no Carrefour, no Martins Atacadista, na Bertin/JBS e na Ultragaz, onde liderou reestruturações, expansões, redução de custos e de estoques e melhoria do nível de serviço.",
      "É engenheiro de produção pela Escola Politécnica da USP, pós-graduado em Finanças pela FGV e vice-presidente da ABRALOG, a Associação Brasileira de Logística. Especialista em supply chain do varejo, atua em gestão de estoques, abastecimento, armazenagem e transportes.",
    ],
    trajetoria: {
      // Título novo (fora do CONTEUDO.md): aguarda o aval do João na aprovação da Etapa 5.
      titulo: "Onde foi diretor de Supply Chain",
      itens: [
        { segmento: "Varejo", empresas: "Grupo Pão de Açúcar e Carrefour" },
        { segmento: "Atacado", empresas: "Martins Atacadista" },
        { segmento: "Indústria", empresas: "Bertin/JBS" },
        { segmento: "Distribuição", empresas: "Ultragaz" },
      ],
    },
    linkedin: "https://www.linkedin.com/in/luis-ricardo-pedro-8878b914/",
  },
];

export const diferenciais = {
  titulo: "O que nos diferencia",
  // Rótulo já aprovado na Home (seção Jornada).
  link: { rotulo: "Ver como trabalhamos", href: "/como-trabalhamos" },
  itens: [
    {
      titulo: "Vivemos o problema do lado do cliente.",
      texto:
        "Nossos consultores ocuparam cargos de gestão e de diretoria em grandes varejistas brasileiros. Conhecemos a pressão da loja desabastecida e da margem apertada porque já respondemos por elas.",
    },
    {
      titulo: "Executamos junto.",
      texto: "O diagnóstico abre o projeto. Depois de validado, trabalhamos dentro da operação, lado a lado com o seu time.",
    },
    {
      titulo: "Deixamos o time pronto.",
      texto: "Todo projeto tem o mesmo objetivo: a sua equipe sustentar o resultado sozinha depois que saímos.",
    },
    {
      titulo: "Equipe do tamanho do problema.",
      texto:
        "Não há porte mínimo de operação. A equipe de cada projeto é montada pelo escopo e pela complexidade levantados no diagnóstico, com profissionais de mais de 10 anos de mercado.",
    },
  ],
};

// Espaço reservado (decisão do João, 14/10/2026): a seção existe no código e só aparece
// quando o ano de fundação e o parágrafo de história forem confirmados pelo Luis (pendência #4).
export const historia: { titulo: string; paragrafos: string[] } | null = null;

export const ondeAtendemos = {
  titulo: "Onde atendemos",
  texto: "Brasil e América Latina, com trabalho presencial e remoto, de acordo com as necessidades de cada cliente.",
};

export const ctaFinal = {
  titulo: "Converse com quem já respondeu por uma operação como a sua.",
};
