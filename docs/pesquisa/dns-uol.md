# Zona de DNS atual no UOL Host (inventário de 14/10/2026)

Fonte: PDF do cPanel › Editor de Zona de DNS enviado pelo João em 14/10/2026 (25 registros; o 25º, `pro._domainkey`, veio num print à parte).
Nameservers: `ns1.cpuh16.hospedagemuolhost.com.br` e `ns2.cpuh16.hospedagemuolhost.com.br` (DNS no cPanel do UOL Host). TTL de todos: 14400 s (4 h).
DNS é público por natureza; nenhum segredo aqui.

| Nome | Tipo | Valor | Para que serve | Na publicação |
| --- | --- | --- | --- | --- |
| `@` | A | 186.234.81.56 | Site atual (hospedagem UOL) | **Mantém** (passa a servir só o redirecionamento para o www) |
| `@` | MX 10 | mx.uhserver.com | Recebimento de e-mail | **Não tocar** |
| `@` | TXT | v=spf1 include:spf.whservidor.com ?all | SPF do e-mail UOL | **Não tocar** |
| `_dmarc` | TXT | v=DMARC1; p=none; | DMARC | **Não tocar** |
| `mail` | CNAME | service.uhserver.com | E-mail | **Não tocar** |
| `smtp` | CNAME | smtp.uhserver.com | E-mail (envio) | **Não tocar** |
| `pop3` / `pop` | CNAME | pop.uhserver.com | E-mail | **Não tocar** |
| `imap` | CNAME | imap.uhserver.com | E-mail | **Não tocar** |
| `correio` | CNAME | services.uhserver.com | E-mail | **Não tocar** |
| `webmail` | CNAME | mail.uhserver.com | Webmail | **Não tocar** |
| `_smtp._tcp`, `_submission._tcp` | SRV | smtp.uhserver.com:587 | Configuração automática do e-mail | **Não tocar** |
| `_imap._tcp` | SRV | imap.blackriverconsultoria.com.br:143 | idem | **Não tocar** |
| `_pop3._tcp` | SRV | pop3.blackriverconsultoria.com.br:110 | idem | **Não tocar** |
| `_autodiscover._tcp` | SRV | autodiscover.uol.com.br:443 | idem (Outlook) | **Não tocar** |
| `ftp`, `webdisk`, `cpanel`, `cpcontacts`, `cpcalendars`, `whm` | A | 186.234.81.56 | Serviços do cPanel | **Não tocar** |
| `_cpanel-dcv-test-record` | TXT | (código do cPanel) | Certificado SSL automático do cPanel | **Não tocar** |
| `www` | CNAME | blackriverconsultoria.com.br | Site atual | **Única alteração:** CNAME para `<projeto>.pages.dev` |
| `pro._domainkey` | CNAME | pro._domainkey.uhserver.com | Assinatura DKIM do e-mail UOL (enviado pelo João, 14/10/2026) | **Não tocar** |

## Entradas novas (Resend), sem conflito com as atuais

| Nome | Tipo | Valor |
| --- | --- | --- |
| `send` | MX 10 | o servidor indicado pelo Resend (feedback-smtp.…amazonses.com) |
| `send` | TXT | v=spf1 include:amazonses.com ~all |
| `resend._domainkey` | TXT | chave DKIM indicada pelo Resend (seletor diferente do `pro._domainkey` do UOL: os dois convivem) |

## Conclusões

- E-mail é o do próprio UOL Host (`uhserver.com`), não Microsoft 365.
- Nenhum registro de e-mail depende do `www`: trocar o `www` só muda o site.
- O SSL automático do cPanel já existe (registro `_cpanel-dcv-test-record`), o que ajuda o endereço sem www a redirecionar com https. Depois que o `www` apontar para a Cloudflare, o cPanel pode avisar que não renova o certificado do `www`; é esperado e não afeta nada.
- Um dia antes da troca, baixar o TTL do `www` de 14400 para 300 s: a troca e um eventual retorno passam a valer em minutos, não em horas.
