/* Trilha "Programação Web: do zero à loja virtual".
 * Soma estas aulas à lista AULAS (aulas.js). Carregue DEPOIS de aulas.js.
 * Cada aula tem passos (conteúdo) e perguntas (quiz que gera a nota de 0 a 10), como as demais. */
(function () {
  if (typeof AULAS === 'undefined') return;
  var NOVAS = [];
  var contQ = 0;

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  // § vira crase e €{ vira ${ (para escrever código com template string dentro de um template string)
  function deco(s) { return s.replace(/§/g, '`').replace(/€\{/g, '${'); }
  function H(ico, t) { return '<h3 style="margin-bottom:10px;color:var(--accent)">' + ico + ' ' + t + '</h3>'; }
  function box(cor, html) {
    var c = { azul: ['79,142,247', 'var(--accent)'], verde: ['52,211,153', '#34d399'], amarelo: ['251,191,36', '#fbbf24'], roxo: ['124,106,247', '#a78bfa'], vermelho: ['248,113,113', '#f87171'] }[cor];
    return '<div style="margin-top:14px;padding:12px;background:rgba(' + c[0] + ',.09);border-left:3px solid ' + c[1] + ';border-radius:6px;font-size:13px;line-height:1.8">' + html + '</div>';
  }
  function caderno(linhas) { return box('azul', '<strong>📓 Copie no caderno:</strong><br>' + linhas.join('<br>')); }
  function analogia(t) { return box('roxo', '<strong>💡 Analogia:</strong> ' + t); }
  function atencao(t) { return box('amarelo', '<strong>⚠️ Atenção:</strong> ' + t); }
  // marcador: o conteúdo da caixa vai para a fase de prática (ver A)
  function faca(t) { return '<!--FACA-->' + t + '<!--/FACA-->'; }
  function preveja(t) { return box('roxo', '<strong>🧠 Antes de rodar, preveja:</strong> ' + t + '<br><em>Escreva sua resposta no caderno e só depois teste.</em>'); }
  function code(c, titulo) {
    return (titulo ? '<div style="margin-top:12px;font-size:12px;color:var(--muted)">' + titulo + '</div>' : '') +
      '<pre style="margin-top:6px;padding:12px 14px;background:#0b0d13;border:1px solid var(--border);border-radius:8px;font-family:Consolas,\'Courier New\',monospace;font-size:12.5px;line-height:1.6;overflow-x:auto;white-space:pre;color:#d9e3ee">' + esc(deco(c)) + '</pre>';
  }
  function lista(itens) {
    return '<div style="display:grid;gap:8px;margin-top:12px">' + itens.map(function (i) {
      return '<div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">' + i + '</div>';
    }).join('') + '</div>';
  }
  function P(ico, titulo) { // passo: título + partes
    var partes = Array.prototype.slice.call(arguments, 2).map(function (x) { return deco(x); });
    return H(ico, titulo) + partes.join('\n');
  }
  // Pergunta: a certa vem primeiro; a posição dela varia de pergunta em pergunta
  function Q(pergunta, certa) {
    var erradas = Array.prototype.slice.call(arguments, 2);
    var ops = erradas.map(function (t) { return { texto: esc(deco(t)), correta: false }; });
    ops.splice(contQ++ % (ops.length + 1), 0, { texto: esc(deco(certa)), correta: true });
    return { pergunta: esc(deco(pergunta)), opcoes: ops };
  }
  // Teste de nivelamento: aula só de quiz. Nota 7 ou mais = o aluno pode pular o módulo.
  function N(id, modulo, titulo, perguntas) {
    NOVAS.push({ id: id, titulo: titulo, descricao: 'Teste de nivelamento do módulo ' + modulo + ': nota 7 ou mais = você pode pular este módulo', icone: '🎯', passos: [], perguntas: perguntas, pratica: '' });
  }
  function A(id, titulo, descricao, icone, passos, perguntas) {
    var coletadas = [];
    var limpos = passos.map(function (p) {
      return p.replace(/<!--FACA-->([\s\S]*?)<!--\/FACA-->/g, function (_, txt) { coletadas.push(txt); return ''; });
    });
    NOVAS.push({ id: id, titulo: titulo, descricao: descricao, icone: icone, passos: limpos, perguntas: perguntas, pratica: praticaHtml(id, coletadas) });
  }

  // Prática de cada aula (aparece DEPOIS do quiz): tarefas para marcar + um desafio.
  // As caixas "Faça agora" do conteúdo são movidas para cá automaticamente, como primeiras tarefas.
  var PRAT = {
    56: { tarefas: ['Abra o site da sua escola, aperte F12, vá em <strong>Elements</strong> e encontre o texto de um título. Anote no caderno qual tag ele usa.', 'No <strong>Console</strong>, digite três contas: <code>2 + 2</code>, <code>10 * 5</code> e <code>"Oi" + " turma"</code>. Anote o que apareceu.', 'Crie a pasta <code>projeto-loja</code> com três arquivos vazios: <code>index.html</code>, <code>estilo.css</code> e <code>script.js</code>.'],
      desafio: 'Explique no caderno, com a <strong>sua analogia</strong> (não a da aula), a diferença entre HTML, CSS e JavaScript. Mostre ao professor.' },
    57: { tarefas: ['Crie uma página <code>index.html</code> com o esqueleto completo (digite, não cole) e seu nome em um <code>h1</code>.', 'Acrescente: um parágrafo sobre você, uma lista com 3 hobbies e um link para o site da escola.', 'Acrescente uma tabela com 3 produtos (nome e preço), com linha de cabeçalho.'],
      desafio: 'Reorganize a página usando <code>header</code>, <code>main</code> e <code>footer</code>. Depois escreva um comentário em cada parte explicando o que ela contém.' },
    58: { tarefas: ['Monte o formulário de cadastro de produto: nome, preço, categoria (com 3 opções) e botão Salvar, cada campo com <code>label</code> e <code>id</code>.', 'Teste: o que acontece se você digitar letras no campo <code>type="number"</code>? E no campo <code>type="password"</code>?', 'Troque os <code>id</code> por nomes ruins (ex.: <code>x1</code>) e anote por que isso atrapalharia o JavaScript depois.'],
      desafio: 'Acrescente ao formulário um campo "quantidade em estoque" e uma caixa "produto em promoção" (checkbox), mantendo ids claros.' },
    59: { tarefas: ['Crie o <code>estilo.css</code>, ligue na página e dê fundo escuro e texto claro ao <code>body</code>.', 'Estilize o botão: cor de fundo, <code>padding</code>, cantos arredondados e uma cor diferente em <code>:hover</code>.', 'Coloque 4 cards dentro de uma div com <code>display: grid</code> e <code>gap</code>. Redimensione a janela e veja as colunas se ajustarem.'],
      desafio: 'Faça o menu de navegação (3 links) usando <code>display: flex</code> com <code>justify-content: space-between</code>. Explique cada linha do CSS que você escreveu.' },
    60: { tarefas: ['No console, crie as variáveis <code>produto</code> e <code>preco</code> e mostre as duas com <code>console.log</code>.', 'Descubra o <code>typeof</code> de <code>"10"</code>, <code>10</code> e <code>true</code>. Anote os três resultados.', 'Teste <code>"10" + 5</code> e <code>Number("10") + 5</code>. Escreva com suas palavras por que o resultado muda.'],
      desafio: 'Crie as variáveis <code>precoUnitario</code> (texto, "12.5") e <code>quantidade</code> (texto, "4") e calcule o total <strong>correto</strong>, convertendo antes.' },
    61: { tarefas: ['Escreva, com crases, a frase: <em>"O produto Caneta custa R$ 3.5 e restam 20 unidades"</em>, usando variáveis.', 'Crie a variável <code>nota</code> e um <code>if / else if / else</code> que escreva Aprovado, Recuperação ou Reprovado. Teste com 8, 6 e 3.', 'Valide o cadastro: se o nome estiver vazio <strong>ou</strong> o preço for menor ou igual a 0, escreva "Dados inválidos".'],
      desafio: 'Faça um cálculo de desconto: se o total for maior que 100, aplique 10% de desconto; senão, não aplique. Mostre o valor final com 2 casas decimais (<code>toFixed(2)</code>).' },
    62: { tarefas: ['Crie um array com 5 produtos e mostre o primeiro, o último e a quantidade (<code>length</code>).', 'Crie um objeto <code>produto</code> com id, nome, preço e categoria. Mude o preço e mostre o objeto.', 'Crie um array de 3 objetos e use um <code>for</code> para mostrar "nome - R$ preço" de cada um.'],
      desafio: 'Use um <code>for</code> para calcular o <strong>total</strong> e o <strong>produto mais caro</strong> do array de objetos. Faça a tabelinha de cada volta no caderno antes de rodar.' },
    63: { tarefas: ['Escreva a função <code>saudar(nome)</code> e chame com 3 nomes diferentes.', 'Escreva <code>calcularTotal(preco, quantidade)</code> que <strong>devolve</strong> o valor. Teste com 3 pares de números.', 'Escreva <code>ehPar(n)</code> que devolve <code>true</code> ou <code>false</code> (dica: o operador <code>%</code>).'],
      desafio: 'Escreva <code>aplicarDesconto(preco, percentual)</code> e use dentro de outra função, <code>totalComDesconto(lista)</code>, que soma os preços com 10% de desconto.' },
    64: { tarefas: ['Provoque de propósito um <code>ReferenceError</code> e um <code>SyntaxError</code> no console. Leia cada mensagem e anote onde dizia o tipo e a linha.', 'Corrija o código do total <code>["10","20"]</code> que dava "01020" e explique a correção.', 'Peça ao colega para quebrar um código seu (mudando uma coisa). Ache o erro usando só <code>console.log</code>.'],
      desafio: 'Escreva no caderno o <strong>seu método de 5 passos</strong> para achar um bug e aplique em um erro real do seu projeto.' },
    65: { tarefas: ['Crie uma página com <code>h1</code> (id "titulo"), um input (id "nome") e um botão. No console, selecione cada um com <code>getElementById</code>.', 'Use <code>querySelector</code> para pegar o primeiro <code>li</code> e <code>querySelectorAll</code> para contar todos os <code>li</code>.', 'Digite algo no input e leia o valor com <code>.value</code> no console. Teste também com <code>type="number"</code> e veja o <code>typeof</code>.'],
      desafio: 'Provoque o erro "Cannot read properties of null" de propósito (id errado) e anote exatamente o que causou.' },
    66: { tarefas: ['Troque o texto do <code>h1</code> com <code>textContent</code> e depois com <code>innerHTML</code> usando <code>&lt;b&gt;</code>. Compare.', 'Crie a classe <code>.destaque</code> no CSS e use <code>classList.toggle</code> para ligar e desligar no console.', 'A partir de um array de 3 nomes, desenhe uma lista <code>ul</code> usando <code>createElement</code> e <code>appendChild</code>.'],
      desafio: 'Refaça a lista usando crases e <code>innerHTML</code>. Depois remova o <code>innerHTML = ""</code> e chame o desenho 2 vezes. Explique o que aconteceu.' },
    67: { tarefas: ['Faça o contador de cliques completo (digitando) e confira se funciona.', 'Acrescente o botão <strong>Zerar</strong>.', 'Ligue o botão "Salvar" do formulário da loja a uma função que mostre o nome digitado no console.'],
      desafio: 'Faça uma busca em tempo real: um input que, a cada letra (<code>input</code>), mostra no console o texto digitado em maiúsculas (<code>toUpperCase()</code>).' },
    68: { tarefas: ['Guarde no localStorage uma chave <code>aluno</code> com seu nome e leia de volta. Veja a gaveta em <strong>F12 → Application</strong>.', 'Guarde o número 10 na chave <code>x</code> e descubra o resultado e o tipo de <code>localStorage.getItem("x") + 5</code>.', 'Guarde um objeto direto (sem JSON) e anote o que foi guardado. Apague a chave com <code>removeItem</code>.'],
      desafio: 'Crie uma página com um campo "seu nome", um botão "Guardar" e um texto "Olá, nome" que <strong>continua aparecendo depois de recarregar</strong>.' },
    69: { tarefas: ['Guarde um objeto produto com <code>JSON.stringify</code> e leia de volta com <code>JSON.parse</code>. Mostre <code>produto.nome</code>.', 'Guarde 3 produtos (chaves <code>p1</code>, <code>p2</code>, <code>p3</code>) e uma chave <code>c1</code>. Percorra a gaveta com <code>for</code> e mostre só as que começam com p.', 'Escreva no caderno a explicação de stringify e parse com suas palavras (sem olhar a aula) e confira depois.'],
      desafio: 'Escreva a função <code>listarProdutos()</code> que devolve um <strong>array de objetos</strong> com todos os produtos da gaveta (família p).' },
    70: { tarefas: ['Monte o formulário e a tabela do Gerenciar. Digite a função <code>salvarProduto</code> (nome, preço, id com "p") e confira na aba Application.', 'Digite <code>atualizarGrid</code> e chame ao abrir a página. Recarregue e veja os dados voltarem.', 'Cadastre 3 produtos, feche o navegador, abra de novo e confira se a tabela mostra os 3.'],
      desafio: 'Acrescente a validação: não salvar se o nome estiver vazio ou o preço for menor ou igual a 0, com mensagem para o usuário.' },
    71: { tarefas: ['Monte a página da Loja com a função <code>desenharLoja</code> e veja os mesmos produtos do Gerenciar.', 'Digite a função <code>comprar(id)</code> e confira no Application as chaves <code>p…</code> e <code>c…</code>.', 'Monte a página do Carrinho com a soma do total e teste com 3 compras.'],
      desafio: 'Acrescente um botão "Remover" no carrinho que apague só a chave <code>c…</code> daquele item e redesenhe.' },
    72: { tarefas: ['Escreva <code>alterarProduto(id)</code> (ler, mudar, gravar na mesma chave, redesenhar) e teste.', 'Escreva <code>excluirProduto(id)</code> apagando também a cópia do carrinho. Teste o "produto fantasma" sem a segunda linha.', 'Reproduza de propósito 3 dos bugs clássicos da lista e conserte cada um.'],
      desafio: 'Faça a <strong>variação dos favoritos</strong> (campo favorito, coluna com ⭐) sozinho e <strong>explique a solução ao professor</strong>, linha por linha, sem consultar a aula.' }
  };

  function praticaHtml(id, coletadas) {
    var p = PRAT[id]; if (!p) return '';
    var tarefas = coletadas.concat(p.tarefas);
    var h = '<div class="pratica-box" style="margin-top:22px;background:var(--card);border:1.5px solid rgba(52,211,153,.4);border-radius:16px;padding:24px">';
    h += '<div style="font-family:Sora,sans-serif;font-size:13px;color:#34d399;font-weight:700;margin-bottom:6px">🛠️ PRÁTICA</div>';
    h += '<div style="font-family:Sora,sans-serif;font-size:17px;font-weight:700;margin-bottom:6px">Agora é a sua vez</div>';
    h += '<p style="font-size:13px;color:var(--muted);margin-bottom:14px">Você viu o conceito e respondeu o quiz. Agora pratique <strong>digitando o código</strong> (sem copiar e colar). Marque cada tarefa quando terminar.</p>';
    h += '<ol style="list-style:none;display:grid;gap:10px">';
    tarefas.forEach(function (t, i) {
      h += '<li><label style="display:flex;gap:10px;align-items:flex-start;font-size:14px;line-height:1.6;cursor:pointer"><input type="checkbox" data-pt="' + i + '" style="margin-top:5px;width:16px;height:16px;accent-color:#34d399"><span><strong>Tarefa ' + (i + 1) + '.</strong> ' + t + '</span></label></li>';
    });
    h += '</ol>';
    h += '<div style="margin-top:16px;padding:14px;background:rgba(124,106,247,.1);border-left:3px solid #a78bfa;border-radius:6px;font-size:14px;line-height:1.7"><strong>🎯 Desafio:</strong> ' + p.desafio + '</div>';
    h += '<p style="margin-top:14px;font-size:13px;color:var(--muted)">Terminou? <strong>Mostre ao professor</strong> e explique com suas palavras o que fez. Se não conseguir explicar uma linha, volte ao conceito.</p>';
    h += '</div>';
    return h;
  }

  // ══════════════════════════════════════════════════════
  // 56 — COMO A WEB FUNCIONA
  // ══════════════════════════════════════════════════════
  A(56, 'Web 1: Como a Web Funciona', 'Navegador, servidor, HTML, CSS e JavaScript: o que cada peça faz e como abrir as ferramentas do navegador', '🌐', [
    P('🌐', 'O que acontece quando você abre um site',
      `<p>Quando você digita um endereço e aperta Enter, duas máquinas conversam:</p>`,
      lista(['💻 <strong>Cliente</strong>: o seu computador, com o <strong>navegador</strong> (Chrome, Edge, Firefox)', '🗄️ <strong>Servidor</strong>: um computador ligado 24 horas que guarda os arquivos do site', '📨 <strong>Requisição</strong>: o pedido do navegador ("me mande a página")', '📦 <strong>Resposta</strong>: o servidor devolve arquivos (HTML, CSS, JavaScript, imagens)']),
      analogia(`você é o cliente de um restaurante: faz o pedido (requisição), a cozinha (servidor) prepara e o garçom traz o prato (resposta). O navegador monta o prato na sua tela.`),
      caderno(['Cliente = navegador no seu computador', 'Servidor = computador que guarda o site', 'Requisição = pedido · Resposta = arquivos que voltam'])),
    P('🧱', 'Os três arquivos de uma página',
      `<p>Toda página é feita de três linguagens, cada uma com uma função:</p>`,
      lista(['🧱 <strong>HTML</strong>: o <em>conteúdo e a estrutura</em> (títulos, textos, botões). É o esqueleto.', '🎨 <strong>CSS</strong>: a <em>aparência</em> (cores, tamanhos, posição). É a roupa.', '⚡ <strong>JavaScript</strong>: o <em>comportamento</em> (o que acontece ao clicar, guardar dados). É o músculo.']),
      analogia(`uma casa: o HTML são as paredes e os cômodos, o CSS é a pintura e a decoração, o JavaScript é a parte elétrica que faz a luz acender quando você aperta o interruptor.`),
      caderno(['HTML = estrutura · CSS = aparência · JavaScript = comportamento', 'Sem CSS a página continua funcionando, só fica feia', 'Sem JavaScript a página aparece, mas não reage'])),
    P('🛠️', 'Ferramentas que vamos usar',
      `<p>Para programar você precisa só de duas coisas, e as duas já existem no computador da escola:</p>`,
      lista(['📝 <strong>Editor de código</strong>: Visual Studio Code (ou o Bloco de Notas, no começo)', '🌍 <strong>Navegador</strong>: o Chrome ou o Edge, com as ferramentas do desenvolvedor']),
      `<p style="margin-top:12px">Para abrir as <strong>ferramentas do desenvolvedor</strong>, aperte <strong>F12</strong> (ou Ctrl+Shift+I). Elas têm abas importantes:</p>`,
      lista(['<strong>Elements</strong>: mostra o HTML da página como o navegador entendeu', '<strong>Console</strong>: onde o JavaScript escreve mensagens e erros, e onde você testa código', '<strong>Application</strong>: mostra o que a página guardou no navegador (usaremos para o localStorage)']),
      faca(`Abra qualquer site, aperte <strong>F12</strong>, clique na aba <strong>Console</strong> e digite <code>2 + 2</code>. Aperte Enter. Você acabou de rodar seu primeiro código.`)),
    P('📁', 'Organizando um projeto',
      `<p>Um projeto web é uma <strong>pasta</strong> com arquivos que conversam entre si. O nome do arquivo principal é sempre <code>index.html</code>.</p>`,
      code(`projeto-loja/
  index.html      <- a página
  estilo.css      <- a aparência
  script.js       <- o comportamento`, 'Estrutura mínima de pastas'),
      `<p style="margin-top:12px">O HTML <strong>chama</strong> os outros dois arquivos:</p>`,
      code(`<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <title>Minha loja</title>
  <link rel="stylesheet" href="estilo.css">
</head>
<body>
  <h1>Olá, mundo!</h1>
  <script src="script.js"></script>
</body>
</html>`, 'index.html'),
      atencao(`os arquivos precisam estar na mesma pasta (ou o caminho no <code>href</code> e no <code>src</code> tem que apontar para onde eles estão). Erro de caminho é a causa número 1 de "meu CSS não funciona".`),
      caderno(['Projeto = pasta com index.html + estilo.css + script.js', 'link rel="stylesheet" chama o CSS · script src chama o JavaScript', 'O script vai no FIM do body, para a página já existir quando ele rodar'])),
    P('🔎', 'Como estudar programação (e não só copiar)',
      `<p>Copiar e colar faz o código funcionar, mas <strong>não te ensina nada</strong>. Para aprender de verdade, siga este ritmo em cada exercício:</p>`,
      lista(['1️⃣ <strong>Preveja</strong>: escreva no caderno o que você acha que vai acontecer', '2️⃣ <strong>Digite</strong> o código (não cole) e rode', '3️⃣ <strong>Compare</strong> com o que você previu. Se errou, ali está o aprendizado', '4️⃣ <strong>Mude</strong> alguma coisa e veja o que quebra', '5️⃣ <strong>Explique</strong> com suas palavras para um colega']),
      box('verde', `<strong>Regra da turma:</strong> se você não consegue explicar uma linha do seu código, ela ainda não é sua. Peça ajuda, não cole.`),
      caderno(['Prever → digitar → comparar → mudar → explicar', 'Errar faz parte: a mensagem de erro é uma dica, não uma bronca'])),
  ], [
    Q('Quando você abre um site, quem guarda os arquivos da página?', 'O servidor', 'O navegador', 'O monitor', 'O teclado'),
    Q('Qual linguagem define a ESTRUTURA e o conteúdo da página?', 'HTML', 'CSS', 'JavaScript', 'Nenhuma delas'),
    Q('Qual linguagem cuida da APARÊNCIA (cores, tamanhos)?', 'CSS', 'HTML', 'JavaScript', 'SQL'),
    Q('Qual linguagem faz a página REAGIR (ao clicar, por exemplo)?', 'JavaScript', 'HTML', 'CSS', 'Word'),
    Q('Qual tecla abre as ferramentas do desenvolvedor no navegador?', 'F12', 'F1', 'Esc', 'Alt+F4'),
    Q('Em qual aba das ferramentas aparecem as mensagens e erros do JavaScript?', 'Console', 'Elements', 'Network', 'Fonts'),
    Q('Qual é o nome do arquivo principal de um site?', 'index.html', 'principal.doc', 'site.txt', 'inicio.exe'),
    Q('Por que o <script> costuma ficar no FIM do <body>?', 'Para a página já existir quando o código rodar', 'Porque o navegador não lê o começo', 'Para a página ficar mais bonita', 'Porque é proibido colocar no começo'),
    Q('Qual é o melhor jeito de aprender com um exercício de código?', 'Prever, digitar, comparar e explicar', 'Copiar e colar a resposta pronta', 'Só ler sem rodar', 'Pedir o código pronto a um colega'),
    Q('O pedido que o navegador faz ao servidor se chama:', 'Requisição', 'Resposta', 'Pixel', 'Pasta'),
  ]);

  // ══════════════════════════════════════════════════════
  // 57 — HTML
  // ══════════════════════════════════════════════════════
  A(57, 'Web 2: HTML, a Estrutura da Página', 'Tags, atributos, títulos, textos, listas, links, imagens e tabelas', '🧱', [
    P('🏷️', 'Tags: as etiquetas do HTML',
      `<p>HTML é feito de <strong>tags</strong>. A maioria vem em par: uma que abre e outra que fecha (com <code>/</code>).</p>`,
      code(`<p>Este é um parágrafo.</p>
<h1>Este é um título</h1>`),
      `<p style="margin-top:12px">O conjunto <em>abre + conteúdo + fecha</em> se chama <strong>elemento</strong>. Algumas tags não têm conteúdo e não fecham (<code>&lt;br&gt;</code>, <code>&lt;img&gt;</code>, <code>&lt;input&gt;</code>).</p>`,
      analogia(`a tag é uma caixa com etiqueta. A etiqueta diz o que tem dentro: <code>p</code> = parágrafo, <code>h1</code> = título principal.`),
      caderno(['Elemento = tag que abre + conteúdo + tag que fecha', 'Fechar usa a barra: </p>', 'br, img e input não fecham'])),
    P('📄', 'O esqueleto de toda página',
      code(`<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <title>Título da aba</title>
</head>
<body>
  <h1>Olá!</h1>
</body>
</html>`),
      lista(['<code>&lt;!DOCTYPE html&gt;</code>: avisa que é HTML moderno', '<code>&lt;html&gt;</code>: envolve tudo', '<code>&lt;head&gt;</code>: informações da página que <em>não aparecem</em> (título da aba, codificação)', '<code>&lt;body&gt;</code>: tudo que <em>aparece</em> na tela']),
      faca(`Crie um arquivo <code>index.html</code>, cole o esqueleto acima <strong>digitando</strong> cada linha, abra no navegador e troque o texto do <code>h1</code> pelo seu nome.`)),
    P('🔤', 'Títulos e textos',
      code(`<h1>Título principal (só um por página)</h1>
<h2>Subtítulo</h2>
<h3>Subtítulo menor</h3>
<p>Um parágrafo de texto.</p>
<strong>negrito</strong> <em>itálico</em>
<br>  <!-- quebra de linha -->
<hr>  <!-- linha horizontal -->`),
      `<p style="margin-top:12px">Os títulos vão de <code>h1</code> (mais importante) a <code>h6</code>. Use pela <strong>importância</strong>, não pelo tamanho: o tamanho se muda com CSS.</p>`,
      atencao(`o que está entre <code>&lt;!--</code> e <code>--&gt;</code> é <strong>comentário</strong>: o navegador ignora. Use para anotar o que o código faz.`),
      caderno(['h1 a h6 = títulos (h1 é o mais importante)', 'p = parágrafo · strong = negrito · em = itálico', '<!-- comentário --> não aparece na tela'])),
    P('📋', 'Listas',
      `<p>Para itens em sequência, o HTML tem dois tipos de lista:</p>`,
      code(`<ul>            <!-- lista com bolinhas -->
  <li>Maçã</li>
  <li>Uva</li>
</ul>

<ol>            <!-- lista numerada -->
  <li>Ligar o PC</li>
  <li>Abrir o navegador</li>
</ol>`),
      `<p style="margin-top:12px"><code>ul</code> = <em>unordered list</em> (sem ordem). <code>ol</code> = <em>ordered list</em> (com ordem). Cada item é um <code>li</code> (<em>list item</em>).</p>`,
      faca(`Faça uma lista numerada com os 3 passos para ligar um computador.`)),
    P('🔗', 'Atributos: links e imagens',
      `<p>Alguns elementos precisam de informação extra. Ela vai <strong>dentro da tag de abertura</strong>, no formato <code>nome="valor"</code>. Isso se chama <strong>atributo</strong>.</p>`,
      code(`<a href="https://www.google.com">Ir para o Google</a>

<img src="foto.jpg" alt="Foto da loja" width="200">`),
      lista(['<code>href</code> (em <code>a</code>): para onde o link leva', '<code>src</code> (em <code>img</code>): qual imagem mostrar', '<code>alt</code>: texto que descreve a imagem (para leitores de tela e se a imagem não carregar)', '<code>id</code> e <code>class</code>: nomes que damos aos elementos para o CSS e o JavaScript encontrarem']),
      box('azul', `<strong>id × class:</strong> o <code>id</code> é único na página (como um CPF). A <code>class</code> pode se repetir em vários elementos (como o nome de um time).`),
      caderno(['Atributo = informação extra na tag de abertura: nome="valor"', 'a href = link · img src = imagem · alt = descrição', 'id é único · class pode repetir'])),
    P('📊', 'Tabelas',
      `<p>Tabelas organizam dados em linhas e colunas. Você vai usar muito no projeto da loja (a lista de produtos).</p>`,
      code(`<table>
  <thead>
    <tr><th>Produto</th><th>Preço</th></tr>
  </thead>
  <tbody>
    <tr><td>Caneta</td><td>R$ 3,50</td></tr>
    <tr><td>Caderno</td><td>R$ 18,00</td></tr>
  </tbody>
</table>`),
      lista(['<code>table</code>: a tabela toda', '<code>thead</code> / <code>tbody</code>: cabeçalho e corpo', '<code>tr</code>: uma linha (<em>table row</em>)', '<code>th</code>: célula de cabeçalho · <code>td</code>: célula de dados']),
      preveja(`quantas linhas e quantas colunas a tabela acima mostra? (conte também a linha do cabeçalho)`)),
    P('🧪', 'Semântica: dar nome certo às partes',
      `<p>Além de <code>div</code> (uma caixa sem significado), o HTML tem tags que dizem <strong>o que a área é</strong>:</p>`,
      code(`<header>  topo da página (logo, menu)  </header>
<nav>     menu de links               </nav>
<main>    conteúdo principal          </main>
<section> uma parte do conteúdo       </section>
<footer>  rodapé                      </footer>`),
      `<p style="margin-top:12px">Elas ajudam leitores de tela, buscadores (Google) e quem lê o seu código depois. <strong>Código bem organizado é código que outra pessoa entende.</strong></p>`,
      caderno(['header = topo · nav = menu · main = principal · footer = rodapé', 'div e span não têm significado: use só quando nenhuma outra serve'])),
  ], [
    Q('Qual tag cria um parágrafo?', '<p>', '<h1>', '<br>', '<li>'),
    Q('Como se fecha uma tag em HTML?', 'Com uma barra, como em </p>', 'Com um ponto final', 'Não precisa fechar nenhuma', 'Com dois pontos'),
    Q('Qual é o título MAIS importante da página?', '<h1>', '<h6>', '<title>', '<head>'),
    Q('Qual lista é NUMERADA?', '<ol>', '<ul>', '<li>', '<table>'),
    Q('Qual atributo diz para onde um link leva?', 'href', 'src', 'alt', 'class'),
    Q('Para que serve o atributo alt de uma imagem?', 'Descrever a imagem em texto', 'Trocar a cor da imagem', 'Aumentar a imagem', 'Dizer onde o arquivo está'),
    Q('Qual é a diferença entre id e class?', 'id é único na página; class pode repetir', 'id pode repetir; class é único', 'São exatamente iguais', 'id é para imagens e class para textos'),
    Q('Qual tag representa uma LINHA de tabela?', '<tr>', '<td>', '<th>', '<tbody>'),
    Q('O que fica dentro do <head>?', 'Informações que não aparecem na tela, como o título da aba', 'Todo o conteúdo visível', 'Apenas imagens', 'Somente o rodapé'),
    Q('Como escrever um comentário em HTML?', '<!-- texto -->', '// texto', '# texto', '/* texto */'),
  ]);

  // ══════════════════════════════════════════════════════
  // 58 — FORMULÁRIOS
  // ══════════════════════════════════════════════════════
  A(58, 'Web 3: Formulários e Botões', 'Campos de texto, número, seleção e botões: como a página recebe dados do usuário', '📝', [
    P('📝', 'Por que formulários?',
      `<p>Uma página só vira um <strong>sistema</strong> quando recebe dados do usuário: nome do produto, preço, quantidade. Quem recebe é o <strong>formulário</strong>.</p>`,
      analogia(`um formulário de papel: cada linha em branco é um <code>input</code>, a pergunta ao lado é um <code>label</code> e o carimbo "enviar" é o <code>button</code>.`),
      code(`<label for="nome">Nome do produto:</label>
<input type="text" id="nome" placeholder="Ex: Caneta">`),
      `<p style="margin-top:12px">O <code>label</code> descreve o campo. O <code>for</code> do label tem o <strong>mesmo valor</strong> do <code>id</code> do input: assim, clicar no texto já foca o campo.</p>`),
    P('🔠', 'Tipos de campo',
      `<p>O atributo <code>type</code> muda o comportamento do <code>input</code>:</p>`,
      code(`<input type="text"     id="nome">    <!-- texto livre -->
<input type="number"   id="preco">   <!-- só números -->
<input type="password" id="senha">   <!-- esconde o que digita -->
<input type="email"    id="email">   <!-- confere o @ -->
<input type="checkbox" id="ativo">   <!-- caixinha marcar/desmarcar -->`),
      code(`<select id="categoria">
  <option value="">Escolha...</option>
  <option value="papelaria">Papelaria</option>
  <option value="eletronicos">Eletrônicos</option>
</select>

<textarea id="descricao" rows="3"></textarea>`, 'Lista de opções e texto longo'),
      atencao(`mesmo com <code>type="number"</code>, o que o JavaScript recebe do campo é <strong>texto</strong>. Guarde essa frase: ela vai aparecer de novo (e é a causa de muito bug).`),
      caderno(['input type: text, number, password, email, checkbox', 'select + option = lista de opções · textarea = texto longo', 'O valor de um campo SEMPRE chega ao JavaScript como texto'])),
    P('🔘', 'Botões',
      code(`<button id="btnSalvar">Salvar</button>
<button type="button" id="btnLimpar">Limpar</button>`),
      `<p style="margin-top:12px">Um botão não faz nada sozinho: é o <strong>JavaScript</strong> que diz o que acontece no clique (veremos nas aulas de eventos).</p>`,
      atencao(`dentro de um <code>&lt;form&gt;</code>, o botão <em>envia o formulário e recarrega a página</em>. Por isso, no nosso projeto, usamos <code>type="button"</code> ou tratamos o envio com JavaScript.`),
      faca(`Monte o formulário do cadastro de produto: nome (texto), preço (número), categoria (lista) e um botão "Salvar". Dê um <code>id</code> a cada campo.`)),
    P('🏷️', 'Dar nomes (ids) é o que liga HTML e JavaScript',
      `<p>O JavaScript só consegue achar um campo se ele tiver um <code>id</code>. Escolha nomes <strong>claros e sem acento</strong>:</p>`,
      lista(['✅ <code>id="nome"</code>, <code>id="preco"</code>, <code>id="btnSalvar"</code>', '❌ <code>id="campo1"</code>, <code>id="x"</code>, <code>id="Preço do Produto"</code>']),
      caderno(['id claro e sem acento: nome, preco, btnSalvar', 'É pelo id que o JavaScript acha o elemento'])),
  ], [
    Q('Qual tag descreve um campo de formulário com texto de ajuda?', '<label>', '<table>', '<footer>', '<hr>'),
    Q('Qual atributo escolhe o tipo de um input?', 'type', 'src', 'href', 'alt'),
    Q('Qual input esconde o que o usuário digita?', 'type="password"', 'type="text"', 'type="number"', 'type="checkbox"'),
    Q('O que o JavaScript recebe do valor de um campo type="number"?', 'Um texto (string)', 'Sempre um número', 'Sempre verdadeiro ou falso', 'Nada'),
    Q('O que liga um label ao seu input?', 'O for do label igual ao id do input', 'A cor igual nos dois', 'A ordem no arquivo apenas', 'Nada liga os dois'),
    Q('Qual tag cria uma lista de opções para escolher?', '<select>', '<ul>', '<textarea>', '<img>'),
    Q('Por que dar um id a cada campo?', 'Para o JavaScript conseguir encontrá-lo', 'Para o campo ficar azul', 'Porque o navegador exige para mostrar', 'Para aumentar o campo'),
    Q('Qual é um bom id para o botão de salvar?', 'btnSalvar', 'Botão de Salvar!', '1', 'campo de salvar produto'),
  ]);

  // ══════════════════════════════════════════════════════
  // 59 — CSS
  // ══════════════════════════════════════════════════════
  A(59, 'Web 4: CSS, a Aparência', 'Seletores, cores, caixas, espaçamento e layout com Flexbox e Grid', '🎨', [
    P('🎨', 'O que é CSS e como ele escolhe elementos',
      `<p>CSS são <strong>regras</strong>: "para <em>estes elementos</em>, aplique <em>estas aparências</em>".</p>`,
      code(`p {
  color: blue;
  font-size: 18px;
}`),
      lista(['<code>p</code> é o <strong>seletor</strong>: quem recebe o estilo', '<code>color</code> é a <strong>propriedade</strong>: o que mudar', '<code>blue</code> é o <strong>valor</strong>: como mudar', 'Cada linha termina com <code>;</code>']),
      caderno(['Regra CSS = seletor { propriedade: valor; }'])),
    P('🎯', 'Três jeitos de selecionar',
      code(`p        { color: gray; }      /* todos os <p> (por tag) */
.destaque { color: red; }      /* quem tem class="destaque" (ponto) */
#titulo  { font-size: 32px; }  /* quem tem id="titulo" (cerquilha) */`),
      lista(['Por <strong>tag</strong>: só o nome (<code>p</code>, <code>h1</code>)', 'Por <strong>classe</strong>: ponto na frente (<code>.destaque</code>)', 'Por <strong>id</strong>: cerquilha na frente (<code>#titulo</code>)']),
      atencao(`no HTML você escreve <code>class="destaque"</code> (sem ponto). O ponto só existe <em>no CSS</em>, para dizer "classe".`),
      preveja(`se um parágrafo tem <code>class="destaque"</code> e o CSS tem as regras <code>p {color: gray}</code> e <code>.destaque {color: red}</code>, de que cor fica? (dica: a regra mais específica vence)`)),
    P('📦', 'Tudo é uma caixa (box model)',
      `<p>O navegador trata <strong>todo elemento como uma caixa</strong>, com 4 camadas, de dentro para fora:</p>`,
      lista(['📄 <strong>content</strong>: o conteúdo (texto, imagem)', '🔲 <strong>padding</strong>: espaço <em>interno</em>, entre o conteúdo e a borda', '🖼️ <strong>border</strong>: a borda', '↔️ <strong>margin</strong>: espaço <em>externo</em>, entre esta caixa e as vizinhas']),
      code(`.card {
  padding: 16px;
  border: 1px solid #ccc;
  margin: 12px;
  border-radius: 8px;   /* cantos arredondados */
}`),
      analogia(`um quadro na parede: o desenho é o conteúdo, a moldura interna branca é o padding, a madeira é a borda e o espaço até o próximo quadro é a margem.`),
      caderno(['Caixa = content + padding + border + margin', 'padding = dentro · margin = fora'])),
    P('🌈', 'Cores, texto e fundo',
      code(`body {
  background: #0f1117;          /* cor em hexadecimal */
  color: white;                 /* cor do texto */
  font-family: Arial, sans-serif;
}
h1 { color: rgb(79, 142, 247); text-align: center; }
button {
  background: #4f8ef7;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;              /* mãozinha ao passar o mouse */
}
button:hover { background: #3b6fd1; }  /* quando o mouse está em cima */`),
      `<p style="margin-top:12px"><code>:hover</code> é uma <strong>pseudoclasse</strong>: aplica o estilo só enquanto o mouse está sobre o elemento.</p>`,
      faca(`Aplique no seu formulário: fundo escuro, texto claro, botão azul que muda de cor ao passar o mouse.`)),
    P('↔️', 'Flexbox: alinhar em linha ou coluna',
      code(`.menu {
  display: flex;               /* filhos lado a lado */
  gap: 12px;                   /* espaço entre eles */
  justify-content: space-between;  /* distribui no eixo principal */
  align-items: center;         /* centraliza no outro eixo */
}`),
      `<p style="margin-top:12px">Basta colocar <code>display: flex</code> no <strong>pai</strong> e os filhos se alinham em linha. Para empilhar, use <code>flex-direction: column</code>.</p>`,
      caderno(['display: flex no PAI alinha os filhos em linha', 'gap = espaço entre os filhos', 'flex-direction: column = empilhar'])),
    P('🔳', 'Grid: grade de cards',
      `<p>Para uma vitrine de produtos, o <strong>Grid</strong> cria colunas que se ajustam à tela:</p>`,
      code(`.vitrine {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}`),
      `<p style="margin-top:12px">Leia assim: "faça quantas colunas couberem, cada uma com <em>no mínimo</em> 220px e dividindo o resto igualmente". Em celular vira 1 coluna, em tela grande vira várias, <strong>sem escrever nada a mais</strong>.</p>`,
      atencao(`Grid e Flexbox <strong>não</strong> são a mesma coisa: Flexbox organiza em <em>uma direção</em> (linha ou coluna), Grid organiza em <em>linhas e colunas ao mesmo tempo</em>.`)),
  ], [
    Q('Qual é o formato de uma regra CSS?', 'seletor { propriedade: valor; }', 'propriedade < valor > seletor', 'valor = seletor + propriedade', '<seletor propriedade valor>'),
    Q('Como selecionar elementos pela classe "destaque" no CSS?', '.destaque', '#destaque', 'destaque()', '<destaque>'),
    Q('Como selecionar o elemento com id="titulo" no CSS?', '#titulo', '.titulo', 'titulo:', '*titulo'),
    Q('Qual camada do box model é o espaço INTERNO entre o conteúdo e a borda?', 'padding', 'margin', 'border', 'gap'),
    Q('Qual propriedade arredonda os cantos de uma caixa?', 'border-radius', 'padding', 'margin', 'font-size'),
    Q('O que faz o :hover?', 'Aplica o estilo enquanto o mouse está em cima', 'Esconde o elemento', 'Apaga o elemento', 'Muda o id'),
    Q('Para alinhar filhos lado a lado, onde se coloca display: flex?', 'No elemento pai', 'Em cada filho', 'No arquivo HTML', 'No navegador'),
    Q('Qual propriedade dá espaço ENTRE os itens do flex ou grid?', 'gap', 'color', 'src', 'href'),
    Q('Qual é a principal diferença entre Flexbox e Grid?', 'Flex organiza em uma direção; Grid em linhas e colunas', 'Não há diferença', 'Grid só funciona em tabelas', 'Flex só muda cores'),
    Q('Num arquivo CSS, o que significa a linha color: red;?', 'O texto fica vermelho', 'O fundo fica vermelho', 'A borda desaparece', 'O elemento é apagado'),
  ]);

  // ══════════════════════════════════════════════════════
  // 60 — JS: CONSOLE E VARIÁVEIS
  // ══════════════════════════════════════════════════════
  A(60, 'JavaScript 1: Console e Variáveis', 'Escrever no console, guardar valores em variáveis e conhecer os tipos de dado', '⚡', [
    P('📣', 'O console: seu caderno de rascunho',
      `<p>O <strong>console</strong> é onde o JavaScript "fala" com você. Abra com <strong>F12 → Console</strong> e teste:</p>`,
      code(`console.log("Olá, turma!");
console.log(2 + 3);
console.log("Soma:", 2 + 3);`),
      `<p style="margin-top:12px"><code>console.log()</code> escreve o que estiver entre os parênteses. É a sua melhor ferramenta para <strong>descobrir o que o código está fazendo</strong>.</p>`,
      faca(`Digite os três comandos acima, <em>um de cada vez</em>, no console. Veja o que aparece.`),
      caderno(['console.log(x) mostra x no console', 'Use o console para ver o que o código está fazendo'])),
    P('📦', 'Variáveis: caixas com etiqueta',
      analogia(`uma variável é uma <strong>caixa com etiqueta</strong>. Você guarda algo dentro e depois chama pelo nome da etiqueta.`),
      code(`let nome = "Caneta";
let preco = 3.5;
const loja = "Minha Loja";

console.log(nome);   // Caneta
console.log(preco);  // 3.5`),
      lista(['<code>let</code>: cria uma variável que <strong>pode mudar</strong> depois', '<code>const</code>: cria uma variável que <strong>não muda</strong> (constante)', '<code>=</code> aqui <em>não</em> é "igual": significa <strong>"guarde isto aqui"</strong>']),
      code(`let contador = 1;
contador = contador + 1;   // pega o valor, soma 1 e guarda de volta
console.log(contador);      // 2`),
      preveja(`depois de <code>let x = 5; x = x * 2;</code>, quanto vale <code>x</code>?`),
      caderno(['let = variável que muda · const = não muda', '= significa "guarde isto na caixa"', 'Nomes: sem espaço, sem acento, começando com letra'])),
    P('🏷️', 'Escolhendo bons nomes',
      `<p>Código é lido muito mais vezes do que escrito. Nomes bons evitam comentários:</p>`,
      lista(['✅ <code>precoProduto</code>, <code>listaDeCompras</code>, <code>totalCarrinho</code>', '❌ <code>x</code>, <code>a1</code>, <code>coisa</code>, <code>preco do produto</code> (espaço não pode)']),
      box('azul', `<strong>camelCase:</strong> a primeira palavra em minúsculas e cada palavra seguinte com a primeira letra maiúscula: <code>nomeDoProduto</code>. É o padrão do JavaScript.`),
      atencao(`<code>Nome</code> e <code>nome</code> são variáveis <strong>diferentes</strong>. O JavaScript diferencia maiúsculas de minúsculas.`)),
    P('🧬', 'Os tipos de dado',
      `<p>Todo valor tem um <strong>tipo</strong>. Os principais:</p>`,
      lista(['🔤 <strong>string</strong> (texto): <code>"Caneta"</code>, <code>"10"</code> (entre aspas!)', '🔢 <strong>number</strong> (número): <code>10</code>, <code>3.5</code>', '✅ <strong>boolean</strong>: <code>true</code> ou <code>false</code>', '📭 <strong>null / undefined</strong>: "vazio" / "ainda não definido"']),
      code(`console.log(typeof "10");   // "string"
console.log(typeof 10);     // "number"
console.log(typeof true);   // "boolean"`),
      atencao(`<code>"10"</code> (com aspas) é <strong>texto</strong>; <code>10</code> (sem aspas) é <strong>número</strong>. Parecem iguais, mas se comportam de modo diferente, como veremos a seguir.`),
      caderno(['Tipos: string (texto), number, boolean (true/false)', 'typeof mostra o tipo', '"10" é texto · 10 é número'])),
    P('➕', 'O + soma ou junta?',
      code(`console.log(10 + 5);       // 15      (número + número = soma)
console.log("10" + 5);     // "105"   (texto + número = junta!)
console.log("Olá, " + "Ana"); // "Olá, Ana"`),
      `<p style="margin-top:12px">Quando um dos lados é <strong>texto</strong>, o <code>+</code> deixa de somar e <strong>junta</strong>. Para somar valores que vieram de campos de formulário (que são texto), converta antes:</p>`,
      code(`let a = "10";
let b = "5";
console.log(a + b);                  // "105"  (errado)
console.log(Number(a) + Number(b));  // 15     (certo)`),
      preveja(`qual o resultado de <code>"3" + 4</code>? E de <code>Number("3") + 4</code>?`),
      caderno(['texto + qualquer coisa = junta (concatena)', 'Number("10") converte texto em número', 'Valor de campo de formulário é SEMPRE texto: converta antes de calcular'])),
  ], [
    Q('O que faz console.log("Oi")?', 'Escreve Oi no console', 'Apaga a página', 'Cria um botão', 'Fecha o navegador'),
    Q('Qual palavra cria uma variável que pode mudar de valor?', 'let', 'const', 'var1', 'print'),
    Q('O que significa o = em let x = 5;?', 'Guarde o valor 5 em x', 'x é igual a 5 para sempre, sem exceção', 'Compare x com 5', 'Apague x'),
    Q('Depois de let x = 5; x = x * 2; quanto vale x?', '10', '5', '25', '2'),
    Q('Qual é o tipo de "10" (com aspas)?', 'string (texto)', 'number', 'boolean', 'undefined'),
    Q('Qual é o resultado de "10" + 5 ?', '"105"', '15', '5', 'Dá erro'),
    Q('Qual é o resultado de 10 + 5 ?', '15', '"105"', '"15"', '5'),
    Q('Como converter o texto "7" em número?', 'Number("7")', 'Text(7)', 'string(7)', 'toNumber"7"'),
    Q('Qual é um bom nome de variável?', 'totalCarrinho', 'total do carrinho', '1total', 'total-carrinho'),
    Q('No JavaScript, nome e Nome são:', 'Variáveis diferentes', 'A mesma variável', 'Um erro obrigatório', 'Comentários'),
  ]);

  // ══════════════════════════════════════════════════════
  // 61 — JS: TEXTOS, OPERADORES E DECISÕES
  // ══════════════════════════════════════════════════════
  A(61, 'JavaScript 2: Textos, Operadores e Decisões', 'Template strings, operadores, comparações e o if/else', '🔀', [
    P('🔤', 'Montando textos com crases (template string)',
      `<p>Juntar texto com <code>+</code> fica confuso. Com <strong>crases</strong> (<code>&#96;</code>) e <code>€{}</code> fica claro:</p>`,
      code(`let nome = "Caneta";
let preco = 3.5;

// jeito antigo
console.log("Produto: " + nome + " custa R$ " + preco);

// jeito com crases
console.log(§Produto: €{nome} custa R$ €{preco}§);`),
      `<p style="margin-top:12px">Dentro das crases, tudo que estiver em <code>€{ }</code> é <strong>trocado pelo valor</strong> da variável (ou do cálculo). É assim que montaremos o HTML dos cards da loja.</p>`,
      atencao(`crase (<code>&#96;</code>) não é aspas simples (<code>'</code>). No teclado ABNT a crase fica ao lado do P (tecla com <code>´</code>, pressionada com Shift).`),
      faca(`Crie as variáveis <code>produto</code> e <code>quantidade</code> e escreva, com crases: <em>"Você comprou 3 unidades de Caneta"</em>.`),
      caderno(['Crases: §texto €{variavel} texto§', 'Tudo em €{ } vira o valor da variável'])),
    P('🧮', 'Operadores',
      code(`10 + 3   // 13    soma
10 - 3   // 7     subtração
10 * 3   // 30    multiplicação
10 / 4   // 2.5   divisão
10 % 3   // 1     resto da divisão (módulo)`),
      `<p style="margin-top:12px">O <code>%</code> é útil para saber se um número é par: <code>n % 2 === 0</code>.</p>`,
      code(`let preco = 100;
let desconto = 0.1;
let final = preco - preco * desconto;   // multiplicação antes da subtração
console.log(final);                       // 90`),
      preveja(`quanto é <code>2 + 3 * 4</code>? E <code>(2 + 3) * 4</code>?`),
      caderno(['+ - * / e % (resto)', 'Multiplicação e divisão vêm antes de soma e subtração', 'Parênteses mandam na ordem'])),
    P('⚖️', 'Comparações: perguntas que dão sim ou não',
      code(`5 > 3        // true
5 < 3        // false
5 >= 5       // true  (maior ou igual)
5 === 5      // true  (igual)
5 !== 3      // true  (diferente)`),
      atencao(`para comparar use <strong><code>===</code></strong> (três sinais). Um <code>=</code> sozinho <em>guarda</em> valor, não compara!`),
      code(`console.log(5 === "5");   // false  (número x texto)
console.log(5 == "5");    // true   (confuso: evite ==)`),
      `<p style="margin-top:12px">Combine perguntas com <code>&amp;&amp;</code> (E: as duas verdadeiras) e <code>||</code> (OU: pelo menos uma verdadeira).</p>`,
      caderno(['=== compara · = guarda', 'Comparação sempre devolve true ou false', '&& = E · || = OU'])),
    P('🚦', 'Decisões com if / else',
      `<p>O <code>if</code> executa um bloco <strong>só se</strong> a condição for verdadeira:</p>`,
      code(`let idade = 16;

if (idade >= 18) {
  console.log("Pode entrar");
} else {
  console.log("Só maiores de 18");
}`),
      analogia(`um semáforo: <em>se</em> estiver verde, passe; <em>senão</em>, pare.`),
      code(`let nota = 6.5;
if (nota >= 7) {
  console.log("Aprovado");
} else if (nota >= 5) {
  console.log("Recuperação");
} else {
  console.log("Reprovado");
}`, 'Várias condições em sequência'),
      preveja(`o que aparece no console com <code>nota = 6.5</code>? E com <code>nota = 4</code>?`),
      caderno(['if (condição) { ... } else { ... }', 'else if testa outra condição se a anterior falhou', 'Só um bloco é executado'])),
    P('🛒', 'Aplicando: validar o formulário da loja',
      `<p>No cadastro de produto, não podemos aceitar campo vazio. Veja como o <code>if</code> protege o sistema:</p>`,
      code(`let nome = "";
let preco = "12.5";

if (nome === "" || preco === "") {
  console.log("Preencha todos os campos!");
} else {
  console.log("Produto válido: " + nome);
}`),
      `<p style="margin-top:12px">Leia em voz alta: <em>"se o nome estiver vazio <strong>ou</strong> o preço estiver vazio, avise o usuário; senão, siga em frente"</em>.</p>`,
      faca(`Altere o código para também recusar preço menor ou igual a zero. (Dica: lembre de converter com <code>Number()</code> antes de comparar.)`)),
  ], [
    Q('Qual símbolo envolve o texto de uma template string?', 'Crases (§)', 'Aspas duplas', 'Parênteses', 'Chaves'),
    Q('O que €{nome} faz dentro de crases?', 'Troca pelo valor da variável nome', 'Escreve literalmente €{nome}', 'Apaga o nome', 'Cria uma variável'),
    Q('Quanto é 10 % 3 ?', '1', '3', '0', '3.33'),
    Q('Quanto é 2 + 3 * 4 ?', '14', '20', '24', '9'),
    Q('Qual operador COMPARA se dois valores são iguais?', '===', '=', '=>', '=+'),
    Q('O que o operador = faz?', 'Guarda um valor em uma variável', 'Compara dois valores', 'Soma dois valores', 'Cria um comentário'),
    Q('Qual é o resultado de 5 === "5" ?', 'false', 'true', 'undefined', 'Erro'),
    Q('O que o && significa em uma condição?', 'E: as duas partes precisam ser verdadeiras', 'OU: basta uma ser verdadeira', 'Negação', 'Soma'),
    Q('Com nota = 6.5, o código "if (nota >= 7) A else if (nota >= 5) B else C" executa:', 'B', 'A', 'C', 'A e B'),
    Q('Quando o bloco else é executado?', 'Quando a condição do if é falsa', 'Sempre', 'Quando a condição do if é verdadeira', 'Nunca'),
  ]);

  // ══════════════════════════════════════════════════════
  // 62 — JS: ARRAYS, OBJETOS E LAÇOS
  // ══════════════════════════════════════════════════════
  A(62, 'JavaScript 3: Arrays, Objetos e Laços', 'Listas de valores, fichas com campos e como repetir ações sem copiar e colar', '🗂️', [
    P('🗃️', 'Arrays: uma fileira de caixas',
      analogia(`um array é uma <strong>fileira de caixas numeradas</strong>. A primeira caixa é a número <strong>0</strong>, não a 1.`),
      code(`let frutas = ["Maçã", "Uva", "Pera"];

console.log(frutas[0]);       // Maçã
console.log(frutas[2]);       // Pera
console.log(frutas.length);   // 3  (quantidade)

frutas.push("Manga");         // adiciona no final
console.log(frutas);          // ["Maçã","Uva","Pera","Manga"]`),
      atencao(`a contagem começa em <strong>0</strong>. Em um array com 3 itens, as posições são 0, 1 e 2. Não existe posição 3!`),
      preveja(`o que mostra <code>frutas[1]</code>? E <code>frutas[frutas.length - 1]</code>?`),
      caderno(['Array = lista entre colchetes [ ]', 'A primeira posição é 0', '.length = quantidade · .push() = adicionar no final'])),
    P('🪪', 'Objetos: uma ficha com campos',
      analogia(`um objeto é uma <strong>ficha de cadastro</strong>: cada campo tem um nome e um valor.`),
      code(`let produto = {
  id: "p1",
  nome: "Caneta",
  preco: 3.5,
  ativo: true
};

console.log(produto.nome);    // Caneta
produto.preco = 4;            // altera o campo
produto.categoria = "Papelaria"; // cria um campo novo`),
      lista(['Entre <code>{ }</code>, em pares <code>nome: valor</code>, separados por vírgula', 'Para ler: <code>objeto.campo</code>', 'Para mudar: <code>objeto.campo = novoValor</code>']),
      box('azul', `<strong>Na loja:</strong> cada produto cadastrado é <em>um objeto</em> (id, nome, preço...). É ele que vamos guardar no localStorage.`),
      caderno(['Objeto = { campo: valor, campo: valor }', 'Ler e mudar com ponto: produto.nome', 'Cada produto da loja é um objeto'])),
    P('📚', 'Array de objetos: a lista de produtos',
      `<p>Juntando as duas ideias, temos a estrutura de dados da loja inteira:</p>`,
      code(`let produtos = [
  { id: "p1", nome: "Caneta",  preco: 3.5 },
  { id: "p2", nome: "Caderno", preco: 18 }
];

console.log(produtos[1].nome);       // Caderno
console.log(produtos.length);        // 2`),
      `<p style="margin-top:12px">Leia <code>produtos[1].nome</code> assim: "pegue o produto da posição 1 e, dele, o campo nome".</p>`,
      preveja(`o que mostra <code>produtos[0].preco</code>?`)),
    P('🔁', 'Laços: repetir sem copiar e colar',
      `<p>Para mostrar 100 produtos você <strong>não</strong> vai escrever 100 linhas. Use um laço:</p>`,
      code(`let frutas = ["Maçã", "Uva", "Pera"];

for (let i = 0; i < frutas.length; i++) {
  console.log(i, frutas[i]);
}
// 0 Maçã
// 1 Uva
// 2 Pera`),
      lista(['<code>let i = 0</code>: começa na posição 0', '<code>i &lt; frutas.length</code>: repete <em>enquanto</em> a condição for verdadeira', '<code>i++</code>: ao fim de cada volta, soma 1 em i', 'O bloco entre <code>{ }</code> roda uma vez por volta']),
      code(`for (let i = 0; i < produtos.length; i++) {
  console.log(produtos[i].nome + " - R$ " + produtos[i].preco);
}`, 'Percorrendo a lista de produtos'),
      atencao(`use <code>&lt;</code> e não <code>&lt;=</code>: com <code>i &lt;= length</code> o laço tenta ler uma posição que não existe (<code>undefined</code>).`),
      caderno(['for (início; condição; passo) { ... }', 'i < lista.length percorre do 0 até o último', 'Um laço desenha uma linha da tabela por produto'])),
    P('🔍', 'Prever antes de rodar',
      `<p>Praticar a leitura do código é tão importante quanto escrevê-lo. Faça de cabeça:</p>`,
      code(`let total = 0;
let precos = [10, 20, 30];
for (let i = 0; i < precos.length; i++) {
  total = total + precos[i];
}
console.log(total);`),
      preveja(`qual o valor impresso? Faça uma tabelinha no caderno: em cada volta, anote <code>i</code>, <code>precos[i]</code> e <code>total</code>.`),
      box('verde', `<strong>Resposta:</strong> 60. Volta 0: total = 0 + 10 = 10. Volta 1: 10 + 20 = 30. Volta 2: 30 + 30 = 60. Esse é o cálculo do <strong>total do carrinho</strong>.`)),
  ], [
    Q('Qual é a posição do PRIMEIRO item de um array?', '0', '1', '-1', 'Depende do array'),
    Q('Dado frutas = ["Maçã","Uva","Pera"], o que é frutas[1]?', '"Uva"', '"Maçã"', '"Pera"', 'undefined'),
    Q('Dado o mesmo array, o que é frutas.length?', '3', '2', '4', '0'),
    Q('Qual método adiciona um item no FIM do array?', 'push()', 'add()', 'insert()', 'append()'),
    Q('Como se lê o campo nome de um objeto produto?', 'produto.nome', 'produto(nome)', 'nome.produto()', 'produto->nome'),
    Q('Qual é a estrutura de um objeto?', '{ campo: valor, campo: valor }', '[ valor, valor ]', '( campo = valor )', '< campo valor >'),
    Q('Dado produtos = [{nome:"A"},{nome:"B"}], o que é produtos[1].nome?', '"B"', '"A"', 'undefined', '1'),
    Q('Em for (let i = 0; i < 3; i++), quantas voltas o laço dá?', '3', '2', '4', 'Infinitas'),
    Q('Com precos = [10,20,30], o laço que soma tudo em total imprime:', '60', '30', '10', '0'),
    Q('Por que usar i < lista.length e não i <= lista.length?', 'Porque a última posição é length - 1', 'Porque <= não existe', 'Porque é mais bonito', 'Porque <= é mais lento'),
  ]);

  // ══════════════════════════════════════════════════════
  // 63 — JS: FUNÇÕES
  // ══════════════════════════════════════════════════════
  A(63, 'JavaScript 4: Funções', 'Receitas com nome: parâmetros, retorno e por que organizar o código em funções', '🧩', [
    P('🍳', 'Funções: receitas com nome',
      analogia(`uma função é uma <strong>receita</strong>: você dá um nome, lista os ingredientes (parâmetros) e o passo a passo. Depois, basta "chamar" a receita quando quiser, quantas vezes quiser.`),
      code(`function saudar() {
  console.log("Olá, turma!");
}

saudar();   // chama a função
saudar();   // chama de novo`),
      `<p style="margin-top:12px">Escrever a função <strong>não executa</strong> nada. Ela só roda quando é <strong>chamada</strong>, com os parênteses: <code>saudar()</code>.</p>`,
      caderno(['function nome() { ... } cria a receita', 'nome() executa a receita', 'Sem os parênteses, a função não roda'])),
    P('🥕', 'Parâmetros: os ingredientes',
      code(`function saudar(nome) {
  console.log("Olá, " + nome + "!");
}

saudar("Ana");    // Olá, Ana!
saudar("Beto");   // Olá, Beto!`),
      `<p style="margin-top:12px"><code>nome</code> é um <strong>parâmetro</strong>: uma variável que só existe dentro da função e recebe o valor que você passa ao chamar.</p>`,
      code(`function somar(a, b) {
  return a + b;
}
let resultado = somar(2, 3);
console.log(resultado);   // 5`, 'Mais de um parâmetro e retorno'),
      caderno(['Parâmetros ficam nos parênteses: function somar(a, b)', 'Ao chamar, passamos os valores: somar(2, 3)'])),
    P('📤', 'return: devolver um resultado',
      lista(['<code>console.log</code> <strong>mostra</strong> um valor na tela do console', '<code>return</code> <strong>devolve</strong> o valor para quem chamou, para ser usado depois']),
      code(`function calcularTotal(preco, quantidade) {
  return preco * quantidade;
}

let total = calcularTotal(3.5, 4);
console.log("Total: " + total);   // Total: 14`),
      atencao(`quando o JavaScript encontra um <code>return</code>, a função <strong>termina ali</strong>. Qualquer linha depois dele não roda.`),
      preveja(`o que vale <code>calcularTotal(10, 3)</code>?`),
      caderno(['return devolve o valor e encerra a função', 'Sem return, a função devolve undefined'])),
    P('🧰', 'Por que usar funções?',
      lista(['♻️ <strong>Reaproveitar</strong>: escreve uma vez, usa várias', '🔍 <strong>Achar erros</strong>: cada função faz uma coisa só, fica fácil testar', '📖 <strong>Ler</strong>: o nome da função explica o que ela faz']),
      `<p style="margin-top:12px">No projeto da loja você vai ver funções com nomes que explicam sozinhos:</p>`,
      code(`function salvarProduto() { ... }   // lê o formulário e guarda
function atualizarGrid() { ... }   // desenha a tabela
function excluirProduto(id) { ... } // apaga um produto
function comprar(id) { ... }        // copia para o carrinho`),
      box('verde', `<strong>Regra de ouro:</strong> uma função, uma responsabilidade. Se você precisa de "e" para explicar o que ela faz ("salva <em>e</em> desenha <em>e</em> limpa"), divida em funções menores.`)),
  ], [
    Q('Como se CHAMA a função saudar?', 'saudar()', 'function saudar', 'saudar', 'call saudar'),
    Q('O que acontece se você só escrever a função e nunca chamá-la?', 'Nada: ela não executa', 'Ela executa uma vez', 'Dá erro', 'Ela executa ao abrir o navegador'),
    Q('O que são os parâmetros?', 'Valores que a função recebe para trabalhar', 'Comentários', 'Nomes de arquivos', 'Tipos de tag HTML'),
    Q('O que faz o return?', 'Devolve um valor e encerra a função', 'Repete a função', 'Mostra no console', 'Apaga a variável'),
    Q('Com function somar(a, b) { return a + b; }, quanto é somar(2, 3)?', '5', '23', 'undefined', '"2+3"'),
    Q('Qual a diferença entre console.log e return?', 'log mostra no console; return devolve um valor para ser usado', 'São exatamente iguais', 'return mostra no console', 'log encerra a função'),
    Q('Uma linha escrita DEPOIS de um return dentro da função:', 'Não executa', 'Executa normalmente', 'Executa duas vezes', 'Gera um novo parâmetro'),
    Q('Qual é uma vantagem de usar funções?', 'Reaproveitar código e facilitar a leitura', 'O código fica sempre mais curto que 3 linhas', 'Dispensa testar o código', 'Substitui o HTML'),
    Q('No projeto da loja, qual função desenha a tabela de produtos?', 'atualizarGrid', 'comprar', 'excluirProduto', 'saudar'),
    Q('A regra "uma função, uma responsabilidade" significa:', 'Cada função faz uma coisa só', 'Só pode existir uma função por arquivo', 'Funções não podem chamar outras', 'Toda função precisa de return'),
  ]);

  // ══════════════════════════════════════════════════════
  // 64 — LENDO ERROS E DEPURANDO
  // ══════════════════════════════════════════════════════
  A(64, 'JavaScript 5: Lendo Erros e Depurando', 'O que dizem as mensagens de erro, como achar o bug e como investigar com o console', '🐞', [
    P('🚨', 'Erro não é bronca: é uma pista',
      `<p>Todo programador vê erros todos os dias. A diferença está em <strong>saber lê-los</strong>. Uma mensagem de erro do console diz três coisas:</p>`,
      code(`Uncaught ReferenceError: preco is not defined
    at script.js:7`),
      lista(['<strong>Tipo do erro</strong>: <code>ReferenceError</code>', '<strong>O que aconteceu</strong>: "preco is not defined" (a variável <code>preco</code> não existe)', '<strong>Onde</strong>: <code>script.js</code>, linha <code>7</code>']),
      faca(`Abra o console (F12), digite <code>console.log(preco)</code> sem criar a variável e leia a mensagem inteira.`),
      caderno(['Erro = tipo + o que houve + arquivo e linha', 'Vá direto à linha indicada'])),
    P('📚', 'Os erros mais comuns',
      lista(['<code>ReferenceError: x is not defined</code>: usou uma variável que não existe (erro de digitação no nome, ou esqueceu o <code>let</code>)', '<code>SyntaxError: Unexpected token</code>: faltou ou sobrou um parêntese, chave, vírgula ou aspas', '<code>TypeError: Cannot read properties of null</code>: tentou usar um elemento que o JavaScript <em>não achou</em> (id errado, ou o script rodou antes da página existir)', '<code>TypeError: x is not a function</code>: chamou como função algo que não é função']),
      code(`let nome = "Ana";
console.log(Nome);   // ReferenceError: Nome is not defined
                      // (N maiúsculo é outra variável!)`),
      atencao(`o erro "Cannot read properties of null" é o mais frequente em projetos web. Pergunte sempre: <em>"o id que escrevi no JavaScript é idêntico ao do HTML?"</em>`),
      caderno(['ReferenceError = nome não existe (confira a grafia)', 'SyntaxError = faltou fechar algo', 'TypeError com null = elemento não encontrado (confira o id)'])),
    P('🔬', 'Investigar com console.log',
      `<p>Quando o código roda mas <strong>faz coisa errada</strong>, não há mensagem de erro. Aí você precisa <em>olhar dentro</em>:</p>`,
      code(`function calcularTotal(lista) {
  let total = 0;
  for (let i = 0; i < lista.length; i++) {
    console.log("volta", i, "preço", lista[i].preco, "total", total);
    total = total + lista[i].preco;
  }
  return total;
}`),
      `<p style="margin-top:12px">Ao ver os valores a cada volta, você descobre <strong>onde</strong> o resultado sai diferente do que esperava. Depois de achar o bug, apague os <code>console.log</code> de teste.</p>`,
      code(`console.log(typeof preco, preco);   // "string" "10"  ← aqui está o problema!`, 'Truque: descobrir o tipo de uma variável'),
      caderno(['Sem erro mas resultado errado: console.log dentro do código', 'Veja o VALOR e o TIPO das variáveis', 'Ache o primeiro ponto em que o valor deixa de ser o esperado'])),
    P('🔎', 'Achar o erro no código',
      `<p>Este código deveria somar os preços da lista, mas mostra <code>"01020"</code> em vez de <code>30</code>. Procure o problema:</p>`,
      code(`let precos = ["10", "20"];
let total = 0;
for (let i = 0; i < precos.length; i++) {
  total = total + precos[i];
}
console.log(total);`),
      preveja(`por que o resultado é um texto e não um número? Lembre do que o <code>+</code> faz quando um dos lados é texto.`),
      box('verde', `<strong>Resposta:</strong> os preços estão entre aspas (são <strong>texto</strong>). <code>0 + "10"</code> vira <code>"010"</code> e depois <code>"010" + "20"</code> vira <code>"01020"</code>. A correção é converter: <code>total = total + Number(precos[i]);</code>.`)),
    P('🧭', 'Método para resolver qualquer bug',
      lista(['1️⃣ <strong>Leia</strong> a mensagem de erro (ou descreva o que esperava × o que aconteceu)', '2️⃣ <strong>Localize</strong> a linha', '3️⃣ <strong>Investigue</strong> com <code>console.log</code>', '4️⃣ <strong>Mude uma coisa só</strong> e teste de novo', '5️⃣ <strong>Explique</strong> o bug com suas palavras: o que estava errado e por quê']),
      box('amarelo', `<strong>Peça ajuda do jeito certo:</strong> mostre ao professor ou ao colega <em>a mensagem de erro</em>, <em>a linha</em> e <em>o que você já tentou</em>. "Não funciona" não ajuda ninguém.`)),
  ], [
    Q('O que uma mensagem de erro do console informa?', 'O tipo do erro, o que houve e a linha', 'Apenas que algo deu errado', 'A solução pronta', 'O nome do aluno'),
    Q('ReferenceError: nome is not defined significa:', 'A variável nome não existe', 'O texto está sem aspas', 'Faltou um parêntese', 'O navegador está desatualizado'),
    Q('SyntaxError normalmente indica:', 'Faltou ou sobrou um sinal, como parêntese, chave ou aspas', 'Uma variável com o nome errado', 'Elemento não encontrado', 'Falta de internet'),
    Q('TypeError: Cannot read properties of null geralmente quer dizer:', 'O JavaScript não achou o elemento (id errado, por exemplo)', 'Faltou um ponto e vírgula', 'A imagem não carregou', 'O CSS está errado'),
    Q('Para descobrir o que há dentro de uma variável, você usa:', 'console.log(variavel)', 'alert(variavel)()', 'return console', 'delete variavel'),
    Q('O código roda sem erro, mas o resultado está errado. O que fazer primeiro?', 'Colocar console.log para ver os valores', 'Apagar o código todo', 'Reiniciar o computador', 'Trocar de navegador'),
    Q('Por que ["10","20"] somado com + dá "01020"?', 'Porque os valores são texto e o + junta', 'Porque o array está quebrado', 'Porque 0 não pode ser somado', 'Porque o for está errado'),
    Q('Qual é a forma correta de pedir ajuda?', 'Mostrar a mensagem de erro, a linha e o que já tentou', 'Dizer só que não funciona', 'Pedir o código pronto', 'Mandar print sem contexto'),
  ]);

  // ══════════════════════════════════════════════════════
  // 65 — DOM 1
  // ══════════════════════════════════════════════════════
  A(65, 'DOM 1: A Página por Dentro', 'A árvore de elementos e como o JavaScript encontra um elemento pelo id ou seletor', '🌳', [
    P('🌳', 'O que é o DOM',
      `<p>Quando o navegador lê o HTML, ele monta na memória uma <strong>árvore de objetos</strong>: o <strong>DOM</strong> (<em>Document Object Model</em>). O JavaScript não mexe no arquivo HTML: ele mexe nessa árvore, e a tela se atualiza.</p>`,
      code(`<body>
  <h1 id="titulo">Loja</h1>
  <ul id="lista">
    <li>Caneta</li>
    <li>Caderno</li>
  </ul>
</body>

body
 ├── h1#titulo
 └── ul#lista
      ├── li  "Caneta"
      └── li  "Caderno"`, 'O HTML e a árvore que o navegador monta'),
      analogia(`o HTML é a <em>planta</em> da casa. O DOM é a <em>casa construída</em>. Quem reforma é o JavaScript, e a reforma aparece na hora.`),
      faca(`Abra uma página, aperte F12 e olhe a aba <strong>Elements</strong>. Ela mostra o DOM, não o arquivo original.`),
      caderno(['DOM = árvore de elementos montada pelo navegador', 'JavaScript altera o DOM, e a tela muda na hora'])),
    P('🎯', 'Achar um elemento pelo id',
      `<p>Antes de mudar um elemento, é preciso <strong>achá-lo</strong>:</p>`,
      code(`let titulo = document.getElementById("titulo");
console.log(titulo);          // mostra o elemento <h1>`),
      lista(['<code>document</code>: a página inteira', '<code>getElementById("titulo")</code>: "me dê o elemento cujo id é titulo"', 'O resultado fica guardado na variável <code>titulo</code>']),
      atencao(`o texto entre aspas precisa ser <strong>idêntico</strong> ao <code>id</code> do HTML, respeitando maiúsculas. Se não achar, o resultado é <code>null</code> e o próximo comando dará o erro "Cannot read properties of null".`),
      caderno(['document.getElementById("id") acha um elemento', 'id escrito diferente = null = erro'])),
    P('🔍', 'querySelector: achar por qualquer seletor CSS',
      code(`document.querySelector("#titulo");      // por id (com #)
document.querySelector(".destaque");    // primeiro com class
document.querySelector("ul li");        // primeiro li dentro de ul

document.querySelectorAll("li");        // TODOS os li (uma lista)`),
      `<p style="margin-top:12px"><code>querySelector</code> usa a <strong>mesma sintaxe do CSS</strong> (<code>#</code> para id, <code>.</code> para classe). Ele devolve <em>o primeiro</em> que achar. <code>querySelectorAll</code> devolve <em>todos</em>.</p>`,
      preveja(`na árvore acima, quantos elementos devolve <code>querySelectorAll("li")</code>? E o que é <code>querySelector("li")</code>?`)),
    P('📥', 'Ler o que o usuário digitou',
      code(`<input type="text" id="nome">
<button id="btn">Mostrar</button>

<script>
  let campo = document.getElementById("nome");
  console.log(campo.value);   // o que está digitado no campo
</script>`),
      `<p style="margin-top:12px">Para campos de formulário, o texto digitado fica em <code>.value</code>.</p>`,
      atencao(`lembra? <code>.value</code> sempre devolve <strong>texto</strong>, mesmo em <code>type="number"</code>. Para calcular, use <code>Number(campo.value)</code>.`),
      code(`let preco = Number(document.getElementById("preco").value);`),
      caderno(['campo.value = o que foi digitado (sempre texto)', 'Number(campo.value) para usar como número'])),
  ], [
    Q('O que é o DOM?', 'A árvore de elementos que o navegador monta a partir do HTML', 'Uma linguagem de programação', 'Um tipo de arquivo de imagem', 'Um programa antivírus'),
    Q('Qual comando acha o elemento com id="titulo"?', 'document.getElementById("titulo")', 'document.get("titulo")', 'find("#titulo")', 'document.titulo()'),
    Q('O que acontece se o id procurado não existir?', 'O resultado é null', 'O navegador cria o elemento', 'O resultado é 0', 'A página fecha'),
    Q('Como o querySelector escolhe um elemento com class="destaque"?', 'querySelector(".destaque")', 'querySelector("destaque")', 'querySelector("#destaque")', 'querySelector(destaque)'),
    Q('Qual método devolve TODOS os elementos que combinam com o seletor?', 'querySelectorAll', 'querySelector', 'getElementById', 'getAll'),
    Q('Onde fica o texto digitado em um input?', 'Na propriedade .value', 'Na propriedade .text', 'Em .digitado', 'Em .id'),
    Q('Que tipo de dado vem de input.value, mesmo em type="number"?', 'Texto (string)', 'Número', 'Booleano', 'Objeto'),
    Q('Como obter o número do campo preco?', 'Number(document.getElementById("preco").value)', 'document.getElementById("preco")', 'getElementById("preco").number', 'value("preco")'),
    Q('O JavaScript, ao mexer no DOM, altera:', 'A árvore em memória, e a tela atualiza', 'O arquivo .html no disco', 'O servidor', 'O sistema operacional'),
  ]);

  // ══════════════════════════════════════════════════════
  // 66 — DOM 2
  // ══════════════════════════════════════════════════════
  A(66, 'DOM 2: Mudando e Criando Elementos', 'Alterar textos e estilos, ligar e desligar classes e criar elementos a partir de dados', '🛠️', [
    P('✏️', 'Mudar o texto de um elemento',
      code(`let titulo = document.getElementById("titulo");

titulo.textContent = "Loja do Beto";   // troca o texto`),
      `<p style="margin-top:12px"><code>textContent</code> troca <strong>só o texto</strong>. É a forma mais segura quando o texto vem de um usuário.</p>`,
      faca(`Em uma página com um <code>h1</code> de id "titulo", rode no console o comando acima e veja o título mudar sem recarregar.`),
      caderno(['elemento.textContent = "novo texto"', 'Muda só o texto, sem interpretar HTML'])),
    P('🧱', 'textContent × innerHTML',
      code(`let caixa = document.getElementById("caixa");

caixa.textContent = "<b>Olá</b>";   // aparece literalmente: <b>Olá</b>
caixa.innerHTML   = "<b>Olá</b>";   // vira negrito: Olá`),
      lista(['<code>textContent</code>: trata tudo como texto', '<code>innerHTML</code>: <strong>interpreta HTML</strong> (permite montar estrutura: cards, linhas de tabela)']),
      atencao(`<code>innerHTML</code> com dados digitados por usuários pode permitir injeção de código. Em projetos reais, escape o texto ou use <code>textContent</code>. Na aula usamos <code>innerHTML</code> para montar a tabela com dados que <em>nós mesmos</em> cadastramos.`),
      caderno(['textContent = texto puro (seguro)', 'innerHTML = interpreta HTML (monta estruturas)'])),
    P('🎨', 'Mudar estilos e classes',
      code(`let caixa = document.getElementById("caixa");

caixa.style.color = "red";            // estilo direto
caixa.style.backgroundColor = "#222"; // propriedades com hífen viram camelCase

caixa.classList.add("destaque");      // liga a classe
caixa.classList.remove("destaque");   // desliga
caixa.classList.toggle("destaque");   // liga se estava desligada e vice-versa`),
      `<p style="margin-top:12px">O melhor jeito é definir a aparência <strong>no CSS</strong> (uma classe) e apenas <strong>ligar ou desligar a classe</strong> pelo JavaScript. Assim o CSS continua separado do comportamento.</p>`,
      code(`.destaque { background: yellow; font-weight: bold; }`, 'No CSS'),
      caderno(['elemento.style.propriedade = valor', 'classList.add / remove / toggle', 'CSS define a aparência, JS liga e desliga a classe'])),
    P('🏗️', 'Criar elementos com dados',
      `<p>É assim que uma lista de dados vira tela:</p>`,
      code(`let produtos = ["Caneta", "Caderno", "Lápis"];
let lista = document.getElementById("lista");

lista.innerHTML = "";                       // limpa antes de desenhar

for (let i = 0; i < produtos.length; i++) {
  let li = document.createElement("li");    // cria <li>
  li.textContent = produtos[i];             // coloca o texto
  lista.appendChild(li);                    // pendura na lista
}`),
      lista(['<code>createElement("li")</code>: cria o elemento (solto, ainda invisível)', '<code>appendChild(li)</code>: coloca dentro de outro (aí ele aparece)']),
      code(`let html = "";
for (let i = 0; i < produtos.length; i++) {
  html += §<li>€{produtos[i]}</li>§;
}
lista.innerHTML = html;`, 'O mesmo, montando um texto HTML com crases'),
      preveja(`se a lista tem 3 produtos, quantos <code>li</code> aparecem? E se eu esquecer de limpar com <code>innerHTML = ""</code> e chamar o desenho duas vezes?`),
      caderno(['Receita de "desenhar dados": limpar → percorrer → criar → pendurar', 'Esquecer de limpar duplica os itens'])),
  ], [
    Q('Qual propriedade troca apenas o texto de um elemento?', 'textContent', 'style', 'classList', 'id'),
    Q('Qual é a diferença entre textContent e innerHTML?', 'innerHTML interpreta HTML; textContent trata como texto', 'São idênticos', 'textContent interpreta HTML', 'innerHTML só funciona em botões'),
    Q('Como ligar uma classe CSS pelo JavaScript?', 'elemento.classList.add("nome")', 'elemento.class = "nome"', 'elemento.css("nome")', 'classList("nome")'),
    Q('Qual comando liga a classe se estava desligada e desliga se estava ligada?', 'classList.toggle', 'classList.add', 'classList.remove', 'classList.change'),
    Q('Como o JavaScript escreve a propriedade CSS background-color?', 'style.backgroundColor', 'style.background-color', 'style.BackgroundColor', 'style.color-background'),
    Q('Qual comando CRIA um novo elemento li?', 'document.createElement("li")', 'document.new("li")', 'createLi()', 'document.li()'),
    Q('Para o elemento criado aparecer na página é preciso:', 'Colocá-lo dentro de outro elemento com appendChild', 'Apenas criá-lo', 'Reiniciar o navegador', 'Escrever seu id no CSS'),
    Q('Por que limpar o conteúdo (innerHTML = "") antes de desenhar a lista?', 'Para não duplicar os itens a cada desenho', 'Porque o navegador exige', 'Para acelerar a internet', 'Não é necessário, nunca duplica'),
    Q('Qual é a melhor prática para mudar a aparência pelo JavaScript?', 'Ligar/desligar uma classe definida no CSS', 'Escrever todos os estilos no JavaScript', 'Apagar o CSS', 'Usar sempre innerHTML'),
  ]);

  // ══════════════════════════════════════════════════════
  // 67 — EVENTOS
  // ══════════════════════════════════════════════════════
  A(67, 'DOM 3: Eventos, a Página que Reage', 'Clique, digitação e envio: como ligar uma função a uma ação do usuário', '👆', [
    P('👆', 'O que é um evento',
      `<p>Um <strong>evento</strong> é algo que acontece na página: um clique, uma tecla, o envio de um formulário. O JavaScript pode ficar <strong>"escutando"</strong> e executar uma função quando isso acontecer.</p>`,
      analogia(`a campainha de casa: você não fica olhando a porta o tempo todo. Quando alguém aperta (evento), o som toca e você vai atender (função).`),
      code(`let botao = document.getElementById("btn");

botao.addEventListener("click", function () {
  console.log("Clicou!");
});`),
      lista(['<code>addEventListener</code>: "fique escutando"', '<code>"click"</code>: qual evento', 'A função: o que fazer quando acontecer']),
      caderno(['elemento.addEventListener("click", função)', 'Evento = algo que acontece · função = o que fazer'])),
    P('🔗', 'Ligando o botão a uma função do projeto',
      code(`function salvarProduto() {
  let nome = document.getElementById("nome").value;
  console.log("Salvando", nome);
}

document.getElementById("btnSalvar").addEventListener("click", salvarProduto);`),
      atencao(`ao passar a função para o <code>addEventListener</code> escreva <code>salvarProduto</code> <strong>sem parênteses</strong>. Com parênteses (<code>salvarProduto()</code>) a função roda <em>na hora</em>, e não no clique.`),
      preveja(`o que acontece se eu escrever <code>addEventListener("click", salvarProduto())</code>?`),
      caderno(['Passe a função SEM parênteses: salvarProduto', 'Com parênteses ela roda imediatamente, não no clique'])),
    P('⌨️', 'Outros eventos úteis',
      lista(['<code>"click"</code>: clique', '<code>"input"</code>: a cada letra digitada em um campo', '<code>"change"</code>: quando o valor muda (select, checkbox)', '<code>"submit"</code>: envio de um formulário', '<code>"keydown"</code>: tecla pressionada']),
      code(`document.getElementById("busca").addEventListener("input", function () {
  let texto = document.getElementById("busca").value;
  console.log("Digitou:", texto);
});`, 'Busca em tempo real'),
      code(`formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();   // impede recarregar a página
  salvarProduto();
});`, 'Formulário sem recarregar a página'),
      caderno(['input = a cada digitação · change = ao mudar · submit = envio', 'event.preventDefault() impede o recarregamento do formulário'])),
    P('🧪', 'Juntando tudo: contador de cliques',
      code(`<button id="btn">Clique</button>
<p>Cliques: <span id="total">0</span></p>

<script>
  let contador = 0;
  let botao = document.getElementById("btn");
  let total = document.getElementById("total");

  botao.addEventListener("click", function () {
    contador = contador + 1;
    total.textContent = contador;
  });
</script>`),
      `<p style="margin-top:12px">Repare no padrão que usaremos o projeto todo: <strong>(1)</strong> o evento dispara, <strong>(2)</strong> a função muda os <em>dados</em> (<code>contador</code>) e <strong>(3)</strong> a função <em>redesenha a tela</em> (<code>textContent</code>).</p>`,
      faca(`Digite o contador completo e acrescente um segundo botão "Zerar" que volta o contador para 0.`),
      caderno(['Padrão: evento → muda os dados → redesenha a tela'])),
  ], [
    Q('O que é um evento?', 'Algo que acontece na página, como um clique', 'Um tipo de variável', 'Uma tag HTML', 'Um erro do console'),
    Q('Qual método fica "escutando" um evento?', 'addEventListener', 'getElementById', 'createElement', 'appendChild'),
    Q('Como se escreve o nome do evento de clique?', '"click"', '"clicar"', '"onclique"', '"press"'),
    Q('Ao passar uma função para addEventListener, devemos escrever:', 'O nome sem parênteses', 'O nome com parênteses', 'Apenas parênteses', 'O nome entre aspas'),
    Q('Se escrevermos addEventListener("click", salvar()), o que acontece?', 'salvar roda imediatamente, e não no clique', 'Funciona normalmente', 'O botão some', 'Nada acontece'),
    Q('Qual evento dispara a cada letra digitada?', '"input"', '"submit"', '"load"', '"click"'),
    Q('Para que serve event.preventDefault() em um submit?', 'Impedir que a página recarregue', 'Apagar o formulário', 'Enviar duas vezes', 'Fechar o navegador'),
    Q('No contador de cliques, quando a tela é atualizada?', 'Quando mudamos o textContent do span', 'Automaticamente ao mudar a variável', 'Ao recarregar a página', 'Nunca'),
    Q('Qual é o padrão usado em todo o projeto?', 'Evento, mudar os dados, redesenhar a tela', 'Desenhar, depois mudar os dados', 'Redesenhar sem mudar os dados', 'Mudar o HTML no arquivo'),
  ]);

  // ══════════════════════════════════════════════════════
  // 68 — LOCALSTORAGE 1
  // ══════════════════════════════════════════════════════
  A(68, 'localStorage 1: A Gaveta do Navegador', 'Guardar, ler e apagar dados no navegador com setItem, getItem e removeItem', '🗄️', [
    P('🗄️', 'O que é o localStorage',
      `<p>Variáveis somem quando a página recarrega. Para <strong>guardar dados</strong> mesmo depois de fechar o navegador, usamos o <strong>localStorage</strong>.</p>`,
      analogia(`uma <strong>gaveta com etiquetas</strong>. Cada gaveta tem um nome (<strong>chave</strong>) e guarda um conteúdo (<strong>valor</strong>). Para pegar algo, você abre a gaveta pelo nome.`),
      code(`localStorage.setItem("nome", "Ana");        // guarda
let n = localStorage.getItem("nome");        // lê
console.log(n);                              // Ana
localStorage.removeItem("nome");             // apaga uma gaveta`),
      lista(['<code>setItem(chave, valor)</code>: guarda (se a chave já existe, <strong>substitui</strong>)', '<code>getItem(chave)</code>: devolve o valor, ou <code>null</code> se a gaveta não existe', '<code>removeItem(chave)</code>: apaga a gaveta']),
      caderno(['localStorage = gaveta do navegador (chave → valor)', 'setItem guarda · getItem lê · removeItem apaga', 'Fica guardado mesmo fechando o navegador'])),
    P('👀', 'Vendo a gaveta por dentro',
      `<p>Aperte <strong>F12 → aba Application → Local Storage → o endereço da página</strong>. Você verá uma tabela com <strong>Key</strong> e <strong>Value</strong>: é a gaveta.</p>`,
      faca(`No console, rode <code>localStorage.setItem("curso", "Programação Web")</code> e depois olhe a aba Application. Altere o valor direto na tabela e leia de novo com <code>getItem</code>.`),
      atencao(`o localStorage é <strong>do navegador de quem usa</strong>: está no computador do aluno, e não no servidor. Outro navegador, ou outro computador, tem a sua própria gaveta. E dados importantes ou secretos (senhas) <strong>nunca</strong> devem ficar nele.`),
      caderno(['F12 → Application → Local Storage mostra as gavetas', 'Cada navegador tem a sua gaveta', 'Nunca guarde senhas no localStorage'])),
    P('🔤', 'A gaveta só guarda texto',
      `<p>Esta é a regra mais importante do localStorage: <strong>tudo que entra vira texto</strong>.</p>`,
      code(`localStorage.setItem("idade", 15);
console.log(typeof localStorage.getItem("idade"));   // "string"

localStorage.setItem("lista", ["Uva", "Pera"]);
console.log(localStorage.getItem("lista"));           // "Uva,Pera"  (texto!)

let objeto = { nome: "Caneta" };
localStorage.setItem("produto", objeto);
console.log(localStorage.getItem("produto"));         // "[object Object]"  (inútil)`),
      `<p style="margin-top:12px">Números viram texto, arrays viram "Uva,Pera" e objetos viram <code>"[object Object]"</code>, o que <strong>perde as informações</strong>. A solução está na próxima aula: <strong>JSON</strong>.</p>`,
      preveja(`depois de guardar <code>10</code> na chave "x", qual o resultado de <code>localStorage.getItem("x") + 5</code>?`),
      caderno(['Tudo que entra no localStorage vira texto', 'Objeto direto vira "[object Object]": perde tudo', 'Solução: JSON (próxima aula)'])),
    P('🔑', 'Chaves únicas e substituição',
      code(`localStorage.setItem("p1", "Caneta");
localStorage.setItem("p1", "Lápis");     // mesma chave: SUBSTITUI
console.log(localStorage.getItem("p1")); // Lápis

console.log(localStorage.getItem("zzz"));  // null (não existe)
console.log(localStorage.length);           // quantas gavetas existem`),
      `<p style="margin-top:12px">Por isso o nosso projeto dá a cada produto um <strong>id único</strong> (algo como <code>p3f2a...</code>): uma chave diferente para cada gaveta.</p>`,
      atencao(`<code>getItem</code> de uma chave que não existe devolve <code>null</code>. Sempre confira antes de usar: <code>if (valor !== null) { ... }</code>.`)),
  ], [
    Q('Para que serve o localStorage?', 'Guardar dados no navegador, mesmo depois de fechar a página', 'Enviar e-mails', 'Mudar as cores da página', 'Criar tabelas HTML'),
    Q('Qual comando GUARDA um dado?', 'localStorage.setItem(chave, valor)', 'localStorage.getItem(chave)', 'localStorage.removeItem(chave)', 'localStorage.look(chave)'),
    Q('Qual comando LÊ um dado?', 'localStorage.getItem(chave)', 'localStorage.setItem(chave)', 'localStorage.read(chave)', 'localStorage.put(chave)'),
    Q('O que getItem devolve quando a chave não existe?', 'null', 'undefined', '0', 'Uma string vazia'),
    Q('Se guardar com setItem("x", 10), o tipo lido com getItem("x") é:', 'string (texto)', 'number', 'boolean', 'object'),
    Q('Onde estão guardados os dados do localStorage?', 'No navegador de quem usa a página', 'No servidor da escola', 'No monitor', 'Na internet, para todos'),
    Q('O que acontece ao usar setItem com uma chave que já existe?', 'O valor antigo é substituído', 'Cria uma segunda cópia', 'Dá erro', 'Nada acontece'),
    Q('Por que é um problema guardar um objeto direto no localStorage?', 'Ele vira "[object Object]" e perde os dados', 'O localStorage não aceita texto', 'Fica muito pesado', 'O navegador trava'),
    Q('Por que NUNCA guardar senhas no localStorage?', 'Qualquer pessoa com acesso ao navegador pode lê-las', 'Porque senhas não cabem na gaveta', 'Porque o localStorage apaga tudo toda hora', 'Porque o JavaScript proíbe'),
    Q('Onde se pode ver o localStorage no navegador?', 'F12 → Application → Local Storage', 'F12 → Console → Fonts', 'Configurações do Windows', 'Menu Iniciar'),
  ]);

  // ══════════════════════════════════════════════════════
  // 69 — JSON E PERCORRER A GAVETA
  // ══════════════════════════════════════════════════════
  A(69, 'localStorage 2: JSON e Percorrer as Gavetas', 'Embalar e desembalar objetos com JSON e ler todas as chaves com um laço', '📦', [
    P('📦', 'JSON.stringify: embalar para guardar',
      `<p>O <strong>JSON</strong> é um formato de texto que representa objetos e arrays. Como a gaveta só guarda texto, nós <strong>embalamos</strong> o objeto antes de guardar:</p>`,
      code(`let produto = { id: "p1", nome: "Caneta", preco: 3.5 };

let texto = JSON.stringify(produto);
console.log(texto);
// '{"id":"p1","nome":"Caneta","preco":3.5}'

localStorage.setItem("p1", texto);`),
      analogia(`o objeto é uma <strong>cadeira montada</strong>, que não cabe na gaveta. O <code>stringify</code> <em>desmonta e embala</em> em uma caixa plana (texto) que cabe.`),
      caderno(['JSON.stringify(objeto) → texto', 'Sempre embale ANTES de setItem'])),
    P('🎁', 'JSON.parse: desembalar para usar',
      code(`let texto = localStorage.getItem("p1");   // '{"id":"p1","nome":"Caneta",...}'
let produto = JSON.parse(texto);          // volta a ser objeto

console.log(produto.nome);                // Caneta
console.log(produto.preco + 1);           // 4.5  (número de verdade!)`),
      `<p style="margin-top:12px">Quando você lê da gaveta, o que vem é <em>a caixa</em>. O <code>parse</code> <strong>monta a cadeira de novo</strong>, e então você consegue usar <code>produto.nome</code>.</p>`,
      atencao(`ao lado do JSON, os <strong>números continuam números</strong> e os booleanos continuam booleanos. Já os campos que vierem de formulário continuam texto, a menos que você converta com <code>Number()</code> antes de guardar.`),
      caderno(['JSON.parse(texto) → objeto de volta', 'Ao guardar: stringify · ao ler: parse'])),
    P('✍️', 'Explique com as suas palavras',
      `<p>Para fixar, escreva no caderno uma explicação curta (<strong>sem copiar da tela</strong>) respondendo:</p>`,
      lista(['1. Por que não podemos guardar um objeto direto no localStorage?', '2. O que o <code>JSON.stringify</code> faz?', '3. O que o <code>JSON.parse</code> faz e quando usamos?']),
      box('verde', `<strong>Autoverificação:</strong> se a sua explicação cita <em>"a gaveta só guarda texto"</em>, <em>"stringify transforma o objeto em texto"</em> e <em>"parse devolve o objeto"</em>, você entendeu o ponto central do projeto.`),
      box('amarelo', `Se você não conseguiu explicar, volte aos dois passos anteriores. Não siga adiante só copiando o código.`)),
    P('🔁', 'Percorrer todas as gavetas',
      `<p>No projeto, cada produto é uma gaveta diferente. Para <strong>listar todos</strong>, percorremos todas as chaves:</p>`,
      code(`for (let i = 0; i < localStorage.length; i++) {
  let chave = localStorage.key(i);          // nome da gaveta número i
  let valor = localStorage.getItem(chave);  // conteúdo
  console.log(chave, valor);
}`),
      lista(['<code>localStorage.length</code>: quantas gavetas existem', '<code>localStorage.key(i)</code>: o <em>nome</em> da gaveta na posição i']),
      preveja(`se houver 3 gavetas, quais valores de <code>i</code> o laço usa? (lembre que a contagem começa em 0)`),
      caderno(['localStorage.length = quantidade de gavetas', 'localStorage.key(i) = nome da gaveta da posição i', 'Laço: for (i = 0; i < localStorage.length; i++)'])),
    P('🏷️', 'Etiquetas p e c: produtos e carrinho',
      `<p>No localStorage da nossa loja moram <strong>duas famílias de gavetas</strong>, separadas pela <strong>primeira letra da chave</strong>:</p>`,
      lista(['🔵 <strong>p</strong> + id: um <strong>produto</strong> cadastrado (<code>p3f2a...</code>)', '🟢 <strong>c</strong> + id: o item no <strong>carrinho</strong> (<code>c3f2a...</code>)']),
      code(`let chave = localStorage.key(i);

if (chave[0] === "p") {
  // é um produto → desenha na tabela de produtos
}
if (chave[0] === "c") {
  // é um item do carrinho → desenha no carrinho
}`, 'Separando as duas famílias com a primeira letra'),
      atencao(`sem esse <code>if</code> o laço mistura tudo: produtos e carrinho aparecem juntos na tabela. Esse é um dos bugs clássicos do projeto.`),
      `<p style="margin-top:12px">A chave do carrinho é feita a partir da do produto: <code>"c" + id.slice(1)</code>. O <code>slice(1)</code> descarta a primeira letra (o "p") e mantém o resto do id.</p>`,
      caderno(['Chave começando com p = produto · começando com c = carrinho', 'chave[0] é a primeira letra', '"c" + id.slice(1) troca o p por c'])),
  ], [
    Q('O que JSON.stringify faz?', 'Transforma um objeto em texto', 'Transforma texto em objeto', 'Apaga o objeto', 'Soma números'),
    Q('O que JSON.parse faz?', 'Transforma o texto JSON de volta em objeto', 'Guarda no localStorage', 'Transforma objeto em texto', 'Cria uma variável nova'),
    Q('Antes de guardar um objeto no localStorage, devemos:', 'Usar JSON.stringify', 'Usar JSON.parse', 'Apagar o localStorage', 'Usar innerHTML'),
    Q('Depois de ler um produto com getItem, para usar produto.nome devemos:', 'Usar JSON.parse', 'Usar JSON.stringify', 'Nada, já é objeto', 'Usar removeItem'),
    Q('O que representa localStorage.length?', 'A quantidade de gavetas guardadas', 'O tamanho de cada valor', 'O número de abas abertas', 'O tempo de uso'),
    Q('Qual comando devolve o NOME da gaveta na posição i?', 'localStorage.key(i)', 'localStorage.getItem(i)', 'localStorage.name(i)', 'localStorage[i].key'),
    Q('Num projeto com chaves p… e c…, o que chave[0] === "p" identifica?', 'Um produto', 'Um item do carrinho', 'Um erro', 'Uma senha'),
    Q('Como se monta a chave do carrinho a partir do id do produto p123?', '"c" + id.slice(1)', '"c" + id', 'id + "c"', 'id.slice(0) + "p"'),
    Q('O que acontece se percorrer a gaveta SEM separar por p e c?', 'Produtos e carrinho aparecem misturados', 'Nada, funciona igual', 'O navegador fecha', 'Os dados são apagados'),
    Q('Qual é a ideia por trás de usar a primeira letra da chave?', 'Separar famílias de dados na mesma gaveta', 'Deixar a chave mais curta', 'Criptografar os dados', 'Evitar usar o JSON'),
  ]);

  // ══════════════════════════════════════════════════════
  // 70 — PROJETO 1: CADASTRO E GRID
  // ══════════════════════════════════════════════════════
  A(70, 'Projeto 1: Cadastrar e Listar Produtos', 'Salvar o formulário no localStorage e redesenhar a tabela de produtos (atualizarGrid)', '🧾', [
    P('🗺️', 'O mapa do projeto',
      `<p>O sistema tem três páginas que <strong>compartilham a mesma gaveta</strong>:</p>`,
      lista(['🧾 <strong>Gerenciar</strong>: cadastra, altera e exclui produtos (família <code>p</code>)', '🛍️ <strong>Loja</strong>: mostra os produtos em cards e tem o botão Comprar', '🛒 <strong>Carrinho</strong>: mostra os itens comprados (família <code>c</code>)']),
      box('roxo', `<strong>Ideia central:</strong> a tela <em>não guarda nada</em>. Quem guarda é o localStorage. A tela só <strong>lê</strong> a gaveta e <strong>desenha</strong>. Por isso as três páginas ficam sempre iguais, sem copiar dados entre elas.`),
      caderno(['Gerenciar, Loja e Carrinho leem a MESMA gaveta', 'Tela só desenha · quem guarda é o localStorage', 'Fluxo: gravar → ler → percorrer → desenhar'])),
    P('💾', 'Salvar o produto',
      code(`function salvarProduto() {
  let nome  = document.getElementById("nome").value;
  let preco = Number(document.getElementById("preco").value);

  if (nome === "" || preco <= 0) {
    alert("Preencha o nome e um preço válido");
    return;
  }

  let id = "p" + Date.now();                       // id único (p + horário)
  let produto = { id: id, nome: nome, preco: preco };

  localStorage.setItem(id, JSON.stringify(produto)); // embala e guarda

  limparFormulario();
  atualizarGrid();                                   // redesenha a tabela
}`),
      lista(['<strong>1.</strong> lê os campos (e converte o preço)', '<strong>2.</strong> valida: se faltar algo, avisa e <code>return</code> encerra a função', '<strong>3.</strong> cria o id (<code>"p"</code> + horário em milissegundos)', '<strong>4.</strong> monta o objeto e guarda com <code>stringify</code>', '<strong>5.</strong> limpa o formulário e <strong>redesenha</strong>']),
      preveja(`por que o id começa com <code>"p"</code>? (pense em como a Loja vai separar produtos do carrinho)`)),
    P('🖼️', 'Ler a função completa: atualizarGrid',
      code(`function atualizarGrid() {
  let tabela = document.getElementById("tabela");
  tabela.innerHTML = "";                         // 1. limpa

  for (let i = 0; i < localStorage.length; i++) { // 2. percorre as gavetas
    let chave = localStorage.key(i);
    if (chave[0] !== "p") continue;               // 3. só produtos

    let produto = JSON.parse(localStorage.getItem(chave)); // 4. desembala

    tabela.innerHTML += §
      <tr>
        <td>€{produto.nome}</td>
        <td>R$ €{produto.preco.toFixed(2)}</td>
        <td><button onclick="excluirProduto('€{chave}')">Excluir</button></td>
      </tr>§;                                       // 5. desenha a linha
  }
}`),
      lista(['<code>continue</code>: pula para a próxima volta (ignora o que não é produto)', '<code>toFixed(2)</code>: mostra o preço com 2 casas decimais', 'A cada linha, o botão carrega a <strong>chave</strong> do produto']),
      faca(`Numere no caderno os 5 comentários do código e escreva, em uma frase cada, <em>o que acontece</em> e <em>o que quebraria se aquela linha fosse apagada</em>.`),
      caderno(['atualizarGrid = limpa → percorre → filtra p → parse → desenha', 'Chamar atualizarGrid() ao abrir a página e depois de cada mudança'])),
    P('🚀', 'Mostrar os dados ao abrir a página',
      code(`atualizarGrid();   // última linha do script.js`),
      `<p style="margin-top:12px">Se você esquecer essa chamada, o cadastro funciona, mas ao <strong>recarregar</strong> a tabela aparece vazia (os dados estão na gaveta, só não foram desenhados).</p>`,
      atencao(`os dados continuam no localStorage; o que se perdeu foi só o <strong>desenho</strong>. Tela e dados são coisas diferentes: a tela precisa ser refeita a partir dos dados sempre que a página abre.`),
      preveja(`você cadastra 3 produtos, fecha o navegador e abre de novo. Quantos produtos aparecem se o script chama <code>atualizarGrid()</code> ao final? E se não chamar?`)),
  ], [
    Q('Quem GUARDA os dados no sistema da loja?', 'O localStorage', 'A tela (HTML)', 'O CSS', 'O monitor'),
    Q('Qual é o fluxo básico de todas as telas?', 'Gravar, ler, percorrer e desenhar', 'Desenhar, apagar e fechar', 'Percorrer, apagar e gravar', 'Ler sem desenhar'),
    Q('Por que o id do produto começa com "p"?', 'Para separá-lo dos itens do carrinho (c)', 'Porque o JavaScript exige', 'Para ficar mais curto', 'Por acaso, não tem função'),
    Q('O que faz o return dentro do if da validação do salvarProduto?', 'Encerra a função antes de guardar', 'Guarda duas vezes', 'Recarrega a página', 'Apaga o formulário'),
    Q('Por que usar JSON.stringify ao guardar o produto?', 'Porque o localStorage só guarda texto', 'Para criptografar', 'Para deixar mais rápido', 'Porque o JavaScript pede'),
    Q('Qual é a primeira coisa que atualizarGrid faz com a tabela?', 'Limpa o conteúdo', 'Apaga o localStorage', 'Cria um novo produto', 'Recarrega a página'),
    Q('O que faz continue dentro de um for?', 'Pula para a próxima volta', 'Encerra o laço', 'Repete a volta', 'Apaga o item'),
    Q('Por que chamar atualizarGrid() ao final do script?', 'Para desenhar os dados já guardados quando a página abre', 'Para apagar o localStorage', 'Para criar o id', 'Para validar o formulário'),
    Q('Se os dados existem mas a tabela aparece vazia ao abrir, o que provavelmente faltou?', 'Chamar atualizarGrid() ao abrir a página', 'Apagar o localStorage', 'Trocar o id', 'Mudar o CSS'),
    Q('O que faz toFixed(2) em um preço?', 'Mostra 2 casas decimais', 'Divide por 2', 'Multiplica por 2', 'Arredonda para inteiro'),
  ]);

  // ══════════════════════════════════════════════════════
  // 71 — PROJETO 2: LOJA E CARRINHO
  // ══════════════════════════════════════════════════════
  A(71, 'Projeto 2: Loja e Carrinho', 'Mostrar os produtos em cards, comprar (copiar p para c) e somar o total do carrinho', '🛒', [
    P('🛍️', 'A Loja lê a mesma gaveta',
      `<p>A página da Loja não tem banco de dados próprio: ela só <strong>desenha os mesmos produtos</strong>, agora em cards:</p>`,
      code(`function desenharLoja() {
  let vitrine = document.getElementById("vitrine");
  vitrine.innerHTML = "";

  for (let i = 0; i < localStorage.length; i++) {
    let chave = localStorage.key(i);
    if (chave[0] !== "p") continue;

    let produto = JSON.parse(localStorage.getItem(chave));
    vitrine.innerHTML += §
      <div class="card">
        <h3>€{produto.nome}</h3>
        <p>R$ €{produto.preco.toFixed(2)}</p>
        <button onclick="comprar('€{chave}')">Comprar</button>
      </div>§;
  }
}`),
      `<p style="margin-top:12px">É <strong>quase idêntico</strong> ao <code>atualizarGrid</code>: só muda o que se desenha (card em vez de linha de tabela). Mesma receita, outro prato.</p>`,
      caderno(['Loja = mesma receita do grid, desenhando cards', 'Os mesmos dados aparecem nas duas telas'])),
    P('🛒', 'Comprar: tirar uma cópia (p vira c)',
      code(`function comprar(idProduto) {
  let texto = localStorage.getItem(idProduto);       // lê o produto (texto)
  let chaveCarrinho = "c" + idProduto.slice(1);      // p123 → c123

  localStorage.setItem(chaveCarrinho, texto);        // guarda a cópia
}`),
      lista(['O <strong>produto original</strong> (<code>p123</code>) continua na gaveta', 'É criada uma <strong>cópia</strong> com a chave <code>c123</code>', 'Como o texto já está em JSON, <strong>não precisa de parse/stringify</strong> para copiar']),
      analogia(`é tirar uma <strong>fotocópia</strong> do cartão do produto e guardá-la em outra gaveta (a do carrinho). O original continua na vitrine.`),
      preveja(`se o produto tem a chave <code>p3f2a</code>, qual é a chave do carrinho? E se eu clicar em Comprar duas vezes no mesmo produto, quantos itens há no carrinho?`),
      caderno(['comprar: lê p123 e grava a cópia em c123', 'O original continua · o carrinho recebe uma cópia', 'Clicar duas vezes regrava a mesma chave: 1 item só'])),
    P('🧮', 'Desenhar o carrinho e somar o total',
      code(`function desenharCarrinho() {
  let lista = document.getElementById("lista-carrinho");
  lista.innerHTML = "";
  let total = 0;

  for (let i = 0; i < localStorage.length; i++) {
    let chave = localStorage.key(i);
    if (chave[0] !== "c") continue;               // agora a família c

    let item = JSON.parse(localStorage.getItem(chave));
    total = total + item.preco;                    // acumula
    lista.innerHTML += §<li>€{item.nome} — R$ €{item.preco.toFixed(2)}</li>§;
  }

  document.getElementById("total").textContent = "Total: R$ " + total.toFixed(2);
}`),
      `<p style="margin-top:12px">Repare que só mudou a letra do filtro (<code>"c"</code>) e que o laço <strong>acumula</strong> o total, como na aula de laços.</p>`,
      faca(`Descubra no código: por que a variável <code>total</code> é criada <em>fora</em> do laço? O que aconteceria se fosse criada dentro?`),
      caderno(['Carrinho = mesma receita, filtrando a família c', 'total começa em 0 antes do laço e acumula a cada volta'])),
    P('🔄', 'Tela e dados andam juntos?',
      `<p>Depois de comprar, o carrinho <strong>não</strong> aparece sozinho em outra aba aberta. Por quê?</p>`,
      lista(['O <code>localStorage</code> foi alterado ✅', 'Mas a <strong>tela</strong> da outra aba só é redesenhada quando <em>nosso código mandar</em> ❌']),
      box('azul', `<strong>Regra de ouro:</strong> alterou os dados? <strong>Chame a função que redesenha.</strong> Por isso <code>salvarProduto</code>, <code>comprar</code> e <code>excluirProduto</code> terminam chamando <code>atualizarGrid()</code> (ou a função de desenhar daquela tela).`),
      atencao(`dados e tela são duas coisas: mudar uma <strong>não</strong> muda a outra automaticamente.`),
      caderno(['Dados e tela não andam juntos sozinhos', 'Mudou os dados → chame a função que redesenha'])),
  ], [
    Q('A página da Loja usa que fonte de dados?', 'O mesmo localStorage do Gerenciar', 'Um banco de dados próprio', 'Um arquivo de texto', 'A internet'),
    Q('O que a função comprar faz?', 'Copia o produto para uma chave que começa com c', 'Apaga o produto original', 'Cria um produto novo', 'Soma o total'),
    Q('Qual é a chave do carrinho do produto p3f2a?', 'c3f2a', 'p3f2a', 'cp3f2a', '3f2ac'),
    Q('Depois de comprar, o produto original:', 'Continua na gaveta', 'É apagado', 'Vira "[object Object]"', 'Muda para a família c'),
    Q('Ao copiar o produto para o carrinho, é preciso JSON.parse/stringify?', 'Não, o texto já está em JSON e basta copiá-lo', 'Sim, sempre', 'Só o stringify', 'Só o parse'),
    Q('Ao desenhar o carrinho, qual família de chaves o laço deve aceitar?', 'As que começam com c', 'As que começam com p', 'Todas', 'Nenhuma'),
    Q('Por que total começa em 0 ANTES do laço?', 'Para acumular os preços de todas as voltas', 'Porque o JavaScript exige zero', 'Para o laço rodar mais rápido', 'Para limpar a tabela'),
    Q('Se o total fosse criado DENTRO do laço, o resultado seria:', 'Só o preço do último item', 'A soma correta', 'Zero sempre', 'Um erro de sintaxe'),
    Q('Comprou um item e a tela não mudou. O que provavelmente faltou?', 'Chamar a função que redesenha a tela', 'Reiniciar o navegador', 'Trocar a cor do botão', 'Apagar o CSS'),
    Q('Qual é a regra de ouro do projeto?', 'Alterou os dados, chame a função que redesenha', 'Nunca altere os dados', 'Tela e dados sempre andam juntos sozinhos', 'Redesenhe só ao fechar a página'),
  ]);

  // ══════════════════════════════════════════════════════
  // 72 — PROJETO 3: ALTERAR, EXCLUIR E REVISÃO
  // ══════════════════════════════════════════════════════
  A(72, 'Projeto 3: Alterar, Excluir e Revisão Final', 'Editar e excluir produtos, evitar bugs clássicos e revisar o caminho completo do projeto', '🏁', [
    P('✏️', 'Alterar é gravar de novo',
      `<p>Não existe um comando "alterar" no localStorage. <strong>Alterar é gravar na mesma chave</strong>, o que substitui o valor antigo:</p>`,
      code(`function alterarProduto(id) {
  let produto = JSON.parse(localStorage.getItem(id));   // 1. lê e desembala

  produto.nome  = document.getElementById("nome").value;   // 2. muda os campos
  produto.preco = Number(document.getElementById("preco").value);

  localStorage.setItem(id, JSON.stringify(produto));    // 3. embala e grava (mesma chave)
  atualizarGrid();                                       // 4. redesenha
}`),
      lista(['<strong>ler → mudar → gravar → redesenhar</strong>', 'Mesma chave = o valor antigo é substituído', 'O id <strong>não</strong> muda']),
      caderno(['Alterar = ler + mudar campos + setItem na MESMA chave', 'Depois, sempre redesenhar'])),
    P('🗑️', 'Excluir: apagar produto e a cópia do carrinho',
      code(`function excluirProduto(id) {
  localStorage.removeItem(id);                    // apaga o produto (p123)
  localStorage.removeItem("c" + id.slice(1));     // apaga a cópia no carrinho (c123)
  atualizarGrid();
}`),
      atencao(`se esquecer a segunda linha, o produto some da loja mas <strong>continua no carrinho</strong>: um "produto fantasma". Sempre pense em <em>tudo que depende</em> do dado que você está apagando.`),
      preveja(`o que acontece com o item do carrinho se o produto for excluído e eu não apagar a chave c?`)),
    P('🐛', 'Os bugs clássicos do projeto (e como achar)',
      lista(['🔴 <strong>Tabela mostra o carrinho também</strong> → faltou <code>if (chave[0] !== "p") continue;</code>', '🔴 <strong>Aparece [object Object]</strong> → faltou <code>JSON.stringify</code> ao guardar (ou <code>JSON.parse</code> ao ler)', '🔴 <strong>Tabela vazia ao recarregar</strong> → faltou chamar <code>atualizarGrid()</code> ao abrir a página', '🔴 <strong>Total virou texto "01020"</strong> → faltou <code>Number()</code> no preço', '🔴 <strong>Itens duplicados</strong> → faltou <code>innerHTML = ""</code> antes de desenhar', '🔴 <strong>Cannot read properties of null</strong> → id escrito diferente do HTML']),
      code(`console.log(localStorage.getItem(chave));        // o que realmente está guardado?
console.log(typeof produto.preco, produto.preco); // número ou texto?`, 'Duas linhas que resolvem a maioria dos bugs'),
      caderno(['Cada sintoma tem uma causa típica: confira a lista antes de pedir ajuda', 'Use console.log para ver o que está guardado e o tipo do dado'])),
    P('🧾', 'Boas práticas',
      lista(['📛 <strong>Nomes claros</strong>: <code>atualizarGrid</code>, <code>excluirProduto</code>', '🧩 <strong>Uma função, uma tarefa</strong>', '💬 <strong>Comentários</strong> explicando o "porquê", e não o óbvio', '✅ <strong>Validar</strong> o que o usuário digita antes de guardar', '🧪 <strong>Testar</strong> cada passo no console antes de seguir', '🧠 <strong>Entender antes de colar</strong>: se não consegue explicar, ainda não é seu']),
      box('verde', `<strong>Desafio de variação:</strong> adicione um campo <em>favorito</em> (sim/não) ao produto e uma coluna na tabela que mostre ⭐ quando for favorito. Você vai precisar mexer em: o formulário, o objeto, o <code>atualizarGrid</code>. Faça sozinho e depois explique para o professor.`)),
    P('🏆', 'Revisão: o caminho completo',
      `<p>Você percorreu todo o caminho de um sistema web simples. Confira se consegue <strong>explicar cada etapa com suas palavras</strong>:</p>`,
      lista(['1️⃣ O navegador recebe <strong>HTML</strong> (estrutura), <strong>CSS</strong> (aparência) e <strong>JavaScript</strong> (comportamento)', '2️⃣ O JavaScript <strong>acha elementos</strong> no DOM e <strong>escuta eventos</strong>', '3️⃣ O evento chama uma função que <strong>lê o formulário</strong>', '4️⃣ Os dados viram um <strong>objeto</strong>, são <strong>embalados em JSON</strong> e guardados no localStorage', '5️⃣ Uma função <strong>percorre as gavetas</strong>, filtra por p ou c, <strong>desembala</strong> e <strong>desenha</strong> a tela', '6️⃣ Comprar <strong>copia p para c</strong>; excluir apaga as duas']),
      box('azul', `<strong>Para continuar praticando:</strong> use o <strong>Curso interativo</strong> (cartão no menu), que tem exercícios com correção na hora e o <strong>Laboratório da Loja</strong> para testar o localStorage sem medo de quebrar nada.`),
      caderno(['Sistema = HTML + CSS + JS + dados guardados', 'Evento → função → dados → redesenhar', 'Se consegue explicar, aprendeu'])),
  ], [
    Q('Como "alterar" um produto no localStorage?', 'Ler, mudar os campos e gravar na mesma chave', 'Usar localStorage.update()', 'Apagar tudo e recomeçar', 'Mudar o HTML da tabela'),
    Q('Ao regravar com a mesma chave, o que acontece com o valor antigo?', 'É substituído', 'Fica guardado junto', 'Dá erro', 'Vira o carrinho'),
    Q('Ao excluir um produto, o que mais devemos apagar?', 'A cópia no carrinho (chave c)', 'O HTML', 'O CSS', 'Nada mais'),
    Q('O que é um "produto fantasma"?', 'O item some da loja mas continua no carrinho', 'Um produto sem nome', 'Um produto com preço 0', 'Um produto que só o professor vê'),
    Q('A tabela mostra os itens do carrinho misturados. Causa provável?', 'Faltou filtrar por chave[0] === "p"', 'Faltou o CSS', 'O navegador está lento', 'O id está sem acento'),
    Q('Aparece [object Object] na tela. Causa provável?', 'Faltou JSON.stringify ao guardar ou JSON.parse ao ler', 'Falta de internet', 'O CSS está errado', 'O botão está desabilitado'),
    Q('A tabela some ao recarregar a página, mas os dados existem. Causa provável?', 'Faltou chamar atualizarGrid() ao abrir', 'O localStorage está cheio', 'Faltou o id', 'O Windows está desatualizado'),
    Q('O total do carrinho aparece como "01020". Causa provável?', 'Faltou converter o preço com Number()', 'Faltou o botão', 'Faltou o if', 'Faltou o CSS'),
    Q('Qual das práticas ajuda mais a achar um bug?', 'console.log para ver o valor e o tipo', 'Apagar o código e copiar de outro lugar', 'Reiniciar o computador', 'Mudar vários trechos ao mesmo tempo'),
    Q('Qual é a ordem correta do fluxo completo?', 'Evento, ler o formulário, guardar em JSON, percorrer, desenhar', 'Desenhar, guardar, evento, ler', 'Guardar, apagar, desenhar, evento', 'Percorrer, evento, desenhar, ler'),
  ]);


  // Prática (3 níveis: digitar e executar · modificar · resolver sozinho) dos módulos 9 e 10
  PRAT[99] = { tarefas: ['<strong>Nível 1.</strong> Digite o exemplo do <code>setTimeout</code> com 2000 ms e confirme que a mensagem aparece depois.', '<strong>Nível 1.</strong> Digite as três mensagens (1, setTimeout 0, 3), preveja a ordem no caderno e confira.', '<strong>Nível 2.</strong> Na contagem regressiva, troque o valor inicial e o intervalo. Anote o que mudou.', '<strong>Explique:</strong> com suas palavras, por que o <code>console.log</code> mostrou <code>Total: 0</code> no exemplo do erro.'],
    desafio: '<strong>Nível 3.</strong> Faça na loja um aviso "Produto salvo!" que <strong>some sozinho depois de 3 segundos</strong>. Depois explique ao professor por que o <code>setTimeout</code> não trava o resto da página.' };
  PRAT[100] = { tarefas: ['<strong>Nível 1.</strong> Digite o <code>fetch</code> de <code>/posts/1</code>, rode e mostre título e id no console.', '<strong>Nível 2.</strong> Mude o endereço para <code>/posts/2</code> e <code>/users/3</code>. Anote o que mudou nos dados.', '<strong>Nível 2.</strong> Reproduza de propósito o erro da Promise (sem .then) e leia o que aparece no console.', '<strong>Explique:</strong> com suas palavras, o que é uma API e o que é uma Promise.'],
    desafio: '<strong>Nível 3.</strong> Busque <code>https://jsonplaceholder.typicode.com/users</code> e mostre em uma lista na página o <strong>nome e o e-mail</strong> de cada usuário, usando <code>textContent</code>.' };
  PRAT[104] = { tarefas: ['<strong>Nível 1.</strong> Digite <code>mostrarPost</code> com <code>async/await</code> e confira que "Pedido enviado" aparece primeiro.', '<strong>Nível 2.</strong> Troque o endereço por um errado (<code>/usuarios/1</code>) e veja o que acontece. Depois acrescente a conferência de <code>resposta.ok</code>.', '<strong>Nível 2.</strong> Teste com a internet desligada e veja o <code>catch</code> funcionar.', '<strong>Explique:</strong> com suas palavras, por que um erro 404 não cai no <code>catch</code> sozinho.'],
    desafio: '<strong>Nível 3.</strong> Faça a função <code>carregarProdutos()</code> com "Carregando...", sucesso e mensagem de erro amigável, e um botão "Tentar de novo".' };
  PRAT[105] = { tarefas: ['<strong>Nível 1.</strong> Crie o repositório local com <code>git init</code>, faça o primeiro commit e rode <code>git log --oneline</code>.', '<strong>Nível 2.</strong> Altere um arquivo, rode <code>git status</code> e faça um novo commit com uma mensagem clara.', '<strong>Nível 2.</strong> Crie o <code>.gitignore</code> com <code>node_modules/</code> e <code>.env</code>.', '<strong>Explique:</strong> com suas palavras, a diferença entre Git, GitHub e commit.'],
    desafio: '<strong>Nível 3.</strong> Envie o projeto da loja ao GitHub com um <code>README.md</code> bem escrito (o que faz, como abrir e seu nome).' };
  PRAT[106] = { tarefas: ['<strong>Nível 1.</strong> Confira a lista de conferência no seu projeto (index.html na raiz, caminhos relativos, nomes iguais).', '<strong>Nível 1.</strong> Ative o GitHub Pages no repositório e abra o endereço do site.', '<strong>Nível 2.</strong> Provoque de propósito o erro do caminho com "/" no CSS, localize o 404 no Network e corrija.', '<strong>Explique:</strong> com suas palavras, o que o GitHub Pages publica e o que ele não consegue publicar.'],
    desafio: '<strong>Nível 3.</strong> Publique uma página de portfólio com link para a loja publicada e para o repositório, funcionando no celular.' };

  // ══════════════════════════════════════════════════════
  // 99 — ASSINCRONISMO E setTimeout   (módulo 9)
  // ══════════════════════════════════════════════════════
  A(99, 'Assíncrono 1: Assincronismo e setTimeout', 'Por que algumas coisas só acontecem depois, e como prever a ordem em que o código executa', '⏱️', [
    P('💡', 'ENTENDA: nem tudo acontece na hora',
      `<p>Até aqui, o código rodou <strong>linha por linha, na ordem</strong>. Mas na web há tarefas que <strong>demoram</strong>: buscar dados na internet, esperar um clique, esperar 2 segundos. O navegador não pode travar a página esperando.</p>`,
      analogia(`você pede uma pizza por telefone (começa a tarefa) e <strong>continua fazendo outras coisas</strong> enquanto ela não chega. Quando a campainha toca (resposta), você atende. Isso é <strong>assincronismo</strong>: começar agora, receber o resultado depois.`),
      lista(['⏩ <strong>Síncrono</strong>: uma linha só começa quando a anterior termina', '⏳ <strong>Assíncrono</strong>: a tarefa demorada é iniciada e o resto do código segue; o resultado chega depois']),
      caderno(['Assíncrono = começa agora, termina depois, sem travar a página', 'Exemplos: esperar um tempo, buscar dados na internet, clique do usuário'])),
    P('⏱️', 'O setTimeout: executar depois de um tempo',
      code(`setTimeout(function () {
  console.log("Passaram 2 segundos");
}, 2000);`),
      lista(['O <strong>primeiro</strong> argumento é a função que será executada <em>depois</em>', 'O <strong>segundo</strong> é o tempo em <strong>milissegundos</strong> (1000 ms = 1 segundo)', 'O <code>setTimeout</code> <strong>não espera</strong>: ele agenda e o código continua']),
      atencao(`2000 não é "2 segundos" porque o JavaScript pensa em segundos: é <strong>2000 milissegundos</strong>. Escrever <code>setTimeout(f, 2)</code> espera 2 ms, o que parece instantâneo.`)),
    P('🧠', 'PREVEJA: em que ordem aparece?',
      code(`console.log("1: começo");

setTimeout(function () {
  console.log("2: dentro do setTimeout");
}, 0);

console.log("3: fim");`),
      preveja(`escreva no caderno a ordem exata das três mensagens. Atenção: o tempo é <strong>0</strong>. Será que "2" aparece no meio?`),
      box('amarelo', `Pensou "1, 2, 3"? Muita gente pensa. Digite e confira no próximo passo.`)),
    P('⌨️', 'DIGITE E COMPARE',
      `<p><strong>Digite</strong> o código do passo anterior (não cole) e rode no console ou num arquivo HTML. Compare com a sua previsão.</p>`,
      box('verde', `<strong>Resultado:</strong> <code>1: começo</code>, <code>3: fim</code> e só depois <code>2: dentro do setTimeout</code>. Mesmo com tempo 0, a função agendada <strong>espera o código atual terminar</strong>. Ela vai para uma fila e só roda quando o JavaScript fica livre.`),
      caderno(['setTimeout agenda, não bloqueia', 'Com tempo 0, a função ainda roda DEPOIS do código atual terminar'])),
    P('🐞', 'ENCONTRE O ERRO: cadê o resultado?',
      code(`let total = 0;

setTimeout(function () {
  total = 100;
}, 1000);

console.log("Total:", total);   // mostra: Total: 0`),
      `<p style="margin-top:12px">O programador esperava <code>100</code>, mas apareceu <code>0</code>. Nenhuma mensagem de erro: o código "funciona", só que <strong>na ordem errada</strong>.</p>`,
      box('verde', `<strong>Causa:</strong> o <code>console.log</code> roda <em>antes</em> de a função do <code>setTimeout</code> mudar o <code>total</code>. <strong>Correção:</strong> usar o valor <em>dentro</em> da função agendada: <code>setTimeout(function () { total = 100; console.log("Total:", total); }, 1000);</code>.`),
      atencao(`regra de ouro: o que depende do resultado de uma tarefa assíncrona precisa ficar <strong>dentro</strong> dela (ou depois de esperá-la, como veremos em <code>async/await</code>).`)),
    P('🔧', 'MODIFIQUE: contagem regressiva',
      code(`let segundos = 3;

let relogio = setInterval(function () {
  console.log(segundos);
  segundos = segundos - 1;

  if (segundos < 0) {
    clearInterval(relogio);
    console.log("Fim!");
  }
}, 1000);`),
      `<p style="margin-top:12px">O <code>setInterval</code> repete a função <strong>a cada intervalo</strong>, até ser parado com <code>clearInterval</code>. Sem o <code>clearInterval</code>, ele repetiria para sempre.</p>`,
      lista(['Troque <code>3</code> por <code>5</code> e preveja o que muda', 'Troque o intervalo para <code>500</code>', 'Comente o <code>clearInterval</code> e veja o que acontece (depois feche a aba)'])),
    P('🛒', 'Aplicando na loja: mensagem que some sozinha',
      `<p>Quando o produto é salvo, aparece um aviso verde. Se ele ficar na tela para sempre, atrapalha. Com <code>setTimeout</code> ele some depois de 3 segundos:</p>`,
      code(`function mostrarAviso(texto) {
  let aviso = document.getElementById("aviso");
  aviso.textContent = texto;

  setTimeout(function () {
    aviso.textContent = "";
  }, 3000);
}

mostrarAviso("Produto salvo!");`),
      caderno(['setTimeout(função, milissegundos)', 'setInterval repete · clearInterval para', 'Use setTimeout para avisos que somem sozinhos'])),
  ], [
    Q('O que significa dizer que uma tarefa é assíncrona?', 'Ela é iniciada agora e termina depois, sem travar o resto do código', 'Ela roda sempre antes de todas as outras', 'Ela só roda se der erro', 'Ela precisa de internet'),
    Q('Em setTimeout(f, 2000), o que é 2000?', 'O tempo de espera em milissegundos', 'O tempo em segundos', 'O número de repetições', 'O número da linha'),
    Q('Quanto tempo espera setTimeout(f, 1000)?', '1 segundo', '1 milissegundo', '1 minuto', '10 segundos'),
    Q('Qual a ordem das mensagens: log("A"); setTimeout(() => log("B"), 0); log("C");', 'A, C, B', 'A, B, C', 'B, A, C', 'C, B, A'),
    Q('Por que "Total: 0" aparece, se o setTimeout muda o total para 100 depois de 1 segundo?', 'O console.log roda antes da função agendada', 'O setTimeout não funciona com variáveis', 'Faltou a palavra let', 'O número 100 é inválido'),
    Q('Qual é a correção para mostrar o total correto?', 'Usar o valor dentro da função do setTimeout', 'Trocar o tempo por 0', 'Apagar o console.log', 'Trocar let por const'),
    Q('O que o setInterval faz?', 'Repete a função a cada intervalo de tempo', 'Executa a função uma única vez', 'Espera o usuário clicar', 'Apaga a função'),
    Q('O que acontece se você esquecer o clearInterval?', 'A função continua repetindo para sempre', 'Nada, o setInterval para sozinho', 'O navegador fecha', 'O intervalo vira 0'),
    Q('No aviso da loja, qual a função do setTimeout?', 'Apagar o aviso depois de 3 segundos', 'Salvar o produto', 'Validar o formulário', 'Criar o produto no localStorage'),
    Q('Qual das opções é uma tarefa que costuma ser assíncrona?', 'Buscar dados em um servidor', 'Somar dois números', 'Declarar uma variável', 'Comparar dois valores'),
  ]);

  // ══════════════════════════════════════════════════════
  // 100 — fetch E API PÚBLICA
  // ══════════════════════════════════════════════════════
  A(100, 'Assíncrono 2: fetch e API Pública', 'Buscar dados de um servidor com fetch, converter a resposta em JSON e mostrar na página', '🌍', [
    P('💡', 'ENTENDA: o que é uma API',
      `<p>Uma <strong>API</strong> é um endereço na internet que, em vez de devolver uma <em>página</em>, devolve <strong>dados</strong> (geralmente em JSON). Seu programa faz o pedido e usa a resposta.</p>`,
      analogia(`o <strong>cardápio e o garçom</strong>: você não entra na cozinha. Pede ao garçom (API) e ele traz o prato (dados). Você só precisa saber <em>como pedir</em>.`),
      code(`https://jsonplaceholder.typicode.com/users/1`, 'Exemplo de endereço de API pública (serve para treinar)'),
      `<p style="margin-top:12px">Abra esse endereço no navegador: você verá um JSON com nome, e-mail e outros dados de um usuário de teste. É o mesmo formato (<code>JSON</code>) que usamos no localStorage.</p>`,
      caderno(['API = endereço que devolve dados (JSON), não uma página', 'Você pede, o servidor responde', 'jsonplaceholder = API de teste, sem login'])),
    P('📡', 'O fetch: fazer o pedido',
      code(`fetch("https://jsonplaceholder.typicode.com/users/1")
  .then(function (resposta) {
    return resposta.json();            // converte o texto JSON em objeto
  })
  .then(function (usuario) {
    console.log(usuario.name);         // usa os dados
  });`),
      lista(['<code>fetch(url)</code> faz o pedido e devolve uma <strong>Promise</strong> (uma "promessa" de resposta)', '<code>.then(...)</code>: "quando a resposta chegar, faça isto"', '<code>resposta.json()</code>: transforma o conteúdo em objeto (também é assíncrono, por isso o segundo <code>.then</code>)']),
      analogia(`uma <strong>Promise</strong> é o ticket da lanchonete: ainda não é o lanche, mas é a promessa de que ele virá. Enquanto isso, você segue sua vida.`)),
    P('🧠', 'PREVEJA E DIGITE',
      code(`fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then(function (r) { return r.json(); })
  .then(function (post) {
    console.log("Título:", post.title);
    console.log("Id:", post.id);
  });`),
      preveja(`qual será o valor de <code>post.id</code>? (olhe o final do endereço). E o <code>post.title</code>: é texto ou número?`),
      `<p style="margin-top:12px"><strong>Digite</strong> e rode (num arquivo HTML aberto no navegador, com o console aberto). Compare com a previsão.</p>`,
      box('verde', `<strong>Resultado:</strong> <code>Id: 1</code> (o 1 do endereço) e o título é um <strong>texto</strong>. Se mudar o endereço para <code>/posts/2</code>, vem outro post.`)),
    P('🐞', 'ENCONTRE O ERRO: esqueci de esperar',
      code(`let dados = fetch("https://jsonplaceholder.typicode.com/users/1");
console.log(dados.name);      // undefined

console.log(dados);           // Promise {<pending>}`),
      lista(['<code>dados</code> <strong>não é o usuário</strong>: é a <code>Promise</code>, a promessa de resposta', 'Por isso <code>dados.name</code> é <code>undefined</code> e <code>console.log(dados)</code> mostra <code>Promise {&lt;pending&gt;}</code>']),
      box('verde', `<strong>Correção:</strong> usar <code>.then</code> (como no passo anterior) para trabalhar com os dados <strong>depois que chegarem</strong>. No próximo módulo veremos <code>await</code>, que deixa isso mais legível.`),
      atencao(`outro erro comum: <code>TypeError: Failed to fetch</code>. Significa que o pedido nem chegou ao servidor: internet caída, endereço digitado errado ou bloqueio do navegador (CORS).`)),
    P('🔧', 'MODIFIQUE: mostrar uma lista na página',
      code(`let lista = document.getElementById("lista");

fetch("https://jsonplaceholder.typicode.com/users")
  .then(function (r) { return r.json(); })
  .then(function (usuarios) {
    for (let i = 0; i < usuarios.length; i++) {
      let li = document.createElement("li");
      li.textContent = usuarios[i].name;   // textContent: seguro com dados externos
      lista.appendChild(li);
    }
  });`),
      `<p style="margin-top:12px">Aqui a API devolve um <strong>array de objetos</strong>, exatamente como a nossa lista de produtos. A mesma receita do <code>atualizarGrid</code>: percorrer e desenhar.</p>`,
      atencao(`dados que vêm de fora <strong>nunca são confiáveis</strong>. Por isso usamos <code>textContent</code> (e não <code>innerHTML</code>), para que um nome com <code>&lt;script&gt;</code> não seja executado.`),
      lista(['Mostre também o <code>email</code> de cada usuário', 'Mostre apenas os 3 primeiros (use <code>?_limit=3</code> no final do endereço)'])),
    P('🛒', 'Aplicando na loja: importar produtos de exemplo',
      code(`function importarProdutos() {
  fetch("https://fakestoreapi.com/products?limit=3")
    .then(function (r) { return r.json(); })
    .then(function (lista) {
      for (let i = 0; i < lista.length; i++) {
        let id = "p" + lista[i].id;
        let produto = { id: id, nome: lista[i].title, preco: lista[i].price };
        localStorage.setItem(id, JSON.stringify(produto));
      }
      atualizarGrid();
    });
}`),
      `<p style="margin-top:12px">Repare que a convenção da loja continua: id começando com <code>p</code>, objeto guardado com <code>JSON.stringify</code> e redesenho com <code>atualizarGrid()</code>. A API só <em>forneceu os dados</em>.</p>`,
      atencao(`se esta API de exemplo estiver fora do ar, troque o endereço por <code>https://jsonplaceholder.typicode.com/posts?_limit=3</code> e adapte os nomes dos campos. APIs públicas de teste podem mudar ou sair do ar.`),
      caderno(['fetch(url) devolve uma Promise', '.then(r => r.json()) converte a resposta', 'Dados de fora: use textContent, nunca confie neles'])),
  ], [
    Q('O que uma API pública devolve normalmente?', 'Dados, geralmente em JSON', 'Uma página HTML completa', 'Uma imagem do site', 'Um arquivo executável'),
    Q('O que o fetch(url) devolve?', 'Uma Promise (promessa de resposta)', 'O objeto com os dados já pronto', 'Um número', 'Um erro obrigatório'),
    Q('Para que serve resposta.json()?', 'Converter o conteúdo da resposta em um objeto', 'Enviar a resposta de volta', 'Apagar a resposta', 'Guardar a resposta no localStorage'),
    Q('Por que há dois .then seguidos no fetch básico?', 'O primeiro converte para JSON e o segundo usa os dados', 'Um é para erros e o outro para sucesso', 'O primeiro aguarda o clique', 'Não há motivo, é só estilo'),
    Q('let d = fetch(url); console.log(d.name) mostra:', 'undefined, porque d é uma Promise', 'O nome do usuário', 'Um erro de sintaxe', 'null'),
    Q('console.log(d) mostra Promise {<pending>}. O que isso indica?', 'A resposta ainda não chegou (ou não foi esperada)', 'O servidor caiu', 'Faltou let', 'O JSON está inválido'),
    Q('TypeError: Failed to fetch normalmente indica:', 'O pedido nem chegou ao servidor (rede, endereço ou bloqueio)', 'Variável não declarada', 'Faltou um parêntese', 'Array vazio'),
    Q('Por que usar textContent ao mostrar nomes vindos de uma API?', 'Porque dados externos podem conter código malicioso', 'Porque é mais rápido que o fetch', 'Porque innerHTML não existe', 'Porque textContent aceita HTML'),
    Q('Na importação de produtos para a loja, o que não deve mudar?', 'A convenção p + id, JSON.stringify e atualizarGrid', 'O uso do localStorage', 'O nome do projeto', 'A cor dos botões'),
    Q('Se a API devolve um array de objetos, como percorrer?', 'Com um for, como na lista de produtos', 'Não é possível percorrer', 'Só com while', 'Convertendo para número'),
  ]);

  // ══════════════════════════════════════════════════════
  // 104 — async/await E TRATAMENTO DE FALHAS
  // ══════════════════════════════════════════════════════
  A(104, 'Assíncrono 3: async/await e Falhas', 'Escrever pedidos à API de forma legível com async/await e tratar erros com try/catch', '🛡️', [
    P('💡', 'ENTENDA: await deixa o código legível',
      `<p>O <code>.then</code> funciona, mas com muitos pedidos o código vira uma escada. O <strong>async/await</strong> permite escrever o mesmo <em>como se fosse linha por linha</em>.</p>`,
      analogia(`na lanchonete, você pede e <strong>espera no balcão</strong> até o lanche ficar pronto, e só depois segue. O <code>await</code> é "esperar no balcão" <em>dentro da função</em>; o resto da página continua livre.`),
      code(`// com .then
fetch(url).then(r => r.json()).then(dados => console.log(dados));

// com async/await: o mesmo, mais fácil de ler
async function buscar() {
  let resposta = await fetch(url);
  let dados = await resposta.json();
  console.log(dados);
}`),
      caderno(['async antes de function: a função pode usar await', 'await espera a Promise terminar e devolve o resultado'])),
    P('🧠', 'PREVEJA E DIGITE',
      code(`async function mostrarPost() {
  let resposta = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  let post = await resposta.json();
  console.log("Título:", post.title);
}

mostrarPost();
console.log("Pedido enviado");`),
      preveja(`qual mensagem aparece primeiro: <code>Pedido enviado</code> ou <code>Título: ...</code>? Por quê?`),
      box('verde', `<strong>Resultado:</strong> primeiro <code>Pedido enviado</code>. A função <code>mostrarPost</code> <strong>espera dentro dela</strong>, mas quem a chamou segue em frente. Logo depois, chega o título.`),
      atencao(`o <code>await</code> só funciona <strong>dentro de função <code>async</code></strong>. Fora dela, o erro é <code>SyntaxError: await is only valid in async functions and the top level bodies of modules</code>.`)),
    P('🛡️', 'try/catch: quando algo dá errado',
      `<p>Internet cai, endereço errado, servidor fora do ar. Se o código não prevê isso, <strong>o programa quebra</strong>. O <code>try/catch</code> permite tentar e, se falhar, reagir:</p>`,
      code(`async function buscarUsuario() {
  try {
    let resposta = await fetch("https://jsonplaceholder.typicode.com/users/1");
    let usuario = await resposta.json();
    console.log(usuario.name);
  } catch (erro) {
    console.log("Não foi possível buscar os dados:", erro.message);
  }
}`),
      lista(['<code>try { ... }</code>: tenta executar', '<code>catch (erro) { ... }</code>: roda <strong>só se</strong> algo falhar dentro do try', '<code>erro.message</code>: descrição do que deu errado']),
      analogia(`a <strong>rede de proteção</strong> do trapézio: se o artista cair, a rede evita o desastre e o espetáculo continua.`)),
    P('🐞', 'ENCONTRE O ERRO: o endereço errado que "funciona"',
      code(`async function buscar() {
  try {
    let resposta = await fetch("https://jsonplaceholder.typicode.com/usuarios/1");
    let dados = await resposta.json();
    console.log(dados.name);          // undefined
  } catch (erro) {
    console.log("Erro:", erro.message);   // nunca aparece!
  }
}`),
      `<p style="margin-top:12px">O endereço está errado (<code>/usuarios</code> em vez de <code>/users</code>). O servidor responde <strong>404</strong>, mas o <code>catch</code> <strong>não dispara</strong>. Por quê? O <code>fetch</code> só falha de verdade quando <em>não consegue falar com o servidor</em>. Uma resposta 404 ou 500 é uma resposta válida.</p>`,
      code(`let resposta = await fetch(url);

if (!resposta.ok) {                       // ok é false para 404, 500...
  throw new Error("Erro " + resposta.status);
}
let dados = await resposta.json();`, 'Correção: conferir resposta.ok'),
      caderno(['fetch só rejeita se a rede falhar', '404 e 500 NÃO caem no catch sozinhos', 'Sempre confira resposta.ok e use throw new Error(...)'])),
    P('🔧', 'MODIFIQUE: mensagem amigável na tela',
      code(`async function carregarProdutos() {
  let aviso = document.getElementById("aviso");
  aviso.textContent = "Carregando...";

  try {
    let resposta = await fetch("https://fakestoreapi.com/products?limit=3");
    if (!resposta.ok) throw new Error("Erro " + resposta.status);
    let lista = await resposta.json();
    aviso.textContent = lista.length + " produtos carregados";
  } catch (erro) {
    aviso.textContent = "Não foi possível carregar. Tente de novo.";
  }
}`),
      `<p style="margin-top:12px">O usuário <strong>nunca</strong> deve ver "Failed to fetch" ou uma tela em branco. Mostre uma mensagem clara e, se possível, um botão para tentar de novo.</p>`,
      lista(['Acrescente um botão "Tentar de novo" que chama a função outra vez', 'Teste com a internet desligada (modo avião) e leia o que aparece']),
      caderno(['Mostre "Carregando..." enquanto espera', 'No catch, mostre mensagem clara ao usuário', 'Registre o erro técnico no console'])),
  ], [
    Q('O que o await faz dentro de uma função async?', 'Espera a Promise terminar e entrega o resultado', 'Cancela o pedido', 'Repete o pedido', 'Transforma o resultado em texto'),
    Q('Onde o await pode ser usado?', 'Dentro de funções declaradas com async', 'Em qualquer lugar do código', 'Apenas no CSS', 'Só dentro do try'),
    Q('Qual erro aparece ao usar await fora de uma função async?', 'SyntaxError: await is only valid in async functions', 'ReferenceError: await is not defined', 'TypeError: Failed to fetch', 'RangeError'),
    Q('mostrarPost(); console.log("Pedido enviado"); Qual aparece primeiro?', '"Pedido enviado"', 'O título do post', 'Os dois ao mesmo tempo', 'Nenhum deles'),
    Q('Quando o bloco catch é executado?', 'Quando acontece um erro dentro do try', 'Sempre, após o try', 'Nunca, só serve de comentário', 'Quando o try termina com sucesso'),
    Q('Por que um endereço errado que devolve 404 não cai no catch?', 'Porque o fetch só rejeita quando não consegue falar com o servidor', 'Porque o catch só funciona com números', 'Porque 404 não é erro de verdade', 'Porque o await ignora respostas'),
    Q('Como detectar uma resposta 404 ou 500?', 'Conferindo resposta.ok', 'Conferindo resposta.json', 'Usando setTimeout', 'Apagando o try'),
    Q('O que o throw new Error("...") faz?', 'Dispara um erro que será capturado pelo catch', 'Apaga o fetch', 'Mostra o erro na tela automaticamente', 'Repete o pedido'),
    Q('O que deve aparecer para o usuário quando o pedido falha?', 'Uma mensagem clara, como "Não foi possível carregar"', 'A mensagem técnica Failed to fetch', 'Uma tela em branco', 'Nada, o erro deve ser escondido sem aviso'),
    Q('Vantagem do async/await sobre vários .then seguidos:', 'O código fica mais fácil de ler, como linha por linha', 'É sempre mais rápido', 'Dispensa o fetch', 'Funciona sem internet'),
  ]);

  // ══════════════════════════════════════════════════════
  // 105 — GIT E GITHUB   (módulo 10)
  // ══════════════════════════════════════════════════════
  A(105, 'Profissional 1: Git e GitHub Básico', 'Versionar o projeto com commits, desfazer a bagunça e enviar o código ao GitHub', '🌿', [
    P('💡', 'ENTENDA: por que usar Git',
      `<p>Você já teve <code>loja-final.html</code>, <code>loja-final2.html</code> e <code>loja-final-agora-vai.html</code>? O <strong>Git</strong> resolve isso: guarda o <strong>histórico</strong> do projeto e deixa voltar a qualquer ponto.</p>`,
      analogia(`o Git é o <strong>"salvar jogo" com legenda</strong>: cada <strong>commit</strong> é um ponto de salvamento com um nome ("cadastro funcionando"). Se estragar a fase, você volta ao último salvamento.`),
      lista(['🧰 <strong>Git</strong>: programa no seu computador que guarda o histórico', '☁️ <strong>GitHub</strong>: site que guarda uma cópia do projeto na internet (e serve de portfólio)', '📌 <strong>Repositório</strong>: a pasta do projeto com o histórico dentro', '💾 <strong>Commit</strong>: um ponto de salvamento, com uma mensagem']),
      caderno(['Git = histórico do projeto no seu computador', 'GitHub = cópia na internet + portfólio', 'Commit = ponto de salvamento com mensagem'])),
    P('⌨️', 'DIGITE: o primeiro repositório',
      `<p>No terminal (ou no terminal do VS Code), dentro da pasta do projeto:</p>`,
      code(`git init
git status
git add .
git commit -m "Primeira versão da loja"
git log --oneline`),
      lista(['<code>git init</code>: cria o repositório na pasta', '<code>git status</code>: mostra o que mudou (use sempre!)', '<code>git add .</code>: separa as mudanças para o próximo commit', '<code>git commit -m "..."</code>: salva o ponto, com mensagem', '<code>git log --oneline</code>: mostra o histórico']),
      preveja(`depois do <code>git add .</code>, o que você acha que o <code>git status</code> vai mostrar? E depois do commit?`),
      box('verde', `<strong>Resultado:</strong> antes do add, os arquivos aparecem como <em>"Untracked"</em>; depois do add, como <em>"Changes to be committed"</em>; depois do commit: <code>nothing to commit, working tree clean</code> (nada pendente).`)),
    P('🐞', 'ENCONTRE O ERRO: mensagens que assustam',
      lista(['<code>fatal: not a git repository (or any of the parent directories): .git</code> → você está fora da pasta do projeto, ou esqueceu o <code>git init</code>', '<code>Author identity unknown *** Please tell me who you are.</code> → o Git não sabe quem você é: rode uma vez <code>git config --global user.name "Seu Nome"</code> e <code>git config --global user.email "seu@email.com"</code>', '<code>nothing to commit, working tree clean</code> → não é erro: não há nada novo para salvar']),
      atencao(`cuide com as <strong>mensagens de commit</strong>: "arrumei", "asdf" e "agora vai" não ajudam ninguém. Escreva o que mudou: <em>"Adiciona validação do formulário"</em>.`),
      caderno(['git status antes e depois de cada passo', 'Mensagem de commit: diga o que mudou', 'Configure nome e e-mail uma única vez'])),
    P('☁️', 'Enviar ao GitHub',
      lista(['1️⃣ Crie uma conta no GitHub e um <strong>repositório novo</strong> (botão <em>New</em>), sem README', '2️⃣ Copie o endereço do repositório', '3️⃣ No terminal, ligue e envie:']),
      code(`git remote add origin https://github.com/SEU-USUARIO/loja-virtual.git
git branch -M main
git push -u origin main`),
      lista(['<code>remote add origin</code>: diz ao Git onde está o repositório na internet', '<code>push</code>: envia seus commits para lá']),
      atencao(`o GitHub <strong>não aceita a senha da conta</strong> no terminal: peça ao professor para orientar o uso do <em>login pelo navegador</em> ou de um <em>token de acesso</em>. E <strong>nunca</strong> publique senhas, chaves ou arquivos <code>.env</code> no repositório.`)),
    P('🔧', 'MODIFIQUE: o ciclo de trabalho',
      `<p>Depois do primeiro envio, o dia a dia é sempre o mesmo ciclo:</p>`,
      code(`# 1. altere os arquivos no editor
git status
git add .
git commit -m "Adiciona botão remover no carrinho"
git push`),
      lista(['Mude o título do <code>h1</code> da loja e faça um <strong>novo commit</strong> com uma boa mensagem', 'Rode <code>git log --oneline</code> e veja os dois commits', 'Crie um arquivo <code>.gitignore</code> com a linha <code>node_modules/</code> e outra com <code>.env</code> (arquivos que <strong>não</strong> vão para o GitHub)']),
      caderno(['Ciclo: alterar → status → add → commit → push', '.gitignore lista o que NÃO vai para o repositório'])),
    P('🎯', 'DESAFIO: README e portfólio',
      `<p>O <strong>README.md</strong> é a vitrine do repositório. Crie um com:</p>`,
      lista(['O nome do projeto e uma frase sobre ele', 'O que a loja faz (cadastrar, listar, comprar...)', 'Como abrir o projeto', 'Seu nome e turma']),
      code(`# Loja Virtual

Projeto da disciplina de Programação Web.

## O que faz
- Cadastra, altera e exclui produtos
- Mostra a vitrine e o carrinho
- Guarda os dados no navegador (localStorage)

Autor: Seu Nome`, 'Exemplo de README.md'),
      box('verde', `Pronto: quem abrir o seu repositório entende o projeto em 10 segundos. Esse é o começo do seu <strong>portfólio</strong>.`)),
  ], [
    Q('Qual é a função do Git?', 'Guardar o histórico do projeto e permitir voltar a versões antigas', 'Hospedar o site na internet', 'Executar o JavaScript', 'Corrigir erros automaticamente'),
    Q('Qual é a diferença entre Git e GitHub?', 'Git é o programa local; GitHub é o site que guarda uma cópia online', 'São o mesmo programa', 'GitHub funciona sem Git e dispensa commits', 'Git é um editor de código'),
    Q('O que é um commit?', 'Um ponto de salvamento do projeto com uma mensagem', 'Uma cópia do projeto no GitHub', 'Um erro do Git', 'Um tipo de arquivo'),
    Q('Qual comando cria um repositório na pasta?', 'git init', 'git start', 'git new', 'git create'),
    Q('O que faz git add . ?', 'Separa as mudanças para o próximo commit', 'Envia ao GitHub', 'Cria um repositório', 'Apaga o histórico'),
    Q('fatal: not a git repository significa:', 'Você está fora de um repositório, ou esqueceu o git init', 'O GitHub está fora do ar', 'O commit foi apagado', 'Faltou internet'),
    Q('Author identity unknown *** Please tell me who you are. Qual é a solução?', 'Configurar user.name e user.email com git config', 'Reinstalar o Windows', 'Apagar a pasta .git', 'Fazer git push'),
    Q('Qual mensagem de commit é a melhor?', 'Adiciona validação do formulário de produtos', 'arrumei', 'asdf', 'agora vai'),
    Q('Para que serve o .gitignore?', 'Listar arquivos que não devem ir para o repositório', 'Apagar arquivos do computador', 'Aumentar a velocidade do Git', 'Criar um commit'),
    Q('O que NUNCA deve ser publicado em um repositório?', 'Senhas, chaves e o arquivo .env', 'O arquivo README.md', 'O index.html', 'O CSS do projeto'),
  ]);

  // ══════════════════════════════════════════════════════
  // 106 — GITHUB PAGES E PORTFÓLIO
  // ══════════════════════════════════════════════════════
  A(106, 'Profissional 2: Publicar com GitHub Pages', 'Colocar a sua página no ar, de graça, e montar um portfólio com a loja', '🚀', [
    P('💡', 'ENTENDA: o que o GitHub Pages faz',
      `<p>O <strong>GitHub Pages</strong> pega os arquivos do seu repositório (HTML, CSS, JavaScript e imagens) e os publica como um <strong>site de verdade</strong>, com endereço próprio. Funciona só para páginas <strong>estáticas</strong>: sem servidor, sem banco de dados.</p>`,
      analogia(`é como <strong>fixar seu cartaz no mural da escola</strong>: qualquer pessoa que passar pode ler. Mas o mural só mostra o cartaz; ele não consegue calcular nada por você no servidor.`),
      lista(['✅ Funciona: HTML, CSS, JavaScript no navegador, localStorage, fetch para APIs', '❌ Não funciona: Node/Express, banco de dados no servidor, envio de e-mail']),
      caderno(['GitHub Pages = site estático gratuito', 'A loja com localStorage funciona; um servidor Node, não'])),
    P('✅', 'Antes de publicar: lista de conferência',
      lista(['O arquivo principal se chama <strong><code>index.html</code></strong> (minúsculas) e está na raiz do repositório', 'Os caminhos usam <strong>caminhos relativos</strong> (<code>estilo.css</code>, não <code>C:\\Users\\...</code>)', 'Os nomes de arquivo <strong>combinam exatamente</strong> com o que está no HTML', 'Não há senhas nem chaves no código', 'O projeto abre bem quando você clica duas vezes em <code>index.html</code>']),
      atencao(`o GitHub Pages <strong>diferencia maiúsculas de minúsculas</strong>: <code>Foto.PNG</code> e <code>foto.png</code> são arquivos diferentes. No Windows isso "funciona", mas no GitHub aparece a imagem quebrada. O erro no console é <code>Failed to load resource: the server responded with a status of 404</code>.`)),
    P('⌨️', 'DIGITE E PUBLIQUE',
      lista(['1️⃣ Envie o projeto ao GitHub (aula anterior)', '2️⃣ No repositório: <strong>Settings → Pages</strong>', '3️⃣ Em <em>Build and deployment</em>, escolha <strong>Deploy from a branch</strong>', '4️⃣ Selecione a branch <code>main</code> e a pasta <code>/ (root)</code>, e clique em <strong>Save</strong>', '5️⃣ Aguarde 1 a 3 minutos e abra o endereço mostrado']),
      code(`https://SEU-USUARIO.github.io/loja-virtual/`, 'Formato do endereço'),
      preveja(`se você publicar um repositório chamado <code>loja-virtual</code> do usuário <code>maria</code>, qual será o endereço do site?`)),
    P('🐞', 'ENCONTRE O ERRO: a página abre, mas sem estilo',
      lista(['<strong>Sintoma:</strong> o HTML aparece, mas sem cores nem layout', '<strong>Onde olhar:</strong> F12 → aba <strong>Network</strong> (ou Console), e procure um <code>404</code> no arquivo <code>.css</code>', '<strong>Causas comuns:</strong> nome diferente (<code>Estilo.css</code> × <code>estilo.css</code>), caminho absoluto (<code>/estilo.css</code>) ou o arquivo ficou em outra pasta']),
      code(`<!-- errado: começa com "/" e aponta para a raiz do domínio, não do projeto -->
<link rel="stylesheet" href="/estilo.css">

<!-- certo: caminho relativo -->
<link rel="stylesheet" href="estilo.css">`),
      box('verde', `<strong>Por quê?</strong> no GitHub Pages seu site mora em <code>/loja-virtual/</code>. O caminho <code>/estilo.css</code> procura em <code>usuario.github.io/estilo.css</code> (outro lugar!). O caminho relativo <code>estilo.css</code> procura ao lado do HTML.`)),
    P('🔧', 'MODIFIQUE: atualizar o site',
      `<p>Publicar não é uma vez só. Cada <code>git push</code> atualiza o site:</p>`,
      code(`git add .
git commit -m "Corrige caminho do CSS"
git push`),
      lista(['Altere o título da loja, faça commit e push', 'Atualize a página do site (Ctrl+F5) depois de 1 ou 2 minutos e veja a mudança', 'Teste o site no celular']),
      caderno(['Cada push atualiza o site', 'Use Ctrl+F5 para limpar o cache ao testar', 'Teste sempre no endereço publicado, não só no seu computador'])),
    P('🎯', 'DESAFIO: seu portfólio',
      `<p>Monte uma página <code>index.html</code> de portfólio com:</p>`,
      lista(['Seu nome, curso e uma foto (com <code>alt</code>)', 'Uma lista dos projetos, com <strong>link para a loja publicada</strong> e para o repositório', 'Cores legíveis e a página funcionando no celular']),
      box('verde', `<strong>Explique com suas palavras</strong> ao professor: o que é o GitHub Pages, o que ele <em>não</em> consegue publicar e por que o caminho do CSS precisa ser relativo.`)),
  ], [
    Q('O que o GitHub Pages faz?', 'Publica páginas estáticas do repositório como um site', 'Executa servidores Node', 'Guarda bancos de dados', 'Envia e-mails'),
    Q('Qual destes projetos funciona no GitHub Pages?', 'Uma loja HTML/CSS/JS que usa localStorage', 'Um servidor Express com banco de dados', 'Um sistema que envia e-mails pelo servidor', 'Um programa que roda no Windows'),
    Q('Qual deve ser o nome do arquivo principal do site?', 'index.html', 'Principal.HTML', 'site.txt', 'home.exe'),
    Q('Por que Foto.PNG pode funcionar no seu PC e falhar no GitHub Pages?', 'O GitHub diferencia maiúsculas de minúsculas nos nomes', 'O GitHub não aceita imagens', 'O Windows apaga a imagem', 'Imagens só funcionam em HTML antigo'),
    Q('Qual erro aparece no Network quando um arquivo do site não é encontrado?', '404', '200', '301', 'OK'),
    Q('Por que href="/estilo.css" falha em endereço usuario.github.io/loja/ ?', 'O "/" procura na raiz do domínio, e não na pasta do projeto', 'O CSS não pode ter esse nome', 'O href não existe no HTML', 'O GitHub bloqueia o CSS'),
    Q('Como atualizar o site já publicado?', 'Fazer commit e push das mudanças', 'Apagar o repositório e criar outro', 'Enviar um e-mail ao GitHub', 'Reinstalar o Git'),
    Q('Em qual endereço fica o site do usuário "maria" com repositório "loja"?', 'https://maria.github.io/loja/', 'https://github.com/maria/loja.com', 'https://loja.maria.github', 'https://maria.com/github/loja'),
    Q('Após publicar, o que fazer para ver a versão mais nova da página?', 'Aguardar 1 a 3 minutos e recarregar com Ctrl+F5', 'Apagar o navegador', 'Desligar o computador', 'Criar outro repositório'),
    Q('O que NÃO deve existir no código publicado?', 'Senhas e chaves de acesso', 'Comentários explicativos', 'Um README', 'Caminhos relativos'),
  ]);

  PRAT[107] = { tarefas: ['<strong>Nível 1.</strong> Para cada um dos 5 desafios de bug, <strong>escreva no caderno a causa antes de ler a resposta</strong>.', '<strong>Nível 2.</strong> Reproduza no seu computador dois dos bugs (digite o código com o erro) e corrija cada um.', '<strong>Nível 2.</strong> Marque, na lista de revisão por módulo, o que você ainda não consegue explicar sem olhar. Volte a essas aulas.', '<strong>Explique:</strong> escolha um bug e explique a um colega: sintoma, causa e como investigar com o console.'],
    desafio: '<strong>Nível 3.</strong> Quebre <strong>de propósito</strong> um trecho da sua loja (um erro por vez), peça a um colega para achar o bug usando só o console e depois troquem.' };
  PRAT[108] = { tarefas: ['<strong>Nível 1.</strong> Revise o checklist de entrega do projeto final e confira cada item na sua loja.', '<strong>Nível 2.</strong> Faça um teste da loja seguindo o roteiro: cadastrar, alterar, excluir, comprar, remover do carrinho, recarregar a página.', '<strong>Nível 2.</strong> Treine em voz alta a explicação das funções <code>salvarProduto</code>, <code>atualizarGrid</code>, <code>comprar</code> e <code>excluirProduto</code>.', '<strong>Explique:</strong> grave ou escreva, com suas palavras, o caminho completo: do clique do botão até o dado aparecer na tela.'],
    desafio: '<strong>Nível 3.</strong> Faça a <strong>defesa individual</strong>: o professor escolhe uma função do seu projeto e pede que você explique, altere (por exemplo, adicionar um campo) e corrija um bug ao vivo.' };

  // ══════════════════════════════════════════════════════
  // 107 — REVISÕES E DESAFIOS DE DEPURAÇÃO   (módulo 11)
  // ══════════════════════════════════════════════════════
  A(107, 'Revisão: Desafios de Depuração', 'Revisar os módulos achando bugs reais em HTML, CSS, JavaScript, DOM e localStorage', '🔍', [
    P('🧭', 'COMO USAR ESTA REVISÃO',
      `<p>Em vez de reler a teoria, você vai <strong>investigar 5 códigos com defeito</strong>, cada um de um módulo. Para cada um:</p>`,
      lista(['1️⃣ Leia o <strong>sintoma</strong> (o que o usuário vê)', '2️⃣ <strong>Escreva no caderno a causa provável</strong> antes de continuar', '3️⃣ Só então leia a explicação e compare', '4️⃣ Anote o que você errou: é o que precisa revisar']),
      box('amarelo', `<strong>Não vale pular a etapa 2.</strong> Quem lê a resposta sem tentar não aprende a achar bugs, só a reconhecer a solução depois.`),
      caderno(['Sintoma → hipótese (escrita) → conferir → corrigir', 'Errar a hipótese é o melhor momento de aprendizagem'])),
    P('🎨', 'BUG 1 · HTML e CSS: o estilo não aparece',
      code(`<head>
  <link rel="stylesheet" href="estilos.css">
</head>

/* arquivo real da pasta: estilo.css */`),
      `<p style="margin-top:12px"><strong>Sintoma:</strong> a página aparece sem cores nem layout.</p>`,
      preveja(`onde você olharia primeiro? (dica: F12 → aba Network, procure uma linha vermelha)`),
      box('verde', `<strong>Causa:</strong> o <code>href</code> diz <code>estilos.css</code>, mas o arquivo se chama <code>estilo.css</code>. O Network mostra <strong>404</strong> nesse arquivo. <strong>Correção:</strong> o nome precisa ser <em>idêntico</em>.`)),
    P('🔢', 'BUG 2 · JavaScript: o total sai errado',
      code(`let preco = document.getElementById("preco").value;   // usuário digitou 20
let qtd   = document.getElementById("qtd").value;     // usuário digitou 3
console.log(preco + qtd);                              // mostra 203`),
      `<p style="margin-top:12px"><strong>Sintoma:</strong> o total deveria ser <code>60</code> (preço × quantidade) ou a soma <code>23</code>; aparece <code>203</code>.</p>`,
      preveja(`por que "20" e "3" viraram 203? (lembre o que <code>.value</code> sempre devolve)`),
      box('verde', `<strong>Causa:</strong> <code>.value</code> devolve <strong>texto</strong>, e o <code>+</code> entre textos <strong>junta</strong>. <strong>Correção:</strong> <code>Number(preco) + Number(qtd)</code> (e, para o total da compra, <code>Number(preco) * Number(qtd)</code>).`)),
    P('🧱', 'BUG 3 · DOM: o botão não faz nada',
      code(`document.getElementById("btnSalvar").addEventListener("click", salvarProduto());

// no HTML: <button id="btnSalvar">Salvar</button>`),
      `<p style="margin-top:12px"><strong>Sintoma:</strong> ao abrir a página, o produto é salvo sozinho (ou dá erro), e o clique não faz nada.</p>`,
      preveja(`o que muda entre <code>salvarProduto</code> e <code>salvarProduto()</code> dentro do <code>addEventListener</code>?`),
      box('verde', `<strong>Causa:</strong> com parênteses, a função <strong>roda na hora</strong> e o que o evento recebe é o resultado dela (<code>undefined</code>). <strong>Correção:</strong> passar <strong>sem parênteses</strong>: <code>addEventListener("click", salvarProduto)</code>.`)),
    P('🗄️', 'BUG 4 · localStorage: aparece [object Object]',
      code(`function salvarProduto() {
  let produto = { id: "p1", nome: "Caneta", preco: 3.5 };
  localStorage.setItem("p1", produto);
}

// F12 → Application mostra:  p1  →  [object Object]`),
      `<p style="margin-top:12px"><strong>Sintoma:</strong> o produto "salva", mas ao ler os dados todos estão perdidos.</p>`,
      preveja(`o que o localStorage faz com tudo que entra nele?`),
      box('verde', `<strong>Causa:</strong> o localStorage só guarda <strong>texto</strong>; o objeto foi convertido para <code>"[object Object]"</code>. <strong>Correção:</strong> <code>localStorage.setItem("p1", JSON.stringify(produto))</code> ao guardar e <code>JSON.parse(...)</code> ao ler.`)),
    P('🛒', 'BUG 5 · Loja: o carrinho mistura os produtos',
      code(`function desenharCarrinho() {
  let total = 0;
  for (let i = 0; i < localStorage.length; i++) {
    let chave = localStorage.key(i);
    let item = JSON.parse(localStorage.getItem(chave));
    total = total + item.preco;
  }
  console.log(total);
}`),
      `<p style="margin-top:12px"><strong>Sintoma:</strong> o total do carrinho é muito maior do que a soma dos itens comprados.</p>`,
      preveja(`quais chaves o laço está somando? Há algum filtro?`),
      box('verde', `<strong>Causa:</strong> falta o filtro por família: o laço soma <strong>produtos (<code>p</code>) e itens do carrinho (<code>c</code>)</strong> juntos. <strong>Correção:</strong> <code>if (chave[0] !== "c") continue;</code> logo depois de ler a chave.`),
      caderno(['Bug de total: confira o tipo (texto × número) e o filtro p/c', 'Bug de clique: parênteses no addEventListener', 'Bug de [object Object]: faltou stringify/parse'])),
    P('✅', 'REVISÃO EM UMA PÁGINA',
      `<p>Marque o que você consegue <strong>explicar sem olhar</strong>. O que não marcar é o que revisar:</p>`,
      lista(['🌐 Cliente, servidor e as 3 linguagens', '🧱 Tags, atributos, formulário com <code>label</code> e <code>id</code>', '🎨 Seletores, caixa, Flexbox e Grid', '⚡ Variáveis, tipos, <code>if</code>, <code>for</code>, arrays, objetos e funções', '👆 Selecionar elementos, <code>textContent</code>, eventos e <code>.value</code>', '🐞 Ler erro do console e investigar com <code>console.log</code>', '🗄️ <code>setItem</code>, <code>getItem</code>, <code>JSON.stringify</code> e <code>JSON.parse</code>', '🛒 Chaves <code>p</code> e <code>c</code>, <code>atualizarGrid</code>, <code>comprar</code>', '⏱️ <code>fetch</code>, <code>async/await</code> e <code>try/catch</code>', '🌿 <code>commit</code>, <code>push</code> e GitHub Pages']),
      box('azul', `Cada item tem uma aula e um <strong>teste de nivelamento</strong> no módulo correspondente. Use-os para conferir o que ainda está fraco.`)),
  ], [
    Q('O CSS não carrega e o Network mostra 404 em estilos.css. Causa provável?', 'O nome do arquivo não é idêntico ao do href', 'O JavaScript está errado', 'Faltou o <body>', 'O navegador está desatualizado'),
    Q('Com preco = "20" e qtd = "3" (textos), o que mostra preco + qtd?', '203', '23', '60', 'NaN'),
    Q('Como obter o total correto da compra (preço vezes quantidade)?', 'Number(preco) * Number(qtd)', 'preco + qtd', 'preco.qtd', 'Text(preco) * qtd'),
    Q('addEventListener("click", salvarProduto()) faz o quê?', 'Executa salvarProduto na hora, e não no clique', 'Executa só no clique', 'Cria o botão', 'Apaga o evento'),
    Q('localStorage.setItem("p1", objeto) guarda:', '"[object Object]"', 'O objeto completo', 'O objeto em JSON', 'Um erro'),
    Q('Qual é a correção correta do bug anterior?', 'JSON.stringify ao guardar e JSON.parse ao ler', 'Trocar setItem por getItem', 'Guardar com let', 'Usar innerHTML'),
    Q('O total do carrinho está maior que a soma dos itens. O que provavelmente falta no laço?', 'O filtro chave[0] === "c"', 'O let total', 'O JSON.parse', 'O return'),
    Q('Qual aba do F12 ajuda a achar um arquivo não encontrado (404)?', 'Network', 'Application', 'Elements', 'Sources apenas'),
    Q('Qual é o primeiro passo ao investigar um bug?', 'Ler o sintoma e a mensagem de erro e levantar uma hipótese', 'Apagar o código e recomeçar', 'Copiar uma solução da internet', 'Mudar vários trechos ao mesmo tempo'),
    Q('Por que escrever a hipótese ANTES de ler a resposta?', 'Para treinar a investigação, e não apenas reconhecer a solução', 'Porque a resposta muda depois', 'Porque o professor corrige', 'Não é necessário'),
  ]);

  // ══════════════════════════════════════════════════════
  // 108 — SIMULADO FINAL, PROJETO E DEFESA   (módulo 11)
  // ══════════════════════════════════════════════════════
  var TAB = 'width:100%;border-collapse:collapse;margin-top:10px;font-size:12.5px';
  var TH = 'padding:8px;border:1px solid var(--border);text-align:left;background:rgba(79,142,247,.15)';
  var TD = 'padding:8px;border:1px solid var(--border);vertical-align:top;line-height:1.5';
  function linhaRubrica(crit, pts, exc, ade, par, ins) {
    return '<tr><td style="' + TD + '"><strong>' + crit + '</strong><br>(' + pts + ' pts)</td><td style="' + TD + '">' + exc + '</td><td style="' + TD + '">' + ade + '</td><td style="' + TD + '">' + par + '</td><td style="' + TD + '">' + ins + '</td></tr>';
  }
  function tabelaRubrica(linhas) {
    return '<div style="overflow-x:auto"><table style="' + TAB + '"><tr><th style="' + TH + '">Critério</th><th style="' + TH + '">Excelente</th><th style="' + TH + '">Adequado</th><th style="' + TH + '">Parcial</th><th style="' + TH + '">Insuficiente</th></tr>' + linhas.join('') + '</table></div>';
  }
  A(108, 'Avaliação: Simulado Final, Projeto e Defesa', 'Simulado de 30 questões, rubrica do projeto da loja (10 pontos), defesa individual e portfólio', '🏆', [
    P('📋', 'COMO SERÁ A AVALIAÇÃO',
      lista(['📝 <strong>Simulado</strong>: 30 questões de múltipla escolha, ao final desta aula (gera a nota de 0 a 10)', '🛒 <strong>Projeto final</strong>: a loja virtual funcionando, avaliada pela rubrica de 10 pontos', '🗣️ <strong>Defesa individual</strong>: você explica o seu código ao professor (1 dos critérios da rubrica)', '🌐 <strong>Portfólio</strong>: loja publicada no GitHub Pages, com repositório e README']),
      box('azul', `<strong>Distribuição do simulado:</strong> HTML e CSS (5) · JavaScript básico (8) · Arrays, objetos e funções (5) · DOM e eventos (4) · localStorage e JSON (4) · Depuração, segurança e APIs (4).`),
      caderno(['Simulado (30 questões) + Projeto (rubrica) + Defesa + Portfólio', 'O projeto vale 10 pontos, e explicar o próprio código vale 1,0'])),
    P('📐', 'RUBRICA DO PROJETO FINAL (1 de 2)',
      `<p>Escala de pontos: <strong>Excelente</strong> = pontuação máxima · <strong>Adequado</strong> ≈ 75% · <strong>Parcial</strong> ≈ 50% · <strong>Insuficiente</strong> = 0 a 25%.</p>`,
      tabelaRubrica([
        linhaRubrica('HTML e CSS', '1,0', 'HTML semântico, formulário com <code>label</code>, layout organizado e legível, responsivo', 'Estrutura correta, com poucos desvios de organização ou legibilidade', 'Estrutura incompleta ou layout confuso; não se adapta ao celular', 'Página não carrega corretamente ou sem estilo'),
        linhaRubrica('Cadastro e validação', '1,5', 'Cadastra, converte tipos e <strong>recusa dados inválidos</strong> com mensagem clara', 'Cadastra corretamente; validação cobre só parte dos casos', 'Cadastra, mas sem validar ou convertendo tipos de forma incorreta', 'Não cadastra ou quebra com dados comuns'),
        linhaRubrica('Listagem e atualização', '1,5', '<code>atualizarGrid</code> limpa, percorre, filtra <code>p</code> e redesenha; atualiza sempre que os dados mudam', 'Lista correta; atualiza na maioria das situações', 'Lista com falhas (duplica itens, mistura <code>p</code> e <code>c</code>)', 'Não lista ou não persiste ao recarregar'),
        linhaRubrica('Alteração e exclusão', '1,0', 'Altera mantendo o id e exclui também a cópia do carrinho', 'Altera e exclui corretamente, com pequenas falhas de atualização', 'Só uma das duas funciona ou deixa "produto fantasma"', 'Nenhuma funciona'),
      ])),
    P('📐', 'RUBRICA DO PROJETO FINAL (2 de 2)',
      tabelaRubrica([
        linhaRubrica('Carrinho e total', '1,5', 'Compra, quantidade, remoção e <strong>total correto</strong>, mesmo após recarregar', 'Compra e total corretos; faltam quantidade ou remoção', 'Compra funciona, mas o total sai errado em alguns casos', 'Carrinho não funciona'),
        linhaRubrica('localStorage e JSON', '1,5', 'Usa <code>stringify</code>/<code>parse</code> corretamente, convenção <code>p</code>/<code>c</code> e trata dados ausentes', 'Uso correto, com falhas em casos raros', 'Usa, mas com erros (ex.: <code>[object Object]</code>) corrigidos só com ajuda', 'Não guarda ou perde os dados'),
        linhaRubrica('Organização, depuração e segurança', '1,0', 'Código organizado, nomes claros, sem senhas; <code>textContent</code> ou texto tratado; resolve bugs com o console', 'Organizado, com pequenas falhas de nomes ou comentários', 'Código confuso ou com <code>innerHTML</code> sem cuidado', 'Código desorganizado e inseguro'),
        linhaRubrica('Explicação individual', '1,0', 'Explica cada função com as próprias palavras, <strong>altera e corrige ao vivo</strong>', 'Explica bem a maioria; precisa de pouca ajuda', 'Explica de forma superficial ou só lendo o código', 'Não consegue explicar o que entregou'),
      ]),
      box('amarelo', `<strong>Atenção:</strong> um projeto que funciona, mas que o aluno <strong>não consegue explicar</strong>, perde pontos nos critérios em que a explicação é necessária. Copiar sem entender não é aprovado.`)),
    P('🗣️', 'DEFESA INDIVIDUAL: O QUE O PROFESSOR PODE PEDIR',
      lista(['"Explique o que acontece desde o clique em <strong>Salvar</strong> até o produto aparecer na tabela."', '"Por que o produto é guardado com <code>JSON.stringify</code>?"', '"Altere o código para <strong>adicionar um campo novo</strong> ao produto."', '"Aqui há um bug. Descubra a causa usando o console."', '"Por que as chaves começam com <code>p</code> e <code>c</code>?"', '"O que aconteceria se esta linha fosse apagada?"']),
      box('verde', `<strong>Como se preparar:</strong> explique em voz alta, sem olhar o código, o caminho completo dos dados. Se travar, é o ponto que precisa revisar.`),
      caderno(['Defesa = explicar + alterar + corrigir ao vivo', 'Prepare-se explicando em voz alta'])),
    P('✅', 'CHECKLIST DE ENTREGA',
      lista(['☐ A loja cadastra, lista, altera, exclui, compra e remove do carrinho', '☐ O total do carrinho está correto, inclusive depois de recarregar', '☐ Dados inválidos são recusados com mensagem', '☐ Os dados ficam no localStorage com a convenção <code>p</code> + id e <code>c</code> + id', '☐ Código organizado, nomes claros, sem senhas', '☐ Repositório no GitHub com README e commits com boas mensagens', '☐ Loja publicada no GitHub Pages e testada no celular', '☐ Você consegue explicar cada função sem olhar']),
      box('azul', `Depois de entregar, faça o <strong>simulado abaixo</strong>. Ele não precisa ser o último passo: se preferir, responda antes e use o resultado para revisar.`)),
  ], [
    // HTML e CSS (5)
    Q('Qual tag deve conter o texto visível principal da página?', '<body>', '<head>', '<meta>', '<title>'),
    Q('Para que serve o atributo alt de uma imagem?', 'Descrever a imagem para leitores de tela e para quando ela não carrega', 'Trocar a imagem por outra', 'Aumentar o tamanho', 'Definir o endereço da imagem'),
    Q('Como o CSS seleciona o elemento com id="titulo"?', '#titulo', '.titulo', 'titulo()', '*titulo'),
    Q('Qual propriedade do CSS cria espaço INTERNO entre o conteúdo e a borda?', 'padding', 'margin', 'gap', 'border'),
    Q('Qual regra alinha filhos lado a lado dentro de um pai?', 'display: flex', 'display: none', 'position: lost', 'float: text'),
    // JavaScript básico (8)
    Q('Qual é o resultado de "5" + 3 ?', '"53"', '8', '"8"', 'NaN'),
    Q('Qual é o resultado de 10 % 3 ?', '1', '3', '0', '3,33'),
    Q('Qual operador compara dois valores sem converter o tipo?', '===', '=', '==>', '=+'),
    Q('Depois de let x = 4; x = x * 3; quanto vale x?', '12', '7', '43', '4'),
    Q('Em const a = 1; a = 2; o que acontece?', 'Erro: não se pode reatribuir uma const', 'a passa a valer 2', 'a passa a valer 3', 'Nada acontece'),
    Q('Quantas voltas dá for (let i = 0; i < 4; i++) ?', '4', '3', '5', 'Infinitas'),
    Q('Com nota = 6, o que mostra if (nota >= 7) "A"; else if (nota >= 5) "B"; else "C"?', 'B', 'A', 'C', 'A e B'),
    Q('O que é typeof "10"?', '"string"', '"number"', '"boolean"', '"undefined"'),
    // Arrays, objetos, funções (5)
    Q('Dado frutas = ["Maçã","Uva","Pera"], o que é frutas[1]?', '"Uva"', '"Maçã"', '"Pera"', 'undefined'),
    Q('Qual método adiciona um item no fim do array?', 'push()', 'add()', 'append()', 'insert()'),
    Q('Dado p = {nome:"Caneta", preco:3.5}, como ler o preço?', 'p.preco', 'p(preco)', 'p->preco', 'preco.p'),
    Q('O que faz return dentro de uma função?', 'Devolve um valor e encerra a função', 'Repete a função', 'Mostra no console', 'Apaga a variável'),
    Q('Dado function f(a, b) { return a * b; }, quanto é f(3, 4)?', '12', '7', '34', 'undefined'),
    // DOM e eventos (4)
    Q('Qual comando acha o elemento com id="nome"?', 'document.getElementById("nome")', 'document.get("nome")', 'find("#nome")', 'document.nome()'),
    Q('Qual propriedade devolve o que foi digitado em um input?', '.value', '.text', '.digitado', '.content'),
    Q('Qual é a forma correta de ligar a função salvar ao clique?', 'botao.addEventListener("click", salvar)', 'botao.addEventListener("click", salvar())', 'botao.click = salvar()', 'botao.on(salvar)'),
    Q('Qual é a diferença entre textContent e innerHTML?', 'innerHTML interpreta HTML; textContent trata tudo como texto', 'São iguais', 'textContent interpreta HTML', 'innerHTML só funciona em botões'),
    // localStorage e JSON (4)
    Q('O que o localStorage guarda, sempre?', 'Texto', 'Objetos', 'Funções', 'Imagens'),
    Q('Qual comando transforma um objeto em texto JSON?', 'JSON.stringify(obj)', 'JSON.parse(obj)', 'obj.toNumber()', 'Text(obj)'),
    Q('Qual comando devolve o NOME da gaveta na posição i?', 'localStorage.key(i)', 'localStorage.getItem(i)', 'localStorage.name(i)', 'localStorage.at(i)'),
    Q('O que faz "c" + id.slice(1), com id = "p123"?', 'Gera "c123"', 'Gera "cp123"', 'Gera "p123c"', 'Gera "123"'),
    // Depuração, segurança e APIs (4)
    Q('TypeError: Cannot read properties of null normalmente indica:', 'O elemento não foi encontrado (id errado, por exemplo)', 'Faltou um ponto e vírgula', 'A internet caiu', 'O CSS está errado'),
    Q('Por que nunca guardar senhas no localStorage?', 'Qualquer pessoa com acesso ao navegador pode lê-las', 'Porque elas não cabem', 'Porque o JavaScript proíbe', 'Porque somem sozinhas'),
    Q('O que o fetch(url) devolve?', 'Uma Promise', 'Os dados prontos', 'Um número', 'Um erro obrigatório'),
    Q('Qual é a melhor mensagem de commit?', 'Adiciona validação do formulário de produtos', 'arrumei', 'asdf', 'agora vai'),
  ]);

  PRAT[93] = { tarefas: ['<strong>Nível 1.</strong> Crie a pasta <code>loja-virtual</code> com os 7 arquivos da estrutura (podem estar vazios) e confira os nomes.', '<strong>Nível 1.</strong> Desenhe no caderno as 3 telas e, ao lado de cada uma, as funções que ela usa.', '<strong>Nível 2.</strong> Acrescente o campo <code>categoria</code> ao modelo do produto, no desenho e no objeto de exemplo.', '<strong>Explique:</strong> com suas palavras, por que as três telas compartilham os mesmos dados e como isso é possível.'],
    desafio: '<strong>Nível 3.</strong> Desenhe o <strong>diagrama completo dos dados</strong>: do clique em "Comprar" até a chave <code>c…</code> aparecer no localStorage, indicando qual função faz cada passo.' };
  PRAT[94] = { tarefas: ['<strong>Nível 1.</strong> Digite o <code>gerenciar.html</code> (formulário e tabela) e abra no navegador.', '<strong>Nível 1.</strong> Digite o <code>estilo.css</code> e confirme o fundo escuro, o botão e a vitrine em grade.', '<strong>Nível 2.</strong> Mude a cor de destaque e o número mínimo de largura do card (<code>minmax</code>). Veja o efeito.', '<strong>Explique:</strong> com suas palavras, por que cada campo do formulário precisa de um <code>id</code>.'],
    desafio: '<strong>Nível 3.</strong> Monte as páginas <code>loja.html</code> e <code>carrinho.html</code> sozinho, usando o CSS compartilhado, e confira se abrem sem erros no console.' };
  PRAT[95] = { tarefas: ['<strong>Nível 1.</strong> Digite a função <code>validarProduto</code> e teste no console com <code>("", 5)</code>, <code>("Caneta", 0)</code> e <code>("Caneta", 3)</code>.', '<strong>Nível 2.</strong> Teste com <code>("Caneta", "abc")</code>. O que acontece? Corrija usando <code>Number.isNaN</code>.', '<strong>Nível 2.</strong> Ligue a validação ao <code>salvarProduto</code> e mostre a mensagem na tela.', '<strong>Explique:</strong> com suas palavras, por que <code>Number("abc") &lt;= 0</code> é <code>false</code> e por que isso é perigoso.'],
    desafio: '<strong>Nível 3.</strong> Acrescente a regra: <strong>não aceitar dois produtos com o mesmo nome</strong> (percorra as chaves <code>p…</code> para conferir).' };
  PRAT[96] = { tarefas: ['<strong>Nível 1.</strong> Digite <code>lerProdutos()</code> e confira no console que devolve um array de objetos.', '<strong>Nível 1.</strong> Ligue o campo de busca com o evento <code>input</code> e veja a vitrine filtrar enquanto digita.', '<strong>Nível 2.</strong> Faça a busca ignorar maiúsculas e minúsculas. Teste com "CANETA" e "caneta".', '<strong>Explique:</strong> com suas palavras, o que o <code>filter</code> devolve e por que ele não altera o array original.'],
    desafio: '<strong>Nível 3.</strong> Acrescente um <code>select</code> de categoria que filtra a vitrine, combinando com a busca por nome.' };
  PRAT[97] = { tarefas: ['<strong>Nível 1.</strong> Digite o novo <code>comprar</code> e confirme que comprar duas vezes o mesmo produto aumenta a quantidade.', '<strong>Nível 1.</strong> Digite <code>desenharCarrinho</code> com o total (preço × quantidade) e confira com uma calculadora.', '<strong>Nível 2.</strong> Acrescente os botões <strong>+</strong>, <strong>−</strong> e <strong>Remover</strong> ao item.', '<strong>Explique:</strong> com suas palavras, por que o total usa <code>preco * quantidade</code> e não só <code>preco</code>.'],
    desafio: '<strong>Nível 3.</strong> Faça o botão <strong>Finalizar compra</strong>, que mostra o resumo e esvazia o carrinho apagando só as chaves <code>c…</code>, sem tocar nos produtos.' };
  PRAT[98] = { tarefas: ['<strong>Nível 1.</strong> Siga o roteiro de testes da aula e preencha a tabela do caderno (esperado × obtido).', '<strong>Nível 2.</strong> Teste com o localStorage vazio (Application → Clear) e veja se a loja abre sem erros.', '<strong>Nível 2.</strong> Teste os casos extremos: preço muito grande, nome com acento, 50 produtos.', '<strong>Explique:</strong> com suas palavras, por que testar com dados antigos ou vazios também faz parte do projeto.'],
    desafio: '<strong>Nível 3.</strong> Prepare e faça uma <strong>apresentação de 3 minutos</strong> da sua loja: mostrar, explicar o fluxo dos dados e corrigir ao vivo um bug que o colega provocar.' };

  // ══════════════════════════════════════════════════════
  // 93 — LOJA 1: PLANEJAMENTO E ESTRUTURA
  // ══════════════════════════════════════════════════════
  A(93, 'Loja 1: Planejamento e Estrutura', 'Pensar antes de programar: telas, dados, funções e arquivos da loja virtual', '🗺️', [
    P('💡', 'ENTENDA: planejar antes de digitar',
      `<p>Quem começa direto pelo código costuma se perder no meio. Programadores experientes <strong>primeiro desenham</strong> o que vão construir, e só depois digitam.</p>`,
      analogia(`construir uma casa sem planta: dá para empilhar tijolos, mas você vai quebrar paredes depois. A <strong>planta</strong> do nosso projeto é: telas, dados e funções.`),
      lista(['🖥️ <strong>Telas</strong>: Gerenciar (cadastrar), Loja (vitrine) e Carrinho', '🗃️ <strong>Dados</strong>: cada produto é um objeto guardado no localStorage', '⚙️ <strong>Funções</strong>: pequenas tarefas com nomes claros']),
      caderno(['Planejar: telas → dados → funções → arquivos', 'Planta primeiro, tijolo depois'])),
    P('🗃️', 'Os dados da loja',
      code(`// um produto (chave no localStorage: "p" + id)
{ id: "p1700000000", nome: "Caneta", preco: 3.5, categoria: "Papelaria" }

// um item do carrinho (chave: "c" + o resto do id)
{ id: "p1700000000", nome: "Caneta", preco: 3.5, quantidade: 2 }`),
      lista(['Produtos usam a chave <code>"p" + id</code>', 'Itens do carrinho usam <code>"c" + id.slice(1)</code>', 'Tudo é guardado com <code>JSON.stringify</code> e lido com <code>JSON.parse</code>']),
      preveja(`se o produto tem a chave <code>p1700000000</code>, qual é a chave do carrinho para esse produto?`)),
    P('📁', 'A estrutura de arquivos',
      code(`loja-virtual/
  gerenciar.html     <- cadastro, lista, alterar, excluir
  loja.html          <- vitrine com o botão Comprar
  carrinho.html      <- itens comprados e total
  estilo.css         <- aparência das 3 páginas
  gerenciar.js
  loja.js
  carrinho.js`),
      `<p style="margin-top:12px">Cada página tem <strong>o seu JavaScript</strong>, mas todas leem a <strong>mesma gaveta</strong> do navegador. Por isso, os dados aparecem iguais nas três telas.</p>`,
      atencao(`os três arquivos <code>.js</code> não "conversam" entre si: o que os liga é o <code>localStorage</code>. Funções repetidas (como ler os produtos) serão escritas em cada arquivo, ou reunidas depois num <code>dados.js</code>.`)),
    P('🐞', 'ENCONTRE O ERRO: o script não carregou',
      code(`<!-- no gerenciar.html -->
<script src="gerenciar.js"></scritp>

// no console:
// Uncaught ReferenceError: salvarProduto is not defined`),
      lista(['<strong>Sintoma:</strong> o botão não faz nada, e o console diz que a função não existe', '<strong>Causa:</strong> a tag foi escrita errado (<code>&lt;/scritp&gt;</code>), então o navegador nunca carregou o arquivo', '<strong>Outras causas do mesmo sintoma:</strong> nome do arquivo diferente (<code>Gerenciar.js</code>), arquivo em outra pasta ou erro de sintaxe dentro dele']),
      box('verde', `<strong>Como investigar:</strong> F12 → <strong>Network</strong> → recarregue a página. Se o <code>.js</code> aparece com <strong>404</strong> ou não aparece, o problema é o carregamento, e não a lógica.`)),
    P('🔧', 'MODIFIQUE: o kit inicial (para quem entra direto aqui)',
      `<p>Se você já domina JavaScript, comece por este esqueleto. Ele tem as funções vazias, na ordem em que as construiremos:</p>`,
      code(`// gerenciar.js: kit inicial
function salvarProduto() {
  // 1. ler os campos  2. validar  3. montar o objeto
  // 4. guardar com JSON.stringify  5. atualizarGrid()
}

function atualizarGrid() {
  // limpar -> percorrer localStorage -> filtrar "p" -> parse -> desenhar
}

function alterarProduto(id) { /* ler, mudar, gravar na mesma chave */ }
function excluirProduto(id) { /* apagar p... e c... */ }

atualizarGrid();   // desenha ao abrir a página`),
      lista(['Acrescente o campo <code>categoria</code> ao modelo do produto', 'Escreva, em comentário, o que cada função vai fazer']),
      caderno(['Cada função uma tarefa', 'atualizarGrid() ao abrir a página', 'Kit inicial = esqueleto com as funções vazias'])),
    P('🎯', 'DESAFIO: o diagrama dos dados',
      `<p>Em uma folha, desenhe o caminho completo de um produto:</p>`,
      lista(['Formulário → <code>salvarProduto</code> → <code>localStorage ("p…")</code> → <code>atualizarGrid</code> → tabela', 'Vitrine → <code>comprar</code> → <code>localStorage ("c…")</code> → <code>desenharCarrinho</code> → total']),
      box('verde', `<strong>Explique com suas palavras:</strong> por que o carrinho não guarda os dados "dentro da tela"? (Se você respondeu que a tela só <em>desenha</em> o que está no localStorage, entendeu o ponto central do projeto.)`)),
  ], [
    Q('Por que planejar antes de programar?', 'Para evitar refazer o código no meio do caminho', 'Porque o navegador exige', 'Porque o localStorage pede', 'Para o código rodar mais rápido'),
    Q('O que une as três telas da loja?', 'O mesmo localStorage', 'O mesmo arquivo JavaScript', 'O servidor', 'O CSS'),
    Q('Qual é a chave de um produto com id "1700000000" na convenção da loja?', '"p1700000000"', '"c1700000000"', '"produto"', '"1700000000p"'),
    Q('Qual é a chave do carrinho do produto p1700000000?', '"c1700000000"', '"p1700000000"', '"cp1700000000"', '"carrinho"'),
    Q('Como cada produto é guardado no localStorage?', 'Como texto JSON, com JSON.stringify', 'Como objeto direto', 'Como número', 'Como imagem'),
    Q('O botão não faz nada e o console mostra "salvarProduto is not defined". Qual a primeira investigação?', 'Ver no Network se o arquivo .js foi carregado', 'Reinstalar o navegador', 'Apagar o CSS', 'Trocar o localStorage'),
    Q('Qual erro de escrita impede o script de carregar?', '</scritp> no lugar de </script>', 'Ter comentários no código', 'Usar let', 'Ter espaços no HTML'),
    Q('O que o atualizarGrid() ao final do arquivo garante?', 'Que os dados guardados apareçam ao abrir a página', 'Que o produto seja excluído', 'Que o preço seja validado', 'Que o carrinho esvazie'),
    Q('Por que cada função deve ter uma única tarefa?', 'Fica mais fácil de testar, ler e corrigir', 'O JavaScript exige', 'Para o arquivo ficar maior', 'Para usar menos memória'),
    Q('No planejamento, o que representa o objeto { nome, preco }?', 'Os dados de um produto', 'Uma função', 'Uma tela', 'Um erro'),
  ]);

  // ══════════════════════════════════════════════════════
  // 94 — LOJA 2: HTML E CSS
  // ══════════════════════════════════════════════════════
  A(94, 'Loja 2: HTML e CSS das Telas', 'Montar o formulário, a tabela, a vitrine e o carrinho com HTML e CSS, antes de programar o comportamento', '🏗️', [
    P('💡', 'ENTENDA: primeiro a casca, depois o comportamento',
      `<p>Vamos montar as três páginas <strong>sem JavaScript</strong>. Assim você vê o que vai ser preenchido, e o código fica mais fácil de escrever.</p>`,
      analogia(`é montar o <strong>cenário</strong> do teatro antes de ensaiar. Os atores (JavaScript) entram depois, mas já sabem onde ficar.`),
      lista(['🔤 Todo campo e botão com <code>id</code> claro', '📦 Todo lugar que o JS vai preencher com <code>id</code> também (<code>tabela</code>, <code>vitrine</code>, <code>lista-carrinho</code>)']),
      caderno(['HTML/CSS primeiro, JavaScript depois', 'Cada área que o JS vai preencher precisa de um id'])),
    P('📝', 'DIGITE: gerenciar.html',
      code(`<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Gerenciar produtos</title>
  <link rel="stylesheet" href="estilo.css">
</head>
<body>
  <header><h1>Gerenciar produtos</h1>
    <nav><a href="gerenciar.html">Gerenciar</a> <a href="loja.html">Loja</a> <a href="carrinho.html">Carrinho</a></nav>
  </header>
  <main>
    <form id="formulario">
      <label for="nome">Nome</label>
      <input type="text" id="nome" placeholder="Ex: Caneta">

      <label for="preco">Preço</label>
      <input type="number" id="preco" step="0.01" min="0">

      <button type="button" id="btnSalvar">Salvar</button>
      <p id="mensagem"></p>
    </form>

    <table>
      <thead><tr><th>Produto</th><th>Preço</th><th>Ações</th></tr></thead>
      <tbody id="tabela"></tbody>
    </table>
  </main>
  <script src="gerenciar.js"></script>
</body>
</html>`),
      lista(['<code>type="button"</code> evita recarregar a página ao clicar', '<code>&lt;tbody id="tabela"&gt;</code> é onde o <code>atualizarGrid</code> vai desenhar as linhas', '<code>&lt;p id="mensagem"&gt;</code> mostrará os avisos de validação']),
      preveja(`o que aparece na tela com esse HTML, antes de existir qualquer JavaScript? A tabela mostra linhas?`)),
    P('🎨', 'DIGITE: estilo.css',
      code(`body { font-family: Arial, sans-serif; background: #0f1117; color: #e8eaf0; margin: 0; }
header, main { max-width: 900px; margin: 0 auto; padding: 16px; }
nav a { color: #4f8ef7; margin-right: 12px; }

form { display: grid; gap: 8px; max-width: 360px; }
input, button { padding: 8px; border-radius: 8px; border: 1px solid #2a2d3a; }
button { background: #4f8ef7; color: white; border: none; cursor: pointer; }
button:hover { background: #3b6fd1; }
#mensagem { color: #f87171; min-height: 1.2em; }

table { width: 100%; border-collapse: collapse; margin-top: 16px; }
th, td { text-align: left; padding: 8px; border-bottom: 1px solid #2a2d3a; }

#vitrine { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; }
.card { background: #1a1d27; border: 1px solid #2a2d3a; border-radius: 12px; padding: 16px; }`),
      lista(['<code>display: grid</code> + <code>gap</code> organiza o formulário e a vitrine', '<code>repeat(auto-fill, minmax(200px, 1fr))</code> cria quantas colunas couberem', '<code>#mensagem</code> reserva a altura (<code>min-height</code>) para a página não "pular" quando o aviso aparece']),
      caderno(['CSS compartilhado: um arquivo para as 3 páginas', 'Grid na vitrine: colunas automáticas', 'min-height evita que a página pule'])),
    P('🐞', 'ENCONTRE O ERRO: o estilo não aparece nas outras telas',
      code(`<!-- loja.html -->
<link rel="stylesheet" href="css/estilo.css">

// Network: estilo.css  404 (Not Found)`),
      lista(['<strong>Causa:</strong> o caminho aponta para a pasta <code>css/</code>, que não existe', '<strong>Correção:</strong> o arquivo está na mesma pasta do HTML, então o caminho é só <code>estilo.css</code>', '<strong>Regra:</strong> o <code>href</code> é sempre relativo ao <em>HTML que o chama</em>']),
      atencao(`ao copiar um HTML para outra pasta, <strong>revise os caminhos</strong>. Esse é um dos erros mais frequentes em projetos com várias páginas.`)),
    P('🔧', 'MODIFIQUE: as outras duas telas',
      lista(['Troque a cor de destaque (<code>#4f8ef7</code>) por outra em todo o CSS (use localizar e substituir)', 'Mude <code>minmax(200px, 1fr)</code> para <code>minmax(150px, 1fr)</code> e veja o efeito', 'Acrescente uma <code>border-radius</code> maior nos cards']),
      code(`<!-- loja.html (corpo) -->
<main>
  <h2>Vitrine</h2>
  <div id="vitrine"></div>
</main>
<script src="loja.js"></script>

<!-- carrinho.html (corpo) -->
<main>
  <h2>Carrinho</h2>
  <ul id="lista-carrinho"></ul>
  <p id="total">Total: R$ 0,00</p>
</main>
<script src="carrinho.js"></script>`)),
    P('🎯', 'DESAFIO: as três páginas prontas',
      `<p>Monte <code>loja.html</code> e <code>carrinho.html</code> <strong>sozinho</strong>, a partir da estrutura acima, usando o mesmo <code>estilo.css</code>, o mesmo cabeçalho e o menu de navegação.</p>`,
      box('verde', `<strong>Confira:</strong> as três páginas abrem sem erros no console, os links do menu funcionam e o visual é o mesmo. <strong>Explique</strong> ao professor por que cada campo precisa de <code>id</code>.`)),
  ], [
    Q('Por que montar o HTML e o CSS antes do JavaScript?', 'Para saber o que será preenchido e onde', 'Porque o JavaScript só funciona depois', 'Para o site ficar mais rápido', 'Porque o CSS é obrigatório'),
    Q('Por que o botão do formulário usa type="button"?', 'Para não recarregar a página ao clicar', 'Para ficar azul', 'Para o JS reconhecer', 'Porque button não existe sem type'),
    Q('Em <tbody id="tabela">, para que serve o id?', 'O JavaScript vai desenhar as linhas ali', 'Mudar a cor da tabela', 'Dar um nome ao arquivo', 'Evitar o scroll'),
    Q('O que faz grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))?', 'Cria quantas colunas de pelo menos 200px couberem', 'Cria sempre 200 colunas', 'Limita a largura a 200px', 'Esconde o grid'),
    Q('O CSS não aparece e o Network mostra 404 em css/estilo.css. Causa provável?', 'A pasta css/ não existe: o caminho está errado', 'O JavaScript quebrou', 'O navegador bloqueou', 'Falta o <body>'),
    Q('O href de um link CSS é relativo a quê?', 'Ao arquivo HTML que o chama', 'Ao computador', 'À internet', 'Ao arquivo JavaScript'),
    Q('Para que serve min-height em #mensagem?', 'Reservar o espaço e a página não pular quando o aviso aparecer', 'Esconder a mensagem', 'Mudar a cor', 'Aumentar a fonte'),
    Q('O que o <p id="mensagem"></p> receberá depois?', 'Avisos de validação escritos pelo JavaScript', 'O CSS da página', 'O localStorage inteiro', 'Os produtos'),
    Q('Em <label for="nome">, o for deve ser igual a:', 'O id do input correspondente', 'O texto do label', 'A cor do campo', 'O nome do arquivo'),
    Q('O que o :hover no botão faz?', 'Muda o estilo enquanto o mouse está sobre ele', 'Desabilita o botão', 'Esconde o botão', 'Troca o id'),
  ]);

  // ══════════════════════════════════════════════════════
  // 95 — LOJA 4: VALIDAÇÃO
  // ══════════════════════════════════════════════════════
  A(95, 'Loja 4: Validação dos Dados', 'Recusar nomes vazios, preços inválidos e produtos repetidos antes de guardar', '✅', [
    P('💡', 'ENTENDA: nunca confie no que o usuário digita',
      `<p>Usuários erram, esquecem campos, digitam letras onde vai número, e às vezes testam o sistema de propósito. <strong>Validar</strong> é conferir os dados <em>antes</em> de guardar.</p>`,
      analogia(`o <strong>porteiro do prédio</strong>: confere quem está entrando antes de abrir a porta. O localStorage é o prédio, e a validação é o porteiro.`),
      lista(['❌ Nome vazio', '❌ Preço vazio, negativo, zero ou que não é número', '❌ Produto com nome repetido']),
      caderno(['Validar = conferir ANTES de guardar', 'Se inválido: mostrar mensagem e parar (return)'])),
    P('🧠', 'PREVEJA: a armadilha do NaN',
      code(`console.log(Number("abc"));          // ?
console.log(Number("abc") <= 0);     // ?
console.log(Number(""));             // ?`),
      preveja(`o que mostram as três linhas? E se um preço inválido passar pela validação <code>preco &lt;= 0</code>, o que você acha que acontece?`),
      box('verde', `<strong>Resultado:</strong> <code>NaN</code>, <code>false</code> e <code>0</code>. <code>NaN</code> (<em>Not a Number</em>) <strong>não é menor nem maior que nada</strong>, então <code>NaN &lt;= 0</code> é <code>false</code> e o preço inválido <strong>passaria</strong> na validação! Já o texto vazio vira <code>0</code>.`)),
    P('⌨️', 'DIGITE: a função validarProduto',
      code(`function validarProduto(nome, preco) {
  if (nome.trim() === "") {
    return "Informe o nome do produto.";
  }
  if (Number.isNaN(preco) || preco <= 0) {
    return "Informe um preço maior que zero.";
  }
  return "";   // vazio = sem erros
}`),
      lista(['<code>nome.trim()</code> remove espaços das pontas: "   " deixa de contar como nome', '<code>Number.isNaN(preco)</code> detecta o <code>NaN</code> (a armadilha anterior)', 'A função <strong>devolve a mensagem de erro</strong>, ou texto vazio quando está tudo certo']),
      code(`function salvarProduto() {
  let nome  = document.getElementById("nome").value;
  let preco = Number(document.getElementById("preco").value);
  let mensagem = document.getElementById("mensagem");

  let erro = validarProduto(nome, preco);
  if (erro !== "") {
    mensagem.textContent = erro;   // textContent: seguro
    return;                         // para aqui: não guarda
  }
  mensagem.textContent = "";
  // ... monta o objeto, JSON.stringify, setItem, atualizarGrid()
}`, 'Ligando a validação ao salvarProduto')),
    P('🐞', 'ENCONTRE O ERRO: o preço "vazio" passa',
      code(`let preco = Number(document.getElementById("preco").value);   // campo vazio -> 0
if (preco < 0) { return "Preço inválido"; }                    // 0 não é < 0 !`),
      `<p style="margin-top:12px"><strong>Sintoma:</strong> o produto é guardado com preço <code>0</code> quando o campo está vazio. <strong>Causa:</strong> o campo vazio vira <code>0</code>, e <code>0 &lt; 0</code> é falso. <strong>Correção:</strong> usar <code>&lt;= 0</code> (e conferir o <code>NaN</code>), pois produto de graça não faz sentido na loja.</p>`,
      atencao(`validar com <strong>testes de borda</strong>: teste sempre <code>0</code>, <code>-1</code>, vazio, <code>"abc"</code> e números com vírgula (<code>3,5</code>), que o <code>type="number"</code> pode recusar dependendo do navegador.`)),
    P('🔧', 'MODIFIQUE: não aceitar nome repetido',
      code(`function nomeJaExiste(nome) {
  for (let i = 0; i < localStorage.length; i++) {
    let chave = localStorage.key(i);
    if (chave[0] !== "p") continue;                       // só produtos
    let produto = JSON.parse(localStorage.getItem(chave));
    if (produto.nome.toLowerCase() === nome.trim().toLowerCase()) {
      return true;
    }
  }
  return false;
}`),
      lista(['Compare em minúsculas, para "Caneta" e "caneta" valerem como o mesmo nome', 'Dentro de <code>validarProduto</code>, acrescente: <code>if (nomeJaExiste(nome)) return "Esse produto já existe.";</code>']),
      caderno(['Number.isNaN detecta NaN; NaN <= 0 é false!', 'trim() remove espaços das pontas', 'Valide com testes de borda: 0, negativo, vazio, texto'])),
    P('🎯', 'DESAFIO: validação do formulário completo',
      lista(['Limite o nome a 40 caracteres (use <code>nome.length</code>)', 'Mostre a mensagem de erro em vermelho e a de sucesso ("Produto salvo!") em verde', 'Depois de salvar, <strong>limpe o formulário</strong> e coloque o foco no campo nome (<code>campo.focus()</code>)']),
      box('verde', `<strong>Explique com suas palavras:</strong> por que a função <code>validarProduto</code> devolve a mensagem em vez de já escrever na tela? (Dica: pense em reaproveitá-la em outro formulário.)`)),
  ], [
    Q('O que é validar os dados?', 'Conferir se são válidos antes de guardar', 'Guardar os dados duas vezes', 'Apagar o formulário', 'Criptografar os dados'),
    Q('Qual é o resultado de Number("abc")?', 'NaN', '0', 'undefined', 'Erro'),
    Q('Qual é o resultado de Number("abc") <= 0 ?', 'false', 'true', 'NaN', 'Erro'),
    Q('Por que NaN <= 0 ser false é perigoso na validação?', 'Um preço inválido passaria como se fosse válido', 'O navegador trava', 'O localStorage recusa', 'O NaN vira texto'),
    Q('Qual função detecta NaN corretamente?', 'Number.isNaN(valor)', 'valor === NaN', 'valor == "NaN"', 'valor.isNumber()'),
    Q('Um campo de preço vazio, após Number(...), vale:', '0', 'NaN', 'null', 'undefined'),
    Q('Por que usar nome.trim() === "" ?', 'Para recusar nomes feitos só de espaços', 'Para deixar o nome em maiúsculas', 'Para apagar o nome', 'Para contar as letras'),
    Q('O que validarProduto devolve quando está tudo certo?', 'Um texto vazio ("")', 'true', 'O objeto produto', 'NaN'),
    Q('Por que comparar nomes em minúsculas ao detectar repetidos?', 'Para "Caneta" e "caneta" serem o mesmo nome', 'Porque o JavaScript exige', 'Para acelerar o laço', 'Para evitar o JSON'),
    Q('Para mostrar a mensagem de erro na tela com segurança, usa-se:', 'textContent', 'innerHTML com texto do usuário', 'document.write', 'eval'),
  ]);

  // ══════════════════════════════════════════════════════
  // 96 — LOJA 6: BUSCA E FILTRO NA VITRINE
  // ══════════════════════════════════════════════════════
  A(96, 'Loja 6: Busca e Filtro na Vitrine', 'Ler os produtos para um array e filtrar a vitrine enquanto o cliente digita', '🔎', [
    P('💡', 'ENTENDA: separar "ler os dados" de "desenhar"',
      `<p>Até aqui, cada função lia o localStorage <em>e</em> desenhava ao mesmo tempo. Para filtrar, é melhor <strong>separar</strong>: uma função lê tudo para um array; outra desenha o array que receber.</p>`,
      analogia(`na cozinha: uma pessoa <strong>separa os ingredientes</strong> (lê os dados) e outra <strong>monta o prato</strong> (desenha). Para fazer um prato diferente, basta mudar o que separa.`),
      caderno(['lerProdutos() devolve um array de objetos', 'desenharVitrine(lista) desenha qualquer lista recebida', 'Filtrar = mudar a lista, sem mexer em quem desenha'])),
    P('⌨️', 'DIGITE: lerProdutos e desenharVitrine',
      code(`function lerProdutos() {
  let produtos = [];
  for (let i = 0; i < localStorage.length; i++) {
    let chave = localStorage.key(i);
    if (chave[0] !== "p") continue;
    produtos.push(JSON.parse(localStorage.getItem(chave)));
  }
  return produtos;
}

function desenharVitrine(lista) {
  let vitrine = document.getElementById("vitrine");
  vitrine.innerHTML = "";
  for (let i = 0; i < lista.length; i++) {
    let card = document.createElement("div");
    card.className = "card";

    let titulo = document.createElement("h3");
    titulo.textContent = lista[i].nome;            // textContent: seguro

    let preco = document.createElement("p");
    preco.textContent = "R$ " + lista[i].preco.toFixed(2);

    card.appendChild(titulo);
    card.appendChild(preco);
    vitrine.appendChild(card);
  }
}

desenharVitrine(lerProdutos());`),
      lista(['Os cards são criados com <code>createElement</code> e <code>textContent</code>: nada de <code>innerHTML</code> com dados do usuário', '<code>desenharVitrine(lerProdutos())</code> junta as duas funções']),
      preveja(`se o localStorage tiver 3 produtos, quantos cards aparecem? E se estiver vazio?`)),
    P('🔎', 'O filter: ficar só com o que interessa',
      code(`let numeros = [3, 8, 12, 5];
let grandes = numeros.filter(function (n) { return n > 4; });

console.log(grandes);    // [8, 12, 5]
console.log(numeros);    // [3, 8, 12, 5]  (o original NÃO muda)`),
      lista(['<code>filter</code> percorre o array e <strong>guarda só os itens em que a função devolve <code>true</code></strong>', 'Ele devolve um <strong>array novo</strong>, e o original continua igual']),
      code(`let textos = ["Caneta azul", "Caderno", "Caneta preta"];
let achados = textos.filter(function (t) { return t.toLowerCase().includes("caneta"); });
console.log(achados);   // ["Caneta azul", "Caneta preta"]`, 'Com texto: includes() vê se uma palavra está dentro'),
      caderno(['filter devolve um array novo com os itens que passam no teste', 'texto.includes("x") diz se contém', 'toLowerCase() ignora maiúsculas/minúsculas'])),
    P('🐞', 'ENCONTRE O ERRO: a busca "some" os produtos',
      code(`document.getElementById("busca").addEventListener("input", function () {
  let texto = document.getElementById("busca").value;
  let produtos = lerProdutos();
  produtos.filter(function (p) { return p.nome.includes(texto); });   // <- resultado jogado fora!
  desenharVitrine(produtos);
});`),
      lista(['<strong>Sintoma:</strong> a busca não filtra nada: a vitrine continua completa', '<strong>Causa:</strong> o <code>filter</code> <strong>devolve um array novo</strong>, mas o resultado não foi guardado. O array <code>produtos</code> continua igual', '<strong>Correção:</strong> <code>let achados = produtos.filter(...); desenharVitrine(achados);</code>']),
      atencao(`e se digitar <code>CANETA</code> e o produto for <code>Caneta</code>? Sem <code>toLowerCase()</code> nos dois lados, não acha. Compare sempre em minúsculas.`)),
    P('🔧', 'MODIFIQUE: a busca completa',
      code(`document.getElementById("busca").addEventListener("input", function () {
  let texto = document.getElementById("busca").value.toLowerCase();
  let achados = lerProdutos().filter(function (p) {
    return p.nome.toLowerCase().includes(texto);
  });
  desenharVitrine(achados);
});`),
      lista(['Acrescente no HTML: <code>&lt;input type="text" id="busca" placeholder="Buscar produto"&gt;</code>', 'Mostre a mensagem "Nenhum produto encontrado" quando a lista vier vazia', 'Acrescente também a busca pela <strong>categoria</strong>']),
      caderno(['Evento input: a cada letra digitada', 'Filtrar → desenhar a lista filtrada'])),
    P('🎯', 'DESAFIO: busca + filtro por categoria',
      lista(['Acrescente um <code>select</code> de categoria que filtra a vitrine', 'Faça os <strong>dois filtros funcionarem juntos</strong> (nome e categoria)', 'Mostre quantos produtos foram encontrados: "3 produtos"']),
      box('verde', `<strong>Explique com suas palavras:</strong> por que separar <code>lerProdutos</code> de <code>desenharVitrine</code> facilita a busca? E o que acontece com o localStorage quando você filtra? (Nada: ele não muda.)`)),
  ], [
    Q('Por que separar lerProdutos de desenharVitrine?', 'Para poder desenhar qualquer lista, como a filtrada', 'Porque o JavaScript exige', 'Para guardar mais dados', 'Para economizar o localStorage'),
    Q('O que o filter devolve?', 'Um array novo com os itens que passaram no teste', 'O array original modificado', 'Apenas o primeiro item', 'Um número'),
    Q('O array original muda depois de um filter?', 'Não, continua igual', 'Sim, perde os itens', 'Sim, fica vazio', 'Só se for de números'),
    Q('Qual é o resultado de [3,8,12,5].filter(n => n > 4)?', '[8, 12, 5]', '[3]', '[3, 8, 12, 5]', '[12]'),
    Q('O que faz "Caneta azul".includes("azul")?', 'Devolve true', 'Devolve "azul"', 'Devolve 6', 'Devolve false'),
    Q('Por que usar toLowerCase() nos dois lados da busca?', 'Para ignorar diferenças entre maiúsculas e minúsculas', 'Para acelerar a busca', 'Para guardar no localStorage', 'Para evitar o JSON'),
    Q('A busca não filtra nada porque o resultado do filter foi jogado fora. Qual a correção?', 'Guardar o resultado em uma variável e desenhá-la', 'Trocar filter por push', 'Apagar o evento', 'Usar innerHTML'),
    Q('Qual evento filtra a cada letra digitada?', 'input', 'submit', 'load', 'blur'),
    Q('Filtrar a vitrine altera o que está no localStorage?', 'Não, só muda o que é desenhado', 'Sim, apaga os que não aparecem', 'Sim, reordena as chaves', 'Depende do navegador'),
    Q('Por que os cards são criados com createElement e textContent?', 'Para evitar código injetado por dados do usuário', 'Porque innerHTML não existe', 'Para o card ficar mais bonito', 'Porque é obrigatório no filter'),
  ]);

  // ══════════════════════════════════════════════════════
  // 97 — LOJA 8: QUANTIDADES, REMOÇÃO E TOTAL
  // ══════════════════════════════════════════════════════
  A(97, 'Loja 8: Quantidades, Remoção e Total', 'Evoluir o carrinho: contar quantidades, aumentar, diminuir, remover itens e calcular o total', '🧮', [
    P('💡', 'ENTENDA: o carrinho precisa lembrar "quantos"',
      `<p>No carrinho simples, comprar o mesmo produto duas vezes só <em>regrava</em> a mesma chave: continua 1 item. Um carrinho de verdade precisa de <strong>quantidade</strong>.</p>`,
      analogia(`no mercado, você não coloca duas "cópias" do mesmo leite no carrinho com duas etiquetas. Você coloca o leite e <strong>anota ×2</strong>.`),
      code(`// item do carrinho (chave "c" + id.slice(1))
{ id: "p1700", nome: "Caneta", preco: 3.5, quantidade: 2 }`),
      caderno(['Item do carrinho = produto + quantidade', 'Mesma chave c…: comprar de novo soma 1 na quantidade'])),
    P('⌨️', 'DIGITE: comprar com quantidade',
      code(`function comprar(idProduto) {
  let chaveCarrinho = "c" + idProduto.slice(1);
  let texto = localStorage.getItem(chaveCarrinho);

  if (texto === null) {
    // primeira vez: copia o produto e começa com quantidade 1
    let produto = JSON.parse(localStorage.getItem(idProduto));
    produto.quantidade = 1;
    localStorage.setItem(chaveCarrinho, JSON.stringify(produto));
  } else {
    // já está no carrinho: soma 1
    let item = JSON.parse(texto);
    item.quantidade = (item.quantidade || 1) + 1;
    localStorage.setItem(chaveCarrinho, JSON.stringify(item));
  }
}`),
      lista(['<code>getItem</code> devolve <code>null</code> quando a chave não existe: é como sabemos se é a primeira compra', '<code>(item.quantidade || 1)</code> protege contra itens antigos, sem o campo quantidade (sem isso, o resultado seria <code>NaN</code>)']),
      preveja(`se eu clicar em Comprar 3 vezes no mesmo produto, quantas chaves <code>c…</code> existem? E qual é a quantidade?`)),
    P('🧮', 'DIGITE: desenharCarrinho com total',
      code(`function desenharCarrinho() {
  let lista = document.getElementById("lista-carrinho");
  lista.innerHTML = "";
  let total = 0;

  for (let i = 0; i < localStorage.length; i++) {
    let chave = localStorage.key(i);
    if (chave[0] !== "c") continue;

    let item = JSON.parse(localStorage.getItem(chave));
    let qtd = item.quantidade || 1;
    total = total + item.preco * qtd;               // preço x quantidade

    let li = document.createElement("li");
    li.textContent = item.nome + " × " + qtd + " = R$ " + (item.preco * qtd).toFixed(2);
    lista.appendChild(li);
  }
  document.getElementById("total").textContent = "Total: R$ " + total.toFixed(2);
}`),
      atencao(`o total é <code>preco * qtd</code> para cada item, <strong>somado</strong> no acumulador <code>total</code>, que começa em 0 <em>antes</em> do laço.`)),
    P('🐞', 'ENCONTRE O ERRO: NaN no total',
      code(`total = total + item.preco * item.quantidade;
// Total: R$ NaN`),
      lista(['<strong>Sintoma:</strong> o total mostra <code>R$ NaN</code>', '<strong>Causa:</strong> um item <strong>antigo</strong> (comprado antes de existir a quantidade) não tem o campo; <code>item.quantidade</code> é <code>undefined</code> e <code>preco * undefined</code> é <code>NaN</code>', '<strong>Correção:</strong> <code>let qtd = item.quantidade || 1;</code>']),
      box('verde', `<strong>Lição:</strong> quando você <strong>evolui</strong> o formato dos dados, os dados antigos continuam existindo. Sempre pense: <em>"e se este campo não existir?"</em>`),
      caderno(['undefined * número = NaN', 'Use valor padrão: item.quantidade || 1', 'Evoluir dados exige cuidar dos dados antigos'])),
    P('🔧', 'MODIFIQUE: botões +, − e Remover',
      code(`function mudarQuantidade(chave, delta) {
  let item = JSON.parse(localStorage.getItem(chave));
  item.quantidade = (item.quantidade || 1) + delta;

  if (item.quantidade <= 0) {
    localStorage.removeItem(chave);            // chegou a zero: sai do carrinho
  } else {
    localStorage.setItem(chave, JSON.stringify(item));
  }
  desenharCarrinho();                          // sempre redesenha
}

function removerDoCarrinho(chave) {
  localStorage.removeItem(chave);              // só a chave c…, o produto fica
  desenharCarrinho();
}`),
      lista(['Crie os botões dentro do laço com <code>createElement</code> e <code>addEventListener</code> (sem <code>onclick</code> escrito no texto)', 'Teste: aumentar, diminuir até zero e remover']),
      atencao(`<code>removerDoCarrinho</code> apaga <strong>só a chave <code>c…</code></strong>. O produto original (<code>p…</code>) continua na loja.`)),
    P('🎯', 'DESAFIO: finalizar a compra',
      lista(['Crie o botão <strong>Finalizar compra</strong>, que mostra "Compra de R$ X confirmada" e <strong>esvazia o carrinho</strong>', 'Esvazie apagando <strong>apenas as chaves <code>c…</code></strong> (cuidado: ao remover dentro do laço, as posições mudam; dica: primeiro junte as chaves num array e depois apague)']),
      box('verde', `<strong>Explique com suas palavras:</strong> por que não se pode apagar chaves do localStorage direto dentro do <code>for</code> que percorre o <code>localStorage.length</code>?`)),
  ], [
    Q('Por que o carrinho precisa do campo quantidade?', 'Para comprar o mesmo produto várias vezes sem duplicar itens', 'Para o localStorage aceitar o item', 'Para mudar o preço', 'Para o JSON funcionar'),
    Q('Ao clicar em Comprar 3 vezes no mesmo produto, quantas chaves c… existem?', 'Uma, com quantidade 3', 'Três, cada uma com quantidade 1', 'Nenhuma', 'Duas'),
    Q('O que getItem devolve se a chave do carrinho ainda não existe?', 'null', 'undefined', '0', 'Uma string vazia'),
    Q('Qual é o total de 2 canetas de R$ 3,50 e 1 caderno de R$ 18,00?', 'R$ 25,00', 'R$ 21,50', 'R$ 24,50', 'R$ 7,00'),
    Q('Por que o total mostra NaN com itens antigos?', 'item.quantidade é undefined e preço * undefined dá NaN', 'O JSON está inválido', 'O laço está errado', 'O toFixed não funciona'),
    Q('Como evitar o NaN com itens antigos?', 'let qtd = item.quantidade || 1;', 'Apagar o localStorage', 'Usar innerHTML', 'Trocar let por const'),
    Q('O que removerDoCarrinho(chave) apaga?', 'Só a chave c… do item', 'O produto da loja também', 'Todo o localStorage', 'O formulário'),
    Q('Quando a quantidade chega a 0, o ideal é:', 'Remover o item do carrinho', 'Deixar o item com quantidade 0', 'Apagar o produto da loja', 'Deixar o total em NaN'),
    Q('Depois de mudar a quantidade, o que sempre fazer?', 'Chamar desenharCarrinho() para redesenhar', 'Recarregar o navegador', 'Apagar o JSON', 'Chamar atualizarGrid()'),
    Q('O que a lição "evoluir o formato dos dados" ensina?', 'Dados antigos continuam existindo e precisam ser tratados', 'Dados antigos somem sozinhos', 'O localStorage atualiza tudo', 'Nunca mude o formato'),
  ]);

  // ══════════════════════════════════════════════════════
  // 98 — LOJA 9: TESTES E APRESENTAÇÃO
  // ══════════════════════════════════════════════════════
  A(98, 'Loja 9: Testes e Apresentação', 'Testar a loja com roteiro, enfrentar dados vazios e antigos e preparar a apresentação do projeto', '🧪', [
    P('💡', 'ENTENDA: testar não é "clicar para ver se funciona"',
      `<p>Um teste de verdade tem <strong>um plano</strong>: o que faço, o que espero e o que realmente aconteceu. Assim você encontra os bugs antes do professor (e do cliente).</p>`,
      analogia(`o <strong>test drive</strong> de um carro: o vendedor não dirige só em linha reta. Você faz curva, freia forte, sobe ladeira. Testar é tentar fazer o sistema falhar.`),
      caderno(['Teste = ação + resultado esperado + resultado obtido', 'Teste os casos normais E os extremos'])),
    P('📋', 'O roteiro de testes da loja',
      `<p>Preencha a tabela no caderno (esperado × obtido):</p>`,
      lista(['1️⃣ Cadastrar "Caneta" a R$ 3,50 → aparece na tabela e na vitrine', '2️⃣ Tentar cadastrar com nome vazio → mensagem de erro, nada guardado', '3️⃣ Tentar preço 0 e preço "abc" → recusado', '4️⃣ Cadastrar "caneta" (repetido) → recusado', '5️⃣ Alterar o preço → muda na tabela, na vitrine e no carrinho (se houver)', '6️⃣ Comprar 2 vezes → quantidade 2 e total certo', '7️⃣ Remover do carrinho → some do carrinho, continua na loja', '8️⃣ Excluir produto → some da loja e do carrinho', '9️⃣ Recarregar a página (F5) → tudo continua igual']),
      preveja(`qual desses testes você acha que sua loja ainda pode falhar? Anote e confira depois.`)),
    P('🐞', 'ENCONTRE O ERRO: dados ausentes e dados quebrados',
      code(`let texto = localStorage.getItem("p999");   // a chave não existe
let produto = JSON.parse(texto);              // JSON.parse(null) devolve null
console.log(produto.nome);
// Uncaught TypeError: Cannot read properties of null (reading 'nome')`),
      code(`localStorage.setItem("p5", "isso não é JSON");
JSON.parse(localStorage.getItem("p5"));
// Uncaught SyntaxError: "isso não é JSON" is not valid JSON
// (em navegadores mais antigos: Unexpected token i in JSON at position 0)`),
      lista(['<strong>1º erro:</strong> a chave não existe, então o resultado é <code>null</code>, e <code>null.nome</code> quebra', '<strong>2º erro:</strong> o texto guardado não é JSON válido (por exemplo, restos do tempo em que se guardava <code>[object Object]</code>)']),
      code(`function lerProdutoSeguro(chave) {
  let texto = localStorage.getItem(chave);
  if (texto === null) return null;
  try {
    return JSON.parse(texto);
  } catch (erro) {
    console.log("Dado inválido na chave", chave);
    return null;
  }
}`, 'Leitura protegida')),
    P('🔧', 'MODIFIQUE: abra a loja com tudo vazio',
      lista(['F12 → <strong>Application</strong> → Local Storage → <strong>Clear</strong> (apaga tudo)', 'Abra <code>gerenciar.html</code>, <code>loja.html</code> e <code>carrinho.html</code>: algum dá erro no console?', 'Mostre "Nenhum produto cadastrado" quando a lista estiver vazia (em vez de uma tabela em branco)']),
      atencao(`o primeiro acesso de um usuário novo é <strong>sempre com o localStorage vazio</strong>. Se a página só funciona com dados, ela quebra na primeira visita.`),
      caderno(['Teste com tudo vazio (primeiro acesso)', 'Teste com dados antigos ou quebrados', 'Mensagem amigável quando não há dados'])),
    P('🎤', 'A apresentação do projeto (3 minutos)',
      lista(['⏱️ <strong>30 s</strong>: o que a loja faz (mostre rodando)', '⏱️ <strong>60 s</strong>: o caminho dos dados (clique → função → localStorage → tela)', '⏱️ <strong>60 s</strong>: uma função explicada linha por linha (<code>salvarProduto</code> ou <code>atualizarGrid</code>)', '⏱️ <strong>30 s</strong>: um bug que você encontrou e como resolveu']),
      box('amarelo', `Quem consegue explicar <strong>um bug que teve</strong> mostra que entende o código. Não tenha vergonha dos erros: eles são a melhor parte da apresentação.`)),
    P('🎯', 'DESAFIO: troque de computador com um colega',
      lista(['Entregue a pasta da sua loja a um colega', 'Ele deve tentar <strong>quebrá-la</strong> usando o roteiro de testes e entradas inesperadas', 'Cada bug encontrado vira uma anotação: sintoma, causa e correção']),
      box('verde', `<strong>Explique com suas palavras:</strong> por que testar com dados vazios, antigos ou quebrados também faz parte do projeto? E qual foi o bug mais difícil da sua loja?`)),
  ], [
    Q('O que um teste de verdade deve ter?', 'Ação, resultado esperado e resultado obtido', 'Só clicar nos botões', 'Apenas olhar o código', 'Somente testar casos que funcionam'),
    Q('Por que testar com o localStorage vazio?', 'O primeiro acesso de qualquer usuário é sempre vazio', 'Para apagar os produtos', 'Porque o navegador exige', 'Para testar o CSS'),
    Q('JSON.parse(null) devolve:', 'null', 'undefined', '0', 'Um erro de sintaxe'),
    Q('Qual erro aparece ao usar produto.nome quando produto é null?', 'TypeError: Cannot read properties of null', 'ReferenceError: produto is not defined', 'SyntaxError', 'RangeError'),
    Q('O que causa SyntaxError: ... is not valid JSON ao usar JSON.parse?', 'O texto guardado não é um JSON válido', 'A chave não existe', 'O localStorage está cheio', 'Faltou let'),
    Q('Como ler com segurança um JSON que pode estar quebrado?', 'Com try/catch ao redor do JSON.parse', 'Usando innerHTML', 'Apagando o localStorage antes', 'Trocando por getItem duas vezes'),
    Q('O que o ideal exibir quando não há produtos cadastrados?', 'Uma mensagem como "Nenhum produto cadastrado"', 'Uma tabela vazia sem aviso', 'Um erro no console', 'Nada, a página some'),
    Q('Por que testar também os casos extremos (preço enorme, nomes com acento)?', 'Porque usuários reais fazem entradas inesperadas', 'Porque o JavaScript exige', 'Para aumentar o código', 'Não é necessário'),
    Q('Na apresentação, o que mostra que você entende o código?', 'Explicar o caminho dos dados e um bug que você resolveu', 'Ler o código sem explicar', 'Mostrar só o visual', 'Dizer que foi um colega que fez'),
    Q('Qual é a melhor forma de testar a loja de um colega?', 'Seguir o roteiro e tentar quebrá-la com entradas inesperadas', 'Só clicar uma vez em cada botão', 'Alterar o código dele', 'Não testar, só olhar'),
  ]);

  // ══════════════════════════════════════════════════════
  // MÓDULOS, ORDEM E ENTREGA À LISTA PRINCIPAL
  // ══════════════════════════════════════════════════════
  // Cada módulo é independente: o aluno pode pular se passar no teste de nivelamento (nota 7 ou mais, por convenção).
  var MODULOS = [
    { n: 1,  nome: 'Fundamentos da Web',        icone: '🌐', ids: [56, 73, 74],                          nivel: 109 },
    { n: 2,  nome: 'HTML',                      icone: '🧱', ids: [57, 75, 58, 76],                      nivel: 110 },
    { n: 3,  nome: 'CSS',                       icone: '🎨', ids: [59, 77, 78, 79, 80, 81, 82],          nivel: 111 },
    { n: 4,  nome: 'JavaScript fundamental',    icone: '⚡', ids: [60, 61, 83, 62, 84, 63, 85],          nivel: 112 },
    { n: 5,  nome: 'DOM e eventos',             icone: '👆', ids: [65, 66, 86, 67, 87, 88],              nivel: 113 },
    { n: 6,  nome: 'Depuração',                 icone: '🐞', ids: [64, 89, 90],                          nivel: 114 },
    { n: 7,  nome: 'Armazenamento',             icone: '🗄️', ids: [68, 69, 91, 92],                      nivel: 115 },
    { n: 8,  nome: 'Projeto: Loja Virtual',     icone: '🛒', ids: [93, 94, 70, 95, 72, 71, 96, 97, 98],  nivel: 116 },
    { n: 9,  nome: 'JavaScript assíncrono',     icone: '⏱️', ids: [99, 100, 104],                        nivel: 117 },
    { n: 10, nome: 'Profissionalismo',          icone: '🚀', ids: [105, 106],                            nivel: 118 },
    { n: 11, nome: 'Revisão e avaliação',       icone: '🏁', ids: [107, 108],                            nivel: 0 }
  ];
  var ORDEM = [];
  MODULOS.forEach(function (m) { if (m.nivel) ORDEM.push(m.nivel); ORDEM = ORDEM.concat(m.ids); });
  function pos(a) { var i = ORDEM.indexOf(a.id); return i < 0 ? 999 : i; }
  NOVAS.sort(function (a, b) { return pos(a) - pos(b); });

  // entrega as aulas novas à lista principal (sem repetir se já existirem)
  NOVAS.forEach(function (a) {
    if (!AULAS.some(function (x) { return x.id === a.id; })) AULAS.push(a);
  });
  // marca o módulo de cada aula (as aulas antigas não têm módulo e continuam como estavam)
  MODULOS.forEach(function (m) {
    AULAS.forEach(function (a) { if (m.ids.indexOf(a.id) > -1 || a.id === m.nivel) a.modulo = m.n; });
  });
  window.MODULOS_CURSO = MODULOS;
})();
