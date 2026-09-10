import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {ensureFontsLoaded, FONT_SANS, FONT_SERIF} from '../lib/fonts';
import {ConnectorLine} from '../lib/ConnectorLine';
import {GridTexture} from '../lib/GridTexture';
import {BoxOutIcon} from '../lib/GeometricIcon';
import {GeometricDiagram} from '../lib/GeometricDiagram';
import {BrowserFrame, ntbEstoqueProdutoScreenshot} from '../lib/DeviceFrame';
import {neutral, productColors, spacing} from '../lib/themes';

/**
 * Carrossel "Como um estoque organizado se move" — NTB Estoque, 6 slides
 * (1080x1350). Conteúdo puramente educacional (voice.md), tom contemplativo:
 * mostra as etapas de um estoque bem-feito, não uma lista de erros/dores.
 *
 * REDIRECIONAMENTO DO FUNDADOR (2026-09-05, transcrição de voz): a peça
 * original era "3 sinais de que seu estoque está furado" (tom de alerta/dor,
 * ramificação de 3 problemas paralelos) — o fundador rejeitou esse tom.
 * Ele quer algo "bonito, que eu me sinta confortável de ver no perfil":
 * um fluxo SEQUENCIAL calmo (entrada → conferência → saída), inspirado nas
 * capas cor-chapada do "Anthropic Insights" e no tom documental/sem-tensão
 * do carrossel "The gardeners rewilding Melbourne" (ver
 * exemplos-formatos-2026-09-04.md). A ConnectorLine muda de papel: em vez
 * de bifurcar 3 problemas, ela percorre 1 fluxo único de etapas.
 *
 * RODADA 4 (2026-09-05, mesmo dia) — diagnóstico "tá sinceramente sem graça":
 * até a rodada 3, todo slide repetia a MESMA fórmula (ícone+título+parágrafo
 * em cor chapada), 5-6x seguidas — limpo mas monótono. Os carrosséis reais
 * do @claudeai nunca repetem layout entre slides. Fix: cada slide agora usa
 * um formato DIFERENTE do repertório (capa flat / foto+frase / diagrama /
 * afirmação flat / print+citação / tipografia grande), preservando conteúdo
 * e a ConnectorLine como fio condutor. Ver CATALOGO.md pra avaliação slide a
 * slide.
 *
 * RODADA 5 (2026-09-05, mesmo dia) — CORREÇÃO DA CAPA: nas 4 rodadas
 * anteriores a Capa nunca mudou (só texto preto bold em fundo bege liso) —
 * erro real, deixado intocado por preguiça de mexer em algo "que já
 * funcionava". Nenhuma capa forte de carrossel real do @claudeai é só texto
 * em fundo liso (ver exemplos-formatos-2026-09-04.md: Campus Ambassador tem
 * ilustração; Anthropic Insights tem ilustração grande; Garvan/gardeners e
 * "400k sessions" usam FOTO/mascote em tela cheia). Fix: Capa agora é foto
 * real em tela cheia (`corredor-empilhadeira-estoque.jpg`, a única foto de
 * estoque disponível — e a mais impactante: corredor simétrico profundo,
 * pessoas minúsculas dão escala, luz forte ao fundo) com scrim escuro e
 * título grande sobreposto — mesmo tratamento que já validou bem em Entrada
 * nas rodadas 3-4.
 *
 * Como a Capa passou a usar a MESMA foto que Entrada usava, Entrada foi
 * redesenhada pra não repetir o golpe visual "foto em tela cheia + scrim +
 * frase" logo em seguida — ver comentário em `EtapasEntrada` abaixo.
 *
 * Estrutura (Cover/Bridge/CTA aplicado ao tom novo):
 * 1. Capa — RODADA 5: foto real em tela cheia (corredor de estoque) + scrim
 *    + título grande serifado sobreposto. Overline "NTB ESTOQUE" no canto.
 * 2. Etapa 1 — Entrada. RODADA 5: deixa de ser foto em tela cheia (agora é
 *    a Capa) e vira fundo bege liso + card retangular com a MESMA foto
 *    recortada em detalhe (moldura fina, como um "documento/prova visual"),
 *    ecoando a moldura de navegador da Prova (slide 5) — mesma família de
 *    "evidência emoldurada", mas com foto em vez de screenshot.
 * 3. Etapa 2 — Conferência. Rodada 4: sai do padrão ícone-no-topo e ganha
 *    layout próprio centrado num diagrama geométrico de nós conectados.
 * 4. Etapa 3 — Saída e reposição. Mantido no formato "afirmação flat +
 *    ícone" original — é o único slide do carrossel nesse formato agora,
 *    então deixa de ser repetição e passa a ser 1 dos 6 formatos do
 *    repertório.
 * 5. Prova real — print do produto (NTB Estoque) dentro de moldura de
 *    navegador. Rodada 4: adicionada citação/afirmação de apoio abaixo do
 *    print pra resolver o vazio inferior.
 * 6. Fechamento — Rodada 4: citação grande serifada como protagonista
 *    tipográfica (escala bem maior), sem foguete (decisão fechada: mascote
 *    só em vídeo/animação).
 */

