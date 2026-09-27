import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {ensureSansLoaded, ensureNewsreaderLoaded, FONT_SANS, FONT_SERIF_ROTAS} from '../lib/fonts';
import {GridTexture} from '../lib/GridTexture';
import {BrowserFrame} from '../lib/DeviceFrame';
import {productColors, neutral, brand} from '../lib/themes';

const INK = neutral.quasePreto;
const PAPER = '#F5F5F9';
const BLUE = '#484DB5';
const DEEP = '#0A091E';
const WHITE = '#FBFBFE';

function loadFonts(): void {
  ensureSansLoaded();
  ensureNewsreaderLoaded();
}

const Wordmark: React.FC<{light?: boolean}> = ({light = false}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 12, fontFamily: FONT_SANS, fontWeight: 700, fontSize: 16, letterSpacing: '-0.01em', color: light ? WHITE : INK}}>
    <Img src={staticFile('logos/norte-mark.svg')} style={{width: 36, height: 36, display: 'block'}} />
    Norte para Negócios
  </div>
);

const Overline: React.FC<{children: React.ReactNode; color?: string; light?: boolean}> = ({children, color = brand.primary, light = false}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 12, fontFamily: FONT_SANS, fontWeight: 700, fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', color: light ? WHITE : INK}}>
    <span style={{display: 'block', width: 34, height: 2, background: color}} />
    {children}
  </div>
);

const FooterMark: React.FC<{light?: boolean}> = ({light = false}) => (
  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: FONT_SANS, fontSize: 13, letterSpacing: '0.10em', textTransform: 'uppercase', color: light ? `${WHITE}aa` : `${INK}88`}}>
    <span>Norte para Negócios</span>
    <span>Deslize →</span>
  </div>
);

const CoverProductCard: React.FC<{
  label: string;
  accent: string;
  screenshot: string;
  style?: React.CSSProperties;
}> = ({label, accent, screenshot, style}) => (
  <div
    style={{
      position: 'absolute',
      width: 330,
      padding: 12,
      borderRadius: 18,
      background: `${WHITE}f2`,
      boxShadow: '0 28px 55px rgba(10, 9, 30, 0.26)',
      transformOrigin: 'center',
      ...style,
    }}
  >
    <div style={{display: 'flex', alignItems: 'center', gap: 8, padding: '4px 7px 11px', fontFamily: FONT_SANS, fontWeight: 700, fontSize: 12, letterSpacing: '0.10em', textTransform: 'uppercase', color: accent}}>
      <span style={{width: 8, height: 8, borderRadius: '50%', background: accent}} />
      {label}
    </div>
    <div style={{height: 142, overflow: 'hidden', borderRadius: 10, background: '#fff'}}>
      <Img src={screenshot} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block'}} />
    </div>
  </div>
);

const DataMask: React.FC<{left: number; top: number; width: number; height: number; dark?: boolean}> = ({left, top, width, height, dark = false}) => (
  <div
    style={{
      position: 'absolute',
      left,
      top,
      width,
      height,
      borderRadius: 6,
      background: dark ? 'rgba(10, 9, 30, 0.78)' : 'rgba(245, 245, 249, 0.82)',
      border: dark ? '1px solid rgba(255,255,255,0.14)' : '1px solid rgba(72,77,181,0.12)',
      backdropFilter: 'blur(7px)',
    }}
  />
);

