#!/usr/bin/env node
import {renderStill} from './lib-render.mjs';

/**
 * Teste de volume real do pipeline (2026-09-04) — pedido direto do fundador:
 * "quero ver o pipeline rodando em volume real (100 peças), não mais amostra
 * de poucas peças." Não é o parser de brief mensal (scripts/parse-brief.mjs
 * ainda espera o formato provisório documentado nele, e nenhum brief real
 * chegou — ver comentário no topo daquele arquivo); este script itera uma
 * lista de 100 itens de conteúdo REAL (baseado em .claude/brand/products.md
 * e voice.md — estatísticas plausíveis de operação, features dos 3 produtos,
 * bordões da marca) direto contra os 8 `<Still>` já registrados em
 * src/Root.tsx, reaproveitando `renderStill` (mesma função que
 * scripts/render.mjs e todos os scripts de QA já usam — evita bug de
 * encoding de acentos documentado em lib-render.mjs).
 *
 * Distribuição: 8 tipos x ~12-13 itens cada = 100. Tipos carrossel
 * (DicaPratica/MetodologiaSemEnrolacao/Depoimento) renderizam 1 slide por
 * item da lista (não o carrossel inteiro) — pra manter a contagem em
 * exatamente 100 imagens/thumbnails, cobrindo os `kind` de slide variados
 * como itens distintos.
 *
 * Uso: node scripts/gerar-teste-100.mjs [--start N] [--end N]
 * (start/end permitem rodar em lotes, ex: --start 0 --end 10)
 */

const THEMES = ['marca', 'estoque', 'vendas', 'avalia'];

const BATCH = [];

// ============================================================
// 1. DadoVsAchismo — 13 itens (padrao/impacto/ladoALado x 4 temas)
// ============================================================
const DADO_VS_ACHISMO = [
  {variant: 'padrao', theme: 'estoque', achismo: '"Acho que a gente nunca fica sem produto."', dado: '1 em cada 4 PMEs de varejo enfrenta ruptura de estoque toda semana, sem perceber o padrão.', fonteDado: 'Norte Para Negócios, diagnóstico operacional'},
  {variant: 'impacto', theme: 'estoque', achismo: '"Bate tudo certinho no inventário."', dado: '-92% de divergência quando o inventário é feito por leitura de QR code, não de cabeça.'},
  {variant: 'ladoALado', theme: 'estoque', achismo: '"Meu ERP já resolve isso sozinho."', dado: 'Empresas com Omie sem sincronização física-sistema perdem em média 6h/semana conciliando estoque na mão.'},
  {variant: 'padrao', theme: 'vendas', achismo: '"O garçom dá conta de anotar tudo certo."', dado: '43% dos pedidos anotados à mão têm algum erro entre mesa e cozinha.'},
  {variant: 'impacto', theme: 'vendas', achismo: '"Fila é só em hora de pico mesmo."', dado: '27min é o tempo médio de espera num restaurante sem comanda digital em dia de movimento.'},
  {variant: 'ladoALado', theme: 'vendas', achismo: '"Cliente não liga de esperar a conta."', dado: '68% dos clientes dizem que sair rápido no pagamento influencia se vão voltar ao restaurante.'},
  {variant: 'padrao', theme: 'avalia', achismo: '"Avaliação anual já mostra quem tá indo bem."', dado: 'Ciclos anuais identificam queda de performance 11 meses depois, em média, de quando ela começou.'},
  {variant: 'impacto', theme: 'avalia', achismo: '"Feedback informal já resolve."', dado: '0% é a taxa de PDI formal que sobrevive sem dado — vira só opinião do gestor.'},
  {variant: 'ladoALado', theme: 'avalia', achismo: '"Todo mundo do time já sabe onde precisa melhorar."', dado: 'Só 1 em cada 3 colaboradores recebe feedback estruturado de desempenho no ano.'},
  {variant: 'padrao', theme: 'marca', achismo: '"A gente decide no feeling mesmo, dá certo."', dado: 'Empresas que decidem com dado crescem em média 23% mais rápido que quem decide por intuição.'},
  {variant: 'impacto', theme: 'marca', achismo: '"Processo tá ok, ninguém reclama."', dado: '73% dos processos internos de PME nunca foram formalmente mapeados.'},
  {variant: 'ladoALado', theme: 'marca', achismo: '"Não precisamos de metodologia, já funciona."', dado: 'Times que aplicam PDCA de forma consistente reduzem retrabalho em até 30% no primeiro trimestre.'},
  {variant: 'padrao', theme: 'vendas', achismo: '"Cardápio de papel já resolve."', dado: 'Restaurantes com cardápio digital reportam ticket médio até 15% maior por sugestão visual de itens.'},
].map((p, i) => ({
  compositionId: 'DadoVsAchismo',
  outName: `DadoVsAchismo-${String(i + 1).padStart(2, '0')}-${p.variant}-${p.theme}`,
  props: {fonteDado: 'Norte Para Negócios, diagnóstico operacional', ...p},
}));

