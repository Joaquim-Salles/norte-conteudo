/**
 * Tokens de cor — extraídos de docs/design-dna.json (sistema definitivo v2,
 * pós-reset 2026-09-04). Conferidos contra archive/v1-visual-2026-09-04/lib/themes.ts
 * pra garantir que os hex batem com o que já estava validado.
 */

export type ThemeName = 'marca' | 'estoque' | 'vendas' | 'avalia';

export const brand = {
  primary: '#6b71f2', // marca-mãe — institucional, assinatura, fechamento
  accent: '#f43f5e', // accent fixo — destaque pontual, nunca dominante
};

export const productColors: Record<ThemeName, string> = {
  marca: brand.primary,
  estoque: '#2eb5c3', // NTB Estoque
  vendas: '#f8a41a', // NTB Vendas (laranja das aletas do foguete — reservado p/ vitrine)
  avalia: '#484db5', // Norte Avalia
};

export const neutral = {
  scale: ['#0a0a0a', '#1c1c1c', '#4a4a4a', '#8a8a8a', '#e8e4dc', '#f7f4ee'] as const,
  quasePreto: '#0a0a0a',
  cinzaEscuro: '#1c1c1c',
  cinzaMedio: '#4a4a4a',
  cinzaClaro: '#8a8a8a',
  bege: '#e8e4dc',
  begeClaro: '#f7f4ee',
};

export const semantic = {
  success: '#2eb5c3',
  warning: '#f8a41a',
  error: '#ea2840',
  info: '#484db5',
};

export const surface = {
  background: '#f7f4ee',
  card: '#ffffff',
  elevated: '#1c1c1c',
};

/** Cores reais do mascote foguete, extraídas do bundle do site (não inventar). */
export const rocketColors = {
  corpo: '#FAF6FB',
  aletaLaranja: '#F8A41A',
  vermelho: '#EA2840',
  vermelhoEscuro: '#831F23',
  vermelhoMedio: '#B62835',
  vermelhoClaro: '#F03B4A',
  janelaAzulEscuro: '#3649A5',
  janelaCiano: '#52C5CA',
  janelaTeal: '#19B3C0',
  janelaAzulClaro: '#76D3F2',
  texturaGrafite: '#ACACAC',
};

export type Theme = {
  name: ThemeName;
  label: string;
  color: string;
};

export const themes: Record<ThemeName, Theme> = {
  marca: {name: 'marca', label: 'Marca (institucional)', color: productColors.marca},
  estoque: {name: 'estoque', label: 'NTB Estoque', color: productColors.estoque},
  vendas: {name: 'vendas', label: 'NTB Vendas', color: productColors.vendas},
  avalia: {name: 'avalia', label: 'Norte Avalia', color: productColors.avalia},
};

export function getTheme(name: ThemeName = 'marca'): Theme {
  return themes[name];
}

export const typeScale = {
  display: {fontSize: 84, fontWeight: 700, lineHeight: 1.0, letterSpacing: '-0.02em'},
  heading1: {fontSize: 56, fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.01em'},
  heading2: {fontSize: 40, fontWeight: 700, lineHeight: 1.1, letterSpacing: '0'},
  heading3: {fontSize: 28, fontWeight: 700, lineHeight: 1.2, letterSpacing: '0'},
  body: {fontSize: 22, fontWeight: 400, lineHeight: 1.4, letterSpacing: '0'},
  bodySmall: {fontSize: 18, fontWeight: 400, lineHeight: 1.4, letterSpacing: '0'},
  caption: {fontSize: 14, fontWeight: 700, lineHeight: 1.2, letterSpacing: '0.04em'},
  overline: {fontSize: 12, fontWeight: 700, lineHeight: 1.0, letterSpacing: '0.08em'},
};

export const spacing = {
  unit: 8,
  scale: [8, 16, 24, 32, 48, 64, 96, 128],
  margin: 96, // margem externa fixa 64-96px — usando o valor generoso pro formato 1080x1350
};
