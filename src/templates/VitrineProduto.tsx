import React from 'react';
import {Img, staticFile} from 'remotion';
import {Frame} from '../lib/Frame';
import {CtaBand} from '../lib/CtaBand';
import {colors} from '../lib/tokens';
import {getThemeForProduct} from '../lib/themes';
import {GhostCheck} from '../lib/GhostGraphics';
import {SurfaceCard} from '../lib/SurfaceCard';
import {PhoneFrame, BrowserFrame} from '../lib/DeviceFrame';
import {PhotoBackground} from '../lib/PhotoBackground';
import {
  getVisualStyle,
  headlineStyle,
  isMinimalDecoration,
  resolveCanvas,
  resolveCardStyle,
  resolveTexture,
  scaleSpacing,
  showGraphicSupport,
} from '../lib/visualStyles';
import type {VitrineProdutoData} from '../lib/types';

const productLogo: Record<VitrineProdutoData['produto'], string | null> = {
  ntbEstoque: 'logos/estoque-logo.png',
  ntbVendas: 'logos/vendas-icon-512.png', // so tem icone de app, sem wordmark proprio ainda
  norteAvalia: null, // sem asset local — usa so o wordmark tipografico
};

/**
 * Template 4 — Vitrine de produto, em 4 variacoes:
 *  - padrao: identidade no topo + lista vertical de features (cards compactos).
 *  - hero: identidade/headline grandes e centralizadas, features viram pilulas
 *    horizontais — mais "poster de lancamento", menos "ficha tecnica".
 *  - grid: features em grade 2x2 (bento), cards com double-bezel — mais denso
 *    e "produto maduro" quando ha 4 features fortes pra mostrar de uma vez.
 *  - print: screenshot REAL do sistema numa moldura de device (celular/browser)
 *    com sombra e leve perspectiva — "prova visual", nao icone+texto.
 *  - contexto (novo, 2026-08-31): foto REAL de ambiente/comida do restaurante
 *    em tela cheia (public/photos/) + mockup do celular com o screenshot real
 *    do sistema sobreposto, como se estivesse pousado na mesa — foto real +
 *    produto real na mesma peca, pra NTB Vendas (Cardapio Digital).
 * CTA sempre comercial direto (nao so informativo).
 *
 * Tema (paleta + cardStyle) e SEMPRE derivado do produto anunciado — nao e
 * escolha manual (ver src/lib/themes.ts, getThemeForProduct). Essa regra
 * NAO muda com `visualStyle` (Round B, 2026-09-01, opcional — ver
 * src/lib/visualStyles.ts): visualStyle continua ortogonal, so afeta
 * textura, estilo de card, gráfico de apoio, espacamento e peso/tamanho do
 * headline — nunca a cor (que e sempre do produto).
 *
 * Exclusao documentada: só a variante `contexto` (foto real de ambiente em
 * tela cheia, full-bleed) ignora deliberadamente `resolveTexture`/
 * `showGraphicSupport` — grain ou GhostCheck por cima de uma foto real
 * sujaria a imagem sem ganho (mesmo raciocínio que já fixava
 * `texture={false}` nela antes desta rodada). `print` (screenshot dentro de
 * moldura de device, sem foto full-bleed) recebe textura/gráfico de apoio
 * normalmente — o fundo ali é cor sólida do tema, não uma foto real.
 */
