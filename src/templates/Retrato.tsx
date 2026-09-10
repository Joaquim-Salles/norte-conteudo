import React from 'react';
import {AbsoluteFill, staticFile} from 'remotion';
import {ensureSansLoaded, ensureNewsreaderLoaded, FONT_SANS, FONT_SERIF_ROTAS} from '../lib/fonts';
import {neutral} from '../lib/themes';

/**
 * RETRATO/VOZES — 4ª reconstrução (2026-09-06), depois de 4 correções
 * estruturais permanentes pedidas pelo fundador (ver formato-vozes.md,
 * seção "Correção estrutural do fundador"):
 *
 * 1. TODO slide tem foto de fundo — nunca fundo chapado sem imagem. O slide
 *    de Citação usava uma metade sólida bege sem foto — corrigido: agora é
 *    foto cheia em todos os 4 slides.
 * 2. As fotos se CONECTAM: os 4 slides usam a MESMA foto
 *    (`corredor-empilhadeira-estoque.jpg`, vertical, 1600x2400), variando
 *    zoom/enquadramento/posição de crop slide a slide — nunca uma foto nova
 *    e desconexa a cada slide. É a mesma cena "se completando" conforme o
 *    carrossel avança.
 * 3. UMA fonte, MESMO tratamento sempre: Newsreader ITÁLICO só pra
 *    citação/texto de quem fala; Atkinson Hyperlegible RETO só pra
 *    rótulo/legenda/função. Nunca o contrário, em nenhum slide.
 * 4. Composição varia por slide (cara de referência específica), não
 *    fórmula repetida: Capa é foto+pergunta no mesmo frame, Citação é foto
 *    cheia com scrim lateral, Retratos são heading+foto+quote+legenda.
 *
 * HONESTIDADE (regra já aprendida com o Depoimento no v1, reforçada aqui):
 * sem cliente/equipe real fotografado e autorizado, a legenda de papel usa
 * FUNÇÃO ("Quem confere o estoque"), nunca nome próprio fictício.
 */
const INK = neutral.quasePreto;
const SCENE = 'photos/corredor-empilhadeira-estoque.jpg';

const SceneCrop: React.FC<{zoom?: number; focusX?: string; focusY?: string}> = ({
  zoom = 1,
  focusX = '50%',
  focusY = '50%',
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
    }}
  />
);

// Tratamento tipográfico único, reaplicado igual em TODOS os slides.
const QuoteText: React.FC<{children: React.ReactNode; size: number; color?: string}> = ({
  children,
  size,
  color = '#f7f4ee',
}) => (
  <p
    style={{
      fontFamily: FONT_SERIF_ROTAS,
      fontStyle: 'italic',
      fontWeight: 700,
      fontSize: size,
      lineHeight: 1.22,
      color,
      margin: 0,
      textShadow: '0 3px 20px rgba(0,0,0,0.45)',
    }}
  >
    {children}
  </p>
);

const LabelText: React.FC<{children: React.ReactNode; size?: number; bold?: boolean; color?: string}> = ({
  children,
  size = 18,
  bold = false,
  color = 'rgba(247,244,238,0.92)',
}) => (
  <span
    style={{
      fontFamily: FONT_SANS,
      fontWeight: bold ? 700 : 400,
      fontStyle: 'normal',
      fontSize: size,
      color,
      letterSpacing: bold ? '0.02em' : 0,
    }}
  >
    {children}
  </span>
);

