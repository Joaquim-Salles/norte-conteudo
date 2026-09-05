import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import {Frame} from '../lib/Frame';
import {CtaBand} from '../lib/CtaBand';
import {Badge} from '../lib/Badge';
import {colors} from '../lib/tokens';
import {IconCycle} from '../lib/icons';
import {GhostBars} from '../lib/GhostGraphics';
import {popIn, slideFadeIn, progressFill} from '../lib/motion';
import {KineticText} from '../lib/KineticText';
import {MotionTransition} from '../lib/MotionTransition';
import {getMotionStyle, getEasingFn, resolveHighlight, scalePace, type MotionStyleName, type MotionStyle} from '../lib/motionStyles';
import type {MetodologiaReelData} from '../lib/types';

/**
 * Template 5 — Metodologia sem Enrolação, versão REEL (Composition).
 * 1080x1920, 30fps. Comprime o carrossel (cover → passo 1..N → cta) numa
 * única timeline, com o tracker de progresso ANIMADO (não só presente) —
 * cada etapa "chega" com pop + a linha até o checkpoint anterior desenha.
 *
 * REFATORADO (Round C, 2026-09-01) pra aceitar `motionStyle?: MotionStyleName`
 * (src/lib/motionStyles.ts) — omitido = `kineticForte` (aparência original).
 * Diferente do `DadoVsAchismoReel`: aqui a transição ENTRE PASSOS continua
 * sendo o tracker de progresso (é o mecanismo de transição próprio desse
 * template, deliberadamente preservado — trocá-lo por `MotionTransition` a
 * cada passo destruiria a leitura de "processo contínuo" que é o ponto do
 * template). `MotionTransition` entra só nas 2 bordas que ANTES eram corte
 * seco sem nenhum efeito: Cover→Passo 1 e último Passo→CTA.
 *
 * `IconCycle` do cover gira continuamente (rotação amarrada ao frame, não
 * decorativa parada) — reforça literalmente o conceito de "ciclo que se
 * repete" (PDCA/Lean) que o nome do template já carrega.
 */

function computeDurations(ms: MotionStyle, totalPassos: number) {
  const cover = scalePace(ms, 58);
  const transitionIn = ms.transition === 'cutSeco' ? 2 : scalePace(ms, 12, {min: 6});
  const stepDur = scalePace(ms, 52);
  const transitionOut = ms.transition === 'cutSeco' ? 2 : scalePace(ms, 12, {min: 6});
  const cta = scalePace(ms, 46);
  return {
    cover,
    transitionIn,
    stepDur,
    transitionOut,
    cta,
    total: cover + transitionIn + stepDur * totalPassos + transitionOut + cta,
  };
}

export function metodologiaReelDurationInFrames(totalPassos: number, motionStyle?: MotionStyleName): number {
  return computeDurations(getMotionStyle(motionStyle), totalPassos).total;
}

