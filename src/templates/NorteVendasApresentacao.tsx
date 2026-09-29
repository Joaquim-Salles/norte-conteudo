import React from 'react';
import {AbsoluteFill, Img, interpolate, useCurrentFrame} from 'remotion';
import {Ban, ChefHat, ConciergeBell, Clock, LayoutDashboard, Smartphone, Star, TriangleAlert, PenLine, Route, Calculator, ScanEye, ShieldCheck, Wallet} from 'lucide-react';
import {ensurePostLoaded, FONT_POST as SANS, FONT_POST_MONO as MONO} from '../lib/fonts';
import {
  A,
  Background,
  Chip,
  Eyebrow,
  Foot,
  FRAME,
  Fx,
  LAV,
  LOGO_NEGOCIOS_BRANCO,
  NAVY,
  PAD,
  Paper,
  S,
  Support,
  TEXT2,
  Title,
  Top,
  VENDAS,
  WHITE,
  kit,
  mute,
} from '../lib/NortePost';

/**
 * Carrossel "Apresentando o Norte Vendas" (8 slides, 4:5).
 *  1 capa · 2 dores · 3 cliente pelo QR · 4 pedido → preparo (anim) · 5 papéis · 6 conta (anim) · 7 caixa (anim) · 8 fechamento
 * Todo texto vem do site (sections/vendas, data/faq.ts). Dados de ticket, conta e caixa são de exemplo e vêm marcados.
 * Cena com `f` indefinido = quadro final (PNG). Cena com f={useCurrentFrame()} = vídeo.
 */

const TOTAL = 8;
const LOGO_VENDAS_BRANCO = kit('01-logos/norte-vendas/horizontal/norte-vendas_horizontal_branco_transparente.png');
const TELA_CARDAPIO = kit('08-recursos/telas-oficiais/vendas/m-cliente-cardapio.png');
const TELA_DIVIDIR = kit('08-recursos/telas-oficiais/recortes/vendas-dividir.png');

const brl = (n: number) => 'R$ ' + n.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2});
const CARD_DARK = 'rgba(251,251,254,.11)';

// avanço em degraus (papel saindo da impressora): 0→1
const stepProg = (f: number | undefined, start: number, end: number, steps: number) => {
  if (f === undefined) return 1;
  const t = Math.min(1, Math.max(0, (f - start) / (end - start)));
  if (t >= 1) return 1;
  const raw = t * steps;
  const k = Math.floor(raw);
  return (k + Math.min(1, (raw - k) * 3.2)) / steps;
};

/* ---------- 1 · capa ---------- */
export const ApresentaCapa: React.FC = () => {
  ensurePostLoaded();
  return (
    <AbsoluteFill>
      <Background tone="product" id="nva-1" />
      <div style={{position: 'absolute', left: PAD, top: 92}}>
        <Img src={LOGO_VENDAS_BRANCO} style={{height: 150, width: 'auto'}} />
      </div>
      <div style={{position: 'absolute', right: PAD, top: 96, fontFamily: MONO, fontSize: 22, color: mute('product')}}>01/{String(TOTAL).padStart(2, '0')}</div>
      <Eyebrow tone="product" top={470}>Para restaurante, bar e lanchonete</Eyebrow>
      <Title tone="product" top={528} size={92}>
        Conheça o Norte Vendas.
      </Title>
      <Support tone="product" top={740} width={840} size={30}>
        Pedido pelo QR, cozinha, bar, caixa e nota fiscal no mesmo sistema. Feito no chão de loja.
      </Support>
      <div style={{position: 'absolute', left: PAD, right: PAD, top: 960, display: 'flex', flexWrap: 'wrap', gap: 12}}>
        {['Cardápio no QR', 'Mesas e comandas', 'Cozinha e bar', 'Caixa', 'NFC-e'].map((t) => (
          <Chip key={t} tone="product">{t}</Chip>
        ))}
      </div>
      <Foot tone="product" label="Norte para Negócios" />
    </AbsoluteFill>
  );
};

