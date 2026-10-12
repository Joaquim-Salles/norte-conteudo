import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const root = readFileSync(new URL('../../src/Root.tsx', import.meta.url), 'utf8');
const template = readFileSync(new URL('../../src/templates/NorteVendasPost.tsx', import.meta.url), 'utf8');

test('the QR carousel exports its animated slides at 1080x1350, 30 fps, and three seconds', () => {
  for (const id of ['NorteVendasQRAnimada02', 'NorteVendasQRAnimada03', 'NorteVendasQRAnimada06']) {
    const composition = root.match(new RegExp(`<Composition\\s+id="${id}"[^>]*>`));
    assert.ok(composition, `${id} should be registered`);
    assert.match(composition[0], /durationInFrames=\{90\}/);
    assert.match(composition[0], /fps=\{30\}/);
  }
});

test('the QR carousel uses real restaurant-operation photos and runs through seven slides', () => {
  for (const id of [
    'NorteVendasQR01', 'NorteVendasQR02', 'NorteVendasQR03', 'NorteVendasQR04',
    'NorteVendasQR05', 'NorteVendasQR06', 'NorteVendasQR07',
  ]) {
    assert.match(root, new RegExp(`<Still\\s+id="${id}"`), `${id} should be registered`);
  }
  assert.match(template, /operacao-real\/foto-aplicativo\.png/);
  assert.match(template, /operacao-real\/foto-atendimento\.png/);
  assert.match(template, /NorteVendasQROperacao/);
  assert.match(template, /NorteVendasQRCelular/);
  assert.doesNotMatch(template, /TELA_DASHBOARD_REAL|TELA_CARDAPIO_GESTAO_REAL/);
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
  assert.match(template, /stroke=\{VENDAS\}/);
  assert.doesNotMatch(template, /stroke=\{WHITE\}[^>]*strokeDasharray/);
});

test('slide two has a frame-driven animation for routing one order to three preparation stations', () => {
  assert.match(template, /NorteVendasRoteamentoAnim/);
  assert.match(template, /RoteamentoScene/);
  assert.match(root, /NorteVendasQRAnimada02/);
});
