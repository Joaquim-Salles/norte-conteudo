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

const LinhaSinais: React.FC = () => (
  <RefFrame name="Os três sinais">
    <svg width="908" height="390" viewBox="0 0 908 390" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Três sinais: saldo pede recontagem, contagem adiada e local não atualizado">
      <path d="M302 58V320M606 58V320" stroke="rgba(251,251,254,.3)" strokeWidth="3" strokeDasharray="3 12" />
      <g transform="translate(89 84)">
        <path d="M20 23H188V178H20Z" fill="#FBFBFE" />
        <path d="M43 60H159M43 101H159M43 142H118" stroke="#D5D8E2" strokeWidth="5" strokeLinecap="round" />
        <text x="49" y="94" fill="#14163A" fontFamily="monospace" fontSize="27">saldo?</text>
        <path d="M139 125C168 119 179 143 164 158" stroke="#168E9A" strokeWidth="7" strokeLinecap="round" />
        <path d="M163 147L164 160L151 158" stroke="#168E9A" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <text x="196" y="300" textAnchor="middle" fill={WHITE} fontFamily={SANS} fontSize="18" fontWeight="700" letterSpacing=".6">SALDO PEDE RECONTAGEM</text>
      <g transform="translate(381 80)">
        <rect x="12" y="21" width="154" height="164" rx="9" stroke={STROKE} strokeWidth="8" />
        <path d="M12 62H166M48 0V39M130 0V39" stroke={STROKE} strokeWidth="9" strokeLinecap="round" />
        <path d="M42 90H61M42 126H61M42 160H61" stroke={CREAM} strokeWidth="8" strokeLinecap="round" />
        <path d="M78 90H139M78 126H139M78 160H123" stroke="rgba(251,251,254,.7)" strokeWidth="7" strokeLinecap="round" />
      </g>
      <text x="454" y="300" textAnchor="middle" fill={WHITE} fontFamily={SANS} fontSize="18" fontWeight="700" letterSpacing=".6">CONTAGEM ADIADA</text>
      <g transform="translate(650 97)">
        <path d="M4 72H76M112 72H184" stroke={STROKE} strokeWidth="7" strokeLinecap="round" />
        <path d="M89 42V101M64 72L88 48L112 72" stroke={TEAL} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 22H54V64H12Z" stroke="rgba(251,251,254,.5)" strokeWidth="5" strokeDasharray="7 6" />
        <g transform="translate(126 88)"><path d="M20 0H61V20C61 34 78 41 84 59V103H0V59C6 41 20 34 20 20Z" fill={CREAM} stroke="#8D6D3D" strokeWidth="4" /><path d="M15 0H66V14H15Z" fill={TEAL} stroke="#8D6D3D" strokeWidth="3" /></g>
      </g>
      <text x="757" y="300" textAnchor="middle" fill={WHITE} fontFamily={SANS} fontSize="18" fontWeight="700" letterSpacing=".6">LOCAL NÃO ATUALIZADO</text>
      <path d="M111 350H797" stroke="rgba(251,251,254,.28)" strokeWidth="2" />
    </svg>
  </RefFrame>
);

const Caderno: React.FC = () => (
  <RefFrame name="Conferência no papel">
    <svg width="908" height="390" viewBox="0 0 908 390" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Folha de conferência com três alertas da rotina de estoque">
      <g transform="rotate(-2 454 195)">
        <rect x="180" y="30" width="548" height="294" rx="15" fill="#FBFBFE" />
        <path d="M220 130H690M220 205H690M220 280H690" stroke="#D5D8E2" strokeWidth="3" />
        <path d="M222 67H685" stroke="#168E9A" strokeWidth="8" strokeLinecap="round" />
        <g transform="translate(225 85)"><path d="M0 0H42V33H0Z" fill="none" stroke="#168E9A" strokeWidth="4" /><text x="21" y="25" textAnchor="middle" fill="#14163A" fontFamily="monospace" fontSize="21">?</text></g>
        <text x="287" y="111" fill="#14163A" fontFamily={SANS} fontSize="23" fontWeight="700">SALDO INCERTO</text>
        <g transform="translate(225 158)"><path d="M0 0H42V33H0Z" fill="none" stroke="#168E9A" strokeWidth="4" /><path d="M10 8V25M21 8V25M32 8V25" stroke="#E57655" strokeWidth="3" /></g>
        <text x="287" y="184" fill="#14163A" fontFamily={SANS} fontSize="23" fontWeight="700">CONTAGEM ADIADA</text>
        <g transform="translate(225 233)"><path d="M0 0H42V33H0Z" fill="none" stroke="#168E9A" strokeWidth="4" /><path d="M9 16H34M23 7L34 16L23 25" stroke="#E57655" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></g>
        <text x="287" y="259" fill="#14163A" fontFamily={SANS} fontSize="23" fontWeight="700">MUDOU DE LOCAL</text>
        <path d="M610 297L654 250" stroke="#C49B55" strokeWidth="13" strokeLinecap="round" /><path d="M603 304L617 289" stroke="#14163A" strokeWidth="13" strokeLinecap="round" />
      </g>
      <path d="M111 350H797" stroke="rgba(251,251,254,.28)" strokeWidth="2" />
    </svg>
  </RefFrame>
);

