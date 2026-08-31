import React from 'react';
import {Frame} from '../lib/Frame';
import {colors} from '../lib/tokens';
import {getTheme} from '../lib/themes';
import {PhotoBackground} from '../lib/PhotoBackground';
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
}) => {
  const themeColors = getTheme(theme).colors;

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
