# Catálogo de templates e variações

Atualizado em 2026-08-30 (2ª rodada de elevação visual — fundador revisou a
galeria completa e apontou que o carrossel Metodologia inteiro e 2 slides do
DicaPratica ainda estavam mais rasos que o resto; ver nota no §5 e nas
variações `DicaPratica-bridge`/`cover-quote`). Cada um dos 5 tipos de post da
Fase 0 agora tem 2-3 variações de composição — mesmo princípio editorial,
layout diferente — pra dar variedade real na galeria sem sair do sistema de
marca (`.claude/brand/design-tokens.md`).

Todas as variações:
- usam só os tokens de `src/lib/tokens.ts` (cores, fonte Atkinson Hyperlegible 400/700);
- têm CTA de WhatsApp/link na bio (`CtaBand`) sempre que a peça é o "fim" da leitura;
- rodam com grain sutil de superfície (`src/lib/Texture.tsx`, via `Frame`) — dá
  profundidade física sem quebrar cor de marca;
- usam `Badge` (pílula) pra eyebrow/rótulo de topo e `SurfaceCard` (double-bezel:
  casca + núcleo com highlight) pra cards com mais peso visual, no lugar de
  caixas flat de opacidade única.

Como testar: `npm run qa:preview` gera 1 PNG por estado em `out/qa/` (ver
`scripts/qa-preview.mjs` pra lista completa e props de exemplo de cada um).

---

## 1. Dado vs. Achismo (`DadoVsAchismo.tsx`)

Post único (1 imagem). Prop `variant`.

| Variante | Quando usar |
|---|---|
| `padrao` (default) | Split horizontal — achismo comprimido em cima, dado dominante embaixo. Uso geral, funciona pra qualquer dado. |
| `impacto` | Achismo vira só uma tarja fina no topo; o número do dado ocupa quase a tela toda (~90px). Usar quando o dado em si é o gancho (número forte, curto, "chocante"). |
| `ladoALado` | Split vertical esquerda (achismo)/direita (dado), leitura mais editorial/revista. Usar quando o dado precisa de mais contexto de texto (frase mais longa) do que a variante `impacto` comporta. |

## 2. Dica Prática (`DicaPratica.tsx`)

Carrossel — 1 `<Still>` por slide, `slide.kind` decide o layout. Slides
`bridge` e `cta` são compartilhados entre todas as variações de cover.

| Cover | Quando usar |
|---|---|
| `cover` (default) | Título + badge numérico + "Arrasta pro lado →". Uso geral. |
| `cover-grid` | Cover já mostra uma prévia em lista dos itens (até 4) antes do swipe — "prova de conteúdo". Usar quando os itens são curtos o bastante pra caber num preview de 1 linha cada. |
| `cover-quote` (elevado 2026-08-30) | Cover editorial, citação/provocação grande sobre fundo preto. Ganhou aspas gráficas grandes (abertura + fechamento espelhado, bleed parcial pra fora do quadro) e o título deixou de ser um `h2` solto — agora vive num `SurfaceCard` de assinatura/atribuição, com marcador de accent. Usar quando a dica nasce de uma frase forte (do fundador, de um cliente, ou uma dor comum bem resumida numa frase). |

Slides funcionais (não têm variação de layout, só de conteúdo):
- `bridge` (elevado 2026-08-30) — 1 ideia numerada por slide. O número ganhou um card double-bezel (`SurfaceCard`) em vez de ficar solto no ar, com rótulo "IDEIA n de total"; ganhou também tracker de progresso no topo (mesma linguagem do `passo` do Metodologia) e um `GhostCheck` grande de apoio no fundo.
- `cta` (headline + `CtaBand`).

## 3. Antes/Depois (`AntesDepois.tsx`)

Post único (1 imagem). Prop `variant`.

| Variante | Quando usar |
|---|---|
| `padrao` (default) | Split horizontal topo/base, métrica como badge no bloco DEPOIS. Uso geral. |
| `ladoALado` | Split vertical esquerda (antes)/direita (depois), selo "Com a Norte" na costura central. Usar quando antes/depois têm textos de tamanho parecido (o split vertical equilibra melhor que o horizontal nesse caso). |
| `metricaHero` | A métrica vira o elemento gigante central da peça (até 158px), antes/depois encolhem pra legendas curtas acima/abaixo. Usar quando o número de resultado é forte o bastante pra carregar a peça sozinho — pedido explícito do fundador por "número grande". |

## 4. Vitrine de Produto (`VitrineProduto.tsx`)

Post único (1 imagem). Prop `variant`.

