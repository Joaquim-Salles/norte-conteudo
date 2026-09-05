import React from 'react';

/**
 * Ilustração PRÓPRIA à mão (line art levemente imperfeito/sketch) —
 * identidade visual distintiva do preset `editorialClaude` (2026-09-05,
 * 4ª rodada do mesmo pedido do fundador).
 *
 * ORIGEM DA CORREÇÃO: a 3ª tentativa (ver CATALOGO.md, "3ª tentativa") tirou
 * TODO ícone/gráfico de apoio do preset (`graphicSupport: false`) pra copiar
 * a restrição tipográfica/paleta da grade real do @claudeai — mas foi longe
 * demais. Releitura crítica de `docs/referencias-visuais/claude-instagram/
 * grid-{1,2,3}.png` (pedida pelo fundador, "sem desenhos, sem identidade
 * própria") confirma: pelo menos 2 posts reais da grade TÊM ilustração
 * própria desenhada à mão, não ícone de biblioteca (Lucide/Font Awesome) —
 * (1) o card "Follow your track" (Undergrads/Grad students/PhDs) é um
 * diagrama de nós/setas com linhas de espessura variável, círculos levemente
 * ovais/imperfeitos, nada de vetor geométrico perfeito; (2) o card
 * "Safeguards 101" é uma casa line-art simples com uma mão saindo dela,
 * traço único monoline, também imperfeito. Esses componentes recriam essa
 * LINGUAGEM (não copiam os desenhos específicos — "casa com mão" é ilustração
 * de um post específico da Anthropic, recriar o mesmo desenho seria cópia;
 * aqui a mesma técnica gráfica aplica a 2 conceitos do negócio da Norte).
 *
 * TÉCNICA (deliberadamente "errada" pra ficar certa): círculos NÃO são
 * `<circle>` (perfeitos demais, leem como ícone de sistema) — são paths com
 * 4 curvas bézier com raio levemente irregular ponto a ponto, imitando um
 * círculo desenhado à mão rápido. Conectores são curvas com uma leve
 * assimetria (não uma cúbica limpa/simétrica) + seta feita de 2 traços em V
 * ligeiramente desalinhados, não um `<marker>` de seta vetorial. Só stroke,
 * nunca fill sólido de forma (mesmo vocabulário monoline das 2 referências).
 *
 * Usado SÓ quando `visualStyle` é `editorialClaude` (ver `isMinimalDecoration`
 * em visualStyles.ts) — nenhum outro preset ganha essas ilustrações, pra não
 * misturar linguagem visual entre presets que não pediram isso.
 */

type HandDrawnProps = {
  color?: string;
  opacity?: number;
  size?: number;
};

/** Círculo com raio levemente irregular — nó do diagrama de fluxo. */
function wobblyNode(cx: number, cy: number, r: number, jitter: number, seed: number): string {
  const points = 8;
  const coords: [number, number][] = [];
  for (let i = 0; i < points; i++) {
    const angle = (i / points) * Math.PI * 2;
    // jitter determinístico (sem Math.random — render precisa ser idêntico
    // sempre, mesma exigência já documentada pras fontes/texturas do projeto)
    const wobble = 1 + jitter * Math.sin(seed + i * 2.4);
    const rr = r * wobble;
    coords.push([cx + Math.cos(angle) * rr, cy + Math.sin(angle) * rr]);
  }
  let d = `M ${coords[0][0].toFixed(1)} ${coords[0][1].toFixed(1)} `;
  for (let i = 1; i <= points; i++) {
    const [x, y] = coords[i % points];
    d += `L ${x.toFixed(1)} ${y.toFixed(1)} `;
  }
  return d + 'Z';
}

/**
 * Diagrama de nós/setas — conceito "processo/fluxo com direção" (do achismo
 * pro dado, do brief à peça publicada). Recria a TÉCNICA do card "Follow your
 * track" (hub central com braços saindo pra pontos), não o desenho literal.
 */
