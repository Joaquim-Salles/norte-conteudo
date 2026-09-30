# Norte Conteúdo · instruções para agentes (Codex, Claude e outros)

Este repositório gera posts, carrosséis e reels da **Norte para Negócios** com Remotion. Leia isto antes de criar
ou editar qualquer peça. O guia completo está em `docs/GUIA-POSTS-NORTE.md`.

## Ordem de leitura (obrigatória)

1. `public/brand-kit/MARCA.md` — regras da marca (logo, cores, fontes, tom, checklist §9).
2. `docs/GUIA-POSTS-NORTE.md` — como montar o post, medidas e os erros que já aconteceram.
3. `src/templates/NorteVendasPost.tsx` — **peça de referência aprovada** (5 slides, 3 estáticos e 2 animados). Copie a estrutura dela.
4. `src/lib/NortePost.tsx` — blocos prontos. **Use-os. Não reescreva topo, fundo, título, chips, papel térmico nem animação.**

## Regras que não podem ser quebradas

- Post novo = **arquivo novo em `src/templates/`**, montado com `src/lib/NortePost.tsx`. Não use os templates antigos
  (`Rotas*`, `Retrato*`, `Etapas*`, `VozesGrade`, `ArgumentoOmieNtb`) nem `archive/`: são de identidade anterior.
- Fonte dos posts: **Atkinson Hyperlegible** (`ensurePostLoaded()`, `FONT_POST`, `FONT_POST_MONO`). Geist/Newsreader/Fraunces só no site.
- Logo **sempre** de `public/brand-kit/01-logos/` (nunca redigitar nem redesenhar). Assinatura em duas linhas.
- Cores só as de `public/brand-kit/cores.json`. Marca-mãe = azul-noite `#14163A`. `#484DB5` é só do Norte Vendas.
- Cada produto na sua cor (`<Produto id="estoque">`). Sem vermelho de marca, degradê em logo, mascote ou imagem de IA.
- Telas: só as oficiais de `public/brand-kit/08-recursos/telas-oficiais/`. **Nunca inventar UI, número, cliente ou
  depoimento.** Cupom, etiqueta e ticket levam a marca "exemplo".
- Texto de produto vem do site de referência (seções do produto) e do `MARCA.md` §1. Frases curtas, concretas, chão de loja.
- **Animação: nunca anime letras, apenas elementos.** Título, rótulo (eyebrow), texto de apoio, chips e botões de texto ficam
  **parados e legíveis desde o primeiro quadro**: sem fade, subida, blur, máscara, letra por letra ou palavra por palavra. Só se
  animam elementos: objetos (impressora, cupom, etiqueta), aparelhos, cartões, fotos, linhas, ícones, carimbos e molduras. O texto
  que vai dentro de um elemento anima junto com ele, como parte do elemento. Não use `<Fx>` em `Title`, `Eyebrow` nem `Support`.
- Nomes: "Norte para Negócios", "Norte Vendas", "Norte Estoque", "Norte Avalia", "Norte Pisos". Nunca "NTB ...".

## Como entregar

1. Crie o template, registre os `Still`/`Composition` em `src/Root.tsx`.
2. Renderize: `npm run post -- <PrefixoDosIds> <pasta-de-saida>` (ver `scripts/render-post.mjs`).
3. **Abra cada PNG e um quadro de cada vídeo e olhe.** Compare com a referência. Corrija até passar o checklist
   do guia (§7). Nunca entregue sem ver o render.
4. `npx tsc --noEmit` sem erro novo.

## Formato

- Feed 1080×1350 (4:5), margem 86 px. Vídeo: 30 fps, 450 frames (15 s), animação de ~4–5 s e **quadro final parado**.
- Carrossel: misture PNG e MP4; cada slide com identidade própria (produto → papel quadriculado → azul-noite → produto → azul-noite).
