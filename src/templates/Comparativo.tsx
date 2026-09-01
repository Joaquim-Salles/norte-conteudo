import React from 'react';
import {Frame} from '../lib/Frame';
import {CtaBand} from '../lib/CtaBand';
import {Badge} from '../lib/Badge';
import {SurfaceCard} from '../lib/SurfaceCard';
import {colors} from '../lib/tokens';
import {getTheme, getThemeForProduct} from '../lib/themes';
import {GhostArrowUp} from '../lib/GhostGraphics';
import {IconCheck, IconX} from '../lib/icons';
import type {ComparativoData} from '../lib/types';

/**
 * Template novo (2026-09-01) — Comparativo Direto, em 2 variacoes.
 *
 * Diferenca conceitual de "Dado vs. Achismo" (o mais parecido dos 5
 * originais): la se opoe uma CRENCA a um DADO — 1 par unico, o gancho e o
 * numero. Aqui se comparam duas OPCOES concretas (jeito antigo x com a
 * Norte, planilha x sistema) em VARIOS atributos — o gancho e a decisao,
 * nao um numero isolado. Pesquisa de mercado 2026 (ver CATALOGO.md §6):
 * comparativos diretos captam "intencao de fase de pesquisa" — quem esta
 * decidindo entre alternativas, nao so consumindo conteudo educativo.
 */
