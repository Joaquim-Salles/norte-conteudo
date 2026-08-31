# Catálogo de templates e variações

Atualizado em 2026-08-31 (3ª rodada, mesmo dia — sistema de ícones real +
2 Reels animados). Pedido literal do fundador: *"quero MAISSS E MAISS
PESQUISE USE AS SKILLS MAIS SIMBOLOS COISAS ATE ANIMACOES NOS POSSTS um
catálogo completo"*. Ver seções **"Sistema de ícones (2026-08-31)"** e
**"Reels animados (2026-08-31)"** logo abaixo.

Atualização anterior, mesmo dia (2ª rodada — fotografia real de
restaurante/comida). Pedido do fundador: *"tá ficando muito bom porém quero
mais opções com fotos reais às vezes do restaurante, exemplo de carrosséis,
bora explorar"*. Ver seção **"Fotografia real (2026-08-31)"** logo abaixo pra
onde as fotos vêm, como foram baixadas e as 3 peças novas.

Atualização anterior, mesmo dia (sistema de temas + guia de cores + prints reais —
pedido do fundador por "milhares de variações" com cor por sistema e prints
do sistema). Ver seção 0 abaixo pra como isso funciona. Atualização anterior
em 2026-08-30 (2ª rodada de elevação visual — fundador revisou a galeria
completa e apontou que o carrossel Metodologia inteiro e 2 slides do
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

Como testar:
- `npm run qa:preview` gera 1 PNG por estado em `out/qa/` (ver
  `scripts/qa-preview.mjs` pra lista completa e props de exemplo de cada um) —
  cobre os 5 tipos de post/variações de layout.
- `npm run qa:temas` gera a matriz tema × variante em `out/qa/temas/` (ver
  `scripts/qa-theme-batch.mjs`) — prova o sistema de temas descrito na §0.

---

## Sistema de ícones (2026-08-31)

Pedido do fundador ("mais símbolos") — os elementos gráficos improvisados
(formas SVG desenhadas à mão pra check/seta/etc.) foram substituídos por uma
biblioteca de ícones real onde fazia sentido semântico.

**Biblioteca escolhida: [Lucide](https://lucide.dev) (`lucide-react`, npm,
v1.38.0).** Licença confirmada na **fonte primária**
(`github.com/lucide-icons/lucide/blob/main/LICENSE`, checado em 2026-08-31):
dual **ISC** (ícones próprios) + **MIT** (ícones herdados do fork original
Feather) — ambas de uso comercial livre, sem custo, sem chave de API. Mesma
checagem de licença feita também pra Heroicons (MIT) e Tabler Icons (MIT) —
as três serviriam; Lucide venceu pelo pacote React mais leve/maduro
(tree-shakeable) e por um traço (stroke-based) que já combina com a
linguagem gráfica de `GhostGraphics.tsx`. Zero CDN: o pacote é resolvido no
bundle do Remotion, mesmo critério já usado pras fontes.

**Wrapper central: `src/lib/icons.tsx`.** Todo componente que precisa de um
ícone real importa daqui — nunca direto de `lucide-react` — pra trocar de
biblioteca no futuro ser mudança de 1 arquivo. Ícones expostos: `IconCheck`
(validação/estado resolvido), `IconGrowth` (seta de crescimento),
`IconAlert` (risco/achismo/estado "antes"), `IconChat` (mensagem genérica —
ver nota de marca abaixo), `IconChart` (gráfico de dados), `IconCycle`
(ciclo/repetição), `IconArrowRight` (seta de CTA).

**Nota de marca registrada:** o `WhatsAppIcon` desenhado à mão que existia
antes recriava, na prática, o contorno do logo oficial do WhatsApp/Meta —
risco real de uso indevido de marca de terceiro. Substituído por `IconChat`
(`MessageCircle`, bolha de mensagem genérica) em `CtaBand.tsx` — nenhuma
peça usa glifo de marca de terceiro.

**Onde os ícones entraram (uso funcional, não decorativo):**

| Ícone | Onde | Por quê |
|---|---|---|
| `IconChat` + `IconArrowRight` | `CtaBand` (toda peça) | Substitui o ícone de marca de risco; é o elemento mais repetido do catálogo inteiro. |
| `IconAlert` | Label "Achismo" (`DadoVsAchismo`, 3 variantes) e "Antes" (`AntesDepois`, 3 variantes) | Reforça "isso é risco/não confiável" — mesma gramática visual reaproveitada nos 2 templates. |
| `IconChart` | Label "Dado"/"Dado real" (`DadoVsAchismo`, 3 variantes) | Reforça "isso é dado real", em oposição ao achismo. |
| `IconCheck` | Label "Depois" (`AntesDepois`, 3 variantes) | Fecha o par com `IconAlert`: Antes = alerta, Depois = resolvido. |
| `IconGrowth` | Junto da métrica (`AntesDepois`, 3 variantes) | Não decorativo — sempre ao lado de um número real de resultado. |
| `IconCycle` | Selo "Melhoria contínua" do cover (`MetodologiaSemEnrolacao`) | Substitui o `GhostCycle` desenhado à mão que era usado em opacidade 100% (uso funcional, não atmosfera de fundo) — literalmente o ícone de ciclo/repetição pedido. |

**O que NÃO foi trocado:** `GhostBars`/`GhostQuote`/`GhostArrowUp` em
`GhostGraphics.tsx` continuam desenhados à mão — são elementos de
**atmosfera de fundo** (opacidade 5-22%, bleed parcial pra fora do quadro),
não ícones funcionais, e já correspondiam ao padrão de qualidade aprovado
pelo fundador. Só o uso do `GhostCycle` em opacidade 100% dentro de um selo
circular (uso literal de ícone, não atmosfera) foi migrado pra `IconCycle`.

---

## Reels animados (2026-08-31)

Pedido do fundador ("animações nos posts") — até aqui o catálogo inteiro
usava `<Still>` (frame único). As 2 peças abaixo são as primeiras
`<Composition>` de verdade do repo: vídeo real, 1080x1920, 30fps, H.264,
animado com `useCurrentFrame()`/`interpolate()`/`spring()` — não é preview
de frame único, é vídeo renderizado (`out/qa/reels/*.mp4`).

**Por que essas 2:** `DadoVsAchismo` e `MetodologiaSemEnrolacao` já tinham
estrutura de sequência/carrossel no Still (achismo→dado, cover→passos→cta) —
mais fácil "esticar no tempo" com fidelidade ao conteúdo original do que
inventar um formato novo do zero.

**Helper reutilizável: `src/lib/motion.ts`** — cada função documentada com o
TERMO correto de vocabulário de motion design (não "efeito genérico"):
`slideFadeIn` (slide + fade), `staggerWords` (stagger word reveal —
kinetic typography, 2-3 frames de defasagem por palavra), `countUp`
(contagem numérica com easing ease-out, não linear), `popIn` (pop/overshoot
via spring), `wipeProgress` (wipe transition), `progressFill` (barra de
progresso). Timing/easing seguem a pesquisa de tendência 2026 aplicada
(ver relato ao fundador): nunca linear, hold mínimo de leitura, overshoot
só em elementos pequenos.

### `DadoVsAchismoReel.tsx` (7,07s, 212 frames)

4 `<Sequence>`: **Achismo** (stagger word reveal da frase + "mask reveal" —
um traço de riscado cresce da esquerda pra direita sobre a frase inteira,
depois que ela termina de aparecer) → **Wipe** (a mesma "costura diagonal"
de accent que já existe nos Stills cresce de tarja fina até virar um flash
cheio de tela — transição real de corte, não fade genérico) → **Dado**
(número faz **count-up de 0 até o percentual real** — não aparece pronto —
com barras de fundo crescendo em stagger) → **CTA** (`CtaBand` sobe com
slide+fade). Props: `achismo`, `percentual` (numérico — o count-up precisa
de número, não string livre), `dadoTexto`, `fonteDado`, `theme`.

### `MetodologiaReel.tsx` (8,67s, 260 frames p/ 3 passos)

`<Sequence>` **Cover** (título em stagger word reveal, selo do `IconCycle`
girando continuamente — rotação amarrada ao frame, reforça literalmente
"isso é um ciclo que roda") → 1 `<Sequence>` **por passo** (número com pop
via spring, tracker de progresso animado no topo — o dot atual "chega" com
pop e a linha até o anterior desenha) → **CTA**. Props: `metodo`, `titulo`,
`passos[]` (array — funciona pra qualquer quantidade de etapas, não só 3).

**Limitação real, documentada sem maquiagem:** os 2 Reels acima são peças
**de exemplo/prova de conceito** da técnica, não um reel de produção
completo com narração — isso é Fase 3 (Bark TTS), ainda não implementada
(ver `references/constraints-plataforma.md`). O render em si foi rápido
nesta sessão (~10s por vídeo, Chromium headless local) — não houve limitação
de tempo de máquina; a limitação é de ESCOPO (2 peças, sem áudio), não de
performance de render.

---

## Fotografia real (2026-08-31)

Pedido explícito do fundador — "mais opções com fotos reais do restaurante,
bora explorar". Regra que continua valendo: **zero IA generativa** (fotos
geradas por IA seriam a solução mais fácil e foram deliberadamente descartadas
— o pedido é fotografia de verdade, tirada por fotógrafo).