export const IllustrationFluxo: React.FC<HandDrawnProps> = ({color = '#141413', opacity = 1, size = 220}) => {
  const sw = Math.max(2.2, size / 78);
  return (
    <svg width={size} height={size * 0.82} viewBox="0 0 220 180" fill="none" style={{opacity}}>
      {/* hub central */}
      <path d={wobblyNode(112, 96, 24, 0.09, 1.3)} stroke={color} strokeWidth={sw} strokeLinejoin="round" />
      {/* nó 1 — canto superior esquerdo */}
      <path d={wobblyNode(34, 34, 15, 0.12, 4.1)} stroke={color} strokeWidth={sw} strokeLinejoin="round" />
      {/* nó 2 — canto direito, meio */}
      <path d={wobblyNode(196, 58, 13, 0.1, 7.7)} stroke={color} strokeWidth={sw} strokeLinejoin="round" />
      {/* nó 3 — inferior */}
      <path d={wobblyNode(70, 158, 16, 0.11, 2.6)} stroke={color} strokeWidth={sw} strokeLinejoin="round" />

      {/* conector hub -> nó 1, levemente curvo/assimétrico, com seta em V desalinhado */}
      <path d="M92 82 C 70 66, 58 54, 44 42" stroke={color} strokeWidth={sw} strokeLinecap="round" fill="none" />
      <path d="M44 42 L38 30" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      <path d="M44 42 L57 39" stroke={color} strokeWidth={sw} strokeLinecap="round" />

      {/* conector hub -> nó 2 */}
      <path d="M134 84 C 154 76, 168 70, 182 64" stroke={color} strokeWidth={sw} strokeLinecap="round" fill="none" />
      <path d="M182 64 L172 58" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      <path d="M182 64 L177 74" stroke={color} strokeWidth={sw} strokeLinecap="round" />

      {/* conector hub -> nó 3 */}
      <path d="M100 118 C 90 132, 82 141, 76 148" stroke={color} strokeWidth={sw} strokeLinecap="round" fill="none" />
      <path d="M76 148 L79 136" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      <path d="M76 148 L65 143" stroke={color} strokeWidth={sw} strokeLinecap="round" />
    </svg>
  );
};

/**
 * Fachada de negócio simples — conceito "negócio real" (o produto vive numa
 * loja/restaurante de verdade, não é abstrato). Recria a TÉCNICA do
 * "Safeguards 101" (monoline, formas levemente tortas, sem preenchimento),
 * aplicada a um conceito diferente do desenho original (fachada, não casa
 * com mão) — evita reproduzir a ilustração específica da Anthropic.
 */
export const IllustrationNegocioReal: React.FC<HandDrawnProps> = ({color = '#141413', opacity = 1, size = 200}) => {
  const sw = Math.max(2.2, size / 74);
  return (
    <svg width={size} height={size * 0.9} viewBox="0 0 200 180" fill="none" style={{opacity}}>
      {/* toldo — 5 gomos levemente desiguais, traço único ondulado */}
      <path
        d="M18 46 C 16 34, 20 30, 24 46 C 27 33, 33 32, 37 46 C 41 32, 47 33, 51 46 C 55 32, 61 33, 65 46 C 69 33, 75 34, 78 46"
        stroke={color}
        strokeWidth={sw}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M14 46 L82 44" stroke={color} strokeWidth={sw} strokeLinecap="round" />

      {/* corpo da fachada — retângulo levemente torto, cantos não alinhados */}
      <path
        d="M20 47 L18 158 L146 162 L150 50 Z"
        stroke={color}
        strokeWidth={sw}
        strokeLinejoin="round"
        fill="none"
      />

      {/* porta — trapézio simples, puxado pro lado como se fosse traçado rápido */}
      <path d="M96 100 L94 160 L132 161 L128 98 Z" stroke={color} strokeWidth={sw} strokeLinejoin="round" fill="none" />
      <path d="M120 128 C 122 128, 123 130, 121 131" stroke={color} strokeWidth={sw * 0.85} strokeLinecap="round" fill="none" />

      {/* vitrine — quadrado com cruz de caixilho, linhas não perfeitamente retas */}
      <path
        d="M34 66 L32 118 L80 120 L82 68 Z"
        stroke={color}
        strokeWidth={sw}
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M34 92 L82 93" stroke={color} strokeWidth={sw * 0.85} strokeLinecap="round" />
      <path d="M57 67 L58 119" stroke={color} strokeWidth={sw * 0.85} strokeLinecap="round" />

      {/* seta pequena de "aberto"/entrada, ao lado — reforça "negócio ativo" */}
      <path d="M158 118 C 168 112, 176 108, 184 104" stroke={color} strokeWidth={sw} strokeLinecap="round" fill="none" />
      <path d="M184 104 L174 102" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      <path d="M184 104 L180 114" stroke={color} strokeWidth={sw} strokeLinecap="round" />
    </svg>
  );
};

