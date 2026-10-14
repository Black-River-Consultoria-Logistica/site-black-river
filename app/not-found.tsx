import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { navegacaoPrincipal, site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Página não encontrada | ${site.nome}`,
  robots: { index: false },
};

// 404 (APP_FLOW: visual do site, volta à Home e ao Contato).
// Endereços do site antigo também caem aqui, então a página oferece caminhos para o conteúdo.
// No celular o CTA fica só na barra fixa (um botão primário por região).
export default function NotFound() {
  return (
    <section className="mx-auto grid max-w-site gap-12 px-4 py-16 md:px-6 md:py-24 lg:grid-cols-12 lg:gap-6 lg:py-32">
      <div className="flex flex-col gap-8 lg:col-span-7">
        <div className="flex flex-col gap-6">
          <h1 className="max-w-[16ch] text-h3 md:text-h1">Esta página não existe.</h1>
          <p className="max-w-[52ch] text-lead text-ink-80">
            O endereço pode ter mudado ou ter sido digitado com algum erro. Siga por uma das seções do site ou agende
            uma conversa com a nossa equipe.
          </p>
        </div>
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <Button asChild className="hidden lg:inline-flex">
            <Link href={site.cta.href}>{site.cta.rotulo}</Link>
          </Button>
          <Button asChild variant="link">
            <Link href="/">Voltar à página inicial</Link>
          </Button>
        </div>
      </div>

      <nav aria-label="Seções do site" className="flex flex-col gap-3 lg:col-span-4 lg:col-start-9 lg:pt-2">
        <h2 className="text-body font-bold">Talvez você procure</h2>
        <ul className="flex flex-col border-t border-ink-10">
          {navegacaoPrincipal.map((item) => (
            <li key={item.href} className="border-b border-ink-10">
              <Link
                href={item.href}
                className="flex min-h-12 items-center py-3 font-medium text-ink underline underline-offset-4 transition-[color,text-decoration-color] duration-150 hover:text-primary"
              >
                {item.rotulo}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
