import Image from "next/image";
import Link from "next/link";
import { FaixasDeFundo } from "@/components/brand/stripes";
import { CardDeCase, CardDeFrente } from "@/components/site/cards";
import {
  cardLink,
  container,
  Cta,
  FaixaCtaFinal,
  h2,
  linkInline,
  linkTexto,
  overline,
  rotuloCard,
  secao,
  TextoComSeta,
} from "@/components/site/blocos";
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

// Headshot P&B do Luis (4:5). Enquanto o arquivo não chega, a seção Insights mostra só o bloco de autoria.
const FOTO_LUIS: string | null = "/fotos/luis-ricardo-pedro.webp";

function LegendaComLink({ legenda, destaque }: { legenda: string; destaque: { texto: string; href: string } }) {
  const [antes, depois] = legenda.split(destaque.texto);
  return (
    <>
      {antes}
      <Link href={destaque.href} className={linkInline}>
        {destaque.texto}
      </Link>
      {depois}
    </>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="hero-titulo" className="relative isolate overflow-hidden">
      {/* Celular e tablet: uma faixa de altura fixa atrás do título, para o degrau do símbolo continuar legível. */}
      <FaixasDeFundo className="absolute inset-x-0 top-10 -z-10 h-64 w-full md:top-16 md:h-96 lg:inset-0 lg:h-full" />
      <div className={cn(container, "grid gap-12 pt-16 pb-16 md:pt-24 lg:grid-cols-12 lg:gap-6 lg:pt-24 lg:pb-24")}>
        <div className="flex flex-col gap-6 lg:col-span-8">
          <h1 id="hero-titulo" className="max-w-[16ch] text-h1 md:text-display">
            {hero.titulo}
          </h1>
          <div className="flex max-w-[52ch] flex-col gap-2 text-lead">
            <p className="font-semibold text-ink">{hero.subtitulo[0]}</p>
            <p className="text-ink-80">{hero.subtitulo[1]}</p>
          </div>
          <div className="flex flex-col items-start gap-3 pt-2">
            {/* Abaixo de 1024px o botão fica só na barra fixa inferior (um botão primário por região). */}
            <Cta className="hidden lg:inline-flex" />
            <p className="text-small text-ink-60">{hero.apoio}</p>
          </div>
        </div>
        <div className="flex flex-col gap-10 lg:col-span-4 lg:col-start-9">
          <ul className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6 lg:grid-cols-1">
            {provas.map((p) => (
              <li key={p.numero} className="flex flex-col gap-1">
                <p className="text-h3 leading-none font-bold tracking-[-0.02em] text-brand tabular-nums md:text-h2">{p.numero}</p>
                <p className="max-w-[34ch] text-small text-ink-80">
                  {p.destaque ? <LegendaComLink legenda={p.legenda} destaque={p.destaque} /> : p.legenda}
                </p>
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
        <div className="flex flex-col gap-4">
          <h2 id="antes-depois-titulo" className={h2}>
            {antesDepois.titulo}
          </h2>
          <p className="max-w-[60ch] text-lead text-ink-80">{antesDepois.texto}</p>
        </div>
        <div className="grid items-start gap-8 md:grid-cols-2 md:gap-6 lg:gap-12">
          <div className="flex flex-col gap-6 md:pt-8">
            <div className="flex flex-col gap-2">
              <h3 className="text-h3 text-ink">Antes</h3>
              <p className="text-ink-80">{antesDepois.antes.titulo}</p>
            </div>
            <ul className="flex flex-col gap-4">
              {antesDepois.antes.itens.map((item) => (
                <li key={item} className="flex gap-3 text-ink-80">
                  <span aria-hidden="true" className="mt-[0.55em] size-2 shrink-0 border border-ink-60" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-6 bg-paper p-6 md:p-8">
            <div className="flex flex-col gap-2">
              <h3 className="text-h3 text-primary">Depois</h3>
              <p className="text-ink-80">{antesDepois.depois.titulo}</p>
            </div>
            <ul className="flex flex-col gap-4">
              {antesDepois.depois.itens.map((item) => (
                <li key={item} className="flex gap-3 font-medium text-ink">
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
        <div className="flex flex-col gap-4">
          <h2 id="solucoes-titulo" className={h2}>
            {solucoes.titulo}
          </h2>
          <p className="max-w-[60ch] text-lead text-ink-80">{solucoes.texto}</p>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {modulos.map((m, i) => (
            <li key={m.href}>
              <CardDeFrente indice={i} />
            </li>
          ))}
          <li className="flex flex-col justify-center gap-3 p-5 sm:p-6 lg:p-8">
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
  const [destaque, ...outros] = cases.itens;
  return (
    <section aria-labelledby="cases-titulo" className={secao}>
      <div className={cn(container, "flex flex-col gap-10")}>
        <div className="flex flex-col gap-4">
          <h2 id="cases-titulo" className={h2}>
            {cases.titulo}
          </h2>
          <p className="max-w-[60ch] text-lead text-ink-80">{cases.texto}</p>
        </div>
        {/* Um case em destaque e dois menores, para não repetir a grade de cards da seção anterior. */}
        <ul className="grid gap-4 lg:grid-cols-12">
          <li className="lg:col-span-7 lg:row-span-2">
            <Link href={destaque.href} className={cn(cardLink, "gap-4 bg-ink-05 p-6 md:p-8 lg:justify-end lg:p-12")}>
              <span className={cn(overline, "text-ink")}>{destaque.tema}</span>
              <h3 className="max-w-[18ch] text-h3 md:text-h2">{destaque.titulo}</h3>
              <span className={cn(rotuloCard, "pt-4")}>
                <TextoComSeta>Ler o case</TextoComSeta>
              </span>
            </Link>
          </li>
          {outros.map((c) => (
            <li key={c.href} className="lg:col-span-5">
              <CardDeCase {...c} />
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
      <div className={cn(container, "grid gap-10 lg:grid-cols-12 lg:gap-6")}>
        <div className="flex flex-col gap-6 lg:col-span-4">
          <h2 id="insights-titulo" className={h2}>
            {insights.titulo}
          </h2>
          <figure className="flex flex-col gap-4">
            {FOTO_LUIS && (
              <Image
                src={FOTO_LUIS}
                alt="Luis Ricardo Pedro, sócio-diretor da Black River"
                width={640}
                height={800}
                sizes="(min-width: 1024px) 320px, 60vw"
                className="aspect-[4/5] w-full max-w-[320px] object-cover"
              />
            )}
            <figcaption className="text-small text-ink-80">
              Artigos de{" "}
              <Link href="/sobre" className={linkInline}>
                {insights.autor}
              </Link>
              , sócio-diretor da Black River.
            </figcaption>
          </figure>
        </div>
        <div className="flex flex-col gap-6 lg:col-span-7 lg:col-start-6">
          <ul className="flex flex-col gap-2">
            {insights.itens.map((a) => (
              <li key={a.href}>
                <Link href={a.href} className="group flex flex-col gap-3 py-4">
                  <h3 className="text-h5 text-ink md:text-h4">{a.titulo}</h3>
                  <span className={rotuloCard}>
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
        <dl className="grid gap-x-12 gap-y-10 md:grid-cols-2">
          {objecoes.itens.map((o) => (
            <div key={o.pergunta} className="flex flex-col gap-3">
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
  return <FaixaCtaFinal titulo={ctaFinal.titulo} texto={ctaFinal.texto} />;
}
