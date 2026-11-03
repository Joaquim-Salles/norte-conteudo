import path from 'node:path';
import {bundle} from '@remotion/bundler';
import {renderMedia, renderStill, selectComposition} from '@remotion/renderer';

const output = path.resolve('conteudo ntb/02-carrosseis/Norte Estoque - Planilha no controle');
const slides = [
  {n:1,title:'Capa',still:'Planilha01'},
  {n:2,title:'Versoes diferentes',still:'Planilha02'},
  {n:3,title:'Atualizacao adiada',still:'Planilha03',video:'Planilha03Animada'},
  {n:4,title:'Conferencia manual',still:'Planilha04'},
  {n:5,title:'Norte Estoque',still:'Planilha05'},
  {n:6,title:'Inventario com QR Code',still:'Planilha06',video:'Planilha06Animada'},
  {n:7,title:'Produto identificado',still:'Planilha07'},
  {n:8,title:'Transferencia registrada',still:'Planilha08',video:'Planilha08Animada'},
  {n:9,title:'Fechamento',still:'Planilha09'},
];
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
