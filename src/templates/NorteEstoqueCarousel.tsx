import React from 'react';
import {AbsoluteFill, Img, interpolate, useCurrentFrame} from 'remotion';
import {ArrowRightLeft, Check, Package, Printer, QrCode, Tag} from 'lucide-react';
import {ensurePostLoaded, FONT_POST as SANS, FONT_POST_MONO as MONO} from '../lib/fonts';
import {
  A,
  Background,
  Chip,
  Eyebrow,
  FRAME,
  Foot,
  Fx,
  NAVY,
  PAD,
  PAPER,
  Produto,
  S,
  Support,
  Title,
  Top,
  WHITE,
  ease,
  kit,
  mute,
} from '../lib/NortePost';

const LOGO_ESTOQUE_BRANCO = kit('01-logos/norte-estoque/horizontal/norte-estoque_horizontal_branco_transparente.png');
const TELA_INVENTARIO = kit('08-recursos/telas-oficiais/estoque/d-inventario.png');
const TELA_INVENTARIO_MOBILE = kit('08-recursos/telas-oficiais/estoque/m-inventario.png');

const LaptopFrame: React.FC<{width: number; screenHeight: number; children: React.ReactNode}> = ({width, screenHeight, children}) => (
  <div data-device="laptop" style={{width, height: screenHeight + 40, display: 'flex', flexDirection: 'column', alignItems: 'center', filter: 'drop-shadow(0 22px 28px rgba(20,22,58,.24))'}}>
    <div style={{position: 'relative', width: '100%', padding: 12, boxSizing: 'border-box', borderRadius: 20, background: '#17182D', border: '2px solid rgba(251,251,254,.72)'}}>
      <div style={{position: 'relative', width: '100%', height: screenHeight, borderRadius: 8, overflow: 'hidden', background: '#F7F8FC'}}>{children}</div>
      <div style={{position: 'absolute', left: '50%', top: 6, width: 5, height: 5, borderRadius: 99, background: '#555775', transform: 'translateX(-50%)'}} />
    </div>
    <div style={{width: '106%', height: 25, marginTop: -1, clipPath: 'polygon(3% 0,97% 0,100% 70%,96% 100%,4% 100%,0 70%)', borderRadius: '0 0 15px 15px', background: 'linear-gradient(180deg,#E8EAF2,#AEB4C7)', borderTop: '1px solid rgba(255,255,255,.76)'}} />
  </div>
);

const Screen: React.FC<{src: string; width: number; style?: React.CSSProperties}> = ({src, width, style}) => {
  const height = Math.round((width - 24) * (1800 / 2880));
  return (
    <div style={{width, padding: 12, background: FRAME, borderRadius: 18, boxShadow: '0 24px 38px rgba(20,22,58,.22)', ...style}}>
      <div style={{height, overflow: 'hidden', borderRadius: 8, background: WHITE}}>
        <Img src={src} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'left top', display: 'block'}} />
      </div>
    </div>
  );
};

const Phone: React.FC<{src: string; width: number; height: number; style?: React.CSSProperties}> = ({src, width, height, style}) => (
  <div style={{width, padding: 10, background: FRAME, borderRadius: 40, border: '2px solid rgba(251,251,254,.18)', boxShadow: '0 22px 36px rgba(20,22,58,.3)', ...style}}>
    <div style={{height, overflow: 'hidden', borderRadius: 30, background: WHITE}}>
      <Img src={src} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block'}} />
    </div>
  </div>
);

