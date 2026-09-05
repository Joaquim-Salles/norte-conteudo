import React from 'react';
import {colors} from './tokens';
import {IconSpark} from './icons';

type StatusChipTone = 'dark' | 'light';

type StatusChipProps = {
  /**
   * Verbo no GERÚNDIO, sem reticências (o componente adiciona) — ex:
   * "Organizando", "Sincronizando", "Analisando". Adaptar sempre pro
   * contexto do produto/cena da peça, nunca um texto fixo genérico.
   */
  verbo: string;
  /**
   * Cor que "vem da cena" (produto/tema da peça) — aparece só no círculo do
   * ícone, nunca como fundo do chip inteiro (ver relatório do fundador §3:
   * "cor de marca com moderação... aparece só onde fizer sentido
   * contextual"). Default: `colors.accent` (marca).
   */
  accentColor?: string;
  /** 'dark' (default) = pílula translúcida escura, pra foto clara/média. 'light' = pílula translúcida clara, pra foto muito escura. */
  tone?: StatusChipTone;
};

/**
 * "Chip de status" — pílula pequena, sombra leve, ícone + verbo no gerúndio +
 * reticências (2026-09-06, ver relatório completo do fundador §3: "chips de
 * status... funciona como se a marca estivesse narrando a cena"). Diferente
 * do `Badge` (rótulo de CATEGORIA, ex: "CARDÁPIO DIGITAL") — este é uma
 * legenda de CONTEXTO flutuante, discreta, num canto da cena, nunca centro
 * de atenção da peça.
 */
export const StatusChip: React.FC<StatusChipProps> = ({verbo, accentColor = colors.accent, tone = 'dark'}) => {
  const bg = tone === 'dark' ? 'rgba(12,12,11,0.55)' : 'rgba(255,255,255,0.86)';
  const ink = tone === 'dark' ? colors.white : colors.black;
  const border = tone === 'dark' ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.08)';

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        background: bg,
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        padding: '9px 20px 9px 12px',
        borderRadius: 999,
        border: `1px solid ${border}`,
        boxShadow: '0 8px 22px -12px rgba(0,0,0,0.55)',
      }}
    >
      <div
        style={{
          width: 24,
          height: 24,
          borderRadius: 999,
          background: accentColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <IconSpark size={13} color={colors.white} strokeWidth={2.4} />
      </div>
      <span
        style={{
          fontFamily: 'Atkinson Hyperlegible',
          fontSize: 19,
          fontWeight: 700,
          letterSpacing: 0.1,
          color: ink,
          whiteSpace: 'nowrap',
        }}
      >
        {verbo}…
      </span>
    </div>
  );
};
