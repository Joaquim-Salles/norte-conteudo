import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {slideFadeIn, staggerWords, typewriterReveal, splitEnter, scalePopKeyword} from './motion';
import {getEasingFn, type MotionStyle} from './motionStyles';

type KineticTextProps = {
  text: string;
  ms: MotionStyle;
  startFrame: number;
  style: React.CSSProperties;
  /** Só usado no textEntry `splitMeet` — de que lado esse bloco entra. Default 'left'. */
  side?: 'left' | 'right';
  /** margin-right entre palavras, quando textEntry usa palavras (staggerWord). Default 14. */
  wordGap?: number;
  /** Override de distância (px) de entrada — repassado ao primitivo correspondente. */
  distance?: number;
  /** Override de duração (frames) de cada entrada individual (palavra/bloco). */
  durationInFrames?: number;
};

/**
 * Texto com ENTRADA determinada pelo `motionStyle` (Round C,
 * docs/plano-catalogo-em-escala.md) — generaliza o que antes era só
 * `staggerWords` hardcoded em cada Reel. Dispatcha por `ms.textEntry`:
 *  - `staggerWord`: palavra a palavra (comportamento original dos 2 Reels
 *    existentes). Se `ms.highlight === 'scalePop'`, a ÚLTIMA palavra (a
 *    "palavra-chave" da frase, por convenção de brief) ganha um estalo de
 *    escala extra — reproduz o "scale pop na keyword" que a pesquisa 2026
 *    aponta como padrão de legenda.
 *  - `slideFadeBlock`: o texto inteiro entra como 1 bloco (sem stagger) —
 *    minimalFade/matchCut, ritmo mais contido.
 *  - `typewriter`: caractere a caractere, com cursor piscando.
 *  - `splitMeet`: o bloco inteiro entra de um lado (`side`) — usado em
 *    conjunto com outro elemento entrando do lado oposto na mesma cena.
 */
export const KineticText: React.FC<KineticTextProps> = ({
  text,
  ms,
  startFrame,
  style,
  side = 'left',
  wordGap = 14,
  distance,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const easing = getEasingFn(ms.easing);

  if (ms.textEntry === 'typewriter') {
    const {visibleText, cursorOn} = typewriterReveal(text, frame, fps, startFrame);
    return (
      <span style={style}>
        {visibleText}
        <span style={{opacity: cursorOn ? 1 : 0}}>|</span>
      </span>
    );
  }

  if (ms.textEntry === 'slideFadeBlock') {
    const anim = slideFadeIn(frame, fps, startFrame, {distance: distance ?? 22, durationInFrames: durationInFrames ?? 16, easing});
    return (
      <span style={{...style, display: 'inline-block', opacity: anim.opacity, transform: anim.transform}}>{text}</span>
    );
  }

  if (ms.textEntry === 'splitMeet') {
    const anim = splitEnter(frame, fps, startFrame, {side, distance: distance ?? 90, durationInFrames: durationInFrames ?? 20, easing});
    return (
      <span style={{...style, display: 'inline-block', opacity: anim.opacity, transform: anim.transform}}>{text}</span>
    );
  }

  // ms.textEntry === 'staggerWord'
  const words = staggerWords(text, frame, fps, startFrame, {
    staggerFrames: ms.staggerFrames,
    durationInFrames: durationInFrames ?? 14,
    distance: distance ?? 22,
    easing,
  });
  const lastIndex = words.length - 1;
  return (
    <span style={style}>
      {words.map((w, i) => {
        const keywordScale =
          ms.highlight === 'scalePop' && i === lastIndex
            ? scalePopKeyword(frame, startFrame + lastIndex * ms.staggerFrames + 10, 14)
            : 1;
        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              opacity: w.opacity,
              transform: `${w.transform} scale(${keywordScale})`,
              // Achado real de QA (Round D, 2026-09-01, ver
              // ComparativoReel-whipPanCut-vendas.mp4): sem transformOrigin
              // explícito, o scale por padrão cresce a partir do CENTRO do
              // span — pra um estalo de ~1.35x (highlight scalePop), isso
              // invade visualmente o espaço da palavra ANTERIOR (overlap
              // real no vídeo, não só metadado). 'left center' faz o estalo
              // crescer só pra direita, nunca sobre a palavra anterior —
              // seguro pra qualquer tamanho/posição de palavra-chave.
              transformOrigin: 'left center',
              marginRight: wordGap,
            }}
          >
            {w.word}
          </span>
        );
      })}
    </span>
  );
};
