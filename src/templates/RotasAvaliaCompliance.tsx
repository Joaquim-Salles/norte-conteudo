import React from 'react';
import {AbsoluteFill} from 'remotion';
import {ensureSansLoaded, ensureNewsreaderLoaded, FONT_SANS, FONT_SERIF_ROTAS} from '../lib/fonts';
import {GridTexture} from '../lib/GridTexture';
import {RailTrack, TrackRail, shade} from '../lib/TrackRail';
import {DocumentIcon, ChecklistIcon, ClockIcon} from '../lib/EditorialIcons';
import {productColors, neutral} from '../lib/themes';
import {RotasCapaShell, RotasFechamentoShell, TrackSlide, Overline, TornBlock, TORN_A, TORN_B} from '../lib/RotasKit';

/**
 * ROTAS — Norte Avalia, tema RISCO DE COMPLIANCE (Rodada 15, 2026-09-05).
 *
 * "Compliance não avisa antes de custar caro": uma falha de documentação
 * (certificação vencida, contrato incompleto) não gera 1 problema — gera 2
 * ao mesmo tempo, de natureza diferente: risco jurídico (processo, disputa)
 * e risco de multa (autuação, prazo). Mesma estrutura de LINHA RAMIFICADA já
 * testada em `RotasEstoquePerda.tsx` (`EstoquePerdaRaiz`), aplicada a um
 * conteúdo diferente: lá era "1 causa gera 2 formas de perda financeira",
 * aqui é "1 falha de documentação gera 2 tipos de risco legal".
 *
 * 3 TRILHAS FINAIS: Certificação (trilha paralela normal, sempre separada —
 * é a prevenção, não nasce da mesma raiz que os 2 riscos) + Jurídico/Multa
 * (nascem da MESMA raiz — "falha na documentação" — e só se separam no
 * slide de ramificação).
 *
 * ÍCONES: `DocumentIcon` (Certificação — o documento em dia),
 * `ChecklistIcon` (Jurídico — o que devia ter sido checado antes de assinar),
 * `ClockIcon` (Multa — prazo que passou sem ninguém perceber).
 *
 * COMPOSIÇÃO BESPOKE: a Capa usa a MESMA lógica de 3 cards em fileira que
 * `RotasEstoquePerda.tsx` já usa (fileira é o arranjo mais legível pra 3
 * cards com 1 deles sendo visualmente "a raiz" das outras 2) — mas os 2
 * cards que nascem da ramificação (Jurídico/Multa) ficam encostados, sem o
 * espaçamento generoso que a Estoque usa, reforçando visualmente que "vêm
 * do mesmo lugar".
 */

const BASE = productColors.avalia; // #484db5
const TRACK_CERTIFICACAO = BASE;
const TRACK_JURIDICO = shade(BASE, 0.3);
const TRACK_MULTA = shade(BASE, -0.32);

const CERTIFICACAO_Y = 230;
const TRUNK_Y = 900;
const JURIDICO_Y = 700;
const MULTA_Y = 1120;
const SPLIT_X = 620;

const TRACKS_PRE: RailTrack[] = [
  {y: CERTIFICACAO_Y, color: TRACK_CERTIFICACAO},
  {y: TRUNK_Y, color: TRACK_JURIDICO},
  {y: TRUNK_Y, color: TRACK_MULTA},
];

const TRACKS_POST: RailTrack[] = [
  {y: CERTIFICACAO_Y, color: TRACK_CERTIFICACAO},
  {y: JURIDICO_Y, color: TRACK_JURIDICO},
  {y: MULTA_Y, color: TRACK_MULTA},
];

const ELBOW_LIFT = 195;

export const AvaliaComplianceCapa: React.FC = () => (
  <RotasCapaShell
    tracks={TRACKS_PRE}
    eyebrow="Norte Avalia"
    annotationText="1 falha, 2 riscos"
    cards={[
      {
        label: 'Certificação',
        caption: 'Vencida sem ninguém acompanhar o prazo',
        color: TRACK_CERTIFICACAO,
        rotate: -5,
        x: 20,
        y: 40,
        children: <DocumentIcon color={TRACK_CERTIFICACAO} size={110} />,
      },
      {
        label: 'Jurídico',
        caption: 'Cláusula que devia ter sido checada antes de assinar',
        color: TRACK_JURIDICO,
        rotate: 3,
        x: 382,
        y: 4,
        children: <ChecklistIcon color={TRACK_JURIDICO} size={110} />,
      },
      {
        label: 'Multa',
        caption: 'Prazo que passou sem ninguém perceber',
        color: TRACK_MULTA,
        rotate: -2,
        x: 734,
        y: 56,
        children: <ClockIcon color={TRACK_MULTA} size={110} />,
      },
    ]}
    title={<>Compliance não avisa <span style={{fontWeight: 700}}>antes de custar caro</span>.</>}
    subtitle="Certificação, cláusula contratual ou prazo — o Norte Avalia mostra o risco de documentação antes dele virar processo ou multa."
  />
);

