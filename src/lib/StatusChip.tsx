import React from 'react';
import {FONT_SANS} from './fonts';

/**
 * Pílula + ponto + verbo no gerúndio ("Registrando...", "Conferindo...",
 * "Saindo..."). Candidato A pra preencher o vazio superior dos slides de
 * etapa (feedback do fundador, 2026-09-05) — testado ao lado do candidato B
 * (ícone geométrico, ver GeometricIcon.tsx). Ver CATALOGO.md pra comparação.
 */
export const StatusChip: React.FC<{
  label: string;
  background: string;
  color: string;
}> = ({label, background, color}) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12,
      padding: '14px 26px',
      borderRadius: 999,
      background,
      width: 'fit-content',
    }}
  >
    <span
      style={{
        width: 10,
        height: 10,
        borderRadius: '50%',
        background: color,
        flexShrink: 0,
      }}
    />
    <span
      style={{
        fontFamily: FONT_SANS,
        fontWeight: 700,
        fontSize: 20,
        letterSpacing: '0.01em',
        color,
      }}
    >
      {label}
    </span>
  </div>
);
