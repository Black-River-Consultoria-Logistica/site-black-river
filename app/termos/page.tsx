import type { Metadata } from "next";
import { PaginaLegal } from "@/components/paginas/legal";
import { termosDeUso as d } from "@/lib/content/legal";

// Termos de Uso (Etapa 11). Só vão ao ar com a revisão jurídica.
export const metadata: Metadata = { title: d.title, description: d.description };

export default function Termos() {
  return <PaginaLegal d={d} />;
}
