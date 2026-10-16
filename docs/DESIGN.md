# DESIGN.md — Black River Consultoria

> Fonte da verdade visual do site. Estrutura e linguagem visual derivadas do estilo-base escolhido no Refero Styles; **cores, tipografia, geometria e logo são da Black River** (design system v2.0). Nenhum nome, logo, cor ou elemento de identidade da marca de referência é usado.
> Ordem de precedência: BRIEF.md > este arquivo > regras inegociáveis do CLAUDE.md > Impeccable > Taste Skill.

## Estilo-base
- Referência: Refero Styles — estilo "Brex" (branco + um único acento reservado à ação; seções alternadas em cinza-claro; faixa de logos; rodapé escuro): https://styles.refero.design/style/b58d92f6-68a8-4358-8fc9-6ea58e6d483b — escolhido pelo João em 13/10/2026 (opção A).
- Paleta: design system Black River v2.0 (substitui a paleta da referência por completo). Conferência no Realtime Colors: https://www.realtimecolors.com/?colors=000000-ffffff-527f29-f2f2f2-669933&fonts=Archivo-Archivo
- O que foi adaptado da referência: raio 12px → **0**; base de espaçamento 8px → **4px**; acento laranja → **verde da marca**; Inter/Flecha → **Archivo** (substituta da Bliss Pro); rodapé quase-preto → **preto puro com logo todo em verde**.

## Cores

| Papel | Token | Valor | Uso |
| --- | --- | --- | --- |
| Texto (títulos) | `--br-ink` | `#000000` | Títulos, texto de destaque, ícones principais |
| Texto (corpo) | `--br-ink-80` | `#333333` | Parágrafos (12,6:1 sobre branco) |
| Texto de apoio | `--br-ink-60` | `#666666` | Legendas, metadados, rótulos de formulário auxiliares |
| Placeholder / desabilitado | `--br-ink-40` | `#999999` | Só placeholders e estados desabilitados; nunca texto de leitura |
| Borda forte | `--br-ink-20` | `#CCCCCC` | Inputs, divisores de seção |
| Borda sutil | `--br-ink-10` | `#E6E6E6` | Bordas de card, linhas de tabela |
| Fundo alternado | `--br-ink-05` | `#F2F2F2` | Seções alternadas, faixa de logos, fundo de input |
| Fundo | `--br-paper` | `#FFFFFF` | Página e cards |
| Primária (ação) | `--br-green-deep` | `#527F29` | **Botão do CTA** (texto branco, 4,74:1), links, texto verde pequeno sobre branco, foco |
| Marca (gráfico) | `--br-green` | `#669933` | Números grandes (≥24px bold), faixas diagonais, detalhes gráficos, texto verde sobre preto |
| Destaque suave | `--br-green-tint-20` | `#E0EBD6` | Caixa "O que é…", linha ativa |
| Fundo muito sutil | `--br-green-tint-10` | `#F0F5EB` | Seção "Como trabalhamos" (opcional) |
| Moldura escura | `--br-black` | `#000000` | Rodapé, faixa de CTA final |

Contraste mínimo AA (4,5:1 para texto normal). `#669933` **nunca** em texto pequeno sobre branco (3,40:1) nem como fundo de botão com label branco. Sobre preto, `#669933` passa em qualquer tamanho (6,17:1).

**Atenção — seções em `#F2F2F2`:** `#527F29` sobre `#F2F2F2` dá 4,24:1 e **reprova** em texto pequeno. Nessas seções, overlines e links pequenos ficam em preto (sublinhado para link); verde só em texto ≥24px bold ou no botão. (Contrastes conferidos por cálculo WCAG em 13/10/2026.)

**Modo escuro:** não haverá *(proposta: site institucional só em tema claro; reduz o escopo de testes)*.

### Mapeamento para o tema shadcn (`globals.css`)
`--background #FFFFFF` · `--foreground #000000` · `--muted #F2F2F2` · `--muted-foreground #666666` · `--primary #527F29` · `--primary-foreground #FFFFFF` · `--secondary #F2F2F2` · `--secondary-foreground #000000` · `--accent #E0EBD6` · `--accent-foreground #000000` · `--border #E6E6E6` · `--input #CCCCCC` · `--ring #527F29` · `--radius 0px`

