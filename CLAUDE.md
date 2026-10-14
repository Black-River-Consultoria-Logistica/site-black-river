# CLAUDE.md — Processo de construção de sites com IA

Você é o agente de construção deste site. Siga este processo à risca. Ele vale para Claude Code, Cursor, Codex e qualquer agente que leia este arquivo (o `AGENTS.md` aponta para cá).

## Regra principal: uma etapa por vez

1. Leia `docs/IMPLEMENTATION_PLAN.md` e encontre a **primeira etapa não marcada**.
2. Execute **somente essa etapa**.
3. Ao terminar: marque `[x]` nos itens concluídos, resuma em até 5 linhas o que mudou, liste o que precisa ser testado no navegador e **PARE**.
4. Não avance para a próxima etapa sem a mensagem "aprovado" (ou equivalente) do responsável.
5. Faça um commit ao fim de cada etapa aprovada: `etapa N: <resumo>`.

Se o plano ainda não existir, comece pela Fase 1 abaixo.

## Fontes da verdade (raiz `docs/`)

| Arquivo | Responde | Quem altera |
| --- | --- | --- |
| `CONCORRENTES.md` | Padrão do mercado, lacunas e diferencial escolhido | Você pesquisa com evidências; responsável valida |
| `BRIEF.md` | Por que, para quem, qual resultado | Cliente aprova; você só preenche com o que foi dito |
| `APP_FLOW.md` | Páginas, ações, decisões e caminhos de erro (Mermaid) | Você propõe, responsável aprova |
| `DESIGN.md` | Visual: cores, tipografia, espaçamento, componentes | Você propõe a partir do Refero Styles e do Realtime Colors |
| `SCHEMA.md` | Dados guardados e regras de acesso | Você propõe, responsável aprova |
| `IMPLEMENTATION_PLAN.md` | Ordem de construção e critério de pronto | Você gera; marca o progresso |

Apoio: `ROTEIRO_BRIEFING.md` é o roteiro oficial da reunião com o cliente (12 perguntas); `PUBLICACAO.md`, o método de contas, publicação e operação; `PROMPTS.md` traz os prompts de cada fase.

Tudo o que o processo exige está neste repositório. Links externos (biblioteca no Claude, playbook, Google Docs) são material de consulta e podem não abrir em outra conta. **Se uma fonte citada não abrir, use a versão equivalente deste repositório. Se não houver versão aqui ou ela também não abrir, pare e peça o arquivo (colado ou anexado) antes de seguir. Nunca improvise roteiro, checklist ou método.**

Em caso de conflito entre o código e estes arquivos, os arquivos vencem. Se um deles precisar mudar, proponha a mudança e espere aprovação; nunca altere textos aprovados do BRIEF.md por conta própria.

## Fases

### Fase 1 — Planejamento (sem código)
0. Se `docs/CONCORRENTES.md` ainda for o modelo, fazer a análise de concorrentes (prompts em `docs/PROMPTS.md`), só com informação pública e com link de evidência em cada afirmação. **Pare.**
1. Preencher `docs/BRIEF.md`, incluindo a seção Posicionamento a partir da análise de concorrentes, a partir da transcrição ou das respostas do cliente às perguntas de `docs/ROTEIRO_BRIEFING.md`. Confira a transcrição contra o roteiro e liste cada pergunta não coberta. Marque `[A CONFIRMAR]` em tudo que não foi dito. **Pare** e liste as perguntas pendentes.
2. Gerar `docs/APP_FLOW.md` (Mermaid `flowchart TD`) com todas as páginas do escopo, 404, carregando, erro e obrigado. **Pare.**
3. Gerar `docs/DESIGN.md` a partir do estilo-base e da paleta indicados no BRIEF.md. **Pare.**
4. Gerar `docs/SCHEMA.md` derivado do APP_FLOW.md, com RLS e retenção LGPD. **Pare.**
5. Gerar `docs/IMPLEMENTATION_PLAN.md` em etapas pequenas, cada uma com critério de pronto testável. **Pare.**

### Fase 2 em diante — Construção
Execute o plano etapa por etapa, conforme a regra principal.

## Stack padrão

- Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui.
- Componentes: escolha **uma** biblioteca principal por site (ver tabela abaixo) e use as outras só para lacunas.
- Registros já configurados em `components.json` (copie de `config/components.json`): `@spell`, `@cult-ui`, `@componentry`. `@react-bits` funciona sem registro (diretório oficial do shadcn).
- Hospedagem: **Cloudflare**. Prefira exportação estática (`output: "export"`) quando o site não precisar de servidor. Para recursos de servidor, rode `npx vinext check` antes de qualquer outra coisa e reporte o resultado.
- Banco (se houver): Supabase com RLS em todas as tabelas.
- Analytics: GA4 via `@next/third-parties`, carregado só após consentimento no banner de cookies.
- Sem painel de edição (CMS): conteúdo fica no código.

