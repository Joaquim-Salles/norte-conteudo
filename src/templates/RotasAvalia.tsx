import React from 'react';
import {RailTrack, shade} from '../lib/TrackRail';
import {GeometricDiagram} from '../lib/GeometricDiagram';
import {DocumentIcon} from '../lib/EditorialIcons';
import {MiniBarCompare} from '../lib/MiniChart';
import {productColors} from '../lib/themes';
import {
  computeTrackYs,
  RotasCapaShell,
  RotasFechamentoShell,
  TrackSlide,
} from '../lib/RotasKit';

/**
 * ROTAS — Norte Avalia (multiplicação do formato, 2026-09-05).
 *
 * 3 trilhas: 3 momentos em que um diagnóstico bem feito evita um erro caro —
 * Contratação, Processo interno, Fornecedor. Cor-âncora: `productColors.avalia`
 * (índigo, #484db5); cada trilha é um tom da mesma família via `shade()`
 * (mesma decisão de paleta da peça Vendas — ver comentário lá).
 *
 * RECHEIO DE CARD:
 * - Contratação = CONCEITO/PROCESSO (triagem → entrevista → decisão) →
 *   `GeometricDiagram`.
 * - Processo interno = DADO/MÉTRICA (tempo perdido corrigindo depois vs.
 *   corrigindo antes) → `MiniBarCompare`.
 * - Fornecedor = OBJETO CONCRETO (a prancheta de avaliação) → ilustração
 *   original nova (`DocumentIcon`).
 * Os 3 tipos de recheio são diferentes entre si (mesma regra da peça
 * original do NTB Estoque).
 *
 * COMPOSIÇÃO BESPOKE (Rodada 12): as 3 trilhas usam `contentLayout=
 * "side-by-side"` (novo em `RotasKit.tsx`) — headline à ESQUERDA, corpo à
 * DIREITA, lado a lado, em vez do empilhamento headline-em-cima/corpo-
 * embaixo que Estoque/Vendas/Institucional usam. Pedido do fundador: o
 * bloco de conteúdo desta peça não podia ser visualmente idêntico ao
 * empilhamento das outras — Avalia é a peça sobre DIAGNÓSTICO/COMPARAÇÃO
 * (título curto e direto vs. explicação), então o lado a lado reforça essa
 * leitura ("a afirmação" | "o porquê") melhor que o empilhamento faria.
 */
// Cotovelo local (Rodada 11) — 2º BUG REAL achado no QA visual (mesmo
// padrão do bug corrigido em RotasInstitucional.tsx): 165px não limpava a
// altura do bloco em `AvaliaFornecedor` (headline de 2 linhas + body de 3
// linhas, ~176px de metade de altura) — a linha cortava por cima do rótulo
// "FORNECEDOR". Subido pra 195px (mesma margem de segurança usada em
// Institucional), que ainda cabe sem tocar a `homeY` da trilha vizinha
// (distância mínima entre trilhas adjacentes aqui é 405px).
const ELBOW_LIFT_AVALIA = 195;

const BASE = productColors.avalia; // #484db5
const TRACK_CONTRATACAO = BASE;
const TRACK_PROCESSO = shade(BASE, 0.28); // tom mais claro
const TRACK_FORNECEDOR = shade(BASE, -0.3); // tom mais escuro

const TRACKS: RailTrack[] = computeTrackYs(3).map((y, i) => ({
  y,
  color: [TRACK_CONTRATACAO, TRACK_PROCESSO, TRACK_FORNECEDOR][i],
}));

export const AvaliaCapa: React.FC = () => (
  <RotasCapaShell
    tracks={TRACKS}
    eyebrow="Norte Avalia"
    annotationText="3 decisões, 1 diagnóstico antes"
    cards={[
      {
        label: 'Contratação',
        caption: 'Antes de assinar, avalia',
        color: TRACK_CONTRATACAO,
        rotate: -5,
        x: 20,
        y: 40,
        children: <GeometricDiagram color={TRACK_CONTRATACAO} width={220} />,
      },
      {
        label: 'Processo',
        caption: 'Antes de escalar, mede',
        color: TRACK_PROCESSO,
        rotate: 3,
        x: 382,
        y: 4,
        children: <MiniBarCompare color={TRACK_PROCESSO} labelTop="Corrige antes" labelBottom="Corrige depois" width={210} />,
      },
      {
        label: 'Fornecedor',
        caption: 'Antes de fechar, checa',
        color: TRACK_FORNECEDOR,
        rotate: -2,
        x: 734,
        y: 56,
        children: <DocumentIcon color={TRACK_FORNECEDOR} size={110} />,
      },
    ]}
    title={
      <>
        Um diagnóstico. <span style={{fontWeight: 700}}>Três erros caros</span> evitados.
      </>
    }
    subtitle="Contratação, processo interno ou fornecedor novo — o Norte Avalia mostra o risco antes de ele custar caro."
  />
);

export const AvaliaContratacao: React.FC = () => (
  <TrackSlide
    tracks={TRACKS}
    index={0}
    color={TRACK_CONTRATACAO}
    label="Contratação"
    headline="A pessoa errada custa mais que a vaga aberta."
    body="Triagem, entrevista e decisão viram 1 processo comparável — não 3 impressões soltas de 3 pessoas diferentes na sala."
    icon={<GeometricDiagram color={TRACK_CONTRATACAO} width={200} />}
    giantIcon={<GeometricDiagram color={'#0a0a0a'} width={620} />}
    elbowLift={ELBOW_LIFT_AVALIA}
    contentLayout="side-by-side"
  />
);

export const AvaliaProcesso: React.FC = () => (
  <TrackSlide
    tracks={TRACKS}
    index={1}
    color={TRACK_PROCESSO}
    label="Processo"
    headline="O erro que se repete é o mais barato de corrigir."
    body="Medir antes de escalar mostra onde o processo trava — enquanto ainda é 1 ajuste pequeno, não uma correção de rota cara depois."
    icon={<MiniBarCompare color={TRACK_PROCESSO} labelTop="Corrige antes" labelBottom="Corrige depois" width={190} />}
    giantIcon={<MiniBarCompare color={'#0a0a0a'} labelTop="Corrige antes" labelBottom="Corrige depois" width={560} />}
    elbowLift={ELBOW_LIFT_AVALIA}
    contentLayout="side-by-side"
  />
);

export const AvaliaFornecedor: React.FC = () => (
  <TrackSlide
    tracks={TRACKS}
    index={2}
    color={TRACK_FORNECEDOR}
    label="Fornecedor"
    headline="Fornecedor novo é risco não testado."
    body="Uma checklist de avaliação antes do primeiro pedido grande custa 1 tarde. Descobrir o problema depois do contrato assinado custa muito mais."
    icon={<DocumentIcon color={TRACK_FORNECEDOR} size={150} />}
    giantIcon={<DocumentIcon color={'#0a0a0a'} size={520} />}
    elbowLift={ELBOW_LIFT_AVALIA}
    contentLayout="side-by-side"
  />
);

export const AvaliaFechamento: React.FC = () => (
  <RotasFechamentoShell
    tracks={TRACKS}
    eyebrowId="avalia"
    headline={
      <>
        Não importa a decisão. <span style={{fontWeight: 700}}>Avaliar antes sempre sai mais barato.</span>
      </>
    }
    cta="Fale com a Norte no link da bio"
  />
);

export const avaliaCapaDefaultProps = {};
export const avaliaContratacaoDefaultProps = {};
export const avaliaProcessoDefaultProps = {};
export const avaliaFornecedorDefaultProps = {};
export const avaliaFechamentoDefaultProps = {};
