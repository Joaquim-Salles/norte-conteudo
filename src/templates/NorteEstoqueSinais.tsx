import React from 'react';
import {AbsoluteFill, Img, interpolate, useCurrentFrame} from 'remotion';
import {ArrowRight, Boxes, CalendarDays, Check, CircleHelp, ClipboardList, MapPin, Package} from 'lucide-react';
import {ensurePostLoaded, FONT_POST as SANS, FONT_POST_MONO as MONO} from '../lib/fonts';
import {Background, Eyebrow, Foot, NAVY, PAD, Produto, Support, Title, Top, WHITE, ease, kit, mute} from '../lib/NortePost';

const LOGO_ESTOQUE = kit('01-logos/norte-estoque/horizontal/norte-estoque_horizontal_branco_transparente.png');
const TELA_INVENTARIO = kit('08-recursos/telas-oficiais/estoque/d-inventario.png');

const Slide: React.FC<{n: number; tone: 'dark' | 'light' | 'product'; eyebrow: string; title: string; support: string; titleTop?: number; titleSize?: number; supportTop?: number; children: React.ReactNode}> = ({n, tone, eyebrow, title, support, titleTop = 250, titleSize = 70, supportTop = 450, children}) => (
  <Produto id="estoque">
    <AbsoluteFill>
      <Background tone={tone} id={`ne-sinais-grid-${n}`} />
      <Top n={n} total={7} tone={tone} />
      <Eyebrow tone={tone} top={190}>{eyebrow}</Eyebrow>
      <Title tone={tone} top={titleTop} size={titleSize}>{title}</Title>
      <Support tone={tone} top={supportTop} width={900} size={28}>{support}</Support>
      {children}
      <Foot tone={tone} label="Norte Estoque" />
    </AbsoluteFill>
  </Produto>
);

const PaperLine: React.FC<{width: number; color?: string}> = ({width, color = 'rgba(20,22,58,.18)'}) => <div style={{height: 8, width, borderRadius: 5, background: color}} />;

const Carton: React.FC<{x: number; y: number; scale?: number}> = ({x, y, scale = 1}) => (
  <g data-carton="shipping-box" transform={`translate(${x} ${y}) scale(${scale})`} strokeLinejoin="round" strokeLinecap="round">
    <path d="M2 22L42 2L112 18L68 43Z" fill="#F8E8C1" stroke="#8D6D3D" strokeWidth="2.5" />
    <path d="M2 22L68 43V103L2 79Z" fill="#E8C983" stroke="#8D6D3D" strokeWidth="2.5" />
    <path d="M68 43L112 18V79L68 103Z" fill="#C9A762" stroke="#8D6D3D" strokeWidth="2.5" />
    <path d="M12 47L54 60V85L12 70Z" fill="#FBFBFE" stroke="rgba(20,22,58,.32)" strokeWidth="1.7" />
    <path d="M20 53L46 61M20 59L47 67M20 65L37 70" stroke={NAVY} strokeWidth="2.5" opacity=".78" />
    <path d="M74 52L101 37M74 62L101 47M74 72L101 57" stroke="rgba(251,251,254,.36)" strokeWidth="2" />
  </g>
);

const Cover: React.FC = () => {
  ensurePostLoaded();
  return (
    <Produto id="estoque">
      <AbsoluteFill>
        <Background tone="product" id="ne-sinais-cover" />
        <Img src={LOGO_ESTOQUE} style={{position: 'absolute', left: PAD, top: 76, height: 86, width: 'auto'}} />
        <span style={{position: 'absolute', right: PAD, top: 96, fontFamily: MONO, fontSize: 22, color: mute('product')}}>01/07</span>
        <Eyebrow tone="product" top={340}>CONTROLE DE ESTOQUE</Eyebrow>
        <Title tone="product" top={398} size={67}>3 sinais de que seu estoque está no improviso</Title>
        <Support tone="product" top={590} width={870} size={30}>Quando a informação não acompanha a rotina, conferir e decidir fica mais difícil.</Support>
        <div data-illustration="stock-signal-shelf" style={{position: 'absolute', left: 110, top: 790, width: 860, height: 350}}>
          <svg width="860" height="350" viewBox="0 0 860 350" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Prateleira de estoque com três sinais de atenção">
            <path d="M74 310H786" stroke="rgba(251,251,254,.25)" strokeWidth="2" />
            <path d="M177 104V302M683 104V302M177 177H683M177 251H683" stroke="rgba(251,251,254,.78)" strokeWidth="9" strokeLinecap="round" />
            <path d="M188 184H672M188 258H672" stroke="rgba(251,251,254,.32)" strokeWidth="2" />
            <Carton x={202} y={96} scale={0.78} />
            <Carton x={372} y={96} scale={0.78} />
            <Carton x={540} y={96} scale={0.78} />
            <Carton x={188} y={177} scale={0.72} />
            <Carton x={308} y={177} scale={0.72} />
            <Carton x={428} y={177} scale={0.72} />
            <Carton x={548} y={177} scale={0.72} />
          </svg>
        </div>
        <Foot tone="product" label="Norte Estoque" />
      </AbsoluteFill>
    </Produto>
  );
};

