/**
 * Sistema de ESTILO VISUAL — a dimensão que falta pra multiplicar o catálogo
 * de posts de forma combinatória de verdade (ver docs/plano-catalogo-em-escala.md,
 * Round A). `theme.ts` já resolve "de qual sistema/produto é a cor"; este
 * arquivo resolve "que TIPO de composição visual é essa peça" — as duas
 * dimensões são ortogonais e combináveis: mesmo conteúdo, tema Estoque +
 * estilo minimalista vs. tema Estoque + estilo boldTipografico devem ser
 * visivelmente diferentes (composição, densidade, tipografia, textura),
 * sem trocar uma linha de cor.
 *
 * Calibrado com pesquisa rápida de mercado B2B/editorial 2026 (não decidido
 * no vácuo — ver docs/plano-catalogo-em-escala.md e commit desta rodada):
 *  - "Minimaximalismo" 2026: base minimalista + tipografia/cor assertiva
 *    (Fontfabric, ManyPixels) — informa `minimalista` e `boldTipografico`.
 *  - Estilo Suíço/Internacional Typographic: grid funcional, alto contraste,
 *    1 cor de destaque, tipografia como hierarquia — informa `minimalista`
 *    e `corporateClean`.
 *  - LinkedIn/B2B: credibilidade via restrição visual, sem excesso decorativo
 *    — informa `corporateClean`.
 *  - Tipografia como "hero" (grande, empilhada, protagonista) — informa
 *    `boldTipografico` e generaliza o princípio que já existia isolado na
 *    variante `impacto` de DadoVsAchismo — `dadoEmDestaque` aplica esse
 *    mesmo princípio (número/dado dominando o quadro) como estilo, não mais
 *    como variante de um único template.
 *  - Editorial/revista: hierarquia rica, textura de papel sutil, pode usar
 *    foto de fundo — informa `editorial`.
 *
 * Cada preset é um conjunto de KNOBS sistemáticos (não CSS solto por
 * template): densidade/espaçamento, textura, estilo de card, peso
 * tipográfico dominante do elemento hero, presença de gráfico de apoio
 * (Ghost*), e letter-spacing. Templates leem esses knobs via os helpers no
 * final do arquivo — nunca hardcodam "se minimalista então X" espalhado.
 *
 * IMPORTANTE (compatibilidade): `visualStyle` é sempre opcional nos templates
 * refatorados. Quando omitido (undefined), os helpers retornam os valores
 * ORIGINAIS hardcoded (pré-2026-09-01) — nenhuma peça já aprovada muda de
 * aparência por causa desta rodada. `visualStyle` só entra em cena quando o
 * brief/QA explicitamente pede um estilo.
 */

import type {CardStyle} from './themes';

export type VisualStyleName =
  | 'minimalista'
  | 'dadoEmDestaque'
  | 'editorial'
  | 'boldTipografico'
  | 'corporateClean';

export type HeadlineWeight = 'bold' | 'boldItalic' | 'regularItalic';

export type VisualStyle = {
  name: VisualStyleName;
  /** Legível, pra UI/relatório/CATALOGO — nunca aparece impresso na peça. */
  label: string;
  /** Quando usar — guia rápido pra escolha no brief, também nunca impresso na peça. */
  quandoUsar: string;
  /**
   * Multiplica paddings/gaps/alturas de bloco que o template escolhe expor
   * via `scaleSpacing`. >1 = mais respiro (composição rarefeita), <1 = mais
   * compacto/denso (elemento hero domina mais do quadro).
   */
  spacingScale: number;
  /** Grain de superfície (Texture.tsx). `opacityMultiplier` multiplica `theme.textureOpacity`. */
  texture: {enabled: boolean; opacityMultiplier: number};
  /**
   * Override do `cardStyle` do tema (ver themes.ts) pros templates que usam
   * SurfaceCard. undefined = não tem opinião própria, usa o do tema.
   */
  cardStyleOverride?: CardStyle;
  /** Peso/estilo tipográfico do elemento hero (número, headline, citação de abertura). */
  headlineWeight: HeadlineWeight;
  /** Multiplica o font-size base do elemento hero do template. */
  headlineScale: number;
  /** letter-spacing (px) somado ao base do elemento hero. */
  letterSpacingBoost: number;
  /**
   * Liga/desliga elemento gráfico de apoio decorativo (GhostBars/GhostQuote/
   * GhostArrowUp). false = "quase sem gráfico de apoio", a composição depende
   * só de tipografia/espaço/cor.
   */
  graphicSupport: boolean;
};

