import React from 'react';
import {Frame} from '../lib/Frame';
import {SurfaceCard} from '../lib/SurfaceCard';
import {colors} from '../lib/tokens';
import {GhostBars, GhostCheck} from '../lib/GhostGraphics';
import {IconCompass, IconCheck} from '../lib/icons';
import type {BastidoresData} from '../lib/types';

/**
 * Template novo (2026-09-01) — Bastidores / Como Trabalhamos, em 2 variacoes.
 *
 * Diferenca conceitual dos outros 7 tipos: nenhum deles fala sobre a PROPRIA
 * Norte por dentro — todos vendem pro cliente (dica, dado, metodologia,
 * produto) ou provam com voz do cliente/comparativo. Bastidores e sobre o
 * RIGOR INTERNO — "nao trabalhamos com achismos" como pratica real, nao so
 * slogan — pesquisa de mercado 2026 (CATALOGO.md §6) mostra que esse formato
 * converte por HUMANIZACAO/CONFIANCA, nao por push direto.
 *
 * Limitacao real documentada: nao existe asset de foto real do time/escritorio
 * da Norte disponivel nesta sessao — usar foto de banco de imagem generica
 * fingindo ser "o time" seria enganoso (mesma logica que ja vetou usar IA
 * generativa pra simular pessoa real, ver regra do fundador). Por isso este
 * tipo e 100% tipografico/grafico (sem foto), focado no PROCESSO/PRINCIPIO,
 * nao em rosto — se a Norte tiver fotografia real de bastidores no futuro,
 * cabe evoluir pra uma variante com PhotoBackground.
 *
 * DECISAO DE CTA (documentada, ver Checklist #2 da skill): este e o UNICO
 * tipo do catalogo SEM CtaBand cheio. Pesquisa 2026 e a logica do formato
 * concordam — bastidores constroi confianca pro fundo de funil, forcar CTA
 * agressivo aqui contradiz o proprio genero (autenticidade > venda). O link
 * da bio aparece só como linha discreta, nao como banda de destaque.
 */
export const Bastidores: React.FC<BastidoresData> = ({
  eyebrow = 'Como trabalhamos',
  titulo,
  principios,
  numero,
  corpo,
  variant = 'manifesto',
}) => {
  if (variant === 'regraDaCasa') {
    return (
      <Frame background={colors.primaryDark} wordmarkColor={colors.white}>
        <div style={{position: 'absolute', left: -110, bottom: -90}}>
          <GhostBars color={colors.white} opacity={0.08} width={620} />
        </div>
        <div style={{position: 'absolute', right: -70, top: -60}}>
          <GhostCheck color={colors.white} opacity={0.05} size={320} />
        </div>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            padding: '0 72px 200px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 30,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
            <IconCompass size={30} color={colors.accent} strokeWidth={2.2} />
            <span
              style={{
                fontSize: 21,
                fontWeight: 700,
                letterSpacing: 2,
                color: colors.accent,
                textTransform: 'uppercase',
              }}
            >
              {eyebrow}
            </span>
          </div>

          <SurfaceCard shellColor="rgba(255,255,255,0.06)" coreColor="rgba(255,255,255,0.1)">
            <div style={{padding: '40px 38px'}}>
              {numero ? (
                <span
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    letterSpacing: 1.5,
                    color: 'rgba(255,255,255,0.55)',
                    textTransform: 'uppercase',
                  }}
                >
                  {numero}
                </span>
              ) : null}
              <h2
                style={{
                  fontSize: 50,
                  fontWeight: 700,
                  color: colors.white,
                  lineHeight: 1.16,
                  letterSpacing: -1,
                  margin: '14px 0 0',
                }}
              >
                {titulo}
              </h2>
              {corpo ? (
                <p
                  style={{
                    fontSize: 28,
                    fontWeight: 400,
                    color: 'rgba(255,255,255,0.8)',
                    lineHeight: 1.42,
                    margin: '20px 0 0',
                  }}
                >
                  {corpo}
                </p>
              ) : null}
            </div>
          </SurfaceCard>
        </div>

        <div style={{position: 'absolute', left: 72, right: 72, bottom: 130, textAlign: 'center'}}>
          <span style={{fontSize: 20, fontWeight: 400, fontStyle: 'italic', color: 'rgba(255,255,255,0.55)'}}>
            Bastidores da Norte — link na bio
          </span>
        </div>
      </Frame>
    );
  }

  // variant === 'manifesto' (default)
  return (
    <Frame background={colors.black} wordmarkColor={colors.white}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          padding: '0 72px 200px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 40,
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              border: '2px solid rgba(255,255,255,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IconCompass size={26} color={colors.white} strokeWidth={2} />
          </div>
          <span
            style={{
              fontSize: 21,
              fontWeight: 700,
              letterSpacing: 2,
              color: 'rgba(255,255,255,0.65)',
              textTransform: 'uppercase',
            }}
          >
            {eyebrow}
          </span>
        </div>

        <h2
          style={{
            fontSize: 58,
            fontWeight: 700,
            fontStyle: 'italic',
            color: colors.white,
            lineHeight: 1.16,
            letterSpacing: -1,
            margin: 0,
            maxWidth: 900,
          }}
        >
          {titulo}
        </h2>

        {principios && principios.length > 0 ? (
          <div style={{display: 'flex', flexDirection: 'column', gap: 20, marginTop: 8}}>
            {principios.slice(0, 3).map((p, i) => (
              <div key={i} style={{display: 'flex', alignItems: 'flex-start', gap: 14}}>
                <div style={{marginTop: 3}}>
                  <IconCheck size={20} color={colors.accent} strokeWidth={3} />
                </div>
                <span style={{fontSize: 26, fontWeight: 400, color: 'rgba(255,255,255,0.85)', lineHeight: 1.32}}>
                  {p}
                </span>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div style={{position: 'absolute', right: -90, bottom: -70}}>
        <GhostBars color={colors.white} opacity={0.07} width={560} />
      </div>
      <div style={{position: 'absolute', left: -60, top: -50}}>
        <GhostCheck color={colors.white} opacity={0.04} size={280} />
      </div>

      <div style={{position: 'absolute', left: 72, right: 72, bottom: 130, textAlign: 'left'}}>
        <span style={{fontSize: 20, fontWeight: 400, fontStyle: 'italic', color: 'rgba(255,255,255,0.5)'}}>
          Assim a gente trabalha — link na bio
        </span>
      </div>
    </Frame>
  );
};

export const bastidoresDefaultProps: BastidoresData = {
  titulo: 'Não recomendamos nada antes de ver o dado.',
  principios: [
    'Todo diagnóstico começa medindo o que já existe, não achando.',
    'Nenhuma solução entra sem um número que comprove que ela resolveu.',
    'Se o processo não é repetível, não é método — é sorte.',
  ],
};
