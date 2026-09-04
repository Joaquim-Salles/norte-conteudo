import React from 'react';
import {AbsoluteFill, Sequence, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fontFamily} from '../lib/tokens';
import {ensureBrandFontLoaded} from '../lib/fonts';
import {GrainOverlay} from '../lib/Texture';
import {systemColors} from '../lib/colorGuide';
import {getVisualStyle, textStrokeStyle} from '../lib/visualStyles';
import {IconCheck, IconChart, IconGrowth, IconCompass} from '../lib/icons';
import {HOOK_EYEBROW_ICONS, HOOK_VARIANTS, type HookContent, type HookVariantId} from '../lib/hookVariants';
import {PhoneFrame, BrowserFrame} from '../lib/DeviceFrame';
import {PhotoBackground} from '../lib/PhotoBackground';
import {IconBadge} from '../lib/IconBadge';
import {CtaBand} from '../lib/CtaBand';
import {KineticText} from '../lib/KineticText';
import {MotionTransition} from '../lib/MotionTransition';
import {getMotionStyle, getEasingFn} from '../lib/motionStyles';
import {slideFadeIn, popIn, zoomPunchIn, POP_SPRING} from '../lib/motion';

ensureBrandFontLoaded();

/**
 * NorteApresentacaoReel — peça FLAGSHIP, não um dos 8 tipos de post
 * repetíveis do catálogo (ver src/templates/CATALOGO.md). Pedido literal do
 * fundador (2026-09-03): "Gere um vídeo foda de exemplo apresentando o Norte
 * Para Negócios em 30 segundos" — o vídeo institucional de apresentação da
 * empresa inteira.
 *
 * REFEITO (mesmo dia, revisão do fundador): a v1 saiu num estilo
 * "corporate/device-frame limpo" (chips, gradiente flat, badge-pílula) — não
 * é essa a linguagem visual pedida como referência. O fundador apontou o
 * preset `analogiaReal` (`src/lib/visualStyles.ts`, Round G) — baseado em
 * pesquisa REAL do feed de @thaleslaray via `instagram-control` (35 posts +
 * 1 imagem nativa inspecionada pixel a pixel, ver
 * `docs/referencias-visuais/thaleslaray-pesquisa.md`) — como a pele que essa
 * peça deveria usar: foto real de fundo (não cor sólida), tipografia com
 * CONTORNO GROSSO (`textStrokeStyle`, estilo "meme"/legenda viral) flutuando
 * livre sobre a foto (não em card/bloco), e selo de ícone real de produto
 * (`IconBadge`) como "prova de contexto" em vez de badge-pílula corporativa.
 *
 * Esta v2 aplica essa pele nos 4 blocos da estrutura (que o fundador validou
 * como boa e pediu pra manter): hook → virada → vitrine → CTA. Os prints
 * reais dos produtos dentro de `DeviceFrame` foram mantidos (funcionaram bem
 * na v1) — só a moldura ao redor deles virou foto real + selo de ícone, no
 * lugar do gradiente flat + badge-pílula.
 *
 * VARIAÇÕES DE HOOK (2026-09-03, pedido do fundador: "Sim, quero várias
 * variações [de] ganchos."): o texto/ícone do HookSegment (0–110f) foi
 * extraído pra `src/lib/hookVariants.ts` (prop `hookVariant`) — mesmo
 * princípio de A/B test de headline (mesma template/timing/fotos, dado
 * diferente). Virada/vitrine/CTA continuam 100% fixos entre variações — só
 * o hook muda, senão o teste deixa de isolar a variável certa. Ver
 * `HOOK_VARIANTS` pra as 5 variações e a lógica retórica de cada uma, e
 * `src/templates/CATALOGO.md` pra documentação voltada a humano.
 *
 * Estrutura (900 frames = 30,000s exatos, 1080x1920/30fps H.264/AAC):
 *  1. HOOK (0–110f) — 2 fotos reais em crossfade (estoque → restaurante),
 *     texto stroked flutuando livre em cantos opostos (mesma composição do
 *     meme do iceberg pesquisado), punch final em accent+stroke. Conteúdo
 *     parametrizado por `hookVariant` (default `'dor-direta'`, a v2 original).
 *  2. VIRADA (118–328f) — foto real de equipe, bordão da marca stroked +
 *     selo `IconBadge` (fallback bússola, sem ícone de app próprio da
 *     marca-mãe) + os 3 domínios como ícone+texto livre (sem chip/pílula).
 *  3. VITRINE (338–718f) — os 3 produtos reais: cada um com foto real de
 *     contexto (mesmo princípio do `VitrineProduto` variant `contexto`) +
 *     selo `IconBadge` com o ícone REAL do produto + headline stroked +
 *     print real dentro de `DeviceFrame` sobreposto à foto. Norte Avalia não
 *     tem screenshot de produto nem ícone de app dedicado — usa foto real +
 *     `IconBadge` fallback, nunca fabrica UI/logo que não existe.
 *  4. CTA (728–900f) — foto real, bordão de fechamento stroked (callback ao
 *     "ACHISMO." do hook) + `CtaBand` real + assinatura de marca.
 */

