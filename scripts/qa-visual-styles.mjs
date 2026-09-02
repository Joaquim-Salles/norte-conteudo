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
 * Cruza 3 templates refatorados (DadoVsAchismo, Comparativo, Depoimento) ×
 * 5 visualStyles × 2-3 temas cada — ver src/lib/visualStyles.ts pra definição
 * de cada preset. Revisar cada PNG antes de aprovar (Regra Inviolável #1) —
 * um estilo "ruim" não conta como estilo novo.
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

console.log(`Renderizando ${BATCH.length} combinações template x visualStyle x tema em out/qa/estilos/...\n`);

for (const {compositionId, outName, props} of BATCH) {
  const outPath = `out/qa/estilos/${outName}.png`;
  console.log(`  ${compositionId} -> ${outPath}`);
  renderStill({compositionId, props, outPath});
}

console.log(`\n${BATCH.length} preview(s) gerados em out/qa/estilos/. Revisar antes de aprovar (Regra Inviolável #1).`);
