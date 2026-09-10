import React from 'react';
import {AbsoluteFill} from 'remotion';
import {ensureSansLoaded, ensureNewsreaderLoaded, FONT_SANS, FONT_SERIF_ROTAS} from '../lib/fonts';
import {GridTexture} from '../lib/GridTexture';
import {RailTrack, TrackRail, shade} from '../lib/TrackRail';
import {ClockIcon, BoxStackIcon, ChecklistIcon} from '../lib/EditorialIcons';
import {productColors, neutral} from '../lib/themes';
import {
  RotasCapaShell,
  RotasFechamentoShell,
  TrackSlide,
  Overline,
  TornBlock,
  TORN_A,
  TORN_B,
} from '../lib/RotasKit';

/**
 * ROTAS — NTB Estoque, tema PERDA/QUEBRA (Rodada 14, 2026-09-05).
 *
 * "3 formas de perder dinheiro sem perceber": validade vencida, quebra de
 * embalagem, contagem errada. Peça nova dentro de um produto JÁ existente
 * (NTB Estoque) — não é produto novo, é ângulo novo (perda, não organização).
 *
 * TESTA A LINHA RAMIFICADA (`BranchSpec`, novo em TrackRail.tsx — ver
 * comentário lá pro diagnóstico completo): "validade vencida" é uma trilha
 * PARALELA de sempre (própria faixa de altura, do início ao fim). Mas
 * "quebra de embalagem" e "contagem errada" NASCEM da MESMA causa raiz —
 * "descontrole na entrada do estoque" — e só se separam em 2 trilhas
 * distintas no slide "RaizDoProblema": antes desse slide, as 2 trilhas
 * viajam sobrepostas na mesma altura (`TRUNK_Y`); nesse slide, a linha se
 * abre em 2 curvas que terminam em 2 alturas diferentes; dali em diante,
 * cada uma vira uma trilha própria, com sua própria faixa.
 *
 * Por que branching (e não passagem de bastão) faz mais sentido aqui: o
 * conteúdo É literalmente "1 causa gera 2 consequências diferentes" — as 2
 * perdas continuam acontecendo em PARALELO dali em diante (não é uma etapa
 * que "entrega" pra próxima e desaparece, que seria o caso de uso certo pra
 * passagem de bastão).
 *
 * ÍCONES NOVOS usados (3 de 6 do repertório da Rodada 14): `ClockIcon`
 * (validade — o relógio comunica "prazo correndo"), `BoxStackIcon` (quebra —
 * caixas empilhadas, dano físico de armazenagem), `ChecklistIcon` (contagem
 * errada — lista de verificação que não bateu).
 *
 * PALETA: `productColors.estoque` (teal, #2eb5c3) como âncora, 3 tons da
 * mesma família via `shade()` — mesma regra de paleta por produto que
 * Vendas/Avalia já usam (Rodada 10).
 */

const BASE = productColors.estoque; // #2eb5c3
const TRACK_VALIDADE = BASE;
const TRACK_QUEBRA = shade(BASE, 0.3); // tom mais claro
const TRACK_CONTAGEM = shade(BASE, -0.32); // tom mais escuro

const HEIGHT_ROTAS = 1350;
const VALIDADE_Y = 230;
const TRUNK_Y = 900; // altura compartilhada por Quebra/Contagem ANTES da ramificação
const QUEBRA_Y = 700; // altura final de Quebra, DEPOIS da ramificação
const CONTAGEM_Y = 1120; // altura final de Contagem, DEPOIS da ramificação
const SPLIT_X = 620;

// Tracks ANTES do slide de ramificação (Capa, Validade): Quebra e Contagem
// ainda compartilham a mesma `y` (TRUNK_Y) — ainda não são 2 trilhas
// separadas visualmente, é a MESMA trilha em potencial.
const TRACKS_PRE: RailTrack[] = [
  {y: VALIDADE_Y, color: TRACK_VALIDADE},
  {y: TRUNK_Y, color: TRACK_QUEBRA},
  {y: TRUNK_Y, color: TRACK_CONTAGEM},
];

// Tracks DEPOIS da ramificação (Quebra, Contagem, Fechamento): cada uma na
// sua própria faixa de altura definitiva — o `toY` do `BranchSpec` do slide
// de ramificação bate exatamente com esses 2 valores (garante a
// continuidade esquerda↔direita por construção, mesma lógica de `homeY`).
const TRACKS_POST: RailTrack[] = [
  {y: VALIDADE_Y, color: TRACK_VALIDADE},
  {y: QUEBRA_Y, color: TRACK_QUEBRA},
  {y: CONTAGEM_Y, color: TRACK_CONTAGEM},
];

const ELBOW_LIFT = 195; // mesma margem de segurança aprendida na Rodada 11 (Avalia/Institucional)

// ---------------------------------------------------------------------------
// Capa
// ---------------------------------------------------------------------------
export const EstoquePerdaCapa: React.FC = () => (
  <RotasCapaShell
    tracks={TRACKS_PRE}
    eyebrow="NTB Estoque"
    annotationText="1 raiz, 2 saídas"
    cards={[
      {
        label: 'Validade',
        caption: 'Vence sem ninguém perceber',
        color: TRACK_VALIDADE,
        rotate: -5,
        x: 20,
        y: 40,
        children: <ClockIcon color={TRACK_VALIDADE} size={110} />,
      },
      {
        label: 'Quebra',
        caption: 'Embalagem avariada no estoque',
        color: TRACK_QUEBRA,
        rotate: 3,
        x: 382,
        y: 4,
        children: <BoxStackIcon color={TRACK_QUEBRA} size={110} />,
      },
      {
        label: 'Contagem',
        caption: 'O número que nunca bate',
        color: TRACK_CONTAGEM,
        rotate: -2,
        x: 734,
        y: 56,
        children: <ChecklistIcon color={TRACK_CONTAGEM} size={110} />,
      },
    ]}
    title={
      <>
        3 formas de <span style={{fontWeight: 700}}>perder dinheiro</span> sem perceber.
      </>
    }
    subtitle="Validade, quebra ou contagem errada — o prejuízo mais caro do estoque é o que ninguém vê acontecer."
  />
);

