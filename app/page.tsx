import type { Metadata } from "next";
import {
  AntesDepois,
  Cases,
  CtaFinal,
  Hero,
  Insights,
  Jornada,
  Objecoes,
  Solucoes,
} from "@/components/home/home-sections";
import { FaixaDeLogos } from "@/components/paginas/cases";

// Home (Etapa 4). Palavra-chave: consultoria em logística para varejo e atacado.
export const metadata: Metadata = {
  title: "Consultoria em logística para varejo e atacado | Black River",
};

export default function Home() {
  return (
    <>
      <Hero />
      {/* Logos autorizados logo abaixo do hero (decisão do João, Etapa 7, 14/10/2026). */}
      <FaixaDeLogos compacta />
      <AntesDepois />
      <Jornada />
      <Solucoes />
      <Cases />
      <Insights />
      <Objecoes />
      <CtaFinal />
    </>
  );
}
