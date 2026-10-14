import Link from "next/link";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { NavLinks } from "./nav-links";

// Cabeçalho (DESIGN.md › Componentes › Cabeçalho). Fixo no topo a partir de 1024px
// (decisão do João, 13/10/2026); no celular o CTA fica na barra fixa inferior.
export function SiteHeader() {
  return (
    <header className="border-b border-ink-10 bg-paper lg:sticky lg:top-0 lg:z-40">
      <div className="mx-auto flex h-16 max-w-site items-center justify-between gap-6 px-4 md:px-6 lg:h-20">
        <Logo variante="cabecalho" prioridade className="h-8 xl:h-10" />
        <nav aria-label="Principal" className="hidden lg:block">
          <NavLinks />
        </nav>
        <div className="flex items-center gap-4">
          <Button asChild className="hidden lg:inline-flex">
            <Link href={site.cta.href}>{site.cta.rotulo}</Link>
          </Button>
          <div className="lg:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
