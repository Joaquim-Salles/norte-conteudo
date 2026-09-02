#!/usr/bin/env node
import {renderStill} from './lib-render.mjs';

/**
 * QA/prova do sistema de ESTILO VISUAL (Round A, docs/plano-catalogo-em-escala.md).
 * Objetivo: provar que `visualStyle` é combinável com `theme` de verdade — mesmo
 * conteúdo, mesmo tema, estilos diferentes = saídas visivelmente diferentes
 * (composição/densidade, textura, estilo de card, peso tipográfico, gráfico de
 * apoio) — SEM duplicar arquivo .tsx. Não roda no `qa:preview` normal (esse
 * cobre os tipos/variantes de layout, sem cruzar com visualStyle).
 *
 * Round A (blocos 1-3): 3 templates (DadoVsAchismo, Comparativo, Depoimento) ×
 * 5 visualStyles × 2-3 temas cada = 40 renders.
 * Round B (blocos 4-8, 2026-09-01): os 5 templates restantes (AntesDepois,
 * VitrineProduto, DicaPratica, MetodologiaSemEnrolacao, Bastidores) — cada
 * um cobre os 5 estilos numa variante/slide-kind "bandeira" e cobertura mais
 * enxuta nas demais, pra não duplicar prova de tema já feita no Round A.
 * Ver src/lib/visualStyles.ts pra definição de cada preset. Revisar cada
 * PNG antes de aprovar (Regra Inviolável #1) — um estilo "ruim" não conta
 * como estilo novo, é excluído e documentado (ver CATALOGO.md).
 */

const STYLES = ['minimalista', 'dadoEmDestaque', 'editorial', 'boldTipografico', 'corporateClean'];

const BATCH = [];

// --- 1) DadoVsAchismo (variant padrao) x 5 estilos x 3 temas = 15 ---
const THEMES_1 = ['marca', 'estoque', 'vendas'];
for (const visualStyle of STYLES) {
  for (const theme of THEMES_1) {
    BATCH.push({
      compositionId: 'DadoVsAchismo',
      outName: `DadoVsAchismo-padrao-${visualStyle}-${theme}`,
      props: {
        variant: 'padrao',
        theme,
        visualStyle,
        achismo: '"Acho que meu processo tá mais ou menos certo."',
        dado: '38% das PMEs perdem margem por processo não medido.',
        fonteDado: 'Norte Para Negócios, diagnóstico operacional',
      },
    });
  }
}

// --- 2) Comparativo (variant tabela, mostra SurfaceCard/cardStyleOverride) x 5 estilos x 3 produtos = 15 ---
const PRODUCTS = ['ntbEstoque', 'ntbVendas', 'norteAvalia'];
const ITENS_COMPARATIVO = [
  {label: 'Controle', a: 'Planilha manual', b: 'Sincronizado em tempo real'},
  {label: 'Decisão', a: 'No achismo', b: 'Baseada em dado real'},
  {label: 'Visibilidade', a: 'Só no fim do mês', b: 'Painel ao vivo'},
];
for (const visualStyle of STYLES) {
  for (const produto of PRODUCTS) {
    BATCH.push({
      compositionId: 'Comparativo',
      outName: `Comparativo-tabela-${visualStyle}-${produto}`,
      props: {
        variant: 'tabela',
        produto,
        visualStyle,
        tituloA: 'Do jeito antigo',
        tituloB: 'Com a Norte',
        itens: ITENS_COMPARATIVO,
      },
    });
  }
}

// --- 3) Depoimento (slide capa-metrica, hero = numero grande — maior prova de headlineScale) x 5 estilos x 2 temas = 10 ---
const THEMES_3 = ['marca', 'estoque'];
for (const visualStyle of STYLES) {
  for (const theme of THEMES_3) {
    BATCH.push({
      compositionId: 'Depoimento',
      outName: `Depoimento-capaMetrica-${visualStyle}-${theme}`,
      props: {
        theme,
        visualStyle,
        slide: {
          kind: 'capa-metrica',
          metrica: '-92%',
          metricaLabel: 'retrabalho',
          citacaoCurta: 'Hoje eu vejo o estoque batendo com o sistema todo dia.',
          cliente: 'Marcos Andrade',
          empresa: 'Distribuidora Bom Ponto',
        },
      },
    });
  }
}

// --- Round B (2026-09-01) — os 5 templates restantes ganham visualStyle. ---
// Cada bloco cobre TODOS os 5 estilos pelo menos numa variante/slide-kind
// "bandeira" do tipo, e cobre estilos mais restritos (1-3) nas demais — foco
// em revisar de verdade (Regra Inviolável #1) sem duplicar a mesma prova de
// tema/estilo já feita nos 3 templates do Round A.

