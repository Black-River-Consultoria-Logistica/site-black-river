import Image from "next/image";
import Link from "next/link";
import {
  AberturaDePagina,
  container,
  FaixaCtaFinal,
  h2,
  linkInline,
  linkTexto,
  overline,
  secao,
  LinhaDeLink,
  TextoComSeta,
} from "@/components/site/blocos";
import { CardDeCase } from "@/components/site/cards";
import {
  cases,
  frentesDoCase,
  hrefDoCase,
  logosDeClientes,
  paginaCases,
  type Case,
  type Topico,
} from "@/lib/content/cases";
import { hrefContatoComFrente, modulos } from "@/lib/site";
import { cn } from "@/lib/utils";

// Cases (Etapa 7): lista, faixa de logos e modelo único de case
// (contexto → desafio → causa raiz → solução → meta traçada), conforme APP_FLOW e DESIGN.md.

const colunaTitulo = "lg:col-span-4";
// Grade dos números conforme a quantidade (break-ui: 2 ou 4 números não deixam coluna vazia nem número sozinho).
const colunasDosNumeros: Record<number, string> = {
  1: "sm:grid-cols-2",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};
const colunaTexto = "lg:col-span-7 lg:col-start-6";

// ---------- Lista ----------

export function PaginaListaDeCases() {
  return (
    <>
      <AberturaDePagina id="cases-titulo" titulo={paginaCases.titulo} abertura={paginaCases.abertura} />

      <section aria-labelledby="lista-titulo" className="pb-16 lg:pb-24">
        <div className={container}>
          <div className="flex flex-col gap-10 border-t border-ink-10 pt-12 lg:pt-16">
            <h2 id="lista-titulo" className={h2}>
              {paginaCases.listaTitulo}
            </h2>
            <ul className="grid gap-4 md:grid-cols-2">
              {cases.map((c) => (
                <li key={c.slug}>
                  <CardDeCase
                    tema={c.tema}
                    titulo={c.titulo}
                    href={hrefDoCase(c)}
                    resumo={c.resumo}
                    rotuloMeta={c.rotuloMeta}
                    alinharTema
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <FaixaDeLogos />

      <FaixaCtaFinal titulo={paginaCases.ctaFinal.titulo} texto={paginaCases.ctaFinal.texto} />
    </>
  );
}

// Faixa estática (DESIGN.md: nada em loop; por isso não usa o logos-carousel da Spell UI).
// Tamanho de cada logo calculado pela área, para logos largos e altos terem o mesmo peso visual.
const AREA_DO_LOGO = 4400; // px² no desktop

// `compacta` (Home, logo abaixo do hero): fundo branco com fio acima, título em rótulo e menos respiro.
// Branco porque a seção seguinte da Home já é #F2F2F2 e duas faixas cinza seguidas viram um bloco só.
// Sem a nota sobre cases: na Home a faixa fica longe da prévia de cases.
export function FaixaDeLogos({ compacta = false }: { compacta?: boolean }) {
  return (
    <section
      aria-labelledby="logos-titulo"
      className={compacta ? "pb-12 lg:pb-16" : cn("bg-ink-05", secao)}
    >
      <div
        className={cn(
          container,
          "flex flex-col items-center",
          compacta ? "gap-8" : "gap-10 lg:gap-12",
        )}
      >
        <div
          className={cn(
            "flex w-full flex-col items-center gap-3",
            compacta && "border-t border-ink-10 pt-10 lg:pt-12",
          )}
        >
          <h2 id="logos-titulo" className={compacta ? cn(overline, "text-ink-60") : "text-h4 md:text-h3"}>
            {paginaCases.logos.titulo}
          </h2>
          {!compacta && (
            <p className="max-w-[48ch] text-center text-small text-ink-60">{paginaCases.logos.nota}</p>
          )}
        </div>
        <ul className="grid w-full grid-cols-3 gap-x-4 gap-y-6 md:gap-x-6 lg:grid-cols-6 lg:gap-y-10">
          {logosDeClientes.map((l) => {
            const razao = l.largura / l.altura;
            const largura = Math.round(Math.sqrt(AREA_DO_LOGO * razao) * (l.escala ?? 1));
            return (
              <li
                key={l.arquivo}
                className="flex h-16 items-center justify-center md:h-20"
              >
                <Image
                  src={`/logos-clientes/${l.arquivo}.webp`}
                  alt={l.nome}
                  width={l.largura}
                  height={l.altura}
                  loading="lazy"
                  style={{ "--w": `${largura}px` } as React.CSSProperties}
                  className="h-auto w-[calc(var(--w)*0.75)] max-w-full md:w-[calc(var(--w)*0.85)] lg:w-[var(--w)]"
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

// ---------- Case ----------

export function PaginaCase({ c }: { c: Case }) {
  const frentes = frentesDoCase(c);
  const outros = cases.filter((o) => o.slug !== c.slug);
  return (
    <>
      <AberturaDePagina
        id="case-titulo"
        titulo={c.titulo}
        abertura={c.abertura}
        acima={
          <nav aria-label="Trilha de navegação">
            <ol className="flex flex-wrap items-center gap-x-2 text-small text-ink-60">
              <li>
                <Link href="/cases" className={cn(linkInline, "-my-3 inline-flex min-h-11 items-center font-medium")}>
                  Cases
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page">{c.tema}</li>
            </ol>
          </nav>
        }
      />

      {/* Sobre branco: DESIGN.md especifica o bloco de número sobre branco ou preto (verde #669933 sobre #F2F2F2 fica no limite). */}
      <section aria-labelledby="numeros-titulo" className="pb-16 lg:pb-24">
        <div className={cn(container, "flex flex-col gap-8")}>
          <h2 id="numeros-titulo" className={cn(overline, "text-ink")}>
            Em números
          </h2>
          <ul className={cn("grid gap-8 sm:gap-6", colunasDosNumeros[c.numeros.length] ?? "sm:grid-cols-3")}>
            {c.numeros.map((n) => (
              <li key={n.valor} className="flex flex-col gap-2 border-t-2 border-ink pt-6">
                <p className="text-h3 leading-none font-bold tracking-[-0.02em] text-brand md:text-h2">{n.valor}</p>
                <p className="max-w-[34ch] text-small text-ink-80">{n.legenda}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <article className="pb-16 lg:pb-24">
        <div className={cn(container, "flex flex-col gap-12 lg:gap-16")}>
          <Bloco id="contexto" titulo="Contexto">
            {c.contexto.map((p) => (
              <Paragrafo key={p}>{p}</Paragrafo>
            ))}
            <aside aria-labelledby="caixa-titulo" className="flex flex-col gap-2 bg-brand-tint p-6">
              <h3 id="caixa-titulo" className="text-body font-bold text-ink">
                {c.caixa.titulo}
              </h3>
              <p className="max-w-[60ch] text-ink-80">{c.caixa.texto}</p>
            </aside>
          </Bloco>

          <Bloco id="desafio" titulo="Desafio">
            {c.desafio.map((p) => (
              <Paragrafo key={p}>{p}</Paragrafo>
            ))}
          </Bloco>

          <Bloco id="causa" titulo="Causa raiz identificada">
            <Paragrafo>{c.causa.intro}</Paragrafo>
            {c.causa.itens && <ListaDeTopicos itens={c.causa.itens} />}
            {c.causa.fecho && <Paragrafo>{c.causa.fecho}</Paragrafo>}
          </Bloco>

          <Bloco id="solucao" titulo="Solução Black River">
            <Paragrafo>{c.solucao.intro}</Paragrafo>
            <ListaDeTopicos itens={c.solucao.itens} numerada={c.solucao.ordenada} />
          </Bloco>
        </div>
      </article>

      {/* Desfecho do case em #F2F2F2, com títulos do mesmo tamanho das seções acima.
          A tabela fica num painel branco: #527F29 sobre #F2F2F2 reprova em texto pequeno (DESIGN.md). */}
      <div className={cn("bg-ink-05", secao)}>
        <div className={cn(container, "flex flex-col gap-12 lg:gap-16")}>
          {c.meta && (
            <Bloco id="meta" titulo={c.meta.titulo} primeiro>
              <div className="bg-paper p-6 md:p-8">
                <TabelaDeMeta meta={c.meta} />
              </div>
            </Bloco>
          )}
          <Bloco id="entregas" titulo="O que o diagnóstico entregou" primeiro={!c.meta}>
            <ListaDeTopicos itens={c.entregas} />
          </Bloco>
          <Bloco id="depois" titulo={paginaCases.depois.titulo}>
            <Paragrafo>{paginaCases.depois.texto}</Paragrafo>
            <Link href={paginaCases.depois.link.href} className={cn(linkTexto, "self-start")}>
              <TextoComSeta>{paginaCases.depois.link.rotulo}</TextoComSeta>
            </Link>
          </Bloco>
        </div>
      </div>

      <nav aria-labelledby="relacionados-titulo" className={secao}>
        <div className={cn(container, "flex flex-col gap-12")}>
          <div className="flex flex-col gap-6">
            <h2 id="relacionados-titulo" className="text-h4">
              {frentes.length > 1 ? "Frentes de trabalho deste case" : "Frente de trabalho deste case"}
            </h2>
            <ul className="grid border-t border-ink-20 sm:grid-cols-2 sm:gap-x-6">
              {frentes.map((f) => (
                <li key={f.href} className="border-b border-ink-20">
                  <LinhaDeLink
                    href={f.href}
                    rotulo={f.rotulo}
                    sobre={`Frente ${String(modulos.indexOf(f) + 1).padStart(2, "0")}`}
                  />
                </li>
              ))}
            </ul>
          </div>
          {outros.length > 0 && (
            <div className="flex flex-col gap-6">
              <h2 className="text-h4">Outros cases</h2>
              <ul className="grid border-t border-ink-20 sm:gap-x-6 lg:grid-cols-3">
                {outros.map((o) => (
                  <li key={o.slug} className="border-b border-ink-20">
                    <LinhaDeLink href={hrefDoCase(o)} rotulo={o.titulo} sobre={o.tema} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </nav>

      <FaixaCtaFinal titulo={c.pergunta} href={hrefContatoComFrente(frentes[0])} />
    </>
  );
}

function Bloco({
  id,
  titulo,
  primeiro = false,
  children,
}: {
  id: string;
  titulo: string;
  primeiro?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      aria-labelledby={`${id}-titulo`}
      className={cn("grid gap-6 lg:grid-cols-12 lg:gap-6", !primeiro && "border-t border-ink-10 pt-12 lg:pt-16")}
    >
      <h2 id={`${id}-titulo`} className={cn(h2, colunaTitulo)}>
        {titulo}
      </h2>
      <div className={cn("flex flex-col gap-6", colunaTexto)}>{children}</div>
    </section>
  );
}

function Paragrafo({ children }: { children: string }) {
  return <p className="max-w-[62ch] text-body text-ink-80 md:text-lead">{children}</p>;
}

function ListaDeTopicos({ itens, numerada = false }: { itens: Topico[]; numerada?: boolean }) {
  const Lista = numerada ? "ol" : "ul";
  return (
    <Lista className="flex flex-col">
      {itens.map((t, i) => (
        <li key={t.rotulo} className="flex gap-4 border-t border-ink-20 py-4 first:border-t-0 first:pt-0 last:pb-0">
          {numerada ? (
            <span aria-hidden className="w-6 shrink-0 font-bold text-brand-deep tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
          ) : (
            <span aria-hidden className="mt-[0.55em] size-2 shrink-0 border border-ink-60" />
          )}
          <p className="max-w-[60ch] text-ink-80">
            <strong className="font-semibold text-ink">{t.rotulo}:</strong> {t.texto}
          </p>
        </li>
      ))}
    </Lista>
  );
}

// Valores curtos (D+1, 12 dias, D-0 a D+1) não quebram; frases quebram normalmente.
const curto = (v: string) => v.length <= 10;

function TabelaDeMeta({ meta }: { meta: NonNullable<Case["meta"]> }) {
  return (
    <div className="flex flex-col gap-3">
      {/* Abaixo de 640px a tabela de 3 colunas não cabe: cada linha vira um bloco empilhado. */}
      <dl className="flex flex-col sm:hidden">
        {meta.linhas.map(([indicador, hoje, alvo]) => (
          <div key={indicador} className="flex flex-col gap-1 border-b border-ink-20 py-4 first:pt-0">
            <dt className="font-semibold text-ink">{indicador}</dt>
            <dd className="flex flex-wrap items-baseline gap-x-2 text-ink-80">
              <span className="sr-only">{meta.colunas[1]}:</span>
              {hoje}
              <span aria-hidden className="text-ink-60">
                →
              </span>
              <span className="sr-only">{meta.colunas[2]}:</span>
              <span className="font-bold text-brand-deep">{alvo}</span>
            </dd>
          </div>
        ))}
      </dl>
      <table className="hidden w-full border-collapse text-left sm:table">
        <caption className="sr-only">{meta.titulo}</caption>
        <thead>
          <tr className="border-b border-ink">
            {meta.colunas.map((col, i) => (
              <th
                key={col}
                scope="col"
                className={cn(overline, "pb-3 text-ink-60", i > 0 && "text-right", i === 0 && "pr-4")}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {meta.linhas.map(([indicador, hoje, alvo]) => (
            <tr key={indicador} className="border-b border-ink-20">
              <th scope="row" className="py-4 pr-4 font-semibold text-ink">
                {indicador}
              </th>
              <td className={cn("py-4 pl-4 text-right text-ink-80 tabular-nums", curto(hoje) && "whitespace-nowrap")}>
                {hoje}
              </td>
              <td
                className={cn(
                  "py-4 pl-4 text-right font-bold text-brand-deep tabular-nums",
                  curto(alvo) && "whitespace-nowrap",
                )}
              >
                <span aria-hidden className="mr-2 font-normal text-ink-60">
                  →
                </span>
                {alvo}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {meta.nota && <p className="max-w-[60ch] text-small text-ink-60">{meta.nota}</p>}
    </div>
  );
}
