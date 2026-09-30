import React from 'react';
import {AbsoluteFill, Img, interpolate, useCurrentFrame} from 'remotion';
import {Receipt, Ban, Archive} from 'lucide-react';
import {ensurePostLoaded, FONT_POST as SANS, FONT_POST_MONO as MONO} from '../lib/fonts';
import {
  A,
  Background,
  Chip,
  Eyebrow,
  FRAME,
  Foot,
  Fx,
  LAV,
  LOGO_NEGOCIOS_AZUL,
  LOGO_NEGOCIOS_BRANCO,
  NAVY,
  PAD,
  PAPER,
  Paper,
  S,
  Support,
  TEXT2,
  THERMAL,
  TOTAL,
  Title,
  Tone,
  Top,
  VENDAS,
  WHITE,
  ease,
  fg,
  kit,
  mute,
  zig,
} from '../lib/NortePost';

/**
 * Carrossel "Norte Vendas" (5 slides). Blocos compartilhados vêm de src/lib/NortePost.tsx.
 * Texto só com fatos do site (sections/vendas). Dado de cupom/ticket é sempre "exemplo".
 */

const VENDAS_CLARA = '#8D92F0';
const LOGO_VENDAS_BRANCO = kit('01-logos/norte-vendas/horizontal/norte-vendas_horizontal_branco_transparente.png');
const LOGO_VENDAS_COR = kit('01-logos/norte-vendas/horizontal/norte-vendas_horizontal_vendas_transparente.png');
const TELA_MESAS = kit('08-recursos/telas-oficiais/vendas/d-mesas.png');
const TELA_CARDAPIO = kit('08-recursos/telas-oficiais/vendas/m-cliente-cardapio.png');

/* ---------- 1 · capa (cor do produto) ---------- */
export const NorteVendasCapa: React.FC = () => {
  ensurePostLoaded();
  return (
    <AbsoluteFill>
      <Background tone="product" id="nv-grid-1" />
      <div style={{position: 'absolute', left: PAD, top: 92}}>
        <Img src={LOGO_VENDAS_BRANCO} style={{height: 150, width: 'auto'}} />
      </div>
      <div style={{position: 'absolute', right: PAD, top: 96, fontFamily: MONO, fontSize: 22, color: mute('product')}}>01/{String(TOTAL).padStart(2, '0')}</div>
      <Eyebrow tone="product" top={470}>Para restaurante, bar e lanchonete</Eyebrow>
      <Title tone="product" top={528} size={92}>
        Do QR code na mesa ao caixa fechado.
      </Title>
      <Support tone="product" top={800} width={820} size={30}>
        O cliente pede pelo celular, a cozinha recebe na hora, a conta se divide sozinha e o caixa fecha sem planilha.
      </Support>
      <div style={{position: 'absolute', left: PAD, right: PAD, top: 1010, display: 'flex', flexWrap: 'wrap', gap: 12}}>
        {['Cardápio no QR', 'Mesas e comandas', 'Cozinha', 'Caixa', 'Nota fiscal'].map((t) => (
          <Chip key={t} tone="product">{t}</Chip>
        ))}
      </div>
      <Foot tone="product" label="Norte para Negócios" />
    </AbsoluteFill>
  );
};

/* ---------- 2 · roteamento (papel quadriculado) ---------- */
const destinos = [
  {local: 'Cozinha', item: '1× Moqueca de peixe'},
  {local: 'Bar', item: '2× Caipirinha'},
  {local: 'Pizzaria', item: '1× Pizza meio a meio'},
];

