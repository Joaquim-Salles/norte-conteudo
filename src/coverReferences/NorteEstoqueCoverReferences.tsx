import React from 'react';
import {AbsoluteFill, Img} from 'remotion';
import {Background, Eyebrow, Foot, NAVY, PAD, Produto, Support, Title, WHITE, kit, mute} from '../lib/NortePost';
import {ensurePostLoaded, FONT_POST as SANS, FONT_POST_MONO as MONO} from '../lib/fonts';

const LOGO_ESTOQUE = kit('01-logos/norte-estoque/horizontal/norte-estoque_horizontal_branco_transparente.png');
const TEAL = '#70D3DA';
const CREAM = '#F3D99E';
const STROKE = 'rgba(251,251,254,.88)';

const RefFrame: React.FC<{name: string; children: React.ReactNode}> = ({name, children}) => {
  ensurePostLoaded();
  const textureId = `estoque-cover-ref-${name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9-]+/g, '-')}`;
  return (
    <Produto id="estoque">
      <AbsoluteFill>
        <Background tone="product" id={textureId} />
        <Img src={LOGO_ESTOQUE} style={{position: 'absolute', left: PAD, top: 76, height: 86, width: 'auto'}} />
        <span style={{position: 'absolute', right: PAD, top: 96, fontFamily: MONO, fontSize: 22, color: mute('product')}}>01/07</span>
        <Eyebrow tone="product" top={340}>CONTROLE DE ESTOQUE</Eyebrow>
        <Title tone="product" top={398} size={67}>3 sinais de que seu estoque está no improviso</Title>
        <Support tone="product" top={590} width={870} size={30}>Quando a informação não acompanha a rotina, conferir e decidir fica mais difícil.</Support>
        <div style={{position: 'absolute', left: 86, top: 770, width: 908, height: 390}}>{children}</div>
        <div style={{position: 'absolute', left: PAD, bottom: 64, fontFamily: SANS, fontWeight: 700, fontSize: 20, letterSpacing: 2.4, textTransform: 'uppercase', color: mute('product')}}>Referência visual · {name}</div>
      </AbsoluteFill>
    </Produto>
  );
};

const TresSinais: React.FC = () => (
  <RefFrame name="Três sinais claros">
    <svg width="908" height="390" viewBox="0 0 908 390" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Falta inesperada, quantidade divergente e validade esquecida">
      <path d="M302 65V325M606 65V325" stroke="rgba(251,251,254,.34)" strokeWidth="3" strokeDasharray="3 12" />
      <g transform="translate(76 77)">
        <path d="M34 32V189M180 32V189M34 104H78M136 104H180M34 189H180" stroke={STROKE} strokeWidth="9" strokeLinecap="round" />
        <path d="M82 78H132V129H82Z" stroke={TEAL} strokeWidth="5" strokeDasharray="8 8" />
        <path d="M88 87L126 120M126 87L88 120" stroke={CREAM} strokeWidth="7" strokeLinecap="round" />
      </g>
      <text x="150" y="307" textAnchor="middle" fill={WHITE} fontFamily={SANS} fontSize="22" fontWeight="700" letterSpacing="1">FALTA INESPERADA</text>
      <g transform="translate(367 83)">
        <path d="M0 0H174V174H0Z" fill="#FBFBFE" />
        <path d="M20 35H154M20 76H154M20 117H154" stroke="#D5D8E2" strokeWidth="5" strokeLinecap="round" />
        <text x="26" y="68" fill="#14163A" fontFamily="monospace" fontSize="30">8 un.</text>
        <path d="M24 47L105 71" stroke="#E57655" strokeWidth="6" strokeLinecap="round" />
        <text x="26" y="109" fill="#168E9A" fontFamily="monospace" fontSize="30">3 un.</text>
      </g>
      <text x="454" y="307" textAnchor="middle" fill={WHITE} fontFamily={SANS} fontSize="22" fontWeight="700" letterSpacing="1">QUANTIDADE NÃO BATE</text>
      <g transform="translate(671 72)">
        <rect x="18" y="18" width="138" height="150" rx="8" stroke={STROKE} strokeWidth="8" />
        <path d="M18 58H156M50 0V37M124 0V37" stroke={STROKE} strokeWidth="9" strokeLinecap="round" />
        <path d="M52 89H74M100 89H122M52 124H74" stroke={TEAL} strokeWidth="9" strokeLinecap="round" />
        <path d="M101 116L127 142M127 116L101 142" stroke={CREAM} strokeWidth="8" strokeLinecap="round" />
      </g>
      <text x="757" y="307" textAnchor="middle" fill={WHITE} fontFamily={SANS} fontSize="22" fontWeight="700" letterSpacing="1">VALIDADE ESQUECIDA</text>
      <path d="M111 350H797" stroke="rgba(251,251,254,.28)" strokeWidth="2" />
    </svg>
  </RefFrame>
);

