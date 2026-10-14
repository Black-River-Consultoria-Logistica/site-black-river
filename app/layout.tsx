import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@/components/layout/analytics";
import { AvisoDeCookies } from "@/components/layout/aviso-de-cookies";
import { MobileCtaBar } from "@/components/layout/mobile-cta-bar";
import { RastreioDeOrigem } from "@/components/layout/rastreio-de-origem";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { JsonLd } from "@/components/seo/json-ld";
import { organizacao, website } from "@/lib/dados-estruturados";
import { site } from "@/lib/site";
import "./globals.css";

// Archivo, substituta web da Bliss Pro (DESIGN.md). Pré-carregada, com fonte de reserva ajustada
// para o texto não "pular" na troca (Etapa 12, desempenho no celular).
const archivo = localFont({
  src: "../node_modules/@fontsource-variable/archivo/files/archivo-latin-wght-normal.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-archivo",
  fallback: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.nome,
  description:
    "Consultoria em logística com a bagagem de quem esteve à frente de grandes operações do varejo.",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={archivo.variable}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#conteudo"
          className="sr-only z-50 bg-paper font-semibold text-ink focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:px-4 focus:py-3"
        >
          Pular para o conteúdo
        </a>
        <JsonLd dados={[organizacao(), website()]} />
        <SiteHeader />
        <main id="conteudo" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <SiteFooter />
        <MobileCtaBar />
        <RastreioDeOrigem />
        <AvisoDeCookies />
        <Analytics />
      </body>
    </html>
  );
}
