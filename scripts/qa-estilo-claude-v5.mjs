#!/usr/bin/env node
import {renderStill} from './lib-render.mjs';
import path from 'node:path';

/**
 * Estilo Claude — 6ª RODADA (2026-09-06), execução do relatório completo do
 * fundador (`docs/referencias-visuais/claude-instagram/relatorio-completo-fundador.md`,
 * §3) — pesquisa própria dele em cima de 120 posts reais do @claudeai,
 * substitui toda suposição das 5 rodadas anteriores. Pedido literal:
 * "eu quero posts alguns de fotos no fundo com algo simples" — layout
 * PRIORITÁRIO é só o "overlay em cena real" (1 dos 4 layouts do relatório:
 * foto de fundo dominante + texto simples por cima), não os outros 3.
 *
 * O que este render prova, item a item (ver CATALOGO.md pra detalhe):
 * 1. Sistema de 2 fontes — sans BOLD (chip) + serifada ITÁLICA (overlay em
 *    foto) — `fontStyle: 'italic'` hardcoded em CoverFotoReal/DicaPratica
 *    `cover-foto` (antes ficava 'normal', herdado de `headlineWeight:'bold'`
 *    do preset, que é certo pro card de cor sólida mas errado aqui).
 * 2. `StatusChip` novo (`src/lib/StatusChip.tsx`) — pílula com sombra leve,
 *    ícone pequeno (`IconSpark`) + verbo no GERÚNDIO + reticências, canto
 *    superior-esquerdo (discreto, não compete com o título centralizado).
 * 3. Cor de produto só no círculo do ícone do chip — nunca bloco de fundo
 *    artificial.
 *
 * 5 variações, times diferentes de foto + verbo diferente do chip cada:
 */

const OUT = 'out/estilo-claude-v5';

const BATCH = [
  {
    compositionId: 'CoverFotoReal',
    outName: '01-marca-montanha-refletindo',
    props: {
      visualStyle: 'editorialClaude',
      titulo: 'Clareza não é sorte. É processo.',
      foto: 'photos/montanha-neblina-caminhante.jpg',
      fotoPosition: 'center 40%',
      theme: 'marca',
      statusVerbo: 'Refletindo',
    },
  },
  {
    compositionId: 'CoverFotoReal',
    outName: '02-estoque-corredor-organizando',
    props: {
      visualStyle: 'editorialClaude',
      titulo: 'Todo item no lugar certo, sempre.',
      foto: 'photos/corredor-empilhadeira-estoque.jpg',
      fotoPosition: 'center 30%',
      theme: 'estoque',
      statusVerbo: 'Organizando o estoque',
    },
  },
  {
    compositionId: 'CoverFotoReal',
    outName: '03-vendas-salao-sincronizando',
    props: {
      visualStyle: 'editorialClaude',
      titulo: 'O pedido chega antes de você perguntar.',
      foto: 'photos/salao-moderno-movimento.jpg',
      fotoPosition: 'center 25%',
      theme: 'vendas',
      statusVerbo: 'Sincronizando pedidos',
    },
  },
  {
    compositionId: 'DicaPratica',
    outName: '04-vendas-prato-analisando',
    props: {
      visualStyle: 'editorialClaude',
      slide: {
        kind: 'cover-foto',
        titulo: 'O cardápio também é vitrine.',
        foto: 'photos/prato-gourmet-mesa-madeira.jpg',
        fotoPosition: 'center 20%',
        statusVerbo: 'Analisando o cardápio',
      },
    },
  },
  {
    compositionId: 'DicaPratica',
    outName: '05-avalia-analista-calculando',
    props: {
      visualStyle: 'editorialClaude',
      slide: {
        kind: 'cover-foto',
        titulo: 'Decisão de verdade nasce do dado.',
        foto: 'photos/analista-relatorios-mesa.jpg',
        fotoPosition: 'center 20%',
        statusVerbo: 'Calculando a margem',
      },
    },
  },
];

for (const item of BATCH) {
  console.log(`Renderizando ${item.outName}...`);
  renderStill({
    compositionId: item.compositionId,
    props: item.props,
    outPath: path.join(OUT, `${item.outName}.png`),
  });
}
