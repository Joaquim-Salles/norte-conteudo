import React from 'react';
import {AbsoluteFill, Img, interpolate, useCurrentFrame} from 'remotion';
import {Check, QrCode, Tag} from 'lucide-react';
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
  Paper,
  Produto,
  S,
  Support,
  TEXT2,
  Title,
  Top,
  WHITE,
  kit,
  mute,
} from '../lib/NortePost';

const LOGO_ESTOQUE_BRANCO = kit('01-logos/norte-estoque/horizontal/norte-estoque_horizontal_branco_transparente.png');
const TELA_INVENTARIO = kit('08-recursos/telas-oficiais/estoque/d-inventario.png');
const TELA_INVENTARIO_MOBILE = kit('08-recursos/telas-oficiais/estoque/m-inventario.png');
const TELA_IMPRESSOES = kit('08-recursos/telas-oficiais/estoque/d-impressoes.png');
const TELA_TRANSFERENCIAS = kit('08-recursos/telas-oficiais/estoque/d-transferencia.png');

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

const LaptopFrame: React.FC<{width: number; screenHeight: number; children: React.ReactNode}> = ({width, screenHeight, children}) => (
  <div data-device="laptop" style={{width, height: screenHeight + 40, display: 'flex', flexDirection: 'column', alignItems: 'center', filter: 'drop-shadow(0 20px 25px rgba(20,22,58,.20))'}}>
    <div style={{position: 'relative', width: '100%', padding: 12, boxSizing: 'border-box', borderRadius: 20, background: '#17182D', border: '2px solid rgba(20,22,58,.72)'}}>
      <div style={{position: 'relative', width: '100%', height: screenHeight, borderRadius: 8, overflow: 'hidden', background: '#F7F8FC'}}>
        {children}
      </div>
      <div style={{position: 'absolute', left: '50%', top: 6, width: 5, height: 5, borderRadius: 99, background: '#555775', transform: 'translateX(-50%)'}} />
    </div>
    <div style={{width: '106%', height: 25, marginTop: -1, clipPath: 'polygon(2% 0, 98% 0, 100% 72%, 96% 100%, 4% 100%, 0 72%)', borderRadius: '0 0 15px 15px', background: 'linear-gradient(180deg,#D7D8E4 0%,#AEB0C3 78%,#777A91 100%)', borderTop: '1px solid rgba(255,255,255,.76)'}} />
  </div>
);

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

/* 04 · A leitura chega ao inventário */
const RegistroScene: React.FC<{f?: number}> = ({f}) => {
  ensurePostLoaded();
  const pScreen = S(f, 10, {damping: 16, stiffness: 125, mass: 0.85});
  const highlight = f === undefined ? 0.82 : interpolate(f, [38, 50, 70, 82], [0, 1, 1, 0.82], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <Produto id="estoque">
      <AbsoluteFill>
        <Background tone="light" id="ne-qr-grid-4" />
        <Top n={4} total={7} tone="light" />
        <Eyebrow tone="light" top={195}>Conferência online</Eyebrow>
        <Title tone="light" top={245} size={78}>Da leitura ao inventário.</Title>
        <Support tone="light" top={355} width={850} size={29}>
          Acompanhe os produtos registrados e confira as informações na tela do inventário.
        </Support>
        <div style={{position: 'absolute', left: PAD - 16, top: 565, opacity: Math.min(1, pScreen * 1.3), transform: `translateY(${(1 - pScreen) * 155}px)`}}>
          <LaptopFrame width={910} screenHeight={554}>
            <Img src={TELA_INVENTARIO} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'left top', display: 'block'}} />
          </LaptopFrame>
          <div data-focus-target="inventory-row" style={{position: 'absolute', left: 198, top: 155, right: 26, height: 30, border: '3px solid #168E9A', borderRadius: 10, boxShadow: '0 0 0 5px rgba(22,142,154,.14)', opacity: highlight}} />
        </div>
        <div style={{position: 'absolute', right: 98, top: 475, width: 110, height: 110, borderRadius: 100, background: '#168E9A', color: WHITE, display: 'grid', placeItems: 'center', boxShadow: '0 12px 24px rgba(20,22,58,.18)', opacity: highlight, transform: `scale(${0.8 + highlight * 0.2})`}}><Check size={58} strokeWidth={3} /></div>
        <Foot tone="light" label="Norte Estoque" />
      </AbsoluteFill>
    </Produto>
  );
};

