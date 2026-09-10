import React from 'react';
import {Img, staticFile} from 'remotion';
import {FONT_SANS} from './fonts';

/**
 * Moldura de navegador — pra encaixar um print real de produto dentro de um
 * carrossel sem "jogar a imagem crua". Pedido do fundador (2026-09-05,
 * feedback rodada 2): "poderia ter print e etc" — o carrossel era 100%
 * tipográfico/ilustrativo, sem nenhuma prova de que existe um sistema de
 * verdade por trás.
 *
 * Screenshot fonte é desktop (1440x900, NTB Estoque) — moldura de navegador
 * (barra de título + 3 pontos + barra de endereço) é o frame certo pro
 * formato, não um frame de celular (a tela real é web, não mobile).
 */
export const BrowserFrame: React.FC<{
  screenshot: string;
  width: number;
  addressLabel?: string;
  /** Recorte vertical do print (0-1 do topo), pra focar numa área específica. */
  cropTop?: number;
  cropHeight?: number;
  /**
   * Dimensão REAL do arquivo de print (px). Default 1440x900 (produto/validade
   * desktop). Formato "Prova" (2026-09-06) trouxe prints com proporções
   * diferentes (home-desktop.png é full-page tall, 1425x1624; vendas-desktop.png
   * é 2880x1658) — sem isso a imagem esticava/distorcia dentro da moldura.
   */
  sourceWidth?: number;
  sourceHeight?: number;
}> = ({
  screenshot,
  width,
  addressLabel = 'app.ntbestoque.com.br',
  cropTop = 0,
  cropHeight = 1,
  sourceWidth = 1440,
  sourceHeight = 900,
}) => {
  const chromeHeight = width * 0.062;
  const aspect = sourceWidth / sourceHeight;
  const contentWidth = width;
  const contentHeight = contentWidth / aspect;
  const visibleHeight = contentHeight * cropHeight;

  return (
    <div
      style={{
        width: contentWidth,
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: '0 24px 60px rgba(10,10,10,0.16), 0 2px 8px rgba(10,10,10,0.08)',
        border: '1px solid rgba(10,10,10,0.08)',
        background: '#ffffff',
      }}
    >
      <div
        style={{
          height: chromeHeight,
          display: 'flex',
          alignItems: 'center',
          gap: chromeHeight * 0.3,
          padding: `0 ${chromeHeight * 0.5}px`,
          background: '#eceae4',
          borderBottom: '1px solid rgba(10,10,10,0.08)',
        }}
      >
        <div style={{display: 'flex', gap: chromeHeight * 0.22}}>
          {['#ea2840', '#f8a41a', '#2eb5c3'].map((c) => (
            <div
              key={c}
              style={{
                width: chromeHeight * 0.22,
                height: chromeHeight * 0.22,
                borderRadius: '50%',
                background: c,
              }}
            />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            height: chromeHeight * 0.5,
            borderRadius: chromeHeight * 0.25,
            background: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            padding: `0 ${chromeHeight * 0.35}px`,
            fontFamily: FONT_SANS,
            fontWeight: 400,
            fontSize: chromeHeight * 0.32,
            color: '#4a4a4a',
          }}
        >
          {addressLabel}
        </div>
      </div>
      <div style={{width: contentWidth, height: visibleHeight, overflow: 'hidden', position: 'relative'}}>
        <Img
          src={screenshot}
          style={{
            width: contentWidth,
            height: contentHeight,
            position: 'absolute',
            top: -contentHeight * cropTop,
            left: 0,
            display: 'block',
          }}
        />
      </div>
    </div>
  );
};

export const ntbEstoqueProdutoScreenshot = staticFile('screenshots/produto-desktop.png');

/**
 * Moldura de celular — pro formato "Prova" (2026-09-06), que usa prints reais
 * de mobile (ex.: vendas-mobile.png, 1170x2532, tela de venda no balcão).
 * Bisel escuro sóbrio (mesma família do BrowserFrame, sem "casca de iPhone"
 * genérica de clipart) + notch simples + barra de home indicator.
 */
export const PhoneFrame: React.FC<{
  screenshot: string;
  width: number;
  sourceWidth?: number;
  sourceHeight?: number;
  cropTop?: number;
  cropHeight?: number;
}> = ({screenshot, width, sourceWidth = 1170, sourceHeight = 2532, cropTop = 0, cropHeight = 1}) => {
  const bezel = width * 0.045;
  const radius = width * 0.14;
  const aspect = sourceWidth / sourceHeight;
  const screenWidth = width - bezel * 2;
  const fullScreenHeight = screenWidth / aspect;
  const visibleHeight = fullScreenHeight * cropHeight;
  const notchWidth = width * 0.28;

  return (
    <div
      style={{
        width,
        padding: bezel,
        borderRadius: radius,
        background: '#1c1c1c',
        boxShadow: '0 24px 60px rgba(10,10,10,0.2), 0 2px 8px rgba(10,10,10,0.1)',
        display: 'inline-block',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: screenWidth,
          height: visibleHeight,
          overflow: 'hidden',
          borderRadius: radius * 0.62,
          background: '#fff',
        }}
      >
        <Img
          src={screenshot}
          style={{
            width: screenWidth,
            height: fullScreenHeight,
            position: 'absolute',
            top: -fullScreenHeight * cropTop,
            left: 0,
            display: 'block',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: bezel * 0.5,
            left: '50%',
            transform: 'translateX(-50%)',
            width: notchWidth,
            height: bezel * 0.85,
            borderRadius: 999,
            background: '#1c1c1c',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: bezel * 0.55,
            left: '50%',
            transform: 'translateX(-50%)',
            width: width * 0.32,
            height: 5,
            borderRadius: 999,
            background: 'rgba(10,10,10,0.28)',
          }}
        />
      </div>
    </div>
  );
};
