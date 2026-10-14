# Licenças de terceiros — Black River Consultoria

Preencher durante o projeto com cada componente de terceiros efetivamente usado. Este arquivo alimenta o Anexo III do contrato.

| Componente ou recurso | Origem | Licença | Observação |
| --- | --- | --- | --- |
| shadcn/ui (button, input, label, textarea, checkbox, select, sheet) | ui.shadcn.com | MIT | Copiados para `components/ui/` e adaptados ao DESIGN.md (13/10/2026) |
| Radix UI (`radix-ui`) | github.com/radix-ui/primitives | MIT | Base acessível das primitivas shadcn |
| Lucide (`lucide-react`) | lucide.dev | ISC | Ícones das primitivas (fechar, seta, check) |
| tw-animate-css | github.com/Wombosvideo/tw-animate-css | MIT | Classes de animação de entrada/saída do menu e do select |
| class-variance-authority, clsx, tailwind-merge | npm | Apache 2.0 / MIT / MIT | Utilitários de classes |
| Archivo (`@fontsource-variable/archivo`) | Google Fonts via Fontsource, auto-hospedada | SIL Open Font License 1.1 | Substituta web da Bliss Pro (DESIGN.md) |
| Next.js, React, Tailwind CSS | npm | MIT | Base do site |
| `@next/mdx`, `@mdx-js/loader`, `@mdx-js/react` | npm (Vercel / unified) | MIT | Artigos de Insights em MDX (Etapa 8) |
| Zod (`zod`) | github.com/colinhacks/zod | MIT | Validação do formulário no navegador e na Função (Etapa 10) |
| Cloudflare Turnstile | Serviço da Cloudflare (script carregado de challenges.cloudflare.com) | Termos de serviço da Cloudflare (gratuito) | Antirrobô do formulário (Etapa 10); não é código copiado para o site |
| `@next/third-parties` | npm (Vercel) | MIT | Carregamento do GA4 depois do consentimento (Etapa 12) |
| Favicon, ícones e imagem de compartilhamento (`app/favicon.ico`, `app/icon.png`, `app/apple-icon.png`, `public/og/black-river.png`) | Gerados a partir do logo oficial da Black River | Propriedade da Black River Consultoria | Etapa 12, 14/10/2026 |
| Foto de Luis Ricardo Pedro (`public/fotos/luis-ricardo-pedro.webp`) | Arquivo da Black River no Google Drive, enviado pelo João em 14/10/2026 | Propriedade da Black River / uso autorizado | Recorte 4:5 e conversão para WebP |
| Logos de clientes (`public/logos-clientes/`, 12 arquivos) | Slide "Alguns de nossos clientes" da apresentação institucional da Black River | Marcas dos respectivos titulares; uso autorizado pelos clientes (declarado pelo João, 13/10/2026, BRIEF.md) | Recortados do slide e convertidos para monocromático #666666 com fundo transparente (Etapa 7, 14/10/2026). Nunca ligados a um case |
| Logos Black River (`public/brand/`) | Arquivos oficiais da Black River (Brandbook), enviados pelo João em 13/10/2026 | Propriedade da Black River Consultoria | Moldura de exportação removida; versão do rodapé recolorida para #669933 conforme a regra da marca |

Componentes da Spell UI, Cult UI ou outras bibliotecas entram nesta tabela na etapa em que forem instalados. Ferramentas de desenvolvimento (tsx para os testes, Impeccable, Taste Skill, skills de Emil Kowalski, Playwright) não vão para o site publicado e estão listadas no README.
