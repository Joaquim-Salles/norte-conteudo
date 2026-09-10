import React from 'react';
import {AbsoluteFill, staticFile} from 'remotion';
import {ensureSansLoaded, ensureNewsreaderLoaded, FONT_SANS, FONT_SERIF_ROTAS} from '../lib/fonts';
import {Mascote} from '../lib/Mascote';
import {neutral} from '../lib/themes';

/**
 * VOZES — variante "Grade" (2026-09-06, Rodada 3 — 4 correções estruturais
 * permanentes pedidas pelo fundador, ver formato-vozes.md):
 *
 * 1. TODO slide tem foto de fundo. O Fechamento era bege chapado sem
 *    imagem — decidido (documentado abaixo) que SIM, cabe foto aqui também.
 * 2. As fotos se CONECTAM entre os slides: o tile "grande" do mosaico da
 *    Capa é a MESMA foto (`corredor-empilhadeira-estoque.jpg`) usada nos 2
 *    cartões de citação e no Fechamento — só muda o crop/zoom. Os 4 tiles
 *    pequenos do mosaico continuam variados de propósito (representam
 *    "várias vozes/time" — ver decisão abaixo), mas o fio condutor da cena
 *    principal atravessa a Capa, as 2 citações e o Fechamento.
 * 3. UMA fonte, MESMO tratamento: Newsreader itálico pra citação (inclusive
 *    o corpo do cartão-tweet, que na Rodada 2 estava em sans reto — corrigido
 *    aqui pra obedecer a regra nova, mesmo custando um pouco da referência
 *    "tweet" original), Atkinson Hyperlegible reto pra rótulo/função/etiqueta.
 * 4. Composição varia por slide — Capa é 2 painéis empilhados, cartões são
 *    foto+card sobreposto, Fechamento é foto extrema+scrim+assinatura.
 *
 * HONESTIDADE (mesma regra de sempre): SEM selo de verificado, SEM @handle
 * inventado, SEM nome próprio fictício. O avatar do cartão usa recorte
 * fechado (zoom alto) da própria foto de fundo — textura/ambiente, nunca
 * rosto identificável. A etiqueta é sempre FUNÇÃO ("Time de estoque"),
 * nunca nome de pessoa.
 */
const BG = neutral.begeClaro;
const INK = neutral.quasePreto;
const SCENE = 'photos/corredor-empilhadeira-estoque.jpg';

// Grade da Capa: 5 fotos em mosaico assimétrico. O tile "big" é a cena que
// atravessa o carrossel inteiro (corredor de estoque) — os 4 tiles menores
// seguem variados de propósito, representando o "time" ao redor dela.
const GRID_PHOTOS = [
  SCENE,
  'photos/analista-relatorios-mesa.jpg',
  'photos/equipe-reuniao-escritorio.jpg',
  'photos/salao-moderno-movimento.jpg',
  'photos/restaurante-ambiente-noturno.jpg',
];

const QuoteText: React.FC<{
  children: React.ReactNode;
  size: number;
  color?: string;
  align?: 'left' | 'center';
  maxWidth?: number;
}> = ({children, size, color = INK, align = 'left', maxWidth}) => (
  <p
    style={{
      fontFamily: FONT_SERIF_ROTAS,
      fontStyle: 'italic',
      fontWeight: 700,
      fontSize: size,
      lineHeight: 1.3,
      color,
      margin: 0,
      textAlign: align,
      maxWidth,
    }}
  >
    {children}
  </p>
);

const LabelText: React.FC<{children: React.ReactNode; size?: number; bold?: boolean; color?: string}> = ({
  children,
  size = 18,
  bold = false,
  color = INK,
}) => (
  <span
    style={{
      fontFamily: FONT_SANS,
      fontWeight: bold ? 700 : 400,
      fontStyle: 'normal',
      fontSize: size,
      color,
    }}
  >
    {children}
  </span>
);

// ---------------------------------------------------------------------------
// Capa — DOIS PAINÉIS EMPILHADOS: branco com grade de fotos em cima (~63%),
// preto sólido com título+seta+mascote embaixo (~37%).
// ---------------------------------------------------------------------------
const GRID_PANEL_HEIGHT = '63%';
const TEXT_PANEL_HEIGHT = '37%';

