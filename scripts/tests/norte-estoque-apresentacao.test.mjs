import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync, readdirSync, statSync} from 'node:fs';
import path from 'node:path';
import {groupMediaFiles} from '../lib/carousel-preview.mjs';

const carouselPath = path.resolve('conteudo ntb/02-carrosseis/Norte Estoque - Estoque sob controle');

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
