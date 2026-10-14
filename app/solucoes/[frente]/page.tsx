import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PaginaFrente } from "@/components/paginas/frente";
import { paginaPorSlug, paginasDeFrente, slugDaFrente } from "@/lib/content/solucoes";

// As 7 páginas de frente de trabalho (Etapa 6), geradas no build a partir de lib/content/solucoes.ts.
export const dynamicParams = false;

export function generateStaticParams() {
  return paginasDeFrente.map((p) => ({ frente: slugDaFrente(p.frente) }));
}

type Props = { params: Promise<{ frente: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = paginaPorSlug((await params).frente);
  if (!p) return {};
  return { title: p.title, description: p.description };
}

export default async function Frente({ params }: Props) {
  const p = paginaPorSlug((await params).frente);
  if (!p) notFound();
  return <PaginaFrente p={p} />;
}
