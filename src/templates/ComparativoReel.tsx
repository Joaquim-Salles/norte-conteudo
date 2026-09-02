import React from 'react';
import {AbsoluteFill, Sequence, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Frame} from '../lib/Frame';
import {CtaBand} from '../lib/CtaBand';
import {Badge} from '../lib/Badge';
import {colors} from '../lib/tokens';
import {getTheme, getThemeForProduct, type Theme} from '../lib/themes';
import {IconCheck, IconX} from '../lib/icons';
import {popIn, slideFadeIn, splitEnter} from '../lib/motion';
import {KineticText} from '../lib/KineticText';
import {MotionTransition} from '../lib/MotionTransition';
import {getMotionStyle, getEasingFn, scalePace, type MotionStyleName, type MotionStyle} from '../lib/motionStyles';
import type {ComparativoReelData} from '../lib/types';

/**
 * Template NOVO (Round C, 2026-09-01) — Comparativo Direto, versão REEL. É o
 * primeiro tipo de conteúdo animado além dos 2 originais (Dado vs. Achismo,
 * Metodologia) — ver docs/plano-catalogo-em-escala.md Round C. Escolhido
 * porque é o par natural do preset `splitReveal` (2 opções que se opõem —
 * "cada lado vem do seu lado e se encontra no meio" é literalmente a
 * estrutura do conteúdo, não só um efeito por cima).
 *
 * Estrutura em 5 `<Sequence>`:
 *  1. INTRO — badge "Comparativo" + títulos A/B, ainda sem os itens.
 *  2. TRANSIÇÃO 1.
 *  3. CONFRONTO — as 2 colunas inteiras entram de lados opostos (A da
 *     esquerda, B da direita — `splitEnter`), selo "VS" estala no centro, e
 *     os itens de cada coluna aparecem em stagger (cada item "chega" na sua
 *     vez, não a lista toda de uma vez).
 *  4. TRANSIÇÃO 2.
 *  5. CTA.
 *
 * `motionStyle?: MotionStyleName` (default `kineticForte`) — mesmo sistema
 * dos outros 2 Reels (src/lib/motionStyles.ts). Como este template NASCEU
 * depois do Round C, não existe "aparência original" pra preservar — mas o
 * default continua sendo `kineticForte` por consistência com o resto do
 * catálogo.
 */

function computeDurations(ms: MotionStyle, totalItens: number) {
  const intro = scalePace(ms, 46);
  const transition1 = ms.transition === 'cutSeco' ? 2 : scalePace(ms, 12, {min: 6});
  const confronto = scalePace(ms, 56 + totalItens * 26);
  const transition2 = ms.transition === 'cutSeco' ? 2 : scalePace(ms, 12, {min: 6});
  const cta = scalePace(ms, 44);
  return {intro, transition1, confronto, transition2, cta, total: intro + transition1 + confronto + transition2 + cta};
}

export function comparativoReelDurationInFrames(totalItens: number, motionStyle?: MotionStyleName): number {
  return computeDurations(getMotionStyle(motionStyle), totalItens).total;
}

