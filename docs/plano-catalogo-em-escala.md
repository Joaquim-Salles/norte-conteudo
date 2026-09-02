# Plano — Catálogo em escala (50 estilos de vídeo, 100+ de post)

Decidido 2026-09-01, execução autônoma overnight (fundador dormindo, "só faz").

## Por que combinatório, não artesanal

Já provado que funciona: 62 peças hoje vieram de 8 tipos × poucas variantes × 4 temas,
não de 62 arquivos escritos um a um. Pra chegar em 100+/50 de verdade (não fake),
precisamos de mais UMA dimensão combinável em cada lado:

- **Posts:** `tipo de conteúdo` (8) × `tema/sistema` (4) × **`estilo visual` (novo, alvo ~4-5)**
  → 8 × 4 × 4 = 128 combinações possíveis (nem todas fazem sentido — filtrar as
  que quebram semântica, ex: Bastidores não usa tema de produto).
- **Vídeos:** `tipo de conteúdo animável` × **`estilo de motion` (novo, alvo ~6-8 presets)**
  × tema → alvo 50+ combinações reais.

## Status

- **Round A — CONCLUÍDO (2026-09-01)**: `src/lib/visualStyles.ts` criado com 5
  presets (minimalista, dadoEmDestaque, editorial, boldTipografico,
  corporateClean), calibrados com pesquisa rápida de mercado antes de
  definir. 3 templates refatorados pra aceitar `visualStyle` combinável com
  `theme`: `DadoVsAchismo`, `Comparativo`, `Depoimento` — os outros 5 tipos
  ainda NÃO foram tocados (fica pro Round B). 40 PNGs reais renderizados e
  revisados em `out/qa/estilos/` (script `scripts/qa-visual-styles.mjs`,
  `npm run qa:estilos`), 1 achado real de QA corrigido (headline de coluna do
  Comparativo quebrando linha nos estilos de fonte maior). Detalhe completo
  em `src/templates/CATALOGO.md` §0.1. Commit `8cd3c04`, push feito.
  **Próximo passo (Round B)**: aplicar `visualStyle` aos 5 tipos restantes
  (DicaPratica, AntesDepois, VitrineProduto, MetodologiaSemEnrolacao,
  Bastidores — CoverFotoReal é exploratório, avaliar se entra) e escalar o
  render em lote pra mirar 60-100 peças cumulativas.

