#!/usr/bin/env node
import {execFileSync} from 'node:child_process';
import fs from 'node:fs';

/**
 * Renderiza todas as composições cujo id começa com um prefixo.
 *  - ids terminados em "Anim" viram MP4 (H.264) e os demais viram PNG;
 *  - a saída vai para out/<pasta>/.
 *
 * Uso: npm run post -- NorteVendas norte-vendas
 * Depois de renderizar, ABRA os arquivos e confira (docs/GUIA-POSTS-NORTE.md §7).
 */
const [prefix, folder] = process.argv.slice(2);
if (!prefix || !folder) {
  console.error('Uso: npm run post -- <PrefixoDosIds> <pasta-em-out>');
  process.exit(1);
}

const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const run = (args) => execFileSync(npx, ['remotion', ...args], {stdio: ['ignore', 'pipe', 'inherit'], shell: process.platform === 'win32'}).toString();

const listing = run(['compositions', 'src/index.ts', '--quiet']);
const ids = listing
  .split(/\s+/)
  .filter((id) => id.startsWith(prefix));

if (ids.length === 0) {
  console.error(`Nenhuma composição com o prefixo "${prefix}". Registre em src/Root.tsx.`);
  process.exit(1);
}

const outDir = `out/${folder}`;
fs.mkdirSync(outDir, {recursive: true});

for (const id of ids) {
  const anim = id.endsWith('Anim');
  const out = `${outDir}/${id}.${anim ? 'mp4' : 'png'}`;
  console.log(`→ ${id} → ${out}`);
  run(anim ? ['render', 'src/index.ts', id, out, '--codec=h264'] : ['still', 'src/index.ts', id, out]);
}
console.log(`\nPronto: ${ids.length} arquivo(s) em ${outDir}/. Agora abra cada um e confira o checklist do guia.`);