// Slide 1 — posicionamento: a tese da NTB, sem começar pela venda do sistema.
export const CarrosselCapa: React.FC = () => {
  loadFonts();
  return (
    <AbsoluteFill style={{background: BLUE, padding: 86, color: WHITE}}>
      <GridTexture id="grid-norte-capa" color={WHITE} opacity={0.065} />
      <div style={{position: 'absolute', right: -220, top: 130, width: 700, height: 700, border: `1px solid ${WHITE}24`, borderRadius: '50%'}} />
      <div style={{position: 'absolute', right: -130, top: 220, width: 510, height: 510, border: `1px solid ${WHITE}20`, borderRadius: '50%'}} />
      <div style={{position: 'absolute', right: 70, bottom: -220, width: 520, height: 520, background: `${DEEP}20`, borderRadius: '50%'}} />
      <div style={{position: 'relative', height: '100%', display: 'flex', flexDirection: 'column'}}>
        <Wordmark light />
        <CoverProductCard label="Norte Vendas" accent="#D9DBFF" screenshot={staticFile('screenshots/vendas-mesas-comandas.png')} style={{right: 16, top: 188, transform: 'rotate(4deg)'}} />
        <CoverProductCard label="Norte Estoque" accent="#57D1D0" screenshot={staticFile('screenshots/ntb-estoque-dashboard-donana-brotas.jpg')} style={{right: 58, top: 560, transform: 'rotate(-4deg)'}} />
        <div style={{marginTop: 210, maxWidth: 615}}>
          <Overline light color={productColors.vendas}>Norte para Negócios · consultoria e sistemas</Overline>
          <div style={{height: 30}} />
          <h1 style={{fontFamily: FONT_SERIF_ROTAS, fontWeight: 400, fontSize: 92, lineHeight: 0.98, letterSpacing: '-0.045em', margin: 0}}>
            Damos o norte para a sua operação.
          </h1>
          <div style={{height: 34}} />
          <p style={{fontFamily: FONT_SANS, fontSize: 24, lineHeight: 1.4, maxWidth: 550, margin: 0, color: `${WHITE}d9`}}>
            Consultoria que entra na operação e sistemas feitos para acompanhar o chão de loja.
          </p>
        </div>
        <div style={{position: 'absolute', left: 0, bottom: 92, fontFamily: FONT_SANS, fontWeight: 700, fontSize: 13, letterSpacing: '0.11em', textTransform: 'uppercase', color: `${WHITE}b8`}}>
          Consultoria · Processos · Sistemas
        </div>
        <div style={{marginTop: 'auto'}}><FooterMark light /></div>
      </div>
    </AbsoluteFill>
  );
};