const Mapa: React.FC = () => (
  <RefFrame name="Mapa dos três sinais">
    <svg width="908" height="390" viewBox="0 0 908 390" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Mapa conecta saldo incerto, inventário adiado e movimentação sem registro">
      <path d="M132 78L375 60L383 296L145 314Z" fill="rgba(251,251,254,.08)" stroke={STROKE} strokeWidth="5" strokeLinejoin="round" />
      <path d="M375 60L615 72L601 307L383 296Z" fill="rgba(251,251,254,.13)" stroke={STROKE} strokeWidth="5" strokeLinejoin="round" />
      <path d="M615 72L775 87L759 319L601 307Z" fill="rgba(251,251,254,.08)" stroke={STROKE} strokeWidth="5" strokeLinejoin="round" />
      <path d="M172 107H330M172 132H330M412 104H570M412 129H570M642 110H732M642 135H732M173 265H335M424 264H562M634 270H724" stroke="rgba(251,251,254,.34)" strokeWidth="8" strokeLinecap="round" />
      <g transform="translate(192 151)">
        <path d="M0 0H126V82H0Z" fill="#FBFBFE" />
        <path d="M16 23H106M16 44H88M16 64H72" stroke="#D5D8E2" strokeWidth="4" strokeLinecap="round" />
        <text x="20" y="40" fill="#14163A" fontFamily="monospace" fontSize="21">saldo?</text>
      </g>
      <g transform="translate(432 151)">
        <rect x="0" y="0" width="120" height="85" rx="7" stroke={STROKE} strokeWidth="6" />
        <path d="M0 27H120M30 -10V13M90 -10V13" stroke={STROKE} strokeWidth="6" strokeLinecap="round" />
        <path d="M27 47H40M27 65H40M59 47H96M59 65H83" stroke={CREAM} strokeWidth="6" strokeLinecap="round" />
      </g>
      <path d="M563 193C620 193 610 131 681 131" stroke={TEAL} strokeWidth="7" strokeLinecap="round" strokeDasharray="2 15" />
      <path d="M661 111L682 131L661 151" stroke={TEAL} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M653 91L691 129M691 91L653 129" stroke={CREAM} strokeWidth="7" strokeLinecap="round" />
      <g transform="translate(678 177)"><path d="M18 0H55V17C55 31 70 37 76 54V100H0V54C6 37 18 31 18 17Z" fill={CREAM} stroke="#8D6D3D" strokeWidth="4"/><path d="M14 0H59V12H14Z" fill={TEAL} stroke="#8D6D3D" strokeWidth="3"/></g>
      <text x="256" y="344" textAnchor="middle" fill={WHITE} fontFamily={SANS} fontSize="14" fontWeight="700" letterSpacing=".1">SALDO INCERTO</text>
      <text x="492" y="344" textAnchor="middle" fill={WHITE} fontFamily={SANS} fontSize="14" fontWeight="700" letterSpacing=".1">CONTAGEM ADIADA</text>
      <text x="680" y="344" textAnchor="middle" fill={WHITE} fontFamily={SANS} fontSize="14" fontWeight="700" letterSpacing=".1">LOCAL SEM REGISTRO</text>
    </svg>
  </RefFrame>
);
const Mesa: React.FC = () => (
  <RefFrame name="Rotina acumulada">
    <svg width="908" height="390" viewBox="0 0 908 390" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Mesa com saldo duvidoso, conferência acumulada e item em local diferente do registro">
      <path d="M112 309H797" stroke={STROKE} strokeWidth="7" strokeLinecap="round" />
      <g transform="rotate(-7 283 184)">
        <rect x="155" y="82" width="264" height="204" rx="12" fill="#FBFBFE" />
        <path d="M182 122H387M182 164H387M182 206H387M182 248H342" stroke="#D5D8E2" strokeWidth="4" strokeLinecap="round" />
        <text x="190" y="155" fill="#14163A" fontFamily="monospace" fontSize="26">saldo ?</text>
        <path d="M184 189L235 189M184 230L235 230" stroke="#168E9A" strokeWidth="7" strokeLinecap="round" />
        <path d="M254 180V238M274 180V238M294 180V238M314 180V238" stroke="#E57655" strokeWidth="4" strokeDasharray="7 8" />
      </g>
      <g transform="translate(495 75)">
        <rect x="0" y="0" width="131" height="72" rx="8" stroke={STROKE} strokeWidth="7" />
        <path d="M0 25H131M33 -12V12M98 -12V12" stroke={STROKE} strokeWidth="7" strokeLinecap="round" />
        <path d="M34 44H53M77 44H96" stroke={CREAM} strokeWidth="7" strokeLinecap="round" />
        <path d="M55 44H74" stroke={TEAL} strokeWidth="5" strokeDasharray="3 7" />
      </g>
      <g transform="translate(610 168)">
        <path d="M23 0H69V21C69 39 91 48 99 72V132H0V72C8 48 23 39 23 21Z" fill={CREAM} stroke="#8D6D3D" strokeWidth="5" />
        <path d="M17 0H75V15H17Z" fill={TEAL} stroke="#8D6D3D" strokeWidth="4" />
      </g>
      <path d="M616 217C551 226 535 177 566 148" stroke={TEAL} strokeWidth="7" strokeLinecap="round" strokeDasharray="2 15" />
      <path d="M544 142L565 138L563 159" stroke={TEAL} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M476 252H720" stroke="rgba(251,251,254,.45)" strokeWidth="3" strokeDasharray="4 12" />
      <path d="M111 350H797" stroke="rgba(251,251,254,.28)" strokeWidth="2" />
    </svg>
  </RefFrame>
);
export const NorteEstoqueCapaBalanca = LinhaSinais;
export const NorteEstoqueCapaMapa = Caderno;
export const NorteEstoqueCapaEtiqueta = Mapa;
export const NorteEstoqueCapaMedidor = Mesa;




