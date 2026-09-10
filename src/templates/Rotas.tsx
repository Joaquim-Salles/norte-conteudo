import React from 'react';
import {AbsoluteFill} from 'remotion';
import {ensureSansLoaded, ensureNewsreaderLoaded, FONT_SANS, FONT_SERIF_ROTAS} from '../lib/fonts';
import {GridTexture} from '../lib/GridTexture';
import {GeometricDiagram} from '../lib/GeometricDiagram';
import {HangerIcon} from '../lib/EditorialIcons';
import {MiniBarCompare} from '../lib/MiniChart';
import {TrackRail, RailTrack, ElbowSpec, CONVERGE_X, CONVERGE_Y} from '../lib/TrackRail';
import {Mascote} from '../lib/Mascote';
import {neutral, brand, productColors} from '../lib/themes';

/**
 * ROTAS — novo formato-flagship do carrossel Norte (2026-09-05).
 *
 * Substitui a direção anterior ("foto de estoque em tela cheia", ver
 * EtapasDeEstoque.tsx — arquivado/pausado) por uma réplica FIEL da estrutura
 * do carrossel real "The Claude Campus Ambassador program is back" (@claudeai):
 * capa com cards tipo post-it (cada um com um diagrama de nós + cor própria)
 * → 1 slide flat-color por trilha, com a MESMA linha colorida atravessando
 * todos os slides → fechamento com CTA + ícone desenhado à mão.
 *
 * DECISÃO DE CONTEÚDO: "3 perfis de negócio que usam o NTB Estoque de formas
 * diferentes" — restaurante (controla validade), loja de roupa (controla
 * grade/tamanho), distribuidora (controla lote/rastreabilidade). Escolhido
 * porque é o exemplo que genuinamente PEDE trilhas paralelas (3 públicos
 * reais, cada um com uma necessidade distinta do MESMO produto, convergindo
 * pra "1 sistema") — não é conteúdo sequencial forçado num formato de
 * ramificação (esse é o erro que o briefing pediu pra evitar). Também serve
 * ao objetivo de negócio: mostra a versatilidade real do produto pra 3
 * públicos-alvo diferentes de prospecção, cada um podendo se reconhecer no
 * slide "seu".
 *
 * NÚMERO DE TRILHAS: 3, mas por decisão de conteúdo (esses são os 3 perfis
 * reais de cliente do NTB Estoque que fazem sentido separar), não por regra
 * fixa — o briefing foi explícito que o número não deveria ser travado em 3
 * por padrão; aqui 3 é a resposta certa PORQUE existem 3 perfis genuinamente
 * distintos, não porque "carrossel de rotas = 3".
 *
 * RECHEIO DE CARD VARIA POR TIPO DE CONTEÚDO (pedido do fundador via
 * coordenador, incorporado nesta mesma rodada — REGRA PERMANENTE do formato
 * Rotas, não só desta peça):
 * - Restaurante = CONCEITO/PROCESSO (chegada → validade → alerta) → diagrama
 *   geométrico de nós (`GeometricDiagram`, já existente, reutilizado).
 * - Loja de roupa = OBJETO CONCRETO (grade/tamanho é sobre uma peça física,
 *   não um processo nem um dado) → ilustração ORIGINAL de cabide
 *   (`HangerIcon`, estilo novo definido em `EditorialIcons.tsx`).
 * - Distribuidora = MÉTRICA/COMPARAÇÃO (rastrear a origem de um lote é uma
 *   questão de tempo/esforço) → gráfico pequeno qualitativo (`MiniBarCompare`)
 *   em vez de forçar outro diagrama — sem inventar número específico como
 *   dado real (ver comentário em MiniChart.tsx).
 * Nenhum dos 3 cards repete o tipo de recheio do outro — é a mesma lição da
 * rodada "sem graça" do EtapasDeEstoque (repetir fórmula = tédio), aplicada
 * agora ao NÍVEL DO CARD, não só ao nível do slide.
 *
 * LINHA-TRILHO (TrackRail) é a assinatura visual do formato inteiro — ver
 * comentário de topo em `TrackRail.tsx`. Está presente em TODOS os 5 slides,
 * inclusive quando não é a trilha "dona" daquele slide (fica fina/apagada,
 * mas nunca some) — é isso que dá a sensação de "mapa contínuo" da referência
 * real, não uma linha decorativa isolada por slide.
 *
 * DECISÃO DE FONTE: Newsreader (`FONT_SERIF_ROTAS`), não Fraunces
 * (`FONT_SERIF`, usada no carrossel antigo). Comparação lado a lado (ver
 * CATALOGO.md) mostrou que Fraunces tem terminais em bola e curvas
 * decorativas/quirky que destoam da serifada clássica de jornal usada na
 * referência real "Campus Ambassador" — Newsreader tem contraste mais
 * comedido e formas mais sóbrias, mais perto do original. Decisão isolada ao
 * template Rotas (não reabre a decisão já fechada do EtapasDeEstoque).
 */

