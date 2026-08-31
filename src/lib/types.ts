/** Tipos de dado dos 5 templates — populados pelo parser do brief mensal (scripts/parse-brief.mjs). */

export type ProductKey = 'ntbEstoque' | 'ntbVendas' | 'norteAvalia' | null;

export type DadoVsAchismoData = {
  achismo: string;
  dado: string;
  fonteDado?: string;
};

export type DicaPraticaSlide =
  | {kind: 'cover'; titulo: string; tagNumero?: string}
  | {kind: 'bridge'; numero: number; total: number; titulo: string; corpo: string}
  | {kind: 'cta'; headline?: string};

export type DicaPraticaData = {
  slides: DicaPraticaSlide[];
};

export type AntesDepoisData = {
  antesLabel?: string;
  antesTexto: string;
  depoisLabel?: string;
  depoisTexto: string;
  metrica?: string;
};

export type VitrineProdutoData = {
  produto: Exclude<ProductKey, null>;
  nomeProduto: string;
  headline: string;
  features: string[];
  ctaLabel?: string;
};

export type MetodologiaSlide =
  | {kind: 'cover'; titulo: string; metodo?: string}
  | {kind: 'passo'; numero: number; total: number; titulo: string; descricao: string}
  | {kind: 'cta'; headline?: string};

export type MetodologiaData = {
  slides: MetodologiaSlide[];
};
