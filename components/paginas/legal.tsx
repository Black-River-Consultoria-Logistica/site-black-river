import { AberturaDePagina, container, overline } from "@/components/site/blocos";
import { secoesDoDocumento, type DocumentoLegal } from "@/lib/content/legal";
import { dataPorExtenso } from "@/lib/content/insights";
import { ancora, cn } from "@/lib/utils";

// Política de Privacidade e Termos de Uso (Etapa 11). Mesmo modelo de leitura dos artigos:
// medida de ~70 caracteres e índice fixo à direita a partir de 1024px.
export function PaginaLegal({ d }: { d: DocumentoLegal }) {
  const secoes = secoesDoDocumento(d);
  const { Corpo } = d;
  return (
    <>
      <AberturaDePagina id="legal-titulo" titulo={d.titulo} abertura={d.abertura}>
        <p className="border-t border-ink-10 pt-6 text-small text-ink-60">
          Última atualização: <time dateTime={d.atualizado}>{dataPorExtenso(d.atualizado)}</time>
          {d.versao && <> · Versão {d.versao}</>}
        </p>
      </AberturaDePagina>

      <div className="pt-4 pb-16 lg:pb-24">
        <div className={cn(container, "lg:grid lg:grid-cols-12 lg:gap-6")}>
          <article className="flex flex-col gap-5 lg:col-span-7 [&>h2:first-child]:pt-0">
            <Corpo />
          </article>
          <aside aria-label="Nesta página" className="hidden lg:col-span-4 lg:col-start-9 lg:block">
            <nav aria-labelledby="indice-legal" className="sticky top-28 flex flex-col gap-3 border-t-2 border-ink pt-6">
              <p id="indice-legal" className={cn(overline, "text-ink-60")}>
                Nesta página
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
          </aside>
        </div>
      </div>
    </>
  );
}
