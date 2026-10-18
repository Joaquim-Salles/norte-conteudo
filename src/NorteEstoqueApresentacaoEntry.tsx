import React from 'react';
import {Composition, registerRoot, Still} from 'remotion';
import {
  NorteEstoqueApresentacao01,
  NorteEstoqueApresentacao02,
  NorteEstoqueApresentacao03,
  NorteEstoqueApresentacao04,
  NorteEstoqueApresentacao05,
  NorteEstoqueApresentacao06,
  NorteEstoqueApresentacao07,
  NorteEstoqueApresentacaoAnimada02,
  NorteEstoqueApresentacaoAnimada03,
  NorteEstoqueApresentacaoAnimada04,
  NorteEstoqueApresentacaoAnimada05,
  NorteEstoqueApresentacaoAnimada06,
} from './templates/NorteEstoqueApresentacao';

const WIDTH = 1080;
const HEIGHT = 1350;

const NorteEstoqueApresentacaoRoot: React.FC = () => (
  <>
    <Still id="NorteEstoqueApresentacao01" component={NorteEstoqueApresentacao01} width={WIDTH} height={HEIGHT} />
    <Still id="NorteEstoqueApresentacao02" component={NorteEstoqueApresentacao02} width={WIDTH} height={HEIGHT} />
    <Still id="NorteEstoqueApresentacao03" component={NorteEstoqueApresentacao03} width={WIDTH} height={HEIGHT} />
    <Still id="NorteEstoqueApresentacao04" component={NorteEstoqueApresentacao04} width={WIDTH} height={HEIGHT} />
    <Still id="NorteEstoqueApresentacao05" component={NorteEstoqueApresentacao05} width={WIDTH} height={HEIGHT} />
    <Still id="NorteEstoqueApresentacao06" component={NorteEstoqueApresentacao06} width={WIDTH} height={HEIGHT} />
    <Still id="NorteEstoqueApresentacao07" component={NorteEstoqueApresentacao07} width={WIDTH} height={HEIGHT} />

    <Composition id="NorteEstoqueApresentacaoAnimada02" component={NorteEstoqueApresentacaoAnimada02} width={WIDTH} height={HEIGHT} fps={30} durationInFrames={90} />
    <Composition id="NorteEstoqueApresentacaoAnimada03" component={NorteEstoqueApresentacaoAnimada03} width={WIDTH} height={HEIGHT} fps={30} durationInFrames={90} />
    <Composition id="NorteEstoqueApresentacaoAnimada04" component={NorteEstoqueApresentacaoAnimada04} width={WIDTH} height={HEIGHT} fps={30} durationInFrames={90} />
    <Composition id="NorteEstoqueApresentacaoAnimada05" component={NorteEstoqueApresentacaoAnimada05} width={WIDTH} height={HEIGHT} fps={30} durationInFrames={90} />
    <Composition id="NorteEstoqueApresentacaoAnimada06" component={NorteEstoqueApresentacaoAnimada06} width={WIDTH} height={HEIGHT} fps={30} durationInFrames={90} />
  </>
);

registerRoot(NorteEstoqueApresentacaoRoot);
