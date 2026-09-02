import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {wipeProgress, whipPanProgress, flashPulse, zoomPunchIn, splitEnter} from './motion';
import type {MotionStyle} from './motionStyles';

type MotionTransitionProps = {
  motionStyle: MotionStyle;
  durationInFrames: number;
  /** Cor de accent do tema — usada nos transitions que "pintam" a tela (wipe/zoomPunch/whipPan). */
  accentColor: string;
  /** Cor de "véu" pro crossDissolve (fade através de uma cor sólida) — default branco. */
  veilColor?: string;
  glowColor?: string;
};

/**
 * Componente de transição COMPARTILHADO entre Reels — renderiza o efeito de
 * corte/transição certo pro `motionStyle.transition` (Round C,
 * docs/plano-catalogo-em-escala.md). Vive numa `<Sequence>` própria, entre a
 * Sequence do segmento anterior e a do próximo (mesmo padrão que já existia
 * isolado dentro de `DadoVsAchismoReel` como `WipeSegment` — generalizado
 * aqui pra qualquer preset/Reel).
 *
 * `cutSeco` retorna `null` de propósito: corte seco de verdade é a AUSÊNCIA
 * de elemento de transição (a Sequence seguinte já troca o frame), não um
 * efeito visual — reproduzir isso com uma `<Sequence>` de duração mínima (o
 * caller usa `scalePace(ms, 0, {min: 1})` ou similar) é o comportamento
 * correto, não um bug.
 */
export const MotionTransition: React.FC<MotionTransitionProps> = ({
  motionStyle,
  durationInFrames,
  accentColor,
  veilColor = '#ffffff',
  glowColor,
}) => {
  const frame = useCurrentFrame();
  const {transition} = motionStyle;

  if (transition === 'cutSeco') {
    return null;
  }

  if (transition === 'wipe') {
    const progress = wipeProgress(frame, 0, durationInFrames);
    const barHeight = interpolate(progress, [0, 1], [70, 1940]);
    const skew = interpolate(progress, [0, 1], [-2.2, 0]);
    return (
      <AbsoluteFill style={{overflow: 'hidden'}}>
        <div
          style={{
            position: 'absolute',
            left: -40,
            right: -40,
            top: '50%',
            height: barHeight,
            marginTop: -barHeight / 2,
            background: accentColor,
            transform: `skewY(${skew}deg)`,
            boxShadow: `0 0 60px 10px ${glowColor ?? 'rgba(0,0,0,0.35)'}`,
          }}
        />
      </AbsoluteFill>
    );
  }

  if (transition === 'crossDissolve') {
    // Fade "através" de uma cor sólida (véu) — cobre a tela e revela de
    // volta. Ritmo lento/suave (minimalFade usa paceScale alto), sem barra
    // nem flash — transição contida, não decorativa.
    const opacity = flashPulse(frame, 0, durationInFrames);
    return <AbsoluteFill style={{background: veilColor, opacity}} />;
  }

  if (transition === 'zoomPunch') {
    // Círculo de accent que "estala" cobrindo a tela toda — corte de zoom
    // agressivo, não fade.
    const scale = zoomPunchIn(frame, 0, {fromScale: 0.15, toScale: 3.4, durationInFrames});
    const opacity = interpolate(frame, [0, durationInFrames * 0.35, durationInFrames], [0, 1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    return (
      <AbsoluteFill style={{overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div
          style={{
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: accentColor,
            transform: `scale(${scale})`,
            opacity,
          }}
        />
      </AbsoluteFill>
    );
  }

  if (transition === 'whipPan') {
    // "Speed lines" horizontais borradas cruzando a tela — proxy de motion
    // graphics pro whip-pan (a técnica real de câmera não se aplica a
    // composições geradas em código; isso entrega a MESMA leitura de "corte
    // rápido de tempo/cena" que a pesquisa 2026 aponta como padrão).
    const {blurPx, translateXPercent} = whipPanProgress(frame, 0, durationInFrames);
    const opacity = flashPulse(frame, 0, durationInFrames);
    return (
      <AbsoluteFill style={{overflow: 'hidden', background: accentColor, opacity: opacity * 0.92}}>
        <div
          style={{
            position: 'absolute',
            inset: '-10% -30%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            transform: `translateX(${translateXPercent}%)`,
            filter: `blur(${blurPx}px)`,
          }}
        >
          {Array.from({length: 7}).map((_, i) => (
            <div key={i} style={{height: 10, background: 'rgba(255,255,255,0.55)', width: `${70 + (i % 3) * 12}%`}} />
          ))}
        </div>
      </AbsoluteFill>
    );
  }

  if (transition === 'matchCut') {
    // Flash curto e seco no ponto de corte — reforça "isso e a mesma coisa,
    // só que depois" (achado de pesquisa: match cut e' o padrao real de
    // antes/depois). Sem barra, sem pan — só o clarão.
    const opacity = flashPulse(frame, 0, durationInFrames);
    return <AbsoluteFill style={{background: '#ffffff', opacity: opacity * 0.85}} />;
  }

  // transition === 'splitConverge'
  // Dois paineis (accent escuro / accent) entram de lados opostos e se
  // encontram no centro, cobrindo a tela — usado no preset `splitReveal`.
  const left = splitEnter(frame, 30, 0, {side: 'left', distance: 620, durationInFrames});
  const right = splitEnter(frame, 30, 0, {side: 'right', distance: 620, durationInFrames});
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          width: '50%',
          background: glowColor ?? 'rgba(20,20,30,0.92)',
          opacity: left.opacity,
          transform: left.transform,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          width: '50%',
          background: accentColor,
          opacity: right.opacity,
          transform: right.transform,
        }}
      />
    </AbsoluteFill>
  );
};
