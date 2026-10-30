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

  // entrega as aulas novas à lista principal (sem repetir se já existirem)
  NOVAS.forEach(function (a) {
    if (!AULAS.some(function (x) { return x.id === a.id; })) AULAS.push(a);
  });
})();
