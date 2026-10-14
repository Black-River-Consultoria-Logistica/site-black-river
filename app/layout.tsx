import type { Metadata, Viewport } from "next";
import { MobileCtaBar } from "@/components/layout/mobile-cta-bar";
import { RastreioDeOrigem } from "@/components/layout/rastreio-de-origem";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { site } from "@/lib/site";
import "./globals.css";

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
    <html lang="pt-BR">
      <body className="flex min-h-dvh flex-col">
        <a
          href="#conteudo"
          className="sr-only z-50 bg-paper font-semibold text-ink focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:px-4 focus:py-3"
        >
          Pular para o conteúdo
        </a>
        <SiteHeader />
        <main id="conteudo" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <SiteFooter />
        <MobileCtaBar />
        <RastreioDeOrigem />
      </body>
    </html>
  );
}
