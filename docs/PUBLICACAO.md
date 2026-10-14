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

1. Apontar o domínio para os servidores DNS da Cloudflare (painel do Registro.br). *(Black River: não se aplica; ver o roteiro abaixo.)*
2. Fazer o deploy e ligar o domínio personalizado; HTTPS sempre e redirecionar www e sem www para uma única versão.
3. Conferir a configuração de robôs de IA da Cloudflare: o bloqueio pode vir ativado por padrão e contrariar a política do BRIEF.md. Antes, rodar o prompt "Verificar robôs de IA" (`docs/PROMPTS.md`).
4. Configurar o e-mail do formulário: registros SPF, DKIM e DMARC no DNS.
5. Rodar os três checklists (`checklists/`) no endereço final e obter o aceite de publicação.

### Roteiro da Black River (Etapa 13; caminho "só o site", decisão do João em 14/10/2026)

O e-mail da empresa e o DNS **continuam no UOL Host**, sem troca de nameservers. Só o site sai do UOL para a Cloudflare Pages. No painel do UOL, a única entrada **alterada** é a do `www`; as outras são **novas** e não tocam no e-mail.

1. **Zona de DNS atual registrada** em `docs/pesquisa/dns-uol.md` (PDF do cPanel enviado pelo João em 14/10/2026). Falta conferir 1 registro que ficou escondido no PDF. Um dia antes do passo 8, baixar o TTL do `www` para 300 s.
2. **Unir o trabalho na branch principal:** PR de `etapa-1-setup` para `main` e merge depois da revisão.
3. **Projeto na Cloudflare Pages** ligado ao repositório: comando `npm run build`, pasta de saída `out`, Node 22. A pasta `functions/` vira a Função `/api/agendamento` sozinha.
4. **Variáveis e ligações** (painel, nunca no código): `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `LEAD_NOTIFY_TO`, `EMAIL_FROM`, `ALLOWED_ORIGINS`, `TURNSTILE_SECRET_KEY` e a ligação de KV **`LIMITE_ENVIOS`** (limite de 5 envios por IP a cada 10 minutos). Na prévia (`*.pages.dev`), a chave secreta **de teste** do Turnstile.
5. **Teste completo na prévia `*.pages.dev`:** envio real do formulário (banco + aviso + confirmação, pendência #13), aviso de cookies, GA4 no Tempo real, `curl` dos robôs.
6. **Resend no DNS do UOL:** criar as 3 entradas novas (MX e TXT em `send`, TXT em `resend._domainkey`). Não alteram o MX nem o SPF do domínio principal.
7. **Domínio personalizado no Pages:** adicionar `www.blackriverconsultoria.com.br`. A Cloudflare mostra o destino (`<projeto>.pages.dev`).
8. **Trocar a entrada `www` no UOL** para um CNAME apontando para esse destino, em horário de pouco movimento. Só o site muda; o e-mail não depende dessa entrada. Para desfazer, basta voltar a entrada antiga (foto do passo 1).
9. **Endereço sem www:** no painel do UOL, ligar o SSL do domínio sem www e trocar o conteúdo da hospedagem pelo arquivo `config/uol/.htaccess`, que redireciona tudo para o `www` (301). O plano do UOL continua por causa do e-mail; sem custo extra.
10. **Turnstile de produção** com os hostnames do domínio; trocar a chave secreta de teste pela de produção.
11. **Worker `manter-ativo`** (sinal diário do Supabase Free) publicado com a `SUPABASE_ANON_KEY`.
12. **Conferências no endereço final:** os três checklists de novo (`docs/AUDITORIA.md`), PageSpeed no celular, securityheaders.com (nota A), Teste de pesquisa aprimorada, Search Console e Bing Webmaster com o sitemap, evento `generate_lead` como evento-chave no GA4, "testar como um estranho" (João), e um e-mail de teste para contato@ e para o João.

**O que fica de fora por não migrar o DNS (dá para fazer depois):** regras de firewall da Cloudflare (o limite de envios foi para dentro da função) e o painel de robôs de IA (o `robots.txt` do site já define a política). Uma migração completa futura segue o roteiro de inventário e cópia de todos os registros, com o DNSSEC conferido antes.

## 4. Analytics e operação

| Item | Ferramenta | Configuração |
| --- | --- | --- |
| Analytics | GA4 (conta do cliente) | `@next/third-parties`, carregado só após consentimento, com o modo de consentimento ligado ao banner de cookies |
| Conversões | GA4 | Envio de formulário, clique no WhatsApp e visita à página de obrigado |
| Tráfego de IA | GA4 | Grupo de canais para chatgpt.com, perplexity.ai, gemini.google.com, claude.ai e copilot.microsoft.com |
| Busca | Search Console e Bing Webmaster Tools | Verificar pelo DNS, enviar o sitemap, vincular o Search Console ao GA4 |
| Site fora do ar | Monitor de disponibilidade gratuito (ex.: UptimeRobot, Better Stack) | Checagem a cada 5 minutos, alerta para você |
| Erros | Monitor de erros gratuito (ex.: Sentry) ou logs da Cloudflare | Alerta em erro de formulário ou de página |
| Backup | Repositório Git + exportação do banco | Exportar a tabela de leads todo mês no plano de manutenção (obrigatório no plano Free do Supabase, que não tem backup automático; ver SCHEMA.md) |

### Configuração do GA4 da Black River (Etapa 12, 14/10/2026)

Propriedade com o fluxo web `G-LFYPZHSP9X`. No painel (Administrador), além do que o João já fez (retenção de 14 meses, Indicadores do Google desligados, personalização de anúncios desligada):

1. **Eventos-chave:** depois do primeiro envio real do formulário, em Administrador › Exibição de dados › Eventos, marcar `generate_lead` como evento-chave (conversão). `visita_obrigado`, `contato_email` e `contato_whatsapp` ficam como eventos comuns.
2. **Canal de IA:** em Administrador › Exibição de dados › Grupos de canais › Criar novo grupo de canais, adicionar o canal "IA" com a condição "Origem da sessão" corresponde à regex `chatgpt\.com|perplexity\.ai|gemini\.google\.com|claude\.ai|copilot\.microsoft\.com` e colocá-lo acima de "Referência".
3. **Search Console:** vincular ao GA4 na Etapa 13, depois de verificar o domínio.

## Cuidados

- O plano gratuito da Cloudflare limita o processamento por requisição; recursos de IA pesados podem exigir o plano pago.
- Sem banner que bloqueie o GA4 antes do aceite, o site descumpre a LGPD.
- Contas no nome do cliente evitam disputa no fim da relação, mas ele precisa manter um cartão ativo nas contas pagas.
