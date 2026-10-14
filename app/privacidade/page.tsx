import type { Metadata } from "next";
import { metadados } from "@/lib/seo";
import { PaginaLegal } from "@/components/paginas/legal";
import { politicaDePrivacidade as d } from "@/lib/content/legal";

// Política de Privacidade (Etapa 11). Só vai ao ar com a revisão jurídica e os dados do controlador (pendência #3).
export const metadata: Metadata = metadados({ title: d.title, description: d.description, caminho: "/privacidade" });

export default function Privacidade() {
  return <PaginaLegal d={d} />;
}
