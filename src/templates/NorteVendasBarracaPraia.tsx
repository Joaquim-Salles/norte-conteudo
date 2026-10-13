import React from 'react';
import {AbsoluteFill, Img, interpolate, useCurrentFrame} from 'remotion';
import {ArrowRight, ChefHat, ClipboardList, Eye, UsersRound} from 'lucide-react';
import {ensurePostLoaded, FONT_POST as SANS, FONT_POST_MONO as MONO} from '../lib/fonts';
import {
  A,
  Background,
  Eyebrow,
  Foot,
  Fx,
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

const TOTAL = 5;
const SALES_LOGO = kit('01-logos/norte-vendas/horizontal/norte-vendas_horizontal_branco_transparente.png');
const SCREEN_DASHBOARD = kit('08-recursos/telas-oficiais/vendas/d-dashboard.png');

const PageTop: React.FC<{n: number; tone: 'light' | 'dark'}> = ({n, tone}) => (
  <div style={{position: 'absolute', left: PAD, right: PAD, top: 66, height: 62, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
    <Img src={tone === 'light' ? LOGO_NEGOCIOS_AZUL : LOGO_NEGOCIOS_BRANCO} style={{height: 62, width: 'auto'}} />
    <span style={{fontFamily: MONO, fontSize: 22, color: mute(tone)}}>{String(n).padStart(2, '0')}/{String(TOTAL).padStart(2, '0')}</span>
  </div>
);

const CoverScene: React.FC<{frame?: number}> = ({frame}) => {
  ensurePostLoaded();
  const flowProgress = frame === undefined ? 1 : interpolate(frame, [38, 70], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease});
  return <Produto id="vendas"><AbsoluteFill>
    <Background tone="product" id="barraca-cover-grid" />
    <Img src={SALES_LOGO} style={{position: 'absolute', left: PAD, top: 74, height: 76, width: 'auto'}} />
    <span style={{position: 'absolute', right: PAD, top: 92, fontFamily: MONO, fontSize: 22, color: mute('product')}}>01/05</span>
    <Eyebrow tone="product" top={275}>Norte Vendas para barracas de praia</Eyebrow>
    <Fx p={A(frame, 4, 18)} dy={32}>
      <Title tone="product" top={340} size={73}>
        Dono de barraca,<br />seus pedidos chegam<br />direto à cozinha?
      </Title>
    </Fx>
    <Fx p={A(frame, 18, 18)} dy={24}>
      <Support tone="product" top={620} width={875} size={29}>
        Pedidos online chegam direto a quem prepara. E o gerente acompanha o que a equipe está fazendo.
      </Support>
    </Fx>
    <div style={{position: 'absolute', left: PAD + 12, right: PAD + 12, bottom: 385, height: 2, background: 'rgba(251,251,254,.28)'}} />
    <div style={{position: 'absolute', left: PAD + 12, right: PAD + 12, bottom: 385, height: 2, width: `${(908 - 24) * flowProgress}px`, background: '#B9BCEB'}} />
    <div style={{position: 'absolute', left: PAD + 12 + (908 - 24) * flowProgress - 9, bottom: 376, width: 20, height: 20, borderRadius: '50%', background: WHITE, boxShadow: '0 0 0 8px rgba(251,251,254,.16)'}} />
    <div style={{position: 'absolute', left: PAD, right: PAD, bottom: 335, display: 'flex', justifyContent: 'space-between', color: 'rgba(251,251,254,.9)', fontFamily: SANS, fontWeight: 700, fontSize: 18, letterSpacing: 1.6, textTransform: 'uppercase'}}>
      <span>Atendimento</span><span>Pedido online</span><span>Cozinha</span><span>Gerência</span>
    </div>
  </AbsoluteFill></Produto>;
};

const RoutineScene: React.FC = () => {
  ensurePostLoaded();
  return <Produto id="vendas"><AbsoluteFill>
    <Background tone="light" id="barraca-routine-grid" />
    <PageTop n={2} tone="light" />
    <Eyebrow tone="light" top={185}>A rotina da barraca</Eyebrow>
    <Title tone="light" top={245} size={68}>Na barraca, a equipe está em vários pontos.</Title>
    <Support tone="light" top={410} width={900} size={28}>
      Enquanto os clientes são atendidos, os pedidos continuam chegando. Quem gerencia precisa acompanhar o que a equipe registra e garantir que a informação chegue à cozinha.
    </Support>
    <div style={{position: 'absolute', left: PAD + 18, right: PAD + 18, top: 810, height: 260}}>
      <div style={{position: 'absolute', left: 75, right: 75, top: 72, height: 3, background: 'rgba(72,77,181,.28)'}} />
      <div style={{position: 'absolute', left: '16%', top: 55, width: 38, height: 38, borderRadius: '50%', background: VENDAS, boxShadow: '0 0 0 12px rgba(72,77,181,.10)'}} />
      <div style={{position: 'absolute', left: '49%', top: 55, width: 38, height: 38, borderRadius: '50%', background: VENDAS, boxShadow: '0 0 0 12px rgba(72,77,181,.10)'}} />
      <div style={{position: 'absolute', right: '16%', top: 55, width: 38, height: 38, borderRadius: '50%', background: VENDAS, boxShadow: '0 0 0 12px rgba(72,77,181,.10)'}} />
      <div style={{position: 'absolute', left: '8%', top: 132, width: 200, display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 12, color: NAVY, fontFamily: SANS, fontSize: 18, fontWeight: 700, letterSpacing: 1.2, textAlign: 'center', textTransform: 'uppercase'}}><UsersRound size={28} color={VENDAS} />Equipe em atendimento</div>
      <div style={{position: 'absolute', left: '41%', top: 132, width: 200, display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 12, color: NAVY, fontFamily: SANS, fontSize: 18, fontWeight: 700, letterSpacing: 1.2, textAlign: 'center', textTransform: 'uppercase'}}><ChefHat size={28} color={VENDAS} />Cozinha</div>
      <div style={{position: 'absolute', right: '7%', top: 132, width: 200, display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 12, color: NAVY, fontFamily: SANS, fontSize: 18, fontWeight: 700, letterSpacing: 1.2, textAlign: 'center', textTransform: 'uppercase'}}><Eye size={28} color={VENDAS} />Gerência</div>
    </div>
    <Foot tone="light" label="Norte Vendas" />
  </AbsoluteFill></Produto>;
};

const KitchenFlowScene: React.FC<{frame?: number}> = ({frame}) => {
  ensurePostLoaded();
  const progress = frame === undefined ? 1 : interpolate(frame, [12, 52], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease});
  const arrived = frame === undefined ? 1 : interpolate(frame, [48, 58, 82], [0, 1, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease});
  const orderX = 148 + progress * 610;
  return <Produto id="vendas"><AbsoluteFill>
    <Background tone="dark" id="barraca-kitchen-grid" />
    <PageTop n={3} tone="dark" />
    <Fx p={A(frame, 0, 15)}><Eyebrow tone="dark" top={185}>Pedido lançado no sistema</Eyebrow></Fx>
    <Fx p={A(frame, 4, 18)} dy={30}><Title tone="dark" top={245} size={70}>A cozinha recebe o pedido online.</Title></Fx>
    <Fx p={A(frame, 10, 18)} dy={22}>
      <Support tone="dark" top={405} width={880} size={28}>
        A equipe registra o pedido no Norte Vendas e a informação chega direto a quem prepara. Assim, a cozinha acompanha o que foi solicitado sem depender de um recado levado de um lado para o outro.
      </Support>
    </Fx>
    <div style={{position: 'absolute', left: PAD, right: PAD, top: 760, height: 330}}>
      <svg width="100%" height="190" viewBox="0 0 908 190" fill="none" xmlns="http://www.w3.org/2000/svg" style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
        <path d="M140 30H766" stroke="rgba(251,251,254,.22)" strokeWidth="5" strokeLinecap="round" />
        <path d="M140 30H766" stroke="#B9BCEB" strokeWidth="5" strokeLinecap="round" strokeDasharray="626" strokeDashoffset={626 * (1 - progress)} />
        <circle cx="140" cy="30" r="18" fill="#484DB5" stroke="#FBFBFE" strokeWidth="4" />
        <circle cx="766" cy="30" r="18" fill="#484DB5" stroke="#FBFBFE" strokeWidth="4" opacity={arrived} />
        <circle cx={orderX} cy="30" r="12" fill="#FBFBFE" opacity={frame === undefined ? 0 : progress * (1 - arrived)} />
      </svg>
      <div style={{position: 'absolute', left: 4, top: 92, width: 270, display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 15, color: WHITE, fontFamily: SANS, fontSize: 20, fontWeight: 700, letterSpacing: 1.8, textAlign: 'center', textTransform: 'uppercase'}}>
        <ClipboardList size={35} color="#B9BCEB" />Equipe registra
      </div>
      <div style={{position: 'absolute', right: 4, top: 92, width: 270, display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 15, color: WHITE, fontFamily: SANS, fontSize: 20, fontWeight: 700, letterSpacing: 1.8, textAlign: 'center', textTransform: 'uppercase', opacity: .45 + arrived * .55}}>
        <ChefHat size={35} color="#B9BCEB" />Cozinha recebe
      </div>
      <div style={{position: 'absolute', left: '50%', top: 235, transform: 'translateX(-50%)', color: '#B9BCEB', fontFamily: MONO, fontSize: 17, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase'}}>Fluxo online</div>
    </div>
    <Foot tone="dark" label="Norte Vendas" />
  </AbsoluteFill></Produto>;
};

const ManagerScene: React.FC<{frame?: number}> = ({frame}) => {
  ensurePostLoaded();
  const working = frame === undefined ? 1 : interpolate(frame, [30, 38, 51, 58], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease});
  const history = frame === undefined ? 1 : interpolate(frame, [53, 61, 76, 84], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease});
  return <Produto id="vendas"><AbsoluteFill>
    <Background tone="light" id="barraca-manager-grid" />
    <PageTop n={4} tone="light" />
    <Fx p={A(frame, 0, 16)}><Eyebrow tone="light" top={185}>Visibilidade para o gerente</Eyebrow></Fx>
    <Fx p={A(frame, 5, 18)} dy={30}><Title tone="light" top={245} size={68}>Acompanhe o que a equipe está fazendo.</Title></Fx>
    <Fx p={A(frame, 12, 18)} dy={22}>
      <Support tone="light" top={405} width={880} size={28}>
        No painel do Norte Vendas, o gerente pode ver quem está trabalhando e consultar o histórico por operador. Mais segurança para acompanhar os registros da equipe durante a operação.
      </Support>
    </Fx>
    <div style={{position: 'absolute', left: PAD, top: 645, width: 908, height: 567, overflow: 'hidden', borderRadius: 22, background: WHITE, border: '1px solid rgba(20,22,58,.12)', boxShadow: '0 24px 55px rgba(20,22,58,.18)'}}>
      <Img src={SCREEN_DASHBOARD} style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}} />
      <div style={{position: 'absolute', left: '38.5%', top: '13%', width: '23.5%', height: '15.5%', borderRadius: 13, border: `3px solid ${VENDAS}`, boxShadow: '0 0 0 6px rgba(72,77,181,.14)', background: 'rgba(72,77,181,.035)', opacity: working, transform: `scale(${1 + working * .008})`, transformOrigin: 'center'}} />
      <div style={{position: 'absolute', left: '80%', top: '15%', width: '17%', height: '11%', borderRadius: 12, border: `3px solid ${VENDAS}`, boxShadow: '0 0 0 6px rgba(72,77,181,.14)', background: 'rgba(72,77,181,.035)', opacity: history, transform: `scale(${1 + history * .008})`, transformOrigin: 'center'}} />
    </div>
    <Foot tone="light" label="Norte Vendas" />
  </AbsoluteFill></Produto>;
};

