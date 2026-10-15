import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync, readFileSync} from 'node:fs';
import {textEntrance} from '../../src/lib/postMotion.mjs';

const root = readFileSync(new URL('../../src/Root.tsx', import.meta.url), 'utf8');
const templateUrl = new URL('../../src/templates/NorteVendasBarracaPraia.tsx', import.meta.url);
const copyUrl = new URL('../../conteudo ntb/02-carrosseis/Norte Vendas - Barraca de Praia/COPY.md', import.meta.url);
const template = existsSync(templateUrl) ? readFileSync(templateUrl, 'utf8') : '';
const copy = existsSync(copyUrl) ? readFileSync(copyUrl, 'utf8') : '';

test('registers eight slides and keeps only the approved animated product slides', () => {
  for (const id of ['NorteVendasBarraca01', 'NorteVendasBarraca02', 'NorteVendasBarraca03', 'NorteVendasBarraca04', 'NorteVendasBarraca05', 'NorteVendasBarraca06', 'NorteVendasBarraca07', 'NorteVendasBarraca08']) {
    assert.match(root, new RegExp(`<Still\\s+id="${id}"`), `${id} should be registered`);
  }
  assert.doesNotMatch(root, /NorteVendasBarracaAnimada01/);
  assert.doesNotMatch(root, /NorteVendasBarracaAnimada02/);
  for (const id of ['NorteVendasBarracaAnimada03', 'NorteVendasBarracaAnimada04', 'NorteVendasBarracaAnimada06', 'NorteVendasBarracaAnimada07']) {
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

test('replaces the cover icon connector with a static beach-operation illustration', () => {
  const cover = template.split('const CoverScene')[1]?.split('const MobileRoutineScene')[0] ?? '';
  assert.match(cover, /<BeachStandHero\s*\/>/);
  assert.doesNotMatch(cover, /<Store\b|<ChefHat\b/);
});

test('keeps slide two fully static, including its text and exported media', () => {
  assert.ok(template, 'template should exist');
  const slideTwo = template.split('const MobileRoutineScene')[1]?.split('const TablesScene')[0] ?? '';
  const slideTwoAnimation = new URL('../../conteudo ntb/02-carrosseis/Norte Vendas - Barraca de Praia/02 - Atendimento e comanda animado.mp4', import.meta.url);
  const normalizedTemplate = template.replace(/<br\s*\/?>/g, ' ');
  assert.match(normalizedTemplate, /O atendimento acontece por toda\s+a barraca\. O pedido não precisa se perder\./);
  assert.match(slideTwo, /Enquanto a equipe circula entre clientes e mesas, os pedidos registrados no Norte Vendas seguem pelo fluxo online até quem prepara\./);
  assert.match(slideTwo, /<BeachAreaMap\s*\/>/);
  assert.match(slideTwo, /Background tone="dark"/);
  assert.match(slideTwo, /PageTop n=\{2\} tone="dark"/);
  assert.doesNotMatch(slideTwo, /LaptopFrame|SCREEN_TABLES|DeviceEntrance|PhoneFrame/);
  assert.doesNotMatch(slideTwo, /textEntrance|frame=\{frame\}|translateY/);
  assert.doesNotMatch(root, /NorteVendasBarraca02Animada|NorteVendasBarracaAnimada02/);
  assert.equal(existsSync(slideTwoAnimation), false, 'the preview folder should not contain an animated version of this slide');
});

test('shows the beach seating and order route without a second ambiguous stall', () => {
  const slideTwo = template.split('const MobileRoutineScene')[1]?.split('const TablesScene')[0] ?? '';
  const map = template.split('const BeachAreaMap')[1]?.split('const CoverScene')[0] ?? '';
  assert.doesNotMatch(map, /overhead-beach-stall|service-counter|order-window/);
  assert.match(map, /data-scene-object="kitchen-route-endpoint"/);
  assert.match(map, /data-scene-object="kitchen-prep-counter"/);
  assert.match(map, /data-scene-object="kitchen-cooktop"/);
  assert.match(map, /data-scene-object="kitchen-order-pass"/);
  assert.match(map, /data-scene-object="beach-umbrella" data-zone="middle-sand"/);
  const tables = map.match(/\{x:\s*\d+,\s*y:\s*\d+,\s*r:\s*\d+\}/g) ?? [];
  assert.equal(tables.length, 4);
  assert.ok(tables.every((table) => Number(table.match(/y:\s*(\d+)/)?.[1]) >= 160));
  assert.match(slideTwo, /<BeachAreaMap\s*\/>/);
});

test('keeps the cover stand graphic and recognizable beach loungers without extra roof detail', () => {
  const cover = template.split('const BeachStandHero')[1]?.split('const BeachAreaMap')[0] ?? '';
  assert.match(cover, /data-scene-object="beach-stall-front"/);
  assert.match(cover, /data-roof="plain-awning"/);
  assert.doesNotMatch(cover, /data-roof="striped-awning"|data-roof-detail=/);
  assert.equal((cover.match(/data-furniture="sun-lounger"/g) ?? []).length, 2);
  assert.doesNotMatch(cover, /data-scene-object="beach-chair"/);
});

test('changes slide six background to brand dark for a less repetitive carousel rhythm', () => {
  const slideSix = template.split('const ManagerScene')[1]?.split('const ReceiptPrintScene')[0] ?? '';
  assert.match(slideSix, /Background tone="dark"/);
  assert.match(slideSix, /PageTop n=\{6\} tone="dark"/);
  assert.match(slideSix, /Eyebrow tone="dark"/);
  assert.match(slideSix, /Title tone="dark"/);
  assert.match(slideSix, /Support tone="dark"/);
});

test('keeps official Norte Vendas screens static inside illustrated notebook frames', () => {
  assert.ok(template, 'template should exist');
  assert.match(template, /08-recursos\/telas-oficiais\/vendas\/d-mesas\.png/);
  assert.match(template, /08-recursos\/telas-oficiais\/vendas\/d-dashboard\.png/);
  assert.match(template, /norte-vendas-barraca-operacao\.png/);
  assert.match(template, /ReceiptPrintScene/);
  assert.match(template, /NFC-e/);
  assert.match(template, /<LaptopFrame width=\{850\} screenHeight=\{516\}>/);
  assert.doesNotMatch(template, /clipPath: `inset\(0 \$\{\(1 - progress\)/);
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
  assert.match(template, /<PhoneFrame\s*\/>/);
  assert.doesNotMatch(template, /<PhoneFrame progress=/);
});

test('all laptop and phone devices enter from below without animating their screens', () => {
  assert.doesNotMatch(template, /variant=/);
  assert.equal([...template.matchAll(/<DeviceEntrance\b/g)].length, 4, 'the remaining laptop and phone illustrations should animate as devices');
  assert.match(template, /const y = 90 \* \(1 - progress\)/);
  assert.doesNotMatch(template, /focus|working|history/);
  assert.match(template, /transform: `translate3d\(/);
});

test('keeps the receipt printer fixed while the NTB receipt prints downward', () => {
  assert.match(template, /ticketHeight\s*=\s*progress\s*\*\s*348/);
  assert.match(template, /position: 'absolute', left: 744, top: 704, width: 232, height: 426/);
  assert.doesNotMatch(template, /DeviceEntrance[^\n]*style=\{\{position: 'absolute', left: 744/);
});

test('animates text with a short, subtle entrance that settles before the 3-second post ends', () => {
  assert.deepEqual(textEntrance(0, 0, 12), {opacity: 0, translateY: 18});
  assert.deepEqual(textEntrance(6, 0, 12), {opacity: 0.5, translateY: 9});
  assert.deepEqual(textEntrance(12, 0, 12), {opacity: 1, translateY: 0});
  assert.deepEqual(textEntrance(89, 0, 12), {opacity: 1, translateY: 0});
});

test('centers the kitchen route line on the card midpoint', () => {
  assert.match(template, /const routeY = 88/);
  assert.match(template, /M290 \$\{routeY\}H618/);
  assert.match(template, /cx="290" cy=\{routeY\}/);
  assert.match(template, /cx="618" cy=\{routeY\}/);
});

test('pairs an actual Norte Vendas screen with a downward NTB example receipt', () => {
  assert.match(template, /<LaptopFrame width=\{590\} screenHeight=\{354\}>/);
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
