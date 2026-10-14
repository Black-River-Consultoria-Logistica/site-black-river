"use client";

import { useSyncExternalStore } from "react";
import { VERSAO_POLITICA } from "@/lib/formulario/esquema";

// Consentimento de cookies (Etapa 11). Guardado só no navegador do visitante (localStorage), por 12 meses
// ou até a Política de Privacidade mudar de versão; depois o aviso aparece de novo.
// O GA4 (Etapa 12) só pode ser carregado quando `useConsentimento()` devolver { analitico: true }.
// Sem armazenamento disponível (janela anônima restrita, por exemplo), a escolha vale só até fechar a página.

const CHAVE = "br:consentimento";
const VALIDADE_MS = 365 * 24 * 60 * 60 * 1000;
const EVENTO_PREFERENCIAS = "br:abrir-preferencias-de-cookies";

export type Escolha = { analitico: boolean };
/** null = ainda sem escolha válida (o aviso deve aparecer). */
export type Estado = Escolha | null;

type Registro = Escolha & { versao: string; data: string };

let memoria: Estado | undefined;
const ouvintes = new Set<() => void>();

function lerDoNavegador(): Estado {
  try {
    const bruto = window.localStorage.getItem(CHAVE);
    if (!bruto) return null;
    const r = JSON.parse(bruto) as Partial<Registro>;
    const valido =
      typeof r.analitico === "boolean" &&
      r.versao === VERSAO_POLITICA &&
      typeof r.data === "string" &&
      Date.now() - Date.parse(r.data) < VALIDADE_MS;
    return valido ? { analitico: r.analitico as boolean } : null;
  } catch {
    return null;
  }
}

function ler(): Estado {
  if (memoria === undefined) memoria = lerDoNavegador();
  return memoria;
}

export function decidir(escolha: Escolha) {
  memoria = { analitico: escolha.analitico };
  try {
    const registro: Registro = { ...memoria, versao: VERSAO_POLITICA, data: new Date().toISOString() };
    window.localStorage.setItem(CHAVE, JSON.stringify(registro));
  } catch {
    // sem armazenamento: vale só nesta página
  }
  ouvintes.forEach((o) => o());
}

function assinar(ouvinte: () => void) {
  ouvintes.add(ouvinte);
  // Outra aba mudou a escolha: acompanha.
  const aoMudar = (e: StorageEvent) => {
    if (e.key === CHAVE) {
      memoria = lerDoNavegador();
      ouvinte();
    }
  };
  window.addEventListener("storage", aoMudar);
  return () => {
    ouvintes.delete(ouvinte);
    window.removeEventListener("storage", aoMudar);
  };
}

/**
 * Escolha atual. No servidor e no primeiro desenho devolve `undefined` (ainda não se sabe):
 * nesse estado nada de analytics carrega e o aviso não aparece.
 */
export function useConsentimento(): Estado | undefined {
  return useSyncExternalStore(assinar, ler, () => undefined);
}

/** Reabre o aviso já no painel de preferências (link "Preferências de cookies" do rodapé). */
export function abrirPreferencias() {
  window.dispatchEvent(new Event(EVENTO_PREFERENCIAS));
}

export function aoPedirPreferencias(callback: () => void) {
  window.addEventListener(EVENTO_PREFERENCIAS, callback);
  return () => window.removeEventListener(EVENTO_PREFERENCIAS, callback);
}
