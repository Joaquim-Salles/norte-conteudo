import React from 'react';
import {AbsoluteFill, Easing, Img, interpolate, useCurrentFrame} from 'remotion';
import {ArrowRight, Box, Check, ClipboardCheck, Factory, Package, ScanLine, Warehouse} from 'lucide-react';
import {ensurePostLoaded, FONT_POST as SANS, FONT_POST_MONO as MONO} from '../lib/fonts';
import {
  Background,
  Eyebrow,
  Foot,
  NAVY,
  PAD,
  Produto,
  Support,
  Title,
  Top,
  WHITE,
  kit,
  mute,
} from '../lib/NortePost';

const TOTAL = 7;
const QR_SCAN_START = 16;
const QR_SCAN_END = 40;
const LABEL_PRINT_START = 22;
const LABEL_PRINT_END = 50;
const LOGO_ESTOQUE_BRANCO = kit('01-logos/norte-estoque/horizontal/norte-estoque_horizontal_branco_transparente.png');
const INVENTARIO_DESKTOP = kit('08-recursos/telas-oficiais/estoque/d-inventario.png');
const INVENTARIO_MOBILE = kit('08-recursos/telas-oficiais/estoque/m-inventario.png');
const TRANSFERENCIAS_DESKTOP = kit('08-recursos/telas-oficiais/estoque/d-transferencia.png');
const PRODUCAO_DESKTOP = kit('08-recursos/telas-oficiais/estoque/d-ordem-producao.png');

