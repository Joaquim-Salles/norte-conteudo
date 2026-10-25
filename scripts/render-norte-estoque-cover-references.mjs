import path from 'node:path';
import {mkdir} from 'node:fs/promises';
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';

const output = path.resolve('conteudo ntb/02-carrosseis/Norte Estoque - Referencias de capa');
const options = [
  {id: 'NorteEstoqueCapaBalanca', filename: '01 - Caderno com rasuras.png'},
  {id: 'NorteEstoqueCapaMapa', filename: '02 - Mapa rabiscado.png'},
  {id: 'NorteEstoqueCapaEtiqueta', filename: '03 - Anotacao que nao bate.png'},
  {id: 'NorteEstoqueCapaMedidor', filename: '04 - Tres sinais no dia a dia.png'},
];

await mkdir(output, {recursive: true});
const serveUrl = await bundle({
  entryPoint: path.resolve('src/coverReferences/index.tsx'),
  onProgress: (value) => process.stdout.write(`Bundling ${Math.round(value)}%\r`),
});
process.stdout.write('\n');

for (const option of options) {
  const composition = await selectComposition({serveUrl, id: option.id});
  await renderStill({composition, serveUrl, output: path.join(output, option.filename), overwrite: true});
  console.log(`Renderizada: ${option.filename}`);
}

console.log(`Quatro referências de capa renderizadas em ${output}`);
