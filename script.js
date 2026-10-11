/* ════════════════════════════════════════════════════
   Bapell Gestor Pro — Site de Vendas · script.js
   ════════════════════════════════════════════════════ */

"use strict";

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

(() => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  const BRL = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
  const NUM = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const PCT = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 1 });

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ══════════════════════════════════════
     1. MÓDULOS — dados
     Tudo aqui foi conferido no aplicativo (telas, Central de Ajuda,
     tutoriais e Termos de Uso). "plus: true" = só nos planos Pro e
     Platinum. As imagens são telas reais com dados de demonstração.
     ══════════════════════════════════════ */
  const CATEGORIAS = {
    precificacao: "Precificação",
    operacao: "Operação",
    gestao: "Gestão",
    ferramentas: "Ferramentas",
    sistema: "Sistema",
  };

  const ICONES = {
    plataformas: '<rect x="3" y="3" width="7" height="7" rx="1"></rect><rect x="14" y="3" width="7" height="7" rx="1"></rect><rect x="3" y="14" width="7" height="7" rx="1"></rect><rect x="14" y="14" width="7" height="7" rx="1"></rect>',
    produtos: '<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line>',
    kits: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line>',
    extras: '<line x1="19" y1="5" x2="5" y2="19"></line><circle cx="6.5" cy="6.5" r="2.5"></circle><circle cx="17.5" cy="17.5" r="2.5"></circle>',
    massa: '<path d="M16 3l4 4-4 4"></path><path d="M20 7H4"></path><path d="M8 21l-4-4 4-4"></path><path d="M4 17h16"></path>',
    registro: '<circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>',
    info: '<rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line>',
    empresa: '<rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M8 10h.01"></path><path d="M16 10h.01"></path><path d="M8 14h.01"></path><path d="M16 14h.01"></path>',
    financeiro: '<circle cx="12" cy="12" r="10"></circle><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path><path d="M12 18V6"></path>',
    processador: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line>',
    calculos: '<rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><line x1="16" y1="10" x2="16.01" y2="10"></line><line x1="12" y1="10" x2="12.01" y2="10"></line><line x1="8" y1="10" x2="8.01" y2="10"></line><line x1="16" y1="14" x2="16.01" y2="14"></line><line x1="12" y1="14" x2="12.01" y2="14"></line><line x1="8" y1="14" x2="8.01" y2="14"></line><line x1="16" y1="18" x2="16.01" y2="18"></line><line x1="12" y1="18" x2="12.01" y2="18"></line><line x1="8" y1="18" x2="8.01" y2="18"></line>',
    ean: '<path d="M3 5v14"></path><path d="M6 5v14"></path><path d="M10 5v14"></path><path d="M14 5v14"></path><path d="M17 5v14"></path><path d="M21 5v14"></path>',
    lembretes: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path>',
    nf: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line>',
    usuarios: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>',
    ajuda: '<circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line>',
    abas: '<rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="M2 9h20"></path><path d="M8 4v5"></path><path d="M14 4v5"></path>',
  };

  const MODULOS = [
    {
      id: "plataformas", nome: "Plataformas", cat: "precificacao", icon: "plataformas",
      resumo: "Suas lojas em cartões e a lista de produtos de cada uma, com busca, filtros e o preço já calculado.",
      oque: "É por onde a operação começa. Cada canal de venda — Mercado Livre, Shopee, Amazon, Magalu, a loja física ou outro — vira um cartão com nome e logo. Dentro de cada loja fica a lista de produtos, com foto, SKU, tipo e preço de venda.",
      praquem: "Para quem vende em mais de um canal e precisa achar um produto pelo nome, pelo SKU ou pelo ID do anúncio e ver o preço de cada um sem abrir ficha por ficha.",
      recursos: [
        "Cartões das lojas com a quantidade de produtos; a Loja Física já vem cadastrada",
        "Busca por nome, SKU ou ID do anúncio — inclusive pelo SKU de um kit",
        "Filtros por tipo (simples, com kits, compostos) e ordenação por nome, preço ou data",
        "No Mercado Livre, a coluna de preço mostra Premium e Clássico",
        "Duplicar na mesma loja ou clonar para outra plataforma, com kits e fotos",
        "Opções em massa: clonar, duplicar ou excluir vários produtos de uma vez",
        "Ocultar uma loja sem apagar os produtos e reativar quando quiser",
        "Gerenciar Imagens: todas as fotos do Bapell num lugar, com busca e filtro das que estão sem uso",
      ],
      beneficios: [
        "Cada canal com os seus produtos e preços, organizado no painel",
        "Levar o catálogo de uma loja para outra sem cadastrar tudo de novo",
        "Encontrar um anúncio pelo SKU sem abrir produto por produto",
      ],
      passos: [
        "Em Adicionar Plataforma, informe o nome e a logo da loja.",
        "Clique no cartão para abrir a lista de produtos daquela loja.",
        "Crie produtos e kits, ou clone produtos de outra plataforma.",
        "Use a busca e os filtros; clique na linha para abrir a ficha do produto.",
      ],
      nota: "As taxas e comissões são informadas em cada produto. O Bapell não se conecta às plataformas: ele usa os valores que você cadastra.",
      conecta: ["produtos", "kits", "acoes-massa", "processador"],
      imgs: [
        { src: "plataforma", alt: "Lista de produtos do Mercado Livre com Premium e Clássico" },
        { src: "painel", alt: "Painel inicial com as lojas cadastradas e os resumos do mês" },
      ],
    },
    {
      id: "produtos", nome: "Produtos e precificação", cat: "precificacao", icon: "produtos",
      resumo: "A ficha do produto com custo, impostos, taxas e margem — e o preço de venda calculado enquanto você digita.",
      oque: "Na ficha de cada produto ficam o cadastro (fotos, nome, SKU, ID do anúncio, peso e medidas) e a precificação completa: o custo com embalagem, etiqueta, frete pago e impostos de compra; o frete, a taxa fixa, a comissão e o imposto da nota; e a margem que você quer, em % ou em reais.",
      praquem: "Para quem precisa saber o preço de anúncio de cada produto em cada loja, considerando tudo o que sai do bolso até a venda.",
      recursos: [
        "Formação do custo: preço de custo, embalagem, etiqueta, frete pago, IPI, DIFAL, ST e alíquota, com o total em impostos à vista",
        "Variáveis de venda: frete do produto, taxa fixa da plataforma, comissão e imposto da nota",
        "Margem em % do preço ou em R$ por unidade, com lucro estimado e margem real",
        "No Mercado Livre, o preço do anúncio Premium e do Clássico lado a lado, cada um com a sua comissão",
        "Regra da taxa fixa até R$ 79,00 aplicada automaticamente em cada preço",
        "Até 3 fotos por produto, com opção de redimensionar e comprimir",
        "Campos seus em R$ ou % que entram no cálculo; campos padrão que você renomeia ou oculta em cada loja",
        "Salvamento automático a cada 30 segundos enquanto há alterações",
        "Mudou o custo? Os compostos e os anúncios com o mesmo SKU na plataforma são atualizados ao salvar",
      ],
      beneficios: [
        "Um preço que já desconta comissão, frete, taxas e impostos — e mostra quanto sobra",
        "Combinações impossíveis de taxa e margem são barradas, em vez de virar um preço absurdo",
        "Uma ficha com só os campos que a sua operação usa",
      ],
      passos: [
        "Preencha a identificação: fotos, nome, SKU, ID do anúncio e dimensões.",
        "Informe o custo e os impostos de compra.",
        "Informe frete, taxa fixa, comissão e imposto da nota (no Mercado Livre, Premium e Clássico).",
        "Escolha a margem: o preço aparece na hora. Depois, é só salvar.",
      ],
      nota: "O preço calculado é uma sugestão a partir dos dados que você informa; a decisão de quanto cobrar é sua.",
      conecta: ["plataformas", "kits", "precos-extras", "acoes-massa"],
      imgs: [
        { src: "produto-preco", alt: "Variáveis de venda, margem e os valores Premium e Clássico na ficha do produto" },
        { src: "produto-topo", alt: "Identificação do produto e formação do custo total" },
        { src: "campos", alt: "Janela Personalizar Campos, para renomear ou ocultar campos da ficha" },
      ],
    },
    {
      id: "kits", nome: "Kits e produtos compostos", cat: "precificacao", icon: "kits",
      resumo: "Kits de 2, 3 ou mais unidades e combos de produtos diferentes, cada um com SKU, frete e preço próprios.",
      oque: "O Bapell trata kits de dois jeitos: kits por quantidade, com o mesmo produto em 2, 3, 4 unidades ou mais, e kits compostos, que juntam produtos diferentes já cadastrados. Cada kit tem o próprio SKU, custo, frete, taxas e Preços Extras.",
      praquem: "Para quem vende em quantidade ou em combos e quer o preço de cada combinação sem refazer a conta.",
      recursos: [
        "Adicionar Kit: quantidade, SKU do kit e frete exclusivo, com pré-visualização",
        "Custo base calculado pela quantidade, com peso e dimensões estimados para conferir o frete",
        "Taxas adicionais próprias de cada kit, em R$ ou %",
        "A regra da taxa fixa é avaliada pelo preço do kit inteiro",
        "No Mercado Livre, cada kit mostra Premium e Clássico, com preço e lucro",
        "Kit composto: busque os itens pelo SKU ou nome e informe a quantidade de cada um",
        "O custo do composto é a soma dos itens e acompanha quando o custo de um item muda",
      ],
      beneficios: [
        "Cada quantidade com preço próprio, sem planilha paralela",
        "Combos sempre com o custo atualizado",
        "A lista de produtos mostra quais têm kits e quais são compostos",
      ],
      passos: [
        "Na ficha do produto, clique em + Adicionar Kit.",
        "Informe quantidade, SKU e frete: o preço aparece no quadro Kits do Produto.",
        "Para um combo, use + Criar Kit na lista da plataforma e adicione os itens.",
        "Complete taxas e margem e salve.",
      ],
      conecta: ["produtos", "precos-extras", "acoes-massa"],
      imgs: [
        { src: "produto-kits", alt: "Kits do Produto com preços Premium e Clássico e os Preços Extras de cada kit" },
        { src: "composto", alt: "Kit composto com os componentes e o preço de custo somado" },
      ],
    },
    {
      id: "precos-extras", nome: "Preços Extras", cat: "precificacao", icon: "extras",
      resumo: "Simule preço mínimo, ideal e máximo: digite um preço e veja o lucro, ou digite a margem e receba o preço.",
      oque: "Três preços de referência — Mínimo, Ideal e Máximo — para planejar promoções e faixas de preço sem mexer no preço principal da ficha. Cada nível funciona por preço, por margem em % ou por lucro em reais.",
      praquem: "Para quem negocia promoções e descontos e quer saber o lucro em cada faixa antes de anunciar.",
      recursos: [
        "Modos Preço, Margem % e Margem R$ em cada nível",
        "Resposta na hora: “Você lucra…” ou “Você perde…”",
        "A mesma conta do preço principal: custo, frete, taxa fixa, comissão e impostos",
        "No Mercado Livre, Premium e Clássico em cada nível",
        "Cada kit tem os seus Preços Extras, com o valor do kit inteiro",
        "Nos modos de margem, o preço acompanha mudanças de custo e de taxas",
        "Aviso quando a margem pedida é impossível para as taxas",
        "Área que pode ser ocultada por plataforma",
      ],
      beneficios: [
        "Saber até onde dá para baixar o preço sem ficar no prejuízo",
        "Chegar ao preço a partir do lucro que você quer",
        "Preço principal intacto: os Preços Extras são só consulta",
      ],
      passos: [
        "Na ficha, escolha o modo de cada nível: Preço, Margem % ou Margem R$.",
        "Digite o preço ou a margem: o resultado aparece na hora.",
        "Nos kits, repita em Preços Extras do Kit.",
        "Salve: o modo, a margem e o preço de cada nível ficam no produto.",
      ],
      conecta: ["produtos", "kits", "acoes-massa"],
      imgs: [
        { src: "produto-extras", alt: "Preços Extras com os modos Preço, Margem % e Margem R$, em Premium e Clássico" },
      ],
    },
    {
      id: "acoes-massa", nome: "Ações em Massa", cat: "operacao", icon: "massa",
      resumo: "Atualize custo, taxas, impostos ou margem de vários produtos, em várias lojas, de uma só vez.",
      oque: "Você escolhe os produtos pelo SKU (ou todos), marca as plataformas de destino e os campos que quer mudar. O Bapell aplica a mudança e recalcula preço, lucro, margem, kits, Preços Extras e produtos compostos.",
      praquem: "Para quem tem o mesmo SKU em várias plataformas, ou muitos produtos, e precisa mudar um custo ou uma taxa sem abrir ficha por ficha.",
      recursos: [
        "Seleção por SKU — vários de uma vez, inclusive colando uma lista — ou de todos os produtos",
        "Plataformas de destino, com a opção de selecionar todas",
        "Campos de custo: preço de custo, etiqueta, embalagem, frete pago, IPI, DIFAL, ST e alíquota",
        "Variáveis de venda: frete, taxa fixa, comissão (Premium e Clássico no Mercado Livre), imposto da nota e margem",
        "Só muda o que estiver marcado; campo marcado e vazio não zera nada",
        "Confirmação com o resumo e o responsável antes de aplicar",
        "Resultado com produtos atualizados e kits recalculados",
        "Histórico das últimas atualizações, com quem aplicou",
      ],
      beneficios: [
        "O mesmo SKU atualizado em todas as lojas de uma vez",
        "Preços coerentes com o novo custo, sem recalcular à mão",
        "Registro do que foi feito e por quem",
      ],
      passos: [
        "Informe os SKUs ou marque todos os produtos.",
        "Marque as plataformas de destino.",
        "Marque os campos e digite os novos valores.",
        "Revise a confirmação, escolha o responsável e aplique.",
      ],
      nota: "A atualização em massa não pode ser desfeita. Por isso a tela mostra um resumo e pede confirmação antes de aplicar.",
      conecta: ["produtos", "kits", "precos-extras", "usuarios"],
      imgs: [
        { src: "acoes-massa", alt: "Ações em Massa com um SKU escolhido e as plataformas de destino" },
        { src: "acoes-massa-campos", alt: "Campos para atualizar: preço de custo e margem marcados" },
      ],
    },
    {
      id: "registro-vendas", nome: "Registro de Vendas", cat: "operacao", icon: "registro",
      resumo: "Monte a venda, gere o orçamento em PDF e, se quiser, lance a receita no Controle Financeiro.",
      oque: "Para as vendas diretas: você monta a venda com comprador, empresa e produtos, gera um orçamento com os dados e a logo da empresa e salva a venda com pagamento, parcelas e status. As vendas ficam numa lista com indicadores e filtros.",
      praquem: "Para quem também vende fora dos marketplaces e quer cadastro de clientes, orçamento pronto e a receita no financeiro sem digitar de novo.",
      recursos: [
        "Comprador com CPF ou CNPJ conferido, salvo para as próximas vendas",
        "Produtos buscados por SKU ou nome em todas as plataformas, com foto e preço",
        "Orçamento em PDF com razão social, CNPJ, endereço, contato e logo da empresa",
        "Pagamento (Pix, dinheiro, débito, crédito, boleto, transferência), parcelas e status",
        "Opção de lançar a venda no Controle Financeiro, mantida em dia ao editar ou excluir",
        "Indicadores: total de vendas, valor total, itens vendidos e ticket médio",
        "Filtros por período, cliente, empresa, pagamento, status e responsável",
        "Comprovante de venda em PDF e registro de quem lançou e de quem alterou",
      ],
      beneficios: [
        "Orçamento com a cara da empresa, pronto para enviar ao cliente",
        "A receita entra no financeiro sem digitar duas vezes",
        "Visão rápida das vendas em qualquer recorte",
      ],
      passos: [
        "Localize ou cadastre o comprador.",
        "Escolha a empresa.",
        "Adicione os produtos pelo SKU ou pelo nome.",
        "Gere o orçamento ou salve a venda, com pagamento, status e responsável.",
      ],
      nota: "O orçamento é um documento sem valor fiscal. O Bapell não emite nota fiscal.",
      conecta: ["produtos", "empresa", "financeiro", "usuarios"],
      imgs: [
        { src: "registro-vendas", alt: "Vendas lançadas com indicadores, filtros e cartões de cada venda" },
      ],
    },
    {
      id: "informacoes-venda", nome: "Informações de Venda", cat: "operacao", icon: "info", plus: true,
      resumo: "Suas regras comerciais num lugar só: parcelamento, simulador da maquininha, descontos progressivos e entrega por distância.",
      oque: "Uma ficha com as regras da operação, para consultar na hora de vender: valor mínimo e número máximo de parcelas, simulador da taxa da maquininha (com a loja absorvendo ou o cliente pagando o parcelamento), faixas de desconto pelo valor da compra e formas de entrega cobradas por distância.",
      praquem: "Para quem vende parcelado, oferece desconto por faixa de valor e cobra a entrega por quilômetro, e quer essas regras padronizadas e à mão.",
      recursos: [
        "Regras de parcelamento: valor mínimo e parcelamento máximo",
        "Simulador da Maquininha: valor final e juro gerado, com quem paga o parcelamento",
        "Políticas de desconto progressivo: “de R$ … até R$ … = …%”",
        "Formas de entrega com faixas: “raio até … km = R$ …”",
        "Seções e campos seus, em texto, R$, % ou número",
        "Ordem das seções e campos ocultos do seu jeito",
        "Salvar pelo botão ou com Ctrl+S",
      ],
      beneficios: [
        "Regras comerciais padronizadas para toda a equipe consultar",
        "Saber na hora o valor final de uma venda parcelada",
        "Tabela de entrega por distância sempre à mão",
      ],
      passos: [
        "Preencha as regras de parcelamento.",
        "Use o simulador para consultar o valor final de uma venda parcelada.",
        "Monte as faixas de desconto e as formas de envio por distância.",
        "Salve.",
      ],
      nota: "As regras ficam para consulta: o Bapell não aplica os descontos nem os fretes automaticamente nas vendas.",
      conecta: ["registro-vendas"],
      imgs: [
        { src: "informacoes-venda", alt: "Regras de parcelamento, simulador da maquininha e descontos progressivos" },
      ],
    },
    {
      id: "empresa", nome: "Dados da Empresa", cat: "gestao", icon: "empresa",
      resumo: "O cadastro completo de cada empresa — CNPJ, inscrições, endereço, sócios, logo e documentos — usado em todo o Bapell.",
      oque: "O cadastro central das suas empresas: identificação e porte, inscrições, CNAE, endereço, contato, situação no Simples Nacional e no MEI, a sua porcentagem de imposto por nota, sócios, logo e documentos. Esses dados alimentam os outros módulos.",
      praquem: "Para quem tem uma ou mais empresas e quer os dados cadastrais, a logo e os documentos num só lugar, reaproveitados no financeiro, nas vendas e nas notas.",
      recursos: [
        "Várias empresas no mesmo aplicativo, com troca rápida",
        "Sete seções: identificação e porte, inscrições, atividades (CNAE), endereço, contato, situação cadastral e quadro de sócios",
        "CNPJ — inclusive o novo, alfanumérico — e CPF conferidos pelos dígitos antes de salvar",
        "Porcentagem de imposto por nota, usada na estimativa do Processador de Planilha",
        "Logo quadrada, usada nas outras telas e nos orçamentos",
        "Documentos da empresa (alvará, contrato social…), com visualização de PDF e imagem",
        "Campos e seções próprias e ordem das seções do seu jeito",
        "Atalho para Usuários e Senhas",
      ],
      beneficios: [
        "Cadastrar uma vez e usar em todo o aplicativo",
        "Menos erro de digitação em CNPJ e CPF",
        "Documentos da empresa à mão, dentro do Bapell",
      ],
      passos: [
        "Adicione a empresa e dê um nome a ela.",
        "Preencha as seções, envie a logo e anexe os documentos.",
        "Salve.",
        "Escolha a empresa nos outros módulos.",
      ],
      conecta: ["financeiro", "registro-vendas", "processador", "nf", "usuarios"],
      imgs: [
        { src: "empresa", alt: "Identificação da empresa com logo, CNPJ e razão social" },
        { src: "empresa-situacao", alt: "Contato, situação cadastral e regime (Simples Nacional e MEI)" },
      ],
    },
    {
      id: "financeiro", nome: "Controle Financeiro", cat: "gestao", icon: "financeiro",
      resumo: "Entradas e saídas de cada empresa, com DRE do período, indicadores comparados, desempenho por canal e gráficos.",
      oque: "Você registra as entradas (vendas e outros recebimentos) e as saídas (custo de produto e despesas) de cada empresa. Para o período escolhido, o Bapell mostra indicadores comparados com o período anterior, análises automáticas, o DRE, o desempenho de cada canal, gráficos e o extrato.",
      praquem: "Para quem quer saber se a empresa está no lucro e para onde vai o dinheiro — inclusive quanto sobra de cada canal depois de taxas, fretes e impostos.",
      recursos: [
        "Registrar Entrada (valor bruto ou líquido, com taxa, frete e impostos) e Registrar Saída em 7 categorias",
        "Períodos: mês atual, mês passado, ano atual, 12 meses, tudo ou personalizado, comparados com o período anterior",
        "Seis indicadores com variação e minigráfico: faturamento, CMV, despesas, lucro, margem e ticket médio",
        "Insights do período, das análises que pedem atenção às que vão bem",
        "DRE do período, da receita bruta ao resultado, com a cascata “Do faturamento ao lucro”",
        "Desempenho por canal: quanto cada canal vendeu e quanto fica com você",
        "Meta de faturamento do mês, com a projeção no ritmo atual",
        "Gráficos de fluxo de caixa, para onde vai o dinheiro, entradas x saídas, lucro e receita por canal",
        "Extrato com busca, filtros, edição e o responsável por cada lançamento",
        "Relatório em PDF e planilha do Excel com o extrato e o DRE",
      ],
      beneficios: [
        "Ver o lucro de verdade, depois de taxas, fretes, impostos e despesas",
        "Descobrir qual canal deixa mais dinheiro",
        "Perceber mudanças sem fazer contas: tudo comparado ao período anterior",
      ],
      passos: [
        "Traga a empresa do cadastro e cadastre os responsáveis.",
        "Lance entradas e saídas — ou deixe o Registro de Vendas e o Processador lançarem.",
        "Escolha o período e acompanhe indicadores, DRE, canais e gráficos.",
        "Confira no extrato e exporte em PDF ou planilha.",
      ],
      nota: "O DRE do Bapell é um relatório gerencial, para acompanhar o negócio; ele não substitui a contabilidade.",
      conecta: ["registro-vendas", "processador", "empresa", "usuarios"],
      imgs: [
        { src: "financeiro", alt: "Período, meta, seis indicadores e insights do Controle Financeiro" },
        { src: "financeiro-dre", alt: "DRE do período com a cascata do faturamento ao lucro" },
        { src: "financeiro-canais", alt: "Desempenho por canal e fluxo de caixa" },
        { src: "financeiro-graficos", alt: "Gráficos de fluxo de caixa, saídas e entradas x saídas" },
      ],
    },
    {
      id: "processador", nome: "Processador de Planilha", cat: "gestao", icon: "processador", plus: true,
      resumo: "Lê o relatório de vendas da plataforma e mostra quanto você vendeu, quanto a plataforma pagou e quanto sobrou.",
      oque: "Você escolhe a empresa, a plataforma e o relatório de vendas (.xlsx, .xls ou .csv). O Bapell liga cada SKU ao produto cadastrado para trazer o custo e mostra a conta: você vendeu, a plataforma pagou, o custo total dos produtos e quanto sobrou, com o detalhe por SKU.",
      praquem: "Para quem vende em marketplace, recebe o relatório de vendas em planilha e já cadastrou os produtos no Bapell.",
      recursos: [
        "Sugestão automática das colunas pelos títulos da planilha, para você conferir",
        "Três jeitos de chegar ao valor recebido: coluna própria, bruto menos descontos ou bruto menos um percentual",
        "Custo de cada SKU pelo cadastro, inclusive nos kits; SKU sem cadastro aparece marcado",
        "Regras sobre os totais: somar, subtrair, multiplicar, dividir ou substituir, encadeadas",
        "Resultado com o relatório por SKU e o antes e depois das regras",
        "Exportar para o Financeiro: você escolhe qual valor lançar e quem lança",
        "Importações Salvas, para exportar de novo sem reimportar a planilha",
        "Meus Impostos: estimativa de imposto pela porcentagem cadastrada da empresa",
      ],
      beneficios: [
        "O resultado real do relatório que você já recebe",
        "Custo certo por SKU, sem digitar",
        "Erros à vista: SKU sem cadastro, colunas desalinhadas e valores estimados",
      ],
      passos: [
        "Escolha a empresa e a plataforma.",
        "Carregue a planilha e confira as colunas sugeridas.",
        "Se quiser, crie regras sobre os totais e processe.",
        "Salve a importação ou exporte para o Controle Financeiro.",
      ],
      nota: "Quando o valor recebido vem de um percentual, o resultado é uma estimativa. Cada exportação cria um lançamento no financeiro — confira para não lançar a mesma venda duas vezes.",
      conecta: ["produtos", "financeiro", "empresa", "plataformas"],
      imgs: [
        { src: "processador-resultado", alt: "Resultado da importação com os quatro valores e o relatório por SKU" },
        { src: "processador-regras", alt: "Colunas sugeridas pelos títulos e uma regra sobre o total" },
        { src: "processador-salvas", alt: "Importações salvas com o selo de exportação" },
        { src: "processador-impostos", alt: "Meus Impostos com a estimativa por importação" },
      ],
    },
    {
      id: "calculos", nome: "Central de Cálculos", cat: "ferramentas", icon: "calculos",
      resumo: "144 calculadoras prontas em 15 categorias, com busca, favoritos, cálculos salvos e a fórmula explicada.",
      oque: "Uma central com 144 calculadoras para as contas avulsas do dia a dia: preço e margem, taxas de marketplace e de cartão, frete e cubagem, estimativas de impostos, empréstimos, investimentos, RH, datas e conversões. Cada uma mostra o resultado em detalhe e como é calculado.",
      praquem: "Para quem vende online e precisa fazer contas rápidas sem montar planilha.",
      recursos: [
        "15 categorias: financeiro, impostos, marketplace, cartão, frete, conversões, RH, investimentos, empréstimos, precificação, matemática, geometria, estatística, datas e produtividade",
        "Busca por nome, assunto ou sigla (como ROI, DIFAL ou CMV)",
        "Favoritos no alto do menu",
        "Resultado com valor principal e detalhes, mais “Como é calculado”",
        "Cálculos salvos com nome, descrição e etiquetas",
        "Copiar, imprimir e guia “Como usar esta calculadora”",
        "Nas calculadoras de impostos, o aviso para conferir a alíquota do seu estado",
      ],
      beneficios: [
        "A conta certa na hora, dentro do mesmo programa",
        "A fórmula à vista, para conferir o número",
        "Simulações guardadas para consultar depois",
      ],
      passos: [
        "Busque ou escolha a calculadora no menu.",
        "Preencha os campos e clique em Calcular.",
        "Copie, imprima ou salve o cálculo.",
      ],
      nota: "As calculadoras de impostos são estimativas: a alíquota depende do estado, do produto e do regime. Elas não substituem o contador.",
      conecta: ["produtos"],
      imgs: [
        { src: "calculos", alt: "Calculadora Preço Completo com resultado, favoritos e cálculos salvos" },
      ],
    },
    {
      id: "ean", nome: "Gerador de EAN", cat: "ferramentas", icon: "ean", plus: true,
      resumo: "Números EAN-13 com dígito verificador válido, um por SKU, gerados a partir do CNPJ da empresa — sem repetir.",
      oque: "Gera números EAN-13 a partir do CNPJ da empresa (789 + parte do CNPJ + sequência + dígito verificador), um para cada SKU, e guarda os códigos numa lista com busca. Um número gerado nunca é reaproveitado, nem depois de excluído.",
      praquem: "Para quem precisa de códigos próprios para controle de estoque e etiquetas, organizados por empresa e por SKU.",
      recursos: [
        "EAN-13 com dígito verificador calculado pelo algoritmo oficial",
        "Um código por SKU em cada empresa; SKU repetido gera aviso",
        "Nunca repete um número, mesmo com o código oculto ou excluído",
        "Empresas do cadastro ou criadas só no gerador, inclusive com CNPJ alfanumérico",
        "Lista com busca por SKU ou EAN e botão Copiar",
        "Ocultar, mostrar e excluir códigos",
        "Proteção opcional por senha",
      ],
      beneficios: [
        "Nada de código duplicado entre produtos",
        "Código pronto em um clique a partir do SKU",
        "Códigos organizados por empresa",
      ],
      passos: [
        "Escolha a empresa (com CNPJ válido).",
        "Digite o SKU e clique em Gerar EAN.",
        "Copie o código e cole onde precisar.",
      ],
      nota: "Os códigos são para uso próprio. Gerar o número não significa que ele esteja registrado na GS1, e alguns marketplaces aceitam esses códigos e outros não. O gerador não imprime etiquetas.",
      conecta: ["empresa"],
      imgs: [
        { src: "ean", alt: "Gerador de EAN com a lista de códigos gerados por SKU" },
      ],
    },
    {
      id: "lembretes", nome: "Lembretes", cat: "ferramentas", icon: "lembretes",
      resumo: "Prazos, pagamentos e tarefas com data e hora — e um aviso no canto da tela na hora marcada.",
      oque: "Uma agenda de avisos. Cada lembrete tem título, data e hora, empresa, recebedor, valor, quem colocou e observações. A tela mostra o que vence hoje, amanhã e nos próximos dias e, na hora marcada, abre uma janela de aviso — mesmo com o Bapell minimizado na bandeja.",
      praquem: "Para quem precisa lembrar de contas a pagar, coletas, renovações e tarefas de uma ou de várias empresas.",
      recursos: [
        "Selos pela data: vence hoje, vence amanhã, vence em 2 ou 3 dias, vencido e concluído",
        "Visões de próximos, vencidos, concluídos e ocultos, com contadores",
        "Filtros por empresa e período, e busca",
        "Janela de aviso por cima de tudo, com Concluir, Abrir lembrete e “Lembrar de novo em” 5 min, 15 min, 30 min, 1 hora ou amanhã",
        "Vários lembretes vencidos na mesma janela, com um som curto",
        "Repetir (mesmos dados, nova data) e Clonar",
        "Painel “Próximos lembretes” na tela inicial",
        "Lembrete do vencimento da licença criado sozinho na ativação",
      ],
      beneficios: [
        "Prazos visíveis mesmo fora da tela do Bapell",
        "Adiar um aviso sem esquecer dele",
        "Contas que se repetem com menos digitação",
      ],
      passos: [
        "Clique em Novo lembrete e preencha título e data/hora.",
        "Se quiser, informe empresa, recebedor, valor e observações.",
        "Acompanhe pela tela ou pelo painel da tela inicial.",
        "Na hora marcada, conclua, abra ou adie pelo aviso.",
      ],
      nota: "Os avisos aparecem com o Bapell aberto ou na bandeja do Windows. Use os lembretes como apoio, não como o único controle de prazos importantes.",
      conecta: ["empresa", "usuarios"],
      imgs: [
        { src: "lembretes", alt: "Lembretes próximos com selos de vencimento, valores e empresas" },
      ],
    },
    {
      id: "nf", nome: "Notas Fiscais", cat: "ferramentas", icon: "nf",
      resumo: "Os arquivos das notas de cada empresa, com número, emitente e responsável — e uma busca para achar qualquer uma.",
      oque: "Um arquivo de notas fiscais por empresa. Você anexa o arquivo da nota (PDF, XML ou imagem) e informa o número, o emitente e o responsável. Depois, busca, visualiza, baixa, edita ou exclui, sem sair do Bapell.",
      praquem: "Para quem precisa guardar as notas de cada empresa e encontrá-las depois, sem depender de pastas soltas.",
      recursos: [
        "Empresas do cadastro no menu lateral, com o CNPJ à vista",
        "Anexar nota com nome do arquivo, número da NF, emitente e responsável",
        "Busca por nome, número, emitente ou responsável",
        "Visualização de PDF e imagem em tela cheia, com opção de baixar",
        "Editar os dados ou trocar só o arquivo",
        "Arquivos guardados no seu computador, separados por empresa",
        "Proteção opcional por senha",
      ],
      beneficios: [
        "Notas reunidas por empresa e fáceis de achar",
        "Abrir a nota sem sair do aplicativo",
        "Saber quem anexou ou alterou cada nota",
      ],
      passos: [
        "Escolha a empresa no menu lateral.",
        "Clique em Adicionar NF e escolha o arquivo.",
        "Informe número, emitente e responsável e salve.",
        "Use a busca e os botões Ver, Editar e Excluir.",
      ],
      nota: "O módulo organiza e guarda as notas. Ele não emite nota fiscal, não transmite à SEFAZ e não tem validade fiscal.",
      conecta: ["empresa", "usuarios"],
      imgs: [
        { src: "nf", alt: "Notas Fiscais de uma empresa com número, emitente e responsável" },
      ],
    },
    {
      id: "usuarios", nome: "Usuários e Senhas", cat: "sistema", icon: "usuarios",
      resumo: "Quem lança o quê, senhas de Administrador e Colaborador, módulos protegidos e senha nos botões que você escolher.",
      oque: "Cadastra as pessoas que aparecem como responsáveis nos lançamentos, define a senha do Administrador e a do Colaborador, escolhe quais módulos pedem senha ao abrir e quais botões pedem usuário e senha antes de agir.",
      praquem: "Para quem divide o computador ou o trabalho com outras pessoas e quer saber quem lançou o quê e limitar o acesso ao que é sensível.",
      recursos: [
        "Usuários com senha opcional, usados como responsável em vendas, financeiro, notas, ações em massa e importações",
        "Senha do Administrador, com recuperação por perguntas de segurança, sem internet",
        "Senha do Colaborador, que pode ser gerada de novo a cada abertura do aplicativo",
        "Módulos protegidos: escolha quais pedem senha ao abrir",
        "Senha nos botões: 83 botões em 13 telas que podem pedir usuário e senha",
        "Senhas guardadas em código, sem o texto original",
      ],
      beneficios: [
        "Cada lançamento mostra quem o fez",
        "Proteger só o que precisa, módulo por módulo e botão por botão",
        "Um ajudante com senha própria, sem conhecer a do dono",
      ],
      passos: [
        "Em Dados da Empresa, abra Usuários e Senhas.",
        "Cadastre os usuários.",
        "Crie a senha do Administrador e marque os módulos protegidos.",
        "Se quiser, ligue a senha nos botões e salve.",
      ],
      nota: "As senhas controlam o acesso dentro do aplicativo; elas não criptografam os arquivos do computador.",
      conecta: ["financeiro", "registro-vendas", "nf", "acoes-massa"],
      imgs: [
        { src: "usuarios", alt: "Usuários cadastrados e senhas de acesso aos módulos" },
      ],
    },
    {
      id: "ajuda", nome: "Central de Ajuda e tutoriais", cat: "sistema", icon: "ajuda",
      resumo: "Tutoriais interativos em 14 telas, guia dos módulos, links oficiais de taxas, backup e a validade da sua licença.",
      oque: "Tudo o que ajuda a usar o Bapell, dentro dele. Cada tela tem um tutorial interativo que destaca o elemento de cada passo e abre sozinho na primeira visita. A Central reúne esses tutoriais, um guia dos módulos, links oficiais de taxas dos marketplaces, o backup, o diagnóstico de erros e a validade da licença.",
      praquem: "Para quem está começando, para treinar alguém da equipe numa tela específica e para cuidar do backup e da licença.",
      recursos: [
        "14 tutoriais interativos, um por tela, com progresso e opção de rever",
        "Guia dos módulos com artigos curtos",
        "Links oficiais de taxas de marketplaces e plataformas de venda",
        "Backup e transferência de dados: exportar e importar",
        "Diagnóstico de problemas: relatório de erros para enviar ao suporte",
        "Validade da licença e troca de chave para renovar ou mudar de plano",
        "Abrir o Bapell junto com o Windows",
      ],
      beneficios: [
        "Aprender cada tela no próprio aplicativo",
        "Rever o passo a passo quando quiser",
        "Backup e licença à mão, mesmo com a licença vencida",
      ],
      passos: [
        "Clique em Ajuda, no rodapé do menu lateral.",
        "Abra a seção que quiser.",
        "Em Tutoriais Interativos, clique em Ver agora ou Rever.",
      ],
      nota: "O backup é manual e fica com você: não é automático nem vai para a nuvem. Guarde o arquivo em local seguro.",
      conecta: ["usuarios", "abas"],
      imgs: [
        { src: "ajuda", alt: "Tutoriais interativos na Central de Ajuda, com o progresso de cada tela" },
      ],
    },
    {
      id: "abas", nome: "Abas e personalização", cat: "sistema", icon: "abas",
      resumo: "Várias telas abertas em abas, como num navegador, três temas e um menu com os módulos na ordem que você quiser.",
      oque: "O Bapell abre as telas em abas: dá para trabalhar num produto, no financeiro e numa calculadora ao mesmo tempo, fixar as abas de uso diário e reabri-las ao iniciar. E a interface fica do seu jeito: três temas, menu recolhível e módulos reordenados ou ocultos.",
      praquem: "Para quem alterna entre várias telas durante o dia e quer o programa com a cara da própria rotina.",
      recursos: [
        "Abrir qualquer item do menu em nova aba (botão direito, botão do meio ou Ctrl+clique)",
        "Fixar, duplicar e fechar abas; as fixadas reabrem quando o Bapell inicia",
        "Três temas: claro, padrão (escuro) e dark absoluto",
        "Menu lateral recolhível",
        "Reordenar módulos arrastando e ocultar os que você não usa",
        "Ocultar lojas sem apagar os produtos",
        "Zoom da tela pelo teclado",
      ],
      beneficios: [
        "Várias telas abertas sem perder o que está preenchido",
        "As telas do dia já abertas ao iniciar",
        "Um menu só com o que você usa",
      ],
      passos: [
        "Clique com o botão direito num item do menu e escolha Abrir em nova aba.",
        "Para manter uma aba, clique nela com o botão direito e escolha Fixar aba.",
        "Escolha o tema no cabeçalho e organize os módulos em Personalização.",
      ],
      conecta: ["plataformas", "ajuda"],
      imgs: [
        { src: "abas", alt: "Barra de abas do Bapell com várias telas abertas" },
        { src: "personalizacao", alt: "Menu de módulos ocultos na tela inicial" },
        { src: "painel-claro", alt: "Tela inicial no tema claro" },
      ],
    },
  ];

  const porId = (id) => MODULOS.find((m) => m.id === id);
  const svg = (paths, extra) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"${extra || ""}>${paths}</svg>`;
  const SETA = '<line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>';

  /* ══════════════════════════════════════
     2. MÓDULOS — cartões
     ══════════════════════════════════════ */
  const grid = $("#featuresGrid");
  if (grid) {
    grid.innerHTML = MODULOS.map((m, i) => `
      <button type="button" class="feature-card rv-pop${m.plus ? " feature-card--plus" : ""}" data-cat="${m.cat}" data-plus="${m.plus ? "1" : "0"}" data-mod="${m.id}" style="--d:${(i % 3) * 80}ms" aria-label="${esc(m.nome)}: ver apresentação do módulo">
        <span class="feature-card__tela"><img src="img/app/${m.imgs[0].src}-p.webp" alt="" width="760" height="475" loading="lazy" decoding="async"></span>
        <span class="feature-card__content">
          <span class="feature-card__top">
            <span class="feature-icon">${svg(ICONES[m.icon])}</span>
            ${m.plus ? '<span class="selo selo--plus">Plus · Pro e Platinum</span>' : `<span class="selo">${CATEGORIAS[m.cat]}</span>`}
          </span>
          <h3>${esc(m.nome)}</h3>
          <p>${esc(m.resumo)}</p>
          <span class="feature-card__ver">Ver o módulo ${svg(SETA)}</span>
        </span>
      </button>`).join("");

    const dica = document.createElement("p");
    dica.className = "mod-dica";
    dica.innerHTML = svg('<polyline points="9 18 15 12 9 6"></polyline>') + "Deslize para ver os outros módulos";
    grid.after(dica);
  }

  /* ══════════════════════════════════════
     3. REVELAÇÃO NA ROLAGEM
     ══════════════════════════════════════ */
  const revealSelector = ".rv, .rv-left, .rv-right, .rv-pop, #heroTitle, .prob-item, .fluxo, .cmp, .ad-duo, .adapt__card, .adapt__bridge";
  const revealEls = $$(revealSelector);

  // Ordem dos vistos da tabela e dos traços do fluxo (efeito em sequência)
  $$(".cmp__tab tbody tr").forEach((tr, i) => tr.style.setProperty("--r", i));
  $$(".fluxo__lista li").forEach((li, i) => li.style.setProperty("--j", i));

  const revealTitle = (h1) => {
    $$(".word > span", h1).forEach((w, i) => w.style.setProperty("--wd", `${i * 60}ms`));
    h1.classList.add("is-in");
  };

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-in"));
  } else {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          if (el.id === "heroTitle") revealTitle(el);
          else el.classList.add("is-in");
          obs.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    revealEls.forEach((el) => obs.observe(el));
    const heroTitle = $("#heroTitle");
    if (heroTitle) requestAnimationFrame(() => revealTitle(heroTitle));
  }

  // O palco do topo entra junto com o título
  const hero = $(".hero");
  if (hero) requestAnimationFrame(() => setTimeout(() => hero.classList.add("is-pronto"), 60));

  /* ══════════════════════════════════════
     4. NAVEGAÇÃO: fundo ao rolar, barra de leitura,
        seção ativa e menu do celular
     ══════════════════════════════════════ */
  const nav = $("#nav");
  const leitura = $("#leitura");
  const barraCompra = $("#barraCompra");
  const planosSec = $("#planos");
  const footer = $(".footer");
  const chamadaFinal = $("#comecar");

  let rolagemPendente = false;
  const aoRolar = () => {
    rolagemPendente = false;
    const y = window.scrollY;
    if (nav) nav.classList.toggle("is-stuck", y > 20);
    if (leitura) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      leitura.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
    }
    if (barraCompra && planosSec) {
      const vh = window.innerHeight;
      const pr = planosSec.getBoundingClientRect();
      const fr = footer ? footer.getBoundingClientRect() : { top: Infinity };
      const cr = chamadaFinal ? chamadaFinal.getBoundingClientRect() : { top: Infinity };
      const nosPlanos = pr.top < vh * 0.85 && pr.bottom > vh * 0.15;
      // a chamada final já tem os mesmos botões
      const noFim = cr.top < vh * 0.85 || fr.top < vh;
      const mostrar = y > vh * 0.9 && !nosPlanos && !noFim;
      barraCompra.classList.toggle("is-visivel", mostrar);
      barraCompra.setAttribute("aria-hidden", String(!mostrar));
      $$("a", barraCompra).forEach((a) => (a.tabIndex = mostrar ? 0 : -1));
    }
    parallaxHero(y);
  };
  window.addEventListener("scroll", () => {
    if (!rolagemPendente) { rolagemPendente = true; requestAnimationFrame(aoRolar); }
  }, { passive: true });
  window.addEventListener("resize", () => requestAnimationFrame(aoRolar), { passive: true });

  // Paralaxe leve da ficha ao fundo do topo (só com mouse e sem movimento reduzido)
  const fundo = $("#heroFundo");
  function parallaxHero(y) {
    if (!fundo || prefersReducedMotion || !finePointer || window.innerWidth < 1024) return;
    if (y > window.innerHeight * 1.2) return;
    fundo.style.setProperty("translate", `0 ${Math.round(y * -0.08)}px`);
  }

  // Link da seção visível, com o marcador deslizando por baixo
  const navLinks = $$("#navLinks .nav__link");
  const marcador = $("#navMarcador");
  const moverMarcador = (link) => {
    if (!marcador) return;
    if (!link) { marcador.style.opacity = "0"; return; }
    marcador.style.opacity = "1";
    marcador.style.width = `${link.offsetWidth - 26}px`;
    marcador.style.transform = `translateX(${link.offsetLeft + 13}px)`;
  };
  if (navLinks.length && "IntersectionObserver" in window) {
    const secoes = navLinks.map((a) => $(a.getAttribute("href"))).filter(Boolean);
    const visiveis = new Map();
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((e) => visiveis.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0));
      let melhor = null, maior = 0;
      visiveis.forEach((r, id) => { if (r > maior) { maior = r; melhor = id; } });
      navLinks.forEach((a) => a.classList.toggle("is-ativo", melhor && a.getAttribute("href") === "#" + melhor));
      moverMarcador(navLinks.find((a) => a.classList.contains("is-ativo")) || null);
    }, { threshold: [0, 0.15, 0.3, 0.5], rootMargin: "-20% 0px -50% 0px" });
    secoes.forEach((s) => spy.observe(s));
  }

  // Menu do celular e do tablet
  const navMenu = $("#navMenu");
  const menuMobile = $("#menuMobile");
  let menuTimer = null;
  const fecharMenu = () => {
    if (!menuMobile || menuMobile.hidden || !menuMobile.classList.contains("is-aberto")) return;
    navMenu.setAttribute("aria-expanded", "false");
    navMenu.setAttribute("aria-label", "Abrir menu");
    menuMobile.classList.remove("is-aberto");
    document.body.classList.remove("trava-rolagem");
    clearTimeout(menuTimer);
    menuTimer = setTimeout(() => { menuMobile.hidden = true; }, prefersReducedMotion ? 0 : 320);
  };
  if (navMenu && menuMobile) {
    navMenu.addEventListener("click", () => {
      if (menuMobile.classList.contains("is-aberto")) { fecharMenu(); return; }
      clearTimeout(menuTimer);
      menuMobile.hidden = false;
      navMenu.setAttribute("aria-expanded", "true");
      navMenu.setAttribute("aria-label", "Fechar menu");
      document.body.classList.add("trava-rolagem");
      requestAnimationFrame(() => menuMobile.classList.add("is-aberto"));
    });
    $$("a", menuMobile).forEach((a) => a.addEventListener("click", fecharMenu));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") fecharMenu(); });
    window.addEventListener("resize", () => { if (window.innerWidth > 1023) fecharMenu(); });
  }

  aoRolar();

  /* ══════════════════════════════════════
     5. BRILHO NOS CARTÕES E INCLINAÇÃO DA AMOSTRA (só mouse)
     ══════════════════════════════════════ */
  if (!prefersReducedMotion && finePointer) {
    document.addEventListener("mousemove", (e) => {
      const card = e.target.closest && e.target.closest(".feature-card");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
      card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    }, { passive: true });

    const widget = $("#ledger-widget");
    if (widget) {
      let pend = false, ex = 0, ey = 0;
      document.addEventListener("mousemove", (e) => {
        ex = e.clientX; ey = e.clientY;
        if (pend) return;
        pend = true;
        requestAnimationFrame(() => {
          pend = false;
          if (window.scrollY > window.innerHeight) return;
          const xAxis = (window.innerWidth / 2 - ex) / 140;
          const yAxis = (window.innerHeight / 2 - ey) / 140;
          widget.style.transform = `perspective(1100px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
      }, { passive: true });
    }
  }

  /* ══════════════════════════════════════
     6. FILTRO DE MÓDULOS
     ══════════════════════════════════════ */
  const filterBtns = $$(".mod-filter");
  if (filterBtns.length) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const filter = btn.dataset.filter;
        filterBtns.forEach((b) => { b.classList.remove("is-active"); b.setAttribute("aria-pressed", "false"); });
        btn.classList.add("is-active");
        btn.setAttribute("aria-pressed", "true");
        let n = 0;
        $$(".feature-card[data-cat]").forEach((card) => {
          const show = filter === "all" || card.dataset.cat === filter || (filter === "plus" && card.dataset.plus === "1");
          card.classList.toggle("is-hidden", !show);
          card.classList.remove("is-filtrando");
          if (show && !prefersReducedMotion) {
            card.style.setProperty("--i", n++);
            void card.offsetWidth;
            card.classList.add("is-filtrando");
          }
        });
        if (grid) grid.scrollTo({ left: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
      });
    });
  }

  /* ══════════════════════════════════════
     7. APRESENTAÇÃO DO MÓDULO
     ══════════════════════════════════════ */
  const modal = $("#modModal");
  const painel = $("#modPainel");
  const conteudo = $("#modConteudo");
  const rolagem = $("#modRolagem");
  const trilha = $("#modTrilha");
  const posEl = $("#modPos");
  const btnAnt = $("#modAnterior");
  const btnProx = $("#modProximo");
  const zoom = $("#zoom");
  const zoomImg = $("#zoomImg");
  let atual = -1;
  let origemFoco = null;
  let entrouPeloHash = false;
  let modalTimer = null;
  let zoomTimer = null;

  const montarModulo = (m) => {
    const imgs = m.imgs.map((im, i) => `
      <button type="button" class="mm__mini${i === 0 ? " is-ativa" : ""}" data-img="${i}" aria-label="Ver tela: ${esc(im.alt)}">
        <img src="img/app/${im.src}-p.webp" alt="" loading="lazy" decoding="async">
      </button>`).join("");
    const conecta = (m.conecta || []).map(porId).filter(Boolean).map((c) =>
      `<button type="button" class="mm__chip" data-ir="${c.id}">${svg(ICONES[c.icon])}${esc(c.nome)}</button>`).join("");
    let k = 0;
    const kk = () => `style="--k:${k++}"`;
    return `
      <div class="mm">
        <div class="mm__media">
          <figure class="janela mm__janela">
            <div class="janela__barra"><span class="janela__titulo">Bapell Gestor Pro — ${esc(m.nome)}</span><span class="janela__ctrl"><i></i><i></i><i></i></span></div>
            <button type="button" class="mm__ampliar" aria-label="Ampliar a tela">
              <img src="img/app/${m.imgs[0].src}.webp" alt="${esc(m.imgs[0].alt)}" width="1600" height="1000" decoding="async">
            </button>
          </figure>
          ${m.imgs.length > 1 ? `<div class="mm__miniaturas" role="group" aria-label="Outras telas do módulo">${imgs}</div>` : ""}
          <p class="mm__legenda">${esc(m.imgs[0].alt)}. Tela real do Bapell, com dados de demonstração.</p>
        </div>
        <div class="mm__texto">
          <div class="mm__selos" ${kk()}>
            <span class="selo selo--cat">${CATEGORIAS[m.cat]}</span>
            ${m.plus ? '<span class="selo selo--plus">Módulo Plus · Pro e Platinum</span>' : '<span class="selo selo--todos">Em todos os planos</span>'}
          </div>
          <h2 id="modTitulo" ${kk()}>${esc(m.nome)}</h2>
          <p class="mm__lead" ${kk()}>${esc(m.oque)}</p>
          <div class="mm__bloco" ${kk()}><h3>Para quem é</h3><p>${esc(m.praquem)}</p></div>
          <div class="mm__bloco" ${kk()}><h3>Principais recursos</h3><ul class="mm__recursos">${m.recursos.map((r) => `<li>${esc(r)}</li>`).join("")}</ul></div>
          <div class="mm__bloco" ${kk()}><h3>O que você ganha</h3><ul class="mm__beneficios">${m.beneficios.map((r) => `<li>${esc(r)}</li>`).join("")}</ul></div>
          <div class="mm__bloco" ${kk()}><h3>Como funciona no Bapell</h3><ol class="mm__passos">${m.passos.map((r) => `<li>${esc(r)}</li>`).join("")}</ol></div>
          ${m.nota ? `<p class="mm__nota" ${kk()}><strong>Bom saber:</strong> ${esc(m.nota)}</p>` : ""}
          ${conecta ? `<div class="mm__bloco" ${kk()}><h3>Conecta com</h3><div class="mm__conecta">${conecta}</div></div>` : ""}
          <div class="mm__cta${m.plus ? " mm__cta--plus" : ""}" ${kk()}>
            <p>${m.plus ? "Este módulo está nos planos <strong>Pro</strong> e <strong>Platinum</strong>." : "Este módulo está em <strong>todos os planos</strong>."}</p>
            <a class="btn btn--primary" href="#planos" data-fechar-planos>Ver planos</a>
          </div>
        </div>
      </div>`;
  };

  const preencher = (i) => {
    const m = MODULOS[i];
    atual = i;
    conteudo.innerHTML = montarModulo(m);
    trilha.innerHTML = `<span>Módulos</span><span aria-hidden="true">›</span><strong>${esc(m.nome)}</strong>`;
    posEl.textContent = `${i + 1} de ${MODULOS.length}`;
    const ant = MODULOS[(i - 1 + MODULOS.length) % MODULOS.length];
    const prox = MODULOS[(i + 1) % MODULOS.length];
    $("span", btnAnt).textContent = ant.nome;
    $("span", btnProx).textContent = prox.nome;
    btnAnt.setAttribute("aria-label", `Módulo anterior: ${ant.nome}`);
    btnProx.setAttribute("aria-label", `Próximo módulo: ${prox.nome}`);
    rolagem.scrollTop = 0;

    // Miniaturas trocam a tela principal
    const principal = $(".mm__ampliar img", conteudo);
    const legenda = $(".mm__legenda", conteudo);
    $$(".mm__mini", conteudo).forEach((b) => b.addEventListener("click", () => {
      const im = m.imgs[Number(b.dataset.img)];
      $$(".mm__mini", conteudo).forEach((x) => x.classList.toggle("is-ativa", x === b));
      principal.classList.add("is-trocando");
      setTimeout(() => {
        principal.src = `img/app/${im.src}.webp`;
        principal.alt = im.alt;
        legenda.textContent = `${im.alt}. Tela real do Bapell, com dados de demonstração.`;
        principal.onload = () => principal.classList.remove("is-trocando");
        if (principal.complete) principal.classList.remove("is-trocando");
      }, prefersReducedMotion ? 0 : 180);
    }));
    $(".mm__ampliar", conteudo).addEventListener("click", () => abrirZoom(principal.src, principal.alt));
    $$("[data-ir]", conteudo).forEach((b) => b.addEventListener("click", () => {
      const j = MODULOS.findIndex((x) => x.id === b.dataset.ir);
      if (j >= 0) trocar(j, j > atual ? 1 : -1);
    }));
    $("[data-fechar-planos]", conteudo).addEventListener("click", (e) => {
      e.preventDefault();
      fecharModulo(true);
      setTimeout(() => planosSec && planosSec.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" }), 80);
    });
  };

  const atualizarHash = (id, substituir) => {
    const url = `${location.pathname}${location.search}#modulo/${id}`;
    try {
      if (substituir) history.replaceState({ modulo: id }, "", url);
      else history.pushState({ modulo: id }, "", url);
    } catch (e) {}
  };

  const abrirModulo = (i, origem, viaHash) => {
    if (!modal || i < 0) return;
    origemFoco = origem || document.activeElement;
    clearTimeout(modalTimer);
    preencher(i);
    painel.style.transformOrigin = "50% 60%";
    modal.hidden = false;
    document.body.classList.add("trava-rolagem");
    requestAnimationFrame(() => {
      // a origem é relativa ao painel: ajusta depois de exibido
      if (origem && origem.getBoundingClientRect && !prefersReducedMotion) {
        const r = origem.getBoundingClientRect();
        const p = painel.getBoundingClientRect();
        painel.style.transformOrigin = `${r.left + r.width / 2 - p.left}px ${r.top + r.height / 2 - p.top}px`;
      }
      modal.classList.add("is-aberto");
      painel.focus({ preventScroll: true });
    });
    entrouPeloHash = !!viaHash;
    if (!viaHash) atualizarHash(MODULOS[i].id, false);
  };

  const fecharModulo = (semVoltar) => {
    if (!modal || modal.hidden || !modal.classList.contains("is-aberto")) return;
    modal.classList.remove("is-aberto");
    document.body.classList.remove("trava-rolagem");
    clearTimeout(modalTimer);
    modalTimer = setTimeout(() => { modal.hidden = true; conteudo.innerHTML = ""; }, prefersReducedMotion ? 0 : 420);
    if (location.hash.startsWith("#modulo/")) {
      if (!entrouPeloHash && !semVoltar) { try { history.back(); } catch (e) {} }
      else { try { history.replaceState(null, "", `${location.pathname}${location.search}#modulos`); } catch (e) {} }
    }
    const card = MODULOS[atual] && $(`.feature-card[data-mod="${MODULOS[atual].id}"]`);
    const alvo = card || origemFoco;
    if (alvo && alvo.focus) {
      alvo.focus({ preventScroll: true });
      // o "voltar" do histórico pode tirar o foco: devolve ao cartão
      setTimeout(() => { if (modal.hidden || !modal.classList.contains("is-aberto")) alvo.focus({ preventScroll: true }); }, 80);
    }
    atual = -1;
  };

  const trocar = (j, dir) => {
    if (j === atual) return;
    const saindo = dir > 0 ? "is-saindo-prox" : "is-saindo-ant";
    const entrando = dir > 0 ? "is-entrando-prox" : "is-entrando-ant";
    const fazer = () => {
      preencher(j);
      atualizarHash(MODULOS[j].id, true);
      if (prefersReducedMotion) return;
      conteudo.classList.remove(saindo);
      conteudo.classList.add(entrando);
      void conteudo.offsetWidth;
      conteudo.classList.remove(entrando);
    };
    if (prefersReducedMotion) { fazer(); return; }
    conteudo.classList.add(saindo);
    setTimeout(fazer, 220);
  };

  if (grid && modal) {
    grid.addEventListener("click", (e) => {
      const card = e.target.closest(".feature-card");
      if (!card) return;
      abrirModulo(MODULOS.findIndex((m) => m.id === card.dataset.mod), card, false);
    });
    $$("[data-fechar]", modal).forEach((b) => b.addEventListener("click", () => fecharModulo(false)));
    btnAnt.addEventListener("click", () => trocar((atual - 1 + MODULOS.length) % MODULOS.length, -1));
    btnProx.addEventListener("click", () => trocar((atual + 1) % MODULOS.length, 1));

    document.addEventListener("keydown", (e) => {
      if (modal.hidden || !modal.classList.contains("is-aberto")) return;
      if (zoom && !zoom.hidden) {
        if (e.key === "Escape") fecharZoom();
        return;
      }
      if (e.key === "Escape") { e.preventDefault(); fecharModulo(false); }
      else if (e.key === "ArrowRight" && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) btnProx.click();
      else if (e.key === "ArrowLeft" && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) btnAnt.click();
      else if (e.key === "Tab") {
        // mantém o foco dentro da janela
        const foc = $$('button, a[href], [tabindex]:not([tabindex="-1"])', painel).filter((el) => el.offsetParent !== null);
        if (!foc.length) return;
        const prim = foc[0], ult = foc[foc.length - 1];
        if (e.shiftKey && (document.activeElement === prim || document.activeElement === painel)) { e.preventDefault(); ult.focus(); }
        else if (!e.shiftKey && document.activeElement === ult) { e.preventDefault(); prim.focus(); }
      }
    });

    // Voltar do navegador fecha a apresentação; endereço com #modulo/... abre
    const lerHash = () => {
      const h = decodeURIComponent(location.hash || "");
      if (h.startsWith("#modulo/")) {
        const i = MODULOS.findIndex((m) => m.id === h.slice(8));
        if (i < 0) return;
        if (modal.hidden || !modal.classList.contains("is-aberto")) abrirModulo(i, null, true);
        else if (i !== atual) trocar(i, i > atual ? 1 : -1);
      } else if (!modal.hidden) {
        entrouPeloHash = true;
        fecharModulo(true);
      }
    };
    window.addEventListener("popstate", lerHash);
    if (location.hash.startsWith("#modulo/")) setTimeout(lerHash, 350);
  }

  // Ampliar a tela
  function abrirZoom(src, alt) {
    if (!zoom) return;
    zoomImg.src = src;
    zoomImg.alt = alt || "";
    clearTimeout(zoomTimer);
    zoom.hidden = false;
    requestAnimationFrame(() => zoom.classList.add("is-aberto"));
    $(".zoom__fechar", zoom).focus({ preventScroll: true });
  }
  function fecharZoom() {
    if (!zoom || zoom.hidden) return;
    zoom.classList.remove("is-aberto");
    clearTimeout(zoomTimer);
    zoomTimer = setTimeout(() => { zoom.hidden = true; }, prefersReducedMotion ? 0 : 300);
    const amp = $(".mm__ampliar", conteudo);
    if (amp) amp.focus({ preventScroll: true });
  }
  if (zoom) zoom.addEventListener("click", fecharZoom);

  /* ══════════════════════════════════════
     8. COMO FUNCIONA — a janela fixa troca de tela
     ══════════════════════════════════════ */
  const passos = $$(".como__passo");
  const telas = $$(".como__tela");
  const comoTitulo = $("#comoTitulo");
  const comoTrilho = $("#comoTrilho");
  if (passos.length && telas.length && "IntersectionObserver" in window) {
    const ativar = (i) => {
      passos.forEach((p, k) => p.classList.toggle("is-ativo", k === i));
      telas.forEach((t, k) => t.classList.toggle("is-ativa", k === i));
      if (comoTitulo && telas[i]) comoTitulo.textContent = telas[i].dataset.titulo || "";
      if (comoTrilho) comoTrilho.style.width = `${((i + 1) / passos.length) * 100}%`;
    };
    const obsPasso = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) ativar(Number(e.target.dataset.passo)); });
    }, { rootMargin: "-45% 0px -45% 0px", threshold: 0 });
    passos.forEach((p) => obsPasso.observe(p));
    // carrega as telas grandes antes de chegar à seção
    const pre = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        telas.forEach((t) => { t.loading = "eager"; });
        pre.disconnect();
      }
    }, { rootMargin: "600px 0px" });
    const secCom = $("#como-funciona");
    if (secCom) pre.observe(secCom);
  }

  /* ══════════════════════════════════════
     9. CALCULADORA DE PREÇO
     ══════════════════════════════════════ */
  const els = {
    custo: $("#custo"), frete: $("#frete"),
    comissao: $("#comissao"), imposto: $("#imposto"), margem: $("#margem"),
    preco: $("#preco"), lucro: $("#lucro"), bar: $("#bar"), warn: $("#warn"),
  };

  if (els.custo && els.preco) {
    const parseNumber = (txt) => {
      const clean = String(txt).replace(/[^\d.,-]/g, "").replace(/\.(?=\d{3}(\D|$))/g, "").replace(",", ".");
      const n = parseFloat(clean);
      return Number.isFinite(n) && n >= 0 ? n : 0;
    };

    const segments = {
      cost: $(".bar__seg--cost", els.bar), fee: $(".bar__seg--fee", els.bar),
      tax: $(".bar__seg--tax", els.bar), profit: $(".bar__seg--profit", els.bar),
    };

    let animId = null, currentPrice = 0;

    const animatePrice = (target) => {
      if (prefersReducedMotion) { els.preco.textContent = BRL.format(target); currentPrice = target; return; }
      cancelAnimationFrame(animId);
      const start = currentPrice, t0 = performance.now(), duration = 450;
      const step = (t) => {
        const p = Math.min((t - t0) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 4);
        currentPrice = start + (target - start) * ease;
        els.preco.textContent = BRL.format(currentPrice);
        if (p < 1) animId = requestAnimationFrame(step);
        else currentPrice = target;
      };
      animId = requestAnimationFrame(step);
    };

    const paintRangeTrack = (el) => {
      const pct = ((el.value - el.min) / (el.max - el.min)) * 100;
      el.style.setProperty("--fill", `${pct}%`);
    };

    const calculate = () => {
      const cost = parseNumber(els.custo.value);
      const freight = parseNumber(els.frete.value);
      const fee = parseFloat(els.comissao.value);
      const tax = parseFloat(els.imposto.value);
      const margin = parseFloat(els.margem.value);

      [els.comissao, els.imposto, els.margem].forEach((el) => {
        const out = document.getElementById(el.dataset.out);
        if (out) out.textContent = `${PCT.format(parseFloat(el.value))}%`;
        paintRangeTrack(el);
      });

      const totalPct = fee + tax + margin;
      if (totalPct >= 100) {
        els.warn.hidden = false;
        els.preco.textContent = "—";
        els.lucro.textContent = "—";
        currentPrice = 0;
        Object.values(segments).forEach((seg) => (seg.style.width = "0%"));
        return;
      }
      els.warn.hidden = true;

      const baseValue = cost + freight;
      const sellPrice = baseValue / (1 - totalPct / 100);
      const profitVal = sellPrice * (margin / 100);

      animatePrice(sellPrice);
      els.lucro.textContent = BRL.format(profitVal);

      const pctCost = sellPrice > 0 ? (baseValue / sellPrice) * 100 : 0;
      requestAnimationFrame(() => {
        segments.cost.style.width = `${pctCost}%`;
        segments.fee.style.width = `${fee}%`;
        segments.tax.style.width = `${tax}%`;
        segments.profit.style.width = `${margin}%`;
      });
    };

    $$("[data-money]").forEach((input) => {
      input.addEventListener("input", calculate);
      input.addEventListener("focus", () => { if (!input.readOnly) input.select(); });
      input.addEventListener("blur", () => {
        if (!input.readOnly) input.value = NUM.format(parseNumber(input.value));
        calculate();
      });
    });

    [els.comissao, els.imposto, els.margem].forEach((el) => {
      el.addEventListener("input", calculate);
      paintRangeTrack(el);
    });

    calculate();
  }

  /* ══════════════════════════════════════
     10. VÍDEO — fixo, zoom ao centralizar,
         autoplay a 2x, controles e autohide
     ══════════════════════════════════════ */
  const video = $("#featureVideo");
  const frame = $("#demoFrame");
  const screen = $("#demoScreen");
  const playBtn = $("#demoPlay");
  const speedGroup = $("#speedGroup");
  const soundBtn = $("#soundBtn");
  const fullscreenBtn = $("#demoFullscreen");

  if (video && frame) {
    let desiredSpeed = 2;
    const isMobile = () => window.matchMedia("(max-width: 768px)").matches;

    const applySpeed = (s) => {
      desiredSpeed = s;
      try { video.playbackRate = s; } catch (e) {}
    };

    const startPlayback = () => {
      video.classList.add("is-ready");
      applySpeed(desiredSpeed);
      const pr = video.play();
      if (pr && typeof pr.then === "function") {
        pr.then(() => {
          if (playBtn) playBtn.classList.add("is-hidden");
          applySpeed(desiredSpeed);
        }).catch(() => {
          if (playBtn) playBtn.classList.remove("is-hidden");
        });
      }
    };

    video.addEventListener("play", () => applySpeed(desiredSpeed));
    video.addEventListener("loadeddata", () => applySpeed(desiredSpeed));

    const manualPlay = () => {
      startPlayback();
      video.play().then(() => { if (playBtn) playBtn.classList.add("is-hidden"); }).catch(() => {});
    };

    if (playBtn) playBtn.addEventListener("click", manualPlay);

    if (screen) screen.addEventListener("click", (e) => {
      if (e.target.closest(".demo__play") || e.target.closest(".demo__float-btn") || e.target.closest(".demo__speed-float")) return;
      if (video.paused) manualPlay();
      else { video.pause(); if (playBtn) playBtn.classList.remove("is-hidden"); }
    });

    if ("IntersectionObserver" in window) {
      const vObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              startPlayback();
              if (!prefersReducedMotion && !isMobile()) frame.classList.add("is-zoomed");
            } else {
              video.pause();
              frame.classList.remove("is-zoomed");
              if (playBtn) playBtn.classList.remove("is-hidden");
            }
          });
        },
        { threshold: 0.55 },
      );
      vObs.observe(frame);
    } else {
      startPlayback();
    }

    if (speedGroup) {
      $$(".speed-btn", speedGroup).forEach((btn) => {
        btn.addEventListener("click", () => {
          $$(".speed-btn", speedGroup).forEach((b) => b.classList.remove("is-active"));
          btn.classList.add("is-active");
          applySpeed(parseFloat(btn.dataset.speed));
        });
      });
    }

    if (soundBtn) {
      soundBtn.addEventListener("click", () => {
        video.muted = !video.muted;
        const on = !video.muted;
        soundBtn.classList.toggle("is-muted", !on);
        soundBtn.classList.toggle("is-on", on);
        soundBtn.setAttribute("aria-pressed", String(on));
        if (on && video.paused) video.play().catch(() => {});
      });
    }

    if (fullscreenBtn) {
      fullscreenBtn.addEventListener("click", async (e) => {
        e.stopPropagation();
        if (!document.fullscreenElement) {
          try {
            if (screen.requestFullscreen) {
              await screen.requestFullscreen();
            } else if (screen.webkitRequestFullscreen) {
              await screen.webkitRequestFullscreen();
            }

            if (window.screen && window.screen.orientation && window.screen.orientation.lock) {
              await window.screen.orientation.lock("landscape").catch(() => {
                console.warn("Rotação ignorada pelo dispositivo.");
              });
            }
          } catch (err) {
            console.error(err);
          }
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          }
        }
      });
    }

    // --- AUTOHIDE DOS CONTROLES DO VÍDEO (2 SEGUNDOS) ---
    let hideControlsTimer = null;
    const hideDelay = 2000;

    const showControls = () => {
      frame.classList.remove("is-controls-hidden");
      clearTimeout(hideControlsTimer);
      hideControlsTimer = setTimeout(() => {
        if (!video.paused) {
          frame.classList.add("is-controls-hidden");
        }
      }, hideDelay);
    };

    if (screen) {
      screen.addEventListener("mousemove", showControls);
      screen.addEventListener("touchstart", showControls, { passive: true });
      screen.addEventListener("click", showControls);
    }

    showControls();
  }

  document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement && window.screen && window.screen.orientation && window.screen.orientation.unlock) {
      window.screen.orientation.unlock();
    }
  });

  /* ══════════════════════════════════════
     11. PLANOS — alternância Anual / Vitalícia
     ══════════════════════════════════════ */
  const prazo = $("#prazo");
  const plans = $("#plans");
  const cmp = $("#cmp");
  const cmpSub = $("#cmpSub");

  const contarPreco = (el, alvo) => {
    const inteiro = Math.floor(alvo);
    const fmt = (n) => n.toLocaleString("pt-BR");
    if (prefersReducedMotion) { el.textContent = fmt(inteiro); return; }
    const t0 = performance.now(), dur = 700, ini = Math.round(inteiro * 0.55);
    const passo = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      const v = Math.round(ini + (inteiro - ini) * (1 - Math.pow(1 - p, 3)));
      el.textContent = fmt(v);
      if (p < 1) requestAnimationFrame(passo);
    };
    requestAnimationFrame(passo);
  };

  if (prazo && plans) {
    const ops = $$(".prazo__op", prazo);
    const escolher = (valor, animar) => {
      prazo.dataset.ativo = valor;
      ops.forEach((b) => {
        const on = b.dataset.prazo === valor;
        b.classList.toggle("is-ativo", on);
        b.setAttribute("aria-checked", String(on));
        b.tabIndex = on ? 0 : -1;
      });
      plans.dataset.prazo = valor;
      if (cmp) cmp.dataset.prazo = valor;
      if (cmpSub) cmpSub.textContent = valor === "anual"
        ? "Mostrando os planos anuais: Licença Anual e Pro."
        : "Mostrando os planos vitalícios: Licença Vitalícia e Platinum.";
      if (!animar) return;
      $$(`.plan[data-prazo="${valor}"]`, plans).forEach((p) => {
        p.classList.remove("is-trocando", "rv-pop");
        p.classList.add("is-in");
        void p.offsetWidth;
        if (!prefersReducedMotion) p.classList.add("is-trocando");
        const val = $(".val", p);
        if (val && val.dataset.preco) contarPreco(val, parseFloat(val.dataset.preco));
      });
    };
    ops.forEach((b, i) => {
      b.addEventListener("click", () => escolher(b.dataset.prazo, true));
      b.addEventListener("keydown", (e) => {
        if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
        e.preventDefault();
        const prox = ops[(i + (e.key === "ArrowRight" ? 1 : -1) + ops.length) % ops.length];
        prox.focus();
        escolher(prox.dataset.prazo, true);
      });
    });
    escolher("anual", false);
  }

  /* ══════════════════════════════════════
     12. NÚMEROS QUE CONTAM AO APARECER
     ══════════════════════════════════════ */
  const contas = $$("[data-conta]");
  if (contas.length && !prefersReducedMotion && "IntersectionObserver" in window) {
    const obsConta = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        obsConta.unobserve(e.target);
        const el = e.target, alvo = parseFloat(el.dataset.conta);
        const t0 = performance.now(), dur = 1100;
        const passo = (t) => {
          const p = Math.min((t - t0) / dur, 1);
          el.textContent = BRL.format(alvo * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(passo);
          else el.textContent = BRL.format(alvo);
        };
        requestAnimationFrame(passo);
      });
    }, { threshold: 0.6 });
    contas.forEach((el) => obsConta.observe(el));
  }

  /* ══════════════════════════════════════
     13. PERGUNTAS — abre e fecha com a altura animada
     (o <details> continua funcionando sem o script)
     ══════════════════════════════════════ */
  if (!prefersReducedMotion && typeof Element.prototype.animate === "function") {
    $$(".faq__item").forEach((det) => {
      const sum = $("summary", det);
      const resp = $(".faq__resp", det);
      if (!sum || !resp) return;
      let anim = null;
      let fechando = false;
      sum.addEventListener("click", (e) => {
        e.preventDefault();
        // altura de agora (pode estar no meio de uma animação)
        const hAgora = det.open ? resp.getBoundingClientRect().height : 0;
        if (anim) { anim.onfinish = null; anim.cancel(); anim = null; }
        if (det.open && !fechando) {
          fechando = true;
          anim = resp.animate([{ height: `${hAgora}px`, opacity: 1 }, { height: "0px", opacity: 0 }], { duration: 320, easing: "cubic-bezier(0.65, 0, 0.35, 1)" });
          anim.onfinish = () => { det.open = false; fechando = false; anim = null; };
        } else {
          fechando = false;
          det.open = true;
          const h = resp.offsetHeight;
          anim = resp.animate([{ height: `${hAgora}px`, opacity: hAgora ? 1 : 0 }, { height: `${h}px`, opacity: 1 }], { duration: 380, easing: "cubic-bezier(0.16, 1, 0.3, 1)" });
          anim.onfinish = () => { anim = null; };
        }
      });
    });
  }
})();