// ============================================================
// 2. DicaPratica — 12 itens (1 slide por item, kinds variados)
// ============================================================
const DICA_PRATICA = [
  {kind: 'cover', titulo: '3 erros que travam seu estoque todo mês', tagNumero: '3 ERROS'},
  {kind: 'cover', titulo: '5 sinais de que seu processo tá no achismo', tagNumero: '5 SINAIS'},
  {kind: 'cover', titulo: '4 passos pra zerar fila no salão', tagNumero: '4 PASSOS'},
  {kind: 'cover-grid', titulo: '3 hábitos de quem nunca perde inventário', tagNumero: '3 HÁBITOS', itens: ['Contagem cíclica, não só anual', 'Etiqueta por lote e validade', 'Reconciliação semanal, não mensal']},
  {kind: 'cover-grid', titulo: '4 perguntas antes de comprar mais estoque', tagNumero: '4 PERGUNTAS', itens: ['Isso realmente girou no último mês?', 'Tem lote perto de vencer parado?', 'O fornecedor entrega mais rápido que isso?', 'Dá pra repor sob demanda em vez de estocar?']},
  {kind: 'cover-quote', titulo: 'Achismo custa caro', citacao: '"Achava que meu processo tava ok até ver o número."'},
  {kind: 'cover-quote', titulo: 'Dado não mente', citacao: '"Decisão sem dado é só opinião com aparência de plano."'},
  {kind: 'cover-foto', titulo: 'O que muda quando o pedido cai direto na cozinha', tagNumero: 'CARDÁPIO DIGITAL', foto: 'photos/salao-moderno-movimento.jpg'},
  {kind: 'cover-foto', titulo: 'Estoque de verdade começa no chão do depósito', tagNumero: 'NTB ESTOQUE', foto: 'photos/corredor-empilhadeira-estoque.jpg'},
  {kind: 'bridge', numero: 1, total: 3, titulo: 'Meça antes de mudar', corpo: 'Todo diagnóstico começa com número real, não com achismo de quem tá cansado do processo.'},
  {kind: 'bridge', numero: 2, total: 4, titulo: 'Padronize o que se repete', corpo: 'Se dois times fazem o mesmo processo de jeitos diferentes, você tem dois processos, não um.'},
  {kind: 'cta', headline: 'Chega de gerenciar estoque no achismo.'},
].map((slide, i) => ({
  compositionId: 'DicaPratica',
  outName: `DicaPratica-${String(i + 1).padStart(2, '0')}-${slide.kind}`,
  props: {slide},
}));

