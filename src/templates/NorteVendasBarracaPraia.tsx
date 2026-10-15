import React from 'react';
import {AbsoluteFill, Img, interpolate, useCurrentFrame} from 'remotion';
import {ArrowRight, ChefHat, ClipboardList} from 'lucide-react';
import {ensurePostLoaded, FONT_POST as SANS, FONT_POST_MONO as MONO} from '../lib/fonts';
import {
  Background,
  Eyebrow,
  Foot,
  LOGO_NEGOCIOS_AZUL,
  LOGO_NEGOCIOS_BRANCO,
  NAVY,
  PAD,
  Produto,
  Support,
  Title,
  VENDAS,
  WHITE,
  ease,
  kit,
  mute,
} from '../lib/NortePost';

const TOTAL = 8;
const SALES_LOGO = kit('01-logos/norte-vendas/horizontal/norte-vendas_horizontal_branco_transparente.png');
const SCREEN_TABLES = kit('08-recursos/telas-oficiais/vendas/d-mesas.png');
const SCREEN_DASHBOARD = kit('08-recursos/telas-oficiais/vendas/d-dashboard.png');
const SCREEN_MOBILE_TABLES = kit('08-recursos/telas-oficiais/vendas/m-g-mesas.png');
const FLOOR_PHOTO = kit('08-recursos/fotos-reais/norte-vendas-barraca-operacao.png');

