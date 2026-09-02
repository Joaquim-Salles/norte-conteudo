#!/usr/bin/env node
import {renderVideo} from './lib-render.mjs';

/**
 * QA/prova do sistema de ESTILO DE MOTION (Round C, docs/plano-catalogo-em-escala.md).
 * Objetivo: provar que `motionStyle` produz vídeos REALMENTE diferentes (não
 * só metadado) cruzando pelo menos 2-3 tipos de conteúdo animável × 3-4
 * motionStyles — mínimo 6-8 MP4s renderizados de verdade (Regra Inviolável
 * #1: assistir o vídeo real, extrair frames-chave via ffmpeg pra revisão
 * rápida, nunca aprovar só porque compilou).
 *
 * `kineticForte` aparece nos 3 tipos como BASELINE (é a aparência ORIGINAL —
 * ver comentário de compatibilidade em cada Reel), os outros 6 presets
 * aparecem cada um em pelo menos 1 tipo, escolhido pelo `quandoUsar` de cada
 * preset (ex.: `typewriter` no Comparativo/citação, `splitReveal` no
 * Comparativo — o par mais natural — e também na Metodologia pra provar que
 * não é exclusivo de 1 template).
 */

const BATCH = [
  // --- Dado vs. Achismo Reel — 4 motionStyles ---
  {compositionId: 'DadoVsAchismoReel', outName: 'DadoVsAchismoReel-kineticForte', props: {motionStyle: 'kineticForte'}},
  {compositionId: 'DadoVsAchismoReel', outName: 'DadoVsAchismoReel-minimalFade', props: {motionStyle: 'minimalFade'}},
  {compositionId: 'DadoVsAchismoReel', outName: 'DadoVsAchismoReel-zoomPunch', props: {motionStyle: 'zoomPunch'}},
  {compositionId: 'DadoVsAchismoReel', outName: 'DadoVsAchismoReel-matchCut', props: {motionStyle: 'matchCut'}},

  // --- Metodologia Reel — 3 motionStyles ---
  {compositionId: 'MetodologiaReel', outName: 'MetodologiaReel-kineticForte', props: {motionStyle: 'kineticForte'}},
  {compositionId: 'MetodologiaReel', outName: 'MetodologiaReel-whipPanCut', props: {motionStyle: 'whipPanCut'}},
  {compositionId: 'MetodologiaReel', outName: 'MetodologiaReel-splitReveal', props: {motionStyle: 'splitReveal'}},

  // --- Comparativo Reel (NOVO) — 3 motionStyles, incluindo o par natural (splitReveal) ---
  {compositionId: 'ComparativoReel', outName: 'ComparativoReel-splitReveal', props: {motionStyle: 'splitReveal'}},
  {compositionId: 'ComparativoReel', outName: 'ComparativoReel-typewriter', props: {motionStyle: 'typewriter'}},
  {compositionId: 'ComparativoReel', outName: 'ComparativoReel-kineticForte', props: {motionStyle: 'kineticForte'}},
];

