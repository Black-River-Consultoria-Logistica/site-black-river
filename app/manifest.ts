import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Manifesto web (Etapa 13; checklists/producao.md, item 6): ícone do site no Android ao salvar na tela inicial.
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.nome,
    short_name: "Black River",
    description: site.propostaDeValor,
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    lang: "pt-BR",
    icons: [
      { src: "/icone-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icone-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
