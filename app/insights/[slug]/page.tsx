import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
  return { title: a.title, description: a.description };
}

export default async function ArtigoPage({ params }: Props) {
  const a = artigoPorSlug((await params).slug);
  if (!a) notFound();
  return <PaginaArtigo a={a} />;
}
