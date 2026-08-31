/**
 * Tokens de marca — Norte Para Negocios
 * Fonte: .claude/brand/design-tokens.md (extraidos do CSS de producao do site, 2026-08-30)
 * NUNCA hardcodar cor solta num template — importar sempre daqui.
 *
 * ATUALIZADO 2026-08-31: as cores por produto agora vem de `colorGuide.ts`
 * (fonte de verdade, confirmada nos repos reais de cada sistema — ver esse
 * arquivo para rastreabilidade). `colors.product` continua existindo aqui só
 * por compatibilidade; nenhum valor e mais hardcoded duas vezes.
 */
import {brandPalette, systemColors} from './colorGuide';

export const colors = {
  // Marca
  primary: brandPalette.primary,
  primaryLight: brandPalette.primaryLight,
  primaryDark: brandPalette.primaryDark,
  accent: brandPalette.accent,
  accentHover: brandPalette.accentHover,
  black: brandPalette.black,
  white: brandPalette.white,

  // Por produto (usado em Vitrine de Produto) — ver src/lib/colorGuide.ts e themes.ts
  product: {
    ntbEstoque: systemColors.ntbEstoque,
    ntbVendas: systemColors.ntbVendas,
    norteAvalia: systemColors.norteAvalia,
  },
} as const;

export const fontFamily = {
  brand: 'Atkinson Hyperlegible', // familia classica, pesos 400/700 (ver src/lib/fonts.ts)
  fallback: 'ui-sans-serif, system-ui, sans-serif',
} as const;

/**
 * A fonte real (Atkinson Hyperlegible classica) so tem 400 e 700, normal e italico.
 * Nao existe peso intermediario — para enfase, usar fontStyle: 'italic', tamanho,
 * cor ou letter-spacing, nunca um fontWeight fora desses dois valores.
 */
export const fontWeight = {
  regular: 400,
  bold: 700,
} as const;

export const brand = {
  name: 'Norte Para Negocios',
  tagline: 'Nao trabalhamos com achismos.',
} as const;

/** CTA de lead — nucleo de toda peca (nao usar CTA generico de engajamento). */
export const cta = {
  whatsapp: 'Chama no WhatsApp — link na bio',
  bioLink: 'Link na bio',
  short: 'Fala com a gente',
} as const;

export const formats = {
  reel: {width: 1080, height: 1920, fps: 30},
  post: {width: 1080, height: 1350, fps: 30}, // 4:5, ainda usa fps p/ Still (irrelevante) e p/ possiveis variantes animadas
} as const;

/** Safe-zone do carrossel/post (Instagram cobre bordas com UI). Em px, para o formato "post". */
export const safeZone = {
  top: 120,
  bottom: 220,
  left: 64,
  right: 64,
} as const;
