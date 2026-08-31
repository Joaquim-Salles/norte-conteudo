import React from 'react';
import {
  Check,
  TrendingUp,
  AlertTriangle,
  MessageCircle,
  BarChart3,
  RefreshCw,
  ArrowRight as LucideArrowRight,
} from 'lucide-react';

/**
 * Wrapper central de ícones — todo componente que precisa de um ÍCONE REAL
 * (não forma SVG desenhada à mão) importa DAQUI, nunca direto de
 * 'lucide-react'. Trocar de biblioteca no futuro vira mudança de 1 arquivo,
 * não busca-e-substitui pelo repo inteiro.
 *
 * BIBLIOTECA ESCOLHIDA: Lucide (`lucide-react`, npm, v1.38.0 instalada em
 * 2026-08-31). Licença confirmada na FONTE PRIMÁRIA
 * (github.com/lucide-icons/lucide/blob/main/LICENSE, 2026-08-31): dual
 * **ISC** (ícones próprios da Lucide) + **MIT** (ícones herdados do fork
 * original Feather, de Cole Bemis) — ambas permitem uso comercial,
 * modificação e distribuição livres, exigindo só manter o aviso de
 * copyright. Zero custo, zero chave de API, zero CDN: o pacote é resolvido
 * em build-time pelo bundler do Remotion, os ícones são componentes React
 * SVG puros — mesmo critério já aplicado às fontes em `fonts.ts` (nada
 * carregado de fora em tempo de render, senão o render fica
 * não-determinístico).
 *
 * Por que Lucide e não Heroicons/Tabler Icons/Phosphor (as 3 também MIT,
 * comercial-livre, confirmadas na mesma checagem de licença 2026-08-31):
 * pacote React mais leve e maduro pra consumo tree-shakeable, cobre todos
 * os casos semânticos que a Norte precisa hoje (check, seta, alerta, chat,
 * gráfico, ciclo) com traço uniforme (stroke, não preenchimento sólido) —
 * combina com a linguagem gráfica já estabelecida em GhostGraphics.tsx.
 * Reavaliar só se faltar um ícone específico que nenhuma delas cubra.
 *
 * REGRA DE MARCA DE TERCEIRO: nunca usar o glifo oficial do WhatsApp/Meta
 * (marca registrada) — por isso o CTA usa `IconChat` (bolha de mensagem
 * genérica, `MessageCircle`), não um ícone de marca. O `WhatsAppIcon`
 * desenhado à mão que existia antes (removido nesta revisão) na prática
 * recriava o contorno do logo oficial — mais um motivo pra troca, não só
 * "ícone melhor".
 */

type IconProps = {
  size?: number;
  color?: string;
  strokeWidth?: number;
};

type LucideComponent = React.ComponentType<{
  size?: number;
  color?: string;
  strokeWidth?: number;
}>;

function wrapIcon(Lucide: LucideComponent, defaultSize: number, defaultStrokeWidth: number): React.FC<IconProps> {
  const Wrapped: React.FC<IconProps> = ({size = defaultSize, color = '#ffffff', strokeWidth = defaultStrokeWidth}) => (
    <Lucide size={size} color={color} strokeWidth={strokeWidth} />
  );
  return Wrapped;
}

/** Check/validação — estado resolvido, feature confirmada, "depois" que deu certo. */
export const IconCheck = wrapIcon(Check, 28, 3);

/** Seta de crescimento — métrica melhorou, resultado positivo (não decorativo: usar junto de um número real). */
export const IconGrowth = wrapIcon(TrendingUp, 28, 2.4);

/** Alerta — achismo/risco/estado "antes" ainda não resolvido. */
export const IconAlert = wrapIcon(AlertTriangle, 28, 2.2);

/** Chat/mensagem genérico — CTA de WhatsApp. NUNCA o glifo oficial da marca. */
export const IconChat = wrapIcon(MessageCircle, 40, 2);

/** Gráfico de dados — reforça "Dado" (em oposição a achismo). */
export const IconChart = wrapIcon(BarChart3, 28, 2.4);

/** Ciclo/repetição — metodologia contínua (PDCA/Lean, "se repete até virar rotina"). */
export const IconCycle = wrapIcon(RefreshCw, 36, 2.6);

/** Seta de CTA — reforça direção pro link/DM. */
export const IconArrowRight = wrapIcon(LucideArrowRight, 28, 2.4);
