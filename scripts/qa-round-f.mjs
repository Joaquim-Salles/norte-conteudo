#!/usr/bin/env node
import {renderStill} from './lib-render.mjs';

/**
 * QA/prova do Round F (2026-09-03) — pedido direto do fundador: "tá tudo no
 * mesmo padrão, quero coisa mais chamativa/diferente", com 2 referências
 * externas pesquisadas de verdade (perfil Instagram @thaleslaray, identidade
 * visual pública Anthropic/Claude) + tendências gerais de carrossel 2026, e
 * aumento real da presença de foto de fundo (antes só 3 fotos em 3 templates,
 * praticamente exceção rara). Ver src/lib/visualStyles.ts (presets
 * `marcador`/`papelQuente`) e src/templates/CATALOGO.md §0.4.
 *
 * 8 renders: 4 provam os 2 presets novos em 2 templates cada (Depoimento +
 * DadoVsAchismo), 4 provam o aumento de foto real (3 fotos novas + 1 uso
 * novo de infraestrutura já existente). Revisar cada PNG antes de aprovar
 * (Regra Inviolável #1) — um estilo/posição ruim não conta como pronto.
 */

const BATCH = [
  // --- Presets novos: marcador ---
  {
    compositionId: 'Depoimento',
    outName: 'RoundF-Depoimento-contexto-marcador-estoque',
    props: {
      theme: 'estoque',
      visualStyle: 'marcador',
      slide: {
        kind: 'contexto',
        corpo: 'Eu só descobria a divergência no fim do mês. Hoje vejo o estoque batendo com o sistema todo dia.',
      },
    },
  },
  {
    compositionId: 'DadoVsAchismo',
    outName: 'RoundF-DadoVsAchismo-padrao-marcador-vendas',
    props: {
      variant: 'padrao',
      theme: 'vendas',
      visualStyle: 'marcador',
      achismo: '"Acho que o cardápio digital não muda muito o pedido médio."',
      dado: 'Restaurantes com cardápio digital registram ticket médio até 15% maior por sugestão guiada.',
      fonteDado: 'Norte Para Negócios, diagnóstico operacional',
    },
  },

  // --- Presets novos: papelQuente ---
  {
    compositionId: 'Depoimento',
    outName: 'RoundF-Depoimento-contexto-papelQuente-marca',
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
    compositionId: 'DadoVsAchismo',
    outName: 'RoundF-DadoVsAchismo-padrao-papelQuente-avalia',
    props: {
      variant: 'padrao',
      theme: 'avalia',
      visualStyle: 'papelQuente',
      achismo: '"Acho que já sei onde a operação perde dinheiro."',
      dado: 'Diagnósticos completos revelam em média 3 pontos de perda que o time não tinha mapeado.',
      fonteDado: 'Norte Para Negócios, Norte Avalia',
    },
  },

  // --- Aumento de foto real de fundo (3 fotos novas + 1 uso novo) ---
  {
    compositionId: 'Depoimento',
    outName: 'RoundF-Depoimento-capa-foto-marca',
    props: {
      theme: 'marca',
      slide: {
        kind: 'capa',
        citacao: 'A Norte não chegou com uma ferramenta pronta. Chegou entendendo o problema primeiro.',
        cliente: 'Equipe interna',
        empresa: 'Registro de bastidores',
        foto: 'photos/equipe-reuniao-escritorio.jpg',
        fotoPosition: 'center 30%',
      },
    },
  },
  {
    compositionId: 'Depoimento',
    outName: 'RoundF-Depoimento-contexto-foto-avalia',
    props: {
      theme: 'avalia',
      slide: {
        kind: 'contexto',
        corpo: 'Antes eu decidia pela intuição. Hoje reviso o relatório antes de qualquer mudança de operação.',
        foto: 'photos/analista-relatorios-mesa.jpg',
        fotoPosition: 'center 25%',
      },
    },
  },
  {
    compositionId: 'Bastidores',
    outName: 'RoundF-Bastidores-manifesto-foto',
    props: {
      titulo: 'Não recomendamos nada antes de ver o dado.',
      principios: [
        'Todo diagnóstico começa medindo o que já existe, não achando.',
        'Nenhuma solução entra sem um número que comprove que ela resolveu.',
        'Se o processo não é repetível, não é método — é sorte.',
      ],
      foto: 'photos/equipe-reuniao-escritorio.jpg',
      fotoPosition: 'center 35%',
    },
  },
  {
    compositionId: 'DicaPratica',
    outName: 'RoundF-DicaPratica-coverFoto-estoque',
    props: {
      slide: {
        kind: 'cover-foto',
        titulo: 'O estoque parado custa mais do que parece.',
        tagNumero: 'Dica 01',
        foto: 'photos/corredor-empilhadeira-estoque.jpg',
        fotoPosition: 'center 35%',
      },
    },
  },
];

for (const item of BATCH) {
  console.log(`Renderizando ${item.outName}...`);
  renderStill({
    compositionId: item.compositionId,
    props: item.props,
    outPath: `out/qa/round-f/${item.outName}.png`,
  });
}

console.log(`\n${BATCH.length} renders do Round F concluídos em out/qa/round-f/`);
