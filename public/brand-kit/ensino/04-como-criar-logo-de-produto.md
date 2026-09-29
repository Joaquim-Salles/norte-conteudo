# Como criar o logo de um produto novo

> A logo da **Norte para Negócios** (N + foguete + rastro) **não se redesenha**. Este tutorial é para
> **produtos novos** da família (como foram feitos Vendas, Estoque, Avalia e Pisos).

---

## 1. A regra da família

Todo produto usa **o mesmo bloco N 3D isométrico** (branco chapado, sem contorno, cantos levemente
arredondados). **Só muda o que fica na face de cima**, e esse objeto diz o que o produto faz:

| Produto | Objeto em cima | Cor |
|---|---|---|
| Norte Vendas | maquininha de cartão com cupom saindo | `#484DB5` |
| Norte Estoque | duas abas de caixa (o N vira uma caixa) | `#168E9A` |
| Norte Avalia | prancheta de avaliação deitada com checks | `#9A3B86` |
| Norte Pisos | a face de cima vira piso de paginação amarrada | `#00497E` |

**Como escolher o objeto:**
- é um objeto físico do dia a dia do cliente daquele produto;
- é legível pequeno, a 40 px;
- é feito só de formas cheias com recortes (como as teclas da maquininha), sem traço fino;
- ocupa o mesmo tamanho e a mesma posição da maquininha do Vendas.

**Cor do produto:** uma cor nova, que não se confunda com as outras, que funcione com branco por cima e
que tenha uma versão clara para o brilho da animação.

**Nome:** "Norte" + uma palavra, escrito em duas linhas ("Norte" / "Produto"), Atkinson Hyperlegible Bold.

## 2. Processo (o mesmo usado no Avalia e no Pisos)

### Caminho A: objeto geométrico (ex.: piso, grade, prateleira) → vetor direto

1. Pegue o bloco N em vetor. É o path `body` do Estoque ou do Vendas em
   `codigo/animacoes-remotion/src/data.json` (com `t` = transform e `d` = path).
2. Meça a face de cima do bloco. No Estoque ela é um losango com os cantos
   **E (593,792), T (1246,463), D (1913,793) e B (1250,1130)**, nas coordenadas do símbolo.
3. Desenhe o objeto com geometria dentro dessa face. O piso, por exemplo, é uma grade mapeada no losango
   com `P(u,v) = T + u·(D−T) + v·(E−T)`, com juntas de 24 unidades e cantos arredondados via
   `stroke-linejoin: round`.
4. Cada peça que vai animar (cada placa, por exemplo) vira **um path separado**.

### Caminho B: objeto com desenho (ex.: prancheta, maquininha) → IA + vetorização

1. **Gere rascunhos com IA de imagem**, mandando como referência os ícones aprovados
   (`01-logos/norte-vendas/icone/…png` e `01-logos/norte-estoque/icone/…png`). Use o prompt de
   `06-prompts-prontos.md`, que manda **copiar o bloco exato** e trocar só o objeto. Peça de 4 a 8
   opções.
2. **Descarte** tudo que mudou o bloco (contorno, outro ângulo, outra espessura). Isso acontece muito na
   primeira rodada.
3. Escolhida a opção, **vetorize só o objeto:**
   ```python
   # separar peças: o maior componente branco é o bloco (descarte); os outros são o objeto
   lab, n = scipy.ndimage.label(imagem > 200)
   # salvar a máscara do objeto em .pbm e vetorizar
   potrace objeto.pbm -s --turdsize 40 --alphamax 1.0 --opttolerance 0.2 -o objeto.svg
   ```
4. **Alinhe o objeto sobre o bloco vetorial oficial.** Calcule a escala e o deslocamento que levam a
   caixa do bloco da imagem até a caixa do `body` oficial
   (Vendas: `566,910 → 1940,2014`):
   `s = média(larguraOficial/larguraImagem, alturaOficial/alturaImagem)`. Aplique
   `translate(TX TY) scale(s)` no grupo do objeto.
5. Se o objeto tem detalhes que vão animar (os checks do Avalia, por exemplo), separe esses furos como
   paths próprios (rotule os buracos da máscara e vetorize cada um).

## 3. Gerar todas as versões (lockups)

Use `codigo/geradores-marca/fonte/prod.py`. Ele escreve o nome em curvas com a fonte da marca, nas
proporções oficiais: texto com 62% da altura do símbolo e afastamento de 16%.

```python
import prod
prod.inner = '<g>' + CORPO + OBJETO + '</g>'   # o símbolo, com fill="#FBFBFE"
prod.tb = (436.0, 381.0, 1633.0)                # enquadramento (Vendas: 436 381 1633 · Estoque: 517 463 1473)
COR = '#9A3B86'
prod.lock('Avalia', 'h', '#FBFBFE', None, COR)          # horizontal sobre a cor
prod.lock('Avalia', 'h', COR, None, '#FFFFFF')          # horizontal sobre branco
prod.lock('Avalia', 'h', '#FBFBFE', None, '#0B0B0F')    # horizontal sobre preto
prod.lock('Avalia', 'h', '#FBFBFE', None, None)         # horizontal transparente branco
prod.lock_v2('Avalia', '#FBFBFE', COR)                  # vertical sobre a cor
```
Símbolo sozinho e ícone de app: veja o bloco `files[...]` usado para o Pisos e o Avalia (mesmo viewBox do
produto de base).

**Entregue as 11 versões, em SVG e PNG com 1600 px de largura:**
- horizontal: cor, branco, preto, transparente-branco e transparente-cor;
- vertical: cor, branco e transparente-cor;
- símbolo branco e símbolo cor (transparentes);
- ícone de app.

Nomeie no padrão do kit: `norte-avalia_horizontal_branco_fundo-avalia.png`.

## 4. Depois de pronto

1. Coloque as versões em `01-logos/<produto>/` e regenere `_todas-as-logos.png`.
2. Atualize o `MARCA.md`: tabela da família, cores, nomes e o que o símbolo representa.
3. Crie a animação de entrada (`02-como-criar-animacoes.md` §3.4), com a cena física do objeto
   (a prancheta cai e os checks aparecem; as placas assentam uma a uma).
4. Crie a capa de destaque do Instagram (copie `05-instagram/capas-destaque/03-norte-estoque.svg` e troque
   o símbolo e as cores).

## 5. Checklist do símbolo

- [ ] O bloco N é **idêntico** ao dos outros produtos (compare lado a lado com o Vendas e o Estoque).
- [ ] O objeto é físico, do dia a dia do cliente, e legível a 40 px.
- [ ] O símbolo está em uma cor só, sem contorno fino, sem degradê e sem sombra.
- [ ] Foi aprovado pelo fundador **antes** de gerar as 11 versões.
- [ ] As peças que animam estão separadas em paths próprios.