// ============================================================
// 3. AntesDepois — 12 itens (padrao/ladoALado/metricaHero x 4 temas)
// ============================================================
const ANTES_DEPOIS = [
  {variant: 'padrao', theme: 'estoque', antesTexto: 'Inventário fechava com divergência todo mês, sem explicação.', depoisTexto: 'Inventário bate com o sistema, sem retrabalho.', metrica: '-92% divergência'},
  {variant: 'ladoALado', theme: 'estoque', antesTexto: 'Ruptura de produto só era descoberta quando o cliente reclamava.', depoisTexto: 'Alerta de estoque baixo antes de faltar na prateleira.', metrica: '0 rupturas no trimestre'},
  {variant: 'metricaHero', theme: 'estoque', antesTexto: '6h por semana conciliando planilha com o Omie.', depoisTexto: 'Sincronização automática, sem digitar nada duas vezes.', metrica: '-6h/semana'},
  {variant: 'padrao', theme: 'vendas', antesTexto: 'Garçom levava pedido errado por anotar de cabeça.', depoisTexto: 'Pedido cai certo na cozinha, direto do celular do cliente.', metrica: '-43% erro de pedido'},
  {variant: 'ladoALado', theme: 'vendas', antesTexto: 'Fila formada na hora de fechar a conta.', depoisTexto: 'Conta calculada e dividida em segundos, no próprio celular.', metrica: '-70% tempo de fechamento'},
  {variant: 'metricaHero', theme: 'vendas', antesTexto: 'Ticket médio estagnado, cardápio de papel.', depoisTexto: 'Cardápio digital sugere upsell no próprio pedido.', metrica: '+15% ticket médio'},
  {variant: 'padrao', theme: 'avalia', antesTexto: 'Avaliação de desempenho só uma vez por ano, tarde demais.', depoisTexto: 'Ciclos mensais, feedback a tempo de corrigir rota.', metrica: '11 meses de antecedência a mais'},
  {variant: 'ladoALado', theme: 'avalia', antesTexto: 'PDI genérico, sem ligação com o desempenho real.', depoisTexto: 'PDI automático, gerado a partir do dado de cada colaborador.', metrica: '100% dos PDIs com dado'},
  {variant: 'metricaHero', theme: 'avalia', antesTexto: 'Ranking de desempenho feito no feeling do gestor.', depoisTexto: 'Dashboard com médias e evolução real de cada time.', metrica: '3x mais consistência'},
  {variant: 'padrao', theme: 'marca', antesTexto: 'Decisão de negócio no achismo, sem dado de apoio.', depoisTexto: 'Diagnóstico real antes de qualquer recomendação.', metrica: '+23% velocidade de crescimento'},
  {variant: 'ladoALado', theme: 'marca', antesTexto: 'Processo não documentado, cada um fazia do seu jeito.', depoisTexto: 'Processo mapeado e padronizado, PDCA aplicado de verdade.', metrica: '-30% retrabalho'},
  {variant: 'metricaHero', theme: 'marca', antesTexto: 'Retrabalho constante por processo mal desenhado.', depoisTexto: 'Fluxo redesenhado com Lean Six Sigma, sem gordura.', metrica: '-30% retrabalho'},
].map((p, i) => ({
  compositionId: 'AntesDepois',
  outName: `AntesDepois-${String(i + 1).padStart(2, '0')}-${p.variant}-${p.theme}`,
  props: p,
}));

