import type { Metadata } from "next";
import { metadados } from "@/lib/seo";
import { notFound } from "next/navigation";
import { PaginaFrente } from "@/components/paginas/frente";
import { JsonLd } from "@/components/seo/json-ld";
import { perguntasFrequentes, servico, trilha } from "@/lib/dados-estruturados";
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
  return metadados({ title: p.title, description: p.description, caminho: `/solucoes/${(await params).frente}` });
}

export default async function Frente({ params }: Props) {
  const p = paginaPorSlug((await params).frente);
  if (!p) notFound();
  const caminho = p.frente.href;
  const dados: object[] = [
    servico({ nome: p.frente.rotulo, descricao: p.description, caminho }),
    trilha([
      { nome: "Soluções", caminho: "/solucoes" },
      { nome: p.frente.rotulo, caminho },
    ]),
  ];
  if (p.perguntas.length) dados.push(perguntasFrequentes(p.perguntas));
  return (
    <>
      <JsonLd dados={dados} />
      <PaginaFrente p={p} />
    </>
  );
}
