import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { DiagramaCriterios, DiagramaEntregas, DiagramaEtapas } from "@/components/insights/diagramas";
import { linkInline } from "@/components/site/blocos";
import { cn } from "@/lib/utils";

// Tipografia dos artigos de Insights (Etapa 8). DESIGN.md: corpo de artigo 18px, medida de ~70 caracteres,
// alinhado à esquerda, no máximo 2 níveis de título. Os títulos do MDX (##) viram h2 da página.

function CaixaOQueE({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <aside className="flex max-w-[34rem] flex-col gap-2 bg-brand-tint p-6">
      <p className="text-body font-bold text-ink">{titulo}</p>
      <div className="text-body text-ink-80 [&>p]:m-0">{children}</div>
    </aside>
  );
}

function A({ href = "", children }: React.ComponentProps<"a">) {
  // Links internos passam pelo roteador; externos abrem na mesma aba (sem rastreio extra).
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={linkInline}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={linkInline} rel="noopener">
      {children}
    </a>
  );
}

// 34rem ≈ 70 caracteres por linha a 18px em Archivo (68ch dava 82–91: o "ch" é mais estreito que a letra média).
const corpo = "max-w-[34rem] text-body text-ink-80 md:text-[1.125rem] md:leading-[1.65]";

const componentes: MDXComponents = {
  h2: ({ children }) => <h2 className="pt-6 max-w-[34ch] text-h4 text-balance text-ink md:text-h3">{children}</h2>,
  h3: ({ children }) => <h3 className="pt-2 text-h5 text-ink">{children}</h3>,
  p: ({ children }) => <p className={corpo}>{children}</p>,
  ul: ({ children }) => (
    // Marcador quadrado vazado, o mesmo dos "sinais" e das listas dos cases.
    <ul
      className={cn(
        corpo,
        "flex list-none flex-col gap-3 pl-0 [&>li]:relative [&>li]:pl-6",
        "[&>li]:before:absolute [&>li]:before:top-[0.65em] [&>li]:before:left-0 [&>li]:before:size-2 [&>li]:before:border [&>li]:before:border-ink-60 [&>li]:before:content-['']",
      )}
    >
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className={cn(corpo, "flex list-decimal flex-col gap-3 pl-6 marker:font-bold marker:text-brand-deep")}>
      {children}
    </ol>
  ),
  li: ({ children }) => <li>{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
  a: A,
  CaixaOQueE,
  DiagramaCriterios,
  DiagramaEntregas,
  DiagramaEtapas,
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...components, ...componentes };
}
