# Site Black River — Status do projeto (kit-sites-ia)

Atualizado: 14/10/2026 · Responsável interno: João Assad

## Decisões tomadas
- Processo: kit-sites-ia (CLAUDE.md do kit), uma etapa por vez com aprovação.
- Pacote: **Institucional + conteúdo** (seção de artigos/insights).
- Briefing: pré-preenchido a partir dos docs do projeto CMO e validado pelo João por menus.
- Repositório: GitHub da Black River, criado a partir do template kit-sites-ia.
- Site atual (blackriverconsultoria.com.br): sem valor de referência para diagnóstico.
- Concorrentes na matriz (6, exceção ao limite de 5): WZ, Prosperity, ILOS, IMAM, Vantine, Gouvêa Ecosystem.
- Equipe no site novo: a priori, citar apenas Luis Ricardo Pedro.
- Luis Ricardo atuou pontualmente na WZ Consultoria e não faz mais parte dela. André Woznarowycz atua nas duas.

## Andamento — Fase 1
- [x] Etapa 0 — Concorrentes (docs/CONCORRENTES.md + docs/pesquisa/teste-ia.md) — aprovada 13/10/2026
- [x] Etapa 1 — BRIEF.md (pré-preenchido + 4 blocos validados) — aprovada 13/10/2026; dados de entidade pendentes
- [x] Etapa 2 — APP_FLOW.md — aprovada 13/10/2026 (retorno em 1 dia útil; lançamento com 4 cases + 3 artigos)
- [x] Etapa 3 — DESIGN.md — aprovada 13/10/2026 (base Refero "Brex", Archivo, só tema claro, prévia em docs/pesquisa/design-preview.html)
- [x] Etapa 4 — SCHEMA.md — aprovada 13/10/2026 (Supabase + e-mail; confirmação ao lead; encarregado LGPD = Luis Ricardo)
- [x] Etapa 5 — IMPLEMENTATION_PLAN.md (13 etapas de construção) — aprovada 13/10/2026

