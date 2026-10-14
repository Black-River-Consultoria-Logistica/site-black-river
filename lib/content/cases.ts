// Cases (Etapa 7). Fonte: os one-pagers aprovados pelo João (Google Drive, set.–out./2026),
// adaptados para a web com as regras editoriais em vigor:
// - cliente nunca identificado ("uma rede varejista"); sem meses, setores ou contagens exatas;
// - "recomendou"/"propôs", nunca ganho consumado; metas como "meta traçada";
// - nenhum número de resultado de cliente (CONTEUDO.md): só indicadores do diagnóstico;
// - "Centro de Distribuição" por extenso; siglas definidas na primeira menção;
// - voz da Black River na terceira pessoa.
// Títulos de cross docking e estrutura: aprovados na Etapa 3 (CONTEUDO.md). Decisões do João na Etapa 7 (14/10/2026):
// título do WMS mantido; separação "por homem-hora"; cross docking com o percentual de queda (~42%);
// lead time do WMS em faixa única (4 a 9 dias, sem citar linha de produto); bloco "Depois do diagnóstico".

import { modulos, type Frente } from "@/lib/site";

export type Paragrafo = string;
export type Topico = { rotulo: string; texto: string };

export type TabelaDeMeta = {
  titulo: string;
  colunas: [string, string, string];
  linhas: [string, string, string][];
  nota?: string;
};

export type Case = {
  slug: string;
  tema: string;
  titulo: string;
  /** Title da aba e do Google, com a palavra-chave do tema. */
  title: string;
  description: string;
  /** Duas linhas de contexto no card da lista. */
  resumo: string;
  /** Rótulo do card: a meta traçada, quando houver (DESIGN.md › Card de case). */
  rotuloMeta?: string;
  abertura: string;
  numeros: { valor: string; legenda: string }[];
  contexto: Paragrafo[];
  caixa: { titulo: string; texto: string };
  desafio: Paragrafo[];
  causa: { intro: string; itens?: Topico[]; fecho?: string };
  solucao: { intro: string; itens: Topico[]; ordenada?: boolean };
  meta?: TabelaDeMeta;
  entregas: Topico[];
  /** Pergunta da faixa de CTA final (a mesma do one-pager). */
  pergunta: string;
  /** Índices em `modulos`; a primeira vai pré-selecionada no formulário. */
  frentes: number[];
};

export const paginaCases = {
  title: "Cases",
  description:
    "Cases de logística no varejo conduzidos pela Black River: o problema encontrado, a causa raiz e a meta traçada com o cliente, sem identificar a empresa.",
  titulo: "Cases de logística no varejo",
  abertura:
    "Cada case mostra o problema encontrado dentro de uma operação real, a causa raiz e a meta traçada com o cliente. Os clientes não são identificados, e as metas aparecem como metas, não como ganho já realizado.",
  listaTitulo: "Diagnósticos reais: a experiência da Black River na prática.",
  logos: {
    titulo: "Alguns dos nossos clientes",
    nota: "Os cases não identificam clientes, e nenhum logo indica a empresa de um case.",
  },
  // Bloco fixo ao fim de cada case (aprovado pelo João em 14/10/2026). Genérico: não afirma nada
  // sobre o cliente do case, só como a Black River trabalha depois do diagnóstico.
  depois: {
    titulo: "Depois do diagnóstico",
    texto:
      "O diagnóstico é a primeira etapa. Com ele validado, a Black River fixa o cronograma e as entregas e executa junto com o time do cliente, dentro da operação, até as metas serem atingidas e o time sustentar o resultado.",
    link: { rotulo: "Ver como trabalhamos", href: "/como-trabalhamos" },
  },
  ctaFinal: {
    titulo: "Vamos conversar sobre a sua operação?",
    texto: "Uma conversa sem custo, online ou presencial, sobre os pontos que importam para o seu negócio.",
  },
};

