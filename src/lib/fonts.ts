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
let serifLoaded = false;

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

/**
 * Serifada pro preset `editorialClaude` (2026-09-05, ver visualStyles.ts —
 * 3ª tentativa do estilo "editorial documental" do @claudeai, referência
 * agora são 3 screenshots REAIS da grade, não mais pesquisa por texto).
 *
 * Não dá pra licenciar a serifada real da Anthropic (Tiempos/Copernicus,
 * "Anthropic Serif" — pagas, de terceiro). Escolhida **Source Serif 4**
 * (Google Fonts / Adobe, licença OFL, embutida localmente via
 * @fontsource/source-serif-4 — mesmo padrão de embedding local já usado
 * pra Atkinson Hyperlegible, constraint de determinismo de render).
 * Por quê essa e não outra: é uma serifada de TEXTO (transitional/old-style,
 * mesma família genealógica de Times/Caslon que informa o desenho da
 * Tiempos real da Anthropic) — traços com contraste alto/baixo moderado,
 * terminais discretos, nada "de exibição"/decorativo (descarta opções tipo
 * Playfair/Fraunces, que teriam personalidade DEMAIS e competiriam com a
 * foto em vez de coexistir discretamente, o oposto do que a referência
 * real mostra). Pesos 400 (corpo/legenda) e 700 (headline) cobrem os dois
 * usos vistos nos 3 screenshots.
 */
const SERIF_FONT_FILES: Array<[number, string]> = [
  [400, 'SourceSerif4-400.woff2'],
  [700, 'SourceSerif4-700.woff2'],
];

export const ensureEditorialSerifLoaded = (): void => {
  if (serifLoaded) return;
  serifLoaded = true;
  if (typeof document === 'undefined') return;

  const handle = delayRender('Carregando fonte serifada (Source Serif 4, preset editorialClaude)');

  const loadPromises = SERIF_FONT_FILES.map(([weight, file]) => {
    const face = new FontFace('Source Serif 4', `url("${staticFile(`fonts/${file}`)}")`, {
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
      console.error('Falha ao carregar fonte serifada editorialClaude:', err);
      continueRender(handle);
    });
};
