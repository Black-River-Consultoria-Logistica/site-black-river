# Plano de implementação — [Nome do cliente]

Fontes: BRIEF.md · APP_FLOW.md · DESIGN.md · SCHEMA.md
Regra: executar uma etapa por vez, marcar [x], resumir e parar para aprovação. Commit ao fim de cada etapa aprovada.

> Modelo para landing page de leads. Para outros pacotes, a IA gera um plano novo na Fase 1, mantendo o formato.

## Etapa 1 — Setup
- [ ] Next.js + TypeScript + Tailwind + shadcn/ui; `components.json` com os registros de `config/components.json`
- [ ] Tokens do DESIGN.md no `globals.css`
- [ ] Decidir caminho de publicação: exportação estática ou `npx vinext check` (reportar resultado)
- [ ] Rodar `scripts/setup-design.sh`; confirmar Playwright MCP ativo (`/mcp`); `/impeccable init` apontando para `docs/`
- Pronto quando: página em branco roda local com as fontes e cores da marca

## Etapa 2 — Layout base
- [ ] Cabeçalho, rodapé (links de privacidade e termos), página 404 personalizada
- [ ] `lang="pt-BR"`, HTML semântico
- Pronto quando: navegação funciona e URL inexistente mostra a 404

## Etapa 3 — Home
- [ ] Hero com proposta de valor e CTA único acima da dobra
- [ ] Seções de prova social, benefícios, objeções e FAQ (textos do BRIEF.md, abrindo cada seção com a resposta)
- [ ] CTA fixo no celular
- [ ] `/impeccable critique` na home e `review-animations` nas animações; corrigir o que contrariar o DESIGN.md
- [ ] Prints com Playwright em 375, 768 e 1280px
- Pronto quando: home completa no desktop e no celular, sem texto de exemplo, prints conferidos (base do marco 2)

## Etapa 4 — Banco de dados
- [ ] Tabela `leads` conforme SCHEMA.md, com RLS ativo
- Pronto quando: inserção anônima funciona e leitura anônima é bloqueada

## Etapa 5 — Formulário
- [ ] Validação no servidor, erros por campo, estado de carregamento, erro de envio, consentimento LGPD
- [ ] Proteção contra spam (honeypot ou Turnstile) e limite de envios
- [ ] E-mail de aviso; redireciona para /obrigado
- Pronto quando: todos os caminhos do APP_FLOW.md foram testados

## Etapa 6 — Páginas legais e cookies
- [ ] Privacidade, termos e banner de cookies que bloqueia scripts antes do aceite
- Pronto quando: textos revisados juridicamente pelo cliente

## Etapa 7 — SEO, IA e analytics
- [ ] Meta title e description por página, Open Graph, favicons, sitemap.xml, alt text, canonical
- [ ] JSON-LD da empresa (`config/schema-org.json.example`)
- [ ] Verificar nomes dos robôs de IA (prompt em PROMPTS.md), aprovar tabela, gerar robots.txt e llms.txt
- [ ] GA4 após consentimento, eventos de conversão, canal de tráfego de IA
- Pronto quando: Lighthouse acima de 90 em SEO e acessibilidade; PageSpeed acima de 90 no celular

## Etapa 8 — Publicação
- [ ] `/impeccable polish` e `/impeccable audit`; `npx impeccable detect` sem achados críticos; `break-ui` com dados extremos
- [ ] Auditoria contra `checklists/producao.md`, `checklists/seguranca.md` e `checklists/seo-ia.md`
- [ ] `docs/LICENCAS.md` completo
- [ ] Deploy na Cloudflare, domínio, HTTPS forçado, configuração de robôs de IA conferida
- [ ] Search Console e Bing Webmaster com sitemap enviado
- Pronto quando: todos os itens aplicáveis dos três checklists estão OK no site publicado
