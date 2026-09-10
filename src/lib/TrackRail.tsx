import React from 'react';

/**
 * TrackRail — a assinatura visual do formato "Rotas" (2026-09-05, reescrito
 * na Rodada 8 pra corrigir um ERRO DE EIXO real).
 *
 * ERRO DE EIXO (diagnóstico, 2026-09-05): até a Rodada 7, toda a lógica de
 * continuidade deste componente testava a costura TOPO↔BASE entre slides
 * (empilhando os PNGs verticalmente, um em cima do outro). Isso está errado
 * na raiz: um carrossel de Instagram passa de LADO PRA LADO (swipe
 * horizontal) — quando o usuário arrasta, o slide seguinte entra pela
 * DIREITA, nunca por baixo. A costura que realmente importa é BORDA DIREITA
 * do slide N ↔ BORDA ESQUERDA do slide N+1, na MESMA altura Y — não
 * topo↔base. As linhas puramente verticais da versão antiga (entram por
 * cima do frame, saem por baixo) nunca poderiam parecer conectadas no
 * Instagram de verdade, não importa quão bem alinhadas estivessem
 * verticalmente, porque o usuário nunca vê o topo de um slide colado na
 * base do outro.
 *
 * ARQUITETURA NOVA: cada trilha tem uma única `homeY` (altura fixa) que é
 * ao mesmo tempo o ponto de ENTRADA na borda esquerda e o ponto de SAÍDA na
 * borda direita de TODO slide onde ela não converge — isso garante, por
 * construção, que a saída do slide N bate exatamente com a entrada do
 * slide N+1 (mesma trilha = mesma homeY em todo lugar, nunca precisa
 * "sincronizar" dois valores manualmente). TODAS as trilhas — ativa ou não —
 * são retas na sua própria homeY do início ao fim do slide (Rodada 9: o
 * cotovelo que desviava a trilha ativa pro centro do frame foi removido —
 * ele fazia as 3 trilhas convergirem visualmente pro mesmo lugar sempre que
 * ativas, já que o conteúdo ficava sempre centralizado. Agora é o CONTEÚDO
 * que se posiciona na altura da própria trilha — ver `TrackSlide` em
 * Rotas.tsx — então cada trilha ocupa uma faixa própria e clara da altura
 * do frame, como grampos empilhados em profundidades diferentes).
 *
 * `tracks`: 1 entrada por trilha do carrossel inteiro (cor + `y`, a altura
 * fixa de entrada/saída dessa trilha em TODOS os slides).
 * `activeIndex`: null (capa/fechamento — todas em repouso) ou o índice da
 * trilha "dona" do slide atual (fica grossa, brilhante, com dormentes; as
 * outras ficam finas e apagadas — mas SEMPRE presentes, todas retas).
 * `converge`: true no fechamento — as 3 trilhas ENTRAM pela borda esquerda
 * na sua homeY (a mesma altura em que saíram do slide anterior) e SÓ ENTÃO
 * convergem, dentro do próprio slide, pra um único ponto em
 * (CONVERGE_X, CONVERGE_Y).
 */
export type RailTrack = {color: string; y: number};

const WIDTH = 1080;
const HEIGHT = 1350;

/**
 * Ponto de convergência real do fechamento — em X e Y, dentro do frame
 * visível. Exportado pra o slide de Fechamento posicionar o Mascote
 * EXATAMENTE aqui, não num valor aproximado.
 */
export const CONVERGE_X = WIDTH * 0.56;
export const CONVERGE_Y = HEIGHT * 0.62;

/**
 * Escurece OU clareia um hex #rrggbb em `amount` (0-1, negativo clareia).
 * Usado pelo slide que HOSPEDA a trilha ativa: em vez de mudar a cor da
 * LINHA (o que o fundador rejeitou explicitamente — "era pra manter uma cor
 * entre eles" — a linha tem que ser o MESMO hex em toda peça, capa incluída),
 * quem muda agora é o FUNDO daquele slide especifico: um tom levemente mais
 * escuro da própria cor da trilha, pra criar contraste natural sem a linha
 * nunca deixar de ser, literalmente, `track.color`.
 */
