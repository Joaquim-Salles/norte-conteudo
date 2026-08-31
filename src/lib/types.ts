/** Tipos de dado dos 5 templates — populados pelo parser do brief mensal (scripts/parse-brief.mjs). */

import type {ThemeName} from './themes';

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
  /** Tema de paleta (sistema/produto ou marca geral). Default: 'marca'. */
  theme?: ThemeName;
};

export type DicaPraticaSlide =
  | {kind: 'cover'; titulo: string; tagNumero?: string}
  | {kind: 'cover-grid'; titulo: string; tagNumero?: string; itens: string[]}
  | {kind: 'cover-quote'; titulo: string; citacao: string}
  | {
      /**
       * Cover editorial/lifestyle — foto real de restaurante/comida em tela
       * cheia (public/photos/, ver CREDITOS.md) com overlay de gradiente
       * escuro pra legibilidade, em vez de fundo de cor solida. Pedido do
       * fundador (2026-08-31): "mais opções com fotos reais do restaurante".
       */
      kind: 'cover-foto';
      titulo: string;
      tagNumero?: string;
      /** Caminho relativo em public/ (ex: 'photos/restaurante-ambiente-noturno.jpg'). */
      foto: string;
      /** object-position CSS pra controlar o crop da foto. Default: 'center 15%'. */
      fotoPosition?: string;
    }
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
  /** Tema de paleta (sistema/produto ou marca geral). Default: 'marca'. */
  theme?: ThemeName;
};

export type VitrineProdutoVariant = 'padrao' | 'hero' | 'grid' | 'print' | 'contexto';

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
   * print: screenshot real do sistema dentro de uma moldura de device (celular ou
   * browser), com sombra/perspectiva sutil — "prova visual" em vez de so icone+texto.
   * contexto (novo, 2026-08-31): foto REAL de ambiente/comida do restaurante
   * como fundo de tela cheia (public/photos/) + mockup do celular com print
   * real do sistema sobreposto — "prova visual" completa (foto real + produto
   * real na mesma peca). Pedido do fundador pra reforcar NTB Vendas (Cardapio
   * Digital) resolvendo um problema de restaurante de verdade.
   */
  variant?: VitrineProdutoVariant;
  /** Usado so na variant 'print'/'contexto' — arquivo em public/screenshots/ (ver staticFile). */
  screenshot?: string;
  /** Usado so na variant 'print'/'contexto'. 'phone' = moldura de celular, 'browser' = moldura de navegador. */
  device?: 'phone' | 'browser';
  /**
   * Usado so na variant 'print'/'contexto'. Proporcao (largura/altura) real do arquivo em
   * `screenshot` (phone) ou da moldura desejada (browser) — evita `objectFit:
   * cover` cortar conteudo real da UI quando o screenshot tem proporcao atipica.
   * Ver src/lib/DeviceFrame.tsx.
   */
  screenshotAspect?: number;
  /** Usado so na variant 'contexto' — caminho relativo em public/ pra foto real de ambiente/comida (ver public/photos/CREDITOS.md). */
  foto?: string;
  /** Usado so na variant 'contexto' — object-position CSS pra controlar o crop da foto. */
  fotoPosition?: string;
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

/**
 * CoverFotoReal (novo, 2026-08-31) — peca exploratoria de "prova social"/
 * contexto: foto real de restaurante (mesa posta, prato servido, movimento de
 * salao) como fundo de tela cheia, servindo de abertura/cover pra um
 * carrossel sobre um produto (tipicamente NTB Vendas/Cardapio Digital). Nao e
 * um dos "5 tipos de post" da Fase 0 — e uma exploracao pontual pedida pelo
 * fundador ("bora explorar" fotos reais), documentada a parte no CATALOGO.md.
 */
/**
 * Reel (Composition, não Still) — versão animada do template 1, ver
 * src/templates/DadoVsAchismoReel.tsx. `percentual` é numérico (não string)
 * porque o Reel faz "count-up" de verdade (0 até o valor) — não dá pra
 * animar contagem de um texto livre como no Still.
 */
export type DadoVsAchismoReelData = {
  achismo: string;
  percentual: number;
  dadoTexto: string;
  fonteDado?: string;
  theme?: ThemeName;
};

/**
 * Reel (Composition) — versão animada do template 5, ver
 * src/templates/MetodologiaReel.tsx. `passos` populam o tracker de
 * progresso animado (mesmo papel do carrossel Still, comprimido num único
 * vídeo com transição entre etapas).
 */
export type MetodologiaReelStep = {titulo: string; descricao: string};

export type MetodologiaReelData = {
  metodo?: string;
  titulo: string;
  passos: MetodologiaReelStep[];
};

export type CoverFotoRealData = {
  titulo: string;
  tagNumero?: string;
  /** Caminho relativo em public/ (ver public/photos/CREDITOS.md). */
  foto: string;
  /** object-position CSS pra controlar o crop da foto. Default: 'center 15%'. */
  fotoPosition?: string;
  /** Tema de paleta (sistema/produto ou marca geral) — define a cor do badge/eyebrow. Default: 'marca'. */
  theme?: ThemeName;
};
