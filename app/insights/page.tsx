import type { Metadata } from "next";
import { metadados } from "@/lib/seo";
import { PaginaListaDeInsights } from "@/components/paginas/insights";
import { paginaInsights } from "@/lib/content/insights";

// Insights (Etapa 8). Artigos em MDX no repositório (content/insights), sem CMS.
export const metadata: Metadata = metadados({
  title: paginaInsights.title,
  description:
    paginaInsights.description,
  caminho: "/insights",
});

export default function Insights() {
  return <PaginaListaDeInsights />;
}
