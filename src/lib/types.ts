/** Tipos de dado dos 5 templates — populados pelo parser do brief mensal (scripts/parse-brief.mjs). */

export type ProductKey = 'ntbEstoque' | 'ntbVendas' | 'norteAvalia' | null;

export type DadoVsAchismoVariant = 'padrao' | 'impacto' | 'ladoALado';

export type DadoVsAchismoData = {
  achismo: string;
  dado: string;
  fonteDado?: string;
  /**
   * padrao: split horizontal 420/930, dado ocupa a maior parte de baixo.
   * impacto: achismo vira tarja fina no topo, o numero do dado domina quase a tela toda.
   * ladoALado: split vertical esquerda (achismo) / direita (dado), leitura mais editorial.
   */
  variant?: DadoVsAchismoVariant;
};

export type DicaPraticaSlide =
  | {kind: 'cover'; titulo: string; tagNumero?: string}
  | {kind: 'cover-grid'; titulo: string; tagNumero?: string; itens: string[]}
  | {kind: 'cover-quote'; titulo: string; citacao: string}
  | {kind: 'bridge'; numero: number; total: number; titulo: string; corpo: string}
  | {kind: 'cta'; headline?: string};

export type DicaPraticaData = {
  slides: DicaPraticaSlide[];
};

export type AntesDepoisVariant = 'padrao' | 'ladoALado' | 'metricaHero';

export type AntesDepoisData = {
  antesLabel?: string;
  antesTexto: string;
  depoisLabel?: string;
  depoisTexto: string;
  metrica?: string;
  /**
   * padrao: split horizontal topo/base.
   * ladoALado: split vertical esquerda (antes) / direita (depois).
   * metricaHero: a metrica vira o elemento gigante central, antes/depois viram legendas curtas.
   */
  variant?: AntesDepoisVariant;
};

export type VitrineProdutoVariant = 'padrao' | 'hero' | 'grid';

export type VitrineProdutoData = {
  produto: Exclude<ProductKey, null>;
  nomeProduto: string;
  headline: string;
  features: string[];
  ctaLabel?: string;
  /**
   * padrao: identidade no topo + lista vertical de features (cards compactos).
   * hero: identidade/headline centralizadas e grandes, features viram pilulas horizontais.
   * grid: features em grade 2x2 (bento), cards com mais profundidade (double-bezel).
   */
  variant?: VitrineProdutoVariant;
};

export type MetodologiaSlide =
  | {kind: 'cover'; titulo: string; metodo?: string}
  | {kind: 'cover-roadmap'; titulo: string; metodo?: string; etapas: string[]}
  | {kind: 'cover-editorial'; titulo: string; subtitulo?: string}
  | {kind: 'passo'; numero: number; total: number; titulo: string; descricao: string}
  | {kind: 'cta'; headline?: string};

export type MetodologiaData = {
  slides: MetodologiaSlide[];
};
