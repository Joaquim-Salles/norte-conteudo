import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync, readFileSync, readdirSync} from 'node:fs';
import path from 'node:path';
import {groupMediaFiles} from '../lib/carousel-preview.mjs';

const root = readFileSync(new URL('../../src/Root.tsx', import.meta.url), 'utf8');
const templatePath = new URL('../../src/templates/NorteEstoqueCarousel.tsx', import.meta.url);
const carouselPath = path.resolve('conteudo ntb/02-carrosseis/Norte Estoque - Inventario e movimentacao');

test('the selected Norte Estoque carousel registers seven slides with motion on inventory, QR scan, registration, and transfer', () => {
  for (const id of ['NorteEstoqueQR01', 'NorteEstoqueQR02', 'NorteEstoqueQR03', 'NorteEstoqueQR04', 'NorteEstoqueQR05', 'NorteEstoqueQR06', 'NorteEstoqueQR07']) {
    assert.match(root, new RegExp(`<Still\\s+id="${id}"`), `${id} should be registered`);
  }

  for (const id of ['NorteEstoqueQRAnimada02', 'NorteEstoqueQRAnimada03', 'NorteEstoqueQRAnimada05', 'NorteEstoqueQRAnimada06']) {
    const composition = root.match(new RegExp(`<Composition\\s+id="${id}"[^>]*>`));
    assert.ok(composition, `${id} should be registered`);
    assert.match(composition[0], /durationInFrames=\{90\}/, `${id} should last 3 seconds`);
    assert.match(composition[0], /fps=\{30\}/, `${id} should be 30 fps`);
  }
  const registeredStockAnimations = [...root.matchAll(/<Composition\s+id="NorteEstoqueQRAnimada(\d+)"/g)].map((match) => Number(match[1]));
  assert.deepEqual(registeredStockAnimations, [2, 3, 5, 6], 'the inventory screen, QR scan, registration screen, and transfer should be animated');
});

test('the cover uses the approved stock-count pain hook', () => {
  const template = readFileSync(templatePath, 'utf8');
  assert.match(template, /Quanto tempo sua equipe perde tentando conferir o estoque\?/);
});

