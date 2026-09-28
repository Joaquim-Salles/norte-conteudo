import React from 'react';

/**
 * Textura de grade discreta para superfícies claras, conforme o kit Norte e a
 * referência aprovada do carrossel animado. Deve apoiar a leitura, nunca virar
 * protagonista nem simular papel de caderno/post-it. Opacidade baixa por padrão.
 */
export const GridTexture: React.FC<{
  color: string;
  opacity?: number;
  size?: number;
  id: string;
}> = ({color, opacity = 0.07, size = 54, id}) => (
  <svg
    width="100%"
    height="100%"
    style={{position: 'absolute', inset: 0}}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern id={id} width={size} height={size} patternUnits="userSpaceOnUse">
        <path
          d={`M ${size} 0 L 0 0 0 ${size}`}
          fill="none"
          stroke={color}
          strokeWidth={1}
          opacity={opacity}
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill={`url(#${id})`} />
  </svg>
);