const SinalSaldo: React.FC = () => (
  <Slide n={2} tone="light" eyebrow="SINAL 01 · SALDO" title="Você só confia no saldo depois de contar tudo de novo" support="Se o registro nunca parece suficiente, cada consulta vira uma nova conferência." supportTop={470}>
    <div data-illustration="record-vs-physical-stock" style={{position: 'absolute', left: 86, top: 630, width: 908, height: 490, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
      <div style={{width: 370, height: 390, boxSizing: 'border-box', padding: 30, borderRadius: 22, background: '#FBFBFE', border: '2px solid rgba(20,22,58,.12)', boxShadow: '0 18px 34px rgba(20,22,58,.08)'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, color: NAVY}}><ClipboardList size={31} /><span style={{fontFamily: SANS, fontSize: 18, fontWeight: 700, letterSpacing: 1.5}}>SALDO REGISTRADO</span></div>
        <div style={{marginTop: 35, display: 'grid', gap: 24}}>{[0, 1, 2, 3].map((i) => <div key={i} style={{display: 'flex', alignItems: 'center', gap: 14}}><span style={{width: 20, height: 20, borderRadius: 5, border: '2px solid rgba(20,22,58,.3)'}} /><PaperLine width={220 - i * 18} /></div>)}</div>
      </div>
      <div aria-hidden="true" style={{fontFamily: SANS, fontWeight: 700, fontSize: 66, color: '#168E9A'}}>≠</div>
      <div style={{width: 370, height: 390, boxSizing: 'border-box', padding: 30, borderRadius: 22, background: '#E8F1F2', border: '1px solid rgba(22,142,154,.2)'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, color: '#168E9A'}}><Boxes size={31} /><span style={{fontFamily: SANS, fontSize: 18, fontWeight: 700, letterSpacing: 1.5}}>CONFERÊNCIA FÍSICA</span></div>
        <div style={{height: 235, marginTop: 35, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14}}>
          {[0, 1, 2, 3].map((i) => <div key={i} style={{borderRadius: 15, background: i === 3 ? 'rgba(22,142,154,.12)' : '#D4E1E2', display: 'grid', placeItems: 'center', color: '#168E9A'}}><Package size={51} strokeWidth={1.5} /></div>)}
        </div>
      </div>
      <div style={{position: 'absolute', left: 394, bottom: 22, width: 120, height: 120, borderRadius: 99, background: '#168E9A', display: 'grid', placeItems: 'center', color: WHITE, border: '8px solid #F5F5F9'}}><CircleHelp size={58} strokeWidth={1.8} /></div>
    </div>
  </Slide>
);

const ContagemScene: React.FC<{f?: number}> = ({f}) => {
  const pages = [0, 1, 2].map((i) => f === undefined ? 1 : interpolate(f, [15 + i * 8, 30 + i * 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease}));
  return (
    <Slide n={3} tone="dark" eyebrow="SINAL 02 · CONFERÊNCIA" title="A contagem é adiada até virar um mutirão" support="Sem uma rotina simples para acompanhar o que já foi conferido, o inventário acumula." supportTop={455}>
      <div data-illustration="postponed-stock-count" style={{position: 'absolute', left: 106, top: 625, width: 868, height: 495}}>
        <div style={{position: 'absolute', left: 8, top: 25, width: 320, height: 370, boxSizing: 'border-box', padding: 26, borderRadius: 20, background: 'rgba(251,251,254,.1)', border: '1px solid rgba(251,251,254,.2)'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 14, color: WHITE}}><CalendarDays size={32} /><span style={{fontFamily: SANS, fontWeight: 700, fontSize: 18, letterSpacing: 1.5}}>CONFERÊNCIA</span></div>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginTop: 35}}>
            {Array.from({length: 9}, (_, i) => <div key={i} style={{height: 62, borderRadius: 12, background: i < 3 ? 'rgba(95,211,220,.28)' : 'rgba(251,251,254,.08)', border: `1px solid ${i < 3 ? 'rgba(95,211,220,.6)' : 'rgba(251,251,254,.12)'}`, display: 'grid', placeItems: 'center', color: i < 3 ? '#82E0E6' : 'rgba(251,251,254,.3)'}}>{i < 3 ? <Check size={22} /> : <span style={{width: 8, height: 8, borderRadius: 50, background: 'rgba(251,251,254,.28)'}} />}</div>)}
          </div>
          <div style={{position: 'absolute', left: 25, right: 25, bottom: 25, height: 8, borderRadius: 5, background: 'rgba(251,251,254,.16)'}}><div style={{width: '34%', height: '100%', borderRadius: 5, background: '#5FD3DC'}} /></div>
        </div>
        <div style={{position: 'absolute', left: 438, top: 24, width: 360, height: 390}}>
          {pages.map((p, i) => <div key={i} style={{position: 'absolute', left: i * 18, right: (2 - i) * 13, top: (2 - i) * 20 + (1 - p) * 90, height: 330, padding: 25, boxSizing: 'border-box', borderRadius: 16, background: i === 2 ? '#F7F6F0' : '#D9DCE9', color: NAVY, opacity: .35 + p * .65, transform: `rotate(${(i - 1) * 2}deg)`, boxShadow: '0 18px 28px rgba(0,0,0,.16)'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 12, color: '#168E9A'}}><ClipboardList size={26} /><span style={{fontFamily: SANS, fontWeight: 700, fontSize: 15, letterSpacing: 1}}>A CONFERIR</span></div>
            <div style={{display: 'grid', gap: 24, marginTop: 34}}>{[0, 1, 2, 3].map((row) => <div key={row} style={{display: 'flex', alignItems: 'center', gap: 12}}><span style={{width: 14, height: 14, borderRadius: 4, border: '2px solid rgba(20,22,58,.35)'}} /><PaperLine width={175 - row * 12} /></div>)}</div>
          </div>)}
        </div>
      </div>
    </Slide>
  );
};

