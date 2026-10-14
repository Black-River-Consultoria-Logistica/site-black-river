# Site Black River — Status do projeto (kit-sites-ia)

Atualizado: 13/10/2026 · Responsável interno: João Assad

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
- Etapa 4 — Home (marco 2): construída em 14/10/2026, aguardando aprovação do layout pelo João. Estrutura validada antes em esboço (Antes × Depois unificado; 7 frentes com o mesmo peso). Revisão com os recursos do kit (Taste Skill, skills de Emil Kowalski, Impeccable, bibliotecas): 4 pacotes aplicados a pedido do João (toque e acabamento, movimento discreto, hierarquia da primeira tela, composição). Nenhum componente animado de biblioteca atende ao DESIGN.md sem reescrita; movimento feito em CSS próprio. Foto do Luis pendente para a seção Insights. Rede: componentry.dev acessível; reactbits.dev, componentry.fun, Figma MCP e Refero bloqueados nesta sessão.
- Decisões da Etapa 3 (14/10/2026): "frente de trabalho" no lugar de "módulo" em todo o site; duração da conversa de diagnóstico fora do site (pode assustar o cliente); subtítulo da Home na redação do João.
- (histórico) Etapa 2: Logos oficiais recebidos (PNG), limpos da moldura de exportação e exportados em 2x; rodapé com o logo oficial em uma cor no verde exato #669933.
- Decisões da Etapa 2 (13/10/2026): no site, "Centro de Distribuição" também nos nomes dos módulos ("Projeto de Centro de Distribuição", "Eficiência Operacional em Centro de Distribuição"), nunca "Centrais"; cabeçalho fixo no topo no computador.
- Decisões: domínios dos componentes liberados (exceto componentry.dev); Impeccable instalado e `/impeccable critique` volta a rodar ao fim de cada etapa visual (João, 13/10/2026); Taste Skill variação/movimento/densidade médios.
- Alerta para a Etapa 7: o `logos-carousel` da Spell UI roda em loop contínuo, o que contraria o DESIGN.md (nada em loop). Usar faixa estática ou adaptar com pausa e prefers-reduced-motion.

## Pendências
3. Dados de entidade: razão social, CNPJ, endereço, e-mail e WhatsApp institucionais, URLs do LinkedIn (página e Luis).
4. Revisar com Luis Ricardo as perguntas reais do público (FAQ/AEO), prazos típicos por módulo e prova para verbas logísticas.
5. Formatar o e-mail de confirmação ao lead com case/conteúdo útil.
1. Pedir à WZ que remova Luis Ricardo Pedro da lista de sócios em wzconsultoria.com.br (as IAs atribuem à WZ o currículo dele).
2. Verificar por que blackriverconsultoria.com.br recusa leitura por ferramentas automáticas (robots.txt/firewall).

## Achado principal da Etapa 0
Black River citada por 0 de 3 IAs (ChatGPT, Gemini, Perplexity); WZ e Prosperity citadas por 3/3.
