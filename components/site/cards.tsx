import Link from "next/link";
import { cardLink, overline, rotuloCard, Seta, TextoComSeta } from "@/components/site/blocos";
import { linhasDosCards } from "@/lib/content/solucoes";
import { modulos } from "@/lib/site";
import { cn } from "@/lib/utils";

// Card de frente de trabalho (Home e Soluções). `indice` segue a ordem de `modulos`.
export function CardDeFrente({
  indice,
  titulo: Titulo = "h3",
  className,
  largo = false,
}: {
  indice: number;
  titulo?: "h3" | "h4";
  className?: string;
  /** Card sozinho no grupo: na horizontal a partir de 768px, para não deixar a linha vazia. */
  largo?: boolean;
}) {
  const m = modulos[indice];
  if (largo) {
    return (
      <Link href={m.href} className={cn(cardLink, "gap-3 bg-paper p-5 sm:p-6 md:grid md:grid-cols-12 md:gap-6 lg:p-8", className)}>
        <div className="flex flex-col gap-3 md:col-span-6">
          <span className={cn(overline, "text-primary")}>Frente {String(indice + 1).padStart(2, "0")}</span>
          <Titulo className="text-h5 text-ink md:text-h4">
            {m.rotulo}
            <Seta className="sm:hidden" />
          </Titulo>
        </div>
        <div className="flex flex-col gap-3 md:col-span-5 md:col-start-8 md:self-end">
          <p className="text-small text-ink-80 md:text-body">{linhasDosCards[indice]}</p>
          <span className={cn(rotuloCard, "hidden pt-2 sm:inline")}>
            <TextoComSeta>Conhecer a frente de trabalho</TextoComSeta>
          </span>
        </div>
      </Link>
    );
  }
  return (
    <Link href={m.href} className={cn(cardLink, "gap-3 bg-paper p-5 sm:p-6 lg:p-8", className)}>
      <span className={cn(overline, "text-primary")}>Frente {String(indice + 1).padStart(2, "0")}</span>
      <Titulo className="text-h5 text-ink">
        {m.rotulo}
        {/* No celular o card inteiro é o link: só a seta, sem repetir o rótulo. */}
        <Seta className="sm:hidden" />
      </Titulo>
      <p className="text-small text-ink-80">{linhasDosCards[indice]}</p>
      <span className={cn(rotuloCard, "mt-auto hidden pt-2 sm:inline")}>
        <TextoComSeta>Conhecer a frente de trabalho</TextoComSeta>
      </span>
    </Link>
  );
}

// Card de case (Home, páginas de frente e lista de cases).
// Na lista de cases: 2 linhas de contexto e o rótulo da meta traçada, quando houver (DESIGN.md).
export function CardDeCase({
  tema,
  titulo,
  href,
  resumo,
  rotuloMeta,
  className,
  alinharTema = false,
}: {
  tema: string;
  titulo: string;
  href: string;
  resumo?: string;
  rotuloMeta?: string;
  className?: string;
  /** Em grade com vários cards: reserva duas linhas para o tema e alinha os títulos. */
  alinharTema?: boolean;
}) {
  return (
    <Link href={href} className={cn(cardLink, "gap-4 bg-paper p-6 lg:p-8", className)}>
      <span className={cn(overline, "text-primary", alinharTema && "md:min-h-[2.5em]")}>{tema}</span>
      <h3 className="text-h4 font-semibold text-balance">{titulo}</h3>
      {resumo && <p className="max-w-[52ch] text-ink-80">{resumo}</p>}
      {rotuloMeta && (
        <p className="border-l-2 border-brand pl-3 text-small font-semibold text-ink">{rotuloMeta}</p>
      )}
      <span className={cn(rotuloCard, "mt-auto pt-2")}>
        <TextoComSeta>Ler o case</TextoComSeta>
      </span>
    </Link>
  );
}

// Card de artigo (lista de Insights e "Leia também"). DESIGN.md prevê imagem 16:9 ou diagrama no topo:
// no lançamento não há imagens, então o card abre pelo rótulo da frente (o campo `imagem` entra quando houver).
export function CardDeArtigo({
  href,
  titulo,
  resumo,
  rotulo,
  autor,
  data,
  dataIso,
  className,
}: {
  href: string;
  titulo: string;
  resumo: string;
  /** Rótulo da frente de trabalho, ex.: "Frente 01 · Diagnóstico". */
  rotulo: string;
  autor: string;
  data: string;
  dataIso: string;
  className?: string;
}) {
  return (
    <Link href={href} className={cn(cardLink, "gap-4 bg-paper p-6 lg:p-8", className)}>
      <span className={cn(overline, "text-primary")}>{rotulo}</span>
      <h3 className="text-h4 font-semibold text-balance">{titulo}</h3>
      <p className="max-w-[52ch] text-ink-80">{resumo}</p>
      <div className="mt-auto flex flex-col gap-4 pt-2">
        <p className="text-small text-ink-60">
          {autor} · <time dateTime={dataIso}>{data}</time>
        </p>
        <span className={rotuloCard}>
          <TextoComSeta>Ler o artigo</TextoComSeta>
        </span>
      </div>
    </Link>
  );
}
