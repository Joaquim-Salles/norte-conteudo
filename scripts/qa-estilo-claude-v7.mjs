#!/usr/bin/env node
import {renderStill} from './lib-render.mjs';
import path from 'node:path';

/**
 * Estilo Claude — 7ª RODADA (2026-09-05), pedido literal do fundador:
 * "quero os sem foto com desenhos, versões, vários" — o LAYOUT 4 do
 * relatório do fundador (`docs/referencias-visuais/claude-instagram/
 * relatorio-completo-fundador.md`, "capa de cor chapada: fundo sólido, sem
 * foto") com a ILUSTRAÇÃO À MÃO como PROTAGONISTA da composição, não detalhe
 * de canto pequeno como a 4ª/5ª rodada tinham feito (achado real de QA:
 * `VitrineProduto` `padrao` tinha a ilustração em 128px espremida no canto
 * superior direito — corrigido pra 260px dividindo a composição com o
 * headline, mesmo princípio de "Safeguards 101"/"How we study Claude").
 *
 * O que este lote prova, item a item (ver CATALOGO.md pra detalhe completo):
 * 1. 4 ilustrações NOVAS em `src/lib/HandDrawn.tsx` (além de `fluxo` e
 *    `negocioReal`, já existentes): `crescimento` (gráfico de barras +
 *    tendência), `parceria` (aperto de mão), `tempo` (ampulheta), `aprovado`
 *    (selo com check) — 6 ilustrações no total, escolhíveis via prop nova
 *    `illustration` em cada template (antes hardcoded a 1 única por
 *    template).
 * 2. Ilustração como PROTAGONISTA (não decoração) em 5 tipos de post
 *    diferentes: Bastidores (`manifesto`), Dica Prática (`bridge`), Vitrine
 *    de Produto (`padrao`), Metodologia (`cover-editorial`, ilustração NOVA
 *    aqui — antes não tinha nenhuma) e Depoimento (`contexto`, sem foto,
 *    ilustração NOVA aqui também).
 * 3. Cruzamento com os 4 temas/produtos (marca, estoque, vendas, avalia) —
 *    Vitrine deriva tema do `produto` automaticamente; Depoimento aceita
 *    `theme` explícito.
 * 4. `StatusChip` (já existente, Round 6) reaplicado em pontos onde faz
 *    sentido narrar a cena — mas sempre em segundo plano: a composição
 *    principal é ILUSTRAÇÃO GRANDE + texto, não o chip.
 *
 * 15 peças renderizadas — distribuição:
 *   Bastidores (manifesto): 3 — fluxo, parceria, tempo
 *   DicaPratica (bridge): 3 — crescimento, tempo, aprovado
 *   VitrineProduto (padrao): 4 — estoque×crescimento, vendas×parceria,
 *     avalia×aprovado, estoque×negocioReal
 *   MetodologiaSemEnrolacao (cover-editorial): 2 — fluxo, parceria
 *   Depoimento (contexto, sem foto): 3 — marca×parceria, estoque×aprovado,
 *     vendas×crescimento
 */

const OUT = 'out/estilo-claude-v7';

