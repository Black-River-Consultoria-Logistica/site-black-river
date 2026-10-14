import { CtaCabecalho } from "./cta-cabecalho";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { NavLinks } from "./nav-links";

// Cabeçalho (DESIGN.md › Componentes › Cabeçalho). Fixo no topo a partir de 1024px
// (decisão do João, 13/10/2026); no celular o CTA fica na barra fixa inferior.
export function SiteHeader() {
  return (
    <header className="border-b border-ink-10 bg-paper lg:sticky lg:top-0 lg:z-40">
      <div className="mx-auto flex h-16 max-w-site items-center justify-between gap-6 px-safe lg:h-20">
        {/* Área de toque de 44px em volta do logo (o desenho segue com 32/40px). */}
        <Logo variante="cabecalho" prioridade className="box-content h-8 py-1.5 xl:h-10 xl:py-0.5" />
        <nav aria-label="Principal" className="hidden lg:block">
          <NavLinks />
        </nav>
        <div className="flex items-center gap-4">
          <CtaCabecalho />
          <div className="lg:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
