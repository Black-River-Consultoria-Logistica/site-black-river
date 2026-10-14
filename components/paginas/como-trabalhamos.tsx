import { AberturaDePagina, container, FaixaCtaFinal, h2, overline, secao } from "@/components/site/blocos";
import { abertura, ctaFinal, passos, prazos, resultado } from "@/lib/content/como-trabalhamos";
import { cn } from "@/lib/utils";

// Página Como trabalhamos (Etapa 5). Fundo: branco (abertura e etapas) · (#F2F2F2 prazos) · preto.

// Linha do tempo: vertical no celular, horizontal a partir de 1024px. Cada ponto leva à etapa na página.
function LinhaDoTempo() {
  const marcador = "absolute top-1.5 -left-[7px] size-3 lg:top-[-7px] lg:left-0";
  const item = "group relative border-l-2 border-ink-20 pb-5 pl-6 lg:border-t-2 lg:border-l-0 lg:pt-6 lg:pb-0 lg:pl-0 lg:pr-6";
  return (
    <nav aria-label="Etapas do trabalho">
      <ol className="grid lg:grid-cols-5">
        {passos.map((p) => (
          <li key={p.id} className={item}>
            <span aria-hidden className={cn(marcador, "bg-ink transition-colors duration-150 group-hover:bg-primary")} />
            <a href={`#${p.id}`} className="group flex flex-col gap-1">
              <span className={cn(overline, "text-primary")}>
                {p.rotulo}
                <span className="sr-only">: </span>
              </span>
              <span className="font-semibold text-ink underline decoration-ink-20 underline-offset-4 transition-[color,text-decoration-color] duration-150 group-hover:text-primary group-hover:decoration-current group-active:text-primary">
                {p.curto}
              </span>
            </a>
          </li>
        ))}
        <li className={cn(item, "border-transparent pb-0 lg:border-brand")}>
          <span aria-hidden className={cn(marcador, "bg-brand")} />
          <div className="flex flex-col gap-1">
            <span className={cn(overline, "text-ink")}>
              {resultado.rotulo}
              <span className="sr-only">: </span>
            </span>
            <span className="font-semibold text-ink">{resultado.texto}</span>
          </div>
        </li>
      </ol>
    </nav>
  );
}

export function AberturaComo() {
  return (
    <AberturaDePagina id="como-titulo" titulo={abertura.titulo} abertura={abertura.texto}>
      <LinhaDoTempo />
    </AberturaDePagina>
  );
}

export function Passos() {
  return (
    <div className="pb-16 lg:pb-24">
      <div className={container}>
        {passos.map((p) => (
          <section
            key={p.id}
            id={p.id}
            aria-labelledby={`${p.id}-titulo`}
            tabIndex={-1}
            className="grid gap-6 border-t border-ink-10 py-12 outline-none lg:grid-cols-12 lg:gap-6 lg:py-16"
          >
            {/* O rótulo da etapa faz parte do título (como no CONTEUDO.md: "Etapa 1. Diagnóstico validado"). */}
            <h2 id={`${p.id}-titulo`} className="flex max-w-[20ch] flex-col gap-3 text-h4 md:text-h3 lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
              <span className={cn(overline, "text-primary")}>
                {p.rotulo}
                <span className="sr-only">{p.id === "conversa" ? ": " : ". "}</span>
              </span>
              <span>{p.titulo}</span>
            </h2>
            <div className="flex flex-col gap-6 lg:col-span-7 lg:col-start-6">
              {p.texto.map((t) => (
                <p key={t.slice(0, 24)} className="max-w-[62ch] text-body text-ink-80 md:text-lead">
                  {t}
                </p>
              ))}
              {p.entrega && (
                <div className="flex flex-col gap-2 bg-ink-05 p-6">
                  {/* Sobre #F2F2F2, rótulo pequeno em preto (o verde escuro não passa no contraste). */}
                  <p className={cn(overline, "text-ink")}>Entrega</p>
                  <p className="max-w-[60ch] font-medium text-ink md:text-lead">{p.entrega}</p>
                </div>
              )}
              {p.caixa && (
                <aside aria-labelledby={`${p.id}-caixa`} className="flex flex-col gap-2 bg-brand-tint p-6">
                  <h3 id={`${p.id}-caixa`} className="text-body font-bold text-ink">
                    {p.caixa.titulo}
                  </h3>
                  <p className="max-w-[60ch] text-ink-80">{p.caixa.texto}</p>
                </aside>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

// Espaço reservado: só aparece quando os prazos forem confirmados (lib/content/como-trabalhamos.ts).
export function Prazos() {
  if (!prazos) return null;
  return (
    <section aria-labelledby="prazos-titulo" className={cn("bg-ink-05", secao)}>
      <div className={cn(container, "grid gap-8 lg:grid-cols-12 lg:gap-6")}>
        <div className="flex flex-col gap-4 lg:col-span-5">
          <h2 id="prazos-titulo" className={h2}>
            {prazos.titulo}
          </h2>
          <p className="max-w-[52ch] text-lead text-ink-80">{prazos.texto}</p>
        </div>
        {prazos.itens && (
          <dl className="grid border-t border-ink-20 lg:col-span-6 lg:col-start-7">
            {prazos.itens.map((i) => (
              <div key={i.rotulo} className="flex justify-between gap-6 border-b border-ink-20 py-4">
                <dt className="text-ink-80">{i.rotulo}</dt>
                <dd className="font-semibold text-ink tabular-nums">{i.prazo}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}

export function CtaComo() {
  return <FaixaCtaFinal titulo={ctaFinal.titulo} texto={ctaFinal.texto} />;
}
