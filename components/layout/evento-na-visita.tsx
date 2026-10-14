"use client";

import { useEffect } from "react";
import { registrarEvento, type Evento } from "@/lib/analytics";

/** Registra um evento do GA4 quando a página abre (ex.: visita ao /obrigado). Sem aceite, não faz nada. */
export function EventoNaVisita({ evento }: { evento: Evento }) {
  useEffect(() => {
    registrarEvento(evento);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
