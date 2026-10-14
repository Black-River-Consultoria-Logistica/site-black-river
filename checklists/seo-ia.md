# Checklist de SEO e IA — AEO/GEO (16 itens)

> AEO/GEO é área nova e sem garantias. O que tem mais efeito é o básico bem feito: conteúdo útil, renderizado no servidor, com dados estruturados e entidade consistente.

| # | Item | Grupo | Critério de pronto |
| --- | --- | --- | --- |
| 1 | Conteúdo renderizado no servidor | SEO técnico | Texto de cada página aparece no código-fonte (Ctrl+U), sem depender de JavaScript |
| 2 | Um H1 por página | SEO estrutural | Um único H1; H2 e H3 em ordem |
| 3 | HTML semântico e idioma | SEO estrutural | header, nav, main, section, footer; `lang="pt-BR"` |
| 4 | URLs legíveis | SEO estrutural | Curtas, em português, sem acento nem códigos |
| 5 | Tag canônica | SEO técnico | Cada página indica sua URL canônica |
| 6 | Palavra-chave por página | SEO de conteúdo | Busca-alvo do BRIEF.md no title, no H1 e no primeiro parágrafo |
| 7 | Dados estruturados | SEO e IA | JSON-LD Organization/LocalBusiness em todas as páginas + Service, FAQPage, BreadcrumbList onde couber; sem erros no Teste de pesquisa aprimorada |
| 8 | Search Console e Bing Webmaster | SEO e IA | Site verificado nas duas e sitemap enviado |
| 9 | Perfil da Empresa no Google | SEO local | Nome, endereço, telefone, horário e link iguais aos do site |
| 10 | Conteúdo em formato de resposta | AEO/GEO | Perguntas reais do BRIEF.md respondidas na primeira frase de cada seção |
| 11 | Fatos verificáveis | AEO/GEO | Números, preços ou faixas, prazos, área de atendimento e data de atualização visíveis |
| 12 | Entidade consistente | AEO/GEO | Nome, CNPJ, endereço e redes idênticos no site, no JSON-LD (sameAs), no Google e no LinkedIn |
| 13 | Política para robôs de IA | AEO/GEO | Nomes confirmados na documentação oficial antes de gerar o arquivo; política do BRIEF.md aplicada no robots.txt e testada após o deploy (inclusive configuração de robôs de IA da Cloudflare) |
| 14 | Autoria e credenciais | AEO/GEO | Página Sobre com pessoas, experiência, clientes e certificações |
| 15 | Tráfego vindo de IA | AEO/GEO | GA4 separa chatgpt.com, perplexity.ai, gemini.google.com, claude.ai, copilot.microsoft.com |
| 16 | llms.txt (opcional) | AEO/GEO | /llms.txt com resumo e links principais, gerado do BRIEF.md |

## Teste pós-deploy dos robôs liberados

Resposta esperada: 200. 403 indica bloqueio pela hospedagem ou firewall.

```bash
for bot in OAI-SearchBot ChatGPT-User Claude-SearchBot Claude-User PerplexityBot; do
  echo "$bot: $(curl -s -o /dev/null -w '%{http_code}' -A "$bot" https://[dominio].com.br/)"
done
```

O teste simula só o nome do robô; firewalls que checam IP podem tratar os robôs reais de outra forma. Confira nos logs da Cloudflare.
