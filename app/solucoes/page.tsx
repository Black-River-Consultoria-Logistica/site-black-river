import type { Metadata } from "next";
import { metadados } from "@/lib/seo";
import { AberturaSolucoes, CtaSolucoes, FrentesAgrupadas, ParaQuem } from "@/components/paginas/solucoes";

// Soluções (Etapa 6). Palavra-chave: consultoria em logística e supply chain.
export const metadata: Metadata = metadados({
  title: "Consultoria em logística e supply chain | Black River",
  description:
    "Sete frentes de trabalho, do diagnóstico da operação à malha de transporte. Todo projeto começa pelo diagnóstico, que define quais frentes a sua operação precisa.",
  caminho: "/solucoes",
});

export default function Solucoes() {
  return (
    <>
      <AberturaSolucoes />
      <FrentesAgrupadas />
      <ParaQuem />
      <CtaSolucoes />
    </>
  );
}
