import type { Metadata } from "next";
import { AberturaComo, CtaComo, Passos, Prazos } from "@/components/paginas/como-trabalhamos";

// Como trabalhamos (Etapa 5). Palavra-chave: como funciona uma consultoria de logística.
export const metadata: Metadata = {
  title: "Como funciona a consultoria de logística | Black River",
  description:
    "Três etapas: diagnóstico validado pelo cliente, cronograma com entregas definidas e execução conjunta dentro da operação, até o seu time sustentar o resultado.",
};

export default function ComoTrabalhamos() {
  return (
    <>
      <AberturaComo />
      <Passos />
      <Prazos />
      <CtaComo />
    </>
  );
}
