"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { rotaAtiva, rotasSemBarraDeCta, site } from "@/lib/site";

// Barra fixa de CTA no celular e tablet (DESIGN.md). Some em /contato e /obrigado.
// O espaçador reserva a altura da barra para ela nunca cobrir o fim do rodapé.
export function MobileCtaBar() {
  const pathname = usePathname();
  if (rotasSemBarraDeCta.some((rota) => rotaAtiva(pathname, rota))) return null;

  return (
    <>
      <div aria-hidden className="h-[calc(4.5rem+env(safe-area-inset-bottom))] bg-ink lg:hidden" />
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-10 bg-paper px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:px-6 lg:hidden">
        <Button asChild className="w-full">
          <Link href={site.cta.href}>{site.cta.rotulo}</Link>
        </Button>
      </div>
    </>
  );
}
