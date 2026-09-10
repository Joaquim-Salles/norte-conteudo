import React from 'react';
import {AbsoluteFill} from 'remotion';
import {ensureSansLoaded, ensureNewsreaderLoaded, FONT_SANS, FONT_SERIF_ROTAS} from '../lib/fonts';
import {GridTexture} from '../lib/GridTexture';
import {Mascote} from '../lib/Mascote';
import {productColors, neutral, brand} from '../lib/themes';

/**
 * ARGUMENTO — 2ª reconstrução (2026-09-08, mesmo dia). A 1ª versão desta
 * rodada (bege trocado por blocos de cor cheia OMIE_COLOR/NTB_COLOR cobrindo
 * o slide inteiro, fonte Fraunces) foi REJEITADA pelo fundador: "não tem nada
 * a ver com a cara da Norte Para Negócios". Ele tinha razão — aquilo era um
 * sistema visual inventado do zero, sem nenhuma base nas 20+ rodadas já
 * aprovadas de Rotas/Vozes. A ESTRUTURA (sequência argumentativa sem trilho)
 * estava certa e continua igual — só a PELE visual foi refeita pra bater com
 * a marca real. Ver `CATALOGO.md`, Rodada 22, pro relato completo.
 *
 * PELE VISUAL CORRETA (confirmada nesta sessão, ver `references/formato-
 * rotas.md` e os renders reais `RotasCapa.png`/`VendasCapa.png`/
 * `InstitucionalCapa.png`):
 * - Fundo BEGE (`neutral.begeClaro`) é a base de TODO slide, inclusive o
 *   Fechamento (o padrão real de `RotasFechamentoShell` também é bege, não
 *   bloco de cor — só tem um halo suave atrás do Mascote).
 * - `GridTexture` sutil atrás do conteúdo (mesmo componente usado em todo o
 *   catálogo — não é específico do mecanismo de trilha, é textura de fundo).
 * - Tipografia: Newsreader (`FONT_SERIF_ROTAS` — serifada, itálico pra
 *   ênfase/citação) + Atkinson Hyperlegible (corpo/rótulo). NÃO Fraunces.
 * - Cor de produto (Omie `#56636f`, NTB `productColors.vendas` #f8a41a)
 *   entra só como DETALHE: rótulo/overline colorido, borda esquerda de
 *   card, linha fina de acento, texto colorido — nunca como fundo do slide
 *   inteiro.
 *
 * O QUE CONTINUA SEM MUDAR (mecanismo, não pele — já validado como certo):
 * - Sequência argumentativa (capa pergunta → afirmação Omie → limite →
 *   necessidade NTB → complementaridade → síntese+CTA), SEM trilho/rail/
 *   cotovelo/convergência física — segue não importando nada de
 *   `TrackRail.tsx`/`RotasKit.tsx`.
 * - Numeral gigante translúcido (01-04) como âncora visual dos 4 slides do
 *   meio, e o mesmo tratamento pro "?" da Capa / "+" do Fechamento — só
 *   recolorido pra opacidade baixa sobre bege (mesma faixa 0.05-0.08 do
 *   ícone gigante de `TrackSlide` em Rotas, em vez de branco/tinta sobre
 *   bloco de cor).
 * - Layout lado-a-lado do slide "Complementa" — mantido, mas agora como
 *   bege + 2 colunas com cor só na borda/rótulo, não 2 blocos de cor cheia.
 */

const OMIE_COLOR = '#56636f';
const NTB_COLOR = productColors.vendas; // '#f8a41a'
const BEGE = neutral.begeClaro;
const INK = neutral.quasePreto;

function loadFonts(): void {
  ensureSansLoaded();
  ensureNewsreaderLoaded();
}

// ---------------------------------------------------------------------------
// Overline — rótulo pequeno, maiúsculo, cor de produto (mesmo tratamento
// visual do `Overline` de Rotas, recriado aqui pra não importar RotasKit).
// ---------------------------------------------------------------------------
const Overline: React.FC<{children: React.ReactNode; color: string}> = ({children, color}) => (
  <div
    style={{
      fontFamily: FONT_SANS,
      fontWeight: 700,
      fontSize: 14,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color,
    }}
  >
    {children}
  </div>
);

// Linha fina de acento — SÓ um detalhe decorativo local a este slide, sem
// posição/altura compartilhada entre slides (nenhuma lógica de "trilha").
const AccentRule: React.FC<{color: string; width?: number}> = ({color, width = 64}) => (
  <div style={{width, height: 4, background: color, borderRadius: 2}} />
);

// Card de papel — cor só na borda esquerda (mesmo princípio do `TornBlock`
// de Rotas: card claro, acento de cor como borda, nunca fundo cheio).
const PaperCard: React.FC<{children: React.ReactNode; borderColor: string; rotate?: number}> = ({
  children,
  borderColor,
  rotate = 0,
}) => (
  <div
    style={{
      background: '#fffdf7',
      borderLeft: `6px solid ${borderColor}`,
      padding: '28px 32px',
      boxShadow: '0 10px 26px rgba(10,10,10,0.12)',
      transform: `rotate(${rotate}deg)`,
    }}
  >
    {children}
  </div>
);