export function shade(hex: string, amount: number): string {
  const m = /^#([0-9a-fA-F]{6})$/.exec(hex);
  if (!m) return hex;
  const n = parseInt(m[1], 16);
  const channel = (shift: number) => {
    const c = (n >> shift) & 0xff;
    return amount >= 0
      ? Math.round(c * (1 - amount))
      : Math.round(c + (255 - c) * -amount);
  };
  const r = channel(16);
  const g = channel(8);
  const b = channel(0);
  return `#${[r, g, b].map((c) => c.toString(16).padStart(2, '0')).join('')}`;
}

const EDGE_MARGIN = 30;

type TickPoint = {x: number; y: number; vertical: boolean};

/**
 * Zona LOCAL a contornar — o retângulo [x1, x2] (tipicamente a largura do
 * bloco de texto `TornBlock` daquele slide) que a trilha ativa precisa
 * emoldurar em vez de atravessar reta por trás dele. `lift` é a distância
 * (px) que a trilha se afasta da própria `homeY`; `direction` é 1 (desce)
 * ou -1 (sobe) — quem decide a direção é `TrackSlide`, que escolhe o lado
 * com mais espaço livre até a borda do frame pra nunca cortar o frame.
 */
export type ElbowSpec = {
  x1: number;
  x2: number;
  lift: number;
  direction?: 1 | -1;
  /**
   * Rodada 12 (composição bespoke por peça): quando `true`, o desvio local
   * vira uma curva suave em S (bezier) em vez do cotovelo em ângulo reto.
   * Usado só por `RotasVendas.tsx` — pedido explícito do fundador de dar
   * mais personalidade à peça de 2 trilhas ("já que são só 2, dá pra ter
   * mais personalidade sem poluir"). O ângulo reto continua sendo o padrão
   * do formato (Estoque/Avalia/Institucional) — a curva é uma variação
   * pontual, não substitui a regra geral.
   */
  curve?: boolean;
  /**
   * Rodada 14 (expansão do repertório — 3 novos tipos de linha, pedido do
   * fundador via coordenador, 2026-09-05): quando `true`, o desvio vira uma
   * CURVA SOLTA/ORGÂNICA em vez do cotovelo reto (`curve` acima) ou do
   * S-curve geométrico e simétrico. Diferença chave pro `curve`: aquele é
   * SIMÉTRICO (2 beziers espelhadas, mesma amplitude/proporção pra subida e
   * descida) — geometricamente "desenhado à régua". Este é ASSIMÉTRICO de
   * propósito (subida mais larga e suave, descida mais rápida, com um
   * pequeno "overshoot" no topo da curva) — para de propósito NÃO parecer
   * espelhado, como uma curva feita à mão livre com uma régua flexível
   * (french curve), mas SEM jitter/tremor senoidal (isso já foi rejeitado
   * no v1 antigo, ver EditorialIcons.tsx). Pra tom de conteúdo mais
   * leve/humano/reflexivo — usado em `RotasAvaliaRenovacao.tsx`.
   */
  organic?: boolean;
};

