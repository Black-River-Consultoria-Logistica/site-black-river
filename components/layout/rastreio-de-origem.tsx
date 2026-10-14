"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { guardarOrigem } from "@/lib/formulario/origem";

// Guarda, só nesta aba do navegador, a página anterior e as UTMs da chegada ao site, para o formulário
// registrar de onde veio o pedido (SCHEMA: pagina_origem e utm_*). Nada sai do navegador até o envio.
export function RastreioDeOrigem() {
  const pathname = usePathname();
  const anterior = useRef<string | null>(null);

  useEffect(() => {
    guardarOrigem(pathname, anterior.current);
    anterior.current = pathname;
  }, [pathname]);

  return null;
}
