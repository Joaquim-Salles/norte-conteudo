import React from 'react';
import {AbsoluteFill} from 'remotion';
import {ensureSansLoaded, ensureNewsreaderLoaded, FONT_SANS, FONT_SERIF_ROTAS} from './fonts';
import {GridTexture} from './GridTexture';
import {TrackRail, RailTrack, ElbowSpec, CONVERGE_X, CONVERGE_Y} from './TrackRail';
import {Mascote} from './Mascote';
import {neutral, brand} from './themes';

/**
 * ROTAS KIT — extração genérica do template `Rotas.tsx` (a peça original,
 * "3 perfis de negócio do NTB Estoque", Rodadas 1-9), feita na rodada de
 * multiplicação (2026-09-05: "criar VÁRIOS posts Rotas, temas diferentes").
 *
 * DECISÃO DE REFATORAÇÃO: extrair pra cá tudo que é ESTRUTURA (Overline,
 * TornBlock, PostitCard, HandDrawnAnnotation, o slide de trilha genérico, os
 * shells de Capa/Fechamento) e deixar em `Rotas.tsx` só a CONFIGURAÇÃO
 * daquela peça específica (cores, textos, ícones). As 3 peças novas
 * (`RotasVendas.tsx`, `RotasAvalia.tsx`, `RotasInstitucional.tsx`) importam
 * daqui e só declaram dados — evita copiar ~500 linhas 3x. `Rotas.tsx`
 * (NTB Estoque) NÃO foi migrado pra usar o kit nesta rodada, de propósito:
 * já está aprovado pelo fundador ("tá muito legal agora") e o risco de
 * regressão ao migrar uma peça que já funciona não vale o ganho de DRY —
 * fica como está, arquivo próprio, igual já era. O kit é usado só pelas
 * peças NOVAS a partir daqui.
 *
 * TUDO que já era regra do formato (fundo bege único, linha reta na própria
 * homeY, conteúdo na altura da trilha, ícone pequeno + gigante sutil, linha
 * nunca muda de cor, fechamento convergindo no Mascote) é preservado
 * integralmente — só mudou de arquivo.
 */

// ---------------------------------------------------------------------------
// Posições de trilha — genérico pra N trilhas (2, 3 ou 4), sempre em faixas
// de altura CLARAMENTE separadas (nunca perto o suficiente pra se confundir).
// Pra N=3 os valores batem exatamente com RAIL_TRACKS original (270/675/1080
// em HEIGHT=1350, ou seja, ratios 0.2/0.5/0.8) — não é coincidência, é a
// mesma proporção generalizada pra outros N.
// ---------------------------------------------------------------------------
export const HEIGHT_ROTAS = 1350;
export const WIDTH_ROTAS = 1080;

const TRACK_Y_RATIOS: Record<number, number[]> = {
  2: [0.28, 0.72],
  3: [0.2, 0.5, 0.8],
  4: [0.14, 0.38, 0.62, 0.86],
};

/**
 * Sanitiza texto livre pra uso como SVG `id` (ids de pattern/mask não podem
 * ter espaço/acento — achado real nesta rodada: usar `eyebrow` cru, tipo
 * "NTB Vendas", como id de `<pattern>` corrompeu o render inteiro do slide
 * pra fundo preto sólido, ver CATALOGO.md Rodada 10).
 */
function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function computeTrackYs(n: number, height: number = HEIGHT_ROTAS): number[] {
  const ratios = TRACK_Y_RATIOS[n];
  if (!ratios) {
    throw new Error(`computeTrackYs: sem tabela de proporção pra ${n} trilhas (só 2/3/4 suportado)`);
  }
  return ratios.map((r) => Math.round(height * r));
}

// ---------------------------------------------------------------------------
// Cotovelo local (Rodada 11) — geometria do bloco de conteúdo do `TrackSlide`,
// derivada dos MESMOS números do layout (padding 64, coluna de ícone 220 +
// gap 44) pra que `TrackRail` saiba exatamente onde emoldurar. Direção
// (sobe/desce) é escolhida automaticamente pela metade do frame em que a
// trilha vive — topo desce, base sobe — pra nunca cortar a borda do canvas;
// só a MAGNITUDE (`elbowLift`) varia por peça (pedido do fundador: variar
// escala do cotovelo entre as 4 peças, não a estrutura).
// ---------------------------------------------------------------------------
const CONTENT_PADDING = 64;
const ICON_COLUMN_WIDTH = 220;
const ICON_GAP = 44;
export const DEFAULT_ELBOW_LIFT = 150;

