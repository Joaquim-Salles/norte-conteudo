#!/usr/bin/env node
import path from 'node:path';
import {parseBrief} from './parse-brief.mjs';
import {renderStill} from './lib-render.mjs';

/**
 * Render em lote do brief mensal — SOP §Mensal (estrategico-sops.md):
 * "Renderizar em lote: primeiro os posts/carrosseis, depois os reels."
 * Hoje so cobre posts/carrossel (Still) — reels (Composition + Bark) sao Fase 3.
 *
 * Uso: node scripts/render.mjs calendario/2026-09.md
 */
const filePath = process.argv[2];
if (!filePath) {
  console.error('Uso: node scripts/render.mjs calendario/{ano}-{mes}.md');
  process.exit(1);
}

const pieces = parseBrief(filePath);
const monthSlug = path.basename(filePath, '.md');

console.log(`${pieces.length} peca(s) encontrada(s) em ${filePath}`);

pieces.forEach((piece, i) => {
  const {compositionId, props, meta} = piece;
  const slideSuffix = meta.slideIndex !== undefined ? `-slide${meta.slideIndex + 1}` : '';
  const outPath = `out/${monthSlug}/${String(i + 1).padStart(2, '0')}-${compositionId}${slideSuffix}.png`;

  console.log(`[${i + 1}/${pieces.length}] ${compositionId}${slideSuffix} -> ${outPath}`);
  renderStill({compositionId, props, outPath});
});

console.log('Render em lote concluido. QA visual obrigatorio antes de publicar (Regra Inviolavel #1) — ver scripts/qa-preview.mjs.');