// ---------------------------------------------------------------------------
// Paleta das 3 trilhas
// ---------------------------------------------------------------------------
const TRACK_RESTAURANTE = productColors.estoque; // #2eb5c3 — teal, já associado a NTB Estoque
const TRACK_LOJA = brand.accent; // #f43f5e — rosa/coral, energia de varejo de moda
const TRACK_DISTRIBUIDORA = productColors.avalia; // #484db5 — índigo, tom mais sério/logístico

// `y` é a altura FIXA de entrada (borda esquerda) e saída (borda direita)
// dessa trilha em TODO slide onde ela não converge — ver TrackRail.tsx
// (erro de eixo corrigido na Rodada 8: o sistema agora é horizontal, não
// vertical). RESTAURANTE fica no terço superior, LOJA no centro exato do
// frame (por isso atravessa reta, sem cotovelo, em TODOS os slides — ela
// já está na altura que a trilha ativa visita), DISTRIBUIDORA no terço
// inferior.
const HEIGHT_ROTAS = 1350;

const RAIL_TRACKS: RailTrack[] = [
  {color: TRACK_RESTAURANTE, y: 270},
  {color: TRACK_LOJA, y: 675},
  {color: TRACK_DISTRIBUIDORA, y: 1080},
];

// ---------------------------------------------------------------------------
// Helpers de texto/torn-paper
// ---------------------------------------------------------------------------
const Overline: React.FC<{children: React.ReactNode; color: string}> = ({children, color}) => (
  <div
    style={{
      fontFamily: FONT_SANS,
      fontWeight: 700,
      fontSize: 14,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color,
    }}
  >
    {children}
  </div>
);

/**
 * Gera um polígono clip-path com bordas "rasgadas" — jitter determinístico
 * via seno (nunca Math.random, pra manter o render 100% reproduzível, ver
 * constraint de fontes/determinismo aplicada aqui por analogia).
 */
function tornClipPath(seed: number, amplitude = 3.2): string {
  const steps = 16;
  const top: string[] = [];
  const bottom: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * 100;
    const jTop = 2 + amplitude * (0.5 + 0.5 * Math.sin(i * 1.7 + seed));
    const jBottom = 2 + amplitude * (0.5 + 0.5 * Math.sin(i * 2.3 + seed + 1.4));
    top.push(`${x.toFixed(1)}% ${jTop.toFixed(1)}%`);
    bottom.push(`${x.toFixed(1)}% ${(100 - jBottom).toFixed(1)}%`);
  }
  return `polygon(${top.join(', ')}, ${bottom.reverse().join(', ')})`;
}

const TORN_A = tornClipPath(0.3);
const TORN_B = tornClipPath(2.1, 2.6);

/** Recortes dedicados ao post-it (Rodada 11) — ver comentário gêmeo em RotasKit.tsx. */
const POSTIT_CLIPS = [tornClipPath(0.9, 4.6), tornClipPath(3.4, 5.4), tornClipPath(1.6, 4.0)];

/**
 * Cotovelo local (Rodada 11) — ver diagnóstico completo em TrackRail.tsx.
 * Esta peça NÃO importa `computeElbow` de RotasKit.tsx (decisão deliberada
 * da Rodada 10: `Rotas.tsx` fica com cópia própria de tudo), então a mesma
 * geometria é replicada aqui com os números literais do próprio layout
 * (padding 64, coluna de ícone 220 + gap 44 — ver `TrackSlide` abaixo).
 */
