import { cn } from "@/lib/utils";

// Diagramas dos artigos de Insights (Etapa 8, decisão do João em 14/10/2026). DESIGN.md › Imagens:
// "diagramas próprios no estilo dos cases" e, no card de artigo, "imagem 16:9 ou diagrama no topo".
// Cantos retos, verde só no elemento de destaque, nada animado. Dentro do artigo o texto é HTML
// (ou SVG em escala próxima de 1:1), para continuar legível no celular.

export type TipoDeDiagrama = "criterios" | "entregas" | "etapas";

// ---------- Versão do card (16:9, decorativa, sem texto) ----------

export function DiagramaDoCard({ tipo, className }: { tipo: TipoDeDiagrama; className?: string }) {
  return (
    <div aria-hidden className={cn("aspect-video w-full bg-ink-05", className)}>
      <svg viewBox="0 0 320 180" className="size-full" focusable="false">
        {tipo === "entregas" && <CardEntregas />}
        {tipo === "etapas" && <CardEtapas />}
        {tipo === "criterios" && <CardCriterios />}
      </svg>
    </div>
  );
}

const lojasY = [36, 68, 100, 132];

function CardEntregas() {
  return (
    <g>
      {/* Esquerda: entrega direta, uma viagem por loja */}
      {lojasY.map((y) => (
        <line key={`d${y}`} x1={60} y1={90} x2={124} y2={y + 6} className="stroke-ink-40" strokeWidth={1.5} />
      ))}
      <rect x={40} y={80} width={20} height={20} className="fill-ink" />
      {lojasY.map((y) => (
        <rect key={`l${y}`} x={124} y={y} width={12} height={12} className="fill-paper stroke-ink-60" strokeWidth={1.5} />
      ))}
      <line x1={160} y1={28} x2={160} y2={152} className="stroke-ink-20" strokeWidth={1} />
      {/* Direita: entrega centralizada, uma viagem até o Centro de Distribuição */}
      <line x1={200} y1={90} x2={228} y2={90} className="stroke-ink" strokeWidth={3} />
      {lojasY.map((y) => (
        <line key={`c${y}`} x1={252} y1={90} x2={284} y2={y + 6} className="stroke-ink-40" strokeWidth={1.5} />
      ))}
      <rect x={180} y={80} width={20} height={20} className="fill-ink" />
      <rect x={228} y={76} width={28} height={28} className="fill-brand" />
      {lojasY.map((y) => (
        <rect key={`r${y}`} x={284} y={y} width={12} height={12} className="fill-paper stroke-ink-60" strokeWidth={1.5} />
      ))}
    </g>
  );
}

function CardEtapas() {
  const xs = [52, 124, 196, 268];
  return (
    <g>
      <line x1={40} y1={100} x2={280} y2={100} className="stroke-ink" strokeWidth={2} />
      {xs.map((x, i) => (
        <g key={x}>
          <rect
            x={x - 9}
            y={91}
            width={18}
            height={18}
            className={i === xs.length - 1 ? "fill-brand" : "fill-paper stroke-ink"}
            strokeWidth={2}
          />
          <text x={x} y={74} textAnchor="middle" className="fill-ink-60 text-[15px] font-bold tabular-nums">
            {String(i + 1).padStart(2, "0")}
          </text>
        </g>
      ))}
    </g>
  );
}

function CardCriterios() {
  // Três critérios; as cinco perguntas distribuídas 1 · 3 · 1. O último (o que fica) em verde.
  const colunas = [
    { x: 64, n: 1 },
    { x: 148, n: 3 },
    { x: 232, n: 1 },
  ];
  return (
    <g>
      {colunas.map((c, ci) => (
        <g key={c.x}>
          <line x1={c.x} y1={40} x2={c.x + 24} y2={40} className="stroke-ink" strokeWidth={3} />
          {Array.from({ length: c.n }, (_, i) => (
            <rect
              key={i}
              x={c.x}
              y={56 + i * 32}
              width={24}
              height={24}
              className={ci === colunas.length - 1 ? "fill-brand" : "fill-paper stroke-ink-60"}
              strokeWidth={1.5}
            />
          ))}
        </g>
      ))}
    </g>
  );
}

// ---------- Versões dentro do artigo ----------

/** Artigo 2 (verbas logísticas): entrega direta × entrega centralizada. */
export function DiagramaEntregas() {
  return (
    <figure className="flex max-w-[34rem] flex-col gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <PainelDeEntrega titulo="Entrega direta" legenda="O fornecedor faz uma viagem para cada loja." centralizada={false} />
        <PainelDeEntrega
          titulo="Entrega centralizada"
          legenda="Uma entrega no Centro de Distribuição; o varejista distribui às lojas."
          centralizada
        />
      </div>
      <figcaption className="text-small text-ink-60">
        Na entrega centralizada, o varejista assume serviços que antes eram do fornecedor. A verba logística remunera
        esses serviços.
      </figcaption>
    </figure>
  );
}

