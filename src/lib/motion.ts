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

/**
 * Easing "gentle" — ease-out mais fraco/calmo (expoente 1.6, não 3). Usado no
 * preset `minimalFade` (Round C, motionStyles.ts): peso menor, mas NUNCA
 * linear — continua tendo personalidade, só que confiante/sóbria em vez de
 * "publicitária". Timing tem peso semântico (motion-design-skill): devagar
 * aqui comunica confiança, não preguiça de animação.
 */
export const EASE_GENTLE = (t: number) => 1 - Math.pow(1 - t, 1.6);

/**
 * Easing "back-out" com overshoot leve embutido NA CURVA (não spring physics)
 * — usado no preset `zoomPunch`/highlight `scalePop` pra dar "estalo" sem
 * precisar de `spring()`. Fórmula clássica de easing "back" (Penner/Éase.net).
 */
export const EASE_BOUNCE_OUT = (t: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  const x = t - 1;
  return 1 + c3 * x * x * x + c1 * x * x;
};

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
  opts: {durationInFrames?: number; distance?: number; axis?: 'y' | 'x'; easing?: (t: number) => number} = {}
): {opacity: number; transform: string} {
  const {durationInFrames = 18, distance = 40, axis = 'y', easing = EASE_OUT_STRONG} = opts;
  const localFrame = frame - startFrame;
  const progress = interpolate(localFrame, [0, durationInFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing,
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
  opts: {staggerFrames?: number; durationInFrames?: number; distance?: number; easing?: (t: number) => number} = {}
): Array<{word: string; opacity: number; transform: string}> {
  const {staggerFrames = 3, durationInFrames = 14, distance = 22, easing = EASE_OUT_STRONG} = opts;
  const words = text.split(' ');
  return words.map((word, i) => {
    const wordStart = startFrame + i * staggerFrames;
    const localFrame = frame - wordStart;
    const progress = interpolate(localFrame, [0, durationInFrames], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing,
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

/**
 * ---- Round C (2026-09-01) — primitivos novos pra `motionStyles.ts` ----
 * Pesquisa aplicada (ver docs/plano-catalogo-em-escala.md Round C e relato ao
 * fundador): legendas 2026 fazem reveal palavra-a-palavra com "scale pop" na
 * palavra-chave (não a frase toda de uma vez); whip-pan borrado é a transição
 * mais barata/legível pra cortar tempo/cena em formato vertical; match cut
 * (corte na mesma forma/posição) é o padrão real pra antes/depois; e glitch
 * pesado em toda transição "lê 2022" e soa "ad-coded" — por isso NENHUM
 * preset novo usa glitch de tela cheia (decisão documentada no CATALOGO.md).
 */

/**
 * "Typewriter" — revela `text` caractere a caractere (não palavra a palavra).
 * Retorna o texto visível até o frame atual + se o cursor "|" deve piscar
 * (usado em citação/depoimento — tom mais pessoal, cadência de fala real).
 */
export function typewriterReveal(
  text: string,
  frame: number,
  fps: number,
  startFrame: number,
  opts: {charsPerSecond?: number} = {}
): {visibleText: string; done: boolean; cursorOn: boolean} {
  const {charsPerSecond = 22} = opts;
  const localFrame = Math.max(0, frame - startFrame);
  const charsShown = Math.floor((localFrame / fps) * charsPerSecond);
  const done = charsShown >= text.length;
  const visibleText = text.slice(0, Math.min(charsShown, text.length));
  // Cursor pisca em ciclo de 16 frames (~0.53s a 30fps) enquanto não terminou;
  // some ao terminar (não fica piscando pra sempre depois do texto pronto).
  const cursorOn = !done && Math.floor(localFrame / 8) % 2 === 0;
  return {visibleText, done, cursorOn};
}

/**
 * "Split enter" — elemento entra de um lado (esquerda/direita) da tela,
 * generalização horizontal do `slideFadeIn` — usado no preset `splitReveal`
 * pra elementos que "se encontram" no centro (bom pra Comparativo: cada
 * opção vem do seu lado).
 */
export function splitEnter(
  frame: number,
  fps: number,
  startFrame: number,
  opts: {side: 'left' | 'right'; distance?: number; durationInFrames?: number; easing?: (t: number) => number} = {
    side: 'left',
  }
): {opacity: number; transform: string} {
  const {side, distance = 140, durationInFrames = 22, easing = EASE_OUT_STRONG} = opts;
  const localFrame = frame - startFrame;
  const progress = interpolate(localFrame, [0, durationInFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing,
  });
  const signedDistance = side === 'left' ? -distance : distance;
  const offset = (1 - progress) * signedDistance;
  const opacity = interpolate(localFrame, [0, durationInFrames * 0.6], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return {opacity, transform: `translateX(${offset}px)`};
}

/**
 * "Zoom punch" — escala agressiva de entrada (parte de bem maior ou bem
 * menor que 1 e "estala" até o valor final) — usado no preset `zoomPunch`
 * pra pontos de ênfase (número, badge, produto). Diferente de `popIn`
 * (spring físico): aqui o estalo vem do easing back-out, mais "corte de
 * vídeo" do que "objeto físico".
 */
export function zoomPunchIn(
  frame: number,
  startFrame: number,
  opts: {fromScale?: number; toScale?: number; durationInFrames?: number} = {}
): number {
  const {fromScale = 1.6, toScale = 1, durationInFrames = 14} = opts;
  const progress = interpolate(frame - startFrame, [0, durationInFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: EASE_BOUNCE_OUT,
  });
  return fromScale + (toScale - fromScale) * progress;
}

/**
 * "Whip pan" — transição de corte rápido: a cena sai borrada (blur alto +
 * desloca horizontalmente) e a próxima entra igual, se resolvendo no centro.
 * Retorna o blur (px) e o deslocamento horizontal (%) pra aplicar em CADA
 * segmento (o de saída anima 0→pico, o de entrada anima pico→0 — ver
 * `MotionTransition.tsx`). Duração curta (8-12f) — é um corte, não um fade.
 */
export function whipPanProgress(
  frame: number,
  startFrame: number,
  durationInFrames = 10
): {blurPx: number; translateXPercent: number} {
  const progress = interpolate(frame - startFrame, [0, durationInFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  // Blur sobe rápido e desce rápido (pico no meio) — formato de "sino" simples.
  const blurPx = Math.sin(progress * Math.PI) * 26;
  const translateXPercent = (1 - progress) * -18;
  return {blurPx, translateXPercent};
}

/**
 * "Flash pulse" — pulso curto de opacidade (0→pico→0), usado no `matchCut`
 * (reforça a sensação de corte físico, tipo "clarão" de flash de câmera) e
 * como `highlight: 'flash'` de destaque de número/dado.
 */
export function flashPulse(frame: number, startFrame: number, durationInFrames = 8): number {
  const progress = interpolate(frame - startFrame, [0, durationInFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return Math.sin(progress * Math.PI);
}

/**
 * "Scale pop de keyword" — usado no `highlight: 'scalePop'` (legenda
 * palavra-a-palavra 2026: a palavra-chave "estala" um pouco maior que as
 * outras e assenta). Diferente de `popIn` — aqui é SÓ escala (sem
 * translateY), pensado pra aplicar em cima de uma palavra que já entrou.
 */
export function scalePopKeyword(frame: number, startFrame: number, durationInFrames = 12): number {
  const progress = interpolate(frame - startFrame, [0, durationInFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: EASE_BOUNCE_OUT,
  });
  return interpolate(progress, [0, 1], [1.35, 1]);
}
