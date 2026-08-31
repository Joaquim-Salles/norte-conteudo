import React from 'react';
import {Frame} from '../lib/Frame';
import {CtaBand} from '../lib/CtaBand';
import {colors} from '../lib/tokens';
import {GhostBars, GhostQuote, GhostCycle} from '../lib/GhostGraphics';
import {Badge} from '../lib/Badge';
import {SurfaceCard} from '../lib/SurfaceCard';
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

          {/* Selo de metodo — da peso visual real ao cover em vez de so texto solto */}
          <div style={{marginTop: 64}}>
            <SurfaceCard shellColor="rgba(255,255,255,0.05)" coreColor="rgba(255,255,255,0.09)" radius={24}>
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
                  <GhostCycle color={colors.white} opacity={1} size={36} />
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

          <div style={{position: 'absolute', right: -70, bottom: 60}}>
            <GhostBars color={colors.white} opacity={0.1} width={480} />
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

          {/* Mini-roadmap das etapas — previa do metodo antes do swipe, num card
              double-bezel em vez de bullets soltos flutuando no fundo preto */}
          <div style={{marginTop: 48}}>
            <SurfaceCard shellColor="rgba(255,255,255,0.04)" coreColor="rgba(255,255,255,0.07)" radius={26}>
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
    return (
      <Frame background={colors.white} wordmarkColor={colors.black}>
        {/* Aspas graficas grandes reforcam o tom "quote-like" pedido no design —
            no lugar das barras de crescimento (que combinam mais com dado/resultado
            do que com um cover editorial). Bleed parcial pra fora do quadro. */}
        <div style={{position: 'absolute', right: -60, top: -70}}>
          <GhostQuote color={colors.primaryDark} opacity={0.06} size={480} />
        </div>
        <div style={{position: 'absolute', left: 30, bottom: 40, transform: 'rotate(180deg)'}}>
          <GhostQuote color={colors.primaryDark} opacity={0.045} size={260} />
        </div>
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
          <div style={{marginTop: 64}}>
            <SurfaceCard shellColor="rgba(0,0,0,0.035)" coreColor="rgba(0,0,0,0.02)" radius={22}>
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
  return (
    <Frame background={colors.black} wordmarkColor={colors.white}>
      <div style={{position: 'absolute', right: -80, bottom: -60}}>
        <GhostBars color={colors.white} opacity={0.11} width={520} />
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          padding: '0 72px 220px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 32,
        }}
      >
        <Badge>Metodologia</Badge>
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