/**
 * ---- Round D (2026-09-01, docs/plano-catalogo-em-escala.md) ----
 * Escala vídeo pra mais tipos de conteúdo animável: 3 Reels NOVOS
 * (`DepoimentoReel` par de `typewriter`, `BastidoresReel` par de
 * `minimalFade`, `AntesDepoisReel` par de `matchCut` — ver comentário de
 * julgamento em `AntesDepoisReel.tsx` sobre por que esse 3º tipo entrou) +
 * combinações NOVAS nos 3 tipos já existentes (cruzando tema/produto, não só
 * motionStyles ainda não testados) — objetivo: aproximar o acumulado real do
 * catálogo de vídeo de 30-50 (11 do Round C + os renders abaixo).
 *
 * IMPORTANTE (regra de escopo, mesma do Still `Depoimento.tsx`): as citações
 * de cliente abaixo (`DEPOIMENTO_*`) são PLACEHOLDER ilustrativo pra QA
 * visual, não depoimento de produção real — Rafael nunca inventa citação
 * pra publicar de verdade (brief real sempre vem do fundador/marketing).
 *
 * Critério de quais combinações ENTRAM (documentado, "não forçar o que não
 * faz sentido semântico"):
 *  - `DepoimentoReel`: typewriter (par documentado) e minimalFade (também
 *    documentado em motionStyles.ts pra Depoimento) + kineticForte
 *    (baseline universal). NÃO entram zoomPunch/whipPanCut/splitReveal —
 *    energia agressiva ou "2 lados que se encontram" contradiz o tom de
 *    "voz pessoal do cliente" que define o formato.
 *  - `BastidoresReel`: só minimalFade (par documentado) + kineticForte
 *    (baseline). Sem eixo de tema/produto (Bastidores é sempre preto/roxo
 *    fixo) — por isso só 2 combinações reais aqui, não força um 3º preset
 *    que não tem `quandoUsar` compatível com o gênero (sobriedade/confiança).
 *  - `AntesDepoisReel`: matchCut (par documentado desde o Round C, "padrão
 *    real pra antes/depois") + kineticForte (baseline) + minimalFade (tom
 *    sóbrio também cabe numa virada contada com discrição). NÃO entram
 *    zoomPunch (impacto agressivo é pro lançamento de produto, não pra uma
 *    virada gradual) nem splitReveal/whipPanCut (estruturas de "2 opções" ou
 *    "vários pontos rápidos" que não são o que Antes/Depois representa).
 *  - `DadoVsAchismoReel` ganha `typewriter`: a "Achismo" já É uma citação em
 *    1ª pessoa formatada em itálico — typewriter reforça isso no tempo
 *    (mesma lógica que justificou o preset pra Depoimento).
 *  - `MetodologiaReel` ganha `minimalFade`: processo/passo a passo também
 *    cabe num tom mais contido, sem tirar a leitura de "sequência".
 *  - `ComparativoReel` ganha `whipPanCut` (a pesquisa do Round C já aponta
 *    esse preset pra "conteúdo com vários pontos rápidos" — os itens do
 *    comparativo em stagger SÃO isso) + 2 combinações adicionais cruzando
 *    produto NTB Vendas com presets já provados (`splitReveal`,
 *    `kineticForte`) pra confirmar que o tipo generaliza pra outro produto.
 */

const DEPOIMENTO_VENDAS = {
  citacao: 'Antes a fila do salão travava no horário de pico. Hoje o cliente pede pelo QR code e a cozinha já recebe certinho.',
  cliente: 'Fernanda Ribeiro',
  empresa: 'Sabor & Cia',
  corpoResultado: 'Reduzimos o tempo médio de pedido em quase metade, sem contratar mais gente no salão.',
  metrica: '-45% tempo de pedido',
  produto: 'ntbVendas',
};

const DEPOIMENTO_AVALIA = {
  citacao: 'A gente decidia contratação no feeling. Hoje tem critério, e o time todo confia no processo.',
  cliente: 'Carlos Menezes',
  empresa: 'Grupo Menezes Distribuição',
  corpoResultado: 'Cortamos o turnover do time operacional pela metade em 6 meses.',
  metrica: '-50% turnover',
  produto: 'norteAvalia',
};

const DEPOIMENTO_MARCA = {
  citacao: 'Contratamos a Norte achando que ia ser mais um relatório bonito. Não foi — foi processo que a gente aplica até hoje.',
  cliente: 'Renata Cavalcanti',
  empresa: 'RC Alimentos',
  corpoResultado: 'Mudou a forma como decidimos, não só os números de um mês.',
  theme: 'marca',
};

const ANTESDEPOIS_VENDAS = {
  antesTexto: 'Comanda de papel, pedido perdido, cliente esperando sem saber o motivo.',
  depoisTexto: 'Pedido cai direto na cozinha pelo QR code, sem intermediário.',
  metrica: '-45% tempo de pedido',
  theme: 'vendas',
};

const ANTESDEPOIS_MARCA = {
  antesTexto: 'Decisão no feeling, sem processo pra repetir o que deu certo.',
  depoisTexto: 'Cada decisão apoiada num dado que a gente mediu, não achou.',
  theme: 'marca',
};

const ANTESDEPOIS_AVALIA = {
  antesTexto: 'Contratação e promoção decididas na intuição do gestor.',
  depoisTexto: 'Critério claro, registrado, replicável em qualquer contratação.',
  metrica: '-50% turnover',
  theme: 'avalia',
};

const COMPARATIVO_VENDAS = {
  tituloA: 'Comanda de papel',
  tituloB: 'Com o Cardápio Digital',
  itens: [
    {label: 'Pedido', a: 'Anotado à mão, risco de erro', b: 'Direto da mesa pro sistema, sem intermediário'},
    {label: 'Fila no salão', a: 'Trava no horário de pico', b: 'Cliente pede sem esperar garçom livre'},
    {label: 'Fechamento de conta', a: 'Soma manual, discrepância comum', b: 'Fechamento automático, sem erro de conta'},
  ],
  produto: 'ntbVendas',
};

