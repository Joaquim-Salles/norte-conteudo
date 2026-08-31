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
 * CORRIGIDO em 2026-08-30: a raspagem inicial do site apontou pesos 400-800, o que
 * levou a usar a familia sucessora "Atkinson Hyperlegible Next" (mesmo design, mais
 * pesos). O fundador confirmou visualmente e checou o <link> de fontes do HTML/JS de
 * producao ao vivo: o site so carrega a familia CLASSICA "Atkinson Hyperlegible", nos
 * pesos 400 e 700, normal e italico (ital,wght@0,400;0,700;1,400;1,700). Nao existe
 * 500/600/800/900 no site real. Arquivos abaixo vem do pacote oficial
 * @fontsource/atkinson-hyperlegible (subset "latin", que cobre os caracteres do
 * portugues — ã, õ, ç, á, é etc.), copiados pra public/fonts/ pra manter a fonte
 * embutida no projeto.
 */
let loaded = false;

const FONT_FILES: Array<[number, 'normal' | 'italic', string]> = [
  [400, 'normal', 'AtkinsonHyperlegible-400.woff2'],
  [400, 'italic', 'AtkinsonHyperlegible-400-italic.woff2'],
  [700, 'normal', 'AtkinsonHyperlegible-700.woff2'],
  [700, 'italic', 'AtkinsonHyperlegible-700-italic.woff2'],
];

export const ensureBrandFontLoaded = (): void => {
  if (loaded) return;
  loaded = true;
  if (typeof document === 'undefined') return;

  const handle = delayRender('Carregando fonte da marca (Atkinson Hyperlegible)');

  const loadPromises = FONT_FILES.map(([weight, style, file]) => {
    const face = new FontFace('Atkinson Hyperlegible', `url("${staticFile(`fonts/${file}`)}")`, {
      weight: String(weight),
      style,
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
