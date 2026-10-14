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

// Card de case (Home e páginas de frente).
export function CardDeCase({
  tema,
  titulo,
  href,
  className,
  alinharTema = false,
}: {
  tema: string;
  titulo: string;
  href: string;
  className?: string;
  /** Em grade com vários cards: reserva duas linhas para o tema e alinha os títulos. */
  alinharTema?: boolean;
}) {
  return (
    <Link href={href} className={cn(cardLink, "gap-4 bg-paper p-6 lg:p-8", className)}>
      <span className={cn(overline, "text-primary", alinharTema && "lg:min-h-[2.5em]")}>{tema}</span>
      <h3 className="text-h4 font-semibold">{titulo}</h3>
      <span className={cn(rotuloCard, "mt-auto pt-2")}>
        <TextoComSeta>Ler o case</TextoComSeta>
      </span>
    </Link>
  );
}
