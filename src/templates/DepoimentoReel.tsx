import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import {Frame} from '../lib/Frame';
import {CtaBand} from '../lib/CtaBand';
import {Badge} from '../lib/Badge';
import {SurfaceCard} from '../lib/SurfaceCard';
import {colors} from '../lib/tokens';
import {getTheme, getThemeForProduct, type Theme} from '../lib/themes';
import {IconQuote, IconGrowth} from '../lib/icons';
import {GhostQuote} from '../lib/GhostGraphics';
import {popIn, slideFadeIn} from '../lib/motion';
import {KineticText} from '../lib/KineticText';
import {MotionTransition} from '../lib/MotionTransition';
import {getMotionStyle, getEasingFn, resolveHighlight, scalePace, type MotionStyleName, type MotionStyle} from '../lib/motionStyles';
import type {DepoimentoReelData} from '../lib/types';

/**
 * Reel NOVO (Round D, 2026-09-01, docs/plano-catalogo-em-escala.md) — versão
 * animada de Depoimento/Prova Social. Par natural do preset `typewriter`: a
 * citação do cliente aparece caractere a caractere, cadência de fala real —
 * reforça "isso é a VOZ dele, não nossa reformulação" no tempo (mesma lógica
 * que já embasou `typewriter` em `motionStyles.ts`).
 *
 * Estrutura em 5 `<Sequence>`:
 *  1. CITAÇÃO — a citação inteira via `KineticText` (dispatcha por
 *     `ms.textEntry`; com `typewriter` sai letra a letra), card de atribuição
 *     (iniciais + nome + empresa) só entra DEPOIS que o texto termina — hold
 *     de leitura real, não uma duração fixa arbitrária (ver `capaFrames`).
 *  2. TRANSIÇÃO 1.
 *  3. RESULTADO — corpo (o "depois", nas palavras do cliente) + metrica
 *     (highlight do preset) + selo do produto usado.
 *  4. TRANSIÇÃO 2.
 *  5. CTA.
 *
 * `motionStyle?: MotionStyleName` — omitido = `kineticForte` (mesma
 * convenção de todo o catálogo de Reel, ver `ComparativoReel.tsx`: como este
 * template nasceu depois do Round C, não existe "aparência original" a
 * preservar, mas o default fica igual ao resto por consistência).
 *
 * Regra de escopo mantida do Still (`Depoimento.tsx`): `citacao`/`corpoResultado`
 * sempre vêm do brief, cliente real — Rafael não inventa depoimento de
 * produção. Sem foto de "cliente" (mesmo motivo do Still): atribuição usa
 * iniciais num selo, não rosto genérico de banco de imagem.
 */

const FPS = 30; // formats.reel.fps — fixo no projeto, ver src/lib/tokens.ts

function iniciais(nome: string): string {
  return nome
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('');
}

/**
 * Duração do segmento de citação: pro `textEntry: 'typewriter'`, a duração
 * REAL depende do tamanho do texto (22 chars/seg, ver `typewriterReveal` em
 * `motion.ts`) — uma duração fixa cortaria citações longas no meio ou
 * deixaria citações curtas com um hold artificial longo demais. Pros outros
 * `textEntry` (bloco/stagger/split), o texto inteiro aparece em ~1s
 * independente do tamanho, então o valor-base fixo (escalado por `paceScale`)
 * já é suficiente.
 */
function capaFrames(ms: MotionStyle, citacaoLength: number): number {
  if (ms.textEntry === 'typewriter') {
    const charsPerSecond = 22;
    const typingFrames = Math.ceil((citacaoLength / charsPerSecond) * FPS);
    const holdAfterTyping = Math.round(FPS * 1.5); // tempo de leitura antes do card de atribuição
    const cardEntry = Math.round(FPS * 0.9);
    return Math.max(scalePace(ms, 96), typingFrames + holdAfterTyping + cardEntry);
  }
  return scalePace(ms, 96);
}

function computeDurations(ms: MotionStyle, citacaoLength: number) {
  const capa = capaFrames(ms, citacaoLength);
  const transition1 = ms.transition === 'cutSeco' ? 2 : scalePace(ms, 12, {min: 6});
  const resultado = scalePace(ms, 78);
  const transition2 = ms.transition === 'cutSeco' ? 2 : scalePace(ms, 10, {min: 5});
  const cta = scalePace(ms, 44);
  return {capa, transition1, resultado, transition2, cta, total: capa + transition1 + resultado + transition2 + cta};
}

