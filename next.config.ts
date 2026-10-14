import createMDX from "@next/mdx";
import type { NextConfig } from "next";

// Exportação estática para a Cloudflare (DESIGN/PLANO, Etapa 1).
// A única parte de servidor é a Função da Cloudflare do formulário (Etapa 10).
// Artigos de Insights em MDX no repositório, sem CMS (Etapa 8): content/insights/*.mdx.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  poweredByHeader: false,
  pageExtensions: ["ts", "tsx", "mdx"],
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
