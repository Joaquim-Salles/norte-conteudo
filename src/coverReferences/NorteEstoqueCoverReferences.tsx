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

const Balanca: React.FC = () => (
  <RefFrame name="Balança">
    <svg width="908" height="390" viewBox="0 0 908 390" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Balança comparando registro e estoque físico">
      <path d="M454 64V306M385 306H523L490 280H418L385 306Z" fill="rgba(20,22,58,.32)" stroke={STROKE} strokeWidth="8" strokeLinejoin="round" />
      <path d="M212 113L696 163" stroke={STROKE} strokeWidth="11" strokeLinecap="round" />
      <circle cx="454" cy="138" r="17" fill={CREAM} stroke={STROKE} strokeWidth="5" />
      <path d="M260 118V222M648 158V222" stroke="rgba(251,251,254,.8)" strokeWidth="5" />
      <path d="M172 222H348C339 259 310 282 260 282C210 282 181 259 172 222Z" fill="rgba(251,251,254,.12)" stroke={STROKE} strokeWidth="5" strokeLinejoin="round" />
      <path d="M559 222H737C728 259 699 282 648 282C598 282 568 259 559 222Z" fill="rgba(243,217,158,.18)" stroke={STROKE} strokeWidth="5" strokeLinejoin="round" />
      <g transform="translate(221 174) rotate(-4 38 26)">
        <rect width="78" height="58" rx="7" fill="#FBFBFE" />
        <path d="M13 16H64M13 27H57M13 38H43" stroke="#168E9A" strokeWidth="4" strokeLinecap="round" />
      </g>
      <g transform="translate(608 169)">
        <path d="M0 16L31 0L77 11L46 28Z" fill="#F8E8C1" stroke="#8D6D3D" strokeWidth="2.5" />
        <path d="M0 16L46 28V73L0 59Z" fill={CREAM} stroke="#8D6D3D" strokeWidth="2.5" />
        <path d="M46 28L77 11V58L46 73Z" fill="#C9A762" stroke="#8D6D3D" strokeWidth="2.5" />
      </g>
      <path d="M111 335H797" stroke="rgba(251,251,254,.28)" strokeWidth="2" />
    </svg>
  </RefFrame>
);

const Mapa: React.FC = () => (
  <RefFrame name="Mapa de localização">
    <svg width="908" height="390" viewBox="0 0 908 390" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Mapa de estoque com rota entre locais">
      <path d="M110 74H798V310H110Z" fill="rgba(20,22,58,.12)" stroke="rgba(251,251,254,.7)" strokeWidth="3" />
      <path d="M344 74V310M570 74V310M110 192H344M570 192H798" stroke="rgba(251,251,254,.62)" strokeWidth="3" />
      <path d="M140 100H315M140 126H315M140 152H315M140 219H315M140 245H315M140 271H315" stroke="rgba(251,251,254,.28)" strokeWidth="11" strokeLinecap="round" />
      <path d="M600 100H767M600 126H767M600 152H767M600 219H767M600 245H767M600 271H767" stroke="rgba(251,251,254,.28)" strokeWidth="11" strokeLinecap="round" />
      <path d="M225 126H430V244H674V126H718" stroke={TEAL} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 18" />
      <g transform="translate(194 86)">
        <path d="M31 0C13.9 0 0 13.9 0 31C0 54 31 83 31 83S62 54 62 31C62 13.9 48.1 0 31 0Z" fill={CREAM} stroke={WHITE} strokeWidth="4" />
        <circle cx="31" cy="31" r="10" fill="#168E9A" />
      </g>
      <g transform="translate(684 84)">
        <path d="M31 0C13.9 0 0 13.9 0 31C0 54 31 83 31 83S62 54 62 31C62 13.9 48.1 0 31 0Z" fill={TEAL} stroke={WHITE} strokeWidth="4" />
        <circle cx="31" cy="31" r="10" fill="#168E9A" />
      </g>
    </svg>
  </RefFrame>
);