// ============================================================
// 4. VitrineProduto — 13 itens (3 produtos x variantes, incl. print/contexto reais)
// ============================================================
const VITRINE_PRODUTO = [
  {produto: 'ntbEstoque', nomeProduto: 'NTB Estoque', variant: 'padrao', headline: 'Estoque sincronizado com o Omie em tempo real.', features: ['Leitura de QR code pra movimentação e inventário', 'Etiquetagem inteligente por lote/validade', 'Inventários otimizados, sem parar a loja', 'Perfis de acesso pra ajustes sensíveis']},
  {produto: 'ntbEstoque', nomeProduto: 'NTB Estoque', variant: 'hero', headline: 'Chega de estoque no achismo.', features: ['Sincronização em tempo real com o Omie', 'Leitura por QR code', 'Etiquetagem inteligente']},
  {produto: 'ntbEstoque', nomeProduto: 'NTB Estoque', variant: 'grid', headline: '4 motivos pra sair da planilha.', features: ['Sincronização automática', 'Rastreio por lote/validade', 'Inventário sem parar a loja', 'Acesso por perfil sensível']},
  {produto: 'ntbEstoque', nomeProduto: 'NTB Estoque', variant: 'print', headline: 'Veja o painel de estoque de verdade.', features: [], screenshot: 'screenshots/home-desktop.png', device: 'browser'},
  {produto: 'ntbVendas', nomeProduto: 'NTB Vendas', variant: 'padrao', headline: 'Pedido, cozinha e pagamento em um só cardápio digital.', features: ['Cardápio digital direto na mesa, sem app pro cliente', 'Pedido cai direto na cozinha, sem retrabalho de garçom', 'Pagamento e nota fiscal integrados no fechamento', 'Painel do lojista com tudo em tempo real']},
  {produto: 'ntbVendas', nomeProduto: 'NTB Vendas', variant: 'hero', headline: 'Sem filas, sem assobios.', features: ['Cardápio digital na mesa', 'Pedido direto na cozinha', 'Conta calculadora no celular']},
  {produto: 'ntbVendas', nomeProduto: 'NTB Vendas', variant: 'grid', headline: '4 travas que o Cardápio Digital resolve.', features: ['Erro de pedido anotado à mão', 'Fila pra fechar a conta', 'Falta de visibilidade de mesa', 'Ticket médio estagnado']},
  {produto: 'ntbVendas', nomeProduto: 'NTB Vendas', variant: 'print', headline: 'Cardápio digital, direto na mesa do cliente.', features: [], screenshot: 'screenshots/vendas-desktop.png', device: 'browser'},
  {produto: 'ntbVendas', nomeProduto: 'NTB Vendas', variant: 'contexto', headline: 'Isso resolve um problema de restaurante de verdade.', features: [], foto: 'photos/salao-moderno-movimento.jpg', screenshot: 'screenshots/vendas-mobile.png', device: 'phone', screenshotAspect: 1170 / 2532},
  {produto: 'norteAvalia', nomeProduto: 'Norte Avalia', variant: 'padrao', headline: 'Avaliação de desempenho sem achismo, com dado real.', features: ['Ciclos de avaliação automatizados', 'Feedback estruturado, não genérico', 'Histórico de evolução por colaborador', 'Relatório pronto pra gestão decidir']},
  {produto: 'norteAvalia', nomeProduto: 'Norte Avalia', variant: 'hero', headline: 'Troque avaliação anual por ciclo mensal.', features: ['Ciclos mensais/trimestrais', 'Feedback estruturado', 'PDI automático']},
  {produto: 'norteAvalia', nomeProduto: 'Norte Avalia', variant: 'grid', headline: '4 pilares de uma avaliação que gera evolução.', features: ['Comportamento', 'Entrega técnica', 'Alinhamento cultural', 'Potencial']},
  {produto: 'norteAvalia', nomeProduto: 'Norte Avalia', variant: 'padrao', headline: 'PDI automático, gerado a partir de dado real.', features: ['PDI por colaborador', 'Métricas padronizadas', 'Dashboard de evolução', 'Hierarquia: supervisor avalia só diretos']},
].map((p, i) => ({
  compositionId: 'VitrineProduto',
  outName: `VitrineProduto-${String(i + 1).padStart(2, '0')}-${p.variant}-${p.produto}`,
  props: p,
}));

