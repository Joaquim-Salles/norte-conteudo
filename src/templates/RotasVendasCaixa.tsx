import React from 'react';
import {RailTrack, shade} from '../lib/TrackRail';
import {ClockIcon, ChecklistIcon, CounterIcon} from '../lib/EditorialIcons';
import {productColors, neutral} from '../lib/themes';
import {computeTrackYs, RotasCapaShell, RotasFechamentoShell, TrackSlide} from '../lib/RotasKit';

/**
 * ROTAS — NTB Vendas, tema FECHAMENTO DE CAIXA (Rodada 15, 2026-09-05).
 * "Fechar o caixa sem cruzar os dedos": Conferência (contagem no fim do
 * dia), Diferença (o que não bateu, explicado — não escondido) e Fechamento
 * (registrado antes de sair, não deixado pra depois). 3 trilhas — as 3
 * etapas de encerrar o caixa do dia.
 *
 * CURVA ORGÂNICA (`elbowStyle="organic"`) em vez do ângulo reto que a outra
 * peça nova de Vendas (Promoção) usa neste mesmo lote — tom mais calmo/fim-
 * de-dia (o cotovelo sistemático da promoção comunica "regra"; a curva solta
 * daqui comunica "rotina tranquila, sem susto").
 *
 * RECHEIO DE CARD: `ClockIcon` (Conferência — fim do expediente),
 * `ChecklistIcon` (Diferença — o que foi checado e não bateu),
 * `CounterIcon` (Fechamento — o balcão, PRIMEIRO USO deste ícone desde que
 * foi criado sem nunca ter sido validado em produção, ver EditorialIcons.tsx).
 *
 * COMPOSIÇÃO BESPOKE: a Capa organiza os 3 post-its numa DIAGONAL descendente
 * (x crescente, y também crescente) — metáfora visual de "o dia descendo pro
 * fechamento", diferente da fileira, sobreposição, onda ou grade já usadas
 * nas outras peças. O slide "Diferença" usa `contentLayout="side-by-side"`
 * pra variar dentro da própria peça (headline à esquerda, corpo à direita).
 */

const BASE = productColors.vendas; // #f8a41a
const TRACK_CONFERENCIA = BASE;
const TRACK_DIFERENCA = shade(BASE, 0.25);
const TRACK_FECHAMENTO = shade(BASE, -0.3);

const TRACKS: RailTrack[] = computeTrackYs(3).map((y, i) => ({
  y,
  color: [TRACK_CONFERENCIA, TRACK_DIFERENCA, TRACK_FECHAMENTO][i],
}));

const ELBOW_LIFT = 165;

export const VendasCaixaCapa: React.FC = () => (
  <RotasCapaShell
    tracks={TRACKS}
    eyebrow="NTB Vendas"
    annotationText="fecha o dia sem susto"
    cardsAreaHeight={560}
    cards={[
      {
        label: 'Conferência',
        caption: 'Contagem no fim do dia, não só no fim do mês',
        color: TRACK_CONFERENCIA,
        rotate: -5,
        x: 0,
        y: 0,
        width: 280,
        children: <ClockIcon color={TRACK_CONFERENCIA} size={104} />,
      },
      {
        label: 'Diferença',
        caption: 'O que não bateu, explicado — não escondido',
        color: TRACK_DIFERENCA,
        rotate: 4,
        x: 300,
        y: 150,
        width: 280,
        children: <ChecklistIcon color={TRACK_DIFERENCA} size={104} />,
      },
      {
        label: 'Fechamento',
        caption: 'Registrado antes de sair, não deixado pra depois',
        color: TRACK_FECHAMENTO,
        rotate: -3,
        x: 600,
        y: 300,
        width: 280,
        children: <CounterIcon color={TRACK_FECHAMENTO} size={130} />,
      },
    ]}
    title={<>Fechar o caixa <span style={{fontWeight: 700}}>sem cruzar os dedos</span>.</>}
    subtitle="Conferência, diferença explicada e fechamento registrado — o NTB Vendas mostra o dia inteiro antes de fechar a loja."
  />
);

export const VendasCaixaConferencia: React.FC = () => (
  <TrackSlide
    tracks={TRACKS}
    index={0}
    color={TRACK_CONFERENCIA}
    label="Conferência"
    headline="Contar o caixa no fim do dia é mais barato do que contar no fim do mês."
    body="Diferença pequena, achada todo dia, é ajuste rápido. A mesma diferença, acumulada 30 dias, vira uma investigação sem pista nenhuma pra seguir."
    icon={<ClockIcon color={TRACK_CONFERENCIA} size={190} />}
    giantIcon={<ClockIcon color={neutral.quasePreto} size={600} />}
    elbowLift={ELBOW_LIFT}
    elbowStyle="organic"
  />
);

export const VendasCaixaDiferenca: React.FC = () => (
  <TrackSlide
    tracks={TRACKS}
    index={1}
    color={TRACK_DIFERENCA}
    label="Diferença"
    headline="O que não bateu tem que aparecer, não desaparecer."
    body="Troco errado, item lançado 2 vezes, desconto não registrado — o sistema mostra onde ficou a diferença, em vez de só avisar que ela existe."
    icon={<ChecklistIcon color={TRACK_DIFERENCA} size={190} />}
    giantIcon={<ChecklistIcon color={neutral.quasePreto} size={600} />}
    elbowLift={ELBOW_LIFT}
    elbowStyle="organic"
    contentLayout="side-by-side"
  />
);

export const VendasCaixaFechamento: React.FC = () => (
  <TrackSlide
    tracks={TRACKS}
    index={2}
    color={TRACK_FECHAMENTO}
    label="Fechamento"
    headline="O caixa fechado hoje não some pra ninguém reconstruir amanhã."
    body="Fechamento registrado no sistema fica disponível pra conferência a qualquer momento — não depende de lembrar o que aconteceu naquele dia."
    icon={<CounterIcon color={TRACK_FECHAMENTO} size={190} />}
    giantIcon={<CounterIcon color={neutral.quasePreto} size={600} />}
    elbowLift={ELBOW_LIFT}
    elbowStyle="organic"
  />
);

export const VendasCaixaFechamentoFinal: React.FC = () => (
  <RotasFechamentoShell
    tracks={TRACKS}
    eyebrowId="vendas-caixa"
    headline={<>Caixa fechado é caixa conferido, <span style={{fontWeight: 700}}>não caixa torcido.</span></>}
    cta="Fale com a Norte no link da bio"
  />
);

export const vendasCaixaCapaDefaultProps = {};
export const vendasCaixaConferenciaDefaultProps = {};
export const vendasCaixaDiferencaDefaultProps = {};
export const vendasCaixaFechamentoDefaultProps = {};
export const vendasCaixaFechamentoFinalDefaultProps = {};
