import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PaginaCase } from "@/components/paginas/cases";
import { casePorSlug, cases } from "@/lib/content/cases";

// Os 4 cases de lançamento (Etapa 7), gerados no build a partir de lib/content/cases.ts.
export const dynamicParams = false;

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = casePorSlug((await params).slug);
  if (!c) return {};
  return { title: c.title, description: c.description };
}

export default async function CasePage({ params }: Props) {
  const c = casePorSlug((await params).slug);
  if (!c) notFound();
  return <PaginaCase c={c} />;
}
