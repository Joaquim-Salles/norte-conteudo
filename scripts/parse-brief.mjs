#!/usr/bin/env node
import {readFileSync} from 'node:fs';
import matter from 'gray-matter';

/**
 * Parser do brief mensal — norte-conteudo/calendario/{ano}-{mes}.md
 *
 * FORMATO PROVISORIO (nenhum brief real recebido ainda, ver first-tasks.md T1-T3):
 * front-matter YAML com uma lista `pecas`, cada uma com `tipo` (um dos 5 templates)
 * + os campos que o template espera. Ajustar este parser assim que o primeiro
 * brief real do fundador/marketing chegar — o formato exato deles pode nao bater
 * 100% com esse chute inicial.
 *
 * Exemplo minimo:
 *
 * ---
 * pecas:
 *   - tipo: dado-vs-achismo
 *     data: 2026-09-03
 *     achismo: "..."
 *     dado: "..."
 *   - tipo: dica-pratica
 *     data: 2026-09-05
 *     slides:
 *       - kind: cover
 *         titulo: "..."
 * ---
 */

const TIPO_TO_COMPOSITION = {
  'dado-vs-achismo': 'DadoVsAchismo',
  'dica-pratica': 'DicaPratica',
  'antes-depois': 'AntesDepois',
  'vitrine-produto': 'VitrineProduto',
  metodologia: 'MetodologiaSemEnrolacao',
};

export function parseBrief(filePath) {
  const raw = readFileSync(filePath, 'utf-8');
  const {data} = matter(raw);
  const pecas = data.pecas ?? [];

  return pecas.map((peca, i) => {
    const {tipo, data: dataPeca, ...props} = peca;
    const compositionId = TIPO_TO_COMPOSITION[tipo];
    if (!compositionId) {
      throw new Error(
        `Peca #${i + 1}: tipo "${tipo}" desconhecido. Tipos validos: ${Object.keys(TIPO_TO_COMPOSITION).join(', ')}`,
      );
    }

    if (tipo === 'dica-pratica' || tipo === 'metodologia') {
      // Carrossel: 1 Still por slide.
      return (props.slides ?? []).map((slide, slideIndex) => ({
        compositionId,
        props: {slide},
        meta: {data: dataPeca, tipo, slideIndex},
      }));
    }

    return [{compositionId, props, meta: {data: dataPeca, tipo}}];
  }).flat();
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error('Uso: node scripts/parse-brief.mjs calendario/2026-09.md');
    process.exit(1);
  }
  const pieces = parseBrief(filePath);
  console.log(JSON.stringify(pieces, null, 2));
}
