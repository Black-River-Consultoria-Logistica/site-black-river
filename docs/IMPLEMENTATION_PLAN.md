# Plano de implementação — Black River Consultoria

Fontes: BRIEF.md · APP_FLOW.md · DESIGN.md · SCHEMA.md (todos aprovados em 13/10/2026)
Regra: executar uma etapa por vez, marcar [x], resumir e parar para aprovação. Commit ao fim de cada etapa aprovada (`etapa N: <resumo>`).

> Plano gerado para o pacote **institucional + conteúdo** (o modelo do kit era de landing page). Equivalência com a skill `construir-site`: "pré-publicação" = Etapas 1 a 12 marcadas; "publicado" = Etapa 13 marcada.
> Prazo: o mais rápido possível. A redação (Etapa 3) pode correr em paralelo às Etapas 1 e 2.
> Marcos do cliente: 1. brief ✓ · 2. layout (fim da Etapa 4) · 3. aprovado para publicação (fim da Etapa 12) · 4. entrega (fim da Etapa 13).

## Insumos que o João precisa providenciar (e quando travam)

| Insumo | Trava a etapa |
| --- | --- |
| Acesso ao GitHub da Black River (organização ou conta) para criar o repositório | 1 |
| Arquivos oficiais do logo (SVG ou PNG em alta: horizontal site, vertical, versão para fundo preto) | 2 |
| Dados de entidade: razão social, CNPJ, endereço, e-mail e WhatsApp institucionais, URLs do LinkedIn (pendência #3) | 2 (rodapé) — pode entrar até a 11 |
| Revisão do Luis: perguntas reais, prazos por módulo, prova de verbas logísticas (pendência #4) | 3 |
| Arquivos dos logos de clientes (os do slide "Alguns de nossos clientes") | 7 |
| Contas em nome da Black River: Supabase, Resend, Cloudflare (Turnstile e hospedagem) | 9 e 10 |
| Revisão jurídica dos textos legais | 11 |
| Contas GA4, Search Console e Bing Webmaster; acesso ao DNS do domínio | 12 e 13 |

## Etapa 1 — Setup
- [x] Repositório no GitHub da Black River a partir do template kit-sites-ia; `docs/` deste planejamento copiado para lá (commits enviados em 14/10/2026 ao branch `etapa-1-setup` de Black-River-Consultoria-Logistica/site-black-river; pendência #7 resolvida)
- [x] Next.js (App Router) + TypeScript + Tailwind + shadcn/ui; `components.json` com os registros de `config/components.json`; Spell UI como biblioteca principal (13/10/2026: primitivas button, input, label, textarea, checkbox, select e sheet adaptadas ao DESIGN.md; registro `@spell` respondendo; componentes da Spell entram por etapa, conforme a seção pedir)
- [x] Exportação estática (`output: "export"`) confirmada como caminho de publicação (a única parte de servidor é a Função da Cloudflare do formulário)
- [x] Tokens do DESIGN.md no `globals.css` (cores, `--radius: 0`, escala tipográfica, espaçamento de 4px); Archivo variável auto-hospedada (`@fontsource-variable/archivo`)
- [x] `scripts/setup-design.sh`: skills de Emil Kowalski e Taste Skill instaladas. Impeccable: pacote de skills bloqueado pela rede da sessão; decisão do João (13/10/2026): a cada etapa visual usar `npx impeccable detect` + Taste Skill + revisão contra o DESIGN.md + prints em 3 larguras (Playwright direto, sem MCP); critique/audit completos na Etapa 13. Atualização 13/10/2026: Impeccable v0.1.14 instalado (rede liberada); `impeccable detect` no código sem achados. A varredura por URL falha no ambiente de nuvem (navegador sem sandbox como root) — usar a varredura de arquivos + prints do Playwright
- [x] Valores da Taste Skill aprovados pelo João: variação de layout **média**, movimento **médio**, densidade **média** (sempre dentro do DESIGN.md: animações curtas, só transform/opacity, nada em loop, prefers-reduced-motion)
- Pronto quando: página em branco roda local com Archivo e as cores da marca; `npm run build` gera a pasta estática sem erro
- **Aprovada pelo João em 13/10/2026**, com ressalva: o envio ao GitHub fica para quando houver sessão com o repositório (até lá, git bundle). Decisão no mesmo dia: voltar ao `/impeccable critique` ao fim de cada etapa visual, como no processo original do kit.

## Etapa 2 — Layout base
- [x] Cabeçalho (logo "Horizontal — Site", navegação, botão do CTA) e menu do celular (navegação completa a partir de 1024px; abaixo disso, menu lateral com logo, 5 seções e CTA)
- [x] Rodapé preto com logo todo verde, links, contatos institucionais, LinkedIn, Privacidade e Termos (e-mail, WhatsApp e LinkedIn entram sozinhos quando a pendência #3 for preenchida em `lib/site.ts`; até lá não aparecem)
- [x] Barra fixa de CTA no celular (some em /contato e /obrigado)
- [x] Página 404 personalizada (volta à Home e ao Contato, mais as 5 seções do site)
- [x] `lang="pt-BR"`, HTML semântico (header, nav, main, footer), link "pular para o conteúdo", foco visível
- [x] Prints com Playwright em 375, 768 e 1280px (e 1024); `/impeccable critique` com as duas avaliações isoladas; detector sem achados no código e nas URLs
- Pronto quando: navegação funciona em todas as larguras, URL inexistente mostra a 404, sem rolagem horizontal
- **Aprovada pelo João em 13/10/2026.** Ajustes decididos na aprovação: cabeçalho fixo no computador; "Centro de Distribuição" também nos nomes dos módulos.

## Etapa 3 — Conteúdo (redação, sem código)
- [x] `docs/CONTEUDO.md` com os textos de Home, Sobre, Como trabalhamos, Soluções, 7 módulos, Contato, Obrigado e 404, escritos a partir do BRIEF.md (abrindo cada seção com a resposta, sem prometer número não confirmado, "Centro de Distribuição" por extenso, siglas definidas)
- [x] Cada módulo com: o que é, para quem, sinais de que você precisa, como a Black River conduz, perguntas frequentes (2–4)
- [x] Palavra-chave de cada página confirmada (title, H1 e primeiro parágrafo)
- [x] Pautas e roteiro dos 3 artigos de lançamento (um por lacuna: experiência do lado do varejo, verbas logísticas, jornada com prazos)
- Pronto quando: João aprova os textos; perguntas reais e prazos revisados com o Luis (ou marcados para depois do lançamento, sem texto provisório no site)
- **Aprovada pelo João em 14/10/2026** (revisão por comentários no Claude Doc). Decisões: no site, "módulo" vira "frente de trabalho"; a duração da conversa de diagnóstico não aparece (só "sem custo, online ou presencial"); H1 da Home provisório, a revisitar. Itens marcados [VALIDAR/REVISAR/CONSTRUIR COM LUIS] e [A CONFIRMAR] só vão ao ar confirmados (lista no fim de `docs/CONTEUDO.md`; pendência #4).

## Etapa 4 — Home (marco 2: layout)
- [x] Hero com proposta de valor, CTA único acima da dobra e faixas a 22° num canto (ocultas no celular); provas ao lado do título no desktop
- [x] Dor → jornada → transformação (dor e transformação unificadas em "Antes × Depois", decisão do João); números de prova (30+ cases, 15 anos, 30 anos do Luis); as 7 frentes de trabalho com o mesmo peso; prévia de cases e Insights; objeções respondidas; faixa de CTA final
- [x] `/impeccable critique` (avaliações A e B isoladas) e `review-animations`; 5 pontos prioritários corrigidos; detector sem achados no código e nas URLs
- [x] Prints com Playwright em 375, 768 e 1280px (e 1024)
- Pronto quando: Home completa no desktop e no celular com os textos aprovados, prints conferidos pelo João (aprovação do layout)
- **Aprovada pelo João em 14/10/2026 (marco 2: layout).** Inclui os 4 pacotes de melhoria da revisão de design e a foto P&B do Luis na seção Insights.

## Etapa 5 — Sobre e Como trabalhamos
- [x] Sobre: história, 30+ cases em 15 anos, currículo verificável do Luis Ricardo com foto; estrutura pronta para receber fotos futuras sem refazer layout
- [x] Como trabalhamos: diagnóstico validado → cronograma e entregas → execução conjunta; prazos típicos se confirmados; caixa "O que é um diagnóstico logístico"
- [x] Prints em 3 larguras; critique
- Pronto quando: as duas páginas passam na verificação visual e cada uma tem um H1 com a palavra-chave aprovada
- Notas (14/10/2026): esboço aprovado (Luis logo após a abertura; linha do tempo + etapas com "Entrega"). "História" e "Quanto tempo leva" ficam reservadas no código (`historia` e `prazos` = null) e aparecem quando o Luis confirmar. Critique A/B aplicada. **Aprovada pelo João em 14/10/2026**, com os três textos curtos novos (lista de empresas do Luis e linha do tempo).

## Etapa 6 — Soluções e páginas de módulo
- [x] `/solucoes` com os 7 módulos
- [x] Modelo único de página de módulo e as 7 páginas preenchidas com o conteúdo da Etapa 3
- [x] CTA com o módulo pré-selecionado no formulário (`?modulo=`)
- [x] Prints em 3 larguras de `/solucoes` e de 2 módulos; critique
- Pronto quando: as 8 rotas existem, sem texto de exemplo, e os links entre módulos funcionam
- Notas (14/10/2026): esboço aprovado (frentes em 4 grupos; H1 da Soluções encurtado). O parâmetro do formulário é `?modulo=<código do SCHEMA.md>`, usado pelo botão do cabeçalho, pela barra do celular e pela faixa final. Textos das 7 frentes aguardam a revisão do Luis (docs/REVISAO_LUIS.md). Critique A/B aplicada. **Aprovada pelo João em 14/10/2026.**

## Etapa 7 — Cases e faixa de logos
- [x] `/cases` e modelo de case (contexto → desafio → causa raiz → solução → "meta traçada" → o que o diagnóstico entregou), com faixa "Em números", caixa "O que é…", frentes do case, outros cases e CTA com a frente pré-selecionada (14/10/2026)
- [x] Os 4 cases aprovados (WMS, cross docking, estrutura do Centro de Distribuição, separação), adaptados para a web a partir dos one-pagers, mantendo o anonimato e as regras editoriais do João (texto em `lib/content/cases.ts`; fonte única também para Home e páginas de frente)
- [x] Faixa de logos autorizados (12 logos monocromáticos #666666, estática, 6 × 2 no desktop e 3 × 4 no celular), sem ligar logo a case; também na Home, logo abaixo do hero, em versão compacta (decisão do João, 14/10/2026)
- [x] `break-ui` com textos longos e curtos (rota temporária, já removida; 3 correções); `/impeccable critique` com as avaliações A e B isoladas (correções aplicadas); prints em 320, 375, 768 e 1280px, sem rolagem lateral
- Pronto quando: os 4 cases publicados localmente, revisados contra as regras de confidencialidade, e nenhum cliente identificável

## Etapa 8 — Insights
- [x] Artigos em MDX no repositório (sem CMS); lista com filtro por módulo; modelo de artigo com autor (Luis), data, caixa "O que é…" e CTA no fim (14/10/2026: `content/insights/*.mdx` + `lib/content/insights.ts`; filtro só com as frentes que têm artigo, escolha guardada em `?frente=`; por decisão do João, o filtro só aparece com 6 artigos em 3 frentes ou mais; diagrama próprio por artigo no card e no texto)
- [ ] 3 artigos de lançamento redigidos e aprovados (redigidos em 14/10/2026 a partir das pautas; revisão do João e do Luis no Claude Doc https://claude.ai/code/artifact/9942ed95-f2c5-4e8b-b143-6270c47ed3d3)
- [x] Links de cada artigo para o módulo relacionado e para 2 outros artigos (sem becos sem saída; os únicos links sem página são Contato, Privacidade e Termos, das Etapas 10 e 11)
- Pronto quando: os 3 artigos abrem com a resposta na primeira frase, sem becos sem saída, e o texto aparece no HTML do servidor (Ctrl+U)

## Etapa 9 — Banco de dados
- [x] Projeto Supabase na conta da Black River (plano Free, região São Paulo, tabelas não expostas automaticamente, RLS automático); tabela `leads` conforme SCHEMA.md, RLS ativo sem políticas para visitantes; gatilho de `atualizado_em`; rotina de retenção (pg_cron). Scripts `supabase/migrations/20261014000000_leads.sql` e `20261014010000_ajustes_advisor.sql` rodados pelo João em 14/10/2026; conferência `supabase/verificacoes/etapa-9.sql` com as 9 verificações em ok
- [ ] Sinal diário contra a pausa do plano Free: função `public.ping()` no banco (feito, liberada para a chave anônima) + Worker `workers/manter-ativo` (código pronto; o deploy depende da conta Cloudflare e entra na Etapa 13)
- [x] Security Advisor do Supabase sem alertas ("No issues detected", 14/10/2026, depois dos ajustes do segundo script)
- Pronto quando: gravação com a chave de serviço funciona; leitura e gravação com a chave anônima são bloqueadas (conferido pelos privilégios no banco em 14/10/2026; o teste de ponta a ponta pela API entra na Etapa 10, com a função do formulário)

## Etapa 10 — Formulário e envio
- [x] Formulário em `/contato` conforme APP_FLOW: obrigatórios, opcionais, consentimento desmarcado, erros por campo sem perder o que foi digitado, estado de carregamento
- [x] Função da Cloudflare `/api/agendamento`: Turnstile, honeypot, rate limit, validação com Zod, gravação no Supabase **e** e-mail de aviso em paralelo (o aviso não depende do banco; decisão de 14/10/2026), e-mail de confirmação ao visitante (formato provisório até resolver a pendência #5)
- [x] Falha de envio com "tentar de novo" + e-mail e WhatsApp como alternativa; sucesso redireciona a `/obrigado` (retorno em até 1 dia útil, convite para Insights)
- Pronto quando: todos os caminhos do APP_FLOW testados (válido, inválido, falha simulada, robô bloqueado, envio repetido limitado) e os dois e-mails chegando
- Situação (14/10/2026): caminhos testados com Turnstile, Supabase e Resend simulados (`npm test`: 13 testes da Função; navegador: 23 conferências). Falta, quando as contas existirem: um envio real de ponta a ponta (banco + os dois e-mails) e a regra de limite de envios no painel da Cloudflare — feitos no deploy de prévia ou na Etapa 13.

## Etapa 11 — Páginas legais e cookies
- [x] Política de privacidade (dados do formulário, finalidade, retenção de 12 meses, Luis Ricardo como encarregado, contato) e Termos de uso
- [x] Banner de cookies com "Aceitar" e "Recusar" de mesmo peso e "Preferências"; nada de GA4 antes do aceite
- Pronto quando: textos revisados juridicamente pela Black River e nenhum script de analytics carregado antes do aceite (conferido na aba de rede)
- Situação (14/10/2026): páginas e aviso prontos e testados no navegador (22 conferências). Textos em revisão jurídica (pendência #15); a Política depende também da razão social, do CNPJ e do endereço (pendência #3). O GA4 da Etapa 12 entra atrás de `useConsentimento()` (`lib/consentimento.ts`), com retenção de 14 meses configurada na conta.

## Etapa 12 — SEO, IA e analytics (marco 3)
- [ ] Title e description únicos por página, Open Graph (1200×630), favicons, `sitemap.xml`, canonical, texto alternativo
- [ ] Imagens em WebP/AVIF no tamanho exibido, carregamento sob demanda, nenhuma acima de ~200 KB sem motivo
- [ ] JSON-LD: ProfessionalService em todas as páginas (com `sameAs` e dados de entidade), Person (Luis Ricardo), Service nos módulos, Article nos artigos, FAQPage e BreadcrumbList onde couber
- [ ] Tabela dos robôs de IA verificada na documentação oficial (prompt do PROMPTS.md) e aprovada; `robots.txt` liberando busca e treino; `llms.txt`
- [ ] GA4 após consentimento (só quando `useConsentimento()` devolver `analitico: true`; retenção de dados de 14 meses na conta, como diz a Política); eventos de conversão (envio, clique no WhatsApp, visita ao Obrigado); grupo de canais para tráfego de IA
- Pronto quando: Lighthouse acima de 90 em SEO e acessibilidade e PageSpeed acima de 90 no celular, nas páginas principais; aprovação para publicar

## Etapa 13 — Publicação
- [ ] `/impeccable polish` e `/impeccable audit`; `npx impeccable detect` sem achados críticos; `break-ui`
- [ ] Auditoria contra `checklists/producao.md`, `checklists/seguranca.md` e `checklists/seo-ia.md` (item 19 de segurança feito pessoalmente pelo João)
- [ ] `docs/LICENCAS.md` completo
- [ ] Headers de segurança (`_headers` da Cloudflare: CSP liberando `challenges.cloudflare.com` em script e frame para o Turnstile, HSTS, X-Content-Type-Options, Referrer-Policy) com nota A em securityheaders.com; Gitleaks no histórico sem achados
- [ ] Deploy na Cloudflare; domínio blackriverconsultoria.com.br apontado; HTTPS forçado; www e sem www numa única versão; redirecionamentos 301 de endereços do site antigo que existirem
- [ ] Configuração de robôs de IA da Cloudflare conferida (sem bloqueio padrão); teste pós-deploy dos robôs com resposta 200
- [ ] SPF, DKIM e DMARC do e-mail; Search Console e Bing Webmaster com sitemap; Perfil da Empresa no Google igual ao site
- Pronto quando: todos os itens aplicáveis dos três checklists estão OK no site publicado

## Depois do lançamento (plano de manutenção)
- Repetir o teste de citação por IA (mesma pergunta da Etapa 0) em 30, 60 e 90 dias e comparar com 0/3.
- Definir a meta numérica de conversas com base nos primeiros 30 dias.
- Publicar Insights no ritmo da linha editorial do LinkedIn; acrescentar fotos reais quando existirem.
- Exportar a tabela `leads` mensalmente.
