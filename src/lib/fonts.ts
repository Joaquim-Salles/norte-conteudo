import {continueRender, delayRender, staticFile} from 'remotion';

/**
 * Par tipográfico alinhado ao site oficial: Newsreader (headline/citação/overlay)
 * + Geist Variable (corpo/dado/UI).
 * Fontes DEVEM estar embutidas no projeto (não CDN) — senão o render fica
 * não-determinístico (constraint documentada em constraints-plataforma.md).
 *
 * Usa a FontFace API + delayRender/continueRender pra garantir que o arquivo
 * terminou de carregar antes do frame ser capturado — um <style> com
 * @font-face sozinho não basta (fetch é assíncrono mesmo servindo local).
 */
let sansLoaded = false;
let serifLoaded = false;

type FontFile = [number | string, 'normal' | 'italic', string];

const SANS_FONT_FILES: FontFile[] = [
  [400, 'normal', 'GeistVariable-latin-ext.woff2'],
  [700, 'normal', 'GeistVariable-latin-ext.woff2'],
];

/**
 * 2026-09-05 — troca de serifada (feedback do fundador: Source Serif 4 bold
 * "pesada/genérica demais", pediu algo mais próximo da sensação editorial da
 * inspiração real (@claudeai, que usa Tiempos Headline/Copernicus — não
 * licenciáveis). Testadas 2 candidatas gratuitas via Google Fonts, comparadas
 * lado a lado nos mesmos slides: FRAUNCES venceu (ver CATALOGO.md pro
 * raciocínio da comparação). Newsreader fica comentada abaixo caso alguma
 * peça futura peça um tom mais "jornal americano" deliberadamente.
 */
const SERIF_FONT_FILES: Array<[number, 'normal' | 'italic', string]> = [
  [700, 'normal', 'Fraunces-700.woff2'],
  [700, 'italic', 'Fraunces-700-italic.woff2'],
  [400, 'italic', 'Fraunces-400-italic.woff2'],
];

// const SERIF_FONT_FILES_NEWSREADER: Array<[number, 'normal' | 'italic', string]> = [
//   [700, 'normal', 'Newsreader-700.woff2'],
//   [400, 'italic', 'Newsreader-400-italic.woff2'],
// ];

const MONO_FONT_FILES: FontFile[] = [
  [400, 'normal', 'GeistMonoVariable-latin-ext.woff2'],
  [700, 'normal', 'GeistMonoVariable-latin-ext.woff2'],
];

const SANS_FAMILY = 'Geist Variable';
const MONO_FAMILY = 'Geist Mono Variable';
export const FONT_SANS = 'Geist Variable, Arial, sans-serif';
export const FONT_MONO = 'Geist Mono Variable, Consolas, monospace';
export const FONT_SERIF = 'Fraunces';

function loadFamily(files: FontFile[], family: string, label: string): void {
  if (typeof document === 'undefined') return;
  const handle = delayRender(`Carregando fonte ${label}`);

  const loadPromises = files.map(([weight, style, file]) => {
    const face = new FontFace(family, `url("${staticFile(`fonts/${file}`)}")`, {
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
      console.error(`Falha ao carregar fonte ${label}:`, err);
      continueRender(handle);
    });
}

export const ensureSansLoaded = (): void => {
  if (sansLoaded) return;
  sansLoaded = true;
  loadFamily(SANS_FONT_FILES, SANS_FAMILY, 'Geist Variable');
};

let monoLoaded = false;
export const ensureMonoLoaded = (): void => {
  if (monoLoaded) return;
  monoLoaded = true;
  loadFamily(MONO_FONT_FILES, MONO_FAMILY, 'Geist Mono Variable');
};

export const ensureSerifLoaded = (): void => {
  if (serifLoaded) return;
  serifLoaded = true;
  loadFamily(SERIF_FONT_FILES, FONT_SERIF, 'Fraunces');
};

export const ensureFontsLoaded = (): void => {
  ensureSansLoaded();
  ensureMonoLoaded();
  ensureSerifLoaded();
};

/**
 * Newsreader — fonte serifada do template Rotas (2026-09-05). Comparada lado
 * a lado com Fraunces especificamente contra a referência "Campus Ambassador"
 * (o fundador pediu "aquela fonte" apontando pra ela pela 2ª vez — ver
 * CATALOGO.md pro comparativo com imagem). Fraunces tem terminais em bola e
 * curvas decorativas/quirky demais pra essa referência, que é uma serifada
 * clássica de jornal, alto contraste moderado, sem excentricidade — Newsreader
 * bateu Fraunces nessa comparação específica. Baixado o peso 400 normal que
 * faltava (só existiam 400-italic/700/700-italic de uma rodada anterior);
 * usado o subset latin-ext do Google Fonts pra garantir cobertura de
 * acentuação PT-BR (ê, ç, ã etc.).
 *
 * Mantido como fonte PRÓPRIA do Rotas (`FONT_SERIF_ROTAS`), sem substituir
 * `FONT_SERIF`/Fraunces global — o carrossel "Como um estoque organizado se
 * move" (EtapasDeEstoque) já foi fechado com Fraunces e está arquivado/pausado,
 * não faz sentido reabrir essa decisão sem necessidade.
 */
let newsreaderLoaded = false;
const NEWSREADER_FONT_FILES: Array<[number, 'normal' | 'italic', string]> = [
  [400, 'normal', 'Newsreader-400.woff2'],
  [400, 'italic', 'Newsreader-400-italic.woff2'],
  [700, 'normal', 'Newsreader-700.woff2'],
  [700, 'italic', 'Newsreader-700-italic.woff2'],
];
export const FONT_SERIF_ROTAS = 'Newsreader';
export const ensureNewsreaderLoaded = (): void => {
  if (newsreaderLoaded) return;
  newsreaderLoaded = true;
  loadFamily(NEWSREADER_FONT_FILES, FONT_SERIF_ROTAS, 'Newsreader');
};
