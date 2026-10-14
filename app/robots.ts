import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// robots.txt (Etapa 12). Política aprovada pelo João em 14/10/2026: liberar busca, visitas a pedido do
// usuário e treino de IA. Nomes conferidos na documentação oficial (docs/pesquisa/robos-ia.md).
// Os robôs de IA aparecem nomeados só para deixar a política explícita; todos têm a mesma regra.
// Um grupo próprio faz o robô ignorar o grupo "*", por isso cada grupo repete o bloqueio de /api/.
export const dynamic = "force-static";

const ROBOS_DE_IA = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "Claude-SearchBot",
  "Claude-User",
  "ClaudeBot",
  "Google-Extended",
  "PerplexityBot",
  "Perplexity-User",
  "Applebot-Extended",
  "meta-externalagent",
  "meta-webindexer",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: ROBOS_DE_IA, allow: "/", disallow: "/api/" },
      { userAgent: "*", allow: "/", disallow: "/api/" },
    ],
    sitemap: new URL("/sitemap.xml", site.url).toString(),
  };
}
