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
  <svg width="100%" height="100%" viewBox="0 0 908 420" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Barraca de praia com toldo listrado" style={{display: 'block'}}>
    <defs>
      <clipPath id="beach-stand-awning"><path d="M218 48H690L746 157H162L218 48Z" /></clipPath>
    </defs>
    <path d="M0 238C113 222 203 245 310 233C416 221 510 244 615 231C721 218 815 236 908 219V420H0V238Z" fill="#D8B77D" />
    <path d="M0 224C124 209 204 230 313 218C419 206 507 229 614 216C728 202 818 219 908 204V273C802 284 721 271 614 284C508 297 412 276 308 289C199 302 102 281 0 298V224Z" fill="#62BFC5" />
    <path d="M0 246C112 231 199 251 306 239M614 238C717 226 813 244 908 228" stroke="#D8F1E9" strokeWidth="5" strokeLinecap="round" opacity=".85" />
    <path d="M36 336C152 319 236 341 334 326M574 335C681 316 775 338 872 319M63 397C170 380 256 401 352 386M590 394C699 375 785 395 851 379" stroke="#F3D99E" strokeWidth="4" strokeLinecap="round" opacity=".78" />

    {[{x: 112, y: 318}, {x: 796, y: 318}].map(({x, y}) => (
      <g key={x} transform={`translate(${x} ${y})`} data-scene-object="beach-table-set">
        <ellipse cx="0" cy="0" rx="39" ry="14" fill="#FFF2CE" stroke="#292D7D" strokeWidth="4" />
        <ellipse cx="0" cy="-2" rx="31" ry="8" fill="#F5A767" opacity=".82" />
        <path d="M0 10V37M-17 38H17" stroke="#292D7D" strokeWidth="5" strokeLinecap="round" />
        <g transform="translate(-51 7)">
          <path d="M-9-18H9V-4H-9Z" fill="#FFF2CE" stroke="#484DB5" strokeWidth="3" />
          <path d="M-11-6H11V5H-11Z" fill="#F5A767" stroke="#292D7D" strokeWidth="3" />
          <path d="M-8 5L-11 20M8 5L11 20" stroke="#292D7D" strokeWidth="3" strokeLinecap="round" />
        </g>
        <g transform="translate(51 7)">
          <path d="M-9-18H9V-4H-9Z" fill="#FFF2CE" stroke="#484DB5" strokeWidth="3" />
          <path d="M-11-6H11V5H-11Z" fill="#F5A767" stroke="#292D7D" strokeWidth="3" />
          <path d="M-8 5L-11 20M8 5L11 20" stroke="#292D7D" strokeWidth="3" strokeLinecap="round" />
        </g>
      </g>
    ))}

    <g transform="translate(109 50) scale(.76)" data-scene-object="beach-stall-front">
      {/* Open kiosk body and simple serving window */}
      <path d="M267 162H641V293H267Z" fill="#292D7D" stroke="#FBFBFE" strokeWidth="5" strokeLinejoin="round" />
      <path d="M286 177H622V257H286Z" fill="#23266F" stroke="#484DB5" strokeWidth="4" />
      <path d="M300 242H608V259H300Z" fill="#FFF2CE" />
      <path d="M278 164V284M630 164V284" stroke="#FFF2CE" strokeWidth="9" />

      {/* Two slim supports make the striped canopy read as a real beach kiosk */}
      <path d="M218 144V290M690 144V290" stroke="#292D7D" strokeWidth="18" strokeLinecap="round" />
      <path d="M218 144V290M690 144V290" stroke="#FFF2CE" strokeWidth="8" strokeLinecap="round" />

      {/* Broad, restrained striped fabric awning */}
      <path d="M218 48H690L746 157H162L218 48Z" fill="#FFF2CE" stroke="#292D7D" strokeWidth="5" strokeLinejoin="round" />
      <g clipPath="url(#beach-stand-awning)">
        <path d="M200 40H236L185 166H149L200 40ZM271 40H307L256 166H220L271 40ZM342 40H378L327 166H291L342 40ZM413 40H449L398 166H362L413 40ZM484 40H520L469 166H433L484 40ZM555 40H591L540 166H504L555 40ZM626 40H662L611 166H575L626 40ZM697 40H733L682 166H646L697 40Z" fill="#F5A767" />
      </g>
      <path d="M162 157H746V176C746 184 735 189 724 181C713 190 701 189 691 180C680 190 668 190 657 180C646 190 634 190 623 180C612 190 600 190 589 180C578 190 566 190 555 180C544 190 532 190 521 180C510 190 498 190 487 180C476 190 464 190 453 180C442 190 430 190 419 180C408 190 396 190 385 180C374 190 362 190 351 180C340 190 328 190 317 180C306 190 294 190 283 180C272 190 260 190 249 180C238 190 226 190 215 180C204 190 192 190 181 181C170 189 162 184 162 176V157Z" fill="#FFF2CE" stroke="#292D7D" strokeWidth="5" strokeLinejoin="round" />
      <path d="M162 157H204V179C193 189 182 190 171 181C165 185 162 181 162 176V157ZM246 157H288V180C277 190 265 190 254 180C251 180 248 179 246 178V157ZM330 157H372V180C361 190 349 190 338 180C335 180 332 179 330 178V157ZM414 157H456V180C445 190 433 190 422 180C419 180 416 179 414 178V157ZM498 157H540V180C529 190 517 190 506 180C503 180 500 179 498 178V157ZM582 157H624V180C613 190 601 190 590 180C587 180 584 179 582 178V157ZM666 157H708V180C697 190 685 190 674 180C671 180 668 179 666 178V157ZM708 157H746V176C746 184 735 189 724 181C718 186 712 186 708 183V157Z" fill="#F5A767" />
      <path d="M162 157H746" stroke="#292D7D" strokeWidth="5" />

      {/* Counter: clear front face, restrained panel rhythm */}
      <path d="M191 278H717V300H191Z" fill="#FFF2CE" stroke="#292D7D" strokeWidth="5" strokeLinejoin="round" />
      <path d="M202 300H706V372H202Z" fill="#FFF2CE" stroke="#292D7D" strokeWidth="5" strokeLinejoin="round" />
      <path d="M202 302H245V370H202ZM288 302H331V370H288ZM374 302H417V370H374ZM460 302H503V370H460ZM546 302H589V370H546ZM632 302H675V370H632Z" fill="#F5A767" />
      <path d="M245 302V370M288 302V370M331 302V370M374 302V370M417 302V370M460 302V370M503 302V370M546 302V370M589 302V370M632 302V370M675 302V370" stroke="#292D7D" strokeWidth="4" />
      <path d="M196 372H712V386H196Z" fill="#FBFBFE" stroke="#292D7D" strokeWidth="5" strokeLinejoin="round" />
    </g>
  </svg>
);

