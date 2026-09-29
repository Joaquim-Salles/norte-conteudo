# Como criar animações no padrão Norte

Existem dois tipos de animação na Norte, com a mesma filosofia e ferramentas diferentes:

| Tipo | Onde vive | Ferramenta | Referência no kit |
|---|---|---|---|
| **Animação de site** (reage ao scroll) | páginas web | GSAP + ScrollTrigger + Lenis | `codigo/site-referencia/src/motion/` e `src/sections/` |
| **Animação em vídeo** (logo, post, reels) | MP4 e MOV | Remotion (React → vídeo) | `codigo/animacoes-remotion/src/` |

---

## 1. A filosofia (vale para os dois)

1. **Toda animação conta uma cena física do negócio.** Nada de movimento decorativo solto. Veja o que
   já existe:

| Cena | O que acontece | Onde |
|---|---|---|
| Foguete | decola e sobe **pela curva do rastro**, que se desenha atrás dele | logo Norte, hero do site |
| Impressora térmica | o cupom ou ticket sai **aos trancos**, linha a linha (`steps(n)`) | cupom NFC-e, comandas, etiqueta |
| Maquininha | cai no bloco, solta ondas de aproximação e pulsa a "venda aprovada" | logo Norte Vendas |
| Caixa | as abas da tampa caem e fecham; o laser do leitor passa | logo Norte Estoque |
| Prancheta | cai no bloco e os checks aparecem um a um | logo Norte Avalia |
| Piso | as placas caem e assentam uma a uma, do fundo para a frente | logo Norte Pisos |
| Rota com paradas | o foguete percorre um trilho e cada parada pulsa quando ele chega | "Como trabalhamos" |
| Bagunça que vira sistema | papéis soltos voam para dentro dos cartões dos produtos e as linhas convergem no foguete | "Quatro sistemas" |
| Um pedido, três destinos | linhas se desenham do pedido até 3 impressoras e cada ticket imprime | Roteamento (Vendas) |
| Bipou, contou | o celular lê o QR, pisca e o contador sobe 139 → 142 | Bip (Estoque) |

   **Para criar uma animação nova:** ache o objeto real da cena (papel, máquina, caixa, placa, rota,
   leitor), decida o que ele faz fisicamente e anime só isso.

2. **O movimento tem peso.** As coisas sobem com mola e passam um pouco do ponto, caem com quique, e o
   que recebe algo em cima dá um "tranco". Nada se move em linha reta e velocidade constante, a não ser
   que esteja atrelado ao scroll (scrub).
3. **Uma coisa de cada vez.** Encadeie as ações (sobe → cai → imprime → nome → brilho). Não anime tudo
   junto.
4. **Termina parado e legível.** O último quadro é a peça final limpa. Em vídeo, a animação toca uma vez
   e segura o quadro final.
5. **Acessibilidade:** respeite `prefers-reduced-motion`. Sem animação, tudo continua visível e completo.

### Vocabulário de movimento (use estes valores)

| Uso | Site (GSAP) | Vídeo (Remotion) |
|---|---|---|
| Aparecer ao rolar | `power3.out`, 0,7–0,8 s, `y: 22–28`, stagger 0,07–0,08 | `spring({damping:16, mass:.6, stiffness:140})` + blur de 8→0 |
| Viagem de A para B | `power2.inOut` | `Easing.bezier(0.7,0,0.2,1)` |
| "Pop" (objeto chegando) | `back.out(1.3–3)` | `spring({damping:10–12, stiffness:150–180})` |
| Impressora | `ease: 'steps(8–16)'` | `Math.floor(p * passos) / passos` |
| Atrelado ao scroll | `scrub: 0.5–1`, `ease: 'none'` | n/a |
| Curva CSS da casa | `cubic-bezier(.2,.8,.2,1)` | n/a |
| Decolagem | `power2.in` | `Easing.bezier(0.55,0,0.15,1)` |

---

## 2. Animação de site (GSAP)

O código completo está em `codigo/site-referencia/`. O essencial fica abaixo.

### 2.1 Base: iniciar com segurança (`src/motion/index.ts`)

```ts
import gsap from 'gsap'; import { ScrollTrigger } from 'gsap/ScrollTrigger'; import Lenis from 'lenis';
export const canAnimate = () => matchMedia('(prefers-reduced-motion: no-preference)').matches;
export const isDesktop = () => matchMedia('(min-width: 900px)').matches;
function setup() {
  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add('motion');           // CSS pode usar html.motion
  const lenis = new Lenis({ lerp: 0.11 });                     // rolagem suave
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0);
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}
export function ready(init: () => void) { if (!canAnimate()) return; setup(); init(); }
```

