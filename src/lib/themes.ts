/**
 * Tokens da Família Norte — alinhados à apresentação institucional de
 * 27/09/2026: Norte para Negócios, Norte Vendas e Norte Estoque.
 */

export type ThemeName = 'marca' | 'estoque' | 'vendas' | 'avalia';

export const brand = {
  primary: '#14163A', // Norte para Negócios — marca-mãe
  accent: '#EA2840', // vermelho do símbolo — destaque pontual
};

export const productColors: Record<ThemeName, string> = {
  marca: brand.primary,
  estoque: '#168E9A', // Norte Estoque
  vendas: '#484DB5', // Norte Vendas
  avalia: '#484DB5', // Norte Avalia
};

export const neutral = {
  scale: ['#0B0B0F', '#14163A', '#4a4a4a', '#8a8a8a', '#e7e9f5', '#FBFBFE'] as const,
  quasePreto: '#0B0B0F',
  cinzaEscuro: '#14163A',
  cinzaMedio: '#4a4a4a',
  cinzaClaro: '#8a8a8a',
  bege: '#e7e9f5',
  begeClaro: '#FBFBFE',
};

export const semantic = {
  success: '#168E9A',
  warning: '#f8a41a',
  error: '#ea2840',
  info: '#484DB5',
};

export const surface = {
  background: '#FBFBFE',
  card: '#FFFFFF',
  elevated: '#14163A',
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
  estoque: {name: 'estoque', label: 'Norte Estoque', color: productColors.estoque},
  vendas: {name: 'vendas', label: 'Norte Vendas', color: productColors.vendas},
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
