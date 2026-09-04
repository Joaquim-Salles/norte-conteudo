import React from 'react';
import {AbsoluteFill, Sequence, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fontFamily} from '../lib/tokens';
import {ensureBrandFontLoaded} from '../lib/fonts';
import {GrainOverlay} from '../lib/Texture';
import {systemColors} from '../lib/colorGuide';
import {IconAlert, IconCheck, IconChart, IconGrowth, IconCompass} from '../lib/icons';
import {PhoneFrame, BrowserFrame} from '../lib/DeviceFrame';
import {PhotoBackground} from '../lib/PhotoBackground';
import {CtaBand} from '../lib/CtaBand';
import {Badge} from '../lib/Badge';
import {GhostBars} from '../lib/GhostGraphics';
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
 * empresa inteira, não uma peça de calendário editorial.
 *
 * Por isso é uma composição SOB MEDIDA (não reusa `motionStyle`/`visualStyle`
 * genérico dos 8 tipos): estrutura fixa, copy própria (não vem de brief do
 * marketing — não existe brief pra "vídeo institucional único"), mas reusa
 * TODA a infraestrutura de marca já validada (tokens, cores por produto de
 * `colorGuide.ts`, ícones Lucide de `icons.tsx`, primitivos de motion de
 * `motion.ts`/`motionStyles.ts`, `DeviceFrame`/`CtaBand`/`Badge`) — zero cor
 * hardcoded solta, zero ícone desenhado à mão.
 *
 * Estrutura (900 frames = 30,000s exatos a 30fps):
 *  1. HOOK (0–110f, ~3,7s) — dor real de PME + a palavra "achismo" como
 *     vilão, estalando em accent.
 *  2. VIRADA (128–338f, ~7s) — a Norte responde: bordão da marca + a dupla
 *     consultoria+software + os 3 domínios de atuação.
 *  3. VITRINE (348–728f, ~12,7s) — os 3 produtos reais, cada um com PRINT
 *     REAL dentro de `DeviceFrame` (Vendas/Estoque) ou foto real com tema de
 *     marca (Avalia — não existe screenshot real do produto, então não se
 *     fabrica uma UI falsa: usa foto real + tokens de marca, mesmo princípio
 *     de "zero achismo" que o vídeo defende).
 *  4. CTA (738–900f, ~5,7s) — fechamento com `CtaBand` real (núcleo de
 *     lead-gen de toda peça Norte) + assinatura de marca.
 *
 * Transições entre blocos usam `MotionTransition` (mesmo componente
 * compartilhado dos Reels do catálogo) com `whipPanCut`/`matchCut` — não é
 * efeito novo, é reuso do vocabulário de motion já testado.
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

