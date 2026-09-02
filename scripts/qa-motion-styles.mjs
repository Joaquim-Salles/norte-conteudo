#!/usr/bin/env node
import {renderVideo} from './lib-render.mjs';

/**
 * QA/prova do sistema de ESTILO DE MOTION (Round C, docs/plano-catalogo-em-escala.md).
 * Objetivo: provar que `motionStyle` produz vídeos REALMENTE diferentes (não
 * só metadado) cruzando pelo menos 2-3 tipos de conteúdo animável × 3-4
 * motionStyles — mínimo 6-8 MP4s renderizados de verdade (Regra Inviolável
 * #1: assistir o vídeo real, extrair frames-chave via ffmpeg pra revisão
 * rápida, nunca aprovar só porque compilou).
 *
 * `kineticForte` aparece nos 3 tipos como BASELINE (é a aparência ORIGINAL —
 * ver comentário de compatibilidade em cada Reel), os outros 6 presets
 * aparecem cada um em pelo menos 1 tipo, escolhido pelo `quandoUsar` de cada
 * preset (ex.: `typewriter` no Comparativo/citação, `splitReveal` no
 * Comparativo — o par mais natural — e também na Metodologia pra provar que
 * não é exclusivo de 1 template).
 */

const BATCH = [
  // --- Dado vs. Achismo Reel — 4 motionStyles ---
  {compositionId: 'DadoVsAchismoReel', outName: 'DadoVsAchismoReel-kineticForte', props: {motionStyle: 'kineticForte'}},
  {compositionId: 'DadoVsAchismoReel', outName: 'DadoVsAchismoReel-minimalFade', props: {motionStyle: 'minimalFade'}},
  {compositionId: 'DadoVsAchismoReel', outName: 'DadoVsAchismoReel-zoomPunch', props: {motionStyle: 'zoomPunch'}},
  {compositionId: 'DadoVsAchismoReel', outName: 'DadoVsAchismoReel-matchCut', props: {motionStyle: 'matchCut'}},

  // --- Metodologia Reel — 3 motionStyles ---
  {compositionId: 'MetodologiaReel', outName: 'MetodologiaReel-kineticForte', props: {motionStyle: 'kineticForte'}},
  {compositionId: 'MetodologiaReel', outName: 'MetodologiaReel-whipPanCut', props: {motionStyle: 'whipPanCut'}},
  {compositionId: 'MetodologiaReel', outName: 'MetodologiaReel-splitReveal', props: {motionStyle: 'splitReveal'}},

  // --- Comparativo Reel (NOVO) — 3 motionStyles, incluindo o par natural (splitReveal) ---
  {compositionId: 'ComparativoReel', outName: 'ComparativoReel-splitReveal', props: {motionStyle: 'splitReveal'}},
  {compositionId: 'ComparativoReel', outName: 'ComparativoReel-typewriter', props: {motionStyle: 'typewriter'}},
  {compositionId: 'ComparativoReel', outName: 'ComparativoReel-kineticForte', props: {motionStyle: 'kineticForte'}},
];

for (const [i, {compositionId, outName, props}] of BATCH.entries()) {
  const outPath = `out/qa/motion/${outName}.mp4`;
  console.log(`[${i + 1}/${BATCH.length}] ${compositionId} (${outName}) -> ${outPath}`);
  renderVideo({compositionId, props, outPath});
}

console.log(`\n${BATCH.length} video(s) renderizados em out/qa/motion/. Assistir/extrair frames antes de aprovar (Regra Inviolavel #1).`);
