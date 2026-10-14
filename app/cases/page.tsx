import type { Metadata } from "next";
import { metadados } from "@/lib/seo";
import { PaginaListaDeCases } from "@/components/paginas/cases";
import { paginaCases } from "@/lib/content/cases";

// Cases (Etapa 7). Palavra-chave: cases de logística no varejo.
export const metadata: Metadata = metadados({
  title: paginaCases.title,
  description:
    paginaCases.description,
  caminho: "/cases",
});

export default function Cases() {
  return <PaginaListaDeCases />;
}
