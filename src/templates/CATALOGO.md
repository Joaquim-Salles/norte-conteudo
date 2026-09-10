# Catálogo de Templates — pós-reset v2 (2026-09-05)

## Rodada 26 — Pilares/Solução: prints reais NTB Vendas/Estoque, correção direta do fundador (2026-09-09)

### Correção do fundador (sobrepõe o briefing original de marketing)

O fundador pediu prints reais do NTB Vendas e do NTB Estoque no carrossel: "está muito vazio,
muito branco, quero mais informações, até informações visuais, como sites". Isso contraria a
instrução original do sócio de marketing ("evitar excesso de telas de sistema") — mas correção
explícita do fundador vale mais. Tela de sistema aqui é PROVA VISUAL de que a NTB é real e
funciona, não decoração solta.

### O que mudou — só `PilaresSolucao` (slide 3)

Os cards `NTB Vendas` e `NTB Estoque` da grade 2×2 cresceram (`h=260`, contra `h=168` dos outros
2) e ganharam uma prévia de tela real emoldurada — `PhoneFrame`/`BrowserFrame` de
`lib/DeviceFrame.tsx` (componentes já existentes, usados no formato Etapas — reaproveitados, não
recriados), levemente rotacionada (±3-4°) como mockup de app/browser de verdade, ao lado do
rótulo+legenda dentro do próprio card. NUNCA a screenshot crua solta no slide. `Gestão e
Processos`/`Tecnologia e UX` continuam só texto (conceituais, sem tela pra mostrar).
`justifyContent` do slide passou de `flex-start` pra `center` — a grade maior sozinha não
preenchia o vazio que motivou o pedido do fundador.

### Escolha de fonte de imagem — decisão de segurança de dado

`public/screenshots/` tinha 2 pares candidatos pro NTB Estoque: `home-desktop.png` (conta QA
"Claude QA", métricas reais porém sem cliente identificável) e
`ntb-estoque-dashboard-donana-brotas.jpg` (usuário real logado, nome da loja "Donana Brotas"
visível, 259 produtos abaixo do mínimo e 114 erros de sincronização em destaque — expõe problema
operacional real de um cliente específico pelo nome). Optei por `home-desktop.png`, recortada só
no header (KPI "2.279 produtos em estoque" + início de "precisa de atenção", `cropHeight=0.42`)
— não chega a mostrar a seção "Claude QA" no rodapé do menu nem números alarmantes de cliente
nenhum. NTB Vendas usa `vendas-mobile.png` (landing "Cardápio Digital", genérica, sem cliente
específico, `cropHeight=0.62` — hero + CTA, corta antes das nuvens decorativas).

### Verificação

`npx tsc --noEmit -p .` limpo. Renderizado `PilaresSolucao.png`, conferido em zoom (crop via
PIL) nos dois mockups: legendas legíveis, sem corte de informação errada, sem nome de loja nem
número sensível de cliente visível. Render checado por completo depois de centralizar
verticalmente (1ª versão com `justifyContent: flex-start` deixava metade inferior do slide vazia
— contradizia o próprio motivo do pedido). PNG re-copiado pra `~/Downloads/` e
`~/Projects/norte para negocios/posts/Pilares/PilaresSolucao.png`.

Os outros 3 slides (`PilaresCapa`, `PilaresProblema`, `PilaresFechamento`) NÃO foram alterados —
já tinham sido revisados/aprovados nas Rodadas 23-25 e não pedem prova de tela (Capa é diagrama
de pilares, Fechamento é CTA com mascote); forçar screenshot neles não ficaria bem, então não
mexi.

### Arquivos alterados

- `src/templates/PilaresApresentacao.tsx` — import de `staticFile` e `BrowserFrame`/`PhoneFrame`
  de `../lib/DeviceFrame`; `EcoCard` ganhou `caption`/`preview`; novo `EcoPreview`; `ECOSYSTEM`
  com alturas assimétricas; comentário de topo do arquivo atualizado com a decisão.
- `~/Downloads/PilaresSolucao.png`, `~/Projects/norte para negocios/posts/Pilares/PilaresSolucao.png`
  — re-renderizados.

---

## Rodada 25 — Pilares/Capa: 2ª correção, comparação direta com InstitucionalCapa aprovada (2026-09-09)

### Rejeição do fundador (Rodada 24) — "continua fraca/genérica, a capa devia ter mais impacto"

A correção da Rodada 24 (chips de papel kraft numa fileira fina abaixo do título) ainda não
satisfez o fundador. Comparação direta pedida pelo coordenador contra `InstitucionalCapa.png`
(peça já aprovada no catálogo, mesma família visual) revelou o gap real: lá os cards de papel
kraft são GRANDES (não chips de 1 linha fina), dominam os 2/3 SUPERIORES do frame como elemento
de composição PRINCIPAL, cada um carrega um mini-ícone/gráfico de substância (linha de dados,
barra de progresso, ícone de documento, aspas), e o título grande vem DEPOIS, como conclusão da
composição — não é o primeiro elemento que o olho encontra.

### Correção — reaproveitar os componentes REAIS de Rotas, layout bespoke sem TrackRail

