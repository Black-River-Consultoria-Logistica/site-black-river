"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { frenteDaRota, hrefContatoComFrente, rotaAtiva, rotasSemBarraDeCta, site } from "@/lib/site";
import { cn } from "@/lib/utils";

// Barra fixa de CTA no celular e tablet (DESIGN.md). Some em /contato e /obrigado e
// recolhe quando a faixa de CTA final ([data-cta-final]) está na tela, para não haver
// dois botões primários na mesma região.
export function MobileCtaBar() {
  const pathname = usePathname();
  const [recolhida, setRecolhida] = useState(false);

  useEffect(() => {
    const alvo = document.querySelector("[data-cta-final]");
    if (!alvo) return;
    const obs = new IntersectionObserver(([e]) => setRecolhida(e.isIntersecting), { threshold: 0.25 });
    obs.observe(alvo);
    return () => obs.disconnect();
  }, [pathname]);

  if (rotasSemBarraDeCta.some((rota) => rotaAtiva(pathname, rota))) return null;

  return (
    <>
      <div aria-hidden className="h-[calc(4.5rem+env(safe-area-inset-bottom))] bg-ink lg:hidden" />
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 border-t border-ink-10 bg-paper px-safe pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] lg:hidden",
          recolhida && "pointer-events-none translate-y-full"
        )}
        aria-hidden={recolhida || undefined}
      >
        <Button asChild className="w-full" tabIndex={recolhida ? -1 : undefined}>
          {/* Nas páginas de frente de trabalho, o formulário abre com a frente já marcada. */}
          <Link href={hrefContatoComFrente(frenteDaRota(pathname))}>{site.cta.rotulo}</Link>
        </Button>
      </div>
    </>
  );
}
