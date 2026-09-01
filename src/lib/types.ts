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

/**
 * Template novo (2026-09-01) — Depoimento / Prova Social. Diferente de
 * Antes/Depois: ali a prova e uma METRICA nossa; aqui e a VOZ do cliente
 * (citacao real, em primeira pessoa) — pesquisa de mercado 2026 aponta esse
 * formato como o de maior converasao por confianca/salvamento (ver
 * CATALOGO.md, secao 6). IMPORTANTE: `citacao`/`corpo` DEVEM vir do brief
 * (cliente real, aspas reais) — Rafael nunca inventa depoimento de producao;
 * os defaultProps abaixo sao so placeholder ilustrativo de QA.
 */
export type DepoimentoSlide =
  | {kind: 'capa'; citacao: string; cliente: string; empresa?: string}
  | {
      /** Variante que abre pelo numero (metrica) antes da citacao — pro caso em que o resultado e o gancho mais forte. */
      kind: 'capa-metrica';
      metrica: string;
      metricaLabel: string;
      citacaoCurta: string;
      cliente: string;
      empresa?: string;
    }
  | {kind: 'contexto'; corpo: string}
  | {kind: 'resultado'; corpo: string; metrica?: string; produto?: ProductKey}
  | {kind: 'cta'; headline?: string};

export type DepoimentoData = {
  slides: DepoimentoSlide[];
  /** Tema de paleta — default 'marca'. Ver src/lib/themes.ts. */
  theme?: ThemeName;
};

/**
 * Template novo (2026-09-01) — Comparativo Direto (X vs Y). Diferente de
 * Dado vs. Achismo: ali se opoe uma CRENCA a um DADO (1 unico par); aqui se
 * comparam duas OPCOES concretas em varios atributos (jeito antigo x com a
 * Norte, planilha x sistema, generico x especifico) — pesquisa de mercado
 * 2026 aponta esse formato como o que melhor capta intencao de "fase de
 * pesquisa" (usuario decidindo entre alternativas).
 */
export type ComparativoItem = {label: string; a: string; b: string};

export type ComparativoVariant = 'colunas' | 'tabela';

export type ComparativoData = {
  tituloA: string;
  tituloB: string;
  /** Ate 4-5 linhas de comparacao (label + valor de cada lado) — mais que isso nao cabe com legibilidade. */
  itens: ComparativoItem[];
  /**
   * colunas: split vertical esquerda (A, apagado) / direita (B, cor do tema) — leitura rapida, poucos itens.
   * tabela: linhas horizontais com 2 colunas de valor — melhor pra mais itens/comparacao mais granular.
   */
  variant?: ComparativoVariant;
  /** Se a opcao B e um produto Norte, o tema vem automaticamente dele (ver getThemeForProduct). */
  produto?: ProductKey;
  /** Usado so quando `produto` NAO e informado (comparativo generico, sem produto especifico). Default 'marca'. */
  theme?: ThemeName;
};

/**
 * Template novo (2026-09-01) — Bastidores / Como Trabalhamos. Formato de
 * humanizacao/confianca (pesquisa 2026: reels/posts de bastidores convertem
 * por autenticidade, nao por push direto de venda) — aqui NAO e sobre o
 * cliente nem sobre um produto, e sobre o RIGOR INTERNO da Norte por tras de
 * qualquer recomendacao ("nao trabalhamos com achismos" como pratica, nao so
 * slogan). Decisao documentada (ver CATALOGO.md): CTA sempre suave/discreto
 * aqui, nunca o CtaBand cheio das outras pecas — o objetivo do formato e
 * confianca, nao conversao direta.
 */
export type BastidoresVariant = 'manifesto' | 'regraDaCasa';

export type BastidoresData = {
  eyebrow?: string;
  /** Afirmacao/principio central. */
  titulo: string;
  /** Usado so na variant 'manifesto' — 2-3 principios curtos que sustentam o titulo. */
  principios?: string[];
  /** Usado so na variant 'regraDaCasa' — ex: "Regra 01". */
  numero?: string;
  /** Usado so na variant 'regraDaCasa' — explicacao curta da regra. */
  corpo?: string;
  variant?: BastidoresVariant;
};
