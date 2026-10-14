import { cases, hrefDoCase } from "@/lib/content/cases";
import { artigos, hrefDoArtigo } from "@/lib/content/insights";
import { paginasDeFrente } from "@/lib/content/solucoes";
import { site } from "@/lib/site";

// /llms.txt (Etapa 12; formato de llmstxt.org): resumo do site e links principais para assistentes de IA,
// montado a partir do mesmo conteúdo das páginas. Aprovado pelo João em 14/10/2026.
export const dynamic = "force-static";

const url = (caminho: string) => new URL(caminho, site.url).toString();

export function GET() {
  const linhas = [
    `# ${site.nome}`,
    "",
    `> ${site.propostaDeValor}`,
    "",
    "A Black River é uma consultoria em logística e supply chain para varejo e atacado de médio e grande porte, além de indústrias e distribuidores que vendem para o varejo. É conduzida por Luis Ricardo Pedro, com 30 anos de carreira em Supply Chain e passagem como diretor de Supply Chain pelo Grupo Pão de Açúcar, Carrefour, Martins Atacadista, Bertin/JBS e Ultragaz. Todo projeto começa por um diagnóstico validado com o cliente, segue com cronograma e entregas combinados e é executado junto com o time do cliente até ele sustentar o resultado. Atende no Brasil e na América Latina.",
    "",
    "## Frentes de trabalho",
    "",
    ...paginasDeFrente.map((p) => `- [${p.frente.rotulo}](${url(p.frente.href)}): ${p.description}`),
    "",
    "## Cases",
    "",
    ...cases.map((c) => `- [${c.titulo}](${url(hrefDoCase(c))}): ${c.description}`),
    "",
    "## Insights",
    "",
    ...artigos.map((a) => `- [${a.titulo}](${url(hrefDoArtigo(a))}): ${a.description}`),
    "",
    "## Empresa",
    "",
    `- [Sobre a Black River e Luis Ricardo Pedro](${url("/sobre")})`,
    `- [Como trabalhamos](${url("/como-trabalhamos")})`,
    `- [Agendar uma conversa de diagnóstico](${url("/contato")}): sem custo, online ou presencial; retorno em até 1 dia útil.`,
    ...(site.contato.email ? [`- E-mail: ${site.contato.email}`] : []),
    "",
    "## Optional",
    "",
    `- [Política de Privacidade](${url("/privacidade")})`,
    `- [Termos de Uso](${url("/termos")})`,
    "",
  ];
  return new Response(linhas.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
