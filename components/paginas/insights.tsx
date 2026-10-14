import Image from "next/image";
import Link from "next/link";
import { DiagramaDoCard } from "@/components/insights/diagramas";
import { ListaFiltravel, type ItemDaLista } from "@/components/paginas/filtro-insights";
import {
  AberturaDePagina,
  container,
  FaixaCtaFinal,
  linkInline,
  linkTexto,
  overline,
  secao,
  TextoComSeta,
} from "@/components/site/blocos";
import { CardDeArtigo, CardDeFrente } from "@/components/site/cards";
import {
  artigos,
  dataPorExtenso,
  frenteDoArtigo,
  hrefDoArtigo,
  outrosArtigos,
  secoesDoArtigo,
  paginaInsights,
  type Artigo,
} from "@/lib/content/insights";
import { hrefContatoComFrente, modulos } from "@/lib/site";
import { ancora, cn } from "@/lib/utils";

// Insights (Etapa 8): lista com filtro por frente e modelo único de artigo
// (autor, data, corpo em MDX com caixa "O que é…", frente relacionada, 2 outros artigos e CTA).

function rotuloDaFrente(a: Artigo) {
  const f = frenteDoArtigo(a);
  return `Frente ${String(a.frente + 1).padStart(2, "0")} · ${f.curto}`;
}

function itemDaLista(a: Artigo): ItemDaLista {
  return {
    href: hrefDoArtigo(a),
    titulo: a.titulo,
    resumo: a.resumo,
    rotulo: rotuloDaFrente(a),
    autor: a.autor.nome,
    data: dataPorExtenso(a.data),
    dataIso: a.data,
    codigo: frenteDoArtigo(a).codigo,
    diagrama: <DiagramaDoCard tipo={a.diagrama} />,
  };
}

// ---------- Lista ----------

// O filtro só aparece quando há o que filtrar (decisão do João, 14/10/2026): 6 artigos em 3 frentes ou mais.
export const filtroVisivel = (() => {
  const frentes = new Set(artigos.map((a) => a.frente));
  return artigos.length >= 6 && frentes.size >= 3;
})();

