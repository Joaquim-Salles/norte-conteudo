import React from 'react';

/**
 * Diagrama geométrico de nós conectados — rodada 4 (2026-09-05), resposta ao
 * diagnóstico "sem graça": em vez do ícone pequeno solto no topo (rodada 2/3),
 * a Etapa 2 (Conferência) ganha um layout PRÓPRIO, centrado num diagrama
 * grande — um formato do repertório documentado (ver
 * exemplos-formatos-2026-09-04.md) que nenhum outro slide do carrossel usa.
 *
 * 4 nós ligados por um traço contínuo, representando os 4 microsteps do
 * processo de conferência (chegada → contagem → registro → prateleira).
 * Mesmo traço grosso monocromático do GeometricIcon (consistência de
 * linguagem visual), mas em escala de protagonista (~760px), não decoração.
 */
const STROKE = 8;

export const GeometricDiagram: React.FC<{color: string; width?: number}> = ({color, width = 760}) => {
  const height = width * 0.34;
  const nodes: Array<[number, number]> = [
    [width * 0.06, height * 0.5],
    [width * 0.36, height * 0.18],
    [width * 0.66, height * 0.82],
    [width * 0.94, height * 0.5],
  ];
  const path = nodes.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x} ${y}`).join(' ');
  const nodeRadius = width * 0.024;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
      <path d={path} stroke={color} strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round" opacity={0.9} />
      {nodes.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={nodeRadius}
          fill={i === nodes.length - 1 ? color : 'transparent'}
          stroke={color}
          strokeWidth={STROKE}
        />
      ))}
    </svg>
  );
};
