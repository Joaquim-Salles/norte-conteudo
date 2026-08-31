import React from 'react';
import {Frame} from '../lib/Frame';
import {CtaBand} from '../lib/CtaBand';
import {colors} from '../lib/tokens';
import {getTheme} from '../lib/themes';
import {GhostBars, GhostQuote} from '../lib/GhostGraphics';
import {IconAlert, IconChart} from '../lib/icons';
import {Badge} from '../lib/Badge';
import type {DadoVsAchismoData} from '../lib/types';

/**
 * Template 1 — Dado vs. Achismo
 * Bordao central da marca ("nao trabalhamos com achismos") virou o proprio
 * mecanismo visual em 3 variacoes (mesmo principio, composicao diferente):
 *  - padrao: split horizontal, achismo comprimido em cima, dado dominante embaixo.
 *  - impacto: achismo vira so uma tarja fina, o numero do dado ocupa quase a tela toda.
 *  - ladoALado: split vertical esquerda/direita, leitura mais editorial/revista.
 * CTA sempre aponta a decisao certa pro WhatsApp.
 *
 * `theme` (default 'marca') troca a paleta de fundo/glow pelo sistema anunciado
 * (ver src/lib/themes.ts) — o accent vermelho de CTA/badge fica fixo em todos os
 * temas de proposito (reconhecimento de marca + urgencia do lead-gen).
 */
