---
name: construir-site
description: Conduz a construção de um site de cliente com IA pelo processo do kit (brief, app flow, design, schema, plano, construção etapa por etapa e três checklists). Use quando o usuário pedir para começar, continuar ou auditar um site do kit, ou digitar /construir-site.
---

# Construir site (kit Sites com IA)

Você conduz um projeto criado a partir do template "Kit — Sites com IA". O `CLAUDE.md` da raiz é a regra; esta skill diz como agir em cada situação.

## 1. Situar o projeto

Leia `CLAUDE.md` e os arquivos de `docs/`. Classifique o estado:

| Estado | Sinal | Próxima ação |
| --- | --- | --- |
| Sem análise de concorrentes | `docs/CONCORRENTES.md` ainda é o modelo | Pedir 3 a 5 concorrentes ao usuário, completar pela busca e preencher a matriz com evidências |
| Sem brief | `docs/BRIEF.md` ainda é o modelo | Pedir a transcrição da reunião ou fazer as perguntas do brief |
| Brief incompleto | Há `[A CONFIRMAR]` em objetivo, público ou CTA | Listar perguntas pendentes e parar |
| Planejamento | Brief ok, falta APP_FLOW, DESIGN, SCHEMA ou plano | Gerar o próximo documento que falta e parar |
| Construção | Plano existe com etapas não marcadas | Executar a primeira etapa não marcada e parar |
| Pré-publicação | Todas as etapas até a 7 marcadas | Rodar as três auditorias |
| Publicado | Etapa 8 marcada | Oferecer o checklist de entrega e o plano de manutenção |

Informe ao usuário, em uma linha, o estado encontrado e o que vai fazer.

## 2. Perguntas do brief

O roteiro oficial é `docs/ROTEIRO_BRIEFING.md` (12 perguntas + complementares). Use sempre esse arquivo; não substitua por um roteiro próprio.

- **Com transcrição:** gere o BRIEF.md e confira a transcrição contra o roteiro, listando cada pergunta não coberta.
- **Sem transcrição:** faça as perguntas do roteiro em blocos de no máximo 4, preferindo opções de múltipla escolha.

## 3. Executar uma etapa

- Faça só o que a etapa pede. Se encontrar algo fora do escopo, anote em "Pendências" no fim da resposta em vez de fazer.
- Ao terminar: marque `[x]`, resuma em até 5 linhas, liste o que testar no navegador, sugira a mensagem de commit e pare.
- Se uma etapa falhar (build quebrado, dependência incompatível), pare e explique antes de tentar alternativas.
- Se a etapa mexeu em interface: rode `/impeccable critique`, revise animações com `review-animations` e tire prints com o Playwright em 375, 768 e 1280px antes de dar a etapa por concluída. Se as skills ou o Playwright não estiverem instalados, avise e sugira `scripts/setup-design.sh`.

## 4. Auditorias

Para cada checklist (`checklists/producao.md`, `seguranca.md`, `seo-ia.md`), produza uma tabela: item · OK/falha/não se aplica · onde verificou. Corrija as falhas uma por vez, pedindo confirmação antes de mexer em autenticação, banco, variáveis de ambiente ou textos aprovados. Lembre o usuário de fazer pessoalmente o item 19 de segurança (testar como um estranho).

## 5. Regras que nunca mudam

- Segredos só em variáveis de ambiente; nunca no código.
- RLS em toda tabela com dado pessoal.
- Conteúdo de páginas renderizado no servidor.
- Nomes dos robôs de IA verificados na documentação oficial antes de gerar robots.txt e llms.txt.
- Cada componente de terceiros registrado em `docs/LICENCAS.md`.
- Fonte que não abre (link privado, arquivo ausente): use a versão equivalente do repositório; se não houver ou também não abrir, pare e peça o arquivo colado ou anexado. Nunca improvise roteiro, checklist ou método.
