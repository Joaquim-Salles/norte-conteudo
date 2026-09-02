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
