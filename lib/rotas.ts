// Todas as páginas públicas do site, para o sitemap e o llms.txt (Etapa 12).
import { cases, hrefDoCase } from "@/lib/content/cases";
import { artigos, hrefDoArtigo } from "@/lib/content/insights";
import { modulos } from "@/lib/site";

export const paginasFixas = ["/", "/solucoes", "/como-trabalhamos", "/cases", "/insights", "/sobre", "/contato", "/privacidade", "/termos"];

export function todasAsRotas(): { caminho: string; data?: string }[] {
  return [
    ...paginasFixas.map((caminho) => ({ caminho })),
    ...modulos.map((m) => ({ caminho: m.href })),
    ...cases.map((c) => ({ caminho: hrefDoCase(c) })),
    ...artigos.map((a) => ({ caminho: hrefDoArtigo(a), data: a.data })),
  ];
}