const CoverSegment: React.FC<{metodo?: string; titulo: string; ms: MotionStyle}> = ({metodo, titulo, ms}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const easing = getEasingFn(ms.easing);
  const badgeScale = popIn(frame, fps, 0, ms.spring);
  const hintAnim = slideFadeIn(frame, fps, 34, {distance: 16, easing});
  // Rotacao continua do ciclo — gira devagar a peca inteira do cover, reforca
  // "isso e um processo que roda", nao um icone parado. Velocidade acompanha
  // o pace do preset (minimalFade gira mais devagar, zoomPunch mais rapido).
  const rotation = frame * (3.4 / ms.paceScale);

  return (
    <AbsoluteFill style={{background: colors.black, padding: '160px 76px 0', display: 'flex', flexDirection: 'column'}}>
      <div style={{display: 'inline-block', alignSelf: 'flex-start', transform: `scale(${badgeScale})`}}>
        <Badge>{metodo ?? 'Metodologia'}</Badge>
      </div>
      <h1 style={{fontSize: 70, fontWeight: 700, color: colors.white, lineHeight: 1.08, letterSpacing: -1.5, margin: '34px 0 0'}}>
        <KineticText text={titulo} ms={ms} startFrame={8} side="left" distance={30} durationInFrames={16} wordGap={18} style={{}} />
      </h1>
      <div style={{marginTop: 44, height: 6, width: 120, background: colors.accent, borderRadius: 999}} />
      <div style={{marginTop: 40, opacity: hintAnim.opacity, transform: hintAnim.transform}}>
        <span style={{fontSize: 26, fontWeight: 400, fontStyle: 'italic', color: 'rgba(255,255,255,0.72)'}}>
          Passo a passo, sem enrolação.
        </span>
      </div>

      <div
        style={{
          position: 'absolute',
          right: 76,
          bottom: 240,
          width: 108,
          height: 108,
          borderRadius: 999,
          background: colors.accent,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 20px 44px -14px rgba(244,63,94,0.6)',
        }}
      >
        <div style={{transform: `rotate(${rotation}deg)`, display: 'flex'}}>
          <IconCycle size={56} color={colors.white} strokeWidth={2.6} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** Tracker de progresso animado — dot atual "chega" com pop, linha até o anterior desenha. */
const ProgressTracker: React.FC<{total: number; atual: number; frame: number; fps: number; ms: MotionStyle}> = ({
  total,
  atual,
  frame,
  fps,
  ms,
}) => {
  const {scale: dotPop} = resolveHighlight(ms, frame, 6, 14);
  const linePop = progressFill(frame, 10, 16);
  return (
    <div style={{position: 'absolute', top: 130, left: 76, right: 76, display: 'flex', alignItems: 'center'}}>
      {Array.from({length: total}).map((_, i) => {
        const stepNum = i + 1;
        const isActive = stepNum === atual;
        const isDone = stepNum < atual;
        return (
          <React.Fragment key={i}>
            <div
              style={{
                width: isActive ? 30 : 16,
                height: 16,
                borderRadius: 999,
                flexShrink: 0,
                background: isActive || isDone ? colors.accent : 'rgba(255,255,255,0.18)',
                transform: isActive ? `scale(${dotPop})` : 'scale(1)',
              }}
            />
            {i < total - 1 ? (
              <div
                style={{
                  flex: 1,
                  height: 3,
                  margin: '0 8px',
                  background: 'rgba(255,255,255,0.18)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: colors.accent,
                    transform: `scaleX(${stepNum < atual ? 1 : stepNum === atual ? 0 : 0})`,
                    transformOrigin: 'left center',
                    opacity: stepNum === atual - 1 ? linePop : stepNum < atual ? 1 : 0,
                  }}
                />
              </div>
            ) : null}
          </React.Fragment>
        );
      })}
    </div>
  );
};

const StepSegment: React.FC<{numero: number; total: number; titulo: string; descricao: string; ms: MotionStyle}> = ({
  numero,
  total,
  titulo,
  descricao,
  ms,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const easing = getEasingFn(ms.easing);
  const {scale: numberScale, flashOpacity} = resolveHighlight(ms, frame, 0, 16);
  const descAnim = slideFadeIn(frame, fps, 20, {distance: 18, easing});

  return (
    <AbsoluteFill style={{background: colors.white, padding: '0 76px'}}>
      <ProgressTracker total={total} atual={numero} frame={frame} fps={fps} ms={ms} />

      <div style={{position: 'absolute', top: 260, left: 76, right: 76}}>
        <div style={{display: 'flex', alignItems: 'flex-start', gap: 26}}>
          <div style={{position: 'relative'}}>
            {flashOpacity > 0 ? (
              // Mesmo clarao (gradiente radial) do highlight `flash` do
              // DadoVsAchismoReel — consistencia entre Reels pro preset
              // `matchCut` (ver src/lib/motionStyles.ts).
              <div
                style={{
                  position: 'absolute',
                  inset: -50,
                  background: `radial-gradient(closest-side, rgba(0,0,0,${flashOpacity * 0.5}) 0%, rgba(0,0,0,0) 72%)`,
                  pointerEvents: 'none',
                }}
              />
            ) : null}
            <span
              style={{
                position: 'relative',
                fontSize: 128,
                fontWeight: 700,
                color: colors.black,
                lineHeight: 0.82,
                letterSpacing: -6,
                transform: `scale(${numberScale})`,
                transformOrigin: 'left top',
                display: 'inline-block',
              }}
            >
              {String(numero).padStart(2, '0')}
            </span>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 14}}>
            <h2 style={{fontSize: 46, fontWeight: 700, color: colors.black, lineHeight: 1.14, margin: 0}}>
              <KineticText
                text={titulo}
                ms={ms}
                startFrame={10}
                side="right"
                distance={20}
                durationInFrames={12}
                wordGap={12}
                style={{}}
              />
            </h2>
            <p
              style={{
                fontSize: 30,
                fontWeight: 400,
                color: '#43434f',
                lineHeight: 1.42,
                margin: 0,
                opacity: descAnim.opacity,
                transform: descAnim.transform,
              }}
            >
              {descricao}
            </p>
          </div>
        </div>

        <span style={{display: 'block', marginTop: 56, fontSize: 22, fontWeight: 700, color: '#a0a0ae', letterSpacing: 1}}>
          PASSO {numero} DE {total}
        </span>
      </div>
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
      <div style={{position: 'absolute', right: -80, top: 120}}>
        <GhostBars color={colors.white} opacity={0.09} width={440} />
      </div>
      <div style={{position: 'absolute', left: 72, right: 72, bottom: 220}}>
        <div style={{opacity: titleAnim.opacity, transform: titleAnim.transform}}>
          <div style={{display: 'inline-block', transform: `scale(${badgeScale})`}}>
            <Badge>Metodologia</Badge>
          </div>
          <h2 style={{fontSize: 54, fontWeight: 700, color: colors.white, margin: '28px 0 44px', lineHeight: 1.15}}>
            Sem achismo. Sem enrolação. Bora aplicar isso aí.
          </h2>
        </div>
        <div style={{opacity: ctaAnim.opacity, transform: ctaAnim.transform}}>
          <CtaBand />
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const MetodologiaReel: React.FC<MetodologiaReelData> = ({metodo, titulo, passos, motionStyle}) => {
  const total = passos.length;
  const ms = getMotionStyle(motionStyle);
  const d = computeDurations(ms, total);

  let cursor = d.cover + d.transitionIn;

  return (
    <Frame background={colors.black} wordmarkColor={colors.white}>
      <Sequence from={0} durationInFrames={d.cover}>
        <CoverSegment metodo={metodo} titulo={titulo} ms={ms} />
      </Sequence>

      <Sequence from={d.cover} durationInFrames={d.transitionIn}>
        <MotionTransition motionStyle={ms} durationInFrames={d.transitionIn} accentColor={colors.accent} veilColor={colors.white} />
      </Sequence>

      {passos.map((passo, i) => {
        const from = cursor;
        cursor += d.stepDur;
        return (
          <Sequence key={i} from={from} durationInFrames={d.stepDur}>
            <StepSegment numero={i + 1} total={total} titulo={passo.titulo} descricao={passo.descricao} ms={ms} />
          </Sequence>
        );
      })}

      <Sequence from={cursor} durationInFrames={d.transitionOut}>
        <MotionTransition
          motionStyle={ms}
          durationInFrames={d.transitionOut}
          accentColor={colors.accent}
          veilColor={colors.black}
          glowColor="rgba(0,0,0,0.85)"
        />
      </Sequence>

      <Sequence from={cursor + d.transitionOut} durationInFrames={d.cta}>
        <CtaSegment ms={ms} />
      </Sequence>
    </Frame>
  );
};

export const metodologiaReelDefaultProps: MetodologiaReelData = {
  metodo: 'PDCA',
  titulo: 'PDCA aplicado ao seu estoque',
  passos: [
    {titulo: 'Plan', descricao: 'Mapeia onde o estoque diverge — sem isso, todo o resto é achismo.'},
    {titulo: 'Do', descricao: 'Aplica o processo corrigido na prática, com QR code e etiqueta por lote.'},
    {titulo: 'Check', descricao: 'Confere o inventário todo mês — bate com o sistema, sem retrabalho.'},
  ],
};