// ============================================================
// 5. MetodologiaSemEnrolacao — 12 itens (1 slide por item)
// ============================================================
const METODOLOGIA = [
  {kind: 'cover', titulo: 'PDCA aplicado ao seu estoque', metodo: 'Metodologia'},
  {kind: 'cover', titulo: 'Lean aplicado ao salão do restaurante', metodo: 'Metodologia'},
  {kind: 'cover', titulo: 'PDI estruturado em 4 etapas', metodo: 'Metodologia'},
  {kind: 'cover-roadmap', titulo: 'Como aplicamos o PDCA', metodo: 'PDCA', etapas: ['Plan', 'Do', 'Check', 'Act']},
  {kind: 'cover-roadmap', titulo: '5W2H pra mapear qualquer processo', metodo: '5W2H', etapas: ['What', 'Why', 'Where', 'When', 'Who', 'How', 'How much']},
  {kind: 'cover-editorial', titulo: 'Método não é enfeite, é repetição que funciona.', subtitulo: 'Metodologia sem enrolação'},
  {kind: 'cover-editorial', titulo: 'Se não é repetível, não é método — é sorte.', subtitulo: 'Bastidores da Norte'},
  {kind: 'passo', numero: 1, total: 4, titulo: 'Plan', descricao: 'Diagnóstico real do estoque atual, sem achismo — número antes de qualquer mudança.'},
  {kind: 'passo', numero: 2, total: 4, titulo: 'Do', descricao: 'Aplicação da mudança em escala pequena, controlada, antes de virar padrão.'},
  {kind: 'passo', numero: 3, total: 3, titulo: 'Check', descricao: 'Comparação do resultado real contra o esperado — com dado, não com sensação.'},
  {kind: 'cta', headline: 'Metodologia de verdade começa com diagnóstico.'},
  {kind: 'cta', headline: 'PDCA não é slide de apresentação — é rotina.'},
].map((slide, i) => ({
  compositionId: 'MetodologiaSemEnrolacao',
  outName: `MetodologiaSemEnrolacao-${String(i + 1).padStart(2, '0')}-${slide.kind}`,
  props: {slide},
}));

// ============================================================
// 6. Depoimento — 13 itens (1 slide por item; citações-teste rotuladas como
// placeholder de QA, mesma convenção do defaultProps original — nenhum
// depoimento aqui é de cliente real, ver regra de escopo no CATALOGO.md §6).
// ============================================================
const DEPOIMENTO = [
  {kind: 'capa', theme: 'estoque', citacao: 'Antes eu só descobria a divergência no fim do mês. Hoje vejo o estoque batendo com o sistema todo dia.', cliente: 'Marcos Andrade', empresa: 'Distribuidora Bom Ponto'},
  {kind: 'capa', theme: 'vendas', citacao: 'A gente perdia cliente na fila do caixa e nem sabia quantificar isso.', cliente: 'Renata Souza', empresa: 'Sabor da Serra Restaurante'},
  {kind: 'capa', theme: 'avalia', citacao: 'Avaliação de desempenho virou rotina, não evento de fim de ano.', cliente: 'Diego Farias', empresa: 'Grupo Vetor Industrial'},
  {kind: 'capa-metrica', theme: 'estoque', metrica: '-92%', metricaLabel: 'divergência de estoque', citacaoCurta: 'Não erramos mais o inventário.', cliente: 'Marcos Andrade', empresa: 'Distribuidora Bom Ponto'},
  {kind: 'capa-metrica', theme: 'vendas', metrica: '+15%', metricaLabel: 'ticket médio', citacaoCurta: 'O cardápio digital paga a mensalidade sozinho.', cliente: 'Renata Souza', empresa: 'Sabor da Serra Restaurante'},
  {kind: 'contexto', theme: 'estoque', corpo: 'Antes, cada gerente de loja fazia inventário do seu jeito — número nunca batia entre unidades.', foto: 'photos/corredor-empilhadeira-estoque.jpg'},
  {kind: 'contexto', theme: 'vendas', corpo: 'A gente só sabia que tinha erro de pedido quando o cliente reclamava na mesa.', foto: 'photos/salao-moderno-movimento.jpg'},
  {kind: 'contexto', theme: 'avalia', corpo: 'Avaliação era uma conversa de 10 minutos, uma vez por ano, sem histórico nenhum.'},
  {kind: 'resultado', theme: 'estoque', corpo: 'Hoje a gente decide reposição com dado, não com feeling do gerente.', metrica: '-92% divergência', produto: 'ntbEstoque'},
  {kind: 'resultado', theme: 'vendas', corpo: 'Pedido cai certo, direto na cozinha, sem intermediário anotando errado.', metrica: '-43% erro de pedido', produto: 'ntbVendas'},
  {kind: 'resultado', theme: 'avalia', corpo: 'PDI de cada colaborador já vem pronto, com dado de 3 ciclos.', metrica: '100% dos PDIs com dado', produto: 'norteAvalia'},
  {kind: 'cta', theme: 'marca', headline: 'Quer um resultado assim no seu negócio?'},
  {kind: 'cta', theme: 'estoque', headline: 'Prova real, não promessa — fala com a gente.'},
].map(({theme, ...slide}, i) => ({
  compositionId: 'Depoimento',
  outName: `Depoimento-${String(i + 1).padStart(2, '0')}-${slide.kind}-${theme}`,
  props: {slide, theme},
}));

