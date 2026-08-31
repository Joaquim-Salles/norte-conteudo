import React from 'react';
import {Frame} from '../lib/Frame';
import {CtaBand} from '../lib/CtaBand';
import {colors} from '../lib/tokens';
import {GhostBars} from '../lib/GhostGraphics';
import type {MetodologiaSlide} from '../lib/types';

/**
 * Template 5 — Metodologia sem enrolacao
 * Carrossel tipo "passo a passo" (Lean/PDCA/BPM aplicados na pratica) — tom seco,
 * numerado, sem enfeite. Contraste tipografico monocromatico (preto/branco/accent)
 * reforca a personalidade "direto ao ponto" da marca.
 */
export const MetodologiaSemEnrolacao: React.FC<{slide: MetodologiaSlide}> = ({slide}) => {
  if (slide.kind === 'cover') {
    return (
      <Frame background={colors.black} wordmarkColor={colors.white}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            padding: '150px 72px 220px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}
        >
          {slide.metodo ? (
            <span
              style={{
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: 3,
                color: colors.accent,
                textTransform: 'uppercase',
              }}
            >
              {slide.metodo}
            </span>
          ) : null}
          <h1
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: colors.white,
              lineHeight: 1.05,
              letterSpacing: -1.5,
              margin: '20px 0 0',
            }}
          >
            {slide.titulo}
          </h1>
          <div style={{marginTop: 44, height: 6, width: 120, background: colors.accent}} />
          <div style={{position: 'absolute', right: -30, bottom: 240}}>
            <GhostBars color={colors.white} opacity={0.07} width={360} />
          </div>
        </div>
      </Frame>
    );
  }

  if (slide.kind === 'passo') {
    return (
      <Frame background={colors.white} wordmarkColor={colors.black}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            padding: '0 72px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div style={{display: 'flex', alignItems: 'flex-start', gap: 28}}>
            <span
              style={{
                fontSize: 140,
                fontWeight: 700,
                color: colors.black,
                lineHeight: 0.82,
                letterSpacing: -6,
              }}
            >
              {String(slide.numero).padStart(2, '0')}
            </span>
            <div style={{display: 'flex', flexDirection: 'column', gap: 14, paddingTop: 18}}>
              <h2
                style={{
                  fontSize: 42,
                  fontWeight: 700,
                  color: colors.black,
                  lineHeight: 1.12,
                  margin: 0,
                }}
              >
                {slide.titulo}
              </h2>
              <p style={{fontSize: 27, fontWeight: 400, color: '#43434f', lineHeight: 1.42, margin: 0}}>
                {slide.descricao}
              </p>
            </div>
          </div>
          <span
            style={{
              position: 'absolute',
              bottom: 220,
              left: 72,
              fontSize: 20,
              fontWeight: 700,
              color: '#a0a0ae',
              letterSpacing: 1,
            }}
          >
            PASSO {slide.numero} DE {slide.total}
          </span>
        </div>
      </Frame>
    );
  }

  // slide.kind === 'cta'
  return (
    <Frame background={colors.black} wordmarkColor={colors.white}>
      <div style={{position: 'absolute', right: -40, bottom: -30}}>
        <GhostBars color={colors.white} opacity={0.07} width={420} />
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          padding: '0 72px 220px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 48,
        }}
      >
        <h2
          style={{
            fontSize: 58,
            fontWeight: 700,
            color: colors.white,
            lineHeight: 1.1,
            letterSpacing: -1,
            margin: 0,
          }}
        >
          {slide.headline ?? 'Sem achismo. Sem enrolação. Bora aplicar isso aí.'}
        </h2>
        <CtaBand />
      </div>
    </Frame>
  );
};

export const metodologiaDefaultProps: {slide: MetodologiaSlide} = {
  slide: {kind: 'cover', titulo: 'PDCA aplicado ao seu estoque', metodo: 'Metodologia'},
};
