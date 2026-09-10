import React from 'react';
import {RailTrack, shade} from '../lib/TrackRail';
import {GeometricDiagram} from '../lib/GeometricDiagram';
import {DocumentIcon} from '../lib/EditorialIcons';
import {MiniBarCompare} from '../lib/MiniChart';
import {brand} from '../lib/themes';
import {FONT_SERIF_ROTAS} from '../lib/fonts';
import {
  computeTrackYs,
  RotasCapaShell,
  RotasFechamentoShell,
  TrackSlide,
} from '../lib/RotasKit';

/**
 * ROTAS — Institucional/marca, tom EDUCACIONAL PURO (multiplicação do
 * formato, 2026-09-05). Ver `.claude/brand/voice.md`, "Voz aplicada a
 * conteúdo educacional": fala direto com o leitor ("você"), sem "nós", sem
 * menção a produto até o fechamento (aqui nem no fechamento — decisão
 * deliberada de fechar SEM CTA, o que a voz permite: "post educacional pode
 * fechar SEM CTA nenhum — é permitido soltar conteúdo de graça").
 *
 * 4 trilhas: 4 hábitos de quem decide com dado, não achismo — genéricos de
 * gestão, não citam nenhum produto NTB/Avalia. Cor-âncora: `brand.primary`
 * (índigo-violeta institucional, #6b71f2) — nenhuma cor de produto misturada
 * aqui, de propósito (peça institucional pura).
 *
 * RECHEIO DE CARD — as 4 trilhas cobrem os 4 tipos do repertório documentado
 * em CATALOGO.md (Rodada 6), incluindo o único que as peças anteriores nunca
 * usaram de verdade:
 * - Registra = CONCEITO/PROCESSO → `GeometricDiagram`.
 * - Mede = DADO/MÉTRICA → `MiniBarCompare`.
 * - Revisa = OBJETO CONCRETO → ilustração original (`DocumentIcon`,
 *   reaproveitado — mesmo estilo, funciona igual bem pra "checklist de
 *   revisão periódica" aqui quanto pra "avaliação de fornecedor" na peça
 *   Avalia; não é exclusividade de 1 peça só).
 * - Decide = HISTÓRIA/AFIRMAÇÃO DIRETA → SÓ FRASE, sem ícone pequeno no
 *   slide (regra do formato: esse tipo de recheio não leva elemento gráfico
 *   extra dentro do card). A marca d'água gigante de fundo (regra #4,
 *   continua obrigatória) usa uma aspa tipográfica enorme em vez de um
 *   ícone — combina com a natureza de "afirmação/citação" desse hábito.
 *
 * COMPOSIÇÃO BESPOKE (Rodada 12): 2 mudanças pedidas pelo fundador
 * especificamente pra esta peça (4 trilhas, tom educacional puro):
 * 1. Capa: os 4 post-its formam uma grade 2×2 (2 linhas de 2 cards) em vez
 *    da fileira apertada de 4 que as outras peças usam — com 4 cards, uma
 *    fileira fica visualmente espremida; a grade dá a cada card mais
 *    respiro.
 * 2. Fechamento: a citação final usa `headlineSize={64}` (contra o padrão
 *    50 de Vendas/Avalia) — o tom aqui é mais contemplativo/menos
 *    comercial que os outros 3 (fecha sem CTA nenhum), então a citação pode
 *    ocupar mais espaço em vez de dividir a atenção com uma chamada de ação.
 */
// Cotovelo local (Rodada 11) — BUG REAL achado no QA visual desta rodada:
// um valor menor (130px, primeira tentativa, pensada pra "caber" no
// espaçamento mais apertado das 4 trilhas) NÃO limpa a altura do bloco de
// texto quando o headline quebra em 2 linhas (`InstitucionalRegistra`) ou
// quando o cotovelo sobe (direção -1) e a `Overline` do label fica bem
// perto do topo do bloco (`InstitucionalDecide`, sem ícone) — a linha
// cortava literalmente por cima do rótulo, achado comparando o PNG
// renderizado com a referência, não só olhando o código. 195px é o menor
// valor que sobra margem segura pro pior caso (headline 2 linhas + body 3
// linhas, ~176px de metade de altura) sem tocar a `homeY` da trilha vizinha
// (distância mínima entre trilhas adjacentes aqui é 324px). As 4 peças
// seguem com 4 valores diferentes de `elbowLift` (Estoque 150, Vendas 190,
// Avalia 165, Institucional 195) — a correção de segurança feita aqui não
// elimina a variação de escala pedida pelo fundador, só corrige o valor que
// estava errado.
const ELBOW_LIFT_INSTITUCIONAL = 195;

const BASE = brand.primary; // #6b71f2
const TRACK_REGISTRA = BASE;
const TRACK_MEDE = shade(BASE, 0.22);
const TRACK_REVISA = shade(BASE, -0.22);
const TRACK_DECIDE = shade(BASE, -0.4);

const TRACKS: RailTrack[] = computeTrackYs(4).map((y, i) => ({
  y,
  color: [TRACK_REGISTRA, TRACK_MEDE, TRACK_REVISA, TRACK_DECIDE][i],
}));

const GiantQuote: React.FC<{color: string; size?: number}> = ({color, size = 640}) => (
  <div
    style={{
      fontFamily: FONT_SERIF_ROTAS,
      fontStyle: 'italic',
      fontWeight: 700,
      fontSize: size,
      lineHeight: 1,
      color,
    }}
  >
    &ldquo;
  </div>
);

