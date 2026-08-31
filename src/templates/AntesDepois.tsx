import React from 'react';
import {Frame} from '../lib/Frame';
import {CtaBand} from '../lib/CtaBand';
import {colors} from '../lib/tokens';
import {GhostArrowUp} from '../lib/GhostGraphics';
import type {AntesDepoisData} from '../lib/types';

/**
 * Template 3 — Antes/Depois
 * Split horizontal 50/50: ANTES em tom apagado (problema), DEPOIS em cor viva
 * (transformacao) — a metrica de resultado vira o elemento de maior peso visual,
 * ancorando a prova concreta que sustenta o CTA.
 */
export const AntesDepois: React.FC<AntesDepoisData> = ({
  antesLabel = 'Antes',
  antesTexto,
  depoisLabel = 'Depois',
  depoisTexto,
  metrica,
}) => {
  return (
    <Frame background={colors.white} wordmarkColor={colors.white}>
      {/* ANTES — metade superior, tom apagado */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 520,
          background: '#dcdce6',
          padding: '80px 64px 0',
        }}
      >
        <span
          style={{
            fontSize: 24,
            fontWeight: 800,
            letterSpacing: 2,
            color: '#6c6c80',
            textTransform: 'uppercase',
          }}
        >
          {antesLabel}
        </span>
        <p
          style={{
            fontSize: 40,
            fontWeight: 600,
            color: '#54546a',
            lineHeight: 1.22,
            margin: '18px 0 0',
            maxWidth: 880,
          }}
        >
          {antesTexto}
        </p>
        <div style={{position: 'absolute', right: 10, bottom: 20}}>
          <GhostArrowUp color="#54546a" opacity={0.08} size={190} />
        </div>
      </div>

      {/* DEPOIS — metade inferior, cor viva */}
      <div
        style={{
          position: 'absolute',
          top: 520,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(150deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
          padding: '72px 64px 0',
        }}
      >
        <span
          style={{
            fontSize: 24,
            fontWeight: 800,
            letterSpacing: 2,
            color: colors.accent,
            textTransform: 'uppercase',
          }}
        >
          {depoisLabel}
        </span>
        <p
          style={{
            fontSize: 44,
            fontWeight: 700,
            color: colors.white,
            lineHeight: 1.2,
            margin: '18px 0 0',
            maxWidth: 880,
          }}
        >
          {depoisTexto}
        </p>
        {metrica ? (
          <div
            style={{
              marginTop: 28,
              display: 'inline-flex',
              alignItems: 'baseline',
              gap: 10,
              background: 'rgba(255,255,255,0.12)',
              borderRadius: 16,
              padding: '14px 24px',
            }}
          >
            <span style={{fontSize: 46, fontWeight: 800, color: colors.white}}>{metrica}</span>
          </div>
        ) : null}
        <div style={{position: 'absolute', right: 10, bottom: 250}}>
          <GhostArrowUp color={colors.white} opacity={0.09} size={220} />
        </div>
      </div>

      {/* Selo central marcando a virada */}
      <div
        style={{
          position: 'absolute',
          top: 520 - 44,
          left: '50%',
          transform: 'translateX(-50%)',
          background: colors.accent,
          color: colors.white,
          fontWeight: 800,
          fontSize: 22,
          padding: '12px 26px',
          borderRadius: 999,
          boxShadow: '0 12px 28px -8px rgba(0,0,0,0.4)',
        }}
      >
        Com a Norte
      </div>

      <div style={{position: 'absolute', left: 64, right: 64, bottom: 130}}>
        <CtaBand label="Quero isso" sub="fala com a gente no WhatsApp — link na bio" />
      </div>
    </Frame>
  );
};

export const antesDepoisDefaultProps: AntesDepoisData = {
  antesTexto: 'Inventário fechava sempre com divergência e ninguém sabia explicar o motivo.',
  depoisTexto: 'Inventário bate com o sistema todo mês, sem retrabalho.',
  metrica: '-92% divergência',
};