const BeachAreaMap: React.FC = () => (
  <svg width="100%" height="100%" viewBox="0 0 908 470" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Fluxo do atendimento ao pedido online e ao preparo na cozinha" style={{display: 'block'}}>
    <g data-stage="atendimento">
      <rect x="12" y="28" width="260" height="320" rx="18" fill="rgba(251,251,254,.045)" stroke="rgba(251,251,254,.24)" strokeWidth="2" />
      <g transform="translate(142 162)" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cy="0" rx="39" ry="14" fill="#2E3380" stroke="#FBFBFE" strokeWidth="4" />
        <ellipse cy="-2" rx="29" ry="8" fill="#8D92F0" opacity=".8" />
        <path d="M0 11V40M-18 41H18" stroke="#B9BCEB" strokeWidth="5" />
        <g fill="#484DB5" stroke="#FBFBFE" strokeWidth="3">
          <path d="M-58-22H-40V-5H-58ZM-61-4H-37V9H-61ZM-57 9L-61 26M-41 9L-37 26" />
          <path d="M40-22H58V-5H40ZM37-4H61V9H37ZM41 9L37 26M57 9L61 26" />
        </g>
      </g>
      <text x="142" y="300" textAnchor="middle" fontFamily={SANS} fontSize="18" fontWeight="700" letterSpacing="2" fill={WHITE}>ATENDIMENTO</text>
    </g>

    <path d="M274 188H322M309 176L322 188L309 200" stroke="#B9BCEB" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

    <g data-stage="pedido-online">
      <rect x="324" y="28" width="260" height="320" rx="18" fill="rgba(251,251,254,.045)" stroke="rgba(251,251,254,.24)" strokeWidth="2" />
      <g transform="translate(454 160)" strokeLinecap="round" strokeLinejoin="round">
        <path d="M-42-59H42V59L30 49L18 59L6 49L-6 59L-18 49L-30 59L-42 49V-59Z" fill="#292D7D" stroke="#FBFBFE" strokeWidth="4" />
        <circle cy="-39" r="4" fill="#FBFBFE" />
        <path d="M-22-19H22M-22 0H22M-22 19H13" stroke="#B9BCEB" strokeWidth="4" />
      </g>
      <text x="454" y="300" textAnchor="middle" fontFamily={SANS} fontSize="18" fontWeight="700" letterSpacing="2" fill={WHITE}>PEDIDO ONLINE</text>
    </g>

    <path d="M586 188H634M621 176L634 188L621 200" stroke="#B9BCEB" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

    <g data-stage="preparo">
      <rect x="636" y="28" width="260" height="320" rx="18" fill="rgba(251,251,254,.045)" stroke="rgba(251,251,254,.24)" strokeWidth="2" />
      <g transform="translate(766 160)" strokeLinecap="round" strokeLinejoin="round">
        <rect x="-78" y="-58" width="156" height="118" rx="13" fill="#292D7D" stroke="#FBFBFE" strokeWidth="4" />
        <path d="M-18-37C-18-47-10-52-2-50C3-62 20-58 22-47C31-46 36-39 34-31H-18V-37Z" fill="#B9BCEB" stroke="#FBFBFE" strokeWidth="3" />
        <path d="M-18-31H34" stroke="#FBFBFE" strokeWidth="3" />
        <rect x="-62" y="-17" width="124" height="61" rx="7" fill="#353A76" stroke="#B9BCEB" strokeWidth="3" />
        <path d="M-50-7H-14L-17 21H-47L-50-7ZM-53-10H-11M-44-15C-44-22-39-22-39-28M-29-15C-29-22-24-22-24-28" fill="#8D92F0" stroke="#FBFBFE" strokeWidth="3" />
        <path d="M-54-4H-59M-10-4H-5" stroke="#FBFBFE" strokeWidth="4" />
        <rect x="3" y="-7" width="48" height="39" rx="5" fill="#484DB5" stroke="#B9BCEB" strokeWidth="3" />
        <path d="M11 21L33 0L40 7L18 29L9 31L11 21Z" fill="#D7D8F3" stroke="#FBFBFE" strokeWidth="2.5" />
      </g>
      <text x="766" y="300" textAnchor="middle" fontFamily={SANS} fontSize="18" fontWeight="700" letterSpacing="2" fill={WHITE}>PREPARO</text>
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
      Na sua barraca,<br />a cozinha ainda depende<br />de alguém levar o pedido?
    </h1>
    <p style={{position: 'absolute', left: PAD, top: 552, width: 890, margin: 0, fontFamily: SANS, fontSize: 27, lineHeight: 1.42, color: 'rgba(251,251,254,.86)'}}>
      Com o Norte Vendas, o pedido feito online chega direto à cozinha, sem alguém precisar levá-lo.
    </p>
    <div style={{position: 'absolute', left: PAD, top: 730, width: 908, height: 420}}><BeachStandHero /></div>
    <Foot tone="product" />
  </AbsoluteFill></Produto>;
};