// ============================================================
// 7. Comparativo — 13 itens (colunas/tabela x produtos)
// ============================================================
const COMPARATIVO = [
  {variant: 'colunas', produto: 'ntbEstoque', tituloA: 'Do jeito antigo', tituloB: 'Com a Norte', itens: [
    {label: 'Controle de estoque', a: 'Planilha manual, atualizada de vez em quando', b: 'Sincronizado em tempo real com o Omie'},
    {label: 'Inventário', a: 'Conta de cabeça, sem lote nem validade', b: 'Leitura por QR code, etiqueta inteligente'},
    {label: 'Decisão de reposição', a: 'No achismo, só quando já faltou', b: 'Baseada em dado real de giro'},
  ]},
  {variant: 'colunas', produto: 'ntbVendas', tituloA: 'Comanda de papel', tituloB: 'Cardápio Digital', itens: [
    {label: 'Anotação de pedido', a: 'À mão, sujeito a erro', b: 'Direto do celular do cliente'},
    {label: 'Fila pra pagar', a: 'Fila no caixa', b: 'Conta calculadora, na mesa'},
    {label: 'Gestão de mesa', a: 'Sem visibilidade de ocupação', b: 'Status em tempo real'},
  ]},
  {variant: 'colunas', produto: 'norteAvalia', tituloA: 'Avaliação anual', tituloB: 'Norte Avalia', itens: [
    {label: 'Frequência', a: '1x por ano', b: 'Ciclos mensais/trimestrais'},
    {label: 'Base da nota', a: 'Opinião do gestor', b: 'Dado multidimensional'},
    {label: 'PDI', a: 'Genérico, sem follow-up', b: 'Automático, por colaborador'},
  ]},
  {variant: 'colunas', theme: 'marca', tituloA: 'Achismo', tituloB: 'Método', itens: [
    {label: 'Decisão', a: 'No feeling', b: 'Baseada em dado'},
    {label: 'Repetibilidade', a: 'Depende de quem faz', b: 'Processo documentado'},
    {label: 'Correção de rota', a: 'Só quando já deu errado', b: 'PDCA contínuo'},
  ]},
  {variant: 'colunas', produto: 'ntbEstoque', tituloA: 'Planilha', tituloB: 'NTB Estoque', itens: [
    {label: 'Atualização', a: 'Manual, atrasada', b: 'Tempo real'},
    {label: 'Rastreio de lote', a: 'Não existe', b: 'QR code por lote/validade'},
    {label: 'Acesso', a: 'Todo mundo mexe em tudo', b: 'Perfis por sensibilidade'},
  ]},
  {variant: 'colunas', produto: 'ntbVendas', tituloA: 'Sem cardápio digital', tituloB: 'Com Cardápio Digital', itens: [
    {label: 'Ticket médio', a: 'Estagnado', b: '+15% com sugestão visual'},
    {label: 'Erro de pedido', a: 'Comum', b: 'Raro'},
    {label: 'Divisão de conta', a: 'Feita na mão', b: 'Automática'},
  ]},
  {variant: 'colunas', theme: 'marca', tituloA: 'Processo informal', tituloB: 'Processo mapeado', itens: [
    {label: 'Onboarding', a: 'Cada um aprende do seu jeito', b: 'Fluxo documentado'},
    {label: 'Gargalo', a: 'Descoberto tarde', b: 'Visível no mapeamento'},
    {label: 'Padronização', a: 'Nenhuma', b: 'BPM aplicado'},
  ]},
  {variant: 'tabela', produto: 'ntbEstoque', tituloA: 'Antes', tituloB: 'Depois', itens: [
    {label: 'Divergência de inventário', a: 'Alta, mensal', b: '-92%'},
    {label: 'Tempo de conciliação', a: '6h/semana', b: '<1h/semana'},
    {label: 'Rupturas', a: 'Frequentes', b: 'Raras, com alerta prévio'},
    {label: 'Rastreio de lote/validade', a: 'Manual', b: 'QR code'},
  ]},
  {variant: 'tabela', produto: 'ntbVendas', tituloA: 'Antes', tituloB: 'Depois', itens: [
    {label: 'Erro de pedido', a: '43% dos pedidos', b: '-43%'},
    {label: 'Tempo de fechamento de conta', a: 'Fila no caixa', b: '-70% do tempo'},
    {label: 'Ticket médio', a: 'Estagnado', b: '+15%'},
    {label: 'Visibilidade de mesa', a: 'Nenhuma', b: 'Tempo real'},
  ]},
  {variant: 'tabela', produto: 'norteAvalia', tituloA: 'Antes', tituloB: 'Depois', itens: [
    {label: 'Frequência de ciclo', a: 'Anual', b: 'Mensal/trimestral'},
    {label: 'Base de decisão', a: 'Opinião', b: 'Dado multidimensional'},
    {label: 'PDI', a: 'Genérico', b: 'Automático por colaborador'},
    {label: 'Consistência entre avaliadores', a: 'Baixa', b: '3x maior'},
  ]},
  {variant: 'tabela', theme: 'marca', tituloA: 'Sem método', tituloB: 'Com método', itens: [
    {label: 'Retrabalho', a: 'Constante', b: '-30%'},
    {label: 'Velocidade de crescimento', a: 'Baseline', b: '+23%'},
    {label: 'Processos mapeados', a: '27%', b: '100% dos críticos'},
  ]},
  {variant: 'tabela', produto: 'ntbEstoque', tituloA: 'Planilha', tituloB: 'NTB Estoque', itens: [
    {label: 'Sincronização com Omie', a: 'Manual', b: 'Tempo real'},
    {label: 'Inventário', a: 'Para a loja', b: 'Sem parar a loja'},
    {label: 'Etiquetagem', a: 'Nenhuma', b: 'Por lote/validade'},
  ]},
  {variant: 'tabela', produto: 'ntbVendas', tituloA: 'Cardápio de papel', tituloB: 'Cardápio Digital', itens: [
    {label: 'Pedido', a: 'Anotado à mão', b: 'Direto do celular'},
    {label: 'Cozinha', a: 'Recebe pedido de garçom', b: 'Recebe pedido em tempo real'},
    {label: 'Pagamento', a: 'No caixa', b: 'Na mesa, dividido automático'},
  ]},
].map((p, i) => ({
  compositionId: 'Comparativo',
  outName: `Comparativo-${String(i + 1).padStart(2, '0')}-${p.variant}-${p.produto ?? p.theme ?? 'marca'}`,
  props: p,
}));