export function PaginaListaDeInsights() {
  const mostrarFiltro = filtroVisivel;
  // Só as frentes que têm artigo viram opção do filtro, na ordem das frentes.
  const opcoes = modulos
    .map((m, i) => ({ m, i }))
    .filter(({ i }) => artigos.some((a) => a.frente === i))
    .map(({ m }) => ({ codigo: m.codigo, rotulo: m.curto }));
  return (
    <>
      <AberturaDePagina id="insights-titulo" titulo={paginaInsights.titulo} abertura={paginaInsights.abertura} />
      <section aria-labelledby="lista-titulo" className="pb-16 lg:pb-24">
        <div className={container}>
          <div className="flex flex-col gap-10 border-t border-ink-10 pt-12 lg:pt-16">
            <h2 id="lista-titulo" className="sr-only">
              Artigos
            </h2>
            {mostrarFiltro ? (
              <ListaFiltravel itens={artigos.map(itemDaLista)} opcoes={opcoes} rotuloTodas={paginaInsights.filtroTodas} />
            ) : (
              <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {artigos.map((a) => (
                  <li key={a.slug}>
                    <CardDeArtigo {...itemDaLista(a)} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
      <FaixaCtaFinal titulo={paginaInsights.ctaFinal.titulo} texto={paginaInsights.ctaFinal.texto} />
    </>
  );
}

// ---------- Artigo ----------

export function PaginaArtigo({ a }: { a: Artigo }) {
  const frente = frenteDoArtigo(a);
  const outros = outrosArtigos(a);
  const secoes = secoesDoArtigo(a);
  const { Corpo } = a;
  return (
    <>
      <AberturaDePagina
        id="artigo-titulo"
        titulo={a.titulo}
        abertura={a.abertura}
        acima={
          <nav aria-label="Trilha de navegação">
            <ol className="flex flex-wrap items-center gap-x-2 text-small text-ink-60">
              <li>
                <Link href="/insights" className={cn(linkInline, "-my-3 inline-flex min-h-11 items-center font-medium")}>
                  Insights
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                {/* Com o filtro ativo, o rótulo leva à lista já filtrada; sem ele, é só o tema do artigo. */}
                {filtroVisivel ? (
                  <Link
                    href={`/insights?frente=${frente.codigo}`}
                    className={cn(linkInline, "-my-3 inline-flex min-h-11 items-center font-medium")}
                  >
                    {frente.curto}
                  </Link>
                ) : (
                  frente.curto
                )}
              </li>
            </ol>
          </nav>
        }
      >
        {/* Autor e data logo abaixo da abertura: quem assina é parte da prova (lacuna A). */}
        <div className="flex items-center gap-4 border-t border-ink-10 pt-6">
          <Image
            src={a.autor.foto}
            alt=""
            width={640}
            height={800}
            sizes="56px"
            className="aspect-[4/5] w-14 shrink-0 object-cover"
          />
          <p className="flex flex-col text-small text-ink-80">
            <span>
              Por{" "}
              <Link href={a.autor.href} className={linkInline}>
                {a.autor.nome}
              </Link>
              , {a.autor.cargo.charAt(0).toLowerCase() + a.autor.cargo.slice(1)}
            </span>
            <span>{a.autor.credencial}</span>
            <time dateTime={a.data} className="text-ink-60">
              {dataPorExtenso(a.data)}
            </time>
          </p>
        </div>
      </AberturaDePagina>

      <div className="pt-4 pb-16 lg:pb-24">
        <div className={cn(container, "lg:grid lg:grid-cols-12 lg:gap-6")}>
          <article className="flex flex-col gap-5 lg:col-span-7 [&>h2:first-child]:pt-0">
            <Corpo />
          </article>
          {/* A partir de 1024px: índice que acompanha a rolagem, no espaço que a medida de leitura deixa livre. */}
          <aside aria-label="Neste artigo" className="hidden lg:col-span-4 lg:col-start-9 lg:block">
            <div className="sticky top-28 flex flex-col gap-6 border-t-2 border-ink pt-6">
              <nav aria-labelledby="indice-titulo" className="flex flex-col gap-3">
                <p id="indice-titulo" className={cn(overline, "text-ink-60")}>
                  Neste artigo
                </p>
                <ol className="flex flex-col">
                  {secoes.map((s) => (
                    <li key={s}>
                      <a
                        href={`#${ancora(s)}`}
                        className="flex min-h-10 items-center border-b border-ink-10 py-2 text-small text-ink-80 transition-colors duration-150 hover:text-primary active:text-primary"
                      >
                        {s}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
              <div className="flex flex-col gap-3">
                <p className="text-small text-ink-80">
                  Artigo de{" "}
                  <Link href={a.autor.href} className={linkInline}>
                    {a.autor.nome}
                  </Link>
                  , {a.autor.credencial.charAt(0).toLowerCase() + a.autor.credencial.slice(1)}.
                </p>
                <Link href={hrefContatoComFrente(frente)} className={cn(linkTexto, "self-start text-small")}>
                  <TextoComSeta>Agendar conversa de diagnóstico</TextoComSeta>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <section aria-labelledby="relacionados-titulo" className={cn("bg-ink-05", secao)}>
        <div className={cn(container, "flex flex-col gap-12")}>
          <div className="flex flex-col gap-6">
            <h2 id="relacionados-titulo" className="text-h4">
              Frente de trabalho relacionada
            </h2>
            <CardDeFrente indice={a.frente} largo />
          </div>
          {outros.length > 0 && (
            <div className="flex flex-col gap-6">
              <h2 id="leia-titulo" className="text-h4">
                Leia também
              </h2>
              <ul className="grid gap-4 md:grid-cols-2">
                {outros.map((o) => (
                  <li key={o.slug}>
                    <CardDeArtigo {...itemDaLista(o)} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <FaixaCtaFinal
        titulo="Quer discutir este tema na sua operação?"
        texto={paginaInsights.ctaFinal.texto}
        href={hrefContatoComFrente(frente)}
      />
    </>
  );
}
