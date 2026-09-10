import React from 'react';
import {AbsoluteFill} from 'remotion';
import {ensureSansLoaded, ensureNewsreaderLoaded, FONT_SANS, FONT_SERIF_ROTAS} from '../lib/fonts';
import {GridTexture} from '../lib/GridTexture';
import {RailTrack, ElbowSpec, TrackRail, shade} from '../lib/TrackRail';
import {BoxStackIcon, DeliveryBagIcon} from '../lib/EditorialIcons';
import {productColors, neutral} from '../lib/themes';
import {computeTrackYs, RotasCapaShell, RotasFechamentoShell, TrackSlide, Overline, TornBlock, TORN_A, TORN_B} from '../lib/RotasKit';

/**
 * ROTAS — NTB Estoque, tema MÚLTIPLAS LOJAS/FILIAIS (Rodada 15, 2026-09-05).
 *
 * "O que sobra numa loja pode faltar bem ali do lado": estoque compartilhado
 * entre 2 unidades do mesmo negócio — a Loja A tem sobra de um produto que a
 * Loja B está sem. 2 TRILHAS (decisão de conteúdo: são exatamente 2 lados de
 * uma mesma transferência, uma 3ª trilha genérica não acrescentaria nada).
 *
 * TESTA PASSAGEM DE BASTÃO (`BatonSpec`) num contexto diferente do já usado
 * em `RotasAvaliaRenovacao.tsx` (que era uma transição no TEMPO — contrato
 * antigo → fornecedor atual). Aqui a passagem de bastão é uma transição no
 * ESPAÇO — a mercadoria sai fisicamente de uma loja e entra em outra —
 * mesmo mecanismo de linha, justificativa narrativa diferente: faz sentido
 * porque é literalmente uma ENTREGA (não 2 coisas paralelas que nunca se
 * tocam).
 *
 * ÍCONES: `BoxStackIcon` (Loja A — estoque parado que pode ser transferido),
 * `DeliveryBagIcon` (Loja B — a mercadoria que chega por transferência).
 *
 * COMPOSIÇÃO BESPOKE: a Capa usa uma PILHA VERTICAL (Loja A no canto
 * superior esquerdo, Loja B bem mais abaixo E à direita — deslocamento
 * vertical MAIOR que o horizontal) em vez da sobreposição quase-horizontal
 * que `RotasVendas.tsx` já usa pra 2 trilhas — reforça a ideia de "a
 * mercadoria desce de uma loja pra outra".
 */

const BASE = productColors.estoque; // #2eb5c3
const TRACK_LOJA_A = BASE;
const TRACK_LOJA_B = shade(BASE, -0.3);

const TRACKS: RailTrack[] = computeTrackYs(2).map((y, i) => ({
  y,
  color: i === 0 ? TRACK_LOJA_A : TRACK_LOJA_B,
}));

const ELBOW_LIFT = 190;

export const EstoqueMultilojaCapa: React.FC = () => (
  <RotasCapaShell
    tracks={TRACKS}
    eyebrow="NTB Estoque"
    annotationText="de uma loja pra outra"
    cardsAreaHeight={560}
    cards={[
      {
        label: 'Loja A',
        caption: 'Tem sobra de um produto que não sai',
        color: TRACK_LOJA_A,
        rotate: -6,
        x: 0,
        y: 0,
        width: 300,
        children: <BoxStackIcon color={TRACK_LOJA_A} size={110} />,
      },
      {
        label: 'Loja B',
        caption: 'Está sem o mesmo produto, vendendo bem',
        color: TRACK_LOJA_B,
        rotate: 5,
        x: 420,
        y: 300,
        width: 300,
        children: <DeliveryBagIcon color={TRACK_LOJA_B} size={116} />,
      },
    ]}
    title={
      <>
        Duas lojas. <span style={{fontWeight: 700}}>Um estoque só</span>, sempre sincronizado.
      </>
    }
    subtitle="O NTB Estoque mostra o que cada unidade tem em tempo real — nenhuma loja precisa adivinhar o que a outra guarda."
  />
);

// Slide 1 — Loja A (passagem de bastão: sai em rampa até a homeY de Loja B).
// Mesmo cuidado de layout já documentado em `RotasAvaliaRenovacao.tsx`
// (`AvaliaRenovacaoContrato`): cotovelo + baton competem pelo mesmo espaço
// na borda direita, então este slide usa texto mais estreito (`CONTENT_X2`
// bem antes da borda) em vez do `TrackSlide` genérico.
const CONTENT_X1 = 64;
const CONTENT_X2 = 760;

export const EstoqueMultilojaLojaA: React.FC = () => {
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
      <GridTexture id="grid-estoque-multiloja-a" color={neutral.quasePreto} opacity={0.09} />
      <div style={{position: 'absolute', top: '58%', left: '50%', transform: 'translateX(-50%)', opacity: 0.07}}>
        <BoxStackIcon color={neutral.quasePreto} size={520} />
      </div>
      <TrackRail tracks={TRACKS} activeIndex={0} elbow={elbow} baton={{exitY}} />
      <div style={{position: 'absolute', top: trackY, left: CONTENT_X1, width: CONTENT_X2 - CONTENT_X1, transform: 'translateY(-50%)'}}>
        <div style={{marginBottom: 14}}>
          <Overline color={TRACK_LOJA_A}>Loja A</Overline>
        </div>
        <TornBlock clip={TORN_A} rotate={-0.4} border={TRACK_LOJA_A}>
          <h2 style={{fontFamily: FONT_SERIF_ROTAS, fontWeight: 700, fontSize: 38, lineHeight: 1.18, color: neutral.quasePreto, margin: 0}}>
            O que sobra numa loja pode faltar bem ali do lado.
          </h2>
        </TornBlock>
        <div style={{height: 20}} />
        <TornBlock clip={TORN_B} rotate={0.3} border={TRACK_LOJA_A}>
          <p style={{fontFamily: FONT_SANS, fontWeight: 400, fontSize: 19, lineHeight: 1.48, color: neutral.cinzaEscuro, margin: 0}}>
            Sem visibilidade entre unidades, cada loja só enxerga o próprio estoque — e decide comprar de novo em vez
            de transferir o que já existe.
          </p>
        </TornBlock>
      </div>
    </AbsoluteFill>
  );
};

// Slide 2 — Loja B (recebe o bastão na mesma altura em que Loja A saiu)
export const EstoqueMultilojaLojaB: React.FC = () => (
  <TrackSlide
    tracks={TRACKS}
    index={1}
    color={TRACK_LOJA_B}
    label="Loja B"
    headline="A transferência entra no estoque assim que chega, não depois."
    body="A mercadoria que vem da Loja A já aparece disponível pra venda no sistema da Loja B no mesmo dia — sem planilha separada, sem contagem dupla."
    icon={<DeliveryBagIcon color={TRACK_LOJA_B} size={190} />}
    giantIcon={<DeliveryBagIcon color={neutral.quasePreto} size={600} />}
    elbowLift={ELBOW_LIFT}
  />
);

export const EstoqueMultilojaFechamento: React.FC = () => (
  <RotasFechamentoShell
    tracks={TRACKS}
    eyebrowId="estoque-multiloja"
    headline={
      <>
        Nenhuma loja precisa adivinhar <span style={{fontWeight: 700}}>o que a outra tem.</span>
      </>
    }
    cta="Fale com a Norte no link da bio"
  />
);

export const estoqueMultilojaCapaDefaultProps = {};
export const estoqueMultilojaLojaADefaultProps = {};
export const estoqueMultilojaLojaBDefaultProps = {};
export const estoqueMultilojaFechamentoDefaultProps = {};
