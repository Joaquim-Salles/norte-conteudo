import React from 'react';
import {Img, staticFile} from 'remotion';

/**
 * Molduras de device pra print real do sistema — "prova visual" (Vitrine de
 * Produto variant 'print'), nao um icone generico. Sombra + moldura +
 * inclinacao sutil dao peso fisico ao screenshot, em vez de colar a imagem
 * crua na peca.
 */

type PhoneFrameProps = {
  /** Caminho relativo em public/ (sera resolvido com staticFile). */
  src: string;
  width?: number;
  /** Graus de rotacao — leve inclinacao "poster", nao um giro forte. */
  rotate?: number;
  /**
   * largura/altura do PROPRIO screenshot (nao da moldura). Default = proporcao
   * de celular real (~0.462, tipo iPhone). IMPORTANTE: se o screenshot real
   * tiver proporcao diferente (ex: capturado num viewport mais largo/curto),
   * passar o valor certo aqui evita `objectFit: cover` cortar conteudo real
   * da UI nas laterais — visto acontecer com um screenshot 500x844 (achado
   * no QA de 2026-08-31, corrigido).
   */
  aspectRatio?: number;
};

export const PhoneFrame: React.FC<PhoneFrameProps> = ({src, width = 360, rotate = -5, aspectRatio = 0.462}) => {
  const height = Math.round(width / aspectRatio);
  const bezel = Math.round(width * 0.032);

  return (
    <div
      style={{
        width,
        height,
        transform: `rotate(${rotate}deg)`,
        borderRadius: Math.round(width * 0.13),
        background: '#0c0c10',
        padding: bezel,
        boxSizing: 'border-box',
        boxShadow: '0 60px 100px -30px rgba(0,0,0,0.6), 0 16px 34px -12px rgba(0,0,0,0.45)',
        position: 'relative',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: Math.round(width * 0.1),
          overflow: 'hidden',
          background: '#000',
          position: 'relative',
        }}
      >
        <Img
          src={staticFile(src)}
          style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center'}}
        />
      </div>
      {/* Notch/dynamic-island simplificado */}
      <div
        style={{
          position: 'absolute',
          top: bezel + Math.round(width * 0.035),
          left: '50%',
          transform: 'translateX(-50%)',
          width: Math.round(width * 0.32),
          height: Math.round(width * 0.065),
          borderRadius: 999,
          background: '#0c0c10',
        }}
      />
    </div>
  );
};

type BrowserFrameProps = {
  src: string;
  width?: number;
  rotate?: number;
  /**
   * largura/altura da MOLDURA (nao do screenshot) — controla quanto da altura
   * da pagina aparece. Default ~1.61 recorta pro topo (above the fold) de
   * capturas full-page; pra um screenshot de viewport ja "curto" (ex:
   * 1440x900), passar a proporcao real do arquivo deixa a moldura igual ao
   * screenshot, sem cortar nada relevante.
   */
  aspectRatio?: number;
};

export const BrowserFrame: React.FC<BrowserFrameProps> = ({
  src,
  width = 860,
  rotate = 2.5,
  aspectRatio = 1.61,
}) => {
  const height = Math.round(width / aspectRatio);

  return (
    <div
      style={{
        width,
        transform: `rotate(${rotate}deg)`,
        borderRadius: 18,
        background: '#1c1c22',
        boxShadow: '0 70px 110px -30px rgba(0,0,0,0.6), 0 18px 38px -14px rgba(0,0,0,0.45)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          height: 38,
          display: 'flex',
          alignItems: 'center',
          gap: 9,
          padding: '0 16px',
          background: '#26262e',
        }}
      >
        <div style={{width: 12, height: 12, borderRadius: 6, background: '#ff5f57'}} />
        <div style={{width: 12, height: 12, borderRadius: 6, background: '#febc2e'}} />
        <div style={{width: 12, height: 12, borderRadius: 6, background: '#28c840'}} />
      </div>
      <div style={{width: '100%', height, overflow: 'hidden', background: '#000'}}>
        <Img
          src={staticFile(src)}
          style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center'}}
        />
      </div>
    </div>
  );
};
