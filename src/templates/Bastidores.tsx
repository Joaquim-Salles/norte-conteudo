import React from 'react';
import {Frame} from '../lib/Frame';
import {SurfaceCard} from '../lib/SurfaceCard';
import {colors} from '../lib/tokens';
import {GhostBars, GhostCheck} from '../lib/GhostGraphics';
import {IllustrationFluxo} from '../lib/HandDrawn';
import {PhotoBackground} from '../lib/PhotoBackground';
import {IconCompass, IconCheck} from '../lib/icons';
import {
  getVisualStyle,
  headlineStyle,
  isMinimalDecoration,
  resolveCanvas,
  resolveCardStyle,
  resolveTexture,
  scaleSpacing,
  showGraphicSupport,
} from '../lib/visualStyles';
import type {BastidoresData} from '../lib/types';

/**
 * Template novo (2026-09-01) — Bastidores / Como Trabalhamos, em 2 variacoes.
 *
 * Diferenca conceitual dos outros 7 tipos: nenhum deles fala sobre a PROPRIA
 * Norte por dentro — todos vendem pro cliente (dica, dado, metodologia,
 * produto) ou provam com voz do cliente/comparativo. Bastidores e sobre o
 * RIGOR INTERNO — "nao trabalhamos com achismos" como pratica real, nao so
 * slogan — pesquisa de mercado 2026 (CATALOGO.md §6) mostra que esse formato
 * converte por HUMANIZACAO/CONFIANCA, nao por push direto.
 *
 * Limitacao real documentada: nao existe asset de foto real do time/escritorio
 * da Norte disponivel nesta sessao — usar foto de banco de imagem generica
 * fingindo ser "o time" seria enganoso (mesma logica que ja vetou usar IA
 * generativa pra simular pessoa real, ver regra do fundador). Por isso este
 * tipo e 100% tipografico/grafico (sem foto), focado no PROCESSO/PRINCIPIO,
 * nao em rosto — se a Norte tiver fotografia real de bastidores no futuro,
 * cabe evoluir pra uma variante com PhotoBackground.
 *
 * ATUALIZACAO (Round F, 2026-09-03): a previsao acima se confirmou — `foto`
 * (opcional, so na variant `manifesto`) troca o fundo preto chapado por foto
 * real (Pexels, banco de reuniao/escritorio — NAO e "o time real da Norte",
 * e ambiente generico de trabalho, mesmo criterio de honestidade ja usado em
 * Depoimento pra nao fingir cliente/pessoa que nao existe). Omitido = fundo
 * preto original, identico a antes desta rodada.
 *
 * DECISAO DE CTA (documentada, ver Checklist #2 da skill): este e o UNICO
 * tipo do catalogo SEM CtaBand cheio. Pesquisa 2026 e a logica do formato
 * concordam — bastidores constroi confianca pro fundo de funil, forcar CTA
 * agressivo aqui contradiz o proprio genero (autenticidade > venda). O link
 * da bio aparece só como linha discreta, nao como banda de destaque.
 *
 * `visualStyle` (Round B, 2026-09-01, opcional — ver src/lib/visualStyles.ts):
 * sem `theme` (sempre preto/primaryDark/accent fixo) — textura usa a
 * opacidade padrao do Frame. DECISAO DOCUMENTADA (julgamento pedido pela
 * tarefa): no `manifesto`, o titulo/afirmacao central SEMPRE mantem
 * bold+itálico (voz de "citacao de principio" ja hardcoded) — visualStyle
 * so varia tamanho/letter-spacing/espacamento/textura/gráfico de apoio,
 * nunca a fonte do manifesto. Forcar o `headlineWeight` bruto de um preset
 * (ex. boldTipografico removeria o itálico) descaracterizaria o tom que
 * define esse variant desde a criacao. `regraDaCasa` NAO tem essa
 * restricao (titulo ja e bold reto, sem itálico) — headlineStyle se aplica
 * ali sem ressalva.
 */
const BASE_TEXTURE_OPACITY = 0.045;

