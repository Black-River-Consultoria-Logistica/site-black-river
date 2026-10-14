# Contas, publicação e operação

> Versão oficial do método de contas e publicação (etapas 6 e 11 do playbook). A ficha 16 da biblioteca traz a comparação de hospedagens e os links de referência.
> Preços e limites de serviços mudam: confira as páginas oficiais antes de cada proposta.

## 1. Contas no nome do cliente (onboarding)

O cliente cria cada conta com o e-mail dele e convida você. **Nunca peça a senha dele.**

- [ ] Domínio no Registro.br, no CNPJ do cliente, com você como contato técnico
- [ ] Cloudflare (hospedagem e DNS), você como membro
- [ ] GitHub: repositório criado a partir deste template na conta do cliente (ou na sua, para transferir na entrega)
- [ ] Google Analytics 4, Search Console e Perfil da Empresa no Google, você como administrador
- [ ] Supabase e serviço de e-mail (só se houver formulário com banco)
- [ ] API de IA com limite mensal de gasto (só no pacote com IA)

## 2. Como publicar Next.js na Cloudflare

| Tipo de site | Caminho | Comando |
| --- | --- | --- |
| Landing page e institucional sem servidor | Exportação estática (`output: "export"`); formulário por uma função da Cloudflare | `npm run build` e deploy da pasta gerada |
| Projeto novo com servidor (site com IA, loja) | vinext (em beta) | `npm create cloudflare@latest -- nome-do-site --framework=next` |
| Projeto Next.js existente | Verificar e migrar para vinext | `npx vinext check` e depois `npx vinext init` |
| Projeto que não passa na verificação | Adaptador OpenNext | Guia oficial do OpenNext |

Prefira a exportação estática sempre que o site não precisar de servidor. Gere as imagens já comprimidas (a otimização de imagens é suportada só em parte).

## 3. Passo a passo da publicação

1. Apontar o domínio para os servidores DNS da Cloudflare (painel do Registro.br).
2. Fazer o deploy e ligar o domínio personalizado; HTTPS sempre e redirecionar www e sem www para uma única versão.
3. Conferir a configuração de robôs de IA da Cloudflare: o bloqueio pode vir ativado por padrão e contrariar a política do BRIEF.md. Antes, rodar o prompt "Verificar robôs de IA" (`docs/PROMPTS.md`).
4. Configurar o e-mail do formulário: registros SPF, DKIM e DMARC no DNS.
5. Rodar os três checklists (`checklists/`) no endereço final e obter o aceite de publicação.

## 4. Analytics e operação

| Item | Ferramenta | Configuração |
| --- | --- | --- |
| Analytics | GA4 (conta do cliente) | `@next/third-parties`, carregado só após consentimento, com o modo de consentimento ligado ao banner de cookies |
| Conversões | GA4 | Envio de formulário, clique no WhatsApp e visita à página de obrigado |
| Tráfego de IA | GA4 | Grupo de canais para chatgpt.com, perplexity.ai, gemini.google.com, claude.ai e copilot.microsoft.com |
| Busca | Search Console e Bing Webmaster Tools | Verificar pelo DNS, enviar o sitemap, vincular o Search Console ao GA4 |
| Site fora do ar | Monitor de disponibilidade gratuito (ex.: UptimeRobot, Better Stack) | Checagem a cada 5 minutos, alerta para você |
| Erros | Monitor de erros gratuito (ex.: Sentry) ou logs da Cloudflare | Alerta em erro de formulário ou de página |
| Backup | Repositório Git + exportação do banco | Exportar a tabela de leads todo mês no plano de manutenção |

## Cuidados

- O plano gratuito da Cloudflare limita o processamento por requisição; recursos de IA pesados podem exigir o plano pago.
- Sem banner que bloqueie o GA4 antes do aceite, o site descumpre a LGPD.
- Contas no nome do cliente evitam disputa no fim da relação, mas ele precisa manter um cartão ativo nas contas pagas.
