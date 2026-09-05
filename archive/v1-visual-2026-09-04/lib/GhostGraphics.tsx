import React from 'react';

/**
 * Elementos graficos "fantasma" (baixa opacidade) pra preencher espaco morto
 * nos templates com significado, nao decoracao vazia — ex: barras ascendentes
 * atras de um DADO, aspas atras de um ACHISMO. Tudo SVG inline, sem asset externo.
 */

export const GhostBars: React.FC<{color?: string; opacity?: number; width?: number}> = ({
  color = '#ffffff',
  opacity = 0.08,
  width = 420,
}) => (
  <svg width={width} height={width * 0.62} viewBox="0 0 420 260" fill="none" style={{opacity}}>
    <rect x="0" y="170" width="60" height="90" rx="10" fill={color} />
    <rect x="90" y="120" width="60" height="140" rx="10" fill={color} />
    <rect x="180" y="70" width="60" height="190" rx="10" fill={color} />
    <rect x="270" y="30" width="60" height="230" rx="10" fill={color} />
    <rect x="360" y="0" width="60" height="260" rx="10" fill={color} />
    <path
      d="M20 190 L120 140 L210 90 L300 50 L390 15"
      stroke={color}
      strokeWidth={6}
      strokeLinecap="round"
      fill="none"
      opacity={0.9}
    />
  </svg>
);

export const GhostQuote: React.FC<{color?: string; opacity?: number; size?: number}> = ({
  color = '#000000',
  opacity = 0.06,
  size = 320,
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" style={{opacity}}>
    <path
      d="M20 30c-8 6-12 14-12 24 0 12 8 20 18 20 9 0 16-7 16-16 0-8-6-14-13-14-1 0-2 0-3 .3C27 36 34 28 44 22l-6-10C29 17 24 22 20 30zM62 30c-8 6-12 14-12 24 0 12 8 20 18 20 9 0 16-7 16-16 0-8-6-14-13-14-1 0-2 0-3 .3C69 36 76 28 86 22l-6-10c-8.4 4.7-13.4 9.7-18 18z"
      fill={color}
    />
  </svg>
);

export const GhostCheck: React.FC<{color?: string; opacity?: number; size?: number}> = ({
  color = '#ffffff',
  opacity = 0.07,
  size = 360,
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" style={{opacity}}>
    <circle cx="50" cy="50" r="46" stroke={color} strokeWidth={5} fill="none" />
    <path
      d="M30 52l14 14 26-30"
      stroke={color}
      strokeWidth={7}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export const GhostArrowUp: React.FC<{color?: string; opacity?: number; size?: number}> = ({
  color = '#ffffff',
  opacity = 0.08,
  size = 340,
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" style={{opacity}}>
    <path
      d="M15 78 L40 50 L58 65 L88 25"
      stroke={color}
      strokeWidth={7}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path d="M66 22 L90 24 L88 48" stroke={color} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

/**
 * Loop de melhoria continua — seta circular unica (estilo "refresh"), desenhada
 * pra ficar legivel mesmo pequena (selo/badge de ~34-40px). Usada no Metodologia
 * sem Enrolacao pra reforcar o tema PDCA/Lean (ciclo que se repete).
 */
export const GhostCycle: React.FC<{color?: string; opacity?: number; size?: number}> = ({
  color = '#ffffff',
  opacity = 0.08,
  size = 340,
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" style={{opacity}}>
    <path
      d="M84 50a34 34 0 1 1 -10-24.3"
      stroke={color}
      strokeWidth={9}
      strokeLinecap="round"
      fill="none"
    />
    <path d="M85 8l1 20-20-3z" fill={color} />
  </svg>
);

/**
 * Marcador (highlighter) — tarja retangular levemente rotacionada, cor cheia
 * (não baixa opacidade como os outros Ghost*, esse é o ponto: precisa ler
 * como "caneta grifando", não como textura de fundo). Symbol novo do preset
 * `marcador` (Round F, referência externa pesquisada: energia de carrossel
 * de criador/educador — hook curto com frase-chave grifada). Posicionado
 * manualmente pelo template, atrás do texto/card que quer destacar — mesma
 * convenção dos outros Ghost* (decoração posicionada por quem usa, não
 * auto-calculada).
 */
export const GhostMarker: React.FC<{
  color?: string;
  opacity?: number;
  width?: number;
  height?: number;
  rotate?: number;
}> = ({color = '#f43f5e', opacity = 0.55, width = 560, height = 52, rotate = -1.6}) => (
  <div
    style={{
      width,
      height,
      background: color,
      opacity,
      borderRadius: 6,
      transform: `rotate(${rotate}deg)`,
    }}
  />
);

/**
 * Slash único, contido — symbol novo do preset `papelQuente` (Round F,
 * referência externa pesquisada: linguagem visual pública da Anthropic/Claude,
 * NÃO o logotipo — aqui é só um traço diagonal genérico, mesmo princípio
 * geométrico que qualquer marca tipográfica usa pra "corte"/progresso, sem
 * reproduzir a marca de terceiro). Deliberadamente único e discreto — o
 * oposto do `GhostMarker`: reforça calma, não grito.
 */
export const GhostSlash: React.FC<{color?: string; opacity?: number; size?: number}> = ({
  color = '#141413',
  opacity = 0.1,
  size = 260,
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" style={{opacity}}>
    <line x1="72" y1="4" x2="26" y2="96" stroke={color} strokeWidth={6} strokeLinecap="round" />
  </svg>
);
