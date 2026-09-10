import React from 'react';
import {AbsoluteFill, staticFile} from 'remotion';
import {ensureSansLoaded, ensureNewsreaderLoaded, FONT_SANS, FONT_SERIF_ROTAS} from '../lib/fonts';
import {GridTexture} from '../lib/GridTexture';
import {Mascote} from '../lib/Mascote';
import {productColors, neutral, brand} from '../lib/themes';
import {GeometricDiagram} from '../lib/GeometricDiagram';
import {MiniBarCompare} from '../lib/MiniChart';
import {PostitCard, HandDrawnAnnotation} from '../lib/RotasKit';
import {BrowserFrame, PhoneFrame} from '../lib/DeviceFrame';

/**
 * PILARES — carrossel fixado (pinned post) #1, apresentação institucional da
 * NTB (2026-09-09). Formato NOVO — nem "Rotas" (sem trilho/rail/cotovelo/
 * convergência de trilhas: não é conteúdo de caminhos paralelos) nem "Vozes"
 * (sem foto: é apresentação de marca, não documental/humano). Mais próximo em
 * espírito de "Argumento" (sequência sem trilho, tipografia como protagonista)
 * mas com um mecanismo de composição próprio no slide 1 (ver abaixo).
 *
 * PELE VISUAL — mesma pele real da marca usada em Rotas/Vozes/Argumento (NÃO
 * reinventar): fundo bege (`neutral.begeClaro`) em todo slide, `GridTexture`
 * sutil, Newsreader (headline/ênfase itálica) + Atkinson Hyperlegible (rótulo/
 * corpo), cor de produto SÓ como detalhe (tag pequena, borda, ponto — nunca
 * bloco de cor cobrindo o slide). Confirmado contra `RotasCapa.png` e
 * `ArgumentoFechamento.png` antes de desenhar.
 *
 * POR QUE "PILARES": nome escolhido porque o coração do slide 1 é literalmente
 * um diagrama de pilares/palavras orbitando a ideia central — não é genérico
 * ("Apresentação" serviria pra qualquer post institucional futuro; "Pilares"
 * documenta a decisão de composição específica desta peça).
 *
 * RESOLUÇÃO DAS 6 PALAVRAS-PILAR (slide 1) — 2ª rodada (2026-09-09, correção
 * do fundador): a 1ª tentativa (diagrama hub-and-spoke, linhas finas saindo
 * de um ponto central até cada palavra) foi REJEITADA — o fundador mandou
 * olhar carrosséis REAIS (não só a foto de perfil) de @claudeai e @toasttab
 * antes de tentar de novo. Achado concreto: o Claude nunca usa elemento
 * solto flutuando no vazio — o vazio é sempre ANCORADO por um cartão
 * emoldurado (cantos arredondados, sombra sutil) ou por um badge preso no
 * canto do frame; o diagrama fino de linhas lia como "gráfico genérico", não
 * como o tratamento editorial confiante da referência. O Toast, por sua vez,
 * usa textura de papel/impresso tátil de verdade — que a Norte já tem, no
 * papel kraft rasgado dos post-its de `Rotas` (`PostitCard`/`tornClipPath`
 * em `RotasKit.tsx`), só não tinha sido reaproveitado aqui ainda.
 *
 * 3ª rodada (2026-09-09, 2ª correção do fundador): a versão de chips pequenos
 * numa fileira fina "continuava fraca/genérica — justamente a capa devia ter
 * mais impacto". Comparação direta com `InstitucionalCapa.png` (peça já
 * aprovada no catálogo) mostrou o que faltava: lá os cards de papel kraft são
 * GRANDES (não chips de 1 linha), dominam os 2/3 SUPERIORES do frame, cada um
 * carrega um mini-ícone/gráfico de verdade (não só texto), e o título grande
 * vem DEPOIS, como conclusão — não é o primeiro elemento do slide.
 *
 * CORREÇÃO FINAL: `PilaresCapa` agora usa os componentes REAIS de Rotas
 * (`PostitCard`, `HandDrawnAnnotation`, importados de `RotasKit.tsx`, não
 * recriados) num layout bespoke — SEM `RotasCapaShell`/`TrackRail`
 * (deliberado: Pilares não tem trilhas paralelas, então as linhas de trilho
 * coloridas do shell genérico de Rotas não fazem sentido aqui; só o
 * mecanismo de card+anotação foi reaproveitado, não o mecanismo de trilha).
 * As 6 palavras-pilar viraram 4 CARDS GRANDES (pedido do fundador: "menos
 * itens, maiores") agrupando por afinidade: Estratégia+Processos → "Gestão"
 * (ícone `GeometricDiagram`, o mesmo tipo/estilo usado no card "Registra" do
 * Institucional — recheio de CONCEITO/PROCESSO); Vendas+Estoque → "Operação"
 * (ícone novo `DuoOrbitIcon`, 2 círculos sobrepostos nas cores reais dos 2
 * produtos — metáfora abstrata de "operação real acontecendo", não
 * organograma); Tecnologia sozinha (ícone novo `NetworkIcon`, 3 nós
 * conectados, traço único monocromático — mesmo princípio visual de
 * `EditorialIcons.tsx`); Controle sozinho (`MiniBarCompare`, recheio de
 * DADO/MÉTRICA, mesmo componente e mesma lógica do card "Mede" do
 * Institucional: "com controle" vs. "no achismo", sem inventar número real).
 * Todas as 6 palavras originais continuam presentes no SUBTÍTULO em prosa
 * (abaixo do título), então nada do briefing foi perdido — só a
 * REPRESENTAÇÃO VISUAL do slide 1 ficou mais forte com 4 elementos grandes
 * em vez de 6 pequenos.
 *
 * Cards ocupam `cardsAreaHeight=610`, mesmas posições/proporções do grid 2×2
 * já validado em `InstitucionalCapa` (2 linhas, leve rotação/desalinhamento
 * orgânico, alguns se sobrepondo em profundidade). `HandDrawnAnnotation`
 * ("nada roda sozinho", itálico com seta apontando pro 1º card) dá contexto
 * no topo, mesmo padrão do Institucional. Título grande (peso misto
 * romano+bold, mantido da rodada anterior) vem DEPOIS dos cards, como
 * conclusão — ordem visual invertida conforme pedido.
 *
 * "ECOSSISTEMA DE 4 PARTES" (slide 3): 4 cards de papel (mesmo `PaperCard` do
 * Argumento: fundo claro, acento de cor SÓ na borda esquerda, nunca bloco
 * cheio) em grade 2×2, conectados por um laço fechado (SVG, path arredondado
 * ligando os 4 cantos) atrás deles, bem sutil — sugere "conjunto conectado"
 * sem virar organograma/fluxograma de sistema. NTB Vendas e NTB Estoque usam
 * as cores reais dos produtos (`productColors.vendas` laranja,
 * `productColors.estoque` teal); Gestão e Processos / Tecnologia e UX usam
 * tinta neutra e a cor de marca (`brand.primary`) respectivamente — só a NTB
 * tem cor de produto de verdade, os outros 2 pilares são conceituais.
 *
 * PRINTS REAIS (correção do fundador, 2026-09-09 — sobrepõe o pedido original
 * de marketing de "evitar tela de sistema"): "está muito vazio, muito
 * branco, quero mais informações, até informações visuais, como sites". Os
 * cards NTB Vendas e NTB Estoque cresceram (h=260, vs. 168 dos outros 2) e
 * ganharam uma prévia de tela real emoldurada (`PhoneFrame`/`BrowserFrame` de
 * `lib/DeviceFrame.tsx`, já usados no formato Etapas — reaproveitados, não
 * recriados), levemente rotacionada como mockup, ao lado do rótulo — nunca a
 * screenshot crua ocupando o card. Fontes escolhidas por segurança de dado:
 * `vendas-mobile.png` (landing "Cardápio Digital", genérica, sem cliente
 * específico) e `home-desktop.png` (NTB Estoque logado como conta QA "Claude
 * QA", não cliente real — preferida a `ntb-estoque-dashboard-donana-brotas.jpg`
 * justamente pra não expor nome de loja nem número alarmante de um cliente
 * específico). Gestão e Processos / Tecnologia e UX continuam só texto —
 * conceituais, sem tela pra mostrar.
 *
 * FECHAMENTO: Mascote real (`Mascote`, foguete extraído do bundle do site)
 * pequeno como assinatura — mesmo padrão de halo suave atrás dele que
 * `ArgumentoFechamento`/`RotasFechamentoShell` usam. Faz sentido aqui: é
 * literalmente a peça de apresentação institucional da marca, o lugar mais
 * natural pra assinatura do mascote aparecer.
 *
 * O QUE NÃO ENTRA (regra do briefing, checada slide a slide): nenhuma menção
 * a Omie, nenhum número/estatística inventada, nenhuma ilustração de
 * escritório/tela de sistema — só tipografia, cor como detalhe e o diagrama
 * geométrico abstrato do slide 1/3.
 */

