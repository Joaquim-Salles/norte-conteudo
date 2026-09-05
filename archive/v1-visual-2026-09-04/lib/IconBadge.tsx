import React from 'react';
import {Img, staticFile} from 'remotion';

type IconBadgeProps = {
  /** Caminho em public/ pra um ícone REAL de produto Norte (ex: 'logos/estoque-icon.svg'). */
  src?: string;
  /** Glyph de fallback (ex: um Icon* de src/lib/icons.tsx) pra temas sem asset de app dedicado (marca/Avalia). */
  fallback?: React.ReactNode;
  size?: number;
  background?: string;
};

/**
 * Selo pequeno, quadrado, cantos arredondados, com o ícone de um produto —
 * "prova de contexto" (Round G, referência pesquisada de verdade: post nativo
 * real de @thaleslaray, `docs/referencias-visuais/thaleslaray-iceberg-meme.jpg`,
 * que usa selos assim com os ÍCONES OFICIAIS de ChatGPT/Claude). Pra Norte,
 * SEMPRE um ícone de produto PRÓPRIO (`public/logos/`), nunca logo de
 * terceiro — mesma linha vermelha já aplicada ao ícone do WhatsApp (ver
 * CATALOGO.md, achado #1). Usado por `analogiaReal` (`src/lib/visualStyles.ts`).
 */
export const IconBadge: React.FC<IconBadgeProps> = ({src, fallback, size = 68, background = '#ffffff'}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size * 0.22,
      background,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 6px 18px rgba(0,0,0,0.4)',
      overflow: 'hidden',
      flexShrink: 0,
    }}
  >
    {src ? (
      <Img src={staticFile(src)} style={{width: '72%', height: '72%', objectFit: 'contain'}} />
    ) : (
      fallback
    )}
  </div>
);
