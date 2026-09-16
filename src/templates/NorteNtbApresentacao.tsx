import React from 'react';
import {AbsoluteFill, staticFile} from 'remotion';
import {ensureSansLoaded, ensureNewsreaderLoaded, FONT_SANS, FONT_SERIF_ROTAS} from '../lib/fonts';
import {GridTexture} from '../lib/GridTexture';
import {BrowserFrame} from '../lib/DeviceFrame';
import {Monitor3DFrame} from '../lib/Monitor3DFrame';
import {productColors, neutral, brand} from '../lib/themes';
import {Mascote} from '../lib/Mascote';

const INK = neutral.quasePreto;
const PAPER = neutral.begeClaro;
const BLUE = '#252966';
const WHITE = '#fffaf2';

function loadFonts(): void {
  ensureSansLoaded();
  ensureNewsreaderLoaded();
}

const Wordmark: React.FC<{light?: boolean}> = ({light = false}) => (
  <div style={{fontFamily: FONT_SANS, fontWeight: 700, fontSize: 14, letterSpacing: '0.12em', textTransform: 'uppercase', color: light ? WHITE : INK}}>
    NTB <span style={{opacity: 0.45}}>·</span> Norte para Negócios
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

// Slide 1 — posicionamento: a tese da NTB, sem começar pela venda do sistema.
export const CarrosselCapa: React.FC = () => {
  loadFonts();
  return (
    <AbsoluteFill style={{background: BLUE, padding: 86, color: WHITE}}>
      <GridTexture id="grid-norte-capa" color={WHITE} opacity={0.08} />
      <div style={{position: 'absolute', right: 70, top: 170, fontFamily: FONT_SERIF_ROTAS, fontSize: 560, lineHeight: 0.75, color: WHITE, opacity: 0.045}}>N</div>
      <div style={{position: 'relative', height: '100%', display: 'flex', flexDirection: 'column'}}>
        <Wordmark light />
        <div style={{marginTop: 254, maxWidth: 850}}>
          <Overline light color={productColors.vendas}>Norte para Negócios · consultoria e tecnologia</Overline>
          <div style={{height: 30}} />
          <h1 style={{fontFamily: FONT_SERIF_ROTAS, fontWeight: 400, fontSize: 92, lineHeight: 0.98, letterSpacing: '-0.045em', margin: 0}}>
            O norte de um negócio começa na operação.
          </h1>
          <div style={{height: 34}} />
          <p style={{fontFamily: FONT_SANS, fontSize: 24, lineHeight: 1.4, maxWidth: 610, margin: 0, color: `${WHITE}d9`}}>
            A NTB ajuda negócios a transformar a complexidade da rotina em uma operação mais clara, organizada e preparada para crescer.
          </p>
        </div>
        <div style={{position: 'absolute', right: 58, bottom: 86, opacity: 0.92}}>
          <Mascote size={146} style={{transform: 'rotate(12deg)'}} />
        </div>
        <div style={{position: 'absolute', left: 0, bottom: 92, fontFamily: FONT_SANS, fontWeight: 700, fontSize: 13, letterSpacing: '0.11em', textTransform: 'uppercase', color: `${WHITE}b8`}}>
          Estratégia · Processos · Tecnologia
        </div>
        <div style={{marginTop: 'auto'}}><FooterMark light /></div>
      </div>
    </AbsoluteFill>
  );
};

// Slide 2 — visão das soluções: apresenta o ecossistema sem explicar tudo ainda.
export const CarrosselSolucoes: React.FC = () => {
  loadFonts();
  return (
    <AbsoluteFill style={{background: PAPER, padding: 86, color: INK}}>
      <GridTexture id="grid-norte-solucoes" color={INK} opacity={0.07} />
      <div style={{position: 'relative', height: '100%', display: 'flex', flexDirection: 'column'}}>
        <Wordmark />
        <div style={{marginTop: 190}}>
          <Overline>Soluções NTB</Overline>
          <div style={{height: 30}} />
          <h1 style={{fontFamily: FONT_SERIF_ROTAS, fontWeight: 400, fontSize: 70, lineHeight: 1.02, letterSpacing: '-0.04em', maxWidth: 820, margin: 0}}>
            A NTB transforma problemas da operação em soluções práticas.
          </h1>
          <p style={{fontFamily: FONT_SANS, fontSize: 20, lineHeight: 1.35, maxWidth: 690, margin: '24px 0 0', color: neutral.cinzaMedio}}>
            A NTB começa entendendo como o negócio funciona: onde a informação se perde, onde o retrabalho aparece e o que precisa ser conectado.
          </p>
        </div>
        <div style={{marginTop: 82, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 54, borderTop: `1px solid ${INK}28`, borderBottom: `1px solid ${INK}28`, padding: '38px 0 44px'}}>
          <div style={{borderRight: `1px solid ${INK}28`, paddingRight: 44}}>
            <div style={{fontFamily: FONT_SANS, fontWeight: 700, fontSize: 15, letterSpacing: '0.11em', textTransform: 'uppercase', color: productColors.vendas}}>01 · NTB Vendas</div>
            <div style={{height: 18}} />
            <div style={{fontFamily: FONT_SERIF_ROTAS, fontSize: 38, lineHeight: 1.05}}>Do atendimento ao fechamento.</div>
            <div style={{height: 18}} />
            <div style={{fontFamily: FONT_SANS, fontSize: 17, lineHeight: 1.35, color: neutral.cinzaMedio}}>Mesas, comandas e pedidos organizados para a equipe acompanhar o que precisa acontecer.</div>
          </div>
          <div>
            <div style={{fontFamily: FONT_SANS, fontWeight: 700, fontSize: 15, letterSpacing: '0.11em', textTransform: 'uppercase', color: productColors.estoque}}>02 · NTB Estoque</div>
            <div style={{height: 18}} />
            <div style={{fontFamily: FONT_SERIF_ROTAS, fontSize: 38, lineHeight: 1.05}}>Do inventário à movimentação.</div>
            <div style={{height: 18}} />
            <div style={{fontFamily: FONT_SANS, fontSize: 17, lineHeight: 1.35, color: neutral.cinzaMedio}}>Mais visibilidade sobre o estoque físico, as etiquetas, os inventários e as transferências.</div>
          </div>
        </div>
        <div style={{marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 18, fontFamily: FONT_SANS, fontSize: 16, color: neutral.cinzaEscuro}}>
          <span style={{fontWeight: 700, color: brand.primary}}>Estratégia</span>
          <span>·</span>
          <span style={{fontWeight: 700, color: productColors.vendas}}>Processos</span>
          <span>·</span>
          <span style={{fontWeight: 700, color: productColors.estoque}}>Tecnologia</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Slide 3 — NTB Vendas: funções confirmadas pelo briefing e pelo print real.
export const CarrosselVendas: React.FC = () => {
  loadFonts();
  return (
    <AbsoluteFill style={{background: PAPER, padding: 86, color: INK}}>
      <GridTexture id="grid-norte-vendas" color={INK} opacity={0.07} />
      <div style={{position: 'relative', height: '100%', display: 'flex', flexDirection: 'column'}}>
        <Wordmark />
        <div style={{marginTop: 108, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
          <div>
            <Overline color={productColors.vendas}>NTB Vendas</Overline>
            <div style={{height: 26}} />
            <h1 style={{fontFamily: FONT_SERIF_ROTAS, fontWeight: 400, fontSize: 72, lineHeight: 0.98, letterSpacing: '-0.045em', maxWidth: 630, margin: 0}}>
              O pedido não para na mesa.
            </h1>
          </div>
          <div style={{fontFamily: FONT_SANS, fontSize: 18, lineHeight: 1.35, maxWidth: 260, paddingBottom: 6}}>
            O pedido nasce no atendimento e continua visível para quem precisa agir — da mesa à cozinha.
          </div>
        </div>
        <div style={{marginTop: 46, display: 'flex', justifyContent: 'center'}}>
          <Monitor3DFrame screenshot={staticFile('screenshots/vendas-mesas-comandas.png')} width={874} sourceWidth={1910} sourceHeight={984} />
        </div>
        <div style={{position: 'absolute', left: 0, bottom: 74, display: 'flex', gap: 14, fontFamily: FONT_SANS, fontWeight: 700, fontSize: 13, letterSpacing: '0.10em', textTransform: 'uppercase', color: neutral.cinzaEscuro}}>
          <span style={{color: productColors.vendas}}>Mesas e comandas</span><span>·</span><span>Pedidos na cozinha</span><span>·</span><span>Funcionamento offline</span>
        </div>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 0}}><FooterMark /></div>
      </div>
    </AbsoluteFill>
  );
};

// Slide 4 — NTB Estoque: funções confirmadas no pitch Norte Estoque.
export const CarrosselEstoque: React.FC = () => {
  loadFonts();
  return (
    <AbsoluteFill style={{background: PAPER, padding: 86, color: INK}}>
      <GridTexture id="grid-norte-estoque" color={INK} opacity={0.07} />
      <div style={{position: 'relative', height: '100%', display: 'flex', flexDirection: 'column'}}>
        <Wordmark />
        <div style={{marginTop: 132, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
          <div>
            <Overline color={productColors.estoque}>NTB Estoque</Overline>
            <div style={{height: 26}} />
            <h1 style={{fontFamily: FONT_SERIF_ROTAS, fontWeight: 400, fontSize: 76, lineHeight: 0.98, letterSpacing: '-0.045em', maxWidth: 650, margin: 0}}>
              O estoque acompanha o que acontece na operação.
            </h1>
          </div>
          <div style={{fontFamily: FONT_SANS, fontSize: 18, lineHeight: 1.35, maxWidth: 260, paddingBottom: 6}}>
            O NTB Estoque organiza o controle físico para que a equipe acompanhe o que entrou, saiu e precisa ser conferido.
          </div>
        </div>
        <div style={{marginTop: 62, display: 'flex', justifyContent: 'center'}}>
          <BrowserFrame screenshot={staticFile('screenshots/ntb-estoque-dashboard-donana-brotas.jpg')} width={908} addressLabel="app.ntbestoque.com.br" sourceWidth={1568} sourceHeight={759} />
        </div>
        <div style={{marginTop: 30, display: 'flex', gap: 14, fontFamily: FONT_SANS, fontWeight: 700, fontSize: 13, letterSpacing: '0.10em', textTransform: 'uppercase', color: neutral.cinzaEscuro}}>
          <span style={{color: productColors.estoque}}>Etiquetas</span><span>·</span><span>Inventários online</span><span>·</span><span>Transferências em massa</span><span>·</span><span>Rastreabilidade</span>
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
      <GridTexture id="grid-norte-fechamento" color={WHITE} opacity={0.08} />
      <div style={{position: 'relative', height: '100%', display: 'flex', flexDirection: 'column'}}>
        <Wordmark light />
        <div style={{marginTop: 236}}>
          <Overline light color={productColors.estoque}>Norte para Negócios</Overline>
          <div style={{height: 30}} />
          <h1 style={{fontFamily: FONT_SERIF_ROTAS, fontWeight: 400, fontSize: 88, lineHeight: 0.98, letterSpacing: '-0.045em', maxWidth: 820, margin: 0}}>
            Organização é o que dá direção ao negócio.
          </h1>
          <div style={{height: 34}} />
          <p style={{fontFamily: FONT_SANS, fontSize: 23, lineHeight: 1.4, maxWidth: 620, margin: 0, color: `${WHITE}d9`}}>
            A NTB une consultoria, processos e tecnologia para transformar a complexidade da operação em uma rotina mais clara e bem cuidada.
          </p>
          <p style={{fontFamily: FONT_SANS, fontSize: 19, lineHeight: 1.4, maxWidth: 560, margin: '24px 0 0', color: `${WHITE}b8`}}>
            Começamos entendendo o negócio. A solução vem depois.
          </p>
        </div>
        <div style={{marginTop: 'auto', borderTop: `1px solid ${WHITE}45`, paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
          <div style={{fontFamily: FONT_SANS, fontWeight: 700, fontSize: 16, letterSpacing: '0.10em', textTransform: 'uppercase'}}>Conheça a NTB</div>
          <div style={{fontFamily: FONT_SANS, fontSize: 14, color: `${WHITE}aa`}}>norteparanegocios.com.br</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
