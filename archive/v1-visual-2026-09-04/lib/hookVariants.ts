/**
 * hookVariants.ts — dados dos 4 segundos de abertura (HookSegment) do
 * `NorteApresentacaoReel`, extraídos pra fora do componente.
 *
 * Contexto (2026-09-03): o fundador aprovou a v2 do vídeo institucional
 * ("Sim, quero várias variações [de] ganchos.") e pediu múltiplas variações
 * do HOOK de abertura, mesmo princípio de A/B test de headline que o
 * Remotion permite — MESMA template (mesma estrutura, timing, fotos de
 * fundo, animação), DADO diferente (só o texto/ícone do gancho muda). Isso é
 * o que faz o teste ser válido: se a virada/vitrine/CTA também mudassem,
 * não daria pra atribuir diferença de performance ao gancho especificamente.
 *
 * Por isso `HookContent` espelha 1:1 os slots que já existiam hardcoded na
 * v2 (eyebrow+ícone, linha 1 topo-esquerda, linha 2+3 base, punch final) —
 * nenhum slot novo, nenhuma mudança de posição/timing/foto por variante.
 *
 * As 5 variações abaixo cobrem ângulos retóricos DIFERENTES de verdade (não
 * só sinônimos da mesma frase), calibrados pelo ICP real (`brand/audience.md`:
 * PME de restaurante/logística/varejo, dor = decisão "no achismo" em vez de
 * dado, desejo = eficiência/controle) e pelo bordão de marca (`brand/voice.md`:
 * "não trabalhamos com achismos"). A palavra-víllã "ACHISMO" é mantida como
 * âncora de marca em 4 das 5 variações (ela é literalmente o inimigo que a
 * Norte vende a cura pra — trocar isso a cada variante quebraria a
 * consistência de marca, que não é o que está sendo testado aqui).
 */

import type {ComponentType} from 'react';
import {IconAlert, IconChart, IconGrowth, IconCompass} from './icons';

export type HookEyebrowIcon = 'alert' | 'chart' | 'growth' | 'compass';

export const HOOK_EYEBROW_ICONS: Record<HookEyebrowIcon, ComponentType<{size: number; color: string; strokeWidth: number}>> = {
  alert: IconAlert,
  chart: IconChart,
  growth: IconGrowth,
  compass: IconCompass,
};

export type HookContent = {
  /** Rótulo curto pra CATALOGO.md e nome de arquivo de render. */
  label: string;
  /** Lógica retórica em 1 frase — documentado aqui pra não divergir do que vai no CATALOGO.md. */
  angulo: string;
  eyebrowIcon: HookEyebrowIcon;
  eyebrowText: string;
  /** Beat A — topo-esquerda, sobre a foto de estoque (frames 8–52 aprox). */
  line1: string;
  /** Beat B linha 1 — base, sobre a foto de restaurante, fonte grande (frames 50+). */
  line2: string;
  /** Beat B linha 2 — base, fonte menor, entra depois (frames 66+). */
  line3: string;
  /** Punch final, tela cheia (frames 86+). */
  punch: string;
};

export type HookVariantId =
  | 'dor-direta'
  | 'pergunta-retorica'
  | 'dado-real'
  | 'provocacao-comparacao'
  | 'afirmacao-marca';

export const HOOK_VARIANTS: Record<HookVariantId, HookContent> = {
  // Controle do teste A/B — é o gancho da v2 já aprovada pelo fundador,
  // mantido sem alteração de texto. Nomeia a dor operacional concreta da
  // ICP (estoque errado, prato que não vende) antes de nomear o vilão.
  'dor-direta': {
    label: 'Dor Direta',
    angulo: 'Nomeia 2 dores operacionais concretas da ICP (estoque, vendas) em sequência, sem rodeio, antes de nomear o vilão comum às duas.',
    eyebrowIcon: 'alert',
    eyebrowText: 'Sem dado real',
    line1: 'Estoque errado.',
    line2: 'Prato que não vende.',
    line3: 'Decisão tomada no escuro.',
    punch: 'ACHISMO.',
  },

  // Pergunta retórica — força autodiagnóstico em vez de descrever a dor de
  // fora. Quem não sabe responder de cabeça já sente o gancho na pele.
  'pergunta-retorica': {
    label: 'Pergunta Retórica',
    angulo: 'Interpelação direta em 2ª pessoa — o espectador tenta responder mentalmente, e a resposta "mais ou menos" já é a confissão do problema.',
    eyebrowIcon: 'alert',
    eyebrowText: 'Responda rápido',
    line1: 'Quanto sobrou de lucro?',
    line2: 'Se você não sabe de cabeça,',
    line3: 'sua gestão roda no escuro.',
    punch: 'ACHISMO.',
  },

  // Dado/estatística real — reusa o MESMO dado já validado e usado no
  // template DadoVsAchismo.tsx (fonte: "Norte Para Negócios, diagnóstico
  // operacional"), condensado pro ritmo de 4s. Não inventa número novo —
  // seria ironicamente um "achismo" fabricar estatística pra um vídeo que
  // vende "decida com dado".
  'dado-real': {
    label: 'Dado Real',
    angulo: 'Abre com prova numérica (mesmo dado já usado em DadoVsAchismo.tsx) em vez de dor genérica — apela pro público que reage mais a estatística do que a apelo emocional.',
    eyebrowIcon: 'chart',
    eyebrowText: 'Dado real',
    line1: '38% das PMEs',
    line2: 'perdem margem no estoque.',
    line3: 'E nem sabem quanto.',
    punch: 'ACHISMO.',
  },

  // Provocação/comparação — usa comparação social (concorrente) em vez de
  // dor introspectiva. Mira o gatilho competitivo do dono de PME.
  'provocacao-comparacao': {
    label: 'Provocação/Comparação',
    angulo: 'Comparação social com concorrente — desloca a dor de "eu não sei gerir" pra "eu estou perdendo pra quem sabe", gatilho competitivo em vez de autocrítico.',
    eyebrowIcon: 'growth',
    eyebrowText: 'Compare',
    line1: 'Seu concorrente cresce.',
    line2: 'Ele não é mais sortudo.',
    line3: 'Ele só parou de adivinhar.',
    punch: 'ACHISMO.',
  },

  // Afirmação de marca — não nomeia o vilão primeiro, declara o
  // posicionamento da Norte como statement direto. Fecha com a variação
  // afirmativa do bordão ("SEM achismo") em vez de nomear a palavra-vilã
  // sozinha — o punch aqui é a promessa, não a acusação.
  'afirmacao-marca': {
    label: 'Afirmação de Marca',
    angulo: 'Declaração de posicionamento em vez de acusação/pergunta — o punch vira a promessa da marca ("SEM ACHISMO"), não o nome do vilão isolado.',
    eyebrowIcon: 'compass',
    eyebrowText: 'Norte Para Negócios',
    line1: 'Gestão não é sorte.',
    line2: 'É dado. É clareza.',
    line3: 'É decisão de verdade.',
    punch: 'SEM ACHISMO.',
  },
};

export const HOOK_VARIANT_IDS: HookVariantId[] = [
  'dor-direta',
  'pergunta-retorica',
  'dado-real',
  'provocacao-comparacao',
  'afirmacao-marca',
];
