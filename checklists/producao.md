# Checklist de produção (27 itens)

Responder cada item com OK / falha / não se aplica + arquivo onde verificou.

| # | Item | Fase | Critério de pronto |
| --- | --- | --- | --- |
| 1 | Página 404 personalizada | 4 | Mantém o visual do site e leva de volta à home ou ao CTA |
| 2 | CTA acima da dobra | 2 | Um único CTA principal e claro, visível sem rolar no desktop e no celular e repetido ao longo da página; nada competindo com ele |
| 3 | Meta title por página | 6 | Título único em cada página, até ~60 caracteres |
| 4 | Meta description por página | 6 | Descrição única em cada página, até ~155 caracteres |
| 5 | Imagem Open Graph | 6 | Imagem 1200×630 aparece ao compartilhar no WhatsApp, LinkedIn e X |
| 6 | Conjunto de favicons | 6 | Favicon, ícone Apple e ícone para Android configurados |
| 7 | robots.txt | 6 | Acessível em /robots.txt, apontando para o sitemap |
| 8 | sitemap.xml | 6 | Gerado automaticamente com todas as páginas públicas |
| 9 | Texto alternativo em toda imagem | 6 | `alt` descritivo; decorativas com `alt` vazio |
| 10 | Breakpoints para celular | 4 | Testado em ~375px, tablet e desktop, sem rolagem horizontal |
| 11 | CTA fixo no celular | 4 | Botão de ação principal sempre visível no celular |
| 12 | Estados de carregamento | 4 | Spinners ou esqueletos em formulários e respostas de IA |
| 13 | Estados de erro em formulários | 4 | Mensagem clara por campo, sem perder o que foi digitado |
| 14 | Página de agradecimento | 2 | Confirma o envio, indica o próximo passo, registra conversão |
| 15 | Política de privacidade | 7 | Adequada à LGPD: dados coletados, finalidade, contato do encarregado |
| 16 | Termos de uso | 7 | Página própria, linkada no rodapé |
| 17 | Banner de cookies | 7 | Permite aceitar e recusar não essenciais; bloqueia scripts antes do aceite |
| 18 | Analytics instalado | 8 | Visitas e conversões (CTA, formulário, obrigado) registradas |
| 19 | Endereço de contato real | 2 | Endereço, e-mail e telefone verdadeiros; em e-commerce, razão social, CNPJ e endereço físico (Decreto 7.962/2013) |
| 20 | HTTPS forçado | 7 | Toda variação do endereço redireciona para um único https:// |
| 21 | Imagens comprimidas | 6 | WebP ou AVIF, no tamanho exibido, carregamento sob demanda; nenhuma acima de ~200 KB sem motivo |
| 22 | Velocidade medida | 6 | PageSpeed Insights acima de 90 no celular |
| 23 | Contraste de cores | 6 | Nível AA, inclusive sobre imagens, gradientes e no modo escuro |
| 24 | Nenhum link quebrado | 7 | Todos os links abrem o destino certo; nenhum `#` ou texto de exemplo |
| 25 | Proteção contra spam | 5 | Honeypot ou Cloudflare Turnstile e limite de envios |
| 26 | Sem cara de site gerado por IA | 4 | `npx impeccable detect` sem achados críticos; `/impeccable audit` revisado; layout fiel ao DESIGN.md |
| 27 | Verificação visual registrada | 4 | Prints do Playwright de todas as páginas em 375, 768 e 1280px conferidos por uma pessoa; animações revisadas com `review-animations` |
