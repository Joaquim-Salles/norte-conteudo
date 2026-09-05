import React from 'react';
import {Frame} from '../lib/Frame';
import {CtaBand} from '../lib/CtaBand';
import {Badge} from '../lib/Badge';
import {SurfaceCard} from '../lib/SurfaceCard';
import {colors} from '../lib/tokens';
import {getTheme, type ThemeName} from '../lib/themes';
import {GhostQuote, GhostBars, GhostMarker, GhostSlash} from '../lib/GhostGraphics';
import {PhotoBackground} from '../lib/PhotoBackground';
import {IconQuote, IconAlert, IconGrowth} from '../lib/icons';
import {
  getVisualStyle,
  headlineStyle,
  resolveCanvas,
  resolveCardStyle,
  resolveTexture,
  showGraphicSupport,
  textStrokeStyle,
  type VisualStyleName,
} from '../lib/visualStyles';
import type {DepoimentoSlide} from '../lib/types';

const productLabel: Record<string, string> = {
  ntbEstoque: 'NTB Estoque',
  ntbVendas: 'NTB Vendas',
  norteAvalia: 'Norte Avalia',
};

/**
 * Template novo (2026-09-01) — Depoimento / Prova Social. Carrossel,
 * estrutura Capa/Contexto/Resultado/CTA — papel funcional analogo ao
 * Cover/Bridge/CTA dos outros carrosseis, mas a "prova" aqui e a VOZ do
 * cliente (citacao real, primeira pessoa), nao uma metrica nossa. Diferente
 * de Antes/Depois (que e sobre O QUE mudou, com metrica nossa como prova) —
 * aqui e QUEM fala (cliente real) que sustenta a credibilidade.
 *
 * IMPORTANTE (regra de escopo): `citacao`/`corpo` SEMPRE vem do brief, com
 * aspas reais de cliente real — Rafael nao reescreve nem inventa depoimento
 * de producao (mesma regra do Checklist #7: brief pronto, so formata). Os
 * defaultProps abaixo sao placeholder ilustrativo so pra QA visual.
 *
 * Sem foto de "cliente" — nao existe asset de retrato real disponivel, e
 * usar foto de banco de imagem generica fingindo ser o cliente seria
 * enganoso (mesmo espirito da regra de nao usar IA generativa pra simular
 * pessoa real). Atribuicao usa iniciais num selo colorido em vez de rosto.
 *
 * RESOLVIDO (2026-09-04, pendencia sinalizada nos Rounds F/G e ate entao em
 * aberto): `slide.foto`, quando presente neste template, SEMPRE renderiza com
 * `PhotoBackground treatment="ambient"` (ver src/lib/PhotoBackground.tsx) —
 * duotone dessaturado + blur + tint na cor do tema, nunca a foto crua
 * ('documentary', usada em Vitrine/DicaPratica/Bastidores/CoverFotoReal).
 * Decisao de design, nao pedida ao fundador de novo: a garantia precisa ser
 * ESTRUTURAL, nao uma curadoria manual de "essa foto tem rosto reconhecivel,
 * aquela nao" — julgamento caso a caso quebra no proximo brief que anexar
 * uma foto de pessoa sem ninguem perceber. Com o treatment 'ambient', mesmo
 * a foto de pessoas mais nitida vira atmosfera abstrata (grayscale + blur de
 * 6px + tint), estruturalmente incapaz de ler como "retrato do cliente" ao
 * lado da citacao/atribuicao — a foto passa a comunicar clima/ambiente, nunca
 * identidade. Isso substitui a ressalva anterior ("revisar antes de publicar
 * de verdade") por uma regra que vale sempre, sem depender de revisao manual
 * a cada peca nova.
 *
 * `visualStyle` (novo, 2026-09-01, opcional — ver src/lib/visualStyles.ts):
 * troca estilo de card do selo de atribuicao, textura, presenca de
 * GhostQuote/GhostBars decorativo, e peso/tamanho da citacao/metrica —
 * ortogonal ao `theme`. Omitido = aparencia original.
 *
 * Round F (2026-09-03): `slide.foto` (kinds `capa` e `contexto`) e opcional —
 * quando presente, troca o degrade/fundo chapado por foto real (Pexels) com
 * overlay, mesma logica ja usada em VitrineProduto/DicaPratica. `contexto`
 * tambem e o unico slide que aplica `resolveCanvas` (papelQuente) — canvas
 * unico, sem bloco interno de cor propria, exatamente o cenario que
 * `canvasOverride` foi desenhado pra cobrir (ver visualStyles.ts).
 *
 * Round G (2026-09-03): quando `slide.foto` esta presente E `visualStyle` e
 * `analogiaReal`, a citacao da capa ganha contorno grosso de texto
 * (`textStroke`, referencia real pesquisada — ver
 * docs/referencias-visuais/thaleslaray-pesquisa.md). Sem foto, o contorno e
 * ignorado de proposito (nao faz sentido sobre o degrade solido).
 */