/**
 * 7ª RODADA (2026-09-05) — pedido do fundador: "quero os sem foto com
 * desenhos, versões, vários" — o layout 4 do relatório do fundador
 * (`docs/referencias-visuais/claude-instagram/relatorio-completo-fundador.md`,
 * "capa de cor chapada: fundo sólido, sem foto") com a ILUSTRAÇÃO como
 * PROTAGONISTA da composição, não detalhe pequeno de canto (correção do que
 * a 4ª/5ª rodada fizeram em `VitrineProduto` `padrao`, 128px espremido no
 * canto — ver CATALOGO.md, "7ª rodada"). 4 conceitos NOVOS, mesma técnica
 * monoline/imperfeita das 2 ilustrações acima (wobble determinístico, só
 * stroke, seta em V desalinhado) — escolhidos cruzando os 8 tipos de post
 * com os produtos reais da Norte, não decoração genérica de banco de ícone:
 * - `IllustrationCrescimento` — gráfico de barras ascendente + seta de
 *   tendência: resultado/crescimento (Dado vs. Achismo, Antes/Depois,
 *   Vitrine — "o produto gera resultado mensurável").
 * - `IllustrationParceria` — aperto de mão: confiança/parceria (Depoimento,
 *   Bastidores — "trabalhamos JUNTO com o cliente", não só fornecedor).
 * - `IllustrationTempo` — ampulheta: tempo economizado (Dica Prática,
 *   Metodologia — "o processo automatizado devolve tempo pro dono do
 *   negócio", benefício central de Estoque/Vendas).
 * - `IllustrationAprovado` — selo com check: validação/qualidade aprovada
 *   (Depoimento, Vitrine — "isso foi testado e funciona", reforça prova
 *   social sem reusar o ícone de biblioteca `IconCheck` já usado noutro
 *   papel no catálogo).
 */

/**
 * Gráfico de barras ascendente com traço de tendência — conceito
 * "crescimento/resultado real do produto", não gráfico de biblioteca (barras
 * levemente tortas/desiguais, eixo com traço único imperfeito).
 */
