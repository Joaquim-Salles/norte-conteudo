import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync, readFileSync, readdirSync} from 'node:fs';
import path from 'node:path';
import {groupMediaFiles} from '../lib/carousel-preview.mjs';

const carouselPath = path.resolve('conteudo ntb/02-carrosseis/Norte Estoque - 3 sinais');

test('the Norte Estoque diagnostic post exports seven slides with only the count and transfer scenes animated', () => {
  assert.ok(existsSync(carouselPath), 'the new diagnostic carousel should be exported locally');
  const slides = groupMediaFiles(readdirSync(carouselPath));
  assert.equal(slides.length, 7);
  assert.deepEqual(slides.map(({number}) => number), [1, 2, 3, 4, 5, 6, 7]);
  assert.deepEqual(slides.filter(({animation}) => animation).map(({number}) => number), [3, 4]);
});

test('the post copy covers the three approved stock-control symptoms for a broad operations audience', () => {
  const copy = readFileSync(path.join(carouselPath, 'COPY.md'), 'utf8');
  assert.match(copy, /3 sinais de que seu estoque está no improviso/i);
  assert.match(copy, /confia no saldo.*contar/i);
  assert.match(copy, /contagem.*adiada.*mutirão/i);
  assert.match(copy, /produto muda de local.*registro/i);
  assert.match(copy, /Norte Estoque/i);
  assert.doesNotMatch(copy, /barraca de praia|restaurante/i);
});

test('the cover and replenishment slide use distinct visual compositions instead of repeating card panels', () => {
  const template = readFileSync(path.resolve('src/templates/NorteEstoqueSinais.tsx'), 'utf8');
  assert.match(template, /data-illustration="stock-signal-shelf"/);
  assert.doesNotMatch(template, /data-illustration="stock-overview"/);
  assert.match(template, /data-illustration="replenishment-decision-path"/);
  assert.doesNotMatch(template, /DÚVIDAS NA ROTINA/);
});

test('the cover uses clear, dimensional cartons without unexplained number markers', () => {
  const template = readFileSync(path.resolve('src/templates/NorteEstoqueSinais.tsx'), 'utf8');
  assert.match(template, /const Carton/);
  assert.match(template, /data-carton="shipping-box"/);
  assert.match(template, /<Carton x=/);
  assert.doesNotMatch(template, /const StockItem|data-item=/);
  assert.doesNotMatch(template, /<text\b/);
});

test('the carousel description adds context instead of repeating the three slide headlines', () => {
  const caption = readFileSync(path.join(carouselPath, 'LEGENDA.md'), 'utf8');
  assert.match(caption, /Dê um norte ao seu negócio/i);
  assert.doesNotMatch(caption, /3 sinais de que seu estoque está no improviso/i);
  assert.doesNotMatch(caption, /A contagem sempre fica para depois/i);
});
