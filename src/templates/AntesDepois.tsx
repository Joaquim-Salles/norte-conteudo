import React from 'react';
import {Frame} from '../lib/Frame';
import {CtaBand} from '../lib/CtaBand';
import {colors} from '../lib/tokens';
import {getTheme} from '../lib/themes';
import {GhostArrowUp} from '../lib/GhostGraphics';
import {IconAlert, IconCheck, IconGrowth} from '../lib/icons';
import type {AntesDepoisData} from '../lib/types';

/**
 * Template 3 — Antes/Depois, em 3 variacoes:
 *  - padrao: split horizontal 50/50, metrica como badge no bloco DEPOIS.
 *  - ladoALado: split vertical esquerda (antes) / direita (depois), selo na costura.
 *  - metricaHero: a metrica vira o elemento gigante central da peca, antes/depois
 *    encolhem pra legendas curtas acima/abaixo — pedido do fundador por "numero grande".
 * Em todas, a prova concreta (metrica) sustenta o CTA.
 *
 * `theme` (default 'marca') troca o gradiente do bloco DEPOIS pelo sistema
 * anunciado (ver src/lib/themes.ts) — accent/selo "Com a Norte" ficam fixos
 * (identidade de marca e CTA nao mudam por tema).
 */
export const AntesDepois: React.FC<AntesDepoisData> = ({
  antesLabel = 'Antes',
  antesTexto,
  depoisLabel = 'Depois',
  depoisTexto,
  metrica,
  variant = 'padrao',
  theme = 'marca',
}) => {
  const t = getTheme(theme);

  if (variant === 'metricaHero') {
    return (
      <Frame background={t.colors.dark} wordmarkColor={colors.white}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            padding: '150px 64px 220px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
            <IconAlert size={20} color="rgba(255,255,255,0.5)" strokeWidth={2.4} />
            <span
              style={{
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: 2,
                color: 'rgba(255,255,255,0.5)',
                textTransform: 'uppercase',
              }}
            >
              {antesLabel}
            </span>
          </div>
          <p
            style={{
              fontSize: 30,
              fontWeight: 400,
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.35,
              margin: '10px 0 0',
              maxWidth: 760,
            }}
          >
            {antesTexto}
          </p>

          {metrica ? (
            <div
              style={{
                marginTop: 56,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
                <IconGrowth size={68} color={colors.accent} strokeWidth={2} />
                <span
                  style={{
                    fontSize: 158,
                    fontWeight: 700,
                    color: colors.accent,
                    lineHeight: 0.92,
                    letterSpacing: -4,
                    textShadow: '0 20px 50px rgba(244,63,94,0.35)',
                  }}
                >
                  {metrica}
                </span>
              </div>
              <div style={{marginTop: 22, height: 5, width: 140, background: colors.accent, borderRadius: 999}} />
            </div>
          ) : null}

          <div style={{marginTop: 56, display: 'flex', alignItems: 'center', gap: 10}}>
            <IconCheck size={22} color={colors.white} strokeWidth={3} />
            <span
              style={{
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: 2,
                color: colors.white,
                textTransform: 'uppercase',
              }}
            >
              {depoisLabel}
            </span>
          </div>
          <p
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: colors.white,
              lineHeight: 1.22,
              margin: '10px 0 0',
              maxWidth: 800,
            }}
          >
            {depoisTexto}
          </p>

          <div style={{position: 'absolute', right: -10, top: 60}}>
            <GhostArrowUp color={colors.white} opacity={0.08} size={200} />
          </div>
        </div>

        <div style={{position: 'absolute', left: 64, right: 64, bottom: 130}}>
          <CtaBand label="Quero isso" sub="fala com a gente no WhatsApp — link na bio" />
        </div>
      </Frame>
    );
  }

  if (variant === 'ladoALado') {
    return (
      <Frame background={colors.white} wordmarkColor={colors.black}>
        {/* ANTES — coluna esquerda, apagada */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 260,
            width: 460,
            background: '#dcdce6',
            padding: '100px 40px 0 64px',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
            <IconAlert size={18} color="#6c6c80" strokeWidth={2.4} />
            <span
              style={{
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: 2,
                color: '#6c6c80',
                textTransform: 'uppercase',
              }}
            >
              {antesLabel}
            </span>
          </div>
          <p
            style={{
              fontSize: 34,
              fontWeight: 400,
              color: '#54546a',
              lineHeight: 1.3,
              margin: '18px 0 0',
            }}
          >
            {antesTexto}
          </p>
          <div style={{position: 'absolute', left: 20, bottom: 30}}>
            <GhostArrowUp color="#54546a" opacity={0.09} size={140} />
          </div>
        </div>

        {/* DEPOIS — coluna direita, viva */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 460,
            right: 0,
            bottom: 260,
            background: `linear-gradient(160deg, ${t.colors.light} 0%, ${t.colors.dark} 100%)`,
            padding: '100px 56px 0 48px',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
            <IconCheck size={18} color={colors.accent} strokeWidth={3} />
            <span
              style={{
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: 2,
                color: colors.accent,
                textTransform: 'uppercase',
              }}
            >
              {depoisLabel}
            </span>
          </div>
          <p
            style={{
              fontSize: 38,
              fontWeight: 700,
              color: colors.white,
              lineHeight: 1.28,
              margin: '18px 0 0',
            }}
          >
            {depoisTexto}
          </p>
          {metrica ? (
            <div
              style={{
                marginTop: 26,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                background: 'rgba(255,255,255,0.14)',
                borderRadius: 16,
                padding: '14px 22px',
                boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.2)',
              }}
            >
              <IconGrowth size={26} color={colors.white} strokeWidth={2.6} />
              <span style={{fontSize: 36, fontWeight: 700, color: colors.white}}>{metrica}</span>
            </div>
          ) : null}
          <div style={{position: 'absolute', right: 4, bottom: 20}}>
            <GhostArrowUp color={colors.white} opacity={0.1} size={160} />
          </div>
        </div>

        {/* Selo na costura vertical */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: 460,
            transform: 'translate(-50%, -50%)',
            background: colors.accent,
            color: colors.white,
            fontWeight: 700,
            fontSize: 20,
            padding: '12px 22px',
            borderRadius: 999,
            boxShadow: '0 14px 30px -8px rgba(0,0,0,0.45)',
            whiteSpace: 'nowrap',
          }}
        >
          Com a Norte
        </div>

        <div style={{position: 'absolute', left: 64, right: 64, bottom: 130}}>
          <CtaBand label="Quero isso" sub="fala com a gente no WhatsApp — link na bio" />
        </div>
      </Frame>
    );
  }

  // variant === 'padrao'
  return (
    <Frame background={colors.white} wordmarkColor={colors.white}>
      {/* ANTES — metade superior, tom apagado */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 520,
          background: '#dcdce6',
          padding: '80px 64px 0',
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
          <IconAlert size={20} color="#6c6c80" strokeWidth={2.4} />
          <span
            style={{
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: 2,
              color: '#6c6c80',
              textTransform: 'uppercase',
            }}
          >
            {antesLabel}
          </span>
        </div>
        <p
          style={{
            fontSize: 40,
            fontWeight: 400,
            color: '#54546a',
            lineHeight: 1.22,
            margin: '18px 0 0',
            maxWidth: 880,
          }}
        >
          {antesTexto}
        </p>
        <div style={{position: 'absolute', right: 10, bottom: 20}}>
          <GhostArrowUp color="#54546a" opacity={0.08} size={190} />
        </div>
      </div>

      {/* DEPOIS — metade inferior, cor viva */}
      <div
        style={{
          position: 'absolute',
          top: 520,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(150deg, ${t.colors.light} 0%, ${t.colors.dark} 100%)`,
          padding: '72px 64px 0',
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
          <IconCheck size={20} color={colors.accent} strokeWidth={3} />
          <span
            style={{
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: 2,
              color: colors.accent,
              textTransform: 'uppercase',
            }}
          >
            {depoisLabel}
          </span>
        </div>
        <p
          style={{
            fontSize: 44,
            fontWeight: 700,
            color: colors.white,
            lineHeight: 1.2,
            margin: '18px 0 0',
            maxWidth: 880,
          }}
        >
          {depoisTexto}
        </p>
        {metrica ? (
          <div
            style={{
              marginTop: 28,
              display: 'inline-flex',
              alignItems: 'baseline',
              gap: 10,
              background: 'rgba(255,255,255,0.12)',
              borderRadius: 16,
              padding: '14px 24px',
              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.18)',
            }}
          >
            <IconGrowth size={32} color={colors.white} strokeWidth={2.6} />
            <span style={{fontSize: 46, fontWeight: 700, color: colors.white}}>{metrica}</span>
          </div>
        ) : null}
        <div style={{position: 'absolute', right: 10, bottom: 250}}>
          <GhostArrowUp color={colors.white} opacity={0.09} size={220} />
        </div>
      </div>

      {/* Selo central marcando a virada */}
      <div
        style={{
          position: 'absolute',
          top: 520 - 44,
          left: '50%',
          transform: 'translateX(-50%)',
          background: colors.accent,
          color: colors.white,
          fontWeight: 700,
          fontSize: 22,
          padding: '12px 26px',
          borderRadius: 999,
          boxShadow: '0 12px 28px -8px rgba(0,0,0,0.4)',
        }}
      >
        Com a Norte
      </div>

      <div style={{position: 'absolute', left: 64, right: 64, bottom: 130}}>
        <CtaBand label="Quero isso" sub="fala com a gente no WhatsApp — link na bio" />
      </div>
    </Frame>
  );
};

export const antesDepoisDefaultProps: AntesDepoisData = {
  antesTexto: 'Inventário fechava sempre com divergência e ninguém sabia explicar o motivo.',
  depoisTexto: 'Inventário bate com o sistema todo mês, sem retrabalho.',
  metrica: '-92% divergência',
};