const Caderno: React.FC = () => (
  <RefFrame name="Três alertas no caderno">
    <svg width="908" height="390" viewBox="0 0 908 390" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Caderno registra três problemas concretos do estoque">
      <g transform="rotate(-2 454 196)">
        <rect x="190" y="37" width="528" height="286" rx="15" fill="#FBFBFE" />
        <path d="M222 131H682M222 205H682M222 279H682" stroke="#D5D8E2" strokeWidth="3" />
        <path d="M248 68H660" stroke="#168E9A" strokeWidth="7" strokeLinecap="round" />
        <circle cx="256" cy="103" r="16" stroke="#E57655" strokeWidth="6" /><path d="M249 96L263 110M263 96L249 110" stroke="#E57655" strokeWidth="4" strokeLinecap="round" />
        <text x="289" y="111" fill="#14163A" fontFamily={SANS} fontSize="24" fontWeight="700">FALTA INESPERADA</text>
        <circle cx="256" cy="177" r="16" stroke="#E57655" strokeWidth="6" /><path d="M247 179L254 186L267 168" stroke="#E57655" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <text x="289" y="185" fill="#14163A" fontFamily={SANS} fontSize="24" fontWeight="700">8 REGISTRADOS / 3 CONTADOS</text>
        <circle cx="256" cy="251" r="16" stroke="#E57655" strokeWidth="6" /><path d="M256 241V253L265 259" stroke="#E57655" strokeWidth="4" strokeLinecap="round" />
        <text x="289" y="259" fill="#14163A" fontFamily={SANS} fontSize="24" fontWeight="700">VALIDADE PASSOU</text>
        <path d="M614 294L655 250" stroke="#C49B55" strokeWidth="13" strokeLinecap="round" /><path d="M607 301L620 288" stroke="#14163A" strokeWidth="13" strokeLinecap="round" />
      </g>
      <path d="M111 350H797" stroke="rgba(251,251,254,.28)" strokeWidth="2" />
    </svg>
  </RefFrame>
);

