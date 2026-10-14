# Kit — Sites com IA

Modelo de projeto para construir sites com IA (Claude Code, Cursor, Codex) seguindo um processo fixo: planejamento em 5 documentos, construção uma etapa por vez com aprovação, e três checklists antes de publicar.

Tudo o que o processo exige está neste repositório, inclusive o roteiro da reunião com o cliente (`docs/ROTEIRO_BRIEFING.md`). A biblioteca "Biblioteca + Checklist — Sites com IA" no Claude é material de consulta (fichas de recursos, contrato, pacotes) e só abre na conta de quem tem acesso.

## Como começar um site novo

1. No GitHub, clique em **Use this template** → crie o repositório **na conta ou organização do cliente** (ou transfira na entrega).
2. Clone e abra no Claude Code ou Cursor.
3. Copie `config/components.json` para a raiz quando o projeto Next.js for criado (etapa 1) e `config/.env.example` para `.env.local`.
4. Rode `scripts/setup-design.sh` para instalar as skills de design (Emil Kowalski, Taste Skill, Impeccable). Os MCPs do Playwright e do Figma já estão em `.mcp.json`; no Claude Code, autentique o Figma em `/mcp`.
5. Conduza a reunião com `docs/ROTEIRO_BRIEFING.md`. Depois cole a transcrição e use os prompts **Brief a partir da reunião** e **Conferir briefing** (`docs/PROMPTS.md`).
6. A partir daí, o agente segue o `CLAUDE.md`: uma etapa por vez, parando para sua aprovação.

## Estrutura

```
CLAUDE.md                  Processo e regras para o agente (AGENTS.md aponta para cá)
docs/
  ROTEIRO_BRIEFING.md      Roteiro oficial da reunião com o cliente (12 perguntas)
  PUBLICACAO.md            Contas do cliente, publicação na Cloudflare e operação
  CONCORRENTES.md          Matriz de concorrentes, lacunas e diferencial
  BRIEF.md                 Por que, para quem, qual resultado
  APP_FLOW.md              Páginas e fluxo (Mermaid)
  DESIGN.md                Visual (Refero Styles + Realtime Colors)
  SCHEMA.md                Dados e regras de acesso (Supabase/RLS)
  IMPLEMENTATION_PLAN.md   Etapas com critério de pronto
  LICENCAS.md              Componentes de terceiros (Anexo III do contrato)
  PROMPTS.md               Prompts prontos por fase
checklists/
  producao.md              27 itens
  seguranca.md             19 itens
  seo-ia.md                16 itens
config/
  components.json          Registros @spell, @cult-ui, @componentry
  .env.example             Variáveis de ambiente
  robots.txt.example       Política de robôs (verificar nomes antes de usar)
  llms.txt.example
  schema-org.json.example  JSON-LD da empresa
.claude/skills/construir-site/SKILL.md   Skill que conduz o processo
.mcp.json                  MCPs do projeto: Playwright (testes e prints) e Figma
scripts/setup-design.sh    Instala as skills de design
```

## Ferramentas de design (terceiros)

| Ferramenta | Licença | Repositório |
| --- | --- | --- |
| Skills de Emil Kowalski | MIT | github.com/emilkowalski/skills |
| Taste Skill | MIT | github.com/Leonxlnx/taste-skill |
| Impeccable | Apache 2.0 | github.com/pbakaus/impeccable |
| Playwright MCP | Apache 2.0 | github.com/microsoft/playwright-mcp |
| Figma MCP | Termos do Figma (requer assento Dev ou Full para uso real) | developers.figma.com |

São instaladas por projeto, não copiadas para este repositório, para sempre usar a versão atual.

## Stack padrão

Next.js + TypeScript + Tailwind + shadcn/ui · Cloudflare (hospedagem e DNS) · Supabase (quando houver dados) · GA4 com consentimento · sem CMS.

## Manutenção do kit

Preços, nomes de robôs de IA e recomendações de hospedagem mudam. Revise `CLAUDE.md`, `config/robots.txt.example` e a ficha de publicação a cada trimestre.