/**
 * Rodada 14 — LINHA RAMIFICADA ("branching"): uma trilha entra pela borda
 * esquerda como uma linha ÚNICA (2 trilhas sobrepostas na mesma altura,
 * `trunkY`) e, a partir de `splitX`, se DIVIDE em 2 curvas que terminam em
 * 2 alturas diferentes na borda direita — cada uma virando a `homeY` de uma
 * trilha própria a partir do slide seguinte. Pesquisa (2026-09-05, feed
 * @claudeai): não achei um carrossel novo com ramificação explícita nas
 * últimas publicações puxadas além do "Campus Ambassador" já documentado
 * (onde "Follow your track" se divide em 3 antes de cada card, só na CAPA);
 * a adaptação pedida aqui — dividir uma linha em 2 no MEIO do carrossel,
 * não só na capa — é extensão nossa da mesma ideia visual, não cópia de um
 * exemplo novo encontrado.
 *
 * QUANDO USAR: conteúdo tipo "isso gera 2 consequências" — uma causa raiz
 * que se desdobra em 2 efeitos distintos. Usado em `Rotas.tsx`
 * (`RotasEstoquePerda.tsx`): a causa raiz ("descontrole na entrada") se
 * ramifica em "quebra de embalagem" e "contagem errada".
 *
 * COMO FUNCIONA: as 2 trilhas de destino (`trackIndices`) devem ter, no
 * slide da ramificação, o MESMO `y` em `tracks` (o `trunkY` compartilhado —
 * elas ainda não se separaram). O slide da ramificação recebe também
 * `toY`, as 2 alturas finais que cada trilha assume dali em diante — essas
 * DEVEM bater exatamente com o `y` que a peça usa pra essas 2 trilhas nos
 * slides SEGUINTES (garante a continuidade esquerda↔direita por
 * construção, mesma lógica de `homeY` do resto do componente). Antes de
 * `splitX` as 2 trilhas são desenhadas com um pequeno offset vertical (±3px)
 * uma da outra — ainda LEGÍVEL como 2 cores distintas sobrepostas, não uma
 * mistura ilegível — reforçando "ainda não separadas, mas já são 2".
 */
export type BranchSpec = {
  trackIndices: [number, number];
  splitX: number;
  toY: [number, number];
};

/**
 * Rodada 14 — "PASSAGEM DE BASTÃO" (baton pass): a trilha ATIVA de um slide
 * não retorna pra própria `homeY` antes da borda direita — em vez disso,
 * ela deriva num rampa suave até a `homeY` da PRÓXIMA trilha (a próxima
 * cor), terminando ali. A trilha seguinte então começa, na borda ESQUERDA
 * do PRÓXIMO slide, exatamente nessa altura — "recebendo o bastão".
 *
 * EXCEÇÃO DELIBERADA ao invariante "a linha nunca muda de cor" (ver
 * formato-rotas.md): essa é a ÚNICA situação do formato em que a COR muda
 * exatamente na costura entre 2 slides — não porque a trilha mudou de cor,
 * mas porque uma trilha literalmente ENTREGA pra outra. Usar só quando fizer
 * sentido narrativo de verdade (uma etapa que entrega pra próxima), nunca
 * como troca de cor arbitrária.
 *
 * QUANDO USAR: uma etapa que entrega pra próxima de forma sequencial/causal
 * — não paralela. Usado em `RotasAvaliaRenovacao.tsx`: a trilha "o contrato
 * que você assinou" entrega pra "o fornecedor que você tem hoje".
 */
export type BatonSpec = {
  /** Altura (Y) de onde a trilha ATUAL sai, ao entregar. */
  exitY: number;
};

/**
 * Trilha ATIVA: reta na sua PRÓPRIA homeY do início ao fim do slide — SEM
 * cotovelo GLOBAL forçado pro centro do frame (isso continua banido, ver
 * histórico abaixo) — mas COM cotovelo LOCAL opcional (`elbow`), que desvia
 * a trilha só o suficiente pra abraçar a borda esquerda do bloco de texto,
 * atravessar por cima/baixo dele, e voltar pra homeY antes da borda direita
 * do frame.
 *
 * DIAGNÓSTICO (Rodada 11, comparação direta com a referência real "The
 * Claude Campus Ambassador program is back", @claudeai): a referência faz
 * a linha cotovelar em ângulo reto EXATAMENTE pra emoldurar o bloco de
 * texto daquele slide — sobe, atravessa, desce (ou o inverso), sempre em
 * relação à PRÓPRIA altura da trilha, nunca em relação ao centro do frame.
 * Isso é uma coisa DIFERENTE do erro da Rodada 9 (cotovelo GLOBAL, que
 * desviava as 3 trilhas pro mesmo ponto fixo no centro do frame e as fazia
 * parecer amontoadas) — aqui cada trilha continua na sua PRÓPRIA faixa de
 * altura, só que localmente ela sai da faixa por um instante pra desenhar
 * um contorno ao redor do conteúdo que já mora ali.
 *
 * HISTÓRICO (Rodada 9, preservado): a versão anterior fazia a trilha ativa
 * "visitar" um ponto fixo no CENTRO do frame pra cruzar o bloco de
 * conteúdo — como o conteúdo ficava sempre centralizado verticalmente, as
 * 3 trilhas (em homeY bem diferentes: 270, 675, 1080) todas convergiam
 * visualmente pro mesmo lugar quando ativas, criando a sensação de "tudo
 * bunching no meio, sem diferença real entre elas". A correção da Rodada 9
 * (conteúdo se posiciona na altura da própria trilha) continua valendo —
 * o cotovelo local desta rodada não muda isso, só adiciona o contorno.
 */