export const Depoimento: React.FC<{slide: DepoimentoSlide; theme?: ThemeName; visualStyle?: VisualStyleName}> = ({
  slide,
  theme = 'marca',
  visualStyle,
}) => {
  const t = getTheme(theme);
  const vs = visualStyle ? getVisualStyle(visualStyle) : null;
  const tex = resolveTexture(vs, t.textureOpacity);
  const graphics = showGraphicSupport(vs);
  const cardVariant = resolveCardStyle(vs, t.cardStyle);

  const iniciais = (nome: string) =>
    nome
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase())
      .join('');

  if (slide.kind === 'capa') {
    const citacaoStyle = headlineStyle(vs, 54, 0, 1.3);
    const temFoto = Boolean(slide.foto);
    return (
      <Frame
        background={temFoto ? t.colors.dark : `linear-gradient(165deg, ${t.colors.light} 0%, ${t.colors.dark} 100%)`}
        wordmarkColor={colors.white}
        texture={temFoto ? false : tex.enabled}
        textureOpacity={tex.opacity}
      >
        {temFoto ? (
          <PhotoBackground
            src={slide.foto!}
            position={slide.fotoPosition ?? 'center'}
            overlay="topAndBottom"
            strength={0.88}
            treatment="ambient"
            tint={t.colors.base}
          />
        ) : null}
        {/* Aspas graficas grandes, abertura + fechamento espelhado — mesma
            gramatica do cover-quote do DicaPratica, da moldura visual real
            a citacao em vez de deixar o meio da peca vazio. */}
        {graphics ? (
          <>
            <div style={{position: 'absolute', right: -50, top: -50}}>
              <GhostQuote color={colors.white} opacity={0.1} size={360} />
            </div>
            <div style={{position: 'absolute', left: -20, bottom: 130, transform: 'rotate(180deg)'}}>
              <GhostQuote color={colors.white} opacity={0.06} size={220} />
            </div>
          </>
        ) : null}

        <div
          style={{
            position: 'absolute',
            inset: 0,
            padding: '0 72px 220px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Badge tone="white">Cliente Norte</Badge>

          <p
            style={{
              fontSize: citacaoStyle.fontSize,
              fontWeight: citacaoStyle.fontWeight,
              fontStyle: citacaoStyle.fontStyle,
              color: colors.white,
              lineHeight: citacaoStyle.lineHeight,
              margin: '40px 0 0',
              letterSpacing: citacaoStyle.letterSpacing,
              maxWidth: 900,
              ...(temFoto ? textStrokeStyle(vs) : {}),
            }}
          >
            &ldquo;{slide.citacao}&rdquo;
          </p>

          <div style={{marginTop: 52}}>
            <SurfaceCard variant={cardVariant} shellColor="rgba(255,255,255,0.08)" coreColor="rgba(255,255,255,0.12)">
              <div style={{display: 'flex', alignItems: 'center', gap: 18, padding: '22px 26px'}}>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    background: colors.accent,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <span style={{fontSize: 24, fontWeight: 700, color: colors.white}}>{iniciais(slide.cliente)}</span>
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                  <span style={{fontSize: 26, fontWeight: 700, color: colors.white}}>{slide.cliente}</span>
                  {slide.empresa ? (
                    <span style={{fontSize: 20, fontWeight: 400, color: colors.white, opacity: 0.75}}>
                      {slide.empresa}
                    </span>
                  ) : null}
                </div>
                <div style={{marginLeft: 'auto'}}>
                  <IconQuote size={30} color="rgba(255,255,255,0.5)" strokeWidth={2} />
                </div>
              </div>
            </SurfaceCard>
          </div>
        </div>
      </Frame>
    );
  }

  if (slide.kind === 'capa-metrica') {
    const metricaStyle = headlineStyle(vs, 120, -3, 0.95);
    return (
      <Frame background={t.colors.dark} wordmarkColor={colors.white} texture={tex.enabled} textureOpacity={tex.opacity}>
        {graphics ? (
          <>
            <div style={{position: 'absolute', left: -70, top: -60}}>
              <GhostQuote color={colors.white} opacity={0.07} size={320} />
            </div>
            <div style={{position: 'absolute', right: -50, bottom: 190, transform: 'rotate(180deg)'}}>
              <GhostQuote color={colors.white} opacity={0.06} size={240} />
            </div>
          </>
        ) : null}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            padding: '0 64px 220px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <Badge tone="white">Cliente Norte</Badge>

          <div style={{marginTop: 44, display: 'flex', alignItems: 'center', gap: 16}}>
            <IconGrowth size={54} color={colors.accent} strokeWidth={2.2} />
            <span
              style={{
                fontSize: metricaStyle.fontSize,
                fontWeight: metricaStyle.fontWeight,
                fontStyle: metricaStyle.fontStyle,
                color: colors.accent,
                lineHeight: metricaStyle.lineHeight,
                letterSpacing: metricaStyle.letterSpacing,
                textShadow: '0 20px 50px rgba(244,63,94,0.35)',
              }}
            >
              {slide.metrica}
            </span>
          </div>
          <span
            style={{
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.6)',
              marginTop: 10,
            }}
          >
            {slide.metricaLabel}
          </span>

          <p
            style={{
              fontSize: 34,
              fontWeight: 400,
              fontStyle: 'italic',
              color: colors.white,
              lineHeight: 1.35,
              margin: '48px 0 0',
              maxWidth: 800,
            }}
          >
            &ldquo;{slide.citacaoCurta}&rdquo;
          </p>

          <div style={{marginTop: 32, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <span style={{fontSize: 24, fontWeight: 700, color: colors.white}}>{slide.cliente}</span>
            {slide.empresa ? (
              <span style={{fontSize: 20, fontWeight: 400, color: 'rgba(255,255,255,0.7)'}}>{slide.empresa}</span>
            ) : null}
          </div>
        </div>
      </Frame>
    );
  }

  if (slide.kind === 'contexto') {
    const corpoStyle = headlineStyle(vs, 38, 0, 1.4);
    const temFoto = Boolean(slide.foto);
    // canvasOverride (papelQuente) só se aplica quando NÃO há foto — com foto,
    // a legibilidade exige texto branco sobre overlay escuro (mesma regra de
    // PhotoBackground usada em VitrineProduto/DicaPratica), então a preferência
    // de tinta clara do estilo não faria sentido (ver nota de escopo em
    // `canvasOverride`, visualStyles.ts).
    const canvas = temFoto ? {background: t.colors.dark, ink: colors.white} : resolveCanvas(vs, colors.white, colors.primaryDark);
    const eyebrowColor = temFoto ? 'rgba(255,255,255,0.75)' : '#9a9aab';
    const signature = vs?.signatureGraphic;
    return (
      <Frame
        background={canvas.background}
        wordmarkColor={temFoto ? colors.white : canvas.ink}
        texture={temFoto ? false : tex.enabled}
        textureOpacity={tex.opacity}
      >
        {temFoto ? (
          <PhotoBackground
            src={slide.foto!}
            position={slide.fotoPosition ?? 'center'}
            overlay="full"
            strength={0.6}
            treatment="ambient"
            tint={t.colors.base}
          />
        ) : null}
        {graphics && !temFoto ? (
          signature === 'ghostMarker' ? (
            <div style={{position: 'absolute', left: 56, bottom: 150}}>
              <GhostMarker color={colors.accent} opacity={0.5} width={420} height={48} rotate={-2} />
            </div>
          ) : signature === 'ghostSlash' ? (
            <div style={{position: 'absolute', right: 64, bottom: 260}}>
              {/* #d97757 (laranja pesquisado da paleta pública Anthropic,
                  NÃO o accent rosa/vermelho da Norte — CTA/badge continuam
                  na cor do tema, regra documentada do canvasOverride) em vez
                  de tinta neutra: ecoa o único traço colorido do símbolo
                  ambíguo real da marca (sempre em cor quente, nunca cinza) —
                  refinamento 2026-09-05. */}
              <GhostSlash color="#d97757" opacity={0.18} size={190} />
            </div>
          ) : (
            <div style={{position: 'absolute', right: -70, bottom: -50}}>
              <GhostQuote color={colors.primaryDark} opacity={0.05} size={420} />
            </div>
          )
        ) : null}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            padding: '0 72px 220px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 28,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
            <IconAlert size={22} color={eyebrowColor} strokeWidth={2.4} />
            <span
              style={{
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: 2,
                color: eyebrowColor,
                textTransform: 'uppercase',
              }}
            >
              Antes, nas palavras do cliente
            </span>
          </div>
          <SurfaceCard
            variant={cardVariant}
            shellColor={temFoto ? 'rgba(255,255,255,0.08)' : undefined}
            coreColor={temFoto ? 'rgba(255,255,255,0.12)' : undefined}
            borderColor={cardVariant === 'outline' ? (temFoto ? 'rgba(255,255,255,0.35)' : 'rgba(20,20,30,0.18)') : undefined}
          >
            <p
              style={{
                fontSize: corpoStyle.fontSize,
                fontWeight: corpoStyle.fontWeight,
                fontStyle: corpoStyle.fontStyle,
                color: canvas.ink,
                lineHeight: corpoStyle.lineHeight,
                margin: 0,
                letterSpacing: corpoStyle.letterSpacing,
                padding: '38px 34px',
              }}
            >
              &ldquo;{slide.corpo}&rdquo;
            </p>
          </SurfaceCard>
        </div>
      </Frame>
    );
  }

  if (slide.kind === 'resultado') {
    const produtoTag = slide.produto ? productLabel[slide.produto] : undefined;
    const corpoStyle = headlineStyle(vs, 40, 0, 1.32);
    return (
      <Frame
        background={`linear-gradient(160deg, ${t.colors.light} 0%, ${t.colors.dark} 100%)`}
        wordmarkColor={colors.white}
        texture={tex.enabled}
        textureOpacity={tex.opacity}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            padding: '0 72px 220px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 26,
          }}
        >
          <Badge>Resultado</Badge>
          <p
            style={{
              fontSize: corpoStyle.fontSize,
              fontWeight: corpoStyle.fontWeight,
              fontStyle: corpoStyle.fontStyle,
              color: colors.white,
              lineHeight: corpoStyle.lineHeight,
              margin: 0,
              letterSpacing: corpoStyle.letterSpacing,
              maxWidth: 880,
            }}
          >
            &ldquo;{slide.corpo}&rdquo;
          </p>
          <div style={{display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap'}}>
            {slide.metrica ? (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  background: 'rgba(255,255,255,0.14)',
                  borderRadius: 16,
                  padding: '14px 22px',
                  boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.2)',
                }}
              >
                <IconGrowth size={28} color={colors.white} strokeWidth={2.6} />
                <span style={{fontSize: 36, fontWeight: 700, color: colors.white}}>{slide.metrica}</span>
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
        </div>
        {graphics ? (
          <div style={{position: 'absolute', right: -60, bottom: -40}}>
            <GhostBars color={colors.white} opacity={0.09} width={380} />
          </div>
        ) : null}
      </Frame>
    );
  }

  // slide.kind === 'cta'
  const headlineStyleCta = headlineStyle(vs, 56, -1, 1.12);
  return (
    <Frame background={colors.black} wordmarkColor={colors.white} texture={tex.enabled} textureOpacity={tex.opacity}>
      {graphics ? (
        <div style={{position: 'absolute', right: -80, bottom: -60}}>
          <GhostQuote color={colors.white} opacity={0.06} size={420} />
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
          gap: 32,
        }}
      >
        <Badge>Depoimento</Badge>
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
          {slide.headline ?? 'Quer um resultado parecido no seu negócio?'}
        </h2>
        <CtaBand />
      </div>
    </Frame>
  );
};

export const depoimentoDefaultProps: {slide: DepoimentoSlide; theme?: ThemeName; visualStyle?: VisualStyleName} = {
  slide: {
    kind: 'capa',
    citacao:
      'Antes eu só descobria a divergência no fim do mês. Hoje eu vejo o estoque batendo com o sistema todo dia.',
    cliente: 'Marcos Andrade',
    empresa: 'Distribuidora Bom Ponto',
  },
  theme: 'estoque',
};