const PageTop: React.FC<{n: number; tone: 'light' | 'dark' | 'product'}> = ({n, tone}) => (
  <div style={{position: 'absolute', left: PAD, right: PAD, top: 66, height: 62, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
    <Img src={tone === 'light' ? LOGO_NEGOCIOS_AZUL : LOGO_NEGOCIOS_BRANCO} style={{height: 62, width: 'auto'}} />
    <span style={{fontFamily: MONO, fontSize: 22, color: mute(tone)}}>{String(n).padStart(2, '0')}/{String(TOTAL).padStart(2, '0')}</span>
  </div>
);

const LaptopFrame: React.FC<{width: number; screenHeight: number; children: React.ReactNode}> = ({width, screenHeight, children}) => (
  <div style={{width, height: screenHeight + 40, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', filter: 'drop-shadow(0 20px 25px rgba(20,22,58,.20))'}}>
    <div style={{width: '100%', padding: 12, boxSizing: 'border-box', borderRadius: 20, background: '#17182D', border: '2px solid rgba(20,22,58,.72)'}}>
      <div style={{position: 'relative', width: '100%', height: screenHeight, borderRadius: 8, overflow: 'hidden', background: '#F7F8FC'}}>
        {children}
      </div>
      <div style={{position: 'absolute', left: '50%', top: 6, width: 5, height: 5, borderRadius: 99, background: '#555775', transform: 'translateX(-50%)'}} />
    </div>
    <div style={{width: '106%', height: 25, marginTop: -1, clipPath: 'polygon(2% 0, 98% 0, 100% 72%, 96% 100%, 4% 100%, 0 72%)', borderRadius: '0 0 15px 15px', background: 'linear-gradient(180deg,#D7D8E4 0%,#AEB0C3 78%,#777A91 100%)', borderTop: '1px solid rgba(255,255,255,.76)'}} />
  </div>
);

type DeviceEntranceProps = {
  frame?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

const DeviceEntrance: React.FC<DeviceEntranceProps> = ({frame, children, style}) => {
  const progress = frame === undefined ? 1 : interpolate(frame, [0, 18], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease});
  const y = 90 * (1 - progress);
  const scale = .96 + .04 * progress;
  return <div style={{opacity: progress, transform: `translate3d(0, ${y}px, 0) scale(${scale})`, transformOrigin: 'center bottom', ...style}}>{children}</div>;
};

const PhoneFrame: React.FC = () => (
  <div style={{width: 202, height: 422, padding: 8, boxSizing: 'border-box', borderRadius: 28, background: '#17182D', border: '2px solid rgba(20,22,58,.72)', boxShadow: '0 18px 28px rgba(20,22,58,.20)'}}>
    <div style={{position: 'relative', width: '100%', height: '100%', overflow: 'hidden', borderRadius: 21, background: '#F7F8FC'}}>
      <Img src={SCREEN_MOBILE_TABLES} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block'}} />
      <div style={{position: 'absolute', top: 5, left: '50%', width: 44, height: 7, transform: 'translateX(-50%)', borderRadius: 8, background: '#17182D'}} />
    </div>
  </div>
);

const BeachStandHero: React.FC = () => (
  <svg width="100%" height="100%" viewBox="0 0 908 280" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Ilustração de uma barraca de praia em funcionamento" style={{display: 'block'}}>
    <path d="M0 112C135 93 216 116 321 105C431 94 538 116 654 105C754 95 832 101 908 91V280H0V112Z" fill="#D8B77D" opacity=".97" />
    <path d="M0 102C104 84 207 108 309 96C415 83 521 105 622 95C729 83 825 93 908 78V126C805 137 723 125 617 137C504 150 415 127 310 141C198 156 101 131 0 151V102Z" fill="#62BFC5" opacity=".92" />
    <path d="M0 122C99 106 207 130 307 116M604 116C709 104 809 122 908 102" stroke="#D8F1E9" strokeWidth="5" strokeLinecap="round" opacity=".8" />
    <path d="M36 197C164 173 243 204 337 186M570 193C674 172 775 199 872 176M66 255C184 232 247 260 335 242M570 252C681 230 772 256 842 238" stroke="#F3D99E" strokeWidth="4" strokeLinecap="round" opacity=".7" />

    <g transform="translate(150 148)" data-scene-object="beach-umbrella">
      <path d="M-66 0C-60-42-31-66 0-66C31-66 60-42 66 0H-66Z" fill="#FFF2CE" />
      <path d="M-66 0C-60-42-31-66 0-66V0H-66Z" fill="#F5A767" />
      <path d="M0-66V0M-35-55L-23 0M35-55L23 0" stroke="#484DB5" strokeWidth="3" opacity=".75" />
      <path d="M0 0V64M-22 66H22" stroke="#484DB5" strokeWidth="5" strokeLinecap="round" />
      <ellipse cx="0" cy="67" rx="31" ry="9" fill="#C79C5E" stroke="#FFF2CE" strokeWidth="3" />
    </g>

    <g transform="translate(758 148) scale(.88)" data-scene-object="beach-umbrella">
      <path d="M-66 0C-60-42-31-66 0-66C31-66 60-42 66 0H-66Z" fill="#FFF2CE" />
      <path d="M0-66C31-66 60-42 66 0H0V-66Z" fill="#F5A767" />
      <path d="M0-66V0M-35-55L-23 0M35-55L23 0" stroke="#484DB5" strokeWidth="3" opacity=".75" />
      <path d="M0 0V64M-22 66H22" stroke="#484DB5" strokeWidth="5" strokeLinecap="round" />
      <ellipse cx="0" cy="67" rx="31" ry="9" fill="#C79C5E" stroke="#FFF2CE" strokeWidth="3" />
    </g>

    <g transform="translate(270 208)" data-furniture="sun-lounger">
      <path d="M-39-4L-23-35L-9-28L-24 1Z" fill="#F5A767" stroke="#FBFBFE" strokeWidth="4" strokeLinejoin="round" />
      <path d="M-24 1H41V13H-24Z" fill="#FFF2CE" stroke="#FBFBFE" strokeWidth="4" strokeLinejoin="round" />
      <path d="M-34-13L-25-9M-29-22L-20-18M-24-31L-16-27M-11 2V11M7 2V11M25 2V11" stroke="#484DB5" strokeWidth="3" strokeLinecap="round" />
      <path d="M-28 13L-40 33M34 13L43 33M-40 33H43M-8 13L4 33" stroke="#292D7D" strokeWidth="5" strokeLinecap="round" />
      <rect x="-35" y="-40" width="16" height="8" rx="4" fill="#FBFBFE" stroke="#484DB5" strokeWidth="2" />
    </g>
    <g transform="translate(650 208) scale(-1 1)" data-furniture="sun-lounger">
      <path d="M-39-4L-23-35L-9-28L-24 1Z" fill="#F5A767" stroke="#FBFBFE" strokeWidth="4" strokeLinejoin="round" />
      <path d="M-24 1H41V13H-24Z" fill="#FFF2CE" stroke="#FBFBFE" strokeWidth="4" strokeLinejoin="round" />
      <path d="M-34-13L-25-9M-29-22L-20-18M-24-31L-16-27M-11 2V11M7 2V11M25 2V11" stroke="#484DB5" strokeWidth="3" strokeLinecap="round" />
      <path d="M-28 13L-40 33M34 13L43 33M-40 33H43M-8 13L4 33" stroke="#292D7D" strokeWidth="5" strokeLinecap="round" />
      <rect x="-35" y="-40" width="16" height="8" rx="4" fill="#FBFBFE" stroke="#484DB5" strokeWidth="2" />
    </g>

    <g transform="translate(454 162)" data-scene-object="beach-stall-front">
      <path d="M-140-54L-112-122H112L140-54Z" fill="#FFF2CE" stroke="#FBFBFE" strokeWidth="4" strokeLinejoin="round" data-roof="striped-awning" />
      <path d="M-112-122H-67L-48-54H-137ZM-48-122H-4L3-54H-29ZM21-122H65L49-54H5ZM67-122H112L137-54H95Z" fill="#F5A767" />
      <path d="M-140-54H140V-30H-140Z" fill="#F5A767" stroke="#FBFBFE" strokeWidth="4" />
      <path d="M-105-54V-31M-70-54V-31M-35-54V-31M0-54V-31M35-54V-31M70-54V-31M105-54V-31" stroke="#FFF2CE" strokeWidth="4" />
      <text x="0" y="-36" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="700" letterSpacing="1.4" fill="#292D7D">BARRACA</text>
      <rect x="-86" y="-30" width="172" height="105" rx="8" fill="#292D7D" stroke="#FBFBFE" strokeWidth="4" />
      <rect x="-68" y="-12" width="136" height="55" rx="4" fill="#484DB5" stroke="#FFF2CE" strokeWidth="4" />
      <path d="M-36 0H36M-36 16H36" stroke="#62BFC5" strokeWidth="5" strokeLinecap="round" />
      <rect x="-105" y="70" width="210" height="22" rx="6" fill="#FBFBFE" stroke="#D8B77D" strokeWidth="3" />
      <rect x="-92" y="92" width="184" height="23" rx="5" fill="#484DB5" stroke="#FBFBFE" strokeWidth="3" />
      <path d="M-55 94V113M-18 94V113M18 94V113M55 94V113" stroke="#AEB4F6" strokeWidth="3" />
    </g>
  </svg>
);

const BeachAreaMap: React.FC = () => (
  <svg width="100%" height="100%" viewBox="0 0 908 470" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Vista ilustrada das mesas e guarda-sóis com pedidos seguindo para a cozinha" style={{display: 'block'}}>
    <defs>
      <clipPath id="beach-area-boundary"><rect x="24" y="22" width="860" height="426" rx="22" /></clipPath>
    </defs>
    <g clipPath="url(#beach-area-boundary)">
      <rect x="24" y="22" width="860" height="426" fill="#D8B77D" />
      <path d="M24 22H884V98C806 82 742 101 667 89C579 74 508 100 421 84C331 68 264 98 174 82C118 72 70 83 24 92V22Z" fill="#62BFC5" />
      <path d="M28 84C112 69 161 91 244 77M373 79C447 65 519 92 591 77M710 79C769 70 824 84 880 71" stroke="#D8F1E9" strokeWidth="5" strokeLinecap="round" />
      <path d="M44 115C170 91 280 113 396 101C533 86 663 111 856 94" stroke="#F2D59A" strokeWidth="3" strokeDasharray="7 13" opacity=".9" />
      <path d="M44 410C154 392 245 412 347 400M566 405C686 390 765 411 858 390" stroke="#F2D59A" strokeWidth="3" strokeDasharray="7 13" opacity=".9" />

      <path d="M250 184C369 184 536 207 766 248M300 292C418 287 585 270 766 248M436 169C536 187 652 220 766 248M558 334C636 307 714 269 766 248" stroke="#484DB5" strokeWidth="5" strokeDasharray="8 12" opacity=".8" />

      {[
        {x: 250, y: 184, r: 39},
        {x: 300, y: 292, r: 37},
        {x: 436, y: 169, r: 34},
        {x: 558, y: 334, r: 36},
      ].map(({x, y, r}, index) => (
        <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
          <g data-scene-object="beach-umbrella" data-zone="middle-sand">
            <circle r={r} fill="#FFF2CE" stroke="#484DB5" strokeWidth="3" />
            <path d={`M0 0L0 ${-r}A${r} ${r} 0 0 1 ${r} 0Z`} fill="#F5A767" />
            <path d={`M0 0L0 ${r}A${r} ${r} 0 0 1 ${-r} 0Z`} fill="#F5A767" />
            <path d={`M0 ${-r}V${r}M${-r} 0H${r}M${-r * .72} ${-r * .72}L${r * .72} ${r * .72}M${r * .72} ${-r * .72}L${-r * .72} ${r * .72}`} stroke="#484DB5" strokeWidth="2" opacity=".7" />
          </g>
          <g data-scene-object="beach-table">
            <circle r="17" fill="#FBFBFE" stroke="#484DB5" strokeWidth="3" />
            <circle cx="-5" cy="-3" r="2.5" fill="#62BFC5" />
            <circle cx="5" cy="3" r="2.5" fill="#F5A767" />
          </g>
          <g data-scene-object="beach-chair">
            {[0, 90, 180, 270].map((rotation) => (
              <g key={rotation} transform={`rotate(${rotation}) translate(0 ${-(r + 19)})`}>
                <path d="M-8-10L-10 14M8-10L10 14" stroke="#484DB5" strokeWidth="3" strokeLinecap="round" />
                <rect x="-10" y="-11" width="20" height="22" rx="5" fill="#F5A767" stroke="#484DB5" strokeWidth="2.5" />
                <rect x="-12" y="-19" width="24" height="9" rx="4" fill="#FBFBFE" stroke="#484DB5" strokeWidth="2.5" />
                <path d="M-6-5H6M-6 1H6" stroke="#FFF2CE" strokeWidth="2" strokeLinecap="round" />
              </g>
            ))}
          </g>
        </g>
      ))}

      <g transform="translate(766 248)" data-scene-object="kitchen-route-endpoint">
        <rect x="-58" y="-34" width="116" height="68" rx="12" fill="#FBFBFE" stroke="#484DB5" strokeWidth="4" />
        <rect x="-40" y="-16" width="19" height="31" rx="3" fill="#F5A767" />
        <path d="M-34-8H-27M-34-1H-27M-34 6H-27" stroke="#FBFBFE" strokeWidth="2" strokeLinecap="round" />
        <text x="6" y="3" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="700" letterSpacing="1" fill="#292D7D">COZINHA</text>
        <circle cx="43" cy="-20" r="4" fill="#62BFC5" />
      </g>
    </g>
  </svg>
);

const CoverScene: React.FC = () => {
  ensurePostLoaded();
  return <Produto id="vendas"><AbsoluteFill>
    <Background tone="product" id="barraca-cover-grid" />
    <Img src={SALES_LOGO} style={{position: 'absolute', left: PAD, top: 74, height: 76, width: 'auto'}} />
    <span style={{position: 'absolute', right: PAD, top: 92, fontFamily: MONO, fontSize: 22, color: mute('product')}}>01/08</span>
    <Eyebrow tone="product" top={230}>Norte Vendas para barracas de praia</Eyebrow>
    <h1 style={{position: 'absolute', left: PAD, right: PAD, top: 292, margin: 0, fontFamily: SANS, fontWeight: 700, fontSize: 70, lineHeight: 1.04, letterSpacing: -1.75, color: WHITE}}>
      Dono de barraca,<br />seus pedidos chegam<br />direto à cozinha?
    </h1>
    <p style={{position: 'absolute', left: PAD, top: 552, width: 890, margin: 0, fontFamily: SANS, fontSize: 27, lineHeight: 1.42, color: 'rgba(251,251,254,.86)'}}>
      Pedidos online chegam direto a quem prepara. E o gerente acompanha o que a equipe está fazendo.
    </p>
    <div style={{position: 'absolute', left: PAD, top: 770, width: 908, height: 280}}><BeachStandHero /></div>
    <Foot tone="product" />
  </AbsoluteFill></Produto>;
};

const MobileRoutineScene: React.FC = () => {
  ensurePostLoaded();
  return <Produto id="vendas"><AbsoluteFill>
    <Background tone="dark" id="barraca-routine-grid" />
    <PageTop n={2} tone="dark" />
    <Eyebrow tone="dark" top={190}>A rotina da barraca</Eyebrow>
    <h1 style={{position: 'absolute', left: PAD, top: 250, width: 908, margin: 0, fontFamily: SANS, fontWeight: 700, fontSize: 43, lineHeight: 1.1, letterSpacing: -1.1, color: WHITE}}>O atendimento acontece por toda<br />a barraca. O pedido não precisa se perder.</h1>
    <p style={{position: 'absolute', left: PAD, top: 365, width: 900, margin: 0, fontFamily: SANS, fontSize: 27, lineHeight: 1.42, color: 'rgba(251,251,254,.82)'}}>
      Enquanto a equipe circula entre clientes e mesas, os pedidos registrados no Norte Vendas seguem pelo fluxo online até quem prepara.
    </p>
    <div style={{position: 'absolute', left: PAD, top: 570, width: 908, height: 470}}><BeachAreaMap /></div>
    <Foot tone="dark" label="Norte Vendas" />
  </AbsoluteFill></Produto>;
};

const TablesScene: React.FC<{frame?: number}> = ({frame}) => {
  ensurePostLoaded();
  return <Produto id="vendas"><AbsoluteFill>
    <Background tone="light" id="barraca-tables-grid" />
    <PageTop n={3} tone="light" />
    <Eyebrow tone="light" top={185} frame={frame}>Norte Vendas na operação</Eyebrow>
    <Title tone="light" top={245} size={66} frame={frame}>Mesas e comandas em uma só tela.</Title>
    <Support tone="light" top={385} width={900} size={27} frame={frame}>A equipe registra os pedidos no sistema e acompanha as comandas durante o atendimento. Veja a tela real do Norte Vendas em uso.</Support>
    <div style={{position: 'absolute', left: PAD, top: 610, width: 908, height: 500, display: 'flex', gap: 20, alignItems: 'center', justifyContent: 'center'}}>
      <DeviceEntrance frame={frame} style={{display: 'flex', alignItems: 'center'}}>
        <LaptopFrame width={640} screenHeight={385}>
          <Img src={SCREEN_TABLES} style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}} />
        </LaptopFrame>
      </DeviceEntrance>
      <DeviceEntrance frame={frame === undefined ? undefined : Math.max(0, frame - 10)} style={{alignSelf: 'center'}}>
        <PhoneFrame />
      </DeviceEntrance>
    </div>
    <Foot tone="light" label="Norte Vendas" />
  </AbsoluteFill></Produto>;
};

const KitchenFlowScene: React.FC<{frame?: number}> = ({frame}) => {
  ensurePostLoaded();
  const progress = frame === undefined ? 1 : interpolate(frame, [10, 52], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease});
  const arrived = frame === undefined ? 1 : interpolate(frame, [49, 58, 80], [0, 1, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease});
  const orderX = 290 + progress * 328;
  const routeY = 88;
  return <Produto id="vendas"><AbsoluteFill>
    <Background tone="dark" id="barraca-kitchen-grid" />
    <PageTop n={4} tone="dark" />
    <Eyebrow tone="dark" top={185} frame={frame}>Do atendimento à cozinha</Eyebrow>
    <Title tone="dark" top={245} size={68} frame={frame}>O pedido segue online até quem prepara.</Title>
    <Support tone="dark" top={405} width={890} size={27} frame={frame}>A equipe registra no Norte Vendas. A cozinha recebe a informação pelo sistema, sem depender de um recado levado de um lado para o outro.</Support>
    <div style={{position: 'absolute', left: PAD, right: PAD, top: 735, height: 380}}>
      <svg width="100%" height="140" viewBox="0 0 908 140" fill="none" xmlns="http://www.w3.org/2000/svg" style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
        <path d={`M290 ${routeY}H618`} stroke="rgba(251,251,254,.24)" strokeWidth="5" strokeLinecap="round" />
        <path d={`M290 ${routeY}H618`} stroke="#B9BCEB" strokeWidth="5" strokeLinecap="round" strokeDasharray="328" strokeDashoffset={328 * (1 - progress)} />
        <circle cx="290" cy={routeY} r="18" fill="#484DB5" stroke="#FBFBFE" strokeWidth="4" />
        <circle cx="618" cy={routeY} r="18" fill="#484DB5" stroke="#FBFBFE" strokeWidth="4" opacity={arrived} />
        <circle cx={orderX} cy={routeY} r="15" fill="#FBFBFE" opacity={frame === undefined ? 0 : progress * (1 - arrived)} />
      </svg>
      <div style={{position: 'absolute', left: 20, top: 0, width: 245, height: 176, border: '1px solid rgba(251,251,254,.27)', borderRadius: 20, background: 'rgba(251,251,254,.08)', color: WHITE, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, fontFamily: SANS, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase'}}>
        <ClipboardList size={39} color="#B9BCEB" /><span>Pedido registrado</span><span style={{fontFamily: MONO, color: '#B9BCEB', fontSize: 14}}>ONLINE</span>
      </div>
      <div style={{position: 'absolute', right: 20, top: 0, width: 245, height: 176, border: `1px solid rgba(251,251,254,${.24 + arrived * .55})`, borderRadius: 20, background: `rgba(72,77,181,${.10 + arrived * .20})`, color: WHITE, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, fontFamily: SANS, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase'}}>
        <ChefHat size={39} color="#B9BCEB" /><span>Cozinha informada</span><span style={{fontFamily: MONO, color: '#B9BCEB', fontSize: 14}}>PEDIDO RECEBIDO</span>
      </div>
    </div>
    <Foot tone="dark" label="Norte Vendas" />
  </AbsoluteFill></Produto>;
};

const RealOperationScene: React.FC = () => {
  ensurePostLoaded();
  return <Produto id="vendas"><AbsoluteFill>
    <Background tone="light" id="barraca-operation-grid" />
    <PageTop n={5} tone="light" />
    <Eyebrow tone="light" top={185}>Na rotina de verdade</Eyebrow>
    <Title tone="light" top={245} size={67}>O Norte Vendas está onde a equipe trabalha.</Title>
    <Support tone="light" top={405} width={900} size={27}>Uma visão real do sistema aberto durante a operação, com mesas e comandas na tela do notebook.</Support>
    <div style={{position: 'absolute', left: PAD, top: 585, width: 908, height: 590, borderRadius: 22, overflow: 'hidden', background: '#191A21', boxShadow: '0 24px 55px rgba(20,22,58,.18)'}}>
      <Img src={FLOOR_PHOTO} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 50%', display: 'block'}} />
      <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 65%, rgba(13,15,49,.46) 100%)'}} />
      <div style={{position: 'absolute', right: 24, bottom: 18, color: WHITE, fontFamily: MONO, fontSize: 15, letterSpacing: 1.5}}>TELA REAL • OPERAÇÃO REAL</div>
    </div>
    <Foot tone="light" label="Norte Vendas" />
  </AbsoluteFill></Produto>;
};

const ManagerScene: React.FC<{frame?: number}> = ({frame}) => {
  ensurePostLoaded();
  return <Produto id="vendas"><AbsoluteFill>
    <Background tone="dark" id="barraca-manager-grid" />
    <PageTop n={6} tone="dark" />
    <Eyebrow tone="dark" top={185} frame={frame}>Visibilidade para o gerente</Eyebrow>
    <Title tone="dark" top={245} size={67} frame={frame}>Acompanhe o que a equipe está fazendo.</Title>
    <Support tone="dark" top={405} width={890} size={27} frame={frame}>No painel do Norte Vendas, o gerente pode ver quem está trabalhando e consultar o histórico por operador. Mais visibilidade para acompanhar os registros durante a operação.</Support>
    <div style={{position: 'absolute', left: PAD, top: 600, width: 908, height: 560, display: 'grid', placeItems: 'center'}}>
      <DeviceEntrance frame={frame}>
      <LaptopFrame width={850} screenHeight={516}>
        <Img src={SCREEN_DASHBOARD} style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}} />
      </LaptopFrame>
      </DeviceEntrance>
    </div>
    <Foot tone="dark" label="Norte Vendas" />
  </AbsoluteFill></Produto>;
};

const ReceiptPrintScene: React.FC<{frame?: number}> = ({frame}) => {
  ensurePostLoaded();
  const progress = frame === undefined ? 1 : interpolate(frame, [10, 68], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease});
  const ticketHeight = progress * 348;
  return <Produto id="vendas"><AbsoluteFill>
    <Background tone="product" id="barraca-receipt-grid" />
    <PageTop n={7} tone="product" />
    <Eyebrow tone="product" top={185} frame={frame}>Fechamento da venda</Eyebrow>
    <Title tone="product" top={240} size={62} frame={frame}>A nota fiscal sai no fechamento.</Title>
    <Support tone="product" top={370} width={890} size={25} frame={frame}>Demonstração visual de uma NFC-e emitida pelo Norte Vendas.</Support>

    <div style={{position: 'absolute', left: 78, top: 625, width: 624, height: 430, display: 'grid', placeItems: 'center'}}>
      <DeviceEntrance frame={frame}>
      <LaptopFrame width={590} screenHeight={354}>
        <Img src={SCREEN_TABLES} style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}} />
      </LaptopFrame>
      </DeviceEntrance>
    </div>

    <div style={{position: 'absolute', left: 744, top: 704, width: 232, height: 426, zIndex: 3}}>
    <div style={{position: 'absolute', inset: '0 auto auto 0', width: 232, height: 84, borderRadius: '14px 14px 8px 8px', background: '#17182D', boxShadow: '0 15px 28px rgba(10,12,50,.25)', border: '1px solid rgba(251,251,254,.3)'}}>
      <div style={{position: 'absolute', left: 20, right: 20, top: 15, height: 10, borderRadius: 8, background: '#30324C'}} />
      <div style={{position: 'absolute', left: 28, right: 28, bottom: 14, height: 9, borderRadius: 99, background: '#090A15'}} />
      <div style={{position: 'absolute', right: 12, top: 12, width: 7, height: 7, borderRadius: 99, background: '#69C5A8'}} />
    </div>
    <div style={{position: 'absolute', left: 26, top: 76, width: 182, height: ticketHeight, overflow: 'hidden', zIndex: 3, boxShadow: '0 14px 30px rgba(10,12,50,.23)'}}>
      <div style={{width: '100%', minHeight: 348, padding: '18px 15px 22px', boxSizing: 'border-box', background: '#FBFBFE', color: NAVY, fontFamily: MONO, borderLeft: '1px dashed #C7C9D7', borderRight: '1px dashed #C7C9D7'}}>
        <div style={{textAlign: 'center', fontSize: 20, letterSpacing: 3, color: VENDAS, fontWeight: 700}}>NTB</div>
        <div style={{textAlign: 'center', marginTop: 5, fontSize: 10, color: '#72758B'}}>DANFE NFC-e • EXEMPLO</div>
        <div style={{textAlign: 'center', marginTop: 8, fontSize: 11, fontWeight: 700}}>BARRACA EXEMPLO</div>
        <div style={{marginTop: 12, borderTop: '1px dashed #A8AAC0', paddingTop: 9, fontSize: 10, display: 'flex', justifyContent: 'space-between'}}><span>Porção exemplo</span><span>00,00</span></div>
        <div style={{marginTop: 6, fontSize: 10, display: 'flex', justifyContent: 'space-between'}}><span>Bebida exemplo</span><span>00,00</span></div>
        <div style={{marginTop: 9, borderTop: '1px dashed #A8AAC0', paddingTop: 8, fontSize: 11, fontWeight: 700, display: 'flex', justifyContent: 'space-between'}}><span>TOTAL</span><span>R$ 00,00</span></div>
        <svg style={{display: 'block', margin: '14px auto 0', padding: 4, background: WHITE, outline: '1px solid #D7D8E1'}} width="68" height="68" viewBox="0 0 21 21" shapeRendering="crispEdges" aria-label="QR de exemplo">
          <rect width="21" height="21" fill={WHITE} />
          {[1, 13].map((x) => <g key={`top-${x}`}><rect x={x} y="1" width="7" height="7" fill={NAVY} /><rect x={x + 1} y="2" width="5" height="5" fill={WHITE} /><rect x={x + 2} y="3" width="3" height="3" fill={NAVY} /></g>)}
          <g><rect x="1" y="13" width="7" height="7" fill={NAVY} /><rect x="2" y="14" width="5" height="5" fill={WHITE} /><rect x="3" y="15" width="3" height="3" fill={NAVY} /></g>
          {[[9,1],[10,3],[8,5],[10,7],[9,9],[12,9],[8,11],[10,12],[12,13],[9,15],[11,16],[8,18],[12,19],[15,10],[17,12],[14,15],[18,16],[15,19],[19,9]].map(([x, y], index) => <rect key={index} x={x} y={y} width="1" height="1" fill={NAVY} />)}
        </svg>
        <div style={{textAlign: 'center', marginTop: 8, fontSize: 8, color: '#72758B'}}>QR DE EXEMPLO • DADOS FICTÍCIOS</div>
        <div style={{textAlign: 'center', marginTop: 5, fontSize: 8, color: '#72758B'}}>REPRESENTAÇÃO ILUSTRATIVA</div>
      </div>
    </div>
    </div>
    <Foot tone="product" label="Norte Vendas" />
  </AbsoluteFill></Produto>;
};