| Biblioteca | Usar quando |
| --- | --- |
| Spell UI | Site sóbrio, SaaS, institucional |
| Cult UI | Produto digital, mockups, funcionalidade de IA |
| React Bits | Site criativo, portfólio, lançamento (variante `-TS-TW`) |
| Componentry | Efeitos de rolagem e imagem, cases |
| 21st.dev | Lacunas; peça autor e licença antes de instalar |
| Uiverse | Elementos pontuais (loaders, campos) — adaptar ao DESIGN.md |

## Design: skills e verificação visual

Instalação: `scripts/setup-design.sh` (skills) e `.mcp.json` (Playwright e Figma). Ferramentas e papel de cada uma:

| Ferramenta | Papel | Quando usar |
| --- | --- | --- |
| `docs/DESIGN.md` (Refero + Realtime Colors) | **Fonte da verdade visual** | Sempre; as skills abaixo trabalham dentro dele, nunca o substituem |
| Taste Skill (`design-taste-frontend`) | Evitar cara genérica de IA na geração de layout | Etapas de layout e seções; ajuste os 3 parâmetros conforme o BRIEF |
| Impeccable (`/impeccable`) | Regras de tipografia, espaçamento, cor e layout; auditoria | `critique` ao fim de cada etapa com interface; `polish` e `audit` antes do marco 3 |
| Skills de Emil Kowalski | Animação: duração, curvas, propriedades | `review-animations` em toda animação; `break-ui` antes do marco 3 |
| Playwright MCP | Abrir o site, testar fluxos e tirar print | Ao fim de toda etapa com interface (ver abaixo) |
| Figma MCP | Levar o layout para o Figma e ler designs | Opcional: apresentar o marco 2 ao cliente ou implementar um design vindo do Figma |

**Conflitos de regras:** se duas skills discordarem, vale esta ordem: BRIEF.md > DESIGN.md > regras inegociáveis deste arquivo > Impeccable > Taste Skill > demais skills. O `/impeccable init` pode propor seus próprios PRODUCT.md e DESIGN.md: aponte-o para `docs/BRIEF.md` e `docs/DESIGN.md` e mantenha **um único DESIGN.md** (o de `docs/`).

**Verificação visual obrigatória (Playwright):** ao terminar uma etapa que mexe em interface, rode o site local, tire print das páginas alteradas em 375px, 768px e 1280px, nos modos claro e escuro se houver, e confira contra o DESIGN.md: contraste, alinhamento, quebra de texto, rolagem horizontal, CTA visível sem rolar. Liste o que encontrou junto com o resumo da etapa. Não diga que a interface está pronta sem ter visto os prints.

**Animação:** siga as regras das skills de Emil Kowalski (animações de interface curtas, só `transform` e `opacity`, sem animar ações repetidas o tempo todo) além do `prefers-reduced-motion` já exigido abaixo.

## Regras inegociáveis

- **Segredos:** nunca escreva chaves, senhas ou tokens no código. Use variáveis de ambiente; `.env` está no `.gitignore`. Nada de segredo com prefixo `NEXT_PUBLIC_`.
- **Renderização:** páginas de conteúdo devem exibir o texto no HTML do servidor. Não marque páginas inteiras como `"use client"` sem necessidade.
- **Dados pessoais:** colete o mínimo. Toda tabela com dado pessoal tem RLS ativo. Nunca exponha a chave service role ao navegador.
- **Movimento:** toda animação respeita `prefers-reduced-motion`. No máximo 1 a 2 efeitos pesados (WebGL, shaders) por página.
- **Conteúdo:** escreva a partir do BRIEF.md. Sem texto de exemplo ("Lorem ipsum", "#", "seu-email@") no que for entregue.
- **Licenças:** registre em `docs/LICENCAS.md` cada componente de terceiros usado (origem e licença). Ele alimenta o Anexo III do contrato.
- **Robôs de IA:** antes de gerar `robots.txt` ou `llms.txt`, pesquise na documentação oficial os nomes atuais dos robôs (prompt em `docs/PROMPTS.md`) e espere aprovação da tabela.

## Antes de publicar

Rode as três auditorias e corrija as falhas uma a uma:
- `checklists/producao.md` (27 itens)
- `checklists/seguranca.md` (19 itens)
- `checklists/seo-ia.md` (16 itens)

Para cada item responda OK / falha / não se aplica, com o arquivo onde verificou. Só considere a etapa de publicação pronta com todos os itens aplicáveis em OK.

## Prompts prontos

Ver `docs/PROMPTS.md`.
