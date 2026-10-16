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

// Faixas de fundo do hero (decisão do João, 15/10/2026): as mesmas três faixas do símbolo, esticadas para
// cruzar a tela inteira sem distorcer o degrau, em tons muito claros. Exceção registrada no DESIGN.md à regra
// "nunca atrás de texto": verde-claro #F0F5EB e cinza #F2F2F2 mantêm o contraste AA dos textos do hero.
const FAIXAS_LONGAS = {
  topo: "M -393.59 147.94L -403.80 131.39H 384.87C 396.70 131.39 398.55 136.36 401.05 140.44C 402.73 143.48 405.16 146.90 406.84 149.94C 409.54 154.34 409.95 154.96 417.22 155.10L 1174.37 155.15C 1179.93 155.15 1181.97 155.77 1184.91 159.39L 1197.04 179.45H 430.89C 424.19 179.45 422.66 177.32 419.05 171.44L 412.66 160.33C 410.16 156.09 408.53 155.15 400.93 155.15L -382.25 155.10C -389.20 155.15 -392.30 149.89 -393.59 147.94Z",
  meio: "M 1226.63 200.84L 1237.32 219.34H 457.75C 450.53 219.07 448.40 217.48 443.69 211.20C 442.01 208.16 438.74 203.07 437.06 200.03C 434.07 195.04 432.42 195.04 425.56 195.14H -341.01C -347.55 195.14 -349.31 194.02 -352.03 190.11C -355.81 183.81 -359.27 177.75 -363.04 171.46H 412.93C 419.49 172.02 420.61 173.15 424.42 179.45L 431.08 189.64C 433.59 193.61 435.76 195.14 442.21 195.14L 1215.88 195.04C 1221.34 195.04 1224.26 197.09 1226.63 200.84Z",
  base: "M -343.36 229.75C -347.24 223.46 -351.44 216.82 -355.32 210.52H 435.40C 445.64 210.52 446.38 214.62 449.93 219.34L 456.12 229.13C 458.81 233.52 462.23 234.46 467.30 234.23H 1223.33C 1228.85 234.44 1231.41 235.59 1234.83 240.49L 1245.58 257.77L 484.02 257.94C 474.81 257.99 473.34 255.75 469.97 251.16L 462.10 239.51C 459.56 235.53 456.83 234.26 448.90 234.26H -332.92C -338.64 234.26 -340.80 233.02 -343.36 229.75Z",
};

export function FaixasDeFundo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="-404 131 1650 127"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      className={cn("pointer-events-none select-none", className)}
    >
      <path d={FAIXAS_LONGAS.topo} fill="var(--br-green-tint-10)" />
      <path d={FAIXAS_LONGAS.meio} fill="var(--br-ink-05)" />
      <path d={FAIXAS_LONGAS.base} fill="var(--br-green-tint-10)" />
    </svg>
  );
}
