#!/usr/bin/env node
import {renderStill} from './lib-render.mjs';

/**
 * QA visual dos 5 tipos de post + variacoes, com props explicitas — inspirado
 * no padrao qa-screenshot.mjs/qa-visual-completo.mjs dos repos NTB
 * (audit-2026-08-30.md). Gera 1 PNG por estado em out/qa/ pra revisao antes de
 * qualquer publicacao (Checklist #8, Regra Inviolavel #1: nada sai sem preview
 * revisado).
 *
 * FIX 2026-08-30: a versao anterior deste script renderizava so o defaultProps
 * (sem --props) de cada composicao. Pra DadoVsAchismo/AntesDepois/VitrineProduto
 * (posts de 1 imagem so) isso e suficiente. Mas pra DicaPratica e
 * MetodologiaSemEnrolacao — que sao CARROSSEIS de 3 slides (cover/bridge-ou-
 * passo/cta) — o defaultProps so cobre o slide "cover", que por design nao tem
 * corpo nem CTA (isso fica nos outros 2 slides). Resultado: a galeria QA dava a
 * falsa impressao de que a peca Metodologia estava quebrada/incompleta, porque
 * so mostrava 1/3 do carrossel de verdade. Agora este script renderiza os 3
 * estados de cada carrossel (+ todas as variacoes de cover), entao a galeria
 * reflete o post inteiro antes de qualquer aprovacao.
 */

const QA_MATRIX = [
  // --- Template 1: Dado vs Achismo (post unico, 3 variacoes de layout) ---
  {compositionId: 'DadoVsAchismo', outName: 'DadoVsAchismo-padrao', props: {variant: 'padrao'}},
  {compositionId: 'DadoVsAchismo', outName: 'DadoVsAchismo-impacto', props: {variant: 'impacto'}},
  {compositionId: 'DadoVsAchismo', outName: 'DadoVsAchismo-ladoALado', props: {variant: 'ladoALado'}},

  // --- Template 2: Dica Pratica (carrossel — todos os covers + bridge + cta) ---
  {
    compositionId: 'DicaPratica',
    outName: 'DicaPratica-cover',
    props: {slide: {kind: 'cover', titulo: '3 erros que travam seu estoque', tagNumero: '3 ERROS'}},
  },
  {
    compositionId: 'DicaPratica',
    outName: 'DicaPratica-cover-grid',
    props: {
      slide: {
        kind: 'cover-grid',
        titulo: '3 erros que travam seu estoque',
        tagNumero: '3 ERROS',
        itens: [
          'Contar estoque de cabeça, sem QR code',
          'Não separar lote/validade na etiqueta',
          'Zero perfil de acesso pra ajuste sensível',
        ],
      },
    },
  },
  {
    compositionId: 'DicaPratica',
    outName: 'DicaPratica-cover-quote',
    props: {
      slide: {
        kind: 'cover-quote',
        citacao: 'Se ninguém sabe onde está o produto, o problema não é o estoque — é o processo.',
        titulo: '3 erros que travam seu estoque',
      },
    },
  },
  {
    compositionId: 'DicaPratica',
    outName: 'DicaPratica-cover-foto',
    props: {
      slide: {
        kind: 'cover-foto',
        titulo: 'O que muda quando o cliente vê o cardápio no celular',
        tagNumero: 'CARDÁPIO DIGITAL',
        foto: 'photos/restaurante-ambiente-noturno.jpg',
      },
    },
  },
  {
    compositionId: 'DicaPratica',
    outName: 'DicaPratica-bridge',
    props: {
      slide: {
        kind: 'bridge',
        numero: 1,
        total: 3,
        titulo: 'Contar de cabeça',
        corpo: 'Sem QR code, todo inventário vira retrabalho e a margem de erro sobe junto com o estresse do time.',
      },
    },
  },
  {
    compositionId: 'DicaPratica',
    outName: 'DicaPratica-cta',
    props: {slide: {kind: 'cta'}},
  },

  // --- Template 3: Antes/Depois (post unico, 3 variacoes) ---
  {compositionId: 'AntesDepois', outName: 'AntesDepois-padrao', props: {variant: 'padrao'}},
  {compositionId: 'AntesDepois', outName: 'AntesDepois-ladoALado', props: {variant: 'ladoALado'}},
  {compositionId: 'AntesDepois', outName: 'AntesDepois-metricaHero', props: {variant: 'metricaHero'}},

  // --- Template 4: Vitrine de Produto (post unico, 3 variacoes) ---
  {compositionId: 'VitrineProduto', outName: 'VitrineProduto-padrao', props: {variant: 'padrao'}},
  {compositionId: 'VitrineProduto', outName: 'VitrineProduto-hero', props: {variant: 'hero'}},
  {compositionId: 'VitrineProduto', outName: 'VitrineProduto-grid', props: {variant: 'grid'}},
  {
    compositionId: 'VitrineProduto',
    outName: 'VitrineProduto-contexto',
    props: {
      produto: 'ntbVendas',
      nomeProduto: 'NTB Vendas',
      headline: 'O cardápio que seu cliente vê antes de sentar na mesa.',
      features: [],
      variant: 'contexto',
    },
  },

  // --- Template 5: Metodologia sem Enrolação (carrossel — todos os covers + passo + cta) ---
  {
    compositionId: 'MetodologiaSemEnrolacao',
    outName: 'MetodologiaSemEnrolacao-cover',
    props: {slide: {kind: 'cover', titulo: 'PDCA aplicado ao seu estoque', metodo: 'Metodologia'}},
  },
  {
    compositionId: 'MetodologiaSemEnrolacao',
    outName: 'MetodologiaSemEnrolacao-cover-roadmap',
    props: {
      slide: {
        kind: 'cover-roadmap',
        titulo: 'PDCA aplicado ao seu estoque',
        metodo: 'Metodologia',
        etapas: ['Plan — diagnóstico do estoque atual', 'Do — aplica o ajuste na prática', 'Check — mede o resultado real', 'Act — trava o que funcionou'],
      },
    },
  },
  {
    compositionId: 'MetodologiaSemEnrolacao',
    outName: 'MetodologiaSemEnrolacao-cover-editorial',
    props: {
      slide: {
        kind: 'cover-editorial',
        titulo: 'PDCA aplicado ao seu estoque',
        subtitulo: 'Método, não achismo — 4 etapas pra parar de apagar incêndio todo mês.',
      },
    },
  },
  {
    compositionId: 'MetodologiaSemEnrolacao',
    outName: 'MetodologiaSemEnrolacao-passo',
    props: {
      slide: {
        kind: 'passo',
        numero: 1,
        total: 4,
        titulo: 'Plan',
        descricao: 'Diagnóstico rápido: onde o estoque mais diverge do sistema hoje.',
      },
    },
  },
  {
    compositionId: 'MetodologiaSemEnrolacao',
    outName: 'MetodologiaSemEnrolacao-cta',
    props: {slide: {kind: 'cta'}},
  },

  // --- Peça exploratória: CoverFotoReal (foto real, "prova social"/abertura) ---
  {compositionId: 'CoverFotoReal', outName: 'CoverFotoReal-vendas'},
];

for (const {compositionId, outName, props} of QA_MATRIX) {
  const outPath = `out/qa/${outName}.png`;
  console.log(`QA: ${compositionId} (${outName}) -> ${outPath}`);
  renderStill({compositionId, props, outPath});
}

console.log(`\n${QA_MATRIX.length} preview(s) gerados em out/qa/. Revisar cada um manualmente antes de aprovar.`);
