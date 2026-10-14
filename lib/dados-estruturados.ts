// Dados estruturados schema.org (Etapa 12; checklists/seo-ia.md, itens 7 e 12).
// Entidade única: o mesmo nome, e-mail e links em todas as páginas. O que ainda é null em lib/site.ts
// (razão social, CNPJ, endereço, LinkedIn da empresa: pendência #3) simplesmente fica de fora.

import { imagemOg } from "@/lib/seo";
import { modulos, site } from "@/lib/site";

const url = (caminho: string) => new URL(caminho, site.url).toString();

export const ID_ORGANIZACAO = url("/#organizacao");
export const ID_LUIS = url("/sobre#luis-ricardo-pedro");
const ID_SITE = url("/#site");

export function organizacao() {
  const { razaoSocial, cnpj, endereco } = site.entidade;
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": ID_ORGANIZACAO,
    name: site.nome,
    ...(razaoSocial ? { legalName: razaoSocial } : {}),
    ...(cnpj ? { taxID: cnpj } : {}),
    ...(endereco ? { address: endereco } : {}),
    url: site.url,
    logo: url("/brand/logo-horizontal-site.png"),
    image: url(imagemOg.url),
    description: site.propostaDeValor,
    ...(site.contato.email ? { email: site.contato.email } : {}),
    ...(site.contato.whatsapp ? { telephone: `+${site.contato.whatsapp}` } : {}),
    areaServed: [
      { "@type": "Country", name: "Brasil" },
      { "@type": "Place", name: "América Latina" },
    ],
    knowsAbout: ["Logística", "Supply chain", "Varejo", "Atacado", "Centro de Distribuição", ...modulos.map((m) => m.rotulo)],
    founder: { "@id": ID_LUIS },
    ...(site.linkedin.pagina ? { sameAs: [site.linkedin.pagina] } : {}),
  };
}

export function website() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": ID_SITE,
    url: site.url,
    name: site.nome,
    inLanguage: "pt-BR",
    publisher: { "@id": ID_ORGANIZACAO },
  };
}

export function pessoa(p: { nome: string; cargo: string; foto?: string | null; descricao: string; linkedin?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": ID_LUIS,
    name: p.nome,
    jobTitle: p.cargo,
    description: p.descricao,
    ...(p.foto ? { image: url(p.foto) } : {}),
    worksFor: { "@id": ID_ORGANIZACAO },
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Escola Politécnica da Universidade de São Paulo" },
      { "@type": "CollegeOrUniversity", name: "Fundação Getulio Vargas" },
    ],
    ...(p.linkedin ? { sameAs: [p.linkedin] } : {}),
  };
}

export function servico(s: { nome: string; descricao: string; caminho: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.nome,
    description: s.descricao,
    url: url(s.caminho),
    serviceType: "Consultoria em logística e supply chain",
    provider: { "@id": ID_ORGANIZACAO },
    areaServed: { "@type": "Country", name: "Brasil" },
  };
}

export function perguntasFrequentes(perguntas: { pergunta: string; resposta: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: perguntas.map((q) => ({
      "@type": "Question",
      name: q.pergunta,
      acceptedAnswer: { "@type": "Answer", text: q.resposta },
    })),
  };
}

export function artigo(a: { titulo: string; descricao: string; caminho: string; data: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.titulo,
    description: a.descricao,
    url: url(a.caminho),
    mainEntityOfPage: url(a.caminho),
    datePublished: a.data,
    dateModified: a.data,
    inLanguage: "pt-BR",
    image: url(imagemOg.url),
    author: { "@id": ID_LUIS },
    publisher: { "@id": ID_ORGANIZACAO },
  };
}

/** Trilha: Início › … › página atual. */
export function trilha(itens: { nome: string; caminho: string }[]) {
  const todos = [{ nome: "Início", caminho: "/" }, ...itens];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: todos.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.nome, item: url(it.caminho) })),
  };
}
