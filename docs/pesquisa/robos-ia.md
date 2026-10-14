# Robôs de IA — verificação na documentação oficial (Etapa 12)

Consulta: 14/10/2026, só em páginas oficiais das empresas (prompt "Verificar robôs de IA" de `docs/PROMPTS.md`).
Política aprovada no plano (Etapa 12): **liberar busca, visitas a pedido do usuário e treino**. Objetivo do BRIEF: a Black River ser citada por IA.

| Robô (token) | Empresa | Função | Respeita robots.txt? | Fonte oficial |
| --- | --- | --- | --- | --- |
| OAI-SearchBot | OpenAI | Busca (ChatGPT search) | Sim | [OpenAI: Overview of OpenAI Crawlers](https://developers.openai.com/api/docs/bots) |
| ChatGPT-User | OpenAI | Visita a pedido do usuário | Pode não seguir (ação do usuário) | idem |
| GPTBot | OpenAI | Treino de modelos | Sim | idem |
| OAI-AdsBot | OpenAI | Revisão de páginas enviadas como anúncio | Não informado | idem |
| Claude-SearchBot | Anthropic | Busca | Sim | [Anthropic: Does Anthropic crawl data from the web…](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler) |
| Claude-User | Anthropic | Visita a pedido do usuário | Sim | idem |
| ClaudeBot | Anthropic | Treino de modelos | Sim | idem |
| Googlebot | Google | Busca (Google Search, Discover, Imagens) | Sim | [Google: common crawlers](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers) |
| Google-Extended | Google | Controle (não é robô): uso no treino do Gemini e no grounding do Gemini Apps e Vertex AI; não afeta a busca | Sim (é um token de controle) | idem |
| Google-CloudVertexBot | Google | Agentes do Vertex AI pedidos pelo dono do site | Sim | idem |
| GoogleOther | Google | Coletas genéricas de pesquisa e desenvolvimento | Sim | idem |
| Google-Agent | Google | Agentes que navegam a pedido do usuário | Em geral não | [Google: user-triggered fetchers](https://developers.google.com/crawling/docs/crawlers-fetchers/google-user-triggered-fetchers) |
| Google-GeminiNotebook (antes Google-NotebookLM) | Google | Busca páginas adicionadas como fonte no Gemini Notebook | Em geral não | idem |
| PerplexityBot | Perplexity | Busca (resultados do Perplexity); não treina modelos | Sim | [Perplexity Crawlers](https://docs.perplexity.ai/docs/resources/perplexity-crawlers) |
| Perplexity-User | Perplexity | Visita a pedido do usuário | Em geral não | idem |
| bingbot | Microsoft | Busca (Bing; base do Copilot) | A página consultada não diz | [Bing Webmaster Blog: user-agent do bingbot](https://blogs.bing.com/webmaster/2022/4/Announcing-user-agent-change-for-Bing-crawler-bingbot/) |
| Applebot | Apple | Busca (Spotlight, Siri, Safari); pode ajudar a treinar modelos da Apple | Sim | [Apple: About Applebot](https://support.apple.com/en-us/119829) |
| Applebot-Extended | Apple | Controle (não é robô): uso no treino dos modelos da Apple | Sim (é um token de controle) | idem |
| meta-externalagent | Meta | Treino de modelos e indexação | Sim | [Meta: Web Crawlers](https://developers.facebook.com/documentation/sharing/webmasters/web-crawlers) |
| meta-webindexer | Meta | Busca do Meta AI (citações) | Não informado | idem |
| meta-externalfetcher | Meta | Visita a pedido do usuário | Pode não seguir | idem |
| facebookexternalhit | Meta | Prévia de links compartilhados | Pode não seguir (checagens de segurança) | idem |

## Diferenças em relação a `config/robots.txt.example`

- O exemplo do kit **bloqueia treino** (GPTBot, ClaudeBot, Google-Extended). A política deste site **libera treino**, então nenhum dos três é bloqueado.
- Novos ou que não estavam no exemplo: OAI-SearchBot, ChatGPT-User, OAI-AdsBot, Claude-SearchBot, Claude-User, Google-CloudVertexBot, Google-Agent, Google-GeminiNotebook, PerplexityBot, Perplexity-User, Applebot-Extended, meta-externalagent, meta-webindexer, meta-externalfetcher.
- Renomeados: Google-NotebookLM → Google-GeminiNotebook (o nome antigo vale até agosto de 2026); google-speakr → Google-Read-Aloud (leitura em voz alta, não é IA de busca).
- Microsoft: a página oficial consultada só documenta o nome `bingbot`; o comportamento com o robots.txt não está nela.

## Atenção na publicação (Etapa 13)

A Cloudflare tem configurações próprias de robôs de IA (bloqueio e robots.txt gerenciado). Elas precisam ficar **desligadas** para valer o robots.txt do site; o teste pós-deploy do `checklists/seo-ia.md` confere.
