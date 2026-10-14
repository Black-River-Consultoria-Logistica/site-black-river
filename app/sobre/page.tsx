import type { Metadata } from "next";
import { AberturaSobre, CtaSobre, Diferenciais, Equipe, Historia, OndeAtendemos } from "@/components/paginas/sobre";

// Sobre (Etapa 5). Palavra-chave: Black River Consultoria · Luis Ricardo Pedro.
export const metadata: Metadata = {
  title: "Sobre a Black River e Luis Ricardo Pedro",
  description:
    "Consultoria em logística e supply chain para o varejo: mais de 30 cases em 15 anos, conduzidos por Luis Ricardo Pedro, ex-diretor de Supply Chain do Grupo Pão de Açúcar e do Carrefour.",
};

export default function Sobre() {
  return (
    <>
      <AberturaSobre />
      <Equipe />
      <Diferenciais />
      <Historia />
      <OndeAtendemos />
      <CtaSobre />
    </>
  );
}
