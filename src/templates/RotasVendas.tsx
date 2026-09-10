import React from 'react';
import {RailTrack, shade} from '../lib/TrackRail';
import {GeometricDiagram} from '../lib/GeometricDiagram';
import {CounterIcon, DeliveryBagIcon} from '../lib/EditorialIcons';
import {productColors} from '../lib/themes';
import {
  computeTrackYs,
  RotasCapaShell,
  RotasFechamentoShell,
  TrackSlide,
} from '../lib/RotasKit';

/**
 * ROTAS — NTB Vendas (multiplicação do formato, 2026-09-05).
 *
 * 2 trilhas: Balcão (pedido presencial) e Delivery/entrega — o mesmo PDV
 * atende os 2 jeitos de vender sem duplicar estoque nem comanda. Cor-âncora
 * da peça: `productColors.vendas` (laranja, #f8a41a) — cada trilha usa um
 * tom da MESMA família (via `shade()`, já existente em TrackRail.tsx) em vez
 * de 2 hex sem relação, porque o briefing pediu esta peça na cor do produto
 * Vendas; a trilha nunca muda de cor entre slides (regra permanente do
 * formato), só entre trilhas dentro da mesma peça.
 *
 * RECHEIO DE CARD (regra do formato, variar por tipo de conteúdo):
 * - Balcão = CONCEITO/PROCESSO (pedido → preparo → pagamento no balcão) →
 *   `GeometricDiagram`.
 * - Delivery = OBJETO CONCRETO (a sacola que sai pra entrega) → ilustração
 *   original nova (`DeliveryBagIcon`, `EditorialIcons.tsx`).
 * Os 2 recheios são de tipos diferentes de propósito — mesmo com só 2
 * trilhas, a variação continua valendo.
 *
 * COMPOSIÇÃO BESPOKE (Rodada 12 — feedback do fundador: "tudo muito igual",
 * o formato Rotas não podia mais ser 1 componente genérico repetido 4x só
 * trocando cor). Como esta peça tem só 2 trilhas — a menor contagem das 4
 * — ela é a que mais sobra espaço pra ter mais personalidade sem poluir:
 * 1. Capa: os 2 post-its SE SOBREPÕEM parcialmente (rotação oposta,
 *    profundidade real via ordem de DOM) em vez da fileira lado a lado que
 *    as outras 3 peças usam — ver `cards` abaixo, x/y propositalmente
 *    próximos (overlap de ~110px) em vez de espaçados.
 * 2. Slides de trilha e Fechamento: o cotovelo que emoldura o bloco de
 *    texto vira uma CURVA suave em S (`elbowStyle="curve"`, novo em
 *    `TrackRail.tsx`) em vez do ângulo reto que Estoque/Avalia/
 *    Institucional usam — só 2 trilhas bem afastadas dão espaço de sobra
 *    pra essa curva mais expressiva sem esbarrar na trilha vizinha.
 */
// Cotovelo local (Rodada 11) mais LONGO que o das outras peças — só 2
// trilhas bem afastadas (y=378/972, ver `computeTrackYs(2)`), então há
// espaço de sobra pro desvio ser mais generoso sem esbarrar na trilha
// vizinha ou na borda do frame. Variação intencional de escala entre as 4
// peças, pedido explícito do fundador.
const ELBOW_LIFT_VENDAS = 190;

const BASE = productColors.vendas; // #f8a41a
const TRACK_BALCAO = BASE;
const TRACK_DELIVERY = shade(BASE, -0.32); // tom mais escuro da mesma família

const TRACKS: RailTrack[] = computeTrackYs(2).map((y, i) => ({
  y,
  color: i === 0 ? TRACK_BALCAO : TRACK_DELIVERY,
}));

export const VendasCapa: React.FC = () => (
  <RotasCapaShell
    tracks={TRACKS}
    eyebrow="NTB Vendas"
    annotationText="1 PDV, 2 portas de entrada"
    cards={[
      // Sobreposição parcial (Rodada 12): Balcão atrás (rotação negativa,
      // mais alto e à esquerda), Delivery na frente (rotação positiva,
      // deslocado ~110px pra baixo-direita) — cria profundidade real em vez
      // da fileira lado a lado que Estoque/Avalia/Institucional usam. A
      // ordem no array = ordem de empilhamento no DOM (Delivery por último
      // = por cima).
      {
        label: 'Balcão',
        caption: 'Pedido, preparo e pagamento na hora',
        color: TRACK_BALCAO,
        rotate: -7,
        x: 210,
        y: 10,
        width: 320,
        // Sobreposição parcial do Delivery começa em ~local x=260 (ver
        // cálculo no comentário do card Delivery abaixo) — captionMaxWidth
        // mantém a legenda inteira ANTES dessa coluna, corrigindo o bug real
        // achado no 1º render (legenda cortada no meio de "hora").
        captionMaxWidth: 210,
        children: <GeometricDiagram color={TRACK_BALCAO} width={220} />,
      },
      {
        label: 'Delivery',
        caption: 'Sai pra entrega sem duplicar comanda',
        color: TRACK_DELIVERY,
        rotate: 6,
        x: 470,
        y: 130,
        width: 320,
        children: <DeliveryBagIcon color={TRACK_DELIVERY} size={124} />,
      },
    ]}
    cardsAreaHeight={500}
    title={
      <>
        Um PDV. <span style={{fontWeight: 700}}>Dois jeitos</span> de vender.
      </>
    }
    subtitle="Balcão ou delivery — o NTB Vendas mantém estoque e comanda sincronizados, não importa a porta de entrada."
  />
);

export const VendasBalcao: React.FC = () => (
  <TrackSlide
    tracks={TRACKS}
    index={0}
    color={TRACK_BALCAO}
    label="Balcão"
    headline="O pedido nasce e morre na mesma tela."
    body="Pedido, preparo e pagamento acontecem no mesmo PDV — sem passar comanda pra planilha, sem contar de novo o que já saiu da cozinha."
    icon={<GeometricDiagram color={TRACK_BALCAO} width={200} />}
    giantIcon={<GeometricDiagram color={'#0a0a0a'} width={620} />}
    elbowLift={ELBOW_LIFT_VENDAS}
    elbowStyle="curve"
  />
);

export const VendasDelivery: React.FC = () => (
  <TrackSlide
    tracks={TRACKS}
    index={1}
    color={TRACK_DELIVERY}
    label="Delivery"
    headline="Cada sacola sai do mesmo estoque do balcão."
    body="Pedido de delivery baixa o mesmo estoque do pedido de balcão — em tempo real. Não existe 'estoque de app' separado do estoque de loja."
    icon={<DeliveryBagIcon color={TRACK_DELIVERY} size={150} />}
    giantIcon={<DeliveryBagIcon color={'#0a0a0a'} size={520} />}
    elbowLift={ELBOW_LIFT_VENDAS}
    elbowStyle="curve"
  />
);

export const VendasFechamento: React.FC = () => (
  <RotasFechamentoShell
    tracks={TRACKS}
    eyebrowId="vendas"
    headline={
      <>
        Balcão ou delivery. <span style={{fontWeight: 700}}>Um sistema só, sem confusão.</span>
      </>
    }
    cta="Fale com a Norte no link da bio"
  />
);

export const vendasCapaDefaultProps = {};
export const vendasBalcaoDefaultProps = {};
export const vendasDeliveryDefaultProps = {};
export const vendasFechamentoDefaultProps = {};
