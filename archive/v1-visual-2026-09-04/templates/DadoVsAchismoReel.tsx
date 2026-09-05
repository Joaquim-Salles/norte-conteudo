import React from 'react';
import {AbsoluteFill, Sequence, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Frame} from '../lib/Frame';
import {CtaBand} from '../lib/CtaBand';
import {Badge} from '../lib/Badge';
import {colors} from '../lib/tokens';
import {getTheme, type Theme} from '../lib/themes';
import {IconAlert, IconChart} from '../lib/icons';
import {GhostBars} from '../lib/GhostGraphics';
import {countUp, popIn, slideFadeIn} from '../lib/motion';
import {KineticText} from '../lib/KineticText';
import {MotionTransition} from '../lib/MotionTransition';
import {getMotionStyle, getEasingFn, resolveHighlight, scalePace, type MotionStyleName, type MotionStyle} from '../lib/motionStyles';
import type {DadoVsAchismoReelData} from '../lib/types';

/**
 * Template 1 — Dado vs. Achismo, versão REEL (Composition, não Still).
 * 1080x1920, 30fps. Mesmo princípio editorial do Still (achismo comprimido/
 * riscado → dado dominante → CTA), mas contado no tempo em vez de composto
 * numa imagem só — kinetic typography de verdade, não slide com música.
 *
 * REFATORADO (Round C, 2026-09-01, docs/plano-catalogo-em-escala.md) pra
 * aceitar `motionStyle?: MotionStyleName` (src/lib/motionStyles.ts) — a
 * lógica de motion que antes estava hardcoded (stagger word, wipe, spring)
 * agora é resolvida a partir do preset. Omitir `motionStyle` = `kineticForte`,
 * que É essa mesma aparência original (compatibilidade garantida).
 *
 * Estrutura em 5 `<Sequence>` (frame local reinicia em 0 dentro de cada uma):
 *  1. ACHISMO — entrada de texto conforme `ms.textEntry`, mask reveal de
 *     "riscado" no fim (reforça "isso está errado" no tempo).
 *  2. TRANSIÇÃO 1 — `MotionTransition` conforme `ms.transition`.
 *  3. DADO — número faz count-up (curva fixa — é uma contagem, não uma
 *     entrada de texto), escala de CHEGADA conforme `ms.highlight`.
 *  4. TRANSIÇÃO 2 — mesma transição, mais curta, antes do CTA.
 *  5. CTA — CtaBand sobe, badge com pop (spring do preset).
 */

function computeDurations(ms: MotionStyle) {
  const achismo = scalePace(ms, 72);
  const transition1 = ms.transition === 'cutSeco' ? 2 : scalePace(ms, 14, {min: 6});
  const dado = scalePace(ms, 84);
  const transition2 = ms.transition === 'cutSeco' ? 2 : scalePace(ms, 9, {min: 4});
  const cta = scalePace(ms, 42);
  return {achismo, transition1, dado, transition2, cta, total: achismo + transition1 + dado + transition2 + cta};
}

export function dadoVsAchismoReelDurationInFrames(motionStyle?: MotionStyleName): number {
  return computeDurations(getMotionStyle(motionStyle)).total;
}

