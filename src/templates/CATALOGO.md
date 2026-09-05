# Catálogo de templates e variações — 8 tipos de post

## Estilo Claude — 3ª tentativa, preset novo `editorialClaude` (2026-09-05)

As 2 tentativas anteriores (ver "Round H" mais abaixo e o Round F que o
precedeu), ambas em cima do preset `papelQuente`, foram REJEITADAS pelo
fundador: "ainda não é o que eu quero" / "uma merda... quero um estilo
Claude, porra". Desta vez a referência deixou de ser pesquisa por texto —
o fundador mandou 3 screenshots REAIS da grade pública do Instagram
@claudeai (`docs/referencias-visuais/claude-instagram/grid-{1,2,3}.png`),
lidos com `Read` e comparados pixel a pixel antes de qualquer decisão de
design.

**Diagnóstico do que estava errado em `papelQuente`** (por isso um preset
NOVO — `editorialClaude` — em vez de outro refino em cima do mesmo nome):
mesmo depois de 2 rodadas de ajuste fino, o preset continuava com
vocabulário de "peça de marketing" — 1 tom "papel quente" único, um traço
geométrico de assinatura (`GhostSlash`) fazendo às vezes de logo, badge de
eyebrow em pílula. A grade real do @claudeai é muito mais restrita:

1. **Paleta variada de cor CHAPADA**, não um tom só — os cards sólidos reais
   observados nos 3 screenshots são creme/paper (`#F1ECDE`), verde-sálvia
   (`#7C8863`), preto quase puro (`#151310`) e azul-acinzentado médio
   (`#5B7C93`, o card "Safeguards 101"). Extraído por aproximação visual
   (não há acesso a hex exato do post real), documentado como tal.
2. **Tipografia serifada grande carregando a peça sozinha** — sem contorno
   de texto, sem badge, sem ícone de apoio nenhum. Fonte real da Anthropic
   (Tiempos/Copernicus, "Anthropic Serif") é paga/de terceiro — mesma
   restrição já documentada pra `papelQuente`. Escolhida **Source Serif 4**
   (Google Fonts/Adobe, OFL, embutida localmente via
   `@fontsource/source-serif-4` — mesmo padrão de embedding local já usado
   pra Atkinson Hyperlegible, ver `src/lib/fonts.ts`): é uma serifada de
   TEXTO (transitional/old-style, mesma genealogia de Times/Caslon que
   informa a Tiempos real), traços de contraste moderado, terminais
   discretos — descarta opções "de exibição" (Playfair, Fraunces) que
   teriam personalidade demais e competiriam com a foto/cor em vez de
   coexistir discretamente, o oposto do que a referência real mostra. Pesos
   400/700 (arquivos `public/fonts/SourceSerif4-{400,700}.woff2`) cobrem
   corpo e headline. Só o elemento HERO troca de fonte (headline/citação) —
   eyebrow/corpo continuam na sans de marca (Atkinson Hyperlegible), mesmo
   padrão visto nos 3 screenshots reais (eyebrow "ANTHROPIC INSIGHTS" é sans
   pequeno, só o headline é serifado).
3. **Foto tratada como documento**, nunca "peça de marketing" — sem device
   frame, sem overlay pesado, texto pequeno num canto respirando. Boa parte
   da grade real (~metade dos posts nos 3 screenshots) é só isso: foto
   documental crua ou card de cor sólida, com texto mínimo ou nenhum.

**O que foi REMOVIDO** (não só adicionado) pra chegar nesse nível de
restrição — lista exaustiva, porque a Regra Inviolável #1 exige comparar
antes de aprovar, não só afirmar:

- Badge/pílula colorida — a citação de `Depoimento` `contexto` deixou de
  vir dentro de um `SurfaceCard`, passou a ficar direto sobre o fundo.
- Ícone circular de eyebrow (`IconCompass` em `Bastidores` `manifesto`,
  `IconAlert` em `Depoimento` `contexto`) — ambos suprimidos, sobra só o
  texto do eyebrow.
- Barra vertical de "pull-quote" (`MetodologiaSemEnrolacao` `cover-editorial`)
  — suprimida, o texto carrega a peça sozinho.
- Selo circular numerado nas features (`VitrineProduto` `padrao`) — vira
  texto puro, sem círculo colorido antes de cada linha.
- Card double-bezel do número da ideia (`DicaPratica` `bridge`) — vira
  numeral sans simples ao lado de "Ideia X de Y", sem card/sombra.
- Itálico forçado no headline dos slides "pull-quote"/manifesto
  (`Bastidores` `manifesto`, `MetodologiaSemEnrolacao` `cover-editorial`,
  ambos tinham uma decisão hardcoded de "sempre bold+italic") — a
  referência real usa serifada RETA, então esses 2 slides passaram a
  respeitar o peso que o próprio preset já define, em vez de forçar itálico
  por cima.
- Todo `Ghost*`/`signatureGraphic` (o que `papelQuente` já desligava
  parcialmente) — `editorialClaude` desliga por completo (`graphicSupport:
  false`, sem `signatureGraphic` nenhum).
- Badge de tag/tema-numero (`CoverFotoReal`) e o `textShadow` pesado do
  título grande — a peça de foto ganhou um MODO PRÓPRIO pro preset (ver
  abaixo), não é mais reaproveitado o layout antigo com decoração cortada
  por cima.

**Mecanismos novos em `src/lib/visualStyles.ts`** (documentados no arquivo,
resumo aqui): `canvasPalette` (N cores sólidas, tinta resolvida por
contraste de luminância — `resolveCanvas` agora aceita um `seed`, texto da
própria peça, que escolhe determinística mas variadamente entre as cores,
então peças diferentes do mesmo template caem em tons diferentes) e
`headlineFontFamily` (só o hero troca de fonte). Achado real de QA #1: o
nome da fonte precisa vir ENTRE ASPAS (`'"Source Serif 4"'`) — `"4"` sozinho
não é um custom-ident CSS válido (idents não podem ser só dígito), sem
aspas o navegador descarta a declaração inteira e o texto silenciosamente
volta a herdar a sans do `Frame` (1ª renderização de teste saiu inteira em
Atkinson Hyperlegible apesar do knob estar setado certo — só percebido
comparando com a referência, não por inspeção de código). Achado real de QA
#2: a cor de contraste da paleta precisa retornar exatamente
`colors.white`/`colors.black` (não um tom aproximado tipo `#F8F6EF`) —
vários templates fazem `canvas.ink === colors.white` pra decidir cor de
texto secundário (`Bastidores` `inkSoft`, `DicaPratica`, `VitrineProduto`);
um tom "quase branco" passava no contraste visual mas falhava a igualdade
estrita, deixando os 3 princípios do manifesto renderizando com texto quase
invisível (`rgba(20,20,19,x)` sobre fundo preto) — só os ícones de check
apareciam. Corrigido fazendo `contrastInk` devolver os tokens exatos.

**`CoverFotoReal` ganhou um modo dedicado** pra `editorialClaude`: overlay
muito mais fraco (`strength: 0.42` vs. `0.9` do modo original) só na base,
sem badge/tag, título serifado pequeno (44px vs. 74px) sem `textShadow`
pesado — literalmente o formato mais comum da grade real (foto documental +
legenda mínima).

**3 templates de CONTRASTE ficam FORA do tratamento completo** (mesma
decisão já tomada pro `papelQuente` no Round H, mesmo motivo):
`AntesDepois`, `Comparativo` e `DadoVsAchismo` são 2 blocos de cor cobrindo
o frame inteiro por design — forçar um fundo único de paleta destruiria o
próprio conceito. Recebem os knobs genéricos do preset (tipografia/
espaçamento/zero Ghost*) mas mantêm badges/ícones/pílulas originais — não
levaram o mesmo corte de decoração dos outros 6. Isso é uma lacuna
conhecida, não descoberta agora: mesmo escopo already fechado no Round H.