export function computeElbow(
  trackY: number,
  hasIcon: boolean,
  lift: number = DEFAULT_ELBOW_LIFT,
  height: number = HEIGHT_ROTAS,
  curve: boolean = false,
  organic: boolean = false,
): ElbowSpec {
  const x1 = hasIcon ? CONTENT_PADDING + ICON_COLUMN_WIDTH + ICON_GAP : CONTENT_PADDING;
  const x2 = WIDTH_ROTAS - CONTENT_PADDING;
  const direction: 1 | -1 = trackY <= height / 2 ? 1 : -1;
  return {x1, x2, lift, direction, curve, organic};
}

// ---------------------------------------------------------------------------
// Overline
// ---------------------------------------------------------------------------
export const Overline: React.FC<{children: React.ReactNode; color: string}> = ({children, color}) => (
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

// ---------------------------------------------------------------------------
// Bordas "rasgadas" (papel) — determinístico via seno, nunca Math.random.
// ---------------------------------------------------------------------------
function tornClipPath(seed: number, amplitude = 3.2): string {
  const steps = 16;
  const top: string[] = [];
  const bottom: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * 100;
    const jTop = 2 + amplitude * (0.5 + 0.5 * Math.sin(i * 1.7 + seed));
    const jBottom = 2 + amplitude * (0.5 + 0.5 * Math.sin(i * 2.3 + seed + 1.4));
    top.push(`${x.toFixed(1)}% ${jTop.toFixed(1)}%`);
    bottom.push(`${x.toFixed(1)}% ${(100 - jBottom).toFixed(1)}%`);
  }
  return `polygon(${top.join(', ')}, ${bottom.reverse().join(', ')})`;
}

export const TORN_A = tornClipPath(0.3);
export const TORN_B = tornClipPath(2.1, 2.6);

export const TornBlock: React.FC<{children: React.ReactNode; clip: string; rotate?: number; border?: string}> = ({
  children,
  clip,
  rotate = 0,
  border,
}) => (
  <div
    style={{
      background: '#fffdf7',
      clipPath: clip,
      padding: '30px 36px',
      borderLeft: border ? `6px solid ${border}` : undefined,
      transform: `rotate(${rotate}deg)`,
      boxShadow: '0 10px 26px rgba(10,10,10,0.16)',
    }}
  >
    {children}
  </div>
);

// ---------------------------------------------------------------------------
// Post-it card (Capa)
// ---------------------------------------------------------------------------
/**
 * Clip-path de papel rasgado/kraft dedicado ao post-it — MAIS DISCRETO que
 * `TORN_A`/`TORN_B` (amplitude menor, `steps` menor) porque o post-it é bem
 * menor em área que os `TornBlock` de headline/body: o mesmo jitter usado
 * ali, em proporção, ficaria exagerado demais num retângulo de ~292x260px.
 * Seed própria por índice de card (2 valores alternados) pra os 2-4 cards
 * de uma Capa não terem literalmente o mesmo recorte.
 */
const POSTIT_CLIPS = [tornClipPath(0.9, 4.6), tornClipPath(3.4, 5.4), tornClipPath(1.6, 4.0), tornClipPath(4.7, 5.0)];

export const PostitCard: React.FC<{
  label: string;
  caption: string;
  color: string;
  rotate: number;
  children: React.ReactNode;
  x: number;
  y: number;
  width?: number;
  /** Índice do card na fileira — escolhe qual recorte de papel rasgado usar (varia entre cards). */
  clipSeedIndex?: number;
  /**
   * Rodada 12 — BUG REAL achado no QA visual de `RotasVendas.tsx`: quando 2
   * post-its se sobrepõem parcialmente (composição nova pedida pelo
   * fundador), o card da FRENTE pinta por cima de qualquer conteúdo do card
   * de TRÁS na zona de sobreposição — inclusive cortando a legenda no meio
   * da palavra (confirmado no PNG: "pagamento na h[ora]" cortado). Fix:
   * `captionMaxWidth` opcional limita a largura da legenda pra ela nunca
   * alcançar a coluna onde o outro card sobrepõe, em vez de confiar que o
   * texto "por acaso" para antes.
   */
  captionMaxWidth?: number;
}> = ({label, caption, color, rotate, children, x, y, width = 292, clipSeedIndex = 0, captionMaxWidth}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width,
      // Tom kraft levemente mais quente que o branco puro anterior
      // (`#fffdf7`) — pedido do fundador comparando com a referência real,
      // que tem post-its com cara de papel recortado/kraft, não papel de
      // impressora liso.
      background: '#fdf6e8',
      clipPath: POSTIT_CLIPS[clipSeedIndex % POSTIT_CLIPS.length],
      padding: '26px 26px 30px',
      boxShadow: '0 20px 36px rgba(10,10,10,0.20)',
      transform: `rotate(${rotate}deg)`,
    }}
  >
    <div
      style={{
        fontFamily: FONT_SANS,
        fontWeight: 700,
        fontSize: 13,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color,
        marginBottom: 16,
      }}
    >
      {label}
    </div>
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 128}}>{children}</div>
    <div
      style={{
        fontFamily: FONT_SANS,
        fontWeight: 400,
        fontSize: 15,
        lineHeight: 1.35,
        color: neutral.cinzaEscuro,
        marginTop: 14,
        maxWidth: captionMaxWidth,
      }}
    >
      {caption}
    </div>
  </div>
);