const ELBOW_LIFT_ESTOQUE = 150;
function computeElbowLocal(trackY: number): ElbowSpec {
  return {
    x1: 64 + 220 + 44,
    x2: 1080 - 64,
    lift: ELBOW_LIFT_ESTOQUE,
    direction: trackY <= HEIGHT_ROTAS / 2 ? 1 : -1,
  };
}

/**
 * Bloco "papel rasgado" — o tratamento de destaque usado nos 3 slides de
 * trilha, pra título e parágrafo (ver descrição da referência no briefing:
 * "retângulo com textura de rasgo sutil nas bordas, não perfeito").
 */
const TornBlock: React.FC<{children: React.ReactNode; clip: string; rotate?: number; border?: string}> = ({
  children,
  clip,
  rotate = 0,
  border,
}) => (
  <div
    style={{
      background: '#fffdf7',
      clipPath: clip,
      padding: '30px 36px',
      // Friso lateral na cor da trilha — agora que o fundo do slide é sempre
      // bege, é aqui (e no rótulo/linha) que a identidade de cada trilha
      // aparece, não mais no fundo inteiro.
      borderLeft: border ? `6px solid ${border}` : undefined,
      transform: `rotate(${rotate}deg)`,
      boxShadow: '0 10px 26px rgba(10,10,10,0.16)',
    }}
  >
    {children}
  </div>
);

// ---------------------------------------------------------------------------
// Post-it card (Capa)
// ---------------------------------------------------------------------------
const PostitCard: React.FC<{
  label: string;
  caption: string;
  color: string;
  rotate: number;
  children: React.ReactNode;
  x: number;
  y: number;
  clipSeedIndex?: number;
}> = ({label, caption, color, rotate, children, x, y, clipSeedIndex = 0}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: 292,
      // Kraft, não branco puro — mesma correção da Rodada 11 em RotasKit.tsx.
      background: '#fdf6e8',
      clipPath: POSTIT_CLIPS[clipSeedIndex % POSTIT_CLIPS.length],
      padding: '26px 26px 30px',
      boxShadow: '0 20px 36px rgba(10,10,10,0.20)',
      transform: `rotate(${rotate}deg)`,
    }}
  >
    <div
      style={{
        fontFamily: FONT_SANS,
        fontWeight: 700,
        fontSize: 13,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color,
        marginBottom: 16,
      }}
    >
      {label}
    </div>
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 128}}>{children}</div>
    <div
      style={{
        fontFamily: FONT_SANS,
        fontWeight: 400,
        fontSize: 15,
        lineHeight: 1.35,
        color: neutral.cinzaEscuro,
        marginTop: 14,
      }}
    >
      {caption}
    </div>
  </div>
);

/**
 * Anotação desenhada à mão — curva fina + texto itálico, aponta pros cards.
 * Fica ACIMA da fileira de cards (não atrás/entre eles) e é renderizada
 * DEPOIS dos `PostitCard` no DOM, senão a ordem de empilhamento a esconde
 * atrás do primeiro card (bug real do primeiro render desta rodada — só a
 * pontinha da seta aparecia).
 */
// BUG REAL corrigido na Rodada 15 (ver comentário gêmeo em RotasKit.tsx,
// `HandDrawnAnnotation`): `width: 190` sem `whiteSpace: 'nowrap'` deixava o
// texto quebrar em 2 linhas, e a seta SVG abaixo (pixel fixo, pensada pra 1
// linha só) cruzava por cima da 2ª linha, lendo como texto riscado — visível
// no PNG renderizado desta peça ("cada negócio, seu" / "jeito" cortado pela
// seta). Fix: `whiteSpace: 'nowrap'`, mesma correção aplicada em RotasKit.tsx.
const HandDrawnAnnotation: React.FC = () => (
  <div style={{position: 'absolute', left: 40, top: -64, zIndex: 5}}>
    <div
      style={{
        fontFamily: FONT_SERIF_ROTAS,
        fontStyle: 'italic',
        fontWeight: 400,
        fontSize: 24,
        color: neutral.quasePreto,
        transform: 'rotate(-3deg)',
        whiteSpace: 'nowrap',
      }}
    >
      cada negócio, seu jeito
    </div>
    <svg width={200} height={70} viewBox="0 0 200 70" fill="none" style={{position: 'absolute', left: 30, top: 34}}>
      <path
        d="M 6 4 C 40 10, 70 4, 96 22 C 118 38, 128 46, 148 56"
        stroke={neutral.quasePreto}
        strokeWidth={2.2}
        strokeLinecap="round"
        fill="none"
      />
      <path d="M 136 48 L 148 56 L 138 62" stroke={neutral.quasePreto} strokeWidth={2.2} strokeLinecap="round" fill="none" />
    </svg>
  </div>
);