// Slide 3 — visão das soluções: apresenta o ecossistema sem explicar tudo ainda.
export const CarrosselSolucoes: React.FC = () => {
  loadFonts();
  return (
    <AbsoluteFill style={{background: PAPER, padding: 86, color: INK}}>
      <GridTexture id="grid-norte-solucoes" color={INK} opacity={0.07} />
      <div style={{position: 'relative', height: '100%', display: 'flex', flexDirection: 'column'}}>
        <Wordmark />
        <div style={{marginTop: 190}}>
          <Overline>Soluções Norte</Overline>
          <div style={{height: 30}} />
          <h1 style={{fontFamily: FONT_SERIF_ROTAS, fontWeight: 400, fontSize: 70, lineHeight: 1.02, letterSpacing: '-0.04em', maxWidth: 820, margin: 0}}>
            A Norte transforma problemas da operação em soluções práticas.
          </h1>
          <p style={{fontFamily: FONT_SANS, fontSize: 20, lineHeight: 1.35, maxWidth: 690, margin: '24px 0 0', color: neutral.cinzaMedio}}>
            A gente começa entendendo como o negócio funciona: onde a informação se perde, onde o retrabalho aparece e o que precisa ser conectado.
          </p>
        </div>
        <div style={{marginTop: 82, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 54, borderTop: `1px solid ${INK}28`, borderBottom: `1px solid ${INK}28`, padding: '38px 0 44px'}}>
          <div style={{borderRight: `1px solid ${INK}28`, paddingRight: 44}}>
            <div style={{fontFamily: FONT_SANS, fontWeight: 700, fontSize: 15, letterSpacing: '0.11em', textTransform: 'uppercase', color: productColors.vendas}}>01 · Norte Vendas</div>
            <div style={{height: 18}} />
            <div style={{fontFamily: FONT_SERIF_ROTAS, fontSize: 38, lineHeight: 1.05}}>Do atendimento ao fechamento.</div>
            <div style={{height: 18}} />
            <div style={{fontFamily: FONT_SANS, fontSize: 17, lineHeight: 1.35, color: neutral.cinzaMedio}}>Mesas, comandas e pedidos organizados para a equipe acompanhar o que precisa acontecer.</div>
          </div>
          <div>
            <div style={{fontFamily: FONT_SANS, fontWeight: 700, fontSize: 15, letterSpacing: '0.11em', textTransform: 'uppercase', color: productColors.estoque}}>02 · Norte Estoque</div>
            <div style={{height: 18}} />
            <div style={{fontFamily: FONT_SERIF_ROTAS, fontSize: 38, lineHeight: 1.05}}>Do inventário à movimentação.</div>
            <div style={{height: 18}} />
            <div style={{fontFamily: FONT_SANS, fontSize: 17, lineHeight: 1.35, color: neutral.cinzaMedio}}>Mais visibilidade sobre o estoque físico, as etiquetas, os inventários e as transferências.</div>
          </div>
        </div>
        <div style={{marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 18, fontFamily: FONT_SANS, fontSize: 16, color: neutral.cinzaEscuro}}>
          <span style={{fontWeight: 700, color: brand.primary}}>Consultoria</span>
          <span>·</span>
          <span style={{fontWeight: 700, color: productColors.vendas}}>Processos</span>
          <span>·</span>
          <span style={{fontWeight: 700, color: productColors.estoque}}>Sistemas</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Slide 2 — Norte Vendas: funções confirmadas pela apresentação e pelo print real.
export const CarrosselVendas: React.FC = () => {
  loadFonts();
  return (
    <AbsoluteFill style={{background: DEEP, padding: 86, color: WHITE}}>
      <GridTexture id="grid-norte-vendas" color={WHITE} opacity={0.06} />
      <div style={{position: 'relative', height: '100%', display: 'flex', flexDirection: 'column'}}>
        <Wordmark light />
        <div style={{marginTop: 108, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
          <div>
            <Overline light color={productColors.vendas}>Norte Vendas · restaurantes, bares e lanchonetes</Overline>
            <div style={{height: 26}} />
            <h1 style={{fontFamily: FONT_SERIF_ROTAS, fontWeight: 400, fontSize: 72, lineHeight: 0.98, letterSpacing: '-0.045em', maxWidth: 630, margin: 0}}>
              Pedido, cozinha, caixa e nota fiscal. Num sistema só.
            </h1>
          </div>
          <div style={{fontFamily: FONT_SANS, fontSize: 18, lineHeight: 1.35, maxWidth: 260, paddingBottom: 6, color: `${WHITE}d0`}}>
            O pedido nasce no atendimento e continua visível para quem precisa agir — da mesa à cozinha, até o fechamento.
          </div>
        </div>
        <div style={{marginTop: 46, display: 'flex', justifyContent: 'center', position: 'relative'}}>
          <BrowserFrame screenshot={staticFile('screenshots/vendas-mesas-comandas.png')} width={908} addressLabel="vendas.norteparanegocios.com.br/#/loja" sourceWidth={1910} sourceHeight={984} />
          <DataMask left={46} top={64} width={118} height={28} dark />
          <DataMask left={250} top={154} width={69} height={18} />
          <DataMask left={393} top={154} width={76} height={18} />
          <DataMask left={536} top={154} width={72} height={18} />
          <DataMask left={680} top={154} width={72} height={18} />
          <DataMask left={250} top={249} width={75} height={18} />
          <DataMask left={393} top={249} width={82} height={18} />
          <DataMask left={680} top={249} width={75} height={18} />
        </div>
        <div style={{marginTop: 30, display: 'flex', gap: 14, fontFamily: FONT_SANS, fontWeight: 700, fontSize: 13, letterSpacing: '0.10em', textTransform: 'uppercase', color: `${WHITE}b8`}}>
          <span style={{color: '#D9DBFF'}}>Mesas e comandas</span><span>·</span><span>Pedidos na cozinha</span><span>·</span><span>Nota fiscal</span><span>·</span><span>Offline</span>
        </div>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 0}}><FooterMark light /></div>
      </div>
    </AbsoluteFill>
  );
};

// Slide 4 — Norte Estoque: funções confirmadas no pitch Norte Estoque.
export const CarrosselEstoque: React.FC = () => {
  loadFonts();
  return (
    <AbsoluteFill style={{background: PAPER, padding: 86, color: INK}}>
      <GridTexture id="grid-norte-estoque" color={INK} opacity={0.07} />
      <div style={{position: 'relative', height: '100%', display: 'flex', flexDirection: 'column'}}>
        <Wordmark />
        <div style={{marginTop: 132, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
          <div>
            <Overline color={productColors.estoque}>Norte Estoque</Overline>
            <div style={{height: 26}} />
            <h1 style={{fontFamily: FONT_SERIF_ROTAS, fontWeight: 400, fontSize: 76, lineHeight: 0.98, letterSpacing: '-0.045em', maxWidth: 650, margin: 0}}>
              Estoque, insumos e produção no mesmo fluxo.
            </h1>
          </div>
          <div style={{fontFamily: FONT_SANS, fontSize: 18, lineHeight: 1.35, maxWidth: 260, paddingBottom: 6}}>
            O Norte Estoque organiza o controle físico para que a equipe acompanhe o que entrou, saiu e precisa ser conferido.
          </div>
        </div>
        <div style={{marginTop: 62, display: 'flex', justifyContent: 'center', position: 'relative'}}>
          <BrowserFrame screenshot={staticFile('screenshots/ntb-estoque-dashboard-donana-brotas.jpg')} width={908} addressLabel="app.ntbestoque.com.br" sourceWidth={1568} sourceHeight={759} />
          <DataMask left={7} top={94} width={126} height={19} />
          <DataMask left={318} top={75} width={116} height={18} dark />
          <DataMask left={7} top={470} width={126} height={20} />
        </div>
        <div style={{marginTop: 30, display: 'flex', gap: 14, fontFamily: FONT_SANS, fontWeight: 700, fontSize: 13, letterSpacing: '0.10em', textTransform: 'uppercase', color: neutral.cinzaEscuro}}>
          <span style={{color: productColors.estoque}}>Etiquetas</span><span>·</span><span>Inventários online</span><span>·</span><span>Transferências em massa</span><span>·</span><span>Produção</span>
        </div>
        <div style={{marginTop: 'auto'}}><FooterMark /></div>
      </div>
    </AbsoluteFill>
  );
};

// Slide 5 — síntese de posicionamento e chamada final.
export const CarrosselFechamento: React.FC = () => {
  loadFonts();
  return (
    <AbsoluteFill style={{background: BLUE, padding: 86, color: WHITE}}>
      <GridTexture id="grid-norte-fechamento" color={WHITE} opacity={0.065} />
      <div style={{position: 'absolute', left: -180, bottom: -200, width: 600, height: 600, border: `1px solid ${WHITE}22`, borderRadius: '50%'}} />
      <div style={{position: 'absolute', right: -120, top: 120, width: 440, height: 440, background: `${DEEP}22`, borderRadius: '50%'}} />
      <div style={{position: 'relative', height: '100%', display: 'flex', flexDirection: 'column'}}>
        <Wordmark light />
        <div style={{marginTop: 236}}>
          <Overline light color={productColors.estoque}>Norte para Negócios</Overline>
          <div style={{height: 30}} />
          <h1 style={{fontFamily: FONT_SERIF_ROTAS, fontWeight: 400, fontSize: 88, lineHeight: 0.98, letterSpacing: '-0.045em', maxWidth: 820, margin: 0}}>
            Organização é o que dá direção à operação.
          </h1>
          <div style={{height: 34}} />
          <p style={{fontFamily: FONT_SANS, fontSize: 23, lineHeight: 1.4, maxWidth: 620, margin: 0, color: `${WHITE}d9`}}>
            A Norte une consultoria, processos e sistemas para transformar a complexidade da operação em uma rotina mais clara e bem cuidada.
          </p>
          <p style={{fontFamily: FONT_SANS, fontSize: 19, lineHeight: 1.4, maxWidth: 560, margin: '24px 0 0', color: `${WHITE}b8`}}>
            Começamos entendendo o negócio. O sistema vem depois.
          </p>
        </div>
        <div style={{marginTop: 'auto', borderTop: `1px solid ${WHITE}45`, paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
          <div style={{fontFamily: FONT_SANS, fontWeight: 700, fontSize: 16, letterSpacing: '0.10em', textTransform: 'uppercase'}}>Conheça a Norte</div>
          <div style={{fontFamily: FONT_SANS, fontSize: 14, color: `${WHITE}aa`}}>norteparanegocios.com.br</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