**9 PNGs de prova** em `out/estilo-claude-v2/`
(`node scripts/qa-estilo-claude-v2.mjs`) — os mesmos 8 tipos de post do
Round H (`papelQuente`) recriados em `editorialClaude`, pra comparação
direta lado a lado, + 1 peça NOVA (`09-FotoDocumental`, `CoverFotoReal`) que
não existia no lote anterior — o formato foto+legenda pequena, mais comum
na grade real, não tinha prova nenhuma até agora. Cada render foi lido e
comparado visualmente contra os 3 screenshots reais antes de aprovar
(Regra Inviolável #1) — 2 achados de QA reais catalogados acima só
apareceram nessa comparação, não em inspeção de código.

## Honestidade de foto — Depoimento (RESOLVIDO, 2026-09-04)

Pendência sinalizada nos Rounds F e G (ver "Fotografia real" e "Round G" mais
abaixo) e deixada em aberto por 2 rodadas: as fotos reais usadas em
`Depoimento` (`equipe-reuniao-escritorio.jpg`, `analista-relatorios-mesa.jpg`
— pessoas genéricas de banco de imagem) tinham rostos reconhecíveis
aparecendo ao lado da citação/atribuição de um cliente real (nome, empresa,
selo de iniciais) — dá a falsa impressão de que aquela pessoa fotografada É
o cliente citado. Decisão de design (cabe ao Rafael, não precisou voltar ao
fundador — ver SKILL.md, "qualidade visual acima de tudo"):

**Opções consideradas:**
1. Remover foto de pessoa em Depoimento (só ambiente/produto, sem rosto) —
   descartada: exige curadoria manual de "essa foto tem gente, aquela não"
   pra cada asset novo que um brief futuro anexar — frágil, quebra
   silenciosamente na primeira vez que alguém esquecer a regra.
2. Trocar as 2 fotos por alternativas sem pessoa — descartada pelo mesmo
   motivo: resolve o sintoma de hoje, não a causa (o próximo brief pode
   anexar outra foto com gente).
3. **Escolhida: tratamento visual estrutural.** `Depoimento` sempre renderiza
   `slide.foto` com `PhotoBackground treatment="ambient"` (novo,
   `src/lib/PhotoBackground.tsx`) em vez do `'documentary'` (foto crua) usado
   por Vitrine/DicaPratica/Bastidores/CoverFotoReal — duotone dessaturado
   (`grayscale(1) contrast(0.92) brightness(0.5)`) + blur pesado (`blur(20px)`,
   com `scale(1.12)` compensando a borda que o blur revela) + tint na cor do
   tema (`mixBlendMode: 'multiply'`, opacidade 0.6). A garantia deixa de
   depender de julgamento por foto e passa a ser da FUNÇÃO: qualquer imagem
   que entrar em `Depoimento` vira atmosfera abstrata, nunca retrato legível
   — mesmo a foto mais nítida e mais "de frente" que existir no banco.

**Achado real de QA (Regra Inviolável #1 — não bastou implementar e afirmar
que resolveu, foi preciso comparar e corrigir):** a 1ª tentativa usava só
`blur(6px)` + tint em `mixBlendMode: 'color'` (que preserva luminância, só
muda matiz) — insuficiente pro crop mais fechado (`analista-relatorios-mesa.jpg`,
slide `contexto`): olhos, óculos e contorno do rosto continuavam nítidos o
bastante pra reconhecer a pessoa, só com uma cor por cima. Comparação
lado a lado revelou o problema (ver `out/qa/craft-2026-09-04/B-after.png` da
1ª tentativa vs. a versão final) — corrigido subindo o blur pra `20px`
(destrói detalhe fino de rosto em qualquer crop) e trocando o blend mode pra
`'multiply'` (mais escuro, menos definição de borda). Renders de prova finais
em `out/qa/craft-2026-09-04/` (`A-before/after.png` = capa com
`equipe-reuniao-escritorio.jpg`, tema marca; `B-before/after.png` = contexto
com `analista-relatorios-mesa.jpg`, tema avalia) — "before" = código antes
desta rodada (`treatment` não existia, foto crua), "after" = estado final.
Em ambos, a pessoa deixa de ser reconhecível e a foto passa a funcionar como
"clima"/atmosfera de marca (tingida na cor do produto), nunca como prova de
identidade.

**Efeito colateral aceito conscientemente:** o preset `analogiaReal` (Round
G), wired em `Depoimento` `capa`, foi pesquisado com a premissa de foto NÍTIDA
(referência: post real de @thaleslaray, foto de banco em tela cheia sem
blur). Com `treatment="ambient"` agora obrigatório em Depoimento, a
combinação `Depoimento` + `analogiaReal` perde a nitidez "meme realista" e
ganha uma leitura mais abstrata/premium — o `textStroke` (contorno de texto)
continua funcionando igual ou melhor (a robustez de contraste dele independe
de quão nítida a foto está por baixo). Avaliação: troca aceitável — a
garantia de honestidade tem prioridade sobre preservar 100% do efeito
estético de um preset em UM template específico; o preset continua
funcionando como pesquisado em `DicaPratica` (que usa `treatment="documentary"`,
sem essa restrição).

## Refinamentos de craft (2026-09-04)

Segunda rodada de revisão pedida pelo fundador ("melhorar em qual frente
agora? — o designer, ué"): releitura crítica dos 8 presets de `visualStyle`
já existentes, com olho de designer sênior — fundamentado em
`high-end-visual-design` (double-bezel/elevação mesmo em superfícies flat,
tipografia como hero, respiro macro) — não gosto pessoal solto. 3 refinamentos
concretos, cada um com comparação antes/depois renderizada em
`out/qa/craft-2026-09-04/` (git-ignorado, prova local — método idêntico ao já
usado nos Rounds C/D/F/G: git stash das mudanças, render "before" no código
anterior, stash pop, render "after" no código novo).

### 1. Line-height do elemento hero nunca escalava com `headlineScale`

Achado: os 8 templates usam `headlineStyle()` pra resolver
fontSize/fontWeight/letterSpacing do elemento hero a partir do
`visualStyle`, mas cada um hardcodava um `lineHeight` FIXO no JSX,
independente do preset. Isso é fisicamente errado — tipografia grande/pesada
(`boldTipografico`, `headlineScale: 1.65`) precisa de MENOS espaço vertical
relativo entre linhas (o próprio traço já ocupa a régua), e tipografia
pequena/leve (`papelQuente`, `editorial`) precisa de MAIS espaço pra não
sufocar. Corrigido: novo knob `heroLineHeightScale` em `VisualStyle`
(multiplicador, 1.0 = comportamento original) + `headlineStyle()` agora
aceita um 4º parâmetro `baseLineHeight` opcional e devolve `lineHeight`
calculado — os 8 templates (30 pontos de chamada) foram atualizados pra ler
esse valor em vez do número fixo. Valores calibrados por preset: `boldTipografico`
0.75 (mais apertado — maior escala), `dadoEmDestaque` 0.82, `marcador` 0.92,
`minimalista`/`corporateClean` 1.0/1.05, `analogiaReal` 1.1 (fica sobre foto,
precisa de uma folga pro contorno de texto não colidir entre linhas),
`editorial` 1.08, `papelQuente` 1.18 (mais solto — tom calmo/premium).
Comparação real: `out/qa/craft-2026-09-04/D-before.png` vs. `D-after.png`
(`DicaPratica` `cover-grid`, `visualStyle="boldTipografico"`) — as 3 linhas do
título ficam visivelmente mais coesas/compactas no "after", lendo como um
bloco de manchete só, não 3 linhas soltas com respiro genérico entre elas.

### 2. `corporateClean` encolhia o hero em vez de só cortar ornamento

Achado: `corporateClean` tinha `headlineScale: 0.92` (hero MENOR que o
baseline) combinado com `spacingScale: 1.15` (mais respiro ao redor) — a
combinação lia como tímida/rarefeita, não como restrição deliberada.
Restrição premium de verdade vem de CORTAR ornamento (zero grain, borda fina
em vez de bezel, sem gráfico de apoio — isso já estava certo), não de
encolher o protagonista da peça abaixo do tamanho normal. Corrigido:
`headlineScale` voltou pra `1.0` (tamanho baseline, mesmo peso que qualquer
outro preset sem opinião), `heroLineHeightScale: 1.05` adicionado (leitura
confortável, tom formal). Comparação real: `out/qa/craft-2026-09-04/C-before.png`
vs. `C-after.png` (`Depoimento` `capa`, `visualStyle="corporateClean"`, sem
foto) — o headline no "after" ocupa mais espaço com confiança, linhas mais
coesas, sem perder a sobriedade (zero grain/gráfico decorativo continua
igual).

### 3. `SurfaceCard` variants `flat`/`outline` sem NENHUMA sombra

Achado: só a variant `bezel` tinha elevação (double-bezel com sombra —
já documentado como o padrão "premium" do catálogo). `flat` e `outline`
(usadas por `minimalista`, `boldTipografico`, `marcador`, `analogiaReal`,
`corporateClean`) tinham ZERO `boxShadow` — só uma borda de 1-1.5px. Numa
peça vista em miniatura de feed, essa borda quase some contra um fundo de
tom parecido (ex: card sobre gradiente `marca`), e o card lê como caixa "sem
estilizar"/placeholder, não como restrição deliberada — o oposto do efeito
que esses presets querem. Corrigido (`src/lib/SurfaceCard.tsx`): ambas as
variantes ganharam um `boxShadow` bem mais suave que o de `bezel`
(`0 10px 24px -18px rgba(0,0,0,0.4)` vs. o `0 14px 30px -16px rgba(0,0,0,0.5)`
de `bezel`) — um "sopro" de elevação que descola o card do fundo sem
reintroduzir a profundidade física que `flat`/`outline` existem pra evitar.
Efeito é deliberadamente sutil (ver `out/qa/craft-2026-09-04/F-before.png`
vs. `F-after.png`, `Depoimento` `capa` com `visualStyle="minimalista"`) —
funciona junto com o refinamento #2 no mesmo par C-before/C-after
(`corporateClean` usa `outline`), onde a sombra nova é mais visível por causa
do fundo mais escuro na base do gradiente.

## Peça FLAGSHIP — vídeo institucional (2026-09-03)

Fora da contagem dos 8 tipos de post repetíveis abaixo: `NorteApresentacaoReel`
(`src/templates/NorteApresentacaoReel.tsx`), pedido direto do fundador —
"vídeo foda de exemplo apresentando o Norte Para Negócios em 30 segundos",
não uma peça de calendário. Composição sob medida (não usa `theme`/`visualStyle`/
`motionStyle` combinável como os 8 tipos), mas 100% reusando a infraestrutura
de marca já validada (tokens, ícones Lucide, motion primitives, `DeviceFrame`,
`CtaBand`).

Estrutura (900 frames = 30,000s exatos, 1080x1920/30fps H.264/AAC):
1. **Hook** (0–110f) — dor real de PME ("Estoque errado. Prato que não
   vende. Decisão tomada no escuro.") resolvida na palavra "ACHISMO." em
   punch de tela cheia.
2. **Virada** (118–328f) — bordão da marca ("Não trabalhamos com
   achismos."), posicionamento consultoria+software, os 3 domínios
   (Estoque/Vendas/Performance).
3. **Vitrine** (338–718f) — os 3 produtos reais, ~4s cada, transições
   whip-pan coloridas pelo tema de cada produto: NTB Vendas (print real
   `screenshots/vendas-mobile.png` em `PhoneFrame`), NTB Estoque (print real
   `screenshots/produto-desktop.png` em `BrowserFrame`), Norte Avalia (sem
   screenshot real do produto — usa foto real `photos/analista-relatorios-mesa.jpg`
   com selo `IconBadge` fallback, em vez de fabricar uma UI que não existe).
4. **CTA** (728–900f) — bordão de fechamento + `CtaBand` real (accent) +
   assinatura de marca, com pulso sutil de respiro no final.

**v2 (mesmo dia, revisão do fundador — "ainda não tá no estilo dos perfis
que eu te mandei")**: a v1 saiu num estilo "corporate/device-frame limpo"
(chips-pílula, gradiente flat, badge corporativa) — não era a linguagem
pedida como referência. Reaplicada a pele do preset `analogiaReal` (Round G,
pesquisa real de @thaleslaray) nos 4 blocos: FOTO REAL de fundo na quase
totalidade dos 30s (só as transições/punch usam tela sólida), tipografia com
CONTORNO GROSSO (`textStrokeStyle`) flutuando livre sobre a foto (sem
card/bloco), e `IconBadge` (selo de ícone real do produto, ou fallback pra
marca/Avalia) no lugar do badge-pílula corporativo. Hook agora usa 2 fotos
reais em crossfade (`corredor-empilhadeira-estoque.jpg` →
`restaurante-ambiente-noturno.jpg`) com texto em cantos opostos — mesma
composição do meme do iceberg pesquisado. Vitrine usa o mesmo princípio do
`VitrineProduto` variant `contexto` (foto real de ambiente + device frame
sobreposto): `prato-gourmet-mesa-madeira.jpg` (Vendas),
`corredor-empilhadeira-estoque.jpg` (Estoque), `analista-relatorios-mesa.jpg`
(Avalia). CTA fecha com `salao-moderno-movimento.jpg`. Prints reais dos
produtos dentro de `DeviceFrame` mantidos da v1 (funcionaram bem, fundador
não pediu mudança nessa parte).

QA visual: 28 frames extraídos via ffmpeg nos pontos de transição/conteúdo de
cada bloco (Regra Inviolável #1) em cada rodada (v1 e v2), revisados um a um
— zero regressão em nenhuma das duas renderizações completas. Áudio: track
AAC silencioso (48kHz estéreo, -91dB) — narração via Bark é Fase 3, ainda não
implementada (ver `.claude/agent-memory/rafael/first-tasks.md` T4/T10).

### v3 — 5 variações de HOOK (A/B test de headline, 2026-09-03)

Pedido do fundador ("Sim, quero várias variações [de] ganchos.") depois de
aprovar a v2: gerar múltiplas variações do HOOK de abertura (0–110f, os
primeiros ~3,7s), mesmo princípio de A/B test de headline que o Remotion
permite — mesma template (mesmo timing, mesmas 2 fotos de fundo em
crossfade, mesma animação/posição de cada elemento), só o DADO (texto +
ícone do eyebrow) muda. Isso é o que torna o teste válido: virada, vitrine
dos 3 produtos e CTA continuam 100% idênticos entre as 5 variações — só a
variável do gancho está sendo testada.

**Implementação**: o conteúdo do hook foi extraído de dentro do componente
pra `src/lib/hookVariants.ts` (tipo `HookContent` + registro `HOOK_VARIANTS`),
e `NorteApresentacaoReel` passou a aceitar a prop `hookVariant` (default
`'dor-direta'`, a v2 original — id da `Composition` no Root não mudou).
Render de cada variação: `npx remotion render src/index.ts
NorteApresentacaoReel out/arquivo.mp4 --props=arquivo-de-props.json` com
`{"hookVariant": "<id>"}` no JSON — **usar arquivo, não `--props` inline no
shell**, mesmo bug de encoding de acento já documentado em T3
(`first-tasks.md`).

As 5 variações, com o texto exato e a lógica retórica de cada uma:

| Variação (id) | Eyebrow | Linha 1 (topo) | Linha 2 (base) | Linha 3 (base) | Punch | Ângulo retórico |
|---|---|---|---|---|---|---|
| **Dor Direta** (`dor-direta`) — controle do teste, é a v2 já aprovada, texto inalterado | ⚠ Sem dado real | Estoque errado. | Prato que não vende. | Decisão tomada no escuro. | **ACHISMO.** | Nomeia 2 dores operacionais concretas da ICP (estoque, vendas) em sequência antes de nomear o vilão comum às duas. Não interroga nem prova nada — descreve o que o espectador já vive. |
| **Pergunta Retórica** (`pergunta-retorica`) | ⚠ Responda rápido | Quanto sobrou de lucro? | Se você não sabe de cabeça, | sua gestão roda no escuro. | **ACHISMO.** | Interpelação direta em 2ª pessoa — força autodiagnóstico. Quem hesita na resposta já sente o gancho na pele, em vez de apenas assistir a uma descrição de dor alheia. |
| **Dado Real** (`dado-real`) | 📊 Dado real | 38% das PMEs | perdem margem no estoque. | E nem sabem quanto. | **ACHISMO.** | Abre com prova numérica em vez de dor genérica — reusa o MESMO dado já validado em `DadoVsAchismo.tsx` (fonte: "Norte Para Negócios, diagnóstico operacional"), condensado pro ritmo de ~2s. Não inventa estatística nova — seria irônico fabricar um "achismo" num vídeo que vende "decida com dado". Mira o público que reage mais a número do que a apelo emocional. |
| **Provocação/Comparação** (`provocacao-comparacao`) | 📈 Compare | Seu concorrente cresce. | Ele não é mais sortudo. | Ele só parou de adivinhar. | **ACHISMO.** | Comparação social com concorrente — desloca a dor de "eu não sei gerir" pra "eu estou perdendo pra quem sabe". Gatilho competitivo em vez de autocrítico, mira o instinto de "não ficar pra trás" do dono de PME. |
| **Afirmação de Marca** (`afirmacao-marca`) | 🧭 Norte Para Negócios | Gestão não é sorte. | É dado. É clareza. | É decisão de verdade. | **SEM ACHISMO.** | Único ângulo que não acusa nem pergunta — é declaração de posicionamento. O punch vira a PROMESSA da marca ("SEM achismo", callback direto ao bordão de `voice.md`), não o nome do vilão isolado. `fontSize` do punch recua de 128 pra 92 automaticamente quando o texto passa de 9 caracteres (`content.punch.length > 9` em `NorteApresentacaoReel.tsx`) — mesma posição/animação, só o tamanho respeita o dado mais longo pra não estourar a largura do frame. |

4 das 5 variações mantêm "ACHISMO." como punch — decisão deliberada, não
esquecimento: é a palavra-vilã central da marca (`voice.md`: "não trabalhamos
com achismos"), reaparece em outros templates do catálogo (`DadoVsAchismo`),
e trocá-la a cada variante quebraria a consistência de marca que não é o que
está sendo testado aqui (o teste é sobre a ISCA/lead-in, não sobre o clímax).
A variação "Afirmação de Marca" é a única exceção deliberada, porque seu
ângulo inteiro é sobre declarar a promessa em vez de nomear o vilão.

QA visual (Regra Inviolável #1): 4 frames-chave extraídos via ffmpeg do
bloco de hook de cada uma das 5 variações (~0,7s eyebrow+linha1, ~2,0s
entrada da linha2, ~2,5s linha3, ~3,2s punch) — 20 frames revisados um a
um. Todas aprovadas sem necessidade de reduzir texto: nenhuma linha
estourou a largura do frame (margens 64px esq/dir na base, 64/160px no
topo) nem sobrepôs elemento nenhum. Único ajuste feito PROATIVAMENTE durante
a implementação (antes mesmo do QA apontar problema, pela diferença de
tamanho de texto entre "ACHISMO." e "SEM ACHISMO."): o fallback de
`fontSize` do punch descrito na tabela acima — confirmado no QA que "SEM
ACHISMO." (92px) ocupa a largura do frame com a mesma folga visual que
"ACHISMO." (128px), sem parecer um degrau de qualidade entre variações.

## Sumário executivo (Round E — consolidação final, 2026-09-01/02)

**O catálogo fechou em 172 posts (PNG) + 30 vídeos (MP4) = 202 peças reais**,
número auditado fisicamente em disco no Round E (não é soma de documentação
de rounds anteriores — `find out -iname "*.png" | wc -l` e `find out -iname
"*.mp4" | wc -l` rodados de fato; o lote de 31 renders da matriz tema×variante
havia sido limpo do disco entre sessões — convenção do projeto de não deixar
`out/` acumulando lixo — e foi re-gerado nesta rodada pra confirmar o número
sem depender só de registro escrito).

| Dimensão | Quantidade |
|---|---|
| Tipos de post | **8** (Dado vs. Achismo, Dica Prática, Antes/Depois, Vitrine de Produto, Metodologia sem Enrolação, Depoimento, Comparativo, Bastidores) |
| Temas/sistemas | **4** (marca, NTB Estoque, NTB Vendas, Norte Avalia) |
| Estilos visuais (`visualStyle`) | **5** (minimalista, dadoEmDestaque, editorial, boldTipografico, corporateClean) — combinam com os 8 de 8 tipos de post |
| Tipos de vídeo (Reel) | **6** (DadoVsAchismo, Metodologia, Comparativo, Depoimento, Bastidores, Antes/Depois) |
| Estilos de motion (`motionStyle`) | **7** (kineticForte, minimalFade, zoomPunch, typewriter, splitReveal, whipPanCut, matchCut) |
| **Total de peças (Round E)** | **172 PNGs + 30 MP4s = 202** |

**Atualização Round F (2026-09-03, ver §0.4 e §Fotografia real):** +8 PNGs de
prova em `out/qa/round-f/` — 2 presets de `visualStyle` novos (`marcador`,
`papelQuente`, com símbolo próprio, não reusam GhostBars/GhostQuote) provados
em 2 templates, e 3 fotos reais novas aumentando a presença de foto de fundo
(antes 3 fotos em 3 templates, agora 6 usos em 5 templates). Cobertura
DELIBERADAMENTE parcial (2 de 8 tipos de post, nenhum Reel) — não é
reconsolidação de catálogo, é prova de conceito pra decisão do fundador sobre
expandir ou não. Total físico em disco após o Round F: **180 PNGs + 30 MP4s = 210**.

**Atualização Round G (2026-09-03, mesmo dia, ver §0.5):** +3 PNGs de prova
em `out/qa/round-g/` — 1 preset novo (`analogiaReal`, baseado em pesquisa
real do feed de @thaleslaray via `instagram-control`, 35 posts + 1 imagem
nativa inspecionada pixel a pixel) com 2 mecanismos genuinamente novos:
contorno de texto (`textStroke`) e selo de ícone de produto (`IconBadge`).
Cobertura em 2 templates (`DicaPratica`, `Depoimento`). Total físico em
disco agora: **183 PNGs + 30 MP4s = 213**.

**Principais achados/bugs corrigidos ao longo do processo** (todos com
detalhe completo no corpo deste arquivo, referenciados por seção):

1. **Risco de marca — ícone do WhatsApp**: o `WhatsAppIcon` desenhado à mão
   recriava, na prática, o contorno do logo oficial do WhatsApp/Meta (uso
   indevido de marca de terceiro). Substituído por `IconChat` (bolha de
   mensagem genérica, Lucide) em todo o `CtaBand` — ver "Sistema de ícones
   (2026-08-31)".
2. **Cor errada do NTB Estoque**: o site institucional (desatualizado) dizia
   `#00d6d6`; o código real do app usa `#2eb5c3`. Corrigido em
   `colorGuide.ts` lendo o repo do produto, não só o site — ver "Sistema de
   temas por cor" (commit `dbb30b9`).
3. **Fonte errada (Atkinson Hyperlegible Next em vez da clássica)**: a
   raspagem inicial do site registrou pesos 400-800, levando ao uso da
   família sucessora "Next". O fundador confirmou visualmente contra o site
   de produção: o site real só carrega a família **clássica**, pesos 400/700.
   Corrigido em `src/lib/fonts.ts`/`tokens.ts`, todas as peças
   re-renderizadas e re-aprovadas — ver T3.1 em
   `.claude/agent-memory/rafael/first-tasks.md` (repo `norte-para-negocios`).
4. **Contraste fraco de texto sobre foto**: o degradê de `PhotoBackground`
   (variante `contexto` do Vitrine) desvanecia cedo demais (transparente já
   aos 26% da altura), deixando a 2ª linha do headline com contraste fraco
   sobre madeira clara. Corrigido alongando o platô de opacidade forte do
   gradiente — ver "Contraste de texto sobre foto — achado real de QA".
5. **Bugs de motion (2, achados em vídeo real, não em preview estático)**:
   (a) o highlight `flash` renderizava uma caixa cinza esfumaçada
   (blur+borderRadius) atrás do número em vez de um brilho — trocado por
   `radial-gradient` (Round C); (b) o highlight `scalePop` escalava a
   palavra-chave a partir do centro, invadindo a palavra anterior em títulos
   longos — corrigido pra `transformOrigin: 'left center'` em `KineticText`,
   componente compartilhado, então o fix valeu pra todos os Reels que usam
   esse highlight (Round D).

**Auditoria de qualidade por amostragem (Round E)**: 12 PNGs + 5 clipes de
vídeo (com sub-frames extraídos nos pontos de transição) revisados
manualmente, cobrindo baseline pré-`visualStyle`, Round A, Round B e Round
C/D — cruzando tipos, estilos e temas diferentes, não só as peças mais
recentes. **Zero regressões encontradas.** Nenhuma correção foi necessária
nesta rodada final.

**O que fica pra depois (decisão do fundador, não do Rafael)**: com 172+30
peças no catálogo, falta decidir quais entram no "kit de lançamento" real —
isso é calendário editorial/estratégia, fora do domínio operacional do
Rafael. Ver `.claude/agent-memory/rafael/first-tasks.md` (T9/T10/T11) no
repo `norte-para-negocios` pra essa e outras pendências pós-catálogo (login
Instagram, teste real de Bark).

---

Atualizado em 2026-09-01, execução autônoma overnight (Round B do plano de
catálogo em escala — ver `docs/plano-catalogo-em-escala.md`) — os 5 tipos que
faltavam (`AntesDepois`, `VitrineProduto`, `DicaPratica`,
`MetodologiaSemEnrolacao`, `Bastidores`) agora também aceitam `visualStyle`.
**8 de 8 tipos combinam com estilo visual.** Ver seção **"0.1.1 Round B"**
pra decisões de julgamento (travas de itálico, clamps, exclusões de knob) e
achados reais de QA.

Atualizado em 2026-09-01 (Round A do plano de catálogo em escala — ver
`docs/plano-catalogo-em-escala.md`) — nova dimensão **`visualStyle`** (estilo
visual), ortogonal ao `theme` que já existia: 5 presets sistemáticos
(composição/densidade, textura, estilo de card, peso tipográfico, gráfico de
apoio) aplicáveis a qualquer template refatorado, combinando com `theme` de
verdade (mesmo conteúdo × mesmo tema × estilos diferentes = saídas
visivelmente diferentes). Ver seção **"0.1 Sistema de estilo visual"** logo
abaixo da seção de temas.

Atualizado em 2026-09-01 — **3 tipos NOVOS de post** (Depoimento/Prova
Social, Comparativo Direto, Bastidores/Como Trabalhamos), além dos 5
originais da Fase 0. Pedido literal do fundador: *"mais modelos mais
tipos"* — explicitamente NÃO mais variação dos 5 já existentes (Dado vs.
Achismo, Dica Prática, Antes/Depois, Vitrine de Produto, Metodologia sem
Enrolação), e sim tipos conceitualmente diferentes. Ver seção **"6-8. Tipos
novos (2026-09-01)"** logo abaixo do CoverFotoReal pra detalhe completo,
incluindo a pesquisa de mercado que embasou a escolha dos 3.

Atualização anterior em 2026-08-31 (3ª rodada, mesmo dia — sistema de ícones real +
2 Reels animados). Pedido literal do fundador: *"quero MAISSS E MAISS
PESQUISE USE AS SKILLS MAIS SIMBOLOS COISAS ATE ANIMACOES NOS POSSTS um
catálogo completo"*. Ver seções **"Sistema de ícones (2026-08-31)"** e
**"Reels animados (2026-08-31)"** logo abaixo.

Atualização anterior, mesmo dia (2ª rodada — fotografia real de
restaurante/comida). Pedido do fundador: *"tá ficando muito bom porém quero
mais opções com fotos reais às vezes do restaurante, exemplo de carrosséis,
bora explorar"*. Ver seção **"Fotografia real (2026-08-31)"** logo abaixo pra
onde as fotos vêm, como foram baixadas e as 3 peças novas.

Atualização anterior, mesmo dia (sistema de temas + guia de cores + prints reais —
pedido do fundador por "milhares de variações" com cor por sistema e prints
do sistema). Ver seção 0 abaixo pra como isso funciona. Atualização anterior
em 2026-08-30 (2ª rodada de elevação visual — fundador revisou a galeria
completa e apontou que o carrossel Metodologia inteiro e 2 slides do
DicaPratica ainda estavam mais rasos que o resto; ver nota no §5 e nas
variações `DicaPratica-bridge`/`cover-quote`). Cada um dos 5 tipos de post da
Fase 0 agora tem 2-3 variações de composição — mesmo princípio editorial,
layout diferente — pra dar variedade real na galeria sem sair do sistema de
marca (`.claude/brand/design-tokens.md`).

Todas as variações:
- usam só os tokens de `src/lib/tokens.ts` (cores, fonte Atkinson Hyperlegible 400/700);
- têm CTA de WhatsApp/link na bio (`CtaBand`) sempre que a peça é o "fim" da
  leitura — **exceção única e documentada: Bastidores** (tipo 8, ver seção
  própria), que usa link discreto em texto em vez de `CtaBand`, decisão
  deliberada por ser um formato de confiança/humanização, não de conversão
  direta;
- rodam com grain sutil de superfície (`src/lib/Texture.tsx`, via `Frame`) — dá
  profundidade física sem quebrar cor de marca;
- usam `Badge` (pílula) pra eyebrow/rótulo de topo e `SurfaceCard` (double-bezel:
  casca + núcleo com highlight) pra cards com mais peso visual, no lugar de
  caixas flat de opacidade única.

Como testar:
- `npm run qa:preview` gera 1 PNG por estado em `out/qa/` (ver
  `scripts/qa-preview.mjs` pra lista completa e props de exemplo de cada um) —
  cobre os 5 tipos de post/variações de layout.
- `npm run qa:temas` gera a matriz tema × variante em `out/qa/temas/` (ver
  `scripts/qa-theme-batch.mjs`) — prova o sistema de temas descrito na §0.
- `npm run qa:estilos` gera a matriz template × visualStyle × tema em
  `out/qa/estilos/` (ver `scripts/qa-visual-styles.mjs`) — prova o sistema de
  estilo visual descrito na §0.1/§0.1.1 (110 combinações reais renderizadas
  em 2026-09-01: 40 no Round A + 70 no Round B, ver histórico de commits).

---

## Sistema de ícones (2026-08-31)

Pedido do fundador ("mais símbolos") — os elementos gráficos improvisados
(formas SVG desenhadas à mão pra check/seta/etc.) foram substituídos por uma
biblioteca de ícones real onde fazia sentido semântico.

**Biblioteca escolhida: [Lucide](https://lucide.dev) (`lucide-react`, npm,
v1.38.0).** Licença confirmada na **fonte primária**
(`github.com/lucide-icons/lucide/blob/main/LICENSE`, checado em 2026-08-31):
dual **ISC** (ícones próprios) + **MIT** (ícones herdados do fork original
Feather) — ambas de uso comercial livre, sem custo, sem chave de API. Mesma
checagem de licença feita também pra Heroicons (MIT) e Tabler Icons (MIT) —
as três serviriam; Lucide venceu pelo pacote React mais leve/maduro
(tree-shakeable) e por um traço (stroke-based) que já combina com a
linguagem gráfica de `GhostGraphics.tsx`. Zero CDN: o pacote é resolvido no
bundle do Remotion, mesmo critério já usado pras fontes.

**Wrapper central: `src/lib/icons.tsx`.** Todo componente que precisa de um
ícone real importa daqui — nunca direto de `lucide-react` — pra trocar de
biblioteca no futuro ser mudança de 1 arquivo. Ícones expostos: `IconCheck`
(validação/estado resolvido), `IconGrowth` (seta de crescimento),
`IconAlert` (risco/achismo/estado "antes"), `IconChat` (mensagem genérica —
ver nota de marca abaixo), `IconChart` (gráfico de dados), `IconCycle`
(ciclo/repetição), `IconArrowRight` (seta de CTA).

**Nota de marca registrada:** o `WhatsAppIcon` desenhado à mão que existia
antes recriava, na prática, o contorno do logo oficial do WhatsApp/Meta —
risco real de uso indevido de marca de terceiro. Substituído por `IconChat`
(`MessageCircle`, bolha de mensagem genérica) em `CtaBand.tsx` — nenhuma
peça usa glifo de marca de terceiro.

**Onde os ícones entraram (uso funcional, não decorativo):**

| Ícone | Onde | Por quê |
|---|---|---|
| `IconChat` + `IconArrowRight` | `CtaBand` (toda peça) | Substitui o ícone de marca de risco; é o elemento mais repetido do catálogo inteiro. |
| `IconAlert` | Label "Achismo" (`DadoVsAchismo`, 3 variantes) e "Antes" (`AntesDepois`, 3 variantes) | Reforça "isso é risco/não confiável" — mesma gramática visual reaproveitada nos 2 templates. |
| `IconChart` | Label "Dado"/"Dado real" (`DadoVsAchismo`, 3 variantes) | Reforça "isso é dado real", em oposição ao achismo. |
| `IconCheck` | Label "Depois" (`AntesDepois`, 3 variantes) | Fecha o par com `IconAlert`: Antes = alerta, Depois = resolvido. |
| `IconGrowth` | Junto da métrica (`AntesDepois`, 3 variantes) | Não decorativo — sempre ao lado de um número real de resultado. |
| `IconCycle` | Selo "Melhoria contínua" do cover (`MetodologiaSemEnrolacao`) | Substitui o `GhostCycle` desenhado à mão que era usado em opacidade 100% (uso funcional, não atmosfera de fundo) — literalmente o ícone de ciclo/repetição pedido. |

**O que NÃO foi trocado:** `GhostBars`/`GhostQuote`/`GhostArrowUp` em
`GhostGraphics.tsx` continuam desenhados à mão — são elementos de
**atmosfera de fundo** (opacidade 5-22%, bleed parcial pra fora do quadro),
não ícones funcionais, e já correspondiam ao padrão de qualidade aprovado
pelo fundador. Só o uso do `GhostCycle` em opacidade 100% dentro de um selo
circular (uso literal de ícone, não atmosfera) foi migrado pra `IconCycle`.

---

## Reels animados (2026-08-31)

Pedido do fundador ("animações nos posts") — até aqui o catálogo inteiro
usava `<Still>` (frame único). As 2 peças abaixo são as primeiras
`<Composition>` de verdade do repo: vídeo real, 1080x1920, 30fps, H.264,
animado com `useCurrentFrame()`/`interpolate()`/`spring()` — não é preview
de frame único, é vídeo renderizado (`out/qa/reels/*.mp4`).

**Por que essas 2:** `DadoVsAchismo` e `MetodologiaSemEnrolacao` já tinham
estrutura de sequência/carrossel no Still (achismo→dado, cover→passos→cta) —
mais fácil "esticar no tempo" com fidelidade ao conteúdo original do que
inventar um formato novo do zero.

**Helper reutilizável: `src/lib/motion.ts`** — cada função documentada com o
TERMO correto de vocabulário de motion design (não "efeito genérico"):
`slideFadeIn` (slide + fade), `staggerWords` (stagger word reveal —
kinetic typography, 2-3 frames de defasagem por palavra), `countUp`
(contagem numérica com easing ease-out, não linear), `popIn` (pop/overshoot
via spring), `wipeProgress` (wipe transition), `progressFill` (barra de
progresso). Timing/easing seguem a pesquisa de tendência 2026 aplicada
(ver relato ao fundador): nunca linear, hold mínimo de leitura, overshoot
só em elementos pequenos.

### `DadoVsAchismoReel.tsx` (7,07s, 212 frames)

4 `<Sequence>`: **Achismo** (stagger word reveal da frase + "mask reveal" —
um traço de riscado cresce da esquerda pra direita sobre a frase inteira,
depois que ela termina de aparecer) → **Wipe** (a mesma "costura diagonal"
de accent que já existe nos Stills cresce de tarja fina até virar um flash
cheio de tela — transição real de corte, não fade genérico) → **Dado**
(número faz **count-up de 0 até o percentual real** — não aparece pronto —
com barras de fundo crescendo em stagger) → **CTA** (`CtaBand` sobe com
slide+fade). Props: `achismo`, `percentual` (numérico — o count-up precisa
de número, não string livre), `dadoTexto`, `fonteDado`, `theme`.

### `MetodologiaReel.tsx` (8,67s, 260 frames p/ 3 passos)

`<Sequence>` **Cover** (título em stagger word reveal, selo do `IconCycle`
girando continuamente — rotação amarrada ao frame, reforça literalmente
"isso é um ciclo que roda") → 1 `<Sequence>` **por passo** (número com pop
via spring, tracker de progresso animado no topo — o dot atual "chega" com
pop e a linha até o anterior desenha) → **CTA**. Props: `metodo`, `titulo`,
`passos[]` (array — funciona pra qualquer quantidade de etapas, não só 3).

**Limitação real, documentada sem maquiagem:** os 2 Reels acima são peças
**de exemplo/prova de conceito** da técnica, não um reel de produção
completo com narração — isso é Fase 3 (Bark TTS), ainda não implementada
(ver `references/constraints-plataforma.md`). O render em si foi rápido
nesta sessão (~10s por vídeo, Chromium headless local) — não houve limitação
de tempo de máquina; a limitação é de ESCOPO (2 peças, sem áudio), não de
performance de render.

---

## 0.2 Sistema de estilo de MOTION — `motionStyle` (2026-09-01, Round C)

Terceira dimensão paramétrica, equivalente em espírito ao `visualStyle`
(§0.1) mas pro eixo do TEMPO — ver `docs/plano-catalogo-em-escala.md` Round
C. Até aqui os 2 Reels (`DadoVsAchismoReel`, `MetodologiaReel`) tinham o
motion inteiro hardcoded dentro do componente. `src/lib/motionStyles.ts`
extrai isso em **7 presets** sistemáticos — cada um definindo, de forma
combinável (nunca CSS/timing solto por Reel):

- **`textEntry`** — tipo de entrada de texto: `staggerWord` (palavra a
  palavra, kinetic typography), `slideFadeBlock` (bloco inteiro junto, sem
  floreio), `typewriter` (caractere a caractere), `splitMeet` (entra de um
  lado, esquerda ou direita).
- **`transition`** — corte entre segmentos/cenas: `wipe`, `cutSeco` (corte
  seco de verdade — ausência de elemento visual, não é "sem efeito por
  preguiça"), `zoomPunch`, `crossDissolve` (fade através de uma cor sólida),
  `whipPan` (streak horizontal borrado), `matchCut` (flash curto no corte),
  `splitConverge` (2 painéis entram de lados opostos e se encontram no
  centro).
- **`easing`** — curva de peso dominante: `strong` (`EASE_OUT_STRONG`,
  já existia), `gentle` (nova, `EASE_GENTLE` — mais calma, nunca linear),
  `bounce` (nova, `EASE_BOUNCE_OUT` — back-out com leve overshoot embutido
  na curva, sem precisar de spring físico).
- **`highlight`** — efeito de destaque no elemento hero (número, dot,
  badge): `none`, `popOvershoot` (curva original hardcoded, agora
  formalizada), `scalePop` (estalo mais forte, legenda 2026), `flash`
  (clarão radial suave — ver achado de QA abaixo).
- **`paceScale`** — multiplica a duração de cada segmento (>1 mais lento,
  <1 mais cortante). As 3 Compositions de Reel usam `calculateMetadata`
  (Root.tsx) pra recalcular a duração real a partir do `motionStyle`
  recebido — sem isso, um preset lento (`minimalFade`, 1.35x) cortaria a
  peça antes do CTA terminar de entrar.
- **`staggerFrames`** / **`spring`** — defasagem entre palavras e config de
  spring (`POP_SPRING`/`SOFT_SPRING`/variação) pros elementos que "chegam"
  com física.

### Pesquisa aplicada ANTES de definir os presets

Pesquisa rápida de mercado (2026, motion pra vídeo curto B2B/social) feita
antes de codar qualquer preset novo:

- Legendas/kinetic typography 2026 fazem reveal **palavra-a-palavra com
  "scale pop" na palavra-chave** (não a frase toda de uma vez) — informa
  `highlight: 'scalePop'` em `whipPanCut` (convenção adotada: a ÚLTIMA
  palavra da frase recebe o pop, por ser o formato de brief mais previsível
  sem precisar de marcação manual de "palavra-chave").
- **Whip-pan borrado é a transição de corte de tempo/cena mais barata e
  legível em vertical** — informa `transition: 'whipPan'` (implementado como
  "speed lines" borradas, já que a técnica de câmera literal não se aplica a
  composições geradas em código).
- **Match cut (corte na mesma forma/posição) é o padrão real pra
  antes/depois** — informa `transition: 'matchCut'`.
- **"Heavy transition packs com spin/glitch em todo corte lê 2022" e "Reels
  premia polimento/tipografia kerned — motion pesado por cima de tudo soa
  ad-coded"** — DECISÃO DOCUMENTADA: o `plano-catalogo-em-escala.md`
  original sugeria `glitch-transition` como preset; **substituído por
  `whipPanCut`/`matchCut`**, que entregam a mesma energia de corte sem o
  efeito datado. Nenhum preset novo usa glitch de tela cheia.
- Revival de estética analógica (grain/imperfeição) já está coberto pelo
  grain existente (`Texture.tsx`) — não duplicado como preset à parte.

### Os 7 presets

| Preset | Quando usar | textEntry | transition | easing | highlight | paceScale |
|---|---|---|---|---|---|---|
| `kineticForte` | **Default de compatibilidade** — é a aparência ORIGINAL dos 2 Reels pré-Round C, formalizada em preset. Energia alta, ritmo de anúncio. | staggerWord | wipe | strong | popOvershoot | 1.0 |
| `minimalFade` | Bastidores/Depoimento, tom sóbrio/confiante — cortes secos, sem floreio, ritmo mais lento. | slideFadeBlock | crossDissolve | gentle | none | 1.35 |
| `zoomPunch` | Vitrine de Produto/lançamento — zoom agressivo, corte rápido, impacto imediato. | staggerWord | zoomPunch | bounce | scalePop | 0.78 |
| `typewriter` | Depoimento/citação — cadência de fala real, tom pessoal/autêntico. | typewriter | cutSeco | gentle | none | 1.2 |
| `splitReveal` | Comparativo — cada opção "vem do seu lado" e se encontra no centro. | splitMeet | splitConverge | strong | popOvershoot | 1.0 |
| `whipPanCut` | Conteúdo com vários pontos rápidos (dica prática em vídeo, listicle) — assinatura de edição mais copiada em vertical (pesquisa 2026). | staggerWord | whipPan | strong | scalePop | 0.85 |
| `matchCut` | Qualquer conteúdo com 2 estados que se opõem — reforça continuidade no corte. | slideFadeBlock | matchCut | strong | flash | 0.9 |

- Cada Reel refatorado recebe `motionStyle?: MotionStyleName` **opcional**
  — omitido = `kineticForte` (aparência original, nenhum vídeo já aprovado
  muda de comportamento).
- Helpers centralizam a lógica: `getMotionStyle`, `getEasingFn`,
  `scalePace`, `resolveHighlight` (`motionStyles.ts`); `KineticText.tsx`
  dispatcha `textEntry`; `MotionTransition.tsx` dispatcha `transition`. Reel
  nunca faz `if (motionStyle === ...)` espalhado pelo JSX.
- **Reels refatorados pra aceitar `motionStyle`:** `DadoVsAchismoReel`,
  `MetodologiaReel` (ambos preservam 100% do comportamento original quando
  `motionStyle` é omitido — verificado nos renders de regressão
  `*-kineticForte.mp4`). **Reel NOVO:** `ComparativoReel` (primeiro tipo de
  conteúdo animado além dos 2 originais — ver `src/templates/ComparativoReel.tsx`).
- **Decisão de escopo (`MetodologiaReel`):** a transição ENTRE PASSOS
  continua sendo o tracker de progresso (mecanismo de transição PRÓPRIO do
  template) — `MotionTransition` só entra nas 2 bordas que antes eram corte
  seco sem nenhum efeito (Cover→Passo 1, último Passo→CTA). Trocar o tracker
  por `MotionTransition` a cada passo destruiria a leitura de "processo
  contínuo" que é o ponto do template.

### Achado real de QA visual (Regra Inviolável #1)

O highlight `flash` (usado por `matchCut`) inicialmente renderizava uma
**caixa com `borderRadius`+`blur` atrás do número** — no vídeo real (frame
extraído via ffmpeg em `DadoVsAchismoReel-matchCut.mp4`), isso aparecia como
um **retângulo cinza esfumaçado**, não um clarão. Corrigido pra um
`radial-gradient` centrado (sem borda dura) — resultado real: bloom radial
suave, lê como "flash" de verdade. Mesmo padrão aplicado no número de passo
do `MetodologiaReel` (que antes ignorava `flashOpacity` por completo —
adicionado o mesmo clarão, adaptado pra fundo claro: preto translúcido em
vez de branco).

### Renders de prova (Round C)

**11 vídeos MP4 reais** renderizados em `out/qa/motion/` (`npm run
qa:motion`, script `scripts/qa-motion-styles.mjs`), cruzando os 3 tipos de
conteúdo animável (`DadoVsAchismoReel`, `MetodologiaReel`, `ComparativoReel`)
com os 7 `motionStyle` (todos os 7 presets aparecem pelo menos 1 vez;
`kineticForte` aparece nos 3 tipos como baseline de regressão). Revisão
real via contact sheets (`ffmpeg fps+tile`) + frames extraídos exatamente
nos pontos de transição/highlight (não dá pra confiar em amostragem
uniforme — as transições duram 6-14 frames, somem entre 2 samples de um
contact sheet genérico). 1 achado real corrigido (flash, acima) — nenhum
vídeo abaixo do padrão foi aceito. `out/` é gitignored (mesmo padrão dos
PNGs de estilo visual do Round A/B) — os MP4s são prova local, não
versionados.

**Próximo passo (Round D):** escalar vídeo pra mais tipos de conteúdo
(Depoimento é o candidato mais óbvio pro `typewriter`, Bastidores pro
`minimalFade`), mirar 15-25 vídeos renderizados cruzando mais combinações
tipo×motionStyle×tema.

---

## 0.3 Round D — escala de vídeo pra mais tipos (2026-09-01, execução
autônoma overnight, fundador dormindo)

**3 Reels NOVOS**, dobrando o catálogo de vídeo de 3 pra 6 tipos de conteúdo
animável:

| Reel novo | Par de `motionStyle` | Por quê |
|---|---|---|
| `DepoimentoReel.tsx` | `typewriter` (par documentado desde o Round C) | A citação do cliente aparece letra a letra — reforça no TEMPO que é a VOZ dele, não nossa reformulação. Também testado com `minimalFade` (também documentado em `motionStyles.ts` como bom pra Depoimento) e `kineticForte` (baseline universal). |
| `BastidoresReel.tsx` | `minimalFade` (par documentado desde o Round C) | Tom sóbrio/confiante, sem floreio — mesma lógica de "confiança > venda direta" que já definia o Still. **Mantém a MESMA decisão de escopo do Still: sem `CtaBand` cheio no fechamento** — só uma linha discreta "link na bio". É o único Reel do catálogo sem CTA de destaque, por decisão consciente, não por esquecimento. |
| `AntesDepoisReel.tsx` | `matchCut` | **Decisão de julgamento (3º Reel, além dos 2 pedidos):** o preset `matchCut` já existia desde o Round C com a `quandoUsar` "qualquer conteúdo com 2 estados que se opõem" e o CATALOGO.md já registrava "match cut é o padrão real pra antes/depois" como achado de pesquisa — mas nenhum tipo do catálogo até agora tinha essa estrutura de "2 estados que se opõem" pra usar o preset de verdade (Comparativo é 2 OPÇÕES concretas, não uma virada temporal). Antes/Depois é o par óbvio que faltava. Cogitei `VitrineProdutoReel` (par natural de `zoomPunch`) em vez deste, mas cruzar produto+screenshot+device frame numa timeline animada é escopo maior (moldura de device com estado antes/depois do próprio app) — fica pra uma rodada futura, não por falta de sentido. |

Todos os 3 seguem o mesmo padrão de infraestrutura dos 3 Reels do Round C:
`motionStyle?: MotionStyleName` opcional (default `kineticForte`, mesma
convenção de `ComparativoReel` — nasceram depois do Round C, sem "aparência
original" a preservar, mas default consistente com o resto do catálogo),
`calculateMetadata` no `Root.tsx` recalculando a duração real a partir do
preset recebido, e reuso total de `KineticText`/`MotionTransition`/
`resolveHighlight` (nenhum `if (motionStyle === ...)` novo espalhado).

### Achado real de QA corrigido (Regra Inviolável #1)

O highlight `scalePop` (usado por `whipPanCut`, aplicado à ÚLTIMA palavra de
um título via `KineticText`) escalava o span a partir do **centro** (origem
padrão do CSS) — num título mais longo (`ComparativoReel-whipPanCut-vendas.mp4`,
título "Comanda de papel"), o estalo de ~1.35x na palavra "papel" invadiu
visualmente o espaço da palavra anterior ("de"), produzindo overlap real no
vídeo (não só metadado) — bug LATENTE desde o Round C, só não visível nos
títulos mais curtos usados até então. Corrigido em `KineticText.tsx`:
`transformOrigin: 'left center'` no span da palavra — o estalo agora cresce
só pra direita, nunca sobre a palavra anterior, independente do tamanho do
título. Corrigido no componente COMPARTILHADO (não só no Reel novo) — re-
renderizado e revisado `ComparativoReel-whipPanCut-vendas.mp4` (corrigido) e,
por regressão, `MetodologiaReel-whipPanCut.mp4` (Round C, mesmo mecanismo —
confirmado sem quebra, "estoque" quebra de linha e escala limpo).

Achado secundário (menor, mesma regra): o label "Como sustentamos isso" do
`BastidoresReel` não tinha entrada animada (inconsistente com o resto do
catálogo, que sempre anima labels via `slideFadeIn`) — corrigido antes do
lote de renders.

### Critério de combinações que NÃO entraram (documentado, não forçado)

- `DepoimentoReel`: sem `zoomPunch`/`whipPanCut`/`splitReveal` — energia
  agressiva ou estrutura de "2 lados que se encontram" contradiz o tom de
  voz pessoal do cliente que define o formato.
- `BastidoresReel`: só 2 combinações reais (`minimalFade` + `kineticForte`
  baseline) — o tipo não tem eixo de tema/produto (sempre preto/roxo fixo),
  e nenhum outro preset tem `quandoUsar` compatível com sobriedade/confiança
  sem forçar.
- `AntesDepoisReel`: sem `zoomPunch` (impacto agressivo é pra lançamento de
  produto, não uma virada gradual) nem `splitReveal`/`whipPanCut` (estruturas
  de "2 opções" ou "vários pontos rápidos", que não é o que Antes/Depois
  representa).

### Renders de prova (Round D)

**19 vídeos MP4 novos** renderizados em `out/qa/motion/` (`node
scripts/qa-motion-styles.mjs --round-d`, batch `BATCH_ROUND_D` no mesmo
script do Round C): 6 `DepoimentoReel`, 2 `BastidoresReel`, 6
`AntesDepoisReel`, + 5 combinações novas nos 3 tipos já existentes
(`DadoVsAchismoReel` ganha `typewriter` — a "Achismo" já É uma citação em
1ª pessoa, mesma lógica do Depoimento; `MetodologiaReel` ganha `minimalFade`;
`ComparativoReel` ganha `whipPanCut` + 2 cruzamentos de produto NTB Vendas
com presets já provados). Conteúdo customizado (cliente/produto diferente
por combinação, não só o mesmo texto com paleta trocada) pra exercitar
tema×produto de verdade, não só motionStyle isolado — citações de cliente
são PLACEHOLDER de QA (mesma regra do Still, nunca produção real).

Revisão real via contact sheets + frames extraídos em pontos de transição
(Regra Inviolável #1) — 1 achado real corrigido (scalePop overlap, acima).
Os 11 vídeos do Round C também seguem em `out/qa/motion/` (nunca apagados —
`out/` é gitignored mas os arquivos persistem em disco entre sessões).

**Total acumulado real do catálogo de vídeo: 30 MP4s** (11 do Round C + 19
do Round D) — confirmado por contagem direta de arquivo
(`ls out/qa/motion/*.mp4 | wc -l`), não estimado. Dentro da meta pedida de
30-50; ficou na ponta inferior por decisão consciente de não forçar
combinações tipo×motionStyle sem sentido semântico (ver critério acima) —
prioridade dada à Regra Inviolável #1 sobre bater o topo do intervalo.

**Próximo passo (Round E, se houver):** consolidar catálogo geral
(posts+vídeo) numa galeria única; considerar `VitrineProdutoReel` (par de
`zoomPunch`) como 7º tipo animável se a Norte quiser continuar escalando
vídeo — maior escopo (device frame animado) do que os 3 Reels desta rodada.

---

## 0.4 Round F — pesquisa ampliada + 2 presets novos + mais foto real (2026-09-03)

Pedido direto do fundador, em conversa ao vivo (não madrugada autônoma):
depois de ver as 202 peças do catálogo (Round E), o feedback foi "tá tudo no
mesmo padrão, quero coisa mais chamativa/diferente" — e, num complemento
logo em seguida, pediu pesquisa "gigante" (não só 2 referências), símbolos
diferentes dos que já existiam, e uso real do MCP `instagram-control`
(configurado na conta pessoal dele, @eujoaquimsalles) pra olhar perfis de
referência de verdade.

**O que a pesquisa encontrou:**

1. **`instagram-control` não estava autenticado nesta sessão.** O fundador
   acreditava que sim (configurado em sessão anterior) — `instagram_get_login_status`
   retornou `{logged_in: false}` de fato, e não havia sessionid/credencial
   disponível pra reautenticar sem pedir a ele diretamente. Contorno: pesquisa
   pública via `WebSearch`/`WebFetch` (perfil público, bio, número de
   posts/seguidores, site institucional do mesmo autor). **Isso é uma
   limitação real, não contornada de verdade — se o fundador quiser a análise
   completa de posts reais (composição pixel-a-pixel), precisa reautenticar o
   MCP primeiro.**
2. **Thales Laray (@thaleslaray, 132K seguidores)** — perfil educacional de
   automação/IA. Pesquisa pública (bio do perfil + site
   escoladeautomacao.com.br) + tendências gerais de carrossel 2026 (hook
   curto de 5-8 palavras, alto contraste, "pattern interrupt", quebra
   deliberada do "corporate clean" com elementos tipo scrapbook/marca-texto/
   screenshot) — não deu pra inspecionar os POSTS pixel-a-pixel (limitação
   acima), então o preset generaliza o padrão de mercado que essa referência
   representa, não uma cópia 1:1 de um post específico.
3. **Identidade visual pública da Anthropic** — confirmada em fontes
   primárias/institucionais: tinta escura `#141413`, papel claro/quente
   `#faf9f5`, accent laranja `#d97757`, tipografia Styrene/Tiempos (fontes
   PAGAS de terceiro — Commercial Type/Klim — **não licenciadas nem usadas
   aqui**, só o princípio de calma/espaço/paleta foi replicado, com a fonte
   de marca Atkinson Hyperlegible).

**2 presets novos em `src/lib/visualStyles.ts`** (`marcador`, `papelQuente`)
— primeiros com um símbolo PRÓPRIO em vez de reusar GhostBars/GhostQuote dos
5 presets anteriores:

| Preset | Referência | Símbolo novo (`GhostGraphics.tsx`) | O que muda |
|---|---|---|---|
| `marcador` | Thales Laray / tendência de hook bold 2026 | `GhostMarker` — tarja de marca-texto cor cheia (não baixa opacidade como os outros Ghost*) | Headline maior (1.2x) e mais compacto, cardStyle `flat`, marker no lugar de GhostQuote/GhostBars |
| `papelQuente` | Anthropic/Claude (paleta pública) | `GhostSlash` — traço diagonal único, contido (NÃO é o logotipo, é um princípio geométrico genérico) | `canvasOverride` (ver abaixo) pra papel `#faf9f5`/tinta `#141413`, muito mais espaço (spacingScale 1.35), itálico contido, cardStyle `outline` |

**Exceção de arquitetura documentada:** `visualStyle` nunca mexia em cor até
agora (regra de topo do arquivo — cor é trabalho do `theme`). `papelQuente`
precisa disso pra existir de verdade (o "papel" claro/quente É o estilo), então
criou-se `canvasOverride` — restrito, opcional, só usado por esse 1 preset,
documentado como exceção deliberada. Só funciona em templates de **canvas
único** (sem blocos internos com cor própria cobrindo 100% do frame): por
isso foi ligado em `Depoimento` (`contexto`) mas **não** em `DadoVsAchismo`
(seus 2 blocos internos cobrem o frame inteiro — o override de fundo não
apareceria). Em `DadoVsAchismo`, os 2 presets novos só trocam o
`signatureGraphic` (GhostMarker/GhostSlash no lugar de GhostBars/GhostQuote).

**Cobertura atual (deliberadamente parcial, mesmo padrão do Round A→B):** os
2 presets novos estão provados em 2 templates (`Depoimento`, `DadoVsAchismo`),
não nos 8 — mesma decisão de escopo que o Round A tomou (3 templates primeiro,
Round B expandiu pros 8). Expandir pros 6 tipos restantes fica pra uma
rodada futura, se o fundador aprovar a direção.

**Achados reais de QA corrigidos nesta rodada (Regra Inviolável #1):**
- `GhostMarker` na 1ª tentativa foi posicionado SOBRE o início do headline em
  `DadoVsAchismo` (colidiu com o texto "Restaurantes", ilegível) — corrigido
  movendo pra um canto seguro (canto inferior direito, mesma zona onde
  GhostBars já vivia), consistente com o padrão de todos os outros Ghost*
  do catálogo (acento decorativo em zona garantidamente livre de texto
  dinâmico, nunca tentando "sublinhar" uma palavra específica — o
  posicionamento por coordenada fixa não tem como saber onde o texto real
  vai terminar).
- Overlay de foto do `Bastidores` (ver §Fotografia real abaixo) também foi
  corrigido por achado real de QA.

### Renders de prova (Round F)

**8 PNGs novos** em `out/qa/round-f/` (`node scripts/qa-round-f.mjs`): 4
provam os presets novos (`Depoimento`/`DadoVsAchismo` × `marcador`/
`papelQuente`), 4 provam o aumento de foto real (próxima seção). Revisados
individualmente (não só contact sheet) antes de aprovar — 3 correções reais
aplicadas (2 de posição do `GhostMarker`, 1 de overlay+contraste no
`Bastidores`).

---

## 0.5 Round G — `analogiaReal`, formato "meme com propósito" (2026-09-03)

Mesmo dia do Round F, pesquisa foi além do texto/bio público: o fundador
autorizou reautenticar o `instagram-control` MCP na conta pessoal dele
(@eujoaquimsalles) pra puxar o **feed real de @thaleslaray** — 35 posts,
captions completas, métricas de engajamento reais (não estimadas).

**Limitação real das ferramentas, encontrada e documentada** (não
contornada de verdade — reportada como está): `instagram_get_media_info` só
traz metadado do post inteiro, `instagram_download_post` retorna erro
("Must been photo") pra carrossel (`type: 8`) e só funciona em foto única
(`type: 1`); WebFetch na URL do post só pega a capa. **23 dos 35 posts são
carrossel** — não deu pra inspecionar os slides internos deles. A pesquisa
cobre então: (a) estrutura/tom dos 35 captions reais, (b) 1 imagem NATIVA
real baixada e inspecionada pixel a pixel (a única foto única disponível pra
download direto). Detalhe completo, com a imagem, em
[`docs/referencias-visuais/thaleslaray-pesquisa.md`](../../docs/referencias-visuais/thaleslaray-pesquisa.md)
e [`thaleslaray-iceberg-meme.jpg`](../../docs/referencias-visuais/thaleslaray-iceberg-meme.jpg).

**O que a imagem real mostrou** (formato "meme de iceberg", nativo, não
carrossel): foto real de banco de imagem em tela cheia (não cor sólida) +
tipografia com preenchimento branco e **contorno preto grosso** (estilo
legenda/meme viral — nada parecido existia nos 7 presets anteriores) + texto
flutuando livre sobre a foto, não em bloco/card + 2 selos pequenos quadrados
com ícone de app (ChatGPT/Claude) como "prova de contexto" + formato
retórico de analogia/comparação relacionável ("o que eu mostro" vs "o que eu
escondo").

**Preset novo em `src/lib/visualStyles.ts`: `analogiaReal`** — primeiro
preset que:
1. Introduz `textStroke` (contorno de texto via `-webkit-text-stroke` +
   `paintOrder: 'stroke fill'`, resolvido por `textStrokeStyle()`) — só faz
   sentido sobre foto real, documentado como tal no `quandoUsar`.
2. Introduz `showIconBadge` + `src/lib/IconBadge.tsx` (selo quadrado, cantos
   arredondados, com ícone de PRODUTO PRÓPRIO da Norte —
   `logos/estoque-icon.svg`, `logos/vendas-icon-192.png` — nunca logo de
   ChatGPT/Claude/terceiro, mesma linha vermelha já aplicada ao ícone do
   WhatsApp).

**Wired em 2 templates** (cobertura parcial e deliberada, mesmo padrão dos
Rounds anteriores):
- `DicaPratica` (`cover-foto`) — texto flutuante + selo de produto, o fit
  mais direto com a referência (headline única flutuando sobre a foto).
- `Depoimento` (`capa`, só quando `slide.foto` está presente) — prova que o
  `textStroke` generaliza pra outro template/composição; sem selo aqui (o
  selo de iniciais de atribuição já cumpre um papel parecido).

**Achado real de QA (positivo, não uma correção):** o contorno de texto
resolveu, de graça, um problema de contraste que o Round F tinha deixado em
aberto — no render `RoundF-Depoimento-capa-foto-marca` a citação perdia
contraste sobre a parte clara da janela ao fundo; com `textStroke` no mesmo
enquadramento (`RoundG-Depoimento-capa-analogiaReal-marca`), o texto lê
perfeitamente em cima de QUALQUER trecho da foto, claro ou escuro — o
contorno é robusto ao brilho local da imagem de um jeito que texto sem
contorno não é.

### Renders de prova (Round G)

**3 PNGs novos** em `out/qa/round-g/` (`node scripts/qa-round-g.mjs`): 2
`DicaPratica` (Estoque e Vendas, cada um com selo do produto certo) + 1
`Depoimento` capa+foto. Revisados individualmente antes de aprovar — nenhuma
correção necessária nesta rodada (contorno de texto se mostrou robusto de
primeira, ao contrário do `GhostMarker`/overlay do Round F).

**A mesma ressalva de honestidade do Round F (ver §Fotografia real) se
aplica aqui igualmente** — o render de `Depoimento` usa a mesma foto de
ambiente genérico sob o badge "Cliente Norte". **RESOLVIDO em 2026-09-04**
(ver "Honestidade de foto — Depoimento" no topo deste arquivo) —
`Depoimento` agora sempre aplica `PhotoBackground treatment="ambient"`,
que descaracteriza qualquer rosto estruturalmente, independente de qual foto
entrar.

### Sugestão pro fundador (NÃO decidida — anotada conforme pedido)

Os 35 captions reais mostraram um sinal concreto de mercado: o CTA
**"Comenta [PALAVRA] pra receber X no direct"** bateu 1.778 e 3.085
comentários nos 2 exemplos mais fortes do perfil — visto ao vivo nos dados
reais, não estimado. Isso é maior que qualquer métrica de engajamento
citada em qualquer pesquisa anterior deste catálogo. Como a meta declarada
da Norte é geração de lead (não alcance puro), pode valer a pena um TIPO de
post inteiro (9º tipo, não só uma variação visual dos 8 atuais) desenhado em
torno desse mecanismo de CTA — estrutura de conteúdo pede uma "palavra-gatilho"
clara e uma promessa de entrega no direct, o que é diferente de como os CTAs
atuais (sempre WhatsApp/link na bio) funcionam. **Isso é decisão de
calendário editorial/estratégia — fora do escopo do Rafael (ver SKILL.md
§5)** — só fica registrado aqui como sugestão pro fundador avaliar, não foi
implementado nem decidido.

---

## Fotografia real (2026-08-31)

Pedido explícito do fundador — "mais opções com fotos reais do restaurante,
bora explorar". Regra que continua valendo: **zero IA generativa** (fotos
geradas por IA seriam a solução mais fácil e foram deliberadamente descartadas
— o pedido é fotografia de verdade, tirada por fotógrafo).

**Fonte das fotos:** Pexels (licença comercial livre, sem atribuição
obrigatória — https://www.pexels.com/license/). **Limitação real encontrada:**
não havia MCP/skill de automação de banco de imagem conectada nesta sessão (a
skill `pexels-automation` depende de Rube MCP, que não está disponível aqui;
as APIs oficiais REST do Pexels e do Unsplash retornam 401 sem chave de API, e
não havia chave configurada no ambiente). Contorno usado: `WebFetch` nas
páginas de busca públicas do Pexels (`pexels.com/search/...`) pra localizar
URLs diretas do CDN (`images.pexels.com/photos/<id>/pexels-photo-<id>.jpeg`),
que **funcionam sem autenticação** — o site de busca do Unsplash bloqueou via
challenge anti-bot (Anubis), por isso todas as 3 fotos vieram do Pexels. Cada
foto foi baixada localmente (`curl`) pra `public/photos/` — Remotion renderiza
offline, não pode depender de URL externa em runtime. Créditos completos com
link de origem: [`public/photos/CREDITOS.md`](../../public/photos/CREDITOS.md).

**3 composições novas** (nenhuma delas é um dos "5 tipos" da Fase 0 — são
extensões/variações exploratórias, ver cada template pra detalhe):

| Peça | O que é | Foto usada |
|---|---|---|
| `DicaPratica` — slide `cover-foto` | Cover editorial/lifestyle: foto real em tela cheia + overlay de gradiente escuro (`src/lib/PhotoBackground.tsx`), texto ancorado embaixo. Mais "revista/lifestyle" que os covers de cor sólida. | `restaurante-ambiente-noturno.jpg` (Pexels #776538) |
| `VitrineProduto` — variante `contexto` | Foto real de ambiente/comida + mockup do celular com print REAL do NTB Vendas sobreposto, como se estivesse pousado na mesa — foto real + produto real na mesma peça. Pensada especificamente pra NTB Vendas (Cardápio Digital). | `prato-gourmet-mesa-madeira.jpg` (Pexels #5865434) |
| `CoverFotoReal.tsx` (template novo) | Peça simples de "prova social"/contexto — foto de movimento de salão em tela cheia, serve de abertura/cover pra um carrossel sobre Cardápio Digital. Badge usa a cor do tema do produto (`getTheme`). | `salao-moderno-movimento.jpg` (Pexels #2387675) |

**Contraste de texto sobre foto — achado real de QA:** a 1ª versão da
variante `contexto` do Vitrine usava um degradê `topAndBottom` que desvanecia
rápido demais (transparente já a partir de 26% da altura) — a 2ª linha do
headline caía fora da zona escura e ficava com contraste fraco sobre a madeira
clara da foto. Corrigido alongando o platô de opacidade forte do degradê
(`src/lib/PhotoBackground.tsx`, ver comentário `FIX 2026-08-31` no código) —
regra prática pra qualquer peça nova com foto: sempre validar que o texto cai
DENTRO da zona de opacidade máxima do gradiente, não só perto da borda.

**Peça nova em `src/lib/`:**
- **`PhotoBackground.tsx`** — foto real em tela cheia (`objectFit: cover` +
  `objectPosition` configurável) com overlay de gradiente escuro parametrizado
  (`'bottom' | 'top' | 'topAndBottom' | 'full' | 'none'`) pra legibilidade de
  texto. Usado pelas 3 peças acima; reutilizável em templates futuros.

### Round F (2026-09-03) — mais presença de foto real

Pedido do fundador: só 3 fotos em 202 peças era "praticamente exceção rara",
queria bem mais presença. **3 fotos novas** (mesmo método Pexels/WebFetch já
documentado acima — sem MCP de automação disponível nesta sessão), cobrindo
temas/produtos que ainda não tinham NENHUMA foto real associada (Vendas já
tinha 2, não precisava de mais):

| Foto | Pexels | Onde entrou |
|---|---|---|
| `corredor-empilhadeira-estoque.jpg` | #5156696 | `DicaPratica` `cover-foto` (uso novo de infra já existente — NTB Estoque) |
| `equipe-reuniao-escritorio.jpg` | #32082430 | `Bastidores` `manifesto` (novo, `foto?` opcional) + `Depoimento` `capa` (novo, `foto?` opcional) |
| `analista-relatorios-mesa.jpg` | #6694475 | `Depoimento` `contexto` (novo, `foto?` opcional — Norte Avalia) |

**2 templates ganharam a capacidade de foto que não tinham:**
- **`Bastidores`** — o próprio arquivo já previa isso desde 2026-08-31
  ("se a Norte tiver fotografia real de bastidores no futuro, cabe evoluir
  pra PhotoBackground") — Round F entrega exatamente isso, `foto?` opcional
  na variant `manifesto`, omitido preserva o fundo preto original.
- **`Depoimento`** — `foto?` opcional nos slides `capa` e `contexto`, omitido
  preserva o degradê/fundo branco original.

**Achado real de QA corrigido:** a 1ª tentativa em `Bastidores` usou overlay
`topAndBottom` (mesmo padrão de VitrineProduto/DicaPratica) — mas o
`manifesto` tem título+princípios ocupando justamente a faixa CENTRAL do
frame, exatamente onde esse overlay deixa a foto respirar livre por design.
Resultado: texto de corpo (peso 400, sem sombra) ilegível em trechos
claros da foto. Corrigido trocando pra overlay `full` (escurece uniforme) +
`textShadow` no título e nos princípios — dupla camada de segurança de
contraste, não só uma.

**Ressalva de honestidade — RESOLVIDA em 2026-09-04 (ver "Honestidade de
foto — Depoimento" no topo deste arquivo):** o `Depoimento` é
especificamente sobre voz de CLIENTE real — o próprio arquivo já documentava
a linha vermelha de não usar retrato genérico fingindo ser "o cliente" (por
isso a atribuição usa iniciais num selo, nunca rosto). As fotos de
`equipe-reuniao-escritorio.jpg`/`analista-relatorios-mesa.jpg` usadas como
fundo ambiente ficaram 2 rodadas em aberto porque os rostos continuavam
reconhecíveis nos crops usados no QA — em vez de decidir caso a caso se
"ambiente genérico ao fundo" cruzava ou não a linha, a solução foi
estrutural: `PhotoBackground treatment="ambient"` (duotone + blur pesado +
tint de marca) garante que NENHUMA foto usada em `Depoimento`, dessa ou de
qualquer brief futuro, produza um rosto reconhecível — a decisão não depende
mais de julgamento por asset.

---

## 0. Sistema de temas (2026-08-31)

Pra "milhares de variações" não virar arquivo-por-arquivo manual, existe um
sistema de **temas** paramétrico — o mesmo componente `.tsx` produz saídas
visuais diferentes trocando só uma prop.

- **`src/lib/colorGuide.ts`** — fonte de verdade das cores por sistema/produto,
  confirmadas direto no repo real de cada um (não só no site institucional).
  Versão legível com swatches: [`GUIA-DE-CORES.md`](./GUIA-DE-CORES.md).
- **`src/lib/themes.ts`** — empacota paleta + densidade de textura + estilo de
  card (`'bezel'` double-bezel vs `'flat'` caixa reta) num `Theme`. 4 temas:
  `marca` (institucional), `estoque`, `vendas`, `avalia`.
- Templates recebem `theme?: ThemeName` (default `'marca'` — sem a prop, o
  visual é o institucional de sempre). Refatorados até agora: `DadoVsAchismo`,
  `AntesDepois`. Exemplo: `<DadoVsAchismo variant="impacto" theme="estoque" />`
  vs `theme="vendas"` são a MESMA composição, 2 saídas visuais diferentes.
- **`VitrineProduto` não recebe `theme` manualmente** — o tema é sempre
  derivado automaticamente do campo `produto` (`getThemeForProduct`), porque
  uma vitrine sempre anuncia o produto certo, nunca uma escolha livre.

## 0.1 Sistema de estilo visual — `visualStyle` (2026-09-01, Round A)

Segunda dimensão paramétrica, **ortogonal ao `theme`** (§0): `theme` resolve
"de qual sistema/produto é a cor", `visualStyle` resolve "que TIPO de
composição visual é essa peça". As duas se combinam livremente — mesmo
conteúdo, tema Estoque + estilo minimalista vs. tema Estoque + estilo
boldTipografico são visivelmente diferentes sem trocar uma linha de cor. É a
peça de infraestrutura que faltava pra multiplicar o catálogo de posts de
forma combinatória (ver `docs/plano-catalogo-em-escala.md`): 8 tipos × 4
temas × 5 estilos = até 160 combinações possíveis (nem todas fazem sentido
semântico em todo template — usar critério, não forçar).

Calibrado com pesquisa rápida de mercado B2B/editorial 2026 antes de definir
os presets (não decidido no vácuo): "minimaximalismo" 2026 (base minimalista
+ tipografia/cor assertiva), estilo Suíço/Internacional Typographic (grid
funcional, alto contraste, 1 cor de destaque), tipografia como elemento
"hero" (grande/protagonista), e o padrão de restrição visual = credibilidade
em conteúdo B2B/LinkedIn.

**`src/lib/visualStyles.ts`** define 5 presets, cada um um conjunto de KNOBS
sistemáticos (nunca CSS solto por template):

| Preset | Quando usar | Composição/densidade | Textura | Estilo de card | Tipografia hero | Gráfico de apoio |
|---|---|---|---|---|---|---|
| `minimalista` | Peça institucional/conceitual — credibilidade por sobriedade | Muito espaço em branco (spacingScale 1.3) | Desligada | `flat` | Bold, tamanho normal | Não |
| `dadoEmDestaque` | Peça COM um número/métrica forte pra vender — generaliza o princípio que já existia isolado na variante `impacto` de DadoVsAchismo pra qualquer template | Compacto, número domina (spacingScale 0.88) | Ligada, mais densa | Herda do tema | Bold, +45% de tamanho | Sim |
| `editorial` | Tom de reportagem/revista — depoimento, contexto, prova social | Levemente mais espaçoso (1.1) | Ligada, sutil (papel) | `bezel` (profundidade) | Itálico regular, elegante | Sim |
| `boldTipografico` | A frase/afirmação em si é o gancho (manifesto, regra da casa) — tipografia É o gráfico | Compacto, tipografia enche o quadro (0.82) | Desligada | `flat` | Bold, +65% de tamanho, tracking negativo | Não |
| `corporateClean` | Contexto B2B mais formal/conservador — "chamativo" seria contraproducente | Respiro formal (1.15) | Desligada | `outline` (borda fina) | Bold, tamanho reduzido (-8%) | Não |

- Cada template refatorado recebe `visualStyle?: VisualStyleName` **opcional**
  — omitido = aparência ORIGINAL (pré-2026-09-01), nenhuma peça já aprovada
  muda de aspecto por causa desta rodada.
- Helpers em `visualStyles.ts` (`scaleSpacing`, `headlineStyle`,
  `resolveTexture`, `resolveCardStyle`, `showGraphicSupport`) resolvem os
  knobs de forma centralizada — template nunca faz `if (visualStyle === ...)`
  espalhado pelo JSX.
- Novo `CardStyle` `'outline'` (borda fina única, fundo transparente) somado
  a `'bezel'`/`'flat'` que já existiam, pro preset `corporateClean`
  (`src/lib/themes.ts`, `src/lib/SurfaceCard.tsx`).
- **Templates refatorados pra aceitar `visualStyle`:** todos os 8 tipos de
  post — Round A (2026-09-01, manhã): `DadoVsAchismo` (3 variantes),
  `Comparativo` (2 variantes), `Depoimento` (5 estados de slide). Round B
  (2026-09-01, execução autônoma overnight): `AntesDepois` (3 variantes),
  `VitrineProduto` (5 variantes), `DicaPratica` (6 slide kinds),
  `MetodologiaSemEnrolacao` (5 slide kinds), `Bastidores` (2 variantes) — ver
  seção **"0.1.1 Round B — os 5 tipos restantes"** logo abaixo pra detalhe
  completo de decisões de julgamento, achados de QA e clamps.
- Achado real de QA visual (Regra Inviolável #1, Round A): o headlineScale de
  `dadoEmDestaque`/`boldTipografico` aplicado ao título de coluna do
  `Comparativo` ("DO JEITO ANTIGO") quebrava em 2 linhas enquanto "COM A
  NORTE" ficava em 1, ficando visualmente assimétrico. Corrigido com um clamp
  de fontSize (28px) só nesse elemento — o efeito de peso/estilo continua
  presente, sem quebrar o layout.

### 0.1.1 Round B — os 5 tipos restantes (2026-09-01, execução autônoma)

Execução overnight, fundador dormindo — decisões de julgamento tomadas e
documentadas aqui, sem pausar pra perguntar (pedido explícito da tarefa).

**Resultado: 8 de 8 tipos agora aceitam `visualStyle`.** Nenhum cruzamento
precisou ser INTEIRAMENTE excluído — toda combinação testada (110 renders
reais em `out/qa/estilos/`, ver `npm run qa:estilos`) ficou dentro do padrão
de qualidade depois dos ajustes abaixo. O julgamento pedido pela tarefa virou,
na prática, ajuste cirúrgico de knob por elemento (clamp de tamanho, ou
"travar" um sub-atributo específico do preset), não exclusão de estilo
inteiro — a diferença: excluir jogaria fora uma combinação inteira; o ajuste
cirúrgico preserva a variação (o preset ainda muda a peça de verdade) e só
neutraliza a parte que quebrava.

**Decisões de "trava" documentadas (headlineWeight/fontStyle do preset
IGNORADO de propósito, resto do preset aplica normal):**
- `DicaPratica` slide `cover-quote` (citação) e `MetodologiaSemEnrolacao`
  slide `cover-editorial` (pull-quote) e `Bastidores` variant `manifesto`
  (afirmação central): os 3 já tinham bold+itálico HARDCODED desde a criação
  como voz de marca ("isso é uma citação/manifesto falado"). Deixar o preset
  sobrescrever pra `fontWeight: 700, fontStyle: 'normal'` (o que
  `boldTipografico`/`dadoEmDestaque`/`minimalista`/`corporateClean` fariam,
  já que só `editorial` é itálico) descaracterizaria esse tom. Fix: tamanho/
  letter-spacing/espaçamento vêm do preset, fontWeight/fontStyle ficam
  fixos. Confirmado no render real (`DicaPratica-coverQuote-boldTipografico.png`)
  que o resultado — citação gigante, bold, itálico — fica ÓTIMO, não
  descaracterizado; a preocupação original do fundador ("Bastidores pode não
  combinar com boldTipografico") não se confirmou depois de aplicar essa
  trava — o cruzamento ficou bom o bastante pra manter no catálogo.

**Clamps de tamanho (achados reais de QA, Regra Inviolável #1):**
- `AntesDepois` `metricaHero`: metrica de 158px × 1.65 (boldTipografico)
  estourava a margem segura ao lado do ícone — cap em 215px.
- `VitrineProduto` `padrao`/`grid`/`print`/`contexto`: cada uma dessas 4
  variantes tem um elemento de posição FIXA logo abaixo do headline (lista de
  features, device frame ou mockup de celular) — headline sem cap invadia
  visualmente esse elemento em telas com headline de 2+ linhas. Cap
  específico por variante (66-84px) preserva o peso extra sem colisão.
- `MetodologiaSemEnrolacao` `passo`: numero "02" com anel decorativo FIXO de
  172px — cap em 158px pro numero não estourar o anel. Também achado (e
  corrigido) que o `letterSpacingBoost` negativo de
  `boldTipografico`/`dadoEmDestaque` somado ao `-6` já agressivo do design
  original quase comprimia demais os 2 dígitos — floor em `-6` (visualStyle
  só pode DEIXAR mais espaçado que o original, nunca mais compacto nesse
  elemento específico). Comparado lado a lado com o render sem `visualStyle`
  (mesma aparência "0"/"2" justapostos) — confirmado que o aspecto
  "apertado" é o design ORIGINAL já aprovado (glifo de zero cortado da
  Atkinson Hyperlegible), não um bug novo desta rodada.

**Exclusão de knob (não de estilo inteiro) documentada:**
- `VitrineProduto` variant `contexto` (foto real full-bleed): `resolveTexture`/
  `showGraphicSupport` ficam sempre desligados, igual já era antes desta
  rodada — grain/GhostCheck por cima de foto real suja a imagem sem ganho.
  `visualStyle` nela ainda afeta headline normalmente. `print` (screenshot
  dentro de moldura, fundo é cor sólida do tema, não foto) NÃO tem essa
  exclusão — textura/gráfico de apoio funcionam normal ali.
- `DicaPratica` slide `cover-foto`: mesma lógica (foto real full-bleed).

**Regra que NÃO mudou:** `VitrineProduto` continua derivando o tema
SEMPRE do `produto` (nunca escolha manual) — `visualStyle` foi só somado por
cima, ortogonal, como pedido.

**110 renders reais** em `out/qa/estilos/` nesta chamada de
`scripts/qa-visual-styles.mjs` (40 do Round A, re-renderizados como
regressão + 70 novos do Round B — blocos 4-8 do script). Revisão visual real
feita via contact sheets (`ffmpeg tile`) + inspeção individual dos casos de
risco (clamps, travas de itálico) antes de aprovar — nenhuma peça abaixo do
padrão foi aceita.

## Vitrine de Produto — variante `print` (nova, 2026-08-31)

Além de `padrao`/`hero`/`grid` (ícone+texto), a variante `print` mostra um
**screenshot real do sistema** dentro de uma moldura de device
(`src/lib/DeviceFrame.tsx` — `PhoneFrame`/`BrowserFrame`), com sombra e leve
inclinação, não a imagem crua colada. Screenshots reais em
`public/screenshots/` (NTB Estoque: 4 telas do repo real; NTB Vendas: 2
capturas ao vivo de `testvendase.norteparanegocios.com.br`). Prop
`screenshotAspect` evita que `objectFit: cover` corte conteúdo real da UI
quando o screenshot tem proporção atípica (achado real de QA, corrigido).

---

## 1. Dado vs. Achismo (`DadoVsAchismo.tsx`)

Post único (1 imagem). Prop `variant`.

| Variante | Quando usar |
|---|---|
| `padrao` (default) | Split horizontal — achismo comprimido em cima, dado dominante embaixo. Uso geral, funciona pra qualquer dado. |
| `impacto` | Achismo vira só uma tarja fina no topo; o número do dado ocupa quase a tela toda (~90px). Usar quando o dado em si é o gancho (número forte, curto, "chocante"). |
| `ladoALado` | Split vertical esquerda (achismo)/direita (dado), leitura mais editorial/revista. Usar quando o dado precisa de mais contexto de texto (frase mais longa) do que a variante `impacto` comporta. |

## 2. Dica Prática (`DicaPratica.tsx`)

Carrossel — 1 `<Still>` por slide, `slide.kind` decide o layout. Slides
`bridge` e `cta` são compartilhados entre todas as variações de cover.

| Cover | Quando usar |
|---|---|
| `cover` (default) | Título + badge numérico + "Arrasta pro lado →". Uso geral. |
| `cover-grid` | Cover já mostra uma prévia em lista dos itens (até 4) antes do swipe — "prova de conteúdo". Usar quando os itens são curtos o bastante pra caber num preview de 1 linha cada. |
| `cover-quote` (elevado 2026-08-30) | Cover editorial, citação/provocação grande sobre fundo preto. Ganhou aspas gráficas grandes (abertura + fechamento espelhado, bleed parcial pra fora do quadro) e o título deixou de ser um `h2` solto — agora vive num `SurfaceCard` de assinatura/atribuição, com marcador de accent. Usar quando a dica nasce de uma frase forte (do fundador, de um cliente, ou uma dor comum bem resumida numa frase). |
| `cover-foto` (novo, 2026-08-31) | Cover editorial/lifestyle: foto REAL de restaurante/comida em tela cheia (`foto`, `public/photos/` — zero IA generativa) com overlay de gradiente escuro (`PhotoBackground`, `overlay="bottom"`) pra legibilidade, texto ancorado embaixo. Usar quando a dica tem gancho num contexto físico real de restaurante/bar/lanchonete (bom pra NTB Vendas). |

Slides funcionais (não têm variação de layout, só de conteúdo):
- `bridge` (elevado 2026-08-30) — 1 ideia numerada por slide. O número ganhou um card double-bezel (`SurfaceCard`) em vez de ficar solto no ar, com rótulo "IDEIA n de total"; ganhou também tracker de progresso no topo (mesma linguagem do `passo` do Metodologia) e um `GhostCheck` grande de apoio no fundo.
- `cta` (headline + `CtaBand`).

## 3. Antes/Depois (`AntesDepois.tsx`)

Post único (1 imagem). Prop `variant`.

| Variante | Quando usar |
|---|---|
| `padrao` (default) | Split horizontal topo/base, métrica como badge no bloco DEPOIS. Uso geral. |
| `ladoALado` | Split vertical esquerda (antes)/direita (depois), selo "Com a Norte" na costura central. Usar quando antes/depois têm textos de tamanho parecido (o split vertical equilibra melhor que o horizontal nesse caso). |
| `metricaHero` | A métrica vira o elemento gigante central da peça (até 158px), antes/depois encolhem pra legendas curtas acima/abaixo. Usar quando o número de resultado é forte o bastante pra carregar a peça sozinho — pedido explícito do fundador por "número grande". |

Recebe `theme?: ThemeName` (default `'marca'`) — ver §0. Troca o gradiente do
bloco DEPOIS pelo sistema anunciado (ex: `theme="estoque"` pra um antes/depois
específico do NTB Estoque).

## 4. Vitrine de Produto (`VitrineProduto.tsx`)

Post único (1 imagem). Prop `variant`.

| Variante | Quando usar |
|---|---|
| `padrao` (default) | Identidade no topo + lista vertical de features em cards double-bezel. Uso geral, até 4 features. |
| `hero` | Identidade/headline centralizadas e grandes, features viram pílulas horizontais. Mais "poster de lançamento" — usar pra anúncio de feature nova ou quando a headline é o principal gancho (menos "ficha técnica"). |
| `grid` | Features em grade 2×2 (bento), cards com mais profundidade (double-bezel + número em selo). Usar quando as 4 features têm peso parecido entre si e vale destacar todas com o mesmo nível de atenção. |
| `print` (novo, 2026-08-31) | Screenshot real do sistema numa moldura de device (`screenshot`, `device: 'phone'\|'browser'`), com sombra/inclinação — "prova visual" em vez de ícone+texto. Usar quando existe um print real bom o bastante pra carregar a peça sozinho (painel, tela de produto, etc). |
| `contexto` (novo, 2026-08-31) | Foto REAL de ambiente/comida do restaurante em tela cheia (`foto`, `public/photos/`) + mockup do celular com o `screenshot` real do sistema sobreposto, como se estivesse pousado na mesa — foto real + produto real na mesma peça. Pensada pra NTB Vendas (Cardápio Digital), reforça "isso resolve um problema de restaurante de verdade". Ver nota de contraste de texto abaixo da seção "Fotografia real". |

Tema (`padrao`/`hero`/`grid`/`print`/`contexto`) é sempre derivado
automaticamente do `produto` — ver §0.

## 5. Metodologia sem Enrolação (`MetodologiaSemEnrolacao.tsx`)

Carrossel — 1 `<Still>` por slide, `slide.kind` decide o layout. Slides
`passo` e `cta` são compartilhados entre todas as variações de cover.

**Nota de bug (2026-08-30):** o cover original desta peça era visualmente mais
fraco que os covers dos outros 4 tipos (rótulo em texto plano, sem hint de
continuidade) e o script de QA só renderizava o cover, nunca os slides `passo`/`cta`
— por isso a peça parecia "quebrada" (sem corpo, sem CTA) na galeria, quando na
verdade o carrossel inteiro sempre teve os 3 slides completos. Ambos os
problemas foram corrigidos nessa mesma data (ver histórico do commit
`5709fb2`).

**2ª rodada de elevação (2026-08-30, mesmo dia):** mesmo corrigido, o
carrossel inteiro ainda estava visivelmente mais raso que o resto do catálogo
(fundador revisou a galeria completa e apontou) — faltava o mesmo peso visual
(`SurfaceCard`, elemento gráfico de apoio) que peças como AntesDepois/
VitrineProduto/DadoVsAchismo já tinham. Todos os 5 estados foram elevados:

| Cover | Quando usar |
|---|---|
| `cover` (default) | Badge do método + título + hint "Passo a passo, sem enrolação — arrasta pro lado →" + **novo:** card `SurfaceCard` "Melhoria contínua" com selo circular (ícone `GhostCycle`, seta de refresh — simboliza o ciclo PDCA/Lean que se repete) e `GhostBars` maior/mais visível ao fundo. Uso geral. |
| `cover-roadmap` | Mini-roadmap com as etapas do método (bolinhas conectadas por linha) — **novo:** a lista inteira agora vive dentro de um `SurfaceCard` (moldura double-bezel) em vez de bullets soltos flutuando no fundo preto. Usar quando o método tem nome de etapa curto o bastante pra caber numa linha (ex: PDCA, 5W2H). |
| `cover-editorial` | Tratamento editorial/itálico, mais quote-like, sem badge — **novo:** aspas gráficas grandes (`GhostQuote`, abertura no topo-direito + fechamento espelhado embaixo) substituem as barras de crescimento (que combinavam mais com dado/resultado do que com tom editorial), e uma barra vertical de accent ("pull-quote" estilo revista) dá moldura de apoio ao bloco de texto, que antes ficava só com título + linha fina soltos. Usar quando o método é conhecido o bastante pra não precisar de "prova" — o gancho é o tom, não a lista. |

Slides funcionais:
- `passo` (elevado 2026-08-30) — número grande ganhou um selo/anel decorativo
  (círculo tracejado accent atrás do número, efeito "checkpoint") e a peça
  ganhou um **mini-diagrama de progresso** (`SurfaceCard` com `total` círculos
  numerados, etapa atual destacada em accent, etapas concluídas em
  `primaryDark`, conectados por linha) — preenche o espaço que antes ficava
  vazio abaixo do texto e mostra visualmente "onde estou no ciclo", pedido
  explícito do fundador.
- `cta` (elevado 2026-08-30) — ganhou `Badge` "Metodologia" acima do headline
  (dá o mesmo ritmo eyebrow→título→CTA das outras peças) e `GhostBars` maior/
  mais visível ao fundo. Headline + `CtaBand`.

---

## 6. CoverFotoReal (`CoverFotoReal.tsx`) — exploratório, 2026-08-31

Post único, fora da numeração "5 tipos" da Fase 0 (é uma peça pontual pedida
pelo fundador, não um tipo novo formal do calendário). Foto real em tela
cheia (`foto`) com overlay `bottom`, badge/eyebrow (`tagNumero`) na cor do
`theme` (produto anunciado ou `'marca'`), título grande e "Arrasta pro lado →"
— pensada pra abrir/servir de cover de um carrossel sobre Cardápio Digital,
mas genérica o bastante pra qualquer produto (basta trocar `theme`/`foto`).
Ver seção "Fotografia real" acima pra fonte da foto padrão.

---

## 6-8. Tipos NOVOS (2026-09-01) — pesquisa de mercado e escolha

Pedido do fundador: *"mais modelos mais tipos"* — deixou explícito que NÃO
queria mais variação dos 5 tipos já existentes (isso já estava bem coberto),
e sim **formatos de post conceitualmente diferentes**, que ainda não existem
no catálogo.

**Pesquisa feita** (Perplexity, web, 2026-09-01) sobre formatos B2B/consultoria
que convertem em lead/DM no Instagram em 2026, cruzada com `.claude/brand/`
(ICP de PME em crescimento, tom "não trabalhamos com achismos", meta de
lead via WhatsApp/link na bio — não só alcance). Achados que embasaram a
escolha:

| Formato pesquisado | Por que converte (2026) | Virou tipo no catálogo? |
|---|---|---|
| Depoimento/prova social (cliente real, não métrica nossa) | Confiança + salvamento (dwell time alto num carrossel de case) | **Sim — Depoimento** |
| Comparativo direto (nós x concorrência / opção A x B) | Capta "intenção de fase de pesquisa" (quem já está decidindo) | **Sim — Comparativo** |
| Bastidores/cultura (processo interno, não venda direta) | Humanização — reach/confiança de fundo de funil, watch time por autenticidade | **Sim — Bastidores** |
| Enquete/pergunta ao público | Formato nativo de **Stories** (sticker de enquete interativo) — fora do domínio de render do Rafael (Remotion produz Stills/Composições de feed, não Stories interativas do app) | Não implementado nesta rodada — ver nota abaixo |
| Anúncio/novidade de feature | Estruturalmente já coberto pela variante `hero` de Vitrine de Produto ("poster de lançamento") | Não — seria variação do tipo 4, não tipo novo |

**Nota sobre Enquete:** decisão consciente de não forçar um formato de
engajamento nativo de Stories dentro de um Still de feed — um "post de
pergunta" estático sem a interação real do sticker de enquete seria um
substituto fraco, não o formato de verdade. Se a Norte quiser esse formato,
o caminho certo é nativo do app (Stories), fora do escopo de render do
Rafael — registrado como gap, não implementado por enquanto.

Todos os 3 tipos novos seguem as mesmas regras dos 5 originais: tokens de
`src/lib/tokens.ts`/`colorGuide.ts`, ícones reais de `src/lib/icons.tsx`
(nunca forma desenhada à mão fingindo ser ícone de marca), grain de
`Texture.tsx` via `Frame`, e — com uma exceção documentada abaixo
(Bastidores) — `CtaBand` de WhatsApp/link na bio como núcleo de lead-gen.

### 6. Depoimento / Prova Social (`Depoimento.tsx`)

Carrossel — 1 `<Still>` por slide, `slide.kind` decide o layout. Diferença
conceitual do tipo mais parecido dos 5 originais (Antes/Depois): lá a prova
é uma MÉTRICA nossa; aqui é a VOZ do cliente, citação real em primeira
pessoa — pesquisa 2026 aponta esse como o formato de maior conversão por
confiança/salvamento no B2B.

| Cover | Quando usar |
|---|---|
| `capa` (default) | Citação grande em destaque + card de atribuição (iniciais em selo colorido + nome + empresa) — a citação é o gancho. Usar quando a frase do cliente já é forte por si só. |
| `capa-metrica` | Abre pelo número (resultado) antes da citação — mesma energia do `metricaHero` do Antes/Depois. Usar quando o resultado numérico é o gancho mais forte que a frase em si. |

Slides funcionais:
- `contexto` — o "antes", nas palavras do próprio cliente (não nossa reformulação).
- `resultado` — o "depois", com metrica opcional e badge do produto usado (`produto`, cor derivada automaticamente se informado).
- `cta` (headline + `CtaBand`).

**Regra de escopo (importante):** `citacao`/`corpo` sempre vêm do brief, com
aspas reais de cliente real — Rafael nunca inventa depoimento de produção
(mesma regra do Checklist #7: brief pronto, só formata). Sem foto de
"cliente": não existe asset de retrato real disponível, e usar foto de
banco de imagem genérica fingindo ser o cliente seria enganoso — mesma
lógica que já veta usar IA generativa pra simular pessoa real. Atribuição
usa iniciais num selo colorido em vez de rosto.

**Achado real de QA (2026-09-01):** a 1ª versão dos covers (`capa` e
`capa-metrica`) deixava um vão vazio grande entre a citação e o
card/atribuição, abaixo do padrão visual do resto do catálogo — corrigido
centralizando o bloco de conteúdo verticalmente (em vez de ancorado no
topo) e adicionando um segundo `GhostQuote` espelhado como contrapeso, mesma
técnica já usada no `cover-quote` do DicaPratica. O slide `contexto` tinha o
mesmo problema (card de citação sozinho, muito espaço morto abaixo) —
corrigido com um `GhostQuote` grande de fundo, mesmo tratamento do `bridge`
do DicaPratica.

### 7. Comparativo Direto (`Comparativo.tsx`)

Post único (1 imagem). Prop `variant`. Diferença conceitual de Dado vs.
Achismo (o mais parecido dos 5 originais): lá se opõe uma CRENÇA a um DADO —
1 par único, o gancho é o número. Aqui se comparam duas OPÇÕES concretas
(jeito antigo x com a Norte, planilha x sistema) em VÁRIOS atributos — o
gancho é a decisão, não um número isolado. Pesquisa 2026: comparativos
diretos captam intenção de "fase de pesquisa" (quem está decidindo entre
alternativas).

| Variante | Quando usar |
|---|---|
| `colunas` (default) | Split vertical esquerda (opção A, apagada, ícone `IconX`)/direita (opção B, cor do tema, `IconCheck`) — leitura rápida, até 4 itens. |
| `tabela` | Linhas horizontais com 2 colunas de valor (label + valor A + valor B) dentro de `SurfaceCard` — melhor pra mais itens/comparação mais granular (até 5). |

Se `produto` for informado, o tema (cor do lado "vencedor") vem automático
de `getThemeForProduct` — mesmo princípio da Vitrine de Produto. Sem
`produto`, usa `theme` (default `'marca'`) — comparativo genérico, sem
produto específico (ex: "achismo" x "método", sem citar um sistema).

**Bug real corrigido no QA (2026-09-01):** a variante `colunas` estava com
`wordmarkColor={colors.white}`, mas as colunas param em `bottom: 260` (mesmo
padrão do `ladoALado` de Antes/Depois) — sobra uma faixa branca (fundo
padrão do `Frame`) embaixo, onde o wordmark fica. Texto branco sobre fundo
branco ficava **invisível** (só o losango de accent aparecia). Corrigido
pra `wordmarkColor={colors.black}`, igual ao `ladoALado` do Antes/Depois que
tem a mesma estrutura.

### 8. Bastidores / Como Trabalhamos (`Bastidores.tsx`)

Post único (1 imagem). Prop `variant`. Diferença conceitual dos outros 7
tipos: nenhum deles fala sobre a PRÓPRIA Norte por dentro — todos vendem pro
cliente ou provam com voz do cliente/comparativo. Bastidores é sobre o RIGOR
INTERNO — "não trabalhamos com achismos" como prática real, não só slogan.
Pesquisa 2026: esse formato converte por humanização/confiança de fundo de
funil, não por push direto.

| Variante | Quando usar |
|---|---|
| `manifesto` (default) | Afirmação/princípio central em destaque + até 3 princípios curtos que o sustentam (lista com `IconCheck`). Usar quando o gancho é uma frase de posicionamento forte. |
| `regraDaCasa` | Uma única regra numerada ("Regra 01") dentro de um `SurfaceCard`, com explicação curta. Usar quando o gancho é uma prática específica e concreta, não um princípio geral. |

Ícone-selo: `IconCompass` (bússola) — trocadilho deliberado com o nome
"Norte" (temos direção, não achismo).

**Limitação real documentada:** não existe asset de foto real do
time/escritório da Norte disponível nesta sessão — usar foto de banco de
imagem genérica fingindo ser "o time" seria enganoso (mesma lógica que já
veta usar IA generativa pra simular pessoa/lugar real). Por isso este tipo é
100% tipográfico/gráfico (sem foto), focado no PROCESSO/PRINCÍPIO, não em
rosto. Se a Norte tiver fotografia real de bastidores no futuro, cabe
evoluir pra uma variante com `PhotoBackground`.

**Decisão de CTA (documentada, pedido explícito da tarefa — julgar caso a
caso):** este é o ÚNICO tipo do catálogo inteiro SEM `CtaBand` cheio. A
pesquisa de mercado e a lógica do próprio formato concordam nisso —
bastidores constrói confiança de fundo de funil; forçar CTA agressivo aqui
contradiz o gênero (autenticidade em primeiro lugar, venda depois). O link
da bio aparece só como linha discreta de texto, não como banda de destaque.

**Achado real de QA (2026-09-01):** as duas variantes tinham vão vazio
grande entre o texto e o rodapé — corrigido centralizando o conteúdo
verticalmente (em vez de ancorado no topo) e reforçando os elementos
`GhostBars`/`GhostCheck` de fundo (maiores, em 2 cantos opostos) pra dar
equilíbrio de composição sem competir com o texto.

---

## Peças novas em `src/lib/`

- **`Badge.tsx`** — pílula de eyebrow/rótulo (substitui texto plano solto).
- **`SurfaceCard.tsx`** — "double-bezel": casca externa sutil + núcleo interno
  com highlight, pra cards com profundidade física em vez de caixa flat.
- **`Texture.tsx`** — grain sutil via SVG `feTurbulence`, `mix-blend-mode: overlay`,
  aplicado por padrão em todo `Frame` (prop `texture`, default `true`).
- **`GhostGraphics.tsx` → `GhostCycle`** (novo, 2026-08-30) — seta circular
  única (estilo "refresh"), desenhada pra ficar legível mesmo pequena
  (selo/badge de ~34-40px, ao contrário de `GhostBars`/`GhostQuote`/`GhostCheck`
  que são pensados pra tamanho grande de fundo). Usada no Metodologia sem
  Enrolação pra simbolizar o ciclo de melhoria contínua (PDCA/Lean).
- **`icons.tsx` → `IconX`** (novo, 2026-09-01) — X/negativo, par funcional de
  `IconCheck` do lado "perdedor" de um comparativo (Comparativo.tsx).
- **`icons.tsx` → `IconQuote`** (novo, 2026-09-01) — aspas, marca de
  atribuição de depoimento real (Depoimento.tsx).
- **`icons.tsx` → `IconCompass`** (novo, 2026-09-01) — bússola, selo "como
  pensamos" de Bastidores.tsx — trocadilho deliberado com o nome "Norte"
  (direção, não achismo).

---

## Contagem total do catálogo (real, 2026-09-01, fim do Round B)

Método de contagem — transparente e auditável, sem arredondar pra bater um
número redondo (regra inegociável do plano, ver
`docs/plano-catalogo-em-escala.md`):

| Camada | O que é | Contagem |
|---|---|---|
| Baseline pré-`visualStyle` | 8 tipos × variantes/slide-kinds × temas aplicáveis, ANTES de existir a dimensão `visualStyle` — número documentado no início do plano (`docs/plano-catalogo-em-escala.md`: "62 peças hoje vieram de 8 tipos × poucas variantes × 4 temas"). | **62** |
| Round A (manhã de 2026-09-01) | `DadoVsAchismo` + `Comparativo` + `Depoimento` × 5 `visualStyle` × 2-3 temas/produtos cada — 40 renders reais, cada um uma combinação nova (tema×estilo que não existia antes de `visualStyle` existir). | **+40** |
| Round B (execução autônoma overnight, 2026-09-01) | `AntesDepois` + `VitrineProduto` + `DicaPratica` + `MetodologiaSemEnrolacao` + `Bastidores` × `visualStyle` — 70 renders reais (ver blocos 4-8 de `scripts/qa-visual-styles.mjs`), todos aprovados no QA visual (nenhuma combinação excluída — ver §0.1.1). | **+70** |
| **TOTAL** | | **172** |

Notas de honestidade sobre esse número (pedido explícito da tarefa —
"reporte o número real, sem inflar"):
- Os renders de `out/qa/` são locais/efêmeros (`out/` está no `.gitignore`,
  nunca foi commitado) — a contagem de 62+40 vem da documentação escrita nas
  rodadas anteriores (commits `8cd3c04`/`b5a9839` e o próprio plano), não de
  arquivos físicos que sobreviveram entre sessões. A contagem de 70 (Round B)
  **foi conferida agora**: `find out/qa/estilos -iname "*.png" | wc -l`
  retornou exatamente 110 (40+70) depois do render desta rodada.
- O alvo pedido era 60-100 peças NOVAS nesta rodada — o real ficou em 70,
  dentro do alvo. O total ACUMULADO (172) passa de 100 porque o Round A já
  tinha empurrado o acumulado pra 102 antes do Round B começar — isso é
  esperado e foi sinalizado como aceitável na própria tarefa ("se o real
  ficar em 55 ou 130, tudo bem").
- "172 peças" conta combinações tipo×variante×tema×estilo que foram
  efetivamente renderizadas e revisadas (Regra Inviolável #1) em algum ponto
  do projeto — não é o total teórico de TODAS as combinações matematicamente
  possíveis (que seria bem maior, já que nem todo tema/estilo foi cruzado
  com toda variante de todo tipo; ver §0.1.1 pra critério de cobertura usado
  no Round B).

---

## Teste de volume real — 100 peças (2026-09-04)

Pedido direto do fundador: ver o pipeline rodando em volume real (100
peças), não mais amostra de poucas peças. Diferente dos rounds anteriores
(que escalam a MATRIZ de combinações tipo×tema×estilo), este teste valida o
pipeline de ponta a ponta com **conteúdo editorial distinto** — texto real
baseado em `.claude/brand/products.md`/`voice.md` (estatísticas plausíveis
de operação, features dos 3 produtos, bordões de marca), não placeholder
repetido.

### Como foi gerado

O parser de brief mensal (`scripts/parse-brief.mjs`) ainda não suporta o
formato final de um brief real (nenhum brief do fundador/marketing chegou
ainda — ver comentário no topo daquele arquivo), então, por pragmatismo,
este teste NÃO passou pelo parser: `scripts/gerar-teste-100.mjs` é um script
novo, standalone, que declara os 100 itens de conteúdo inline (8 arrays,
um por tipo) e chama `renderStill` (a mesma função que `scripts/render.mjs`
e todos os scripts de QA já usam) diretamente pra cada um. Suporta
`--start N --end N` pra rodar em lotes — usado aqui em 10 lotes de 10, em
background, pra não travar num comando síncrono gigante.

### Resultado real

| Métrica | Valor |
|---|---|
| Peças pedidas | 100 |
| Peças renderizadas com sucesso | **100/100** |
| Falhas de render | **0** |
| Tempo total | ~3-4min (10 lotes de 10, render em lote de `Still` é rápido — ~2-3s por peça incluindo bundling) |
| Tamanho em disco (`out/teste-100/`) | ~84MB (100 PNGs 1080×1350) |

### Distribuição (8 tipos, ~12-13 cada)

| Tipo | Qtd | Cobertura de variante/kind |
|---|---|---|
| DadoVsAchismo | 13 | 3 variantes × 4 temas |
| DicaPratica | 12 | 1 slide por item — cover/cover-grid/cover-quote/cover-foto/bridge/cta |
| AntesDepois | 12 | 3 variantes × 4 temas |
| VitrineProduto | 13 | padrao/hero/grid/print/contexto × 3 produtos (print/contexto usam screenshot/foto reais de `public/`) |
| MetodologiaSemEnrolacao | 12 | 1 slide por item — cover/cover-roadmap/cover-editorial/passo/cta |
| Depoimento | 13 | 1 slide por item — capa/capa-metrica/contexto/resultado/cta |
| Comparativo | 13 | colunas/tabela × 3 produtos + genérico (tema `marca`) |
| Bastidores | 12 | manifesto (6, com/sem foto) + regraDaCasa (6) |

Tipos carrossel (DicaPratica/MetodologiaSemEnrolacao/Depoimento) renderizam
1 `<Still>` por slide — pra manter a contagem em exatamente 100
imagens/thumbnails, cada item da lista é 1 slide (não o carrossel completo),
escolhidos pra cobrir os `kind` variados como itens distintos.

### QA — contact sheet + amostragem individual

Contact sheet gerado via `ffmpeg` (`tile=10x10`, thumbnails 200px) em
`out/teste-100-contact-sheet.png` (2000×2500, ~2.1MB) — usado pra varredura
visual rápida das 100 peças. Depois, 20 peças foram abertas em tamanho real
(acima da amostra mínima de 15 pedida), cobrindo os casos de maior risco:
fotos reais (`cover-foto`, `contexto`, `manifesto` com foto), screenshots
reais (`print`/`contexto` da Vitrine), tabela do Comparativo, carrossel
(bridge/passo/cta) e todos os 4 temas.

**2 achados reais de QA, ambos corrigidos nesta rodada:**

1. **Bug de conteúdo (6/100 peças) — `Bastidores` variante `regraDaCasa`
   sem `titulo`.** `BastidoresData.titulo` é campo obrigatório do tipo
   mesmo quando não é o principal (na variante `regraDaCasa` o headline
   visual vem de `titulo`, não só de `corpo`) — os 6 itens regraDaCasa do
   script foram escritos só com `numero`/`corpo`, omitindo `titulo`. Como o
   Remotion faz merge de props ausentes com os `defaultProps` da
   composição, as 6 peças caíram silenciosamente no título genérico do
   default ("Não recomendamos nada antes de ver o dado.") em vez do texto
   real da regra — só visível comparando os 6 lado a lado no contact sheet
   (pareciam idênticos). Corrigido adicionando `titulo` distinto a cada uma
   das 6 regras em `scripts/gerar-teste-100.mjs`, e as 6 peças foram
   re-renderizadas.
2. **Bug de template pré-existente — selo "VS" do `Comparativo` variante
   `colunas` sobrepondo a 1ª letra do título da coluna B.** `top: 160` do
   selo colidia com a área de título das colunas (que começa em
   `colPaddingTop`, default 190px) tanto vertical quanto horizontalmente —
   bug real mas discreto o bastante (a colisão cobre só a 1ª letra) pra
   nunca ter sido pego nos QAs anteriores; confirmado que o preset default
   salvo em `out/qa/Comparativo-colunas.png` (Round A) já tinha o mesmo
   problema. Só ficou óbvio aqui com um título mais curto ("Método") no
   teste de volume. Corrigido em `src/templates/Comparativo.tsx` (selo
   subiu pra `top: 104`, acima da linha do título) — as 13 peças
   `Comparativo` do lote foram re-renderizadas pra confirmar.

Nenhum outro problema sistemático encontrado nas 20 peças revisadas
individualmente nem na varredura do contact sheet.

### Limite real do pipeline em volume

- **Sem gargalo de performance real**: 100 `Still` renderizam em poucos
  minutos rodando em lotes sequenciais simples (sem paralelização,
  sem bundler compartilhado entre processos) — o pipeline aguenta volume
  bem acima de 100 sem precisar de infraestrutura nova.
- **Gargalo real é o parser de brief, não o render**: `parse-brief.mjs`
  ainda espera o formato provisório documentado nele mesmo (nenhum brief
  real chegou) — pra gerar 100 peças de um brief real do fundador/marketing
  hoje, alguém ainda precisa escrever esse brief inteiro em markdown (ou o
  parser precisa evoluir pra formato real quando ele chegar). O gargalo de
  volume não é técnico, é editorial.
- **Merge silencioso de defaultProps é uma armadilha real**: o achado #1
  acima mostra que omitir um campo obrigatório não quebra o render (viraria
  erro óbvio) — ele silenciosamente herda o valor do `defaultProps` da
  composição, produzindo uma peça com texto ERRADO mas visualmente
  "normal". Em volume, isso só é pego com QA visual de verdade (contact
  sheet + amostragem), nunca só checando "renderizou sem erro" — reforça
  por que a Regra Inviolável #1 exige QA visual antes de publicar, mesmo
  em lote grande.
- As 100 imagens individuais deste teste (`out/teste-100/`) NÃO foram
  commitadas (gitignored via `out/`, ~84MB) — só o script gerador e o
  contact sheet consolidado foram versionados.

---

## Round H — `papelQuente` cobrindo os 8 tipos + refino contra o site real (2026-09-05)

Pedido direto do fundador, com histórico de insatisfação repetida ("uma
merda... quero um estilo Claude, porra"): validar/refinar `papelQuente`
contra a identidade visual REAL do produto claude.ai (não só a paleta
pública já pesquisada no Round F) e provar o preset nos 8 tipos de post,
não só nos 2 templates onde ele nasceu (Depoimento, DadoVsAchismo).

**Pesquisa (2 buscas, validação rápida — não é a pesquisa de origem)**:
confirmado que o site usa uma serifada paga (Tiempos/Copernicus, rebatizada
"Anthropic Serif") pra headline e uma sans paga (Styrene/"Anthropic Sans")
pro resto — nenhuma licenciada aqui, mesma restrição já documentada, efeito
replicado só com itálico regular contido na fonte de marca (Atkinson
Hyperlegible). Confirmado também que o site tem praticamente zero grain, e
que o elemento gráfico do logo real é deliberadamente ambíguo
(asterisco/estrela/pinwheel) e SEMPRE aparece na cor de marca (laranja),
nunca neutro — o `GhostSlash` (traço único, não o logotipo) passou a usar
`#d97757` fixo em vez de tinta neutra/tema nos 2 usos existentes
(Depoimento, DadoVsAchismo).

**Ajustes no preset** (`src/lib/visualStyles.ts`): `spacingScale` 1.35 →
1.42 (mais espaço, mais perto do respiro real do site), `texture.
opacityMultiplier` 0.5 → 0.32 (menos grain — o site real quase não usa).
Resto do preset mantido (já estava bem calibrado).

**Cobertura expandida de `canvasOverride` pra 4 templates novos**
(antes só `Depoimento` suportava o fundo papel/tinta de verdade):
`Bastidores` (variant `manifesto`, sem foto), `MetodologiaSemEnrolacao`
(variant `cover-editorial`), `DicaPratica` (variant `bridge`),
`VitrineProduto` (variant `padrao`). Em cada um: `background`/
`wordmarkColor` do `Frame` e as cores de texto hardcoded que assumiam o
fundo original (branco ou escuro) passaram a ler de `resolveCanvas(vs,
<original>, <original>)` — com `vs` diferente de `papelQuente`,
`resolveCanvas` devolve os valores originais inalterados (zero regressão
nas peças já aprovadas nesses 4 templates).

**3 templates deliberadamente FORA do `canvasOverride`** (mesma decisão já
documentada pro `DadoVsAchismo` no Round F): `AntesDepois`, `Comparativo` e
`DadoVsAchismo` são templates de CONTRASTE — 2 blocos de cor cobrindo o
frame inteiro por design (antes/depois, coluna A/B, achismo/dado). Forçar
um fundo único de papel nesses destruiria o próprio conceito do template
(a comparação lado a lado É o formato). Recebem só os knobs genéricos do
preset (espaçamento, tipografia, textura, `signatureGraphic` nos 2 que já
suportavam) — não ficam com o fundo papel, e isso é intencional, não uma
lacuna.

**Achado real de QA corrigido (Regra Inviolável #1)**: primeira tentativa
em `VitrineProduto` criou uma costura dura — o bloco de identidade do
produto (620px, degradê `productColor.base → productColor.dark`) terminava
abruptamente contra o novo fundo de papel, uma linha reta feia na
transição. Corrigido fazendo o degradê terminar em `canvasPadrao.
background` em vez de `productColor.dark` — quando não há `canvasOverride`
(qualquer outro preset), `canvasPadrao.background` é literalmente
`productColor.dark` (fallback), então o comportamento original não muda;
só quando `papelQuente` está ativo o degradê passa a se fundir suavemente
na cor do canvas. Confirmado visualmente no re-render antes de aprovar.

**8 PNGs de prova** em `out/estilo-claude/` (`node scripts/qa-estilo-
claude.mjs`) — 1 de cada tipo de post (`Depoimento`, `Bastidores`,
`MetodologiaSemEnrolacao`, `DicaPratica`, `VitrineProduto`, `AntesDepois`,
`Comparativo`, `DadoVsAchismo`), todos em `papelQuente`. Revisados
individualmente (não só contact sheet) — coerência de cor/tipografia
confirmada nos 5 templates com `canvasOverride` novo + Depoimento; os 3
templates de contraste ficam consistentes em tipografia/espaçamento mas
mantêm suas cores de bloco próprias por design (ver acima).

**1 MP4 bônus**: `NorteApresentacaoReel` (flagship de 30s) renderizado
como está em `out/estilo-claude/09-NorteApresentacaoReel.mp4` — NÃO
reestilizado em `papelQuente`. É uma composição sob medida (900 frames,
cores hardcoded direto no componente, não usa `theme`/`visualStyle`
combinável — decisão de arquitetura já documentada na criação dela).
Reestilizar essa peça de verdade exigiria reescrever cores em toda a
timeline, incompatível com o escopo de "refino rápido" desta rodada —
fica como próximo passo se o fundador aprovar a direção pro flagship
também.
