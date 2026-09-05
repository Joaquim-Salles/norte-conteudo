import React from 'react';
import {Frame} from '../lib/Frame';
import {CtaBand} from '../lib/CtaBand';
import {colors} from '../lib/tokens';
import {GhostBars, GhostQuote} from '../lib/GhostGraphics';
import {IconCycle} from '../lib/icons';
import {Badge} from '../lib/Badge';
import {SurfaceCard} from '../lib/SurfaceCard';
import {
  getVisualStyle,
  headlineStyle,
  resolveCardStyle,
  resolveTexture,
  scaleSpacing,
  showGraphicSupport,
  type VisualStyleName,
} from '../lib/visualStyles';
import type {MetodologiaSlide} from '../lib/types';

/**
 * Template 5 — Metodologia sem enrolacao
 * Carrossel tipo "passo a passo" (Lean/PDCA/BPM aplicados na pratica) — tom seco,
 * numerado, sem enfeite. Contraste tipografico monocromatico (preto/branco/accent)
 * reforca a personalidade "direto ao ponto" da marca.
 *
 * FIX 2026-08-30 (bug achado na galeria QA): o cover original usava so um rotulo
 * de texto plano ("METODOLOGIA") e nao tinha nenhuma dica de continuidade — por
 * isso, isolado como preview de 1 imagem, parecia uma peca quebrada/incompleta
 * em comparacao com os outros 4 tipos (que sao posts de 1 imagem so, com tudo
 * visivel de uma vez). Nao era falta de CTA/corpo no COMPONENTE (o carrossel
 * inteiro sempre teve slide de passo com corpo e slide de cta com WhatsApp) —
 * era 1) o cover em si mais fraco que o das outras capas (sem badge/sem hint) e
 * 2) o script de QA so renderizava o defaultProps (=cover) de cada composicao,
 * nunca os 3 estados do carrossel. Os dois foram corrigidos: cover abaixo ganhou
 * badge + hint de continuidade igual ao "Arrasta pro lado" do DicaPratica, e
 * scripts/qa-preview.mjs agora renderiza cover + passo + cta de toda peca-carrossel.
 *
 * `visualStyle` (Round B, 2026-09-01, opcional — ver src/lib/visualStyles.ts):
 * este template NAO tem `theme` (sempre foi preto/branco/accent fixo) —
 * textura usa a opacidade padrao do Frame (0.045). `cover-editorial` mantem
 * SEMPRE o titulo em itálico (voz "pull-quote" documentada desde a criacao
 * do slide) — visualStyle nele varia so tamanho/letter-spacing/espacamento/
 * gráfico de apoio, nunca a fonte.
 */
const BASE_TEXTURE_OPACITY = 0.045;