export const NorteVendasRoteamento: React.FC = () => {
  ensurePostLoaded();
  const TICKET_W = 400;
  const TICKET_H = 150;
  const GAP = 26;
  const top0 = 720;
  const ticketX = 1080 - PAD - TICKET_W;
  const centerY = top0 + (TICKET_H * 3 + GAP * 2) / 2;
  const ys = destinos.map((_, i) => top0 + i * (TICKET_H + GAP) + TICKET_H / 2);
  const pedidoW = 330;
  const fromX = PAD + pedidoW;
  return (
    <AbsoluteFill>
      <Background tone="light" id="nv-grid-2" />
      <Top n={2} tone="light" />
      <Eyebrow tone="light" top={210}>Cozinha organizada</Eyebrow>
      <Title tone="light" top={262} size={84}>
        Um pedido, três destinos.
      </Title>
      <Support tone="light" top={470} width={880}>
        A mesa pede tudo de uma vez. Cada item sai impresso onde é preparado: prato na cozinha, drinque no bar, pizza na pizzaria.
      </Support>

      <svg width={1080} height={1350} style={{position: 'absolute', inset: 0}} fill="none">
        {ys.map((y, i) => (
          <path key={i} d={`M${fromX + 8} ${centerY} C ${fromX + 90} ${centerY}, ${ticketX - 90} ${y}, ${ticketX - 8} ${y}`} stroke={VENDAS} strokeWidth={3.5} strokeLinecap="round" />
        ))}
        <circle cx={fromX + 8} cy={centerY} r={7} fill={VENDAS} />
        {ys.map((y, i) => (
          <circle key={i} cx={ticketX - 8} cy={y} r={7} fill={VENDAS} />
        ))}
      </svg>

      <div style={{position: 'absolute', left: PAD, top: centerY - 150, width: pedidoW, transform: 'rotate(-1.2deg)'}}>
        <Paper width={pedidoW}>
          <div style={{padding: '30px 30px 8px'}}>
            <div style={{fontSize: 17, letterSpacing: 1.6, textTransform: 'uppercase', color: VENDAS, fontWeight: 700}}>Mesa 4 · pedido</div>
            <div style={{marginTop: 4, fontSize: 15, color: TEXT2}}>exemplo</div>
            <div style={{marginTop: 22, fontSize: 21, lineHeight: 1.75}}>
              <div>1× Moqueca de peixe</div>
              <div>2× Caipirinha</div>
              <div>1× Pizza meio a meio</div>
            </div>
          </div>
        </Paper>
      </div>

      {destinos.map((d, i) => (
        <div key={d.local} style={{position: 'absolute', left: ticketX, top: top0 + i * (TICKET_H + GAP), transform: `rotate(${[-1.4, 1, -0.8][i]}deg)`}}>
          <Paper width={TICKET_W}>
            <div style={{height: TICKET_H - 26, padding: '26px 30px 0'}}>
              <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 21, letterSpacing: 3, textTransform: 'uppercase', color: VENDAS}}>{d.local}</div>
              <div style={{marginTop: 6, fontSize: 15, color: TEXT2}}>Mesa 4 · exemplo</div>
              <div style={{marginTop: 14, fontFamily: SANS, fontWeight: 700, fontSize: 28, letterSpacing: -0.3}}>{d.item}</div>
            </div>
          </Paper>
        </div>
      ))}
      <Foot tone="light" />
    </AbsoluteFill>
  );
};

