import path from 'node:path';
import {bundle} from '@remotion/bundler';
import {renderMedia, renderStill, selectComposition} from '@remotion/renderer';

const output = path.resolve('conteudo ntb/02-carrosseis/Norte Estoque - Estoque sob controle');
const slides = [
  {number: 1, title: 'Capa', still: 'NorteEstoqueApresentacao01'},
  {number: 2, title: 'Inventário por QR Code', still: 'NorteEstoqueApresentacao02', video: 'NorteEstoqueApresentacaoAnimada02'},
  {number: 3, title: 'Conferência acompanhada', still: 'NorteEstoqueApresentacao03', video: 'NorteEstoqueApresentacaoAnimada03'},
  {number: 4, title: 'Etiquetas de lote e validade', still: 'NorteEstoqueApresentacao04', video: 'NorteEstoqueApresentacaoAnimada04'},
  {number: 5, title: 'Transferências em massa', still: 'NorteEstoqueApresentacao05', video: 'NorteEstoqueApresentacaoAnimada05'},
  {number: 6, title: 'Acompanhamento da produção', still: 'NorteEstoqueApresentacao06', video: 'NorteEstoqueApresentacaoAnimada06'},
  {number: 7, title: 'Fechamento', still: 'NorteEstoqueApresentacao07'},
];

const serveUrl = await bundle({
  entryPoint: path.resolve('src/NorteEstoqueApresentacaoEntry.tsx'),
  onProgress: (value) => process.stdout.write(`Bundling ${Math.round(value)}%\r`),
});
process.stdout.write('\n');

for (const slide of slides) {
  const prefix = `${String(slide.number).padStart(2, '0')} - ${slide.title}`;
  const stillComposition = await selectComposition({serveUrl, id: slide.still});
  await renderStill({composition: stillComposition, serveUrl, output: path.join(output, `${prefix}.png`), overwrite: true});
  if (slide.video) {
    const videoComposition = await selectComposition({serveUrl, id: slide.video});
    await renderMedia({
      composition: videoComposition,
      serveUrl,
      outputLocation: path.join(output, `${prefix} animado.mp4`),
      codec: 'h264',
      crf: 21,
      overwrite: true,
      onProgress: ({progress}) => process.stdout.write(`${prefix} animado ${Math.round(progress * 100)}%\r`),
    });
    process.stdout.write('\n');
  }
}

console.log(`Renderizado: ${slides.length} slides e ${slides.filter(({video}) => video).length} animacoes em ${output}`);
