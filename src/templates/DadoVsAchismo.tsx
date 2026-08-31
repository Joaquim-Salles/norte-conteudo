import React from 'react';
import {Frame} from '../lib/Frame';
import {CtaBand} from '../lib/CtaBand';
import {colors} from '../lib/tokens';
import {GhostBars, GhostQuote} from '../lib/GhostGraphics';
import type {DadoVsAchismoData} from '../lib/types';

/**
 * Template 1 — Dado vs. Achismo
 * Bordao central da marca ("nao trabalhamos com achismos") virou o proprio
 * mecanismo visual: split assimetrico, achismo apagado/riscado em cima,
 * dado vivo e grande embaixo. CTA aponta a decisao certa pro WhatsApp.
 */
export const DadoVsAchismo: React.FC<DadoVsAchismoData> = ({achismo, dado, fonteDado}) => {
  return (
    <Frame background={colors.white} wordmarkColor={colors.white}>
      {/* Bloco ACHISMO — comprimido, cinza, riscado: visualmente "errado" */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 420,
          background: '#e7e7ee',
          padding: '64px 64px 0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 2,
            color: '#8a8a99',
            textTransform: 'uppercase',
          }}
        >
          Achismo
        </span>
        <p
          style={{
            fontSize: 44,
            fontWeight: 600,
            color: '#9a9aab',
            lineHeight: 1.18,
            margin: '14px 0 0',
            textDecoration: 'line-through',
            textDecorationColor: '#b4b4c4',
            textDecorationThickness: 3,
          }}
        >
          {achismo}
        </p>
        <div style={{position: 'absolute', right: 24, top: 30}}>
          <GhostQuote color="#54546a" opacity={0.1} size={150} />
        </div>
      </div>

      {/* Bloco DADO — dominante, cor primaria, tipografia grande */}
      <div
        style={{
          position: 'absolute',
          top: 420,
          left: 0,
          right: 0,
          bottom: 0,
          background: colors.primaryDark,
          padding: '56px 64px 200px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
      >
        <span
          style={{
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: 2,
            color: colors.accent,
            textTransform: 'uppercase',
          }}
        >
          Dado
        </span>
        <p
          style={{
            fontSize: 68,
            fontWeight: 800,
            color: colors.white,
            lineHeight: 1.08,
            margin: '18px 0 0',
            letterSpacing: -1,
          }}
        >
          {dado}
        </p>
        {fonteDado ? (
          <span style={{fontSize: 18, color: 'rgba(255,255,255,0.55)', marginTop: 20}}>
            Fonte: {fonteDado}
          </span>
        ) : null}
        <div style={{position: 'absolute', right: 20, bottom: 210}}>
          <GhostBars color={colors.white} opacity={0.06} width={300} />
        </div>
      </div>

      {/* Divisor diagonal entre os dois blocos, reforca a "virada" achismo -> dado */}
      <div
        style={{
          position: 'absolute',
          top: 396,
          left: 0,
          right: 0,
          height: 48,
          background: colors.accent,
          transform: 'skewY(-2.2deg)',
          transformOrigin: 'left',
        }}
      />

      <div style={{position: 'absolute', left: 64, right: 64, bottom: 130}}>
        <CtaBand label="Chama no WhatsApp" sub="decisao com dado, nao achismo — link na bio" />
      </div>
    </Frame>
  );
};

export const dadoVsAchismoDefaultProps: DadoVsAchismoData = {
  achismo: '"Acho que meu estoque tá mais ou menos certo."',
  dado: '38% das PMEs perdem margem por ruptura ou excesso de estoque não detectado.',
  fonteDado: 'Norte Para Negócios, diagnóstico operacional',
};