const IntroSegment: React.FC<{tituloA: string; tituloB: string; ms: MotionStyle; theme: Theme}> = ({
  tituloA,
  tituloB,
  ms,
  theme,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const easing = getEasingFn(ms.easing);
  const badgeScale = popIn(frame, fps, 0, ms.spring);
  const subAnim = slideFadeIn(frame, fps, 14, {distance: 18, easing});

  return (
    <AbsoluteFill style={{background: colors.black, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 84px'}}>
      <div style={{transform: `scale(${badgeScale})`, alignSelf: 'flex-start'}}>
        <Badge>Comparativo</Badge>
      </div>
      <h1 style={{fontSize: 62, fontWeight: 700, color: colors.white, lineHeight: 1.12, margin: '32px 0 0', letterSpacing: -1}}>
        <KineticText text={tituloA} ms={ms} startFrame={8} side="left" distance={24} durationInFrames={14} wordGap={14} style={{}} />
      </h1>
      <div style={{opacity: subAnim.opacity, transform: subAnim.transform, marginTop: 14}}>
        <span style={{fontSize: 34, fontWeight: 400, fontStyle: 'italic', color: theme.colors.base}}>vs.</span>
        <h1 style={{fontSize: 62, fontWeight: 700, color: theme.colors.base, lineHeight: 1.12, margin: '10px 0 0', letterSpacing: -1}}>
          {tituloB}
        </h1>
      </div>
    </AbsoluteFill>
  );
};

const ConfrontoSegment: React.FC<{
  tituloA: string;
  tituloB: string;
  itens: {label: string; a: string; b: string}[];
  ms: MotionStyle;
  theme: Theme;
}> = ({tituloA, tituloB, itens, ms, theme}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const easing = getEasingFn(ms.easing);
  const colA = splitEnter(frame, fps, 0, {side: 'left', distance: 500, durationInFrames: 20, easing});
  const colB = splitEnter(frame, fps, 0, {side: 'right', distance: 500, durationInFrames: 20, easing});
  const vsScale = popIn(frame, fps, 14, ms.spring);
  const itemStagger = Math.max(6, ms.staggerFrames * 5);

  return (
    <AbsoluteFill style={{background: colors.white}}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          width: '50%',
          background: '#dcdce6',
          padding: '150px 32px 0 64px',
          opacity: colA.opacity,
          transform: colA.transform,
        }}
      >
        <span style={{fontSize: 24, fontWeight: 700, letterSpacing: 2, color: '#6c6c80', textTransform: 'uppercase'}}>
          {tituloA}
        </span>
        <div style={{marginTop: 28, display: 'flex', flexDirection: 'column', gap: 24}}>
          {itens.map((item, i) => {
            const itemAnim = slideFadeIn(frame, fps, 24 + i * itemStagger, {distance: 16, easing});
            return (
              <div key={i} style={{display: 'flex', alignItems: 'flex-start', gap: 12, opacity: itemAnim.opacity, transform: itemAnim.transform}}>
                <div style={{marginTop: 2}}>
                  <IconX size={20} color="#8a8a9c" strokeWidth={2.8} />
                </div>
                <span style={{fontSize: 22, fontWeight: 400, color: '#54546a', lineHeight: 1.32}}>{item.a}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: '50%',
          right: 0,
          background: `linear-gradient(160deg, ${theme.colors.light} 0%, ${theme.colors.dark} 100%)`,
          padding: '150px 64px 0 32px',
          opacity: colB.opacity,
          transform: colB.transform,
        }}
      >
        <span style={{fontSize: 24, fontWeight: 700, letterSpacing: 2, color: colors.white, textTransform: 'uppercase'}}>
          {tituloB}
        </span>
        <div style={{marginTop: 28, display: 'flex', flexDirection: 'column', gap: 24}}>
          {itens.map((item, i) => {
            const itemAnim = slideFadeIn(frame, fps, 24 + i * itemStagger, {distance: 16, easing});
            return (
              <div key={i} style={{display: 'flex', alignItems: 'flex-start', gap: 12, opacity: itemAnim.opacity, transform: itemAnim.transform}}>
                <div style={{marginTop: 2}}>
                  <IconCheck size={20} color={colors.white} strokeWidth={3} />
                </div>
                <span style={{fontSize: 22, fontWeight: 700, color: colors.white, lineHeight: 1.32}}>{item.b}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          top: 300,
          left: '50%',
          transform: `translateX(-50%) scale(${vsScale})`,
          background: colors.accent,
          color: colors.white,
          fontWeight: 700,
          fontSize: 24,
          padding: '14px 26px',
          borderRadius: 999,
          boxShadow: '0 16px 34px -8px rgba(0,0,0,0.5)',
          zIndex: 2,
        }}
      >
        VS
      </div>
    </AbsoluteFill>
  );
};

const CtaSegment: React.FC<{ms: MotionStyle}> = ({ms}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const easing = getEasingFn(ms.easing);
  const titleAnim = slideFadeIn(frame, fps, 0, {distance: 50, durationInFrames: 18, easing});
  const ctaAnim = slideFadeIn(frame, fps, 8, {distance: 60, durationInFrames: 20, easing});
  const badgeScale = popIn(frame, fps, 0, ms.spring);

  return (
    <AbsoluteFill style={{background: colors.black}}>
      <div style={{position: 'absolute', left: 72, right: 72, bottom: 220}}>
        <div style={{opacity: titleAnim.opacity, transform: titleAnim.transform}}>
          <div style={{display: 'inline-block', transform: `scale(${badgeScale})`}}>
            <Badge>Comparativo</Badge>
          </div>
          <h2 style={{fontSize: 54, fontWeight: 700, color: colors.white, margin: '28px 0 44px', lineHeight: 1.15}}>
            Quer ver isso no seu negócio?
          </h2>
        </div>
        <div style={{opacity: ctaAnim.opacity, transform: ctaAnim.transform}}>
          <CtaBand label="Quero ver isso no meu negócio" sub="fala com a gente no WhatsApp — link na bio" />
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const ComparativoReel: React.FC<ComparativoReelData> = ({
  tituloA,
  tituloB,
  itens,
  produto,
  theme,
  motionStyle,
}) => {
  const t = produto ? getThemeForProduct(produto) : getTheme(theme ?? 'marca');
  const ms = getMotionStyle(motionStyle);
  const itensLimitados = itens.slice(0, 3);
  const d = computeDurations(ms, itensLimitados.length);

  return (
    <Frame background={colors.black} wordmarkColor={colors.white}>
      <Sequence from={0} durationInFrames={d.intro}>
        <IntroSegment tituloA={tituloA} tituloB={tituloB} ms={ms} theme={t} />
      </Sequence>
      <Sequence from={d.intro} durationInFrames={d.transition1}>
        <MotionTransition motionStyle={ms} durationInFrames={d.transition1} accentColor={colors.accent} veilColor={colors.white} />
      </Sequence>
      <Sequence from={d.intro + d.transition1} durationInFrames={d.confronto}>
        <ConfrontoSegment tituloA={tituloA} tituloB={tituloB} itens={itensLimitados} ms={ms} theme={t} />
      </Sequence>
      <Sequence from={d.intro + d.transition1 + d.confronto} durationInFrames={d.transition2}>
        <MotionTransition
          motionStyle={ms}
          durationInFrames={d.transition2}
          accentColor={colors.accent}
          veilColor={t.colors.dark}
          glowColor="rgba(0,0,0,0.85)"
        />
      </Sequence>
      <Sequence from={d.intro + d.transition1 + d.confronto + d.transition2} durationInFrames={d.cta}>
        <CtaSegment ms={ms} />
      </Sequence>
    </Frame>
  );
};

export const comparativoReelDefaultProps: ComparativoReelData = {
  tituloA: 'Do jeito antigo',
  tituloB: 'Com a Norte',
  itens: [
    {label: 'Controle de estoque', a: 'Planilha manual, atualizada de vez em quando', b: 'Sincronizado em tempo real com o Omie'},
    {label: 'Inventário', a: 'Conta de cabeça, sem lote nem validade', b: 'Leitura por QR code, etiqueta inteligente'},
    {label: 'Decisão de reposição', a: 'No achismo, só quando já faltou', b: 'Baseada em dado real de giro'},
  ],
  produto: 'ntbEstoque',
};
