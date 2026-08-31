/**
 * Tokens de marca — Norte Para Negocios
 * Fonte: .claude/brand/design-tokens.md (extraidos do CSS de producao do site, 2026-08-30)
 * NUNCA hardcodar cor solta num template — importar sempre daqui.
 */

export const colors = {
  // Marca
  primary: '#6b71f2',
  primaryLight: '#6366f1',
  primaryDark: '#1e1b4b',
  accent: '#f43f5e',
  accentHover: '#e11d48',
  black: '#000000',
  white: '#ffffff',

  // Por produto (usado em Vitrine de Produto)
  product: {
    ntbEstoque: {base: '#00d6d6', dark: '#00d6d6', light: '#00d6d6'},
    ntbVendas: {base: '#6b71f2', dark: '#1e1b4b', light: '#6366f1'}, // sem cor propria no site -> usa primaria
    norteAvalia: {base: '#7e22ce', dark: '#581c87', light: '#a855f7'},
  },
} as const;

export const fontFamily = {
  brand: 'Atkinson Hyperlegible', // alias local -> arquivos Atkinson Hyperlegible Next (ver src/lib/fonts.ts)
  fallback: 'ui-sans-serif, system-ui, sans-serif',
} as const;

export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
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
