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
 * Round F (2026-09-03, pedido direto do fundador — "tá tudo no mesmo padrão,
 * quero coisa mais chamativa/diferente"): pesquisa ampliada além de
 * benchmarks genéricos B2B — 2 referências externas nomeadas (perfil
 * Instagram real @thaleslaray, identidade visual pública Anthropic/Claude) +
 * tendências gerais de carrossel 2026 (hook bold, "pattern interrupt",
 * quebra deliberada do "corporate clean"). Resultou em `marcador` e
 * `papelQuente` — os primeiros 2 presets com um symbol PRÓPRIO
 * (`signatureGraphic`, ver tipo abaixo) em vez de reusar GhostBars/GhostQuote
 * dos outros templates, e o primeiro caso em que um preset pode tocar cor
 * (`canvasOverride`, exceção documentada e restrita). Detalhe completo de
 * pesquisa/decisão em `src/templates/CATALOGO.md` §0.4.
 *
 * Round G (2026-09-03, mesmo dia — feed real de @thaleslaray puxado de
 * verdade via `instagram-control` MCP, 35 posts): resultou em `analogiaReal`
 * — foto real + texto com contorno grosso (`textStroke`) + selo de ícone de
 * produto (`showIconBadge`, ver `src/lib/IconBadge.tsx`). Detalhe de
 * pesquisa em `docs/referencias-visuais/thaleslaray-pesquisa.md`.
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
  | 'corporateClean'
  | 'marcador'
  | 'papelQuente'
  | 'analogiaReal';

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
  /**
   * Grafico de apoio ESPECIFICO que o estilo pede, sobrescrevendo a escolha
   * hardcoded de cada template (GhostBars/GhostQuote/etc) quando
   * `graphicSupport` = true. undefined = template decide sozinho — o
   * comportamento ORIGINAL dos 5 presets Round A-C, nenhum deles usa este
   * campo. Só `marcador`/`papelQuente` (Round F, 2026-09-03, ver
   * `docs/plano-catalogo-em-escala.md` e CATALOGO.md) definem um valor —
   * symbols genuinamente diferentes dos Ghost* que já existiam, pedido
   * explícito do fundador pra fugir do "mesmo padrão visual".
   */
  signatureGraphic?: 'ghostMarker' | 'ghostSlash';
  /**
   * Override de CANVAS (fundo + tinta do texto) — EXCEÇÃO deliberada e
   * restrita à regra de topo deste arquivo ("visualStyle nunca mexe em
   * cor — isso é trabalho do `theme`"). Existe SÓ pra viabilizar
   * `papelQuente` (referência pesquisada: paleta pública clara/quente da
   * Anthropic/Claude — tinta escura sobre papel claro é O PRÓPRIO estilo,
   * não dá pra fazer só variando espaçamento/tipografia). NÃO troca o
   * accent de identidade do produto (CTA/badge continuam na cor do tema —
   * o produto continua reconhecível), só o par fundo/tinta de base. Só usar
   * em templates de canvas único (sem blocos internos com cor própria
   * cobrindo 100% do frame) — ver nota de escopo em `resolveCanvas` abaixo.
   * undefined = comportamento original (fundo 100% decidido pelo template/tema).
   */
  canvasOverride?: {background: string; ink: string};
  /**
   * Contorno grosso no texto (efeito "legenda de meme/vídeo viral") — Round G
   * (2026-09-03), referência pesquisada de verdade: post NATIVO real de
   * @thaleslaray (foto única, não carrossel — as ferramentas disponíveis não
   * expõem slide interno de carrossel, ver
   * `docs/referencias-visuais/thaleslaray-pesquisa.md`), imagem baixada e
   * inspecionada pixel a pixel
   * (`docs/referencias-visuais/thaleslaray-iceberg-meme.jpg`). Só faz
   * sentido sobre FOTO REAL (texto flutuando livre sobre a imagem, não em
   * bloco de cor sólida) — templates só devem aplicar isso nos
   * slides/variantes com `foto` já ativo. undefined = sem contorno
   * (comportamento original de todos os outros presets).
   */
  textStroke?: {width: number; color: string};
  /**
   * Liga o selo de ícone de produto (`IconBadge.tsx`, "prova de contexto" —
   * mesma função dos selos de ChatGPT/Claude na referência, mas com ícone
   * PRÓPRIO da Norte, nunca logo de terceiro). Só `analogiaReal` usa.
   */
  showIconBadge?: boolean;
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

  // ---- Round F (2026-09-03) — pedido direto do fundador: catálogo "tudo no
  // mesmo padrão", pesquisa mais ampla de referências (não só Thales
  // Laray/Claude — também tendências gerais de carrossel 2026: hook bold,
  // "pattern interrupt", quebra do "corporate clean"), símbolos novos
  // (GhostMarker/GhostSlash, ver GhostGraphics.tsx) e mais presença de foto
  // real de fundo. Detalhe de pesquisa e decisões em CATALOGO.md §0.4. ----

  marcador: {
    name: 'marcador',
    label: 'Marcador',
    quandoUsar:
      'Energia de criador/educador de conteúdo — referência pesquisada de verdade (perfil público @thaleslaray, 132K seguidores, carrosséis educacionais) e tendência de mercado 2026 (hook curto de 5-8 palavras, alto contraste, "pattern interrupt" pra parar o scroll): a frase-chave ganha uma tarja de marca-texto atrás, como se fosse grifada à mão, em vez de decoração fantasma de baixa opacidade. Usar quando a peça depende de UMA frase de gancho carregando a atenção (não um número — pra isso já existe `dadoEmDestaque`). O marcador usa o accent do tema, nunca cor solta — produto continua identificável.',
    spacingScale: 0.95,
    texture: {enabled: false, opacityMultiplier: 0},
    cardStyleOverride: 'flat',
    headlineWeight: 'bold',
    headlineScale: 1.2,
    letterSpacingBoost: -1.2,
    graphicSupport: true,
    signatureGraphic: 'ghostMarker',
  },
  papelQuente: {
    name: 'papelQuente',
    label: 'Papel Quente',
    quandoUsar:
      'Tom calmo/premium — referência pesquisada de verdade (identidade visual pública da Anthropic: tinta escura #141413, papel claro/quente #faf9f5, muitíssimo espaço em branco, tipografia contida, zero ornamento competindo com o texto). NÃO usa a fonte nem o logotipo da Anthropic (ambos de terceiro) — só o princípio de calma/espaço/paleta terrosa, aplicado com a fonte de marca (Atkinson Hyperlegible) e um único traço geométrico (`GhostSlash`) no lugar do logotipo. Usar em peça institucional que quer parecer "feita com cuidado", sem tom de venda direta — o oposto de `marcador`. Só disponível em templates de canvas único (ver `resolveCanvas`); não force em templates com blocos internos de cor própria (ex. DadoVsAchismo padrão/impacto) — lá o override de fundo não apareceria de verdade.',
    spacingScale: 1.35,
    texture: {enabled: true, opacityMultiplier: 0.5},
    cardStyleOverride: 'outline',
    headlineWeight: 'regularItalic',
    headlineScale: 0.98,
    letterSpacingBoost: 0.2,
    graphicSupport: true,
    signatureGraphic: 'ghostSlash',
    canvasOverride: {background: '#faf9f5', ink: '#141413'},
  },

  // ---- Round G (2026-09-03) — feed real de @thaleslaray puxado via
  // instagram-control (35 posts, captions completas). Limitação real
  // encontrada e documentada: as ferramentas disponíveis não expõem slide
  // interno de carrossel (só metadado do post inteiro ou a capa) — a
  // pesquisa cobre 1 imagem NATIVA real (foto única, não carrossel) baixada
  // e inspecionada pixel a pixel. Ver
  // `docs/referencias-visuais/thaleslaray-pesquisa.md` +
  // `docs/referencias-visuais/thaleslaray-iceberg-meme.jpg`. ----

  analogiaReal: {
    name: 'analogiaReal',
    label: 'Analogia Real',
    quandoUsar:
      'Formato "meme com propósito" — referência pesquisada de verdade: post NATIVO real de @thaleslaray (foto real de banco de imagem em tela cheia + tipografia com contorno preto grosso, texto flutuando livre sobre a foto em vez de bloco/card + selo pequeno de ícone de produto como "prova de contexto" + analogia/comparação relacionável no texto — ex. iceberg "o que eu mostro" vs "o que eu escondo"). SÓ usar em slides/variantes com foto real de fundo (`foto` já ativo) — o contorno existe pra ler sobre QUALQUER trecho da foto sem depender de overlay pesado; sobre cor sólida não faz sentido e o efeito fica solto. Texto recomendado: comparação/analogia curta, não afirmação didática longa (as outras 7 combinações já cobrem esse tom).',
    spacingScale: 1,
    texture: {enabled: false, opacityMultiplier: 0},
    cardStyleOverride: 'flat',
    headlineWeight: 'bold',
    headlineScale: 0.85,
    letterSpacingBoost: 0,
    graphicSupport: false,
    textStroke: {width: 3, color: '#000000'},
    showIconBadge: true,
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

/**
 * Resolve {background, ink} do canvas — só `papelQuente` define `canvasOverride`
 * hoje (ver comentário no tipo `VisualStyle`). Sem override, retorna os
 * valores originais do template/tema (comportamento ORIGINAL, nenhuma peça
 * já aprovada muda). Usar só em templates de canvas único — ver nota em
 * `papelQuente.quandoUsar`.
 */
export function resolveCanvas(
  vs: VS,
  fallbackBackground: string,
  fallbackInk: string,
): {background: string; ink: string} {
  if (!vs?.canvasOverride) return {background: fallbackBackground, ink: fallbackInk};
  return vs.canvasOverride;
}

/** Resolve o Ghost* específico que o estilo pede (undefined = template decide sozinho, comportamento original). */
export function resolveSignatureGraphic(vs: VS): 'ghostMarker' | 'ghostSlash' | undefined {
  return vs?.signatureGraphic;
}

/**
 * Resolve o par de propriedades CSS do contorno de texto (`analogiaReal`,
 * Round G) — objeto pronto pra espalhar num `style` de texto. undefined =
 * sem contorno (comportamento original). Só o template decide QUANDO chamar
 * isso (nunca sobre cor sólida, ver nota em `analogiaReal.quandoUsar`).
 */
export function textStrokeStyle(vs: VS): {WebkitTextStroke?: string; paintOrder?: string} {
  if (!vs?.textStroke) return {};
  return {WebkitTextStroke: `${vs.textStroke.width}px ${vs.textStroke.color}`, paintOrder: 'stroke fill'};
}

/** true = renderizar o `IconBadge` de prova de contexto (Round G). Default false — só `analogiaReal` liga isso. */
export function showIconBadge(vs: VS): boolean {
  return vs?.showIconBadge ?? false;
}