// --- 4) AntesDepois (3 variantes) x 5 estilos, theme fixo 'estoque' = 15 ---
for (const variant of ['padrao', 'ladoALado', 'metricaHero']) {
  for (const visualStyle of STYLES) {
    BATCH.push({
      compositionId: 'AntesDepois',
      outName: `AntesDepois-${variant}-${visualStyle}`,
      props: {
        variant,
        visualStyle,
        theme: 'estoque',
        antesTexto: 'Inventário fechava sempre com divergência e ninguém sabia explicar o motivo.',
        depoisTexto: 'Inventário bate com o sistema todo mês, sem retrabalho.',
        metrica: '-92%',
      },
    });
  }
}

// --- 5) VitrineProduto (5 variantes) x estilos variados = 15 ---
const VITRINE_FEATURES = [
  'Leitura de QR code pra movimentação e inventário',
  'Etiquetagem inteligente por lote/validade',
  'Inventários otimizados, sem parar a loja',
  'Perfis de acesso pra ajustes sensíveis',
];
for (const visualStyle of STYLES) {
  BATCH.push({
    compositionId: 'VitrineProduto',
    outName: `VitrineProduto-padrao-${visualStyle}`,
    props: {
      variant: 'padrao',
      visualStyle,
      produto: 'ntbEstoque',
      nomeProduto: 'NTB Estoque',
      headline: 'Estoque sincronizado com o Omie em tempo real.',
      features: VITRINE_FEATURES,
    },
  });
  BATCH.push({
    compositionId: 'VitrineProduto',
    outName: `VitrineProduto-hero-${visualStyle}`,
    props: {
      variant: 'hero',
      visualStyle,
      produto: 'ntbVendas',
      nomeProduto: 'NTB Vendas',
      headline: 'Cardápio digital que vira pedido sem fila.',
      features: ['QR code na mesa', 'Pedido direto na cozinha', 'Pagamento integrado', 'Sem app pro cliente baixar'],
    },
  });
}
for (const visualStyle of ['minimalista', 'editorial', 'corporateClean']) {
  BATCH.push({
    compositionId: 'VitrineProduto',
    outName: `VitrineProduto-grid-${visualStyle}`,
    props: {
      variant: 'grid',
      visualStyle,
      produto: 'norteAvalia',
      nomeProduto: 'Norte Avalia',
      headline: 'Diagnóstico com dado, não com achismo.',
      features: ['Diagnóstico guiado', 'Plano de ação priorizado', 'Acompanhamento de indicador', 'Comparativo por período'],
    },
  });
}
BATCH.push({
  compositionId: 'VitrineProduto',
  outName: 'VitrineProduto-print-dadoEmDestaque',
  props: {
    variant: 'print',
    visualStyle: 'dadoEmDestaque',
    produto: 'ntbVendas',
    nomeProduto: 'NTB Vendas',
    headline: 'O cardápio digital na tela do seu celular.',
    features: [],
    screenshot: 'screenshots/vendas-mobile.png',
    device: 'phone',
  },
});
BATCH.push({
  compositionId: 'VitrineProduto',
  outName: 'VitrineProduto-contexto-editorial',
  props: {
    variant: 'contexto',
    visualStyle: 'editorial',
    produto: 'ntbVendas',
    nomeProduto: 'NTB Vendas',
    headline: 'Do prato na mesa pro pedido no sistema.',
    features: [],
  },
});