/**
 * Anotação desenhada à mão, texto configurável — aponta pros post-its da Capa.
 *
 * BUG REAL corrigido nesta rodada (Rodada 15, achado no QA visual de
 * `InstitucionalCapa.png` e reproduzido em mais 3 peças — `RotasCapa`,
 * `VendasCapa`, `AvaliaCapa`): o texto tinha `width: 200` (sem
 * `whiteSpace: 'nowrap'`), então qualquer `annotationText` acima de ~20
 * caracteres quebrava em 2 linhas — mas a seta SVG abaixo é posicionada em
 * pixel FIXO (`top: 34`), pensado só pro caso de 1 linha. Com 2 linhas, a
 * curva da seta cruzava bem em cima da 2ª linha, lendo como texto riscado/
 * tachado. A Rodada 14 tinha "resolvido" isso caso a caso encurtando o texto
 * de 2 peças novas — mas não era a causa raiz, só escondia o sintoma nelas;
 * as 4 peças mais antigas (e qualquer peça futura com texto >20 caracteres)
 * continuavam quebradas. FIX NA RAIZ: `whiteSpace: 'nowrap'` — o texto NUNCA
 * quebra linha, então a seta (sempre desenhada pra 1 linha) nunca mais tem
 * uma 2ª linha pra cruzar, não importa o tamanho do texto (dentro do razoável
 * — frases de anotação continuam devendo ser curtas por escolha editorial,
 * não porque o componente quebra sem isso).
 */
export const HandDrawnAnnotation: React.FC<{text: string}> = ({text}) => (
  <div style={{position: 'absolute', left: 40, top: -64, zIndex: 5}}>
    <div
      style={{
        fontFamily: FONT_SERIF_ROTAS,
        fontStyle: 'italic',
        fontWeight: 400,
        fontSize: 24,
        color: neutral.quasePreto,
        transform: 'rotate(-3deg)',
        whiteSpace: 'nowrap',
      }}
    >
      {text}
    </div>
    <svg width={200} height={70} viewBox="0 0 200 70" fill="none" style={{position: 'absolute', left: 30, top: 34}}>
      <path
        d="M 6 4 C 40 10, 70 4, 96 22 C 118 38, 128 46, 148 56"
        stroke={neutral.quasePreto}
        strokeWidth={2.2}
        strokeLinecap="round"
        fill="none"
      />
      <path d="M 136 48 L 148 56 L 138 62" stroke={neutral.quasePreto} strokeWidth={2.2} strokeLinecap="round" fill="none" />
    </svg>
  </div>
);

