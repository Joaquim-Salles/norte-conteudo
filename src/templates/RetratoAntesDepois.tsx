import React from 'react';
import {AbsoluteFill, staticFile} from 'remotion';
import {ensureSansLoaded, ensureNewsreaderLoaded, FONT_SANS, FONT_SERIF_ROTAS} from '../lib/fonts';
import {Mascote} from '../lib/Mascote';
import {neutral} from '../lib/themes';

/**
 * VOZES — variação nova "Antes/Depois" (2026-09-06): MESMA foto
 * (`equipe-reuniao-escritorio.jpg`) em TODOS os slides, sem trocar de
 * cena nem de crop — a mudança inteira é de TRATAMENTO DE COR (antes:
 * dessaturado/frio; depois: quente/vívido), pra sugerir a transformação sem
 * inventar uma "foto do problema" e uma "foto da solução" fabricadas (isso
 * seria enganoso — a regra de honestidade do formato vale aqui igual: é a
 * MESMA rotina, o que muda é como ela é sustentada, não o cenário físico).
 *
 * Ainda aplica as 4 regras permanentes: foto de fundo em todo slide, mesma
 * cena conectando o carrossel (aqui no grau máximo — é o MESMO crop o tempo
 * todo, só a cor muda), Newsreader itálico só pra citação, Atkinson reto só
 * pra rótulo.
 */
const SCENE = 'photos/equipe-reuniao-escritorio.jpg';
const INK = neutral.quasePreto;
const BG = neutral.begeClaro;

// Mesmo crop em todos os slides — só o filtro de cor muda.
const ZOOM = 1.12;
const FOCUS_X = '48%';
const FOCUS_Y = '42%';

const COLD_FILTER = 'saturate(0.35) sepia(0.08) hue-rotate(170deg) brightness(0.92) contrast(1.02)';
const WARM_FILTER = 'saturate(1.35) sepia(0.14) brightness(1.06) contrast(1.05)';
const NEUTRAL_FILTER = 'saturate(1) brightness(1)';

const SceneCrop: React.FC<{filter: string}> = ({filter}) => (
  <img
    src={staticFile(SCENE)}
    style={{
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transform: `scale(${ZOOM})`,
      transformOrigin: `${FOCUS_X} ${FOCUS_Y}`,
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

const LabelTag: React.FC<{children: React.ReactNode; tone: 'cold' | 'warm'}> = ({children, tone}) => (
  <span
    style={{
      fontFamily: FONT_SANS,
      fontWeight: 700,
      fontSize: 15,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: tone === 'cold' ? '#dfe6f2' : '#fff3dc',
      background: tone === 'cold' ? 'rgba(20,30,50,0.65)' : 'rgba(60,36,10,0.55)',
      padding: '8px 16px',
      borderRadius: 999,
    }}
  >
    {children}
  </span>
);

const SupportText: React.FC<{children: React.ReactNode}> = ({children}) => (
  <span style={{fontFamily: FONT_SANS, fontWeight: 400, fontStyle: 'normal', fontSize: 17, color: 'rgba(247,244,238,0.82)'}}>
    {children}
  </span>
);

// ---------------------------------------------------------------------------
// Slide 1 — Antes: mesma cena, tratamento frio/dessaturado.
// ---------------------------------------------------------------------------
export const AntesDepoisAntes: React.FC = () => {
  ensureSansLoaded();
  ensureNewsreaderLoaded();
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <SceneCrop filter={COLD_FILTER} />
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(6,10,20,0.7) 0%, rgba(6,10,20,0.15) 34%, rgba(6,10,20,0.62) 100%)'}} />
      <div style={{position: 'absolute', top: 56, left: 56, right: 96}}>
        <LabelTag tone="cold">Antes</LabelTag>
        <div style={{height: 20}} />
        <QuoteText size={38}>&ldquo;Antes, decidir era torcer.&rdquo;</QuoteText>
        <div style={{height: 16}} />
        <SupportText>Repor, comprar, cortar preço — tudo no olhômetro, sem saber se ontem foi bom ou só pareceu.</SupportText>
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// Slide 2 — Ponte: split-screen mostrando os DOIS tratamentos lado a lado,
// mesmo crop e mesma foto — a transição acontecendo dentro do próprio slide.
// ---------------------------------------------------------------------------
export const AntesDepoisPonte: React.FC = () => {
  ensureSansLoaded();
  ensureNewsreaderLoaded();
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <div style={{position: 'absolute', inset: 0, left: 0, width: '50%', overflow: 'hidden'}}>
        <SceneCrop filter={COLD_FILTER} />
        <AbsoluteFill style={{background: 'rgba(6,10,20,0.35)'}} />
      </div>
      <div style={{position: 'absolute', inset: 0, right: 0, left: '50%', overflow: 'hidden'}}>
        <div style={{position: 'absolute', inset: 0, left: '-100%', width: '200%'}}>
          <SceneCrop filter={WARM_FILTER} />
        </div>
        <AbsoluteFill style={{background: 'rgba(60,36,10,0.15)'}} />
      </div>
      {/* Linha divisória fina — marca a passagem sem esconder a foto */}
      <div style={{position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2, background: 'rgba(247,244,238,0.55)'}} />
      <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: '#f7f4ee',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
            fontFamily: FONT_SERIF_ROTAS,
            fontStyle: 'italic',
            fontWeight: 700,
            fontSize: 28,
            color: INK,
          }}
        >
          &rarr;
        </div>
      </div>
      <div style={{position: 'absolute', left: 40, bottom: 48}}>
        <LabelTag tone="cold">Antes</LabelTag>
      </div>
      <div style={{position: 'absolute', right: 40, bottom: 48}}>
        <LabelTag tone="warm">Depois</LabelTag>
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// Slide 3 — Depois: mesma cena, tratamento quente/vívido.
// ---------------------------------------------------------------------------
export const AntesDepoisDepois: React.FC = () => {
  ensureSansLoaded();
  ensureNewsreaderLoaded();
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <SceneCrop filter={WARM_FILTER} />
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(40,22,6,0.6) 0%, rgba(40,22,6,0.08) 34%, rgba(40,22,6,0.55) 100%)'}} />
      <div style={{position: 'absolute', top: 56, left: 56, right: 96}}>
        <LabelTag tone="warm">Depois</LabelTag>
        <div style={{height: 20}} />
        <QuoteText size={38}>&ldquo;Hoje, decidir é olhar o número.&rdquo;</QuoteText>
        <div style={{height: 16}} />
        <SupportText>Mesma equipe, mesma sala — só que agora ninguém decide no escuro.</SupportText>
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// Fechamento — cor neutra (nem fria nem quente), reflexivo, sem CTA de venda
// (formato Vozes não força contato — ver formato-vozes.md).
// ---------------------------------------------------------------------------
export const AntesDepoisFechamento: React.FC = () => {
  ensureSansLoaded();
  ensureNewsreaderLoaded();
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <SceneCrop filter={NEUTRAL_FILTER} />
      <AbsoluteFill style={{background: 'rgba(10,10,10,0.72)'}} />
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
          A sala não mudou. A forma de decidir dentro dela, sim.
        </QuoteText>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const antesDepoisDefaultProps = {};
