// Insights (Etapa 8). Artigos em MDX no repositório, sem CMS: o corpo fica em content/insights/<slug>.mdx;
// aqui ficam os dados de cada artigo (título, abertura, frente, data) e a ordem da lista.
// Pautas: docs/CONTEUDO.md › "Pautas dos 3 artigos de lançamento". Títulos e endereços: os já usados
// na Home (Etapa 4). Primeira frase de cada artigo: a aprovada nas pautas (abre com a resposta).
// ATENÇÃO: rascunhos. Os artigos só vão ao ar depois da revisão do João e do Luis (docs/STATUS.md).

import { readFileSync } from "node:fs";
import path from "node:path";
import type { MDXContent } from "mdx/types";
import ComoEscolher from "@/content/insights/como-escolher-consultoria-de-logistica-para-varejo.mdx";
import Diagnostico from "@/content/insights/como-funciona-um-diagnostico-logistico.mdx";
import Verbas from "@/content/insights/verbas-logisticas.mdx";
import type { TipoDeDiagrama } from "@/components/insights/diagramas";
import { modulos, type Frente } from "@/lib/site";

export type Artigo = {
  slug: string;
  titulo: string;
  /** Title da aba e do Google, com a palavra-chave do tema. */
  title: string;
  description: string;
  /** Primeira frase: a resposta direta à pergunta do título (AEO). */
  abertura: string;
  /** 2–3 linhas no card da lista. */
  resumo: string;
  /** Índice em `modulos`: a frente de trabalho relacionada (filtro da lista, link e CTA). */
  frente: number;
  /** AAAA-MM-DD. Provisória: vira a data de publicação no lançamento. */
  data: string;
  autor: { nome: string; cargo: string; credencial: string; href: string; foto: string };
  /** Diagrama do topo do card (versão sem texto do diagrama do artigo). */
  diagrama: TipoDeDiagrama;
  Corpo: MDXContent;
};

const LUIS = {
  nome: "Luis Ricardo Pedro",
  cargo: "Sócio-diretor da Black River",
  // Dado aprovado (Home e Sobre).
  credencial: "30 anos de carreira em Supply Chain",
  href: "/sobre",
  foto: "/fotos/luis-ricardo-pedro.webp",
};

export const paginaInsights = {
  title: "Insights",
  description:
    "Artigos de Luis Ricardo Pedro, sócio-diretor da Black River, sobre logística e supply chain no varejo: diagnóstico, verbas logísticas e como escolher uma consultoria.",
  titulo: "Insights sobre logística no varejo",
  // Título da seção na Home (aprovado na Etapa 3), reaproveitado como abertura.
  abertura:
    "O que aprendemos dentro das operações, por escrito. Artigos de Luis Ricardo Pedro, sócio-diretor da Black River, com 30 anos de carreira em Supply Chain no varejo, no atacado, na indústria e na distribuição.",
  filtroTodas: "Todos os artigos",
  ctaFinal: {
    titulo: "Quer discutir algum destes temas na sua operação?",
    texto: "Uma conversa sem custo, online ou presencial, sobre os pontos que importam para o seu negócio.",
  },
};

export const artigos: Artigo[] = [
  {
    slug: "como-escolher-consultoria-de-logistica-para-varejo",
    titulo: "Como escolher uma consultoria de logística para o varejo",
    title: "Como escolher uma consultoria de logística para o varejo | Black River",
    description:
      "Escolha pelo que o time já fez do lado de dentro, pelo que ele faz depois do diagnóstico e pelo que fica com a sua equipe. Cinco perguntas e os sinais de alerta.",
    abertura:
      "Escolha uma consultoria de logística para o varejo pelo que o time já fez do lado de dentro, pelo que ele faz depois do diagnóstico e pelo que fica com a sua equipe quando o projeto termina.",
    resumo: "Cinco perguntas para fazer antes de contratar e os sinais de alerta de uma consultoria que entrega o relatório e vai embora.",
    frente: 0,
    data: "2026-10-14",
    autor: LUIS,
    diagrama: "criterios",
    Corpo: ComoEscolher,
  },
  {
    slug: "verbas-logisticas",
    titulo: "O que são verbas logísticas e como negociar com fornecedores",
    title: "Verbas logísticas: o que são e como negociar | Black River",
    description:
      "Verbas logísticas são o que o fornecedor paga ao varejista pelos serviços logísticos que ele assume. De onde vêm, como calcular e os erros mais comuns.",
    abertura:
      "Verbas logísticas são os valores que o fornecedor paga ao varejista pelos serviços logísticos que o varejista assume, como receber no Centro de Distribuição e distribuir às lojas.",
    resumo: "De onde vem a verba, por que calcular o custo real de cada serviço antes de negociar e por onde começar.",
    frente: 4,
    data: "2026-10-14",
    autor: LUIS,
    diagrama: "entregas",
    Corpo: Verbas,
  },
  {
    slug: "como-funciona-um-diagnostico-logistico",
    titulo: "Como funciona um diagnóstico logístico, etapa por etapa",
    title: "Como funciona um diagnóstico logístico | Black River",
    description:
      "Um diagnóstico logístico mapeia processos, pessoas, estrutura, sistemas e indicadores para achar a causa raiz das perdas e termina com metas aprovadas pelo cliente.",
    abertura:
      "Um diagnóstico logístico mapeia processos, pessoas, estrutura, sistemas e indicadores para encontrar a causa raiz das perdas da operação e termina com metas aprovadas pelo cliente.",
    resumo: "O que é avaliado, as etapas do campo às metas, o que você recebe no final e um exemplo real de cross docking.",
    frente: 0,
    data: "2026-10-14",
    autor: LUIS,
    diagrama: "etapas",
    Corpo: Diagnostico,
  },
];

/** Títulos das seções (## do MDX), lidos do próprio arquivo no build: o índice nunca diverge do texto. */
export function secoesDoArtigo(a: Pick<Artigo, "slug">) {
  const fonte = readFileSync(path.join(process.cwd(), "content/insights", `${a.slug}.mdx`), "utf8");
  return [...fonte.matchAll(/^## (.+)$/gm)].map((m) => m[1].trim());
}

export function artigoPorSlug(slug: string) {
  return artigos.find((a) => a.slug === slug);
}

export function hrefDoArtigo(a: Pick<Artigo, "slug">) {
  return `/insights/${a.slug}`;
}

export function frenteDoArtigo(a: Artigo): Frente {
  return modulos[a.frente];
}

/** Os outros artigos para "Leia também": primeiro os da mesma frente, até 2. */
export function outrosArtigos(a: Artigo, limite = 2) {
  const outros = artigos.filter((o) => o.slug !== a.slug);
  return [...outros.filter((o) => o.frente === a.frente), ...outros.filter((o) => o.frente !== a.frente)].slice(0, limite);
}

const formatoData = new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export function dataPorExtenso(data: string) {
  return formatoData.format(new Date(`${data}T00:00:00Z`));
}
