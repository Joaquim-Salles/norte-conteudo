import React from 'react';

/**
 * Estilo de ilustração ORIGINAL da Norte — definido nesta rodada (Rotas,
 * 2026-09-05), pedido do fundador via coordenador: "se algum card pedir
 * ilustração original, desenhe você mesmo, num estilo NOVO e definido: traço
 * único contínuo, grosso, confiante — tipo desenho de contorno de revista/
 * editorial, sem levantar o traço, sem jitter/sketch trêmulo (isso já foi
 * rejeitado no v1)."
 *
 * REGRA DO ESTILO (documentar e reutilizar, não é descartável):
 * - 1 único <path>, sem levantar a "caneta" (só M no início, resto L/C) —
 *   contorno fechado, não esboço de várias linhas soltas.
 * - Traço GROSSO (STROKE = 15px em viewBox de ~220), sem variação de
 *   espessura, cantos e pontas arredondados (strokeLinecap/Linejoin round).
 * - Sem preenchimento (fill="none") — é contorno, não silhueta sólida.
 * - Monocromático: cor recebida via prop, nunca gradiente/sombra/textura.
 * - Sujeito: objetos do universo de estoque/operação (caixa, cabide,
 *   prateleira, código de barras, carrinho), simplificados ao mínimo de
 *   formas reconhecíveis — não é ícone genérico de UI kit.
 *
 * Este é o padrão pra QUALQUER ilustração original futura da Norte — ver
 * CATALOGO.md. Usado aqui em 2 peças: `HangerIcon` (dentro do card "Loja de
 * roupa" na Capa, colorido na cor da trilha) e `CrateIcon` (assinatura do
 * slide de Fechamento, sempre preto — é a "marca" do carrossel, não uma cor
 * de trilha).
 */
export const EDITORIAL_STROKE = 15;

