#!/usr/bin/env node
import {renderStill} from './lib-render.mjs';

/**
 * QA visual rapido dos 5 templates com props de exemplo — inspirado no padrao
 * qa-screenshot.mjs/qa-visual-completo.mjs dos repos NTB (audit-2026-08-30.md).
 * Gera um PNG por template em out/qa/ pra revisao antes de qualquer publicacao
 * (Checklist #8, Regra Inviolavel #1: nada sai sem preview revisado).
 *
 * Nota: como os defaultProps ja estao registrados no Root.tsx, o jeito mais
 * simples de gerar o preview e chamar `npx remotion still` sem --props, o que
 * usa o defaultProps de cada <Still>. Este script existe pra rodar as 5 de
 * uma vez com 1 comando, sem repetir os 5 `npx remotion still` na mao.
 */
const TEMPLATES = [
  'DadoVsAchismo',
  'DicaPratica',
  'AntesDepois',
  'VitrineProduto',
  'MetodologiaSemEnrolacao',
];

for (const compositionId of TEMPLATES) {
  const outPath = `out/qa/${compositionId}.png`;
  console.log(`QA: ${compositionId} -> ${outPath}`);
  renderStill({compositionId, outPath}); // sem props -> usa defaultProps do Root.tsx
}

console.log('\nPreviews gerados em out/qa/. Revisar cada um manualmente antes de aprovar.');
