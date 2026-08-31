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
export function renderStill({compositionId, props, outPath}) {
  mkdirSync(path.dirname(outPath), {recursive: true});

  const args = ['remotion', 'still', 'src/index.ts', compositionId, outPath, '--overwrite'];

  // Sem `props` -> usa o defaultProps registrado no Root.tsx pra essa composicao.
  if (props !== undefined) {
    const dir = mkdtempSync(path.join(tmpdir(), 'norte-conteudo-props-'));
    const propsPath = path.join(dir, 'props.json');
    writeFileSync(propsPath, JSON.stringify(props), 'utf-8');
    args.push(`--props=${propsPath}`);
  }

  execFileSync('npx', args, {stdio: 'inherit'});
}
