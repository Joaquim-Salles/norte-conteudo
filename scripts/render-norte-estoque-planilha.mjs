import path from 'node:path';
import {readdir, unlink} from 'node:fs/promises';
import {bundle} from '@remotion/bundler';
import {renderMedia, renderStill, selectComposition} from '@remotion/renderer';

const output = path.resolve('conteudo ntb/02-carrosseis/Norte Estoque - Planilha no controle');
const slides = [
  {n:1,title:'Capa',still:'Planilha01'},
  {n:2,title:'Versoes diferentes',still:'Planilha02'},
  {n:3,title:'Atualizacao adiada',still:'Planilha03',video:'Planilha03Animada'},
  {n:4,title:'Conferencia manual',still:'Planilha04'},
  {n:5,title:'Norte Estoque',still:'Planilha05'},
  {n:6,title:'Visao geral do estoque',still:'Planilha06'},
  {n:7,title:'Inventario com QR Code',still:'Planilha07',video:'Planilha07Animada'},
  {n:8,title:'Produto identificado',still:'Planilha08'},
  {n:9,title:'Transferencia registrada',still:'Planilha09',video:'Planilha09Animada'},
  {n:10,title:'Fechamento',still:'Planilha10'},
];
const staleSlides = (await readdir(output)).filter((name) => /^\d{2} - .+\.(png|mp4)$/i.test(name));
await Promise.all(staleSlides.map((name) => unlink(path.join(output, name))));
const serveUrl = await bundle({entryPoint:path.resolve('src/templates/NorteEstoquePlanilha.tsx')});
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
