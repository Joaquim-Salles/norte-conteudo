import React from 'react';
import {AbsoluteFill, Img, interpolate, useCurrentFrame} from 'remotion';
import {ArrowRight, ChefHat, ClipboardList} from 'lucide-react';
import {ensurePostLoaded, FONT_POST as SANS, FONT_POST_MONO as MONO} from '../lib/fonts';
import {textEntrance} from '../lib/postMotion.mjs';
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
    <ellipse cx="454" cy="246" rx="398" ry="25" fill="rgba(12,15,72,.2)" />
    <path d="M34 231C152 193 241 227 332 211C424 194 501 206 591 220C682 233 774 204 874 224" stroke="rgba(241,243,255,.34)" strokeWidth="2" />
    <path d="M68 245C184 218 265 244 355 231C457 216 555 228 651 239C730 249 800 229 850 238" stroke="rgba(241,243,255,.2)" strokeWidth="2" />

    <g transform="translate(150 135)">
      <path d="M-70 0C-62-43-29-67 0-67C30-67 62-42 70 0H-70Z" fill="#DDE1FF" />
      <path d="M0-67V0M-36-54L-24 0M36-54L24 0" stroke="#9298E9" strokeWidth="3" />
      <path d="M0 0V68" stroke="#E8EAFA" strokeWidth="5" strokeLinecap="round" />
      <path d="M-39 70H39" stroke="#E8EAFA" strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="0" cy="69" rx="46" ry="12" fill="#777DD3" stroke="#E8EAFA" strokeWidth="3" />
      <path d="M-56 42L-77 66M56 42L77 66" stroke="#DDE1FF" strokeWidth="5" strokeLinecap="round" />
    </g>

    <g transform="translate(758 151) scale(.82)">
      <path d="M-70 0C-62-43-29-67 0-67C30-67 62-42 70 0H-70Z" fill="#AAB0F3" />
      <path d="M0-67V0M-36-54L-24 0M36-54L24 0" stroke="#7379D1" strokeWidth="3" />
      <path d="M0 0V66" stroke="#E8EAFA" strokeWidth="5" strokeLinecap="round" />
      <ellipse cx="0" cy="68" rx="44" ry="12" fill="#777DD3" stroke="#E8EAFA" strokeWidth="3" />
      <path d="M-53 42L-74 64M53 42L74 64" stroke="#DDE1FF" strokeWidth="5" strokeLinecap="round" />
    </g>

    <g>
      <path d="M342 112L372 69H536L566 112" fill="#E9EBFF" stroke="#FBFBFE" strokeWidth="3" strokeLinejoin="round" />
      <path d="M365 86H543L556 111H351L365 86Z" fill="#AEB4F6" />
      <path d="M390 87V111M425 87V111M461 87V111M497 87V111M532 87V111" stroke="#7279D1" strokeWidth="3" />
      <rect x="365" y="111" width="178" height="99" rx="8" fill="#292D7D" stroke="#E7E9FF" strokeWidth="3" />
      <rect x="385" y="132" width="138" height="55" rx="5" fill="#484DB5" />
      <path d="M384 152H522M453 132V187" stroke="rgba(237,239,255,.34)" strokeWidth="2" />
      <rect x="344" y="196" width="220" height="20" rx="7" fill="#E5E7F8" />
      <path d="M356 216H552L538 232H370L356 216Z" fill="#AEB4F6" />
      <circle cx="504" cy="157" r="5" fill="#7AD1B8" />
    </g>

    <g fill="#E9EBFF" opacity=".9">
      <circle cx="277" cy="198" r="13" /><path d="M260 229C260 210 267 204 277 204C287 204 294 210 294 229H260Z" />
      <circle cx="633" cy="201" r="12" /><path d="M617 230C617 213 623 207 633 207C643 207 649 213 649 230H617Z" />
    </g>
    <path d="M277 234V248M633 234V248" stroke="#E9EBFF" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

