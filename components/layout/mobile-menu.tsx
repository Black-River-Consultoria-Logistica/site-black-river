"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navegacaoPrincipal, rotaAtiva, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";

// Menu abaixo de 1024px. O logo no topo do painel leva à página inicial.
export function MobileMenu() {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Abrir menu" className="-mr-3 text-ink">
          <MenuIcon className="size-6" aria-hidden />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full gap-0 border-ink-10 sm:max-w-sm"
      >
        <div className="flex h-16 items-center border-b border-ink-10 px-4 sm:px-6">
          <SheetClose asChild>
            <Logo variante="cabecalho" className="h-8" />
          </SheetClose>
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <SheetDescription className="sr-only">Navegação principal do site</SheetDescription>
        </div>
        <nav aria-label="Principal" className="flex flex-1 flex-col overflow-y-auto overscroll-contain px-4 sm:px-6">
          <ul className="flex flex-col">
            {navegacaoPrincipal.map((item) => {
              const ativo = rotaAtiva(pathname, item.href);
              return (
                <li key={item.href} className="border-b border-ink-10">
                  <SheetClose asChild>
                    <Link
                      href={item.href}
                      aria-current={ativo ? "page" : undefined}
                      className={cn(
                        "flex min-h-14 items-center py-3 text-h4 font-semibold text-ink",
                        ativo && "text-primary"
                      )}
                    >
                      {item.rotulo}
                    </Link>
                  </SheetClose>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="border-t border-ink-10 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6">
          <SheetClose asChild>
            <Button asChild className="w-full">
              <Link href={site.cta.href}>{site.cta.rotulo}</Link>
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