export const MetodologiaSemEnrolacao: React.FC<{slide: MetodologiaSlide; visualStyle?: VisualStyleName}> = ({
  slide,
  visualStyle,
}) => {
  const vs = visualStyle ? getVisualStyle(visualStyle) : null;
  const tex = resolveTexture(vs, BASE_TEXTURE_OPACITY);
  const graphics = showGraphicSupport(vs);

  if (slide.kind === 'cover') {
    const tituloStyle = headlineStyle(vs, 72, -1.5, 1.05);
    const cardVariantCover = resolveCardStyle(vs, 'bezel');
    return (
      <Frame background={colors.black} wordmarkColor={colors.white} texture={tex.enabled} textureOpacity={tex.opacity}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            padding: '140px 72px 220px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}
        >
          {slide.metodo ? <Badge>{slide.metodo}</Badge> : null}
          <h1
            style={{
              fontSize: tituloStyle.fontSize,
              fontWeight: tituloStyle.fontWeight,
              fontStyle: tituloStyle.fontStyle,
              color: colors.white,
              lineHeight: tituloStyle.lineHeight,
              letterSpacing: tituloStyle.letterSpacing,
              margin: '32px 0 0',
            }}
          >
            {slide.titulo}
          </h1>
          <div style={{marginTop: 44, height: 6, width: 120, background: colors.accent}} />
          <span
            style={{
              marginTop: 36,
              fontSize: 24,
              fontWeight: 400,
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.72)',
            }}
          >
            Passo a passo, sem enrolação — arrasta pro lado →
          </span>

          {/* Selo de metodo — da peso visual real ao cover em vez de so texto solto */}
          <div style={{marginTop: scaleSpacing(vs, 64, {min: 44, max: 84})}}>
            <SurfaceCard
              variant={cardVariantCover}
              shellColor="rgba(255,255,255,0.05)"
              coreColor="rgba(255,255,255,0.09)"
              borderColor={cardVariantCover === 'outline' ? 'rgba(255,255,255,0.35)' : undefined}
              radius={24}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: 24, padding: '28px 32px', maxWidth: 640}}>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 999,
                    background: colors.accent,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 12px 26px -10px rgba(0,0,0,0.55)',
                  }}
                >
                  <IconCycle color={colors.white} size={34} strokeWidth={2.6} />
                </div>
                <div style={{display: 'flex', flexDirection: 'column', gap: 4}}>
                  <span style={{fontSize: 24, fontWeight: 700, color: colors.white}}>Melhoria contínua</span>
                  <span style={{fontSize: 20, fontWeight: 400, color: 'rgba(255,255,255,0.6)'}}>
                    Repete até virar rotina — não é teoria solta.
                  </span>
                </div>
              </div>
            </SurfaceCard>
          </div>

          {graphics ? (
            <div style={{position: 'absolute', right: -70, bottom: 60}}>
              <GhostBars color={colors.white} opacity={0.1} width={480} />
            </div>
          ) : null}
        </div>
      </Frame>
    );
  }

  if (slide.kind === 'cover-roadmap') {
    const tituloStyleRoadmap = headlineStyle(vs, 60, -1.3, 1.06);
    const cardVariantRoadmap = resolveCardStyle(vs, 'bezel');
    return (
      <Frame background={colors.black} wordmarkColor={colors.white} texture={tex.enabled} textureOpacity={tex.opacity}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            padding: '120px 72px 220px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {slide.metodo ? <Badge>{slide.metodo}</Badge> : null}
          <h1
            style={{
              fontSize: tituloStyleRoadmap.fontSize,
              fontWeight: tituloStyleRoadmap.fontWeight,
              fontStyle: tituloStyleRoadmap.fontStyle,
              color: colors.white,
              lineHeight: tituloStyleRoadmap.lineHeight,
              letterSpacing: tituloStyleRoadmap.letterSpacing,
              margin: '28px 0 0',
            }}
          >
            {slide.titulo}
          </h1>

          {/* Mini-roadmap das etapas — previa do metodo antes do swipe, num card
              double-bezel em vez de bullets soltos flutuando no fundo preto */}
          <div style={{marginTop: scaleSpacing(vs, 48, {min: 32, max: 62})}}>
            <SurfaceCard
              variant={cardVariantRoadmap}
              shellColor="rgba(255,255,255,0.04)"
              coreColor="rgba(255,255,255,0.07)"
              borderColor={cardVariantRoadmap === 'outline' ? 'rgba(255,255,255,0.35)' : undefined}
              radius={26}
            >
              <div style={{display: 'flex', flexDirection: 'column', gap: 0, padding: '32px 34px 26px'}}>
                {slide.etapas.map((etapa, i) => (
                  <div key={i} style={{display: 'flex', alignItems: 'stretch', gap: 20}}>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: 20}}>
                      <div
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 999,
                          background: colors.accent,
                          flexShrink: 0,
                          boxShadow: '0 0 0 6px rgba(244,63,94,0.16)',
                        }}
                      />
                      {i < slide.etapas.length - 1 ? (
                        <div style={{width: 2, flex: 1, background: 'rgba(255,255,255,0.16)', minHeight: 34}} />
                      ) : null}
                    </div>
                    <span
                      style={{
                        fontSize: 26,
                        fontWeight: 400,
                        color: 'rgba(255,255,255,0.85)',
                        paddingBottom: i < slide.etapas.length - 1 ? 26 : 0,
                      }}
                    >
                      {etapa}
                    </span>
                  </div>
                ))}
              </div>
            </SurfaceCard>
          </div>

          <span
            style={{
              marginTop: 32,
              fontSize: 22,
              fontWeight: 400,
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.65)',
            }}
          >
            Arrasta pro lado pra ver cada etapa →
          </span>
        </div>
      </Frame>
    );
  }

  if (slide.kind === 'cover-editorial') {
    // DECISAO: titulo mantem SEMPRE bold+italic ("pull-quote" e a identidade
    // do proprio slide desde a criacao, mesma logica ja documentada no
    // cover-quote do DicaPratica/manifesto de Bastidores) — visualStyle so
    // varia tamanho/letter-spacing/espacamento/gráfico de apoio.
    const tituloStyleRaw = headlineStyle(vs, 78, -1.5, 1.05);
    const tituloStyleEditorial = {...tituloStyleRaw, fontWeight: 700 as const, fontStyle: 'italic' as const};
    return (
      <Frame background={colors.white} wordmarkColor={colors.black} texture={tex.enabled} textureOpacity={tex.opacity}>
        {/* Aspas graficas grandes reforcam o tom "quote-like" pedido no design —
            no lugar das barras de crescimento (que combinam mais com dado/resultado
            do que com um cover editorial). Bleed parcial pra fora do quadro. */}
        {graphics ? (
          <>
            <div style={{position: 'absolute', right: -60, top: -70}}>
              <GhostQuote color={colors.primaryDark} opacity={0.06} size={480} />
            </div>
            <div style={{position: 'absolute', left: 30, bottom: 40, transform: 'rotate(180deg)'}}>
              <GhostQuote color={colors.primaryDark} opacity={0.045} size={260} />
            </div>
          </>
        ) : null}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            padding: '220px 96px 220px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'stretch',
            justifyContent: 'center',
          }}
        >
          {/* Barra vertical tipo "pull-quote" — da moldura de apoio ao bloco de
              texto, que antes ficava so com titulo + linha fina flutuando */}
          <div style={{width: 6, background: colors.accent, borderRadius: 999, flexShrink: 0, marginRight: 40}} />
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <span
              style={{
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: 3,
                color: colors.accent,
                textTransform: 'uppercase',
              }}
            >
              Metodologia
            </span>
            <h1
              style={{
                fontSize: tituloStyleEditorial.fontSize,
                fontWeight: tituloStyleEditorial.fontWeight,
                fontStyle: tituloStyleEditorial.fontStyle,
                color: colors.primaryDark,
                lineHeight: tituloStyleEditorial.lineHeight,
                letterSpacing: tituloStyleEditorial.letterSpacing,
                margin: '22px 0 0',
              }}
            >
              {slide.titulo}
            </h1>
            {slide.subtitulo ? (
              <p style={{fontSize: 30, fontWeight: 400, color: '#54546a', lineHeight: 1.4, margin: '28px 0 0', maxWidth: 780}}>
                {slide.subtitulo}
              </p>
            ) : null}
          </div>
        </div>
      </Frame>
    );
  }

  if (slide.kind === 'passo') {
    // Hero desta slide e o numero grande (checkpoint) — o h2/descricao ficam
    // de fora do headlineStyle, mesmo criterio ja usado nos outros
    // carrosseis (so 1 elemento "hero" por slide).
    // Cap em 158: o anel tracejado decorativo ao redor e um circulo FIXO de
    // 172px — numero maior que isso estoura visualmente o anel.
    // Achado real de QA (2026-09-01): "02" ja nasce com letterSpacing -6
    // (bem agressivo, proposital pro numero colar). Somar o letterSpacingBoost
    // negativo de boldTipografico/dadoEmDestaque em cima disso (-6 + -3 ou
    // -6 + -2.5) faz os 2 digitos se SOBREPOREM de verdade nesse tamanho de
    // fonte — nao e estetica, e bug de legibilidade. Floor em -6: visualStyle
    // pode deixar o numero mais espaçado que o base, nunca mais compacto.
    const numeroStyleRaw = headlineStyle(vs, 140, -6, 0.82);
    const numeroStyle = {
      ...numeroStyleRaw,
      fontSize: Math.min(numeroStyleRaw.fontSize, 158),
      letterSpacing: Math.max(numeroStyleRaw.letterSpacing, -6),
    };
    const cardVariantPasso = resolveCardStyle(vs, 'bezel');
    return (
      <Frame background={colors.white} wordmarkColor={colors.black} texture={tex.enabled} textureOpacity={tex.opacity}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            padding: '0 72px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {/* Tracker de progresso — bolinhas preenchidas ate o passo atual */}
          <div style={{position: 'absolute', top: 140, left: 72, display: 'flex', gap: 10}}>
            {Array.from({length: slide.total}).map((_, i) => (
              <div
                key={i}
                style={{
                  width: i + 1 === slide.numero ? 28 : 10,
                  height: 10,
                  borderRadius: 999,
                  background: i + 1 <= slide.numero ? colors.accent : '#e4e4ec',
                  transition: 'none',
                }}
              />
            ))}
          </div>

          <div style={{display: 'flex', alignItems: 'flex-start', gap: 28}}>
            {/* Selo/anel decorativo atras do numero — da peso de "checkpoint",
                nao so um numero solto no ar */}
            <div style={{position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <div
                style={{
                  position: 'absolute',
                  width: 172,
                  height: 172,
                  left: -20,
                  top: -20,
                  borderRadius: '50%',
                  border: `3px dashed ${colors.accent}`,
                  opacity: 0.28,
                }}
              />
              <span
                style={{
                  fontSize: numeroStyle.fontSize,
                  fontWeight: numeroStyle.fontWeight,
                  fontStyle: numeroStyle.fontStyle,
                  color: colors.black,
                  lineHeight: numeroStyle.lineHeight,
                  letterSpacing: numeroStyle.letterSpacing,
                  textShadow: '0 16px 34px rgba(0,0,0,0.14)',
                }}
              >
                {String(slide.numero).padStart(2, '0')}
              </span>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: 14, paddingTop: 18}}>
              <h2
                style={{
                  fontSize: 42,
                  fontWeight: 700,
                  color: colors.black,
                  lineHeight: 1.12,
                  margin: 0,
                }}
              >
                {slide.titulo}
              </h2>
              <p style={{fontSize: 27, fontWeight: 400, color: '#43434f', lineHeight: 1.42, margin: 0}}>
                {slide.descricao}
              </p>
            </div>
          </div>

          {/* Mini-diagrama do ciclo — mostra as `total` etapas com a atual
              destacada, em vez de deixar so texto solto preenchendo o resto
              do quadro (pedido explicito do fundador) */}
          <div style={{marginTop: scaleSpacing(vs, 64, {min: 44, max: 84})}}>
            <SurfaceCard
              variant={cardVariantPasso}
              shellColor="rgba(0,0,0,0.035)"
              coreColor="rgba(0,0,0,0.02)"
              borderColor={cardVariantPasso === 'outline' ? 'rgba(20,20,30,0.18)' : undefined}
              radius={22}
            >
              <div style={{display: 'flex', alignItems: 'center', padding: '26px 30px'}}>
                {Array.from({length: slide.total}).map((_, i) => {
                  const stepNum = i + 1;
                  const isActive = stepNum === slide.numero;
                  const isDone = stepNum < slide.numero;
                  return (
                    <React.Fragment key={i}>
                      <div
                        style={{
                          width: isActive ? 52 : 38,
                          height: isActive ? 52 : 38,
                          borderRadius: 999,
                          flexShrink: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: isActive ? 22 : 17,
                          fontWeight: 700,
                          background: isActive ? colors.accent : isDone ? colors.primaryDark : '#e4e4ec',
                          color: isActive || isDone ? colors.white : '#9a9aab',
                          boxShadow: isActive ? '0 12px 22px -8px rgba(244,63,94,0.55)' : 'none',
                        }}
                      >
                        {stepNum}
                      </div>
                      {i < slide.total - 1 ? (
                        <div
                          style={{
                            flex: 1,
                            height: 2,
                            margin: '0 12px',
                            background: stepNum < slide.numero ? colors.primaryDark : '#e4e4ec',
                            opacity: stepNum < slide.numero ? 0.4 : 1,
                          }}
                        />
                      ) : null}
                    </React.Fragment>
                  );
                })}
              </div>
            </SurfaceCard>
          </div>

          <span
            style={{
              position: 'absolute',
              bottom: 220,
              left: 72,
              fontSize: 20,
              fontWeight: 700,
              color: '#a0a0ae',
              letterSpacing: 1,
            }}
          >
            PASSO {slide.numero} DE {slide.total}
          </span>
        </div>
      </Frame>
    );
  }

  // slide.kind === 'cta'
  const headlineStyleCta = headlineStyle(vs, 58, -1, 1.1);
  return (
    <Frame background={colors.black} wordmarkColor={colors.white} texture={tex.enabled} textureOpacity={tex.opacity}>
      {graphics ? (
        <div style={{position: 'absolute', right: -80, bottom: -60}}>
          <GhostBars color={colors.white} opacity={0.11} width={520} />
        </div>
      ) : null}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          padding: '0 72px 220px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: scaleSpacing(vs, 32, {min: 20, max: 44}),
        }}
      >
        <Badge>Metodologia</Badge>
        <h2
          style={{
            fontSize: headlineStyleCta.fontSize,
            fontWeight: headlineStyleCta.fontWeight,
            fontStyle: headlineStyleCta.fontStyle,
            color: colors.white,
            lineHeight: headlineStyleCta.lineHeight,
            letterSpacing: headlineStyleCta.letterSpacing,
            margin: 0,
          }}
        >
          {slide.headline ?? 'Sem achismo. Sem enrolação. Bora aplicar isso aí.'}
        </h2>
        <CtaBand />
      </div>
    </Frame>
  );
};

export const metodologiaDefaultProps: {slide: MetodologiaSlide} = {
  slide: {kind: 'cover', titulo: 'PDCA aplicado ao seu estoque', metodo: 'Metodologia'},
};