// --- 6) DicaPratica (6 slide kinds) x estilos variados = 15 ---
for (const visualStyle of STYLES) {
  BATCH.push({
    compositionId: 'DicaPratica',
    outName: `DicaPratica-cover-${visualStyle}`,
    props: {visualStyle, slide: {kind: 'cover', titulo: '3 erros que travam seu estoque', tagNumero: '3 ERROS'}},
  });
  BATCH.push({
    compositionId: 'DicaPratica',
    outName: `DicaPratica-coverQuote-${visualStyle}`,
    props: {
      visualStyle,
      slide: {
        kind: 'cover-quote',
        citacao: 'Se você não mede, você está achando — não decidindo.',
        titulo: 'Achismo custa caro',
      },
    },
  });
}
for (const visualStyle of ['minimalista', 'boldTipografico', 'corporateClean']) {
  BATCH.push({
    compositionId: 'DicaPratica',
    outName: `DicaPratica-bridge-${visualStyle}`,
    props: {
      visualStyle,
      slide: {kind: 'bridge', numero: 1, total: 3, titulo: 'Conte antes de comprar', corpo: 'Sem contagem por lote, todo pedido de reposição é um chute.'},
    },
  });
}
BATCH.push({
  compositionId: 'DicaPratica',
  outName: 'DicaPratica-coverGrid-dadoEmDestaque',
  props: {
    visualStyle: 'dadoEmDestaque',
    slide: {kind: 'cover-grid', titulo: '4 sinais de que seu estoque está no escuro', tagNumero: '4 SINAIS', itens: ['Divergência todo mês', 'Reposição no chute', 'Sem rastreio de lote', 'Inventário manual']},
  },
});
BATCH.push({
  compositionId: 'DicaPratica',
  outName: 'DicaPratica-cta-editorial',
  props: {visualStyle: 'editorial', slide: {kind: 'cta'}},
});

// --- 7) MetodologiaSemEnrolacao (5 slide kinds) x estilos variados = 15 ---
for (const visualStyle of ['minimalista', 'dadoEmDestaque', 'corporateClean']) {
  BATCH.push({
    compositionId: 'MetodologiaSemEnrolacao',
    outName: `MetodologiaSemEnrolacao-cover-${visualStyle}`,
    props: {visualStyle, slide: {kind: 'cover', titulo: 'PDCA aplicado ao seu estoque', metodo: 'Metodologia'}},
  });
}
for (const visualStyle of STYLES) {
  BATCH.push({
    compositionId: 'MetodologiaSemEnrolacao',
    outName: `MetodologiaSemEnrolacao-coverEditorial-${visualStyle}`,
    props: {visualStyle, slide: {kind: 'cover-editorial', titulo: 'Medir antes de mudar', subtitulo: 'Todo diagnóstico começa com o dado que já existe.'}},
  });
  BATCH.push({
    compositionId: 'MetodologiaSemEnrolacao',
    outName: `MetodologiaSemEnrolacao-passo-${visualStyle}`,
    props: {
      visualStyle,
      slide: {kind: 'passo', numero: 2, total: 3, titulo: 'Meça o que já existe', descricao: 'Antes de mudar processo, meça o atual — sem baseline não dá pra provar melhoria.'},
    },
  });
}
BATCH.push({
  compositionId: 'MetodologiaSemEnrolacao',
  outName: 'MetodologiaSemEnrolacao-coverRoadmap-boldTipografico',
  props: {
    visualStyle: 'boldTipografico',
    slide: {kind: 'cover-roadmap', titulo: 'PDCA em 4 etapas', metodo: 'Metodologia', etapas: ['Planejar', 'Executar', 'Checar', 'Agir']},
  },
});
BATCH.push({
  compositionId: 'MetodologiaSemEnrolacao',
  outName: 'MetodologiaSemEnrolacao-cta-minimalista',
  props: {visualStyle: 'minimalista', slide: {kind: 'cta'}},
});

// --- 8) Bastidores (2 variantes) x 5 estilos = 10 ---
for (const visualStyle of STYLES) {
  BATCH.push({
    compositionId: 'Bastidores',
    outName: `Bastidores-manifesto-${visualStyle}`,
    props: {
      visualStyle,
      titulo: 'Não recomendamos nada antes de ver o dado.',
      principios: [
        'Todo diagnóstico começa medindo o que já existe, não achando.',
        'Nenhuma solução entra sem um número que comprove que ela resolveu.',
        'Se o processo não é repetível, não é método — é sorte.',
      ],
    },
  });
  BATCH.push({
    compositionId: 'Bastidores',
    outName: `Bastidores-regraDaCasa-${visualStyle}`,
    props: {
      visualStyle,
      variant: 'regraDaCasa',
      numero: 'Regra 01',
      titulo: 'Nenhuma recomendação sem diagnóstico antes.',
      corpo: 'Não vendemos solução pronta — primeiro medimos o que já existe no seu processo.',
    },
  });
}

console.log(`Renderizando ${BATCH.length} combinações template x visualStyle x tema em out/qa/estilos/...\n`);

for (const {compositionId, outName, props} of BATCH) {
  const outPath = `out/qa/estilos/${outName}.png`;
  console.log(`  ${compositionId} -> ${outPath}`);
  renderStill({compositionId, props, outPath});
}

console.log(`\n${BATCH.length} preview(s) gerados em out/qa/estilos/. Revisar antes de aprovar (Regra Inviolável #1).`);
