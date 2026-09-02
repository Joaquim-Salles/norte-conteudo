import React from 'react';
import {Still, Composition} from 'remotion';
import {formats} from './lib/tokens';
import {DadoVsAchismo, dadoVsAchismoDefaultProps} from './templates/DadoVsAchismo';
import {DicaPratica, dicaPraticaDefaultProps} from './templates/DicaPratica';
import {AntesDepois, antesDepoisDefaultProps} from './templates/AntesDepois';
import {VitrineProduto, vitrineProdutoDefaultProps} from './templates/VitrineProduto';
import {
  MetodologiaSemEnrolacao,
  metodologiaDefaultProps,
} from './templates/MetodologiaSemEnrolacao';
import {CoverFotoReal, coverFotoRealDefaultProps} from './templates/CoverFotoReal';
import {Depoimento, depoimentoDefaultProps} from './templates/Depoimento';
import {Comparativo, comparativoDefaultProps} from './templates/Comparativo';
import {Bastidores, bastidoresDefaultProps} from './templates/Bastidores';
import {
  DadoVsAchismoReel,
  dadoVsAchismoReelDefaultProps,
  dadoVsAchismoReelDurationInFrames,
} from './templates/DadoVsAchismoReel';
import {
  MetodologiaReel,
  metodologiaReelDefaultProps,
  metodologiaReelDurationInFrames,
} from './templates/MetodologiaReel';
import {
  ComparativoReel,
  comparativoReelDefaultProps,
  comparativoReelDurationInFrames,
} from './templates/ComparativoReel';

/**
 * Os 5 tipos de post da Fase 0, cada um como <Still> (formato 4:5, 1080x1350).
 * Carrossel (DicaPratica/Metodologia) renderiza 1 Still por slide via dataset
 * render (scripts/render.mjs itera o array de slides do brief e chama o CLI
 * uma vez por indice, com --props diferente) — nao existe "Composition de
 * carrossel" nativa no Remotion, e essa e a abordagem documentada.
 */
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Still
        id="DadoVsAchismo"
        component={DadoVsAchismo}
        width={formats.post.width}
        height={formats.post.height}
        defaultProps={dadoVsAchismoDefaultProps}
      />
      <Still
        id="DicaPratica"
        component={DicaPratica}
        width={formats.post.width}
        height={formats.post.height}
        defaultProps={dicaPraticaDefaultProps}
      />
      <Still
        id="AntesDepois"
        component={AntesDepois}
        width={formats.post.width}
        height={formats.post.height}
        defaultProps={antesDepoisDefaultProps}
      />
      <Still
        id="VitrineProduto"
        component={VitrineProduto}
        width={formats.post.width}
        height={formats.post.height}
        defaultProps={vitrineProdutoDefaultProps}
      />
      <Still
        id="MetodologiaSemEnrolacao"
        component={MetodologiaSemEnrolacao}
        width={formats.post.width}
        height={formats.post.height}
        defaultProps={metodologiaDefaultProps}
      />
      {/* Peca exploratoria (2026-08-31, fora dos "5 tipos" da Fase 0) — cover
          de foto real, ver src/templates/CoverFotoReal.tsx */}
      <Still
        id="CoverFotoReal"
        component={CoverFotoReal}
        width={formats.post.width}
        height={formats.post.height}
        defaultProps={coverFotoRealDefaultProps}
      />

      {/*
        3 tipos NOVOS (2026-09-01, pedido do fundador "mais modelos mais
        tipos" — nao mais variacao dos 5 originais, tipos conceitualmente
        diferentes). Ver src/templates/CATALOGO.md secao 6-8 pra detalhe e
        fonte de pesquisa de cada um.
      */}
      <Still
        id="Depoimento"
        component={Depoimento}
        width={formats.post.width}
        height={formats.post.height}
        defaultProps={depoimentoDefaultProps}
      />
      <Still
        id="Comparativo"
        component={Comparativo}
        width={formats.post.width}
        height={formats.post.height}
        defaultProps={comparativoDefaultProps}
      />
      <Still
        id="Bastidores"
        component={Bastidores}
        width={formats.post.width}
        height={formats.post.height}
        defaultProps={bastidoresDefaultProps}
      />

      {/*
        Reels (Composition, animado de verdade — useCurrentFrame/interpolate,
        nao Still). Pedido do fundador 2026-08-31 ("quero animacoes nos
        posts"). Formato 1080x1920/30fps (ver constraints-plataforma.md).
        Escolhidos os 2 tipos que ja tinham estrutura de sequencia/carrossel
        no Still (Dado vs. Achismo, Metodologia sem Enrolacao) — mais faceis
        de "esticar no tempo" com fidelidade ao conteudo original.
      */}
      {/*
        Round C (2026-09-01, motionStyle — docs/plano-catalogo-em-escala.md):
        os 3 Reels usam `calculateMetadata` pra recalcular a duração real a
        partir dos props recebidos (motionStyle muda `paceScale`, e no caso
        do Comparativo/Metodologia também a quantidade de itens/passos) — sem
        isso, renderizar com um motionStyle "lento" (ex. minimalFade,
        paceScale 1.35) cortaria a peça antes do CTA terminar de entrar.
      */}
      <Composition
        id="DadoVsAchismoReel"
        component={DadoVsAchismoReel}
        width={formats.reel.width}
        height={formats.reel.height}
        fps={formats.reel.fps}
        durationInFrames={dadoVsAchismoReelDurationInFrames(dadoVsAchismoReelDefaultProps.motionStyle)}
        defaultProps={dadoVsAchismoReelDefaultProps}
        calculateMetadata={({props}) => ({
          durationInFrames: dadoVsAchismoReelDurationInFrames(props.motionStyle),
        })}
      />
      <Composition
        id="MetodologiaReel"
        component={MetodologiaReel}
        width={formats.reel.width}
        height={formats.reel.height}
        fps={formats.reel.fps}
        durationInFrames={metodologiaReelDurationInFrames(metodologiaReelDefaultProps.passos.length, metodologiaReelDefaultProps.motionStyle)}
        defaultProps={metodologiaReelDefaultProps}
        calculateMetadata={({props}) => ({
          durationInFrames: metodologiaReelDurationInFrames(props.passos.length, props.motionStyle),
        })}
      />
      {/*
        Comparativo Reel (Round C, 2026-09-01) — primeiro tipo de conteúdo
        NOVO a ganhar versão animada além dos 2 originais. Ver
        src/templates/ComparativoReel.tsx.
      */}
      <Composition
        id="ComparativoReel"
        component={ComparativoReel}
        width={formats.reel.width}
        height={formats.reel.height}
        fps={formats.reel.fps}
        durationInFrames={comparativoReelDurationInFrames(comparativoReelDefaultProps.itens.length, comparativoReelDefaultProps.motionStyle)}
        defaultProps={comparativoReelDefaultProps}
        calculateMetadata={({props}) => ({
          durationInFrames: comparativoReelDurationInFrames(props.itens.length, props.motionStyle),
        })}
      />
    </>
  );
};
