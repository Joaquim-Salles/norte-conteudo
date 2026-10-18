import React from 'react';
import {AbsoluteFill, Img, interpolate, useCurrentFrame} from 'remotion';
import {QrCode, Tag} from 'lucide-react';
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
        <span style={{position: 'absolute', right: PAD, top: 96, fontFamily: MONO, fontSize: 22, color: mute('product')}}>01/05</span>
        <Eyebrow tone="product" top={410}>Inventário · etiquetas · transferências</Eyebrow>
        <Title tone="product" top={468} size={84}>O inventário ainda é planilha?</Title>
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
        <Top n={2} tone="light" />
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
          <div style={{position: 'absolute', left: 552, top: 102, width: 205, height: 54, border: '3px solid #168E9A', borderRadius: 16, boxShadow: '0 0 0 7px rgba(22,142,154,.16)', opacity: focus}} />
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

/* 03 · Etiquetas com lote e validade */
const EtiquetaScene: React.FC<{f?: number}> = ({f}) => {
  ensurePostLoaded();
  const pLabel = S(f, 18, {damping: 15, stiffness: 140, mass: 0.8});
  return (
    <Produto id="estoque">
      <AbsoluteFill>
        <Background tone="dark" id="ne-qr-grid-3" />
        <Top n={3} tone="dark" />
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

export const NorteEstoqueQR03: React.FC = () => <EtiquetaScene />;
export const NorteEstoqueQR03Animada: React.FC = () => <EtiquetaScene f={useCurrentFrame()} />;

/* 04 · Transferências em massa online */
const TransferenciasScene: React.FC<{f?: number}> = ({f}) => {
  ensurePostLoaded();
  const pScreen = S(f, 14, {damping: 17, stiffness: 110, mass: 0.9});
  const highlight = f === undefined ? 0 : interpolate(f, [42, 52, 68, 78], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const zoom = f === undefined ? 1 : 1 + 0.018 * Math.min(1, f / 76);
  return (
    <Produto id="estoque">
      <AbsoluteFill>
        <Background tone="product" id="ne-qr-grid-4" />
        <Top n={4} tone="product" />
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
          <div style={{position: 'absolute', left: 138, right: 18, top: 162, height: 80, border: '3px solid rgba(22,142,154,.9)', borderRadius: 14, boxShadow: '0 0 0 6px rgba(22,142,154,.18)', opacity: highlight}} />
        </div>
        <Foot tone="product" label="Norte Estoque" />
      </AbsoluteFill>
    </Produto>
  );
};

export const NorteEstoqueQR04: React.FC = () => <TransferenciasScene />;
export const NorteEstoqueQR04Animada: React.FC = () => <TransferenciasScene f={useCurrentFrame()} />;

/* 05 · Fechamento e posicionamento */
export const NorteEstoqueQR05: React.FC = () => {
  ensurePostLoaded();
  return (
    <Produto id="estoque">
      <AbsoluteFill>
        <Background tone="dark" id="ne-qr-grid-5" />
        <Img src={LOGO_ESTOQUE_BRANCO} style={{position: 'absolute', left: PAD, top: 92, height: 105, width: 'auto'}} />
        <span style={{position: 'absolute', right: PAD, top: 96, fontFamily: MONO, fontSize: 22, color: mute('dark')}}>05/05</span>
        <Eyebrow tone="dark" top={440}>Norte Estoque</Eyebrow>
        <Title tone="dark" top={495} size={80}>Controle físico integrado ao Omie.</Title>
        <Support tone="dark" top={685} width={850} size={30}>
          O Norte Estoque complementa o Omie na rotina de inventários, etiquetas, transferências e produção.
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
