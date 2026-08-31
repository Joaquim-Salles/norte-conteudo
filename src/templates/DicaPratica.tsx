import React from 'react';
import {Frame} from '../lib/Frame';
import {CtaBand} from '../lib/CtaBand';
import {colors} from '../lib/tokens';
import {GhostCheck} from '../lib/GhostGraphics';
import type {DicaPraticaSlide} from '../lib/types';

/**
 * Template 2 — Dica pratica / carrossel, estrutura Cover/Bridge/CTA.
 * Cada slide tem papel funcional (nao e so "slide bonito"):
 *  - cover: prende o swipe, promete algo concreto e contavel (numero de itens)
 *  - bridge: 1 ideia por slide, numerada, nunca mais de ~2 frases (retencao)
 *  - cta: slide dedicado, 100% focado em levar pro WhatsApp — nao divide atencao
 */
export const DicaPratica: React.FC<{slide: DicaPraticaSlide}> = ({slide}) => {
  if (slide.kind === 'cover') {
    return (
      <Frame background={colors.primary} wordmarkColor={colors.white}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            padding: '140px 72px 220px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}
        >
          {slide.tagNumero ? (
            <div
              style={{
                alignSelf: 'flex-start',
                background: colors.accent,
                color: colors.white,
                fontSize: 26,
                fontWeight: 700,
                padding: '10px 22px',
                borderRadius: 999,
                marginBottom: 32,
              }}
            >
              {slide.tagNumero}
            </div>
          ) : null}
          <h1
            style={{
              fontSize: 76,
              fontWeight: 700,
              color: colors.white,
              lineHeight: 1.04,
              letterSpacing: -1.5,
              margin: 0,
            }}
          >
            {slide.titulo}
          </h1>
          <span
            style={{
              marginTop: 40,
              fontSize: 24,
              fontWeight: 400,
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.75)',
            }}
          >
            Arrasta pro lado →
          </span>
          <div style={{position: 'absolute', right: -40, bottom: 260}}>
            <GhostCheck color={colors.white} opacity={0.09} size={380} />
          </div>
        </div>
      </Frame>
    );
  }

  if (slide.kind === 'bridge') {
    return (
      <Frame background={colors.white} wordmarkColor={colors.black}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            padding: '0 72px 220px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 28,
          }}
        >
          <div style={{display: 'flex', alignItems: 'baseline', gap: 14}}>
            <span style={{fontSize: 120, fontWeight: 700, color: colors.accent, letterSpacing: -4}}>
              {String(slide.numero).padStart(2, '0')}
            </span>
            <span style={{fontSize: 28, fontWeight: 400, color: '#9a9aab'}}>/ {slide.total}</span>
          </div>
          <div style={{height: 5, width: 90, background: colors.primaryDark, opacity: 0.15}} />
          <h2
            style={{
              fontSize: 58,
              fontWeight: 700,
              color: colors.primaryDark,
              lineHeight: 1.1,
              letterSpacing: -1,
              margin: 0,
            }}
          >
            {slide.titulo}
          </h2>
          <p style={{fontSize: 34, fontWeight: 400, color: '#3c3c46', lineHeight: 1.45, margin: 0}}>
            {slide.corpo}
          </p>
        </div>
      </Frame>
    );
  }

  // slide.kind === 'cta'
  return (
    <Frame background={colors.primaryDark} wordmarkColor={colors.white}>
      <div style={{position: 'absolute', right: -60, bottom: -40}}>
        <GhostCheck color={colors.white} opacity={0.06} size={420} />
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
            fontSize: 60,
            fontWeight: 700,
            color: colors.white,
            lineHeight: 1.1,
            letterSpacing: -1,
            margin: 0,
          }}
        >
          {slide.headline ?? 'Quer isso rodando na sua operação?'}
        </h2>
        <CtaBand />
      </div>
    </Frame>
  );
};

export const dicaPraticaDefaultProps: {slide: DicaPraticaSlide} = {
  slide: {kind: 'cover', titulo: '3 erros que travam seu estoque', tagNumero: '3 ERROS'},
};
