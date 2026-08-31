import React from 'react';
import {Img, staticFile} from 'remotion';
import {Frame} from '../lib/Frame';
import {CtaBand} from '../lib/CtaBand';
import {colors} from '../lib/tokens';
import {getThemeForProduct} from '../lib/themes';
import {GhostCheck} from '../lib/GhostGraphics';
import {SurfaceCard} from '../lib/SurfaceCard';
import {PhoneFrame, BrowserFrame} from '../lib/DeviceFrame';
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
 * CTA sempre comercial direto (nao so informativo).
 *
 * Tema (paleta + cardStyle) e SEMPRE derivado do produto anunciado — nao e
 * escolha manual (ver src/lib/themes.ts, getThemeForProduct).
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
}) => {
  const theme = getThemeForProduct(produto);
  const productColor = theme.colors;
  const cardStyle = theme.cardStyle;
  const logo = productLogo[produto];

  if (variant === 'hero') {
    return (
      <Frame background={productColor.dark} wordmarkColor={colors.white}>
        <div style={{position: 'absolute', right: -60, top: -60, zIndex: 0}}>
          <GhostCheck color={colors.white} opacity={0.05} size={420} />
        </div>
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
              fontSize: 62,
              fontWeight: 700,
              color: colors.white,
              lineHeight: 1.08,
              letterSpacing: -1,
              margin: '20px 0 0',
              maxWidth: 880,
            }}
          >
            {headline}
          </h1>

          <div
            style={{
              marginTop: 52,
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
    return (
      <Frame background={productColor.dark} wordmarkColor={colors.white}>
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
              fontSize: 50,
              fontWeight: 700,
              color: colors.white,
              lineHeight: 1.1,
              letterSpacing: -1,
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

        <div style={{position: 'absolute', right: -40, bottom: 200, zIndex: 0}}>
          <GhostCheck color={colors.white} opacity={0.05} size={300} />
        </div>

        <div style={{position: 'absolute', left: 64, right: 64, bottom: 130}}>
          <CtaBand label={ctaLabel ?? 'Quero isso na minha loja'} sub="fala com a gente — link na bio" />
        </div>
      </Frame>
    );
  }

  if (variant === 'print') {
    const screenshotSrc = screenshot ?? 'screenshots/home-desktop.png';
    return (
      <Frame background={productColor.dark} wordmarkColor={colors.white}>
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
              fontSize: 42,
              fontWeight: 700,
              color: colors.white,
              lineHeight: 1.14,
              letterSpacing: -0.6,
              margin: 0,
              maxWidth: 880,
            }}
          >
            {headline}
          </h1>
        </div>

        <div style={{position: 'absolute', left: -60, bottom: 150, zIndex: 0}}>
          <GhostCheck color={colors.white} opacity={0.05} size={320} />
        </div>

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

  // variant === 'padrao'
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
            shellColor="rgba(255,255,255,0.04)"
            coreColor="rgba(255,255,255,0.08)"
            radius={20}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: 18, padding: '22px 22px'}}>
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
