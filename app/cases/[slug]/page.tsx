import type { Metadata } from "next";
import { metadados } from "@/lib/seo";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { trilha } from "@/lib/dados-estruturados";
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
  return metadados({ title: c.title, description: c.description, caminho: `/cases/${c.slug}` });
}

export default async function CasePage({ params }: Props) {
  const c = casePorSlug((await params).slug);
  if (!c) notFound();
  return (
    <>
      <JsonLd
        dados={trilha([
          { nome: "Cases", caminho: "/cases" },
          { nome: c.tema, caminho: `/cases/${c.slug}` },
        ])}
      />
      <PaginaCase c={c} />
    </>
  );
}
