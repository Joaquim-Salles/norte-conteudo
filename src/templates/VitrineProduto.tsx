import React from 'react';
import {Img, staticFile} from 'remotion';
import {Frame} from '../lib/Frame';
import {CtaBand} from '../lib/CtaBand';
import {colors} from '../lib/tokens';
import {GhostCheck} from '../lib/GhostGraphics';
import type {VitrineProdutoData} from '../lib/types';

const productLogo: Record<VitrineProdutoData['produto'], string | null> = {
  ntbEstoque: 'logos/estoque-logo.png',
  ntbVendas: 'logos/vendas-icon-512.png', // so tem icone de app, sem wordmark proprio ainda
  norteAvalia: null, // sem asset local — usa so o wordmark tipografico
};

/**
 * Template 4 — Vitrine de produto
 * Usa a cor propria do produto (design-tokens.md) como fundo dominante — reforca
 * diferenciacao visual entre NTB Estoque / NTB Vendas / Norte Avalia mesmo sem
 * logo dedicado pra todos. CTA aqui e comercial direto (nao so informativo).
 */
export const VitrineProduto: React.FC<VitrineProdutoData> = ({
  produto,
  nomeProduto,
  headline,
  features,
  ctaLabel,
}) => {
  const productColor = colors.product[produto];
  const logo = productLogo[produto];

  return (
    <Frame background={productColor.dark} wordmarkColor={colors.white}>
      {/* Bloco superior de identidade do produto */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 620,
          background: `linear-gradient(160deg, ${productColor.base} 0%, ${productColor.dark} 100%)`,
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
            fontSize: 60,
            fontWeight: 700,
            color: colors.white,
            lineHeight: 1.08,
            letterSpacing: -1,
            margin: 0,
            maxWidth: 900,
          }}
        >
          {headline}
        </h1>
      </div>

      <div style={{position: 'absolute', right: -50, bottom: 210, zIndex: 0}}>
        <GhostCheck color={colors.white} opacity={0.06} size={340} />
      </div>

      {/* Lista de features — cartoes compactos, escaneavel */}
      <div
        style={{
          position: 'absolute',
          zIndex: 1,
          top: 480,
          left: 64,
          right: 64,
          display: 'flex',
          flexDirection: 'column',
          gap: 22,
        }}
      >
        {features.slice(0, 4).map((f, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              background: 'rgba(255,255,255,0.07)',
              borderRadius: 16,
              padding: '26px 26px',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
          >
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
            <span style={{fontSize: 28, fontWeight: 400, color: colors.white}}>{f}</span>
          </div>
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