const progress = (f: number | undefined, from: number, to: number) =>
  f === undefined ? 1 : interpolate(f, [from, to], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

const ScreenPanel: React.FC<{src: string; width: number; height?: number; style?: React.CSSProperties}> = ({src, width, height, style}) => (
  <div style={{width, padding: 10, background: '#17192E', borderRadius: 16, border: '1px solid rgba(20,22,58,.22)', boxShadow: '0 22px 50px rgba(12,20,47,.22)', ...style}}>
    <Img src={src} style={{display: 'block', width: '100%', height: height ?? 'auto', objectFit: height ? 'cover' : 'contain', objectPosition: 'top', borderRadius: 8}} />
  </div>
);

const PhonePanel: React.FC<{src: string; width: number; height: number; style?: React.CSSProperties}> = ({src, width, height, style}) => (
  <div style={{width, padding: 9, background: '#15172C', borderRadius: 32, border: '2px solid rgba(251,251,254,.3)', boxShadow: '0 24px 50px rgba(12,20,47,.3)', ...style}}>
    <div style={{height, overflow: 'hidden', borderRadius: 24, background: WHITE}}>
      <Img src={src} style={{display: 'block', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center'}} />
    </div>
  </div>
);

const Barcode: React.FC<{color?: string}> = ({color = NAVY}) => (
  <div style={{height: 36, display: 'flex', alignItems: 'stretch', gap: 4}} aria-hidden="true">
    {[4, 2, 6, 3, 2, 5, 2, 4, 7, 2, 3, 5, 2, 6, 3, 2, 5, 3, 6, 2, 4, 3].map((width, index) => (
      <span key={index} style={{width, background: color, opacity: index % 4 === 0 ? .7 : 1}} />
    ))}
  </div>
);

const QrMark: React.FC<{size: number; beam?: number; beamOpacity?: number}> = ({size, beam, beamOpacity = 1}) => {
  const modules = 21;
  const finder = (x: number, y: number, left: number, top: number) => {
    const dx = x - left;
    const dy = y - top;
    if (dx < 0 || dx > 6 || dy < 0 || dy > 6) return null;
    const edge = dx === 0 || dx === 6 || dy === 0 || dy === 6;
    const center = dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4;
    return edge || center;
  };
  const cells: React.ReactNode[] = [];
  for (let y = 0; y < modules; y++) {
    for (let x = 0; x < modules; x++) {
      const isDark = finder(x, y, 0, 0) ?? finder(x, y, 14, 0) ?? finder(x, y, 0, 14) ?? ((x * 7 + y * 11 + x * y) % 9 < 4);
      if (isDark) cells.push(<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={NAVY} />);
    }
  }
  return (
    <div style={{position: 'relative', width: size, height: size, background: WHITE, padding: size * .07, borderRadius: 12, boxShadow: '0 12px 24px rgba(20,22,58,.18)', overflow: 'hidden'}}>
      <svg width="100%" height="100%" viewBox="0 0 21 21" shapeRendering="crispEdges">{cells}</svg>
      {beam !== undefined && <div style={{position: 'absolute', left: 16, right: 16, top: `${7 + beam * 86}%`, height: 4, background: '#FF5B65', boxShadow: '0 0 12px 4px rgba(255,91,101,.72)', opacity: beamOpacity}} />}
    </div>
  );
};

const StockBox: React.FC<{size?: number; tone?: 'teal' | 'cream'; style?: React.CSSProperties}> = ({size = 132, tone = 'cream', style}) => {
  const face = tone === 'teal' ? '#5FD3DC' : '#E5CDA0';
  const side = tone === 'teal' ? '#168E9A' : '#CFB37F';
  return (
    <div style={{position: 'relative', width: size, height: size * .86, filter: 'drop-shadow(0 14px 15px rgba(10,18,49,.22))', ...style}}>
      <div style={{position: 'absolute', inset: '0 0 12% 0', background: face, border: `4px solid ${NAVY}`, borderRadius: 12, clipPath: 'polygon(0 0,100% 0,100% 85%,50% 100%,0 85%)'}} />
      <div style={{position: 'absolute', top: 0, left: '50%', width: 4, height: '88%', background: NAVY, transform: 'translateX(-50%)', opacity: .5}} />
      <div style={{position: 'absolute', left: '10%', right: '10%', top: '22%', height: 4, background: side, opacity: .8}} />
      <div style={{position: 'absolute', left: '50%', top: '35%', transform: 'translateX(-50%)', width: size * .3, height: size * .3, background: WHITE, borderRadius: 5, display: 'grid', placeItems: 'center', border: '2px solid rgba(20,22,58,.16)'}}>
        <Box size={size * .18} color={NAVY} strokeWidth={2.1} />
      </div>
    </div>
  );
};

const PhysicalShelf: React.FC = () => (
  <div style={{width: 330, height: 230, padding: '16px 18px', borderRadius: 18, background: 'rgba(251,251,254,.11)', border: '1px solid rgba(251,251,254,.34)'}}>
    <div style={{fontFamily: MONO, color: WHITE, fontSize: 17, letterSpacing: 1.4}}>ESTOQUE FÍSICO</div>
    <div style={{position: 'relative', height: 160, marginTop: 13, padding: '8px 20px 0'}}>
      <div style={{position: 'absolute', left: 17, right: 17, top: 0, bottom: 0, borderLeft: '7px solid #E3F7F6', borderRight: '7px solid #E3F7F6', opacity: .95}} />
      {[70, 144].map((top) => <div key={top} style={{position: 'absolute', left: 11, right: 11, top, height: 9, borderRadius: 5, background: '#E3F7F6', boxShadow: '0 3px 0 rgba(10,18,49,.18)'}} />)}
      <div style={{position: 'relative', display: 'flex', gap: 9, height: 59, alignItems: 'end', padding: '0 11px'}}>
        {[0, 1, 2].map((item) => <div key={item} style={{width: 74, height: item === 1 ? 52 : 44, borderRadius: '8px 8px 4px 4px', background: item === 1 ? '#8CE3E2' : '#53C7D0', border: '2px solid rgba(20,22,58,.65)', position: 'relative', boxShadow: 'inset 0 8px 0 rgba(255,255,255,.2)'}}><span style={{position: 'absolute', left: 9, right: 9, top: 20, height: 4, borderRadius: 4, background: 'rgba(20,22,58,.28)'}} /></div>)}
      </div>
      <div style={{position: 'absolute', left: 29, right: 29, top: 81, display: 'flex', gap: 16, alignItems: 'end', height: 57}}>
        {[0, 1].map((item) => <div key={item} style={{width: 106, height: item ? 48 : 56, borderRadius: '8px 8px 4px 4px', background: item ? '#A6E8E6' : '#65D0D6', border: '2px solid rgba(20,22,58,.65)', position: 'relative', boxShadow: 'inset 0 8px 0 rgba(255,255,255,.2)'}}><span style={{position: 'absolute', left: 12, right: 12, top: 22, height: 4, borderRadius: 4, background: 'rgba(20,22,58,.28)'}} /></div>)}
      </div>
    </div>
  </div>
);

const LaptopPanel: React.FC<{src: string; width: number; height: number; style?: React.CSSProperties}> = ({src, width, height, style}) => (
  <div style={{width, ...style}}>
    <div style={{padding: 10, background: '#141629', border: '2px solid rgba(251,251,254,.58)', borderRadius: '18px 18px 12px 12px', boxShadow: '0 22px 42px rgba(12,20,47,.28)'}}>
      <Img src={src} style={{display: 'block', width: '100%', height, objectFit: 'cover', objectPosition: 'top left', borderRadius: 6}} />
    </div>
    <div style={{position: 'relative', width: '108%', height: 17, marginLeft: '-4%', borderRadius: '0 0 20px 20px', background: 'linear-gradient(180deg,#E6E7EE 0%,#A9ADBD 55%,#72768A 100%)', boxShadow: '0 9px 14px rgba(12,20,47,.22)', clipPath: 'polygon(3% 0,97% 0,100% 82%,95% 100%,5% 100%,0 82%)'}}>
      <div style={{width: 100, height: 3, margin: '2px auto 0', borderRadius: 4, background: 'rgba(20,22,58,.25)'}} />
    </div>
  </div>
);

const Copy: React.FC<{n: number; tone: 'dark' | 'light' | 'product'; eyebrow: string; title: React.ReactNode; support: React.ReactNode}> = ({n, tone, eyebrow, title, support}) => (
  <>
    <Top n={n} tone={tone} total={TOTAL} />
    <Eyebrow tone={tone} top={195}>{eyebrow}</Eyebrow>
    <Title tone={tone} top={250} size={74}>{title}</Title>
    <Support tone={tone} top={435} width={890} size={28}>{support}</Support>
  </>
);

/* 01 · Capa: apresenta o problema do estoque físico e digital sem tela de sistema. */
export const NorteEstoqueApresentacao01: React.FC = () => {
  ensurePostLoaded();
  return (
    <Produto id="estoque">
      <AbsoluteFill>
        <Background tone="product" id="ne-ap-grid-1" />
        <Img src={LOGO_ESTOQUE_BRANCO} style={{position: 'absolute', left: PAD, top: 72, height: 92, width: 'auto'}} />
        <span style={{position: 'absolute', right: PAD, top: 96, fontFamily: MONO, fontSize: 22, color: mute('product')}}>01/07</span>
        <Eyebrow tone="product" top={350}>Norte Estoque</Eyebrow>
        <Title tone="product" top={415} size={82}>O estoque do sistema bate com o real?</Title>
        <Support tone="product" top={615} width={850} size={30}>Organize o controle físico e acompanhe o que acontece na operação.</Support>
        <div style={{position: 'absolute', left: 94, right: 94, top: 800, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20}}>
          <PhysicalShelf />
          <ArrowRight size={54} color="#C6F3F3" strokeWidth={1.8} />
          <div style={{width: 330, height: 230, background: WHITE, borderRadius: 18, padding: 18, boxShadow: '0 20px 36px rgba(10,18,49,.22)'}}>
            <div style={{fontFamily: MONO, color: NAVY, fontSize: 17, letterSpacing: 1.3}}>ESTOQUE NO SISTEMA</div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 17, color: '#72758B', fontFamily: SANS, fontSize: 15, fontWeight: 700}}><span>PRODUTO</span><span>QTD.</span></div>
            <div style={{height: 1, background: '#D9DAE2', margin: '8px 0'}} />
            {['Item 01', 'Item 02', 'Item 03'].map((item, row) => <div key={item} style={{height: 42, display: 'flex', alignItems: 'center', borderBottom: '1px solid #E7E8ED', fontFamily: SANS, color: NAVY, fontSize: 18}}><span style={{width: 12, height: 12, marginRight: 10, borderRadius: 3, background: row === 1 ? '#5FD3DC' : '#168E9A'}} />{item}<span style={{marginLeft: 'auto', fontFamily: MONO, fontSize: 17}}>{['12', '08', '24'][row]}</span></div>)}
          </div>
        </div>
        <Foot tone="product" label="Norte Estoque" />
      </AbsoluteFill>
    </Produto>
  );
};

/* 02 · QR: a varredura é a ação principal, com a interface oficial sem movimento interno. */
const InventarioQrScene: React.FC<{f?: number}> = ({f}) => {
  ensurePostLoaded();
  const scan = f === undefined ? 1 : interpolate(f, [QR_SCAN_START, QR_SCAN_END], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const beamOpacity = f === undefined ? 0 : interpolate(f, [QR_SCAN_START, QR_SCAN_START + 2, QR_SCAN_END, QR_SCAN_END + 5], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const pulse = f === undefined ? 1 : interpolate(f, [QR_SCAN_END, QR_SCAN_END + 7, QR_SCAN_END + 21, QR_SCAN_END + 27], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const boxY = f === undefined ? 0 : interpolate(f, [0, 18], [180, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(.16, 1, .3, 1)});
  return (
    <Produto id="estoque">
      <AbsoluteFill>
        <Background tone="light" id="ne-ap-grid-2" />
        <Copy n={2} tone="light" eyebrow="Inventário por QR Code" title={<>Conte pelo celular.<br />Registre no inventário.</>} support="A leitura do código leva a equipe direto ao inventário online para registrar a contagem dos produtos." />
        <div style={{position: 'absolute', left: 108, top: 650, width: 420, height: 380, display: 'grid', placeItems: 'center', transform: `translateY(${boxY}px)`}}>
          <div style={{position: 'absolute', width: 380, height: 320, borderRadius: 34, background: '#D7C69F', border: `5px solid ${NAVY}`, boxShadow: '0 24px 45px rgba(20,22,58,.18)'}} />
          <div style={{position: 'absolute', top: 70, left: 72, width: 274, height: 13, background: '#B29A6D', borderRadius: 10, opacity: .65}} />
          <div style={{position: 'absolute', top: 291, left: 72, width: 274, height: 13, background: '#B29A6D', borderRadius: 10, opacity: .65}} />
          <QrMark size={178} beam={f === undefined ? undefined : scan} beamOpacity={beamOpacity} />
          {pulse > 0 && <div style={{position: 'absolute', width: 202, height: 202, borderRadius: 28, border: `5px solid rgba(22,142,154,${.8 * pulse})`, transform: `scale(${1 + .08 * pulse})`, opacity: pulse, boxShadow: '0 0 0 12px rgba(22,142,154,.12)'}} />}
        </div>
        <PhonePanel src={INVENTARIO_MOBILE} width={250} height={452} style={{position: 'absolute', right: 104, top: 630, transform: `rotate(3deg) translateY(${f === undefined ? 0 : interpolate(f, [8, 25], [180, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(.16, 1, .3, 1)})}px)`}} />
        <div style={{position: 'absolute', left: 160, top: 1070, display: 'flex', alignItems: 'center', gap: 14, color: '#168E9A', fontFamily: SANS, fontWeight: 700, fontSize: 22, letterSpacing: 1.3, textTransform: 'uppercase'}}><ScanLine size={28} /> Leitura · Contagem · Registro</div>
        <Foot tone="light" label="Norte Estoque" />
      </AbsoluteFill>
    </Produto>
  );
};
export const NorteEstoqueApresentacao02: React.FC = () => <InventarioQrScene />;
export const NorteEstoqueApresentacaoAnimada02: React.FC = () => <InventarioQrScene f={useCurrentFrame()} />;

/* 03 · Acompanhamento: etapas da conferência atualizam em sequência. */
const ConferenciaScene: React.FC<{f?: number}> = ({f}) => {
  ensurePostLoaded();
  const count = f === undefined ? 5 : Math.floor(progress(f, 18, 72) * 5);
  const rows = ['Produto conferido', 'Quantidade registrada', 'Inventário atualizado', 'Divergência identificada', 'Revisão acompanhada'];
  return (
    <Produto id="estoque">
      <AbsoluteFill>
        <Background tone="dark" id="ne-ap-grid-3" />
        <Copy n={3} tone="dark" eyebrow="Acompanhamento online" title={<>Acompanhe cada etapa<br />do inventário.</>} support="Veja os itens já registrados e identifique o que precisa de revisão durante a conferência." />
        <div style={{position: 'absolute', left: PAD, right: PAD, top: 660, height: 470, borderRadius: 26, background: 'rgba(251,251,254,.08)', border: '1px solid rgba(251,251,254,.22)', padding: 34, boxShadow: '0 26px 52px rgba(0,0,0,.18)'}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{fontFamily: SANS, color: WHITE, fontSize: 28, fontWeight: 700}}>Andamento do inventário</div>
            <div style={{fontFamily: MONO, fontSize: 20, color: '#80E4DE', letterSpacing: 1.4}}>ACOMPANHADO</div>
          </div>
          <div style={{height: 12, marginTop: 22, borderRadius: 99, background: 'rgba(251,251,254,.16)', overflow: 'hidden'}}><div style={{width: `${count * 20}%`, height: '100%', background: '#5FD3DC', borderRadius: 99}} /></div>
          <div style={{display: 'grid', gap: 15, marginTop: 30}}>
            {rows.map((row, index) => {
              const checked = count > index;
              return <div key={row} style={{height: 54, display: 'flex', alignItems: 'center', gap: 16, borderBottom: '1px solid rgba(251,251,254,.12)', opacity: checked ? 1 : .4}}>
                <div style={{width: 32, height: 32, borderRadius: 50, display: 'grid', placeItems: 'center', background: checked ? '#168E9A' : 'rgba(251,251,254,.12)', transform: checked && f !== undefined ? `scale(${index === count - 1 ? 1.12 : 1})` : 'scale(1)'}}>{checked && <Check size={19} color={WHITE} strokeWidth={3} />}</div>
                <span style={{fontFamily: SANS, color: WHITE, fontSize: 24, fontWeight: 600}}>{row}</span>
                <span style={{marginLeft: 'auto', fontFamily: MONO, color: checked ? '#80E4DE' : 'rgba(251,251,254,.45)', fontSize: 16}}>{checked ? 'REGISTRADO' : 'AGUARDANDO'}</span>
              </div>;
            })}
          </div>
        </div>
        <Foot tone="dark" label="Norte Estoque" />
      </AbsoluteFill>
    </Produto>
  );
};
export const NorteEstoqueApresentacao03: React.FC = () => <ConferenciaScene />;
export const NorteEstoqueApresentacaoAnimada03: React.FC = () => <ConferenciaScene f={useCurrentFrame()} />;

/* 04 · Etiquetas: a impressora permanece fixa e a etiqueta avança para baixo. */
const EtiquetaScene: React.FC<{f?: number}> = ({f}) => {
  ensurePostLoaded();
  const paperRevealHeight = f === undefined ? 282 : interpolate(f, [LABEL_PRINT_START, LABEL_PRINT_END], [0, 282], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const laptopY = f === undefined ? 0 : interpolate(f, [0, 20], [175, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(.16, 1, .3, 1)});
  return (
    <Produto id="estoque">
      <AbsoluteFill>
        <Background tone="product" id="ne-ap-grid-4" />
        <Copy n={4} tone="product" eyebrow="Lote e validade" title={<>Cada produto com<br />sua identificação.</>} support="Gere etiquetas com lote e validade para identificar os produtos e acompanhar sua rastreabilidade." />
        <LaptopPanel src={INVENTARIO_DESKTOP} width={570} height={310} style={{position: 'absolute', left: 62, top: 690, transform: `translateY(${laptopY}px)`}} />
        <div style={{position: 'absolute', right: 76, top: 690, width: 352, height: 424}}>
          <div style={{position: 'absolute', left: 0, top: 0, width: 352, height: 126, borderRadius: 25, background: '#17192E', border: '4px solid rgba(251,251,254,.75)', boxShadow: '0 26px 42px rgba(12,20,47,.3)', zIndex: 2}}>
            <div style={{position: 'absolute', left: 42, right: 42, top: 31, height: 14, borderRadius: 10, background: '#30344E'}} />
            <div style={{position: 'absolute', left: 48, right: 48, bottom: 10, height: 22, borderRadius: '0 0 8px 8px', background: '#0C0E1C', border: '2px solid rgba(251,251,254,.16)'}} />
            <div style={{position: 'absolute', right: 28, top: 30, width: 12, height: 12, borderRadius: 50, background: '#5FD3DC', boxShadow: '0 0 13px #5FD3DC'}} />
          </div>
          <div style={{position: 'absolute', top: 117, left: 48, width: 256, height: paperRevealHeight, overflow: 'hidden', boxShadow: '0 20px 30px rgba(10,18,49,.2)', zIndex: 1}}>
            <div style={{width: 256, height: 282, background: '#FFFDF8', color: NAVY, padding: '22px 20px', clipPath: 'polygon(0 0,100% 0,100% 94%,93% 100%,86% 94%,79% 100%,72% 94%,65% 100%,58% 94%,51% 100%,44% 94%,37% 100%,30% 94%,23% 100%,16% 94%,9% 100%,0 94%)'}}>
            <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 18, letterSpacing: 2, textAlign: 'center', color: '#168E9A'}}>NORTE ESTOQUE</div>
            <div style={{height: 1, background: '#D5D4D0', margin: '17px 0'}} />
            <div style={{fontFamily: SANS, fontSize: 14, fontWeight: 700, color: '#42445C'}}>IDENTIFICAÇÃO DO PRODUTO</div>
            <div style={{fontFamily: MONO, fontSize: 15, lineHeight: 1.7, marginTop: 13}}>LOTE<br />VALIDADE</div>
            <div style={{marginTop: 13}}><Barcode /></div>
            <div style={{fontFamily: MONO, fontSize: 12, letterSpacing: 2, marginTop: 10, textAlign: 'center'}}>RASTREABILIDADE</div>
          </div>
        </div>
        </div>
        <Foot tone="product" label="Norte Estoque" />
      </AbsoluteFill>
    </Produto>
  );
};
export const NorteEstoqueApresentacao04: React.FC = () => <EtiquetaScene />;
export const NorteEstoqueApresentacaoAnimada04: React.FC = () => <EtiquetaScene f={useCurrentFrame()} />;

/* 05 · Transferências: os volumes atravessam os locais de estoque. */
const TransferenciaScene: React.FC<{f?: number}> = ({f}) => {
  ensurePostLoaded();
  const travel = progress(f, 14, 68);
  const offset = f === undefined ? 0 : interpolate(travel, [0, 1], [-300, 0]);
  return (
    <Produto id="estoque">
      <AbsoluteFill>
        <Background tone="light" id="ne-ap-grid-5" />
        <Copy n={5} tone="light" eyebrow="Transferência em massa" title={<>Movimente vários itens<br />de uma só vez.</>} support="Registre transferências em massa entre locais de estoque e acompanhe a movimentação no sistema." />
        <div style={{position: 'absolute', left: 100, right: 100, top: 635, height: 270, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <div style={{width: 200, textAlign: 'center'}}>
            <div style={{width: 160, height: 130, border: '3px solid #168E9A', borderRadius: 18, background: 'rgba(22,142,154,.08)', display: 'grid', placeItems: 'center', margin: '0 auto 14px'}}><Warehouse size={70} color="#168E9A" strokeWidth={1.8} /></div>
            <span style={{fontFamily: SANS, color: NAVY, fontWeight: 700, fontSize: 19, letterSpacing: 1}}>LOCAL DE ORIGEM</span>
          </div>
          <div style={{position: 'relative', width: 440, height: 180, borderTop: '3px dashed rgba(22,142,154,.48)', borderBottom: '3px dashed rgba(22,142,154,.48)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12}}>
            {[0, 1, 2].map((box) => <StockBox key={box} size={112} tone={box === 1 ? 'teal' : 'cream'} style={{transform: `translateX(${offset + box * (f === undefined ? 0 : 7)}px)`, opacity: f === undefined ? 1 : progress(f, 12 + box * 5, 34 + box * 5)}} />)}
            <div style={{position: 'absolute', left: 0, right: 0, top: 67, display: 'flex', justifyContent: 'space-between', pointerEvents: 'none'}}><ArrowRight size={42} color="#168E9A" /><ArrowRight size={42} color="#168E9A" /></div>
          </div>
          <div style={{width: 200, textAlign: 'center'}}>
            <div style={{width: 160, height: 130, border: '3px solid #168E9A', borderRadius: 18, background: 'rgba(22,142,154,.08)', display: 'grid', placeItems: 'center', margin: '0 auto 14px'}}><Warehouse size={70} color="#168E9A" strokeWidth={1.8} /></div>
            <span style={{fontFamily: SANS, color: NAVY, fontWeight: 700, fontSize: 19, letterSpacing: 1}}>NOVO LOCAL</span>
          </div>
        </div>
        <ScreenPanel src={TRANSFERENCIAS_DESKTOP} width={820} height={252} style={{position: 'absolute', left: 130, top: 925, overflow: 'hidden'}} />
        <Foot tone="light" label="Norte Estoque" />
      </AbsoluteFill>
    </Produto>
  );
};
export const NorteEstoqueApresentacao05: React.FC = () => <TransferenciaScene />;
export const NorteEstoqueApresentacaoAnimada05: React.FC = () => <TransferenciaScene f={useCurrentFrame()} />;

/* 06 · Produção: ordens de produção ligadas à rotina de estoque. */
const ProducaoScene: React.FC<{f?: number}> = ({f}) => {
  ensurePostLoaded();
  const active = f === undefined ? 2 : Math.min(2, Math.floor(progress(f, 12, 72) * 3));
  const steps = [
    {label: 'Ordem de produção', icon: <ClipboardCheck size={34} />},
    {label: 'Acompanhamento', icon: <Factory size={34} />},
    {label: 'Estoque atualizado', icon: <Package size={34} />},
  ];
  return (
    <Produto id="estoque">
      <AbsoluteFill>
        <Background tone="dark" id="ne-ap-grid-6" />
        <Copy n={6} tone="dark" eyebrow="Ordens de produção" title={<>A produção também<br />entra no controle.</>} support="Acompanhe ordens de produção e conecte essa rotina ao controle físico do estoque." />
        <div style={{position: 'absolute', left: 94, right: 94, top: 650, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          {steps.map((step, index) => {
            const done = active >= index;
            return <React.Fragment key={step.label}>
              <div style={{width: 240, height: 168, borderRadius: 20, border: `2px solid ${done ? '#5FD3DC' : 'rgba(251,251,254,.28)'}`, background: done ? 'rgba(22,142,154,.22)' : 'rgba(251,251,254,.06)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, color: done ? '#9BF0ED' : 'rgba(251,251,254,.55)', boxShadow: done && f !== undefined && index === active ? '0 0 0 10px rgba(95,211,220,.12)' : 'none', transform: done && f !== undefined && index === active ? 'translateY(-7px)' : 'none'}}>
                {step.icon}<span style={{fontFamily: SANS, color: WHITE, fontSize: 20, fontWeight: 700, textAlign: 'center'}}>{step.label}</span>
              </div>
              {index < steps.length - 1 && <ArrowRight size={42} color={active > index ? '#5FD3DC' : 'rgba(251,251,254,.35)'} />}
            </React.Fragment>;
          })}
        </div>
        <ScreenPanel src={PRODUCAO_DESKTOP} width={860} height={254} style={{position: 'absolute', left: 110, top: 910, overflow: 'hidden'}} />
        <Foot tone="dark" label="Norte Estoque" />
      </AbsoluteFill>
    </Produto>
  );
};
export const NorteEstoqueApresentacao06: React.FC = () => <ProducaoScene />;
export const NorteEstoqueApresentacaoAnimada06: React.FC = () => <ProducaoScene f={useCurrentFrame()} />;

/* 07 · Fechamento com a função complementar do Norte Estoque no Omie. */
export const NorteEstoqueApresentacao07: React.FC = () => {
  ensurePostLoaded();
  return (
    <Produto id="estoque">
      <AbsoluteFill>
        <Background tone="product" id="ne-ap-grid-7" />
        <Img src={LOGO_ESTOQUE_BRANCO} style={{position: 'absolute', left: PAD, top: 72, height: 92, width: 'auto'}} />
        <span style={{position: 'absolute', right: PAD, top: 96, fontFamily: MONO, fontSize: 22, color: mute('product') }}>07/07</span>
        <Eyebrow tone="product" top={360}>Norte Estoque + Omie</Eyebrow>
        <Title tone="product" top={425} size={82}>Controle físico integrado à sua gestão.</Title>
        <Support tone="product" top={625} width={890} size={30}>O Norte Estoque complementa o Omie com inventários, etiquetas, transferências e acompanhamento da produção.</Support>
        <div style={{position: 'absolute', left: PAD, right: PAD, top: 840, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18}}>
          {['Inventários', 'Lote e validade', 'Transferências', 'Ordens de produção'].map((label, index) => <div key={label} style={{display: 'flex', gap: 14, alignItems: 'center', padding: '17px 20px', borderRadius: 14, background: 'rgba(251,251,254,.12)', border: '1px solid rgba(251,251,254,.22)', color: WHITE, fontFamily: SANS, fontSize: 21, fontWeight: 700}}><Check size={23} color="#9BF0ED" />{label}</div>)}
        </div>
        <div style={{position: 'absolute', left: PAD, right: PAD, top: 1055, height: 2, background: 'rgba(251,251,254,.25)'}} />
        <div style={{position: 'absolute', left: PAD, right: PAD, top: 1092, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: WHITE, fontFamily: SANS, fontWeight: 750, fontSize: 24}}>
          <span>Conheça o Norte Estoque</span><span style={{background: WHITE, color: '#168E9A', padding: '18px 26px', borderRadius: 999, fontSize: 20}}>norteparanegocios.com.br →</span>
        </div>
        <Foot tone="product" last label="Norte Estoque" />
      </AbsoluteFill>
    </Produto>
  );
};
