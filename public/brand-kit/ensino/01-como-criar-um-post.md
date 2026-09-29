# Como criar um post da Norte (feed, carrossel, story, reels)

Régua de qualidade: `07-posts-referencia/solucoes-norte/`. Abra antes de começar. Ele foi aprovado pelo
fundador e mostra o nível esperado.

---

## 1. Antes de desenhar: o texto

1. **Uma ideia por post.** O que a pessoa tem que entender em 3 segundos?
2. **Título concreto, de chão de loja.** O melhor formato é uma cena ou um contraste curto:
   - "Nota fiscal? Sai do caixa."
   - "Um pedido, três destinos."
   - "O estoque do sistema igual ao da prateleira."
   - "Damos o norte certo para empresas que querem crescer."
3. **Apoio de 1 ou 2 frases**, com o fato que sustenta o título.
4. **Fonte do texto:** o site (`codigo/site-referencia/src/sections/**`) e o `MARCA.md` §1. **Não
   invente** número, cliente, depoimento ou resultado. Dado de exemplo leva a marca "exemplo".
5. **Nomes certos:** Norte para Negócios, Norte Vendas, Norte Estoque, Norte Avalia, Norte Pisos.

## 2. Estrutura de carrossel que funciona

| Slide | Função | Tipo |
|---|---|---|
| 1 · Capa | promessa ou gancho + assinatura animada | **vídeo** (animação uma vez) |
| 2 · Contexto | o problema ou o panorama (ex.: soluções lado a lado) | imagem |
| 3–4 · Prova | o produto de verdade: print oficial num aparelho + objeto físico animado (cupom, etiqueta) | **vídeo** |
| último · Fechamento | a frase-síntese + convite com o site | imagem |

- Use de 5 a 8 slides. **Misture imagem e vídeo.** Nem tudo mexe.
- **Cada slide com identidade própria:** alterne escuro (azul-noite) e claro (papel quadriculado). Slide
  de produto vai na cor do produto.

## 3. Especificação visual

| Item | Valor |
|---|---|
| Tamanho | feed 1080 × 1350 (4:5) · story e reels 1080 × 1920 |
| Margem lateral | 86 px |
| Topo (todo slide, menos capa e fechamento) | assinatura horizontal oficial com 62 px de altura à esquerda (`lockup-branco.png` ou `lockup-azul.png`) + página `03/05` em Mono à direita |
| Rótulo | traço de 40 × 3 px + CAIXA ALTA 21 px Bold, espaçamento +3 |
| Título | 64–84 px Bold, espaçamento −2,5%, entrelinha 1,04 |
| Apoio | 27–30 px Regular, entrelinha 1,42 |
| Chips | pílula, 22 px Bold em caixa alta, fundo branco a 14% |
| Fundo escuro | azul-noite + luz radial `#2E3380` + vinheta |
| Fundo claro | papel `#F5F5F9` + quadriculado de 54 px a 5% |
| Fonte | Atkinson Hyperlegible (Mono para páginas e dados) |

## 4. Mostrar o produto (o que dá credibilidade)

- **Print oficial** de `08-recursos/telas-oficiais/`, dentro de um notebook (moldura `#1A1B2E`) ou de um
  celular. Nunca use print com dado real de cliente.
- **Objeto físico animado** ao lado:
  - Vendas: o **cupom DANFE NFC-e completo** saindo da impressora aos trancos (tarja "exemplo", itens,
    total, Pix, chave, QR e número);
  - Estoque: a **etiqueta** com QR, lote e validade, e o leitor conferindo.
- Código pronto de tudo isso: `codigo/animacoes-remotion/src/post/Solucoes.tsx`.

## 5. Produzir

### Com o código do kit (recomendado)

1. Duplique `src/post/Solucoes.tsx` para um arquivo novo e troque os textos e as cenas.
2. Registre as composições em `src/Root.tsx`:
   - animados com `d` igual ao número de quadros da animação (~130–170);
   - estáticos com `d: 1`.
3. Duplique `scripts/render-solucoes.sh` e gere:
   - vídeos de 15 s (a animação toca uma vez e o último quadro fica parado);
   - PNGs para os estáticos.
4. Coloque o som em `scripts/som_quem.py` (tem exemplos com as chaves `sol-*`).

### Sem código (Canva ou Figma)

Siga a §3 com as logos de `01-logos` e as fontes de `02-fontes/pecas-e-logo`. Para a parte animada, use os vídeos
prontos de `04-animacoes`.

## 6. Legenda do post (texto que acompanha)

- Primeira linha: a ideia do post em uma frase.
- 2 a 4 linhas curtas com o que a pessoa ganha.
- Fechamento: "Fale com a gente: norteparanegocios.com.br".
- Poucas hashtags e só relevantes (ex.: #gestao #restaurante #estoque).

## 7. Checklist do post

- [ ] Uma ideia só, com título concreto e verdadeiro.
- [ ] A assinatura oficial está no topo (duas linhas) e a página está numerada.
- [ ] Imagem e vídeo estão misturados, e a animação toca uma vez e fica parada.
- [ ] Cada slide tem identidade própria, e o produto aparece na cor dele.
- [ ] O print é oficial, sem dado de cliente, e o dado de exemplo está marcado.
- [ ] Você abriu o resultado no tamanho do celular antes de entregar.
