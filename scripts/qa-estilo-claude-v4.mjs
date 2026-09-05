#!/usr/bin/env node
import {renderStill} from './lib-render.mjs';
import path from 'node:path';

/**
 * Estilo Claude — 5ª RODADA (2026-09-05), correção rigorosa em cima do preset
 * `editorialClaude` (4ª tentativa, ver qa-estilo-claude-v3.mjs). O fundador
 * seguiu insatisfeito depois da v3 ("ainda uma merda e os modelos tão
 * ruim"). Comparação lado a lado, item a item, contra as referências reais
 * (`docs/referencias-visuais/claude-instagram/grid-{1,2}.png`) achou 4 gaps
 * CONCRETOS (não "chegar mais perto" vago) — cada um corrigido em código,
 * não só ajuste de prop:
 *
 * 1. Gradiente vibrante remanescente em VitrineProduto (teal→preto) — a
 *    referência real NUNCA usa gradiente de cor de produto, sempre bloco
 *    sólido único. Corrigido em src/templates/VitrineProduto.tsx
 *    (`identityBackground`, editorialClaude vira sempre sólido).
 * 2. Foto de banco genérica (`corredor-empilhadeira-estoque.jpg`, armazém
 *    bem iluminado/corporativo) trocada por foto NOVA genuinamente
 *    atmosférica/contemplativa (`montanha-neblina-caminhante.jpg`, Pexels
 *    #32984804 — montanha coberta de neblina, caminhante pequeno de costas,
 *    preto-e-branco) — mesmo princípio de curadoria das referências reais
 *    (praia com neblina, montanha com neblina), não tratamento de código.
 * 3. Texto sobre foto centralizado + peso médio (era canto inferior
 *    esquerdo + bold) em CoverFotoReal e DicaPratica `cover-foto`.
 * 4. Card de cor sólida ancorado no TOPO (era centralizado no meio do frame,
 *    vazio enorme antes do rodapé) em Bastidores `manifesto` e DicaPratica
 *    `bridge`.
 *
 * Re-renderiza as MESMAS 3 peças da v3 (pra confirmar que a correção não
 * regrediu a ilustração à mão aprovada na 4ª rodada) + 1 peça NOVA
 * (CoverFotoReal com a foto nova) — 4 PNGs de prova.
 */

const OUT = 'out/estilo-claude-v4';

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
  {
    compositionId: 'CoverFotoReal',
    outName: '09-FotoDocumental',
    props: {
      visualStyle: 'editorialClaude',
      titulo: 'Operação de verdade, sem achismo.',
      foto: 'photos/montanha-neblina-caminhante.jpg',
      fotoPosition: 'center 40%',
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