/* ---------- 3 · prova do produto (azul-noite) ---------- */
export const TelasScene: React.FC<{f?: number}> = ({f}) => {
  ensurePostLoaded();
  const lapW = 770;
  const lapScreenH = Math.round((lapW - 24) * (1800 / 2880));
  const pLap = S(f, 24, {damping: 18, stiffness: 80, mass: 0.9});
  const pPhone = S(f, 42, {damping: 15, stiffness: 90, mass: 0.8});
  const zoom = f === undefined ? 1 : 1 + 0.03 * Math.min(1, f / 300);
  const hl = f === undefined ? 0 : interpolate(f, [96, 108, 170, 184], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const pulse = f === undefined ? 0 : Math.sin((f - 96) / 7) * 0.006;
  return (
    <AbsoluteFill>
      <Background tone="dark" id="nv-grid-3" />
      <Top n={3} tone="dark" />
      <Eyebrow tone="dark" top={210}>Cardápio no QR · mesas e comandas</Eyebrow>
      <Title tone="dark" top={262} size={76}>
          O cliente pede pelo celular.
        </Title>
      <Support tone="dark" top={440} width={800} size={28}>
          O cardápio abre pelo QR code da mesa. No caixa, cada mesa aparece com o valor da comanda, e as livres ficam à mostra.
        </Support>

      <div style={{position: 'absolute', inset: 0, transform: `scale(${zoom})`, transformOrigin: '50% 75%'}}>
        {/* notebook */}
        <div style={{position: 'absolute', left: PAD, top: 660, width: lapW, opacity: Math.min(1, pLap * 1.6), transform: `translateY(${(1 - pLap) * 240}px)`, filter: 'drop-shadow(0 26px 34px rgba(0,0,0,.42))'}}>
          <div style={{background: FRAME, borderRadius: 18, padding: 12}}>
            <div style={{position: 'relative', height: lapScreenH, borderRadius: 8, overflow: 'hidden'}}>
              <Img src={TELA_MESAS} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'left top', display: 'block'}} />
              <div
                style={{
                  position: 'absolute', left: '19%', top: '17%', width: '60.5%', height: '28%', borderRadius: 14,
                  border: `3px solid ${VENDAS}`, boxShadow: '0 0 0 7px rgba(72,77,181,.22)', opacity: hl, transform: `scale(${1 + pulse})`,
                }}
              />
            </div>
          </div>
          <div style={{height: 16, margin: '0 -20px', background: 'linear-gradient(#c9cad6,#9fa1b3)', borderRadius: '0 0 22px 22px'}} />
        </div>

        {/* celular */}
        <div style={{position: 'absolute', right: PAD - 6, top: 720, width: 240, opacity: Math.min(1, pPhone * 1.6), transform: `translateY(${(1 - pPhone) * 330}px) rotate(${(1 - pPhone) * 4}deg)`, filter: 'drop-shadow(0 26px 34px rgba(0,0,0,.5))'}}>
          <div style={{background: FRAME, borderRadius: 46, padding: 10, border: '2px solid rgba(251,251,254,.12)'}}>
            <div style={{height: 240 * 2.02 - 20, borderRadius: 36, overflow: 'hidden', background: WHITE}}>
              <Img src={TELA_CARDAPIO} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'left top', display: 'block'}} />
            </div>
          </div>
        </div>
      </div>
      <Foot tone="dark" />
    </AbsoluteFill>
  );
};
export const NorteVendasTelas: React.FC = () => <TelasScene />;
export const NorteVendasTelasAnim: React.FC = () => <TelasScene f={useCurrentFrame()} />;

/* ---------- 4 · nota fiscal (cor do produto) ---------- */
const N = 25;
const qr = (() => {
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const inFinder = (x: number, y: number) => [[0, 0], [N - 7, 0], [0, N - 7]].some(([fx, fy]) => x >= fx && x < fx + 7 && y >= fy && y < fy + 7);
  const mods: string[] = [];
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) if (!inFinder(x, y) && rnd() > 0.52) mods.push(`M${x} ${y}h1v1h-1z`);
  const finders = [[0, 0], [N - 7, 0], [0, N - 7]].map(([x, y]) => `M${x} ${y}h7v7h-7zM${x + 1} ${y + 1}v5h5v-5zM${x + 2} ${y + 2}h3v3h-3z`);
  return {mods: mods.join(''), finders: finders.join('')};
})();

const nfCards = [
  {Icon: Receipt, t: 'Emite a NFC-e na hora', d: 'Quem fecha a conta emite a nota ali mesmo, sem abrir outro sistema.'},
  {Icon: Ban, t: 'Cancela pelo sistema', d: 'Saiu errada? Dentro do prazo, cancela ali mesmo.'},
  {Icon: Archive, t: 'O contador recebe tudo junto', d: 'Os XMLs do período saem num arquivo só.'},
];

const PRINT_START = 36;
const PRINT_END = 112;
const PRINT_STEPS = 14;

