import React from 'react';
import {FONT_SANS} from './fonts';

/**
 * Gráfico pequeno qualitativo — pro recheio de card do tipo "DADO/número"
 * (pedido do fundador via coordenador, 2026-09-05: "se a trilha é sobre um
 * dado/número, use um gráfico pequeno, sem decoração").
 *
 * IMPORTANTE — decisão deliberada de NÃO rotular barras com número/percentual
 * específico: o precedente já registrado em CATALOGO.md (rodada 4) é "não
 * inventar métrica fictícia sem dado real do fundador". Este componente é
 * ILUSTRATIVO/DIRECIONAL (2 barras de tamanhos diferentes, sem valor exato),
 * não uma alegação factual de "X% mais rápido" — honesto sobre o que é.
 * Se um dado real existir no futuro (medição real do fundador), trocar os
 * labels e a proporção das barras por valores reais é 1 edição direta aqui.
 */
export const MiniBarCompare: React.FC<{
  color: string;
  labelTop: string;
  labelBottom: string;
  width?: number;
}> = ({color, labelTop, labelBottom, width = 260}) => {
  const barHeight = 26;
  const gap = 18;
  const trackWidth = width;

  const Row: React.FC<{label: string; fraction: number; muted?: boolean}> = ({label, fraction, muted}) => (
    <div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
      <div
        style={{
          fontFamily: FONT_SANS,
          fontWeight: 700,
          fontSize: 12,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color,
          opacity: muted ? 0.55 : 0.95,
        }}
      >
        {label}
      </div>
      <div style={{width: trackWidth, height: barHeight, background: 'rgba(0,0,0,0.08)', borderRadius: 4}}>
        <div
          style={{
            width: trackWidth * fraction,
            height: barHeight,
            background: color,
            opacity: muted ? 0.4 : 1,
            borderRadius: 4,
          }}
        />
      </div>
    </div>
  );

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap}}>
      <Row label={labelTop} fraction={0.92} />
      <Row label={labelBottom} fraction={0.28} muted />
    </div>
  );
};
