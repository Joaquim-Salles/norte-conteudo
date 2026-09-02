import React from 'react';
import {AbsoluteFill} from 'remotion';
import {colors, fontFamily} from './tokens';
import {ensureBrandFontLoaded} from './fonts';
import {GrainOverlay} from './Texture';

ensureBrandFontLoaded();

type FrameProps = {
  children: React.ReactNode;
  background?: string;
  /** Mostra a marca-dagua discreta "Norte Para Negocios" no rodape. Default: true. */
  showWordmark?: boolean;
  wordmarkColor?: string;
  /** Grain sutil de superficie (ver lib/Texture.tsx). Default: true — desligar so em caso pontual. */
  texture?: boolean;
  /**
   * Opacidade do grain quando texture=true. Default 0.045 (era hardcoded
   * antes de 2026-09-01 — `theme.textureOpacity` existia mas nao era usado
   * em lugar nenhum). Passar `theme.textureOpacity` (opcionalmente
   * multiplicado pelo `visualStyle.texture.opacityMultiplier`, ver
   * src/lib/visualStyles.ts `resolveTexture`) pra fazer tema E estilo visual
   * afetarem a densidade do grain de verdade.
   */
  textureOpacity?: number;
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
  texture = true,
  textureOpacity = 0.045,
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
              fontWeight: 400,
              fontStyle: 'italic',
              letterSpacing: 0.8,
              color: wordmarkColor,
              opacity: 0.72,
            }}
          >
            Norte Para Negocios
          </span>
        </div>
      ) : null}
      {texture ? <GrainOverlay opacity={textureOpacity} /> : null}
    </AbsoluteFill>
  );
};
