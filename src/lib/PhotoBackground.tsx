import React from 'react';
import {Img, staticFile} from 'remotion';

export type PhotoOverlay = 'bottom' | 'top' | 'topAndBottom' | 'full' | 'none';

type PhotoBackgroundProps = {
  /** Caminho relativo em public/ (ex: 'photos/restaurante-ambiente-noturno.jpg'). */
  src: string;
  /** object-position CSS — controla qual parte da foto fica visivel apos o crop (objectFit: cover). */
  position?: string;
  /**
   * Gradiente escuro por cima da foto, pra legibilidade de texto — NUNCA usar
   * foto crua atras de texto sem overlay (contraste falha, ver constraint
   * "texto legivel sobre foto" do pedido do fundador).
   *  - 'bottom': escurece de baixo pra cima (texto ancorado embaixo — cover editorial).
   *  - 'top': escurece de cima pra baixo (texto ancorado em cima).
   *  - 'topAndBottom': escurece as duas pontas, meio da foto respira livre
   *    (usado quando ha identidade/headline em cima E CTA embaixo).
   *  - 'full': escurecimento uniforme leve (foto vira "clima" de fundo, nao protagonista).
   *  - 'none': sem overlay — so quando a peca ja garante contraste por outro meio.
   */
  overlay?: PhotoOverlay;
  /** Intensidade do preto no ponto mais escuro do gradiente (0-1). Default 0.92 — testado p/ contraste de texto branco sobre foto real. */
  strength?: number;
};

/**
 * Foto real em tela cheia (fundo de Still) + overlay de gradiente escuro pra
 * legibilidade de texto. Fotos vem de banco gratuito de uso comercial livre
 * (Pexels — ver public/photos/CREDITOS.md), baixadas localmente (Remotion
 * renderiza offline, nao pode depender de URL externa em runtime). Zero IA
 * generativa — fotografia real tirada por fotografo.
 */
export const PhotoBackground: React.FC<PhotoBackgroundProps> = ({
  src,
  position = 'center',
  overlay = 'bottom',
  strength = 0.92,
}) => {
  const gradient: string | undefined =
    overlay === 'bottom'
      ? `linear-gradient(to top, rgba(0,0,0,${strength}) 0%, rgba(0,0,0,${strength * 0.82}) 30%, rgba(0,0,0,${strength * 0.28}) 60%, rgba(0,0,0,0) 85%)`
      : overlay === 'top'
        ? `linear-gradient(to bottom, rgba(0,0,0,${strength}) 0%, rgba(0,0,0,${strength * 0.82}) 30%, rgba(0,0,0,${strength * 0.28}) 60%, rgba(0,0,0,0) 85%)`
        : overlay === 'topAndBottom'
          ? // Plato (nao fade imediato) nas duas pontas — largura suficiente pra
            // cobrir bloco de identidade+headline (topo) e CTA+wordmark (fundo)
            // inteiros com opacidade forte, nao so o pixel exato da borda.
            // FIX 2026-08-31 (QA visual, VitrineProduto 'contexto'): a versao
            // anterior desvanecia rapido demais (26%/66%) e a 2a linha do
            // headline caia fora da zona escura, ficando ilegivel sobre foto
            // clara — corrigido alongando o plato e o range de fade.
            `linear-gradient(to bottom, rgba(0,0,0,${strength}) 0%, rgba(0,0,0,${strength}) 24%, rgba(0,0,0,0) 48%, rgba(0,0,0,0) 56%, rgba(0,0,0,${strength}) 80%, rgba(0,0,0,${strength}) 100%)`
          : overlay === 'full'
            ? `rgba(0,0,0,${strength * 0.4})`
            : undefined;

  return (
    <div style={{position: 'absolute', inset: 0, overflow: 'hidden'}}>
      <Img
        src={staticFile(src)}
        style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: position}}
      />
      {gradient ? <div style={{position: 'absolute', inset: 0, background: gradient}} /> : null}
    </div>
  );
};
