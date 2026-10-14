import { cn } from "@/lib/utils";

// Elemento gráfico da marca: três faixas com pontas cortadas a ~22° da horizontal,
// em escada, como no símbolo do logo (DESIGN.md › Espaçamento e forma).
// Decorativo: aria-hidden e nunca atrás de texto.
const H = 26; // altura de cada faixa
const K = Math.round(H / Math.tan((22 * Math.PI) / 180)); // avanço horizontal do corte a 22°

function faixa(x: number, y: number, largura: number) {
  return `${x},${y + H} ${x + K},${y} ${x + largura},${y} ${x + largura - K},${y + H}`;
}

export function Stripes({
  variante = "claro",
  animar = false,
  className,
}: {
  variante?: "claro" | "escuro";
  /** Entrada única de 250ms ao carregar (só no hero). Ver globals.css. */
  animar?: boolean;
  className?: string;
}) {
  // Sobre fundo claro: verde, preto, verde. Sobre preto: tudo verde (regra preto → verde).
  const meio = variante === "claro" ? "var(--br-ink)" : "var(--br-green)";
  return (
    <svg
      viewBox="0 0 460 150"
      aria-hidden="true"
      focusable="false"
      className={cn("pointer-events-none select-none", animar && "br-faixas-animadas", className)}
    >
      <polygon points={faixa(40, 8, 420)} fill="var(--br-green)" />
      <polygon points={faixa(120, 62, 340)} fill={meio} />
      <polygon points={faixa(200, 116, 260)} fill="var(--br-green)" />
    </svg>
  );
}
