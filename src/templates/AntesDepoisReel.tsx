import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import {Frame} from '../lib/Frame';
import {CtaBand} from '../lib/CtaBand';
import {Badge} from '../lib/Badge';
import {colors} from '../lib/tokens';
import {getTheme, type Theme} from '../lib/themes';
import {IconAlert, IconCheck, IconGrowth} from '../lib/icons';
import {GhostArrowUp} from '../lib/GhostGraphics';
import {popIn, slideFadeIn} from '../lib/motion';
import {KineticText} from '../lib/KineticText';
import {MotionTransition} from '../lib/MotionTransition';
import {getMotionStyle, getEasingFn, resolveHighlight, scalePace, type MotionStyleName, type MotionStyle} from '../lib/motionStyles';
import type {AntesDepoisReelData} from '../lib/types';

/**
 * Reel NOVO (Round D, 2026-09-01, docs/plano-catalogo-em-escala.md) — versão
 * animada de Antes/Depois. Terceiro Reel novo desta rodada, ALÉM dos 2 pedidos
 * (Depoimento/Bastidores) — decisão de julgamento documentada aqui: o preset
 * `matchCut` já existia desde o Round C com a `quandoUsar` dizendo
 * literalmente "qualquer conteúdo com 2 estados que se opõem" e o
 * `CATALOGO.md` já registrava "match cut é o padrão real pra antes/depois"
 * como achado de pesquisa — só que NENHUM tipo de conteúdo do catálogo até
 * agora tinha uma estrutura "2 estados que se opõem" pra usar esse preset de
 * verdade (Comparativo é 2 OPÇÕES concretas com vários atributos, não um
 * ANTES/DEPOIS temporal). Antes/Depois é o par semântico óbvio que faltava —
 * o flash de corte reforça no TEMPO a mesma virada que o selo "Com a Norte"
 * já reforça no Still. Optei por criar este Reel em vez de VitrineProduto ou
 * um tipo do zero porque a infraestrutura (preset, texto na doc) já apontava
 * pra essa direção; VitrineProduto ficaria bem com `zoomPunch`, mas cruzar
 * produto+screenshot+device frame dentro de uma timeline animada é trabalho
 * de escopo maior (moldura de device com estado antes/depois do próprio
 * app) — fica de fora desta rodada por tempo, não por falta de sentido.
 *
 * Estrutura em 5 `<Sequence>`:
 *  1. ANTES — bloco apagado (cinza), `antesTexto` via `KineticText`.
 *  2. TRANSIÇÃO 1 — o corte reforça "isso vai virar outra coisa".
 *  3. DEPOIS — bloco vivo (gradiente do `theme`), `depoisTexto`, metrica com
 *     highlight do preset, selo "Com a Norte".
 *  4. TRANSIÇÃO 2.
 *  5. CTA.
 *
 * `motionStyle?: MotionStyleName` — omitido = `kineticForte` (mesma
 * convenção do resto do catálogo de Reel).
 */

function computeDurations(ms: MotionStyle) {
  const antes = scalePace(ms, 66);
  const transition1 = ms.transition === 'cutSeco' ? 2 : scalePace(ms, 12, {min: 6});
  const depois = scalePace(ms, 82);
  const transition2 = ms.transition === 'cutSeco' ? 2 : scalePace(ms, 10, {min: 5});
  const cta = scalePace(ms, 42);
  return {antes, transition1, depois, transition2, cta, total: antes + transition1 + depois + transition2 + cta};
}

export function antesDepoisReelDurationInFrames(motionStyle?: MotionStyleName): number {
  return computeDurations(getMotionStyle(motionStyle)).total;
}

const AntesSegment: React.FC<{antesLabel: string; antesTexto: string; ms: MotionStyle}> = ({antesLabel, antesTexto, ms}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const easing = getEasingFn(ms.easing);
  const labelAnim = slideFadeIn(frame, fps, 2, {distance: 18, easing});
  const iconScale = popIn(frame, fps, 0, ms.spring);

  return (
    <AbsoluteFill style={{background: '#dcdce6', padding: '0 80px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
      <div style={{position: 'absolute', right: -10, bottom: 200}}>
        <GhostArrowUp color="#54546a" opacity={0.09} size={220} />
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: 14, opacity: labelAnim.opacity, transform: labelAnim.transform}}>
        <div style={{transform: `scale(${iconScale})`}}>
          <IconAlert size={34} color="#6c6c80" strokeWidth={2.4} />
        </div>
        <span style={{fontSize: 32, fontWeight: 700, letterSpacing: 3, color: '#6c6c80', textTransform: 'uppercase'}}>{antesLabel}</span>
      </div>
      <p style={{fontSize: 52, fontWeight: 400, color: '#54546a', lineHeight: 1.3, margin: '36px 0 0', maxWidth: 880}}>
        <KineticText text={antesTexto} ms={ms} startFrame={10} side="left" distance={24} style={{fontSize: 52, fontWeight: 400, color: '#54546a'}} />
      </p>
    </AbsoluteFill>
  );
};