const Etiqueta: React.FC = () => (
  <RefFrame name="Etiqueta desconectada">
    <svg width="908" height="390" viewBox="0 0 908 390" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Etiqueta de produto desconectada do registro">
      <path d="M145 228H345" stroke={STROKE} strokeWidth="7" strokeLinecap="round" />
      <path d="M563 228H763" stroke={STROKE} strokeWidth="7" strokeLinecap="round" />
      <path d="M345 228H389M520 228H563" stroke={TEAL} strokeWidth="7" strokeLinecap="round" strokeDasharray="3 16" />
      <circle cx="454" cy="228" r="13" fill={CREAM} />
      <path d="M214 86H344L399 141V306H214V86Z" fill="#FBFBFE" stroke={STROKE} strokeWidth="5" strokeLinejoin="round" />
      <path d="M344 86V142H399" fill="#E4E7EC" stroke={STROKE} strokeWidth="5" strokeLinejoin="round" />
      <circle cx="255" cy="126" r="8" fill="#168E9A" />
      <path d="M245 178H356M245 201H335M245 224H350" stroke="#168E9A" strokeWidth="5" strokeLinecap="round" />
      <path d="M249 264V287M260 264V287M272 264V287M283 264V287M301 264V287M310 264V287M325 264V287M337 264V287M350 264V287" stroke={NAVY} strokeWidth="4" />
      <g transform="translate(564 102)">
        <path d="M45 17H83V48C83 66 112 76 122 102V212H6V102C16 76 45 66 45 48Z" fill={CREAM} stroke="#8D6D3D" strokeWidth="5" />
        <path d="M39 7H89V24H39Z" fill={TEAL} stroke="#8D6D3D" strokeWidth="4" />
        <path d="M22 127H106V169H22Z" fill="#FBFBFE" />
        <path d="M36 139H91M36 152H83" stroke="#168E9A" strokeWidth="5" strokeLinecap="round" />
      </g>
      <path d="M111 338H797" stroke="rgba(251,251,254,.28)" strokeWidth="2" />
    </svg>
  </RefFrame>
);

const Medidor: React.FC = () => (
  <RefFrame name="Medidor de conferência">
    <svg width="908" height="390" viewBox="0 0 908 390" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Medidor visual mostrando diferença entre registro e conferência">
      <path d="M208 289A246 246 0 0 1 700 289" stroke="rgba(251,251,254,.28)" strokeWidth="26" strokeLinecap="round" />
      <path d="M208 289A246 246 0 0 1 480 50" stroke={TEAL} strokeWidth="26" strokeLinecap="round" />
      <path d="M208 289A246 246 0 0 1 574 73" stroke={CREAM} strokeWidth="8" strokeLinecap="round" strokeDasharray="3 18" />
      <g stroke={STROKE} strokeWidth="5" strokeLinecap="round">
        <path d="M214 259L185 249"/><path d="M260 162L236 144"/><path d="M343 92L332 62"/>
        <path d="M454 67V34"/><path d="M565 92L576 62"/><path d="M648 162L672 144"/><path d="M694 259L723 249"/>
      </g>
      <path d="M454 269L326 151" stroke={WHITE} strokeWidth="12" strokeLinecap="round" />
      <path d="M454 269L590 163" stroke={CREAM} strokeWidth="9" strokeLinecap="round" />
      <circle cx="454" cy="269" r="29" fill="#FBFBFE" stroke={TEAL} strokeWidth="9" />
      <circle cx="454" cy="269" r="9" fill="#168E9A" />
      <path d="M375 325H533" stroke="rgba(251,251,254,.72)" strokeWidth="9" strokeLinecap="round" />
      <path d="M111 350H797" stroke="rgba(251,251,254,.28)" strokeWidth="2" />
    </svg>
  </RefFrame>
);

export const NorteEstoqueCapaBalanca = Balanca;
export const NorteEstoqueCapaMapa = Mapa;
export const NorteEstoqueCapaEtiqueta = Etiqueta;
export const NorteEstoqueCapaMedidor = Medidor;
