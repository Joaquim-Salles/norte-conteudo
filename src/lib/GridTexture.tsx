import React from 'react';

/**
 * Textura de fundo — "gradezinha" pedida pelo fundador (transcrição de voz,
 * 2026-09-05): grade fina tipo caderno/papel milimetrado, bem sutil, atrás do
 * conteúdo. Referência: screenshots do carrossel "Campus Ambassador" real
 * (docs/referencias-visuais/claude-instagram/exemplos-formatos-2026-09-04.md)
 * têm um fundo assim atrás dos post-its.
 *
 * Isto é uma EXCEÇÃO deliberada à regra `texture_usage` do design-dna.json
 * ("nenhuma textura decorativa artificial") — pedido explícito e direto do
 * fundador tem prioridade sobre a heurística geral. Opacidade mantida bem
 * baixa (5-8%) pra não virar elemento gráfico competindo com o texto.
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