// ---------------------------------------------------------------------------
// Slide 1 — Capa
// ---------------------------------------------------------------------------
export const RotasCapa: React.FC = () => {
  ensureSansLoaded();
  ensureNewsreaderLoaded();
  return (
    <AbsoluteFill style={{background: neutral.begeClaro}}>
      <GridTexture id="grid-rotas-capa" color={neutral.quasePreto} opacity={0.09} />
      <TrackRail tracks={RAIL_TRACKS} activeIndex={null} />
      <AbsoluteFill style={{padding: 64}}>
        <Overline color={neutral.cinzaEscuro}>NTB Estoque</Overline>

        <div style={{position: 'relative', height: 420, marginTop: 100}}>
          <PostitCard label="Restaurante" caption="Controla validade por lote" color={TRACK_RESTAURANTE} rotate={-5} x={20} y={40} clipSeedIndex={0}>
            <GeometricDiagram color={TRACK_RESTAURANTE} width={220} />
          </PostitCard>
          <PostitCard label="Loja de roupa" caption="Controla grade e tamanho" color={TRACK_LOJA} rotate={3} x={382} y={4} clipSeedIndex={1}>
            <HangerIcon color={TRACK_LOJA} size={124} />
          </PostitCard>
          <PostitCard label="Distribuidora" caption="Rastreia lote até a nota" color={TRACK_DISTRIBUIDORA} rotate={-2} x={734} y={56} clipSeedIndex={2}>
            <MiniBarCompare color={TRACK_DISTRIBUIDORA} labelTop="Com sistema" labelBottom="No manual" width={210} />
          </PostitCard>
          <HandDrawnAnnotation />
        </div>

        <div style={{height: 90}} />

        <h1
          style={{
            fontFamily: FONT_SERIF_ROTAS,
            fontWeight: 400,
            fontSize: 68,
            lineHeight: 1.08,
            letterSpacing: '-0.01em',
            color: neutral.quasePreto,
            margin: 0,
            maxWidth: 900,
          }}
        >
          Um sistema. <span style={{fontWeight: 700}}>Três jeitos</span> de organizar o estoque.
        </h1>
        <div style={{height: 18}} />
        <p
          style={{
            fontFamily: FONT_SANS,
            fontWeight: 400,
            fontSize: 21,
            lineHeight: 1.5,
            color: neutral.cinzaEscuro,
            opacity: 0.78,
            margin: 0,
            maxWidth: 760,
          }}
        >
          Restaurante, loja de roupa ou distribuidora — o NTB Estoque se adapta ao que você vende.
        </p>
        <div style={{height: 40}} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// Slides de trilha (2, 3, 4)
// ---------------------------------------------------------------------------
const TrackSlide: React.FC<{
  index: number;
  color: string;
  label: string;
  headline: string;
  body: string;
  icon: React.ReactNode;
  giantIcon: React.ReactNode;
}> = ({index, color, label, headline, body, icon, giantIcon}) => {
  ensureSansLoaded();
  ensureNewsreaderLoaded();
  const trackY = RAIL_TRACKS[index].y;
  // Fundo ÚNICO (o mesmo bege da Capa e do Fechamento) em TODO o carrossel —
  // pedido explícito do fundador depois de ver as 3 cores saturadas cheias
  // lado a lado ("MESMA FUNDO"): a identidade de cada trilha vive na linha,
  // no rótulo e na borda dos blocos de texto, nunca no fundo do slide.
  //
  // POSIÇÃO DO CONTEÚDO = trackY (Rodada 9): antes o bloco de texto ficava
  // sempre centralizado na tela e era a LINHA que se desviava até ele — como
  // as 3 trilhas têm alturas bem diferentes (270/675/1080), isso fazia todo
  // mundo convergir visualmente pro centro do frame quando ativo, e o
  // fundador viu isso como "tudo bunched no meio, sem diferença real entre
  // as trilhas". Agora é o oposto: o bloco de texto centraliza-se NA altura
  // da própria trilha (`top: trackY`, `translateY(-50%)`) — a linha continua
  // reta o slide inteiro, e cada trilha ocupa sua própria faixa clara da
  // altura do frame, sem nunca se cruzar com as outras.
  //
  // ÍCONE PRÓPRIO REPETIDO (Rodada 9, 2ª correção): o fundador apontou que
  // ainda sobrava vazio E que a peça não tinha a riqueza da referência. Até
  // aqui o diagrama/desenho de cada trilha (gráfico, cabide, barras) só
  // aparecia no card post-it da Capa — os slides individuais eram só texto
  // sobre bege vazio. Agora o MESMO gráfico daquela trilha aparece em
  // tamanho grande ao lado do texto, lado a lado (não empilhado) — usa o
  // espaço horizontal disponível em vez de esticar o bloco verticalmente, e
  // reforça a identidade visual entre a Capa e o slide "dono" da trilha.
  // MARCA D'ÁGUA GIGANTE (Rodada 9, 3ª correção): o mesmo desenho da trilha,
  // em escala enorme e opacidade baixíssima, preenchendo o espaço vazio
  // acima/abaixo do bloco de conteúdo — textura editorial, não decoração
  // competindo com o texto. Posicionada no lado OPOSTO da faixa vertical
  // onde o vazio é maior (Restaurante fica no topo → marca embaixo;
  // Distribuidora fica embaixo → marca em cima; Loja já está no centro,
  // então a marca fica acima, simetricamente equilibrada).
  const watermarkTop = trackY < HEIGHT_ROTAS * 0.4 ? '58%' : trackY > HEIGHT_ROTAS * 0.6 ? '4%' : '6%';
  const elbow = computeElbowLocal(trackY);
  return (
    <AbsoluteFill style={{background: neutral.begeClaro}}>
      <GridTexture id={`grid-rotas-${index}`} color={neutral.quasePreto} opacity={0.09} />
      <div style={{position: 'absolute', top: watermarkTop, left: '50%', transform: 'translateX(-50%)', opacity: 0.07}}>
        {giantIcon}
      </div>
      <TrackRail tracks={RAIL_TRACKS} activeIndex={index} elbow={elbow} />
      <div
        style={{
          position: 'absolute',
          top: trackY,
          left: 64,
          right: 64,
          transform: 'translateY(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: 44,
        }}
      >
        <div style={{flex: '0 0 auto', width: 220, display: 'flex', justifyContent: 'center'}}>{icon}</div>
        <div style={{flex: '1 1 auto', minWidth: 0}}>
          <div style={{marginBottom: 14}}>
            <Overline color={color}>{label}</Overline>
          </div>
          <TornBlock clip={TORN_A} rotate={-0.4} border={color}>
            <h2
              style={{
                fontFamily: FONT_SERIF_ROTAS,
                fontWeight: 700,
                fontSize: 40,
                lineHeight: 1.16,
                color: neutral.quasePreto,
                margin: 0,
              }}
            >
              {headline}
            </h2>
          </TornBlock>
          <div style={{height: 22}} />
          <TornBlock clip={TORN_B} rotate={0.3} border={color}>
            <p
              style={{
                fontFamily: FONT_SANS,
                fontWeight: 400,
                fontSize: 20,
                lineHeight: 1.5,
                color: neutral.cinzaEscuro,
                margin: 0,
              }}
            >
              {body}
            </p>
          </TornBlock>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const RotasRestaurante: React.FC = () => (
  <TrackSlide
    index={0}
    color={TRACK_RESTAURANTE}
    label="Restaurante"
    headline="Validade que ninguém esquece."
    body="Cada lote entra com data de validade. O sistema avisa antes de vencer — sem post-it na geladeira, sem prejuízo silencioso."
    icon={<GeometricDiagram color={TRACK_RESTAURANTE} width={200} />}
    giantIcon={<GeometricDiagram color={neutral.quasePreto} width={620} />}
  />
);

export const RotasLojaDeRoupa: React.FC = () => (
  <TrackSlide
    index={1}
    color={TRACK_LOJA}
    label="Loja de roupa"
    headline="Grade e tamanho, sob controle."
    body="P, M, G, cor, coleção — cada variação vira uma linha só sua no estoque. Você sabe o que tem e o que falta, tamanho por tamanho."
    icon={<HangerIcon color={TRACK_LOJA} size={150} />}
    giantIcon={<HangerIcon color={neutral.quasePreto} size={520} />}
  />
);

export const RotasDistribuidora: React.FC = () => (
  <TrackSlide
    index={2}
    color={TRACK_DISTRIBUIDORA}
    label="Distribuidora"
    headline="Cada lote, rastreável até a nota."
    body="Recebimento, lote, nota fiscal e destino — tudo conectado. Se o cliente perguntar de onde veio, a resposta está a um clique."
    icon={<MiniBarCompare color={TRACK_DISTRIBUIDORA} labelTop="Com sistema" labelBottom="No manual" width={190} />}
    giantIcon={<MiniBarCompare color={neutral.quasePreto} labelTop="Com sistema" labelBottom="No manual" width={560} />}
  />
);

// ---------------------------------------------------------------------------
// Slide 5 — Fechamento
// ---------------------------------------------------------------------------
export const RotasFechamento: React.FC = () => {
  ensureSansLoaded();
  ensureNewsreaderLoaded();
  return (
    <AbsoluteFill style={{background: neutral.begeClaro}}>
      <GridTexture id="grid-rotas-fechamento" color={neutral.quasePreto} opacity={0.09} />
      {/*
        `converge` faz as 3 trilhas terminarem exatamente em (CONVERGE_X,
        CONVERGE_Y) — não mais numa aproximação assintótica fora do frame.
        O Mascote abaixo é posicionado NESSE mesmo ponto (import direto das
        constantes, não um valor duplicado/estimado), pra ele ser de fato o
        destino onde as linhas se encontram, não um ícone perto delas.
      */}
      <TrackRail tracks={RAIL_TRACKS} activeIndex={null} converge />
      <AbsoluteFill style={{padding: 64, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div style={{height: 150}} />
        <h2
          style={{
            fontFamily: FONT_SERIF_ROTAS,
            fontWeight: 400,
            fontSize: 50,
            lineHeight: 1.18,
            color: neutral.quasePreto,
            textAlign: 'center',
            margin: 0,
            maxWidth: 780,
          }}
        >
          Não importa o seu negócio. <span style={{fontWeight: 700}}>O estoque organizado começa aqui.</span>
        </h2>
        <div style={{height: 28}} />
        <Overline color={neutral.cinzaEscuro}>Fale com a Norte no link da bio</Overline>
      </AbsoluteFill>

      {/*
        Ponto de chegada: o Mascote real (não ícone genérico) fica exatamente
        onde as 3 trilhas se fundem. `translate(-50%,-50%)` centraliza o SVG
        (proporção 494x573) nesse ponto, não só no seu canto. O halo atrás é
        um glow estático sutil (post é imagem, não precisa de animação de
        verdade aqui) que sugere "ponto de chegada" sem virar decoração vazia
        — o Mascote aqui tem função narrativa (destino das linhas), a regra
        antiga de "mascote nunca estático como enfeite" não se aplica.
      */}
      <div
        style={{
          position: 'absolute',
          left: CONVERGE_X,
          top: CONVERGE_Y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: 300,
            height: 300,
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${brand.primary}33 0%, ${brand.primary}00 68%)`,
          }}
        />
        {/*
          Rotação 90° (Rodada 13, pedido direto do fundador): o foguete
          nasceu do site apontando pra CIMA (nariz no topo, chama embaixo) —
          mas nesse slide o fluxo inteiro da composição vai da esquerda pra
          DIREITA (as trilhas convergem e a linha continua reta até a borda
          direita). Um foguete "voando pra cima" enquanto tudo se move "pra
          direita" lê como estático/sem propósito. Giramos ele 90° no sentido
          horário pra apontar na mesma direção do fluxo (nariz à direita,
          chama à esquerda) — reforça que ele é o destino/próximo passo, não
          um enfeite parado.
        */}
        <Mascote size={196} style={{position: 'relative', transform: 'rotate(90deg)'}} />
      </div>
    </AbsoluteFill>
  );
};

// Defaults exigidos pelo pipeline (Still não recebe props nesta rodada).
export const rotasCapaDefaultProps = {};
export const rotasRestauranteDefaultProps = {};
export const rotasLojaDeRoupaDefaultProps = {};
export const rotasDistribuidoraDefaultProps = {};
export const rotasFechamentoDefaultProps = {};
