import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Stripes } from "@/components/brand/stripes";
import { Button } from "@/components/ui/button";
import {
  antesDepois,
  cases,
  ctaFinal,
  hero,
  insights,
  jornada,
  objecoes,
  provas,
  solucoes,
} from "@/lib/content/home";
import { modulos, site } from "@/lib/site";
import { cn } from "@/lib/utils";

// Seções da Home (Etapa 4). Fundo: branco · #F2F2F2 · branco · #F2F2F2 · branco · #F2F2F2 · branco · preto.
const container = "mx-auto w-full max-w-site px-4 md:px-6";
const secao = "py-16 lg:py-24";
const h2 = "text-h4 md:text-h2 max-w-[28ch]";
const overline = "text-overline font-bold tracking-[0.12em] uppercase";
// Link de texto com alvo de toque de 44px; a seta fica presa à última palavra quando o texto quebra.
const linkTexto =
  "inline-flex min-h-11 items-center font-medium text-ink underline underline-offset-4 transition-[color,text-decoration-color] duration-150 hover:text-primary";

function TextoComSeta({ children }: { children: string }) {
  const palavras = children.split(" ");
  const ultima = palavras.pop();
  return (
    <span>
      {palavras.join(" ")}{" "}
      <span className="whitespace-nowrap">
        {ultima}
        <ArrowRight className="ml-2 inline size-4 align-[-0.125em]" aria-hidden />
      </span>
    </span>
  );
}