const AchismoSegment: React.FC<{achismo: string; ms: MotionStyle}> = ({achismo, ms}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const easing = getEasingFn(ms.easing);
  const labelAnim = slideFadeIn(frame, fps, 2, {distance: 20, easing});
  const iconScale = popIn(frame, fps, 0, ms.spring);
  // "Mask reveal": o traço de riscado cresce da esquerda pra direita sobre a
  // frase inteira, depois que todas as palavras já apareceram — reforça no
  // TEMPO a mesma ideia que o Still faz só visualmente (achismo = errado).
  // O ponto de início escala com o pace do preset (frase mais lenta = risco
  // mais tarde, minimalFade/typewriter não "riscam" antes do texto acabar).
  const strikeStart = ms.textEntry === 'typewriter' ? 58 : 46;
  const strikeProgress = interpolate(frame, [strikeStart, strikeStart + 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing,
  });

  return (
    <AbsoluteFill
      style={{background: '#e7e7ee', padding: '0 84px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}
    >
      <div style={{display: 'flex', alignItems: 'center', gap: 16, opacity: labelAnim.opacity, transform: labelAnim.transform}}>
        <div style={{transform: `scale(${iconScale})`}}>
          <IconAlert size={36} color="#8a8a99" strokeWidth={2.4} />
        </div>
        <span style={{fontSize: 34, fontWeight: 700, letterSpacing: 3, color: '#8a8a99', textTransform: 'uppercase'}}>
          Achismo
        </span>
      </div>

      <div style={{position: 'relative', marginTop: 44}}>
        <p style={{fontSize: 60, fontWeight: 400, fontStyle: 'italic', color: '#54546a', lineHeight: 1.34, margin: 0}}>
          <KineticText
            text={achismo}
            ms={ms}
            startFrame={12}
            side="left"
            distance={26}
            style={{fontSize: 60, fontWeight: 400, fontStyle: 'italic', color: '#54546a'}}
          />
        </p>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: '54%',
            height: 6,
            width: `${strikeProgress * 96}%`,
            background: '#9a9aab',
            borderRadius: 999,
            transform: 'rotate(-1.2deg)',
            transformOrigin: 'left center',
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

const DadoSegment: React.FC<{percentual: number; dadoTexto: string; fonteDado?: string; theme: Theme; ms: MotionStyle}> = ({
  percentual,
  dadoTexto,
  fonteDado,
  theme,
  ms,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const easing = getEasingFn(ms.easing);
  const labelAnim = slideFadeIn(frame, fps, 4, {distance: 20, easing});
  const iconScale = popIn(frame, fps, 2, ms.spring);
  const count = countUp(frame, fps, 12, percentual, 34);
  const {scale: numberScale, flashOpacity} = resolveHighlight(ms, frame, 12, 34);
  const fonteOpacity = interpolate(frame, [70, 80], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  // Barras de fundo — crescem em stagger, reforcam "dado real" (nao decorativo
  // parado: cada barra "chega" em sequencia, como um grafico sendo montado).
  const barTargets = [90, 140, 190, 232, 262];
  const barStarts = [8, 12, 16, 20, 24];

  return (
    <AbsoluteFill
      style={{
        background: theme.colors.dark,
        padding: '0 84px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div style={{position: 'absolute', right: -20, bottom: 250, display: 'flex', alignItems: 'flex-end', gap: 16, opacity: 0.2}}>
        {barTargets.map((h, i) => {
          const p = interpolate(frame, [barStarts[i], barStarts[i] + 18], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing,
          });
          return <div key={i} style={{width: 48, height: h * p, background: theme.colors.light, borderRadius: 8}} />;
        })}
      </div>

      <div style={{display: 'flex', alignItems: 'center', gap: 14, opacity: labelAnim.opacity, transform: labelAnim.transform}}>
        <div style={{transform: `scale(${iconScale})`}}>
          <IconChart size={32} color={colors.accent} strokeWidth={2.6} />
        </div>
        <span style={{fontSize: 34, fontWeight: 700, letterSpacing: 3, color: colors.accent, textTransform: 'uppercase'}}>
          Dado real
        </span>
      </div>

      <div style={{position: 'relative', marginTop: 26}}>
        {flashOpacity > 0 ? (
          // Clarao suave (gradiente radial, nao caixa com blur) — achado real
          // de QA visual (Regra Inviolavel #1, Round C): a versao anterior
          // (caixa com borderRadius+blur) deixava um retangulo cinza visivel
          // atras do numero em vez de um "flash" de verdade. Gradiente radial
          // sem borda dura resolve.
          <div
            style={{
              position: 'absolute',
              inset: -70,
              background: `radial-gradient(closest-side, rgba(255,255,255,${flashOpacity}) 0%, rgba(255,255,255,0) 72%)`,
              pointerEvents: 'none',
            }}
          />
        ) : null}
        <div style={{transform: `scale(${numberScale})`, transformOrigin: 'left center'}}>
          <span style={{fontSize: 176, fontWeight: 700, color: colors.white, letterSpacing: -5, lineHeight: 0.95}}>
            {count}%
          </span>
        </div>
      </div>

      <p style={{marginTop: 30, fontSize: 42, fontWeight: 700, color: colors.white, lineHeight: 1.28, maxWidth: 900, margin: '30px 0 0'}}>
        <KineticText
          text={dadoTexto}
          ms={ms}
          startFrame={52}
          side="right"
          durationInFrames={12}
          distance={18}
          wordGap={14}
          style={{fontSize: 42, fontWeight: 700, color: colors.white}}
        />
      </p>

      {fonteDado ? (
        <span style={{marginTop: 26, fontSize: 24, color: 'rgba(255,255,255,0.55)', opacity: fonteOpacity}}>
          Fonte: {fonteDado}
        </span>
      ) : null}
    </AbsoluteFill>
  );
};

const CtaSegment: React.FC<{ms: MotionStyle}> = ({ms}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const easing = getEasingFn(ms.easing);
  const titleAnim = slideFadeIn(frame, fps, 0, {distance: 50, durationInFrames: 18, easing});
  const ctaAnim = slideFadeIn(frame, fps, 8, {distance: 60, durationInFrames: 20, easing});
  const badgeScale = popIn(frame, fps, 0, ms.spring);

  return (
    <AbsoluteFill style={{background: colors.black}}>
      <div style={{position: 'absolute', right: -60, top: 140}}>
        <GhostBars color={colors.white} opacity={0.09} width={420} />
      </div>
      <div style={{position: 'absolute', left: 72, right: 72, bottom: 220}}>
        <div style={{opacity: titleAnim.opacity, transform: titleAnim.transform}}>
          <div style={{display: 'inline-block', transform: `scale(${badgeScale})`}}>
            <Badge>Dado vs. Achismo</Badge>
          </div>
          <h2 style={{fontSize: 56, fontWeight: 700, color: colors.white, margin: '28px 0 44px', lineHeight: 1.15}}>
            Decisão com dado, não com achismo.
          </h2>
        </div>
        <div style={{opacity: ctaAnim.opacity, transform: ctaAnim.transform}}>
          <CtaBand />
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const DadoVsAchismoReel: React.FC<DadoVsAchismoReelData> = ({
  achismo,
  percentual,
  dadoTexto,
  fonteDado,
  theme = 'marca',
  motionStyle,
}) => {
  const t = getTheme(theme);
  const ms = getMotionStyle(motionStyle);
  const d = computeDurations(ms);

  return (
    <Frame background={colors.black} wordmarkColor={colors.white}>
      <Sequence from={0} durationInFrames={d.achismo}>
        <AchismoSegment achismo={achismo} ms={ms} />
      </Sequence>
      <Sequence from={d.achismo} durationInFrames={d.transition1}>
        <MotionTransition motionStyle={ms} durationInFrames={d.transition1} accentColor={colors.accent} veilColor="#e7e7ee" />
      </Sequence>
      <Sequence from={d.achismo + d.transition1} durationInFrames={d.dado}>
        <DadoSegment percentual={percentual} dadoTexto={dadoTexto} fonteDado={fonteDado} theme={t} ms={ms} />
      </Sequence>
      <Sequence from={d.achismo + d.transition1 + d.dado} durationInFrames={d.transition2}>
        <MotionTransition
          motionStyle={ms}
          durationInFrames={d.transition2}
          accentColor={colors.accent}
          veilColor={t.colors.dark}
          glowColor="rgba(0,0,0,0.85)"
        />
      </Sequence>
      <Sequence from={d.achismo + d.transition1 + d.dado + d.transition2} durationInFrames={d.cta}>
        <CtaSegment ms={ms} />
      </Sequence>
    </Frame>
  );
};

export const dadoVsAchismoReelDefaultProps: DadoVsAchismoReelData = {
  achismo: '"Acho que meu estoque tá mais ou menos certo."',
  percentual: 38,
  dadoTexto: 'das PMEs perdem margem por ruptura ou excesso de estoque não detectado.',
  fonteDado: 'Norte Para Negócios, diagnóstico operacional',
};