/* ---------- 2 · dores (papel quadriculado) ---------- */
const dores = [
  {t: 'Pedido anotado à mão', d: 'Letra difícil de ler e observação que se perde.'},
  {t: 'Item no lugar errado', d: 'Prato, drinque e pizza precisam ir cada um para o seu preparo.'},
  {t: 'Mesa esquecida', d: 'Ninguém percebe que ela está sem pedido novo.'},
  {t: 'Conta na calculadora', d: 'Cada um pagando o que consumiu, mais a taxa de serviço.'},
  {t: 'Caixa que não bate', d: 'E ninguém sabe onde a diferença aconteceu.'},
];
const DorIcons = [PenLine, Route, TriangleAlert, Calculator, Wallet];

export const ApresentaDores: React.FC = () => {
  ensurePostLoaded();
  return (
    <AbsoluteFill>
      <Background tone="light" id="nva-2" />
      <Top n={2} total={TOTAL} tone="light" />
      <Eyebrow tone="light" top={210}>Dores do salão</Eyebrow>
      <Title tone="light" top={262} size={74}>
        Cinco cenas do dia a dia do salão.
      </Title>
      <div style={{position: 'absolute', left: PAD, right: PAD, top: 480, display: 'flex', flexDirection: 'column', gap: 16}}>
        {dores.map((d, i) => {
          const Icon = DorIcons[i];
          return (
            <div key={d.t} style={{display: 'flex', alignItems: 'center', gap: 24, background: WHITE, border: '2px solid #E6E6EF', borderRadius: 28, padding: '22px 30px', fontFamily: SANS}}>
              <span style={{fontFamily: MONO, fontSize: 22, color: VENDAS, width: 34}}>{String(i + 1).padStart(2, '0')}</span>
              <span style={{width: 60, height: 60, borderRadius: 18, background: 'rgba(72,77,181,.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none'}}>
                <Icon size={30} color={VENDAS} strokeWidth={2.2} />
              </span>
              <div style={{color: NAVY}}>
                <div style={{fontWeight: 700, fontSize: 31, letterSpacing: -0.4, lineHeight: 1.1}}>{d.t}</div>
                <div style={{marginTop: 6, fontSize: 23, lineHeight: 1.3, color: TEXT2}}>{d.d}</div>
              </div>
            </div>
          );
        })}
      </div>
      <Foot tone="light" />
    </AbsoluteFill>
  );
};

/* ---------- 3 · cliente pelo QR (azul-noite) ---------- */
const clienteCards = [
  {Icon: ConciergeBell, t: 'Chama o garçom e pede a conta', d: 'Do mesmo celular, pelo QR da mesa.'},
  {Icon: Star, t: 'Avalia com estrelas', d: 'O cliente dá a nota do atendimento.'},
  {Icon: Clock, t: 'Cardápio que muda com a hora', d: 'Café da manhã só de manhã. Os mais vendidos sobem sozinhos.'},
];

export const ApresentaCliente: React.FC = () => {
  ensurePostLoaded();
  const PW = 300;
  return (
    <AbsoluteFill>
      <Background tone="dark" id="nva-3" />
      <Top n={3} total={TOTAL} tone="dark" />
      <Eyebrow tone="dark" top={210}>Cardápio no QR</Eyebrow>
      <Title tone="dark" top={262} size={76}>
        O cliente pede sem baixar aplicativo.
      </Title>
      <Support tone="dark" top={462} width={860} size={28}>
        Ele aponta a câmera para o QR code da mesa e o cardápio abre no navegador.
      </Support>
      <div style={{position: 'absolute', left: PAD, top: 610, width: PW, filter: 'drop-shadow(0 26px 34px rgba(0,0,0,.5))'}}>
        <div style={{background: FRAME, borderRadius: 46, padding: 10, border: '2px solid rgba(251,251,254,.12)'}}>
          <div style={{height: PW * 2.02 - 20, borderRadius: 36, overflow: 'hidden', background: WHITE}}>
            <Img src={TELA_CARDAPIO} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'left top', display: 'block'}} />
          </div>
        </div>
      </div>
      <div style={{position: 'absolute', left: PAD + PW + 44, right: PAD, top: 610, display: 'flex', flexDirection: 'column', gap: 14}}>
        {clienteCards.map(({Icon, t, d}) => (
          <div key={t} style={{background: CARD_DARK, borderRadius: 28, padding: '28px 30px', fontFamily: SANS, color: WHITE, height: 188, boxSizing: 'border-box'}}>
            <Icon size={34} color={LAV} strokeWidth={2.2} />
            <div style={{marginTop: 12, fontWeight: 700, fontSize: 28, letterSpacing: -0.3, lineHeight: 1.1}}>{t}</div>
            <div style={{marginTop: 8, fontSize: 22, lineHeight: 1.32, color: 'rgba(251,251,254,.84)'}}>{d}</div>
          </div>
        ))}
      </div>
      <Foot tone="dark" />
    </AbsoluteFill>
  );
};

