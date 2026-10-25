/* ════════════════════════════════════════════════════════════════
   Bapell Gestor Pro — site de vendas · script.js
   1. Dados dos módulos (conferidos no aplicativo e nos Termos de Uso 5.0)
   2. Calculadora da etiqueta (topo)
   3. Navegação, menu do celular e barra de compra
   4. "Como funciona": tela que troca com a rolagem
   5. Equipe: abas das telas
   6. Vídeo
   7. Módulos: filtro, apresentação (#modulo/id) e ampliar tela
   8. Planos: prazo no celular
   ════════════════════════════════════════════════════════════════ */
"use strict";

(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const BRL = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
  const PCT = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1 });

  /* ══════════════════════════════════════
     1. MÓDULOS
     plus: true = só nos planos Pro e Platinum (Gestor de Devoluções,
     Processador de Planilha e Gerador de EAN). As imagens são telas
     reais do Bapell com dados de demonstração.
     ══════════════════════════════════════ */
  const CATEGORIAS = {
    precificacao: "Produtos e preço",
    operacao: "Vendas e devoluções",
    gestao: "Gestão",
    ferramentas: "Ferramentas",
    sistema: "Equipe e sistema",
  };

  const ICONES = {
    plataformas: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    produtos: '<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>',
    categorias: '<path d="M3 7h7l2 2h9v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M3 7V5a2 2 0 0 1 2-2h4l2 2"/>',
    importar: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="11"/><polyline points="9 14 12 11 15 14"/>',
    kits: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>',
    extras: '<line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>',
    massa: '<path d="M16 3l4 4-4 4"/><path d="M20 7H4"/><path d="M8 21l-4-4 4-4"/><path d="M4 17h16"/>',
    registro: '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>',
    info: '<rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>',
    devolucoes: '<polyline points="9 14 4 9 9 4"/><path d="M20 20v-7a4 4 0 0 0-4-4H4"/>',
    empresa: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01"/>',
    financeiro: '<circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/>',
    processador: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',
    calculos: '<rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><path d="M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/>',
    ean: '<path d="M3 5v14M6 5v14M10 5v14M14 5v14M17 5v14M21 5v14"/>',
    lembretes: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
    nf: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
    central: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><circle cx="12" cy="10" r="2.5"/><path d="M8.5 16a4 4 0 0 1 7 0"/>',
    rede: '<rect x="2" y="3" width="9" height="7" rx="1.5"/><rect x="13" y="14" width="9" height="7" rx="1.5"/><path d="M6.5 10v4.5a1.5 1.5 0 0 0 1.5 1.5h5"/><path d="M17.5 14V9.5A1.5 1.5 0 0 0 16 8h-5"/>',
    ajuda: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
    abas: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 9h20M8 4v5M14 4v5"/>',
  };

  const MODULOS = [
    {
      id: "plataformas", nome: "Plataformas", cat: "precificacao", icon: "plataformas",
      resumo: "Cada loja num cartão e, dentro dela, a lista de produtos com busca, filtros e o preço já calculado.",
      oque: "É por onde a operação começa. Cada canal de venda — Mercado Livre, Shopee, Amazon, Magalu, a loja física ou outro — vira um cartão com nome e logo. Dentro de cada loja fica a lista de produtos, com foto, SKU, categoria, tipo e preço de venda.",
      praquem: "Para quem vende em mais de um canal e precisa achar um produto pelo nome, pelo SKU ou pelo ID do anúncio e ver o preço de cada um sem abrir ficha por ficha.",
      recursos: [
        "Cartões das lojas com a quantidade de produtos; a Loja Física já vem cadastrada",
        "Busca por nome, SKU ou ID do anúncio — inclusive pelo SKU de um kit",
        "Filtros por tipo (simples, com kits, compostos) e por categoria; ordenação por nome, preço ou data",
        "No Mercado Livre, a coluna de preço mostra Premium e Clássico",
        "Duplicar na mesma loja ou clonar para outra plataforma, com kits, fotos e categoria",
        "Opções em massa: clonar, duplicar, excluir ou adicionar produtos pela planilha",
        "A página da lista é lembrada quando você volta de uma ficha",
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
        "Crie produtos e kits, clone de outra plataforma ou traga pela planilha.",
        "Use a busca e os filtros; clique na linha para abrir a ficha do produto.",
      ],
      nota: "As taxas e comissões são informadas por você em cada produto. O Bapell não se conecta às plataformas: ele usa os valores que você cadastra.",
      conecta: ["produtos", "categorias", "importar", "acoes-massa"],
      imgs: [
        { src: "plataforma", alt: "Lista de produtos do Mercado Livre com categorias, Premium e Clássico" },
        { src: "painel", alt: "Painel inicial com as lojas cadastradas e as prévias do mês" },
      ],
    },
    {
      id: "produtos", nome: "Produtos e precificação", cat: "precificacao", icon: "produtos",
      resumo: "A ficha do produto com custo, impostos, taxas e margem — e o preço de venda calculado enquanto você digita.",
      oque: "Na ficha de cada produto ficam o cadastro (fotos, nome, SKU, ID do anúncio, categoria, peso e medidas) e a precificação completa: o custo com embalagem, etiqueta, frete pago e impostos de compra; o frete, a taxa fixa, a comissão e o imposto da nota; e a margem que você quer, em % ou em reais.",
      praquem: "Para quem precisa saber o preço de anúncio de cada produto em cada loja, considerando tudo o que sai do bolso até a venda.",
      recursos: [
        "Formação do custo: preço de custo, embalagem, etiqueta, frete pago, IPI, DIFAL, ST e alíquota, com o total em impostos à vista",
        "Variáveis de venda: frete do produto, taxa fixa da plataforma, comissão e imposto da nota",
        "Margem em % do preço ou em R$ por unidade, com lucro estimado e margem real",
        "No Mercado Livre, o preço do anúncio Premium e do Clássico lado a lado, cada um com a sua comissão",
        "Regra da taxa fixa até R$ 79,00 aplicada automaticamente em cada preço",
        "Categoria do produto ao lado do SKU e do ID",
        "Campos seus em R$ ou % que entram no cálculo; campos padrão que você renomeia ou oculta em cada loja",
        "A ficha só grava quando você clica em Salvar; se sair com alterações, o Bapell pergunta antes",
        "Mudou o custo? Os compostos e os anúncios com o mesmo SKU na plataforma são atualizados ao salvar",
      ],
      beneficios: [
        "Um preço que já desconta comissão, frete, taxas e impostos — e mostra quanto sobra",
        "Combinações impossíveis de taxa e margem são barradas, em vez de virar um preço absurdo",
        "Uma ficha só com os campos que a sua operação usa",
      ],
      passos: [
        "Preencha a identificação: fotos, nome, SKU, ID do anúncio, categoria e medidas.",
        "Informe o custo e os impostos de compra.",
        "Informe frete, taxa fixa, comissão e imposto da nota (no Mercado Livre, Premium e Clássico).",
        "Escolha a margem: o preço aparece na hora. Depois, clique em Salvar.",
      ],
      nota: "O preço calculado é uma sugestão a partir dos dados que você informa; a decisão de quanto cobrar é sua.",
      conecta: ["plataformas", "kits", "precos-extras", "acoes-massa"],
      imgs: [
        { src: "produto-preco", alt: "Variáveis de venda, margem e os valores Premium e Clássico na ficha do produto" },
        { src: "produto-topo", alt: "Identificação do produto com categoria e a formação do custo total" },
      ],
    },
    {
      id: "categorias", nome: "Categorias de produtos", cat: "precificacao", icon: "categorias",
      resumo: "Organize o catálogo em categorias que valem para todas as lojas — e use-as para filtrar e para escolher os produtos das Ações em Massa.",
      oque: "Você cria as categorias do seu negócio — Cozinha, Eletrônicos, Linha Premium — e escolhe a de cada produto na ficha, ao lado do SKU e do ID. A mesma categoria vale em todas as plataformas: o produto clonado para outra loja leva a categoria junto.",
      praquem: "Para quem tem muitos produtos e quer encontrar, revisar ou reajustar uma linha inteira de uma vez.",
      recursos: [
        "Criar, renomear e excluir categorias numa tela própria",
        "Nome sem repetição: “Cozinha”, “cozinha” e “ Cozinha ” contam como o mesmo",
        "Coluna Em uso: quantos produtos há em cada categoria e em quais plataformas",
        "Filtro por categoria na lista de produtos",
        "Nas Ações em Massa, a categoria escolhe os produtos que recebem a alteração",
        "A categoria também pode ser trocada em massa",
      ],
      beneficios: [
        "Reajustar uma linha inteira sem digitar SKU por SKU",
        "Catálogo organizado igual em todas as lojas",
        "Renomear sem mexer em nenhum produto",
      ],
      passos: [
        "Na lista de produtos, clique em Criar categorias.",
        "Digite o nome e clique em Criar categoria.",
        "Na ficha de cada produto, escolha a categoria e salve.",
        "Filtre a lista ou use a categoria nas Ações em Massa.",
      ],
      nota: "Excluir uma categoria não apaga nenhum produto: os que estavam nela ficam sem categoria, com preço, taxas e imagens como estão.",
      conecta: ["plataformas", "produtos", "acoes-massa"],
      imgs: [
        { src: "categorias", alt: "Tela de categorias com a quantidade de produtos e as plataformas de cada uma" },
        { src: "plataforma", alt: "Lista de produtos com a etiqueta de categoria em cada linha" },
      ],
    },
    {
      id: "importar", nome: "Adicionar pela planilha", cat: "precificacao", icon: "importar",
      resumo: "Cadastre dezenas de produtos de uma vez a partir da planilha do Bling ou do Mercado Livre, com conferência antes de gravar.",
      oque: "Em quatro etapas — origem, planilha, campos e conferência — o Bapell lê a planilha exportada pelo outro sistema, mostra de qual coluna sai cada informação e, antes de gravar, lista o que vai ser cadastrado, o que já existe e o que tem aviso. Você escolhe em quais plataformas cadastrar.",
      praquem: "Para quem já tem o catálogo no Bling ou no Mercado Livre e não quer digitar produto por produto.",
      recursos: [
        "Modelos do Bling e do Mercado Livre, com arquivos .xlsx, .xls ou .csv",
        "Lê nome, SKU, EAN/GTIN, preço de custo, peso e medidas",
        "Colunas sugeridas e conferidas pelos títulos da planilha — e editáveis",
        "Peso em kg convertido para gramas",
        "Conferência com filtros: serão cadastrados, já cadastrados, fora da importação e com aviso",
        "Cadastrar em uma ou em várias plataformas de uma vez",
        "SKU que já existe na plataforma é pulado, sem duplicar",
      ],
      beneficios: [
        "Catálogo inteiro no Bapell em minutos",
        "Nada é gravado antes de você conferir",
        "Os mesmos produtos em várias lojas de uma vez",
      ],
      passos: [
        "Na lista de produtos, abra Opções Em Massa › Adicionar pela Planilha.",
        "Escolha Bling ou Mercado Livre e envie a planilha.",
        "Confira as colunas e os produtos encontrados.",
        "Marque as plataformas e clique em Cadastrar.",
      ],
      nota: "Só esses campos vêm da planilha. Taxas, margem e frete ficam zerados: complete na ficha ou pelas Ações em Massa antes de usar os preços.",
      conecta: ["plataformas", "produtos", "acoes-massa"],
      imgs: [
        { src: "importar", alt: "Conferência dos produtos lidos da planilha do Bling, com as plataformas de destino" },
        { src: "importar-campos", alt: "Campos da planilha com a coluna, o título e um exemplo de cada um" },
      ],
    },
    {
      id: "kits", nome: "Kits e produtos compostos", cat: "precificacao", icon: "kits",
      resumo: "Kits de 2, 3 ou mais unidades e combos de produtos diferentes, cada um com SKU, frete e preço próprios.",
      oque: "O Bapell trata kits de dois jeitos: kits por quantidade, com o mesmo produto em 2, 3, 4 unidades ou mais, e kits compostos, que juntam produtos diferentes já cadastrados. Cada kit tem o próprio SKU, custo, frete, taxas e Preços Extras.",
      praquem: "Para quem vende em quantidade ou em combos e quer o preço de cada combinação sem refazer a conta.",
      recursos: [
        "Adicionar Kit: quantidade, SKU do kit e frete exclusivo",
        "Custo base calculado pela quantidade, com peso e medidas estimados para conferir o frete",
        "Taxas adicionais próprias de cada kit, em R$ ou %",
        "A regra da taxa fixa é avaliada pelo preço do kit inteiro",
        "No Mercado Livre, cada kit mostra Premium e Clássico, com preço e lucro",
        "Preços Extras do kit calculados a partir dos da unidade, multiplicados pela quantidade (dá para desligar)",
        "Kit composto: busque os itens pelo SKU ou nome; o custo é a soma dos itens e acompanha quando um item muda",
        "Margem do composto sugerida pelas margens dos itens",
      ],
      beneficios: [
        "Cada quantidade com preço próprio, sem planilha paralela",
        "Combos sempre com o custo atualizado",
        "A lista de produtos mostra quais têm kits e quais são compostos",
      ],
      passos: [
        "Na ficha do produto, clique em Adicionar Kit.",
        "Informe quantidade, SKU e frete: o preço aparece em Kits do Produto.",
        "Para um combo, use Criar Kit na lista da plataforma e adicione os itens.",
        "Complete taxas e margem e salve.",
      ],
      conecta: ["produtos", "precos-extras", "acoes-massa"],
      imgs: [
        { src: "produto-kits", alt: "Kits do Produto com Premium e Clássico e os Preços Extras de cada kit" },
        { src: "composto", alt: "Kit composto com os componentes e o preço de custo somado" },
      ],
    },
    {
      id: "precos-extras", nome: "Preços Extras", cat: "precificacao", icon: "extras",
      resumo: "Preço mínimo, ideal e máximo: digite um preço, ou a margem que você quer, e veja o resultado na hora.",
      oque: "Três preços de referência — Mínimo, Ideal e Máximo — para planejar promoções e faixas de preço sem mexer no preço principal da ficha. Cada nível funciona por preço, por margem em % ou por lucro em reais.",
      praquem: "Para quem negocia promoções e descontos e quer saber até onde pode ir antes de anunciar.",
      recursos: [
        "Modos Preço, Margem % e Margem R$ em cada nível",
        "A mesma conta do preço principal: custo, frete, taxa fixa, comissão e impostos",
        "No Mercado Livre, Premium e Clássico em cada nível",
        "Aviso “Você perde…” quando o preço fica abaixo do custo",
        "Nos kits, os níveis acompanham a unidade × a quantidade",
        "Nos modos de margem, o preço acompanha mudanças de custo e de taxas",
        "Aviso quando a margem pedida é impossível para as taxas",
      ],
      beneficios: [
        "Saber até onde dá para baixar o preço sem prejuízo",
        "Chegar ao preço a partir do lucro que você quer",
        "Preço principal intacto: os Preços Extras são referência",
      ],
      passos: [
        "Na ficha, escolha o modo de cada nível: Preço, Margem % ou Margem R$.",
        "Digite o preço ou a margem: o resultado aparece na hora.",
        "Confira os níveis dos kits, calculados a partir da unidade.",
        "Salve: o modo, a margem e o preço de cada nível ficam no produto.",
      ],
      conecta: ["produtos", "kits", "acoes-massa"],
      imgs: [
        { src: "produto-extras", alt: "Preços Extras com os modos Preço, Margem % e Margem R$, em Premium e Clássico" },
      ],
    },
    {
      id: "acoes-massa", nome: "Ações em Massa", cat: "precificacao", icon: "massa",
      resumo: "Atualize custo, taxas, impostos, margem ou categoria de vários produtos, em várias lojas, de uma vez.",
      oque: "Você escolhe os produtos pelo SKU, pela categoria ou todos, marca as plataformas de destino e os campos que quer mudar. O Bapell aplica a mudança e recalcula preço, lucro, margem, kits, Preços Extras e produtos compostos, mostrando o andamento.",
      praquem: "Para quem tem o mesmo SKU em várias plataformas, ou muitos produtos, e precisa mudar um custo ou uma taxa sem abrir ficha por ficha.",
      recursos: [
        "Seleção por SKU — vários de uma vez, inclusive colando uma lista —, por categoria ou de todos os produtos",
        "Plataformas de destino, com a opção de selecionar todas",
        "Campos de custo: preço de custo, etiqueta, embalagem, frete pago, IPI, DIFAL, ST e alíquota",
        "Variáveis de venda: frete, taxa fixa, comissão (Premium e Clássico no Mercado Livre), imposto da nota, margem e categoria",
        "Só muda o que estiver marcado; campo marcado e vazio não zera nada",
        "Confirmação com o resumo e o responsável antes de aplicar",
        "Janela de andamento com a etapa e a contagem de SKUs, mesmo com centenas de produtos",
        "Histórico das últimas atualizações e registro no Registro de Logs",
      ],
      beneficios: [
        "O mesmo SKU atualizado em todas as lojas de uma vez",
        "Preços coerentes com o novo custo, sem recalcular à mão",
        "Registro do que foi feito e por quem",
      ],
      passos: [
        "Informe os SKUs, escolha uma categoria ou marque todos os produtos.",
        "Marque as plataformas de destino.",
        "Marque os campos e digite os novos valores.",
        "Revise a confirmação, escolha o responsável e aplique.",
      ],
      nota: "A atualização em massa não pode ser desfeita. Por isso a tela mostra um resumo e pede confirmação antes de aplicar — e vale fazer um backup antes.",
      conecta: ["produtos", "categorias", "kits", "central"],
      imgs: [
        { src: "acoes-massa", alt: "Ações em Massa com a categoria Cozinha e Mesa e as plataformas de destino" },
        { src: "acoes-massa-campos", alt: "Campos para atualizar: preço de custo e margem marcados" },
      ],
    },
    {
      id: "registro-vendas", nome: "Registro de Vendas e Clientes", cat: "operacao", icon: "registro",
      resumo: "Monte a venda, gere o orçamento em PDF, guarde o cliente e, se quiser, lance a receita no Controle Financeiro.",
      oque: "Para as vendas diretas: você monta a venda com comprador, empresa e produtos, gera um orçamento com os dados e a logo da empresa e salva a venda com pagamento, parcelas e status. As vendas ficam numa lista com indicadores e filtros, e os compradores ficam na tela Clientes.",
      praquem: "Para quem também vende fora dos marketplaces e quer cadastro de clientes, orçamento pronto e a receita no financeiro sem digitar de novo.",
      recursos: [
        "Comprador com CPF ou CNPJ conferido, salvo para as próximas vendas",
        "Tela Clientes com busca por nome, CPF/CNPJ ou telefone",
        "Produtos buscados por SKU ou nome em todas as plataformas, com foto e preço",
        "Orçamento em PDF com razão social, CNPJ, endereço, contato e logo da empresa",
        "Pagamento (Pix, dinheiro, débito, crédito, boleto, transferência), parcelas e status",
        "Opção de lançar a venda no Controle Financeiro, mantida em dia ao editar ou excluir",
        "Indicadores: total de vendas, valor total, itens vendidos e ticket médio",
        "Filtros por período, cliente, empresa, pagamento, status e responsável",
      ],
      beneficios: [
        "Orçamento com a cara da empresa, pronto para enviar ao cliente",
        "A receita entra no financeiro sem digitar duas vezes",
        "Clientes guardados para a próxima venda",
      ],
      passos: [
        "Localize ou cadastre o comprador.",
        "Escolha a empresa e adicione os produtos pelo SKU ou pelo nome.",
        "Gere o orçamento ou salve a venda, com pagamento, status e responsável.",
        "Se quiser, marque para lançar no Controle Financeiro.",
      ],
      nota: "O orçamento é um documento sem valor fiscal. O Bapell não emite nota fiscal.",
      conecta: ["produtos", "empresa", "financeiro", "central"],
      imgs: [
        { src: "registro-vendas", alt: "Vendas lançadas com indicadores, filtros e cartões de cada venda" },
        { src: "clientes", alt: "Tela Clientes com os compradores salvos" },
      ],
    },
    {
      id: "informacoes-venda", nome: "Informações de Venda", cat: "operacao", icon: "info",
      resumo: "Suas regras comerciais num lugar só: parcelamento, simulador da maquininha, descontos progressivos e entrega por distância.",
      oque: "Uma ficha com as regras da operação, para consultar na hora de vender: valor mínimo e número máximo de parcelas, simulador da taxa da maquininha (com a loja absorvendo ou o cliente pagando o parcelamento), faixas de desconto pelo valor da compra e formas de entrega cobradas por distância.",
      praquem: "Para quem vende parcelado, oferece desconto por faixa de valor e cobra a entrega por quilômetro, e quer essas regras padronizadas e à mão.",
      recursos: [
        "Regras de parcelamento: valor mínimo e parcelamento máximo",
        "Simulador da maquininha: valor final e juro gerado, com quem paga o parcelamento",
        "Políticas de desconto progressivo: “de R$ … até R$ … = …%”",
        "Formas de entrega com faixas: “raio até … km = R$ …”",
        "Seções e campos seus, em texto, R$, % ou número",
        "Disponível em todos os planos",
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
      id: "devolucoes", nome: "Gestor de Devoluções", cat: "operacao", icon: "devolucoes", plus: true,
      resumo: "Registre cada produto que voltou, veja quanto as devoluções custaram e lance o prejuízo no Controle Financeiro.",
      oque: "Cada devolução guarda a empresa, a loja, o produto ou kit, o valor, a quantidade, se gerou imposto, se a plataforma reembolsou, o estado do produto, a data de chegada e o que você pagou a mais, como o frete de retorno. O Bapell calcula o imposto com a alíquota da empresa e mostra o prejuízo de cada uma e do período.",
      praquem: "Para quem recebe devoluções de marketplace e quer saber quanto elas custam de verdade — e não deixar esse prejuízo fora do financeiro.",
      recursos: [
        "SKU com sugestão de produtos e kits da loja; o valor vem com o preço atual do produto",
        "Imposto = valor × quantidade × a % de imposto por nota da empresa",
        "Prejuízo: imposto + valor extra; reembolsada, só o valor extra; “aguardando” conta como não reembolsada",
        "Indicadores: total devolvido em R$, produtos mais devolvidos, loja com mais devoluções, prejuízo e reembolsos",
        "Filtros combinados: busca, empresa, loja, estado, reembolso, imposto, reputação, financeiro e período",
        "Abre no mês atual e passa sozinho para o mês seguinte; os meses anteriores ficam nos filtros",
        "Futuras devoluções: anote as que estão a caminho, acompanhe a chegada e crie um lembrete",
        "Lançar no Controle Financeiro, uma ou todas as pendentes, na categoria Devolução",
      ],
      beneficios: [
        "O custo real das devoluções, por produto e por loja",
        "Nenhuma devolução esquecida entre a reclamação e a chegada",
        "O prejuízo no financeiro sem digitar de novo",
      ],
      passos: [
        "Clique em Adicionar Devolução e escolha empresa, loja e SKU.",
        "Responda imposto, reputação, reembolso e estado; informe o valor extra, se houver.",
        "Acompanhe os indicadores e filtre o que precisar.",
        "Lance o prejuízo no Controle Financeiro.",
      ],
      nota: "Os valores são estimativas gerenciais, com os dados que você informa. As regras e os prazos de reembolso são de cada plataforma.",
      conecta: ["financeiro", "empresa", "lembretes", "produtos"],
      imgs: [
        { src: "devolucoes", alt: "Gestor de Devoluções com indicadores, filtros e a lista do mês" },
        { src: "devolucoes-form", alt: "Janela Adicionar Devolução com a conta ao vivo de imposto, prejuízo e reembolso" },
        { src: "devolucoes-futuras", alt: "Devoluções a caminho com a previsão de chegada" },
      ],
    },
    {
      id: "empresa", nome: "Dados da Empresa", cat: "gestao", icon: "empresa",
      resumo: "O cadastro completo de cada empresa — CNPJ, inscrições, endereço, sócios, logo e documentos — usado em todo o Bapell.",
      oque: "O cadastro central das suas empresas: identificação e porte, inscrições, CNAE, endereço, contato, situação no Simples Nacional e no MEI, a porcentagem de imposto por nota, sócios, logo e documentos. Esses dados alimentam os outros módulos.",
      praquem: "Para quem tem uma ou mais empresas e quer os dados cadastrais, a logo e os documentos num só lugar, reaproveitados no financeiro, nas vendas, nas devoluções e nas notas.",
      recursos: [
        "Várias empresas no mesmo aplicativo, com troca rápida",
        "Identificação e porte, inscrições, atividades (CNAE), endereço, contato, situação cadastral e quadro de sócios",
        "CNPJ — inclusive o novo, alfanumérico — e CPF conferidos pelos dígitos antes de salvar",
        "Porcentagem de imposto por nota, usada no Processador de Planilha e no Gestor de Devoluções",
        "Logo usada nas outras telas e nos orçamentos",
        "Documentos da empresa (alvará, contrato social…), com visualização de PDF e imagem",
        "Campos e seções próprias e ordem das seções do seu jeito",
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
      conecta: ["financeiro", "registro-vendas", "devolucoes", "nf"],
      imgs: [
        { src: "empresa", alt: "Identificação da empresa com logo, CNPJ e razão social" },
      ],
    },
    {
      id: "financeiro", nome: "Controle Financeiro", cat: "gestao", icon: "financeiro",
      resumo: "Entradas e saídas de cada empresa, com DRE do período, indicadores comparados, desempenho por canal e gráficos.",
      oque: "Você registra as entradas (vendas e outros recebimentos) e as saídas (custo de produto, despesas e devoluções) de cada empresa. Para o período escolhido, o Bapell mostra indicadores comparados com o período anterior, análises automáticas, o DRE, o desempenho de cada canal, gráficos e o extrato.",
      praquem: "Para quem quer saber se a empresa está no lucro e para onde vai o dinheiro — inclusive quanto sobra de cada canal depois de taxas, fretes e impostos.",
      recursos: [
        "Registrar Entrada (valor bruto ou líquido, com taxa, frete e impostos) e Registrar Saída por categoria, inclusive Devolução",
        "Abre no mês atual e passa sozinho para o mês seguinte; mês passado, ano, 12 meses, tudo ou personalizado",
        "Seis indicadores com variação: faturamento, CMV, despesas, lucro, margem e ticket médio",
        "Insights do período, das análises que pedem atenção às que vão bem",
        "DRE do período, da receita bruta ao resultado, com a cascata “Do faturamento ao lucro”",
        "Desempenho por canal: quanto cada canal vendeu e quanto fica com você",
        "Meta de faturamento do mês, com a projeção no ritmo atual",
        "Extrato com busca, filtros e o responsável; relatório em PDF e planilha do Excel",
      ],
      beneficios: [
        "Ver o lucro de verdade, depois de taxas, fretes, impostos, despesas e devoluções",
        "Descobrir qual canal deixa mais dinheiro",
        "Perceber mudanças sem fazer contas: tudo comparado ao período anterior",
      ],
      passos: [
        "Traga a empresa do cadastro.",
        "Lance entradas e saídas — ou deixe o Registro de Vendas, o Processador e o Gestor de Devoluções lançarem.",
        "Escolha o período e acompanhe indicadores, DRE, canais e gráficos.",
        "Confira no extrato e exporte em PDF ou planilha.",
      ],
      nota: "O DRE do Bapell é um relatório gerencial, para acompanhar o negócio; ele não substitui a contabilidade.",
      conecta: ["registro-vendas", "processador", "devolucoes", "empresa"],
      imgs: [
        { src: "financeiro", alt: "Período, meta, seis indicadores e insights do Controle Financeiro" },
        { src: "financeiro-dre", alt: "DRE do período com a cascata do faturamento ao lucro" },
        { src: "financeiro-canais", alt: "Desempenho por canal e fluxo de caixa" },
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
        "Resultado com o relatório por SKU e o antes e o depois das regras",
        "Exportar para o Financeiro: você escolhe qual valor lançar e quem lança",
        "Importações Salvas, para exportar de novo sem reimportar a planilha",
        "Meus Impostos: estimativa do mês atual (ou do mês que você escolher) pela porcentagem da empresa",
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
        { src: "processador-regras", alt: "Intervalos das colunas preenchidos pelos títulos e uma regra de mensalidade" },
        { src: "processador-salvas", alt: "Importações salvas com o selo de exportação" },
        { src: "processador-impostos", alt: "Meus Impostos com a estimativa do mês atual" },
      ],
    },
    {
      id: "calculos", nome: "Central de Cálculos", cat: "ferramentas", icon: "calculos",
      resumo: "144 calculadoras prontas em 15 categorias, com busca, favoritos, cálculos salvos e a fórmula explicada.",
      oque: "Uma central com 144 calculadoras para as contas avulsas do dia a dia: preço e margem, taxas de marketplace e de cartão, frete e cubagem, estimativas de impostos, empréstimos, investimentos, RH, datas e conversões. Cada uma mostra o resultado em detalhe e como é calculado.",
      praquem: "Para quem vende online e precisa fazer contas rápidas sem montar planilha.",
      recursos: [
        "15 categorias, do marketplace e do frete aos impostos, investimentos e datas",
        "Busca por nome, assunto ou sigla (como ROI, DIFAL ou CMV)",
        "Favoritos no alto do menu",
        "Resultado com valor principal e detalhes, mais “Como é calculado”",
        "Cálculos salvos com nome, descrição e etiquetas",
        "Copiar, imprimir e guia “Como usar esta calculadora”",
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
      imgs: [{ src: "calculos", alt: "Calculadora Preço Completo com resultado, favoritos e cálculos salvos" }],
    },
    {
      id: "ean", nome: "Gerador de EAN", cat: "ferramentas", icon: "ean", plus: true,
      resumo: "Números EAN-13 com dígito verificador válido, um por SKU, gerados a partir do CNPJ da empresa — sem repetir.",
      oque: "Gera números EAN-13 a partir do CNPJ da empresa (789 + parte do CNPJ + sequência + dígito verificador), um para cada SKU, e guarda os códigos numa lista com busca. Um número gerado nunca é reaproveitado, nem depois de excluído — nem entre computadores, na rede local.",
      praquem: "Para quem precisa de códigos próprios para controle de estoque e etiquetas, organizados por empresa e por SKU.",
      recursos: [
        "EAN-13 com dígito verificador calculado pelo algoritmo oficial",
        "Um código por SKU em cada empresa; SKU repetido gera aviso",
        "Nunca repete um número, mesmo com o código oculto ou excluído",
        "Os códigos sempre vão no backup, para a numeração não voltar",
        "Empresas do cadastro ou criadas só no gerador, inclusive com CNPJ alfanumérico",
        "Lista com busca por SKU ou EAN e botão Copiar",
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
      imgs: [{ src: "ean", alt: "Gerador de EAN com a lista de códigos gerados por SKU" }],
    },
    {
      id: "lembretes", nome: "Lembretes", cat: "ferramentas", icon: "lembretes",
      resumo: "Prazos, pagamentos e tarefas com data e hora — e um aviso no canto da tela na hora marcada.",
      oque: "Uma agenda de avisos. Cada lembrete tem título, data e hora, empresa, recebedor, valor, quem colocou e observações. A tela mostra o que vence hoje, amanhã e nos próximos dias e, na hora marcada, abre uma janela de aviso — mesmo com o Bapell minimizado na bandeja.",
      praquem: "Para quem precisa lembrar de contas a pagar, coletas, renovações e tarefas de uma ou de várias empresas.",
      recursos: [
        "Selos pela data: vence hoje, amanhã, em 2 ou 3 dias, vencido e concluído",
        "Visões de próximos, vencidos, concluídos e ocultos, com contadores",
        "Janela de aviso por cima de tudo, com Concluir, Abrir e “Lembrar de novo em” 5 min a amanhã",
        "Repetir (mesmos dados, nova data) e Clonar",
        "Lembrete criado pelo sino de uma devolução a caminho",
        "Painel “Próximos lembretes” na tela inicial",
      ],
      beneficios: [
        "Prazos visíveis mesmo fora da tela do Bapell",
        "Adiar um aviso sem esquecer dele",
        "Contas que se repetem com menos digitação",
      ],
      passos: [
        "Clique em Novo lembrete e preencha título e data/hora.",
        "Se quiser, informe empresa, recebedor, valor e observações.",
        "Na hora marcada, conclua, abra ou adie pelo aviso.",
      ],
      nota: "Os avisos aparecem com o Bapell aberto ou na bandeja do Windows. Use os lembretes como apoio, não como o único controle de prazos importantes.",
      conecta: ["devolucoes", "empresa"],
      imgs: [{ src: "lembretes", alt: "Lembretes próximos com selos de vencimento, valores e empresas" }],
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
        "Continua aberto mesmo com a licença vencida",
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
      ],
      nota: "O módulo organiza e guarda as notas. Ele não emite nota fiscal, não transmite à SEFAZ e não tem validade fiscal.",
      conecta: ["empresa", "central"],
      imgs: [{ src: "nf", alt: "Notas Fiscais de uma empresa com número, emitente e responsável" }],
    },
    {
      id: "central", nome: "Central de Acessos", cat: "sistema", icon: "central",
      resumo: "Colaboradores com login e senha própria, módulos e botões protegidos, valores visíveis só onde você quer e o registro de quem fez o quê.",
      oque: "Tudo o que controla quem entra e quem faz o quê, numa tela só, que só o Administrador abre: Usuários (colaboradores, senhas e o Administrador), Módulos Protegidos, Autenticação de Alterações e Registro de Logs.",
      praquem: "Para quem divide o trabalho com outras pessoas e quer que cada uma veja e faça só o que deve — e saber depois quem fez cada coisa.",
      recursos: [
        "Colaboradores com nome, login, senha própria (digitada ou gerada) e permissões; desativar sem perder o histórico",
        "Senha compartilhada do Colaborador, opcional, que pode ser trocada a cada abertura do Bapell",
        "Senha do Administrador com perguntas de segurança para recuperar sem internet",
        "12 módulos que podem pedir senha, cada um com quem pode entrar: todos, só os autorizados ou só o Administrador",
        "Módulo bloqueado não carrega os dados na tela até a senha certa",
        "Autenticação de Alterações: 100 botões em 15 telas que podem pedir usuário e senha antes de agir",
        "Visibilidade por computador: as prévias com valores do Painel só nos computadores que você autorizar",
        "Registro de Logs: 9 dias de quem, quando, em qual computador e o que mudou, com filtros e exportação",
      ],
      beneficios: [
        "Cada pessoa com o próprio acesso, sem dividir a senha do dono",
        "Proteger só o que precisa, módulo por módulo e botão por botão",
        "Saber quem lançou, alterou ou excluiu — com o antes e o depois",
      ],
      passos: [
        "Abra a Central de Acessos pelo menu do Painel inicial.",
        "Crie a senha do Administrador e responda às perguntas de segurança.",
        "Cadastre os colaboradores e as permissões de cada um.",
        "Escolha os módulos e os botões protegidos e acompanhe o Registro de Logs.",
      ],
      nota: "As senhas controlam o acesso pelas telas do Bapell; elas não criptografam os arquivos do computador. Senhas e respostas nunca entram no registro.",
      conecta: ["rede", "financeiro", "acoes-massa", "nf"],
      imgs: [
        { src: "seguranca-usuarios", alt: "Colaboradores com login, senha própria e permissões" },
        { src: "seguranca-modulos", alt: "Módulos protegidos com quem pode entrar em cada um" },
        { src: "seguranca-logs", alt: "Registro de Logs com usuário, computador, módulo e resultado" },
        { src: "seguranca-logs-detalhe", alt: "Detalhes de um evento do Registro de Logs" },
        { src: "seguranca-autenticacao", alt: "Autenticação de Alterações: botões que pedem usuário e senha" },
      ],
    },
    {
      id: "rede", nome: "Rede local — 2 computadores", cat: "sistema", icon: "rede",
      resumo: "Use o Bapell em dois computadores com os mesmos dados, sem internet entre eles. Cada computador a mais custa R$ 300,00.",
      oque: "Um computador é o principal: guarda o banco de dados e atende os outros pela rede local, de forma cifrada. O segundo é ativado com uma chave secundária gerada no próprio principal. Do terceiro em diante, cada computador é liberado por um código para chave enviado pela Bapell.",
      praquem: "Para quem tem um computador no escritório e outro no estoque, ou uma pequena equipe trabalhando ao mesmo tempo.",
      recursos: [
        "Licença para 2 computadores: o principal e um secundário",
        "Chave secundária gerada no principal a partir do código do outro computador",
        "Do 3º computador em diante: R$ 300,00 cada, sem número máximo",
        "Mesmos produtos, vendas, financeiro, devoluções, notas, lembretes, EAN e usuários",
        "Os dois trabalham ao mesmo tempo; o mesmo registro alterado nos dois vai para Conflitos, sem perda",
        "Sem conexão com o principal, o outro fica só para consulta — nada é gravado pela metade",
        "Backups automáticos no principal, ao abrir e a cada 24 horas, e cópia para outra pasta",
        "Revogar um computador libera a vaga; o secundário acompanha o plano e o vencimento do principal",
      ],
      beneficios: [
        "Duas pessoas no Bapell, com os mesmos números",
        "Sem servidor na internet e sem mensalidade por computador",
        "Crescer a equipe comprando só os computadores que precisar",
      ],
      passos: [
        "No principal, em Ajuda › Rede Local, use este computador como principal.",
        "No segundo computador, clique em Ativar com chave secundária e copie o código.",
        "No principal, gere a chave com esse código.",
        "Cole a chave no segundo computador e conecte.",
      ],
      nota: "O principal precisa estar ligado e com o Bapell aberto. Os dados ficam nos seus computadores: não é serviço de nuvem.",
      conecta: ["central", "ajuda", "ean"],
      imgs: [
        { src: "computadores", alt: "Computadores e chaves adicionais: autorizados, ativados e vagas" },
      ],
    },
    {
      id: "ajuda", nome: "Central de Ajuda e backup", cat: "sistema", icon: "ajuda",
      resumo: "16 tutoriais interativos, guia dos módulos, links oficiais de taxas, backup com as fotos e a validade da sua licença.",
      oque: "Tudo o que ajuda a usar o Bapell, dentro dele. Cada tela tem um tutorial interativo que destaca o elemento de cada passo e abre sozinho na primeira visita. A Central reúne esses tutoriais, um guia dos módulos, links oficiais de taxas dos marketplaces, o backup, a rede local, o diagnóstico de erros e a sua licença.",
      praquem: "Para quem está começando, para treinar alguém da equipe numa tela específica e para cuidar do backup, da licença e dos computadores.",
      recursos: [
        "16 tutoriais interativos, um por tela, com progresso e opção de rever",
        "Backup em arquivo; com as fotos dos produtos, sai em .zip",
        "Restaurar escolhendo o que importar — e se valem os dados do backup ou os do computador",
        "Validade da licença, troca de chave e upgrade com o valor pago descontado",
        "Gerenciar computadores e gerar a chave de um computador novo",
        "Diagnóstico de problemas: relatório de erros para enviar ao suporte",
        "Abrir o Bapell junto com o Windows",
      ],
      beneficios: [
        "Aprender cada tela no próprio aplicativo",
        "Backup e licença à mão, mesmo com a licença vencida",
        "Mudar de plano sem reinstalar e sem perder dados",
      ],
      passos: [
        "Clique em Ajuda, no rodapé do menu lateral.",
        "Abra a seção que quiser.",
        "Em Tutoriais, clique em Ver agora ou Rever.",
      ],
      nota: "O backup é manual e fica com você: não é automático nem vai para a nuvem, e o arquivo não tem senha. Guarde-o em local seguro.",
      conecta: ["rede", "abas"],
      imgs: [{ src: "ajuda", alt: "Tutoriais interativos na Central de Ajuda, com o progresso de cada tela" }],
    },
    {
      id: "abas", nome: "Painel, abas e temas", cat: "sistema", icon: "abas",
      resumo: "Prévias do mês no painel, várias telas abertas em abas, três temas e um menu com os módulos na ordem que você quiser.",
      oque: "O Painel inicial mostra as lojas e três prévias que você escolhe entre cinco — Controle Financeiro, Gestor de Devoluções, Lembretes, Processador e Registro de Vendas. As telas abrem em abas, como num navegador. E a interface fica do seu jeito: três temas, menu recolhível e módulos reordenados ou ocultos.",
      praquem: "Para quem alterna entre várias telas durante o dia e quer o programa com a cara da própria rotina.",
      recursos: [
        "Três prévias no Painel, cada uma com a sua empresa",
        "Abrir qualquer item do menu em nova aba (botão direito, botão do meio ou Ctrl+clique)",
        "Fixar, duplicar e fechar abas; as fixadas reabrem quando o Bapell inicia",
        "Três temas: claro, escuro e dark absoluto",
        "Menu lateral recolhível; módulos reordenados ou ocultos",
        "Ocultar lojas sem apagar os produtos",
      ],
      beneficios: [
        "O resumo do mês assim que o Bapell abre",
        "Várias telas abertas sem perder o que está preenchido",
        "Um menu só com o que você usa",
      ],
      passos: [
        "No Painel, use o lápis para escolher as três prévias.",
        "Clique com o botão direito num item do menu e escolha Abrir em nova aba.",
        "Escolha o tema no cabeçalho.",
      ],
      conecta: ["plataformas", "ajuda", "central"],
      imgs: [
        { src: "abas", alt: "Barra de abas do Bapell com várias telas abertas" },
        { src: "painel-claro", alt: "Painel inicial no tema claro" },
      ],
    },
  ];

  const porId = (id) => MODULOS.find((m) => m.id === id);
  const svg = (p, cls) => `<svg class="${cls || "ico"}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;

  /* ══════════════════════════════════════
     2. CALCULADORA DA ETIQUETA
     Preço = (custo + frete [+ taxa fixa]) ÷ (1 − (comissão + imposto + margem)).
     A taxa fixa só entra quando o preço fica até R$ 79,00 — a regra do app.
     ══════════════════════════════════════ */
  const LIMITE_TAXA_FIXA = 79;
  const lerDinheiro = (v) => {
    const s = String(v || "").replace(/[^\d,.-]/g, "").replace(/\.(?=\d{3}(\D|$))/g, "").replace(",", ".");
    const n = parseFloat(s);
    return Number.isFinite(n) && n >= 0 ? n : 0;
  };
  const fmtDinheiro = (n) => n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const etq = $("#etiqueta");
  if (etq) {
    const campos = { custo: $("#custo"), frete: $("#frete"), taxaFixa: $("#taxaFixa") };
    const deslizes = { comissao: $("#comissao"), imposto: $("#imposto"), margem: $("#margem") };
    const saida = {
      preco: $("#preco"), lucro: $("#lucro"), margemReal: $("#margemReal"), taxaLinha: $("#taxaLinha"),
      warn: $("#warn"), bar: $("#bar"), legenda: $("#barLegenda"),
    };
    let ultimoPreco = 0;
    let animando = 0;

    const mostrarPreco = (alvo) => {
      cancelAnimationFrame(animando);
      if (reduzir || !ultimoPreco) { saida.preco.textContent = BRL.format(alvo); ultimoPreco = alvo; return; }
      const de = ultimoPreco, t0 = performance.now(), dur = 380;
      const passo = (t) => {
        const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
        saida.preco.textContent = BRL.format(de + (alvo - de) * e);
        if (k < 1) animando = requestAnimationFrame(passo);
      };
      animando = requestAnimationFrame(passo);
      ultimoPreco = alvo;
    };

    // Enquanto o campo mostra o valor de fábrica, vale o valor exato (data-exato),
    // como o app faz: exibe o custo total com 2 casas e calcula com todas.
    const valorCampo = (el) => (el.dataset.exato && el.value === el.defaultValue ? Number(el.dataset.exato) : lerDinheiro(el.value));
    const calcular = () => {
      const custo = valorCampo(campos.custo);
      const frete = valorCampo(campos.frete);
      const tf = valorCampo(campos.taxaFixa);
      const c = Number(deslizes.comissao.value), i = Number(deslizes.imposto.value), m = Number(deslizes.margem.value);
      Object.entries(deslizes).forEach(([k, el]) => {
        const out = $("#" + k + "Out");
        if (out) out.textContent = PCT.format(Number(el.value)) + "%";
        el.style.setProperty("--pos", ((el.value - el.min) / (el.max - el.min)) * 100 + "%");
      });
      const soma = c + i + m;
      if (soma >= 100) {
        saida.warn.hidden = false;
        saida.preco.textContent = "—";
        saida.lucro.textContent = "—";
        saida.margemReal.textContent = "";
        saida.taxaLinha.textContent = "";
        saida.bar.innerHTML = "";
        ultimoPreco = 0;
        return;
      }
      saida.warn.hidden = true;
      const div = 1 - soma / 100;
      let preco = (custo + frete) / div;
      let comTaxa = false;
      if (tf > 0 && preco <= LIMITE_TAXA_FIXA) { preco = (custo + frete + tf) / div; comTaxa = true; }
      const partes = [
        { k: "custo", nome: "Custo", v: custo },
        { k: "frete", nome: "Frete", v: frete },
        { k: "comissao", nome: "Comissão", v: preco * c / 100 },
        { k: "imposto", nome: "Imposto", v: preco * i / 100 },
      ];
      if (comTaxa) partes.push({ k: "taxa", nome: "Taxa fixa", v: tf });
      const lucro = preco * m / 100;
      partes.push({ k: "lucro", nome: "Lucro", v: lucro });
      mostrarPreco(preco);
      saida.lucro.textContent = BRL.format(lucro);
      saida.margemReal.textContent = preco > 0 ? PCT.format((lucro / preco) * 100) + "% do preço" : "";
      saida.taxaLinha.textContent = tf > 0
        ? (comTaxa ? "Taxa fixa de " + BRL.format(tf) + " incluída: o preço ficou até R$ 79,00." : "Taxa fixa não entra: o preço passou de R$ 79,00.")
        : "";
      const total = partes.reduce((s, p) => s + p.v, 0) || 1;
      saida.bar.innerHTML = partes.filter((p) => p.v > 0).map((p) =>
        `<span class="barra__seg barra__seg--${p.k}" style="flex-grow:${(p.v / total).toFixed(4)}" title="${p.nome}: ${BRL.format(p.v)}"></span>`).join("");
      saida.legenda.innerHTML = partes.filter((p) => p.v > 0).map((p) =>
        `<li><span class="ponto ponto--${p.k}"></span>${p.nome} <b>${BRL.format(p.v)}</b></li>`).join("");
    };

    Object.values(campos).forEach((el) => {
      el.addEventListener("input", calcular);
      el.addEventListener("focus", () => el.select());
      el.addEventListener("blur", () => { el.value = fmtDinheiro(lerDinheiro(el.value)); calcular(); });
    });
    Object.values(deslizes).forEach((el) => el.addEventListener("input", calcular));
    calcular();
  }

  /* ══════════════════════════════════════
     3. NAVEGAÇÃO
     ══════════════════════════════════════ */
  const nav = $("#nav");
  const menuBtn = $("#navMenu");
  const menu = $("#menuMobile");
  const barra = $("#barraCompra");
  const planos = $("#planos");
  const final = $("#comecar");

  const fecharMenu = () => {
    if (!menu || menu.hidden) return;
    menu.hidden = true;
    menuBtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-aberto");
  };
  if (menuBtn && menu) {
    menuBtn.addEventListener("click", () => {
      const abrir = menu.hidden;
      menu.hidden = !abrir;
      menuBtn.setAttribute("aria-expanded", String(abrir));
      document.body.classList.toggle("menu-aberto", abrir);
      if (abrir) { const a = $("a", menu); if (a) a.focus(); }
    });
    $$("a", menu).forEach((a) => a.addEventListener("click", fecharMenu));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") fecharMenu(); });
    window.addEventListener("resize", () => { if (window.innerWidth > 960) fecharMenu(); });
  }

  // Link da seção visível no menu
  const linksNav = $$(".nav__links a[href^='#']");
  const secoesNav = linksNav.map((a) => $(a.getAttribute("href"))).filter(Boolean);

  let pendente = false;
  const aoRolar = () => {
    pendente = false;
    const y = window.scrollY, vh = window.innerHeight;
    if (nav) nav.classList.toggle("nav--rolou", y > 8);
    let atual = null;
    secoesNav.forEach((s) => { if (s.getBoundingClientRect().top < vh * 0.4) atual = s.id; });
    linksNav.forEach((a) => a.classList.toggle("ativo", a.getAttribute("href") === "#" + atual));
    if (barra && planos) {
      const pr = planos.getBoundingClientRect();
      const fr = final ? final.getBoundingClientRect() : { top: Infinity };
      const mostrar = y > vh * 0.8 && !(pr.top < vh * 0.85 && pr.bottom > vh * 0.15) && fr.top > vh * 0.9;
      barra.classList.toggle("barra--visivel", mostrar);
      barra.setAttribute("aria-hidden", String(!mostrar));
      $$("a", barra).forEach((a) => (a.tabIndex = mostrar ? 0 : -1));
    }
  };
  window.addEventListener("scroll", () => { if (!pendente) { pendente = true; requestAnimationFrame(aoRolar); } }, { passive: true });
  window.addEventListener("resize", () => requestAnimationFrame(aoRolar), { passive: true });
  aoRolar();

  /* ══════════════════════════════════════
     4. COMO FUNCIONA — a tela acompanha a etapa
     ══════════════════════════════════════ */
  const passos = $$(".passo");
  const telaComo = $("#comoTela");
  const tituloComo = $("#comoTitulo");
  if (passos.length && telaComo && "IntersectionObserver" in window) {
    const ativar = (p) => {
      if (p.classList.contains("passo--ativo")) return;
      passos.forEach((x) => x.classList.toggle("passo--ativo", x === p));
      const src = "img/app/" + p.dataset.tela + ".webp";
      if (tituloComo) tituloComo.textContent = p.dataset.titulo || "";
      if (reduzir) { telaComo.src = src; telaComo.alt = p.dataset.alt || ""; return; }
      telaComo.classList.add("troca");
      setTimeout(() => {
        telaComo.src = src;
        telaComo.alt = p.dataset.alt || "";
        telaComo.onload = () => telaComo.classList.remove("troca");
        setTimeout(() => telaComo.classList.remove("troca"), 400);
      }, 160);
    };
    const obs = new IntersectionObserver((ents) => {
      ents.forEach((e) => { if (e.isIntersecting) ativar(e.target); });
    }, { rootMargin: "-45% 0px -45% 0px" });
    passos.forEach((p) => obs.observe(p));
    // pré-carrega as telas
    window.addEventListener("load", () => passos.forEach((p) => { const i = new Image(); i.src = "img/app/" + p.dataset.tela + ".webp"; }));
  }

  /* ══════════════════════════════════════
     5. EQUIPE — abas das telas
     ══════════════════════════════════════ */
  const abasEq = $$("[role=tab][data-tela-eq]");
  const telaEq = $("#equipeTela");
  if (abasEq.length && telaEq) {
    const escolher = (aba, foco) => {
      abasEq.forEach((a) => {
        const sim = a === aba;
        a.setAttribute("aria-selected", String(sim));
        a.tabIndex = sim ? 0 : -1;
      });
      telaEq.src = "img/app/" + aba.dataset.telaEq + "-p.webp"; // a versão grande abre no "ampliar"
      telaEq.alt = aba.dataset.alt || "";
      const leg = $("#equipeLegenda");
      if (leg) leg.textContent = aba.dataset.legenda || "";
      if (foco) aba.focus();
    };
    abasEq.forEach((a, i) => {
      a.addEventListener("click", () => escolher(a));
      a.addEventListener("keydown", (e) => {
        const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
        if (!d) return;
        e.preventDefault();
        escolher(abasEq[(i + d + abasEq.length) % abasEq.length], true);
      });
    });
  }

  /* ══════════════════════════════════════
     6. VÍDEO
     ══════════════════════════════════════ */
  const video = $("#featureVideo");
  if (video) {
    const tela = $("#demoScreen");
    const play = $("#demoPlay");
    const som = $("#soundBtn");
    const cheia = $("#demoFullscreen");
    const vel = $$("[data-speed]");
    let velocidade = 2;
    const aplicarVel = (v) => {
      velocidade = v;
      try { video.playbackRate = v; } catch (e) {}
      vel.forEach((b) => b.setAttribute("aria-pressed", String(Number(b.dataset.speed) === v)));
    };
    const tocar = () => { const p = video.play(); if (p && p.catch) p.catch(() => {}); };
    video.addEventListener("play", () => { aplicarVel(velocidade); tela.classList.add("tocando"); });
    video.addEventListener("pause", () => tela.classList.remove("tocando"));
    video.addEventListener("loadeddata", () => aplicarVel(velocidade));
    if (play) play.addEventListener("click", (e) => { e.stopPropagation(); tocar(); });
    tela.addEventListener("click", (e) => {
      if (e.target.closest(".video__ctl")) return;
      if (video.paused) tocar(); else video.pause();
    });
    vel.forEach((b) => b.addEventListener("click", (e) => { e.stopPropagation(); aplicarVel(Number(b.dataset.speed)); }));
    if (som) som.addEventListener("click", (e) => {
      e.stopPropagation();
      video.muted = !video.muted;
      som.setAttribute("aria-pressed", String(!video.muted));
      som.setAttribute("aria-label", video.muted ? "Ativar o som" : "Desativar o som");
      if (!video.muted && video.paused) tocar();
    });
    if (cheia) cheia.addEventListener("click", async (e) => {
      e.stopPropagation();
      try {
        if (document.fullscreenElement) await document.exitFullscreen();
        else if (tela.requestFullscreen) await tela.requestFullscreen();
        else if (video.webkitEnterFullscreen) video.webkitEnterFullscreen();
      } catch (err) {}
    });
    // Começa sozinho, sem som, quando aparece na tela (não para quem pede menos movimento)
    if (!reduzir && "IntersectionObserver" in window) {
      let pausaAuto = false; // pausa feita pela rolagem (não conta como "a pessoa parou")
      new IntersectionObserver((ents) => {
        ents.forEach((en) => {
          if (en.isIntersecting && en.intersectionRatio > 0.5) { if (video.paused && !video.dataset.parou) tocar(); }
          else if (!video.paused) { pausaAuto = true; video.pause(); }
        });
      }, { threshold: [0, 0.5] }).observe(tela);
      video.addEventListener("pause", () => {
        if (pausaAuto) { pausaAuto = false; return; }
        if (document.visibilityState === "visible") video.dataset.parou = "1";
      });
      video.addEventListener("play", () => { delete video.dataset.parou; });
    }
  }

  /* ══════════════════════════════════════
     7. MÓDULOS — grade, filtro e apresentação
     ══════════════════════════════════════ */
  const grade = $("#featuresGrid");
  const modal = $("#modModal");
  const painel = $("#modPainel");
  const conteudo = $("#modConteudo");
  let atual = -1;
  let ultimoFoco = null;

  if (grade) {
    grade.innerHTML = MODULOS.map((m) => `
      <li class="mod${m.plus ? " mod--plus" : ""}" data-cat="${m.cat}" data-plus="${m.plus ? 1 : 0}">
        <button type="button" class="mod__btn" data-mod="${m.id}">
          <span class="mod__topo">
            <span class="mod__ico">${svg(ICONES[m.icon])}</span>
            ${m.plus ? '<span class="selo-plus" title="Nos planos Pro e Platinum">Plus</span>' : ""}
          </span>
          <span class="mod__nome">${esc(m.nome)}</span>
          <span class="mod__resumo">${esc(m.resumo)}</span>
          <span class="mod__ver">Ver por dentro</span>
        </button>
      </li>`).join("");

    const filtros = $$(".filtro");
    const contagem = $("#modContagem");
    const filtrar = (f) => {
      let n = 0;
      $$(".mod", grade).forEach((li) => {
        const sim = f === "todos" || (f === "plus" ? li.dataset.plus === "1" : li.dataset.cat === f);
        li.hidden = !sim;
        if (sim) n++;
      });
      filtros.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.filtro === f)));
      if (contagem) contagem.textContent = n + (n === 1 ? " módulo" : " módulos");
    };
    filtros.forEach((b) => b.addEventListener("click", () => filtrar(b.dataset.filtro)));
    filtrar("todos");

    grade.addEventListener("click", (e) => {
      const b = e.target.closest("[data-mod]");
      if (b) abrirModulo(b.dataset.mod, true);
    });
  }

  const montar = (m) => {
    const imgs = m.imgs.map((im, i) => `
      <button type="button" class="mm__mini${i === 0 ? " ativa" : ""}" data-i="${i}" aria-label="Ver tela: ${esc(im.alt)}">
        <img src="img/app/${im.src}-p.webp" alt="" width="760" height="475" loading="lazy" decoding="async">
      </button>`).join("");
    const liga = (m.conecta || []).map(porId).filter(Boolean).map((x) =>
      `<button type="button" class="mm__liga" data-ir="${x.id}">${svg(ICONES[x.icon])}${esc(x.nome)}</button>`).join("");
    return `
      <header class="mm__cab">
        <span class="mm__ico">${svg(ICONES[m.icon])}</span>
        <div>
          <p class="mm__cat">${esc(CATEGORIAS[m.cat])}${m.plus ? ' <span class="selo-plus">Plus — Pro e Platinum</span>' : ""}</p>
          <h2 id="modTitulo">${esc(m.nome)}</h2>
          <p class="mm__resumo">${esc(m.resumo)}</p>
        </div>
      </header>
      <figure class="mm__tela">
        <button type="button" class="mm__ampliar" aria-label="Ampliar a tela">
          <img id="mmPrincipal" src="img/app/${m.imgs[0].src}.webp" alt="${esc(m.imgs[0].alt)}" width="1600" height="1000" decoding="async">
        </button>
        <figcaption id="mmLegenda">${esc(m.imgs[0].alt)}</figcaption>
        ${m.imgs.length > 1 ? `<div class="mm__minis">${imgs}</div>` : ""}
      </figure>
      <div class="mm__grade">
        <section>
          <h3>O que faz</h3>
          <p>${esc(m.oque)}</p>
          <h3>Para quem é</h3>
          <p>${esc(m.praquem)}</p>
          <h3>Como funciona</h3>
          <ol class="mm__passos">${m.passos.map((p) => `<li>${esc(p)}</li>`).join("")}</ol>
        </section>
        <section>
          <h3>Principais recursos</h3>
          <ul class="mm__lista">${m.recursos.map((r) => `<li>${esc(r)}</li>`).join("")}</ul>
          <h3>O que você ganha</h3>
          <ul class="mm__ganhos">${m.beneficios.map((r) => `<li>${esc(r)}</li>`).join("")}</ul>
        </section>
      </div>
      ${m.nota ? `<p class="mm__nota">${esc(m.nota)}</p>` : ""}
      ${liga ? `<div class="mm__ligacoes"><h3>Conversa com</h3><div>${liga}</div></div>` : ""}
      ${m.plus ? `<p class="mm__plano">Este módulo está nos planos <b>Pro</b> e <b>Platinum</b>. <a href="#planos" data-fechar-planos>Ver os planos</a></p>` : ""}`;
  };

  function abrirModulo(id, historico) {
    const i = MODULOS.findIndex((m) => m.id === id);
    if (i < 0 || !modal) return;
    atual = i;
    const m = MODULOS[i];
    if (modal.hidden) ultimoFoco = document.activeElement;
    conteudo.innerHTML = montar(m);
    $("#modPos").textContent = (i + 1) + " de " + MODULOS.length;
    $("#modRolagem").scrollTop = 0;
    const principal = $("#mmPrincipal", conteudo);
    $$(".mm__mini", conteudo).forEach((b) => b.addEventListener("click", () => {
      const im = m.imgs[Number(b.dataset.i)];
      principal.src = "img/app/" + im.src + ".webp";
      principal.alt = im.alt;
      $("#mmLegenda", conteudo).textContent = im.alt;
      $$(".mm__mini", conteudo).forEach((x) => x.classList.toggle("ativa", x === b));
    }));
    $(".mm__ampliar", conteudo).addEventListener("click", () => abrirZoom(principal.src, principal.alt));
    $$("[data-ir]", conteudo).forEach((b) => b.addEventListener("click", () => abrirModulo(b.dataset.ir, true)));
    const fp = $("[data-fechar-planos]", conteudo);
    if (fp) fp.addEventListener("click", (e) => { e.preventDefault(); fecharModulo(true); setTimeout(() => planos.scrollIntoView({ behavior: reduzir ? "auto" : "smooth" }), 30); });
    if (modal.hidden) {
      modal.hidden = false;
      document.body.classList.add("modal-aberto");
      requestAnimationFrame(() => modal.classList.add("aberto"));
    }
    painel.focus();
    const hash = "#modulo/" + id;
    if (historico && location.hash !== hash) history.pushState({ modulo: id }, "", hash);
  }

  function fecharModulo(trocarHash) {
    if (!modal || modal.hidden) return;
    modal.classList.remove("aberto");
    document.body.classList.remove("modal-aberto");
    setTimeout(() => { modal.hidden = true; conteudo.innerHTML = ""; }, reduzir ? 0 : 180);
    if (trocarHash !== false && location.hash.indexOf("#modulo/") === 0) history.pushState({}, "", location.pathname + location.search + "#modulos");
    if (ultimoFoco && ultimoFoco.focus) ultimoFoco.focus();
  }

  if (modal) {
    $$("[data-fechar]", modal).forEach((b) => b.addEventListener("click", () => fecharModulo()));
    $("#modAnterior").addEventListener("click", () => abrirModulo(MODULOS[(atual - 1 + MODULOS.length) % MODULOS.length].id, true));
    $("#modProximo").addEventListener("click", () => abrirModulo(MODULOS[(atual + 1) % MODULOS.length].id, true));
    document.addEventListener("keydown", (e) => {
      if (modal.hidden || !zoom.hidden) return;
      if (e.key === "Escape") fecharModulo();
      else if (e.key === "ArrowRight" && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) $("#modProximo").click();
      else if (e.key === "ArrowLeft" && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) $("#modAnterior").click();
      else if (e.key === "Tab") {
        const foc = $$("button, a[href], [tabindex='0']", painel).filter((x) => x.offsetParent !== null);
        if (!foc.length) return;
        const pri = foc[0], ult = foc[foc.length - 1];
        if (e.shiftKey && document.activeElement === pri) { e.preventDefault(); ult.focus(); }
        else if (!e.shiftKey && document.activeElement === ult) { e.preventDefault(); pri.focus(); }
      }
    });
    const lerHash = () => {
      const m = /^#modulo\/([\w-]+)$/.exec(location.hash);
      if (m && porId(m[1])) abrirModulo(m[1], false);
      else fecharModulo(false);
    };
    window.addEventListener("popstate", lerHash);
    lerHash();
  }

  // Ampliar tela
  const zoom = $("#zoom");
  const zoomImg = $("#zoomImg");
  function abrirZoom(src, alt) {
    zoomImg.src = src; zoomImg.alt = alt || "";
    zoom.hidden = false;
    requestAnimationFrame(() => zoom.classList.add("aberto"));
    $("#zoomFechar").focus();
  }
  function fecharZoom() {
    zoom.classList.remove("aberto");
    setTimeout(() => { zoom.hidden = true; }, reduzir ? 0 : 160);
    const b = $(".mm__ampliar");
    if (b) b.focus();
  }
  if (zoom) {
    zoom.addEventListener("click", fecharZoom);
    document.addEventListener("keydown", (e) => { if (!zoom.hidden && e.key === "Escape") { e.stopPropagation(); fecharZoom(); } }, true);
  }
  // Telas das seções que também ampliam
  $$("[data-ampliar]").forEach((b) => b.addEventListener("click", () => { const im = $("img", b); abrirZoom(im.src.replace("-p.webp", ".webp"), im.alt); }));

  /* ══════════════════════════════════════
     8. PLANOS — prazo escolhido (no celular mostra só os do prazo)
     ══════════════════════════════════════ */
  const prazoBtns = $$("[data-prazo-btn]");
  const listaPlanos = $("#plans");
  const tabela = $("#cmp");
  if (prazoBtns.length && listaPlanos) {
    const escolher = (p, foco) => {
      listaPlanos.dataset.prazo = p;
      if (tabela) tabela.dataset.prazo = p;
      prazoBtns.forEach((b) => {
        const sim = b.dataset.prazoBtn === p;
        b.setAttribute("aria-checked", String(sim));
        b.tabIndex = sim ? 0 : -1;
        if (sim && foco) b.focus();
      });
    };
    prazoBtns.forEach((b, i) => {
      b.addEventListener("click", () => escolher(b.dataset.prazoBtn));
      b.addEventListener("keydown", (e) => {
        if (!/Arrow(Left|Right|Up|Down)/.test(e.key)) return;
        e.preventDefault();
        escolher(prazoBtns[(i + 1) % prazoBtns.length].dataset.prazoBtn, true);
      });
    });
  }

  // Ano no rodapé
  const ano = $("#ano");
  if (ano) ano.textContent = String(new Date().getFullYear());

  document.documentElement.classList.add("pronto");
})();