export const InstitucionalCapa: React.FC = () => (
  <RotasCapaShell
    tracks={TRACKS}
    eyebrow="Norte Para Negócios"
    annotationText="4 hábitos, nenhum é sobre sistema"
    // Grade 2×2 (Rodada 12) em vez da fileira apertada de 4 — 2 linhas de 2
    // cards, cada um mais largo (300 vs. 220), dá respiro real a cada card
    // em vez de espremer 4 lado a lado. cardsAreaHeight cresceu de 380→610
    // pra acomodar a 2ª linha.
    cardsAreaHeight={610}
    cards={[
      {
        label: 'Registra',
        caption: 'Não confia na memória',
        color: TRACK_REGISTRA,
        rotate: -5,
        x: 0,
        y: 10,
        width: 300,
        children: <GeometricDiagram color={TRACK_REGISTRA} width={190} />,
      },
      {
        label: 'Mede',
        caption: 'Decide com dado, não achismo',
        color: TRACK_MEDE,
        rotate: 4,
        x: 470,
        y: 40,
        width: 300,
        children: <MiniBarCompare color={TRACK_MEDE} labelTop="Com dado" labelBottom="No achismo" width={190} />,
      },
      {
        label: 'Revisa',
        caption: 'O que não vê todo dia',
        color: TRACK_REVISA,
        rotate: -3,
        x: 20,
        y: 330,
        width: 300,
        children: <DocumentIcon color={TRACK_REVISA} size={110} />,
      },
      {
        label: 'Decide',
        caption: 'Com prazo, não com pressa',
        color: TRACK_DECIDE,
        rotate: 5,
        x: 490,
        y: 300,
        width: 300,
        children: <GiantQuote color={TRACK_DECIDE} size={100} />,
      },
    ]}
    title={
      <>
        Quatro hábitos de quem decide <span style={{fontWeight: 700}}>com dado, não com achismo.</span>
      </>
    }
    subtitle="Nenhum aqui é sobre um sistema. É sobre como gestão de estoque de verdade funciona no dia a dia."
  />
);

export const InstitucionalRegistra: React.FC = () => (
  <TrackSlide
    tracks={TRACKS}
    index={0}
    color={TRACK_REGISTRA}
    label="Hábito 1 · Registra"
    headline="A memória esquece. O registro, não."
    body="Contagem de cabeça, combinado verbal, 'depois eu anoto' — é assim que o estoque real se desconecta do estoque que você acha que tem."
    icon={<GeometricDiagram color={TRACK_REGISTRA} width={200} />}
    giantIcon={<GeometricDiagram color={'#0a0a0a'} width={620} />}
    elbowLift={ELBOW_LIFT_INSTITUCIONAL}
  />
);

export const InstitucionalMede: React.FC = () => (
  <TrackSlide
    tracks={TRACKS}
    index={1}
    color={TRACK_MEDE}
    label="Hábito 2 · Mede"
    headline="Achismo custa caro em silêncio."
    body="'Acho que vende bem' não é dado. Antes de decidir comprar mais, contratar mais ou cortar um produto, mede — o número corrige o achismo antes dele virar prejuízo."
    icon={<MiniBarCompare color={TRACK_MEDE} labelTop="Com dado" labelBottom="No achismo" width={190} />}
    giantIcon={<MiniBarCompare color={'#0a0a0a'} labelTop="Com dado" labelBottom="No achismo" width={560} />}
    elbowLift={ELBOW_LIFT_INSTITUCIONAL}
  />
);

export const InstitucionalRevisa: React.FC = () => (
  <TrackSlide
    tracks={TRACKS}
    index={2}
    color={TRACK_REVISA}
    label="Hábito 3 · Revisa"
    headline="O que ninguém olha é onde o problema mora."
    body="Ruptura, validade vencida, fornecedor atrasando — quase sempre já estava visível há semanas. Uma revisão periódica pega isso antes do cliente pegar primeiro."
    icon={<DocumentIcon color={TRACK_REVISA} size={150} />}
    giantIcon={<DocumentIcon color={'#0a0a0a'} size={520} />}
    elbowLift={ELBOW_LIFT_INSTITUCIONAL}
  />
);

export const InstitucionalDecide: React.FC = () => (
  <TrackSlide
    tracks={TRACKS}
    index={3}
    color={TRACK_DECIDE}
    label="Hábito 4 · Decide"
    headline="Decisão com prazo. Nunca decisão com pressa."
    body="Prazo força você a olhar o dado antes de decidir. Pressa força você a decidir sem olhar nada. São 2 coisas diferentes, mesmo parecendo a mesma urgência."
    giantIcon={<GiantQuote color="#0a0a0a" size={760} />}
    elbowLift={ELBOW_LIFT_INSTITUCIONAL}
  />
);

export const InstitucionalFechamento: React.FC = () => (
  <RotasFechamentoShell
    tracks={TRACKS}
    eyebrowId="institucional"
    // headlineSize maior (Rodada 12) — tom mais contemplativo, sem CTA,
    // então a citação final pode ocupar mais espaço em vez de dividir a
    // atenção com uma chamada de ação (ver comentário de topo do arquivo).
    headlineSize={64}
    headline={
      <>
        Nenhum hábito aqui depende de sistema nenhum. <span style={{fontWeight: 700}}>Só de repetir.</span>
      </>
    }
  />
);

export const institucionalCapaDefaultProps = {};
export const institucionalRegistraDefaultProps = {};
export const institucionalMedeDefaultProps = {};
export const institucionalRevisaDefaultProps = {};
export const institucionalDecideDefaultProps = {};
export const institucionalFechamentoDefaultProps = {};
