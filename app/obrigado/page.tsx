import type { Metadata } from "next";
import { metadados } from "@/lib/seo";
import Link from "next/link";
import { EventoNaVisita } from "@/components/layout/evento-na-visita";
import { container, linkTexto, TextoComSeta } from "@/components/site/blocos";
import { obrigado } from "@/lib/content/contato";
import { cn } from "@/lib/utils";

// Obrigado (Etapa 10). Fora do Google: só faz sentido depois do envio. Evento "visita_obrigado" no GA4
// (Etapa 12), só com o aceite de cookies; a conversão principal é o "generate_lead" do formulário.
export const metadata: Metadata = metadados({
  title: "Obrigado | Black River",
  description:
    "Pedido de conversa de diagnóstico recebido pela Black River Consultoria.",
  caminho: "/obrigado",
  indexar: false,
});

export default function Obrigado() {
  return (
    <section aria-labelledby="obrigado-titulo">
      <EventoNaVisita evento={{ nome: "visita_obrigado" }} />
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