const Prateleira: React.FC = () => (
  <RefFrame name="Evidências no estoque">
    <svg width="908" height="390" viewBox="0 0 908 390" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Prateleira com um espaço vazio, quantidade divergente e validade vencida">
      <path d="M132 268H776M170 103V272M738 103V272M170 186H738" stroke={STROKE} strokeWidth="8" strokeLinecap="round" />
      <g transform="translate(231 113)">
        <path d="M22 0H70V24C70 40 92 50 99 71V122H0V71C7 50 22 40 22 24Z" fill={CREAM} stroke="#8D6D3D" strokeWidth="5" />
        <path d="M17 0H75V18H17Z" fill={TEAL} stroke="#8D6D3D" strokeWidth="4" />
      </g>
      <path d="M388 125H515V251H388Z" stroke={TEAL} strokeWidth="6" strokeDasharray="11 10" />
      <path d="M407 145L496 231M496 145L407 231" stroke={CREAM} strokeWidth="9" strokeLinecap="round" />
      <g transform="translate(548 119)">
        <rect width="128" height="98" rx="8" fill="#FBFBFE" />
        <text x="16" y="38" fill="#14163A" fontFamily="monospace" fontSize="26">8 un.</text>
        <path d="M14 25L90 45" stroke="#E57655" strokeWidth="5" strokeLinecap="round" />
        <text x="16" y="77" fill="#168E9A" fontFamily="monospace" fontSize="26">3 un.</text>
      </g>
      <g transform="translate(683 93)">
        <circle cx="31" cy="31" r="28" fill="#E57655" />
        <path d="M31 16V34M31 45V46" stroke={WHITE} strokeWidth="6" strokeLinecap="round" />
      </g>
      <text x="272" y="319" textAnchor="middle" fill={WHITE} fontFamily={SANS} fontSize="19" fontWeight="700" letterSpacing=".7">FALTA</text>
      <text x="452" y="319" textAnchor="middle" fill={WHITE} fontFamily={SANS} fontSize="19" fontWeight="700" letterSpacing=".7">SALDO DIVERGENTE</text>
      <text x="631" y="319" textAnchor="middle" fill={WHITE} fontFamily={SANS} fontSize="19" fontWeight="700" letterSpacing=".7">VALIDADE</text>
      <path d="M111 350H797" stroke="rgba(251,251,254,.28)" strokeWidth="2" />
    </svg>
  </RefFrame>
);

const Ficha: React.FC = () => (
  <RefFrame name="Conferência sem controle">
    <svg width="908" height="390" viewBox="0 0 908 390" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Ficha de conferência com três sinais marcados de descontrole">
      <path d="M276 116L406 167M632 116L501 167M453 237V254" stroke="rgba(251,251,254,.55)" strokeWidth="5" />
      <circle cx="453" cy="185" r="52" fill="rgba(251,251,254,.16)" stroke={STROKE} strokeWidth="5" />
      <text x="453" y="192" textAnchor="middle" fill={WHITE} fontFamily={SANS} fontSize="19" fontWeight="700">ESTOQUE</text>
      <g transform="translate(127 50)">
        <circle cx="107" cy="52" r="42" fill="rgba(251,251,254,.12)" stroke={STROKE} strokeWidth="5" />
        <path d="M83 52L98 67L130 35" stroke={CREAM} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <text x="107" y="124" textAnchor="middle" fill={WHITE} fontFamily={SANS} fontSize="20" fontWeight="700">FALTA</text>
      </g>
      <g transform="translate(567 50)">
        <circle cx="107" cy="52" r="42" fill="rgba(251,251,254,.12)" stroke={STROKE} strokeWidth="5" />
        <text x="107" y="61" textAnchor="middle" fill={CREAM} fontFamily="monospace" fontSize="26" fontWeight="700">8 ≠ 3</text>
        <text x="107" y="124" textAnchor="middle" fill={WHITE} fontFamily={SANS} fontSize="20" fontWeight="700">CONTAGEM</text>
      </g>
      <g transform="translate(346 240)">
        <circle cx="107" cy="52" r="42" fill="rgba(251,251,254,.12)" stroke={STROKE} strokeWidth="5" />
        <path d="M107 24V52L126 64" stroke={CREAM} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M92 11H122" stroke={TEAL} strokeWidth="7" strokeLinecap="round" />
        <text x="107" y="117" textAnchor="middle" fill={WHITE} fontFamily={SANS} fontSize="20" fontWeight="700">VALIDADE</text>
      </g>
    </svg>
  </RefFrame>
);
export const NorteEstoqueCapaBalanca = TresSinais;
export const NorteEstoqueCapaMapa = Caderno;
export const NorteEstoqueCapaEtiqueta = Prateleira;
export const NorteEstoqueCapaMedidor = Ficha;


