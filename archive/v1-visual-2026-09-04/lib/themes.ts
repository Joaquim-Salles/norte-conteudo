/**
 * Sistema de temas — a peça que faz "milhares de variações" ser infraestrutura,
 * não trabalho manual arquivo-por-arquivo. Um `Theme` empacota paleta (de qual
 * sistema/produto) + densidade de textura + estilo de card, pra um único
 * componente `.tsx` produzir saídas visuais diferentes sem duplicar código.
 *
 * Uso: template recebe `theme?: ThemeName` (default 'marca') e resolve com
 * `getTheme(theme)`. Ex.: <DadoVsAchismo variant="impacto" theme="estoque" />
 * e <DadoVsAchismo variant="impacto" theme="vendas" /> são o MESMO componente,
 * 2 saídas visuais diferentes — é isso que permite escalar a galeria sem
 * multiplicar templates.
 */

import {systemColors, type SystemColor} from './colorGuide';
import type {ProductKey} from './types';

export type ThemeName = 'marca' | 'estoque' | 'vendas' | 'avalia';

/**
 * 'bezel' = SurfaceCard double-bezel (mais "all", profundidade física).
 * 'flat' = caixa reta de traço único (mais direto/"software").
 * 'outline' (novo, visualStyle corporateClean) = borda fina única, fundo
 * transparente — mais formal/reto, sem profundidade nem preenchimento.
 * Ver src/lib/visualStyles.ts — cardStyleOverride de um visualStyle tem
 * prioridade sobre o cardStyle do tema (ver resolveCardStyle).
 */
export type CardStyle = 'bezel' | 'flat' | 'outline';

export type Theme = {
  name: ThemeName;
  /** Nome legível, pra UI/relatório — nunca aparece impresso na peça. */
  label: string;
  colors: SystemColor;
  /** Opacidade do grain de superfície (Frame `texture`) — densidade varia por tema. */
  textureOpacity: number;
  cardStyle: CardStyle;
};

export const themes: Record<ThemeName, Theme> = {
  marca: {
    name: 'marca',
    label: 'Marca (institucional)',
    colors: systemColors.marca,
    textureOpacity: 0.045,
    cardStyle: 'bezel',
  },
  estoque: {
    name: 'estoque',
    label: 'NTB Estoque',
    colors: systemColors.ntbEstoque,
    textureOpacity: 0.05,
    cardStyle: 'bezel',
  },
  vendas: {
    name: 'vendas',
    label: 'NTB Vendas (Cardápio Digital)',
    colors: systemColors.ntbVendas,
    // Cardápio/pedido é um produto mais "direto ao ponto" que estoque/avaliação —
    // card reto em vez de double-bezel, pra diferenciar de verdade, não só cor.
    textureOpacity: 0.04,
    cardStyle: 'flat',
  },
  avalia: {
    name: 'avalia',
    label: 'Norte Avalia',
    colors: systemColors.norteAvalia,
    textureOpacity: 0.06,
    cardStyle: 'bezel',
  },
};

export function getTheme(name: ThemeName = 'marca'): Theme {
  return themes[name];
}

/**
 * Vitrine de Produto SEMPRE usa o tema do produto que está anunciando — não é
 * escolha manual do brief, é derivado automaticamente do campo `produto`.
 */
export const themeForProduct: Record<Exclude<ProductKey, null>, ThemeName> = {
  ntbEstoque: 'estoque',
  ntbVendas: 'vendas',
  norteAvalia: 'avalia',
};

export function getThemeForProduct(produto: Exclude<ProductKey, null>): Theme {
  return themes[themeForProduct[produto]];
}
