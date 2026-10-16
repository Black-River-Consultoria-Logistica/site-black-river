import { cn } from "@/lib/utils";

// Elemento gráfico da marca: o símbolo do logo, com as três faixas em degrau exatamente como no
// Brandbook (vetores extraídos da página "Marca" do Brandbook_Black_River.pdf, 15/10/2026).
// Decorativo: aria-hidden e nunca atrás de texto.
const FAIXAS = {
  topo: "M306.41 147.94L296.2 131.39H384.87C396.7 131.39 398.55 136.36 401.05 140.44C402.73 143.48 405.16 146.9 406.84 149.94C409.54 154.34 409.95 154.96 417.22 155.1L474.37 155.15C479.93 155.15 481.97 155.77 484.91 159.39L497.04 179.45H430.89C424.19 179.45 422.66 177.32 419.05 171.44L412.66 160.33C410.16 156.09 408.53 155.15 400.93 155.15L317.75 155.1C310.8 155.15 307.7 149.89 306.41 147.94Z",
  meio: "M526.63 200.84L537.32 219.34H457.75C450.53 219.07 448.4 217.48 443.69 211.2C442.01 208.16 438.74 203.07 437.06 200.03C434.07 195.04 432.42 195.04 425.56 195.14H358.99C352.45 195.14 350.69 194.02 347.97 190.11C344.19 183.81 340.73 177.75 336.96 171.46H412.93C419.49 172.02 420.61 173.15 424.42 179.45L431.08 189.64C433.59 193.61 435.76 195.14 442.21 195.14L515.88 195.04C521.34 195.04 524.26 197.09 526.63 200.84Z",
  base: "M356.64 229.75C352.76 223.46 348.56 216.82 344.68 210.52H435.4C445.64 210.52 446.38 214.62 449.93 219.34L456.12 229.13C458.81 233.52 462.23 234.46 467.3 234.23H523.33C528.85 234.44 531.41 235.59 534.83 240.49L545.58 257.77L484.02 257.94C474.81 257.99 473.34 255.75 469.97 251.16L462.1 239.51C459.56 235.53 456.83 234.26 448.9 234.26H367.08C361.36 234.26 359.2 233.02 356.64 229.75Z",
};

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
  // Sobre fundo claro: verde, preto, verde (como o logo). Sobre preto: tudo verde (regra preto → verde).
  const meio = variante === "claro" ? "var(--br-ink)" : "var(--br-green)";
  return (
    <svg
      viewBox="296 131 250 127"
      aria-hidden="true"
      focusable="false"
      className={cn("pointer-events-none select-none", animar && "br-faixas-animadas", className)}
    >
      <path d={FAIXAS.topo} fill="var(--br-green)" />
      <path d={FAIXAS.meio} fill={meio} />
      <path d={FAIXAS.base} fill="var(--br-green)" />
    </svg>
  );
}