export const Bastidores: React.FC<BastidoresData> = ({
  eyebrow = 'Como trabalhamos',
  titulo,
  principios,
  numero,
  corpo,
  variant = 'manifesto',
  visualStyle,
  foto,
  fotoPosition,
}) => {
  const vs = visualStyle ? getVisualStyle(visualStyle) : null;
  const tex = resolveTexture(vs, BASE_TEXTURE_OPACITY);
  const graphics = showGraphicSupport(vs);

  if (variant === 'regraDaCasa') {
    const tituloStyleRegra = headlineStyle(vs, 50, -1, 1.16);
    const cardVariantRegra = resolveCardStyle(vs, 'bezel');
    return (
      <Frame background={colors.primaryDark} wordmarkColor={colors.white} texture={tex.enabled} textureOpacity={tex.opacity}>
        {graphics ? (
          <>
            <div style={{position: 'absolute', left: -110, bottom: -90}}>
              <GhostBars color={colors.white} opacity={0.08} width={620} />
            </div>
            <div style={{position: 'absolute', right: -70, top: -60}}>
              <GhostCheck color={colors.white} opacity={0.05} size={320} />
            </div>
          </>
        ) : null}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            padding: '0 72px 200px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: scaleSpacing(vs, 30, {min: 18, max: 42}),
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
            <IconCompass size={30} color={colors.accent} strokeWidth={2.2} />
            <span
              style={{
                fontSize: 21,
                fontWeight: 700,
                letterSpacing: 2,
                color: colors.accent,
                textTransform: 'uppercase',
              }}
            >
              {eyebrow}
            </span>
          </div>

          <SurfaceCard
            variant={cardVariantRegra}
            shellColor="rgba(255,255,255,0.06)"
            coreColor="rgba(255,255,255,0.1)"
            borderColor={cardVariantRegra === 'outline' ? 'rgba(255,255,255,0.35)' : undefined}
          >
            <div style={{padding: '40px 38px'}}>
              {numero ? (
                <span
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    letterSpacing: 1.5,
                    color: 'rgba(255,255,255,0.55)',
                    textTransform: 'uppercase',
                  }}
                >
                  {numero}
                </span>
              ) : null}
              <h2
                style={{
                  fontSize: tituloStyleRegra.fontSize,
                  fontWeight: tituloStyleRegra.fontWeight,
                  fontStyle: tituloStyleRegra.fontStyle,
                  color: colors.white,
                  lineHeight: tituloStyleRegra.lineHeight,
                  letterSpacing: tituloStyleRegra.letterSpacing,
                  margin: '14px 0 0',
                }}
              >
                {titulo}
              </h2>
              {corpo ? (
                <p
                  style={{
                    fontSize: 28,
                    fontWeight: 400,
                    color: 'rgba(255,255,255,0.8)',
                    lineHeight: 1.42,
                    margin: '20px 0 0',
                  }}
                >
                  {corpo}
                </p>
              ) : null}
            </div>
          </SurfaceCard>
        </div>

        <div style={{position: 'absolute', left: 72, right: 72, bottom: 130, textAlign: 'center'}}>
          <span style={{fontSize: 20, fontWeight: 400, fontStyle: 'italic', color: 'rgba(255,255,255,0.55)'}}>
            Bastidores da Norte — link na bio
          </span>
        </div>
      </Frame>
    );
  }

  // variant === 'manifesto' (default)
  // Titulo mantem SEMPRE bold+italic (ver decisao documentada no topo do
  // arquivo) — so tamanho/letter-spacing vem do preset.
  const tituloStyleManifestoRaw = headlineStyle(vs, 58, -1, 1.16);
  // DECISAO original: titulo do manifesto mantem SEMPRE bold+italic (voz de
  // "afirmacao falada"). EXCECAO (2026-09-05, editorialClaude): a referencia
  // real (@claudeai) usa serifada reta, nao italico — forcar italico em cima
  // da serifada destruiria o efeito que o preset busca, entao esse preset
  // especifico usa o peso/estilo que o proprio preset ja define.
  const minimal = isMinimalDecoration(vs);
  const tituloStyleManifesto = minimal
    ? tituloStyleManifestoRaw
    : {...tituloStyleManifestoRaw, fontWeight: 700 as const, fontStyle: 'italic' as const};
  const temFoto = Boolean(foto);
  // papelQuente/editorialClaude (canvasOverride/canvasPalette) só fazem sentido
  // sem foto — com foto o canvas já é a imagem, não a cor de fundo (mesma
  // regra do Depoimento/DadoVsAchismo). `seed` (titulo) varia a cor da
  // palette de forma determinística entre peças diferentes.
  const canvas = temFoto ? {background: colors.black, ink: colors.white} : resolveCanvas(vs, colors.black, colors.white, titulo);
  const inkSoft = (a: number) => (canvas.ink === colors.white ? `rgba(255,255,255,${a})` : `rgba(20,20,19,${a})`);
  return (
    <Frame
      background={canvas.background}
      wordmarkColor={canvas.ink}
      texture={temFoto ? false : tex.enabled}
      textureOpacity={tex.opacity}
    >
      {temFoto ? (
        // overlay 'full' (nao 'topAndBottom'): titulo+principios do manifesto
        // ocupam justamente a faixa CENTRAL do frame — 'topAndBottom' deixa o
        // meio respirar livre por design (bom pra foto sem texto no meio,
        // como VitrineProduto/DicaPratica), mas aqui isso derrubou o
        // contraste do texto (achado real de QA, Regra Inviolável #1).
        // 'full' escurece uniforme + textShadow no titulo/principios abaixo
        // garante legibilidade em qualquer trecho da foto.
        <PhotoBackground src={foto!} position={fotoPosition ?? 'center'} overlay="full" strength={1.3} />
      ) : null}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          // Gap 4 do QA rigoroso 2026-09-05 (comparação vs. "How we study
          // Claude"/"Safeguards 101", grid-1 real do @claudeai): a referência
          // ancora eyebrow+headline+apoio no TOPO do card, sobrando espaço
          // embaixo pra ilustração/respiro — nunca centraliza o bloco de
          // texto no meio do frame inteiro. `justifyContent: 'center'`
          // deixava um vazio enorme entre o texto e o rodapé fixo; minimal
          // ancora no topo (padding-top maior, sem centralizar) pra igualar
          // a densidade texto-por-área da referência.
          padding: minimal ? '220px 72px 200px' : '0 72px 200px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: minimal ? 'flex-start' : 'center',
          gap: scaleSpacing(vs, 40, {min: 26, max: 54}),
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
          {/* Selo circular de ícone — decoração de apoio que a referência real
              (@claudeai) não usa; suprimido em editorialClaude (2026-09-05). */}
          {!minimal ? (
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                border: `2px solid ${inkSoft(0.25)}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <IconCompass size={26} color={canvas.ink} strokeWidth={2} />
            </div>
          ) : null}
          <span
            style={{
              fontSize: 21,
              fontWeight: 700,
              letterSpacing: 2,
              color: inkSoft(0.65),
              textTransform: 'uppercase',
            }}
          >
            {eyebrow}
          </span>
        </div>

        <h2
          style={{
            fontSize: tituloStyleManifesto.fontSize,
            fontWeight: tituloStyleManifesto.fontWeight,
            fontStyle: tituloStyleManifesto.fontStyle,
            fontFamily: tituloStyleManifesto.fontFamily,
            color: canvas.ink,
            lineHeight: tituloStyleManifesto.lineHeight,
            letterSpacing: tituloStyleManifesto.letterSpacing,
            margin: 0,
            maxWidth: 900,
            textShadow: temFoto ? '0 8px 28px rgba(0,0,0,0.6)' : undefined,
          }}
        >
          {titulo}
        </h2>

        {principios && principios.length > 0 ? (
          <div style={{display: 'flex', flexDirection: 'column', gap: 20, marginTop: 8}}>
            {principios.slice(0, 3).map((p, i) => (
              <div key={i} style={{display: 'flex', alignItems: 'flex-start', gap: 14}}>
                <div style={{marginTop: 3}}>
                  <IconCheck size={20} color={colors.accent} strokeWidth={3} />
                </div>
                <span
                  style={{
                    fontSize: 26,
                    fontWeight: 400,
                    color: inkSoft(0.85),
                    lineHeight: 1.32,
                    textShadow: temFoto ? '0 4px 16px rgba(0,0,0,0.7)' : undefined,
                  }}
                >
                  {p}
                </span>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {graphics ? (
        <>
          <div style={{position: 'absolute', right: -90, bottom: -70}}>
            <GhostBars color={canvas.ink} opacity={0.07} width={560} />
          </div>
          <div style={{position: 'absolute', left: -60, top: -50}}>
            <GhostCheck color={canvas.ink} opacity={0.04} size={280} />
          </div>
        </>
      ) : null}

      {/* Ilustração própria à mão (editorialClaude) — diagrama de nós/setas,
          reforçando "processo" (o eyebrow "Como trabalhamos" é literalmente
          sobre isso). Só sem foto — com foto o canto já está ocupado pelo
          overlay/textShadow do título.
          Gap 4 do QA rigoroso 2026-09-05 (comparação vs. "Safeguards 101",
          grid-2 real do @claudeai): a referência usa esse ícone GRANDE
          preenchendo o vazio abaixo do texto, não um acento pequeno de
          canto — corrigido aumentando o tamanho (180→320) e movendo pra
          baixo do bloco de texto, ocupando o meio do card que antes ficava
          vazio, em vez de duplicar como decoração de canto solta. */}
      {minimal && !temFoto ? (
        <div style={{position: 'absolute', right: 64, top: 700}}>
          <IllustrationFluxo color={canvas.ink} opacity={canvas.ink === colors.white ? 0.85 : 0.8} size={320} />
        </div>
      ) : null}

      <div style={{position: 'absolute', left: 72, right: 72, bottom: 130, textAlign: 'left'}}>
        <span style={{fontSize: 20, fontWeight: 400, fontStyle: 'italic', color: inkSoft(0.5)}}>
          Assim a gente trabalha — link na bio
        </span>
      </div>
    </Frame>
  );
};

export const bastidoresDefaultProps: BastidoresData = {
  titulo: 'Não recomendamos nada antes de ver o dado.',
  principios: [
    'Todo diagnóstico começa medindo o que já existe, não achando.',
    'Nenhuma solução entra sem um número que comprove que ela resolveu.',
    'Se o processo não é repetível, não é método — é sorte.',
  ],
};