function buildActivePath(homeY: number, elbow?: ElbowSpec): {d: string; ticks: TickPoint[]} {
  const ticks: TickPoint[] = [];

  if (!elbow) {
    const d = `M 0 ${homeY} L ${WIDTH} ${homeY}`;
    for (let x = EDGE_MARGIN; x <= WIDTH - EDGE_MARGIN; x += (WIDTH - 2 * EDGE_MARGIN) / 12) {
      ticks.push({x, y: homeY, vertical: true});
    }
    return {d, ticks};
  }

  const dir = elbow.direction ?? 1;
  const liftY = homeY + dir * elbow.lift;
  const HUG_GAP = 22; // distância entre a linha levantada e a borda do bloco — "rente", não colada
  const preX = Math.max(EDGE_MARGIN, elbow.x1 - HUG_GAP);
  const postX = Math.min(WIDTH - EDGE_MARGIN, elbow.x2 + HUG_GAP);

  if (elbow.curve) {
    // Curva em S (2 beziers cúbicas) em vez do cotovelo reto — mesmos pontos
    // de referência (preX/postX/liftY), só a transição entre homeY e liftY
    // vira suave em vez de ângulo de 90°. Usada só pela peça Vendas (2
    // trilhas, mais espaço pra uma curva generosa sem esbarrar na vizinha).
    // BUG REAL achado no QA visual (Rodada 12): com riseSpan = span*0.32, o
    // trecho de subida (2×riseSpan) + descida (2×riseSpan) = 1.28×span, MAIOR
    // que o espaço disponível entre preX e postX — o "platô" ficava negativo
    // e a curva se autointerceptava, criando um "X" visível sobre o ícone
    // (confirmado no PNG renderizado de VendasDelivery, não só no código).
    // 0.2 garante 4×riseSpan = 0.8×span, sobrando 20% de platô real.
    const riseSpan = (postX - preX) * 0.2;
    const d = [
      `M 0 ${homeY}`,
      `L ${preX} ${homeY}`,
      `C ${preX + riseSpan} ${homeY}, ${preX + riseSpan} ${liftY}, ${preX + riseSpan * 2} ${liftY}`,
      `L ${postX - riseSpan * 2} ${liftY}`,
      `C ${postX - riseSpan} ${liftY}, ${postX - riseSpan} ${homeY}, ${postX} ${homeY}`,
      `L ${WIDTH} ${homeY}`,
    ].join(' ');
    const STEP = (WIDTH - 2 * EDGE_MARGIN) / 12;
    for (let x = EDGE_MARGIN; x <= preX - STEP / 2; x += STEP) {
      ticks.push({x, y: homeY, vertical: true});
    }
    for (let x = postX + STEP / 2; x <= WIDTH - EDGE_MARGIN; x += STEP) {
      ticks.push({x, y: homeY, vertical: true});
    }
    // Ticks do trecho curvo ficam só no platô (onde a curva já é horizontal
    // de novo, em liftY) — nas transições em si eles ficariam fora do traço.
    const plateauStart = preX + riseSpan * 2;
    const plateauEnd = postX - riseSpan * 2;
    const plateauStep = (plateauEnd - plateauStart) / 3;
    for (let x = plateauStart + plateauStep / 2; x < plateauEnd; x += plateauStep) {
      ticks.push({x, y: liftY, vertical: true});
    }
    return {d, ticks};
  }

  if (elbow.organic) {
    // Curva solta/orgânica (Rodada 14) — ASSIMÉTRICA de propósito (subida
    // larga e suave 0.34×span, descida mais rápida 0.20×span, pequeno
    // overshoot de 10px além do `lift` no topo da curva) — é isso que
    // impede o resultado de parecer o S-curve espelhado/geométrico
    // (`elbow.curve`). Frações escolhidas com margem de segurança (0.34 +
    // 0.20 = 0.54×span, sobra 46% de espaço pro platô/hump central) —
    // mesmo tipo de cuidado que corrigiu o bug real do platô negativo do
    // `curve` na Rodada 12, aplicado aqui preventivamente.
    const span = postX - preX;
    const upSpan = span * 0.34;
    const downSpan = span * 0.2;
    const overshootY = liftY + dir * 10;
    const midX = preX + upSpan + (span - upSpan - downSpan) * 0.5;
    const d = [
      `M 0 ${homeY}`,
      `L ${preX} ${homeY}`,
      `C ${preX + upSpan * 0.5} ${homeY}, ${preX + upSpan * 0.85} ${liftY}, ${preX + upSpan} ${liftY}`,
      `Q ${midX} ${overshootY}, ${postX - downSpan} ${liftY}`,
      `C ${postX - downSpan * 0.5} ${liftY}, ${postX - downSpan * 0.15} ${homeY}, ${postX} ${homeY}`,
      `L ${WIDTH} ${homeY}`,
    ].join(' ');
    const STEP = (WIDTH - 2 * EDGE_MARGIN) / 12;
    for (let x = EDGE_MARGIN; x <= preX - STEP / 2; x += STEP) {
      ticks.push({x, y: homeY, vertical: true});
    }
    for (let x = postX + STEP / 2; x <= WIDTH - EDGE_MARGIN; x += STEP) {
      ticks.push({x, y: homeY, vertical: true});
    }
    // 2 dormentes no platô do hump (onde a curva já está perto de `liftY`) —
    // igual espírito do `curve`, evita "linha nua" no trecho levantado.
    const plateauStart = preX + upSpan;
    const plateauEnd = postX - downSpan;
    const plateauStep = (plateauEnd - plateauStart) / 3;
    for (let x = plateauStart + plateauStep / 2; x < plateauEnd; x += plateauStep) {
      ticks.push({x, y: liftY, vertical: true});
    }
    return {d, ticks};
  }

  const d = [
    `M 0 ${homeY}`,
    `L ${preX} ${homeY}`,
    `L ${preX} ${liftY}`,
    `L ${postX} ${liftY}`,
    `L ${postX} ${homeY}`,
    `L ${WIDTH} ${homeY}`,
  ].join(' ');

  // Dormentes (ticks) só nos trechos retos, antes/depois do cotovelo — não
  // dentro dele, pra não competir visualmente com o bloco de texto que o
  // cotovelo está emoldurando.
  const STEP = (WIDTH - 2 * EDGE_MARGIN) / 12;
  for (let x = EDGE_MARGIN; x <= preX - STEP / 2; x += STEP) {
    ticks.push({x, y: homeY, vertical: true});
  }
  for (let x = postX + STEP / 2; x <= WIDTH - EDGE_MARGIN; x += STEP) {
    ticks.push({x, y: homeY, vertical: true});
  }
  // 2-3 dormentes no trecho levantado, pra ele não ficar "linha nua" —
  // reforça a leitura de que é a MESMA trilha, só desviada.
  const raisedSpan = postX - preX;
  const raisedStep = raisedSpan / 3;
  for (let x = preX + raisedStep / 2; x < postX; x += raisedStep) {
    ticks.push({x, y: liftY, vertical: true});
  }

  return {d, ticks};
}

