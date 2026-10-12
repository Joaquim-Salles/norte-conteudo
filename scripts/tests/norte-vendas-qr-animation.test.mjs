import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const root = readFileSync(new URL('../../src/Root.tsx', import.meta.url), 'utf8');
const template = readFileSync(new URL('../../src/templates/NorteVendasPost.tsx', import.meta.url), 'utf8');

test('the QR carousel exports its animated slides at 1080x1350, 30 fps, and three seconds', () => {
  for (const id of ['NorteVendasQRAnimada03', 'NorteVendasQRAnimada06']) {
    const composition = root.match(new RegExp(`<Composition\\s+id="${id}"[^>]*>`));
    assert.ok(composition, `${id} should be registered`);
    assert.match(composition[0], /durationInFrames=\{90\}/);
    assert.match(composition[0], /fps=\{30\}/);
  }
});

test('the QR carousel includes real Norte Vendas screens and runs through seven slides', () => {
  for (const id of [
    'NorteVendasQR01', 'NorteVendasQR02', 'NorteVendasQR03', 'NorteVendasQR04',
    'NorteVendasQR05', 'NorteVendasQR06', 'NorteVendasQR07',
  ]) {
    assert.match(root, new RegExp(`<Still\\s+id="${id}"`), `${id} should be registered`);
  }
  assert.match(template, /08-recursos\/telas-oficiais\/vendas\/d-dashboard\.png/);
  assert.match(template, /08-recursos\/telas-oficiais\/vendas\/d-cardapio\.png/);
  assert.match(template, /NorteVendasQRMesas/);
  assert.match(template, /NorteVendasQRCardapio/);
});

test('the QR slide motion uses continuous receipt movement, not quantized printer steps', () => {
  assert.doesNotMatch(template, /PRINT_STEPS|Math\.floor\(raw\)/);
  assert.match(template, /PRINT_START\s*=\s*\d+/);
  assert.match(template, /PRINT_END\s*=\s*\d+/);
  assert.match(template, /interpolate\(f,\s*\[PRINT_START,\s*PRINT_END\]/);
});

test('slide three has a visible interaction beat late in the three-second clip', () => {
  assert.match(template, /interpolate\(f,\s*\[\d+,\s*\d+,\s*\d+,\s*\d+\]/);
  assert.match(template, /strokeDashoffset/);
  assert.match(template, /pedidoProgress/);
});