export const Comparativo: React.FC<ComparativoData> = ({
  tituloA,
  tituloB,
  itens,
  variant = 'colunas',
  produto,
  theme,
}) => {
  const t = produto ? getThemeForProduct(produto) : getTheme(theme ?? 'marca');

  if (variant === 'tabela') {
    return (
      <Frame background={colors.white} wordmarkColor={colors.black}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            padding: '110px 64px 220px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Badge>Comparativo</Badge>

          <div style={{display: 'flex', marginTop: 40, gap: 16, padding: '0 24px'}}>
            <div style={{flex: 1.15}} />
            <div style={{flex: 1, textAlign: 'center'}}>
              <span
                style={{
                  fontSize: 21,
                  fontWeight: 700,
                  letterSpacing: 1.5,
                  color: '#8a8a9c',
                  textTransform: 'uppercase',
                }}
              >
                {tituloA}
              </span>
            </div>
            <div style={{flex: 1, textAlign: 'center'}}>
              <span
                style={{
                  fontSize: 21,
                  fontWeight: 700,
                  letterSpacing: 1.5,
                  color: t.colors.base,
                  textTransform: 'uppercase',
                }}
              >
                {tituloB}
              </span>
            </div>
          </div>

          <div style={{marginTop: 18, display: 'flex', flexDirection: 'column', gap: 14}}>
            {itens.slice(0, 5).map((item, i) => (
              <SurfaceCard key={i} variant={t.cardStyle}>
                <div style={{display: 'flex', alignItems: 'center', padding: '24px 22px', gap: 10}}>
                  <div style={{flex: 1.15}}>
                    <span style={{fontSize: 27, fontWeight: 700, color: colors.black, lineHeight: 1.2}}>
                      {item.label}
                    </span>
                  </div>
                  <div
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 8,
                      textAlign: 'center',
                    }}
                  >
                    <IconX size={22} color="#a3a3b0" strokeWidth={2.8} />
                    <span style={{fontSize: 19, fontWeight: 400, color: '#7c7c8c', lineHeight: 1.25}}>
                      {item.a}
                    </span>
                  </div>
                  <div
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 8,
                      textAlign: 'center',
                    }}
                  >
                    <IconCheck size={22} color={t.colors.base} strokeWidth={3} />
                    <span style={{fontSize: 19, fontWeight: 700, color: colors.black, lineHeight: 1.25}}>
                      {item.b}
                    </span>
                  </div>
                </div>
              </SurfaceCard>
            ))}
          </div>
        </div>

        <div style={{position: 'absolute', left: 64, right: 64, bottom: 130}}>
          <CtaBand label="Quero ver isso no meu negócio" sub="fala com a gente no WhatsApp — link na bio" />
        </div>
      </Frame>
    );
  }

  // variant === 'colunas' (default)
  // wordmarkColor='black': as colunas param em bottom:260 (ver AntesDepois
  // ladoALado, mesmo padrao), a area onde o wordmark fica e o branco padrao
  // do Frame, nao a cor do tema — texto branco ali ficaria invisivel (bug
  // real encontrado no QA visual de 2026-09-01, corrigido antes de aprovar).
  return (
    <Frame background={colors.white} wordmarkColor={colors.black}>
      <div style={{position: 'absolute', top: 0, left: 0, right: 0, padding: '90px 64px 0', zIndex: 2}}>
        <Badge>Comparativo</Badge>
      </div>

      {/* Coluna A — apagada, "jeito antigo" */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 260,
          left: 0,
          width: '50%',
          background: '#dcdce6',
          padding: '190px 32px 0 64px',
        }}
      >
        <span
          style={{
            fontSize: 25,
            fontWeight: 700,
            letterSpacing: 1,
            color: '#6c6c80',
            textTransform: 'uppercase',
          }}
        >
          {tituloA}
        </span>
        <div style={{marginTop: 28, display: 'flex', flexDirection: 'column', gap: 24}}>
          {itens.slice(0, 4).map((item, i) => (
            <div key={i} style={{display: 'flex', alignItems: 'flex-start', gap: 12}}>
              <div style={{marginTop: 2}}>
                <IconX size={20} color="#8a8a9c" strokeWidth={2.8} />
              </div>
              <span style={{fontSize: 22, fontWeight: 400, color: '#54546a', lineHeight: 1.32}}>
                {item.a}
              </span>
            </div>
          ))}
        </div>
        <div style={{position: 'absolute', left: 6, bottom: 20}}>
          <GhostArrowUp color="#54546a" opacity={0.07} size={140} />
        </div>
      </div>

      {/* Coluna B — cor do tema, "com a Norte" */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 260,
          left: '50%',
          right: 0,
          background: `linear-gradient(160deg, ${t.colors.light} 0%, ${t.colors.dark} 100%)`,
          padding: '190px 64px 0 32px',
        }}
      >
        <span
          style={{
            fontSize: 25,
            fontWeight: 700,
            letterSpacing: 1,
            color: colors.white,
            textTransform: 'uppercase',
          }}
        >
          {tituloB}
        </span>
        <div style={{marginTop: 28, display: 'flex', flexDirection: 'column', gap: 24}}>
          {itens.slice(0, 4).map((item, i) => (
            <div key={i} style={{display: 'flex', alignItems: 'flex-start', gap: 12}}>
              <div style={{marginTop: 2}}>
                <IconCheck size={20} color={colors.white} strokeWidth={3} />
              </div>
              <span style={{fontSize: 22, fontWeight: 700, color: colors.white, lineHeight: 1.32}}>
                {item.b}
              </span>
            </div>
          ))}
        </div>
        <div style={{position: 'absolute', right: 2, bottom: 6}}>
          <GhostArrowUp color={colors.white} opacity={0.09} size={150} />
        </div>
      </div>

      {/* Selo VS na costura central */}
      <div
        style={{
          position: 'absolute',
          top: 160,
          left: '50%',
          transform: 'translateX(-50%)',
          background: colors.accent,
          color: colors.white,
          fontWeight: 700,
          fontSize: 22,
          padding: '12px 24px',
          borderRadius: 999,
          boxShadow: '0 14px 30px -8px rgba(0,0,0,0.45)',
        }}
      >
        VS
      </div>

      <div style={{position: 'absolute', left: 64, right: 64, bottom: 130}}>
        <CtaBand label="Quero ver isso no meu negócio" sub="fala com a gente no WhatsApp — link na bio" />
      </div>
    </Frame>
  );
};

export const comparativoDefaultProps: ComparativoData = {
  tituloA: 'Do jeito antigo',
  tituloB: 'Com a Norte',
  itens: [
    {label: 'Controle de estoque', a: 'Planilha manual, atualizada de vez em quando', b: 'Sincronizado em tempo real com o Omie'},
    {label: 'Inventário', a: 'Conta de cabeça, sem lote nem validade', b: 'Leitura por QR code, etiqueta inteligente'},
    {label: 'Decisão de reposição', a: 'No achismo, só quando já faltou', b: 'Baseada em dado real de giro'},
  ],
  produto: 'ntbEstoque',
};
