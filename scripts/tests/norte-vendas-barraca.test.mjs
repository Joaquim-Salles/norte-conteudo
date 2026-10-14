import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync, readFileSync} from 'node:fs';

const root = readFileSync(new URL('../../src/Root.tsx', import.meta.url), 'utf8');
const templateUrl = new URL('../../src/templates/NorteVendasBarracaPraia.tsx', import.meta.url);
const copyUrl = new URL('../../conteudo ntb/02-carrosseis/Norte Vendas - Barraca de Praia/COPY.md', import.meta.url);
const template = existsSync(templateUrl) ? readFileSync(templateUrl, 'utf8') : '';
const copy = existsSync(copyUrl) ? readFileSync(copyUrl, 'utf8') : '';

test('registers eight slides, keeps the cover static, and animates the receipt slide', () => {
  for (const id of ['NorteVendasBarraca01', 'NorteVendasBarraca02', 'NorteVendasBarraca03', 'NorteVendasBarraca04', 'NorteVendasBarraca05', 'NorteVendasBarraca06', 'NorteVendasBarraca07', 'NorteVendasBarraca08']) {
    assert.match(root, new RegExp(`<Still\\s+id="${id}"`), `${id} should be registered`);
  }
  assert.doesNotMatch(root, /NorteVendasBarracaAnimada01/, 'the cover should not have an animation export');
  for (const id of ['NorteVendasBarracaAnimada02', 'NorteVendasBarracaAnimada03', 'NorteVendasBarracaAnimada04', 'NorteVendasBarracaAnimada06', 'NorteVendasBarracaAnimada07']) {
    const composition = root.match(new RegExp(`<Composition\\s+id="${id}"[^>]*>`));
    assert.ok(composition, `${id} should be registered`);
    assert.match(composition[0], /durationInFrames=\{90\}/, 'video should last three seconds');
  }
});

test('keeps the approved hook and grounds the beach-stand copy in confirmed Norte Vendas features', () => {
  assert.ok(copy, 'copy file should exist');
  assert.match(copy, /Dono de barraca, seus pedidos chegam direto à cozinha\?/);
  assert.match(copy, /(cozinha.*online|online.*cozinha)/i);
  assert.match(copy, /histórico por operador/i);
  assert.match(copy, /Norte Vendas/);
  assert.match(copy, /nota fiscal|NFC-e/i);
  assert.match(copy, /Slide 8\s*\|\s*Fechamento/i);
  assert.doesNotMatch(copy, /vende mais|elimina erros|aumenta as vendas/i);
});

test('uses an animated table-to-comanda scene with the complete approved slide-two copy', () => {
  assert.ok(template, 'template should exist');
  const normalizedTemplate = template.replace(/<br\s*\/?>/g, ' ');
  assert.match(normalizedTemplate, /O atendimento acontece por toda\s+a barraca\. O pedido não precisa se perder\./);
  assert.match(template, /Enquanto a equipe circula entre clientes e mesas, os pedidos registrados no Norte Vendas seguem pelo fluxo online até quem prepara\./);
  assert.match(template, /NorteVendasBarraca02Animada/);
  assert.doesNotMatch(template, /norte-vendas-barraca-celular\.png/);
  assert.match(root, /<Composition\s+id="NorteVendasBarracaAnimada02"[^>]*durationInFrames=\{90\}/);
});

test('uses official Norte Vendas screens for the kitchen flow and manager visibility', () => {
  assert.ok(template, 'template should exist');
  assert.match(template, /08-recursos\/telas-oficiais\/vendas\/d-mesas\.png/);
  assert.match(template, /08-recursos\/telas-oficiais\/vendas\/d-dashboard\.png/);
  assert.match(template, /norte-vendas-barraca-operacao\.png/);
  assert.match(template, /ReceiptPrintScene/);
  assert.match(template, /NFC-e/);
  assert.doesNotMatch(template, /COVER_PHOTO/);
  for (const name of ['norte-vendas-barraca-capa.png', 'norte-vendas-barraca-operacao.png']) {
    assert.ok(existsSync(new URL(`../../public/brand-kit/08-recursos/fotos-reais/${name}`, import.meta.url)), `${name} should be available to Remotion`);
  }
  assert.match(template, /useCurrentFrame/);
  assert.match(template, /NorteVendasBarraca/);
});
