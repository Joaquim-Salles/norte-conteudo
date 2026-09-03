import React from 'react';
import {Frame} from '../lib/Frame';
import {CtaBand} from '../lib/CtaBand';
import {colors} from '../lib/tokens';
import {GhostCheck, GhostQuote} from '../lib/GhostGraphics';
import {Badge} from '../lib/Badge';
import {SurfaceCard} from '../lib/SurfaceCard';
import {PhotoBackground} from '../lib/PhotoBackground';
import {IconBadge} from '../lib/IconBadge';
import {
  getVisualStyle,
  headlineStyle,
  resolveCardStyle,
  resolveTexture,
  scaleSpacing,
  showGraphicSupport,
  showIconBadge,
  textStrokeStyle,
  type VisualStyleName,
} from '../lib/visualStyles';
import type {DicaPraticaSlide} from '../lib/types';

/**
 * Template 2 — Dica pratica / carrossel, estrutura Cover/Bridge/CTA.
 * Cada slide tem papel funcional (nao e so "slide bonito"):
 *  - cover: prende o swipe, promete algo concreto e contavel (numero de itens).
 *  - cover-grid: variacao de cover que ja mostra uma previa em grade dos itens
 *    (mais "prova de conteudo" antes do swipe, bom quando os itens sao curtos).
 *  - cover-quote: variacao de cover editorial, citacao/provocacao grande — bom
 *    pra dica que nasce de uma frase forte do fundador/cliente.
 *  - cover-foto (novo, 2026-08-31): cover editorial/lifestyle com FOTO REAL de
 *    restaurante/comida em tela cheia (public/photos/, zero IA generativa) +
 *    overlay de gradiente escuro pra legibilidade — bom pra dica ligada a um
 *    contexto fisico de restaurante/bar/lanchonete (ex: NTB Vendas).
 *    Round G (2026-09-03): quando `visualStyle` e `analogiaReal`, o titulo
 *    ganha contorno grosso (`textStroke`, referencia real pesquisada — ver
 *    docs/referencias-visuais/thaleslaray-pesquisa.md) e, se `slide.iconeBadge`
 *    vier preenchido, aparece um selo pequeno com o icone do produto (prova
 *    de contexto, `IconBadge.tsx`) — omitido em qualquer outro estilo.
 *  - bridge: 1 ideia por slide, numerada, nunca mais de ~2 frases (retencao).
 *  - cta: slide dedicado, 100% focado em levar pro WhatsApp — nao divide atencao.
 *
 * `visualStyle` (Round B, 2026-09-01, opcional — ver src/lib/visualStyles.ts):
 * este template NAO tem `theme` (nunca teve — sempre foi cor de marca fixa),
 * entao a base de textura usa a opacidade padrao do Frame (0.045), nao um
 * theme.textureOpacity. `cover-foto` ignora deliberadamente textura/gráfico
 * de apoio (foto real full-bleed, mesmo raciocinio documentado em
 * VitrineProduto) — visualStyle nela afeta so o headline.
 */
const BASE_TEXTURE_OPACITY = 0.045;