- **Round B — CONCLUÍDO (2026-09-01, execução autônoma overnight, fundador
  dormindo)**: os 5 tipos restantes (`AntesDepois`, `VitrineProduto`,
  `DicaPratica`, `MetodologiaSemEnrolacao`, `Bastidores`) refatorados pra
  aceitar `visualStyle`, seguindo o mesmo padrão do Round A. **8 de 8 tipos
  de post agora combinam com estilo visual.** `CoverFotoReal` (exploratório,
  fora dos "8 tipos") não foi tocado — decisão: manter escopo nos 8 tipos
  formais do catálogo.
  Julgamento exercido sem pausar pra perguntar (documentado em detalhe em
  `src/templates/CATALOGO.md` §0.1.1): 3 elementos (`DicaPratica`
  `cover-quote`, `MetodologiaSemEnrolacao` `cover-editorial`, `Bastidores`
  `manifesto`) têm bold+itálico hardcoded como voz de marca desde a criação —
  o preset de `visualStyle` varia tamanho/espaçamento nesses casos, mas NUNCA
  sobrescreve fontWeight/fontStyle, senão descaracterizaria o tom. Nenhum
  cruzamento precisou ser excluído por inteiro — a preocupação original
  ("Bastidores pode não combinar com boldTipografico") não se confirmou no
  render real; o resultado ficou bom com a trava de fonte aplicada. Outros
  achados reais de QA corrigidos: clamps de fontSize em 4 pontos com elemento
  de posição fixa logo abaixo do headline (`AntesDepois` metricaHero,
  `VitrineProduto` padrao/grid/print/contexto, `MetodologiaSemEnrolacao`
  passo), e um floor de letterSpacing no número do `passo` (preset não pode
  comprimir mais que o design original).
  **110 PNGs reais renderizados** (`npm run qa:estilos`, script expandido em
  `scripts/qa-visual-styles.mjs`, blocos 4-8): 40 re-renderizados como
  regressão do Round A + 70 novos do Round B. Todos revisados via contact
  sheets (`ffmpeg tile`) + inspeção individual dos casos de risco antes de
  aprovar (Regra Inviolável #1) — nenhuma peça abaixo do padrão foi aceita.
  **Contagem total real do catálogo: 172** (62 baseline + 40 Round A + 70
  Round B — matemática completa e auditável em `src/templates/CATALOGO.md`,
  seção "Contagem total do catálogo").
- **Round C — CONCLUÍDO (2026-09-01, execução autônoma overnight, fundador
  dormindo)**: `src/lib/motionStyles.ts` criado com **7 presets** de motion
  (`kineticForte`, `minimalFade`, `zoomPunch`, `typewriter`, `splitReveal`,
  `whipPanCut`, `matchCut`), calibrados com pesquisa rápida de mercado (motion
  pra vídeo curto B2B/social 2026) ANTES de codar — ver
  `src/templates/CATALOGO.md` §0.2 pra fontes e detalhe de cada preset.
  **Decisão de julgamento documentada:** o plano original sugeria
  `glitch-transition`/`stopmotion-cut`; a pesquisa encontrou que "heavy
  transition packs com glitch em todo corte lê 2022" e "motion pesado soa
  ad-coded" em conteúdo B2B — substituídos por `whipPanCut` (whip-pan
  borrado) e `matchCut` (flash no corte), que a mesma pesquisa aponta como
  os padrões reais de 2026 pra energia de corte sem o efeito datado.
  Cada preset define, de forma sistemática (nunca hardcoded por Reel):
  `textEntry` (staggerWord/slideFadeBlock/typewriter/splitMeet),
  `transition` (wipe/cutSeco/zoomPunch/crossDissolve/whipPan/matchCut/
  splitConverge), `easing` (strong/gentle/bounce — nunca linear),
  `highlight` (none/popOvershoot/scalePop/flash) e `paceScale` (duração
  dos segmentos escala com o preset, via `calculateMetadata` no Root.tsx —
  sem isso um preset mais lento cortaria a peça antes do fim).
  Novos primitivos em `src/lib/motion.ts` (`typewriterReveal`, `splitEnter`,
  `zoomPunchIn`, `whipPanProgress`, `flashPulse`, `scalePopKeyword`,
  `EASE_GENTLE`, `EASE_BOUNCE_OUT`) + 2 componentes novos
  (`src/lib/KineticText.tsx` dispatcha `textEntry`, `src/lib/MotionTransition.tsx`
  dispatcha `transition`) — Reels nunca fazem `if (motionStyle === ...)`
  espalhado.
  **`DadoVsAchismoReel` e `MetodologiaReel` refatorados** pra aceitar
  `motionStyle?` (omitido = `kineticForte`, aparência 100% original —
  verificado nos renders de regressão). **1 Reel NOVO: `ComparativoReel`**
  (primeiro tipo de conteúdo animado além dos 2 originais — par natural do
  preset `splitReveal`).
  **11 vídeos MP4 reais renderizados** (`npm run qa:motion`, script
  `scripts/qa-motion-styles.mjs`) cruzando os 3 tipos animáveis × os 7
  motionStyles (todos os 7 aparecem pelo menos 1 vez). Revisão real via
  contact sheets (`ffmpeg fps+tile`) + frames extraídos exatamente nos
  pontos de transição/highlight (Regra Inviolável #1 — amostragem uniforme
  não pega transições de 6-14 frames). **1 achado real de QA corrigido**: o
  highlight `flash` renderizava uma caixa com blur+borderRadius atrás do
  número, que no vídeo real aparecia como retângulo cinza esfumaçado — trocado
  por `radial-gradient` centrado (bloom suave de verdade), corrigido também no
  `MetodologiaReel` (que antes ignorava `flashOpacity` por completo). Detalhe
  completo em `src/templates/CATALOGO.md` §0.2.
  **Próximo passo (Round D)**: escalar vídeo pra mais tipos de conteúdo
  (Depoimento com `typewriter`, Bastidores com `minimalFade` são os
  candidatos mais óbvios pelo `quandoUsar` de cada preset), mirar 15-25
  vídeos renderizados cruzando mais combinações tipo×motionStyle×tema.

## Rounds de execução (cada um = 1 dispatch do Rafael, sequencial)

1. **Round A — infraestrutura de `visualStyle`**: `src/lib/visualStyles.ts`, 4-5 presets
   (ex: minimalista, editorial-foto, dado-em-destaque, bold-tipografico, corporate-clean).
   Refatorar 2-3 templates pra aceitar `visualStyle` como prop, provar em ~15-20 renders.
2. **Round B — escalar `visualStyle` pros 8 tipos**: aplicar em todos onde fizer sentido,
   render em lote grande (mirar 60-100 peças cumulativas).
3. **Round C — infraestrutura de `motionStyle` pra vídeo**: `src/lib/motionStyles.ts`,
   6-8 presets de motion (ex: kinetic-typography-forte, minimal-fade, glitch-transition,
   split-screen-reveal, zoom-punch, stopmotion-cut). Aplicar em 2-3 tipos já animados.
4. **Round D — escalar vídeo**: mais tipos ganham versão Reel, combinar com motionStyle,
   mirar 15-25 vídeos renderizados de verdade (MP4).
5. **Round E — consolidação**: atualizar CATALOGO.md com a contagem final real (não
   arredondar pra 50/100 se não bateu — reportar o número real), gerar galeria.

## Regras inegociáveis (não mudam à noite)
- Regra Inviolável #1: qualidade visual > volume. Nunca aprovar peça abaixo do padrão
  só pra bater número.
- Zero IA generativa, zero SaaS pago.
- Reportar o número REAL alcançado, mesmo que fique abaixo de 50/100 — não inflar.
- Cada round documenta o que fez e commita/pusha antes do próximo round começar.
