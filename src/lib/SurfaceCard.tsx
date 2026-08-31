import React from 'react';

type SurfaceCardProps = {
  children: React.ReactNode;
  shellColor?: string;
  coreColor?: string;
  padding?: number;
  radius?: number;
};

/**
 * "Double-bezel": casca externa sutil + nucleo interno com highlight —
 * substitui caixas flat (bg solido + border reto) por uma superficie com
 * profundidade, tipo peca fisica encaixada numa moldura. Usado nos cards
 * de feature/passo/roadmap das variacoes "mais bonitas" pedidas pelo fundador.
 */
export const SurfaceCard: React.FC<SurfaceCardProps> = ({
  children,
  shellColor = 'rgba(255,255,255,0.05)',
  coreColor = 'rgba(255,255,255,0.09)',
  padding = 7,
  radius = 26,
}) => (
  <div
    style={{
      background: shellColor,
      borderRadius: radius,
      padding,
      border: '1px solid rgba(255,255,255,0.08)',
      boxShadow: '0 14px 30px -16px rgba(0,0,0,0.5)',
    }}
  >
    <div
      style={{
        background: coreColor,
        borderRadius: Math.max(radius - padding, 8),
        boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.16)',
      }}
    >
      {children}
    </div>
  </div>
);
