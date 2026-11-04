import path from 'node:path';
import {readdir, unlink} from 'node:fs/promises';
import {bundle} from '@remotion/bundler';
import {renderMedia, renderStill, selectComposition} from '@remotion/renderer';

const output = path.resolve('conteudo ntb/02-carrosseis/Norte Estoque - Planilha no controle');
const slides = [
  {n:1,title:'Capa',still:'Comparativo01'},
  {n:2,title:'Saldo e versoes',still:'Comparativo02'},
  {n:3,title:'Inventario',still:'Comparativo03',video:'Comparativo03Animada'},
  {n:4,title:'Identificacao',still:'Comparativo04'},
  {n:5,title:'Transferencias',still:'Comparativo05',video:'Comparativo05Animada'},
  {n:6,title:'Visao do estoque',still:'Comparativo06'},
  {n:7,title:'Fechamento',still:'Comparativo07'},
];
const staleSlides = (await readdir(output)).filter((name) => /^\d{2} - .+\.(png|mp4)$/i.test(name));
await Promise.all(staleSlides.map((name) => unlink(path.join(output, name))));
const serveUrl = await bundle({entryPoint:path.resolve('src/templates/NorteEstoqueComparativo.tsx')});
for (const slide of slides) {
  const prefix = `${String(slide.n).padStart(2,'0')} - ${slide.title}`;
  const still = await selectComposition({serveUrl,id:slide.still});
  await renderStill({composition:still,serveUrl,output:path.join(output,`${prefix}.png`),overwrite:true});
  if (slide.video) {
    const animation = await selectComposition({serveUrl,id:slide.video});
    await renderMedia({composition:animation,serveUrl,outputLocation:path.join(output,`${prefix} animado.mp4`),codec:'h264',crf:21,overwrite:true});
  }
}
console.log(`Renderizados ${slides.length} slides; ${slides.filter((slide)=>slide.video).length} com animação.`);
