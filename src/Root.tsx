import React from 'react';
import {Still} from 'remotion';
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
    </>
  );
};
