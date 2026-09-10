import React from 'react';

/**
 * A linha conectora que atravessa os slides de um carrossel — ver
 * exemplos-formatos-2026-09-04.md, carrossel "Campus Ambassador": a linha
 * "aparece cortada nas bordas como se continuasse fora do card".
 *
 * REDIRECIONAMENTO DO FUNDADOR (2026-09-05): nesta rodada a linha representa
 * um FLUXO SEQUENCIAL de etapas (entrada → conferência → armazenamento →
 * saída), não uma ramificação de problemas paralelos. Por isso o modo
 * "through" tem só 1 nó (a etapa atual), sem ramificação — e o traçado é
 * uma curva suave e contínua, não uma bifurcação.
 *
 * `mode`:
 * - 'start'  — capa: a linha nasce de um ponto (perto do título) e sai
 *              cortada pela borda direita/inferior, sugerindo continuação.
 * - 'through'— etapa: entra cortada pela borda esquerda, tem 1 nó marcando
 *              a etapa atual, sai cortada pela borda direita.
 * - 'end'    — fechamento: entra cortada pela esquerda e termina num nó
 *              preenchido (o fluxo se fecha, não continua).
 */
/**
 * Amostra uma senoide suave em N pontos e converte pra um path SVG usando
 * curvas quadráticas entre pontos médios — técnica que garante suavidade
 * SEM loops/cúspides (o bug do primeiro rascunho: comandos `C ... S ...`
 * manuais criavam um nó torto exatamente onde as duas curvas se encontravam,
 * porque as tangentes não coincidiam). Como a função é y(x) = seno, x é
 * sempre monotônico — geometricamente impossível formar laço.
 */
function waveY(x: number, amplitude: number, wavelength: number, phase: number): number {
  return amplitude * Math.sin((x / wavelength) * 2 * Math.PI + phase);
}

function buildWavePath(x0: number, x1: number, baseY: number, amplitude: number, samples = 24): string {
  const wavelength = (x1 - x0) * 0.9;
  const phase = 0;
  const points: Array<[number, number]> = [];
  for (let i = 0; i <= samples; i++) {
    const x = x0 + ((x1 - x0) * i) / samples;
    const y = baseY + waveY(x - x0, amplitude, wavelength, phase);
    points.push([x, y]);
  }

  let d = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const [cx, cy] = points[i];
    const [nx, ny] = points[i + 1];
    const midX = (cx + nx) / 2;
    const midY = (cy + ny) / 2;
    d += ` Q ${cx} ${cy}, ${midX} ${midY}`;
  }
  const last = points[points.length - 1];
  d += ` L ${last[0]} ${last[1]}`;
  return d;
}

export const ConnectorLine: React.FC<{
  mode: 'start' | 'through' | 'end';
  color: string;
  /** Altura da linha no canvas 1080x1350, em px. */
  y?: number;
  /** Fração horizontal (0–1) do nó, quando aplicável. */
  nodePosition?: number;
  strokeWidth?: number;
}> = ({mode, color, y = 1120, nodePosition = 0.5, strokeWidth = 7}) => {
  const width = 1080;
  const height = 1350;
  const waveAmplitude = 26;

  let path = '';
  let nodeX: number | null = null;
  let nodeY: number | null = null;

  if (mode === 'start') {
    // Nasce perto do centro-esquerda (abaixo do título) e sai cortada embaixo à direita.
    const startX = width * 0.14;
    const endX = width + 40; // corta na borda direita
    path = buildWavePath(startX, endX, y, waveAmplitude, 20);
    nodeX = startX;
    nodeY = y;
  } else if (mode === 'through') {
    const startX = -40; // corta na borda esquerda
    const endX = width + 40; // corta na borda direita
    path = buildWavePath(startX, endX, y, waveAmplitude, 32);
    nodeX = startX + (endX - startX) * nodePosition;
    const wavelength = (endX - startX) * 0.9;
    nodeY = y + waveY(nodeX - startX, waveAmplitude, wavelength, 0);
  } else {
    const startX = -40; // corta na borda esquerda
    const endX = width * 0.62;
    path = buildWavePath(startX, endX, y, waveAmplitude, 20);
    nodeX = endX;
    const wavelength = (endX - startX) * 0.9;
    nodeY = y + waveY(endX - startX, waveAmplitude, wavelength, 0);
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{position: 'absolute', top: 0, left: 0, pointerEvents: 'none'}}
    >
      <path d={path} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      {nodeX !== null && nodeY !== null ? (
        <circle cx={nodeX} cy={nodeY} r={strokeWidth * 2.1} fill={color} />
      ) : null}
    </svg>
  );
};
