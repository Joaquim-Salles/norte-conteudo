import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync, readFileSync, readdirSync, statSync} from 'node:fs';
import path from 'node:path';
import {groupMediaFiles} from '../lib/carousel-preview.mjs';

const carouselPath = path.resolve('conteudo ntb/02-carrosseis/Norte Estoque - Estoque sob controle');
const template = readFileSync(new URL('../../src/templates/NorteEstoqueApresentacao.tsx', import.meta.url), 'utf8');

test('the cover compares a recognizable physical stock shelf with a system inventory card', () => {
  const cover = template.split('/* 02 · QR:')[0];
  assert.match(cover, /PhysicalShelf/);
  assert.match(cover, /ESTOQUE FÍSICO/);
  assert.match(cover, /ESTOQUE NO SISTEMA/);
  assert.doesNotMatch(cover, /<StockBox/);
  assert.doesNotMatch(cover, /rotate\(-3deg\)|rotate\(3deg\)/);
});

test('the QR scan is a short, linear horizontal sweep with a clear completion beat', () => {
  assert.match(template, /QR_SCAN_START\s*=\s*\d+/);
  assert.match(template, /QR_SCAN_END\s*=\s*\d+/);
  assert.match(template, /top:\s*`\$\{7\s*\+\s*beam\s*\*\s*86\}%`/);
  assert.match(template, /left:\s*16,\s*right:\s*16,\s*top:[^,]+,\s*height:\s*4/);
  assert.match(template, /#FF5B65/);
  assert.doesNotMatch(template, /easing:\s*Easing\.bezier\(\.16,\s*1,\s*\.3,\s*1\).*QR_SCAN/);
});

test('the label is revealed downward from the printer output and has no detached printer icon', () => {
  const labelScene = template.split('const EtiquetaScene')[1].split('export const NorteEstoqueApresentacao04')[0];
  assert.match(labelScene, /LABEL_PRINT_START\s*,\s*LABEL_PRINT_END/);
  assert.match(labelScene, /Easing\.bezier\(0\.22,\s*1,\s*0\.36,\s*1\)/);
  assert.match(labelScene, /translateY\(\$\{-282\s*\*\s*\(1\s*-\s*printProgress\)\}px\)/);
  assert.match(labelScene, /overflow:\s*'hidden'/);
  assert.match(labelScene, /NORTE ESTOQUE/);
  assert.doesNotMatch(labelScene, /<Printer/);
  assert.doesNotMatch(labelScene, /paperRevealHeight/);
});

test('the QR support is a clean inventory tag without faux-wood grain', () => {
  const qrScene = template.split('const InventarioQrScene')[1].split('export const NorteEstoqueApresentacao02')[0];
  assert.match(qrScene, /INVENTÁRIO/);
  assert.doesNotMatch(qrScene, /#D7C69F|#B29A6D/);
});

test('conference rows complete at uniform intervals, with the last row on the same cadence', () => {
  const scene = template.split('const ConferenciaScene')[1].split('export const NorteEstoqueApresentacao03')[0];
  assert.match(scene, /CONFERENCE_START\s*\+\s*index\s*\*\s*CONFERENCE_STAGGER/);
  assert.match(scene, /CONFERENCE_ROW_DURATION/);
  assert.doesNotMatch(scene, /Math\.floor\(progress\(f,\s*18,\s*72\)\s*\*\s*5\)/);
});

test('production stages advance with a short fixed cadence instead of a long eased tail', () => {
  const scene = template.split('const ProducaoScene')[1].split('export const NorteEstoqueApresentacao06')[0];
  assert.match(scene, /\(f\s*-\s*PRODUCTION_START\)\s*\/\s*PRODUCTION_STAGE_DURATION/);
  assert.doesNotMatch(scene, /Math\.floor\(progress\(f,\s*12,\s*72\)\s*\*\s*3\)/);
});

test('the Norte Estoque post contains seven complete slides and five playable animations', () => {
  assert.ok(existsSync(carouselPath), 'the exported Norte Estoque carousel should exist');
  const slides = groupMediaFiles(readdirSync(carouselPath));

  assert.equal(slides.length, 7, 'the preview should expose exactly seven numbered slides');
  assert.deepEqual(slides.map(({number}) => number), [1, 2, 3, 4, 5, 6, 7]);
  assert.ok(slides.every(({image}) => image), 'every slide should have a static PNG preview');
  assert.deepEqual(
    slides.filter(({animation}) => animation).map(({number}) => number),
    [2, 3, 4, 5, 6],
    'the five middle slides should each have a motion version',
  );

  for (const slide of slides) {
    for (const mediaName of [slide.image, slide.animation].filter(Boolean)) {
      assert.ok(statSync(path.join(carouselPath, mediaName)).size > 0, `${mediaName} should not be empty`);
    }
  }
});
