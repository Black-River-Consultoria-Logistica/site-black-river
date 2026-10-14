import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import {
  AberturaDePagina,
  container,
  FaixaCtaFinal,
  h2,
  linkTexto,
  overline,
  secao,
  TextoComSeta,
} from "@/components/site/blocos";
import { abertura, ctaFinal, diferenciais, equipe, historia, ondeAtendemos, type Pessoa } from "@/lib/content/sobre";
import { cn } from "@/lib/utils";

// Página Sobre (Etapa 5). Fundo: branco · #F2F2F2 · branco · (história #F2F2F2) · onde atendemos · preto.

function Provas() {
  return (
    <ul className="grid grid-cols-2 gap-6 lg:grid-cols-1 lg:gap-8">
      {abertura.provas.map((p) => (
        <li key={p.numero} className="flex flex-col gap-1">
          <p className="text-h3 leading-none font-bold tracking-[-0.02em] text-brand tabular-nums md:text-h2">{p.numero}</p>
          <p className="text-small text-ink-80">{p.legenda}</p>
        </li>
      ))}
    </ul>
  );
}

export function AberturaSobre() {
  return <AberturaDePagina id="sobre-titulo" titulo={abertura.titulo} abertura={abertura.texto} lado={<Provas />} />;
}

function PerfilDaPessoa({ pessoa, indice }: { pessoa: Pessoa; indice: number }) {
  const id = `pessoa-${indice}`;
  return (
    <article aria-labelledby={id} className="grid gap-10 md:grid-cols-12 md:gap-6">
      {pessoa.foto && (
        <div className="md:col-span-5 lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <Image
            src={pessoa.foto.src}
            alt={`${pessoa.nome}, ${pessoa.cargo.toLowerCase()} da Black River`}
            width={pessoa.foto.largura}
            height={pessoa.foto.altura}
            sizes="(min-width: 1024px) 400px, (min-width: 768px) 40vw, 90vw"
            className="aspect-[4/5] w-full max-w-[360px] object-cover md:max-w-none"
          />
        </div>
      )}
      <div className={cn("flex flex-col gap-8", pessoa.foto ? "md:col-span-7 md:col-start-6 lg:col-span-7 lg:col-start-6" : "md:col-span-10 lg:col-span-8")}>
        <div className="flex flex-col gap-3">
          {/* Sobre #F2F2F2 o verde escuro não passa em texto pequeno: rótulo em preto (DESIGN.md). */}
          <p className={cn(overline, "text-ink")}>{pessoa.cargo}</p>
          <h2 id={id} className="text-h3 md:text-h2">
            {pessoa.nome}
          </h2>
        </div>
        <div className="flex max-w-[62ch] flex-col gap-4 text-ink-80">
          {pessoa.bio.map((paragrafo) => (
            <p key={paragrafo.slice(0, 24)}>{paragrafo}</p>
          ))}
        </div>
        {pessoa.trajetoria && (
          <div className="flex flex-col gap-4">
            <h3 className="text-h5 text-ink">{pessoa.trajetoria.titulo}</h3>
            <dl className="grid border-t border-ink-20 sm:grid-cols-2">
              {pessoa.trajetoria.itens.map((t) => (
                <div key={t.segmento} className="flex flex-col gap-1 border-b border-ink-20 py-4 sm:odd:pr-6">
                  <dt className="text-small text-ink-60">{t.segmento}</dt>
                  <dd className="font-semibold text-ink">{t.empresas}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
        {pessoa.linkedin && (
          <a
            href={pessoa.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-11 items-center gap-2 self-start font-medium text-ink underline underline-offset-4 transition-[color,text-decoration-color] duration-150 hover:text-primary active:text-primary"
          >
            <span>
              Perfil no LinkedIn<span className="sr-only"> de {pessoa.nome}</span>
            </span>
            <ArrowUpRight
              aria-hidden
              className="size-4 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-focus-visible:translate-x-0.5 motion-safe:group-focus-visible:-translate-y-0.5"
            />
            <span className="sr-only">(abre em nova aba)</span>
          </a>
        )}
      </div>
    </article>
  );
}

export function Equipe() {
  return (
    <section aria-label="Quem conduz a Black River" className={cn("bg-ink-05", secao)}>
      <div className={cn(container, "flex flex-col gap-16 lg:gap-24")}>
        {equipe.map((pessoa, i) => (
          <PerfilDaPessoa key={pessoa.nome} pessoa={pessoa} indice={i} />
        ))}
      </div>
    </section>
  );
}

export function Diferenciais() {
  return (
    <section aria-labelledby="diferenciais-titulo" className={secao}>
      <div className={cn(container, "flex flex-col gap-10")}>
        <h2 id="diferenciais-titulo" className={h2}>
          {diferenciais.titulo}
        </h2>
        <ul className="grid gap-x-12 gap-y-10 md:grid-cols-2">
          {diferenciais.itens.map((d) => (
            <li key={d.titulo} className="flex flex-col gap-3 border-t-2 border-ink pt-6">
              <h3 className="text-h5 font-semibold md:text-h4">{d.titulo}</h3>
              <p className="max-w-[52ch] text-ink-80">{d.texto}</p>
            </li>
          ))}
        </ul>
        <Link href={diferenciais.link.href} className={cn(linkTexto, "self-start")}>
          <TextoComSeta>{diferenciais.link.rotulo}</TextoComSeta>
        </Link>
      </div>
    </section>
  );
}

export function Historia() {
  if (!historia) return null;
  return (
    <section aria-labelledby="historia-titulo" className={cn("bg-ink-05", secao)}>
      <div className={cn(container, "grid gap-6 lg:grid-cols-12")}>
        <h2 id="historia-titulo" className={cn(h2, "lg:col-span-4")}>
          {historia.titulo}
        </h2>
        <div className="flex max-w-[62ch] flex-col gap-4 text-ink-80 lg:col-span-7 lg:col-start-6">
          {historia.paragrafos.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

export function OndeAtendemos() {
  // Alterna o fundo com a seção anterior: cinza logo após os diferenciais; branco com fio quando a história aparece.
  return (
    <section
      aria-labelledby="onde-atendemos-titulo"
      className={cn("py-12 lg:py-16", historia ? "border-t border-ink-10" : "bg-ink-05")}
    >
      <div className={cn(container, "grid gap-3 lg:grid-cols-12 lg:items-baseline lg:gap-6")}>
        <h2 id="onde-atendemos-titulo" className="text-h4 lg:col-span-4">
          {ondeAtendemos.titulo}
        </h2>
        <p className="max-w-[52ch] text-lead text-ink-80 lg:col-span-7 lg:col-start-6">{ondeAtendemos.texto}</p>
      </div>
    </section>
  );
}

export function CtaSobre() {
  return <FaixaCtaFinal titulo={ctaFinal.titulo} />;
}
