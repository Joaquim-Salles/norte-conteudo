import React from 'react';
import {AbsoluteFill} from 'remotion';
import {ensureSansLoaded, ensureNewsreaderLoaded, FONT_SANS, FONT_SERIF_ROTAS} from '../lib/fonts';
import {GridTexture} from '../lib/GridTexture';
import {RailTrack, ElbowSpec, TrackRail, shade} from '../lib/TrackRail';
import {DocumentIcon, ShoppingCartIcon, BarcodeIcon} from '../lib/EditorialIcons';
import {productColors, neutral} from '../lib/themes';
import {
  computeTrackYs,
  RotasCapaShell,
  RotasFechamentoShell,
  TrackSlide,
  Overline,
  TornBlock,
  TORN_A,
  TORN_B,
} from '../lib/RotasKit';

/**
 * ROTAS — Norte Avalia, tema RENOVAÇÃO DE CONTRATO (Rodada 14, 2026-09-05).
 *
 * "Antes de renovar no automático, reavalie": o contrato que você assinou
 * não é mais o fornecedor que você tem hoje. Peça nova dentro de um produto
 * JÁ existente (Norte Avalia já tinha uma peça de 3 trilhas — esta usa o
 * MESMO produto/cor, ângulo de conteúdo diferente: reavaliar antes de
 * renovar, não "3 decisões de negócio" da peça original).
 *
 * TESTA 2 TIPOS DE LINHA NOVOS (documentados em TrackRail.tsx):
 *
 * 1. PASSAGEM DE BASTÃO — a trilha "O que você assinou" (índice 0) não
 *    volta pra própria homeY antes da borda direita do seu slide: ela
 *    deriva numa rampa até a homeY de "O fornecedor que você tem hoje"
 *    (índice 1) e TERMINA ali — a trilha seguinte "recebe" nessa mesma
 *    altura, na borda esquerda do slide seguinte. Faz sentido narrativo
 *    aqui porque é literalmente uma ENTREGA sequencial/causal: o que foi
 *    assinado no passado dá lugar ao fornecedor real de hoje — não são 2
 *    coisas paralelas, é uma transição no tempo.
 * 2. CURVA ORGÂNICA — a trilha "O preço que você aceita sem comparar"
 *    (índice 2) usa `elbowStyle="organic"` em vez do ângulo reto — tom mais
 *    reflexivo/humano (é o slide que convida a pausar e comparar, não uma
 *    afirmação direta), coerente com a curva solta em vez do cotovelo
 *    "sistemático".
 *
 * Trilha "O que você assinou" continua aparecendo (fina/apagada) nos slides
 * seguintes e no Fechamento, na sua PRÓPRIA homeY (280) — só o SLIDE dela
 * tem a saída em rampa; nos outros slides ela se comporta como qualquer
 * trilha inativa do formato. As 3 trilhas convergem no Fechamento, como de
 * costume.
 *
 * ÍCONES NOVOS usados: `ShoppingCartIcon` (fornecedor — compra recorrente) e
 * `BarcodeIcon` (preço/produto) — 2 dos 6 novos da Rodada 14. `DocumentIcon`
 * (contrato) é reaproveitado, já existia.
 *
 * NÚMERO DE TRILHAS: 3 — mesma contagem da peça original de Avalia, mas por
 * decisão de conteúdo (3 momentos de uma renovação: o que foi assinado, o
 * fornecedor real hoje, o preço aceito sem comparar), não por regra fixa.
 */

const BASE = productColors.avalia; // #484db5
const TRACK_CONTRATO = BASE;
const TRACK_FORNECEDOR = shade(BASE, 0.28); // tom mais claro
const TRACK_PRECO = shade(BASE, -0.3); // tom mais escuro

const TRACKS: RailTrack[] = computeTrackYs(3).map((y, i) => ({
  y,
  color: [TRACK_CONTRATO, TRACK_FORNECEDOR, TRACK_PRECO][i],
}));

const ELBOW_LIFT = 195; // margem de segurança aprendida na Rodada 11

export const AvaliaRenovacaoCapa: React.FC = () => (
  <RotasCapaShell
    tracks={TRACKS}
    eyebrow="Norte Avalia"
    annotationText="do ontem pro hoje"
    cards={[
      {
        label: 'Contrato',
        caption: 'O que foi combinado 1 vez',
        color: TRACK_CONTRATO,
        rotate: -5,
        x: 20,
        y: 40,
        children: <DocumentIcon color={TRACK_CONTRATO} size={110} />,
      },
      {
        label: 'Fornecedor',
        caption: 'Quem entrega de verdade hoje',
        color: TRACK_FORNECEDOR,
        rotate: 3,
        x: 382,
        y: 4,
        children: <ShoppingCartIcon color={TRACK_FORNECEDOR} size={124} />,
      },
      {
        label: 'Preço',
        caption: 'O que você paga sem comparar',
        color: TRACK_PRECO,
        rotate: -2,
        x: 734,
        y: 56,
        children: <BarcodeIcon color={TRACK_PRECO} size={124} />,
      },
    ]}
    title={
      <>
        Antes de renovar no automático, <span style={{fontWeight: 700}}>reavalie</span>.
      </>
    }
    subtitle="O fornecedor de hoje não é mais o mesmo que você contratou — o Norte Avalia mostra o que mudou antes da renovação."
  />
);