## Tipografia
- Família: `"Bliss Pro", Archivo, "Helvetica Neue", Helvetica, Arial, sans-serif`. **Archivo é substituta da Bliss Pro** (fonte comercial, sem licença web conhecida). Carregar Archivo variável auto-hospedada (arquivo do `@fontsource-variable/archivo`, servido por `next/font/local`, pré-carregado), sem CDN. Desde a Etapa 12, só o eixo de peso (35 KB): o eixo de largura não é usado no site. Licença web da Bliss Pro desconhecida: seguir com Archivo (decisão do João, 13/10/2026). Se a licença aparecer, trocar é uma linha de CSS.
- Títulos: Archivo 700, `letter-spacing: -0.02em`. Largura expandida (eixo `wdth`) não é usada: o arquivo carregado só tem o eixo de peso (Etapa 12).
- Corpo: Archivo 400; ênfase 600. Legenda: 300 itálico.
- Escala (modular 1,25, base 16px):

| Token | Tamanho | Line-height | Peso | Uso |
| --- | --- | --- | --- | --- |
| display | 61px (celular 39px) | 1,00 | 700 | Título do hero |
| h1 | 49px (celular 31px) | 1,05 | 700 | Título de página interna |
| h2 | 39px (celular 25px) | 1,10 | 700 | Título de seção |
| h3 | 31px (celular 20px) | 1,20 | 700 | Subseção |
| h4 | 25px | 1,25 | 600 | Título de card de case, etapas da jornada |
| h5 | 20px | 1,30 | 700 | Título de card de frente de trabalho, artigo, pergunta (acrescentado na Etapa 4) |
| lead | 20px | 1,50 | 400 | Abertura de seção |
| body | 16px (artigo 18px) | 1,60 | 400 | Corpo |
| small | 14px | 1,55 | 400 | Apoio, tabelas |
| caption | 12px | 1,45 | 300 itálico | Legenda, fonte |
| overline | 12px | 1,20 | 700 | Rótulo em caixa-alta, `letter-spacing: 0.12em`, cor `#527F29` |

Regras: corpo nunca abaixo de 16px; medida de leitura de cerca de 70 caracteres por linha (`max-width: 34rem` no corpo de artigo a 18px em Archivo; o `68ch` original dava 82–91 caracteres, porque o `ch` é mais estreito que a letra média — ajuste aprovado pelo João em 14/10/2026); parágrafos alinhados à esquerda (nunca centralizados nem justificados no site); `text-wrap: pretty`; no máximo 2 níveis de título por seção.

## Espaçamento e forma
- Escala (4px): 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128. Sempre via `gap`, nunca margens avulsas entre irmãos.
- Largura máxima: 1200px; grid de 12 colunas, gutter 24px; margem lateral 16px no celular, 24px no tablet.
- Espaço entre seções: 96px no desktop, 64px no celular.
- Padding de card: 24–32px. Gap entre elementos de um bloco: 8–16px.
- Raio de borda: **0** em tudo. Exceção opcional: 2px em input e botão se testes mostrarem perda de usabilidade.
- Elevação: borda 1px `#E6E6E6` em vez de sombra. Sombra (`0 4px 16px rgba(0,0,0,0.12)`) só no banner de cookies e em menus sobrepostos.
- Elemento gráfico: o **símbolo do logo** (três faixas em degrau, verde/preto/verde), com os vetores do Brandbook — correção do João em 15/10/2026, que substituiu as faixas retas a ~22° —, em **um único canto** da peça (hero e faixa de CTA final), nunca atrás de texto, opacidade 8–100%, sem gradiente. No celular, as faixas do hero são ocultadas (não há espaço sem sobrepor o título); na faixa de CTA final ficam abaixo do texto.