**Regra de ouro: nenhum elemento começa com `opacity: 0` no HTML.** Só o JavaScript, dentro de
`ready()`, esconde o que vai animar. Sem JS ou com movimento reduzido, a página fica completa.

### 2.2 Aparecer ao rolar (`data-reveal`)

```html
<h2 data-reveal="up">Nota fiscal? Sai do caixa.</h2>
<ul data-reveal="stagger"> <li>…</li> <li>…</li> </ul>
```
```ts
ScrollTrigger.batch('[data-reveal="up"]', { start: 'top 88%', once: true,
  onEnter: els => gsap.to(els, { opacity: 1, y: 0, duration: .8, ease: 'power3.out', stagger: .08 }) });
```
Esconda antes com `gsap.set(els, { opacity: 0, y: 28 })`. Se o foco do teclado chegar antes do scroll,
revele na hora (`focusin`).

### 2.3 Impressora térmica (o cupom saindo)

```ts
gsap.set(cupom, { clipPath: 'inset(0 0 100% 0)', y: -40 });
ScrollTrigger.create({ trigger: cupom.parentElement, start: 'top 72%', once: true,
  onEnter: () => gsap.to(cupom, { clipPath: 'inset(0 0 0% 0)', y: 0, duration: 1.8, ease: 'steps(14)' }) });
```
- O papel é HTML de verdade: fundo `#FFFDF8`, fonte Mono, tabela, QR decorativo e a marca "exemplo".
- A borda serrilhada é uma máscara CSS:
  ```css
  --serra: radial-gradient(circle at 6px 100%, transparent 5px, #fff 5.5px);
  mask: linear-gradient(#000,#000) top / 100% calc(100% - 8px) no-repeat, var(--serra) bottom / 12px 8px repeat-x;
  ```
- A sombra fica num wrapper com `filter: drop-shadow`, porque a máscara corta o `box-shadow`.
- Referência: `src/sections/vendas/NotaFiscal.astro`. Etiqueta: `src/sections/estoque/Etiqueta.astro`.

### 2.4 Linha que se desenha (`data-draw`)

```ts
path.setAttribute('pathLength', '1');
gsap.set(path, { strokeDasharray: 1, strokeDashoffset: 1 });
gsap.to(path, { strokeDashoffset: 0, ease: 'none',
  scrollTrigger: { trigger: path, start: 'top 85%', end: 'center 55%', scrub: 0.5 } });
```
Referência: `src/motion/route.ts`.

### 2.5 Cena fixada na tela (pin + timeline)

Use para as cenas principais: foguete decolando, rota com paradas, "um pedido, três destinos".
```ts
gsap.matchMedia().add('(min-width: 900px)', () => {
  const tl = gsap.timeline({ scrollTrigger: { trigger: secao, start: 'top top', end: '+=110%',
    pin: true, scrub: 0.8, invalidateOnRefresh: true } });
  linhas.forEach((l, i) => tl.to(l, { strokeDashoffset: 0, duration: .5 }, i * .8)
                              .to(tickets[i], { clipPath: 'inset(0 0 0% 0)', duration: .4, ease: 'steps(8)' }, i * .8 + .5));
  return () => gsap.set([...linhas, ...tickets], { clearProps: 'all' });
});
```
- **Sempre** tenha uma versão de celular mais simples (sem pin, com `once: true`).
- **Sempre** use `invalidateOnRefresh`, valores em função (`() => innerWidth * .6`) e limpeza no retorno.
- Referências:
  - `sections/home/Hero.astro` e `motion/rocket.ts`: o foguete decola e as nuvens cobrem;
  - `sections/home/ComoTrabalhamos.astro`: rota com 5 paradas;
  - `sections/home/QuatroSistemas.astro`: a bagunça vira sistema;
  - `sections/vendas/Roteamento.astro`: um pedido, três destinos.

### 2.6 Pulso numa parada (CSS)

```css
.no.pulsa::after { animation: pulsa .6s cubic-bezier(.2,.8,.2,1); }
@keyframes pulsa { from { transform: scale(1); opacity: .9 } to { transform: scale(2.2); opacity: 0 } }
```
```ts
no.classList.remove('pulsa'); void no.offsetWidth; no.classList.add('pulsa');  // reinicia o pulso
```

