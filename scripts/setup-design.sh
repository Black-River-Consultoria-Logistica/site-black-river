#!/usr/bin/env bash
# Instala as skills de design no projeto (.claude/skills).
# Rodar uma vez por projeto, na raiz, depois de criar o repositório a partir do template.
# Os MCPs (Playwright e Figma) já vêm configurados em .mcp.json.
set -euo pipefail

echo "1/3 Skills de animação e design de Emil Kowalski (MIT)"
npx -y skills@latest add emilkowalski/skills --agent claude-code

echo "2/3 Taste Skill: só a skill principal (MIT)"
npx -y skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend" --agent claude-code

echo "3/3 Impeccable (Apache 2.0)"
npx -y impeccable install

cat <<'MSG'

Pronto. Próximos passos dentro do Claude Code:
  1. /mcp  -> selecione "figma" -> Authenticate (requer assento Dev ou Full no Figma
     para uso real; Starter tem só 20 chamadas por mês).
  2. /impeccable init  -> peça para usar docs/BRIEF.md e docs/DESIGN.md como base
     (ver "Design" no CLAUDE.md).
  3. Confira as versões instaladas antes de usar em cliente: estes projetos mudam rápido.
MSG
