import React from 'react';
import {Still} from 'remotion';
import {
  EtapasCapa,
  EtapasEntrada,
  EtapasConferencia,
  EtapasSaida,
  EtapasProva,
  EtapasFechamento,
} from './templates/EtapasDeEstoque';
import {RotasCapa, RotasRestaurante, RotasLojaDeRoupa, RotasDistribuidora, RotasFechamento} from './templates/Rotas';
import {RetratoCapa, RetratoCitacao, RetratoPapel1, RetratoPapel2} from './templates/Retrato';
import {VozesGradeCapa, VozesGradeCitacao1, VozesGradeCitacao2, VozesGradeFechamento} from './templates/VozesGrade';
import {LojaCapa, LojaReposicao, LojaPico, LojaConferencia, LojaFechamento} from './templates/RetratoLoja';
import {
  ArgumentoCapa,
  ArgumentoGestao,
  ArgumentoLimite,
  ArgumentoOperacao,
  ArgumentoComplementa,
  ArgumentoFechamento,
} from './templates/ArgumentoOmieNtb';
import {
  PilaresCapa,
  PilaresProblema,
  PilaresSolucao,
  PilaresFechamento,
} from './templates/PilaresApresentacao';
import {
  AntesDepoisAntes,
  AntesDepoisPonte,
  AntesDepoisDepois,
  AntesDepoisFechamento,
} from './templates/RetratoAntesDepois';
import {VendasCapa, VendasBalcao, VendasDelivery, VendasFechamento} from './templates/RotasVendas';
import {AvaliaCapa, AvaliaContratacao, AvaliaProcesso, AvaliaFornecedor, AvaliaFechamento} from './templates/RotasAvalia';
import {
  InstitucionalCapa,
  InstitucionalRegistra,
  InstitucionalMede,
  InstitucionalRevisa,
  InstitucionalDecide,
  InstitucionalFechamento,
} from './templates/RotasInstitucional';
import {
  EstoquePerdaCapa,
  EstoquePerdaValidade,
  EstoquePerdaRaiz,
  EstoquePerdaQuebra,
  EstoquePerdaContagem,
  EstoquePerdaFechamento,
} from './templates/RotasEstoquePerda';
import {
  AvaliaRenovacaoCapa,
  AvaliaRenovacaoContrato,
  AvaliaRenovacaoFornecedor,
  AvaliaRenovacaoPreco,
  AvaliaRenovacaoFechamento,
} from './templates/RotasAvaliaRenovacao';
import {
  EstoqueSazonalidadeCapa,
  EstoqueSazonalidadePre,
  EstoqueSazonalidadePico,
  EstoqueSazonalidadeReposicao,
  EstoqueSazonalidadeSobra,
  EstoqueSazonalidadeFechamento,
} from './templates/RotasEstoqueSazonalidade';
import {
  EstoqueMultilojaCapa,
  EstoqueMultilojaLojaA,
  EstoqueMultilojaLojaB,
  EstoqueMultilojaFechamento,
} from './templates/RotasEstoqueMultiloja';
import {
  VendasPromocaoCapa,
  VendasPromocaoDesconto,
  VendasPromocaoMargem,
  VendasPromocaoRegistro,
  VendasPromocaoFechamento,
} from './templates/RotasVendasPromocao';
import {
  VendasCaixaCapa,
  VendasCaixaConferencia,
  VendasCaixaDiferenca,
  VendasCaixaFechamento,
  VendasCaixaFechamentoFinal,
} from './templates/RotasVendasCaixa';
import {
  AvaliaComplianceCapa,
  AvaliaComplianceCertificacao,
  AvaliaComplianceRaiz,
  AvaliaComplianceJuridico,
  AvaliaComplianceMulta,
  AvaliaComplianceFechamento,
} from './templates/RotasAvaliaCompliance';
import {
  InstitucionalConfiancaCapa,
  InstitucionalConfiancaTransparencia,
  InstitucionalConfiancaConsistencia,
  InstitucionalConfiancaFechamento,
} from './templates/RotasInstitucionalConfianca';

/**
 * Formato feed padrão da Norte (4:5) — 1080x1350, ver design-dna.json
 * design_system.layout.max_content_width.
 */