// Logos autorizados (BRIEF.md, 13/10/2026), do slide "Alguns de nossos clientes" da apresentação
// institucional. Arquivos monocromáticos #666666 em public/logos-clientes (Etapa 7).
// `escala`: compensa logos de traço fino, que parecem menores com a mesma área.
export const logosDeClientes: { nome: string; arquivo: string; largura: number; altura: number; escala?: number }[] = [
  { nome: "Americanas", arquivo: "americanas", largura: 199, altura: 160 },
  { nome: "Festval", arquivo: "festval", largura: 465, altura: 160 },
  { nome: "Cencosud", arquivo: "cencosud", largura: 320, altura: 160 },
  { nome: "Koch", arquivo: "koch", largura: 359, altura: 160 },
  { nome: "Amigão Supermercados", arquivo: "amigao", largura: 689, altura: 160 },
  { nome: "Supermercados São Vicente", arquivo: "sao-vicente", largura: 540, altura: 160 },
  { nome: "Martins", arquivo: "martins", largura: 227, altura: 160 },
  { nome: "Braveo", arquivo: "braveo", largura: 517, altura: 110 },
  { nome: "Rappi", arquivo: "rappi", largura: 206, altura: 160 },
  { nome: "Supermercado Nordestão", arquivo: "nordestao", largura: 354, altura: 160 },
  { nome: "Super Nosso", arquivo: "super-nosso", largura: 405, altura: 160 },
  { nome: "Grupo Mundial Mix", arquivo: "mundial-mix", largura: 306, altura: 160, escala: 1.25 },
];

const DEFINICAO_WMS =
  "WMS (Warehouse Management System) é o sistema de gestão de armazém: controla recebimento, endereçamento, separação e expedição, e registra a posição de cada produto no estoque.";