const BATCH = [
  // ---- Bastidores (manifesto) — 3 ilustrações diferentes ----
  {
    compositionId: 'Bastidores',
    outName: '01-bastidores-fluxo',
    props: {
      visualStyle: 'editorialClaude',
      eyebrow: 'Como trabalhamos',
      titulo: 'Não recomendamos nada antes de ver o dado.',
      principios: [
        'Todo diagnóstico começa medindo o que já existe, não achando.',
        'Nenhuma solução entra sem um número que comprove que ela resolveu.',
        'Se o processo não é repetível, não é método — é sorte.',
      ],
      illustration: 'fluxo',
    },
  },
  {
    compositionId: 'Bastidores',
    outName: '02-bastidores-parceria',
    props: {
      visualStyle: 'editorialClaude',
      eyebrow: 'Como trabalhamos',
      titulo: 'A gente senta com o dono do negócio, não só com a planilha.',
      principios: [
        'Todo diagnóstico é feito junto, no chão da loja ou do restaurante.',
        'Decisão de sistema é decisão de dois — nunca imposta de fora.',
        'Suporte continua depois que o contrato começou, não só antes.',
      ],
      illustration: 'parceria',
      statusVerbo: 'Diagnosticando junto',
    },
  },
  {
    compositionId: 'Bastidores',
    outName: '03-bastidores-tempo',
    props: {
      visualStyle: 'editorialClaude',
      eyebrow: 'Como trabalhamos',
      titulo: 'Automatizamos o que rouba tempo do dono, não o que é fácil.',
      principios: [
        'A tarefa manual mais repetida do cliente é o primeiro alvo, sempre.',
        'Se automatizar não devolve tempo de verdade, não entra no escopo.',
        'Medimos horas economizadas por semana, não só "produtividade".',
      ],
      illustration: 'tempo',
    },
  },

  // ---- DicaPratica (bridge) — 3 ilustrações diferentes ----
  {
    compositionId: 'DicaPratica',
    outName: '04-dicapratica-crescimento',
    props: {
      visualStyle: 'editorialClaude',
      slide: {
        kind: 'bridge',
        numero: 2,
        total: 4,
        titulo: 'Todo relatório precisa terminar numa decisão.',
        corpo: 'Se o número não muda o que você vai fazer amanhã, ele é decoração, não gestão.',
        illustration: 'crescimento',
      },
    },
  },
  {
    compositionId: 'DicaPratica',
    outName: '05-dicapratica-tempo',
    props: {
      visualStyle: 'editorialClaude',
      slide: {
        kind: 'bridge',
        numero: 1,
        total: 3,
        titulo: 'Fechamento de caixa não devia levar a noite inteira.',
        corpo: 'Automatizado, o mesmo fechamento sai em minutos — o tempo que sobra é seu.',
        illustration: 'tempo',
        statusVerbo: 'Calculando o fechamento',
      },
    },
  },
  {
    compositionId: 'DicaPratica',
    outName: '06-dicapratica-aprovado',
    props: {
      visualStyle: 'editorialClaude',
      slide: {
        kind: 'bridge',
        numero: 3,
        total: 3,
        titulo: 'Antes de recomendar, a gente testa na própria operação.',
        corpo: 'Nenhuma dica sai daqui sem ter rodado de verdade num cliente real primeiro.',
        illustration: 'aprovado',
      },
    },
  },

  // ---- VitrineProduto (padrao) — cruzando produto × ilustração ----
  {
    compositionId: 'VitrineProduto',
    outName: '07-vitrine-estoque-crescimento',
    props: {
      visualStyle: 'editorialClaude',
      produto: 'ntbEstoque',
      nomeProduto: 'NTB Estoque',
      headline: 'Menos ruptura, mais giro — em números reais.',
      features: [
        'Alerta automático antes do estoque zerar',
        'Curva ABC pra saber o que priorizar na compra',
        'Inventário cíclico sem parar a operação',
        'Histórico de giro por produto, direto do sistema',
      ],
      illustration: 'crescimento',
    },
  },
  {
    compositionId: 'VitrineProduto',
    outName: '08-vitrine-vendas-parceria',
    props: {
      visualStyle: 'editorialClaude',
      produto: 'ntbVendas',
      nomeProduto: 'NTB Vendas',
      headline: 'Cardápio digital feito com o dono, não pra ele.',
      features: [
        'Edição de cardápio sem depender de suporte',
        'Fila e comanda digital integradas ao caixa',
        'Setup acompanhado do primeiro ao trigésimo dia',
        'Ajustes de fluxo direto com quem opera o salão',
      ],
      illustration: 'parceria',
      statusVerbo: 'Sincronizando pedidos',
    },
  },
  {
    compositionId: 'VitrineProduto',
    outName: '09-vitrine-avalia-aprovado',
    props: {
      visualStyle: 'editorialClaude',
      produto: 'norteAvalia',
      nomeProduto: 'Norte Avalia',
      headline: 'Diagnóstico validado antes de virar plano de ação.',
      features: [
        'Checklist de maturidade operacional por área',
        'Comparativo com benchmark de negócios parecidos',
        'Plano de ação priorizado por impacto e esforço',
        'Revisão trimestral pra medir evolução real',
      ],
      illustration: 'aprovado',
    },
  },
  {
    compositionId: 'VitrineProduto',
    outName: '10-vitrine-estoque-negocioreal',
    props: {
      visualStyle: 'editorialClaude',
      produto: 'ntbEstoque',
      nomeProduto: 'NTB Estoque',
      headline: 'Feito pra loja real, não pra demo.',
      features: [
        'Cadastro de produto pensado pro balcão, não pro TI',
        'Funciona offline no fundo do estoque, sem sinal',
        'Integração direta com o Omie, sem digitação dupla',
        'Suporte que atende quem está no chão da loja',
      ],
      illustration: 'negocioReal',
    },
  },

  // ---- MetodologiaSemEnrolacao (cover-editorial) — ilustração NOVA aqui ----
  {
    compositionId: 'MetodologiaSemEnrolacao',
    outName: '11-metodologia-fluxo',
    props: {
      visualStyle: 'editorialClaude',
      slide: {
        kind: 'cover-editorial',
        titulo: 'Diagnóstico. Ajuste. Medição.',
        subtitulo: 'O mesmo ciclo, repetido até o número parar de mentir.',
        illustration: 'fluxo',
      },
    },
  },
  {
    compositionId: 'MetodologiaSemEnrolacao',
    outName: '12-metodologia-parceria',
    props: {
      visualStyle: 'editorialClaude',
      slide: {
        kind: 'cover-editorial',
        titulo: 'Metodologia não substitui conversa com quem opera.',
        subtitulo: 'Todo passo do processo é validado com o dono antes de virar rotina.',
        illustration: 'parceria',
        statusVerbo: 'Organizando o processo',
      },
    },
  },

  // ---- Depoimento (contexto, sem foto) — cruzando tema × ilustração ----
  {
    compositionId: 'Depoimento',
    outName: '13-depoimento-marca-parceria',
    props: {
      visualStyle: 'editorialClaude',
      theme: 'marca',
      slide: {
        kind: 'contexto',
        corpo: 'A Norte não chegou vendendo sistema — chegou perguntando onde a gente estava perdendo dinheiro.',
        illustration: 'parceria',
      },
    },
  },
  {
    compositionId: 'Depoimento',
    outName: '14-depoimento-estoque-aprovado',
    props: {
      visualStyle: 'editorialClaude',
      theme: 'estoque',
      slide: {
        kind: 'contexto',
        corpo: 'Testamos o sistema por 3 semanas antes de decidir. Só aprovamos porque o número fechou.',
        illustration: 'aprovado',
      },
    },
  },
  {
    compositionId: 'Depoimento',
    outName: '15-depoimento-vendas-crescimento',
    props: {
      visualStyle: 'editorialClaude',
      theme: 'vendas',
      slide: {
        kind: 'contexto',
        corpo: 'Depois do cardápio digital, o ticket médio subiu — e a gente enxerga isso no relatório, não no achismo.',
        illustration: 'crescimento',
        statusVerbo: 'Medindo o ticket médio',
      },
    },
  },
];

for (const item of BATCH) {
  console.log(`Renderizando ${item.outName}...`);
  renderStill({
    compositionId: item.compositionId,
    props: item.props,
    outPath: path.join(OUT, `${item.outName}.png`),
  });
}
