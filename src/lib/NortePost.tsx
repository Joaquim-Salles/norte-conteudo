import React from 'react';
import {AbsoluteFill, Easing, Img, interpolate, spring, staticFile} from 'remotion';
import {FONT_POST as SANS, FONT_POST_MONO as MONO} from './fonts';
import {GridTexture} from './GridTexture';

/**
 * Biblioteca de blocos dos posts Norte (ver AGENTS.md e docs/GUIA-POSTS-NORTE.md).
 * Extraída do carrossel "Norte Vendas" (5 slides, 4:5, 1080 x 1350).
 * Segue o Kit de Marca Norte (MARCA.md §4, §4b, §6) e a régua aprovada `solucoes-norte`:
 * Atkinson Hyperlegible, assinatura oficial no topo, margem de 86 px, cada slide com
 * identidade própria (produto, papel quadriculado, azul-noite, produto, azul-noite).
 * Texto só com fatos do site (sections/vendas). Dado de cupom/ticket é sempre "exemplo".
 */

export const NAVY = '#14163A';
export const VENDAS = '#484DB5';
export const VENDAS_CLARA = '#8D92F0';
export const LAV = '#B9BCEB';
export const WHITE = '#FBFBFE';
export const PAPER = '#F5F5F9';
export const TEXT2 = '#4A4A63';
export const THERMAL = '#FFFDF8';
export const FRAME = '#1A1B2E';
export const PAD = 86;
export const TOTAL = 5;

export const kit = (p: string) => staticFile(`brand-kit/${p}`);
export const LOGO_NEGOCIOS_BRANCO = kit('01-logos/norte-para-negocios/horizontal/norte-para-negocios_horizontal_branco_transparente.png');
export const LOGO_NEGOCIOS_AZUL = kit('01-logos/norte-para-negocios/horizontal/norte-para-negocios_horizontal_azul-noite_transparente.png');


// cor de cada produto (MARCA.md §3). "clara" alimenta a luz do fundo; onde o kit não define, é a cor misturada com branco.
export const PRODUTOS = {
  vendas: {cor: '#484DB5', clara: '#8D92F0', nome: 'Norte Vendas'},
  estoque: {cor: '#168E9A', clara: '#5FD3DC', nome: 'Norte Estoque'},
  avalia: {cor: '#9A3B86', clara: '#C58BB8', nome: 'Norte Avalia'},
  pisos: {cor: '#00497E', clara: '#5C93B8', nome: 'Norte Pisos'},
} as const;
export type ProdutoId = keyof typeof PRODUTOS;
const ProdutoCtx = React.createContext<ProdutoId>('vendas');
/** Envolva o slide com <Produto id="estoque"> para trocar a cor do produto em Background, Eyebrow e Chip. */
export const Produto: React.FC<{id: ProdutoId; children: React.ReactNode}> = ({id, children}) => <ProdutoCtx.Provider value={id}>{children}</ProdutoCtx.Provider>;
export const useProduto = () => PRODUTOS[React.useContext(ProdutoCtx)];

// animação: `f` indefinido = quadro final (usado nas imagens estáticas)
export const ease = Easing.bezier(0.16, 1, 0.3, 1);
export const A = (f: number | undefined, start: number, dur = 18) =>
  f === undefined ? 1 : interpolate(f, [start, start + dur], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease});
export const S = (f: number | undefined, start: number, config: {damping: number; stiffness: number; mass?: number}) =>
  f === undefined ? 1 : spring({frame: f - start, fps: 30, config});
export const Fx: React.FC<{p: number; dy?: number; children: React.ReactNode}> = ({p, dy = 36, children}) => (
  <div style={{position: 'absolute', inset: 0, opacity: p, transform: `translateY(${(1 - p) * dy}px)`, pointerEvents: 'none'}}>{children}</div>
);

export type Tone = 'dark' | 'light' | 'product';

export const fg = (t: Tone) => (t === 'light' ? NAVY : WHITE);
export const mute = (t: Tone) => (t === 'light' ? 'rgba(20,22,58,.55)' : 'rgba(251,251,254,.66)');