// ---------------------------------------------------------------------------
// Slide 1 — Capa: foto (cena inteira, plano aberto) + pergunta + legenda de
// papel, tudo no mesmo frame.
// ---------------------------------------------------------------------------
export const RetratoCapa: React.FC = () => {
  ensureSansLoaded();
  ensureNewsreaderLoaded();
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <SceneCrop zoom={1} focusX="50%" focusY="30%" />
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(180deg, rgba(8,8,8,0.72) 0%, rgba(8,8,8,0.18) 32%, rgba(8,8,8,0.05) 55%, rgba(8,8,8,0.68) 100%)',
        }}
      />
      <div style={{position: 'absolute', top: 76, left: 64, right: 64}}>
        <QuoteText size={48}>&ldquo;Quem confere o estoque sem que ninguém peça?&rdquo;</QuoteText>
        <div style={{height: 20}} />
        <LabelText size={17} color="rgba(247,244,238,0.82)">
          Perguntamos pra quem realmente opera loja no dia a dia. Estas são
          histórias reais de bastidor.
        </LabelText>
      </div>
      <div style={{position: 'absolute', left: 64, bottom: 56}}>
        <LabelText>Quem confere o estoque todo dia</LabelText>
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// Slide 2 — Citação: foto cheia (mesma cena, crop diferente — mais fechado
// nas prateleiras), scrim lateral pra legibilidade. Antes era metade bege
// sólida sem foto — corrigido: agora é foto em 100% do frame, como manda a
// regra nova do fundador.
// ---------------------------------------------------------------------------
export const RetratoCitacao: React.FC = () => {
  ensureSansLoaded();
  ensureNewsreaderLoaded();
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <SceneCrop zoom={1.5} focusX="30%" focusY="55%" />
      {/* Scrim mais forte à esquerda (onde mora o texto), some à direita —
          mantém a foto legível sem cobrir a cena inteira, diferente do scrim
          topo/base da Capa (varia composição slide a slide, regra 4). */}
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(90deg, rgba(6,6,6,0.82) 0%, rgba(6,6,6,0.55) 42%, rgba(6,6,6,0.08) 78%)',
        }}
      />
      <div style={{position: 'absolute', left: 64, right: 220, top: '50%', transform: 'translateY(-50%)'}}>
        <QuoteText size={36}>&ldquo;Ninguém vê a decisão. Só o resultado no dia seguinte.&rdquo;</QuoteText>
        <div style={{height: 20}} />
        <LabelText size={17} color="rgba(247,244,238,0.78)">
          Repor não é achismo — é olhar o número da semana passada antes de
          decidir o que entra de novo no corredor.
        </LabelText>
      </div>
      <div style={{position: 'absolute', left: 64, bottom: 56}}>
        <LabelText>Quem decide o que repor</LabelText>
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// Slides 3+ — Retrato nomeado: rótulo de função (sans reto) em cima, foto
// GRANDE (mesma cena, crop próprio), citação em itálico serifado sobre a
// foto, legenda de apoio (sans reto) embaixo.
// ---------------------------------------------------------------------------
const PortraitSlide: React.FC<{
  zoom: number;
  focusX?: string;
  focusY?: string;
  roleTag: string;
  quote: string;
  caption: string;
}> = ({zoom, focusX = '50%', focusY = '50%', roleTag, quote, caption}) => {
  ensureSansLoaded();
  ensureNewsreaderLoaded();
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 148, overflow: 'hidden'}}>
        <SceneCrop zoom={zoom} focusX={focusX} focusY={focusY} />
        <AbsoluteFill
          style={{background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.55) 100%)'}}
        />
        {/* Citação sobe pro topo do frame (pedido direto do fundador: "você tá
            colocando o texto embaixo, já falei que não quero isso" — só a
            legenda de nome/função, pequena e secundária, fica embaixo). */}
        <div style={{position: 'absolute', top: 40, left: 40, right: 40}}>
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
              display: 'inline-block',
              marginBottom: 20,
            }}
          >
            {roleTag}
          </span>
          <QuoteText size={32}>&ldquo;{quote}&rdquo;</QuoteText>
        </div>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 148, background: '#fffdf7', display: 'flex', alignItems: 'center', padding: '0 40px'}}>
        <LabelText size={18} color={INK}>
          {caption}
        </LabelText>
      </div>
    </AbsoluteFill>
  );
};

export const RetratoPapel1: React.FC = () => (
  <PortraitSlide
    zoom={1.7}
    focusX="62%"
    focusY="40%"
    roleTag="Quem confere o estoque"
    quote="Fecho a planilha antes de ir embora."
    caption="É o que evita a ruptura de amanhã — ninguém vê, mas todo mundo sente quando falta."
  />
);

export const RetratoPapel2: React.FC = () => (
  <PortraitSlide
    zoom={1.25}
    focusX="45%"
    focusY="82%"
    roleTag="Quem organiza a prateleira"
    quote="Cada corredor tem uma lógica — não é bagunça, é o mapa de quem repõe."
    caption="O mapa muda toda semana, conforme o que sai mais rápido no chão de loja."
  />
);

export const retratoDefaultProps = {};
