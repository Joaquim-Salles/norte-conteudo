/**
 * Guia de cores por sistema/produto — FONTE DE VERDADE em código.
 *
 * Cada entrada foi confirmada direto no repositório real do sistema (CSS/tema
 * de produção), não no site institucional — em 2 dos 3 casos o site estava
 * desatualizado ou simplesmente não documentava a cor. Ver `source` de cada
 * uma para rastreabilidade exata (arquivo:linha). Versão legível com swatches
 * em texto: `src/templates/GUIA-DE-CORES.md`.
 *
 * Levantamento feito em 2026-08-31 por Rafael, lendo os repos reais:
 *   - ~/Projects/norte para negocios/ntb estoque
 *   - ~/Projects/norte para negocios/ntb vendas
 * (SÓ LEITURA — nenhum desses repos foi alterado.)
 */

export type SystemColor = {
  /** Cor de identidade do sistema — usar em elementos de destaque/identidade. */
  base: string;
  /** Tom escuro — usar como fundo/gradiente (texto branco por cima). */
  dark: string;
  /** Tom claro — usar em realces, glow decorativo, texto sobre fundo escuro do próprio tema. */
  light: string;
  /** De onde veio essa cor — arquivo:linha real, ou nota de que foi derivada/proposta. */
  source: string;
};

export const brandPalette = {
  primary: '#6b71f2',
  primaryLight: '#6366f1',
  primaryDark: '#1e1b4b',
  accent: '#f43f5e',
  accentHover: '#e11d48',
  black: '#000000',
  white: '#ffffff',
} as const;

export type SystemKey = 'ntbEstoque' | 'ntbVendas' | 'norteAvalia' | 'marca';

export const systemColors: Record<SystemKey, SystemColor> = {
  ntbEstoque: {
    base: '#2eb5c3',
    dark: '#145a61',
    light: '#60d4e1',
    source:
      'CONFIRMADA no repo real (não é a do site institucional). ' +
      '~/Projects/norte para negocios/ntb estoque/app/globals.css:64 (`--brand: #2eb5c3`, ' +
      'usada em --color-primary/--color-ring/foco visível) + app/manifest.ts:11 ' +
      '(theme_color) + app/layout.tsx:26 (viewport.themeColor). ' +
      'O `.claude/brand/design-tokens.md` do site institucional documentava #00d6d6 para ' +
      'essa integração — está DESATUALIZADO/diferente do app real; #2eb5c3 é a cor de ' +
      'verdade em produção. dark/light abaixo foram DERIVADOS por Rafael (mesmo método de ' +
      'deslocamento de luminosidade usado no par dark/light de Norte Avalia), não existem ' +
      'como variável própria no repo.',
  },
  ntbVendas: {
    base: '#484DB5',
    dark: '#262969',
    light: '#898cd2',
    source:
      'CONFIRMADA no repo real — o site institucional simplesmente não tinha essa cor ' +
      'documentada, mas o app TEM identidade própria, não é cor genérica. ' +
      '~/Projects/norte para negocios/ntb vendas/app/globals.css:45 ' +
      '(`--brand: #484DB5` com comentário no próprio arquivo: "Marca: identidade Norte ' +
      'Para Negócios (azul-violeta + coral)") + public/manifest.json:8 (theme_color) + ' +
      'hardcoded em app/page.tsx, app/acesso/page.tsx e AuthBackdrop.tsx (hero/fundo de ' +
      'autenticação), replicando propositalmente o hero do norteparanegocios.com.br. ' +
      'dark/light abaixo foram DERIVADOS por Rafael (mesmo método usado em Norte Avalia).',
  },
  norteAvalia: {
    base: '#7e22ce',
    dark: '#581c87',
    light: '#a855f7',
    source: 'Já documentada em .claude/brand/design-tokens.md (CSS de produção do site institucional).',
  },
  marca: {
    base: brandPalette.primary,
    dark: brandPalette.primaryDark,
    light: brandPalette.primaryLight,
    source:
      '.claude/brand/design-tokens.md — paleta geral da marca, usada em posts ' +
      'institucionais sem produto específico (não é "sistema", é a marca-mãe).',
  },
};