/* ---------- 4 · pedido → preparo (papel quadriculado, animado) ---------- */
export const PreparoScene: React.FC<{f?: number}> = ({f}) => {
  ensurePostLoaded();
  const RX = 560;
  const RW = 434;
  const py1 = 640;
  const py2 = 960;
  const prog1 = stepProg(f, 64, 104, 8);
  const prog2 = stepProg(f, 84, 118, 6);
  const pPedido = S(f, 22, {damping: 14, stiffness: 120});
  const pPr1 = S(f, 50, {damping: 14, stiffness: 130});
  const pPr2 = S(f, 70, {damping: 14, stiffness: 130});
  const line = (i: number) => A(f, 44 + i * 14, 22);
  const stamp = (at: number) => S(f, at, {damping: 9, stiffness: 200});
  const Stamp: React.FC<{p: number}> = ({p}) => (
    <div style={{position: 'absolute', right: 22, top: 20, transform: `rotate(-8deg) scale(${0.5 + 0.5 * p})`, opacity: Math.min(1, p * 2), border: `3px solid ${VENDAS}`, color: VENDAS, borderRadius: 10, padding: '4px 12px', fontFamily: SANS, fontWeight: 700, fontSize: 20, letterSpacing: 1.5, textTransform: 'uppercase'}}>✓ pronto</div>
  );
  const printer = (y: number, p: number) => (
    <div style={{position: 'absolute', left: RX - 20, top: y, width: RW + 40, height: 44, borderRadius: 999, background: '#0B0B0F', boxShadow: '0 10px 20px rgba(20,22,58,.28)', zIndex: 3, opacity: Math.min(1, p * 2), transform: `translateY(${(1 - p) * -60}px)`}}>
      <div style={{position: 'absolute', left: 22, right: 22, bottom: 8, height: 7, borderRadius: 4, background: '#000'}} />
    </div>
  );
  const emerge = (y: number, h: number, prog: number, children: React.ReactNode) => (
    <div style={{position: 'absolute', left: RX - 60, top: y + 34, width: RW + 120, height: h, clipPath: 'inset(0 0 -80px 0)', zIndex: 2}}>
      <div style={{position: 'absolute', left: 60, top: -12, transform: `translateY(${-(h + 30) * (1 - prog)}px)`}}>
        <Paper width={RW}>{children}</Paper>
      </div>
    </div>
  );
  const done = f === undefined ? 1 : 1;
  void done;
  return (
    <AbsoluteFill>
      <Background tone="light" id="nva-4" />
      <Top n={4} total={TOTAL} tone="light" />
      <Fx p={A(f, 0)} dy={20}><Eyebrow tone="light" top={210}>Cozinha organizada</Eyebrow></Fx>
      <Fx p={A(f, 5, 24)} dy={48}>
        <Title tone="light" top={262} size={76}>
          Pizza na pizzaria. Chope no bar.
        </Title>
      </Fx>
      <Fx p={A(f, 14, 24)}>
        <Support tone="light" top={462} width={880} size={28}>
          Cada categoria do cardápio tem o seu local de preparo. O pedido sai na impressora ou na tela.
        </Support>
      </Fx>

      {/* linhas do pedido até cada impressora */}
      <svg width={1080} height={1350} style={{position: 'absolute', inset: 0}} fill="none">
        {[py1 + 22, py2 + 22].map((y, i) => (
          <path key={i} d={`M470 850 C 520 850, 500 ${y}, ${RX - 30} ${y}`} stroke={VENDAS} strokeWidth={3.5} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - line(i)} />
        ))}
      </svg>

      {/* pedido da mesa */}
      <div style={{position: 'absolute', left: PAD, top: 700, width: 384, opacity: Math.min(1, pPedido * 1.6), transform: `translateY(${(1 - pPedido) * 60}px) rotate(-1.2deg)`}}>
        <Paper width={384}>
          <div style={{padding: '30px 30px 8px'}}>
            <div style={{fontSize: 17, letterSpacing: 1.6, textTransform: 'uppercase', color: VENDAS, fontWeight: 700}}>Mesa 4 · pedido</div>
            <div style={{marginTop: 4, fontSize: 15, color: TEXT2}}>exemplo</div>
            <div style={{marginTop: 20, fontSize: 21, lineHeight: 1.5}}>
              <div>1× Pizza grande</div>
              <div style={{fontSize: 17, color: TEXT2}}>½ calabresa · ½ marguerita</div>
              <div style={{fontSize: 17, color: TEXT2}}>obs.: sem cebola</div>
              <div style={{marginTop: 8}}>2× Chope</div>
            </div>
          </div>
        </Paper>
      </div>

      {printer(py1, pPr1)}
      {emerge(py1, 300, prog1,
        <div style={{position: 'relative', padding: '28px 28px 4px', height: 216}}>
          <Stamp p={stamp(126)} />
          <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 21, letterSpacing: 3, textTransform: 'uppercase', color: VENDAS}}>Pizzaria</div>
          <div style={{marginTop: 6, fontSize: 15, color: TEXT2}}>Mesa 4 · exemplo</div>
          <div style={{marginTop: 14, fontFamily: SANS, fontWeight: 700, fontSize: 31, letterSpacing: -0.3}}>1× Pizza grande</div>
          <div style={{marginTop: 8, fontSize: 18}}>½ calabresa · ½ marguerita</div>
          <div style={{marginTop: 4, fontSize: 18, fontWeight: 700}}>obs.: sem cebola</div>
        </div>,
      )}
      {printer(py2, pPr2)}
      {emerge(py2, 230, prog2,
        <div style={{position: 'relative', padding: '28px 28px 4px', height: 130}}>
          <Stamp p={stamp(138)} />
          <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 21, letterSpacing: 3, textTransform: 'uppercase', color: VENDAS}}>Bar</div>
          <div style={{marginTop: 6, fontSize: 15, color: TEXT2}}>Mesa 4 · exemplo</div>
          <div style={{marginTop: 14, fontFamily: SANS, fontWeight: 700, fontSize: 31, letterSpacing: -0.3}}>2× Chope</div>
        </div>,
      )}
      <Foot tone="light" />
    </AbsoluteFill>
  );
};
export const ApresentaPreparo: React.FC = () => <PreparoScene />;
export const ApresentaPreparoAnim: React.FC = () => <PreparoScene f={useCurrentFrame()} />;

