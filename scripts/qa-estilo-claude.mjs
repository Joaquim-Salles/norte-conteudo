#!/usr/bin/env node
import {renderStill} from './lib-render.mjs';
import path from 'node:path';

/**
 * Estilo Claude / papelQuente — pedido direto do fundador 2026-09-04/05
 * ("uma merda... quero um estilo Claude, porra"). 1 render de cada um dos
 * 8 tipos de post no preset `papelQuente` (refinado nesta rodada — ver
 * src/lib/visualStyles.ts) + wiring novo de `canvasOverride` em 4 templates
 * que ainda não suportavam o fundo papel/tinta (Bastidores, DicaPratica,
 * MetodologiaSemEnrolacao, VitrineProduto — Depoimento já suportava desde
 * o Round F). AntesDepois/Comparativo/DadoVsAchismo são templates de
 * CONTRASTE (2 blocos de cor cobrindo o frame inteiro por design — antes/
 * depois, coluna A/B) — mantidos assim de propósito (não dá pra forçar
 * "canvas único" nesses sem destruir o próprio conceito do template),
 * ganham só tipografia/espaçamento/traço do preset.
 */

const OUT = 'out/estilo-claude';

const BATCH = [
  {
    compositionId: 'Depoimento',
    outName: '01-Depoimento',
    props: {
      theme: 'marca',
      visualStyle: 'papelQuente',
      slide: {
        kind: 'contexto',
        corpo: 'A gente não queria só um sistema. Queria alguém que entendesse o negócio antes de sugerir a ferramenta.',
      },
    },
  },
  {
    compositionId: 'Bastidores',
    outName: '02-Bastidores',
    props: {
      visualStyle: 'papelQuente',
      variant: 'manifesto',
      eyebrow: 'Como trabalhamos',
      titulo: 'Não trabalhamos com achismos.',
      principios: [
        'Diagnóstico antes de qualquer ferramenta',
        'Dado real, não impressão de quem está por dentro',
        'Software só depois do processo fazer sentido',
      ],
    },
  },
  {
    compositionId: 'MetodologiaSemEnrolacao',
    outName: '03-MetodologiaSemEnrolacao',
    props: {
      visualStyle: 'papelQuente',
      slide: {
        kind: 'cover-editorial',
        titulo: 'Sem enrolação: método antes de achismo.',
        subtitulo: 'O mesmo processo, aplicado com rigor — não um slogan.',
      },
    },
  },
  {
    compositionId: 'DicaPratica',
    outName: '04-DicaPratica',
    props: {
      visualStyle: 'papelQuente',
      slide: {
        kind: 'bridge',
        numero: 2,
        total: 3,
        titulo: 'Revise o estoque antes de revisar o preço.',
        corpo: 'A maioria dos ajustes de margem que dão errado começam num número de estoque que já estava errado.',
      },
    },
  },
  {
    compositionId: 'VitrineProduto',
    outName: '05-VitrineProduto',
    props: {
      visualStyle: 'papelQuente',
      variant: 'padrao',
      produto: 'ntbEstoque',
      nomeProduto: 'NTB Estoque',
      headline: 'Estoque sincronizado com o Omie em tempo real.',
      features: [
        'Leitura de QR code pra movimentação e inventário',
        'Etiquetagem inteligente por lote/validade',
        'Inventários otimizados, sem parar a loja',
        'Perfis de acesso pra ajustes sensíveis',
      ],
    },
  },
  {
    compositionId: 'AntesDepois',
    outName: '06-AntesDepois',
    props: {
      visualStyle: 'papelQuente',
      variant: 'padrao',
      antesLabel: 'Antes',
      antesTexto: 'Planilha desatualizada, decisão no achismo.',
      depoisLabel: 'Depois',
      depoisTexto: 'Estoque batendo com o sistema, todo dia.',
      metrica: '+18% margem',
    },
  },
  {
    compositionId: 'Comparativo',
    outName: '07-Comparativo',
    props: {
      visualStyle: 'papelQuente',
      variant: 'colunas',
      tituloA: 'Jeito antigo',
      tituloB: 'Com a Norte',
      itens: [
        {a: 'Excel manual toda semana', b: 'Sincronização automática'},
        {a: 'Perda descoberta no fim do mês', b: 'Alerta no mesmo dia'},
        {a: 'Decisão no achismo', b: 'Decisão com dado'},
        {a: 'Time apagando incêndio', b: 'Time focado em vender'},
      ],
    },
  },
  {
    compositionId: 'DadoVsAchismo',
    outName: '08-DadoVsAchismo',
    props: {
      variant: 'padrao',
      theme: 'marca',
      visualStyle: 'papelQuente',
      achismo: '"Acho que já sei onde a operação perde dinheiro."',
      dado: 'Diagnósticos completos revelam em média 3 pontos de perda que o time não tinha mapeado.',
      fonteDado: 'Norte Para Negócios, Norte Avalia',
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

console.log('Concluído:', OUT);