export const cases: Case[] = [
  {
    slug: "wms",
    tema: "Gestão de armazém (WMS)",
    titulo: "O gargalo que travava um Centro de Distribuição inteiro",
    title: "Case WMS: o gargalo de um Centro de Distribuição | Black River",
    description:
      "Case Black River: sem WMS, o Centro de Distribuição de uma rede varejista operava de forma manual. A causa raiz, as ações imediatas e a meta traçada.",
    resumo: "Uma operação 100% manual, sem WMS, sustentava quase todos os gargalos do Centro de Distribuição.",
    rotuloMeta: "Meta traçada: entrega às lojas em até D+1",
    abertura:
      "Por que a falta de um WMS era a causa raiz por trás de quase todos os problemas de um Centro de Distribuição, e o que a Black River recomendou fazer antes mesmo de investir no sistema.",
    numeros: [
      { valor: "4 a 9 dias", legenda: "de lead time, o tempo do pedido à entrega na loja, conforme a linha de produto. A meta é D+1, o dia seguinte." },
      { valor: "12 dias", legenda: "de produto parado no cross docking, onde ele deveria só passar." },
      { valor: "100% manual", legenda: "a operação do Centro de Distribuição, sem sistema de gestão de armazém." },
    ],
    contexto: [
      "Uma rede varejista de médio a grande porte contratou a Black River para diagnosticar o abastecimento e a logística do Centro de Distribuição que atende as suas lojas.",
    ],
    caixa: { titulo: "O que é WMS", texto: DEFINICAO_WMS },
    desafio: [
      "Nas primeiras semanas, a Black River encontrou um nível de serviço baixo para as lojas: entregas sem programação prévia, produtos parados no Centro de Distribuição sem visibilidade do motivo e nenhum indicador para medir a capacidade operacional.",
      "Os sintomas apareciam em quase todos os processos: recebimento, armazenagem, separação, cross docking e expedição.",
    ],
    causa: {
      intro:
        "Por trás de todos esses sintomas havia um denominador comum: o Centro de Distribuição operava de forma 100% manual, sem WMS. Sem o sistema, não havia gestão de posição de estoque, controle de validade nem ressuprimento automático, e todo o processo dependia de controle visual.",
      fecho:
        "É o tipo de achado que sustenta os outros gargalos: enquanto ele não muda, nenhuma outra melhoria, na separação ou na expedição, atinge todo o seu potencial.",
    },
    solucao: {
      intro:
        "A Black River recomendou o WMS como decisão estrutural do plano, o investimento que destrava o ganho em todas as frentes diagnosticadas. E não esperou o sistema para agir: montou com o time do cliente um conjunto de ações imediatas, de processo e rotina.",
      itens: [
        { rotulo: "Revisão de processos", texto: "dos fluxos do recebimento à expedição." },
        { rotulo: "Rotinas e controles manuais", texto: "para dar visibilidade ao que o sistema ainda não registra." },
        { rotulo: "Mapa operacional diário", texto: "com o que precisa sair a cada dia." },
        { rotulo: "Programação prévia de entrega às lojas", texto: "para a loja saber o que chega e quando." },
        { rotulo: "Gestão visual das pendências", texto: "do Centro de Distribuição, para nada ficar parado sem dono." },
      ],
    },
    meta: {
      titulo: "Meta traçada",
      colunas: ["Indicador", "Hoje", "Alvo"],
      linhas: [
        ["Lead time até a loja", "4 a 9 dias", "D-0 a D+1"],
        ["Cross docking", "12 dias", "D+1"],
      ],
      nota: "Lead time: o tempo total do processo, do pedido à entrega. D-0: no mesmo dia. D+1: no dia seguinte. A meta varia conforme a linha de produto.",
    },
    entregas: [
      {
        rotulo: "Principal resultado",
        texto:
          "a causa raiz validada com a operação. A falta de WMS foi identificada como o fator que sustenta quase todos os outros gargalos, e passou a orientar a prioridade de todo o plano.",
      },
      {
        rotulo: "Ações imediatas",
        texto: "cinco ações de processo e rotina, definidas com o time do cliente, que não dependem do sistema.",
      },
      {
        rotulo: "Meta definida com o cliente",
        texto: "base para medir o ganho depois da implantação do WMS.",
      },
    ],
    pergunta: "Quer saber o que a sua operação já pode corrigir antes de investir em tecnologia?",
    frentes: [5, 0],
  },
  {
    slug: "cross-docking",
    tema: "Cross docking",
    titulo: "Produto parado não é cross docking",
    title: "Case de cross docking no varejo | Black River",
    description:
      "Case Black River: o cross docking de uma rede varejista levava 12 dias, seis vezes o prazo de referência. A causa raiz, as três frentes de solução e a meta D+1.",
    resumo: "O produto deveria passar pelo Centro de Distribuição em até dois dias e ficava, em média, doze.",
    rotuloMeta: "Meta traçada: cross docking em D+1",
    abertura:
      "Cross docking existe para o produto passar pelo Centro de Distribuição sem parar. Quando ele fica dias aguardando, vira estoque, só que sem controle, sem espaço e sem visibilidade.",
    numeros: [
      { valor: "12 dias", legenda: "de lead time médio (o tempo de passagem pelo Centro de Distribuição) no período avaliado. A referência é D+2, dois dias." },
      { valor: "7 dias", legenda: "foi a média do mês seguinte: tendência de queda observada, ainda em consolidação." },
      { valor: "2 dias", legenda: "no melhor dia do mês seguinte, sinal de que o prazo-alvo é alcançável." },
    ],
    contexto: [
      "A Black River diagnosticou o cross docking de uma rede varejista: quanto tempo o produto leva para passar pelo Centro de Distribuição, o que o faz parar no caminho e o que precisa mudar para ele sair em D+1, no dia seguinte.",
    ],
    caixa: {
      titulo: "O que é cross docking",
      texto:
        "Cross docking é o processo em que a mercadoria chega ao Centro de Distribuição já destinada às lojas e sai sem ser armazenada, em poucas horas ou no dia seguinte. O prazo de referência é de no máximo D+2.",
    },
    desafio: [
      "No período avaliado, o lead time médio do cross docking foi de 12 dias, seis vezes o prazo de referência. Havia pendências antigas ainda no Centro de Distribuição e muito produto separado e parado, sem como saber desde quando. Para a loja, isso significa mais ruptura, a falta do produto na prateleira.",
      "No mês seguinte, a média caiu para 7 dias e, em um dia, chegou a 2: uma tendência observada, que ainda depende de rotina e sistema para se consolidar.",
    ],
    causa: {
      intro: `Quatro causas, ligadas à falta de WMS e de gestão diária. ${DEFINICAO_WMS}`,
      itens: [
        { rotulo: "Lead time", texto: "produto parado dentro do Centro de Distribuição, fora do planejamento de abastecimento." },
        { rotulo: "Produtividade", texto: "sem WMS, etapas manuais e dependentes de intervenção; produto dias parado no piso." },
        { rotulo: "Baixo giro", texto: "cerca de 12 dias de produto de cross docking ocupando espaço e gerando retrabalho." },
        { rotulo: "Layout", texto: "separação do cross docking em um setor distante do recebimento, com movimentação evitável." },
      ],
    },
    solucao: {
      intro: "Três frentes, que podem começar antes da chegada do sistema:",
      ordenada: true,
      itens: [
        {
          rotulo: "Fluxo correto",
          texto:
            "revisar se os itens tratados como cross docking de fato têm esse perfil, identificar cada um com o seu rateio (a divisão entre as lojas) já no recebimento e separar de imediato, sem mudar de setor.",
        },
        {
          rotulo: "Gestão de pedidos",
          texto:
            "tratar antes do recebimento os pedidos inativados ou baixados que travam o processo; encerrar a separação conforme a programação de entrega do dia seguinte, forçando a expedição em D+1; e gestão visual dos volumes por loja.",
        },
        {
          rotulo: "Gestão diária",
          texto: "acompanhamento diário das pendências de cross docking no Centro de Distribuição, com ação de correção.",
        },
      ],
    },
    meta: {
      titulo: "Meta traçada",
      colunas: ["Período", "Lead time", "Alvo"],
      linhas: [
        ["Período avaliado (média)", "12 dias", "D+1"],
        ["Mês seguinte (média)", "7 dias", "D+1"],
        ["Melhor dia", "2 dias", "D+1"],
      ],
      nota: "Lead time: o tempo que o produto leva para passar pelo Centro de Distribuição. D+1: no dia seguinte.",
    },
    entregas: [
      {
        rotulo: "Principal resultado",
        texto:
          "o lead time médio já mostra queda, de 12 dias no período avaliado para 7 no mês seguinte, uma redução de cerca de 42%. É uma tendência observada, que ainda depende de rotina e sistema para se consolidar.",
      },
      { rotulo: "Meta definida com o cliente", texto: "cross docking em D+1, a partir de um prazo de referência de D+2." },
      {
        rotulo: "Base para executar",
        texto: "causa raiz mapeada em quatro frentes e três iniciativas desenhadas para execução imediata.",
      },
    ],
    pergunta: "Quantos dias o seu produto fica parado onde deveria só passar?",
    frentes: [2],
  },
  {
    slug: "estrutura-do-centro-de-distribuicao",
    tema: "Estrutura do Centro de Distribuição",
    titulo: "Quase metade do quadro fora da operação",
    title: "Case: estrutura do Centro de Distribuição | Black River",
    description:
      "Case Black River: quase metade do quadro de um Centro de Distribuição estava fora da operação. A proposta redistribui cargos sem criar nenhum cargo de gestão.",
    resumo: "A Black River propôs levar os cargos para onde está a produção, sem criar nenhum cargo de gestão.",
    rotuloMeta: "Proposta: um turno adicional na operação de maior produção",
    abertura:
      "A estrutura de um Centro de Distribuição precisa estar onde o trabalho acontece. Quando gestão e administrativo crescem fora da operação, a execução fica sem supervisão próxima.",
    numeros: [
      { valor: "Quase metade", legenda: "do quadro em cargos administrativos ou de gestão, fora da operação." },
      { valor: "Turno único", legenda: "para toda a equipe, com processos inacabados ao fim do dia." },
      { valor: "Nenhum", legenda: "cargo de gestão criado na proposta: os cargos mudam de lugar." },
    ],
    contexto: [
      "A Black River avaliou a estrutura organizacional do Centro de Distribuição de uma rede varejista: como o quadro de pessoas, as lideranças e os turnos estão distribuídos em relação ao trabalho que acontece na operação.",
    ],
    caixa: {
      titulo: "O que é uma estrutura equilibrada",
      texto:
        "Quadro, lideranças e turnos distribuídos conforme onde o trabalho acontece: gestão próxima da operação, cobertura do dia inteiro e equipes administrativas centralizadas.",
    },
    desafio: [
      "Quase metade do quadro ocupava cargos administrativos ou de gestão, fora da operação, um percentual muito alto. Toda a equipe trabalhava em um único turno, e os processos ficavam inacabados ao fim do dia.",
      "Ao mesmo tempo, a coordenação com a produção mais significativa era a única sem apoio de gerenciador, enquanto havia gerenciadores com equipes muito pequenas.",
    ],
    causa: {
      intro: "Quatro causas, ligadas à forma como cargos e turnos estavam distribuídos:",
      itens: [
        { rotulo: "Turno único", texto: "toda a equipe concentrada em um só turno, gerando gargalo nos processos operacionais." },
        {
          rotulo: "Quadro administrativo elevado",
          texto:
            "equipes administrativas respondiam à operação e perdiam sinergia; deveriam estar centralizadas na coordenação administrativa.",
        },
        {
          rotulo: "Distribuição desigual da liderança",
          texto:
            "havia coordenação sem gerenciador enquanto outros gerenciadores tinham equipes pequenas, o que pode deixar processos sem gestão próxima em certos momentos do dia.",
        },
        {
          rotulo: "Terceirização elevada",
          texto:
            "parte da equipe operacional terceirizada, com pouca gestão no processo e mais rotatividade. Normalmente, só atividades de apoio são terceirizadas.",
        },
      ],
    },
    solucao: {
      intro:
        "Quatro mudanças na estrutura, sem criar nenhum cargo de gestão. A ideia é levar os cargos para onde está a produção:",
      ordenada: true,
      itens: [
        { rotulo: "Equipes administrativas", texto: "concentradas na coordenação administrativa." },
        {
          rotulo: "Setor com dois gerenciadores",
          texto: "passa a operar com um, e o segundo cargo vai para a operação de maior produção.",
        },
        {
          rotulo: "Setor pequeno",
          texto: "deixa de ter gerenciador próprio e passa a ser gerido por outro; o cargo também vai para a operação de maior produção.",
        },
        { rotulo: "Turnos", texto: "com os cargos recebidos, a operação de maior produção ganha um turno adicional." },
      ],
    },
    meta: {
      titulo: "Proposta para a operação de maior produção",
      colunas: ["Ponto", "Hoje", "Proposta"],
      linhas: [
        ["Gerenciadores", "Nenhum", "Dois"],
        ["Turnos", "Turno único", "Um turno adicional"],
      ],
      nota: "O número total de cargos de gestão não muda: os cargos mudam de lugar.",
    },
    entregas: [
      {
        rotulo: "Principal resultado",
        texto:
          "a revisão do organograma, que alinha a estrutura às necessidades reais da operação, com expectativa de melhoria na execução do dia a dia.",
      },
      { rotulo: "Proposta de correção", texto: "distribui cargos, não pessoas, e mantém o número atual de cargos de gestão." },
      { rotulo: "Operação de maior produção", texto: "passa a ter dois gerenciadores e um turno adicional." },
    ],
    pergunta: "Quanto do seu quadro está onde o trabalho acontece?",
    frentes: [2],
  },
  {
    slug: "separacao",
    tema: "Separação",
    titulo: "60 caixas por homem-hora: quase 50% abaixo do mercado",
    title: "Case: produtividade da separação | Black River",
    description:
      "Case Black River: a separação de um Centro de Distribuição produzia 60 caixas por homem-hora, quase 50% abaixo das melhores práticas. Causas e recomendações.",
    resumo: "No dia de maior volume, a separação teve a melhor produtividade do mês: sinal de capacidade ociosa nos outros dias.",
    abertura:
      "Separação é o coração do Centro de Distribuição. Quando o separador interrompe o trabalho para esperar reabastecimento ou refaz percursos, a produtividade cai, mesmo quando há capacidade sobrando.",
    numeros: [
      { valor: "60", legenda: "caixas por homem-hora (a hora de trabalho de uma pessoa), quase 50% abaixo das melhores práticas de mercado." },
      { valor: "3 causas", legenda: "reabastecimento só depois que o produto acaba, caminhos de separação longos e endereços sem critério." },
      { valor: "Dia de pico", legenda: "o de maior volume teve a melhor produtividade do mês: sobra capacidade nos outros." },
    ],
    contexto: [
      "A Black River avaliou o processo de separação do Centro de Distribuição de uma rede varejista, com volume mensal elevado e pedidos grandes, de muitas caixas em média.",
    ],
    caixa: {
      titulo: "O que é produtividade de separação",
      texto:
        "Caixas separadas por homem-hora (HH), a hora de trabalho de uma pessoa. Mede quanto cada separador entrega a cada hora trabalhada.",
    },
    desafio: [
      "A produtividade da separação era de 60 caixas por homem-hora, quase 50% abaixo das melhores práticas de mercado. O volume e a produtividade oscilavam muito de um dia para o outro.",
      "No dia de maior volume, a produtividade foi a maior do mês, o que sugere capacidade ociosa nos demais dias.",
    ],
    causa: {
      intro:
        "Três causas, agravadas pela falta de WMS, o sistema de gestão de armazém. Picking é a posição de onde o separador retira o produto; ressuprimento é o reabastecimento dessa posição a partir do estoque.",
      itens: [
        {
          rotulo: "Ressuprimento reativo",
          texto: "o reabastecimento só acontece depois que o picking zera, o que pode interromper a separação ou gerar retrabalho.",
        },
        {
          rotulo: "Caminhos de separação",
          texto: "muitos paletes pequenos exigem remontagem, o que gera erro e retrabalho na expedição.",
        },
        {
          rotulo: "Picking sem critério",
          texto:
            "os endereços são ocupados onde há posição vazia, sem dimensionamento nem caminhos definidos; o separador anda muito e refaz percursos.",
        },
      ],
    },
    solucao: {
      intro: "Três recomendações, que podem ser executadas antes do sistema:",
      ordenada: true,
      itens: [
        {
          rotulo: "Ressuprimento preventivo",
          texto:
            "criar o processo no Centro de Distribuição e reduzir ao máximo o reabastecimento feito só depois que o picking zera, que obriga o separador a parar.",
        },
        {
          rotulo: "Fila de separação",
          texto:
            "hoje o separador recebe toda a demanda prevista de uma vez e a administra durante o turno. A recomendação é separar um palete por vez, abrindo uma nova separação a cada palete concluído.",
        },
        {
          rotulo: "Produtividade em tempo real",
          texto:
            "acompanhar o desempenho do separador durante o turno, para que ele saiba que existe acompanhamento e cumpra metas dentro da capacidade esperada.",
        },
      ],
    },
    entregas: [
      {
        rotulo: "Principal resultado",
        texto:
          "a revisão do processo de separação, ajustada às necessidades reais da operação, com expectativa de melhoria na produtividade.",
      },
      { rotulo: "Causas mapeadas", texto: "ressuprimento, caminhos de separação e dimensionamento do picking." },
      { rotulo: "Recomendações", texto: "três ações propostas, com a fila de separação como a mais concreta." },
    ],
    pergunta: "Quanto custa a capacidade que a sua separação deixa ociosa?",
    frentes: [2],
  },
];

export function casePorSlug(slug: string) {
  return cases.find((c) => c.slug === slug);
}

export function hrefDoCase(c: Pick<Case, "slug">) {
  return `/cases/${c.slug}`;
}

/** Dados do card (Home, páginas de frente e lista de cases). */
export function cardDoCase(slug: string) {
  const c = casePorSlug(slug);
  if (!c) throw new Error(`Case não encontrado: ${slug}`);
  return { tema: c.tema, titulo: c.titulo, href: hrefDoCase(c) };
}

export function frentesDoCase(c: Case): Frente[] {
  return c.frentes.map((i) => modulos[i]);
}
