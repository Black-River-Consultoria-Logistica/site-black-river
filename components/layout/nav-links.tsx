"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navegacaoPrincipal, rotaAtiva } from "@/lib/site";
import { cn } from "@/lib/utils";

// Links do cabeçalho no desktop. Cliente só para marcar a página atual (aria-current).
export function NavLinks() {
  const pathname = usePathname();
  return (
    <ul className="flex items-center gap-6 xl:gap-8">
      {navegacaoPrincipal.map((item) => {
        const ativo = rotaAtiva(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={ativo ? "page" : undefined}
              className={cn(
                "relative py-2 text-small font-medium text-ink transition-[color,background-color,border-color,text-decoration-color] duration-150 hover:text-primary xl:text-body",
                "after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-primary after:opacity-0",
                ativo && "after:opacity-100"
              )}
            >
              {item.rotulo}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