// Slide 1 — Contrato (passagem de bastão: sai em rampa até a homeY de Fornecedor).
//
// BUG REAL achado no QA visual (Rodada 14): a 1ª versão usava `TrackSlide`
// genérico (icon + texto ocupando quase a largura inteira do frame, como
// nos outros slides) COM `baton`. O cotovelo local hugga o texto até quase
// a borda direita (x2 ~ 1038 de 1080) — mas a rampa de bastão também
// precisa de espaço na borda direita pra curvar até a homeY seguinte. Os
// 2 precisavam do MESMO espaço, e o primeiro fix (encolher a rampa pra
// caber) fez o trecho de "retorno" do cotovelo cair DENTRO da largura do
// card de texto, cortando o canto do card (confirmado no PNG renderizado:
// uma linha diagonal cruzando por cima do texto). Fix real: este slide usa
// um layout PRÓPRIO (sem ícone pequeno, texto mais estreito — `CONTENT_X2`
// bem antes da borda), deixando ~300px de sobra na direita só pra rampa.
const CONTENT_X1 = 64;
const CONTENT_X2 = 760;

export const AvaliaRenovacaoContrato: React.FC = () => {
  ensureSansLoaded();
  ensureNewsreaderLoaded();
  const trackY = TRACKS[0].y;
  const exitY = TRACKS[1].y;
  const elbow: ElbowSpec = {
    x1: CONTENT_X1,
    x2: CONTENT_X2,
    lift: ELBOW_LIFT,
    direction: trackY <= 1350 / 2 ? 1 : -1,
  };
  return (
    <AbsoluteFill style={{background: neutral.begeClaro}}>
      <GridTexture id="grid-avalia-renovacao-contrato" color={neutral.quasePreto} opacity={0.09} />
      <div style={{position: 'absolute', top: '58%', left: '50%', transform: 'translateX(-50%)', opacity: 0.07}}>
        <DocumentIcon color={neutral.quasePreto} size={520} />
      </div>
      <TrackRail tracks={TRACKS} activeIndex={0} elbow={elbow} baton={{exitY}} />
      <div style={{position: 'absolute', top: trackY, left: CONTENT_X1, width: CONTENT_X2 - CONTENT_X1, transform: 'translateY(-50%)'}}>
        <div style={{marginBottom: 14}}>
          <Overline color={TRACK_CONTRATO}>Contrato</Overline>
        </div>
        <TornBlock clip={TORN_A} rotate={-0.4} border={TRACK_CONTRATO}>
          <h2
            style={{
              fontFamily: FONT_SERIF_ROTAS,
              fontWeight: 700,
              fontSize: 38,
              lineHeight: 1.18,
              color: neutral.quasePreto,
              margin: 0,
            }}
          >
            O contrato que você assinou já não existe mais assim.
          </h2>
        </TornBlock>
        <div style={{height: 20}} />
        <TornBlock clip={TORN_B} rotate={0.3} border={TRACK_CONTRATO}>
          <p
            style={{
              fontFamily: FONT_SANS,
              fontWeight: 400,
              fontSize: 19,
              lineHeight: 1.48,
              color: neutral.cinzaEscuro,
              margin: 0,
            }}
          >
            Preço, prazo e condição foram combinados 1 vez — e o fornecedor mudou muito desde então, sem ninguém
            formalizar de novo.
          </p>
        </TornBlock>
      </div>
    </AbsoluteFill>
  );
};

// Slide 2 — Fornecedor (recebe o bastão na mesma altura em que Contrato saiu)
export const AvaliaRenovacaoFornecedor: React.FC = () => (
  <TrackSlide
    tracks={TRACKS}
    index={1}
    color={TRACK_FORNECEDOR}
    label="Fornecedor"
    headline="O fornecedor que você tem hoje é outro."
    body="Atendimento, qualidade e prazo de entrega mudam com o tempo — renovar sem checar é aceitar tudo isso de novo, sem saber se ainda vale."
    icon={<ShoppingCartIcon color={TRACK_FORNECEDOR} size={190} />}
    giantIcon={<ShoppingCartIcon color={neutral.quasePreto} size={600} />}
    elbowLift={ELBOW_LIFT}
  />
);

// Slide 3 — Preço (curva orgânica, tom mais reflexivo)
export const AvaliaRenovacaoPreco: React.FC = () => (
  <TrackSlide
    tracks={TRACKS}
    index={2}
    color={TRACK_PRECO}
    label="Preço"
    headline="O preço que você aceita sem comparar quase sempre podia ser menor."
    body="Comparar 1 vez por ano custa 1 tarde. Pagar caro sem saber custa isso — todo mês, pelo resto do contrato."
    icon={<BarcodeIcon color={TRACK_PRECO} size={190} />}
    giantIcon={<BarcodeIcon color={neutral.quasePreto} size={600} />}
    elbowLift={ELBOW_LIFT}
    elbowStyle="organic"
  />
);

export const AvaliaRenovacaoFechamento: React.FC = () => (
  <RotasFechamentoShell
    tracks={TRACKS}
    eyebrowId="avalia-renovacao"
    headline={
      <>
        Antes de renovar no automático, <span style={{fontWeight: 700}}>pergunte se ainda vale a pena.</span>
      </>
    }
    cta="Fale com a Norte no link da bio"
  />
);

export const avaliaRenovacaoCapaDefaultProps = {};
export const avaliaRenovacaoContratoDefaultProps = {};
export const avaliaRenovacaoFornecedorDefaultProps = {};
export const avaliaRenovacaoPrecoDefaultProps = {};
export const avaliaRenovacaoFechamentoDefaultProps = {};