// ============================================================
// 8. Bastidores — 12 itens (manifesto/regraDaCasa)
// ============================================================
const BASTIDORES = [
  {variant: 'manifesto', titulo: 'Não recomendamos nada antes de ver o dado.', principios: [
    'Todo diagnóstico começa medindo o que já existe, não achando.',
    'Nenhuma solução entra sem um número que comprove que ela resolveu.',
    'Se o processo não é repetível, não é método — é sorte.',
  ]},
  {variant: 'manifesto', titulo: 'Achismo não é estratégia, é sorte disfarçada.', principios: [
    'Decisão sem dado é opinião com aparência de plano.',
    'Medir antes de mudar, sempre — mesmo quando dá trabalho.',
  ]},
  {variant: 'manifesto', titulo: 'Todo processo que a gente aplica, a gente mede antes.', foto: 'photos/equipe-reuniao-escritorio.jpg', principios: [
    'Diagnóstico primeiro, recomendação depois.',
    'Metodologia formal, aplicação prática.',
  ]},
  {variant: 'manifesto', titulo: 'Metodologia não é enfeite de proposta comercial.', principios: [
    'Lean, Agile, BPM e PDCA existem pra resolver problema real, não pra slide.',
    'Se não muda o número do cliente, não é metodologia — é teoria.',
  ]},
  {variant: 'manifesto', titulo: 'Se o cliente não vê o número, a gente não recomendou direito.', foto: 'photos/analista-relatorios-mesa.jpg', principios: [
    'Todo relatório termina em decisão, não em gráfico bonito.',
    'Transparência de dado é parte da entrega, não extra.',
  ]},
  {variant: 'manifesto', titulo: 'Consultoria de verdade termina com dado, não com slide bonito.', principios: [
    'A entrega é resultado medido, não apresentação.',
    'Achismo fica de fora — mesmo quando o cliente prefere ouvir o que quer.',
  ]},
  {variant: 'regraDaCasa', numero: 'Regra 01', titulo: 'Diagnóstico sem número não fecha.', corpo: 'Nenhum diagnóstico fecha sem número real do cliente na mesa.'},
  {variant: 'regraDaCasa', numero: 'Regra 02', titulo: 'Meta mensurável, sempre.', corpo: 'Nenhuma recomendação entra sem meta mensurável de resultado.'},
  {variant: 'regraDaCasa', numero: 'Regra 03', titulo: 'Se não repete, não é método.', corpo: 'Se não dá pra repetir o processo, não é método — documentamos até virar.'},
  {variant: 'regraDaCasa', numero: 'Regra 04', titulo: 'Problema real, não hipótese.', corpo: 'Toda ferramenta que a Norte constrói nasce de um problema real visto em campo.'},
  {variant: 'regraDaCasa', numero: 'Regra 05', titulo: 'Achismo não vira decisão.', corpo: 'Achismo do gestor não vira decisão sem confronto com o dado.'},
  {variant: 'regraDaCasa', numero: 'Regra 06', titulo: 'PDCA é rotina, não relatório.', corpo: 'PDCA não é etapa do relatório — é como a gente trabalha todo dia.'},
].map((p, i) => ({
  compositionId: 'Bastidores',
  outName: `Bastidores-${String(i + 1).padStart(2, '0')}-${p.variant}`,
  props: p,
}));

