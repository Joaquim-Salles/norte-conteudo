import {continueRender, delayRender, staticFile} from 'remotion';

/**
 * Fonte da marca, embutida localmente (constraint: fontes DEVEM estar no projeto,
 * nao via CDN, senao o render fica nao-deterministico — ver constraints-plataforma.md).
 *
 * Usa a FontFace API + delayRender/continueRender do Remotion pra GARANTIR que o
 * arquivo terminou de carregar antes do frame ser capturado — um simples <style>
 * com @font-face nao e suficiente (fetch e assincrono mesmo servindo local, entao
 * sem esse gate o primeiro frame pode capturar a fonte de fallback do sistema).
 *
 * Nota tecnica p/ o fundador: a familia classica "Atkinson Hyperlegible" so existe em
 * pesos 400/700. Os pesos documentados em design-tokens.md (400-800) batem com a familia
 * sucessora "Atkinson Hyperlegible Next" (mesmo design, mais pesos), entao usamos os
 * arquivos da Next e mantemos o nome de familia "Atkinson Hyperlegible" no CSS pra nao
 * acoplar o codigo a essa escolha. Confirmar com o fundador se e essa a intencao.
 */
let loaded = false;

const WEIGHT_FILES: Array<[number, string]> = [
  [400, 'AtkinsonHyperlegibleNext-400.ttf'],
  [500, 'AtkinsonHyperlegibleNext-500.ttf'],
  [600, 'AtkinsonHyperlegibleNext-600.ttf'],
  [700, 'AtkinsonHyperlegibleNext-700.ttf'],
  [800, 'AtkinsonHyperlegibleNext-800.ttf'],
];

export const ensureBrandFontLoaded = (): void => {
  if (loaded) return;
  loaded = true;
  if (typeof document === 'undefined') return;

  const handle = delayRender('Carregando fonte da marca (Atkinson Hyperlegible)');

  const loadPromises = WEIGHT_FILES.map(([weight, file]) => {
    const face = new FontFace('Atkinson Hyperlegible', `url("${staticFile(`fonts/${file}`)}")`, {
      weight: String(weight),
      style: 'normal',
    });
    document.fonts.add(face);
    return face.load();
  });

  Promise.all(loadPromises)
    .then(() => continueRender(handle))
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error('Falha ao carregar fonte da marca:', err);
      continueRender(handle);
    });
};