`PilaresCapa` passou a importar e usar `PostitCard`/`HandDrawnAnnotation` DIRETO de
`RotasKit.tsx` (não recriar, não improvisar aproximação) — mas SEM `RotasCapaShell`/`TrackRail`:
deliberado, porque o shell genérico de Rotas desenha linhas de trilho coloridas por baixo da
grade (`<TrackRail tracks={tracks} activeIndex={null} />`), e Pilares não tem trilhas paralelas —
usar o shell inteiro importaria um mecanismo de OUTRO formato que não faz sentido semântico aqui.
Só o mecanismo de card+anotação foi reaproveitado (é isso que o fundador pediu: "reaproveite o
componente visual real dos post-its", não "reaproveite o formato Rotas inteiro").

**As 6 palavras-pilar viraram 4 CARDS GRANDES**, agrupadas por afinidade (pedido explícito:
"menos itens, maiores"):
- **Gestão** (Estratégia + Processos) — ícone `GeometricDiagram` (linha de nós conectados),
  mesmo componente e mesmo tipo de recheio — CONCEITO/PROCESSO — usado no card "Registra" do
  Institucional. Cor `brand.primary`.
- **Operação** (Vendas + Estoque) — ícone NOVO `DuoOrbitIcon` (2 círculos sobrepostos nas cores
  reais dos 2 produtos, laranja+teal) — metáfora abstrata de "operação real acontecendo junto",
  nunca organograma. Cor do label neutra (`neutral.cinzaEscuro`, os 2 produtos já têm cor própria
  no ícone).
- **Tecnologia** — ícone NOVO `NetworkIcon` (3 nós conectados, 1 traço único monocromático, mesmo
  princípio de `EditorialIcons.tsx`). Cor `neutral.cinzaMedio` (neutra, tecnologia como suporte,
  não protagonista de cor).
- **Controle** — `MiniBarCompare` (mesmo componente e mesma lógica do card "Mede" do
  Institucional: "com controle" vs. "no achismo", sem inventar número real). Cor
  `productColors.avalia` (indigo do produto Norte Avalia — fit semântico: avaliação/decisão é
  literalmente sobre "controle"; testei preto puro primeiro e ficou pesado/duro contra o kraft,
  trocado depois de comparar os 2 renders).

Todas as 6 palavras originais do briefing continuam presentes — agora no SUBTÍTULO em prosa
abaixo do título ("Estratégia, processos, vendas, estoque, tecnologia e controle — juntos, não
isolados."), então nada foi perdido, só a REPRESENTAÇÃO VISUAL do slide ficou mais forte com 4
elementos grandes de substância em vez de 6 pequenos.

**Ordem visual invertida**: cards primeiro (topo, `cardsAreaHeight` efetivo 610, mesmo grid 2×2
com rotação/overlap orgânico das posições já validadas em `InstitucionalCapa`), `HandDrawnAnnotation`
("nada roda sozinho", itálico com seta apontando pro 1º card, mesmo padrão do Institucional),
título grande (peso misto romano+bold, mantido da Rodada 24) DEPOIS dos cards, como conclusão —
correção direta do pedido "inverta a ordem visual".

### QA visual (Read tool, comparado estruturalmente com InstitucionalCapa.png)

Re-renderizado 2x (1º com `Controle` em preto puro, achei pesado comparando lado a lado com o tom
mais colorido do Institucional; 2º com `productColors.avalia`, mais coerente). Confirmado na
versão final: 4 cards grandes dominam os 2/3 superiores, cada um com mini-visual de substância
(não só texto), overlap de profundidade real (card "Operação" atrás do "Controle", mesmo efeito
do Institucional), anotação manuscrita com seta no topo, título como conclusão depois dos cards,
subtítulo cobrindo as 6 palavras originais. `npx tsc --noEmit -p .` limpo (2 rodadas). PNG
re-copiado pra `~/Downloads/` e `~/Projects/norte para negocios/posts/Pilares/`.

### Arquivos alterados

- `src/templates/PilaresApresentacao.tsx` — `PilaresCapa` reescrito de novo (import de
  `PostitCard`/`HandDrawnAnnotation` de `RotasKit.tsx`, `GeometricDiagram`/`MiniBarCompare`
  reaproveitados, `DuoOrbitIcon`/`NetworkIcon` novos, locais a este arquivo).
- `out/reset-v2/PilaresCapa.png` — re-renderizado 2x.
- `~/Downloads/PilaresCapa.png`, `~/Projects/norte para negocios/posts/Pilares/PilaresCapa.png`
  — atualizados.

Os outros 3 slides (`PilaresProblema`, `PilaresSolucao`, `PilaresFechamento`) não foram alterados
— o fundador apontou a Capa especificamente como o problema, e os outros 3 já usam elementos
ancorados (nós numa linha, cards de papel com borda de cor, halo+mascote).

---

## Rodada 24 — Pilares/Capa: correção após pesquisa de referências REAIS (@claudeai, @toasttab) (2026-09-09)

### Rejeição do fundador (Rodada 23) e o que ele pediu

O fundador não gostou do `PilaresCapa` da Rodada 23 (diagrama hub-and-spoke) e pediu pra olhar
carrosséis REAIS (não só a foto de perfil) de @claudeai e @toasttab antes de tentar de novo.
Achados concretos trazidos pelo coordenador depois de olhar posts reais:

- **@claudeai** ("Now possible with Claude"): fundo cream sólido; badge/pill ancorado no CANTO
  (nunca solto no meio); título grande com PESO MISTO dentro da mesma frase (parte romana, parte
  bold, mesma fonte — não itálico); overline pequeno (label) acima do título, canto superior
  esquerdo; abaixo do título, um CARTÃO EMOLDURADO segurando o elemento visual secundário — nunca
  elemento solto flutuando no espaço vazio, mesmo com muito espaço negativo.
- **@toasttab**: textura de papel/impresso tátil real — a Norte já tem esse instinto no papel
  kraft rasgado dos post-its de `Rotas`, só não tinha sido reaproveitado em Pilares ainda.

### Diagnóstico do erro real da Rodada 23

O diagrama hub-and-spoke (linhas finas saindo de um ponto central até cada palavra) violava
DIRETAMENTE o padrão real: lia como "gráfico genérico/diagrama fino", não como o tratamento
editorial confiante e ANCORADO da referência — nenhuma das 6 palavras estava presa a um cartão ou
canto, todas boiavam soltas ao redor do texto central, exatamente o oposto do princípio "nunca
elemento solto flutuando no vazio" observado no Claude real.

### Correção aplicada em `PilaresCapa`

1. **Diagrama hub-and-spoke removido por completo** (SVG de linhas + `PilarNode` deletados).
2. **6 palavras-pilar → CHIPS de papel kraft rasgado**: reaproveitado o MESMO tratamento visual
   do `PostitCard` de Rotas (fundo `#fdf6e8`, clip-path de papel rasgado, sombra) — não um
   componente novo. Recriei `tornClipPath` localmente em escala de CHIP (`chipTornClip`,
   amplitude 1.6 em vez dos 4.6-5.4 do post-it, porque a mesma amplitude do post-it (pensada pra
   ~292×260px) ficaria grosseira/ilegível num chip de ~50px de altura) — mesma decisão de
   isolamento por formato já usada em Argumento, não importar de `RotasKit.tsx` direto.
3. **Cluster ANCORADO**: os 6 chips ficam em `flexWrap` logo ABAIXO do título (2 fileiras reais),
   nunca espalhados soltos pelo frame — correção direta do padrão "sempre ancorado por um cartão"
   observado na referência. Rotação leve alternada por chip (array fixo `[-2, 1.5, -1, 2, -1.5,
   1]`, não `Math.random`, mesmo princípio determinístico do resto do catálogo) dá textura
   "recortada à mão" sem virar bagunça. Vendas/Estoque levam ponto na cor real do produto dentro
   do chip (mesmo princípio do slide 3); os outros 4 ficam neutros.
4. **Título com peso misto dentro da mesma frase**: trocado o tratamento de ênfase de itálico
   (`fontStyle: 'italic'`) pra BOLD (`fontWeight: 700`) na mesma fonte Newsreader — "A rotina real
   do negócio pede mais do que **um sistema.**" — testando o padrão real "Now possible with
   **Claude**" (peso, não estilo, cria a ênfase). Mantido roman+bold em vez de itálico
   especificamente nesta peça; itálico continua sendo o padrão de ênfase no resto do catálogo
   (Rotas/Argumento) — não reabri essa decisão nos outros formatos, só testei a alternativa aqui
   porque foi pedido explicitamente pra esta peça.
5. **Mantido**: fundo bege (`neutral.begeClaro`), `GridTexture` sutil, overline label no canto
   superior esquerdo ("Norte Para Negócios", cor `brand.primary`) — já batia com o padrão Claude,
   não mexi.

Textura tátil do Toast (papel/impresso) endereçada via o próprio reaproveitamento do papel kraft
rasgado — não criei uma 2ª textura nova; o kraft rasgado JÁ é o equivalente tátil da Norte.

### QA visual (Read tool, comparando contra o padrão descrito, não só "ficou bonito")

Re-renderizado `PilaresCapa.png`. Confirmado: chips com aparência de papel recortado legível
mesmo pequenos, cluster preso logo abaixo do título (nunca solto), título com contraste real
romano/bold na mesma frase, overline no canto batendo com o padrão observado. `npx tsc --noEmit
-p .` limpo. PNG re-copiado pra `~/Downloads/` e `~/Projects/norte para negocios/posts/Pilares/`.

Os outros 3 slides (`PilaresProblema`, `PilaresSolucao`, `PilaresFechamento`) NÃO foram alterados
nesta rodada — já usavam elementos ancorados (nós presos numa linha, cards de papel com borda de
cor, halo+mascote), não elemento solto boiando sozinho no vazio; o problema mais forte identificado
pelo fundador foi especificamente a Capa.

### Arquivos alterados

- `src/templates/PilaresApresentacao.tsx` — `PilaresCapa` reescrito (removido hub-and-spoke,
  adicionado `chipTornClip`/`KraftChip`, título com peso misto).
- `out/reset-v2/PilaresCapa.png` — re-renderizado.
- `~/Downloads/PilaresCapa.png`, `~/Projects/norte para negocios/posts/Pilares/PilaresCapa.png`
  — atualizados.

---

## Rodada 23 — Formato "Pilares": 1º carrossel FIXADO (pinned post), apresentação institucional da NTB (2026-09-09)

### Pedido

Sócio de marketing pediu o 1º post fixado do perfil: apresentação rápida da NTB pra quem chega
no perfil pela primeira vez — "a NTB não é só sistema, entende a operação real, oferece
estratégia+processos+tecnologia, tem soluções pra vendas/estoque/gestão". Briefing completo com
copy pronta pra 4 slides (Capa/Problema/Solução/CTA), direção visual ("estética editorial da
Claude com a realidade operacional da Toast" — mesma referência de ousadia tipográfica/contraste
forte já validada nesta sessão pra outra peça, NÃO pra reintroduzir bloco de cor cheia) e lista
do que NÃO pode entrar: Omie, número/estatística inventada, foco só em restaurante, texto
institucional longo, promessa tipo "aumenta vendas".

### Por que é um formato NOVO (não Rotas, não Vozes, não reaproveitamento de Argumento)

Reli `formato-rotas.md` inteiro e revisei `RotasCapa.png`/`ArgumentoFechamento.png` antes de
desenhar qualquer coisa (mesma lição da correção anterior do Argumento: pele visual real da
marca é inegociável, não se inventa sistema visual novo). Rotas pede trilhas paralelas de
verdade (conteúdo não pede isso aqui — é apresentação, não caminhos comparáveis); Vozes pede
foto documental (peça institucional sem fotografia real disponível). Mais próximo em espírito de
"Argumento" (sequência sem trilho, tipografia como protagonista, cor só como detalhe) mas com um
mecanismo de composição PRÓPRIO no slide 1 que nenhuma peça anterior tem.

### Nome escolhido: "Pilares"

Documentando a decisão pedida pelo briefing: nomeei pelo mecanismo central da capa (diagrama de
palavras-pilar em volta da ideia central), não por um nome genérico como "Apresentação" — que
serviria pra qualquer post institucional futuro e não documentaria a composição real desta peça.

### Resolução das 6 palavras-pilar (slide 1, `PilaresCapa`)

Rejeitei a "sopa de palavras solta" que o briefing avisou pra evitar. Construí um diagrama
hub-and-spoke de verdade: 1 ponto-âncora invisível no centro do frame (atrás do bloco de
headline), com 6 linhas finas (SVG, `neutral.cinzaClaro`, opacity 0.55, `strokeWidth 1.25`)
saindo em direção a cada palavra e parando a 66% do caminho (nunca tocam o texto — evita a linha
cruzar por baixo da palavra). As 6 palavras têm PESO/TAMANHO/TRATAMENTO variado por
categoria, não são 6 tags idênticas:
- **Estratégia**, **Processos** — maiores (30-32px), Newsreader itálico, tinta escura: as 2
  ideias mais abstratas/centrais do briefing.
- **VENDAS**, **ESTOQUE** — Atkinson caps 17px, com um PONTO na cor real do produto
  (`productColors.vendas` laranja, `productColors.estoque` teal) — mesmo princípio de cor como
  detalhe usado no slide 3.
- **TECNOLOGIA**, **CONTROLE** — as menores (16px), Atkinson caps, tinta neutra mais clara —
  categorias de suporte, não protagonistas.

Isso lê como constelação desenhada de propósito (hierarquia real, não decoração) em vez de tags
soltas boiando ao redor do texto — validado no PNG renderizado, não só no código.

### Ecossistema de 4 partes (slide 3, `PilaresSolucao`)

4 cards de papel (mesmo princípio do `PaperCard` do Argumento: fundo `#fffdf7`, acento de cor SÓ
na borda esquerda, nunca bloco cheio) em grade 2×2, com um laço fechado pontilhado (SVG `rect`
arredondado, `neutral.cinzaClaro`, `strokeDasharray`, opacity 0.7) atrás deles amarrando os 4
visualmente como conjunto — sugere "ecossistema conectado" sem virar organograma/fluxograma de
sistema (regra do briefing: nada de tela de sistema). NTB Vendas e NTB Estoque usam as cores reais
dos produtos (laranja `#f8a41a`, teal `#2eb5c3` — confirmadas contra `themes.ts`, batem com o que
o briefing pediu); Gestão e Processos usa tinta neutra e Tecnologia e UX usa `brand.primary`
(indigo da marca-mãe) — só os 2 produtos NTB têm cor de produto de verdade, os outros 2 pilares
são conceituais, não produtos vendáveis, então não inventei cor pra eles.

Nenhuma descrição de funcionalidade nos cards — só o nome de cada pilar, conforme a regra
explícita do briefing ("explicação detalhada de funcionalidades" está na lista do que NÃO entra).

### Slide 2 (`PilaresProblema`) — diagrama abstrato, não ilustração de sistema

3 nós (Vendas laranja / Estoque teal / Processos cinza) numa linha pontilhada horizontal, com uma
marca de ruptura (X vermelho, `brand.accent`) exatamente entre Estoque e Processos — metáfora
visual literal da frase "quando vendas, estoque e processos não se conectam". Formas geométricas
abstratas (pontos + linha + X), nunca ícone de tela/dashboard — checado contra a proibição do
briefing.

### Fechamento (slide 4, `PilaresFechamento`) — Mascote como assinatura

Usei o Mascote real (`Mascote`, foguete extraído do bundle do site, NUNCA aproximação genérica)
pequeno (140px) com o mesmo halo suave atrás dele que `ArgumentoFechamento`/
`RotasFechamentoShell` usam — fez sentido aqui, sem forçar: é literalmente a peça de
apresentação institucional da marca, o lugar mais natural pra assinatura do mascote aparecer (ao
contrário de, por exemplo, uma peça de vitrine de produto específico, onde a cor do produto
dominaria mais que a marca-mãe).

### BUG REAL achado e corrigido nesta rodada — `PilaresSolucao` com vazio excessivo na metade
inferior do frame

Comparei o 1º render de `PilaresSolucao.png` com o precedente real (`ArgumentoComplementa.png`,
que tem a mesma proporção "conteúdo em cima, resto do frame livre") e confirmei que TODA peça
aprovada desse tipo preenche o vazio inferior com um `GlyphMark` (numeral/símbolo gigante
translúcido, opacity ~0.05) — `PilaresSolucao` tinha ficado sem isso, lendo como inacabada
comparada ao resto do catálogo. Fix: adicionado `GlyphMark` com símbolo "+" (metáfora de união/
ecossistema, coerente com o conteúdo do slide) no canto inferior direito, mesma opacidade/padrão
das outras peças. Confirmado por re-render.

### Checklist de entrega

1. `npx tsc --noEmit -p .` limpo (2 vezes — antes e depois do fix do `GlyphMark`).
2. 4 Stills renderizados (5 renders totais, incluindo o re-render do fix) em `out/reset-v2/`,
   lidos um a um (Read tool, não só "deveria funcionar").
3. Confirmado slide a slide: fundo bege dominante em todos os 4, `GridTexture` sutil presente,
   Newsreader (headline/ênfase itálica) + Atkinson Hyperlegible (rótulo/corpo) em todos, cor de
   produto SÓ como detalhe (ponto, borda esquerda de card — nunca fundo do slide), nenhuma
   menção a Omie, nenhum número/estatística inventada, nenhuma ilustração de escritório/tela de
   sistema, copy idêntica ao briefing (não reescrita).
4. PNGs copiados pra `~/Downloads/` e `~/Projects/norte para negocios/posts/Pilares/`.

### Arquivos criados/alterados

- `src/templates/PilaresApresentacao.tsx` (novo) — `PilaresCapa`, `PilaresProblema`,
  `PilaresSolucao`, `PilaresFechamento`.
- `src/Root.tsx` — import + 4 `Still`s novas registradas.
- `out/reset-v2/Pilares*.png` — 5 renders (4 peças + 1 re-render do fix de `PilaresSolucao`).

### Autocrítica honesta

Não testei variação dentro do formato "Pilares" ainda (só 1 exemplo, o pinned post pedido) —
mesma ressalva já registrada pra outros formatos novos (ver "Tentativa revertida" no topo do
`SKILL.md`): 1 exemplo valida a pele visual e a estrutura, mas não valida se o mecanismo
hub-and-spoke do slide 1 continua funcionando bem com outro número de palavras-pilar ou outro
comprimento de headline central — não construir uma 2ª peça nesse formato sem essa checagem.

---

## Rodada 20 — Vozes: 4 correções estruturais permanentes + 2 variações novas (2026-09-06)

O fundador reclamou 4 coisas específicas depois de ver `Retrato.tsx`/`VozesGrade.tsx` prontos —
todas viraram regra permanente do formato Vozes (detalhe completo em
`.claude/skills/rafael/references/formato-vozes.md`, seção "Correção estrutural do fundador" +
"Rodada 3"):

1. **Todo slide precisa de foto de fundo** — o slide de Citação do `Retrato.tsx` tinha metade do
   frame em bege sólido sem imagem. Reescrito pra foto cheia.
2. **Fotos do mesmo carrossel se conectam** — `Retrato.tsx` e `VozesGrade.tsx` reescritos pra usar
   1 SÓ FOTO (`corredor-empilhadeira-estoque.jpg`) atravessando TODOS os slides de cada carrossel
   (inclusive o Fechamento, que antes era bege sólido), variando só zoom/crop — cria a sensação
   de "a imagem se completa conforme arrasta".
3. **Uma fonte, um tratamento, sem exceção**: Newsreader itálico SEMPRE pra citação/pergunta/
   tagline, Atkinson Hyperlegible reto SEMPRE pra rótulo/legenda/função, em TODOS os slides —
   isso reabre a decisão da Rodada 17/18 anterior do cartão-tweet do VozesGrade (que usava sans
   reto pro corpo, pra imitar tweet) — regra nova do fundador prevalece.
4. **Menos fórmula fixa** — mesmas 2 composições-base (Retrato documental, Grade "DIY objects"),
   mas ancoragem de texto/scrim varia por slide dentro delas.

**2 variações de conteúdo novas** (pedido explícito: "1 exemplo não basta"):
- `RetratoLoja.tsx` — "um dia na loja" em 5 slides, 1 só foto (`salao-moderno-movimento.jpg`)
  com crop diferente por horário (06h abertura → 09h reposição → 13h pico → 18h conferência →
  fechamento).
- `RetratoAntesDepois.tsx` — "antes/depois" em 4 slides, MESMA foto e MESMO crop
  (`equipe-reuniao-escritorio.jpg`), variando só o tratamento de cor via `filter` CSS (frio/
  dessaturado → split-screen comparando os 2 → quente/vívido → neutro no fechamento).

QA visual real: 17 PNGs renderizados em `out/reset-v2/`, lidos um a um. Confirmado: toda peça
tem foto de fundo, cena reconhecível slide a slide dentro de cada carrossel, citação sempre
itálica serifada e rótulo sempre reto sans sem 1 exceção nas 17 peças. `npx tsc --noEmit -p .`
limpo. Ressalva registrada em `formato-vozes.md`: `RetratoAntesDepois.tsx` usa uma foto de banco
com rosto identificável em primeiro plano (sem nome/etiqueta anexada, mas ainda assim vale
validar com o fundador dado o histórico de cuidado do formato com honestidade de identidade).

Arquivos alterados/criados: `src/templates/Retrato.tsx` (reescrito), `src/templates/VozesGrade.tsx`
(reescrito), `src/templates/RetratoLoja.tsx` (novo), `src/templates/RetratoAntesDepois.tsx`
(novo), `src/Root.tsx` (registro das 9 Stills novas de Loja/Antes-Depois — Retrato/VozesGrade já
estavam registrados, só o conteúdo dos componentes mudou), `.claude/skills/rafael/references/formato-vozes.md`.

## Rodada 17 — Vozes/Grade: Rodada 16 errou a ESTRUTURA da Capa e do cartão de citação (2026-09-06)

### Diagnóstico do fundador

A Rodada 16 rodou o QA visual completo (tsc limpo, 3 problemas achados e corrigidos nos PNGs,
2 skills de crítica visual aplicadas) mas validou detalhes de composição DENTRO de uma estrutura
já errada desde a base. O fundador mostrou de novo os prints reais do carrossel "DIY objects
powered by Claude Code" (@claudeai) e disse que a peça "não tem nada a ver" com a referência —
2 erros estruturais, não de acabamento:

1. **Capa**: a Rodada 16 fez 1 foto de fundo cheia com scrim escuro por cima (gradiente pra
   legibilidade do título). A referência real é **DOIS PAINÉIS EMPILHADOS**, claramente
   separados — nunca foto de fundo com escurecido: painel branco em cima (~63%) com uma grade
   de fotos em cards de cantos arredondados e gap real entre eles, painel preto sólido embaixo
   (~37%) com o título/seta/mascote.
2. **Cartão de citação**: a Rodada 16 usava um círculo vazio com borda `brand.primary` + texto
   em itálico serifado (`FONT_SERIF_ROTAS`). A referência imita um post do X/Twitter incorporado
   — avatar circular com FOTO real, etiqueta em negrito no lugar do nome, corpo em peso normal
   sans. **Honestidade, ainda mais crítica aqui**: reproduzir esse ESTILO sem fabricar
   identidade — sem selo de verificado, sem @handle inventado, sem nome próprio fictício. Um
   "tweet" com identidade fabricada seria MAIS enganoso que o card genérico anterior, não menos.

### Correção

Reescrita de `VozesGradeCapa` (2 painéis via `position: absolute` + `height` em %, grade de 5
fotos com CSS grid `gridTemplateAreas` — 1 card grande + 4 menores, gap 10px, radius 18px —
sobre fundo branco; painel preto embaixo com título quebrado em 2 linhas via `<br/>`, seta e
mascote no canto do painel preto, nunca sobre foto).

`QuoteCardSlide` ganhou props `avatarPhoto`/`avatarZoom`/`avatarPos`: avatar é um recorte
fechado (zoom 5-6x via `backgroundSize`/`backgroundPosition`) da PRÓPRIA foto de fundo daquele
slide — textura de caixas de estoque pro card "Time de estoque", mãos sobre o teclado pro card
"Time de compras" — nunca um rosto identificável posando como aquele funcionário específico.
Corpo do texto trocado de `FONT_SERIF_ROTAS` itálico pra `FONT_SANS` peso 400. Cartão passou de
`#fffdf7` pra `#ffffff` puro (mais próximo do branco de card de post real).

`npx tsc --noEmit -p .` limpo. 4 slides renderizados de novo em `out/reset-v2/`, comparados
ponto a ponto contra a estrutura descrita pelo fundador (não só "parece bom"):
- Capa: painel branco com grade separado do painel preto sólido — confirmado, sem foto de
  fundo cheia nem scrim. `visual-critique:critique-composition` — balance/whitespace/rhythm/
  gestalt todos `pass`.
- Cartão de citação: avatar com foto real (textura/mão, não rosto) + etiqueta em negrito + texto
  sans peso normal, SEM selo/handle/nome — confirmado. `visual-critique:critique-brand-
  consistency` — mood/token compliance `pass` (checado manualmente contra `design-tokens.md`/
  `themes.ts`, mesma limitação de `mood.md`/`voice.md` ausentes já registrada na Rodada 16).

Documentação atualizada: `.claude/skills/rafael/references/formato-vozes.md` (estrutura correta
da Capa documentada como "2 painéis empilhados", substituindo a descrição antiga de "foto cheia
+ scrim"; regra de honestidade do cartão de citação detalhada pra cobrir o caso "estilo tweet
sem identidade fabricada").

## Rodada 16 — Formato "Vozes", variante Grade, terminada (2026-09-06)

### Pedido

Fundador mostrou referência real nova (@claudeai, carrossel "DIY objects powered by Claude
Code"): capa em mosaico assimétrico de fotos + título grande sobreposto + seta + mascote no
canto, e slides seguintes em "cartão de citação" (foto de fundo + cartão branco sobreposto com
aspas). Coordenador esboçou `src/templates/VozesGrade.tsx` (4 slides: `VozesGradeCapa`,
`VozesGradeCitacao1`, `VozesGradeCitacao2`, `VozesGradeFechamento`) mas deixou o QA visual
intencionalmente incompleto — trabalho de execução real do cargo, não do coordenador.

### QA visual — `npx tsc --noEmit -p .` limpo, 3 problemas achados nos PNGs renderizados

Renderizados os 4 slides em `out/reset-v2/`. Rodadas `visual-critique:critique-composition` e
`visual-critique:critique-brand-consistency` (ambas disponíveis nesta sessão; a 2ª não achou
`mood.md`/`voice.md`/`tokens.md` no formato que espera — token compliance checado manualmente
contra `.claude/brand/design-tokens.md`, sem divergência).

1. Mascote da Capa sobreposto direto na foto (gestalt figure/ground) — caía em cima do
   ombro/corpo de uma pessoa no mosaico, competindo com o conteúdo em vez de ler como
   assinatura. Fix: chip circular sólido (bege da marca) com sombra atrás do foguete.
2. Foto do 2º cartão de citação (`equipe-reuniao-escritorio.jpg`) com ~40% do topo em janela
   estourada sem interesse visual. `objectPosition` vertical não teve efeito nenhum — a foto é
   PAISAGEM (1600×1067) dentro do frame retrato, então `objectFit: cover` já mostra a altura
   INTEIRA da imagem (corta só os lados). Fix real: zoom via `transform: scale()` +
   `transformOrigin` (props `zoom`/`focusY` novas em `QuoteCardSlide`).
3. Fechamento com vazio excessivo depois de 2 slides densos, quebrando o ritmo do carrossel.
   Fix: aspas gigante opacity 0.05 atrás do mascote — mesma lógica do invariante #9 de Rotas
   ("ícone gigante sutil resolve vazio demais"), adaptada ao motivo do próprio formato (citação).

Documentação nova: `.claude/skills/rafael/references/formato-vozes.md` (invariantes de marca,
regra de honestidade, o zoom/focusY pra fotos paisagem, checklist) cobrindo as 2 variantes do
formato "Vozes" — Retrato (`Retrato.tsx`, já existente) e Grade (`VozesGrade.tsx`, nova).
`.claude/skills/rafael/SKILL.md` atualizado com parágrafo apontando pra essa referência.

## Rodada 15 — Bug real de overlap corrigido + 6 peças novas (2026-09-05)

### Pedido

Fundador reportou bug real: "Tem textos que estão meio que em cima de símbolos e não tá
quebrando". Prioridade 1: achar e corrigir a causa raiz em TODAS as peças existentes antes de
escalar volume. Depois, gerar 6 peças NOVAS de "Rotas" com ângulos de conteúdo ainda não
explorados, variando número de trilhas (não sempre 3), tipo de linha e composição bespoke.

### BUG REAL — seta da anotação da Capa cruzando o texto quando ele quebra em 2 linhas

Renderizadas e inspecionadas visualmente as 6 peças existentes (31 slides). Achado em
`InstitucionalCapa.png`: `annotationText="4 hábitos, nenhum é sobre sistema"` (34 caracteres)
quebrou em 2 linhas dentro do `width: 200` do `HandDrawnAnnotation` (`RotasKit.tsx`), e a curva
SVG da seta — posicionada em pixel fixo (`top: 34`), desenhada assumindo 1 linha só — cruzou por
cima da 2ª linha, lendo como texto riscado/tachado. Mesmo bug reproduzido independentemente em
mais 3 peças: `RotasCapa.png` ("cada negócio, seu jeito", componente duplicado dentro de
`Rotas.tsx`), `VendasCapa.png` ("1 PDV, 2 portas de entrada") e `AvaliaCapa.png` ("3 decisões, 1
diagnóstico antes") — só as 2 peças mais recentes (`EstoquePerdaCapa`, `AvaliaRenovacaoCapa`) não
tinham o bug, porque a Rodada 14 já tinha corrigido esse SINTOMA ali encurtando o texto — sem
identificar que a causa raiz era no componente, não no tamanho do texto escolhido.

**FIX NA RAIZ** (não caso a caso): `whiteSpace: 'nowrap'` no texto do `HandDrawnAnnotation` — em
`RotasKit.tsx` (a versão genérica usada por 5 das 6 peças) E na cópia duplicada dentro de
`Rotas.tsx` (a peça original, que tem seu próprio componente não parametrizado). Elimina a
quebra de linha completamente — a seta (sempre desenhada pra 1 linha) nunca mais tem uma 2ª
linha pra cruzar, para qualquer tamanho de texto razoável. Confirmado por re-render: as 4 peças
afetadas (`RotasCapa`, `VendasCapa`, `AvaliaCapa`, `InstitucionalCapa`) voltaram a mostrar o
texto da anotação numa linha só, seta limpa, sem sobreposição. As outras 27 slides das 6 peças
(revisados individualmente) não tinham nenhum outro caso do bug.

### Confirmação de não regressão nas 6 peças existentes

`npx tsc --noEmit -p .` limpo. Todas as 31 Stills existentes foram RE-RENDERIZADAS depois do fix
(não só as 4 afetadas) — inspeção visual de cada uma confirma que nenhuma peça regrediu: linhas,
cores, ícones, composição e continuidade esquerda↔direita idênticos ao que já estava aprovado
nas Rodadas 6-14, só o bug de overlap sumiu.

### 6 peças novas

1. **NTB Estoque, tema sazonalidade** (`RotasEstoqueSazonalidade.tsx`) — "O estoque também tem
   estação": Pré-temporada, Pico, Reposição, Sobra. **4 trilhas** (ciclo sazonal tem 4 momentos
   genuinamente distintos). Linha **S-curve** (`elbowStyle="curve"`) em todos os slides — a
   metáfora do conteúdo é uma curva que sobe/desce, coerente com a curva suave em vez do ângulo
   reto "sistemático". Ícones: `ClockIcon`, `BarcodeIcon`, `ShelfIcon` (1º uso em produção),
   `BoxStackIcon`. Composição bespoke: Capa em "onda" (y alternando baixo-alto-baixo-alto ao
   longo do x) — nunca usada antes (fileira, sobreposição, grade 2×2 e diagonal já existiam).
   BUG REAL achado e corrigido nesta peça: a 1ª versão dos post-its ("Sobra" em x=810,
   width=250) ultrapassava a borda direita da área útil de cards (952px de largura, dentro do
   padding de 64px do frame) — corrigido reduzindo largura/x de todos os 4 cards pra caber com
   margem de sobra.

2. **NTB Estoque, tema múltiplas lojas** (`RotasEstoqueMultiloja.tsx`) — "Duas lojas, um estoque
   só": Loja A (tem sobra) entrega via **passagem de bastão** pra Loja B (está em falta) — 1ª
   vez que `baton` representa uma transição no ESPAÇO (mercadoria entre lojas), não no tempo
   (contrato→fornecedor, Rodada 14). **2 trilhas**. Ícones: `BoxStackIcon`, `DeliveryBagIcon`.
   Composição bespoke: Capa em pilha vertical (deslocamento vertical maior que o horizontal),
   diferente da sobreposição quase-horizontal de `RotasVendas.tsx`.

3. **NTB Vendas, tema promoção sem prejuízo** (`RotasVendasPromocao.tsx`) — "Desconto que não
   vira prejuízo": Desconto, Margem, Registro. **3 trilhas**, ângulo reto (padrão). Ícones:
   `BarcodeIcon`, `MiniBarCompare` (dado/métrica), `ChecklistIcon`. Composição bespoke: largura
   dos post-its varia (pequeno-grande-pequeno) — o card do meio (Margem) fisicamente maior,
   destacando o argumento central.

4. **NTB Vendas, tema fechamento de caixa** (`RotasVendasCaixa.tsx`) — "Fechar o caixa sem
   cruzar os dedos": Conferência, Diferença, Fechamento. **3 trilhas**, **curva orgânica**
   (`elbowStyle="organic"`) — tom calmo/fim-de-dia, contraste deliberado com o ângulo reto da
   peça de Promoção (mesmo produto, tom diferente). Ícones: `ClockIcon`, `ChecklistIcon`,
   `CounterIcon` (1º uso em produção). Composição bespoke: Capa em diagonal descendente (x e y
   crescentes) — metáfora "o dia descendo pro fechamento"; slide "Diferença" usa
   `contentLayout="side-by-side"`.

5. **Norte Avalia, tema risco de compliance** (`RotasAvaliaCompliance.tsx`) — "Compliance não
   avisa antes de custar caro": Certificação (trilha paralela normal) + Jurídico/Multa (nascem
   da mesma raiz — "falha na documentação" — via **linha ramificada**, mesma técnica de
   `RotasEstoquePerda.tsx` aplicada a conteúdo de risco legal em vez de perda financeira). **3
   trilhas finais**. Ícones: `DocumentIcon`, `ChecklistIcon`, `ClockIcon`.

6. **Institucional, tema confiança do cliente** (`RotasInstitucionalConfianca.tsx`) — "O que faz
   um cliente confiar de novo": Transparência, Consistência — tom educacional puro, sem produto
   citado, **fecha sem CTA** (mesma regra da peça institucional original). **2 trilhas**, ângulo
   reto. Ícones: `DocumentIcon`, `ClockIcon`. Composição bespoke: os 2 post-its ficam bem
   próximos, quase se tocando, centralizados — diferente da fileira espaçada/sobreposição
   diagonal de outras peças de 2 trilhas. BUG REAL achado e corrigido: com os cards tão
   próximos, o card da frente ("Consistência") cortava a legenda do card de trás
   ("Transparência") no meio da palavra — mesmo bug já documentado em `PostitCard` (Rodada 12);
   fix: `captionMaxWidth` no card de trás.

### Distribuição de variedade (pedido explícito do fundador)

Número de trilhas: 2, 2, 3, 3, 3, 4 (não sempre 3). Tipo de linha: S-curve, passagem de bastão,
ângulo reto, curva orgânica, linha ramificada, ângulo reto (5 dos 5 tipos catalogados usados,
ângulo reto repete 1x). Ícones antes nunca testados em produção (`ShelfIcon`, `BarcodeIcon`,
`CounterIcon`) validados nesta rodada — repertório de `EditorialIcons.tsx` inteiro agora testado
em pelo menos 1 peça real. Nenhuma ilustração nova precisou ser criada — o repertório existente
cobriu os 6 conteúdos novos.

### Arquivos criados/alterados nesta rodada

- `src/lib/RotasKit.tsx` — fix do bug real em `HandDrawnAnnotation` (`whiteSpace: 'nowrap'`).
- `src/templates/Rotas.tsx` — mesmo fix na cópia duplicada do componente.
- `src/templates/RotasEstoqueSazonalidade.tsx` (novo), `RotasEstoqueMultiloja.tsx` (novo),
  `RotasVendasPromocao.tsx` (novo), `RotasVendasCaixa.tsx` (novo),
  `RotasAvaliaCompliance.tsx` (novo), `RotasInstitucionalConfianca.tsx` (novo).
- `src/Root.tsx` — 30 `Still`s novas registradas (6 peças × 4-6 slides).
- `.claude/skills/rafael/references/formato-rotas.md` — bug documentado como regra permanente;
  status dos ícones `CounterIcon`/`BarcodeIcon`/`ShelfIcon` atualizado pra "validado em
  produção".
- `out/reset-v2/*.png` — 61 renders (31 re-renders de regressão + 30 novos).

---

## Rodada 14 — Expansão do repertório: 3 linhas novas, 6 ilustrações novas, 2 peças novas (2026-09-05)

### Pedido

O fundador pediu pra EXPANDIR o repertório de "Rotas" (não criar formato novo): "quero mais
variações desse modelo, tipos diferentes de linhas e continuações, mais desenhos, mais ideias,
mais tipos diferentes. Olhe o insta do Claude de novo." Escopo fechado com o coordenador: 3
novos tipos de linha em `TrackRail.tsx`, 6 novas ilustrações em `EditorialIcons.tsx`, 2 peças
de conteúdo novas usando pelo menos 1 linha nova + 2 ícones novos cada.

### Pesquisa no Instagram (@claudeai) antes de construir

Puxei mais posts recentes do feed (`instagram_get_user_feed`, incluindo os carrosséis tipo 8
publicados depois da sessão anterior: "Claude-powered objects", "Campus Ambassadors", "Model
Hardware Standard", "framework econômico do Claude Code"). A API do `instagram-control` não
retorna as imagens de carrossel em si pra inspeção visual direta (`instagram_download_post`
falha em conteúdo tipo carrossel, só funciona pra foto única) — só metadados (legenda,
contagens, data). Não achei, nesta pesquisa adicional, nenhum exemplo NOVO de linha ramificada
ou "passagem de bastão" além do que já estava documentado (o "Follow your track" do Campus
Ambassador se divide em 3 SÓ NA CAPA, não no meio do carrossel). A adaptação pedida — dividir
uma linha em 2 no MEIO do carrossel — é extensão nossa da mesma ideia visual, não cópia de um
exemplo novo encontrado. Conforme orientação do fundador ("se não achar nada novo relevante,
prossiga"), segui com o design especificado sem travar nisso.

### 3 tipos de linha novos em `TrackRail.tsx`

1. **Linha ramificada (`BranchSpec`)** — uma trilha entra como 1 traço só (2 trilhas
   sobrepostas na MESMA altura, offset de ±3px pra ainda dar pra ler as 2 cores) e a partir de
   um `splitX` se divide em 2 curvas que terminam em 2 alturas diferentes na borda direita —
   cada uma virando a `homeY` de uma trilha própria dali em diante. Pra conteúdo tipo "isso
   gera 2 consequências". Testada em `RotasEstoquePerda.tsx` (slide `EstoquePerdaRaiz`): a
   causa raiz "descontrole na entrada" se ramifica em "quebra de embalagem" e "contagem
   errada".
2. **Passagem de bastão (`BatonSpec`)** — a trilha ativa não retorna pra própria `homeY` antes
   da borda direita: ela deriva numa rampa suave até a `homeY` da PRÓXIMA trilha e termina ali
   — a próxima trilha "recebe" na borda esquerda do slide seguinte, na mesma altura. EXCEÇÃO
   DELIBERADA ao invariante "a linha nunca muda de cor" (documentada em formato-rotas.md) — é
   a única situação do formato em que a cor muda exatamente na costura entre 2 slides, porque
   uma trilha literalmente entrega pra outra (não porque mudou de identidade). Testada em
   `RotasAvaliaRenovacao.tsx` (slide `AvaliaRenovacaoContrato` → `AvaliaRenovacaoFornecedor`):
   "o contrato que você assinou" entrega pra "o fornecedor que você tem hoje".
3. **Curva orgânica (`ElbowSpec.organic`)** — desvio local ASSIMÉTRICO (subida larga 0.34×span,
   descida rápida 0.2×span, pequeno overshoot de 10px no topo) em vez do cotovelo em ângulo
   reto OU do S-curve geométrico/simétrico (`ElbowSpec.curve`, Rodada 12) — sem jitter/tremor,
   "curva solta feita à mão livre com régua flexível". Pra tom de conteúdo mais leve/reflexivo.
   Testada em `RotasAvaliaRenovacao.tsx` (slide `AvaliaRenovacaoPreco`, `elbowStyle="organic"`).

### BUG REAL #1 — texto da anotação desenhada à mão cruzado pela própria seta

Achado no PNG renderizado da Capa de `RotasEstoquePerda.tsx`: `annotationText="1 causa, 2
jeitos de sumir"` (27 caracteres) quebrou em 2 linhas dentro do `width:200` do
`HandDrawnAnnotation`, e a curva SVG da seta (posicionada com `top:34` relativo ao container)
cruzou bem em cima da 2ª linha ("sumir"), lendo como um texto riscado/tachado — não uma seta
apontando. O MESMO bug apareceu independentemente na Capa de `RotasAvaliaRenovacao.tsx`
(`annotationText="do que assinou pro que tem hoje"`, 32 caracteres). Esse é o MESMO tipo de
bug já registrado (não corrigido) na Rodada 11 pra `InstitucionalCapa` — mas ali ficou como
"não corrigido, fora do escopo"; aqui, como as 2 peças são NOVAS desta rodada, corrigi na
origem: encurtei os 2 textos pra caberem numa linha só (`"1 raiz, 2 saídas"`, `"do ontem pro
hoje"`), confirmado por re-render que a seta não cruza mais o texto. **Aprendizado permanente**:
`annotationText` do `HandDrawnAnnotation` precisa ficar bem abaixo de ~20 caracteres pra ter
folga de sobra contra quebra de linha nesse componente — não é auto-validado, precisa olhar o
PNG.

### BUG REAL #2 — rampa de passagem de bastão cortando o card de texto

Achado no PNG renderizado de `AvaliaRenovacaoContrato.png`: a 1ª versão usava o `TrackSlide`
genérico (ícone + texto quase largura inteira do frame, como os outros slides) combinado com
`baton`. O cotovelo local que emoldura o texto (`elbow.x2` ~1038 de 1080, quase na borda) e a
rampa da passagem de bastão (que também precisa de espaço livre até a borda direita) competiam
pelo MESMO espaço — o primeiro fix (encolher a rampa pra caber depois do cotovelo) fez o
trecho de "retorno pra homeY" do cotovelo cair DENTRO da largura do card de texto, cortando o
canto dele com uma linha diagonal visível por cima do texto. **Fix**: esse slide específico
(`AvaliaRenovacaoContrato`) usa um layout PRÓPRIO — sem ícone pequeno, texto mais estreito
(`CONTENT_X2=760` em vez dos ~1016 padrão) — deixando ~300px de sobra genuína na borda direita
só pra rampa. Confirmado por re-render: o cotovelo hugga o texto normalmente e a rampa curva
limpa, sem tocar o card. **Aprendizado permanente**: `baton` com `elbow` só funciona bem se o
texto NÃO ocupar a largura inteira do frame — reservar ~250-300px de sobra na borda pra onde a
trilha vai sair.

### 6 ilustrações novas em `EditorialIcons.tsx`

`BoxStackIcon` (pilha de caixas), `ChecklistIcon` (lista de verificação — desenhada como
"dentes de pente" saindo da borda esquerda de uma ficha, mesma técnica de traço único
contínuo), `ClockIcon` (relógio — círculo por 4 beziers + 2 ponteiros, mesmo traço),
`BarcodeIcon` (código de barras — zigue-zague único formando as barras, mesma técnica do
Checklist), `ShelfIcon` (prateleira — poste + 2 tábuas em degrau), `ShoppingCartIcon` (carrinho
de compras — silhueta minimalista sem rodas, mesma abstração já usada em `CounterIcon`).
Validadas na escala pequena (~110-190px, card de post-it) via os renders desta rodada — todas
legíveis nessa escala, com uma ressalva honesta abaixo (`BoxStackIcon`).

**Autocrítica honesta**: `BoxStackIcon` (silhueta em "degrau"/T) lê mais como forma abstrata
geométrica do que obviamente "caixas empilhadas" — funciona por causa do rótulo do card
("Quebra") ao lado, não sozinha. Mesmo nível de abstração que `CounterIcon` (que também nunca
foi validado como "óbvio sem contexto", registrado na Rodada 10) — aceito como parte do estilo
editorial (contorno simplificado, não fotográfico), mas registrando a honestidade em vez de
alegar que "lê perfeitamente sozinho". `ClockIcon` e `ChecklistIcon` são as 2 mais fortes desta
leva — leem claramente mesmo sem o rótulo. `ShelfIcon` e `BarcodeIcon` não foram usados em
nenhuma peça desta rodada (ficam prontos pro repertório, mas não testados em produção — mesmo
risco não testado já registrado pra `CounterIcon`/`HangerIcon` no passado).

### 2 peças novas

**1. NTB Estoque, tema perda/quebra (`RotasEstoquePerda.tsx`)** — "3 formas de perder dinheiro
sem perceber": Validade vencida (trilha paralela normal), Quebra de embalagem + Contagem
errada (nascem de uma causa raiz comum via LINHA RAMIFICADA, ver acima). Paleta:
`productColors.estoque` (teal) + `shade()`, mesma regra de família por produto da Rodada 10.
Ícones novos: `ClockIcon`, `BoxStackIcon`, `ChecklistIcon` (3 dos 6). 6 slides: Capa, Validade,
Raiz (ramificação), Quebra, Contagem, Fechamento.

**2. Norte Avalia, tema renovação de contrato (`RotasAvaliaRenovacao.tsx`)** — "antes de
renovar no automático, reavalie": Contrato (PASSAGEM DE BASTÃO pra Fornecedor), Fornecedor
(recebe o bastão), Preço (CURVA ORGÂNICA, tom mais reflexivo). Paleta: `productColors.avalia`
(índigo) + `shade()` — mesmo produto da peça original de Avalia, ângulo de conteúdo diferente
(reavaliação de renovação, não "3 decisões de negócio"). Ícones novos: `ShoppingCartIcon`,
`BarcodeIcon` (2 dos 6; `DocumentIcon` reaproveitado). 5 slides: Capa, Contrato, Fornecedor,
Preço, Fechamento.

### Confirmação de não regressão nas 4 peças aprovadas

`npx tsc --noEmit -p .` limpo (projeto inteiro, com as mudanças aditivas em `TrackRail.tsx`/
`RotasKit.tsx`). As 20 Stills das 4 peças já aprovadas (`Rotas*`, `Vendas*`, `Avalia*`,
`Institucional*`) foram RE-RENDERIZADAS (não só recompiladas) depois das mudanças — inspeção
visual de amostra (`VendasBalcao` com `elbowStyle="curve"`, `AvaliaFornecedor` com
`contentLayout="side-by-side"`, `RotasRestaurante` com cotovelo reto padrão) confirma pixel a
pixel idênticas ao comportamento documentado nas Rodadas 10-12 — nenhuma das mudanças novas
(branch/baton/organic, todas opt-in via props novas com default preservando o comportamento
antigo) afetou o caminho de código das peças existentes.

### Arquivos criados/alterados nesta rodada

- `src/lib/TrackRail.tsx` — `ElbowSpec.organic` (novo), `buildActivePath()` com ramo orgânico;
  `BranchSpec`/`buildBranchPath()` (novo); `BatonSpec`/`buildBatonPath()` (novo); `TrackRail`
  aceita `branch`/`baton` novos, ambos opt-in.
- `src/lib/RotasKit.tsx` — `computeElbow()` com 6º parâmetro `organic`; `TrackSlide` aceita
  `elbowStyle="organic"` e `baton`.
- `src/lib/EditorialIcons.tsx` — 6 ilustrações novas: `BoxStackIcon`, `ChecklistIcon`,
  `ClockIcon`, `BarcodeIcon`, `ShelfIcon`, `ShoppingCartIcon`.
- `src/templates/RotasEstoquePerda.tsx` (novo) — peça NTB Estoque/perda, testa branching.
- `src/templates/RotasAvaliaRenovacao.tsx` (novo) — peça Norte Avalia/renovação, testa baton +
  organic.
- `src/Root.tsx` — 11 `Still`s novas registradas.
- `out/reset-v2/*.png` — 31 renders (11 novos + 20 re-renders de regressão das 4 peças
  aprovadas).

---

## Rodada 12 — Composição BESPOKE por peça (2026-09-05)

### Pedido (motivo desta rodada)

O fundador viu as 4 peças de Rotas lado a lado e reclamou direto: "olhe essa merda tá tudo
igual praticamente". A explicação de "é o mesmo FORMATO, é esperado ser reconhecível" foi
rejeitada com razão: "mas o Rotas tem que ser diferente, você acha que do Claude é sempre
igual?". O diagnóstico correto: as Rodadas 10-11 deram às 4 peças a mesma cor de família
(regra certa) mas também o MESMO arranjo estrutural (`RotasKit.tsx` reaplicado 1:1) — cada
peça só trocava cor/copy/ícone, nunca composição de verdade. O pedido desta rodada foi dar
composição bespoke a cada peça, mantendo a família de marca (fundo bege, papel rasgado,
Newsreader, linha na cor literal da trilha, convergência no Mascote).

### O que mudou, peça por peça

**1. NTB Estoque (`Rotas.tsx`)** — mantido como estava, por pedido explícito ("já está boa
como referência-base"). Nenhuma mudança de composição nesta rodada.

**2. NTB Vendas (`RotasVendas.tsx`)** — 2 mudanças de composição, ambas exclusivas desta peça:
- **Capa**: os 2 post-its SE SOBREPÕEM parcialmente (Balcão atrás, Delivery na frente,
  rotação oposta: -7°/+6°, deslocamento de ~110px) em vez da fileira lado a lado que
  Estoque/Avalia/Institucional usam — cria profundidade real via ordem de empilhamento no
  DOM, não só cor.
- **Slides de trilha + Fechamento**: o cotovelo que emoldura o bloco de texto vira uma
  CURVA suave em S (novo `ElbowSpec.curve` em `TrackRail.tsx`, `elbowStyle="curve"` em
  `TrackSlide`) em vez do ângulo reto de 90° que as outras 3 peças usam. Só 2 trilhas bem
  afastadas (y=378/972) dão espaço de sobra pra essa curva mais expressiva sem esbarrar na
  trilha vizinha — decisão registrada como variação pontual, não substitui o ângulo reto
  como padrão do formato.

**3. Norte Avalia (`RotasAvalia.tsx`)** — layout do BLOCO DE CONTEÚDO mudou nos 3 slides de
trilha: headline à ESQUERDA + corpo à DIREITA, lado a lado (novo `contentLayout=
"side-by-side"` em `TrackSlide`, `RotasKit.tsx`), em vez do empilhamento headline-em-cima/
corpo-embaixo que Estoque/Vendas/Institucional usam. Fontes reduzidas nesse modo (headline
40→34px, corpo 20→18px) pra caber nas 2 colunas de ~50% cada dentro do espaço disponível
(~688px após a coluna de ícone). Capa NÃO mudou (fileira de 3 post-its, igual à do Estoque)
— o pedido do fundador foi especificamente sobre "o layout do bloco de conteúdo", não a capa.

**4. Institucional (`RotasInstitucional.tsx`)** — 2 mudanças de composição:
- **Capa**: os 4 post-its formam uma grade 2×2 (2 linhas de 2 cards, `cardsAreaHeight`
  380→610) em vez da fileira apertada de 4 que a Rodada 10 usava — cada card ficou mais
  largo (220→300px) e com mais respiro.
- **Fechamento**: a citação final usa `headlineSize={64}` (novo prop opcional em
  `RotasFechamentoShell`, padrão 50 pras outras 3 peças) — tom mais contemplativo, sem CTA
  nenhum, então a citação pode ocupar mais espaço em vez de dividir atenção com uma chamada
  de ação.

### Infra nova em `TrackRail.tsx`/`RotasKit.tsx` (pra sustentar as 4 composições sem duplicar tudo)

- `ElbowSpec.curve?: boolean` — quando `true`, `buildActivePath()` desenha 2 beziers cúbicas
  formando uma curva em S em vez do cotovelo reto. Usado só por Vendas.
- `computeElbow()` ganhou 5º parâmetro `curve` (repassa pro `ElbowSpec`).
- `TrackSlide` ganhou 2 props novos: `elbowStyle?: 'right-angle' | 'curve'` (padrão
  right-angle) e `contentLayout?: 'stacked' | 'side-by-side'` (padrão stacked) — cada peça
  passa só o que precisa, o padrão continua sendo o comportamento das Rodadas 10-11.
- `RotasFechamentoShell` ganhou `headlineSize?: number` (padrão 50).
- `PostitCard`/`CoverCardSpec` ganharam `captionMaxWidth?: number` — ver bug real abaixo.

### BUG REAL #1 — curva em S se autointerceptava, criando um "X" visível sobre o ícone

Achado no PNG renderizado de `VendasDelivery.png` (não só olhando o código): a 1ª versão da
curva calculava `riseSpan = (postX - preX) * 0.32`. Como a curva usa 2×`riseSpan` pra subir
e 2×`riseSpan` pra descer, o total (4×`riseSpan` = 1.28×o espaço disponível) era MAIOR que o
espaço entre `preX` e `postX` — o "platô" do meio ficava matematicamente negativo e a curva
se autointerceptava, desenhando um "X" sobre o ícone da sacola de delivery. Fix: `riseSpan`
reduzido pra `(postX - preX) * 0.2` (4×0.2 = 0.8×span, sobra 20% de platô real). Confirmado
por re-render + inspeção visual — a curva agora é um arco limpo sem auto-intersecção.

### BUG REAL #2 — post-it da frente cobria a legenda do post-it de trás no meio da palavra

Achado no 1º render de `VendasCapa.png`: a legenda do card "Balcão" ("Pedido, preparo e
pagamento na hora") aparecia cortada em "na h" — o card "Delivery", posicionado na frente e
parcialmente sobreposto, pintava por cima do resto do texto. Causa raiz: quando 2 retângulos
opacos se sobrepõem, o card da frente cobre QUALQUER conteúdo do card de trás na zona de
interseção, incluindo texto que "por acaso" se estendia até lá — a legenda original ocupava
quase a largura inteira do card, então qualquer sobreposição horizontal relevante ia colidir
com ela. Fix: novo prop `captionMaxWidth` no card "Balcão" (210px, bem antes da coluna onde
o outro card sobrepõe) força a legenda a quebrar em 2 linhas curtas que nunca alcançam a
zona de sobreposição — não depende de "a legenda parar antes por acaso". Confirmado por
re-render: a legenda agora aparece inteira, em 2 linhas, sem nenhum corte.

### Autocrítica honesta — comparando as 4 capas e os 4 fechamentos lado a lado

**Capas**: Vendas (2 post-its sobrepostos, diagonal) e Institucional (grade 2×2) têm
silhuetas GENUINAMENTE diferentes da capa do Estoque (fileira de 3) — batendo o olho, sem
olhar cor, dá pra saber qual é qual pela FORMA da composição, não só pela paleta. A capa da
Avalia continua com a mesma fileira de 3 post-its do Estoque — decisão deliberada (o pedido
do fundador foi sobre o bloco de conteúdo dos slides de trilha, não a capa), mas registrando
com honestidade: se alguém comparar as 4 capas isoladas (sem ver os slides internos), Estoque
e Avalia ainda podem ser confundidas uma com a outra tirando a cor. O carrossel INTEIRO da
Avalia, porém, não se confunde mais com o do Estoque, porque os 3 slides de trilha (a maior
parte do carrossel) têm o layout lado-a-lado, visivelmente diferente do empilhamento.

**Fechamentos**: os 4 compartilham a mesma estrutura de convergência no Mascote (por design —
é a regra de família mais forte do formato, "fechamento converge no Mascote real"), então
batendo o olho rápido nos 4 juntos, a primeira impressão É de semelhança — a diferença real
(tamanho da citação, presença/ausência de CTA, cor da linha) só aparece quando se olha com
atenção, não na silhueta geral como nas capas. Isso é esperado e aceito: a convergência no
Mascote foi explicitamente listada como elemento de FAMÍLIA que não deveria mudar — mas
significa que o fechamento é, com honestidade, o ponto onde as 4 peças ainda mais se parecem
entre si, mesmo depois desta rodada.

**Resposta direta à pergunta do fundador ("parece obra do mesmo designer variando de
propósito, ou ainda o mesmo molde?")**: nos SLIDES DE TRILHA (a maior parte de cada
carrossel) e nas CAPAS de Vendas/Institucional, sim — são decisões de composição
genuinamente diferentes, não o mesmo componente com cor trocada. A capa da Avalia e a
estrutura geral dos 4 fechamentos são os 2 pontos que ainda leem mais como "família muito
parecida" do que como "peça desenhada à parte" — não por descuido, mas porque nenhum dos 2
recebeu pedido explícito de variação nesta rodada (capa da Avalia) ou porque a variação ali
é deliberadamente limitada pela regra de família (convergência no Mascote).

### Arquivos criados/alterados nesta rodada

- `src/lib/TrackRail.tsx` — `ElbowSpec.curve` (novo), `buildActivePath()` com ramo de curva
  em S (bezier), bug do platô negativo corrigido (`riseSpan` 0.32→0.2).
- `src/lib/RotasKit.tsx` — `computeElbow()` com 5º parâmetro `curve`; `TrackSlide` com
  `elbowStyle`/`contentLayout` novos (+ ramo JSX side-by-side); `RotasFechamentoShell` com
  `headlineSize`; `PostitCard`/`CoverCardSpec` com `captionMaxWidth`.
- `src/templates/RotasVendas.tsx` — Capa com post-its sobrepostos + `captionMaxWidth`;
  slides/Fechamento com `elbowStyle="curve"`.
- `src/templates/RotasAvalia.tsx` — 3 slides de trilha com `contentLayout="side-by-side"`.
- `src/templates/RotasInstitucional.tsx` — Capa em grade 2×2; Fechamento com
  `headlineSize={64}`.
- `out/reset-v2/*.png` — os 20 renders das 4 peças re-gerados com as composições novas
  (incluindo os 3 re-renders extras depois dos 2 bugs reais: `VendasBalcao`, `VendasDelivery`,
  `VendasCapa`).

---

## Rodada 11 — Cotovelo local + post-it rasgado (2026-09-05)

### Pedido

Depois da Rodada 10 (multiplicação em 4 peças), o fundador achou "tudo muito
igual" e pediu nova comparação DIRETA com a referência real ("The Claude
Campus Ambassador program is back", @claudeai). Comparação (coordenador)
achou 2 gaps concretos, não 1 peça isolada com defeito:

1. Na referência, a linha faz um COTOVELO EM ÂNGULO RETO que emoldura
   LOCALMENTE o bloco de texto daquele slide (sobe/desce, atravessa, volta)
   — em `TrackRail.tsx` a trilha ativa virou reta pura na Rodada 9, mas por
   um motivo DIFERENTE: aquele cotovelo (Rodada ≤8) desviava TODAS as
   trilhas pro CENTRO GLOBAL do frame, amontoando tudo no meio. Cotovelo
   LOCAL (contornar só o próprio conteúdo, na própria homeY) não tem esse
   problema — nunca força a trilha a sair da própria faixa de altura.
2. Os post-its da Capa (`PostitCard`) eram retângulo liso (`#fffdf7`, cantos
   retos, só sombra) — a referência tem bordas de papel rasgado/kraft. O
   `TornBlock` (headline/body dos slides de trilha) já tinha esse tratamento
   desde rodadas anteriores; os post-its nunca ganharam.
3. Pedido explícito de variar a ESCALA do cotovelo entre as 4 peças (não
   travar num valor único).

### Correção 1 — cotovelo local em `TrackRail.tsx`

`buildActivePath()` ganhou um 2º parâmetro opcional `elbow: ElbowSpec`
(`{x1, x2, lift, direction}`). Sem `elbow`, comportamento idêntico à Rodada
9 (reta pura) — usado só no modo `converge` do Fechamento. Com `elbow`, o
path vira `M 0 homeY L preX homeY L preX liftY L postX liftY L postX homeY
L WIDTH homeY` (ângulos retos de verdade, não curva) — `preX`/`postX` são a
borda esquerda/direita do bloco de texto (`TornBlock`) com uma folga de 22px
("rente", não colado), e `liftY = homeY + direction*lift` é o desvio local.
Dormentes (ticks) recalculados pra não aparecerem dentro do cotovelo
(competiriam com o texto que ele emoldura).

`RotasKit.tsx` ganhou `computeElbow(trackY, hasIcon, lift, height)` —
deriva `x1`/`x2` dos MESMOS números do layout (`padding:64`, coluna de
ícone `220+44`) e escolhe `direction` automaticamente pela metade do frame
(topo desce, base sobe) pra nunca cortar a borda do canvas. `TrackSlide`
ganhou prop `elbowLift` (default `DEFAULT_ELBOW_LIFT=150`) — cada peça passa
seu próprio valor. `Rotas.tsx` (que não usa o kit, decisão deliberada da
Rodada 10) tem uma cópia local equivalente (`computeElbowLocal`).

**2 BUGS REAIS achados no QA visual (não só "aprovado de olho no código")**:
comparando os PNGs renderizados, achei o rótulo (`Overline`, ex.
"FORNECEDOR", "HÁBITO 4 · DECIDE") cortado/ilegível por trás da linha em
`AvaliaFornecedor` (lift inicial 165) e `InstitucionalDecide`/
`InstitucionalRegistra` (lift inicial 130). Causa raiz: o lift precisa
exceder METADE da altura total do bloco de texto empilhado (overline +
headline + gap + body) pra não cair dentro da faixa do rótulo quando o
cotovelo sobe (`direction: -1`) — e esse cálculo depende de quantas linhas o
headline/body quebram, que varia por slide (2 linhas de headline + 3 de
body dá ~176px de metade de altura). Corrigido subindo `ELBOW_LIFT_AVALIA`
165→195 e `ELBOW_LIFT_INSTITUCIONAL` 130→195 (ambos confirmados por
re-render + inspeção de pixel, não só o cálculo). `ELBOW_LIFT_VENDAS=190` e
o lift de `Rotas.tsx` (150, headlines sempre 1 linha ali) não precisaram de
ajuste — validados nos renders também.

Valores finais: Estoque (`Rotas.tsx`) 150, Vendas 190, Avalia 195,
Institucional 195 — a variação pedida no item 3 ficou mais modesta do que a
1ª tentativa (que tinha 130/165/150/190) porque a correção dos 2 bugs
empurrou os valores pra cima e mais perto uns dos outros; a alternativa
(manter valores baixos e aceitar o rótulo cortado) não era aceitável.

### Correção 2 — post-it rasgado em `PostitCard`

`PostitCard` (em `RotasKit.tsx` e a cópia local em `Rotas.tsx`) trocou
`border-radius:4px` + `border:1px solid` por `clipPath` com o MESMO
mecanismo de `tornClipPath()` já usado no `TornBlock` — um array de 3-4
recortes pré-gerados (`POSTIT_CLIPS`, seeds diferentes por índice de card,
pra 2-4 cards de uma Capa não repetirem o mesmo recorte) com amplitude
MAIOR que a do `TornBlock` original (4.0-5.4 vs 1.4-2.6) porque a 1ª
tentativa (amplitude 1.4-2.0, igual ao `TornBlock`) ficou sutil demais no
QA visual — lia como "wobble leve", não "papel rasgado" — só ficou visível
como rasgo de verdade depois de aumentar a amplitude. Cor de fundo também
mudou de `#fffdf7` (quase branco) pra `#fdf6e8` (kraft/amarelado), mais
perto do tom da referência.

### Autocrítica honesta (comparação visual pós-render, não só "deveria funcionar")

- **Cotovelo**: funciona bem nas 4 peças depois da correção dos 2 bugs de
  lift — emoldura o bloco de texto com ângulo reto limpo, ticks não
  competem com o texto, e a variação de escala entre peças é real (150 a
  195), ainda que menor do que a 1ª tentativa por causa da correção de
  segurança. Ainda não é 100% igual à referência: a referência parece ter o
  cotovelo em ALTURA VARIÁVEL dentro do mesmo slide (sobe de um jeito, desce
  de outro, feito à mão); aqui é sempre 1 subida/descida simétrica e reta —
  mais "sistemático" que "desenhado à mão". Aceitável pro formato atual, mas
  não é indistinguível da referência.
- **Post-it rasgado**: melhor que a versão lisa (Rodada 10), mas ainda lê
  mais como "borda ondulada"/"recorte irregular sutil" do que "papel de
  verdade rasgado à mão" — a referência tem variação de amplitude mais
  grosseira/orgânica ponto a ponto, enquanto `tornClipPath()` usa uma
  senoide regular (determinística, sem random) que fica com um padrão
  ligeiramente repetitivo/geométrico de perto. Não fica genérico, mas
  também não é o rasgo "cru" da referência.
- Não resolvido nesta rodada (fora do escopo pedido): a anotação desenhada à
  mão da Capa institucional (`"cada negócio, seu jeito"` / `"4 hábitos, ..."`)
  tem a curva da seta cruzando por cima do próprio texto em alguns layouts
  (`InstitucionalCapa`) — bug pré-existente, não causado por esta rodada,
  não corrigido aqui.

### Arquivos criados/alterados nesta rodada

- `src/lib/TrackRail.tsx` — `ElbowSpec` (novo tipo, exportado),
  `buildActivePath()` aceita `elbow` opcional, `TrackRail` aceita prop
  `elbow`.
- `src/lib/RotasKit.tsx` — `computeElbow()` (novo), `TrackSlide` aceita
  `elbowLift`, `PostitCard` com `clipPath` rasgado + `clipSeedIndex`,
  `RotasCapaShell` passa `clipSeedIndex` por posição do card.
- `src/templates/Rotas.tsx` — cópia local de `computeElbowLocal()` e
  `POSTIT_CLIPS`, `TrackSlide` e `PostitCard` locais atualizados (NÃO usa o
  kit, decisão da Rodada 10 mantida).
- `src/templates/RotasVendas.tsx`, `RotasAvalia.tsx`, `RotasInstitucional.tsx`
  — `elbowLift` por peça.
- `out/reset-v2/*.png` — os 20 renders das 4 peças (5+4+5+6 slides)
  sobrescritos com o resultado desta rodada.

## Rodada 10 — Multiplicação do formato Rotas: 3 peças novas (2026-09-05)

### Pedido

Depois de 9 rodadas de correção, o fundador aprovou o formato "Rotas" ("tá muito
legal agora") e pediu pra multiplicar: criar VÁRIOS posts "Rotas" com temas e
trilhas diferentes pra ver a variedade, cobrindo produtos diferentes da Norte.

### Refatoração: `src/lib/RotasKit.tsx`

Antes de duplicar o arquivo `Rotas.tsx` (NTB Estoque, ~530 linhas) 3x, extraí
pra `src/lib/RotasKit.tsx` tudo que é ESTRUTURA do formato — `Overline`,
`TornBlock`/`TORN_A`/`TORN_B`, `PostitCard`, `HandDrawnAnnotation`, `TrackSlide`
(slide de trilha genérico), `RotasCapaShell`, `RotasFechamentoShell`,
`computeTrackYs` (posições de trilha pra N=2/3/4, generalizando a proporção
0.2/0.5/0.8 que já valia pra N=3) — e deixei em cada arquivo de peça nova só a
CONFIGURAÇÃO (cores, textos, ícones). As 3 peças novas (`RotasVendas.tsx`,
`RotasAvalia.tsx`, `RotasInstitucional.tsx`) têm ~100-160 linhas cada, quase
tudo dado/conteúdo, não estrutura repetida.

**`Rotas.tsx` (NTB Estoque) NÃO foi migrado pro kit** — decisão deliberada: já
está aprovado pelo fundador, e o risco de regressão ao mexer numa peça que já
funciona não valia o ganho de DRY. Fica exatamente como estava; o kit é usado
só pelas peças novas a partir desta rodada.

### BUG REAL achado no primeiro render — `id` de SVG com espaço/acento quebra o slide inteiro

Os primeiros renders de `VendasCapa`, `AvaliaCapa` e `InstitucionalCapa`
saíram com **fundo PRETO SÓLIDO** (confirmado por leitura de pixel, não só
visual — `(0,0,0)` no canto e no meio do frame), violando a Regra Inviolável
#1 na cara. Causa raiz, achada comparando com o que funcionava: o
`GridTexture` (pattern SVG referenciado via `fill="url(#id)"`) recebia um
`id` construído com texto livre — `eyebrow` na Capa (`"NTB Vendas"`,
`"Norte Para Negócios"`) e `label` no slide de trilha (`"Hábito 1 · Registra"`,
com espaço E o caractere `·`). `id` de SVG com espaço/acento/pontuação é
inválido e, neste caso, não falhava silenciosamente — corrompia o parse do
resto do documento SVG o suficiente pra derrubar a pintura do
`background` do `AbsoluteFill` pai (mesmo esse `background` sendo puro CSS,
sem relação direta com o SVG). As peças que usavam `label`/`eyebrow` SEM
espaço (`"Restaurante"`, `"Contratação"`, `"Balcão"`) nunca pegaram o bug —
só apareceu nas 3 peças novas porque só elas têm nomes de eyebrow/label com
espaço (nome de produto de 2 palavras, "Hábito N · Nome").

**Fix**: `slugify()` (novo, `RotasKit.tsx`) normaliza acentos e troca
qualquer caractere não-alfanumérico por `-` antes de usar em `id`. Aplicado
nos 2 pontos (`RotasCapaShell`, `TrackSlide`). Re-renderizado e confirmado
por leitura de pixel (`(247,244,238)` = `neutral.begeClaro`, correto) nas 6
Capas/slides que tinham pegado o bug.

**Aprendizado permanente pro kit**: qualquer `id` de SVG (`pattern`, `mask`,
`clipPath`) construído a partir de texto livre (label, eyebrow, título) TEM
que passar por `slugify()` — nunca interpolar a string crua. Isso vale pra
qualquer peça futura que usar `RotasKit.tsx` ou copiar o padrão.

### 2º problema achado no QA visual — `ClipboardIcon` lia como bateria/frasco

A primeira versão do ícone "prancheta com clip" (retângulo + aba retangular
pequena no topo) renderizada em 90-150px ficou lendo como um frasco/bateria
arredondada, não como prancheta — a aba ficou pequena demais pra comunicar
"clip de prancheta" nessa escala. Trocado por um desenho mais simples e mais
robusto em escala pequena: retângulo com o canto superior direito cortado na
diagonal (convenção clássica de "documento/ficha dobrada"), renomeado pra
`DocumentIcon` (`EditorialIcons.tsx`). Reconferido no render — lê como
documento/ficha claramente, mesmo em 90px (card da Capa institucional).
**Lição**: ilustração no estilo editorial (traço único) tem que ser validada
na MENOR escala em que ela aparece (card de post-it, ~90-150px), não só
olhando o path no código — um desenho que "parece certo" em abstrato pode
não sobreviver à redução de escala.

### As 3 peças novas

1. **NTB Vendas** (`RotasVendas.tsx`) — 2 trilhas, laranja
   (`productColors.vendas` + `shade()` pra 2ª trilha, mesma família de cor).
   Balcão (CONCEITO/PROCESSO → `GeometricDiagram`) e Delivery (OBJETO
   CONCRETO → `DeliveryBagIcon`, ilustração nova). Fecha com CTA (peça de
   produto).
2. **Norte Avalia** (`RotasAvalia.tsx`) — 3 trilhas, índigo
   (`productColors.avalia` + `shade()`). Contratação (processo →
   `GeometricDiagram`), Processo interno (dado/métrica → `MiniBarCompare`),
   Fornecedor (objeto concreto → `DocumentIcon`, ilustração nova). Fecha com
   CTA.
3. **Institucional/marca** (`RotasInstitucional.tsx`) — 4 trilhas,
   `brand.primary` + `shade()`, tom EDUCACIONAL PURO (ver `voice.md`, "Voz
   aplicada a conteúdo educacional"): "4 hábitos de quem decide com dado, não
   achismo" — Registra (processo → diagrama), Mede (dado → `MiniBarCompare`),
   Revisa (objeto concreto → `DocumentIcon`), Decide (HISTÓRIA/AFIRMAÇÃO
   DIRETA → só frase, sem ícone pequeno, marca d'água gigante é uma aspa
   tipográfica em vez de um ícone — 1ª vez que esse 4º tipo de recheio,
   documentado desde a Rodada 6 mas nunca usado, aparece de fato). Fecha SEM
   CTA nenhum, como a voz educacional permite — só assinatura institucional
   silenciosa + Mascote convergindo.

**Decisão de paleta, registrada pra reuso**: cada peça nova usa 1 cor-âncora
(a cor do produto, ou `brand.primary` na institucional) e deriva as demais
trilhas da MESMA família via `shade()` (já existia em `TrackRail.tsx`, usado
aqui pela 1ª vez fora do próprio `TrackRail`) — em vez de cores sem relação
como na peça original do Estoque (teal/rosa/índigo, que são 3 cores de
produto/semânticas diferentes). Funciona bem porque cada peça nova É sobre
UM produto/tema só (as trilhas são façanhas daquele produto, não 3 produtos
diferentes) — não seria a escolha certa se uma peça futura precisasse
comparar produtos diferentes entre si.

### Arquivos criados/alterados nesta rodada

- `src/lib/RotasKit.tsx` (novo) — extração genérica do formato Rotas.
- `src/lib/EditorialIcons.tsx` — 3 ilustrações novas (`CounterIcon`,
  `DeliveryBagIcon`, `DocumentIcon` — esta última substituiu a 1ª tentativa
  `ClipboardIcon`, rejeitada no QA visual, ver acima).
- `src/templates/RotasVendas.tsx`, `RotasAvalia.tsx`, `RotasInstitucional.tsx`
  (novos) — as 3 peças.
- `src/Root.tsx` — 15 `Still`s novas registradas.
- `out/reset-v2/{Vendas,Avalia,Institucional}*.png` — 15 renders novos
  (Capa+slides+Fechamento de cada peça), incluindo re-renders depois dos 2
  fixes (bug de `id`, ícone trocado).

### Autocrítica honesta comparando com o padrão aprovado (NTB Estoque)

**No nível do padrão, sem ressalva real:** fundo bege único em todo slide,
faixas de altura claramente separadas por trilha (inclusive as 4 da
institucional — 0.14/0.38/0.62/0.86, nenhuma perto o suficiente pra
confundir), ícone pequeno + marca d'água gigante sutil no lado oposto em
TODOS os slides que têm ícone, linha nunca muda de cor (só o FUNDO teria
mudado se precisasse, e não precisou), fechamento convergindo no Mascote
real. As 2 peças com CTA (Vendas, Avalia) usam o CTA certo pro tom de
produto; a institucional fecha sem CTA, como a voz exige pra conteúdo
educacional puro.

**Onde fica mais fraco que o original, com honestidade:**
1. **A ilustração `CounterIcon` (balcão) não foi usada em nenhum slide final** —
   ela existe no arquivo mas a peça Vendas usa `GeometricDiagram` pro card
   Balcão (decisão de variar recheio: Balcão=processo, Delivery=objeto). O
   ícone ficou pronto mas não testado em produção — se uma peça futura
   precisar de "balcão como objeto concreto", vale conferir a escala antes
   de confiar nele, já que passou pelo mesmo risco do `ClipboardIcon` (não
   foi visualmente validado nesta rodada).
2. **`DocumentIcon` é reaproveitado em 2 peças diferentes** (Avalia
   "Fornecedor" e Institucional "Revisa") — funciona nos dois contextos, mas
   é menos "sob medida" que ícones exclusivos de 1 peça só (`HangerIcon` no
   Estoque, por exemplo). Aceito como decisão consciente (o estilo é pra ser
   reutilizável), não como lacuna.
3. **O bug do `id` de SVG só foi pego porque o QA visual olhou o PNG de
   verdade** — se a rodada tivesse "confiado no tsc passar" como critério de
   pronto, as 3 Capas teriam saído pretas pro Instagram. Reforça que
   `npx tsc --noEmit` não substitui olhar o render — os dois são
   obrigatórios, não um ou outro.

**Resposta direta**: as 3 peças novas atingem o mesmo padrão visual do NTB
Estoque aprovado — nenhuma regrediu depois dos 2 fixes. A refatoração pro
kit cumpriu o objetivo (peças novas são configuração, não cópia de
estrutura) sem tocar na peça já aprovada.

---

## Rodada 8 — ERRO DE EIXO: a costura testada era vertical, o carrossel é horizontal (2026-09-05)

### Diagnóstico (fundador furioso, com razão total)

Todas as Rodadas 6-7 validaram a continuidade do `TrackRail` testando a costura
TOPO↔BASE entre slides — empilhando os PNGs verticalmente, um em cima do outro, e
conferindo se as linhas alinhavam nessa emenda. Esse teste está ERRADO NA RAIZ: **um
carrossel de Instagram passa de LADO PRA LADO** (swipe horizontal). Quando o usuário
arrasta, o slide seguinte entra pela DIREITA — nunca por baixo. A costura que de fato
importa é BORDA DIREITA do slide N ↔ BORDA ESQUERDA do slide N+1, na MESMA altura Y —
não topo↔base. As linhas 100% verticais da versão antiga (entram pelo topo do frame,
saem pela base) nunca poderiam parecer conectadas no Instagram de verdade — por melhor
que estivessem alinhadas verticalmente, o usuário jamais vê o topo de um slide colado
na base do outro. Reexame da referência real ("The Claude Campus Ambassador program is
back") com esse entendimento correto: as linhas ali fazem cotovelos ortogonais (descem,
viram 90°, atravessam horizontal) e SAEM pela borda direita numa altura Y — a mesma
linha ENTRA pela borda esquerda do próximo slide exatamente nessa altura. É isso que
cria a ilusão de continuidade ao arrastar.

### Arquitetura nova — entrada/saída por altura Y fixa (não mais `track.x` vertical)

`src/lib/TrackRail.tsx` foi reescrito do zero (a função `buildRailPath` antiga assumia
movimento vertical de ponta a ponta, não dava pra remendar). `RailTrack` trocou `x` por
`y`: cada trilha tem uma **homeY única**, que é ao mesmo tempo o ponto de entrada na
borda esquerda E o ponto de saída na borda direita de TODO slide onde ela não converge.
Isso garante a continuidade POR CONSTRUÇÃO — a mesma trilha usa a mesma homeY em todo
lugar, nunca existe um par de valores "saída do slide N" / "entrada do slide N+1" pra
sincronizar manualmente (e portanto nenhum jeito de eles ficarem dessincronizados).

Dentro do slide, a trilha ATIVA (dona daquele slide) pode se afastar da homeY num
cotovelo ortogonal — desce/sobe até o centro vertical do frame (`CENTER_Y`), atravessa
horizontal, volta — pra visitar visualmente a região onde vive o conteúdo (headline/
body). Mas SEMPRE retorna à própria homeY antes de tocar as bordas esquerda/direita.
Trilhas inativas atravessam retas, na própria homeY, do início ao fim do slide — sem
cotovelo, porque não são as "donas" daquele slide.

`RAIL_TRACKS` em `src/templates/Rotas.tsx`: Restaurante `y=270` (terço superior), Loja
de roupa `y=675` (centro exato do frame — por isso essa trilha atravessa reta em TODOS
os slides, inclusive quando é a ativa: já está na altura que o cotovelo visitaria),
Distribuidora `y=1080` (terço inferior).

No Fechamento (`converge`), as 3 trilhas ENTRAM pela borda esquerda exatamente na homeY
em que saíram do slide anterior (Distribuidora) — não uma altura nova inventada — e SÓ
ENTÃO curvam, dentro do próprio slide, até `(CONVERGE_X, CONVERGE_Y)`, onde o Mascote
está posicionado; depois continuam retas, sobrepostas, até a borda direita ("as rotas
viram 1 sistema só"). `CONVERGE_X`/`CONVERGE_Y` recalculados pra `(0.56×W, 0.62×H)` —
ainda exportados do `TrackRail`, ainda a fonte única de verdade pro `Mascote` se
posicionar (import direto, sem duplicar o valor).

Dormentes (ticks): invertidos de orientação — na versão vertical antiga eram horizontais
(perpendiculares a uma linha que corria de cima pra baixo); agora, como a trilha ativa é
majoritariamente horizontal, os ticks são verticais.

### Teste de continuidade CORRETO desta vez — lado a lado, honesto

Gerei os 5 PNGs (`Capa | Restaurante | Loja de Roupa | Distribuidora | Fechamento`) e
colei **lado a lado horizontalmente**, na ordem real do carrossel (não mais empilhados) —
`out/reset-v2/_side-by-side-horizontal-test.png` (arquivo de teste, removido depois de
conferir; não faz parte do catálogo de entrega). Resultado, olhando os 4 pontos de
costura (Capa↔Restaurante, Restaurante↔Loja, Loja↔Distribuidora, Distribuidora↔
Fechamento) em crops ampliados de cada um: **as 3 trilhas — a ativa grossa e as 2
inativas finas — cruzam cada emenda exatamente na mesma altura Y dos dois lados**, sem
nenhum salto vertical perceptível. É a primeira vez que esse teste (o teste que
realmente importa, porque é o que o usuário vê ao arrastar o carrossel de verdade)
mostra continuidade real, não aproximada. A convergência do Fechamento também ficou
coerente: as 3 curvas entram no slide exatamente nas alturas em que saíram da
Distribuidora (conferido visualmente comparando o crop da emenda Distribuidora↔
Fechamento com o render cheio do Fechamento) e se fundem dentro do corpo do Mascote,
continuando como traço único até a borda direita.

**Sem maquiagem**: o teste anterior (Rodada 6-7, topo↔base) nunca validou nada que
importasse de verdade para a experiência real de swipe — era um teste que podia passar
100% e ainda assim a peça pareceria "solta" no Instagram. Este teste horizontal é o
substituto correto e, com ele, a continuidade passa a ser real e verificável.

### Arquivos alterados nesta rodada 8

- `src/lib/TrackRail.tsx` — reescrito do zero: `RailTrack.x` → `RailTrack.y` (homeY fixa
  de entrada/saída); `buildRailPath` (vertical) substituído por `buildActivePath`
  (cotovelo ortogonal horizontal, trilha ativa) + `buildConvergePath` (curva até
  `CONVERGE_X/Y`, trilha convergente) + linha reta simples (trilha inativa); ticks
  invertidos de horizontais pra verticais; `CONVERGE_X`/`CONVERGE_Y` recalculados.
- `src/templates/Rotas.tsx` — `RAIL_TRACKS`: `x: 230/540/850` → `y: 270/675/1080`.
- `out/reset-v2/Rotas*.png` — os 5 slides re-renderizados com a lógica nova.

---

## Rodada 7 — correção do fundador: "Rotas" é estrutura, não tema; convergência tem que ser NO mascote (2026-09-05)

O fundador viu a Rodada 6 e corrigiu 2 pontos, direto (ficou irritado com a leitura literal
demais da palavra "rota"). Registrando os 2 como aprendizado permanente do formato, não só
desta peça.

### Correção 1 — "Rotas" é um DISPOSITIVO ESTRUTURAL, não uma exigência de tema

**Erro cometido na Rodada 6**: o conteúdo escolhido ("3 perfis de negócio, cada um sua
trilha") interpretou a palavra "rota" literalmente — como se o formato só servisse pra
conteúdo sobre "caminhos/rotas de negócio". Não é isso.

**Regra correta, pra qualquer post futuro de Rotas**: o formato é a ESTRUTURA VISUAL —
N linhas coloridas que atravessam os slides e convergem num ponto final — e serve pra
QUALQUER conteúdo com N elementos paralelos que fazem sentido convergir em algo no final:
3 dicas, 3 dados, 3 etapas, 3 tipos de cliente, 2 comparações, o que for. O "N" e o "tema
de cada trilha" são decisão de CONTEÚDO (como já registrado na Rodada 6 sobre "número de
trilhas não é fórmula fixa"), mas o próprio CONCEITO de "rota/caminho" não precisa aparecer
na copy nem no tema escolhido — a estrutura já carrega a metáfora sozinha (visualmente, é
óbvio que são "trilhas convergindo"), não precisa que o conteúdo fale sobre isso também.

A peça desta rodada ("3 perfis de negócio, cada um sua trilha") continua sendo um exemplo
válido de uso do formato — não foi refeita — mas não é o ÚNICO tipo de conteúdo pro qual
"Rotas" deveria ser escolhido daqui pra frente. Próxima vez que alguém for decidir se um
conteúdo "pede" o formato Rotas, a pergunta certa é "esse conteúdo tem N elementos paralelos
que convergem pra algo no final?" — não "esse conteúdo é sobre rotas/caminhos?".

### Correção 2 — o ponto de convergência no Fechamento tem que ser o MASCOTE FOGUETE de verdade

**Erro cometido na Rodada 6**: `RotasFechamento` usava `CrateIcon` (ícone genérico de
caixa/engradado) como "destino" das 3 trilhas convergindo. Além do ícone ser genérico (não
é marca própria da Norte), a matemática de convergência do `TrackRail` só fechava o "V"
de verdade perto de y=1390 — FORA do frame visível (1350px de altura) — então na prática as
3 linhas nunca chegavam a se encontrar de verdade na altura onde o ícone estava; ficavam
"perto", nunca "nele". Ver comparação visual: `out/reset-v2/RotasFechamento.png` (antes)
mostra o "V" ainda bem aberto (~300-400px de distância entre as linhas) na altura do ícone.

**Fix**: 2 mudanças.
1. `src/lib/TrackRail.tsx` ganhou `CONVERGE_X`/`CONVERGE_Y` exportados (constantes, não mais
   um valor "perto do fim do frame" implícito) e `buildRailPath` foi reescrito pro caso
   `converge` terminar a curva bezier EXATAMENTE em `(CONVERGE_X, CONVERGE_Y)` — dentro do
   frame visível — e só depois continuar reta (sobreposta) até o fim do slide. Antes disso, a
   convergência era assintótica (só fechava matematicamente no infinito/fora do frame); agora
   ela termina de fato num ponto fixo, calculável e reutilizável por qualquer slide que
   precise saber "onde as trilhas se encontram".
2. `src/templates/Rotas.tsx` (`RotasFechamento`) troca `CrateIcon` por `Mascote`
   (`src/lib/Mascote.tsx`, o foguete real extraído do site), importando `CONVERGE_X`/
   `CONVERGE_Y` diretamente do `TrackRail` (não duplicando o valor) pra centralizar o SVG
   exatamente nesse ponto. Ganhou também um halo estático sutil (`radial-gradient` translúcido
   na cor institucional `brand.primary`, sem animação — é post, não vídeo) atrás do foguete,
   sugerindo "ponto de chegada" sem virar decoração vazia.

**Nota sobre a regra antiga ("mascote só em vídeo/animação, nunca estático como decoração")**:
essa regra continua valendo pro mascote como ENFEITE solto (ex: não colar o foguete parado
num canto só pra "ter marca"). Este caso é diferente: o mascote tem FUNÇÃO narrativa clara —
é o destino visual das 3 linhas convergindo, não decoração. A regra antiga não se aplica aqui
por causa da função, não por exceção arbitrária.

**Resultado depois do fix, conferido no PNG re-renderizado**: as 3 trilhas agora terminam
visivelmente dentro do corpo/janela do foguete — não perto, nele — e continuam como um único
traço sobreposto abaixo (efeito bônus não planejado, mas coerente com a metáfora "as rotas
viram 1 sistema só"). Escala do Mascote (196px de largura, ~227px de altura) fica proporcional
ao slide: nem pequeno a ponto de virar detalhe perdido, nem grande a ponto de dominar o
frame sobre o título/CTA que ficam acima.

### Arquivos alterados nesta rodada 7

- `src/lib/TrackRail.tsx` — `CONVERGE_X`/`CONVERGE_Y` exportados; `buildRailPath` reescrito
  pro caso `converge` terminar num ponto fixo dentro do frame (antes, assintótico/fora do
  frame).
- `src/templates/Rotas.tsx` — `RotasFechamento`: `CrateIcon` → `Mascote`, posicionado em
  `(CONVERGE_X, CONVERGE_Y)` com halo estático sutil; import de `CrateIcon` removido
  (`HangerIcon` continua em uso na Capa).
- `out/reset-v2/RotasFechamento.png` — re-renderizado (único slide alterado; os outros 4 da
  Rodada 6 não mudaram, não foram re-renderizados).

---

## Rodada 6 — ROTAS: novo formato-flagship, réplica fiel do "Campus Ambassador" (2026-09-05)

### Mudança de direção (registro)

O fundador ficou insatisfeito com a direção "foto de estoque em tela cheia" das rodadas
1-5 (`EtapasDeEstoque.tsx`, carrossel "Como um estoque organizado se move"). Esse carrossel
fica **arquivado/pausado** (código mantido no repo e no `Root.tsx`, não é mais o formato
ativo de produção). O novo formato-flagship é **Rotas** (`src/templates/Rotas.tsx`),
réplica fiel da estrutura do carrossel real "The Claude Campus Ambassador program is back"
(@claudeai): capa com cards tipo post-it (cada um com um diagrama/ilustração/gráfico + cor
própria) → 1 slide flat-color por trilha, com a mesma linha colorida atravessando todos os
slides → fechamento com CTA + ícone desenhado à mão.

Comparei a captura de tela real da referência (`instagram.com/claudeai`, grid do perfil,
2026-09-05) — não só a descrição do briefing — antes de desenhar qualquer coisa: 3 post-its
levemente rotacionados em papel claro (não kraft/marrom), cada um com um mini-diagrama de
nós numa cor própria (laranja/roxo/verde), uma anotação desenhada à mão ("Follow your track")
apontando pro conjunto, título serifado grande embaixo com 1 palavra/frase em bold no meio de
texto regular.

### Decisão de conteúdo: "3 perfis de negócio que usam o NTB Estoque de formas diferentes"

Restaurante (controla validade por lote) · Loja de roupa (controla grade/tamanho) ·
Distribuidora (controla lote/rastreabilidade até a nota fiscal).

Por quê este conteúdo e não outro: é o exemplo que **genuinamente pede** trilhas paralelas —
3 públicos reais, cada um com uma necessidade distinta do MESMO produto, convergindo pra "1
sistema" no fechamento. Não é conteúdo sequencial (entrada→conferência→saída, que é o formato
do carrossel antigo) forçado numa estrutura de ramificação — era exatamente o erro que o
briefing pediu pra evitar. Também serve ao objetivo de negócio (métrica de sucesso definida
pelo fundador é lead/contato real, não alcance): mostra a versatilidade do produto pra 3
perfis de prospecção diferentes, cada um podendo se reconhecer no "seu" slide, com CTA único
de fechamento que serve aos 3.

**Por que 3 trilhas, não um número fixo**: o briefing foi explícito que o número de trilhas
não deveria ser travado em "sempre 3" por padrão. Aqui são 3 porque existem 3 perfis
genuinamente distintos e relevantes de cliente do NTB Estoque — se o próximo post de Rotas for
sobre, por exemplo, "o caminho pro estoque bagunçado vs. o caminho pro estoque organizado",
a resposta certa é 2 trilhas, não 3. O número é uma decisão de conteúdo, nunca uma fórmula do
formato.

### Regra permanente do formato Rotas: recheio de card varia por tipo de conteúdo

Pedido do fundador (via coordenador, incorporado na mesma rodada) — **registrar como
aprendizado permanente**, não só desta peça: o conteúdo DENTRO de cada post-it/card não segue
uma fórmula fixa (não é "sempre diagrama de nós"). O tipo de recheio certo depende do que
aquela trilha está comunicando:

- Trilha sobre **CONCEITO/PROCESSO** → diagrama geométrico de nós (`GeometricDiagram`,
  componente já existente, reutilizado).
- Trilha sobre **OBJETO CONCRETO** (algo físico, não um fluxo nem uma métrica) → ilustração
  ORIGINAL no estilo editorial definido nesta rodada (ver seção seguinte).
- Trilha sobre **DADO/MÉTRICA/COMPARAÇÃO** (tempo, dinheiro, esforço) → gráfico pequeno
  qualitativo (`MiniBarCompare`), sem decoração, SEM inventar número específico como se fosse
  dado real (ver nota de honestidade abaixo).
- Trilha sobre **HISTÓRIA/AFIRMAÇÃO DIRETA** → pode ser só frase, sem elemento gráfico extra
  dentro do card (não usado nesta peça específica, mas faz parte do repertório).

Nesta peça: Restaurante = diagrama (processo de validade), Loja de roupa = ilustração
(cabide), Distribuidora = gráfico pequeno (comparação qualitativa "com sistema" vs. "no
manual"). Nenhum dos 3 repete o tipo de recheio do outro — é a mesma lição da rodada "sem
graça" do `EtapasDeEstoque` (repetir fórmula = tédio), aplicada agora ao NÍVEL DO CARD, não só
ao nível do slide. **Essa variação é regra do formato Rotas daqui pra frente, não escolha
pontual desta peça** — qualquer post futuro de Rotas deve decidir o recheio de cada card pelo
tipo de conteúdo daquela trilha, nunca por padrão fixo.

**Nota de honestidade sobre o gráfico da Distribuidora**: `MiniBarCompare` mostra 2 barras de
tamanhos diferentes ("Com sistema" vs. "No manual") SEM número/percentual — é ilustrativo/
direcional, não uma alegação factual de "X% mais rápido". Mantém o precedente já registrado
na Rodada 4 ("não inventar métrica fictícia sem dado real do fundador"). Se um dado real
existir no futuro, trocar os labels e a proporção das barras é 1 edição direta em
`src/lib/MiniChart.tsx`.

### Estilo de ilustração original — definido e documentado pra reuso futuro

Pedido do fundador: se algum card pedir ilustração original (não dado, não diagrama, não
frase pura), desenhar num estilo NOVO e definido, não um esboço genérico — e documentar esse
estilo como padrão reutilizável, não descartável.

**Regra do estilo** (`src/lib/EditorialIcons.tsx`, `EDITORIAL_STROKE = 15`):
- 1 único `<path>` contínuo — só um `M` no início, resto `L`/`C` (sem levantar a "caneta",
  sem múltiplas linhas soltas).
- Traço GROSSO (15px em viewBox ~220), espessura constante, `strokeLinecap`/`strokeLinejoin`
  round.
- `fill="none"` — é contorno, não silhueta sólida.
- Monocromático — cor via prop, nunca gradiente/sombra/textura.
- Sujeito: objetos do universo de estoque/operação (caixa, cabide, prateleira, código de
  barras, carrinho), simplificados ao mínimo de formas reconhecíveis.

Esse é o estilo de contorno editorial confiante que o fundador pediu (traço único, grosso,
sem jitter/sketch trêmulo — o jitter trêmulo já foi rejeitado no v1 antigo). Usado 2x nesta
rodada, pra provar que é reutilizável: `HangerIcon` (cabide, card "Loja de roupa", colorido
na cor da trilha) e `CrateIcon` (caixa/engradado aberto, assinatura do slide de Fechamento,
sempre preto — é a "marca" do carrossel, não uma cor de trilha). **Qualquer ilustração
original futura da Norte deve seguir essa mesma regra de estilo** — não reinventar a cada
peça.

### A linha-trilho (TrackRail) como assinatura visual do formato inteiro

Pedido do fundador: a linha colorida multi-trilha é o elemento de marca mais forte da
referência real — tratar como assinatura visual do formato Rotas INTEIRO (não só desta peça),
com mais capricho que qualquer outro elemento.

`src/lib/TrackRail.tsx` (novo componente, substitui `ConnectorLine` — que continua existindo
só pro carrossel arquivado `EtapasDeEstoque`): as 3 trilhas (cores fixas por trilha) aparecem
em TODOS os 5 slides, sempre — não só no slide "dono" daquela cor. Na trilha ATIVA (dona do
slide atual): traço grosso (12px), opacidade 100%, com "dormentes" (ticks perpendiculares
regulares) reforçando a metáfora ferroviária de "Rotas" — mais elaborado que a curva única do
`ConnectorLine` antigo, de propósito, porque o pedido foi "capriche mais nela que em qualquer
outro elemento". Nas trilhas inativas: traço fino (4px), bem apagado (opacidade 0.16), mas
NUNCA invisível — é isso que dá a sensação de "mapa contínuo por trás do conteúdo em foco" que
a referência real tem.

**Bug real pego no primeiro render, corrigido antes de fechar a rodada**: como os 3 slides de
trilha SÃO a própria cor da trilha (fundo flat), a linha "ativa" (mesma cor do fundo) ficava
literalmente invisível — desaparecia em cima do próprio fundo. Fix: `TrackRail` recebe
`backgroundColor` do slide atual e, só quando a trilha ativa é da MESMA cor do fundo, desenha
um "halo" de contraste (traço largo bege claro atrás + friso branco fino em cima) — como o
friso branco de uma faixa de trânsito. Resolve sem trocar a cor real da trilha.

No Fechamento, as 3 trilhas CONVERGEM pra um único ponto atrás do CTA/ícone (`converge` prop)
— resolve visualmente "os caminhos convergem no mesmo lugar: o sistema", coerente com o
conceito de "trilhas paralelas que convergem" do briefing.

### Decisão de fonte: Newsreader, não Fraunces

O fundador pediu "aquela fonte" apontando pra referência "Campus Ambassador" pela 2ª vez —
motivo suficiente pra reabrir a decisão de fonte fechada na Rodada 5 (Fraunces), mas SÓ pra
este template (Rotas), sem reabrir a decisão do carrossel antigo (arquivado, sem necessidade).

Comparação real feita (não de memória): render lado a lado do mesmo texto
("Um sistema. **Três jeitos** de organizar o estoque.") em Fraunces vs. Newsreader, no mesmo
tamanho/peso, contra a MESMA referência (screenshot real do grid do @claudeai, não só a
descrição em texto). Resultado, olhando os PNGs: Fraunces tem terminais em bola e curvas
decorativas/quirky (visível principalmente no "g" de loop aberto e nos terminais arredondados
"carnudos") — um tom de serifada editorial de revista, não de jornal clássico. Newsreader tem
contraste mais moderado, x-height maior, formas mais sóbrias e retas — muito mais perto da
serifada "tipo jornal americano" que a referência real usa (provavelmente Tiempos/Copernicus,
não licenciáveis). **Newsreader venceu essa comparação específica.**

Detalhe técnico: só existiam `Newsreader-400-italic`/`700`/`700-italic` no projeto (de uma
rodada anterior, descartados sem comparar contra ESTA referência). Baixei o peso 400 normal
que faltava direto do Google Fonts (subset `latin-ext`, cobre acentuação PT-BR — ê, ç, ã) e
embuti em `public/fonts/Newsreader-400.woff2`, mesma regra de fontes embutidas (não-CDN) do
projeto. `FONT_SERIF_ROTAS` (`src/lib/fonts.ts`) é a fonte própria do template Rotas — não
substitui `FONT_SERIF`/Fraunces global, que seria usado apenas se o carrossel arquivado for
reaberto no futuro.

### Avaliação crítica honesta — comparando com a referência real

**O que funciona bem, sem exagero:**
- A linha-trilho com dormentes é o elemento mais forte da peça — lê como "sistema de trilhos"
  de verdade, não como decoração solta, e o halo de contraste resolve o problema real de
  legibilidade sem sacrificar a cor da trilha.
- Os 3 recheios de card são genuinamente distintos (diagrama / ilustração / gráfico) — a
  variedade pedida aparece de verdade, não é alegação vazia.
- `HangerIcon` lê claramente como cabide à primeira vista, mesmo em 124px — o estilo de traço
  único grosso funciona bem em escala pequena, o que valida a regra como reutilizável.
- `CrateIcon` no fechamento lê como caixa/engradado aberto, não como "rascunho ruim" (o erro
  do v1 antigo que foi explicitamente rejeitado) — silhueta limpa, reconhecível.
- O convergir das 3 trilhas no fechamento é o momento visual mais bonito da peça — fecha a
  metáfora "rotas paralelas → 1 sistema" com clareza.

**Onde ainda fica abaixo da referência, sem rodeio:**
1. **Os post-its não têm textura de papel real.** A referência usa cards num tom cru
   ligeiramente texturizado (quase kraft claro); os nossos são um retângulo `#fffdf7` liso com
   sombra — funcional, mas mais "card de UI" do que "post-it físico". Se quiser fechar esse
   gap, o próximo passo é uma textura de papel sutil (grão/ruído leve) no `PostitCard`, hoje
   não implementada por decisão de manter o escopo desta rodada focado na estrutura (rail,
   recheio variável, ilustração) em vez de polimento de textura.
2. **O diagrama do card "Restaurante" (`GeometricDiagram` reutilizado) lê mais como gráfico de
   linha/série temporal do que como "processo chegada→validade→alerta"** — é um zigue-zague
   genérico de 4 nós, o mesmo componente usado no carrossel antigo pra outro propósito
   (microsteps de conferência). Funciona por associação com o texto ao lado ("Controla
   validade por lote"), mas um diagrama desenhado especificamente pra esse processo (com
   direção/seta clara de "entrada → alerta") seria mais preciso. Registrado como aproximação
   deliberada (reuso de componente existente), não solução definitiva.
3. **A anotação desenhada à mão é bem mais simples que a "Follow your track" da referência** —
   a nossa é 1 curva + seta pequena; a original tem uma curva mais longa e orgânica que
   atravessa visualmente todo o conjunto de cards. A nossa cumpre a função (aponta, tem
   personalidade tipográfica itálica) mas com menos "mão" na execução.
4. **As 3 cores de trilha (teal/rosa/índigo) já são cores de produto/semânticas da marca
   (`productColors.estoque`, `brand.accent`, `productColors.avalia`)** — escolha deliberada
   pra manter consistência com o sistema de cores existente, mas um olho mais atento pode
   achar que "rosa = loja de roupa" e "índigo = distribuidora" não têm um motivo semântico tão
   forte quanto "teal = estoque" (que já é a cor real do produto). Se o fundador preferir,
   trocar por uma paleta dedicada a "perfis de cliente" (sem sobrepor à paleta de produto) é
   1 edição em `RAIL_TRACKS`/`TRACK_*` no topo de `Rotas.tsx`.

**Resposta direta**: a estrutura (post-its → trilhas → convergência) segue fielmente a
referência real, e os 2 elementos mais capricados pedidos pelo fundador (linha-trilho e
estilo de ilustração original) ficaram genuinamente bons e reutilizáveis. Os gaps que restam
são de ACABAMENTO (textura de papel, precisão do diagrama, orgânica da anotação à mão), não
de estrutura — mais próximo de "polir" do que de "refazer".

### Arquivos criados/alterados nesta rodada

- `src/templates/Rotas.tsx` (novo) — capa + 3 slides de trilha + fechamento.
- `src/lib/TrackRail.tsx` (novo) — assinatura visual do formato Rotas.
- `src/lib/EditorialIcons.tsx` (novo) — estilo de ilustração original (`HangerIcon`,
  `CrateIcon`), documentado pra reuso.
- `src/lib/MiniChart.tsx` (novo) — `MiniBarCompare`, gráfico pequeno qualitativo.
- `src/lib/fonts.ts` — `FONT_SERIF_ROTAS`/`ensureNewsreaderLoaded` (Newsreader, própria do
  Rotas, não substitui `FONT_SERIF`/Fraunces global).
- `public/fonts/Newsreader-400.woff2` (novo) — peso regular que faltava, baixado do Google
  Fonts (subset latin-ext) e embutido no projeto.
- `src/Root.tsx` — registradas as 5 Stills de Rotas.
- `out/reset-v2/Rotas*.png` — 5 renders novos.

---

## Rodada 5 — a Capa nunca tinha mudado (erro real, fundador ficou bravo com razão) (2026-09-05, mesmo dia)

### Diagnóstico

Depois de 4 rodadas de ajuste (fonte, grade, print, remoção do foguete, repertório de 6
layouts diferentes), a Capa era o ÚNICO slide que nunca tinha sido tocado desde a rodada 1:
sempre título preto bold em fundo bege liso + `ConnectorLine` fina embaixo. A sessão principal
reexaminou as referências reais que o fundador mandou
(`docs/referencias-visuais/claude-instagram/exemplos-formatos-2026-09-04.md`) e confirmou:
**nenhuma capa forte de carrossel real do @claudeai é só texto em fundo liso.** Toda capa forte
tem no mínimo 1 elemento visual de peso — "Campus Ambassador" tem 3 cards ilustrados
rotacionados, "Anthropic Insights" tem uma ilustração grande de luminária em fundo verde-oliva
sólido, "Garvan Institute"/"The gardeners" usam FOTO REAL em tela cheia, "400k Claude Code
sessions" usa fundo preto + mascote pixelado grande. A Capa é a peça que mais precisa parar o
scroll — e foi a única deixada intocada por inércia ("já funcionava"), o que é um erro real,
não uma decisão deliberada: nunca houve uma comparação explícita da Capa contra essas
referências nas rodadas 1-4, só contra a heurística geral de "fonte boa + grid" que já tinha
sido resolvida pros outros slides.

**Aprendizado registrado pra próximas peças**: revisar a capa a cada rodada de QA visual, com
a mesma exigência que os slides "de conteúdo" recebem — não assumir que um slide "está bom"
só porque nunca recebeu uma reclamação específica. Silêncio sobre um slide não é validação.

### Decisão: Capa vira foto real em tela cheia

Capa reescrita do zero, mesma técnica de "foto + scrim + frase" que já validou bem em Entrada
nas rodadas 3-4:
- **Foto**: `public/photos/corredor-empilhadeira-estoque.jpg` — único arquivo de estoque real
  disponível em `public/photos/` (as outras 6 fotos do diretório são de outros
  temas/produtos: restaurante, montanha, escritório genérico — nenhuma serve como "estoque").
  É também, por composição, a foto mais impactante disponível pra abrir o carrossel: corredor
  simétrico profundo com forte convergência de linhas, pessoas minúsculas no fundo dão escala
  real ao espaço, luz forte vindo do fim do corredor cria ponto focal natural.
- **Scrim**: gradiente escuro mais forte no topo (0.50) e na base (0.88), mais claro no meio
  (0.22-0.30) — o meio da foto (caixas claras) tem contraste suficiente sem escurecer demais a
  textura da imagem; overline e título (ambos na faixa escura) ficam legíveis.
- **Overline "NTB ESTOQUE"** mantido no canto superior esquerdo, agora em branco.
- **Título** Fraunces Bold 700, 80px (era 76px — o levemente maior compensa competir com uma
  imagem em vez de fundo liso), com `text-shadow` sutil pra reforçar legibilidade nas bordas
  das letras sobre a textura das caixas.
- **ConnectorLine** mantida (`mode="start"`, agora branca) — deixa de ser o elemento de
  destaque sozinho, mas continua como fio condutor visual entre os 6 slides.

### Efeito colateral: Entrada precisou mudar pra não repetir o golpe visual

A Capa passou a usar a MESMA foto que Entrada já usava em tela cheia. Repetir "foto em tela
cheia + scrim + frase" no slide 1 e de novo no slide 2, sem nenhuma variação, seria o mesmo
problema de fórmula repetida que a Rodada 4 já tinha corrigido pro resto do carrossel — só que
agora entre os 2 primeiros slides, o pior lugar possível pra repetir (é a primeira impressão
dupla).

Fix: `EtapasEntrada` foi reescrita — fundo bege liso + `GridTexture` (como Conferência/Prova/
Fechamento) + um CARD emoldurado (borda fina escura, padding 10px, sombra suave) com a mesma
foto, agora como uma peça pequena de "evidência" centralizada, não um pano de fundo. Isso cria
uma família visual deliberada com a `BrowserFrame` da Prova (slide 5) — as duas são "evidência
emoldurada", uma física (foto) e uma digital (screenshot) — sem repetir a composição da Capa
(tela cheia) nem da Prova (moldura de navegador com barra de endereço).

### Avaliação crítica honesta — a Capa nova realmente "para o scroll"?

Comparando com as referências reais citadas no diagnóstico:

**O que funciona:** a foto tem drama e escala genuínos — o corredor profundo com convergência
de linhas fortes é o tipo de composição que já funciona sozinha como imagem (é a foto mais
forte do banco de fotos disponível), o scrim resolve a legibilidade sem lavar a imagem, e o
título em 80px tem presença real contra o fundo. Comparado à "capa anterior" (texto preto em
bege liso), é uma melhora inequívoca — agora há pelo menos 1 elemento visual de peso, que era
exatamente o critério de "capa forte" identificado nas referências.

**Onde ainda fica abaixo das referências, sem rodeio:**
1. **Não é uma foto ORIGINAL da marca** — é um stock genérico de estoque (não é o armazém real
   de nenhum cliente NTB Estoque, nem tem qualquer elemento de marca visível na cena). As
   referências fortes (Garvan Institute, The gardeners) usam fotografia editorial/documental
   comissionada, com uma pessoa/cena específica e reconhecível — a foto aqui tem menos
   "unicidade" e mais "poderia ser qualquer galpão de qualquer empresa". Se o fundador tiver ou
   puder tirar uma foto real de um cliente/operação NTB Estoque, trocar por essa é upgrade
   direto (1 linha em `estoqueFoto`).
2. **Não tem um "herói" humano ou de produto em primeiro plano** — "Garvan Institute" e "400k
   Claude Code sessions" centralizam a atenção num sujeito claro (cientista, mascote). Aqui o
   sujeito é o espaço (corredor), não uma pessoa/objeto — funciona pelo drama arquitetônico da
   composição, mas é um tipo de impacto mais frio/institucional do que o calor humano das
   referências com rosto/personagem.
3. **O meio da imagem (faixa das caixas claras) tem contraste mais baixo que o topo/base** —
   decisão deliberada pra não lavar a textura da foto, mas um olho mais exigente pode achar o
   meio "morno" comparado ao preto quase sólido do topo/base do scrim.

**Resposta direta**: sim, para mais o scroll que a versão anterior (que não parava nada — é só
texto), mas não está no nível das referências mais fortes (Garvan/gardeners) porque a foto é
stock genérico sem "unicidade" de marca, não uma imagem documental real da operação. Registro
honesto: essa é uma limitação de MATERIAL disponível (só 1 foto de estoque no banco), não de
tratamento — o tratamento (scrim + tipografia + escala) já reproduz a técnica das referências.

### Arquivos alterados nesta rodada 5

- `src/templates/EtapasDeEstoque.tsx` — `EtapasCapa` reescrita do zero (foto em tela cheia +
  scrim + título 80px, era flat color + título 76px); `EtapasEntrada` reescrita (era foto em
  tela cheia, virou card emoldurado em fundo bege + GridTexture, pra não repetir a Capa);
  variável `entradaFoto` renomeada/movida pra `estoqueFoto` (compartilhada pelos 2 slides);
  docstring de estrutura no topo do arquivo atualizada.
- `out/reset-v2/*.png` — 6 renders sobrescritos (Capa e Entrada mudaram de verdade;
  Conferência/Saída/Prova/Fechamento sem mudança de código, re-renderizados só por completude
  do lote).

---

## Rodada 4 — variação de layout slide a slide ("tá sinceramente sem graça") (2026-09-05, mesmo dia)

### Diagnóstico

Depois de 3 rodadas de ajuste fino (fonte, grade, print, remoção do foguete), o fundador viu
o resultado e achou "sinceramente sem graça". Diagnóstico (sessão principal, sem pedir pro
fundador apontar de novo): o problema não era mais qualidade de fonte/cor/espaçamento —
já resolvidos — mas **fórmula repetida**. Até a rodada 3, todo slide de etapa seguia
exatamente o mesmo esqueleto (overline → ícone pequeno no topo → vazio → título serifado →
parágrafo → linha conectora), variando só a cor de fundo (teal/bege alternado). Cinco, seis
slides seguidos com a mesma receita é limpo mas monótono, mesmo com tipografia e cor
corretas. Os carrosséis reais do @claudeai (`docs/referencias-visuais/claude-instagram/
exemplos-formatos-2026-09-04.md`) nunca repetem layout entre slides — cada um muda de cara:
capa cor chapada → foto real → diagrama → afirmação → citação/dado. É a variação de
LAYOUT, não só de cor, que sustenta a atenção slide a slide.

### Decisão: repertório de 6 formatos, 1 por slide, nenhum repetido

Conteúdo mantido (entrada → conferência → saída → prova → fechamento) e a `ConnectorLine`
como fio condutor mantida em todos os 6 slides, mas cada slide passou a usar um layout
genuinamente diferente:

1. **Capa** (`EtapasCapa`) — inalterada. Flat color (`begeClaro`) + título grande serifado.
   Já funcionava desde a rodada 1, é o formato "capa" real do repertório documentado.
2. **Etapa 1 · Entrada** (`EtapasEntrada`) — **reescrita do zero**, não usa mais `EtapaSlide`.
   Formato "foto real + frase curta sobreposta": `public/photos/corredor-empilhadeira-
   estoque.jpg` (corredor de estoque com empilhadeira) em tela cheia, scrim escuro em
   gradiente (mais forte embaixo, onde fica o texto) pra legibilidade do título branco. Sem
   grade de fundo (textura é pra superfície lisa, não faz sentido sobre foto). É o formato
   que o fundador disse gostar desde a rodada 1 ("só uma foto e uma frase").
3. **Etapa 2 · Conferência** (`EtapasConferencia`) — **reescrita do zero**, layout próprio
   centrado no `GeometricDiagram` (novo componente, `src/lib/GeometricDiagram.tsx`): 4 nós
   ligados por um traço contínuo (mesmo traço grosso monocromático do `GeometricIcon`, mas
   em escala de protagonista, 760px) representando os microsteps do processo (chegada →
   contagem → registro → prateleira). Sai do padrão "ícone pequeno no topo" das rodadas
   anteriores.
4. **Etapa 3 · Saída** (`EtapasSaida`) — manteve o formato "afirmação flat + ícone" original
   (é o único slide do carrossel nesse formato agora, deixou de ser repetição), mas o ícone
   deixou de ser pequeno-no-canto (132px) e virou protagonista centralizado em 320px, ocupando
   de fato o espaço vertical em vez de decorá-lo com um vazio atrás. Ajuste feito depois do
   primeiro QA visual desta própria rodada — ver "correção no meio da rodada" abaixo.
5. **Prova real** (`EtapasProva`) — manteve o print dentro do `BrowserFrame` (já validado na
   rodada 3), mas ganhou uma citação de apoio abaixo do print (borda esquerda colorida +
   itálico serifado: "Isso não substitui a equipe — tira da equipe o trabalho que é só
   fricção.") pra resolver o vazio inferior de ~500px que a rodada 3 já tinha registrado como
   gap conhecido.
6. **Fechamento** (`EtapasFechamento`) — citação institucional ampliada de 34px para 58px,
   com aspa decorativa grande (`&ldquo;`, Fraunces itálico 700, 240px, opacidade 0.16) atrás
   do texto — tipografia como protagonista, preenchendo o centro do frame com intenção. Sem
   mascote (decisão já fechada na rodada 3: foguete só em vídeo/animação).

### Correção no meio da rodada (QA visual pegou antes de entregar)

Primeira leva de renders mostrou 2 problemas que só apareceram olhando o PNG, não no código:

1. **Saída ficou visualmente idêntica ao problema original.** Mesmo reescrevendo os outros 4
   slides, `EtapasSaida` manteve o ícone pequeno (132px) top-left com ~700px de vazio abaixo
   — exatamente o gap que a rodada 1 já tinha identificado e nunca resolvido de verdade
   (rodada 2 só tinha adicionado o ícone, sem aumentar escala o suficiente). Espremido entre
   um diagrama grande (Conferência) e um print (Prova), esse vazio ficou ainda mais visível
   por contraste. Fix: `topElement` do `EtapaSlide` passou a centralizar verticalmente
   (flex 1 dos dois lados, não só embaixo) e o `BoxOutIcon` foi ampliado pra 320px — vira
   protagonista centralizado em vez de decoração de canto.
2. **Aspa decorativa do Fechamento renderizou errado.** O caractere `"` (aspa reta) em
   Fraunces Bold 700 não estilo itálico ficou com 2 formas tipo "gota"/palheta de violão, não
   lia como aspa. Trocado pro caractere tipográfico correto (`&ldquo;` / `"`) em itálico, que
   renderiza como a dupla vírgula-curva esperada de uma aspa de abertura.

### Arquivos alterados/criados nesta rodada 4

- `src/lib/GeometricDiagram.tsx` (novo) — diagrama de 4 nós conectados, formato "diagrama" do
  repertório.
- `src/templates/EtapasDeEstoque.tsx` — `EtapasEntrada` e `EtapasConferencia` reescritos como
  layouts próprios (não usam mais `EtapaSlide`); `EtapaSlide` com `topElement` centralizado
  verticalmente; `EtapasSaida` com ícone ampliado (132px → 320px); `EtapasProva` com citação
  de apoio abaixo do print; `EtapasFechamento` com citação ampliada (34px → 58px) + aspa
  decorativa (glifo corrigido no meio da rodada).
- `src/lib/GeometricIcon.tsx` — sem mudança de código, só deixou de ser usado em Entrada e
  Conferência (import ajustado em `EtapasDeEstoque.tsx`).
- `out/reset-v2/*.png` — 6 renders sobrescritos com o resultado desta rodada.

### Avaliação crítica honesta desta rodada

**Slide a slide, comparado com o vizinho anterior:**
- Capa → Entrada: cor chapada tipográfica → foto real. Nenhuma repetição possível, são
  naturezas de imagem opostas.
- Entrada → Conferência: foto → diagrama vetorial sobre bege. Diferentes em mídia (foto vs.
  desenho), em fundo (foto vs. flat), em estrutura (frase única vs. título+parágrafo).
  Nenhuma repetição.
- Conferência → Saída: bege+diagrama → teal+ícone-grande. Aqui é o par mais parecido do
  carrossel — os dois são "flat color + gráfico vetorial centralizado + título + parágrafo".
  A cor alterna (bege/teal) e o gráfico muda de natureza (multi-nó abstrato vs. ícone único
  literal), mas a ARQUITETURA da composição (gráfico no meio, texto embaixo) é a mesma nos
  dois. Registro honesto: não é "farinha do mesmo saco" no sentido da rodada 3 (não é mais
  ícone pequeno decorativo + vazio), mas também não é tão distinto quanto os outros pares —
  é o par mais fraco desta rodada.
- Saída → Prova: teal+ícone → bege+moldura de navegador com print real. Diferentes em tudo
  (flat vs. imagem de produto real, ilustrativo vs. fotográfico de interface). Nenhuma
  repetição.
- Prova → Fechamento: print+citação de apoio → citação grande solo. Ambos têm citação em
  itálico serifado, mas em papéis e escalas totalmente diferentes (citação pequena de apoio
  ao lado de uma imagem vs. citação enorme sozinha ocupando o frame inteiro) — não lê como
  repetição ao folhear.

**Resposta direta à pergunta do briefing — a variação resolveu o "sem graça"?** Na maior
parte, sim: das 5 transições entre slides, 4 têm formatos genuinamente distintos (mídia,
estrutura e escala diferentes), o que já é uma melhora real sobre a rodada 3 (6 slides, 1
fórmula só). A transição Conferência→Saída é a exceção — ainda compartilha a mesma
arquitetura de composição (gráfico centralizado + texto embaixo em fundo flat), só que agora
pelo menos cada um tem um tipo de gráfico diferente e nenhum dos dois tem mais o vazio vazio
que caracterizava o problema original. Se o fundador ainda achar esse par parecido, a
correção mais direta seria trocar Saída pra um formato "dado" (número/estatística grande) —
não implementado aqui por decisão de não inventar métrica fictícia sem dado real do fundador.

Fundador viu os 5 PNGs da rodada 2 e deu feedback direto (voz): "Tá melhorando mas ainda
fraco. Depois mais coisas — poderia ter print e etc, enfim mais coisas. As fontes parecem
diferentes em cada post. E o foguete seria só em caso dele como animação, não parado como
desenho." 3 correções:

### 1. Slide novo — prova real (`EtapasProva`, 6º slide, entre Saída e Fechamento)

Carrossel era 100% tipográfico/ilustrativo, sem nenhuma prova de sistema real por trás.
Componente novo `src/lib/DeviceFrame.tsx` (`BrowserFrame`) — moldura de navegador (barra de
título com 3 pontos coloridos + barra de endereço fake `app.ntbestoque.com.br/produtos`),
porque o print fonte é desktop web (1440x900), não teria sentido usar moldura de celular.

Print usado: `public/screenshots/produto-desktop.png` (tela "Produtos" do NTB Estoque —
custo/venda/margem por item). Não existe screenshot da tela de "Conferência" especificamente
(a etapa 2 do carrossel) nem de "Entrada"/"Saída" — os screenshots disponíveis em
`public/screenshots/` são `home-*`, `produto-desktop`, `validade-desktop`, `vendas-*` (NTB
Vendas, produto errado). `produto-desktop.png` foi a escolha mais próxima do fluxo de estoque
(cadastro/gestão de produto, tema central do carrossel) — `validade-desktop.png` também é NTB
Estoque mas cobre uma feature mais específica (vencimento) que não conecta tão bem com a copy
genérica de "prova real do sistema". Decisão registrada como aproximação deliberada, não
100% "print da etapa Conferência" pedida — se o fundador tiver ou puder gerar um print
específico da tela de conferência/entrada de estoque, trocar é 1 linha (`ntbEstoqueProdutoScreenshot`
em `DeviceFrame.tsx`).

Decisão de estrutura: **adicionar 6º slide, não substituir Conferência** — a frase do
fundador ("mais coisas") leu como pedido de adição, e substituir Conferência quebraria a
sequência narrativa entrada→conferência→saída que ele já validou na rodada 1.

### 2. Bug de fonte — auditoria e causa raiz real

Auditei `src/lib/fonts.ts` (única fonte de verdade — `FONT_SERIF='Fraunces'`,
`FONT_SANS='Atkinson Hyperlegible'`) e todo `fontFamily` hardcoded em `EtapasDeEstoque.tsx`,
`GeometricIcon.tsx`, `ConnectorLine.tsx`, `GridTexture.tsx`, `DeviceFrame.tsx` (grep completo
por `fontFamily`/`font-family`/`Serif`). **Não achei nenhuma referência a Source Serif 4 (fonte
antiga) nem fallback de sistema operacional** — todo texto do projeto já usa exclusivamente
`FONT_SERIF`/`FONT_SANS` importados de `fonts.ts`, sem exceção. Corrigi só um resíduo
cosmético: o label do console.error em `ensureSerifLoaded` ainda dizia `'Source Serif 4'`
(não afeta render, só a mensagem de erro em caso de falha de load) — atualizado pra
`'Fraunces'`.

**Causa raiz real, depois de renderizar e comparar pixel a pixel os 5 títulos**: não é bug de
arquivo de fonte — é inconsistência de TRATAMENTO tipográfico. O slide de fechamento usava
texto em caixa mista, sem tracking, cor sólida ("NTB Estoque · saiba mais no link da bio")
enquanto todo o resto do carrossel (overlines "NTB ESTOQUE", "ETAPA 1 · ENTRADA" etc.) usa
caixa alta com tracking 0.08em. Caixa mista vs. caixa alta rastreada, no mesmo peso/família,
lê como "fonte diferente" pra um olho não treinado — mesmo sendo Atkinson Hyperlegible 700 nos
dois casos. Fix: a assinatura de fechamento agora reusa o componente `Overline` (mesmo
tratamento caixa-alta/tracking dos outros 5 slides) em vez de um estilo one-off.

Depois do fix, os 6 slides foram re-renderizados e conferidos visualmente: título serifado
(Fraunces Bold) é idêntico letra por letra entre Capa/Entrada/Conferência/Saída/Prova (mesmo
peso, mesma família, mesmas curvas de terminal) — confirmado por leitura de imagem, não só
inspeção de código.

### 3. Foguete removido do fechamento

`EtapasFechamento` não importa mais `Mascote` (import removido do template). Composição nova:
citação em itálico serifado (mantida) + divisor fino (`64x3px`, cor do tema) + assinatura no
tratamento overline padrão. `src/lib/Mascote.tsx` não foi deletado — fica reservado pra peça de
vídeo/animação futura, conforme decisão do fundador.

### Avaliação crítica honesta desta rodada

**O que ficou bom:**
- A prova real resolve o problema mais sério da rodada 2 (carrossel 100% conceitual sem
  nenhuma evidência de produto real) — o print é legível mesmo reduzido a ~880px de largura,
  a moldura de navegador não compete com o conteúdo.
- Fechamento sem foguete não ficou vazio/estranho — a citação + divisor + assinatura sustentam
  a composição sozinhos, com respiro generoso proporcional ao resto do carrossel.
- Fonte: title, corpo e overline são genuinamente idênticos entre os 6 slides agora — não
  "parecidos", idênticos (mesmo componente, mesmo import).

**Gaps que NÃO ficaram bons, registro honesto:**
1. **O print não é da etapa certa.** É "Produtos" (cadastro/preço), não "Conferência" (entrada
   física/contagem) — a copy do slide ("Não é conceito. É a tela que a equipe usa todo dia")
   foi escrita genérica de propósito pra não prometer uma tela que não existe, mas um revisor
   mais rigoroso vai notar que o print não ilustra literalmente nenhuma das 3 etapas do
   carrossel (entrada/conferência/saída). Isso é uma aproximação por falta de material, não
   uma solução definitiva — o certo seria pedir ao fundador (ou tirar) um print real da tela de
   conferência/movimentação de estoque.
2. **EtapasProva ficou com ~500px de vazio na parte inferior**, abaixo do parágrafo e acima da
   linha conectora — reproduz em menor escala o mesmo "gap" que a rodada 1 tinha nos 4
   primeiros slides. Não critico o suficiente pra bloquear entrega (o slide já tem bastante
   conteúdo visual — print + título + corpo), mas é o layout mais desequilibrado dos 6 nesta
   rodada.
3. **A causa raiz do "bug de fonte" é uma leitura minha, não uma certeza absoluta.** Não há
   como provar de forma definitiva que foi ESSE detalhe (caixa mista vs. caixa alta) que gerou
   a percepção do fundador, já que o feedback dele foi uma frase curta em áudio sem apontar
   qual slide especificamente. Failed to find qualquer bug de arquivo/família de fonte real
   apesar de auditoria completa — se o fundador ainda achar as fontes inconsistentes depois
   desta rodada, o próximo passo é pedir pra ele apontar quais 2 posts especificamente, porque
   não há mais nenhuma pista técnica sobrando no código pra investigar sozinho.
4. **Moldura de navegador é minha primeira versão, não testada contra referências reais** de
   carrossel com screenshot — proporção da barra de endereço, cor de fundo do "chrome"
   (`#eceae4`, aproximação visual, não token oficial do design-dna) foram decisões rápidas, não
   validadas contra o `design-dna.json` (que não tem token pra "moldura de navegador").

### Arquivos alterados/criados nesta rodada 3

- `src/lib/DeviceFrame.tsx` (novo) — `BrowserFrame` + `ntbEstoqueProdutoScreenshot`.
- `src/lib/fonts.ts` — label de erro corrigido (`Source Serif 4` → `Fraunces`), sem mudança de
  comportamento.
- `src/templates/EtapasDeEstoque.tsx` — novo export `EtapasProva` (slide 5), `EtapasFechamento`
  reescrito (sem `Mascote`, assinatura via `Overline`), docstring de estrutura atualizada.
- `src/Root.tsx` — `EtapasProva` registrado como `<Still>` entre `EtapasSaida` e
  `EtapasFechamento`.
- `out/reset-v2/*.png` — 6 renders (5 antigos sobrescritos + `EtapasProva.png` novo).

---

## Rodada 2 — correções de feedback do fundador (2026-09-05, mesmo dia)

O fundador viu os 5 PNGs da rodada 1 e deu feedback direto (voz): fonte ruim/genérica,
espaço vazio demais no topo dos slides de etapa, fundo sem textura ("poderia ter uma
gradezinha"). 3 correções aplicadas:

### 1. Fonte serifada: Source Serif 4 → **Fraunces** (decisão final)

Testadas 2 candidatas gratuitas via Google Fonts (arquivos `.woff2` baixados direto do
`fonts.gstatic.com`, subset latin, embutidos localmente em `public/fonts/` como as demais):
**Fraunces** (Bold 700 + Italic 700 + Italic 400) e **Newsreader** (Bold 700 + Italic 700 +
Italic 400). Renderizei o mesmo slide (`EtapasEntrada`) com cada uma e comparei lado a lado.

Veredito: **Fraunces**. As duas são boas serifadas, mas a Fraunces tem terminais em bola mais
marcados e contraste de traço mais alto — no peso 700 ela carrega uma excentricidade
old-style/calligráfica que lembra mais a família de Copernicus/Tiempos Headline (a inspiração
real do fundador) do que a Newsreader, que é mais contida e lê mais como "serifada de jornal
americano convencional" — exatamente o efeito que o fundador queria evitar ("fonte ruim,
genérica"). A diferença é sutil em screenshot isolado, mas perceptível: a curva do "g", o "a"
de dois andares e os terminais do "s"/"e" da Fraunces têm mais personalidade editorial.

Arquivos: `public/fonts/Fraunces-700.woff2`, `Fraunces-700-italic.woff2`,
`Fraunces-400-italic.woff2`. `src/lib/fonts.ts` atualizado (`FONT_SERIF = 'Fraunces'`), com os
arquivos da Newsreader comentados no código pra reaproveitamento futuro caso alguma peça
peça deliberadamente um tom mais "jornal americano". Atkinson Hyperlegible mantida sem
alteração pro corpo/sans.

### 2. Vazio superior dos slides de etapa: ícone geométrico > StatusChip (decisão final)

Testei as duas ideias do briefing lado a lado:
- **Candidato A — StatusChip** (`src/lib/StatusChip.tsx`): pílula translúcida + ponto + verbo
  no gerúndio ("Registrando...", "Saindo..."). Aplicado em Entrada e Saída na primeira
  passada.
- **Candidato B — ícone geométrico** (`src/lib/GeometricIcon.tsx`): traço grosso (9px em
  escala 1080px) monocromático, 1-3 formas — caixa com seta entrando (`BoxInIcon`), círculo
  com check (`CheckCircleIcon`), caixa com seta saindo (`BoxOutIcon`). Aplicado em Conferência
  na primeira passada.

Comparação honesta depois de renderizar os dois: o **StatusChip sozinho não resolve o vazio**
— é pequeno (só texto + ponto), ocupa uma fração mínima da área vazia e ainda deixa ~400px de
nada entre ele e o título. O **ícone geométrico comunica melhor**: em 132px ele tem presença
visual real (bate com `design_system.iconography.size_scale` do design-dna.json — "pequeno
48-64px" não seria suficiente aqui, 132px fica na faixa de transição pra "protagonista"), e a
FORMA do ícone já conta a etapa antes mesmo de ler o texto (seta entrando = chegada, círculo
check = validação, seta saindo = despacho) — reforça a leitura em vez de só decorar.

Decisão: **unifiquei as 3 etapas com ícone geométrico** (BoxInIcon → Entrada, CheckCircleIcon →
Conferência, BoxOutIcon → Saída), removi o StatusChip do resultado final. O componente
`StatusChip.tsx` continua no repo (funcional, testado) — é candidato mais forte pra formatos
onde o vazio é menor e só precisa de um toque de marca, não pra resolver 700px de vazio
sozinho.

Espaço ainda não 100% preenchido de propósito — sobra ~350-400px de respiro entre ícone e
título, que é o "respiro generoso" que o design-dna pede, só que agora com uma âncora visual
real no meio, não vazio por omissão.

### 3. Textura de fundo: grade sutil tipo caderno (decisão final)

Componente novo `src/lib/GridTexture.tsx` — SVG com `<pattern>` de linhas finas (1px,
54px de espaçamento, opacidade 7%), cor `neutral.quasePreto` no fundo bege e `#ffffff` no
fundo cor-chapada (`#2eb5c3`), cobrindo o slide inteiro atrás de todo o conteúdo. Aplicado nos
5 slides via novo prop `gridId`/`gridColor` no componente `Slide`.

Isto é uma exceção deliberada à regra `design_style.visual_language.texture_usage` do
design-dna.json ("nenhuma textura decorativa artificial") — o fundador pediu explicitamente
("gradezinha") depois de ver a referência real (Campus Ambassador), pedido direto do fundador
tem prioridade sobre a heurística geral registrada no design-dna.

Avaliação honesta: na versão bege a grade é quase imperceptível a distância normal de scroll
(bom — é textura de fundo, não elemento gráfico) mas dá uma "vida" sutil que a superfície lisa
não tinha. No fundo cor-chapada (`#2eb5c3`) ela fica um pouco mais visível que no bege — ainda
não compete com o texto branco, mas é a mais perceptível das duas superfícies; se algum
revisor achar forte demais, a opção mais segura é baixar a opacidade de 0.07 pra ~0.05
especificamente nos slides de cor sólida (deixei o parâmetro `opacity` no componente pronto
pra esse ajuste fino).

### Arquivos alterados/criados nesta rodada 2

- `src/lib/fonts.ts` — troca de família serifada (Fraunces).
- `public/fonts/Fraunces-700.woff2`, `Fraunces-700-italic.woff2`, `Fraunces-400-italic.woff2`,
  `Newsreader-700.woff2`, `Newsreader-700-italic.woff2`, `Newsreader-400-italic.woff2` (os 3
  últimos ficam como material de comparação/candidato futuro, não usados no `FONT_SERIF`
  atual).
- `src/lib/GeometricIcon.tsx` (novo) — `BoxInIcon`, `CheckCircleIcon`, `BoxOutIcon`.
- `src/lib/StatusChip.tsx` (novo) — testado, não usado no resultado final desta peça.
- `src/lib/GridTexture.tsx` (novo) — grade de fundo sutil.
- `src/templates/EtapasDeEstoque.tsx` — `Slide` ganhou `gridId`/`gridColor`; `EtapaSlide`
  ganhou `topElement` (renderiza o ícone no vazio superior); Entrada/Conferência/Saída
  atualizados.
- `out/reset-v2/*.png` — os 5 renders sobrescritos com o resultado desta rodada.

---

## Rodada 1: "Como um estoque organizado se move" (NTB Estoque)

Carrossel de 5 slides, 1080x1350, tema NTB Estoque (`#2eb5c3`), conteúdo puramente
educacional (`voice.md`), sem CTA de pressão.

### Redirecionamento do fundador durante esta rodada (importante para próximas peças)

O briefing original pedia "3 sinais de que seu controle de estoque está furado" — tom de
alerta/dor, linha conectora se ramificando entre 3 problemas paralelos. O fundador ouviu a
ideia e rejeitou o tom (transcrição de voz): ele quer algo "bonito, que eu me sinta confortável
de ver no perfil" — prazer visual e calma, não alarme. Pediu um fluxo SEQUENCIAL mostrando como
um estoque bem-feito se move, inspirado no tom contemplativo das capas cor-chapada do
"Anthropic Insights" e no documental sem-tensão de "The gardeners rewilding Melbourne" (ver
`docs/referencias-visuais/claude-instagram/exemplos-formatos-2026-09-04.md`).

**Lição para o catálogo**: "linha conectora atravessando slides" é um padrão estrutural
reutilizável, mas o que ela REPRESENTA (ramificação de problemas vs. fluxo sequencial de
etapas) é uma decisão de conteúdo/tom que precisa ser validada com o fundador antes de escrever
qualquer copy — o componente `ConnectorLine` já suporta os dois casos de uso (`mode: 'start' |
'through' | 'end'`, com `nodePosition` livre), então a próxima vez isso é 1 parâmetro de dado,
não retrabalho de código.

### Estrutura final

1. **Capa** (`EtapasCapa`) — fundo bege `#f7f4ee`, overline "NTB Estoque", título serifado
   grande "Como um estoque organizado se move", `ConnectorLine mode="start"` nascendo do canto
   inferior esquerdo e saindo cortada pela borda direita.
2. **Etapa 1 — Entrada** (`EtapasEntrada`) — fundo chapado `#2eb5c3`, texto branco, afirmação
   direta sobre registro de entrada. `ConnectorLine mode="through"`, nó em 22% da largura.
3. **Etapa 2 — Conferência** (`EtapasConferencia`) — fundo bege, texto preto, nó em 50%.
4. **Etapa 3 — Saída** (`EtapasSaida`) — fundo chapado de novo (alternância bege/cor, como no
   carrossel "Anthropic Insights" real), nó em 78%.
5. **Fechamento** (`EtapasFechamento`) — fundo bege, mascote foguete estático centralizado,
   frase institucional curta em itálico serifado, CTA leve ("saiba mais no link da bio").

### Componentes de base (reutilizáveis em qualquer formato futuro)

- `src/lib/fonts.ts` — Source Serif 4 + Atkinson Hyperlegible, embutidas via FontFace API +
  delayRender/continueRender (mesmo padrão já validado no v1, arquivos já existiam em
  `public/fonts/`, não foi preciso baixar de novo).
- `src/lib/themes.ts` — cores do `docs/design-dna.json` (marca, NTB Estoque/Vendas/Avalia,
  neutros, semantic, cores reais do foguete).
- `src/lib/Mascote.tsx` — o foguete real do site, **extraído 1:1** (não aproximado) do bundle
  JS de produção (`norteparanegocios.com.br/assets/index-_J3OtIOT.js`, componente `Yw`,
  viewBox "0 0 494 573"). Ver método de extração abaixo.
- `src/lib/ConnectorLine.tsx` — linha conectora com 3 modos (`start`/`through`/`end`), curva
  senoidal amostrada e suavizada via `Q` (curvas quadráticas entre pontos médios) — escolhida
  depois que a primeira tentativa (comandos `C ... S ...` manuais) criou um nó torto/embolado
  exatamente no ponto de emenda das duas curvas (tangentes não coincidiam). A abordagem por
  amostragem de senoide é geometricamente incapaz de formar laço, porque x é sempre monotônico.

### Extração do mascote — método e resultado

1. `curl -sL https://norteparanegocios.com.br | grep -oE 'assets/index-[^"]+\.js'` → achou o
   hash do bundle atual (`index-_J3OtIOT.js`).
2. `curl -sL` do bundle completo (542KB), busca por `rocketTextureMask` (2 ocorrências: a
   definição da máscara de luminância e o uso em `mask="url(#rocketTextureMask)"`).
3. Leitura do trecho ao redor (~9KB de contexto antes/depois) até identificar o início
   (`const Yw = () => r.jsxs("svg", {viewBox: "0 0 494 573", ...`) e o fim (fechamento do
   array de `children` do componente) do SVG completo.
4. Conversão de cada `r.jsx("path", {d: "...", fill: "..."})` pra JSX/TSX puro, preservando
   ordem de composição (importante: order = z-index no SVG — a chama vem primeiro, desenhada
   por baixo do corpo; as aletas e o bocal vêm por último, por cima).
5. Resultado: **extração completa**, 20 elementos (`path`/`mask`/`g`) — corpo cream `#FAF6FB`
   com textura granulada real (máscara de luminância + ~60 pontos aleatórios em `#ACACAC`),
   nariz vermelho `#EA2840`, base em 2 tons de bordô (`#831F23`/`#B62835`), aletas
   laranja→vermelho (chama) e vermelho/bordô sólido (aletas físicas), janela em anéis
   concêntricos azul-escuro→ciano→teal→azul-claro→branco, bocal traseiro vermelho com núcleo
   claro. **Não foi necessário aproximar** — o SVG renderizado é bit-a-bit o desenho do site.

### QA visual — avaliação honesta desta rodada

Renderizado em `out/reset-v2/` (`EtapasCapa.png`, `EtapasEntrada.png`, `EtapasConferencia.png`,
`EtapasSaida.png`, `EtapasFechamento.png`).

**O que está bom:**
- Mascote: fiel ao site, textura granulada visível mesmo em 200px, cores exatas. É o único
  elemento "ilustrado" da peça e evita completamente o erro do v1 (sketch trêmulo) — é um
  vetor limpo, geométrico na composição, orgânico só na textura (como pedido).
- Linha conectora: depois do fix, curva suave e contínua, nó bem posicionado, cortada nas
  bordas como no exemplo real do Campus Ambassador.
- Contraste tipográfico alto (branco sobre `#2eb5c3`, preto sobre bege) — bate com
  `design-dna.json > contrast_strategy`.
- Alternância bege/cor chapada entre slides de etapa dá variação sem quebrar unidade (cor do
  tema + linha + tipografia seguram a identidade).

**Gaps reais (não estou satisfeito 100%, registro pra próxima rodada):**
1. **Vazio demais no terço superior de cada slide.** Os 4 primeiros slides têm ~700px de
   espaço vazio acima do título antes de qualquer conteúdo aparecer. O `design-dna.json` pede
   "espaçoso, respiro generoso" mas os exemplos reais do @claudeai preenchem esse espaço com
   ALGO — um ícone-objeto pequeno, um gráfico, uma foto, um chip de status. Aqui ficou vazio
   por falta de um elemento secundário, não por decisão deliberada de composição. Isso é o
   maior gap: a peça está "limpa" mas não "rica em variação de layout" como o carrossel de
   referência pede (4 layouts diferentes dentro do mesmo carrossel — aqui os 4 primeiros
   slides usam essencialmente o mesmo layout, só a cor de fundo alterna).
2. **Falta o StatusChip** (pílula + verbo no gerúndio) que o relatório do fundador descreve
   como "elemento de marca barato e consistente" e recorrente em quase todo formato. Não
   implementado nesta rodada — é candidato natural pra preencher o vazio do item 1.
3. **Nenhuma foto real, gráfico de dado ou diagrama geométrico** nesta rodada — o
   `relatorio-completo-fundador.md` deixa claro que o "Layout 1 (poster de dado)" e "Layout 3
   (colagem)" existem ao lado do "Layout 4 (capa cor chapada)" que usei repetidamente aqui.
   Escolhi deliberadamente o layout mais simples pra validar mascote + linha primeiro; a
   próxima rodada não deve repetir só esse layout.
4. **Etapa numerada como overline pequeno** ("Etapa 1 · Entrada") é o único wayfinding —
   funcional mas fraco como elemento gráfico. O exemplo real usa post-its rotacionados,
   ícones-objeto ou chips pra marcar progressão; aqui é só texto.
5. **Mascote aparece só no fechamento.** Os exemplos reais (Claude bot pixelado) aparecem
   "franqueados" em vários posts do mesmo carrossel, não só no último slide — é isso que cria
   recorrência de marca. Vale considerar o mascote (pequeno, canto) nos slides de etapa também.

### O que falta pra escalar (próximas rodadas)

- **Formato vídeo do mascote**: `Mascote.tsx` já aceita `animate` (flutuação leve via
  `interpolate`), mas não foi testado dentro de uma `<Composition>` real nesta rodada —
  só `<Still>`. Fase seguinte natural.
- **StatusChip** como componente novo em `src/lib/`, reutilizável em qualquer template.
- **Mais formatos** dos 4 layouts do relatório (especialmente poster de dado com gráfico real
  e colagem scrapbook) — hoje só "capa cor chapada" está coberto.
- **Prova social com fotos reais** (citação + foto de perfil + cargo) — precisa de material do
  marketing/fundador (cliente real), não pode ser fabricado.
- **Preencher o vazio superior dos slides de etapa** com StatusChip, ícone-objeto de traço
  grosso (não sketch) ou pequeno diagrama — decisão de design pra próxima iteração, não bug.

### Arquivos desta rodada

- `src/lib/fonts.ts`, `src/lib/themes.ts`, `src/lib/Mascote.tsx`, `src/lib/ConnectorLine.tsx`
- `src/templates/EtapasDeEstoque.tsx` (5 exports: `EtapasCapa`, `EtapasEntrada`,
  `EtapasConferencia`, `EtapasSaida`, `EtapasFechamento`)
- `src/Root.tsx`, `src/index.ts`
- `out/reset-v2/*.png` (5 renders)

## Rodada 8 — bug real: "os posts não estão se conectando" (halo de contraste destruía a
identidade de cor da trilha) (2026-09-05)

O fundador reportou, olhando o carrossel de Rotas renderizado: "OS POSTS NÃO ESTÃO SE
CONECTANDO". A geometria (posição X de cada trilha) já era idêntica entre slides — não era
esse o problema. O problema era de CONTINUIDADE VISUAL de cor.

### O bug

Em `TrackRail.tsx`, quando a trilha ativa (`isActive`) caía num slide cujo fundo era a MESMA
cor da trilha (os 3 slides "dono" — Restaurante/teal, Loja de Roupa/rosa, Distribuidora/
índigo), o componente aplicava um "halo de contraste" pra linha não sumir contra o próprio
fundo: um traço bege (`#f7f4ee`) de `strokeWidth+9` (21px) atrás da linha real, mais um friso
branco fino por cima. Só que esse halo era MAIOR que a própria linha e de cor totalmente
diferente (neutra, fora da paleta da trilha) — na prática ele dominava visualmente, e a
trilha "ativa" parava de ler como teal/rosa/índigo, virando uma "trilha branca genérica com
dormentes". Comparando a Capa (linha fina, discreta, na cor real) com o slide dono
(linha branca grossa com ticks), não parecia a MESMA linha continuando — parecia um objeto
gráfico diferente. Isso quebrava a sensação de "conectado" que é o ponto inteiro do formato
Rotas.

### Tentativa intermediária que também falhou (registrando pra não repetir)

Primeira correção tentada: manter o halo mas trocar a cor bege/branca por uma versão mais
escura da PRÓPRIA cor da trilha, desenhando halo largo atrás + o traço real (opacidade 1, cor
igual ao fundo) por cima. Resultado no PNG renderizado (conferido pixel a pixel): como o traço
central tem exatamente a cor do fundo, ele fica invisível, e sobra só a borda do halo visível
dos dois lados — ou seja, duas linhas finas "ocas" em vez de uma linha sólida. Pior que o bug
original em legibilidade, mesmo mantendo o matiz certo.

### Correção final

Eliminado o halo por completo. Quando a trilha ativa é da mesma cor do fundo, ela agora é
desenhada como um ÚNICO traço sólido, na MESMA cor da trilha só que ~38% mais escura
(`darken(track.color, 0.38)`, helper novo em `TrackRail.tsx`) — sem segunda camada, sem cor
neutra. O resultado: um traço grosso e sólido, obviamente "da família" da cor fina que vinha
da Capa, só em destaque (mais escuro/mais grosso porque é o slide dono). Também foram
removidos os "dormentes" (ticks perpendiculares) nesses casos — eles reforçavam a sensação de
"objeto novo" em vez de "linha em destaque"; ticks continuam existindo só pra trilha ativa
quando NÃO precisa de halo (fundo neutro, caso hoje não usado no carrossel de Rotas).

**Regra permanente pro componente `TrackRail` (e qualquer halo de contraste futuro)**: o halo
de contraste NUNCA pode mudar a identidade de cor da linha, nem visualmente dominar sobre a
cor real por ser mais largo/mais opaco que o traço principal. Se contraste for necessário
contra um fundo da mesma cor, resolva DENTRO da própria família de cor (mais escuro/mais
saturado), como traço único — nunca com uma segunda cor neutra (bege, branco) sobreposta, e
nunca com halo maior que o traço real cobrindo o centro do traço com uma cor que desaparece
no fundo (produz o artefato de "linha oca").

### Verificação feita (empilhamento de bordas)

Renderizados os 5 PNGs (`out/reset-v2/*.png`) e empilhada a borda inferior de cada slide
contra a borda superior do próximo (Capa→Restaurante, Restaurante→Loja de Roupa, Loja de
Roupa→Distribuidora) num composite vertical, conferido pixel a pixel na trilha ativa. Nas 3
costuras a trilha ativa aparece como continuação óbvia da linha fina de cima — mesma cor
reconhecível (teal/rosa/índigo), só mais grossa/escura — sem salto de identidade visual.
Trilhas não-ativas (dimmed) também continuam visíveis e na cor certa atravessando a costura.

### Arquivos desta rodada

- `src/lib/TrackRail.tsx` (halo de contraste reescrito, helper `darken` novo)
- `out/reset-v2/Rotas*.png` (5 re-renders)

## Rodada 18 — 8 formatos novos em paralelo (overnight, 2026-09-06)

Pedido do fundador antes de dormir: "quero mais de 10 tipos de posts... 3 verificações, só
aceitar quando estiver perfeito". Plano executado (classificado como bounded via
`superpowers:dispatching-parallel-agents`): 8 agentes independentes, cada um construindo 1
formato novo em arquivo próprio, proibidos de tocar em `Root.tsx`/`CATALOGO.md`/`.claude/skills/`
pra evitar conflito — coordenador integrou tudo centralmente no final.

**8 formatos entregues** (detalhe completo de cada um em `out/formatos-novos/<nome>/RELATORIO.md`):
1. **Prova** (`Prova.tsx`) — screenshot real do NTB Estoque/Vendas em `BrowserFrame`/`PhoneFrame`
   novo. Bug real corrigido: `Mascote` centralizado por `AbsoluteFill` interno colidia com layout
   flex do slide de fechamento.
2. **Painel** (`Painel.tsx`) — gráficos SVG puro (barra, comparativo, linha, estatística), dado
   sempre rotulado "estimativa ilustrativa". Bug real: rótulos de eixo cortados na borda, gráficos
   ocupando só ~50% da altura (vazio morto) — corrigido escalando.
3. **Pergunta** (`Pergunta.tsx`, componente parametrizado `PerguntaFormato`) — 6 perguntas,
   6 cores de marca. Bug real de ACESSIBILIDADE achado por medição de contraste WCAG (não só
   olho): texto claro sobre teal/laranja ficava abaixo de 3:1 — corrigido com tinta adaptativa
   por luminância do fundo.
4. **Novidade** (`Novidade.tsx`) — anúncio de funcionalidade (ilustrativo: "alerta de validade
   automático"), screenshot real de `validade-desktop.png`. Bugs reais: vazio de composição,
   CTA de fechamento sem affordance — corrigidos.
5. **Resumo** (`Resumo.tsx` + `src/lib/StatusChipV2.tsx` novo) — recap dos 3 produtos em chips
   soltos/rotacionados (não grid). Bug real: vazio de ~280-300px entre ícone e texto nos slides
   de produto — corrigido aproximando os blocos.
6. **Frase** (`Frase.tsx`) — 6 mantras filosóficos, nunca sobre produto. Autocrítica própria do
   agente: 3 frases usavam o mesmo molde "X não é sobre Y. É Z" — reescreveu 2 pra variar
   estrutura.
7. **Parceria** (`Parceria.tsx`) — história de cliente em 1ª pessoa, CONTEÚDO ILUSTRATIVO
   marcado claramente, assinatura só por tipo de negócio (nunca nome fictício). 3 bugs reais:
   mascote colidindo com texto (mesmo bug do Prova, mesma causa raiz em `MascoteAssinatura`),
   kicker ilegível sobre foto clara, vazio desbalanceado em 2 slides.
8. **Bastidores-Animado** (`BastidoresAnimado.tsx`, vídeo 4s/120 frames) — mascote flutuando,
   resto 100% estático. Bug real e IMPORTANTE (corrigido na raiz, em `src/lib/Mascote.tsx`
   compartilhado, afeta todo formato que usa `animate`): easing linear com reversão brusca no
   pico lia como "solavanco robótico" — trocado por onda cosseno contínua.

**2 incidentes operacionais reais desta rodada** (documentados com mais detalhe em
`.claude/skills/rafael/references/catalogo-formatos.md`):
1. Um comando de algum agente apagou `out/reset-v2/` inteiro (70 arquivos) no meio da rodada —
   recuperado renderizando de novo a partir do código-fonte (intacto). Nenhum dado/decisão foi
   perdido, só tempo.
2. Vários agentes pausaram o próprio turno "esperando um monitor avisar" que o render em
   background tinha terminado — mecanismo que não existe pra eles. O coordenador teve que
   verificar manualmente se os arquivos existiam e, em alguns casos, terminar a renderização/
   verificação que ficou pendente (ex: `Parceria` faltava 2 dos 6 slides).

**Integração central** (pelo coordenador, não pelos agentes): os 8 formatos foram registrados
em `src/Root.tsx` (imports + `<Still>`/`<Composition>`), `npx tsc --noEmit` limpo, 1 render de
integração confirmado (`ProvaCapa` via pipeline principal). Catálogo consolidado em
`.claude/skills/rafael/references/catalogo-formatos.md`.

**Total do catálogo agora**: 10 formatos, 22 peças/carrosséis completos + 1 vídeo, todos com
pelo menos 1 exemplo verificado (3 passes: leitura visual real, crítica formal quando
disponível, comparação com referência real).

## Rodada 19 — Reversão total da Rodada 18 (2026-09-06, manhã)

O fundador rejeitou o lote inteiro dos 8 formatos novos: "esses todos estão genéricos, você
não fez as variações de carrosséis, apague eles todos". Removido por completo: os 8 templates
(`Prova.tsx`, `Painel.tsx`, `Pergunta.tsx`, `Novidade.tsx`, `Resumo.tsx`, `Frase.tsx`,
`Parceria.tsx`, `BastidoresAnimado.tsx`), `src/lib/StatusChipV2.tsx`, todos os renders em
`out/formatos-novos/`, os registros em `src/Root.tsx`, e a documentação em
`.claude/skills/rafael/references/catalogo-formatos.md`. `npx tsc --noEmit` confirmado limpo
depois da remoção. Catálogo ativo voltou a ser só Rotas + Vozes.

**Causa raiz do erro**: cada formato novo foi validado com só 1 exemplo (1 carrossel), quando
o pedido original era "10 carrosséis de no mínimo 6 cards cada, em cada tipo". Um único
exemplo, por mais bem executado tecnicamente (com 3 verificações reais, bugs corrigidos), não
é suficiente pra o fundador avaliar se um formato tem repertório real ou é uma ideia genérica
de post único. Lição: antes de escalar pra "10 tipos novos", validar 1 formato de cada vez com
MÚLTIPLAS variações de conteúdo (como foi feito corretamente com Rotas, que só ganhou
aprovação depois de várias peças de produtos/temas diferentes).

## Rodada 20 — "O Omie organiza a gestão. E quem organiza a operação?" (briefing marketing, 2026-09-08)

Peça nova de Rotas a partir de um briefing pronto do sócio de marketing do fundador (posiciona
a NTB como complemento operacional do Omie, não concorrente — objetivo: atrair quem já usa
Omie e sente a lacuna operacional). Copy do briefing repassada fielmente, só formatada em
headline/body por slide (padrão já usado em toda peça de Rotas — o brief nunca vem em frase
pronta por slide, vem em bullets de tema). Nenhum dado/estatística usado (o briefing não tinha
nenhum pra usar).

**2 trilhas** (arquivo `RotasOmieNtb.tsx`):
- **Omie/Gestão** — cor NEUTRA institucional nova, `#56636f` (cinza-azulado), NÃO o roxo da
  marca (`brand.primary`, reservado pra Norte institucional) e NÃO cor de produto NTB —
  decisão explícita porque Omie é parceiro/rótulo externo citado no post, não produto da Norte,
  então não pode herdar identidade visual de produto nem de marca própria.
- **NTB/Operação** — `productColors.vendas` (#f8a41a). Decisão: "pedidos, mesas, cozinha,
  comandas, atendimento" é vocabulário de PDV/restaurante — perfil temático do NTB Vendas, não
  do Estoque.

**6 slides** (mínimo pedido pelo fundador pra carrossel novo): Capa, 2 slides de trilha Omie
(o que ele cobre bem / o que fica de fora — mapeando os 2 primeiros bullets do briefing),
2 slides de trilha NTB (o que ela cobre / como complementa o Omie — bullets 3-5), Fechamento
(convergência + CTA, bullets 6-7 no mesmo slide, seguindo o padrão já usado em toda peça —
`RotasFechamentoShell` combina headline de convergência com `cta` opcional).

**Composição bespoke**:
1. Capa com os 2 post-its em ZONAS SEPARADAS (canto superior-esquerdo Omie / canto
   inferior-direito NTB, sem sobreposição e com espaço vazio entre eles) — não repete a
   sobreposição de `RotasVendas.tsx` nem a diagonal de `RotasVendasCaixa.tsx`. Metáfora visual
   literal do conteúdo: 2 sistemas/territórios distintos que só se encontram no Fechamento.
2. Cotovelo em ÂNGULO RETO (`elbowStyle="right-angle"`) — tom "sistemático"/integração de
   software cabe no tema (2 sistemas se encaixando), diferente da curva orgânica que as outras
   2 peças de tema Vendas já usam.
3. `OmieNtbLimite` (2º slide Omie, "mas a operação fica de fora") usa a variação "afirmação
   direta" sem ícone (bloco de texto full-width) — já documentada no formato, ainda pouco usada.
4. `OmieNtbComplementa` (2º slide NTB) usa `contentLayout="side-by-side"`.

**Bug real achado e corrigido no QA visual** (não só olhando o código compilar): a 1ª versão de
`OmieNtbComplementa` tinha headline longo ("A NTB entra pra complementar o Omie, não pra
competir com ele.") dentro de `contentLayout="side-by-side"` com ícone presente — a coluna de
headline nesse layout é só ~330px de largura (1080 - padding 128 - coluna de ícone 264 - gap 28,
dividido por 2), então o headline quebrou em 5 linhas, deixando o card MUITO mais alto e mais
baixo que o card de body ao lado — desbalanceado, ficava abaixo do padrão de acabamento do
formato mesmo sem colidir literalmente com outro elemento. Corrigido encurtando o headline pra
"A NTB complementa o Omie." (quase cópia literal do bullet original do briefing: "A NTB
complementa o Omie com ferramentas operacionais") e movendo o detalhe pro body, que tem coluna
igual mas fonte menor (18px vs. 34px) — cabe bem mais texto sem desbalancear. **Lição pro
formato**: `contentLayout="side-by-side"` com ícone presente tem MUITO menos largura de coluna
do que o padrão empilhado — headline nesse modo precisa ser bem mais curto (≤30 caracteres é
seguro) do que num slide `stacked`, senão o card de headline cresce desproporcional ao de body.

**Verificação feita**: `npx tsc --noEmit -p .` limpo, 6/6 slides renderizados, e lidos
visualmente (não só compilados) — Capa, 1 slide de cada trilha (Gestão/Operação), e o
Fechamento — confirmando: cor de cada trilha idêntica entre Capa/slide própria/Fechamento
(cinza-azulado e laranja, sem halo/mudança), mascote apontando pra direita (sentido do fluxo,
igual a todas as outras peças), nenhum texto fora do briefing original, e a correção do bug de
desbalanceamento acima.

### Arquivos desta rodada

- `src/templates/RotasOmieNtb.tsx` (6 exports: `OmieNtbCapa`, `OmieNtbGestao`, `OmieNtbLimite`,
  `OmieNtbOperacao`, `OmieNtbComplementa`, `OmieNtbFechamento`)
- `src/Root.tsx` (6 `<Still>` novos registrados, só adição — nada mais tocado)
- `out/reset-v2/OmieNtb*.png` (6 renders)

## Rodada 21 — correção: Omie x NTB NÃO é Rotas, é um formato novo (2026-09-08, mesmo dia)

O fundador rejeitou a Rodada 20 inteira, direto: **"não era pra fazer um do Rotas, é um novo,
é um novo tipo"**. Releitura literal do briefing do sócio de marketing confirma: a estrutura
pedida (Omie é importante pra gestão → mas a operação fica de fora → pedidos/mesas/cozinha/
comandas/atendimento pedem outro fluxo → é aí que entram as soluções da NTB → a NTB complementa
o Omie → gestão e operação funcionando juntas → CTA) é uma SEQUÊNCIA ARGUMENTATIVA (contexto →
limite → necessidade → solução → síntese → CTA), não 2 caminhos paralelos que precisam convergir
fisicamente. Forçar isso em `TrackRail`/`RotasKit` (trilha, cotovelo, convergência no Mascote)
foi aplicar o MECANISMO de um formato ao conteúdo errado — o briefing nunca pediu "2 rotas", só
tinha 2 protagonistas (Omie, NTB) citados de leve.

### Ação tomada

1. **Removido por completo** o resultado da Rodada 20: `src/templates/RotasOmieNtb.tsx`
   (arquivo apagado), os 6 `<Still>` (`OmieNtbCapa/Gestao/Limite/Operacao/Complementa/
   Fechamento`) e os imports correspondentes em `src/Root.tsx`, os 6 PNGs em
   `out/reset-v2/OmieNtb*.png`, e as cópias que já tinham sido levadas pra
   `~/Downloads/` e `~/Projects/norte para negocios/posts/OmieNtb/` (pasta apagada). `npx tsc
   --noEmit` confirmado limpo depois da remoção, antes de começar o formato novo.
2. **Formato novo construído**: `src/templates/ArgumentoOmieNtb.tsx` — batizado "Argumento" (1º
   uso desse nome no catálogo). Deliberadamente SEM nada de `TrackRail.tsx`/`RotasKit.tsx` —
   nenhuma trilha, cotovelo, post-it de papel rasgado, textura de grade ou convergência de
   Mascote. Mecanismo próprio:
   - Cada slide é um BLOCO DE COR CHEIA (fundo do frame inteiro), não um card sobre fundo bege
     fixo — a cor muda conforme QUEM está "falando" naquele slide (bege = contexto/transição
     neutra, cinza-azulado = Omie, laranja = NTB, gradiente cinza→laranja = síntese final), mas
     é o fundo daquele bloco específico, não uma trilha atravessando o carrossel inteiro.
   - 1 afirmação grande (Fraunces bold, tratamento único repetido em todo slide, mesma lógica
     estrutural do `QuoteText`/`LabelText` de `Retrato.tsx`) carrega o argumento sozinha — sem
     ilustração/ícone decorativo, sem diagrama.
   - Tag pill pequena ("Omie" ou "NTB") identifica de quem é a fala, sem desenhar os 2 produtos
     como sistema físico conectado por linha.
   - Fonte: `FONT_SERIF`/Fraunces (par tipográfico GLOBAL da marca, `fonts.ts`) — não
     `FONT_SERIF_ROTAS`/Newsreader, que é fonte PRÓPRIA do formato Rotas (documentado assim no
     próprio `fonts.ts`). Usar a fonte certa por formato, não a do formato errado que acabou de
     ser descartado.
3. **Cores mantidas da decisão anterior** (só o MECANISMO mudou, não a decisão de cor): Omie
   continua `#56636f` (cinza-azulado institucional — parceiro/rótulo externo, não produto Norte,
   não herda roxo da marca nem cor de produto NTB); NTB continua `productColors.vendas`
   (`#f8a41a`) — vocabulário "pedido, mesa, cozinha, comanda, atendimento" é temático de PDV/
   restaurante (NTB Vendas), não Estoque.
4. **6 slides**, mapeando os 7 bullets do briefing (o 4º e 5º bullets — "pedidos/mesas/etc
   precisam de outro fluxo" + "é aí que entram as soluções da NTB" — cabem juntos num slide só,
   headline+body, sem forçar 1 bullet = 1 slide onde o conteúdo já é uma frase de transição
   curta): `ArgumentoCapa` (pergunta-tema, os 2 rótulos aparecem PERTO um do outro pela 1ª vez,
   soltos, sem linha), `ArgumentoGestao` (Omie, bloco cheio), `ArgumentoLimite` (volta pro bege —
   sinal visual de que o assunto muda), `ArgumentoOperacao` (NTB, bloco cheio, 2 bullets no mesmo
   slide), `ArgumentoComplementa` (split literal do frame: bloco Omie + bloco NTB lado a lado,
   1ª vez que os 2 aparecem como blocos cheios juntos — representa "complementa", não "compete"),
   `ArgumentoFechamento` (gradiente de síntese + CTA + Mascote PEQUENO como assinatura, size 64,
   mesmo padrão do fechamento de `VozesGrade.tsx` — não é convergência de trilha, é assinatura de
   marca).

### Pesquisa de referência (pedida pelo coordenador antes de desenhar)

Busca no repo (`grep -rli "conta azul\|bling"`) não achou pesquisa salva sobre essas 2 contas
especificamente — não existe registro prévio no catálogo. A composição seguiu o padrão já
validado e documentado no próprio projeto pro tipo "afirmação/comparação direta" (blocos de cor
cheia, 1 afirmação grande por slide, tratamento tipográfico único repetido, tag/rótulo pequeno de
contexto) — mesmo princípio estrutural do formato Vozes, sem repetir seu mecanismo de foto real
(este conteúdo é posicionamento de produto, não teria fotos reais legítimas pra usar sem
fabricar). Pesquisa de Conta Azul/Bling especificamente fica como gap pra próxima vez que o
fundador pedir esse tipo de referência explicitamente.

### Bug real achado e corrigido nesta rodada

1ª versão dos 4 slides de bloco cheio (`Gestao`, `Limite`, `Operacao`, `Complementa`) tinha o
conteúdo centralizado verticalmente mas MUITO curto pro frame de 1350px — sobrava quase metade
do slide vazia embaixo, mesmo problema de "vazio demais" já documentado em várias rodadas
anteriores do Rotas. Como este formato não tem ícone gigante de marca-d'água (esse é vocabulário
do Rotas, evitado de propósito pra não ler como "Rotas sem a linha"), a solução foi um elemento
PRÓPRIO deste formato: `StepMark`, um numeral de sequência gigante (420px, opacity 0.1) no canto
inferior-direito — reforça literalmente a lógica "isso é um argumento passo a passo" (01 Omie,
02 limite, 03 NTB, 04 complementa) e resolve o vazio ao mesmo tempo, sem inventar um mecanismo
de trilha disfarçado.

### Verificação feita

`npx tsc --noEmit -p .` limpo depois da remoção do Rotas antigo E depois da construção do
formato novo (2 checagens). 6/6 slides renderizados e lidos visualmente (Read tool, não só
compilados) — confirmado: nenhum trilho/rail/cotovelo em nenhum slide, cor de Omie e NTB idêntica
em todo slide onde aparecem (sem variação acidental), texto fiel ao briefing original (nenhuma
frase inventada além de formatação em headline/body), Mascote presente só como assinatura pequena
no Fechamento (não como convergência), StepMark preenchendo o vazio sem colidir com texto em
nenhum dos 4 slides que o usam.

### Arquivos desta rodada

- `src/templates/ArgumentoOmieNtb.tsx` (NOVO formato "Argumento", 6 exports: `ArgumentoCapa`,
  `ArgumentoGestao`, `ArgumentoLimite`, `ArgumentoOperacao`, `ArgumentoComplementa`,
  `ArgumentoFechamento`)
- `src/Root.tsx` (removidos os 6 `<Still>`/imports de `RotasOmieNtb`, adicionados os 6 novos de
  `ArgumentoOmieNtb`)
- `src/templates/RotasOmieNtb.tsx` — REMOVIDO (era a tentativa errada da Rodada 20)
- `out/reset-v2/ArgumentoOmieNtb*.png` (6 renders) — `out/reset-v2/OmieNtb*.png` (Rotas antigo)
  removidos

## Rodada 22 — correção: deriva de identidade visual no formato "Argumento" (2026-09-08, mesmo dia)

O fundador rejeitou a Rodada 21 inteira — mas por um motivo DIFERENTE do da Rodada 20. Dessa vez
a ESTRUTURA (sequência argumentativa sem trilho) estava certa e ele não reclamou dela. O problema
era 100% visual: **"não tem nada a ver com a cara da Norte Para Negócios"**. E ele tinha razão.

### Causa raiz (autocrítica, pra não repetir)

Ao "libertar" o formato do mecanismo de `TrackRail`/`RotasKit` (correção pedida e correta da
Rodada 21), o agente também — sem que ninguém tivesse pedido isso — trocou a PELE visual inteira:
fundo bege virou blocos de cor cheia (`OMIE_COLOR`/`NTB_COLOR`) cobrindo o slide inteiro, e a
fonte serifada virou Fraunces em vez de Newsreader. Nenhuma dessas 2 trocas tinha relação com o
motivo real da correção da Rodada 20 (que era só sobre trilha/rail/convergência física, não sobre
paleta ou tipografia). O erro foi generalizar "não usar o mecanismo de Rotas" pra "não usar NADA
de Rotas, inventar um sistema visual do zero" — quebrando 20+ rodadas de trabalho já aprovado
(fundo bege dominante, Newsreader+Atkinson, cor como detalhe nunca como bloco) sem que o fundador
tivesse pedido isso em nenhum momento.

**Lição permanente**: mecanismo (trilha/rail/cotovelo/convergência) e pele visual (paleta,
tipografia, tratamento de fundo) são decisões INDEPENDENTES. Corrigir uma nunca é licença pra
reabrir a outra sem pedido explícito — sobretudo pele visual, que é a coisa mais cara/mais
validada em rodadas de todo o catálogo (referenced em quase toda entrada deste arquivo).

### Pele visual correta (confirmada nesta sessão, revalidada olhando os renders reais)

- Fundo BEGE (`neutral.begeClaro`) em TODO slide, inclusive o Fechamento — o padrão real de
  `RotasFechamentoShell` (`Rotas.tsx`, `RotasVendas.tsx` etc.) também é bege com um halo suave
  atrás do Mascote, nunca gradiente/bloco de cor cobrindo o frame.
- `GridTexture` sutil atrás do conteúdo — reutilizado diretamente (é um componente de textura de
  fundo genérico, não faz parte do mecanismo de trilha, então reaproveitar não contradiz a
  correção da Rodada 21).
- Tipografia: Newsreader (`FONT_SERIF_ROTAS`) + Atkinson Hyperlegible. Fraunces (`FONT_SERIF`)
  REMOVIDO desta peça — nunca foi usado em nenhuma peça aprovada do catálogo ativo.
- Cor de produto entra só como DETALHE: tag/rótulo pequeno, overline colorido, borda esquerda de
  card, linha fina de acento (`AccentRule`, elemento LOCAL a cada slide, sem posição/altura
  compartilhada entre slides — não é uma trilha, é um traço decorativo). Nunca mais como fundo do
  slide inteiro.

### O que foi mantido (mecanismo, correto desde a Rodada 21, não mexido)

Sequência argumentativa sem trilho/rail/cotovelo/convergência física; numeral gigante translúcido
(01-04) como âncora visual — só recolorido pra tinta (`neutral.quasePreto`) em opacidade baixa
(0.055) sobre bege, em vez de branco/tinta sobre bloco de cor (mesma faixa de opacidade do ícone
gigante de marca-d'água já usado em `TrackSlide`/Rotas, 0.05-0.08 — validado como correto,
só a cor de fundo por trás dele que mudou); o mesmo tratamento de glifo gigante virou "?" na Capa
(mantido) — o "+" do Fechamento foi REMOVIDO nesta rodada, substituído pelo halo suave atrás do
Mascote (padrão real de `RotasFechamentoShell`), que já resolve a ancoragem vertical sem inventar
um glifo nunca visto em nenhuma peça aprovada; layout lado-a-lado do slide "Complementa" mantido,
mas os 2 blocos de cor cheia viraram bege + 2 colunas com cards de papel (`PaperCard`, borda
esquerda colorida — mesmo princípio do `TornBlock` de Rotas) separadas por um fio neutro fino, em
vez de metade do frame cada cor.

### Verificação feita

`npx tsc --noEmit -p .` limpo. PNGs antigos da Rodada 21 apagados de `out/reset-v2/`,
`~/Downloads/` e `~/Projects/norte para negocios/posts/Argumento/` (pasta removida) ANTES de
gerar os novos, pra não misturar versões. 6/6 slides re-renderizados e lidos visualmente (Read
tool) — confirmado: fundo bege + grade em todo slide, Newsreader/Atkinson (não Fraunces), cor só
em tag/overline/borda/linha fina/halo (nunca bloco cobrindo o slide), numerais 01-04 e "?"
legíveis mas discretos sobre bege, Fechamento com Mascote grande (150px) + halo suave + headline
com ênfase itálica, igual ao padrão real de `RotasFechamentoShell`.

### Arquivos desta rodada

- `src/templates/ArgumentoOmieNtb.tsx` (reescrito do zero — mesmos 6 exports, pele visual nova)
- `out/reset-v2/Argumento*.png` (6 re-renders, substituindo os da Rodada 21)
- `src/Root.tsx` — não precisou mudar (mesmos 6 nomes de export/Still já registrados na Rodada 21)
