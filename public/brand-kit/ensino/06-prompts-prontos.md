# Prompts prontos

Copie, troque o que está entre [colchetes] e cole na IA junto com os arquivos indicados.

---

## 1. Briefing geral (cole primeiro, em qualquer IA)

```
Você vai criar peças para a marca Norte para Negócios. Anexei o kit de marca.
Antes de fazer qualquer coisa:
1. Leia ensino/00-COMECE-AQUI.md e MARCA.md inteiros.
2. Leia o tutorial da tarefa em ensino/.
3. Use só as logos de 01-logos (nunca redesenhe), as cores de tokens/ e as fontes de 02-fontes (Atkinson nas peças, Geist no site).
4. Não invente números, clientes nem depoimentos; dado de exemplo leva a marca "exemplo".
5. Antes de entregar, passe o checklist do MARCA.md §9 e me mostre o resultado renderizado.
Tarefa: [descreva aqui]
```

## 2. Post ou carrossel

```
Crie um carrossel de [N] slides para o Instagram da Norte para Negócios sobre [tema].
Siga ensino/01-como-criar-um-post.md e use 07-posts-referencia/solucoes-norte como régua de qualidade.
Formato 1080x1350. Capa animada (animação uma vez e depois parado até 15 s), slides de prova com print
oficial de 08-recursos/telas-oficiais num notebook ou celular + um objeto físico animado.
Textos só a partir do site (codigo/site-referencia) e do MARCA.md. Entregue MP4 para os animados e PNG
para os estáticos, numerados na ordem.
```

## 3. Animação de logo ou cena

```
Crie uma animação de [marca/cena] no padrão Norte. Siga ensino/02-como-criar-animacoes.md.
A cena física é: [o objeto e o que ele faz, ex.: "a etiqueta sai da impressora e o leitor confere"].
Use o projeto codigo/animacoes-remotion (funções rise, drop, thud, Ripple; câmera, luz, vinheta, grão,
motion blur, nome letra a letra e faixa de brilho no fim). 5,5 s a 30 fps. Formatos: 16:9, 1:1, 9:16 e
16:9 transparente. Som com scripts/som.py a −16 LUFS. Mostre quadros do início, meio e fim antes de
renderizar tudo.
```

## 4. Seção ou página de site

```
Crie [a seção/página] do site da Norte seguindo ensino/03-como-criar-um-site.md e o código de
codigo/site-referencia (Astro + GSAP + ScrollTrigger + Lenis). Reaproveite as receitas de reveal,
impressora (steps), linha que se desenha e cena fixada com pin. Tenha versão de celular e respeite
prefers-reduced-motion (nada começa invisível no HTML). Texto curto, de chão de loja, só fatos.
```

## 5. Símbolo de produto novo (gerador de imagem, para rascunho)

Anexe `01-logos/norte-vendas/icone/norte-vendas_icone-app.png` e
`01-logos/norte-estoque/icone/norte-estoque_icone-app.png`.
```
As imagens anexas são símbolos APROVADOS de uma família: "Norte Vendas" (N maciço que forma um BLOCO
HEXAGONAL ISOMÉTRICO limpo com uma maquininha na face de cima) e "Norte Estoque" (o mesmo bloco com a
face de cima em 2 abas de caixa). REGRA ABSOLUTA: copie o bloco N EXATAMENTE (mesma silhueta, ângulo,
proporções, branco chapado, corte da diagonal), sem contornos e sem linhas de aresta — troque SOMENTE o
objeto em cima do bloco, no mesmo tamanho e posição da maquininha. Objeto branco chapado, formas cheias
com recortes de espaço negativo, legível pequeno, nada infantil. Fundo sólido [cor do produto],
quadrado, símbolo centralizado ~60% da largura, sem texto, sem sombra.
Produto: "Norte [Nome]" ([o que faz]). Gere [6] opções, cada uma com um objeto diferente:
(1) [objeto] (2) [objeto] …
```
Depois, siga `04-como-criar-logo-de-produto.md` §2B para vetorizar e alinhar no bloco oficial.

## 6. Apresentação ou proposta

```
Monte [uma apresentação / uma proposta] para [cliente/assunto] usando o modelo em 06-papelaria/
(siga ensino/05-como-criar-pecas-impressas.md). Títulos afirmativos, no máximo 3 itens por slide,
só fatos que eu confirmar. Substitua todo texto entre [colchetes] e me liste o que ficou pendente.
```
