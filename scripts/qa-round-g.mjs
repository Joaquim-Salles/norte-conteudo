#!/usr/bin/env node
import {renderStill} from './lib-render.mjs';

/**
 * QA/prova do Round G (2026-09-03) — preset `analogiaReal`, baseado em
 * pesquisa REAL do feed de @thaleslaray via instagram-control (35 posts) +
 * 1 imagem nativa baixada e inspecionada pixel a pixel (ver
 * docs/referencias-visuais/thaleslaray-pesquisa.md). Texto com contorno
 * grosso sobre foto real tem risco de legibilidade — revisar cada PNG
 * individualmente antes de aprovar (Regra Inviolável #1).
 */

const BATCH = [
  {
    compositionId: 'DicaPratica',
    outName: 'RoundG-DicaPratica-coverFoto-analogiaReal-estoque',
    props: {
      visualStyle: 'analogiaReal',
      slide: {
        kind: 'cover-foto',
        titulo: 'O que o cliente vê: prateleira cheia. O que ele não vê: ruptura silenciosa em 3 SKUs.',
        tagNumero: 'Dica 01',
        foto: 'photos/corredor-empilhadeira-estoque.jpg',
        fotoPosition: 'center 35%',
        iconeBadge: 'logos/estoque-icon.svg',
      },
    },
  },
  {
    compositionId: 'DicaPratica',
    outName: 'RoundG-DicaPratica-coverFoto-analogiaReal-vendas',
    props: {
      visualStyle: 'analogiaReal',
      slide: {
        kind: 'cover-foto',
        titulo: 'O cardápio que o cliente vê. O ticket médio que só sobe com sugestão guiada.',
        tagNumero: 'Dica 01',
        foto: 'photos/restaurante-ambiente-noturno.jpg',
        fotoPosition: 'center 20%',
        iconeBadge: 'logos/vendas-icon-192.png',
      },
    },
  },
  {
    compositionId: 'Depoimento',
    outName: 'RoundG-Depoimento-capa-analogiaReal-marca',
    props: {
      theme: 'marca',
      visualStyle: 'analogiaReal',
      slide: {
        kind: 'capa',
        citacao: 'O que o cliente vê é o painel pronto. O que ele não vê são as 40 planilhas que a gente juntou antes.',
        cliente: 'Equipe interna',
        empresa: 'Registro de bastidores',
        foto: 'photos/equipe-reuniao-escritorio.jpg',
        fotoPosition: 'center 30%',
      },
    },
  },
];

for (const item of BATCH) {
  console.log(`Renderizando ${item.outName}...`);
  renderStill({
    compositionId: item.compositionId,
    props: item.props,
    outPath: `out/qa/round-g/${item.outName}.png`,
  });
}

console.log(`\n${BATCH.length} renders do Round G concluídos em out/qa/round-g/`);
