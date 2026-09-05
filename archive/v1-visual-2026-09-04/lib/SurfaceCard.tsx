import React from 'react';
import type {CardStyle} from './themes';

type SurfaceCardProps = {
  children: React.ReactNode;
  shellColor?: string;
  coreColor?: string;
  padding?: number;
  radius?: number;
  /**
   * 'bezel' (default) = casca+nucleo com profundidade fisica.
   * 'flat' = caixa reta de traco unico, sem camada dupla — usado pelo tema de
   * produto que pede visual mais direto/"software" (ver `theme.cardStyle`).
   * 'outline' = borda fina unica, fundo transparente, sem sombra nem
   * preenchimento — usado pelo visualStyle corporateClean (ver visualStyles.ts).
   */
  variant?: CardStyle;
  /**
   * Usado so no variant 'outline' — cor da borda fina. shellColor/coreColor
   * nao fazem sentido pra outline (nao ha preenchimento). Escolher conforme o
   * fundo por tras do card: tom escuro translucido sobre fundo claro, tom
   * branco translucido sobre fundo escuro/tema.
   */
  borderColor?: string;
};

/**
 * "Double-bezel": casca externa sutil + nucleo interno com highlight —
 * substitui caixas flat (bg solido + border reto) por uma superficie com
 * profundidade, tipo peca fisica encaixada numa moldura. Usado nos cards
 * de feature/passo/roadmap das variacoes "mais bonitas" pedidas pelo fundador.
 * Recebe `variant` do tema ativo (ver src/lib/themes.ts) — nao e escolha manual
 * por template, e propriedade do tema (ex: tema Vendas usa 'flat').
 */
export const SurfaceCard: React.FC<SurfaceCardProps> = ({
  children,
  shellColor = 'rgba(255,255,255,0.05)',
  coreColor = 'rgba(255,255,255,0.09)',
  padding = 7,
  radius = 26,
  variant = 'bezel',
  borderColor,
}) => {
  if (variant === 'outline') {
    return (
      <div
        style={{
          background: 'transparent',
          borderRadius: Math.max(radius - padding, 8),
          border: `1.5px solid ${borderColor ?? 'rgba(255,255,255,0.35)'}`,
          // REFINAMENTO DE CRAFT (2026-09-04): 'outline' e 'flat' nao tinham
          // NENHUMA sombra — border de 1-1.5px sozinha, numa peca vista em
          // miniatura de feed (thumbnail), quase some contra fundos de tom
          // parecido, e o card lê como caixa "sem estilizar" (placeholder),
          // nao como restrição deliberada. Elevação premium/flat de verdade
          // (ver skill high-end-visual-design: "double-bezel"/soft ambient
          // shadow mesmo em superfícies flat) usa uma sombra quase
          // imperceptível — aqui um sopro (`boxShadow` bem mais suave que o
          // da variant 'bezel', 14px/-16 offset lá vs. 20px/-18 aqui com
          // opacidade quase metade) só pra descolar o card do fundo sem
          // reintroduzir a profundidade física que 'outline'/'flat' existem
          // pra evitar.
          boxShadow: '0 10px 24px -18px rgba(0,0,0,0.4)',
        }}
      >
        {children}
      </div>
    );
  }

  if (variant === 'flat') {
    return (
      <div
        style={{
          background: coreColor,
          borderRadius: Math.max(radius - padding, 8),
          border: '1px solid rgba(255,255,255,0.16)',
          boxShadow: '0 10px 24px -18px rgba(0,0,0,0.4)',
        }}
      >
        {children}
      </div>
    );
  }

  return (
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
};
