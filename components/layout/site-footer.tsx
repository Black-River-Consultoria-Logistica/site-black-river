import Link from "next/link";
import { modulos, navegacaoPrincipal, site } from "@/lib/site";
import { LinkPreferenciasDeCookies } from "./aviso-de-cookies";
import { Logo } from "./logo";

// Alvo de toque confortável (py-2) sem mudar o ritmo visual da lista.
const linkRodape =
  "inline-flex min-h-11 items-center text-small text-ink-20 underline-offset-4 transition-[color,text-decoration-color] duration-150 hover:text-paper hover:underline active:text-paper";
const tituloColuna = "flex min-h-11 items-center text-overline font-bold tracking-[0.12em] text-brand uppercase";

// Rodapé preto com logo todo verde (DESIGN.md › Componentes › Rodapé).
// Contatos e LinkedIn só aparecem quando os dados de entidade existirem (pendência #3).
export function SiteFooter() {
  const { email, whatsapp, whatsappExibicao } = site.contato;
  const ano = new Date().getFullYear(); // fixado no build; atualiza a cada publicação

  return (
    <footer className="border-t border-ink-80 bg-ink text-ink-20">
      <div className="mx-auto flex max-w-site flex-col gap-12 px-safe py-16 lg:py-24">
        <div className="grid gap-12 md:grid-cols-2 md:gap-x-6 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-3">
            <Logo variante="rodape" className="h-16 w-fit lg:h-[4.5rem]" />
            <p className="max-w-[40ch] text-small">{site.propostaDeValor}</p>
          </div>

          <nav aria-label="Soluções" className="flex flex-col gap-3 lg:col-span-4">
            <h2 className={tituloColuna}>
              <Link href="/solucoes" className="inline-flex min-h-11 items-center underline-offset-4 hover:underline">
                Soluções
              </Link>
            </h2>
            <ul className="flex flex-col">
              {modulos.map((m) => (
                <li key={m.href}>
                  <Link href={m.href} className={linkRodape}>
                    {m.rotulo}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Institucional" className="flex flex-col gap-3 lg:col-span-2">
            <h2 className={tituloColuna}>Empresa</h2>
            <ul className="flex flex-col">
              {navegacaoPrincipal
                .filter((item) => item.href !== "/solucoes")
                .map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkRodape}>
                      {item.rotulo}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-3 lg:col-span-3">
            <h2 className={tituloColuna}>Contato</h2>
            <p className="max-w-[32ch] text-small">
              Conversa de diagnóstico sem custo, online ou presencial. Atendemos no Brasil e na América Latina.
            </p>
            <ul className="flex flex-col">
              <li>
                <Link href={site.cta.href} className={linkRodape}>
                  {site.cta.rotulo}
                </Link>
              </li>
              {email && (
                <li>
                  <a href={`mailto:${email}`} className={linkRodape}>
                    {email}
                  </a>
                </li>
              )}
              {whatsapp && (
                <li>
                  <a href={`https://wa.me/${whatsapp}`} className={linkRodape} rel="noopener" target="_blank">
                    WhatsApp {whatsappExibicao}
                  </a>
                </li>
              )}
              {site.linkedin.pagina && (
                <li>
                  <a href={site.linkedin.pagina} className={linkRodape} rel="noopener" target="_blank">
                    LinkedIn
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-ink-80 pt-6 text-small sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {ano} {site.nome}
          </p>
          <ul className="flex flex-wrap gap-x-6">
            <li>
              <Link href="/privacidade" className={linkRodape}>
                Política de Privacidade
              </Link>
            </li>
            <li>
              <Link href="/termos" className={linkRodape}>
                Termos de Uso
              </Link>
            </li>
            <li>
              <LinkPreferenciasDeCookies className={`${linkRodape} cursor-pointer text-left`} />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