const ESTOQUE = productColors.estoque; // #2eb5c3

const Slide: React.FC<{
  background: string;
  gridId: string;
  gridColor?: string;
  children: React.ReactNode;
}> = ({background, gridId, gridColor, children}) => {
  ensureFontsLoaded();
  return (
    <AbsoluteFill style={{background}}>
      <GridTexture id={gridId} color={gridColor ?? neutral.quasePreto} />
      <AbsoluteFill style={{padding: spacing.margin}}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};

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

// Foto real de estoque — única disponível em public/photos/ que retrata o
// tema (corredor de armazém com empilhadeira), usada tanto na Capa (tela
// cheia, enquadramento largo pra escala/drama) quanto, recortada em detalhe,
// na Entrada (ver comentário em `EtapasEntrada`).
const estoqueFoto = staticFile('photos/corredor-empilhadeira-estoque.jpg');

// ---------------------------------------------------------------------------
// Slide 1 — Capa
// ---------------------------------------------------------------------------
/**
 * RODADA 5 — capa reescrita do zero. Antes: só título preto bold em fundo
 * bege liso + linha conectora fina — nenhuma capa forte de carrossel real
 * do @claudeai é só isso (ver auditoria no comentário de topo do arquivo).
 * Agora: foto real em tela cheia (mesma técnica de scrim que já funcionou em
 * Entrada nas rodadas 3-4) + título grande serifado sobreposto + overline no
 * canto. A ConnectorLine deixa de ser o único elemento de peso — a foto é.
 */
export const EtapasCapa: React.FC = () => {
  ensureFontsLoaded();
  return (
    <AbsoluteFill style={{background: neutral.quasePreto}}>
      <Img src={estoqueFoto} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(180deg, rgba(10,10,10,0.50) 0%, rgba(10,10,10,0.22) 30%, rgba(10,10,10,0.30) 55%, rgba(10,10,10,0.88) 100%)',
        }}
      />
      <AbsoluteFill style={{padding: spacing.margin}}>
        <div style={{display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'flex-start'}}>
          <Overline color="rgba(255,255,255,0.92)">NTB Estoque</Overline>
          <div style={{flex: 1}} />
          <h1
            style={{
              fontFamily: FONT_SERIF,
              fontWeight: 700,
              fontSize: 80,
              lineHeight: 1.04,
              letterSpacing: '-0.01em',
              color: '#ffffff',
              margin: 0,
              maxWidth: 860,
              textShadow: '0 2px 24px rgba(0,0,0,0.35)',
            }}
          >
            Como um estoque organizado se move
          </h1>
          <div style={{height: 220}} />
        </div>
      </AbsoluteFill>
      <ConnectorLine mode="start" color="#ffffff" y={1140} />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// Slides de etapa (2, 3, 4)
// ---------------------------------------------------------------------------
const EtapaSlide: React.FC<{
  numero: string;
  titulo: string;
  corpo: string;
  background: string;
  textColor: string;
  nodePosition: number;
  lineColor: string;
  gridId: string;
  gridColor: string;
  topElement?: React.ReactNode;
}> = ({numero, titulo, corpo, background, textColor, nodePosition, lineColor, gridId, gridColor, topElement}) => (
  <Slide background={background} gridId={gridId} gridColor={gridColor}>
    <div style={{display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'flex-start'}}>
      <Overline color={textColor === neutral.quasePreto ? ESTOQUE : 'rgba(255,255,255,0.85)'}>
        {numero}
      </Overline>
      {topElement ? (
        <>
          <div style={{flex: 1}} />
          <div style={{display: 'flex', justifyContent: 'center'}}>{topElement}</div>
          <div style={{flex: 1}} />
        </>
      ) : (
        <div style={{flex: 1}} />
      )}
      <h2
        style={{
          fontFamily: FONT_SERIF,
          fontWeight: 700,
          fontSize: 52,
          lineHeight: 1.1,
          color: textColor,
          margin: 0,
          maxWidth: 760,
        }}
      >
        {titulo}
      </h2>
      <div style={{height: 24}} />
      <p
        style={{
          fontFamily: FONT_SANS,
          fontWeight: 400,
          fontSize: 24,
          lineHeight: 1.5,
          color: textColor,
          opacity: textColor === neutral.quasePreto ? 0.75 : 0.92,
          margin: 0,
          maxWidth: 680,
        }}
      >
        {corpo}
      </p>
      <div style={{height: 220}} />
    </div>
    <ConnectorLine mode="through" color={lineColor} y={1140} nodePosition={nodePosition} />
  </Slide>
);

/**
 * Etapa 1 — Entrada. RODADA 5: a foto em tela cheia foi promovida pra Capa
 * (ver comentário de topo do arquivo — era a peça mais forte disponível e a
 * Capa é o slide que mais precisava disso). Repetir "foto em tela cheia +
 * scrim + frase" aqui, logo depois da Capa, seria o MESMO golpe visual duas
 * vezes seguidas — o problema que a Rodada 4 já tinha corrigido pro resto do
 * carrossel (repertório de 6 formatos, nenhum repetido) voltaria a existir
 * entre os 2 primeiros slides.
 *
 * Fix: Entrada vira fundo bege liso (com GridTexture, como Conferência/
 * Prova/Fechamento) + um CARD emoldurado com a mesma foto, recortada em
 * detalhe (crop mais fechado, focado nas pessoas/empilhadeiras no fim do
 * corredor — não o mesmo enquadramento largo da Capa) — moldura fina escura,
 * como uma peça de evidência/documento, não um pano de fundo. É a mesma
 * ideia de "evidência emoldurada" da `BrowserFrame` da Prova (slide 5), só
 * que com foto em vez de screenshot — dá uma família visual entre os 2
 * slides de "prova real" (físico na Entrada, digital na Prova) sem repetir
 * a composição um do outro nem a da Capa.
 */
export const EtapasEntrada: React.FC = () => {
  ensureFontsLoaded();
  return (
    <Slide background={neutral.begeClaro} gridId="grid-entrada" gridColor={neutral.quasePreto}>
      <div style={{display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'flex-start'}}>
        <Overline color={ESTOQUE}>Etapa 1 · Entrada</Overline>
        <div style={{flex: 1}} />
        <div
          style={{
            border: `1px solid ${neutral.quasePreto}`,
            padding: 10,
            background: '#ffffff',
            alignSelf: 'center',
            boxShadow: '0 18px 40px rgba(10,10,10,0.14)',
          }}
        >
          <div style={{width: 760, height: 480, overflow: 'hidden'}}>
            <Img
              src={estoqueFoto}
              style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 82%'}}
            />
          </div>
        </div>
        <div style={{height: 48}} />
        <h2
          style={{
            fontFamily: FONT_SERIF,
            fontWeight: 700,
            fontSize: 48,
            lineHeight: 1.12,
            color: neutral.quasePreto,
            margin: 0,
            maxWidth: 760,
          }}
        >
          A mercadoria chega e já entra no sistema.
        </h2>
        <div style={{flex: 1}} />
        <div style={{height: 220}} />
      </div>
      <ConnectorLine mode="through" color={ESTOQUE} y={1140} nodePosition={0.22} />
    </Slide>
  );
};

/**
 * Etapa 2 — Conferência. Rodada 4: sai do padrão "ícone pequeno no topo +
 * texto embaixo" (repetido em Entrada/Saída na rodada 3) e ganha layout
 * próprio, centrado no `GeometricDiagram` (nós conectados representando os
 * microsteps do processo: chegada → contagem → registro → prateleira) —
 * formato "diagrama" do repertório, que nenhum outro slide usa.
 */
export const EtapasConferencia: React.FC = () => {
  ensureFontsLoaded();
  return (
    <Slide background={neutral.begeClaro} gridId="grid-conferencia" gridColor={neutral.quasePreto}>
      <div style={{display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'flex-start'}}>
        <Overline color={ESTOQUE}>Etapa 2 · Conferência</Overline>
        <div style={{flex: 1}} />
        <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
          <GeometricDiagram color={ESTOQUE} width={760} />
        </div>
        <div style={{flex: 1}} />
        <h2
          style={{
            fontFamily: FONT_SERIF,
            fontWeight: 700,
            fontSize: 52,
            lineHeight: 1.1,
            color: neutral.quasePreto,
            margin: 0,
            maxWidth: 760,
          }}
        >
          Cada item ganha o seu lugar certo
        </h2>
        <div style={{height: 24}} />
        <p
          style={{
            fontFamily: FONT_SANS,
            fontWeight: 400,
            fontSize: 24,
            lineHeight: 1.5,
            color: neutral.quasePreto,
            opacity: 0.75,
            margin: 0,
            maxWidth: 680,
          }}
        >
          Conferido, contado e guardado — o que está na prateleira é exatamente o que está no sistema, sem depender
          de memória de ninguém.
        </p>
        <div style={{height: 220}} />
      </div>
      <ConnectorLine mode="through" color={ESTOQUE} y={1140} nodePosition={0.5} />
    </Slide>
  );
};

/**
 * Etapa 3 — Saída. Rodada 4: fica no formato "afirmação flat + ícone"
 * original — mas o ícone deixa de ser pequeno-no-canto (o mesmo motivo do
 * "vazio de ~700px" criticado na rodada 1) e vira protagonista centralizado
 * em escala grande (320px, era 132px), ocupando de fato o espaço em vez de
 * decorá-lo. É o único slide do carrossel neste formato agora, então deixa
 * de ser repetição pra virar 1 dos 6 formatos do repertório.
 */
export const EtapasSaida: React.FC = () => (
  <EtapaSlide
    numero="Etapa 3 · Saída"
    titulo="A venda sai e o estoque se atualiza sozinho"
    corpo="Sem planilha paralela, sem conferência de fim de mês pra descobrir a diferença. O número que você vê é o número real."
    background={ESTOQUE}
    textColor="#ffffff"
    nodePosition={0.78}
    lineColor="#ffffff"
    gridId="grid-saida"
    gridColor="#ffffff"
    topElement={<BoxOutIcon color="#ffffff" size={320} />}
  />
);

// ---------------------------------------------------------------------------
// Slide 5 — Prova real (print do produto)
// ---------------------------------------------------------------------------
export const EtapasProva: React.FC = () => {
  ensureFontsLoaded();
  return (
    <AbsoluteFill style={{background: neutral.begeClaro}}>
      <GridTexture id="grid-prova" color={neutral.quasePreto} />
      <AbsoluteFill style={{padding: spacing.margin}}>
        <div style={{display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'flex-start'}}>
          <Overline color={ESTOQUE}>NTB Estoque · tela real</Overline>
          <div style={{height: 48}} />
          <BrowserFrame
            screenshot={ntbEstoqueProdutoScreenshot}
            width={888}
            addressLabel="app.ntbestoque.com.br/produtos"
            cropHeight={0.62}
          />
          <div style={{height: 56}} />
          <h2
            style={{
              fontFamily: FONT_SERIF,
              fontWeight: 700,
              fontSize: 44,
              lineHeight: 1.12,
              color: neutral.quasePreto,
              margin: 0,
              maxWidth: 760,
            }}
          >
            Não é conceito. É a tela que a equipe usa todo dia.
          </h2>
          <div style={{height: 20}} />
          <p
            style={{
              fontFamily: FONT_SANS,
              fontWeight: 400,
              fontSize: 22,
              lineHeight: 1.5,
              color: neutral.quasePreto,
              opacity: 0.75,
              margin: 0,
              maxWidth: 680,
            }}
          >
            Custo, preço e margem de cada produto, atualizados em tempo real — sem planilha
            paralela.
          </p>
          <div style={{flex: 1}} />
          <div style={{display: 'flex', alignItems: 'flex-start', gap: 20, maxWidth: 780}}>
            <div style={{width: 4, alignSelf: 'stretch', background: ESTOQUE, flexShrink: 0}} />
            <p
              style={{
                fontFamily: FONT_SERIF,
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 30,
                lineHeight: 1.4,
                color: neutral.quasePreto,
                margin: 0,
              }}
            >
              Isso não substitui a equipe — tira da equipe o trabalho que é só fricção.
            </p>
          </div>
          <div style={{height: 96}} />
        </div>
      </AbsoluteFill>
      <ConnectorLine mode="through" color={ESTOQUE} y={1140} nodePosition={0.65} />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// Slide 6 — Fechamento
// ---------------------------------------------------------------------------
/**
 * REMOÇÃO DO FOGUETE (fundador, transcrição de voz, 2026-09-05): "o foguete
 * seria só em caso dele como animação, não parado como desenho" — decisão
 * final é que o mascote só aparece em peças de VÍDEO/animação (futuro), nunca
 * ilustrado parado num post estático. `Mascote.tsx` continua no repo pra
 * essa peça futura; esta rodada só parou de importá-lo aqui.
 *
 * A assinatura de fechamento agora usa o MESMO tratamento tipográfico do
 * overline das outras etapas (Atkinson Hyperlegible 700, caixa alta,
 * tracking 0.08em) em vez do texto em caixa mista que tinha antes — essa
 * era a inconsistência real por trás do "as fontes parecem diferentes em
 * cada post": não era arquivo de fonte errado (auditoria em fonts.ts não
 * achou nenhuma referência a Source Serif 4 ou fallback do sistema — só
 * Fraunces/Atkinson em todo o projeto), era TRATAMENTO — caixa mista sem
 * tracking ao lado de títulos e overlines sempre em caixa alta rastreada
 * lê como "fonte diferente" pra um olho não-treinado, mesmo sendo a mesma
 * família. Ver CATALOGO.md.
 *
 * RODADA 4 (2026-09-05): o slide ficou vazio demais na rodada 3 (foguete
 * removido, nada colocado no lugar). Fix: citação bem maior (34px → 58px),
 * com uma aspa decorativa gigante em Fraunces atrás dela — tipografia como
 * protagonista, escala grande o suficiente pra preencher o centro do frame
 * com intenção, não com vazio. Sem foguete (decisão já fechada).
 */
export const EtapasFechamento: React.FC = () => (
  <Slide background={neutral.begeClaro} gridId="grid-fechamento" gridColor={neutral.quasePreto}>
    <div style={{display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center', justifyContent: 'center', position: 'relative'}}>
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: -60,
          fontFamily: FONT_SERIF,
          fontStyle: 'italic',
          fontWeight: 700,
          fontSize: 240,
          lineHeight: 1,
          color: ESTOQUE,
          opacity: 0.16,
          userSelect: 'none',
        }}
      >
        &ldquo;
      </div>
      <p
        style={{
          fontFamily: FONT_SERIF,
          fontStyle: 'italic',
          fontWeight: 700,
          fontSize: 58,
          lineHeight: 1.28,
          letterSpacing: '-0.01em',
          color: neutral.quasePreto,
          textAlign: 'center',
          margin: 0,
          maxWidth: 840,
          zIndex: 1,
        }}
      >
        É assim que a gente pensa estoque: um fluxo, não uma correção.
      </p>
      <div style={{height: 48}} />
      <div
        style={{
          width: 64,
          height: 3,
          background: ESTOQUE,
        }}
      />
      <div style={{height: 32}} />
      <Overline color={ESTOQUE}>NTB Estoque · saiba mais no link da bio</Overline>
    </div>
    <ConnectorLine mode="end" color={ESTOQUE} y={1140} />
  </Slide>
);

// Defaults exigidos pelo pipeline (Still não recebe props nesta rodada).
export const etapasCapaDefaultProps = {};
export const etapasEntradaDefaultProps = {};
export const etapasConferenciaDefaultProps = {};
export const etapasSaidaDefaultProps = {};
export const etapasProvaDefaultProps = {};
export const etapasFechamentoDefaultProps = {};