export const IllustrationCrescimento: React.FC<HandDrawnProps> = ({color = '#141413', opacity = 1, size = 220}) => {
  const sw = Math.max(2.2, size / 78);
  // 4 barras de altura crescente, cada uma um retângulo levemente torto (cantos não alinhados)
  const bars = [
    {x: 26, w: 30, h: 40, wobble: [0, -2, 1, -1]},
    {x: 70, w: 30, h: 74, wobble: [1, -1, 0, -2]},
    {x: 114, w: 30, h: 108, wobble: [-1, 0, 2, -1]},
    {x: 158, w: 30, h: 142, wobble: [0, 1, -1, 0]},
  ];
  const baseY = 186;
  return (
    <svg width={size} height={size * 0.9} viewBox="0 0 216 200" fill="none" style={{opacity}}>
      {/* eixo base */}
      <path d="M16 187 L204 183" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      {bars.map((b, i) => {
        const topY = baseY - b.h;
        const [w0, w1, w2, w3] = b.wobble;
        const d = `M${b.x + w0} ${baseY} L${b.x + w1} ${topY} L${b.x + b.w + w2} ${topY} L${b.x + b.w + w3} ${baseY} Z`;
        return <path key={i} d={d} stroke={color} strokeWidth={sw} strokeLinejoin="round" fill="none" />;
      })}
      {/* traço de tendência conectando o topo de cada barra, com seta final desalinhada */}
      <path
        d={`M20 150 C 50 128, 78 118, 85 96 C 96 68, 118 58, 130 48 C 148 32, 162 26, 172 20`}
        stroke={color}
        strokeWidth={sw}
        strokeLinecap="round"
        fill="none"
      />
      <path d="M172 20 L159 22" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      <path d="M172 20 L170 33" stroke={color} strokeWidth={sw} strokeLinecap="round" />
    </svg>
  );
};

/**
 * Aperto de mão — conceito "parceria/confiança" (a Norte trabalha JUNTO com o
 * cliente, não é só fornecedor de software). Traço único monoline, dedos
 * simplificados a poucas curvas (mesmo grau de simplificação de "Safeguards
 * 101" — não é ilustração anatômica, é gesto reconhecível em poucos traços).
 */
export const IllustrationParceria: React.FC<HandDrawnProps> = ({color = '#141413', opacity = 1, size = 220}) => {
  const sw = Math.max(2.2, size / 78);
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 220 154" fill="none" style={{opacity}}>
      {/* manga esquerda */}
      <path d="M8 60 L62 78 L58 100 L4 84 Z" stroke={color} strokeWidth={sw} strokeLinejoin="round" fill="none" />
      {/* manga direita */}
      <path d="M212 56 L160 76 L165 99 L216 82 Z" stroke={color} strokeWidth={sw} strokeLinejoin="round" fill="none" />
      {/* antebraço esquerdo levando ao punho */}
      <path d="M62 78 C 78 82, 92 86, 100 90" stroke={color} strokeWidth={sw} strokeLinecap="round" fill="none" />
      {/* antebraço direito levando ao punho */}
      <path d="M160 76 C 144 80, 130 84, 120 89" stroke={color} strokeWidth={sw} strokeLinecap="round" fill="none" />
      {/* aperto — 2 formas entrelaçadas levemente ovais/imperfeitas, sem preenchimento */}
      <path
        d="M96 88 C 92 78, 100 70, 112 72 C 122 74, 126 84, 122 94 C 130 90, 138 92, 140 100 C 142 108, 134 116, 122 114 C 112 112, 100 104, 96 88 Z"
        stroke={color}
        strokeWidth={sw}
        strokeLinejoin="round"
        fill="none"
      />
      {/* 2 traços curtos de nó/dedo sobre o aperto, reforçando o entrelaçado */}
      <path d="M104 84 C 108 90, 112 96, 118 100" stroke={color} strokeWidth={sw * 0.85} strokeLinecap="round" fill="none" />
      <path d="M118 82 C 122 88, 126 94, 130 100" stroke={color} strokeWidth={sw * 0.85} strokeLinecap="round" fill="none" />
    </svg>
  );
};

/**
 * Ampulheta — conceito "tempo economizado" (o processo automatizado devolve
 * tempo pro dono do negócio). Vidro levemente assimétrico (não 2 triângulos
 * geométricos perfeitos), grãos como pontos soltos caindo, base/topo com
 * traço único.
 */
