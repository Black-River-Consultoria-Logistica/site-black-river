import Image from "next/image";
import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

// Arquivos oficiais do Brandbook, limpos e exportados em 2x (Etapa 2).
// "Horizontal — Site" colorido no cabeçalho; oficial em uma cor verde (#669933) sobre preto no rodapé.
const variantes = {
  cabecalho: { src: "/brand/logo-horizontal-site.webp", largura: 230, altura: 40 },
  rodape: { src: "/brand/logo-oficial-verde.webp", largura: 140, altura: 72 },
} as const;

export function Logo({
  variante,
  className,
  prioridade = false,
  ...props
}: Omit<ComponentProps<typeof Link>, "href" | "children"> & {
  variante: keyof typeof variantes;
  prioridade?: boolean;
}) {
  const v = variantes[variante];
  return (
    <Link
      {...props}
      href="/"
      className={cn("inline-flex shrink-0", className)}
      aria-label="Black River Consultoria — página inicial"
    >
      <Image
        src={v.src}
        alt=""
        width={v.largura}
        height={v.altura}
        priority={prioridade}
        className="h-full w-auto"
      />
    </Link>
  );
}