export const NotaFiscalScene: React.FC<{f?: number}> = ({f}) => {
  ensurePostLoaded();
  const CW = 420;
  const cx = 1080 - PAD - CW;
  const pPrinter = S(f, 8, {damping: 13, stiffness: 130});
  // o papel sai aos trancos: cada tranco é um avanço rápido seguido de pausa
  let prog = 1;
  let printing = false;
  if (f !== undefined) {
    const t = Math.min(1, Math.max(0, (f - PRINT_START) / (PRINT_END - PRINT_START)));
    const raw = t * PRINT_STEPS;
    const k = Math.floor(raw);
    prog = t >= 1 ? 1 : (k + Math.min(1, (raw - k) * 3.2)) / PRINT_STEPS;
    printing = t > 0 && t < 1;
  }
  const shake = printing && f !== undefined ? Math.sin(f * 2.4) * 1.6 : 0;
  const Line: React.FC<{a: string; b: string; strong?: boolean}> = ({a, b, strong}) => (
    <div style={{display: 'flex', justifyContent: 'space-between', fontSize: strong ? 20 : 17, fontWeight: strong ? 700 : 400, marginTop: 6}}>
      <span>{a}</span>
      <span>{b}</span>
    </div>
  );
  return (
    <AbsoluteFill>
      <Background tone="product" id="nv-grid-4" />
      <Top n={4} tone="product" />
      <Eyebrow tone="product" top={210}>Nota fiscal</Eyebrow>
      <Title tone="product" top={262} size={74}>
          Nota fiscal? Sai do caixa.
        </Title>

      <div style={{position: 'absolute', left: PAD, top: 440, width: 440, display: 'flex', flexDirection: 'column', gap: 22}}>
        {nfCards.map(({Icon, t, d}, i) => {
          const p = A(f, 14 + i * 14, 22);
          return (
            <div key={t} style={{background: 'rgba(251,251,254,.12)', borderRadius: 28, padding: '28px 30px', fontFamily: SANS, color: WHITE, opacity: p, transform: `translateX(${(1 - p) * -60}px)`}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
                <Icon size={30} color={WHITE} strokeWidth={2.2} />
                <span style={{fontWeight: 700, fontSize: 25, letterSpacing: -0.3}}>{t}</span>
              </div>
              <div style={{marginTop: 10, fontSize: 24, lineHeight: 1.38, color: 'rgba(251,251,254,.86)'}}>{d}</div>
            </div>
          );
        })}
        <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 25, color: LAV, marginTop: 4, opacity: A(f, 112, 20)}}>↳ E a nota também vai para o Omie.</div>
      </div>

      {/* impressora + cupom */}
      <div style={{position: 'absolute', left: cx - 28 + shake, top: 440, width: CW + 56, height: 54, borderRadius: 999, background: '#0B0B0F', boxShadow: '0 12px 24px rgba(0,0,0,.35)', zIndex: 3, opacity: Math.min(1, pPrinter * 2), transform: `translateY(${(1 - pPrinter) * -110}px)`}}>
        <div style={{position: 'absolute', left: 26, right: 26, bottom: 10, height: 8, borderRadius: 4, background: '#000'}} />
      </div>
      <div style={{position: 'absolute', left: cx - 60, top: 484, width: CW + 120, height: 900, clipPath: 'inset(0 0 -80px 0)', zIndex: 2}}>
        <div style={{position: 'absolute', left: 60 + shake * 0.5, top: -14, transform: `translateY(${-720 * (1 - prog)}px)`}}>
          <Paper width={CW}>
            <div style={{padding: '34px 28px 6px'}}>
              <div style={{textAlign: 'center', fontSize: 15, letterSpacing: 3, textTransform: 'uppercase', color: VENDAS, fontWeight: 700}}>exemplo</div>
              <div style={{textAlign: 'center', marginTop: 8, fontSize: 21, fontWeight: 700}}>Restaurante Exemplo</div>
              <div style={{textAlign: 'center', marginTop: 6, fontSize: 13, lineHeight: 1.35, color: TEXT2}}>DANFE NFC-e · Documento auxiliar da nota fiscal de consumidor eletrônica</div>
              <div style={{marginTop: 16, borderTop: '2px dashed rgba(20,22,58,.35)', paddingTop: 10, fontSize: 15}}>
                <div style={{display: 'flex', justifyContent: 'space-between', color: TEXT2}}>
                  <span style={{flex: 1}}>Item</span>
                  <span style={{width: 44}}>Qtd</span>
                  <span style={{width: 70, textAlign: 'right'}}>Valor</span>
                </div>
                {[['Pizza meio a meio', '1', '74,90'], ['Chope', '2', '25,80']].map(([a, q, v]) => (
                  <div key={a} style={{display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 17}}>
                    <span style={{flex: 1}}>{a}</span>
                    <span style={{width: 44}}>{q}</span>
                    <span style={{width: 70, textAlign: 'right'}}>{v}</span>
                  </div>
                ))}
              </div>
              <div style={{marginTop: 12, borderTop: '2px dashed rgba(20,22,58,.35)', paddingTop: 8}}>
                <Line a="Qtde. total de itens" b="3" />
                <Line a="Valor a pagar R$" b="100,70" strong />
                <Line a="Forma de pagamento" b="Pix" />
              </div>
              <div style={{marginTop: 14, textAlign: 'center', fontSize: 13, lineHeight: 1.45, color: TEXT2}}>
                Consulte pela chave de acesso
                <br />0000 0000 0000 0000 0000
                <br />0000 0000 0000 0000 0000 0000
              </div>
              <svg viewBox={`-1 -1 ${N + 2} ${N + 2}`} width={150} height={150} style={{display: 'block', margin: '14px auto 0'}}>
                <path d={qr.finders} fillRule="evenodd" fill={NAVY} />
                <path d={qr.mods} fill={NAVY} />
              </svg>
              <div style={{marginTop: 10, textAlign: 'center', fontSize: 13, color: TEXT2}}>NFC-e nº 000123 · série 1</div>
            </div>
          </Paper>
        </div>
      </div>
      <Foot tone="product" />
    </AbsoluteFill>
  );
};
export const NorteVendasNotaFiscal: React.FC = () => <NotaFiscalScene />;
export const NorteVendasNotaFiscalAnim: React.FC = () => <NotaFiscalScene f={useCurrentFrame()} />;

