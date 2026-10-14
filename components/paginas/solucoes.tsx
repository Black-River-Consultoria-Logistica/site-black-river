import { AberturaDePagina, container, FaixaCtaFinal, h2, overline, secao } from "@/components/site/blocos";
import { CardDeFrente } from "@/components/site/cards";
import { pagina } from "@/lib/content/solucoes";
import { cn } from "@/lib/utils";

// Página Soluções (Etapa 6). Fundo: branco · #F2F2F2 (frentes agrupadas) · branco · preto.

export function AberturaSolucoes() {
  return <AberturaDePagina id="solucoes-titulo" titulo={pagina.titulo} abertura={pagina.abertura} />;
}

// As 7 frentes em 4 grupos, na lógica do texto aprovado: o diagnóstico abre e as demais seguem dele.
export function FrentesAgrupadas() {
  return (
    <section aria-labelledby="combinam-titulo" className={cn("bg-ink-05", secao)}>
      <div className={cn(container, "flex flex-col gap-12")}>
        <div className="flex flex-col gap-4">
          <h2 id="combinam-titulo" className={h2}>
            {pagina.combinam.titulo}
          </h2>
          <p className="max-w-[60ch] text-lead text-ink-80">{pagina.combinam.texto}</p>
        </div>
        <div className="flex flex-col gap-10">
          {pagina.grupos.map((g, i) => (
            <div key={g.nome} className="flex flex-col gap-4">
              <h3 id={`grupo-${i}`} className={cn(overline, "border-b-2 border-ink pb-3 text-ink")}>
                {g.nome}
              </h3>
              {/* Colunas pelo número de frentes do grupo: 1 card vai na horizontal, 2 ou 3 lado a lado. */}
              <ul
                aria-labelledby={`grupo-${i}`}
                className={cn(
                  "grid gap-3 sm:gap-4",
                  g.frentes.length === 2 && "sm:grid-cols-2",
                  g.frentes.length >= 3 && "sm:grid-cols-2 lg:grid-cols-3"
                )}
              >
                {g.frentes.map((f) => (
                  <li key={f}>
                    <CardDeFrente indice={f} titulo="h4" largo={g.frentes.length === 1} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ParaQuem() {
  return (
    <section aria-labelledby="para-quem-titulo" className={secao}>
      <div className={cn(container, "grid gap-8 lg:grid-cols-12 lg:gap-6")}>
        <h2 id="para-quem-titulo" className={cn(h2, "lg:col-span-4")}>
          {pagina.paraQuem.titulo}
        </h2>
        <div className="flex flex-col gap-6 lg:col-span-7 lg:col-start-6">
          <ul className="grid border-t border-ink-20 sm:grid-cols-2 sm:gap-x-6">
            {pagina.paraQuem.segmentos.map((s) => (
              <li key={s} className="border-b border-ink-20 py-4 font-semibold text-ink">
                {s}
              </li>
            ))}
          </ul>
          <p className="max-w-[60ch] text-ink-80">{pagina.paraQuem.texto}</p>
        </div>
      </div>
    </section>
  );
}

export function CtaSolucoes() {
  return <FaixaCtaFinal titulo={pagina.ctaFinal.titulo} texto={pagina.ctaFinal.texto} />;
}