const SinalContagem: React.FC = () => <ContagemScene />;
const SinalContagemAnimada: React.FC = () => <ContagemScene f={useCurrentFrame()} />;

const MovimentacaoScene: React.FC<{f?: number}> = ({f}) => {
  const progress = f === undefined ? 1 : interpolate(f, [14, 60], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease});
  const boxX = 250 + progress * 426;
  const boxY = 225 - Math.sin(progress * Math.PI) * 42;
  return (
    <Slide n={4} tone="product" eyebrow="SINAL 03 · MOVIMENTAÇÃO" title="O produto muda de local, mas o registro não acompanha" titleSize={60} support="Sem anotar a transferência, fica mais difícil saber onde está cada item." supportTop={430}>
      <div data-illustration="unrecorded-stock-transfer" style={{position: 'absolute', left: 87, top: 625, width: 906, height: 495}}>
        <div style={{position: 'absolute', left: 0, top: 38, width: 300, height: 350, boxSizing: 'border-box', padding: 25, borderRadius: 20, background: 'rgba(20,22,58,.25)', border: '1px solid rgba(251,251,254,.33)'}}>
          <div style={{display: 'flex', gap: 12, alignItems: 'center', color: WHITE}}><MapPin size={27} /><span style={{fontFamily: SANS, fontWeight: 700, fontSize: 17, letterSpacing: 1.3}}>LOCAL DE ORIGEM</span></div>
          <div style={{position: 'absolute', left: 25, right: 25, top: 101, height: 8, borderRadius: 4, background: 'rgba(251,251,254,.65)'}} />
          <div style={{position: 'absolute', left: 29, right: 29, top: 112, height: 192, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12}}>{[0, 1, 2, 3].map((i) => <div key={i} style={{borderRadius: 12, background: i === 0 ? 'rgba(95,211,220,.2)' : 'rgba(251,251,254,.08)', display: 'grid', placeItems: 'center', color: 'rgba(251,251,254,.72)'}}><Package size={39} strokeWidth={1.7} /></div>)}</div>
        </div>
        <div style={{position: 'absolute', right: 0, top: 38, width: 300, height: 350, boxSizing: 'border-box', padding: 25, borderRadius: 20, background: 'rgba(20,22,58,.25)', border: '1px solid rgba(251,251,254,.33)'}}>
          <div style={{display: 'flex', gap: 12, alignItems: 'center', color: WHITE}}><MapPin size={27} /><span style={{fontFamily: SANS, fontWeight: 700, fontSize: 17, letterSpacing: 1.3}}>LOCAL DE DESTINO</span></div>
          <div style={{position: 'absolute', left: 25, right: 25, top: 101, height: 8, borderRadius: 4, background: 'rgba(251,251,254,.65)'}} />
          <div style={{position: 'absolute', left: 29, right: 29, top: 112, height: 192, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12}}>{[0, 1, 2, 3].map((i) => <div key={i} style={{borderRadius: 12, background: i === 0 ? 'rgba(95,211,220,.2)' : 'rgba(251,251,254,.08)', display: 'grid', placeItems: 'center', color: 'rgba(251,251,254,.72)'}}><Package size={39} strokeWidth={1.7} /></div>)}</div>
        </div>
        <div style={{position: 'absolute', left: 380, top: 195, color: 'rgba(251,251,254,.74)'}}><ArrowRight size={72} strokeWidth={1.8} /></div>
        <div style={{position: 'absolute', left: boxX, top: boxY, width: 83, height: 83, borderRadius: 17, background: '#F3D99E', color: NAVY, border: '3px solid rgba(251,251,254,.88)', display: 'grid', placeItems: 'center', transform: 'translate(-50%,-50%)', boxShadow: '0 16px 24px rgba(15,20,53,.22)'}}><Package size={53} strokeWidth={1.7} /></div>
        <div style={{position: 'absolute', left: 367, bottom: 18, padding: '10px 16px', borderRadius: 99, background: 'rgba(251,251,254,.14)', color: WHITE, fontFamily: SANS, fontWeight: 700, fontSize: 14, letterSpacing: 1.3, opacity: .65 + progress * .35}}>{progress > .8 ? 'CONTROLE DESATUALIZADO' : 'REGISTRO PENDENTE'}</div>
      </div>
    </Slide>
  );
};