function Cta({ className }: { className?: string }) {
  return (
    <Button asChild className={className}>
      <Link href={site.cta.href}>{site.cta.rotulo}</Link>
    </Button>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="hero-titulo">
      <div className={cn(container, "relative grid gap-12 pt-16 pb-16 md:pt-24 lg:grid-cols-12 lg:gap-6 lg:pt-24 lg:pb-24")}>
        <div className="flex flex-col gap-6 lg:col-span-7">
          <h1 id="hero-titulo" className="max-w-[20ch] text-h2 md:text-display">
            {hero.titulo}
          </h1>
          <p className="max-w-[52ch] text-lead text-ink-80">{hero.subtitulo}</p>
          <div className="flex flex-col items-start gap-3 pt-2">
            {/* Abaixo de 1024px o botão fica só na barra fixa inferior (um botão primário por região). */}
            <Cta className="hidden lg:inline-flex" />
            <p className="text-small text-ink-60">{hero.apoio}</p>
          </div>
        </div>
        <div className="flex flex-col gap-10 lg:col-span-4 lg:col-start-9">
          <Stripes className="hidden w-full max-w-[360px] self-end lg:block" />
          <ul className="grid grid-cols-1 gap-6 border-t border-ink-10 pt-8 sm:grid-cols-3 lg:grid-cols-1 lg:border-t-0 lg:pt-0">
            {provas.map((p) => (
              <li key={p.numero} className="flex flex-col gap-1 lg:border-t lg:border-ink-10 lg:pt-6">
                <p className="text-h2 leading-none font-bold tracking-[-0.02em] text-brand md:text-display">{p.numero}</p>
                <p className="max-w-[30ch] text-small text-ink-80">{p.legenda}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function AntesDepois() {
  return (
    <section aria-labelledby="antes-depois-titulo" className={cn("bg-ink-05", secao)}>
      <div className={cn(container, "flex flex-col gap-12")}>
        <div className="flex max-w-[60ch] flex-col gap-4">
          <h2 id="antes-depois-titulo" className={h2}>
            {antesDepois.titulo}
          </h2>
          <p className="text-lead text-ink-80">{antesDepois.texto}</p>
        </div>
        <div className="grid items-start gap-8 md:grid-cols-2 md:gap-6 lg:gap-12">
          <div className="flex flex-col gap-4 md:pt-8">
            <h3 className="flex flex-col gap-2 text-h5 text-ink">
              <span className={cn(overline, "text-ink-60")}>Antes</span>
              {antesDepois.antes.titulo}
            </h3>
            <ul className="flex flex-col border-t border-ink-20">
              {antesDepois.antes.itens.map((item) => (
                <li key={item} className="flex gap-3 border-b border-ink-20 py-4 text-ink-80">
                  <span aria-hidden="true" className="mt-[0.55em] size-2 shrink-0 border border-ink-60" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4 bg-paper p-6 md:p-8">
            <h3 className="flex flex-col gap-2 text-h5 text-ink">
              <span className={cn(overline, "text-primary")}>Depois</span>
              {antesDepois.depois.titulo}
            </h3>
            <ul className="flex flex-col border-t border-ink-10">
              {antesDepois.depois.itens.map((item) => (
                <li key={item} className="flex gap-3 border-b border-ink-10 py-4 font-medium text-ink">
                  <span aria-hidden="true" className="mt-[0.55em] size-2 shrink-0 bg-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Jornada() {
  return (
    <section aria-labelledby="jornada-titulo" className={secao}>
      <div className={cn(container, "flex flex-col gap-10")}>
        <h2 id="jornada-titulo" className={h2}>
          {jornada.titulo}
        </h2>
        <ol className="grid gap-10 border-t-2 border-ink md:grid-cols-3 md:gap-6">
          {jornada.etapas.map((etapa, i) => (
            <li key={etapa.nome} className="flex flex-col gap-3 pt-6">
              <span className={cn(overline, "text-primary")}>Etapa {i + 1}</span>
              <h3 className="text-h4 font-semibold md:min-h-[2.5em]">{etapa.nome}</h3>
              <p className="max-w-[40ch] text-ink-80">{etapa.texto}</p>
            </li>
          ))}
        </ol>
        <Link href={jornada.link.href} className={cn(linkTexto, "self-start")}>
          <TextoComSeta>{jornada.link.rotulo}</TextoComSeta>
        </Link>
      </div>
    </section>
  );
}

export function Solucoes() {
  return (
    <section aria-labelledby="solucoes-titulo" className={cn("bg-ink-05", secao)}>
      <div className={cn(container, "flex flex-col gap-10")}>
        <div className="flex max-w-[60ch] flex-col gap-4">
          <h2 id="solucoes-titulo" className={h2}>
            {solucoes.titulo}
          </h2>
          <p className="text-lead text-ink-80">{solucoes.texto}</p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {modulos.map((m, i) => (
            <li key={m.href}>
              <Link
                href={m.href}
                className="group flex h-full flex-col gap-3 border border-ink-10 bg-paper p-6 transition-[border-color] duration-150 hover:border-ink lg:p-8"
              >
                <span className={cn(overline, "text-primary")}>Frente {String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-h5 text-ink">{m.rotulo}</h3>
                <p className="text-small text-ink-80">{solucoes.linhas.at(i)}</p>
                <span className="mt-auto pt-2 text-small font-medium text-ink underline underline-offset-4 group-hover:text-primary">
                  <TextoComSeta>Conhecer a frente de trabalho</TextoComSeta>
                </span>
              </Link>
            </li>
          ))}
          <li className="flex flex-col justify-center gap-3 p-6 lg:p-8">
            <p className="text-h5 text-ink">{solucoes.convite.titulo}</p>
            <p className="text-small text-ink-80">{solucoes.convite.texto}</p>
            <Link href={site.cta.href} className={cn(linkTexto, "text-small")}>
              <TextoComSeta>{site.cta.rotulo}</TextoComSeta>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}

export function Cases() {
  return (
    <section aria-labelledby="cases-titulo" className={secao}>
      <div className={cn(container, "flex flex-col gap-10")}>
        <div className="flex max-w-[60ch] flex-col gap-4">
          <h2 id="cases-titulo" className={h2}>
            {cases.titulo}
          </h2>
          <p className="text-lead text-ink-80">{cases.texto}</p>
        </div>
        <ul className="grid gap-4 lg:grid-cols-3">
          {cases.itens.map((c) => (
            <li key={c.href}>
              <Link
                href={c.href}
                className="group flex h-full flex-col gap-4 border border-ink-10 p-6 transition-[border-color] duration-150 hover:border-ink lg:p-8"
              >
                <span className={cn(overline, "text-primary lg:min-h-[2.4em]")}>{c.tema}</span>
                <h3 className="text-h4 font-semibold">{c.titulo}</h3>
                <span className="mt-auto pt-4 text-small font-medium text-ink underline underline-offset-4 group-hover:text-primary">
                  <TextoComSeta>Ler o case</TextoComSeta>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <Link href={cases.link.href} className={cn(linkTexto, "self-start")}>
          <TextoComSeta>{cases.link.rotulo}</TextoComSeta>
        </Link>
      </div>
    </section>
  );
}

export function Insights() {
  return (
    <section aria-labelledby="insights-titulo" className={cn("bg-ink-05", secao)}>
      <div className={cn(container, "flex flex-col gap-10")}>
        <div className="flex flex-col gap-3">
          <h2 id="insights-titulo" className={h2}>
            {insights.titulo}
          </h2>
          <p className="text-small text-ink-80">Artigos de {insights.autor}, sócio-diretor da Black River.</p>
        </div>
        <ul className="grid border-t border-ink-20 md:grid-cols-3 md:gap-6 md:border-t-0">
          {insights.itens.map((a) => (
            <li key={a.href} className="border-b border-ink-20 md:border-t md:border-b-0">
              <Link href={a.href} className="group flex h-full flex-col gap-4 py-6">
                <h3 className="text-h5 text-ink">{a.titulo}</h3>
                <span className="mt-auto text-small font-medium text-ink underline underline-offset-4 group-hover:text-primary">
                  <TextoComSeta>Ler o artigo</TextoComSeta>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <Link href={insights.link.href} className={cn(linkTexto, "self-start")}>
          <TextoComSeta>{insights.link.rotulo}</TextoComSeta>
        </Link>
      </div>
    </section>
  );
}

export function Objecoes() {
  return (
    <section aria-labelledby="objecoes-titulo" className={secao}>
      <div className={cn(container, "flex flex-col gap-10")}>
        <h2 id="objecoes-titulo" className={h2}>
          {objecoes.titulo}
        </h2>
        <dl className="grid gap-x-12 md:grid-cols-2">
          {objecoes.itens.map((o) => (
            <div key={o.pergunta} className="flex flex-col gap-3 border-t border-ink-20 py-6">
              <dt className="text-h5 text-ink">{o.pergunta}</dt>
              <dd className="max-w-[60ch] text-ink-80">{o.resposta}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function CtaFinal() {
  return (
    <section aria-labelledby="cta-final-titulo" data-cta-final className="relative overflow-hidden bg-ink">
      <div className={cn(container, "relative flex flex-col gap-6 py-16 lg:py-24")}>
        <h2 id="cta-final-titulo" className={cn(h2, "text-paper")}>
          {ctaFinal.titulo}
        </h2>
        <p className="max-w-[52ch] text-lead text-ink-20">{ctaFinal.texto}</p>
        <Cta className="self-start" />
        <Stripes variante="escuro" className="mt-6 w-56 self-end md:w-72 lg:absolute lg:right-6 lg:bottom-16 lg:mt-0 lg:w-[360px]" />
      </div>
    </section>
  );
}