/* ---------- 5 · papéis (azul-noite) ---------- */
const papeis = [
  {Icon: Smartphone, nome: 'Cliente', d: 'Pede pelo QR da mesa, sem baixar app.'},
  {Icon: ConciergeBell, nome: 'Garçom', d: 'Cuida das mesas dele e vê o que cada uma pediu.'},
  {Icon: ChefHat, nome: 'Cozinha e bar', d: 'O pedido chega na impressora ou numa tela.'},
  {Icon: Wallet, nome: 'Caixa', d: 'Abre com o fundo de troco e fecha contando.'},
  {Icon: LayoutDashboard, nome: 'Dono', d: 'Vê o dia: faturamento, ticket médio, mesas esquecidas.'},
];

export const ApresentaPapeis: React.FC = () => {
  ensurePostLoaded();
  return (
    <AbsoluteFill>
      <Background tone="dark" id="nva-5" />
      <Top n={5} total={TOTAL} tone="dark" />
      <Eyebrow tone="dark" top={210}>Cada um com a sua tela</Eyebrow>
      <Title tone="dark" top={262} size={76}>
        Todo mundo no mesmo pedido.
      </Title>
      <Support tone="dark" top={462} width={860} size={28}>
        Cada pessoa entra com o próprio acesso e vê só as abas que pode usar.
      </Support>
      <div style={{position: 'absolute', left: PAD, right: PAD, top: 590, display: 'flex', flexDirection: 'column', gap: 14}}>
        {papeis.map(({Icon, nome, d}, i) => (
          <div key={nome} style={{display: 'flex', alignItems: 'center', gap: 24, background: CARD_DARK, borderRadius: 28, padding: '20px 30px', fontFamily: SANS, color: WHITE, height: 104, boxSizing: 'border-box'}}>
            <span style={{fontFamily: MONO, fontSize: 22, color: LAV, width: 34}}>{String(i + 1).padStart(2, '0')}</span>
            <span style={{width: 60, height: 60, borderRadius: 18, background: 'rgba(251,251,254,.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none'}}>
              <Icon size={30} color={WHITE} strokeWidth={2.2} />
            </span>
            <div>
              <div style={{fontWeight: 700, fontSize: 29, letterSpacing: -0.3, lineHeight: 1.1}}>{nome}</div>
              <div style={{marginTop: 5, fontSize: 22, lineHeight: 1.25, color: 'rgba(251,251,254,.84)'}}>{d}</div>
            </div>
          </div>
        ))}
      </div>
      <Foot tone="dark" />
    </AbsoluteFill>
  );
};

