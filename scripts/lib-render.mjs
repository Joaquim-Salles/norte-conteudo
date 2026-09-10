import {execFileSync} from 'node:child_process';
import {mkdtempSync, writeFileSync, mkdirSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';

/**
 * Renderiza um Still do Remotion pra PNG.
 *
 * IMPORTANTE (achado no QA visual de 2026-08-30): NUNCA passar --props='{...}'
 * como string inline no shell. Acentos/cedilha (ã, ç, á, ó, é) somem — bug de
 * encoding na passagem via argv, nao no Remotion. Sempre escrever os props num
 * arquivo .json temporario e passar --props=/caminho/arquivo.json.
 */
export function renderStill({compositionId, props, outPath, entry = 'src/index.ts'}) {
  mkdirSync(path.dirname(outPath), {recursive: true});

  const args = ['remotion', 'still', entry, compositionId, outPath, '--overwrite'];

  // Sem `props` -> usa o defaultProps registrado no Root.tsx pra essa composicao.
  if (props !== undefined) {
    const dir = mkdtempSync(path.join(tmpdir(), 'norte-conteudo-props-'));
    const propsPath = path.join(dir, 'props.json');
    writeFileSync(propsPath, JSON.stringify(props), 'utf-8');
    args.push(`--props=${propsPath}`);
  }

  execFileSync('npx', args, {stdio: 'inherit'});
}

/**
 * Renderiza uma Composition (Reel) pra MP4 — equivalente de `renderStill`
 * pra video (Round C, 2026-09-01: primeira vez que o pipeline precisa
 * renderizar MP4 de verdade, nao so PNG). Mesmo cuidado de props via arquivo
 * JSON temporario (bug de encoding de acentos ja documentado em
 * `renderStill`). `durationInFrames` NAO e passado aqui — as 3 Compositions
 * de Reel usam `calculateMetadata` (ver Root.tsx) pra recalcular a duracao
 * real a partir de `motionStyle`/quantidade de itens, entao o CLI resolve
 * isso sozinho a partir dos props.
 */
export function renderVideo({compositionId, props, outPath}) {
  mkdirSync(path.dirname(outPath), {recursive: true});

  const args = ['remotion', 'render', 'src/index.ts', compositionId, outPath, '--overwrite', '--codec=h264'];

  if (props !== undefined) {
    const dir = mkdtempSync(path.join(tmpdir(), 'norte-conteudo-props-'));
    const propsPath = path.join(dir, 'props.json');
    writeFileSync(propsPath, JSON.stringify(props), 'utf-8');
    args.push(`--props=${propsPath}`);
  }

  execFileSync('npx', args, {stdio: 'inherit'});
}
