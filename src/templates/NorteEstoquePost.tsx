import React from 'react';
import {AbsoluteFill, Img, interpolate, useCurrentFrame} from 'remotion';
import {ArrowLeftRight, CalendarClock, ChartColumn, ClipboardList, Factory, RefreshCw, Scale, ScanLine, ShieldCheck, Tag} from 'lucide-react';
import {ensurePostLoaded, FONT_POST as SANS, FONT_POST_MONO as MONO} from '../lib/fonts';
import {
  A,
  Background,
  Chip,
  Eyebrow,
  Foot,
  Fx,
  LAV,
  LOGO_NEGOCIOS_BRANCO,
  NAVY,
  PAD,
  Paper,
  PRODUTOS,
  Produto,
  S,
  Support,
  TEXT2,
  THERMAL,
  Title,
  Top,
  WHITE,
  kit,
  mute,
  useProduto,
} from '../lib/NortePost';

/**
 * Carrossel "Apresentando o Norte Estoque" (8 slides, 4:5, cor do produto #168E9A).
 *  1 capa · 2 dores · 3 etiqueta (anim) · 4 inventário pelo celular (anim) · 5 tela inicial · 6 Omie (anim) · 7 funções · 8 fechamento
 * Todo texto vem do site (sections/estoque, data/faq.ts). Etiqueta e números de exemplo vêm marcados.
 * Cena com `f` indefinido = quadro final (PNG); com f={useCurrentFrame()} = vídeo.
 */

const TOTAL = 8;
const LOGO_ESTOQUE_BRANCO = kit('01-logos/norte-estoque/horizontal/norte-estoque_horizontal_branco_transparente.png');
const FOTO_ETIQUETA = kit('08-recursos/fotos-reais/etiqueta-peixe.jpg');
const TELA_HOME = kit('08-recursos/telas-oficiais/estoque/d-home.png');
const TELA_INVENTARIO = kit('08-recursos/telas-oficiais/estoque/m-inventario.png');
const CARD_DARK = 'rgba(251,251,254,.11)';
const FRAME = '#1A1B2E';

const Slide: React.FC<{children: React.ReactNode}> = ({children}) => (
  <Produto id="estoque">
    <AbsoluteFill>{children}</AbsoluteFill>
  </Produto>
);

const stepProg = (f: number | undefined, start: number, end: number, steps: number) => {
  if (f === undefined) return 1;
  const t = Math.min(1, Math.max(0, (f - start) / (end - start)));
  if (t >= 1) return 1;
  const raw = t * steps;
  const k = Math.floor(raw);
  return (k + Math.min(1, (raw - k) * 3.2)) / steps;
};

/* ---------- 1 · capa ---------- */
const EstoqueCapaInner: React.FC = () => (
  <>
    <Background tone="product" id="ne-1" />
    <div style={{position: 'absolute', left: PAD, top: 92}}>
      <Img src={LOGO_ESTOQUE_BRANCO} style={{height: 150, width: 'auto'}} />
    </div>
    <div style={{position: 'absolute', right: PAD, top: 96, fontFamily: MONO, fontSize: 22, color: mute('product')}}>01/{String(TOTAL).padStart(2, '0')}</div>
    <Eyebrow tone="product" top={430}>Feito para quem usa Omie</Eyebrow>
    <Title tone="product" top={486} size={84}>
      O número do sistema, finalmente igual ao da prateleira.
    </Title>
    <Support tone="product" top={800} width={860} size={30}>
      Etiqueta com QR, inventário pelo celular e tudo sincronizado com o seu Omie a cada 10 minutos.
    </Support>
    <div style={{position: 'absolute', left: PAD, right: PAD, top: 990, display: 'flex', flexWrap: 'wrap', gap: 12}}>
      {['Etiqueta com QR', 'Inventário', 'Transferência', 'Produção', 'Omie'].map((t) => (
        <Chip key={t} tone="product">{t}</Chip>
      ))}
    </div>
    <Foot tone="product" label="Norte para Negócios" />
  </>
);
export const EstoqueCapa: React.FC = () => {
  ensurePostLoaded();
  return <Slide><EstoqueCapaInner /></Slide>;
};

