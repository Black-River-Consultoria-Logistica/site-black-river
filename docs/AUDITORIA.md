# Auditoria antes da publicação (Etapa 13)

Feita em 14/10/2026 sobre o build estático (`out/`) servido localmente com os mesmos headers e a mesma compressão da Cloudflare. Itens que só existem com o site no ar ficam como **pendente (deploy)** e são refeitos no endereço final.

Resumo: **nenhuma falha no código.** O que falta depende de contas, dados da empresa ou do site publicado.

## Ferramentas usadas

| Verificação | Resultado |
| --- | --- |
| Testes da Função do formulário (`npm test`) | 15/15 |
| Testes no navegador (formulário, cookies, SEO/GA4) | 23 + 22 + 34 conferências, todas OK |
| CSP em 26 páginas (com GA4 aceito e formulário) | 0 violações, 0 erros no console |
| Links internos (30 destinos) e âncoras de índice | 0 quebrados |
| Rolagem horizontal e imagens quebradas (25 páginas × 375/768/1280px) | 0 |
| Texto a 200% (tamanho de fonte do navegador) | sem rolagem horizontal |
| Lighthouse celular, 10 páginas principais | desempenho 95–99 · acessibilidade 100 · boas práticas 100 · SEO 100 |
| `impeccable detect` em todo o código de interface | 0 achados |
| Gitleaks no histórico (42 commits) e em `out/` | 0 achados |

Correções feitas nesta auditoria: descriptions acima de ~160 caracteres encurtadas (Home, Soluções, Sobre, Insights, Política, verbas logísticas, artigos 1 e 3); title do artigo 1 sem o sufixo da marca (70 → 56 caracteres); manifesto web com ícones 192/512 para Android; área de toque de 44px no logo do cabeçalho e nos contatos da página de Contato.

## Produção (27 itens)