const SinalMovimentacao: React.FC = () => <MovimentacaoScene />;
const SinalMovimentacaoAnimada: React.FC = () => <MovimentacaoScene f={useCurrentFrame()} />;

const DecisaoScene: React.FC = () => (
  <Slide n={5} tone="dark" eyebrow="QUANDO O CONTROLE ATRASA" title="A reposição vira tentativa e erro" support="Com informações desatualizadas, a equipe pode precisar conferir de novo antes de decidir o que repor ou localizar." supportTop={455}>
    <div data-illustration="replenishment-decision-path" style={{position: 'absolute', left: 100, top: 690, width: 880, height: 385, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
      <div style={{width: 260, textAlign: 'center', color: WHITE}}>
        <Package size={74} strokeWidth={1.4} color="#F3D99E" />
        <div style={{marginTop: 22, fontFamily: SANS, fontSize: 31, lineHeight: 1.1, fontWeight: 800, letterSpacing: 1}}>O QUE<br />REPOR?</div>
        <div style={{margin: '20px auto 0', width: 150, height: 3, background: 'rgba(243,217,158,.68)'}} />
      </div>
      <div style={{position: 'relative', display: 'grid', placeItems: 'center', width: 170, height: 170, color: '#70D3DA'}}>
        <div style={{position: 'absolute', inset: 0, border: '2px solid rgba(112,211,218,.5)', borderRadius: '50%'}} />
        <CircleHelp size={92} strokeWidth={1.35} />
      </div>
      <div style={{width: 260, textAlign: 'center', color: WHITE}}>
        <MapPin size={74} strokeWidth={1.4} color="#70D3DA" />
        <div style={{marginTop: 22, fontFamily: SANS, fontSize: 31, lineHeight: 1.1, fontWeight: 800, letterSpacing: 1}}>ONDE<br />ESTÁ?</div>
        <div style={{margin: '20px auto 0', width: 150, height: 3, background: 'rgba(112,211,218,.68)'}} />
      </div>
    </div>
  </Slide>
);

const CaminhoScene: React.FC = () => (
    <Slide n={6} tone="light" eyebrow="UM CONTROLE QUE ACOMPANHA A ROTINA" title="O estoque precisa acompanhar o que acontece na operação" titleSize={60} support="O Norte Estoque ajuda a registrar inventários, identificar produtos e acompanhar movimentações entre locais." supportTop={430}>
    <div data-illustration="inventory-screen-in-laptop" style={{position: 'absolute', left: 100, top: 650, width: 880, height: 500, filter: 'drop-shadow(0 24px 26px rgba(20,22,58,.18))'}}>
      <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 440, padding: 13, boxSizing: 'border-box', borderRadius: 20, background: '#17182D', border: '2px solid rgba(20,22,58,.2)'}}>
        <div style={{height: '100%', borderRadius: 9, overflow: 'hidden', background: '#F7F8FC'}}><Img src={TELA_INVENTARIO} style={{display: 'block', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'left top'}} /></div>
      </div>
      <div style={{position: 'absolute', left: -24, right: -24, top: 438, height: 25, clipPath: 'polygon(3% 0,97% 0,100% 72%,96% 100%,4% 100%,0 72%)', borderRadius: '0 0 15px 15px', background: 'linear-gradient(180deg,#E6E9F1,#AEB4C7)', borderTop: '1px solid rgba(255,255,255,.72)'}} />
    </div>
  </Slide>
);