export const VozesGradeCapa: React.FC = () => {
  ensureSansLoaded();
  ensureNewsreaderLoaded();
  return (
    <AbsoluteFill style={{background: '#0a0a0a'}}>
      <div style={{position: 'absolute', top: 0, left: 0, right: 0, height: GRID_PANEL_HEIGHT, background: '#ffffff'}}>
        <div
          style={{
            position: 'absolute',
            inset: 20,
            display: 'grid',
            gridTemplateColumns: '1.3fr 1fr 1fr',
            gridTemplateRows: '1fr 1fr',
            gridTemplateAreas: '"big b c" "big d e"',
            gap: 10,
          }}
        >
          {(['big', 'b', 'c', 'd', 'e'] as const).map((area, i) => (
            <div key={area} style={{gridArea: area, position: 'relative', overflow: 'hidden', borderRadius: 18}}>
              <img
                src={staticFile(GRID_PHOTOS[i])}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  // O tile "big" (cena que atravessa o carrossel) mostra o
                  // plano aberto do corredor — as citações e o fechamento
                  // vão fechar o zoom nessa mesma cena depois.
                  transform: area === 'big' ? 'scale(1)' : undefined,
                  objectPosition: area === 'big' ? '50% 20%' : '50% 50%',
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: TEXT_PANEL_HEIGHT,
          background: '#0a0a0a',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 64px',
        }}
      >
        <QuoteText size={50} color="#f7f4ee">
          Quem faz o estoque
          <br />
          <span style={{fontWeight: 700}}>funcionar</span> todo dia
        </QuoteText>
        <div style={{height: 20}} />
        <span style={{fontFamily: FONT_SERIF_ROTAS, fontStyle: 'italic', fontSize: 28, color: '#f7f4ee'}}>&rarr;</span>

        <div
          style={{
            position: 'absolute',
            right: 40,
            bottom: 32,
            width: 76,
            height: 76,
            borderRadius: '50%',
            background: BG,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Mascote size={54} style={{position: 'relative'}} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// Cartão de citação — imita um post do X/Twitter incorporado na FORMA
// (avatar circular + etiqueta em negrito), mas o corpo do texto agora é
// Newsreader itálico (regra nova do fundador: citação SEMPRE serif itálico,
// sem exceção — mesmo que isso afaste um pouco da referência "tweet" que
// pedia sans reto na Rodada 2. Regra de fonte é inviolável, prevalece.).
// ---------------------------------------------------------------------------
const QuoteCardSlide: React.FC<{
  quote: string;
  role: string;
  zoom?: number;
  focusY?: string;
  focusX?: string;
  avatarZoom?: number;
  avatarPos?: string;
}> = ({quote, role, zoom = 1, focusY = '50%', focusX = '50%', avatarZoom = 1, avatarPos = '50% 50%'}) => {
  ensureSansLoaded();
  ensureNewsreaderLoaded();
  return (
    <AbsoluteFill style={{background: '#000'}}>
      {/* Mesma cena da Capa (`corredor-empilhadeira-estoque.jpg`), zoom
          fechado num ponto diferente — é o "a imagem vai se completando" que
          o fundador descreveu, não uma foto nova a cada slide. */}
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
        }}
      />
      {/* Scrim invertido: mais forte no TOPO agora, porque o cartão de citação
          subiu pra lá (pedido direto do fundador: "você tá colocando o texto
          embaixo, já falei que não quero isso" — corrigido aqui). */}
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.15) 100%)'}} />
      <div style={{position: 'absolute', left: 40, right: 40, top: 64}}>
        <div
          style={{
            background: '#ffffff',
            borderRadius: 16,
            padding: '24px 28px 26px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.35)',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14}}>
            <div style={{width: 44, height: 44, borderRadius: '50%', overflow: 'hidden', flexShrink: 0}}>
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${staticFile(SCENE)})`,
                  backgroundSize: `${avatarZoom * 100}%`,
                  backgroundPosition: avatarPos,
                  backgroundRepeat: 'no-repeat',
                }}
              />
            </div>
            <LabelText size={16} bold>
              {role}
            </LabelText>
          </div>
          <QuoteText size={22}>{quote}</QuoteText>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const VozesGradeCitacao1: React.FC = () => (
  <QuoteCardSlide
    quote="Antes eu contava tudo de cabeça. Hoje eu só confiro o que o sistema já separou."
    role="Time de estoque"
    zoom={1.5}
    focusX="70%"
    focusY="35%"
    avatarZoom={7}
    avatarPos="70% 15%"
  />
);

export const VozesGradeCitacao2: React.FC = () => (
  <QuoteCardSlide
    quote="A gente decide o que repor olhando pro número da semana, não pro que parece que saiu mais."
    role="Time de reposição"
    zoom={1.9}
    focusX="35%"
    focusY="75%"
    avatarZoom={9}
    avatarPos="35% 85%"
  />
);

// ---------------------------------------------------------------------------
// Fechamento — DECISÃO: sim, cabe foto aqui também (regra nova do fundador
// não abre exceção pra flat background). Usa a MESMA cena, num crop bem mais
// fechado que os anteriores (quase textura), com scrim forte pra manter o
// mascote/citação legíveis — é o ponto onde a imagem "termina de se
// completar": Capa mostra o corredor inteiro, as 2 citações fecham o zoom em
// pontos diferentes dele, o Fechamento chega no crop mais extremo de todos.
// ---------------------------------------------------------------------------
export const VozesGradeFechamento: React.FC = () => {
  ensureSansLoaded();
  ensureNewsreaderLoaded();
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <img
        src={staticFile(SCENE)}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: 'scale(2.4)',
          transformOrigin: '50% 55%',
          filter: 'saturate(0.75)',
        }}
      />
      <AbsoluteFill style={{background: 'rgba(6,6,6,0.72)'}} />
      <AbsoluteFill style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 90px'}}>
        <span
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -58%)',
            fontFamily: FONT_SERIF_ROTAS,
            fontStyle: 'italic',
            fontWeight: 700,
            fontSize: 640,
            lineHeight: 1,
            color: '#f7f4ee',
            opacity: 0.06,
            userSelect: 'none',
          }}
        >
          &rdquo;
        </span>
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
        <QuoteText size={34} color="#f7f4ee" align="center" maxWidth={680}>
          Quem faz o estoque funcionar não aparece na vitrine. Aparece aqui.
        </QuoteText>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const vozesGradeDefaultProps = {};