/* ---------- 5 · fechamento (azul-noite) ---------- */
export const NorteVendasFechamento: React.FC = () => {
  ensurePostLoaded();
  return (
    <AbsoluteFill>
      <Background tone="dark" id="nv-grid-5" />
      <div style={{position: 'absolute', right: PAD, top: 80, fontFamily: MONO, fontSize: 22, color: mute('dark')}}>05/{String(TOTAL).padStart(2, '0')}</div>
      <div style={{position: 'absolute', left: PAD, top: 150}}>
        <Img src={LOGO_NEGOCIOS_BRANCO} style={{height: 150, width: 'auto'}} />
      </div>
      <Eyebrow tone="dark" top={470}>Norte Vendas</Eyebrow>
      <Title tone="dark" top={524} size={84}>
        Do QR code na mesa ao <span style={{color: LAV}}>caixa fechado.</span>
      </Title>
      <Support tone="dark" top={790} width={840}>
        Um dos sistemas da Norte para Negócios, feito no chão de loja para restaurante, bar e lanchonete.
      </Support>
      <div style={{position: 'absolute', left: PAD, right: PAD, top: 1040, height: 1, background: 'rgba(251,251,254,.2)'}} />
      <div style={{position: 'absolute', left: PAD, right: PAD, top: 1068, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <span style={{fontFamily: SANS, fontWeight: 700, fontSize: 22, letterSpacing: 3, textTransform: 'uppercase', color: WHITE}}>Conheça o Norte Vendas</span>
        <span style={{background: WHITE, color: NAVY, fontFamily: SANS, fontWeight: 700, fontSize: 30, padding: '22px 38px', borderRadius: 999}}>norteparanegocios.com.br →</span>
      </div>
    </AbsoluteFill>
  );
};