/* 01 · Capa */
export const NorteEstoqueQR01: React.FC = () => {
  ensurePostLoaded();
  return (
    <Produto id="estoque">
      <AbsoluteFill>
        <Background tone="product" id="ne-qr-grid-1" />
        <Img src={LOGO_ESTOQUE_BRANCO} style={{position: 'absolute', left: PAD, top: 78, height: 100, width: 'auto'}} />
        <span style={{position: 'absolute', right: PAD, top: 96, fontFamily: MONO, fontSize: 22, color: mute('product')}}>01/07</span>
        <Eyebrow tone="product" top={410}>Inventário · etiquetas · transferências</Eyebrow>
        <Title tone="product" top={468} size={60}>Quanto tempo sua equipe perde tentando conferir o estoque?</Title>
        <Support tone="product" top={650} width={860} size={30}>
          O Norte Estoque organiza a conferência online, com leitura por QR Code, etiquetas e transferências em massa.
        </Support>
        <div style={{position: 'absolute', left: PAD, right: PAD, top: 815, display: 'flex', flexWrap: 'wrap', gap: 14}}>
          {['QR Code', 'Etiquetas', 'Transferências em lote'].map((label) => <Chip key={label} tone="product">{label}</Chip>)}
        </div>
        <div style={{position: 'absolute', right: 94, bottom: 180, color: 'rgba(251,251,254,.18)', transform: 'rotate(-8deg)'}}>
          <QrCode size={186} strokeWidth={1.2} />
        </div>
        <Foot tone="product" label="Norte para Negócios" />
      </AbsoluteFill>
    </Produto>
  );
};

/* 02 · Inventário online com leitura por QR Code */
const InventarioScene: React.FC<{f?: number}> = ({f}) => {
  ensurePostLoaded();
  const pDesktop = S(f, 12, {damping: 16, stiffness: 120, mass: 0.85});
  const pMobile = S(f, 24, {damping: 15, stiffness: 135, mass: 0.75});
  const focus = f === undefined ? 0 : interpolate(f, [38, 48, 65, 76], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <Produto id="estoque">
      <AbsoluteFill>
        <Background tone="light" id="ne-qr-grid-2" />
        <Top n={2} total={7} tone="light" />
        <Eyebrow tone="light" top={195}>Inventário com QR Code</Eyebrow>
        <Fx p={A(f, 0, 16)}>
          <Title tone="light" top={245} size={78}>Inventário online.</Title>
        </Fx>
        <Fx p={A(f, 8, 18)}>
          <Support tone="light" top={350} width={870} size={29}>
            Registre inventários online com leitura por QR Code e acompanhe a conferência dos produtos.
          </Support>
        </Fx>
        <div style={{position: 'absolute', left: PAD - 12, top: 550, opacity: Math.min(1, pDesktop * 1.4), transform: `translateY(${(1 - pDesktop) * 145}px)`}}>
          <Screen src={TELA_INVENTARIO} width={835} />
          <div data-focus-target="inventory-row" style={{position: 'absolute', left: 182, top: 140, width: 500, height: 30, border: '3px solid #168E9A', borderRadius: 10, boxShadow: '0 0 0 5px rgba(22,142,154,.14)', opacity: focus}} />
        </div>
        <div style={{position: 'absolute', right: 78, top: 625, opacity: Math.min(1, pMobile * 1.5), transform: `translateY(${(1 - pMobile) * 205}px) rotate(2deg)`}}>
          <Phone src={TELA_INVENTARIO_MOBILE} width={228} height={460} />
        </div>
        <Foot tone="light" label="Norte Estoque" />
      </AbsoluteFill>
    </Produto>
  );
};

export const NorteEstoqueQR02: React.FC = () => <InventarioScene />;
export const NorteEstoqueQR02Animada: React.FC = () => <InventarioScene f={useCurrentFrame()} />;