function PainelDeEntrega({ titulo, legenda, centralizada }: { titulo: string; legenda: string; centralizada: boolean }) {
  const lojas = [8, 44, 80, 116];
  return (
    <div className="flex flex-col gap-3 bg-ink-05 p-4">
      <p className="text-body font-bold text-ink">{titulo}</p>
      <svg viewBox="0 0 240 148" role="img" aria-label={`${titulo}: ${legenda}`} className="w-full" focusable="false">
        {centralizada ? (
          <>
            <line x1={74} y1={74} x2={90} y2={74} className="stroke-ink" strokeWidth={3} />
            {lojas.map((y) => (
              <line key={y} x1={170} y1={74} x2={184} y2={y + 12} className="stroke-ink-40" strokeWidth={1.5} />
            ))}
            <rect x={0} y={54} width={74} height={40} className="fill-ink" />
            <text x={37} y={78} textAnchor="middle" className="fill-paper text-[12px] font-semibold">
              Fornecedor
            </text>
            <rect x={90} y={46} width={80} height={56} className="fill-brand-deep" />
            <text textAnchor="middle" className="fill-paper text-[12px] font-semibold">
              <tspan x={130} y={70}>
                Centro de
              </tspan>
              <tspan x={130} y={86}>
                Distribuição
              </tspan>
            </text>
          </>
        ) : (
          <>
            {lojas.map((y) => (
              <line key={y} x1={74} y1={74} x2={184} y2={y + 12} className="stroke-ink-40" strokeWidth={1.5} />
            ))}
            <rect x={0} y={54} width={74} height={40} className="fill-ink" />
            <text x={37} y={78} textAnchor="middle" className="fill-paper text-[12px] font-semibold">
              Fornecedor
            </text>
          </>
        )}
        {lojas.map((y) => (
          <g key={y}>
            <rect x={184} y={y} width={56} height={24} className="fill-paper stroke-ink-60" strokeWidth={1} />
            <text x={212} y={y + 16} textAnchor="middle" className="fill-ink-80 text-[12px]">
              Loja
            </text>
          </g>
        ))}
      </svg>
      <p className="text-small text-ink-80">{legenda}</p>
    </div>
  );
}

/** Artigo 3 (diagnóstico): as 4 etapas numa régua vertical, até o diagnóstico pronto e a execução. */
export function DiagramaEtapas({ etapas }: { etapas: { titulo: string; texto: string }[] }) {
  return (
    <ol className="flex max-w-[34rem] flex-col">
      {etapas.map((e, i) => (
        <li key={e.titulo} className="relative flex gap-4 pb-6">
          {/* Trilho entre os marcadores */}
          <span aria-hidden className="absolute top-8 bottom-0 left-[15px] w-0.5 bg-ink" />
          <span
            aria-hidden
            className="relative z-10 flex size-8 shrink-0 items-center justify-center border-2 border-ink bg-paper text-small font-bold tabular-nums"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <p className="max-w-[30rem] pt-1 text-body text-ink-80 md:text-[1.125rem] md:leading-[1.65]">
            <strong className="font-semibold text-ink">{e.titulo}</strong> {e.texto}
          </p>
        </li>
      ))}
      <li className="relative flex gap-4 pb-6">
        <span aria-hidden className="absolute top-8 bottom-0 left-[15px] w-0.5 border-l-2 border-dashed border-ink-40" />
        <span aria-hidden className="relative z-10 size-8 shrink-0 bg-brand" />
        <p className="pt-1 text-body font-semibold text-ink md:text-[1.125rem]">Diagnóstico pronto</p>
      </li>
      <li className="flex gap-4">
        <span aria-hidden className="size-8 shrink-0 border-2 border-dashed border-ink-40" />
        <p className="pt-1 text-body text-ink-60 md:text-[1.125rem]">Depois: execução conjunta, se o cliente seguir</p>
      </li>
    </ol>
  );
}

/** Artigo 1 (como escolher): os três critérios da abertura e as cinco perguntas que cobrem cada um. */
export function DiagramaCriterios() {
  const criterios = [
    { titulo: "O que o time já fez do lado de dentro", perguntas: [1] },
    { titulo: "O que ele faz depois do diagnóstico", perguntas: [2, 3, 4] },
    { titulo: "O que fica com a sua equipe", perguntas: [5] },
  ];
  return (
    <figure className="flex max-w-[34rem] flex-col gap-3">
      <ul className="grid gap-3 sm:grid-cols-3">
        {criterios.map((c, i) => (
          <li
            key={c.titulo}
            className={cn("flex flex-col gap-3 border-t-2 p-4", i === criterios.length - 1 ? "border-brand bg-brand-tint" : "border-ink bg-ink-05")}
          >
            <p className="text-small font-bold text-ink">{c.titulo}</p>
            <p className="text-small text-ink-80">
              {c.perguntas.length > 1 ? "Perguntas" : "Pergunta"}{" "}
              {c.perguntas.map((n, k) => (
                <span key={n}>
                  <span className="font-bold tabular-nums">{n}</span>
                  {k < c.perguntas.length - 2 ? ", " : k === c.perguntas.length - 2 ? " e " : ""}
                </span>
              ))}
            </p>
          </li>
        ))}
      </ul>
      <figcaption className="text-small text-ink-60">Os três critérios e as perguntas que ajudam a avaliar cada um.</figcaption>
    </figure>
  );
}
