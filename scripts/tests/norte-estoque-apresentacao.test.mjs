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
  assert.match(labelScene, /paperRevealHeight/);
  assert.match(labelScene, /overflow:\s*'hidden'/);
  assert.match(labelScene, /NORTE ESTOQUE/);
  assert.doesNotMatch(labelScene, /<Printer/);
  assert.doesNotMatch(labelScene, /transform:\s*`translateY\(\$\{labelY\}/);
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