/* 03 · Leitura prática do QR Code no alimento */
const ScanScene: React.FC<{f?: number}> = ({f}) => {
  ensurePostLoaded();
  const pPhone = S(f, 8, {damping: 16, stiffness: 135, mass: 0.8});
  const scanLine = f === undefined ? 0.64 : interpolate(f, [22, 53], [0.12, 0.92], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const read = f === undefined ? 1 : interpolate(f, [52, 62], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <Produto id="estoque">
      <AbsoluteFill>
        <Background tone="dark" id="ne-qr-grid-3" />
        <Top n={3} total={7} tone="dark" />
        <Eyebrow tone="dark" top={195}>Inventário com QR Code</Eyebrow>
        <Title tone="dark" top={245} size={78}>Leia o código no alimento.</Title>
        <Support tone="dark" top={430} width={850} size={29}>
          Aponte o celular para o QR Code do produto e faça a leitura durante a conferência.
        </Support>
        <div style={{position: 'absolute', left: 100, top: 595, width: 535, height: 465, borderRadius: 34, background: '#E8D9B6', border: '3px solid rgba(251,251,254,.65)', boxShadow: '0 26px 42px rgba(0,0,0,.24)', transform: 'rotate(-3deg)'}}>
          <div style={{position: 'absolute', inset: 18, borderRadius: 24, border: '2px solid rgba(20,22,58,.17)', background: 'linear-gradient(145deg,#F4E8CB,#D5C397)'}} />
          <svg data-food="tomato" viewBox="0 0 290 265" aria-label="Tomate inteiro com cálice e haste" style={{position: 'absolute', left: 56, top: 55, width: 325, height: 297, overflow: 'visible'}}>
            <path data-part="tomato-body" d="M145 62 C160 48 174 54 183 67 C212 58 239 79 244 111 C253 148 235 187 207 204 C190 218 170 222 145 214 C120 222 100 218 83 204 C55 187 37 148 46 111 C51 79 78 58 107 67 C116 54 130 48 145 62Z" fill="#E6533F" stroke="#B93632" strokeWidth="4" />
            <path data-part="tomato-calyx" d="M145 76 C137 66 122 57 111 58 C117 70 123 78 133 83 C119 79 103 82 95 91 C108 98 123 99 136 93 C126 103 121 118 126 128 C139 119 146 106 146 94 C151 109 163 120 176 122 C178 108 171 97 159 89 C175 92 190 86 197 75 C183 69 168 71 156 80 C159 67 154 54 145 46 C136 55 132 67 136 80Z" fill="#397C50" stroke="#286742" strokeWidth="3" strokeLinejoin="round" />
            <path data-part="tomato-stem" d="M145 57 C145 47 149 39 156 33" fill="none" stroke="#286742" strokeWidth="8" strokeLinecap="round" />
            <path d="M77 117 C81 95 95 82 113 79" fill="none" stroke="#F57A62" strokeWidth="7" strokeLinecap="round" opacity=".7" />
          </svg>
          <div style={{position: 'absolute', right: 28, bottom: 30, width: 148, height: 160, borderRadius: 14, background: '#FFFDF8', boxShadow: '0 8px 16px rgba(20,22,58,.12)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <QrCode size={112} color={NAVY} strokeWidth={2.4} />
            <span style={{fontFamily: MONO, fontWeight: 700, fontSize: 13, letterSpacing: 1.5, color: NAVY}}>QR DO ALIMENTO</span>
          </div>
          <div style={{position: 'absolute', left: 42, bottom: 24, fontFamily: SANS, fontWeight: 700, fontSize: 19, letterSpacing: 2, color: NAVY}}>TOMATE</div>
        </div>
        <div style={{position: 'absolute', right: 82, top: 565, width: 320, height: 555, padding: 13, borderRadius: 42, background: FRAME, border: '3px solid rgba(251,251,254,.45)', boxShadow: '0 28px 50px rgba(0,0,0,.35)', opacity: Math.min(1, pPhone * 1.4), transform: `translateY(${(1 - pPhone) * 170}px) rotate(2deg)`}}>
          <div style={{height: '100%', borderRadius: 30, background: '#0D1025', position: 'relative', overflow: 'hidden'}}>
            <div style={{position: 'absolute', left: 20, top: 22, fontFamily: MONO, fontSize: 15, letterSpacing: 1.5, color: WHITE}}>LEITURA DE PRODUTO</div>
            <div style={{position: 'absolute', left: 44, top: 104, width: 205, height: 205, border: `3px solid ${WHITE}`, borderRadius: 22, boxShadow: '0 0 0 999px rgba(13,16,37,.28)'}}>
              <QrCode size={174} color={WHITE} strokeWidth={2.2} style={{position: 'absolute', left: 13, top: 13}} />
              <div style={{position: 'absolute', left: 0, right: 0, top: `${scanLine * 100}%`, height: 4, background: '#5FD3DC', boxShadow: '0 0 18px #5FD3DC', opacity: 1 - read * 0.3}} />
              <div style={{position: 'absolute', right: -11, bottom: -11, width: 48, height: 48, borderRadius: 50, background: '#168E9A', color: WHITE, display: 'grid', placeItems: 'center', opacity: read, transform: `scale(${0.75 + read * 0.25})`}}><Check size={29} strokeWidth={3} /></div>
            </div>
            <div style={{position: 'absolute', left: 22, right: 22, bottom: 42, padding: '18px 12px', borderRadius: 18, background: read ? '#168E9A' : 'rgba(251,251,254,.12)', color: WHITE, textAlign: 'center', fontFamily: SANS, fontWeight: 700, fontSize: 17, letterSpacing: 1.4}}>{read > 0.8 ? 'LEITURA CONCLUÍDA' : 'APONTE PARA O CÓDIGO'}</div>
          </div>
        </div>
        <Foot tone="dark" label="Norte Estoque" />
      </AbsoluteFill>
    </Produto>
  );
};

export const NorteEstoqueQR03: React.FC = () => <ScanScene />;
export const NorteEstoqueQR03Animada: React.FC = () => <ScanScene f={useCurrentFrame()} />;

/* 05 · A leitura chega ao inventário */
const RegistroScene: React.FC = () => {
  ensurePostLoaded();
  return (
    <Produto id="estoque">
      <AbsoluteFill>
        <Background tone="light" id="ne-qr-grid-5" />
        <Top n={5} total={7} tone="light" />
        <Eyebrow tone="light" top={195}>Conferência online</Eyebrow>
        <Title tone="light" top={245} size={78}>Da leitura ao inventário.</Title>
        <Support tone="light" top={355} width={850} size={29}>
          Depois da leitura, o produto aparece no inventário para a equipe registrar a quantidade conferida e acompanhar o que já foi registrado.
        </Support>
        <div data-illustration="inventory-notebook" style={{position: 'absolute', left: PAD - 16, top: 565}}>
          <LaptopFrame width={910} screenHeight={554}>
            <Img src={TELA_INVENTARIO} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'left top', display: 'block'}} />
          </LaptopFrame>
          <div data-focus-target="inventory-row" style={{position: 'absolute', left: 198, top: 155, right: 26, height: 30, border: '3px solid #168E9A', borderRadius: 9, boxShadow: '0 0 0 4px rgba(22,142,154,.13)', opacity: 0.82}} />
        </div>
        <Foot tone="light" label="Norte Estoque" />
      </AbsoluteFill>
    </Produto>
  );
};

export const NorteEstoqueQR05: React.FC = () => <RegistroScene />;

/* 04 · Etiquetas com lote e validade */
const EtiquetaScene: React.FC<{f?: number}> = ({f}) => {
  ensurePostLoaded();
  const progress = f === undefined ? 1 : interpolate(f, [12, 45], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease});
  const labelY = (1 - progress) * -640;
  return (
    <Produto id="estoque">
      <AbsoluteFill>
        <Background tone="product" id="ne-qr-grid-4" />
        <Top n={4} total={7} tone="product" />
        <Eyebrow tone="product" top={195}>Identificação e rastreabilidade</Eyebrow>
        <Title tone="product" top={245} size={78}>Lote e validade na etiqueta.</Title>
        <Support tone="product" top={430} width={850} size={29}>
          Identifique cada produto com uma etiqueta que reúne os dados importantes para a conferência.
        </Support>
        <div style={{position: 'absolute', left: 72, top: 570, width: 430, display: 'flex', flexDirection: 'column', gap: 18}}>
          {[
            {icon: <Package size={30} />, title: 'Produto identificado', text: 'A etiqueta acompanha o item certo.'},
            {icon: <Tag size={30} />, title: 'Lote registrado', text: 'Consulte a identificação do lote.'},
            {icon: <Check size={30} />, title: 'Validade visível', text: 'Facilite a conferência dos produtos.'},
          ].map(({icon, title, text}, index) => {
            const cardProgress = f === undefined ? 1 : interpolate(f, [8 + index * 4, 20 + index * 4], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease});
            return (
              <div key={title} data-info-card={index + 1} style={{height: 150, boxSizing: 'border-box', padding: '22px 24px', display: 'flex', alignItems: 'center', gap: 20, borderRadius: 24, background: `rgba(251,251,254,${.12 + cardProgress * .04})`, border: '1px solid rgba(251,251,254,.18)', color: WHITE, opacity: cardProgress, transform: `translateX(${(1 - cardProgress) * -36}px)`}}>
                <div style={{width: 56, height: 56, flex: '0 0 56px', borderRadius: 17, background: 'rgba(251,251,254,.14)', display: 'grid', placeItems: 'center', color: '#7BE1E7'}}>{icon}</div>
                <div>
                  <div style={{fontFamily: SANS, fontSize: 21, fontWeight: 700, color: WHITE}}>{title}</div>
                  <div style={{marginTop: 7, fontFamily: SANS, fontSize: 18, lineHeight: 1.35, color: 'rgba(251,251,254,.86)'}}>{text}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div data-illustration="printed-stock-label" style={{position: 'absolute', left: 536, top: 555, width: 474, height: 650}}>
          <div style={{position: 'absolute', left: 24, right: 24, top: 50, height: 580, overflow: 'hidden', borderRadius: '0 0 8px 8px'}}>
            <div style={{position: 'absolute', left: 10, top: labelY, width: 406, minHeight: 548, padding: '28px 32px', boxSizing: 'border-box', background: '#FFFDF7', color: NAVY, boxShadow: '0 18px 32px rgba(8,12,52,.22)'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: SANS, fontWeight: 700, fontSize: 18, letterSpacing: 1.4, color: '#168E9A'}}><span>NORTE ESTOQUE</span><Tag size={22} /></div>
              <div style={{marginTop: 18, textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 16, letterSpacing: 2, color: NAVY}}>ETIQUETA DE ESTOQUE</div>
              <table style={{width: '100%', marginTop: 20, borderCollapse: 'collapse', fontFamily: MONO, color: NAVY, textAlign: 'left'}}>
                <thead><tr style={{fontSize: 12, letterSpacing: 1.2, color: '#62677F'}}><th style={{padding: '8px 4px', borderBottom: '2px solid rgba(20,22,58,.2)'}}>IDENTIFICAÇÃO</th><th style={{padding: '8px 4px', borderBottom: '2px solid rgba(20,22,58,.2)'}}>DADO</th></tr></thead>
                <tbody>
                  <tr><th style={{padding: '14px 4px', fontSize: 15, borderBottom: '1px solid rgba(20,22,58,.15)'}}>PRODUTO</th><td style={{padding: '14px 4px', borderBottom: '1px solid rgba(20,22,58,.15)'}}>____________</td></tr>
                  <tr data-label-row="lot"><th style={{padding: '14px 4px', fontSize: 15, borderBottom: '1px solid rgba(20,22,58,.15)'}}>LOTE</th><td style={{padding: '14px 4px', borderBottom: '1px solid rgba(20,22,58,.15)'}}>____________</td></tr>
                  <tr data-label-row="expiry"><th style={{padding: '14px 4px', fontSize: 15}}>VALIDADE</th><td style={{padding: '14px 4px'}}>__/__/____</td></tr>
                </tbody>
              </table>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginTop: 20, paddingTop: 16, borderTop: '2px dashed rgba(20,22,58,.2)'}}>
                <QrCode size={104} color={NAVY} strokeWidth={2.2} />
                <span style={{fontFamily: MONO, fontWeight: 700, fontSize: 13, letterSpacing: 1.3, color: '#168E9A'}}>LEITURA DO PRODUTO</span>
              </div>
            </div>
          </div>
          <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 68, borderRadius: 34, background: '#101225', boxShadow: '0 16px 26px rgba(8,12,52,.32)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2}}>
            <div style={{position: 'absolute', left: 46, right: 46, top: 23, height: 10, borderRadius: 8, background: '#2E3457'}} />
            <div style={{position: 'absolute', right: 35, top: 21, width: 13, height: 13, borderRadius: '50%', background: '#5FD3DC', boxShadow: '0 0 14px #5FD3DC'}} />
            <Printer size={23} color="rgba(251,251,254,.8)" style={{position: 'absolute', right: 17, bottom: -28}} />
          </div>
        </div>
        <Foot tone="product" label="Norte Estoque" />
      </AbsoluteFill>
    </Produto>
  );
};

export const NorteEstoqueQR04: React.FC = () => <EtiquetaScene />;
export const NorteEstoqueQR04Animada: React.FC = () => <EtiquetaScene f={useCurrentFrame()} />;

/* 06 · Transferências em massa online */
const TransferenciasScene: React.FC<{f?: number}> = ({f}) => {
  ensurePostLoaded();
  const progress = f === undefined ? 1 : interpolate(f, [12, 70], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease});
  const check = f === undefined ? 1 : interpolate(f, [68, 78], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const packageX = 292 + progress * 374;
  const packageY = 230 - Math.sin(progress * Math.PI) * 27;
  return (
    <Produto id="estoque">
      <AbsoluteFill>
        <Background tone="product" id="ne-qr-grid-6" />
        <Top n={6} total={7} tone="product" />
        <Eyebrow tone="product" top={195}>Movimentação do estoque</Eyebrow>
        <Fx p={A(f, 0, 16)}>
          <Title tone="product" top={245} size={78}>Transfira vários itens de uma vez.</Title>
        </Fx>
        <Fx p={A(f, 8, 18)}>
          <Support tone="product" top={430} width={850} size={29}>
            Faça transferências em massa entre locais de estoque e acompanhe cada movimentação na operação.
          </Support>
        </Fx>
        <div data-illustration="stock-transfer" style={{position: 'absolute', left: 90, top: 565, width: 900, height: 490}}>
          <svg aria-hidden="true" style={{position: 'absolute', inset: 0, width: '100%', height: '100%'}} viewBox="0 0 900 490">
            <path d="M270 235H630" stroke="rgba(251,251,254,.55)" strokeWidth="8" strokeDasharray="13 14" strokeLinecap="round" />
            <path d="M585 211L620 235L585 259" stroke="rgba(251,251,254,.88)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {[{x: 0, title: 'LOCAL DE ORIGEM', badge: 'SAÍDA'}, {x: 580, title: 'LOCAL DE DESTINO', badge: 'ENTRADA'}].map(({x, title, badge}, index) => (
            <div key={title} style={{position: 'absolute', left: x, top: 45, width: 320, height: 350, boxSizing: 'border-box', padding: '28px 24px', borderRadius: 24, background: 'rgba(20,22,58,.24)', border: '2px solid rgba(251,251,254,.4)'}}>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: WHITE}}>
                <span style={{fontFamily: SANS, fontSize: 17, fontWeight: 700, letterSpacing: 1.4}}>{title}</span>
                <span style={{padding: '6px 9px', borderRadius: 999, background: 'rgba(251,251,254,.13)', fontFamily: MONO, fontSize: 12, letterSpacing: 1}}>{badge}</span>
              </div>
              <div style={{position: 'absolute', left: 24, right: 24, top: 108, height: 7, borderRadius: 4, background: 'rgba(251,251,254,.74)'}} />
              <div style={{position: 'absolute', left: 35, top: 118, width: 8, height: 147, borderRadius: 5, background: 'rgba(251,251,254,.55)'}} />
              <div style={{position: 'absolute', right: 35, top: 118, width: 8, height: 147, borderRadius: 5, background: 'rgba(251,251,254,.55)'}} />
              <div style={{position: 'absolute', left: 24, right: 24, top: 260, height: 8, borderRadius: 4, background: 'rgba(251,251,254,.74)'}} />
              <div style={{position: 'absolute', left: 52, top: 153, width: 68, height: 64, borderRadius: 11, display: 'grid', placeItems: 'center', background: '#F2D9A8', color: NAVY, border: '2px solid rgba(20,22,58,.45)', opacity: index === 0 ? 1 - progress * .55 : 0}}><Package size={39} strokeWidth={1.9} /></div>
              <div style={{position: 'absolute', right: 50, top: 153, width: 68, height: 64, borderRadius: 11, display: 'grid', placeItems: 'center', background: '#F2D9A8', color: NAVY, border: '2px solid rgba(20,22,58,.45)', opacity: index === 0 ? 1 - progress : .35}}><Package size={39} strokeWidth={1.9} /></div>
            </div>
          ))}
          <div style={{position: 'absolute', left: 383, top: 102, width: 130, textAlign: 'center', color: WHITE, opacity: .9}}>
            <ArrowRightLeft size={54} strokeWidth={2.2} />
            <div style={{marginTop: 5, fontFamily: SANS, fontWeight: 700, fontSize: 14, letterSpacing: 1.4}}>TRANSFERÊNCIA</div>
          </div>
          <div style={{position: 'absolute', left: packageX, top: packageY, width: 78, height: 72, display: 'grid', placeItems: 'center', borderRadius: 16, background: '#F6DCA8', color: NAVY, border: '3px solid #FBFBFE', boxShadow: '0 12px 22px rgba(0,0,0,.22)', transform: 'translate(-50%,-50%)'}}><Package size={46} strokeWidth={1.9} /></div>
          <div style={{position: 'absolute', left: 795, top: 19, width: 58, height: 58, display: 'grid', placeItems: 'center', borderRadius: 99, background: '#168E9A', color: WHITE, opacity: check, transform: `scale(${.78 + check * .22})`, boxShadow: '0 10px 22px rgba(0,0,0,.2)'}}><Check size={34} strokeWidth={3} /></div>
        </div>
        <Foot tone="product" label="Norte Estoque" />
      </AbsoluteFill>
    </Produto>
  );
};

