// Textos da página Soluções e das 7 páginas de frente de trabalho.
// Fonte: docs/CONTEUDO.md (aprovado pelo João em 14/10/2026). Estrutura aprovada no esboço da Etapa 6.
//
// ATENÇÃO: o conteúdo das 7 frentes está marcado [REVISAR COM LUIS] no CONTEUDO.md.
// As páginas não vão ao ar antes dessa revisão (docs/REVISAO_LUIS.md). Trechos [A CONFIRMAR]
// ficaram fora: "a maioria dos clientes segue para a execução" (frente 1), "vocês vendem algum
// sistema?" (frente 6), a prova de verbas (frente 5) e "a maioria dos projetos combina" (Soluções).

import { modulos, type Frente } from "@/lib/site";

export const pagina = {
  // H1 encurtado por decisão do João (14/10/2026).
  titulo: "Consultoria em logística e supply chain em 7 frentes de trabalho",
  abertura:
    "A consultoria em logística e supply chain da Black River é organizada em sete frentes de trabalho, do diagnóstico da operação à malha de transporte. Todo projeto começa pelo diagnóstico, e é ele que define quais frentes de trabalho a sua operação precisa e em que ordem.",
  combinam: {
    titulo: "Como as frentes de trabalho se combinam",
    texto:
      "O diagnóstico mostra onde estão as perdas e o que as causa. A partir dele, o trabalho pode seguir para o Centro de Distribuição (o projeto de um novo ou a eficiência do atual), para o equilíbrio entre estoque e abastecimento das lojas, ou para as frentes que geram receita e dão suporte à operação: verbas logísticas, sistemas e transporte.",
  },
  // Nomes dos grupos aprovados no esboço (14/10/2026). Índices na ordem de `modulos`.
  grupos: [
    { nome: "Ponto de partida", frentes: [0] },
    { nome: "Centro de Distribuição", frentes: [1, 2] },
    { nome: "Estoque e lojas", frentes: [3] },
    { nome: "Receita e suporte", frentes: [4, 5, 6] },
  ],
  paraQuem: {
    titulo: "Para quem",
    segmentos: ["Supermercados", "Atacarejos", "Atacado distribuidor", "Indústrias e distribuidores que vendem para o varejo"],
    texto:
      "Varejistas e atacadistas de médio e grande porte e indústrias e distribuidores que vendem para o varejo. Não há porte mínimo: a equipe é dimensionada pelo escopo.",
  },
  ctaFinal: {
    titulo: "Não sabe por qual frente de trabalho começar?",
    texto: "Quase ninguém sabe antes do diagnóstico. Comece pela conversa.",
  },
};

// Linha de cada card (a mesma da Home), na ordem de `modulos`.
export const linhasDosCards = [
  "O retrato completo da operação e a causa raiz dos problemas.",
  "Layout, capacidade e fluxos desenhados para a operação que você vai ter.",
  "Mais produtividade no recebimento, na armazenagem, na separação e na expedição.",
  "Loja abastecida sem estoque parado: políticas, parâmetros e rotina.",
  "A logística do varejo também gera receita. Mostramos como negociar.",
  "Escolha e implantação de sistemas como o WMS, com processo antes de software.",
  "Rotas, frota e localização de Centros de Distribuição pensadas pelo custo total.",
];

type CaseRelacionado = { tema: string; titulo: string; href: string };

// Cases (títulos aprovados; páginas na Etapa 7). O do WMS ainda não tem título aprovado:
// usa a descrição do CONTEUDO.md e o endereço provisório até a Etapa 7.
const casos = {
  crossDocking: { tema: "Cross docking", titulo: "Produto parado não é cross docking", href: "/cases/cross-docking" },
  estrutura: {
    tema: "Estrutura do Centro de Distribuição",
    titulo: "Quase metade do quadro fora da operação",
    href: "/cases/estrutura-do-centro-de-distribuicao",
  },
  separacao: { tema: "Separação", titulo: "60 caixas por hora: quase 50% abaixo do mercado", href: "/cases/separacao" },
  wms: { tema: "WMS", titulo: "O gargalo que travava um Centro de Distribuição inteiro", href: "/cases/wms" },
} satisfies Record<string, CaseRelacionado>;

