import React from 'react';
import {AbsoluteFill, staticFile} from 'remotion';
import {ensureSansLoaded, ensureNewsreaderLoaded, FONT_SANS, FONT_SERIF_ROTAS} from '../lib/fonts';
import {Mascote} from '../lib/Mascote';
import {neutral} from '../lib/themes';

/**
 * VOZES — variação nova "Loja" (2026-09-06): "um dia inteiro" contado em
 * sequência, usando 1 SÓ FOTO de ambiente (`salao-moderno-movimento.jpg`)
 * com crop/zoom diferente por etapa do dia. Mesma técnica de continuidade
 * de Retrato.tsx/VozesGrade.tsx, aplicada a um conteúdo diferente (rotina
 * do dia, não papéis/funções) — pra provar que a técnica generaliza e não é
 * amarrada a 1 peça só.
 *
 * As 4 regras permanentes do formato (ver formato-vozes.md) valem aqui
 * igual: foto de fundo em todo slide, mesma cena conectando o carrossel,
 * Newsreader itálico só pra citação, Atkinson reto só pra rótulo/horário.
 */
const SCENE = 'photos/salao-moderno-movimento.jpg';
const BG = neutral.begeClaro;

const SceneCrop: React.FC<{zoom?: number; focusX?: string; focusY?: string; filter?: string}> = ({
  zoom = 1,
  focusX = '50%',
  focusY = '50%',
  filter,
}) => (
  <img
    src={staticFile(SCENE)}
    style={{
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transform: `scale(${zoom})`,
      transformOrigin: `${focusX} ${focusY}`,
      filter,
    }}
  />
);

const QuoteText: React.FC<{children: React.ReactNode; size: number; color?: string; align?: 'left' | 'center'; maxWidth?: number}> = ({
  children,
  size,
  color = '#f7f4ee',
  align = 'left',
  maxWidth,
}) => (
  <p
    style={{
      fontFamily: FONT_SERIF_ROTAS,
      fontStyle: 'italic',
      fontWeight: 700,
      fontSize: size,
      lineHeight: 1.26,
      color,
      margin: 0,
      textAlign: align,
      maxWidth,
      textShadow: '0 3px 20px rgba(0,0,0,0.45)',
    }}
  >
    {children}
  </p>
);

const TimeTag: React.FC<{children: React.ReactNode}> = ({children}) => (
  <span
    style={{
      fontFamily: FONT_SANS,
      fontWeight: 700,
      fontSize: 15,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: '#f7f4ee',
      background: 'rgba(10,10,10,0.55)',
      padding: '8px 14px',
      borderRadius: 999,
    }}
  >
    {children}
  </span>
);

const LabelText: React.FC<{children: React.ReactNode; size?: number; color?: string}> = ({
  children,
  size = 17,
  color = 'rgba(247,244,238,0.82)',
}) => (
  <span style={{fontFamily: FONT_SANS, fontWeight: 400, fontStyle: 'normal', fontSize: size, color}}>{children}</span>
);

const DayFrame: React.FC<{
  zoom: number;
  focusX?: string;
  focusY?: string;
  time: string;
  quote: string;
  support?: string;
  scrim?: string;
}> = ({zoom, focusX = '50%', focusY = '50%', time, quote, support, scrim}) => {
  ensureSansLoaded();
  ensureNewsreaderLoaded();
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <SceneCrop zoom={zoom} focusX={focusX} focusY={focusY} />
      <AbsoluteFill
        style={{
          background:
            scrim ?? 'linear-gradient(180deg, rgba(8,8,8,0.6) 0%, rgba(8,8,8,0.1) 35%, rgba(8,8,8,0.66) 100%)',
        }}
      />
      {/* Citação subiu pro topo do frame (pedido direto do fundador: "você tá
          colocando o texto embaixo, já falei que não quero isso"). */}
      <div style={{position: 'absolute', top: 56, left: 56, right: 96}}>
        <TimeTag>{time}</TimeTag>
        <div style={{height: 20}} />
        <QuoteText size={34}>&ldquo;{quote}&rdquo;</QuoteText>
        {support ? (
          <>
            <div style={{height: 16}} />
            <LabelText>{support}</LabelText>
          </>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};

export const LojaCapa: React.FC = () => (
  <DayFrame
    zoom={1}
    focusX="50%"
    focusY="35%"
    time="06h — abertura"
    quote="Um dia inteiro cabe numa foto? A gente tentou."
    support="Seguimos a mesma loja do abrir ao fechar — cinco momentos, uma cena só."
  />
);

export const LojaReposicao: React.FC = () => (
  <DayFrame
    zoom={1.6}
    focusX="72%"
    focusY="30%"
    time="09h — reposição"
    quote="Antes de abrir a porta, a prateleira já tem que estar certa."
    support="O que faltou ontem é a primeira coisa que entra hoje de manhã."
  />
);

export const LojaPico: React.FC = () => (
  <DayFrame
    zoom={1.15}
    focusX="45%"
    focusY="60%"
    time="13h — pico de movimento"
    quote="No horário cheio, ninguém para pra contar. O sistema conta por eles."
    support="É quando mais vende — e quando menos dá pra parar pra checar planilha."
    scrim="linear-gradient(180deg, rgba(8,8,8,0.35) 0%, rgba(8,8,8,0.02) 40%, rgba(8,8,8,0.7) 100%)"
  />
);

export const LojaConferencia: React.FC = () => (
  <DayFrame
    zoom={1.9}
    focusX="30%"
    focusY="80%"
    time="18h — conferência"
    quote="O dia só termina de verdade quando o número bate."
    support="Conferir não é desconfiar de ninguém — é garantir que amanhã começa certo."
  />
);

export const LojaFechamento: React.FC = () => {
  ensureSansLoaded();
  ensureNewsreaderLoaded();
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <SceneCrop zoom={2.4} focusX="55%" focusY="50%" filter="saturate(0.7)" />
      <AbsoluteFill style={{background: 'rgba(6,6,6,0.74)'}} />
      <AbsoluteFill style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 90px'}}>
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: '50%',
            background: BG,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
          }}
        >
          <Mascote size={68} style={{position: 'relative'}} />
        </div>
        <div style={{height: 32}} />
        <QuoteText size={34} align="center" maxWidth={680}>
          O dia muda. A rotina que sustenta ele, não.
        </QuoteText>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const lojaDefaultProps = {};
