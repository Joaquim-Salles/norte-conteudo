import React from 'react';
import {AbsoluteFill, Img, interpolate, useCurrentFrame} from 'remotion';
import {ArrowRight, ChefHat, ClipboardList, Printer} from 'lucide-react';
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

const TOTAL = 8;
const SALES_LOGO = kit('01-logos/norte-vendas/horizontal/norte-vendas_horizontal_branco_transparente.png');
const SCREEN_TABLES = kit('08-recursos/telas-oficiais/vendas/d-mesas.png');
const SCREEN_DASHBOARD = kit('08-recursos/telas-oficiais/vendas/d-dashboard.png');
const FLOOR_PHOTO = kit('08-recursos/fotos-reais/norte-vendas-barraca-operacao.png');

const PageTop: React.FC<{n: number; tone: 'light' | 'dark' | 'product'}> = ({n, tone}) => (
  <div style={{position: 'absolute', left: PAD, right: PAD, top: 66, height: 62, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
    <Img src={tone === 'light' ? LOGO_NEGOCIOS_AZUL : LOGO_NEGOCIOS_BRANCO} style={{height: 62, width: 'auto'}} />
    <span style={{fontFamily: MONO, fontSize: 22, color: mute(tone)}}>{String(n).padStart(2, '0')}/{String(TOTAL).padStart(2, '0')}</span>
  </div>
);

const CoverScene: React.FC = () => {
  ensurePostLoaded();
  return <Produto id="vendas"><AbsoluteFill>
    <Background tone="product" id="barraca-cover-grid" />
    <Img src={SALES_LOGO} style={{position: 'absolute', left: PAD, top: 74, height: 76, width: 'auto'}} />
    <span style={{position: 'absolute', right: PAD, top: 92, fontFamily: MONO, fontSize: 22, color: mute('product')}}>01/08</span>
    <Eyebrow tone="product" top={230}>Norte Vendas para barracas de praia</Eyebrow>
    <Title tone="product" top={292} size={70}>
      Dono de barraca,<br />seus pedidos chegam<br />direto à cozinha?
    </Title>
    <Support tone="product" top={552} width={890} size={27}>
      Pedidos online chegam direto a quem prepara. E o gerente acompanha o que a equipe está fazendo.
    </Support>
    <div style={{position: 'absolute', left: PAD, right: PAD, top: 790, borderTop: '1px solid rgba(251,251,254,.28)', borderBottom: '1px solid rgba(251,251,254,.28)', padding: '30px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#F2F2FF', fontFamily: SANS, fontSize: 17, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase'}}>
      <span>Atendimento</span><ArrowRight size={22} color="#B9BCEB" /><span>Pedido online</span><ArrowRight size={22} color="#B9BCEB" /><span>Cozinha</span>
    </div>
    <div style={{position: 'absolute', left: PAD, bottom: 184, color: '#D9DBFF', fontFamily: SANS, fontSize: 16, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase'}}>Norte Vendas para barracas de praia</div>
  </AbsoluteFill></Produto>;
};

const MobileRoutineScene: React.FC<{frame?: number}> = ({frame}) => {
  ensurePostLoaded();
  const gather = frame === undefined ? 0 : interpolate(frame, [7, 47], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease});
  const commandIn = frame === undefined ? 1 : interpolate(frame, [36, 52], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease});
  const tables = [
    {label: 'MESA 04', x: 10, y: 45, endX: 235, endY: 145},
    {label: 'MESA 08', x: 665, y: 45, endX: 475, endY: 145},
    {label: 'MESA 12', x: 10, y: 255, endX: 235, endY: 208},
    {label: 'MESA 16', x: 665, y: 255, endX: 475, endY: 208},
  ];
  return <Produto id="vendas"><AbsoluteFill>
    <Background tone="light" id="barraca-routine-grid" />
    <PageTop n={2} tone="light" />
    <Eyebrow tone="light" top={190}>A rotina da barraca</Eyebrow>
    <h1 style={{position: 'absolute', left: PAD, top: 250, width: 908, margin: 0, fontFamily: SANS, fontWeight: 700, fontSize: 43, lineHeight: 1.1, letterSpacing: -1.1, color: NAVY}}>O atendimento acontece por toda<br />a barraca. O pedido não precisa se perder.</h1>
    <Support tone="light" top={365} width={900} size={27}>
      Enquanto a equipe circula entre clientes e mesas, os pedidos registrados no Norte Vendas seguem pelo fluxo online até quem prepara.
    </Support>
    <div style={{position: 'absolute', left: PAD, top: 610, width: 908, height: 440}}>
      <svg width="100%" height="100%" viewBox="0 0 908 440" fill="none" xmlns="http://www.w3.org/2000/svg" style={{position: 'absolute', inset: 0}}>
        {tables.map((table) => {
          const startX = table.x + 108;
          const startY = table.y + 50;
          const endX = table.endX + 108;
          const endY = table.endY + 50;
          const x = startX + (endX - startX) * gather;
          const y = startY + (endY - startY) * gather;
          return <g key={table.label}>
            <path d={`M${startX} ${startY} Q${(startX + endX) / 2} ${Math.min(startY, endY) - 26} ${endX} ${endY}`} stroke="rgba(72,77,181,.22)" strokeWidth="3" strokeDasharray="7 9" />
            <circle cx={x} cy={y} r={6} fill={VENDAS} opacity={1 - commandIn * 0.9} />
          </g>;
        })}
      </svg>
      {tables.map((table) => {
        const x = table.x + (table.endX - table.x) * gather;
        const y = table.y + (table.endY - table.y) * gather;
        const scale = frame === undefined ? 1 : 1 - commandIn * 0.76;
        const opacity = frame === undefined ? 1 : 1 - commandIn * 0.94;
        return <div key={table.label} style={{position: 'absolute', left: x, top: y, width: 216, height: 100, boxSizing: 'border-box', padding: '18px 20px', borderRadius: 18, background: WHITE, border: '1px solid rgba(20,22,58,.13)', boxShadow: '0 12px 25px rgba(20,22,58,.10)', color: NAVY, fontFamily: SANS, opacity, transform: `scale(${scale})`, transformOrigin: 'center', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <span style={{fontSize: 15, fontWeight: 700, letterSpacing: 1.2}}>{table.label}</span>
          <span style={{width: 11, height: 11, borderRadius: 99, background: '#39A795'}} />
          <span style={{fontSize: 14, color: '#74778C'}}>Pedido registrado</span>
        </div>;
      })}
      <div style={{position: 'absolute', left: 238, top: 157, width: 432, height: 112, boxSizing: 'border-box', padding: '20px 26px', borderRadius: 20, background: WHITE, border: `2px solid ${VENDAS}`, boxShadow: '0 18px 38px rgba(20,22,58,.16)', color: NAVY, fontFamily: SANS, opacity: commandIn, transform: `translateY(${(1 - commandIn) * 14}px) scale(${.94 + commandIn * .06})`, display: 'flex', alignItems: 'center', gap: 20}}>
        <div style={{width: 58, height: 58, borderRadius: 16, background: 'rgba(72,77,181,.10)', display: 'grid', placeItems: 'center', flexShrink: 0}}><ClipboardList size={30} color={VENDAS} /></div>
        <div><div style={{fontSize: 14, fontWeight: 700, color: VENDAS, letterSpacing: 1.6, textTransform: 'uppercase'}}>Comanda organizada</div><div style={{marginTop: 8, fontSize: 21, fontWeight: 700}}>Pedidos reunidos no sistema</div></div>
      </div>
    </div>
    <Foot tone="light" label="Norte Vendas" />
  </AbsoluteFill></Produto>;
};

const TablesScene: React.FC<{frame?: number}> = ({frame}) => {
  ensurePostLoaded();
  const focus = frame === undefined ? 1 : interpolate(frame, [32, 43, 60, 70], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease});
  return <Produto id="vendas"><AbsoluteFill>
    <Background tone="light" id="barraca-tables-grid" />
    <PageTop n={3} tone="light" />
    <Fx p={A(frame, 0, 15)}><Eyebrow tone="light" top={185}>Norte Vendas na operação</Eyebrow></Fx>
    <Fx p={A(frame, 5, 18)} dy={30}><Title tone="light" top={245} size={66}>Mesas e comandas em uma só tela.</Title></Fx>
    <Fx p={A(frame, 12, 18)} dy={22}><Support tone="light" top={385} width={900} size={27}>A equipe registra os pedidos no sistema e acompanha as comandas durante o atendimento. Veja a tela real do Norte Vendas em uso.</Support></Fx>
    <div style={{position: 'absolute', left: PAD, top: 585, width: 908, height: 565, borderRadius: 22, overflow: 'hidden', background: WHITE, border: '1px solid rgba(20,22,58,.12)', boxShadow: '0 24px 55px rgba(20,22,58,.18)'}}>
      <Img src={SCREEN_TABLES} style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}} />
      <div style={{position: 'absolute', left: '20%', top: '18%', width: '18%', height: '28%', borderRadius: 16, border: `3px solid ${VENDAS}`, boxShadow: '0 0 0 6px rgba(72,77,181,.15)', opacity: focus, transform: `scale(${1 + focus * .012})`}} />
    </div>
    <Foot tone="light" label="Norte Vendas" />
  </AbsoluteFill></Produto>;
};

const KitchenFlowScene: React.FC<{frame?: number}> = ({frame}) => {
  ensurePostLoaded();
  const progress = frame === undefined ? 1 : interpolate(frame, [10, 52], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease});
  const arrived = frame === undefined ? 1 : interpolate(frame, [49, 58, 80], [0, 1, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease});
  const orderX = 290 + progress * 328;
  const cardY = 26 + Math.sin((frame ?? 0) / 6) * 3;
  return <Produto id="vendas"><AbsoluteFill>
    <Background tone="dark" id="barraca-kitchen-grid" />
    <PageTop n={4} tone="dark" />
    <Fx p={A(frame, 0, 15)}><Eyebrow tone="dark" top={185}>Do atendimento à cozinha</Eyebrow></Fx>
    <Fx p={A(frame, 5, 18)} dy={30}><Title tone="dark" top={245} size={68}>O pedido segue online até quem prepara.</Title></Fx>
    <Fx p={A(frame, 12, 18)} dy={22}><Support tone="dark" top={405} width={890} size={27}>A equipe registra no Norte Vendas. A cozinha recebe a informação pelo sistema, sem depender de um recado levado de um lado para o outro.</Support></Fx>
    <div style={{position: 'absolute', left: PAD, right: PAD, top: 735, height: 380}}>
      <svg width="100%" height="140" viewBox="0 0 908 140" fill="none" xmlns="http://www.w3.org/2000/svg" style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
        <path d="M290 74H618" stroke="rgba(251,251,254,.24)" strokeWidth="5" strokeLinecap="round" />
        <path d="M290 74H618" stroke="#B9BCEB" strokeWidth="5" strokeLinecap="round" strokeDasharray="328" strokeDashoffset={328 * (1 - progress)} />
        <circle cx="290" cy="74" r="18" fill="#484DB5" stroke="#FBFBFE" strokeWidth="4" />
        <circle cx="618" cy="74" r="18" fill="#484DB5" stroke="#FBFBFE" strokeWidth="4" opacity={arrived} />
        <circle cx={orderX} cy="74" r="15" fill="#FBFBFE" opacity={frame === undefined ? 0 : progress * (1 - arrived)} />
      </svg>
      <div style={{position: 'absolute', left: 20, top: 0, width: 245, height: 176, border: '1px solid rgba(251,251,254,.27)', borderRadius: 20, background: 'rgba(251,251,254,.08)', color: WHITE, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, fontFamily: SANS, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', transform: `translateY(${cardY}px)`}}>
        <ClipboardList size={39} color="#B9BCEB" /><span>Pedido registrado</span><span style={{fontFamily: MONO, color: '#B9BCEB', fontSize: 14}}>ONLINE</span>
      </div>
      <div style={{position: 'absolute', right: 20, top: 0, width: 245, height: 176, border: `1px solid rgba(251,251,254,${.24 + arrived * .55})`, borderRadius: 20, background: `rgba(72,77,181,${.10 + arrived * .20})`, color: WHITE, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, fontFamily: SANS, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase'}}>
        <ChefHat size={39} color="#B9BCEB" /><span>Cozinha informada</span><span style={{fontFamily: MONO, color: '#B9BCEB', fontSize: 14, opacity: arrived}}>PEDIDO RECEBIDO</span>
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
  const working = frame === undefined ? 1 : interpolate(frame, [24, 34, 49, 57], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease});
  const history = frame === undefined ? 1 : interpolate(frame, [49, 58, 74, 84], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease});
  return <Produto id="vendas"><AbsoluteFill>
    <Background tone="light" id="barraca-manager-grid" />
    <PageTop n={6} tone="light" />
    <Fx p={A(frame, 0, 16)}><Eyebrow tone="light" top={185}>Visibilidade para o gerente</Eyebrow></Fx>
    <Fx p={A(frame, 5, 18)} dy={30}><Title tone="light" top={245} size={67}>Acompanhe o que a equipe está fazendo.</Title></Fx>
    <Fx p={A(frame, 12, 18)} dy={22}><Support tone="light" top={405} width={890} size={27}>No painel do Norte Vendas, o gerente pode ver quem está trabalhando e consultar o histórico por operador. Mais visibilidade para acompanhar os registros durante a operação.</Support></Fx>
    <div style={{position: 'absolute', left: PAD, top: 635, width: 908, height: 560, overflow: 'hidden', borderRadius: 22, background: WHITE, border: '1px solid rgba(20,22,58,.12)', boxShadow: '0 24px 55px rgba(20,22,58,.18)'}}>
      <Img src={SCREEN_DASHBOARD} style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}} />
      <div style={{position: 'absolute', left: '38.5%', top: '13%', width: '23.5%', height: '15.5%', borderRadius: 13, border: `3px solid ${VENDAS}`, boxShadow: '0 0 0 6px rgba(72,77,181,.14)', background: 'rgba(72,77,181,.035)', opacity: working, transform: `scale(${1 + working * .008})`, transformOrigin: 'center'}} />
      <div style={{position: 'absolute', left: '80%', top: '15%', width: '17%', height: '11%', borderRadius: 12, border: `3px solid ${VENDAS}`, boxShadow: '0 0 0 6px rgba(72,77,181,.14)', background: 'rgba(72,77,181,.035)', opacity: history, transform: `scale(${1 + history * .008})`, transformOrigin: 'center'}} />
    </div>
    <Foot tone="light" label="Norte Vendas" />
  </AbsoluteFill></Produto>;
};

const ReceiptPrintScene: React.FC<{frame?: number}> = ({frame}) => {
  ensurePostLoaded();
  const progress = frame === undefined ? 1 : interpolate(frame, [10, 68], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease});
  const ticketY = (1 - progress) * 490;
  return <Produto id="vendas"><AbsoluteFill>
    <Background tone="product" id="barraca-receipt-grid" />
    <PageTop n={7} tone="product" />
    <Fx p={A(frame, 0, 15)}><Eyebrow tone="product" top={185}>Fechamento da venda</Eyebrow></Fx>
    <Fx p={A(frame, 5, 18)} dy={30}><Title tone="product" top={240} size={62}>A nota fiscal sai no fechamento.</Title></Fx>
    <Fx p={A(frame, 12, 18)} dy={22}><Support tone="product" top={370} width={890} size={25}>Demonstração visual de uma NFC-e emitida pelo Norte Vendas.</Support></Fx>

    <div style={{position: 'absolute', left: 285, top: 460, width: 510, height: 455, overflow: 'hidden', zIndex: 1}}>
      <div style={{position: 'absolute', left: 35, top: ticketY, width: 440, minHeight: 555, padding: '26px 30px', boxSizing: 'border-box', background: '#FBFBFE', color: NAVY, fontFamily: MONO, boxShadow: '0 18px 34px rgba(10,12,50,.26)', clipPath: 'polygon(0 0,100% 0,100% 98%,96% 100%,92% 98%,88% 100%,84% 98%,80% 100%,76% 98%,72% 100%,68% 98%,64% 100%,60% 98%,56% 100%,52% 98%,48% 100%,44% 100%,40% 98%,36% 100%,32% 98%,28% 100%,24% 98%,20% 100%,16% 98%,12% 100%,8% 98%,4% 100%,0 98%)'}}>
        <div style={{textAlign: 'center', fontSize: 13, letterSpacing: 2, color: VENDAS, fontWeight: 700}}>EXEMPLO • DADOS FICTÍCIOS</div>
        <div style={{textAlign: 'center', marginTop: 10, fontSize: 22, fontWeight: 700}}>BARRACA EXEMPLO</div>
        <div style={{textAlign: 'center', marginTop: 6, fontSize: 14, color: '#72758B'}}>DANFE NFC-e</div>
        <div style={{marginTop: 20, borderTop: '2px dashed #A8AAC0', paddingTop: 12, fontSize: 14, display: 'flex', justifyContent: 'space-between'}}><span>ITEM</span><span>QTD.  VALOR</span></div>
        <div style={{marginTop: 9, fontSize: 16, display: 'flex', justifyContent: 'space-between'}}><span>Porção exemplo</span><span>1  00,00</span></div>
        <div style={{marginTop: 8, fontSize: 16, display: 'flex', justifyContent: 'space-between'}}><span>Bebida exemplo</span><span>2  00,00</span></div>
        <div style={{marginTop: 16, borderTop: '2px dashed #A8AAC0', paddingTop: 12, fontSize: 17, fontWeight: 700, display: 'flex', justifyContent: 'space-between'}}><span>TOTAL</span><span>R$ 00,00</span></div>
        <div style={{marginTop: 18, textAlign: 'center', fontSize: 13, lineHeight: 1.5, color: '#72758B'}}>Representação ilustrativa<br />Documento fiscal de exemplo</div>
        <div style={{margin: '18px auto 0', width: 104, height: 104, border: '1px solid #C6C8D5', display: 'grid', placeItems: 'center', color: '#72758B', fontFamily: SANS, fontSize: 12, textAlign: 'center'}}>QR CODE<br />ILUSTRATIVO</div>
      </div>
    </div>
    <div style={{position: 'absolute', left: 255, top: 900, width: 570, height: 210, borderRadius: '24px 24px 34px 34px', zIndex: 2, background: 'linear-gradient(145deg,#202342 0%,#111329 100%)', border: '1px solid rgba(251,251,254,.24)', boxShadow: '0 28px 50px rgba(10,12,50,.34)'}}>
      <div style={{position: 'absolute', left: 96, right: 96, top: 0, height: 14, borderRadius: '0 0 8px 8px', background: '#090A15', boxShadow: 'inset 0 3px 6px rgba(0,0,0,.6)'}} />
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, color: '#D9DBFF', fontFamily: SANS, fontSize: 17, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase'}}><Printer size={24} color="#B9BCEB" />Impressão ilustrativa</div>
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
