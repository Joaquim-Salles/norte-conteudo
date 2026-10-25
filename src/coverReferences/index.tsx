import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {
  NorteEstoqueCapaBalanca,
  NorteEstoqueCapaEtiqueta,
  NorteEstoqueCapaMapa,
  NorteEstoqueCapaMedidor,
} from './NorteEstoqueCoverReferences';

const CoverReferences: React.FC = () => (
  <>
    <Composition id="NorteEstoqueCapaBalanca" component={NorteEstoqueCapaBalanca} width={1080} height={1350} fps={30} durationInFrames={1} />
    <Composition id="NorteEstoqueCapaMapa" component={NorteEstoqueCapaMapa} width={1080} height={1350} fps={30} durationInFrames={1} />
    <Composition id="NorteEstoqueCapaEtiqueta" component={NorteEstoqueCapaEtiqueta} width={1080} height={1350} fps={30} durationInFrames={1} />
    <Composition id="NorteEstoqueCapaMedidor" component={NorteEstoqueCapaMedidor} width={1080} height={1350} fps={30} durationInFrames={1} />
  </>
);

registerRoot(CoverReferences);
