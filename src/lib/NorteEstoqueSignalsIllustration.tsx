import React from 'react';
import {FONT_POST as SANS} from './fonts';

const TEAL = '#70D3DA';
const CREAM = '#F3D99E';
const STROKE = 'rgba(251,251,254,.88)';
const WHITE = '#FBFBFE';

export const NorteEstoqueSignalsIllustration: React.FC = () => (
  <svg width="908" height="390" viewBox="0 0 908 390" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Três sinais ilustrados separadamente: saldo incerto, contagem adiada e local desatualizado">
    <path d="M302 58V320M606 58V320" stroke="rgba(251,251,254,.24)" strokeWidth="2" />
    <g transform="translate(70 48)">
      <path d="M21 34L182 22L198 198L37 211Z" fill="rgba(20,22,58,.2)" />
      <path d="M11 26L172 14L188 190L27 203Z" fill="#FBFBFE" />
      <path d="M31 63L159 53M34 100L99 95M37 137L105 132M40 174L112 169" stroke="#D5D8E2" strokeWidth="5" strokeLinecap="round" />
      <text x="45" y="91" fill="#14163A" fontFamily="monospace" fontSize="25">saldo</text>
      <circle cx="137" cy="119" r="28" fill="rgba(112,211,218,.18)" stroke="#168E9A" strokeWidth="7" />
      <text x="137" y="129" textAnchor="middle" fill="#168E9A" fontFamily="monospace" fontSize="30" fontWeight="700">?</text>
      <path d="M157 140L183 166" stroke="#168E9A" strokeWidth="9" strokeLinecap="round" />
      <path d="M27 51L44 50M27 75L32 74M27 112L35 111M30 150L38 149" stroke="#168E9A" strokeWidth="5" strokeLinecap="round" />
    </g>
    <text x="196" y="300" textAnchor="middle" fill={WHITE} fontFamily={SANS} fontSize="18" fontWeight="700" letterSpacing=".4">SALDO INCERTO</text>
    <g transform="translate(370 55)">
      <path d="M28 26L162 18L170 174L36 182Z" fill="rgba(20,22,58,.18)" stroke="rgba(251,251,254,.5)" strokeWidth="4" />
      <path d="M17 36L151 28L159 184L25 192Z" fill="rgba(243,217,158,.2)" stroke={STROKE} strokeWidth="5" />
      <path d="M17 72L155 64" stroke={STROKE} strokeWidth="6" />
      <path d="M52 24V45M121 20V41" stroke={STROKE} strokeWidth="8" strokeLinecap="round" />
      <path d="M39 98H52M39 132H52M39 166H52" stroke={CREAM} strokeWidth="7" strokeLinecap="round" />
      <path d="M72 98H130M72 132H130M72 166H114" stroke="rgba(251,251,254,.72)" strokeWidth="7" strokeLinecap="round" />
      <circle cx="164" cy="179" r="23" fill="#E57655" />
      <path d="M164 166V180M164 191V192" stroke={WHITE} strokeWidth="5" strokeLinecap="round" />
    </g>
    <text x="454" y="300" textAnchor="middle" fill={WHITE} fontFamily={SANS} fontSize="18" fontWeight="700" letterSpacing=".4">CONTAGEM ADIADA</text>
    <g transform="translate(644 61)">
      <path d="M5 28H83V191H5Z" fill="rgba(251,251,254,.08)" stroke="rgba(251,251,254,.55)" strokeWidth="5" />
      <path d="M95 28H173V191H95Z" fill="rgba(251,251,254,.15)" stroke={STROKE} strokeWidth="5" />
      <text x="44" y="54" textAnchor="middle" fill={WHITE} fontFamily={SANS} fontSize="19" fontWeight="700">A</text>
      <text x="134" y="54" textAnchor="middle" fill={WHITE} fontFamily={SANS} fontSize="19" fontWeight="700">B</text>
      <circle cx="44" cy="111" r="21" stroke={CREAM} strokeWidth="6" strokeDasharray="6 5" />
      <path d="M66 111H112M100 98L114 111L100 124" stroke={TEAL} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <g transform="translate(124 82)"><path d="M14 0H42V13C42 24 54 30 59 43V77H0V43C5 30 14 24 14 13Z" fill={CREAM} stroke="#8D6D3D" strokeWidth="4"/><path d="M10 0H46V10H10Z" fill={TEAL} stroke="#8D6D3D" strokeWidth="3"/></g>
      <path d="M30 149H60M117 167H151" stroke="rgba(251,251,254,.52)" strokeWidth="5" strokeLinecap="round" />
    </g>
    <text x="757" y="300" textAnchor="middle" fill={WHITE} fontFamily={SANS} fontSize="18" fontWeight="700" letterSpacing=".4">LOCAL DESATUALIZADO</text>
    <path d="M111 350H797" stroke="rgba(251,251,254,.28)" strokeWidth="2" />
  </svg>
);
