import React from 'react';
import {RailTrack, shade} from '../lib/TrackRail';
import {ClockIcon, BarcodeIcon, ShelfIcon, BoxStackIcon} from '../lib/EditorialIcons';
import {productColors, neutral} from '../lib/themes';
import {computeTrackYs, RotasCapaShell, RotasFechamentoShell, TrackSlide} from '../lib/RotasKit';

/**
 * ROTAS — NTB Estoque, tema SAZONALIDADE (Rodada 15, 2026-09-05).
 *
 * "O estoque também tem estação": 4 fases de uma data de pico (Black Friday,
 * Natal, dia dos pais etc.) — Pré-temporada (compra pensada antes da data),
 * Pico (a venda mais alta do ano), Reposição (resposta rápida no meio do
 * pico) e Sobra (o que fica depois, controle de baixa). Ângulo de conteúdo
 * NOVO dentro de um produto já existente (NTB Estoque já tinha 2 peças —
 * "3 perfis de negócio" e "3 formas de perder dinheiro" — esta é a 3ª,
 * "como o estoque se adapta no tempo").
 *
 * 4 TRILHAS (decisão de conteúdo, não regra fixa): um ciclo sazonal tem 4
 * momentos genuinamente distintos, cada um com sua própria lógica de
 * decisão — forçar isso em 2 ou 3 trilhas apagaria uma fase real do ciclo.
 *
 * LINHA S-CURVE (`elbowStyle="curve"`) em vez do ângulo reto: a metáfora do
 * conteúdo É uma curva que sobe e desce (a "onda" da sazonalidade) — a curva
 * suave do cotovelo reforça essa ideia em vez de brigar com ela (o ângulo
 * reto do formato original comunica "sistemático", não "cíclico").
 *
 * ÍCONES: `ClockIcon` (Pré-temporada — prazo pra se preparar antes da data),
 * `BarcodeIcon` (Pico — o produto que mais sai, código de barras passando
 * sem parar), `ShelfIcon` (Reposição — PRIMEIRO USO EM PRODUÇÃO deste ícone,
 * criado na Rodada 14 mas nunca testado; encaixa bem aqui — prateleira
 * sendo reabastecida), `BoxStackIcon` (Sobra — estoque parado empilhado
 * depois do pico).
 *
 * COMPOSIÇÃO BESPOKE: a Capa organiza os 4 post-its em ONDA (y alternando
 * baixo-alto-baixo-alto ao longo do x) em vez da fileira, da sobreposição ou
 * da grade 2×2 já usadas nas outras peças — reforça visualmente "sobe e
 * desce" antes mesmo do leitor ler o texto.
 */

const BASE = productColors.estoque; // #2eb5c3
const TRACK_PRE = BASE;
const TRACK_PICO = shade(BASE, 0.22);
const TRACK_REPOSICAO = shade(BASE, -0.22);
const TRACK_SOBRA = shade(BASE, -0.4);

const TRACKS: RailTrack[] = computeTrackYs(4).map((y, i) => ({
  y,
  color: [TRACK_PRE, TRACK_PICO, TRACK_REPOSICAO, TRACK_SOBRA][i],
}));

const ELBOW_LIFT = 175;

export const EstoqueSazonalidadeCapa: React.FC = () => (
  <RotasCapaShell
    tracks={TRACKS}
    eyebrow="NTB Estoque"
    annotationText="o estoque acompanha a onda"
    cardsAreaHeight={460}
    cards={[
      {
        label: 'Pré-temporada',
        caption: 'Compra pensada antes da data virar pico',
        color: TRACK_PRE,
        rotate: -4,
        x: 0,
        y: 90,
        width: 210,
        children: <ClockIcon color={TRACK_PRE} size={90} />,
      },
      {
        label: 'Pico',
        caption: 'A venda mais alta do ano não pode faltar produto',
        color: TRACK_PICO,
        rotate: 3,
        x: 250,
        y: 10,
        width: 210,
        children: <BarcodeIcon color={TRACK_PICO} size={100} />,
      },
      {
        label: 'Reposição',
        caption: 'Resposta rápida no meio do pico, sem esperar o ciclo normal',
        color: TRACK_REPOSICAO,
        rotate: -3,
        x: 500,
        y: 90,
        width: 210,
        children: <ShelfIcon color={TRACK_REPOSICAO} size={90} />,
      },
      {
        label: 'Sobra',
        caption: 'O que fica depois do pico também é decisão de estoque',
        color: TRACK_SOBRA,
        rotate: 4,
        x: 742,
        y: 20,
        width: 210,
        children: <BoxStackIcon color={TRACK_SOBRA} size={90} />,
      },
    ]}
    title={
      <>
        O estoque também tem <span style={{fontWeight: 700}}>estação</span>.
      </>
    }
    subtitle="Pré-temporada, pico, reposição ou sobra — o NTB Estoque acompanha a curva da data que mais vende, não só o dia a dia."
  />
);

