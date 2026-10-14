import { linkInline } from "@/components/site/blocos";
import { VERSAO_POLITICA } from "@/lib/formulario/esquema";
import { site } from "@/lib/site";

// Dados variáveis usados dentro dos textos legais (content/legal/*.mdx). Tudo vem de lib/site.ts:
// o que ainda é null (razão social, CNPJ, endereço: pendência #3) simplesmente não aparece.

/** ", razão social X, inscrita no CNPJ Y, com sede em Z," — só as partes já informadas. */
export function Controlador() {
  const { razaoSocial, cnpj, endereco } = site.entidade;
  const partes = [
    razaoSocial && `razão social ${razaoSocial}`,
    cnpj && `inscrita no CNPJ ${cnpj}`,
    endereco && `com sede em ${endereco}`,
  ].filter(Boolean);
  return partes.length ? <>, {partes.join(", ")},</> : null;
}

export function EmailDoEncarregado() {
  const { email } = site.privacidade;
  return (
    <a href={`mailto:${email}`} className={`${linkInline} break-words`}>
      {email}
    </a>
  );
}

export function Encarregado() {
  return <>{site.privacidade.encarregado}</>;
}

export function Foro() {
  return <>{site.entidade.cidadeDoForo}</>;
}

export function Versao() {
  return <>{VERSAO_POLITICA}</>;
}

export function EmailDeContato() {
  const { email } = site.contato;
  return email ? (
    <a href={`mailto:${email}`} className={`${linkInline} break-words`}>
      {email}
    </a>
  ) : (
    <EmailDoEncarregado />
  );
}
