import type { Metadata } from "next";
import { metadados } from "@/lib/seo";
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
export const metadata: Metadata = metadados({
  title: "Consultoria em logística para varejo e atacado | Black River",
  description:
    "Consultoria em logística para varejo e atacado. Executamos junto com o seu time, com a bagagem de quem dirigiu grandes operações do varejo.",
  caminho: "/",
});

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