export const Background: React.FC<{tone: Tone; id: string}> = ({tone, id}) => {
  const prod = useProduto();
  if (tone === 'light') {
    return (
      <AbsoluteFill style={{background: PAPER}}>
        <GridTexture id={id} color={NAVY} opacity={0.05} />
      </AbsoluteFill>
    );
  }
  const base = tone === 'product' ? prod.cor : NAVY;
  const light = tone === 'product' ? prod.clara : '#2E3380';
  return (
    <AbsoluteFill style={{background: base}}>
      <AbsoluteFill style={{background: `radial-gradient(ellipse 70% 55% at 50% 42%, ${light}8c 0%, transparent 70%)`}} />
      <AbsoluteFill style={{background: 'radial-gradient(ellipse 85% 75% at 50% 50%, transparent 55%, rgba(0,0,0,.30) 100%)'}} />
      <GridTexture id={id} color={WHITE} opacity={0.05} />
    </AbsoluteFill>
  );
};

// assinatura oficial (62 px de altura) + página em Mono
export const Top: React.FC<{n: number; tone: Tone; total?: number}> = ({n, tone, total = TOTAL}) => (
  <div style={{position: 'absolute', left: PAD, right: PAD, top: 66, height: 62, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
    <Img src={tone === 'light' ? LOGO_NEGOCIOS_AZUL : LOGO_NEGOCIOS_BRANCO} style={{height: 62, width: 'auto'}} />
    <span style={{fontFamily: MONO, fontSize: 22, color: mute(tone)}}>
      {String(n).padStart(2, '0')}/{String(total).padStart(2, '0')}
    </span>
  </div>
);

export const Foot: React.FC<{tone: Tone; last?: boolean; label?: string}> = ({tone, last, label = 'Norte Vendas'}) => (
  <div style={{position: 'absolute', left: PAD, right: PAD, bottom: 64, display: 'flex', justifyContent: 'space-between', fontFamily: SANS, fontWeight: 700, fontSize: 20, letterSpacing: 2.4, textTransform: 'uppercase', color: mute(tone)}}>
    <span>{label}</span>
    {!last && <span>Deslize →</span>}
  </div>
);

export const Eyebrow: React.FC<{tone: Tone; top: number; children: React.ReactNode}> = ({tone, top, children}) => {
  const c = tone === 'light' ? useProduto().cor : LAV;
  return (
  <div style={{position: 'absolute', left: PAD, top, display: 'flex', alignItems: 'center', gap: 16, fontFamily: SANS, fontWeight: 700, fontSize: 21, letterSpacing: 3, textTransform: 'uppercase', color: c}}>
    <span style={{display: 'block', width: 40, height: 3, background: c, borderRadius: 2}} />
    {children}
  </div>
);
};

export const Title: React.FC<{tone: Tone; top: number; size?: number; children: React.ReactNode}> = ({tone, top, size = 80, children}) => (
  <h1 style={{position: 'absolute', left: PAD, right: PAD, top, margin: 0, fontFamily: SANS, fontWeight: 700, fontSize: size, lineHeight: 1.04, letterSpacing: -size * 0.025, color: fg(tone)}}>{children}</h1>
);

export const Support: React.FC<{tone: Tone; top: number; width?: number; size?: number; children: React.ReactNode}> = ({tone, top, width = 860, size = 29, children}) => (
  <p style={{position: 'absolute', left: PAD, top, width, margin: 0, fontFamily: SANS, fontSize: size, lineHeight: 1.42, color: tone === 'light' ? TEXT2 : 'rgba(251,251,254,.86)'}}>{children}</p>
);

export const Chip: React.FC<{tone: Tone; children: React.ReactNode}> = ({tone, children}) => {
  const c = useProduto().cor;
  return (
  <span style={{padding: '12px 22px', borderRadius: 999, fontFamily: SANS, fontWeight: 700, fontSize: 22, letterSpacing: 1.2, textTransform: 'uppercase', background: tone === 'light' ? `${c}1a` : 'rgba(251,251,254,.14)', color: tone === 'light' ? c : WHITE}}>{children}</span>
  );
};

// borda serrilhada do papel térmico
export const zig = (w: number, step = 14, depth = 9) => {
  const pts: string[] = ['0 0', `${w} 0`, `${w} calc(100% - ${depth}px)`];
  for (let x = w; x >= 0; x -= step) {
    pts.push(`${x} calc(100% - ${depth}px)`);
    pts.push(`${Math.max(x - step / 2, 0)} 100%`);
  }
  return `polygon(${pts.join(',')})`;
};

export const Paper: React.FC<{width: number; children: React.ReactNode; style?: React.CSSProperties}> = ({width, children, style}) => (
  <div style={{filter: 'drop-shadow(0 14px 22px rgba(20,22,58,.22))', ...style}}>
    <div style={{width, background: THERMAL, color: NAVY, fontFamily: MONO, clipPath: zig(width), paddingBottom: 26}}>{children}</div>
  </div>
);

