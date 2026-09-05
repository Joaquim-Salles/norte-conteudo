import React from 'react';

/**
 * Grain sutil via SVG feTurbulence — da profundidade fisica de superficie
 * (papel/textura) sem introduzir nenhuma cor fora dos tokens de marca:
 * roda em mix-blend-mode 'overlay' com opacidade baixa, entao so modula o
 * que ja esta la embaixo. Full-bleed, pointer-events: none, sem asset externo.
 */
export const GrainOverlay: React.FC<{opacity?: number}> = ({opacity = 0.05}) => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      opacity,
      mixBlendMode: 'overlay',
      pointerEvents: 'none',
      backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      backgroundSize: '200px 200px',
    }}
  />
);
