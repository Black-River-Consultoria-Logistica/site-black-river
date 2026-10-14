"use client";

import { useEffect } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { registrarEvento } from "@/lib/analytics";
import { useConsentimento } from "@/lib/consentimento";
import { site } from "@/lib/site";

// GA4 (Etapa 12; CLAUDE.md: carregado só após o consentimento). Antes do aceite, nenhum script do Google
// entra na página. Se a pessoa revogar depois, a coleta é desligada na hora e os cookies _ga são apagados.
export function Analytics() {
  const estado = useConsentimento();
  const id = site.analytics.ga4;
  const permitido = estado?.analitico === true;

  useEffect(() => {
    const chave = `ga-disable-${id}` as const;
    (window as unknown as Record<string, boolean>)[chave] = !permitido;
    if (!permitido) apagarCookiesDoGa();
  }, [permitido, id]);

  // Cliques em WhatsApp e e-mail, em qualquer página (rodapé, contato, mensagem de falha).
  useEffect(() => {
    if (!permitido) return;
    function aoClicar(e: MouseEvent) {
      const link = (e.target as Element | null)?.closest?.("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const local = window.location.pathname;
      if (href.startsWith("https://wa.me/")) registrarEvento({ nome: "contato_whatsapp", params: { local } });
      else if (href.startsWith("mailto:")) registrarEvento({ nome: "contato_email", params: { local } });
    }
    document.addEventListener("click", aoClicar);
    return () => document.removeEventListener("click", aoClicar);
  }, [permitido]);

  return permitido && id ? <GoogleAnalytics gaId={id} /> : null;
}

function apagarCookiesDoGa() {
  const partes = window.location.hostname.split(".");
  const dominios = partes.map((_, i) => partes.slice(i).join(".")).filter((d) => d.includes("."));
  for (const nome of document.cookie.split(";").map((c) => c.split("=")[0].trim())) {
    if (!nome.startsWith("_ga")) continue;
    document.cookie = `${nome}=; Max-Age=0; path=/`;
    for (const d of dominios) document.cookie = `${nome}=; Max-Age=0; path=/; domain=.${d}`;
  }
}
