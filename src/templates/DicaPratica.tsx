import React from 'react';
import {Frame} from '../lib/Frame';
import {CtaBand} from '../lib/CtaBand';
import {colors} from '../lib/tokens';
import {GhostCheck, GhostQuote} from '../lib/GhostGraphics';
import {Badge} from '../lib/Badge';
import {SurfaceCard} from '../lib/SurfaceCard';
import type {DicaPraticaSlide} from '../lib/types';

/**
 * Template 2 — Dica pratica / carrossel, estrutura Cover/Bridge/CTA.
 * Cada slide tem papel funcional (nao e so "slide bonito"):
 *  - cover: prende o swipe, promete algo concreto e contavel (numero de itens).
 *  - cover-grid: variacao de cover que ja mostra uma previa em grade dos itens
 *    (mais "prova de conteudo" antes do swipe, bom quando os itens sao curtos).
 *  - cover-quote: variacao de cover editorial, citacao/provocacao grande — bom
 *    pra dica que nasce de uma frase forte do fundador/cliente.
 *  - bridge: 1 ideia por slide, numerada, nunca mais de ~2 frases (retencao).
 *  - cta: slide dedicado, 100% focado em levar pro WhatsApp — nao divide atencao.
 */
export const DicaPratica: React.FC<{slide: DicaPraticaSlide}> = ({slide}) => {
  if (slide.kind === 'cover') {
    return (
      <Frame background={colors.primary} wordmarkColor={colors.white}>
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
          {slide.tagNumero ? <Badge>{slide.tagNumero}</Badge> : null}
          <h1
            style={{
              fontSize: 76,
              fontWeight: 700,
              color: colors.white,
              lineHeight: 1.04,
              letterSpacing: -1.5,
              margin: '32px 0 0',
            }}
          >
            {slide.titulo}
          </h1>
          <span
            style={{
              marginTop: 40,
              fontSize: 24,
              fontWeight: 400,
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.75)',
            }}
          >
            Arrasta pro lado →
          </span>
          <div style={{position: 'absolute', right: -40, bottom: 260}}>
            <GhostCheck color={colors.white} opacity={0.09} size={380} />
          </div>
        </div>
      </Frame>
    );
  }

  if (slide.kind === 'cover-grid') {
    return (
      <Frame background={colors.primary} wordmarkColor={colors.white}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            padding: '120px 72px 220px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {slide.tagNumero ? <Badge>{slide.tagNumero}</Badge> : null}
          <h1
            style={{
              fontSize: 62,
              fontWeight: 700,
              color: colors.white,
              lineHeight: 1.06,
              letterSpacing: -1.3,
              margin: '28px 0 0',
            }}
          >
            {slide.titulo}
          </h1>

          {/* Previa em grade dos itens — "prova de conteudo" antes do swipe */}
          <div
            style={{
              marginTop: 44,
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}
          >
            {slide.itens.slice(0, 4).map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.14)',
                  borderRadius: 16,
                  padding: '18px 22px',
                }}
              >
                <span
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: colors.white,
                    background: colors.accent,
                    width: 32,
                    height: 32,
                    borderRadius: 999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </span>
                <span style={{fontSize: 24, fontWeight: 400, color: colors.white}}>{item}</span>
              </div>
            ))}
          </div>

          <span
            style={{
              marginTop: 28,
              fontSize: 22,
              fontWeight: 400,
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            Arrasta pro lado pra ver na pratica →
          </span>
        </div>
      </Frame>
    );
  }

  if (slide.kind === 'cover-quote') {
    return (
      <Frame background={colors.black} wordmarkColor={colors.white}>
        {/* Aspas graficas grandes (aberta + fechada espelhada) — a citacao
            passa a ter uma moldura visual de verdade, nao so aspas de texto */}
        <div style={{position: 'absolute', left: 10, top: -60}}>
          <GhostQuote color={colors.white} opacity={0.1} size={400} />
        </div>
        <div style={{position: 'absolute', right: 0, bottom: 160, transform: 'rotate(180deg)'}}>
          <GhostQuote color={colors.white} opacity={0.05} size={260} />
        </div>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            padding: '260px 72px 220px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <h1
            style={{
              fontSize: 66,
              fontWeight: 700,
              fontStyle: 'italic',
              color: colors.white,
              lineHeight: 1.14,
              letterSpacing: -1,
              margin: 0,
            }}
          >
            "{slide.citacao}"
          </h1>

          {/* Assinatura/atribuicao em card, no lugar de um h2 solto — da peso
              de "selo de fonte" a citacao */}
          <div style={{marginTop: 44}}>
            <SurfaceCard shellColor="rgba(255,255,255,0.05)" coreColor="rgba(255,255,255,0.09)" radius={20}>
              <div style={{display: 'flex', alignItems: 'center', gap: 16, padding: '22px 28px'}}>
                <div style={{width: 8, height: 8, borderRadius: 999, background: colors.accent, flexShrink: 0}} />
                <span style={{fontSize: 28, fontWeight: 700, color: 'rgba(255,255,255,0.9)', lineHeight: 1.2}}>
                  {slide.titulo}
                </span>
              </div>
            </SurfaceCard>
          </div>
        </div>
      </Frame>
    );
  }

  if (slide.kind === 'bridge') {
    return (
      <Frame background={colors.white} wordmarkColor={colors.black}>
        {/* Tracker de progresso no topo — mesma linguagem do "passo" do
            Metodologia, da continuidade visual entre os 2 carrosseis */}
        <div style={{position: 'absolute', top: 140, left: 72, display: 'flex', gap: 10}}>
          {Array.from({length: slide.total}).map((_, i) => (
            <div
              key={i}
              style={{
                width: i + 1 === slide.numero ? 28 : 10,
                height: 10,
                borderRadius: 999,
                background: i + 1 <= slide.numero ? colors.accent : '#e4e4ec',
              }}
            />
          ))}
        </div>

        <div style={{position: 'absolute', right: -70, bottom: -50}}>
          <GhostCheck color={colors.primaryDark} opacity={0.05} size={420} />
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
          {/* Numero da ideia agora vive num card double-bezel — nao e mais um
              numero solto flutuando no espaco em branco */}
          <div style={{display: 'flex', alignItems: 'center', gap: 24}}>
            <SurfaceCard shellColor="rgba(244,63,94,0.08)" coreColor="rgba(244,63,94,0.13)" radius={28}>
              <div style={{width: 150, height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <span
                  style={{
                    fontSize: 92,
                    fontWeight: 700,
                    color: colors.accent,
                    letterSpacing: -4,
                    textShadow: '0 10px 24px rgba(244,63,94,0.25)',
                  }}
                >
                  {String(slide.numero).padStart(2, '0')}
                </span>
              </div>
            </SurfaceCard>
            <div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
              <span style={{fontSize: 20, fontWeight: 700, color: '#9a9aab', letterSpacing: 2, textTransform: 'uppercase'}}>
                Ideia
              </span>
              <span style={{fontSize: 30, fontWeight: 400, color: '#9a9aab'}}>
                {slide.numero} de {slide.total}
              </span>
            </div>
          </div>
          <h2
            style={{
              fontSize: 58,
              fontWeight: 700,
              color: colors.primaryDark,
              lineHeight: 1.1,
              letterSpacing: -1,
              margin: 0,
            }}
          >
            {slide.titulo}
          </h2>
          <p style={{fontSize: 34, fontWeight: 400, color: '#3c3c46', lineHeight: 1.45, margin: 0}}>
            {slide.corpo}
          </p>
        </div>
      </Frame>
    );
  }

  // slide.kind === 'cta'
  return (
    <Frame background={colors.primaryDark} wordmarkColor={colors.white}>
      <div style={{position: 'absolute', right: -60, bottom: -40}}>
        <GhostCheck color={colors.white} opacity={0.06} size={420} />
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
            fontSize: 60,
            fontWeight: 700,
            color: colors.white,
            lineHeight: 1.1,
            letterSpacing: -1,
            margin: 0,
          }}
        >
          {slide.headline ?? 'Quer isso rodando na sua operação?'}
        </h2>
        <CtaBand />
      </div>
    </Frame>
  );
};

export const dicaPraticaDefaultProps: {slide: DicaPraticaSlide} = {
  slide: {kind: 'cover', titulo: '3 erros que travam seu estoque', tagNumero: '3 ERROS'},
};