## Componentes
- Biblioteca principal: **Spell UI** (indicada pelo kit para site sóbrio e institucional). Outras bibliotecas só para lacunas, com registro em `docs/LICENCAS.md`.
- **Cabeçalho:** fixo no topo a partir de 1024px (decisão do João, 13/10/2026); fundo branco, borda inferior 1px `#E6E6E6`; logo "Horizontal — Site" colorido à esquerda (≥76px de largura, área de proteção respeitada); links em 14–16px peso 500 preto; à direita, botão do CTA. No celular: logo + menu, e o CTA vai para a barra fixa inferior.
- **Botão primário (CTA):** fundo `#527F29`, texto branco 16px peso 600, padding 12px × 24px, raio 0. Hover: fundo `#000000`. Foco: contorno 2px `#527F29` com afastamento de 2px. Um único botão primário por região da página.
- **Link/ação secundária:** texto preto 16px peso 500 com sublinhado; hover `#527F29`. Nunca outro botão cheio competindo com o CTA.
- **Card de módulo:** fundo branco, borda 1px `#E6E6E6`, padding 32px; overline "MÓDULO 0X" em `#527F29`; título h4 preto; 2 linhas de texto `#333333`; link "Conhecer o módulo". Hover: borda `#000000` (sem sombra, sem animação de escala).
- **Bloco de número (prova):** número em `#669933` 61px/700 sobre branco (ou sobre preto), legenda 14px `#333333` (ou branca sobre preto). Usado para "30+ cases", "15 anos", "30 anos em supply chain".
- **Faixa de logos:** fundo `#F2F2F2`, título curto centralizado; logos monocromáticos em `#666666`, grade 6 × 2 no desktop e 3 × 4 no celular. Logos nunca ligados a um case específico.
- **Card de case:** fundo branco, borda 1px; overline com o tema; título; 2 linhas de contexto; rótulo "Meta traçada" quando houver (nunca "resultado alcançado" sem dado).
- **Card de artigo (Insights):** imagem 16:9 ou diagrama no topo, título h4, resumo de 2–3 linhas, autor e data. Raio 0.
- **Caixa "O que é…":** fundo `#E0EBD6`, padding 24px, título 16px/700 e texto 16px. Para definir siglas e conceitos (WMS, cross docking, verbas logísticas).
- **Formulário:** rótulo acima do campo (14px/600 preto); input branco, borda 1px `#CCCCCC`, padding 12px 16px, raio 0; foco com borda `#527F29`; erro em texto 14px vermelho acessível (`#B42318`, 6,57:1) abaixo do campo, com ícone; placeholder `#999999` só como exemplo, nunca como rótulo.
- **Barra fixa de CTA (celular):** fundo branco, borda superior 1px `#E6E6E6`, botão primário em largura total; some na página de Contato e no Obrigado.
- **Banner de cookies:** fundo branco, sombra única, largura máx. 480px, canto inferior; três ações com o mesmo peso visual para aceitar e recusar (exigência LGPD): "Aceitar", "Recusar", "Preferências" (link).
- **Faixa de CTA final:** fundo preto, título branco h2, texto `#CCCCCC`, botão primário; faixas diagonais em `#669933` num canto.
- **Rodapé:** fundo preto; logo todo em verde (regra preto → verde da marca, nunca a versão branca); colunas de links em `#CCCCCC` 14px; e-mail e WhatsApp institucionais; links para LinkedIn, Privacidade e Termos.

## Imagens
- Sem banco de imagens genérico (galpão, caminhão, aperto de mãos). Prioridade: foto real do Luis Ricardo (headshot P&B já existente), diagramas próprios no estilo dos cases (fluxogramas, réguas de dias, gráficos), logos de clientes autorizados.
- No lançamento, a única foto é a do Luis Ricardo. O site deve ficar **pronto para receber fotos reais depois** (equipe, bastidores, eventos) sem refazer layout: componentes de imagem com proporção fixa (16:9 e 4:5), texto alternativo obrigatório, e seções que funcionam bem sem foto (diagrama ou bloco tipográfico como padrão) e com foto quando houver (decisão do João, 13/10/2026). Fotos com cliente só se não identificarem a operação.
- Imagens em WebP/AVIF, no tamanho exibido, carregamento sob demanda.

## Movimento
- Movimento autorizado na Etapa 4 (14/10/2026): entrada única das faixas do hero ao carregar (250ms, translateX + opacidade, atrasos de 60ms); seta dos links desliza 4px no hover/foco (200ms); botões encolhem para 98% ao toque (150ms). Nada de animação em texto, números ou rolagem.
- Toque: cards, links e botões têm estado `:active` (o hover não existe no celular). Área segura do iPhone ligada (`viewport-fit=cover` + utilitário `px-safe`).
- Animações curtas (150–250ms), só `transform` e `opacity`, revisadas com `review-animations`. Nada de animação em loop.
- `prefers-reduced-motion`: desliga tudo que não for troca de estado essencial.
- Nenhum efeito pesado (WebGL, shader). A marca é plana e de cantos retos.

## Faça
- Um único acento de cor na página: o verde, reservado à ação e aos números de prova.
- Alternar seções brancas e `#F2F2F2` para dar ritmo, sem caixas decorativas.
- Abrir cada seção com a resposta (AEO), em frase curta, antes do detalhe.
- Escrever "Centro de Distribuição" por extenso e definir siglas na primeira menção.
- Deixar muito espaço em branco: o público é C-level e escaneia.

## Não faça
- Cantos arredondados, pílulas, sombras em cards, gradientes.
- `#669933` em texto pequeno ou como fundo de botão com texto branco.
- Segunda cor de acento; cinzas fora da rampa.
- Logo branco sobre preto (no preto o logo fica todo verde); logo abaixo de 76px; logo sobre foto sem tarja.
- Parágrafos centralizados ou justificados; mais de um botão cheio por região.
- Visual "genérico de IA": gradientes roxos, ícones 3D, cards com brilho, títulos com efeito de digitação.