const INK = neutral.quasePreto;
const BEGE = neutral.begeClaro;

function loadFonts(): void {
  ensureSansLoaded();
  ensureNewsreaderLoaded();
}

// ---------------------------------------------------------------------------
// Peças pequenas reaproveitadas do mesmo princípio visual do Argumento
// (recriadas aqui, não importadas — mesma decisão de isolamento por peça já
// usada entre Rotas/Argumento, evita acoplamento entre formatos distintos).
// ---------------------------------------------------------------------------
const Overline: React.FC<{children: React.ReactNode; color: string}> = ({children, color}) => (
  <div
    style={{
      fontFamily: FONT_SANS,
      fontWeight: 700,
      fontSize: 14,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color,
    }}
  >
    {children}
  </div>
);

const GlyphMark: React.FC<{children: React.ReactNode; right?: number; bottom?: number; size?: number}> = ({
  children,
  right = 40,
  bottom = -56,
  size = 380,
}) => (
  <div
    style={{
      position: 'absolute',
      right,
      bottom,
      fontFamily: FONT_SERIF_ROTAS,
      fontWeight: 400,
      fontSize: size,
      lineHeight: 1,
      color: INK,
      opacity: 0.05,
      userSelect: 'none',
    }}
  >
    {children}
  </div>
);

