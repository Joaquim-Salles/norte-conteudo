/**
 * Sistema de ESTILO DE MOTION — a dimensão combinável pro catálogo de VÍDEO,
 * equivalente ao que `visualStyles.ts` fez pro catálogo de posts (ver
 * docs/plano-catalogo-em-escala.md, Round C). Hoje só 2 Reels existem
 * (`DadoVsAchismoReel`, `MetodologiaReel`) e o motion deles está hardcoded
 * dentro do componente — este arquivo extrai isso em PRESETS sistemáticos
 * (knobs), do mesmo jeito que `visualStyles.ts` fez pra composição visual.
 *
 * Cada preset define, de forma sistemática (não CSS/timing solto por
 * template):
 *  - `textEntry`: como o texto principal entra em cena.
 *  - `transition`: como se corta de uma cena/segmento pro próximo.
 *  - `easing`: curva de peso dominante (NUNCA linear — timing tem peso
 *    semântico, motion-design-skill).
 *  - `highlight`: efeito de destaque em elemento de ênfase (número, badge,
 *    palavra-chave). `'none'` é uma escolha válida (minimalFade/corporateClean
 *    de vídeo — sobriedade é o efeito).
 *  - `paceScale`: multiplica a duração base dos segmentos (>1 mais lento/
 *    confiante, <1 mais rápido/cortante).
 *  - `staggerFrames`: defasagem entre palavras/elementos em sequência.
 *  - `spring`: config de spring pra elementos que "chegam" com física (badge,
 *    ícone, dot do tracker) — complementa (não substitui) `easing`, que é
 *    usado nas entradas baseadas em interpolate().
 *
 * Pesquisa aplicada ANTES de definir os presets (2026-09-01, ver relato ao
 * fundador e docs/plano-catalogo-em-escala.md Round C):
 *  - Legendas/kinetic typography 2026 fazem reveal palavra-a-palavra com
 *    "scale pop" na palavra-chave (não a frase toda de uma vez) — informa
 *    `highlight: 'scalePop'` em `whipPanCut`.
 *  - Whip-pan borrado é a transição de corte de tempo/cena mais barata e
 *    mais legível em vertical — informa `transition: 'whipPan'`.
 *  - Match cut (corte na mesma forma/posição entre 2 cenas) é o padrão real
 *    pra conteúdo de antes/depois — informa `transition: 'matchCut'`.
 *  - "Heavy transition packs com spin/glitch em todo corte lê 2022" e "reels
 *    premia polimento/tipografia kerned, motion pesado por cima de tudo soa
 *    ad-coded" — DECISÃO: nenhum preset novo usa glitch de tela cheia (o
 *    `plano-catalogo-em-escala.md` original sugeria `glitch-transition`;
 *    substituído por `whipPanCut`/`matchCut`, que entregam a mesma energia
 *    de corte sem o efeito datado — documentado aqui e no CATALOGO.md).
 *  - Revival de estética analógica (grain, imperfeição visível) já está
 *    coberto pelo grain existente (`Texture.tsx`/`Frame.textureOpacity`) —
 *    não duplicado aqui como preset à parte.
 *
 * IMPORTANTE (compatibilidade, mesmo princípio de visualStyles.ts):
 * `motionStyle` é sempre opcional nos Reels refatorados. Omitido = aparência
 * ORIGINAL hardcoded (kineticForte é literalmente essa formalização) —
 * nenhum Reel já aprovado muda de comportamento por causa desta rodada.
 */

import {interpolate, type SpringConfig} from 'remotion';
import {POP_SPRING, SOFT_SPRING, flashPulse} from './motion';

export type MotionStyleName =
  | 'kineticForte'
  | 'minimalFade'
  | 'zoomPunch'
  | 'typewriter'
  | 'splitReveal'
  | 'whipPanCut'
  | 'matchCut';

export type TextEntryType = 'staggerWord' | 'slideFadeBlock' | 'typewriter' | 'splitMeet';
export type TransitionType = 'wipe' | 'cutSeco' | 'zoomPunch' | 'crossDissolve' | 'whipPan' | 'matchCut' | 'splitConverge';
export type HighlightType = 'none' | 'popOvershoot' | 'scalePop' | 'flash';
export type EasingName = 'strong' | 'gentle' | 'bounce';

export type MotionStyle = {
  name: MotionStyleName;
  label: string;
  quandoUsar: string;
  textEntry: TextEntryType;
  transition: TransitionType;
  easing: EasingName;
  highlight: HighlightType;
  /** Multiplica a duração base de cada segmento/hold. */
  paceScale: number;
  /** Defasagem (frames) entre palavras/elementos em sequência — 0 = bloco inteiro junto. */
  staggerFrames: number;
  spring: SpringConfig;
};

