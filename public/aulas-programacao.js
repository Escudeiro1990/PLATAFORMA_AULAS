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
  // A posição da correta é sorteada a partir do próprio texto da pergunta: varia, mas é sempre a mesma a cada carga da página
  function hashTexto(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function Q(pergunta, certa) {
    var erradas = Array.prototype.slice.call(arguments, 2);
    var ops = erradas.map(function (t) { return { texto: esc(deco(t)), correta: false }; });
    var pos = hashTexto(pergunta + '|' + certa) % (ops.length + 1);
    ops.splice(pos, 0, { texto: esc(deco(certa)), correta: true });
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
  var REV = {};   // revisões: perguntas novas e passos extras aplicados às aulas (ver pEnd)
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
    total = total + Number(item[1]);   // item[1] = valor (texto)
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

  PRAT[89] = { tarefas: ['<strong>Nível 1.</strong> Abra a loja, aperte F12 e use o seletor de elementos (a setinha) para clicar no título. Localize o <code>h1</code> no <strong>Elements</strong>.', '<strong>Nível 1.</strong> No <strong>Network</strong>, recarregue a página e anote quantos arquivos foram carregados e se algum deu 404.', '<strong>Nível 2.</strong> No <strong>Elements</strong>, mude a cor de um texto e o tamanho de um botão direto no painel Styles. Recarregue: o que acontece com a mudança?', '<strong>Nível 2.</strong> No <strong>Application</strong>, edite o preço de um produto direto na gaveta e recarregue a loja.'],
    desafio: '<strong>Nível 3.</strong> Quebre de propósito o nome do arquivo do CSS, ache o erro <strong>apenas pelo Network e pelo Console</strong> e corrija. Depois explique ao professor o que cada aba mostra.' };
  PRAT[90] = { tarefas: ['<strong>Nível 1.</strong> Em <strong>Sources</strong>, abra seu <code>.js</code>, clique no número de uma linha para criar um breakpoint e provoque a execução. Veja a execução pausar.', '<strong>Nível 1.</strong> Com o código pausado, olhe o painel <strong>Scope</strong> e anote o valor de 3 variáveis.', '<strong>Nível 2.</strong> Use F10 (passo a passo) em um laço e acompanhe como o <code>total</code> muda a cada volta.', '<strong>Explique:</strong> com suas palavras, qual a diferença entre F10, F11 e F8.'],
    desafio: '<strong>Nível 3.</strong> Use um breakpoint <strong>condicional</strong> para pausar só quando o preço de um item for maior que 100. Depois explique ao professor como você descobriu o bug.' };
  PRAT[91] = { tarefas: ['<strong>Nível 1.</strong> No console, guarde um valor no <code>sessionStorage</code> e outro no <code>localStorage</code>. Veja os dois em Application.', '<strong>Nível 1.</strong> Feche a aba, abra o mesmo endereço e confira qual dos dois valores sobrou.', '<strong>Nível 2.</strong> Abra a mesma página em duas abas e verifique o que é compartilhado em cada tipo de armazenamento.', '<strong>Explique:</strong> com suas palavras, quando usar sessionStorage e quando usar localStorage.'],
    desafio: '<strong>Nível 3.</strong> No formulário da loja, guarde o <strong>rascunho</strong> (nome e preço digitados) no <code>sessionStorage</code> a cada letra e restaure se a página for recarregada. Apague o rascunho ao salvar o produto.' };
  PRAT[92] = { tarefas: ['<strong>Nível 1.</strong> Na <strong>sua cópia local</strong> da loja, cadastre um produto com o nome <code>&lt;b&gt;teste&lt;/b&gt;</code> e veja como aparece com <code>innerHTML</code> e com <code>textContent</code>.', '<strong>Nível 2.</strong> Troque a lista de produtos para <code>createElement</code> + <code>textContent</code> e repita o teste.', '<strong>Nível 2.</strong> Escreva a função <code>escaparHtml</code> e teste com 3 textos perigosos.', '<strong>Explique:</strong> com suas palavras, por que um nome de produto pode ser um risco.'],
    desafio: '<strong>Nível 3.</strong> Faça uma <strong>auditoria</strong> do seu projeto: procure todos os <code>innerHTML</code>, senhas ou dados sensíveis no localStorage e anote o que corrigiu.' };

  // ══════════════════════════════════════════════════════
  // 89 — DEVTOOLS
  // ══════════════════════════════════════════════════════
  A(89, 'Depuração 2: DevTools, os Raios-X do Navegador', 'Usar Elements, Console, Network e Application para enxergar o que a página realmente está fazendo', '🩻', [
    P('💡', 'ENTENDA: o navegador tem um painel de investigação',
      `<p>As <strong>ferramentas do desenvolvedor</strong> (F12) mostram o que o navegador <em>entendeu</em> do seu código. Cada aba responde a uma pergunta diferente.</p>`,
      analogia(`o <strong>raio-X do hospital</strong>: o médico não adivinha, ele olha dentro. Cada exame (aba) mostra uma parte do corpo (da página).`),
      lista(['🌳 <strong>Elements</strong>: "como o navegador montou o HTML e o CSS?"', '💬 <strong>Console</strong>: "que mensagens e erros o JavaScript produziu?"', '📡 <strong>Network</strong>: "que arquivos e dados foram pedidos, e com que resultado?"', '🗄️ <strong>Application</strong>: "o que está guardado no navegador (localStorage, etc.)?"']),
      caderno(['Elements = HTML/CSS · Console = JS e erros', 'Network = pedidos e status · Application = dados guardados'])),
    P('🌳', 'Elements: ver e testar o HTML e o CSS',
      lista(['Clique na <strong>setinha</strong> no canto do painel e depois em qualquer parte da página: o elemento aparece destacado', 'No painel <strong>Styles</strong>, você vê as regras CSS que se aplicam e pode <strong>editá-las ao vivo</strong>', 'O desenho do <strong>box model</strong> mostra o padding, a borda e a margem do elemento']),
      atencao(`tudo que você muda no Elements é só <strong>temporário</strong>. Ao recarregar a página, volta ao que está no arquivo. É ótimo para <em>testar</em> uma cor ou um tamanho antes de escrever no CSS.`),
      preveja(`você muda a cor do título no painel Styles e depois aperta F5. A cor nova continua? Por quê?`)),
    P('📡', 'Network: o que a página pediu?',
      `<p>Abra a aba <strong>Network</strong> e <strong>recarregue</strong> a página. Cada linha é um arquivo pedido ao servidor, com o <strong>status</strong>:</p>`,
      lista(['<code>200</code> OK: o arquivo chegou', '<code>304</code>: o navegador reaproveitou o que já tinha', '<code>404</code> Not Found: o arquivo <strong>não existe</strong> naquele endereço (caminho ou nome errado)', '<code>500</code>: erro dentro do servidor']),
      code(`Name          Status   Type
index.html    200      document
estilo.css    404      stylesheet     <- aqui está o problema!
script.js     200      script`),
      caderno(['404 = arquivo não encontrado (nome ou caminho)', 'Recarregue com o Network aberto para ver os pedidos', 'Clique numa linha para ver a resposta (Preview/Response)'])),
    P('🐞', 'ENCONTRE O ERRO: "mudei o arquivo e nada mudou"',
      lista(['<strong>Sintoma:</strong> você alterou o CSS ou o JS, recarregou, mas a página continua igual', '<strong>Causa mais comum:</strong> o navegador está usando uma versão <strong>guardada (cache)</strong> do arquivo', '<strong>Investigação:</strong> Network → veja se o arquivo aparece como <code>(disk cache)</code>', '<strong>Soluções:</strong> recarregar sem cache com <strong>Ctrl+F5</strong>, ou marcar <strong>Disable cache</strong> no Network (com as DevTools abertas)']),
      box('amarelo', `<strong>Outras causas do mesmo sintoma:</strong> você editou o arquivo <em>errado</em> (outra pasta, outra cópia), ou esqueceu de salvar (no VS Code, o ponto no nome da aba indica "não salvo").`)),
    P('🗄️', 'Application: a gaveta por dentro',
      `<p>Em <strong>Application → Local Storage → endereço da página</strong> você vê todas as chaves e valores. E pode:</p>`,
      lista(['<strong>editar</strong> um valor (duplo clique) e recarregar para ver o efeito', '<strong>apagar</strong> uma chave (tecla Delete) ou tudo (botão <em>Clear</em>)', 'conferir se os produtos estão como <code>p…</code> e o carrinho como <code>c…</code>, com JSON válido']),
      code(`// no Console, para olhar rápido:
localStorage.length
Object.keys(localStorage)`),
      caderno(['Application = ver, editar e apagar o que está guardado', 'Se o valor aparece como [object Object], faltou JSON.stringify'])),
    P('🎯', 'DESAFIO: investigue sem olhar o código',
      lista(['Peça a um colega para <strong>quebrar de propósito</strong> a sua loja (nome de arquivo, caminho, uma chave no localStorage) e <strong>não contar o quê</strong>', 'Use só as DevTools para descobrir o problema: qual aba você abriu primeiro e por quê?']),
      box('verde', `<strong>Explique com suas palavras:</strong> em que situação você abre o Network, em qual abre o Console e em qual abre o Application?`)),
  ], [
    Q('Qual aba mostra como o navegador montou o HTML e o CSS?', 'Elements', 'Network', 'Console', 'Application'),
    Q('Qual aba mostra os arquivos pedidos e o status de cada um?', 'Network', 'Elements', 'Console', 'Sources'),
    Q('O que significa o status 404 de um arquivo?', 'O arquivo não foi encontrado no endereço pedido', 'O arquivo chegou com sucesso', 'O servidor travou', 'O arquivo está protegido'),
    Q('Você mudou uma cor no painel Styles e deu F5. O que acontece?', 'A mudança é perdida: só valia para aquela página aberta', 'A cor muda no arquivo CSS', 'A cor muda para todos os usuários', 'O navegador guarda para sempre'),
    Q('Alterou o CSS, recarregou e nada mudou. Qual a causa mais comum?', 'O navegador usou uma versão em cache do arquivo', 'O CSS não funciona mais', 'O HTML foi apagado', 'O JavaScript quebrou'),
    Q('Qual atalho recarrega ignorando o cache?', 'Ctrl+F5', 'Ctrl+S', 'Alt+F4', 'F1'),
    Q('Em qual aba você vê e edita o localStorage?', 'Application', 'Network', 'Console', 'Elements'),
    Q('Um valor aparece como [object Object] na gaveta. Causa provável?', 'Faltou JSON.stringify ao guardar', 'Faltou JSON.parse ao guardar', 'O navegador está desatualizado', 'O localStorage está cheio'),
    Q('Para ver o erro de um .css que não carregou, qual é a melhor aba?', 'Network', 'Application', 'Elements apenas', 'Nenhuma'),
    Q('As alterações feitas no Elements:', 'São temporárias e somem ao recarregar', 'Alteram o arquivo no computador', 'Alteram o servidor', 'São salvas automaticamente'),
  ]);

  // ══════════════════════════════════════════════════════
  // 90 — BREAKPOINTS
  // ══════════════════════════════════════════════════════
  A(90, 'Depuração 3: Breakpoints e Passo a Passo', 'Pausar o código no meio da execução e acompanhar cada variável, em vez de adivinhar', '⏸️', [
    P('💡', 'ENTENDA: parar o filme para ver o quadro',
      `<p>O <code>console.log</code> mostra valores, mas você precisa escolher <em>onde</em> colocá-lo e rodar de novo. Com um <strong>breakpoint</strong>, você <strong>pausa o código</strong> numa linha e enxerga <strong>todas as variáveis</strong> naquele instante.</p>`,
      analogia(`é como <strong>dar pause em um filme</strong> para ver o que há em cada canto da cena, e depois avançar quadro a quadro.`),
      caderno(['Breakpoint = ponto onde a execução pausa', 'Com o código pausado, você vê todas as variáveis'])),
    P('⌨️', 'DIGITE E PAUSE',
      code(`function calcularTotal(lista) {
  let total = 0;
  for (let i = 0; i < lista.length; i++) {
    total = total + lista[i].preco;      // <- coloque o breakpoint aqui
  }
  return total;
}

console.log(calcularTotal([{ preco: "10" }, { preco: "20" }]));`),
      lista(['F12 → aba <strong>Sources</strong> → abra o arquivo no painel esquerdo (ou no HTML, se o código está nele)', '<strong>Clique no número da linha</strong> do <code>total = total + ...</code>: aparece um marcador azul', '<strong>Recarregue a página</strong>: a execução pausa naquela linha']),
      preveja(`quando pausar na primeira volta, quanto vale <code>total</code>? E <code>lista[i].preco</code>? De que tipo é <code>preco</code>?`)),
    P('🔬', 'Os controles: avançar quadro a quadro',
      lista(['▶️ <strong>F8</strong> (Resume): continua até o próximo breakpoint', '⤵️ <strong>F10</strong> (Step over): executa a linha atual e vai para a próxima', '⬇️ <strong>F11</strong> (Step into): entra dentro da função chamada na linha', '⬆️ <strong>Shift+F11</strong> (Step out): termina a função atual e sai dela']),
      lista(['O painel <strong>Scope</strong> mostra as variáveis locais e seus valores', 'O painel <strong>Watch</strong> deixa você acompanhar uma expressão, como <code>total</code> ou <code>typeof lista[i].preco</code>']),
      caderno(['F8 continua · F10 próxima linha · F11 entra na função', 'Scope mostra todas as variáveis nesse instante'])),
    P('🐞', 'ENCONTRE O ERRO COM O PASSO A PASSO',
      `<p>Com o código pausado e o <strong>F10</strong>, repare em como o <code>total</code> muda a cada volta:</p>`,
      code(`volta 0:  total = 0   ->  "0" + "10"  ->  "010"     (texto!)
volta 1:  total = "010" -> "010" + "20" -> "01020"`),
      box('verde', `<strong>Causa encontrada em 30 segundos:</strong> <code>preco</code> é <strong>texto</strong> ("10"), e o <code>+</code> junta. O Scope mostrava <code>preco: "10"</code> entre aspas. <strong>Correção:</strong> <code>total = total + Number(lista[i].preco)</code>.`),
      atencao(`quando o breakpoint <strong>não pausa</strong>, as causas comuns são: a linha nunca foi executada (condição falsa ou função nunca chamada), o arquivo aberto no Sources não é o que a página usa, ou o cache está servindo uma versão antiga.`)),
    P('🔧', 'MODIFIQUE: breakpoint condicional e debugger',
      lista(['<strong>Condicional</strong>: botão direito no número da linha → <em>Add conditional breakpoint</em> → <code>lista[i].preco > 100</code>. O código só pausa quando a condição for verdadeira', '<strong>Palavra debugger</strong>: escreva <code>debugger;</code> numa linha e, com as DevTools abertas, o código pausa ali']),
      code(`for (let i = 0; i < lista.length; i++) {
  if (lista[i].preco > 100) {
    debugger;                  // pausa só nos itens caros
  }
  total = total + Number(lista[i].preco);
}`),
      atencao(`apague os <code>debugger;</code> antes de entregar o projeto: eles fazem a página pausar para quem abrir as DevTools.`)),
    P('🎯', 'DESAFIO: caçada ao bug',
      lista(['Provoque um bug no total do carrinho da sua loja (por exemplo, esquecendo o filtro <code>c</code>)', 'Use um <strong>breakpoint</strong> e o painel <strong>Scope</strong> para descobrir qual chave está sendo somada indevidamente', 'Anote o passo a passo da investigação']),
      box('verde', `<strong>Explique com suas palavras:</strong> quando você prefere <code>console.log</code> e quando prefere o breakpoint?`)),
  ], [
    Q('O que é um breakpoint?', 'Um ponto em que a execução do código pausa', 'Um erro do navegador', 'Um tipo de variável', 'Uma linha de comentário'),
    Q('Como criar um breakpoint no Sources?', 'Clicando no número da linha', 'Escrevendo a palavra break', 'Apertando F5', 'Apagando a linha'),
    Q('Qual tecla executa a linha atual e vai para a próxima?', 'F10', 'F8', 'F5', 'F12'),
    Q('Qual tecla entra dentro da função chamada na linha?', 'F11', 'F10', 'F8', 'F1'),
    Q('Qual tecla continua a execução até o próximo breakpoint?', 'F8', 'F10', 'F11', 'F12'),
    Q('Que painel mostra as variáveis e seus valores com o código pausado?', 'Scope', 'Network', 'Fonts', 'Layers'),
    Q('O Scope mostra preco: "10" (com aspas). O que isso revela?', 'O preço é texto, e o + vai juntar em vez de somar', 'O preço é um número', 'O código está correto', 'A variável não existe'),
    Q('O que faz a instrução debugger; ?', 'Pausa o código naquela linha quando as DevTools estão abertas', 'Apaga o código', 'Mostra no console', 'Salva o arquivo'),
    Q('Para que serve um breakpoint condicional?', 'Pausar só quando uma condição for verdadeira', 'Repetir a linha', 'Desligar o JavaScript', 'Mudar o valor de uma variável'),
    Q('O breakpoint não pausa. Uma causa provável é:', 'A linha nunca é executada naquele fluxo', 'O JavaScript não funciona com breakpoints', 'O navegador não permite', 'O arquivo tem muitas linhas'),
  ]);

  // ══════════════════════════════════════════════════════
  // 91 — sessionStorage
  // ══════════════════════════════════════════════════════
  A(91, 'Armazenamento 3: sessionStorage e Limites', 'Comparar sessionStorage e localStorage, saber quando usar cada um e conhecer os limites do armazenamento', '⏳', [
    P('💡', 'ENTENDA: dois armazenamentos, vidas diferentes',
      `<p>O navegador oferece duas gavetas com <strong>o mesmo funcionamento</strong> (<code>setItem</code>, <code>getItem</code>, <code>removeItem</code>), mas com <strong>durações diferentes</strong>:</p>`,
      lista(['🗄️ <strong>localStorage</strong>: fica guardado <strong>até ser apagado</strong>, mesmo depois de fechar o navegador. É compartilhado entre as abas do mesmo site.', '⏳ <strong>sessionStorage</strong>: vale <strong>só para aquela aba</strong>, e é apagado quando a aba (ou a janela) é fechada']),
      analogia(`o localStorage é o <strong>armário da escola</strong>: seus pertences ficam lá todo dia. O sessionStorage é a <strong>mesa da sala durante a prova</strong>: serve só enquanto você está ali e é recolhida no fim.`),
      code(`sessionStorage.setItem("filtro", "caneta");
console.log(sessionStorage.getItem("filtro"));   // "caneta"
sessionStorage.removeItem("filtro");`),
      caderno(['localStorage = fica até apagar (compartilhado entre abas)', 'sessionStorage = só aquela aba, some ao fechá-la', 'A API é igual: setItem / getItem / removeItem'])),
    P('🧠', 'PREVEJA: o que sobra?',
      code(`localStorage.setItem("loja", "Minha Loja");
sessionStorage.setItem("filtro", "caneta");

// agora: feche a aba, abra o mesmo endereço de novo
console.log(localStorage.getItem("loja"));       // ?
console.log(sessionStorage.getItem("filtro"));   // ?`),
      preveja(`qual dos dois valores volta ao abrir de novo? E se você abrir a <strong>mesma página em outra aba</strong> (sem fechar a primeira)?`),
      box('verde', `<strong>Resultado:</strong> <code>"Minha Loja"</code> volta, e o filtro é <code>null</code> (o sessionStorage foi apagado ao fechar a aba). Em uma aba nova aberta do zero, o sessionStorage também começa <strong>vazio</strong>; o localStorage é compartilhado.`)),
    P('🧭', 'Quando usar cada um',
      lista(['✅ <strong>localStorage</strong>: dados que precisam <strong>durar</strong>: produtos da loja, carrinho, preferências (tema escuro)', '✅ <strong>sessionStorage</strong>: dados <strong>temporários</strong> de uma visita: o filtro atual, o rascunho de um formulário, "já mostrei este aviso nesta visita"']),
      code(`// rascunho do formulário, guardado só durante a visita
document.getElementById("nome").addEventListener("input", function () {
  sessionStorage.setItem("rascunhoNome", this.value);
});
// ao salvar com sucesso:
sessionStorage.removeItem("rascunhoNome");`),
      atencao(`nenhum dos dois é lugar para <strong>senhas</strong> ou dados sensíveis. Qualquer pessoa que usar o navegador pode abrir o Application e ler.`)),
    P('🐞', 'ENCONTRE O ERRO: o limite estourou',
      code(`for (let i = 0; i < 100000; i++) {
  localStorage.setItem("p" + i, "x".repeat(1000));
}
// Uncaught DOMException: Failed to execute 'setItem' on 'Storage':
// Setting the 'p4700' property on 'Storage' exceeded the quota.`),
      lista(['<strong>Causa:</strong> o armazenamento tem um limite, em geral <strong>cerca de 5 MB por site</strong> (o valor exato varia)', '<strong>Consequência:</strong> o <code>setItem</code> lança um erro e <strong>nada é gravado</strong>', '<strong>Boa prática:</strong> não guarde imagens grandes nem listas enormes; envolva o <code>setItem</code> em <code>try/catch</code> quando o volume for incerto']),
      code(`try {
  localStorage.setItem(chave, texto);
} catch (erro) {
  mensagem.textContent = "Não foi possível salvar: armazenamento cheio.";
}`),
      caderno(['Limite aproximado: ~5 MB por site', 'Estourou = erro de quota, e nada é gravado', 'Guarde só texto e só o necessário'])),
    P('🔧', 'MODIFIQUE: preferência de tema',
      code(`function aplicarTema() {
  let tema = localStorage.getItem("tema") || "escuro";
  document.body.className = tema;
}
function alternarTema() {
  let atual = localStorage.getItem("tema") || "escuro";
  localStorage.setItem("tema", atual === "escuro" ? "claro" : "escuro");
  aplicarTema();
}
aplicarTema();`),
      lista(['Crie as classes <code>.escuro</code> e <code>.claro</code> no CSS', 'Teste: recarregue e feche o navegador. O tema continua?', 'Troque <code>localStorage</code> por <code>sessionStorage</code> e veja a diferença']),
      box('azul', `O operador <code>||</code> em <code>getItem("tema") || "escuro"</code> dá um <strong>valor padrão</strong> quando a chave ainda não existe (<code>null</code>).`)),
  ], [
    Q('Qual é a principal diferença entre localStorage e sessionStorage?', 'O sessionStorage some ao fechar a aba; o localStorage fica até ser apagado', 'O sessionStorage é mais rápido', 'O localStorage só guarda números', 'Não há diferença'),
    Q('O sessionStorage de uma aba é compartilhado com outras abas do mesmo site?', 'Não, vale só para aquela aba', 'Sim, com todas', 'Sim, só com a primeira aba', 'Só no modo escuro'),
    Q('O que sobra depois de fechar a aba e abrir o site de novo?', 'Os dados do localStorage', 'Os dados do sessionStorage', 'Os dois', 'Nenhum dos dois'),
    Q('Qual é um uso adequado do sessionStorage?', 'Guardar o rascunho de um formulário durante a visita', 'Guardar os produtos da loja', 'Guardar a senha do usuário', 'Guardar o carrinho por semanas'),
    Q('Qual é um uso adequado do localStorage?', 'Guardar a preferência de tema do usuário', 'Guardar o filtro que vale só nesta visita', 'Guardar senhas', 'Guardar um número de cartão'),
    Q('O que causa "exceeded the quota" ao usar setItem?', 'Ultrapassar o limite de armazenamento do site', 'Usar a chave errada', 'Faltou JSON.stringify', 'O navegador está sem internet'),
    Q('Qual é o limite aproximado do armazenamento por site?', 'Cerca de 5 MB', 'Cerca de 5 GB', 'Cerca de 5 KB', 'Ilimitado'),
    Q('Como proteger o setItem quando o volume de dados é incerto?', 'Com try/catch', 'Com if (true)', 'Com innerHTML', 'Com um for'),
    Q('O que faz localStorage.getItem("tema") || "escuro"?', 'Usa "escuro" quando a chave não existe', 'Apaga o tema', 'Troca o tema para claro', 'Gera um erro'),
    Q('Por que nunca guardar senhas em nenhum dos dois?', 'Qualquer pessoa com acesso ao navegador consegue lê-las', 'Porque senhas são grandes demais', 'Porque o JavaScript proíbe', 'Porque somem sozinhas'),
  ]);

  // ══════════════════════════════════════════════════════
  // 92 — SEGURANÇA NO NAVEGADOR E XSS
  // ══════════════════════════════════════════════════════
  A(92, 'Armazenamento 4: Segurança de Dados e XSS', 'Entender como um texto digitado pode virar código malicioso (XSS) e como evitar, além do que nunca guardar no navegador', '🛡️', [
    P('💡', 'ENTENDA: texto que vira código',
      `<p>Quando você coloca um texto na página com <code>innerHTML</code>, o navegador <strong>interpreta como HTML</strong>. Se esse texto veio de um usuário, ele pode conter <strong>código</strong>. Esse ataque se chama <strong>XSS</strong> (<em>Cross-Site Scripting</em>).</p>`,
      analogia(`você recebe uma carta e, <strong>sem ler</strong>, cumpre qualquer ordem escrita nela. Se alguém escrever "entregue as chaves da casa", você entrega. Com <code>innerHTML</code>, a página obedece ao que o texto mandar.`),
      caderno(['XSS = texto digitado vira código executado na página', 'Causa clássica: innerHTML com dados não tratados'])),
    P('🧠', 'PREVEJA: o produto com nome perigoso',
      code(`// o usuário cadastra um produto com este NOME:
<img src="x" onerror="alert('XSS')">

// e a vitrine desenha assim:
vitrine.innerHTML += "<h3>" + produto.nome + "</h3>";`),
      preveja(`o que você acha que acontece quando a vitrine desenhar esse produto? O navegador mostra o texto, ou faz outra coisa?`),
      box('verde', `<strong>Resultado:</strong> o navegador <strong>cria uma imagem</strong>, o arquivo <code>x</code> não existe, ocorre o erro e o <code>onerror</code> <strong>executa o código</strong>: aparece o alerta. Em vez de <code>alert</code>, poderia ler tudo do localStorage e enviar a um site do atacante.`),
      atencao(`teste isso <strong>apenas na sua própria cópia local</strong> do projeto, nunca em sites de terceiros.`)),
    P('🛡️', 'A correção: textContent e createElement',
      code(`// perigoso
vitrine.innerHTML += "<h3>" + produto.nome + "</h3>";

// seguro: o texto é tratado como TEXTO, nunca como HTML
let titulo = document.createElement("h3");
titulo.textContent = produto.nome;
vitrine.appendChild(titulo);`),
      lista(['<code>textContent</code> mostra o texto exatamente como está: o <code>&lt;img ...&gt;</code> aparece <em>escrito</em> na tela, sem executar', 'Prefira <code>createElement</code> para montar a estrutura, e <code>textContent</code> para os textos']),
      code(`function escaparHtml(texto) {
  return String(texto)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

vitrine.innerHTML += "<h3>" + escaparHtml(produto.nome) + "</h3>";`, 'Se for mesmo usar innerHTML, escape tudo que vem de fora'),
      caderno(['Dado de fora + innerHTML = risco', 'Prefira textContent / createElement', 'Se usar innerHTML: escapar < > & " \''])),
    P('🐞', 'ENCONTRE O ERRO: o onclick que quebra',
      code(`'<button onclick="excluirProduto(\\'' + chave + '\\')">Excluir</button>'`),
      lista(['<strong>Problemas:</strong> o texto da chave está <strong>dentro de aspas no HTML</strong>. Se a chave tiver uma aspa (ou for manipulada), o código do botão quebra, ou pior, executa algo inesperado', '<strong>Correção:</strong> criar o botão com <code>createElement</code> e ligar o clique com <code>addEventListener</code>, sem montar código dentro de texto']),
      code(`let botao = document.createElement("button");
botao.textContent = "Excluir";
botao.addEventListener("click", function () {
  excluirProduto(chave);
});`),
      box('azul', `<strong>Lição:</strong> montar HTML e JavaScript <em>juntando textos</em> é a raiz da maioria das falhas de segurança em páginas.`)),
    P('🔒', 'O que NUNCA guardar no navegador',
      lista(['🚫 Senhas', '🚫 Números de cartão, CPF completo, dados bancários', '🚫 Chaves de API secretas e tokens de acesso no código da página', '🚫 Qualquer informação que prejudique o usuário se outra pessoa abrir o Application']),
      box('amarelo', `<strong>Regra:</strong> tudo que está no navegador pode ser <strong>lido e alterado pelo usuário</strong>. Validação e segurança de verdade acontecem também <strong>no servidor</strong>. A validação que você faz na página serve para ajudar o usuário, não para impedir um atacante.`),
      lista(['✅ Valide o tamanho e o formato do que o usuário digita', '✅ Trate dados vindos de APIs como <strong>não confiáveis</strong> também', '✅ Use HTTPS (o cadeado) em sites reais']),
      caderno(['Nada sensível no navegador', 'Tudo no navegador pode ser lido e alterado', 'Segurança de verdade também no servidor'])),
    P('🎯', 'DESAFIO: auditoria do seu projeto',
      lista(['Procure todos os <code>innerHTML</code> do seu projeto e classifique: usa dado do usuário, sim ou não?', 'Troque os perigosos por <code>createElement</code> + <code>textContent</code> (ou escape)', 'Confira se há senhas ou dados sensíveis guardados em algum lugar']),
      box('verde', `<strong>Explique com suas palavras</strong> o que é XSS, como acontece na loja e como a correção impede o problema.`)),
  ], [
    Q('O que é XSS?', 'Um ataque em que texto digitado vira código executado na página', 'Um tipo de CSS', 'Um erro de rede', 'Uma forma de guardar dados'),
    Q('Qual é a causa clássica de XSS neste projeto?', 'Usar innerHTML com texto vindo do usuário sem tratamento', 'Usar textContent', 'Usar let', 'Usar localStorage'),
    Q('O que acontece com <img src="x" onerror="alert(1)"> inserido por innerHTML?', 'O código do onerror é executado', 'Aparece só como texto', 'Nada, o navegador bloqueia sempre', 'A imagem é carregada normalmente'),
    Q('O que acontece com o mesmo texto inserido por textContent?', 'Aparece escrito na tela, sem executar', 'Executa o alerta', 'Gera um erro de sintaxe', 'Some da página'),
    Q('Qual é a forma mais segura de montar um card com o nome do produto?', 'createElement e textContent', 'innerHTML com o nome concatenado', 'document.write', 'eval'),
    Q('Para que serve a função escaparHtml?', 'Trocar < > & " \' por entidades seguras', 'Apagar o texto', 'Converter para número', 'Guardar no localStorage'),
    Q('Por que onclick="excluir(\'" + chave + "\')" é arriscado?', 'Monta código juntando textos, o que pode quebrar ou ser manipulado', 'Porque onclick não existe', 'Porque exige JSON', 'Porque só funciona no Firefox'),
    Q('Qual é o jeito melhor de ligar o clique do botão?', 'addEventListener em um botão criado com createElement', 'Escrever onclick dentro do texto HTML', 'Usar setTimeout', 'Usar innerHTML no botão'),
    Q('Qual destes dados NUNCA deve ficar no localStorage?', 'Senhas', 'A preferência de tema', 'O carrinho', 'A lista de produtos de teste'),
    Q('Por que a validação na página não basta para segurança de verdade?', 'Porque tudo no navegador pode ser lido e alterado pelo usuário', 'Porque o JavaScript não valida', 'Porque o navegador apaga a validação', 'Porque só vale no celular'),
  ]);

  PRAT[83] = { tarefas: ['<strong>Nível 1.</strong> Digite um <code>for</code> que mostre os números de 1 a 10 no console, e um <code>while</code> que faça o mesmo.', '<strong>Nível 1.</strong> Faça a tabelinha de cada volta (<code>i</code>, <code>total</code>) de um laço que soma <code>[10, 20, 30]</code> <strong>antes</strong> de rodar.', '<strong>Nível 2.</strong> Troque <code>&lt;</code> por <code>&lt;=</code> em um laço sobre um array e anote o que muda.', '<strong>Explique:</strong> com suas palavras, quando usar <code>for</code> e quando usar <code>while</code>.'],
    desafio: '<strong>Nível 3.</strong> Escreva um laço que percorre a lista de produtos e para (<code>break</code>) no primeiro produto com preço acima de 100, mostrando o nome dele.' };
  PRAT[84] = { tarefas: ['<strong>Nível 1.</strong> Dado um array de 4 produtos, use <code>map</code> para obter só os nomes.', '<strong>Nível 1.</strong> Use <code>filter</code> para obter os produtos com preço menor que 20.', '<strong>Nível 2.</strong> Use <code>find</code> para achar um produto pelo id e <code>reduce</code> para somar os preços.', '<strong>Explique:</strong> com suas palavras, a diferença entre <code>map</code>, <code>filter</code>, <code>find</code> e <code>reduce</code>.'],
    desafio: '<strong>Nível 3.</strong> Calcule, em uma única expressão encadeada (<code>filter</code> e <code>reduce</code>), o <strong>total dos produtos da categoria "Papelaria"</strong>.' };
  PRAT[85] = { tarefas: ['<strong>Nível 1.</strong> Provoque de propósito os erros <code>total is not defined</code> (variável dentro da função usada fora) e <code>Assignment to constant variable</code>.', '<strong>Nível 2.</strong> Corrija cada um e explique no caderno por que a correção funciona.', '<strong>Nível 2.</strong> Pegue um trecho do seu projeto e renomeie 3 variáveis ruins (<code>x</code>, <code>a1</code>) para nomes claros.', '<strong>Explique:</strong> com suas palavras, o que é escopo e por que ele existe.'],
    desafio: '<strong>Nível 3.</strong> Revise uma função grande do seu projeto: divida em duas funções menores, cada uma com uma responsabilidade, sem mudar o comportamento.' };
  PRAT[86] = { tarefas: ['<strong>Nível 1.</strong> Crie uma lista de compras: um campo, um botão Adicionar e um <code>ul</code> que recebe os itens com <code>createElement</code>.', '<strong>Nível 1.</strong> Acrescente um botão <strong>Remover</strong> em cada item usando <code>remove()</code>.', '<strong>Nível 2.</strong> Mostre a contagem "X itens" e atualize ao adicionar e remover.', '<strong>Explique:</strong> com suas palavras, a diferença entre apagar o elemento da tela e apagar o item dos dados.'],
    desafio: '<strong>Nível 3.</strong> Faça a lista guardar seus itens em um array e redesenhar a tela a partir dele, para a tela e os dados nunca ficarem diferentes.' };
  PRAT[87] = { tarefas: ['<strong>Nível 1.</strong> Monte um formulário (nome, e-mail, idade) com o evento <code>submit</code> e <code>preventDefault()</code>. Confirme que a página não recarrega.', '<strong>Nível 2.</strong> Valide cada campo e mostre a mensagem <strong>ao lado do campo</strong>, em vermelho.', '<strong>Nível 2.</strong> Marque o campo inválido com uma classe CSS e leve o foco até ele (<code>focus()</code>).', '<strong>Explique:</strong> com suas palavras, por que o HTML <code>required</code> não substitui a validação em JavaScript.'],
    desafio: '<strong>Nível 3.</strong> Valide em tempo real (evento <code>input</code>): o campo fica verde quando válido e vermelho quando inválido, e o botão Enviar só habilita com tudo certo.' };
  PRAT[88] = { tarefas: ['<strong>Nível 1.</strong> Monte a lista de tarefas com <code>lerTarefas</code>, <code>salvarTarefas</code> e <code>desenharTarefas</code>. Confira se sobrevive ao recarregar.', '<strong>Nível 1.</strong> Acrescente adicionar, marcar como concluída e remover.', '<strong>Nível 2.</strong> Mostre "X pendentes" usando <code>filter</code>.', '<strong>Explique:</strong> com suas palavras, quando guardar uma lista inteira em uma só chave e quando usar uma chave por item (como na loja).'],
    desafio: '<strong>Nível 3.</strong> Acrescente os filtros Todas / Pendentes / Concluídas e o botão "Limpar concluídas".' };

  // ══════════════════════════════════════════════════════
  // 83 — LAÇOS for E while
  // ══════════════════════════════════════════════════════
  A(83, 'JavaScript 6: Laços for e while', 'Repetir ações com for, while e for...of, prever cada volta e evitar o laço infinito', '🔁', [
    P('💡', 'ENTENDA: repetir sem copiar e colar',
      `<p>Um <strong>laço</strong> executa um bloco várias vezes. Existem duas ideias:</p>`,
      lista(['🔢 <strong>for</strong>: quando você sabe <em>quantas vezes</em> repetir (ex.: percorrer todos os itens de uma lista)', '❓ <strong>while</strong>: quando repete <em>enquanto uma condição for verdadeira</em>, sem saber quantas voltas (ex.: até o usuário acertar a senha)']),
      analogia(`o <strong>for</strong> é "dê 10 voltas na pista". O <strong>while</strong> é "continue correndo <em>enquanto</em> o tempo não acabar".`),
      caderno(['for = número de voltas conhecido', 'while = repete enquanto a condição for verdadeira'])),
    P('🧠', 'PREVEJA: faça a tabelinha',
      code(`let total = 0;
for (let i = 1; i <= 4; i++) {
  total = total + i;
}
console.log(total);`),
      preveja(`monte no caderno uma tabela com as colunas <code>volta</code>, <code>i</code> e <code>total</code>. Quanto vale <code>total</code> no final?`),
      box('verde', `<strong>Resposta:</strong> volta 1 (i=1, total=1), volta 2 (i=2, total=3), volta 3 (i=3, total=6), volta 4 (i=4, total=10). Resultado: <code>10</code>. O laço <strong>para</strong> quando <code>i</code> chega a 5, pois <code>5 &lt;= 4</code> é falso.`)),
    P('⌨️', 'DIGITE: while e for...of',
      code(`let tentativas = 3;
while (tentativas > 0) {
  console.log("Restam " + tentativas + " tentativas");
  tentativas = tentativas - 1;     // IMPORTANTE: a condição precisa mudar!
}
console.log("Fim");`),
      code(`let nomes = ["Ana", "Beto", "Carla"];

for (let nome of nomes) {          // for...of: cada item, sem precisar de índice
  console.log("Olá, " + nome);
}`),
      lista(['<code>for (let nome of nomes)</code>: a cada volta, <code>nome</code> recebe o próximo item. Mais simples quando você <strong>não precisa da posição</strong>', 'Use o <code>for</code> tradicional quando precisar do <strong>índice</strong> (<code>i</code>)']),
      code(`for (let i = 0; i < 10; i++) {
  if (i === 3) continue;   // pula esta volta
  if (i === 6) break;      // sai do laço
  console.log(i);          // mostra 0 1 2 4 5
}`, 'break e continue')),
    P('🐞', 'ENCONTRE O ERRO: o laço infinito',
      code(`let i = 0;
while (i < 5) {
  console.log(i);
  // esqueceu de aumentar o i
}`),
      lista(['<strong>Sintoma:</strong> a página trava e o navegador avisa que ela "não está respondendo"', '<strong>Causa:</strong> a condição <code>i &lt; 5</code> <strong>nunca deixa de ser verdadeira</strong>, pois <code>i</code> nunca muda', '<strong>Correção:</strong> garantir que algo dentro do laço <strong>aproxime a condição do fim</strong> (<code>i = i + 1</code>)']),
      atencao(`teste laços novos com poucos valores e um <code>console.log</code>. Se travar, feche a aba. Nos laços <code>for</code>, o aumento do <code>i++</code> já está no cabeçalho, então é mais difícil esquecer.`),
      caderno(['Todo while precisa de algo que mude a condição', 'Laço infinito trava a página', 'break sai · continue pula a volta'])),
    P('🔧', 'MODIFIQUE: o erro do <=',
      code(`let frutas = ["Maçã", "Uva", "Pera"];

for (let i = 0; i <= frutas.length; i++) {      // <= em vez de <
  console.log(frutas[i].toUpperCase());
}
// Uncaught TypeError: Cannot read properties of undefined (reading 'toUpperCase')`),
      lista(['<strong>Causa:</strong> com <code>&lt;=</code>, a última volta usa <code>i = 3</code>, mas a lista só tem as posições 0, 1 e 2. <code>frutas[3]</code> é <code>undefined</code>', '<strong>Correção:</strong> usar <code>&lt;</code> (<em>off-by-one</em>, o erro de "um a mais")', 'Troque o código para <code>for...of</code> e veja que o problema deixa de existir']),
      caderno(['i < lista.length (menor, não menor ou igual)', 'Erro de "um a mais" = off-by-one', 'for...of evita o erro do índice'])),
    P('🛒', 'APLICANDO: total do carrinho',
      code(`let carrinho = [
  { nome: "Caneta",  preco: 3.5,  quantidade: 2 },
  { nome: "Caderno", preco: 18,   quantidade: 1 }
];

let total = 0;
for (let item of carrinho) {
  total = total + item.preco * item.quantidade;
}
console.log("Total: R$ " + total.toFixed(2));    // Total: R$ 25.00`),
      box('verde', `<strong>Explique com suas palavras:</strong> por que o <code>total</code> começa em 0 <em>antes</em> do laço? O que aconteceria se ele fosse criado dentro?`)),
  ], [
    Q('Quando usar o for?', 'Quando sabemos quantas vezes repetir', 'Só para textos', 'Quando não há condição', 'Apenas com números negativos'),
    Q('O while repete:', 'Enquanto a condição for verdadeira', 'Uma única vez', 'Até acabar a memória', 'Só se a condição for falsa'),
    Q('Com let total = 0; for (let i = 1; i <= 4; i++) total += i; quanto é total?', '10', '6', '4', '15'),
    Q('O que acontece se esquecermos de mudar a variável da condição em um while?', 'O laço fica infinito e a página trava', 'O laço roda uma vez', 'O laço não roda', 'O navegador corrige'),
    Q('O que faz o break dentro de um laço?', 'Sai do laço', 'Pula só a volta atual', 'Repete a volta', 'Apaga o laço'),
    Q('O que faz o continue?', 'Pula para a próxima volta', 'Sai do laço', 'Encerra o programa', 'Reinicia o laço do zero'),
    Q('Em for (let n of nomes), o que é n a cada volta?', 'O próximo item do array', 'A posição do item', 'O tamanho do array', 'O último item'),
    Q('for (let i = 0; i <= frutas.length; i++) dá erro porque:', 'A última volta usa uma posição que não existe', 'O for não aceita <=', 'frutas.length não existe', 'i começa em 0'),
    Q('Que erro costuma aparecer nesse caso?', "TypeError: Cannot read properties of undefined", 'SyntaxError: Unexpected token', 'ReferenceError: i is not defined', 'RangeError'),
    Q('Por que o total começa em 0 antes do laço?', 'Para acumular os valores de todas as voltas', 'Porque o for exige', 'Para o laço rodar mais rápido', 'Para evitar o erro de sintaxe'),
  ]);

  // ══════════════════════════════════════════════════════
  // 84 — map, filter, find, reduce
  // ══════════════════════════════════════════════════════
  A(84, 'JavaScript 7: map, filter, find e reduce', 'Transformar, filtrar, procurar e somar listas de forma curta, com funções de seta', '🧰', [
    P('💡', 'ENTENDA: ferramentas prontas para listas',
      `<p>Quase todo laço que você escreve faz uma de quatro coisas. O JavaScript tem um método para cada uma:</p>`,
      lista(['🔄 <code>map</code>: <strong>transforma</strong> cada item (devolve um array do mesmo tamanho)', '🔎 <code>filter</code>: <strong>filtra</strong>, ficando só com os itens que passam num teste', '🎯 <code>find</code>: <strong>procura</strong> o primeiro item que passa no teste', '➕ <code>reduce</code>: <strong>junta</strong> tudo em um único valor (uma soma, por exemplo)']),
      analogia(`uma <strong>linha de montagem</strong>: o <code>map</code> pinta cada peça, o <code>filter</code> descarta as defeituosas, o <code>find</code> pega a primeira peça azul e o <code>reduce</code> conta quantas há no total.`),
      caderno(['map = transforma · filter = filtra', 'find = acha o primeiro · reduce = junta em um valor'])),
    P('➡️', 'Funções de seta (arrow functions)',
      `<p>Esses métodos recebem uma função. Uma forma curta de escrevê-la é a <strong>função de seta</strong>:</p>`,
      code(`// função normal
function dobro(n) { return n * 2; }

// função de seta: parâmetro => resultado
let dobro2 = (n) => n * 2;

console.log(dobro(4));    // 8
console.log(dobro2(4));   // 8`),
      lista(['Sem chaves, o valor depois da seta é <strong>devolvido automaticamente</strong>', 'Com chaves <code>{ }</code>, é preciso escrever <code>return</code>']),
      atencao(`esquecer o <code>return</code> quando se usa chaves é um dos erros mais comuns: a função devolve <code>undefined</code>.`)),
    P('⌨️', 'DIGITE: os quatro com produtos',
      code(`let produtos = [
  { id: 1, nome: "Caneta",  preco: 3.5 },
  { id: 2, nome: "Caderno", preco: 18 },
  { id: 3, nome: "Lápis",   preco: 1.5 }
];

let nomes   = produtos.map((p) => p.nome);               // ["Caneta","Caderno","Lápis"]
let baratos = produtos.filter((p) => p.preco < 5);       // Caneta e Lápis
let caderno = produtos.find((p) => p.id === 2);          // o objeto do Caderno
let total   = produtos.reduce((soma, p) => soma + p.preco, 0);   // 23`),
      lista(['<code>reduce</code> recebe <strong>dois</strong> parâmetros: o acumulador (<code>soma</code>) e o item (<code>p</code>), e um valor inicial (<code>0</code>)']),
      preveja(`quanto vale <code>nomes.length</code>? E <code>baratos.length</code>? E o que seria <code>produtos.find((p) => p.id === 99)</code>?`),
      box('verde', `<strong>Resultado:</strong> 3, 2 e <code>undefined</code> (o <code>find</code> devolve <code>undefined</code> quando <strong>não encontra</strong>).`)),
    P('🐞', 'ENCONTRE O ERRO: três armadilhas',
      code(`// 1) find que não encontra
let p = produtos.find((x) => x.id === 99);
console.log(p.nome);
// TypeError: Cannot read properties of undefined (reading 'nome')

// 2) map sem return
let precos = produtos.map((p) => { p.preco });     // [undefined, undefined, undefined]

// 3) reduce sem valor inicial, com objetos
let soma = produtos.reduce((s, p) => s + p.preco);  // "[object Object]3.51.5"`),
      lista(['<strong>1:</strong> confira se o <code>find</code> achou algo antes de usar: <code>if (p) { ... }</code>', '<strong>2:</strong> com chaves, falta o <code>return</code>. Use <code>(p) =&gt; p.preco</code> ou <code>{ return p.preco; }</code>', '<strong>3:</strong> sem o valor inicial, o primeiro acumulador é o <em>primeiro objeto</em>, e <code>objeto + número</code> vira texto. Sempre passe o <code>0</code>']),
      caderno(['find não achou = undefined (confira antes de usar)', 'Com chaves precisa de return', 'reduce com objetos: informe o valor inicial 0'])),
    P('🔧', 'MODIFIQUE: encadear',
      code(`let totalBaratos = produtos
  .filter((p) => p.preco < 5)
  .reduce((soma, p) => soma + p.preco, 0);

console.log(totalBaratos);   // 5`),
      lista(['Troque o limite de <code>5</code> para <code>20</code> e preveja o resultado', 'Use <code>map</code> para criar uma lista de textos <code>"Caneta - R$ 3.50"</code>', 'Use <code>find</code> para o produto mais barato <em>acima de</em> R$ 2']),
      atencao(`<code>filter</code>, <code>map</code> e <code>find</code> <strong>não alteram o array original</strong>: eles devolvem algo novo. Guarde o resultado em uma variável.`)),
    P('🛒', 'APLICANDO NA LOJA',
      code(`// total do carrinho com reduce
let total = itens.reduce((soma, i) => soma + i.preco * i.quantidade, 0);

// produto pelo id
let produto = lerProdutos().find((p) => p.id === idProduto);

// busca na vitrine
let achados = lerProdutos().filter((p) => p.nome.toLowerCase().includes(texto));`),
      box('verde', `<strong>Explique com suas palavras:</strong> qual método você usaria para (a) somar o carrinho, (b) achar um produto pelo id, (c) mostrar só os de uma categoria, (d) listar os nomes? E por quê?`)),
  ], [
    Q('Qual método transforma cada item e devolve um array do mesmo tamanho?', 'map', 'filter', 'find', 'reduce'),
    Q('Qual método fica só com os itens que passam em um teste?', 'filter', 'map', 'find', 'reduce'),
    Q('Qual método devolve o primeiro item que passa no teste?', 'find', 'filter', 'map', 'reduce'),
    Q('Qual método junta a lista em um único valor, como uma soma?', 'reduce', 'map', 'find', 'filter'),
    Q('O que devolve find quando nenhum item passa no teste?', 'undefined', 'null', '0', 'Um array vazio'),
    Q('Por que produtos.find(p => p.id === 99).nome pode dar erro?', 'Se não encontrar, o resultado é undefined e undefined.nome quebra', 'Porque find não existe', 'Porque id não pode ser número', 'Porque faltou o return'),
    Q('O que o map((p) => { p.preco }) devolve?', 'Um array de undefined (faltou o return)', 'Um array com os preços', 'Um único número', 'Um erro de sintaxe'),
    Q('Em reduce((soma, p) => soma + p.preco, 0), o que é o 0?', 'O valor inicial do acumulador', 'O índice', 'O número de itens', 'O preço mínimo'),
    Q('Dado [3,8,12,5].filter(n => n > 4).length, qual o valor?', '3', '4', '2', '1'),
    Q('O filter altera o array original?', 'Não, devolve um array novo', 'Sim, remove os itens', 'Sim, mas só de números', 'Só se usar let'),
  ]);

  // ══════════════════════════════════════════════════════
  // 85 — ESCOPO E BOAS PRÁTICAS
  // ══════════════════════════════════════════════════════
  A(85, 'JavaScript 8: Escopo e Boas Práticas', 'Entender onde cada variável existe e escrever código que outras pessoas conseguem ler', '🧭', [
    P('💡', 'ENTENDA: onde a variável "vive"',
      `<p><strong>Escopo</strong> é a região do código em que uma variável <strong>existe</strong>. Fora dela, o JavaScript não a enxerga.</p>`,
      analogia(`os <strong>cômodos de uma casa</strong>: o que está no quarto (dentro da função) não é visto na sala (fora dela). Já o que está no corredor (escopo global) todos os cômodos enxergam.`),
      code(`let escola = "ETEC";             // global: todos enxergam

function mostrar() {
  let aluno = "Ana";             // local: só existe dentro da função
  console.log(escola, aluno);    // ETEC Ana
}

mostrar();
console.log(escola);             // ETEC
console.log(aluno);              // ReferenceError: aluno is not defined`),
      caderno(['Variável dentro da função só existe dentro dela', 'Fora do escopo: ReferenceError: x is not defined'])),
    P('🧱', 'Escopo de bloco: let e const',
      `<p><code>let</code> e <code>const</code> valem <strong>apenas dentro do bloco</strong> <code>{ ... }</code> em que foram criados (um <code>if</code>, um <code>for</code>...):</p>`,
      code(`if (true) {
  let mensagem = "dentro do if";
}
console.log(mensagem);   // ReferenceError: mensagem is not defined

for (let i = 0; i < 3; i++) { }
console.log(i);          // ReferenceError: i is not defined`),
      preveja(`se você precisa do <code>total</code> <em>depois</em> do <code>for</code>, onde deve declará-lo?`),
      box('verde', `<strong>Resposta:</strong> <strong>antes</strong> do laço, fora do bloco. Foi exatamente o que fizemos no total do carrinho: <code>let total = 0;</code> antes do <code>for</code>.`)),
    P('🔒', 'let, const e as mensagens de erro',
      lista(['<code>let</code>: o valor pode ser trocado', '<code>const</code>: a <strong>variável</strong> não pode ser reatribuída (mas, se guarda um objeto ou array, o <em>conteúdo</em> pode mudar)']),
      code(`const taxa = 0.1;
taxa = 0.2;
// TypeError: Assignment to constant variable.

let nome = "Ana";
let nome = "Beto";
// SyntaxError: Identifier 'nome' has already been declared

const lista = [1, 2];
lista.push(3);        // pode! o array muda, a variável continua a mesma
console.log(lista);   // [1, 2, 3]`),
      atencao(`regra prática: use <code>const</code> por padrão e <code>let</code> só quando o valor <strong>precisa mudar</strong>. Evite <code>var</code>, um jeito antigo, com regras de escopo confusas.`),
      caderno(['const por padrão · let quando muda', 'const não permite reatribuir, mas o conteúdo de arrays/objetos pode mudar', 'Declarar duas vezes o mesmo nome = SyntaxError'])),
    P('🐞', 'ENCONTRE O ERRO: a variável que "sumiu"',
      code(`function calcularTotal(lista) {
  let total = 0;
  for (let item of lista) {
    total = total + item.preco;
  }
}

let resultado = calcularTotal([{ preco: 5 }, { preco: 7 }]);
console.log(resultado);   // undefined`),
      lista(['<strong>Sintoma:</strong> o total é <code>undefined</code>, e não há erro no console', '<strong>Causa:</strong> a função calcula o <code>total</code>, mas <strong>não devolve</strong> nada. A variável existia só dentro da função', '<strong>Correção:</strong> acrescentar <code>return total;</code> no final']),
      box('azul', `<strong>Escopo e return trabalham juntos:</strong> a função enxerga o que está dentro dela; para levar um resultado para fora, ela precisa <strong>devolvê-lo</strong>.`)),
    P('🧼', 'Boas práticas: código que outros leem',
      lista(['📛 <strong>Nomes claros</strong>: <code>precoComDesconto</code>, não <code>x2</code>', '🧩 <strong>Funções pequenas</strong>: uma responsabilidade cada', '🔢 <strong>Sem números mágicos</strong>: <code>const TAXA = 0.1</code> em vez de <code>0.1</code> espalhado', '💬 <strong>Comentários úteis</strong>: explicam o "porquê", não repetem o óbvio', '↔️ <strong>Indentação</strong> consistente', '🚫 <strong>Evite variáveis globais</strong> desnecessárias']),
      code(`// ruim
let x = p * 0.9;

// bom
const DESCONTO = 0.1;
let precoComDesconto = preco * (1 - DESCONTO);`),
      caderno(['Nome claro · função pequena · sem número mágico', 'Comente o porquê, não o óbvio'])),
    P('🎯', 'DESAFIO: refatorar',
      lista(['Pegue uma função grande do seu projeto', 'Divida em funções menores, com nomes claros', 'Troque números soltos por constantes', 'Confira que o comportamento continua o mesmo']),
      box('verde', `<strong>Explique com suas palavras:</strong> o que é escopo e por que ele é útil? (Dica: pense em duas funções que usam uma variável chamada <code>total</code> sem uma atrapalhar a outra.)`)),
  ], [
    Q('O que é escopo?', 'A região do código em que uma variável existe', 'Um tipo de variável', 'Uma função do navegador', 'Um erro de sintaxe'),
    Q('Uma variável criada com let dentro de uma função pode ser usada fora dela?', 'Não, dá ReferenceError', 'Sim, sempre', 'Sim, se for número', 'Só com const'),
    Q('O que mostra console.log(i) depois de um for (let i = 0; ...)?', 'ReferenceError: i is not defined', '0', 'O último valor de i', 'undefined'),
    Q('Se preciso do total depois do laço, onde declarar let total?', 'Antes do laço, fora do bloco', 'Dentro do laço', 'Dentro do if', 'Depois do laço'),
    Q('O que causa TypeError: Assignment to constant variable?', 'Tentar reatribuir uma const', 'Usar let duas vezes', 'Esquecer o return', 'Usar um array vazio'),
    Q('const lista = [1,2]; lista.push(3); funciona?', 'Sim, o conteúdo do array pode mudar', 'Não, const bloqueia tudo', 'Só com let', 'Só em funções'),
    Q('O que causa SyntaxError: Identifier \'nome\' has already been declared?', 'Declarar duas vezes o mesmo nome com let/const', 'Esquecer o ponto e vírgula', 'Usar var', 'Usar return'),
    Q('A função calcula o total mas resultado é undefined. O que faltou?', 'return total;', 'let total', 'console.log', 'Um laço'),
    Q('Qual é uma boa prática?', 'Usar nomes claros e funções com uma responsabilidade', 'Usar nomes curtos como x e a1', 'Colocar tudo em uma função só', 'Espalhar números soltos pelo código'),
    Q('O que é um "número mágico"?', 'Um número solto no código sem explicação do que significa', 'Um número aleatório', 'Um número muito grande', 'Um número negativo'),
  ]);

  // ══════════════════════════════════════════════════════
  // 86 — DOM 3: CRIAR E REMOVER ELEMENTOS
  // ══════════════════════════════════════════════════════
  A(86, 'DOM 3: Criar e Remover Elementos', 'Adicionar e apagar itens da página e manter a tela sempre igual aos dados', '🧩', [
    P('💡', 'ENTENDA: a tela é o retrato dos dados',
      `<p>Em uma lista dinâmica, há <strong>duas coisas</strong>: os <strong>dados</strong> (um array) e a <strong>tela</strong> (os elementos). Se você mexe em uma e esquece a outra, elas ficam diferentes.</p>`,
      analogia(`os dados são o <strong>quadro de avisos na secretaria</strong>; a tela é a <strong>foto</strong> dele no mural. Apagar um aviso do quadro não apaga a foto. É preciso <em>tirar uma foto nova</em>.`),
      caderno(['Dados = array · Tela = elementos', 'Mudou os dados? Redesenhe a tela a partir deles'])),
    P('⌨️', 'DIGITE: adicionar e remover itens',
      code(`<input type="text" id="item">
<button id="btnAdicionar">Adicionar</button>
<ul id="lista"></ul>

<script>
  let itens = [];

  function desenhar() {
    let lista = document.getElementById("lista");
    lista.innerHTML = "";                         // 1. limpa
    for (let i = 0; i < itens.length; i++) {      // 2. percorre os DADOS
      let li = document.createElement("li");
      li.textContent = itens[i] + " ";

      let botao = document.createElement("button");
      botao.textContent = "Remover";
      botao.addEventListener("click", function () {
        itens.splice(i, 1);                       // remove do array
        desenhar();                               // redesenha
      });

      li.appendChild(botao);
      lista.appendChild(li);
    }
  }

  document.getElementById("btnAdicionar").addEventListener("click", function () {
    let campo = document.getElementById("item");
    if (campo.value.trim() === "") return;
    itens.push(campo.value.trim());
    campo.value = "";
    desenhar();
  });
</script>`),
      lista(['<code>itens.splice(i, 1)</code>: remove 1 item na posição <code>i</code> do array', '<code>li.appendChild(botao)</code>: coloca o botão <em>dentro</em> do item', 'Depois de mudar o array, <code>desenhar()</code> refaz a lista']),
      preveja(`se a lista tem 3 itens e você remove o do meio, o que o <code>desenhar()</code> mostra? E se esquecer de chamar <code>desenhar()</code>?`)),
    P('🗑️', 'Outras formas de remover',
      code(`let li = document.querySelector("li");

li.remove();                                  // remove o próprio elemento
lista.removeChild(li);                        // jeito mais antigo (o pai remove o filho)
lista.innerHTML = "";                         // esvazia o elemento todo`),
      atencao(`<code>li.remove()</code> apaga <strong>só da tela</strong>. Se o item continua no array (ou no localStorage), ele <strong>volta</strong> na próxima vez que a tela for desenhada. Por isso o padrão seguro é: <strong>1) mudar os dados, 2) redesenhar</strong>.`),
      caderno(['elemento.remove() apaga só da tela', 'Padrão seguro: mudar os dados e redesenhar', 'lista.innerHTML = "" esvazia tudo'])),
    P('🐞', 'ENCONTRE O ERRO: itens duplicados e itens que voltam',
      lista(['<strong>Duplicados:</strong> a função de desenhar não limpa a lista antes (<code>innerHTML = ""</code>) e cada chamada <strong>acrescenta tudo de novo</strong>', '<strong>Itens que voltam:</strong> o programador usou <code>li.remove()</code>, mas não tirou o item do array: ao redesenhar, ele reaparece', '<strong>Elemento não encontrado:</strong> <code>Uncaught TypeError: Cannot read properties of null (reading \'appendChild\')</code>: o <code>id</code> da lista está diferente no HTML e no JavaScript']),
      box('verde', `<strong>Regra:</strong> a função de desenhar <strong>sempre limpa primeiro</strong> e <strong>sempre desenha a partir dos dados</strong>. Assim, não importa quantas vezes você chame: o resultado é o mesmo.`)),
    P('🔧', 'MODIFIQUE: contador e marcar como feito',
      code(`// mostrar quantos itens
document.getElementById("contador").textContent = itens.length + " itens";

// marcar como feito: alterna uma classe CSS
li.addEventListener("click", function () {
  li.classList.toggle("feito");
});`),
      lista(['Crie o CSS <code>.feito { text-decoration: line-through; color: gray; }</code>', 'Mostre "Lista vazia" quando <code>itens.length === 0</code>', 'Faça o campo receber o foco (<code>campo.focus()</code>) depois de adicionar']),
      atencao(`ao marcar como feito só com <code>classList</code>, o estado <strong>não está nos dados</strong>: some ao redesenhar. Na aula do mini-projeto você vai guardar esse estado no objeto.`)),
    P('🎯', 'DESAFIO: lista de compras com preço',
      lista(['Cada item é um objeto <code>{ nome, preco }</code> (e não só um texto)', 'Mostre o total <strong>somado</strong> abaixo da lista, atualizado ao adicionar e remover', 'Recuse itens com nome vazio ou preço inválido']),
      box('verde', `<strong>Explique com suas palavras:</strong> qual a diferença entre apagar o elemento da tela e apagar o item dos dados? Por que o padrão "mudar os dados e redesenhar" é mais seguro?`)),
  ], [
    Q('Em uma lista dinâmica, o que são "dados" e "tela"?', 'Dados são o array; tela são os elementos desenhados', 'São a mesma coisa', 'Dados são o CSS; tela é o JS', 'Dados são o HTML; tela é o array'),
    Q('Qual é o padrão seguro ao remover um item?', 'Mudar os dados e redesenhar a tela', 'Só usar remove() no elemento', 'Só mexer no CSS', 'Reiniciar o navegador'),
    Q('O que faz itens.splice(i, 1)?', 'Remove 1 item na posição i do array', 'Adiciona um item', 'Copia o array', 'Ordena o array'),
    Q('O que acontece com li.remove() se o item continua no array?', 'Ele volta quando a tela for redesenhada', 'Some para sempre', 'Quebra o array', 'Apaga o array'),
    Q('Por que a lista aparece duplicada a cada chamada de desenhar?', 'A função não limpou o conteúdo antes de desenhar', 'O for está errado', 'O navegador duplica', 'O array foi copiado'),
    Q('Qual comando esvazia o conteúdo de um elemento?', 'elemento.innerHTML = ""', 'elemento.empty', 'elemento.delete()', 'elemento.null'),
    Q('TypeError: Cannot read properties of null (reading \'appendChild\') indica:', 'O elemento não foi achado (id diferente do HTML)', 'Faltou o return', 'O array está vazio', 'Faltou let'),
    Q('Qual método coloca um elemento DENTRO de outro?', 'appendChild', 'createElement', 'remove', 'querySelector'),
    Q('Por que a função desenhar deve sempre limpar primeiro?', 'Para o resultado ser o mesmo, não importa quantas vezes for chamada', 'Para economizar memória', 'Porque o navegador exige', 'Para o array ficar vazio'),
    Q('Um item marcado como feito só com classList some ao redesenhar. Por quê?', 'O estado não está nos dados', 'O CSS foi apagado', 'O navegador limpa as classes', 'Faltou o evento'),
  ]);

  // ══════════════════════════════════════════════════════
  // 87 — FORMULÁRIOS E VALIDAÇÃO COM JS
  // ══════════════════════════════════════════════════════
  A(87, 'DOM 4: Formulários e Validação com JavaScript', 'Tratar o envio sem recarregar a página, validar campo a campo e mostrar mensagens claras', '📋', [
    P('💡', 'ENTENDA: o envio do formulário recarrega a página',
      `<p>Por padrão, um <code>&lt;form&gt;</code> <strong>envia os dados e recarrega a página</strong> ao clicar em um botão. Para tratar tudo no JavaScript, precisamos <strong>interceptar</strong> o envio.</p>`,
      analogia(`o carteiro vem buscar a carta assim que você a coloca na caixa. O <code>preventDefault()</code> diz: <strong>"espere, ainda vou conferir a carta"</strong>.`),
      code(`<form id="formulario">
  <label for="nome">Nome</label>
  <input type="text" id="nome" required minlength="3">
  <span id="erro-nome" class="erro"></span>

  <label for="email">E-mail</label>
  <input type="email" id="email" required>
  <span id="erro-email" class="erro"></span>

  <button type="submit">Enviar</button>
</form>`),
      caderno(['Formulário envia e recarrega por padrão', 'submit + event.preventDefault() para tratar no JS'])),
    P('⌨️', 'DIGITE: interceptar e validar',
      code(`let formulario = document.getElementById("formulario");

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();                       // não recarrega

  let nome  = document.getElementById("nome").value.trim();
  let email = document.getElementById("email").value.trim();
  let ok = true;

  if (nome.length < 3) {
    mostrarErro("nome", "O nome precisa ter pelo menos 3 letras.");
    ok = false;
  } else {
    mostrarErro("nome", "");
  }

  if (!email.includes("@")) {
    mostrarErro("email", "Informe um e-mail válido.");
    ok = false;
  } else {
    mostrarErro("email", "");
  }

  if (ok) {
    console.log("Formulário válido:", nome, email);
  }
});

function mostrarErro(campo, texto) {
  document.getElementById("erro-" + campo).textContent = texto;
}`),
      lista(['Cada campo tem um <code>&lt;span&gt;</code> de erro ao lado, com id <code>erro-nome</code>, <code>erro-email</code>', 'A variável <code>ok</code> começa verdadeira e vira <code>false</code> se <strong>qualquer</strong> campo falhar', 'Mostre <strong>todas</strong> as mensagens de uma vez, e não só a primeira']),
      preveja(`o que acontece se os dois campos estiverem vazios? Quantas mensagens aparecem?`)),
    P('🐞', 'ENCONTRE O ERRO: a página recarrega e a URL muda',
      code(`formulario.addEventListener("submit", function () {
  // esqueceu o evento.preventDefault()
  salvar();
});

// endereço depois de enviar:  index.html?nome=Ana&email=ana%40x.com`),
      lista(['<strong>Sintoma:</strong> a página pisca, os dados <strong>aparecem na URL</strong> e o que o JavaScript fez some', '<strong>Causa:</strong> sem <code>preventDefault()</code>, o navegador completa o envio padrão (método GET, com os campos na URL) e recarrega', '<strong>Correção:</strong> receber o <code>evento</code> e chamar <code>evento.preventDefault()</code> logo na primeira linha']),
      atencao(`isso também mostra por que <strong>nunca</strong> se envia senha em formulário GET: ela apareceria no endereço e no histórico do navegador.`)),
    P('🔧', 'MODIFIQUE: marcar o campo e dar foco',
      code(`function mostrarErro(campo, texto) {
  let input = document.getElementById(campo);
  document.getElementById("erro-" + campo).textContent = texto;

  if (texto !== "") {
    input.classList.add("invalido");     // borda vermelha pelo CSS
    input.focus();                        // leva o cursor até o campo
  } else {
    input.classList.remove("invalido");
  }
}`),
      code(`.invalido { border: 2px solid #f87171; }
.erro { color: #f87171; font-size: 13px; }`, 'CSS'),
      lista(['Com vários erros, dê foco só ao <strong>primeiro</strong> campo inválido', 'Valide em tempo real com o evento <code>input</code>, e não só no envio'])),
    P('🛡️', 'HTML required × validação em JavaScript',
      lista(['O HTML (<code>required</code>, <code>minlength</code>, <code>type="email"</code>) é <strong>uma primeira ajuda</strong> e já funciona sem JS', 'Mas o usuário pode <strong>remover</strong> esses atributos nas DevTools, e o navegador não é o único que envia dados', 'Por isso: o JavaScript valida para ajudar o usuário, e <strong>o servidor valida de novo</strong> em sistemas reais']),
      box('amarelo', `<strong>Resumo:</strong> HTML ajuda, JavaScript melhora a experiência, servidor garante a segurança.`),
      caderno(['required/minlength: ajuda, mas pode ser burlada', 'JS: melhora a experiência do usuário', 'Segurança de verdade: validar também no servidor'])),
    P('🎯', 'DESAFIO: validação em tempo real',
      lista(['Valide com o evento <code>input</code>: o campo fica <strong>verde</strong> quando válido e <strong>vermelho</strong> quando inválido', 'O botão Enviar fica <strong>desabilitado</strong> (<code>botao.disabled = true</code>) até tudo estar válido', 'Mostre "Cadastro enviado!" ao final']),
      box('verde', `<strong>Explique com suas palavras:</strong> por que o <code>required</code> do HTML não substitui a validação em JavaScript?`)),
  ], [
    Q('O que o formulário faz por padrão ao ser enviado?', 'Envia os dados e recarrega a página', 'Valida sozinho com JavaScript', 'Guarda no localStorage', 'Não faz nada'),
    Q('Para que serve evento.preventDefault() no submit?', 'Impedir o envio padrão e o recarregamento', 'Apagar o formulário', 'Enviar duas vezes', 'Fechar a página'),
    Q('A página recarrega e a URL ganha ?nome=Ana&email=... O que faltou?', 'evento.preventDefault()', 'Um laço', 'O localStorage', 'Um id'),
    Q('Para que serve a variável ok começando como true?', 'Virar false se qualquer campo for inválido', 'Contar os campos', 'Guardar o nome', 'Evitar erros de sintaxe'),
    Q('Por que mostrar todas as mensagens de erro de uma vez?', 'Para o usuário corrigir tudo de uma vez', 'Porque o JavaScript exige', 'Para o código ficar mais curto', 'Não é recomendável'),
    Q('Qual método leva o cursor até um campo?', 'campo.focus()', 'campo.select()', 'campo.go()', 'campo.cursor()'),
    Q('Por que usar uma classe CSS (invalido) para marcar o campo?', 'Para manter a aparência no CSS e só ligar a classe no JS', 'Porque style não existe', 'Para esconder o campo', 'Para guardar o valor'),
    Q('Por que required e minlength do HTML não bastam?', 'O usuário pode removê-los nas DevTools', 'O HTML não funciona em celulares', 'O navegador os ignora sempre', 'Eles só valem para números'),
    Q('Quem garante a segurança de verdade dos dados em um sistema real?', 'O servidor, que valida de novo', 'O CSS', 'O placeholder do campo', 'O navegador do usuário'),
    Q('Por que nunca enviar senha em um formulário GET?', 'Ela apareceria no endereço e no histórico do navegador', 'GET não aceita texto', 'Fica muito lento', 'O CSS bloqueia'),
  ]);

  // ══════════════════════════════════════════════════════
  // 88 — MINI-PROJETO: LISTA DE TAREFAS
  // ══════════════════════════════════════════════════════
  A(88, 'Mini-projeto: Lista de Tarefas', 'Juntar DOM, eventos, arrays, objetos e localStorage em um projeto pequeno e completo', '✅', [
    P('💡', 'ENTENDA: o projeto de treino antes da loja',
      `<p>Antes da loja, vamos montar uma <strong>lista de tarefas</strong>: é pequena, mas usa <strong>tudo que você aprendeu</strong>: formulário, eventos, array de objetos, <code>localStorage</code>, <code>filter</code> e redesenho da tela.</p>`,
      analogia(`o <strong>treino de pista</strong> antes da corrida: mesmos movimentos, circuito menor.`),
      code(`// uma tarefa:
{ id: 1700000001, texto: "Estudar JavaScript", concluida: false }

// o localStorage guarda a LISTA INTEIRA em uma chave só:
localStorage.setItem("tarefas", JSON.stringify(tarefas));`),
      lista(['Aqui usamos <strong>uma chave</strong> com o array inteiro (<code>"tarefas"</code>)', 'Na loja, usamos <strong>uma chave por produto</strong> (<code>p…</code>). Cada jeito tem vantagens, que você vai comparar no fim']),
      caderno(['Mini-projeto = pratica tudo em pequeno', 'Tarefa = objeto { id, texto, concluida }', 'Uma chave com o array inteiro'])),
    P('⌨️', 'DIGITE: ler e salvar',
      code(`function lerTarefas() {
  let texto = localStorage.getItem("tarefas");
  if (texto === null) return [];          // primeira visita: lista vazia
  return JSON.parse(texto);
}

function salvarTarefas(tarefas) {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}`),
      preveja(`o que aconteceria sem a linha <code>if (texto === null) return [];</code> na primeira visita? (lembre: <code>JSON.parse(null)</code> devolve <code>null</code>)`),
      box('verde', `<strong>Resposta:</strong> <code>lerTarefas()</code> devolveria <code>null</code>, e a próxima linha, <code>tarefas.push(...)</code>, daria <code>TypeError: Cannot read properties of null (reading 'push')</code>. O valor padrão <code>[]</code> evita o erro.`)),
    P('🖼️', 'DIGITE: desenhar e as ações',
      code(`function desenharTarefas() {
  let lista = document.getElementById("lista");
  lista.innerHTML = "";
  let tarefas = lerTarefas();

  for (let tarefa of tarefas) {
    let li = document.createElement("li");
    li.textContent = tarefa.texto;
    if (tarefa.concluida) li.classList.add("feito");

    li.addEventListener("click", function () { alternarTarefa(tarefa.id); });

    let botao = document.createElement("button");
    botao.textContent = "x";
    botao.addEventListener("click", function (e) {
      e.stopPropagation();                  // não conta como clique no li
      removerTarefa(tarefa.id);
    });
    li.appendChild(botao);
    lista.appendChild(li);
  }
  let pendentes = tarefas.filter((t) => !t.concluida).length;
  document.getElementById("contador").textContent = pendentes + " pendentes";
}

function adicionarTarefa(texto) {
  let tarefas = lerTarefas();
  tarefas.push({ id: Date.now(), texto: texto, concluida: false });
  salvarTarefas(tarefas);
  desenharTarefas();
}
function alternarTarefa(id) {
  let tarefas = lerTarefas();
  let t = tarefas.find((x) => x.id === id);
  if (t) t.concluida = !t.concluida;
  salvarTarefas(tarefas);
  desenharTarefas();
}
function removerTarefa(id) {
  let tarefas = lerTarefas().filter((t) => t.id !== id);
  salvarTarefas(tarefas);
  desenharTarefas();
}

desenharTarefas();    // ao abrir a página`),
      lista(['Todas as ações seguem o mesmo ciclo: <strong>ler → mudar → salvar → redesenhar</strong>', '<code>find</code> acha a tarefa; <code>filter</code> cria a lista sem a tarefa removida; <code>!t.concluida</code> inverte o valor', '<code>e.stopPropagation()</code> impede que o clique no botão "x" também dispare o clique do <code>li</code>']),
      caderno(['Ciclo: ler → mudar → salvar → redesenhar', 'Padrão idêntico ao atualizarGrid da loja'])),
    P('🐞', 'ENCONTRE O ERRO: clicar no "x" marca a tarefa também',
      lista(['<strong>Sintoma:</strong> ao remover uma tarefa, ela é marcada como concluída (ou o clique faz duas coisas)', '<strong>Causa:</strong> o clique no botão "sobe" para o elemento pai (<code>li</code>), que também tem um <code>click</code>. Isso se chama <strong>propagação de eventos</strong> (<em>bubbling</em>)', '<strong>Correção:</strong> <code>e.stopPropagation()</code> dentro do clique do botão']),
      atencao(`outro erro típico: usar o <strong>índice</strong> (<code>i</code>) como identificador. Depois de remover uma tarefa, os índices mudam. Por isso usamos um <code>id</code> único (<code>Date.now()</code>).`)),
    P('🔧', 'MODIFIQUE: filtros e limpeza',
      code(`let filtro = "todas";

function tarefasFiltradas() {
  let tarefas = lerTarefas();
  if (filtro === "pendentes")  return tarefas.filter((t) => !t.concluida);
  if (filtro === "concluidas") return tarefas.filter((t) => t.concluida);
  return tarefas;
}

function limparConcluidas() {
  salvarTarefas(lerTarefas().filter((t) => !t.concluida));
  desenharTarefas();
}`),
      lista(['Crie três botões (Todas, Pendentes, Concluídas) que mudam <code>filtro</code> e redesenham', 'Adapte <code>desenharTarefas</code> para usar <code>tarefasFiltradas()</code>', 'Recuse texto vazio ao adicionar (<code>trim()</code>)']),
      caderno(['Filtrar muda o que é desenhado, não o que é guardado'])),
    P('⚖️', 'COMPARE: uma chave ou uma por item?',
      lista(['📦 <strong>Uma chave com o array</strong> (lista de tarefas): simples de ler e filtrar; qualquer mudança regrava a lista toda. Bom para listas pequenas e coesas', '🗃️ <strong>Uma chave por item</strong> (loja, <code>p…</code> e <code>c…</code>): mudar um produto mexe só nele; permite separar famílias por prefixo. Exige percorrer as chaves para listar']),
      box('verde', `<strong>Explique com suas palavras:</strong> em qual situação você escolheria cada um? E por que a loja usa o prefixo <code>p</code> e <code>c</code>?`),
      box('azul', `<strong>Próximo passo:</strong> você já domina o ciclo ler → mudar → salvar → redesenhar. Na trilha da loja virtual, ele se repete com produtos, carrinho e quantidades.`)),
  ], [
    Q('O que uma tarefa guarda neste mini-projeto?', 'id, texto e concluida', 'Só o texto', 'O HTML do item', 'A posição na tela'),
    Q('Por que lerTarefas() devolve [] quando getItem retorna null?', 'Para a primeira visita funcionar sem erros', 'Porque null é inválido no CSS', 'Para apagar a lista', 'Porque o JSON exige'),
    Q('Sem esse tratamento, qual erro aparece ao fazer tarefas.push(...)?', "TypeError: Cannot read properties of null (reading 'push')", 'ReferenceError: tarefas is not defined', 'SyntaxError', 'RangeError'),
    Q('Qual é o ciclo de toda ação neste projeto?', 'Ler, mudar, salvar e redesenhar', 'Desenhar, apagar e fechar', 'Salvar, ler e ignorar', 'Mudar a tela e esquecer os dados'),
    Q('O que o filter((t) => t.id !== id) faz em removerTarefa?', 'Cria a lista sem a tarefa removida', 'Apaga o localStorage', 'Marca a tarefa como feita', 'Duplica a tarefa'),
    Q('Por que usar um id único em vez do índice?', 'Porque os índices mudam quando se remove um item', 'Porque o índice não existe no JS', 'Porque o id é mais curto', 'Porque o JSON não aceita índice'),
    Q('Clicar no "x" também marca a tarefa. Qual a causa?', 'A propagação do evento para o elemento pai', 'O localStorage', 'O CSS', 'O fetch'),
    Q('Qual é a correção para isso?', 'e.stopPropagation()', 'e.preventDefault()', 'return false no li', 'Apagar o li'),
    Q('Como contar as tarefas pendentes?', 'tarefas.filter((t) => !t.concluida).length', 'tarefas.length', 'tarefas.find(...)', 'tarefas.concluida'),
    Q('Qual é uma vantagem de uma chave por item, como na loja?', 'Mudar um item mexe só nele e permite separar famílias por prefixo', 'É sempre mais rápido para listar', 'Usa menos código', 'Evita o JSON'),
  ]);

  PRAT[73] = { tarefas: ['<strong>Nível 1.</strong> Pegue 3 endereços de sites que você usa e separe, no caderno, o protocolo, o domínio e o caminho de cada um.', '<strong>Nível 1.</strong> Abra o <strong>Network</strong> em um site, recarregue e anote 3 arquivos com o status <code>200</code>.', '<strong>Nível 2.</strong> Digite um endereço inexistente do mesmo site (ex.: <code>/pagina-que-nao-existe</code>) e anote o status que o Network mostra.', '<strong>Explique:</strong> com suas palavras, o caminho completo de uma página, do Enter até aparecer na tela.'],
    desafio: '<strong>Nível 3.</strong> Faça um diagrama (cliente, DNS, servidor) mostrando o que acontece quando você digita <code>https://exemplo.com/loja?categoria=papelaria</code>, indicando cada parte da URL.' };
  PRAT[74] = { tarefas: ['<strong>Nível 1.</strong> Instale (ou localize) o VS Code, crie a pasta <code>loja-virtual</code> e abra-a no editor.', '<strong>Nível 1.</strong> Crie o <code>index.html</code> com o esqueleto (digite <code>!</code> e <strong>Tab</strong>) e abra no navegador.', '<strong>Nível 2.</strong> Instale a extensão <strong>Live Server</strong> e abra a página por ela. Mude o título, salve e veja a página atualizar sozinha.', '<strong>Explique:</strong> com suas palavras, a diferença entre abrir o arquivo com duplo clique e abrir com o Live Server.'],
    desafio: '<strong>Nível 3.</strong> Crie a estrutura de pastas completa do projeto (HTML, CSS, JS e imagens), faça o primeiro teste e ensine um colega a configurar o mesmo ambiente.' };
  PRAT[75] = { tarefas: ['<strong>Nível 1.</strong> Crie 3 páginas (<code>index.html</code>, <code>sobre.html</code>, <code>contato.html</code>) ligadas por links entre si.', '<strong>Nível 1.</strong> Coloque uma imagem numa pasta <code>imagens/</code> e exiba na página com <code>alt</code>.', '<strong>Nível 2.</strong> Mova a imagem de pasta de propósito e leia o erro 404 no Network. Corrija o caminho.', '<strong>Explique:</strong> com suas palavras, a diferença entre caminho relativo e absoluto.'],
    desafio: '<strong>Nível 3.</strong> Monte um site de 3 páginas em subpastas (<code>paginas/</code>) com links que usam <code>../</code> corretamente e navegação que funciona de todas as páginas.' };
  PRAT[76] = { tarefas: ['<strong>Nível 1.</strong> Reescreva uma página usando <code>header</code>, <code>nav</code>, <code>main</code>, <code>section</code> e <code>footer</code> no lugar de <code>div</code>.', '<strong>Nível 1.</strong> Confira a ordem dos títulos (<code>h1</code>, <code>h2</code>...) e acrescente <code>alt</code> em todas as imagens.', '<strong>Nível 2.</strong> Navegue pela página <strong>só com o teclado</strong> (Tab, Enter) e anote o que ficou inacessível.', '<strong>Nível 2.</strong> Rode a auditoria de <strong>Acessibilidade</strong> do Lighthouse (DevTools) e corrija 2 problemas apontados.'],
    desafio: '<strong>Nível 3.</strong> Deixe o formulário da loja <strong>100% acessível</strong>: labels ligados, foco visível, contraste suficiente e mensagens de erro que um leitor de tela consiga ler.' };

  // ══════════════════════════════════════════════════════
  // 73 — URL E HTTP
  // ══════════════════════════════════════════════════════
  A(73, 'Web 2: URL, HTTP e o Caminho de uma Página', 'Ler um endereço por partes, entender pedido e resposta e interpretar os códigos 200, 404 e 500', '🔗', [
    P('💡', 'ENTENDA: o endereço tem partes',
      `<p>Um endereço da web, a <strong>URL</strong>, é como um endereço de correio: cada parte diz uma coisa.</p>`,
      code(`https://www.exemplo.com.br:443/loja/produtos?categoria=papelaria#preco
\\___/   \\_____________/ \\_/ \\_____________/ \\__________________/ \\____/
  1            2          3        4                  5             6`),
      lista(['1️⃣ <strong>Protocolo</strong> (<code>https</code>): a "língua" da conversa; o <code>s</code> indica conexão <strong>segura</strong> (o cadeado)', '2️⃣ <strong>Domínio</strong>: o nome do servidor', '3️⃣ <strong>Porta</strong> (geralmente escondida)', '4️⃣ <strong>Caminho</strong>: qual página ou recurso dentro do site', '5️⃣ <strong>Query string</strong> (depois do <code>?</code>): informações extras, no formato <code>nome=valor</code>', '6️⃣ <strong>Âncora</strong> (depois do <code>#</code>): um ponto dentro da página']),
      analogia(`é como um endereço: <strong>país</strong> (protocolo), <strong>cidade</strong> (domínio), <strong>rua</strong> (caminho), <strong>"apto 12"</strong> (âncora).`),
      caderno(['URL = protocolo + domínio + caminho + ?query + #âncora', 'https = conexão segura', '?nome=valor passa informações pela URL'])),
    P('📨', 'HTTP: o pedido e a resposta',
      `<p>O navegador e o servidor conversam em <strong>HTTP</strong>: o navegador faz uma <strong>requisição</strong> e o servidor devolve uma <strong>resposta</strong>.</p>`,
      lista(['<strong>Método</strong> <code>GET</code>: "me dê este recurso" (abrir uma página)', '<strong>Método</strong> <code>POST</code>: "receba estes dados" (enviar um formulário)', 'A resposta vem com um <strong>código de status</strong> e o conteúdo']),
      code(`GET /loja/produtos HTTP/1.1
Host: www.exemplo.com.br

HTTP/1.1 200 OK
Content-Type: text/html
...conteúdo da página...`, 'Pedido e resposta (simplificados)'),
      caderno(['GET = pedir · POST = enviar dados', 'Toda resposta tem um código de status'])),
    P('🚦', 'Os códigos de status',
      lista(['<strong>2xx</strong> sucesso: <code>200 OK</code>', '<strong>3xx</strong> redirecionamento: <code>301</code> (mudou de endereço)', '<strong>4xx</strong> erro de quem <em>pediu</em>: <code>404 Not Found</code> (não existe), <code>403 Forbidden</code> (sem permissão)', '<strong>5xx</strong> erro do <em>servidor</em>: <code>500 Internal Server Error</code>']),
      preveja(`você digita <code>loja.com/produtos-que-nao-existem</code>. Qual status você espera? É erro seu ou do servidor?`),
      box('verde', `<strong>Resposta:</strong> <code>404</code>: o servidor funcionou, mas aquele recurso não existe. É da família 4xx: o pedido é que estava errado.`)),
    P('🐞', 'ENCONTRE O ERRO: mensagens de endereço',
      lista(['<code>ERR_NAME_NOT_RESOLVED</code> (<em>"Não foi possível encontrar o endereço DNS do servidor"</em>): o <strong>domínio</strong> está escrito errado ou não existe. O DNS não achou o endereço', '<code>404 Not Found</code>: o servidor existe, mas o <strong>caminho</strong> está errado', '<code>ERR_CONNECTION_REFUSED</code>: o servidor existe, mas <strong>não está aceitando conexões</strong> (por exemplo, o seu servidor local não foi ligado)', '<code>ERR_CONNECTION_TIMED_OUT</code>: demorou demais para responder']),
      box('azul', `<strong>O DNS</strong> é a "agenda telefônica" da internet: transforma o nome (<code>exemplo.com.br</code>) no endereço numérico (IP) do servidor. Sem ele, só se acessaria por números.`),
      caderno(['Nome do site errado = ERR_NAME_NOT_RESOLVED', 'Caminho errado = 404', 'DNS transforma nome em endereço IP'])),
    P('🔧', 'MODIFIQUE: veja no Network',
      lista(['Abra qualquer site, aperte <strong>F12 → Network</strong> e recarregue', 'Clique no primeiro item (o documento): veja o <strong>método</strong>, o <strong>status</strong> e os <strong>cabeçalhos</strong>', 'Procure um arquivo de imagem e veja o <em>tamanho</em> e o <em>tempo</em> de carregamento', 'Digite na barra um endereço com <code>?busca=teste</code> no final e veja o que muda na URL']),
      atencao(`dados na <strong>query string</strong> ficam visíveis na barra de endereço e no histórico. Nunca coloque senhas nela.`)),
    P('🎯', 'DESAFIO: conte a história de uma página',
      lista(['Descreva, passo a passo, o que acontece entre digitar um endereço e a página aparecer: DNS, pedido HTTP, resposta, HTML, CSS e JavaScript', 'Use as palavras: <strong>cliente, servidor, requisição, resposta, status</strong>']),
      box('verde', `<strong>Explique com suas palavras</strong> a diferença entre um erro 404 e um erro 500. De quem é o "problema" em cada caso?`)),
  ], [
    Q('Qual parte da URL indica a conexão segura?', 'https', 'www', '.com.br', '#'),
    Q('Em https://loja.com/produtos?cat=papel, o que é /produtos?', 'O caminho', 'O protocolo', 'O domínio', 'A porta'),
    Q('O que é o ?cat=papel no final do endereço?', 'A query string, com informações extras', 'O protocolo', 'O servidor', 'A âncora'),
    Q('Qual método HTTP pede uma página?', 'GET', 'POST', 'SEND', 'OPEN'),
    Q('Qual método costuma enviar os dados de um formulário?', 'POST', 'GET', 'READ', 'FIND'),
    Q('O que significa o status 200?', 'Sucesso: a resposta chegou', 'Arquivo não encontrado', 'Erro do servidor', 'Sem permissão'),
    Q('O que significa o status 404?', 'O recurso pedido não foi encontrado', 'Sucesso', 'Erro dentro do servidor', 'Conexão recusada'),
    Q('Qual família de status indica erro do servidor?', '5xx', '2xx', '3xx', '4xx'),
    Q('ERR_NAME_NOT_RESOLVED indica:', 'O domínio está errado ou não existe', 'O caminho está errado', 'O servidor travou', 'A senha está errada'),
    Q('Para que serve o DNS?', 'Transformar o nome do site no endereço (IP) do servidor', 'Deixar o site mais bonito', 'Guardar a senha', 'Compactar arquivos'),
  ]);

  // ══════════════════════════════════════════════════════
  // 74 — AMBIENTE DE TRABALHO
  // ══════════════════════════════════════════════════════
  A(74, 'Web 3: Ambiente de Trabalho', 'Configurar o editor, criar a pasta do projeto, abrir a página no navegador e evitar os erros clássicos do primeiro dia', '🧰', [
    P('💡', 'ENTENDA: as ferramentas do programador',
      `<p>Para programar na web você precisa de três coisas:</p>`,
      lista(['📝 <strong>Editor de código</strong>: onde você escreve (recomendado: <strong>Visual Studio Code</strong>, gratuito)', '🌍 <strong>Navegador</strong>: onde você vê o resultado (Chrome ou Edge)', '📁 <strong>Uma pasta</strong> para o projeto, com os arquivos dentro']),
      analogia(`o editor é o <strong>caderno</strong>, o navegador é o <strong>leitor</strong> que lê o que você escreveu, e a pasta é a <strong>mochila</strong> que mantém tudo junto.`),
      caderno(['Editor (VS Code) + navegador + pasta do projeto'])),
    P('⌨️', 'DIGITE: o primeiro projeto',
      lista(['1️⃣ Crie uma pasta chamada <code>loja-virtual</code> (sem acentos e sem espaços)', '2️⃣ No VS Code: <strong>File → Open Folder</strong> e escolha a pasta', '3️⃣ Crie um arquivo <code>index.html</code>', '4️⃣ Digite <code>!</code> e aperte <strong>Tab</strong>: o VS Code monta o esqueleto do HTML sozinho (isso se chama <em>Emmet</em>)', '5️⃣ Escreva um <code>&lt;h1&gt;Olá!&lt;/h1&gt;</code> dentro do <code>body</code>, salve com <strong>Ctrl+S</strong> e dê duplo clique no arquivo para abrir no navegador']),
      code(`loja-virtual/
  index.html
  estilo.css
  script.js`, 'Estrutura inicial'),
      preveja(`você mudou o texto do <code>h1</code> no editor, mas não salvou. Ao recarregar o navegador, aparece o texto novo ou o antigo?`),
      box('verde', `<strong>Resposta:</strong> o antigo. O navegador lê o <strong>arquivo salvo</strong>. No VS Code, um <strong>ponto</strong> ao lado do nome da aba indica "alterações não salvas".`)),
    P('🔄', 'Live Server: a página que se atualiza sozinha',
      lista(['Instale a extensão <strong>Live Server</strong> (aba de extensões do VS Code)', 'Clique com o botão direito no <code>index.html</code> → <strong>Open with Live Server</strong>', 'A página abre em um endereço como <code>http://127.0.0.1:5500</code> e <strong>recarrega sozinha</strong> toda vez que você salva']),
      lista(['<code>file:///C:/...</code>: arquivo aberto <strong>direto do disco</strong> (duplo clique)', '<code>http://127.0.0.1:5500/...</code>: aberto por um <strong>servidor local</strong> (Live Server). Mais parecido com um site de verdade']),
      atencao(`algumas coisas, como <code>fetch</code> em arquivos locais, <strong>só funcionam</strong> através de um servidor (Live Server), e não com duplo clique.`),
      caderno(['Ctrl+S salva · o ponto na aba = não salvo', 'Live Server recarrega a página ao salvar', 'file:/// = direto do disco · http://127.0.0.1 = servidor local'])),
    P('🐞', 'ENCONTRE O ERRO: os erros do primeiro dia',
      lista(['<strong>"Mudei o código e nada mudou"</strong>: não salvou (ponto na aba), editou o arquivo de <em>outra pasta</em>, ou o navegador usou o <em>cache</em> (Ctrl+F5)', '<strong>Página mostra o código HTML escrito</strong>: o arquivo foi salvo como <code>index.html.txt</code>. O Windows costuma <strong>esconder as extensões</strong>. Ative "Extensões de nomes de arquivos" no Explorador', '<strong>Acentos viram "nÃ£o" (em vez de "não")</strong>: faltou <code>&lt;meta charset="UTF-8"&gt;</code> no <code>head</code> (ou o arquivo foi salvo em outra codificação)', '<strong>Imagem ou CSS não aparece</strong>: caminho ou nome errado. Veja o 404 no Network']),
      box('azul', `<strong>Dica:</strong> nomes de arquivos e pastas <strong>sem acentos, sem espaços e em minúsculas</strong> (<code>minha-loja</code>, não <code>Minha Loja Nova</code>) evitam a maioria dos problemas.`)),
    P('🔧', 'MODIFIQUE: ajustando o ambiente',
      lista(['Mude o tamanho da fonte do editor (<strong>Ctrl + roda do mouse</strong>)', 'Use <strong>Alt+Shift+F</strong> para formatar o código', 'Use <strong>Ctrl+/</strong> para comentar a linha', 'Abra o terminal integrado com <strong>Ctrl+`</strong>']),
      caderno(['Nomes: minúsculas, sem acento, sem espaço', 'Alt+Shift+F formata · Ctrl+/ comenta'])),
    P('🎯', 'DESAFIO: ensine a um colega',
      lista(['Ajude um colega a criar a pasta, o <code>index.html</code> e abrir com o Live Server', 'Provoque 2 dos erros do primeiro dia e peça que ele descubra a causa']),
      box('verde', `<strong>Explique com suas palavras:</strong> por que o navegador não mostra o que você acabou de digitar no editor, até você salvar?`)),
  ], [
    Q('Quais são as 3 coisas necessárias para começar a programar para a web?', 'Editor de código, navegador e uma pasta do projeto', 'Impressora, scanner e planilha', 'Apenas o navegador', 'Banco de dados e servidor'),
    Q('O que o atalho Ctrl+S faz no editor?', 'Salva o arquivo', 'Copia o código', 'Abre o navegador', 'Fecha o editor'),
    Q('Uma bolinha ao lado do nome da aba no VS Code indica:', 'Alterações não salvas', 'Erro de sintaxe', 'Arquivo bloqueado', 'Arquivo novo'),
    Q('O que faz o Live Server?', 'Abre a página em um servidor local e recarrega ao salvar', 'Publica o site na internet', 'Corrige os erros do código', 'Cria o CSS'),
    Q('O navegador mostra o código HTML escrito na tela. Causa provável?', 'O arquivo foi salvo como index.html.txt', 'Faltou o CSS', 'O servidor caiu', 'O JavaScript quebrou'),
    Q('Os acentos aparecem quebrados ("nÃ£o" no lugar de "não"). O que provavelmente falta?', '<meta charset="UTF-8"> no head', 'Um parágrafo', 'Um link', 'O atributo alt'),
    Q('Qual é um bom nome para a pasta do projeto?', 'loja-virtual', 'Loja Virtual Nova!', 'minha loja (final)', 'Loja_Virtual@2'),
    Q('Em um arquivo aberto com duplo clique, o endereço começa com:', 'file:///', 'https://', 'ftp://', 'www.'),
    Q('Como digitar rapidamente o esqueleto do HTML no VS Code?', 'Digitar ! e apertar Tab', 'Digitar html e apagar', 'Ctrl+Z', 'Digitar index'),
    Q('Alterei o CSS e nada mudou. Qual é uma causa comum?', 'Não salvei, ou o navegador usou o cache', 'O CSS parou de funcionar', 'O HTML foi apagado', 'O Windows bloqueou'),
  ]);

  // ══════════════════════════════════════════════════════
  // 75 — HTML: LINKS, IMAGENS E CAMINHOS
  // ══════════════════════════════════════════════════════
  A(75, 'HTML 2: Links, Imagens e Caminhos', 'Ligar páginas e carregar imagens sem erro: caminhos relativos, pastas e o famoso 404', '🖼️', [
    P('💡', 'ENTENDA: o caminho é um endereço dentro do computador',
      `<p>Quando você escreve <code>src="foto.jpg"</code>, o navegador precisa <strong>saber onde está</strong> a foto. O <strong>caminho</strong> descreve esse lugar, <em>a partir da página que o chama</em>.</p>`,
      analogia(`é como explicar a um amigo como chegar: <strong>"na mesma rua"</strong> (mesma pasta), <strong>"entre na pasta imagens"</strong> (subpasta) ou <strong>"suba uma pasta e entre em outra"</strong> (<code>../</code>).`),
      code(`projeto/
  index.html
  sobre.html
  imagens/
    logo.png
  paginas/
    contato.html`),
      caderno(['Caminho = como chegar ao arquivo, a partir da página atual'])),
    P('📍', 'Os tipos de caminho',
      code(`<!-- mesma pasta -->
<a href="sobre.html">Sobre</a>

<!-- dentro de uma subpasta -->
<img src="imagens/logo.png" alt="Logo da loja">

<!-- subir uma pasta com ../ (a partir de paginas/contato.html) -->
<a href="../index.html">Início</a>
<img src="../imagens/logo.png" alt="Logo">

<!-- endereço absoluto (outro site) -->
<a href="https://www.google.com">Google</a>`),
      lista(['<strong>Relativo</strong>: parte da página atual (<code>sobre.html</code>, <code>imagens/logo.png</code>, <code>../index.html</code>)', '<strong>Absoluto</strong>: endereço completo com <code>https://...</code>, usado para <strong>outros sites</strong>', '<code>../</code> significa "suba uma pasta"']),
      preveja(`dentro de <code>paginas/contato.html</code>, como você escreve o caminho para <code>imagens/logo.png</code>?`),
      box('verde', `<strong>Resposta:</strong> <code>../imagens/logo.png</code>. A página está dentro de <code>paginas/</code>, então é preciso subir uma pasta (<code>../</code>) para chegar em <code>imagens/</code>.`)),
    P('🔗', 'Links: mais do que ir para outra página',
      code(`<a href="https://www.google.com" target="_blank" rel="noopener">Abrir em nova aba</a>
<a href="#precos">Ir para a seção Preços</a>      <!-- dentro da mesma página -->
<h2 id="precos">Preços</h2>
<a href="mailto:contato@loja.com">Enviar e-mail</a>
<a href="tel:+5511999999999">Ligar</a>`),
      lista(['<code>target="_blank"</code> abre em <strong>nova aba</strong>; use junto com <code>rel="noopener"</code> por segurança', '<code>#precos</code> leva até o elemento com <code>id="precos"</code>', '<code>mailto:</code> abre o programa de e-mail']),
      atencao(`o texto do link precisa <strong>dizer para onde vai</strong>. "Clique aqui" não ajuda quem usa leitor de tela. Prefira "Ver o catálogo de produtos".`)),
    P('🖼️', 'Imagens',
      code(`<img src="imagens/caneta.jpg" alt="Caneta azul sobre um caderno" width="200">`),
      lista(['<code>src</code>: o caminho da imagem', '<code>alt</code>: <strong>descrição</strong> (obrigatória para acessibilidade; aparece se a imagem falhar)', '<code>width</code>: largura em pixels (a altura se ajusta)']),
      lista(['<strong>JPG</strong>: fotos', '<strong>PNG</strong>: imagens com transparência', '<strong>SVG</strong>: desenhos e ícones que não perdem qualidade', '<strong>WebP</strong>: leve e moderno']),
      caderno(['img precisa de src e alt', 'Fotos: JPG · transparência: PNG · ícones: SVG'])),
    P('🐞', 'ENCONTRE O ERRO: a imagem quebrada',
      code(`<img src="Imagens/Caneta.JPG" alt="Caneta">

<!-- arquivo real: imagens/caneta.jpg -->
<!-- Network:  Caneta.JPG  404 (Not Found) -->`),
      lista(['<strong>Sintoma:</strong> aparece o ícone de imagem quebrada e o texto do <code>alt</code>', '<strong>Causa 1:</strong> maiúsculas e minúsculas. Em muitos servidores, <code>Caneta.JPG</code> e <code>caneta.jpg</code> são arquivos <strong>diferentes</strong>', '<strong>Causa 2:</strong> pasta ou extensão errada', '<strong>Causa 3:</strong> <strong>espaços</strong> no nome (<code>minha foto.jpg</code>): evite, ou o navegador troca por <code>%20</code>']),
      box('verde', `<strong>Como investigar:</strong> F12 → Network → procure a linha vermelha com status 404 e compare o nome com o do arquivo na pasta.`),
      caderno(['404 em imagem = nome, pasta ou maiúsculas errados', 'Nomes minúsculos, sem espaço e sem acento'])),
    P('🎯', 'DESAFIO: site de 3 páginas',
      lista(['Crie <code>index.html</code>, <code>sobre.html</code> e <code>paginas/contato.html</code>', 'Todas com o <strong>mesmo menu</strong>, com links que funcionam de qualquer página', 'Coloque o logo em <code>imagens/</code> e exiba nas 3 páginas (com os caminhos certos para cada uma)']),
      box('verde', `<strong>Explique com suas palavras:</strong> por que o caminho do logo é diferente na página que está dentro de <code>paginas/</code>?`)),
  ], [
    Q('O que é um caminho relativo?', 'O endereço do arquivo a partir da página atual', 'O endereço completo com https', 'O nome do site', 'O tamanho do arquivo'),
    Q('O que significa ../ em um caminho?', 'Subir uma pasta', 'Entrar em uma pasta', 'Voltar à página anterior', 'Abrir uma nova aba'),
    Q('Dentro de paginas/contato.html, qual o caminho certo para imagens/logo.png?', '../imagens/logo.png', 'imagens/logo.png', 'logo.png', '/imagens/../logo.png'),
    Q('Para que serve target="_blank" em um link?', 'Abrir o link em uma nova aba', 'Apagar o link', 'Copiar o link', 'Colorir o link'),
    Q('O que o href="#precos" faz?', 'Leva até o elemento com id="precos" na mesma página', 'Abre o site precos.com', 'Cria um comentário', 'Envia um e-mail'),
    Q('Qual atributo da imagem descreve seu conteúdo em texto?', 'alt', 'src', 'width', 'href'),
    Q('Qual formato é indicado para imagens com fundo transparente?', 'PNG', 'JPG', 'TXT', 'DOC'),
    Q('A imagem aparece quebrada e o Network mostra 404. Qual causa é possível?', 'Nome com maiúsculas diferentes ou pasta errada', 'Falta de internet obrigatoriamente', 'O CSS está certo demais', 'O HTML está escrito em minúsculas'),
    Q('Por que evitar espaços nos nomes de arquivo?', 'O navegador troca por %20 e pode causar erros', 'Porque o Windows proíbe', 'Porque o CSS não lê', 'Por motivo estético apenas'),
    Q('Qual é um bom texto para um link?', 'Ver o catálogo de produtos', 'Clique aqui', 'Aqui', 'Link'),
  ]);

  // ══════════════════════════════════════════════════════
  // 76 — HTML SEMÂNTICO E ACESSIBILIDADE
  // ══════════════════════════════════════════════════════
  A(76, 'HTML 4: Semântica e Acessibilidade', 'Escrever HTML que faz sentido para todas as pessoas e para os leitores de tela, e conferir com o Lighthouse', '♿', [
    P('💡', 'ENTENDA: a página também é lida por quem não enxerga',
      `<p>Nem todo mundo usa a página com olhos e mouse. Quem tem baixa visão usa <strong>leitores de tela</strong>, que <em>leem em voz alta</em> a estrutura do HTML. Quem não usa mouse navega pelo <strong>teclado</strong>. <strong>Acessibilidade</strong> é fazer a página funcionar para todos.</p>`,
      analogia(`um prédio com <strong>rampa</strong> e <strong>placas em braile</strong> não atrapalha ninguém e ajuda muita gente: idosos, pais com carrinho, cadeirantes. O mesmo vale para a web.`),
      caderno(['Acessibilidade = a página funciona para todas as pessoas', 'Leitor de tela lê a estrutura do HTML'])),
    P('🏛️', 'Tags semânticas: dar nome às áreas',
      code(`<header>  cabeçalho: logo e título  </header>
<nav>     menu de navegação         </nav>
<main>    conteúdo principal (um por página) </main>
  <section>  uma parte do conteúdo   </section>
  <article>  conteúdo independente (um produto, uma notícia) </article>
<aside>   conteúdo complementar     </aside>
<footer>  rodapé                    </footer>`),
      `<p style="margin-top:12px">Um <code>div</code> não diz nada. Um <code>nav</code> diz <strong>"aqui está o menu"</strong>: o leitor de tela deixa o usuário <em>pular direto</em> para ele.</p>`,
      preveja(`você tem um menu feito com <code>&lt;div class="menu"&gt;</code>. O que você ganha trocando por <code>&lt;nav&gt;</code>?`)),
    P('🔢', 'Títulos em ordem e textos que fazem sentido',
      lista(['<strong>Um</strong> <code>h1</code> por página', 'Os títulos descem em ordem: <code>h1</code> → <code>h2</code> → <code>h3</code>, <strong>sem pular</strong> níveis', 'Não use <code>h3</code> só "porque a letra fica menor": o tamanho se muda pelo CSS']),
      code(`<h1>Loja Virtual</h1>
  <h2>Produtos</h2>
    <h3>Papelaria</h3>
    <h3>Eletrônicos</h3>
  <h2>Carrinho</h2>`),
      caderno(['Um h1 · títulos em ordem, sem pular níveis', 'Tamanho se muda no CSS, não escolhendo outro título'])),
    P('🏷️', 'Formulários e imagens acessíveis',
      code(`<!-- ruim: o leitor de tela não sabe o que é o campo -->
<input type="text" placeholder="Nome">

<!-- bom: label ligado ao input -->
<label for="nome">Nome</label>
<input type="text" id="nome">

<!-- botão só com ícone: precisa de um nome -->
<button aria-label="Excluir produto">🗑️</button>

<!-- imagem decorativa: alt vazio -->
<img src="enfeite.png" alt="">`),
      lista(['<code>label for</code> + <code>id</code>: ligam o texto ao campo (e aumentam a área de clique)', '<code>placeholder</code> <strong>não substitui</strong> o label: some ao digitar', '<code>aria-label</code> dá nome a elementos sem texto', '<code>&lt;html lang="pt-br"&gt;</code> diz ao leitor de tela o idioma da página']),
      atencao(`imagens que <strong>carregam informação</strong> (um gráfico, um produto) precisam de <code>alt</code> descritivo. Só as <strong>puramente decorativas</strong> usam <code>alt=""</code>.`)),
    P('🐞', 'ENCONTRE O ERRO: contraste e teclado',
      lista(['<strong>Contraste baixo:</strong> texto cinza-claro sobre fundo branco. O mínimo recomendado (WCAG) é <strong>4,5 para 1</strong> em texto comum. Ferramenta: DevTools mostra a razão de contraste ao inspecionar a cor', '<strong>Sem foco visível:</strong> quem navega com <strong>Tab</strong> precisa ver <em>onde está</em>. Nunca remova o contorno (<code>outline: none</code>) sem colocar um estilo de <code>:focus</code> no lugar', '<strong>Div clicável:</strong> <code>&lt;div onclick="..."&gt;</code> não recebe foco pelo teclado. Use <code>&lt;button&gt;</code>, que já vem acessível']),
      box('verde', `<strong>Teste rápido:</strong> aperte <strong>Tab</strong> várias vezes em sua página. Consegue alcançar tudo, na ordem certa, vendo onde está? Se não, há um problema de acessibilidade.`),
      caderno(['Contraste mínimo 4,5:1 para texto comum', 'Nunca remover o foco sem substituir', 'Use button para ações, não div clicável'])),
    P('🔧', 'MODIFIQUE: auditoria com o Lighthouse',
      lista(['F12 → aba <strong>Lighthouse</strong> → marque <em>Accessibility</em> → <strong>Analyze page load</strong>', 'Leia a lista de problemas (imagens sem <code>alt</code>, contraste, labels ausentes)', 'Corrija 2 problemas e rode de novo para ver a nota subir']),
      box('azul', `A nota do Lighthouse é um <strong>ponto de partida</strong>, não a garantia de acessibilidade. Testar com o teclado e, se possível, com um leitor de tela, mostra o que as ferramentas não pegam.`),
      box('verde', `<strong>Explique com suas palavras:</strong> por que usar <code>nav</code> e <code>main</code> ajuda mais do que usar só <code>div</code>? E por que o <code>placeholder</code> não substitui o <code>label</code>?`)),
  ], [
    Q('O que é acessibilidade na web?', 'Fazer a página funcionar para todas as pessoas, inclusive com deficiências', 'Deixar a página mais rápida', 'Usar muitas cores', 'Proteger a página de hackers'),
    Q('O que é um leitor de tela?', 'Um programa que lê em voz alta o conteúdo e a estrutura da página', 'Um tipo de monitor', 'Uma extensão do Word', 'Um navegador antigo'),
    Q('Qual tag representa o menu de navegação?', '<nav>', '<aside>', '<footer>', '<section>'),
    Q('Qual regra vale para o h1?', 'Um por página', 'Quantos quiser', 'Só no rodapé', 'Nunca usar'),
    Q('Qual é a ordem correta de títulos?', 'h1, h2, h3', 'h1, h4, h2', 'h3, h1, h2', 'h2, h2, h2 sempre'),
    Q('Para que serve label for="nome"?', 'Ligar o texto ao campo com id="nome"', 'Mudar a cor do campo', 'Validar o campo', 'Apagar o campo'),
    Q('Por que placeholder não substitui o label?', 'Porque some ao digitar e não é lido de forma confiável', 'Porque o placeholder não existe', 'Porque o label é mais bonito', 'Porque são iguais'),
    Q('Qual é a razão mínima de contraste recomendada para texto comum?', '4,5 para 1', '1 para 1', '2 para 1', '10 para 1'),
    Q('Por que usar <button> em vez de <div onclick>?', 'O button recebe foco e funciona com o teclado', 'O div não existe', 'O button é mais colorido', 'O div não aceita CSS'),
    Q('Quando usar alt=""?', 'Em imagens puramente decorativas', 'Em todas as imagens', 'Em gráficos importantes', 'Nunca'),
  ]);

  PRAT[77] = { tarefas: ['<strong>Nível 1.</strong> Defina no <code>body</code> uma fonte, um tamanho de <code>16px</code> e um <code>line-height</code> de 1.6. Compare com o padrão do navegador.', '<strong>Nível 1.</strong> Escreva o mesmo tamanho de título em <code>px</code>, <code>rem</code> e <code>%</code> e mude o tamanho da fonte do navegador. Anote o que reage.', '<strong>Nível 2.</strong> Escreva <code>font-size: 18;</code> (sem unidade) e descubra, nas DevTools, como o navegador trata a linha.', '<strong>Nível 2.</strong> Meça o contraste de um texto da sua página nas DevTools e corrija se estiver abaixo de 4,5:1.'],
    desafio: '<strong>Nível 3.</strong> Crie uma <strong>paleta</strong> da loja (fundo, texto, destaque, erro) com variáveis CSS (<code>--cor-destaque</code>) e use-a em toda a página, com contraste adequado.' };
  PRAT[78] = { tarefas: ['<strong>Nível 1.</strong> Crie um card com <code>padding</code>, <code>border</code> e <code>margin</code> e use as DevTools para ver as 4 camadas do box model.', '<strong>Nível 1.</strong> Crie uma caixa com <code>width: 100%</code> e <code>padding: 20px</code> e observe a barra de rolagem horizontal. Corrija com <code>box-sizing: border-box</code>.', '<strong>Nível 2.</strong> Centralize um bloco com <code>width</code> definido e <code>margin: 0 auto</code>.', '<strong>Explique:</strong> com suas palavras, a diferença entre <code>block</code>, <code>inline</code> e <code>inline-block</code>.'],
    desafio: '<strong>Nível 3.</strong> Monte um botão que seja <code>inline-block</code> com <code>padding</code>, borda arredondada e margem entre botões vizinhos, sem usar <code>&lt;br&gt;</code>.' };
  PRAT[79] = { tarefas: ['<strong>Nível 1.</strong> Monte um menu com <code>display: flex</code>, <code>gap</code> e <code>justify-content: space-between</code>.', '<strong>Nível 1.</strong> Centralize um card na tela (horizontal e vertical) com Flexbox.', '<strong>Nível 2.</strong> Troque para <code>flex-direction: column</code> e preveja o que muda em <code>justify-content</code> e <code>align-items</code>.', '<strong>Explique:</strong> com suas palavras, o que são eixo principal e eixo cruzado.'],
    desafio: '<strong>Nível 3.</strong> Faça o cabeçalho da loja: logo à esquerda, menu no centro e botão do carrinho à direita, e que quebre em linhas no celular (<code>flex-wrap</code>).' };
  PRAT[80] = { tarefas: ['<strong>Nível 1.</strong> Crie uma vitrine com <code>grid-template-columns: repeat(3, 1fr)</code> e <code>gap</code>.', '<strong>Nível 2.</strong> Troque por <code>repeat(auto-fill, minmax(200px, 1fr))</code> e redimensione a janela.', '<strong>Nível 2.</strong> Faça o primeiro card ocupar 2 colunas (<code>grid-column: span 2</code>).', '<strong>Explique:</strong> com suas palavras, a diferença entre Flexbox e Grid e quando usar cada um.'],
    desafio: '<strong>Nível 3.</strong> Monte o layout da página inteira com Grid: cabeçalho, menu lateral, conteúdo e rodapé, usando <code>grid-template-areas</code>.' };
  PRAT[81] = { tarefas: ['<strong>Nível 1.</strong> Crie um botão com <code>:hover</code>, <code>:focus</code> e <code>:active</code> com estilos diferentes e teste com mouse e com Tab.', '<strong>Nível 1.</strong> Coloque um selo "NOVO" no canto de um card com <code>position: absolute</code> dentro de um pai <code>position: relative</code>.', '<strong>Nível 2.</strong> Fixe o cabeçalho no topo com <code>position: sticky</code> e <code>top: 0</code>.', '<strong>Nível 2.</strong> Acrescente uma <code>transition</code> suave na cor do botão.'],
    desafio: '<strong>Nível 3.</strong> Faça um botão flutuante do carrinho (<code>position: fixed</code>) no canto da tela e que não cubra o conteúdo importante em celulares.' };
  PRAT[82] = { tarefas: ['<strong>Nível 1.</strong> Confira a meta <code>viewport</code> no seu HTML e abra o modo celular nas DevTools (Ctrl+Shift+M).', '<strong>Nível 1.</strong> Escreva uma media query <code>@media (max-width: 600px)</code> que faça o menu ficar em coluna.', '<strong>Nível 2.</strong> Faça a vitrine mudar de 3 colunas para 1 no celular com media query.', '<strong>Nível 2.</strong> Aplique <code>img { max-width: 100%; height: auto; }</code> e veja a imagem acompanhar a tela.'],
    desafio: '<strong>Nível 3.</strong> Deixe a loja inteira responsiva (celular, tablet e computador) e teste em 3 larguras. Anote o que mudou em cada uma.' };

  // ══════════════════════════════════════════════════════
  // 77 — CSS: UNIDADES, FONTES E CONTRASTE
  // ══════════════════════════════════════════════════════
  A(77, 'CSS 2: Unidades, Fontes e Contraste', 'Escolher tamanhos (px, rem, %), fontes e cores legíveis, e usar variáveis CSS', '🔤', [
    P('💡', 'ENTENDA: tamanho e legibilidade',
      `<p>Um site bonito que ninguém consegue <strong>ler</strong> não serve. Três decisões mudam muito a legibilidade: o <strong>tamanho</strong>, a <strong>fonte</strong> e o <strong>contraste</strong>.</p>`,
      analogia(`é como <strong>uma placa na rua</strong>: se a letra é pequena demais, a cor some no fundo ou a fonte é rebuscada, ninguém entende, por mais bonita que seja.`),
      caderno(['Legibilidade = tamanho + fonte + contraste'])),
    P('📏', 'As unidades de medida',
      code(`.caixa { width: 300px; }       /* px: fixo, pixels */
h1     { font-size: 2rem; }    /* rem: relativo ao tamanho da fonte do site */
p      { font-size: 1.1em; }   /* em: relativo ao tamanho do elemento pai */
.faixa { width: 50%; }         /* %: relativo ao pai */
.tela  { height: 100vh; }      /* vh/vw: % da altura/largura da janela */`),
      lista(['<strong>px</strong>: tamanho absoluto, bom para bordas e detalhes pequenos', '<strong>rem</strong>: acompanha a fonte escolhida pelo usuário (<strong>melhor para textos</strong>)', '<strong>%</strong>: se adapta ao tamanho do pai (ótimo para larguras)', '<strong>vh / vw</strong>: relativos ao tamanho da janela']),
      preveja(`se o navegador do usuário aumenta a fonte base de 16px para 20px, o que acontece com um título de <code>2rem</code>? E com um de <code>32px</code>?`),
      box('verde', `<strong>Resposta:</strong> o de <code>2rem</code> vai de 32px para <strong>40px</strong> (acompanha); o de <code>32px</code> <strong>continua 32px</strong>. Por isso <code>rem</code> respeita quem precisa de letra maior.`)),
    P('🔠', 'Fontes e texto',
      code(`body {
  font-family: "DM Sans", Arial, sans-serif;   /* fonte, alternativas, tipo genérico */
  font-size: 1rem;
  line-height: 1.6;                            /* espaço entre linhas */
  color: #e8eaf0;
}
h1 { font-weight: 700; text-align: center; }
a  { text-decoration: none; }`),
      lista(['Liste <strong>fontes alternativas</strong>: se a primeira não existir no computador, o navegador usa a próxima', '<code>line-height: 1.5</code> a <code>1.7</code> melhora muito a leitura de parágrafos', 'Para usar fontes do <strong>Google Fonts</strong>, copie o <code>&lt;link&gt;</code> deles para o <code>&lt;head&gt;</code> e use o nome da fonte no <code>font-family</code>']),
      caderno(['rem para textos · % para larguras · px para detalhes', 'font-family com alternativas', 'line-height 1.5 a 1.7 para parágrafos'])),
    P('🐞', 'ENCONTRE O ERRO: o CSS "não pega"',
      code(`p { font-size: 18; }         /* faltou a unidade */
p { colour: red; }           /* nome da propriedade errado */
p { color: #12345; }         /* cor com 5 dígitos */`),
      lista(['<strong>Sintoma:</strong> a regra parece não ter efeito, e <strong>não há erro no console</strong>', '<strong>Causa:</strong> o CSS <strong>ignora silenciosamente</strong> o que não entende: valor sem unidade (<code>18</code>), propriedade escrita errado (<code>colour</code>), cor inválida', '<strong>Como achar:</strong> F12 → Elements → painel Styles. A linha inválida aparece <strong>riscada</strong>, com um ícone de aviso']),
      atencao(`o CSS não "quebra" com erro: ele pula a linha e segue. Por isso, <strong>olhe o painel Styles</strong> sempre que uma regra não fizer efeito.`)),
    P('🎨', 'Cores e contraste',
      code(`color: red;                 /* nome */
color: #4f8ef7;             /* hexadecimal */
color: rgb(79, 142, 247);   /* vermelho, verde, azul */
color: rgba(0, 0, 0, .5);   /* com transparência */`),
      lista(['O <strong>contraste</strong> entre texto e fundo precisa ser de pelo menos <strong>4,5 para 1</strong> em texto comum', 'Cinza claro sobre branco e amarelo sobre branco costumam <strong>falhar</strong>', 'Nas DevTools, ao clicar na cor de um texto, o seletor mostra a razão de contraste']),
      code(`:root {
  --fundo: #0f1117;
  --texto: #e8eaf0;
  --destaque: #4f8ef7;
}
body   { background: var(--fundo); color: var(--texto); }
button { background: var(--destaque); }`, 'Variáveis CSS: mude em um lugar só'),
      caderno(['Contraste mínimo 4,5:1', 'Variáveis: --nome definida em :root e usada com var(--nome)'])),
    P('🎯', 'DESAFIO: a paleta da loja',
      lista(['Defina as variáveis de cor (fundo, texto, destaque, erro) e use-as em toda a página', 'Confira o contraste de cada combinação nas DevTools', 'Mude <strong>uma única variável</strong> e veja o site inteiro mudar']),
      box('verde', `<strong>Explique com suas palavras:</strong> por que <code>rem</code> é melhor que <code>px</code> para textos? E por que o CSS não mostra erro quando você escreve um valor inválido?`)),
  ], [
    Q('Qual unidade acompanha o tamanho da fonte configurado pelo usuário?', 'rem', 'px', 'cm', 'pt fixo'),
    Q('Com fonte base 20px, quanto vale 2rem?', '40px', '32px', '20px', '2px'),
    Q('O que significa width: 50%?', 'Metade da largura do elemento pai', 'Metade da tela sempre', '50 pixels', 'Metade da altura'),
    Q('Para que serve o line-height?', 'Controlar o espaço entre as linhas do texto', 'Mudar a cor da linha', 'Aumentar a borda', 'Alinhar o texto'),
    Q('Por que listar fontes alternativas no font-family?', 'Para usar a próxima se a primeira não existir', 'Para misturar fontes na mesma palavra', 'Porque o CSS exige 3 fontes', 'Para deixar mais rápido'),
    Q('font-size: 18; (sem unidade) faz o quê?', 'É ignorado pelo navegador, sem erro no console', 'Define 18px', 'Define 18 rem', 'Gera erro no console'),
    Q('Onde você descobre que uma regra CSS foi ignorada?', 'No painel Styles do Elements, onde aparece riscada', 'No Network', 'No Application', 'No terminal'),
    Q('Qual é o contraste mínimo recomendado para texto comum?', '4,5 para 1', '1,5 para 1', '2 para 1', '20 para 1'),
    Q('Como declarar e usar uma variável CSS?', '--cor definida em :root e usada com var(--cor)', '$cor = azul', 'let cor = azul', '@cor: azul'),
    Q('Qual é a vantagem das variáveis CSS?', 'Mudar a cor em um só lugar e atualizar o site todo', 'Deixar o CSS mais lento', 'Evitar usar cores', 'Substituir o HTML'),
  ]);

  // ══════════════════════════════════════════════════════
  // 78 — CSS: BOX MODEL E display
  // ══════════════════════════════════════════════════════
  A(78, 'CSS 3: Box Model e display', 'Entender o tamanho real das caixas, o box-sizing e a diferença entre block, inline e inline-block', '📦', [
    P('💡', 'ENTENDA: tudo é uma caixa',
      `<p>Para o navegador, <strong>todo elemento é uma caixa retangular</strong> com quatro camadas, de dentro para fora:</p>`,
      lista(['📄 <strong>content</strong>: o conteúdo', '🔲 <strong>padding</strong>: espaço <em>interno</em>', '🖼️ <strong>border</strong>: a borda', '↔️ <strong>margin</strong>: espaço <em>externo</em>, entre caixas']),
      analogia(`uma <strong>caixa de presente</strong>: o presente é o conteúdo, o papel de seda é o padding, a caixa é a borda e o espaço na prateleira até a próxima caixa é a margem.`),
      code(`.card {
  width: 300px;
  padding: 20px;
  border: 2px solid #ccc;
  margin: 16px;
}`),
      preveja(`qual é a largura <strong>total</strong> que o card ocupa na tela, contando padding e borda? (padrão do navegador: <code>content-box</code>)`),
      box('verde', `<strong>Resposta:</strong> 300 + 20 + 20 (padding) + 2 + 2 (borda) = <strong>344px</strong> (sem contar a margem). O <code>width</code> vale <em>só para o conteúdo</em>.`)),
    P('📐', 'box-sizing: border-box',
      code(`* {
  box-sizing: border-box;   /* o width passa a INCLUIR padding e borda */
}

.card {
  width: 300px;             /* agora o card ocupa exatamente 300px */
  padding: 20px;
  border: 2px solid #ccc;
}`),
      `<p style="margin-top:12px">Com <code>border-box</code>, o <code>width</code> é o tamanho <strong>total</strong> da caixa. Quase todo projeto moderno começa o CSS com essa regra: facilita muito fazer contas de layout.</p>`,
      caderno(['content-box (padrão): width = só o conteúdo', 'border-box: width = conteúdo + padding + borda', 'Comece o CSS com * { box-sizing: border-box; }'])),
    P('🐞', 'ENCONTRE O ERRO: a barra de rolagem horizontal',
      code(`.faixa {
  width: 100%;
  padding: 20px;
}`),
      lista(['<strong>Sintoma:</strong> a página ganha uma <strong>barra de rolagem horizontal</strong> e o conteúdo "vaza" para a direita', '<strong>Causa:</strong> com <code>content-box</code>, 100% + 40px de padding é <strong>mais largo</strong> que a tela', '<strong>Correção:</strong> <code>box-sizing: border-box</code>, para o padding ficar <em>dentro</em> dos 100%']),
      box('azul', `<strong>Como investigar:</strong> F12 → passe o mouse sobre o elemento no painel Elements: o navegador pinta de <span style="color:#6fa8dc">azul</span> o conteúdo, <span style="color:#93c47d">verde</span> o padding e <span style="color:#f6b26b">laranja</span> a margem.`)),
    P('🧱', 'display: block, inline e inline-block',
      lista(['<strong>block</strong>: ocupa a linha toda, aceita width, height e margens (<code>div</code>, <code>p</code>, <code>h1</code>)', '<strong>inline</strong>: acompanha o texto, <strong>não aceita</strong> width/height (<code>span</code>, <code>a</code>, <code>strong</code>)', '<strong>inline-block</strong>: fica na linha, <strong>mas</strong> aceita width, height e padding (bom para botões)', '<strong>none</strong>: some da página (e do espaço)']),
      code(`span { width: 200px; }                 /* NÃO funciona: span é inline */
span { display: inline-block; width: 200px; }   /* agora funciona */

.escondido { display: none; }          /* some completamente */`),
      atencao(`<code>display: none</code> remove o elemento do espaço da página; <code>visibility: hidden</code> o esconde, mas <strong>mantém o espaço</strong> ocupado.`)),
    P('🔧', 'MODIFIQUE: centralizar um bloco',
      code(`.conteudo {
  width: 900px;
  max-width: 100%;       /* nunca maior que a tela */
  margin: 0 auto;        /* 0 em cima/baixo, auto nas laterais: centraliza */
}`),
      lista(['<code>margin: 0 auto</code> só centraliza um <strong>bloco com largura definida</strong>', 'Teste sem o <code>width</code> e veja que não centraliza (o bloco já ocupa 100%)', 'Use <code>max-width</code> em vez de <code>width</code> fixo para o layout encolher no celular']),
      caderno(['margin: 0 auto centraliza blocos com largura definida', 'max-width evita vazar em telas pequenas'])),
    P('🎯', 'DESAFIO: o card da loja',
      lista(['Monte um card com padding, borda, cantos arredondados e margem usando <code>border-box</code>', 'Use as DevTools para conferir se o tamanho total é o esperado', 'Coloque 3 botões inline-block com espaço entre eles']),
      box('verde', `<strong>Explique com suas palavras:</strong> qual a diferença entre padding e margin? E por que o <code>box-sizing: border-box</code> facilita as contas de layout?`)),
  ], [
    Q('Quais são as camadas do box model, de dentro para fora?', 'content, padding, border, margin', 'margin, border, padding, content', 'border, content, margin, padding', 'content, margin, padding, border'),
    Q('O que é o padding?', 'O espaço interno entre o conteúdo e a borda', 'O espaço externo entre caixas', 'A borda', 'A cor de fundo'),
    Q('O que é a margin?', 'O espaço externo entre a caixa e as vizinhas', 'O espaço interno', 'A borda', 'O conteúdo'),
    Q('Com content-box, width: 300px, padding: 20px e borda de 2px, qual a largura total?', '344px', '300px', '320px', '324px'),
    Q('O que faz box-sizing: border-box?', 'O width passa a incluir padding e borda', 'Remove a borda', 'Esconde o padding', 'Aumenta a margem'),
    Q('width: 100% com padding: 20px gera barra horizontal porque:', 'Com content-box a caixa fica mais larga que a tela', 'O padding é inválido', '100% não existe', 'A borda some'),
    Q('Qual display aceita width e height e fica na mesma linha?', 'inline-block', 'inline', 'none', 'block'),
    Q('O width de um span (inline) funciona?', 'Não, a menos que mude o display', 'Sim, sempre', 'Só em porcentagem', 'Só em rem'),
    Q('Qual regra centraliza um bloco com largura definida?', 'margin: 0 auto', 'padding: auto', 'align: center', 'center: true'),
    Q('Qual é a diferença entre display: none e visibility: hidden?', 'none remove o espaço; hidden mantém o espaço ocupado', 'São idênticos', 'hidden remove o elemento', 'none apenas muda a cor'),
  ]);

  // ══════════════════════════════════════════════════════
  // 79 — FLEXBOX
  // ══════════════════════════════════════════════════════
  A(79, 'CSS 4: Flexbox', 'Alinhar e distribuir elementos em uma linha ou coluna, e centralizar de verdade', '↔️', [
    P('💡', 'ENTENDA: o pai manda nos filhos',
      `<p>O <strong>Flexbox</strong> organiza elementos em <strong>uma direção</strong> (linha ou coluna). A ideia principal: você liga o flex <strong>no pai</strong> e ele passa a controlar os <strong>filhos</strong>.</p>`,
      analogia(`um <strong>professor organizando a fila</strong>: os alunos (filhos) não decidem onde ficar. O professor (pai) manda: "em linha, com espaço igual entre vocês, todos alinhados pelo meio".`),
      code(`<div class="menu">
  <a href="#">Início</a>
  <a href="#">Loja</a>
  <a href="#">Carrinho</a>
</div>

.menu { display: flex; gap: 16px; }`),
      caderno(['display: flex vai no PAI', 'Os filhos diretos viram "itens flex"'])),
    P('🧭', 'Eixo principal e eixo cruzado',
      lista(['O <strong>eixo principal</strong> é a direção em que os itens se alinham (por padrão, <strong>horizontal</strong>)', 'O <strong>eixo cruzado</strong> é o perpendicular (vertical, no padrão)', '<code>justify-content</code> distribui no <strong>eixo principal</strong>', '<code>align-items</code> alinha no <strong>eixo cruzado</strong>']),
      code(`.menu {
  display: flex;
  justify-content: space-between;  /* distribui ao longo da linha */
  align-items: center;             /* centraliza na vertical */
  gap: 12px;
}`),
      lista(['<code>flex-start</code> / <code>center</code> / <code>flex-end</code>: no início, centro ou fim', '<code>space-between</code>: espaço <em>entre</em> os itens (primeiro e último nas pontas)', '<code>space-around</code> / <code>space-evenly</code>: espaço ao redor']),
      preveja(`com <code>flex-direction: column</code>, o eixo principal vira vertical. Então o <code>justify-content</code> passa a mexer na vertical ou na horizontal?`),
      box('verde', `<strong>Resposta:</strong> na <strong>vertical</strong>. O <code>justify-content</code> sempre age no <em>eixo principal</em>, e ele gira junto com o <code>flex-direction</code>.`)),
    P('🎯', 'Centralizar de verdade',
      code(`.tela {
  display: flex;
  justify-content: center;   /* centro na horizontal */
  align-items: center;       /* centro na vertical */
  min-height: 100vh;         /* a caixa precisa ter altura para centralizar nela */
}`),
      lista(['Esse é o jeito mais simples de centralizar um card no meio da tela', 'Sem <code>min-height</code>, o pai tem a altura do conteúdo e <strong>não há espaço sobrando</strong> para centralizar']),
      caderno(['Centralizar: flex + justify-content: center + align-items: center', 'Precisa de altura no pai (min-height: 100vh)'])),
    P('🐞', 'ENCONTRE O ERRO: o flex que não faz nada',
      code(`.card { display: flex; }          /* aplicado no filho! */

<div class="menu">
  <div class="card">...</div>
  <div class="card">...</div>
</div>`),
      lista(['<strong>Sintoma:</strong> os cards continuam um embaixo do outro', '<strong>Causa:</strong> o <code>display: flex</code> foi colocado <strong>nos filhos</strong>, e não no <code>.menu</code> (o pai). Ele ordena os filhos <em>dos cards</em>, não os cards entre si', '<strong>Correção:</strong> <code>.menu { display: flex; }</code>']),
      atencao(`outro erro comum: <code>align-items: center</code> parece não funcionar porque o pai <strong>não tem altura maior que o conteúdo</strong>. Dê um <code>height</code> ou <code>min-height</code> para ver o efeito.`)),
    P('🔧', 'MODIFIQUE: wrap e flex: 1',
      code(`.lista { display: flex; flex-wrap: wrap; gap: 16px; }   /* quebra em novas linhas */
.item  { flex: 1; min-width: 150px; }                    /* dividem o espaço igualmente */`),
      lista(['<code>flex-wrap: wrap</code>: permite que os itens passem para a linha de baixo quando faltar espaço', '<code>flex: 1</code>: cada item <strong>cresce</strong> para ocupar o espaço disponível, em partes iguais', 'Dê <code>flex: 2</code> a um item e veja que ele ocupa o dobro']),
      caderno(['flex-wrap: wrap quebra linhas', 'flex: 1 divide o espaço livre igualmente'])),
    P('🎯', 'DESAFIO: o cabeçalho da loja',
      lista(['Logo à esquerda, menu no centro e botão do carrinho à direita (<code>space-between</code>)', 'Todos alinhados na vertical pelo meio', 'No celular, os itens quebram em linhas (<code>flex-wrap</code>)']),
      box('verde', `<strong>Explique com suas palavras:</strong> o que são eixo principal e eixo cruzado, e por que <code>justify-content</code> muda de direção quando se usa <code>flex-direction: column</code>?`)),
  ], [
    Q('Onde se coloca display: flex para organizar os filhos?', 'No elemento pai', 'Em cada filho', 'No body somente', 'No arquivo HTML'),
    Q('O que faz justify-content?', 'Distribui os itens no eixo principal', 'Alinha no eixo cruzado', 'Muda a cor dos itens', 'Define a altura'),
    Q('O que faz align-items?', 'Alinha os itens no eixo cruzado', 'Distribui no eixo principal', 'Cria colunas', 'Muda a fonte'),
    Q('Qual valor coloca espaço ENTRE os itens, com o primeiro e o último nas pontas?', 'space-between', 'center', 'flex-start', 'stretch'),
    Q('Com flex-direction: column, o justify-content age na:', 'Vertical', 'Horizontal', 'Diagonal', 'Nenhuma direção'),
    Q('Para centralizar um card na tela (horizontal e vertical) usa-se:', 'display: flex; justify-content: center; align-items: center; e altura no pai', 'text-align: center apenas', 'margin: center', 'position: middle'),
    Q('O flex foi colocado no filho e os itens continuam empilhados. Causa?', 'O display: flex precisa ir no pai', 'O gap está faltando', 'O HTML está errado', 'O navegador não suporta'),
    Q('O align-items: center não centraliza na vertical. Causa provável?', 'O pai não tem altura além do conteúdo', 'O JavaScript está errado', 'A margem é negativa', 'O CSS não carregou'),
    Q('O que faz flex-wrap: wrap?', 'Permite os itens passarem para a próxima linha', 'Impede quebra', 'Inverte os itens', 'Aumenta o gap'),
    Q('O que faz flex: 1 em cada item?', 'Divide o espaço livre em partes iguais', 'Deixa o item com 1px', 'Esconde o item', 'Define a cor'),
  ]);

  // ══════════════════════════════════════════════════════
  // 80 — GRID
  // ══════════════════════════════════════════════════════
  A(80, 'CSS 5: Grid', 'Montar grades de linhas e colunas, como a vitrine de produtos, que se adaptam à tela', '🔳', [
    P('💡', 'ENTENDA: linhas e colunas ao mesmo tempo',
      `<p>O <strong>Grid</strong> organiza elementos em <strong>linhas e colunas</strong> ao mesmo tempo. É ideal para vitrines, galerias e o layout geral da página.</p>`,
      analogia(`uma <strong>tabela de horários da escola</strong>: você define as colunas (dias) e as linhas (aulas), e cada atividade ocupa uma célula.`),
      lista(['↔️ <strong>Flexbox</strong>: uma direção (linha <em>ou</em> coluna)', '🔳 <strong>Grid</strong>: duas direções (linhas <em>e</em> colunas)']),
      caderno(['Flexbox = uma dimensão · Grid = duas dimensões'])),
    P('⌨️', 'DIGITE: sua primeira grade',
      code(`.vitrine {
  display: grid;
  grid-template-columns: repeat(3, 1fr);   /* 3 colunas iguais */
  gap: 16px;
}`),
      lista(['<code>display: grid</code>: liga o grid <strong>no pai</strong>', '<code>1fr</code>: <em>uma fração</em> do espaço livre. Três <code>1fr</code> = três colunas iguais', '<code>repeat(3, 1fr)</code> é o mesmo que escrever <code>1fr 1fr 1fr</code>', '<code>gap</code>: espaço entre linhas e colunas']),
      code(`grid-template-columns: 200px 1fr;        /* uma fixa e uma que ocupa o resto */
grid-template-columns: 1fr 2fr;          /* a segunda é o dobro da primeira */`),
      preveja(`com <code>grid-template-columns: 1fr 2fr 1fr</code> e uma página de 800px sem gap, quantos pixels tem cada coluna?`),
      box('verde', `<strong>Resposta:</strong> 200px, 400px e 200px (total de 4 frações: 800 ÷ 4 = 200 por fração).`)),
    P('📱', 'A vitrine que se adapta sozinha',
      code(`.vitrine {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}`),
      lista(['<code>minmax(200px, 1fr)</code>: cada coluna tem <strong>no mínimo 200px</strong> e cresce para dividir o espaço', '<code>auto-fill</code>: cria <strong>quantas colunas couberem</strong>', 'Em tela grande: várias colunas. No celular: 1 ou 2. <strong>Sem media query!</strong>']),
      atencao(`<code>auto-fill</code> mantém colunas vazias se houver poucos itens; <code>auto-fit</code> as encolhe para os itens ocuparem todo o espaço. Teste os dois com 2 ou 3 cards.`),
      caderno(['1fr = uma fração do espaço livre', 'repeat(auto-fill, minmax(200px, 1fr)) = vitrine responsiva', 'auto-fit esticam os itens · auto-fill mantêm colunas vazias'])),
    P('🐞', 'ENCONTRE O ERRO: o grid que vira uma coluna só',
      code(`grid-template-columns: repeat(auto-fill, minmax(200px 1fr));
/*                                                 ^ faltou a vírgula */`),
      lista(['<strong>Sintoma:</strong> a vitrine fica em <strong>uma coluna só</strong>, ou o grid não funciona', '<strong>Causa:</strong> <code>minmax(200px 1fr)</code> está <strong>inválido</strong> (falta a vírgula). Lembre: o CSS <strong>ignora</strong> a linha inválida, sem avisar', '<strong>Como achar:</strong> F12 → Elements → Styles: a linha aparece riscada. Também há o botão <strong>grid</strong> ao lado do elemento para desenhar as linhas do grid na página']),
      box('verde', `<strong>Outros erros comuns:</strong> esquecer o <code>display: grid</code> no pai, ou colocar o <code>grid-template-columns</code> nos filhos.`)),
    P('🔧', 'MODIFIQUE: ocupar mais de uma célula e áreas nomeadas',
      code(`.destaque { grid-column: span 2; }       /* ocupa 2 colunas */

.pagina {
  display: grid;
  grid-template-columns: 220px 1fr;
  grid-template-areas:
    "topo   topo"
    "menu   conteudo"
    "rodape rodape";
  min-height: 100vh;
}
header { grid-area: topo; }
nav    { grid-area: menu; }
main   { grid-area: conteudo; }
footer { grid-area: rodape; }`),
      `<p style="margin-top:12px">Com <code>grid-template-areas</code>, você <strong>desenha o layout em texto</strong>: cada palavra é uma área, e os elementos escolhem sua área com <code>grid-area</code>.</p>`,
      caderno(['grid-column: span 2 ocupa duas colunas', 'grid-template-areas desenha o layout da página inteira'])),
    P('🎯', 'DESAFIO: a página da loja em grid',
      lista(['Monte cabeçalho, menu lateral, conteúdo e rodapé com <code>grid-template-areas</code>', 'A vitrine dentro do conteúdo deve usar <code>repeat(auto-fill, minmax(...))</code>', 'No celular, o menu lateral passa para cima do conteúdo (próxima aula: media queries)']),
      box('verde', `<strong>Explique com suas palavras:</strong> quando você escolhe Flexbox e quando escolhe Grid? Dê um exemplo da loja para cada um.`)),
  ], [
    Q('Qual é a principal diferença entre Flexbox e Grid?', 'Flexbox organiza em uma dimensão; Grid em duas', 'Não há diferença', 'Grid só funciona em tabelas', 'Flexbox só funciona para cores'),
    Q('Onde se coloca display: grid?', 'No elemento pai', 'Nos filhos', 'No HTML', 'No JavaScript'),
    Q('O que é 1fr?', 'Uma fração do espaço livre', 'Um pixel', 'Uma fonte', 'Uma cor'),
    Q('O que cria repeat(3, 1fr)?', 'Três colunas iguais', 'Três linhas', 'Uma coluna de 3px', 'Três margens'),
    Q('Com 1fr 2fr 1fr em 800px (sem gap), quanto mede a coluna do meio?', '400px', '200px', '800px', '267px'),
    Q('O que faz minmax(200px, 1fr)?', 'A coluna tem no mínimo 200px e cresce para dividir o espaço', 'A coluna tem exatamente 200px', 'A coluna tem no máximo 200px', 'Esconde a coluna'),
    Q('O que o auto-fill faz?', 'Cria quantas colunas couberem', 'Preenche com cor', 'Cria só uma coluna', 'Apaga os itens'),
    Q('A vitrine ficou em uma coluna só. Causa possível com minmax(200px 1fr)?', 'Faltou a vírgula, e o CSS ignorou a linha inválida', 'O 1fr não existe', 'O auto-fill é proibido', 'O HTML está sem body'),
    Q('Como fazer um item ocupar 2 colunas?', 'grid-column: span 2', 'width: 2', 'columns: 2', 'grid-size: 2'),
    Q('Qual propriedade coloca um elemento em uma área nomeada?', 'grid-area', 'grid-name', 'area-name', 'display-area'),
  ]);

  // ══════════════════════════════════════════════════════
  // 81 — POSICIONAMENTO, :hover E :focus
  // ══════════════════════════════════════════════════════
  A(81, 'CSS 6: Posicionamento e Estados', 'Posicionar elementos (relative, absolute, fixed, sticky) e criar efeitos com :hover, :focus e transition', '📌', [
    P('💡', 'ENTENDA: o fluxo normal e como sair dele',
      `<p>Por padrão, os elementos seguem o <strong>fluxo normal</strong>: um depois do outro, de cima para baixo. A propriedade <code>position</code> permite <strong>tirar</strong> um elemento desse fluxo ou prendê-lo a algum lugar.</p>`,
      lista(['<code>static</code>: o padrão, segue o fluxo', '<code>relative</code>: fica no lugar, mas serve de <strong>referência</strong> para filhos <code>absolute</code> (e pode ser deslocado)', '<code>absolute</code>: sai do fluxo e se posiciona em relação ao <strong>pai com position</strong>', '<code>fixed</code>: preso à <strong>janela</strong> (não sai do lugar ao rolar)', '<code>sticky</code>: rola junto até chegar a um ponto, e depois <strong>gruda</strong>']),
      analogia(`um <strong>quadro de avisos</strong>: o papel normal fica na fila (static); o post-it colado no canto de um cartaz (absolute no pai relative); o aviso fixado na parede que sempre vê (fixed).`),
      caderno(['relative = referência · absolute = posiciona no pai com position', 'fixed = preso à janela · sticky = gruda ao rolar'])),
    P('⌨️', 'DIGITE: o selo "NOVO" no card',
      code(`.card { position: relative; }       /* o pai vira a referência */

.selo {
  position: absolute;                /* sai do fluxo */
  top: 8px;
  right: 8px;
  background: #f87171;
  color: white;
  padding: 2px 8px;
  border-radius: 99px;
}`),
      code(`<div class="card">
  <span class="selo">NOVO</span>
  <h3>Caneta</h3>
</div>`),
      preveja(`se eu <strong>remover</strong> o <code>position: relative</code> do <code>.card</code>, onde o selo vai aparecer?`),
      box('verde', `<strong>Resposta:</strong> no canto superior direito da <strong>página inteira</strong> (ou do ancestral mais próximo que tenha <code>position</code>). Sem o pai com <code>position</code>, o <code>absolute</code> não tem referência.`)),
    P('🐞', 'ENCONTRE O ERRO: z-index que não funciona',
      code(`.menu  { z-index: 100; }          /* quero o menu por cima */
.faixa { position: relative; z-index: 1; }`),
      lista(['<strong>Sintoma:</strong> o menu continua <strong>atrás</strong> de outro elemento, mesmo com <code>z-index: 100</code>', '<strong>Causa:</strong> o <code>z-index</code> só funciona em elementos com <code>position</code> diferente de <code>static</code> (ou itens de flex/grid)', '<strong>Correção:</strong> <code>.menu { position: relative; z-index: 100; }</code>']),
      atencao(`evite números gigantes de <code>z-index</code> (999999). Mantenha poucos níveis organizados: 1 para o conteúdo sobreposto, 10 para menus, 100 para modais.`),
      caderno(['z-index só vale com position ≠ static', 'Maior z-index fica por cima'])),
    P('🖱️', 'Estados: :hover, :focus e :active',
      code(`button {
  background: #4f8ef7;
  transition: background .2s;        /* muda suavemente */
}
button:hover  { background: #3b6fd1; }        /* mouse em cima */
button:focus  { outline: 3px solid #fbbf24; } /* selecionado pelo teclado */
button:active { transform: scale(.97); }      /* enquanto é pressionado */`),
      lista(['<code>:hover</code>: o mouse está sobre o elemento', '<code>:focus</code>: o elemento está selecionado (pelo teclado ou clique)', '<code>:active</code>: no momento do clique', '<code>transition</code>: anima a mudança entre dois estados']),
      atencao(`quem usa <strong>teclado</strong> depende do <code>:focus</code> para ver onde está. Nunca escreva <code>outline: none</code> sem colocar um estilo de foco no lugar. Use <code>:focus-visible</code> para mostrar só no uso por teclado.`)),
    P('🔧', 'MODIFIQUE: cabeçalho fixo e botão flutuante',
      code(`header {
  position: sticky;      /* gruda no topo ao rolar */
  top: 0;
  background: #0f1117;
  z-index: 10;
}

.carrinho-flutuante {
  position: fixed;       /* sempre no canto da janela */
  right: 16px;
  bottom: 16px;
}`),
      lista(['Experimente trocar <code>sticky</code> por <code>fixed</code> e observe o conteúdo "subindo" por baixo do cabeçalho', 'Acrescente um <code>padding-top</code> no conteúdo para ele não ficar escondido atrás do cabeçalho fixo']),
      caderno(['sticky precisa de top (ou bottom) para funcionar', 'fixed tira do fluxo: reserve espaço para o conteúdo não ficar escondido'])),
    P('🎯', 'DESAFIO: cards com efeitos',
      lista(['O card sobe 4px no hover (<code>transform: translateY(-4px)</code>) com <code>transition</code>', 'O botão tem estilo de foco visível', 'O selo de "promoção" no canto do card usa <code>absolute</code> dentro de um pai <code>relative</code>']),
      box('verde', `<strong>Explique com suas palavras:</strong> por que o <code>absolute</code> precisa de um pai com <code>position</code>? E por que o <code>:focus</code> é importante?`)),
  ], [
    Q('Qual é o valor padrão de position?', 'static', 'relative', 'absolute', 'fixed'),
    Q('Para um filho absolute se posicionar dentro do pai, o pai precisa ter:', 'position: relative (ou outro diferente de static)', 'display: block', 'z-index', 'overflow: hidden'),
    Q('O que faz position: fixed?', 'Prende o elemento à janela, mesmo ao rolar', 'Deixa o elemento no fluxo', 'Esconde o elemento', 'Fixa o elemento no pai'),
    Q('O que faz position: sticky com top: 0?', 'Rola com a página e gruda no topo ao chegar lá', 'Fica sempre no topo, desde o início', 'Esconde o elemento', 'Move o elemento para baixo'),
    Q('Por que o z-index às vezes não tem efeito?', 'O elemento está com position: static', 'O número é muito grande', 'O CSS não permite', 'O z-index só vale para imagens'),
    Q('Qual pseudoclasse atua quando o mouse está sobre o elemento?', ':hover', ':focus', ':active', ':visited'),
    Q('Qual pseudoclasse mostra o elemento selecionado pelo teclado?', ':focus', ':hover', ':first', ':link'),
    Q('Para que serve a transition?', 'Animar suavemente a mudança entre estilos', 'Criar um novo elemento', 'Esconder um elemento', 'Trocar a fonte'),
    Q('Por que não remover o outline sem substituí-lo?', 'Quem navega pelo teclado perde a noção de onde está', 'Porque o outline é obrigatório', 'Porque quebra o JavaScript', 'Porque deixa o site lento'),
    Q('O que acontece com um absolute sem pai com position?', 'Posiciona em relação à página (ancestral mais próximo com position)', 'Desaparece', 'Vira fixed', 'Vira static'),
  ]);

  // ══════════════════════════════════════════════════════
  // 82 — RESPONSIVIDADE E MEDIA QUERIES
  // ══════════════════════════════════════════════════════
  A(82, 'CSS 7: Responsividade e Media Queries', 'Fazer a página funcionar bem no celular, no tablet e no computador', '📱', [
    P('💡', 'ENTENDA: uma página, muitas telas',
      `<p>Mais da metade dos acessos à web vem do <strong>celular</strong>. Uma página <strong>responsiva</strong> se adapta ao tamanho da tela, sem precisar de uma versão separada.</p>`,
      analogia(`a <strong>água</strong> que toma a forma do copo: o conteúdo é o mesmo, mas o layout se ajusta ao recipiente (a tela).`),
      lista(['📱 Celular: ~360 a 430px de largura', '📟 Tablet: ~768px', '💻 Computador: 1024px ou mais']),
      caderno(['Responsivo = o mesmo HTML se adapta a qualquer tela'])),
    P('🧷', 'O primeiro passo: a meta viewport',
      code(`<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>`),
      `<p style="margin-top:12px">Sem essa linha, o celular finge ter uma tela de <strong>980px</strong> e <strong>diminui a página inteira</strong> para caber: tudo fica minúsculo. A meta <code>viewport</code> diz: "use a largura real do aparelho".</p>`,
      atencao(`esquecer a <code>meta viewport</code> é o erro nº 1 de páginas que "ficam pequenininhas no celular". Confira sempre!`),
      caderno(['meta viewport é obrigatória para a responsividade funcionar'])),
    P('📐', 'Media queries: regras por tamanho de tela',
      code(`.vitrine { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }

@media (max-width: 800px) {
  .vitrine { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 500px) {
  .vitrine { grid-template-columns: 1fr; }
  .menu { flex-direction: column; }
}`),
      lista(['<code>@media (max-width: 800px)</code>: "<em>quando a tela tiver <strong>até</strong> 800px de largura</em>, aplique estas regras"', 'As regras de dentro <strong>substituem</strong> as de fora (se vierem depois e tiverem a mesma força)', 'Os pontos de quebra (<em>breakpoints</em>) comuns: 500px, 800px, 1024px']),
      preveja(`com a regra acima, quantas colunas tem a vitrine em uma tela de 450px? E em uma de 700px?`),
      box('verde', `<strong>Resposta:</strong> 450px → 1 coluna (vale a regra de 500px, que vem por último); 700px → 2 colunas (vale a de 800px).`)),
    P('🐞', 'ENCONTRE O ERRO: a media query que não funciona',
      code(`@media (max-width: 500px) {
  .menu { flex-direction: column; }
}

.menu { display: flex; flex-direction: row; }   /* escrito DEPOIS */`),
      lista(['<strong>Sintoma:</strong> no celular, o menu continua em linha', '<strong>Causa:</strong> a ordem importa. A regra <code>.menu</code> escrita <strong>depois</strong> da media query tem a mesma força e <strong>vence</strong>', '<strong>Correção:</strong> escrever a media query <strong>depois</strong> das regras que ela quer substituir (normalmente, no final do arquivo)']),
      box('azul', `<strong>Como testar:</strong> DevTools → ícone do celular (<strong>Ctrl+Shift+M</strong>) → escolha um aparelho ou arraste a largura. É o jeito mais rápido de testar, sem precisar de um celular.`),
      caderno(['Media query vem DEPOIS das regras que sobrescreve', 'Ctrl+Shift+M abre o modo celular nas DevTools'])),
    P('🧱', 'Mobile-first e medidas flexíveis',
      lista(['<strong>Mobile-first</strong>: escreva o CSS <strong>para o celular primeiro</strong> e use <code>min-width</code> para melhorar em telas maiores', 'Use <code>%</code>, <code>fr</code>, <code>rem</code> e <code>max-width</code> em vez de <code>px</code> fixos nas larguras', 'Imagens: <code>max-width: 100%; height: auto;</code> para nunca passarem da tela']),
      code(`/* base: celular (1 coluna) */
.vitrine { display: grid; grid-template-columns: 1fr; gap: 16px; }

@media (min-width: 600px)  { .vitrine { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1000px) { .vitrine { grid-template-columns: repeat(4, 1fr); } }

img { max-width: 100%; height: auto; }`),
      caderno(['Mobile-first: base para celular + min-width para telas maiores', 'img { max-width: 100%; height: auto; }'])),
    P('🎯', 'DESAFIO: a loja em três telas',
      lista(['Teste a loja em <strong>360px</strong>, <strong>768px</strong> e <strong>1280px</strong> nas DevTools', 'No celular: 1 coluna, menu empilhado, botões com bom tamanho para o dedo', 'Anote o que você mudou em cada tamanho']),
      box('verde', `<strong>Explique com suas palavras:</strong> por que a <code>meta viewport</code> é necessária? E por que a ordem das regras importa quando se usa media queries?`)),
  ], [
    Q('O que é uma página responsiva?', 'Uma página que se adapta a diferentes tamanhos de tela', 'Uma página que carrega mais rápido', 'Uma página sem CSS', 'Uma página só para celular'),
    Q('Qual meta tag faz o celular usar a largura real do aparelho?', 'viewport', 'charset', 'description', 'author'),
    Q('O que acontece sem a meta viewport?', 'O celular reduz a página inteira e tudo fica minúsculo', 'A página não abre', 'O CSS não funciona', 'O JavaScript para'),
    Q('O que significa @media (max-width: 800px)?', 'Aplica as regras quando a tela tem até 800px', 'Aplica quando a tela tem mais de 800px', 'Fixa a largura em 800px', 'Define a altura máxima'),
    Q('Qual atalho abre o modo celular nas DevTools?', 'Ctrl+Shift+M', 'Ctrl+P', 'Alt+F4', 'F5'),
    Q('Por que a media query pode não surtir efeito?', 'Uma regra igual escrita depois dela vence', 'Media queries não funcionam com flex', 'O navegador as ignora', 'Elas só funcionam em px'),
    Q('Onde se costuma escrever as media queries no arquivo?', 'Depois das regras que elas sobrescrevem', 'Antes de todas as regras', 'No HTML', 'Em outro idioma'),
    Q('O que é mobile-first?', 'Escrever o CSS para o celular primeiro e melhorar para telas maiores', 'Usar só tela de celular', 'Criar apps nativos', 'Escrever o JavaScript antes'),
    Q('Qual regra impede que uma imagem ultrapasse a tela?', 'img { max-width: 100%; height: auto; }', 'img { width: 1000px; }', 'img { overflow: hidden; }', 'img { display: none; }'),
    Q('Por que preferir %, fr e rem a px fixos nas larguras?', 'Porque se adaptam ao tamanho da tela e do usuário', 'Porque px não existe', 'Porque são mais bonitos', 'Porque px é proibido'),
  ]);

  // ══════════════════════════════════════════════════════
  // TESTES DE NIVELAMENTO (um por módulo): nota 7 ou mais = pode pular o módulo
  // ══════════════════════════════════════════════════════
  N(109, 1, 'Nivelamento: Módulo 1 · Fundamentos da Web', [
    Q('Em uma visita a um site, quem guarda os arquivos da página?', 'O servidor', 'O navegador', 'O monitor', 'O teclado'),
    Q('Qual linguagem define a ESTRUTURA da página?', 'HTML', 'CSS', 'JavaScript', 'SQL'),
    Q('Qual linguagem faz a página REAGIR ao clique?', 'JavaScript', 'HTML', 'CSS', 'Markdown'),
    Q('Na URL https://loja.com/produtos?cat=papel#preco, o que vem depois do ? ?', 'A query string', 'O protocolo', 'O domínio', 'O caminho'),
    Q('O que significa o s em https?', 'Conexão segura', 'Servidor', 'Site', 'Simples'),
    Q('O status 404 significa:', 'Recurso não encontrado', 'Sucesso', 'Erro do servidor', 'Redirecionamento'),
    Q('Qual família de status indica erro do servidor?', '5xx', '2xx', '3xx', '1xx'),
    Q('ERR_NAME_NOT_RESOLVED indica:', 'O domínio está errado ou não existe', 'O caminho está errado', 'A senha está errada', 'O arquivo é muito grande'),
    Q('Qual tecla abre as ferramentas do desenvolvedor?', 'F12', 'F1', 'F5', 'Esc'),
    Q('Qual é o nome do arquivo principal de um site?', 'index.html', 'principal.doc', 'site.exe', 'home.txt'),
    Q('Alterei o arquivo e nada mudou no navegador. Uma causa comum é:', 'Não salvei, ou o navegador usou o cache', 'O HTML foi apagado', 'O CSS parou de funcionar', 'O servidor caiu sempre'),
    Q('Qual é a melhor forma de aprender com um exercício de código?', 'Prever, digitar, comparar e explicar', 'Copiar e colar', 'Só ler a resposta', 'Pedir o código pronto'),
  ]);

  N(110, 2, 'Nivelamento: Módulo 2 · HTML', [
    Q('Qual tag cria o título mais importante da página?', '<h1>', '<title>', '<head>', '<header>'),
    Q('Qual lista é NUMERADA?', '<ol>', '<ul>', '<li>', '<dl>'),
    Q('Qual atributo diz para onde um link leva?', 'href', 'src', 'alt', 'id'),
    Q('Para que serve o alt de uma imagem?', 'Descrever a imagem em texto', 'Trocar a imagem', 'Aumentar a imagem', 'Dizer onde está o arquivo'),
    Q('Em paginas/contato.html, qual o caminho para imagens/logo.png?', '../imagens/logo.png', 'imagens/logo.png', 'logo.png', './logo.png'),
    Q('Qual é a diferença entre id e class?', 'id é único na página; class pode repetir', 'id pode repetir; class é único', 'São iguais', 'id é só para imagens'),
    Q('O que liga um label ao seu input?', 'O for do label igual ao id do input', 'A cor igual', 'A ordem no arquivo', 'Nada'),
    Q('Qual input esconde o que o usuário digita?', 'type="password"', 'type="text"', 'type="hidden"', 'type="number"'),
    Q('Qual tag representa o menu de navegação?', '<nav>', '<aside>', '<footer>', '<menu-item>'),
    Q('O que o <head> contém?', 'Informações que não aparecem na tela, como o título da aba', 'Todo o conteúdo visível', 'Apenas imagens', 'O rodapé'),
    Q('Quantos h1 uma página deve ter, em geral?', 'Um', 'Quantos quiser', 'Nenhum', 'Seis'),
    Q('A imagem aparece quebrada e o Network mostra 404. Qual causa é possível?', 'Nome, pasta ou maiúsculas diferentes do arquivo real', 'O HTML está em minúsculas', 'O CSS está certo', 'Falta o <title>'),
  ]);

  N(111, 3, 'Nivelamento: Módulo 3 · CSS', [
    Q('Como o CSS seleciona o elemento com id="titulo"?', '#titulo', '.titulo', 'titulo()', '*titulo'),
    Q('Qual propriedade cria espaço INTERNO entre conteúdo e borda?', 'padding', 'margin', 'gap', 'outline'),
    Q('Com content-box, width 300px, padding 20px e borda 2px, a largura total é:', '344px', '300px', '322px', '320px'),
    Q('O que faz box-sizing: border-box?', 'O width passa a incluir padding e borda', 'Remove a borda', 'Esconde o padding', 'Muda a margem'),
    Q('Qual regra alinha filhos lado a lado dentro de um pai?', 'display: flex', 'display: line', 'float: none', 'position: row'),
    Q('Com flex-direction: column, o justify-content age na:', 'Vertical', 'Horizontal', 'Diagonal', 'Em nada'),
    Q('O que cria grid-template-columns: repeat(3, 1fr)?', 'Três colunas iguais', 'Três linhas', 'Uma coluna de 3px', 'Três margens'),
    Q('Para um filho absolute se posicionar dentro do pai, o pai precisa de:', 'position: relative (ou outro diferente de static)', 'display: grid', 'z-index', 'float'),
    Q('Qual unidade acompanha o tamanho da fonte do usuário?', 'rem', 'px', 'mm', 'pt fixo'),
    Q('font-size: 18; (sem unidade) faz o quê?', 'É ignorado, sem erro no console', 'Define 18px', 'Define 18rem', 'Dá erro no console'),
    Q('Qual meta tag faz a página funcionar bem no celular?', 'viewport', 'charset', 'author', 'keywords'),
    Q('@media (max-width: 600px) aplica as regras quando a tela:', 'Tem até 600px de largura', 'Tem mais de 600px', 'Tem exatamente 600px', 'Está em modo escuro'),
  ]);

  N(112, 4, 'Nivelamento: Módulo 4 · JavaScript fundamental', [
    Q('Qual é o resultado de "5" + 3 ?', '"53"', '8', 'NaN', '"8"'),
    Q('Depois de let x = 4; x = x * 3; quanto vale x?', '12', '7', '43', '4'),
    Q('Em const a = 1; a = 2; o que acontece?', 'TypeError: Assignment to constant variable', 'a vale 2', 'a vale 3', 'Nada'),
    Q('Qual operador compara sem converter o tipo?', '===', '=', '=>', '=+'),
    Q('Com nota = 6, o que mostra if (nota >= 7) "A"; else if (nota >= 5) "B"; else "C"?', 'B', 'A', 'C', 'A e B'),
    Q('Quantas voltas dá for (let i = 0; i < 4; i++) ?', '4', '3', '5', 'Infinitas'),
    Q('O que causa um while que nunca termina?', 'A condição nunca deixa de ser verdadeira', 'Usar let', 'Usar console.log', 'Ter uma função dentro'),
    Q('Dado frutas = ["Maçã","Uva","Pera"], o que é frutas[frutas.length - 1]?', '"Pera"', '"Maçã"', 'undefined', '3'),
    Q('Qual método devolve um array novo só com os itens que passam num teste?', 'filter', 'map', 'find', 'push'),
    Q('Dado p = {nome:"Caneta", preco:3.5}, como ler o preço?', 'p.preco', 'p(preco)', 'p->preco', 'p[preco()]'),
    Q('Dado function f(a, b) { return a * b; }, quanto é f(3, 4)?', '12', '7', '34', 'undefined'),
    Q('Uma variável criada com let dentro de uma função pode ser usada fora dela?', 'Não: ReferenceError', 'Sim, sempre', 'Sim, se for número', 'Só com const'),
  ]);

  N(113, 5, 'Nivelamento: Módulo 5 · DOM e eventos', [
    Q('Qual comando acha o elemento com id="nome"?', 'document.getElementById("nome")', 'document.get("nome")', 'find("#nome")', 'document.nome()'),
    Q('Qual propriedade devolve o que foi digitado em um input?', '.value', '.text', '.digitado', '.content'),
    Q('Que tipo de dado vem de input.value, mesmo em type="number"?', 'Texto (string)', 'Número', 'Booleano', 'Objeto'),
    Q('Qual é a diferença entre textContent e innerHTML?', 'innerHTML interpreta HTML; textContent trata como texto', 'São iguais', 'textContent interpreta HTML', 'innerHTML só funciona em botões'),
    Q('Qual forma liga corretamente a função salvar ao clique?', 'botao.addEventListener("click", salvar)', 'botao.addEventListener("click", salvar())', 'botao.click = salvar()', 'botao.on(salvar)'),
    Q('addEventListener("click", salvar()) faz o quê?', 'Executa salvar na hora, e não no clique', 'Executa só no clique', 'Cria o botão', 'Apaga o evento'),
    Q('Qual método coloca um elemento DENTRO de outro?', 'appendChild', 'createElement', 'remove', 'querySelector'),
    Q('Por que a lista aparece duplicada a cada chamada de desenhar?', 'A função não limpou o conteúdo antes de desenhar', 'O for está errado', 'O navegador duplica', 'O array foi copiado'),
    Q('Para que serve evento.preventDefault() no submit?', 'Impedir o envio padrão e o recarregamento', 'Apagar o formulário', 'Enviar duas vezes', 'Fechar a página'),
    Q('TypeError: Cannot read properties of null (reading \'addEventListener\') indica:', 'O elemento não foi achado (id diferente)', 'Faltou um ponto e vírgula', 'A internet caiu', 'O CSS está errado'),
    Q('Qual evento dispara a cada letra digitada?', 'input', 'submit', 'load', 'blur'),
    Q('O que o classList.toggle("ativo") faz?', 'Liga a classe se estava desligada e desliga se estava ligada', 'Apaga a classe do CSS', 'Cria o elemento', 'Troca o id'),
  ]);

  N(114, 6, 'Nivelamento: Módulo 6 · Depuração', [
    Q('ReferenceError: preco is not defined significa:', 'A variável preco não existe', 'Faltou um parêntese', 'O elemento não foi achado', 'A internet caiu'),
    Q('SyntaxError normalmente indica:', 'Faltou ou sobrou um sinal, como parêntese ou chave', 'Variável com nome errado', 'Elemento não encontrado', 'Falta de internet'),
    Q('Qual aba mostra os arquivos pedidos e o status de cada um?', 'Network', 'Elements', 'Console', 'Application'),
    Q('Qual aba permite ver e editar o localStorage?', 'Application', 'Network', 'Console', 'Elements'),
    Q('Um valor aparece como [object Object] no localStorage. Causa provável?', 'Faltou JSON.stringify ao guardar', 'Faltou JSON.parse ao guardar', 'O navegador está antigo', 'A chave é curta'),
    Q('O código roda sem erro, mas o resultado está errado. O que fazer primeiro?', 'Colocar console.log para ver os valores', 'Apagar tudo', 'Copiar solução da internet', 'Trocar de navegador'),
    Q('Alterei o CSS e nada mudou. Atalho para recarregar sem cache?', 'Ctrl+F5', 'Ctrl+S', 'Alt+F4', 'F1'),
    Q('Qual tecla executa a linha atual e vai para a próxima, com o código pausado?', 'F10', 'F8', 'F5', 'F12'),
    Q('Para que serve um breakpoint?', 'Pausar a execução em uma linha para inspecionar as variáveis', 'Apagar o código', 'Mostrar um erro', 'Salvar o arquivo'),
    Q('["10","20"] somado com + em um laço dá "01020". Por quê?', 'Os valores são texto e o + junta', 'O array está quebrado', 'O for está errado', 'O zero não pode somar'),
    Q('Qual é o primeiro passo ao investigar um bug?', 'Ler o sintoma e a mensagem de erro e levantar uma hipótese', 'Apagar o projeto', 'Mudar vários trechos de uma vez', 'Pedir o código pronto'),
    Q('Para pedir ajuda do jeito certo, mostre:', 'A mensagem de erro, a linha e o que já tentou', 'Só "não funciona"', 'Um print sem contexto', 'Nada, o professor adivinha'),
  ]);

  N(115, 7, 'Nivelamento: Módulo 7 · Armazenamento', [
    Q('Qual comando GUARDA um dado no localStorage?', 'localStorage.setItem(chave, valor)', 'localStorage.getItem(chave)', 'localStorage.write(chave)', 'localStorage.put(chave)'),
    Q('O que getItem devolve quando a chave não existe?', 'null', 'undefined', '0', 'Texto vazio'),
    Q('Que tipo de dado o localStorage guarda sempre?', 'Texto', 'Objetos', 'Funções', 'Imagens'),
    Q('Qual comando transforma um objeto em texto JSON?', 'JSON.stringify(obj)', 'JSON.parse(obj)', 'obj.toText()', 'Text(obj)'),
    Q('Depois de ler um produto com getItem, para usar produto.nome faz-se:', 'JSON.parse', 'JSON.stringify', 'Nada', 'removeItem'),
    Q('Qual comando devolve o NOME da chave na posição i?', 'localStorage.key(i)', 'localStorage.getItem(i)', 'localStorage.name(i)', 'localStorage.at(i)'),
    Q('O que faz "c" + id.slice(1) com id = "p123"?', 'Gera "c123"', 'Gera "cp123"', 'Gera "p123c"', 'Gera "123"'),
    Q('Qual é a diferença entre sessionStorage e localStorage?', 'sessionStorage some ao fechar a aba', 'localStorage some ao fechar a aba', 'Não há diferença', 'sessionStorage guarda mais dados'),
    Q('Por que nunca guardar senhas no navegador?', 'Qualquer pessoa com acesso ao navegador pode lê-las', 'Elas não cabem', 'O JavaScript proíbe', 'Elas somem sozinhas'),
    Q('O que é XSS?', 'Texto digitado que vira código executado na página', 'Um tipo de CSS', 'Um erro de rede', 'Uma forma de guardar dados'),
    Q('Qual é a forma mais segura de mostrar o nome de um produto na página?', 'createElement e textContent', 'innerHTML com o nome concatenado', 'document.write', 'eval'),
    Q('Estourar o limite do armazenamento (cerca de 5 MB) causa:', 'Um erro de quota ao usar setItem', 'Nada', 'Apagar tudo sozinho', 'Mudar o tipo dos dados'),
  ]);

  N(116, 8, 'Nivelamento: Módulo 8 · Projeto Loja Virtual (Sistema PRW)', [
    Q('No Sistema PRW, como um produto é guardado no localStorage?', 'Como texto JSON de um array [nome, valor, descrição], em uma chave "p" + UUID', 'Como número, na chave "produto"', 'Como objeto, sem converter', 'Como imagem'),
    Q('Qual é a chave do carrinho do produto "p3f2a-91"?', '"c3f2a-91"', '"p3f2a-91"', '"cp3f2a-91"', '"carrinho"'),
    Q('Por que o id do produto começa com a letra p?', 'Um id de HTML não pode começar com número, e o UUID pode', 'Porque o localStorage exige', 'Para a chave ficar mais curta', 'Porque p significa preço'),
    Q('ler() devolve ["Caneta","3.5","Azul"]. Qual é o tipo de ler()[1]?', 'string (texto)', 'number', 'boolean', 'object'),
    Q('Em atualizarGrid, o filtro if (chave[0] != "p") continue; serve para:', 'Pular as chaves que não são produtos', 'Apagar os produtos', 'Parar o laço', 'Ordenar os produtos'),
    Q('A tabela mostra o carrinho misturado aos produtos. Qual é a causa provável?', 'Faltou o filtro pela letra p', 'Faltou o Bootstrap', 'O id está duplicado', 'O JSON está inválido'),
    Q('O que faz controle("salvar", "p")?', 'Cadastra um produto novo (o id "p" sozinho significa "produto novo")', 'Altera um produto existente', 'Exclui um produto', 'Lista os produtos'),
    Q('Ao excluir um produto, o que mais precisa ser apagado?', 'A cópia no carrinho: "c" + id.slice(1)', 'O CSS', 'O HTML da página', 'Nada mais'),
    Q('O total do carrinho mostra algo como "03.51810". Qual é a causa provável?', 'Faltou Number() ao somar valores que são texto', 'Faltou o Bootstrap', 'Faltou o filtro p', 'O localStorage está cheio'),
    Q('O botão tem onclick="controle(\'excluir\',${dados.id})" (id sem aspas). O que acontece ao clicar?', 'ReferenceError: o id é lido como uma variável', 'Exclui normalmente', 'Nada acontece', 'Aparece um alerta'),
    Q('Um produto com nome <b>Teste</b> aparece em negrito na tabela. O que isso revela?', 'Uma falha de segurança (XSS): o insertAdjacentHTML interpreta o texto como HTML', 'O Bootstrap deixa em negrito', 'O JSON converte o texto', 'Nada de errado'),
    Q('No Bootstrap, col-3 vazia + col-6 com o formulário em uma row:', 'Centraliza o formulário (3 + 6 de 12 colunas)', 'Esconde o formulário', 'Ocupa a largura toda', 'Gera um erro'),
  ]);

  N(117, 9, 'Nivelamento: Módulo 9 · JavaScript assíncrono', [
    Q('Qual a ordem das mensagens: log("A"); setTimeout(() => log("B"), 0); log("C");', 'A, C, B', 'A, B, C', 'B, A, C', 'C, B, A'),
    Q('Em setTimeout(f, 2000), o que é 2000?', 'O tempo de espera em milissegundos', 'O tempo em segundos', 'O número de repetições', 'A linha do código'),
    Q('O que o setInterval faz?', 'Repete a função a cada intervalo', 'Executa uma única vez', 'Espera um clique', 'Apaga a função'),
    Q('O que o fetch(url) devolve?', 'Uma Promise', 'Os dados prontos', 'Um número', 'Um erro obrigatório'),
    Q('let d = fetch(url); console.log(d.name) mostra:', 'undefined, porque d é uma Promise', 'O nome', 'Um erro de sintaxe', 'null'),
    Q('Para que serve resposta.json()?', 'Converter a resposta em um objeto', 'Enviar a resposta', 'Apagar a resposta', 'Guardar no localStorage'),
    Q('O que o await faz dentro de uma função async?', 'Espera a Promise terminar e entrega o resultado', 'Cancela o pedido', 'Repete o pedido', 'Transforma em texto'),
    Q('Onde o await pode ser usado (em um script comum)?', 'Dentro de funções declaradas com async', 'Em qualquer lugar', 'Só no CSS', 'Somente no HTML'),
    Q('Quando o bloco catch é executado?', 'Quando acontece um erro dentro do try', 'Sempre', 'Nunca', 'Quando o try funciona'),
    Q('Por que um endereço que devolve 404 não cai no catch sozinho?', 'O fetch só rejeita se não conseguir falar com o servidor', 'O catch só funciona com números', '404 não é erro', 'O await ignora respostas'),
    Q('Como detectar uma resposta 404 ou 500?', 'Conferindo resposta.ok', 'Conferindo resposta.json', 'Usando setTimeout', 'Apagando o try'),
    Q('Por que usar textContent ao mostrar dados vindos de uma API?', 'Dados externos podem conter código malicioso', 'É mais rápido que o fetch', 'innerHTML não existe', 'textContent aceita HTML'),
  ]);

  N(118, 10, 'Nivelamento: Módulo 10 · Profissionalismo', [
    Q('Qual é a função do Git?', 'Guardar o histórico do projeto e permitir voltar a versões antigas', 'Hospedar o site', 'Executar o JavaScript', 'Corrigir erros sozinho'),
    Q('Qual é a diferença entre Git e GitHub?', 'Git é o programa local; GitHub é o site com a cópia online', 'São o mesmo programa', 'GitHub funciona sem Git', 'Git é um editor'),
    Q('O que é um commit?', 'Um ponto de salvamento com uma mensagem', 'Uma cópia no GitHub', 'Um erro', 'Um tipo de arquivo'),
    Q('Qual comando cria um repositório na pasta?', 'git init', 'git start', 'git new', 'git create'),
    Q('O que faz git add . ?', 'Separa as mudanças para o próximo commit', 'Envia ao GitHub', 'Cria o repositório', 'Apaga o histórico'),
    Q('Qual é a melhor mensagem de commit?', 'Adiciona validação do formulário de produtos', 'arrumei', 'asdf', 'agora vai'),
    Q('Author identity unknown *** Please tell me who you are. Qual é a solução?', 'Configurar user.name e user.email com git config', 'Reinstalar o Windows', 'Apagar a pasta .git', 'Fazer git push'),
    Q('Para que serve o .gitignore?', 'Listar arquivos que não devem ir para o repositório', 'Apagar arquivos', 'Acelerar o Git', 'Criar commits'),
    Q('O que NUNCA deve ser publicado em um repositório?', 'Senhas, chaves e o arquivo .env', 'O README', 'O index.html', 'O CSS'),
    Q('O que o GitHub Pages publica?', 'Páginas estáticas (HTML, CSS e JavaScript)', 'Servidores Node com banco', 'Bancos de dados', 'E-mails'),
    Q('Por que Foto.PNG pode funcionar no seu PC e falhar no GitHub Pages?', 'O GitHub diferencia maiúsculas e minúsculas nos nomes', 'O GitHub não aceita imagens', 'O Windows apaga a imagem', 'Imagens não funcionam em HTML'),
    Q('Como atualizar um site já publicado no GitHub Pages?', 'Fazer commit e push das mudanças', 'Apagar o repositório e criar outro', 'Enviar um e-mail', 'Reinstalar o Git'),
  ]);

  // ══════════════════════════════════════════════════════
  // REVISÃO (aulas 56 a 63): quizzes com leitura de código, previsão e bugs reais,
  // alternativas erradas que representam erros de aluno, e passo "Encontre o erro" onde faltava
  // ══════════════════════════════════════════════════════
  REV[56] = {
    extra: [P('🐞', 'ENCONTRE O ERRO: o script que não acha o botão',
      code(`<head>
  <script src="script.js"></script>   <!-- carregado ANTES do botão existir -->
</head>
<body>
  <button id="btn">Clique</button>
</body>

// script.js
document.getElementById("btn").addEventListener("click", function () { });
// Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')`),
      lista(['<strong>Sintoma:</strong> o botão aparece, mas não reage, e o console mostra o erro acima', '<strong>Causa:</strong> o navegador lê o HTML <strong>de cima para baixo</strong>. Quando o script roda no <code>head</code>, o botão ainda não existe, então <code>getElementById</code> devolve <code>null</code>', '<strong>Correção:</strong> colocar o <code>&lt;script&gt;</code> <strong>no fim do body</strong> (ou usar o atributo <code>defer</code>)']),
      box('verde', `<strong>Como investigar:</strong> leia o erro: <em>"Cannot read properties of null"</em> quer dizer que algo que você esperava existir é <code>null</code>. Pergunte: <em>"o elemento já existia quando o script rodou?"</em>`))],
    perguntas: [
      Q('Você digita um endereço e aperta Enter. O que o navegador faz primeiro?', 'Envia uma requisição ao servidor pedindo os arquivos da página', 'Procura o site dentro do seu computador', 'Executa o JavaScript do servidor na sua tela', 'Baixa o site inteiro antes de mostrar qualquer coisa'),
      Q('Uma página abre com o texto certo, mas sem cores e sem layout. Qual das três linguagens provavelmente não foi aplicada?', 'CSS', 'HTML', 'JavaScript', 'Nenhuma: o HTML já resolve cores sozinho'),
      Q('Um botão aparece na tela, mas nada acontece ao clicar. Onde está o problema mais provável?', 'No JavaScript que deveria reagir ao clique', 'No CSS que desenha o botão', 'No DNS do site', 'No tamanho da tela'),
      Q('O script usa document.getElementById("btn") e está no head, antes do botão. O que acontece?', 'Devolve null, porque o botão ainda não existe quando o script roda', 'Funciona normalmente, o navegador espera o body', 'O navegador cria o botão sozinho', 'O navegador avisa e pausa o script'),
      Q('Qual aba mostra a lista de todos os arquivos pedidos ao servidor, com o status de cada um?', 'Network', 'Elements', 'Application', 'Console'),
      Q('O HTML tem <link href="estilo.css"> mas o arquivo da pasta se chama Estilo.css. Qual é a causa provável de o CSS não carregar?', 'O nome difere (maiúscula): em muitos servidores isso é outro arquivo', 'O CSS só funciona dentro do body', 'O link não pode ter o atributo href', 'O arquivo precisa ser .html'),
      Q('Qual afirmação sobre as linguagens é verdadeira?', 'Sem CSS a página continua funcionando, só fica sem estilo', 'Sem CSS o navegador se recusa a abrir a página', 'Sem JavaScript nenhum texto aparece', 'Sem HTML o CSS monta a estrutura sozinho'),
      Q('Por que o arquivo principal do site se chama index.html?', 'É a página que o servidor entrega quando ninguém pede um arquivo específico', 'É o arquivo onde ficam todos os estilos', 'É o programa que roda o servidor', 'É um nome exigido só pelo Windows'),
      Q('No console você digita 2 + 2 e aparece 4. O que isso mostra?', 'O console executa JavaScript na hora e mostra o resultado', 'O console só guarda mensagens de erro', 'O console salva a conta no arquivo', 'O console só funciona em páginas salvas'),
      Q('Qual é o método de estudo defendido nesta trilha?', 'Prever, digitar, executar, comparar e explicar', 'Copiar, colar, executar e seguir adiante', 'Ler, decorar e repetir', 'Executar, ignorar o erro e trocar de código'),
    ] };

  REV[57] = {
    dropLast: true,   // a semântica é aprofundada na aula 76; abre espaço para o passo de erro
    extra: [P('🐞', 'ENCONTRE O ERRO: tudo ficou em negrito',
      code(`<h1>Minha loja</h1>
<p><strong>Promoção da semana
<p>Canetas com 20% de desconto.</p>
<p>Cadernos com 10% de desconto.</p>`),
      lista(['<strong>Sintoma:</strong> do segundo parágrafo em diante, <strong>todo o texto</strong> aparece em negrito', '<strong>Causa:</strong> a tag <code>&lt;strong&gt;</code> foi <strong>aberta e nunca fechada</strong>. O navegador não dá erro: ele "adivinha" e mantém o negrito até o fim', '<strong>Como investigar:</strong> F12 → <strong>Elements</strong>: veja que os outros parágrafos ficaram <em>dentro</em> do <code>strong</code>', '<strong>Correção:</strong> fechar com <code>&lt;/strong&gt;</code> logo depois de "semana"']),
      atencao(`HTML não mostra mensagem de erro: ele tenta consertar sozinho, às vezes do jeito errado. Por isso, <strong>feche todas as tags</strong> e confira o resultado no painel Elements.`))],
    perguntas: [
      Q('O que acontece se você abre <strong> e esquece de fechá-la?', 'O negrito continua nos elementos seguintes, sem mensagem de erro', 'O navegador mostra um erro e não abre a página', 'Só a palavra seguinte fica em negrito', 'O negrito é ignorado'),
      Q('Como você descobre onde uma tag deveria ter sido fechada?', 'Pelo painel Elements, vendo quais elementos ficaram dentro dela', 'Pela aba Network', 'Pelo Application', 'Não é possível descobrir'),
      Q('Em <img src="foto.jpg" alt="Caneta azul">, o que acontece se a imagem não carregar?', 'O texto do alt aparece no lugar', 'O navegador mostra uma tela branca', 'A página inteira deixa de abrir', 'O navegador escolhe outra imagem'),
      Q('Quantas colunas e linhas (contando o cabeçalho) tem uma tabela com 1 <tr> de <th><th> e 3 <tr> de <td><td>?', '2 colunas e 4 linhas', '3 colunas e 2 linhas', '4 colunas e 2 linhas', '2 colunas e 3 linhas'),
      Q('Qual é a diferença entre <ul> e <ol>?', 'ul mostra marcadores; ol mostra números em ordem', 'ul é para links; ol é para imagens', 'ul é ordenada; ol não é', 'Não há diferença'),
      Q('Dois elementos de uma página usam id="titulo". Qual regra foi quebrada?', 'O id precisa ser único na página', 'A class precisa ser única', 'O id não pode ter letras', 'O id só pode ser usado em um h1'),
      Q('O que faz <a href="sobre.html">Sobre</a> ?', 'Cria um link que leva à página sobre.html', 'Carrega a imagem sobre.html', 'Importa o CSS sobre.html', 'Executa o arquivo sobre.html'),
      Q('Qual é o papel do <head>?', 'Guardar informações da página que não aparecem na tela, como o título da aba', 'Mostrar o cabeçalho visível do site', 'Guardar apenas o CSS', 'Ser o primeiro parágrafo da página'),
      Q('Por que usar títulos h1, h2 e h3 em vez de aumentar a fonte de um parágrafo?', 'Eles dão estrutura ao conteúdo, o tamanho se muda no CSS', 'Porque parágrafos não aceitam fonte grande', 'Porque títulos carregam mais rápido', 'Porque o navegador exige'),
      Q('Em <input type="text"> não existe a tag de fechamento. Isso está certo?', 'Sim: input é uma tag sem conteúdo, não precisa fechar', 'Não, o navegador vai dar erro', 'Sim, mas só dentro de um form', 'Não, falta o </input>'),
    ] };

  REV[58] = {
    extra: [P('🐞', 'ENCONTRE O ERRO: o campo errado é lido',
      code(`<input type="text" id="nome" placeholder="Nome do cliente">
<input type="text" id="nome" placeholder="Nome do produto">   <!-- mesmo id! -->

// JavaScript
let nome = document.getElementById("nome").value;   // lê SEMPRE o primeiro`),
      lista(['<strong>Sintoma:</strong> o programa grava o nome do <strong>cliente</strong> onde deveria gravar o do <strong>produto</strong>, e não há erro no console', '<strong>Causa:</strong> o <code>id</code> deve ser <strong>único</strong>. Com dois iguais, <code>getElementById</code> devolve só o primeiro', '<strong>Também afeta:</strong> o <code>label for="nome"</code> sempre foca o primeiro campo', '<strong>Correção:</strong> ids diferentes: <code>nomeCliente</code> e <code>nomeProduto</code>']),
      box('azul', `<strong>Dica de investigação:</strong> no console, rode <code>document.querySelectorAll("#nome").length</code>. Se der mais de <code>1</code>, há ids repetidos.`))],
    perguntas: [
      Q('Dois inputs têm o mesmo id e o código lê getElementById("nome").value. Qual campo é lido?', 'O primeiro da página', 'O último da página', 'Os dois, juntos', 'Dá um erro no console'),
      Q('Como descobrir no console se há ids repetidos?', 'document.querySelectorAll("#nome").length devolvendo mais de 1', 'Rodando console.log(id)', 'Olhando a aba Network', 'Não é possível descobrir'),
      Q('O que acontece ao clicar em um <label for="nome"> com um input id="nome" correto?', 'O foco vai para o input correspondente', 'O texto do label é apagado', 'O input é enviado', 'Nada, o label é só decorativo'),
      Q('Um campo type="number" recebe 15. Qual o resultado de campo.value + 5 ?', '"155"', '20', 'NaN', '15'),
      Q('Qual é o resultado de Number(campo.value) + 5, se o campo tem 15?', '20', '"155"', '15', 'NaN'),
      Q('Qual é a diferença entre placeholder e label?', 'O placeholder some ao digitar; o label continua descrevendo o campo', 'São iguais, só mudam o nome', 'O label some ao digitar', 'O placeholder é obrigatório para acessibilidade'),
      Q('Por que o botão de um formulário costuma levar type="button" neste projeto?', 'Para não recarregar a página ao clicar, já que o JavaScript trata o clique', 'Para o botão ficar azul', 'Porque button sem type não aparece', 'Para enviar os dados ao servidor'),
      Q('Qual é um id ruim para um campo que o JavaScript vai usar?', 'Preço do Produto (com espaços e acento)', 'precoProduto', 'preco', 'btnSalvar'),
    ] };

  REV[59] = {
    extra: [P('🐞', 'ENCONTRE O ERRO: a regra que não pega',
      code(`<h1 id="titulo">Loja</h1>

/* CSS */
.titulo { color: red; }      /* ponto = classe */`),
      lista(['<strong>Sintoma:</strong> o título continua com a cor normal', '<strong>Causa:</strong> o CSS procura um elemento com <strong>classe</strong> <code>titulo</code> (ponto), mas o HTML tem <strong>id</strong> <code>titulo</code> (cerquilha)', '<strong>Como investigar:</strong> F12 → <strong>Elements</strong> → selecione o título e veja o painel <strong>Styles</strong>: a sua regra nem aparece na lista', '<strong>Correção:</strong> <code>#titulo { color: red; }</code> (ou trocar o HTML para <code>class="titulo"</code>)']),
      caderno(['# = id · . = classe', 'Regra que não aparece no painel Styles = o seletor não encontrou o elemento']))],
    perguntas: [
      Q('O HTML tem <h1 id="titulo"> e o CSS tem .titulo { color: red; }. O título muda de cor?', 'Não: .titulo procura uma classe, e o elemento tem um id', 'Sim, ponto e cerquilha são iguais', 'Sim, mas só no Chrome', 'Não, porque h1 não aceita cor'),
      Q('Qual seletor escolhe todos os elementos com class="destaque"?', '.destaque', '#destaque', 'destaque', '*destaque'),
      Q('Um elemento tem width: 200px, padding: 20px e borda 0, no padrão do navegador (content-box). Qual espaço horizontal ele ocupa?', '240px', '200px', '220px', '180px'),
      Q('Qual é o efeito de display: flex no elemento pai?', 'Os filhos diretos passam a ser organizados em linha, por padrão', 'O pai fica invisível', 'Os filhos ganham a cor do pai', 'O pai vira uma imagem'),
      Q('Para criar espaço entre dois cards dentro de um flex, o ideal é:', 'gap no pai', 'color no filho', 'src no pai', 'href nos cards'),
      Q('O que faz button:hover { background: blue; }?', 'Muda o fundo enquanto o mouse está sobre o botão', 'Muda o fundo para sempre depois do primeiro clique', 'Cria um botão azul novo', 'Apaga o botão'),
      Q('Duas regras valem para o mesmo p: p { color: gray; } e .destaque { color: red; }. O p tem class="destaque". Qual cor vence?', 'Vermelha, porque a classe é mais específica que a tag', 'Cinza, porque veio primeiro', 'Cinza, porque é a tag', 'Nenhuma: dá conflito e some o texto'),
      Q('O que significa grid-template-columns: repeat(3, 1fr)?', 'Três colunas de largura igual', 'Três linhas', 'Uma coluna de 3 pixels', 'Três margens'),
      Q('Uma regra CSS não surte efeito e o painel Styles do Elements não a mostra para o elemento. O que isso indica?', 'O seletor da regra não encontrou aquele elemento', 'O navegador está lento', 'O CSS está certo, o HTML é que mudou de cor', 'A propriedade precisa de !important sempre'),
      Q('Qual é a diferença entre padding e margin?', 'padding é espaço interno; margin é espaço externo', 'padding é espaço externo; margin é interno', 'São sinônimos', 'margin só vale para imagens'),
    ] };

  REV[60] = {
    extra: [P('🐞', 'ENCONTRE O ERRO: as primeiras mensagens do console',
      code(`let nome = "Ana";
console.log(Nome);
// Uncaught ReferenceError: Nome is not defined

const taxa = 0.1;
taxa = 0.2;
// Uncaught TypeError: Assignment to constant variable.`),
      lista(['<strong>ReferenceError: Nome is not defined</strong>: você usou um nome que <strong>não existe</strong>. Aqui, o <code>N</code> maiúsculo criou outro nome. Confira a grafia', '<strong>Assignment to constant variable</strong>: você tentou trocar o valor de uma <code>const</code>. Se o valor precisa mudar, use <code>let</code>']),
      box('verde', `<strong>Como ler um erro:</strong> tipo (<code>ReferenceError</code>), o que houve (<code>Nome is not defined</code>) e onde (arquivo e linha). Vá direto à linha indicada.`))],
    perguntas: [
      Q('Depois de let x = 5; x = x * 2; x = x + 1; quanto vale x?', '11', '10', '6', '5'),
      Q('let nome = "Ana"; console.log(Nome); Qual é o resultado?', 'ReferenceError: Nome is not defined', 'Ana', 'undefined', 'null'),
      Q('const taxa = 0.1; taxa = 0.2; Qual é o resultado?', 'TypeError: Assignment to constant variable', 'taxa passa a valer 0.2', 'taxa vale 0.3', 'Nada acontece, sem erro'),
      Q('Qual é o resultado de "10" + 5 ?', '"105"', '15', '5', 'NaN'),
      Q('Qual é o resultado de Number("10") + 5 ?', '15', '"105"', '105', 'NaN'),
      Q('Qual é o resultado de typeof 3.5 ?', '"number"', '"float"', '"decimal"', '"string"'),
      Q('Um campo de formulário contém 20 e outro contém 3 (ambos lidos com .value). O que mostra console.log(a + b)?', '203', '23', '60', 'NaN'),
      Q('Qual destes nomes de variável é válido e claro?', 'totalCarrinho', 'total do carrinho', '1total', 'total-carrinho'),
      Q('Qual é o resultado de Number("abc") ?', 'NaN', '0', 'undefined', 'Erro de sintaxe'),
      Q('Para que serve o console.log em um programa que roda sem erro, mas com resultado errado?', 'Para ver os valores das variáveis em cada ponto e achar onde sai errado', 'Para corrigir o erro automaticamente', 'Para gravar o resultado no arquivo', 'Para impedir a execução do resto do código'),
    ] };

  REV[61] = {
    extra: [P('🐞', 'ENCONTRE O ERRO: o if que sempre entra',
      code(`let nota = 4;

if (nota = 7) {                       // um sinal de igual só!
  console.log("Aprovado");
} else {
  console.log("Reprovado");
}
console.log(nota);                    // 7`),
      lista(['<strong>Sintoma:</strong> imprime "Aprovado" mesmo com nota 4, e a <strong>nota passa a valer 7</strong>', '<strong>Causa:</strong> <code>=</code> <strong>guarda</strong> um valor. A condição virou "guarde 7 em nota", que é verdadeiro, e ainda <strong>trocou o valor</strong> da variável', '<strong>Correção:</strong> usar <code>===</code> para <strong>comparar</strong>: <code>if (nota === 7)</code> (ou <code>&gt;=</code> para "7 ou mais")']),
      atencao(`esse é um dos bugs mais difíceis de enxergar, porque <strong>não dá erro</strong>. Se um <code>if</code> sempre entra, olhe os sinais de igual.`))],
    perguntas: [
      Q('let nota = 4; if (nota = 7) { ... }. O que acontece?', 'A condição é verdadeira e a nota passa a valer 7', 'A condição é falsa, pois 4 não é 7', 'Dá um erro de sintaxe', 'O if compara e ignora'),
      Q('Qual é o resultado de 5 === "5" ?', 'false', 'true', 'NaN', 'Erro'),
      Q('Qual é o resultado de 2 + 3 * 4 ?', '14', '20', '24', '9'),
      Q('Qual é o resultado de 17 % 5 ?', '2', '3', '3.4', '0'),
      Q('Com preco = 100 e desconto = 0.1, o que calcula preco - preco * desconto?', '90', '9', '99.9', '10'),
      Q('Com nota = 6.5, qual bloco executa? if (nota >= 7) {A} else if (nota >= 5) {B} else {C}', 'B', 'A', 'C', 'A e B'),
      Q('Em console.log(§Total: €{preco}§), o que aparece com preco = 12.5?', 'Total: 12.5', 'Total: €{preco}', 'Total: preco', 'Erro de sintaxe'),
      Q('O que acontece em if (idade >= 18 && temDocumento) com idade = 20 e temDocumento = false?', 'A condição é falsa', 'A condição é verdadeira, pois 20 >= 18', 'Dá erro', 'Executa o else apenas se idade for menor que 18'),
      Q('Qual é a melhor forma de validar "nome vazio OU preço inválido"?', 'if (nome === "" || preco <= 0)', 'if (nome === "" && preco <= 0)', 'if (nome = "" || preco <= 0)', 'if (nome === "", preco <= 0)'),
      Q('Em console.log(§Olá, €{nome}§), com a variável nome nunca declarada, o resultado é:', 'ReferenceError: nome is not defined', 'Olá, undefined', 'Olá, (texto vazio)', 'Olá, nome'),
    ] };

  REV[62] = {
    extra: [P('🐞', 'ENCONTRE O ERRO: undefined e o erro do campo',
      code(`let produtos = [{ nome: "Caneta", preco: 3.5 }, { nome: "Lápis", preco: 1.5 }];

console.log(produtos[2].nome);
// Uncaught TypeError: Cannot read properties of undefined (reading 'nome')

console.log(produtos[0].Nome);      // undefined  (sem erro!)`),
      lista(['<strong>1º caso:</strong> o array só tem as posições 0 e 1. <code>produtos[2]</code> é <code>undefined</code>, e pedir <code>.nome</code> de <code>undefined</code> <strong>quebra</strong>', '<strong>2º caso:</strong> <code>Nome</code> com N maiúsculo <strong>não é</strong> o campo <code>nome</code>. O JavaScript devolve <code>undefined</code>, <strong>sem avisar</strong>', '<strong>Como investigar:</strong> <code>console.log(produtos)</code> mostra os campos exatos e quantos itens existem']),
      caderno(['Posição que não existe = undefined', 'Campo com maiúscula errada = undefined, sem erro', 'console.log do objeto mostra os nomes certos']))],
    perguntas: [
      Q('let p = [{nome:"A"},{nome:"B"}]; console.log(p[2].nome) resulta em:', 'TypeError: Cannot read properties of undefined', 'undefined', '"C"', 'null'),
      Q('Dado o mesmo array, o que mostra p[0].Nome (com N maiúsculo)?', 'undefined', '"A"', 'Erro de sintaxe', 'null'),
      Q('Com frutas = ["Maçã","Uva","Pera"], o que mostra frutas[frutas.length - 1]?', '"Pera"', '"Maçã"', 'undefined', '3'),
      Q('Com for (let i = 0; i <= frutas.length; i++) console.log(frutas[i].toUpperCase()), qual problema acontece na última volta?', 'frutas[3] é undefined e quebra o programa', 'O laço roda uma volta a menos', 'O toUpperCase não existe', 'Nada, o laço está correto'),
      Q('Com precos = [10, 20, 30] e total começando em 0, qual é o total depois do laço que soma tudo?', '60', '30', '10', '0'),
      Q('Dado o objeto produto = { id: "p1", nome: "Caneta" }, o que faz produto.preco = 4?', 'Cria um campo novo preco com valor 4', 'Dá erro, pois o campo não existe', 'Altera o campo nome', 'Não faz nada'),
      Q('Qual é a forma correta de adicionar um item ao final de um array?', 'lista.push(item)', 'lista.add(item)', 'lista.append(item)', 'lista[item]'),
      Q('Por que o total do carrinho precisa começar em 0 ANTES do laço?', 'Para acumular os valores de todas as voltas', 'Porque o for obriga', 'Para o laço não repetir', 'Para evitar o erro de sintaxe'),
      Q('Se total for criado DENTRO do laço (let total = 0 a cada volta), qual será o resultado final fora do laço?', 'Não existirá fora do laço (ReferenceError), e dentro valeria só o item da volta', 'A soma correta', 'Zero sempre', 'NaN'),
      Q('Como se descobre rapidamente os campos exatos de um objeto no console?', 'console.log(objeto)', 'console.fields(objeto)', 'objeto.length', 'typeof objeto.nome'),
    ] };

  REV[63] = {
    extra: [P('🐞', 'ENCONTRE O ERRO: a função que devolve undefined',
      code(`function somar(a, b) {
  let resultado = a + b;           // calcula, mas não devolve
}

console.log(somar(2, 3));          // undefined
console.log(somar);                // ƒ somar(a, b) { ... }  (a própria função!)`),
      lista(['<strong>1º sintoma:</strong> <code>undefined</code>. <strong>Causa:</strong> faltou o <code>return</code>: a função calculou, mas não <strong>entregou</strong> o resultado', '<strong>2º sintoma:</strong> aparece o texto da função. <strong>Causa:</strong> faltaram os <strong>parênteses</strong>. <code>somar</code> é a função; <code>somar(2, 3)</code> é a <strong>chamada</strong>', '<strong>Correção:</strong> <code>return a + b;</code> e chamar com parênteses']),
      caderno(['Sem return, a função devolve undefined', 'nome → a função · nome() → executar a função']))],
    perguntas: [
      Q('function somar(a, b) { let r = a + b; } console.log(somar(2, 3)) mostra:', 'undefined', '5', '23', 'Erro'),
      Q('Qual é a correção para o caso acima?', 'Acrescentar return r;', 'Trocar let por const', 'Chamar somar sem parênteses', 'Trocar a por b'),
      Q('console.log(somar) (sem parênteses) mostra:', 'O texto da própria função', 'O resultado da soma', 'undefined', 'Um erro de sintaxe'),
      Q('function f(n) { return n * 2; console.log("fim"); } Ao chamar f(4), o que acontece com o console.log?', 'Não executa, pois o return encerra a função', 'Executa antes do return', 'Executa duas vezes', 'Executa depois do retorno'),
      Q('function f(a, b) { return a * b; } console.log(f(3, 4)) mostra:', '12', '7', '34', 'undefined'),
      Q('Qual é a diferença entre console.log(x) e return x dentro de uma função?', 'log mostra no console; return entrega o valor para quem chamou', 'São sinônimos', 'return mostra no console', 'log encerra a função'),
      Q('Uma função foi escrita, mas nunca chamada. O que acontece?', 'Nada: ela só executa quando é chamada', 'Executa uma vez ao abrir a página', 'O navegador avisa com um erro', 'Executa todas as vezes que outra função roda'),
      Q('Qual é a vantagem de dar nomes como salvarProduto e atualizarGrid às funções?', 'O nome explica o que cada uma faz e facilita achar bugs', 'O JavaScript só aceita nomes longos', 'Deixa o código mais rápido', 'Evita o uso de return'),
      Q('Por que "uma função, uma responsabilidade" ajuda a depurar?', 'Dá para testar cada função sozinha no console', 'Porque o navegador roda uma função por vez', 'Porque assim não precisa de parâmetros', 'Porque funções pequenas não dão erro'),
      Q('function saudar(nome) { return "Olá, " + nome; } Qual é o valor de saudar("Ana")?', '"Olá, Ana"', '"Olá, nome"', 'undefined', '"Ana"'),
    ] };

  // ══════════════════════════════════════════════════════
  // REVISÃO (aulas 64 a 69)
  // ══════════════════════════════════════════════════════
  REV[64] = {
    perguntas: [
      Q('O console mostra "Uncaught ReferenceError: preco is not defined at script.js:7". O que fazer primeiro?', 'Ir à linha 7 do script.js e conferir se "preco" foi declarado e se a grafia está igual', 'Reinstalar o navegador', 'Apagar o arquivo script.js', 'Ignorar: erros de ReferenceError não importam'),
      Q('Qual mensagem indica que algo que o código esperava existir é null?', 'TypeError: Cannot read properties of null', 'SyntaxError: Unexpected token', 'ReferenceError: x is not defined', 'RangeError: Invalid array length'),
      Q('O código roda sem nenhum erro, mas o total do carrinho está errado. Qual é a melhor investigação?', 'console.log dos valores (e do tipo) dentro do laço', 'Apagar e reescrever o programa', 'Trocar de navegador', 'Procurar uma mensagem de erro no Network'),
      Q('["10","20"] somados com + em um laço resultam em "01020". Qual é a causa?', 'Os valores são texto, e o + junta textos', 'O array tem itens demais', 'O laço começa em 1', 'O zero inicial está proibido'),
      Q('Qual é a correção para o caso acima?', 'Converter com Number() antes de somar', 'Trocar o + por -', 'Usar while em vez de for', 'Trocar let por const'),
      Q('Um SyntaxError costuma apontar para:', 'Um parêntese, chave ou aspas faltando ou sobrando', 'Uma variável escrita com letra maiúscula', 'Uma imagem que não carregou', 'Falta de internet'),
      Q('Ao pedir ajuda, qual é a informação mais útil para quem vai te ajudar?', 'A mensagem de erro completa, a linha e o que você já tentou', 'A frase "não funciona"', 'Um print do desktop inteiro', 'O código do colega ao lado'),
      Q('Por que escrever uma hipótese ANTES de testar uma correção?', 'Para aprender com o acerto ou o erro da hipótese, em vez de tentar às cegas', 'Porque o navegador pede', 'Para o professor corrigir', 'Para fazer o código rodar mais rápido'),
      Q('Depois de achar o bug, o que fazer com os console.log de teste?', 'Apagar antes de entregar', 'Deixar todos, ajudam o usuário', 'Trocá-los por alert', 'Colocar dentro de comentários HTML'),
      Q('Qual é o primeiro passo de qualquer investigação de bug?', 'Descrever o sintoma: o que esperava × o que aconteceu', 'Mudar o máximo de coisas possível', 'Copiar uma solução de outro projeto', 'Reiniciar o computador'),
    ] };

  REV[65] = {
    perguntas: [
      Q('document.getElementById("preco").value devolve um texto, mesmo em type="number". Como obter um número?', 'Number(document.getElementById("preco").value)', 'document.getElementById("preco").number', 'Number(document.getElementById("preco"))', 'getElementById("preco") + 0'),
      Q('O que acontece se o id passado ao getElementById não existe?', 'Devolve null', 'Cria o elemento', 'Devolve 0', 'Para a página'),
      Q('Depois de let el = document.getElementById("xyz") (inexistente), o que faz el.textContent = "Oi"?', 'TypeError: Cannot set properties of null', 'Cria o elemento com o texto Oi', 'Nada, sem erro', 'ReferenceError: el is not defined'),
      Q('Com <li>A</li><li>B</li><li>C</li> na página, quantos elementos devolve document.querySelectorAll("li")?', '3', '1', '0', '4'),
      Q('E o que devolve document.querySelector("li")?', 'O primeiro li (A)', 'Os três li', 'O último li (C)', 'null'),
      Q('Qual seletor escolhe o elemento com class="destaque"?', 'querySelector(".destaque")', 'querySelector("destaque")', 'querySelector("#destaque")', 'getElementById(".destaque")'),
      Q('O JavaScript muda o texto de um h1 pelo DOM. O que acontece com o arquivo index.html no disco?', 'Nada: o DOM é uma cópia na memória do navegador', 'O arquivo é reescrito', 'O servidor atualiza o arquivo', 'O arquivo é apagado'),
      Q('Em <input type="text" id="nome">, qual expressão lê o que o usuário digitou?', 'document.getElementById("nome").value', 'document.getElementById("nome").text', 'document.getElementById("nome").content', 'document.nome'),
      Q('Por que o DOM é descrito como uma "árvore"?', 'Elementos ficam dentro de outros, formando pais, filhos e irmãos', 'Porque o navegador usa folhas de estilo', 'Porque cada elemento só pode ter um filho', 'Porque os elementos crescem sozinhos'),
    ] };

  REV[66] = {
    extra: [P('🐞', 'ENCONTRE O ERRO: "Cannot set properties of null"',
      code(`<h1 id="titulo">Loja</h1>

document.getElementById("titullo").textContent = "Loja do Beto";
// Uncaught TypeError: Cannot set properties of null (setting 'textContent')`),
      lista(['<strong>Sintoma:</strong> o título não muda e o console mostra o erro acima', '<strong>Causa:</strong> o id está escrito <strong>diferente</strong> do HTML (<code>titullo</code> com dois <code>l</code>). O <code>getElementById</code> devolveu <code>null</code>, e <code>null</code> não tem <code>textContent</code> para mudar', '<strong>Como investigar:</strong> rode no console <code>document.getElementById("titullo")</code>: se devolver <code>null</code>, o id está errado. Compare com o HTML, letra por letra']),
      caderno(['Cannot set/read properties of null = o elemento não foi achado', 'Confira o id no HTML, letra por letra']))],
    perguntas: [
      Q('Com <div id="caixa"></div>, o que mostra na tela caixa.textContent = "<b>Oi</b>"?', 'O texto <b>Oi</b> escrito literalmente', 'Oi em negrito', 'Nada', 'Erro de sintaxe'),
      Q('E com caixa.innerHTML = "<b>Oi</b>"?', 'Oi em negrito', 'O texto <b>Oi</b> escrito literalmente', 'Nada', 'Erro de sintaxe'),
      Q('Por que innerHTML com texto digitado por usuários é arriscado?', 'Ele pode conter HTML ou scripts que o navegador executa', 'Porque innerHTML é lento demais', 'Porque o usuário não pode digitar símbolos', 'Porque innerHTML não aceita acentos'),
      Q('Qual linha liga a classe "ativo" em um elemento?', 'el.classList.add("ativo")', 'el.class = "ativo"', 'el.addClass("ativo")', 'el.ativo = true'),
      Q('Um botão usa classList.toggle("ativo"). O que acontece a cada clique, a partir do estado sem a classe?', 'Liga, desliga, liga, desliga...', 'Liga e continua ligada', 'Desliga e continua desligada', 'Dá erro no segundo clique'),
      Q('Como o JavaScript escreve a propriedade CSS font-size?', 'el.style.fontSize', 'el.style.font-size', 'el.style["font_size"]', 'el.fontsize'),
      Q('A função desenhar() não faz innerHTML = "" antes do laço e é chamada 2 vezes com 3 itens. Quantos itens aparecem?', '6', '3', '2', '0'),
      Q('Para criar um li com texto e colocá-lo dentro de um ul, qual é a sequência?', 'createElement("li"), definir o textContent, appendChild no ul', 'appendChild no ul, depois createElement', 'createElement e pronto, aparece sozinho', 'innerHTML do li = ul'),
      Q('Qual é a melhor forma de mudar a aparência de um elemento pelo JavaScript?', 'Ligar ou desligar uma classe que já está definida no CSS', 'Escrever todos os estilos linha a linha no JavaScript', 'Alterar o arquivo CSS no disco', 'Usar sempre innerHTML'),
    ] };

  REV[67] = {
    extra: [P('🐞', 'ENCONTRE O ERRO: o clique que nunca dispara',
      code(`document.getElementById("btn").addEventListener("onclick", function () {
  console.log("Clicou!");
});`),
      lista(['<strong>Sintoma:</strong> clicar no botão <strong>não faz nada</strong> e <strong>não há erro</strong> no console', '<strong>Causa:</strong> o nome do evento é <code>"click"</code>, e não <code>"onclick"</code>. O <code>onclick</code> é o nome do <em>atributo HTML</em>. O <code>addEventListener</code> aceita qualquer texto como nome de evento: se não existir, ele fica esperando para sempre', '<strong>Correção:</strong> <code>addEventListener("click", ...)</code>']),
      box('verde', `<strong>Como investigar:</strong> coloque um <code>console.log</code> na primeira linha da função. Se nunca aparece, o problema está em <strong>ligar</strong> o evento, e não dentro da função.`))],
    perguntas: [
      Q('Qual é o nome correto do evento de clique no addEventListener?', '"click"', '"onclick"', '"clique"', '"press"'),
      Q('O botão tem addEventListener("onclick", f). O que acontece ao clicar?', 'Nada, e sem mensagem de erro', 'A função f executa normalmente', 'Aparece um erro no console', 'A função executa duas vezes'),
      Q('Qual é a diferença entre addEventListener("click", salvar) e addEventListener("click", salvar())?', 'O segundo executa salvar na hora, e não no clique', 'O segundo é a forma correta', 'Não há diferença', 'O primeiro dá erro de sintaxe'),
      Q('Em um formulário com evento submit, o que acontece se faltar evento.preventDefault()?', 'A página recarrega e os dados aparecem na URL (GET)', 'Nada de especial', 'O formulário é apagado', 'O JavaScript para de funcionar para sempre'),
      Q('Qual evento dispara a cada letra digitada em um campo?', '"input"', '"change"', '"submit"', '"load"'),
      Q('No contador, contador = contador + 1 roda, mas a tela continua em 0. O que faltou?', 'Atualizar o texto da tela (textContent) depois de mudar a variável', 'Trocar let por const', 'Reiniciar o navegador', 'Usar var'),
      Q('Dentro de uma função de clique há um console.log que nunca aparece. Onde é mais provável o problema?', 'Na forma de ligar o evento (nome do evento, id errado ou parênteses)', 'Dentro do console.log', 'No CSS', 'No servidor'),
      Q('O padrão repetido em todo o projeto é:', 'Evento → muda os dados → redesenha a tela', 'Desenha a tela → muda os dados → evento', 'Redesenha a tela sem mudar os dados', 'Muda o HTML direto no arquivo'),
    ] };

  REV[68] = {
    extra: [P('🐞', 'ENCONTRE O ERRO: valores estranhos na gaveta',
      code(`localStorage.setItem("idade", 15);
console.log(localStorage.getItem("idade") + 1);     // "151"  (texto!)

localStorage.setItem("nome");                       // esqueceu o valor
console.log(localStorage.getItem("nome"));          // "undefined"  (um TEXTO)`),
      lista(['<strong>"151":</strong> o <code>getItem</code> devolve <strong>texto</strong>, e <code>"15" + 1</code> junta. Para somar: <code>Number(localStorage.getItem("idade")) + 1</code>', '<strong>"undefined":</strong> sem o segundo argumento, o JavaScript guarda o <strong>texto</strong> <code>"undefined"</code>. Parece um valor vazio, mas <strong>não é <code>null</code></strong>. O <code>if (valor === null)</code> não o detecta']),
      caderno(['getItem sempre devolve texto (ou null)', 'setItem sem valor guarda o TEXTO "undefined"']))],
    perguntas: [
      Q('localStorage.setItem("idade", 15); localStorage.getItem("idade") + 1 resulta em:', '"151"', '16', 'NaN', '15'),
      Q('Como obter 16 a partir da chave "idade" que guarda 15?', 'Number(localStorage.getItem("idade")) + 1', 'localStorage.getItem("idade") + 1', 'localStorage.idade.number() + 1', 'getItem("idade").add(1)'),
      Q('Qual é o valor de localStorage.getItem("naoExiste")?', 'null', 'undefined', '0', '"" (texto vazio)'),
      Q('O que localStorage.setItem("nome") guarda (sem o segundo argumento)?', 'O texto "undefined"', 'null', 'Texto vazio', 'Nada, a chave não é criada'),
      Q('Um programador testa if (valor === null) para saber se a chave existe e valor é "undefined" (texto). O que acontece?', 'O teste falha: o texto "undefined" não é null', 'O teste acerta', 'Dá erro de sintaxe', 'O localStorage apaga a chave'),
      Q('Duas abas abertas no mesmo site guardam dados na mesma chave. O que acontece?', 'Compartilham o mesmo localStorage: a última gravação vale', 'Cada aba tem sua gaveta separada', 'Só a primeira aba pode gravar', 'Dá erro na segunda aba'),
      Q('Onde ver, editar ou apagar as chaves guardadas no localStorage?', 'F12 → Application → Local Storage', 'F12 → Network', 'F12 → Elements', 'Configurações do Windows'),
      Q('setItem usado duas vezes com a mesma chave e valores diferentes: o que sobra?', 'O último valor', 'Os dois valores', 'O primeiro valor', 'Um erro'),
      Q('Qual destes dados NÃO deve ser guardado no localStorage?', 'Uma senha', 'A preferência de tema', 'A lista de produtos de teste', 'O último filtro escolhido'),
      Q('Se você guarda o número 10 e o lê de volta, qual é o typeof do resultado?', '"string"', '"number"', '"object"', '"undefined"'),
    ] };

  REV[69] = {
    extra: [P('🐞', 'ENCONTRE O ERRO: "is not valid JSON"',
      code(`localStorage.setItem("p1", { nome: "Caneta" });          // faltou o stringify
let produto = JSON.parse(localStorage.getItem("p1"));
// Uncaught SyntaxError: "[object Object]" is not valid JSON

JSON.parse(localStorage.getItem("naoExiste"));              // devolve null (sem erro)
JSON.parse("undefined");
// Uncaught SyntaxError: "undefined" is not valid JSON`),
      lista(['<strong>1º caso:</strong> o objeto foi guardado sem <code>JSON.stringify</code>, virou o texto <code>"[object Object]"</code> e <strong>perdeu os dados</strong>. O <code>parse</code> não consegue ler isso. <em>(Em navegadores mais antigos, a mensagem é "Unexpected token o in JSON at position 1".)</em>', '<strong>2º caso:</strong> <code>JSON.parse(null)</code> devolve <code>null</code> sem erro, e o problema aparece <strong>depois</strong>: <code>null.nome</code> quebra', '<strong>Correção:</strong> sempre <code>stringify</code> ao guardar e <code>parse</code> ao ler; e conferir <code>null</code> antes de usar']),
      box('azul', `Para limpar o que foi guardado errado: F12 → Application → Local Storage → apague a chave com defeito e grave de novo do jeito certo.`))],
    perguntas: [
      Q('localStorage.setItem("p1", { nome: "Caneta" }) guarda o quê?', 'O texto "[object Object]"', 'O objeto com o nome', 'O JSON do objeto', 'Nada, dá erro'),
      Q('O que acontece em JSON.parse("[object Object]")?', 'SyntaxError: "[object Object]" is not valid JSON', 'Devolve o objeto original', 'Devolve null', 'Devolve texto vazio'),
      Q('JSON.parse(null) devolve:', 'null', 'undefined', 'Um erro de sintaxe', 'Um objeto vazio {}'),
      Q('Para guardar { id: "p1", preco: 3.5 } corretamente:', 'localStorage.setItem("p1", JSON.stringify(obj))', 'localStorage.setItem("p1", obj)', 'localStorage.setItem("p1", JSON.parse(obj))', 'localStorage.setItem(JSON.stringify("p1"), obj)'),
      Q('Para usar produto.preco depois de ler da gaveta:', 'let produto = JSON.parse(localStorage.getItem("p1"))', 'let produto = localStorage.getItem("p1")', 'let produto = JSON.stringify(localStorage.getItem("p1"))', 'let produto = localStorage.p1()'),
      Q('localStorage tem 3 chaves. Quais valores de i percorrem todas com localStorage.key(i)?', '0, 1 e 2', '1, 2 e 3', '0, 1, 2 e 3', '1 e 2'),
      Q('Em um laço, if (chave[0] === "p") deixa passar o quê?', 'Só as chaves que começam com p (produtos)', 'Só as que terminam com p', 'Todas as chaves', 'As que contêm p em qualquer lugar'),
      Q('Dado id = "p4821", qual é o valor de "c" + id.slice(1) ?', '"c4821"', '"cp4821"', '"p4821c"', '"c4821p"'),
      Q('O que acontece se o laço da loja não filtrar por p ou c e fizer JSON.parse de uma chave de outro assunto, como "tema" com valor claro?', 'Pode dar SyntaxError, pois o valor não é JSON', 'Sempre funciona', 'O JSON.parse devolve true', 'O laço pula sozinho'),
      Q('Qual é a vantagem de guardar cada produto em uma chave própria, em vez de um array inteiro em uma chave só?', 'Alterar ou excluir um produto mexe só naquela chave', 'O localStorage fica mais rápido sempre', 'O JSON deixa de ser necessário', 'Não existe vantagem'),
    ] };

  // ══════════════════════════════════════════════════════
  // MÓDULO 8 · CONSTRUÇÃO GUIADA DA LOJA
  // Nada de código final pronto: cada etapa diz o que fazer, dá um ESQUELETO com lacunas (___),
  // diz como TESTAR (e o que deve aparecer) e guarda dicas em 3 níveis, escondidas.
  // ══════════════════════════════════════════════════════
  function substituir(id) { NOVAS = NOVAS.filter(function (a) { return a.id !== id; }); }

  function dica(n, html) {
    var rot = n === 4 ? '🔓 Solução comentada (só depois de tentar de verdade; e digite, não cole)' : n === 3 ? '🆘 Dica 3 (quase a resposta)' : '💡 Dica ' + n;
    return '<details style="margin-top:8px;background:rgba(251,191,36,.07);border:1px solid rgba(251,191,36,.3);border-radius:8px;padding:8px 12px;font-size:13px;line-height:1.7"><summary style="cursor:pointer;color:#fbbf24;font-weight:700">' + rot + '</summary><div style="margin-top:6px">' + html + '</div></details>';
  }
  function lista_ol(itens) {
    return '<ol style="margin:8px 0 0 20px;line-height:1.8;font-size:14px">' + itens.map(function (i) { return '<li style="margin-bottom:4px">' + i + '</li>'; }).join('') + '</ol>';
  }
  // etapa: objetivo, o que fazer (lista numerada), esqueleto (opcional), como testar, dicas (1 a 3)
  // ENT[titulo da etapa] = bloco "Antes de fazer, entenda": explicação + exemplo resolvido de OUTRO assunto
  var ENT = {};
  // exemplo resolvido: título, introdução, código do exemplo, explicação linha a linha, o que muda no nosso projeto
  function exemplo(intro, codigoEx, linhas, adaptar) {
    return '<div style="margin-top:12px;padding:14px;border:1.5px solid rgba(79,142,247,.4);border-radius:12px;background:rgba(79,142,247,.06)">' +
      '<div style="font-weight:700;color:var(--accent);margin-bottom:6px">📖 Antes de fazer, entenda</div>' + intro +
      '<div style="margin-top:10px;font-weight:700">📘 Exemplo resolvido (outro assunto, a mesma técnica)</div>' + code(codigoEx) +
      '<div style="margin-top:10px;font-weight:700">🔍 Linha por linha</div>' + lista_ol(linhas) +
      (adaptar ? '<div style="margin-top:10px;font-weight:700;color:#34d399">🔁 O que muda no nosso projeto</div><p style="font-size:14px;line-height:1.7;margin-top:4px">' + adaptar + '</p>' : '') +
      '</div>';
  }
  function etapa(ico, titulo, objetivo, fazer, esqueleto, testar, dicas) {
    var partes = [];
    if (ENT[titulo]) partes.push(ENT[titulo]);
    if (objetivo) partes.push('<p style="margin-top:12px">' + objetivo + '</p>');
    partes.push('<div style="margin-top:12px;font-weight:700;color:var(--accent)">🎯 O que fazer</div>' + lista_ol(fazer));
    if (esqueleto) partes.push(code(esqueleto, 'Esqueleto: troque cada ___ e cada TODO pelo seu código (digite, não cole)'));
    partes.push('<div style="margin-top:12px;font-weight:700;color:#34d399">✅ Como testar (o que deve aparecer)</div>' + lista_ol(testar));
    if (esqueleto) {
      var sol = '';
      var mm = /<pre[^>]*>([\s\S]*?)<\/pre>/.exec((dicas || [])[3] || '');
      if (mm) sol = mm[1];
      partes.push(
        '<div class="vq" style="margin-top:14px;padding:14px;border:1.5px dashed rgba(52,211,153,.5);border-radius:12px;background:rgba(52,211,153,.05)">' +
        '<div style="font-weight:700;color:#34d399">✍️ Escreva seu código aqui e confira</div>' +
        '<p style="font-size:13px;color:var(--muted);margin:4px 0 8px">Digite a etapa completa (sem <code>___</code> e sem <code>TODO</code>). O botão confere se você seguiu a estrutura; <strong>o teste de verdade é rodar no navegador</strong>.</p>' +
        '<textarea class="vq-ta" rows="10" spellcheck="false" autocomplete="off" autocapitalize="off" placeholder="Escreva aqui..." style="width:100%;box-sizing:border-box;background:#0b0d13;color:#d9e3ee;border:1px solid var(--border);border-radius:8px;padding:10px;font-family:Consolas,monospace;font-size:12.5px;line-height:1.6;tab-size:2"></textarea>' +
        '<textarea class="vq-esq" hidden>' + esc(deco(esqueleto)) + '</textarea>' +
        '<textarea class="vq-sol" hidden>' + sol + '</textarea>' +
        '<button type="button" class="vq-btn" style="margin-top:8px;background:#34d399;color:#06281c;border:none;border-radius:8px;padding:9px 16px;font-weight:700;cursor:pointer">✅ Conferir meu código</button>' +
        '<div class="vq-res" style="margin-top:10px;font-size:13px;line-height:1.7"></div></div>');
    }
    (dicas || []).forEach(function (d, i) { partes.push(dica(i + 1, d)); });
    return P.apply(null, [ico, titulo].concat(partes));
  }


  // prática guiada por aula: GUIA[id] = [etapa, etapa, ...] (aplicada em pEnd)
  var GUIA = {};

  // conferência de ARQUIVO COMPLETO: o aluno cola o arquivo que montou no VS Code e o botão confere cada linha esperada
  function arquivoCompleto(nome, ref) {
    return "<div class=\"vq\" style=\"margin-top:16px;padding:16px;border:1.5px solid rgba(52,211,153,.55);border-radius:14px;background:rgba(52,211,153,.06)\">" +
      "<div style=\"font-weight:700;color:#34d399;font-size:15px\">🏁 Monte o arquivo completo: <code>" + nome + "</code></div>" +
      "<p style=\"font-size:13px;color:var(--muted);margin:6px 0 8px\">Junte tudo o que você escreveu nas etapas em <strong>um só arquivo</strong> no VS Code. Depois <strong>copie o SEU arquivo</strong> e cole aqui. O botão confere se cada linha importante está presente (ordem e espaços não importam). Não rodou? Abra o arquivo no navegador e teste.</p>" +
      "<textarea class=\"vq-ta\" rows=\"16\" spellcheck=\"false\" autocomplete=\"off\" autocapitalize=\"off\" placeholder=\"Cole aqui o conteúdo de " + nome + "...\" style=\"width:100%;box-sizing:border-box;background:#0b0d13;color:#d9e3ee;border:1px solid var(--border);border-radius:8px;padding:10px;font-family:Consolas,monospace;font-size:12.5px;line-height:1.6;tab-size:2\"></textarea>" +
      "<textarea class=\"vq-esq\" hidden>" + esc(ref) + "</textarea><textarea class=\"vq-sol\" hidden></textarea>" +
      "<button type=\"button\" class=\"vq-btn\" style=\"margin-top:8px;background:#34d399;color:#06281c;border:none;border-radius:8px;padding:9px 16px;font-weight:700;cursor:pointer\">✅ Conferir o arquivo</button>" +
      "<div class=\"vq-res\" style=\"margin-top:10px;font-size:13px;line-height:1.7\"></div></div>";
  }

  // ══════════════════════════════════════════════════════
  // "ANTES DE FAZER, ENTENDA": explicação + exemplo resolvido de outro assunto, para cada função do módulo 8.
  // (os alunos reclamaram que só pediam para fazer, sem explicar)
  // ══════════════════════════════════════════════════════
  ENT['ETAPA 1: a função ler()'] = exemplo(
    `<p>Uma <strong>função</strong> é um bloco de código com <strong>nome</strong>. Você escreve uma vez e "chama" quantas vezes quiser. A <code>ler()</code> tem uma missão: <strong>pegar o que o usuário digitou e entregar organizado</strong>. Para isso ela faz 4 coisas:</p>
     <ol style="margin:6px 0 0 20px;line-height:1.8;font-size:14px"><li><strong>Acha</strong> cada campo da página (<code>document.querySelector</code>)</li><li><strong>Lê</strong> o texto digitado em cada um (<code>.value</code>)</li><li><strong>Guarda</strong> os textos em um array (uma "fileira de caixinhas" numeradas a partir do 0)</li><li><strong>Entrega</strong> o array (<code>return</code>)</li></ol>`,
    `// EXEMPLO de outro assunto: ler o pedido de uma lanchonete (2 campos)
function lerPedido() {
  let pedido = [];                                   // 1
  let cliente = document.querySelector("#cliente");  // 2
  let lanche  = document.querySelector("#lanche");   // 3

  pedido[0] = cliente.value;                         // 4
  pedido[1] = lanche.value;                          // 5

  return pedido;                                     // 6
}`,
    ['<strong>Linha 1:</strong> cria um array <strong>vazio</strong> chamado <code>pedido</code>, para receber os textos. Pense em uma prateleira ainda sem nada', '<strong>Linhas 2 e 3:</strong> <code>querySelector("#cliente")</code> procura na página o elemento com <code>id="cliente"</code> (o <code>#</code> significa "id") e guarda esse <em>elemento</em> na variável. <strong>Ainda não é o texto</strong>: é o campo em si', '<strong>Linhas 4 e 5:</strong> <code>.value</code> pega o <strong>texto digitado</strong> naquele campo e o coloca na posição 0 e 1 do array', '<strong>Linha 6:</strong> <code>return</code> <strong>entrega</strong> o array a quem chamou a função. Sem o <code>return</code>, o trabalho se perde'],
    'No nosso projeto são <strong>3 campos</strong> (nome, valor, descrição) em vez de 2, com os ids <code>#nomeProduto</code>, <code>#valorProduto</code> e <code>#descricaoProduto</code>, e o array tem 3 posições. A estrutura da função é <strong>idêntica</strong>: é só trocar os nomes e acrescentar o terceiro campo.');

  ENT['ETAPA 2: a função limparCampos()'] = exemplo(
    `<p>Esta função é a mais simples: ela não recebe nada e não devolve nada. Ela só <strong>faz uma ação</strong>: esvazia os campos. Para esvaziar um campo, você atribui um <strong>texto vazio</strong> (<code>""</code>, duas aspas coladas) ao <code>.value</code> dele.</p>`,
    `// EXEMPLO: esvaziar o formulário do pedido da lanchonete
function limparPedido() {
  document.querySelector("#cliente").value = "";
  document.querySelector("#lanche").value = "";
}`,
    ['<strong>Cada linha</strong> faz a mesma coisa: acha um campo e troca o texto que está nele por "nada"', '<code>=</code> aqui <strong>guarda</strong> um valor (não é "igual" da matemática): "guarde <code>""</code> dentro do <code>.value</code> deste campo"', 'A função não tem <code>return</code>, porque o trabalho dela é <strong>mexer na página</strong>, e não entregar um resultado'],
    'São <strong>3 linhas</strong>, uma para cada campo: <code>#nomeProduto</code>, <code>#valorProduto</code> e <code>#descricaoProduto</code>.');

  ENT['ETAPA 2: salvarProduto(id, produto)'] = exemplo(
    `<p>Esta função tem <strong>parâmetros</strong>: valores que ela <strong>recebe de fora</strong> quando é chamada. Pense na função como uma máquina: você coloca <strong>duas coisas</strong> (a chave e os dados), e ela faz o trabalho com elas. O que ela faz: <strong>guardar no localStorage</strong>, que tem a forma <code>localStorage.setItem(chave, valor)</code>. Como o localStorage só guarda <strong>texto</strong>, o array é convertido com <code>JSON.stringify</code>.</p>`,
    `// EXEMPLO: guardar um aluno (chave + array com nome e turma)
function guardarAluno(chave, aluno) {
  localStorage.setItem(chave, JSON.stringify(aluno));
}

// COMO SE USA (chamada):
guardarAluno("a1", ["Ana", "Turma B"]);`,
    ['<code>function guardarAluno(chave, aluno)</code>: os nomes entre parênteses são os <strong>parâmetros</strong>: espaços reservados para o que virá de fora', '<code>guardarAluno("a1", ["Ana", "Turma B"])</code>: ao chamar, <code>"a1"</code> vai para <code>chave</code> e o array vai para <code>aluno</code>', '<code>JSON.stringify(aluno)</code> transforma o array em <strong>texto</strong>: <code>\'["Ana","Turma B"]\'</code>', '<code>localStorage.setItem(chave, texto)</code> guarda esse texto na gaveta chamada <code>"a1"</code>'],
    'Os parâmetros são <code>id</code> (a chave do produto) e <code>produto</code> (o array). Trocamos <code>chave</code> por <code>id</code> e <code>aluno</code> por <code>produto</code>. A linha do meio é <strong>a mesma</strong>.');

  ENT['ETAPA 3: cadastrar() e o botão'] = exemplo(
    `<p>Aqui você <strong>junta</strong> funções que já existem em uma sequência. A função <code>cadastrar</code> não faz o trabalho pesado: ela <strong>chama</strong> as outras, <strong>na ordem certa</strong>. É como uma <strong>receita</strong>: 1) ler, 2) guardar, 3) limpar. A ordem importa: se limpar antes de ler, você lê campos vazios!</p>
     <p style="margin-top:8px">O botão precisa saber <strong>qual função chamar</strong> quando clicado. No HTML, isso se faz com o atributo <code>onclick="nomeDaFuncao()"</code>.</p>`,
    `// EXEMPLO: registrar um pedido (usa 3 funções que já existem)
function registrarPedido() {
  let pedido = lerPedido();                          // 1. lê e guarda o resultado numa variável
  guardarPedido("ped" + Date.now(), pedido);         // 2. usa o resultado
  limparPedido();                                    // 3. deixa o formulário vazio
}

<!-- HTML: o botão chama a função ao ser clicado -->
<button type="button" class="btn btn-primary" onclick="registrarPedido()">Pedir</button>`,
    ['<code>let pedido = lerPedido();</code>: chama a função, e o que ela <strong>devolve</strong> (<code>return</code>) fica guardado em <code>pedido</code>', '<code>"ped" + Date.now()</code>: junta o texto <code>"ped"</code> com um número que muda a cada instante, formando uma chave diferente a cada pedido', '<strong>A ordem das 3 linhas é a ordem dos acontecimentos.</strong> Troque duas de lugar e o resultado muda', '<code>onclick="registrarPedido()"</code>: no HTML, entre aspas, o <strong>nome da função com parênteses</strong>'],
    'A chave será <code>"p" + crypto.randomUUID()</code> (em vez de <code>"ped" + Date.now()</code>) e as funções são <code>ler</code>, <code>salvarProduto</code> e <code>limparCampos</code>. O botão é o <code>botaoSalvarProduto</code>.');

  ENT['ETAPA 1: criarLinhaHTML(dados), o texto de uma linha'] = exemplo(
    `<p>Esta função <strong>não mexe na página</strong>: ela só <strong>fabrica um texto</strong> (o HTML de uma linha) e o devolve. Para fabricar o texto com os dados dentro, usamos o <strong>template string</strong>: um texto entre <strong>crases</strong> (<code>§ §</code>), no qual tudo que estiver em <code>€{ ... }</code> é <strong>trocado pelo valor</strong>.</p>
     <p style="margin-top:8px">Os dados chegam em um <strong>objeto</strong>: algo como <code>{ nome: "Ana", turma: "B" }</code>. Para ler um campo, usa-se ponto: <code>dados.nome</code>.</p>`,
    `// EXEMPLO: o texto de um item de lista de alunos
function criarItemAluno(dados) {
  return §
    <li id="€{dados.id}">
      €{dados.nome} - Turma €{dados.turma}
      <button onclick="remover('€{dados.id}')">x</button>
    </li>
  §;
}

// COMO SE USA:
criarItemAluno({ id: "a1", nome: "Ana", turma: "B" })
// devolve o TEXTO:  <li id="a1"> Ana - Turma B <button onclick="remover('a1')">x</button> </li>`,
    ['<code>function criarItemAluno(dados)</code>: recebe <strong>um</strong> objeto com os dados de <strong>um</strong> aluno', '<code>return §...§</code>: devolve o texto entre crases (que pode ter várias linhas)', '<code>€{dados.nome}</code>: o JavaScript troca isso pelo valor de <code>dados.nome</code> (aqui, <code>"Ana"</code>)', '<code>remover(\'€{dados.id}\')</code>: repare nas <strong>aspas simples ao redor do id</strong>: no HTML final, o id precisa ficar <strong>entre aspas</strong> (<code>remover(\'a1\')</code>), senão o navegador acha que é uma variável'],
    'Em vez de <code>nome</code> e <code>turma</code>, os campos são <code>produto</code>, <code>valor</code> e <code>descricao</code>. Em vez de <code>&lt;li&gt;</code>, é uma linha de tabela <code>&lt;tr&gt;</code> com <code>&lt;td&gt;</code>. O valor passa por <code>Number(...).toFixed(2).replace(".", ",")</code>: <strong>texto → número → duas casas → vírgula</strong>.');

  ENT['ETAPA 2: atualizarGrid(), percorrer e desenhar'] = exemplo(
    `<p>Esta é a função mais longa do cadastro. Para não se perder, pense nela como <strong>6 passos</strong>: (1) <strong>limpar</strong> o lugar onde vai desenhar, (2) <strong>percorrer</strong> todas as gavetas do localStorage, (3) <strong>pular</strong> as que não são do tipo que queremos, (4) <strong>abrir</strong> a gaveta (converter de texto para array), (5) <strong>organizar</strong> os dados com nomes fáceis, (6) <strong>desenhar</strong> a linha.</p>
     <p style="margin-top:8px">O laço <code>for (let j = 0; j &lt; localStorage.length; j++)</code> visita as gavetas pela <strong>posição</strong> (0, 1, 2...). <code>localStorage.key(j)</code> devolve o <strong>nome</strong> da gaveta na posição <code>j</code>.</p>`,
    `// EXEMPLO: listar os alunos guardados (chaves que começam com "a")
function listarAlunos() {
  const lista = document.querySelector("#listaAlunos");
  lista.innerHTML = "";                                    // 1. limpa

  for (let j = 0; j < localStorage.length; j++) {          // 2. percorre
    let chave = localStorage.key(j);                       //    nome da gaveta j
    if (chave[0] != "a") continue;                         // 3. pula o que não começa com "a"
    let aluno = JSON.parse(localStorage.getItem(chave));   // 4. texto -> array

    const dados = {                                        // 5. nomes fáceis
      nome: aluno[0],
      turma: aluno[1],
      id: chave,
    };
    lista.insertAdjacentHTML("beforeend", criarItemAluno(dados));  // 6. desenha
  }
}`,
    ['<strong>1.</strong> <code>lista.innerHTML = ""</code> esvazia a lista. Sem isso, cada vez que a função rodasse, os alunos seriam <strong>acrescentados de novo</strong> (duplicados)', '<strong>2.</strong> o <code>for</code> repete uma vez para cada gaveta: <code>j</code> vale 0, depois 1, depois 2... até <code>localStorage.length - 1</code>', '<strong>3.</strong> <code>chave[0]</code> é a <strong>primeira letra</strong> da chave. <code>continue</code> diz "pule para a próxima gaveta". Assim, o que <strong>não</strong> é aluno é ignorado', '<strong>4.</strong> <code>localStorage.getItem(chave)</code> devolve o <strong>texto</strong>; <code>JSON.parse</code> o transforma de volta em array', '<strong>5.</strong> o array tem posições numeradas (<code>aluno[0]</code>, <code>aluno[1]</code>); o objeto dá <strong>nomes</strong> (<code>nome</code>, <code>turma</code>) para a função de desenhar usar sem confusão', '<strong>6.</strong> <code>insertAdjacentHTML("beforeend", texto)</code> <strong>acrescenta</strong> o HTML <em>no fim</em> da lista, sem apagar o que já está lá'],
    'Troque <code>listaAlunos</code> por <code>listaProdutos</code>, a letra <code>"a"</code> por <code>"p"</code> e <code>criarItemAluno</code> por <code>criarLinhaHTML</code>. O array tem <strong>3 posições</strong>: nome na <code>[0]</code>, <strong>valor na <code>[1]</code></strong> e descrição na <code>[2]</code> (cuidado com a ordem!).');

  ENT['ETAPA 1: a função validar(situacao)'] = exemplo(
    `<p>Esta função recebe uma <strong>palavra</strong> (<code>"invalido"</code> ou <code>"valido"</code>) e, conforme a palavra, <strong>liga ou desliga uma classe</strong> nos campos. O Bootstrap tem a classe <code>is-invalid</code>, que pinta a borda de vermelho. Para ligar/desligar classes pelo JavaScript existe o <code>classList</code>:</p>
     <ul style="margin:6px 0 0 20px;line-height:1.8;font-size:14px"><li><code>classList.add("x")</code>: <strong>liga</strong> a classe</li><li><code>classList.remove("x")</code>: <strong>desliga</strong></li><li><code>classList.contains("x")</code>: <strong>pergunta</strong> se está ligada (devolve <code>true</code>/<code>false</code>)</li></ul>`,
    `// EXEMPLO: marcar/desmarcar o erro em um campo "idade"
function marcarIdade(situacao) {
  let campo = document.querySelector("#idade");

  if (situacao == "invalido") {
    campo.classList.add("is-invalid");       // borda vermelha
  } else if (situacao == "valido") {
    campo.classList.remove("is-invalid");    // borda normal
  }
}

// COMO SE USA:
marcarIdade("invalido");   // o campo fica vermelho
marcarIdade("valido");     // volta ao normal`,
    ['<code>situacao</code> é um <strong>parâmetro de texto</strong>. A função decide o que fazer <strong>conforme o texto recebido</strong>', '<code>if (situacao == "invalido")</code>: <code>==</code> <strong>compara</strong> (já o <code>=</code> sozinho <em>guarda</em>). Se for verdade, executa o bloco entre chaves', '<code>else if (situacao == "valido")</code>: "senão, se for esta outra palavra..."', '<code>campo.classList.add("is-invalid")</code>: liga a classe, e o Bootstrap pinta a borda'],
    'São <strong>3 campos</strong> em vez de 1 (então 3 linhas dentro de cada bloco). E, no caso <code>"invalido"</code>, há uma condição a mais: <code>&amp;&amp; !campo.classList.contains("is-invalid")</code> ("e o campo ainda <strong>não</strong> está marcado"), só para não repetir o trabalho.');

  ENT['ETAPA 2: só salvar se estiver tudo preenchido'] = exemplo(
    `<p>Aqui você ensina o programa a <strong>tomar uma decisão</strong>: "se estiver tudo preenchido, salva; senão, avisa o erro". O <code>if</code>/<code>else</code> faz isso. Para exigir que <strong>várias coisas sejam verdadeiras ao mesmo tempo</strong>, usamos o <code>&amp;&amp;</code> ("E"):</p>
     <table style="border-collapse:collapse;margin-top:6px;font-size:13px"><tr><th style="border:1px solid var(--border);padding:6px 10px">A</th><th style="border:1px solid var(--border);padding:6px 10px">B</th><th style="border:1px solid var(--border);padding:6px 10px">A &amp;&amp; B</th></tr>
     <tr><td style="border:1px solid var(--border);padding:6px 10px">verdadeiro</td><td style="border:1px solid var(--border);padding:6px 10px">verdadeiro</td><td style="border:1px solid var(--border);padding:6px 10px"><strong>verdadeiro</strong></td></tr>
     <tr><td style="border:1px solid var(--border);padding:6px 10px">verdadeiro</td><td style="border:1px solid var(--border);padding:6px 10px">falso</td><td style="border:1px solid var(--border);padding:6px 10px">falso</td></tr>
     <tr><td style="border:1px solid var(--border);padding:6px 10px">falso</td><td style="border:1px solid var(--border);padding:6px 10px">qualquer</td><td style="border:1px solid var(--border);padding:6px 10px">falso</td></tr></table>`,
    `// EXEMPLO: só registrar o aluno se nome E turma estiverem preenchidos
function registrarAluno() {
  let aluno = lerAluno();                               // ["Ana", "B"]

  if (aluno[0] != "" && aluno[1] != "") {               // nome não vazio E turma não vazia
    guardarAluno("a" + crypto.randomUUID(), aluno);
    limparAluno();
    marcarAluno("valido");
  } else {
    marcarAluno("invalido");                            // algum vazio: só avisa
  }
}`,
    ['<code>aluno[0] != ""</code>: <code>!=</code> significa "é <strong>diferente</strong> de". O nome é diferente de vazio?', '<code>&amp;&amp;</code>: "<strong>e</strong>". As duas partes precisam ser verdadeiras para entrar no bloco', 'Se <strong>entrou</strong> no <code>if</code>: guarda, limpa e tira o aviso de erro', 'Se <strong>não entrou</strong>, cai no <code>else</code>: marca o erro e <strong>não guarda</strong> nada'],
    'Em vez de 2 testes, são <strong>3</strong> (nome, valor, descrição), ligados por dois <code>&amp;&amp;</code>. Aqui o teste <strong>vai dentro</strong> do <code>cadastrar()</code> que você já tem.');

  ENT['ETAPA 1: escrever o controle()'] = exemplo(
    `<p>Imagine o <strong>controle remoto de uma TV</strong>: vários botões, mas todos mandam <strong>ordens</strong> para a mesma TV. A função <code>controle</code> é isso: <strong>uma função só</strong> que recebe <strong>qual ordem</strong> (<code>opcao</code>) e <strong>sobre qual item</strong> (<code>id</code>), e decide o que executar, com <code>if</code> / <code>else if</code>.</p>`,
    `// EXEMPLO: o controle de um painel de luzes
function painel(opcao, comodo) {
  if (opcao == "ligar") {
    console.log("Ligando a luz de: " + comodo);
  } else if (opcao == "desligar") {
    console.log("Desligando a luz de: " + comodo);
  }
}

// COMO SE USA (os botões chamariam assim):
painel("ligar", "sala");        // Ligando a luz de: sala
painel("desligar", "cozinha");  // Desligando a luz de: cozinha
painel("dançar", "sala");       // NADA acontece (opção desconhecida, e sem erro!)`,
    ['<strong>Dois parâmetros:</strong> <code>opcao</code> (o que fazer) e <code>comodo</code> (onde)', '<code>if (opcao == "ligar")</code>: se a ordem for exatamente "ligar", executa este bloco', '<code>else if (opcao == "desligar")</code>: senão, se for "desligar", executa este outro. <strong>Cada <code>else if</code> é uma opção nova</strong> que a função reconhece', 'Uma opção que <strong>não existe</strong> (como "dançar") simplesmente <strong>não faz nada</strong>: por isso, cuidado com erros de digitação nas palavras'],
    'As opções serão <code>"salvar"</code> (com o id <code>"p"</code>, para produto novo) e <code>"listar"</code>. O corpo do <code>"salvar"</code> é o que estava em <code>cadastrar()</code>. Nas próximas aulas, acrescentaremos mais <code>else if</code>: <code>"excluir"</code>, <code>"alterar"</code>, <code>"bloquear"</code>.');

  ENT['ETAPA 1: a função excluirProduto(id)'] = exemplo(
    `<p>Excluir é uma ação <strong>perigosa</strong> (não tem volta), então o programa <strong>pergunta antes</strong>. O <code>confirm("texto")</code> abre uma caixa com OK/Cancelar e <strong>devolve</strong> <code>true</code> (OK) ou <code>false</code> (Cancelar). Guardamos a resposta e só apagamos <strong>se for true</strong>.</p>`,
    `// EXEMPLO: remover um aluno (e a nota dele, que fica em outra gaveta)
function removerAluno(id) {
  let confirma = confirm("Deseja remover o aluno?");   // true ou false
  if (confirma) {
    localStorage.removeItem(id);                        // apaga o aluno
    localStorage.removeItem("n" + id.slice(1));         // apaga também a nota ligada a ele
    listarAlunos();                                     // redesenha a lista
  }
}`,
    ['<code>let confirma = confirm(...)</code>: a caixa aparece e <strong>a resposta fica guardada</strong> em <code>confirma</code>', '<code>if (confirma)</code>: só entra no bloco se a resposta foi <code>true</code>. <strong>Tudo que apaga fica dentro</strong> desse <code>if</code>', '<code>localStorage.removeItem(chave)</code>: apaga a gaveta com esse nome (se não existir, <strong>não dá erro</strong>)', '<code>"n" + id.slice(1)</code>: <code>slice(1)</code> descarta a <strong>primeira letra</strong> do id e o <code>"n"</code> vai no lugar. É assim que se descobre o nome da gaveta "irmã"', 'No fim, <strong>redesenha a lista</strong>: sempre que os dados mudam, a tela precisa ser refeita'],
    'No projeto, a gaveta "irmã" é a cópia do carrinho: troca-se o <code>p</code> inicial por <code>c</code>: <code>"c" + id.slice(1)</code>. E a função que redesenha é a <code>atualizarGrid()</code>.');

  ENT['ETAPA 2: acrescentar a opção "excluir" ao controle'] = exemplo(
    `<p>Acrescentar uma opção ao <code>controle</code> é <strong>só mais um <code>else if</code></strong>. Veja no painel de luzes:</p>`,
    `function painel(opcao, comodo) {
  if (opcao == "ligar") {
    ligarLuz(comodo);
  } else if (opcao == "desligar") {
    desligarLuz(comodo);
  } else if (opcao == "piscar") {          // <- OPÇÃO NOVA: só um else if a mais
    piscarLuz(comodo);
  }
}`,
    ['As opções antigas <strong>continuam como estavam</strong>', 'A nova opção é <strong>mais um bloco</strong>, chamando a função que faz o trabalho de verdade', 'O texto da opção (<code>"piscar"</code>) precisa ser <strong>idêntico</strong> ao que o botão manda no <code>onclick</code>'],
    'A nova opção é <code>"excluir"</code>, e a função chamada é <code>excluirProduto(id)</code>. O botão Excluir da tabela já manda <code>controle(\'excluir\', id)</code>.');

  // ══════════════════════════════════════════════════════
  // REVISÃO (aulas 73 a 85): troca das perguntas mais fracas por cenários, previsão e leitura de código.
  // "trocar" = lista de { i: posição (0 a 9), q: pergunta nova }
  // ══════════════════════════════════════════════════════
  REV[73] = { trocar: [
    { i: 1, q: Q('Você digita loja.com/produtos/xyz e aparece "Não encontrado", com status 404. O que isso diz?', 'O servidor funcionou, mas aquele caminho não existe', 'O servidor caiu', 'O DNS não achou o domínio', 'Sua internet está desligada') },
    { i: 2, q: Q('Você digita lojja.com (com um j a mais) e vê ERR_NAME_NOT_RESOLVED. Onde está o erro?', 'No domínio digitado: o DNS não achou o servidor', 'No caminho da página', 'No código HTML do site', 'No CSS do site') },
    { i: 5, q: Q('No Network, a página tem status 200, mas estilo.css tem status 404. O que isso diz?', 'A página chegou, mas o arquivo de estilo não foi encontrado naquele endereço', 'O servidor inteiro falhou', 'O HTML precisa de JavaScript para ter estilo', 'O DNS falhou só para o CSS') },
    { i: 6, q: Q('O endereço é loja.com/busca?produto=caneta&cor=azul. Quantos pares nome=valor há na query string?', '2', '1', '3', '4') },
    { i: 8, q: Q('Por que uma senha enviada por formulário com GET é um problema?', 'Ela apareceria na URL e no histórico do navegador', 'GET é mais lento que POST', 'O servidor ignora campos enviados por GET', 'O navegador bloqueia formulários GET') },
  ] };
  REV[74] = { trocar: [
    { i: 0, q: Q('Você mudou o título no VS Code, apertou F5 no navegador e nada mudou. O que olhar primeiro?', 'Se o arquivo foi salvo (bolinha na aba) e se é o arquivo certo', 'Reinstalar o navegador', 'Trocar o CSS', 'Apagar a pasta do projeto') },
    { i: 1, q: Q('Na tela aparece o texto <h1>Olá</h1> escrito, em vez de um título grande. O que provavelmente aconteceu?', 'O arquivo foi salvo como .txt (index.html.txt)', 'O h1 não é uma tag válida', 'Faltou o CSS', 'O servidor caiu') },
    { i: 5, q: Q('Em vez de "não", a página mostra "nÃ£o". O que provavelmente falta?', '<meta charset="UTF-8"> no head', 'Um parágrafo', 'Um link', 'O atributo alt') },
    { i: 6, q: Q('Uma pasta chamada "Minha Loja (final)" deu problema em um caminho. Qual boa prática evita isso?', 'Nomes em minúsculas, sem espaços e sem acentos (minha-loja)', 'Usar sempre espaços', 'Usar letras maiúsculas', 'Usar símbolos como @') },
    { i: 7, q: Q('Por que o Live Server é melhor que o duplo clique ao testar um fetch?', 'Serve a página por http://, como um site de verdade, e recarrega ao salvar', 'Publica o site na internet', 'Corrige os erros do código', 'Guarda o histórico de versões') },
  ] };
  REV[75] = { trocar: [
    { i: 0, q: Q('Em paginas/contato.html há <img src="imagens/logo.png"> e a imagem quebrou. Qual é a causa?', 'O caminho é relativo à página: precisa de ../imagens/logo.png', 'O PNG não funciona em páginas HTML', 'A pasta imagens está sempre vazia', 'Faltou o alt') },
    { i: 3, q: Q('No Network aparece Foto.JPG com 404, e o arquivo da pasta é foto.jpg. O que fazer?', 'Escrever o nome exatamente igual (ou padronizar tudo em minúsculas)', 'Trocar o formato para PNG', 'Aumentar a imagem', 'Recarregar até funcionar') },
    { i: 5, q: Q('A index.html está na raiz e você quer um link para paginas/contato.html. Qual é o href?', 'paginas/contato.html', '../paginas/contato.html', '/contato.html', 'contato.html') },
    { i: 6, q: Q('O que o navegador faz ao clicar em <a href="https://exemplo.com" target="_blank">?', 'Abre o link em uma nova aba', 'Abre na mesma aba, substituindo a página', 'Baixa o arquivo', 'Fecha a página atual') },
  ] };
  REV[76] = { trocar: [
    { i: 0, q: Q('Um usuário cego navega pela página usando um leitor de tela. Qual destes é um problema para ele?', 'Imagens importantes sem texto alternativo (alt)', 'Cores escuras no fundo', 'Fonte com serifa', 'A página ter muitos parágrafos') },
    { i: 1, q: Q('Um menu feito com <div class="menu"> será trocado por <nav>. O que se ganha?', 'O leitor de tela passa a reconhecer a área como navegação e permite pular direto para ela', 'O menu fica azul', 'O menu carrega mais rápido', 'O CSS deixa de ser necessário') },
    { i: 4, q: Q('Uma página tem h1, h4 e h2 nessa ordem. Qual é o problema?', 'Pula níveis de título e confunde a estrutura', 'Não há problema algum', 'Só pode haver h1 e h2', 'h4 não existe') },
    { i: 8, q: Q('Um <div onclick="..."> funciona com o mouse, mas não com o teclado. Como corrigir?', 'Trocar por <button>, que recebe foco e responde a Enter e espaço', 'Pintar o div de outra cor', 'Aumentar o tamanho do div', 'Remover o onclick') },
  ] };
  REV[77] = { trocar: [
    { i: 1, q: Q('O usuário aumenta a fonte base do navegador de 16px para 20px. Que título muda de tamanho?', 'O de 2rem (vai para 40px); o de 32px continua 32px', 'Os dois mudam', 'Nenhum dos dois', 'Só o de 32px') },
    { i: 3, q: Q('Um parágrafo de texto longo está difícil de ler, com as linhas coladas. Qual propriedade ajuda mais?', 'line-height: 1.6', 'color: red', 'text-transform: uppercase', 'border: 1px solid') },
    { i: 5, q: Q('p { font-size: 18; } e o texto não muda. Como descobrir o motivo?', 'No painel Styles, a linha aparece riscada, pois falta a unidade (px, rem...)', 'Olhando a aba Network', 'Reiniciando o navegador', 'Procurando um erro vermelho no console') },
    { i: 7, q: Q('Texto cinza claro (#ccc) sobre fundo branco. Qual problema isso provoca?', 'Contraste baixo: quem tem baixa visão não consegue ler', 'O texto some em dispositivos móveis', 'O navegador bloqueia a cor', 'Nenhum problema, cinza é neutro') },
  ] };
  REV[78] = { trocar: [
    { i: 1, q: Q('Um card tem width: 300px, padding: 10px e border: 2px (content-box). Qual espaço horizontal total ele ocupa?', '324px', '300px', '312px', '320px') },
    { i: 2, q: Q('Mesmo card, mas com box-sizing: border-box. Qual espaço horizontal total?', '300px', '324px', '312px', '320px') },
    { i: 6, q: Q('Um <span> recebe width: 200px e nada acontece. Como resolver?', 'Mudar o display para inline-block (ou block)', 'Trocar o span por um parágrafo sem mudar o CSS', 'Escrever 200 em vez de 200px', 'Aumentar o padding') },
    { i: 9, q: Q('Para esconder um elemento e liberar o espaço que ele ocupava, usa-se:', 'display: none', 'visibility: hidden', 'opacity: 0', 'color: transparent') },
  ] };
  REV[79] = { trocar: [
    { i: 0, q: Q('Três cards dentro de uma <div class="lista"> estão empilhados. Onde colocar display: flex para ficarem lado a lado?', 'Em .lista (o pai)', 'Em cada card', 'No body somente', 'Na tag html') },
    { i: 3, q: Q('Um menu tem justify-content: space-between com 3 links. O que acontece com o primeiro e o último?', 'Ficam nas pontas, com espaço igual entre os três', 'Ficam juntos no centro', 'Ficam no início, colados', 'Ficam empilhados') },
    { i: 4, q: Q('Com flex-direction: column, qual propriedade distribui os itens na vertical?', 'justify-content', 'align-items', 'gap', 'flex-wrap') },
    { i: 9, q: Q('Três itens com flex: 1 em um pai de 600px (sem gap). Quanto mede cada item?', '200px', '600px', '100px', '300px') },
  ] };
  REV[80] = { trocar: [
    { i: 1, q: Q('Cards em uma div estão em coluna, mesmo com display: grid e grid-template-columns nos cards. Qual é o erro?', 'As propriedades do grid devem ficar no pai, e não nos filhos', 'O grid não funciona com cards', 'Faltou o gap', 'Faltou o flex') },
    { i: 4, q: Q('grid-template-columns: 1fr 3fr em uma página de 800px (sem gap). Quanto mede a segunda coluna?', '600px', '400px', '200px', '267px') },
    { i: 5, q: Q('Em telas grandes a vitrine tem 5 colunas e no celular 1, sem media query. Qual regra faz isso?', 'repeat(auto-fill, minmax(200px, 1fr))', 'repeat(5, 1fr)', 'grid-template-columns: 200px', 'display: flex') },
    { i: 8, q: Q('Um destaque precisa ocupar 2 das 3 colunas. Qual regra?', 'grid-column: span 2', 'width: 2', 'columns: 2', 'flex: 2') },
  ] };
  REV[81] = { trocar: [
    { i: 1, q: Q('Um selo "NOVO" (position: absolute) aparece no canto da PÁGINA, e não do card. O que falta?', 'position: relative no card (o pai)', 'z-index no selo', 'display: flex no card', 'float no selo') },
    { i: 4, q: Q('Um menu com z-index: 100 continua atrás de outro elemento. Qual é a causa provável?', 'O menu está com position: static, e o z-index não vale', 'O número é pequeno demais', 'O z-index só vale em imagens', 'O navegador ignora z-index') },
    { i: 6, q: Q('Um usuário só usa o teclado e não vê qual botão está selecionado. O que deve existir no CSS?', 'Um estilo para :focus (ou :focus-visible)', 'Um estilo para :hover', 'Um estilo para :first-child', 'Um estilo para :visited') },
    { i: 7, q: Q('Um botão muda de cor com um salto brusco ao passar o mouse. Qual propriedade suaviza a mudança?', 'transition', 'transform: none', 'opacity', 'display') },
  ] };
  REV[82] = { trocar: [
    { i: 2, q: Q('No computador a página está ótima, mas no celular tudo aparece minúsculo, como se a página inteira estivesse encolhida. Causa provável?', 'Falta a meta viewport no head', 'Falta o CSS', 'O JavaScript está quebrado', 'O celular não suporta HTML') },
    { i: 3, q: Q('@media (max-width: 500px) { .menu { flex-direction: column; } }. O que isso faz?', 'Em telas de até 500px, o menu fica em coluna', 'Em telas acima de 500px, o menu fica em coluna', 'O menu tem sempre 500px', 'Remove o menu') },
    { i: 5, q: Q('A media query está no começo do CSS e uma regra .menu igual vem depois. Em tela pequena, qual regra vale?', 'A que vem depois (a de fora da media query)', 'A media query, sempre', 'Nenhuma: dá conflito', 'Depende do navegador') },
    { i: 8, q: Q('Uma foto de 1500px de largura estoura a tela do celular. Qual regra resolve?', 'img { max-width: 100%; height: auto; }', 'img { width: 1500px; }', 'img { display: none; }', 'img { overflow: hidden; }') },
  ] };
  REV[83] = { trocar: [
    { i: 2, q: Q('let total = 0; for (let i = 1; i <= 4; i++) { total = total + i; } Quanto vale total?', '10', '6', '4', '15') },
    { i: 3, q: Q('let i = 0; while (i < 3) { console.log(i); } O que acontece?', 'Laço infinito: o i nunca muda, e a página trava', 'Mostra 0, 1 e 2', 'Mostra 0 uma vez', 'Dá SyntaxError') },
    { i: 4, q: Q('Em for (let i = 0; i < 10; i++) { if (i === 3) break; console.log(i); } o que aparece?', '0, 1 e 2', '0 a 9', '0 a 3', '3') },
    { i: 5, q: Q('Em for (let i = 0; i < 5; i++) { if (i === 2) continue; console.log(i); } o que aparece?', '0, 1, 3 e 4', '0, 1', '2', '0 a 4') },
  ] };
  REV[84] = { trocar: [
    { i: 0, q: Q('Você quer uma lista só com os NOMES dos produtos de [{nome:"A", preco:5}, {nome:"B", preco:9}]. Qual método?', 'produtos.map((p) => p.nome)', 'produtos.filter((p) => p.nome)', 'produtos.find((p) => p.nome)', 'produtos.reduce((p) => p.nome)') },
    { i: 1, q: Q('Você quer só os produtos com preço menor que 6. Qual método?', 'filter', 'map', 'reduce', 'push') },
    { i: 2, q: Q('Você quer o produto com id 2 (um só, e sem criar array). Qual método?', 'find', 'filter', 'map', 'reduce') },
    { i: 3, q: Q('Você quer o total em R$ de todos os preços. Qual método?', 'reduce', 'map', 'find', 'filter') },
  ] };
  REV[85] = { trocar: [
    { i: 0, q: Q('function f() { let a = 1; } f(); console.log(a); O que acontece?', 'ReferenceError: a is not defined', 'Mostra 1', 'Mostra undefined', 'Mostra null') },
    { i: 1, q: Q('if (true) { let x = 5; } console.log(x); O que acontece?', 'ReferenceError: x is not defined', 'Mostra 5', 'Mostra undefined', 'Mostra true') },
    { i: 4, q: Q('const taxa = 0.1; taxa = 0.2; O que acontece?', 'TypeError: Assignment to constant variable', 'taxa passa a valer 0.2', 'taxa vale 0.3', 'Nada acontece') },
    { i: 9, q: Q('Em let preco = 100 * 0.9;, qual é a melhor forma de deixar claro de onde vem o 0.9?', 'const DESCONTO = 0.1; e usar (1 - DESCONTO)', 'Colocar um comentário dizendo "mágica"', 'Trocar 0.9 por 90 / 100', 'Apagar a variável') },
  ] };

  // ══════════════════════════════════════════════════════
  // REVISÃO (aulas 86 a 92 e 99 a 106): cenários no lugar de definições
  // ══════════════════════════════════════════════════════
  REV[86] = { trocar: [
    { i: 0, q: Q('let itens = ["A","B","C"]; itens.splice(1, 1); O que sobra em itens?', '["A","C"]', '["B"]', '["A","B"]', '["C"]') },
    { i: 2, q: Q('A função desenhar() não limpa a lista antes de desenhar. Com 2 itens, ela é chamada 3 vezes. Quantos li aparecem?', '6', '2', '3', '0') },
    { i: 3, q: Q('Um item foi tirado da tela com li.remove(), mas continua no array. Ao adicionar outro item e chamar desenhar(), o que acontece?', 'O item removido reaparece', 'Nada, o array se corrige', 'A tela trava', 'O novo item não aparece') },
    { i: 8, q: Q('Qual é a ordem segura ao clicar em Remover?', 'Tirar o item do array e depois redesenhar a lista', 'Remover só o li e confiar que o array acompanha', 'Redesenhar e depois tirar do array', 'Recarregar a página') },
  ] };
  REV[87] = { trocar: [
    { i: 0, q: Q('O formulário não tem preventDefault no submit. O que o usuário vê ao clicar em Enviar?', 'A página recarrega e os campos vão para a URL', 'Nada acontece', 'Um alerta do navegador', 'Os campos são salvos no localStorage') },
    { i: 3, q: Q('let ok = true; if (nome.length < 3) ok = false; if (!email.includes("@")) ok = false; Com nome "Ana" e email "ana.com", quanto vale ok?', 'false', 'true', 'null', 'undefined') },
    { i: 5, q: Q('O que faz campo.classList.add("invalido")?', 'Liga a classe CSS que marca o campo como inválido', 'Apaga o campo', 'Valida o campo sozinho', 'Troca o id do campo') },
    { i: 6, q: Q('Por que mostrar o erro ao lado de CADA campo, e não só um alerta?', 'O usuário vê exatamente o que corrigir, sem perder o contexto', 'Porque alert não existe', 'Porque o CSS exige', 'Para o código ficar menor') },
  ] };
  REV[88] = { trocar: [
    { i: 4, q: Q('removerTarefa usa filter((t) => t.id !== id). Com ids [1, 2, 3] e id = 2, o que resta?', '[1, 3]', '[2]', '[1, 2]', '[3]') },
    { i: 8, q: Q('Com tarefas = [{id:1, concluida:false}, {id:2, concluida:true}], quanto vale tarefas.filter((t) => !t.concluida).length?', '1', '0', '2', '3') },
  ] };
  REV[89] = { trocar: [
    { i: 0, q: Q('O estilo.css retorna 404, mas no Elements o HTML está correto. O que isso diz?', 'O problema está no arquivo CSS (nome ou caminho), e não no HTML', 'O HTML está errado', 'O servidor travou', 'O navegador bloqueou o CSS') },
    { i: 1, q: Q('Você quer ver quanto tempo levou para carregar cada arquivo da página. Qual aba?', 'Network', 'Elements', 'Application', 'Console') },
    { i: 5, q: Q('Você mudou o CSS, deu F5, e no Network o estilo.css aparece como (disk cache). Qual é a solução?', 'Recarregar com Ctrl+F5 (ou marcar Disable cache)', 'Reinstalar o navegador', 'Trocar o CSS', 'Apagar o HTML') },
    { i: 6, q: Q('Você quer apagar uma chave do localStorage sem escrever código. Onde?', 'Application, na lista do Local Storage', 'Network', 'Elements', 'Console apenas') },
  ] };
  REV[90] = { trocar: [
    { i: 0, q: Q('O código pausou dentro de um laço que soma preços. Qual tecla executa só a linha atual e vai para a próxima?', 'F10', 'F8', 'F5', 'F12') },
    { i: 2, q: Q('Você quer pausar o código só quando o preço de um item passar de 100. Qual recurso usar?', 'Breakpoint condicional', 'Breakpoint simples', 'console.clear()', 'F12') },
    { i: 4, q: Q('No Scope, total vale "010" (com aspas) na segunda volta. O que isso indica?', 'O total virou texto (concatenação), e não número', 'O total está correto', 'O laço terminou', 'O total não existe') },
    { i: 8, q: Q('Depois de achar o bug, o que fazer com as instruções debugger; do código?', 'Remover antes de entregar', 'Deixar para ajudar o usuário', 'Trocar por comentários HTML', 'Trocar por alert') },
  ] };
  REV[91] = { trocar: [
    { i: 0, q: Q('Você guardou o filtro atual no sessionStorage, fechou a aba e abriu o site de novo. O que aparece?', 'O filtro foi perdido (getItem devolve null)', 'O filtro continua', 'Dá erro', 'O localStorage é apagado') },
    { i: 2, q: Q('O tema (claro/escuro) escolhido pelo usuário deve valer semanas depois. Onde guardar?', 'No localStorage', 'No sessionStorage', 'Em uma variável do JavaScript', 'No CSS') },
    { i: 5, q: Q('Aparece "exceeded the quota" ao guardar imagens grandes com setItem. O que fazer?', 'Guardar menos dados (não guardar imagens grandes) e proteger com try/catch', 'Trocar let por const', 'Reiniciar o computador', 'Usar innerHTML') },
  ] };
  REV[92] = { trocar: [
    { i: 0, q: Q('Um aluno cadastra um produto com nome <img src=x onerror=alert("oi")>. A loja usa innerHTML += "<h3>" + nome + "</h3>". O que acontece ao desenhar?', 'O alerta executa', 'Aparece o texto escrito', 'Nada', 'O produto não é salvo') },
    { i: 5, q: Q('A mesma loja troca innerHTML por textContent. O que o usuário vê?', 'O texto <img ...> escrito na tela, sem executar', 'O alerta', 'Uma imagem quebrada', 'Nada') },
    { i: 6, q: Q('Qual destes é o risco de dados vindos de uma API serem inseridos com innerHTML?', 'A API (ou um atacante) pode mandar código que o navegador executa', 'A API fica lenta', 'O JSON deixa de funcionar', 'Não há risco, APIs são sempre confiáveis') },
  ] };
  REV[99] = { trocar: [
    { i: 1, q: Q('setTimeout(() => console.log("B"), 1000); console.log("A"); O que aparece, e quando?', 'A imediatamente e B depois de 1 segundo', 'B e depois A', 'A e B ao mesmo tempo', 'Só A') },
    { i: 6, q: Q('Um programador esquece o clearInterval de um setInterval que mostra a hora. O que acontece?', 'Continua repetindo para sempre', 'Para sozinho depois de 10 vezes', 'Dá erro', 'Mostra só uma vez') },
    { i: 9, q: Q('let ok = false; setTimeout(() => { ok = true; }, 500); console.log(ok); O que aparece?', 'false', 'true', 'undefined', 'Dá erro') },
  ] };
  REV[100] = { trocar: [
    { i: 0, q: Q('Qual destes endereços provavelmente devolve dados (JSON) em vez de uma página?', 'https://jsonplaceholder.typicode.com/users/1', 'https://www.google.com', 'file:///C:/projeto/index.html', 'https://exemplo.com/sobre.html') },
    { i: 2, q: Q('fetch(url).then((r) => r.json()).then((d) => console.log(d.name)). Para que serve o primeiro .then?', 'Converter a resposta em objeto JSON', 'Mostrar o nome', 'Tratar o erro', 'Esperar o usuário clicar') },
    { i: 9, q: Q('A API devolve [{name:"Ana"},{name:"Beto"}]. Como mostrar os nomes na página com segurança?', 'for...of com createElement e textContent', 'innerHTML concatenando os nomes', 'document.write', 'eval') },
  ] };
  REV[104] = { trocar: [
    { i: 0, q: Q('async function f() { let r = await fetch(url); console.log("A"); } f(); console.log("B"); Qual é a ordem?', 'B e depois A', 'A e depois B', 'Só A', 'Só B') },
    { i: 1, q: Q('Em qual código o await está correto?', 'async function f() { let r = await fetch(url); }', 'function f() { let r = await fetch(url); }', 'async await function f() { }', 'function f(await) { }') },
    { i: 4, q: Q('Dentro de try { await fetch(url) } catch (e) { ... }, o que acontece se a internet cair?', 'O catch é executado', 'O programa trava sem aviso', 'O try repete sozinho', 'O await ignora o erro') },
  ] };
  REV[105] = { trocar: [
    { i: 0, q: Q('Você apagou sem querer uma função que funcionava ontem, mas fez commit ontem. O que o Git permite?', 'Voltar ao commit de ontem e recuperar o código', 'Nada: só o GitHub guarda cópias', 'Recuperar só se o editor ainda estiver aberto', 'Pedir o código ao servidor') },
    { i: 4, q: Q('git status mostra "Changes to be committed". Qual comando provavelmente já foi executado?', 'git add .', 'git init', 'git push', 'git clone') },
    { i: 9, q: Q('Um arquivo .env com uma chave de API foi enviado a um repositório público. O que fazer?', 'Considerar a chave vazada, gerar outra e remover do repositório', 'Apagar só o arquivo e seguir usando a mesma chave', 'Nada, ninguém vai ver', 'Renomear o arquivo') },
  ] };
  REV[106] = { trocar: [
    { i: 0, q: Q('Você publicou no GitHub Pages e a página abre sem CSS. No Network, estilo.css tem 404. Qual é uma causa comum?', 'Caminho absoluto (/estilo.css) ou nome com maiúsculas diferentes', 'O GitHub bloqueia CSS', 'O Pages só aceita HTML', 'O CSS precisa estar no README') },
  ] };

  // ══════════════════════════════════════════════════════════════════════
  // MÓDULO 8 · SISTEMA PRW (a loja da turma), passo a passo, arquivo por arquivo
  //
  //   html/index.html  html/gerenciarProdutos.html  html/carrinho.html
  //   css/estilo.css
  //   js/menu.js  js/gerenciarProdutos.js  js/loja.js  js/carrinho.js
  //
  // Dados: produto = ["nome", "valor", "descrição"] guardado em "p" + UUID; carrinho = mesma coisa em "c" + o resto do id.
  // HTML e Bootstrap: o aluno digita a estrutura, entendendo cada classe. JavaScript: esqueletos com lacunas, testes e dicas.
  // ══════════════════════════════════════════════════════════════════════
  var M8 = [93, 94, 119, 120, 70, 95, 121, 122, 123, 72, 124, 125, 71, 96, 97, 126, 98];
  M8.forEach(substituir);
  var BOOT = '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous" />';

  // ══════════════════════════════════════════════════════
  // 93 — LOJA 1: O PROJETO, AS PASTAS E OS ARQUIVOS
  // ══════════════════════════════════════════════════════
  PRAT[93] = { tarefas: ['<strong>Checkpoint.</strong> A pasta <code>projeto-prw</code> tem as subpastas <code>html</code>, <code>css</code> e <code>js</code> e os <strong>8 arquivos</strong> com os nomes exatos (maiúsculas contam).', '<strong>Checkpoint.</strong> No console, <code>JSON.parse(JSON.stringify(["Caneta","3.5","Azul"]))[1]</code> mostra <code>"3.5"</code> e você sabe explicar por que é <strong>texto</strong>.', '<strong>Checkpoint.</strong> O botão de teste do Bootstrap aparece azul e arredondado; sem a classe, volta ao botão comum.', '<strong>Checkpoint.</strong> Cada arquivo <code>.js</code> tem um comentário no topo com as funções que ele terá.', '<strong>Explique:</strong> com suas palavras, para que serve cada um dos 8 arquivos e por que as chaves começam com <code>p</code> e <code>c</code>.'],
    desafio: '<strong>Desafio.</strong> Sem olhar a aula, desenhe no caderno o <strong>mapa do sistema</strong>: as 3 páginas, os 4 scripts, quem usa quem e onde os dados ficam guardados. Mostre ao professor.' };
  A(93, 'Loja 1: O Projeto, as Pastas e os Arquivos', 'Entender o que vamos construir, criar a estrutura de pastas e arquivos, conhecer o formato dos dados e o Bootstrap', '🗺️', [
    P('💡', 'ENTENDA: o que é o Sistema PRW',
      `<p>Nas próximas aulas, você vai construir uma <strong>loja completa</strong> que funciona só no navegador (sem servidor). Ela tem <strong>três telas</strong> e <strong>quatro scripts</strong>:</p>`,
      `<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;margin-top:10px;font-size:13px"><tr><th style="padding:8px;border:1px solid var(--border);background:rgba(79,142,247,.15);text-align:left">Arquivo</th><th style="padding:8px;border:1px solid var(--border);background:rgba(79,142,247,.15);text-align:left">Para que serve</th></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)"><code>html/index.html</code></td><td style="padding:8px;border:1px solid var(--border)">A <strong>loja</strong>: vitrine com os produtos em cards e o botão Comprar</td></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)"><code>html/gerenciarProdutos.html</code></td><td style="padding:8px;border:1px solid var(--border)">Cadastro de produtos + tabela com Alterar e Excluir</td></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)"><code>html/carrinho.html</code></td><td style="padding:8px;border:1px solid var(--border)">Itens comprados, total e botão Remover</td></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)"><code>css/estilo.css</code></td><td style="padding:8px;border:1px solid var(--border)">Estilos <strong>nossos</strong>, além do Bootstrap</td></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)"><code>js/menu.js</code></td><td style="padding:8px;border:1px solid var(--border)">A barra de menu, escrita <strong>uma vez</strong> e usada nas 3 páginas</td></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)"><code>js/gerenciarProdutos.js</code></td><td style="padding:8px;border:1px solid var(--border)">Toda a lógica do cadastro (ler, salvar, listar, validar, alterar, excluir, bloquear)</td></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)"><code>js/loja.js</code></td><td style="padding:8px;border:1px solid var(--border)">Desenha os cards da vitrine e faz o Comprar</td></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)"><code>js/carrinho.js</code></td><td style="padding:8px;border:1px solid var(--border)">Desenha o carrinho, soma o total e faz o Remover</td></tr></table></div>`,
      analogia(`é uma <strong>casa com três cômodos</strong> (as páginas) ligados por um <strong>corredor</strong> (o menu). Os dados ficam em um <strong>armário compartilhado</strong> (o localStorage): quem cadastra um produto guarda nele, e a loja e o carrinho <em>leem</em> o mesmo armário.`),
      box('azul', `<strong>Como as aulas funcionam:</strong> nada de código pronto para copiar. Em cada etapa você vê <strong>o que fazer</strong>, <strong>por quê</strong>, um <strong>esqueleto</strong> (as lacunas <code>___</code> são com você), <strong>como testar</strong> e <strong>dicas escondidas</strong>. O HTML e as classes do Bootstrap você digita <em>entendendo cada uma</em>.`),
      caderno(['3 páginas + 4 scripts + 1 CSS', 'Os dados ficam no localStorage e são lidos pelas 3 páginas', 'Menu escrito uma vez só (menu.js)'])),
    etapa('📁', 'ETAPA 1: criar a pasta do projeto e os arquivos',
      'Antes de escrever código, a <strong>organização</strong>. Cada tipo de arquivo mora em uma pasta.',
      ['Crie uma pasta chamada <code>projeto-prw</code> e abra-a no VS Code (<strong>File → Open Folder</strong>)', 'Dentro dela, crie três subpastas: <code>html</code>, <code>css</code> e <code>js</code>', 'Crie os <strong>8 arquivos vazios</strong> nas pastas certas (veja a estrutura esperada)', 'Atenção aos nomes: <code>gerenciarProdutos</code> tem <strong>P maiúsculo</strong>'],
      `projeto-prw/
  html/
    index.html
    gerenciarProdutos.html
    carrinho.html
  css/
    estilo.css
  js/
    menu.js
    gerenciarProdutos.js
    loja.js
    carrinho.js`,
      ['No painel lateral do VS Code aparece exatamente essa árvore', 'Nenhum arquivo está fora de sua pasta', 'Os nomes batem letra por letra (você vai usá-los em <code>src</code> e <code>href</code> depois)'],
      ['No VS Code, o ícone de pasta com "+" cria subpasta e o de arquivo com "+" cria arquivo. Clique <strong>com o botão direito</strong> na pasta certa antes de criar.', 'Se criou um arquivo na pasta errada, arraste-o para a pasta correta.', 'O Windows pode esconder as extensões: confira que o arquivo se chama <code>index.html</code> e não <code>index.html.txt</code> (aula "Ambiente de Trabalho").']),
    etapa('🧬', 'ETAPA 2: como os dados são guardados (no console)',
      'Antes de programar, entenda <strong>o formato</strong> dos dados. Um produto é um <strong>array com 3 posições</strong>: posição 0 = nome, 1 = valor, 2 = descrição. <strong>Preveja</strong> no caderno o resultado de cada linha, e depois teste no <strong>console</strong> (F12).',
      ['Escreva no caderno o que você acha que cada linha mostra', 'Rode uma por vez no console e compare', 'Responda: por que o valor continua <strong>texto</strong> depois de ir e voltar do JSON?'],
      `let produto = ["Caneta", "3.5", "Azul, ponta fina"];
produto[0]
produto[1]
let texto = JSON.stringify(produto);
texto
typeof texto
JSON.parse(texto)[2]
crypto.randomUUID()
let id = "p" + crypto.randomUUID();
id
"c" + id.slice(1)`,
      ['<code>texto</code> → <code>\'["Caneta","3.5","Azul, ponta fina"]\'</code> e o <code>typeof</code> é <code>"string"</code>', '<code>crypto.randomUUID()</code> → algo como <code>"3f2a9c1e-7b4d-4c2a-9e1f-0a5b6c7d8e9f"</code> (um <strong>identificador único</strong>, diferente a cada vez)', '<code>id</code> → <code>"p3f2a…"</code> e <code>"c" + id.slice(1)</code> → <code>"c3f2a…"</code>: <strong>a mesma parte, só trocando a primeira letra</strong>'],
      ['O localStorage só guarda <strong>texto</strong>. O <code>JSON.stringify</code> transforma o array em texto e o <code>JSON.parse</code> transforma de volta em array.', 'O valor foi digitado como <code>"3.5"</code> (entre aspas), então continua texto. Para calcular, será preciso <code>Number(...)</code>.', '<strong>Por que o id começa com a letra "p"?</strong> Porque o id será usado como <code>id</code> em tags HTML e em seletores (<code>#id</code>), e <strong>um id não pode começar com número</strong>. Um UUID pode começar com número; a letra resolve.']),
    etapa('🎨', 'ETAPA 3: conhecendo o Bootstrap',
      'O <strong>Bootstrap</strong> é uma coleção de <strong>estilos prontos</strong> (CSS) que usamos por <strong>nomes de classe</strong>: <code>btn btn-primary</code> já dá um botão azul, arredondado, com efeito ao passar o mouse. Ele é carregado pela internet (<strong>CDN</strong>), sem instalar nada.',
      ['Crie um arquivo de teste <code>teste.html</code> (pode apagar depois) com o esqueleto do HTML', 'Dentro do <code>head</code>, cole o <code>&lt;link&gt;</code> do Bootstrap (abaixo)', 'No <code>body</code>, coloque um botão com <code>class="btn btn-primary"</code>', 'Abra no navegador, depois <strong>apague a classe</strong> e veja a diferença'],
      `${BOOT}
<!-- href: de onde vem o CSS · rel="stylesheet": é uma folha de estilos
     integrity: confere se o arquivo não foi adulterado · crossorigin: exigência do integrity -->

<button class="___ ___">Teste</button>`,
      ['Com as classes, o botão fica <strong>azul e arredondado</strong>', 'Sem as classes, volta ao botão cinza padrão do navegador', 'F12 → Network: o arquivo <code>bootstrap.min.css</code> aparece com status <code>200</code>'],
      ['O Bootstrap usa <strong>duas classes</strong> no botão: a base (<code>btn</code>) e a cor (<code>btn-primary</code>). Outras cores: <code>btn-danger</code> (vermelho), <code>btn-warning</code> (amarelo).', 'Se o botão não ficou azul, abra o Network: se o Bootstrap está vermelho/bloqueado, confira o <code>link</code> (<strong>um caractere errado no integrity bloqueia o CSS inteiro</strong>) e a internet.', 'Copie o <code>link</code> exatamente como está (é o <strong>único</strong> trecho em que copiar é o certo: o hash precisa ser idêntico).']),
    etapa('📝', 'ETAPA 4: o plano das funções',
      'Quem planeja antes erra menos. Escreva, no <strong>topo de cada arquivo .js</strong>, um comentário com as funções que ele vai ter (você as construirá nas próximas aulas).',
      ['<code>gerenciarProdutos.js</code>: <code>ler</code>, <code>limparCampos</code>, <code>validar</code>, <code>controle</code>, <code>salvarProduto</code>, <code>excluirProduto</code>, <code>lerProduto</code>, <code>atualizarProduto</code>, <code>cancelar</code>, <code>bloquear</code>, <code>criarLinhaHTML</code>, <code>atualizarGrid</code>', '<code>loja.js</code>: <code>criarCardHTML</code> e <code>carrinho</code>', '<code>carrinho.js</code>: <code>criarLinhaHTML</code>, <code>listar</code> e <code>remover</code>', '<code>menu.js</code>: preenche o <code>menuPrincipal</code>'],
      `// gerenciarProdutos.js
// Funções que este arquivo terá:
//   ler()            -> lê o formulário e devolve um array
//   ___()            -> esvazia os campos
//   ___              -> ...escreva as demais`,
      ['Cada <code>.js</code> tem no topo um comentário com a lista de funções e <strong>uma frase</strong> sobre o que cada uma faz', 'Você consegue dizer, olhando o plano, quais funções se repetem de arquivo em arquivo'],
      ['Não precisa acertar as frases agora: escreva o que <strong>imagina</strong> que cada função faz. Ao fim do módulo, volte aqui e confira.', 'Repare: <code>criarLinhaHTML</code> aparece em <strong>dois</strong> arquivos. Como cada página carrega só um deles, não há conflito.', 'Modelo: <code>//   salvarProduto(id, produto) -> guarda no localStorage</code>']),
    P('🐞', 'ENCONTRE O ERRO: os tropeços do primeiro dia',
      lista(['<strong>O Bootstrap não aparece:</strong> sem internet, ou o <code>integrity</code> está com um caractere diferente. No Network, o <code>bootstrap.min.css</code> fica vermelho. A mensagem no console: <em>"Failed to find a valid digest in the \'integrity\' attribute"</em>', '<strong>Cada página está em <code>html/</code> e o CSS em <code>css/</code>:</strong> o caminho a partir da página é <code>../css/estilo.css</code> (o <code>../</code> sobe uma pasta)', '<strong>Um arquivo "não carrega" (404 no Network):</strong> nome com maiúscula diferente, ou o arquivo está em outra pasta', '<strong>O arquivo ficou como <code>nome.html.txt</code>:</strong> o Windows esconde extensões. Ative "Extensões de nomes de arquivos" no Explorador']),
      box('verde', `<strong>Provoque cada um</strong> (por exemplo, apague um caractere do <code>integrity</code> no <code>teste.html</code>) e veja o sintoma no Network e no Console. Quem já viu o erro antes não se assusta depois.`)),
    P('🏁', 'CHECKPOINT e DESAFIO',
      lista(['☐ Pasta <code>projeto-prw</code> com <code>html</code>, <code>css</code> e <code>js</code> e os 8 arquivos', '☐ Você sabe explicar o formato <code>["nome","valor","descrição"]</code> e a chave <code>"p" + UUID</code>', '☐ O botão de teste do Bootstrap funciona', '☐ Cada <code>.js</code> tem o plano de funções no topo']),
      box('verde', `<strong>Explique com suas palavras:</strong> para que serve cada arquivo e por que o menu fica em um arquivo <code>.js</code> separado (dica: o que acontece quando você precisa mudar um link do menu?).`)),
  ], [
    Q('Qual é a função do arquivo js/menu.js neste projeto?', 'Escrever a barra de menu uma só vez e usá-la nas 3 páginas', 'Guardar os produtos', 'Calcular o total do carrinho', 'Aplicar o Bootstrap'),
    Q('Como o produto "Caneta", de valor 3.5 e descrição "Azul", é guardado no localStorage?', 'Como texto JSON de um array: ["Caneta","3.5","Azul"]', 'Como um número 3.5', 'Como objeto {nome, valor}', 'Como o texto Caneta'),
    Q('JSON.parse(JSON.stringify(["Caneta","3.5","Azul"]))[1] devolve:', '"3.5" (texto)', '3.5 (número)', '"Caneta"', 'undefined'),
    Q('O id do produto é "p" + crypto.randomUUID(). Por que a letra p na frente?', 'Um id de HTML não pode começar com número, e o UUID pode', 'Porque o UUID não existe sem p', 'Para o localStorage aceitar a chave', 'Para o id ficar mais curto'),
    Q('Qual é a chave do carrinho do produto "p3f2a-91"?', '"c3f2a-91"', '"p3f2a-91"', '"cp3f2a-91"', '"carrinho"'),
    Q('O que o Bootstrap fornece quando você escreve class="btn btn-primary"?', 'Um botão azul e arredondado, sem você escrever CSS', 'Um botão que salva dados', 'Um botão que muda de página', 'Um botão que só funciona com JavaScript'),
    Q('O Bootstrap não aparece e o console fala de "integrity". Qual é a causa provável?', 'O hash do integrity foi digitado diferente (ou o link está incompleto)', 'O navegador está desatualizado', 'O localStorage está cheio', 'Falta o arquivo estilo.css'),
    Q('Dentro de html/index.html, qual é o caminho para o CSS que está em css/estilo.css?', '../css/estilo.css', 'css/estilo.css', '/estilo.css', 'estilo.css'),
    Q('Por que escrever o plano das funções antes de programar?', 'Para saber o que cada arquivo terá e evitar se perder no meio', 'Porque o navegador exige', 'Para o código rodar mais rápido', 'Não faz diferença'),
  ]);

  // ══════════════════════════════════════════════════════
  // 94 — LOJA 2: index.html E O MENU
  // ══════════════════════════════════════════════════════
  PRAT[94] = { tarefas: ['<strong>Checkpoint.</strong> O <code>index.html</code> abre com o <strong>menu</strong> no topo (Loja, Gerenciar Produtos, Carrinho) com visual Bootstrap.', '<strong>Checkpoint.</strong> Em uma janela <strong>estreita</strong> (modo celular nas DevTools), o menu <strong>continua visível</strong> (veja a correção do passo de erro).', '<strong>Checkpoint.</strong> Mudando o texto de um link <strong>só no menu.js</strong>, a alteração aparece em todas as páginas (teste nas próximas aulas).', '<strong>Explique:</strong> com suas palavras, como o <code>menu.js</code> coloca o menu na página e por que o <code>&lt;script&gt;</code> vem <strong>depois</strong> da <code>div</code>.'],
    desafio: '<strong>Desafio.</strong> Faça o link da página <strong>atual</strong> ficar destacado no menu (classe <code>active</code> do Bootstrap). Dica: <code>location.pathname</code> mostra o caminho da página aberta. <strong>Explique ao professor</strong> sua solução.' };
  A(94, 'Loja 2: index.html e o Menu (menu.js)', 'Criar a página inicial com Bootstrap e a barra de menu que será usada nas três páginas', '🧭', [
    P('💡', 'ENTENDA: um menu escrito uma única vez',
      `<p>As 3 páginas precisam do <strong>mesmo menu</strong>. Se você copiasse o HTML do menu nas três, e depois quisesse mudar um nome de link, teria que alterar <strong>em três lugares</strong> (e se esquecer de um, as páginas ficam diferentes).</p>`,
      `<p style="margin-top:12px">A solução do projeto: cada página tem uma <code>div</code> vazia com <code>id="menuPrincipal"</code> e um <code>&lt;script src="../js/menu.js"&gt;</code>. O script <strong>preenche</strong> a <code>div</code> com o menu. O menu mora em <strong>um arquivo só</strong>.</p>`,
      analogia(`é como o <strong>cabeçalho padrão dos documentos da escola</strong>: ele é feito uma vez e todos os documentos usam o mesmo. Mudou o telefone? Altera em um lugar só.`),
      caderno(['menu.js preenche a div #menuPrincipal de cada página', 'Mudar o menu = mudar um arquivo só'])),
    etapa('📄', 'ETAPA 1: o esqueleto do index.html',
      'A página inicial tem: o Bootstrap, o espaço do menu e o espaço onde a loja vai desenhar os cards.',
      ['Abra <code>html/index.html</code> e escreva o esqueleto (digite <code>!</code> + Tab no VS Code)', 'No <code>head</code>: <code>charset</code>, <code>viewport</code>, <code>title</code> "Sistema PRW" e o <code>link</code> do Bootstrap', 'No <code>body</code>: uma <code>div</code> para o menu (id da planta abaixo), o script do menu, uma <code>div</code> para os cards e o script da loja', '<strong>A ordem importa:</strong> o script só acha a <code>div</code> se ela já existir <em>acima</em> dele'],
      `<!doctype html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sistema PRW</title>
    <!-- o link do Bootstrap da aula anterior vem aqui -->
  </head>
  <body>
    <div id="___"></div>
    <script src="../js/___"></script>

    <div id="___"></div>
    <script src="../js/___"></script>
  </body>
</html>`,
      ['Abra o <code>index.html</code> no navegador: página <strong>em branco, sem erro</strong> no console (o menu.js está vazio, e o loja.js também)', 'No <strong>Network</strong>: <code>bootstrap.min.css</code>, <code>menu.js</code> e <code>loja.js</code> com status <code>200</code>', 'Nenhum 404 vermelho'],
      ['Se aparece 404 no <code>menu.js</code>, o caminho está errado: a página está em <code>html/</code> e o script em <code>js/</code>, então é <code>../js/menu.js</code>.', 'Os ids da planta: o menu usa <code>menuPrincipal</code>; a vitrine usa <code>container-cards</code>. Eles precisam ser <strong>idênticos</strong> aos que o JavaScript vai procurar.', '<code>&lt;div id="menuPrincipal"&gt;&lt;/div&gt;</code> e <code>&lt;script src="../js/menu.js"&gt;&lt;/script&gt;</code>; depois <code>&lt;div id="container-cards"&gt;&lt;/div&gt;</code> e <code>&lt;script src="../js/loja.js"&gt;&lt;/script&gt;</code>']),
    etapa('🧱', 'ETAPA 2: o menu.js com a barra do Bootstrap',
      'Agora o menu. O texto do menu é <strong>HTML dentro de crases</strong> (template string, aula de JavaScript 2): você escreve em várias linhas, sem se preocupar com aspas.',
      ['Abra <code>js/menu.js</code>', 'Pegue a <code>div</code> do menu com <code>getElementById</code> e atribua o HTML à propriedade que <strong>coloca HTML dentro</strong> do elemento (<code>innerHTML</code>)', 'Digite a barra de navegação do Bootstrap (abaixo). <strong>Leia a legenda de cada classe</strong> antes de seguir', 'Os links apontam para as <strong>3 páginas</strong> (estão todas na mesma pasta <code>html/</code>, então basta o nome do arquivo)'],
      `// Barra de menu compartilhada: cada página tem <div id="menuPrincipal"></div>
document.getElementById("___").___ = §
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="___">Loja</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="___">Gerenciar Produtos</a>
          </li>
        </ul>
        <a class="nav-link" href="___">Carrinho</a>
      </div>
    </div>
  </nav>§;`,
      ['Recarregue o <code>index.html</code>: aparece a <strong>barra cinza clara</strong> no topo, com os três links', 'Passe o mouse nos links: o Bootstrap muda a cor', 'Os links <strong>ainda não levam a lugar nenhum</strong> (as outras páginas estão vazias): isso é esperado'],
      ['O HTML vai entre <strong>crases</strong> (<code>§ ... §</code>), e termina com <code>§;</code>. Aspas duplas dentro das crases não dão problema.', 'A propriedade que coloca HTML dentro de um elemento é a mesma que você viu na aula "DOM": <code>innerHTML</code>.', 'Links: <code>index.html</code>, <code>gerenciarProdutos.html</code> e <code>carrinho.html</code>. Primeira linha: <code>document.getElementById("menuPrincipal").innerHTML = §...§;</code>']),
    P('📚', 'O que significa cada classe do menu',
      lista(['<code>navbar</code>: "isto é uma barra de navegação"', '<code>navbar-expand-lg</code>: o menu fica <strong>aberto</strong> em telas largas (lg = 992px ou mais) e <strong>recolhido</strong> em telas menores', '<code>bg-body-tertiary</code>: cor de fundo cinza clara do tema', '<code>container-fluid</code>: ocupa <strong>toda a largura</strong> da janela', '<code>navbar-nav</code> / <code>nav-item</code> / <code>nav-link</code>: a lista de links e cada link', '<code>me-auto</code>: "margin end auto": empurra o que vem depois (o link Carrinho) para a <strong>direita</strong>', '<code>mb-2</code> / <code>mb-lg-0</code>: margem embaixo (2 unidades; zero em telas largas)']),
      box('azul', `<strong>Dica para estudar Bootstrap:</strong> os nomes seguem um padrão. <code>m</code> = margin, <code>p</code> = padding; <code>t</code>/<code>b</code>/<code>s</code>/<code>e</code> = top/bottom/start/end; o número vai de 0 a 5. Então <code>mt-3</code> = margem em cima, tamanho 3.`),
      caderno(['navbar = barra · nav-link = link do menu', 'me-auto empurra para a direita', 'mt-3 = margem em cima · mb-2 = margem embaixo · p-2 = padding'])),
    P('🐞', 'ENCONTRE O ERRO: os quatro problemas desta aula',
      code(`// 1) o script roda antes da div existir (o <script> está ACIMA da div)
//    Uncaught TypeError: Cannot set properties of null (setting 'innerHTML')

// 2) id diferente: <div id="menuprincipal"> × getElementById("menuPrincipal")
//    mesmo erro: getElementById devolveu null

// 3) caminho errado: <script src="js/menu.js">   (esqueceu o ../)
//    Network: menu.js  404

// 4) em janela estreita (celular) o menu SOME
//    (o navbar-expand-lg recolhe o menu, mas não há botão para abri-lo)`),
      lista(['<strong>1 e 2:</strong> <code>getElementById</code> devolve <code>null</code> quando não acha. Confira a <strong>ordem</strong> (div antes do script) e o id <strong>letra por letra</strong>', '<strong>3:</strong> a página está em <code>html/</code>; o script em <code>js/</code>: <code>../js/menu.js</code>', '<strong>4:</strong> teste no modo celular das DevTools (Ctrl+Shift+M). <strong>Correção simples:</strong> troque <code>navbar-expand-lg</code> por <code>navbar-expand</code> (o menu nunca recolhe). A solução "de manual" é acrescentar um botão que abre/fecha o menu (precisa do JavaScript do Bootstrap)']),
      box('verde', `<strong>Provoque cada um</strong> e leia a mensagem. Depois aplique a correção do item 4 e confirme que o menu continua visível no celular.`)),
    P('🏁', 'CHECKPOINT e DESAFIO',
      lista(['☐ <code>index.html</code> com Bootstrap, <code>div</code> do menu, <code>div</code> dos cards e os dois scripts', '☐ <code>menu.js</code> desenha a barra com os 3 links', '☐ Sem erros no console, sem 404 no Network', '☐ O menu continua visível no modo celular']),
      box('verde', `<strong>Explique com suas palavras:</strong> o que o <code>menu.js</code> faz, por que a <code>div</code> precisa vir antes do script, e o que mudaria nas 3 páginas se você trocasse o nome do link "Loja" para "Vitrine".`)),
  ], [
    Q('No index.html, o <script src="../js/menu.js"> está ACIMA da <div id="menuPrincipal">. O que acontece?', 'TypeError: Cannot set properties of null (setting \'innerHTML\'), porque a div ainda não existe', 'O menu aparece normalmente', 'O navegador espera a div e depois roda o script', 'O menu aparece duplicado'),
    Q('document.getElementById("menuprincipal") (minúsculo) com <div id="menuPrincipal">. O que acontece?', 'Devolve null: o id é diferente por causa da maiúscula', 'Acha a div, o JavaScript ignora maiúsculas', 'Devolve um array vazio', 'Gera SyntaxError'),
    Q('Por que o caminho do script é ../js/menu.js a partir de html/index.html?', 'A página está em html/ e é preciso subir uma pasta para chegar em js/', 'Porque o navegador exige "../" em todo script', 'Porque js/ está dentro de html/', 'Porque ../ significa "arquivo local"'),
    Q('O que faz a classe me-auto no link do menu?', 'Empurra os itens seguintes (o Carrinho) para a direita', 'Muda a cor do link', 'Esconde o link', 'Aumenta a fonte'),
    Q('Em janelas estreitas o menu some. Qual é a correção mais simples?', 'Trocar navbar-expand-lg por navbar-expand', 'Apagar o container-fluid', 'Trocar o nome dos links', 'Mudar a cor do navbar'),
    Q('Por que o HTML do menu fica dentro de crases (template string)?', 'Permite várias linhas e aspas duplas sem se preocupar com aspas', 'Porque o JavaScript só aceita crases em HTML', 'Para o HTML rodar mais rápido', 'Porque aspas simples são proibidas'),
    Q('O que é a classe mt-3 do Bootstrap?', 'Margem em cima (top) de tamanho 3', 'Margem à direita', 'Texto em negrito', 'Máximo de 3 colunas'),
    Q('Qual é a vantagem de escrever o menu em um arquivo menu.js?', 'Mudar um link em um só lugar atualiza todas as páginas', 'O menu carrega mais rápido', 'O Bootstrap exige', 'O menu não depende do HTML'),
    Q('No Network, menu.js aparece com 404. O que verificar primeiro?', 'O caminho e o nome do arquivo no src (../js/menu.js)', 'O CSS do menu', 'O localStorage', 'O navegador'),
  ]);

  // ══════════════════════════════════════════════════════
  // 119 — LOJA 3: gerenciarProdutos.html
  // ══════════════════════════════════════════════════════
  PRAT[119] = { tarefas: ['<strong>Checkpoint.</strong> A página mostra o menu, o título "Cadastro de produtos", os 3 campos, os botões Salvar e Bloquear/Desbloquear e a tabela com os 4 títulos de coluna.', '<strong>Checkpoint.</strong> O formulário fica <strong>centralizado</strong> (ocupa a parte do meio). Diminua a janela e veja como ele se comporta.', '<strong>Checkpoint.</strong> O botão <strong>Cancelar</strong> não aparece. Tire a classe <code>d-none</code> pelas DevTools e veja ele surgir (e depois volte).', '<strong>Checkpoint.</strong> No console, <code>document.querySelector("#nomeProduto")</code> (e os outros ids da planta) devolve o elemento, e <strong>nunca</strong> <code>null</code>.', '<strong>Explique:</strong> com suas palavras, como o sistema de 12 colunas do Bootstrap centraliza o formulário com <code>col-3</code> + <code>col-6</code>.'],
    desafio: '<strong>Desafio.</strong> Mude o formulário para ocupar <code>col-8</code> centralizado, usando só classes do Bootstrap (dica: a classe <code>offset-2</code>). <strong>Explique ao professor</strong> as contas das 12 colunas.' };
  A(119, 'Loja 3: gerenciarProdutos.html (Bootstrap)', 'Montar a página de cadastro com o sistema de colunas, os campos e a tabela do Bootstrap', '🧾', [
    P('💡', 'ENTENDA: o Bootstrap divide a largura em 12 colunas',
      `<p>No Bootstrap, uma linha tem <strong>12 colunas</strong> invisíveis. Você escolhe <strong>quantas</strong> cada bloco ocupa: <code>col-3</code> = 3 colunas, <code>col-6</code> = 6 colunas. Uma <code>col-3</code> vazia + uma <code>col-6</code> (o formulário) + o resto livre = <strong>o formulário fica no meio</strong>.</p>`,
      `<div style="display:grid;grid-template-columns:repeat(12,1fr);gap:3px;margin-top:12px;font-size:11px;text-align:center"><div style="grid-column:span 3;background:rgba(154,160,180,.25);padding:8px;border-radius:6px">col-3<br>(vazia)</div><div style="grid-column:span 6;background:rgba(79,142,247,.45);padding:8px;border-radius:6px">col-6 (o formulário)</div><div style="grid-column:span 3;background:rgba(154,160,180,.12);padding:8px;border-radius:6px;border:1px dashed #666">3 livres</div></div>`,
      analogia(`é uma <strong>régua de 12 divisões</strong>. Cada bloco "ocupa" algumas divisões. Em telas pequenas, o Bootstrap empilha os blocos.`),
      lista(['<code>container</code>: centraliza e limita a largura do conteúdo', '<code>row</code>: uma linha de 12 colunas', '<code>col-N</code>: um bloco com N colunas', '<code>form-control</code>: estilo de campo de formulário (largura total, borda, cantos)', '<code>mb-1</code> / <code>mt-1</code>: pequena margem embaixo/em cima', '<code>btn btn-primary</code> / <code>btn-danger</code> / <code>btn-warning</code>: botões azul, vermelho e amarelo', '<code>d-none</code>: <strong>esconde</strong> o elemento (display: none). Tirando a classe, ele aparece', '<code>table</code>: tabela estilizada']),
      caderno(['12 colunas: col-3 + col-6 centraliza o bloco do meio', 'container > row > col', 'd-none esconde · tirar a classe mostra'])),
    etapa('🧱', 'ETAPA 1: o esqueleto, com menu e scripts',
      'Comece pela base da página, igual ao index, mas com o <strong>script da lógica</strong> no fim.',
      ['Abra <code>html/gerenciarProdutos.html</code> e escreva o esqueleto com o Bootstrap (como no <code>index</code>)', 'No <code>body</code>: a <code>div</code> do menu e o <code>script</code> do <code>menu.js</code> (copie a ideia do <code>index.html</code>)', 'Deixe um espaço para o formulário e a tabela (as próximas etapas)', 'No <strong>fim do body</strong>, o <code>script</code> do <code>gerenciarProdutos.js</code>'],
      `<body>
  <!-- barra de menu -->
  <div id="___"></div>
  <script src="../js/___"></script>

  <!-- ETAPA 2: formulário -->
  <!-- ETAPA 3: tabela -->

  <script src="../js/___"></script>
</body>`,
      ['A página abre com o <strong>menu</strong> no topo e o resto em branco', 'Console sem erros; Network sem 404', 'O menu aparece igual ao do <code>index.html</code>: <strong>é o mesmo arquivo menu.js</strong>'],
      ['Se o menu não aparece, repita o diagnóstico da aula anterior: ordem da <code>div</code> e do script, id idêntico, caminho <code>../js/</code>.', 'O script da lógica vai no <strong>fim</strong> do body porque ele procura os campos do formulário, que precisam já existir.', '<code>&lt;script src="../js/menu.js"&gt;&lt;/script&gt;</code> e, no fim, <code>&lt;script src="../js/gerenciarProdutos.js"&gt;&lt;/script&gt;</code>']),
    etapa('📝', 'ETAPA 2: o formulário (as colunas e os campos)',
      'Agora o formulário, dentro da estrutura <code>container &gt; row &gt; col</code>. <strong>Atenção aos ids:</strong> são eles que o JavaScript vai usar. Use a planta abaixo.',
      ['Crie a <code>div class="container"</code>, com uma <code>div class="row"</code> dentro', 'Na linha: uma <code>col-3</code> <strong>vazia</strong> e uma <code>col-6</code> com <code>id="formulario"</code>', 'Dentro dela: o título <code>h3</code> e três campos <code>form-control</code> (texto, número e <code>textarea</code> de 3 linhas), cada um dentro de uma <code>div</code> com margem', 'Os botões: Salvar (azul), Bloquear/Desbloquear (vermelho) e Cancelar (amarelo e <strong>escondido</strong> com <code>d-none</code>)'],
      `<div class="container">
  <div class="row">
    <div class="col-3"></div>

    <div id="formulario" class="col-6">
      <h3>Cadastro de produtos</h3>

      <div class="mb-1 mt-1">
        <input type="text" class="form-control" id="___" placeholder="Nome do Produto" />
      </div>
      <div class="mb-1">
        <input type="___" class="form-control" id="___" placeholder="Valor do produto" />
      </div>
      <div class="mb-1">
        <textarea class="form-control" id="___" rows="3" placeholder="Descrição do Produto"></textarea>
      </div>

      <button id="___" type="button" class="btn btn-primary">Salvar</button>
      <button id="___" type="button" class="btn btn-danger">Bloquear/Desbloquear</button>
      <button id="___" type="button" class="d-none btn btn-warning">Cancelar</button>
    </div>
  </div>
</div>`,
      ['O formulário aparece <strong>no meio</strong> da página, com os 3 campos e os 2 botões', 'O botão <strong>Cancelar não aparece</strong> (está com <code>d-none</code>)', 'F12 → Elements: passe o mouse na <code>div class="row"</code> e veja as colunas desenhadas', 'No console: <code>document.querySelector("#nomeProduto")</code> devolve o campo'],
      ['<strong>Planta de ids</strong> deste formulário: nome → <code>nomeProduto</code>, valor → <code>valorProduto</code> (tipo <code>number</code>), descrição → <code>descricaoProduto</code>, botões → <code>botaoSalvarProduto</code>, <code>botaoBloquearTela</code> e <code>cancelar</code>.', 'Se o formulário não ficou centralizado, confira se a <code>col-3</code> vazia existe e se está <strong>dentro</strong> da <code>row</code>.', 'O tipo do campo de valor é <code>number</code>: o navegador só aceita números nele (mas o JavaScript ainda o lê como texto).']),
    etapa('📊', 'ETAPA 3: a tabela dos produtos',
      'Embaixo do formulário, a tabela que vai listar os produtos. Por enquanto, só o <strong>cabeçalho</strong>; as linhas serão desenhadas pelo JavaScript.',
      ['Crie uma <code>table class="table"</code>', 'No <code>thead</code>, uma linha com quatro <code>th scope="col"</code>: Produto, Valor, Descrição e Opções', 'No <code>tbody</code>, <strong>sem linhas</strong>, só com o id da planta: <code>listaProdutos</code> (é aqui que o JavaScript vai colocar as linhas)'],
      `<table class="table">
  <thead>
    <tr>
      <th scope="col">Produto</th>
      <th scope="col">___</th>
      <th scope="col">___</th>
      <th scope="col">___</th>
    </tr>
  </thead>
  <tbody id="___"></tbody>
</table>`,
      ['Aparece uma tabela com o cabeçalho (4 títulos) e nenhuma linha', 'No console: <code>document.querySelector("#listaProdutos")</code> devolve o <code>tbody</code>', 'A ordem das colunas é <strong>a mesma</strong> que o JavaScript vai usar nas linhas'],
      ['<code>scope="col"</code> diz aos leitores de tela que o <code>th</code> é título de <em>coluna</em> (acessibilidade).', 'O <code>tbody</code> <strong>precisa</strong> do id; sem ele o JavaScript não acha onde desenhar.', 'Os títulos: <code>Produto</code>, <code>Valor</code>, <code>Descrição</code>, <code>Opções</code>. O <code>tbody</code> tem <code>id="listaProdutos"</code>.']),
    P('🐞', 'ENCONTRE O ERRO: o que costuma dar errado com o Bootstrap',
      code(`<!-- 1) sem o container: o conteúdo cola nas bordas da janela -->

<!-- 2) classe escrita errado: nada acontece, e NÃO há mensagem de erro -->
<button class="btn btn-primery">Salvar</button>

<!-- 3) colunas somando mais que 12: o bloco "quebra" para a linha de baixo -->
<div class="col-8"></div><div class="col-6"></div>

<!-- 4) o campo e o JavaScript com ids diferentes -->
<input id="nomeproduto">   <!-- JS procura #nomeProduto -->`),
      lista(['<strong>1:</strong> o <code>container</code> dá margens laterais e largura máxima', '<strong>2:</strong> classe com erro de digitação é <strong>ignorada em silêncio</strong>. No Elements, a classe aparece, mas nenhuma regra do Bootstrap se aplica a ela. Compare com o exemplo oficial', '<strong>3:</strong> 8 + 6 = 14 &gt; 12: a segunda coluna vai para baixo', '<strong>4:</strong> maiúsculas contam. Teste no console: <code>document.querySelector("#nomeProduto")</code> deve devolver o elemento']),
      box('verde', `<strong>Faça agora:</strong> estrague de propósito cada um dos 4 itens, veja o sintoma e depois conserte.`)),
    P('🏁', 'CHECKPOINT e DESAFIO',
      lista(['☐ Menu, formulário centralizado (3 campos, 3 botões, Cancelar escondido) e tabela com 4 colunas', '☐ <code>tbody id="listaProdutos"</code> e os ids da planta existem (testados no console)', '☐ Console sem erros; Network sem 404', '☐ Diminuindo a janela, o layout continua legível']),
      box('verde', `<strong>Explique com suas palavras:</strong> o que fazem <code>container</code>, <code>row</code> e <code>col-6</code>, e para que serve o id <code>listaProdutos</code>.`)),
  ], [
    Q('O formulário está dentro de <div class="col-6"> e há uma <div class="col-3"></div> vazia antes. O que isso causa?', 'O formulário fica deslocado para o meio, com 3 colunas vazias antes dele', 'O formulário fica escondido', 'O formulário ocupa a largura toda', 'O formulário é empilhado embaixo da página'),
    Q('Quantas colunas tem uma row do Bootstrap?', '12', '10', '6', '24'),
    Q('Duas colunas col-8 e col-6 na mesma row. O que acontece?', 'A segunda quebra para a linha de baixo (8 + 6 passa de 12)', 'As duas ficam lado a lado, comprimidas', 'O Bootstrap dá erro', 'A segunda some'),
    Q('O botão tem class="btn btn-primery" (escrito errado). O que acontece?', 'Fica sem o estilo do Bootstrap, sem nenhuma mensagem de erro', 'O navegador mostra um erro no console', 'O botão fica azul mesmo assim', 'O botão desaparece'),
    Q('O que faz a classe d-none no botão Cancelar?', 'Esconde o botão (display: none)', 'Desabilita o botão', 'Deixa o botão vermelho', 'Remove o botão do HTML'),
    Q('Como fazer o botão Cancelar aparecer pelo JavaScript?', 'Tirando a classe d-none dele', 'Adicionando a classe d-none', 'Mudando o id do botão', 'Apagando o botão do HTML'),
    Q('Por que o tbody precisa de um id?', 'O JavaScript vai desenhar as linhas dentro dele', 'O Bootstrap exige id em tabelas', 'Para ficar com cor', 'Para o thead funcionar'),
    Q('O JavaScript procura #nomeProduto, mas o HTML tem id="nomeproduto". O que acontece?', 'querySelector devolve null (o id é diferente por causa da maiúscula)', 'Funciona, o querySelector ignora maiúsculas', 'O navegador corrige o id', 'O campo some'),
    Q('Por que o script gerenciarProdutos.js fica no FIM do body?', 'Para os campos e a tabela já existirem quando o script procurar por eles', 'Porque scripts no começo são proibidos', 'Para a página ficar mais bonita', 'Porque o Bootstrap exige'),
  ]);

  // ══════════════════════════════════════════════════════
  // 120 — LOJA 4: carrinho.html E estilo.css
  // ══════════════════════════════════════════════════════
  PRAT[120] = { tarefas: ['<strong>Checkpoint.</strong> As <strong>3 páginas</strong> abrem com o mesmo menu e o link <strong>Carrinho</strong> / <strong>Loja</strong> / <strong>Gerenciar Produtos</strong> leva de uma à outra.', '<strong>Checkpoint.</strong> O <code>carrinho.html</code> mostra o título, a tabela (4 colunas) e "Total: R$ 0,00".', '<strong>Checkpoint.</strong> Suas 3 regras do <code>estilo.css</code> aparecem <strong>aplicadas</strong> (F12 → Styles) e as do Bootstrap aparecem <strong>riscadas</strong> onde você as sobrescreveu.', '<strong>Checkpoint.</strong> O <code>estilo.css</code> está ligado <strong>depois</strong> do Bootstrap nas 3 páginas.', '<strong>Explique:</strong> com suas palavras, por que a <strong>ordem</strong> dos <code>&lt;link&gt;</code> importa e o que é "especificidade".'],
    desafio: '<strong>Desafio.</strong> Crie uma classe <code>.preco</code> no seu CSS (cor verde e negrito) e use-a depois no preço dos cards e do carrinho (nas aulas de JavaScript). <strong>Explique</strong> por que usar uma classe é melhor que escrever o estilo direto no HTML.' };
  A(120, 'Loja 4: carrinho.html e o estilo.css', 'Montar a página do carrinho, ligar o CSS próprio ao Bootstrap e entender quem "ganha" quando duas regras brigam', '🛒', [
    P('💡', 'ENTENDA: Bootstrap + o seu CSS',
      `<p>O Bootstrap cuida da maior parte do visual. Mas quase sempre você quer <strong>ajustar</strong> alguma coisa: uma cor, um espaçamento. Para isso existe o <code>css/estilo.css</code>: <strong>o seu CSS</strong>, que é ligado <strong>depois</strong> do Bootstrap para poder sobrescrevê-lo.</p>`,
      analogia(`o Bootstrap é a <strong>decoração padrão</strong> do apartamento. O seu CSS é o <strong>quadro que você pendura por cima</strong>: se os dois ocupam a mesma parede, <strong>o que vier depois</strong> aparece.`),
      lista(['🔹 <strong>Mesma força</strong> (dois seletores iguais): vence <strong>a regra que vem depois</strong> no arquivo ou na ordem dos <code>link</code>', '🔹 <strong>Forças diferentes</strong> (especificidade): <code>#id</code> vence <code>.classe</code>, que vence <code>tag</code>, <strong>não importa a ordem</strong>']),
      caderno(['Seu CSS vem DEPOIS do Bootstrap', 'Mesma especificidade: a última regra vence', '#id > .classe > tag'])),
    etapa('🧺', 'ETAPA 1: o carrinho.html',
      'A página do carrinho é parecida com a de gerenciar, mas mais simples: <strong>só uma tabela e o total</strong>.',
      ['Abra <code>html/carrinho.html</code> e escreva o esqueleto com o Bootstrap, o menu (div + script) e o <code>container mt-3</code>', 'Dentro dele: o título <code>h3</code> "Carrinho" e a tabela com os 4 títulos (Produto, Valor, Descrição, Opções)', 'No <code>tbody</code>, o id <code>listaCarrinho</code>', 'Depois da tabela: <code>&lt;h4&gt;Total: R$ &lt;span id="totalCarrinho"&gt;0,00&lt;/span&gt;&lt;/h4&gt;</code>', 'No fim do body, o <code>script</code> do <code>carrinho.js</code>'],
      `<div class="container ___">
  <h3>Carrinho</h3>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">Produto</th>
        <th scope="col">Valor</th>
        <th scope="col">Descrição</th>
        <th scope="col">Opções</th>
      </tr>
    </thead>
    <tbody id="___"></tbody>
  </table>
  <h4>Total: R$ <span id="___">0,00</span></h4>
</div>`,
      ['A página mostra o menu, o título, a tabela vazia e "Total: R$ 0,00"', 'Console sem erros; Network sem 404', 'Os links do menu agora levam entre as <strong>3 páginas</strong>'],
      ['O <code>mt-3</code> dá uma margem em cima para o título não colar no menu.', 'Dois ids da planta: <code>listaCarrinho</code> (o <code>tbody</code>) e <code>totalCarrinho</code> (o <code>span</code> do total). O <code>span</code> é pequeno de propósito: só o <strong>número</strong> muda.', '<code>&lt;div class="container mt-3"&gt;</code>, <code>&lt;tbody id="listaCarrinho"&gt;</code> e <code>&lt;span id="totalCarrinho"&gt;0,00&lt;/span&gt;</code>']),
    etapa('🔗', 'ETAPA 2: ligar o estilo.css nas três páginas, na ordem certa',
      'O <code>estilo.css</code> precisa ser carregado <strong>depois</strong> do Bootstrap, em <strong>todas</strong> as páginas.',
      ['Em cada uma das 3 páginas, no <code>head</code>, coloque o <code>link</code> do Bootstrap <strong>primeiro</strong>', 'Depois dele, o <code>link</code> do seu CSS: <code>&lt;link rel="stylesheet" href="../css/estilo.css" /&gt;</code>', 'Confira a ordem nas 3 páginas'],
      `<head>
  <!-- ... meta, title ... -->
  <!-- 1º: o Bootstrap -->
  <!-- 2º: o seu CSS (vem DEPOIS) -->
  <link rel="stylesheet" href="___" />
</head>`,
      ['Nas 3 páginas, no painel <strong>Network</strong>, aparece o <code>estilo.css</code> com status <code>200</code> (o arquivo está vazio, mas carrega)', 'No <strong>Elements</strong>, dentro do <code>head</code>, o <code>link</code> do Bootstrap vem <strong>antes</strong> do <code>estilo.css</code>'],
      ['O caminho a partir de <code>html/</code> é <code>../css/estilo.css</code>.', 'Se esquecer em uma página, as regras do seu CSS só valem nas outras: <strong>o visual fica inconsistente</strong>.', 'Ordem: <code>&lt;link ... bootstrap ...&gt;</code> primeiro; <code>&lt;link rel="stylesheet" href="../css/estilo.css" /&gt;</code> logo depois.']),
    etapa('🎨', 'ETAPA 3: três regras suas no estilo.css',
      'Escreva <strong>três regras</strong> no <code>css/estilo.css</code>, uma de cada tipo de seletor, e <strong>veja quem ganha</strong> do Bootstrap.',
      ['Regra 1 (<strong>tag</strong>): dê ao <code>body</code> uma cor de fundo bem clara (por exemplo, <code>#f8f9fa</code>)', 'Regra 2 (<strong>id</strong>): no <code>#formulario</code>, coloque um espaço em cima (<code>margin-top</code>) e um <code>padding</code>', 'Regra 3 (<strong>classe</strong>): na <code>.card</code> (a vitrine usará), uma <code>margin</code> para os cards não colarem uns nos outros', 'Abra o <strong>F12 → Elements → Styles</strong> em um elemento e veja suas regras e as do Bootstrap, algumas <strong>riscadas</strong>'],
      `body { background-color: ___; }

#formulario {
  margin-top: ___px;
  padding: ___px;
}

.card { margin: ___px; }`,
      ['O fundo da página muda para a cor que você escolheu', 'No formulário, há um espaço visível em cima', 'No painel <strong>Styles</strong>, uma regra do Bootstrap que você sobrescreveu aparece <strong>riscada</strong> e a sua vale'],
      ['Se a sua regra não "pega", veja no painel Styles se aparece riscada: outra regra mais <strong>específica</strong> ou <strong>mais abaixo</strong> está vencendo.', 'O <code>body</code> do Bootstrap define <code>background-color</code> por variável. Uma regra de <code>tag</code> no seu CSS, <strong>depois</strong> do Bootstrap, normalmente vence.', 'Exemplo de valores: <code>background-color: #f8f9fa;</code> · <code>margin-top: 20px; padding: 16px;</code> · <code>.card { margin: 8px; }</code>']),
    P('🐞', 'ENCONTRE O ERRO: quando o seu CSS não vence',
      code(`<!-- 1) ordem invertida: o seu CSS vem ANTES do Bootstrap -->
<link rel="stylesheet" href="../css/estilo.css">
<link href="...bootstrap.min.css" rel="stylesheet" ...>
/* resultado: o Bootstrap, que vem depois, sobrescreve as suas regras de mesma força */

/* 2) especificidade: o seu seletor é mais fraco */
button { background: green; }          /* tag: fraca */
.btn-primary { background: #0d6efd; }   /* classe: mais forte, vence */

/* 3) caminho errado do CSS: Network  estilo.css  404 */`),
      lista(['<strong>1:</strong> <strong>ligue o seu CSS depois</strong> do Bootstrap, em todas as páginas', '<strong>2:</strong> uma regra de classe vence uma de tag, <em>não importa a ordem</em>. Use um seletor <strong>igual ou mais específico</strong> (por exemplo, <code>button.btn-primary</code> ou o <code>#id</code>)', '<strong>3:</strong> <code>../css/estilo.css</code> (suba uma pasta)']),
      box('azul', `<strong>Como investigar sempre:</strong> F12 → Elements → clique no elemento → painel <strong>Styles</strong>. As regras que <em>vencem</em> aparecem normais; as que <em>perdem</em> aparecem <strong>riscadas</strong>. Isso resolve 90% das dúvidas de "por que meu CSS não funciona".`)),
    P('🏁', 'CHECKPOINT e DESAFIO',
      lista(['☐ <code>carrinho.html</code> pronto, com os ids <code>listaCarrinho</code> e <code>totalCarrinho</code>', '☐ As 3 páginas têm menu, Bootstrap e <code>estilo.css</code> <strong>depois</strong> dele', '☐ Suas 3 regras funcionam e você vê, no painel Styles, quem vence', '☐ Todos os links do menu funcionam']),
      box('verde', `<strong>Explique com suas palavras:</strong> o que acontece quando o seu CSS e o do Bootstrap brigam, por que a ordem dos <code>link</code> importa e o que é especificidade.`)),
  ], [
    Q('O estilo.css está ligado ANTES do Bootstrap. O que costuma acontecer com suas regras?', 'O Bootstrap, vindo depois, sobrescreve as regras de mesma força', 'As suas regras sempre vencem', 'O navegador mostra um erro', 'Nenhum CSS é carregado'),
    Q('No painel Styles, uma regra aparece riscada. O que isso significa?', 'Ela foi sobrescrita por outra regra mais forte ou mais abaixo', 'Ela está certa e em uso', 'Ela tem erro de sintaxe grave que apaga a página', 'Ela só vale no celular'),
    Q('Entre button { background: green; } e .btn-primary { background: blue; }, qual vence em um <button class="btn btn-primary">?', 'A da classe (.btn-primary), por ser mais específica', 'A de tag, por ser mais simples', 'A que aparecer primeiro no arquivo, sempre', 'Nenhuma: dá conflito'),
    Q('Qual seletor é mais específico?', '#formulario', '.card', 'body', 'div'),
    Q('Em carrinho.html, qual é o caminho correto para o seu CSS?', '../css/estilo.css', 'css/estilo.css', 'estilo.css', '/estilo.css'),
    Q('Por que usar uma classe (.preco) em vez de escrever o estilo direto em cada tag?', 'Muda o visual em um só lugar e vale para todos os elementos com a classe', 'Porque style="..." não funciona', 'Para o HTML ficar sem classes', 'Porque o navegador exige'),
    Q('O que é o <span id="totalCarrinho"> em "Total: R$ <span ...>0,00</span>"?', 'O pedaço do texto que o JavaScript vai trocar, sem mexer no resto da frase', 'Um botão', 'Uma tabela', 'Uma imagem'),
    Q('O que faz a classe mt-3 no container do carrinho?', 'Dá espaço em cima, para o título não colar no menu', 'Esconde o container', 'Centraliza o texto', 'Aumenta o título'),
    Q('Para o visual ser igual nas 3 páginas, o que é preciso?', 'Ligar o Bootstrap e o estilo.css nas três, na mesma ordem', 'Ligar o CSS só na página inicial', 'Escrever o CSS dentro de cada HTML', 'Usar cores diferentes em cada página'),
  ]);

  // ══════════════════════════════════════════════════════
  // 70 — LOJA 5: ler() E limparCampos()
  // ══════════════════════════════════════════════════════
  PRAT[70] = { tarefas: ['<strong>Checkpoint.</strong> No console, depois de digitar <code>Caneta</code>, <code>3.5</code> e <code>Azul</code> no formulário, <code>ler()</code> devolve <code>["Caneta","3.5","Azul"]</code>.', '<strong>Checkpoint.</strong> <code>limparCampos()</code> esvazia os <strong>3</strong> campos.', '<strong>Checkpoint.</strong> <code>typeof ler()[1]</code> mostra <code>"string"</code> e você sabe explicar por quê.', '<strong>Checkpoint.</strong> As variáveis <code>nome</code>, <code>valor</code> e <code>descricao</code> <strong>não</strong> existem fora da função (no console, <code>nome</code> dá <em>not defined</em>).', '<strong>Explique:</strong> com suas palavras, a diferença entre <code>return</code> e <code>console.log</code> em <code>ler()</code>.'],
    desafio: '<strong>Desafio.</strong> Faça <code>ler()</code> remover espaços das pontas (<code>trim</code>) do nome e da descrição. Depois descubra o que acontece com <code>valor</code> se o usuário digitar <code>3,5</code> (com vírgula) no campo número. <strong>Explique ao professor.</strong>' };
  A(70, 'Loja 5: Lendo o Formulário (ler e limparCampos)', 'Primeiro trecho do gerenciarProdutos.js: ler os campos para um array e esvaziar o formulário', '📥', [
    P('💡', 'ENTENDA: a primeira função do sistema',
      `<p>Tudo começa por <strong>ler o que o usuário digitou</strong>. A função <code>ler()</code> vai <strong>devolver um array</strong> com 3 posições: <code>[nome, valor, descrição]</code>. Esse array é exatamente o <strong>formato dos dados</strong> que você viu na primeira aula.</p>`,
      analogia(`o <strong>caixa que lê a etiqueta</strong>: ele pega as 3 informações do produto e as entrega organizadas, na ordem de sempre. <code>return</code> é "entregar".`),
      lista(['<code>document.querySelector("#id")</code>: acha um elemento pelo <strong>seletor de CSS</strong> (o <code>#</code> significa "id")', '<code>.value</code>: o que o usuário digitou (<strong>sempre texto</strong>)', '<code>return</code>: devolve o resultado para quem chamou a função']),
      caderno(['ler() devolve [nome, valor, descrição]', 'querySelector("#id") · .value é sempre texto', 'return entrega o valor; console.log só mostra'])),
    etapa('📖', 'ETAPA 1: a função ler()',
      'Abra o <code>js/gerenciarProdutos.js</code> (que tem só o plano do topo) e escreva a primeira função.',
      ['Crie a função <code>ler</code>', 'Dentro, crie um array vazio <code>produtoLido</code>', 'Pegue os 3 campos com <code>querySelector</code> (use os <strong>ids da planta</strong>) e guarde em variáveis <strong>declaradas com <code>let</code></strong>', 'Coloque o <code>.value</code> de cada um nas posições 0, 1 e 2 do array', '<code>return</code> do array'],
      `// Lê os 3 campos do formulário e devolve em um array:
// posição 0 = nome, 1 = valor, 2 = descrição
function ler() {
  let produtoLido = [];
  let nome = document.querySelector("#___");
  let valor = document.querySelector("#___");
  let descricao = document.querySelector("#___");

  produtoLido[0] = nome.___;
  produtoLido[1] = ___.value;
  produtoLido[2] = ___;

  return ___;
}`,
      ['Abra o <code>gerenciarProdutos.html</code>, F12 → Console', 'Digite <code>Caneta</code>, <code>3.5</code> e <code>Azul</code> nos campos', 'No console, digite <code>ler()</code>: deve aparecer <code>["Caneta", "3.5", "Azul"]</code>'],
      ['Se aparece <em>"Cannot read properties of null (reading \'value\')"</em>, algum <code>querySelector</code> não achou o campo: confira o <code>#</code> e o <strong>id exato</strong> (maiúsculas).', 'Cada posição do array recebe o <code>.value</code> do campo certo: <code>nome.value</code>, <code>valor.value</code>, <code>descricao.value</code>.', 'Linhas-chave: <code>produtoLido[0] = nome.value;</code> · <code>produtoLido[1] = valor.value;</code> · <code>produtoLido[2] = descricao.value;</code> · <code>return produtoLido;</code>',
      '<strong>Leia linha por linha, depois digite:</strong>' + code(`function ler() {
  let produtoLido = [];                                      // 1. um array vazio para receber os 3 valores
  let nome = document.querySelector("#nomeProduto");         // 2. acha o campo do nome (# = id)
  let valor = document.querySelector("#valorProduto");       // 3. acha o campo do valor
  let descricao = document.querySelector("#descricaoProduto"); // 4. acha o campo da descrição

  produtoLido[0] = nome.value;        // 5. posição 0 = o texto digitado no nome
  produtoLido[1] = valor.value;       // 6. posição 1 = o texto digitado no valor
  produtoLido[2] = descricao.value;   // 7. posição 2 = o texto digitado na descrição

  return produtoLido;                 // 8. entrega o array para quem chamou ler()
}`) + '<p style="margin-top:8px">Depois de digitar, <strong>explique em voz alta o que cada número de linha faz</strong>.</p>']),
    etapa('🧼', 'ETAPA 2: a função limparCampos()',
      'Depois de salvar, o formulário precisa ficar <strong>vazio</strong> para o próximo cadastro.',
      ['Crie <code>limparCampos</code>, sem parâmetros e sem <code>return</code>', 'Para cada um dos 3 campos, atribua texto vazio (<code>""</code>) ao <code>.value</code>'],
      `// Esvazia os campos do formulário
function limparCampos() {
  document.querySelector("#nomeProduto").___ = "";
  document.querySelector("#___").value = "";
  // TODO: o terceiro campo
}`,
      ['Com os campos preenchidos, digite <code>limparCampos()</code> no console: os <strong>três</strong> campos esvaziam', 'Digite <code>ler()</code> de novo: aparece <code>["", "", ""]</code>'],
      ['Esvaziar um campo é atribuir uma string vazia: <code>campo.value = "";</code>.', 'O terceiro campo é o da descrição (<code>#descricaoProduto</code>).', '<code>document.querySelector("#descricaoProduto").value = "";</code>',
      '<strong>Solução comentada:</strong>' + code(`function limparCampos() {
  document.querySelector("#nomeProduto").value = "";        // esvazia o nome
  document.querySelector("#valorProduto").value = "";       // esvazia o valor
  document.querySelector("#descricaoProduto").value = "";   // esvazia a descrição
}`)]),
    etapa('🔬', 'ETAPA 3: teste e entenda o que a função devolve',
      'Funções que <strong>devolvem</strong> algo são ótimas de testar no console. Faça o experimento e anote.',
      ['Preencha o formulário e rode <code>let x = ler();</code>', 'Depois rode <code>x[0]</code>, <code>x[1]</code>, <code>typeof x[1]</code> e <code>x.length</code>', 'Anote: o que é o <code>typeof x[1]</code>? Por que o valor do produto não é um número?'],
      `let x = ler();
x[0]
x[1]
typeof x[1]
x.length`,
      ['<code>x[1]</code> → <code>"3.5"</code> e <code>typeof</code> → <code>"string"</code>', '<code>x.length</code> → <code>3</code>', 'Você consegue explicar: <strong>"tudo que vem de um campo é texto"</strong>'],
      ['O <code>.value</code> de qualquer <code>input</code> é texto, mesmo em <code>type="number"</code>.', 'Para fazer conta com o valor será preciso converter com <code>Number(...)</code>. Vamos usar isso no carrinho.', 'Guarde esta frase: <strong>"o array guarda texto; converto na hora de calcular".</strong>']),
    P('🐞', 'ENCONTRE O ERRO: os erros desta aula',
      code(`// 1) esqueceu o # no seletor
document.querySelector("nomeProduto")     // procura uma TAG <nomeProduto>: null
// Uncaught TypeError: Cannot read properties of null (reading 'value')

// 2) esqueceu o let (variável "global sem querer")
nome = document.querySelector("#nomeProduto");
window.nome                              // o elemento: a variável vazou para fora da função!

// 3) console.log em vez de return
function ler() { ...; console.log(produtoLido); }
let x = ler();   // x é undefined: a função mostrou, mas não ENTREGOU`),
      lista(['<strong>1:</strong> <code>querySelector</code> usa a <strong>sintaxe do CSS</strong>: id com <code>#</code>, classe com <code>.</code>', '<strong>2:</strong> sem <code>let</code>/<code>const</code>, a variável vira <strong>global</strong> (fica visível para todo o programa) e pode <strong>colidir</strong> com outras. Sempre declare', '<strong>3:</strong> <code>console.log</code> só <em>mostra</em>; <code>return</code> <em>entrega</em> o valor para quem chamou']),
      box('verde', `<strong>Provoque os três erros</strong> no seu código, veja o sintoma e conserte. Para o item 2, teste no console: <code>window.nome</code> antes e depois de colocar o <code>let</code>.`)),
    P('🏁', 'CHECKPOINT e DESAFIO',
      lista(['☐ <code>ler()</code> devolve o array certo, na ordem nome, valor, descrição', '☐ <code>limparCampos()</code> esvazia os 3 campos', '☐ As variáveis estão declaradas com <code>let</code> (não vazam)', '☐ Você sabe dizer por que <code>ler()[1]</code> é texto']),
      box('verde', `<strong>Explique com suas palavras</strong> (sem olhar o código): o que a função <code>ler</code> faz, o que ela devolve e por que usa <code>return</code>.`)),
  ], [
    Q('Com os campos "Caneta", "3.5" e "Azul", o que devolve ler()?', '["Caneta", "3.5", "Azul"]', '["Caneta", 3.5, "Azul"]', '{nome: "Caneta", valor: 3.5}', '"Caneta,3.5,Azul"'),
    Q('typeof ler()[1], com o valor digitado "3.5", é:', '"string"', '"number"', '"object"', '"undefined"'),
    Q('document.querySelector("nomeProduto") (sem #) devolve:', 'null (procura uma tag chamada nomeProduto)', 'O campo de nome', 'Um array', 'Um erro de sintaxe'),
    Q('Qual é a diferença entre return produtoLido e console.log(produtoLido)?', 'return entrega o array a quem chamou; console.log apenas mostra no console', 'São iguais', 'console.log entrega o valor e return mostra', 'return mostra na tela'),
    Q('Em ler(), uma linha é nome = document.querySelector("#nomeProduto"); (sem let). O que acontece?', 'A variável nome vira global (vaza para fora da função)', 'Dá erro de sintaxe', 'A variável é apagada', 'Nada, é idêntico a usar let'),
    Q('O que faz document.querySelector("#valorProduto").value = ""; ?', 'Esvazia o campo de valor', 'Apaga o elemento', 'Esconde o campo', 'Valida o campo'),
    Q('let x = ler(); e depois x.length. Qual é o resultado?', '3', '1', '0', 'undefined'),
    Q('Por que o valor do produto, depois de lido, ainda precisa de Number() para calcular?', 'Porque .value sempre devolve texto, mesmo em input type="number"', 'Porque Number() deixa o valor mais bonito', 'Porque o array não aceita números', 'Porque o navegador converte para texto ao guardar'),
    Q('Em produtoLido[2] = descricao.value, o que representa a posição 2 do array?', 'A descrição do produto', 'O valor do produto', 'O nome do produto', 'O id'),
  ]);

  // ══════════════════════════════════════════════════════
  // 95 — LOJA 6: SALVAR O PRODUTO (id, JSON e localStorage)
  // ══════════════════════════════════════════════════════
  PRAT[95] = { tarefas: ['<strong>Checkpoint.</strong> Clicar em Salvar cria, na aba <strong>Application → Local Storage</strong>, uma chave <code>p…</code> com o valor <code>["Caneta","3.5","Azul"]</code>.', '<strong>Checkpoint.</strong> Os 3 campos ficam <strong>vazios</strong> depois de salvar.', '<strong>Checkpoint.</strong> Cadastrar 3 produtos cria <strong>3 chaves diferentes</strong>, todas começando com <code>p</code>.', '<strong>Checkpoint.</strong> No console, <code>JSON.parse(localStorage.getItem("a-sua-chave"))[0]</code> mostra o nome.', '<strong>Explique:</strong> com suas palavras, o que faz cada uma das 3 linhas da função <code>cadastrar</code>.'],
    desafio: '<strong>Desafio.</strong> Descubra, pelo console, <strong>quantos produtos</strong> há guardados <strong>sem olhar a aba Application</strong> (dica: <code>Object.keys(localStorage)</code> e o método <code>filter</code>). <strong>Explique ao professor</strong> o que cada parte faz.' };
  A(95, 'Loja 6: Salvando o Produto (id, JSON e localStorage)', 'Gerar o id único, transformar o array em texto JSON e guardar no localStorage ao clicar em Salvar', '💾', [
    P('💡', 'ENTENDA: guardar tem três pedaços',
      `<p>Para o produto <strong>sobreviver</strong> depois de fechar a página, ele precisa ser guardado no localStorage. Isso exige <strong>três coisas</strong>:</p>`,
      lista(['🏷️ Uma <strong>chave</strong> única: <code>"p" + crypto.randomUUID()</code> (identifica o produto)', '📦 O valor em <strong>texto</strong>: <code>JSON.stringify(array)</code> (o localStorage só guarda texto)', '🔘 Um <strong>botão</strong> que dispare tudo isso: <code>cadastrar()</code>']),
      box('azul', `<strong>Antes de começar, confira:</strong> (1) o <code>ler()</code> e o <code>limparCampos()</code> da aula anterior funcionam no console; (2) o <code>gerenciarProdutos.html</code> está ligado ao <code>gerenciarProdutos.js</code>; (3) existe o botão com <code>id="botaoSalvarProduto"</code>. Se algo falhar, volte e corrija <strong>antes</strong> de seguir.`),
      analogia(`é <strong>guardar uma encomenda no armário</strong>: você escolhe a <strong>etiqueta</strong> (a chave), <strong>embrulha</strong> o produto (stringify) e coloca na prateleira (setItem).`),
      caderno(['Chave = "p" + crypto.randomUUID()', 'Valor = JSON.stringify(array)', 'setItem(chave, valor) guarda · F12 → Application mostra'])),
    etapa('🏷️', 'ETAPA 1: a chave (o id) do produto',
      'Gere o id e entenda <strong>por que</strong> ele tem essa forma.',
      ['No <strong>console</strong>, rode <code>crypto.randomUUID()</code> <strong>três vezes</strong> e compare os resultados', 'Rode <code>"p" + crypto.randomUUID()</code>', 'Responda no caderno: por que o <code>p</code> na frente? (releia a aula 1)'],
      `crypto.randomUUID()
crypto.randomUUID()
"p" + crypto.randomUUID()`,
      ['Os três UUIDs são <strong>diferentes</strong> entre si (por isso servem de identificador)', 'O terceiro resultado começa com <code>p</code>, algo como <code>"p3f2a9c1e-7b4d-..."</code>', 'Se o console responder <code>crypto.randomUUID is not a function</code>, veja a dica 2'],
      ['O UUID é um texto <strong>aleatório e praticamente impossível de repetir</strong>. O <code>p</code> vai na frente porque o id será usado em tags HTML (<code>&lt;tr id="..."&gt;</code>) e um id <strong>não pode começar com número</strong>.', '<code>crypto.randomUUID()</code> só existe em páginas "seguras": <code>https://</code>, <code>localhost</code> e <code>127.0.0.1</code> (Live Server). Se abrir o projeto por um endereço como <code>http://192.168.0.10</code>, dá <em>"is not a function"</em>.', 'Resposta do caderno: "para o id poder ser usado como id de HTML e em <code>querySelector(\'#id\')</code>, que não aceita começar com número".']),
    etapa('💾', 'ETAPA 2: salvarProduto(id, produto)',
      'A função que realmente <strong>guarda</strong>. Ela recebe a <strong>chave</strong> e o <strong>array</strong>.',
      ['Em <code>gerenciarProdutos.js</code>, crie <code>salvarProduto</code> com dois parâmetros: <code>id</code> e <code>produto</code>', 'Dentro, use <code>localStorage.setItem(chave, valor)</code>: a chave é o <code>id</code>, o valor é o <strong>array transformado em texto</strong>', 'Comente, em uma frase, <strong>por que</strong> o stringify é necessário'],
      `// Grava o produto no localStorage (array vira texto com JSON.stringify)
function salvarProduto(id, produto) {
  localStorage.___(___, JSON.___(___));
}`,
      ['No console: <code>salvarProduto("pteste", ["Caneta","3.5","Azul"])</code>', 'Aba <strong>Application → Local Storage</strong>: aparece a chave <code>pteste</code> com valor <code>["Caneta","3.5","Azul"]</code>', 'Apague essa chave de teste (clique nela e aperte Delete)'],
      ['<code>setItem</code> recebe <strong>dois</strong> argumentos: <code>setItem(chave, valor)</code>. A chave aqui é o parâmetro <code>id</code>.', 'O valor precisa ser texto: <code>JSON.stringify(produto)</code>. Se esquecer, o array é guardado como <code>Caneta,3.5,Azul</code>, e depois não consegue ser lido como JSON.', 'Linha-chave: <code>localStorage.setItem(id, JSON.stringify(produto));</code>',
        '<strong>Solução comentada:</strong>' + code(`function salvarProduto(id, produto) {
  // setItem(chave, valor): guarda "valor" na gaveta com o nome "chave"
  // JSON.stringify transforma o array em texto, porque o localStorage só guarda texto
  localStorage.setItem(id, JSON.stringify(produto));
}`)]),
    etapa('🔘', 'ETAPA 3: cadastrar() e o botão',
      'Agora junte as peças em uma função e ligue ao botão. A função <code>cadastrar</code> faz <strong>três coisas, nesta ordem</strong>: ler, salvar com um id novo, limpar.',
      ['Crie <code>cadastrar()</code>: guarde o resultado de <code>ler()</code> em uma variável <code>produto</code>', 'Chame <code>salvarProduto</code> com o id novo (<code>"p" + crypto.randomUUID()</code>) e o <code>produto</code>', 'Chame <code>limparCampos()</code>', 'No <strong>HTML</strong>, ligue o botão: acrescente <code>onclick="cadastrar()"</code> ao <code>button</code> de id <code>botaoSalvarProduto</code>'],
      `function cadastrar() {
  let produto = ___();
  salvarProduto("p" + ___, ___);
  ___();
}

<!-- no HTML, no botão Salvar: -->
<button id="botaoSalvarProduto" type="button" class="btn btn-primary" onclick="___">Salvar</button>`,
      ['Preencha <code>Caneta</code>, <code>3.5</code> e <code>Azul</code> e clique em <strong>Salvar</strong>', 'Os campos esvaziam e, na aba <strong>Application</strong>, aparece <strong>uma</strong> chave nova <code>p…</code> com o array', 'Cadastre mais 2 produtos: <strong>3 chaves diferentes</strong>, todas começando com <code>p</code>'],
      ['O <code>onclick="..."</code> no HTML é um atributo que diz <strong>qual função chamar</strong> ao clicar: <code>onclick="cadastrar()"</code> (com os parênteses, aqui dentro das aspas).', 'Se nada acontece ao clicar, abra o Console: <em>"cadastrar is not defined"</em> = o <code>gerenciarProdutos.js</code> não carregou, ou a função tem outro nome.', 'Ordem: <code>let produto = ler();</code> · <code>salvarProduto("p" + crypto.randomUUID(), produto);</code> · <code>limparCampos();</code>',
        '<strong>Solução comentada:</strong>' + code(`function cadastrar() {
  let produto = ler();                                          // 1. lê o formulário -> array
  salvarProduto("p" + crypto.randomUUID(), produto);            // 2. guarda com um id novo
  limparCampos();                                               // 3. deixa o formulário vazio
}`)]),
    P('🐞', 'ENCONTRE O ERRO: o que dá errado ao salvar',
      code(`// 1) esqueceu o stringify
localStorage.setItem(id, produto);
// valor guardado:  Caneta,3.5,Azul   (o array virou um texto separado por vírgulas)
// mais tarde, ao ler:
JSON.parse("Caneta,3.5,Azul");
// Uncaught SyntaxError: Unexpected token 'C', "Caneta,3.5,Azul" is not valid JSON

// 2) o botão não faz nada
//    Uncaught ReferenceError: cadastrar is not defined      (nome ou arquivo errado)

// 3) crypto.randomUUID is not a function                    (página aberta por IP, e não localhost)

// 4) cada clique cria um produto, mas todos têm a MESMA chave
let id = "p" + crypto.randomUUID();   // fora da função: o id é gerado UMA vez só`),
      lista(['<strong>1:</strong> sempre <code>JSON.stringify</code> ao guardar. Confira o valor na aba Application: tem que começar com <code>[</code> e ter aspas', '<strong>2:</strong> o nome no <code>onclick</code> precisa ser idêntico ao da função; e o <code>script</code> precisa estar no HTML, com o caminho certo', '<strong>3:</strong> abra por <code>localhost</code>/Live Server', '<strong>4:</strong> o id precisa ser gerado <strong>a cada clique</strong>, <em>dentro</em> da função']),
      box('verde', `<strong>Provoque o erro 1</strong>: tire o <code>JSON.stringify</code>, salve, olhe o valor na aba Application e tente <code>JSON.parse</code> no console. Depois conserte e <strong>apague a chave errada</strong> (Application → Delete).`)),
    P('🏁', 'CHECKPOINT e DESAFIO',
      lista(['☐ Salvar cria uma chave <code>p…</code> com o array em JSON', '☐ Os campos esvaziam depois de salvar', '☐ Cada clique gera um <strong>id diferente</strong>', '☐ Você sabe explicar por que o stringify e por que a letra p', '☐ <strong>Se travou:</strong> releia a mensagem do console, abra a Dica 1, depois a 2, depois a 3. A solução comentada é o último recurso (e é para <strong>digitar</strong>)']),
      box('verde', `<strong>Explique com suas palavras:</strong> o que cada uma das 3 linhas de <code>cadastrar</code> faz e o que aconteceria se você trocasse a ordem da segunda e da terceira.`),
      box('azul', `<strong>Atenção:</strong> a tabela ainda não existe: por enquanto, você confere os produtos na aba Application. Na próxima aula você vai <strong>desenhá-los na tela</strong>.`)),
  ], [
    Q('Qual linha guarda corretamente o array produto na chave id?', 'localStorage.setItem(id, JSON.stringify(produto));', 'localStorage.setItem(produto, id);', 'localStorage.setItem(id, produto);', 'localStorage.getItem(id, JSON.stringify(produto));'),
    Q('localStorage.setItem(id, ["Caneta","3.5","Azul"]) (sem stringify) guarda qual texto?', 'Caneta,3.5,Azul', '["Caneta","3.5","Azul"]', 'null', 'undefined'),
    Q('Depois desse erro, JSON.parse("Caneta,3.5,Azul") resulta em:', 'SyntaxError: ... is not valid JSON', 'O array original', 'null', '"Caneta"'),
    Q('Por que o id é gerado DENTRO de cadastrar(), a cada clique?', 'Para cada produto ter uma chave diferente', 'Porque funções não aceitam variáveis fora', 'Porque o UUID só existe dentro de funções', 'Para economizar memória'),
    Q('O botão Salvar não faz nada e o console mostra "cadastrar is not defined". Qual é a causa provável?', 'O gerenciarProdutos.js não carregou, ou a função tem outro nome', 'Faltou o Bootstrap', 'O localStorage está cheio', 'O campo está vazio'),
    Q('crypto.randomUUID is not a function. Em que situação isso costuma acontecer?', 'Quando a página é aberta por um endereço não seguro (por exemplo, http://192.168.x.x)', 'Quando o navegador está sem internet', 'Quando o localStorage está vazio', 'Quando o JSON é inválido'),
    Q('Em cadastrar(), qual é a ordem correta?', 'ler, salvarProduto, limparCampos', 'limparCampos, ler, salvarProduto', 'salvarProduto, limparCampos, ler', 'ler, limparCampos, salvarProduto'),
    Q('Se limparCampos() vier ANTES de ler(), o que será guardado?', 'Um array de textos vazios', 'O produto correto', 'Nada, dá erro', 'O produto anterior'),
    Q('Onde conferir o que foi realmente guardado?', 'F12 → Application → Local Storage', 'F12 → Network', 'F12 → Elements', 'No arquivo HTML'),
  ]);

  // ══════════════════════════════════════════════════════
  // 121 — LOJA 7: LISTAR OS PRODUTOS (criarLinhaHTML e atualizarGrid)
  // ══════════════════════════════════════════════════════
  PRAT[121] = { tarefas: ['<strong>Checkpoint.</strong> Os produtos guardados aparecem na tabela, com <strong>nome, valor, descrição</strong> e os botões Alterar e Excluir.', '<strong>Checkpoint.</strong> Ao salvar um produto novo, ele aparece <strong>na hora</strong>, sem recarregar. Com F5, a tabela continua.', '<strong>Checkpoint.</strong> O valor aparece com <strong>vírgula e 2 casas</strong> ("R$ 3,50").', '<strong>Checkpoint.</strong> Uma chave estranha no localStorage (<code>localStorage.setItem("tema","claro")</code>) <strong>não quebra</strong> nem aparece na tabela.', '<strong>Explique:</strong> com suas palavras, o que fazem <code>insertAdjacentHTML</code> e <code>Number(valor).toFixed(2).replace(".", ",")</code>.'],
    desafio: '<strong>Desafio.</strong> Faça aparecer, quando <strong>não há produtos</strong>, uma linha com "Nenhum produto cadastrado." ocupando as 4 colunas. <strong>Explique ao professor</strong> onde você colocou essa verificação e por quê.' };
  A(121, 'Loja 7: Listando os Produtos na Tabela', 'Montar o HTML de cada linha com template string e desenhar a tabela a partir do localStorage (criarLinhaHTML e atualizarGrid)', '📋', [
    P('💡', 'ENTENDA: a tabela é o retrato dos dados',
      `<p>A tabela <strong>não guarda nada</strong>: ela é uma <strong>foto</strong> do que está no localStorage. Por isso a função que a desenha precisa conseguir refazer <strong>tudo do zero</strong>, a qualquer momento. São <strong>duas funções</strong>:</p>`,
      lista(['🧱 <code>criarLinhaHTML(dados)</code>: devolve o <strong>texto HTML de uma linha</strong> (<code>&lt;tr&gt;...&lt;/tr&gt;</code>) com os dados de <strong>um</strong> produto', '🔁 <code>atualizarGrid()</code>: limpa a tabela, <strong>percorre</strong> o localStorage e, para cada produto, <strong>acrescenta</strong> uma linha']),
      box('azul', `<strong>Antes de começar:</strong> você tem pelo menos <strong>2 produtos</strong> guardados (aba Application) e o <code>tbody id="listaProdutos"</code> no HTML. Se não tiver produtos, cadastre dois agora.`),
      analogia(`o <strong>quadro de avisos</strong>: toda vez, alguém tira todas as folhas e prende as folhas atuais. Se só <em>acrescentasse</em> sem tirar as antigas, as folhas se repetiriam.`),
      caderno(['criarLinhaHTML: dados de 1 produto → texto HTML de 1 linha', 'atualizarGrid: limpa → percorre → filtra p → desenha cada linha', 'Chamar atualizarGrid ao abrir e depois de cada mudança'])),
    etapa('🧱', 'ETAPA 1: criarLinhaHTML(dados), o texto de uma linha',
      'Uma função que recebe <strong>um objeto</strong> com os dados e devolve o HTML da linha. Os <code>${...}</code> dentro das crases são <strong>trocados pelos valores</strong>.',
      ['Crie <code>criarLinhaHTML(dados)</code>', 'Dentro, devolva (<code>return</code>) um <strong>template string</strong> (entre crases) com a linha <code>&lt;tr&gt;</code>', 'A linha tem 4 colunas: nome (<code>dados.produto</code>), valor formatado, descrição e os botões', '<strong>Entenda a expressão do valor</strong>, de dentro para fora: <code>Number(dados.valor)</code> (texto → número) → <code>.toFixed(2)</code> (2 casas, vira texto) → <code>.replace(".", ",")</code> (troca o ponto pela vírgula)'],
      `// Monta o HTML de uma linha da tabela com os dados de um produto.
function criarLinhaHTML(dados) {
  return §
    <tr id="€{dados.___}">
      <td>€{dados.produto}</td>
      <td>R$ €{Number(dados.___).toFixed(2).replace(".", ",")}</td>
      <td>€{dados.___}</td>
      <td>
        <button type="button" class="btn btn-primary" onclick="controle('alterar','€{dados.id}')">Alterar</button>
        <button type="button" class="btn btn-primary" onclick="controle('excluir','€{dados.id}')">Excluir</button>
      </td>
    </tr>
  §;
}`,
      ['Teste no console: <code>criarLinhaHTML({produto:"Caneta", valor:"3.5", descricao:"Azul", id:"p1"})</code>', 'Aparece um <strong>texto</strong> com <code>&lt;tr id="p1"&gt;</code>, <code>Caneta</code>, <code>R$ 3,50</code> e <code>Azul</code>', 'Os botões chamam <code>controle(...)</code>, que <strong>ainda não existe</strong>: clicar neles dará <em>"controle is not defined"</em>. <strong>É esperado</strong> (resolveremos nas próximas aulas)'],
      ['O <code>${...}</code> só funciona dentro de <strong>crases</strong> (<code>§ ... §</code>), e <strong>não</strong> dentro de aspas. Confira se usou crases.', 'Os nomes depois do ponto (<code>dados.produto</code>, <code>dados.valor</code>, <code>dados.descricao</code>, <code>dados.id</code>) são os que <strong>você vai montar</strong> no <code>atualizarGrid</code>. Escolha-os e use os mesmos nos dois lugares.', 'Repare nas aspas dos botões: <code>onclick="controle(\'alterar\',\'€{dados.id}\')"</code>: o id vai <strong>entre aspas simples</strong>. Sem elas, o navegador trata o id como uma variável (veja o passo de erro).',
        '<strong>Solução comentada:</strong>' + code(`function criarLinhaHTML(dados) {
  return §
    <tr id="€{dados.id}">                                  <!-- o id do produto vira o id da linha -->
      <td>€{dados.produto}</td>                            <!-- nome -->
      <td>R$ €{Number(dados.valor).toFixed(2).replace(".", ",")}</td>   <!-- valor: 3.5 -> "3,50" -->
      <td>€{dados.descricao}</td>                          <!-- descrição -->
      <td>                                                 <!-- botões; o id vai ENTRE ASPAS -->
        <button type="button" class="btn btn-primary" onclick="controle('alterar','€{dados.id}')">Alterar</button>
        <button type="button" class="btn btn-primary" onclick="controle('excluir','€{dados.id}')">Excluir</button>
      </td>
    </tr>
  §;
}`)]),
    etapa('🔁', 'ETAPA 2: atualizarGrid(), percorrer e desenhar',
      'Agora a função que <strong>lê o localStorage</strong> e desenha uma linha para cada produto.',
      ['Crie <code>atualizarGrid()</code> e pegue o <code>tbody</code> pelo id <code>#listaProdutos</code>', '<strong>Limpe</strong> o tbody (<code>innerHTML = ""</code>)', 'Percorra <strong>todas as chaves</strong> do localStorage (<code>for</code> com <code>localStorage.length</code> e <code>localStorage.key(j)</code>)', 'Pule as chaves que <strong>não</strong> começam com <code>p</code> (<code>continue</code>)', 'Desembale o texto com <code>JSON.parse</code> e monte o objeto <code>cardDados</code>: <strong>atenção às posições</strong> (0 = nome, 1 = valor, 2 = descrição)', 'Acrescente a linha com <code>insertAdjacentHTML("beforeend", ...)</code>'],
      `// recria a tabela a partir do localStorage
function atualizarGrid() {
  const grid = document.querySelector("#___");
  grid.innerHTML = "";                                  // 1. limpa

  for (let j = 0; j < localStorage.___; j++) {          // 2. percorre as chaves
    let chave = localStorage.___(j);
    if (chave[0] != "___") continue;                    // 3. só produtos
    let produtoVet = JSON.___(localStorage.getItem(___)); // 4. texto -> array

    const cardDados = {                                 // 5. nomes fáceis de ler
      produto: produtoVet[___],
      valor: produtoVet[___],
      descricao: produtoVet[___],
      id: chave,
    };
    grid.insertAdjacentHTML("beforeend", ___(cardDados)); // 6. acrescenta a linha
  }
}`,
      ['No console: <code>atualizarGrid()</code>: a tabela mostra <strong>uma linha por produto</strong>', 'Chame <code>atualizarGrid()</code> de novo: <strong>não</strong> pode duplicar as linhas', 'Cada linha tem nome, <strong>R$ com vírgula</strong>, descrição e dois botões'],
      ['Se as linhas <strong>duplicam</strong>, falta limpar o tbody antes (<code>grid.innerHTML = ""</code>).', '<strong>Posições do array:</strong> <code>[0]</code> nome, <code>[1]</code> valor, <code>[2]</code> descrição. Um erro comum é colocar a descrição no <code>[1]</code>: o valor sai como texto e o preço vira <code>NaN</code>.', 'O <code>insertAdjacentHTML("beforeend", texto)</code> <strong>acrescenta</strong> HTML <em>no fim</em> do elemento, sem apagar o que já existe (diferente de <code>innerHTML =</code>, que substitui tudo).',
        '<strong>Solução comentada:</strong>' + code(`function atualizarGrid() {
  const grid = document.querySelector("#listaProdutos");   // o tbody da tabela
  grid.innerHTML = "";                                      // limpa: senão as linhas se repetem

  for (let j = 0; j < localStorage.length; j++) {           // percorre todas as chaves
    let chave = localStorage.key(j);                        // nome da chave na posição j
    if (chave[0] != "p") continue;                          // pula o que não é produto
    let produtoVet = JSON.parse(localStorage.getItem(chave)); // texto JSON -> array

    const cardDados = {                                     // dá nome a cada posição do array
      produto: produtoVet[0],
      valor: produtoVet[1],
      descricao: produtoVet[2],
      id: chave,
    };
    grid.insertAdjacentHTML("beforeend", criarLinhaHTML(cardDados)); // acrescenta a linha no fim
  }
}`)]),
    etapa('🔌', 'ETAPA 3: chamar no momento certo',
      'A função só ajuda se for <strong>chamada</strong>: ao salvar (para a linha nova aparecer) e ao abrir a página (para os produtos antigos aparecerem).',
      ['Em <code>salvarProduto</code>, <strong>depois do <code>setItem</code></strong>, chame <code>atualizarGrid()</code>', 'Na <strong>última linha do arquivo</strong>, chame <code>atualizarGrid()</code> também', 'Teste: cadastre, recarregue (F5), cadastre de novo'],
      `function salvarProduto(id, produto) {
  localStorage.setItem(id, JSON.stringify(produto));
  ___();                       // redesenha a tabela
}

// ... (o resto das funções) ...

___();                         // última linha do arquivo: desenha ao abrir a página`,
      ['Cadastre um produto: ele aparece <strong>na hora</strong>', 'Aperte F5: os produtos <strong>continuam</strong> na tabela', 'Sem a chamada do fim do arquivo, a tabela fica vazia ao abrir (mesmo com dados guardados)'],
      ['As duas chamadas são a <strong>mesma linha</strong>: <code>atualizarGrid();</code>.', 'A regra de ouro: <strong>mudou os dados? Chame quem redesenha.</strong>', 'Dentro de <code>salvarProduto</code>: depois do <code>setItem</code>, <code>atualizarGrid();</code>. No fim do arquivo: <code>atualizarGrid();</code>']),
    P('🐞', 'ENCONTRE O ERRO: os bugs clássicos da listagem',
      code(`// 1) linhas duplicadas a cada chamada      -> faltou grid.innerHTML = ""

// 2) tabela vazia ao abrir (dados existem)  -> faltou atualizarGrid() no fim do arquivo

// 3) Uncaught SyntaxError: Unexpected token ... is not valid JSON
//    -> faltou o filtro (chave[0] != "p"): o laço tentou JSON.parse de outra chave (ex.: "tema")

// 4) R$ NaN no valor                        -> o índice do valor está errado (usou produtoVet[2])

// 5) as aspas dos botões:
onclick="controle('excluir',€{dados.id})"      // SEM aspas no id
// Ao clicar:  Uncaught ReferenceError: p3f2a9c1e is not defined
// (o id é lido como uma VARIÁVEL; o traço do UUID vira uma conta de subtração)

// 6) O nome vira HTML:   <b>Caneta</b>  aparece em negrito (innerHTML interpreta tags!)`),
      lista(['<strong>1 a 4:</strong> provoque cada um e veja o sintoma. O <strong>3</strong> você pode simular no console: <code>localStorage.setItem("tema","claro")</code> com o <code>if</code> apagado', '<strong>5:</strong> o id é um <strong>texto</strong>; dentro do <code>onclick</code>, texto vai <strong>entre aspas simples</strong>', '<strong>6:</strong> o <code>insertAdjacentHTML</code> interpreta o texto como <strong>HTML</strong>. Se alguém cadastrar um nome com tags, elas <strong>executam</strong>. Isso é uma falha de segurança (XSS) que você vai corrigir na aula de qualidade (<strong>Loja 17</strong>)']),
      box('verde', `<strong>Faça agora:</strong> cadastre um produto com o nome <code>&lt;b&gt;Teste&lt;/b&gt;</code> e veja o resultado na tabela. Anote o que viu: você vai precisar disso na Loja 17.`)),
    P('🏁', 'CHECKPOINT e DESAFIO',
      lista(['☐ A tabela mostra os produtos com nome, valor (com vírgula), descrição e botões', '☐ Salvar atualiza na hora; F5 mantém', '☐ Chaves de outro tipo não quebram nada', '☐ Você anotou o que acontece com um nome que tem <code>&lt;b&gt;</code>', '☐ <strong>Se travou:</strong> 1) leia a mensagem do console; 2) Dica 1, 2, 3; 3) só então a solução comentada, e <strong>digite</strong> linha por linha explicando o que faz']),
      box('verde', `<strong>Explique com suas palavras:</strong> por que o <code>atualizarGrid</code> começa limpando a tabela, por que filtra a letra <code>p</code> e o que faz o <code>insertAdjacentHTML</code>.`)),
  ], [
    Q('Em atualizarGrid, por que o tbody é esvaziado (grid.innerHTML = "") antes de desenhar?', 'Para as linhas não se repetirem a cada chamada', 'Para apagar os produtos do localStorage', 'Porque o navegador exige', 'Para a função rodar mais rápido'),
    Q('O localStorage tem as chaves "pA", "pB" e "tema". Quantas linhas atualizarGrid desenha?', '2', '3', '1', '0'),
    Q('Sem o filtro chave[0] != "p", ao ler a chave "tema" (valor claro) ocorre:', 'SyntaxError ao tentar JSON.parse de um valor que não é JSON', 'Nada, funciona normal', 'A tabela mostra "claro"', 'O laço para sem erro'),
    Q('produtoVet = ["Caneta","3.5","Azul"]. Qual é o valor correto de cardDados.valor?', 'produtoVet[1]', 'produtoVet[0]', 'produtoVet[2]', 'produtoVet[3]'),
    Q('O que mostra Number("3.5").toFixed(2).replace(".", ",")?', '"3,50"', '"3.50"', '3.5', '"3,5"'),
    Q('Qual é a diferença entre grid.insertAdjacentHTML("beforeend", x) e grid.innerHTML = x?', 'O primeiro acrescenta no fim; o segundo substitui todo o conteúdo', 'São idênticos', 'O primeiro apaga e o segundo acrescenta', 'O primeiro só funciona em tabelas'),
    Q('O botão tem onclick="controle(\'excluir\',${dados.id})" (sem aspas no id). O que acontece ao clicar?', 'ReferenceError: o id é lido como uma variável', 'Exclui normalmente', 'Nada acontece', 'Aparece um alerta'),
    Q('A tabela some ao recarregar a página, mas os dados existem. O que provavelmente falta?', 'Chamar atualizarGrid() no fim do arquivo', 'Chamar limparCampos()', 'Trocar let por const', 'Apagar o localStorage'),
    Q('Um produto cadastrado com o nome <b>Teste</b> aparece em negrito na tabela. Por quê?', 'O insertAdjacentHTML interpreta o texto como HTML', 'O Bootstrap deixa em negrito', 'O localStorage converte o texto', 'O Number() altera o nome'),
  ]);

  // ══════════════════════════════════════════════════════
  // 122 — LOJA 8: VALIDAR (is-invalid do Bootstrap)
  // ══════════════════════════════════════════════════════
  PRAT[122] = { tarefas: ['<strong>Checkpoint.</strong> Clicar em Salvar com <strong>algum campo vazio</strong> pinta os 3 campos com <strong>borda vermelha</strong> e <strong>nada é guardado</strong>.', '<strong>Checkpoint.</strong> Com os 3 campos preenchidos, o produto é guardado e a borda vermelha <strong>some</strong>.', '<strong>Checkpoint.</strong> Clicar várias vezes com os campos vazios <strong>não</strong> acumula classes (no Elements, <code>is-invalid</code> aparece <strong>uma vez</strong>).', '<strong>Checkpoint.</strong> Você consegue dizer, em uma frase, o que o <code>classList.contains</code> evita.', '<strong>Explique:</strong> com suas palavras, o caminho de um clique em Salvar com campo vazio, até a borda ficar vermelha.'],
    desafio: '<strong>Desafio.</strong> O sistema aceita o nome <code>"   "</code> (só espaços) e valor <code>-5</code>. Corrija isso: use <code>trim()</code> e recuse valor menor ou igual a zero (lembre do <code>Number.isNaN</code>). <strong>Faça uma tabela de testes</strong> (entrada, esperado, obtido) com 8 casos.' };
  A(122, 'Loja 8: Validando os Campos (is-invalid)', 'Impedir o cadastro com campos vazios e mostrar o erro com a borda vermelha do Bootstrap (is-invalid)', '✅', [
    P('💡', 'ENTENDA: o porteiro e a classe is-invalid',
      `<p>Hoje o sistema aceita <strong>qualquer coisa</strong>, até campos vazios. <strong>Validar</strong> é conferir os dados <strong>antes</strong> de guardar. Se estiverem errados, <strong>não guarda</strong> e <strong>avisa o usuário</strong>.</p>`,
      lista(['🚦 A <strong>regra</strong>: só salva se os <strong>3 campos</strong> estiverem preenchidos', '🔴 O <strong>aviso</strong>: o Bootstrap tem a classe <code>is-invalid</code>, que pinta a borda do campo de <strong>vermelho</strong>', '🧰 Os métodos de <code>classList</code>: <code>add("x")</code> liga a classe, <code>remove("x")</code> desliga, <code>contains("x")</code> pergunta se ela está ligada']),
      box('azul', `<strong>Antes de começar:</strong> o <code>cadastrar()</code> funciona e o formulário tem os 3 campos com os ids da planta. Se não, conserte antes.`),
      analogia(`é o <strong>porteiro</strong> conferindo o crachá: sem crachá completo, não entra, e o <strong>semáforo</strong> do campo fica vermelho.`),
      caderno(['validar("invalido") liga is-invalid nos 3 campos', 'validar("valido") desliga', 'classList.add / remove / contains'])),
    etapa('🔴', 'ETAPA 1: a função validar(situacao)',
      'Uma função que recebe a palavra <code>"invalido"</code> ou <code>"valido"</code> e liga ou desliga a borda vermelha.',
      ['Crie <code>validar(situacao)</code>', 'Se <code>situacao</code> for <code>"invalido"</code> <strong>e</strong> o campo do nome ainda <strong>não tiver</strong> a classe <code>is-invalid</code> (<code>!...classList.contains("is-invalid")</code>), <strong>adicione</strong> a classe nos 3 campos', 'Senão, se <code>situacao</code> for <code>"valido"</code>, <strong>remova</strong> a classe dos 3 campos', 'O <code>contains</code> evita repetir o trabalho a cada clique'],
      `// Mostra ou tira a borda vermelha de erro (classe is-invalid do Bootstrap)
function validar(situacao) {
  if (situacao == "invalido" && !document.querySelector("#nomeProduto").classList.___("is-invalid")) {
    document.querySelector("#nomeProduto").classList.___("is-invalid");
    document.querySelector("#valorProduto").classList.add("is-invalid");
    // TODO: o terceiro campo (descrição)
  } else if (situacao == "___") {
    document.querySelector("#nomeProduto").classList.___("is-invalid");
    // TODO: os outros dois campos
  }
}`,
      ['No console: <code>validar("invalido")</code>: os <strong>3 campos</strong> ficam com borda vermelha', '<code>validar("valido")</code>: as bordas voltam ao normal', 'Chame <code>validar("invalido")</code> <strong>três vezes</strong>: no Elements, a classe <code>is-invalid</code> aparece <strong>uma só vez</strong> em cada campo'],
      ['O <code>&&</code> significa <strong>E</strong>: as duas condições precisam ser verdadeiras. O <code>!</code> inverte: <code>!x.classList.contains(...)</code> = "ainda <strong>não</strong> tem a classe".', 'Ligar uma classe: <code>classList.add("is-invalid")</code>. Desligar: <code>classList.remove("is-invalid")</code>. Repita para os <strong>3 campos</strong>.', 'Campos: <code>#nomeProduto</code>, <code>#valorProduto</code> e <code>#descricaoProduto</code>.',
        '<strong>Solução comentada:</strong>' + code(`function validar(situacao) {
  // se é para marcar erro E o campo ainda não está marcado, marca os 3 campos
  if (situacao == "invalido" && !document.querySelector("#nomeProduto").classList.contains("is-invalid")) {
    document.querySelector("#nomeProduto").classList.add("is-invalid");
    document.querySelector("#valorProduto").classList.add("is-invalid");
    document.querySelector("#descricaoProduto").classList.add("is-invalid");
  } else if (situacao == "valido") {
    // dados corretos: tira a marcação de erro dos 3 campos
    document.querySelector("#nomeProduto").classList.remove("is-invalid");
    document.querySelector("#valorProduto").classList.remove("is-invalid");
    document.querySelector("#descricaoProduto").classList.remove("is-invalid");
  }
}`)]),
    etapa('🚦', 'ETAPA 2: só salvar se estiver tudo preenchido',
      'Agora use a validação dentro do <code>cadastrar()</code>.',
      ['Depois de <code>let produto = ler();</code>, teste: o nome (<code>produto[0]</code>), o valor (<code>produto[1]</code>) e a descrição (<code>produto[2]</code>) são <strong>todos diferentes de vazio</strong> (<code>!= ""</code>)?', 'Se <strong>sim</strong>: salve, limpe os campos e chame <code>validar("valido")</code>', 'Se <strong>não</strong>: chame <code>validar("invalido")</code> e <strong>não salve</strong> nada'],
      `function cadastrar() {
  let produto = ler();
  if (produto[0] != "" && produto[1] != "___" && produto[___] != "") {
    salvarProduto("p" + crypto.randomUUID(), produto);
    limparCampos();
    validar("___");
  } else {
    validar("___");
  }
}`,
      ['Clique em Salvar com <strong>tudo vazio</strong>: 3 bordas vermelhas, nenhuma chave nova no Application', 'Preencha só o nome: continua vermelho (faltam 2 campos)', 'Preencha os 3: salva, limpa os campos e as <strong>bordas voltam ao normal</strong>'],
      ['A condição precisa de <strong>três</strong> testes ligados por <code>&&</code> (E): um para cada posição do array.', 'O <code>else</code> é o caso <strong>"algum campo está vazio"</strong>: só marca o erro e termina. <strong>Nada</strong> é guardado.', '<code>if (produto[0] != "" && produto[1] != "" && produto[2] != "") { ... salva ... validar("valido"); } else { validar("invalido"); }</code>',
        '<strong>Solução comentada:</strong>' + code(`function cadastrar() {
  let produto = ler();                                          // 1. lê os 3 campos
  // 2. só salva se os 3 estiverem preenchidos
  if (produto[0] != "" && produto[1] != "" && produto[2] != "") {
    salvarProduto("p" + crypto.randomUUID(), produto);          // 3. guarda
    limparCampos();                                             // 4. limpa o formulário
    validar("valido");                                          // 5. tira a borda vermelha
  } else {
    validar("invalido");                                        // 6. algum campo vazio: marca o erro
  }
}`)]),
    P('🐞', 'ENCONTRE O ERRO + O QUE A VALIDAÇÃO AINDA NÃO FAZ',
      code(`// 1) o produto vazio é guardado MESMO COM as bordas vermelhas
//    -> faltou o else (ou o salvarProduto está fora do if)

// 2) a borda vermelha NÃO sai depois de preencher e salvar
//    -> faltou validar("valido") depois de salvar

// 3) acumulou classes? Não: classList.add não repete. O contains só evita trabalho extra

// 4) buracos que ainda existem (para você descobrir):
ler()   // com nome "   " (só espaços)      -> "   " != ""  é verdadeiro: PASSA!
ler()   // com valor "-5"                    -> passa
ler()   // com valor "abc" (campo number recusa letras: vira "")  -> o navegador ajuda aqui`),
      lista(['<strong>1 e 2:</strong> confira a estrutura <code>if { salva } else { avisa }</code>', '<strong>4:</strong> a nossa regra só confere se está <strong>vazio</strong>. Ela <strong>não</strong> pega espaços nem números negativos. Melhore isso no <strong>desafio</strong> (e pesquise <code>trim()</code>)']),
      box('verde', `<strong>Faça uma tabela de testes</strong> no caderno (entrada, resultado esperado, resultado obtido). Casos mínimos: tudo vazio; só nome; só valor; espaços no nome; valor 0; valor negativo; tudo certo. <strong>Testar casos extremos</strong> é o que torna um sistema confiável.`),
      atencao(`bons sistemas também mostram <strong>qual</strong> campo está errado e <strong>por quê</strong> (o Bootstrap tem <code>invalid-feedback</code> para isso). Como melhoria futura: marcar só o campo vazio.`)),
    P('🏁', 'CHECKPOINT e DESAFIO',
      lista(['☐ Campo vazio: bordas vermelhas e nada guardado', '☐ Tudo preenchido: guarda, limpa e as bordas voltam ao normal', '☐ Você sabe explicar <code>&&</code>, <code>!</code> e <code>classList.contains</code>', '☐ Você fez a tabela de testes e anotou o que a validação <strong>ainda não</strong> pega']),
      box('verde', `<strong>Explique com suas palavras:</strong> por que o <code>validar</code> recebe a palavra <code>"valido"</code> ou <code>"invalido"</code>? E por que <code>"   "</code> (só espaços) passa na validação atual?`)),
  ], [
    Q('O que a classe is-invalid do Bootstrap faz em um campo?', 'Pinta a borda de vermelho', 'Desabilita o campo', 'Esconde o campo', 'Apaga o texto do campo'),
    Q('O que faz campo.classList.contains("is-invalid")?', 'Devolve true se o campo já tem a classe', 'Liga a classe', 'Desliga a classe', 'Apaga o campo'),
    Q('O que significa o && em produto[0] != "" && produto[1] != ""?', 'E: as duas condições precisam ser verdadeiras', 'OU: basta uma ser verdadeira', 'Compara se são iguais', 'Soma as condições'),
    Q('Com o formulário todo vazio, o que acontece ao clicar em Salvar (com a validação pronta)?', 'As bordas ficam vermelhas e nada é guardado', 'Guarda um produto vazio', 'Dá erro no console', 'Nada acontece'),
    Q('O produto é guardado mesmo com as bordas vermelhas. Qual é a causa provável?', 'O salvarProduto está fora do if (ou faltou o else)', 'O is-invalid não existe', 'O Bootstrap está desatualizado', 'O localStorage está cheio'),
    Q('Depois de salvar com sucesso, a borda vermelha continua. O que faltou?', 'Chamar validar("valido")', 'Chamar validar("invalido")', 'Chamar atualizarGrid()', 'Trocar != por =='),
    Q('Com nome "   " (só espaços), a validação atual (produto[0] != "") faz o quê?', 'Aceita o nome, pois "   " não é igual a ""', 'Recusa o nome', 'Dá erro', 'Transforma em vazio'),
    Q('Qual método remove os espaços das pontas de um texto?', 'trim()', 'slice()', 'replace()', 'split()'),
    Q('Por que o formulário deve mostrar qual campo está errado, e não só uma borda geral?', 'O usuário precisa saber exatamente o que corrigir', 'Porque o Bootstrap exige', 'Para o código ficar menor', 'Porque o localStorage pede'),
  ]);

  // ══════════════════════════════════════════════════════
  // 123 — LOJA 9: controle(), A FUNÇÃO CENTRAL
  // ══════════════════════════════════════════════════════
  PRAT[123] = { tarefas: ['<strong>Checkpoint.</strong> Tudo continua funcionando como antes: salvar, validar, listar. <strong>A refatoração não pode mudar o comportamento.</strong>', '<strong>Checkpoint.</strong> O botão Salvar agora tem <code>onclick="controle(\'salvar\', \'p\')"</code> e a função <code>cadastrar</code> <strong>não existe mais</strong>.', '<strong>Checkpoint.</strong> A última linha do arquivo é <code>controle("listar", "")</code>.', '<strong>Checkpoint.</strong> Clicar em Alterar/Excluir na tabela <strong>não dá mais erro</strong> (mas ainda não faz nada).', '<strong>Explique:</strong> com suas palavras, por que existe uma função central e o que significa o id <code>"p"</code> sozinho.'],
    desafio: '<strong>Desafio.</strong> Acrescente a <code>controle</code> uma opção <code>"limpar"</code> que só chama <code>limparCampos()</code>, e um botão "Limpar" no HTML que a use. <strong>Explique ao professor</strong> quais 3 lugares você teve que mexer.' };
  A(123, 'Loja 9: A Função Central controle()', 'Reorganizar o código: todos os botões chamam controle(opcao, id), que decide o que fazer', '🎛️', [
    P('💡', 'ENTENDA: uma função que recebe ordens',
      `<p>Até aqui, cada botão chama uma função diferente. O projeto usa outra ideia: <strong>todos os botões chamam a mesma função</strong>, <code>controle(opcao, id)</code>, dizendo <strong>o que fazer</strong> (<code>opcao</code>) e <strong>em qual produto</strong> (<code>id</code>).</p>`,
      lista(['🔹 <code>controle("salvar", "p")</code>: cadastrar um produto <strong>novo</strong>', '🔹 <code>controle("listar", "")</code>: desenhar a tabela', '🔹 (nas próximas aulas) <code>controle("excluir", id)</code>, <code>controle("alterar", id)</code>, <code>controle("bloquear", "")</code>']),
      analogia(`é a <strong>central de atendimento</strong> de uma empresa: todo cliente liga para o mesmo número, diz o que quer e a central encaminha para o setor certo.`),
      box('azul', `<strong>O id <code>"p"</code> sozinho</strong> é um combinado do projeto: significa <strong>"produto novo"</strong> (ainda sem id). Um id de verdade é <code>"p3f2a..."</code>. Assim a mesma opção <code>"salvar"</code> serve para <strong>cadastrar</strong> (<code>id == "p"</code>) e para <strong>alterar</strong> (<code>id != "p"</code>), que você fará na Loja 12.`),
      caderno(['controle(opcao, id) decide o que fazer', 'id "p" sozinho = produto novo', 'Refatorar = reorganizar sem mudar o resultado'])),
    etapa('🎛️', 'ETAPA 1: escrever o controle()',
      'Mova o que estava em <code>cadastrar()</code> para dentro de <code>controle</code> e acrescente a opção <code>"listar"</code>.',
      ['Crie <code>controle(opcao, id)</code> e, dentro, a variável <code>let produto = [];</code>', 'Se <code>opcao == "salvar"</code> <strong>e</strong> <code>id == "p"</code>: o que era do <code>cadastrar()</code> (ler, validar, salvar, limpar)', 'Senão, se <code>opcao == "listar"</code>: chame <code>atualizarGrid()</code>', 'Apague a função <code>cadastrar()</code> (agora ela é desnecessária)'],
      `// Função central: os botões dizem O QUE fazer (opcao) e EM QUAL produto (id)
function controle(opcao, id) {
  let produto = [];
  if (opcao == "___" && id == "___") {
    // CADASTRO NOVO
    produto = ler();
    if (produto[0] != "" && produto[1] != "" && produto[2] != "") {
      salvarProduto("p" + crypto.randomUUID(), produto);
      limparCampos();
      validar("valido");
    } else {
      validar("invalido");
    }
  } else if (opcao == "___") {
    // usado ao abrir a página: desenha os produtos já cadastrados
    ___();
  }
}`,
      ['No console: <code>controle("listar", "")</code> desenha a tabela', 'Com os campos preenchidos: <code>controle("salvar", "p")</code> cadastra um produto', 'Com os campos vazios: o mesmo comando marca as bordas vermelhas'],
      ['Compare as aspas: <code>"salvar"</code> e <code>"p"</code> são <strong>textos</strong>, escritos exatamente como serão chamados. Uma letra diferente e a opção não é reconhecida.', 'O <code>==</code> compara dois valores. O <code>&&</code> liga duas condições ("e"). O <code>else if</code> é a <strong>segunda opção</strong>.', 'O corpo do primeiro <code>if</code> é o que estava dentro do <code>cadastrar()</code>.',
        '<strong>Solução comentada:</strong>' + code(`function controle(opcao, id) {
  let produto = [];
  if (opcao == "salvar" && id == "p") {                 // CADASTRO NOVO
    produto = ler();
    if (produto[0] != "" && produto[1] != "" && produto[2] != "") {
      salvarProduto("p" + crypto.randomUUID(), produto);
      limparCampos();
      validar("valido");
    } else {
      validar("invalido");
    }
  } else if (opcao == "listar") {                       // ao abrir a página
    atualizarGrid();
  }
}`)]),
    etapa('🔘', 'ETAPA 2: ligar botões e a abertura da página ao controle',
      'Agora troque as chamadas antigas pela nova função central.',
      ['No HTML, no botão <code>botaoSalvarProduto</code>, troque <code>onclick="cadastrar()"</code> por <code>onclick="controle(\'salvar\', \'p\')"</code>', 'Apague a função <code>cadastrar</code> do JavaScript', 'Na <strong>última linha</strong> do arquivo, troque <code>atualizarGrid();</code> por <code>controle("listar", "");</code>', 'Teste tudo de novo'],
      `<!-- HTML: o botão Salvar -->
<button id="botaoSalvarProduto" type="button" class="btn btn-primary" onclick="controle('___', '___')">Salvar</button>

// JavaScript, última linha do arquivo:
controle("___", "");`,
      ['Cadastrar, validar (campo vazio) e listar ao abrir a página: <strong>tudo funciona como antes</strong>', 'No Console: <strong>nenhum erro</strong>', 'Clicar em Alterar/Excluir na tabela não faz nada e <strong>não dá erro</strong> (a função <code>controle</code> agora existe, mas ainda não tem essas opções)'],
      ['<strong>Cuidado com as aspas dentro do <code>onclick</code>:</strong> o atributo usa aspas duplas por fora (<code>onclick="..."</code>), então por dentro use <strong>aspas simples</strong>: <code>controle(\'salvar\', \'p\')</code>.', 'Se aparecer <em>"cadastrar is not defined"</em>, ainda existe uma chamada à função apagada: procure por <code>cadastrar</code> no HTML e no JS.', '<code>onclick="controle(\'salvar\', \'p\')"</code> e, na última linha, <code>controle("listar", "");</code>']),
    P('🧠', 'LEIA O CÓDIGO: o que o controle faz com cada clique',
      `<p>Simule <strong>no caderno</strong>, como se fosse o computador. Para cada situação, diga <strong>qual bloco do controle executa</strong>:</p>`,
      lista(['1) O usuário clica em <strong>Salvar</strong>, com os 3 campos preenchidos. Chamada: <code>controle("salvar", "p")</code>', '2) O usuário clica em <strong>Salvar</strong> com um campo vazio', '3) A página acaba de abrir. Chamada: <code>controle("listar", "")</code>', '4) O botão Excluir de uma linha chama <code>controle("excluir", "p3f2a")</code>. <strong>Qual bloco executa hoje?</strong>']),
      box('verde', `<strong>Respostas:</strong> 1) primeiro <code>if</code>, ramo "tudo preenchido": salva, limpa, tira a borda. 2) primeiro <code>if</code>, ramo <code>else</code>: marca o erro. 3) <code>else if (opcao == "listar")</code>: desenha a tabela. 4) <strong>nenhum</strong>: a opção ainda não existe no controle, então nada acontece. É por isso que a próxima aula acrescenta uma rota nova.`)),
    P('🐞', 'ENCONTRE O ERRO + CHECKPOINT',
      code(`// 1) ReferenceError: cadastrar is not defined
//    -> sobrou um onclick="cadastrar()" no HTML

// 2) o botão não faz nada
onclick="controle(salvar, p)"          // sem aspas: salvar e p viram variáveis inexistentes
// Uncaught ReferenceError: salvar is not defined

// 3) "Salvar" com S maiúsculo
controle("Salvar", "p")                // nenhuma opção reconhecida: NADA acontece, sem erro

// 4) = em vez de ==
if (opcao = "salvar" && id == "p")     // atribui em vez de comparar: comportamento errado`),
      lista(['<strong>1:</strong> procure (Ctrl+F) por <code>cadastrar</code> em todos os arquivos', '<strong>2 e 3:</strong> o texto precisa ser idêntico, inclusive maiúsculas. Quando <strong>nada</strong> acontece e não há erro, desconfie de uma opção escrita errado', '<strong>4:</strong> <code>=</code> guarda um valor; <code>==</code> compara']),
      lista(['☐ Todas as funcionalidades antigas funcionam', '☐ <code>cadastrar</code> foi removida', '☐ O botão e a última linha usam o controle', '☐ Você explicou, em voz alta, o trajeto de um clique em Salvar']),
      box('verde', `<strong>Explique com suas palavras:</strong> o que significa o id <code>"p"</code> sozinho e por que usar uma função central é melhor que uma função por botão (pense em quantos lugares mudam se você acrescentar uma opção).`)),
  ], [
    Q('O botão Salvar chama controle(\'salvar\', \'p\'). O que o "p" sozinho significa neste projeto?', 'Produto novo, ainda sem id', 'O id de um produto qualquer', 'A letra inicial de "preço"', 'Um produto já excluído'),
    Q('Com os 3 campos preenchidos, qual bloco executa em controle("salvar", "p")?', 'O primeiro if, ramo em que salva, limpa e chama validar("valido")', 'O else if de listar', 'Nenhum bloco', 'O ramo que chama validar("invalido")'),
    Q('Com um campo vazio, qual é o resultado de controle("salvar", "p")?', 'validar("invalido"): marca as bordas e não guarda', 'Guarda um produto com campo vazio', 'Dá erro no console', 'Desenha a tabela'),
    Q('controle("Salvar", "p") (S maiúsculo) faz o quê?', 'Nada: nenhuma condição reconhece "Salvar", e não há erro', 'Cadastra o produto', 'Dá SyntaxError', 'Chama listar'),
    Q('O botão tem onclick="controle(salvar, p)" (sem aspas). O que acontece ao clicar?', 'ReferenceError: salvar is not defined', 'Cadastra o produto', 'Nada acontece, sem erro', 'Lista os produtos'),
    Q('Por que, dentro de onclick="...", usamos aspas simples (\'salvar\')?', 'As aspas duplas já fecham o atributo; por dentro precisa ser outro tipo', 'Porque o JavaScript só aceita aspas simples', 'Para o código ficar mais rápido', 'Porque aspas duplas são proibidas no HTML'),
    Q('O que é refatorar, como fizemos ao criar o controle?', 'Reorganizar o código sem mudar o que ele faz', 'Apagar funções que funcionam', 'Adicionar uma função nova de cadastro', 'Mudar a cor da página'),
    Q('Qual é a vantagem de uma função central como controle()?', 'Acrescentar uma opção nova é mudar em um só lugar', 'O código roda mais rápido', 'O Bootstrap exige', 'Não precisa mais de ids'),
    Q('if (opcao = "salvar" && id == "p"). Qual é o problema?', 'O = guarda um valor em vez de comparar; precisa ser ==', 'Faltam parênteses', 'O && é inválido em if', 'Não há problema'),
  ]);

  // ══════════════════════════════════════════════════════
  // 72 — LOJA 10: EXCLUIR O PRODUTO
  // ══════════════════════════════════════════════════════
  PRAT[72] = { tarefas: ['<strong>Checkpoint.</strong> Clicar em Excluir <strong>pergunta antes</strong>; Cancelar não apaga nada; OK apaga o produto da tabela e do Application.', '<strong>Checkpoint.</strong> Simule um item no carrinho pelo console (veja a etapa 3): excluir o produto apaga <strong>também</strong> a chave <code>c…</code>.', '<strong>Checkpoint.</strong> Os <strong>outros produtos</strong> continuam intactos.', '<strong>Checkpoint.</strong> Excluir o <strong>último</strong> produto deixa a tabela vazia, sem erro.', '<strong>Explique:</strong> com suas palavras, o que é um "produto fantasma" e como a função evita.'],
    desafio: '<strong>Desafio.</strong> Faça o botão <strong>"Excluir tudo"</strong> (acima da tabela) que apaga <strong>só</strong> as chaves <code>p…</code> e <code>c…</code>. Cuidado: <strong>não apague dentro do laço</strong> que percorre o localStorage. <strong>Explique ao professor</strong> por que isso pularia itens.' };
  A(72, 'Loja 10: Excluindo um Produto', 'Pedir confirmação, apagar o produto e a cópia do carrinho e redesenhar a tabela', '🗑️', [
    P('💡', 'ENTENDA: excluir tem consequências',
      `<p>Excluir parece simples (<code>removeItem</code> e pronto), mas na loja o produto pode ter uma <strong>cópia no carrinho</strong> (chave <code>c</code> + o resto do id). Apagando só o produto, a cópia <strong>fica órfã</strong>: aparece no carrinho um produto que já não existe. É o <strong>"produto fantasma"</strong>.</p>`,
      lista(['1️⃣ <strong>Perguntar</strong> (<code>confirm</code>), porque excluir não tem volta', '2️⃣ Apagar o <strong>produto</strong> (<code>removeItem(id)</code>)', '3️⃣ Apagar a <strong>cópia do carrinho</strong> (<code>removeItem("c" + id.slice(1))</code>)', '4️⃣ <strong>Redesenhar</strong> a tabela']),
      box('azul', `<strong>Antes de começar:</strong> o <code>controle()</code> existe (aula anterior) e os botões Excluir da tabela chamam <code>controle('excluir', id)</code>. Cadastre 3 produtos de teste.`),
      analogia(`é <strong>cancelar um curso</strong>: além de apagar o curso, é preciso cancelar a <strong>matrícula</strong> dos alunos. Senão a lista fica com alunos em um curso que não existe.`),
      caderno(['Excluir produto = apagar p… e a cópia c…', 'id.slice(1) tira a primeira letra', 'confirm devolve true (OK) ou false (Cancelar)'])),
    etapa('🗑️', 'ETAPA 1: a função excluirProduto(id)',
      'Pergunte, apague as duas chaves e redesenhe a tabela.',
      ['Crie <code>excluirProduto(id)</code>', 'Use <code>confirm("Deseja excluir o produto?")</code> e guarde a resposta (<code>true</code> ou <code>false</code>)', '<strong>Só se confirmou</strong>: <code>removeItem(id)</code>, depois <code>removeItem("c" + id.slice(1))</code> e <code>atualizarGrid()</code>'],
      `// Pergunta e, se confirmar, apaga o produto do localStorage
function excluirProduto(id) {
  let confirma = ___("Deseja excluir o produto?");
  if (___) {
    localStorage.___(id);
    localStorage.removeItem("c" + id.___(1));    // tira também do carrinho
    ___();
  }
}`,
      ['No console, com o id de um produto: <code>excluirProduto("p…")</code> → aparece a pergunta', 'Cancelar: nada muda. OK: o produto some da tabela e da aba Application', 'A chave do carrinho (se existir) também some'],
      ['O <code>confirm</code> abre uma caixa com OK e Cancelar e devolve <code>true</code> (OK) ou <code>false</code> (Cancelar). O <code>if (confirma)</code> só executa no <code>true</code>.', 'A chave da cópia é <code>"c" + id.slice(1)</code>: <code>slice(1)</code> descarta a primeira letra (o <code>p</code>) e mantém o resto.', '<code>removeItem</code> de uma chave que <strong>não existe</strong> não dá erro: pode chamar sempre.',
        '<strong>Solução comentada:</strong>' + code(`function excluirProduto(id) {
  let confirma = confirm("Deseja excluir o produto?");   // true se o usuário clicar em OK
  if (confirma) {
    localStorage.removeItem(id);                          // apaga o produto (chave p...)
    localStorage.removeItem("c" + id.slice(1));           // apaga a cópia no carrinho (chave c...)
    atualizarGrid();                                      // redesenha a tabela
  }
}`)]),
    etapa('🎛️', 'ETAPA 2: acrescentar a opção "excluir" ao controle',
      'O botão Excluir da tabela chama <code>controle("excluir", id)</code>. Ensine o controle a reconhecer essa opção.',
      ['Em <code>controle</code>, acrescente <strong>mais um</strong> <code>else if</code>: se <code>opcao == "excluir"</code>, chame <code>excluirProduto(id)</code>', 'Teste clicando nos botões Excluir da tabela'],
      `} else if (opcao == "listar") {
  atualizarGrid();
} else if (opcao == "___") {
  ___(id);
}`,
      ['Clicar em <strong>Excluir</strong> na tabela abre a pergunta e apaga o produto escolhido (e só ele)', 'Funciona para o <strong>1º, o do meio e o último</strong> da tabela'],
      ['Cada <code>else if</code> é uma <strong>nova opção</strong> que o controle reconhece. Acrescentar uma opção é isso: mais um <code>else if</code>.', 'Se nada acontece, confira se escreveu <code>"excluir"</code> exatamente como está no <code>onclick</code> do botão.', '<code>} else if (opcao == "excluir") { excluirProduto(id); }</code>']),
    etapa('👻', 'ETAPA 3: provar que não existe produto fantasma',
      'Como ainda não há carrinho, <strong>simule</strong> pelo console e confira se a função cumpre a promessa.',
      ['Cadastre um produto e copie a chave dele (aba Application)', 'No console, <strong>crie a cópia do carrinho</strong> (comando abaixo, trocando pela sua chave)', 'Confira no Application: agora existem <code>p…</code> e <code>c…</code>', 'Exclua o produto pelo botão da tabela: as <strong>duas</strong> chaves devem sumir'],
      `// no CONSOLE (troque pela sua chave):
let id = "p3f2a9c1e-7b4d-4c2a-9e1f-0a5b6c7d8e9f";
localStorage.setItem("c" + id.slice(1), localStorage.getItem(id));`,
      ['Antes de excluir: aparecem <code>p…</code> e <code>c…</code> no Application', 'Depois de excluir e confirmar: <strong>nenhuma</strong> das duas', 'Se a <code>c…</code> sobrou, a segunda linha do <code>excluirProduto</code> está errada'],
      ['Se a <code>c…</code> sobrou, <code>console.log("c" + id.slice(1))</code> dentro da função mostra <strong>qual chave</strong> está sendo apagada. Compare com a que existe.', 'O erro mais comum é escrever <code>"c" + id</code> (sem o <code>slice(1)</code>), que gera <code>cp3f2a…</code> (uma chave que nunca existiu).', 'A chave é exatamente <code>"c" + id.slice(1)</code>.']),
    P('🐞', 'ENCONTRE O ERRO: o que costuma dar errado ao excluir',
      code(`// 1) id sem aspas dentro do onclick
onclick="controle('excluir',€{dados.id})"
// Uncaught ReferenceError: p3f2a9c1e is not defined    (o id é lido como variável)

// 2) esqueceu a cópia do carrinho -> "produto fantasma"
localStorage.removeItem(id);                           // só o produto

// 3) apagar DENTRO do laço que percorre o localStorage: pula chaves
for (let i = 0; i < localStorage.length; i++) {
  let chave = localStorage.key(i);
  if (chave[0] == "p") localStorage.removeItem(chave); // ao remover, as chaves seguintes "andam" uma posição
}
// Exemplo: [p1, p2, p3]. Remove p1 (i=0) -> ficam [p2, p3]. Agora i=1 aponta para p3, e o p2 foi PULADO

// 4) o if sem confirma: apaga mesmo se o usuário clicar em Cancelar
localStorage.removeItem(id);                           // fora do if (confirma)`),
      lista(['<strong>1:</strong> o id é <strong>texto</strong>: dentro do <code>onclick</code> vai entre aspas simples', '<strong>2:</strong> pense em <strong>tudo que depende</strong> do dado que você apaga', '<strong>3:</strong> para apagar várias, <strong>primeiro junte as chaves</strong> num array e <strong>depois</strong> apague uma a uma (é o desafio da prática)', '<strong>4:</strong> o <code>removeItem</code> precisa estar <strong>dentro</strong> do <code>if (confirma)</code>']),
      box('verde', `<strong>Provoque os 4</strong>, observe e conserte.`)),
    P('🏁', 'CHECKPOINT e DESAFIO',
      lista(['☐ Excluir pergunta e respeita o Cancelar', '☐ Apaga o produto e a cópia do carrinho', '☐ Só o produto escolhido some', '☐ O controle reconhece a opção "excluir"', '☐ <strong>Se travou:</strong> console → Dicas 1, 2 e 3 → solução comentada (digitando)']),
      box('verde', `<strong>Explique com suas palavras:</strong> o que é o produto fantasma, como o seu <code>excluirProduto</code> evita, e por que apagar chaves dentro do laço que percorre o localStorage pula itens.`)),
  ], [
    Q('O que devolve confirm("Deseja excluir?") quando o usuário clica em Cancelar?', 'false', 'true', 'null', 'undefined'),
    Q('Por que excluirProduto também apaga a chave "c" + id.slice(1)?', 'Para não sobrar a cópia do produto no carrinho (produto fantasma)', 'Porque o localStorage exige duas remoções', 'Porque a chave c guarda o preço', 'Para liberar memória'),
    Q('Para id = "p123", qual é o valor de "c" + id.slice(1)?', '"c123"', '"cp123"', '"p123c"', '"123"'),
    Q('Para id = "p123", o que gera "c" + id (sem slice)?', '"cp123", uma chave que nunca existiu', '"c123"', '"p123"', 'Um erro de sintaxe'),
    Q('localStorage.removeItem("chaveQueNaoExiste") faz o quê?', 'Nada, sem erro', 'Dá erro no console', 'Apaga todo o localStorage', 'Cria a chave vazia'),
    Q('Ao clicar em Excluir, aparece "ReferenceError: p3f2a9c1e is not defined". Qual é a causa?', 'O id está sem aspas dentro do onclick', 'Faltou o confirm', 'O produto já foi excluído', 'O localStorage está vazio'),
    Q('Com chaves [p1, p2, p3], um laço que remove p1 na posição i = 0 e segue para i = 1 pula qual chave?', 'p2', 'p3', 'p1', 'Nenhuma'),
    Q('Qual é a estratégia correta para apagar várias chaves?', 'Juntar as chaves em um array e só depois apagar uma a uma', 'Apagar dentro do for sem cuidado', 'Recarregar a página', 'Usar while sempre'),
    Q('O removeItem está fora do if (confirma). O que acontece ao clicar em Cancelar?', 'O produto é apagado mesmo assim', 'Nada', 'Dá erro', 'A tabela é redesenhada sem mudar'),
  ]);

  // ══════════════════════════════════════════════════════
  // 127 — LOJA 5: COMO ESCREVER UMA FUNÇÃO (a receita)
  // ══════════════════════════════════════════════════════
  PRAT[127] = { tarefas: ['<strong>Checkpoint.</strong> <code>somar(2, 3)</code> devolve <code>5</code> e <code>dobro(4)</code> devolve <code>8</code> no console.', '<strong>Checkpoint.</strong> <code>lerNome()</code> devolve o texto digitado no campo do nome do <code>gerenciarProdutos.html</code>.', '<strong>Checkpoint.</strong> <code>nomePreenchido()</code> devolve <code>true</code> com o campo preenchido e <code>false</code> com o campo vazio.', '<strong>Checkpoint.</strong> Para cada função, você escreveu <strong>primeiro os comentários</strong> (o plano) e só depois o código.', '<strong>Explique:</strong> com suas palavras, a diferença entre <strong>parâmetro</strong> e <strong>return</strong>, e o que acontece se esquecer o <code>return</code>.'],
    desafio: '<strong>Desafio.</strong> Escreva <code>mediaDeTres(a, b, c)</code> que devolve a média. Use a receita (nome, o que recebe, o que devolve, comentários, código, teste). Depois escreva <code>maior(a, b)</code> (devolve o maior dos dois). <strong>Mostre ao professor</strong> o plano em comentários e os testes.' };
  A(127, 'Loja 5: Como Escrever uma Função (a Receita)', 'Aprender a pensar e escrever qualquer função do zero, antes de começar as funções do projeto', '🧑‍🍳', [
    P('💡', 'ENTENDA: o que é uma função e de que partes ela é feita',
      `<p>Uma <strong>função</strong> é uma <strong>receita com nome</strong>: um grupo de instruções que você escreve <strong>uma vez</strong> e pode executar <strong>quantas vezes quiser</strong>, só "chamando" o nome. No projeto, <strong>quase tudo é função</strong>, então vale entender bem de que partes ela é feita:</p>`,
      code(`function somar(a, b) {      // 1. a palavra function, o NOME (somar) e os PARÂMETROS (a, b)
  let resultado = a + b;     // 2. o CORPO: as instruções, entre chaves { }
  return resultado;          // 3. o RETURN: o que a função ENTREGA de volta
}

somar(2, 3);                 // 4. a CHAMADA: "execute a receita com a = 2 e b = 3"  ->  5`),
      lista(['🏷️ <strong>Nome</strong> (<code>somar</code>): como você chama. Use um <strong>verbo</strong> que diga o que a função faz: <code>lerProduto</code>, <code>limparCampos</code>', '📥 <strong>Parâmetros</strong> (<code>a, b</code>): os <strong>ingredientes</strong> que a função recebe de fora. Podem ser nenhum (<code>()</code>), um ou vários', '🍳 <strong>Corpo</strong> (entre <code>{ }</code>): o passo a passo da receita', '📤 <strong>return</strong>: o <strong>prato pronto</strong>, entregue a quem chamou. <strong>Sem return</strong>, a função faz o trabalho, mas <strong>devolve <code>undefined</code></strong> (nada)']),
      analogia(`é uma <strong>máquina de suco</strong>: você coloca as frutas (parâmetros), ela faz o trabalho (corpo) e entrega o copo de suco (return). Escrever a função é <em>montar a máquina</em>; chamar a função é <em>apertar o botão</em>.`),
      box('azul', `<strong>Três tipos de função</strong> que você vai escrever no projeto:<br>(1) que <strong>devolve algo</strong>, como <code>ler()</code>; (2) que <strong>faz uma ação</strong> e não devolve nada, como <code>limparCampos()</code>; (3) que <strong>recebe dados e faz uma ação</strong>, como <code>salvarProduto(id, produto)</code>.`),
      caderno(['function nome(parâmetros) { corpo; return resultado; }', 'Chamar = nome(valores)', 'Sem return → undefined'])),
    P('📋', 'A RECEITA DE 6 PASSOS para escrever qualquer função',
      `<p>Quem trava na hora de escrever uma função geralmente tenta escrever o código logo de cara. O truque dos programadores é <strong>planejar primeiro, em português</strong>. Siga sempre estes 6 passos:</p>`,
      lista(['1️⃣ <strong>Dê um nome</strong> com verbo (<code>calcularDobro</code>)', '2️⃣ <strong>O que ela RECEBE?</strong> (os parâmetros) Se nada, deixe <code>()</code> vazio', '3️⃣ <strong>O que ela FAZ ou DEVOLVE?</strong> Escreva em <strong>uma frase</strong>', '4️⃣ <strong>Escreva o passo a passo como COMENTÁRIOS</strong> dentro da função (<code>// 1. ...</code>)', '5️⃣ <strong>Troque cada comentário por código</strong>, um de cada vez', '6️⃣ <strong>TESTE no console</strong> com alguns valores. Errou? Descubra em qual passo']),
      `<div style="margin-top:12px;font-weight:700">📘 A receita aplicada a <code>dobro</code> ("receba um número e devolva o dobro"):</div>`,
      code(`// PASSOS 1 a 4: nome, parâmetro, objetivo e plano em comentários
function dobro(numero) {
  // 1. multiplicar o número por 2
  // 2. devolver o resultado
}

// PASSO 5: cada comentário vira código
function dobro(numero) {
  let resultado = numero * 2;      // 1. multiplicar por 2
  return resultado;                // 2. devolver
}

// PASSO 6: teste no console
dobro(4)      // 8
dobro(10)     // 20
dobro(0)      // 0`),
      box('verde', `<strong>Regra de ouro:</strong> se você não sabe por onde começar, <strong>escreva os comentários</strong>. Comentário é português: todo mundo sabe escrever. O código vem depois, linha por linha.`),
      caderno(['Receita: nome → recebe → faz/devolve → comentários → código → teste', 'Planeje em português ANTES de programar', 'Teste sempre no console'])),
    etapa('➕', 'ETAPA 1: sua primeira função (que recebe e devolve)',
      'Aplique a receita à função <code>somar(a, b)</code>: recebe dois números e <strong>devolve a soma</strong>.',
      ['Abra qualquer página, F12 → <strong>Console</strong>', 'Escreva o <strong>plano em comentários</strong> (passos 1 a 4)', 'Troque os comentários por código (passo 5)', 'Teste com 3 pares de números (passo 6)'],
      `function somar(a, b) {
  // 1. ___ a + b e guardar em uma variável
  // 2. ___ o resultado
}`,
      ['<code>somar(2, 3)</code> → <code>5</code>', '<code>somar(10, 5)</code> → <code>15</code>', '<code>let x = somar(1, 1); x</code> → <code>2</code> (o valor devolvido pode ser guardado)'],
      ['A conta fica dentro de uma variável: <code>let resultado = a + b;</code>. O passo 2 do plano é entregar: use <code>return</code>.', 'Se o console responde <code>undefined</code>, <strong>faltou o return</strong>: a função fez a conta, mas não entregou.', '<code>function somar(a, b) { let resultado = a + b; return resultado; }</code>']),
    etapa('📖', 'ETAPA 2: uma função que lê a página',
      'Agora uma função <strong>sem parâmetros</strong> que <strong>devolve</strong> o texto digitado em um campo. Use a página <code>gerenciarProdutos.html</code> que você montou.',
      ['Abra o <code>gerenciarProdutos.html</code> e a aba <strong>Console</strong>', 'Pelo <strong>plano</strong>: achar o campo <code>#nomeProduto</code>, pegar o <code>.value</code> e devolver', 'Escreva os comentários e depois o código', 'Digite algo no campo e teste'],
      `function lerNome() {
  // 1. achar o campo do nome (querySelector com #)
  // 2. pegar o texto digitado (.value)
  // 3. devolver o texto
}`,
      ['Digite <code>Caneta</code> no campo e rode <code>lerNome()</code> → <code>"Caneta"</code>', 'Apague o campo: <code>lerNome()</code> → <code>""</code> (texto vazio)', '<code>typeof lerNome()</code> → <code>"string"</code>'],
      ['Passo 1: <code>let campo = document.querySelector("#nomeProduto");</code>', 'Passo 2 e 3: <code>return campo.value;</code> (dá para fazer os dois ao mesmo tempo)', '<code>function lerNome() { let campo = document.querySelector("#nomeProduto"); return campo.value; }</code>']),
    etapa('⚖️', 'ETAPA 3: uma função que decide (devolve true ou false)',
      'Funções também <strong>respondem perguntas</strong>: devolvem <code>true</code> (sim) ou <code>false</code> (não). Escreva <code>nomePreenchido()</code>: "o campo do nome tem algum texto?".',
      ['Reaproveite a <code>lerNome()</code> (uma função pode <strong>chamar</strong> outra)', 'Compare o resultado com texto vazio: <code>!= ""</code> significa "é diferente de vazio"', 'Devolva o resultado da comparação'],
      `function nomePreenchido() {
  // 1. ler o nome (use lerNome)
  // 2. devolver se é diferente de vazio
}`,
      ['Com o campo preenchido: <code>nomePreenchido()</code> → <code>true</code>', 'Com o campo vazio: → <code>false</code>', 'Com o campo contendo só espaços (<code>"   "</code>): → <code>true</code> (você vai melhorar isso na aula de validação)'],
      ['Uma comparação <strong>já é um valor</strong> (<code>true</code> ou <code>false</code>): você pode devolvê-la direto com <code>return</code>.', '<code>lerNome() != ""</code> é a pergunta; o <code>return</code> entrega a resposta.', '<code>function nomePreenchido() { return lerNome() != ""; }</code>']),
    P('🐞', 'ENCONTRE O ERRO: os 6 erros mais comuns ao escrever funções',
      code(`// 1) esqueceu o return
function somar(a, b) { let r = a + b; }
somar(2, 3)                  // undefined

// 2) chamou sem parênteses
somar                        // mostra o TEXTO da função (ƒ somar(a, b) {...}), não executa

// 3) parâmetros na ordem errada
function dividir(a, b) { return a / b; }
dividir(2, 10)               // 0.2   (queria 10 / 2 = 5)

// 4) escreveu a função, mas nunca chamou
function mostrar() { console.log("oi"); }     // nada acontece até você escrever mostrar()

// 5) variável criada dentro da função, usada fora
function f() { let x = 5; }
console.log(x)               // ReferenceError: x is not defined

// 6) = no lugar de ==
if (idade = 18) { ... }      // guarda 18 em idade em vez de comparar`),
      lista(['<strong>1:</strong> sem <code>return</code>, a função devolve <code>undefined</code>', '<strong>2:</strong> <code>nome</code> é a função; <code>nome()</code> é a <strong>chamada</strong>', '<strong>3:</strong> os valores entram na <strong>ordem</strong> dos parâmetros', '<strong>4:</strong> definir não executa; só <strong>chamar</strong> executa', '<strong>5:</strong> variáveis de dentro da função <strong>não existem fora dela</strong> (escopo)', '<strong>6:</strong> <code>=</code> guarda; <code>==</code> compara']),
      box('verde', `<strong>Provoque cada um</strong> no console e leia o resultado. Se, no projeto, uma função "não funciona", volte a esta lista: <strong>quase sempre é um destes 6</strong>.`)),
    P('🏁', 'CHECKPOINT e DESAFIO',
      lista(['☐ Você escreveu <code>somar</code>, <code>lerNome</code> e <code>nomePreenchido</code> <strong>começando pelos comentários</strong>', '☐ Os testes do console deram o resultado esperado', '☐ Você sabe dizer qual a diferença entre parâmetro, corpo e return', '☐ <strong>Se nunca consegue começar uma função:</strong> escreva só o nome e os comentários em português. Peça ajuda ao professor mostrando esse plano']),
      box('verde', `<strong>Explique com suas palavras:</strong> o que é parâmetro, o que é return e o que acontece quando esquecemos o return. Depois explique por que planejar com comentários ajuda.`)),
  ], [
    Q('function somar(a, b) { let r = a + b; } e depois console.log(somar(2, 3)). O que aparece?', 'undefined, porque faltou o return', '5', '23', 'Um erro de sintaxe'),
    Q('Para entregar um valor a quem chamou a função, usa-se:', 'return', 'console.log', 'function', 'parâmetro'),
    Q('Qual é a diferença entre somar e somar(2, 3)?', 'somar é a função; somar(2, 3) é a chamada que a executa', 'São iguais', 'somar(2, 3) só define a função', 'somar executa e somar(2, 3) não'),
    Q('function dividir(a, b) { return a / b; } O que devolve dividir(10, 2)?', '5', '0.2', '20', '12'),
    Q('Com a mesma função, o que devolve dividir(2, 10)?', '0.2', '5', '8', '20'),
    Q('Uma função foi escrita, mas o programa nunca a chamou. O que acontece?', 'Nada: a função só executa quando é chamada', 'Executa uma vez ao abrir a página', 'Dá erro', 'Executa ao clicar em qualquer botão'),
    Q('function f() { let x = 5; } console.log(x). O que acontece?', 'ReferenceError: x is not defined (x só existe dentro de f)', 'Mostra 5', 'Mostra undefined', 'Mostra null'),
    Q('Qual é o primeiro passo da receita para escrever uma função?', 'Dar um nome com verbo e planejar o que ela recebe e devolve', 'Escrever o código completo de uma vez', 'Copiar uma função pronta', 'Testar no console'),
    Q('O que a função devolve? function nomePreenchido() { return lerNome() != ""; }', 'true ou false', 'O nome digitado', 'undefined', 'Um array'),
  ]);

  // ══════════════════════════════════════════════════════
  // 124 — LOJA 12: ALTERAR O PRODUTO
  // ══════════════════════════════════════════════════════
  ENT['ETAPA 1: lerProduto(id), levar o produto para o formulário'] = exemplo(
    `<p>Alterar um produto é <strong>reaproveitar o formulário</strong>: você leva os dados do produto para dentro dos campos, o usuário edita, e o botão passa a <strong>atualizar</strong> (em vez de cadastrar). Isso exige <strong>mudar o botão</strong>: o texto dele, o id dele e <strong>o que ele faz ao ser clicado</strong>.</p>
     <p style="margin-top:8px">Para dizer o que o botão faz, atribuímos uma função à propriedade <code>.onclick</code>. Como a função ainda não tem nome, escrevemos uma <strong>função de seta</strong>: <code>() =&gt; controle("salvar", id)</code> (lê-se: "quando clicar, execute <code>controle("salvar", id)</code>").</p>`,
    `// EXEMPLO: editar um aluno trocando o botão "Cadastrar" por "Atualizar"
function editarAluno(id) {
  let confirma = confirm("Deseja editar?");
  if (confirma) {
    let aluno = JSON.parse(localStorage.getItem(id));        // abre a gaveta: texto -> array
    let botao = document.querySelector("#botaoCadastrar");

    botao.textContent = "Atualizar";                          // 1. muda o TEXTO do botão
    botao.id = "botaoAtualizar";                              // 2. muda o ID (para lembrar o modo)
    botao.onclick = () => painel("atualizar", id);            // 3. muda o que ele FAZ ao clicar

    document.querySelector("#nome").value = aluno[0];         // 4. preenche os campos
    document.querySelector("#turma").value = aluno[1];
  }
}`,
    ['<strong>Se o usuário cancelar</strong> o <code>confirm</code>, nada disso executa (tudo está dentro do <code>if</code>)', '<code>botao.textContent</code> troca o texto que aparece no botão', '<code>botao.id = ...</code>: guardamos o "modo" no id do botão. <strong>Atenção:</strong> depois disso, <code>querySelector("#botaoCadastrar")</code> <strong>não acha mais</strong> o botão (o id mudou!)', '<code>botao.onclick = () =&gt; ...</code>: <strong>substitui</strong> o que o botão fazia por uma função nova que já "lembra" do <code>id</code> deste aluno', 'Os campos recebem os valores do array, posição por posição'],
    'O botão é o <code>#botaoSalvarProduto</code> → vira <code>#botaoAlterarProduto</code>; o texto "Salvar" → "Alterar"; a função do clique é <code>() =&gt; controle("salvar", id)</code> (como o <code>id</code> <strong>não é</strong> <code>"p"</code>, o controle entende que é uma <strong>alteração</strong>). Também aparece o botão <strong>Cancelar</strong> (tirando a classe <code>d-none</code>).');

  PRAT[124] = { tarefas: ['<strong>Checkpoint.</strong> Clicar em Alterar pergunta; confirmando, o formulário é <strong>preenchido</strong>, o botão vira <strong>Alterar</strong> e o <strong>Cancelar</strong> aparece.', '<strong>Checkpoint.</strong> Mudar o valor e clicar em Alterar <strong>não cria outro produto</strong>: no Application continua a <strong>mesma chave</strong>, com o dado novo; o botão volta a Salvar.', '<strong>Checkpoint.</strong> Depois de alterar, cadastrar um <strong>novo</strong> produto cria uma chave nova (não sobrescreve o alterado).', '<strong>Checkpoint.</strong> Cancelar a edição limpa o formulário, volta o botão a Salvar e esconde o Cancelar.', '<strong>Checkpoint.</strong> Clicar em Alterar na linha <strong>B</strong> enquanto edita a <strong>A</strong> não dá erro.', '<strong>Explique:</strong> com suas palavras, o que muda no botão durante a alteração e por que o clique dele precisa ser trocado.'],
    desafio: '<strong>Desafio.</strong> Hoje a <strong>alteração não valida</strong> os campos (aceita vazio). Reaproveite a validação para o caminho de alterar. <strong>Explique ao professor</strong> em qual função você colocou e por quê. (Bônus: descubra como evitar que o <code>id</code> do botão precise mudar.)' };
  A(124, 'Loja 12: Alterando um Produto', 'Levar o produto para o formulário, trocar o botão para Alterar, salvar na mesma chave e permitir cancelar', '✏️', [
    P('💡', 'ENTENDA: alterar é gravar de novo na mesma chave',
      `<p>O localStorage não tem um comando "alterar". Alterar é: <strong>ler</strong> o produto, <strong>mostrar</strong> no formulário, deixar o usuário mudar e <strong>gravar na mesma chave</strong> (o valor antigo é substituído). O <code>id</code> <strong>nunca muda</strong>: se mudasse, seria outro produto.</p>`,
      lista(['🔹 <code>controle("alterar", id)</code>: pede para <strong>levar o produto para o formulário</strong>', '🔹 O botão <strong>Salvar</strong> vira <strong>Alterar</strong> e passa a chamar <code>controle("salvar", id)</code>', '🔹 Como o <code>id</code> <strong>não é <code>"p"</code></strong>, o controle entende que é <strong>alteração</strong>', '🔹 <code>cancelar()</code>: desiste e volta ao modo normal']),
      box('azul', `<strong>Antes de começar:</strong> o <code>controle()</code> já tem as opções "salvar", "listar" e "excluir", e a tabela mostra os botões Alterar. Esta é a aula <strong>mais longa</strong> do cadastro: faça uma etapa por vez e <strong>teste sempre</strong>.`),
      analogia(`é <strong>corrigir uma ficha de papel</strong>: você pega a ficha, apaga o que está errado, escreve o novo e devolve <em>na mesma pasta</em>. Se criasse uma ficha nova, ficaria com duas pessoas iguais no arquivo.`),
      caderno(['Alterar = ler + preencher formulário + gravar na MESMA chave', 'id "p" = novo · id de verdade = alteração', 'O botão muda de texto, de id e de clique'])),
    etapa('📥', 'ETAPA 1: lerProduto(id), levar o produto para o formulário',
      'Esta função <strong>não grava nada</strong>: só prepara a tela para a alteração.',
      ['Crie <code>lerProduto(id)</code> e pergunte com <code>confirm("Deseja alterar o produto?")</code>', '<strong>Dentro do <code>if</code></strong>: abra a gaveta (<code>getItem</code> + <code>JSON.parse</code>)', 'Mostre o botão <strong>Cancelar</strong> (<code>classList.remove("d-none")</code>)', 'No botão de salvar: troque o <strong>texto</strong> para "Alterar", o <strong>id</strong> para <code>botaoAlterarProduto</code> e o <strong>clique</strong> para <code>() =&gt; controle("salvar", id)</code>', 'Preencha os 3 campos com as posições 0, 1 e 2 do array'],
      `// Busca o produto e preenche o formulário para o usuário alterar
function lerProduto(id) {
  let confirma = confirm("Deseja alterar o produto?");
  if (___) {
    let produtoVet = JSON.___(localStorage.getItem(id));
    // o botão pode estar com um dos dois ids (se já havia uma edição em andamento)
    let alterar = document.querySelector("#botaoSalvarProduto") || document.querySelector("#botaoAlterarProduto");

    document.querySelector("#cancelar").classList.___("d-none");    // mostra o Cancelar
    alterar.textContent = "___";
    alterar.id = "botaoAlterarProduto";
    alterar.onclick = () => controle("___", id);                     // quando clicar: salvar ESTE id

    document.querySelector("#nomeProduto").value = produtoVet[___];
    // TODO: valor (posição 1) e descrição (posição 2)
  }
}`,
      ['No console: <code>lerProduto("p…")</code> com um id real: aparece o <code>confirm</code>', 'Confirmando: os campos ficam <strong>preenchidos</strong>, o botão vira <strong>Alterar</strong> e o <strong>Cancelar</strong> (amarelo) aparece', 'Cancelando o <code>confirm</code>: <strong>nada muda</strong> e não há erro no console'],
      ['Tudo precisa ficar <strong>dentro do <code>if (confirma)</code></strong>. Se ficar fora, cancelar a pergunta também mudaria o botão.', 'O <code>||</code> em <code>querySelector(A) || querySelector(B)</code> significa "tente A; se for <code>null</code>, tente B": cobre o caso de já haver uma edição em andamento (o id do botão já é o "Alterar").', 'Linhas-chave: <code>alterar.onclick = () =&gt; controle("salvar", id);</code> e <code>document.querySelector("#valorProduto").value = produtoVet[1];</code>',
        '<strong>Solução comentada:</strong>' + code(`function lerProduto(id) {
  let confirma = confirm("Deseja alterar o produto?");
  if (confirma) {
    let produtoVet = JSON.parse(localStorage.getItem(id));       // abre a gaveta
    let alterar = document.querySelector("#botaoSalvarProduto") || document.querySelector("#botaoAlterarProduto");

    document.querySelector("#cancelar").classList.remove("d-none");  // mostra o botão Cancelar
    alterar.textContent = "Alterar";                                  // 1. texto do botão
    alterar.id = "botaoAlterarProduto";                               // 2. id do botão
    alterar.onclick = () => controle("salvar", id);                   // 3. o clique agora salva ESTE produto

    document.querySelector("#nomeProduto").value = produtoVet[0];
    document.querySelector("#valorProduto").value = produtoVet[1];
    document.querySelector("#descricaoProduto").value = produtoVet[2];
  }
}`)]),
    etapa('🎛️', 'ETAPA 2: as opções "alterar" e "salvar com id" no controle',
      'O controle precisa de <strong>duas opções novas</strong>: uma para preparar a alteração e outra para gravá-la.',
      ['Acrescente <code>else if (opcao == "alterar")</code>: chama <code>lerProduto(id)</code>', 'Acrescente, <strong>logo depois</strong> do bloco do <code>"salvar"</code> com id <code>"p"</code>, o bloco <code>else if (opcao == "salvar" &amp;&amp; id != "p")</code>: esconde o Cancelar (<code>classList.add("d-none")</code>), lê o formulário (<code>produto = ler()</code>) e chama <code>atualizarProduto(id, produto)</code>', '<strong>A ordem importa:</strong> primeiro "salvar com id <code>p</code>", depois "salvar com id diferente de <code>p</code>"'],
      `} else if (opcao == "salvar" && id != "___") {
  // ALTERAÇÃO: o id é de um produto que já existe
  document.querySelector("#cancelar").classList.___("d-none");   // esconde o Cancelar
  produto = ___();
  ___(id, produto);
} else if (opcao == "___") {
  ___(id);
}`,
      ['Clique em <strong>Alterar</strong> em uma linha: o formulário é preenchido (a função <code>atualizarProduto</code> ainda não existe, então o botão Alterar dará erro: <strong>esperado</strong>)', 'No console: <code>controle("alterar", "p…")</code> faz o mesmo que o botão da tabela'],
      ['<code>id != "p"</code> significa "o id é diferente de <code>p</code>": ou seja, um produto de verdade.', 'Os dois <code>"salvar"</code> se distinguem <strong>só pelo id</strong>. Por isso a ordem e a comparação precisam estar certas.', '<code>} else if (opcao == "alterar") { lerProduto(id); }</code>']),
    etapa('💾', 'ETAPA 3: atualizarProduto(id, produto)',
      'Grava a alteração <strong>na mesma chave</strong> e volta o formulário ao modo normal.',
      ['Crie <code>atualizarProduto(id, produto)</code>', 'Chame <code>salvarProduto(id, produto)</code> (a mesma função de salvar: <strong>gravar na mesma chave substitui o valor antigo</strong>)', 'Volte o botão: pegue <code>#botaoAlterarProduto</code>, troque o texto para "Salvar" e o id para <code>botaoSalvarProduto</code>', 'Limpe os campos e devolva ao botão o clique de <strong>cadastro novo</strong>: <code>() =&gt; controle("salvar", "p")</code>'],
      `// Salva a alteração e volta o formulário ao modo "cadastro novo"
function atualizarProduto(id, produto) {
  ___(id, produto);                                      // mesma chave: substitui o valor
  let alterar = document.querySelector("#___");
  alterar.textContent = "___";
  alterar.id = "___";
  limparCampos();
  alterar.onclick = () => controle("salvar", "___");     // volta a cadastrar produto NOVO
}`,
      ['Clique em Alterar, mude o valor e clique no botão <strong>Alterar</strong>: a tabela mostra o valor novo', 'Na aba Application, a <strong>quantidade de chaves não mudou</strong> (alterou, não criou)', 'O botão voltou a <strong>Salvar</strong> e o <strong>Cancelar sumiu</strong>', 'Cadastre um produto novo: cria uma chave <strong>nova</strong>'],
      ['Se aparecer um <strong>produto duplicado</strong>, o id foi gerado de novo em vez de usar o <code>id</code> recebido.', 'Se o <strong>próximo cadastro sobrescreve</strong> o alterado, faltou devolver ao botão o clique de cadastro novo (<code>"p"</code>).', 'Se aparecer <em>"Cannot read properties of null"</em>, o <code>querySelector</code> usou o id <strong>errado</strong> do botão (depois de <code>lerProduto</code> o id é <code>botaoAlterarProduto</code>).',
        '<strong>Solução comentada:</strong>' + code(`function atualizarProduto(id, produto) {
  salvarProduto(id, produto);                                  // mesma chave: substitui o valor antigo
  let alterar = document.querySelector("#botaoAlterarProduto"); // o botão, que está no modo "Alterar"
  alterar.textContent = "Salvar";                               // volta o texto
  alterar.id = "botaoSalvarProduto";                            // volta o id
  limparCampos();
  alterar.onclick = () => controle("salvar", "p");              // volta a cadastrar produto NOVO
}`)]),
    etapa('✋', 'ETAPA 4: cancelar()',
      'Se o usuário desistir da alteração, tudo volta ao normal.',
      ['No HTML, o botão <code>cancelar</code> ganha <code>onclick="cancelar()"</code>', 'Crie <code>cancelar()</code>: limpa os campos, volta o botão para Salvar (texto, id e clique) e <strong>esconde o Cancelar</strong> (<code>classList.add("d-none")</code>)', 'Repare: o corpo é <strong>quase igual</strong> ao do <code>atualizarProduto</code>, só sem gravar'],
      `// Desiste da alteração: limpa e volta ao modo "cadastro novo"
function cancelar() {
  limparCampos();
  let alterar = document.querySelector("#botaoAlterarProduto");
  alterar.textContent = "___";
  alterar.id = "___";
  alterar.onclick = () => controle("salvar", "___");
  document.querySelector("#cancelar").classList.___("d-none");
}`,
      ['Clique em Alterar e depois em <strong>Cancelar</strong>: formulário vazio, botão "Salvar", Cancelar escondido', 'Cadastre um produto novo: funciona normalmente', 'Repita 3 vezes o ciclo Alterar → Cancelar → Alterar: <strong>sem erros</strong> no console'],
      ['No HTML: <code>&lt;button id="cancelar" ... onclick="cancelar()"&gt;</code>.', 'Esconder é <strong>adicionar</strong> a classe <code>d-none</code>; mostrar é <strong>remover</strong>.', 'O corpo é igual ao de <code>atualizarProduto</code>, exceto a primeira linha (<code>salvarProduto</code>) e a última (esconde o Cancelar).']),
    P('🐞', 'ENCONTRE O ERRO: o que dá errado em alterar',
      code(`// 1) Uncaught TypeError: Cannot read properties of null (reading 'textContent')
//    -> o querySelector procurou #botaoSalvarProduto, mas o id do botão JÁ foi trocado
//       (por isso lerProduto usa "um OU outro")

// 2) o próximo cadastro SOBRESCREVE o produto alterado
//    -> faltou devolver ao botão o onclick de cadastro novo (controle("salvar", "p"))

// 3) clicar em Alterar e CANCELAR o confirm muda o botão mesmo assim
//    -> as linhas que mudam o botão ficaram FORA do if (confirma)

// 4) o botão "Alterar" grava, mas cria um produto NOVO (duplicado)
//    -> o controle recebeu id "p" (cadastro) em vez do id do produto

// 5) o Cancelar fica na tela depois de alterar
//    -> faltou classList.add("d-none") no caminho de salvar com id`),
      lista(['<strong>Técnica de investigação:</strong> faça um <code>console.log(opcao, id)</code> na primeira linha do <code>controle</code> e veja <strong>exatamente</strong> o que cada botão manda', 'Veja também, no <strong>Elements</strong>, o <code>id</code> do botão em cada etapa (<code>botaoSalvarProduto</code> ou <code>botaoAlterarProduto</code>)', '<strong>Observação do professor:</strong> usar o <strong>id do botão</strong> para lembrar o modo é uma técnica <strong>frágil</strong> (por isso os erros acima). Uma alternativa melhor é uma <strong>variável</strong> (<code>let idEditando = null;</code>). Fica como desafio de melhoria']),
      box('verde', `<strong>Provoque cada um dos 5</strong>, descubra a causa com o <code>console.log</code> e conserte.`)),
    P('🏁', 'CHECKPOINT e DESAFIO',
      lista(['☐ Alterar: confirma, preenche, botão vira Alterar, Cancelar aparece', '☐ Atualizar: <strong>mesma chave</strong>, dado novo, botão volta a Salvar', '☐ Cancelar: tudo volta ao normal', '☐ Cadastrar depois de alterar cria produto <strong>novo</strong>', '☐ <strong>Se travou:</strong> <code>console.log(opcao, id)</code> no controle + Dicas 1, 2 e 3 + solução comentada (digitando)']),
      box('verde', `<strong>Explique com suas palavras:</strong> o que muda no botão durante a alteração (3 coisas) e por que o clique dele precisa ser trocado. Por que alterar <strong>não pode</strong> gerar um id novo?`)),
  ], [
    Q('O botão Salvar vira "Alterar" e passa a chamar controle("salvar", id). Como o controle sabe que é alteração?', 'Porque o id é diferente de "p"', 'Porque o texto do botão é Alterar', 'Porque a opção é "alterar"', 'Porque o confirm devolveu true'),
    Q('Por que alterar NÃO pode gerar um id novo?', 'A chave (id) identifica o produto: um id novo criaria outro produto', 'Porque o UUID só funciona uma vez', 'Porque o id é o nome do produto', 'Porque o localStorage proíbe'),
    Q('O que acontece ao salvar na mesma chave com setItem?', 'O valor antigo é substituído', 'Cria uma segunda cópia', 'Dá erro', 'Guarda os dois valores'),
    Q('Depois de lerProduto, qual é o id do botão de salvar?', 'botaoAlterarProduto', 'botaoSalvarProduto', 'cancelar', 'formulario'),
    Q('Por isso, no final de atualizarProduto, qual id é procurado com querySelector?', '#botaoAlterarProduto', '#botaoSalvarProduto', '#cancelar', '#nomeProduto'),
    Q('Alterou um produto e o próximo cadastro sobrescreveu o alterado. Qual é a causa provável?', 'Faltou devolver ao botão o clique controle("salvar", "p")', 'Faltou o JSON.stringify', 'O id tinha acento', 'O confirm estava errado'),
    Q('Ao CANCELAR o confirm de "Deseja alterar o produto?", o botão mudou mesmo assim. Qual é a causa?', 'O código que muda o botão ficou fora do if (confirma)', 'O confirm está quebrado', 'O Bootstrap trava', 'O localStorage está cheio'),
    Q('O que faz alterar.onclick = () => controle("salvar", id)?', 'Define o que o botão faz ao ser clicado', 'Clica no botão', 'Apaga o botão', 'Muda o texto do botão'),
    Q('Qual é a melhor técnica de investigar "qual opção e qual id este botão está mandando"?', 'console.log(opcao, id) na primeira linha do controle', 'Reiniciar o navegador', 'Apagar o localStorage', 'Trocar o botão'),
  ]);

  // ══════════════════════════════════════════════════════
  // 125 — LOJA 13: BLOQUEAR / DESBLOQUEAR O FORMULÁRIO
  // ══════════════════════════════════════════════════════
  ENT['ETAPA 1: a função bloquear()'] = exemplo(
    `<p>Esta função funciona como um <strong>interruptor</strong>: se está <strong>liberado</strong>, bloqueia; se está <strong>bloqueado</strong>, libera. Para saber o estado atual, ela <strong>pergunta ao botão</strong> se ele está desabilitado (<code>disabled</code>). Um elemento com <code>disabled = true</code> fica cinza e não aceita clique nem digitação.</p>`,
    `// EXEMPLO: trava/destrava o campo "cliente" e o botão "pedir"
function travar() {
  if (document.querySelector("#botaoPedir").disabled == true) {
    // estava travado: libera
    document.querySelector("#botaoPedir").disabled = false;
    document.querySelector("#cliente").disabled = false;
  } else {
    // estava liberado: trava
    document.querySelector("#botaoPedir").disabled = true;
    document.querySelector("#cliente").disabled = true;
  }
}`,
    ['<code>disabled</code> é uma propriedade que vale <code>true</code> (desabilitado) ou <code>false</code>', '<code>if (... .disabled == true)</code>: <strong>pergunta</strong> o estado atual do botão', '<strong>Um bloco para cada estado</strong>: cada um coloca o valor <strong>contrário</strong>', 'Funciona como um <strong>interruptor de luz</strong>: cada clique inverte'],
    'São <strong>4 elementos</strong> (o botão Salvar e os 3 campos), e o botão consultado é <code>#botaoSalvarProduto</code>. Note: durante uma alteração, o id muda para <code>botaoAlterarProduto</code>. Por isso, o bloqueio deve ser usado fora do modo de alteração (veja o passo de erro).');
  PRAT[125] = { tarefas: ['<strong>Checkpoint.</strong> Clicar em Bloquear/Desbloquear deixa o formulário <strong>cinza e sem aceitar digitação</strong>, e o botão Salvar desabilitado.', '<strong>Checkpoint.</strong> Clicar de novo <strong>libera</strong> tudo.', '<strong>Checkpoint.</strong> Os produtos já cadastrados e a tabela <strong>não são afetados</strong>.', '<strong>Explique:</strong> com suas palavras, como a função sabe se deve bloquear ou liberar.'],
    desafio: '<strong>Desafio.</strong> Reescreva <code>bloquear()</code> com um <strong>laço</strong> sobre uma lista de ids e use o operador <code>!</code> (<code>campo.disabled = !campo.disabled</code>) para inverter. <strong>Explique ao professor</strong> por que fica mais curto e mais seguro.' };
  A(125, 'Loja 13: Bloquear e Desbloquear o Formulário', 'Travar e destravar os campos com o atributo disabled, como um interruptor', '🔒', [
    P('💡', 'ENTENDA: o atributo disabled e o "interruptor"',
      `<p>O botão vermelho <strong>Bloquear/Desbloquear</strong> serve para <strong>travar o formulário</strong> (por exemplo, para impedir cadastros enquanto o professor explica). Ele usa o atributo <code>disabled</code>, que deixa campos e botões <strong>desabilitados</strong>: cinzas, sem aceitar clique ou digitação.</p>`,
      box('azul', `<strong>Antes de começar:</strong> o <code>controle()</code> existe e o HTML tem o botão com <code>id="botaoBloquearTela"</code>. Ele ainda não faz nada: vamos ligá-lo.`),
      analogia(`é um <strong>interruptor</strong>: cada vez que você aperta, o estado <strong>inverte</strong> (acesa → apagada → acesa).`),
      caderno(['elemento.disabled = true desabilita · false habilita', 'bloquear(): pergunta o estado e inverte'])),
    etapa('🔒', 'ETAPA 1: a função bloquear()',
      'Pergunte ao botão Salvar se está desabilitado e coloque o valor contrário em <strong>todos</strong> os elementos do formulário.',
      ['Crie <code>bloquear()</code>', 'Pergunte: o <code>#botaoSalvarProduto</code> está com <code>disabled == true</code>?', 'Se sim: <strong>libere</strong> (<code>disabled = false</code>) o botão e os 3 campos', 'Senão: <strong>bloqueie</strong> (<code>disabled = true</code>) os mesmos 4'],
      `// Trava ou destrava o formulário (liga/desliga o atributo disabled)
function bloquear() {
  if (document.querySelector("#botaoSalvarProduto").disabled == ___) {
    // estava bloqueado: libera
    document.querySelector("#botaoSalvarProduto").disabled = ___;
    document.querySelector("#nomeProduto").disabled = false;
    // TODO: valor e descrição
  } else {
    // estava liberado: bloqueia
    document.querySelector("#botaoSalvarProduto").disabled = ___;
    // TODO: os 3 campos
  }
}`,
      ['No console: <code>bloquear()</code>: o formulário fica <strong>cinza</strong>', 'De novo: <code>bloquear()</code>: tudo <strong>liberado</strong>', 'Enquanto bloqueado, não dá para digitar nem clicar em Salvar'],
      ['<code>disabled</code> aceita <code>true</code> e <code>false</code> (sem aspas: são valores, não textos).', 'Cada bloco tem <strong>4 linhas</strong>: o botão Salvar e os 3 campos.', 'No bloco do <code>if</code> (estava bloqueado) tudo vira <code>false</code>; no <code>else</code> tudo vira <code>true</code>.',
        '<strong>Solução comentada:</strong>' + code(`function bloquear() {
  if (document.querySelector("#botaoSalvarProduto").disabled == true) {
    // estava bloqueado: libera
    document.querySelector("#botaoSalvarProduto").disabled = false;
    document.querySelector("#nomeProduto").disabled = false;
    document.querySelector("#valorProduto").disabled = false;
    document.querySelector("#descricaoProduto").disabled = false;
  } else {
    // estava liberado: bloqueia
    document.querySelector("#botaoSalvarProduto").disabled = true;
    document.querySelector("#nomeProduto").disabled = true;
    document.querySelector("#valorProduto").disabled = true;
    document.querySelector("#descricaoProduto").disabled = true;
  }
}`)]),
    etapa('🔘', 'ETAPA 2: ligar o botão ao controle',
      'Falta o controle reconhecer a opção e o botão chamá-la.',
      ['No HTML, no botão <code>botaoBloquearTela</code>, coloque <code>onclick="controle(\'bloquear\',\'\')"</code> (o id é um texto vazio: não há produto)', 'Em <code>controle</code>, acrescente <code>else if (opcao == "bloquear")</code> chamando <code>bloquear()</code>'],
      `<!-- HTML -->
<button id="botaoBloquearTela" type="button" class="btn btn-danger" onclick="controle('___','')">Bloquear/Desbloquear</button>

// JS, dentro do controle:
} else if (opcao == "___") {
  ___();
}`,
      ['Clicar no botão vermelho bloqueia; clicar de novo libera', 'Os produtos da tabela continuam aparecendo', 'Nenhum erro no console'],
      ['O segundo argumento é texto vazio (<code>\'\'</code>, duas aspas simples coladas), porque o bloqueio não depende de um produto.', 'Mais um <code>else if</code> no controle: é a mesma ideia das opções anteriores.', '<code>} else if (opcao == "bloquear") { bloquear(); }</code>']),
    P('🐞', 'ENCONTRE O ERRO + CHECKPOINT',
      lista(['<strong>O botão Bloquear não faz nada:</strong> a opção escrita no HTML (<code>\'bloquear\'</code>) é diferente da do controle', '<strong>Só alguns campos bloqueiam:</strong> esqueceu uma das linhas (o formulário "fura")', '<strong>"Cannot read properties of null (reading \'disabled\')" ao bloquear durante uma alteração:</strong> o id do botão <strong>mudou</strong> para <code>botaoAlterarProduto</code>, e o <code>querySelector("#botaoSalvarProduto")</code> não acha. <strong>Solução:</strong> bloquear só fora da edição, ou procurar pelos dois ids', '<strong>Escrever <code>disabled = "false"</code> (com aspas):</strong> um texto não vazio vale <strong>verdadeiro</strong>, e o campo <strong>bloqueia</strong>. Sem aspas!']),
      lista(['☐ Bloquear/desbloquear funcionam, nos 4 elementos', '☐ O controle reconhece a opção "bloquear"', '☐ Você sabe explicar como a função decide entre bloquear e liberar']),
      box('verde', `<strong>Explique com suas palavras:</strong> por que a função precisa <strong>perguntar</strong> o estado atual antes de agir, e o que é um "interruptor". <strong>Desafio:</strong> simplifique com o operador <code>!</code>.`)),
  ], [
    Q('Qual é o valor de document.querySelector("#nome").disabled para um campo normal, que aceita digitação?', 'false', 'true', 'null', '"disabled"'),
    Q('Para bloquear um campo pelo JavaScript, usa-se:', 'campo.disabled = true', 'campo.disabled = "true" (texto)', 'campo.block()', 'campo.remove("disabled")'),
    Q('Por que a função bloquear() consulta o estado do botão antes de agir?', 'Para decidir se deve bloquear ou liberar (interruptor)', 'Porque o botão exige', 'Para apagar o botão', 'Para validar os campos'),
    Q('O botão Bloquear não faz nada. O onclick tem controle(\'Bloquear\',\'\') (B maiúsculo). Qual é a causa?', 'A opção "Bloquear" é diferente de "bloquear" no controle', 'O Bootstrap não reconhece', 'O controle precisa de um id', 'O disabled está desligado'),
    Q('Por que o segundo argumento é \'\' (vazio) em controle(\'bloquear\',\'\')?', 'Bloquear não depende de um produto específico', 'Porque o texto vazio bloqueia', 'Porque o id é opcional em JavaScript', 'Para o botão ficar vermelho'),
    Q('Escrever campo.disabled = "false" (com aspas) faz o quê?', 'Bloqueia o campo, pois um texto não vazio vale verdadeiro', 'Libera o campo', 'Dá erro de sintaxe', 'Não faz nada'),
    Q('Só alguns campos bloquearam. Qual é a causa provável?', 'Faltou escrever o disabled de algum dos elementos', 'O CSS está errado', 'O localStorage está cheio', 'O Bootstrap não carregou'),
    Q('O que acontece com os produtos já cadastrados ao bloquear o formulário?', 'Nada: o bloqueio só afeta os campos e o botão Salvar', 'São apagados', 'Ficam ocultos', 'Ficam bloqueados para a loja'),
  ]);

  // ══════════════════════════════════════════════════════
  // 71 — LOJA 14: OS CARDS DA VITRINE (loja.js)
  // ══════════════════════════════════════════════════════
  ENT['ETAPA 1: criarCardHTML(dados), o card de um produto'] = exemplo(
    `<p>É a <strong>mesma ideia</strong> do <code>criarLinhaHTML</code>, mas em vez de uma <strong>linha de tabela</strong>, fabrica um <strong>card do Bootstrap</strong>: uma caixinha com borda, com título e texto. Os nomes das classes seguem um padrão: o card é uma <strong>caixa</strong> (<code>card</code>) com um <strong>corpo</strong> (<code>card-body</code>) que contém <strong>título</strong> (<code>card-title</code>) e <strong>textos</strong> (<code>card-text</code>).</p>`,
    `// EXEMPLO: o card de um aluno (nome, turma, botão)
function criarCardAluno(dados) {
  return §
    <div class="card d-inline-block">
      <div class="card-body">
        <h5 class="card-title">€{dados.nome}</h5>
        <p class="card-text">Turma €{dados.turma}</p>
        <button type="button" class="btn btn-primary" onclick="chamar('€{dados.id}')">Chamar</button>
      </div>
    </div>
  §;
}`,
    ['<code>card</code>: a caixa com borda arredondada. <code>d-inline-block</code>: faz os cards ficarem <strong>lado a lado</strong>, e não um embaixo do outro', '<code>card-body</code>: o espaço interno do card, com margens certas', '<code>card-title</code> e <code>card-text</code>: formatação do título e dos textos', '<code>€{dados.nome}</code>: o valor <strong>entra</strong> no texto (template string, entre crases)', '<code>chamar(\'€{dados.id}\')</code>: o botão chama uma função passando o id <strong>entre aspas simples</strong>'],
    'Os campos são <code>produto</code>, <code>descricao</code> e <code>valor</code> (formatado em reais, como na tabela). O botão se chama <strong>Comprar</strong> e chama <code>carrinho(\'€{dados.id}\')</code>.');
  ENT['ETAPA 2: percorrer o localStorage e desenhar os cards'] = exemplo(
    `<p>Aqui o código <strong>não está dentro de uma função</strong>: ele roda <strong>sozinho assim que a página abre</strong> (os scripts são lidos de cima para baixo). A lógica é a mesma do <code>atualizarGrid</code>: percorrer as gavetas, pular as que não são produtos, abrir, organizar e desenhar.</p>
     <p style="margin-top:8px"><strong>Cuidado com o <code>let</code>:</strong> o contador do laço precisa ser declarado (<code>for (<strong>let</strong> i = 0; ...)</code>). Sem o <code>let</code>, o <code>i</code> vira uma variável <strong>global</strong> sem querer.</p>`,
    `// EXEMPLO: mostrar os cards dos alunos ao abrir a página
const area = document.querySelector("#areaAlunos");           // onde vão os cards

for (let i = 0; i < localStorage.length; i++) {               // percorre as gavetas
  let chave = localStorage.key(i);
  if (chave[0] != "a") continue;                              // só alunos
  let aluno = JSON.parse(localStorage.getItem(chave));        // texto -> array

  const dados = { nome: aluno[0], turma: aluno[1], id: chave };
  area.insertAdjacentHTML("beforeend", criarCardAluno(dados)); // desenha o card
}`,
    ['<code>const area = ...</code>: guarda o elemento onde os cards serão colocados. <code>const</code> porque ele <strong>não será trocado</strong>', 'O <code>for</code> visita cada gaveta, e o <code>continue</code> pula as que não começam com <code>a</code>', '<code>JSON.parse</code> transforma o texto de volta em array', '<code>insertAdjacentHTML("beforeend", ...)</code> <strong>acrescenta</strong> cada card no fim da área: ao final, há um card por aluno'],
    'Troque <code>#areaAlunos</code> por <code>#container-cards</code>, a letra <code>"a"</code> por <code>"p"</code>, e use <code>criarCardHTML</code>. Atenção às posições: <code>valor</code> é <code>produtoVet[1]</code> e <code>descricao</code> é <code>produtoVet[2]</code>.');
  PRAT[71] = { tarefas: ['<strong>Checkpoint.</strong> A loja mostra <strong>um card por produto</strong> cadastrado, com nome, descrição, valor em reais e o botão Comprar.', '<strong>Checkpoint.</strong> Os cards ficam <strong>lado a lado</strong> (e quebram de linha em telas menores).', '<strong>Checkpoint.</strong> Uma chave estranha no localStorage (<code>localStorage.setItem("tema","claro")</code>) não quebra a página.', '<strong>Checkpoint.</strong> A loja mostra <strong>os mesmos produtos</strong> da tela de gerenciar (prova de que ambas leem o mesmo localStorage).', '<strong>Explique:</strong> com suas palavras, por que a loja não precisa de "banco de dados próprio".'],
    desafio: '<strong>Desafio.</strong> Quando <strong>não há produtos</strong>, mostre uma mensagem "Nenhum produto cadastrado" (com a classe <code>alert alert-info</code> do Bootstrap). <strong>Explique ao professor</strong> como você descobriu que a lista estava vazia.' };
  A(71, 'Loja 14: A Vitrine com Cards (loja.js)', 'Desenhar os produtos como cards do Bootstrap a partir do mesmo localStorage', '🛍️', [
    P('💡', 'ENTENDA: a loja só lê o que o gerenciar guardou',
      `<p>A página da loja <strong>não tem dados próprios</strong>: ela lê <strong>o mesmo localStorage</strong> do gerenciar e desenha os produtos de outro jeito, em <strong>cards</strong>. Por isso o produto cadastrado em uma tela aparece na outra: <strong>os dados são os mesmos</strong>.</p>`,
      lista(['🃏 <code>criarCardHTML(dados)</code>: fabrica o HTML de <strong>um</strong> card', '🔁 O laço da página: percorre os produtos e coloca um card para cada', '🛒 O botão <strong>Comprar</strong> de cada card chama a função <code>carrinho(id)</code> (próxima aula)']),
      box('azul', `<strong>Antes de começar:</strong> o <code>index.html</code> tem a <code>div id="container-cards"</code> e o script <code>../js/loja.js</code> (Parte 1), e você tem produtos cadastrados na tela de gerenciar.`),
      analogia(`é a <strong>vitrine da loja</strong>: os produtos estão no <strong>estoque</strong> (localStorage). A vitrine só <em>mostra</em> o que está lá, do jeito mais bonito.`),
      caderno(['Gerenciar e Loja leem o MESMO localStorage', 'Card = card > card-body > card-title + card-text', 'O script roda sozinho ao abrir a página'])),
    etapa('🃏', 'ETAPA 1: criarCardHTML(dados), o card de um produto',
      'Escreva a função que <strong>fabrica o texto HTML</strong> de um card.',
      ['Abra <code>js/loja.js</code> e crie <code>criarCardHTML(dados)</code> com um <code>return</code> e um template string (crases)', 'Dentro: a estrutura <code>card</code> &gt; <code>card-body</code> com título (nome), dois parágrafos (descrição e valor em reais) e o botão', 'O valor usa <code>Number(...).toFixed(2).replace(".", ",")</code> (como na tabela)', 'O botão chama <code>carrinho(\'${dados.id}\')</code>: o id vai <strong>entre aspas simples</strong>'],
      `// Monta o HTML de um card com os dados de um produto.
function criarCardHTML(dados) {
  return §
    <div class="card d-inline-block">
      <div class="card-body">
        <h5 class="card-title">€{dados.___}</h5>
        <p class="card-text">€{dados.___}</p>
        <p class="card-text">R$ €{Number(dados.___).toFixed(2).replace(".", ",")}</p>

        <button type="button" class="btn btn-primary" onclick="carrinho('€{dados.___}')">Comprar</button>
      </div>
    </div>
  §;
}`,
      ['No console: <code>criarCardHTML({produto:"Caneta", descricao:"Azul", valor:"3.5", id:"p1"})</code> devolve o texto do card com <code>Caneta</code>, <code>Azul</code>, <code>R$ 3,50</code> e <code>carrinho(\'p1\')</code>', 'Confira as <strong>aspas simples</strong> ao redor do id no <code>onclick</code>'],
      ['Os campos que o <code>dados</code> terá são os mesmos da tabela: <code>produto</code>, <code>descricao</code>, <code>valor</code> e <code>id</code>.', 'O valor (<code>dados.valor</code>) é <strong>texto</strong>, por isso o <code>Number(...)</code> antes do <code>toFixed</code>.', 'Título: <code>€{dados.produto}</code> · descrição: <code>€{dados.descricao}</code> · valor: <code>€{Number(dados.valor)...}</code> · botão: <code>carrinho(\'€{dados.id}\')</code>',
        '<strong>Solução comentada:</strong>' + code(`function criarCardHTML(dados) {
  return §
    <div class="card d-inline-block">                                        <!-- a caixa; os cards ficam lado a lado -->
      <div class="card-body">                                               <!-- o espaço interno do card -->
        <h5 class="card-title">€{dados.produto}</h5>                        <!-- o nome -->
        <p class="card-text">€{dados.descricao}</p>                         <!-- a descrição -->
        <p class="card-text">R$ €{Number(dados.valor).toFixed(2).replace(".", ",")}</p>  <!-- o valor: 3.5 -> 3,50 -->
        <button type="button" class="btn btn-primary" onclick="carrinho('€{dados.id}')">Comprar</button>
      </div>
    </div>
  §;
}`)]),
    etapa('🔁', 'ETAPA 2: percorrer o localStorage e desenhar os cards',
      'Agora o código que <strong>roda ao abrir a página</strong> e coloca um card para cada produto.',
      ['Crie a constante <code>container</code> com a <code>div</code> <code>#container-cards</code>', 'Faça um <code>for</code> sobre as chaves do localStorage (<strong>declare o <code>i</code> com <code>let</code></strong>)', 'Pule as chaves que não começam com <code>p</code> (<code>continue</code>)', 'Abra o produto (<code>JSON.parse</code>) e monte o objeto <code>cardDados</code> (cuidado com as posições)', 'Acrescente o card no fim do container (<code>insertAdjacentHTML</code>)'],
      `// div da página onde os cards serão colocados
const container = document.querySelector("#___");

for (let ___ = 0; i < localStorage.length; i++) {
  let chave = localStorage.key(i);
  if (chave[0] != "___") continue;                       // só produtos
  let produtoVet = JSON.parse(localStorage.getItem(___));

  const cardDados = {
    produto: produtoVet[___],
    descricao: produtoVet[___],
    valor: produtoVet[___],
    id: chave,
  };
  container.insertAdjacentHTML("beforeend", ___(cardDados));
}`,
      ['Abra a <code>index.html</code>: aparece <strong>um card por produto</strong>', 'Os cards ficam lado a lado', 'Cadastre um produto novo na outra tela e <strong>recarregue</strong> a loja (F5): o novo card aparece'],
      ['O <code>container</code> é a <code>div id="container-cards"</code> do <code>index.html</code>.', 'As posições do array: <code>[0]</code> nome, <code>[1]</code> valor, <code>[2]</code> descrição. A descrição no card vai na <strong>[2]</strong> e o valor na <strong>[1]</strong>.', 'A função de desenho é a que você escreveu na etapa 1: <code>criarCardHTML(cardDados)</code>.',
        '<strong>Solução comentada:</strong>' + code(`const container = document.querySelector("#container-cards");   // onde os cards vão

for (let i = 0; i < localStorage.length; i++) {                  // percorre as gavetas
  let chave = localStorage.key(i);
  if (chave[0] != "p") continue;                                  // pula o que não é produto
  let produtoVet = JSON.parse(localStorage.getItem(chave));       // texto -> array

  const cardDados = {                                             // dá nome a cada posição
    produto: produtoVet[0],
    descricao: produtoVet[2],
    valor: produtoVet[1],
    id: chave,
  };
  container.insertAdjacentHTML("beforeend", criarCardHTML(cardDados));   // acrescenta o card
}`)]),
    P('🐞', 'ENCONTRE O ERRO: os bugs da vitrine',
      code(`// 1) a vitrine fica em branco
//    -> o <script src="../js/loja.js"> está ANTES da <div id="container-cards"> (a div ainda não existe)
//    Uncaught TypeError: Cannot read properties of null (reading 'insertAdjacentHTML')

// 2) valor e descrição trocados no card (R$ NaN)
//    -> usou produtoVet[2] no valor

// 3) cards um embaixo do outro
//    -> faltou d-inline-block (ou a classe está escrita errado)

// 4) for (i = 0; ...)   (sem let)
//    -> funciona, mas "i" vira variável GLOBAL (window.i): é uma má prática

// 5) ao clicar em Comprar:  Uncaught ReferenceError: carrinho is not defined
//    -> ESPERADO: a função carrinho() só será escrita na próxima aula`),
      lista(['<strong>1:</strong> a ordem no HTML: <strong>div primeiro, script depois</strong>', '<strong>2:</strong> escreva o mapa das posições em um comentário: <code>0 = nome, 1 = valor, 2 = descrição</code>', '<strong>4:</strong> teste no console: <code>window.i</code>. Se mostrar um número, o <code>i</code> vazou']),
      box('verde', `<strong>Provoque os 4 primeiros</strong> e veja o sintoma. O 5º você vai ver agora mesmo ao clicar em Comprar.`)),
    P('🏁', 'CHECKPOINT e DESAFIO',
      lista(['☐ Um card por produto, com nome, descrição, valor em reais e botão', '☐ Cards lado a lado', '☐ A loja reflete o que o gerenciar guardou', '☐ O <code>i</code> do laço foi declarado com <code>let</code>', '☐ <strong>Se travou:</strong> Dicas 1, 2 e 3 + solução comentada (digitando)']),
      box('verde', `<strong>Explique com suas palavras:</strong> por que a loja mostra os mesmos produtos da outra tela sem copiar nada, e o que faz cada parte do laço.`)),
  ], [
    Q('Por que a loja mostra os mesmos produtos cadastrados na tela de gerenciar?', 'As duas páginas leem o mesmo localStorage', 'A loja copia o arquivo da outra página', 'O Bootstrap sincroniza as páginas', 'O navegador envia os dados ao servidor'),
    Q('No loja.js, o código do laço está fora de qualquer função. Quando ele executa?', 'Assim que a página carrega o script', 'Só quando o usuário clica em Comprar', 'Nunca', 'Quando o localStorage muda'),
    Q('O que faz a classe d-inline-block no card?', 'Faz os cards ficarem lado a lado', 'Esconde o card', 'Muda a cor do card', 'Aumenta o título'),
    Q('Com produtoVet = ["Caneta","3.5","Azul"], qual é cardDados.descricao?', '"Azul" (produtoVet[2])', '"3.5" (produtoVet[1])', '"Caneta" (produtoVet[0])', 'undefined'),
    Q('A loja abre em branco e o console mostra: Cannot read properties of null (reading \'insertAdjacentHTML\'). Qual é a causa provável?', 'O script está antes da div container-cards no HTML', 'O localStorage está vazio', 'O Bootstrap não carregou', 'Faltou o JSON.parse'),
    Q('Em for (i = 0; ...) (sem let), o que acontece com o i?', 'Vira uma variável global (vaza para fora do laço)', 'Dá erro de sintaxe', 'O laço não roda', 'Nada de diferente'),
    Q('O botão Comprar mostra "carrinho is not defined". O que isso indica agora?', 'A função carrinho ainda não foi escrita (será a próxima aula)', 'O HTML do card está errado', 'O localStorage está vazio', 'O Bootstrap está desatualizado'),
    Q('Por que o id vai entre aspas simples no onclick do card?', 'Para o navegador tratar o id como texto, e não como variável', 'Porque aspas simples são mais rápidas', 'Porque o Bootstrap exige', 'Para o id ficar maiúsculo'),
    Q('O valor do card aparece como "R$ NaN". Qual é a causa provável?', 'Usou a posição errada do array para o valor', 'O card não tem classe', 'O JSON.parse falhou', 'O container não existe'),
  ]);

  // ══════════════════════════════════════════════════════
  // 96 — LOJA 15: O BOTÃO COMPRAR (carrinho)
  // ══════════════════════════════════════════════════════
  ENT['ETAPA 1: a função carrinho(id)'] = exemplo(
    `<p>"Comprar" é <strong>copiar o produto para outra gaveta</strong>: a mesma informação, só que com a chave começando por <code>c</code> (carrinho) em vez de <code>p</code> (produto). Como o produto <strong>já está guardado em texto JSON</strong>, não é preciso converter: basta <strong>pegar o texto</strong> de uma gaveta e <strong>colocar na outra</strong>.</p>`,
    `// EXEMPLO: copiar uma receita para a lista de favoritas
function favoritar(id) {
  let receita = localStorage.getItem(id);              // 1. pega o TEXTO da gaveta "r..."
  localStorage.setItem("f" + id.slice(1), receita);    // 2. coloca o mesmo texto na gaveta "f..."
  alert("Receita favoritada!");                        // 3. avisa o usuário
}`,
    ['<code>getItem(id)</code> devolve o <strong>texto</strong> guardado. Não precisa de <code>JSON.parse</code>, pois vamos guardar o <strong>mesmo texto</strong> em outro lugar', '<code>id.slice(1)</code>: o id é <code>"r3f2a..."</code>; <code>slice(1)</code> descarta a primeira letra e sobra <code>"3f2a..."</code>', '<code>"f" + ...</code>: cola a nova letra na frente: <code>"f3f2a..."</code>. <strong>Mesmo resto, outra letra</strong>: assim dá para saber qual favorita veio de qual receita', '<code>alert(texto)</code>: abre uma caixinha de aviso para o usuário'],
    'As letras são <code>p</code> (produto) e <code>c</code> (carrinho): <code>"c" + id.slice(1)</code>. Repare que a função se chama <code>carrinho</code> (é o nome que o botão do card chama).');
  PRAT[96] = { tarefas: ['<strong>Checkpoint.</strong> Clicar em <strong>Comprar</strong> mostra "Produto adicionado ao carrinho!" e cria uma chave <code>c…</code> na aba Application, com o <strong>mesmo valor</strong> do produto.', '<strong>Checkpoint.</strong> A chave do carrinho é a do produto com <strong>c no lugar do p</strong> (compare as duas lado a lado).', '<strong>Checkpoint.</strong> O produto original (<code>p…</code>) continua <strong>intacto</strong>.', '<strong>Checkpoint.</strong> Comprar o <strong>mesmo produto duas vezes</strong> continua com <strong>uma só</strong> chave (anote por quê).', '<strong>Explique:</strong> com suas palavras, por que não foi preciso usar <code>JSON.parse</code> nem <code>JSON.stringify</code> ao copiar.'],
    desafio: '<strong>Desafio.</strong> Hoje, comprar duas vezes <strong>não soma quantidade</strong> (a segunda compra substitui a primeira). Descubra como <strong>contar as unidades</strong> e mostre ao professor um plano: o que seria guardado, e quais funções (loja.js e carrinho.js) precisariam mudar. (Só o plano; não precisa implementar.)' };
  A(96, 'Loja 15: O Botão Comprar', 'Copiar o produto para o carrinho (chave p vira c) e avisar o usuário', '🛒', [
    P('💡', 'ENTENDA: comprar é copiar para outra gaveta',
      `<p>O carrinho <strong>não é uma tela separada com dados próprios</strong>: ele é uma <strong>família de gavetas</strong> no mesmo localStorage. Quando o usuário compra, o produto é <strong>copiado</strong> para uma gaveta cuja chave é <strong>a mesma, trocando a primeira letra</strong>: <code>p3f2a…</code> → <code>c3f2a…</code>.</p>`,
      lista(['🛍️ A loja mostra os produtos (<code>p…</code>)', '🛒 O botão Comprar <strong>copia</strong> o produto para <code>c…</code>', '🧺 O carrinho (próxima aula) mostra as gavetas <code>c…</code>', '❗ O produto original <strong>continua</strong> na loja']),
      analogia(`é <strong>tirar uma fotocópia</strong> do cartão do produto e guardá-la em outra gaveta (a do carrinho). O original continua na vitrine.`),
      caderno(['Comprar = copiar p… para c…', 'Mesmo resto do id, outra letra: "c" + id.slice(1)', 'O original não muda'])),
    etapa('🛒', 'ETAPA 1: a função carrinho(id)',
      'Escreva a função que o botão Comprar chama. O botão já manda o <strong>id do produto</strong>.',
      ['No <code>loja.js</code>, crie <code>carrinho(id)</code>', 'Leia o <strong>texto</strong> guardado na chave <code>id</code> (<code>getItem</code>)', 'Guarde esse mesmo texto em uma chave nova: <code>"c" + id.slice(1)</code>', 'Avise o usuário com <code>alert("Produto adicionado ao carrinho!")</code>'],
      `// Copia o produto para o carrinho: mesma chave, trocando o "p" do início por "c"
function ___(id) {
  let produto = localStorage.___(id);                   // texto JSON do produto
  localStorage.___("c" + id.___(1), ___);
  alert("Produto adicionado ao carrinho!");
}`,
      ['Abra a loja e clique em <strong>Comprar</strong> em um card: aparece o aviso', 'Aba <strong>Application</strong>: surgiu uma chave <code>c…</code> com o <strong>mesmo valor</strong> da chave <code>p…</code> do produto', 'Compare as duas chaves: <strong>só a primeira letra é diferente</strong>'],
      ['O nome da função é <strong>exatamente</strong> o que o botão do card chama (<code>carrinho</code>). Se escrever outro nome, aparece <em>"carrinho is not defined"</em>.', '<code>setItem</code> recebe <strong>(chave, valor)</strong>: a chave é <code>"c" + id.slice(1)</code> e o valor é a variável <code>produto</code>.', '<code>localStorage.setItem("c" + id.slice(1), produto);</code>',
        '<strong>Solução comentada:</strong>' + code(`function carrinho(id) {
  let produto = localStorage.getItem(id);                  // 1. pega o texto JSON do produto
  localStorage.setItem("c" + id.slice(1), produto);        // 2. guarda o MESMO texto na chave c...
  alert("Produto adicionado ao carrinho!");                // 3. avisa
}`)]),
    etapa('🔬', 'ETAPA 2: experimentos para entender o que acontece',
      'Faça estes três testes e <strong>anote o que viu</strong>. Eles explicam como o carrinho funciona.',
      ['<strong>Teste 1:</strong> compre o <strong>produto A</strong>. Quantas chaves <code>c…</code> existem?', '<strong>Teste 2:</strong> compre o <strong>produto A de novo</strong>. Quantas chaves <code>c…</code> existem agora? Por quê?', '<strong>Teste 3:</strong> compre o produto B. E agora? Qual é a relação entre <code>p…</code> e <code>c…</code>?'],
      `// no CONSOLE, depois dos testes:
Object.keys(localStorage)                          // lista todas as chaves
Object.keys(localStorage).filter(k => k[0] == "c")  // só as do carrinho`,
      ['Teste 1: <strong>1</strong> chave <code>c…</code>', 'Teste 2: continua <strong>1</strong> (a segunda compra <strong>escreveu na mesma chave</strong>: substituiu)', 'Teste 3: <strong>2</strong> chaves <code>c…</code> (uma por produto)'],
      ['No teste 2, a chave é a <strong>mesma</strong> (<code>"c" + id.slice(1)</code> é igual para o mesmo produto), então o <code>setItem</code> <strong>substitui</strong> o valor.', 'Por isso, <strong>este carrinho não conta unidades</strong>: ele só diz "este produto está no carrinho". Isso é uma limitação (veja o desafio da prática).', 'O <code>.filter(k =&gt; k[0] == "c")</code> é uma função de seta: "fique só com as chaves que começam com c".']),
    P('🐞', 'ENCONTRE O ERRO: o que dá errado no Comprar',
      code(`// 1) Uncaught ReferenceError: carrinho is not defined
//    -> o nome da função está diferente do onclick, ou o loja.js não carregou

// 2) a chave do carrinho fica "cp3f2a..."
localStorage.setItem("c" + id, produto);      // faltou o .slice(1): a letra p ficou junto

// 3) o carrinho guarda "null"
let produto = localStorage.getItem("id");     // "id" entre aspas: procurou uma chave chamada id!

// 4) onclick="carrinho(€{dados.id})" (sem aspas simples no id)
//    Uncaught ReferenceError: p3f2a9c1e is not defined`),
      lista(['<strong>2:</strong> sem o <code>slice(1)</code> a chave nunca coincide com a que o carrinho vai procurar', '<strong>3:</strong> <code>id</code> sem aspas é a <strong>variável</strong>; <code>"id"</code> com aspas é o <strong>texto</strong> "id". Fonte de muitos bugs', '<strong>4:</strong> o id precisa ir entre aspas simples dentro do onclick']),
      box('verde', `<strong>Provoque os 4</strong> e confira, na aba Application, qual chave foi criada (ou não).`)),
    P('🏁', 'CHECKPOINT e DESAFIO',
      lista(['☐ Comprar cria a chave <code>c…</code> com o mesmo valor do produto', '☐ O produto original continua na loja', '☐ Você sabe dizer por que comprar duas vezes não soma', '☐ <strong>Se travou:</strong> Dicas 1, 2, 3 + solução comentada (digitando)']),
      box('verde', `<strong>Explique com suas palavras:</strong> o que faz <code>"c" + id.slice(1)</code> e por que o <code>JSON.parse</code> não foi necessário na cópia.`)),
  ], [
    Q('O produto tem a chave "p3f2a". Qual é a chave do carrinho gerada por "c" + id.slice(1)?', '"c3f2a"', '"cp3f2a"', '"p3f2a"', '"3f2a"'),
    Q('O que faz "c" + id (sem o slice) com id = "p3f2a"?', 'Gera "cp3f2a", uma chave que o carrinho não procura', 'Gera "c3f2a"', 'Dá erro', 'Gera "p3f2a"'),
    Q('Por que não é preciso JSON.parse/stringify para copiar o produto?', 'O valor já é texto JSON, basta colocar o mesmo texto em outra chave', 'Porque o localStorage converte sozinho', 'Porque o produto não é um array', 'Porque o JSON só é usado ao ler'),
    Q('Comprar o mesmo produto duas vezes resulta em:', 'Uma única chave c…, pois a segunda compra substitui o valor', 'Duas chaves c… iguais', 'Um erro', 'A quantidade 2 na chave'),
    Q('let produto = localStorage.getItem("id") (com aspas) busca o quê?', 'Uma chave chamada literalmente "id" (e devolve null)', 'O produto do parâmetro id', 'Todos os produtos', 'O primeiro produto'),
    Q('Clicar em Comprar mostra "carrinho is not defined". Qual é a causa provável?', 'A função tem outro nome, ou o loja.js não carregou', 'O produto não existe', 'O localStorage está vazio', 'O card está sem classe'),
    Q('Depois de comprar, o que acontece com a chave p… do produto?', 'Continua intacta', 'É apagada', 'Vira c…', 'É duplicada'),
    Q('Em localStorage.setItem("c" + id.slice(1), produto), o segundo argumento (produto) é:', 'O texto JSON lido da chave original', 'O id', 'Um número', 'Um objeto'),
    Q('Qual é a limitação deste carrinho?', 'Não conta unidades: o mesmo produto só aparece uma vez', 'Só aceita 5 produtos', 'Apaga os produtos da loja', 'Só funciona com um navegador'),
  ]);

  // ══════════════════════════════════════════════════════
  // 97 — LOJA 16: O CARRINHO (carrinho.js)
  // ══════════════════════════════════════════════════════
  ENT['ETAPA 2: listar(), desenhar os itens e somar o total'] = exemplo(
    `<p>A função <code>listar</code> é parecida com o <code>atualizarGrid</code>, mas faz <strong>uma coisa a mais</strong>: <strong>soma</strong> os valores enquanto percorre. Para somar, usamos um <strong>acumulador</strong>: uma variável que começa em <strong>zero ANTES do laço</strong> e vai recebendo <code>+=</code> a cada volta.</p>
     <p style="margin-top:8px"><code>total += x</code> é o mesmo que <code>total = total + x</code> ("some x ao total").</p>`,
    `// EXEMPLO: somar o valor dos pedidos guardados (chaves "m...") e mostrar o total
function somarMesa() {
  let total = 0;                                           // 1. ANTES do laço, começa em zero

  for (let j = 0; j < localStorage.length; j++) {
    let chave = localStorage.key(j);
    if (chave[0] != "m") continue;
    let pedido = JSON.parse(localStorage.getItem(chave));  // ["Suco", "8.5"]

    total += Number(pedido[1]);                            // 2. converte o texto em número e SOMA
  }

  // 3. mostra o total com 2 casas e vírgula
  document.querySelector("#totalMesa").textContent = total.toFixed(2).replace(".", ",");
}`,
    ['<strong>1.</strong> o <code>total</code> <strong>fora</strong> do laço: se estivesse dentro, voltaria a zero a cada volta e só valeria o último item', '<strong>2.</strong> <code>pedido[1]</code> é <strong>texto</strong> (<code>"8.5"</code>). Sem o <code>Number()</code>, o <code>+=</code> <strong>juntaria textos</strong> (<code>"0" + "8.5"</code> = <code>"08.5"</code>) em vez de somar', '<strong>3.</strong> <code>.textContent</code> troca <strong>o texto</strong> do elemento (aqui, o <code>&lt;span&gt;</code> do total)', '<code>.toFixed(2).replace(".", ",")</code>: duas casas e vírgula, igual ao preço'],
    'A chave é <code>c</code>, o valor está em <code>produtoVet[1]</code>, e o total aparece em <code>#totalCarrinho</code>. Dentro do mesmo laço também <strong>desenhamos a linha</strong> de cada item.');
  PRAT[97] = { tarefas: ['<strong>Checkpoint.</strong> Depois de comprar 3 produtos, o carrinho lista os <strong>3 itens</strong> e o <strong>total confere com uma calculadora</strong>.', '<strong>Checkpoint.</strong> Clicar em <strong>Remover</strong> tira só aquele item e <strong>recalcula o total</strong>; o <strong>produto</strong> continua na loja.', '<strong>Checkpoint.</strong> Com o carrinho vazio, o total é <code>0,00</code> e a tabela fica vazia (sem erro).', '<strong>Checkpoint.</strong> Os produtos (<code>p…</code>) <strong>não</strong> aparecem no carrinho.', '<strong>Explique:</strong> com suas palavras, por que o <code>total</code> começa em zero <strong>antes</strong> do laço e por que usamos <code>Number()</code>.'],
    desafio: '<strong>Desafio.</strong> Mostre, junto do total, a <strong>quantidade de itens</strong> ("3 itens"). Depois, faça o link "Carrinho" do menu mostrar essa quantidade (dica: o <code>menu.js</code> roda em todas as páginas). <strong>Explique ao professor</strong> sua solução.' };
  A(97, 'Loja 16: O Carrinho (carrinho.js)', 'Listar os itens comprados, somar o total e remover itens', '🧺', [
    P('💡', 'ENTENDA: o carrinho é só mais uma tela dos mesmos dados',
      `<p>O <code>carrinho.js</code> aplica <strong>a mesma receita</strong> das outras telas (<em>limpar → percorrer → desenhar</em>), mas lendo a <strong>família <code>c</code></strong>, com <strong>duas novidades</strong>: o <strong>total</strong> e o botão <strong>Remover</strong>.</p>`,
      lista(['🧱 <code>criarLinhaHTML(dados)</code>: o HTML de <strong>uma linha</strong> do carrinho (igual à do gerenciar, mas o botão é <strong>Remover</strong>)', '🔁 <code>listar()</code>: percorre as chaves <code>c</code>, desenha as linhas e <strong>soma o total</strong>', '❌ <code>remover(id)</code>: apaga a chave e redesenha']),
      box('azul', `<strong>Antes de começar:</strong> o <code>carrinho.html</code> tem o <code>tbody id="listaCarrinho"</code> e o <code>span id="totalCarrinho"</code>, e você já comprou 2 ou 3 produtos na loja.`),
      analogia(`o <strong>caixa do mercado</strong>: passa cada item (nome, valor) e, no fim, mostra o <strong>total</strong>. Se o cliente desiste de um item, o caixa tira e refaz a conta.`),
      caderno(['Carrinho = chaves c…', 'Total = acumulador (começa em 0 ANTES do laço) + Number()', 'remover: removeItem + listar()'])),
    etapa('🧱', 'ETAPA 1: criarLinhaHTML(dados) do carrinho',
      'É a mesma ideia da linha do gerenciar, com <strong>um botão só</strong>: Remover.',
      ['No <code>js/carrinho.js</code>, crie <code>criarLinhaHTML(dados)</code> (é o mesmo nome do gerenciar, <strong>sem conflito</strong>, pois cada página carrega só um dos arquivos)', 'A linha: <code>&lt;tr&gt;</code> com nome, valor em reais, descrição e o botão <code>btn btn-danger btn-sm</code> chamando <code>remover(\'€{dados.id}\')</code>'],
      `function criarLinhaHTML(dados) {
  return §
    <tr>
      <td>€{dados.___}</td>
      <td>R$ €{Number(dados.___).toFixed(2).replace(".", ",")}</td>
      <td>€{dados.___}</td>
      <td><button type="button" class="btn btn-danger btn-sm" onclick="___('€{dados.id}')">Remover</button></td>
    </tr>
  §;
}`,
      ['No console: <code>criarLinhaHTML({produto:"Caneta", valor:"3.5", descricao:"Azul", id:"c1"})</code> devolve o texto da linha com <code>R$ 3,50</code> e <code>remover(\'c1\')</code>'],
      ['<code>btn-danger</code> = botão vermelho; <code>btn-sm</code> = botão pequeno (small).', 'A função que o botão chama é <code>remover</code> (você a escreve na etapa 3).', 'Campos: <code>dados.produto</code>, <code>dados.valor</code>, <code>dados.descricao</code>.']),
    etapa('🔁', 'ETAPA 2: listar(), desenhar os itens e somar o total',
      'A função principal do carrinho.',
      ['Crie <code>listar()</code>; pegue o <code>tbody #listaCarrinho</code> e <strong>esvazie</strong>', 'Crie o acumulador: <code>let total = 0;</code> (<strong>antes</strong> do laço)', 'Percorra as chaves e pule as que <strong>não</strong> começam com <code>c</code>', 'Para cada uma: abra (<code>JSON.parse</code>), <strong>some</strong> <code>Number(produtoVet[1])</code> ao total e acrescente a linha', 'Depois do laço, escreva o total no <code>#totalCarrinho</code> (<code>textContent</code>) com 2 casas e vírgula'],
      `function listar() {
  const lista = document.querySelector("#___");
  lista.innerHTML = "";
  let total = ___;                                        // acumulador: ANTES do laço

  for (let j = 0; j < localStorage.length; j++) {
    let chave = localStorage.key(j);
    if (chave[0] != "___") continue;                      // só itens do carrinho
    let produtoVet = JSON.parse(localStorage.getItem(chave));

    const linhaDados = {
      produto: produtoVet[0],
      valor: produtoVet[1],
      descricao: produtoVet[2],
      id: chave,
    };
    total += ___(produtoVet[1]);                          // texto -> número, e soma
    lista.insertAdjacentHTML("beforeend", criarLinhaHTML(linhaDados));
  }
  // mostra o total com 2 casas e vírgula
  document.querySelector("#___").textContent = total.toFixed(2).replace(".", ",");
}`,
      ['Compre 2 ou 3 produtos e abra o carrinho: aparece <strong>uma linha por item</strong>', 'O total confere com a <strong>calculadora</strong>', 'Os <strong>produtos</strong> (p…) <strong>não</strong> aparecem na lista'],
      ['Se o total aparece como <code>NaN</code> ou algo como <code>00.5...</code>, faltou o <code>Number()</code> (a soma virou junção de textos).', 'Se o total mostra só o <strong>último</strong> valor, o <code>let total = 0</code> está <strong>dentro</strong> do laço (recomeça a cada volta).', 'O elemento do total é o <code>span id="totalCarrinho"</code>; a lista é <code>#listaCarrinho</code>.',
        '<strong>Solução comentada:</strong>' + code(`function listar() {
  const lista = document.querySelector("#listaCarrinho");
  lista.innerHTML = "";                                         // limpa
  let total = 0;                                                // acumulador: ANTES do laço

  for (let j = 0; j < localStorage.length; j++) {
    let chave = localStorage.key(j);
    if (chave[0] != "c") continue;                              // só itens do carrinho
    let produtoVet = JSON.parse(localStorage.getItem(chave));   // texto -> array

    const linhaDados = {
      produto: produtoVet[0],
      valor: produtoVet[1],
      descricao: produtoVet[2],
      id: chave,
    };
    total += Number(produtoVet[1]);                             // converte o texto e soma
    lista.insertAdjacentHTML("beforeend", criarLinhaHTML(linhaDados));
  }
  document.querySelector("#totalCarrinho").textContent = total.toFixed(2).replace(".", ",");
}`)]),
    etapa('❌', 'ETAPA 3: remover(id) e abrir já desenhado',
      'Falta tirar itens e mostrar o carrinho ao abrir a página.',
      ['Crie <code>remover(id)</code>: apaga a chave <code>id</code> (<code>removeItem</code>) e chama <code>listar()</code>', '<strong>Atenção:</strong> só a chave <code>c…</code> é apagada: o produto original continua na loja', 'Na <strong>última linha</strong> do arquivo, chame <code>listar()</code> para desenhar ao abrir a página'],
      `// Tira o item do carrinho (apaga a chave c...) e redesenha a tabela
function remover(id) {
  localStorage.___(id);
  ___();
}

___();    // ao abrir a página, mostra o que já está no carrinho`,
      ['Clique em <strong>Remover</strong> em um item: ele some e o <strong>total diminui</strong>', 'Abra a loja: o <strong>produto</strong> continua lá', 'Aperte F5 no carrinho: os itens continuam'],
      ['O <code>id</code> que o botão manda já é a chave do carrinho (<code>c…</code>), então <code>removeItem(id)</code> apaga o item certo.', 'Sem a chamada do fim do arquivo, o carrinho abre <strong>vazio</strong> (mesmo com itens guardados).', '<code>function remover(id) { localStorage.removeItem(id); listar(); }</code> e, no fim, <code>listar();</code>']),
    P('🐞', 'ENCONTRE O ERRO: os bugs do carrinho',
      code(`// 1) total com texto:  "0" + "3.5" + "18"  ->  "03.518"
//    -> faltou Number()

// 2) o total é só o último valor
//    -> let total = 0 está DENTRO do laço

// 3) os produtos aparecem no carrinho
//    -> o filtro está chave[0] != "p" (era "c")

// 4) Uncaught ReferenceError: remover is not defined
//    -> o nome da função difere do onclick, ou o carrinho.js não carregou

// 5) removeu o item, mas o total e a lista não mudaram
//    -> faltou chamar listar() depois do removeItem`),
      lista(['Todos seguem o mesmo padrão: <strong>leia a mensagem</strong> ou <strong>compare o resultado</strong> com o esperado, e volte à linha responsável', 'Para o bug 1, rode no console: <code>"0" + "3.5" + "18"</code> e <code>0 + Number("3.5") + Number("18")</code> e compare']),
      box('verde', `<strong>Provoque os 5</strong>, observe e conserte. É assim que você aprende a reconhecê-los.`)),
    P('🏁', 'CHECKPOINT e DESAFIO',
      lista(['☐ O carrinho lista os itens comprados e o total <strong>confere com a calculadora</strong>', '☐ Remover tira só o item e recalcula o total', '☐ O produto original continua na loja', '☐ Carrinho vazio mostra total 0,00', '☐ <strong>Se travou:</strong> Dicas 1, 2, 3 + solução comentada (digitando)']),
      box('verde', `<strong>Explique com suas palavras:</strong> por que o <code>total</code> começa em zero <strong>antes</strong> do laço, por que usamos <code>Number()</code> e por que o <code>remover</code> termina chamando <code>listar()</code>.`)),
  ], [
    Q('No carrinho, três itens custam "3.5", "18" e "10". O código faz total += produtoVet[1] (sem Number) começando com let total = 0. O que acontece?', 'Vira uma junção de textos como "03.51810"', 'Soma 31.5', 'Dá erro de sintaxe', 'Mostra 3.5'),
    Q('Qual é o total correto de 3.5, 18 e 10?', '31,50 (31.5)', '31,5', '315', '3,5'),
    Q('O total mostra só o valor do último item. Qual é a causa provável?', 'let total = 0 está dentro do laço', 'Faltou o Number()', 'O filtro está errado', 'O toFixed não funciona'),
    Q('Os produtos aparecem no carrinho. Qual é a causa provável?', 'O filtro está pegando a letra p em vez de c', 'O Bootstrap está errado', 'Faltou o total', 'O JSON.parse falhou'),
    Q('Por que remover(id) termina chamando listar()?', 'Para redesenhar a tabela e recalcular o total', 'Porque o removeItem exige', 'Para apagar a tabela inteira', 'Para voltar à loja'),
    Q('Ao clicar em Remover no carrinho, o que acontece com o produto original na loja?', 'Continua na loja, pois só a chave c… foi apagada', 'É apagado', 'Fica escondido', 'Vira c…'),
    Q('O que faz total += Number(produtoVet[1])?', 'Converte o valor em número e soma ao total', 'Troca o total pelo valor', 'Concatena textos', 'Dobra o valor'),
    Q('O carrinho abre vazio, mesmo com itens guardados. O que provavelmente falta?', 'Chamar listar() na última linha do arquivo', 'Chamar remover()', 'Trocar let por const', 'Apagar o localStorage'),
    Q('Por que criarLinhaHTML existe em dois arquivos (gerenciar e carrinho) sem conflito?', 'Cada página carrega só um dos arquivos', 'O JavaScript junta as duas funções', 'O navegador renomeia uma delas', 'Porque o nome é permitido repetir sempre'),
  ]);

  // ══════════════════════════════════════════════════════
  // 126 — LOJA 17: QUALIDADE E SEGURANÇA DO CÓDIGO
  // ══════════════════════════════════════════════════════
  ENT['ETAPA 2: a função escaparHtml(texto)'] = exemplo(
    `<p>Para impedir que um nome com tags vire HTML, vamos <strong>trocar os caracteres especiais</strong> por versões "inofensivas" chamadas <strong>entidades HTML</strong>: o símbolo <code>&lt;</code> vira <code>&amp;lt;</code>, que o navegador <strong>mostra como texto</strong> (e não interpreta como tag). Usamos o método <code>.replace(/x/g, "y")</code>: "troque <strong>todos</strong> os <code>x</code> por <code>y</code>" (o <code>g</code> significa <em>global</em>: todas as ocorrências).</p>`,
    `// EXEMPLO: neutralizar apenas o símbolo < de um texto
function semTag(texto) {
  return String(texto).replace(/</g, "&lt;");
}

semTag("<b>oi</b>")      // "&lt;b>oi&lt;/b>"   -> na tela aparece o TEXTO <b>oi</b>, sem negrito`,
    ['<code>String(texto)</code>: garante que é <strong>texto</strong> (pode ter chegado um número)', '<code>/</code>&lt;<code>/g</code>: a "regra de busca": todos os <code>&lt;</code> do texto', '<code>"&amp;lt;"</code>: o que entra no lugar. O navegador exibe <code>&amp;lt;</code> como o <strong>símbolo</strong> <code>&lt;</code>, sem tratá-lo como tag', 'A função devolve o texto <strong>já seguro</strong>'],
    'A função real troca <strong>5 caracteres</strong> (<code>&amp;</code>, <code>&lt;</code>, <code>&gt;</code>, <code>"</code> e <code>\'</code>) encadeando 5 <code>.replace</code>. E depois é <strong>usada dentro dos template strings</strong>: <code>€{escaparHtml(dados.produto)}</code>.');
  PRAT[126] = { tarefas: ['<strong>Checkpoint.</strong> Cadastrar um produto com o nome <code>&lt;b&gt;Teste&lt;/b&gt;</code> mostra, na tabela e na loja, o <strong>texto escrito</strong> (com os símbolos), e <strong>não</strong> em negrito.', '<strong>Checkpoint.</strong> O produto com o nome <code>&lt;img src=x onerror=alert(1)&gt;</code> <strong>não executa</strong> o alerta (nem na tabela, nem na loja, nem no carrinho).', '<strong>Checkpoint.</strong> Nas 3 páginas, o <code>escaparHtml</code> é usado em <strong>nome</strong> e <strong>descrição</strong>.', '<strong>Checkpoint.</strong> Com <code>"use strict"</code> no topo de cada <code>.js</code>, o console <strong>não</strong> mostra "is not defined" (nenhuma variável global acidental).', '<strong>Explique:</strong> com suas palavras, como o XSS acontece neste projeto e como o <code>escaparHtml</code> impede.'],
    desafio: '<strong>Desafio.</strong> Escolha <strong>uma</strong> melhoria e implemente: (a) trocar a lógica do botão Alterar por uma variável <code>idEditando</code>; (b) guardar o produto como <strong>objeto</strong> <code>{nome, valor, descricao}</code> em vez de array; (c) contar <strong>quantidade</strong> no carrinho. <strong>Faça um plano</strong> dos arquivos e funções que mudam antes de programar e explique ao professor.' };
  A(126, 'Loja 17: Qualidade e Segurança do Código', 'Corrigir uma falha de segurança (XSS) e deixar o código mais limpo e seguro', '🛡️', [
    P('💡', 'ENTENDA: o sistema funciona, mas ainda tem problemas escondidos',
      `<p>Um sistema que <strong>funciona</strong> não é necessariamente um sistema <strong>bom</strong>. Nesta aula você vai <strong>achar e corrigir</strong> dois problemas reais do projeto:</p>`,
      lista(['🛡️ <strong>Segurança (XSS):</strong> um nome de produto com tags HTML é <strong>executado</strong> pela página, porque usamos <code>innerHTML</code>/<code>insertAdjacentHTML</code> com dados digitados', '🧹 <strong>Qualidade:</strong> variáveis <strong>globais</strong> acidentais (sem <code>let</code>/<code>const</code>), que podem causar bugs difíceis']),
      analogia(`é uma <strong>revisão do carro antes da viagem</strong>: ele anda, mas você confere freios, pneus e óleo. Programador profissional faz a mesma revisão no código.`),
      box('azul', `<strong>Atenção ética:</strong> faça os testes de ataque <strong>apenas no seu próprio projeto</strong>. Tentar isso em sites de outras pessoas é crime. Aqui, o objetivo é <strong>aprender a se defender</strong>.`),
      caderno(['XSS: texto digitado que vira código executado', 'Defesa: escapar < > & " \' antes de inserir no HTML', 'Sempre declare variáveis com let/const'])),
    etapa('💥', 'ETAPA 1: provocar o problema (XSS)',
      'Antes de corrigir, <strong>reproduza o ataque</strong> no seu projeto. Bug que você não consegue reproduzir, você não consegue corrigir.',
      ['Na tela de gerenciar, cadastre um produto com <strong>nome</strong>: <code>&lt;b&gt;Teste&lt;/b&gt;</code>, qualquer valor e qualquer descrição', 'Olhe a <strong>tabela</strong>, a <strong>loja</strong> e o <strong>carrinho</strong> (compre o produto)', 'Agora cadastre outro produto com o nome do <strong>ataque abaixo</strong> e veja o que acontece', 'Anote: <strong>o texto foi mostrado ou executado?</strong>'],
      `<b>Teste</b>

<img src=x onerror=alert("XSS")>`,
      ['O nome <code>&lt;b&gt;Teste&lt;/b&gt;</code> aparece em <strong>negrito</strong> (o HTML foi interpretado, não mostrado)', 'O segundo nome faz aparecer uma caixa de alerta <strong>"XSS"</strong>: o código <strong>executou</strong>', 'Isso acontece nas 3 telas: tabela, vitrine e carrinho'],
      ['<code>insertAdjacentHTML</code> recebe um <strong>texto</strong> e o <strong>interpreta como HTML</strong>. Se o texto tem tags, as tags <strong>viram elementos</strong>.', 'No ataque, a tag <code>&lt;img src=x&gt;</code> tenta carregar uma imagem inexistente (<code>x</code>), dá erro, e o atributo <code>onerror</code> <strong>executa o código</strong> que o atacante escreveu.', 'Em vez do <code>alert</code>, o código poderia ler tudo do localStorage e enviá-lo para outro lugar. <strong>Esse é o risco real.</strong>']),
    etapa('🛡️', 'ETAPA 2: a função escaparHtml(texto)',
      'A defesa: <strong>transformar</strong> os símbolos perigosos em entidades <strong>antes</strong> de colocar o texto no HTML.',
      ['Crie <code>escaparHtml(texto)</code> <strong>nos 3 arquivos</strong> que desenham HTML (<code>gerenciarProdutos.js</code>, <code>loja.js</code>, <code>carrinho.js</code>)', 'Ela devolve o texto com <strong>5 trocas</strong> encadeadas, nesta ordem: <code>&amp;</code> primeiro (senão ele desfaria as outras), depois <code>&lt;</code>, <code>&gt;</code>, <code>"</code> e <code>\'</code>', 'Teste no console com alguns textos'],
      `function escaparHtml(texto) {
  return String(texto)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/___/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}`,
      ['<code>escaparHtml("&lt;b&gt;oi&lt;/b&gt;")</code> → <code>"&amp;lt;b&amp;gt;oi&amp;lt;/b&amp;gt;"</code>', '<code>escaparHtml("Caneta")</code> → <code>"Caneta"</code> (texto normal <strong>não muda</strong>)', '<code>escaparHtml(3.5)</code> → <code>"3.5"</code> (aceita número)'],
      ['A <strong>ordem</strong> importa: se trocasse o <code>&lt;</code> antes do <code>&amp;</code>, o <code>&amp;lt;</code> resultante teria o seu <code>&amp;</code> trocado de novo (viraria <code>&amp;amp;lt;</code>).', 'O terceiro replace procura o símbolo <code>&gt;</code>. As expressões <code>/x/g</code> usam <code>/</code> no começo e no fim, e o <code>g</code> (global) troca <strong>todas</strong> as ocorrências.', 'Terceira linha: <code>.replace(/&gt;/g, "&amp;gt;")</code>',
        '<strong>Solução comentada:</strong>' + code(`function escaparHtml(texto) {
  return String(texto)              // garante que é texto
    .replace(/&/g, "&amp;")         // 1º: & (precisa ser o primeiro!)
    .replace(/</g, "&lt;")          // 2º: <
    .replace(/>/g, "&gt;")          // 3º: >
    .replace(/"/g, "&quot;")        // 4º: aspas duplas
    .replace(/'/g, "&#39;");        // 5º: aspas simples
}`)]),
    etapa('🔌', 'ETAPA 3: usar a defesa nos três lugares',
      'A função só protege se for <strong>usada</strong>. Aplique-a em <strong>todo dado digitado</strong> que entra num template string.',
      ['Em <code>criarLinhaHTML</code> (<strong>gerenciar</strong>): <code>€{escaparHtml(dados.produto)}</code> e <code>€{escaparHtml(dados.descricao)}</code>', 'Em <code>criarCardHTML</code> (<strong>loja</strong>): nome e descrição', 'Em <code>criarLinhaHTML</code> (<strong>carrinho</strong>): nome e descrição', '<strong>Não</strong> precisa no valor (já passa por <code>Number</code>) nem no id (gerado pelo sistema)', 'Teste de novo os dois ataques'],
      `// antes:
<td>€{dados.produto}</td>
// depois:
<td>€{___(dados.produto)}</td>`,
      ['O nome <code>&lt;b&gt;Teste&lt;/b&gt;</code> aparece como <strong>texto</strong>, com os símbolos, <strong>sem negrito</strong>', 'O ataque <code>&lt;img src=x onerror=...&gt;</code> <strong>não executa</strong> mais: aparece escrito', 'Funciona nas 3 telas. Confira a <strong>tabela</strong>, a <strong>vitrine</strong> e o <strong>carrinho</strong>'],
      ['A função vai <strong>dentro</strong> do <code>€{ }</code>: o resultado dela é que é colocado no texto.', 'Repare: a regra é <strong>escapar tudo que veio de um usuário</strong> antes de colocar em HTML. O valor, que passa por <code>Number()</code>, já é seguro.', '<code>&lt;td&gt;€{escaparHtml(dados.produto)}&lt;/td&gt;</code> e <code>&lt;td&gt;€{escaparHtml(dados.descricao)}&lt;/td&gt;</code>']),
    etapa('🧹', 'ETAPA 4: caçando variáveis globais com o modo estrito',
      'Variáveis sem <code>let</code>/<code>const</code> viram <strong>globais</strong> sem querer. Há uma forma de o próprio JavaScript <strong>avisar</strong>: o <strong>modo estrito</strong>.',
      ['Na <strong>primeira linha</strong> de cada <code>.js</code>, escreva <code>"use strict";</code> (com aspas)', 'Recarregue cada página e abra o <strong>Console</strong>', 'Cada erro <code>... is not defined</code> aponta uma variável que estava <strong>sem declarar</strong>: corrija colocando <code>let</code> ou <code>const</code>', 'Repita até o console ficar limpo'],
      `"use strict";

// ... o resto do arquivo`,
      ['Com o modo estrito, uma atribuição a uma variável <strong>não declarada</strong> vira erro: <code>Uncaught ReferenceError: nome is not defined</code>', 'Depois de corrigir tudo, as <strong>3 páginas</strong> funcionam e o console fica <strong>limpo</strong>', 'No console, <code>window.i</code> e <code>window.nome</code> devolvem <code>undefined</code> (nada vazou)'],
      ['Procure no código por atribuições sem <code>let</code>, como <code>i = 0</code> em um <code>for</code>.', 'Cuidado: o <code>"use strict"</code> precisa ser a <strong>primeira instrução</strong> do arquivo (comentários antes são permitidos).', 'Exemplo de correção: <code>for (i = 0; ...)</code> vira <code>for (let i = 0; ...)</code>.']),
    P('🐞', 'ENCONTRE O ERRO + O QUE MAIS MELHORAR',
      code(`// 1) o escaparHtml foi aplicado só na tabela, e o ataque ainda funciona na vitrine
//    -> toda tela que usa dados digitados precisa do escaparHtml

// 2) o & foi trocado DEPOIS dos outros: o resultado fica "&amp;lt;"  (duplo escape)
//    -> o & precisa ser o PRIMEIRO replace

// 3) escapou o ID do produto no onclick e os botões pararam de funcionar
//    -> o id é gerado pelo sistema (UUID): não precisa, e as aspas mudariam

// 4) "use strict" dentro de uma função (e não no topo): só vale dentro dela`),
      lista(['<strong>Mais melhorias possíveis</strong> (para o desafio): <code>idEditando</code> em vez do id do botão; <strong>objeto</strong> no lugar do array; <strong>quantidade</strong> no carrinho; <strong>validar</strong> espaços e valores negativos; mensagens do Bootstrap (<code>alert</code>) no lugar de <code>alert()</code>', '<strong>Boa prática do professor:</strong> código <strong>funcionando</strong> é o começo; código <strong>seguro, claro e fácil de mudar</strong> é o objetivo']),
      lista(['☐ Nome com tags aparece como texto nas 3 telas', '☐ O ataque do alerta não executa', '☐ Nenhuma variável global acidental (modo estrito sem erros)', '☐ Você sabe explicar XSS e a defesa']),
      box('verde', `<strong>Explique com suas palavras:</strong> como o XSS acontece neste projeto e como o <code>escaparHtml</code> impede. Por que o <code>&amp;</code> é o primeiro replace?`)),
  ], [
    Q('O nome do produto é <b>Teste</b> e aparece em negrito na tabela. Por quê?', 'O insertAdjacentHTML interpreta o texto como HTML', 'O Bootstrap deixa em negrito', 'O localStorage converte o texto', 'O Number() altera o nome'),
    Q('O que é XSS?', 'Um ataque em que um texto digitado vira código executado na página', 'Um tipo de CSS', 'Um erro de rede', 'Uma forma de guardar dados'),
    Q('O que faz escaparHtml("<b>oi</b>")?', 'Troca os símbolos por entidades (&lt; e &gt;), e o texto é mostrado sem virar negrito', 'Apaga o texto', 'Coloca o texto em negrito', 'Transforma em número'),
    Q('Por que o replace do & deve ser o primeiro?', 'Para não trocar de novo o & das entidades criadas depois (duplo escape)', 'Porque o & é o mais usado', 'Porque o JavaScript exige', 'Não faz diferença'),
    Q('Qual dado NÃO precisa de escaparHtml neste projeto?', 'O valor (passa por Number) e o id (gerado pelo sistema)', 'O nome do produto', 'A descrição do produto', 'Qualquer texto digitado'),
    Q('O ataque <img src=x onerror=alert(1)> executa o alerta porque:', 'A imagem falha e o atributo onerror executa o código', 'O navegador tem um erro', 'O alert é permitido em imagens', 'O CSS chama o alerta'),
    Q('O escaparHtml foi aplicado só na tabela. O que acontece na vitrine?', 'O ataque ainda funciona nela', 'Fica protegida também', 'Dá erro', 'A vitrine fica vazia'),
    Q('O que faz "use strict"; no topo de um arquivo?', 'Faz o JavaScript acusar erro ao usar variável sem declarar', 'Deixa o código mais rápido', 'Impede o uso de funções', 'Apaga o localStorage'),
    Q('Em modo estrito, aparece "ReferenceError: nome is not defined". O que fazer?', 'Declarar a variável com let ou const', 'Apagar o use strict', 'Trocar a função', 'Ignorar o erro'),
  ]);

  // ══════════════════════════════════════════════════════
  // 98 — LOJA 18: TESTES E APRESENTAÇÃO
  // ══════════════════════════════════════════════════════
  ENT['ETAPA 2: proteger a leitura dos dados com try/catch'] = exemplo(
    `<p>Se um dado do localStorage <strong>estiver quebrado</strong> (por exemplo, um texto que não é JSON), o <code>JSON.parse</code> lança um erro e <strong>a tela inteira para de funcionar</strong>. O <code>try / catch</code> permite <strong>tentar</strong> e, se falhar, <strong>reagir</strong> em vez de quebrar:</p>`,
    `// EXEMPLO: ler um aluno com segurança
function lerAluno(chave) {
  try {
    return JSON.parse(localStorage.getItem(chave));   // tenta
  } catch (erro) {
    console.log("Dado inválido na chave", chave);      // se falhar, avisa e segue
    return null;
  }
}`,
    ['<code>try { ... }</code>: o código que <strong>pode falhar</strong>', '<code>catch (erro) { ... }</code>: só executa <strong>se algo falhar</strong> dentro do try. <code>erro</code> descreve o que houve', 'Aqui, em vez de o programa <strong>parar</strong>, devolvemos <code>null</code> e <strong>seguimos</strong>', 'Quem chamou precisa <strong>checar</strong> o <code>null</code> antes de usar'],
    'No <code>atualizarGrid</code> (e nos laços da loja e do carrinho), envolva o <code>JSON.parse</code> em <code>try/catch</code> e <strong>pule</strong> (<code>continue</code>) a chave quebrada.');
  PRAT[98] = { tarefas: ['<strong>Checkpoint.</strong> Você executou <strong>todos</strong> os testes do roteiro e preencheu a tabela (esperado × obtido) no caderno.', '<strong>Checkpoint.</strong> Com o localStorage <strong>vazio</strong> (Application → Clear), as 3 páginas abrem sem erro.', '<strong>Checkpoint.</strong> Com uma chave <code>p…</code> <strong>quebrada</strong>, as telas ainda funcionam (veja a etapa 2).', '<strong>Checkpoint.</strong> Você consegue <strong>explicar</strong> as funções <code>cadastrar/controle</code>, <code>atualizarGrid</code>, <code>carrinho</code> e <code>listar</code> sem olhar o código.', '<strong>Checkpoint.</strong> Você apresentou o projeto a um colega em <strong>3 minutos</strong> e ele tentou <strong>quebrá-lo</strong>.'],
    desafio: '<strong>Desafio.</strong> Faça a <strong>defesa individual</strong>: o professor escolhe uma função e pede que você <strong>explique</strong>, <strong>altere</strong> (por exemplo, acrescentar um campo ao produto) e <strong>corrija um bug ao vivo</strong>. A rubrica está na aula final de avaliação.' };
  A(98, 'Loja 18: Testes e Apresentação', 'Testar o sistema com roteiro, proteger contra dados quebrados e preparar a apresentação do projeto', '🧪', [
    P('💡', 'ENTENDA: testar não é "clicar para ver se funciona"',
      `<p>Um teste de verdade tem <strong>um plano</strong>: o que eu faço, o que <strong>espero</strong> e o que <strong>realmente aconteceu</strong>. Quem testa só o "caminho feliz" (tudo certo) descobre os bugs <strong>depois</strong> que o usuário já encontrou.</p>`,
      analogia(`o <strong>test drive</strong> de um carro: o vendedor não dirige só em linha reta. Você faz curva, freia forte, sobe ladeira. <strong>Testar é tentar fazer o sistema falhar</strong>, antes que ele falhe para quem usa.`),
      caderno(['Teste = ação + resultado esperado + resultado obtido', 'Teste o caminho feliz E os casos extremos', 'Primeiro acesso = localStorage vazio'])),
    etapa('📋', 'ETAPA 1: o roteiro de testes',
      'Siga o roteiro <strong>na ordem</strong> e preencha, no caderno, uma tabela com as colunas <strong>Teste | Esperado | Obtido</strong>. Onde o obtido for diferente do esperado, <strong>anote o bug</strong> e corrija.',
      ['Cadastro: salvar <strong>com tudo preenchido</strong>', 'Validação: salvar com <strong>cada campo vazio</strong> (um de cada vez) e <strong>tudo vazio</strong>', 'Tabela: o produto aparece com valor em reais; <strong>F5</strong> mantém', 'Alterar: confirmar, mudar o valor, salvar; <strong>Cancelar</strong> no meio', 'Excluir: <strong>Cancelar</strong> na pergunta e depois confirmar', 'Bloquear/Desbloquear', 'Loja: cards iguais aos produtos; <strong>Comprar</strong> cria a chave <code>c…</code>', 'Carrinho: itens, <strong>total</strong> (confira com calculadora), <strong>Remover</strong>', 'Excluir um produto <strong>que está no carrinho</strong>: some dos dois?'],
      `Teste                                  | Esperado                         | Obtido
---------------------------------------|----------------------------------|----------
Salvar com os 3 campos preenchidos     | Aparece na tabela, campos vazios |
Salvar com a descrição vazia           | Bordas vermelhas, nada guardado  |
...`,
      ['A tabela tem <strong>pelo menos 12 linhas</strong>', 'Cada linha tem o resultado <strong>obtido</strong> preenchido <strong>depois</strong> de executar', 'Você anotou <strong>pelo menos um bug</strong> (se não achou, tente de novo com casos mais agressivos)'],
      ['Os <strong>casos extremos</strong> acham mais bugs: valor <code>0</code>, valor negativo, nome só com espaços, nome enorme, nome com <code>&lt;b&gt;</code>, dois produtos iguais.', 'Para o total do carrinho, faça a conta <strong>à mão</strong> antes de olhar o resultado.', 'Cada bug encontrado vira: <strong>sintoma</strong> (o que vi), <strong>causa</strong> (por quê) e <strong>correção</strong> (o que mudei).']),
    etapa('🛟', 'ETAPA 2: proteger a leitura dos dados com try/catch',
      'E se um dado estiver <strong>quebrado</strong>? Simule e proteja.',
      ['No console, <strong>quebre uma chave de propósito</strong>: <code>localStorage.setItem("pquebrado", "isso não é json")</code>', 'Recarregue o <code>gerenciarProdutos.html</code>: a tabela <strong>não aparece</strong> (veja o erro no console)', 'No <code>atualizarGrid</code>, envolva o <code>JSON.parse</code> em <code>try/catch</code>: se falhar, avise no console e <strong>pule</strong> a chave', 'Teste de novo; depois apague a chave quebrada'],
      `try {
  let produtoVet = JSON.parse(localStorage.getItem(chave));
  // ... monta cardDados e desenha a linha ...
} catch (erro) {
  console.log("Dado inválido na chave", ___);
  continue;                                           // pula esta chave
}`,
      ['<strong>Antes</strong> da proteção: <code>Uncaught SyntaxError: "isso não é json" is not valid JSON</code> e a tabela some', '<strong>Depois</strong>: a tabela aparece com os produtos <strong>bons</strong> e o console diz qual chave está quebrada', 'Faça o mesmo na loja e no carrinho'],
      ['O <code>continue</code> dentro do <code>catch</code> funciona porque o <code>try</code> está <strong>dentro do laço</strong>.', 'Todo o trecho que usa <code>produtoVet</code> deve ficar <strong>dentro</strong> do <code>try</code>, senão ele usa uma variável que não foi criada.', 'Mensagem: <code>console.log("Dado inválido na chave", chave);</code>']),
    etapa('🎤', 'ETAPA 3: a apresentação de 3 minutos',
      'Quem consegue <strong>explicar</strong> o próprio código mostra que o entende. Ensaie com um colega.',
      ['<strong>30 s:</strong> o que o sistema faz (mostre rodando: cadastrar, comprar, total)', '<strong>60 s:</strong> o caminho dos dados (clique → <code>controle</code> → localStorage → tela)', '<strong>60 s:</strong> <strong>uma função</strong> explicada linha por linha (escolha <code>atualizarGrid</code> ou <code>listar</code>)', '<strong>30 s:</strong> <strong>um bug</strong> que você encontrou e como resolveu'],
      null,
      ['Seu colega entendeu o caminho dos dados <strong>sem você ler o código</strong>', 'Você explicou a função <strong>sem decorar</strong>: com suas palavras', 'Seu colega <strong>tentou quebrar</strong> o sistema (entradas estranhas) e você explicou o que aconteceu'],
      ['Se travar na explicação, é o ponto que precisa <strong>revisar</strong>: volte à aula daquela função.', 'Comece sempre pelo <strong>"para que serve"</strong> (o objetivo), depois o <strong>"como"</strong> (as linhas).', 'Mostrar <strong>um bug que você teve</strong> é a melhor parte: prova que você investigou.']),
    P('🐞', 'ENCONTRE O ERRO: os bugs que sempre aparecem nos testes',
      code(`// 1) valor "abc"/vazio vira NaN no total do carrinho
//    -> o campo number recusa letras, mas aceita vazio; a validação precisa checar o valor

// 2) produto de nome só com espaços passa na validação
//    -> "   " != "" é verdadeiro; usar trim()

// 3) alterar e depois cadastrar sobrescreve o produto alterado
//    -> o botão não voltou ao modo "cadastro novo"

// 4) produto fantasma: excluído da loja, mas ainda no carrinho
//    -> faltou apagar "c" + id.slice(1)

// 5) a tabela some com um dado quebrado
//    -> faltou o try/catch no JSON.parse`),
      lista(['Em cada caso, descreva <strong>sintoma</strong> e <strong>causa</strong> em uma frase', 'Prove que o <strong>seu</strong> projeto <strong>não tem</strong> cada um deles (com um teste)']),
      box('verde', `<strong>Se travou:</strong> use o roteiro de <strong>depuração</strong> do módulo 6: (1) leia a mensagem; (2) <code>console.log</code> dos valores; (3) F12 → Application para ver o que foi guardado; (4) mude <strong>uma coisa</strong> por vez.`)),
    P('🏁', 'CHECKPOINT e DESAFIO',
      lista(['☐ Roteiro de testes executado e tabela preenchida', '☐ Localstorage vazio e dado quebrado não derrubam as telas', '☐ Você consegue explicar as funções principais com suas palavras', '☐ Você apresentou em 3 minutos e deixou um colega tentar quebrar']),
      box('verde', `<strong>Explique com suas palavras:</strong> por que testar com <strong>dados vazios, repetidos ou quebrados</strong> também faz parte do projeto, e qual foi o <strong>bug mais difícil</strong> do seu sistema.`),
      box('azul', `<strong>Parabéns!</strong> Você construiu, arquivo por arquivo, um sistema com HTML, Bootstrap, CSS e JavaScript. O próximo passo é a <strong>avaliação final</strong> e a publicação no GitHub Pages (módulos 10 e 11).`)),
  ], [
    Q('Um teste bem feito tem:', 'Ação, resultado esperado e resultado obtido', 'Só clicar nos botões', 'Apenas olhar o código', 'Somente casos que funcionam'),
    Q('Por que testar com o localStorage vazio?', 'O primeiro acesso de qualquer usuário é sempre com tudo vazio', 'Para apagar os produtos', 'Porque o Bootstrap exige', 'Para testar o CSS'),
    Q('Uma chave p… quebrada ("isso não é json") faz a tabela sumir. Qual é a causa?', 'O JSON.parse lança um erro que interrompe o laço', 'O Bootstrap não carregou', 'O id está duplicado', 'O localStorage está cheio'),
    Q('Qual é a proteção adequada para o caso acima?', 'try/catch ao redor do JSON.parse, pulando a chave quebrada', 'Apagar o localStorage sempre', 'Usar innerHTML', 'Trocar let por const'),
    Q('O produto de nome "   " (só espaços) passa na validação com != "". O que fazer?', 'Usar trim() antes de comparar', 'Trocar != por ==', 'Apagar a validação', 'Usar Number()'),
    Q('Qual é o melhor caso extremo para testar o total do carrinho?', 'Valores com decimais, como 0.1 e 0.2, conferidos com calculadora', 'Só números inteiros', 'Apenas um produto', 'Nenhum, o total é automático'),
    Q('Na apresentação, o que mostra que você entende o código?', 'Explicar o caminho dos dados e um bug que você resolveu', 'Ler o código sem explicar', 'Mostrar só o visual', 'Dizer que foi um colega que fez'),
    Q('Um produto foi excluído da loja, mas continua no carrinho. Qual é a causa?', 'Faltou apagar a chave "c" + id.slice(1)', 'O Bootstrap está errado', 'O JSON está quebrado', 'O id mudou'),
    Q('Qual é a melhor forma de testar o projeto de um colega?', 'Seguir o roteiro e tentar quebrá-lo com entradas estranhas', 'Só clicar uma vez em cada botão', 'Alterar o código dele', 'Não testar'),
  ]);

  // ══════════════════════════════════════════════════════
  // PRÁTICA GUIADA · MÓDULO 4 (JavaScript fundamental)
  // Em cada etapa: entenda (explicação + exemplo resolvido de OUTRO assunto) → faça → teste → dicas.
  // Onde fazer: F12 → Console, em qualquer página.
  // ══════════════════════════════════════════════════════

  // ── 60: console e variáveis ───────────────────────────
  ENT['PRÁTICA 1: guardar dados em variáveis e mostrar no console'] = exemplo(
    `<p>Uma <strong>variável</strong> é uma caixa com etiqueta: <code>let</code> cria uma caixa que <strong>pode mudar</strong>; <code>const</code> cria uma que <strong>não muda</strong>. <strong>Texto</strong> vai entre aspas; <strong>número</strong>, sem aspas. O <code>console.log(a, b)</code> mostra valores no console, separados por espaço.</p>`,
    `// EXEMPLO: dados de um aluno
let aluno = "Ana";                  // texto: com aspas
let idade = 15;                     // número: sem aspas
const escola = "ETEC";              // const: não vai mudar

console.log(aluno, idade, escola);  // Ana 15 ETEC
console.log(typeof idade);          // "number"
idade = idade + 1;                  // let pode mudar
console.log(idade);                 // 16`,
    ['<code>let aluno = "Ana";</code>: cria a caixa <code>aluno</code> e guarda o <strong>texto</strong> Ana (<code>=</code> aqui significa <em>guarde</em>)', '<code>let idade = 15;</code>: um <strong>número</strong>, sem aspas', '<code>const escola</code>: se você tentar <code>escola = "outra"</code>, dá erro (<em>Assignment to constant variable</em>)', '<code>typeof idade</code> responde o <strong>tipo</strong> do valor: <code>"number"</code>', '<code>idade = idade + 1;</code>: lê o valor atual (15), soma 1 e <strong>guarda de volta</strong> (16)'],
    'Troque aluno/idade/escola por <strong>produto, preço e categoria</strong>. A estrutura é a mesma.');
  ENT['PRÁTICA 2: texto não é número (converter com Number)'] = exemplo(
    `<p>Tudo que vem de um campo de formulário é <strong>texto</strong>, mesmo que pareça número. E o <code>+</code> entre textos <strong>junta</strong> em vez de somar. Para calcular, converta com <code>Number(...)</code>.</p>`,
    `// EXEMPLO: somar duas notas que chegaram como texto
let nota1 = "8";
let nota2 = "6";

console.log(nota1 + nota2);                // "86"  (juntou!)
console.log(Number(nota1) + Number(nota2)); // 14   (somou)
let media = (Number(nota1) + Number(nota2)) / 2;
console.log("Média:", media);              // Média: 7`,
    ['<code>nota1 + nota2</code>: os dois são textos, então o <code>+</code> <strong>concatena</strong>: <code>"8" + "6"</code> = <code>"86"</code>', '<code>Number("8")</code> transforma o texto <code>"8"</code> no número <code>8</code>', 'Com números, o <code>+</code> <strong>soma</strong>', 'Os parênteses em <code>(a + b) / 2</code> fazem a soma acontecer <strong>antes</strong> da divisão'],
    'Em vez de notas, serão <strong>preço e quantidade</strong>, e a conta é <code>preço × quantidade</code> (multiplicação).');
  GUIA[60] = [
    etapa('📦', 'PRÁTICA 1: guardar dados em variáveis e mostrar no console',
      'Guarde os dados de um produto em variáveis e mostre no console.',
      ['Crie <code>produto</code> (texto), <code>preco</code> (número) e <code>categoria</code> (<code>const</code>, texto)', 'Mostre os três com um único <code>console.log</code>', 'Mostre o <code>typeof</code> do preço', 'Aumente o preço em 1 real (<code>preco = preco + 1</code>) e mostre de novo'],
      `let produto = "___";
let preco = ___;
const categoria = "___";

console.log(produto, ___, ___);
console.log(typeof ___);
preco = ___ + 1;
console.log(preco);`,
      ['O console mostra, por exemplo: <code>Caneta 3.5 Papelaria</code>', 'O <code>typeof</code> mostra <code>"number"</code>', 'O último <code>console.log</code> mostra o preço <strong>já aumentado</strong>'],
      ['O texto vai entre aspas; o número <strong>não</strong>. Se colocar aspas no preço, o <code>typeof</code> mostra <code>"string"</code>.', 'Para aumentar: <code>preco = preco + 1;</code> (lê, soma e guarda de volta).', 'Exemplo: <code>let produto = "Caneta"; let preco = 3.5; const categoria = "Papelaria";</code>'],
    ),
    etapa('🔢', 'PRÁTICA 2: texto não é número (converter com Number)',
      'Reproduza o bug mais comum de quem lê campos de formulário e conserte.',
      ['Crie <code>precoTexto = "20"</code> e <code>qtdTexto = "3"</code> (textos)', 'Mostre <code>precoTexto + qtdTexto</code> e veja o resultado <strong>errado</strong>', 'Calcule o <strong>total certo</strong> (preço vezes quantidade), convertendo com <code>Number</code>'],
      `let precoTexto = "20";
let qtdTexto = "3";

console.log(precoTexto + ___);
let total = Number(___) * ___(qtdTexto);
console.log("Total:", ___);`,
      ['A primeira conta mostra <code>"203"</code> (juntou)', 'O total certo é <code>60</code>', 'Troque os valores e confira com a calculadora'],
      ['O <code>+</code> entre textos junta. Já o <code>*</code> converte os textos em número sozinho, mas é um hábito ruim: <strong>converta sempre</strong>.', 'Cada texto precisa do seu <code>Number(...)</code>.', '<code>let total = Number(precoTexto) * Number(qtdTexto);</code>'],
    ),
  ];

  // ── 61: textos, operadores e decisões ─────────────────
  ENT['PRÁTICA 1: montar um texto com crases (template string)'] = exemplo(
    `<p>Juntar textos com <code>+</code> fica confuso. Com <strong>crases</strong> (<code>§ §</code>), você escreve a frase normalmente e coloca as variáveis dentro de <code>€{ }</code>: o JavaScript <strong>troca pelo valor</strong>.</p>`,
    `// EXEMPLO: a ficha de um aluno
let nome = "Ana";
let turma = "1ºA";
let nota = 8.5;

console.log(§Aluna €{nome}, turma €{turma}, nota €{nota}§);
// Aluna Ana, turma 1ºA, nota 8.5

console.log(§Nota dobrada: €{nota * 2}§);   // dá para fazer contas dentro: 17`,
    ['A frase fica entre <strong>crases</strong> (<code>§</code>), e não entre aspas', '<code>€{nome}</code> é substituído pelo valor da variável <code>nome</code>', 'Dentro do <code>€{ }</code> cabe <strong>qualquer expressão</strong>, até uma conta (<code>nota * 2</code>)'],
    'A frase será: <em>Produto Caneta custa R$ 3.5 e restam 20 unidades</em>, com variáveis <code>produto</code>, <code>preco</code> e <code>estoque</code>.');
  ENT['PRÁTICA 2: decidir com if / else if / else'] = exemplo(
    `<p>O <code>if</code> executa um bloco <strong>só se</strong> a condição for verdadeira. Com <code>else if</code> e <code>else</code>, você cria <strong>várias faixas</strong>; <strong>só um</strong> bloco executa (o primeiro cuja condição for verdadeira, de cima para baixo). Para comparar use <code>===</code>, <code>&gt;=</code>, <code>&lt;</code>...; o <code>=</code> sozinho <strong>guarda</strong>, não compara.</p>`,
    `// EXEMPLO: classificar a idade
let idade = 16;

if (idade >= 18) {
  console.log("Adulto");
} else if (idade >= 12) {
  console.log("Adolescente");
} else {
  console.log("Criança");
}
// idade 16 -> "Adolescente"`,
    ['<code>idade &gt;= 18</code> é falso para 16, então <strong>pula</strong> esse bloco', '<code>else if (idade &gt;= 12)</code> é verdadeiro: executa <code>"Adolescente"</code> e <strong>ignora o resto</strong>', 'O <code>else</code> (sem condição) pega <strong>todo o resto</strong>', 'A <strong>ordem</strong> importa: se o <code>&gt;= 12</code> viesse primeiro, quem tem 20 anos cairia nele'],
    'As faixas serão da <strong>nota</strong>: 7 ou mais = Aprovado; 5 ou mais = Recuperação; resto = Reprovado.');
  GUIA[61] = [
    etapa('🔤', 'PRÁTICA 1: montar um texto com crases (template string)',
      'Monte uma frase com variáveis usando crases.',
      ['Crie <code>produto</code>, <code>preco</code> e <code>estoque</code>', 'Escreva, com crases, a frase: <em>Produto Caneta custa R$ 3.5 e restam 20 unidades</em>', 'Acrescente um segundo <code>console.log</code> com o <strong>valor total em estoque</strong> (<code>preco * estoque</code>) <strong>dentro</strong> do <code>€{ }</code>'],
      `let produto = "Caneta";
let preco = 3.5;
let estoque = 20;

console.log(§Produto €{___} custa R$ €{___} e restam €{___} unidades§);
console.log(§Total em estoque: R$ €{___ * ___}§);`,
      ['Primeira linha: <code>Produto Caneta custa R$ 3.5 e restam 20 unidades</code>', 'Segunda linha: <code>Total em estoque: R$ 70</code>', 'Mude as variáveis: a frase muda sozinha'],
      ['As crases ficam na tecla ao lado do P (ABNT), com Shift em alguns teclados. Aspas simples/duplas <strong>não funcionam</strong> com <code>€{ }</code>.', 'Dentro do <code>€{ }</code> vai o <strong>nome da variável</strong>, sem aspas.', '<code>console.log(§Total em estoque: R$ €{preco * estoque}§);</code>'],
    ),
    etapa('🚦', 'PRÁTICA 2: decidir com if / else if / else',
      'Classifique uma nota em três situações.',
      ['Crie <code>nota = 6.5</code>', 'Se a nota for 7 ou mais: mostre "Aprovado"', 'Senão, se for 5 ou mais: "Recuperação"', 'Senão: "Reprovado"', 'Teste com as notas 8, 6.5, 5, 4.9 e 0'],
      `let nota = 6.5;

if (nota ___ 7) {
  console.log("Aprovado");
} else if (nota ___ 5) {
  console.log("___");
} else {
  console.log("___");
}`,
      ['8 → Aprovado · 6.5 → Recuperação · 5 → Recuperação', '4.9 → Reprovado · 0 → Reprovado', 'Você consegue explicar por que <strong>a ordem</strong> dos testes importa'],
      ['"7 ou mais" é <code>&gt;= 7</code> (maior <strong>ou igual</strong>). Com <code>&gt; 7</code>, a nota 7 cairia em Recuperação.', 'Cada bloco mostra uma palavra: Aprovado, Recuperação e Reprovado.', '<code>if (nota &gt;= 7) { ... } else if (nota &gt;= 5) { ... } else { ... }</code>'],
    ),
  ];

  // ── 83: laços ─────────────────────────────────────────
  ENT['PRÁTICA 1: repetir com for e somar com um acumulador'] = exemplo(
    `<p>O <code>for</code> repete um bloco um número <strong>conhecido</strong> de vezes. Ele tem 3 partes: <code>for (início; condição; passo)</code>. Para <strong>somar</strong> o que vem a cada volta, use um <strong>acumulador</strong>: uma variável que começa em <strong>zero ANTES do laço</strong> e vai recebendo valores.</p>`,
    `// EXEMPLO: somar os números de 1 a 5
let soma = 0;                       // acumulador, ANTES do laço

for (let i = 1; i <= 5; i++) {      // i começa em 1, repete enquanto i <= 5, e soma 1 a cada volta
  soma = soma + i;
  console.log("volta", i, "soma", soma);
}

console.log("Resultado:", soma);    // 15`,
    ['<code>let i = 1</code>: onde começa. <code>i &lt;= 5</code>: <strong>enquanto</strong> for verdadeiro, repete. <code>i++</code>: ao fim de cada volta, soma 1 em <code>i</code>', '<code>soma = soma + i</code>: pega o que já tinha, soma <code>i</code> e guarda de volta', 'Volta 1: soma = 0+1 = 1. Volta 2: 1+2 = 3. Volta 3: 3+3 = 6... até 15', 'Se o <code>let soma = 0</code> ficasse <strong>dentro</strong> do laço, voltaria a zero a cada volta'],
    'Você vai fazer o mesmo, mas com os números de 1 a 10 e depois com os preços de uma lista.');
  ENT['PRÁTICA 2: repetir enquanto uma condição for verdadeira (while)'] = exemplo(
    `<p>O <code>while</code> repete <strong>enquanto</strong> a condição for verdadeira, sem saber quantas voltas. <strong>Perigo:</strong> dentro dele, algo precisa <strong>mudar a condição</strong>, senão o laço <strong>nunca termina</strong> e a página trava.</p>`,
    `// EXEMPLO: contagem regressiva de tentativas
let tentativas = 3;

while (tentativas > 0) {
  console.log("Restam", tentativas, "tentativas");
  tentativas = tentativas - 1;      // IMPORTANTE: muda a condição
}

console.log("Fim!");`,
    ['<code>while (tentativas &gt; 0)</code>: repete enquanto ainda houver tentativas', 'O bloco mostra o valor e <strong>diminui 1</strong>', 'Quando <code>tentativas</code> vira 0, a condição fica falsa e o laço <strong>termina</strong>', 'Sem a linha <code>tentativas = tentativas - 1</code>, seria um <strong>laço infinito</strong>'],
    'Será uma contagem regressiva a partir de 5.');
  GUIA[83] = [
    etapa('🔁', 'PRÁTICA 1: repetir com for e somar com um acumulador',
      'Mostre os números de 1 a 10 e some todos.',
      ['Crie o acumulador <code>soma = 0</code> <strong>antes</strong> do laço', 'Faça um <code>for</code> de 1 a 10 (<code>i &lt;= 10</code>)', 'Dentro, some <code>i</code> à <code>soma</code> e mostre a volta', 'Depois do laço, mostre a soma final'],
      `let soma = ___;

for (let i = 1; i ___ 10; i++) {
  soma = soma + ___;
  console.log("volta", i, "soma", soma);
}

console.log("Resultado:", ___);`,
      ['Aparecem 10 linhas (uma por volta)', 'O resultado final é <code>55</code>', 'Faça a <strong>tabela das voltas no caderno</strong> antes e confira'],
      ['A condição "de 1 a 10 <strong>inclusive</strong>" é <code>i &lt;= 10</code>. Com <code>i &lt; 10</code> pararia no 9.', 'O acumulador <strong>fora</strong> do laço. Se ficar dentro, o resultado é sempre o último número.', '<code>soma = soma + i;</code> e, no fim, <code>console.log("Resultado:", soma);</code>'],
    ),
    etapa('⏳', 'PRÁTICA 2: repetir enquanto uma condição for verdadeira (while)',
      'Faça uma contagem regressiva com while.',
      ['Crie <code>contador = 5</code>', 'Enquanto <code>contador &gt; 0</code>: mostre o valor e diminua 1', 'Depois do laço, mostre "Decolar!"'],
      `let contador = ___;

while (contador ___ 0) {
  console.log(contador);
  contador = contador ___ 1;
}

console.log("Decolar!");`,
      ['Aparece 5, 4, 3, 2, 1 e depois "Decolar!"', 'Se travar a página, esqueceu de <strong>diminuir</strong> o contador', 'Mude o início para 3 e confira'],
      ['A condição "enquanto for maior que zero" é <code>contador &gt; 0</code>.', 'Diminuir é <code>contador = contador - 1;</code>. Sem isso, o laço é infinito (feche a aba se travar).', '<code>while (contador &gt; 0) { console.log(contador); contador = contador - 1; }</code>'],
    ),
  ];

  // ── 62: arrays e objetos ──────────────────────────────
  ENT['PRÁTICA 1: array, a fileira de caixas numeradas'] = exemplo(
    `<p>Um <strong>array</strong> guarda vários valores em <strong>posições numeradas a partir do 0</strong>. Pense em uma fileira de caixas: a primeira é a número <strong>0</strong>. <code>lista[2]</code> lê a posição 2; <code>lista.length</code> diz quantos itens há; <code>lista.push(x)</code> acrescenta no fim.</p>`,
    `// EXEMPLO: uma fila de frutas
let frutas = ["Maçã", "Uva", "Pera"];

console.log(frutas[0]);                 // Maçã   (a primeira é a posição 0)
console.log(frutas[2]);                 // Pera
console.log(frutas.length);             // 3
frutas.push("Manga");                   // acrescenta no fim
console.log(frutas[frutas.length - 1]); // Manga  (o último)`,
    ['Os itens ficam entre <code>[ ]</code>, separados por vírgula', 'A contagem das posições <strong>começa em 0</strong>: Maçã=0, Uva=1, Pera=2', '<code>frutas.length</code> é <strong>3</strong>; a última posição é <code>length - 1</code> (=2)', '<code>push</code> acrescenta no <strong>final</strong>, e o novo item ganha a próxima posição'],
    'Em vez de frutas, serão <strong>5 produtos</strong> da loja.');
  ENT['PRÁTICA 2: objeto (a ficha) e array de objetos com for'] = exemplo(
    `<p>Um <strong>objeto</strong> é uma <strong>ficha</strong>: cada informação tem um <strong>nome</strong> (<code>nome: valor</code>). Lê-se com ponto: <code>aluno.nome</code>. Um <strong>array de objetos</strong> é uma pilha de fichas, e o <code>for</code> passa por <strong>cada ficha</strong>.</p>`,
    `// EXEMPLO: a turma como array de fichas
let turma = [
  { nome: "Ana",   nota: 8 },
  { nome: "Beto",  nota: 6 },
  { nome: "Carla", nota: 9 }
];

console.log(turma[1].nome);           // Beto
turma[1].nota = 7;                    // muda um campo da ficha

let total = 0;
for (let i = 0; i < turma.length; i++) {
  console.log(turma[i].nome, turma[i].nota);
  total = total + turma[i].nota;
}
console.log("Média:", total / turma.length);`,
    ['<code>{ nome: "Ana", nota: 8 }</code>: <strong>uma ficha</strong> com dois campos', '<code>turma[1].nome</code>: "da posição 1, o campo nome"', '<code>for (let i = 0; i &lt; turma.length; i++)</code>: passa pelas posições <strong>0, 1, 2</strong> (use <code>&lt;</code>, nunca <code>&lt;=</code>)', 'Dentro do laço, <code>turma[i]</code> é <strong>a ficha da volta atual</strong>'],
    'Cada ficha será um <strong>produto</strong> com <code>nome</code> e <code>preco</code>, e você vai calcular o <strong>total</strong> e o <strong>produto mais caro</strong>.');
  GUIA[62] = [
    etapa('🗃️', 'PRÁTICA 1: array, a fileira de caixas numeradas',
      'Crie uma lista de produtos e treine posições.',
      ['Crie o array <code>produtos</code> com 5 nomes', 'Mostre o <strong>primeiro</strong>, o <strong>último</strong> (sem contar de cabeça: use <code>length</code>) e a <strong>quantidade</strong>', 'Acrescente um sexto com <code>push</code> e mostre a nova quantidade'],
      `let produtos = ["___", "___", "___", "___", "___"];

console.log(produtos[___]);                     // o primeiro
console.log(produtos[produtos.___ - 1]);        // o último
console.log(produtos.length);
produtos.___("Régua");
console.log(produtos.length);`,
      ['Primeiro e último são os que você escreveu nas pontas', 'A quantidade é <code>5</code> e depois <code>6</code>', 'Se aparecer <code>undefined</code>, você usou uma posição que não existe'],
      ['A <strong>primeira</strong> posição é <code>0</code>.', 'O último é <code>produtos[produtos.length - 1]</code> (length é 5, última posição é 4).', '<code>produtos.push("Régua");</code>'],
    ),
    etapa('🧾', 'PRÁTICA 2: objeto (a ficha) e array de objetos com for',
      'Monte fichas de produtos e percorra com um laço.',
      ['Crie um array com <strong>3 objetos</strong> <code>{ nome, preco }</code>', 'Use um <code>for</code> para mostrar <code>nome - R$ preco</code> de cada um', 'Some os preços em um <strong>acumulador</strong> e mostre o total', 'Descubra o <strong>mais caro</strong> (guarde o maior visto até agora)'],
      `let produtos = [
  { nome: "Caneta",  preco: 3.5 },
  { nome: "___",     preco: ___ },
  { nome: "___",     preco: ___ }
];

let total = 0;
let maisCaro = produtos[0];

for (let i = 0; i < produtos.___; i++) {
  console.log(produtos[i].nome, "-", produtos[i].___);
  total = total + produtos[i].preco;
  if (produtos[i].preco > maisCaro.___) {
    maisCaro = produtos[___];
  }
}
console.log("Total:", total, "Mais caro:", maisCaro.nome);`,
      ['Aparecem 3 linhas e, no fim, o total e o nome do mais caro', 'Confira o total com uma calculadora', 'Troque os preços e veja o mais caro mudar'],
      ['O laço vai de <code>0</code> até <code>produtos.length - 1</code>: use <code>i &lt; produtos.length</code>.', 'O mais caro: comece com o <strong>primeiro</strong> e troque sempre que achar um com preço <strong>maior</strong>.', '<code>if (produtos[i].preco &gt; maisCaro.preco) { maisCaro = produtos[i]; }</code>'],
    ),
  ];

  // ── 84: map, filter, find, reduce ─────────────────────
  ENT['PRÁTICA 1: map (transformar) e filter (filtrar)'] = exemplo(
    `<p><code>map</code> e <code>filter</code> recebem uma <strong>função</strong> que é chamada <strong>uma vez para cada item</strong>. O <code>map</code> devolve um <strong>array novo com os resultados</strong> (mesmo tamanho). O <code>filter</code> devolve um array novo <strong>só com os itens em que a função devolveu <code>true</code></strong>. Nenhum altera o array original.</p>`,
    `// EXEMPLO: notas de uma turma
let notas = [4, 8, 6, 9];

let dobradas = notas.map((n) => n * 2);          // [8, 16, 12, 18]
let aprovadas = notas.filter((n) => n >= 6);     // [8, 6, 9]

console.log(dobradas);
console.log(aprovadas);
console.log(notas);                              // [4, 8, 6, 9]  (continua igual)`,
    ['<code>(n) =&gt; n * 2</code> é uma <strong>função de seta</strong>: "dado n, devolva n vezes 2"', '<code>map</code> chama a função para <strong>cada nota</strong> e junta os resultados em um array novo', '<code>filter</code> chama a função para cada nota e <strong>fica só com as que deram true</strong> (<code>n &gt;= 6</code>)', 'O array <code>notas</code> <strong>não muda</strong>: os métodos devolvem arrays novos, e você precisa <strong>guardá-los</strong> em variáveis'],
    'A lista terá objetos <code>{ nome, preco }</code>. O <code>map</code> vai tirar só os <strong>nomes</strong>, e o <code>filter</code> vai ficar só com os <strong>baratos</strong>.');
  ENT['PRÁTICA 2: reduce (juntar tudo em um valor)'] = exemplo(
    `<p>O <code>reduce</code> percorre a lista <strong>acumulando</strong> um resultado. Ele recebe uma função com <strong>dois parâmetros</strong>: o <strong>acumulador</strong> (o que já foi acumulado) e o <strong>item atual</strong>; e um <strong>valor inicial</strong>. A função devolve o <strong>novo acumulado</strong>.</p>`,
    `// EXEMPLO: somar notas
let notas = [4, 8, 6, 9];

let soma = notas.reduce((acumulado, n) => acumulado + n, 0);
//                       ^ começa em 0 (valor inicial, o último argumento)

console.log(soma);                  // 27
console.log(soma / notas.length);   // 6.75  (média)`,
    ['O <code>0</code> no fim é o <strong>valor inicial</strong> do acumulador', 'Volta 1: acumulado=0, n=4 → devolve 4', 'Volta 2: acumulado=4, n=8 → devolve 12', 'Volta 3: 12+6 = 18. Volta 4: 18+9 = <strong>27</strong>. O <code>reduce</code> devolve o último acumulado'],
    'O acumulado será a soma de <code>preco</code> dos produtos: <code>acumulado + p.preco</code>.');
  GUIA[84] = [
    etapa('🔄', 'PRÁTICA 1: map (transformar) e filter (filtrar)',
      'Tire os nomes e filtre os produtos baratos.',
      ['Use a lista de 4 produtos do esqueleto', 'Com <code>map</code>, crie um array só com os <strong>nomes</strong>', 'Com <code>filter</code>, crie um array só com os de preço <strong>menor que 5</strong>', 'Mostre os dois e o array original'],
      `let produtos = [
  { nome: "Caneta",  preco: 3.5 },
  { nome: "Caderno", preco: 18 },
  { nome: "Lápis",   preco: 1.5 },
  { nome: "Mochila", preco: 120 }
];

let nomes   = produtos.___((p) => p.___);
let baratos = produtos.___((p) => p.preco ___ 5);

console.log(nomes);
console.log(baratos);
console.log(produtos);`,
      ['<code>nomes</code> → <code>["Caneta","Caderno","Lápis","Mochila"]</code>', '<code>baratos</code> → dois objetos (Caneta e Lápis)', '<code>produtos</code> continua com os 4 itens'],
      ['Transformar cada item em outra coisa é <code>map</code>; ficar com alguns é <code>filter</code>.', 'A função de seta devolve o campo: <code>(p) =&gt; p.nome</code>.', '<code>produtos.map((p) =&gt; p.nome)</code> e <code>produtos.filter((p) =&gt; p.preco &lt; 5)</code>'],
    ),
    etapa('➕', 'PRÁTICA 2: reduce (juntar tudo em um valor)',
      'Calcule o total dos preços e o total só dos baratos.',
      ['Com <code>reduce</code>, some o campo <code>preco</code> de todos', 'Depois <strong>encadeie</strong>: <code>filter</code> primeiro (só os baratos) e <code>reduce</code> em seguida', 'Confira com a calculadora'],
      `let total = produtos.reduce((acumulado, p) => acumulado + p.___, ___);
let totalBaratos = produtos
  .filter((p) => p.preco < 5)
  .___((acumulado, p) => acumulado + p.preco, 0);

console.log(total, totalBaratos);`,
      ['<code>total</code> → <code>143</code> e <code>totalBaratos</code> → <code>5</code>', 'Sem o valor inicial <code>0</code>, o resultado vira texto estranho', 'Mude o limite de <code>5</code> para <code>20</code> e preveja o novo total antes de rodar'],
      ['O valor inicial é o <strong>último argumento</strong> do reduce: <code>0</code>.', 'Encadear é colocar um método depois do outro: o <code>filter</code> devolve um array, e o <code>reduce</code> trabalha nele.', '<code>produtos.reduce((acumulado, p) =&gt; acumulado + p.preco, 0)</code>'],
    ),
  ];

  // ── 63: funções ───────────────────────────────────────
  ENT['PRÁTICA 1: função com parâmetros e return'] = exemplo(
    `<p>Siga a <strong>receita da aula "Como escrever uma função"</strong>: 1) nome com verbo; 2) o que recebe; 3) o que devolve; 4) comentários com o plano; 5) código; 6) teste. Os <strong>parâmetros</strong> são os ingredientes; o <code>return</code> entrega o resultado.</p>`,
    `// EXEMPLO: a área de um retângulo
// 1. nome: calcularArea   2. recebe: largura e altura   3. devolve: o produto dos dois
function calcularArea(largura, altura) {
  // 4. plano: multiplicar e devolver
  let area = largura * altura;
  return area;
}

// 6. teste
console.log(calcularArea(3, 4));    // 12
console.log(calcularArea(10, 2));   // 20`,
    ['<code>calcularArea(largura, altura)</code>: dois <strong>parâmetros</strong> (espaços para os valores que virão)', 'Ao chamar <code>calcularArea(3, 4)</code>, o <code>3</code> vai para <code>largura</code> e o <code>4</code> para <code>altura</code> (<strong>na ordem</strong>)', '<code>return area</code> <strong>entrega</strong> o resultado: sem ele, o resultado seria <code>undefined</code>', 'Quem chamou pode <strong>guardar</strong> o resultado: <code>let a = calcularArea(3, 4);</code>'],
    'Será <code>calcularTotal(preco, quantidade)</code>: recebe os dois e <strong>devolve o produto</strong>.');
  ENT['PRÁTICA 2: uma função que usa outra'] = exemplo(
    `<p>Funções podem <strong>chamar outras funções</strong>. Isso é como montar uma receita com sub-receitas: cada uma faz <strong>uma coisa só</strong>, e a maior <strong>combina</strong> as menores. Assim cada parte é fácil de testar sozinha.</p>`,
    `// EXEMPLO: preço com desconto
function calcularDesconto(preco, percentual) {
  return preco * percentual / 100;
}

function precoFinal(preco, percentual) {
  let desconto = calcularDesconto(preco, percentual);   // usa a outra função
  return preco - desconto;
}

console.log(precoFinal(200, 10));   // 180`,
    ['<code>calcularDesconto</code> faz <strong>uma</strong> conta: quanto vale o desconto', '<code>precoFinal</code> <strong>chama</strong> <code>calcularDesconto</code> e usa o que ela devolveu', 'Testando <code>calcularDesconto(200, 10)</code> sozinha (=20), fica fácil achar um erro em cada parte', 'Cada função tem <strong>um nome que explica</strong> o que faz'],
    'Você vai criar <code>ehPar(n)</code> (devolve true/false) e <code>classificar(n)</code>, que <strong>usa</strong> a <code>ehPar</code> para devolver "par" ou "ímpar".');
  GUIA[63] = [
    etapa('🧩', 'PRÁTICA 1: função com parâmetros e return',
      'Escreva a função do total de uma compra, seguindo a receita.',
      ['Escreva, <strong>primeiro</strong>, os comentários do plano', 'Crie <code>calcularTotal(preco, quantidade)</code>', 'Devolva o produto dos dois', 'Teste com 3 pares de números'],
      `function calcularTotal(___, ___) {
  // plano: multiplicar e devolver
  let total = ___ * ___;
  return ___;
}

console.log(calcularTotal(3.5, 4));`,
      ['<code>calcularTotal(3.5, 4)</code> → <code>14</code>', '<code>calcularTotal(10, 3)</code> → <code>30</code>', 'Guarde o resultado em uma variável e mostre: <code>let t = calcularTotal(2, 5); console.log(t);</code>'],
      ['Os parâmetros são os dois valores que a função precisa: preço e quantidade.', 'Sem <code>return</code>, o console mostra <code>undefined</code>.', '<code>function calcularTotal(preco, quantidade) { let total = preco * quantidade; return total; }</code>'],
    ),
    etapa('🔗', 'PRÁTICA 2: uma função que usa outra',
      'Crie duas funções pequenas e combine.',
      ['Crie <code>ehPar(n)</code>: devolve <code>true</code> se <code>n</code> for par (dica: o resto da divisão por 2 é zero: <code>n % 2 === 0</code>)', 'Crie <code>classificar(n)</code>: <strong>usa</strong> <code>ehPar</code> e devolve <code>"par"</code> ou <code>"ímpar"</code>', 'Teste cada uma <strong>sozinha</strong> e depois a combinação'],
      `function ehPar(n) {
  return n % 2 === ___;
}

function classificar(n) {
  if (___(n)) {
    return "par";
  } else {
    return "___";
  }
}

console.log(ehPar(4), ehPar(7));
console.log(classificar(4), classificar(7));`,
      ['<code>ehPar(4)</code> → <code>true</code> e <code>ehPar(7)</code> → <code>false</code>', '<code>classificar(4)</code> → <code>"par"</code> e <code>classificar(7)</code> → <code>"ímpar"</code>', 'Teste também com 0 e com um número negativo'],
      ['<code>n % 2</code> é o resto da divisão por 2: <code>0</code> para pares, <code>1</code> para ímpares.', 'Uma comparação já é um valor (<code>true</code>/<code>false</code>): pode devolvê-la direto com <code>return</code>.', '<code>function ehPar(n) { return n % 2 === 0; }</code>'],
    ),
  ];

  // ── 85: escopo ────────────────────────────────────────
  ENT['PRÁTICA 1: achar e corrigir um erro de escopo'] = exemplo(
    `<p><strong>Escopo</strong> é a região do código em que uma variável <strong>existe</strong>. Uma variável criada <strong>dentro</strong> de uma função só existe lá dentro. Se você tentar usá-la <strong>fora</strong>, o JavaScript diz <code>ReferenceError: x is not defined</code>. Para levar um valor para fora, a função deve <strong>devolvê-lo</strong> (<code>return</code>).</p>`,
    `// EXEMPLO COM ERRO
function somar(a, b) {
  let resultado = a + b;        // "resultado" só existe aqui dentro
}
somar(2, 3);
console.log(resultado);          // ReferenceError: resultado is not defined

// CORRIGIDO
function somar2(a, b) {
  let resultado = a + b;
  return resultado;              // devolve para fora
}
let r = somar2(2, 3);            // guarda o valor que a função devolveu
console.log(r);                  // 5`,
    ['A variável <code>resultado</code> nasce e <strong>morre</strong> dentro da função', 'Fora dela, o nome não existe: <code>ReferenceError</code>', 'A correção <strong>não</strong> é declarar fora: é <strong>devolver</strong> com <code>return</code> e <strong>guardar</strong> no lugar que chamou', 'Dentro do bloco <code>{ }</code> de um <code>if</code> ou <code>for</code>, <code>let</code> também só vale <strong>no bloco</strong>'],
    'Você vai reproduzir o erro com o <code>total</code> de um laço e corrigir.');
  GUIA[85] = [
    etapa('🧭', 'PRÁTICA 1: achar e corrigir um erro de escopo',
      'Reproduza o erro e conserte sem tirar a variável da função.',
      ['Escreva a função <code>somarPrecos(lista)</code> que soma os preços, mas <strong>sem</strong> o <code>return</code> (erro proposital)', 'Chame e mostre o resultado: veja o <code>undefined</code>', 'Tente mostrar <code>total</code> <strong>fora</strong> da função: veja o <code>ReferenceError</code>', 'Corrija com <code>return</code> e guarde o resultado em uma variável'],
      `function somarPrecos(lista) {
  let total = 0;
  for (let i = 0; i < lista.length; i++) {
    total = total + lista[i];
  }
  // TODO: devolva o total aqui
}

let resultado = somarPrecos([10, 20, 30]);
console.log(resultado);          // undefined (erro!)
console.log(total);              // ReferenceError`,
      ['Antes da correção: <code>undefined</code> e depois <code>ReferenceError: total is not defined</code>', 'Depois de colocar o <code>return</code>: <code>resultado</code> vale <code>60</code>', 'Você sabe explicar <strong>por que</strong> o <code>console.log(total)</code> continuará dando erro (e por que isso é <strong>normal</strong>)'],
      ['A função calcula, mas <strong>não entrega</strong>. Falta uma palavra no fim da função.', 'O <code>total</code> continuará não existindo fora: o certo é usar <code>resultado</code>, que recebe o valor devolvido.', 'No fim da função: <code>return total;</code>'],
    ),
  ];

  // ══════════════════════════════════════════════════════
  // PRÁTICA GUIADA · MÓDULO 5 (DOM e eventos)
  // Use sempre a mesma página de treino (criada na aula "DOM 1") e teste no Console dela.
  // ══════════════════════════════════════════════════════

  // ── 65: DOM 1 ─────────────────────────────────────────
  ENT['PRÁTICA 0: criar a página de treino'] = exemplo(
    `<p>Para treinar o DOM, você precisa de uma página com elementos para mexer. Vamos criar <strong>uma só vez</strong> a <code>treino.html</code>, e usá-la em <strong>todas</strong> as práticas do módulo. Cada elemento tem um <code>id</code>: é por ele que o JavaScript vai achá-lo.</p>`,
    `<!-- treino.html: abra no navegador e use o Console (F12) -->
<h1 id="titulo">Minha loja</h1>
<input type="text" id="nome" placeholder="Nome do produto">
<input type="number" id="preco" placeholder="Preço">
<button id="btn" type="button">Clique</button>
<p id="mensagem"></p>
<ul id="lista">
  <li>Caneta</li>
  <li>Caderno</li>
  <li>Lápis</li>
</ul>`,
    ['<code>h1</code>, <code>input</code> (texto e número), <code>button</code>, <code>p</code> e <code>ul</code> com 3 <code>li</code>: as peças que vamos manipular', 'Cada peça importante tem um <code>id</code>: <code>titulo</code>, <code>nome</code>, <code>preco</code>, <code>btn</code>, <code>mensagem</code>, <code>lista</code>', 'Não precisa de CSS nem de script por enquanto: usaremos o <strong>Console</strong>'],
    'Nada muda: esta é a página que as próximas práticas usam.');
  ENT['PRÁTICA 1: achar elementos e ler o que foi digitado'] = exemplo(
    `<p>Antes de mexer em um elemento, o JavaScript precisa <strong>achá-lo</strong>. <code>document.querySelector("#id")</code> procura pelo <strong>seletor de CSS</strong> (o <code>#</code> significa "id") e devolve <strong>o elemento</strong> (ou <code>null</code> se não achar). Para o texto digitado em um campo: <code>.value</code> (sempre <strong>texto</strong>).</p>`,
    `// EXEMPLO: uma página com <input id="aluno"> e <h2 id="turma">1ºA</h2>
let campo = document.querySelector("#aluno");     // acha o campo
let titulo = document.querySelector("#turma");    // acha o título

console.log(campo.value);          // o que foi digitado (texto)
console.log(titulo.textContent);   // o texto do título: "1ºA"
console.log(typeof campo.value);   // "string"

document.querySelector("#naoExiste");   // null (não achou)`,
    ['<code>querySelector("#aluno")</code> devolve <strong>o elemento inteiro</strong>, não só o texto', '<code>campo.value</code> é o texto digitado agora (muda quando o usuário digita)', '<code>titulo.textContent</code> é o texto <strong>dentro</strong> de um elemento comum', 'Id errado → <code>null</code> → depois <code>Cannot read properties of null</code>: o erro mais comum do DOM'],
    'Os ids serão <code>#nome</code> e <code>#preco</code> e o título é <code>#titulo</code> da página de treino.');
  GUIA[65] = [
    etapa('🧪', 'PRÁTICA 0: criar a página de treino',
      'Crie o arquivo que você usará nas próximas práticas.',
      ['Crie <code>treino.html</code> com o esqueleto do HTML (<code>!</code> + Tab)', 'Dentro do <code>body</code>, digite o conteúdo do exemplo (com os mesmos ids)', 'Abra no navegador e abra o Console (F12)'],
      `<h1 id="___">Minha loja</h1>
<input type="text" id="___" placeholder="Nome do produto">
<input type="number" id="___" placeholder="Preço">
<button id="btn" type="button">Clique</button>
<p id="mensagem"></p>
<ul id="lista">
  <li>Caneta</li>
  <li>Caderno</li>
  <li>Lápis</li>
</ul>`,
      ['A página mostra título, dois campos, botão e uma lista de 3 itens', 'No console: <code>document.querySelector("#titulo")</code> devolve o elemento (e não <code>null</code>)', 'O mesmo para <code>#nome</code> e <code>#preco</code>'],
      ['Os ids são: <code>titulo</code>, <code>nome</code> e <code>preco</code> (nessa ordem no esqueleto).', 'Se o console devolver <code>null</code>, o id está diferente (confira letra por letra).', '<code>&lt;h1 id="titulo"&gt;</code> · <code>&lt;input type="text" id="nome"&gt;</code> · <code>&lt;input type="number" id="preco"&gt;</code>'],
    ),
    etapa('🔎', 'PRÁTICA 1: achar elementos e ler o que foi digitado',
      'Leia os campos da página de treino.',
      ['Digite <code>Caneta</code> e <code>3.5</code> nos campos', 'No console, guarde cada campo em uma variável (<code>querySelector</code>)', 'Mostre o <code>.value</code> de cada um e o <code>typeof</code> do preço', 'Converta o preço para número e some 1'],
      `let campoNome = document.querySelector("#___");
let campoPreco = document.querySelector("#___");

console.log(campoNome.___);
console.log(campoPreco.value, typeof campoPreco.value);
console.log(Number(campoPreco.___) + 1);`,
      ['Aparece <code>Caneta</code> e <code>3.5 "string"</code>', 'A conta mostra <code>4.5</code> (e <strong>não</strong> <code>"3.51"</code>)', 'Mude o texto digitado e rode de novo: o <code>.value</code> acompanha'],
      ['Os ids são <code>nome</code> e <code>preco</code>. O <code>#</code> vai <strong>dentro das aspas</strong>.', '<code>.value</code> é a propriedade que devolve o que foi digitado.', '<code>Number(campoPreco.value) + 1</code>'],
    ),
    etapa('📚', 'PRÁTICA 2: vários elementos de uma vez (querySelectorAll)',
      'Descubra quantos itens há na lista e leia cada um.',
      ['Use <code>querySelectorAll("#lista li")</code> (todos os <code>li</code> dentro de <code>#lista</code>)', 'Mostre <strong>quantos</strong> são (<code>length</code>)', 'Mostre o <strong>texto</strong> do segundo (posição 1) e do último'],
      `let itens = document.querySelectorAll("#lista ___");

console.log(itens.___);
console.log(itens[1].textContent);
console.log(itens[itens.length - 1].___);`,
      ['<code>3</code>, depois <code>Caderno</code> e <code>Lápis</code>', 'Compare com <code>querySelector("#lista li")</code>: devolve <strong>só o primeiro</strong>', 'Funciona como um array: posição começa em <strong>0</strong>'],
      ['<code>querySelectorAll</code> devolve <strong>todos</strong> que combinam; <code>querySelector</code> devolve só o primeiro.', 'O seletor <code>"#lista li"</code> significa "os li que estão dentro de #lista".', '<code>itens.length</code> e <code>itens[itens.length - 1].textContent</code>'],
    ),
  ];

  // ── 66: DOM 2 ─────────────────────────────────────────
  ENT['PRÁTICA 1: mudar o texto e ligar/desligar uma classe'] = exemplo(
    `<p>Depois de achar um elemento, você pode <strong>mudar</strong> o que ele mostra: <code>textContent</code> troca o <strong>texto</strong>; <code>classList.add("x")</code> <strong>liga</strong> uma classe CSS; <code>classList.remove("x")</code> desliga; <code>classList.toggle("x")</code> alterna. O jeito certo de mudar a aparência é <strong>ligar uma classe que já existe no CSS</strong>.</p>`,
    `// EXEMPLO: um aviso na página (<p id="aviso">)
let aviso = document.querySelector("#aviso");

aviso.textContent = "Cadastro salvo!";      // troca o texto
aviso.classList.add("sucesso");              // liga a classe .sucesso (definida no CSS)

aviso.classList.toggle("sucesso");           // desliga (estava ligada)
aviso.classList.toggle("sucesso");           // liga de novo`,
    ['<code>textContent = "..."</code> substitui o texto <strong>como texto puro</strong> (seguro)', '<code>classList.add</code> só funciona se a classe <strong>existir no CSS</strong> (o JS só liga/desliga o nome)', '<code>toggle</code> faz o <strong>contrário</strong> do estado atual: liga se estava desligada, desliga se estava ligada'],
    'O elemento será o <code>#mensagem</code> da página de treino, e a classe será <code>destaque</code>, que você vai criar no CSS.');
  ENT['PRÁTICA 2: criar elementos e colocá-los na página'] = exemplo(
    `<p>Para <strong>criar</strong> um elemento: <code>document.createElement("li")</code> (nasce solto, invisível). Você coloca o texto com <code>.textContent</code> e o <strong>pendura</strong> em outro com <code>pai.appendChild(filho)</code>: só então ele aparece.</p>`,
    `// EXEMPLO: acrescentar uma fruta a uma lista (<ul id="frutas">)
let lista = document.querySelector("#frutas");

let li = document.createElement("li");   // 1. cria o <li> (ainda solto)
li.textContent = "Manga";                 // 2. coloca o texto
lista.appendChild(li);                    // 3. pendura na lista: agora aparece`,
    ['O <code>li</code> criado <strong>não aparece</strong> até ser pendurado com <code>appendChild</code>', '<code>appendChild</code> coloca o novo elemento <strong>no fim</strong> da lista', 'Com <code>textContent</code> o texto fica <strong>seguro</strong> (nenhuma tag é interpretada)'],
    'A lista será o <code>#lista</code> do treino, e o texto virá do que o usuário digitou em <code>#nome</code>.');
  GUIA[66] = [
    etapa('✏️', 'PRÁTICA 1: mudar o texto e ligar/desligar uma classe',
      'Troque o título e destaque a mensagem.',
      ['No <code>treino.html</code>, crie um <code>&lt;style&gt;</code> com <code>.destaque { background: yellow; font-weight: bold; }</code>', 'No console, troque o texto do <code>#titulo</code> para "Loja do Beto"', 'Escreva "Olá!" no <code>#mensagem</code> e <strong>ligue</strong> a classe <code>destaque</code>', 'Use <code>toggle</code> duas vezes e observe'],
      `let titulo = document.querySelector("#titulo");
let mensagem = document.querySelector("#mensagem");

titulo.___ = "Loja do Beto";
mensagem.textContent = "Olá!";
mensagem.classList.___("destaque");
mensagem.classList.___("destaque");   // desliga
mensagem.classList.___("destaque");   // liga`,
      ['O título muda <strong>na hora</strong>, sem recarregar', 'A mensagem aparece com fundo amarelo; depois do 1º toggle, sem; depois do 2º, com', 'Sem o CSS da classe, o <code>classList.add</code> funciona, mas <strong>nada muda visualmente</strong>'],
      ['A propriedade do texto é <code>textContent</code>. A que liga uma classe é <code>classList.add</code>.', 'O <code>toggle</code> inverte o estado atual: não precisa saber se está ligada.', '<code>mensagem.classList.add("destaque");</code> e <code>mensagem.classList.toggle("destaque");</code>'],
    ),
    etapa('➕', 'PRÁTICA 2: criar elementos e colocá-los na página',
      'Acrescente à lista o que foi digitado no campo nome.',
      ['Digite <code>Borracha</code> no campo nome', 'Crie um <code>li</code> (<code>createElement</code>)', 'Coloque nele o texto digitado (<code>.value</code> do campo)', 'Pendure o <code>li</code> na lista (<code>appendChild</code>)'],
      `let campo = document.querySelector("#nome");
let lista = document.querySelector("#lista");

let li = document.___("li");
li.textContent = campo.___;
lista.___(li);`,
      ['Aparece um <strong>4º item</strong> "Borracha" na lista', 'Rode de novo: aparece <strong>outro</strong> (a lista cresce)', 'Digite um nome com <code>&lt;b&gt;</code>: aparece <strong>como texto</strong>, sem negrito'],
      ['Criar elemento: <code>document.createElement("li")</code>. Pendurar: <code>appendChild</code>.', 'O texto do <code>li</code> vem do campo: <code>campo.value</code>.', '<code>let li = document.createElement("li"); li.textContent = campo.value; lista.appendChild(li);</code>'],
    ),
  ];

  // ── 86: DOM 3 ─────────────────────────────────────────
  ENT['PRÁTICA 1: desenhar uma lista a partir de um array'] = exemplo(
    `<p>Em uma lista dinâmica há <strong>duas coisas</strong>: os <strong>dados</strong> (um array) e a <strong>tela</strong> (os elementos). A <strong>regra de ouro</strong>: a função que desenha <strong>sempre limpa primeiro</strong> e <strong>sempre desenha a partir dos dados</strong>. Assim, não importa quantas vezes você a chamar: o resultado é o mesmo.</p>`,
    `// EXEMPLO: desenhar a lista de compras
let compras = ["Pão", "Leite"];

function desenhar() {
  let lista = document.querySelector("#compras");
  lista.innerHTML = "";                        // 1. limpa

  for (let i = 0; i < compras.length; i++) {   // 2. percorre os DADOS
    let li = document.createElement("li");     // 3. cria
    li.textContent = compras[i];               //    texto
    lista.appendChild(li);                     //    pendura
  }
}

compras.push("Café");   // muda os dados...
desenhar();             // ...e redesenha: a tela acompanha`,
    ['<code>lista.innerHTML = ""</code> esvazia a lista. Sem isso, cada chamada <strong>acrescentaria de novo</strong> (itens duplicados)', 'O <code>for</code> lê o <strong>array</strong>, e não a tela', 'Mudar os dados <strong>não</strong> muda a tela sozinha: é preciso <strong>chamar <code>desenhar()</code></strong>'],
    'Os dados serão um array <code>itens</code> e a lista será o <code>#lista</code> do treino.');
  ENT['PRÁTICA 2: remover um item e redesenhar'] = exemplo(
    `<p>Remover é <strong>mudar os dados e redesenhar</strong>, nunca só apagar o elemento da tela. <code>array.splice(posição, quantidade)</code> remove itens do array: <code>splice(1, 1)</code> remove <strong>1 item</strong> a partir da posição 1.</p>`,
    `// EXEMPLO: botão "x" em cada item de compras
function desenhar() {
  let lista = document.querySelector("#compras");
  lista.innerHTML = "";
  for (let i = 0; i < compras.length; i++) {
    let li = document.createElement("li");
    li.textContent = compras[i] + " ";

    let botao = document.createElement("button");
    botao.textContent = "x";
    botao.addEventListener("click", function () {
      compras.splice(i, 1);       // remove do ARRAY (a posição i desta volta)
      desenhar();                 // e redesenha
    });

    li.appendChild(botao);
    lista.appendChild(li);
  }
}`,
    ['Cada volta cria um botão cujo clique usa o <code>i</code> <strong>daquela volta</strong> (por isso remove o item certo)', '<code>compras.splice(i, 1)</code> tira o item do <strong>array</strong>', '<code>desenhar()</code> refaz a tela com o array já sem o item', 'Se só apagássemos o <code>li</code> da tela, o item <strong>voltaria</strong> no próximo <code>desenhar()</code>'],
    'O array será <code>itens</code>, a lista é <code>#lista</code> e o botão será <strong>Remover</strong>.');
  GUIA[86] = [
    etapa('🖼️', 'PRÁTICA 1: desenhar uma lista a partir de um array',
      'Desenhe os itens de um array e prove que chamar duas vezes não duplica.',
      ['Crie o array <code>itens = ["Caneta", "Caderno", "Lápis"]</code>', 'Escreva <code>desenhar()</code>: limpa a <code>#lista</code>, percorre o array e cria um <code>li</code> por item', 'Chame <code>desenhar()</code> <strong>duas vezes</strong> e conte os itens', 'Faça <code>itens.push("Régua")</code> e chame <code>desenhar()</code>'],
      `let itens = ["Caneta", "Caderno", "Lápis"];

function desenhar() {
  let lista = document.querySelector("#lista");
  lista.___ = "";
  for (let i = 0; i < itens.___; i++) {
    let li = document.createElement("li");
    li.textContent = itens[___];
    lista.appendChild(___);
  }
}

desenhar();
desenhar();`,
      ['A lista mostra <strong>3 itens</strong> (não 6) depois das duas chamadas', 'Depois do <code>push</code> e do <code>desenhar()</code>, aparecem 4', 'Se aparecerem itens repetidos, faltou limpar com <code>innerHTML = ""</code>'],
      ['Limpar: <code>lista.innerHTML = "";</code> (a primeira linha da função).', 'O texto de cada <code>li</code> vem da <strong>posição <code>i</code></strong> do array.', '<code>li.textContent = itens[i]; lista.appendChild(li);</code>'],
    ),
    etapa('🗑️', 'PRÁTICA 2: remover um item e redesenhar',
      'Acrescente um botão Remover em cada item.',
      ['Dentro do laço de <code>desenhar</code>, crie um <code>button</code> com o texto "Remover"', 'Ligue o clique: <code>itens.splice(i, 1)</code> e depois <code>desenhar()</code>', 'Pendure o botão no <code>li</code> antes de pendurar o <code>li</code> na lista', 'Teste removendo o primeiro, o do meio e o último'],
      `let botao = document.createElement("button");
botao.textContent = "Remover";
botao.addEventListener("click", function () {
  itens.___(i, 1);
  ___();
});
li.appendChild(___);`,
      ['Clicar em Remover tira <strong>aquele</strong> item (e só ele)', 'Funciona para o primeiro, o do meio e o último', 'No console, <code>itens</code> mostra o array <strong>já sem</strong> o item removido'],
      ['<code>splice(posição, quantidade)</code>: <code>splice(i, 1)</code> tira 1 item na posição <code>i</code>.', 'Sem o <code>desenhar()</code> no final, o array muda, mas a tela <strong>não</strong>.', '<code>itens.splice(i, 1); desenhar();</code> e <code>li.appendChild(botao);</code>'],
    ),
  ];

  // ── 67: eventos ───────────────────────────────────────
  ENT['PRÁTICA 1: reagir ao clique de um botão'] = exemplo(
    `<p>Um <strong>evento</strong> é algo que acontece na página (um clique, uma tecla). Com <code>elemento.addEventListener("evento", função)</code> você diz: "<strong>quando</strong> isso acontecer, <strong>execute</strong> esta função". <strong>Atenção:</strong> a função vai <strong>sem parênteses</strong> (se tiver parênteses, ela roda <em>na hora</em>, e não no clique).</p>`,
    `// EXEMPLO: um contador de cliques
let cliques = 0;
let botao = document.querySelector("#curtir");
let numero = document.querySelector("#numero");

botao.addEventListener("click", function () {
  cliques = cliques + 1;              // 1. muda o DADO
  numero.textContent = cliques;       // 2. atualiza a TELA
});`,
    ['<code>"click"</code> é o nome do evento (não <code>"onclick"</code>)', 'A função entre <code>{ }</code> só executa <strong>quando o clique acontece</strong>', 'Padrão do projeto todo: <strong>evento → muda os dados → atualiza a tela</strong>', 'Sem a linha 2, a variável aumenta, mas o usuário <strong>não vê</strong>'],
    'O botão é <code>#btn</code> e o resultado vai no <code>#mensagem</code> do treino.');
  ENT['PRÁTICA 2: reagir a cada letra digitada'] = exemplo(
    `<p>O evento <code>"input"</code> dispara a <strong>cada letra digitada</strong> em um campo (o <code>"change"</code> só dispara ao sair do campo). É ideal para <strong>ver o resultado enquanto digita</strong>: busca, contador de caracteres...</p>`,
    `// EXEMPLO: mostrar quantas letras já foram digitadas
let campo = document.querySelector("#comentario");
let contagem = document.querySelector("#contagem");

campo.addEventListener("input", function () {
  contagem.textContent = campo.value.length + " letras";
});`,
    ['<code>campo.value</code> é o texto <strong>atual</strong> (já com a letra que acabou de ser digitada)', '<code>.length</code> de um texto é a <strong>quantidade de caracteres</strong>', 'A função roda <strong>a cada tecla</strong>, então a contagem acompanha'],
    'Será o campo <code>#nome</code> do treino e o resultado em <code>#mensagem</code>.');
  GUIA[67] = [
    etapa('👆', 'PRÁTICA 1: reagir ao clique de um botão',
      'Faça o botão do treino contar cliques.',
      ['Crie <code>cliques = 0</code>', 'Ligue o clique de <code>#btn</code> a uma função', 'A função soma 1 e <strong>mostra</strong> no <code>#mensagem</code> ("Cliques: 3")', 'Acrescente depois um segundo botão "Zerar" (crie no HTML) que volta a 0'],
      `let cliques = 0;
let btn = document.querySelector("#___");
let mensagem = document.querySelector("#mensagem");

btn.addEventListener("___", function () {
  cliques = cliques + ___;
  mensagem.textContent = "Cliques: " + ___;
});`,
      ['Cada clique mostra o número <strong>aumentando</strong>', 'Recarregar a página volta a 0 (a variável é da memória)', 'Se o contador muda no console mas não na tela, faltou o <code>textContent</code>'],
      ['O nome do evento é <code>"click"</code> (entre aspas, sem "on").', 'A função de clique faz <strong>duas</strong> coisas: muda a variável e atualiza a tela.', '<code>btn.addEventListener("click", function () { cliques = cliques + 1; mensagem.textContent = "Cliques: " + cliques; });</code>'],
    ),
    etapa('⌨️', 'PRÁTICA 2: reagir a cada letra digitada',
      'Mostre o tamanho do que o usuário digita no campo nome.',
      ['Ligue o evento <code>"input"</code> do campo <code>#nome</code>', 'A cada letra, escreva no <code>#mensagem</code> quantos caracteres há', 'Mostre também o texto <strong>em maiúsculas</strong> (<code>toUpperCase()</code>)'],
      `let campo = document.querySelector("#nome");

campo.addEventListener("___", function () {
  mensagem.textContent = campo.value.___ + " letras: " + campo.value.___();
});`,
      ['Digitar "Caneta" mostra <code>6 letras: CANETA</code>', 'Apagar letras atualiza <strong>na hora</strong>', 'Com <code>"change"</code> no lugar de <code>"input"</code>, só atualizaria ao sair do campo'],
      ['O evento por letra é <code>"input"</code>.', '<code>.length</code> (sem parênteses) é a quantidade; <code>.toUpperCase()</code> (com parênteses) é um <strong>método</strong>.', '<code>campo.value.length</code> e <code>campo.value.toUpperCase()</code>'],
    ),
  ];

  // ── 87: formulários ───────────────────────────────────
  ENT['PRÁTICA 1: interceptar o envio do formulário (submit)'] = exemplo(
    `<p>Por padrão, ao enviar um <code>&lt;form&gt;</code>, o navegador <strong>recarrega a página</strong> e coloca os campos na URL. Para tratar tudo no JavaScript, escutamos o evento <code>"submit"</code> e chamamos <code>evento.preventDefault()</code>, que <strong>cancela o envio padrão</strong>.</p>`,
    `<!-- HTML do exemplo -->
<form id="cadastro">
  <input type="text" id="aluno" placeholder="Nome">
  <button type="submit">Enviar</button>
</form>

// JavaScript
let form = document.querySelector("#cadastro");

form.addEventListener("submit", function (evento) {
  evento.preventDefault();                       // NÃO recarrega a página
  console.log("Enviado:", document.querySelector("#aluno").value);
});`,
    ['O <code>submit</code> é do <strong>formulário</strong> (e dispara também ao apertar Enter)', 'A função recebe um parâmetro, o <code>evento</code>', '<code>evento.preventDefault()</code>: sem isso, a página <strong>recarrega</strong> e o console some', 'Dentro da função você faz o que quiser: validar, guardar...'],
    'Você vai montar o <code>&lt;form&gt;</code> de produtos no <code>treino.html</code> e tratar o envio.');
  ENT['PRÁTICA 2: validar os campos e mostrar mensagens'] = exemplo(
    `<p>Validar é conferir os dados <strong>antes</strong> de usá-los. Um jeito claro: uma variável <code>ok</code> que começa <code>true</code> e vira <code>false</code> se <strong>qualquer</strong> campo estiver errado; no fim, só segue se <code>ok</code> continuar <code>true</code>. Cada erro ganha uma <strong>mensagem ao lado do campo</strong>.</p>`,
    `// EXEMPLO: validar nome e idade
form.addEventListener("submit", function (evento) {
  evento.preventDefault();
  let ok = true;
  let nome = document.querySelector("#aluno").value.trim();
  let idade = Number(document.querySelector("#idade").value);

  if (nome.length < 3) {
    document.querySelector("#erroAluno").textContent = "Mínimo 3 letras";
    ok = false;
  } else {
    document.querySelector("#erroAluno").textContent = "";
  }

  if (Number.isNaN(idade) || idade <= 0) {
    document.querySelector("#erroIdade").textContent = "Idade inválida";
    ok = false;
  } else {
    document.querySelector("#erroIdade").textContent = "";
  }

  if (ok) console.log("Tudo certo!");
});`,
    ['<code>.trim()</code> tira espaços das pontas (para "   " não passar)', 'Cada campo tem <strong>seu</strong> <code>if/else</code>: erro → mensagem e <code>ok = false</code>; certo → <strong>limpa</strong> a mensagem', '<code>Number.isNaN(idade)</code> pega o texto inválido (porque <code>NaN &lt;= 0</code> é <code>false</code>, a checagem sozinha não bastaria)', 'No fim, <code>if (ok)</code> executa só se <strong>todos</strong> os campos passaram'],
    'Os campos serão <code>#nome</code> (mínimo 3 letras) e <code>#preco</code> (maior que zero).');
  GUIA[87] = [
    etapa('📨', 'PRÁTICA 1: interceptar o envio do formulário (submit)',
      'Envolva o campo nome e o preço em um formulário e trate o envio.',
      ['No <code>treino.html</code>, coloque o <code>input</code> nome, o <code>input</code> preço e um <code>&lt;button type="submit"&gt;</code> <strong>dentro</strong> de um <code>&lt;form id="cadastro"&gt;</code>', 'Escute o <code>submit</code> e chame <code>evento.preventDefault()</code>', 'Mostre no console o nome e o preço digitados', 'Teste apertando <strong>Enter</strong> dentro de um campo'],
      `let form = document.querySelector("#___");

form.addEventListener("___", function (evento) {
  evento.___();
  console.log(document.querySelector("#nome").value, document.querySelector("#preco").value);
});`,
      ['Clicar em Enviar (ou Enter) mostra os valores no console <strong>sem recarregar</strong> a página', 'Sem o <code>preventDefault</code>, a página recarrega e a URL ganha <code>?...</code>', 'Os campos continuam preenchidos depois do envio'],
      ['O evento é <code>"submit"</code> (do formulário, e não do botão).', 'O método que cancela o envio padrão tem o nome <code>preventDefault</code>.', '<code>form.addEventListener("submit", function (evento) { evento.preventDefault(); ... });</code>'],
    ),
    etapa('✅', 'PRÁTICA 2: validar os campos e mostrar mensagens',
      'Recuse nome curto e preço inválido, com mensagem ao lado de cada campo.',
      ['Acrescente, ao lado de cada campo, um <code>&lt;span id="erroNome"&gt;</code> e <code>&lt;span id="erroPreco"&gt;</code>', 'No <code>submit</code>: <code>ok = true</code>; leia nome (com <code>trim</code>) e preço (com <code>Number</code>)', 'Nome com menos de 3 letras → mensagem e <code>ok = false</code>', 'Preço inválido (NaN ou até 0) → mensagem e <code>ok = false</code>', 'Se <code>ok</code>, mostre "Tudo certo!" no <code>#mensagem</code>'],
      `let ok = true;
let nome = document.querySelector("#nome").value.___();
let preco = ___(document.querySelector("#preco").value);

if (nome.length < ___) {
  document.querySelector("#erroNome").textContent = "Mínimo 3 letras";
  ok = false;
} else {
  document.querySelector("#erroNome").textContent = "";
}
// TODO: o mesmo para o preço (use Number.isNaN)

if (ok) {
  document.querySelector("#mensagem").textContent = "Tudo certo!";
}`,
      ['Nome "Ab" → mensagem de erro; "   " → também erro (trim)', 'Preço vazio, 0, -3 ou "abc" → mensagem de erro', 'Tudo certo → as mensagens somem e aparece "Tudo certo!"'],
      ['Sempre <strong>limpe</strong> a mensagem no <code>else</code>, senão ela fica na tela depois de corrigir.', 'O preço inválido é <code>Number.isNaN(preco) || preco &lt;= 0</code>.', '<code>if (Number.isNaN(preco) || preco &lt;= 0) { ...erroPreco...; ok = false; } else { ...limpa... }</code>'],
    ),
  ];

  // ── 88: mini-projeto ──────────────────────────────────
  ENT['PRÁTICA 1: guardar e ler uma lista no localStorage'] = exemplo(
    `<p>O localStorage só guarda <strong>texto</strong>. Para guardar um <strong>array</strong> inteiro: <code>JSON.stringify</code> ao guardar e <code>JSON.parse</code> ao ler. E na <strong>primeira visita</strong> não há nada guardado: o <code>getItem</code> devolve <code>null</code>. Por isso a função de ler devolve uma <strong>lista vazia</strong> nesse caso, evitando erro.</p>`,
    `// EXEMPLO: guardar a lista de compras
function lerCompras() {
  let texto = localStorage.getItem("compras");
  if (texto === null) return [];            // primeira visita: lista vazia
  return JSON.parse(texto);                 // texto -> array
}

function salvarCompras(compras) {
  localStorage.setItem("compras", JSON.stringify(compras));   // array -> texto
}

let c = lerCompras();    // []
c.push("Pão");
salvarCompras(c);
console.log(lerCompras());   // ["Pão"]`,
    ['<code>texto === null</code>: a chave ainda não existe (primeira vez)', 'Devolver <code>[]</code> evita o erro <em>Cannot read properties of null (reading push)</em>', '<code>JSON.stringify</code> e <code>JSON.parse</code> são um <strong>par</strong>: ida e volta', 'Depois de mudar a lista, é preciso <strong>salvar de novo</strong> (o array em memória não é o do localStorage)'],
    'A chave será <code>"tarefas"</code> e cada tarefa será um objeto <code>{ id, texto, concluida }</code>.');
  ENT['PRÁTICA 2: adicionar uma tarefa e redesenhar'] = exemplo(
    `<p>Todas as ações do mini-projeto seguem o <strong>mesmo ciclo</strong>: <strong>ler</strong> a lista → <strong>mudar</strong> → <strong>salvar</strong> → <strong>redesenhar</strong>. Para identificar cada item sem depender da posição (que muda ao remover), cada um recebe um <strong>id único</strong>, como <code>Date.now()</code> (milissegundos desde 1970).</p>`,
    `// EXEMPLO: adicionar uma compra
function adicionarCompra(texto) {
  let compras = lerCompras();                          // 1. LER
  compras.push({ id: Date.now(), texto: texto });     // 2. MUDAR
  salvarCompras(compras);                              // 3. SALVAR
  desenharCompras();                                   // 4. REDESENHAR
}`,
    ['As <strong>4 linhas</strong> são sempre as mesmas, em todas as ações (só muda o passo 2)', '<code>Date.now()</code> gera um número que muda a cada milissegundo: serve de id', 'Quem chama só precisa passar o texto: <code>adicionarCompra("Pão")</code>', 'O desenho vem <strong>do localStorage</strong>, e não da variável: assim sobrevive ao F5'],
    'A tarefa terá também <code>concluida: false</code>, e o desenho mostrará cada tarefa em um <code>li</code>.');
  ENT['PRÁTICA 3: marcar como feita e remover'] = exemplo(
    `<p>Para achar <strong>uma</strong> tarefa pelo id, usa-se <code>find</code>; para <strong>remover</strong> uma, usa-se <code>filter</code> (que deixa passar todas <strong>menos</strong> a escolhida). Continuam valendo as 4 etapas: ler → mudar → salvar → redesenhar.</p>`,
    `// EXEMPLO: marcar uma compra como comprada e remover outra
function alternarCompra(id) {
  let compras = lerCompras();
  let c = compras.find((x) => x.id === id);     // acha a compra pelo id
  if (c) c.comprada = !c.comprada;               // inverte true/false
  salvarCompras(compras);
  desenharCompras();
}

function removerCompra(id) {
  let compras = lerCompras().filter((x) => x.id !== id);   // todas, menos esta
  salvarCompras(compras);
  desenharCompras();
}`,
    ['<code>find((x) =&gt; x.id === id)</code> devolve <strong>o item</strong> com aquele id (ou <code>undefined</code>)', '<code>if (c)</code> protege contra não achar', '<code>!c.comprada</code> inverte: <code>true</code> vira <code>false</code> e vice-versa', '<code>filter((x) =&gt; x.id !== id)</code>: "fique com os que <strong>não</strong> têm esse id"'],
    'O campo se chama <code>concluida</code> e as funções, <code>alternarTarefa</code> e <code>removerTarefa</code>.');
  GUIA[88] = [
    etapa('💾', 'PRÁTICA 1: guardar e ler uma lista no localStorage',
      'Crie as duas funções que sustentam o projeto.',
      ['Crie <code>lerTarefas()</code>: lê a chave <code>"tarefas"</code>; se for <code>null</code>, devolve <code>[]</code>; senão, <code>JSON.parse</code>', 'Crie <code>salvarTarefas(tarefas)</code>: guarda com <code>JSON.stringify</code>', 'Teste no console: leia (vazio), acrescente um objeto, salve, leia de novo'],
      `function lerTarefas() {
  let texto = localStorage.getItem("___");
  if (texto === ___) return [];
  return JSON.___(texto);
}

function salvarTarefas(tarefas) {
  localStorage.setItem("tarefas", JSON.___(tarefas));
}`,
      ['A primeira leitura devolve <code>[]</code>', 'Depois de salvar <code>[{id:1, texto:"Estudar", concluida:false}]</code>, a leitura devolve <strong>o mesmo array</strong>', 'Recarregue (F5): a leitura <strong>continua</strong> devolvendo'],
      ['A chave é <code>"tarefas"</code>. O <code>getItem</code> devolve <code>null</code> quando não existe.', 'Sem o tratamento do <code>null</code>, o <code>JSON.parse(null)</code> devolve <code>null</code> e o <code>push</code> seguinte quebra.', '<code>if (texto === null) return [];</code>'],
    ),
    etapa('➕', 'PRÁTICA 2: adicionar uma tarefa e redesenhar',
      'Escreva <code>adicionarTarefa(texto)</code> e <code>desenharTarefas()</code>.',
      ['<code>adicionarTarefa(texto)</code>: ler → acrescentar <code>{ id: Date.now(), texto, concluida: false }</code> → salvar → redesenhar', '<code>desenharTarefas()</code>: limpa a <code>#lista</code>, lê as tarefas e cria um <code>li</code> para cada (com o texto)', 'Chame <code>desenharTarefas()</code> ao abrir a página', 'Teste: adicione 3 tarefas e aperte F5'],
      `function adicionarTarefa(texto) {
  let tarefas = ___();
  tarefas.push({ id: Date.___(), texto: texto, concluida: ___ });
  ___(tarefas);
  desenharTarefas();
}

function desenharTarefas() {
  let lista = document.querySelector("#lista");
  lista.innerHTML = "";
  let tarefas = lerTarefas();
  for (let tarefa of tarefas) {
    let li = document.createElement("li");
    li.textContent = tarefa.___;
    lista.appendChild(li);
  }
}

desenharTarefas();`,
      ['As tarefas aparecem na lista a cada <code>adicionarTarefa("...")</code>', 'F5 mantém todas', 'Cada tarefa tem um <code>id</code> diferente (veja com <code>lerTarefas()</code> no console)'],
      ['As <strong>4 linhas</strong>: <code>ler → mudar (push) → salvar → desenhar</code>.', 'O objeto tem 3 campos: <code>id</code>, <code>texto</code> e <code>concluida</code> (começa <code>false</code>).', '<code>let tarefas = lerTarefas(); tarefas.push({ id: Date.now(), texto: texto, concluida: false }); salvarTarefas(tarefas); desenharTarefas();</code>'],
    ),
    etapa('✅', 'PRÁTICA 3: marcar como feita e remover',
      'Complete o mini-projeto.',
      ['<code>alternarTarefa(id)</code>: ler → achar com <code>find</code> → inverter <code>concluida</code> → salvar → redesenhar', '<code>removerTarefa(id)</code>: ler → <code>filter</code> sem a tarefa → salvar → redesenhar', 'No <code>desenharTarefas</code>, ligue o clique do <code>li</code> a <code>alternarTarefa</code> e acrescente um botão que chama <code>removerTarefa</code>', 'Mostre as feitas com <code>text-decoration: line-through</code> (classe <code>feito</code>)'],
      `function alternarTarefa(id) {
  let tarefas = lerTarefas();
  let t = tarefas.___((x) => x.id === id);
  if (t) t.concluida = !t.___;
  salvarTarefas(tarefas);
  desenharTarefas();
}

function removerTarefa(id) {
  let tarefas = lerTarefas().___((x) => x.id ___ id);
  salvarTarefas(tarefas);
  desenharTarefas();
}`,
      ['Clicar na tarefa a <strong>marca/desmarca</strong> (riscada); F5 mantém', 'Remover tira só a escolhida; F5 mantém', 'Clicar no botão remover <strong>não</strong> marca a tarefa (veja o <code>stopPropagation</code> da aula)'],
      ['<code>find</code> devolve o item; <code>filter</code> devolve uma lista nova <strong>sem</strong> ele.', 'Em <code>filter</code>, "todas menos esta" é <code>x.id !== id</code>.', '<code>tarefas.find((x) =&gt; x.id === id)</code> e <code>lerTarefas().filter((x) =&gt; x.id !== id)</code>'],
    ),
  ];

  // ══ ARQUIVOS COMPLETOS DO MÓDULO 8 (gerado por gen26.js a partir de proj_prw) ══
  var ARQ = {};
  ARQ[94] = [
    arquivoCompleto("html/index.html", "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>Sistema PRW</title>\n    <link\n      href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css\"\n      rel=\"stylesheet\"\n      integrity=\"sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB\"\n      crossorigin=\"anonymous\"\n    />\n  </head>\n\n  <body>\n    <!--Barra de menu -->\n    <div id=\"menuPrincipal\"></div>\n    <script src=\"../js/menu.js\"></script>\n    <!--Fim da Barra de menu -->\n\n    <!-- loja-->\n\n    <div id=\"container-cards\"></div>\n\n    <script src=\"../js/loja.js\"></script>\n  </body>\n</html>\n"),
    arquivoCompleto("js/menu.js", "// ============================================================\n// MENU\n// Barra de navegação compartilhada. Cada página tem um\n// <div id=\"menuPrincipal\"></div> e este script preenche ele,\n// assim o menu fica escrito em um lugar só.\n// ============================================================\ndocument.getElementById(\"menuPrincipal\").innerHTML = `\n    <nav class=\"navbar navbar-expand-lg bg-body-tertiary\">\n        <div class=\"container-fluid\">\n            <div class=\"collapse navbar-collapse\" id=\"navbarText\">\n                <ul class=\"navbar-nav me-auto mb-2 mb-lg-0\">\n                    <li class=\"nav-item\">\n                        <a class=\"nav-link\" aria-current=\"page\" href=\"index.html\">Loja</a>\n                    </li>\n                    <li class=\"nav-item\">\n                        <a class=\"nav-link\" href=\"gerenciarProdutos.html\">Gerenciar Produtos</a>\n                    </li>\n                </ul>\n                <a class=\"nav-link\" href=\"carrinho.html\">Carrinho</a>\n            </div>\n        </div>\n    </nav>`;\n")
  ];
  ARQ[98] = [
    arquivoCompleto("js/gerenciarProdutos.js", "\"use strict\";\n// gerenciarProdutos.js: montado a partir das \"soluções comentadas\" das aulas Loja 6 a Loja 17\n\nfunction escaparHtml(texto) {\n  return String(texto)\n    .replace(/&/g, \"&amp;\")\n    .replace(/</g, \"&lt;\")\n    .replace(/>/g, \"&gt;\")\n    .replace(/\"/g, \"&quot;\")\n    .replace(/'/g, \"&#39;\");\n}\n\n// Aula 6\nfunction ler() {\n  let produtoLido = [];\n  let nome = document.querySelector(\"#nomeProduto\");\n  let valor = document.querySelector(\"#valorProduto\");\n  let descricao = document.querySelector(\"#descricaoProduto\");\n\n  produtoLido[0] = nome.value;\n  produtoLido[1] = valor.value;\n  produtoLido[2] = descricao.value;\n\n  return produtoLido;\n}\n\nfunction limparCampos() {\n  document.querySelector(\"#nomeProduto\").value = \"\";\n  document.querySelector(\"#valorProduto\").value = \"\";\n  document.querySelector(\"#descricaoProduto\").value = \"\";\n}\n\n// Aula 7\nfunction salvarProduto(id, produto) {\n  localStorage.setItem(id, JSON.stringify(produto));\n  atualizarGrid();\n}\n\n// Aula 8\nfunction criarLinhaHTML(dados) {\n  return `\n    <tr id=\"${dados.id}\">\n      <td>${escaparHtml(dados.produto)}</td>\n      <td>R$ ${Number(dados.valor).toFixed(2).replace(\".\", \",\")}</td>\n      <td>${escaparHtml(dados.descricao)}</td>\n      <td>\n        <button type=\"button\" class=\"btn btn-primary\" onclick=\"controle('alterar','${dados.id}')\">Alterar</button>\n        <button type=\"button\" class=\"btn btn-primary\" onclick=\"controle('excluir','${dados.id}')\">Excluir</button>\n      </td>\n    </tr>\n  `;\n}\n\nfunction atualizarGrid() {\n  const grid = document.querySelector(\"#listaProdutos\");\n  grid.innerHTML = \"\";\n\n  for (let j = 0; j < localStorage.length; j++) {\n    let chave = localStorage.key(j);\n    if (chave[0] != \"p\") continue;\n    let produtoVet = JSON.parse(localStorage.getItem(chave));\n\n    const cardDados = {\n      produto: produtoVet[0],\n      valor: produtoVet[1],\n      descricao: produtoVet[2],\n      id: chave,\n    };\n    grid.insertAdjacentHTML(\"beforeend\", criarLinhaHTML(cardDados));\n  }\n}\n\n// Aula 9\nfunction validar(situacao) {\n  if (situacao == \"invalido\" && !document.querySelector(\"#nomeProduto\").classList.contains(\"is-invalid\")) {\n    document.querySelector(\"#nomeProduto\").classList.add(\"is-invalid\");\n    document.querySelector(\"#valorProduto\").classList.add(\"is-invalid\");\n    document.querySelector(\"#descricaoProduto\").classList.add(\"is-invalid\");\n  } else if (situacao == \"valido\") {\n    document.querySelector(\"#nomeProduto\").classList.remove(\"is-invalid\");\n    document.querySelector(\"#valorProduto\").classList.remove(\"is-invalid\");\n    document.querySelector(\"#descricaoProduto\").classList.remove(\"is-invalid\");\n  }\n}\n\n// Aula 10, 11, 12, 13\nfunction controle(opcao, id) {\n  let produto = [];\n  if (opcao == \"salvar\" && id == \"p\") {\n    produto = ler();\n    if (produto[0] != \"\" && produto[1] != \"\" && produto[2] != \"\") {\n      salvarProduto(\"p\" + crypto.randomUUID(), produto);\n      limparCampos();\n      validar(\"valido\");\n    } else {\n      validar(\"invalido\");\n    }\n  } else if (opcao == \"salvar\" && id != \"p\") {\n    document.querySelector(\"#cancelar\").classList.add(\"d-none\");\n    produto = ler();\n    atualizarProduto(id, produto);\n  } else if (opcao == \"excluir\") {\n    excluirProduto(id);\n  } else if (opcao == \"alterar\") {\n    lerProduto(id);\n  } else if (opcao == \"bloquear\") {\n    bloquear();\n  } else if (opcao == \"listar\") {\n    atualizarGrid();\n  }\n}\n\n// Aula 11\nfunction excluirProduto(id) {\n  let confirma = confirm(\"Deseja excluir o produto?\");\n  if (confirma) {\n    localStorage.removeItem(id);\n    localStorage.removeItem(\"c\" + id.slice(1));\n    atualizarGrid();\n  }\n}\n\n// Aula 12\nfunction lerProduto(id) {\n  let confirma = confirm(\"Deseja alterar o produto?\");\n  if (confirma) {\n    let produtoVet = JSON.parse(localStorage.getItem(id));\n    let alterar = document.querySelector(\"#botaoSalvarProduto\") || document.querySelector(\"#botaoAlterarProduto\");\n\n    document.querySelector(\"#cancelar\").classList.remove(\"d-none\");\n    alterar.textContent = \"Alterar\";\n    alterar.id = \"botaoAlterarProduto\";\n    alterar.onclick = () => controle(\"salvar\", id);\n\n    document.querySelector(\"#nomeProduto\").value = produtoVet[0];\n    document.querySelector(\"#valorProduto\").value = produtoVet[1];\n    document.querySelector(\"#descricaoProduto\").value = produtoVet[2];\n  }\n}\n\nfunction atualizarProduto(id, produto) {\n  salvarProduto(id, produto);\n  let alterar = document.querySelector(\"#botaoAlterarProduto\");\n  alterar.textContent = \"Salvar\";\n  alterar.id = \"botaoSalvarProduto\";\n  limparCampos();\n  alterar.onclick = () => controle(\"salvar\", \"p\");\n}\n\nfunction cancelar() {\n  limparCampos();\n  let alterar = document.querySelector(\"#botaoAlterarProduto\");\n  alterar.textContent = \"Salvar\";\n  alterar.id = \"botaoSalvarProduto\";\n  alterar.onclick = () => controle(\"salvar\", \"p\");\n  document.querySelector(\"#cancelar\").classList.add(\"d-none\");\n}\n\n// Aula 13\nfunction bloquear() {\n  if (document.querySelector(\"#botaoSalvarProduto\").disabled == true) {\n    document.querySelector(\"#botaoSalvarProduto\").disabled = false;\n    document.querySelector(\"#nomeProduto\").disabled = false;\n    document.querySelector(\"#valorProduto\").disabled = false;\n    document.querySelector(\"#descricaoProduto\").disabled = false;\n  } else {\n    document.querySelector(\"#botaoSalvarProduto\").disabled = true;\n    document.querySelector(\"#nomeProduto\").disabled = true;\n    document.querySelector(\"#valorProduto\").disabled = true;\n    document.querySelector(\"#descricaoProduto\").disabled = true;\n  }\n}\n\ncontrole(\"listar\", \"\");\n"),
    arquivoCompleto("js/loja.js", "\"use strict\";\nfunction escaparHtml(texto) {\n  return String(texto)\n    .replace(/&/g, \"&amp;\")\n    .replace(/</g, \"&lt;\")\n    .replace(/>/g, \"&gt;\")\n    .replace(/\"/g, \"&quot;\")\n    .replace(/'/g, \"&#39;\");\n}\n\nfunction criarCardHTML(dados) {\n  return `\n    <div class=\"card d-inline-block\">\n      <div class=\"card-body\">\n        <h5 class=\"card-title\">${escaparHtml(dados.produto)}</h5>\n        <p class=\"card-text\">${escaparHtml(dados.descricao)}</p>\n        <p class=\"card-text\">R$ ${Number(dados.valor).toFixed(2).replace(\".\", \",\")}</p>\n        <button type=\"button\" class=\"btn btn-primary\" onclick=\"carrinho('${dados.id}')\">Comprar</button>\n      </div>\n    </div>\n  `;\n}\n\nconst container = document.querySelector(\"#container-cards\");\n\nfor (let i = 0; i < localStorage.length; i++) {\n  let chave = localStorage.key(i);\n  if (chave[0] != \"p\") continue;\n  let produtoVet = JSON.parse(localStorage.getItem(chave));\n\n  const cardDados = {\n    produto: produtoVet[0],\n    descricao: produtoVet[2],\n    valor: produtoVet[1],\n    id: chave,\n  };\n  container.insertAdjacentHTML(\"beforeend\", criarCardHTML(cardDados));\n}\n\nfunction carrinho(id) {\n  let produto = localStorage.getItem(id);\n  localStorage.setItem(\"c\" + id.slice(1), produto);\n  alert(\"Produto adicionado ao carrinho!\");\n}\n"),
    arquivoCompleto("js/carrinho.js", "\"use strict\";\nfunction escaparHtml(texto) {\n  return String(texto)\n    .replace(/&/g, \"&amp;\")\n    .replace(/</g, \"&lt;\")\n    .replace(/>/g, \"&gt;\")\n    .replace(/\"/g, \"&quot;\")\n    .replace(/'/g, \"&#39;\");\n}\n\nfunction criarLinhaHTML(dados) {\n  return `\n    <tr>\n      <td>${escaparHtml(dados.produto)}</td>\n      <td>R$ ${Number(dados.valor).toFixed(2).replace(\".\", \",\")}</td>\n      <td>${escaparHtml(dados.descricao)}</td>\n      <td><button type=\"button\" class=\"btn btn-danger btn-sm\" onclick=\"remover('${dados.id}')\">Remover</button></td>\n    </tr>\n  `;\n}\n\nfunction listar() {\n  const lista = document.querySelector(\"#listaCarrinho\");\n  lista.innerHTML = \"\";\n  let total = 0;\n\n  for (let j = 0; j < localStorage.length; j++) {\n    let chave = localStorage.key(j);\n    if (chave[0] != \"c\") continue;\n    let produtoVet = JSON.parse(localStorage.getItem(chave));\n\n    const linhaDados = {\n      produto: produtoVet[0],\n      valor: produtoVet[1],\n      descricao: produtoVet[2],\n      id: chave,\n    };\n    total += Number(produtoVet[1]);\n    lista.insertAdjacentHTML(\"beforeend\", criarLinhaHTML(linhaDados));\n  }\n  document.querySelector(\"#totalCarrinho\").textContent = total.toFixed(2).replace(\".\", \",\");\n}\n\nfunction remover(id) {\n  localStorage.removeItem(id);\n  listar();\n}\n\nlistar();\n")
  ];
  ARQ[119] = [
    arquivoCompleto("html/gerenciarProdutos.html", "<!doctype html>\n<html lang=\"en\">\n\n<head>\n  <meta charset=\"UTF-8\" />\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n  <title>Sistema PRW</title>\n  <link rel=\"stylesheet\" href=\"../css/estilo.css\">\n  <link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css\" rel=\"stylesheet\"\n    integrity=\"sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB\" crossorigin=\"anonymous\" />\n</head>\n\n<body>\n  <!--Barra de menu -->\n  <div id=\"menuPrincipal\"></div>\n  <script src=\"../js/menu.js\"></script>\n  <!--Fim da Barra de menu -->\n\n  <!--Formulário de cadastro de produtos-->\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col-3\"></div>\n\n      <div id=\"formulario\" class=\"col-6\">\n        <h3>Cadastro de produtos</h3>\n        <div class=\"mb-1 mt-1\">\n          <input type=\"text\" class=\"form-control\" id=\"nomeProduto\" placeholder=\"Nome do Produto\" />\n        </div>\n        <div class=\"mb-1\">\n          <input type=\"number\" class=\"form-control\" id=\"valorProduto\" placeholder=\"Valor do produto\" />\n        </div>\n        <div class=\"mb-1\">\n          <textarea class=\"form-control\" id=\"descricaoProduto\" rows=\"3\" placeholder=\"Descrição do Produto\"></textarea>\n        </div>\n        <button id=\"botaoSalvarProduto\" onclick=\"controle('salvar', 'p')\" type=\"submit\" class=\"btn btn-primary\">\n          Salvar\n        </button>\n        <button id=\"botaoBloquearTela\" onclick=\"controle('bloquear','')\" type=\"submit\" class=\"btn btn-danger\">\n          Bloquear/Desbloquear\n        </button>\n        <button type=\"submit\" class=\"d-none btn btn-warning\" onclick=\"cancelar()\" id=\"cancelar\">Cancelar</button>\n      </div>\n    </div>\n  </div>\n  <!--Final dormulário de cadastro de produtos-->\n  <!--Grid de produtos cadastrados-->\n  <table class=\"table\">\n    <thead>\n      <tr>\n        <th scope=\"col\">Produto</th>\n        <th scope=\"col\">Valor</th>\n        <th scope=\"col\">Descrição</th>\n        <th scope=\"col\">Opções</th>\n      </tr>\n    </thead>\n    <tbody id=\"listaProdutos\"></tbody>\n  </table>\n  <!--Final do grid de produtos cadastrados-->\n  <script src=\"../js/gerenciarProdutos.js\"></script>\n</body>\n\n</html>")
  ];
  ARQ[120] = [
    arquivoCompleto("html/carrinho.html", "<!DOCTYPE html>\n<html lang=\"en\">\n\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Sistema PRW</title>\n    <link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css\" rel=\"stylesheet\"\n        integrity=\"sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB\" crossorigin=\"anonymous\">\n</head>\n<body>\n    <!--Barra de menu -->\n    <div id=\"menuPrincipal\"></div>\n    <script src=\"../js/menu.js\"></script>\n    <!--Fim da Barra de menu -->\n\n    <!--Lista do carrinho-->\n    <div class=\"container mt-3\">\n        <h3>Carrinho</h3>\n        <table class=\"table\">\n            <thead>\n                <tr>\n                    <th scope=\"col\">Produto</th>\n                    <th scope=\"col\">Valor</th>\n                    <th scope=\"col\">Descrição</th>\n                    <th scope=\"col\">Opções</th>\n                </tr>\n            </thead>\n            <tbody id=\"listaCarrinho\"></tbody>\n        </table>\n        <h4>Total: R$ <span id=\"totalCarrinho\">0,00</span></h4>\n    </div>\n    <!--Fim da lista do carrinho-->\n    <script src=\"../js/carrinho.js\"></script>\n\n\n</body>\n\n</html>")
  ];

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
    { n: 8,  nome: 'Projeto: Loja Virtual',     icone: '🛒', ids: [93, 94, 119, 120, 127, 70, 95, 121, 122, 123, 72, 124, 125, 71, 96, 97, 126, 98],  nivel: 116 },
    { n: 9,  nome: 'JavaScript assíncrono',     icone: '⏱️', ids: [99, 100, 104],                        nivel: 117 },
    { n: 10, nome: 'Profissionalismo',          icone: '🚀', ids: [105, 106],                            nivel: 118 },
    { n: 11, nome: 'Revisão e avaliação',       icone: '🏁', ids: [107, 108],                            nivel: 0 }
  ];
  var ORDEM = [];
  MODULOS.forEach(function (m) { if (m.nivel) ORDEM.push(m.nivel); ORDEM = ORDEM.concat(m.ids); });
  // prática guiada (módulos 4 e 5): explicação + exemplo resolvido + esqueleto + teste + dicas, antes das tarefas
  function guiaHtml(g) {
    return '<div style="margin-top:22px;background:var(--card);border:1.5px solid rgba(79,142,247,.4);border-radius:16px;padding:24px">' +
      '<div style="font-family:Sora,sans-serif;font-size:13px;color:var(--accent);font-weight:700;margin-bottom:6px">🧭 PRATIQUE PASSO A PASSO</div>' +
      '<p style="font-size:13px;color:var(--muted);margin-bottom:6px">Em cada etapa: primeiro <strong>entenda</strong> (explicação e exemplo resolvido), depois <strong>faça</strong>, depois <strong>teste</strong>. Travou? Abra as dicas <strong>em ordem</strong> (a solução comentada é o último recurso, e é para digitar).</p>' +
      g.join('<hr style="border:none;border-top:1px solid var(--border);margin:18px 0">') + '</div>';
  }
  NOVAS.forEach(function (a) { if (GUIA[a.id]) a.pratica = guiaHtml(GUIA[a.id]) + (a.pratica || ''); });
  NOVAS.forEach(function (a) { if (typeof ARQ !== 'undefined' && ARQ[a.id]) a.pratica = ARQ[a.id].join('') + (a.pratica || ''); });
  // módulo 8 organizado por TELAS (partes), na ordem em que a turma construiu o projeto
  var PARTES_LOJA = [
    { nome: 'Parte 1 · Construção da primeira tela (index.html, Bootstrap e menu)', curto: 'Parte 1', ids: [93, 94] },
    { nome: 'Parte 2 · Tela de gravar (formulário, tabela e CRUD)', curto: 'Parte 2', ids: [119, 127, 70, 95, 121, 122, 123, 72, 124, 125] },
    { nome: 'Parte 3 · Os cards da loja (vitrine e botão comprar)', curto: 'Parte 3', ids: [71, 96] },
    { nome: 'Parte 4 · O carrinho (carrinho.html, estilo.css e carrinho.js)', curto: 'Parte 4', ids: [120, 97] },
    { nome: 'Parte 5 · Qualidade, testes e entrega', curto: 'Parte 5', ids: [126, 98] }
  ];
  MODULOS[7].ids = [].concat.apply([], PARTES_LOJA.map(function (p) { return p.ids; }));
  MODULOS[7].partes = PARTES_LOJA;
  ORDEM = [];
  MODULOS.forEach(function (m) { if (m.nivel) ORDEM.push(m.nivel); ORDEM = ORDEM.concat(m.ids); });
  PARTES_LOJA.forEach(function (p) {
    p.ids.forEach(function (id, i) {
      NOVAS.forEach(function (a) {
        if (a.id === id) a.titulo = a.titulo.replace(/^Loja \d+:/, 'Loja · ' + p.curto + ' (' + (i + 1) + '/' + p.ids.length + '):');
      });
    });
  });
  // aplica as revisões (perguntas novas, passos extras) às aulas já criadas
  NOVAS.forEach(function (a) {
    var r = REV[a.id];
    if (!r) return;
    if (r.titulo) a.titulo = r.titulo;
    if (r.perguntas) a.perguntas = r.perguntas;
    (r.trocar || []).forEach(function (t) { if (a.perguntas[t.i]) a.perguntas[t.i] = t.q; });
    if (r.dropLast) a.passos.pop();
    (r.extra || []).forEach(function (p) { if (a.passos.length < 7) a.passos.splice(a.passos.length - 1, 0, p); });
  });
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