export function depoimentoReelDurationInFrames(citacaoLength: number, motionStyle?: MotionStyleName): number {
  return computeDurations(getMotionStyle(motionStyle), citacaoLength).total;
}

const CitacaoSegment: React.FC<{citacao: string; cliente: string; empresa?: string; ms: MotionStyle}> = ({
  citacao,
  cliente,
  empresa,
  ms,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const easing = getEasingFn(ms.easing);
  // Card de atribuicao entra so depois do texto "terminar de ser dito" —
  // estimativa conservadora que funciona pros 4 textEntry possiveis (o
  // typewriter e o unico cujo tempo real varia com o tamanho do texto).
  const textFinishEstimate =
    ms.textEntry === 'typewriter' ? Math.ceil((citacao.length / 22) * fps) + 14 : 28;
  const cardAnim = slideFadeIn(frame, fps, textFinishEstimate, {distance: 24, easing});
  const badgeScale = popIn(frame, fps, 0, ms.spring);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(165deg, #2a2a38 0%, ${colors.black} 100%)`,
        padding: '0 76px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div style={{position: 'absolute', right: -60, top: -50}}>
        <GhostQuote color={colors.white} opacity={0.08} size={320} />
      </div>

      <div style={{transform: `scale(${badgeScale})`, alignSelf: 'flex-start'}}>
        <Badge tone="white">Cliente Norte</Badge>
      </div>

      <p style={{fontSize: 52, fontWeight: 400, fontStyle: 'italic', color: colors.white, lineHeight: 1.36, margin: '36px 0 0', maxWidth: 900}}>
        &ldquo;
        <KineticText
          text={citacao}
          ms={ms}
          startFrame={10}
          side="left"
          distance={22}
          style={{fontSize: 52, fontWeight: 400, fontStyle: 'italic', color: colors.white}}
        />
        &rdquo;
      </p>

      <div style={{marginTop: 48, opacity: cardAnim.opacity, transform: cardAnim.transform}}>
        <SurfaceCard variant="bezel" shellColor="rgba(255,255,255,0.08)" coreColor="rgba(255,255,255,0.12)">
          <div style={{display: 'flex', alignItems: 'center', gap: 18, padding: '20px 24px'}}>
            <div
              style={{
                width: 58,
                height: 58,
                borderRadius: '50%',
                background: colors.accent,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <span style={{fontSize: 22, fontWeight: 700, color: colors.white}}>{iniciais(cliente)}</span>
            </div>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <span style={{fontSize: 26, fontWeight: 700, color: colors.white}}>{cliente}</span>
              {empresa ? <span style={{fontSize: 20, fontWeight: 400, color: colors.white, opacity: 0.75}}>{empresa}</span> : null}
            </div>
            <div style={{marginLeft: 'auto'}}>
              <IconQuote size={28} color="rgba(255,255,255,0.5)" strokeWidth={2} />
            </div>
          </div>
        </SurfaceCard>
      </div>
    </AbsoluteFill>
  );
};

const ResultadoSegment: React.FC<{
  corpoResultado: string;
  metrica?: string;
  produtoTag?: string;
  theme: Theme;
  ms: MotionStyle;
}> = ({corpoResultado, metrica, produtoTag, theme, ms}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const easing = getEasingFn(ms.easing);
  const labelAnim = slideFadeIn(frame, fps, 2, {distance: 18, easing});
  const {scale: metricaScale, flashOpacity} = resolveHighlight(ms, frame, 40, 16);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${theme.colors.light} 0%, ${theme.colors.dark} 100%)`,
        padding: '0 76px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div style={{display: 'flex', alignItems: 'center', gap: 12, opacity: labelAnim.opacity, transform: labelAnim.transform}}>
        <IconGrowth size={30} color={colors.white} strokeWidth={2.4} />
        <span style={{fontSize: 32, fontWeight: 700, letterSpacing: 3, color: colors.white, textTransform: 'uppercase'}}>
          Resultado
        </span>
      </div>

      <p style={{fontSize: 44, fontWeight: 700, color: colors.white, lineHeight: 1.28, margin: '32px 0 0', maxWidth: 900}}>
        &ldquo;
        <KineticText
          text={corpoResultado}
          ms={ms}
          startFrame={8}
          side="right"
          durationInFrames={12}
          wordGap={12}
          style={{fontSize: 44, fontWeight: 700, color: colors.white}}
        />
        &rdquo;
      </p>

      <div style={{marginTop: 40, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap'}}>
        {metrica ? (
          <div style={{position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 10}}>
            {flashOpacity > 0 ? (
              <div
                style={{
                  position: 'absolute',
                  inset: -30,
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
                gap: 10,
                background: 'rgba(255,255,255,0.14)',
                borderRadius: 16,
                padding: '14px 22px',
                transform: `scale(${metricaScale})`,
                boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.2)',
              }}
            >
              <span style={{fontSize: 40, fontWeight: 700, color: colors.white}}>{metrica}</span>
            </div>
          </div>
        ) : null}
        {produtoTag ? (
          <span
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: colors.white,
              opacity: 0.85,
              border: '1px solid rgba(255,255,255,0.35)',
              borderRadius: 999,
              padding: '10px 18px',
            }}
          >
            com {produtoTag}
          </span>
        ) : null}
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
      <div style={{position: 'absolute', right: -80, bottom: -60}}>
        <GhostQuote color={colors.white} opacity={0.07} size={420} />
      </div>
      <div style={{position: 'absolute', left: 72, right: 72, bottom: 220}}>
        <div style={{opacity: titleAnim.opacity, transform: titleAnim.transform}}>
          <div style={{display: 'inline-block', transform: `scale(${badgeScale})`}}>
            <Badge>Depoimento</Badge>
          </div>
          <h2 style={{fontSize: 54, fontWeight: 700, color: colors.white, margin: '28px 0 44px', lineHeight: 1.15}}>
            Quer um resultado parecido no seu negócio?
          </h2>
        </div>
        <div style={{opacity: ctaAnim.opacity, transform: ctaAnim.transform}}>
          <CtaBand />
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const DepoimentoReel: React.FC<DepoimentoReelData> = ({
  citacao,
  cliente,
  empresa,
  corpoResultado,
  metrica,
  produto,
  theme,
  motionStyle,
}) => {
  const t = produto ? getThemeForProduct(produto) : getTheme(theme ?? 'marca');
  const ms = getMotionStyle(motionStyle);
  const d = computeDurations(ms, citacao.length);
  const produtoTag = produto === 'ntbEstoque' ? 'NTB Estoque' : produto === 'ntbVendas' ? 'NTB Vendas' : produto === 'norteAvalia' ? 'Norte Avalia' : undefined;

  return (
    <Frame background={colors.black} wordmarkColor={colors.white}>
      <Sequence from={0} durationInFrames={d.capa}>
        <CitacaoSegment citacao={citacao} cliente={cliente} empresa={empresa} ms={ms} />
      </Sequence>
      <Sequence from={d.capa} durationInFrames={d.transition1}>
        <MotionTransition motionStyle={ms} durationInFrames={d.transition1} accentColor={colors.accent} veilColor={t.colors.dark} />
      </Sequence>
      <Sequence from={d.capa + d.transition1} durationInFrames={d.resultado}>
        <ResultadoSegment corpoResultado={corpoResultado} metrica={metrica} produtoTag={produtoTag} theme={t} ms={ms} />
      </Sequence>
      <Sequence from={d.capa + d.transition1 + d.resultado} durationInFrames={d.transition2}>
        <MotionTransition
          motionStyle={ms}
          durationInFrames={d.transition2}
          accentColor={colors.accent}
          veilColor={colors.black}
          glowColor="rgba(0,0,0,0.85)"
        />
      </Sequence>
      <Sequence from={d.capa + d.transition1 + d.resultado + d.transition2} durationInFrames={d.cta}>
        <CtaSegment ms={ms} />
      </Sequence>
    </Frame>
  );
};

export const depoimentoReelDefaultProps: DepoimentoReelData = {
  citacao: 'Antes eu só descobria a divergência no fim do mês. Hoje eu vejo o estoque batendo com o sistema todo dia.',
  cliente: 'Marcos Andrade',
  empresa: 'Distribuidora Bom Ponto',
  corpoResultado: 'Fechamos o inventário em 1 dia, sem retrabalho — e sem susto no fim do mês.',
  metrica: '-92% divergência',
  produto: 'ntbEstoque',
};
