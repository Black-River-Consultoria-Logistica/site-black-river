import type { Metadata } from "next";
import { container, overline } from "@/components/site/blocos";
import { CanaisDiretos, FormularioDeAgendamento } from "@/components/paginas/formulario-de-agendamento";
import { contato } from "@/lib/content/contato";
import { cn } from "@/lib/utils";

// Contato (Etapa 10). Palavra-chave: agendar diagnóstico logístico. Sem barra fixa de CTA (APP_FLOW).
export const metadata: Metadata = {
  title: "Agende uma conversa de diagnóstico | Black River",
  description:
    "Agende uma conversa de diagnóstico logístico com a Black River Consultoria: sem custo, online ou presencial. Retorno em até 1 dia útil.",
};

export default function Contato() {
  return (
    <section aria-labelledby="contato-titulo">
      <div className={cn(container, "grid gap-10 pt-16 pb-16 md:pt-20 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-12 lg:pt-24 lg:pb-24")}>
        <div className="flex flex-col gap-6 lg:col-span-8">
          <h1 id="contato-titulo" className="max-w-[20ch] text-h3 text-balance md:text-h1">
            {contato.titulo}
          </h1>
          <p className="max-w-[60ch] text-lead text-ink-80">{contato.abertura}</p>
        </div>

        <div className="lg:col-span-7 lg:row-start-2">
          <FormularioDeAgendamento />
        </div>

        <aside
          aria-labelledby="o-que-esperar"
          className="flex flex-col gap-4 lg:col-span-4 lg:col-start-9 lg:row-start-2 lg:self-start"
        >
          <h2 id="o-que-esperar" className={cn(overline, "text-ink-60")}>
            {contato.oQueEsperar.titulo}
          </h2>
          <ol className="flex flex-col border-t border-ink-10">
            {contato.oQueEsperar.itens.map((item, i) => (
              <li key={item} className="flex gap-4 border-b border-ink-10 py-4">
                <span aria-hidden className="w-6 shrink-0 font-bold text-primary tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-ink-80">{item}</span>
              </li>
            ))}
          </ol>
          <CanaisDiretos className="pt-2" />
        </aside>
      </div>
    </section>
  );
}
