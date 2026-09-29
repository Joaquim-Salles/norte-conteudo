# Guia de posts Norte (Remotion)

Objetivo: qualquer agente ou pessoa cria um post que já sai no padrão aprovado, sem correção de layout.
A peça de referência é o carrossel **Norte Vendas** (`src/templates/NorteVendasPost.tsx`); os PNGs aprovados estão em
`docs/referencia-aprovada/norte-vendas/`. **Olhe essas imagens antes de começar.**

## 1. Fluxo

1. **Texto primeiro.** Uma ideia por post. Título concreto (uma cena ou contraste), apoio de 1–2 frases. Fatos só do site
   (`codigo/site-referencia`, seções do produto) e do `MARCA.md` §1. Nada de número, cliente ou depoimento inventado.
2. **Estrutura do carrossel** (5–8 slides), alternando o fundo:

   | Slide | Fundo (`tone`) | Função |
   |---|---|---|
   | 1 capa | `product` (ou `dark`) | promessa + logo do produto + chips |
   | 2 | `light` (papel quadriculado) | o problema/mecanismo (diagrama, tickets) |
   | 3 | `dark` (azul-noite) | prova: tela oficial em notebook + celular |
   | 4 | `product` | objeto físico (cupom, etiqueta) + 3 cartões |
   | último | `dark` | frase-síntese + botão do site |

3. **Monte** copiando `NorteVendasPost.tsx` para um arquivo novo e trocando textos/cenas. Use só o que está em `src/lib/NortePost.tsx`.
4. **Registre** em `src/Root.tsx`: `Still` para estáticos, `Composition` (fps 30, 450 frames) para animados.
5. **Renderize e olhe** (`npm run post -- <Prefixo> <pasta>`). Compare com a referência. Passe o checklist da §7.

## 2. Blocos prontos (`src/lib/NortePost.tsx`)

| Bloco | Para que serve |
|---|---|
| `<Produto id="vendas\|estoque\|avalia\|pisos">` | troca a cor do produto em Background, Eyebrow e Chip |
| `<Background tone="dark\|light\|product" id="...">` | fundo (luz radial + vinheta, ou papel quadriculado). `id` único por slide |
| `<Top n={2} tone>` | assinatura oficial 62 px + página `02/05` em Mono. **Todo slide, menos capa e fechamento** |
| `<Eyebrow tone top>` | rótulo com traço de 40×3 e caixa alta |
| `<Title tone top size>` | título Bold, −2,5%, entrelinha 1,04 (use 74–92 px) |
| `<Support tone top width size>` | texto de apoio 28–30 px |
| `<Chip tone>` | pílula de recurso (até 4–5 por slide) |
| `<Foot tone label last>` | rodapé (`NORTE VENDAS` + `DESLIZE →`); no último use `last` |
| `<Paper width>` | papel térmico `#FFFDF8` com borda serrilhada e sombra (cupom, ticket, etiqueta) |
| `A()`, `S()`, `<Fx>` | animação (ver §5) |
| constantes | `NAVY, WHITE, LAV, PAPER, TEXT2, THERMAL, FRAME, PAD (86), PRODUTOS, kit()` |

Logos e telas: `kit('01-logos/...')`, `kit('08-recursos/telas-oficiais/...')`. Logos do Norte para Negócios já exportadas
(`LOGO_NEGOCIOS_BRANCO/AZUL`). Logos de produto: `01-logos/norte-<produto>/horizontal/..._branco_transparente.png` (fundo de cor) ou
`..._<produto>_transparente.png` (fundo claro).

## 3. Medidas (1080 × 1350)

- Margem lateral `PAD = 86`. Topo (`Top`) ocupa y 66–128. Eyebrow em **y 210**, título em **y 262**.
- Título de 1 linha ocupa ~100 px; de 2 linhas ~190 px. **Conteúdo termina em y ≤ 1240** (rodapé fixo em y ≈ 1266).
- Tamanhos: título 74–92, apoio 28–30, eyebrow 21 (+3), chip 22 Bold caixa alta, página e dados Mono 22.
- Notebook: moldura `FRAME`, raio 18, largura ≈ 770, tela com `objectFit: cover`, `objectPosition: left top`.
- Celular: largura 240, moldura `FRAME` raio 46, tela raio 36, altura ≈ 2,02 × largura.
- Cartão sobre cor: fundo `rgba(251,251,254,.12)`, raio 28, padding 28–30.
- Botão/CTA: pílula `WHITE` com texto `NAVY` Bold e `→` (`norteparanegocios.com.br →`).