// ---------------------------------------------------------------------------
// Slide 1 — Validade vencida (trilha paralela normal, sem novidade de linha)
// ---------------------------------------------------------------------------
export const EstoquePerdaValidade: React.FC = () => (
  <TrackSlide
    tracks={TRACKS_PRE}
    index={0}
    color={TRACK_VALIDADE}
    label="Validade"
    headline="O produto vence antes de sair da prateleira."
    body="Sem alerta de vencimento, o lote mais antigo fica pra trás — e quando alguém percebe, já virou perda, não venda."
    icon={<ClockIcon color={TRACK_VALIDADE} size={200} />}
    giantIcon={<ClockIcon color={neutral.quasePreto} size={620} />}
    elbowLift={ELBOW_LIFT}
  />
);

// ---------------------------------------------------------------------------
// Slide 2 — RAIZ DO PROBLEMA (a linha ramificada — a novidade desta peça)
// ---------------------------------------------------------------------------
export const EstoquePerdaRaiz: React.FC = () => {
  ensureSansLoaded();
  ensureNewsreaderLoaded();
  return (
    <AbsoluteFill style={{background: neutral.begeClaro}}>
      <GridTexture id="grid-estoque-perda-raiz" color={neutral.quasePreto} opacity={0.09} />
      <div style={{position: 'absolute', top: '8%', left: '50%', transform: 'translateX(-50%)', opacity: 0.06}}>
        <BoxStackIcon color={neutral.quasePreto} size={560} />
      </div>
      {/*
        Linha ramificada: entra como 1 traço só (2 trilhas sobrepostas em
        TRUNK_Y, offset de ±3px pra ainda dar pra ler as 2 cores) e se abre
        em 2 curvas na altura de QUEBRA_Y/CONTAGEM_Y a partir de SPLIT_X —
        essas 2 alturas viram a `homeY` de Quebra/Contagem dali em diante.
      */}
      <TrackRail
        tracks={TRACKS_PRE}
        activeIndex={null}
        branch={{trackIndices: [1, 2], splitX: SPLIT_X, toY: [QUEBRA_Y, CONTAGEM_Y]}}
      />
      <div
        style={{
          position: 'absolute',
          top: TRUNK_Y,
          left: 64,
          right: 64,
          transform: 'translateY(-84%)',
          maxWidth: 620,
        }}
      >
        <div style={{marginBottom: 14}}>
          <Overline color={neutral.cinzaEscuro}>Descontrole na entrada</Overline>
        </div>
        <TornBlock clip={TORN_A} rotate={-0.4}>
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
            Um erro pequeno na entrada vira 2 perdas diferentes.
          </h2>
        </TornBlock>
        <div style={{height: 20}} />
        <TornBlock clip={TORN_B} rotate={0.3}>
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
            Quem não confere direito na entrada carrega o mesmo erro pro resto do estoque — daqui pra frente, ele
            aparece de 2 formas.
          </p>
        </TornBlock>
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// Slide 3 — Quebra de embalagem (já na sua própria faixa, pós-ramificação)
// ---------------------------------------------------------------------------
export const EstoquePerdaQuebra: React.FC = () => (
  <TrackSlide
    tracks={TRACKS_POST}
    index={1}
    color={TRACK_QUEBRA}
    label="Quebra"
    headline="Embalagem avariada não vira devolução — vira prejuízo mudo."
    body="Sem registro de avaria na entrada, ninguém cobra o fornecedor e ninguém tira do preço de venda o que já chegou quebrado."
    icon={<BoxStackIcon color={TRACK_QUEBRA} size={190} />}
    giantIcon={<BoxStackIcon color={neutral.quasePreto} size={600} />}
    elbowLift={ELBOW_LIFT}
  />
);

// ---------------------------------------------------------------------------
// Slide 4 — Contagem errada (a outra ponta da ramificação)
// ---------------------------------------------------------------------------
export const EstoquePerdaContagem: React.FC = () => (
  <TrackSlide
    tracks={TRACKS_POST}
    index={2}
    color={TRACK_CONTAGEM}
    label="Contagem"
    headline="O número da planilha nunca bate com a prateleira."
    body="Sem conferência real na entrada, cada contagem seguinte carrega o mesmo erro — até ninguém mais confiar no que o sistema diz ter."
    icon={<ChecklistIcon color={TRACK_CONTAGEM} size={190} />}
    giantIcon={<ChecklistIcon color={neutral.quasePreto} size={600} />}
    elbowLift={ELBOW_LIFT}
  />
);

// ---------------------------------------------------------------------------
// Fechamento
// ---------------------------------------------------------------------------
export const EstoquePerdaFechamento: React.FC = () => (
  <RotasFechamentoShell
    tracks={TRACKS_POST}
    eyebrowId="estoque-perda"
    headline={
      <>
        Validade, quebra ou contagem. <span style={{fontWeight: 700}}>A raiz é sempre a mesma entrada sem controle.</span>
      </>
    }
    cta="Fale com a Norte no link da bio"
  />
);

export const estoquePerdaCapaDefaultProps = {};
export const estoquePerdaValidadeDefaultProps = {};
export const estoquePerdaRaizDefaultProps = {};
export const estoquePerdaQuebraDefaultProps = {};
export const estoquePerdaContagemDefaultProps = {};
export const estoquePerdaFechamentoDefaultProps = {};
