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
      lista(['<strong>"Mudei o código e nada mudou"</strong>: não salvou (ponto na aba), editou o arquivo de <em>outra pasta</em>, ou o navegador usou o <em>cache</em> (Ctrl+F5)', '<strong>Página mostra o código HTML escrito</strong>: o arquivo foi salvo como <code>index.html.txt</code>. O Windows costuma <strong>esconder as extensões</strong>. Ative "Extensões de nomes de arquivos" no Explorador', '<strong>Acentos viram "Ã§Ã£o"</strong>: faltou <code>&lt;meta charset="UTF-8"&gt;</code> no <code>head</code> (ou o arquivo foi salvo em outra codificação)', '<strong>Imagem ou CSS não aparece</strong>: caminho ou nome errado. Veja o 404 no Network']),
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
    Q('Os acentos aparecem como "Ã§Ã£o". O que provavelmente falta?', '<meta charset="UTF-8"> no head', 'Um parágrafo', 'Um link', 'O atributo alt'),
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

  N(116, 8, 'Nivelamento: Módulo 8 · Projeto Loja Virtual', [
    Q('Qual é a chave de um produto com id "1700" na convenção da loja?', '"p1700"', '"c1700"', '"produto"', '"1700p"'),
    Q('Qual é a chave do carrinho do produto p1700?', '"c1700"', '"p1700"', '"cp1700"', '"carrinho"'),
    Q('Qual é o fluxo básico de todas as telas da loja?', 'Gravar, ler, percorrer e desenhar', 'Desenhar, apagar, fechar', 'Percorrer, apagar, gravar', 'Ler sem desenhar'),
    Q('Por que o atualizarGrid() é chamado ao final do script?', 'Para desenhar os dados já guardados ao abrir a página', 'Para apagar o localStorage', 'Para validar o formulário', 'Para esvaziar o carrinho'),
    Q('A tabela de produtos mostra o carrinho misturado. Causa provável?', 'Faltou filtrar por chave[0] === "p"', 'Faltou o CSS', 'O navegador está lento', 'O id está sem acento'),
    Q('Number("abc") <= 0 vale:', 'false (e o preço inválido passaria na validação)', 'true', 'NaN', 'Erro'),
    Q('Qual função detecta NaN corretamente?', 'Number.isNaN(valor)', 'valor === NaN', 'valor == "NaN"', 'valor.isNumber()'),
    Q('Ao excluir um produto, o que mais deve ser apagado?', 'A cópia no carrinho (chave c…)', 'O CSS', 'O HTML', 'Nada'),
    Q('O total do carrinho aparece como NaN com itens antigos. Causa provável?', 'item.quantidade é undefined', 'O JSON está inválido', 'O laço está errado', 'O toFixed não funciona'),
    Q('Como evitar esse NaN?', 'let qtd = item.quantidade || 1;', 'Apagar o localStorage', 'Usar innerHTML', 'Trocar let por const'),
    Q('Por que a busca "some" os produtos se o resultado do filter não foi guardado?', 'O filter devolve um array novo e o original continua igual', 'filter apaga os itens', 'O localStorage bloqueia', 'O input quebra'),
    Q('Depois de mudar os dados da loja, o que sempre fazer?', 'Chamar a função que redesenha a tela', 'Recarregar o navegador', 'Apagar o JSON', 'Trocar o id'),
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
  // aplica as revisões (perguntas novas, passos extras) às aulas já criadas
  NOVAS.forEach(function (a) {
    var r = REV[a.id];
    if (!r) return;
    if (r.perguntas) a.perguntas = r.perguntas;
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