### 2.7 Aparelho que se monta (`data-assemble`)

- O notebook abre com `rotateX: -90 → 0`, `transformOrigin: '50% 100%'` e `transformPerspective: 1800`.
- A tela "liga" em duas etapas: `filter: brightness(.25) saturate(0)` e depois `brightness(1)`.
- A tela do celular entra por cortina: `clipPath: inset(0 0 100% 0) → 0%`.
- Fotos entram girando para o `--giro` delas com `back.out(1.4)`.
- Referência: `src/motion/assemble.ts` e `components/Device.astro`.

### 2.8 O que o site NÃO faz (e você também não deve fazer)

- cursor customizado;
- botão magnético;
- transição de página chamativa;
- parallax exagerado;
- texto do topo da página (h1) aparecendo com fade, porque isso atrasa o carregamento percebido
  (o h1 só desliza).

---

## 3. Animação em vídeo (Remotion)

Projeto completo: `codigo/animacoes-remotion/`. Leia o `README` de lá para instalar.

### 3.1 Como o projeto é organizado

| Arquivo | Conteúdo |
|---|---|
| `src/data.json` | cada logo desmontada em **peças** (ex.: `body`, `rocket`, `trail`, `machine`, `receipt`, `lidL`, `tile0…`), com o caixa de cada peça (`bb`) e as letras do nome separadas (`glyphs`) |
| `src/Logo.tsx` | a animação de entrada de cada marca: câmera, fundo, peças, nome letra a letra e brilho final |
| `src/Root.tsx` | as composições (16:9, 1:1, 9:16, transparente, curtas, ícone, posts) |
| `src/post/` | posts animados: `Kit.tsx` (topo, títulos, etiquetas), `Solucoes.tsx` (post aprovado), `Quem.tsx` |
| `scripts/render.sh` | gera os vídeos de logo; `render-solucoes.sh` gera o post de referência |
| `scripts/som.py` | sintetiza a trilha de efeitos e junta no vídeo (−16 LUFS) |

### 3.2 As funções de movimento (copie estas)

```tsx
// sobe de baixo com leve passar do ponto
const rise = (f, fps, start, dist = 300) => {
  const s = spring({frame: f - start, fps, config: {damping: 15, mass: 0.8, stiffness: 120}});
  return {y: (1 - s) * dist, o: interpolate(f - start, [0, 6], [0, 1], clamp)};
};
// cai de cima e quica
const drop = (f, fps, start, dist = 520) => {
  const s = spring({frame: f - start, fps, config: {damping: 10, mass: 0.7, stiffness: 150}});
  return {y: -(1 - s) * dist, s, o: interpolate(f - start, [0, 4], [0, 1], clamp)};
};
// "tranco" no corpo quando algo pousa em cima
const thud = (f, at, amt = 0.04) => 1 - amt * Math.max(0, Math.sin(Math.min(1, Math.max(0, (f - at) / 9)) * Math.PI));
```

### 3.3 A receita de uma entrada de logo (5,5 s, 30 fps)

| Quadros | O que acontece |
|---|---|
| 0–60 | a **cena do símbolo** (cada marca a sua; ver a tabela da §1) |
| 70–100 | o símbolo, que nasceu centralizado e 22% maior, **desliza para abrir espaço** ao nome |
| 80–110 | o **nome entra letra por letra**: cada glifo sobe 70 px com mola e sai de um desfoque de 9 → 0, com 1,7 quadros de diferença entre letras |
| 118–142 | uma **faixa de luz** na cor clara da marca atravessa a logo, usando a própria logo como máscara |
| o tempo todo | **câmera** aproximando de 0,96 → 1,04, **luz radial** atrás, **vinheta** nas bordas, **grão** leve (evita faixas no degradê) e **motion blur** (`@remotion/motion-blur`, 5–7 amostras) |

Detalhes que fazem diferença:
- O foguete segue a curva real do rastro (`trailPath` no `data.json`). O rastro se revela com um
  `strokeDasharray` do mesmo caminho, colado atrás dele, e o foguete gira acompanhando a tangente.