const Headline: React.FC<{children: React.ReactNode; size?: number; maxWidth?: number}> = ({
  children,
  size = 52,
  maxWidth = 820,
}) => (
  <h1
    style={{
      fontFamily: FONT_SERIF_ROTAS,
      fontWeight: 400,
      fontSize: size,
      lineHeight: 1.14,
      letterSpacing: '-0.01em',
      color: INK,
      margin: 0,
      maxWidth,
    }}
  >
    {children}
  </h1>
);

const Body: React.FC<{children: React.ReactNode; maxWidth?: number}> = ({children, maxWidth = 620}) => (
  <p
    style={{
      fontFamily: FONT_SANS,
      fontWeight: 400,
      fontSize: 20,
      lineHeight: 1.5,
      color: neutral.cinzaEscuro,
      opacity: 0.86,
      margin: 0,
      maxWidth,
    }}
  >
    {children}
  </p>
);

/**
 * Numeral/glifo gigante translúcido — MESMO princípio do ícone gigante de
 * `TrackSlide` em Rotas (opacity 0.05-0.08, cor neutra, preenche o espaço
 * vazio do slide), recolorido em tinta sobre bege em vez de branco sobre
 * bloco de cor (correção desta rodada).
 */
const GlyphMark: React.FC<{children: React.ReactNode}> = ({children}) => (
  <div
    style={{
      position: 'absolute',
      right: 40,
      bottom: -56,
      fontFamily: FONT_SERIF_ROTAS,
      fontWeight: 400,
      fontSize: 440,
      lineHeight: 1,
      color: INK,
      opacity: 0.055,
      userSelect: 'none',
    }}
  >
    {children}
  </div>
);

const Tag: React.FC<{children: React.ReactNode; color: string}> = ({children, color}) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      fontFamily: FONT_SANS,
      fontWeight: 700,
      fontSize: 13,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: '#fffdf7',
      background: color,
      padding: '8px 16px',
      borderRadius: 999,
    }}
  >
    {children}
  </div>
);