export const NorteEstoqueQR04: React.FC = () => <RegistroScene />;
export const NorteEstoqueQR04Animada: React.FC = () => <RegistroScene f={useCurrentFrame()} />;

/* 05 · Etiquetas com lote e validade */
const EtiquetaScene: React.FC<{f?: number}> = ({f}) => {
  ensurePostLoaded();
  const pLabel = S(f, 18, {damping: 15, stiffness: 140, mass: 0.8});
  return (
    <Produto id="estoque">
      <AbsoluteFill>
        <Background tone="dark" id="ne-qr-grid-5" />
        <Top n={5} total={7} tone="dark" />
        <Eyebrow tone="dark" top={195}>Identificação e rastreabilidade</Eyebrow>
        <Title tone="dark" top={245} size={78}>Lote e validade na etiqueta.</Title>
        <Support tone="dark" top={430} width={850} size={29}>
          Emita etiquetas com lote e validade para identificar produtos e acompanhar a operação.
        </Support>
        <div style={{position: 'absolute', left: PAD, top: 560}}>
          <Screen src={TELA_IMPRESSOES} width={690} />
        </div>
        <div style={{position: 'absolute', right: 100, top: 640, opacity: Math.min(1, pLabel * 1.25), transform: `translateY(${(1 - pLabel) * 140}px) rotate(2deg)`}}>
          <Paper width={300} style={{filter: 'drop-shadow(0 20px 30px rgba(0,0,0,.3))'}}>
            <div style={{padding: '26px 24px 32px'}}>
              <div style={{textAlign: 'center', fontFamily: SANS, fontWeight: 700, fontSize: 16, letterSpacing: 2, color: '#168E9A'}}>EXEMPLO</div>
              <div style={{display: 'flex', alignItems: 'center', gap: 12, marginTop: 22}}>
                <Tag size={32} color="#168E9A" />
                <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 21, color: NAVY}}>Produto de exemplo</div>
              </div>
              <div style={{marginTop: 18, borderTop: '1px dashed rgba(20,22,58,.25)', paddingTop: 14, fontFamily: MONO, fontSize: 18, lineHeight: 1.65, color: TEXT2}}>
                LOTE&nbsp;&nbsp; EX-001<br />VALIDADE&nbsp; 31/12/2026
              </div>
              <QrCode size={90} color={NAVY} style={{display: 'block', margin: '16px auto 0'}} />
            </div>
          </Paper>
        </div>
        <Foot tone="dark" label="Norte Estoque" />
      </AbsoluteFill>
    </Produto>
  );
};

export const NorteEstoqueQR05: React.FC = () => <EtiquetaScene />;
export const NorteEstoqueQR05Animada: React.FC = () => <EtiquetaScene f={useCurrentFrame()} />;

/* 04 · Transferências em massa online */
const TransferenciasScene: React.FC<{f?: number}> = ({f}) => {
  ensurePostLoaded();
  const pScreen = S(f, 14, {damping: 17, stiffness: 110, mass: 0.9});
  const highlight = f === undefined ? 0 : interpolate(f, [42, 52, 68, 78], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const zoom = f === undefined ? 1 : 1 + 0.018 * Math.min(1, f / 76);
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
            Faça transferências em massa online entre locais de estoque, com a movimentação registrada no sistema.
          </Support>
        </Fx>
        <div style={{position: 'absolute', left: PAD - 6, top: 560, opacity: Math.min(1, pScreen * 1.3), transform: `translateY(${(1 - pScreen) * 150}px) scale(${zoom})`, transformOrigin: '50% 60%'}}>
          <Screen src={TELA_TRANSFERENCIAS} width={910} />
          <div data-focus-target="inventory-row" style={{position: 'absolute', left: 202, right: 18, top: 180, height: 30, border: '3px solid rgba(22,142,154,.9)', borderRadius: 10, boxShadow: '0 0 0 5px rgba(22,142,154,.14)', opacity: highlight}} />
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