export const VitrineProduto: React.FC<VitrineProdutoData> = ({
  produto,
  nomeProduto,
  headline,
  features,
  ctaLabel,
  variant = 'padrao',
  screenshot,
  device = 'phone',
  screenshotAspect,
  foto,
  fotoPosition,
  visualStyle,
}) => {
  const theme = getThemeForProduct(produto);
  const productColor = theme.colors;
  const vs = visualStyle ? getVisualStyle(visualStyle) : null;
  const cardStyle = resolveCardStyle(vs, theme.cardStyle);
  const tex = resolveTexture(vs, theme.textureOpacity);
  const graphics = showGraphicSupport(vs);
  const logo = productLogo[produto];

  if (variant === 'hero') {
    // Clamp: headline centralizada de ate 2-3 linhas dentro de maxWidth 880 —
    // achado real de QA (mesmo padrao do Comparativo/AntesDepois): 1.65x
    // (boldTipografico) em cima de 62px ja fica pesado o bastante; cap em 84px
    // evita colidir com as pilulas de feature logo abaixo.
    const headlineStyleRaw = headlineStyle(vs, 62, -1, 1.08);
    const headlineStyleHero = {...headlineStyleRaw, fontSize: Math.min(headlineStyleRaw.fontSize, 84)};
    return (
      <Frame
        background={productColor.dark}
        wordmarkColor={colors.white}
        texture={tex.enabled}
        textureOpacity={tex.opacity}
      >
        {graphics ? (
          <div style={{position: 'absolute', right: -60, top: -60, zIndex: 0}}>
            <GhostCheck color={colors.white} opacity={0.05} size={420} />
          </div>
        ) : null}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            padding: '150px 72px 220px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            zIndex: 1,
          }}
        >
          {logo ? (
            <div
              style={{
                width: 120,
                height: 120,
                borderRadius: 28,
                background: 'rgba(255,255,255,0.14)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 20,
                boxShadow: '0 24px 50px -16px rgba(0,0,0,0.5)',
              }}
            >
              <Img src={staticFile(logo)} style={{width: '100%', height: '100%', objectFit: 'contain'}} />
            </div>
          ) : null}
          <span
            style={{
              marginTop: 24,
              fontSize: 24,
              fontWeight: 700,
              color: 'rgba(255,255,255,0.85)',
              letterSpacing: 2,
              textTransform: 'uppercase',
            }}
          >
            {nomeProduto}
          </span>
          <h1
            style={{
              fontSize: headlineStyleHero.fontSize,
              fontWeight: headlineStyleHero.fontWeight,
              fontStyle: headlineStyleHero.fontStyle,
              color: colors.white,
              lineHeight: headlineStyleHero.lineHeight,
              letterSpacing: headlineStyleHero.letterSpacing,
              margin: '20px 0 0',
              maxWidth: 880,
            }}
          >
            {headline}
          </h1>

          <div
            style={{
              marginTop: scaleSpacing(vs, 52, {min: 34, max: 68}),
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 14,
            }}
          >
            {features.slice(0, 4).map((f, i) => (
              <span
                key={i}
                style={{
                  fontSize: 22,
                  fontWeight: 400,
                  color: colors.white,
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.16)',
                  borderRadius: 999,
                  padding: '12px 22px',
                }}
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        <div style={{position: 'absolute', left: 64, right: 64, bottom: 130, zIndex: 1}}>
          <CtaBand label={ctaLabel ?? 'Quero isso na minha loja'} sub="fala com a gente — link na bio" />
        </div>
      </Frame>
    );
  }

  if (variant === 'grid') {
    // Clamp: o bloco de identidade tem altura FIXA (400px) e a grade de
    // features comeca logo abaixo em top:440 — achado real de QA: sem cap, o
    // headlineScale de boldTipografico/dadoEmDestaque (1.45-1.65x) faz um
    // headline de 2+ linhas estourar a altura fixa e invadir visualmente a
    // grade. Cap em 62px preserva o peso extra sem quebrar a grade.
    const headlineStyleGridRaw = headlineStyle(vs, 50, -1, 1.1);
    const headlineStyleGrid = {...headlineStyleGridRaw, fontSize: Math.min(headlineStyleGridRaw.fontSize, 62)};
    return (
      <Frame
        background={productColor.dark}
        wordmarkColor={colors.white}
        texture={tex.enabled}
        textureOpacity={tex.opacity}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 400,
            background: `linear-gradient(160deg, ${productColor.base} 0%, ${productColor.dark} 100%)`,
            padding: '92px 64px 0',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 18, marginBottom: 22}}>
            {logo ? (
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 18,
                  background: 'rgba(255,255,255,0.14)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 12,
                }}
              >
                <Img src={staticFile(logo)} style={{width: '100%', height: '100%', objectFit: 'contain'}} />
              </div>
            ) : null}
            <span
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: 'rgba(255,255,255,0.85)',
                letterSpacing: 1,
                textTransform: 'uppercase',
              }}
            >
              {nomeProduto}
            </span>
          </div>
          <h1
            style={{
              fontSize: headlineStyleGrid.fontSize,
              fontWeight: headlineStyleGrid.fontWeight,
              fontStyle: headlineStyleGrid.fontStyle,
              color: colors.white,
              lineHeight: headlineStyleGrid.lineHeight,
              letterSpacing: headlineStyleGrid.letterSpacing,
              margin: 0,
              maxWidth: 900,
            }}
          >
            {headline}
          </h1>
        </div>

        {/* Grade 2x2 de features — bento, double-bezel */}
        <div
          style={{
            position: 'absolute',
            top: 440,
            left: 64,
            right: 64,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 20,
          }}
        >
          {features.slice(0, 4).map((f, i) => (
            <SurfaceCard
              key={i}
              variant={cardStyle}
              shellColor="rgba(255,255,255,0.05)"
              coreColor="rgba(255,255,255,0.1)"
            >
              <div style={{padding: '26px 22px', display: 'flex', flexDirection: 'column', gap: 14, minHeight: 190}}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 999,
                    background: colors.accent,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 19,
                    fontWeight: 700,
                    color: colors.white,
                    boxShadow: '0 10px 20px -8px rgba(0,0,0,0.5)',
                  }}
                >
                  {i + 1}
                </div>
                <span style={{fontSize: 24, fontWeight: 400, color: colors.white, lineHeight: 1.3}}>{f}</span>
              </div>
            </SurfaceCard>
          ))}
        </div>

        {graphics ? (
          <div style={{position: 'absolute', right: -40, bottom: 200, zIndex: 0}}>
            <GhostCheck color={colors.white} opacity={0.05} size={300} />
          </div>
        ) : null}

        <div style={{position: 'absolute', left: 64, right: 64, bottom: 130}}>
          <CtaBand label={ctaLabel ?? 'Quero isso na minha loja'} sub="fala com a gente — link na bio" />
        </div>
      </Frame>
    );
  }

  if (variant === 'print') {
    const screenshotSrc = screenshot ?? 'screenshots/home-desktop.png';
    // Mesmo clamp do variant 'grid' — faixa de identidade com altura FIXA
    // (300px, ainda mais compacta que a do grid), device frame comeca logo
    // abaixo (top:340/400). Cap mais apertado (54px) porque a faixa e menor.
    const headlineStylePrintRaw = headlineStyle(vs, 42, -0.6, 1.14);
    const headlineStylePrint = {...headlineStylePrintRaw, fontSize: Math.min(headlineStylePrintRaw.fontSize, 54)};
    return (
      <Frame
        background={productColor.dark}
        wordmarkColor={colors.white}
        texture={tex.enabled}
        textureOpacity={tex.opacity}
      >
        {/* Faixa superior de identidade — mais compacta que as outras variantes,
            pra sobrar espaco de verdade pro device frame ser o protagonista */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 300,
            background: `linear-gradient(160deg, ${productColor.base} 0%, ${productColor.dark} 100%)`,
            padding: '76px 64px 0',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 0,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16}}>
            {logo ? (
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 16,
                  background: 'rgba(255,255,255,0.14)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 10,
                }}
              >
                <Img src={staticFile(logo)} style={{width: '100%', height: '100%', objectFit: 'contain'}} />
              </div>
            ) : null}
            <span
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: 'rgba(255,255,255,0.85)',
                letterSpacing: 1,
                textTransform: 'uppercase',
              }}
            >
              {nomeProduto}
            </span>
          </div>
          <h1
            style={{
              fontSize: headlineStylePrint.fontSize,
              fontWeight: headlineStylePrint.fontWeight,
              fontStyle: headlineStylePrint.fontStyle,
              color: colors.white,
              lineHeight: headlineStylePrint.lineHeight,
              letterSpacing: headlineStylePrint.letterSpacing,
              margin: 0,
              maxWidth: 880,
            }}
          >
            {headline}
          </h1>
        </div>

        {graphics ? (
          <div style={{position: 'absolute', left: -60, bottom: 150, zIndex: 0}}>
            <GhostCheck color={colors.white} opacity={0.05} size={320} />
          </div>
        ) : null}

        {/* Print real do sistema dentro da moldura de device — elemento central,
            com sombra e leve inclinacao (nao e imagem crua colada na peca) */}
        <div
          style={{
            position: 'absolute',
            top: device === 'phone' ? 340 : 400,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1,
          }}
        >
          {device === 'phone' ? (
            <PhoneFrame
              src={screenshotSrc}
              width={330}
              rotate={-5}
              {...(screenshotAspect ? {aspectRatio: screenshotAspect} : {})}
            />
          ) : (
            <BrowserFrame
              src={screenshotSrc}
              width={860}
              rotate={2.5}
              {...(screenshotAspect ? {aspectRatio: screenshotAspect} : {})}
            />
          )}
        </div>

        <div style={{position: 'absolute', left: 64, right: 64, bottom: 130, zIndex: 2}}>
          <CtaBand label={ctaLabel ?? 'Quero isso na minha loja'} sub="fala com a gente — link na bio" />
        </div>
      </Frame>
    );
  }

  if (variant === 'contexto') {
    const fotoSrc = foto ?? 'photos/prato-gourmet-mesa-madeira.jpg';
    const screenshotSrc = screenshot ?? 'screenshots/vendas-mobile.png';
    // Clamp: o mockup do celular tem posicao FIXA (top:560) — headline mais
    // longo em fonte muito maior tem so ~372px de folga antes de colidir.
    // Cap em 66px preserva a variacao sem risco de sobreposicao. Textura e
    // GhostCheck ficam de fora aqui de proposito — ver comentario no topo
    // do arquivo (foto real full-bleed).
    const headlineStyleContextoRaw = headlineStyle(vs, 50, -1, 1.1);
    const headlineStyleContexto = {...headlineStyleContextoRaw, fontSize: Math.min(headlineStyleContextoRaw.fontSize, 66)};
    return (
      <Frame background={productColor.dark} wordmarkColor={colors.white} texture={false}>
        {/* Foto real de ambiente/comida em tela cheia — identidade sobre o
            degrade escuro superior, CTA sobre o degrade escuro inferior,
            meio da foto respira livre pra dar espaco ao mockup do celular. */}
        <PhotoBackground src={fotoSrc} position={fotoPosition ?? 'center 22%'} overlay="topAndBottom" strength={0.85} />

        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            padding: '96px 64px 0',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 18, marginBottom: 20}}>
            {logo ? (
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 18,
                  background: 'rgba(255,255,255,0.16)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 12,
                  boxShadow: '0 14px 30px -10px rgba(0,0,0,0.5)',
                }}
              >
                <Img src={staticFile(logo)} style={{width: '100%', height: '100%', objectFit: 'contain'}} />
              </div>
            ) : null}
            <span
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: 'rgba(255,255,255,0.9)',
                letterSpacing: 1,
                textTransform: 'uppercase',
                textShadow: '0 4px 16px rgba(0,0,0,0.5)',
              }}
            >
              {nomeProduto}
            </span>
          </div>
          <h1
            style={{
              fontSize: headlineStyleContexto.fontSize,
              fontWeight: headlineStyleContexto.fontWeight,
              fontStyle: headlineStyleContexto.fontStyle,
              color: colors.white,
              lineHeight: headlineStyleContexto.lineHeight,
              letterSpacing: headlineStyleContexto.letterSpacing,
              margin: 0,
              maxWidth: 820,
              textShadow: '0 8px 28px rgba(0,0,0,0.55)',
            }}
          >
            {headline}
          </h1>
        </div>

        {/* Mockup do celular "pousado na mesa" — sobreposto a foto real, no
            meio da peca (nem colado na identidade, nem no CTA). */}
        <div style={{position: 'absolute', top: 560, left: '50%', transform: 'translateX(-50%)', zIndex: 1}}>
          {device === 'phone' ? (
            <PhoneFrame
              src={screenshotSrc}
              width={300}
              rotate={-4}
              {...(screenshotAspect ? {aspectRatio: screenshotAspect} : {})}
            />
          ) : (
            <BrowserFrame
              src={screenshotSrc}
              width={760}
              rotate={2}
              {...(screenshotAspect ? {aspectRatio: screenshotAspect} : {})}
            />
          )}
        </div>

        <div style={{position: 'absolute', left: 64, right: 64, bottom: 130, zIndex: 2}}>
          <CtaBand label={ctaLabel ?? 'Quero isso na minha loja'} sub="fala com a gente — link na bio" />
        </div>
      </Frame>
    );
  }

  // variant === 'padrao'
  // Mesmo clamp de 'grid'/'print': a lista de features comeca em top:480,
  // fixa, sobre o fim do bloco de identidade (altura 620) — cap em 78px.
  const headlineStylePadraoRaw = headlineStyle(vs, 60, -1, 1.08);
  const headlineStylePadrao = {...headlineStylePadraoRaw, fontSize: Math.min(headlineStylePadraoRaw.fontSize, 78)};
  // papelQuente troca só o CANVAS BASE (onde ficam as features/CTA) — o bloco
  // de identidade do produto no topo (620px) mantém a cor própria do produto,
  // preservando reconhecimento de marca (regra documentada do canvasOverride).
  const canvasPadrao = resolveCanvas(vs, productColor.dark, colors.white, headline);
  const minimal = isMinimalDecoration(vs);
  return (
    <Frame
      background={canvasPadrao.background}
      wordmarkColor={canvasPadrao.ink}
      texture={tex.enabled}
      textureOpacity={tex.opacity}
    >
      {/* Bloco superior de identidade do produto */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 620,
          // achado real de QA (papelQuente): quando canvasOverride troca a
          // base pro papel claro, terminar o degradê em productColor.dark
          // cria uma costura dura contra o fundo claro — o degradê agora
          // sempre termina na cor do canvas (= productColor.dark quando não
          // há override, comportamento 100% original preservado).
          background: `linear-gradient(160deg, ${productColor.base} 0%, ${canvasPadrao.background} 100%)`,
          padding: '96px 64px 0',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', gap: 20, marginBottom: 28}}>
          {logo ? (
            <div
              style={{
                width: 88,
                height: 88,
                borderRadius: 20,
                background: 'rgba(255,255,255,0.14)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 14,
              }}
            >
              <Img src={staticFile(logo)} style={{width: '100%', height: '100%', objectFit: 'contain'}} />
            </div>
          ) : null}
          <span
            style={{
              fontSize: 26,
              fontWeight: 700,
              color: 'rgba(255,255,255,0.85)',
              letterSpacing: 1,
              textTransform: 'uppercase',
            }}
          >
            {nomeProduto}
          </span>
        </div>
        <h1
          style={{
            fontSize: headlineStylePadrao.fontSize,
            fontWeight: headlineStylePadrao.fontWeight,
            fontStyle: headlineStylePadrao.fontStyle,
            fontFamily: headlineStylePadrao.fontFamily,
            color: colors.white,
            lineHeight: headlineStylePadrao.lineHeight,
            letterSpacing: headlineStylePadrao.letterSpacing,
            margin: 0,
            maxWidth: 900,
          }}
        >
          {headline}
        </h1>
      </div>

      {graphics ? (
        <div style={{position: 'absolute', right: -50, bottom: 210, zIndex: 0}}>
          <GhostCheck color={canvasPadrao.ink} opacity={0.06} size={340} />
        </div>
      ) : null}

      {/* Lista de features — cartoes compactos, escaneavel, double-bezel */}
      <div
        style={{
          position: 'absolute',
          zIndex: 1,
          top: 480,
          left: 64,
          right: 64,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        {features.slice(0, 4).map((f, i) => (
          <SurfaceCard
            key={i}
            variant={cardStyle}
            shellColor={canvasPadrao.ink === colors.white ? 'rgba(255,255,255,0.04)' : 'rgba(20,20,19,0.04)'}
            coreColor={canvasPadrao.ink === colors.white ? 'rgba(255,255,255,0.08)' : 'rgba(20,20,19,0.06)'}
            radius={20}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: 18, padding: '22px 22px'}}>
              {/* Selo circular numerado — decoração de apoio ausente na
                  referência real (@claudeai); suprimido em editorialClaude
                  (2026-09-05), mantido nos outros presets. */}
              {!minimal ? (
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 999,
                    background: colors.accent,
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 18,
                    fontWeight: 700,
                    color: colors.white,
                  }}
                >
                  {i + 1}
                </div>
              ) : null}
              <span style={{fontSize: 28, fontWeight: 400, color: canvasPadrao.ink}}>{f}</span>
            </div>
          </SurfaceCard>
        ))}
      </div>

      <div style={{position: 'absolute', left: 64, right: 64, bottom: 130}}>
        <CtaBand label={ctaLabel ?? 'Quero isso na minha loja'} sub="fala com a gente — link na bio" />
      </div>
    </Frame>
  );
};

export const vitrineProdutoDefaultProps: VitrineProdutoData = {
  produto: 'ntbEstoque',
  nomeProduto: 'NTB Estoque',
  headline: 'Estoque sincronizado com o Omie em tempo real.',
  features: [
    'Leitura de QR code pra movimentação e inventário',
    'Etiquetagem inteligente por lote/validade',
    'Inventários otimizados, sem parar a loja',
    'Perfis de acesso pra ajustes sensíveis',
  ],
};
