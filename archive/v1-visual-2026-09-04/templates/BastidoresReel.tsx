import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import {Frame} from '../lib/Frame';
import {colors} from '../lib/tokens';
import {IconCompass, IconCheck} from '../lib/icons';
import {GhostBars, GhostCheck} from '../lib/GhostGraphics';
import {slideFadeIn} from '../lib/motion';
import {KineticText} from '../lib/KineticText';
import {MotionTransition} from '../lib/MotionTransition';
import {getMotionStyle, getEasingFn, scalePace, type MotionStyleName, type MotionStyle} from '../lib/motionStyles';
import type {BastidoresReelData} from '../lib/types';

/**
 * Reel NOVO (Round D, 2026-09-01, docs/plano-catalogo-em-escala.md) — versão
 * animada de Bastidores/Como Trabalhamos (variante `manifesto`). Par natural
 * do preset `minimalFade`: tom sóbrio, cortes secos por cross-dissolve, sem
 * floreio — reforça "confiança/cultura", não venda direta (mesma lógica que
 * já embasou `minimalFade` em `motionStyles.ts`: "bom pra Bastidores/
 * Depoimento, tom mais sóbrio").
 *
 * DECISÃO DE ESCOPO (herdada do Still, `Bastidores.tsx`, mantida aqui por
 * consistência de gênero): este é o único Reel do catálogo SEM `CtaBand`
 * cheio no fechamento — a pesquisa de mercado que embasou o Still concorda
 * que bastidores constrói confiança de fundo de funil, forçar CTA agressivo
 * contradiz o próprio gênero. O fechamento aqui é uma linha discreta
 * ("link na bio"), não uma banda de destaque — a MESMA regra do Still,
 * aplicada no tempo em vez de no espaço.
 *
 * Estrutura em 5 `<Sequence>`:
 *  1. TÍTULO — eyebrow + afirmação central (bold+itálico SEMPRE, mesma trava
 *     de voz de marca do Still — `motionStyle` varia a ENTRADA do texto, não
 *     o peso/estilo da fonte, que é hardcoded por decisão documentada desde
 *     a criação do tipo).
 *  2. TRANSIÇÃO 1.
 *  3. PRINCÍPIOS — até 3 princípios em stagger (cada um "chega" na sua vez,
 *     ícone `IconCheck`).
 *  4. TRANSIÇÃO 2.
 *  5. FECHAMENTO — bússola + linha discreta "link na bio" (SEM CtaBand).
 *
 * `motionStyle?: MotionStyleName` — omitido = `kineticForte` (mesma
 * convenção do resto do catálogo de Reel — nasceu depois do Round C, sem
 * "aparência original" a preservar, mas default consistente).
 */

function computeDurations(ms: MotionStyle, totalPrincipios: number) {
  const titulo = scalePace(ms, 62);
  const transition1 = ms.transition === 'cutSeco' ? 2 : scalePace(ms, 12, {min: 6});
  const principios = scalePace(ms, 40 + totalPrincipios * 28);
  const transition2 = ms.transition === 'cutSeco' ? 2 : scalePace(ms, 10, {min: 5});
  const fechamento = scalePace(ms, 46);
  return {
    titulo,
    transition1,
    principios,
    transition2,
    fechamento,
    total: titulo + transition1 + principios + transition2 + fechamento,
  };
}

export function bastidoresReelDurationInFrames(totalPrincipios: number, motionStyle?: MotionStyleName): number {
  return computeDurations(getMotionStyle(motionStyle), totalPrincipios).total;
}