const Fechamento: React.FC = () => {
  ensurePostLoaded();
  return (
    <Produto id="estoque">
      <AbsoluteFill>
        <Background tone="dark" id="ne-sinais-close" />
        <Img src={LOGO_ESTOQUE} style={{position: 'absolute', left: PAD, top: 82, height: 92, width: 'auto'}} />
        <span style={{position: 'absolute', right: PAD, top: 96, fontFamily: MONO, fontSize: 22, color: mute('dark')}}>07/07</span>
        <Eyebrow tone="dark" top={405}>NORTE ESTOQUE</Eyebrow>
        <Title tone="dark" top={470} size={76}>Mais clareza para cuidar da operação</Title>
        <Support tone="dark" top={655} width={850} size={30}>Conheça o Norte Estoque e dê um norte ao seu negócio.</Support>
        <div style={{position: 'absolute', left: PAD, right: PAD, top: 860, height: 1, background: 'rgba(251,251,254,.2)'}} />
        <div style={{position: 'absolute', left: PAD, right: PAD, top: 910, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <span style={{fontFamily: SANS, fontWeight: 700, fontSize: 21, letterSpacing: 2, textTransform: 'uppercase', color: WHITE}}>Acesse o link da bio</span>
          <span style={{background: '#FBFBFE', color: NAVY, fontFamily: SANS, fontWeight: 700, fontSize: 24, padding: '21px 30px', borderRadius: 999}}>Dê um norte →</span>
        </div>
        <div style={{position: 'absolute', right: 104, bottom: 166, color: 'rgba(251,251,254,.12)', transform: 'rotate(-8deg)'}}><Boxes size={174} strokeWidth={1.1} /></div>
        <Foot tone="dark" last label="Norte Estoque" />
      </AbsoluteFill>
    </Produto>
  );
};

export const NorteEstoqueSinais01 = Cover;
export const NorteEstoqueSinais02 = SinalSaldo;
export const NorteEstoqueSinais03 = SinalContagem;
export const NorteEstoqueSinais03Animada = SinalContagemAnimada;
export const NorteEstoqueSinais04 = SinalMovimentacao;
export const NorteEstoqueSinais04Animada = SinalMovimentacaoAnimada;
export const NorteEstoqueSinais05 = DecisaoScene;
export const NorteEstoqueSinais06 = CaminhoScene;
export const NorteEstoqueSinais07 = Fechamento;