/* ---------- 2 · dores ---------- */
const dores = [
  {Icon: Scale, t: 'Sistema diz uma coisa, prateleira outra', d: 'O número do sistema não bate com o que está no estoque.'},
  {Icon: ClipboardList, t: 'Inventário com prancheta', d: 'Contar item por item e digitar o código depois.'},
  {Icon: Tag, t: 'Lote e validade na memória', d: 'Sem etiqueta, ninguém sabe o que vence primeiro.'},
  {Icon: CalendarClock, t: 'Vencido ainda no estoque', d: 'O produto venceu e continua aparecendo com saldo.'},
  {Icon: RefreshCw, t: 'Digitar tudo duas vezes', d: 'Uma vez no depósito e outra vez no Omie.'},
];
const EstoqueDoresInner: React.FC = () => {
  const {cor} = useProduto();
  return (
    <>
      <Background tone="light" id="ne-2" />
      <Top n={2} total={TOTAL} tone="light" />
      <Eyebrow tone="light" top={210}>Dores do depósito</Eyebrow>
      <Title tone="light" top={262} size={74}>
        Cinco cenas do dia a dia do estoque.
      </Title>
      <div style={{position: 'absolute', left: PAD, right: PAD, top: 480, display: 'flex', flexDirection: 'column', gap: 16}}>
        {dores.map(({Icon, t, d}, i) => (
          <div key={t} style={{display: 'flex', alignItems: 'center', gap: 24, background: WHITE, border: '2px solid #E6E6EF', borderRadius: 28, padding: '22px 30px', fontFamily: SANS}}>
            <span style={{fontFamily: MONO, fontSize: 22, color: cor, width: 34}}>{String(i + 1).padStart(2, '0')}</span>
            <span style={{width: 60, height: 60, borderRadius: 18, background: `${cor}1a`, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none'}}>
              <Icon size={30} color={cor} strokeWidth={2.2} />
            </span>
            <div style={{color: NAVY}}>
              <div style={{fontWeight: 700, fontSize: 30, letterSpacing: -0.4, lineHeight: 1.1}}>{t}</div>
              <div style={{marginTop: 6, fontSize: 23, lineHeight: 1.3, color: TEXT2}}>{d}</div>
            </div>
          </div>
        ))}
      </div>
      <Foot tone="light" label="Norte Estoque" />
    </>
  );
};
export const EstoqueDores: React.FC = () => {
  ensurePostLoaded();
  return <Slide><EstoqueDoresInner /></Slide>;
};

/* ---------- 3 · etiqueta (azul-noite, animado) ---------- */
const N = 21;
const qrPath = (() => {
  const finder = (x: number, y: number) => {
    for (const [fx, fy] of [[0, 0], [N - 7, 0], [0, N - 7]]) {
      const dx = x - fx;
      const dy = y - fy;
      if (dx >= 0 && dx < 7 && dy >= 0 && dy < 7) {
        const borda = dx === 0 || dx === 6 || dy === 0 || dy === 6;
        const miolo = dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4;
        return borda || miolo ? 1 : 0;
      }
      if (dx >= -1 && dx <= 7 && dy >= -1 && dy <= 7) return 0;
    }
    return -1;
  };
  let d = '';
  for (let y = 0; y < N; y++)
    for (let x = 0; x < N; x++) {
      const f = finder(x, y);
      const on = f === -1 ? ((x * 7 + y * 13 + ((x * y) % 5)) % 3 === 0 || (x + y) % 7 === 1) : f === 1;
      if (on) d += `M${x} ${y}h1v1h-1z`;
    }
  return d;
})();

const campos = [
  {k: 'Fabricação', v: '20/09/2026', at: 0},
  {k: 'Validade', v: '20/12/2026', at: 0},
  {k: 'Lote', v: 'L-2409', at: 0},
  {k: 'Fornecedor', v: 'Mar Azul', at: 132},
  {k: 'Recebido', v: '18/09/2026', at: 146},
  {k: 'Qtde', v: '2 kg', at: 160},
];

export const EtiquetaScene: React.FC<{f?: number}> = ({f}) => {
  ensurePostLoaded();
  const clara = PRODUTOS.estoque.clara;
  const LW = 600;
  const LH = 330;
  const prog = stepProg(f, 44, 100, 10);
  const pPrinter = S(f, 10, {damping: 13, stiffness: 130});
  const printing = f !== undefined && f > 44 && f < 100;
  const shake = printing && f !== undefined ? Math.sin(f * 2.4) * 1.6 : 0;
  const on = (at: number) => (f === undefined ? 1 : at === 0 ? 1 : A(f, at, 10));
  const px = (1080 - LW) / 2;
  return (
    <Slide>
      <Background tone="dark" id="ne-3" />
      <Top n={3} total={TOTAL} tone="dark" />
      <Fx p={A(f, 0)} dy={20}><Eyebrow tone="dark" top={210}>Etiqueta personalizável</Eyebrow></Fx>
      <Fx p={A(f, 5, 24)} dy={48}>
        <Title tone="dark" top={262} size={74}>
          A etiqueta tem a cara da sua operação.
        </Title>
      </Fx>
      <Fx p={A(f, 14, 24)}>
        <Support tone="dark" top={442} width={860} size={28}>
          Você escolhe o que sai impresso. Cada loja tem a sua.
        </Support>
      </Fx>

      <div style={{position: 'absolute', left: px - 30 + shake, top: 570, width: LW + 60, height: 46, borderRadius: 999, background: '#0B0B0F', boxShadow: '0 12px 24px rgba(0,0,0,.4)', zIndex: 3, opacity: Math.min(1, pPrinter * 2), transform: `translateY(${(1 - pPrinter) * -70}px)`}}>
        <div style={{position: 'absolute', left: 24, right: 24, bottom: 9, height: 7, borderRadius: 4, background: '#000'}} />
      </div>
      <div style={{position: 'absolute', left: px - 60, top: 606, width: LW + 120, height: 520, clipPath: 'inset(0 0 -80px 0)', zIndex: 2}}>
        <div style={{position: 'absolute', left: 60 + shake * 0.5, top: -10, transform: `translateY(${-(LH + 40) * (1 - prog)}px)`}}>
          <Paper width={LW}>
            <div style={{position: 'relative', height: LH - 26, padding: '22px 26px 0', display: 'flex'}}>
              <div style={{flex: 1}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                  <span style={{fontFamily: SANS, fontWeight: 700, fontSize: 26, letterSpacing: -0.3}}>Filé de peixe congelado</span>
                </div>
                <div style={{marginTop: 12, borderTop: '2px solid rgba(20,22,58,.25)', paddingTop: 10}}>
                  {campos.map((c) => (
                    <div key={c.k} style={{display: 'flex', gap: 10, fontSize: 18, height: 33, alignItems: 'center', opacity: on(c.at), transform: `translateX(${(1 - on(c.at)) * -16}px)`}}>
                      <span style={{color: TEXT2, width: 132}}>{c.k}</span>
                      <span style={{fontWeight: 700}}>{c.v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{width: 168, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingLeft: 8}}>
                <svg viewBox={`-1 -1 ${N + 2} ${N + 2}`} width={160} height={160}>
                  <path d={qrPath} fill={NAVY} />
                </svg>
                <span style={{marginTop: 6, fontSize: 13, color: TEXT2, letterSpacing: 2, textTransform: 'uppercase'}}>exemplo</span>
              </div>
            </div>
          </Paper>
        </div>
      </div>
      <div style={{position: 'absolute', left: PAD, right: PAD, top: 970, fontFamily: MONO, fontSize: 17, letterSpacing: 2, textTransform: 'uppercase', textAlign: 'center', color: 'rgba(251,251,254,.6)', opacity: A(f, 104, 14)}}>7,26 × 4 cm · o que sai impresso, você escolhe</div>
      <div style={{position: 'absolute', left: PAD, right: PAD, top: 1030, display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center'}}>
        {campos.map((c) => {
          const o = on(c.at);
          const isOn = f === undefined ? true : c.at === 0 || f >= c.at;
          return (
            <span key={c.k} style={{padding: '12px 22px', borderRadius: 999, fontFamily: SANS, fontWeight: 700, fontSize: 21, letterSpacing: 1, textTransform: 'uppercase', color: isOn ? NAVY : LAV, background: isOn ? clara : 'rgba(251,251,254,.12)', opacity: c.at === 0 ? A(f, 104, 14) : Math.max(A(f, 104, 14), o)}}>
              {isOn ? '✓ ' : ''}{c.k}
            </span>
          );
        })}
      </div>
      <Foot tone="dark" label="Norte Estoque" />
    </Slide>
  );
};
export const EstoqueEtiqueta: React.FC = () => <EtiquetaScene />;
export const EstoqueEtiquetaAnim: React.FC = () => <EtiquetaScene f={useCurrentFrame()} />;

/* ---------- 4 · inventário pelo celular (cor do produto, animado) ---------- */
export const BipScene: React.FC<{f?: number}> = ({f}) => {
  ensurePostLoaded();
  const PHW = 226;
  const pPhoto = S(f, 14, {damping: 16, stiffness: 90});
  const pPhone = S(f, 30, {damping: 15, stiffness: 100, mass: 0.8});
  const pCard = S(f, 46, {damping: 15, stiffness: 100});
  const alvo = A(f, 64, 14);
  const bip = f === undefined ? 1 : f >= 100 ? 1 : 0;
  const flash = f === undefined ? 0 : interpolate(f, [98, 102, 116], [0, 0.9, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const contados = bip ? 142 : 141;
  const okP = f === undefined ? 1 : A(f, 104, 12);
  return (
    <Slide>
      <Background tone="product" id="ne-4" />
      <Top n={4} total={TOTAL} tone="product" />
      <Fx p={A(f, 0)} dy={20}><Eyebrow tone="product" top={210}>Inventário</Eyebrow></Fx>
      <Fx p={A(f, 5, 24)} dy={48}>
        <Title tone="product" top={262} size={92}>
          Bipou, contou.
        </Title>
      </Fx>
      <Fx p={A(f, 14, 24)}>
        <Support tone="product" top={392} width={880} size={28}>
          O inventário é feito lendo a etiqueta com o celular. Sem prancheta e sem digitar código.
        </Support>
      </Fx>

      {/* foto real: etiqueta num pacote congelado */}
      <div style={{position: 'absolute', left: PAD, top: 560, width: 450, height: 650, borderRadius: 30, overflow: 'hidden', opacity: Math.min(1, pPhoto * 1.6), transform: `translateY(${(1 - pPhoto) * 120}px)`, boxShadow: '0 26px 34px rgba(0,0,0,.3)'}}>
        <Img src={FOTO_ETIQUETA} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 76%', display: 'block'}} />
        <div style={{position: 'absolute', left: 56, top: 222, width: 266, height: 206, opacity: alvo}}>
          {[
            {l: 0, t: 0, b: '4px 0 0 4px', r: '14px 0 0 0'},
            {r2: 0, t: 0, b: '4px 4px 0 0', rad: '0 14px 0 0'},
            {l: 0, b2: 0, b: '0 0 4px 4px', rad: '0 0 0 14px'},
            {r2: 0, b2: 0, b: '0 4px 4px 0', rad: '0 0 14px 0'},
          ].map((c: any, i) => (
            <span
              key={i}
              style={{position: 'absolute', width: 46, height: 46, left: c.l, right: c.r2, top: c.t, bottom: c.b2, borderStyle: 'solid', borderColor: WHITE, borderWidth: c.b, borderRadius: c.rad ?? c.r}}
            />
          ))}
        </div>
        <div style={{position: 'absolute', inset: 0, background: WHITE, opacity: flash * 0.55}} />
      </div>

      {/* celular */}
      <div style={{position: 'absolute', left: PAD + 450 + 34 + (424 - PHW) / 2, top: 560, width: PHW, opacity: Math.min(1, pPhone * 1.6), transform: `translateY(${(1 - pPhone) * 240}px)`, filter: 'drop-shadow(0 26px 34px rgba(0,0,0,.4))'}}>
        <div style={{background: FRAME, borderRadius: 40, padding: 9, border: '2px solid rgba(251,251,254,.12)'}}>
          <div style={{height: PHW * 2.02 - 18, borderRadius: 32, overflow: 'hidden', background: WHITE}}>
            <Img src={TELA_INVENTARIO} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'left top', display: 'block'}} />
          </div>
        </div>
      </div>

      {/* contador */}
      <div style={{position: 'absolute', left: PAD + 450 + 34, width: 424, top: 1040, height: 170, borderRadius: 28, background: WHITE, color: NAVY, padding: '22px 26px', boxSizing: 'border-box', fontFamily: SANS, opacity: Math.min(1, pCard * 1.6), transform: `translateY(${(1 - pCard) * 120}px) scale(${1 + flash * 0.03})`, filter: 'drop-shadow(0 22px 30px rgba(0,0,0,.25))'}}>
        <div style={{fontFamily: MONO, fontSize: 16, letterSpacing: 1.6, textTransform: 'uppercase', color: TEXT2}}>Inventário · itens contados</div>
        <div style={{display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 6}}>
          <span style={{fontWeight: 700, fontSize: 74, letterSpacing: -2, color: PRODUTOS.estoque.cor, lineHeight: 1}}>{contados}</span>
          <span style={{fontSize: 34, color: TEXT2}}>/144</span>
          <span style={{marginLeft: 'auto', fontFamily: MONO, fontSize: 16, fontWeight: 700, color: '#117C87', opacity: okP}}>✓ contado agora</span>
        </div>
      </div>
      <Foot tone="product" label="Norte Estoque" />
    </Slide>
  );
};
export const EstoqueBip: React.FC = () => <BipScene />;
export const EstoqueBipAnim: React.FC = () => <BipScene f={useCurrentFrame()} />;

/* ---------- 5 · tela inicial (papel quadriculado) ---------- */
export const EstoqueAtencao: React.FC = () => {
  ensurePostLoaded();
  const K = 1.57;
  return (
    <Slide>
      <Background tone="light" id="ne-5" />
      <Top n={5} total={TOTAL} tone="light" />
      <Eyebrow tone="light" top={210}>Tela inicial</Eyebrow>
      <Title tone="light" top={262} size={74}>
        Abriu o sistema, já sabe o que resolver.
      </Title>
      <Support tone="light" top={442} width={860} size={28}>
        A primeira tela mostra o que precisa de atenção hoje.
      </Support>
      <div style={{position: 'absolute', left: PAD, top: 552, width: 908, height: 632, borderRadius: 30, overflow: 'hidden', background: WHITE, border: '2px solid #E6E6EF', boxShadow: '0 26px 34px rgba(20,22,58,.16)'}}>
        <Img src={TELA_HOME} style={{position: 'absolute', width: 2000 * K, height: 1250 * K, left: -412 * K, top: -418 * K, maxWidth: 'none'}} />
      </div>
      <div style={{position: 'absolute', left: PAD, right: PAD, top: 1204, fontFamily: SANS, fontSize: 23, lineHeight: 1.35, color: TEXT2}}>
        O mínimo é seu: você define no Norte Estoque quanto de cada produto precisa ter.
      </div>
      <Foot tone="light" label="Norte Estoque" />
    </Slide>
  );
};

/* ---------- 6 · Omie (azul-noite, animado) ---------- */
const doOmie = ['Notas fiscais de entrada', 'Cadastro de produtos', 'Locais de estoque'];
const paraOmie = ['Ajustes de inventário', 'Ordens de produção concluídas'];

export const OmieScene: React.FC<{f?: number}> = ({f}) => {
  ensurePostLoaded();
  const clara = PRODUTOS.estoque.clara;
  const CW = 350;
  const top = 660;
  const CH = 340;
  const bx0 = PAD + CW;
  const bx1 = 1080 - PAD - CW;
  const w = bx1 - bx0;
  const y1 = top + 120;
  const y2 = top + 230;
  const ida = f === undefined ? 1 : A(f, 56, 26);
  const volta = f === undefined ? 1 : A(f, 92, 26);
  const dotIda = f === undefined ? 1 : interpolate(f, [84, 110], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const dotVolta = f === undefined ? 1 : interpolate(f, [120, 146], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const sync = f === undefined ? true : f >= 150;
  const pL = S(f, 22, {damping: 15, stiffness: 100});
  const pR = S(f, 34, {damping: 15, stiffness: 100});
  const card = (title: string, sub: string, items: string[], p: number, from: number) => (
    <div style={{width: CW, height: CH, boxSizing: 'border-box', borderRadius: 28, background: CARD_DARK, padding: '28px 28px', fontFamily: SANS, color: WHITE, opacity: Math.min(1, p * 1.6), transform: `translateX(${(1 - p) * from}px)`}}>
      <div style={{fontFamily: MONO, fontSize: 16, letterSpacing: 2.4, textTransform: 'uppercase', color: clara}}>{sub}</div>
      <div style={{marginTop: 8, fontWeight: 700, fontSize: 38, letterSpacing: -0.6}}>{title}</div>
      <div style={{marginTop: 22, display: 'flex', flexDirection: 'column', gap: 14}}>
        {items.map((it) => (
          <div key={it} style={{fontSize: 23, lineHeight: 1.25, display: 'flex', gap: 10}}>
            <span style={{color: clara}}>✓</span>
            <span>{it}</span>
          </div>
        ))}
      </div>
    </div>
  );
  return (
    <Slide>
      <Background tone="dark" id="ne-6" />
      <Top n={6} total={TOTAL} tone="dark" />
      <Fx p={A(f, 0)} dy={20}><Eyebrow tone="dark" top={210}>Feito para quem usa Omie</Eyebrow></Fx>
      <Fx p={A(f, 5, 24)} dy={48}>
        <Title tone="dark" top={262} size={64}>
          O Omie cuida da gestão. O Norte Estoque cuida do depósito.
        </Title>
      </Fx>
      <Fx p={A(f, 14, 24)}>
        <Support tone="dark" top={500} width={880} size={28}>
          Os dois conversam sozinhos, a cada 10 minutos. Ninguém digita a mesma coisa duas vezes.
        </Support>
      </Fx>

      <div style={{position: 'absolute', left: PAD, top}}>{card('Gestão', 'Omie', doOmie, pL, -80)}</div>
      <div style={{position: 'absolute', right: PAD, top}}>{card('Depósito', 'Norte Estoque · volta para o Omie', paraOmie, pR, 80)}</div>

      <svg width={1080} height={1350} style={{position: 'absolute', inset: 0}} fill="none">
        <path d={`M${bx0 + 10} ${y1} C ${bx0 + w * 0.4} ${y1}, ${bx0 + w * 0.6} ${y1 - 30}, ${bx1 - 10} ${y1}`} stroke={clara} strokeWidth={4} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - ida} />
        <path d={`M${bx1 - 10} ${y2} C ${bx0 + w * 0.6} ${y2}, ${bx0 + w * 0.4} ${y2 + 30}, ${bx0 + 10} ${y2}`} stroke={WHITE} strokeOpacity={0.85} strokeWidth={4} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - volta} />
        {f !== undefined && dotIda > 0 && dotIda < 1 && <circle cx={bx0 + 10 + dotIda * (w - 20)} cy={y1 - Math.sin(dotIda * Math.PI) * 15} r={9} fill={clara} />}
        {f !== undefined && dotVolta > 0 && dotVolta < 1 && <circle cx={bx1 - 10 - dotVolta * (w - 20)} cy={y2 + Math.sin(dotVolta * Math.PI) * 15} r={9} fill={WHITE} />}
      </svg>
      <div style={{position: 'absolute', left: bx0, width: w, top: top + 150, textAlign: 'center', fontFamily: MONO, fontSize: 15, letterSpacing: 1.4, textTransform: 'uppercase', color: 'rgba(251,251,254,.7)', opacity: A(f, 50, 14)}}>a cada<br />10 minutos</div>
      <div style={{position: 'absolute', left: bx0 - 30, width: w + 60, top: top + CH + 30, textAlign: 'center', fontFamily: SANS, fontWeight: 700, fontSize: 24, color: sync ? clara : 'rgba(251,251,254,.7)', opacity: A(f, 56, 14)}}>
        {sync ? 'sincronizado ✓' : 'sincronizando…'}
      </div>
      <Foot tone="dark" label="Norte Estoque" />
    </Slide>
  );
};
export const EstoqueOmie: React.FC = () => <OmieScene />;
export const EstoqueOmieAnim: React.FC = () => <OmieScene f={useCurrentFrame()} />;

/* ---------- 7 · funcionalidades (papel quadriculado) ---------- */
const funcoes = [
  {Icon: Tag, t: 'Etiqueta com QR', d: 'Uma para cada produto, com lote e validade.'},
  {Icon: ScanLine, t: 'Inventário no celular', d: 'Lendo a etiqueta, sem prancheta.'},
  {Icon: ArrowLeftRight, t: 'Transferência', d: 'Entre locais, lojas e armazéns.'},
  {Icon: Factory, t: 'Ordem de produção', d: 'Concluída, ela volta para o Omie.'},
  {Icon: ShieldCheck, t: 'Permissões', d: 'Por tela e por ação. Acesso por convite.'},
  {Icon: ChartColumn, t: 'Relatórios', d: 'Margem, estoque valorizado e produtos parados.'},
];
const EstoqueFuncoesInner: React.FC = () => {
  const {cor} = useProduto();
  return (
    <>
      <Background tone="light" id="ne-7" />
      <Top n={7} total={TOTAL} tone="light" />
      <Eyebrow tone="light" top={210}>Funcionalidades</Eyebrow>
      <Title tone="light" top={262} size={74}>
        Tudo o que acontece no depósito.
      </Title>
      <div style={{position: 'absolute', left: PAD, right: PAD, top: 480, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18}}>
        {funcoes.map(({Icon, t, d}) => (
          <div key={t} style={{background: WHITE, border: '2px solid #E6E6EF', borderRadius: 28, padding: '26px 28px', height: 226, boxSizing: 'border-box', fontFamily: SANS, color: NAVY}}>
            <span style={{width: 60, height: 60, borderRadius: 18, background: `${cor}1a`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Icon size={30} color={cor} strokeWidth={2.2} />
            </span>
            <div style={{marginTop: 16, fontWeight: 700, fontSize: 29, letterSpacing: -0.4, lineHeight: 1.1}}>{t}</div>
            <div style={{marginTop: 8, fontSize: 22, lineHeight: 1.3, color: TEXT2}}>{d}</div>
          </div>
        ))}
      </div>
      <Foot tone="light" label="Norte Estoque" />
    </>
  );
};
export const EstoqueFuncoes: React.FC = () => {
  ensurePostLoaded();
  return <Slide><EstoqueFuncoesInner /></Slide>;
};

/* ---------- 8 · fechamento (azul-noite) ---------- */
const comecar = [
  {n: 'Omie', d: 'Feito para trabalhar junto com ele.'},
  {n: 'Etiquetas', d: 'Impressora térmica. A gente indica o modelo.'},
  {n: 'Lojas', d: 'Uma ou várias, com transferência entre elas.'},
];
export const EstoqueFechamento: React.FC = () => {
  ensurePostLoaded();
  return (
    <Slide>
      <Background tone="dark" id="ne-8" />
      <div style={{position: 'absolute', right: PAD, top: 80, fontFamily: MONO, fontSize: 22, color: mute('dark')}}>08/{String(TOTAL).padStart(2, '0')}</div>
      <div style={{position: 'absolute', left: PAD, top: 120}}>
        <Img src={LOGO_NEGOCIOS_BRANCO} style={{height: 130, width: 'auto'}} />
      </div>
      <Eyebrow tone="dark" top={340}>Norte Estoque</Eyebrow>
      <Title tone="dark" top={394} size={88}>
        O que <span style={{color: LAV}}>você precisa.</span>
      </Title>
      <Support tone="dark" top={510} width={860} size={28}>
        Etiqueta com QR, inventário pelo celular e sincronização com o Omie a cada 10 minutos.
      </Support>
      <div style={{position: 'absolute', left: PAD, right: PAD, top: 690, display: 'flex', flexDirection: 'column', gap: 14}}>
        {comecar.map((c) => (
          <div key={c.n} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, background: CARD_DARK, borderRadius: 28, padding: '0 30px', height: 112, fontFamily: SANS, color: WHITE}}>
            <span style={{fontWeight: 700, fontSize: 31, letterSpacing: -0.4}}>{c.n}</span>
            <span style={{fontSize: 22, lineHeight: 1.3, textAlign: 'right', maxWidth: 520, color: 'rgba(251,251,254,.86)'}}>{c.d}</span>
          </div>
        ))}
      </div>
      <div style={{position: 'absolute', left: PAD, right: PAD, top: 1090, height: 1, background: 'rgba(251,251,254,.2)'}} />
      <div style={{position: 'absolute', left: PAD, right: PAD, top: 1118, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <span style={{fontFamily: SANS, fontWeight: 700, fontSize: 21, letterSpacing: 2.6, textTransform: 'uppercase', color: WHITE, lineHeight: 1.4}}>
          Conheça
          <br />o Norte Estoque
        </span>
        <span style={{background: WHITE, color: NAVY, fontFamily: SANS, fontWeight: 700, fontSize: 30, padding: '22px 38px', borderRadius: 999}}>norteparanegocios.com.br →</span>
      </div>
    </Slide>
  );
};