export const NorteEstoqueQR06: React.FC = () => <TransferenciasScene />;
export const NorteEstoqueQR06Animada: React.FC = () => <TransferenciasScene f={useCurrentFrame()} />;

/* 07 · Fechamento */
export const NorteEstoqueQR07: React.FC = () => {
  ensurePostLoaded();
  return (
    <Produto id="estoque">
      <AbsoluteFill>
        <Background tone="dark" id="ne-qr-grid-7" />
        <Img src={LOGO_ESTOQUE_BRANCO} style={{position: 'absolute', left: PAD, top: 92, height: 105, width: 'auto'}} />
        <span style={{position: 'absolute', right: PAD, top: 96, fontFamily: MONO, fontSize: 22, color: mute('dark')}}>07/07</span>
        <Eyebrow tone="dark" top={440}>Norte Estoque</Eyebrow>
        <Title tone="dark" top={495} size={80}>Estoque conferido. Operação no ritmo.</Title>
        <Support tone="dark" top={685} width={850} size={30}>
          Inventário, identificação e movimentação em um fluxo organizado para o dia a dia da operação.
        </Support>
        <div style={{position: 'absolute', left: PAD, right: PAD, top: 890, height: 1, background: 'rgba(251,251,254,.2)'}} />
        <div style={{position: 'absolute', left: PAD, right: PAD, top: 930, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <span style={{fontFamily: SANS, fontWeight: 700, fontSize: 22, letterSpacing: 2.5, textTransform: 'uppercase', color: WHITE}}>Conheça o Norte Estoque</span>
          <span style={{background: PAPER, color: NAVY, fontFamily: SANS, fontWeight: 700, fontSize: 28, padding: '22px 34px', borderRadius: 999}}>norteparanegocios.com.br →</span>
        </div>
        <div style={{position: 'absolute', right: 100, bottom: 180, color: 'rgba(251,251,254,.1)', transform: 'rotate(-8deg)'}}><QrCode size={200} strokeWidth={1.1} /></div>
        <Foot tone="dark" last label="Norte Estoque" />
      </AbsoluteFill>
    </Produto>
  );
};
