// Dados globais do site. Fonte: BRIEF.md e APP_FLOW.md (aprovados em 13/10/2026).
// Campos de contato ficam null até a pendência #3 (dados de entidade) ser resolvida (o e-mail já foi):
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
    // E-mail institucional informado pelo João em 14/10/2026.
    email: "contato@blackriverconsultoria.com.br" as string | null,
    // Somente dígitos com DDI, ex.: "5511900000000" (gera o link wa.me).
    whatsapp: null as string | null,
    whatsappExibicao: null as string | null,
  },
  linkedin: {
    pagina: null as string | null,
  },
  // Turnstile (antirrobô da Cloudflare, Etapa 10). A chave do site é pública por natureza;
  // a chave secreta fica só no painel da Cloudflare. O widget de produção aceita apenas o domínio
  // oficial; em qualquer outro endereço (local, prévias) o site usa a chave de teste oficial da Cloudflare.
  turnstile: {
    chaveDoSite: "0x4AAAAAAFWrCtAShq4RTDl8",
    chaveDeTeste: "1x00000000000000000000AA",
    dominio: "blackriverconsultoria.com.br",
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

// As 7 frentes de trabalho (nomenclatura da apresentação institucional, com "Centro de Distribuição"
// no lugar de "Centrais" — decisão do João para o site, 13/10/2026). `codigo` é o valor de
// `modulo_interesse` no SCHEMA.md e vai no link do formulário (/contato?modulo=...).
// `curto`: nome curto para filtros e rótulos estreitos (Etapa 8).
export type Frente = ItemDeNavegacao & { codigo: string; curto: string };

export const modulos: Frente[] = [
  { rotulo: "Análise e Diagnóstico de Operações Logísticas", href: "/solucoes/diagnostico-logistico", codigo: "diagnostico", curto: "Diagnóstico" },
  { rotulo: "Projeto de Centro de Distribuição", href: "/solucoes/projeto-de-centro-de-distribuicao", codigo: "projeto_cd", curto: "Projeto de Centro de Distribuição" },
  { rotulo: "Eficiência Operacional em Centro de Distribuição", href: "/solucoes/eficiencia-operacional-em-centro-de-distribuicao", codigo: "eficiencia_cd", curto: "Eficiência operacional" },
  { rotulo: "Gestão de Abastecimento e Estoques", href: "/solucoes/gestao-de-abastecimento-e-estoques", codigo: "abastecimento_estoques", curto: "Abastecimento e estoques" },
  { rotulo: "Negociação de Verbas Logísticas com Fornecedores", href: "/solucoes/negociacao-de-verbas-logisticas", codigo: "verbas_logisticas", curto: "Verbas logísticas" },
  { rotulo: "Tecnologia da Informação aplicada a Supply Chain", href: "/solucoes/tecnologia-aplicada-a-supply-chain", codigo: "tecnologia", curto: "Tecnologia" },
  { rotulo: "Transporte e Malha Logística", href: "/solucoes/transporte-e-malha-logistica", codigo: "transporte_malha", curto: "Transporte e malha" },
];

/** Link do formulário com a frente de trabalho já marcada. */
export function hrefContatoComFrente(frente?: Frente) {
  return frente ? `${site.cta.href}?modulo=${frente.codigo}` : site.cta.href;
}

/** A frente de trabalho da rota atual, se houver. */
export function frenteDaRota(pathname: string) {
  return modulos.find((m) => rotaAtiva(pathname, m.href));
}

// Rotas em que a barra fixa de CTA do celular não aparece (APP_FLOW/DESIGN).
// O botão do cabeçalho também some nelas: quem está no formulário não precisa de outro atalho para ele.
export const rotasSemBarraDeCta = ["/contato", "/obrigado"];

export function rotaAtiva(pathname: string, href: string) {
  const atual = pathname.replace(/\/$/, "") || "/";
  return atual === href || atual.startsWith(`${href}/`);
}
