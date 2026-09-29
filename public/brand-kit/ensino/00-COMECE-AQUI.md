# Comece aqui · como usar este kit para criar qualquer coisa da Norte

Este kit é o **sistema operacional da marca Norte para Negócios**. Com ele, uma IA ou uma pessoa
consegue criar um post, uma animação, uma página de site, um logo de produto novo, uma apresentação ou
uma proposta no padrão da marca, sem precisar perguntar nada básico.

> **Se você é uma IA:** leia este arquivo, depois o `../MARCA.md` inteiro, depois só o tutorial da tarefa
> que pediram. Não pule o `MARCA.md`, porque as regras dele valem para tudo.

---

## 1. Ordem de leitura

1. `../MARCA.md`: as regras (logo, cores, fontes, tom de voz, componentes, fotos e checklist).
2. O tutorial da tarefa:

| Tarefa | Tutorial |
|---|---|
| Post, carrossel, story ou reels | `01-como-criar-um-post.md` |
| Animação (vídeo de logo, post animado, animação de site) | `02-como-criar-animacoes.md` |
| Site ou página nova | `03-como-criar-um-site.md` |
| Logo ou símbolo de produto novo | `04-como-criar-logo-de-produto.md` |
| Apresentação, proposta, cartão, e-mail | `05-como-criar-pecas-impressas.md` |
| Prompts prontos (imagem e briefing) | `06-prompts-prontos.md` |

3. Os arquivos prontos (`01-logos`, `04-animacoes`, `08-recursos`) e o código (`codigo/`) que o
   tutorial indicar.

## 2. Mapa do kit

| Pasta | Para que serve |
|---|---|
| `MARCA.md` | regras da marca (fonte da verdade) |
| `tokens/` | cores, fontes e medidas em JSON e CSS, para colar em código |
| `01-logos/` | todas as logos prontas (5 marcas), em SVG e PNG; veja `_todas-as-logos.png` |
| `02-fontes/` | fontes com licença: `pecas-e-logo/` (Atkinson) e `site/` (Geist, Geist Mono, Newsreader) |
| `03-manual/` | manual visual em PDF (para gente ver) |
| `04-animacoes/` | vídeos prontos de todas as marcas: entrada, curta, ícone animado e som |
| `05-instagram/` | capas de destaque, marca d'água e prévia do perfil |
| `06-papelaria/` | cartão, assinatura de e-mail, proposta .docx e apresentação .pptx |
| `07-posts-referencia/` | post aprovado que serve de régua de qualidade |
| `08-recursos/` | prints oficiais dos sistemas (sem dado de cliente) e fotos reais |
| `codigo/animacoes-remotion/` | projeto que gera todas as animações e posts em vídeo |
| `codigo/geradores-marca/` | scripts que geram logos, manual, apresentação e proposta |
| `codigo/site-referencia/` | código completo do site novo (Astro + GSAP), a referência de animação web |
| `ensino/` | estes tutoriais |

## 3. As 7 regras que mais erram (decore)

1. **Nunca redesenhe a logo.** Use os arquivos de `01-logos`. A assinatura é sempre em duas linhas:
   "Norte para" em cima e "Negócios" embaixo.
2. **A marca mãe é azul-noite `#14163A`.** O `#484DB5` é só do Norte Vendas.
3. **Cada produto tem a sua cor e o seu símbolo** (mesmo bloco N 3D, objeto diferente em cima).
4. **Nada de vermelho na marca, nada de degradê na logo e nada de ilustração de IA ou mascote.**
5. **Texto concreto e verdadeiro.** Não invente número, cliente nem depoimento, e marque dado de exemplo
   como "exemplo".
6. **Não mostre dado real de cliente.** Use os prints de `08-recursos/telas-oficiais`.
7. **Animação conta uma história física e toca uma vez**: o foguete decola, a impressora imprime, a
   caixa fecha, o piso se monta. Nunca é movimento decorativo sem sentido.

## 4. Fluxo de trabalho recomendado

1. **Entenda o pedido.** Qual marca (Norte para Negócios ou produto)? Qual formato e onde vai ser usado?
2. **Escolha a referência:** um post, animação ou seção parecida que já existe no kit ou no site.
3. **Escreva o texto primeiro:** título concreto, apoio curto e só fatos.
4. **Monte usando o que já existe:**
   - logos de `01-logos`;
   - cores de `tokens/`;
   - componentes do `MARCA.md` §4b;
   - código de `codigo/`.
5. **Renderize e olhe o resultado de verdade.** Veja o PNG, o quadro do vídeo e a página no celular.
   Nunca entregue sem ver.
6. **Passe o checklist** do `MARCA.md` §9.
7. **Entregue os arquivos com nomes claros** e numerados na ordem de uso.

## 5. Ferramentas que o kit usa (e alternativas)

| Para | Usamos | Se não tiver |
|---|---|---|
| Vídeo, animação de logo, post animado | **Remotion** (React → MP4), em `codigo/animacoes-remotion` | After Effects, Rive ou Lottie, seguindo o `02-como-criar-animacoes.md` |
| Site | **Astro + GSAP + ScrollTrigger + Lenis**, em `codigo/site-referencia` | qualquer framework; as receitas de GSAP funcionam igual |
| Logo e lockup | **Python + fontTools** (texto em curvas) e **potrace** (vetorizar) | Figma ou Illustrator, com as medidas do `04-como-criar-logo-de-produto.md` |
| Proposta e apresentação | **python-docx e python-pptx** | editar direto os modelos em `06-papelaria` |
| Imagem por IA (só para rascunho de símbolo) | GPT de imagem | qualquer gerador; o resultado **sempre** é vetorizado e alinhado depois |
| Som | síntese própria em Python (`som.py`) | biblioteca de efeitos, a −16 LUFS |
