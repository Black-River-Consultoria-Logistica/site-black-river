import type { Metadata } from "next";
import Link from "next/link";
import { container, linkTexto, TextoComSeta } from "@/components/site/blocos";
import { obrigado } from "@/lib/content/contato";
import { cn } from "@/lib/utils";

// Obrigado (Etapa 10). Fora do Google: só faz sentido depois do envio. O evento de conversão do GA4
// entra na Etapa 12, junto com o banner de cookies.
export const metadata: Metadata = {
  title: "Obrigado | Black River",
  robots: { index: false, follow: true },
};

export default function Obrigado() {
  return (
    <section aria-labelledby="obrigado-titulo">
      <div className={cn(container, "flex flex-col gap-6 py-16 md:py-24 lg:py-32")}>
        <h1 id="obrigado-titulo" className="max-w-[20ch] text-h3 text-balance md:text-h1">
          {obrigado.titulo}
        </h1>
        <p className="max-w-[60ch] text-lead text-ink-80">{obrigado.texto}</p>
        <div className="mt-6 flex flex-col gap-1 border-t border-ink-10 pt-6 lg:max-w-[60ch]">
          <p className="text-ink-80">{obrigado.enquantoIsso}</p>
          <Link href={obrigado.link.href} className={cn(linkTexto, "self-start")}>
            <TextoComSeta>{obrigado.link.rotulo}</TextoComSeta>
          </Link>
        </div>
      </div>
    </section>
  );
}