/**
 * Rodada 14 — constrói os 2 ramos de uma trilha ramificada (ver `BranchSpec`
 * acima). `sideOffset` (±3px) separa visualmente os 2 traços no trecho ANTES
 * do split, onde as 2 trilhas ainda estão "juntas" (mesma `trunkY`) — sem o
 * offset, uma cor cobriria totalmente a outra e pareceria 1 trilha só, não 2
 * que ainda não se separaram.
 */
function buildBranchPath(trunkY: number, splitX: number, finalY: number, sideOffset: number): {d: string; ticks: TickPoint[]} {
  const ticks: TickPoint[] = [];
  const y0 = trunkY + sideOffset;
  const cp1x = splitX + (WIDTH - splitX) * 0.42;
  const cp2x = splitX + (WIDTH - splitX) * 0.8;
  const d = [`M 0 ${y0}`, `L ${splitX} ${y0}`, `C ${cp1x} ${y0}, ${cp2x} ${finalY}, ${WIDTH} ${finalY}`].join(' ');
  const STEP = (splitX - EDGE_MARGIN) / 6;
  for (let x = EDGE_MARGIN; x <= splitX - STEP / 2; x += STEP) {
    ticks.push({x, y: y0, vertical: true});
  }
  ticks.push({x: WIDTH - EDGE_MARGIN, y: finalY, vertical: true});
  return {d, ticks};
}

