import React from 'react';
import {RailTrack, shade} from '../lib/TrackRail';
import {BarcodeIcon, ChecklistIcon} from '../lib/EditorialIcons';
import {MiniBarCompare} from '../lib/MiniChart';
import {productColors, neutral} from '../lib/themes';
import {computeTrackYs, RotasCapaShell, RotasFechamentoShell, TrackSlide} from '../lib/RotasKit';

/**
 * ROTAS — NTB Vendas, tema PROMOÇÃO/DESCONTO SEM PREJUÍZO (Rodada 15,
 * 2026-09-05). "Desconto que não vira prejuízo": Desconto planejado (decidido
 * antes, não negociado na hora), Margem visível (o que sobra depois do
 * desconto, não só o preço final) e Registro automático (o desconto entra
 * no sistema, não vira ajuste manual esquecido). 3 trilhas — 3 disciplinas
 * diferentes de uma mesma decisão comercial.
 *
 * COTOVELO EM ÂNGULO RETO (padrão do formato) — tom mais direto/comercial,
 * sem a curva que a peça de Fechamento de caixa (mesmo produto) usa.
 *
 * RECHEIO DE CARD — 3 tipos diferentes, regra do formato: `BarcodeIcon`
 * (Desconto = objeto concreto, o preço/código passando), `MiniBarCompare`
 * (Margem = dado/métrica, com/sem desconto), `ChecklistIcon` (Registro =
 * objeto concreto, o item confirmado no sistema).
 *
 * COMPOSIÇÃO BESPOKE: a Capa varia a LARGURA dos post-its (pequeno-grande-
 * pequeno) em vez da largura uniforme das outras peças — o card do meio
 * (Margem, o gráfico) é fisicamente maior, deixando claro visualmente que
 * "margem" é o ponto central do argumento, não só mais um item da lista.
 */

const BASE = productColors.vendas; // #f8a41a
const TRACK_DESCONTO = BASE;
const TRACK_MARGEM = shade(BASE, 0.28);
const TRACK_REGISTRO = shade(BASE, -0.3);

const TRACKS: RailTrack[] = computeTrackYs(3).map((y, i) => ({
  y,
  color: [TRACK_DESCONTO, TRACK_MARGEM, TRACK_REGISTRO][i],
}));

const ELBOW_LIFT = 160;

export const VendasPromocaoCapa: React.FC = () => (
  <RotasCapaShell
    tracks={TRACKS}
    eyebrow="NTB Vendas"
    annotationText="desconto sem perder margem"
    cardsAreaHeight={460}
    cards={[
      {
        label: 'Desconto',
        caption: 'Decidido antes, não negociado no balcão',
        color: TRACK_DESCONTO,
        rotate: -5,
        x: 40,
        y: 60,
        width: 230,
        children: <BarcodeIcon color={TRACK_DESCONTO} size={100} />,
      },
      {
        label: 'Margem',
        caption: 'O que sobra depois do desconto, não só o preço final',
        color: TRACK_MARGEM,
        rotate: 3,
        x: 300,
        y: 0,
        width: 340,
        children: <MiniBarCompare color={TRACK_MARGEM} labelTop="Sem desconto" labelBottom="Com desconto" width={220} />,
      },
      {
        label: 'Registro',
        caption: 'Entra no sistema, não vira ajuste manual esquecido',
        color: TRACK_REGISTRO,
        rotate: -3,
        x: 700,
        y: 70,
        width: 230,
        children: <ChecklistIcon color={TRACK_REGISTRO} size={100} />,
      },
    ]}
    title={<>Desconto que não vira <span style={{fontWeight: 700}}>prejuízo</span>.</>}
    subtitle="Desconto planejado, margem visível e registro automático — o NTB Vendas mostra o preço final sem esconder o que ele custou."
  />
);

export const VendasPromocaoDesconto: React.FC = () => (
  <TrackSlide
    tracks={TRACKS}
    index={0}
    color={TRACK_DESCONTO}
    label="Desconto"
    headline="O desconto certo é decidido antes, não negociado no balcão."
    body="Desconto combinado na hora, pra fechar a venda, é o mais fácil de sair do controle. Regra definida antes protege a margem sem perder o cliente."
    icon={<BarcodeIcon color={TRACK_DESCONTO} size={190} />}
    giantIcon={<BarcodeIcon color={neutral.quasePreto} size={600} />}
    elbowLift={ELBOW_LIFT}
  />
);

export const VendasPromocaoMargem: React.FC = () => (
  <TrackSlide
    tracks={TRACKS}
    index={1}
    color={TRACK_MARGEM}
    label="Margem"
    headline="Ver o preço com desconto não é ver a margem que sobrou."
    body="10% de desconto pode ser 30% de margem a menos, dependendo do produto. Sem essa conta visível na hora, todo desconto parece pequeno."
    icon={<MiniBarCompare color={TRACK_MARGEM} labelTop="Sem desconto" labelBottom="Com desconto" width={190} />}
    giantIcon={<MiniBarCompare color={neutral.quasePreto} labelTop="Sem desconto" labelBottom="Com desconto" width={560} />}
    elbowLift={ELBOW_LIFT}
    contentLayout="side-by-side"
  />
);

export const VendasPromocaoRegistro: React.FC = () => (
  <TrackSlide
    tracks={TRACKS}
    index={2}
    color={TRACK_REGISTRO}
    label="Registro"
    headline="Desconto dado de cabeça é desconto que ninguém mais explica depois."
    body="Todo desconto aplicado fica registrado na venda — no fechamento do mês, dá pra saber exatamente quanto foi concedido e em quê."
    icon={<ChecklistIcon color={TRACK_REGISTRO} size={190} />}
    giantIcon={<ChecklistIcon color={neutral.quasePreto} size={600} />}
    elbowLift={ELBOW_LIFT}
  />
);

export const VendasPromocaoFechamento: React.FC = () => (
  <RotasFechamentoShell
    tracks={TRACKS}
    eyebrowId="vendas-promocao"
    headline={<>Desconto bem dado é <span style={{fontWeight: 700}}>decisão, não improviso.</span></>}
    cta="Fale com a Norte no link da bio"
  />
);

export const vendasPromocaoCapaDefaultProps = {};
export const vendasPromocaoDescontoDefaultProps = {};
export const vendasPromocaoMargemDefaultProps = {};
export const vendasPromocaoRegistroDefaultProps = {};
export const vendasPromocaoFechamentoDefaultProps = {};
