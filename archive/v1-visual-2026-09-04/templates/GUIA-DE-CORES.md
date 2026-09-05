# Guia de Cores por Sistema — Norte Para Negócios

Atualizado em 2026-08-31 por Rafael. Fonte de verdade em código:
[`src/lib/colorGuide.ts`](../lib/colorGuide.ts). Este documento é a versão
legível — pra conferir sem precisar rodar nada. Se os dois divergirem no
futuro, `colorGuide.ts` está certo (é o que os templates realmente importam).

**Como foi levantado:** lendo o CSS/tema real de cada repositório (só
leitura, nenhum repo de produto foi alterado), não só o site institucional —
2 das 3 cores de sistema abaixo tiveram surpresa em relação ao que o site
institucional documentava.

---

## Paleta geral da marca

| Swatch | Token | Hex | Uso |
|---|---|---|---|
| 🟪 | `primary` | `#6b71f2` | Cor principal, posts institucionais |
| 🟦 | `primaryLight` | `#6366f1` | Variação clara / gradiente |
| ⬛ | `primaryDark` | `#1e1b4b` | Fundo escuro padrão, tema "marca" |
| 🟥 | `accent` | `#f43f5e` | CTA, WhatsApp, urgência — **fixo em todos os temas** |
| 🟥 | `accentHover` | `#e11d48` | Hover do accent |

O `accent` vermelho **não muda por tema/produto** — é a cor de reconhecimento
de marca + lead-gen (CTA do WhatsApp, badges de destaque). Isso é intencional:
o viewer sempre reconhece "isso é Norte" pelo vermelho, não importa qual
produto está sendo anunciado.

---

## NTB Estoque

| Swatch | Tom | Hex | Fonte |
|---|---|---|---|
| 🟦 | base | `#2eb5c3` | **Confirmada no repo real** — `app/globals.css:64` (`--brand`), `app/manifest.ts:11` (theme_color), `app/layout.tsx:26` (viewport.themeColor) |
| ⬛ | dark | `#145a61` | Derivada por Rafael (mesmo método de luminosidade do par dark/light de Norte Avalia) |
| 🟩 | light | `#60d4e1` | Derivada por Rafael |

⚠️ **Correção importante:** o `.claude/brand/design-tokens.md` do site
institucional documentava `#00d6d6` para essa integração. Isso está
**desatualizado** — não bate com o app real. `#2eb5c3` é a cor de verdade em
produção (ciano/teal médio, ligeiramente mais escuro e menos saturado que o
`#00d6d6` do site). Recomendo o fundador atualizar o site institucional pra
bater com o app, ou vice-versa — hoje os dois não são a mesma cor.

## NTB Vendas (Cardápio Digital)

| Swatch | Tom | Hex | Fonte |
|---|---|---|---|
| 🟣 | base | `#484DB5` | **Confirmada no repo real** — `app/globals.css:45` (`--brand`, com comentário no próprio código: *"Marca: identidade Norte Para Negócios (azul-violeta + coral)"*), `public/manifest.json:8` (theme_color), hardcoded em `page.tsx`/`acesso/page.tsx`/`AuthBackdrop.tsx` |
| ⬛ | dark | `#262969` | Derivada por Rafael |
| 🟪 | light | `#898cd2` | Derivada por Rafael |

✅ **Isso NÃO é uma cor proposta/inventada.** O gap estava só na documentação
do site institucional (que nunca chegou a listar essa cor) — o app já tem
identidade visual própria, azul-violeta, replicada deliberadamente do hero do
site institucional (comentário no próprio `globals.css` confirma). Screenshot
real capturado ao vivo em `testvendase.norteparanegocios.com.br` bate 100%
com esse hex.

## Norte Avalia

| Swatch | Tom | Hex | Fonte |
|---|---|---|---|
| 🟪 | base | `#7e22ce` | Já documentada em `.claude/brand/design-tokens.md` (CSS de produção do site institucional) |
| ⬛ | dark | `#581c87` | Idem |
| 🟣 | light | `#a855f7` | Idem |

Nenhuma mudança aqui — único sistema que já tinha cor própria confirmada
desde antes desta rodada.

---

## Resumo — o que mudou nesta rodada

| Sistema | Antes (o que o site institucional dizia) | Agora (confirmado no código real) |
|---|---|---|
| NTB Estoque | `#00d6d6` | `#2eb5c3` — **corrigido**, valores diferentes |
| NTB Vendas | sem cor própria, usava `primary` genérico | `#484DB5` — **cor própria existia, só não estava documentada** |
| Norte Avalia | `#7e22ce` | `#7e22ce` — sem mudança |

## Como usar

Nunca importar hex solto num template. Sempre:

```ts
import {getTheme, getThemeForProduct} from '../lib/themes';

const theme = getTheme('estoque'); // ou 'vendas' / 'avalia' / 'marca'
const theme2 = getThemeForProduct('ntbVendas'); // Vitrine de Produto usa isso — automático, não escolha manual
```

`theme.colors` dá `{base, dark, light, source}`. `theme.cardStyle` e
`theme.textureOpacity` controlam o "sotaque visual" do tema (ver
`src/lib/themes.ts`).
