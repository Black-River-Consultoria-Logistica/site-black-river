// Dados globais do site. Fonte: BRIEF.md e APP_FLOW.md (aprovados em 13/10/2026).
// Campos de contato ficam null até a pendência #3 (dados de entidade) ser resolvida:
// o que é null simplesmente não aparece no site — nunca texto provisório.

export const site = {
  nome: "Black River Consultoria",
  url: "https://www.blackriverconsultoria.com.br",
  propostaDeValor:
    "Consultoria em logística com a bagagem de quem esteve à frente de grandes operações do varejo, executando junto com o seu time até o resultado se sustentar sozinho.",
  cta: {
    rotulo: "Agendar conversa de diagnóstico",
    href: "/contato",
  },
  contato: {
    email: null as string | null,
    // Somente dígitos com DDI, ex.: "5511900000000" (gera o link wa.me).
    whatsapp: null as string | null,
    whatsappExibicao: null as string | null,
  },
  linkedin: {
    pagina: null as string | null,
  },
} as const;

export type ItemDeNavegacao = { rotulo: string; href: string };

export const navegacaoPrincipal: ItemDeNavegacao[] = [
  { rotulo: "Soluções", href: "/solucoes" },
  { rotulo: "Como trabalhamos", href: "/como-trabalhamos" },
  { rotulo: "Cases", href: "/cases" },
  { rotulo: "Insights", href: "/insights" },
  { rotulo: "Sobre", href: "/sobre" },
];

// Os 7 módulos (nomenclatura da apresentação institucional, com "Centro de Distribuição"
// no lugar de "Centrais" — decisão do João para o site, 13/10/2026).
export const modulos: ItemDeNavegacao[] = [
  { rotulo: "Análise e Diagnóstico de Operações Logísticas", href: "/solucoes/diagnostico-logistico" },
  { rotulo: "Projeto de Centro de Distribuição", href: "/solucoes/projeto-de-centro-de-distribuicao" },
  { rotulo: "Eficiência Operacional em Centro de Distribuição", href: "/solucoes/eficiencia-operacional-em-centro-de-distribuicao" },
  { rotulo: "Gestão de Abastecimento e Estoques", href: "/solucoes/gestao-de-abastecimento-e-estoques" },
  { rotulo: "Negociação de Verbas Logísticas com Fornecedores", href: "/solucoes/negociacao-de-verbas-logisticas" },
  { rotulo: "Tecnologia da Informação aplicada a Supply Chain", href: "/solucoes/tecnologia-aplicada-a-supply-chain" },
  { rotulo: "Transporte e Malha Logística", href: "/solucoes/transporte-e-malha-logistica" },
];

// Rotas em que a barra fixa de CTA do celular não aparece (APP_FLOW/DESIGN).
export const rotasSemBarraDeCta = ["/contato", "/obrigado"];

export function rotaAtiva(pathname: string, href: string) {
  const atual = pathname.replace(/\/$/, "") || "/";
  return atual === href || atual.startsWith(`${href}/`);
}
