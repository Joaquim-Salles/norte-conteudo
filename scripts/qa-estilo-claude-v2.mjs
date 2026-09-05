#!/usr/bin/env node
import {renderStill} from './lib-render.mjs';
import path from 'node:path';

/**
 * Estilo Claude — 3ª TENTATIVA (2026-09-05), preset novo `editorialClaude`.
 * As 2 tentativas anteriores (ambas em cima do preset `papelQuente` — Round F
 * e Round H) foram REJEITADAS pelo fundador: "ainda não é o que eu quero" /
 * "uma merda... quero um estilo Claude, porra". Desta vez a referência não é
 * mais pesquisa por texto — são 3 screenshots REAIS da grade pública do
 * Instagram @claudeai (docs/referencias-visuais/claude-instagram/grid-{1,2,3}.png),
 * lidos e comparados pixel a pixel antes de qualquer código.
 *
 * Mesmos 8 tipos de post do Round H (continuidade de comparação) + 1 peça
 * NOVA (09) — foto documental crua + legenda pequena, o formato MAIS COMUM
 * da grade real (metade dos posts nos 3 screenshots são só isso: foto ou
 * card de cor sólida, texto mínimo ou nenhum).
 */

const OUT = 'out/estilo-claude-v2';

const BATCH = [
  {
    compositionId: 'Depoimento',
    outName: '01-Depoimento',
    props: {
      theme: 'marca',
      visualStyle: 'editorialClaude',
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
      visualStyle: 'editorialClaude',
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
      visualStyle: 'editorialClaude',
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
      visualStyle: 'editorialClaude',
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
      visualStyle: 'editorialClaude',
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
      visualStyle: 'editorialClaude',
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
      visualStyle: 'editorialClaude',
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
      visualStyle: 'editorialClaude',
      achismo: '"Acho que já sei onde a operação perde dinheiro."',
      dado: 'Diagnósticos completos revelam em média 3 pontos de perda que o time não tinha mapeado.',
      fonteDado: 'Norte Para Negócios, Norte Avalia',
    },
  },
  {
    // NOVO (não existia no Round H): foto documental + legenda pequena — o
    // formato MAIS COMUM na grade real do @claudeai (ver os 3 screenshots).
    compositionId: 'CoverFotoReal',
    outName: '09-FotoDocumental',
    props: {
      visualStyle: 'editorialClaude',
      titulo: 'Operação de verdade, sem achismo.',
      foto: 'photos/corredor-empilhadeira-estoque.jpg',
      fotoPosition: 'center 35%',
      theme: 'estoque',
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