// ---------------------------------------------------------------------------
// 1. HOOK — dor real de PME, resolvida na palavra "achismo".
// ---------------------------------------------------------------------------
const HookSegment: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const easing = getEasingFn('strong');
  const eyebrowAnim = slideFadeIn(frame, fps, 0, {distance: 14, easing});
  const iconScale = popIn(frame, fps, 0, POP_SPRING);
  const punchCoverOpacity = interpolate(frame, [74, 80], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const punchTextOpacity = interpolate(frame, [78, 86], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const punchScale = zoomPunchIn(frame, 78, {fromScale: 0.25, toScale: 1, durationInFrames: 20});

  return (
    <AbsoluteFill style={{background: '#0b0b10'}}>
      <div style={{position: 'absolute', inset: 0, padding: '0 84px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 16, opacity: eyebrowAnim.opacity, transform: eyebrowAnim.transform}}>
          <div style={{transform: `scale(${iconScale})`}}>
            <IconAlert size={34} color={colors.accent} strokeWidth={2.4} />
          </div>
          <span style={{fontSize: 30, fontWeight: 700, letterSpacing: 3, color: colors.accent, textTransform: 'uppercase'}}>
            Sem dado real
          </span>
        </div>
        <div style={{marginTop: 34}}>
          <KineticText
            text="Estoque errado. Prato que não vende."
            ms={msEnergetic}
            startFrame={10}
            style={{fontSize: 52, fontWeight: 700, color: colors.white, lineHeight: 1.22}}
          />
        </div>
        <div style={{marginTop: 20}}>
          <KineticText
            text="Decisão tomada no escuro."
            ms={msEnergetic}
            startFrame={48}
            style={{fontSize: 52, fontWeight: 700, color: 'rgba(255,255,255,0.5)', lineHeight: 1.22}}
          />
        </div>
      </div>
      {/* Punch final — a palavra que nomeia o vilão, cobrindo a tela. */}
      <AbsoluteFill style={{background: '#0b0b10', opacity: punchCoverOpacity}} />
      <AbsoluteFill style={{display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: punchTextOpacity}}>
        <span
          style={{
            fontSize: 148,
            fontWeight: 700,
            color: colors.accent,
            letterSpacing: -4,
            transform: `scale(${punchScale})`,
          }}
        >
          ACHISMO.
        </span>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// 2. VIRADA — bordão da marca + consultoria/software + domínios.
// ---------------------------------------------------------------------------
const ViradaSegment: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const easing = getEasingFn('strong');
  const badgeAnim = slideFadeIn(frame, fps, 4, {distance: 16, easing});
  const badgeScale = popIn(frame, fps, 4, POP_SPRING);
  const compassScale = popIn(frame, fps, 0, POP_SPRING);
  const subAnim = slideFadeIn(frame, fps, 92, {distance: 26, durationInFrames: 18, easing: getEasingFn('gentle')});
  const chips = [
    {label: 'Estoque', Icon: IconChart},
    {label: 'Vendas', Icon: IconCheck},
    {label: 'Performance', Icon: IconGrowth},
  ];
  const chipsAnim = chips.map((_, i) => slideFadeIn(frame, fps, 150 + i * 10, {distance: 20, easing}));

  return (
    <AbsoluteFill style={{background: colors.black}}>
      <div style={{position: 'absolute', right: -60, top: 100, opacity: 0.06, transform: `scale(${compassScale})`}}>
        <IconCompass size={520} color={colors.white} strokeWidth={1.1} />
      </div>
      <div style={{position: 'relative', height: '100%', padding: '0 84px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <div style={{opacity: badgeAnim.opacity, transform: `${badgeAnim.transform} scale(${badgeScale})`, display: 'inline-flex', alignSelf: 'flex-start'}}>
          <Badge>Norte Para Negócios</Badge>
        </div>
        <div style={{marginTop: 36, maxWidth: 920}}>
          <KineticText
            text="Não trabalhamos com achismos."
            ms={msEnergetic}
            startFrame={14}
            style={{fontSize: 64, fontWeight: 700, color: colors.white, lineHeight: 1.14}}
          />
        </div>
        <p
          style={{
            marginTop: 30,
            maxWidth: 880,
            fontSize: 32,
            fontWeight: 400,
            color: 'rgba(255,255,255,0.82)',
            lineHeight: 1.42,
            opacity: subAnim.opacity,
            transform: subAnim.transform,
          }}
        >
          Consultoria de verdade + software próprio pra rodar o que a consultoria recomenda.
        </p>
        <div style={{marginTop: 54, display: 'flex', gap: 30}}>
          {chips.map((c, i) => (
            <div key={c.label} style={{display: 'flex', alignItems: 'center', gap: 10, opacity: chipsAnim[i].opacity, transform: chipsAnim[i].transform}}>
              <c.Icon size={26} color={colors.accent} strokeWidth={2.4} />
              <span style={{fontSize: 26, fontWeight: 700, color: colors.white}}>{c.label}</span>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// 3. VITRINE — 3 produtos reais.
// ---------------------------------------------------------------------------
type ProductSegmentProps = {
  badgeLabel: string;
  headline: string;
  base: string;
  dark: string;
  light: string;
  features: string[];
  children: React.ReactNode;
};

const ProductSegment: React.FC<ProductSegmentProps> = ({badgeLabel, headline, base, dark, light, features, children}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const easing = getEasingFn('strong');
  const badgeAnim = slideFadeIn(frame, fps, 0, {distance: 16, easing});
  const badgeScale = popIn(frame, fps, 0, POP_SPRING);
  const deviceScale = popIn(frame, fps, 6, POP_SPRING);
  const deviceFloat = Math.sin(frame / 18) * 6;
  const featuresAnim = features.map((_, i) => slideFadeIn(frame, fps, 40 + i * 9, {distance: 24, easing}));

  return (
    <AbsoluteFill style={{background: `linear-gradient(160deg, ${dark} 0%, ${base} 145%)`}}>
      <div
        style={{
          position: 'absolute',
          width: 900,
          height: 900,
          borderRadius: '50%',
          background: light,
          opacity: 0.16,
          filter: 'blur(130px)',
          top: -280,
          right: -280,
        }}
      />
      <div style={{position: 'relative', height: '100%', padding: '150px 72px 0'}}>
        <div style={{opacity: badgeAnim.opacity, transform: `${badgeAnim.transform} scale(${badgeScale})`, display: 'inline-block'}}>
          <Badge tone="white">{badgeLabel}</Badge>
        </div>
        <div style={{marginTop: 28, maxWidth: 900}}>
          <KineticText
            text={headline}
            ms={msSoft}
            startFrame={10}
            style={{fontSize: 54, fontWeight: 700, color: colors.white, lineHeight: 1.18}}
          />
        </div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 490, display: 'flex', justifyContent: 'center'}}>
          <div style={{transform: `scale(${deviceScale}) translateY(${deviceFloat}px)`}}>{children}</div>
        </div>
        <div style={{position: 'absolute', left: 72, right: 72, bottom: 130, display: 'flex', flexDirection: 'column', gap: 18}}>
          {features.map((f, i) => (
            <div key={f} style={{display: 'flex', alignItems: 'center', gap: 14, opacity: featuresAnim[i].opacity, transform: featuresAnim[i].transform}}>
              <IconCheck size={26} color={colors.white} strokeWidth={3} />
              <span style={{fontSize: 27, fontWeight: 400, color: colors.white}}>{f}</span>
            </div>
          ))}
        </div>
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
  const features = ['PDI automático a cada ciclo', 'Avaliação multidimensional, não só nota'];
  const featuresAnim = features.map((_, i) => slideFadeIn(frame, fps, 42 + i * 9, {distance: 20, easing}));
  const {norteAvalia} = systemColors;

  return (
    <AbsoluteFill>
      {/* Sem screenshot real do Avalia — foto real (Pexels, ver public/photos/CREDITOS.md) +
          tom de marca, em vez de fabricar uma UI que não existe (mesmo princípio de
          "zero achismo" que o vídeo defende). */}
      <PhotoBackground src="photos/analista-relatorios-mesa.jpg" overlay="full" strength={0.5} position="center 30%" />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(165deg, ${norteAvalia.dark}d9 0%, ${norteAvalia.base}66 100%)`,
        }}
      />
      <div style={{position: 'relative', height: '100%', padding: '150px 72px 140px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
        <div>
          <div style={{opacity: badgeAnim.opacity, transform: `${badgeAnim.transform} scale(${badgeScale})`, display: 'inline-block'}}>
            <Badge tone="white">Avaliação de Desempenho</Badge>
          </div>
          <div style={{marginTop: 28, maxWidth: 900}}>
            <KineticText
              text="Performance com dado, não com feeling."
              ms={msSoft}
              startFrame={10}
              style={{fontSize: 54, fontWeight: 700, color: colors.white, lineHeight: 1.18}}
            />
          </div>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 18}}>
          {features.map((f, i) => (
            <div key={f} style={{display: 'flex', alignItems: 'center', gap: 14, opacity: featuresAnim[i].opacity, transform: featuresAnim[i].transform}}>
              <IconGrowth size={26} color={colors.white} strokeWidth={2.6} />
              <span style={{fontSize: 27, fontWeight: 400, color: colors.white}}>{f}</span>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// 4. CTA — fechamento com CtaBand real + assinatura de marca.
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
    <AbsoluteFill style={{background: colors.black}}>
      <div style={{position: 'absolute', left: -100, bottom: -80, opacity: 0.08}}>
        <GhostBars color={colors.white} width={480} />
      </div>
      <div style={{position: 'relative', height: '100%', padding: '0 72px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 44}}>
        <div>
          <div style={{display: 'flex', alignItems: 'center', gap: 14, opacity: eyebrowAnim.opacity, transform: `${eyebrowAnim.transform} scale(${iconScale})`}}>
            <IconCompass size={30} color={colors.accent} strokeWidth={2.4} />
            <span style={{fontSize: 26, fontWeight: 700, letterSpacing: 3, color: colors.accent, textTransform: 'uppercase'}}>
              Norte Para Negócios
            </span>
          </div>
          <div style={{marginTop: 26, opacity: titleAnim.opacity, transform: titleAnim.transform}}>
            <span style={{fontSize: 58, fontWeight: 700, color: colors.white, lineHeight: 1.18}}>
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
          <span style={{fontSize: 22, fontWeight: 400, fontStyle: 'italic', letterSpacing: 0.8, color: colors.white, opacity: 0.72}}>
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
export const NorteApresentacaoReel: React.FC = () => {
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
        <HookSegment />
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
          badgeLabel="Cardápio Digital"
          headline="Pedido no celular, sem espera."
          base={ntbVendas.base}
          dark={ntbVendas.dark}
          light={ntbVendas.light}
          features={['Comanda digital em tempo real', 'Gestão de mesas e status de ocupação']}
        >
          <PhoneFrame src="screenshots/vendas-mobile.png" width={370} rotate={-5} aspectRatio={1170 / 2532} />
        </ProductSegment>
      </Sequence>
      <Sequence from={t3Start} durationInFrames={D.t3}>
        <MotionTransition motionStyle={msWhip} durationInFrames={D.t3} accentColor={ntbEstoque.base} />
      </Sequence>

      <Sequence from={estoqueStart} durationInFrames={D.estoque}>
        <ProductSegment
          badgeLabel="Gestão de Estoque"
          headline="Estoque sincronizado com o Omie, em tempo real."
          base={ntbEstoque.base}
          dark={ntbEstoque.dark}
          light={ntbEstoque.light}
          features={['Etiqueta inteligente de lote e validade', 'Inventário via leitura de QR code']}
        >
          <BrowserFrame src="screenshots/produto-desktop.png" width={780} rotate={2} aspectRatio={1440 / 900} />
        </ProductSegment>
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