const DepoisSegment: React.FC<{depoisLabel: string; depoisTexto: string; metrica?: string; theme: Theme; ms: MotionStyle}> = ({
  depoisLabel,
  depoisTexto,
  metrica,
  theme,
  ms,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const easing = getEasingFn(ms.easing);
  const labelAnim = slideFadeIn(frame, fps, 2, {distance: 18, easing});
  const iconScale = popIn(frame, fps, 0, ms.spring);
  const seloScale = popIn(frame, fps, 14, ms.spring);
  const {scale: metricaScale, flashOpacity} = resolveHighlight(ms, frame, 46, 16);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(155deg, ${theme.colors.light} 0%, ${theme.colors.dark} 100%)`,
        padding: '0 80px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div style={{position: 'absolute', right: 4, bottom: 220}}>
        <GhostArrowUp color={colors.white} opacity={0.1} size={200} />
      </div>

      <div style={{transform: `scale(${seloScale})`, alignSelf: 'flex-start', marginBottom: 8}}>
        <div
          style={{
            display: 'inline-block',
            background: colors.accent,
            color: colors.white,
            fontWeight: 700,
            fontSize: 22,
            padding: '10px 20px',
            borderRadius: 999,
            boxShadow: '0 12px 26px -8px rgba(0,0,0,0.4)',
          }}
        >
          Com a Norte
        </div>
      </div>

      <div style={{display: 'flex', alignItems: 'center', gap: 14, opacity: labelAnim.opacity, transform: labelAnim.transform}}>
        <div style={{transform: `scale(${iconScale})`}}>
          <IconCheck size={30} color={colors.accent} strokeWidth={3} />
        </div>
        <span style={{fontSize: 32, fontWeight: 700, letterSpacing: 3, color: colors.accent, textTransform: 'uppercase'}}>{depoisLabel}</span>
      </div>

      <p style={{fontSize: 52, fontWeight: 700, color: colors.white, lineHeight: 1.24, margin: '30px 0 0', maxWidth: 880}}>
        <KineticText
          text={depoisTexto}
          ms={ms}
          startFrame={10}
          side="right"
          durationInFrames={12}
          wordGap={14}
          style={{fontSize: 52, fontWeight: 700, color: colors.white}}
        />
      </p>

      {metrica ? (
        <div style={{position: 'relative', marginTop: 34, display: 'inline-flex', alignSelf: 'flex-start'}}>
          {flashOpacity > 0 ? (
            <div
              style={{
                position: 'absolute',
                inset: -36,
                background: `radial-gradient(closest-side, rgba(255,255,255,${flashOpacity}) 0%, rgba(255,255,255,0) 72%)`,
                pointerEvents: 'none',
              }}
            />
          ) : null}
          <div
            style={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              background: 'rgba(255,255,255,0.14)',
              borderRadius: 16,
              padding: '16px 26px',
              transform: `scale(${metricaScale})`,
              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.2)',
            }}
          >
            <IconGrowth size={30} color={colors.white} strokeWidth={2.6} />
            <span style={{fontSize: 44, fontWeight: 700, color: colors.white}}>{metrica}</span>
          </div>
        </div>
      ) : null}
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
      <div style={{position: 'absolute', right: -70, top: 130}}>
        <GhostArrowUp color={colors.white} opacity={0.08} size={380} />
      </div>
      <div style={{position: 'absolute', left: 72, right: 72, bottom: 220}}>
        <div style={{opacity: titleAnim.opacity, transform: titleAnim.transform}}>
          <div style={{display: 'inline-block', transform: `scale(${badgeScale})`}}>
            <Badge>Antes / Depois</Badge>
          </div>
          <h2 style={{fontSize: 54, fontWeight: 700, color: colors.white, margin: '28px 0 44px', lineHeight: 1.15}}>Quer essa virada no seu negócio?</h2>
        </div>
        <div style={{opacity: ctaAnim.opacity, transform: ctaAnim.transform}}>
          <CtaBand label="Quero isso" sub="fala com a gente no WhatsApp — link na bio" />
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const AntesDepoisReel: React.FC<AntesDepoisReelData> = ({
  antesLabel = 'Antes',
  antesTexto,
  depoisLabel = 'Depois',
  depoisTexto,
  metrica,
  theme = 'marca',
  motionStyle,
}) => {
  const t = getTheme(theme);
  const ms = getMotionStyle(motionStyle);
  const d = computeDurations(ms);

  return (
    <Frame background={colors.black} wordmarkColor={colors.white}>
      <Sequence from={0} durationInFrames={d.antes}>
        <AntesSegment antesLabel={antesLabel} antesTexto={antesTexto} ms={ms} />
      </Sequence>
      <Sequence from={d.antes} durationInFrames={d.transition1}>
        <MotionTransition motionStyle={ms} durationInFrames={d.transition1} accentColor={colors.accent} veilColor={t.colors.dark} />
      </Sequence>
      <Sequence from={d.antes + d.transition1} durationInFrames={d.depois}>
        <DepoisSegment depoisLabel={depoisLabel} depoisTexto={depoisTexto} metrica={metrica} theme={t} ms={ms} />
      </Sequence>
      <Sequence from={d.antes + d.transition1 + d.depois} durationInFrames={d.transition2}>
        <MotionTransition
          motionStyle={ms}
          durationInFrames={d.transition2}
          accentColor={colors.accent}
          veilColor={colors.black}
          glowColor="rgba(0,0,0,0.85)"
        />
      </Sequence>
      <Sequence from={d.antes + d.transition1 + d.depois + d.transition2} durationInFrames={d.cta}>
        <CtaSegment ms={ms} />
      </Sequence>
    </Frame>
  );
};

export const antesDepoisReelDefaultProps: AntesDepoisReelData = {
  antesTexto: 'Inventário fechava sempre com divergência e ninguém sabia explicar o motivo.',
  depoisTexto: 'Inventário bate com o sistema todo mês, sem retrabalho.',
  metrica: '-92% divergência',
  theme: 'estoque',
};
