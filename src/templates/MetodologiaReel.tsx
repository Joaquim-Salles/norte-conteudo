import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import {Frame} from '../lib/Frame';
import {CtaBand} from '../lib/CtaBand';
import {Badge} from '../lib/Badge';
import {colors} from '../lib/tokens';
import {IconCycle} from '../lib/icons';
import {GhostBars} from '../lib/GhostGraphics';
import {staggerWords, popIn, slideFadeIn, progressFill} from '../lib/motion';
import type {MetodologiaReelData} from '../lib/types';

/**
 * Template 5 — Metodologia sem Enrolação, versão REEL (Composition).
 * 1080x1920, 30fps. Comprime o carrossel (cover → passo 1..N → cta) numa
 * única timeline, com o tracker de progresso ANIMADO (não só presente) —
 * cada etapa "chega" com pop + a linha até o checkpoint anterior desenha.
 *
 * `IconCycle` do cover gira continuamente (rotação amarrada ao frame, não
 * decorativa parada) — reforça literalmente o conceito de "ciclo que se
 * repete" (PDCA/Lean) que o nome do template já carrega.
 */

const COVER_DURATION = 58;
const stepDuration = (n: number) => 52 + (n > 6 ? 0 : 0); // 52f (~1.73s) por etapa
const CTA_DURATION = 46;

export function metodologiaReelDurationInFrames(totalPassos: number): number {
  return COVER_DURATION + stepDuration(0) * totalPassos + CTA_DURATION;
}

const CoverSegment: React.FC<{metodo?: string; titulo: string}> = ({metodo, titulo}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const badgeScale = popIn(frame, fps, 0);
  const titleWords = staggerWords(titulo, frame, fps, 8, {staggerFrames: 3, durationInFrames: 16, distance: 30});
  const hintAnim = slideFadeIn(frame, fps, 34, {distance: 16});
  // Rotacao continua do ciclo — gira devagar a peca inteira do cover, reforca
  // "isso e um processo que roda", nao um icone parado.
  const rotation = frame * 3.4;

  return (
    <AbsoluteFill style={{background: colors.black, padding: '160px 76px 0', display: 'flex', flexDirection: 'column'}}>
      <div style={{display: 'inline-block', alignSelf: 'flex-start', transform: `scale(${badgeScale})`}}>
        <Badge>{metodo ?? 'Metodologia'}</Badge>
      </div>
      <h1 style={{fontSize: 70, fontWeight: 700, color: colors.white, lineHeight: 1.08, letterSpacing: -1.5, margin: '34px 0 0'}}>
        {titleWords.map((w, i) => (
          <span key={i} style={{display: 'inline-block', opacity: w.opacity, transform: w.transform, marginRight: 18}}>
            {w.word}
          </span>
        ))}
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
const ProgressTracker: React.FC<{total: number; atual: number; frame: number; fps: number}> = ({total, atual, frame, fps}) => {
  const dotPop = popIn(frame, fps, 6);
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

const StepSegment: React.FC<{numero: number; total: number; titulo: string; descricao: string}> = ({
  numero,
  total,
  titulo,
  descricao,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const numberScale = popIn(frame, fps, 0);
  const titleWords = staggerWords(titulo, frame, fps, 10, {staggerFrames: 2, durationInFrames: 12, distance: 20});
  const descAnim = slideFadeIn(frame, fps, 20, {distance: 18});

  return (
    <AbsoluteFill style={{background: colors.white, padding: '0 76px'}}>
      <ProgressTracker total={total} atual={numero} frame={frame} fps={fps} />

      <div style={{position: 'absolute', top: 260, left: 76, right: 76}}>
        <div style={{display: 'flex', alignItems: 'flex-start', gap: 26}}>
          <span
            style={{
              fontSize: 128,
              fontWeight: 700,
              color: colors.black,
              lineHeight: 0.82,
              letterSpacing: -6,
              transform: `scale(${numberScale})`,
              transformOrigin: 'left top',
            }}
          >
            {String(numero).padStart(2, '0')}
          </span>
          <div style={{display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 14}}>
            <h2 style={{fontSize: 46, fontWeight: 700, color: colors.black, lineHeight: 1.14, margin: 0}}>
              {titleWords.map((w, i) => (
                <span key={i} style={{display: 'inline-block', opacity: w.opacity, transform: w.transform, marginRight: 12}}>
                  {w.word}
                </span>
              ))}
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

const CtaSegment: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const titleAnim = slideFadeIn(frame, fps, 0, {distance: 50, durationInFrames: 18});
  const ctaAnim = slideFadeIn(frame, fps, 8, {distance: 60, durationInFrames: 20});
  const badgeScale = popIn(frame, fps, 0);

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

export const MetodologiaReel: React.FC<MetodologiaReelData> = ({metodo, titulo, passos}) => {
  const total = passos.length;
  let cursor = COVER_DURATION;

  return (
    <Frame background={colors.black} wordmarkColor={colors.white}>
      <Sequence from={0} durationInFrames={COVER_DURATION}>
        <CoverSegment metodo={metodo} titulo={titulo} />
      </Sequence>

      {passos.map((passo, i) => {
        const from = cursor;
        cursor += stepDuration(i);
        return (
          <Sequence key={i} from={from} durationInFrames={stepDuration(i)}>
            <StepSegment numero={i + 1} total={total} titulo={passo.titulo} descricao={passo.descricao} />
          </Sequence>
        );
      })}

      <Sequence from={cursor} durationInFrames={CTA_DURATION}>
        <CtaSegment />
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