**Fonte das fotos:** Pexels (licença comercial livre, sem atribuição
obrigatória — https://www.pexels.com/license/). **Limitação real encontrada:**
não havia MCP/skill de automação de banco de imagem conectada nesta sessão (a
skill `pexels-automation` depende de Rube MCP, que não está disponível aqui;
as APIs oficiais REST do Pexels e do Unsplash retornam 401 sem chave de API, e
não havia chave configurada no ambiente). Contorno usado: `WebFetch` nas
páginas de busca públicas do Pexels (`pexels.com/search/...`) pra localizar
URLs diretas do CDN (`images.pexels.com/photos/<id>/pexels-photo-<id>.jpeg`),
que **funcionam sem autenticação** — o site de busca do Unsplash bloqueou via
challenge anti-bot (Anubis), por isso todas as 3 fotos vieram do Pexels. Cada
foto foi baixada localmente (`curl`) pra `public/photos/` — Remotion renderiza
offline, não pode depender de URL externa em runtime. Créditos completos com
link de origem: [`public/photos/CREDITOS.md`](../../public/photos/CREDITOS.md).

**3 composições novas** (nenhuma delas é um dos "5 tipos" da Fase 0 — são
extensões/variações exploratórias, ver cada template pra detalhe):

| Peça | O que é | Foto usada |
|---|---|---|
| `DicaPratica` — slide `cover-foto` | Cover editorial/lifestyle: foto real em tela cheia + overlay de gradiente escuro (`src/lib/PhotoBackground.tsx`), texto ancorado embaixo. Mais "revista/lifestyle" que os covers de cor sólida. | `restaurante-ambiente-noturno.jpg` (Pexels #776538) |
| `VitrineProduto` — variante `contexto` | Foto real de ambiente/comida + mockup do celular com print REAL do NTB Vendas sobreposto, como se estivesse pousado na mesa — foto real + produto real na mesma peça. Pensada especificamente pra NTB Vendas (Cardápio Digital). | `prato-gourmet-mesa-madeira.jpg` (Pexels #5865434) |
| `CoverFotoReal.tsx` (template novo) | Peça simples de "prova social"/contexto — foto de movimento de salão em tela cheia, serve de abertura/cover pra um carrossel sobre Cardápio Digital. Badge usa a cor do tema do produto (`getTheme`). | `salao-moderno-movimento.jpg` (Pexels #2387675) |

**Contraste de texto sobre foto — achado real de QA:** a 1ª versão da
variante `contexto` do Vitrine usava um degradê `topAndBottom` que desvanecia
rápido demais (transparente já a partir de 26% da altura) — a 2ª linha do
headline caía fora da zona escura e ficava com contraste fraco sobre a madeira
clara da foto. Corrigido alongando o platô de opacidade forte do degradê
(`src/lib/PhotoBackground.tsx`, ver comentário `FIX 2026-08-31` no código) —
regra prática pra qualquer peça nova com foto: sempre validar que o texto cai
DENTRO da zona de opacidade máxima do gradiente, não só perto da borda.

**Peça nova em `src/lib/`:**
- **`PhotoBackground.tsx`** — foto real em tela cheia (`objectFit: cover` +
  `objectPosition` configurável) com overlay de gradiente escuro parametrizado
  (`'bottom' | 'top' | 'topAndBottom' | 'full' | 'none'`) pra legibilidade de
  texto. Usado pelas 3 peças acima; reutilizável em templates futuros.

---

## 0. Sistema de temas (2026-08-31)

Pra "milhares de variações" não virar arquivo-por-arquivo manual, existe um
sistema de **temas** paramétrico — o mesmo componente `.tsx` produz saídas
visuais diferentes trocando só uma prop.

- **`src/lib/colorGuide.ts`** — fonte de verdade das cores por sistema/produto,
  confirmadas direto no repo real de cada um (não só no site institucional).
  Versão legível com swatches: [`GUIA-DE-CORES.md`](./GUIA-DE-CORES.md).
- **`src/lib/themes.ts`** — empacota paleta + densidade de textura + estilo de
  card (`'bezel'` double-bezel vs `'flat'` caixa reta) num `Theme`. 4 temas:
  `marca` (institucional), `estoque`, `vendas`, `avalia`.
- Templates recebem `theme?: ThemeName` (default `'marca'` — sem a prop, o
  visual é o institucional de sempre). Refatorados até agora: `DadoVsAchismo`,
  `AntesDepois`. Exemplo: `<DadoVsAchismo variant="impacto" theme="estoque" />`
  vs `theme="vendas"` são a MESMA composição, 2 saídas visuais diferentes.
- **`VitrineProduto` não recebe `theme` manualmente** — o tema é sempre
  derivado automaticamente do campo `produto` (`getThemeForProduct`), porque
  uma vitrine sempre anuncia o produto certo, nunca uma escolha livre.

## Vitrine de Produto — variante `print` (nova, 2026-08-31)

Além de `padrao`/`hero`/`grid` (ícone+texto), a variante `print` mostra um
**screenshot real do sistema** dentro de uma moldura de device
(`src/lib/DeviceFrame.tsx` — `PhoneFrame`/`BrowserFrame`), com sombra e leve
inclinação, não a imagem crua colada. Screenshots reais em
`public/screenshots/` (NTB Estoque: 4 telas do repo real; NTB Vendas: 2
capturas ao vivo de `testvendase.norteparanegocios.com.br`). Prop
`screenshotAspect` evita que `objectFit: cover` corte conteúdo real da UI
quando o screenshot tem proporção atípica (achado real de QA, corrigido).

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
| `cover-foto` (novo, 2026-08-31) | Cover editorial/lifestyle: foto REAL de restaurante/comida em tela cheia (`foto`, `public/photos/` — zero IA generativa) com overlay de gradiente escuro (`PhotoBackground`, `overlay="bottom"`) pra legibilidade, texto ancorado embaixo. Usar quando a dica tem gancho num contexto físico real de restaurante/bar/lanchonete (bom pra NTB Vendas). |

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

Recebe `theme?: ThemeName` (default `'marca'`) — ver §0. Troca o gradiente do
bloco DEPOIS pelo sistema anunciado (ex: `theme="estoque"` pra um antes/depois
específico do NTB Estoque).

## 4. Vitrine de Produto (`VitrineProduto.tsx`)

Post único (1 imagem). Prop `variant`.

| Variante | Quando usar |
|---|---|
| `padrao` (default) | Identidade no topo + lista vertical de features em cards double-bezel. Uso geral, até 4 features. |
| `hero` | Identidade/headline centralizadas e grandes, features viram pílulas horizontais. Mais "poster de lançamento" — usar pra anúncio de feature nova ou quando a headline é o principal gancho (menos "ficha técnica"). |
| `grid` | Features em grade 2×2 (bento), cards com mais profundidade (double-bezel + número em selo). Usar quando as 4 features têm peso parecido entre si e vale destacar todas com o mesmo nível de atenção. |
| `print` (novo, 2026-08-31) | Screenshot real do sistema numa moldura de device (`screenshot`, `device: 'phone'\|'browser'`), com sombra/inclinação — "prova visual" em vez de ícone+texto. Usar quando existe um print real bom o bastante pra carregar a peça sozinho (painel, tela de produto, etc). |
| `contexto` (novo, 2026-08-31) | Foto REAL de ambiente/comida do restaurante em tela cheia (`foto`, `public/photos/`) + mockup do celular com o `screenshot` real do sistema sobreposto, como se estivesse pousado na mesa — foto real + produto real na mesma peça. Pensada pra NTB Vendas (Cardápio Digital), reforça "isso resolve um problema de restaurante de verdade". Ver nota de contraste de texto abaixo da seção "Fotografia real". |

Tema (`padrao`/`hero`/`grid`/`print`/`contexto`) é sempre derivado
automaticamente do `produto` — ver §0.

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

## 6. CoverFotoReal (`CoverFotoReal.tsx`) — exploratório, 2026-08-31

Post único, fora da numeração "5 tipos" da Fase 0 (é uma peça pontual pedida
pelo fundador, não um tipo novo formal do calendário). Foto real em tela
cheia (`foto`) com overlay `bottom`, badge/eyebrow (`tagNumero`) na cor do
`theme` (produto anunciado ou `'marca'`), título grande e "Arrasta pro lado →"
— pensada pra abrir/servir de cover de um carrossel sobre Cardápio Digital,
mas genérica o bastante pra qualquer produto (basta trocar `theme`/`foto`).
Ver seção "Fotografia real" acima pra fonte da foto padrão.

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
