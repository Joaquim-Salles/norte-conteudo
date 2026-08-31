import React from 'react';
import {AbsoluteFill} from 'remotion';
import {colors, fontFamily} from './tokens';
import {ensureBrandFontLoaded} from './fonts';

ensureBrandFontLoaded();

type FrameProps = {
  children: React.ReactNode;
  background?: string;
  /** Mostra a marca-dagua discreta "Norte Para Negocios" no rodape. Default: true. */
  showWordmark?: boolean;
  wordmarkColor?: string;
};

/**
 * Canvas base 1080x1350 (post/carrossel 4:5) compartilhado por todos os templates.
 * Garante consistencia de fonte, margem de seguranca e assinatura de marca —
 * nenhum template deve montar seu proprio AbsoluteFill do zero.
 */
export const Frame: React.FC<FrameProps> = ({
  children,
  background = colors.white,
  showWordmark = true,
  wordmarkColor = colors.black,
}) => {
  return (
    <AbsoluteFill
      style={{
        background,
        fontFamily: `'${fontFamily.brand}', ${fontFamily.fallback}`,
      }}
    >
      {children}
      {showWordmark ? (
        <div
          style={{
            position: 'absolute',
            bottom: 56,
            left: 64,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 2,
              background: colors.accent,
              transform: 'rotate(45deg)',
            }}
          />
          <span
            style={{
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: 0.5,
              color: wordmarkColor,
              opacity: 0.72,
            }}
          >
            Norte Para Negocios
          </span>
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
