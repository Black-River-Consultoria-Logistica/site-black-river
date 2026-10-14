"use client";

// Eventos do GA4 (Etapa 12). Só saem com o aceite no aviso de cookies: sem a tag carregada,
// `registrarEvento` não faz nada. Nunca enviar dado pessoal (nome, e-mail, telefone) em evento.

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export type Evento =
  | { nome: "generate_lead"; params?: { frente?: string; origem?: string } }
  | { nome: "visita_obrigado" }
  | { nome: "contato_whatsapp"; params?: { local?: string } }
  | { nome: "contato_email"; params?: { local?: string } };

export function registrarEvento(evento: Evento) {
  if (typeof window === "undefined" || !window.dataLayer) return;
  // O gtag.js só entende o objeto `arguments`, não um array comum.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function gtag(..._args: unknown[]) {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  }
  gtag("event", evento.nome, "params" in evento ? (evento.params ?? {}) : {});
}
