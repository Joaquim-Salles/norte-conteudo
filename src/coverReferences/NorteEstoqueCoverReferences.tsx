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

const Caderno: React.FC = () => (
  <RefFrame name="Caderno com rasuras">
    <svg width="908" height="390" viewBox="0 0 908 390" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Caderno de estoque com quantidades rasuradas e divergentes">
      <g transform="rotate(-3 454 194)">
        <rect x="196" y="48" width="516" height="278" rx="18" fill="#FBFBFE" />
        <path d="M454 49V326" stroke="#D5D8E2" strokeWidth="4" />
        <path d="M232 106H417M232 145H417M232 184H417M232 223H417M232 262H417M491 106H676M491 145H676M491 184H676M491 223H676M491 262H676" stroke="#D5D8E2" strokeWidth="3" />
        <path d="M242 79H350M501 79H610" stroke="#168E9A" strokeWidth="7" strokeLinecap="round" />
        <text x="253" y="137" fill="#14163A" fontFamily="monospace" fontSize="27">farinha</text>
        <text x="366" y="137" fill="#14163A" fontFamily="monospace" fontSize="27">12</text>
        <path d="M360 119L401 140M360 141L401 119" stroke="#E57655" strokeWidth="5" strokeLinecap="round" />
        <text x="253" y="176" fill="#14163A" fontFamily="monospace" fontSize="27">óleo</text>
        <text x="367" y="176" fill="#168E9A" fontFamily="monospace" fontSize="27">8?</text>
        <text x="505" y="137" fill="#14163A" fontFamily="monospace" fontSize="27">leite</text>
        <text x="617" y="137" fill="#14163A" fontFamily="monospace" fontSize="27">6</text>
        <path d="M605 122L646 145" stroke="#E57655" strokeWidth="5" strokeLinecap="round" />
        <text x="505" y="176" fill="#168E9A" fontFamily="monospace" fontSize="27">?</text>
        <path d="M520 210C550 193 584 204 614 194" stroke="#E57655" strokeWidth="5" strokeLinecap="round" strokeDasharray="4 11" />
        <path d="M620 272L655 236" stroke="#C49B55" strokeWidth="13" strokeLinecap="round" />
        <path d="M613 279L626 266" stroke="#14163A" strokeWidth="13" strokeLinecap="round" />
      </g>
      <path d="M111 350H797" stroke="rgba(251,251,254,.28)" strokeWidth="2" />
    </svg>
  </RefFrame>
);

const Mapa: React.FC = () => (
  <RefFrame name="Mapa rabiscado">
    <svg width="908" height="390" viewBox="0 0 908 390" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Mapa de estoque desenhado à mão com localização incerta">
      <path d="M153 86L338 61L370 181L172 191Z" fill="rgba(251,251,254,.08)" stroke={STROKE} strokeWidth="5" strokeLinejoin="round" />
      <path d="M370 181L338 61L553 79L544 194Z" fill="rgba(251,251,254,.12)" stroke={STROKE} strokeWidth="5" strokeLinejoin="round" />
      <path d="M544 194L553 79L748 92L733 208Z" fill="rgba(251,251,254,.08)" stroke={STROKE} strokeWidth="5" strokeLinejoin="round" />
      <path d="M172 191L370 181L386 304L183 289Z" fill="rgba(251,251,254,.12)" stroke={STROKE} strokeWidth="5" strokeLinejoin="round" />
      <path d="M370 181L544 194L552 315L386 304Z" fill="rgba(251,251,254,.08)" stroke={STROKE} strokeWidth="5" strokeLinejoin="round" />
      <path d="M544 194L733 208L719 307L552 315Z" fill="rgba(251,251,254,.12)" stroke={STROKE} strokeWidth="5" strokeLinejoin="round" />
      <path d="M205 115L279 103M205 133L258 126M412 110L487 117M589 115L686 124M216 231L312 237M418 236L507 246M578 249L680 258" stroke="rgba(251,251,254,.4)" strokeWidth="8" strokeLinecap="round" />
      <path d="M251 121C325 149 290 205 445 220C592 235 673 185 650 142C627 99 536 148 583 208C608 241 683 257 708 270" stroke={TEAL} strokeWidth="8" strokeLinecap="round" strokeDasharray="2 18" />
      <path d="M636 122L678 164M678 122L636 164" stroke={CREAM} strokeWidth="8" strokeLinecap="round" />
      <circle cx="251" cy="121" r="16" fill={CREAM} stroke={WHITE} strokeWidth="5" />
      <circle cx="708" cy="270" r="16" fill={TEAL} stroke={WHITE} strokeWidth="5" />
      <path d="M111 350H797" stroke="rgba(251,251,254,.28)" strokeWidth="2" />
    </svg>
  </RefFrame>
);

