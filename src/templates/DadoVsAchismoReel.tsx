import React from 'react';
import {AbsoluteFill, Sequence, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Frame} from '../lib/Frame';
import {CtaBand} from '../lib/CtaBand';
import {Badge} from '../lib/Badge';
import {colors} from '../lib/tokens';
import {getTheme, type Theme} from '../lib/themes';
import {IconAlert, IconChart} from '../lib/icons';
import {GhostBars} from '../lib/GhostGraphics';
import {staggerWords, countUp, popIn, slideFadeIn, EASE_OUT_STRONG, wipeProgress} from '../lib/motion';
import type {DadoVsAchismoReelData} from '../lib/types';

/**
 * Template 1 — Dado vs. Achismo, versão REEL (Composition, não Still).
 * 1080x1920, 30fps. Mesmo princípio editorial do Still (achismo comprimido/
 * riscado → dado dominante → CTA), mas contado no tempo em vez de composto
 * numa imagem só — kinetic typography de verdade, não slide com música.
 *
 * Estrutura em 4 `<Sequence>` (frame local reinicia em 0 dentro de cada uma):
 *  1. ACHISMO (0-71) — stagger word reveal da frase, depois um traço de
 *     "mask reveal" cresce da esquerda pra riscar a frase inteira (reforça
 *     "isso está errado" no tempo, não só visualmente estático).
 *  2. WIPE (72-85) — barra de accent (a mesma "costura diagonal" que já
 *     existe nas 3 variantes Still) cresce de tarja fina até cobrir a tela
 *     inteira — um "flash cut" de accent que corta pro Dado. Técnica de
 *     transição real de edição de Reels, não fade genérico.
 *  3. DADO (86-169) — número faz count-up de 0 até o percentual real (não
 *     aparece pronto), barras de fundo crescem em stagger reforçando "dado
 *     real", texto entra em stagger word reveal.
 *  4. CTA (170-209) — CtaBand sobe com slide+fade, badge com pop.
 */

const ACHISMO_DURATION = 72;
const WIPE_DURATION = 14;
const DADO_DURATION = 84;
const CTA_DURATION = 42;

export const dadoVsAchismoReelDurationInFrames = ACHISMO_DURATION + WIPE_DURATION + DADO_DURATION + CTA_DURATION;

const AchismoSegment: React.FC<{achismo: string}> = ({achismo}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const words = staggerWords(achismo, frame, fps, 12, {staggerFrames: 3, durationInFrames: 14, distance: 26});
  const labelAnim = slideFadeIn(frame, fps, 2, {distance: 20});
  const iconScale = popIn(frame, fps, 0);
  // "Mask reveal": o traço de riscado cresce da esquerda pra direita sobre a
  // frase inteira, depois que todas as palavras já apareceram — reforça no
  // TEMPO a mesma ideia que o Still faz só visualmente (achismo = errado).
  const strikeProgress = interpolate(frame, [46, 64], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: EASE_OUT_STRONG,
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
          {words.map((w, i) => (
            <span
              key={i}
              style={{display: 'inline-block', opacity: w.opacity, transform: w.transform, marginRight: 16}}
            >
              {w.word}
            </span>
          ))}
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

const WipeSegment: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = wipeProgress(frame, 0, WIPE_DURATION);
  const barHeight = interpolate(progress, [0, 1], [70, 1940]);
  const skew = interpolate(progress, [0, 1], [-2.2, 0]);
  return (
    <AbsoluteFill style={{background: '#e7e7ee'}}>
      <div
        style={{
          position: 'absolute',
          left: -40,
          right: -40,
          top: '50%',
          height: barHeight,
          marginTop: -barHeight / 2,
          background: colors.accent,
          transform: `skewY(${skew}deg)`,
          boxShadow: '0 0 60px 10px rgba(244,63,94,0.35)',
        }}
      />
    </AbsoluteFill>
  );
};

const DadoSegment: React.FC<{percentual: number; dadoTexto: string; fonteDado?: string; theme: Theme}> = ({
  percentual,
  dadoTexto,
  fonteDado,
  theme,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const labelAnim = slideFadeIn(frame, fps, 4, {distance: 20});
  const iconScale = popIn(frame, fps, 2);
  const count = countUp(frame, fps, 12, percentual, 34);
  const numberPop = interpolate(frame, [12, 20, 46], [0.88, 1.05, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: EASE_OUT_STRONG,
  });
  const textWords = staggerWords(dadoTexto, frame, fps, 52, {staggerFrames: 2, durationInFrames: 12, distance: 18});
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
            easing: EASE_OUT_STRONG,
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

      <div style={{marginTop: 26, transform: `scale(${numberPop})`, transformOrigin: 'left center'}}>
        <span style={{fontSize: 176, fontWeight: 700, color: colors.white, letterSpacing: -5, lineHeight: 0.95}}>
          {count}%
        </span>
      </div>

      <p style={{marginTop: 30, fontSize: 42, fontWeight: 700, color: colors.white, lineHeight: 1.28, maxWidth: 900, margin: '30px 0 0'}}>
        {textWords.map((w, i) => (
          <span key={i} style={{display: 'inline-block', opacity: w.opacity, transform: w.transform, marginRight: 14}}>
            {w.word}
          </span>
        ))}
      </p>

      {fonteDado ? (
        <span style={{marginTop: 26, fontSize: 24, color: 'rgba(255,255,255,0.55)', opacity: fonteOpacity}}>
          Fonte: {fonteDado}
        </span>
      ) : null}
    </AbsoluteFill>
  );
};

const CtaSegment: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const titleAnim = slideFadeIn(frame, fps, 0, {distance: 50, durationInFrames: 18});
  const ctaAnim = slideFadeIn(frame, fps, 8, {distance: 60, durationInFrames: 20});
  const badgeScale = popIn(frame, fps, 0);

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
}) => {
  const t = getTheme(theme);
  return (
    <Frame background={colors.black} wordmarkColor={colors.white}>
      <Sequence from={0} durationInFrames={ACHISMO_DURATION}>
        <AchismoSegment achismo={achismo} />
      </Sequence>
      <Sequence from={ACHISMO_DURATION} durationInFrames={WIPE_DURATION}>
        <WipeSegment />
      </Sequence>
      <Sequence from={ACHISMO_DURATION + WIPE_DURATION} durationInFrames={DADO_DURATION}>
        <DadoSegment percentual={percentual} dadoTexto={dadoTexto} fonteDado={fonteDado} theme={t} />
      </Sequence>
      <Sequence from={ACHISMO_DURATION + WIPE_DURATION + DADO_DURATION} durationInFrames={CTA_DURATION}>
        <CtaSegment />
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