## 4. Erros que já aconteceram (não repita)

1. **Título quebra em 2 linhas e cobre o apoio.** `Title` e `Support` são `position: absolute`: nada empurra nada. Estime a
   largura (~0,5 × tamanho por caractere) e ajuste `top` do apoio, ou reduza o título até caber. Confira no render.
2. **Texto preto sobre fundo escuro.** O texto herda a cor do `body`. Todo texto novo precisa de `color` explícito (`WHITE`/`NAVY`).
3. **Objeto invadindo o rodapé.** Celular e cupom passaram de y 1240 e cobriram "DESLIZE". Mantenha objetos acima de y 1240.
4. **Colunas se sobrepondo.** Cartões (largura 440) encostaram na impressora do cupom. Defina as colunas: esquerda 86–526, direita a partir de 546.
5. **Chip órfão.** 5 chips longos quebram a linha e deixam um sozinho; reduza texto ou quantidade.
6. **Fonte errada.** Posts usam Atkinson (`ensurePostLoaded()`), não Geist/Fraunces do resto do repo.
7. **Sombra cortada.** Ao usar `overflow: hidden` num contêiner com `drop-shadow`, use `clipPath: 'inset(0 0 -80px 0)'` (corta só o topo).
8. **Dado inventado.** Nunca desenhe UI ou métrica que o produto não tem. Animação só **move ou destaca** as telas oficiais.
9. **Reescrever bloco existente.** Se o bloco já existe em `NortePost.tsx`, importe. Se faltar um, adicione lá e documente aqui.

## 5. Animação (vídeo de carrossel)

- Componente de cena recebe `f?: number`. Estático: `<Cena />` (quadro final). Animado: `<Cena f={useCurrentFrame()} />`. Um único layout serve aos dois.
- `A(f, inicio, duracao)` → 0→1 com ease-out suave. `S(f, inicio, {damping, stiffness, mass})` → mola. Ambos retornam `1` quando `f` é indefinido.
- `<Fx p dy>` faz fade + subida de um bloco absoluto inteiro.
- **Roteiro de 15 s (450 frames a 30 fps):** frames 0–30 texto entra · 24–60 objetos entram (molas) · 36–112 ação principal
  (ex.: papel saindo aos trancos, destaque nas comandas) · depois **fica parado**. Uma ação principal por vez, toca uma vez.
- Papel saindo da impressora: avanço em degraus (`PRINT_STEPS`), cada um rápido e seguido de pausa; impressora treme ±1,6 px.
- Câmera: zoom lento (até +3%). Sem movimento decorativo sem sentido.
- Render: `npx remotion render src/index.ts <IdDaComposition> out/x.mp4 --codec=h264`.
- Som (opcional): efeitos curtos e discretos (whoosh, impressora, bip), −16 LUFS.

## 6. Adaptar para outro produto

- Envolva cada slide em `<Produto id="estoque">` (ou `avalia`, `pisos`). Para `tone="product"` e para os rótulos claros a cor muda sozinha.
- Objeto físico do produto: Vendas = cupom DANFE; Estoque = etiqueta com QR, lote e validade + leitor; Avalia = prancheta com checks;
  Pisos = placas de piso. Use os símbolos oficiais, nunca outro ícone no lugar.
- Telas: `08-recursos/telas-oficiais/<produto>/` (`d-` desktop, `m-` mobile). Prefira as já tratadas (nomes desfocados).

## 7. Checklist antes de entregar

- [ ] Abri **cada** PNG e um quadro de cada vídeo no tamanho do celular.
- [ ] Nenhum texto sobreposto, cortado ou preto sobre fundo escuro; nada acima de y 1240 além do rodapé.
- [ ] Assinatura oficial no topo (menos capa/fechamento), página `0n/0N` em Mono.
- [ ] Fundos alternados; slide de produto na cor do produto; só cores de `cores.json`.
- [ ] Fonte Atkinson; ícones Lucide de linha numa cor só; logos dos arquivos oficiais.
- [ ] Texto concreto e verdadeiro; dado de exemplo marcado "exemplo"; sem dado real de cliente.
- [ ] Animação toca uma vez, dura ~4–5 s e o quadro final fica parado até 15 s.
- [ ] `npx tsc --noEmit` sem erro novo. Nomes de arquivo numerados na ordem de uso.
- [ ] Legenda: 1ª linha com a ideia, 2–4 linhas curtas, fechamento "Fale com a gente: norteparanegocios.com.br", poucas hashtags.
