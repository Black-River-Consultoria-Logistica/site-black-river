import type { Metadata } from "next";
import { site } from "@/lib/site";

// Metadados por página (Etapa 12): title, description, canônica e Open Graph com a imagem 1200×630 da marca.
// O Next junta openGraph de forma rasa, então cada página leva o bloco inteiro por aqui.

export const imagemOg = {
  url: "/og/black-river.png",
  width: 1200,
  height: 630,
  alt: "Black River Consultoria: consultoria em logística para varejo e atacado",
};

type Opcoes = {
  title: string;
  description: string;
  /** Caminho da página, ex.: "/sobre". */
  caminho: string;
  tipo?: "website" | "article";
  /** Artigos: data de publicação (AAAA-MM-DD). */
  publicado?: string;
  indexar?: boolean;
};

export function metadados({ title, description, caminho, tipo = "website", publicado, indexar = true }: Opcoes): Metadata {
  return {
    title,
    description,
    alternates: { canonical: caminho },
    openGraph: {
      type: tipo,
      url: caminho,
      siteName: site.nome,
      locale: "pt_BR",
      title,
      description,
      images: [imagemOg],
      ...(tipo === "article" && publicado ? { publishedTime: publicado } : {}),
    },
    twitter: { card: "summary_large_image", title, description, images: [imagemOg.url] },
    ...(indexar ? {} : { robots: { index: false, follow: true } }),
  };
}
