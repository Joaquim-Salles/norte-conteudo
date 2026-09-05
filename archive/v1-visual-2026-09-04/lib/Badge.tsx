import React from 'react';
import {colors} from './tokens';

type BadgeProps = {
  children: React.ReactNode;
  tone?: 'accent' | 'white' | 'dark';
};

/**
 * Eyebrow tag em pilula — rotulo de topo (metodo, categoria, tag numerica) com
 * peso visual de verdade (fundo solido + sombra), nao so texto solto colorido.
 * Usado pra dar consistencia de "badge" entre os 5 tipos de post.
 */
export const Badge: React.FC<BadgeProps> = ({children, tone = 'accent'}) => {
  const bg =
    tone === 'accent' ? colors.accent : tone === 'white' ? 'rgba(255,255,255,0.16)' : colors.primaryDark;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignSelf: 'flex-start',
        background: bg,
        color: colors.white,
        fontSize: 22,
        fontWeight: 700,
        letterSpacing: 2,
        textTransform: 'uppercase',
        padding: '10px 22px',
        borderRadius: 999,
        boxShadow: '0 10px 24px -10px rgba(0,0,0,0.45)',
      }}
    >
      {children}
    </span>
  );
};
