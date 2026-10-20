import path from 'node:path';
import {bundle} from '@remotion/bundler';
import {renderMedia, renderStill, selectComposition} from '@remotion/renderer';

const output = path.resolve('conteudo ntb/02-carrosseis/Norte Estoque - Inventario e movimentacao');
const slides = [
  {number: 1, title: 'Capa', still: 'NorteEstoqueQR01'},
  {number: 2, title: 'Inventario com QR Code', still: 'NorteEstoqueQR02', video: 'NorteEstoqueQRAnimada02'},
  {number: 3, title: 'Leitura do QR Code no alimento', still: 'NorteEstoqueQR03', video: 'NorteEstoqueQRAnimada03'},
  {number: 4, title: 'Etiquetas com lote e validade', still: 'NorteEstoqueQR04'},
  {number: 5, title: 'Registro no inventario', still: 'NorteEstoqueQR05', video: 'NorteEstoqueQRAnimada05'},
  {number: 6, title: 'Transferencias em massa', still: 'NorteEstoqueQR06', video: 'NorteEstoqueQRAnimada06'},
  {number: 7, title: 'Fechamento', still: 'NorteEstoqueQR07'},
];

const serveUrl = await bundle({
  entryPoint: path.resolve('src/index.ts'),
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