// ---------------------------------------------------------------------------
// Slide de trilha — genérico. `icon` é opcional: quando ausente (recheio tipo
// "afirmação direta", ver CATALOGO Rodada 6), o bloco de texto ocupa a
// largura inteira, sem coluna de ícone.
// ---------------------------------------------------------------------------
export const TrackSlide: React.FC<{
  tracks: RailTrack[];
  index: number;
  color: string;
  label: string;
  headline: string;
  body: string;
  icon?: React.ReactNode;
  giantIcon: React.ReactNode;
  /** Magnitude do cotovelo local que emoldura o bloco de texto (Rodada 11). Varia por peça. */
  elbowLift?: number;
  /**
   * Rodada 12 (composição bespoke por peça): 'right-angle' (padrão, o
   * cotovelo em 90° do formato original) ou 'curve' (curva suave em S) —
   * ver `ElbowSpec.curve` em TrackRail.tsx. Só `RotasVendas.tsx` usa 'curve'
   * até agora.
   */
  elbowStyle?: 'right-angle' | 'curve' | 'organic';
  /** Rodada 14 — trilha ATIVA entrega o bastão pra próxima cor (ver `BatonSpec` em TrackRail.tsx). */
  baton?: {exitY: number};
  /**
   * Rodada 12: 'stacked' (padrão — headline em cima, body embaixo, como o
   * NTB Estoque original) ou 'side-by-side' (headline à esquerda, body à
   * direita, mesma altura) — pedido do fundador pra `RotasAvalia.tsx` não
   * repetir o empilhamento visual das outras peças.
   */
  contentLayout?: 'stacked' | 'side-by-side';
}> = ({
  tracks,
  index,
  color,
  label,
  headline,
  body,
  icon,
  giantIcon,
  elbowLift = DEFAULT_ELBOW_LIFT,
  elbowStyle = 'right-angle',
  contentLayout = 'stacked',
  baton,
}) => {
  ensureSansLoaded();
  ensureNewsreaderLoaded();
  const trackY = tracks[index].y;
  // Marca d'água gigante sempre no lado OPOSTO à faixa vertical onde a
  // trilha vive, pra equilibrar o espaço vazio (mesma regra da peça
  // original — ver Rotas.tsx Rodada 9).
  const ratio = trackY / HEIGHT_ROTAS;
  const watermarkTop = ratio < 0.42 ? '58%' : ratio > 0.58 ? '4%' : '6%';
  const elbow = computeElbow(trackY, Boolean(icon), elbowLift, HEIGHT_ROTAS, elbowStyle === 'curve', elbowStyle === 'organic');
  return (
    <AbsoluteFill style={{background: neutral.begeClaro}}>
      <GridTexture id={`grid-rotaskit-${slugify(label)}-${index}`} color={neutral.quasePreto} opacity={0.09} />
      <div style={{position: 'absolute', top: watermarkTop, left: '50%', transform: 'translateX(-50%)', opacity: 0.07}}>
        {giantIcon}
      </div>
      <TrackRail tracks={tracks} activeIndex={index} elbow={elbow} baton={baton} />
      <div
        style={{
          position: 'absolute',
          top: trackY,
          left: 64,
          right: 64,
          transform: 'translateY(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: icon ? 44 : 0,
        }}
      >
        {icon ? <div style={{flex: '0 0 auto', width: 220, display: 'flex', justifyContent: 'center'}}>{icon}</div> : null}
        <div style={{flex: '1 1 auto', minWidth: 0}}>
          <div style={{marginBottom: 14}}>
            <Overline color={color}>{label}</Overline>
          </div>
          {contentLayout === 'side-by-side' ? (
            <div style={{display: 'flex', alignItems: 'flex-start', gap: 28}}>
              <div style={{flex: '1 1 50%', minWidth: 0}}>
                <TornBlock clip={TORN_A} rotate={-0.4} border={color}>
                  <h2
                    style={{
                      fontFamily: FONT_SERIF_ROTAS,
                      fontWeight: 700,
                      fontSize: 34,
                      lineHeight: 1.15,
                      color: neutral.quasePreto,
                      margin: 0,
                    }}
                  >
                    {headline}
                  </h2>
                </TornBlock>
              </div>
              <div style={{flex: '1 1 50%', minWidth: 0, marginTop: 10}}>
                <TornBlock clip={TORN_B} rotate={0.3} border={color}>
                  <p
                    style={{
                      fontFamily: FONT_SANS,
                      fontWeight: 400,
                      fontSize: 18,
                      lineHeight: 1.48,
                      color: neutral.cinzaEscuro,
                      margin: 0,
                    }}
                  >
                    {body}
                  </p>
                </TornBlock>
              </div>
            </div>
          ) : (
            <>
              <TornBlock clip={TORN_A} rotate={-0.4} border={color}>
                <h2
                  style={{
                    fontFamily: FONT_SERIF_ROTAS,
                    fontWeight: 700,
                    fontSize: 40,
                    lineHeight: 1.16,
                    color: neutral.quasePreto,
                    margin: 0,
                  }}
                >
                  {headline}
                </h2>
              </TornBlock>
              <div style={{height: 22}} />
              <TornBlock clip={TORN_B} rotate={0.3} border={color}>
                <p
                  style={{
                    fontFamily: FONT_SANS,
                    fontWeight: 400,
                    fontSize: 20,
                    lineHeight: 1.5,
                    color: neutral.cinzaEscuro,
                    margin: 0,
                  }}
                >
                  {body}
                </p>
              </TornBlock>
            </>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// Capa — shell genérico
// ---------------------------------------------------------------------------
export type CoverCardSpec = {
  label: string;
  caption: string;
  color: string;
  rotate: number;
  x: number;
  y: number;
  width?: number;
  /** Ver comentário em `PostitCard` — limita a legenda pra não colidir com um card sobreposto. */
  captionMaxWidth?: number;
  children: React.ReactNode;
};

export const RotasCapaShell: React.FC<{
  tracks: RailTrack[];
  eyebrow: string;
  cards: CoverCardSpec[];
  annotationText: string;
  cardsAreaHeight?: number;
  title: React.ReactNode;
  subtitle: string;
}> = ({tracks, eyebrow, cards, annotationText, cardsAreaHeight = 420, title, subtitle}) => {
  ensureSansLoaded();
  ensureNewsreaderLoaded();
  return (
    <AbsoluteFill style={{background: neutral.begeClaro}}>
      <GridTexture id={`grid-rotaskit-capa-${slugify(eyebrow)}`} color={neutral.quasePreto} opacity={0.09} />
      <TrackRail tracks={tracks} activeIndex={null} />
      <AbsoluteFill style={{padding: 64}}>
        <Overline color={neutral.cinzaEscuro}>{eyebrow}</Overline>

        <div style={{position: 'relative', height: cardsAreaHeight, marginTop: 100}}>
          {cards.map((card, i) => (
            <PostitCard
              key={card.label}
              label={card.label}
              caption={card.caption}
              color={card.color}
              rotate={card.rotate}
              x={card.x}
              y={card.y}
              width={card.width}
              captionMaxWidth={card.captionMaxWidth}
              clipSeedIndex={i}
            >
              {card.children}
            </PostitCard>
          ))}
          <HandDrawnAnnotation text={annotationText} />
        </div>

        <div style={{height: 90}} />

        <h1
          style={{
            fontFamily: FONT_SERIF_ROTAS,
            fontWeight: 400,
            fontSize: 68,
            lineHeight: 1.08,
            letterSpacing: '-0.01em',
            color: neutral.quasePreto,
            margin: 0,
            maxWidth: 900,
          }}
        >
          {title}
        </h1>
        <div style={{height: 18}} />
        <p
          style={{
            fontFamily: FONT_SANS,
            fontWeight: 400,
            fontSize: 21,
            lineHeight: 1.5,
            color: neutral.cinzaEscuro,
            opacity: 0.78,
            margin: 0,
            maxWidth: 760,
          }}
        >
          {subtitle}
        </p>
        <div style={{height: 40}} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// Fechamento — shell genérico. `cta` é OPCIONAL: peça institucional pura
// pode fechar sem nenhum CTA (ver voice.md, "conteúdo educacional" — "post
// educacional pode fechar SEM CTA nenhum").
// ---------------------------------------------------------------------------
export const RotasFechamentoShell: React.FC<{
  tracks: RailTrack[];
  headline: React.ReactNode;
  cta?: string;
  eyebrowId: string;
  /**
   * Rodada 12: tamanho da citação de fechamento. Padrão 50px (Vendas/
   * Avalia, tom comercial, deixa espaço visual pro CTA). A peça
   * Institucional passa um valor maior (64) — pedido do fundador: "tom mais
   * contemplativo/menos comercial que os outros 3" pede uma citação final
   * que ocupe mais espaço, coerente com fechar sem nenhum CTA.
   */
  headlineSize?: number;
}> = ({tracks, headline, cta, eyebrowId, headlineSize = 50}) => {
  ensureSansLoaded();
  ensureNewsreaderLoaded();
  return (
    <AbsoluteFill style={{background: neutral.begeClaro}}>
      <GridTexture id={`grid-rotaskit-fechamento-${eyebrowId}`} color={neutral.quasePreto} opacity={0.09} />
      <TrackRail tracks={tracks} activeIndex={null} converge />
      <AbsoluteFill style={{padding: 64, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div style={{height: 150}} />
        <h2
          style={{
            fontFamily: FONT_SERIF_ROTAS,
            fontWeight: 400,
            fontSize: headlineSize,
            lineHeight: 1.18,
            color: neutral.quasePreto,
            textAlign: 'center',
            margin: 0,
            maxWidth: headlineSize > 55 ? 880 : 780,
          }}
        >
          {headline}
        </h2>
        {cta ? (
          <>
            <div style={{height: 28}} />
            <Overline color={neutral.cinzaEscuro}>{cta}</Overline>
          </>
        ) : null}
      </AbsoluteFill>

      <div
        style={{
          position: 'absolute',
          left: CONVERGE_X,
          top: CONVERGE_Y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: 300,
            height: 300,
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${brand.primary}33 0%, ${brand.primary}00 68%)`,
          }}
        />
        {/* Girado 90° pra apontar no sentido do fluxo (esquerda→direita) — ver comentário gêmeo em Rotas.tsx, Rodada 13. */}
        <Mascote size={196} style={{position: 'relative', transform: 'rotate(90deg)'}} />
      </div>
    </AbsoluteFill>
  );
};