- Objeto branco sobre logo branca some. Por isso o brilho final usa a **cor clara da marca**, não branco.
- O fundo de cada marca tem um detalhe próprio:
  - Norte para Negócios: estrelas em alta velocidade, alinhadas com a direção do foguete;
  - Estoque e Pisos: grade isométrica sutil;
  - Vendas: ondas de aproximação saindo da maquininha.

### 3.4 Animar a logo de um produto novo

1. Gere a logo seguindo o `04-como-criar-logo-de-produto.md`. As peças que vão se mover precisam ser
   **paths separados** no SVG, por exemplo: corpo, objeto, detalhe 1, detalhe 2.
2. Rode `python3 scripts/add_brands.py` (edite para a marca nova). Ele lê o lockup horizontal e o
   vertical e grava as peças no `data.json`.
3. Rode `node scripts/bbox.mjs src/data.json` para medir cada peça e
   `node scripts/glyphs.mjs src/data.json` para separar as letras do nome.
4. Em `src/Logo.tsx`:
   - acrescente a marca em `Brand`, `LIGHT`, `TIMING` e `ICON_SWEEP`;
   - escreva o bloco `if (brand === "nova") {…}` com a cena usando `rise`, `drop`, `thud`, `Ripple` e
     `spring`.
5. Em `src/Root.tsx`, acrescente em `brands`. Em `scripts/render.sh`, acrescente em `ALL`. Em
   `scripts/som.py`, escreva a função de som.
6. Rode `ONLY="Nova:norte-nova" bash scripts/render.sh` e depois `python3 scripts/som.py norte-nova`.
7. **Antes de renderizar tudo, confira quadros soltos:**
   `npx remotion still src/index.ts Nova-16x9 out/q.png --frame=40`.

### 3.5 Post animado para o Instagram

- Formato 1080 × 1350. Os componentes prontos estão em `src/post/Kit.tsx`: `Headline` (palavra por
  palavra), `Kicker`, `Chips`, `Glow` e `BrandSymbol`. O topo com a assinatura oficial está em
  `src/post/Solucoes.tsx` (`Pagina`).
- O objeto físico impresso (cupom DANFE, etiqueta com QR), o notebook com o print oficial e a impressora
  estão em `Solucoes.tsx`: `Cupom`, `Etiqueta`, `Notebook` e `Impressora`.
- **A animação dura 4–5 s e toca uma vez**. Depois o ffmpeg segura o último quadro até 15 s:
  ```bash
  ffmpeg -i anim.mp4 -i som.wav -map 0:v -map 1:a -vf "tpad=stop_mode=clone:stop_duration=15" -t 15 \
    -c:v libx264 -crf 16 -pix_fmt yuv420p -af "loudnorm=I=-16:TP=-1.5:LRA=11" -c:a aac -b:a 256k final.mp4
  ```
  O script pronto é `scripts/render-solucoes.sh`.

### 3.6 Som

- São efeitos curtos que acompanham a ação:
  - whoosh na decolagem;
  - batida grave quando algo pousa;
  - cliques rápidos de impressora;
  - bip de leitor;
  - "clac" de cerâmica no piso;
  - acorde de "aprovado";
  - brilho agudo no reflexo final.
- Tudo com uma cama grave bem baixa, com volume normalizado em **−16 LUFS**.
- Funções prontas em `scripts/som.py`: `whoosh`, `thump`, `cardboard`, `clack`, `tone`, `chime`,
  `tick`, `shimmer`, `laser` e `pad`.

### 3.7 Formatos de saída

| Saída | Especificação |
|---|---|
| MP4 | H.264, `yuv420p`, bt709, CRF 16 (o formato que redes sociais aceitam sem mudar a cor) |
| Transparente para editor | MOV ProRes 4444 (`yuva444p10le`) |
| Transparente para web | WebM VP9 com alfa (`yuva420p`) |

---

## 4. Checklist de animação

- [ ] Existe uma cena física clara (o que é o objeto e o que ele faz)?
- [ ] O movimento tem peso: sobe com mola, cai com quique, tranco ao pousar?
- [ ] As ações acontecem uma de cada vez, em sequência?
- [ ] O quadro final é a peça limpa e parada?
- [ ] Nada branco sobre branco some. O brilho usa a cor clara da marca?
- [ ] No site: sem JS ou com movimento reduzido, tudo continua visível? Existe versão de celular?
- [ ] No vídeo: toca uma vez e segura, com som a −16 LUFS?
- [ ] Você conferiu quadros soltos (início, meio, fim) de verdade antes de entregar?