// ---------------------------------------------------------------------------
// Slide 1 — Capa: bege + grade, 2 tags soltas (nunca ligadas por linha),
// pergunta-tema em Newsreader (roman + itálico), "?" gigante translúcido.
// ---------------------------------------------------------------------------
export const ArgumentoCapa: React.FC = () => {
  loadFonts();
  return (
    <AbsoluteFill style={{background: BEGE, padding: 80, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
      <GridTexture id="grid-argumento-capa" color={INK} opacity={0.09} />
      <GlyphMark>?</GlyphMark>
      <div style={{display: 'flex', gap: 10, marginBottom: 36, position: 'relative'}}>
        <Tag color={OMIE_COLOR}>Omie</Tag>
        <Tag color={NTB_COLOR}>NTB</Tag>
      </div>
      <div style={{position: 'relative'}}>
        <Headline size={64} maxWidth={860}>
          O Omie organiza a gestão.{' '}
          <span style={{fontStyle: 'italic'}}>E quem organiza a operação?</span>
        </Headline>
        <div style={{height: 26}} />
        <Body maxWidth={720}>
          Pedidos, mesas, cozinha, comandas e atendimento pedem um fluxo que o Omie não cobre —
          é aí que entram as soluções da NTB.
        </Body>
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// Slide 2 — Omie: contexto positivo (o que ele já cobre bem).
// ---------------------------------------------------------------------------
export const ArgumentoGestao: React.FC = () => {
  loadFonts();
  return (
    <AbsoluteFill style={{background: BEGE, padding: 80, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
      <GridTexture id="grid-argumento-gestao" color={INK} opacity={0.09} />
      <GlyphMark>01</GlyphMark>
      <div style={{position: 'relative'}}>
        <Overline color={OMIE_COLOR}>Omie</Overline>
        <div style={{height: 14}} />
        <AccentRule color={OMIE_COLOR} />
        <div style={{height: 26}} />
        <Headline size={52} maxWidth={760}>
          O Omie é peça central da gestão do negócio.
        </Headline>
        <div style={{height: 22}} />
        <Body>
          Fiscal, financeiro, números do caixa no fim do mês — o Omie organiza a gestão. Isso já
          é essencial, e continua sendo o de sempre.
        </Body>
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// Slide 3 — o limite: mesma pele, sem tag/overline (afirmação direta) — só
// a régua de acento continua marcando que é uma ideia nova.
// ---------------------------------------------------------------------------
export const ArgumentoLimite: React.FC = () => {
  loadFonts();
  return (
    <AbsoluteFill style={{background: BEGE, padding: 80, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
      <GridTexture id="grid-argumento-limite" color={INK} opacity={0.09} />
      <GlyphMark>02</GlyphMark>
      <div style={{position: 'relative'}}>
        <AccentRule color={neutral.cinzaClaro} width={48} />
        <div style={{height: 26}} />
        <Headline size={52} maxWidth={740}>
          Mas a operação do dia a dia fica de fora.
        </Headline>
        <div style={{height: 22}} />
        <Body>
          Pedido, mesa, cozinha, comanda, atendimento — isso não é gestão financeira. É outro
          fluxo, que o Omie não foi feito pra cobrir.
        </Body>
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// Slide 4 — NTB: a necessidade real + a virada, no mesmo slide.
// ---------------------------------------------------------------------------
export const ArgumentoOperacao: React.FC = () => {
  loadFonts();
  return (
    <AbsoluteFill style={{background: BEGE, padding: 80, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
      <GridTexture id="grid-argumento-operacao" color={INK} opacity={0.09} />
      <GlyphMark>03</GlyphMark>
      <div style={{position: 'relative'}}>
        <Overline color={NTB_COLOR}>NTB</Overline>
        <div style={{height: 14}} />
        <AccentRule color={NTB_COLOR} />
        <div style={{height: 26}} />
        <Headline size={48} maxWidth={780}>
          Pedido, mesa, cozinha, comanda, atendimento pedem outro fluxo.
        </Headline>
        <div style={{height: 22}} />
        <Body>É aí que entram as soluções da NTB — feitas pra operação do dia a dia, não pra fechar o mês.</Body>
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// Slide 5 — Complementa: bege + 2 colunas (cor só na borda/rótulo do card),
// não mais 2 blocos de cor cheia — pedido direto da revisão.
// ---------------------------------------------------------------------------
export const ArgumentoComplementa: React.FC = () => {
  loadFonts();
  return (
    <AbsoluteFill style={{background: BEGE, padding: 80, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
      <GridTexture id="grid-argumento-complementa" color={INK} opacity={0.09} />
      <GlyphMark>04</GlyphMark>
      <div style={{position: 'relative', display: 'flex', gap: 32, alignItems: 'flex-start'}}>
        <div style={{flex: '0 0 34%'}}>
          <Overline color={OMIE_COLOR}>Omie</Overline>
          <div style={{height: 16}} />
          <PaperCard borderColor={OMIE_COLOR} rotate={-1}>
            <p style={{fontFamily: FONT_SANS, fontWeight: 400, fontSize: 19, lineHeight: 1.45, color: neutral.cinzaEscuro, margin: 0}}>
              Cuida da gestão.
            </p>
          </PaperCard>
        </div>
        <div
          style={{
            width: 1,
            alignSelf: 'stretch',
            background: neutral.cinzaClaro,
            opacity: 0.4,
            marginTop: 8,
          }}
        />
        <div style={{flex: '1 1 auto'}}>
          <Overline color={NTB_COLOR}>NTB</Overline>
          <div style={{height: 16}} />
          <PaperCard borderColor={NTB_COLOR} rotate={0.6}>
            <Headline size={32} maxWidth={520}>
              Entra pra complementar o Omie com ferramentas operacionais.
            </Headline>
            <div style={{height: 16}} />
            <p style={{fontFamily: FONT_SANS, fontWeight: 400, fontSize: 18, lineHeight: 1.5, color: neutral.cinzaEscuro, opacity: 0.86, margin: 0, maxWidth: 480}}>
              Enquanto o Omie cuida da gestão, a NTB cuida da operação — pedido, mesa, comanda,
              atendimento. Os dois juntos, sem sobreposição.
            </p>
          </PaperCard>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// Slide 6 — Fechamento: bege (padrão real de Rotas), halo suave atrás do
// Mascote (mistura sutil das 2 cores, sem gradiente cobrindo o slide),
// headline em Newsreader com ênfase itálica + CTA.
// ---------------------------------------------------------------------------
export const ArgumentoFechamento: React.FC = () => {
  loadFonts();
  return (
    <AbsoluteFill
      style={{
        background: BEGE,
        padding: '96px 80px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <GridTexture id="grid-argumento-fechamento" color={INK} opacity={0.09} />
      <div style={{position: 'relative'}}>
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: 360,
            height: 360,
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${OMIE_COLOR}22 0%, ${NTB_COLOR}22 55%, ${brand.primary}00 78%)`,
          }}
        />
        <Mascote size={150} style={{position: 'relative'}} />
      </div>
      <div style={{height: 44}} />
      <div style={{position: 'relative'}}>
        <Headline size={50} maxWidth={780}>
          Gestão e operação, <span style={{fontStyle: 'italic'}}>funcionando juntas</span>.
        </Headline>
        <div style={{height: 28}} />
        <Overline color={neutral.cinzaEscuro}>Salve este post e acompanhe a NTB</Overline>
      </div>
    </AbsoluteFill>
  );
};

export const argumentoCapaDefaultProps = {};
export const argumentoGestaoDefaultProps = {};
export const argumentoLimiteDefaultProps = {};
export const argumentoOperacaoDefaultProps = {};
export const argumentoComplementaDefaultProps = {};
export const argumentoFechamentoDefaultProps = {};