const MobileRoutineScene: React.FC = () => {
  ensurePostLoaded();
  return <Produto id="vendas"><AbsoluteFill>
    <Background tone="dark" id="barraca-routine-grid" />
    <PageTop n={2} tone="dark" />
    <Eyebrow tone="dark" top={190}>A rotina da barraca</Eyebrow>
    <h1 style={{position: 'absolute', left: PAD, top: 250, width: 908, margin: 0, fontFamily: SANS, fontWeight: 700, fontSize: 40, lineHeight: 1.1, letterSpacing: -1.1, color: WHITE}}>O atendimento acontece por toda<br />a barraca, e o pedido segue online até a cozinha.</h1>
    <p style={{position: 'absolute', left: PAD, top: 365, width: 900, margin: 0, fontFamily: SANS, fontSize: 27, lineHeight: 1.42, color: 'rgba(251,251,254,.82)'}}>
      Mesmo com a equipe circulando entre clientes e mesas, o pedido registrado chega a quem prepara.
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
    <Support tone="light" top={385} width={900} size={27} frame={frame}>A equipe registra os pedidos e acompanha as comandas durante o atendimento, como mostra a tela real do Norte Vendas.</Support>
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
    <Support tone="dark" top={405} width={890} size={27} frame={frame}>Ao registrar o pedido no Norte Vendas, a equipe envia a informação à cozinha pelo sistema, sem depender de alguém para levá-la.</Support>
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
    <Support tone="dark" top={405} width={890} size={27} frame={frame}>No painel do Norte Vendas, o gerente vê quem está trabalhando e consulta o histórico por operador, acompanhando os registros durante a operação.</Support>
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
    <Support tone="product" top={370} width={890} size={25} frame={frame}>Com a venda fechada no Norte Vendas, a equipe pode emitir a NFC-e e imprimir o comprovante para o cliente.</Support>

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
    <Title tone="dark" top={390} size={62}>Pedidos chegam à cozinha,<br />e o gerente acompanha<br />a operação da barraca.</Title>
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
