# Como criar um site ou página da Norte

Referência viva: `codigo/site-referencia/`, o código completo do site novo (Astro).

> **Fontes do site:** o site usa **Geist** (texto), **Geist Mono** (rótulos) e **Newsreader itálico**
> (notas "à mão"). Essa é a regra oficial para web (`MARCA.md` §4). As peças, como posts e papelaria, usam
> Atkinson. Os arquivos estão em `02-fontes/site/`.
>
> **Cores:** o site ainda usa `--norte: #484DB5` como cor de destaque, mas a marca mãe hoje é
> **azul-noite `#14163A`**. Em páginas novas, siga as cores do `MARCA.md`.

---

## 1. Stack

| Camada | Escolha | Por quê |
|---|---|---|
| Framework | **Astro** (sem React, sem Tailwind) | páginas estáticas rápidas; cada seção é um `.astro` com HTML, CSS e script juntos |
| Animação | **GSAP + ScrollTrigger** | animação ligada ao scroll, com pin, scrub e timelines |
| Rolagem suave | **Lenis** (`lerp: 0.11`) | sensação premium; sincronizada com o ScrollTrigger |
| Imagens | `astro:assets` `<Image>` com `widths` e `sizes` | otimização automática |
| Testes | Playwright (`tests/motion.spec.ts`) | garante que nenhum texto fica invisível e que o movimento reduzido funciona |

```bash
cd codigo/site-referencia && npm install && npm run dev      # desenvolvimento
npm run build && npm run preview                              # versão final
```
- Node 22 ou mais novo.
- O formulário de contato usa Web3Forms. Coloque a sua chave em `src/data/contato.ts`
  (`COLOQUE_SUA_CHAVE_WEB3FORMS`).

## 2. Estrutura

```
src/
  layouts/Base.astro        fontes, tokens, SEO, Header, Footer, CTA fixo de WhatsApp
  pages/                    index, vendas, estoque, avalia, pisos, 404
  sections/<pagina>/*.astro uma seção por arquivo (markup + CSS + script da cena)
  components/               Device, Rocket, Marca, Icon, Button, Header, CtaFaixa, Faq, Footer…
  motion/                   index.ts (base), reveal.ts, assemble.ts, route.ts, rocket.ts, carousel.ts
  styles/tokens.css         cores, espaços, raios, fontes
  styles/base.css           classes de texto: .wrap .eyebrow .display .h2 .lede .section .dark
  data/                     faq, planos, contato (WhatsApp com mensagem pronta por botão)
  assets/telas, fotos       prints oficiais e fotos reais
```
Uma página é uma **lista de seções**, e as animações genéricas são ligadas no fim:
```astro
<Base title="…" description="…"><main id="conteudo">
  <Hero /> <QuatroSistemas /> <ProdutoEstoque /> <ComoTrabalhamos /> <Faq items={faq} /> <ContactSection />
</main></Base>
<script> import { initReveal } from '../motion/reveal'; initReveal(); </script>
```

## 3. Sistema visual do site

- **Tokens** (`tokens.css`): cores dos produtos, `--paper #F5F5F9`, `--ink`, espaços de `--s-1` a
  `--s-10`, `--radius: 14px` e `--gutter: clamp(16px,4vw,40px)`.
- **Cor por página:** `<body data-product="vendas">` troca o `--accent` sozinho. O rótulo, o botão e os
  destaques pegam a cor do produto.
- **Superfícies:** cada seção declara `data-surface="hero|dark|light"`. O header lê a superfície embaixo
  dele e troca entre transparente, vidro escuro e vidro claro.
- **Linguagem de papel:**
  - cartões `#FFFDF8` com cantos de 3–4 px, levemente girados (`--giro: -0.8deg`) e com sombra de papel;
  - notas "à mão" em serifada itálica;
  - fundo quadriculado (2 gradientes de 1 px, `background-size: 32px`).
- **Títulos:**
  - `.display` com `clamp(36px,5.2vw,72px)`, `letter-spacing: -0.035em` e `text-wrap: balance`;
  - `.duo-tom` faz a segunda parte do título mais apagada: "Como a gente trabalha. <span>Cinco paradas…</span>".

## 4. Seções-modelo (copie a estrutura)

| Seção | O que faz | Arquivo |
|---|---|---|
| Hero com foguete | foguete decola com o scroll, nuvens de papel cobrem o hero | `sections/home/Hero.astro` + `motion/rocket.ts` |
| Quatro sistemas | papéis soltos ("hoje: planilha, caderno e papel") voam para os cartões dos produtos; as linhas convergem no foguete | `sections/home/QuatroSistemas.astro` |
| Produto (bloco que se monta) | notebook abre e liga, celular entra, fotos giram para o lugar | `sections/home/ProdutoVendas.astro` + `motion/assemble.ts` |
| Como trabalhamos | trilho com 5 paradas; o foguete percorre, cada parada pulsa | `sections/home/ComoTrabalhamos.astro` |
| Nota fiscal | cupom DANFE impresso aos trancos | `sections/vendas/NotaFiscal.astro` |
| Um pedido, três destinos | linhas até 3 impressoras, cada ticket imprime | `sections/vendas/Roteamento.astro` |
| Etiqueta | réplica da etiqueta com cotas técnicas; imprime com `steps(9)` | `sections/estoque/Etiqueta.astro` |
| Bip | celular lê o QR e o contador sobe | `sections/estoque/Bip.astro` |
| História com palco fixo | passos à esquerda, tela com zoom no ponto certo à direita | `components/Story.astro` |
| Antes/depois | risco "à mão" sobre o jeito antigo | `components/AntesDepois.astro` |
| Manifesto | foguete pousa no ponto final da frase gigante "Damos o norte." | `components/Manifesto.astro` |

Receitas de animação em detalhe: `02-como-criar-animacoes.md` §2.

## 5. Regras de qualidade

1. **Nada começa invisível no HTML.** O JS esconde só depois de checar o movimento reduzido. Sem JS, a
   página fica completa.
2. **Toda cena pesada tem versão de celular** (`gsap.matchMedia('(min-width: 900px)')`): sem pin e com
   `once`.
3. **O h1 do hero não usa fade** (protege o carregamento). Ele só desliza.
4. **Acessibilidade:**
   - link "pular para o conteúdo" e foco visível;
   - revelar o elemento quando o foco do teclado chega (`focusin`);
   - `aria-pressed` nos botões de alternar;
   - menu de celular em `<dialog>`.
5. **Imagens** com `loading="lazy"`, exceto a do hero.
6. **Todo botão de contato abre o WhatsApp com uma mensagem pronta daquele contexto**
   (`whatsappLink(msg)` em `src/data/contato.ts`).
7. **Texto:** títulos curtos de chão de loja, exemplos concretos (Mesa 4, Pizza meio a meio) e dados de
   exemplo marcados.

## 6. Criar uma página de produto novo

1. Crie `src/pages/<produto>.astro` com `<Base product="<produto>">` e acrescente o seletor
   `[data-product]` em `tokens.css` com a cor do produto.
2. Monte a página com seções:
   - hero (nome + promessa + aparelho com print oficial);
   - 2 a 4 cenas do produto, cada uma com um objeto físico animado;
   - planos ou FAQ;
   - contato.
3. Use o símbolo do produto de `01-logos/<produto>/` pelo componente `Marca`, que usa `currentColor`.
4. Rode `npm test` e confira no celular (390 px) e no desktop, com e sem movimento reduzido.