/* ---------- 6 · divisão de conta (cor do produto, animado) ---------- */
const TOTAL_MESA = 184.6;
const TAXA = 18.46;
const COM_TAXA_CENTAVOS = 20306;

export const ContaScene: React.FC<{f?: number}> = ({f}) => {
  ensurePostLoaded();
  const SW = 400;
  const SH = Math.round(SW * (1010 / 780));
  const pSheet = S(f, 22, {damping: 16, stiffness: 90, mass: 0.9});
  const pCard = S(f, 36, {damping: 16, stiffness: 100, mass: 0.8});
  const n = f === undefined ? 4 : f < 60 ? 1 : f < 74 ? 2 : f < 88 ? 3 : 4;
  const porPessoa = Math.round(COM_TAXA_CENTAVOS / n) / 100;
  const pop = f === undefined ? 0 : n > 1 ? Math.max(0, 1 - (f - [0, 0, 60, 74, 88][n]) / 8) : 0;
  return (
    <AbsoluteFill>
      <Background tone="product" id="nva-6" />
      <Top n={6} total={TOTAL} tone="product" />
      <Fx p={A(f, 0)} dy={20}><Eyebrow tone="product" top={210}>Divisão de conta</Eyebrow></Fx>
      <Fx p={A(f, 5, 24)} dy={48}>
        <Title tone="product" top={262} size={84}>
          A conta se divide.
        </Title>
      </Fx>
      <Fx p={A(f, 14, 24)}>
        <Support tone="product" top={392} width={880} size={28}>
          Cada um paga o que consumiu, com a taxa de serviço separada. Em dinheiro, cartão ou Pix.
        </Support>
      </Fx>

      <div style={{position: 'absolute', left: PAD, top: 590, width: SW, height: SH, borderRadius: 30, overflow: 'hidden', opacity: Math.min(1, pSheet * 1.6), transform: `translateY(${(1 - pSheet) * 260}px)`, filter: 'drop-shadow(0 26px 34px rgba(0,0,0,.35))', background: WHITE}}>
        <Img src={TELA_DIVIDIR} style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}} />
      </div>

      <div style={{position: 'absolute', left: PAD + SW + 36, right: PAD, top: 590, opacity: Math.min(1, pCard * 1.6), transform: `translateY(${(1 - pCard) * 200}px)`, background: WHITE, color: NAVY, borderRadius: 30, padding: '28px 30px', fontFamily: SANS, filter: 'drop-shadow(0 22px 30px rgba(0,0,0,.28))'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
          <span style={{fontSize: 20, color: TEXT2}}>Total da mesa</span>
          <span style={{fontFamily: MONO, fontSize: 15, color: VENDAS, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700}}>exemplo</span>
        </div>
        <div style={{fontWeight: 700, fontSize: 42, letterSpacing: -1, marginTop: 4}}>{brl(TOTAL_MESA)}</div>
        <div style={{marginTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 20}}>
          <span style={{color: TEXT2}}>Pessoas</span>
          <span style={{display: 'flex', alignItems: 'center', gap: 12}}>
            <span style={{width: 34, height: 34, borderRadius: 999, background: '#EEEEF6', textAlign: 'center', lineHeight: '32px', fontWeight: 700}}>−</span>
            <span style={{fontWeight: 700, fontSize: 28, width: 28, textAlign: 'center', transform: `scale(${1 + pop * 0.25})`}}>{n}</span>
            <span style={{width: 34, height: 34, borderRadius: 999, background: '#EEEEF6', textAlign: 'center', lineHeight: '32px', fontWeight: 700}}>+</span>
          </span>
        </div>
        <div style={{marginTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 20}}>
          <span style={{color: TEXT2}}>Taxa de serviço (10%)</span>
          <span style={{width: 52, height: 30, borderRadius: 999, background: VENDAS, position: 'relative'}}>
            <span style={{position: 'absolute', right: 4, top: 4, width: 22, height: 22, borderRadius: 999, background: WHITE}} />
          </span>
        </div>
        <div style={{marginTop: 22, paddingTop: 20, borderTop: '2px solid #E6E6EF'}}>
          <div style={{fontSize: 17, letterSpacing: 2.6, textTransform: 'uppercase', fontWeight: 700, color: TEXT2}}>Cada um paga</div>
          <div style={{fontWeight: 700, fontSize: 68, letterSpacing: -2, color: VENDAS, lineHeight: 1.05, marginTop: 6, transform: `scale(${1 + pop * 0.05})`, transformOrigin: 'left center'}}>{brl(porPessoa)}</div>
          <div style={{marginTop: 8, fontFamily: MONO, fontSize: 15, lineHeight: 1.4, color: TEXT2}}>
            {brl(COM_TAXA_CENTAVOS / 100)} com taxa de {brl(TAXA)}
            <br />dividido por {n}
          </div>
        </div>
      </div>
      <Foot tone="product" />
    </AbsoluteFill>
  );
};
export const ApresentaConta: React.FC = () => <ContaScene />;
export const ApresentaContaAnim: React.FC = () => <ContaScene f={useCurrentFrame()} />;

