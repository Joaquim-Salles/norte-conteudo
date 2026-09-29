# Como criar apresentações, propostas e peças impressas

Modelos prontos em `06-papelaria/` (instale as fontes de `02-fontes/pecas-e-logo/` antes de editar).

## 1. Apresentação (slides)

- **Modelo:** `06-papelaria/apresentacao/Apresentacao-Modelo-Norte.pptx`, em 16:9. Abre no PowerPoint,
  no Keynote e no Google Slides.
- **Os 9 layouts:**
  1. capa azul-noite;
  2. agenda;
  3. divisória com número grande;
  4. conteúdo com título afirmativo;
  5. duas colunas com imagem;
  6. números (3 cartões);
  7. depoimento;
  8. sistemas (4 produtos);
  9. encerramento.
- **Regras:**
  - **título afirmativo**, que diz a conclusão do slide;
  - no máximo 3 itens por slide;
  - um número grande vale mais que um parágrafo;
  - o rodapé leva símbolo, seção e página.
- **Gerar por código:** `codigo/geradores-marca/slides.py` (python-pptx). Os tamanhos foram pensados em
  pixels de 1920 e convertidos para pontos (×0,62).

## 2. Proposta comercial

- **Modelo:** `06-papelaria/proposta-comercial/Proposta-Comercial-Modelo-Norte.docx`, em A4.
- **Estrutura:**
  - capa (logo, título, cliente, data);
  - entendimento do cenário;
  - objetivos com indicador;
  - nossa proposta (Diagnóstico, Implantação, Acompanhamento);
  - entregáveis;
  - cronograma;
  - investimento com as condições;
  - próximos passos;
  - sobre a Norte.
- O texto **entre [colchetes] e em cinza itálico** é para substituir.
- **Gerar por código:** `codigo/geradores-marca/proposta.py` (python-docx). Os títulos forçam a fonte da
  marca, tirando a fonte do tema do Word.

## 3. Cartão de visita

- **Arquivo:** `06-papelaria/cartao-de-visita/cartao.html`. Vira PDF de gráfica com 96 × 56 mm
  (90 × 50 + 3 mm de sangria) e fontes embutidas.
- **Frente:** azul-noite com a assinatura horizontal branca.
- **Verso:** branco, com nome, cargo, telefone, e-mail, site e o símbolo no canto.
- Para gerar para uma pessoa, troque os dados no HTML e imprima em PDF (Chrome ou Playwright, com
  `preferCSSPageSize`).

## 4. Assinatura de e-mail

- **Arquivo:** `06-papelaria/assinatura-email/assinatura.html`. É uma tabela com estilos inline,
  compatível com o Gmail.
- O símbolo (`simbolo-norte-144.png`) entra pelo botão de imagem do Gmail.

## 5. Impressão em geral (gráfica, adesivo, fachada, camiseta)

- Mande **sempre o SVG** (vetor).
- Uma cor:
  - fundo claro: azul-noite `#14163A`, ou preto `#0B0B0F`;
  - fundo escuro: branco.
- **Respeite a área de respiro** (1 x) e o **tamanho mínimo**: 8 mm para o símbolo e 30 mm para a
  horizontal.
- Para gráfica, as cores CMYK aproximadas são:
  - azul-noite: C 100, M 95, Y 35, K 55;
  - Vendas: C 80, M 72, Y 0, K 0;
  - Estoque: C 85, M 20, Y 40, K 5.

  Peça prova de cor.
