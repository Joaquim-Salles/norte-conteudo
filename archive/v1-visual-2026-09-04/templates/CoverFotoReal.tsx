import React from 'react';
import {Frame} from '../lib/Frame';
import {colors} from '../lib/tokens';
import {getTheme} from '../lib/themes';
import {PhotoBackground} from '../lib/PhotoBackground';
import {StatusChip} from '../lib/StatusChip';
import {getVisualStyle, headlineStyle, isMinimalDecoration, type VisualStyleName} from '../lib/visualStyles';
import type {CoverFotoRealData} from '../lib/types';

/**
 * Template exploratorio (novo, 2026-08-31) — "prova social"/contexto: foto
 * REAL de restaurante (mesa posta, prato servido, movimento de salao) em tela
 * cheia, servindo de ABERTURA/COVER pra um carrossel sobre um produto
 * (tipicamente NTB Vendas/Cardapio Digital). Pedido do fundador: "quero mais
 * opcoes com fotos reais as vezes do restaurante... bora explorar".
 *
 * Nao e um dos "5 tipos de post" da Fase 0 (ver CATALOGO.md) — e uma peca a
 * parte, simples de proposito: prender o swipe com uma foto real de contexto
 * antes do carrossel entrar no conteudo (que pode ser DicaPratica/
 * MetodologiaSemEnrolacao normais). O badge/eyebrow usa a cor do tema
 * (produto anunciado ou 'marca'), o resto do tratamento e neutro (preto +
 * branco) pra nao competir com a foto.
 */
export const CoverFotoReal: React.FC<CoverFotoRealData> = ({
  titulo,
  tagNumero,
  foto,
  fotoPosition = 'center 15%',
  theme = 'marca',
  visualStyle,
  statusVerbo,
}) => {
  const themeColors = getTheme(theme).colors;
  const vs = visualStyle ? getVisualStyle(visualStyle) : null;
  const minimal = isMinimalDecoration(vs);

  // editorialClaude (2026-09-05): formato mais comum da grade real do
  // @claudeai é justamente ESTE — foto documental crua (sem badge, sem
  // device frame, sem overlay pesado) + legenda serifada pequena discreta
  // num canto, "respirando". Overlay muito mais fraco (0.42 vs. 0.9 do
  // original) e só na base — o suficiente pra legibilidade do texto PEQUENO,
  // nunca um escurecimento dramático que "peso de peça de marketing" pede.
  if (minimal) {
    const tituloStyle = headlineStyle(vs, 44, 0, 1.2);
    // Gap 3 do QA rigoroso 2026-09-05 (comparação direta vs. "There's hope in
    // hard questions", grid-1 real do @claudeai): texto sobre foto na
    // referência é CENTRALIZADO (não canto inferior esquerdo) e tem peso
    // médio/regular — nunca o preto/bold que headlineWeight:'bold' do preset
    // resolveria por padrão. Overlay fraco (0.42) fica igual; muda só
    // posição/peso, ambos hardcoded aqui porque são específicos do formato
    // "texto sobre foto", não do preset como um todo (Bastidores/DicaPratica
    // sobre CARTÃO DE COR continuam serifado bold, que é certo lá).
    //
    // SISTEMA DE 2 FONTES (2026-09-06, relatório do fundador §3): "sans BOLD
    // pra dado/título + SERIFADA ITÁLICA pra overlay em foto" — papéis
    // DIFERENTES, não "uma serifada" só. `headlineWeight: 'bold'` do preset
    // resolve `fontStyle: 'normal'` (correto pro card de cor sólida, ver
    // Bastidores/DicaPratica-bridge) — mas ESTE formato específico
    // (overlay-em-foto) é o único onde a referência real usa itálico, então
    // `fontStyle` é hardcoded aqui, mesmo raciocínio já aplicado ao
    // `fontWeight: 500` na linha abaixo.
    return (
      <Frame background={colors.black} wordmarkColor={colors.white} texture={false}>
        <PhotoBackground src={foto} position={fotoPosition} overlay="bottom" strength={0.42} />
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
          {titulo ? (
            <p
              style={{
                fontSize: tituloStyle.fontSize,
                fontWeight: 500,
                fontStyle: 'italic',
                fontFamily: tituloStyle.fontFamily,
                color: colors.white,
                lineHeight: tituloStyle.lineHeight,
                letterSpacing: tituloStyle.letterSpacing,
                margin: 0,
                maxWidth: 640,
                textAlign: 'center',
              }}
            >
              {titulo}
            </p>
          ) : null}
        </div>

        {/* StatusChip (2026-09-06, relatório do fundador §3) — pílula
            discreta num canto, contextualizando a cena com verbo no
            gerúndio ("a marca narrando a cena"). Canto SUPERIOR-esquerdo:
            não compete com o título centralizado nem colide com o wordmark
            de marca (Frame desenha o wordmark em bottom:56/left:64 — ver
            Frame.tsx). Cor do tema aparece só no círculo do ícone — nunca
            como bloco de fundo do chip inteiro. */}
        {statusVerbo ? (
          <div style={{position: 'absolute', left: 64, top: 64}}>
            <StatusChip verbo={statusVerbo} accentColor={themeColors.base} tone="dark" />
          </div>
        ) : null}
      </Frame>
    );
  }

  return (
    <Frame background={colors.black} wordmarkColor={colors.white} texture={false}>
      <PhotoBackground src={foto} position={fotoPosition} overlay="bottom" strength={0.9} />
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
        {tagNumero ? (
          <span
            style={{
              display: 'inline-flex',
              alignSelf: 'flex-start',
              background: themeColors.base,
              color: colors.white,
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: 'uppercase',
              padding: '10px 22px',
              borderRadius: 999,
              boxShadow: '0 10px 24px -10px rgba(0,0,0,0.55)',
            }}
          >
            {tagNumero}
          </span>
        ) : null}
        <h1
          style={{
            fontSize: 74,
            fontWeight: 700,
            color: colors.white,
            lineHeight: 1.03,
            letterSpacing: -1.5,
            margin: '32px 0 0',
            maxWidth: 940,
            textShadow: '0 10px 34px rgba(0,0,0,0.55)',
          }}
        >
          {titulo}
        </h1>
        <span
          style={{
            marginTop: 36,
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
};

export const coverFotoRealDefaultProps: CoverFotoRealData = {
  titulo: 'Seu cliente já quer pedir pelo celular.',
  tagNumero: 'CARDÁPIO DIGITAL',
  foto: 'photos/salao-moderno-movimento.jpg',
  theme: 'vendas',
};