const D = {
  hook: 110,
  t1: 8,
  virada: 210,
  t2: 10,
  vendas: 120,
  t3: 10,
  estoque: 120,
  t4: 10,
  avalia: 120,
  t5: 10,
  cta: 172,
} as const;

export function norteApresentacaoReelDurationInFrames(): number {
  return Object.values(D).reduce((a, b) => a + b, 0);
}

const msEnergetic = getMotionStyle('whipPanCut'); // staggerWord + scalePop — hook/virada, texto curto e forte.
const msSoft = getMotionStyle('minimalFade'); // slideFadeBlock — headlines longas de produto, entram como bloco.
const msWhip = getMotionStyle('whipPanCut');
const msMatch = getMotionStyle('matchCut');

// Pele visual (Round G, pesquisa real @thaleslaray) — contorno grosso de
// texto, SÓ usado sobre foto real (nunca sobre cor sólida, ver nota em
// `analogiaReal.quandoUsar`). Fonte única do knob, não hardcoda 3px/#000 de novo.
const vs = getVisualStyle('analogiaReal');
const stroke = textStrokeStyle(vs);
const textShadowSoft = '0 4px 16px rgba(0,0,0,0.55)';
const textShadowStrong = '0 6px 22px rgba(0,0,0,0.65)';

// ---------------------------------------------------------------------------
// 1. HOOK — 2 fotos reais em crossfade, texto stroked flutuando livre,
//    punch final "ACHISMO." (composição inspirada no meme do iceberg).
// ---------------------------------------------------------------------------
const HookSegment: React.FC<{content: HookContent}> = ({content}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const easing = getEasingFn('strong');
  const EyebrowIcon = HOOK_EYEBROW_ICONS[content.eyebrowIcon];

  const beatBOpacity = interpolate(frame, [40, 54], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const line1FadeOut = interpolate(frame, [40, 52], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  const eyebrowAnim = slideFadeIn(frame, fps, 0, {distance: 14, easing});
  const line1Anim = slideFadeIn(frame, fps, 8, {distance: 24, durationInFrames: 16, easing});
  const line2Anim = slideFadeIn(frame, fps, 50, {distance: 24, durationInFrames: 16, easing});
  const line3Anim = slideFadeIn(frame, fps, 66, {distance: 24, durationInFrames: 16, easing});

  const punchCoverOpacity = interpolate(frame, [80, 88], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const punchTextOpacity = interpolate(frame, [86, 94], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const punchScale = zoomPunchIn(frame, 86, {fromScale: 0.3, toScale: 1, durationInFrames: 20});

  return (
    <AbsoluteFill>
      <PhotoBackground src="photos/corredor-empilhadeira-estoque.jpg" position="center 35%" overlay="top" strength={0.72} />
      <AbsoluteFill style={{opacity: beatBOpacity}}>
        <PhotoBackground src="photos/restaurante-ambiente-noturno.jpg" position="center 20%" overlay="bottom" strength={0.8} />
      </AbsoluteFill>

      {/* Beat A — topo-esquerda, sobre a foto de estoque (some quando o beat B entra). */}
      <div style={{position: 'absolute', top: 110, left: 64, right: 160, opacity: line1Anim.opacity * line1FadeOut, transform: `${line1Anim.transform} rotate(-1deg)`}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, opacity: eyebrowAnim.opacity, transform: eyebrowAnim.transform}}>
          <EyebrowIcon size={30} color={colors.accent} strokeWidth={2.6} />
          <span style={{fontSize: 24, fontWeight: 700, letterSpacing: 2, color: colors.white, textTransform: 'uppercase', textShadow: textShadowSoft}}>
            {content.eyebrowText}
          </span>
        </div>
        <span style={{fontSize: 58, fontWeight: 700, color: colors.white, lineHeight: 1.16, display: 'inline-block', ...stroke}}>
          {content.line1}
        </span>
      </div>

      {/* Beat B — base, sobre a foto de restaurante (2 linhas empilhadas, cantos opostos ao Beat A — mesma lógica do meme do iceberg). */}
      <div style={{position: 'absolute', bottom: 130, left: 64, right: 64}}>
        <div style={{opacity: line2Anim.opacity, transform: `${line2Anim.transform} rotate(1deg)`}}>
          <span style={{fontSize: 58, fontWeight: 700, color: colors.white, lineHeight: 1.16, display: 'inline-block', ...stroke}}>
            {content.line2}
          </span>
        </div>
        <div style={{marginTop: 14, opacity: line3Anim.opacity, transform: line3Anim.transform}}>
          <span style={{fontSize: 40, fontWeight: 700, color: colors.white, lineHeight: 1.2, display: 'inline-block', ...stroke}}>
            {content.line3}
          </span>
        </div>
      </div>

      {/* Punch final — a palavra/frase que fecha o gancho, estilo "carimbo de meme".
          fontSize recua um degrau quando o punch é uma frase (ex. "SEM ACHISMO.")
          em vez de 1 palavra só (ex. "ACHISMO.") — mesmo slot/posição/animação,
          só o tamanho respeita o dado mais longo, pra não estourar a largura do frame. */}
      <AbsoluteFill style={{background: '#000', opacity: punchCoverOpacity * 0.8}} />
      <AbsoluteFill style={{display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: punchTextOpacity}}>
        <span
          style={{
            fontSize: content.punch.length > 9 ? 92 : 128,
            fontWeight: 700,
            color: colors.accent,
            letterSpacing: -3,
            display: 'inline-block',
            transform: `scale(${punchScale}) rotate(-2deg)`,
            ...stroke,
          }}
        >
          {content.punch}
        </span>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// 2. VIRADA — foto real de equipe, bordão stroked + selo + domínios soltos.
// ---------------------------------------------------------------------------
const ViradaSegment: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const easing = getEasingFn('strong');
  const badgeAnim = slideFadeIn(frame, fps, 4, {distance: 16, easing});
  const badgeScale = popIn(frame, fps, 4, POP_SPRING);
  const subAnim = slideFadeIn(frame, fps, 92, {distance: 26, durationInFrames: 18, easing: getEasingFn('gentle')});
  const domains = [
    {label: 'Estoque', Icon: IconChart},
    {label: 'Vendas', Icon: IconCheck},
    {label: 'Performance', Icon: IconGrowth},
  ];
  const domainsAnim = domains.map((_, i) => slideFadeIn(frame, fps, 150 + i * 10, {distance: 20, easing}));

  return (
    <AbsoluteFill>
      <PhotoBackground src="photos/equipe-reuniao-escritorio.jpg" position="center 30%" overlay="topAndBottom" strength={0.82} />
      <div style={{position: 'absolute', top: 0, left: 0, right: 0, padding: '110px 72px 0'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 16, opacity: badgeAnim.opacity, transform: `${badgeAnim.transform} scale(${badgeScale})`}}>
          <IconBadge fallback={<IconCompass size={28} color={colors.primary} strokeWidth={2.4} />} size={58} />
          <span style={{fontSize: 24, fontWeight: 700, letterSpacing: 2, color: colors.white, textTransform: 'uppercase', textShadow: textShadowSoft}}>
            Norte Para Negócios
          </span>
        </div>
        <div style={{marginTop: 30, maxWidth: 920}}>
          <KineticText
            text="Não trabalhamos com achismos."
            ms={msEnergetic}
            startFrame={14}
            style={{fontSize: 60, fontWeight: 700, color: colors.white, lineHeight: 1.14, ...stroke}}
          />
        </div>
      </div>
      <div style={{position: 'absolute', left: 72, right: 72, bottom: 150}}>
        <p
          style={{
            margin: '0 0 36px',
            fontSize: 30,
            fontWeight: 400,
            color: colors.white,
            lineHeight: 1.42,
            textShadow: textShadowStrong,
            opacity: subAnim.opacity,
            transform: subAnim.transform,
          }}
        >
          Consultoria de verdade + software próprio pra rodar o que a consultoria recomenda.
        </p>
        <div style={{display: 'flex', gap: 30}}>
          {domains.map((d, i) => (
            <div key={d.label} style={{display: 'flex', alignItems: 'center', gap: 10, opacity: domainsAnim[i].opacity, transform: domainsAnim[i].transform}}>
              <d.Icon size={24} color={colors.white} strokeWidth={2.6} />
              <span style={{fontSize: 24, fontWeight: 700, color: colors.white, textShadow: textShadowSoft}}>{d.label}</span>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// 3. VITRINE — 3 produtos reais: foto real de contexto + selo de ícone real
//    + headline stroked + print real dentro de DeviceFrame.
// ---------------------------------------------------------------------------
type ProductSegmentProps = {
  photo: string;
  photoPosition?: string;
  iconSrc: string;
  nomeProduto: string;
  headline: string;
  benefit: string;
  device: 'phone' | 'browser';
  screenshotSrc: string;
  screenshotAspect: number;
};

const ProductSegment: React.FC<ProductSegmentProps> = ({
  photo,
  photoPosition,
  iconSrc,
  nomeProduto,
  headline,
  benefit,
  device,
  screenshotSrc,
  screenshotAspect,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const easing = getEasingFn('strong');
  const badgeAnim = slideFadeIn(frame, fps, 0, {distance: 16, easing});
  const badgeScale = popIn(frame, fps, 0, POP_SPRING);
  const deviceScale = popIn(frame, fps, 6, POP_SPRING);
  const deviceFloat = Math.sin(frame / 18) * 6;
  const benefitAnim = slideFadeIn(frame, fps, 42, {distance: 22, easing});

  return (
    <AbsoluteFill>
      <PhotoBackground src={photo} position={photoPosition ?? 'center 25%'} overlay="topAndBottom" strength={0.84} />
      <div style={{position: 'absolute', top: 0, left: 0, right: 0, padding: '110px 72px 0'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 16, opacity: badgeAnim.opacity, transform: `${badgeAnim.transform} scale(${badgeScale})`}}>
          <IconBadge src={iconSrc} size={60} />
          <span style={{fontSize: 24, fontWeight: 700, letterSpacing: 2, color: colors.white, textTransform: 'uppercase', textShadow: textShadowSoft}}>
            {nomeProduto}
          </span>
        </div>
        <div style={{marginTop: 26, maxWidth: 900}}>
          <KineticText
            text={headline}
            ms={msSoft}
            startFrame={10}
            style={{fontSize: 50, fontWeight: 700, color: colors.white, lineHeight: 1.18, ...stroke}}
          />
        </div>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 520, display: 'flex', justifyContent: 'center'}}>
        <div style={{transform: `scale(${deviceScale}) translateY(${deviceFloat}px)`}}>
          {device === 'phone' ? (
            <PhoneFrame src={screenshotSrc} width={340} rotate={-5} aspectRatio={screenshotAspect} />
          ) : (
            <BrowserFrame src={screenshotSrc} width={760} rotate={2} aspectRatio={screenshotAspect} />
          )}
        </div>
      </div>
      <div style={{position: 'absolute', left: 72, right: 72, bottom: 140, opacity: benefitAnim.opacity, transform: benefitAnim.transform}}>
        <span style={{fontSize: 27, fontWeight: 400, color: colors.white, lineHeight: 1.4, textShadow: textShadowStrong}}>{benefit}</span>
      </div>
    </AbsoluteFill>
  );
};

const AvaliaSegment: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const easing = getEasingFn('strong');
  const badgeAnim = slideFadeIn(frame, fps, 0, {distance: 16, easing});
  const badgeScale = popIn(frame, fps, 0, POP_SPRING);
  const benefitAnim = slideFadeIn(frame, fps, 42, {distance: 22, easing});

  return (
    <AbsoluteFill>
      {/* Sem screenshot real do Avalia — foto real (Pexels, ver public/photos/CREDITOS.md) +
          selo IconBadge fallback (sem ícone de app dedicado), em vez de fabricar uma UI que
          não existe (mesmo princípio de "zero achismo" que o vídeo defende). */}
      <PhotoBackground src="photos/analista-relatorios-mesa.jpg" overlay="topAndBottom" strength={0.84} position="center 30%" />
      <div style={{position: 'absolute', top: 0, left: 0, right: 0, padding: '110px 72px 0'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 16, opacity: badgeAnim.opacity, transform: `${badgeAnim.transform} scale(${badgeScale})`}}>
          <IconBadge fallback={<IconGrowth size={28} color={systemColors.norteAvalia.base} strokeWidth={2.6} />} size={60} />
          <span style={{fontSize: 24, fontWeight: 700, letterSpacing: 2, color: colors.white, textTransform: 'uppercase', textShadow: textShadowSoft}}>
            Avaliação de Desempenho
          </span>
        </div>
        <div style={{marginTop: 26, maxWidth: 900}}>
          <KineticText
            text="Performance com dado, não com feeling."
            ms={msSoft}
            startFrame={10}
            style={{fontSize: 50, fontWeight: 700, color: colors.white, lineHeight: 1.18, ...stroke}}
          />
        </div>
      </div>
      <div style={{position: 'absolute', left: 72, right: 72, bottom: 140, opacity: benefitAnim.opacity, transform: benefitAnim.transform}}>
        <span style={{fontSize: 27, fontWeight: 400, color: colors.white, lineHeight: 1.4, textShadow: textShadowStrong}}>
          PDI automático a cada ciclo + avaliação multidimensional, não só nota.
        </span>
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// 4. CTA — foto real, bordão stroked (callback ao hook) + CtaBand real.
// ---------------------------------------------------------------------------
const CtaSegment: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const easing = getEasingFn('strong');
  const eyebrowAnim = slideFadeIn(frame, fps, 0, {distance: 16, easing});
  const iconScale = popIn(frame, fps, 0, POP_SPRING);
  const titleAnim = slideFadeIn(frame, fps, 8, {distance: 30, durationInFrames: 18, easing});
  const ctaAnim = slideFadeIn(frame, fps, 30, {distance: 40, durationInFrames: 20, easing});
  const ctaScale = popIn(frame, fps, 30, POP_SPRING);
  const pulse = 1 + Math.sin(Math.max(0, frame - 60) / 20) * 0.015;
  const wordmarkAnim = slideFadeIn(frame, fps, 70, {distance: 10, durationInFrames: 16, easing: getEasingFn('gentle')});

  return (
    <AbsoluteFill>
      <PhotoBackground src="photos/salao-moderno-movimento.jpg" position="center 35%" overlay="full" strength={0.55} />
      {/* Reforço de contraste embaixo pro CtaBand/assinatura — a foto sozinha
          (overlay 'full') já escurece uniforme, mas o botão precisa de um
          plateau mais forte na base pra legibilidade máxima (peça mais
          visível da empresa, Regra Inviolável #1 com rigor máximo aqui). */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 38%, rgba(0,0,0,0.78) 100%)',
        }}
      />
      <div style={{position: 'relative', height: '100%', padding: '0 72px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 44}}>
        <div>
          <div style={{display: 'flex', alignItems: 'center', gap: 14, opacity: eyebrowAnim.opacity, transform: `${eyebrowAnim.transform} scale(${iconScale})`}}>
            <IconBadge fallback={<IconCompass size={24} color={colors.accent} strokeWidth={2.6} />} size={50} />
            <span style={{fontSize: 24, fontWeight: 700, letterSpacing: 2, color: colors.white, textTransform: 'uppercase', textShadow: textShadowSoft}}>
              Norte Para Negócios
            </span>
          </div>
          <div style={{marginTop: 26, opacity: titleAnim.opacity, transform: titleAnim.transform}}>
            <span style={{fontSize: 56, fontWeight: 700, color: colors.white, lineHeight: 1.18, display: 'inline-block', ...stroke}}>
              Decida com dado.
              <br />
              Não com achismo.
            </span>
          </div>
        </div>
        <div style={{opacity: ctaAnim.opacity, transform: `${ctaAnim.transform} scale(${ctaScale * pulse})`}}>
          <CtaBand />
        </div>
        <div style={{opacity: wordmarkAnim.opacity, transform: wordmarkAnim.transform, display: 'flex', alignItems: 'center', gap: 10}}>
          <div style={{width: 8, height: 8, borderRadius: 2, background: colors.accent, transform: 'rotate(45deg)'}} />
          <span style={{fontSize: 22, fontWeight: 400, fontStyle: 'italic', letterSpacing: 0.8, color: colors.white, opacity: 0.88, textShadow: textShadowSoft}}>
            Norte Para Negocios
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// Composição principal
// ---------------------------------------------------------------------------
export type NorteApresentacaoReelProps = {
  /** Qual variação de gancho usar nos 0-110f iniciais — ver `hookVariants.ts`. Default = a v2 original ("dor-direta"). */
  hookVariant?: HookVariantId;
};

export const norteApresentacaoReelDefaultProps: Required<NorteApresentacaoReelProps> = {
  hookVariant: 'dor-direta',
};

export const NorteApresentacaoReel: React.FC<NorteApresentacaoReelProps> = ({
  hookVariant = norteApresentacaoReelDefaultProps.hookVariant,
}) => {
  const hookContent = HOOK_VARIANTS[hookVariant];
  let t = 0;
  const at = (key: keyof typeof D): number => {
    const start = t;
    t += D[key];
    return start;
  };

  const hookStart = at('hook');
  const t1Start = at('t1');
  const viradaStart = at('virada');
  const t2Start = at('t2');
  const vendasStart = at('vendas');
  const t3Start = at('t3');
  const estoqueStart = at('estoque');
  const t4Start = at('t4');
  const avaliaStart = at('avalia');
  const t5Start = at('t5');
  const ctaStart = at('cta');

  const {ntbVendas, ntbEstoque, norteAvalia} = systemColors;

  return (
    <AbsoluteFill style={{background: colors.black, fontFamily: `'${fontFamily.brand}', ${fontFamily.fallback}`}}>
      <Sequence from={hookStart} durationInFrames={D.hook}>
        <HookSegment content={hookContent} />
      </Sequence>
      <Sequence from={t1Start} durationInFrames={D.t1}>
        <MotionTransition motionStyle={msWhip} durationInFrames={D.t1} accentColor={colors.accent} />
      </Sequence>

      <Sequence from={viradaStart} durationInFrames={D.virada}>
        <ViradaSegment />
      </Sequence>
      <Sequence from={t2Start} durationInFrames={D.t2}>
        <MotionTransition motionStyle={msWhip} durationInFrames={D.t2} accentColor={ntbVendas.base} />
      </Sequence>

      <Sequence from={vendasStart} durationInFrames={D.vendas}>
        <ProductSegment
          photo="photos/prato-gourmet-mesa-madeira.jpg"
          photoPosition="center 22%"
          iconSrc="logos/vendas-icon-192.png"
          nomeProduto="Cardápio Digital"
          headline="Pedido no celular, sem espera."
          benefit="Comanda digital + gestão de mesas em tempo real."
          device="phone"
          screenshotSrc="screenshots/vendas-mobile.png"
          screenshotAspect={1170 / 2532}
        />
      </Sequence>
      <Sequence from={t3Start} durationInFrames={D.t3}>
        <MotionTransition motionStyle={msWhip} durationInFrames={D.t3} accentColor={ntbEstoque.base} />
      </Sequence>

      <Sequence from={estoqueStart} durationInFrames={D.estoque}>
        <ProductSegment
          photo="photos/corredor-empilhadeira-estoque.jpg"
          photoPosition="center 35%"
          iconSrc="logos/estoque-icon.svg"
          nomeProduto="Gestão de Estoque"
          headline="Estoque sincronizado com o Omie, em tempo real."
          benefit="Etiqueta de lote/validade + QR code no inventário."
          device="browser"
          screenshotSrc="screenshots/produto-desktop.png"
          screenshotAspect={1440 / 900}
        />
      </Sequence>
      <Sequence from={t4Start} durationInFrames={D.t4}>
        <MotionTransition motionStyle={msWhip} durationInFrames={D.t4} accentColor={norteAvalia.base} />
      </Sequence>

      <Sequence from={avaliaStart} durationInFrames={D.avalia}>
        <AvaliaSegment />
      </Sequence>
      <Sequence from={t5Start} durationInFrames={D.t5}>
        <MotionTransition motionStyle={msMatch} durationInFrames={D.t5} accentColor={colors.accent} />
      </Sequence>

      <Sequence from={ctaStart} durationInFrames={D.cta}>
        <CtaSegment />
      </Sequence>

      <GrainOverlay opacity={0.035} />
    </AbsoluteFill>
  );
};
