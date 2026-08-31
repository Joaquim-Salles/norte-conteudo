import React from 'react';

/** Icone de WhatsApp desenhado em SVG puro — sem dependencia externa, sem CDN. */
export const WhatsAppIcon: React.FC<{size?: number; color?: string}> = ({
  size = 40,
  color = '#ffffff',
}) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16.02 3C9.4 3 4 8.4 4 15.02c0 2.22.6 4.3 1.65 6.1L4 29l8.06-1.6a12.9 12.9 0 0 0 3.96.63C22.6 28.03 28 22.63 28 16.02 28 9.4 22.64 3 16.02 3Z"
      fill={color}
      fillOpacity={0.14}
    />
    <path
      d="M16 4.6C9.7 4.6 4.6 9.7 4.6 16c0 2.1.57 4.1 1.65 5.86L4.9 27l5.3-1.32A11.35 11.35 0 0 0 16 27.4c6.3 0 11.4-5.1 11.4-11.4S22.3 4.6 16 4.6Z"
      stroke={color}
      strokeWidth={1.4}
      fill="none"
    />
    <path
      d="M11.6 10.4c.28-.02.55-.02.79.01.28.03.6-.02.9.66.32.72 1.08 2.5 1.18 2.68.1.18.16.4.03.65-.13.24-.2.4-.4.6-.2.22-.4.48-.58.65-.2.18-.4.38-.18.76.23.38 1.02 1.7 2.2 2.76 1.5 1.35 2.78 1.78 3.16 1.98.38.2.6.17.82-.1.22-.28.94-1.1 1.2-1.48.25-.37.5-.3.83-.18.34.12 2.15 1.02 2.52 1.2.37.18.62.28.7.44.1.16.1.94-.22 1.85-.32.9-1.87 1.76-2.57 1.86-.7.1-1.28.42-4.3-.9C14.6 22 12 19.35 10.8 17.4c-.98-1.58-1.02-2.83-.94-3.2.08-.38.5-1.9 1.74-4.2Z"
      fill={color}
    />
  </svg>
);

/** Seta simples de CTA — reforca direcao pro link/DM, sem depender de icon set. */
export const ArrowRight: React.FC<{size?: number; color?: string}> = ({
  size = 28,
  color = '#ffffff',
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M4 12h15M13 6l6 6-6 6"
      stroke={color}
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
