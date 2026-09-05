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
