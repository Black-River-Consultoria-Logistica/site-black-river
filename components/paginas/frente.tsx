import Link from "next/link";
import {
  AberturaDePagina,
  container,
  FaixaCtaFinal,
  h2,
  linkInline,
  linkTexto,
  secao,
  Seta,
  TextoComSeta,
} from "@/components/site/blocos";
import { CardDeCase } from "@/components/site/cards";
import { ctaDaFrente, type PaginaDeFrente } from "@/lib/content/solucoes";
import { hrefContatoComFrente, modulos } from "@/lib/site";
import { cn } from "@/lib/utils";

// Modelo único das 7 páginas de frente de trabalho (Etapa 6, esboço aprovado em 14/10/2026).
// Seções sem conteúdo não aparecem. Fundo: branco · branco (o que é) · #F2F2F2 · branco ·
// (#F2F2F2 cases) · branco · #F2F2F2 (outras frentes) · preto.

const colunaTitulo = "lg:col-span-4";
const colunaTexto = "lg:col-span-7 lg:col-start-6";

export function PaginaFrente({ p }: { p: PaginaDeFrente }) {
  const temCases = Boolean(p.cases?.length);
  return (
    <>
      <AberturaDePagina
        id="frente-titulo"
        titulo={p.h1}
        abertura={p.abertura}
        acima={
          <nav aria-label="Trilha de navegação">
            <ol className="flex flex-wrap items-center gap-x-2 text-small text-ink-60">
              <li>
                {/* Alvo de toque de 44px sem mudar a altura visual da linha. */}
                <Link
                  href="/solucoes"
                  className={cn(
                    linkInline,
                    "-my-3 inline-flex min-h-11 items-center font-medium",
                  )}
                >
                  Soluções
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page">
                Frente {String(p.numero).padStart(2, "0")}
              </li>
            </ol>
          </nav>
        }
      />

      <Definicao p={p} />

      <section
        aria-labelledby="para-quem-titulo"
        className={cn("bg-ink-05", secao)}
      >
        <div className={cn(container, "grid gap-10 lg:grid-cols-12 lg:gap-6")}>
          <div className="flex flex-col gap-4 lg:col-span-5">
            <h2 id="para-quem-titulo" className={h2}>
              Para quem
            </h2>
            <p className="max-w-[52ch] text-body text-ink-80 md:text-lead">
              {p.paraQuem}
            </p>
          </div>
          <div className="flex flex-col gap-6 bg-paper p-6 md:p-8 lg:col-span-6 lg:col-start-7">
            <h3 className="text-h5 text-ink">Sinais de que você precisa</h3>
            <ul className="flex flex-col gap-4">
              {p.sinais.map((s) => (
                <li key={s} className="flex gap-3 text-ink">
                  <span
                    aria-hidden="true"
                    className="mt-[0.55em] size-2 shrink-0 border border-ink-60"
                  />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="conduzimos-titulo" className={secao}>
        <div className={cn(container, "flex flex-col gap-10")}>
          <h2 id="conduzimos-titulo" className={h2}>
            Como conduzimos
          </h2>
          <ol className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {p.comoConduzimos.map((passo, i) => (
              <li
                key={passo}
                className="flex flex-col gap-4 border-t-2 border-ink pt-6"
              >
                <span
                  aria-hidden
                  className="text-h3 leading-none font-bold tracking-[-0.02em] text-brand tabular-nums md:text-h2"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="max-w-[34ch] text-ink">{passo}</p>
              </li>
            ))}
          </ol>
          <Link
            href="/como-trabalhamos"
            className={cn(linkTexto, "self-start")}
          >
            <TextoComSeta>Ver como trabalhamos</TextoComSeta>
          </Link>
        </div>
      </section>

      {temCases && (
        <section
          aria-labelledby="cases-titulo"
          className={cn("bg-ink-05", secao)}
        >
          <div className={cn(container, "flex flex-col gap-10")}>
            <h2 id="cases-titulo" className={h2}>
              {p.cases!.length > 1 ? "Cases relacionados" : "Case relacionado"}
            </h2>
            {/* Um case só: card mais largo, para a faixa não parecer vazia. */}
            <ul
              className={cn(
                "grid gap-4",
                p.cases!.length > 1
                  ? "md:grid-cols-2 lg:grid-cols-3"
                  : "md:grid-cols-12",
              )}
            >
              {p.cases!.map((c) => (
                <li
                  key={c.href}
                  className={cn(
                    p.cases!.length === 1 && "md:col-span-8 lg:col-span-6",
                  )}
                >
                  <CardDeCase {...c} alinharTema={p.cases!.length > 1} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {p.perguntas.length > 0 && (
        <section
          aria-labelledby="perguntas-titulo"
          className={temCases ? secao : "pb-16 lg:pb-24"}
        >
          {/* Sem cases, as perguntas vêm logo após outra seção branca: um fio separa as duas. */}
          <div className={container}>
            {/* Título à esquerda e perguntas em uma coluna à direita, como as etapas de Como trabalhamos. */}
            <div
              className={cn(
                "grid gap-8 lg:grid-cols-12 lg:gap-6",
                !temCases && "border-t border-ink-10 pt-12 lg:pt-16",
              )}
            >
              <h2
                id="perguntas-titulo"
                className={cn(
                  h2,
                  "lg:sticky lg:top-28 lg:col-span-4 lg:self-start",
                )}
              >
                {p.perguntas.length > 1
                  ? "Perguntas frequentes"
                  : "Pergunta frequente"}
              </h2>
              <dl className="flex flex-col lg:col-span-7 lg:col-start-6">
                {p.perguntas.map((q) => (
                  <div
                    key={q.pergunta}
                    className="flex flex-col gap-3 border-t border-ink-20 py-6 first:border-t-0 first:pt-0 lg:first:pt-2"
                  >
                    <dt className="text-h5 text-ink">{q.pergunta}</dt>
                    <dd className="max-w-[60ch] text-ink-80">{q.resposta}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      )}

      <OutrasFrentes atual={p.numero - 1} />

      <FaixaCtaFinal
        titulo={ctaDaFrente.titulo}
        href={hrefContatoComFrente(p.frente)}
      />
    </>
  );
}

// "O que é" + caixa. Sem "O que é", a caixa vira o próprio bloco de definição (frentes 5 e 6).
function Definicao({ p }: { p: PaginaDeFrente }) {
  if (!p.oQueE && !p.caixa) return null;
  const titulo = p.oQueE ? "O que é" : p.caixa!.titulo;
  const texto = p.oQueE ?? p.caixa!.texto;
  // Quando a caixa "O que é…" é a própria definição (frentes 5 e 6), ela vira uma faixa verde-clara inteira.
  const faixa = !p.oQueE;
  return (
    <section
      aria-labelledby="definicao-titulo"
      className={faixa ? cn("bg-brand-tint", secao) : "pb-16 lg:pb-24"}
    >
      <div className={container}>
        <div
          className={cn(
            "grid gap-6 lg:grid-cols-12 lg:gap-6",
            !faixa && "border-t border-ink-10 pt-12 lg:pt-16",
          )}
        >
          <h2 id="definicao-titulo" className={cn(h2, colunaTitulo)}>
            {titulo}
          </h2>
          <div className={cn("flex flex-col gap-6", colunaTexto)}>
            <p className="max-w-[62ch] text-body text-ink-80 md:text-lead">
              {texto}
            </p>
            {p.oQueE && p.caixa && (
              <aside
                aria-labelledby="caixa-titulo"
                className="flex flex-col gap-2 bg-brand-tint p-6"
              >
                <h3 id="caixa-titulo" className="text-body font-bold text-ink">
                  {p.caixa.titulo}
                </h3>
                <p className="max-w-[60ch] text-ink-80">{p.caixa.texto}</p>
              </aside>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function OutrasFrentes({ atual }: { atual: number }) {
  return (
    <nav aria-labelledby="outras-titulo" className="bg-ink-05 py-12 lg:py-16">
      <div className={cn(container, "flex flex-col gap-6")}>
        <h2 id="outras-titulo" className="text-h4">
          Outras frentes de trabalho
        </h2>
        <ul className="grid border-t border-ink-20 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3">
          {modulos.map((m, i) =>
            i === atual ? null : (
              <li key={m.href} className="border-b border-ink-20">
                <Link
                  href={m.href}
                  className="group flex min-h-14 items-start justify-between gap-4 py-4 font-medium text-ink transition-colors duration-150 hover:text-primary active:text-primary"
                >
                  <span className="flex flex-col gap-1">
                    {/* #666 sobre #F2F2F2 passa no contraste de texto pequeno (5,2:1). */}
                    <span className="text-overline font-bold tracking-[0.12em] text-ink-60 uppercase">
                      Frente {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="underline decoration-ink-20 underline-offset-4 group-hover:decoration-current">
                      {m.rotulo}
                    </span>
                  </span>
                  <Seta className="mt-6 ml-0 shrink-0" />
                </Link>
              </li>
            ),
          )}
        </ul>
      </div>
    </nav>
  );
}