const BATCH_ROUND_D = [
  // --- DepoimentoReel (NOVO) — 6 renders, typewriter/minimalFade/kineticForte ---
  {compositionId: 'DepoimentoReel', outName: 'DepoimentoReel-typewriter', props: {motionStyle: 'typewriter'}},
  {compositionId: 'DepoimentoReel', outName: 'DepoimentoReel-typewriter-vendas', props: {...DEPOIMENTO_VENDAS, motionStyle: 'typewriter'}},
  {compositionId: 'DepoimentoReel', outName: 'DepoimentoReel-minimalFade-avalia', props: {...DEPOIMENTO_AVALIA, motionStyle: 'minimalFade'}},
  {compositionId: 'DepoimentoReel', outName: 'DepoimentoReel-minimalFade-vendas', props: {...DEPOIMENTO_VENDAS, motionStyle: 'minimalFade'}},
  {compositionId: 'DepoimentoReel', outName: 'DepoimentoReel-kineticForte-marca', props: {...DEPOIMENTO_MARCA, motionStyle: 'kineticForte'}},
  {compositionId: 'DepoimentoReel', outName: 'DepoimentoReel-kineticForte', props: {motionStyle: 'kineticForte'}},

  // --- BastidoresReel (NOVO) — 2 renders, sem eixo de tema (ver nota acima) ---
  {compositionId: 'BastidoresReel', outName: 'BastidoresReel-minimalFade', props: {motionStyle: 'minimalFade'}},
  {compositionId: 'BastidoresReel', outName: 'BastidoresReel-kineticForte', props: {motionStyle: 'kineticForte'}},

  // --- AntesDepoisReel (NOVO) — 6 renders, matchCut/kineticForte/minimalFade ---
  {compositionId: 'AntesDepoisReel', outName: 'AntesDepoisReel-matchCut', props: {motionStyle: 'matchCut'}},
  {compositionId: 'AntesDepoisReel', outName: 'AntesDepoisReel-matchCut-vendas', props: {...ANTESDEPOIS_VENDAS, motionStyle: 'matchCut'}},
  {compositionId: 'AntesDepoisReel', outName: 'AntesDepoisReel-matchCut-marca', props: {...ANTESDEPOIS_MARCA, motionStyle: 'matchCut'}},
  {compositionId: 'AntesDepoisReel', outName: 'AntesDepoisReel-kineticForte-avalia', props: {...ANTESDEPOIS_AVALIA, motionStyle: 'kineticForte'}},
  {compositionId: 'AntesDepoisReel', outName: 'AntesDepoisReel-kineticForte', props: {motionStyle: 'kineticForte'}},
  {compositionId: 'AntesDepoisReel', outName: 'AntesDepoisReel-minimalFade-vendas', props: {...ANTESDEPOIS_VENDAS, motionStyle: 'minimalFade'}},

  // --- Tipos já existentes (Round C) ganham combinações novas ---
  {compositionId: 'DadoVsAchismoReel', outName: 'DadoVsAchismoReel-typewriter-vendas', props: {theme: 'vendas', motionStyle: 'typewriter'}},
  {compositionId: 'MetodologiaReel', outName: 'MetodologiaReel-minimalFade', props: {motionStyle: 'minimalFade'}},
  {compositionId: 'ComparativoReel', outName: 'ComparativoReel-whipPanCut-vendas', props: {...COMPARATIVO_VENDAS, motionStyle: 'whipPanCut'}},
  {compositionId: 'ComparativoReel', outName: 'ComparativoReel-splitReveal-vendas', props: {...COMPARATIVO_VENDAS, motionStyle: 'splitReveal'}},
  {compositionId: 'ComparativoReel', outName: 'ComparativoReel-kineticForte-vendas', props: {...COMPARATIVO_VENDAS, motionStyle: 'kineticForte'}},
];

const RUN_ROUND_D = process.argv.includes('--round-d');
const RUN_ROUND_C = process.argv.includes('--round-c') || !RUN_ROUND_D;

const toRun = [
  ...(RUN_ROUND_C ? BATCH : []),
  ...(RUN_ROUND_D ? BATCH_ROUND_D : []),
];

for (const [i, {compositionId, outName, props}] of toRun.entries()) {
  const outPath = `out/qa/motion/${outName}.mp4`;
  console.log(`[${i + 1}/${toRun.length}] ${compositionId} (${outName}) -> ${outPath}`);
  renderVideo({compositionId, props, outPath});
}

console.log(`\n${toRun.length} video(s) renderizados em out/qa/motion/. Assistir/extrair frames antes de aprovar (Regra Inviolavel #1).`);
