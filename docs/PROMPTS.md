# Prompts prontos

Use no Claude Code, Cursor ou Codex, na raiz do projeto. Todos assumem que o agente leu o `CLAUDE.md`.

## Fase 1 — Planejamento

**Encontrar concorrentes** (com busca na web)
> "O cliente é [empresa], que oferece [serviço] em [cidade/região] para [público]. Ele indicou estes concorrentes: [lista]. Complete até 5 concorrentes buscando no Google por [termos] e verificando quem é citado quando se pergunta a assistentes de IA sobre esse serviço na região. Para cada um, informe site e origem. Não inclua empresas sem site ativo."

**Analisar concorrentes** (com Playwright ou busca na web)
> "Preencha `docs/CONCORRENTES.md` visitando o site de cada concorrente e o do cliente. Para cada célula da matriz use ✓, ~ ou ✗ e coloque o link da evidência; tire print da primeira tela no celular (375px) e no computador. Separe fatos verificados de impressões. Depois escreva as conclusões: padrão do mercado, lacunas (o que ninguém faz bem) e 2 ou 3 lacunas que o cliente poderia ocupar, cada uma com o fato do cliente que a sustenta. Não copie textos dos concorrentes. Pare."

**Transformar em posicionamento**
> "A partir de `docs/CONCORRENTES.md` e das respostas do cliente, preencha a seção Posicionamento do BRIEF.md: lacuna escolhida, mensagem de diferenciação em uma frase e a prova que a sustenta. Proponha como isso aparece na home (seções e títulos) e em quais perguntas do FAQ. Pare."

**Brief a partir da reunião**
> "Transforme a transcrição abaixo em `docs/BRIEF.md`, seguindo o modelo. Marque como [A CONFIRMAR] tudo o que não foi dito e liste as perguntas que faltam. Pare."

**Conferir briefing** (depois da reunião)
> "Compare a transcrição abaixo com `docs/ROTEIRO_BRIEFING.md`. Monte uma tabela com cada pergunta do roteiro (as 12 e as complementares): coberta, parcial ou não coberta, com o trecho da transcrição que a responde. Depois escreva uma única mensagem ao cliente com as perguntas pendentes, em linguagem simples. Pare."

**App flow**
> "A partir do BRIEF.md, gere `docs/APP_FLOW.md` em Mermaid com as páginas do escopo, 404, carregando, erro e obrigado. Aponte caminhos sem saída. Pare."

**Design**
> "Substitua o conteúdo de `docs/DESIGN.md` pelo estilo-base do Refero Styles indicado no BRIEF.md, trocando cores e fontes pela paleta do Realtime Colors. Remova qualquer identidade da marca de referência. Pare."

**Schema**
> "Leia BRIEF.md e APP_FLOW.md e gere `docs/SCHEMA.md`: entidades, campos mínimos, relações, RLS, integrações e retenção LGPD, com diagrama Mermaid erDiagram e SQL. Pare."

**Plano**
> "Leia os quatro arquivos de `docs/` e gere `docs/IMPLEMENTATION_PLAN.md` em etapas pequenas com critério de pronto testável. Não escreva código. Pare."

## Construção

**Próxima etapa**
> "Execute apenas a próxima etapa não marcada do IMPLEMENTATION_PLAN.md. Ao terminar, marque [x], resuma o que mudou, diga o que testar e pare."

**Mudança no brief**
> "O BRIEF.md mudou (diff abaixo). Atualize o plano e mostre quais etapas já feitas precisam ser refeitas. Pare."

**Escolher componente**
> "Entre @spell, @cult-ui, @componentry e @react-bits, escolha o componente que melhor atende [necessidade], coerente com o DESIGN.md, e justifique antes de instalar."

## Design e verificação visual

**Configurar a Taste Skill para o cliente**
> "Leia o BRIEF.md e o DESIGN.md e proponha valores para os três parâmetros da Taste Skill (variação de layout, intensidade de movimento, densidade visual), justificando pelo público e pelo tom de voz. Não altere o DESIGN.md."

**Critique após uma etapa**
> "Rode `/impeccable critique` nas páginas alteradas nesta etapa. Corrija só o que contraria o DESIGN.md ou as regras do CLAUDE.md e liste o resto como sugestão."

**Verificação com Playwright**
> "Suba o site local, abra [páginas] com o Playwright e tire prints em 375, 768 e 1280px. Compare com o DESIGN.md e liste problemas de contraste, alinhamento, quebra de texto, rolagem horizontal e CTA fora da primeira tela."

**Revisão de animações**
> "Use `review-animations` em todas as animações do projeto e mostre a tabela antes/depois. Aplique as correções respeitando `prefers-reduced-motion`."

**Testar com dados extremos**
> "Use `break-ui` nas seções com conteúdo variável (depoimentos, cases, formulário) e corrija o que quebrar."

**Levar o layout para o Figma (opcional, marco 2)**
> "Com o Figma MCP, leve a home e [página interna] da prévia para um arquivo novo no Figma, para apresentar ao cliente."

## Verificar robôs de IA (antes de robots.txt e llms.txt)

> "Antes de criar ou alterar o robots.txt e o llms.txt, pesquise na documentação oficial atual de OpenAI, Anthropic, Google, Perplexity, Microsoft, Apple e Meta os nomes (user-agents) dos robôs que acessam sites. Monte uma tabela com: robô, empresa, função (treino, busca ou visita a pedido do usuário), se respeita o robots.txt, link da fonte oficial e data da consulta. Aponte robôs novos, renomeados ou descontinuados em relação a `config/robots.txt.example`. Não use blogs nem listas de terceiros. Pare e aguarde aprovação antes de escrever os arquivos."

## Auditorias (antes de publicar)

**Produção**
> "Audite o projeto contra `checklists/producao.md`. Para cada item: OK, falha ou não se aplica, com o arquivo onde verificou. Depois corrija as falhas uma a uma."

**Segurança**
> "Faça uma auditoria de segurança contra `checklists/seguranca.md`. Para cada item: OK, falha ou não se aplica, com arquivo e linha. Liste as falhas por gravidade e corrija uma por vez, pedindo confirmação antes de mexer em autenticação, banco ou variáveis de ambiente."

**SEO e IA**
> "Audite o projeto contra `checklists/seo-ia.md`. Confira em especial se alguma página de conteúdo depende de JavaScript para exibir o texto. Corrija as falhas sem alterar textos aprovados do BRIEF.md sem perguntar."

## Publicação (Cloudflare)

**Estático**
> "Configure o projeto para exportação estática e publicação na Cloudflare; o formulário envia para uma função da Cloudflare que grava no banco e dispara o e-mail de aviso."

**Com servidor**
> "Rode `npx vinext check` e diga se o projeto pode ir para a Cloudflare sem ajustes; liste o que precisaria mudar."

**Analytics**
> "Instale o GA4 com @next/third-parties, carregando só depois do consentimento no banner de cookies, e crie os eventos de conversão do formulário e do WhatsApp."