BATCH.push(...DADO_VS_ACHISMO, ...DICA_PRATICA, ...ANTES_DEPOIS, ...VITRINE_PRODUTO, ...METODOLOGIA, ...DEPOIMENTO, ...COMPARATIVO, ...BASTIDORES);

console.log(`Total de peças no BATCH: ${BATCH.length} (esperado: 100)`);
if (BATCH.length !== 100) {
  console.error('AVISO: contagem diferente de 100 — revisar listas acima.');
}

// --- Suporte a lotes (--start N --end N) pra não travar num comando síncrono gigante ---
const args = process.argv.slice(2);
const startIdx = args.includes('--start') ? Number(args[args.indexOf('--start') + 1]) : 0;
const endIdx = args.includes('--end') ? Number(args[args.indexOf('--end') + 1]) : BATCH.length;

const slice = BATCH.slice(startIdx, endIdx);
console.log(`Renderizando itens [${startIdx}, ${endIdx}) — ${slice.length} peça(s) neste lote.\n`);

let ok = 0;
let fail = 0;
for (let i = 0; i < slice.length; i++) {
  const {compositionId, outName, props} = slice[i];
  const outPath = `out/teste-100/${outName}.png`;
  const globalIdx = startIdx + i;
  try {
    console.log(`[${globalIdx + 1}/${BATCH.length}] ${compositionId} -> ${outPath}`);
    renderStill({compositionId, props, outPath});
    ok++;
  } catch (err) {
    fail++;
    console.error(`  FALHOU: ${outPath} — ${err.message}`);
  }
}

console.log(`\nLote concluído: ${ok} ok, ${fail} falha(s).`);