// ---------------------------------------------------------------------------
// Slide 1 — Capa: 4 cards de papel kraft GRANDES (agrupando as 6 palavras-
// pilar por afinidade) dominando os 2/3 superiores, título grande depois.
// ---------------------------------------------------------------------------

/** Vendas + Estoque fundidos num único ícone: 2 círculos sobrepostos nas
 * cores reais dos 2 produtos — metáfora abstrata de "operação real
 * acontecendo junto", não organograma/tela de sistema. */
const DuoOrbitIcon: React.FC<{colorA: string; colorB: string; size?: number}> = ({colorA, colorB, size = 116}) => (
  <svg width={size} height={size * 0.62} viewBox="0 0 190 118" fill="none">
    <circle cx="74" cy="59" r="50" stroke={colorA} strokeWidth={11} />
    <circle cx="126" cy="59" r="50" stroke={colorB} strokeWidth={11} />
  </svg>
);

/** Tecnologia: 3 nós conectados, traço único monocromático — mesmo princípio
 * de `EditorialIcons.tsx` (1 traço contínuo, sem sketch trêmulo), abstrato o
 * bastante pra não virar diagrama de sistema. */
const NetworkIcon: React.FC<{color: string; size?: number}> = ({color, size = 108}) => {
  const p: Array<[number, number]> = [
    [size * 0.5, size * 0.1],
    [size * 0.12, size * 0.86],
    [size * 0.88, size * 0.86],
  ];
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <path
        d={`M ${p[0][0]} ${p[0][1]} L ${p[1][0]} ${p[1][1]} L ${p[2][0]} ${p[2][1]} Z`}
        stroke={color}
        strokeWidth={size * 0.075}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {p.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={size * 0.08} fill={color} />
      ))}
    </svg>
  );
};

