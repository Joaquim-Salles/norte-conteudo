import {interpolate, spring, type SpringConfig} from 'remotion';

/**
 * Helpers de motion reutilizáveis pros Reels (Composition, não Still) — cada
 * um documentado com o TERMO correto de vocabulário de motion design
 * (animation-vocabulary), não "efeito genérico". Princípios aplicados
 * (motion-design-skill): timing tem peso semântico (o que é rápido vs devagar
 * comunica urgência/confiança), easing nunca linear pra movimento de UI/texto,
 * e toda animação serve o conteúdo — nada decorativo por decorativo (mesma
 * Regra Inviolável #1 que já vale pros Stills).
 *
 * Fonte da pesquisa de tendência 2026 aplicada aqui (ver relato ao fundador):
 * stagger de 2-5 frames entre palavras, easing cubic-bezier com peso
 * (nunca linear), overshoot/"pop" sutil em elementos que "chegam" (badge,
 * número), hold mínimo de ~1-1.5s pra qualquer texto principal ficar legível.
 */

/** Easing com peso ("ease-out" acentuado) — usado em toda entrada de texto/elemento. Nunca usar Easing.linear pra UI. */
export const EASE_OUT_STRONG = (t: number) => 1 - Math.pow(1 - t, 3);

/** Easing "ease-in-out" com peso — usado em transições entre segmentos (wipe, slide de bloco inteiro). */
export const EASE_IN_OUT_STRONG = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Config de spring padrão pra "Pop"/overshoot sutil (badge, ícone, número que "chega"). */
export const POP_SPRING: SpringConfig = {damping: 12, mass: 0.5, stiffness: 180, overshootClamping: false};

/** Config de spring mais contida — pra elementos grandes (bloco de texto inteiro), sem overshoot visível. */
export const SOFT_SPRING: SpringConfig = {damping: 20, mass: 0.6, stiffness: 120, overshootClamping: false};

/**
 * "Slide + fade" — entrada padrão de bloco de texto/card: sobe de baixo
 * (ou lateral) enquanto ganha opacidade. `distance` em px, `axis` define a
 * direção do slide.
 */
export function slideFadeIn(
  frame: number,
  fps: number,
  startFrame: number,
  opts: {durationInFrames?: number; distance?: number; axis?: 'y' | 'x'} = {}
): {opacity: number; transform: string} {
  const {durationInFrames = 18, distance = 40, axis = 'y'} = opts;
  const localFrame = frame - startFrame;
  const progress = interpolate(localFrame, [0, durationInFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: EASE_OUT_STRONG,
  });
  const offset = (1 - progress) * distance;
  const opacity = interpolate(localFrame, [0, durationInFrames * 0.7], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return {
    opacity,
    transform: axis === 'y' ? `translateY(${offset}px)` : `translateX(${offset}px)`,
  };
}

/**
 * "Stagger word reveal" (kinetic typography) — cada palavra de `text` entra
 * com seu próprio delay (2-5 frames de defasagem, aqui parametrizado em
 * `staggerFrames`), slide+fade individual. Retorna um array de {word, style}
 * pra renderizar `<span style={style}>{word}</span>` em sequência.
 */
export function staggerWords(
  text: string,
  frame: number,
  fps: number,
  startFrame: number,
  opts: {staggerFrames?: number; durationInFrames?: number; distance?: number} = {}
): Array<{word: string; opacity: number; transform: string}> {
  const {staggerFrames = 3, durationInFrames = 14, distance = 22} = opts;
  const words = text.split(' ');
  return words.map((word, i) => {
    const wordStart = startFrame + i * staggerFrames;
    const localFrame = frame - wordStart;
    const progress = interpolate(localFrame, [0, durationInFrames], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: EASE_OUT_STRONG,
    });
    const offset = (1 - progress) * distance;
    const opacity = interpolate(localFrame, [0, durationInFrames * 0.6], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    return {word, opacity, transform: `translateY(${offset}px)`};
  });
}

/**
 * "Count-up" — número inteiro sobe de 0 até `target`, com easing ease-out
 * (desacelera perto do valor final — reforça "chegada", não é um contador
 * linear de caça-níquel). Usado no Reel de Dado vs. Achismo pro percentual.
 */
export function countUp(
  frame: number,
  fps: number,
  startFrame: number,
  target: number,
  durationInFrames = 36
): number {
  const localFrame = frame - startFrame;
  const progress = interpolate(localFrame, [0, durationInFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: EASE_OUT_STRONG,
  });
  return Math.round(progress * target);
}

/**
 * "Pop in" — spring com overshoot leve, pra elemento que precisa parecer que
 * "chegou com energia" (badge, selo, ícone, número de passo). Não usar em
 * blocos grandes de texto (fica exagerado) — reservar pra elementos pequenos.
 */
export function popIn(frame: number, fps: number, startFrame: number, config: SpringConfig = POP_SPRING): number {
  return spring({frame: Math.max(0, frame - startFrame), fps, config, durationInFrames: 24});
}

/**
 * "Wipe transition" — progresso 0→1 de uma transição de bloco cheio de tela
 * (usado pra revelar a seção seguinte cobrindo a anterior). `durationInFrames`
 * curto (8-14) pra manter o "corte" rápido e não virar fade lento.
 */
export function wipeProgress(frame: number, startFrame: number, durationInFrames = 12): number {
  return interpolate(frame - startFrame, [0, durationInFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: EASE_IN_OUT_STRONG,
  });
}

/**
 * "Progress fill" — barra/trilho que preenche de 0 a 100% num intervalo de
 * frames (usado no tracker de passo do Metodologia). Easing ease-in-out —
 * não é um preenchimento robótico linear.
 */
export function progressFill(frame: number, startFrame: number, durationInFrames = 20): number {
  return interpolate(frame - startFrame, [0, durationInFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: EASE_IN_OUT_STRONG,
  });
}
