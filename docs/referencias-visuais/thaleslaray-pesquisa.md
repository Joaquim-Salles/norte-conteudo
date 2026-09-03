# Pesquisa real — perfil @thaleslaray (Instagram, via instagram-control MCP)

Pesquisa feita em 2026-09 puxando o feed real de @thaleslaray (35 posts, captions completas,
métricas de engajamento reais). Limitação encontrada e documentada: as ferramentas
disponíveis (`instagram_get_media_info`, `instagram_download_post`, WebFetch na URL do
post) não expõem os slides internos de um carrossel — só metadado do post inteiro ou a
capa. `instagram_download_post` funciona só pra foto única (`type: 1`), retorna erro
"Must been photo" pra carrossel (`type: 8`). Por isso a pesquisa cobre: (a) estrutura e
tom de 35 captions reais, (b) 1 imagem real baixada e inspecionada de verdade (post de
foto única — a única imagem nativa dele disponível pra download direto).

## Imagem real analisada: `thaleslaray-iceberg-meme.jpg`

Post nativo (não carrossel), formato "meme de iceberg" — MUITO diferente de qualquer
coisa no catálogo da Norte hoje:

- **Fundo**: foto real de banco de imagem (iceberg, metade acima/abaixo d'água) — não é
  cor sólida nem gradiente, é fotografia documental.
- **Tipografia**: texto com preenchimento branco + contorno preto GROSSO (estilo "meme
  clássico"/legendagem de vídeo viral) — não é a tipografia limpa/editorial que a Norte
  usa hoje em nenhum estilo.
- **Composição**: texto posicionado livre sobre a foto (topo-direita e base-esquerda),
  não em blocos/cards — a foto é o layout, o texto flutua sobre ela.
- **Ícones**: 2 selos pequenos, quadrados, cantos arredondados, com o ícone oficial de
  app (ChatGPT, Claude) — usados como "prova de contexto", não como decoração.
- **Formato retórico**: comparação/piada relacionável (analogia clássica do iceberg:
  "o que eu mostro" vs "o que eu escondo") — humor + insight, não didático puro.

## Padrões dos 35 captions reais (estrutura, não visual)

- 23/35 são carrossel — tema dominante: curadoria semanal de novidades
  Claude/Anthropic, comparativos de modelo, "N exemplos do que já está rodando".
- Hook de abertura sempre forte: afirmação provocativa curta ("Automação não organiza
  processo. Ela apenas executa em escala...") ou pergunta direta.
- CTA de maior engajamento medido: "Comenta [PALAVRA]" pra receber material no direct —
  1.778 e 3.085 comentários nos 2 exemplos mais fortes (visto ao vivo, não estimado).
- Tom: 1ª pessoa, direto, mistura notícia + opinião + oferta, sem jargão vazio.

## Aplicação recomendada pro catálogo da Norte

Um preset de `visualStyle` novo inspirado NESSE formato específico (não no genérico
"estilo Instagram de criador") faria sentido: foto real de fundo (Pexels, já temos o
pipeline) + tipografia com contorno grosso (efeito "meme"/legenda) + selo pequeno de
ícone de contexto (ex: ícone do produto Norte sendo citado, não logo de terceiro) +
formato de analogia/comparação relacionável no texto. Isso é genuinamente diferente dos
7 presets existentes (nenhum usa contorno de texto nem widget-selo de ícone assim).