const FEED_WIDTH = 1080;
const FEED_HEIGHT = 1350;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Still id="EtapasCapa" component={EtapasCapa} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="EtapasEntrada" component={EtapasEntrada} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="EtapasConferencia" component={EtapasConferencia} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="EtapasSaida" component={EtapasSaida} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="EtapasProva" component={EtapasProva} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="EtapasFechamento" component={EtapasFechamento} width={FEED_WIDTH} height={FEED_HEIGHT} />

      {/* Rotas — novo formato-flagship (2026-09-05), ver CATALOGO.md */}
      <Still id="RetratoCapa" component={RetratoCapa} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="RetratoCitacao" component={RetratoCitacao} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="RetratoPapel1" component={RetratoPapel1} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="RetratoPapel2" component={RetratoPapel2} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="VozesGradeCapa" component={VozesGradeCapa} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="VozesGradeCitacao1" component={VozesGradeCitacao1} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="VozesGradeCitacao2" component={VozesGradeCitacao2} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="VozesGradeFechamento" component={VozesGradeFechamento} width={FEED_WIDTH} height={FEED_HEIGHT} />

      {/* Vozes — variação "Loja" (Rodada 3, 2026-09-06): "um dia inteiro" contado com 1 foto só, crop por etapa */}
      <Still id="LojaCapa" component={LojaCapa} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="LojaReposicao" component={LojaReposicao} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="LojaPico" component={LojaPico} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="LojaConferencia" component={LojaConferencia} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="LojaFechamento" component={LojaFechamento} width={FEED_WIDTH} height={FEED_HEIGHT} />

      {/* Vozes — variação "Antes/Depois" (Rodada 3, 2026-09-06): mesma foto, tratamento de cor frio→quente */}
      <Still id="AntesDepoisAntes" component={AntesDepoisAntes} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="AntesDepoisPonte" component={AntesDepoisPonte} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="AntesDepoisDepois" component={AntesDepoisDepois} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="AntesDepoisFechamento" component={AntesDepoisFechamento} width={FEED_WIDTH} height={FEED_HEIGHT} />

      <Still id="RotasCapa" component={RotasCapa} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="RotasRestaurante" component={RotasRestaurante} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="RotasLojaDeRoupa" component={RotasLojaDeRoupa} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="RotasDistribuidora" component={RotasDistribuidora} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="RotasFechamento" component={RotasFechamento} width={FEED_WIDTH} height={FEED_HEIGHT} />

      {/* Rotas — NTB Vendas (multiplicação do formato, 2026-09-05), ver CATALOGO.md */}
      <Still id="VendasCapa" component={VendasCapa} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="VendasBalcao" component={VendasBalcao} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="VendasDelivery" component={VendasDelivery} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="VendasFechamento" component={VendasFechamento} width={FEED_WIDTH} height={FEED_HEIGHT} />

      {/* Rotas — Norte Avalia (multiplicação do formato, 2026-09-05) */}
      <Still id="AvaliaCapa" component={AvaliaCapa} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="AvaliaContratacao" component={AvaliaContratacao} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="AvaliaProcesso" component={AvaliaProcesso} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="AvaliaFornecedor" component={AvaliaFornecedor} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="AvaliaFechamento" component={AvaliaFechamento} width={FEED_WIDTH} height={FEED_HEIGHT} />

      {/* Rotas — Institucional/marca, tom educacional puro (multiplicação do formato, 2026-09-05) */}
      <Still id="InstitucionalCapa" component={InstitucionalCapa} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="InstitucionalRegistra" component={InstitucionalRegistra} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="InstitucionalMede" component={InstitucionalMede} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="InstitucionalRevisa" component={InstitucionalRevisa} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="InstitucionalDecide" component={InstitucionalDecide} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="InstitucionalFechamento" component={InstitucionalFechamento} width={FEED_WIDTH} height={FEED_HEIGHT} />

      {/* Rotas — NTB Estoque, tema perda/quebra (Rodada 14, 2026-09-05): testa a linha ramificada */}
      <Still id="EstoquePerdaCapa" component={EstoquePerdaCapa} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="EstoquePerdaValidade" component={EstoquePerdaValidade} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="EstoquePerdaRaiz" component={EstoquePerdaRaiz} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="EstoquePerdaQuebra" component={EstoquePerdaQuebra} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="EstoquePerdaContagem" component={EstoquePerdaContagem} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="EstoquePerdaFechamento" component={EstoquePerdaFechamento} width={FEED_WIDTH} height={FEED_HEIGHT} />

      {/* Rotas — Norte Avalia, tema renovação de contrato (Rodada 14, 2026-09-05): testa passagem de bastão + curva orgânica */}
      <Still id="AvaliaRenovacaoCapa" component={AvaliaRenovacaoCapa} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="AvaliaRenovacaoContrato" component={AvaliaRenovacaoContrato} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="AvaliaRenovacaoFornecedor" component={AvaliaRenovacaoFornecedor} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="AvaliaRenovacaoPreco" component={AvaliaRenovacaoPreco} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="AvaliaRenovacaoFechamento" component={AvaliaRenovacaoFechamento} width={FEED_WIDTH} height={FEED_HEIGHT} />

      {/* Rotas — NTB Estoque, tema sazonalidade (Rodada 15, 2026-09-05): 4 trilhas, linha S-curve */}
      <Still id="EstoqueSazonalidadeCapa" component={EstoqueSazonalidadeCapa} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="EstoqueSazonalidadePre" component={EstoqueSazonalidadePre} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="EstoqueSazonalidadePico" component={EstoqueSazonalidadePico} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="EstoqueSazonalidadeReposicao" component={EstoqueSazonalidadeReposicao} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="EstoqueSazonalidadeSobra" component={EstoqueSazonalidadeSobra} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="EstoqueSazonalidadeFechamento" component={EstoqueSazonalidadeFechamento} width={FEED_WIDTH} height={FEED_HEIGHT} />

      {/* Rotas — NTB Estoque, tema múltiplas lojas (Rodada 15, 2026-09-05): 2 trilhas, passagem de bastão */}
      <Still id="EstoqueMultilojaCapa" component={EstoqueMultilojaCapa} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="EstoqueMultilojaLojaA" component={EstoqueMultilojaLojaA} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="EstoqueMultilojaLojaB" component={EstoqueMultilojaLojaB} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="EstoqueMultilojaFechamento" component={EstoqueMultilojaFechamento} width={FEED_WIDTH} height={FEED_HEIGHT} />

      {/* Rotas — NTB Vendas, tema promoção sem prejuízo (Rodada 15, 2026-09-05): 3 trilhas, ângulo reto */}
      <Still id="VendasPromocaoCapa" component={VendasPromocaoCapa} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="VendasPromocaoDesconto" component={VendasPromocaoDesconto} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="VendasPromocaoMargem" component={VendasPromocaoMargem} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="VendasPromocaoRegistro" component={VendasPromocaoRegistro} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="VendasPromocaoFechamento" component={VendasPromocaoFechamento} width={FEED_WIDTH} height={FEED_HEIGHT} />

      {/* Rotas — NTB Vendas, tema fechamento de caixa (Rodada 15, 2026-09-05): 3 trilhas, curva orgânica */}
      <Still id="VendasCaixaCapa" component={VendasCaixaCapa} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="VendasCaixaConferencia" component={VendasCaixaConferencia} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="VendasCaixaDiferenca" component={VendasCaixaDiferenca} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="VendasCaixaFechamento" component={VendasCaixaFechamento} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="VendasCaixaFechamentoFinal" component={VendasCaixaFechamentoFinal} width={FEED_WIDTH} height={FEED_HEIGHT} />

      {/* Rotas — Norte Avalia, tema risco de compliance (Rodada 15, 2026-09-05): 3 trilhas finais, linha ramificada */}
      <Still id="AvaliaComplianceCapa" component={AvaliaComplianceCapa} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="AvaliaComplianceCertificacao" component={AvaliaComplianceCertificacao} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="AvaliaComplianceRaiz" component={AvaliaComplianceRaiz} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="AvaliaComplianceJuridico" component={AvaliaComplianceJuridico} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="AvaliaComplianceMulta" component={AvaliaComplianceMulta} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="AvaliaComplianceFechamento" component={AvaliaComplianceFechamento} width={FEED_WIDTH} height={FEED_HEIGHT} />

      {/* Rotas — Institucional, tema confiança do cliente (Rodada 15, 2026-09-05): 2 trilhas, sem CTA */}
      <Still id="InstitucionalConfiancaCapa" component={InstitucionalConfiancaCapa} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="InstitucionalConfiancaTransparencia" component={InstitucionalConfiancaTransparencia} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="InstitucionalConfiancaConsistencia" component={InstitucionalConfiancaConsistencia} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="InstitucionalConfiancaFechamento" component={InstitucionalConfiancaFechamento} width={FEED_WIDTH} height={FEED_HEIGHT} />

      {/* ARGUMENTO — formato novo, sem trilho (correção 2026-09-08 em cima da 1ª tentativa em Rotas): "O Omie organiza a gestão. E quem organiza a operação?" — blocos de cor cheia + tipografia grande, ver CATALOGO.md Rodada 21 */}
      <Still id="ArgumentoCapa" component={ArgumentoCapa} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="ArgumentoGestao" component={ArgumentoGestao} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="ArgumentoLimite" component={ArgumentoLimite} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="ArgumentoOperacao" component={ArgumentoOperacao} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="ArgumentoComplementa" component={ArgumentoComplementa} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="ArgumentoFechamento" component={ArgumentoFechamento} width={FEED_WIDTH} height={FEED_HEIGHT} />

      {/* PILARES — carrossel fixado #1, apresentação institucional da NTB (2026-09-09): capa com diagrama hub-and-spoke das 6 palavras-pilar, problema, ecossistema de 4 partes, fechamento com mascote como assinatura. Ver CATALOGO.md pra decisões de composição. */}
      <Still id="PilaresCapa" component={PilaresCapa} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="PilaresProblema" component={PilaresProblema} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="PilaresSolucao" component={PilaresSolucao} width={FEED_WIDTH} height={FEED_HEIGHT} />
      <Still id="PilaresFechamento" component={PilaresFechamento} width={FEED_WIDTH} height={FEED_HEIGHT} />
    </>
  );
};
