import type { Metadata } from "next";
import { metadados } from "@/lib/seo";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { artigo, trilha } from "@/lib/dados-estruturados";
import { PaginaArtigo } from "@/components/paginas/insights";
import { artigoPorSlug, artigos } from "@/lib/content/insights";

// Os artigos de Insights (Etapa 8), gerados no build a partir de lib/content/insights.ts.
export const dynamicParams = false;

export function generateStaticParams() {
  return artigos.map((a) => ({ slug: a.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = artigoPorSlug((await params).slug);
  if (!a) return {};
  return metadados({ title: a.title, description: a.description, caminho: `/insights/${a.slug}`, tipo: "article", publicado: a.data });
}

export default async function ArtigoPage({ params }: Props) {
  const a = artigoPorSlug((await params).slug);
  if (!a) notFound();
  const caminho = `/insights/${a.slug}`;
  return (
    <>
      <JsonLd
        dados={[
          artigo({ titulo: a.titulo, descricao: a.description, caminho, data: a.data }),
          trilha([
            { nome: "Insights", caminho: "/insights" },
            { nome: a.titulo, caminho },
          ]),
        ]}
      />
      <PaginaArtigo a={a} />
    </>
  );
}