export const IllustrationTempo: React.FC<HandDrawnProps> = ({color = '#141413', opacity = 1, size = 200}) => {
  const sw = Math.max(2.2, size / 74);
  return (
    <svg width={size} height={size * 1.15} viewBox="0 0 160 190" fill="none" style={{opacity}}>
      {/* base inferior */}
      <path d="M28 176 L132 180" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      {/* topo superior */}
      <path d="M32 12 L128 8" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      {/* contorno do vidro — 2 triângulos levemente tortos unidos no meio, traço único */}
      <path
        d="M34 14 C 38 56, 58 82, 80 94 C 102 84, 120 58, 126 10"
        stroke={color}
        strokeWidth={sw}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M32 178 C 40 138, 58 106, 80 94 C 100 108, 118 140, 128 178"
        stroke={color}
        strokeWidth={sw}
        strokeLinecap="round"
        fill="none"
      />
      {/* montinho de grãos na base — arco simples */}
      <path d="M58 164 C 68 152, 92 152, 102 164" stroke={color} strokeWidth={sw * 0.9} strokeLinecap="round" fill="none" />
      {/* grãos caindo — 3 pontos soltos de tamanho decrescente */}
      <path d="M79 106 L81 106" stroke={color} strokeWidth={sw * 1.3} strokeLinecap="round" />
      <path d="M80 122 L82 122" stroke={color} strokeWidth={sw * 1.1} strokeLinecap="round" />
      <path d="M80 138 L81 138" stroke={color} strokeWidth={sw * 0.9} strokeLinecap="round" />
    </svg>
  );
};

/**
 * Selo com check — conceito "validado/aprovado" (prova social/qualidade,
 * diferente do `IconCheck` de biblioteca já usado noutro papel no catálogo —
 * aqui é ilustração de selo desenhado, não ícone utilitário de lista). Selo
 * = círculo wobbly com borda dentada simples (poucos dentes, não uma coroa
 * detalhada) + check de 2 traços em V, mesma técnica de seta desalinhada.
 */
export const IllustrationAprovado: React.FC<HandDrawnProps> = ({color = '#141413', opacity = 1, size = 200}) => {
  const sw = Math.max(2.2, size / 74);
  // borda dentada — 12 pontos alternando raio (miolo do selo)
  const teeth = 12;
  const cx = 100;
  const cy = 100;
  const rOuter = 84;
  const rInner = 74;
  const pts: [number, number][] = [];
  for (let i = 0; i < teeth * 2; i++) {
    const angle = (i / (teeth * 2)) * Math.PI * 2;
    const wobble = 1 + 0.03 * Math.sin(i * 3.1 + 2);
    const r = (i % 2 === 0 ? rOuter : rInner) * wobble;
    pts.push([cx + Math.cos(angle) * r, cy + Math.sin(angle) * r]);
  }
  let dTeeth = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)} `;
  for (let i = 1; i <= pts.length; i++) {
    const [x, y] = pts[i % pts.length];
    dTeeth += `L ${x.toFixed(1)} ${y.toFixed(1)} `;
  }
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" style={{opacity}}>
      <path d={dTeeth} stroke={color} strokeWidth={sw} strokeLinejoin="round" />
      <path d={wobblyNode(100, 100, 58, 0.06, 5.4)} stroke={color} strokeWidth={sw} strokeLinejoin="round" />
      {/* check — 2 traços em V, ligeiramente desalinhado (mesma técnica das setas) */}
      <path d="M70 102 L92 124" stroke={color} strokeWidth={sw * 1.3} strokeLinecap="round" />
      <path d="M92 124 L134 76" stroke={color} strokeWidth={sw * 1.3} strokeLinecap="round" />
    </svg>
  );
};

/** Nome curto de cada ilustração — usado pelos templates que expõem escolha via prop `illustration`. */
export type HandDrawnIllustrationName = 'fluxo' | 'negocioReal' | 'crescimento' | 'parceria' | 'tempo' | 'aprovado';

export const HAND_DRAWN_ILLUSTRATIONS: Record<HandDrawnIllustrationName, React.FC<HandDrawnProps>> = {
  fluxo: IllustrationFluxo,
  negocioReal: IllustrationNegocioReal,
  crescimento: IllustrationCrescimento,
  parceria: IllustrationParceria,
  tempo: IllustrationTempo,
  aprovado: IllustrationAprovado,
};
