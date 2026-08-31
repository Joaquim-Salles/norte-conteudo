#!/usr/bin/env node
import {renderStill} from './lib-render.mjs';

/**
 * Lote de PROVA do sistema de temas (2026-08-31) — mesmo componente .tsx,
 * `theme`/`produto` diferentes = saidas visuais diferentes, sem duplicar
 * arquivo. Objetivo: mostrar que a infraestrutura escala pra "milhares de
 * variacoes" sob demanda, sem gerar literalmente milhares agora.
 *
 * Nao roda no `npm run qa:preview` normal (esse continua cobrindo os 5 tipos
 * de post/variantes de layout). Este script cobre a MATRIZ tema x variante.
 */

const THEMES = ['marca', 'estoque', 'vendas', 'avalia'];

const BATCH = [];

// --- 1) Dado vs Achismo: 3 variantes x 4 temas = 12 ---
for (const variant of ['padrao', 'impacto', 'ladoALado']) {
  for (const theme of THEMES) {
    BATCH.push({
      compositionId: 'DadoVsAchismo',
      outName: `temas/DadoVsAchismo-${variant}-${theme}`,
      props: {
        variant,
        theme,
        achismo: '"Acho que meu processo tá mais ou menos certo."',
        dado: '38% das PMEs perdem margem por processo não medido.',
        fonteDado: 'Norte Para Negócios, diagnóstico operacional',
      },
    });
  }
}

// --- 2) Antes/Depois: variante padrao x 4 temas = 4 (prova do 3º template refatorado) ---
for (const theme of THEMES) {
  BATCH.push({
    compositionId: 'AntesDepois',
    outName: `temas/AntesDepois-padrao-${theme}`,
    props: {
      theme,
      antesTexto: 'Processo travado, sem visibilidade do que realmente acontece no dia a dia.',
      depoisTexto: 'Processo sob controle, com dado real sustentando cada decisão.',
      metrica: '-92% retrabalho',
    },
  });
}

// --- 3) Vitrine de Produto: 3 variantes de layout x 3 produtos (tema automático) = 9 ---
const PRODUCTS = [
  {
    produto: 'ntbEstoque',
    nomeProduto: 'NTB Estoque',
    headline: 'Estoque sincronizado com o Omie em tempo real.',
    features: [
      'Leitura de QR code pra movimentação e inventário',
      'Etiquetagem inteligente por lote/validade',
      'Inventários otimizados, sem parar a loja',
      'Perfis de acesso pra ajustes sensíveis',
    ],
  },
  {
    produto: 'ntbVendas',
    nomeProduto: 'NTB Vendas',
    headline: 'Pedido, cozinha e pagamento em um só cardápio digital.',
    features: [
      'Cardápio digital direto na mesa, sem app pro cliente',
      'Pedido cai direto na cozinha, sem retrabalho de garçom',
      'Pagamento e nota fiscal integrados no fechamento',
      'Painel do lojista com tudo em tempo real',
    ],
  },
  {
    produto: 'norteAvalia',
    nomeProduto: 'Norte Avalia',
    headline: 'Avaliação de desempenho sem achismo, com dado real.',
    features: [
      'Ciclos de avaliação automatizados',
      'Feedback estruturado, não genérico',
      'Histórico de evolução por colaborador',
      'Relatório pronto pra gestão decidir',
    ],
  },
];

for (const variant of ['padrao', 'hero', 'grid']) {
  for (const p of PRODUCTS) {
    BATCH.push({
      compositionId: 'VitrineProduto',
      outName: `temas/VitrineProduto-${variant}-${p.produto}`,
      props: {...p, variant},
    });
  }
}

// --- 4) Vitrine de Produto — variant 'print' com screenshot real: 6 combinações ---
// screenshotAspect = largura/altura REAL do arquivo (checado com `sips`/`file`)
// — evita objectFit:cover cortar conteudo da UI quando a proporcao foge do
// padrao assumido pela moldura (achado real no QA: home-mobile.png é 500x844,
// mais "largo" que um celular comum, cortava texto lateral sem isso).
const PRINTS = [
  {produto: 'ntbEstoque', nomeProduto: 'NTB Estoque', headline: 'Veja o painel de estoque de verdade.', screenshot: 'screenshots/home-desktop.png', device: 'browser', screenshotAspect: undefined}, // full-page (1425x1624) — usa recorte padrao (above the fold), proposital
  {produto: 'ntbEstoque', nomeProduto: 'NTB Estoque', headline: 'No bolso, controle total do estoque.', screenshot: 'screenshots/home-mobile.png', device: 'phone', screenshotAspect: 500 / 844},
  {produto: 'ntbEstoque', nomeProduto: 'NTB Estoque', headline: 'Cada produto, com histórico completo.', screenshot: 'screenshots/produto-desktop.png', device: 'browser', screenshotAspect: 1440 / 900},
  {produto: 'ntbEstoque', nomeProduto: 'NTB Estoque', headline: 'Validade controlada, sem perda por vencimento.', screenshot: 'screenshots/validade-desktop.png', device: 'browser', screenshotAspect: 1440 / 900},
  {produto: 'ntbVendas', nomeProduto: 'NTB Vendas', headline: 'Cardápio digital, direto na mesa do cliente.', screenshot: 'screenshots/vendas-desktop.png', device: 'browser', screenshotAspect: undefined}, // hero (2880x1658) — recorte padrao, hero e centralizado
  {produto: 'ntbVendas', nomeProduto: 'NTB Vendas', headline: 'Pedido no celular, sem esperar garçom.', screenshot: 'screenshots/vendas-mobile.png', device: 'phone', screenshotAspect: 1170 / 2532},
];

for (const p of PRINTS) {
  BATCH.push({
    compositionId: 'VitrineProduto',
    outName: `temas/VitrineProduto-print-${p.produto}-${p.device}-${p.screenshot.split('/').pop().replace('.png', '')}`,
    props: {
      produto: p.produto,
      nomeProduto: p.nomeProduto,
      headline: p.headline,
      features: [],
      variant: 'print',
      screenshot: p.screenshot,
      device: p.device,
      ...(p.screenshotAspect ? {screenshotAspect: p.screenshotAspect} : {}),
    },
  });
}

console.log(`Renderizando ${BATCH.length} combinações tema x variante em out/qa/temas/...\n`);

for (const {compositionId, outName, props} of BATCH) {
  const outPath = `out/qa/${outName}.png`;
  console.log(`  ${compositionId} -> ${outPath}`);
  renderStill({compositionId, props, outPath});
}

console.log(`\n${BATCH.length} preview(s) gerados em out/qa/temas/. Revisar antes de aprovar (Regra Inviolável #1).`);