const TituloSegment: React.FC<{eyebrow: string; titulo: string; ms: MotionStyle}> = ({eyebrow, titulo, ms}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const easing = getEasingFn(ms.easing);
  const eyebrowAnim = slideFadeIn(frame, fps, 0, {distance: 16, easing});

  return (
    <AbsoluteFill style={{background: colors.black, padding: '0 76px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
      <div style={{position: 'absolute', left: -60, top: -50}}>
        <GhostCheck color={colors.white} opacity={0.04} size={280} />
      </div>

      <div style={{display: 'flex', alignItems: 'center', gap: 14, opacity: eyebrowAnim.opacity, transform: eyebrowAnim.transform}}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: '50%',
            border: '2px solid rgba(255,255,255,0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <IconCompass size={24} color={colors.white} strokeWidth={2} />
        </div>
        <span style={{fontSize: 28, fontWeight: 700, letterSpacing: 2, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase'}}>
          {eyebrow}
        </span>
      </div>

      {/* Titulo mantem SEMPRE bold+italic — voz de marca hardcoded, mesma
          decisao documentada no Still (Bastidores.tsx): motionStyle varia a
          entrada, nunca a fonte do manifesto. */}
      <h1 style={{fontSize: 62, lineHeight: 1.16, margin: '36px 0 0', maxWidth: 900}}>
        <KineticText
          text={titulo}
          ms={ms}
          startFrame={10}
          side="left"
          distance={26}
          durationInFrames={16}
          wordGap={16}
          style={{fontSize: 62, fontWeight: 700, fontStyle: 'italic', color: colors.white}}
        />
      </h1>
    </AbsoluteFill>
  );
};

const PrincipiosSegment: React.FC<{principios: string[]; ms: MotionStyle}> = ({principios, ms}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const easing = getEasingFn(ms.easing);
  const itemStagger = Math.max(16, ms.staggerFrames * 8 + 16);
  const labelAnim = slideFadeIn(frame, fps, 0, {distance: 16, easing});

  return (
    <AbsoluteFill style={{background: colors.primaryDark, padding: '0 76px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
      <div style={{position: 'absolute', right: -90, bottom: -70}}>
        <GhostBars color={colors.white} opacity={0.07} width={520} />
      </div>

      <span
        style={{
          fontSize: 26,
          fontWeight: 700,
          letterSpacing: 2,
          color: colors.accent,
          textTransform: 'uppercase',
          opacity: labelAnim.opacity,
          transform: labelAnim.transform,
        }}
      >
        Como sustentamos isso
      </span>

      <div style={{marginTop: 34, display: 'flex', flexDirection: 'column', gap: 30}}>
        {principios.slice(0, 3).map((p, i) => {
          const itemAnim = slideFadeIn(frame, fps, 10 + i * itemStagger, {distance: 22, easing});
          return (
            <div key={i} style={{display: 'flex', alignItems: 'flex-start', gap: 16, opacity: itemAnim.opacity, transform: itemAnim.transform}}>
              <div style={{marginTop: 4}}>
                <IconCheck size={24} color={colors.accent} strokeWidth={3} />
              </div>
              <span style={{fontSize: 32, fontWeight: 400, color: 'rgba(255,255,255,0.9)', lineHeight: 1.36, maxWidth: 800}}>{p}</span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/**
 * Fechamento SEM CtaBand — decisão de escopo herdada do Still (ver comentário
 * no topo do arquivo). So bussola + linha discreta.
 */
const FechamentoSegment: React.FC<{ms: MotionStyle}> = ({ms}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const easing = getEasingFn(ms.easing);
  const anim = slideFadeIn(frame, fps, 0, {distance: 20, durationInFrames: 20, easing});

  return (
    <AbsoluteFill style={{background: colors.black, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{opacity: anim.opacity, transform: anim.transform, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24}}>
        <div
          style={{
            width: 84,
            height: 84,
            borderRadius: '50%',
            border: '2px solid rgba(255,255,255,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <IconCompass size={40} color={colors.white} strokeWidth={2} />
        </div>
        <span style={{fontSize: 24, fontWeight: 400, fontStyle: 'italic', color: 'rgba(255,255,255,0.6)'}}>
          Assim a gente trabalha — link na bio
        </span>
      </div>
    </AbsoluteFill>
  );
};

export const BastidoresReel: React.FC<BastidoresReelData> = ({eyebrow = 'Como trabalhamos', titulo, principios, motionStyle}) => {
  const ms = getMotionStyle(motionStyle);
  const totalPrincipios = Math.min(principios.length, 3);
  const d = computeDurations(ms, totalPrincipios);

  return (
    <Frame background={colors.black} wordmarkColor={colors.white}>
      <Sequence from={0} durationInFrames={d.titulo}>
        <TituloSegment eyebrow={eyebrow} titulo={titulo} ms={ms} />
      </Sequence>
      <Sequence from={d.titulo} durationInFrames={d.transition1}>
        <MotionTransition motionStyle={ms} durationInFrames={d.transition1} accentColor={colors.accent} veilColor={colors.primaryDark} />
      </Sequence>
      <Sequence from={d.titulo + d.transition1} durationInFrames={d.principios}>
        <PrincipiosSegment principios={principios} ms={ms} />
      </Sequence>
      <Sequence from={d.titulo + d.transition1 + d.principios} durationInFrames={d.transition2}>
        <MotionTransition
          motionStyle={ms}
          durationInFrames={d.transition2}
          accentColor={colors.accent}
          veilColor={colors.black}
          glowColor="rgba(0,0,0,0.85)"
        />
      </Sequence>
      <Sequence from={d.titulo + d.transition1 + d.principios + d.transition2} durationInFrames={d.fechamento}>
        <FechamentoSegment ms={ms} />
      </Sequence>
    </Frame>
  );
};

export const bastidoresReelDefaultProps: BastidoresReelData = {
  titulo: 'Não recomendamos nada antes de ver o dado.',
  principios: [
    'Todo diagnóstico começa medindo o que já existe, não achando.',
    'Nenhuma solução entra sem um número que comprove que ela resolveu.',
    'Se o processo não é repetível, não é método — é sorte.',
  ],
};