const ClosingScene: React.FC = () => {
  ensurePostLoaded();
  return <Produto id="vendas"><AbsoluteFill>
    <Background tone="dark" id="barraca-closing-grid" />
    <Img src={SALES_LOGO} style={{position: 'absolute', left: PAD, top: 74, height: 76, width: 'auto'}} />
    <span style={{position: 'absolute', right: PAD, top: 92, fontFamily: MONO, fontSize: 22, color: mute('dark')}}>05/05</span>
    <Eyebrow tone="dark" top={340}>Norte Vendas para barracas de praia</Eyebrow>
    <Title tone="dark" top={400} size={75}>Equipe, cozinha e gerente conectados.</Title>
    <Support tone="dark" top={595} width={880} size={29}>
      Os pedidos chegam online a quem prepara, enquanto o gerente acompanha o que a equipe está fazendo pelo sistema. Um fluxo mais conectado para a rotina da sua barraca.
    </Support>
    <div style={{position: 'absolute', left: PAD, top: 900, display: 'flex', alignItems: 'center', gap: 20, padding: '22px 30px', borderRadius: 999, background: WHITE, color: NAVY, fontFamily: SANS, fontSize: 23, fontWeight: 700}}>
      Conheça o Norte Vendas <ArrowRight size={24} color={VENDAS} />
    </div>
    <div style={{position: 'absolute', left: PAD, right: PAD, bottom: 136, display: 'flex', alignItems: 'center', gap: 14, color: '#D9DBFF', fontFamily: SANS, fontSize: 19, fontWeight: 700, letterSpacing: 1.1, textTransform: 'uppercase'}}>
      Acesse o link da bio e dê um norte ao seu negócio <span style={{fontSize: 24}}>🚀</span>
    </div>
    <Foot tone="dark" last label="Norte Vendas" />
  </AbsoluteFill></Produto>;
};

export const NorteVendasBarraca01: React.FC = () => <CoverScene />;
export const NorteVendasBarraca01Animada: React.FC = () => <CoverScene frame={useCurrentFrame()} />;
export const NorteVendasBarraca02: React.FC = RoutineScene;
export const NorteVendasBarraca03: React.FC = () => <KitchenFlowScene />;
export const NorteVendasBarraca03Animada: React.FC = () => <KitchenFlowScene frame={useCurrentFrame()} />;
export const NorteVendasBarraca04: React.FC = () => <ManagerScene />;
export const NorteVendasBarraca04Animada: React.FC = () => <ManagerScene frame={useCurrentFrame()} />;
export const NorteVendasBarraca05: React.FC = ClosingScene;
