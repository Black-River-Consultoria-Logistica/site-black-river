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

// Home (Etapa 4). Palavra-chave: consultoria em logística para varejo e atacado.
export const metadata: Metadata = {
  title: "Consultoria em logística para varejo e atacado | Black River",
};

export default function Home() {
  return (
    <>
      <Hero />
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