export const PilaresCapa: React.FC = () => {
  loadFonts();
  return (
    <AbsoluteFill style={{background: BEGE}}>
      <GridTexture id="grid-pilares-capa" color={INK} opacity={0.09} />
      <AbsoluteFill style={{padding: 64}}>
        <Overline color={neutral.cinzaEscuro}>Norte Para Negócios</Overline>

        <div style={{position: 'relative', height: 610, marginTop: 100}}>
          <PostitCard
            label="Gestão"
            caption="Direção clara, sem depender do improviso."
            color={brand.primary}
            rotate={-5}
            x={0}
            y={10}
            width={300}
            clipSeedIndex={0}
          >
            <GeometricDiagram color={brand.primary} width={190} />
          </PostitCard>
          <PostitCard
            label="Operação"
            caption="Vendas e estoque, funcionando juntos."
            color={neutral.cinzaEscuro}
            rotate={4}
            x={470}
            y={40}
            width={300}
            clipSeedIndex={1}
          >
            <DuoOrbitIcon colorA={productColors.vendas} colorB={productColors.estoque} size={190} />
          </PostitCard>
          <PostitCard
            label="Tecnologia"
            caption="Ferramenta que apoia, não trava."
            color={neutral.cinzaMedio}
            rotate={-3}
            x={20}
            y={330}
            width={300}
            clipSeedIndex={2}
          >
            <NetworkIcon color={neutral.cinzaMedio} size={108} />
          </PostitCard>
          <PostitCard
            label="Controle"
            caption="Decide com dado, não com achismo."
            color={productColors.avalia}
            rotate={5}
            x={490}
            y={300}
            width={300}
            clipSeedIndex={3}
          >
            <MiniBarCompare color={productColors.avalia} labelTop="Com controle" labelBottom="No achismo" width={190} />
          </PostitCard>
          <HandDrawnAnnotation text="nada roda sozinho" />
        </div>

        <div style={{height: 90}} />

        <h1
          style={{
            fontFamily: FONT_SERIF_ROTAS,
            fontWeight: 400,
            fontSize: 60,
            lineHeight: 1.12,
            letterSpacing: '-0.01em',
            color: INK,
            margin: 0,
            maxWidth: 900,
          }}
        >
          A rotina real do negócio pede mais do que{' '}
          <span style={{fontWeight: 700}}>um sistema.</span>
        </h1>
        <div style={{height: 18}} />
        <p
          style={{
            fontFamily: FONT_SANS,
            fontWeight: 400,
            fontSize: 20,
            lineHeight: 1.5,
            color: neutral.cinzaEscuro,
            opacity: 0.86,
            margin: 0,
            maxWidth: 780,
          }}
        >
          Estratégia, processos, vendas, estoque, tecnologia e controle — juntos, não isolados.
        </p>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// Slide 2 — Problema: conexão quebrada entre 3 pontos (Vendas/Estoque/
// Processos), diagrama abstrato — nunca ilustração de tela/sistema.
// ---------------------------------------------------------------------------
const NODE_Y = 970;
const NODES: Array<{x: number; label: string; color: string}> = [
  {x: 220, label: 'VENDAS', color: productColors.vendas},
  {x: 540, label: 'ESTOQUE', color: productColors.estoque},
  {x: 860, label: 'PROCESSOS', color: neutral.cinzaMedio},
];

export const PilaresProblema: React.FC = () => {
  loadFonts();
  return (
    <AbsoluteFill style={{background: BEGE, padding: 80, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
      <GridTexture id="grid-pilares-problema" color={INK} opacity={0.09} />
      <GlyphMark right={-40} bottom={140} size={340}>
        ≠
      </GlyphMark>

      <div style={{position: 'relative'}}>
        <Overline color={neutral.cinzaEscuro}>O que acontece sem conexão</Overline>
        <div style={{height: 26}} />
        <h1
          style={{
            fontFamily: FONT_SERIF_ROTAS,
            fontWeight: 400,
            fontSize: 46,
            lineHeight: 1.22,
            letterSpacing: '-0.01em',
            color: INK,
            margin: 0,
            maxWidth: 860,
          }}
        >
          Quando vendas, estoque e processos não se conectam,{' '}
          <span style={{fontStyle: 'italic'}}>o retrabalho aparece e a operação perde controle.</span>
        </h1>
      </div>

      {/* diagrama: 3 nós, conexão quebrada entre o 1º e o 2º par */}
      <svg width="100%" height="60" style={{position: 'absolute', left: 0, top: NODE_Y - 30, overflow: 'visible'}}>
        <line x1={NODES[0].x} y1={0} x2={NODES[1].x - 26} y2={0} stroke={neutral.cinzaClaro} strokeWidth={1.5} strokeDasharray="2 10" opacity={0.7} />
        <line x1={NODES[1].x + 26} y1={0} x2={NODES[2].x} y2={0} stroke={neutral.cinzaClaro} strokeWidth={1.5} strokeDasharray="2 10" opacity={0.7} />
        {/* marca de ruptura entre estoque e processos */}
        <line x1={(NODES[1].x + NODES[2].x) / 2 - 8} y1={-9} x2={(NODES[1].x + NODES[2].x) / 2 + 8} y2={9} stroke={brand.accent} strokeWidth={2.5} opacity={0.75} />
        <line x1={(NODES[1].x + NODES[2].x) / 2 - 8} y1={9} x2={(NODES[1].x + NODES[2].x) / 2 + 8} y2={-9} stroke={brand.accent} strokeWidth={2.5} opacity={0.75} />
      </svg>
      {NODES.map((n, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: n.x,
            top: NODE_Y,
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <div style={{width: 14, height: 14, borderRadius: '50%', background: n.color}} />
          <span
            style={{
              fontFamily: FONT_SANS,
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: '0.08em',
              color: neutral.cinzaEscuro,
            }}
          >
            {n.label}
          </span>
        </div>
      ))}
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// Slide 3 — Solução: NTB como ecossistema de 4 partes, grade 2x2 conectada
// por um laço fechado sutil (não organograma de sistema).
// ---------------------------------------------------------------------------
const ECO_ROW1_H = 260;
const ECO_ROW2_Y = 40 + ECO_ROW1_H + 36;
const ECOSYSTEM = [
  {
    label: 'NTB Vendas',
    caption: 'Pedidos, mesas e pagamento.',
    color: productColors.vendas,
    x: 178,
    y: 40,
    w: 340,
    h: ECO_ROW1_H,
    preview: 'vendas' as const,
  },
  {
    label: 'NTB Estoque',
    caption: 'Estoque e reposição sob controle.',
    color: productColors.estoque,
    x: 562,
    y: 40,
    w: 340,
    h: ECO_ROW1_H,
    preview: 'estoque' as const,
  },
  {label: 'Gestão e Processos', caption: undefined, color: neutral.cinzaMedio, x: 178, y: ECO_ROW2_Y, w: 340, h: 168, preview: null},
  {label: 'Tecnologia e UX', caption: undefined, color: brand.primary, x: 562, y: ECO_ROW2_Y, w: 340, h: 168, preview: null},
];

/** Prévia de tela real, emoldurada (mockup de app/browser) — NUNCA a
 * screenshot crua. Correção do fundador (2026-09-09): NTB Vendas/Estoque
 * precisam de prova visual, não só rótulo em papel. */
const EcoPreview: React.FC<{kind: 'vendas' | 'estoque'}> = ({kind}) =>
  kind === 'vendas' ? (
    <div style={{transform: 'rotate(-4deg)'}}>
      <PhoneFrame screenshot={staticFile('screenshots/vendas-mobile.png')} width={94} cropHeight={0.62} />
    </div>
  ) : (
    <div style={{transform: 'rotate(3deg)'}}>
      <BrowserFrame
        screenshot={staticFile('screenshots/home-desktop.png')}
        width={172}
        sourceWidth={1425}
        sourceHeight={1624}
        cropHeight={0.42}
        addressLabel="app.ntbestoque.com.br"
      />
    </div>
  );

const EcoCard: React.FC<{label: string; caption?: string; color: string; preview: 'vendas' | 'estoque' | null}> = ({
  label,
  caption,
  color,
  preview,
}) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      background: '#fffdf7',
      borderLeft: `6px solid ${color}`,
      boxShadow: '0 10px 26px rgba(10,10,10,0.10)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: preview ? 'space-between' : 'flex-start',
      padding: preview ? '0 22px 0 28px' : '0 28px',
      gap: 14,
    }}
  >
    <div style={{display: 'flex', flexDirection: 'column', gap: 10, flexShrink: 0}}>
      <span
        style={{
          fontFamily: FONT_SERIF_ROTAS,
          fontWeight: 400,
          fontSize: 26,
          lineHeight: 1.2,
          color: INK,
        }}
      >
        {label}
      </span>
      {caption && (
        <span
          style={{
            fontFamily: FONT_SANS,
            fontWeight: 400,
            fontSize: 15,
            lineHeight: 1.4,
            color: neutral.cinzaEscuro,
            opacity: 0.78,
            maxWidth: 150,
          }}
        >
          {caption}
        </span>
      )}
    </div>
    {preview && <EcoPreview kind={preview} />}
  </div>
);

export const PilaresSolucao: React.FC = () => {
  loadFonts();
  return (
    <AbsoluteFill style={{background: BEGE, padding: 80, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
      <GridTexture id="grid-pilares-solucao" color={INK} opacity={0.09} />
      <GlyphMark right={60} bottom={40} size={400}>
        +
      </GlyphMark>
      <div style={{height: 24}} />
      <Overline color={brand.primary}>O que a NTB oferece</Overline>
      <div style={{height: 26}} />
      <h1
        style={{
          fontFamily: FONT_SERIF_ROTAS,
          fontWeight: 400,
          fontSize: 46,
          lineHeight: 1.22,
          letterSpacing: '-0.01em',
          color: INK,
          margin: 0,
          maxWidth: 820,
        }}
      >
        A NTB une <span style={{fontStyle: 'italic'}}>consultoria, processos e tecnologia</span> para
        organizar a operação.
      </h1>

      <div style={{position: 'relative', width: 920, height: ECO_ROW2_Y + 168, marginTop: 64}}>
        <svg width="920" height={ECO_ROW2_Y + 168} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
          <rect
            x={140}
            y={20}
            width={640}
            height={ECO_ROW2_Y + 168 - 20 - 56}
            rx={28}
            fill="none"
            stroke={neutral.cinzaClaro}
            strokeWidth={1.5}
            strokeDasharray="1 12"
            opacity={0.7}
          />
        </svg>
        {ECOSYSTEM.map((c, i) => (
          <div key={i} style={{position: 'absolute', left: c.x, top: c.y, width: c.w, height: c.h}}>
            <EcoCard label={c.label} caption={c.caption} color={c.color} preview={c.preview} />
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// Slide 4 — Fechamento: CTA + Mascote pequeno como assinatura de marca.
// ---------------------------------------------------------------------------
export const PilaresFechamento: React.FC = () => {
  loadFonts();
  return (
    <AbsoluteFill
      style={{
        background: BEGE,
        padding: '96px 80px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <GridTexture id="grid-pilares-fechamento" color={INK} opacity={0.09} />
      <div style={{position: 'relative'}}>
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: 340,
            height: 340,
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${brand.primary}22 0%, ${productColors.vendas}18 55%, ${brand.primary}00 78%)`,
          }}
        />
        <Mascote size={140} style={{position: 'relative'}} />
      </div>
      <div style={{height: 44}} />
      <div style={{position: 'relative'}}>
        <h1
          style={{
            fontFamily: FONT_SERIF_ROTAS,
            fontWeight: 400,
            fontSize: 46,
            lineHeight: 1.24,
            letterSpacing: '-0.01em',
            color: INK,
            margin: 0,
            maxWidth: 780,
          }}
        >
          Sua empresa precisa de{' '}
          <span style={{fontStyle: 'italic'}}>mais clareza para operar melhor?</span>
        </h1>
        <div style={{height: 24}} />
        <p
          style={{
            fontFamily: FONT_SANS,
            fontWeight: 700,
            fontSize: 22,
            color: neutral.cinzaEscuro,
            margin: 0,
          }}
        >
          Conheça a NTB.
        </p>
        <div style={{height: 20}} />
        <Overline color={neutral.cinzaEscuro}>↓ Acesse o link da bio</Overline>
      </div>
    </AbsoluteFill>
  );
};

export const pilaresCapaDefaultProps = {};
export const pilaresProblemaDefaultProps = {};
export const pilaresSolucaoDefaultProps = {};
export const pilaresFechamentoDefaultProps = {};
