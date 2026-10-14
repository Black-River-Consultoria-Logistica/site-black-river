import type { MetadataRoute } from "next";
import { todasAsRotas } from "@/lib/rotas";
import { site } from "@/lib/site";

// sitemap.xml (Etapa 12). Fica de fora só o /obrigado, que não deve aparecer em buscas.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return todasAsRotas().map(({ caminho, data }) => ({
    url: new URL(caminho, site.url).toString(),
    ...(data ? { lastModified: data } : {}),
  }));
}