export const AvaliaComplianceCertificacao: React.FC = () => (
  <TrackSlide
    tracks={TRACKS_PRE}
    index={0}
    color={TRACK_CERTIFICACAO}
    label="Certificação"
    headline="A certificação vencida só aparece quando alguém pergunta por ela."
    body="Licença, alvará, certificado do fornecedor — documento que vence em silêncio é o tipo de risco que ninguém vê chegar até o dia da fiscalização."
    icon={<DocumentIcon color={TRACK_CERTIFICACAO} size={200} />}
    giantIcon={<DocumentIcon color={neutral.quasePreto} size={620} />}
    elbowLift={ELBOW_LIFT}
  />
);

export const AvaliaComplianceRaiz: React.FC = () => {
  ensureSansLoaded();
  ensureNewsreaderLoaded();
  return (
    <AbsoluteFill style={{background: neutral.begeClaro}}>
      <GridTexture id="grid-avalia-compliance-raiz" color={neutral.quasePreto} opacity={0.09} />
      <div style={{position: 'absolute', top: '8%', left: '50%', transform: 'translateX(-50%)', opacity: 0.06}}>
        <ChecklistIcon color={neutral.quasePreto} size={560} />
      </div>
      <TrackRail
        tracks={TRACKS_PRE}
        activeIndex={null}
        branch={{trackIndices: [1, 2], splitX: SPLIT_X, toY: [JURIDICO_Y, MULTA_Y]}}
      />
      <div style={{position: 'absolute', top: TRUNK_Y, left: 64, right: 64, transform: 'translateY(-84%)', maxWidth: 620}}>
        <div style={{marginBottom: 14}}>
          <Overline color={neutral.cinzaEscuro}>Falha na documentação</Overline>
        </div>
        <TornBlock clip={TORN_A} rotate={-0.4}>
          <h2 style={{fontFamily: FONT_SERIF_ROTAS, fontWeight: 700, fontSize: 38, lineHeight: 1.18, color: neutral.quasePreto, margin: 0}}>
            Um contrato mal checado vira 2 riscos diferentes.
          </h2>
        </TornBlock>
        <div style={{height: 20}} />
        <TornBlock clip={TORN_B} rotate={0.3}>
          <p style={{fontFamily: FONT_SANS, fontWeight: 400, fontSize: 19, lineHeight: 1.48, color: neutral.cinzaEscuro, margin: 0}}>
            Cláusula que ninguém leu com atenção e prazo que ninguém marcou no calendário nascem do mesmo descuido —
            daqui pra frente, o risco aparece de 2 formas.
          </p>
        </TornBlock>
      </div>
    </AbsoluteFill>
  );
};

export const AvaliaComplianceJuridico: React.FC = () => (
  <TrackSlide
    tracks={TRACKS_POST}
    index={1}
    color={TRACK_JURIDICO}
    label="Jurídico"
    headline="A cláusula que ninguém leu com atenção é a que mais custa depois."
    body="Multa por rescisão, responsabilidade solidária, reajuste automático — o risco jurídico de um contrato quase sempre já estava escrito nele."
    icon={<ChecklistIcon color={TRACK_JURIDICO} size={190} />}
    giantIcon={<ChecklistIcon color={neutral.quasePreto} size={600} />}
    elbowLift={ELBOW_LIFT}
  />
);

export const AvaliaComplianceMulta: React.FC = () => (
  <TrackSlide
    tracks={TRACKS_POST}
    index={2}
    color={TRACK_MULTA}
    label="Multa"
    headline="O prazo que passou sem ninguém perceber vira multa automática."
    body="Renovação de licença, entrega de documento, prazo de defesa — quando o vencimento é descoberto depois de passar, a multa já não tem mais volta."
    icon={<ClockIcon color={TRACK_MULTA} size={190} />}
    giantIcon={<ClockIcon color={neutral.quasePreto} size={600} />}
    elbowLift={ELBOW_LIFT}
  />
);

export const AvaliaComplianceFechamento: React.FC = () => (
  <RotasFechamentoShell
    tracks={TRACKS_POST}
    eyebrowId="avalia-compliance"
    headline={
      <>
        Certificação, contrato e prazo. <span style={{fontWeight: 700}}>O risco que ninguém viu chega na conta certa.</span>
      </>
    }
    cta="Fale com a Norte no link da bio"
  />
);

export const avaliaComplianceCapaDefaultProps = {};
export const avaliaComplianceCertificacaoDefaultProps = {};
export const avaliaComplianceRaizDefaultProps = {};
export const avaliaComplianceJuridicoDefaultProps = {};
export const avaliaComplianceMultaDefaultProps = {};
export const avaliaComplianceFechamentoDefaultProps = {};
