import type { Metadata } from "next";
import { metadados } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { pessoa } from "@/lib/dados-estruturados";
import { equipe } from "@/lib/content/sobre";
import { AberturaSobre, CtaSobre, Diferenciais, Equipe, Historia, OndeAtendemos } from "@/components/paginas/sobre";

// Sobre (Etapa 5). Palavra-chave: Black River Consultoria · Luis Ricardo Pedro.
export const metadata: Metadata = metadados({
  title: "Sobre a Black River e Luis Ricardo Pedro",
  description:
    "Consultoria em logística e supply chain para o varejo: mais de 30 cases em 15 anos, conduzidos por Luis Ricardo Pedro, ex-diretor de Supply Chain do Grupo Pão de Açúcar e do Carrefour.",
  caminho: "/sobre",
});

export default function Sobre() {
  return (
    <>
      <JsonLd
        dados={equipe.map((p) =>
          pessoa({ nome: p.nome, cargo: p.cargo, foto: p.foto?.src, descricao: p.bio[0], linkedin: p.linkedin }),
        )}
      />
      <AberturaSobre />
      <Equipe />
      <Diferenciais />
      <Historia />
      <OndeAtendemos />
      <CtaSobre />
    </>
  );
}