const BeachAreaMap: React.FC = () => (
  <svg width="100%" height="100%" viewBox="0 0 908 470" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Vista ilustrada das mesas espalhadas pela barraca até a cozinha" style={{display: 'block'}}>
    <path d="M48 83C188 31 316 56 430 95C548 135 700 121 860 66V388C710 429 567 412 438 380C302 346 172 363 48 416V83Z" fill="rgba(251,251,254,.055)" stroke="rgba(251,251,254,.18)" strokeWidth="2" />
    <path d="M76 110C208 68 317 85 427 120C557 161 686 147 831 100" stroke="rgba(218,222,255,.18)" strokeWidth="2" strokeDasharray="8 12" />
    <path d="M78 382C218 331 319 351 431 382C554 416 694 401 831 354" stroke="rgba(218,222,255,.18)" strokeWidth="2" strokeDasharray="8 12" />

    <path d="M171 178C290 172 386 184 483 211C582 238 668 235 724 222" stroke="#C5CAFF" strokeWidth="3" strokeDasharray="7 12" opacity=".72" />
    <path d="M188 308C304 293 394 283 483 264C581 243 655 234 724 222" stroke="#C5CAFF" strokeWidth="3" strokeDasharray="7 12" opacity=".72" />
    <path d="M369 130C418 165 451 188 493 211" stroke="#C5CAFF" strokeWidth="3" strokeDasharray="7 12" opacity=".72" />

    <g fill="#DCE0FF" stroke="#9298E9" strokeWidth="3">
      <circle cx="163" cy="174" r="42" /><circle cx="288" cy="259" r="39" />
      <circle cx="370" cy="126" r="37" /><circle cx="414" cy="323" r="39" />
    </g>
    <g stroke="#9298E9" strokeWidth="2" opacity=".9">
      <path d="M163 132V216M121 174H205M288 220V298M249 259H327" />
      <path d="M370 89V163M333 126H407M414 284V362M375 323H453" />
    </g>
    <g fill="#484DB5">
      <circle cx="163" cy="174" r="9" /><circle cx="288" cy="259" r="9" />
      <circle cx="370" cy="126" r="8" /><circle cx="414" cy="323" r="9" />
    </g>
    <g fill="#B7BDF8">
      <circle cx="112" cy="248" r="6" /><circle cx="227" cy="122" r="6" /><circle cx="330" cy="354" r="6" />
      <circle cx="455" cy="164" r="6" /><circle cx="535" cy="328" r="6" />
    </g>

    <g transform="translate(724 222)">
      <rect x="-76" y="-58" width="152" height="118" rx="16" fill="#252A73" stroke="#E5E8FF" strokeWidth="3" />
      <path d="M-91-58L-69-91H69L91-58" fill="#AEB4F6" stroke="#E5E8FF" strokeWidth="3" strokeLinejoin="round" />
      <path d="M-43-90V-58M0-90V-58M43-90V-58" stroke="#6E74C8" strokeWidth="4" />
      <rect x="-52" y="-34" width="104" height="55" rx="6" fill="#484DB5" />
      <path d="M-52-15H52M0-34V21" stroke="rgba(237,239,255,.35)" strokeWidth="2" />
      <rect x="-87" y="53" width="174" height="13" rx="6" fill="#E7E9FA" />
      <circle cx="49" cy="-8" r="5" fill="#7AD1B8" />
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

const MobileRoutineScene: React.FC<{frame?: number}> = ({frame}) => {
  ensurePostLoaded();
  const headlineMotion = frame === undefined ? {opacity: 1, translateY: 0} : textEntrance(frame, 4);
  const supportMotion = frame === undefined ? {opacity: 1, translateY: 0} : textEntrance(frame, 8);
  return <Produto id="vendas"><AbsoluteFill>
    <Background tone="dark" id="barraca-routine-grid" />
    <PageTop n={2} tone="dark" />
    <Eyebrow tone="dark" top={190} frame={frame}>A rotina da barraca</Eyebrow>
    <h1 style={{position: 'absolute', left: PAD, top: 250, width: 908, margin: 0, fontFamily: SANS, fontWeight: 700, fontSize: 43, lineHeight: 1.1, letterSpacing: -1.1, color: WHITE, opacity: headlineMotion.opacity, transform: `translateY(${headlineMotion.translateY}px)`}}>O atendimento acontece por toda<br />a barraca. O pedido não precisa se perder.</h1>
    <p style={{position: 'absolute', left: PAD, top: 365, width: 900, margin: 0, fontFamily: SANS, fontSize: 27, lineHeight: 1.42, color: 'rgba(251,251,254,.82)', opacity: supportMotion.opacity, transform: `translateY(${supportMotion.translateY}px)`}}>
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
export const NorteVendasBarraca02Animada: React.FC = () => <MobileRoutineScene frame={useCurrentFrame()} />;
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
