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
  **Próximo passo (Round C)**: infraestrutura de `motionStyle` pra vídeo —
  `src/lib/motionStyles.ts` com 6-8 presets de motion (kinetic-typography-
  forte, minimal-fade, glitch-transition, split-screen-reveal, zoom-punch,
  stopmotion-cut), aplicados a 2-3 tipos já animados (`DadoVsAchismoReel`,
  `MetodologiaReel`) antes de escalar pra mais tipos no Round D.

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