test('slide four shows an easy-to-read lot and expiry label on a warm stock package', () => {
  const template = readFileSync(templatePath, 'utf8');
  const etiqueta = template.match(/const EtiquetaScene:[\s\S]*?(?=export const NorteEstoqueQR04)/);
  assert.ok(etiqueta, 'the label slide should exist');
  assert.match(etiqueta[0], /data-illustration="lot-expiry-label"/, 'the label should be the clear focus');
  assert.match(etiqueta[0], /data-label-row="lot"/);
  assert.match(etiqueta[0], /data-label-row="expiry"/);
  assert.match(etiqueta[0], /<table/);
  assert.doesNotMatch(etiqueta[0], /#CBD5D8|#D8DFE0|#B9C8CB/, 'the label should not sit on an ambiguous gray tub');
});

test('slide five animates the inventory record into view on a notebook', () => {
  const template = readFileSync(templatePath, 'utf8');
  const registro = template.match(/const RegistroScene:[\s\S]*?(?=export const NorteEstoqueQR05)/);
  assert.ok(registro, 'the inventory registration slide should exist');
  assert.match(registro[0], /data-illustration="inventory-notebook"/);
  assert.match(registro[0], /<LaptopFrame/);
  assert.match(registro[0], /TELA_INVENTARIO/);
  assert.match(registro[0], /data-focus-target="inventory-row"/);
  assert.match(template, /NorteEstoqueQR05Animada/);
  assert.match(registro[0], /Depois da leitura, o produto aparece no inventário/);
});

test('slide six animates a stock transfer between two labeled locations without a system screen', () => {
  const template = readFileSync(templatePath, 'utf8');
  const transferencias = template.match(/const TransferenciasScene:[\s\S]*?(?=export const NorteEstoqueQR06)/);
  assert.ok(transferencias, 'the transfer slide should exist');
  assert.match(transferencias[0], /data-illustration="stock-transfer"/, 'the animated illustration should identify its purpose');
  assert.doesNotMatch(transferencias[0], /<Screen|TELA_TRANSFERENCIAS/, 'slide six should not repeat a system screen');
});

test('the QR scan animation shows a food item being scanned by a phone', () => {
  const template = readFileSync(templatePath, 'utf8');
  const composition = root.match(/<Composition id="NorteEstoqueQRAnimada03"[^>]*>/);
  assert.ok(composition, 'the QR scan animation should be registered');
  assert.match(composition[0], /durationInFrames=\{90\}/);
  assert.match(composition[0], /fps=\{30\}/);
  assert.match(template, /export const NorteEstoqueQR03Animada/);
  assert.match(template, /const ScanScene: React\.FC/);
  assert.match(template, /LEITURA CONCLUÍDA/);
  assert.match(template, /QR do alimento/i);
  assert.match(template, /scanLine/);
});

test('the food package depicts a recognizable tomato with its calyx and stem', () => {
  const template = readFileSync(templatePath, 'utf8');
  assert.match(template, /data-food="tomato"/);
  assert.match(template, /data-part="tomato-body"/);
  assert.match(template, /data-part="tomato-calyx"/);
  assert.match(template, /data-part="tomato-stem"/);
});

test('the inventory screen highlights one real row and the tomato label has no generic stock wording', () => {
  const template = readFileSync(templatePath, 'utf8');
  const inventory = template.match(/const InventarioScene:[\s\S]*?(?=export const)/);
  assert.ok(inventory, 'the online inventory slide should exist');
  assert.match(inventory[0], /data-focus-target="inventory-row"/, 'the inventory screen should identify its highlighted row');
  assert.match(inventory[0], /height: 30/, 'the focus outline should fit one inventory row');
  assert.match(template, />TOMATE<\/div>/, 'the food label should name only the tomato');
  assert.doesNotMatch(template, /TOMATE · ITEM DE ESTOQUE/);
});

test('the selected carousel exports seven slides and animates only slides 2, 3, 5, and 6', () => {
  assert.ok(existsSync(carouselPath));
  const slides = groupMediaFiles(readdirSync(carouselPath));
  assert.equal(slides.length, 7);
  assert.deepEqual(slides.map(({number}) => number), [1, 2, 3, 4, 5, 6, 7]);
  assert.deepEqual(slides.filter(({animation}) => animation).map(({number}) => number), [2, 3, 5, 6]);
});

test('the rejected Estoque sob controle carousel is removed while the selected carousel remains', () => {
  const legacyPaths = [
    path.resolve('conteudo ntb/02-carrosseis/Norte Estoque - Estoque sob controle'),
    path.resolve('src/templates/NorteEstoqueApresentacao.tsx'),
    path.resolve('src/NorteEstoqueApresentacaoEntry.tsx'),
    path.resolve('scripts/render-norte-estoque-apresentacao.mjs'),
    path.resolve('scripts/tests/norte-estoque-apresentacao.test.mjs'),
  ];
  assert.ok(legacyPaths.every((legacyPath) => !existsSync(legacyPath)), 'the rejected carousel and its generator should be removed');
  assert.ok(existsSync(carouselPath), 'the selected carousel must remain intact');
});

test('the carousel uses the official Estoque color, real kit screens, and approved feature claims', () => {
  assert.ok(existsSync(templatePath), 'the Norte Estoque carousel template should exist');
  const template = readFileSync(templatePath, 'utf8');

  assert.match(template, /<Produto id="estoque">/, 'each slide should use the product brand color');
  assert.match(template, /norte-estoque_horizontal_branco_transparente\.png/, 'the official product logo should be used');
  assert.match(template, /08-recursos\/telas-oficiais\/estoque\//, 'screens should come from the official brand kit');
  for (const phrase of ['inventário com QR Code', 'etiquetas com lote e validade', 'transferências em massa entre locais', 'QR do alimento']) {
    assert.ok(template.toLowerCase().includes(phrase.toLowerCase()), `the post should include the confirmed claim: ${phrase}`);
  }
  assert.doesNotMatch(template, /\bomie\b/i, 'the Norte Estoque post must not mention Omie');
  assert.doesNotMatch(template, /\b(?:76|62|82)%\b/, 'unvalidated performance percentages should not be published');
});

test('every internal slide identifies Norte Estoque and support copy clears the two-line headlines', () => {
  const template = readFileSync(templatePath, 'utf8');
  for (const tone of ['light', 'dark', 'product']) {
    assert.ok(template.includes(`<Foot tone="${tone}" label="Norte Estoque"`), `${tone} slides should carry the correct product footer`);
  }
  assert.match(template, /<Foot tone="dark" last label="Norte Estoque"/);
  assert.match(template, /01\/07/);
  assert.match(template, /<Support tone="product" top=\{650\}/, 'cover support should clear its two-line hook');
  assert.match(template, /<Support tone="dark" top=\{430\}/, 'the label slide support should clear its headline');
  assert.match(template, /<Support tone="product" top=\{430\}/, 'the transfer slide support should clear its headline');
});