export type PaginaDeFrente = {
  frente: Frente;
  numero: number;
  /** Title da aba e do Google (tabela de palavras-chave do CONTEUDO.md). */
  title: string;
  description: string;
  h1: string;
  abertura: string;
  oQueE?: string;
  /** Caixa "O que é…". Sem `oQueE`, ela vira o próprio bloco de definição. */
  caixa?: { titulo: string; texto: string };
  paraQuem: string;
  sinais: string[];
  comoConduzimos: string[];
  cases?: CaseRelacionado[];
  perguntas: { pergunta: string; resposta: string }[];
};

const dados: Omit<PaginaDeFrente, "frente" | "numero">[] = [
  {
    title: "Diagnóstico logístico de operações | Black River",
    description:
      "O diagnóstico logístico mostra onde a operação perde dinheiro, serviço ou capacidade, e a causa raiz de cada perda. Termina com metas validadas pelo seu time.",
    h1: "Diagnóstico logístico de operações de varejo e atacado",
    abertura:
      "O diagnóstico logístico mostra onde a sua operação perde dinheiro, serviço ou capacidade, e qual é a causa raiz de cada perda. É a porta de entrada de todo projeto da Black River e termina com metas validadas pelo seu time.",
    oQueE:
      "Um levantamento estruturado de processos, pessoas, estrutura física, sistemas e indicadores, feito dentro da operação. O resultado é um mapa de oportunidades priorizado, com o que pode ser corrigido já e o que depende de investimento.",
    paraQuem:
      "Empresas que sentem a logística pesar no resultado mas não sabem exatamente onde, ou que vão tomar uma decisão grande (novo Centro de Distribuição, sistema, expansão) e querem partir de um retrato fiel.",
    sinais: [
      "O custo logístico sobe e ninguém consegue explicar por quê",
      "As lojas reclamam de ruptura enquanto o estoque total cresce",
      "Cada área tem a sua explicação para o problema, e elas não batem",
      "Os indicadores existem, mas não orientam decisões",
    ],
    comoConduzimos: [
      "Levantamento em campo: Centros de Distribuição, lojas, transporte e rotinas de gestão",
      "Análise dos dados da operação e entrevistas com as lideranças",
      "Causa raiz de cada problema e mapa de oportunidades priorizado",
      "Metas e plano de ação validados com a sua equipe",
    ],
    cases: [casos.wms],
    perguntas: [
      {
        pergunta: "Quanto tempo leva um diagnóstico logístico?",
        resposta:
          "A duração depende do porte e do número de Centros de Distribuição; o prazo é fechado na conversa inicial.",
      },
      {
        pergunta: "O diagnóstico já traz ações práticas?",
        resposta:
          "Sim. Além das oportunidades de médio prazo, ele aponta ações imediatas de processo e rotina que a equipe pode começar a executar.",
      },
      {
        pergunta: "Preciso contratar a execução depois?",
        // Sem a frase "a maioria dos clientes segue para a execução" até o Luis confirmar.
        resposta: "Não. O diagnóstico é uma entrega completa.",
      },
    ],
  },
  {
    title: "Projeto de Centro de Distribuição | Black River",
    description:
      "Tamanho, layout, fluxos, equipamentos e equipe do Centro de Distribuição para a operação que a sua empresa vai ter nos próximos anos.",
    h1: "Projeto de Centro de Distribuição para varejo e atacado",
    abertura:
      "Um projeto de Centro de Distribuição define tamanho, layout, fluxos, equipamentos e equipe para a operação que a empresa vai ter nos próximos anos. A Black River conduz desde a decisão de construir, ampliar ou mudar até a operação rodando.",
    oQueE:
      "O desenho do Centro de Distribuição a partir do volume, do mix de produtos e do nível de serviço que as lojas precisam: capacidade de armazenagem, áreas de recebimento, separação e expedição, fluxos, docas e dimensionamento de equipe.",
    paraQuem:
      "Empresas que vão abrir o primeiro Centro de Distribuição, ampliar ou mudar o atual, ou unir operações depois de uma aquisição.",
    sinais: [
      "O Centro de Distribuição atual não comporta o crescimento planejado",
      "Produto armazenado em corredores e docas por falta de espaço",
      "Fluxos que se cruzam e geram retrabalho",
      "Expansão de lojas para regiões que o Centro de Distribuição atual não atende bem",
    ],
    comoConduzimos: [
      "Projeção de volume e perfil de produtos para os próximos anos",
      "Dimensionamento de áreas, estruturas e equipe",
      "Layout e fluxos, com as opções comparadas pelo custo total",
      "Acompanhamento da implantação e da partida da operação",
    ],
    perguntas: [
      {
        pergunta: "Vocês ajudam a escolher entre construir, alugar ou ampliar?",
        resposta: "Sim. As opções são comparadas pelo custo total da operação, não só pelo valor do imóvel.",
      },
      {
        pergunta: "O projeto inclui a localização?",
        resposta:
          "Quando a decisão envolve onde instalar o Centro de Distribuição, trabalhamos junto com a frente de trabalho de Transporte e Malha Logística.",
      },
    ],
  },
  {
    title: "Eficiência operacional em Centro de Distribuição | Black River",
    description:
      "A mesma operação com menos tempo, menos erro e menos custo: recebimento, armazenagem, separação, cross docking e expedição, com a rotina de gestão funcionando.",
    h1: "Eficiência operacional em Centro de Distribuição",
    abertura:
      "Eficiência operacional em Centro de Distribuição é fazer a mesma operação com menos tempo, menos erro e menos custo, sem perder nível de serviço às lojas. A Black River ataca recebimento, armazenagem, separação, cross docking e expedição, e deixa a rotina de gestão funcionando.",
    oQueE:
      "A revisão dos processos do Centro de Distribuição que já existe: fluxos, endereçamento, ressuprimento, fila de separação, estrutura de cargos, turnos e indicadores diários.",
    caixa: {
      titulo: "O que é cross docking",
      texto:
        "Cross docking é o processo em que a mercadoria chega ao Centro de Distribuição já destinada às lojas e sai sem ser armazenada, em poucas horas ou no dia seguinte. Quando o produto fica parado dias à espera de expedição, o processo deixou de ser cross docking.",
    },
    paraQuem:
      "Operações com Centro de Distribuição próprio que convivem com atraso nas lojas, baixa produtividade ou custo de mão de obra crescente.",
    sinais: [
      "Pedidos das lojas saindo dias depois do previsto",
      "Produtividade da separação abaixo do que o mercado pratica",
      "Equipe grande em funções administrativas e pequena onde o trabalho acontece",
      "Horas extras constantes nos dias de pico",
    ],
    comoConduzimos: [
      "Medição de lead time, produtividade e acurácia por processo",
      "Causa raiz de cada gargalo (fluxo, layout, estrutura de cargos, sistema)",
      "Novos processos, rotinas e gestão visual, implantados com a equipe",
      "Acompanhamento diário dos indicadores até as metas",
    ],
    cases: [casos.crossDocking, casos.estrutura, casos.separacao],
    perguntas: [
      {
        pergunta: "Dá para ganhar eficiência sem trocar de sistema?",
        resposta:
          "Em boa parte dos casos, sim. Processo, rotina e gestão diária resolvem problemas que costumam ser atribuídos à falta de sistema.",
      },
      {
        pergunta: "Vocês mexem no quadro de pessoal?",
        resposta:
          "Propomos onde cada cargo deve estar para atender a operação real. A decisão sobre pessoas é sempre do cliente.",
      },
    ],
  },
  {
    title: "Gestão de abastecimento e estoques no varejo | Black River",
    description:
      "Loja abastecida com o menor estoque possível parado na rede: políticas, parâmetros e rotinas de compra e reposição para reduzir ruptura sem aumentar o estoque.",
    h1: "Gestão de abastecimento e estoques no varejo",
    abertura:
      "Gestão de abastecimento e estoques é manter a loja abastecida com o menor estoque possível parado na rede. A Black River revisa políticas, parâmetros e rotinas de compra e reposição para reduzir ruptura sem aumentar o estoque.",
    oQueE:
      "A definição de quanto, quando e onde manter estoque: políticas por tipo de produto, parâmetros de reposição, frequência de abastecimento das lojas e a integração entre compras, Centro de Distribuição e loja.",
    paraQuem:
      "Redes que convivem com ruptura e excesso de estoque ao mesmo tempo, ou com perda de perecíveis acima do aceitável.",
    sinais: [
      "Ruptura na loja e estoque alto no Centro de Distribuição ao mesmo tempo",
      "Perda de perecíveis acima do previsto",
      "Compras feitas pela intuição do comprador, sem parâmetro",
      "Capital de giro preso em produtos de baixo giro",
    ],
    comoConduzimos: [
      "Análise de giro, cobertura e ruptura por categoria e por loja",
      "Políticas de estoque e parâmetros de reposição",
      "Rotina de abastecimento integrada entre compras, Centro de Distribuição e lojas",
      "Indicadores de nível de serviço e de estoque acompanhados com a equipe",
    ],
    perguntas: [
      {
        pergunta: "Dá para reduzir ruptura sem aumentar estoque?",
        resposta:
          "Na maioria das redes, sim: o problema costuma estar na distribuição do estoque e nos parâmetros de reposição, não na quantidade total.",
      },
      {
        pergunta: "Vocês trabalham com perecíveis?",
        resposta:
          "Sim. Perecíveis pedem política e frequência de abastecimento próprias, e a perda é um dos indicadores acompanhados.",
      },
    ],
  },
  {
    title: "Negociação de verbas logísticas com fornecedores | Black River",
    description:
      "Verbas logísticas são o que o fornecedor paga ao varejista pelos serviços logísticos que ele assume. Bem negociadas, transformam parte do custo logístico em receita.",
    h1: "Negociação de verbas logísticas com fornecedores",
    abertura:
      "Verbas logísticas são os valores que o fornecedor paga ao varejista pelos serviços logísticos que o varejista assume, como receber no Centro de Distribuição e distribuir às lojas. Bem negociadas, transformam parte do custo logístico em receita. A Black River estrutura essa negociação com base no custo real de cada serviço.",
    caixa: {
      titulo: "O que são verbas logísticas",
      texto:
        "Quando o fornecedor deixa de entregar loja a loja e passa a entregar no Centro de Distribuição do varejista, ele economiza frete e operação. A verba logística é a parte dessa economia que volta ao varejista, como desconto ou contribuição.",
    },
    paraQuem:
      "Varejistas e atacadistas com Centro de Distribuição próprio que recebem de muitos fornecedores e ainda negociam logística caso a caso, ou não negociam.",
    sinais: [
      "O Centro de Distribuição presta serviço aos fornecedores sem contrapartida definida",
      "Cada comprador negocia logística de um jeito",
      "Ninguém sabe quanto custa receber, armazenar e distribuir cada fornecedor",
      "Fornecedores entregam direto na loja por falta de proposta melhor",
    ],
    comoConduzimos: [
      "Custo de cada serviço logístico prestado aos fornecedores",
      "Política de verbas por modalidade de entrega e perfil de fornecedor",
      "Preparação do time comercial e apoio nas negociações",
      "Acompanhamento das verbas negociadas contra o custo real",
    ],
    perguntas: [
      {
        pergunta: "Verba logística não piora a relação com o fornecedor?",
        resposta:
          "Quando é calculada pelo custo real do serviço, a negociação fica técnica: o fornecedor paga por algo que deixou de fazer.",
      },
      {
        pergunta: "Preciso ter Centro de Distribuição próprio?",
        resposta: "A verba depende de o varejista assumir algum serviço logístico. Sem isso, não há o que negociar.",
      },
    ],
  },
  {
    title: "Tecnologia para supply chain e WMS | Black River",
    description:
      "Escolha e implantação de WMS e sistemas logísticos, partindo do processo: um sistema implantado sobre um processo ruim repete os mesmos erros.",
    h1: "Tecnologia para supply chain: escolha e implantação de WMS e sistemas logísticos",
    abertura:
      "A Black River ajuda a escolher e implantar os sistemas da logística, como o WMS, e a fazer a operação usar o que já tem. O ponto de partida é sempre o processo, porque um sistema implantado sobre um processo ruim repete os mesmos erros.",
    caixa: {
      titulo: "O que é WMS",
      texto:
        "WMS (Warehouse Management System) é o sistema de gestão de armazém. Ele controla recebimento, endereçamento, separação e expedição dentro do Centro de Distribuição.",
    },
    paraQuem:
      "Empresas que vão contratar ou trocar um WMS, roteirizador ou sistema de reposição, e empresas que já têm o sistema mas não veem o ganho esperado.",
    sinais: [
      "O Centro de Distribuição opera no papel ou na planilha",
      "O sistema foi implantado, mas a equipe contorna o que ele pede",
      "Fornecedores de software prometem tudo e você não sabe comparar",
      "Dados de estoque do sistema não batem com o físico",
    ],
    comoConduzimos: [
      "Processos revisados antes da escolha do sistema",
      "Requisitos e comparação de fornecedores",
      "Acompanhamento da implantação e do treinamento",
      "Uso correto do sistema na rotina, medido por indicadores",
    ],
    cases: [casos.wms],
    perguntas: [
      {
        pergunta: "Quando vale implantar um WMS?",
        resposta:
          "Quando o volume e a variedade de produtos já não cabem em controles manuais e os processos estão definidos o bastante para o sistema segui-los.",
      },
      // "Vocês vendem ou representam algum sistema?" entra quando o Luis responder (pendência #4).
    ],
  },
  {
    title: "Transporte e malha logística | Black River",
    description:
      "Malha, rotas e modelo de frota revisados para reduzir o custo total de transporte sem piorar o atendimento às lojas.",
    h1: "Transporte e malha logística para redes de varejo e atacado",
    abertura:
      "A malha logística é o desenho de onde ficam os Centros de Distribuição, quais lojas cada um atende e como o produto chega até elas. A Black River revisa malha, rotas e modelo de frota para reduzir o custo total de transporte sem piorar o atendimento às lojas.",
    oQueE:
      "A análise e o redesenho da rede de distribuição: localização de Centros de Distribuição, área de atendimento de cada um, frequência de entrega, roteirização, frota própria ou terceirizada e contratos de frete.",
    paraQuem: "Redes em expansão para novas regiões, com custo de frete crescente ou com lojas atendidas por Centros de Distribuição distantes.",
    sinais: [
      "O frete cresce mais rápido que as vendas",
      "Veículos saindo com ocupação baixa",
      "Lojas novas atendidas a partir de um Centro de Distribuição longe demais",
      "Contratos de frete sem referência de custo",
    ],
    comoConduzimos: [
      "Mapa de custo e nível de serviço da malha atual",
      "Cenários de malha, localização e frequência comparados pelo custo total",
      "Rotas, modelo de frota e referências para negociar frete",
      "Implantação e acompanhamento dos indicadores de transporte",
    ],
    perguntas: [
      {
        pergunta: "Frota própria ou terceirizada?",
        resposta:
          "Depende do volume, da região e da regularidade das entregas. Comparamos os dois modelos pelo custo total e pelo risco.",
      },
      {
        pergunta: "Vocês ajudam a decidir onde abrir um novo Centro de Distribuição?",
        resposta: "Sim, em conjunto com a frente de trabalho de Projeto de Centro de Distribuição.",
      },
    ],
  },
];

export const paginasDeFrente: PaginaDeFrente[] = dados.map((d, i) => ({ ...d, frente: modulos[i], numero: i + 1 }));

export function slugDaFrente(frente: Frente) {
  return frente.href.split("/").pop() as string;
}

export function paginaPorSlug(slug: string) {
  return paginasDeFrente.find((p) => slugDaFrente(p.frente) === slug);
}

export const ctaDaFrente = {
  titulo: "Quer entender se esta frente de trabalho faz sentido para a sua operação?",
};