const ClosingScene: React.FC = () => {
  ensurePostLoaded();
  return <Produto id="vendas"><AbsoluteFill>
    <Background tone="dark" id="barraca-closing-grid" />
    <Img src={SALES_LOGO} style={{position: 'absolute', left: PAD, top: 74, height: 76, width: 'auto'}} />
    <span style={{position: 'absolute', right: PAD, top: 92, fontFamily: MONO, fontSize: 22, color: mute('dark')}}>08/08</span>
    <Eyebrow tone="dark" top={325}>Norte Vendas para barracas de praia</Eyebrow>
    <Title tone="dark" top={390} size={76}>Pedido na equipe.<br />Cozinha informada.<br />Gerente com visibilidade.</Title>
    <Support tone="dark" top={650} width={880} size={29}>Conheça o Norte Vendas e veja como o sistema pode acompanhar o ritmo da operação da sua barraca.</Support>
    <div style={{position: 'absolute', left: PAD, top: 915, display: 'flex', alignItems: 'center', gap: 20, padding: '22px 30px', borderRadius: 999, background: WHITE, color: NAVY, fontFamily: SANS, fontSize: 23, fontWeight: 700}}>
      Acesse o link da bio <ArrowRight size={24} color={VENDAS} />
    </div>
    <div style={{position: 'absolute', left: PAD, right: PAD, bottom: 136, display: 'flex', alignItems: 'center', gap: 14, color: '#D9DBFF', fontFamily: SANS, fontSize: 19, fontWeight: 700, letterSpacing: 1.1, textTransform: 'uppercase'}}>
      Dê um norte ao seu negócio <span style={{fontSize: 24}}>🚀</span>
    </div>
    <Foot tone="dark" last label="Norte Vendas" />
  </AbsoluteFill></Produto>;
};

export const NorteVendasBarraca01: React.FC = CoverScene;
export const NorteVendasBarraca02: React.FC = MobileRoutineScene;
export const NorteVendasBarraca03: React.FC = () => <TablesScene />;
export const NorteVendasBarraca03Animada: React.FC = () => <TablesScene frame={useCurrentFrame()} />;
export const NorteVendasBarraca04: React.FC = () => <KitchenFlowScene />;
export const NorteVendasBarraca04Animada: React.FC = () => <KitchenFlowScene frame={useCurrentFrame()} />;
export const NorteVendasBarraca05: React.FC = RealOperationScene;
export const NorteVendasBarraca06: React.FC = () => <ManagerScene />;
export const NorteVendasBarraca06Animada: React.FC = () => <ManagerScene frame={useCurrentFrame()} />;
export const NorteVendasBarraca07: React.FC = () => <ReceiptPrintScene />;
export const NorteVendasBarraca07Animada: React.FC = () => <ReceiptPrintScene frame={useCurrentFrame()} />;
export const NorteVendasBarraca08: React.FC = ClosingScene;
