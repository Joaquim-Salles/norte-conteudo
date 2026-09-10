import React from 'react';

/**
 * Ícone-objeto geométrico simples — traço grosso monocromático, 1-3 formas,
 * sem sketch trêmulo (ver design_system.iconography do design-dna.json:
 * "traço grosso constante ~8-12px em escala 1080px"). Candidato B pra
 * preencher o vazio superior dos slides de etapa (fundador, 2026-09-05),
 * testado ao lado do candidato A (StatusChip). Ver CATALOGO.md.
 */
const STROKE = 9;

export const BoxInIcon: React.FC<{color: string; size?: number}> = ({color, size = 132}) => (
  <svg width={size} height={size} viewBox="0 0 132 132" fill="none">
    <rect x="30" y="46" width="72" height="60" rx="4" stroke={color} strokeWidth={STROKE} />
    <path d="M66 6 L66 46" stroke={color} strokeWidth={STROKE} strokeLinecap="round" />
    <path
      d="M46 26 L66 46 L86 26"
      stroke={color}
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export const CheckCircleIcon: React.FC<{color: string; size?: number}> = ({color, size = 132}) => (
  <svg width={size} height={size} viewBox="0 0 132 132" fill="none">
    <circle cx="66" cy="66" r="56" stroke={color} strokeWidth={STROKE} />
    <path
      d="M42 68 L58 84 L92 46"
      stroke={color}
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export const BoxOutIcon: React.FC<{color: string; size?: number}> = ({color, size = 132}) => (
  <svg width={size} height={size} viewBox="0 0 132 132" fill="none">
    <rect x="30" y="26" width="72" height="60" rx="4" stroke={color} strokeWidth={STROKE} />
    <path d="M66 86 L66 126" stroke={color} strokeWidth={STROKE} strokeLinecap="round" />
    <path
      d="M46 106 L66 126 L86 106"
      stroke={color}
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);