export const DadoVsAchismo: React.FC<DadoVsAchismoData> = ({
  achismo,
  dado,
  fonteDado,
  variant = 'padrao',
  theme = 'marca',
}) => {
  const t = getTheme(theme);

  if (variant === 'impacto') {
    return (
      <Frame background={t.colors.dark} wordmarkColor={colors.white} texture={true}>
        {/* Achismo — tarja fina, quase apagada */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 200,
            background: 'rgba(255,255,255,0.06)',
            padding: '52px 64px 0',
            borderBottom: '1px solid rgba(255,255,255,0.09)',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
            <IconAlert size={18} color="rgba(255,255,255,0.45)" strokeWidth={2.4} />
            <span
              style={{
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: 2,
                color: 'rgba(255,255,255,0.45)',
                textTransform: 'uppercase',
              }}
            >
              Achismo
            </span>
          </div>
          <p
            style={{
              fontSize: 26,
              fontWeight: 400,
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.3,
              margin: '8px 0 0',
              textDecoration: 'line-through',
              textDecorationColor: 'rgba(255,255,255,0.3)',
              maxWidth: 900,
            }}
          >
            {achismo}
          </p>
        </div>

        {/* Dado — domina o resto do quadro, numero gigante */}
        <div
          style={{
            position: 'absolute',
            top: 200,
            left: 0,
            right: 0,
            bottom: 0,
            padding: '64px 64px 210px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
            <IconChart size={26} color={colors.accent} strokeWidth={2.6} />
            <Badge>Dado real</Badge>
          </div>
          <p
            style={{
              fontSize: 92,
              fontWeight: 700,
              color: colors.white,
              lineHeight: 0.98,
              margin: '30px 0 0',
              letterSpacing: -2.8,
            }}
          >
            {dado}
          </p>
          {fonteDado ? (
            <span style={{fontSize: 19, color: 'rgba(255,255,255,0.5)', marginTop: 28}}>
              Fonte: {fonteDado}
            </span>
          ) : null}
          <div style={{position: 'absolute', right: -20, bottom: 220}}>
            <GhostBars color={t.colors.light} opacity={0.22} width={340} />
          </div>
        </div>

        <div style={{position: 'absolute', left: 64, right: 64, bottom: 130}}>
          <CtaBand label="Chama no WhatsApp" sub="decisao com dado, nao achismo — link na bio" />
        </div>
      </Frame>
    );
  }

  if (variant === 'ladoALado') {
    return (
      <Frame background={colors.white} wordmarkColor={colors.black}>
        {/* Coluna ACHISMO — esquerda, comprimida */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 260,
            width: 400,
            background: '#e7e7ee',
            padding: '100px 40px 0 64px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
            <IconAlert size={18} color="#8a8a99" strokeWidth={2.4} />
            <span
              style={{
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: 2,
                color: '#8a8a99',
                textTransform: 'uppercase',
              }}
            >
              Achismo
            </span>
          </div>
          <p
            style={{
              fontSize: 32,
              fontWeight: 400,
              fontStyle: 'italic',
              color: '#9a9aab',
              lineHeight: 1.3,
              margin: '18px 0 0',
              textDecoration: 'line-through',
              textDecorationColor: '#b4b4c4',
              textDecorationThickness: 2,
            }}
          >
            {achismo}
          </p>
          <div style={{position: 'absolute', left: 26, bottom: 36}}>
            <GhostQuote color="#54546a" opacity={0.12} size={110} />
          </div>
        </div>

        {/* Coluna DADO — direita, dominante */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 400,
            right: 0,
            bottom: 260,
            background: t.colors.dark,
            padding: '100px 56px 0 48px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
            <IconChart size={20} color={colors.accent} strokeWidth={2.6} />
            <span
              style={{
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: 2,
                color: colors.accent,
                textTransform: 'uppercase',
              }}
            >
              Dado
            </span>
          </div>
          <p
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: colors.white,
              lineHeight: 1.14,
              margin: '20px 0 0',
              letterSpacing: -1,
            }}
          >
            {dado}
          </p>
          {fonteDado ? (
            <span style={{fontSize: 17, color: 'rgba(255,255,255,0.55)', marginTop: 22}}>
              Fonte: {fonteDado}
            </span>
          ) : null}
          <div style={{position: 'absolute', right: 6, bottom: 24}}>
            <GhostBars color={t.colors.light} opacity={0.16} width={210} />
          </div>
        </div>

        {/* Costura vertical entre as colunas — reforca a "virada" achismo -> dado */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 260,
            left: 386,
            width: 30,
            background: colors.accent,
            transform: 'skewX(-4deg)',
            boxShadow: '0 0 40px 4px rgba(244,63,94,0.35)',
          }}
        />

        <div style={{position: 'absolute', left: 64, right: 64, bottom: 130}}>
          <CtaBand label="Chama no WhatsApp" sub="decisao com dado, nao achismo — link na bio" />
        </div>
      </Frame>
    );
  }

  // variant === 'padrao'
  return (
    <Frame background={colors.white} wordmarkColor={colors.white}>
      {/* Bloco ACHISMO — comprimido, cinza, riscado: visualmente "errado" */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 420,
          background: '#e7e7ee',
          padding: '64px 64px 0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
          <IconAlert size={20} color="#8a8a99" strokeWidth={2.4} />
          <span
            style={{
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 2,
              color: '#8a8a99',
              textTransform: 'uppercase',
            }}
          >
            Achismo
          </span>
        </div>
        <p
          style={{
            fontSize: 44,
            fontWeight: 400,
            fontStyle: 'italic',
            color: '#9a9aab',
            lineHeight: 1.18,
            margin: '14px 0 0',
            textDecoration: 'line-through',
            textDecorationColor: '#b4b4c4',
            textDecorationThickness: 3,
          }}
        >
          {achismo}
        </p>
        <div style={{position: 'absolute', right: 24, top: 30}}>
          <GhostQuote color="#54546a" opacity={0.1} size={150} />
        </div>
      </div>

      {/* Bloco DADO — dominante, cor primaria, tipografia grande */}
      <div
        style={{
          position: 'absolute',
          top: 420,
          left: 0,
          right: 0,
          bottom: 0,
          background: t.colors.dark,
          padding: '56px 64px 200px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
          <IconChart size={22} color={colors.accent} strokeWidth={2.6} />
          <span
            style={{
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 2,
              color: colors.accent,
              textTransform: 'uppercase',
            }}
          >
            Dado
          </span>
        </div>
        <p
          style={{
            fontSize: 68,
            fontWeight: 700,
            color: colors.white,
            lineHeight: 1.08,
            margin: '18px 0 0',
            letterSpacing: -1,
          }}
        >
          {dado}
        </p>
        {fonteDado ? (
          <span style={{fontSize: 18, color: 'rgba(255,255,255,0.55)', marginTop: 20}}>
            Fonte: {fonteDado}
          </span>
        ) : null}
        <div style={{position: 'absolute', right: 20, bottom: 210}}>
          <GhostBars color={t.colors.light} opacity={0.12} width={300} />
        </div>
      </div>

      {/* Divisor diagonal entre os dois blocos, reforca a "virada" achismo -> dado */}
      <div
        style={{
          position: 'absolute',
          top: 396,
          left: 0,
          right: 0,
          height: 48,
          background: colors.accent,
          transform: 'skewY(-2.2deg)',
          transformOrigin: 'left',
        }}
      />

      <div style={{position: 'absolute', left: 64, right: 64, bottom: 130}}>
        <CtaBand label="Chama no WhatsApp" sub="decisao com dado, nao achismo — link na bio" />
      </div>
    </Frame>
  );
};

export const dadoVsAchismoDefaultProps: DadoVsAchismoData = {
  achismo: '"Acho que meu estoque tá mais ou menos certo."',
  dado: '38% das PMEs perdem margem por ruptura ou excesso de estoque não detectado.',
  fonteDado: 'Norte Para Negócios, diagnóstico operacional',
};
