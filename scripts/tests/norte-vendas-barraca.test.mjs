import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync, readFileSync} from 'node:fs';
import {screenProgress, textEntrance} from '../../src/lib/postMotion.mjs';

const root = readFileSync(new URL('../../src/Root.tsx', import.meta.url), 'utf8');
const templateUrl = new URL('../../src/templates/NorteVendasBarracaPraia.tsx', import.meta.url);
const copyUrl = new URL('../../conteudo ntb/02-carrosseis/Norte Vendas - Barraca de Praia/COPY.md', import.meta.url);
const template = existsSync(templateUrl) ? readFileSync(templateUrl, 'utf8') : '';
const copy = existsSync(copyUrl) ? readFileSync(copyUrl, 'utf8') : '';

test('registers eight slides, keeps the cover static, and animates product slides for three seconds', () => {
  for (const id of ['NorteVendasBarraca01', 'NorteVendasBarraca02', 'NorteVendasBarraca03', 'NorteVendasBarraca04', 'NorteVendasBarraca05', 'NorteVendasBarraca06', 'NorteVendasBarraca07', 'NorteVendasBarraca08']) {
    assert.match(root, new RegExp(`<Still\\s+id="${id}"`), `${id} should be registered`);
  }
  assert.doesNotMatch(root, /NorteVendasBarracaAnimada01/);
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

test('uses the official desktop screen in the entering laptop on slide two', () => {
  assert.ok(template, 'template should exist');
  const normalizedTemplate = template.replace(/<br\s*\/?>/g, ' ');
  assert.match(normalizedTemplate, /O atendimento acontece por toda\s+a barraca\. O pedido não precisa se perder\./);
  assert.match(template, /Enquanto a equipe circula entre clientes e mesas, os pedidos registrados no Norte Vendas seguem pelo fluxo online até quem prepara\./);
  assert.match(template, /NorteVendasBarraca02Animada/);
  assert.match(template, /<LaptopFrame width=\{850\} screenHeight=\{516\} progress=\{reveal\}>/);
  assert.match(template, /<Img src=\{SCREEN_TABLES\}[^>]*objectFit: 'cover'/);
  assert.doesNotMatch(template, /Pedido online/);
  assert.match(template, /DeviceEntrance[^\n]*variant="rise"/);
  assert.match(root, /<Composition\s+id="NorteVendasBarracaAnimada02"[^>]*durationInFrames=\{90\}/);
});

test('reveals official Norte Vendas screens inside illustrated notebook frames', () => {
  assert.ok(template, 'template should exist');
  assert.match(template, /08-recursos\/telas-oficiais\/vendas\/d-mesas\.png/);
  assert.match(template, /08-recursos\/telas-oficiais\/vendas\/d-dashboard\.png/);
  assert.match(template, /norte-vendas-barraca-operacao\.png/);
  assert.match(template, /ReceiptPrintScene/);
  assert.match(template, /NFC-e/);
  assert.match(template, /<LaptopFrame width=\{850\} screenHeight=\{516\} progress=\{reveal\}>/);
  assert.doesNotMatch(template, /COVER_PHOTO/);
  for (const name of ['norte-vendas-barraca-capa.png', 'norte-vendas-barraca-operacao.png']) {
    assert.ok(existsSync(new URL(`../../public/brand-kit/08-recursos/fotos-reais/${name}`, import.meta.url)), `${name} should be available to Remotion`);
  }
  assert.match(template, /useCurrentFrame/);
  assert.match(template, /NorteVendasBarraca/);
});

test('pairs the official desktop screen with the official mobile screen on slide three', () => {
  assert.match(template, /08-recursos\/telas-oficiais\/vendas\/m-g-mesas\.png/);
  assert.match(template, /PhoneFrame/);
  assert.match(template, /DeviceEntrance[^\n]*variant="left"/);
  assert.match(template, /DeviceEntrance[^\n]*variant="right"/);
});

test('animates the full notebook device with distinct entrances rather than only revealing its screen', () => {
  for (const variant of ['rise', 'left', 'right', 'scale']) {
    assert.match(template, new RegExp(`variant="${variant}"`));
  }
  assert.match(template, /transform: `translate3d\(/);
});

test('animates text with a short, subtle entrance that settles before the 3-second post ends', () => {
  assert.deepEqual(textEntrance(0, 0, 12), {opacity: 0, translateY: 18});
  assert.deepEqual(textEntrance(6, 0, 12), {opacity: 0.5, translateY: 9});
  assert.deepEqual(textEntrance(12, 0, 12), {opacity: 1, translateY: 0});
  assert.deepEqual(textEntrance(89, 0, 12), {opacity: 1, translateY: 0});
});

test('reveals the screen UI progressively without changing its final size', () => {
  assert.equal(screenProgress(0, 8, 48), 0);
  assert.equal(screenProgress(28, 8, 48), 0.5);
  assert.equal(screenProgress(48, 8, 48), 1);
  assert.equal(screenProgress(89, 8, 48), 1);
});

test('centers the kitchen route line on the card midpoint', () => {
  assert.match(template, /const routeY = 88/);
  assert.match(template, /M290 \$\{routeY\}H618/);
  assert.match(template, /cx="290" cy=\{routeY\}/);
  assert.match(template, /cx="618" cy=\{routeY\}/);
});

test('pairs an actual Norte Vendas screen with a downward NTB example receipt', () => {
  assert.match(template, /<LaptopFrame width=\{590\} screenHeight=\{354\} progress=\{reveal\}>/);
  assert.match(template, /<Img src=\{SCREEN_TABLES\}/);
  assert.match(template, /NTB/);
  assert.match(template, /ticketHeight\s*=\s*progress\s*\*\s*348/);
  assert.match(template, /DANFE NFC-e • EXEMPLO/);
  assert.match(template, /QR DE EXEMPLO • DADOS FICTÍCIOS/);
});

test('keeps the cover free of a required animation composition', () => {
  assert.match(template, /export const NorteVendasBarraca01: React\.FC = CoverScene/);
  assert.doesNotMatch(template, /NorteVendasBarraca01Animada/);
  assert.doesNotMatch(root, /NorteVendasBarracaAnimada01/);
});
