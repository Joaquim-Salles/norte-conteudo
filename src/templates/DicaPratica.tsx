import React from 'react';
import {Frame} from '../lib/Frame';
import {CtaBand} from '../lib/CtaBand';
import {colors} from '../lib/tokens';
import {GhostCheck, GhostQuote} from '../lib/GhostGraphics';
import {HAND_DRAWN_ILLUSTRATIONS} from '../lib/HandDrawn';
import {Badge} from '../lib/Badge';
import {SurfaceCard} from '../lib/SurfaceCard';
import {PhotoBackground} from '../lib/PhotoBackground';
import {IconBadge} from '../lib/IconBadge';
import {StatusChip} from '../lib/StatusChip';
import {
  getVisualStyle,
  headlineStyle,
  isMinimalDecoration,
  resolveCanvas,
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
    const tituloStyle = headlineStyle(vs, 76, -1.5, 1.04);
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
              lineHeight: tituloStyle.lineHeight,
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
    const tituloStyleGrid = headlineStyle(vs, 62, -1.3, 1.06);
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
              lineHeight: tituloStyleGrid.lineHeight,
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
    const citacaoStyleRaw = headlineStyle(vs, 66, -1, 1.14);
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
              lineHeight: citacaoStyle.lineHeight,
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
    const minimalFoto = isMinimalDecoration(vs);

    // Gap 3 do QA rigoroso 2026-09-05 (comparação vs. grid-1 real do
    // @claudeai, "There's hope in hard questions"): mesma correção aplicada
    // em CoverFotoReal — texto sobre foto CENTRALIZADO, peso médio/regular,
    // overlay fraco, sem badge/tag/seta de swipe (decoração que a referência
    // não usa). Único modo que muda comportamento; os outros 4 presets
    // continuam com o layout original (canto inferior, bold, overlay forte).
    if (minimalFoto) {
      const tituloStyleFotoMinimal = headlineStyle(vs, 44, 0, 1.2);
      // SISTEMA DE 2 FONTES (2026-09-06, relatório do fundador §3): mesmo
      // raciocínio de CoverFotoReal.tsx — a serifada ITÁLICA é específica do
      // formato "overlay em foto", `fontStyle` hardcoded aqui (não vem de
      // `headlineStyle`, que resolveria 'normal' porque `headlineWeight` do
      // preset é 'bold').
      return (
        <Frame background={colors.black} wordmarkColor={colors.white} texture={false}>
          <PhotoBackground src={slide.foto} position={slide.fotoPosition ?? 'center 15%'} overlay="bottom" strength={0.42} />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              padding: '0 96px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <p
              style={{
                fontSize: tituloStyleFotoMinimal.fontSize,
                fontWeight: 500,
                fontStyle: 'italic',
                fontFamily: tituloStyleFotoMinimal.fontFamily,
                color: colors.white,
                lineHeight: tituloStyleFotoMinimal.lineHeight,
                letterSpacing: tituloStyleFotoMinimal.letterSpacing,
                margin: 0,
                maxWidth: 640,
                textAlign: 'center',
              }}
            >
              {slide.titulo}
            </p>
          </div>

          {/* StatusChip (2026-09-06, relatório do fundador §3) — mesmo
              raciocínio de CoverFotoReal: canto superior-esquerdo, livre do
              wordmark (bottom:56) e do título centralizado. Sem `theme`
              neste template (nunca teve, ver comentário de topo do
              arquivo) — usa a cor de marca (`colors.accent`) no círculo do
              ícone, default do `StatusChip`. */}
          {slide.statusVerbo ? (
            <div style={{position: 'absolute', left: 64, top: 64}}>
              <StatusChip verbo={slide.statusVerbo} />
            </div>
          ) : null}
        </Frame>
      );
    }

    // Foto real full-bleed: textura/GhostQuote ficam de fora por decisao
    // (mesmo raciocinio documentado no topo do arquivo) — visualStyle so
    // afeta o headline aqui. justifyContent:'flex-end' faz o bloco crescer
    // pra CIMA sobre a foto, entao nao ha risco de colisao com elemento
    // fixo abaixo — sem necessidade de clamp.
    const tituloStyleFoto = headlineStyle(vs, 72, -1.5, 1.05);
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
              lineHeight: tituloStyleFoto.lineHeight,
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
    const tituloStyleBridge = headlineStyle(vs, 58, -1, 1.1);
    const cardVariantBridge = resolveCardStyle(vs, 'bezel');
    const canvas = resolveCanvas(vs, colors.white, colors.black, slide.titulo);
    const minimal = isMinimalDecoration(vs);
    return (
      <Frame background={canvas.background} wordmarkColor={canvas.ink} texture={tex.enabled} textureOpacity={tex.opacity}>
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

        {/* StatusChip (7ª rodada, 2026-09-05) — "a marca narrando a cena",
            posicionado ao lado do tracker, sem competir com a ilustração
            grande que carrega a composição abaixo do texto. */}
        {minimal && slide.statusVerbo ? (
          <div style={{position: 'absolute', top: 128, right: 72}}>
            <StatusChip verbo={slide.statusVerbo} accentColor={colors.accent} tone={canvas.ink === colors.white ? 'light' : 'dark'} />
          </div>
        ) : null}

        {graphics ? (
          <div style={{position: 'absolute', right: -70, bottom: -50}}>
            <GhostCheck color={canvas.ink} opacity={0.05} size={420} />
          </div>
        ) : null}

        {/* Ilustração própria à mão (editorialClaude — ver src/lib/HandDrawn.tsx)
            como PROTAGONISTA (7ª rodada, 2026-09-05: antes 300px no canto
            superior direito — pedido do fundador é "não detalhe de canto
            pequeno", a ilustração precisa ocupar espaço real na composição,
            como "Safeguards 101"/"How we study Claude" fazem). Agora 400px,
            centralizada, ocupando o vão abaixo do texto — `illustration`
            (prop nova) escolhe qual das 6 ilustrações combina com a ideia do
            slide. */}
        {minimal ? (
          <div style={{position: 'absolute', left: 0, right: 0, bottom: 220, display: 'flex', justifyContent: 'center'}}>
            {(() => {
              const Illustration = HAND_DRAWN_ILLUSTRATIONS[slide.illustration ?? 'fluxo'];
              return <Illustration color={canvas.ink} opacity={canvas.ink === colors.white ? 0.9 : 0.85} size={400} />;
            })()}
          </div>
        ) : null}

        <div
          style={{
            position: 'absolute',
            inset: 0,
            // Gap 4 do QA rigoroso 2026-09-05 (mesma correção de Bastidores
            // manifesto): referência real ancora texto no topo do card, não
            // centraliza no meio do frame — centralizar cria vazio enorme
            // entre o texto e o rodapé fixo, o oposto da densidade real.
            padding: minimal ? '220px 72px 220px' : '0 72px 220px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: minimal ? 'flex-start' : 'center',
            gap: scaleSpacing(vs, 32, {min: 20, max: 44}),
          }}
        >
          {/* Numero da ideia vive num card double-bezel — nao e mais um
              numero solto flutuando no espaco em branco. EXCECAO
              editorialClaude (2026-09-05): a referencia real nao usa selo/
              card nenhum pra numeracao — vira so um numeral sans pequeno,
              mesmo espirito do "Ideia X de Y" que ja existia ao lado. */}
          <div style={{display: 'flex', alignItems: 'center', gap: 24}}>
            {!minimal ? (
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
            ) : null}
            <div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: canvas.ink === colors.black ? '#9a9aab' : canvas.ink,
                  opacity: minimal ? 0.6 : 1,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                }}
              >
                Ideia
              </span>
              <span
                style={{
                  fontSize: minimal ? 44 : 30,
                  fontWeight: minimal ? 700 : 400,
                  color: minimal ? canvas.ink : '#9a9aab',
                }}
              >
                {slide.numero} de {slide.total}
              </span>
            </div>
          </div>
          <h2
            style={{
              fontSize: tituloStyleBridge.fontSize,
              fontWeight: tituloStyleBridge.fontWeight,
              fontStyle: tituloStyleBridge.fontStyle,
              fontFamily: tituloStyleBridge.fontFamily,
              color: canvas.ink,
              lineHeight: tituloStyleBridge.lineHeight,
              letterSpacing: tituloStyleBridge.letterSpacing,
              margin: 0,
            }}
          >
            {slide.titulo}
          </h2>
          <p
            style={{
              fontSize: 34,
              fontWeight: 400,
              // Achado real de QA (7ª rodada, 2026-09-05): cor fixa '#3c3c46'
              // (cinza escuro) ficava ilegível quando editorialClaude sorteia
              // um fundo escuro da canvasPalette (preto/azul-acinzentado) —
              // corpo agora segue o contraste do canvas, igual ao título.
              color: minimal ? (canvas.ink === colors.white ? 'rgba(255,255,255,0.82)' : '#3c3c46') : '#3c3c46',
              lineHeight: 1.45,
              margin: 0,
            }}
          >
            {slide.corpo}
          </p>
        </div>
      </Frame>
    );
  }

  // slide.kind === 'cta'
  const headlineStyleCta = headlineStyle(vs, 60, -1, 1.1);
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
            lineHeight: headlineStyleCta.lineHeight,
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