const EditorialIconBase: React.FC<{
  d: string;
  viewBox: string;
  color: string;
  size: number;
}> = ({d, viewBox, color, size}) => {
  const [, , vbW, vbH] = viewBox.split(' ').map(Number);
  const height = size * (vbH / vbW);
  return (
    <svg width={size} height={height} viewBox={viewBox} fill="none">
      <path
        d={d}
        stroke={color}
        strokeWidth={EDITORIAL_STROKE}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
};

/**
 * Cabide — representa "grade e tamanho" (Loja de roupa): gancho + corpo
 * triangular do cabide, 1 traço contínuo (1 único <path>, sem levantar M).
 */
export const HangerIcon: React.FC<{color: string; size?: number}> = ({color, size = 180}) => (
  <EditorialIconBase
    color={color}
    size={size}
    viewBox="0 0 220 200"
    d="M 100 30 C 100 16, 122 16, 122 30 C 122 42, 108 40, 110 52 L 20 108 C 12 113, 14 124, 24 124 L 198 124 C 208 124, 210 113, 202 108 L 112 52"
  />
);

/**
 * Caixa/engradado aberto — assinatura de fechamento do carrossel (representa
 * "estoque/operação" de forma abstrata, sem ser um logo). Contorno da caixa
 * + as 2 abas abertas em V, 1 traço contínuo.
 */
export const CrateIcon: React.FC<{color: string; size?: number}> = ({color, size = 200}) => (
  <EditorialIconBase
    color={color}
    size={size}
    viewBox="0 0 240 200"
    d="M 40 90 L 40 180 L 200 180 L 200 90 L 120 90 L 120 180 M 40 90 L 20 40 L 90 70 L 120 90 L 150 70 L 220 40 L 200 90"
  />
);

/**
 * Balcão de atendimento (NTB Vendas, trilha "Balcão") — mesa em perspectiva
 * simples, 1 traço contínuo. Abstrato como Hanger/Crate — a leitura vem da
 * silhueta + o rótulo do card ao lado, não de detalhe fotográfico.
 */
export const CounterIcon: React.FC<{color: string; size?: number}> = ({color, size = 200}) => (
  <EditorialIconBase
    color={color}
    size={size}
    viewBox="0 0 240 200"
    d="M 20 190 L 20 140 L 60 110 L 220 110 L 220 160 L 180 190 L 20 190"
  />
);

/**
 * Sacola de entrega (NTB Vendas, trilha "Delivery/entrega") — sacola com
 * alça em arco, 1 traço contínuo.
 */
export const DeliveryBagIcon: React.FC<{color: string; size?: number}> = ({color, size = 200}) => (
  <EditorialIconBase
    color={color}
    size={size}
    viewBox="0 0 220 220"
    d="M 70 90 C 70 55, 85 35, 110 35 C 135 35, 150 55, 150 90 L 175 90 L 165 195 L 55 195 L 45 90 L 70 90"
  />
);

/**
 * Documento/ficha com canto dobrado (Norte Avalia "Fornecedor", Institucional
 * "Revisa") — retângulo com o canto superior direito cortado na diagonal,
 * convenção clássica de "página/ficha". 1 traço contínuo.
 *
 * NOTA DE QA (2026-09-05): a primeira versão desta ilustração era uma
 * "prancheta com clip" (retângulo + aba retangular no topo) — no render em
 * 200px ficou lendo como bateria/frasco, não como prancheta. Trocado por
 * este desenho mais simples porque a leitura tem que funcionar em escala
 * pequena, não só parecer certa olhando o path no código.
 */
export const DocumentIcon: React.FC<{color: string; size?: number}> = ({color, size = 200}) => (
  <EditorialIconBase
    color={color}
    size={size}
    viewBox="0 0 220 220"
    d="M 55 20 L 135 20 L 165 50 L 165 195 L 55 195 L 55 20"
  />
);

// ---------------------------------------------------------------------------
// Rodada 14 — 6 ilustrações novas (expansão do repertório, pedido do
// fundador: "mais desenhos, mais ideias, mais tipos diferentes"). MESMO
// estilo/regra do topo do arquivo — 1 traço contínuo, grosso, monocromático,
// sem jitter. Validadas visualmente (não só no código) na MENOR escala em
// que aparecem (~90-150px, card de post-it) — ver CATALOGO.md Rodada 14 pra
// qualquer ajuste feito depois de olhar o PNG renderizado.
// ---------------------------------------------------------------------------

/**
 * Pilha de caixas — silhueta "em degrau" (caixa grande embaixo, caixa menor
 * empilhada em cima) — mesma lógica de abstração do `CrateIcon`/`HangerIcon`
 * (contorno simplificado, não desenho fotográfico). 1 traço contínuo.
 */
export const BoxStackIcon: React.FC<{color: string; size?: number}> = ({color, size = 200}) => (
  <EditorialIconBase
    color={color}
    size={size}
    viewBox="0 0 220 200"
    d="M 20 190 L 20 120 L 65 120 L 65 55 L 130 55 L 130 120 L 200 120 L 200 190 L 20 190"
  />
);

/**
 * Checklist — retângulo (ficha) com 3 "linhas de lista" desenhadas como
 * dentes de pente saindo da borda esquerda, sem levantar o traço (cada dente
 * é ida-e-volta no mesmo traço, não uma linha solta nova).
 */
export const ChecklistIcon: React.FC<{color: string; size?: number}> = ({color, size = 200}) => (
  <EditorialIconBase
    color={color}
    size={size}
    viewBox="0 0 200 220"
    d="M 40 200 L 40 160 L 110 160 L 40 160 L 40 120 L 110 120 L 40 120 L 40 80 L 110 80 L 40 80 L 40 20 L 160 20 L 160 200 L 40 200"
  />
);

/**
 * Relógio — círculo (4 beziers cúbicas aproximando o arco) + 2 ponteiros,
 * tudo no mesmo traço contínuo (os ponteiros saem do próprio ponto onde o
 * círculo fecha, direto pro centro e daí pra ponta do ponteiro das horas).
 */
export const ClockIcon: React.FC<{color: string; size?: number}> = ({color, size = 200}) => (
  <EditorialIconBase
    color={color}
    size={size}
    viewBox="0 0 220 220"
    d="M 110 20 C 159.7 20, 200 60.3, 200 110 C 200 159.7, 159.7 200, 110 200 C 60.3 200, 20 159.7, 20 110 C 20 60.3, 60.3 20, 110 20 L 110 110 L 150 140"
  />
);

/**
 * Código de barras — barras verticais de altura variável conectadas pela
 * linha de base, um zigue-zague único (técnica igual à do `ChecklistIcon`:
 * o próprio traço sobe/desce formando as barras, sem linhas soltas).
 */
export const BarcodeIcon: React.FC<{color: string; size?: number}> = ({color, size = 200}) => (
  <EditorialIconBase
    color={color}
    size={size}
    viewBox="0 0 220 160"
    d="M 20 140 L 20 30 L 45 30 L 45 140 L 70 140 L 70 60 L 95 60 L 95 140 L 120 140 L 120 20 L 145 20 L 145 140 L 170 140 L 170 70 L 195 70 L 195 140"
  />
);

/**
 * Prateleira — poste vertical + 2 tábuas de prateleira, mesmo traço em
 * degraus (poste sobe, tábua vai pra direita, desce, próxima tábua).
 */
export const ShelfIcon: React.FC<{color: string; size?: number}> = ({color, size = 200}) => (
  <EditorialIconBase
    color={color}
    size={size}
    viewBox="0 0 220 190"
    d="M 30 170 L 30 20 L 190 20 L 190 70 L 30 70 L 30 120 L 190 120 L 190 170 L 30 170"
  />
);

/**
 * Carrinho de compras — silhueta minimalista (alça + cesto trapezoidal),
 * sem rodas (a abstração de silhueta já usada no `CounterIcon` — a leitura
 * vem do formato geral + do rótulo do card, não de detalhe fotográfico).
 */
export const ShoppingCartIcon: React.FC<{color: string; size?: number}> = ({color, size = 200}) => (
  <EditorialIconBase
    color={color}
    size={size}
    viewBox="0 0 220 160"
    d="M 10 15 L 35 15 L 55 110 L 175 110 L 195 40 L 60 40"
  />
);