export const EstoqueSazonalidadePre: React.FC = () => (
  <TrackSlide
    tracks={TRACKS}
    index={0}
    color={TRACK_PRE}
    label="Pré-temporada"
    headline="Compra pensada antes da data virar pico."
    body="Quem compra em cima da hora paga mais caro e corre risco de faltar. O estoque certo se prepara pro pico com semanas de antecedência, não na véspera."
    icon={<ClockIcon color={TRACK_PRE} size={190} />}
    giantIcon={<ClockIcon color={neutral.quasePreto} size={600} />}
    elbowLift={ELBOW_LIFT}
    elbowStyle="curve"
  />
);

export const EstoqueSazonalidadePico: React.FC = () => (
  <TrackSlide
    tracks={TRACKS}
    index={1}
    color={TRACK_PICO}
    label="Pico"
    headline="A venda mais alta do ano não pode faltar produto."
    body="Black Friday, Natal, data comemorativa — é quando mais gente compra e é exatamente quando faltar estoque custa mais caro em venda perdida."
    icon={<BarcodeIcon color={TRACK_PICO} size={190} />}
    giantIcon={<BarcodeIcon color={neutral.quasePreto} size={600} />}
    elbowLift={ELBOW_LIFT}
    elbowStyle="curve"
    contentLayout="side-by-side"
  />
);

export const EstoqueSazonalidadeReposicao: React.FC = () => (
  <TrackSlide
    tracks={TRACKS}
    index={2}
    color={TRACK_REPOSICAO}
    label="Reposição"
    headline="Reposição no meio do pico não pode esperar o ciclo normal."
    body="Se o produto que mais vende acaba no 2º dia da promoção, esperar o pedido de sempre chegar é desperdiçar o resto da data inteira."
    icon={<ShelfIcon color={TRACK_REPOSICAO} size={190} />}
    giantIcon={<ShelfIcon color={neutral.quasePreto} size={600} />}
    elbowLift={ELBOW_LIFT}
    elbowStyle="curve"
  />
);

export const EstoqueSazonalidadeSobra: React.FC = () => (
  <TrackSlide
    tracks={TRACKS}
    index={3}
    color={TRACK_SOBRA}
    label="Sobra"
    headline="O que sobra depois do pico também é decisão de estoque."
    body="Encalhe pós-data vira dinheiro parado na prateleira. Saber o que sobrou rápido é o que permite decidir promoção, troca ou devolução a tempo."
    icon={<BoxStackIcon color={TRACK_SOBRA} size={190} />}
    giantIcon={<BoxStackIcon color={neutral.quasePreto} size={600} />}
    elbowLift={ELBOW_LIFT}
    elbowStyle="curve"
  />
);

export const EstoqueSazonalidadeFechamento: React.FC = () => (
  <RotasFechamentoShell
    tracks={TRACKS}
    eyebrowId="estoque-sazonalidade"
    headline={
      <>
        Toda alta tem uma queda depois. <span style={{fontWeight: 700}}>O estoque certo acompanha as duas.</span>
      </>
    }
    cta="Fale com a Norte no link da bio"
  />
);

export const estoqueSazonalidadeCapaDefaultProps = {};
export const estoqueSazonalidadePreDefaultProps = {};
export const estoqueSazonalidadePicoDefaultProps = {};
export const estoqueSazonalidadeReposicaoDefaultProps = {};
export const estoqueSazonalidadeSobraDefaultProps = {};
export const estoqueSazonalidadeFechamentoDefaultProps = {};