const Etiqueta: React.FC = () => (
  <RefFrame name="Anotação que não bate">
    <svg width="908" height="390" viewBox="0 0 908 390" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Produto com etiqueta manual marcada com quantidade divergente">
      <path d="M196 310H714" stroke="rgba(251,251,254,.32)" strokeWidth="3" />
      <g transform="translate(303 69)">
        <path d="M123 20H229V80C229 106 269 120 282 158V260H70V158C84 120 123 106 123 80Z" fill={CREAM} stroke="#8D6D3D" strokeWidth="6" />
        <path d="M111 3H240V33H111Z" fill={TEAL} stroke="#8D6D3D" strokeWidth="5" />
        <path d="M100 174H252V235H100Z" fill="#FBFBFE" />
        <path d="M120 193H230M120 215H207" stroke="#168E9A" strokeWidth="6" strokeLinecap="round" />
      </g>
      <g transform="rotate(-24 310 166)">
        <rect x="258" y="120" width="112" height="92" rx="7" fill="#FBFBFE" stroke={STROKE} strokeWidth="5" />
        <circle cx="276" cy="140" r="7" fill="#168E9A" />
        <text x="293" y="161" fill="#14163A" fontFamily="monospace" fontSize="25">24</text>
        <path d="M289 148L337 148" stroke="#E57655" strokeWidth="6" strokeLinecap="round" />
        <text x="293" y="190" fill="#168E9A" fontFamily="monospace" fontSize="24">9</text>
      </g>
      <path d="M575 149H720M604 171H710" stroke={TEAL} strokeWidth="7" strokeLinecap="round" strokeDasharray="3 16" />
      <circle cx="742" cy="160" r="29" fill="#E57655" />
      <path d="M742 144V163M742 176V177" stroke={WHITE} strokeWidth="6" strokeLinecap="round" />
      <path d="M111 350H797" stroke="rgba(251,251,254,.28)" strokeWidth="2" />
    </svg>
  </RefFrame>
);

const TresSinais: React.FC = () => (
  <RefFrame name="Três sinais no dia a dia">
    <svg width="908" height="390" viewBox="0 0 908 390" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Três sinais de improviso: ruptura, divergência e validade esquecida">
      <path d="M168 299H740" stroke={STROKE} strokeWidth="7" strokeLinecap="round" />
      <path d="M310 114V299M598 114V299" stroke="rgba(251,251,254,.36)" strokeWidth="3" strokeDasharray="3 12" />
      <g transform="translate(184 102)">
        <path d="M10 158H104M31 143V85C31 63 48 46 70 46C92 46 109 63 109 85V143" stroke={WHITE} strokeWidth="8" strokeLinecap="round" />
        <path d="M49 46V27H90V46" stroke={WHITE} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M49 99H91" stroke={TEAL} strokeWidth="10" strokeLinecap="round" />
        <path d="M41 120L56 135M56 120L41 135" stroke={CREAM} strokeWidth="7" strokeLinecap="round" />
      </g>
      <g transform="translate(365 118)">
        <path d="M0 0H138V152H0Z" fill="#FBFBFE" />
        <path d="M22 35H112M22 70H112M22 105H80" stroke="#D5D8E2" strokeWidth="5" strokeLinecap="round" />
        <path d="M22 35H83" stroke="#168E9A" strokeWidth="7" strokeLinecap="round" />
        <path d="M95 56L120 82M120 56L95 82" stroke="#E57655" strokeWidth="8" strokeLinecap="round" />
        <path d="M24 128L47 105" stroke="#C49B55" strokeWidth="10" strokeLinecap="round" />
      </g>
      <g transform="translate(624 106)">
        <circle cx="56" cy="93" r="67" stroke={WHITE} strokeWidth="8" />
        <path d="M56 48V94L88 112" stroke={CREAM} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M43 14H69" stroke={TEAL} strokeWidth="9" strokeLinecap="round" />
        <path d="M119 34L137 16" stroke={TEAL} strokeWidth="8" strokeLinecap="round" />
      </g>
      <path d="M111 350H797" stroke="rgba(251,251,254,.28)" strokeWidth="2" />
    </svg>
  </RefFrame>
);
export const NorteEstoqueCapaBalanca = Caderno;
export const NorteEstoqueCapaMapa = Mapa;
export const NorteEstoqueCapaEtiqueta = Etiqueta;
export const NorteEstoqueCapaMedidor = TresSinais;