export const DicaPratica: React.FC<{slide: DicaPraticaSlide; visualStyle?: VisualStyleName}> = ({
  slide,
  visualStyle,
}) => {
  const vs = visualStyle ? getVisualStyle(visualStyle) : null;
  const tex = resolveTexture(vs, BASE_TEXTURE_OPACITY);
  const graphics = showGraphicSupport(vs);

  if (slide.kind === 'cover') {
    const tituloStyle = headlineStyle(vs, 76, -1.5);
    return (
      <Frame background={colors.primary} wordmarkColor={colors.white} texture={tex.enabled} textureOpacity={tex.opacity}>
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
              fontSize: tituloStyle.fontSize,
              fontWeight: tituloStyle.fontWeight,
              fontStyle: tituloStyle.fontStyle,
              color: colors.white,
              lineHeight: 1.04,
              letterSpacing: tituloStyle.letterSpacing,
              margin: '32px 0 0',
            }}
          >
            {slide.titulo}
          </h1>
          <span
            style={{
              marginTop: scaleSpacing(vs, 40, {min: 26, max: 54}),
              fontSize: 24,
              fontWeight: 400,
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.75)',
            }}
          >
            Arrasta pro lado →
          </span>
          {graphics ? (
            <div style={{position: 'absolute', right: -40, bottom: 260}}>
              <GhostCheck color={colors.white} opacity={0.09} size={380} />
            </div>
          ) : null}
        </div>
      </Frame>
    );
  }

  if (slide.kind === 'cover-grid') {
    const tituloStyleGrid = headlineStyle(vs, 62, -1.3);
    return (
      <Frame background={colors.primary} wordmarkColor={colors.white} texture={tex.enabled} textureOpacity={tex.opacity}>
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
              fontSize: tituloStyleGrid.fontSize,
              fontWeight: tituloStyleGrid.fontWeight,
              fontStyle: tituloStyleGrid.fontStyle,
              color: colors.white,
              lineHeight: 1.06,
              letterSpacing: tituloStyleGrid.letterSpacing,
              margin: '28px 0 0',
            }}
          >
            {slide.titulo}
          </h1>

          {/* Previa em grade dos itens — "prova de conteudo" antes do swipe */}
          <div
            style={{
              marginTop: scaleSpacing(vs, 44, {min: 28, max: 58}),
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
    // DECISAO: citacao mantem SEMPRE bold+italic (voz de "citacao falada" —
    // mesma logica documentada no manifesto de Bastidores) — visualStyle so
    // varia tamanho/letter-spacing/textura/gráfico de apoio/estilo de card,
    // nunca a fonte da citacao em si.
    const citacaoStyleRaw = headlineStyle(vs, 66, -1);
    const citacaoStyle = {...citacaoStyleRaw, fontWeight: 700 as const, fontStyle: 'italic' as const};
    const cardVariantQuote = resolveCardStyle(vs, 'bezel');
    return (
      <Frame background={colors.black} wordmarkColor={colors.white} texture={tex.enabled} textureOpacity={tex.opacity}>
        {/* Aspas graficas grandes (aberta + fechada espelhada) — a citacao
            passa a ter uma moldura visual de verdade, nao so aspas de texto */}
        {graphics ? (
          <>
            <div style={{position: 'absolute', left: 10, top: -60}}>
              <GhostQuote color={colors.white} opacity={0.1} size={400} />
            </div>
            <div style={{position: 'absolute', right: 0, bottom: 160, transform: 'rotate(180deg)'}}>
              <GhostQuote color={colors.white} opacity={0.05} size={260} />
            </div>
          </>
        ) : null}
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
              fontSize: citacaoStyle.fontSize,
              fontWeight: citacaoStyle.fontWeight,
              fontStyle: citacaoStyle.fontStyle,
              color: colors.white,
              lineHeight: 1.14,
              letterSpacing: citacaoStyle.letterSpacing,
              margin: 0,
            }}
          >
            "{slide.citacao}"
          </h1>

          {/* Assinatura/atribuicao em card, no lugar de um h2 solto — da peso
              de "selo de fonte" a citacao */}
          <div style={{marginTop: scaleSpacing(vs, 44, {min: 30, max: 58})}}>
            <SurfaceCard
              variant={cardVariantQuote}
              shellColor="rgba(255,255,255,0.05)"
              coreColor="rgba(255,255,255,0.09)"
              borderColor={cardVariantQuote === 'outline' ? 'rgba(255,255,255,0.35)' : undefined}
              radius={20}
            >
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

  if (slide.kind === 'cover-foto') {
    // Foto real full-bleed: textura/GhostQuote ficam de fora por decisao
    // (mesmo raciocinio documentado no topo do arquivo) — visualStyle so
    // afeta o headline aqui. justifyContent:'flex-end' faz o bloco crescer
    // pra CIMA sobre a foto, entao nao ha risco de colisao com elemento
    // fixo abaixo — sem necessidade de clamp.
    const tituloStyleFoto = headlineStyle(vs, 72, -1.5);
    return (
      <Frame background={colors.black} wordmarkColor={colors.white} texture={false}>
        <PhotoBackground src={slide.foto} position={slide.fotoPosition ?? 'center 15%'} overlay="bottom" />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            padding: '140px 72px 220px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
        >
          {slide.tagNumero || (showIconBadge(vs) && slide.iconeBadge) ? (
            <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
              {showIconBadge(vs) && slide.iconeBadge ? <IconBadge src={slide.iconeBadge} size={56} /> : null}
              {slide.tagNumero ? <Badge>{slide.tagNumero}</Badge> : null}
            </div>
          ) : null}
          <h1
            style={{
              fontSize: tituloStyleFoto.fontSize,
              fontWeight: tituloStyleFoto.fontWeight,
              fontStyle: tituloStyleFoto.fontStyle,
              color: colors.white,
              lineHeight: 1.05,
              letterSpacing: tituloStyleFoto.letterSpacing,
              margin: '28px 0 0',
              textShadow: '0 10px 34px rgba(0,0,0,0.55)',
              ...textStrokeStyle(vs),
            }}
          >
            {slide.titulo}
          </h1>
          <span
            style={{
              marginTop: 32,
              fontSize: 24,
              fontWeight: 400,
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.82)',
            }}
          >
            Arrasta pro lado →
          </span>
        </div>
      </Frame>
    );
  }

  if (slide.kind === 'bridge') {
    const tituloStyleBridge = headlineStyle(vs, 58, -1);
    const cardVariantBridge = resolveCardStyle(vs, 'bezel');
    return (
      <Frame background={colors.white} wordmarkColor={colors.black} texture={tex.enabled} textureOpacity={tex.opacity}>
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

        {graphics ? (
          <div style={{position: 'absolute', right: -70, bottom: -50}}>
            <GhostCheck color={colors.primaryDark} opacity={0.05} size={420} />
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
          {/* Numero da ideia agora vive num card double-bezel — nao e mais um
              numero solto flutuando no espaco em branco */}
          <div style={{display: 'flex', alignItems: 'center', gap: 24}}>
            <SurfaceCard
              variant={cardVariantBridge}
              shellColor="rgba(244,63,94,0.08)"
              coreColor="rgba(244,63,94,0.13)"
              borderColor={cardVariantBridge === 'outline' ? 'rgba(20,20,30,0.18)' : undefined}
              radius={28}
            >
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
              fontSize: tituloStyleBridge.fontSize,
              fontWeight: tituloStyleBridge.fontWeight,
              fontStyle: tituloStyleBridge.fontStyle,
              color: colors.primaryDark,
              lineHeight: 1.1,
              letterSpacing: tituloStyleBridge.letterSpacing,
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
  const headlineStyleCta = headlineStyle(vs, 60, -1);
  return (
    <Frame background={colors.primaryDark} wordmarkColor={colors.white} texture={tex.enabled} textureOpacity={tex.opacity}>
      {graphics ? (
        <div style={{position: 'absolute', right: -60, bottom: -40}}>
          <GhostCheck color={colors.white} opacity={0.06} size={420} />
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
          gap: 48,
        }}
      >
        <h2
          style={{
            fontSize: headlineStyleCta.fontSize,
            fontWeight: headlineStyleCta.fontWeight,
            fontStyle: headlineStyleCta.fontStyle,
            color: colors.white,
            lineHeight: 1.1,
            letterSpacing: headlineStyleCta.letterSpacing,
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