export const visualStyles: Record<VisualStyleName, VisualStyle> = {
  minimalista: {
    name: 'minimalista',
    label: 'Minimalista',
    quandoUsar:
      'Peça institucional/conceitual, quando o objetivo é credibilidade por sobriedade — muito espaço em branco, tipografia como protagonista, sem elemento gráfico de apoio competindo com o texto.',
    spacingScale: 1.3,
    texture: {enabled: false, opacityMultiplier: 0},
    cardStyleOverride: 'flat',
    headlineWeight: 'bold',
    headlineScale: 1.0,
    letterSpacingBoost: -0.5,
    graphicSupport: false,
  },
  dadoEmDestaque: {
    name: 'dadoEmDestaque',
    label: 'Dado em Destaque',
    quandoUsar:
      'Generaliza o princípio da variante `impacto` de DadoVsAchismo pra qualquer template: o número/métrica ocupa a maior parte da tela, tudo o resto vira contexto comprimido. Usar quando a peça TEM um número forte pra vender.',
    spacingScale: 0.88,
    texture: {enabled: true, opacityMultiplier: 1.15},
    cardStyleOverride: undefined,
    headlineWeight: 'bold',
    headlineScale: 1.45,
    letterSpacingBoost: -2.5,
    graphicSupport: true,
  },
  editorial: {
    name: 'editorial',
    label: 'Editorial',
    quandoUsar:
      'Peça com tom de reportagem/revista — hierarquia de texto mais rica (eyebrow, headline, corpo), textura de papel sutil, combina bem com foto de fundo quando disponível. Usar pra depoimento/contexto, não pra dado seco.',
    spacingScale: 1.1,
    texture: {enabled: true, opacityMultiplier: 0.85},
    cardStyleOverride: 'bezel',
    headlineWeight: 'regularItalic',
    headlineScale: 1.05,
    letterSpacingBoost: 0,
    graphicSupport: true,
  },
  boldTipografico: {
    name: 'boldTipografico',
    label: 'Bold Tipográfico',
    quandoUsar:
      'Tipografia grande e pesada COMO elemento gráfico principal, cor de fundo cheia — usar quando a frase/afirmação em si é o gancho (manifesto, regra da casa, headline de impacto), não um número.',
    spacingScale: 0.82,
    texture: {enabled: false, opacityMultiplier: 0},
    cardStyleOverride: 'flat',
    headlineWeight: 'bold',
    headlineScale: 1.65,
    letterSpacingBoost: -3,
    graphicSupport: false,
  },
  corporateClean: {
    name: 'corporateClean',
    label: 'Corporate Clean',
    quandoUsar:
      'Mais formal/reto — bordas finas (outline), sem grain, tipografia contida. Usar em contexto B2B mais conservador (ex: vitrine pra decisor financeiro) onde "chamativo" teria efeito contrário à credibilidade.',
    spacingScale: 1.15,
    texture: {enabled: false, opacityMultiplier: 0},
    cardStyleOverride: 'outline',
    headlineWeight: 'bold',
    headlineScale: 0.92,
    letterSpacingBoost: 0.6,
    graphicSupport: false,
  },
};

export function getVisualStyle(name: VisualStyleName): VisualStyle {
  return visualStyles[name];
}

// ---- Helpers — templates leem os knobs por aqui, nunca por if/else espalhado ----

/**
 * `vs` é sempre `VisualStyle | null | undefined`: null/undefined = "sem
 * estilo aplicado", helper retorna o valor ORIGINAL (compatibilidade, ver
 * comentário de topo do arquivo).
 */
type VS = VisualStyle | null | undefined;

/** Multiplica um valor de espaçamento/altura de bloco pelo spacingScale do estilo, com clamp opcional pra não quebrar layout. */
export function scaleSpacing(vs: VS, px: number, opts?: {min?: number; max?: number}): number {
  if (!vs) return px;
  const scaled = Math.round(px * vs.spacingScale);
  const min = opts?.min ?? -Infinity;
  const max = opts?.max ?? Infinity;
  return Math.max(min, Math.min(max, scaled));
}

/** Resolve fontWeight/fontStyle/fontSize/letterSpacing do elemento hero a partir do estilo (ou do valor base, se vs ausente). */
export function headlineStyle(
  vs: VS,
  baseFontSize: number,
  baseLetterSpacing = 0,
): {fontWeight: 400 | 700; fontStyle: 'normal' | 'italic'; fontSize: number; letterSpacing: number} {
  if (!vs) {
    return {fontWeight: 700, fontStyle: 'normal', fontSize: baseFontSize, letterSpacing: baseLetterSpacing};
  }
  const italic = vs.headlineWeight !== 'bold';
  const fontWeight = vs.headlineWeight === 'regularItalic' ? 400 : 700;
  return {
    fontWeight,
    fontStyle: italic ? 'italic' : 'normal',
    fontSize: Math.round(baseFontSize * vs.headlineScale),
    letterSpacing: baseLetterSpacing + vs.letterSpacingBoost,
  };
}

/** Resolve {enabled, opacity} de textura combinando theme.textureOpacity (base) com o estilo visual. */
export function resolveTexture(vs: VS, themeTextureOpacity: number): {enabled: boolean; opacity: number} {
  if (!vs) return {enabled: true, opacity: themeTextureOpacity};
  return {enabled: vs.texture.enabled, opacity: themeTextureOpacity * vs.texture.opacityMultiplier};
}

/** Resolve o CardStyle final: estilo visual tem prioridade sobre o cardStyle do tema, se definir um. */
export function resolveCardStyle(vs: VS, themeCardStyle: CardStyle): CardStyle {
  return vs?.cardStyleOverride ?? themeCardStyle;
}

/** true = renderizar elemento gráfico de apoio (Ghost*). Sem estilo aplicado, default é sempre true (comportamento original). */
export function showGraphicSupport(vs: VS): boolean {
  return vs?.graphicSupport ?? true;
}
