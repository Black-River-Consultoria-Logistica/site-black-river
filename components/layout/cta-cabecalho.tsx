"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { frenteDaRota, hrefContatoComFrente, rotaAtiva, rotasSemBarraDeCta, site } from "@/lib/site";

// Botão do cabeçalho (desktop). Nas páginas de frente de trabalho, o formulário abre com a frente marcada,
// como na barra fixa do celular e na faixa de CTA final.
export function CtaCabecalho() {
  const pathname = usePathname();
  if (rotasSemBarraDeCta.some((rota) => rotaAtiva(pathname, rota))) return null;
  return (
    <Button asChild className="hidden lg:inline-flex">
      <Link href={hrefContatoComFrente(frenteDaRota(pathname))}>{site.cta.rotulo}</Link>
    </Button>
  );
}
