import React from 'react';
import {colors} from './tokens';
import {WhatsAppIcon, ArrowRight} from './icons';

type CtaBandProps = {
  /** Texto de acao curto, direto — nunca generico ("comenta aqui" etc). */
  label?: string;
  sub?: string;
  variant?: 'accent' | 'dark';
};

/**
 * Banda de CTA compartilhada — NUCLEO de lead-gen de toda peca (nao decoracao).
 * Sempre aponta pro WhatsApp/link na bio. Reponderado no onboarding 2026-08-30:
 * nenhum CTA relevante deve ficar generico tipo "comenta/curte".
 */
export const CtaBand: React.FC<CtaBandProps> = ({
  label = 'Chama no WhatsApp',
  sub = 'link na bio',
  variant = 'accent',
}) => {
  const bg = variant === 'accent' ? colors.accent : colors.primaryDark;
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: bg,
        borderRadius: 20,
        padding: '26px 32px',
        boxShadow: '0 18px 40px -12px rgba(0,0,0,0.35)',
      }}
    >
      <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
        <WhatsAppIcon size={44} color={colors.white} />
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <span style={{fontSize: 30, fontWeight: 700, color: colors.white, lineHeight: 1.05}}>
            {label}
          </span>
          <span
            style={{
              fontSize: 20,
              fontWeight: 400,
              color: colors.white,
              opacity: 0.85,
              marginTop: 2,
            }}
          >
            {sub}
          </span>
        </div>
      </div>
      <ArrowRight size={30} color={colors.white} />
    </div>
  );
};