/**
 * Rodada 14 — rampa de "passagem de bastão" (ver `BatonSpec` acima): a
 * trilha ativa sai da própria `homeY`, opcionalmente emoldura o bloco de
 * texto com o cotovelo local de sempre (`elbow`), mas em vez de voltar pra
 * `homeY` antes da borda direita, deriva numa rampa suave até `exitY` (a
 * `homeY` da PRÓXIMA trilha) — "entrega o bastão" ali.
 */
function buildBatonPath(homeY: number, exitY: number, elbow?: ElbowSpec): {d: string; ticks: TickPoint[]} {
  const ticks: TickPoint[] = [];
  const RAMP_START = WIDTH * 0.74;
  const cp1x = RAMP_START + (WIDTH - RAMP_START) * 0.5;
  const cp2x = RAMP_START + (WIDTH - RAMP_START) * 0.85;

  if (!elbow) {
    const d = [`M 0 ${homeY}`, `L ${RAMP_START} ${homeY}`, `C ${cp1x} ${homeY}, ${cp2x} ${exitY}, ${WIDTH} ${exitY}`].join(' ');
    const STEP = (RAMP_START - EDGE_MARGIN) / 10;
    for (let x = EDGE_MARGIN; x <= RAMP_START - STEP / 2; x += STEP) {
      ticks.push({x, y: homeY, vertical: true});
    }
    return {d, ticks};
  }

  const dir = elbow.direction ?? 1;
  const liftY = homeY + dir * elbow.lift;
  const HUG_GAP = 22;
  const preX = Math.max(EDGE_MARGIN, elbow.x1 - HUG_GAP);
  const postX = Math.min(RAMP_START - 40, elbow.x2 + HUG_GAP);

  const d = [
    `M 0 ${homeY}`,
    `L ${preX} ${homeY}`,
    `L ${preX} ${liftY}`,
    `L ${postX} ${liftY}`,
    `L ${postX} ${homeY}`,
    `L ${RAMP_START} ${homeY}`,
    `C ${cp1x} ${homeY}, ${cp2x} ${exitY}, ${WIDTH} ${exitY}`,
  ].join(' ');

  const STEP = (WIDTH - 2 * EDGE_MARGIN) / 12;
  for (let x = EDGE_MARGIN; x <= preX - STEP / 2; x += STEP) {
    ticks.push({x, y: homeY, vertical: true});
  }
  for (let x = postX + STEP / 2; x <= RAMP_START - STEP / 2; x += STEP) {
    ticks.push({x, y: homeY, vertical: true});
  }
  const raisedSpan = postX - preX;
  const raisedStep = raisedSpan / 3;
  for (let x = preX + raisedStep / 2; x < postX; x += raisedStep) {
    ticks.push({x, y: liftY, vertical: true});
  }

  return {d, ticks};
}

function cubicPoint(p0: number, p1: number, p2: number, p3: number, t: number): number {
  const mt = 1 - t;
  return mt * mt * mt * p0 + 3 * mt * mt * t * p1 + 3 * mt * t * t * p2 + t * t * t * p3;
}

/**
 * Trilha convergente (Fechamento): ENTRA pela borda esquerda na homeY —
 * exatamente a altura em que saiu do slide anterior — e curva, dentro do
 * próprio frame, até (CONVERGE_X, CONVERGE_Y). Depois continua reta,
 * sobreposta às outras trilhas, até a borda direita — efeito "as rotas
 * viram 1 sistema só".
 */
