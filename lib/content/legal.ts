import { readFileSync } from "node:fs";
import path from "node:path";
import type { MDXContent } from "mdx/types";
import Privacidade from "@/content/legal/privacidade.mdx";
import Termos from "@/content/legal/termos.mdx";
import { VERSAO_POLITICA } from "@/lib/formulario/esquema";

// Páginas legais (Etapa 11). Textos em content/legal/*.mdx, em revisão jurídica da Black River
// (Claude Doc da Etapa 11). Data de atualização: muda a cada versão publicada.

export type DocumentoLegal = {
  slug: "privacidade" | "termos";
  titulo: string;
  title: string;
  description: string;
  abertura: string;
  atualizado: string;
  versao?: string;
  Corpo: MDXContent;
};

export const politicaDePrivacidade: DocumentoLegal = {
  slug: "privacidade",
  titulo: "Política de Privacidade",
  title: "Política de Privacidade | Black River",
  description:
    "Como a Black River trata os dados pessoais do site: o que coleta, para que usa, com quem compartilha, por quanto tempo guarda e como exercer os seus direitos.",
  abertura:
    "Esta política explica, em linguagem direta, quais dados pessoais o site da Black River coleta, para que usa, com quem compartilha, por quanto tempo guarda e como você exerce os seus direitos.",
  atualizado: "2026-10-14",
  versao: VERSAO_POLITICA,
  Corpo: Privacidade,
};

export const termosDeUso: DocumentoLegal = {
  slug: "termos",
  titulo: "Termos de Uso",
  title: "Termos de Uso | Black River",
  description: "Regras de uso do site da Black River Consultoria: conteúdo, conversa de diagnóstico, propriedade intelectual e foro.",
  abertura: "Estas são as regras para usar o site da Black River: o que ele oferece, o que é permitido e quais são as responsabilidades de cada lado.",
  atualizado: "2026-10-14",
  Corpo: Termos,
};

/** Títulos das seções (## do MDX), lidos do arquivo no build, para o índice. */
export function secoesDoDocumento(d: Pick<DocumentoLegal, "slug">) {
  const fonte = readFileSync(path.join(process.cwd(), "content/legal", `${d.slug}.mdx`), "utf8");
  return [...fonte.matchAll(/^## (.+)$/gm)].map((m) => m[1].trim());
}
