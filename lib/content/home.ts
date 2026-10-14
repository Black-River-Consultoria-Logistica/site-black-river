// Textos da Home — fonte: docs/CONTEUDO.md (aprovado pelo João em 14/10/2026).
// Estrutura aprovada no esboço da Etapa 4: Dor e Transformação unificadas em "Antes × Depois".

export const hero = {
  // H1 provisório (pendência #9: revisitar).
  titulo: "Consultoria em logística para varejo e atacado que executa junto até o resultado ficar com o seu time.",
  subtitulo:
    "A Black River leva para dentro da sua logística a bagagem de quem dirigiu grandes operações e conhece os desafios do varejo brasileiro.",
  apoio: "Sem custo, online ou presencial.",
};

export const provas = [
  { numero: "30+", legenda: "cases de sucesso" },
  { numero: "15 anos", legenda: "de atuação da Black River" },
  { numero: "30 anos", legenda: "do sócio-diretor à frente de Supply Chain em grandes empresas" },
];

export const antesDepois = {
  titulo: "O problema logístico raramente aparece no Centro de Distribuição.",
  texto: "Aparece na margem, na ruptura da loja e no estoque que cresce sem explicação.",
  antes: {
    titulo: "Os sinais mais comuns nas operações que chegam até nós",
    itens: [
      "Estoque descontrolado e lojas mal abastecidas",
      "Custos operacionais que corroem a rentabilidade",
      "Processos lentos e descoordenados, equipes sem treinamento",
      "Negociações desvantajosas com fornecedores e transportadores",
      "Perda de perecíveis e gestão sem auditoria",
    ],
  },
  depois: {
    titulo: "O que fica quando o projeto termina",
    itens: [
      "Equipes treinadas e avaliadas",
      "Processos que funcionam sem depender da consultoria",
      "Custos e desperdícios sob controle",
      "Centros de Distribuição estruturados para a operação real",
      "Gestão por indicadores, com rotina e auditoria",
    ],
  },
};

export const jornada = {
  titulo: "Três etapas, combinadas antes de começar.",
  etapas: [
    {
      nome: "Diagnóstico validado",
      texto:
        "Mapeamos a operação e chegamos à causa raiz dos problemas. O diagnóstico só vale depois de validado pelo seu time.",
    },
    {
      nome: "Cronograma e entregas definidos",
      texto: "Com o diagnóstico aprovado, fixamos o que será entregue, em que ordem e com quais metas.",
    },
    {
      nome: "Execução conjunta",
      texto:
        "Nossos consultores trabalham dentro da operação, ao lado do seu time, até as metas serem atingidas e o time conseguir sustentar o resultado.",
    },
  ],
  link: { rotulo: "Ver como trabalhamos", href: "/como-trabalhamos" },
};

export const solucoes = {
  titulo: "Sete frentes de trabalho, do diagnóstico à malha de transporte.",
  texto: "Todo projeto começa pelo diagnóstico. A partir dele, combinamos as frentes que a sua operação precisa.",
  // Linha de cada card, na ordem de `modulos` em lib/site.ts.
  linhas: [
    "O retrato completo da operação e a causa raiz dos problemas.",
    "Layout, capacidade e fluxos desenhados para a operação que você vai ter.",
    "Mais produtividade no recebimento, na armazenagem, na separação e na expedição.",
    "Loja abastecida sem estoque parado: políticas, parâmetros e rotina.",
    "A logística do varejo também gera receita. Mostramos como negociar.",
    "Escolha e implantação de sistemas como o WMS, com processo antes de software.",
    "Rotas, frota e localização de Centros de Distribuição pensadas pelo custo total.",
  ],
  // 8ª célula da grade (texto aprovado na página Soluções).
  convite: {
    titulo: "Não sabe por qual frente de trabalho começar?",
    texto: "Quase ninguém sabe antes do diagnóstico. Comece pela conversa.",
  },
};

export const cases = {
  titulo: "Diagnósticos reais: a experiência da Black River na prática.",
  texto: "Cada case mostra o problema encontrado, a causa raiz e a meta traçada com o cliente.",
  // Textos completos na Etapa 7; aqui só o que já foi aprovado (tema e título).
  itens: [
    { tema: "Cross docking", titulo: "Produto parado não é cross docking", href: "/cases/cross-docking" },
    { tema: "Estrutura do Centro de Distribuição", titulo: "Quase metade do quadro fora da operação", href: "/cases/estrutura-do-centro-de-distribuicao" },
    { tema: "Separação", titulo: "60 caixas por hora: quase 50% abaixo do mercado", href: "/cases/separacao" },
  ],
  link: { rotulo: "Ver todos os cases", href: "/cases" },
};

export const insights = {
  titulo: "O que aprendemos dentro das operações, por escrito.",
  // Pautas a construir com o Luis (pendência #4); títulos provisórios do esboço.
  itens: [
    { titulo: "Como escolher uma consultoria de logística para o varejo", href: "/insights/como-escolher-consultoria-de-logistica-para-varejo" },
    { titulo: "O que são verbas logísticas e como negociar com fornecedores", href: "/insights/verbas-logisticas" },
    { titulo: "Como funciona um diagnóstico logístico, etapa por etapa", href: "/insights/como-funciona-um-diagnostico-logistico" },
  ],
  autor: "Luis Ricardo Pedro",
  link: { rotulo: "Ler os artigos", href: "/insights" },
};

export const objecoes = {
  titulo: "Perguntas que todo diretor faz antes de contratar uma consultoria.",
  itens: [
    {
      pergunta: "“Consultoria entrega um diagnóstico e vai embora.”",
      resposta:
        "Depois do diagnóstico validado, nossos consultores ficam na operação, executam junto com o seu time e só saem quando a equipe sustenta o resultado sozinha.",
    },
    {
      pergunta: "“Vocês não conhecem a realidade do meu formato.”",
      resposta:
        "Nosso time veio do lado de dentro. Luis Ricardo Pedro, sócio-diretor da Black River, foi diretor de Supply Chain em varejo (Grupo Pão de Açúcar, Carrefour), atacado (Martins Atacadista), indústria (Bertin/JBS) e distribuição (Ultragaz). Ao lado dele trabalha um time de consultores especializados, com experiência em grandes operações e preparado para a realidade de cada cliente.",
    },
    {
      pergunta: "“Como vou medir o retorno?”",
      resposta:
        "Com metas objetivas e mensuráveis definidas no diagnóstico e acompanhadas na execução: indicadores da sua operação, como prazo de atendimento das lojas, produtividade da separação e custo logístico. Você aprova as metas antes de o trabalho começar.",
    },
    {
      pergunta: "“É caro e demora para dar resultado.”",
      // Última frase aguarda validação do Luis (CONTEUDO.md, pendências).
      resposta:
        "A primeira conversa é sem custo. A equipe é dimensionada pelo porte da operação e pelo escopo do diagnóstico, e o cronograma é fechado antes do início do trabalho. Nos diagnósticos, separamos o que pode ser feito já, com processo e rotina, do que depende de investimento.",
    },
  ],
};

export const ctaFinal = {
  titulo: "Vamos conversar sobre a sua operação?",
  texto: "Uma conversa sem custo, online ou presencial, sobre os pontos que importam para o seu negócio.",
};