## Fase 2 — Construção
- Etapa 1 — Setup: **aprovada em 13/10/2026** (ressalva: envio ao GitHub pendente, #7; o trabalho circula por git bundle e o GitHub só é indispensável na Etapa 13).
- Etapa 2 — Layout base: **aprovada em 13/10/2026**.
- Etapa 3 — Conteúdo (redação): **aprovada em 14/10/2026**. Textos em `docs/CONTEUDO.md` (origem: Claude Doc https://claude.ai/code/artifact/2be76ca6-22df-476a-9634-abb1f52386be). 10 itens dependem do Luis; H1 da Home provisório.
- Etapa 4 — Home (marco 2): **aprovada em 14/10/2026** (marco 2 do cliente: layout). Foto do Luis recebida (Drive) e publicada em `public/fotos/luis-ricardo-pedro.webp` (4:5, 34 KB).
- Etapa 5 — Sobre e Como trabalhamos: **aprovada em 14/10/2026**. Seções "História" (Sobre) e "Quanto tempo leva" (Como trabalhamos) reservadas no código; entram quando o Luis confirmar (pendência #4). Peças comuns das páginas em `components/site/blocos.tsx`.
- Etapa 6 — Soluções e páginas das 7 frentes de trabalho: **aprovada em 14/10/2026**. As 7 páginas só vão ao ar depois da revisão do Luis (docs/REVISAO_LUIS.md; documento para comentários dele: https://claude.ai/code/artifact/c5a2043e-66ae-46ab-bde0-2974113721bf). Formulário recebe `?modulo=<código>` do cabeçalho, da barra do celular e da faixa final.
- Etapa 7 — Cases e faixa de logos: **aprovada em 14/10/2026**. 4 cases em `/cases/<slug>` a partir dos one-pagers do Drive (versões finais revisadas pelo João), com as regras editoriais mais recentes; 12 logos do slide "Alguns de nossos clientes" em faixa estática monocromática. Decisões do João (14/10/2026): WMS com lead time em faixa única (4 a 9 dias → D-0 a D+1, sem citar linha de produto) e título mantido; cross docking com a queda de cerca de 42% (exceção à regra de número de resultado, como tendência observada); título da separação "60 caixas por homem-hora: quase 50% abaixo do mercado"; bloco fixo "Depois do diagnóstico" ao fim de cada case; faixa de logos também na Home, logo abaixo do hero (versão compacta em fundo branco, porque a seção seguinte já é #F2F2F2).
- Etapa 8 — Insights: **aprovada em 14/10/2026** (estrutura, diagramas e índice "Neste artigo"; os 3 artigos seguem em revisão do João e do Luis antes de irem ao ar). Lista `/insights` com filtro por frente, modelo de artigo e os 3 artigos de lançamento redigidos a partir das pautas da Etapa 3. Os artigos só vão ao ar depois da revisão do João e do Luis (Claude Doc: https://claude.ai/code/artifact/9942ed95-f2c5-4e8b-b143-6270c47ed3d3). Depende do Luis: modalidades e forma de pagamento das verbas logísticas (artigo 2), prova publicável para verbas, ok na assinatura dos 3 artigos. Data dos artigos provisória (14/10/2026), vira a data do lançamento. Decisões do João (14/10/2026): filtro escondido até haver 6 artigos em 3 frentes ou mais (o código fica pronto); um diagrama próprio por artigo (topo do card 16:9 e dentro do artigo, `components/insights/diagramas.tsx`); fim do artigo 1 encurtado para um parágrafo ("Na Black River"). Medida de leitura dos artigos: ~70 caracteres por linha (34rem), registrada no DESIGN.md (João, 14/10/2026).
- Etapa 9 — Banco de dados: **aprovada em 14/10/2026**. Projeto Supabase Free da Black River (região São Paulo, RLS automático) criado pelo João; os dois scripts de `supabase/migrations/` rodados; conferência com 9/9 ok e Security Advisor sem avisos. Fica para a Etapa 13 só o deploy do sinal diário (`workers/manter-ativo`), que depende da conta Cloudflare. Decisões do plano Free (sinal diário, e-mail independente do banco, exportação mensal) no SCHEMA.md.
- Etapa 10 — Formulário e envio: **aprovada em 14/10/2026**. `/contato` com formulário (5 campos obrigatórios + autorização; frente de trabalho, página de origem e UTMs vão escondidas), `/obrigado` e a Função `/api/agendamento` (Turnstile, armadilha para robôs, validação, banco e aviso por e-mail em paralelo, confirmação ao visitante). Testado com os serviços simulados. Para o envio real faltam: conta Resend + registros de DNS do domínio, cadastrar `LEAD_NOTIFY_TO` = contato@blackriverconsultoria.com.br (confirmado); conta Resend com o domínio principal verificado (3 registros de DNS no painel atual, sem trocar nameservers) e remetente "Black River Consultoria <contato@blackriverconsultoria.com.br>" e as variáveis na Cloudflare. Decisões do João (14/10/2026): telefone obrigatório; nenhum campo opcional visível; mensagem de falha curta com o e-mail contato@blackriverconsultoria.com.br (o WhatsApp entra sozinho na frase quando o número for cadastrado); "Política de Privacidade" e "Termos de Uso" com maiúsculas; avisos de pedido vão para contato@blackriverconsultoria.com.br. Turnstile criado pelo João (chave do site pública no código; chave secreta só no gerenciador de senhas → painel da Cloudflare).
- Etapa 11 — Páginas legais e cookies: **em revisão (14/10/2026)**. `/privacidade` e `/termos` no modelo de leitura dos artigos, aviso de cookies com Aceitar/Recusar de mesmo peso e Preferências, link "Preferências de cookies" no rodapé. Textos em revisão jurídica no Claude Doc https://claude.ai/code/artifact/a48be641-0c25-436d-9548-fc1a4b4b4799. Decisões do João: encarregado pelo contato.site@ (a criar), revisão por Claude Doc, aviso empilhado acima da barra de CTA no celular, foro São Paulo/SP. Painel de preferências mantido, com a medição de audiência desmarcada por padrão (guia de cookies da ANPD: nada opcional pré-marcado; João, 14/10/2026).
- (histórico) Envio ao GitHub resolvido em 14/10/2026: branch `etapa-1-setup` em Black-River-Consultoria-Logistica/site-black-river (pendência #7).
- Decisões da Etapa 3 (14/10/2026): "frente de trabalho" no lugar de "módulo" em todo o site; duração da conversa de diagnóstico fora do site (pode assustar o cliente); subtítulo da Home na redação do João.
- (histórico) Etapa 2: Logos oficiais recebidos (PNG), limpos da moldura de exportação e exportados em 2x; rodapé com o logo oficial em uma cor no verde exato #669933.
- Decisões da Etapa 2 (13/10/2026): no site, "Centro de Distribuição" também nos nomes dos módulos ("Projeto de Centro de Distribuição", "Eficiência Operacional em Centro de Distribuição"), nunca "Centrais"; cabeçalho fixo no topo no computador.
- Decisões: domínios dos componentes liberados (exceto componentry.dev); Impeccable instalado e `/impeccable critique` volta a rodar ao fim de cada etapa visual (João, 13/10/2026); Taste Skill variação/movimento/densidade médios.
- Etapa 7: faixa de logos feita estática, sem o `logos-carousel` da Spell UI (loop contínuo contraria o DESIGN.md).

## Pendências
Lista completa, com responsáveis e status: `docs/PENDENCIAS.md`.

1. Pedir à WZ que remova Luis Ricardo Pedro da lista de sócios em wzconsultoria.com.br (as IAs atribuem à WZ o currículo dele).
2. Verificar por que blackriverconsultoria.com.br recusa leitura por ferramentas automáticas (robots.txt/firewall).
3. Dados de entidade (trava a publicação da Política de Privacidade): razão social, CNPJ, endereço, URLs do LinkedIn (página e Luis). E-mail institucional resolvido em 14/10/2026: contato@blackriverconsultoria.com.br (já no rodapé e no Contato).
4. Revisar com Luis Ricardo os 3 artigos, as 7 páginas de frentes de trabalho, as perguntas reais do público (FAQ/AEO), prazos típicos por módulo e prova para verbas logísticas.
5. Formatar o e-mail de confirmação ao lead com case/conteúdo útil.
8. Revogar o token do GitHub colado na conversa em 13/10/2026.
10. WhatsApp institucional: número virtual móvel da Salvy, a contratar pelo João. O código já está pronto: basta preencher o número em `lib/site.ts`.
11. Resend: conta, domínio e chave de envio (João).
12. Cloudflare: conta (João); variáveis e limite de envios na Etapa 13.
13. Teste real de ponta a ponta do formulário, depois de #11 e #12.
14. Criar a caixa contato.site@blackriverconsultoria.com.br (canal do encarregado).
15. Revisão jurídica da Política de Privacidade, Termos de Uso e aviso de cookies.

## Achado principal da Etapa 0
Black River citada por 0 de 3 IAs (ChatGPT, Gemini, Perplexity); WZ e Prosperity citadas por 3/3.
