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
- Etapa 1 — Setup: concluída, aguardando aprovação do João. Feito: Next.js + Tailwind + build estático, tokens, Archivo, skills de design (incluindo Impeccable), primitivas shadcn adaptadas ao DESIGN.md, registro @spell validado. Único item aberto: envio ao GitHub (pendência #7); até lá, o trabalho circula por git bundle.
- Decisões: liberar domínios dos componentes (feito, exceto componentry.dev); Impeccable instalado em 13/10/2026 — proposta de voltar ao `critique` por etapa visual, aguardando o João; Taste Skill variação/movimento/densidade médios.
- Alerta para a Etapa 7: o `logos-carousel` da Spell UI roda em loop contínuo, o que contraria o DESIGN.md (nada em loop). Usar faixa estática ou adaptar com pausa e prefers-reduced-motion.

## Pendências
3. Dados de entidade: razão social, CNPJ, endereço, e-mail e WhatsApp institucionais, URLs do LinkedIn (página e Luis).
4. Revisar com Luis Ricardo as perguntas reais do público (FAQ/AEO), prazos típicos por módulo e prova para verbas logísticas.
5. Formatar o e-mail de confirmação ao lead com case/conteúdo útil.
1. Pedir à WZ que remova Luis Ricardo Pedro da lista de sócios em wzconsultoria.com.br (as IAs atribuem à WZ o currículo dele).
2. Verificar por que blackriverconsultoria.com.br recusa leitura por ferramentas automáticas (robots.txt/firewall).

## Achado principal da Etapa 0
Black River citada por 0 de 3 IAs (ChatGPT, Gemini, Perplexity); WZ e Prosperity citadas por 3/3.
