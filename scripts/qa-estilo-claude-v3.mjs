#!/usr/bin/env node
import {renderStill} from './lib-render.mjs';
import path from 'node:path';

/**
 * Estilo Claude — 4ª RODADA (2026-09-05), correção em cima do preset
 * `editorialClaude` (3ª tentativa, ver qa-estilo-claude-v2.mjs). Feedback do
 * fundador na v2: "isso tá ruim, sem desenhos, sem identidade própria" — a
 * 3ª tentativa foi longe demais na restrição (`graphicSupport: false`
 * suprimiu TODO ícone/gráfico) copiando a paleta/tipografia da grade real do
 * @claudeai, mas ignorou que pelo menos 2 posts reais TÊM ilustração própria
 * desenhada à mão ("Follow your track" = diagrama de nós/setas; "Safeguards
 * 101" = ícone line-art de casa). Ver src/lib/HandDrawn.tsx pra técnica e
 * justificativa completa.
 *
 * Esta rodada NÃO re-renderiza os 9 tipos inteiros (nada mudou nos outros
 * 6) — só as 3 peças que ganharam ilustração própria nova, pra comparação
 * direta contra `out/estilo-claude-v2/`.
 */

const OUT = 'out/estilo-claude-v3';

const BATCH = [
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
