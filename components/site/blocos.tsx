import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Stripes } from "@/components/brand/stripes";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

// Peças compartilhadas pelas páginas (Home, Sobre, Como trabalhamos e as próximas).
// Fonte visual: docs/DESIGN.md.

export const container = "mx-auto w-full max-w-site px-safe";
export const secao = "py-16 lg:py-24";
export const h2 = "text-h4 md:text-h2 max-w-[36ch]";
export const overline = "text-overline font-bold tracking-[0.12em] uppercase";
// Link de texto com alvo de toque de 44px; a seta fica presa à última palavra quando o texto quebra.
export const linkTexto =
  "group inline-flex min-h-11 items-center font-medium text-ink underline underline-offset-4 transition-[color,text-decoration-color] duration-150 hover:text-primary active:text-primary";
// Link dentro de texto corrido.
// Card-link: borda escurece no hover (desktop) e no toque (celular). Sem sombra nem escala (DESIGN.md).
export const cardLink =
  "group flex h-full flex-col border border-ink-10 transition-[border-color] duration-150 hover:border-ink active:border-ink";
export const rotuloCard =
  "text-small font-medium text-ink underline underline-offset-4 group-hover:text-primary group-active:text-primary";
export const linkInline = "font-semibold text-ink underline underline-offset-4 hover:text-primary active:text-primary";

export function Seta({ className }: { className?: string }) {
  return (
    <ArrowRight
      aria-hidden
      className={cn(
        "ml-2 inline size-4 align-[-0.125em] transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-safe:group-hover:translate-x-1 motion-safe:group-focus-visible:translate-x-1",
        className
      )}
    />
  );
}

export function TextoComSeta({ children }: { children: string }) {
  const palavras = children.split(" ");
  const ultima = palavras.pop();
  return (
    <span>
      {palavras.join(" ")}{" "}
      <span className="whitespace-nowrap">
        {ultima}
        <Seta />
      </span>
    </span>
  );
}

export function Cta({ className, href = site.cta.href }: { className?: string; href?: string }) {
  return (
    <Button asChild className={className}>
      <Link href={href}>{site.cta.rotulo}</Link>
    </Button>
  );
}

// Abertura das páginas internas: H1 com a palavra-chave e o primeiro parágrafo.
// Sem faixas aqui: o grafismo fica no hero da Home e na faixa de CTA final (DESIGN.md).
export function AberturaDePagina({
  id,
  titulo,
  abertura,
  lado,
  acima,
  children,
}: {
  id: string;
  /** Acima do H1 (trilha de navegação, por exemplo). */
  acima?: React.ReactNode;
  titulo: string;
  abertura: string;
  /** Coluna da direita no desktop (provas, por exemplo). */
  lado?: React.ReactNode;
  /** Conteúdo abaixo, na largura toda (linha do tempo, por exemplo). */
  children?: React.ReactNode;
}) {
  return (
    <section aria-labelledby={id}>
      <div className={cn(container, "flex flex-col gap-12 pt-16 pb-16 md:pt-20 lg:pt-24 lg:pb-20")}>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="flex flex-col gap-6 lg:col-span-8">
            {acima}
            <h1 id={id} className={cn("max-w-[20ch] text-h3 text-balance md:text-h1", !lado && "lg:max-w-[24ch]")}>
              {titulo}
            </h1>
            <p className="max-w-[60ch] text-lead text-ink-80">{abertura}</p>
          </div>
          {lado && <div className="lg:col-span-3 lg:col-start-10 lg:self-end">{lado}</div>}
        </div>
        {children}
      </div>
    </section>
  );
}

export function FaixaCtaFinal({ titulo, texto, href }: { titulo: string; texto?: string; href?: string }) {
  return (
    <section aria-labelledby="cta-final-titulo" data-cta-final className="relative overflow-hidden bg-ink">
      <div className={cn(container, "relative flex flex-col gap-6 py-16 lg:py-24")}>
        <h2 id="cta-final-titulo" className={cn(h2, "text-paper lg:max-w-[28ch]")}>
          {titulo}
        </h2>
        {texto && <p className="max-w-[52ch] text-lead text-ink-20">{texto}</p>}
        <Cta className="self-start" href={href} />
        {/* Absolutas só a partir de 1280px: abaixo disso ficariam perto demais do texto (DESIGN.md: nunca atrás de texto). */}
        <Stripes variante="escuro" className="mt-6 w-56 self-end md:w-72 xl:absolute xl:right-6 xl:bottom-16 xl:mt-0 xl:w-[360px]" />
      </div>
    </section>
  );
}