| # | Item | Situação | Onde |
| --- | --- | --- | --- |
| 1 | Página 404 personalizada | OK | `app/not-found.tsx` |
| 2 | CTA acima da dobra | OK | `components/home/home-sections.tsx`, `components/layout/mobile-cta-bar.tsx` |
| 3 | Meta title por página | OK (únicos; até 62 caracteres) | `lib/seo.ts`, páginas em `app/` |
| 4 | Meta description por página | OK (únicas; até 159 caracteres) | idem |
| 5 | Imagem Open Graph | OK no código · conferir a prévia no LinkedIn/WhatsApp no deploy | `public/og/black-river.png`, `lib/seo.ts` |
| 6 | Conjunto de favicons | OK | `app/favicon.ico`, `app/icon.png`, `app/apple-icon.png`, `app/manifest.ts` |
| 7 | robots.txt | OK | `app/robots.ts` |
| 8 | sitemap.xml | OK (23 páginas, sem /obrigado) | `app/sitemap.ts`, `lib/rotas.ts` |
| 9 | Texto alternativo | OK (logos com nome do cliente; decorativas com alt vazio) | `components/paginas/cases.tsx`, `components/layout/logo.tsx` |
| 10 | Breakpoints | OK | prints de 25 páginas em 375/768/1280px |
| 11 | CTA fixo no celular | OK | `components/layout/mobile-cta-bar.tsx` |
| 12 | Estados de carregamento | OK ("Enviando...", botão desabilitado) | `components/paginas/formulario-de-agendamento.tsx` |
| 13 | Erros de formulário | OK | idem |
| 14 | Página de agradecimento | OK (próximo passo, Insights, evento `visita_obrigado`) | `app/obrigado/page.tsx` |
| 15 | Política de privacidade | **Pendente:** revisão jurídica (#15) e razão social, CNPJ e endereço (#3) | `content/legal/privacidade.mdx` |
| 16 | Termos de uso | OK no código · revisão jurídica (#15) | `content/legal/termos.mdx` |
| 17 | Banner de cookies | OK (nada do Google antes do aceite) | `components/layout/aviso-de-cookies.tsx`, `lib/consentimento.ts` |
| 18 | Analytics instalado | OK no código · conferir no Tempo real do GA4 no deploy | `components/layout/analytics.tsx`, `lib/analytics.ts` |
| 19 | Endereço de contato real | **Pendente:** e-mail OK; endereço (#3) e WhatsApp (#10) | `lib/site.ts` |
| 20 | HTTPS forçado | **Pendente (deploy)** | `www` com HTTPS da Cloudflare Pages; endereço sem www redirecionado pelo `config/uol/.htaccess` (com SSL ligado no UOL) |
| 21 | Imagens comprimidas | OK (WebP, maior arquivo 34 KB, logos em 2× do exibido) | `public/` |
| 22 | Velocidade medida | **Pendente (deploy):** local 95–99 no celular | PageSpeed Insights no endereço final |
| 23 | Contraste | OK (AA; só tema claro) | `app/globals.css`, Lighthouse |
| 24 | Nenhum link quebrado | OK | varredura de links e âncoras |
| 25 | Proteção contra spam | OK (Turnstile + armadilha + limite de 5 envios por IP a cada 10 minutos) | `lib/formulario/processar.ts` |
| 26 | Sem cara de site gerado por IA | OK (`impeccable detect` sem achados; auditoria abaixo) | — |
| 27 | Verificação visual registrada | OK pelo Claude (prints de todas as páginas) · **conferência por uma pessoa:** João | prints enviados a cada etapa |

## Segurança (19 itens)

| # | Item | Situação | Onde |
| --- | --- | --- | --- |
| 1 | Chaves de API protegidas | OK (só no servidor; únicos `NEXT_PUBLIC_` são o ID do GA4 e a chave pública do Turnstile, opcionais) | `lib/site.ts`, `functions/api/agendamento.ts` |
| 2 | `.env` nunca exposto | OK (no `.gitignore`; site estático não publica arquivos fora de `out/`) | `.gitignore` |
| 3 | Nenhum segredo no código | OK (só valores de teste em `tests/`) | busca por key/secret/token/password |
| 4–6 | Login, permissões, dados de outro usuário | Não se aplica (sem login) | — |
| 7 | Permissões do banco | OK (RLS + política restritiva; Advisor sem alertas em 14/10) | `supabase/migrations/` |
| 8 | Regras de Storage | Não se aplica (sem arquivos) | — |
| 9 | Páginas de admin | Não se aplica (painel é o do Supabase) | — |
| 10 | Modo debug desligado | OK (build de produção, sem source maps no navegador, `poweredByHeader: false`) | `next.config.ts` |
| 11 | Sem erro detalhado | OK (erros genéricos; detalhe só no log) | `lib/formulario/processar.ts` |
| 12 | Validar tudo no servidor | OK (Zod, limite de 16 KB) | `lib/formulario/esquema.ts`, `functions/api/agendamento.ts` |
| 13 | Conteúdo do usuário sem XSS | OK (nada do visitante vira HTML; e-mails em texto puro; JSON-LD escapado) | `components/seo/json-ld.tsx` |
| 14 | Upload | Não se aplica | — |
| 15 | Injeção de SQL | OK (API REST do Supabase com JSON) | `lib/formulario/processar.ts` |
| 16 | Limite de tentativas | OK (Turnstile + armadilha + limite por IP no KV, testado) | `lib/formulario/processar.ts`, `tests/agendamento.test.ts` |
| 17 | Histórico do Git sem segredos | OK (Gitleaks 8.28.0). Revogar o token do GitHub colado na conversa em 13/10 (#8) | — |
| 18 | Headers de segurança e CORS | OK no código (CSP, HSTS, nosniff, X-Frame-Options, Referrer-Policy, Permissions-Policy; sem CORS aberto; Função confere a origem) · nota A no securityheaders.com no deploy | `public/_headers` |
| 19 | Testar como um estranho | **Pendente: João, no deploy** (janela anônima: tentar o /api/agendamento de fora, ler o banco com a chave pública) | — |

## SEO e IA (16 itens)

| # | Item | Situação | Onde |
| --- | --- | --- | --- |
| 1 | Conteúdo renderizado no servidor | OK (texto no HTML exportado) | `out/*.html` |
| 2 | Um H1 por página | OK | varredura das 25 páginas |
| 3 | HTML semântico e idioma | OK (`lang="pt-BR"`, header/nav/main/section/footer) | `app/layout.tsx` |
| 4 | URLs legíveis | OK | `lib/site.ts`, `lib/content/*` |
| 5 | Tag canônica | OK | `lib/seo.ts` |
| 6 | Palavra-chave por página | OK (title, H1 e primeiro parágrafo; tabela do CONTEUDO.md) · Cases e Insights usam o nome da página como title, como aprovado | `docs/CONTEUDO.md` |
| 7 | Dados estruturados | OK no código · Teste de pesquisa aprimorada no deploy | `lib/dados-estruturados.ts` |
| 8 | Search Console e Bing Webmaster | **Pendente (deploy)** | — |
| 9 | Perfil da Empresa no Google | **Pendente:** depende do endereço (#3) | — |
| 10 | Conteúdo em formato de resposta | OK (artigos e frentes abrem com a resposta; perguntas frequentes nas frentes) | `content/insights`, `lib/content/solucoes.ts` |
| 11 | Fatos verificáveis | OK (30+ cases, 15 anos, 30 anos do Luis, retorno em 1 dia útil, área de atendimento, datas) | Home, Sobre, artigos |
| 12 | Entidade consistente | **Pendente:** CNPJ, endereço e LinkedIn da empresa (#3) | `lib/site.ts` |
| 13 | Política para robôs de IA | OK no código (nomes verificados em 14/10) · testar os robôs no deploy (sem DNS na Cloudflare, o painel de robôs dela não se aplica) | `app/robots.ts`, `docs/pesquisa/robos-ia.md` |
| 14 | Autoria e credenciais | OK (Sobre com Luis, trajetória, formação, clientes) | `app/sobre` |
| 15 | Tráfego vindo de IA | **Pendente: João** (grupo de canais "IA" no GA4) | `docs/PUBLICACAO.md` |
| 16 | llms.txt | OK | `app/llms.txt/route.ts` |

## Auditoria técnica de interface (`/impeccable audit`)

| Dimensão | Nota | Principal achado |
| --- | --- | --- |
| Acessibilidade | 4 | Lighthouse 100; foco visível global; formulário com rótulos, erros associados e foco no primeiro erro |
| Desempenho | 4 | Fonte de 35 KB pré-carregada, imagens WebP no tamanho exibido, sem scripts de terceiros antes do aceite |
| Tema | 3 | Tokens em todo o código; só tema claro por decisão (DESIGN.md) |
| Responsivo | 4 | Sem rolagem horizontal em 375/768/1280 e com texto a 200%; áreas de toque de 44px (exceção: links dentro de frase, como permite o WCAG) |
| Integridade da implementação | 4 | Detector sem achados; sistema fiel ao DESIGN.md (raio 0, verde só na ação, faixas da marca) |
| **Total** | **19/20** | Excelente |

Animações (regras de Emil Kowalski): faixas do hero (entrada única de 250ms), aviso de cookies (200ms, `opacity` + `transform`), barra fixa de CTA (200ms, `transform`) e seta dos links (`transform`). Todas só com `motion-safe` ou sob `prefers-reduced-motion`.
