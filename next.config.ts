import type { NextConfig } from "next";

// Exportação estática para a Cloudflare (DESIGN/PLANO, Etapa 1).
// A única parte de servidor é a Função da Cloudflare do formulário (Etapa 10).
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
