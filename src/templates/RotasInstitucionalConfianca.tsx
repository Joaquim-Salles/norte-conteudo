import React from 'react';
import {RailTrack, shade} from '../lib/TrackRail';
import {DocumentIcon, ClockIcon} from '../lib/EditorialIcons';
import {brand, neutral} from '../lib/themes';
import {computeTrackYs, RotasCapaShell, RotasFechamentoShell, TrackSlide} from '../lib/RotasKit';

/**
 * ROTAS — Institucional/marca, tema CONFIANÇA DO CLIENTE (Rodada 15,
 * 2026-09-05). Tom EDUCACIONAL PURO, como `RotasInstitucional.tsx` (a peça
 * institucional original): fala direto com o leitor, nenhum produto NTB/
 * Avalia citado, fecha SEM CTA nenhum (regra da voz institucional: "post
 * educacional pode fechar sem CTA — é permitido soltar conteúdo de graça").
 *
 * "O que faz um cliente confiar de novo": Transparência (falar claro sobre
 * prazo e preço antes de perguntado) e Consistência (entregar igual, toda
 * vez — não só na primeira venda). 2 TRILHAS (decisão de conteúdo: confiança
 * de cliente se sustenta em poucos princípios bem definidos, não numa lista
 * longa — forçar uma 3ª trilha genérica diluiria o argumento).
 *
 * ÍCONES: `DocumentIcon` (Transparência — a informação por escrito, clara),
 * `ClockIcon` (Consistência — a entrega no mesmo prazo, toda vez).
 *
 * COMPOSIÇÃO BESPOKE: a Capa aproxima os 2 post-its BEM PERTO um do outro,
 * quase se tocando, centralizados no meio do frame — em vez da fileira
 * espaçada ou da sobreposição diagonal que as outras peças de 2 trilhas
 * usam. A proximidade comunica "são só 2 princípios, e andam juntos" —
 * coerente com o tom mais contido/contemplativo da peça institucional.
 */

const BASE = brand.primary; // #6b71f2
const TRACK_TRANSPARENCIA = BASE;
const TRACK_CONSISTENCIA = shade(BASE, -0.3);

const TRACKS: RailTrack[] = computeTrackYs(2).map((y, i) => ({
  y,
  color: i === 0 ? TRACK_TRANSPARENCIA : TRACK_CONSISTENCIA,
}));

const ELBOW_LIFT = 185;

export const InstitucionalConfiancaCapa: React.FC = () => (
  <RotasCapaShell
    tracks={TRACKS}
    eyebrow="Norte Para Negócios"
    annotationText="só isso, sempre"
    cardsAreaHeight={420}
    cards={[
      {
        label: 'Transparência',
        caption: 'Fala claro sobre prazo e preço antes de perguntado',
        color: TRACK_TRANSPARENCIA,
        rotate: -4,
        x: 300,
        y: 10,
        width: 260,
        // BUG REAL achado no QA visual desta rodada: com os 2 cards bem
        // próximos (composição bespoke desta peça, ver comentário de topo),
        // o card "Consistência" na frente cortava a legenda deste card no
        // meio da palavra ("prazo e prec..."). Mesmo bug já documentado em
        // `PostitCard` (Rodada 12, RotasVendas.tsx) — fix: limitar a largura
        // da legenda antes da coluna onde o outro card sobrepõe.
        captionMaxWidth: 170,
        children: <DocumentIcon color={TRACK_TRANSPARENCIA} size={104} />,
      },
      {
        label: 'Consistência',
        caption: 'Entrega igual, toda vez — não só na primeira venda',
        color: TRACK_CONSISTENCIA,
        rotate: 4,
        x: 520,
        y: 60,
        width: 260,
        children: <ClockIcon color={TRACK_CONSISTENCIA} size={104} />,
      },
    ]}
    title={<>O que faz um cliente <span style={{fontWeight: 700}}>confiar de novo</span>.</>}
    subtitle="Não é preço baixo. É saber o que esperar antes de perguntar — e receber a mesma coisa da vez seguinte."
  />
);

export const InstitucionalConfiancaTransparencia: React.FC = () => (
  <TrackSlide
    tracks={TRACKS}
    index={0}
    color={TRACK_TRANSPARENCIA}
    label="Transparência"
    headline="Falar o prazo real vale mais do que prometer o prazo bonito."
    body="Cliente que ouve a data certa desde o início confia mais do que cliente que ouve uma data otimista e descobre depois que não era verdade."
    icon={<DocumentIcon color={TRACK_TRANSPARENCIA} size={200} />}
    giantIcon={<DocumentIcon color={neutral.quasePreto} size={620} />}
    elbowLift={ELBOW_LIFT}
  />
);

export const InstitucionalConfiancaConsistencia: React.FC = () => (
  <TrackSlide
    tracks={TRACKS}
    index={1}
    color={TRACK_CONSISTENCIA}
    label="Consistência"
    headline="A primeira boa entrega conquista. A décima igual é o que fideliza."
    body="Qualquer negócio consegue impressionar uma vez. Confiança de verdade nasce quando a entrega número dez chega igual à entrega número um."
    icon={<ClockIcon color={TRACK_CONSISTENCIA} size={200} />}
    giantIcon={<ClockIcon color={neutral.quasePreto} size={620} />}
    elbowLift={ELBOW_LIFT}
  />
);

export const InstitucionalConfiancaFechamento: React.FC = () => (
  <RotasFechamentoShell
    tracks={TRACKS}
    eyebrowId="institucional-confianca"
    headlineSize={64}
    headline={
      <>
        Confiança não é conquistada 1 vez. <span style={{fontWeight: 700}}>É repetida toda entrega.</span>
      </>
    }
  />
);

export const institucionalConfiancaCapaDefaultProps = {};
export const institucionalConfiancaTransparenciaDefaultProps = {};
export const institucionalConfiancaConsistenciaDefaultProps = {};
export const institucionalConfiancaFechamentoDefaultProps = {};
