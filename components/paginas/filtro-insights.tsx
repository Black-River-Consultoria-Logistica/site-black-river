"use client";

import { useEffect, useState } from "react";
import { CardDeArtigo } from "@/components/site/cards";
import { cn } from "@/lib/utils";

// Filtro da lista de Insights por frente de trabalho (Etapa 8). A lista inteira vem no HTML do servidor;
// o filtro só esconde cards no navegador. A escolha fica no endereço (?frente=<código>) para poder ser compartilhada.

// `diagrama` chega pronto do servidor (elemento React), como os demais dados.
export type ItemDaLista = {
  href: string;
  titulo: string;
  resumo: string;
  rotulo: string;
  autor: string;
  data: string;
  dataIso: string;
  codigo: string;
  diagrama?: React.ReactNode;
};

export function ListaFiltravel({
  itens,
  opcoes,
  rotuloTodas,
}: {
  itens: ItemDaLista[];
  opcoes: { codigo: string; rotulo: string }[];
  rotuloTodas: string;
}) {
  const [ativa, setAtiva] = useState<string | null>(null);

  useEffect(() => {
    try {
      const codigo = new URLSearchParams(window.location.search).get("frente");
      if (codigo && opcoes.some((o) => o.codigo === codigo)) setAtiva(codigo);
    } catch {
      // Sem acesso ao endereço: mostra todos.
    }
  }, [opcoes]);

  function escolher(codigo: string | null) {
    setAtiva(codigo);
    try {
      const url = new URL(window.location.href);
      if (codigo) url.searchParams.set("frente", codigo);
      else url.searchParams.delete("frente");
      window.history.replaceState(null, "", url);
    } catch {
      // Endereço não atualizável: o filtro continua funcionando na página.
    }
  }

  const visiveis = ativa ? itens.filter((i) => i.codigo === ativa) : itens;
  const botoes = [{ codigo: null, rotulo: rotuloTodas }, ...opcoes];

  return (
    <div className="flex flex-col gap-8">
      <div role="group" aria-label="Filtrar por frente de trabalho" className="flex flex-wrap gap-2">
        {botoes.map((b) => {
          const pressionado = ativa === b.codigo;
          return (
            <button
              key={b.codigo ?? "todas"}
              type="button"
              aria-pressed={pressionado}
              onClick={() => escolher(b.codigo)}
              className={cn(
                "min-h-11 border px-4 text-small font-medium transition-[color,background-color,border-color] duration-150",
                pressionado
                  ? "border-ink bg-ink text-paper"
                  : "border-ink-20 bg-paper text-ink hover:border-ink active:border-ink",
              )}
            >
              {b.rotulo}
            </button>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        {visiveis.length === 1 ? "1 artigo" : `${visiveis.length} artigos`}
      </p>
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {visiveis.map((i) => (
          <li key={i.href}>
            <CardDeArtigo {...i} />
          </li>
        ))}
      </ul>
    </div>
  );
}