function buildConvergePath(homeY: number): string {
  const p0 = {x: 0, y: homeY};
  const p3 = {x: CONVERGE_X, y: CONVERGE_Y};
  const cp1 = {x: CONVERGE_X * 0.38, y: homeY};
  const cp2 = {x: CONVERGE_X * 0.72, y: CONVERGE_Y};
  return `M ${p0.x} ${p0.y} C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${p3.x} ${p3.y} L ${WIDTH} ${CONVERGE_Y}`;
}

export const TrackRail: React.FC<{
  tracks: RailTrack[];
  activeIndex: number | null;
  converge?: boolean;
  /** Cotovelo local pra trilha ATIVA (ignorado se `converge` ou sem trilha ativa). */
  elbow?: ElbowSpec;
  /** Rodada 14 — linha ramificada (ver `BranchSpec`). Ignora `activeIndex` pras 2 trilhas envolvidas. */
  branch?: BranchSpec;
  /** Rodada 14 — passagem de bastão pra trilha ATIVA (ver `BatonSpec`). Ignorado se `converge`/`branch`. */
  baton?: BatonSpec;
}> = ({tracks, activeIndex, converge = false, elbow, branch, baton}) => {
  return (
    <svg
      width={WIDTH}
      height={HEIGHT}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      style={{position: 'absolute', top: 0, left: 0, pointerEvents: 'none'}}
    >
      {tracks.map((track, i) => {
        const isActive = activeIndex === i;
        const dimmed = activeIndex !== null && !isActive;
        const strokeWidth = isActive ? 12 : dimmed ? 4 : 6;
        const opacity = isActive ? 1 : dimmed ? 0.16 : 0.34;

        // A linha é SEMPRE `track.color`, literalmente o mesmo hex em toda
        // peça (capa, slide dono, fechamento) — pedido explícito do fundador
        // depois de rejeitar a versão anterior, que escurecia a cor da linha
        // quando ela precisava de contraste contra fundo da própria cor.
        // O contraste agora é resolvido no FUNDO do slide (ver `shade()` e
        // seu uso em Rotas.tsx), nunca na linha.

        let d: string;
        let ticks: TickPoint[] = [];
        let branchStrokeWidth: number | null = null;

        const branchPos = branch ? branch.trackIndices.indexOf(i) : -1;

        if (branch && branchPos !== -1) {
          const sideOffset = branchPos === 0 ? -3 : 3;
          const built = buildBranchPath(track.y, branch.splitX, branch.toY[branchPos], sideOffset);
          d = built.d;
          ticks = built.ticks;
          branchStrokeWidth = 12;
        } else if (converge) {
          d = buildConvergePath(track.y);
        } else if (isActive && baton) {
          const built = buildBatonPath(track.y, baton.exitY, elbow);
          d = built.d;
          ticks = built.ticks;
        } else if (isActive) {
          const built = buildActivePath(track.y, elbow);
          d = built.d;
          ticks = built.ticks;
        } else {
          d = `M 0 ${track.y} L ${WIDTH} ${track.y}`;
        }

        return (
          <g key={i}>
            <path
              d={d}
              fill="none"
              stroke={track.color}
              strokeWidth={branchStrokeWidth ?? strokeWidth}
              opacity={branchStrokeWidth ? 1 : opacity}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {ticks.map((tick, k) => (
              <line
                key={k}
                x1={tick.vertical ? tick.x : tick.x - 15}
                y1={tick.vertical ? tick.y - 15 : tick.y}
                x2={tick.vertical ? tick.x : tick.x + 15}
                y2={tick.vertical ? tick.y + 15 : tick.y}
                stroke={track.color}
                strokeWidth={5}
                opacity={0.55}
                strokeLinecap="round"
              />
            ))}
          </g>
        );
      })}
    </svg>
  );
};

// Mantido apenas por compatibilidade de tipos com quem ainda importa a
// função utilitária de curva cúbica em outro lugar do projeto (nenhum
// consumidor conhecido hoje, mas evita quebra silenciosa se existir).
export {cubicPoint};