export const motionStyles: Record<MotionStyleName, MotionStyle> = {
  kineticForte: {
    name: 'kineticForte',
    label: 'Kinetic Forte',
    quandoUsar:
      'Formalização do motion que os 2 primeiros Reels já usavam (Dado vs. Achismo, Metodologia) — energia alta, ritmo de anúncio, stagger word reveal + wipe de accent + pop com overshoot. Default de compatibilidade: omitir `motionStyle` produz exatamente este comportamento.',
    textEntry: 'staggerWord',
    transition: 'wipe',
    easing: 'strong',
    highlight: 'popOvershoot',
    paceScale: 1,
    staggerFrames: 3,
    spring: POP_SPRING,
  },
  minimalFade: {
    name: 'minimalFade',
    label: 'Minimal Fade',
    quandoUsar:
      'Cortes secos, fade simples entre cenas, sem floreio — ritmo mais lento e confiante. Bom pra Bastidores/Depoimento, tom mais sóbrio (pesquisa 2026: "reels premia polimento/considered transitions" — contido não é sinônimo de sem-graça).',
    textEntry: 'slideFadeBlock',
    transition: 'crossDissolve',
    easing: 'gentle',
    highlight: 'none',
    paceScale: 1.35,
    staggerFrames: 0,
    spring: SOFT_SPRING,
  },
  zoomPunch: {
    name: 'zoomPunch',
    label: 'Zoom Punch',
    quandoUsar:
      'Zoom agressivo de entrada nos pontos de ênfase, corte rápido — bom pra Vitrine de Produto/lançamento, onde o objetivo é impacto imediato, não sutileza.',
    textEntry: 'staggerWord',
    transition: 'zoomPunch',
    easing: 'bounce',
    highlight: 'scalePop',
    paceScale: 0.78,
    staggerFrames: 2,
    spring: {...POP_SPRING, stiffness: 220, damping: 11},
  },
  typewriter: {
    name: 'typewriter',
    label: 'Typewriter',
    quandoUsar:
      'Texto aparecendo caractere a caractere, cadência de fala real — bom pra citação/Depoimento, onde a voz em primeira pessoa é o gancho (alinhado à tendência de autenticidade/analógico 2026, sem precisar de VHS/glitch pra parecer "real").',
    textEntry: 'typewriter',
    transition: 'cutSeco',
    easing: 'gentle',
    highlight: 'none',
    paceScale: 1.2,
    staggerFrames: 0,
    spring: SOFT_SPRING,
  },
  splitReveal: {
    name: 'splitReveal',
    label: 'Split Reveal',
    quandoUsar:
      'Elementos entram de lados opostos (esquerda/direita) e se encontram no centro — bom pra Comparativo (cada opção "vem do seu lado" antes do confronto).',
    textEntry: 'splitMeet',
    transition: 'splitConverge',
    easing: 'strong',
    highlight: 'popOvershoot',
    paceScale: 1,
    staggerFrames: 2,
    spring: POP_SPRING,
  },
  whipPanCut: {
    name: 'whipPanCut',
    label: 'Whip Pan Cut',
    quandoUsar:
      'Transição de whip-pan borrado entre segmentos + legenda palavra-a-palavra com scale-pop na palavra-chave — pesquisa 2026 aponta como a assinatura de edição mais copiada em vertical. Bom pra conteúdo com vários pontos rápidos (dica prática em vídeo, listicle).',
    textEntry: 'staggerWord',
    transition: 'whipPan',
    easing: 'strong',
    highlight: 'scalePop',
    paceScale: 0.85,
    staggerFrames: 2,
    spring: POP_SPRING,
  },
  matchCut: {
    name: 'matchCut',
    label: 'Match Cut',
    quandoUsar:
      'Corte seco com flash curto no ponto de corte (reforça continuidade de forma/posição entre 2 estados) — pesquisa 2026: "match cut é o padrão real pra antes/depois". Bom pra qualquer conteúdo com 2 estados que se opõem.',
    textEntry: 'slideFadeBlock',
    transition: 'matchCut',
    easing: 'strong',
    highlight: 'flash',
    paceScale: 0.9,
    staggerFrames: 0,
    spring: POP_SPRING,
  },
};

export function getMotionStyle(name?: MotionStyleName): MotionStyle {
  return motionStyles[name ?? 'kineticForte'];
}

// ---- Helpers — Reels leem os knobs por aqui, nunca por if/else espalhado ----

import {EASE_OUT_STRONG, EASE_GENTLE, EASE_BOUNCE_OUT} from './motion';

export function getEasingFn(easing: EasingName): (t: number) => number {
  if (easing === 'gentle') return EASE_GENTLE;
  if (easing === 'bounce') return EASE_BOUNCE_OUT;
  return EASE_OUT_STRONG;
}

/** Multiplica uma duração base (frames) pelo paceScale do preset, com clamp opcional (nunca deixar virar 0 ou negativo). */
export function scalePace(ms: MotionStyle, framesBase: number, opts?: {min?: number}): number {
  const min = opts?.min ?? 4;
  return Math.max(min, Math.round(framesBase * ms.paceScale));
}

/**
 * Resolve o efeito de CHEGADA do elemento hero (número count-up, dot do
 * tracker, badge) a partir de `ms.highlight` — centraliza a lógica que antes
 * ficava hardcoded como `numberPop` dentro de cada Reel.
 *  - `none`: sem escala de chegada (só o fade/entrada normal do elemento).
 *  - `popOvershoot`: mesma curva que já existia hardcoded (0.88→1.05→1).
 *  - `scalePop`: estalo mais forte via easing back-out (1.35→1).
 *  - `flash`: escala neutra (1), mas retorna `flashOpacity` pulsando — o
 *    caller sobrepõe um clarão sutil atrás/ao redor do elemento.
 */
export function resolveHighlight(
  ms: MotionStyle,
  frame: number,
  startFrame: number,
  durationInFrames = 16
): {scale: number; flashOpacity: number} {
  if (ms.highlight === 'none') return {scale: 1, flashOpacity: 0};
  if (ms.highlight === 'flash') return {scale: 1, flashOpacity: flashPulse(frame, startFrame, durationInFrames) * 0.5};
  if (ms.highlight === 'scalePop') {
    const scale = interpolate(frame - startFrame, [0, durationInFrames], [1.35, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: getEasingFn('bounce'),
    });
    return {scale, flashOpacity: 0};
  }
  // popOvershoot
  const scale = interpolate(frame, [startFrame, startFrame + durationInFrames * 0.5, startFrame + durationInFrames * 1.5], [0.88, 1.05, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: getEasingFn('strong'),
  });
  return {scale, flashOpacity: 0};
}