| Variante | Quando usar |
|---|---|
| `padrao` (default) | Identidade no topo + lista vertical de features em cards double-bezel. Uso geral, até 4 features. |
| `hero` | Identidade/headline centralizadas e grandes, features viram pílulas horizontais. Mais "poster de lançamento" — usar pra anúncio de feature nova ou quando a headline é o principal gancho (menos "ficha técnica"). |
| `grid` | Features em grade 2×2 (bento), cards com mais profundidade (double-bezel + número em selo). Usar quando as 4 features têm peso parecido entre si e vale destacar todas com o mesmo nível de atenção. |

## 5. Metodologia sem Enrolação (`MetodologiaSemEnrolacao.tsx`)

Carrossel — 1 `<Still>` por slide, `slide.kind` decide o layout. Slides
`passo` e `cta` são compartilhados entre todas as variações de cover.

**Nota de bug (2026-08-30):** o cover original desta peça era visualmente mais
fraco que os covers dos outros 4 tipos (rótulo em texto plano, sem hint de
continuidade) e o script de QA só renderizava o cover, nunca os slides `passo`/`cta`
— por isso a peça parecia "quebrada" (sem corpo, sem CTA) na galeria, quando na
verdade o carrossel inteiro sempre teve os 3 slides completos. Ambos os
problemas foram corrigidos nessa mesma data (ver histórico do commit
`5709fb2`).

**2ª rodada de elevação (2026-08-30, mesmo dia):** mesmo corrigido, o
carrossel inteiro ainda estava visivelmente mais raso que o resto do catálogo
(fundador revisou a galeria completa e apontou) — faltava o mesmo peso visual
(`SurfaceCard`, elemento gráfico de apoio) que peças como AntesDepois/
VitrineProduto/DadoVsAchismo já tinham. Todos os 5 estados foram elevados:

| Cover | Quando usar |
|---|---|
| `cover` (default) | Badge do método + título + hint "Passo a passo, sem enrolação — arrasta pro lado →" + **novo:** card `SurfaceCard` "Melhoria contínua" com selo circular (ícone `GhostCycle`, seta de refresh — simboliza o ciclo PDCA/Lean que se repete) e `GhostBars` maior/mais visível ao fundo. Uso geral. |
| `cover-roadmap` | Mini-roadmap com as etapas do método (bolinhas conectadas por linha) — **novo:** a lista inteira agora vive dentro de um `SurfaceCard` (moldura double-bezel) em vez de bullets soltos flutuando no fundo preto. Usar quando o método tem nome de etapa curto o bastante pra caber numa linha (ex: PDCA, 5W2H). |
| `cover-editorial` | Tratamento editorial/itálico, mais quote-like, sem badge — **novo:** aspas gráficas grandes (`GhostQuote`, abertura no topo-direito + fechamento espelhado embaixo) substituem as barras de crescimento (que combinavam mais com dado/resultado do que com tom editorial), e uma barra vertical de accent ("pull-quote" estilo revista) dá moldura de apoio ao bloco de texto, que antes ficava só com título + linha fina soltos. Usar quando o método é conhecido o bastante pra não precisar de "prova" — o gancho é o tom, não a lista. |

Slides funcionais:
- `passo` (elevado 2026-08-30) — número grande ganhou um selo/anel decorativo
  (círculo tracejado accent atrás do número, efeito "checkpoint") e a peça
  ganhou um **mini-diagrama de progresso** (`SurfaceCard` com `total` círculos
  numerados, etapa atual destacada em accent, etapas concluídas em
  `primaryDark`, conectados por linha) — preenche o espaço que antes ficava
  vazio abaixo do texto e mostra visualmente "onde estou no ciclo", pedido
  explícito do fundador.
- `cta` (elevado 2026-08-30) — ganhou `Badge` "Metodologia" acima do headline
  (dá o mesmo ritmo eyebrow→título→CTA das outras peças) e `GhostBars` maior/
  mais visível ao fundo. Headline + `CtaBand`.

---

## Peças novas em `src/lib/`

- **`Badge.tsx`** — pílula de eyebrow/rótulo (substitui texto plano solto).
- **`SurfaceCard.tsx`** — "double-bezel": casca externa sutil + núcleo interno
  com highlight, pra cards com profundidade física em vez de caixa flat.
- **`Texture.tsx`** — grain sutil via SVG `feTurbulence`, `mix-blend-mode: overlay`,
  aplicado por padrão em todo `Frame` (prop `texture`, default `true`).
- **`GhostGraphics.tsx` → `GhostCycle`** (novo, 2026-08-30) — seta circular
  única (estilo "refresh"), desenhada pra ficar legível mesmo pequena
  (selo/badge de ~34-40px, ao contrário de `GhostBars`/`GhostQuote`/`GhostCheck`
  que são pensados pra tamanho grande de fundo). Usada no Metodologia sem
  Enrolação pra simbolizar o ciclo de melhoria contínua (PDCA/Lean).
