import type { Metadata } from "next";
import { PaginaListaDeCases } from "@/components/paginas/cases";
import { paginaCases } from "@/lib/content/cases";

// Cases (Etapa 7). Palavra-chave: cases de logística no varejo.
export const metadata: Metadata = {
  title: paginaCases.title,
  description: paginaCases.description,
};

export default function Cases() {
  return <PaginaListaDeCases />;
}
