"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { linkInline } from "@/components/site/blocos";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cookies as textos } from "@/lib/content/cookies";
import { abrirPreferencias, aoPedirPreferencias, decidir, useConsentimento } from "@/lib/consentimento";
import { rotaAtiva, rotasSemBarraDeCta } from "@/lib/site";
import { cn } from "@/lib/utils";

// Aviso de cookies (Etapa 11; DESIGN.md › Banner de cookies). Fundo branco, sombra única, até 480px, no canto
// inferior. "Aceitar" e "Recusar" com o mesmo peso visual (LGPD); "Preferências" como link.
// No celular fica empilhado acima da barra fixa de CTA (decisão do João, 14/10/2026). Não bloqueia a página.

type Modo = "aviso" | "preferencias";

const botaoDeEscolha = "flex-1 border border-ink bg-paper text-ink hover:bg-ink hover:text-paper active:bg-ink active:text-paper";

export function AvisoDeCookies() {
  const estado = useConsentimento();
  const pathname = usePathname();
  const [aberto, setAberto] = useState<Modo | null>(null);
  const [analitico, setAnalitico] = useState(false);
  const tituloPreferencias = useRef<HTMLHeadingElement>(null);
  const idTitulo = useId();
  const idTexto = useId();

  // Link "Preferências de cookies" do rodapé: abre direto no painel, com a escolha atual marcada.
  useEffect(
    () =>
      aoPedirPreferencias(() => {
        setAnalitico(estado?.analitico ?? false);
        setAberto("preferencias");
      }),
    [estado],
  );

  useEffect(() => {
    if (aberto === "preferencias") tituloPreferencias.current?.focus();
  }, [aberto]);

  if (estado === undefined) return null; // ainda lendo a escolha: nada aparece, nada carrega
  const modo: Modo | null = aberto ?? (estado === null ? "aviso" : null);
  if (!modo) return null;

  const comBarraDeCta = !rotasSemBarraDeCta.some((r) => rotaAtiva(pathname, r));

  function escolher(valor: boolean) {
    decidir({ analitico: valor });
    setAberto(null);
  }

  return (
    <section
      aria-labelledby={idTitulo}
      aria-describedby={modo === "aviso" ? idTexto : undefined}
      className={cn(
        "fixed inset-x-4 z-50 flex flex-col gap-4 border border-ink-10 bg-paper p-5 text-ink shadow-[0_4px_16px_rgba(0,0,0,0.12)]",
        "motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2 motion-safe:duration-200",
        "md:right-auto md:left-6 md:w-[min(480px,calc(100vw-3rem))] lg:bottom-6",
        // Acima da barra fixa de CTA (4,5rem + área segura) no celular e tablet; sem ela, rente ao rodapé da tela.
        comBarraDeCta ? "bottom-[calc(5.25rem+env(safe-area-inset-bottom))]" : "bottom-[max(1rem,env(safe-area-inset-bottom))]",
      )}
    >
      {modo === "aviso" ? (
        <>
          <div className="flex flex-col gap-2">
            <h2 id={idTitulo} className="text-body font-bold">
              {textos.titulo}
            </h2>
            <p id={idTexto} className="text-small text-ink-80">
              {textos.texto}{" "}
              <Link href="/privacidade" className={linkInline}>
                {textos.linkPolitica}
              </Link>
              .
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <Button type="button" variant="outline" className={botaoDeEscolha} onClick={() => escolher(true)}>
                {textos.aceitar}
              </Button>
              <Button type="button" variant="outline" className={botaoDeEscolha} onClick={() => escolher(false)}>
                {textos.recusar}
              </Button>
            </div>
            <Button
              type="button"
              variant="link"
              className="min-h-11 self-start text-small"
              onClick={() => {
                setAnalitico(false);
                setAberto("preferencias");
              }}
            >
              {textos.preferencias}
            </Button>
          </div>
        </>
      ) : (
        <>
          <h2 id={idTitulo} ref={tituloPreferencias} tabIndex={-1} className="text-body font-bold outline-none">
            {textos.painel.titulo}
          </h2>
          <ul className="flex flex-col border-t border-ink-10">
            <li className="flex items-start justify-between gap-4 border-b border-ink-10 py-3">
              <div className="flex flex-col gap-1">
                <p className="text-small font-semibold">{textos.painel.necessarios.titulo}</p>
                <p className="text-small text-ink-80">{textos.painel.necessarios.texto}</p>
              </div>
              <p className="shrink-0 text-small text-ink-60">{textos.painel.necessarios.estado}</p>
            </li>
            <li className="flex items-start justify-between gap-4 border-b border-ink-10 py-3">
              <div className="flex flex-col gap-1">
                <label htmlFor="cookies-analitico" className="text-small font-semibold">
                  {textos.painel.analitico.titulo}
                </label>
                <p className="text-small text-ink-80">{textos.painel.analitico.texto}</p>
              </div>
              {/* Alvo de toque de 44px em volta da caixa de 20px. */}
              <span className="-m-3 flex size-11 shrink-0 items-center justify-center">
                <Checkbox id="cookies-analitico" checked={analitico} onCheckedChange={(v) => setAnalitico(v === true)} />
              </span>
            </li>
          </ul>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Button type="button" variant="outline" className={cn(botaoDeEscolha, "flex-none")} onClick={() => escolher(analitico)}>
              {textos.painel.salvar}
            </Button>
            <Button
              type="button"
              variant="link"
              className="min-h-11 text-small"
              onClick={() => setAberto(estado === null ? "aviso" : null)}
            >
              {textos.painel.cancelar}
            </Button>
          </div>
        </>
      )}
    </section>
  );
}

/** Link do rodapé que reabre as preferências (revogar o consentimento tem de ser tão fácil quanto dar). */
export function LinkPreferenciasDeCookies({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={abrirPreferencias}>
      {textos.linkRodape}
    </button>
  );
}
