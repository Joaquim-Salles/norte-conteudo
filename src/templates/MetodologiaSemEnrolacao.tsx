import React from 'react';
import {Frame} from '../lib/Frame';
import {CtaBand} from '../lib/CtaBand';
import {colors} from '../lib/tokens';
import {GhostBars} from '../lib/GhostGraphics';
import {Badge} from '../lib/Badge';
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
 */
export const MetodologiaSemEnrolacao: React.FC<{slide: MetodologiaSlide}> = ({slide}) => {
  if (slide.kind === 'cover') {
    return (
      <Frame background={colors.black} wordmarkColor={colors.white}>
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
              fontSize: 72,
              fontWeight: 700,
              color: colors.white,
              lineHeight: 1.05,
              letterSpacing: -1.5,
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
          <div style={{position: 'absolute', right: -30, bottom: 240}}>
            <GhostBars color={colors.white} opacity={0.09} width={380} />
          </div>
        </div>
      </Frame>
    );
  }

  if (slide.kind === 'cover-roadmap') {
    return (
      <Frame background={colors.black} wordmarkColor={colors.white}>
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
              fontSize: 60,
              fontWeight: 700,
              color: colors.white,
              lineHeight: 1.06,
              letterSpacing: -1.3,
              margin: '28px 0 0',
            }}
          >
            {slide.titulo}
          </h1>

          {/* Mini-roadmap das etapas — previa do metodo antes do swipe */}
          <div
            style={{
              marginTop: 48,
              display: 'flex',
              flexDirection: 'column',
              gap: 0,
            }}
          >
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
    return (
      <Frame background={colors.white} wordmarkColor={colors.black}>
        <div style={{position: 'absolute', right: -20, top: -20}}>
          <GhostBars color={colors.primaryDark} opacity={0.05} width={340} />
        </div>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            padding: '220px 72px 220px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
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
              fontSize: 78,
              fontWeight: 700,
              fontStyle: 'italic',
              color: colors.primaryDark,
              lineHeight: 1.05,
              letterSpacing: -1.5,
              margin: '22px 0 0',
            }}
          >
            {slide.titulo}
          </h1>
          {slide.subtitulo ? (
            <p style={{fontSize: 30, fontWeight: 400, color: '#54546a', lineHeight: 1.4, margin: '28px 0 0', maxWidth: 820}}>
              {slide.subtitulo}
            </p>
          ) : null}
          <div style={{marginTop: 44, height: 6, width: 120, background: colors.accent}} />
        </div>
      </Frame>
    );
  }

  if (slide.kind === 'passo') {
    return (
      <Frame background={colors.white} wordmarkColor={colors.black}>
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
            <span
              style={{
                fontSize: 140,
                fontWeight: 700,
                color: colors.black,
                lineHeight: 0.82,
                letterSpacing: -6,
                textShadow: '0 16px 34px rgba(0,0,0,0.14)',
              }}
            >
              {String(slide.numero).padStart(2, '0')}
            </span>
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
  return (
    <Frame background={colors.black} wordmarkColor={colors.white}>
      <div style={{position: 'absolute', right: -40, bottom: -30}}>
        <GhostBars color={colors.white} opacity={0.08} width={440} />
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          padding: '0 72px 220px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 48,
        }}
      >
        <h2
          style={{
            fontSize: 58,
            fontWeight: 700,
            color: colors.white,
            lineHeight: 1.1,
            letterSpacing: -1,
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