/* ---------- 7 · caixa (papel quadriculado, animado) ---------- */
const cedulas = [
  {v: 100, q: 3, cor: '#3F7FA6'},
  {v: 50, q: 4, cor: '#B9692F'},
  {v: 20, q: 7, cor: '#C98A1E'},
  {v: 10, q: 9, cor: '#B8433F'},
  {v: 5, q: 6, cor: '#7D5C9E'},
  {v: 2, q: 8, cor: '#4D7390'},
];
const MOEDAS = 12.4;
const selos = [
  {Icon: ScanEye, t: 'Contagem cega', d: 'Quem fecha conta a gaveta sem ver o valor esperado.'},
  {Icon: ShieldCheck, t: 'Supervisor aprova a diferença', d: 'Passou da tolerância, o fechamento espera o supervisor.'},
  {Icon: Ban, t: 'Sangria grande avisa', d: 'Retirada acima do limite gera um alerta.'},
];

export const CaixaScene: React.FC<{f?: number}> = ({f}) => {
  ensurePostLoaded();
  const rows = [...cedulas.map((c) => ({label: `R$ ${c.v},00`, qtd: `× ${c.q}`, sub: c.v * c.q, cor: c.cor})), {label: 'Moedas', qtd: '', sub: MOEDAS, cor: '#8A8F98'}];
  const rowAt = (i: number) => 26 + i * 9;
  const shown = (i: number) => A(f, rowAt(i), 12);
  let total = 0;
  rows.forEach((r, i) => {
    total += shown(i) >= 0.5 ? r.sub : 0;
  });
  const pFolha = S(f, 12, {damping: 16, stiffness: 100});
  const FW = 470;
  return (
    <AbsoluteFill>
      <Background tone="light" id="nva-7" />
      <Top n={7} total={TOTAL} tone="light" />
      <Fx p={A(f, 0)} dy={20}><Eyebrow tone="light" top={210}>Fechamento</Eyebrow></Fx>
      <Fx p={A(f, 5, 24)} dy={48}>
        <Title tone="light" top={262} size={72}>
          O caixa fecha contando nota por nota.
        </Title>
      </Fx>
      <Fx p={A(f, 14, 24)}>
        <Support tone="light" top={442} width={880} size={28}>
          Cada operador fecha o próprio turno. Se a conta não bate, alguém fica sabendo.
        </Support>
      </Fx>

      <div style={{position: 'absolute', left: PAD, top: 580, opacity: Math.min(1, pFolha * 1.6), transform: `translateY(${(1 - pFolha) * 120}px) rotate(-.8deg)`}}>
        <Paper width={FW}>
          <div style={{padding: '26px 26px 4px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 15, letterSpacing: 1.4, textTransform: 'uppercase', color: VENDAS, fontWeight: 700}}>
              <span>Fechamento · Caixa 1</span>
              <span style={{color: TEXT2}}>exemplo</span>
            </div>
            <div style={{marginTop: 12, borderTop: '2px dashed rgba(20,22,58,.35)', paddingTop: 8}}>
              {rows.map((r, i) => (
                <div key={r.label} style={{display: 'flex', alignItems: 'center', height: 40, opacity: shown(i), transform: `translateX(${(1 - shown(i)) * -24}px)`, fontSize: 17}}>
                  <span style={{width: 12, height: 12, borderRadius: 3, background: r.cor, marginRight: 12, flex: 'none'}} />
                  <span style={{flex: 1}}>{r.label}</span>
                  <span style={{width: 52, color: TEXT2}}>{r.qtd}</span>
                  <span style={{width: 108, textAlign: 'right'}}>{brl(r.sub)}</span>
                </div>
              ))}
            </div>
            <div style={{marginTop: 8, borderTop: '2px dashed rgba(20,22,58,.35)', paddingTop: 10, display: 'flex', justifyContent: 'space-between', fontSize: 21, fontWeight: 700}}>
              <span>Total contado</span>
              <span>{brl(total)}</span>
            </div>
            <div style={{marginTop: 8, display: 'flex', justifyContent: 'space-between', fontSize: 15, color: TEXT2}}>
              <span>Esperado</span>
              <span style={{letterSpacing: 2}}>••••••</span>
            </div>
          </div>
        </Paper>
      </div>

      <div style={{position: 'absolute', left: PAD + FW + 34, right: PAD, top: 580, display: 'flex', flexDirection: 'column', gap: 14}}>
        {selos.map(({Icon, t, d}, i) => {
          const p = A(f, 96 + i * 12, 20);
          return (
            <div key={t} style={{background: WHITE, border: '2px solid #E6E6EF', borderRadius: 28, padding: '20px 24px', fontFamily: SANS, color: NAVY, height: 146, boxSizing: 'border-box', opacity: p, transform: `translateX(${(1 - p) * 50}px)`}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                <Icon size={26} color={VENDAS} strokeWidth={2.2} />
                <span style={{fontWeight: 700, fontSize: 23, letterSpacing: -0.3, lineHeight: 1.1}}>{t}</span>
              </div>
              <div style={{marginTop: 8, fontSize: 19, lineHeight: 1.3, color: TEXT2}}>{d}</div>
            </div>
          );
        })}
      </div>

      <div style={{position: 'absolute', left: PAD, right: PAD, top: 1120, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', opacity: A(f, 130, 20)}}>
        <span style={{fontFamily: MONO, fontSize: 16, letterSpacing: 2, textTransform: 'uppercase', color: TEXT2, marginRight: 6}}>recebe em</span>
        {['Dinheiro', 'Crédito', 'Débito', 'Pix', 'Cortesia'].map((t) => (
          <span key={t} style={{padding: '9px 18px', borderRadius: 999, background: 'rgba(72,77,181,.10)', color: VENDAS, fontFamily: SANS, fontWeight: 700, fontSize: 20, letterSpacing: 1, textTransform: 'uppercase'}}>{t}</span>
        ))}
      </div>
      <Foot tone="light" />
    </AbsoluteFill>
  );
};
export const ApresentaCaixa: React.FC = () => <CaixaScene />;
export const ApresentaCaixaAnim: React.FC = () => <CaixaScene f={useCurrentFrame()} />;

/* ---------- 8 · fechamento (azul-noite) ---------- */
const presets = [
  {nome: 'Lanchonete', mods: ['Balcão', 'Cozinha', 'Caixa']},
  {nome: 'Restaurante', mods: ['Mesas', 'Cozinha', 'Bar', 'QR', 'Caixa']},
  {nome: 'Pizzaria', mods: ['Mesas', 'Balcão', 'Cozinha', 'QR', 'Caixa']},
];

export const ApresentaFechamento: React.FC = () => {
  ensurePostLoaded();
  return (
    <AbsoluteFill>
      <Background tone="dark" id="nva-8" />
      <div style={{position: 'absolute', right: PAD, top: 80, fontFamily: MONO, fontSize: 22, color: mute('dark')}}>08/{String(TOTAL).padStart(2, '0')}</div>
      <div style={{position: 'absolute', left: PAD, top: 120}}>
        <Img src={LOGO_NEGOCIOS_BRANCO} style={{height: 130, width: 'auto'}} />
      </div>
      <Eyebrow tone="dark" top={340}>Norte Vendas</Eyebrow>
      <Title tone="dark" top={394} size={88}>
        Monte a <span style={{color: LAV}}>sua casa.</span>
      </Title>
      <Support tone="dark" top={512} width={860} size={28}>
        Cada casa liga só o que usa. Com NFC-e integrada e sem fidelidade, comece por um jeito pronto:
      </Support>
      <div style={{position: 'absolute', left: PAD, right: PAD, top: 690, display: 'flex', flexDirection: 'column', gap: 14}}>
        {presets.map((p) => (
          <div key={p.nome} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, background: CARD_DARK, borderRadius: 28, padding: '0 30px', height: 112, fontFamily: SANS, color: WHITE}}>
            <span style={{fontWeight: 700, fontSize: 31, letterSpacing: -0.4}}>{p.nome}</span>
            <span style={{display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end', maxWidth: 560}}>
              {p.mods.map((m) => (
                <span key={m} style={{padding: '8px 15px', borderRadius: 999, background: 'rgba(251,251,254,.14)', fontWeight: 700, fontSize: 18, letterSpacing: 1, textTransform: 'uppercase'}}>{m}</span>
              ))}
            </span>
          </div>
        ))}
      </div>
      <div style={{position: 'absolute', left: PAD, right: PAD, top: 1090, height: 1, background: 'rgba(251,251,254,.2)'}} />
      <div style={{position: 'absolute', left: PAD, right: PAD, top: 1118, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <span style={{fontFamily: SANS, fontWeight: 700, fontSize: 21, letterSpacing: 2.6, textTransform: 'uppercase', color: WHITE, lineHeight: 1.4}}>
          Conheça
          <br />o Norte Vendas
        </span>
        <span style={{background: WHITE, color: NAVY, fontFamily: SANS, fontWeight: 700, fontSize: 30, padding: '22px 38px', borderRadius: 999}}>norteparanegocios.com.br →</span>
      </div>
    </AbsoluteFill>
  );
};
