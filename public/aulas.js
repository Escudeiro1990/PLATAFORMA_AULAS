const AULAS = [

  // ══════════════════════════════════════════════════════
  // AULA 1 — O QUE É UM COMPUTADOR? (Hardware)
  // ══════════════════════════════════════════════════════
  {
    id: 1,
    titulo: "O que é um Computador?",
    descricao: "Conheça as partes físicas do computador e para que cada uma serve",
    icone: "🖥️",
    passos: [
      `<h3 style="margin-bottom:10px;color:var(--accent)">🖥️ O que é um Computador?</h3>
      <p>Um <strong>computador</strong> é uma máquina eletrônica capaz de receber, processar, armazenar e enviar informações. Usamos ele para estudar, trabalhar, pesquisar e muito mais.</p>
      <div style="margin-top:14px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px;line-height:1.9">
        <strong>📓 Copie no caderno:</strong><br>
        Computador = máquina que processa informações<br>
        Tipos: Desktop (mesa), Notebook (portátil), Tablet, Celular<br>
        Todo computador precisa de: energia elétrica + componentes físicos + programas
      </div>`,

      `<h3 style="margin-bottom:10px;color:var(--accent)">🔩 O que é Hardware?</h3>
      <p><strong>Hardware</strong> são todas as partes <em>físicas</em> do computador — tudo que você pode tocar com as mãos.</p>
      <div style="display:grid;gap:8px;margin-top:12px">
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">🖥️ <strong>Monitor</strong> — tela onde você vê as informações</div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">⌨️ <strong>Teclado</strong> — usado para digitar texto e comandos</div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">🖱️ <strong>Mouse</strong> — permite clicar e navegar na tela</div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">🖨️ <strong>Impressora</strong> — imprime documentos em papel</div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">🔊 <strong>Caixas de som</strong> — reproduzem áudio</div>
      </div>
      <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
        <strong>📓 Copie no caderno:</strong><br>
        Hardware = partes físicas (o que você pode tocar)<br>
        Exemplos: monitor, teclado, mouse, impressora, caixas de som
      </div>`,

      `<h3 style="margin-bottom:10px;color:var(--accent)">🧠 CPU — O Cérebro do Computador</h3>
      <p>A <strong>CPU</strong> (Unidade Central de Processamento) é o componente mais importante. Ela processa todas as instruções.</p>
      <div style="display:grid;gap:8px;margin-top:12px">
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          🧠 <strong>Processador (CPU)</strong><br>Executa os cálculos e instruções. Quanto mais rápido, melhor o desempenho.
        </div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          💾 <strong>Memória RAM</strong><br>Guarda temporariamente o que está sendo usado agora. Mais RAM = mais programas abertos.
        </div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          💿 <strong>HD / SSD</strong><br>Guarda arquivos permanentemente. SSD é mais rápido que HD.
        </div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          🎮 <strong>Placa de Vídeo (GPU)</strong><br>Processa imagens e gráficos na tela. Essencial para jogos e vídeos.
        </div>
      </div>
      <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px;line-height:1.9">
        <strong>📓 Copie:</strong> CPU = processa tudo | RAM = memória temporária | HD/SSD = armazenamento permanente
      </div>`,

      `<h3 style="margin-bottom:10px;color:var(--accent)">💡 Ciclo do Computador: Entrada → Processamento → Saída</h3>
      <p>O computador funciona em 3 etapas:</p>
      <div style="display:grid;gap:8px;margin-top:12px">
        <div style="padding:14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);text-align:center">
          <div style="font-size:24px">⌨️</div><strong>ENTRADA</strong><br><span style="font-size:13px;color:var(--muted)">Teclado, mouse, microfone, scanner</span>
        </div>
        <div style="text-align:center;font-size:20px;color:var(--accent)">↓</div>
        <div style="padding:14px;background:rgba(124,106,247,.08);border-radius:8px;border:1px solid var(--border);text-align:center">
          <div style="font-size:24px">🧠</div><strong>PROCESSAMENTO</strong><br><span style="font-size:13px;color:var(--muted)">CPU processa a informação</span>
        </div>
        <div style="text-align:center;font-size:20px;color:var(--accent)">↓</div>
        <div style="padding:14px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid var(--border);text-align:center">
          <div style="font-size:24px">🖥️</div><strong>SAÍDA</strong><br><span style="font-size:13px;color:var(--muted)">Monitor, impressora, caixas de som</span>
        </div>
      </div>
      <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
        <strong>📓 Copie:</strong> Ciclo: Entrada → Processamento → Saída<br>
        Entrada: teclado, mouse | Saída: monitor, impressora, som
      </div>`,

      `<h3 style="margin-bottom:10px;color:var(--accent)">📦 Tipos de Computador</h3>
      <p>Existem vários tipos de computador para diferentes situações:</p>
      <table style="width:100%;border-collapse:collapse;margin-top:12px;font-size:13px">
        <tr style="background:rgba(79,142,247,.15)"><th style="padding:8px;border:1px solid var(--border)">Tipo</th><th style="padding:8px;border:1px solid var(--border)">Característica</th></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)">🖥️ Desktop</td><td style="padding:8px;border:1px solid var(--border)">Fixo, mais potente, fica na mesa</td></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)">💻 Notebook</td><td style="padding:8px;border:1px solid var(--border)">Portátil, tem bateria, pode carregar na mochila</td></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)">📱 Tablet</td><td style="padding:8px;border:1px solid var(--border)">Tela touch, intermediário entre celular e notebook</td></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)">📟 Servidor</td><td style="padding:8px;border:1px solid var(--border)">Fica em data centers, armazena sites e dados</td></tr>
      </table>
      <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
        <strong>📓 Copie:</strong> Desktop: fixo e potente | Notebook: portátil com bateria | Tablet: tela touch | Servidor: armazena dados na internet
      </div>`
    ],
    perguntas: [
      { pergunta: "Como chamamos todas as partes FÍSICAS do computador?", opcoes: [{texto:"Software",correta:false},{texto:"Hardware",correta:true},{texto:"Internet",correta:false},{texto:"RAM",correta:false}] },
      { pergunta: "Qual componente é chamado de 'cérebro' do computador?", opcoes: [{texto:"Monitor",correta:false},{texto:"Teclado",correta:false},{texto:"CPU (Processador)",correta:true},{texto:"Impressora",correta:false}] },
      { pergunta: "O que é a memória RAM?", opcoes: [{texto:"Armazena arquivos permanentemente",correta:false},{texto:"Guarda dados temporariamente enquanto usa o computador",correta:true},{texto:"É o mesmo que HD",correta:false},{texto:"É a placa de vídeo",correta:false}] },
      { pergunta: "Qual é mais rápido para armazenamento permanente: HD ou SSD?", opcoes: [{texto:"HD",correta:false},{texto:"SSD",correta:true},{texto:"São iguais",correta:false},{texto:"Depende da cor",correta:false}] },
      { pergunta: "Qual é a sequência correta do ciclo do computador?", opcoes: [{texto:"Saída → Processamento → Entrada",correta:false},{texto:"Processamento → Entrada → Saída",correta:false},{texto:"Entrada → Processamento → Saída",correta:true},{texto:"Entrada → Saída → Processamento",correta:false}] },
      { pergunta: "O mouse é um dispositivo de:", opcoes: [{texto:"Saída",correta:false},{texto:"Entrada",correta:true},{texto:"Processamento",correta:false},{texto:"Armazenamento",correta:false}] },
      { pergunta: "O monitor é um dispositivo de:", opcoes: [{texto:"Entrada",correta:false},{texto:"Processamento",correta:false},{texto:"Saída",correta:true},{texto:"Armazenamento",correta:false}] },
      { pergunta: "Um computador portátil com bateria é chamado de:", opcoes: [{texto:"Desktop",correta:false},{texto:"Servidor",correta:false},{texto:"Notebook",correta:true},{texto:"Tablet",correta:false}] },
      { pergunta: "Qual componente processa imagens e gráficos na tela?", opcoes: [{texto:"CPU",correta:false},{texto:"RAM",correta:false},{texto:"HD",correta:false},{texto:"Placa de Vídeo (GPU)",correta:true}] },
      { pergunta: "O teclado é um exemplo de dispositivo de:", opcoes: [{texto:"Saída",correta:false},{texto:"Entrada",correta:true},{texto:"Armazenamento",correta:false},{texto:"Processamento",correta:false}] },
      { pergunta: "Qual componente guarda seus arquivos PERMANENTEMENTE?", opcoes: [{texto:"RAM",correta:false},{texto:"CPU",correta:false},{texto:"HD ou SSD",correta:true},{texto:"Monitor",correta:false}] },
      { pergunta: "A impressora é um dispositivo de:", opcoes: [{texto:"Entrada",correta:false},{texto:"Processamento",correta:false},{texto:"Saída",correta:true},{texto:"Armazenamento",correta:false}] }
    ]
  },

  // ══════════════════════════════════════════════════════
  // AULA 2 — SOFTWARE E SISTEMA OPERACIONAL
  // ══════════════════════════════════════════════════════
  {
    id: 2,
    titulo: "Software e Sistema Operacional",
    descricao: "Entenda o que são programas e como o Windows funciona",
    icone: "💿",
    passos: [
      `<h3 style="margin-bottom:10px;color:var(--accent)">💿 O que é Software?</h3>
      <p><strong>Software</strong> são os <em>programas</em> que fazem o computador funcionar. Diferente do hardware, o software é intangível — você não pode tocar, mas pode usar.</p>
      <div style="display:grid;gap:8px;margin-top:12px">
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">🪟 <strong>Sistema Operacional</strong> — gerencia tudo (Ex: Windows, Linux, macOS)</div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">📝 <strong>Aplicativos</strong> — programas para tarefas específicas (Word, Chrome, Paint)</div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">🔒 <strong>Antivírus</strong> — protege o computador de ameaças</div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">🎮 <strong>Jogos</strong> — programas de entretenimento</div>
      </div>
      <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
        <strong>📓 Copie:</strong> Software = programas (não se pode tocar)<br>
        Tipos: Sistema Operacional, Aplicativos, Jogos, Antivírus
      </div>`,

      `<h3 style="margin-bottom:10px;color:var(--accent)">🪟 Sistemas Operacionais</h3>
      <p>O <strong>Sistema Operacional (SO)</strong> é o programa principal. Ele faz a ponte entre hardware e programas.</p>
      <table style="width:100%;border-collapse:collapse;margin-top:12px;font-size:13px">
        <tr style="background:rgba(79,142,247,.15)"><th style="padding:8px;border:1px solid var(--border)">Sistema</th><th style="padding:8px;border:1px solid var(--border)">Onde é usado</th></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)">🪟 Windows</td><td style="padding:8px;border:1px solid var(--border)">PCs e notebooks (mais comum no Brasil)</td></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)">🍎 macOS</td><td style="padding:8px;border:1px solid var(--border)">Computadores Apple (Mac)</td></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)">🐧 Linux</td><td style="padding:8px;border:1px solid var(--border)">Servidores e usuários avançados</td></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)">🤖 Android</td><td style="padding:8px;border:1px solid var(--border)">Celulares e tablets</td></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)">📱 iOS</td><td style="padding:8px;border:1px solid var(--border)">iPhone e iPad</td></tr>
      </table>
      <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
        <strong>📓 Copie:</strong> SO mais usado em PCs: Windows | Apple: macOS | Celular: Android ou iOS
      </div>`,

      `<h3 style="margin-bottom:10px;color:var(--accent)">🪟 Área de Trabalho do Windows</h3>
      <p>Quando o Windows inicia, você vê a <strong>Área de Trabalho</strong>. Conheça seus elementos:</p>
      <div style="display:grid;gap:8px;margin-top:12px">
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">🖼️ <strong>Área de Trabalho (Desktop)</strong> — tela principal com os atalhos</div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">📋 <strong>Barra de Tarefas</strong> — barra embaixo com programas abertos</div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">🟦 <strong>Botão Iniciar</strong> — acessa todos os programas instalados</div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">🔍 <strong>Barra de Pesquisa</strong> — busca programas e arquivos</div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">🕐 <strong>Relógio</strong> — canto direito, mostra hora e data</div>
      </div>`,

      `<h3 style="margin-bottom:10px;color:var(--accent)">🖱️ Usando o Mouse</h3>
      <p>O mouse é o principal controle do computador. Aprenda seus movimentos:</p>
      <div style="display:grid;gap:8px;margin-top:12px">
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">👆 <strong>Clique simples</strong> — seleciona itens</div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">👆👆 <strong>Clique duplo</strong> — abre pastas e programas</div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">🖱️ <strong>Clique direito</strong> — abre menu de opções</div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">🔄 <strong>Scroll</strong> — rola a página para cima ou baixo</div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">↔️ <strong>Arrastar</strong> — clicar, segurar e mover</div>
      </div>
      <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
        <strong>📓 Copie:</strong> Clique simples: seleciona | Duplo: abre | Direito: menu de opções | Scroll: rola | Arrastar: mover
      </div>`
    ],
    perguntas: [
      { pergunta: "O que é SOFTWARE?", opcoes: [{texto:"Partes físicas do computador",correta:false},{texto:"Os programas que rodam no computador",correta:true},{texto:"O cabo de energia",correta:false},{texto:"A memória RAM",correta:false}] },
      { pergunta: "Qual é o Sistema Operacional mais usado em PCs no Brasil?", opcoes: [{texto:"macOS",correta:false},{texto:"Linux",correta:false},{texto:"Windows",correta:true},{texto:"Android",correta:false}] },
      { pergunta: "O Sistema Operacional dos celulares Apple (iPhone) é:", opcoes: [{texto:"Android",correta:false},{texto:"Windows",correta:false},{texto:"iOS",correta:true},{texto:"Linux",correta:false}] },
      { pergunta: "O que faz o Sistema Operacional?", opcoes: [{texto:"Imprime documentos",correta:false},{texto:"Gerencia o hardware e permite usar outros programas",correta:true},{texto:"Conecta à internet",correta:false},{texto:"Armazena fotos",correta:false}] },
      { pergunta: "Qual é a diferença entre Hardware e Software?", opcoes: [{texto:"Hardware são programas, Software são peças",correta:false},{texto:"Hardware são peças físicas, Software são programas",correta:true},{texto:"São a mesma coisa",correta:false},{texto:"Hardware é só a CPU",correta:false}] },
      { pergunta: "O antivírus é um exemplo de:", opcoes: [{texto:"Hardware",correta:false},{texto:"Monitor",correta:false},{texto:"Software",correta:true},{texto:"Dispositivo de entrada",correta:false}] },
      { pergunta: "Para acessar todos os programas instalados no Windows, usa-se:", opcoes: [{texto:"O relógio",correta:false},{texto:"O Botão Iniciar",correta:true},{texto:"A impressora",correta:false},{texto:"O scroll do mouse",correta:false}] },
      { pergunta: "O Sistema Operacional dos celulares Android foi criado por:", opcoes: [{texto:"Apple",correta:false},{texto:"Microsoft",correta:false},{texto:"Google",correta:true},{texto:"Samsung",correta:false}] },
      { pergunta: "Para abrir uma pasta, o clique correto é:", opcoes: [{texto:"Clique direito",correta:false},{texto:"Scroll",correta:false},{texto:"Clique duplo",correta:true},{texto:"Arrastar",correta:false}] },
      { pergunta: "Qual sistema operacional é mais usado em servidores?", opcoes: [{texto:"Windows",correta:false},{texto:"iOS",correta:false},{texto:"Android",correta:false},{texto:"Linux",correta:true}] },
      { pergunta: "O macOS é o sistema operacional dos computadores:", opcoes: [{texto:"Dell",correta:false},{texto:"Apple (Mac)",correta:true},{texto:"Samsung",correta:false},{texto:"LG",correta:false}] }
    ]
  },

  // ══════════════════════════════════════════════════════
  // AULA 3 — LIGANDO E DESLIGANDO
  // ══════════════════════════════════════════════════════
  {
    id: 3,
    titulo: "Ligando e Desligando o PC",
    descricao: "Aprenda a ligar, desligar e reiniciar o computador do jeito certo",
    icone: "⚡",
    passos: [
      `<h3 style="margin-bottom:10px;color:var(--accent)">⚡ Como Ligar o Computador</h3>
      <p>Ligar corretamente evita problemas. Siga a ordem:</p>
      <ol style="margin:12px 0 0 20px;line-height:2.2;font-size:14px">
        <li>Verifique se está conectado à tomada</li>
        <li>Ligue o <strong>estabilizador ou filtro de linha</strong> primeiro</li>
        <li>Ligue o <strong>monitor</strong></li>
        <li>Pressione o botão <strong>Power</strong> no gabinete</li>
        <li>Aguarde o Windows carregar (1–2 minutos)</li>
        <li>Digite a <strong>senha</strong> se pedido</li>
      </ol>
      <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
        <strong>📓 Copie:</strong> Ordem: tomada → estabilizador → monitor → botão Power
      </div>`,

      `<h3 style="margin-bottom:10px;color:var(--accent)">🛑 Como Desligar Corretamente</h3>
      <p>⚠️ NUNCA pressione o botão Power para desligar! Use o menu:</p>
      <ol style="margin:12px 0 0 20px;line-height:2.2;font-size:14px">
        <li>Feche todos os programas</li>
        <li>Salve seus arquivos</li>
        <li>Clique em <strong>Iniciar</strong> → ícone de <strong>Energia ⏻</strong></li>
        <li>Clique em <strong>"Desligar"</strong></li>
        <li>Aguarde desligar completamente</li>
        <li>Desligue o monitor por último</li>
      </ol>
      <div style="margin-top:10px;padding:12px;background:rgba(248,113,113,.08);border-left:3px solid var(--danger);border-radius:6px;font-size:13px">
        ⚠️ Nunca puxe o cabo ou segure o botão Power — corrompe arquivos!
      </div>`,

      `<h3 style="margin-bottom:10px;color:var(--accent)">🔄 Reiniciar, Suspender e Hibernar</h3>
      <div style="display:grid;gap:8px;margin-top:12px">
        <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          🔄 <strong>Reiniciar</strong> — desliga e liga novamente. Use quando o PC estiver lento.
        </div>
        <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          😴 <strong>Suspender</strong> — dorme com pouco consumo de energia. Mova o mouse para acordar.
        </div>
        <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          💤 <strong>Hibernar</strong> — salva tudo e desliga. Retoma de onde parou ao ligar.
        </div>
      </div>
      <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
        <strong>📓 Copie:</strong> Reiniciar: reinicia | Suspender: dorme ligado | Hibernar: salva e desliga
      </div>`,

      `<h3 style="margin-bottom:10px;color:var(--accent)">🪟 Janelas: Minimizar, Maximizar e Fechar</h3>
      <p>Cada programa abre em uma <strong>janela</strong>. No canto superior direito:</p>
      <div style="display:grid;gap:8px;margin-top:12px">
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;font-size:13px">➖ <strong>Minimizar</strong> — esconde na barra de tarefas (não fecha)</div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;font-size:13px">⬜ <strong>Maximizar</strong> — deixa em tela cheia</div>
        <div style="padding:10px 14px;background:rgba(248,113,113,.08);border-radius:8px;font-size:13px">✕ <strong>Fechar (X)</strong> — fecha o programa completamente</div>
      </div>
      <p style="margin-top:12px;font-size:14px">Atalhos úteis:</p>
      <div style="display:grid;gap:6px;margin-top:8px">
        <div style="padding:8px 12px;background:rgba(79,142,247,.08);border-radius:6px;font-size:13px"><strong>Alt + F4</strong> — fecha o programa atual</div>
        <div style="padding:8px 12px;background:rgba(79,142,247,.08);border-radius:6px;font-size:13px"><strong>Windows + D</strong> — mostra a área de trabalho</div>
        <div style="padding:8px 12px;background:rgba(79,142,247,.08);border-radius:6px;font-size:13px"><strong>Alt + Tab</strong> — alterna entre programas abertos</div>
      </div>`
    ],
    perguntas: [
      { pergunta: "Qual é o jeito CORRETO de desligar o computador?", opcoes: [{texto:"Puxar o cabo de energia",correta:false},{texto:"Segurar o botão Power",correta:false},{texto:"Iniciar → Energia → Desligar",correta:true},{texto:"Fechar o monitor",correta:false}] },
      { pergunta: "O que acontece se você puxar o cabo de energia do computador?", opcoes: [{texto:"Nada de especial",correta:false},{texto:"Pode corromper arquivos e danificar o sistema",correta:true},{texto:"O computador salva tudo automaticamente",correta:false},{texto:"É a forma mais rápida de desligar",correta:false}] },
      { pergunta: "Qual opção DORME o computador mas mantém ligado com pouca energia?", opcoes: [{texto:"Desligar",correta:false},{texto:"Reiniciar",correta:false},{texto:"Suspender",correta:true},{texto:"Hibernar",correta:false}] },
      { pergunta: "A opção que SALVA tudo e desliga completamente é:", opcoes: [{texto:"Suspender",correta:false},{texto:"Hibernar",correta:true},{texto:"Minimizar",correta:false},{texto:"Reiniciar",correta:false}] },
      { pergunta: "Para reiniciar o computador, você vai em:", opcoes: [{texto:"Iniciar → Energia → Reiniciar",correta:true},{texto:"Puxar o cabo e ligar novamente",correta:false},{texto:"Fechar o monitor",correta:false},{texto:"Alt + F4",correta:false}] },
      { pergunta: "O botão que ESCONDE o programa na barra de tarefas (sem fechar) é:", opcoes: [{texto:"X (fechar)",correta:false},{texto:"⬜ Maximizar",correta:false},{texto:"➖ Minimizar",correta:true},{texto:"Alt+F4",correta:false}] },
      { pergunta: "Qual atalho fecha o programa atual?", opcoes: [{texto:"Ctrl+S",correta:false},{texto:"Alt+F4",correta:true},{texto:"Windows+D",correta:false},{texto:"Ctrl+Z",correta:false}] },
      { pergunta: "Qual a ordem correta para ligar o computador?", opcoes: [{texto:"Monitor → Botão Power → Estabilizador",correta:false},{texto:"Tomada → Estabilizador → Monitor → Botão Power",correta:true},{texto:"Botão Power → Monitor → Tomada",correta:false},{texto:"Qualquer ordem funciona",correta:false}] },
      { pergunta: "O atalho Windows + D serve para:", opcoes: [{texto:"Deletar arquivos",correta:false},{texto:"Mostrar a área de trabalho",correta:true},{texto:"Desligar o computador",correta:false},{texto:"Abrir o Word",correta:false}] },
      { pergunta: "Quando devo reiniciar o computador?", opcoes: [{texto:"Nunca",correta:false},{texto:"Quando o PC estiver lento ou após instalar programas",correta:true},{texto:"Toda hora",correta:false},{texto:"Só quando ligar pela primeira vez",correta:false}] }
    ]
  },

  // ══════════════════════════════════════════════════════
  // AULA 4 — EXPLORADOR DE ARQUIVOS E PASTAS
  // ══════════════════════════════════════════════════════
  {
    id: 4,
    titulo: "Pastas e Explorador de Arquivos",
    descricao: "Aprenda a organizar seus arquivos criando e gerenciando pastas",
    icone: "📁",
    passos: [
      `<h3 style="margin-bottom:10px;color:var(--accent)">📁 Arquivos e Pastas</h3>
      <p>No computador, tudo é organizado em <strong>arquivos</strong> e <strong>pastas</strong>:</p>
      <div style="display:grid;gap:8px;margin-top:12px">
        <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          📄 <strong>Arquivo</strong> — documento, foto, música ou programa<br>
          <span style="color:var(--muted)">Exemplos: trabalho.docx, foto.jpg, música.mp3</span>
        </div>
        <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          📁 <strong>Pasta</strong> — gaveta que guarda arquivos<br>
          <span style="color:var(--muted)">Você cria pastas para organizar seus arquivos</span>
        </div>
      </div>
      <table style="width:100%;border-collapse:collapse;margin-top:10px;font-size:13px">
        <tr style="background:rgba(79,142,247,.15)"><th style="padding:6px 8px;border:1px solid var(--border)">Extensão</th><th style="padding:6px 8px;border:1px solid var(--border)">Tipo</th></tr>
        <tr><td style="padding:6px 8px;border:1px solid var(--border)">.docx</td><td style="padding:6px 8px;border:1px solid var(--border)">Documento Word</td></tr>
        <tr><td style="padding:6px 8px;border:1px solid var(--border)">.xlsx</td><td style="padding:6px 8px;border:1px solid var(--border)">Planilha Excel</td></tr>
        <tr><td style="padding:6px 8px;border:1px solid var(--border)">.jpg/.png</td><td style="padding:6px 8px;border:1px solid var(--border)">Imagem/Foto</td></tr>
        <tr><td style="padding:6px 8px;border:1px solid var(--border)">.pdf</td><td style="padding:6px 8px;border:1px solid var(--border)">Documento fixo</td></tr>
        <tr><td style="padding:6px 8px;border:1px solid var(--border)">.mp3</td><td style="padding:6px 8px;border:1px solid var(--border)">Música</td></tr>
      </table>`,

      `<h3 style="margin-bottom:10px;color:var(--accent)">🗂️ Explorador de Arquivos</h3>
      <p>O <strong>Explorador de Arquivos</strong> é o programa para ver e organizar arquivos. Como abrir:</p>
      <div style="display:grid;gap:8px;margin-top:10px">
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">📁 Ícone de pasta amarela na barra de tarefas</div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">⌨️ Tecla <strong>Windows + E</strong></div>
      </div>
      <p style="margin-top:12px;font-size:13px">Partes do Explorador:</p>
      <div style="display:grid;gap:6px;margin-top:8px">
        <div style="padding:8px 12px;background:rgba(79,142,247,.08);border-radius:6px;font-size:13px">⬅️ <strong>Painel esquerdo</strong> — Downloads, Documentos, Desktop</div>
        <div style="padding:8px 12px;background:rgba(79,142,247,.08);border-radius:6px;font-size:13px">📂 <strong>Área central</strong> — arquivos e pastas do local atual</div>
        <div style="padding:8px 12px;background:rgba(79,142,247,.08);border-radius:6px;font-size:13px">🔗 <strong>Barra de endereço</strong> — mostra em qual pasta você está</div>
      </div>`,

      `<h3 style="margin-bottom:10px;color:var(--accent)">📁 Criar, Copiar e Mover Pastas</h3>
      <p><strong>Criar pasta:</strong></p>
      <ol style="margin:8px 0 12px 20px;font-size:13px;line-height:1.9">
        <li>Clique com o <strong>botão direito</strong> em área vazia</li>
        <li>Clique em <strong>"Novo" → "Pasta"</strong></li>
        <li>Digite o nome e pressione <strong>Enter</strong></li>
      </ol>
      <p><strong>Atalhos de arquivos:</strong></p>
      <div style="display:grid;gap:6px;margin-top:8px">
        <div style="padding:8px 12px;background:rgba(79,142,247,.08);border-radius:6px;font-size:13px"><strong>Ctrl+C</strong> — Copiar | <strong>Ctrl+V</strong> — Colar | <strong>Ctrl+X</strong> — Recortar</div>
        <div style="padding:8px 12px;background:rgba(79,142,247,.08);border-radius:6px;font-size:13px"><strong>Delete</strong> — Enviar para Lixeira | <strong>F2</strong> — Renomear</div>
        <div style="padding:8px 12px;background:rgba(79,142,247,.08);border-radius:6px;font-size:13px"><strong>Ctrl+Z</strong> — Desfazer última ação</div>
      </div>
      <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
        <strong>📓 Copie:</strong> Copiar: Ctrl+C | Colar: Ctrl+V | Recortar: Ctrl+X | Desfazer: Ctrl+Z
      </div>`,

      `<h3 style="margin-bottom:10px;color:var(--accent)">🗑️ Lixeira e Backup</h3>
      <div style="display:grid;gap:8px;margin-top:12px">
        <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          🗑️ <strong>Lixeira</strong> — arquivos deletados ficam aqui antes de sumir para sempre<br>
          Para restaurar: abra a Lixeira → clique direito → Restaurar<br>
          Para esvaziar: clique direito na Lixeira → Esvaziar Lixeira
        </div>
        <div style="padding:12px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          💾 <strong>Backup</strong> — cópia de segurança dos seus arquivos importantes<br>
          Faça backup em: pen drive, HD externo ou nuvem (Google Drive, OneDrive)
        </div>
      </div>
      <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
        <strong>📓 Copie:</strong> Lixeira: guarda arquivos deletados temporariamente<br>
        Backup: cópia de segurança em pen drive, HD externo ou nuvem
      </div>`
    ],
    perguntas: [
      { pergunta: "Qual extensão identifica um documento do Word?", opcoes: [{texto:".jpg",correta:false},{texto:".mp3",correta:false},{texto:".docx",correta:true},{texto:".pdf",correta:false}] },
      { pergunta: "Como abrir o Explorador de Arquivos rapidamente?", opcoes: [{texto:"Ctrl+E",correta:false},{texto:"Windows+E",correta:true},{texto:"Alt+F4",correta:false},{texto:"Ctrl+P",correta:false}] },
      { pergunta: "Para COPIAR um arquivo, o atalho é:", opcoes: [{texto:"Ctrl+V",correta:false},{texto:"Ctrl+X",correta:false},{texto:"Ctrl+C",correta:true},{texto:"Ctrl+Z",correta:false}] },
      { pergunta: "Para COLAR um arquivo copiado, o atalho é:", opcoes: [{texto:"Ctrl+C",correta:false},{texto:"Ctrl+V",correta:true},{texto:"Ctrl+X",correta:false},{texto:"Delete",correta:false}] },
      { pergunta: "Quando você aperta Delete num arquivo, ele vai para:", opcoes: [{texto:"Sumiu para sempre",correta:false},{texto:"A Lixeira",correta:true},{texto:"O pen drive",correta:false},{texto:"A área de transferência",correta:false}] },
      { pergunta: "O que é Backup?", opcoes: [{texto:"Um vírus de computador",correta:false},{texto:"Uma pasta especial do Windows",correta:false},{texto:"Cópia de segurança dos arquivos importantes",correta:true},{texto:"Um programa para jogar",correta:false}] },
      { pergunta: "Para RENOMEAR um arquivo, a tecla usada é:", opcoes: [{texto:"Delete",correta:false},{texto:"F2",correta:true},{texto:"F5",correta:false},{texto:"Ctrl+R",correta:false}] },
      { pergunta: "Qual extensão é usada para imagens/fotos?", opcoes: [{texto:".docx",correta:false},{texto:".mp3",correta:false},{texto:".xlsx",correta:false},{texto:".jpg",correta:true}] },
      { pergunta: "Para DESFAZER uma ação, o atalho é:", opcoes: [{texto:"Ctrl+C",correta:false},{texto:"Ctrl+Z",correta:true},{texto:"Ctrl+S",correta:false},{texto:"Ctrl+A",correta:false}] },
      { pergunta: "O atalho Ctrl+X serve para:", opcoes: [{texto:"Fechar o programa",correta:false},{texto:"Recortar (cortar) o arquivo",correta:true},{texto:"Copiar o arquivo",correta:false},{texto:"Salvar o arquivo",correta:false}] },
      { pergunta: "Onde ficam os arquivos antes de serem deletados definitivamente?", opcoes: [{texto:"Documentos",correta:false},{texto:"Downloads",correta:false},{texto:"Lixeira",correta:true},{texto:"Desktop",correta:false}] }
    ]
  },

  // ══════════════════════════════════════════════════════
  // AULA 5 — INTERNET E NAVEGADOR
  // ══════════════════════════════════════════════════════
  {
    id: 5,
    titulo: "Internet e Navegador",
    descricao: "Aprenda a usar a internet com segurança e navegar em sites",
    icone: "🌐",
    passos: [
      `<h3 style="margin-bottom:10px;color:var(--accent)">🌐 O que é a Internet?</h3>
      <p>A <strong>Internet</strong> é uma rede mundial que conecta bilhões de computadores, permitindo troca de informações.</p>
      <div style="display:grid;gap:8px;margin-top:12px">
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">🌍 <strong>WWW (World Wide Web)</strong> — conjunto de sites e páginas</div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">📧 <strong>E-mail</strong> — mensagens eletrônicas</div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">☁️ <strong>Nuvem (Cloud)</strong> — armazenar arquivos online</div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">📺 <strong>Streaming</strong> — assistir vídeos online (YouTube, Netflix)</div>
      </div>
      <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
        <strong>📓 Copie:</strong> Internet = rede mundial de computadores<br>
        Usos: sites, e-mail, nuvem, streaming, redes sociais
      </div>`,

      `<h3 style="margin-bottom:10px;color:var(--accent)">🔍 Navegadores e Motores de Busca</h3>
      <p>Para acessar a internet, você precisa de um <strong>navegador</strong>:</p>
      <table style="width:100%;border-collapse:collapse;margin-top:10px;font-size:13px">
        <tr style="background:rgba(79,142,247,.15)"><th style="padding:8px;border:1px solid var(--border)">Navegador</th><th style="padding:8px;border:1px solid var(--border)">Quem fez</th></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)">🌐 Google Chrome</td><td style="padding:8px;border:1px solid var(--border)">Google (mais usado)</td></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)">🦊 Firefox</td><td style="padding:8px;border:1px solid var(--border)">Mozilla</td></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)">🔵 Edge</td><td style="padding:8px;border:1px solid var(--border)">Microsoft</td></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)">🧭 Safari</td><td style="padding:8px;border:1px solid var(--border)">Apple</td></tr>
      </table>
      <p style="margin-top:12px;font-size:13px"><strong>Motores de busca</strong> (pesquisa): Google, Bing, DuckDuckGo</p>`,

      `<h3 style="margin-bottom:10px;color:var(--accent)">🔒 Segurança na Internet</h3>
      <div style="display:grid;gap:8px;margin-top:12px">
        <div style="padding:12px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          ✅ <strong>https://</strong> no início do endereço = site seguro (cadeado)<br>
          <span style="color:var(--muted)">O "s" significa que os dados são criptografados</span>
        </div>
        <div style="padding:12px;background:rgba(248,113,113,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          ❌ Nunca clique em links de e-mails desconhecidos (phishing)<br>
          ❌ Nunca informe senha, CPF ou dados bancários em sites suspeitos<br>
          ❌ Cuidado com pop-ups de "você ganhou um prêmio!"
        </div>
      </div>
      <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
        <strong>📓 Copie:</strong> Site seguro: começa com https:// e tem cadeado 🔒<br>
        Phishing: golpe por e-mail para roubar dados
      </div>`,

      `<h3 style="margin-bottom:10px;color:var(--accent)">📧 E-mail e Redes Sociais</h3>
      <p>Partes de um <strong>endereço de e-mail</strong>: <strong>nome@dominio.com</strong></p>
      <div style="display:grid;gap:8px;margin-top:10px">
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">👤 <strong>nome</strong> — identificação do usuário</div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">@ <strong>arroba</strong> — separa nome do domínio</div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">🌐 <strong>dominio.com</strong> — empresa que gerencia (gmail.com, hotmail.com)</div>
      </div>
      <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
        <strong>📓 Copie:</strong> E-mail: nome@dominio.com (ex: joao@gmail.com)<br>
        Use senhas diferentes e fortes para cada conta!
      </div>`
    ],
    perguntas: [
      { pergunta: "O que indica que um site é seguro?", opcoes: [{texto:"Ter um logo bonito",correta:false},{texto:"Começar com https:// e ter cadeado",correta:true},{texto:"Ser muito colorido",correta:false},{texto:"Ter muitos anúncios",correta:false}] },
      { pergunta: "Qual é o navegador mais usado no mundo?", opcoes: [{texto:"Firefox",correta:false},{texto:"Safari",correta:false},{texto:"Google Chrome",correta:true},{texto:"Edge",correta:false}] },
      { pergunta: "O que é phishing?", opcoes: [{texto:"Um tipo de vírus que destrói arquivos",correta:false},{texto:"Golpe por e-mail para roubar dados pessoais",correta:true},{texto:"Um programa de edição de fotos",correta:false},{texto:"Um tipo de backup",correta:false}] },
      { pergunta: "No e-mail joao@gmail.com, o que significa o @?", opcoes: [{texto:"Indica que é um endereço seguro",correta:false},{texto:"Separa o nome do usuário do domínio",correta:true},{texto:"É o nome do servidor",correta:false},{texto:"Indica o país do usuário",correta:false}] },
      { pergunta: "O navegador Safari foi criado por:", opcoes: [{texto:"Google",correta:false},{texto:"Microsoft",correta:false},{texto:"Mozilla",correta:false},{texto:"Apple",correta:true}] },
      { pergunta: "O que é a nuvem (cloud computing)?", opcoes: [{texto:"Armazenar arquivos em servidores na internet",correta:true},{texto:"Um tipo de vírus",correta:false},{texto:"A memória RAM do computador",correta:false},{texto:"Um navegador de internet",correta:false}] },
      { pergunta: "O que é streaming?", opcoes: [{texto:"Baixar músicas ilegalmente",correta:false},{texto:"Assistir/ouvir conteúdo online sem baixar",correta:true},{texto:"Enviar e-mails em lote",correta:false},{texto:"Fazer backup na internet",correta:false}] },
      { pergunta: "Qual provedor de e-mail pertence ao Google?", opcoes: [{texto:"Hotmail",correta:false},{texto:"Yahoo Mail",correta:false},{texto:"Gmail",correta:true},{texto:"Outlook",correta:false}] },
      { pergunta: "O que você NÃO deve fazer na internet?", opcoes: [{texto:"Verificar se o site tem https://",correta:false},{texto:"Usar senhas diferentes para cada conta",correta:false},{texto:"Clicar em links de e-mails desconhecidos",correta:true},{texto:"Fechar pop-ups suspeitos",correta:false}] },
      { pergunta: "WWW significa:", opcoes: [{texto:"Windows Web Wireless",correta:false},{texto:"World Wide Web",correta:true},{texto:"Web World Wide",correta:false},{texto:"Wireless Web Windows",correta:false}] }
    ]
  },

  // ══════════════════════════════════════════════════════
  // AULA 6 — WORD: CRIANDO DOCUMENTOS
  // ══════════════════════════════════════════════════════
  {
    id: 6,
    titulo: "Word: Criando Documentos",
    descricao: "Aprenda a criar, formatar e salvar documentos no Microsoft Word",
    icone: "📝",
    passos: [
      `<h3 style="margin-bottom:10px;color:var(--accent)">📝 Abrindo o Microsoft Word</h3>
      <p>Como abrir o Word:</p>
      <ol style="margin:12px 0 0 20px;line-height:2.2;font-size:14px">
        <li>Clique no <strong>Botão Iniciar</strong></li>
        <li>Digite <strong>"Word"</strong> na barra de pesquisa</li>
        <li>Clique em <strong>Microsoft Word</strong></li>
        <li>Clique em <strong>"Documento em branco"</strong></li>
      </ol>
      <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
        <strong>📓 Copie:</strong> Abrir Word: Iniciar → digitar "Word" → Documento em branco
      </div>`,

      `<h3 style="margin-bottom:10px;color:var(--accent)">📋 As Abas do Word</h3>
      <table style="width:100%;border-collapse:collapse;margin-top:12px;font-size:13px">
        <tr style="background:rgba(79,142,247,.15)"><th style="padding:8px;border:1px solid var(--border)">Aba</th><th style="padding:8px;border:1px solid var(--border)">Para que serve</th></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)">📋 Página Inicial</td><td style="padding:8px;border:1px solid var(--border)">Formatar texto (negrito, fonte, cor...)</td></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)">➕ Inserir</td><td style="padding:8px;border:1px solid var(--border)">Tabelas, imagens, links, cabeçalho</td></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)">🎨 Design</td><td style="padding:8px;border:1px solid var(--border)">Temas e bordas do documento</td></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)">📐 Layout</td><td style="padding:8px;border:1px solid var(--border)">Margens, orientação, tamanho da folha</td></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)">🔍 Revisão</td><td style="padding:8px;border:1px solid var(--border)">Correção ortográfica e comentários</td></tr>
      </table>`,

      `<h3 style="margin-bottom:10px;color:var(--accent)">🔤 Fonte, Tamanho e Formatação</h3>
      <div style="display:grid;gap:8px;margin-top:12px">
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          🔤 <strong>Fonte</strong> — estilo da letra (Arial, Times New Roman, Calibri)<br>
          Padrão escolar: Arial ou Times New Roman, tamanho 12
        </div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          <strong>N</strong> Negrito: <strong>Ctrl+N</strong> &nbsp;|&nbsp; <em>I</em> Itálico: <strong>Ctrl+I</strong> &nbsp;|&nbsp; <u>S</u> Sublinhado: <strong>Ctrl+S</strong>
        </div>
      </div>
      <p style="margin-top:12px;font-size:13px"><strong>Alinhamentos:</strong></p>
      <div style="display:grid;gap:6px;margin-top:8px">
        <div style="padding:8px 12px;background:rgba(79,142,247,.08);border-radius:6px;font-size:13px">◀ Esquerda: Ctrl+Q &nbsp;|&nbsp; ▶◀ Centro: Ctrl+E &nbsp;|&nbsp; ▶ Direita: Ctrl+G &nbsp;|&nbsp; ◀▶ Justificado: Ctrl+J</div>
      </div>
      <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
        <strong>📓 Copie:</strong> Negrito: Ctrl+N | Itálico: Ctrl+I | Sublinhado: Ctrl+S<br>Centralizar: Ctrl+E | Justificar: Ctrl+J
      </div>`,

      `<h3 style="margin-bottom:10px;color:var(--accent)">💾 Salvar, Imprimir e Abrir</h3>
      <div style="display:grid;gap:8px;margin-top:12px">
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          💾 <strong>Salvar: Ctrl+S</strong> — salva o documento atual
        </div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          💾 <strong>Salvar Como: F12</strong> — salva com novo nome ou local
        </div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          🖨️ <strong>Imprimir: Ctrl+P</strong> — abre janela de impressão
        </div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          📂 <strong>Abrir: Ctrl+A</strong> — abre um documento existente
        </div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          📄 <strong>Novo: Ctrl+O</strong> — cria um documento em branco
        </div>
      </div>
      <div style="margin-top:12px;padding:12px;background:rgba(248,113,113,.08);border-left:3px solid var(--danger);border-radius:6px;font-size:13px">
        ⚠️ <strong>Salve sempre antes de fechar!</strong> Use Ctrl+S com frequência.
      </div>`
    ],
    perguntas: [
      { pergunta: "Qual atalho deixa o texto em NEGRITO no Word (versão PT)?", opcoes: [{texto:"Ctrl+B",correta:false},{texto:"Ctrl+N",correta:true},{texto:"Ctrl+G",correta:false},{texto:"Alt+N",correta:false}] },
      { pergunta: "Onde fica a opção de inserir uma TABELA no Word?", opcoes: [{texto:"Página Inicial",correta:false},{texto:"Design",correta:false},{texto:"Inserir",correta:true},{texto:"Revisão",correta:false}] },
      { pergunta: "Qual atalho SALVA o documento?", opcoes: [{texto:"Ctrl+P",correta:false},{texto:"Ctrl+S",correta:true},{texto:"Ctrl+A",correta:false},{texto:"F12",correta:false}] },
      { pergunta: "Qual atalho IMPRIME o documento?", opcoes: [{texto:"Ctrl+S",correta:false},{texto:"Ctrl+I",correta:false},{texto:"Ctrl+P",correta:true},{texto:"Ctrl+A",correta:false}] },
      { pergunta: "Para CENTRALIZAR o texto no Word:", opcoes: [{texto:"Ctrl+Q",correta:false},{texto:"Ctrl+E",correta:true},{texto:"Ctrl+G",correta:false},{texto:"Ctrl+J",correta:false}] },
      { pergunta: "A aba que tem ferramentas de FORMATAÇÃO de texto é:", opcoes: [{texto:"Inserir",correta:false},{texto:"Layout",correta:false},{texto:"Página Inicial",correta:true},{texto:"Revisão",correta:false}] },
      { pergunta: "Qual atalho coloca o texto em ITÁLICO?", opcoes: [{texto:"Ctrl+N",correta:false},{texto:"Ctrl+I",correta:true},{texto:"Ctrl+S",correta:false},{texto:"Ctrl+U",correta:false}] },
      { pergunta: "Para JUSTIFICAR o texto (alinhado dos dois lados):", opcoes: [{texto:"Ctrl+Q",correta:false},{texto:"Ctrl+E",correta:false},{texto:"Ctrl+G",correta:false},{texto:"Ctrl+J",correta:true}] },
      { pergunta: "A aba LAYOUT serve para:", opcoes: [{texto:"Inserir imagens",correta:false},{texto:"Corrigir ortografia",correta:false},{texto:"Configurar margens e tamanho da folha",correta:true},{texto:"Mudar a fonte",correta:false}] },
      { pergunta: "Qual atalho abre a janela 'Salvar Como'?", opcoes: [{texto:"Ctrl+S",correta:false},{texto:"Ctrl+A",correta:false},{texto:"F12",correta:true},{texto:"Ctrl+N",correta:false}] }
    ]
  },

  // ══════════════════════════════════════════════════════
  // AULA 7 — EXCEL: PLANILHAS
  // ══════════════════════════════════════════════════════
  {
    id: 7,
    titulo: "Excel: Planilhas e Fórmulas",
    descricao: "Aprenda a criar planilhas, inserir dados e usar fórmulas básicas",
    icone: "📊",
    passos: [
      `<h3 style="margin-bottom:10px;color:var(--accent)">📊 O que é o Excel?</h3>
      <p>O <strong>Microsoft Excel</strong> é um programa de planilhas eletrônicas. Serve para organizar dados, fazer cálculos e criar gráficos.</p>
      <p style="margin-top:10px;font-size:13px">Conceitos básicos:</p>
      <div style="display:grid;gap:8px;margin-top:8px">
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">📋 <strong>Célula</strong> — cada quadrinho da planilha (ex: A1, B2)</div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">➡️ <strong>Coluna</strong> — letras A, B, C... (vertical)</div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">⬇️ <strong>Linha</strong> — números 1, 2, 3... (horizontal)</div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">📑 <strong>Planilha (Sheet)</strong> — cada aba do arquivo Excel</div>
      </div>`,

      `<h3 style="margin-bottom:10px;color:var(--accent)">🔢 Fórmulas Básicas</h3>
      <p>Toda fórmula no Excel começa com <strong>=</strong></p>
      <table style="width:100%;border-collapse:collapse;margin-top:12px;font-size:13px">
        <tr style="background:rgba(79,142,247,.15)"><th style="padding:8px;border:1px solid var(--border)">Fórmula</th><th style="padding:8px;border:1px solid var(--border)">O que faz</th><th style="padding:8px;border:1px solid var(--border)">Exemplo</th></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)">=SOMA()</td><td style="padding:8px;border:1px solid var(--border)">Soma valores</td><td style="padding:8px;border:1px solid var(--border)">=SOMA(A1:A5)</td></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)">=MÉDIA()</td><td style="padding:8px;border:1px solid var(--border)">Calcula a média</td><td style="padding:8px;border:1px solid var(--border)">=MÉDIA(B1:B10)</td></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)">=MÁXIMO()</td><td style="padding:8px;border:1px solid var(--border)">Maior valor</td><td style="padding:8px;border:1px solid var(--border)">=MÁXIMO(C1:C8)</td></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)">=MÍNIMO()</td><td style="padding:8px;border:1px solid var(--border)">Menor valor</td><td style="padding:8px;border:1px solid var(--border)">=MÍNIMO(C1:C8)</td></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)">=CONT.NÚM()</td><td style="padding:8px;border:1px solid var(--border)">Conta números</td><td style="padding:8px;border:1px solid var(--border)">=CONT.NÚM(A1:A10)</td></tr>
      </table>`,

      `<h3 style="margin-bottom:10px;color:var(--accent)">📈 Criando Gráficos</h3>
      <p>Como criar um gráfico no Excel:</p>
      <ol style="margin:12px 0 0 20px;line-height:2.2;font-size:14px">
        <li>Selecione os dados que quer incluir no gráfico</li>
        <li>Clique na aba <strong>Inserir</strong></li>
        <li>Clique em <strong>Gráfico</strong></li>
        <li>Escolha o tipo: barras, pizza, linha...</li>
        <li>Clique em <strong>OK</strong></li>
      </ol>
      <div style="display:grid;gap:8px;margin-top:12px">
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">📊 <strong>Barras/Colunas</strong> — comparar quantidades</div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">🥧 <strong>Pizza</strong> — mostrar porcentagens</div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">📈 <strong>Linha</strong> — mostrar evolução ao longo do tempo</div>
      </div>`,

      `<h3 style="margin-bottom:10px;color:var(--accent)">🎨 Formatando a Planilha</h3>
      <div style="display:grid;gap:8px;margin-top:12px">
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          🔢 <strong>Formatar número</strong> — clique direito → Formatar Células → Número/Moeda/Porcentagem
        </div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          📏 <strong>Ajustar largura da coluna</strong> — arrastar a borda da letra da coluna
        </div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          🎨 <strong>Cor de fundo</strong> — Página Inicial → ícone do balde de tinta
        </div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          🔗 <strong>Mesclar células</strong> — Página Inicial → Mesclar e Centralizar
        </div>
      </div>
      <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
        <strong>📓 Copie:</strong> Fórmula começa com = | =SOMA() soma | =MÉDIA() tira média<br>
        Gráfico: selecionar dados → Inserir → Gráfico
      </div>`
    ],
    perguntas: [
      { pergunta: "Qual símbolo inicia uma fórmula no Excel?", opcoes: [{texto:"#",correta:false},{texto:"@",correta:false},{texto:"=",correta:true},{texto:"$",correta:false}] },
      { pergunta: "Para criar um gráfico no Excel, qual aba você usa?", opcoes: [{texto:"Página Inicial",correta:false},{texto:"Fórmulas",correta:false},{texto:"Inserir",correta:true},{texto:"Dados",correta:false}] },
      { pergunta: "Como se chama cada quadrinho da planilha Excel?", opcoes: [{texto:"Linha",correta:false},{texto:"Coluna",correta:false},{texto:"Célula",correta:true},{texto:"Planilha",correta:false}] },
      { pergunta: "A fórmula =SOMA(A1:A5) faz o quê?", opcoes: [{texto:"Calcula a média de A1 até A5",correta:false},{texto:"Soma todos os valores de A1 até A5",correta:true},{texto:"Conta os números de A1 a A5",correta:false},{texto:"Multiplica A1 por A5",correta:false}] },
      { pergunta: "No Excel, as colunas são identificadas por:", opcoes: [{texto:"Números: 1, 2, 3...",correta:false},{texto:"Letras: A, B, C...",correta:true},{texto:"Símbolos: *, #, @...",correta:false},{texto:"Cores",correta:false}] },
      { pergunta: "Qual fórmula calcula a MÉDIA de valores?", opcoes: [{texto:"=SOMA()",correta:false},{texto:"=MÁXIMO()",correta:false},{texto:"=MÉDIA()",correta:true},{texto:"=CONT.NÚM()",correta:false}] },
      { pergunta: "Qual tipo de gráfico é melhor para mostrar porcentagens?", opcoes: [{texto:"Barras",correta:false},{texto:"Linha",correta:false},{texto:"Pizza",correta:true},{texto:"Dispersão",correta:false}] },
      { pergunta: "As linhas no Excel são identificadas por:", opcoes: [{texto:"Letras: A, B, C...",correta:false},{texto:"Números: 1, 2, 3...",correta:true},{texto:"Cores",correta:false},{texto:"Símbolos",correta:false}] },
      { pergunta: "A fórmula =MÁXIMO() serve para:", opcoes: [{texto:"Somar todos os valores",correta:false},{texto:"Calcular a média",correta:false},{texto:"Encontrar o maior valor",correta:true},{texto:"Contar células",correta:false}] },
      { pergunta: "Para mesclar e centralizar células no Excel, vai em:", opcoes: [{texto:"Inserir → Mesclar",correta:false},{texto:"Página Inicial → Mesclar e Centralizar",correta:true},{texto:"Layout → Mesclar",correta:false},{texto:"Dados → Mesclar",correta:false}] }
    ]
  },

  // ══════════════════════════════════════════════════════
  // AULA 8 — DIGITAÇÃO E TECLADO
  // ══════════════════════════════════════════════════════
  {
    id: 8,
    titulo: "Digitação e Teclado",
    descricao: "Aprenda a usar o teclado com eficiência e os atalhos mais importantes",
    icone: "⌨️",
    passos: [
      `<h3 style="margin-bottom:10px;color:var(--accent)">⌨️ Regiões do Teclado</h3>
      <p>O teclado tem diferentes regiões com funções específicas:</p>
      <div style="display:grid;gap:8px;margin-top:12px">
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">🔢 <strong>Teclas de função (F1–F12)</strong> — linha superior, atalhos especiais</div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">🔤 <strong>Teclas alfanumérico</strong> — letras, números e símbolos</div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">🗺️ <strong>Teclas de navegação</strong> — setas ↑↓←→, Home, End, PgUp, PgDn</div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">🔢 <strong>Teclado numérico</strong> — lado direito, para digitar números rápido</div>
      </div>`,

      `<h3 style="margin-bottom:10px;color:var(--accent)">⌨️ Teclas Especiais Importantes</h3>
      <table style="width:100%;border-collapse:collapse;margin-top:12px;font-size:13px">
        <tr style="background:rgba(79,142,247,.15)"><th style="padding:8px;border:1px solid var(--border)">Tecla</th><th style="padding:8px;border:1px solid var(--border)">Função</th></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)"><strong>Enter ↵</strong></td><td style="padding:8px;border:1px solid var(--border)">Confirmar / nova linha</td></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)"><strong>Backspace ←</strong></td><td style="padding:8px;border:1px solid var(--border)">Apagar letra antes do cursor</td></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)"><strong>Delete</strong></td><td style="padding:8px;border:1px solid var(--border)">Apagar letra depois do cursor</td></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)"><strong>Shift</strong></td><td style="padding:8px;border:1px solid var(--border)">Maiúsculas temporárias / caracteres alternativos</td></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)"><strong>Caps Lock</strong></td><td style="padding:8px;border:1px solid var(--border)">Liga/desliga maiúsculas permanente</td></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)"><strong>Tab ⇥</strong></td><td style="padding:8px;border:1px solid var(--border)">Tabulação / próximo campo</td></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)"><strong>Esc</strong></td><td style="padding:8px;border:1px solid var(--border)">Cancelar / fechar janelas</td></tr>
      </table>`,

      `<h3 style="margin-bottom:10px;color:var(--accent)">🚀 Atalhos Universais do Windows</h3>
      <div style="display:grid;gap:6px;margin-top:12px">
        <div style="padding:8px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px"><strong>Ctrl+C</strong> — Copiar | <strong>Ctrl+V</strong> — Colar | <strong>Ctrl+X</strong> — Recortar</div>
        <div style="padding:8px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px"><strong>Ctrl+Z</strong> — Desfazer | <strong>Ctrl+Y</strong> — Refazer</div>
        <div style="padding:8px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px"><strong>Ctrl+A</strong> — Selecionar tudo | <strong>Ctrl+F</strong> — Localizar</div>
        <div style="padding:8px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px"><strong>Ctrl+S</strong> — Salvar | <strong>Ctrl+P</strong> — Imprimir</div>
        <div style="padding:8px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px"><strong>Windows+L</strong> — Bloquear tela | <strong>Print Screen</strong> — Capturar tela</div>
      </div>
      <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
        <strong>📓 Copie os atalhos mais importantes!</strong>
      </div>`,

      `<h3 style="margin-bottom:10px;color:var(--accent)">✍️ Dicas de Digitação</h3>
      <p>Para digitar mais rápido e com menos erros:</p>
      <div style="display:grid;gap:8px;margin-top:12px">
        <div style="padding:10px 14px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">✅ Posicione os dedos na <strong>linha base</strong>: A S D F (mão esq) / J K L Ç (mão dir)</div>
        <div style="padding:10px 14px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">✅ Use os dois polegares para a <strong>barra de espaço</strong></div>
        <div style="padding:10px 14px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">✅ Olhe para a <strong>tela</strong>, não para o teclado</div>
        <div style="padding:10px 14px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">✅ Use <strong>Shift</strong> para letras maiúsculas e símbolos do teclado</div>
      </div>
      <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
        <strong>Caracteres especiais:</strong> @ = Shift+2 | # = Shift+3 | $ = Shift+4 | % = Shift+5
      </div>`
    ],
    perguntas: [
      { pergunta: "Qual tecla apaga a letra que está ANTES do cursor?", opcoes: [{texto:"Delete",correta:false},{texto:"Backspace",correta:true},{texto:"Esc",correta:false},{texto:"Tab",correta:false}] },
      { pergunta: "Qual tecla liga as letras maiúsculas permanentemente?", opcoes: [{texto:"Shift",correta:false},{texto:"Ctrl",correta:false},{texto:"Caps Lock",correta:true},{texto:"Alt",correta:false}] },
      { pergunta: "O atalho Ctrl+A serve para:", opcoes: [{texto:"Abrir um arquivo",correta:false},{texto:"Selecionar tudo",correta:true},{texto:"Fechar o programa",correta:false},{texto:"Salvar",correta:false}] },
      { pergunta: "Para LOCALIZAR texto num documento, o atalho é:", opcoes: [{texto:"Ctrl+L",correta:false},{texto:"Ctrl+B",correta:false},{texto:"Ctrl+F",correta:true},{texto:"Ctrl+H",correta:false}] },
      { pergunta: "Qual tecla cancela uma ação ou fecha uma janela?", opcoes: [{texto:"Enter",correta:false},{texto:"Tab",correta:false},{texto:"Delete",correta:false},{texto:"Esc",correta:true}] },
      { pergunta: "O atalho Ctrl+Y serve para:", opcoes: [{texto:"Desfazer a última ação",correta:false},{texto:"Refazer (o que foi desfeito)",correta:true},{texto:"Copiar",correta:false},{texto:"Colar",correta:false}] },
      { pergunta: "Para fazer uma letra maiúscula temporária, usa-se:", opcoes: [{texto:"Caps Lock",correta:false},{texto:"Ctrl",correta:false},{texto:"Shift",correta:true},{texto:"Alt",correta:false}] },
      { pergunta: "Para fazer Print Screen (capturar a tela):", opcoes: [{texto:"Ctrl+Print Screen",correta:false},{texto:"Print Screen ou PrtSc",correta:true},{texto:"Alt+F4",correta:false},{texto:"Windows+S",correta:false}] },
      { pergunta: "O atalho Windows+L serve para:", opcoes: [{texto:"Abrir o LibreOffice",correta:false},{texto:"Bloquear a tela do computador",correta:true},{texto:"Fazer logout",correta:false},{texto:"Abrir o último programa",correta:false}] },
      { pergunta: "A tecla Tab ⇥ serve para:", opcoes: [{texto:"Fechar o programa",correta:false},{texto:"Avançar tabulação ou ir para o próximo campo",correta:true},{texto:"Criar nova linha",correta:false},{texto:"Apagar texto",correta:false}] }
    ]
  }

,

  // ══════════════════════════════════════════════════════
  // AULA 9 — SEGURANÇA NA INTERNET
  // ══════════════════════════════════════════════════════
  {
    id: 9,
    titulo: "Segurança na Internet",
    descricao: "Aprenda a se proteger online e evitar golpes e vírus",
    icone: "🔐",
    passos: [
      `<h3 style="margin-bottom:10px;color:var(--accent)">🔐 Por que a Segurança Online é Importante?</h3>
      <p>A internet é muito útil, mas também tem riscos. Pessoas mal-intencionadas tentam roubar senhas, dados e dinheiro. Saber se proteger é essencial!</p>
      <div style="display:grid;gap:8px;margin-top:12px">
        <div style="padding:10px 14px;background:rgba(248,113,113,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">🦠 <strong>Vírus</strong> — programa malicioso que danifica o computador</div>
        <div style="padding:10px 14px;background:rgba(248,113,113,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">🎣 <strong>Phishing</strong> — golpe para roubar senhas por e-mail falso</div>
        <div style="padding:10px 14px;background:rgba(248,113,113,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">🔒 <strong>Ransomware</strong> — bloqueia seus arquivos e pede resgate</div>
        <div style="padding:10px 14px;background:rgba(248,113,113,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">👤 <strong>Roubo de identidade</strong> — criminoso usa seus dados pessoais</div>
      </div>
      <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
        <strong>📓 Copie:</strong> Ameaças online: vírus, phishing, ransomware, roubo de identidade
      </div>`,

      `<h3 style="margin-bottom:10px;color:var(--accent)">🔑 Senhas Seguras</h3>
      <p>Uma boa senha é a primeira linha de defesa. Aprenda a criar senhas fortes:</p>
      <div style="display:grid;gap:8px;margin-top:12px">
        <div style="padding:10px 14px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">✅ Use <strong>letras maiúsculas e minúsculas</strong> misturadas</div>
        <div style="padding:10px 14px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">✅ Inclua <strong>números e símbolos</strong> (!@#$%)</div>
        <div style="padding:10px 14px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">✅ Use <strong>mínimo 8 caracteres</strong> (quanto mais, melhor)</div>
        <div style="padding:10px 14px;background:rgba(248,113,113,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">❌ Nunca use: nome, data de nascimento, "123456", "senha"</div>
        <div style="padding:10px 14px;background:rgba(248,113,113,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">❌ Nunca use a mesma senha em vários sites</div>
      </div>
      <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
        <strong>Exemplo de senha fraca:</strong> <span style="color:var(--danger)">joao123</span><br>
        <strong>Exemplo de senha forte:</strong> <span style="color:var(--success)">J0@o#2024Segur0</span>
      </div>`,

      `<h3 style="margin-bottom:10px;color:var(--accent)">🎣 Reconhecendo Golpes (Phishing)</h3>
      <p>Phishing é quando alguém tenta te enganar fingindo ser uma empresa ou pessoa confiável:</p>
      <div style="display:grid;gap:8px;margin-top:12px">
        <div style="padding:10px 14px;background:rgba(251,191,36,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">⚠️ E-mail ou mensagem pedindo <strong>senha, CPF ou dados bancários</strong></div>
        <div style="padding:10px 14px;background:rgba(251,191,36,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">⚠️ Links com endereços <strong>parecidos mas errados</strong>: "bradesco-seguro.com"</div>
        <div style="padding:10px 14px;background:rgba(251,191,36,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">⚠️ Mensagens com <strong>urgência</strong>: "Sua conta será bloqueada!"</div>
        <div style="padding:10px 14px;background:rgba(251,191,36,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">⚠️ Prêmios ou promoções <strong>boas demais</strong> para ser verdade</div>
      </div>
      <div style="margin-top:12px;padding:12px;background:rgba(52,211,153,.08);border-left:3px solid var(--success);border-radius:6px;font-size:13px">
        <strong>✅ Regra de ouro:</strong> Banco e empresa séria NUNCA pedem senha por e-mail, WhatsApp ou telefone.
      </div>`,

      `<h3 style="margin-bottom:10px;color:var(--accent)">🛡️ Boas Práticas de Segurança</h3>
      <div style="display:grid;gap:8px;margin-top:12px">
        <div style="padding:10px 14px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">✅ <strong>Antivírus</strong> — instale e mantenha atualizado (Windows Defender é gratuito)</div>
        <div style="padding:10px 14px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">✅ <strong>Atualizações</strong> — sempre instale as atualizações do Windows e programas</div>
        <div style="padding:10px 14px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">✅ <strong>Wi-Fi público</strong> — evite acessar bancos em redes públicas (shopping, praça)</div>
        <div style="padding:10px 14px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">✅ <strong>Logout</strong> — sempre saia das contas em computadores compartilhados</div>
        <div style="padding:10px 14px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">✅ <strong>Cuidado com pendrive</strong> — nunca conecte pen drive desconhecido</div>
      </div>
      <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
        <strong>📓 Copie:</strong> Instalar antivírus | Atualizar o sistema | Evitar Wi-Fi público para dados sensíveis | Sempre fazer logout
      </div>`
    ],
    perguntas: [
      { pergunta: "O que é phishing?", opcoes: [{texto:"Um tipo de vírus que apaga arquivos",correta:false},{texto:"Golpe que tenta roubar senhas fingindo ser empresa confiável",correta:true},{texto:"Um programa antivírus gratuito",correta:false},{texto:"Uma forma de Wi-Fi seguro",correta:false}] },
      { pergunta: "Qual é uma característica de senha FORTE?", opcoes: [{texto:"Usar o nome do animal de estimação",correta:false},{texto:"Usar somente números",correta:false},{texto:"Misturar letras, números e símbolos com 8+ caracteres",correta:true},{texto:"Usar a data de nascimento",correta:false}] },
      { pergunta: "Um banco legítimo pode pedir sua senha por e-mail?", opcoes: [{texto:"Sim, se for urgente",correta:false},{texto:"Sim, se o e-mail parecer oficial",correta:false},{texto:"Nunca! Banco nunca pede senha por e-mail",correta:true},{texto:"Às vezes, para verificar a conta",correta:false}] },
      { pergunta: "O que é um antivírus?", opcoes: [{texto:"Um programa que deixa o computador mais lento",correta:false},{texto:"Um programa que protege o computador de softwares maliciosos",correta:true},{texto:"Um tipo de vírus menos perigoso",correta:false},{texto:"Um navegador de internet seguro",correta:false}] },
      { pergunta: "Por que não se deve usar a mesma senha em vários sites?", opcoes: [{texto:"Porque é mais difícil de lembrar",correta:false},{texto:"Porque se um site for hackeado, todas as contas ficam vulneráveis",correta:true},{texto:"Por causa das regras de cada site",correta:false},{texto:"Não há problema em usar a mesma senha",correta:false}] },
      { pergunta: "O que fazer ao usar um computador compartilhado (escola, lan house)?", opcoes: [{texto:"Salvar a senha para facilitar",correta:false},{texto:"Não precisa de cuidado especial",correta:false},{texto:"Fazer logout de todas as contas ao terminar",correta:true},{texto:"Só usar redes sociais, não há risco",correta:false}] },
      { pergunta: "Qual é um sinal de alerta de golpe virtual?", opcoes: [{texto:"Site com endereço .gov.br",correta:false},{texto:"Mensagem dizendo que você ganhou um prêmio inesperado",correta:true},{texto:"E-mail de confirmação de compra que você fez",correta:false},{texto:"Site de banco com cadeado no navegador",correta:false}] },
      { pergunta: "Ransomware é um tipo de ataque que:", opcoes: [{texto:"Melhora a velocidade do computador",correta:false},{texto:"Bloqueia seus arquivos e pede pagamento para liberá-los",correta:true},{texto:"Protege sua senha automaticamente",correta:false},{texto:"Envia spam para seus contatos",correta:false}] },
      { pergunta: "Ao acessar seu banco, o ideal é usar:", opcoes: [{texto:"Wi-Fi público do shopping para mais velocidade",correta:false},{texto:"Qualquer Wi-Fi disponível",correta:false},{texto:"Sua rede de casa ou dados móveis (4G)",correta:true},{texto:"Wi-Fi gratuito de praça ou aeroporto",correta:false}] },
      { pergunta: "O Windows Defender é:", opcoes: [{texto:"Um tipo de vírus do Windows",correta:false},{texto:"Um antivírus gratuito já incluído no Windows",correta:true},{texto:"Um programa pago de segurança",correta:false},{texto:"Uma extensão de navegador",correta:false}] }
    ]
  },

  // ══════════════════════════════════════════════════════
  // AULA 10 — E-MAIL E COMUNICAÇÃO DIGITAL
  // ══════════════════════════════════════════════════════
  {
    id: 10,
    titulo: "E-mail e Comunicação Digital",
    descricao: "Aprenda a usar e-mail profissionalmente e se comunicar online",
    icone: "📧",
    passos: [
      `<h3 style="margin-bottom:10px;color:var(--accent)">📧 O que é E-mail?</h3>
      <p>O <strong>e-mail</strong> (correio eletrônico) é um sistema de envio de mensagens pela internet. É muito usado no trabalho e em comunicações formais.</p>
      <div style="display:grid;gap:8px;margin-top:12px">
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">📬 <strong>Serviços gratuitos:</strong> Gmail (Google), Outlook (Microsoft), Yahoo</div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">🔑 <strong>Formato do endereço:</strong> nome@provedor.com (Ex: joao@gmail.com)</div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">📎 <strong>Anexos:</strong> arquivos (documentos, fotos) enviados junto ao e-mail</div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">📁 <strong>Pastas:</strong> Entrada, Enviados, Lixeira, Spam</div>
      </div>
      <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
        <strong>📓 Copie:</strong> E-mail = correio eletrônico | Formato: nome@provedor.com<br>
        Pastas: Entrada, Enviados, Lixeira, Spam
      </div>`,

      `<h3 style="margin-bottom:10px;color:var(--accent)">✍️ Como Escrever um E-mail Profissional</h3>
      <p>Um bom e-mail tem estrutura clara. Veja os campos principais:</p>
      <div style="display:grid;gap:8px;margin-top:12px">
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">📌 <strong>Para:</strong> endereço de e-mail do destinatário</div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">📋 <strong>Assunto:</strong> resumo breve do tema (sempre preencher!)</div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">📝 <strong>Corpo:</strong> saudação + mensagem + despedida</div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">📎 <strong>Anexo:</strong> arquivo adicional (se necessário)</div>
      </div>
      <div style="margin-top:12px;padding:12px;background:rgba(52,211,153,.08);border-left:3px solid var(--success);border-radius:6px;font-size:13px;line-height:1.9">
        <strong>Exemplo de e-mail:</strong><br>
        Assunto: Dúvida sobre atividade<br>
        Prezado Professor,<br>
        Tenho uma dúvida sobre a atividade da aula 3...<br>
        Atenciosamente, João
      </div>`,

      `<h3 style="margin-bottom:10px;color:var(--accent)">📱 Outras Formas de Comunicação Digital</h3>
      <table style="width:100%;border-collapse:collapse;margin-top:12px;font-size:13px">
        <tr style="background:rgba(79,142,247,.15)"><th style="padding:8px;border:1px solid var(--border)">Ferramenta</th><th style="padding:8px;border:1px solid var(--border)">Uso</th><th style="padding:8px;border:1px solid var(--border)">Tipo</th></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)">📧 E-mail</td><td style="padding:8px;border:1px solid var(--border)">Comunicação formal, trabalho</td><td style="padding:8px;border:1px solid var(--border)">Formal</td></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)">💬 WhatsApp</td><td style="padding:8px;border:1px solid var(--border)">Conversas rápidas, grupos</td><td style="padding:8px;border:1px solid var(--border)">Informal</td></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)">📹 Meet / Zoom</td><td style="padding:8px;border:1px solid var(--border)">Videochamadas, reuniões online</td><td style="padding:8px;border:1px solid var(--border)">Formal/Informal</td></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)">🐦 Redes Sociais</td><td style="padding:8px;border:1px solid var(--border)">Compartilhar informações</td><td style="padding:8px;border:1px solid var(--border)">Informal</td></tr>
      </table>
      <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
        <strong>📓 Dica:</strong> Para trabalho e escola, prefira e-mail. Para amigos, WhatsApp está ótimo!
      </div>`,

      `<h3 style="margin-bottom:10px;color:var(--accent)">⚠️ Cuidados com E-mail e Redes Sociais</h3>
      <div style="display:grid;gap:8px;margin-top:12px">
        <div style="padding:10px 14px;background:rgba(248,113,113,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">❌ Não abra anexos de remetentes desconhecidos</div>
        <div style="padding:10px 14px;background:rgba(248,113,113,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">❌ Não clique em links suspeitos em e-mails</div>
        <div style="padding:10px 14px;background:rgba(248,113,113,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">❌ Não compartilhe informações pessoais (endereço, CPF) em redes sociais</div>
        <div style="padding:10px 14px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">✅ Mantenha seu perfil em redes sociais no modo privado</div>
        <div style="padding:10px 14px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">✅ Pense antes de postar: o que você publica fica registrado</div>
      </div>
      <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
        <strong>📓 Regra de ouro:</strong> Antes de postar ou enviar, pergunte: "Me arrependerei disso amanhã?"
      </div>`
    ],
    perguntas: [
      { pergunta: "O que é um e-mail?", opcoes: [{texto:"Um programa de edição de texto",correta:false},{texto:"Um sistema de envio de mensagens pela internet",correta:true},{texto:"Um tipo de antivírus",correta:false},{texto:"Uma rede social",correta:false}] },
      { pergunta: "Qual é o formato correto de um endereço de e-mail?", opcoes: [{texto:"www.joao.gmail.com",correta:false},{texto:"joao@gmail.com",correta:true},{texto:"@joao.gmail",correta:false},{texto:"joao.gmail@",correta:false}] },
      { pergunta: "O campo 'Assunto' no e-mail serve para:", opcoes: [{texto:"Colocar o endereço do destinatário",correta:false},{texto:"Resumir o tema da mensagem",correta:true},{texto:"Adicionar arquivos ao e-mail",correta:false},{texto:"Assinar o e-mail",correta:false}] },
      { pergunta: "Anexo em um e-mail é:", opcoes: [{texto:"A assinatura no final do e-mail",correta:false},{texto:"O endereço do destinatário",correta:false},{texto:"Um arquivo enviado junto com a mensagem",correta:true},{texto:"O assunto do e-mail",correta:false}] },
      { pergunta: "Para comunicação formal (trabalho, escola), qual ferramenta é mais adequada?", opcoes: [{texto:"WhatsApp",correta:false},{texto:"Instagram",correta:false},{texto:"E-mail",correta:true},{texto:"TikTok",correta:false}] },
      { pergunta: "O que é spam?", opcoes: [{texto:"Um tipo de vírus de computador",correta:false},{texto:"E-mails indesejados ou lixo eletrônico",correta:true},{texto:"Um serviço de e-mail gratuito",correta:false},{texto:"Um arquivo anexado ao e-mail",correta:false}] },
      { pergunta: "O que você deve fazer com anexos de e-mails de desconhecidos?", opcoes: [{texto:"Abrir imediatamente",correta:false},{texto:"Abrir só se tiver um nome bonito",correta:false},{texto:"Não abrir — podem conter vírus",correta:true},{texto:"Encaminhar para amigos",correta:false}] },
      { pergunta: "Qual serviço é usado para videoconferências (reuniões com vídeo)?", opcoes: [{texto:"Gmail",correta:false},{texto:"Google Meet ou Zoom",correta:true},{texto:"WhatsApp Web",correta:false},{texto:"Outlook",correta:false}] },
      { pergunta: "Por que é importante pensar antes de postar nas redes sociais?", opcoes: [{texto:"Porque a internet é lenta",correta:false},{texto:"Porque o que é publicado pode ficar registrado e ser visto por muitos",correta:true},{texto:"Porque as redes sociais são pagas",correta:false},{texto:"Não é importante, pode postar à vontade",correta:false}] },
      { pergunta: "Qual é o Gmail?", opcoes: [{texto:"Um sistema operacional da Google",correta:false},{texto:"Um navegador de internet",correta:false},{texto:"Um serviço de e-mail gratuito da Google",correta:true},{texto:"Uma rede social",correta:false}] }
    ]
  },

  // ══════════════════════════════════════════════════════
  // AULA 11 — GOOGLE: PESQUISA E FERRAMENTAS
  // ══════════════════════════════════════════════════════
  {
    id: 11,
    titulo: "Google: Pesquisa e Ferramentas",
    descricao: "Use o Google de forma inteligente e conheça suas principais ferramentas",
    icone: "🔍",
    passos: [
      `<h3 style="margin-bottom:10px;color:var(--accent)">🔍 Pesquisando no Google</h3>
      <p>O Google é o buscador mais usado do mundo. Saber pesquisar bem economiza muito tempo!</p>
      <div style="display:grid;gap:8px;margin-top:12px">
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">💡 Use <strong>palavras-chave</strong> específicas, não frases completas</div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">💡 Coloque <strong>aspas</strong> para buscar uma frase exata: "receita de bolo de cenoura"</div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">💡 Use <strong>site:</strong> para buscar em um site específico: site:gov.br emprego</div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">💡 Adicione <strong>palavras negativas</strong> com traço: futebol -feminino</div>
      </div>
      <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
        <strong>📓 Copie:</strong><br>
        Boa pesquisa: usar palavras-chave específicas<br>
        Aspas = frase exata | site: = buscar em um site
      </div>`,

      `<h3 style="margin-bottom:10px;color:var(--accent)">🛠️ Ferramentas do Google</h3>
      <table style="width:100%;border-collapse:collapse;margin-top:12px;font-size:13px">
        <tr style="background:rgba(79,142,247,.15)"><th style="padding:8px;border:1px solid var(--border)">Ferramenta</th><th style="padding:8px;border:1px solid var(--border)">Para que serve</th></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)">📝 Google Docs</td><td style="padding:8px;border:1px solid var(--border)">Criar e editar documentos de texto (como Word)</td></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)">📊 Google Sheets</td><td style="padding:8px;border:1px solid var(--border)">Planilhas eletrônicas (como Excel)</td></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)">📽️ Google Slides</td><td style="padding:8px;border:1px solid var(--border)">Apresentações (como PowerPoint)</td></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)">💾 Google Drive</td><td style="padding:8px;border:1px solid var(--border)">Armazenar arquivos na nuvem (15GB grátis)</td></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)">🗓️ Google Agenda</td><td style="padding:8px;border:1px solid var(--border)">Organizar compromissos e eventos</td></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)">🗺️ Google Maps</td><td style="padding:8px;border:1px solid var(--border)">Mapas, rotas e localização</td></tr>
      </table>
      <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
        <strong>📓 Copie:</strong> Todas as ferramentas Google são gratuitas com uma conta Gmail!
      </div>`,

      `<h3 style="margin-bottom:10px;color:var(--accent)">☁️ O que é a Nuvem (Cloud)?</h3>
      <p>Guardar na <strong>nuvem</strong> significa salvar arquivos em servidores na internet, não só no seu computador.</p>
      <div style="display:grid;gap:8px;margin-top:12px">
        <div style="padding:10px 14px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">✅ Acesse seus arquivos de qualquer dispositivo</div>
        <div style="padding:10px 14px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">✅ Se o computador quebrar, seus arquivos estão seguros</div>
        <div style="padding:10px 14px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">✅ Compartilhe arquivos facilmente com outras pessoas</div>
        <div style="padding:10px 14px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">✅ Trabalhe em grupo no mesmo documento ao mesmo tempo</div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px;font-size:13px">
        <div style="padding:10px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);text-align:center">
          ☁️ <strong>Google Drive</strong><br>15GB grátis
        </div>
        <div style="padding:10px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);text-align:center">
          ☁️ <strong>OneDrive</strong><br>Microsoft, 5GB grátis
        </div>
      </div>`,

      `<h3 style="margin-bottom:10px;color:var(--accent)">⚠️ Informação Confiável na Internet</h3>
      <p>Nem tudo que aparece no Google é verdade. Aprenda a identificar fontes confiáveis:</p>
      <div style="display:grid;gap:8px;margin-top:12px">
        <div style="padding:10px 14px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">✅ Sites com <strong>.gov.br</strong> (governo), <strong>.edu.br</strong> (educação) são confiáveis</div>
        <div style="padding:10px 14px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">✅ <strong>Compare informações</strong> em mais de uma fonte</div>
        <div style="padding:10px 14px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">✅ Verifique a <strong>data da publicação</strong> — a informação é recente?</div>
        <div style="padding:10px 14px;background:rgba(248,113,113,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">❌ WhatsApp e redes sociais: muito <strong>fake news</strong>, sempre verifique</div>
        <div style="padding:10px 14px;background:rgba(248,113,113,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">❌ Desconfie de notícias <strong>sensacionalistas</strong> ou chocantes demais</div>
      </div>
      <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
        <strong>📓 Dica:</strong> Use o Google para checar notícias duvidosas antes de compartilhar!
      </div>`
    ],
    perguntas: [
      { pergunta: "Para buscar uma frase EXATA no Google, você deve:", opcoes: [{texto:"Escrever a frase em maiúsculas",correta:false},{texto:"Colocar a frase entre aspas",correta:true},{texto:"Usar ponto de exclamação no final",correta:false},{texto:"Escrever palavra por palavra separada",correta:false}] },
      { pergunta: "O Google Docs é equivalente a qual programa?", opcoes: [{texto:"Excel",correta:false},{texto:"PowerPoint",correta:false},{texto:"Word",correta:true},{texto:"Paint",correta:false}] },
      { pergunta: "O que é o Google Drive?", opcoes: [{texto:"Um programa para criar apresentações",correta:false},{texto:"Um serviço de armazenamento de arquivos na nuvem",correta:true},{texto:"Um navegador de internet",correta:false},{texto:"Um sistema operacional",correta:false}] },
      { pergunta: "Guardar arquivos na 'nuvem' significa:", opcoes: [{texto:"Salvar em um HD externo",correta:false},{texto:"Imprimir os documentos",correta:false},{texto:"Salvar em servidores na internet, acessíveis de qualquer lugar",correta:true},{texto:"Copiar para um pen drive",correta:false}] },
      { pergunta: "Qual domínio indica um site do governo brasileiro?", opcoes: [{texto:".com.br",correta:false},{texto:".org.br",correta:false},{texto:".gov.br",correta:true},{texto:".net.br",correta:false}] },
      { pergunta: "Quanto espaço gratuito o Google Drive oferece?", opcoes: [{texto:"1GB",correta:false},{texto:"5GB",correta:false},{texto:"15GB",correta:true},{texto:"50GB",correta:false}] },
      { pergunta: "O Google Sheets é usado para:", opcoes: [{texto:"Criar documentos de texto",correta:false},{texto:"Fazer planilhas eletrônicas",correta:true},{texto:"Fazer apresentações de slides",correta:false},{texto:"Editar fotos",correta:false}] },
      { pergunta: "Para buscar notícias no site do UOL usando o Google, você usaria:", opcoes: [{texto:"site:uol.com.br notícia",correta:true},{texto:"www.uol.com.br + notícia",correta:false},{texto:"uol notícia @site",correta:false},{texto:">uol< notícia",correta:false}] },
      { pergunta: "Qual vantagem de salvar na nuvem?", opcoes: [{texto:"O arquivo só fica disponível naquele computador",correta:false},{texto:"Arquivos acessíveis de qualquer dispositivo com internet",correta:true},{texto:"O arquivo não pode ser compartilhado",correta:false},{texto:"Ocupa espaço no HD do computador",correta:false}] },
      { pergunta: "Fake news são:", opcoes: [{texto:"Notícias de outros países",correta:false},{texto:"Notícias falsas ou enganosas",correta:true},{texto:"Notícias sobre tecnologia",correta:false},{texto:"Notícias muito antigas",correta:false}] }
    ]
  },

  // ══════════════════════════════════════════════════════
  // AULA 12 — REDES E CONECTIVIDADE
  // ══════════════════════════════════════════════════════
  {
    id: 12,
    titulo: "Redes e Conectividade",
    descricao: "Entenda como funciona a internet, Wi-Fi e redes de computadores",
    icone: "🌐",
    passos: [
      `<h3 style="margin-bottom:10px;color:var(--accent)">🌐 O que é a Internet?</h3>
      <p>A <strong>Internet</strong> é uma rede mundial que conecta bilhões de computadores e dispositivos ao redor do mundo. É como uma grande teia de informações.</p>
      <div style="display:grid;gap:8px;margin-top:12px">
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">🌍 Criada nos anos 1960 pelos Estados Unidos (projeto militar ARPANET)</div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">💻 Conecta computadores, celulares, tablets, TVs, câmeras...</div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">📡 Usa cabos (fibra óptica) e ondas (Wi-Fi, 4G/5G) para transmitir dados</div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">🔢 Cada dispositivo tem um endereço IP (Ex: 192.168.0.1)</div>
      </div>
      <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
        <strong>📓 Copie:</strong> Internet = rede mundial de computadores<br>
        IP = endereço único de cada dispositivo na rede
      </div>`,

      `<h3 style="margin-bottom:10px;color:var(--accent)">📡 Wi-Fi, Cabo e Dados Móveis</h3>
      <table style="width:100%;border-collapse:collapse;margin-top:12px;font-size:13px">
        <tr style="background:rgba(79,142,247,.15)"><th style="padding:8px;border:1px solid var(--border)">Tipo</th><th style="padding:8px;border:1px solid var(--border)">Como funciona</th><th style="padding:8px;border:1px solid var(--border)">Vantagem</th></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)">📶 Wi-Fi</td><td style="padding:8px;border:1px solid var(--border)">Ondas de rádio sem fio</td><td style="padding:8px;border:1px solid var(--border)">Sem fio, prático</td></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)">🔌 Cabo (Ethernet)</td><td style="padding:8px;border:1px solid var(--border)">Fio conectado ao roteador</td><td style="padding:8px;border:1px solid var(--border)">Mais estável e rápido</td></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)">📱 4G/5G</td><td style="padding:8px;border:1px solid var(--border)">Antenas da operadora</td><td style="padding:8px;border:1px solid var(--border)">Funciona em qualquer lugar</td></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)">🛰️ Fibra Óptica</td><td style="padding:8px;border:1px solid var(--border)">Luz em cabo de vidro</td><td style="padding:8px;border:1px solid var(--border)">Muito rápida e estável</td></tr>
      </table>
      <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
        <strong>📓 Dica:</strong> Para jogos e downloads grandes, prefira cabo ou fibra. Para uso do dia a dia, Wi-Fi é suficiente.
      </div>`,

      `<h3 style="margin-bottom:10px;color:var(--accent)">🔀 O que é um Roteador?</h3>
      <p>O <strong>roteador</strong> (ou modem) é o aparelho que distribui a internet dentro da sua casa ou escola.</p>
      <div style="display:grid;gap:8px;margin-top:12px">
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">📥 Recebe a internet da operadora (fibra, cabo coaxial...)</div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">📡 Distribui via Wi-Fi para todos os dispositivos</div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">🔌 Também tem portas de cabo (Ethernet) para conexão direta</div>
        <div style="padding:10px 14px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">💡 Se a internet parar: reiniciar o roteador resolve em muitos casos!</div>
      </div>
      <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
        <strong>📓 Copie:</strong> Roteador = distribui internet na casa/escola<br>
        SSID = nome da rede Wi-Fi | Senha do Wi-Fi = protege o acesso
      </div>`,

      `<h3 style="margin-bottom:10px;color:var(--accent)">📊 Velocidade de Internet e Download</h3>
      <p>A velocidade da internet é medida em <strong>Mbps</strong> (megabits por segundo):</p>
      <table style="width:100%;border-collapse:collapse;margin-top:12px;font-size:13px">
        <tr style="background:rgba(79,142,247,.15)"><th style="padding:8px;border:1px solid var(--border)">Velocidade</th><th style="padding:8px;border:1px solid var(--border)">Para que serve</th></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)">5–10 Mbps</td><td style="padding:8px;border:1px solid var(--border)">Redes sociais e e-mail</td></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)">25 Mbps</td><td style="padding:8px;border:1px solid var(--border)">Streaming de vídeo (Netflix, YouTube)</td></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)">100+ Mbps</td><td style="padding:8px;border:1px solid var(--border)">Downloads rápidos, vários usuários</td></tr>
      </table>
      <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px;line-height:1.9">
        <strong>📓 Copie:</strong><br>
        Download = receber dados da internet<br>
        Upload = enviar dados para a internet<br>
        Mbps = megabits por segundo (unidade de velocidade)
      </div>`
    ],
    perguntas: [
      { pergunta: "O que é a Internet?", opcoes: [{texto:"Um programa de computador",correta:false},{texto:"Uma rede mundial que conecta dispositivos",correta:true},{texto:"Um sistema operacional",correta:false},{texto:"Um tipo de processador",correta:false}] },
      { pergunta: "O que é um endereço IP?", opcoes: [{texto:"O endereço físico do computador",correta:false},{texto:"Um identificador único de cada dispositivo na rede",correta:true},{texto:"O nome da rede Wi-Fi",correta:false},{texto:"A senha do roteador",correta:false}] },
      { pergunta: "Qual tipo de conexão é mais ESTÁVEL e RÁPIDA?", opcoes: [{texto:"Wi-Fi",correta:false},{texto:"4G",correta:false},{texto:"Cabo Ethernet",correta:true},{texto:"Bluetooth",correta:false}] },
      { pergunta: "O que é um roteador?", opcoes: [{texto:"Um tipo de processador",correta:false},{texto:"Aparelho que distribui a internet dentro de um local",correta:true},{texto:"Um programa de navegação",correta:false},{texto:"Um cabo de internet",correta:false}] },
      { pergunta: "O que significa Mbps?", opcoes: [{texto:"Megabytes por segundo",correta:false},{texto:"Megabits por segundo (unidade de velocidade da internet)",correta:true},{texto:"Memória base por sistema",correta:false},{texto:"Módulo básico de processamento seguro",correta:false}] },
      { pergunta: "O que é Download?", opcoes: [{texto:"Enviar arquivos para a internet",correta:false},{texto:"Receber/baixar dados da internet para o seu dispositivo",correta:true},{texto:"Velocidade da internet",correta:false},{texto:"Apagar arquivos do computador",correta:false}] },
      { pergunta: "A fibra óptica transmite dados usando:", opcoes: [{texto:"Ondas de rádio",correta:false},{texto:"Sinais elétricos em cobre",correta:false},{texto:"Pulsos de luz em cabo de vidro",correta:true},{texto:"Sinais de satélite",correta:false}] },
      { pergunta: "Se a internet parar de funcionar, qual é a primeira coisa a tentar?", opcoes: [{texto:"Ligar para o fabricante do computador",correta:false},{texto:"Reinstalar o Windows",correta:false},{texto:"Reiniciar o roteador",correta:true},{texto:"Trocar o cabo de energia do computador",correta:false}] },
      { pergunta: "Para assistir a Netflix em boa qualidade, a velocidade mínima recomendada é:", opcoes: [{texto:"1 Mbps",correta:false},{texto:"25 Mbps",correta:true},{texto:"100 Mbps",correta:false},{texto:"500 Mbps",correta:false}] },
      { pergunta: "O Wi-Fi transmite dados usando:", opcoes: [{texto:"Cabos de fibra óptica",correta:false},{texto:"Ondas de rádio sem fio",correta:true},{texto:"Sinais de luz",correta:false},{texto:"Cabo Ethernet",correta:false}] }
    ]
  }

];

// ══════════════════════════════════════════════════════
// AULA 13 — ORGANIZAÇÃO DE ARQUIVOS NA NUVEM
// (PTD 1º Bimestre - Habilidade 1.1 / 1.2)
// ══════════════════════════════════════════════════════

AULAS.push({
  id: 13,
  titulo: "Arquivos na Nuvem e Backup",
  descricao: "Aprenda a salvar, sincronizar e proteger seus arquivos na nuvem com segurança",
  icone: "☁️",
  passos: [
    `<h3 style="margin-bottom:10px;color:var(--accent)">☁️ O que é a Nuvem?</h3>
    <p>A <strong>nuvem (cloud)</strong> é um conjunto de servidores conectados à internet que guardam seus arquivos fora do seu dispositivo. Assim você acessa de qualquer lugar.</p>
    <div style="display:grid;gap:8px;margin-top:12px">
      <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">🔵 <strong>Google Drive</strong> — 15 GB grátis, integrado ao Gmail</div>
      <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">🟦 <strong>OneDrive</strong> — da Microsoft, integrado ao Windows</div>
      <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">📦 <strong>Dropbox</strong> — popular para compartilhar arquivos grandes</div>
      <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">🍎 <strong>iCloud</strong> — exclusivo para dispositivos Apple</div>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px;line-height:1.9">
      <strong>📓 Copie:</strong> Nuvem = armazenamento online (servidores na internet)<br>
      Vantagens: acesso de qualquer lugar, backup automático, compartilhamento fácil
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">🔄 O que é Sincronização?</h3>
    <p>Sincronizar significa manter os arquivos <strong>atualizados em todos os seus dispositivos automaticamente</strong>. Editou no celular? Aparece no computador!</p>
    <div style="display:grid;gap:8px;margin-top:12px">
      <div style="padding:12px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid rgba(52,211,153,.3);font-size:13px">
        ✅ <strong>Automática:</strong> Qualquer mudança é enviada para a nuvem instantaneamente
      </div>
      <div style="padding:12px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid rgba(52,211,153,.3);font-size:13px">
        ✅ <strong>Multi-dispositivo:</strong> Computador, celular e tablet sempre atualizados
      </div>
      <div style="padding:12px;background:rgba(248,113,113,.08);border-radius:8px;border:1px solid rgba(248,113,113,.3);font-size:13px">
        ⚠️ <strong>Atenção:</strong> Precisa de internet para sincronizar. Offline, os arquivos ficam na versão anterior.
      </div>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
      <strong>📓 Copie:</strong> Sincronização = atualização automática em todos os dispositivos via internet
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">💾 Backup: Por que é tão importante?</h3>
    <p><strong>Backup</strong> é uma <em>cópia de segurança</em> dos seus arquivos. Se o computador estragar, for roubado ou pegar vírus, você não perde nada.</p>
    <table style="width:100%;border-collapse:collapse;margin-top:12px;font-size:13px">
      <tr style="background:rgba(79,142,247,.15)"><th style="padding:8px;border:1px solid var(--border)">Tipo</th><th style="padding:8px;border:1px solid var(--border)">Onde</th><th style="padding:8px;border:1px solid var(--border)">Segurança</th></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">☁️ Nuvem</td><td style="padding:8px;border:1px solid var(--border)">Google Drive, OneDrive</td><td style="padding:8px;border:1px solid var(--border)">Alta ✅</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">💿 HD Externo</td><td style="padding:8px;border:1px solid var(--border)">Dispositivo físico</td><td style="padding:8px;border:1px solid var(--border)">Média ⚠️</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">🖥️ Outro PC</td><td style="padding:8px;border:1px solid var(--border)">Rede local</td><td style="padding:8px;border:1px solid var(--border)">Média ⚠️</td></tr>
    </table>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px;line-height:1.9">
      <strong>📓 Copie:</strong> Regra 3-2-1: 3 cópias, em 2 locais diferentes, sendo 1 na nuvem
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">🔐 Privacidade e Segurança na Nuvem</h3>
    <p>Seus arquivos na nuvem precisam ser <strong>protegidos</strong>. Veja as boas práticas:</p>
    <div style="display:grid;gap:8px;margin-top:12px">
      <div style="padding:10px 14px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid rgba(52,211,153,.3);font-size:13px">🔑 Use <strong>senhas fortes</strong> — misture letras, números e símbolos</div>
      <div style="padding:10px 14px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid rgba(52,211,153,.3);font-size:13px">📱 Ative a <strong>verificação em 2 etapas</strong> — mais segurança mesmo se a senha vazar</div>
      <div style="padding:10px 14px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid rgba(52,211,153,.3);font-size:13px">🚫 Não compartilhe arquivos <strong>sensíveis publicamente</strong> — verifique quem tem acesso</div>
      <div style="padding:10px 14px;background:rgba(248,113,113,.08);border-radius:8px;border:1px solid rgba(248,113,113,.3);font-size:13px">⚠️ Cuidado com <strong>links suspeitos</strong> pedindo sua senha da nuvem</div>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
      <strong>📓 Copie:</strong> Proteger a nuvem: senha forte + verificação em 2 etapas + controle de compartilhamento
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">📁 Organizando Arquivos no Google Drive</h3>
    <p>Uma boa organização poupa tempo. Veja como organizar no Google Drive:</p>
    <div style="display:grid;gap:8px;margin-top:12px">
      <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">📂 <strong>Crie pastas por matéria/projeto</strong> — Ex: "Biologia", "TIC", "Pesquisas"</div>
      <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">🏷️ <strong>Use nomes claros nos arquivos</strong> — Ex: "Trabalho_Biologia_2026.docx"</div>
      <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">⭐ <strong>Marque com estrela</strong> os arquivos mais usados para acesso rápido</div>
      <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">🗑️ <strong>Esvazie a lixeira</strong> periodicamente para liberar espaço</div>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px;line-height:1.9">
      <strong>📓 Copie:</strong> Boas práticas: pastas organizadas + nomes descritivos + lixeira limpa
    </div>`
  ],
  perguntas: [
    { pergunta: "O que significa armazenar arquivos 'na nuvem'?", opcoes: [{texto:"Guardar em um pen drive",correta:false},{texto:"Guardar em servidores acessados pela internet",correta:true},{texto:"Guardar em CD ou DVD",correta:false},{texto:"Salvar na área de trabalho",correta:false}] },
    { pergunta: "Qual dessas opções é um serviço de armazenamento em nuvem?", opcoes: [{texto:"Bloco de Notas",correta:false},{texto:"Google Drive",correta:true},{texto:"Paint",correta:false},{texto:"Calculadora",correta:false}] },
    { pergunta: "O que é sincronização de arquivos?", opcoes: [{texto:"Deletar arquivos duplicados",correta:false},{texto:"Atualizar automaticamente arquivos em todos os dispositivos",correta:true},{texto:"Compactar arquivos em .zip",correta:false},{texto:"Formatar o computador",correta:false}] },
    { pergunta: "Qual é o objetivo do backup?", opcoes: [{texto:"Acelerar o computador",correta:false},{texto:"Ter uma cópia de segurança dos arquivos",correta:true},{texto:"Conectar à internet",correta:false},{texto:"Organizar a área de trabalho",correta:false}] },
    { pergunta: "O Google Drive oferece quantos GB gratuitos?", opcoes: [{texto:"5 GB",correta:false},{texto:"10 GB",correta:false},{texto:"15 GB",correta:true},{texto:"50 GB",correta:false}] },
    { pergunta: "Qual desses é um serviço de nuvem da Microsoft?", opcoes: [{texto:"iCloud",correta:false},{texto:"Dropbox",correta:false},{texto:"OneDrive",correta:true},{texto:"Mega",correta:false}] },
    { pergunta: "O que é a 'verificação em 2 etapas'?", opcoes: [{texto:"Fazer backup duas vezes",correta:false},{texto:"Camada extra de segurança além da senha",correta:true},{texto:"Salvar arquivos em 2 pastas",correta:false},{texto:"Sincronizar 2 dispositivos",correta:false}] },
    { pergunta: "O que acontece com arquivos na nuvem quando fica sem internet?", opcoes: [{texto:"São deletados",correta:false},{texto:"Ficam na versão anterior até sincronizar",correta:true},{texto:"Aparecem no computador automaticamente",correta:false},{texto:"São enviados por e-mail",correta:false}] },
    { pergunta: "Qual a regra de backup '3-2-1'?", opcoes: [{texto:"3 computadores, 2 HDs, 1 pendrive",correta:false},{texto:"3 cópias, em 2 locais diferentes, sendo 1 na nuvem",correta:true},{texto:"Fazer backup 3 vezes ao dia",correta:false},{texto:"3 GB, 2 pastas, 1 arquivo",correta:false}] },
    { pergunta: "Como nomear bem um arquivo?", opcoes: [{texto:"doc1.docx",correta:false},{texto:"arquivo_novo_final2.docx",correta:false},{texto:"Trabalho_Biologia_2026.docx",correta:true},{texto:"aaaaa.docx",correta:false}] }
  ]
});

// ══════════════════════════════════════════════════════
// AULA 14 — PENSAMENTO COMPUTACIONAL: INTRODUÇÃO
// (PTD 2º Bimestre - Habilidade 2.1)
// ══════════════════════════════════════════════════════

AULAS.push({
  id: 14,
  titulo: "Pensamento Computacional",
  descricao: "Aprenda a decompor problemas, reconhecer padrões e criar algoritmos para resolver desafios",
  icone: "🧩",
  passos: [
    `<h3 style="margin-bottom:10px;color:var(--accent)">🧩 O que é Pensamento Computacional?</h3>
    <p>O <strong>Pensamento Computacional (PC)</strong> é uma forma de resolver problemas de maneira organizada, lógica e eficiente — como um computador faria. Mas não precisa de computador!</p>
    <div style="margin-top:14px;padding:14px;background:rgba(79,142,247,.08);border-radius:10px;border:1px solid var(--border)">
      <p style="font-size:13px;line-height:1.9">💡 <strong>Exemplo do dia a dia:</strong> Fazer um bolo é como programar!<br>
      1. Separe os ingredientes (decomposição)<br>
      2. Siga a receita na ordem certa (algoritmo)<br>
      3. Repita o processo para outros bolos (padrão)<br>
      4. Ignore detalhes desnecessários (abstração)
      </p>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px;line-height:2">
      <strong>📓 Copie:</strong> Pensamento Computacional = forma lógica de resolver problemas<br>
      4 pilares: Decomposição | Padrões | Abstração | Algoritmos
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">🔧 1º Pilar: Decomposição</h3>
    <p><strong>Decompor</strong> significa <em>dividir um problema grande em partes menores</em> e mais fáceis de resolver.</p>
    <div style="display:grid;gap:8px;margin-top:12px">
      <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        <strong>Problema grande:</strong> "Criar um site escolar"<br>
        <strong>Decomposto em:</strong> design → textos → imagens → programação → publicação
      </div>
      <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        <strong>Problema grande:</strong> "Organizar uma festa"<br>
        <strong>Decomposto em:</strong> lista de convidados → local → comida → decoração → música
      </div>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px;line-height:1.9">
      <strong>📓 Copie:</strong> Decomposição = dividir o problema em partes menores e mais fáceis<br>
      Ex: Para fazer uma redação → escolher tema → pesquisar → rascunho → revisar → versão final
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">🔍 2º Pilar: Reconhecimento de Padrões</h3>
    <p><strong>Padrões</strong> são características <em>repetidas</em> em problemas ou dados. Identificá-los ajuda a resolver problemas mais rápido!</p>
    <div style="display:grid;gap:8px;margin-top:12px">
      <div style="padding:12px;background:rgba(124,106,247,.08);border-radius:8px;border:1px solid rgba(124,106,247,.3);font-size:13px">
        🔢 <strong>Padrão numérico:</strong> 2, 4, 6, 8, ___ (padrão: somar 2 → resposta: 10)
      </div>
      <div style="padding:12px;background:rgba(124,106,247,.08);border-radius:8px;border:1px solid rgba(124,106,247,.3);font-size:13px">
        🌐 <strong>Padrão em sites:</strong> Todo site tem cabeçalho, conteúdo e rodapé — sempre!
      </div>
      <div style="padding:12px;background:rgba(124,106,247,.08);border-radius:8px;border:1px solid rgba(124,106,247,.3);font-size:13px">
        📅 <strong>Padrão climático:</strong> Todo ano chove mais no verão → podemos prever e nos preparar
      </div>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px;line-height:1.9">
      <strong>📓 Copie:</strong> Padrão = repetição de características que podemos usar para resolver problemas<br>
      Ex: reconhecer que e-mails falsos sempre pedem senha urgente
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">🎯 3º Pilar: Abstração</h3>
    <p><strong>Abstração</strong> é <em>focar no que é importante</em> e ignorar os detalhes desnecessários para resolver um problema.</p>
    <div style="display:grid;gap:10px;margin-top:12px">
      <div style="padding:12px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid rgba(52,211,153,.3);font-size:13px">
        🗺️ <strong>Mapa do metrô:</strong> Não mostra ruas, prédios ou distâncias reais. Só o que importa: estações e linhas!
      </div>
      <div style="padding:12px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid rgba(52,211,153,.3);font-size:13px">
        📱 <strong>App de clima:</strong> Mostra temperatura e chuva. Não mostra pressão atmosférica detalhada (você não precisa disso no dia a dia).
      </div>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px;line-height:1.9">
      <strong>📓 Copie:</strong> Abstração = filtrar informações → manter só o essencial para o problema<br>
      Ex: Ao fazer um cadastro online, só pedimos nome, e-mail e senha — não toda a vida da pessoa
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">📋 4º Pilar: Algoritmos</h3>
    <p>Um <strong>algoritmo</strong> é uma <em>sequência de passos ordenados</em> para resolver um problema. É como uma receita ou manual de instruções!</p>
    <div style="margin-top:12px;padding:14px;background:rgba(79,142,247,.08);border-radius:10px;border:1px solid var(--border);font-size:13px;line-height:2">
      <strong>Algoritmo: Fazer uma pesquisa no Google</strong><br>
      1. Abrir o navegador<br>
      2. Acessar google.com.br<br>
      3. Digitar o que quer pesquisar<br>
      4. Pressionar Enter<br>
      5. Ler os resultados<br>
      6. Clicar no link mais relevante
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px;line-height:1.9">
      <strong>📓 Copie:</strong> Algoritmo = sequência lógica de passos para resolver um problema<br>
      Características: início definido, passos claros, ordem correta, resultado esperado
    </div>`
  ],
  perguntas: [
    { pergunta: "Quais são os 4 pilares do Pensamento Computacional?", opcoes: [{texto:"Soma, subtração, multiplicação e divisão",correta:false},{texto:"Decomposição, padrões, abstração e algoritmos",correta:true},{texto:"Hardware, software, internet e dados",correta:false},{texto:"Entrada, processamento, saída e armazenamento",correta:false}] },
    { pergunta: "O que é decomposição no Pensamento Computacional?", opcoes: [{texto:"Montar peças de hardware",correta:false},{texto:"Dividir um problema grande em partes menores",correta:true},{texto:"Criar um banco de dados",correta:false},{texto:"Instalar programas",correta:false}] },
    { pergunta: "Qual é um exemplo de decomposição?", opcoes: [{texto:"Aprender inglês = estudar vocabulário + gramática + conversação + escrita",correta:true},{texto:"2, 4, 6, 8 — o próximo é 10",correta:false},{texto:"Ignorar detalhes irrelevantes de um problema",correta:false},{texto:"Criar uma sequência de passos para uma tarefa",correta:false}] },
    { pergunta: "O que é reconhecimento de padrões?", opcoes: [{texto:"Programar em linguagem de máquina",correta:false},{texto:"Identificar características repetidas em problemas ou dados",correta:true},{texto:"Dividir um problema em partes menores",correta:false},{texto:"Criar um diagrama de fluxo",correta:false}] },
    { pergunta: "Na sequência 3, 6, 9, 12, qual é o próximo número?", opcoes: [{texto:"14",correta:false},{texto:"16",correta:false},{texto:"15",correta:true},{texto:"13",correta:false}] },
    { pergunta: "O que é abstração no Pensamento Computacional?", opcoes: [{texto:"Criar imagens artísticas com o computador",correta:false},{texto:"Focar no essencial e ignorar detalhes desnecessários",correta:true},{texto:"Fazer backup de arquivos",correta:false},{texto:"Calcular velocidade do processador",correta:false}] },
    { pergunta: "O mapa do metrô é um exemplo de:", opcoes: [{texto:"Algoritmo",correta:false},{texto:"Decomposição",correta:false},{texto:"Abstração",correta:true},{texto:"Padrão",correta:false}] },
    { pergunta: "O que é um algoritmo?", opcoes: [{texto:"Um vírus de computador",correta:false},{texto:"Uma sequência de passos ordenados para resolver um problema",correta:true},{texto:"Um tipo de memória RAM",correta:false},{texto:"Um sistema operacional",correta:false}] },
    { pergunta: "Qual dessas é uma característica de um bom algoritmo?", opcoes: [{texto:"Ter passos aleatórios e sem ordem",correta:false},{texto:"Ser secreto e complexo",correta:false},{texto:"Ter início definido e passos claros em ordem",correta:true},{texto:"Depender de sorte para funcionar",correta:false}] },
    { pergunta: "O Pensamento Computacional pode ser usado:", opcoes: [{texto:"Somente por programadores",correta:false},{texto:"Somente em aulas de informática",correta:false},{texto:"Em qualquer área: saúde, negócios, educação, etc.",correta:true},{texto:"Somente em computadores modernos",correta:false}] }
  ]
});

// ══════════════════════════════════════════════════════
// AULA 15 — FLUXOGRAMAS E ALGORITMOS VISUAIS
// (PTD 2º Bimestre - Habilidade 2.1 / 2.2)
// ══════════════════════════════════════════════════════

AULAS.push({
  id: 15,
  titulo: "Fluxogramas e Algoritmos",
  descricao: "Aprenda a representar soluções com fluxogramas e construir algoritmos passo a passo",
  icone: "📊",
  passos: [
    `<h3 style="margin-bottom:10px;color:var(--accent)">📊 O que é um Fluxograma?</h3>
    <p>Um <strong>fluxograma</strong> é uma representação <em>visual</em> de um algoritmo usando formas geométricas e setas. Facilita entender a lógica de um processo.</p>
    <div style="display:grid;gap:8px;margin-top:12px">
      <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px;display:flex;align-items:center;gap:10px">
        <span style="font-size:20px">⬭</span> <span><strong>Oval/Elipse</strong> — Início e Fim do processo</span>
      </div>
      <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px;display:flex;align-items:center;gap:10px">
        <span style="font-size:20px">▭</span> <span><strong>Retângulo</strong> — Processo / Ação a executar</span>
      </div>
      <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px;display:flex;align-items:center;gap:10px">
        <span style="font-size:20px">◇</span> <span><strong>Losango</strong> — Decisão (Sim ou Não)</span>
      </div>
      <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px;display:flex;align-items:center;gap:10px">
        <span style="font-size:20px">▱</span> <span><strong>Paralelogramo</strong> — Entrada ou Saída de dados</span>
      </div>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
      <strong>📓 Copie:</strong> Fluxograma = diagrama visual do algoritmo<br>
      Oval=início/fim | Retângulo=ação | Losango=decisão | Paralelogramo=dados
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">📋 Exemplo: Fluxograma de Login</h3>
    <p>Veja como funciona a lógica de um sistema de login representada em fluxograma:</p>
    <div style="margin-top:14px;display:flex;flex-direction:column;align-items:center;gap:6px;font-size:13px">
      <div style="background:rgba(52,211,153,.15);border:2px solid var(--success);border-radius:50px;padding:8px 24px;font-weight:bold">INÍCIO</div>
      <div style="font-size:18px;color:var(--accent)">↓</div>
      <div style="background:rgba(79,142,247,.1);border:1px solid var(--accent);border-radius:6px;padding:8px 20px;text-align:center">Usuário digita login e senha</div>
      <div style="font-size:18px;color:var(--accent)">↓</div>
      <div style="background:rgba(251,191,36,.1);border:1px solid var(--warn);border-radius:6px;padding:8px 20px;transform:rotate(0deg);text-align:center">◇ Senha correta?</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;width:100%;max-width:300px;margin-top:4px">
        <div style="text-align:center">
          <div style="color:var(--success);font-size:12px;margin-bottom:4px">SIM ✅</div>
          <div style="background:rgba(79,142,247,.1);border:1px solid var(--border);border-radius:6px;padding:8px;font-size:12px">Acesso liberado</div>
        </div>
        <div style="text-align:center">
          <div style="color:var(--danger);font-size:12px;margin-bottom:4px">NÃO ❌</div>
          <div style="background:rgba(79,142,247,.1);border:1px solid var(--border);border-radius:6px;padding:8px;font-size:12px">Mostrar erro e repetir</div>
        </div>
      </div>
      <div style="font-size:18px;color:var(--accent)">↓</div>
      <div style="background:rgba(248,113,113,.15);border:2px solid var(--danger);border-radius:50px;padding:8px 24px;font-weight:bold">FIM</div>
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">🔁 Estruturas de Controle</h3>
    <p>Algoritmos usam 3 estruturas básicas:</p>
    <div style="display:grid;gap:10px;margin-top:12px">
      <div style="padding:14px;background:rgba(79,142,247,.08);border-radius:10px;border:1px solid var(--border)">
        <div style="font-weight:bold;margin-bottom:6px;color:var(--accent)">1️⃣ Sequência</div>
        <div style="font-size:13px;color:var(--muted)">Passos executados um após o outro, na ordem.<br>Ex: Ligar → Digitar → Salvar → Fechar</div>
      </div>
      <div style="padding:14px;background:rgba(124,106,247,.08);border-radius:10px;border:1px solid rgba(124,106,247,.3)">
        <div style="font-weight:bold;margin-bottom:6px;color:var(--accent2)">2️⃣ Decisão (SE/ENTÃO/SENÃO)</div>
        <div style="font-size:13px;color:var(--muted)">Executa algo SE uma condição for verdadeira.<br>Ex: SE nota ≥ 5 → aprovado SENÃO → recuperação</div>
      </div>
      <div style="padding:14px;background:rgba(52,211,153,.08);border-radius:10px;border:1px solid rgba(52,211,153,.3)">
        <div style="font-weight:bold;margin-bottom:6px;color:var(--success)">3️⃣ Repetição (LOOP)</div>
        <div style="font-size:13px;color:var(--muted)">Repete uma ação enquanto uma condição for verdadeira.<br>Ex: ENQUANTO não acertar a senha → pedir novamente</div>
      </div>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
      <strong>📓 Copie:</strong> 3 estruturas: Sequência (ordem) | Decisão (SE/SENÃO) | Repetição (ENQUANTO/PARA)
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">✍️ Escrevendo Algoritmos em Pseudocódigo</h3>
    <p><strong>Pseudocódigo</strong> é escrever um algoritmo em linguagem próxima do português, antes de programar de verdade.</p>
    <div style="margin-top:12px;padding:14px;background:rgba(15,17,23,1);border-radius:10px;border:1px solid var(--border);font-family:monospace;font-size:13px;line-height:2;color:#e8eaf0">
      <span style="color:#7c6af7">ALGORITMO</span> CalcularMedia<br>
      &nbsp;&nbsp;<span style="color:#4f8ef7">LEIA</span> nota1, nota2, nota3<br>
      &nbsp;&nbsp;media ← (nota1 + nota2 + nota3) / 3<br>
      &nbsp;&nbsp;<span style="color:#fbbf24">SE</span> media >= 5 <span style="color:#fbbf24">ENTÃO</span><br>
      &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#34d399">ESCREVA</span> "Aprovado!"<br>
      &nbsp;&nbsp;<span style="color:#fbbf24">SENÃO</span><br>
      &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#f87171">ESCREVA</span> "Recuperação"<br>
      &nbsp;&nbsp;<span style="color:#fbbf24">FIM SE</span><br>
      <span style="color:#7c6af7">FIM ALGORITMO</span>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
      <strong>📓 Copie:</strong> Pseudocódigo = algoritmo escrito em português estruturado, sem preocupação com sintaxe de programação
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">🌍 Algoritmos no Cotidiano</h3>
    <p>Algoritmos estão em todo lugar! Veja onde os usamos sem perceber:</p>
    <table style="width:100%;border-collapse:collapse;margin-top:12px;font-size:13px">
      <tr style="background:rgba(79,142,247,.15)"><th style="padding:8px;border:1px solid var(--border)">Situação</th><th style="padding:8px;border:1px solid var(--border)">Algoritmo por trás</th></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">📍 GPS / Waze</td><td style="padding:8px;border:1px solid var(--border)">Calcula a rota mais rápida entre dois pontos</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">🎵 Spotify</td><td style="padding:8px;border:1px solid var(--border)">Recomenda músicas baseado no seu gosto</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">🛒 Mercado Livre</td><td style="padding:8px;border:1px solid var(--border)">Mostra produtos que você provavelmente quer comprar</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">📱 Face ID</td><td style="padding:8px;border:1px solid var(--border)">Compara seu rosto com o cadastrado para liberar acesso</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">🔍 Google</td><td style="padding:8px;border:1px solid var(--border)">Classifica bilhões de páginas para mostrar o mais relevante</td></tr>
    </table>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
      <strong>📓 Copie:</strong> Algoritmos estão em GPS, redes sociais, e-commerce, streaming e muito mais!
    </div>`
  ],
  perguntas: [
    { pergunta: "Qual símbolo representa uma DECISÃO em um fluxograma?", opcoes: [{texto:"Retângulo",correta:false},{texto:"Oval",correta:false},{texto:"Losango",correta:true},{texto:"Paralelogramo",correta:false}] },
    { pergunta: "O que representa o símbolo OVAL em um fluxograma?", opcoes: [{texto:"Uma ação ou processo",correta:false},{texto:"Início ou Fim",correta:true},{texto:"Uma decisão",correta:false},{texto:"Entrada de dados",correta:false}] },
    { pergunta: "Qual estrutura executa passos um após o outro, em ordem?", opcoes: [{texto:"Decisão",correta:false},{texto:"Repetição",correta:false},{texto:"Sequência",correta:true},{texto:"Abstração",correta:false}] },
    { pergunta: "A estrutura SE/ENTÃO/SENÃO é um exemplo de:", opcoes: [{texto:"Sequência",correta:false},{texto:"Decisão",correta:true},{texto:"Repetição",correta:false},{texto:"Decomposição",correta:false}] },
    { pergunta: "O que é pseudocódigo?", opcoes: [{texto:"Um vírus que imita código",correta:false},{texto:"Algoritmo escrito em português estruturado antes de programar",correta:true},{texto:"Código escondido no sistema",correta:false},{texto:"Uma linguagem de programação real",correta:false}] },
    { pergunta: "Qual estrutura de controle é usada quando queremos repetir uma ação?", opcoes: [{texto:"Sequência",correta:false},{texto:"Decisão",correta:false},{texto:"Repetição (loop)",correta:true},{texto:"Abstração",correta:false}] },
    { pergunta: "O algoritmo de GPS é responsável por:", opcoes: [{texto:"Tocar músicas no carro",correta:false},{texto:"Calcular a rota mais rápida entre dois pontos",correta:true},{texto:"Reconhecer o rosto do motorista",correta:false},{texto:"Verificar o nível de combustível",correta:false}] },
    { pergunta: "Em um fluxograma de login, o bloco 'Senha correta?' é representado por:", opcoes: [{texto:"Retângulo",correta:false},{texto:"Oval",correta:false},{texto:"Losango (decisão)",correta:true},{texto:"Paralelogramo",correta:false}] },
    { pergunta: "Qual é a ordem correta das estruturas num algoritmo de cálculo de média?", opcoes: [{texto:"Saída → Cálculo → Entrada",correta:false},{texto:"Entrada → Cálculo → Saída",correta:true},{texto:"Cálculo → Entrada → Saída",correta:false},{texto:"Saída → Entrada → Cálculo",correta:false}] },
    { pergunta: "Fluxogramas são usados para:", opcoes: [{texto:"Acelerar o processador",correta:false},{texto:"Representar visualmente a lógica de um algoritmo",correta:true},{texto:"Criar imagens artísticas",correta:false},{texto:"Aumentar a memória RAM",correta:false}] }
  ]
});

// ══════════════════════════════════════════════════════
// AULA 16 — INTELIGÊNCIA ARTIFICIAL: INTRODUÇÃO
// (PTD 2º Bimestre - Habilidade 3.2)
// ══════════════════════════════════════════════════════

AULAS.push({
  id: 16,
  titulo: "Inteligência Artificial: O que é?",
  descricao: "Descubra o que é IA, como surgiu, suas aplicações e a diferença entre IA tradicional e generativa",
  icone: "🤖",
  passos: [
    `<h3 style="margin-bottom:10px;color:var(--accent)">🤖 O que é Inteligência Artificial?</h3>
    <p>A <strong>Inteligência Artificial (IA)</strong> é a área da ciência que cria sistemas capazes de realizar tarefas que normalmente exigiriam inteligência humana — como aprender, raciocinar e tomar decisões.</p>
    <div style="margin-top:14px;padding:14px;background:rgba(79,142,247,.08);border-radius:10px;border:1px solid var(--border);font-size:13px;line-height:1.9">
      <strong>📅 Linha do tempo da IA:</strong><br>
      <span style="color:var(--accent)">1950</span> — Alan Turing propõe o "Teste de Turing" (máquina que imita humanos?)<br>
      <span style="color:var(--accent)">1956</span> — O termo "Inteligência Artificial" é criado<br>
      <span style="color:var(--accent)">1997</span> — Deep Blue (IBM) vence o campeão mundial de xadrez<br>
      <span style="color:var(--accent)">2011</span> — Watson (IBM) vence humanos no Jeopardy!<br>
      <span style="color:var(--accent)">2022</span> — ChatGPT lançado ao público e muda tudo!
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
      <strong>📓 Copie:</strong> IA = sistemas que simulam inteligência humana (aprendizado, raciocínio, decisão)
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">🔍 Principais Áreas da IA</h3>
    <p>A Inteligência Artificial possui várias subáreas. Conheça as principais:</p>
    <div style="display:grid;gap:8px;margin-top:12px">
      <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        👁️ <strong>Visão Computacional</strong><br><span style="color:var(--muted)">Computador "enxerga" e interpreta imagens. Ex: reconhecimento facial, carro autônomo</span>
      </div>
      <div style="padding:12px;background:rgba(124,106,247,.08);border-radius:8px;border:1px solid rgba(124,106,247,.3);font-size:13px">
        💬 <strong>PLN — Processamento de Linguagem Natural</strong><br><span style="color:var(--muted)">IA entende e gera texto humano. Ex: ChatGPT, Google Tradutor, Siri</span>
      </div>
      <div style="padding:12px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid rgba(52,211,153,.3);font-size:13px">
        🧠 <strong>Aprendizado de Máquina (Machine Learning)</strong><br><span style="color:var(--muted)">IA aprende com dados sem ser programada explicitamente. Ex: filtro de spam, recomendações</span>
      </div>
      <div style="padding:12px;background:rgba(251,191,36,.08);border-radius:8px;border:1px solid rgba(251,191,36,.3);font-size:13px">
        🕹️ <strong>Robótica Inteligente</strong><br><span style="color:var(--muted)">Robôs que aprendem e se adaptam. Ex: robôs da Amazon, braços cirúrgicos</span>
      </div>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
      <strong>📓 Copie:</strong> Áreas da IA: Visão Computacional | PLN | Machine Learning | Robótica
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">⚡ IA Tradicional vs IA Generativa</h3>
    <p>Existem dois grandes tipos de IA. Entenda a diferença:</p>
    <table style="width:100%;border-collapse:collapse;margin-top:12px;font-size:13px">
      <tr style="background:rgba(79,142,247,.15)"><th style="padding:8px;border:1px solid var(--border)">IA Tradicional</th><th style="padding:8px;border:1px solid var(--border)">IA Generativa</th></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">Analisa e classifica dados</td><td style="padding:8px;border:1px solid var(--border)">Cria conteúdo novo (texto, imagem, áudio)</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">Ex: detectar tumor em raio-X</td><td style="padding:8px;border:1px solid var(--border)">Ex: ChatGPT escreve uma redação</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">Ex: spam no e-mail</td><td style="padding:8px;border:1px solid var(--border)">Ex: MidJourney cria uma imagem</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">Ex: reconhecer face para desbloquear celular</td><td style="padding:8px;border:1px solid var(--border)">Ex: Gemini compõe uma música</td></tr>
    </table>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px;line-height:1.9">
      <strong>📓 Copie:</strong> IA Tradicional = analisa/classifica | IA Generativa = cria conteúdo novo
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">🌐 IA no seu Dia a Dia</h3>
    <p>Você já usa IA todos os dias! Veja onde ela está presente:</p>
    <div style="display:grid;gap:8px;margin-top:12px">
      <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">📱 <strong>Filtro de câmera</strong> — IA reconhece seu rosto e aplica efeitos em tempo real</div>
      <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">🎬 <strong>Netflix/YouTube</strong> — IA aprende seus gostos e recomenda o que assistir</div>
      <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">📧 <strong>Gmail</strong> — IA filtra spam e sugere respostas automáticas</div>
      <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">🗣️ <strong>Assistentes de voz</strong> — Siri, Alexa e Google Assistant entendem sua fala</div>
      <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">🏦 <strong>Banco</strong> — IA detecta transações suspeitas e bloqueia fraudes automaticamente</div>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
      <strong>📓 Copie:</strong> IA está em: câmeras, streaming, e-mail, assistentes de voz, bancos, saúde e muito mais
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">⚖️ IA: Benefícios e Desafios</h3>
    <p>A IA traz muitos benefícios, mas também levanta questões importantes:</p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px">
      <div>
        <div style="color:var(--success);font-weight:bold;margin-bottom:8px;font-size:13px">✅ BENEFÍCIOS</div>
        <div style="display:grid;gap:6px">
          <div style="padding:8px;background:rgba(52,211,153,.08);border-radius:6px;border:1px solid rgba(52,211,153,.3);font-size:12px">🏥 Diagnósticos médicos mais precisos</div>
          <div style="padding:8px;background:rgba(52,211,153,.08);border-radius:6px;border:1px solid rgba(52,211,153,.3);font-size:12px">⚡ Automação de tarefas repetitivas</div>
          <div style="padding:8px;background:rgba(52,211,153,.08);border-radius:6px;border:1px solid rgba(52,211,153,.3);font-size:12px">📚 Educação personalizada</div>
          <div style="padding:8px;background:rgba(52,211,153,.08);border-radius:6px;border:1px solid rgba(52,211,153,.3);font-size:12px">🔬 Aceleração da pesquisa científica</div>
        </div>
      </div>
      <div>
        <div style="color:var(--danger);font-weight:bold;margin-bottom:8px;font-size:13px">⚠️ DESAFIOS</div>
        <div style="display:grid;gap:6px">
          <div style="padding:8px;background:rgba(248,113,113,.08);border-radius:6px;border:1px solid rgba(248,113,113,.3);font-size:12px">🔒 Privacidade de dados</div>
          <div style="padding:8px;background:rgba(248,113,113,.08);border-radius:6px;border:1px solid rgba(248,113,113,.3);font-size:12px">🤖 Substituição de empregos</div>
          <div style="padding:8px;background:rgba(248,113,113,.08);border-radius:6px;border:1px solid rgba(248,113,113,.3);font-size:12px">😤 Viés algorítmico (preconceito)</div>
          <div style="padding:8px;background:rgba(248,113,113,.08);border-radius:6px;border:1px solid rgba(248,113,113,.3);font-size:12px">📰 Desinformação e deepfakes</div>
        </div>
      </div>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
      <strong>📓 Copie:</strong> IA traz benefícios (saúde, educação, automação) mas exige responsabilidade (privacidade, ética, empregos)
    </div>`
  ],
  perguntas: [
    { pergunta: "O que é Inteligência Artificial?", opcoes: [{texto:"Um robô físico com braços e pernas",correta:false},{texto:"Sistemas que simulam inteligência humana: aprendizado, raciocínio e decisão",correta:true},{texto:"Um antivírus avançado",correta:false},{texto:"Um tipo de processador mais rápido",correta:false}] },
    { pergunta: "Quem propôs o famoso 'Teste de Turing' em 1950?", opcoes: [{texto:"Bill Gates",correta:false},{texto:"Steve Jobs",correta:false},{texto:"Alan Turing",correta:true},{texto:"Elon Musk",correta:false}] },
    { pergunta: "O que é Processamento de Linguagem Natural (PLN)?", opcoes: [{texto:"Processamento de idiomas estrangeiros no passaporte",correta:false},{texto:"IA que entende e gera texto humano",correta:true},{texto:"Digitalização de livros físicos",correta:false},{texto:"Tradução manual de textos",correta:false}] },
    { pergunta: "Qual é a diferença entre IA Tradicional e IA Generativa?", opcoes: [{texto:"Não há diferença, são iguais",correta:false},{texto:"IA Tradicional analisa/classifica; IA Generativa cria conteúdo novo",correta:true},{texto:"IA Tradicional cria; IA Generativa analisa",correta:false},{texto:"IA Tradicional é mais recente",correta:false}] },
    { pergunta: "O ChatGPT é um exemplo de:", opcoes: [{texto:"IA Tradicional de classificação",correta:false},{texto:"Sistema antivírus",correta:false},{texto:"IA Generativa",correta:true},{texto:"Sistema operacional",correta:false}] },
    { pergunta: "O filtro de spam do Gmail usa qual tecnologia?", opcoes: [{texto:"Nenhuma tecnologia especial",correta:false},{texto:"Inteligência Artificial / Machine Learning",correta:true},{texto:"Bloqueio manual pelo usuário",correta:false},{texto:"Firewall",correta:false}] },
    { pergunta: "Visão Computacional é usada em qual destes exemplos?", opcoes: [{texto:"Traduzir textos automaticamente",correta:false},{texto:"Reconhecimento facial para desbloquear o celular",correta:true},{texto:"Gerar músicas automaticamente",correta:false},{texto:"Recomendar filmes na Netflix",correta:false}] },
    { pergunta: "O que é 'viés algorítmico'?", opcoes: [{texto:"Quando o algoritmo é muito lento",correta:false},{texto:"Quando a IA apresenta preconceitos devido aos dados de treinamento",correta:true},{texto:"Quando o computador trava",correta:false},{texto:"Quando a internet fica lenta",correta:false}] },
    { pergunta: "Qual desses é um assistente de voz com IA?", opcoes: [{texto:"Bloco de Notas",correta:false},{texto:"Excel",correta:false},{texto:"Alexa (Amazon)",correta:true},{texto:"Chrome",correta:false}] },
    { pergunta: "O Machine Learning permite que a IA:", opcoes: [{texto:"Seja programada manualmente para cada situação",correta:false},{texto:"Aprenda com dados sem ser programada explicitamente",correta:true},{texto:"Substitua completamente o hardware",correta:false},{texto:"Funcione sem energia elétrica",correta:false}] }
  ]
});

// ══════════════════════════════════════════════════════
// AULA 17 — IA GENERATIVA: ChatGPT E PROMPTS
// (PTD 2º Bimestre - Habilidade 3.2)
// ══════════════════════════════════════════════════════

AULAS.push({
  id: 17,
  titulo: "IA Generativa e Engenharia de Prompts",
  descricao: "Aprenda a usar o ChatGPT, Gemini e outras IAs generativas com prompts eficientes",
  icone: "✨",
  passos: [
    `<h3 style="margin-bottom:10px;color:var(--accent)">✨ O que é IA Generativa?</h3>
    <p>A <strong>IA Generativa (IAGen)</strong> é capaz de <em>criar</em> conteúdo original: textos, imagens, músicas, vídeos e muito mais — a partir de instruções em linguagem humana.</p>
    <div style="display:grid;gap:8px;margin-top:12px">
      <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        💬 <strong>ChatGPT (OpenAI)</strong> — gera textos, responde perguntas, cria códigos e resumos
      </div>
      <div style="padding:12px;background:rgba(124,106,247,.08);border-radius:8px;border:1px solid rgba(124,106,247,.3);font-size:13px">
        🔷 <strong>Google Gemini</strong> — integrado ao Google, gera texto e analisa imagens
      </div>
      <div style="padding:12px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid rgba(52,211,153,.3);font-size:13px">
        🎨 <strong>MidJourney / DALL-E</strong> — geram imagens realistas e artísticas a partir de texto
      </div>
      <div style="padding:12px;background:rgba(251,191,36,.08);border-radius:8px;border:1px solid rgba(251,191,36,.3);font-size:13px">
        🎵 <strong>Suno AI</strong> — compõe músicas completas com letra e melodia
      </div>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
      <strong>📓 Copie:</strong> IAGen cria conteúdo novo. Ferramentas: ChatGPT (texto), MidJourney (imagem), Suno (música)
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">📝 O que é um Prompt?</h3>
    <p>Um <strong>prompt</strong> é a instrução ou pergunta que você dá à IA. Quanto melhor o prompt, melhor o resultado!</p>
    <div style="display:grid;gap:10px;margin-top:12px">
      <div style="padding:12px;background:rgba(248,113,113,.08);border-radius:8px;border:1px solid rgba(248,113,113,.3);font-size:13px">
        ❌ <strong>Prompt ruim:</strong> "escreve um texto"<br>
        <span style="color:var(--muted)">Vago demais → a IA não sabe o que você quer</span>
      </div>
      <div style="padding:12px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid rgba(52,211,153,.3);font-size:13px">
        ✅ <strong>Prompt bom:</strong> "Escreva um texto de 3 parágrafos sobre os benefícios da tecnologia na educação, com linguagem simples para alunos do 1º ano do ensino médio"<br>
        <span style="color:var(--muted)">Específico → a IA entende contexto, formato e público</span>
      </div>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px;line-height:1.9">
      <strong>📓 Copie:</strong> Prompt = instrução dada à IA<br>
      Bom prompt: contexto + tarefa específica + formato desejado + público-alvo
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">🎯 Engenharia de Prompts: Técnicas</h3>
    <p>Veja as principais técnicas para criar prompts poderosos:</p>
    <div style="display:grid;gap:8px;margin-top:12px">
      <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        🎭 <strong>Persona:</strong> "Você é um professor de biologia. Explique o que é fotossíntese para alunos de 15 anos."
      </div>
      <div style="padding:12px;background:rgba(124,106,247,.08);border-radius:8px;border:1px solid rgba(124,106,247,.3);font-size:13px">
        📏 <strong>Formato:</strong> "Crie uma lista com 5 dicas de estudo. Use marcadores e linguagem informal."
      </div>
      <div style="padding:12px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid rgba(52,211,153,.3);font-size:13px">
        🔄 <strong>Iteração:</strong> "Reescreva a resposta anterior de forma mais resumida, com no máximo 100 palavras."
      </div>
      <div style="padding:12px;background:rgba(251,191,36,.08);border-radius:8px;border:1px solid rgba(251,191,36,.3);font-size:13px">
        📌 <strong>Contexto:</strong> "Contexto: sou aluno do 1º ano técnico. Pergunta: como organizar meu tempo de estudo?"
      </div>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
      <strong>📓 Copie:</strong> Técnicas de prompt: Persona | Formato | Iteração | Contexto
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">⚖️ Ética no Uso da IA Generativa</h3>
    <p>Com grande poder vem grande responsabilidade. Veja o que <strong>pode</strong> e o que <strong>não deve</strong> ser feito:</p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px">
      <div>
        <div style="color:var(--success);font-weight:bold;margin-bottom:8px;font-size:13px">✅ USO CORRETO</div>
        <div style="display:grid;gap:6px;font-size:12px">
          <div style="padding:8px;background:rgba(52,211,153,.08);border-radius:6px;border:1px solid rgba(52,211,153,.3)">Usar como apoio à pesquisa</div>
          <div style="padding:8px;background:rgba(52,211,153,.08);border-radius:6px;border:1px solid rgba(52,211,153,.3)">Gerar rascunhos e ideias</div>
          <div style="padding:8px;background:rgba(52,211,153,.08);border-radius:6px;border:1px solid rgba(52,211,153,.3)">Revisar textos próprios</div>
          <div style="padding:8px;background:rgba(52,211,153,.08);border-radius:6px;border:1px solid rgba(52,211,153,.3)">Aprender novos conceitos</div>
        </div>
      </div>
      <div>
        <div style="color:var(--danger);font-weight:bold;margin-bottom:8px;font-size:13px">❌ EVITAR</div>
        <div style="display:grid;gap:6px;font-size:12px">
          <div style="padding:8px;background:rgba(248,113,113,.08);border-radius:6px;border:1px solid rgba(248,113,113,.3)">Entregar texto da IA como seu</div>
          <div style="padding:8px;background:rgba(248,113,113,.08);border-radius:6px;border:1px solid rgba(248,113,113,.3)">Criar notícias falsas</div>
          <div style="padding:8px;background:rgba(248,113,113,.08);border-radius:6px;border:1px solid rgba(248,113,113,.3)">Gerar imagens enganosas</div>
          <div style="padding:8px;background:rgba(248,113,113,.08);border-radius:6px;border:1px solid rgba(248,113,113,.3)">Compartilhar dados pessoais</div>
        </div>
      </div>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
      <strong>📓 Copie:</strong> IA como ferramenta de apoio, não substituição do seu raciocínio. Sempre cite quando usar IA!
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">🎨 IAGen em Aplicativos de Produtividade</h3>
    <p>A IA Generativa já está integrada nas ferramentas que usamos no dia a dia:</p>
    <div style="display:grid;gap:8px;margin-top:12px">
      <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        📝 <strong>Google Docs + Gemini</strong> — sugere textos, resume documentos, reescreve parágrafos
      </div>
      <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        📊 <strong>Google Sheets + IA</strong> — gera fórmulas automaticamente, analisa dados com linguagem natural
      </div>
      <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        🎯 <strong>Google Slides + IA</strong> — cria apresentações inteiras a partir de um tema ou texto
      </div>
      <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        🔵 <strong>Microsoft Copilot</strong> — assistente de IA integrado no Word, Excel e PowerPoint
      </div>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
      <strong>📓 Copie:</strong> IAGen em produtividade: Google Docs/Sheets/Slides com Gemini | Microsoft Copilot no Office
    </div>`
  ],
  perguntas: [
    { pergunta: "O que é um 'prompt' no contexto da IA Generativa?", opcoes: [{texto:"Um tipo de vírus digital",correta:false},{texto:"A instrução ou pergunta dada à IA",correta:true},{texto:"O resultado gerado pela IA",correta:false},{texto:"Um modelo de hardware",correta:false}] },
    { pergunta: "Qual dessas ferramentas é usada para GERAR IMAGENS com IA?", opcoes: [{texto:"ChatGPT",correta:false},{texto:"Google Sheets",correta:false},{texto:"MidJourney",correta:true},{texto:"Gmail",correta:false}] },
    { pergunta: "Por que um prompt vago produz resultados ruins?", opcoes: [{texto:"Porque a IA não tem memória",correta:false},{texto:"Porque a IA não entende o contexto e o que se espera como resultado",correta:true},{texto:"Porque gasta mais energia",correta:false},{texto:"Porque a internet fica mais lenta",correta:false}] },
    { pergunta: "A técnica de usar 'Você é um professor...' em prompts é chamada de:", opcoes: [{texto:"Formato",correta:false},{texto:"Iteração",correta:false},{texto:"Persona",correta:true},{texto:"Abstração",correta:false}] },
    { pergunta: "Qual é um uso ÉTICO da IA Generativa?", opcoes: [{texto:"Entregar um trabalho escrito pela IA como se fosse seu",correta:false},{texto:"Criar notícias falsas",correta:false},{texto:"Usar a IA como apoio para gerar rascunhos e ideias",correta:true},{texto:"Gerar imagens enganosas de pessoas reais",correta:false}] },
    { pergunta: "O Microsoft Copilot é integrado a:", opcoes: [{texto:"Adobe Photoshop",correta:false},{texto:"Word, Excel e PowerPoint",correta:true},{texto:"Apenas ao Windows",correta:false},{texto:"Google Chrome",correta:false}] },
    { pergunta: "Qual dessas ferramentas de IAGen é especializada em texto?", opcoes: [{texto:"MidJourney",correta:false},{texto:"DALL-E 3",correta:false},{texto:"ChatGPT",correta:true},{texto:"Suno AI",correta:false}] },
    { pergunta: "O que é 'iteração' na engenharia de prompts?", opcoes: [{texto:"Dar contexto para a IA antes da pergunta",correta:false},{texto:"Pedir à IA que refine ou melhore uma resposta anterior",correta:true},{texto:"Definir um papel para a IA",correta:false},{texto:"Especificar o formato da resposta",correta:false}] },
    { pergunta: "Por que não devemos compartilhar dados pessoais com IAs?", opcoes: [{texto:"Porque a IA não consegue processar dados pessoais",correta:false},{texto:"Porque podem ser armazenados e usados indevidamente, violando a privacidade",correta:true},{texto:"Porque torna a IA mais lenta",correta:false},{texto:"Porque a IA fica confusa",correta:false}] },
    { pergunta: "A integração de IA no Google Docs permite:", opcoes: [{texto:"Fazer videochamadas",correta:false},{texto:"Sugerir textos, resumir documentos e reescrever parágrafos",correta:true},{texto:"Editar fotos profissionalmente",correta:false},{texto:"Criar sites",correta:false}] }
  ]
});

// ══════════════════════════════════════════════════════
// AULA 18 — FORMATAÇÃO ABNT
// ══════════════════════════════════════════════════════
AULAS.push({
  id: 18,
  titulo: "Formatação ABNT",
  descricao: "Aprenda as normas ABNT para trabalhos escolares e acadêmicos",
  icone: "📄",
  passos: [
    `<h3 style="margin-bottom:10px;color:var(--accent)">📄 O que é ABNT?</h3>
    <p>A <strong>ABNT</strong> (Associação Brasileira de Normas Técnicas) define as regras de formatação para trabalhos acadêmicos no Brasil. Seguir essas normas é obrigatório em escolas e faculdades.</p>
    <div style="display:grid;gap:8px;margin-top:12px">
      <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">📏 <strong>Fonte:</strong> Times New Roman ou Arial, tamanho 12</div>
      <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">📐 <strong>Margens:</strong> Superior e esquerda: 3 cm | Inferior e direita: 2 cm</div>
      <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">📏 <strong>Espaçamento:</strong> 1,5 entre linhas no corpo do texto</div>
      <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">📋 <strong>Alinhamento:</strong> Justificado em todo o texto</div>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px;line-height:1.9">
      <strong>📓 Copie:</strong> ABNT: Fonte 12 (Arial/Times) | Margens: 3cm cima/esq, 2cm baixo/dir | Espaço 1,5 | Justificado
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">📑 Estrutura do Trabalho ABNT</h3>
    <p>Todo trabalho acadêmico segue uma ordem definida:</p>
    <table style="width:100%;border-collapse:collapse;margin-top:12px;font-size:13px">
      <tr style="background:rgba(79,142,247,.15)"><th style="padding:8px;border:1px solid var(--border)">Elemento</th><th style="padding:8px;border:1px solid var(--border)">Obrigatório?</th><th style="padding:8px;border:1px solid var(--border)">O que contém</th></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">Capa</td><td style="padding:8px;border:1px solid var(--border)">✅ Sim</td><td style="padding:8px;border:1px solid var(--border)">Instituição, título, autor, cidade, ano</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">Folha de rosto</td><td style="padding:8px;border:1px solid var(--border)">✅ Sim</td><td style="padding:8px;border:1px solid var(--border)">Dados completos + nota de natureza</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">Sumário</td><td style="padding:8px;border:1px solid var(--border)">✅ Sim</td><td style="padding:8px;border:1px solid var(--border)">Lista de seções com páginas</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">Introdução</td><td style="padding:8px;border:1px solid var(--border)">✅ Sim</td><td style="padding:8px;border:1px solid var(--border)">Apresentação do tema e objetivos</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">Desenvolvimento</td><td style="padding:8px;border:1px solid var(--border)">✅ Sim</td><td style="padding:8px;border:1px solid var(--border)">Corpo do trabalho com argumentos</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">Conclusão</td><td style="padding:8px;border:1px solid var(--border)">✅ Sim</td><td style="padding:8px;border:1px solid var(--border)">Síntese e considerações finais</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">Referências</td><td style="padding:8px;border:1px solid var(--border)">✅ Sim</td><td style="padding:8px;border:1px solid var(--border)">Fontes consultadas no padrão ABNT</td></tr>
    </table>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">📖 Citações ABNT</h3>
    <p>Ao usar a ideia ou texto de outra pessoa, é obrigatório citar a fonte:</p>
    <div style="display:grid;gap:10px;margin-top:12px">
      <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        📌 <strong>Citação direta curta</strong> (até 3 linhas) — entre aspas no texto<br>
        <span style="color:var(--muted)">Ex: "A tecnologia transforma a educação" (SILVA, 2022, p. 45).</span>
      </div>
      <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        📌 <strong>Citação direta longa</strong> (mais de 3 linhas) — bloco recuado 4 cm, fonte 10, sem aspas<br>
        <span style="color:var(--muted)">Recuo: 4 cm da margem esquerda | Fonte: tamanho 10 | Espaço simples</span>
      </div>
      <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        📌 <strong>Citação indireta</strong> (paráfrase) — sem aspas, mas com autoria<br>
        <span style="color:var(--muted)">Ex: Segundo Silva (2022), a tecnologia muda a forma de aprender.</span>
      </div>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px;line-height:1.9">
      <strong>📓 Copie:</strong> Citação curta: "texto" (AUTOR, ANO, p. XX) | Indireta: Segundo Autor (ANO),...
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">📚 Referências Bibliográficas</h3>
    <p>As referências ficam no final do trabalho, em ordem alfabética. Veja os formatos:</p>
    <div style="display:grid;gap:10px;margin-top:12px">
      <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        📕 <strong>Livro:</strong><br>
        SOBRENOME, Nome. <em>Título do livro</em>. Cidade: Editora, Ano.<br>
        <span style="color:var(--muted)">Ex: SILVA, João. <em>Informática Básica</em>. São Paulo: Atlas, 2022.</span>
      </div>
      <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        🌐 <strong>Site:</strong><br>
        AUTOR (ou ENTIDADE). <em>Título da página</em>. Disponível em: URL. Acesso em: dia mês ano.<br>
        <span style="color:var(--muted)">Ex: MINISTÉRIO DA EDUCAÇÃO. <em>Ensino Médio</em>. Disponível em: mec.gov.br. Acesso em: 15 mar. 2026.</span>
      </div>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
      <strong>📓 Copie:</strong> Referências: ordem alfabética | Livro: SOBRENOME, Nome. Título. Cidade: Editora, Ano.
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">⚙️ Configurando ABNT no Word</h3>
    <p>Passo a passo para configurar o Word nas normas ABNT:</p>
    <ol style="margin:12px 0 0 20px;line-height:2.4;font-size:14px">
      <li><strong>Margens:</strong> Layout → Margens → Personalizar → Superior/Esquerda: 3cm | Inferior/Direita: 2cm</li>
      <li><strong>Fonte:</strong> Página Inicial → Arial ou Times New Roman → Tamanho 12</li>
      <li><strong>Espaçamento:</strong> Selecionar tudo (Ctrl+A) → Parágrafo → Espaçamento entre linhas: 1,5</li>
      <li><strong>Alinhamento:</strong> Selecionar tudo → Justificar (Ctrl+J)</li>
      <li><strong>Parágrafo:</strong> Recuo especial → Primeira linha: 1,25 cm</li>
      <li><strong>Numeração:</strong> Inserir → Número de página → Parte superior direita (a partir da introdução)</li>
    </ol>
    <div style="margin-top:12px;padding:12px;background:rgba(52,211,153,.08);border-left:3px solid var(--success);border-radius:6px;font-size:13px">
      ✅ <strong>Dica:</strong> Salve um documento já configurado como modelo (.dotx) para reutilizar sempre!
    </div>`
  ],
  perguntas: [
    { pergunta: "Qual é o tamanho de fonte padrão nas normas ABNT?", opcoes: [{texto:"10",correta:false},{texto:"11",correta:false},{texto:"12",correta:true},{texto:"14",correta:false}] },
    { pergunta: "Qual é a margem SUPERIOR exigida pela ABNT?", opcoes: [{texto:"2 cm",correta:false},{texto:"2,5 cm",correta:false},{texto:"3 cm",correta:true},{texto:"4 cm",correta:false}] },
    { pergunta: "Qual é o espaçamento entre linhas no corpo do texto ABNT?", opcoes: [{texto:"Simples (1,0)",correta:false},{texto:"1,5",correta:true},{texto:"Duplo (2,0)",correta:false},{texto:"1,15",correta:false}] },
    { pergunta: "O alinhamento do texto no trabalho ABNT deve ser:", opcoes: [{texto:"À esquerda",correta:false},{texto:"Centralizado",correta:false},{texto:"Justificado",correta:true},{texto:"À direita",correta:false}] },
    { pergunta: "Uma citação direta LONGA (mais de 3 linhas) deve ter:", opcoes: [{texto:"Aspas e tamanho 12",correta:false},{texto:"Recuo de 4 cm, fonte tamanho 10, sem aspas",correta:true},{texto:"Negrito e sublinhado",correta:false},{texto:"Itálico e aspas duplas",correta:false}] },
    { pergunta: "Como deve ser organizada a lista de referências bibliográficas?", opcoes: [{texto:"Por data de publicação",correta:false},{texto:"Por tamanho do texto",correta:false},{texto:"Em ordem alfabética pelo sobrenome do autor",correta:true},{texto:"Por ordem de citação no texto",correta:false}] },
    { pergunta: "Qual formato correto de referência de LIVRO na ABNT?", opcoes: [{texto:"Título, Autor, Ano",correta:false},{texto:"SOBRENOME, Nome. Título. Cidade: Editora, Ano.",correta:true},{texto:"Nome SOBRENOME - Título (Ano)",correta:false},{texto:"Autor: Título. Ano. Editora",correta:false}] },
    { pergunta: "Ao citar um site nas referências, é obrigatório informar:", opcoes: [{texto:"O número de páginas do site",correta:false},{texto:"A data de acesso ao site",correta:true},{texto:"O dono do servidor",correta:false},{texto:"O número de visitantes do site",correta:false}] },
    { pergunta: "O recuo da primeira linha de parágrafo na ABNT é de:", opcoes: [{texto:"0,5 cm",correta:false},{texto:"1,0 cm",correta:false},{texto:"1,25 cm",correta:true},{texto:"2,0 cm",correta:false}] },
    { pergunta: "Quais fontes são aceitas pela ABNT?", opcoes: [{texto:"Comic Sans ou Verdana",correta:false},{texto:"Arial ou Times New Roman",correta:true},{texto:"Calibri ou Georgia",correta:false},{texto:"Qualquer fonte, desde que tamanho 12",correta:false}] }
  ]
});

// ══════════════════════════════════════════════════════
// AULA 19 — GOOGLE SHEETS: PLANILHAS NA NUVEM
// ══════════════════════════════════════════════════════
AULAS.push({
  id: 19,
  titulo: "Google Sheets: Planilhas na Nuvem",
  descricao: "Aprenda a criar planilhas online, usar fórmulas e colaborar em tempo real",
  icone: "📊",
  passos: [
    `<h3 style="margin-bottom:10px;color:var(--accent)">📊 O que é o Google Sheets?</h3>
    <p>O <strong>Google Sheets</strong> é o programa de planilhas do Google, funcionando 100% online. É parecido com o Excel, mas com vantagens extras:</p>
    <div style="display:grid;gap:8px;margin-top:12px">
      <div style="padding:10px 14px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid rgba(52,211,153,.3);font-size:13px">✅ <strong>Gratuito</strong> — acesse com uma conta Gmail</div>
      <div style="padding:10px 14px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid rgba(52,211,153,.3);font-size:13px">✅ <strong>Salva automaticamente</strong> — nunca perde o trabalho</div>
      <div style="padding:10px 14px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid rgba(52,211,153,.3);font-size:13px">✅ <strong>Colaboração em tempo real</strong> — várias pessoas editam ao mesmo tempo</div>
      <div style="padding:10px 14px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid rgba(52,211,153,.3);font-size:13px">✅ <strong>Acesso em qualquer dispositivo</strong> — celular, tablet ou computador</div>
      <div style="padding:10px 14px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid rgba(52,211,153,.3);font-size:13px">✅ <strong>Histórico de versões</strong> — veja quem alterou o quê e quando</div>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
      <strong>📓 Copie:</strong> Google Sheets = planilha online, gratuita, colaborativa e com salvamento automático
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">🔢 Fórmulas Essenciais no Sheets</h3>
    <p>As fórmulas no Google Sheets são iguais às do Excel. Toda fórmula começa com <strong>=</strong></p>
    <table style="width:100%;border-collapse:collapse;margin-top:12px;font-size:13px">
      <tr style="background:rgba(79,142,247,.15)"><th style="padding:8px;border:1px solid var(--border)">Fórmula</th><th style="padding:8px;border:1px solid var(--border)">O que faz</th><th style="padding:8px;border:1px solid var(--border)">Exemplo</th></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">=SOMA()</td><td style="padding:8px;border:1px solid var(--border)">Soma valores</td><td style="padding:8px;border:1px solid var(--border)">=SOMA(A1:A10)</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">=MÉDIA()</td><td style="padding:8px;border:1px solid var(--border)">Calcula a média</td><td style="padding:8px;border:1px solid var(--border)">=MÉDIA(B1:B5)</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">=SE()</td><td style="padding:8px;border:1px solid var(--border)">Decisão condicional</td><td style="padding:8px;border:1px solid var(--border)">=SE(C1>=5;"Aprovado";"Reprovado")</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">=CONT.SE()</td><td style="padding:8px;border:1px solid var(--border)">Conta com condição</td><td style="padding:8px;border:1px solid var(--border)">=CONT.SE(A1:A10;">5")</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">=HOJE()</td><td style="padding:8px;border:1px solid var(--border)">Mostra a data atual</td><td style="padding:8px;border:1px solid var(--border)">=HOJE()</td></tr>
    </table>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
      <strong>📓 Copie:</strong> =SE(condição;"valor se verdadeiro";"valor se falso")<br>
      Ex: =SE(B2>=5;"Aprovado";"Reprovado")
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">🎨 Formatação e Organização</h3>
    <p>Deixe sua planilha organizada e visual:</p>
    <div style="display:grid;gap:8px;margin-top:12px">
      <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        🎨 <strong>Cor de fundo:</strong> selecione células → ícone de balde de tinta na barra
      </div>
      <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        🔗 <strong>Mesclar células:</strong> Formatar → Mesclar células → Mesclar tudo
      </div>
      <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        📊 <strong>Congelar linha do cabeçalho:</strong> Exibir → Congelar → 1 linha
      </div>
      <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        🔍 <strong>Filtros:</strong> Dados → Criar filtro → clique na seta para filtrar coluna
      </div>
      <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        📈 <strong>Gráfico:</strong> selecionar dados → Inserir → Gráfico → escolher tipo
      </div>
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">👥 Compartilhando e Colaborando</h3>
    <p>Uma das maiores vantagens do Sheets é a colaboração em tempo real:</p>
    <ol style="margin:12px 0 0 20px;line-height:2.2;font-size:14px">
      <li>Clique no botão <strong>Compartilhar</strong> (canto superior direito)</li>
      <li>Digite o e-mail do colega ou gere um <strong>link de compartilhamento</strong></li>
      <li>Escolha a permissão: <strong>Visualizador</strong>, <strong>Comentarista</strong> ou <strong>Editor</strong></li>
      <li>Clique em <strong>Enviar</strong></li>
    </ol>
    <div style="display:grid;gap:8px;margin-top:14px">
      <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        👁️ <strong>Visualizador</strong> — só pode ver, não pode editar
      </div>
      <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        💬 <strong>Comentarista</strong> — pode comentar, não pode editar
      </div>
      <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        ✏️ <strong>Editor</strong> — pode editar livremente
      </div>
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">💡 Sheets vs Excel: Quando usar cada um?</h3>
    <table style="width:100%;border-collapse:collapse;margin-top:12px;font-size:13px">
      <tr style="background:rgba(79,142,247,.15)"><th style="padding:8px;border:1px solid var(--border)">Situação</th><th style="padding:8px;border:1px solid var(--border)">Google Sheets</th><th style="padding:8px;border:1px solid var(--border)">Excel</th></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">Trabalho em grupo online</td><td style="padding:8px;border:1px solid var(--border);text-align:center">⭐ Melhor</td><td style="padding:8px;border:1px solid var(--border);text-align:center">Limitado</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">Custo</td><td style="padding:8px;border:1px solid var(--border);text-align:center">⭐ Gratuito</td><td style="padding:8px;border:1px solid var(--border);text-align:center">Pago</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">Planilhas muito complexas</td><td style="padding:8px;border:1px solid var(--border);text-align:center">Limitado</td><td style="padding:8px;border:1px solid var(--border);text-align:center">⭐ Melhor</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">Uso offline</td><td style="padding:8px;border:1px solid var(--border);text-align:center">Limitado</td><td style="padding:8px;border:1px solid var(--border);text-align:center">⭐ Melhor</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">Macros avançadas</td><td style="padding:8px;border:1px solid var(--border);text-align:center">Limitado</td><td style="padding:8px;border:1px solid var(--border);text-align:center">⭐ Melhor</td></tr>
    </table>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
      <strong>📓 Copie:</strong> Sheets = ideal para trabalhos colaborativos e gratuitos | Excel = ideal para planilhas complexas e offline
    </div>`
  ],
  perguntas: [
    { pergunta: "Qual é uma vantagem do Google Sheets sobre o Excel?", opcoes: [{texto:"Funciona sem internet",correta:false},{texto:"Permite colaboração em tempo real e é gratuito",correta:true},{texto:"Tem mais fórmulas disponíveis",correta:false},{texto:"Funciona apenas no Windows",correta:false}] },
    { pergunta: "Com qual símbolo toda fórmula no Google Sheets começa?", opcoes: [{texto:"@",correta:false},{texto:"#",correta:false},{texto:"=",correta:true},{texto:"$",correta:false}] },
    { pergunta: "A fórmula =SE(B2>=5;\"Aprovado\";\"Reprovado\") faz o quê?", opcoes: [{texto:"Soma os valores de B2 e 5",correta:false},{texto:"Mostra 'Aprovado' se B2 for maior ou igual a 5, senão 'Reprovado'",correta:true},{texto:"Calcula a média de B2",correta:false},{texto:"Conta quantas células têm valor 5",correta:false}] },
    { pergunta: "Para compartilhar uma planilha no Google Sheets, qual botão usar?", opcoes: [{texto:"Arquivo → Salvar",correta:false},{texto:"Inserir → Link",correta:false},{texto:"Compartilhar (canto superior direito)",correta:true},{texto:"Ferramentas → Publicar",correta:false}] },
    { pergunta: "Qual permissão permite que o colaborador edite a planilha?", opcoes: [{texto:"Visualizador",correta:false},{texto:"Comentarista",correta:false},{texto:"Editor",correta:true},{texto:"Leitor",correta:false}] },
    { pergunta: "Para congelar a linha do cabeçalho no Sheets, vai em:", opcoes: [{texto:"Inserir → Congelar",correta:false},{texto:"Exibir → Congelar → 1 linha",correta:true},{texto:"Formatar → Congelar linha",correta:false},{texto:"Dados → Fixar linha",correta:false}] },
    { pergunta: "A fórmula =HOJE() exibe:", opcoes: [{texto:"O total de linhas preenchidas",correta:false},{texto:"A data atual automaticamente",correta:true},{texto:"O horário do servidor",correta:false},{texto:"A data de criação do arquivo",correta:false}] },
    { pergunta: "Para criar um gráfico no Google Sheets, você vai em:", opcoes: [{texto:"Formatar → Gráfico",correta:false},{texto:"Arquivo → Inserir gráfico",correta:false},{texto:"Inserir → Gráfico",correta:true},{texto:"Dados → Criar gráfico",correta:false}] },
    { pergunta: "Qual vantagem do Google Sheets garante que o trabalho nunca se perde?", opcoes: [{texto:"Backup manual semanal",correta:false},{texto:"Salvamento automático em tempo real",correta:true},{texto:"Exportação automática para PDF",correta:false},{texto:"Cópia no pen drive automática",correta:false}] },
    { pergunta: "O Google Sheets é ideal para qual situação?", opcoes: [{texto:"Planilhas financeiras ultra complexas com macros avançadas",correta:false},{texto:"Trabalhos em grupo com edição colaborativa online",correta:true},{texto:"Uso completamente offline sem internet",correta:false},{texto:"Substituição total do Excel em empresas",correta:false}] }
  ]
});

// ══════════════════════════════════════════════════════
// AULA 20 — GERAÇÃO DE IMAGENS COM IA
// ══════════════════════════════════════════════════════
AULAS.push({
  id: 20,
  titulo: "Geração de Imagens com IA",
  descricao: "Aprenda a criar imagens com inteligência artificial usando prompts eficientes",
  icone: "🎨",
  passos: [
    `<h3 style="margin-bottom:10px;color:var(--accent)">🎨 O que é Geração de Imagens com IA?</h3>
    <p>A <strong>IA Generativa de imagens</strong> cria ilustrações, fotos e artes originais a partir de uma descrição em texto (prompt). Em segundos, transforma palavras em imagens.</p>
    <div style="display:grid;gap:8px;margin-top:12px">
      <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        🖼️ <strong>DALL-E 3 (OpenAI)</strong> — integrado ao ChatGPT, cria imagens foto-realistas e artísticas
      </div>
      <div style="padding:12px;background:rgba(124,106,247,.08);border-radius:8px;border:1px solid rgba(124,106,247,.3);font-size:13px">
        🎨 <strong>MidJourney</strong> — qualidade artística excepcional, muito usado por designers
      </div>
      <div style="padding:12px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid rgba(52,211,153,.3);font-size:13px">
        🖌️ <strong>Adobe Firefly</strong> — integrado ao Photoshop, focado em uso profissional e legal
      </div>
      <div style="padding:12px;background:rgba(251,191,36,.08);border-radius:8px;border:1px solid rgba(251,191,36,.3);font-size:13px">
        🌟 <strong>Canva IA / ImageFX</strong> — ferramentas gratuitas e acessíveis para iniciantes
      </div>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
      <strong>📓 Copie:</strong> IA de imagens: DALL-E 3, MidJourney, Adobe Firefly, Canva IA — todas criam imagens a partir de texto
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">✍️ Como Escrever um Bom Prompt de Imagem</h3>
    <p>A qualidade da imagem depende da qualidade do prompt. Um bom prompt de imagem tem:</p>
    <div style="display:grid;gap:8px;margin-top:12px">
      <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        🎯 <strong>Sujeito principal:</strong> o que aparece na imagem<br>
        <span style="color:var(--muted)">Ex: "Um gato laranja dormindo numa janela"</span>
      </div>
      <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        🎨 <strong>Estilo artístico:</strong> fotografia, aquarela, pixel art, cartoon...<br>
        <span style="color:var(--muted)">Ex: "...estilo aquarela, cores suaves"</span>
      </div>
      <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        💡 <strong>Iluminação e ambiente:</strong> luz do sol, noturno, estúdio...<br>
        <span style="color:var(--muted)">Ex: "...luz dourada do pôr do sol"</span>
      </div>
      <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        📐 <strong>Ângulo/composição:</strong> close, vista aérea, perspectiva...<br>
        <span style="color:var(--muted)">Ex: "...vista de cima, fundo branco"</span>
      </div>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(52,211,153,.08);border-left:3px solid var(--success);border-radius:6px;font-size:13px">
      <strong>✅ Exemplo completo:</strong> "Um gato laranja dormindo numa janela, luz dourada do pôr do sol, estilo aquarela, cores suaves, vista lateral"
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">📊 Estilos de Imagem que Você Pode Pedir</h3>
    <table style="width:100%;border-collapse:collapse;margin-top:12px;font-size:13px">
      <tr style="background:rgba(79,142,247,.15)"><th style="padding:8px;border:1px solid var(--border)">Estilo</th><th style="padding:8px;border:1px solid var(--border)">Como pedir no prompt</th></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">📷 Fotografia real</td><td style="padding:8px;border:1px solid var(--border)">"foto realista", "DSLR", "fotografia profissional"</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">🎨 Pintura a óleo</td><td style="padding:8px;border:1px solid var(--border)">"oil painting", "pintura a óleo"</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">🖊️ Ilustração cartoon</td><td style="padding:8px;border:1px solid var(--border)">"cartoon style", "estilo animação", "anime"</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">🌊 Aquarela</td><td style="padding:8px;border:1px solid var(--border)">"watercolor", "aquarela suave"</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">👾 Pixel Art</td><td style="padding:8px;border:1px solid var(--border)">"pixel art", "8-bit style"</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">🏛️ Minimalista</td><td style="padding:8px;border:1px solid var(--border)">"minimalista", "fundo branco limpo", "flat design"</td></tr>
    </table>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
      <strong>📓 Copie:</strong> Estilos: fotografia realista | cartoon | aquarela | pixel art | minimalista | pintura a óleo
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">⚖️ Ética e Direitos na IA de Imagens</h3>
    <p>Usar IA para criar imagens exige responsabilidade:</p>
    <div style="display:grid;gap:8px;margin-top:12px">
      <div style="padding:10px 14px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid rgba(52,211,153,.3);font-size:13px">
        ✅ Criar imagens para projetos pessoais e escolares
      </div>
      <div style="padding:10px 14px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid rgba(52,211,153,.3);font-size:13px">
        ✅ Usar como referência ou ponto de partida criativo
      </div>
      <div style="padding:10px 14px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid rgba(52,211,153,.3);font-size:13px">
        ✅ Verificar a licença da ferramenta antes de uso comercial
      </div>
      <div style="padding:10px 14px;background:rgba(248,113,113,.08);border-radius:8px;border:1px solid rgba(248,113,113,.3);font-size:13px">
        ❌ Criar imagens falsas de pessoas reais (deepfakes)
      </div>
      <div style="padding:10px 14px;background:rgba(248,113,113,.08);border-radius:8px;border:1px solid rgba(248,113,113,.3);font-size:13px">
        ❌ Imitar diretamente o estilo de artistas vivos sem permissão
      </div>
      <div style="padding:10px 14px;background:rgba(248,113,113,.08);border-radius:8px;border:1px solid rgba(248,113,113,.3);font-size:13px">
        ❌ Usar imagens geradas para espalhar desinformação
      </div>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
      <strong>📓 Copie:</strong> IA de imagens: NÃO criar deepfakes, NÃO desinformar, VERIFICAR licença para uso comercial
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">🛠️ Aplicações Práticas na Escola</h3>
    <p>Você pode usar IA de imagens em diversas situações escolares:</p>
    <div style="display:grid;gap:8px;margin-top:12px">
      <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        📋 <strong>Apresentações e slides</strong> — criar imagens personalizadas para ilustrar trabalhos
      </div>
      <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        🧬 <strong>Projetos científicos</strong> — visualizar conceitos abstratos (células, planetas, reações)
      </div>
      <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        📖 <strong>Histórias e narrativas</strong> — ilustrar personagens e cenários de textos criativos
      </div>
      <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        🎨 <strong>Arte e design</strong> — criar logos, cartazes e materiais visuais para eventos
      </div>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(52,211,153,.08);border-left:3px solid var(--success);border-radius:6px;font-size:13px;line-height:1.9">
      <strong>✅ Dica de ouro:</strong> Sempre refine o prompt se o resultado não for o esperado — tente adicionar mais detalhes ou mudar o estilo!
    </div>`
  ],
  perguntas: [
    { pergunta: "O que faz uma IA generativa de imagens?", opcoes: [{texto:"Edita fotos já existentes automaticamente",correta:false},{texto:"Cria imagens originais a partir de uma descrição em texto",correta:true},{texto:"Armazena imagens na nuvem",correta:false},{texto:"Reconhece objetos em fotos",correta:false}] },
    { pergunta: "Qual dessas ferramentas é usada para gerar imagens com IA?", opcoes: [{texto:"Google Docs",correta:false},{texto:"MidJourney",correta:true},{texto:"Gmail",correta:false},{texto:"Google Sheets",correta:false}] },
    { pergunta: "O que é um 'prompt' no contexto de geração de imagens?", opcoes: [{texto:"Um filtro de cor aplicado na imagem",correta:false},{texto:"A descrição em texto que instrui a IA a criar a imagem",correta:true},{texto:"O formato de arquivo da imagem",correta:false},{texto:"A resolução da imagem gerada",correta:false}] },
    { pergunta: "Qual elemento NÃO faz parte de um bom prompt de imagem?", opcoes: [{texto:"Sujeito principal da imagem",correta:false},{texto:"Estilo artístico desejado",correta:false},{texto:"Iluminação e ambiente",correta:false},{texto:"O nome do usuário que fez o pedido",correta:true}] },
    { pergunta: "Para pedir uma imagem em estilo de desenho animado, você usaria:", opcoes: [{texto:"\"fotografia profissional\"",correta:false},{texto:"\"cartoon style\" ou \"estilo animação\"",correta:true},{texto:"\"pixel art\"",correta:false},{texto:"\"oil painting\"",correta:false}] },
    { pergunta: "Qual uso de IA de imagens é considerado ANTIÉTICO?", opcoes: [{texto:"Criar imagens para ilustrar um trabalho escolar",correta:false},{texto:"Usar como referência criativa pessoal",correta:false},{texto:"Criar imagens falsas de pessoas reais (deepfakes)",correta:true},{texto:"Criar logos para um evento da escola",correta:false}] },
    { pergunta: "A ferramenta Adobe Firefly é diferente das outras porque:", opcoes: [{texto:"É a única gratuita",correta:false},{texto:"Só funciona em celulares",correta:false},{texto:"É focada em uso profissional e tem licenciamento legal para uso comercial",correta:true},{texto:"Cria apenas imagens em preto e branco",correta:false}] },
    { pergunta: "O que você deve fazer se o resultado da imagem gerada não for o esperado?", opcoes: [{texto:"Aceitar o resultado e desistir",correta:false},{texto:"Apagar a conta na plataforma",correta:false},{texto:"Refinar o prompt com mais detalhes ou mudar o estilo",correta:true},{texto:"Usar outra ferramenta, pois a IA está quebrada",correta:false}] },
    { pergunta: "Qual aplicação prática da IA de imagens pode ser usada em projetos de Biologia?", opcoes: [{texto:"Calcular médias de notas",correta:false},{texto:"Visualizar conceitos abstratos como células e reações químicas",correta:true},{texto:"Criar planilhas de dados",correta:false},{texto:"Editar textos de redação",correta:false}] },
    { pergunta: "Antes de usar imagens geradas por IA comercialmente, você deve:", opcoes: [{texto:"Apenas dar crédito à IA",correta:false},{texto:"Pedir permissão ao ChatGPT",correta:false},{texto:"Verificar a licença de uso da ferramenta utilizada",correta:true},{texto:"Não é necessário verificar nada",correta:false}] }
  ]
});

// ══════════════════════════════════════════════════════
// AULA 21 — ÉTICA DA IAGEN E PROJETO BIO-TECH
// ══════════════════════════════════════════════════════
AULAS.push({
  id: 21,
  titulo: "Ética da IAGen e Projeto BIO-TECH",
  descricao: "Reflita sobre o uso responsável da IA generativa e aplique no Projeto BIO-TECH",
  icone: "🧬",
  passos: [
    `<h3 style="margin-bottom:10px;color:var(--accent)">🧬 O que é o Projeto BIO-TECH?</h3>
    <p>O <strong>Projeto BIO-TECH</strong> é uma atividade interdisciplinar que une <em>Biologia</em> e <em>Tecnologia</em>. Você vai usar ferramentas digitais e IA para criar um produto que comunica um tema da Biologia de forma criativa.</p>
    <div style="display:grid;gap:8px;margin-top:12px">
      <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        🎯 <strong>Objetivo:</strong> Comunicar um tema de Biologia usando tecnologia e IA de forma ética
      </div>
      <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        🛠️ <strong>Ferramentas possíveis:</strong> Apresentação no Canva, vídeo, infográfico, site, podcast com IA
      </div>
      <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        🧬 <strong>Temas sugeridos:</strong> DNA, ecossistemas, células, evolução, virologia, genética
      </div>
      <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        👥 <strong>Trabalho em grupo:</strong> 3 a 4 integrantes, cada um com função definida
      </div>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
      <strong>📓 Copie:</strong> BIO-TECH = Biologia + Tecnologia + IA | Produto digital sobre tema biológico com uso ético das ferramentas
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">⚖️ Ética da IA Generativa: Por que importa?</h3>
    <p>Usar IA de forma irresponsável pode causar danos reais. A ética na IAGen abrange:</p>
    <div style="display:grid;gap:8px;margin-top:12px">
      <div style="padding:12px;background:rgba(248,113,113,.08);border-radius:8px;border:1px solid rgba(248,113,113,.3);font-size:13px">
        🔴 <strong>Desinformação:</strong> Textos e imagens falsas criadas pela IA podem enganar muitas pessoas
      </div>
      <div style="padding:12px;background:rgba(248,113,113,.08);border-radius:8px;border:1px solid rgba(248,113,113,.3);font-size:13px">
        🔴 <strong>Plágio e autoria:</strong> Apresentar conteúdo gerado pela IA como seu próprio é desonesto
      </div>
      <div style="padding:12px;background:rgba(248,113,113,.08);border-radius:8px;border:1px solid rgba(248,113,113,.3);font-size:13px">
        🔴 <strong>Privacidade:</strong> Compartilhar dados pessoais de terceiros com IAs viola a LGPD
      </div>
      <div style="padding:12px;background:rgba(248,113,113,.08);border-radius:8px;border:1px solid rgba(248,113,113,.3);font-size:13px">
        🔴 <strong>Viés algorítmico:</strong> IA pode reproduzir preconceitos presentes nos dados de treinamento
      </div>
      <div style="padding:12px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid rgba(52,211,153,.3);font-size:13px">
        🟢 <strong>Uso responsável:</strong> Citar o uso da IA, verificar as informações geradas, usar como apoio — não substituição
      </div>
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">🔍 Como Verificar Informações Geradas por IA</h3>
    <p>A IA pode <strong>alucinar</strong> — criar informações falsas com confiança. Sempre verifique:</p>
    <ol style="margin:12px 0 0 20px;line-height:2.4;font-size:14px">
      <li>Pesquise o fato em fontes confiáveis (.gov.br, .edu.br, sites científicos)</li>
      <li>Compare a informação em pelo menos 2 fontes diferentes</li>
      <li>Verifique se a IA citou fontes — e se essas fontes realmente existem</li>
      <li>Em Biologia, prefira: <strong>SciELO, PubMed, IBGE, Fiocruz, MEC</strong></li>
      <li>Desconfie de números muito específicos sem fonte citada</li>
    </ol>
    <div style="margin-top:12px;padding:12px;background:rgba(251,191,36,.08);border-left:3px solid var(--warn);border-radius:6px;font-size:13px">
      ⚠️ <strong>Atenção:</strong> "A IA disse" não é fonte válida em trabalhos escolares. Sempre cite a fonte original!
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">🛠️ Usando IA no Projeto BIO-TECH com Ética</h3>
    <p>Veja como usar a IA de forma correta no seu projeto:</p>
    <div style="display:grid;gap:10px;margin-top:12px">
      <div style="padding:12px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid rgba(52,211,153,.3);font-size:13px">
        ✅ <strong>Pesquisa inicial:</strong> Use IA para entender o tema — depois aprofunde com fontes científicas
      </div>
      <div style="padding:12px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid rgba(52,211,153,.3);font-size:13px">
        ✅ <strong>Imagens:</strong> Gere imagens para ilustrar (células, ecossistemas) com DALL-E ou Canva IA
      </div>
      <div style="padding:12px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid rgba(52,211,153,.3);font-size:13px">
        ✅ <strong>Rascunhos:</strong> Peça à IA um rascunho e depois reescreva com suas palavras
      </div>
      <div style="padding:12px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid rgba(52,211,153,.3);font-size:13px">
        ✅ <strong>Revisão:</strong> Use IA para revisar gramática e melhorar a clareza do texto
      </div>
      <div style="padding:12px;background:rgba(248,113,113,.08);border-radius:8px;border:1px solid rgba(248,113,113,.3);font-size:13px">
        ❌ <strong>NÃO:</strong> Copiar e colar a resposta da IA direto no trabalho sem adaptar ou verificar
      </div>
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">📋 Rubrica de Avaliação do Projeto BIO-TECH</h3>
    <p>Seu projeto será avaliado nos seguintes critérios:</p>
    <table style="width:100%;border-collapse:collapse;margin-top:12px;font-size:13px">
      <tr style="background:rgba(79,142,247,.15)"><th style="padding:8px;border:1px solid var(--border)">Critério</th><th style="padding:8px;border:1px solid var(--border)">Peso</th><th style="padding:8px;border:1px solid var(--border)">O que será avaliado</th></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">📚 Conteúdo científico</td><td style="padding:8px;border:1px solid var(--border);text-align:center">30%</td><td style="padding:8px;border:1px solid var(--border)">Precisão e profundidade das informações biológicas</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">💻 Uso da tecnologia</td><td style="padding:8px;border:1px solid var(--border);text-align:center">25%</td><td style="padding:8px;border:1px solid var(--border)">Domínio das ferramentas digitais e IA utilizadas</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">⚖️ Ética no uso de IA</td><td style="padding:8px;border:1px solid var(--border);text-align:center">20%</td><td style="padding:8px;border:1px solid var(--border)">Citação adequada, verificação de fontes, originalidade</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">🎨 Criatividade e visual</td><td style="padding:8px;border:1px solid var(--border);text-align:center">15%</td><td style="padding:8px;border:1px solid var(--border)">Design, organização e apelo visual do produto</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">🗣️ Apresentação</td><td style="padding:8px;border:1px solid var(--border);text-align:center">10%</td><td style="padding:8px;border:1px solid var(--border)">Clareza, domínio do conteúdo e participação do grupo</td></tr>
    </table>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
      <strong>📓 Copie a rubrica!</strong> Use como guia para garantir nota máxima no BIO-TECH.
    </div>`
  ],
  perguntas: [
    { pergunta: "O Projeto BIO-TECH une quais duas áreas?", opcoes: [{texto:"Biologia e Português",correta:false},{texto:"Biologia e Tecnologia",correta:true},{texto:"Matemática e Biologia",correta:false},{texto:"Tecnologia e Física",correta:false}] },
    { pergunta: "O que significa 'alucinar' no contexto da IA?", opcoes: [{texto:"A IA ficar sem resposta",correta:false},{texto:"A IA criar informações falsas com aparência de verdadeiras",correta:true},{texto:"A IA processar dados muito rápido",correta:false},{texto:"A IA gerar imagens coloridas",correta:false}] },
    { pergunta: "Qual é um uso ÉTICO da IA no Projeto BIO-TECH?", opcoes: [{texto:"Copiar a resposta da IA diretamente sem adaptar",correta:false},{texto:"Usar a IA para entender o tema e depois aprofundar com fontes científicas",correta:true},{texto:"Apresentar o texto da IA como totalmente seu",correta:false},{texto:"Ignorar verificação de fontes pois a IA é confiável",correta:false}] },
    { pergunta: "Qual fonte é confiável para verificar informações de Biologia?", opcoes: [{texto:"Grupos de WhatsApp",correta:false},{texto:"SciELO ou PubMed",correta:true},{texto:"Qualquer blog na internet",correta:false},{texto:"Comentários de redes sociais",correta:false}] },
    { pergunta: "O que é viés algorítmico?", opcoes: [{texto:"Quando a IA é mais rápida que o normal",correta:false},{texto:"Quando a IA reproduz preconceitos presentes nos dados de treinamento",correta:true},{texto:"Quando o algoritmo tem erro de programação",correta:false},{texto:"Quando a IA não consegue gerar imagens",correta:false}] },
    { pergunta: "Por que 'a IA disse' não é uma fonte válida em trabalhos?", opcoes: [{texto:"Porque a IA é muito lenta",correta:false},{texto:"Porque a IA pode alucinar e criar informações falsas sem citar fontes reais",correta:true},{texto:"Porque o professor não usa IA",correta:false},{texto:"Porque a IA só fala inglês",correta:false}] },
    { pergunta: "Qual critério tem maior peso na avaliação do Projeto BIO-TECH?", opcoes: [{texto:"Criatividade e visual (15%)",correta:false},{texto:"Apresentação oral (10%)",correta:false},{texto:"Conteúdo científico (30%)",correta:true},{texto:"Ética no uso de IA (20%)",correta:false}] },
    { pergunta: "O que a LGPD tem a ver com o uso ético da IA?", opcoes: [{texto:"Define quais IAs podem ser usadas na escola",correta:false},{texto:"Protege dados pessoais — compartilhar dados de outros com IAs pode violar a lei",correta:true},{texto:"Regula a velocidade de processamento das IAs",correta:false},{texto:"Determina o preço das ferramentas de IA",correta:false}] },
    { pergunta: "Como o grupo deve dividir as funções no Projeto BIO-TECH?", opcoes: [{texto:"Apenas um membro faz tudo",correta:false},{texto:"Cada integrante tem uma função definida dentro do grupo",correta:true},{texto:"Divisão é desnecessária, todos fazem a mesma coisa",correta:false},{texto:"O professor decide quem faz o quê",correta:false}] },
    { pergunta: "Por que verificar informações geradas pela IA é importante?", opcoes: [{texto:"Para copiar melhor o conteúdo",correta:false},{texto:"Porque a IA pode criar informações falsas com aparência de verdadeiras",correta:true},{texto:"Porque a IA é muito lenta e imprecisa sempre",correta:false},{texto:"Apenas para projetos de nível superior",correta:false}] }
  ]
});

// ══════════════════════════════════════════════════════
// AULA 22 — SISTEMAS DE INFORMAÇÕES GERENCIAIS (SIG)
// ══════════════════════════════════════════════════════
AULAS.push({
  id: 22,
  titulo: "Sistemas de Informações Gerenciais",
  descricao: "Conheça os softwares de gestão empresarial e como eles apoiam as decisões administrativas",
  icone: "📊",
    passos: [
      `<h3 style="margin-bottom:10px;color:var(--accent)">📊 O que são Sistemas de Informações Gerenciais?</h3>
      <p>Um <strong>Sistema de Informações Gerencial (SIG)</strong> é um conjunto de ferramentas e processos que coleta, organiza e apresenta informações para apoiar a tomada de decisão dentro de uma empresa.</p>
      <div style="display:grid;gap:8px;margin-top:12px">
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          📥 <strong>Coleta dados</strong> — reúne informações de diversas áreas da empresa
        </div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          🔄 <strong>Processa informações</strong> — organiza e transforma dados brutos em relatórios úteis
        </div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          📤 <strong>Apoia decisões</strong> — fornece informações precisas para gestores e administradores
        </div>
      </div>
      <div style="margin-top:14px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px;line-height:1.9">
        <strong>📓 Copie no caderno:</strong><br>
        SIG = Sistema de Informações Gerenciais<br>
        Função: coletar, processar e apresentar informações para apoiar decisões empresariais<br>
        Importância para ADM: auxilia o gestor a tomar decisões mais rápidas e embasadas em dados
      </div>`,

      `<h3 style="margin-bottom:10px;color:var(--accent)">💻 Tipos de Softwares de Gerenciamento</h3>
      <p>Existem diferentes tipos de sistemas usados pelas empresas. Conheça os principais:</p>
      <div style="display:grid;gap:8px;margin-top:12px">
        <div style="padding:12px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          🏢 <strong>ERP (Enterprise Resource Planning)</strong><br>Integra todos os setores da empresa: financeiro, RH, estoque, vendas. Ex: SAP, TOTVS, Protheus.
        </div>
        <div style="padding:12px 14px;background:rgba(124,106,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          🤝 <strong>CRM (Customer Relationship Management)</strong><br>Gerencia o relacionamento com clientes. Ex: Salesforce, HubSpot, RD Station.
        </div>
        <div style="padding:12px 14px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          📦 <strong>WMS (Warehouse Management System)</strong><br>Controla estoque e armazém. Ex: Manhattan, Infor WMS.
        </div>
        <div style="padding:12px 14px;background:rgba(251,191,36,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          📈 <strong>BI (Business Intelligence)</strong><br>Análise de dados e geração de relatórios gerenciais. Ex: Power BI, Tableau, Qlik.
        </div>
      </div>
      <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px;line-height:1.9">
        <strong>📓 Copie:</strong> ERP = integração de setores | CRM = gestão de clientes | WMS = estoque | BI = análise de dados
      </div>`,

      `<h3 style="margin-bottom:10px;color:var(--accent)">⚙️ Características dos Sistemas Operacionais de Gerenciamento</h3>
      <p>Os sistemas de gerenciamento possuem características que os tornam essenciais para a administração moderna:</p>
      <table style="width:100%;border-collapse:collapse;margin-top:12px;font-size:13px">
        <tr style="background:rgba(79,142,247,.15)">
          <th style="padding:8px;border:1px solid var(--border)">Característica</th>
          <th style="padding:8px;border:1px solid var(--border)">Descrição</th>
        </tr>
        <tr><td style="padding:8px;border:1px solid var(--border)">🔗 Integração</td><td style="padding:8px;border:1px solid var(--border)">Conecta diferentes áreas e departamentos da empresa</td></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)">⏱️ Tempo real</td><td style="padding:8px;border:1px solid var(--border)">Fornece informações atualizadas instantaneamente</td></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)">📊 Relatórios</td><td style="padding:8px;border:1px solid var(--border)">Gera dashboards e relatórios para tomada de decisão</td></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)">🔒 Segurança</td><td style="padding:8px;border:1px solid var(--border)">Controla acesso e protege dados sensíveis da empresa</td></tr>
        <tr><td style="padding:8px;border:1px solid var(--border)">📱 Mobilidade</td><td style="padding:8px;border:1px solid var(--border)">Acesso via computador, tablet ou smartphone</td></tr>
      </table>
      <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
        <strong>📓 Copie as características:</strong> Integração, Tempo real, Relatórios, Segurança e Mobilidade
      </div>`,

      `<h3 style="margin-bottom:10px;color:var(--accent)">🎯 Funções Básicas dos Sistemas de Gerenciamento</h3>
      <p>Todo sistema de gerenciamento empresarial desempenha funções fundamentais:</p>
      <div style="display:grid;gap:8px;margin-top:12px">
        <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          1️⃣ <strong>Coleta de dados</strong> — registra automaticamente informações de vendas, estoque, finanças e RH
        </div>
        <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          2️⃣ <strong>Armazenamento</strong> — guarda dados de forma segura e organizada em bancos de dados
        </div>
        <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          3️⃣ <strong>Processamento</strong> — transforma dados brutos em informações relevantes para a gestão
        </div>
        <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          4️⃣ <strong>Distribuição</strong> — envia relatórios e alertas para os gestores responsáveis
        </div>
        <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          5️⃣ <strong>Apoio à decisão</strong> — apresenta indicadores (KPIs) que guiam as estratégias da empresa
        </div>
      </div>
      <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px;line-height:1.9">
        <strong>📓 Copie:</strong> Funções: Coletar → Armazenar → Processar → Distribuir → Apoiar decisões
      </div>`,

      `<h3 style="margin-bottom:10px;color:var(--accent)">🏫 Demonstração: Softwares de Gestão Empresarial</h3>
      <p>Na prática, veja como esses sistemas são utilizados em empresas reais:</p>
      <div style="display:grid;gap:10px;margin-top:12px">
        <div style="padding:14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          <strong>🏭 SAP / TOTVS (ERP)</strong><br>
          Usado por grandes empresas para controlar finanças, RH, compras e produção em um só sistema. O TOTVS é muito popular no Brasil.
        </div>
        <div style="padding:14px;background:rgba(124,106,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          <strong>📊 Power BI (BI)</strong><br>
          Ferramenta da Microsoft que transforma dados em gráficos e dashboards interativos. Muito usado por gestores para acompanhar indicadores.
        </div>
        <div style="padding:14px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          <strong>🤝 RD Station / HubSpot (CRM)</strong><br>
          Sistemas que registram cada contato com clientes: ligações, e-mails, vendas e reclamações. Essencial para equipes comerciais.
        </div>
        <div style="padding:14px;background:rgba(251,191,36,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          <strong>📝 Atividade prática:</strong><br>
          Pesquise qual sistema ERP é mais usado pelas empresas da sua cidade e apresente para a turma!
        </div>
      </div>`,

      `<h3 style="margin-bottom:10px;color:var(--accent)">🎓 Por que o SIG é Importante para a Administração?</h3>
      <p>O administrador moderno precisa dominar os sistemas de informação para tomar <strong>decisões estratégicas com base em dados</strong>.</p>
      <div style="display:grid;gap:8px;margin-top:12px">
        <div style="padding:12px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid rgba(52,211,153,.3);font-size:13px">
          ✅ <strong>Reduz erros:</strong> Automatiza tarefas manuais, diminuindo falhas humanas
        </div>
        <div style="padding:12px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid rgba(52,211,153,.3);font-size:13px">
          ✅ <strong>Aumenta a velocidade:</strong> Relatórios em minutos, não em dias
        </div>
        <div style="padding:12px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid rgba(52,211,153,.3);font-size:13px">
          ✅ <strong>Integra setores:</strong> Financeiro, RH, vendas e logística falam a mesma língua
        </div>
        <div style="padding:12px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid rgba(52,211,153,.3);font-size:13px">
          ✅ <strong>Apoia estratégia:</strong> Dados históricos ajudam a prever tendências e planejar o futuro
        </div>
        <div style="padding:12px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid rgba(52,211,153,.3);font-size:13px">
          ✅ <strong>Competitividade:</strong> Empresas que usam SIGs tomam decisões mais rápidas que a concorrência
        </div>
      </div>
      <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px;line-height:1.9">
        <strong>📓 Copie:</strong> O SIG é indispensável para o administrador porque transforma dados em decisões inteligentes, reduz erros e integra todos os setores da empresa.
      </div>`
    ],
    perguntas: [
      { pergunta: "O que significa a sigla SIG?", opcoes: [{texto:"Sistema Integrado de Gestão",correta:false},{texto:"Sistema de Informações Gerenciais",correta:true},{texto:"Software de Integração Geral",correta:false},{texto:"Serviço de Informática Gerencial",correta:false}] },
      { pergunta: "Qual sistema integra todos os setores de uma empresa (financeiro, RH, estoque)?", opcoes: [{texto:"CRM",correta:false},{texto:"WMS",correta:false},{texto:"ERP",correta:true},{texto:"BI",correta:false}] },
      { pergunta: "Para que serve um CRM?", opcoes: [{texto:"Controlar o estoque do armazém",correta:false},{texto:"Gerenciar o relacionamento com clientes",correta:true},{texto:"Analisar dados financeiros",correta:false},{texto:"Integrar os setores produtivos",correta:false}] },
      { pergunta: "Qual ferramenta é usada para criar dashboards e relatórios visuais de dados?", opcoes: [{texto:"WMS",correta:false},{texto:"ERP",correta:false},{texto:"Power BI (Business Intelligence)",correta:true},{texto:"CRM",correta:false}] },
      { pergunta: "Qual é a sequência correta das funções básicas de um SIG?", opcoes: [{texto:"Distribuir → Processar → Coletar → Armazenar",correta:false},{texto:"Coletar → Armazenar → Processar → Distribuir → Apoiar decisões",correta:true},{texto:"Processar → Coletar → Armazenar → Apoiar",correta:false},{texto:"Armazenar → Coletar → Distribuir → Processar",correta:false}] },
      { pergunta: "Por que os SIGs são importantes para a Administração?", opcoes: [{texto:"Porque substituem completamente o trabalho do administrador",correta:false},{texto:"Porque transformam dados em informações para decisões estratégicas mais rápidas e precisas",correta:true},{texto:"Porque eliminam a necessidade de relatórios",correta:false},{texto:"Porque reduzem o número de funcionários da empresa",correta:false}] },
      { pergunta: "Qual sistema de ERP é muito popular no Brasil?", opcoes: [{texto:"SAP e TOTVS",correta:true},{texto:"Salesforce e HubSpot",correta:false},{texto:"Power BI e Tableau",correta:false},{texto:"Manhattan e Infor WMS",correta:false}] },
      { pergunta: "O que são KPIs no contexto dos SIGs?", opcoes: [{texto:"Tipos de software de gestão",correta:false},{texto:"Indicadores que guiam as estratégias e decisões da empresa",correta:true},{texto:"Sistemas de armazenamento em nuvem",correta:false},{texto:"Relatórios financeiros mensais",correta:false}] }
    ]
});

// ══════════════════════════════════════════════════════
// AULA 23 — PLANILHAS ELETRÔNICAS DE CONTROLE
// ══════════════════════════════════════════════════════
AULAS.push({
  id: 23,
  titulo: "Planilhas Eletrônicas de Controle",
  descricao: "Aprenda a criar planilhas no Excel e Google Sheets para controlar estoque e fluxo de caixa",
  icone: "📊",
  passos: [
    `<h3 style="margin-bottom:10px;color:var(--accent)">📊 O que é uma Planilha Eletrônica?</h3>
    <p>Uma <strong>planilha eletrônica</strong> é um programa que organiza dados em linhas e colunas, permitindo cálculos automáticos, gráficos e relatórios. É uma das ferramentas mais usadas na administração de empresas.</p>
    <div style="display:grid;gap:8px;margin-top:12px">
      <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        🟢 <strong>Microsoft Excel</strong> — o mais usado no mercado de trabalho, parte do pacote Office
      </div>
      <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        🔵 <strong>Google Sheets</strong> — gratuito, online, permite colaboração em tempo real
      </div>
      <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        🟡 <strong>LibreOffice Calc</strong> — gratuito, funciona offline, alternativa ao Excel
      </div>
    </div>
    <div style="margin-top:14px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px;line-height:1.9">
      <strong>📓 Copie no caderno:</strong><br>
      Planilha eletrônica = tabela inteligente que faz cálculos automaticamente<br>
      Principais: Excel (Microsoft), Google Sheets (Google), Calc (LibreOffice)<br>
      Uso na ADM: controle de estoque, fluxo de caixa, folha de pagamento, relatórios
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">🗂️ Estrutura Básica de uma Planilha</h3>
    <p>Toda planilha é formada por <strong>células</strong>, que ficam no cruzamento de linhas e colunas:</p>
    <table style="width:100%;border-collapse:collapse;margin-top:12px;font-size:13px">
      <tr style="background:rgba(79,142,247,.15)">
        <th style="padding:8px;border:1px solid var(--border)">Conceito</th>
        <th style="padding:8px;border:1px solid var(--border)">Explicação</th>
        <th style="padding:8px;border:1px solid var(--border)">Exemplo</th>
      </tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">📋 Célula</td><td style="padding:8px;border:1px solid var(--border)">Cada quadradinho da planilha</td><td style="padding:8px;border:1px solid var(--border)">A1, B3, C5</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">↔️ Coluna</td><td style="padding:8px;border:1px solid var(--border)">Sequência vertical, identificada por letras</td><td style="padding:8px;border:1px solid var(--border)">A, B, C, D...</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">↕️ Linha</td><td style="padding:8px;border:1px solid var(--border)">Sequência horizontal, identificada por números</td><td style="padding:8px;border:1px solid var(--border)">1, 2, 3, 4...</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">📄 Aba/Plan</td><td style="padding:8px;border:1px solid var(--border)">Cada folha dentro do arquivo</td><td style="padding:8px;border:1px solid var(--border)">Plan1, Plan2</td></tr>
    </table>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px;line-height:1.9">
      <strong>📓 Copie:</strong> Célula = cruzamento de coluna (letra) + linha (número). Exemplo: coluna B + linha 2 = célula B2
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">🔢 Fórmulas Essenciais para Administração</h3>
    <p>As <strong>fórmulas</strong> fazem o cálculo automático. Sempre começam com o sinal <strong>=</strong></p>
    <div style="display:grid;gap:8px;margin-top:12px">
      <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        ➕ <strong>=SOMA(A1:A10)</strong> — soma todos os valores de A1 até A10. Uso: total de vendas do mês
      </div>
      <div style="padding:12px;background:rgba(124,106,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        📊 <strong>=MÉDIA(B1:B10)</strong> — calcula a média dos valores. Uso: ticket médio de vendas
      </div>
      <div style="padding:12px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        🔍 <strong>=MÁXIMO(C1:C10)</strong> e <strong>=MÍNIMO(C1:C10)</strong> — maior e menor valor. Uso: produto mais e menos vendido
      </div>
      <div style="padding:12px;background:rgba(251,191,36,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        🔢 <strong>=CONT.NÚM(D1:D10)</strong> — conta quantas células têm números. Uso: quantos pedidos foram feitos
      </div>
      <div style="padding:12px;background:rgba(248,113,113,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        ❓ <strong>=SE(A1>100;"Acima";"Abaixo")</strong> — testa uma condição. Uso: estoque acima ou abaixo do mínimo
      </div>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px;line-height:1.9">
      <strong>📓 Copie:</strong> Fórmulas sempre começam com =<br>
      SOMA, MÉDIA, MÁXIMO, MÍNIMO, CONT.NÚM, SE
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">📦 Planilha de Controle de Estoque</h3>
    <p>Uma das principais aplicações na administração é o <strong>controle de estoque</strong>. Veja como montar:</p>
    <table style="width:100%;border-collapse:collapse;margin-top:12px;font-size:12px">
      <tr style="background:rgba(79,142,247,.25);font-weight:bold">
        <td style="padding:7px;border:1px solid var(--border)">A — Produto</td>
        <td style="padding:7px;border:1px solid var(--border)">B — Qtd. Mín.</td>
        <td style="padding:7px;border:1px solid var(--border)">C — Estoque Atual</td>
        <td style="padding:7px;border:1px solid var(--border)">D — Situação</td>
      </tr>
      <tr>
        <td style="padding:7px;border:1px solid var(--border)">Caneta Azul</td>
        <td style="padding:7px;border:1px solid var(--border)">10</td>
        <td style="padding:7px;border:1px solid var(--border)">25</td>
        <td style="padding:7px;border:1px solid var(--border);color:#34d399">✅ OK</td>
      </tr>
      <tr style="background:rgba(248,113,113,.05)">
        <td style="padding:7px;border:1px solid var(--border)">Papel A4</td>
        <td style="padding:7px;border:1px solid var(--border)">5</td>
        <td style="padding:7px;border:1px solid var(--border)">3</td>
        <td style="padding:7px;border:1px solid var(--border);color:#f87171">⚠️ Repor!</td>
      </tr>
      <tr>
        <td style="padding:7px;border:1px solid var(--border)">Pasta Arquivo</td>
        <td style="padding:7px;border:1px solid var(--border)">8</td>
        <td style="padding:7px;border:1px solid var(--border)">12</td>
        <td style="padding:7px;border:1px solid var(--border);color:#34d399">✅ OK</td>
      </tr>
    </table>
    <div style="margin-top:12px;padding:12px;background:rgba(124,106,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
      💡 <strong>Fórmula da coluna D:</strong> <code>=SE(C2&lt;B2;"⚠️ Repor!";"✅ OK")</code><br>
      Ela verifica automaticamente se o estoque está abaixo do mínimo!
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px;line-height:1.9">
      <strong>📓 Copie:</strong> Planilha de estoque: Produto | Qtd. Mínima | Estoque Atual | Situação (=SE)<br>
      A fórmula SE compara automaticamente o estoque com o mínimo
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">💰 Planilha de Fluxo de Caixa</h3>
    <p>O <strong>fluxo de caixa</strong> registra todas as entradas e saídas de dinheiro da empresa. É essencial para saber se o negócio está lucrando:</p>
    <table style="width:100%;border-collapse:collapse;margin-top:12px;font-size:12px">
      <tr style="background:rgba(79,142,247,.25);font-weight:bold">
        <td style="padding:7px;border:1px solid var(--border)">Data</td>
        <td style="padding:7px;border:1px solid var(--border)">Descrição</td>
        <td style="padding:7px;border:1px solid var(--border)">Entrada (R$)</td>
        <td style="padding:7px;border:1px solid var(--border)">Saída (R$)</td>
        <td style="padding:7px;border:1px solid var(--border)">Saldo</td>
      </tr>
      <tr><td style="padding:7px;border:1px solid var(--border)">01/02</td><td style="padding:7px;border:1px solid var(--border)">Saldo inicial</td><td style="padding:7px;border:1px solid var(--border)">R$ 1.000</td><td style="padding:7px;border:1px solid var(--border)">—</td><td style="padding:7px;border:1px solid var(--border);color:#34d399">R$ 1.000</td></tr>
      <tr><td style="padding:7px;border:1px solid var(--border)">05/02</td><td style="padding:7px;border:1px solid var(--border)">Venda à vista</td><td style="padding:7px;border:1px solid var(--border)">R$ 500</td><td style="padding:7px;border:1px solid var(--border)">—</td><td style="padding:7px;border:1px solid var(--border);color:#34d399">R$ 1.500</td></tr>
      <tr style="background:rgba(248,113,113,.05)"><td style="padding:7px;border:1px solid var(--border)">10/02</td><td style="padding:7px;border:1px solid var(--border)">Pagto. fornecedor</td><td style="padding:7px;border:1px solid var(--border)">—</td><td style="padding:7px;border:1px solid var(--border)">R$ 300</td><td style="padding:7px;border:1px solid var(--border);color:#f87171">R$ 1.200</td></tr>
    </table>
    <div style="margin-top:12px;padding:12px;background:rgba(124,106,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
      💡 <strong>Fórmula do Saldo:</strong> <code>=Saldo anterior + Entrada - Saída</code><br>
      Ex: <code>=E2+C3-D3</code> calcula o novo saldo automaticamente
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px;line-height:1.9">
      <strong>📓 Copie:</strong> Fluxo de Caixa = Data | Descrição | Entrada | Saída | Saldo<br>
      Saldo = Saldo anterior + Entradas - Saídas
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">📈 Criando Gráficos na Planilha</h3>
    <p>Os <strong>gráficos</strong> transformam os números em imagens que facilitam a análise e apresentação dos dados:</p>
    <div style="display:grid;gap:8px;margin-top:12px">
      <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        📊 <strong>Gráfico de Colunas/Barras</strong><br>Compara valores entre categorias. Ex: vendas por produto, por mês
      </div>
      <div style="padding:12px;background:rgba(124,106,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        📉 <strong>Gráfico de Linhas</strong><br>Mostra evolução ao longo do tempo. Ex: crescimento de vendas no ano
      </div>
      <div style="padding:12px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        🥧 <strong>Gráfico de Pizza</strong><br>Mostra proporções. Ex: participação de cada produto no faturamento
      </div>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(251,191,36,.08);border-radius:8px;border:1px solid rgba(251,191,36,.3);font-size:13px">
      <strong>✏️ Como inserir um gráfico (Excel/Sheets):</strong><br>
      1. Selecione os dados da planilha<br>
      2. Clique em <em>Inserir → Gráfico</em><br>
      3. Escolha o tipo de gráfico<br>
      4. Personalize título e cores
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
      <strong>📓 Copie:</strong> Tipos de gráfico: Colunas (comparação) | Linhas (evolução) | Pizza (proporção)
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">🏢 Planilhas como Ferramenta de Gestão</h3>
    <p>Na administração, as planilhas são usadas em diversas situações do dia a dia empresarial:</p>
    <div style="display:grid;gap:8px;margin-top:12px">
      <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        📦 <strong>Controle de estoque</strong> — entradas, saídas, produto abaixo do mínimo
      </div>
      <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        💰 <strong>Fluxo de caixa</strong> — entradas, saídas e saldo diário/mensal
      </div>
      <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        👥 <strong>Folha de pagamento</strong> — salários, descontos, líquido a pagar
      </div>
      <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        📊 <strong>Relatório de vendas</strong> — vendas por período, por produto, por vendedor
      </div>
      <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        📅 <strong>Cronograma de projetos</strong> — tarefas, prazos e responsáveis
      </div>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px;line-height:1.9">
      <strong>📓 Copie:</strong> Usos da planilha na empresa: Estoque | Caixa | Pagamento | Vendas | Projetos<br>
      Dominar planilhas é uma habilidade essencial para o Técnico em Administração!
    </div>`
  ],
  perguntas: [
    { pergunta: "Qual das opções abaixo é uma planilha eletrônica?", opcoes: [{texto:"Microsoft Word",correta:false},{texto:"Microsoft Excel",correta:true},{texto:"Adobe Reader",correta:false},{texto:"PowerPoint",correta:false}] },
    { pergunta: "Como se chama o cruzamento de uma coluna com uma linha em uma planilha?", opcoes: [{texto:"Tabela",correta:false},{texto:"Linha",correta:false},{texto:"Célula",correta:true},{texto:"Fórmula",correta:false}] },
    { pergunta: "Qual fórmula soma todos os valores de A1 até A10?", opcoes: [{texto:"=TOTAL(A1:A10)",correta:false},{texto:"=SOMA(A1:A10)",correta:true},{texto:"=ADICIONAR(A1,A10)",correta:false},{texto:"=SOMAR A1 A10",correta:false}] },
    { pergunta: "Para que serve a fórmula =SE() em uma planilha de estoque?", opcoes: [{texto:"Para somar todas as quantidades do estoque",correta:false},{texto:"Para verificar automaticamente se o estoque está abaixo do mínimo",correta:true},{texto:"Para calcular a média de vendas",correta:false},{texto:"Para criar gráficos de barras",correta:false}] },
    { pergunta: "Qual tipo de gráfico é mais adequado para mostrar a evolução das vendas ao longo dos meses?", opcoes: [{texto:"Gráfico de Pizza",correta:false},{texto:"Gráfico de Colunas",correta:false},{texto:"Gráfico de Linhas",correta:true},{texto:"Gráfico de Área 3D",correta:false}] },
    { pergunta: "O que registra um fluxo de caixa?", opcoes: [{texto:"Apenas as dívidas da empresa",correta:false},{texto:"Todas as entradas e saídas de dinheiro da empresa",correta:true},{texto:"Somente os lucros mensais",correta:false},{texto:"O estoque de produtos da empresa",correta:false}] },
    { pergunta: "Qual é a vantagem do Google Sheets em relação ao Excel?", opcoes: [{texto:"Tem mais fórmulas disponíveis",correta:false},{texto:"É mais rápido para abrir arquivos",correta:false},{texto:"É gratuito e permite colaboração online em tempo real",correta:true},{texto:"Funciona apenas offline",correta:false}] },
    { pergunta: "Na planilha de fluxo de caixa, como se calcula o saldo?", opcoes: [{texto:"Soma de todas as entradas do mês",correta:false},{texto:"Saldo anterior mais entradas menos saídas",correta:true},{texto:"Total de saídas dividido pelas entradas",correta:false},{texto:"Média entre entradas e saídas",correta:false}] }
  ]
});

// ══════════════════════════════════════════════════════
// AULA 24 — BANCO DE DADOS E ORGANIZAÇÃO DE INFORMAÇÕES
// ══════════════════════════════════════════════════════
AULAS.push({
  id: 24,
  titulo: "Banco de Dados e Organização de Informações",
  descricao: "Entenda o que é um banco de dados e como organizar informações empresariais de forma eficiente",
  icone: "🗄️",
  passos: [
    `<h3 style="margin-bottom:10px;color:var(--accent)">🗄️ O que é um Banco de Dados?</h3>
    <p>Um <strong>banco de dados</strong> é um sistema organizado para armazenar, gerenciar e recuperar grandes quantidades de informações de forma rápida e segura.</p>
    <div style="display:grid;gap:8px;margin-top:12px">
      <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        📋 <strong>Dados</strong> — fatos brutos: nome "João Silva", CPF "123.456.789-00", valor R$ 150,00
      </div>
      <div style="padding:10px 14px;background:rgba(124,106,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        🧠 <strong>Informação</strong> — dados organizados com significado: "João Silva comprou R$ 150,00 em 01/03/2025"
      </div>
      <div style="padding:10px 14px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        🏦 <strong>Banco de Dados</strong> — sistema que armazena e organiza esses dados para consulta e análise
      </div>
    </div>
    <div style="margin-top:14px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px;line-height:1.9">
      <strong>📓 Copie no caderno:</strong><br>
      Dado = fato bruto (ex: "João", R$ 50)<br>
      Informação = dado com contexto e significado<br>
      Banco de dados = sistema que armazena, organiza e permite consultar dados
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">🏗️ Estrutura de um Banco de Dados</h3>
    <p>Um banco de dados é formado por <strong>tabelas</strong>, que organizam os dados em linhas e colunas — parecido com planilhas, mas muito mais poderoso:</p>
    <table style="width:100%;border-collapse:collapse;margin-top:12px;font-size:12px">
      <tr style="background:rgba(79,142,247,.25);font-weight:bold">
        <td style="padding:7px;border:1px solid var(--border)">ID</td>
        <td style="padding:7px;border:1px solid var(--border)">Nome do Cliente</td>
        <td style="padding:7px;border:1px solid var(--border)">Cidade</td>
        <td style="padding:7px;border:1px solid var(--border)">Telefone</td>
      </tr>
      <tr><td style="padding:7px;border:1px solid var(--border)">001</td><td style="padding:7px;border:1px solid var(--border)">Ana Paula</td><td style="padding:7px;border:1px solid var(--border)">Presidente Prudente</td><td style="padding:7px;border:1px solid var(--border)">(18) 99999-0001</td></tr>
      <tr><td style="padding:7px;border:1px solid var(--border)">002</td><td style="padding:7px;border:1px solid var(--border)">Carlos Silva</td><td style="padding:7px;border:1px solid var(--border)">Marília</td><td style="padding:7px;border:1px solid var(--border)">(14) 98888-0002</td></tr>
      <tr><td style="padding:7px;border:1px solid var(--border)">003</td><td style="padding:7px;border:1px solid var(--border)">Maria Souza</td><td style="padding:7px;border:1px solid var(--border)">Presidente Prudente</td><td style="padding:7px;border:1px solid var(--border)">(18) 97777-0003</td></tr>
    </table>
    <div style="display:grid;gap:8px;margin-top:12px">
      <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        📌 <strong>Campo (coluna)</strong> — tipo de informação: Nome, Cidade, Telefone
      </div>
      <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        📝 <strong>Registro (linha)</strong> — dados de um cliente completo: 001 | Ana Paula | Pres. Prudente | ...
      </div>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
      <strong>📓 Copie:</strong> Tabela = Campos (colunas) + Registros (linhas) | ID = identificador único de cada registro
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">🛠️ Ferramentas para Banco de Dados</h3>
    <p>Existem diversas ferramentas para criar e gerenciar bancos de dados empresariais:</p>
    <div style="display:grid;gap:8px;margin-top:12px">
      <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        🟠 <strong>Microsoft Access</strong><br>Banco de dados desktop da Microsoft. Ideal para pequenas e médias empresas. Parte do pacote Office.
      </div>
      <div style="padding:12px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        🔵 <strong>Google Forms + Sheets</strong><br>Cria formulários online que salvam respostas automaticamente em planilhas. Gratuito e fácil de usar.
      </div>
      <div style="padding:12px;background:rgba(124,106,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        🐬 <strong>MySQL</strong><br>Banco de dados profissional e gratuito. Usado por grandes sites e sistemas corporativos.
      </div>
      <div style="padding:12px;background:rgba(251,191,36,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        ☁️ <strong>Airtable / Notion</strong><br>Ferramentas modernas que funcionam como banco de dados colaborativo online. Fáceis de usar sem programação.
      </div>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
      <strong>📓 Copie:</strong> Ferramentas: Access (pequenas empresas) | Google Forms/Sheets (online gratuito) | MySQL (profissional) | Airtable/Notion (moderno)
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">📝 Cadastro de Informações Empresariais</h3>
    <p>As empresas cadastram informações para organizar seus processos. Conheça os principais cadastros:</p>
    <div style="display:grid;gap:8px;margin-top:12px">
      <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        👥 <strong>Cadastro de Clientes</strong><br>Nome, CPF/CNPJ, endereço, telefone, e-mail, histórico de compras
      </div>
      <div style="padding:12px;background:rgba(124,106,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        🏭 <strong>Cadastro de Fornecedores</strong><br>Razão social, CNPJ, contato, produtos fornecidos, prazo de entrega
      </div>
      <div style="padding:12px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        📦 <strong>Cadastro de Produtos</strong><br>Código, descrição, preço de custo, preço de venda, quantidade em estoque
      </div>
      <div style="padding:12px;background:rgba(251,191,36,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        🧑‍💼 <strong>Cadastro de Funcionários</strong><br>Nome, CPF, cargo, salário, data de admissão, setor
      </div>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
      <strong>📓 Copie:</strong> Cadastros essenciais: Clientes | Fornecedores | Produtos | Funcionários<br>
      Cada cadastro tem campos específicos para organizar a informação
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">☁️ Organização de Informações Online</h3>
    <p>Hoje as empresas organizam suas informações na <strong>nuvem (cloud)</strong>, o que permite acesso de qualquer lugar:</p>
    <div style="display:grid;gap:8px;margin-top:12px">
      <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        📁 <strong>Google Drive</strong> — armazena e compartilha arquivos online. Gratuito até 15 GB.
      </div>
      <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        📁 <strong>OneDrive (Microsoft)</strong> — integrado ao Office 365. Muito usado em empresas.
      </div>
      <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        📋 <strong>Google Forms</strong> — coleta dados via formulário online e salva em planilha automaticamente.
      </div>
      <div style="padding:12px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid rgba(52,211,153,.3);font-size:13px">
        ✅ <strong>Vantagens da nuvem:</strong> acesso remoto, backup automático, colaboração simultânea, segurança dos dados
      </div>
      <div style="padding:12px;background:rgba(248,113,113,.08);border-radius:8px;border:1px solid rgba(248,113,113,.3);font-size:13px">
        ⚠️ <strong>Cuidados:</strong> usar senhas fortes, não compartilhar dados sensíveis em links públicos, ativar autenticação em dois fatores
      </div>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
      <strong>📓 Copie:</strong> Nuvem = armazenamento online | Vantagens: acesso remoto, backup, colaboração | Google Drive, OneDrive, Forms
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">🔍 SIG + Banco de Dados: A Combinação Perfeita</h3>
    <p>O <strong>SIG</strong> (Sistema de Informações Gerenciais) usa o banco de dados como sua base de dados. Veja como se relacionam:</p>
    <div style="display:grid;gap:8px;margin-top:12px">
      <div style="padding:14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px;text-align:center">
        <div style="font-size:24px;margin-bottom:6px">💾</div>
        <strong>Banco de Dados</strong><br>
        <span style="color:var(--muted)">Armazena todos os dados da empresa</span>
      </div>
      <div style="text-align:center;font-size:20px;color:var(--accent)">↓</div>
      <div style="padding:14px;background:rgba(124,106,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px;text-align:center">
        <div style="font-size:24px;margin-bottom:6px">🧠</div>
        <strong>SIG processa os dados</strong><br>
        <span style="color:var(--muted)">Filtra, organiza e analisa as informações</span>
      </div>
      <div style="text-align:center;font-size:20px;color:var(--accent)">↓</div>
      <div style="padding:14px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid var(--border);font-size:13px;text-align:center">
        <div style="font-size:24px;margin-bottom:6px">📊</div>
        <strong>Relatórios e Decisões</strong><br>
        <span style="color:var(--muted)">O gestor recebe informações para decidir</span>
      </div>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px;line-height:1.9">
      <strong>📓 Copie:</strong> Banco de dados → SIG processa → Relatório → Decisão do gestor<br>
      Sem banco de dados bem organizado, o SIG não funciona corretamente!
    </div>`
  ],
  perguntas: [
    { pergunta: "O que é um banco de dados?", opcoes: [{texto:"Um programa para criar apresentações",correta:false},{texto:"Um sistema organizado para armazenar, gerenciar e recuperar informações",correta:true},{texto:"Um tipo de planilha eletrônica",correta:false},{texto:"Um site de armazenamento de fotos",correta:false}] },
    { pergunta: "Na estrutura de um banco de dados, o que é um 'campo'?", opcoes: [{texto:"O espaço total do banco de dados",correta:false},{texto:"Um registro completo de um cliente",correta:false},{texto:"Uma coluna que representa um tipo de informação (ex: Nome, Cidade)",correta:true},{texto:"O número identificador de cada registro",correta:false}] },
    { pergunta: "Qual ferramenta da Microsoft é usada para criar bancos de dados em pequenas empresas?", opcoes: [{texto:"Microsoft Word",correta:false},{texto:"Microsoft PowerPoint",correta:false},{texto:"Microsoft Access",correta:true},{texto:"Microsoft Teams",correta:false}] },
    { pergunta: "Qual é a diferença entre dado e informação?", opcoes: [{texto:"São a mesma coisa, apenas palavras diferentes",correta:false},{texto:"Dado é fato bruto; informação é dado organizado com significado e contexto",correta:true},{texto:"Informação é sempre um número; dado é sempre texto",correta:false},{texto:"Dado fica no computador; informação fica no papel",correta:false}] },
    { pergunta: "Qual é a vantagem de organizar informações na nuvem?", opcoes: [{texto:"Funciona apenas sem internet",correta:false},{texto:"Acesso remoto, backup automático e colaboração simultânea",correta:true},{texto:"Os dados ficam apenas no computador do dono",correta:false},{texto:"Elimina a necessidade de senhas",correta:false}] },
    { pergunta: "O que o Google Forms permite em uma empresa?", opcoes: [{texto:"Criar apresentações de slides",correta:false},{texto:"Editar fotos profissionalmente",correta:false},{texto:"Coletar dados via formulário online que se salvam automaticamente em planilha",correta:true},{texto:"Fazer ligações de vídeo com clientes",correta:false}] },
    { pergunta: "Qual dos seguintes é um exemplo de cadastro empresarial?", opcoes: [{texto:"Playlist de músicas",correta:false},{texto:"Cadastro de clientes com nome, CPF e histórico de compras",correta:true},{texto:"Álbum de fotos da empresa",correta:false},{texto:"Agenda de aniversários dos funcionários",correta:false}] },
    { pergunta: "Qual a relação correta entre Banco de Dados e SIG?", opcoes: [{texto:"O SIG substitui completamente o banco de dados",correta:false},{texto:"O banco de dados armazena os dados que o SIG processa para gerar informações aos gestores",correta:true},{texto:"O banco de dados e o SIG são ferramentas independentes sem relação",correta:false},{texto:"O SIG armazena dados e o banco de dados gera relatórios",correta:false}] }
  ]
});

// ══════════════════════════════════════════════════════
// AULA 25 — COMUNICAÇÃO EMPRESARIAL E SISTEMAS DE SAC
// ══════════════════════════════════════════════════════
AULAS.push({
  id: 25,
  titulo: "Comunicação Empresarial e SAC",
  descricao: "Conheça os meios de comunicação entre empresas, fornecedores e consumidores, e como funciona o SAC",
  icone: "📡",
  passos: [
    `<h3 style="margin-bottom:10px;color:var(--accent)">📡 Comunicação Empresarial</h3>
    <p>A <strong>comunicação empresarial</strong> é o conjunto de meios e estratégias que uma empresa usa para se comunicar com seus públicos: clientes, fornecedores, funcionários e parceiros.</p>
    <div style="display:grid;gap:8px;margin-top:12px">
      <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        👥 <strong>Comunicação Interna</strong> — entre funcionários e departamentos da empresa
      </div>
      <div style="padding:10px 14px;background:rgba(124,106,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        🌐 <strong>Comunicação Externa</strong> — com clientes, fornecedores e parceiros
      </div>
      <div style="padding:10px 14px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        📣 <strong>Comunicação Institucional</strong> — imagem e reputação da empresa para o mercado
      </div>
    </div>
    <div style="margin-top:14px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px;line-height:1.9">
      <strong>📓 Copie no caderno:</strong><br>
      Comunicação empresarial = conjunto de meios para a empresa se comunicar<br>
      Tipos: Interna (funcionários), Externa (clientes/fornecedores), Institucional (mercado)<br>
      Uma boa comunicação é fundamental para o sucesso do negócio
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">📬 Meios de Comunicação Empresarial</h3>
    <p>Hoje as empresas utilizam diversos canais de comunicação digital e tradicional:</p>
    <table style="width:100%;border-collapse:collapse;margin-top:12px;font-size:13px">
      <tr style="background:rgba(79,142,247,.15)">
        <th style="padding:8px;border:1px solid var(--border)">Canal</th>
        <th style="padding:8px;border:1px solid var(--border)">Uso Principal</th>
      </tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">📧 E-mail corporativo</td><td style="padding:8px;border:1px solid var(--border)">Comunicação formal com clientes e fornecedores, envio de documentos</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">💬 WhatsApp Business</td><td style="padding:8px;border:1px solid var(--border)">Atendimento rápido, confirmação de pedidos, suporte ao cliente</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">📱 Redes Sociais</td><td style="padding:8px;border:1px solid var(--border)">Marketing, divulgação de produtos, relacionamento com o público</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">📞 Telefone / 0800</td><td style="padding:8px;border:1px solid var(--border)">Suporte técnico, reclamações, SAC tradicional</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">💻 Chat Online</td><td style="padding:8px;border:1px solid var(--border)">Atendimento em tempo real pelo site da empresa</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">📄 Portal do Fornecedor</td><td style="padding:8px;border:1px solid var(--border)">Sistema online para pedidos, notas fiscais e contratos</td></tr>
    </table>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
      <strong>📓 Copie:</strong> Canais: E-mail | WhatsApp Business | Redes Sociais | Telefone | Chat Online | Portal do Fornecedor
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">🛒 Sistemas de Rastreamento e Compra e Venda</h3>
    <p>As empresas modernas usam sistemas digitais para acompanhar produtos e gerenciar transações:</p>
    <div style="display:grid;gap:8px;margin-top:12px">
      <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        📦 <strong>Rastreamento de Produtos</strong><br>Sistemas como o dos Correios ou de transportadoras que permitem acompanhar o pedido em tempo real. Ex: código de rastreio, mapa de entrega.
      </div>
      <div style="padding:12px;background:rgba(124,106,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        🛍️ <strong>Sistemas de Compra (e-procurement)</strong><br>Plataformas online que gerenciam todo o processo de compras da empresa: pedidos, aprovações e pagamentos a fornecedores.
      </div>
      <div style="padding:12px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        💳 <strong>Sistemas de Venda (PDV/e-commerce)</strong><br>Sistemas de Ponto de Venda (loja física) ou plataformas de e-commerce (loja online) que registram cada venda e atualizam o estoque.
      </div>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
      <strong>📓 Copie:</strong> Rastreamento = acompanhar produto em tempo real | PDV = sistema de venda na loja | E-commerce = venda online<br>
      Todos alimentam o banco de dados da empresa automaticamente
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">📞 O que é SAC — Serviço de Atendimento ao Consumidor</h3>
    <p>O <strong>SAC</strong> é o canal oficial pelo qual consumidores entram em contato com a empresa para tirar dúvidas, fazer reclamações ou solicitar serviços.</p>
    <div style="display:grid;gap:8px;margin-top:12px">
      <div style="padding:10px 14px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid rgba(52,211,153,.3);font-size:13px">
        ✅ <strong>Funções do SAC:</strong> Informações sobre produtos, Reclamações, Sugestões, Cancelamentos, Trocas e devoluções
      </div>
      <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        📱 <strong>Canais de SAC hoje:</strong> 0800, Chat, WhatsApp, Redes Sociais, E-mail, Aplicativo
      </div>
      <div style="padding:10px 14px;background:rgba(251,191,36,.08);border-radius:8px;border:1px solid rgba(251,191,36,.3);font-size:13px">
        ⚖️ <strong>SAC é obrigação legal:</strong> O Decreto 11.034/2022 regulamenta o SAC no Brasil. Empresas de grande porte são obrigadas a oferecer atendimento 24h.
      </div>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px;line-height:1.9">
      <strong>📓 Copie:</strong> SAC = Serviço de Atendimento ao Consumidor<br>
      Funções: dúvidas, reclamações, sugestões, cancelamentos<br>
      Canais: 0800, chat, WhatsApp, e-mail, app, redes sociais
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">💻 SAC Digital: Atendimento pela Internet</h3>
    <p>O SAC moderno usa tecnologia para atender o cliente mais rápido e registrar tudo automaticamente:</p>
    <div style="display:grid;gap:8px;margin-top:12px">
      <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        🤖 <strong>Chatbot</strong><br>Robô de atendimento que responde perguntas frequentes automaticamente, 24 horas por dia, 7 dias por semana. Ex: "Olá! Posso ajudar?"
      </div>
      <div style="padding:12px;background:rgba(124,106,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        🎫 <strong>Sistema de Tickets</strong><br>Cada atendimento recebe um número de protocolo. Permite acompanhar o andamento e histórico do caso.
      </div>
      <div style="padding:12px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        📊 <strong>CRM integrado ao SAC</strong><br>O sistema registra automaticamente cada contato do cliente, criando um histórico completo para o atendente consultar.
      </div>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(251,191,36,.08);border-radius:8px;border:1px solid rgba(251,191,36,.3);font-size:13px">
      <strong>💡 Curiosidade:</strong> Grandes empresas como Americanas, Magazine Luiza e Nubank usam chatbots para resolver mais de 70% dos atendimentos sem precisar de um humano!
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
      <strong>📓 Copie:</strong> SAC Digital: Chatbot (automático) | Ticket (protocolo) | CRM (histórico do cliente)
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">📧 Correio Eletrônico Corporativo</h3>
    <p>O <strong>e-mail corporativo</strong> é um dos meios de comunicação mais formais e importantes no ambiente empresarial:</p>
    <div style="display:grid;gap:8px;margin-top:12px">
      <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        📧 <strong>E-mail corporativo</strong> usa o domínio da empresa: <em>nome@empresa.com.br</em><br>
        Diferente do pessoal: <em>nome@gmail.com</em>
      </div>
      <div style="padding:12px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid rgba(52,211,153,.3);font-size:13px">
        ✅ <strong>Boas práticas:</strong><br>
        • Assunto claro e objetivo<br>
        • Saudação formal: "Prezado(a)..."<br>
        • Linguagem profissional (sem gírias)<br>
        • Assinatura com nome, cargo e contato<br>
        • Responder em até 24 horas úteis
      </div>
      <div style="padding:12px;background:rgba(248,113,113,.08);border-radius:8px;border:1px solid rgba(248,113,113,.3);font-size:13px">
        ❌ <strong>Erros comuns:</strong> responder "reply all" desnecessariamente, enviar sem revisar, usar e-mail pessoal para assuntos da empresa
      </div>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
      <strong>📓 Copie:</strong> E-mail corporativo: domínio da empresa | Regras: assunto claro, linguagem formal, assinatura completa, resposta em 24h
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">🎯 Simulação: Atendimento Digital ao Cliente</h3>
    <p>Veja como funciona um atendimento profissional via chat ou e-mail:</p>
    <div style="display:grid;gap:8px;margin-top:12px">
      <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        <strong>👤 Cliente:</strong> "Olá, fiz um pedido há 5 dias e ainda não recebi. Protocolo #54321."
      </div>
      <div style="padding:12px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid rgba(52,211,153,.3);font-size:13px">
        <strong>🧑‍💼 Atendente (resposta correta):</strong><br>
        "Olá! Tudo bem? Sou a Ana, do SAC da Empresa XYZ. Localizei seu pedido pelo protocolo #54321. Verifiquei e seu pedido saiu para entrega hoje e tem previsão de chegada amanhã até as 18h. Há algo mais que posso ajudar?"
      </div>
      <div style="padding:12px;background:rgba(251,191,36,.08);border-radius:8px;border:1px solid rgba(251,191,36,.3);font-size:13px">
        <strong>✏️ Por que foi uma boa resposta?</strong><br>
        ✅ Identificou o atendente pelo nome<br>
        ✅ Consultou o histórico pelo protocolo<br>
        ✅ Deu informação específica e útil<br>
        ✅ Perguntou se precisa de mais ajuda<br>
        ✅ Usou linguagem profissional e cordial
      </div>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
      <strong>📓 Copie:</strong> Bom atendimento: identificar-se, consultar histórico, dar resposta objetiva, ser cordial e perguntar se precisa de mais ajuda
    </div>`
  ],
  perguntas: [
    { pergunta: "O que é comunicação empresarial?", opcoes: [{texto:"Apenas os anúncios publicitários da empresa",correta:false},{texto:"Conjunto de meios e estratégias usados pela empresa para se comunicar com seus públicos",correta:true},{texto:"Somente a comunicação entre funcionários da empresa",correta:false},{texto:"Os relatórios financeiros enviados ao governo",correta:false}] },
    { pergunta: "O que significa a sigla SAC?", opcoes: [{texto:"Sistema de Armazenamento Corporativo",correta:false},{texto:"Software de Automação Comercial",correta:false},{texto:"Serviço de Atendimento ao Consumidor",correta:true},{texto:"Setor de Administração de Contratos",correta:false}] },
    { pergunta: "Qual é a função principal de um chatbot no SAC?", opcoes: [{texto:"Substituir permanentemente todos os atendentes humanos",correta:false},{texto:"Responder perguntas frequentes automaticamente, 24 horas por dia",correta:true},{texto:"Criar relatórios financeiros para a empresa",correta:false},{texto:"Enviar e-mails em massa para clientes",correta:false}] },
    { pergunta: "O que é um sistema de rastreamento de produtos?", opcoes: [{texto:"Um programa que cria etiquetas para os produtos",correta:false},{texto:"Um sistema que permite acompanhar o pedido em tempo real durante a entrega",correta:true},{texto:"Um banco de dados com o catálogo de produtos da empresa",correta:false},{texto:"Uma planilha de controle de estoque",correta:false}] },
    { pergunta: "Qual é uma boa prática no uso do e-mail corporativo?", opcoes: [{texto:"Usar gírias e abreviações para economizar tempo",correta:false},{texto:"Usar o e-mail pessoal para assuntos urgentes da empresa",correta:false},{texto:"Ter assunto claro, linguagem formal e assinatura com nome e cargo",correta:true},{texto:"Responder apenas os e-mails que julgar importante",correta:false}] },
    { pergunta: "O que diferencia o e-mail corporativo do pessoal?", opcoes: [{texto:"O corporativo é mais lento que o pessoal",correta:false},{texto:"O corporativo usa o domínio da empresa (ex: nome@empresa.com.br)",correta:true},{texto:"O pessoal tem mais espaço de armazenamento",correta:false},{texto:"O corporativo só pode ser acessado no computador da empresa",correta:false}] },
    { pergunta: "Qual sistema registra cada contato do cliente, criando um histórico completo?", opcoes: [{texto:"ERP",correta:false},{texto:"WMS",correta:false},{texto:"CRM integrado ao SAC",correta:true},{texto:"PDV",correta:false}] },
    { pergunta: "Segundo o Decreto 11.034/2022, o que é obrigado para empresas de grande porte no Brasil?", opcoes: [{texto:"Ter um chatbot em todas as plataformas",correta:false},{texto:"Oferecer atendimento SAC 24 horas",correta:true},{texto:"Responder e-mails em até 1 hora",correta:false},{texto:"Ter um aplicativo de celular para atendimento",correta:false}] }
  ]
});

// ══════════════════════════════════════════════════════
// AULA 26 — FRAMEWORKS COMO FERRAMENTA DE PRODUTIVIDADE
// ══════════════════════════════════════════════════════
AULAS.push({
  id: 26,
  titulo: "Frameworks como Ferramenta de Produtividade",
  descricao: "Entenda o que são frameworks, como importar bibliotecas via CDN ou local e como escolher versões",
  icone: "📘",
  passos: [
    `<h3 style="margin-bottom:10px;color:var(--accent)">📘 O que é um Framework?</h3>
    <p>Um <strong>framework</strong> é uma estrutura de código pré-pronta que fornece ferramentas, padrões e componentes reutilizáveis, permitindo que o desenvolvedor construa aplicações mais rápido sem precisar "reinventar a roda".</p>
    <div style="display:grid;gap:8px;margin-top:12px">
      <div style="padding:12px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        🏗️ <strong>Analogia:</strong> É como uma planta de um prédio já pronta — você não precisa projetar a estrutura do zero, só "preenche" os cômodos com seu conteúdo.
      </div>
      <div style="padding:12px 14px;background:rgba(124,106,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        ⚡ <strong>Produtividade:</strong> Reduz drasticamente o tempo de desenvolvimento. O que levaria semanas pode ser feito em dias.
      </div>
      <div style="padding:12px 14px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        🔒 <strong>Padrão e qualidade:</strong> O código segue convenções testadas pela comunidade, reduzindo erros e facilitando a manutenção.
      </div>
    </div>
    <div style="margin-top:14px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px;line-height:1.9">
      <strong>📓 Copie:</strong><br>
      Framework = estrutura de código reutilizável que acelera o desenvolvimento<br>
      Vantagens: produtividade, padronização, menos erros, comunidade ativa<br>
      Diferença: Biblioteca = você chama | Framework = ele chama você (Inversão de Controle)
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">📚 Framework vs Biblioteca — Qual a diferença?</h3>
    <p>Essa é uma dúvida clássica! A diferença está em <strong>quem controla o fluxo</strong> da aplicação:</p>
    <table style="width:100%;border-collapse:collapse;margin-top:12px;font-size:13px">
      <tr style="background:rgba(79,142,247,.15)">
        <th style="padding:8px;border:1px solid var(--border)">Característica</th>
        <th style="padding:8px;border:1px solid var(--border)">📚 Biblioteca</th>
        <th style="padding:8px;border:1px solid var(--border)">🏗️ Framework</th>
      </tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">Controle do fluxo</td><td style="padding:8px;border:1px solid var(--border)">Você decide quando usar</td><td style="padding:8px;border:1px solid var(--border)">O framework decide a estrutura</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">Flexibilidade</td><td style="padding:8px;border:1px solid var(--border)">Alta — usa só o que quer</td><td style="padding:8px;border:1px solid var(--border)">Média — segue as convenções</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">Curva de aprendizado</td><td style="padding:8px;border:1px solid var(--border)">Menor</td><td style="padding:8px;border:1px solid var(--border)">Maior, mas mais recompensador</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">Exemplos</td><td style="padding:8px;border:1px solid var(--border)">jQuery, Lodash, Axios</td><td style="padding:8px;border:1px solid var(--border)">Angular, Django, Laravel, Spring</td></tr>
    </table>
    <div style="margin-top:12px;padding:12px;background:rgba(251,191,36,.08);border-radius:8px;border:1px solid rgba(251,191,36,.3);font-size:13px">
      💡 <strong>Dica para lembrar:</strong> Biblioteca = você chama a função quando quer.<br>
      Framework = ele "chama você" — define onde você coloca seu código. Isso se chama <strong>Inversão de Controle (IoC)</strong>.
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
      <strong>📓 Copie:</strong> IoC = Inversão de Controle — o framework chama seu código, não o contrário<br>
      Biblioteca: jQuery, Axios | Framework: Angular, Laravel, Django, Spring Boot
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">🌐 Importação via CDN (Content Delivery Network)</h3>
    <p>A forma mais rápida de usar uma biblioteca é importá-la direto da internet via <strong>CDN</strong> — um link que aponta para o arquivo hospedado em servidores otimizados ao redor do mundo.</p>
    <div style="display:grid;gap:8px;margin-top:12px">
      <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        ✅ <strong>Vantagens do CDN:</strong><br>
        • Sem precisar instalar nada no servidor<br>
        • Arquivos cacheados nos navegadores dos usuários<br>
        • Servidores distribuídos = entrega mais rápida<br>
        • Ideal para protótipos e projetos rápidos
      </div>
      <div style="padding:12px;background:rgba(248,113,113,.08);border-radius:8px;border:1px solid rgba(248,113,113,.3);font-size:13px">
        ❌ <strong>Desvantagens do CDN:</strong><br>
        • Depende de conexão com a internet<br>
        • Se o CDN cair, sua aplicação pode quebrar<br>
        • Menos controle sobre atualizações de versão
      </div>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(30,30,50,.6);border-radius:8px;border:1px solid var(--border);font-size:12px;font-family:monospace;line-height:1.8">
      <span style="color:#7c6af7">&lt;!-- Bootstrap via CDN --&gt;</span><br>
      <span style="color:#4f8ef7">&lt;link</span> <span style="color:#34d399">rel</span>=<span style="color:#fbbf24">"stylesheet"</span><br>
      &nbsp;&nbsp;<span style="color:#34d399">href</span>=<span style="color:#fbbf24">"https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"</span><span style="color:#4f8ef7">&gt;</span><br><br>
      <span style="color:#7c6af7">&lt;!-- jQuery via CDN --&gt;</span><br>
      <span style="color:#4f8ef7">&lt;script</span> <span style="color:#34d399">src</span>=<span style="color:#fbbf24">"https://code.jquery.com/jquery-3.7.1.min.js"</span><span style="color:#4f8ef7">&gt;&lt;/script&gt;</span>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
      <strong>📓 Copie:</strong> CDN = rede de servidores que entrega a biblioteca pela internet<br>
      Uso: tag &lt;link&gt; para CSS e &lt;script src=""&gt; para JS | Vantagem: rápido | Desvantagem: precisa de internet
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">💾 Importação Local (Off-line)</h3>
    <p>Quando você baixa os arquivos da biblioteca e os coloca no próprio projeto, temos a <strong>importação local</strong>. É mais robusta e funciona sem internet.</p>
    <div style="display:grid;gap:8px;margin-top:12px">
      <div style="padding:12px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid rgba(52,211,153,.3);font-size:13px">
        ✅ <strong>Vantagens do Local:</strong><br>
        • Funciona offline — sem dependência de internet<br>
        • Total controle sobre a versão usada<br>
        • Mais seguro (não depende de serviços externos)<br>
        • Ideal para produção e projetos corporativos
      </div>
      <div style="padding:12px;background:rgba(248,113,113,.08);border-radius:8px;border:1px solid rgba(248,113,113,.3);font-size:13px">
        ❌ <strong>Desvantagens do Local:</strong><br>
        • Aumenta o tamanho do projeto<br>
        • Precisa atualizar manualmente quando sai nova versão<br>
        • Requer gestão de dependências (npm, pip, composer)
      </div>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(30,30,50,.6);border-radius:8px;border:1px solid var(--border);font-size:12px;font-family:monospace;line-height:1.8">
      <span style="color:#7c6af7">📁 Estrutura do projeto:</span><br>
      meu-projeto/<br>
      &nbsp;├── index.html<br>
      &nbsp;├── css/<br>
      &nbsp;│&nbsp;&nbsp; └── bootstrap.min.css <span style="color:#34d399">← arquivo local</span><br>
      &nbsp;└── js/<br>
      &nbsp;&nbsp;&nbsp;&nbsp; └── jquery.min.js <span style="color:#34d399">← arquivo local</span><br><br>
      <span style="color:#7c6af7">&lt;!-- No HTML, referencie o caminho local --&gt;</span><br>
      <span style="color:#4f8ef7">&lt;link</span> <span style="color:#34d399">rel</span>=<span style="color:#fbbf24">"stylesheet"</span> <span style="color:#34d399">href</span>=<span style="color:#fbbf24">"css/bootstrap.min.css"</span><span style="color:#4f8ef7">&gt;</span><br>
      <span style="color:#4f8ef7">&lt;script</span> <span style="color:#34d399">src</span>=<span style="color:#fbbf24">"js/jquery.min.js"</span><span style="color:#4f8ef7">&gt;&lt;/script&gt;</span>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
      <strong>📓 Copie:</strong> Local = arquivos da biblioteca dentro do próprio projeto<br>
      Vantagem: offline, controle total | Desvantagem: projeto maior, atualização manual
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">📦 Gerenciadores de Pacotes</h3>
    <p>Na prática profissional, bibliotecas são instaladas via <strong>gerenciadores de pacotes</strong> — ferramentas que automatizam o download, instalação e controle de versões:</p>
    <div style="display:grid;gap:10px;margin-top:12px">
      <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        🟨 <strong>npm / yarn</strong> (JavaScript/Node.js)<br>
        <code style="background:rgba(0,0,0,.3);padding:2px 6px;border-radius:4px">npm install bootstrap</code> — instala o Bootstrap localmente<br>
        <code style="background:rgba(0,0,0,.3);padding:2px 6px;border-radius:4px">npm install jquery@3.7.1</code> — instala versão específica
      </div>
      <div style="padding:12px;background:rgba(124,106,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        🐍 <strong>pip</strong> (Python)<br>
        <code style="background:rgba(0,0,0,.3);padding:2px 6px;border-radius:4px">pip install django==4.2</code> — instala Django versão 4.2
      </div>
      <div style="padding:12px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        🐘 <strong>composer</strong> (PHP)<br>
        <code style="background:rgba(0,0,0,.3);padding:2px 6px;border-radius:4px">composer require laravel/framework</code>
      </div>
      <div style="padding:12px;background:rgba(251,191,36,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        ☕ <strong>Maven / Gradle</strong> (Java)<br>
        Dependências declaradas no <code style="background:rgba(0,0,0,.3);padding:2px 6px;border-radius:4px">pom.xml</code> ou <code style="background:rgba(0,0,0,.3);padding:2px 6px;border-radius:4px">build.gradle</code>
      </div>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
      <strong>📓 Copie:</strong> Gerenciadores de pacotes: npm/yarn (JS) | pip (Python) | composer (PHP) | Maven/Gradle (Java)<br>
      Eles controlam versões e dependências automaticamente
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">🏷️ Versionamento Semântico — Como escolher versões</h3>
    <p>Frameworks usam <strong>Versionamento Semântico (SemVer)</strong> no formato <code style="background:rgba(0,0,0,.3);padding:2px 6px;border-radius:4px">MAJOR.MINOR.PATCH</code> para comunicar o tipo de mudança:</p>
    <div style="display:grid;gap:8px;margin-top:12px">
      <div style="padding:14px;background:rgba(248,113,113,.08);border-radius:8px;border:1px solid rgba(248,113,113,.3);font-size:13px">
        🔴 <strong>MAJOR (ex: 2.0.0 → 3.0.0)</strong><br>
        Mudança incompatível — pode quebrar código existente. Requer atenção e migração cuidadosa.
      </div>
      <div style="padding:14px;background:rgba(251,191,36,.08);border-radius:8px;border:1px solid rgba(251,191,36,.3);font-size:13px">
        🟡 <strong>MINOR (ex: 2.1.0 → 2.2.0)</strong><br>
        Novas funcionalidades mantendo compatibilidade. Seguro atualizar na maioria dos casos.
      </div>
      <div style="padding:14px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid rgba(52,211,153,.3);font-size:13px">
        🟢 <strong>PATCH (ex: 2.1.0 → 2.1.1)</strong><br>
        Correção de bugs. Sempre seguro atualizar — sem novas funcionalidades.
      </div>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(30,30,50,.6);border-radius:8px;border:1px solid var(--border);font-size:12px;font-family:monospace">
      <span style="color:#fbbf24">Bootstrap 5.3.2</span><br>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#f87171">5</span> = MAJOR (versão principal)<br>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#fbbf24">3</span> = MINOR (funcionalidades novas)<br>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#34d399">2</span> = PATCH (correções de bug)
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px;line-height:1.9">
      <strong>📓 Copie:</strong> SemVer = MAJOR.MINOR.PATCH<br>
      MAJOR = quebra compatibilidade ⚠️ | MINOR = nova função ✅ | PATCH = bug fix ✅<br>
      Regra: sempre fixe a versão em produção para evitar surpresas!
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">🔄 CDN vs Local — Quando usar cada um?</h3>
    <p>Na prática, a escolha entre CDN e local depende do contexto do projeto. Veja o guia definitivo:</p>
    <table style="width:100%;border-collapse:collapse;margin-top:12px;font-size:12px">
      <tr style="background:rgba(79,142,247,.15)">
        <th style="padding:8px;border:1px solid var(--border)">Situação</th>
        <th style="padding:8px;border:1px solid var(--border)">Recomendação</th>
        <th style="padding:8px;border:1px solid var(--border)">Motivo</th>
      </tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">Protótipo / estudo</td><td style="padding:8px;border:1px solid var(--border);color:#34d399">CDN</td><td style="padding:8px;border:1px solid var(--border)">Rapidez, sem configuração</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">Sistema interno (intranet)</td><td style="padding:8px;border:1px solid var(--border);color:#34d399">Local</td><td style="padding:8px;border:1px);border:1px solid var(--border)">Pode não ter acesso à internet</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">Aplicação em produção</td><td style="padding:8px;border:1px solid var(--border);color:#fbbf24">Local + Bundler</td><td style="padding:8px;border:1px solid var(--border)">Controle total, performance</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">Projeto com npm/pip</td><td style="padding:8px;border:1px solid var(--border);color:#34d399">Gerenciador de pacotes</td><td style="padding:8px;border:1px solid var(--border)">Melhor prática profissional</td></tr>
    </table>
    <div style="margin-top:12px;padding:12px;background:rgba(251,191,36,.08);border-radius:8px;border:1px solid rgba(251,191,36,.3);font-size:13px">
      💡 <strong>Boas práticas:</strong><br>
      • Sempre especifique a versão exata no CDN: <code>bootstrap@5.3.0</code>, não só <code>bootstrap</code><br>
      • Use o atributo <code>integrity</code> + <code>crossorigin</code> no CDN para segurança (SRI)<br>
      • Em projetos profissionais, use bundlers como Webpack, Vite ou Parcel junto com pacotes locais
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
      <strong>📓 Copie:</strong> Prototipagem = CDN | Intranet = Local | Produção = Gerenciador + Bundler<br>
      Bundlers: Webpack, Vite, Parcel — empacotam e otimizam tudo para produção
    </div>`
  ],
  perguntas: [
    { pergunta: "O que é um framework?", opcoes: [{texto:"Um editor de código como VSCode",correta:false},{texto:"Estrutura de código reutilizável que acelera o desenvolvimento seguindo padrões",correta:true},{texto:"Um banco de dados relacional",correta:false},{texto:"Um sistema operacional para servidores",correta:false}] },
    { pergunta: "Qual é a principal diferença entre biblioteca e framework?", opcoes: [{texto:"Biblioteca é mais cara que framework",correta:false},{texto:"Framework é feito em Java; biblioteca em JavaScript",correta:false},{texto:"No framework o fluxo é controlado por ele (IoC); na biblioteca você controla",correta:true},{texto:"Biblioteca não pode ser usada com framework",correta:false}] },
    { pergunta: "O que significa CDN?", opcoes: [{texto:"Código de Dados Nativo",correta:false},{texto:"Content Delivery Network — rede de entrega de conteúdo",correta:true},{texto:"Central de Download Nacional",correta:false},{texto:"Compilador de Dados em Nuvem",correta:false}] },
    { pergunta: "Qual é a principal VANTAGEM de importar uma biblioteca via CDN?", opcoes: [{texto:"Funciona sem internet",correta:false},{texto:"Rápida de usar, sem instalação, com arquivos cacheados globalmente",correta:true},{texto:"Mais seguro que qualquer outra opção",correta:false},{texto:"Permite versionar o código automaticamente",correta:false}] },
    { pergunta: "Qual é a principal VANTAGEM de importar uma biblioteca localmente?", opcoes: [{texto:"Arquivo menor e mais rápido de baixar",correta:false},{texto:"Funciona offline e você tem controle total sobre a versão",correta:true},{texto:"Atualiza automaticamente para versões novas",correta:false},{texto:"Não precisa de nenhuma configuração",correta:false}] },
    { pergunta: "No versionamento semântico, o que representa o número MAJOR?", opcoes: [{texto:"Correção de bugs sem impacto",correta:false},{texto:"Novas funcionalidades compatíveis com a versão anterior",correta:false},{texto:"Mudança incompatível que pode quebrar o código existente",correta:true},{texto:"Atualização de segurança automática",correta:false}] },
    { pergunta: "Na versão '5.3.2', qual número representa o PATCH?", opcoes: [{texto:"5",correta:false},{texto:"3",correta:false},{texto:"2",correta:true},{texto:"Todos juntos",correta:false}] },
    { pergunta: "Qual gerenciador de pacotes é usado para instalar bibliotecas JavaScript/Node.js?", opcoes: [{texto:"pip",correta:false},{texto:"composer",correta:false},{texto:"npm",correta:true},{texto:"maven",correta:false}] },
    { pergunta: "Qual gerenciador de pacotes é padrão para Python?", opcoes: [{texto:"npm",correta:false},{texto:"pip",correta:true},{texto:"gradle",correta:false},{texto:"yarn",correta:false}] },
    { pergunta: "Para um sistema interno (intranet) sem acesso à internet, qual abordagem é mais indicada?", opcoes: [{texto:"CDN de terceiros",correta:false},{texto:"Importação local dos arquivos da biblioteca",correta:true},{texto:"Não usar nenhuma biblioteca",correta:false},{texto:"Usar apenas CSS inline",correta:false}] },
    { pergunta: "O que faz um bundler como Webpack ou Vite?", opcoes: [{texto:"Hospeda o banco de dados da aplicação",correta:false},{texto:"Empacota e otimiza os arquivos do projeto para produção",correta:true},{texto:"Gerencia usuários e permissões do sistema",correta:false},{texto:"Cria documentação automática do código",correta:false}] },
    { pergunta: "Qual atributo deve ser usado no CDN para garantir a integridade do arquivo baixado?", opcoes: [{texto:"version",correta:false},{texto:"async",correta:false},{texto:"integrity + crossorigin (SRI)",correta:true},{texto:"defer",correta:false}] }
  ]
});

// ══════════════════════════════════════════════════════
// AULA 27 — PERSISTÊNCIA EM BANCOS DE DADOS
// ══════════════════════════════════════════════════════
AULAS.push({
  id: 27,
  titulo: "Persistência em Bancos de Dados",
  descricao: "Domine Database-first, Model-first, Code-first, Migrations, ORM e os principais frameworks de persistência",
  icone: "💾",
  passos: [
    `<h3 style="margin-bottom:10px;color:var(--accent)">💾 O que é Persistência de Dados?</h3>
    <p><strong>Persistência</strong> é a capacidade de salvar dados de forma permanente, de modo que sobrevivam ao encerramento da aplicação. Sem persistência, todos os dados seriam perdidos ao fechar o programa.</p>
    <div style="display:grid;gap:8px;margin-top:12px">
      <div style="padding:12px;background:rgba(248,113,113,.08);border-radius:8px;border:1px solid rgba(248,113,113,.3);font-size:13px">
        ❌ <strong>Sem persistência (memória RAM):</strong><br>
        Dados ficam na RAM → programa fecha → dados somem
      </div>
      <div style="padding:12px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid rgba(52,211,153,.3);font-size:13px">
        ✅ <strong>Com persistência (banco de dados):</strong><br>
        Dados salvos no disco → programa fecha → dados continuam lá
      </div>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
      🗄️ <strong>Formas de persistência:</strong> Banco de dados relacional (SQL), Banco NoSQL, Arquivos (JSON, XML, CSV), Cache (Redis)
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px;line-height:1.9">
      <strong>📓 Copie:</strong><br>
      Persistência = guardar dados permanentemente no disco<br>
      Sem persistência: dados na RAM somem ao fechar o app<br>
      Formas: SQL (MySQL, PostgreSQL), NoSQL (MongoDB), Arquivos, Cache
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">🗄️ Database-First — O banco manda</h3>
    <p>No modelo <strong>Database-First</strong>, o banco de dados já existe (ou é criado primeiro) e o código da aplicação é gerado a partir dele.</p>
    <div style="display:grid;gap:8px;margin-top:12px">
      <div style="padding:14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px;text-align:center">
        <div style="font-size:22px">🗄️</div><strong>1. Banco de dados criado primeiro</strong><br>
        <span style="color:var(--muted);font-size:12px">DBA cria tabelas, colunas, relacionamentos no SQL</span>
      </div>
      <div style="text-align:center;color:var(--accent)">↓</div>
      <div style="padding:14px;background:rgba(124,106,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px;text-align:center">
        <div style="font-size:22px">⚙️</div><strong>2. Geração automática de código</strong><br>
        <span style="color:var(--muted);font-size:12px">Ferramenta gera as classes/modelos a partir do banco</span>
      </div>
      <div style="text-align:center;color:var(--accent)">↓</div>
      <div style="padding:14px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid var(--border);font-size:13px;text-align:center">
        <div style="font-size:22px">💻</div><strong>3. Desenvolvimento da aplicação</strong><br>
        <span style="color:var(--muted);font-size:12px">Programador usa as classes geradas</span>
      </div>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(251,191,36,.08);border-radius:8px;border:1px solid rgba(251,191,36,.3);font-size:13px">
      🎯 <strong>Quando usar:</strong> Sistemas legados (banco já existe) | Equipes com DBA dedicado | Migrações de sistemas antigos
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
      <strong>📓 Copie:</strong> Database-First = banco criado primeiro → código gerado a partir dele<br>
      Uso: sistemas legados, banco já existente, equipe com DBA
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">📐 Model-First — O diagrama manda</h3>
    <p>No <strong>Model-First</strong>, o desenvolvedor cria um diagrama visual do modelo de dados (geralmente em uma IDE), e a ferramenta gera tanto o banco quanto o código.</p>
    <div style="display:grid;gap:8px;margin-top:12px">
      <div style="padding:14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px;text-align:center">
        <div style="font-size:22px">🖼️</div><strong>1. Criação do modelo visual (diagrama)</strong><br>
        <span style="color:var(--muted);font-size:12px">Designer arrasta entidades e relacionamentos na IDE</span>
      </div>
      <div style="text-align:center;color:var(--accent)">↓</div>
      <div style="padding:14px;background:rgba(124,106,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px;text-align:center">
        <div style="font-size:22px">⚡</div><strong>2. Geração do banco E do código</strong><br>
        <span style="color:var(--muted);font-size:12px">Ferramenta gera SQL (CREATE TABLE) + classes automaticamente</span>
      </div>
      <div style="text-align:center;color:var(--accent)">↓</div>
      <div style="padding:14px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid var(--border);font-size:13px;text-align:center">
        <div style="font-size:22px">💻</div><strong>3. Desenvolvimento</strong><br>
        <span style="color:var(--muted);font-size:12px">Programador trabalha sobre o código gerado</span>
      </div>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(251,191,36,.08);border-radius:8px;border:1px solid rgba(251,191,36,.3);font-size:13px">
      🎯 <strong>Quando usar:</strong> Projetos novos com equipe mista (designers + devs) | Quando o visual facilita a comunicação | Menos comum hoje em dia
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
      <strong>📓 Copie:</strong> Model-First = diagrama visual → gera banco E código<br>
      Vantagem: visual e intuitivo | Desvantagem: menos controle sobre o SQL gerado
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">💻 Code-First — O código manda</h3>
    <p>No <strong>Code-First</strong> (a abordagem mais moderna e popular hoje), o desenvolvedor escreve as classes do código primeiro, e a ferramenta gera o banco de dados automaticamente a partir delas.</p>
    <div style="display:grid;gap:8px;margin-top:12px">
      <div style="padding:14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px;text-align:center">
        <div style="font-size:22px">💻</div><strong>1. Programador escreve as classes (modelos)</strong><br>
        <span style="color:var(--muted);font-size:12px">Ex: classe Produto com atributos id, nome, preço</span>
      </div>
      <div style="text-align:center;color:var(--accent)">↓</div>
      <div style="padding:14px;background:rgba(124,106,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px;text-align:center">
        <div style="font-size:22px">🔄</div><strong>2. Migration gerada automaticamente</strong><br>
        <span style="color:var(--muted);font-size:12px">ORM cria o script SQL de criação da tabela</span>
      </div>
      <div style="text-align:center;color:var(--accent)">↓</div>
      <div style="padding:14px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid var(--border);font-size:13px;text-align:center">
        <div style="font-size:22px">🗄️</div><strong>3. Banco criado/atualizado automaticamente</strong><br>
        <span style="color:var(--muted);font-size:12px">A tabela "produtos" é criada no banco</span>
      </div>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(30,30,50,.6);border-radius:8px;border:1px solid var(--border);font-size:12px;font-family:monospace;line-height:1.8">
      <span style="color:#7c6af7"># Exemplo em Python (Django)</span><br>
      <span style="color:#4f8ef7">class</span> <span style="color:#34d399">Produto</span>(models.Model):<br>
      &nbsp;&nbsp;nome = models.<span style="color:#fbbf24">CharField</span>(max_length=100)<br>
      &nbsp;&nbsp;preco = models.<span style="color:#fbbf24">DecimalField</span>(max_digits=10)<br>
      &nbsp;&nbsp;estoque = models.<span style="color:#fbbf24">IntegerField</span>()
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
      <strong>📓 Copie:</strong> Code-First = classes escritas primeiro → banco gerado automaticamente<br>
      Abordagem mais moderna | Usada com ORM + Migrations | Ex: Django, EF Core, Hibernate
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">🔄 Migrations — Versionamento do Banco de Dados</h3>
    <p><strong>Migrations</strong> são arquivos que registram cada alteração feita na estrutura do banco de dados ao longo do tempo, funcionando como um "histórico de versões" do banco — similar ao Git para código.</p>
    <div style="display:grid;gap:8px;margin-top:12px">
      <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        📜 <strong>O que uma Migration registra:</strong><br>
        Criar tabela | Adicionar coluna | Remover coluna | Alterar tipo de dado | Criar índice
      </div>
      <div style="padding:12px;background:rgba(124,106,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        ↕️ <strong>Up e Down:</strong><br>
        <strong>up()</strong> = aplica a migration (avança versão)<br>
        <strong>down()</strong> = desfaz a migration (volta versão) — rollback!
      </div>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(30,30,50,.6);border-radius:8px;border:1px solid var(--border);font-size:12px;font-family:monospace;line-height:1.8">
      <span style="color:#34d399">📁 Histórico de migrations:</span><br>
      2024_01_01_create_usuarios.js &nbsp;&nbsp;<span style="color:#4f8ef7">← v1</span><br>
      2024_02_15_add_email_usuarios.js <span style="color:#4f8ef7">← v2</span><br>
      2024_03_10_create_produtos.js &nbsp;&nbsp;&nbsp;<span style="color:#4f8ef7">← v3</span><br>
      2024_04_05_add_estoque_produtos.js <span style="color:#4f8ef7">← v4</span><br><br>
      <span style="color:#fbbf24">$ npm run migrate</span> &nbsp;&nbsp;<span style="color:#7c6af7">← aplica tudo</span><br>
      <span style="color:#fbbf24">$ npm run migrate:rollback</span> <span style="color:#7c6af7">← desfaz última</span>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px;line-height:1.9">
      <strong>📓 Copie:</strong> Migration = arquivo que registra uma mudança no banco (histórico de versões)<br>
      up() = aplica | down() = desfaz (rollback)<br>
      Benefício: toda a equipe tem o mesmo banco | ambiente reproduzível
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">🗺️ ORM — Mapeamento Objeto-Relacional</h3>
    <p>O <strong>ORM (Object-Relational Mapping)</strong> é uma técnica que permite manipular o banco de dados usando a linguagem de programação, sem escrever SQL diretamente. Ele "mapeia" tabelas do banco em classes do código.</p>
    <table style="width:100%;border-collapse:collapse;margin-top:12px;font-size:13px">
      <tr style="background:rgba(79,142,247,.15)">
        <th style="padding:8px;border:1px solid var(--border)">Banco de Dados</th>
        <th style="padding:8px;border:1px solid var(--border)">↔️ ORM mapeia para</th>
        <th style="padding:8px;border:1px solid var(--border)">Código (OOP)</th>
      </tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">Tabela</td><td style="padding:8px;border:1px solid var(--border);text-align:center">↔️</td><td style="padding:8px;border:1px solid var(--border)">Classe</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">Coluna</td><td style="padding:8px;border:1px solid var(--border);text-align:center">↔️</td><td style="padding:8px;border:1px solid var(--border)">Atributo / Propriedade</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">Linha (registro)</td><td style="padding:8px;border:1px solid var(--border);text-align:center">↔️</td><td style="padding:8px;border:1px solid var(--border)">Objeto (instância)</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">Chave Estrangeira</td><td style="padding:8px;border:1px solid var(--border);text-align:center">↔️</td><td style="padding:8px;border:1px solid var(--border)">Referência entre objetos</td></tr>
    </table>
    <div style="margin-top:12px;padding:12px;background:rgba(30,30,50,.6);border-radius:8px;border:1px solid var(--border);font-size:12px;font-family:monospace;line-height:1.8">
      <span style="color:#7c6af7">// SEM ORM — SQL puro:</span><br>
      <span style="color:#f87171">SELECT * FROM produtos WHERE id = 1</span><br><br>
      <span style="color:#7c6af7">// COM ORM (Sequelize/JS):</span><br>
      <span style="color:#34d399">Produto.findByPk(1)</span> <span style="color:#7a7d8c">← muito mais simples!</span>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px;line-height:1.9">
      <strong>📓 Copie:</strong> ORM = Tabela ↔ Classe | Coluna ↔ Atributo | Linha ↔ Objeto<br>
      Vantagem: escreve menos SQL | Código mais limpo | Troca de banco mais fácil<br>
      Desvantagem: pode ser mais lento para queries complexas
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">🛠️ Frameworks de Persistência — Os mais usados</h3>
    <p>Cada linguagem tem seus frameworks de persistência mais populares. Conheça os principais do mercado:</p>
    <div style="display:grid;gap:8px;margin-top:12px">
      <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        ☕ <strong>Hibernate / JPA</strong> (Java)<br>
        ORM mais usado no Java. JPA é a especificação; Hibernate é a implementação mais popular. Usado com Spring Boot.
      </div>
      <div style="padding:12px;background:rgba(124,106,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        🐍 <strong>Django ORM</strong> (Python)<br>
        ORM nativo do Django. Extremamente produtivo — cria tabelas, queries e admin automaticamente.
      </div>
      <div style="padding:12px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        🟦 <strong>Entity Framework Core</strong> (C# / .NET)<br>
        ORM da Microsoft. Suporta Code-First, Database-First e Migrations nativas. Muito usado em sistemas corporativos.
      </div>
      <div style="padding:12px;background:rgba(251,191,36,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        🟩 <strong>Sequelize / Prisma</strong> (JavaScript/Node.js)<br>
        Sequelize é o ORM clássico do Node. Prisma é o moderno — type-safe, com ótima DX e migrations integradas.
      </div>
      <div style="padding:12px;background:rgba(248,113,113,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        🐘 <strong>Eloquent</strong> (PHP/Laravel)<br>
        ORM do Laravel, elegante e intuitivo. Usa o padrão Active Record — cada modelo representa uma tabela.
      </div>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
      <strong>📓 Copie:</strong> Java: Hibernate/JPA | Python: Django ORM | C#: Entity Framework | JS: Sequelize/Prisma | PHP: Eloquent
    </div>`
  ],
  perguntas: [
    { pergunta: "O que é persistência de dados em uma aplicação?", opcoes: [{texto:"Manter os dados apenas na memória RAM",correta:false},{texto:"Salvar dados permanentemente para que sobrevivam ao encerramento do programa",correta:true},{texto:"Sincronizar dados com outros usuários em tempo real",correta:false},{texto:"Criptografar os dados sensíveis da aplicação",correta:false}] },
    { pergunta: "No modelo Database-First, qual é a sequência correta?", opcoes: [{texto:"Código → Diagrama → Banco",correta:false},{texto:"Diagrama → Banco → Código",correta:false},{texto:"Banco criado primeiro → código gerado a partir dele",correta:true},{texto:"Código criado primeiro → banco gerado depois",correta:false}] },
    { pergunta: "Qual abordagem é mais adequada para integrar um sistema novo a um banco de dados já existente em produção?", opcoes: [{texto:"Code-First",correta:false},{texto:"Model-First",correta:false},{texto:"Database-First",correta:true},{texto:"Schema-First",correta:false}] },
    { pergunta: "No Code-First, qual é a sequência?", opcoes: [{texto:"Banco → Classes → Migrations",correta:false},{texto:"Diagrama → Classes → Banco",correta:false},{texto:"Classes escritas pelo dev → Migration gerada → Banco criado automaticamente",correta:true},{texto:"SQL escrito → Classes geradas → Banco atualizado",correta:false}] },
    { pergunta: "O que é uma Migration?", opcoes: [{texto:"Uma cópia de segurança do banco de dados",correta:false},{texto:"Um arquivo que registra uma mudança na estrutura do banco, versionando-o ao longo do tempo",correta:true},{texto:"Um script para migrar dados de um banco para outro",correta:false},{texto:"Um relatório de desempenho do banco de dados",correta:false}] },
    { pergunta: "O que faz o método down() em uma Migration?", opcoes: [{texto:"Aplica a migration e avança a versão do banco",correta:false},{texto:"Remove todos os dados da tabela",correta:false},{texto:"Desfaz a migration (rollback), voltando o banco ao estado anterior",correta:true},{texto:"Cria uma nova migration em branco",correta:false}] },
    { pergunta: "No mapeamento ORM, uma tabela do banco corresponde a qual elemento do código?", opcoes: [{texto:"Um método",correta:false},{texto:"Uma função",correta:false},{texto:"Uma Classe",correta:true},{texto:"Um arquivo de configuração",correta:false}] },
    { pergunta: "No mapeamento ORM, uma linha (registro) do banco corresponde a:", opcoes: [{texto:"Uma classe",correta:false},{texto:"Um atributo",correta:false},{texto:"Um objeto (instância da classe)",correta:true},{texto:"Um banco de dados inteiro",correta:false}] },
    { pergunta: "Qual é a principal VANTAGEM de usar um ORM?", opcoes: [{texto:"Sempre mais rápido que SQL puro",correta:false},{texto:"Permite manipular o banco usando a linguagem de programação sem escrever SQL",correta:true},{texto:"Elimina a necessidade de um banco de dados",correta:false},{texto:"Funciona apenas com bancos NoSQL",correta:false}] },
    { pergunta: "Qual framework de persistência é nativo do Django (Python)?", opcoes: [{texto:"Hibernate",correta:false},{texto:"Eloquent",correta:false},{texto:"Django ORM",correta:true},{texto:"Prisma",correta:false}] },
    { pergunta: "Qual ORM moderno para JavaScript/Node.js é conhecido por ser type-safe e ter ótima experiência de desenvolvimento?", opcoes: [{texto:"Sequelize",correta:false},{texto:"Hibernate",correta:false},{texto:"Prisma",correta:true},{texto:"Eloquent",correta:false}] },
    { pergunta: "Qual ORM é padrão do framework Laravel (PHP)?", opcoes: [{texto:"Doctrine",correta:false},{texto:"Eloquent",correta:true},{texto:"Prisma",correta:false},{texto:"Entity Framework",correta:false}] }
  ]
});

// ══════════════════════════════════════════════════════
// AULA 28 — TESTES DE APLICAÇÃO WEB E REST
// ══════════════════════════════════════════════════════
AULAS.push({
  id: 28,
  titulo: "Testes de Aplicação Web e REST",
  descricao: "Aprenda testes unitários, integrados e automatizados para garantir a qualidade do software",
  icone: "🧪",
  passos: [
    `<h3 style="margin-bottom:10px;color:var(--accent)">🧪 Por que Testar Software?</h3>
    <p>Testes de software são a prática de verificar se uma aplicação funciona corretamente. Sem testes, qualquer mudança no código pode introduzir bugs silenciosos que só aparecem em produção — com usuários reais.</p>
    <div style="display:grid;gap:8px;margin-top:12px">
      <div style="padding:12px;background:rgba(248,113,113,.08);border-radius:8px;border:1px solid rgba(248,113,113,.3);font-size:13px">
        💸 <strong>Custo de um bug:</strong><br>
        Bug encontrado em desenvolvimento: custo 1x<br>
        Bug encontrado em produção: custo 10x a 100x maior!
      </div>
      <div style="padding:12px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid rgba(52,211,153,.3);font-size:13px">
        ✅ <strong>Benefícios dos testes:</strong><br>
        • Detectar erros cedo e barato<br>
        • Confiança para refatorar código<br>
        • Documentação viva do comportamento<br>
        • Qualidade e confiabilidade do produto
      </div>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
      🏗️ <strong>Pirâmide de Testes:</strong> Muitos testes unitários (base) → Alguns integrados (meio) → Poucos E2E (topo)
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px;line-height:1.9">
      <strong>📓 Copie:</strong><br>
      Teste de software = verificar se o sistema funciona conforme o esperado<br>
      Bug em dev = barato | Bug em produção = caro e prejudicial<br>
      Pirâmide: Unitário (base) → Integrado → E2E/Interface (topo)
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">🔬 Testes Unitários — Testando peça por peça</h3>
    <p>Os <strong>testes unitários</strong> testam a menor unidade do código de forma isolada — geralmente uma função, método ou classe — sem depender de banco de dados, rede ou outros serviços externos.</p>
    <div style="display:grid;gap:8px;margin-top:12px">
      <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        🎯 <strong>Características:</strong><br>
        • Rápidos (milissegundos cada)<br>
        • Isolados — sem banco, sem rede<br>
        • Determinísticos — sempre mesmo resultado<br>
        • Muitos no projeto (base da pirâmide)
      </div>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(30,30,50,.6);border-radius:8px;border:1px solid var(--border);font-size:12px;font-family:monospace;line-height:1.8">
      <span style="color:#7c6af7">// Função a ser testada:</span><br>
      <span style="color:#4f8ef7">function</span> <span style="color:#34d399">calcularDesconto</span>(preco, pct) {<br>
      &nbsp;&nbsp;<span style="color:#4f8ef7">return</span> preco - (preco * pct / 100);<br>
      }<br><br>
      <span style="color:#7c6af7">// Teste unitário (Jest/JS):</span><br>
      <span style="color:#fbbf24">test</span>(<span style="color:#f87171">'desconto de 10% em R$100'</span>, () => {<br>
      &nbsp;&nbsp;<span style="color:#fbbf24">expect</span>(calcularDesconto(100, 10)).<span style="color:#34d399">toBe</span>(90);<br>
      });
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px;line-height:1.9">
      <strong>📓 Copie:</strong> Teste unitário = testa uma função isolada, sem dependências externas<br>
      Padrão AAA: Arrange (prepara) → Act (executa) → Assert (verifica)<br>
      Ferramentas: Jest (JS), JUnit (Java), pytest (Python), NUnit (C#)
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">🔗 Testes Integrados — Testando a comunicação</h3>
    <p>Os <strong>testes integrados</strong> verificam se diferentes partes da aplicação funcionam corretamente em conjunto: o código com o banco de dados, a API com os serviços, os módulos entre si.</p>
    <div style="display:grid;gap:8px;margin-top:12px">
      <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        🎯 <strong>Características:</strong><br>
        • Mais lentos que unitários<br>
        • Usam banco de dados real (geralmente de teste)<br>
        • Testam a integração entre camadas (Controller → Service → Repository)<br>
        • Número moderado no projeto
      </div>
      <div style="padding:12px;background:rgba(124,106,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        🌐 <strong>Exemplos de teste integrado em REST API:</strong><br>
        • POST /usuarios → verifica se o usuário foi salvo no banco<br>
        • GET /produtos/1 → verifica se retorna o produto correto<br>
        • DELETE /pedidos/5 → verifica se o pedido foi removido
      </div>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(30,30,50,.6);border-radius:8px;border:1px solid var(--border);font-size:12px;font-family:monospace;line-height:1.8">
      <span style="color:#7c6af7">// Teste integrado de API REST (SuperTest/JS):</span><br>
      <span style="color:#fbbf24">test</span>(<span style="color:#f87171">'POST /usuarios cria usuário'</span>, <span style="color:#4f8ef7">async</span> () => {<br>
      &nbsp;&nbsp;<span style="color:#4f8ef7">const</span> res = <span style="color:#4f8ef7">await</span> request(app)<br>
      &nbsp;&nbsp;&nbsp;&nbsp;.post(<span style="color:#f87171">'/usuarios'</span>)<br>
      &nbsp;&nbsp;&nbsp;&nbsp;.send({ nome: <span style="color:#f87171">'João'</span>, email: <span style="color:#f87171">'joao@teste.com'</span> });<br>
      &nbsp;&nbsp;<span style="color:#fbbf24">expect</span>(res.status).<span style="color:#34d399">toBe</span>(201);<br>
      &nbsp;&nbsp;<span style="color:#fbbf24">expect</span>(res.body.nome).<span style="color:#34d399">toBe</span>(<span style="color:#f87171">'João'</span>);<br>
      });
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
      <strong>📓 Copie:</strong> Teste integrado = testa múltiplas camadas juntas (ex: API + banco)<br>
      Mais lento que unitário | Usa banco de dados de teste separado<br>
      Ferramentas: SuperTest (JS), RestAssured (Java), pytest + requests (Python)
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">⚙️ Testes Automatizados — Testando sem parar</h3>
    <p>Os <strong>testes automatizados</strong> são executados automaticamente por um sistema, sem intervenção humana. Eles rodam a cada commit, pull request ou deploy, garantindo que nenhuma mudança quebre o sistema.</p>
    <div style="display:grid;gap:8px;margin-top:12px">
      <div style="padding:12px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid rgba(52,211,153,.3);font-size:13px">
        ✅ <strong>Vantagens:</strong><br>
        • Roda 24/7 sem ninguém manualmente clicar<br>
        • Detecta regressões imediatamente<br>
        • Feedback rápido para o desenvolvedor<br>
        • Essencial em equipes grandes (muitas pessoas commitando)
      </div>
      <div style="padding:12px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        🔄 <strong>CI/CD — Integração e Entrega Contínua:</strong><br>
        Testes automatizados são o coração do CI/CD.<br>
        Commit → Testes rodam → ✅ Aprovado → Deploy automático<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;❌ Falhou → Deploy bloqueado!
      </div>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(251,191,36,.08);border-radius:8px;border:1px solid rgba(251,191,36,.3);font-size:13px">
      🛠️ <strong>Ferramentas de automação de testes:</strong><br>
      • <strong>GitHub Actions / GitLab CI</strong> — pipeline de CI/CD<br>
      • <strong>Jenkins</strong> — servidor de automação open-source<br>
      • <strong>Selenium / Cypress / Playwright</strong> — testes de interface no navegador (E2E)<br>
      • <strong>Postman / Newman</strong> — testes automatizados de API REST
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
      <strong>📓 Copie:</strong> Automação = testes rodando sozinhos a cada mudança no código<br>
      CI/CD: Commit → Testes → ✅Deploy ou ❌Bloqueio<br>
      Ferramentas E2E: Cypress, Playwright, Selenium | API: Postman/Newman
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">🌐 Testando APIs REST com Postman</h3>
    <p>O <strong>Postman</strong> é a ferramenta mais popular para testar APIs REST manualmente e de forma automatizada. Permite enviar requisições HTTP e verificar as respostas:</p>
    <table style="width:100%;border-collapse:collapse;margin-top:12px;font-size:13px">
      <tr style="background:rgba(79,142,247,.15)">
        <th style="padding:8px;border:1px solid var(--border)">Método HTTP</th>
        <th style="padding:8px;border:1px solid var(--border)">Operação</th>
        <th style="padding:8px;border:1px solid var(--border)">Exemplo</th>
      </tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">GET</td><td style="padding:8px;border:1px solid var(--border)">Buscar dados</td><td style="padding:8px;border:1px solid var(--border)">GET /produtos</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">POST</td><td style="padding:8px;border:1px solid var(--border)">Criar recurso</td><td style="padding:8px;border:1px solid var(--border)">POST /produtos</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">PUT</td><td style="padding:8px;border:1px solid var(--border)">Atualizar completo</td><td style="padding:8px;border:1px solid var(--border)">PUT /produtos/1</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">PATCH</td><td style="padding:8px;border:1px solid var(--border)">Atualizar parcial</td><td style="padding:8px;border:1px solid var(--border)">PATCH /produtos/1</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">DELETE</td><td style="padding:8px;border:1px solid var(--border)">Remover recurso</td><td style="padding:8px;border:1px solid var(--border)">DELETE /produtos/1</td></tr>
    </table>
    <div style="margin-top:12px;padding:12px;background:rgba(124,106,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
      📋 <strong>Códigos de status HTTP importantes:</strong><br>
      200 OK | 201 Created | 400 Bad Request | 401 Unauthorized | 404 Not Found | 500 Internal Server Error
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
      <strong>📓 Copie:</strong> Métodos REST: GET (buscar) | POST (criar) | PUT (atualizar) | DELETE (remover)<br>
      Postman: ferramenta para testar e documentar APIs REST<br>
      Status: 200=OK | 201=Criado | 404=Não encontrado | 500=Erro no servidor
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">📐 TDD — Desenvolvimento Orientado a Testes</h3>
    <p>O <strong>TDD (Test-Driven Development)</strong> é uma metodologia onde o teste é escrito ANTES do código de produção. Parece estranho, mas aumenta muito a qualidade e o design do código.</p>
    <div style="display:grid;gap:8px;margin-top:12px">
      <div style="padding:14px;background:rgba(248,113,113,.08);border-radius:8px;border:1px solid rgba(248,113,113,.3);font-size:13px;text-align:center">
        <strong>🔴 Red — Escreve o teste (que vai falhar)</strong><br>
        <span style="color:var(--muted);font-size:12px">O código ainda não existe, então o teste falha</span>
      </div>
      <div style="text-align:center;color:var(--accent)">↓</div>
      <div style="padding:14px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid rgba(52,211,153,.3);font-size:13px;text-align:center">
        <strong>🟢 Green — Escreve o mínimo de código para passar</strong><br>
        <span style="color:var(--muted);font-size:12px">Só o suficiente para o teste ficar verde</span>
      </div>
      <div style="text-align:center;color:var(--accent)">↓</div>
      <div style="padding:14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px;text-align:center">
        <strong>🔵 Refactor — Melhora o código mantendo o teste verde</strong><br>
        <span style="color:var(--muted);font-size:12px">Limpa, organiza, otimiza sem quebrar</span>
      </div>
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(251,191,36,.08);border-radius:8px;border:1px solid rgba(251,191,36,.3);font-size:13px">
      💡 <strong>Benefícios do TDD:</strong> Código mais simples | 100% de cobertura | Design melhor | Menos bugs | Refatoração segura
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px;line-height:1.9">
      <strong>📓 Copie:</strong> TDD = Test-Driven Development<br>
      Ciclo: 🔴 Red (teste falha) → 🟢 Green (código mínimo) → 🔵 Refactor (melhora)<br>
      Teste escrito ANTES do código = código mais confiável e simples
    </div>`,

    `<h3 style="margin-bottom:10px;color:var(--accent)">📊 Comparativo Completo — Tipos de Teste</h3>
    <p>Consolidando todo o conhecimento: veja as diferenças entre todos os tipos de teste lado a lado:</p>
    <table style="width:100%;border-collapse:collapse;margin-top:12px;font-size:12px">
      <tr style="background:rgba(79,142,247,.15)">
        <th style="padding:8px;border:1px solid var(--border)">Tipo</th>
        <th style="padding:8px;border:1px solid var(--border)">O que testa</th>
        <th style="padding:8px;border:1px solid var(--border)">Velocidade</th>
        <th style="padding:8px;border:1px solid var(--border)">Ferramentas</th>
      </tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">🔬 Unitário</td><td style="padding:8px;border:1px solid var(--border)">Função/método isolado</td><td style="padding:8px;border:1px solid var(--border);color:#34d399">Muito rápido</td><td style="padding:8px;border:1px solid var(--border)">Jest, JUnit, pytest</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">🔗 Integrado</td><td style="padding:8px;border:1px solid var(--border)">Camadas juntas + banco</td><td style="padding:8px;border:1px solid var(--border);color:#fbbf24">Médio</td><td style="padding:8px;border:1px solid var(--border)">SuperTest, RestAssured</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">🌐 E2E / UI</td><td style="padding:8px;border:1px solid var(--border)">Fluxo completo no navegador</td><td style="padding:8px;border:1px solid var(--border);color:#f87171">Lento</td><td style="padding:8px;border:1px solid var(--border)">Cypress, Playwright</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">⚙️ Automatizado</td><td style="padding:8px;border:1px solid var(--border)">Qualquer tipo, sem humano</td><td style="padding:8px;border:1px solid var(--border);color:#fbbf24">Varia</td><td style="padding:8px;border:1px solid var(--border)">GitHub Actions, Jenkins</td></tr>
      <tr><td style="padding:8px;border:1px solid var(--border)">🔌 API REST</td><td style="padding:8px;border:1px solid var(--border)">Endpoints HTTP</td><td style="padding:8px;border:1px solid var(--border);color:#fbbf24">Médio</td><td style="padding:8px;border:1px solid var(--border)">Postman, Newman</td></tr>
    </table>
    <div style="margin-top:12px;padding:12px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid rgba(52,211,153,.3);font-size:13px">
      🎯 <strong>Regra de ouro da Pirâmide de Testes:</strong><br>
      70% unitários + 20% integrados + 10% E2E = equilíbrio ideal de custo e confiança
    </div>
    <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px;line-height:1.9">
      <strong>📓 Copie — Resumão final:</strong><br>
      Unitário: rápido, isolado, muitos | Integrado: banco+código, médio | E2E: lento, poucos<br>
      TDD: teste antes do código | CI/CD: automatização do deploy<br>
      Pirâmide: 70% unit + 20% integrado + 10% E2E
    </div>`
  ],
  perguntas: [
    { pergunta: "Por que testar software é importante?", opcoes: [{texto:"Para aumentar o tamanho do projeto",correta:false},{texto:"Para detectar erros cedo, com menor custo, e garantir qualidade e confiabilidade",correta:true},{texto:"Porque é obrigatório por lei para todos os sistemas",correta:false},{texto:"Porque substitui a necessidade de um banco de dados",correta:false}] },
    { pergunta: "O que caracteriza um teste UNITÁRIO?", opcoes: [{texto:"Testa a aplicação completa do início ao fim no navegador",correta:false},{texto:"Testa apenas a integração entre banco de dados e API",correta:false},{texto:"Testa uma função ou método isolado, sem dependências externas",correta:true},{texto:"Testa a comunicação entre microsserviços",correta:false}] },
    { pergunta: "O que o padrão AAA significa nos testes unitários?", opcoes: [{texto:"Authenticate, Authorize, Audit",correta:false},{texto:"Arrange (prepara), Act (executa), Assert (verifica)",correta:true},{texto:"Async, Await, Assert",correta:false},{texto:"Add, Alter, Assert",correta:false}] },
    { pergunta: "Qual é a principal diferença entre testes unitários e testes integrados?", opcoes: [{texto:"Unitários são escritos em Java; integrados em Python",correta:false},{texto:"Unitários testam partes isoladas; integrados testam múltiplas camadas juntas (ex: API + banco)",correta:true},{texto:"Integrados são sempre mais rápidos que unitários",correta:false},{texto:"Unitários precisam de banco de dados; integrados não",correta:false}] },
    { pergunta: "O que é CI/CD no contexto de testes automatizados?", opcoes: [{texto:"Código Integrado / Código Distribuído",correta:false},{texto:"Integração Contínua / Entrega Contínua — pipeline que roda testes a cada mudança no código",correta:true},{texto:"Um framework de testes para JavaScript",correta:false},{texto:"Uma ferramenta para criar banco de dados automaticamente",correta:false}] },
    { pergunta: "O que acontece em um pipeline CI/CD quando os testes FALHAM?", opcoes: [{texto:"O deploy acontece normalmente com um aviso",correta:false},{texto:"Os testes são ignorados e o código vai para produção",correta:false},{texto:"O deploy é bloqueado automaticamente até os testes passarem",correta:true},{texto:"O sistema reinicia e tenta rodar os testes de novo",correta:false}] },
    { pergunta: "Qual ferramenta é amplamente usada para testar e documentar APIs REST manualmente?", opcoes: [{texto:"Selenium",correta:false},{texto:"JUnit",correta:false},{texto:"Postman",correta:true},{texto:"Maven",correta:false}] },
    { pergunta: "Qual método HTTP deve ser usado para CRIAR um novo recurso em uma API REST?", opcoes: [{texto:"GET",correta:false},{texto:"PUT",correta:false},{texto:"POST",correta:true},{texto:"DELETE",correta:false}] },
    { pergunta: "Qual código de status HTTP indica que um recurso NÃO foi encontrado?", opcoes: [{texto:"200",correta:false},{texto:"201",correta:false},{texto:"500",correta:false},{texto:"404",correta:true}] },
    { pergunta: "No TDD, qual é a sequência correta do ciclo?", opcoes: [{texto:"Green → Red → Refactor",correta:false},{texto:"Refactor → Red → Green",correta:false},{texto:"Red → Green → Refactor",correta:true},{texto:"Code → Test → Deploy",correta:false}] },
    { pergunta: "Qual ferramenta é usada para testes automatizados End-to-End (E2E) no navegador?", opcoes: [{texto:"JUnit",correta:false},{texto:"Cypress ou Playwright",correta:true},{texto:"Maven",correta:false},{texto:"Postman",correta:false}] },
    { pergunta: "De acordo com a Pirâmide de Testes, qual proporção ideal representa o equilíbrio correto?", opcoes: [{texto:"10% unitários + 20% integrados + 70% E2E",correta:false},{texto:"33% de cada tipo igualmente",correta:false},{texto:"70% unitários + 20% integrados + 10% E2E",correta:true},{texto:"50% unitários + 50% E2E, sem integrados",correta:false}] }
  ]
});

// ══════════════════════════════════════════════════════════════════
// AULAS — TECNOLOGIA DA INFORMAÇÃO EM ADMINISTRAÇÃO
// 1º BIMESTRE — Alinhado ao PTD (Etec Prof. Milton Gazzetti, 2026)
// Docente: Marco Ramon Silva Escudeiro
// Componente: TIA - Grupo B | 3ª Série A | Turno: Manhã
// ══════════════════════════════════════════════════════════════════

// Cole este bloco no final do seu arquivo aulas.js existente,
// ANTES do último fechamento de ]);  — ou adicione os objetos
// dentro do array AULAS já existente.

AULAS.push(

  // ══════════════════════════════════════════════════════
  // AULA TIA-01 — APRESENTAÇÃO E SISTEMAS OPERACIONAIS
  // Cronograma PTD: 09/02 a 07/03
  // Competência 1 | Habilidades 1.1, 1.2, 1.3
  // ══════════════════════════════════════════════════════
  {
    id: 101,
    titulo: "Sistemas Operacionais de Gerenciamento",
    descricao: "Conheça os tipos, características e funções básicas dos sistemas operacionais usados nas empresas",
    icone: "🖥️",
    passos: [

      `<h3 style="margin-bottom:10px;color:var(--accent)">📋 Bem-vindo ao componente curricular!</h3>
      <p>Neste componente você vai aprender como a <strong>Tecnologia da Informação</strong> é usada para gerenciar negócios. Veja o que estudaremos:</p>
      <div style="display:grid;gap:8px;margin-top:14px">
        <div style="padding:12px 16px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          🖥️ <strong>Sistemas Operacionais de Gerenciamento</strong> — tipos, características e funções
        </div>
        <div style="padding:12px 16px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          📊 <strong>SIG — Sistema de Informações Gerenciais</strong> — tomada de decisão e cadastro de dados
        </div>
        <div style="padding:12px 16px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          📨 <strong>Comunicação Empresarial</strong> — meios digitais entre empresas, fornecedores e clientes
        </div>
        <div style="padding:12px 16px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          🗄️ <strong>Bancos de Dados</strong> — armazenar e organizar informações gerenciais
        </div>
      </div>
      <div style="margin-top:14px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
        <strong>📓 Anote:</strong> TIA = Tecnologia da Informação em Administração<br>
        Objetivo: usar recursos tecnológicos para gerenciar melhor os negócios.
      </div>`,

      `<h3 style="margin-bottom:10px;color:var(--accent)">🖥️ O que é um Sistema Operacional?</h3>
      <p>O <strong>Sistema Operacional (SO)</strong> é o software principal de um computador. Ele gerencia o hardware e permite que outros programas funcionem.</p>
      <div style="margin-top:12px;padding:14px;background:rgba(79,142,247,.08);border-radius:10px;border:1px solid var(--border);font-size:13px;line-height:1.9">
        💡 <strong>Analogia:</strong> O SO é como o <em>gerente de uma empresa</em>: ele organiza os recursos (memória, processador, disco) e distribui tarefas entre os programas — assim como um gerente distribui tarefas entre os funcionários.
      </div>
      <div style="display:grid;gap:8px;margin-top:12px">
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          🪟 <strong>Windows</strong> — mais usado em empresas, interface gráfica intuitiva
        </div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          🐧 <strong>Linux</strong> — gratuito e seguro, muito usado em servidores corporativos
        </div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          🍎 <strong>macOS</strong> — da Apple, popular em empresas de design e criatividade
        </div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          📱 <strong>Android / iOS</strong> — sistemas para dispositivos móveis (celulares e tablets)
        </div>
      </div>
      <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
        <strong>📓 Copie:</strong> Sistema Operacional = software que gerencia o computador<br>
        Exemplos: Windows, Linux, macOS, Android, iOS
      </div>`,

      `<h3 style="margin-bottom:10px;color:var(--accent)">🔧 Tipos de Sistemas Operacionais</h3>
      <p>Os sistemas operacionais podem ser classificados pelo seu uso. Na administração de empresas, é essencial conhecer os diferentes tipos:</p>
      <table style="width:100%;border-collapse:collapse;margin-top:12px;font-size:13px">
        <tr style="background:rgba(79,142,247,.15)">
          <th style="padding:9px;border:1px solid var(--border)">Tipo</th>
          <th style="padding:9px;border:1px solid var(--border)">Uso Principal</th>
          <th style="padding:9px;border:1px solid var(--border)">Exemplo</th>
        </tr>
        <tr>
          <td style="padding:9px;border:1px solid var(--border)">🖥️ Desktop</td>
          <td style="padding:9px;border:1px solid var(--border)">Computadores pessoais e de escritório</td>
          <td style="padding:9px;border:1px solid var(--border)">Windows 11, macOS</td>
        </tr>
        <tr>
          <td style="padding:9px;border:1px solid var(--border)">🗄️ Servidor</td>
          <td style="padding:9px;border:1px solid var(--border)">Gerencia redes e serviços corporativos</td>
          <td style="padding:9px;border:1px solid var(--border)">Windows Server, Linux</td>
        </tr>
        <tr>
          <td style="padding:9px;border:1px solid var(--border)">📱 Mobile</td>
          <td style="padding:9px;border:1px solid var(--border)">Celulares e tablets usados no trabalho</td>
          <td style="padding:9px;border:1px solid var(--border)">Android, iOS</td>
        </tr>
        <tr>
          <td style="padding:9px;border:1px solid var(--border)">☁️ Nuvem</td>
          <td style="padding:9px;border:1px solid var(--border)">Serviços e sistemas via internet</td>
          <td style="padding:9px;border:1px solid var(--border)">Google Cloud, Azure, AWS</td>
        </tr>
      </table>
      <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
        <strong>📓 Copie:</strong> Desktop: escritórios | Servidor: redes corporativas | Mobile: celulares | Nuvem: internet<br>
        Na administração, usamos todos esses tipos para gerenciar as operações da empresa.
      </div>`,

      `<h3 style="margin-bottom:10px;color:var(--accent)">⚙️ Funções Básicas dos Sistemas Operacionais</h3>
      <p>Todo sistema operacional realiza funções essenciais para que a empresa possa trabalhar:</p>
      <div style="display:grid;gap:8px;margin-top:12px">
        <div style="padding:12px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          🧠 <strong>Gerenciamento de Processos</strong><br>
          <span style="color:var(--muted)">Controla quais programas estão rodando e distribui o uso do processador</span>
        </div>
        <div style="padding:12px 14px;background:rgba(124,106,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          💾 <strong>Gerenciamento de Memória</strong><br>
          <span style="color:var(--muted)">Define quanto de RAM cada programa pode usar, evitando conflitos</span>
        </div>
        <div style="padding:12px 14px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          📁 <strong>Gerenciamento de Arquivos</strong><br>
          <span style="color:var(--muted)">Organiza pastas e arquivos no disco rígido da empresa</span>
        </div>
        <div style="padding:12px 14px;background:rgba(251,191,36,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          🔒 <strong>Gerenciamento de Segurança</strong><br>
          <span style="color:var(--muted)">Controla quem pode acessar os dados e sistemas da empresa</span>
        </div>
        <div style="padding:12px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          🖨️ <strong>Gerenciamento de Dispositivos</strong><br>
          <span style="color:var(--muted)">Controla impressoras, scanners, câmeras e outros periféricos</span>
        </div>
      </div>
      <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
        <strong>📓 Copie — Funções do SO:</strong><br>
        1. Processos 2. Memória 3. Arquivos 4. Segurança 5. Dispositivos
      </div>`,

      `<h3 style="margin-bottom:10px;color:var(--accent)">💼 Softwares de Gerenciamento Empresarial</h3>
      <p>Além do sistema operacional, as empresas utilizam <strong>softwares específicos</strong> para gerenciar suas atividades. Conheça os principais:</p>
      <div style="display:grid;gap:8px;margin-top:12px">
        <div style="padding:12px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          📊 <strong>ERP (Enterprise Resource Planning)</strong><br>
          <span style="color:var(--muted)">Integra todos os setores: financeiro, RH, estoque, vendas. Ex: SAP, TOTVS</span>
        </div>
        <div style="padding:12px 14px;background:rgba(124,106,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          🤝 <strong>CRM (Customer Relationship Management)</strong><br>
          <span style="color:var(--muted)">Gerencia o relacionamento com clientes e vendas. Ex: Salesforce, HubSpot</span>
        </div>
        <div style="padding:12px 14px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          📋 <strong>Planilhas Eletrônicas</strong><br>
          <span style="color:var(--muted)">Controle financeiro, metas e relatórios. Ex: Excel, Google Sheets</span>
        </div>
        <div style="padding:12px 14px;background:rgba(251,191,36,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          ☁️ <strong>Sistemas em Nuvem (SaaS)</strong><br>
          <span style="color:var(--muted)">Acessados pelo navegador, sem instalar. Ex: Google Workspace, Microsoft 365</span>
        </div>
      </div>
      <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
        <strong>📓 Copie:</strong> ERP: integra toda a empresa | CRM: foco em clientes | Planilha: controles simples | SaaS: nuvem<br>
        Habilidade 1.1: utilizar diferentes softwares de gerenciamento para as atividades.
      </div>`
    ],
    perguntas: [
      { pergunta: "O que é um Sistema Operacional?", opcoes: [{texto:"Um antivírus",correta:false},{texto:"Software principal que gerencia o hardware e permite rodar outros programas",correta:true},{texto:"Um tipo de planilha eletrônica",correta:false},{texto:"Um banco de dados",correta:false}] },
      { pergunta: "Qual sistema operacional é mais comum em servidores corporativos por ser gratuito e seguro?", opcoes: [{texto:"Windows",correta:false},{texto:"macOS",correta:false},{texto:"Linux",correta:true},{texto:"Android",correta:false}] },
      { pergunta: "Qual software integra TODOS os setores de uma empresa (financeiro, RH, estoque)?", opcoes: [{texto:"CRM",correta:false},{texto:"ERP",correta:true},{texto:"SIG",correta:false},{texto:"SAC",correta:false}] },
      { pergunta: "O CRM é usado principalmente para:", opcoes: [{texto:"Armazenar arquivos da empresa",correta:false},{texto:"Gerenciar o relacionamento com clientes e vendas",correta:true},{texto:"Controlar o sistema operacional",correta:false},{texto:"Criar planilhas financeiras",correta:false}] },
      { pergunta: "Qual função do SO é responsável por controlar quem pode acessar os dados da empresa?", opcoes: [{texto:"Gerenciamento de Memória",correta:false},{texto:"Gerenciamento de Arquivos",correta:false},{texto:"Gerenciamento de Segurança",correta:true},{texto:"Gerenciamento de Dispositivos",correta:false}] },
      { pergunta: "Google Workspace e Microsoft 365 são exemplos de:", opcoes: [{texto:"Sistemas Operacionais",correta:false},{texto:"Softwares instalados localmente",correta:false},{texto:"Sistemas em Nuvem (SaaS)",correta:true},{texto:"Sistemas Operacionais de servidor",correta:false}] },
      { pergunta: "Qual tipo de SO é usado para gerenciar redes e serviços corporativos?", opcoes: [{texto:"Mobile",correta:false},{texto:"Desktop",correta:false},{texto:"Servidor",correta:true},{texto:"Nuvem",correta:false}] },
      { pergunta: "Planilhas eletrônicas como Excel servem para:", opcoes: [{texto:"Gerenciar o processador do computador",correta:false},{texto:"Controle financeiro, metas e relatórios",correta:true},{texto:"Substituir o sistema operacional",correta:false},{texto:"Gerenciar a memória RAM",correta:false}] }
    ]
  },

  // ══════════════════════════════════════════════════════
  // AULA TIA-02 — SIG: SISTEMA DE INFORMAÇÕES GERENCIAIS
  // Cronograma PTD: 09/03 a 27/03
  // Competência 1 | Habilidades 1.1, 1.2, 1.3
  // ══════════════════════════════════════════════════════
  {
    id: 102,
    titulo: "SIG — Sistema de Informações Gerenciais",
    descricao: "Entenda o que é o SIG, sua importância e como ele ajuda na tomada de decisão nas empresas",
    icone: "📊",
    passos: [

      `<h3 style="margin-bottom:10px;color:var(--accent)">📊 O que é o SIG?</h3>
      <p>O <strong>SIG (Sistema de Informações Gerenciais)</strong> é um conjunto de recursos tecnológicos que coleta, organiza e apresenta informações para apoiar as decisões dos gestores.</p>
      <div style="margin-top:14px;padding:14px;background:rgba(79,142,247,.08);border-radius:10px;border:1px solid var(--border);font-size:13px;line-height:1.9">
        💡 <strong>Analogia:</strong> Imagine o SIG como o <em>painel de instrumentos de um avião</em>: o piloto (gestor) não precisa sair do cockpit para saber a velocidade, altitude e combustível — tudo aparece organizado na tela para ele tomar decisões rápidas e seguras.
      </div>
      <div style="display:grid;gap:8px;margin-top:12px">
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          📥 <strong>Coleta dados</strong> de vendas, estoque, finanças, RH...
        </div>
        <div style="padding:10px 14px;background:rgba(124,106,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          ⚙️ <strong>Processa</strong> esses dados e transforma em informação organizada
        </div>
        <div style="padding:10px 14px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          📈 <strong>Apresenta relatórios e gráficos</strong> para os gestores tomarem decisões
        </div>
      </div>
      <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
        <strong>📓 Copie:</strong> SIG = Sistema de Informações Gerenciais<br>
        Função: coletar dados → processar → gerar informações para a tomada de decisão
      </div>`,

      `<h3 style="margin-bottom:10px;color:var(--accent)">🎯 A Importância do SIG nas Empresas</h3>
      <p>Por que toda empresa moderna precisa de um SIG? Veja as principais razões:</p>
      <div style="display:grid;gap:8px;margin-top:12px">
        <div style="padding:12px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          ✅ <strong>Reduz incertezas</strong><br>
          <span style="color:var(--muted)">Decisões baseadas em dados reais, não em "achismo"</span>
        </div>
        <div style="padding:12px 14px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          ⚡ <strong>Agiliza processos</strong><br>
          <span style="color:var(--muted)">Relatórios gerados em segundos, não em dias</span>
        </div>
        <div style="padding:12px 14px;background:rgba(124,106,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          🎯 <strong>Melhora o foco</strong><br>
          <span style="color:var(--muted)">Gestores sabem exatamente onde estão os problemas e oportunidades</span>
        </div>
        <div style="padding:12px 14px;background:rgba(251,191,36,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          💰 <strong>Reduz custos</strong><br>
          <span style="color:var(--muted)">Evita desperdícios ao identificar ineficiências rapidamente</span>
        </div>
        <div style="padding:12px 14px;background:rgba(248,113,113,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          🔍 <strong>Monitora resultados</strong><br>
          <span style="color:var(--muted)">Acompanha metas, vendas e desempenho em tempo real</span>
        </div>
      </div>
      <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
        <strong>📓 Copie — Importância do SIG:</strong><br>
        Reduz incertezas | Agiliza processos | Melhora foco | Reduz custos | Monitora resultados
      </div>`,

      `<h3 style="margin-bottom:10px;color:var(--accent)">🤔 SIG como Ferramenta para Tomada de Decisão</h3>
      <p>A tomada de decisão é uma das funções mais importantes do administrador. O SIG apoia três níveis de decisão:</p>
      <div style="display:grid;gap:8px;margin-top:12px">
        <div style="padding:14px;background:rgba(248,113,113,.08);border-radius:8px;border:1px solid rgba(248,113,113,.3);font-size:13px">
          🏆 <strong>Nível Estratégico (Alta Direção)</strong><br>
          <span style="color:var(--muted)">Decisões de longo prazo: expandir a empresa, abrir nova filial, lançar produto</span><br>
          <span style="font-size:12px">📊 SIG fornece: relatórios de mercado, tendências, desempenho geral</span>
        </div>
        <div style="padding:14px;background:rgba(251,191,36,.08);border-radius:8px;border:1px solid rgba(251,191,36,.3);font-size:13px">
          📋 <strong>Nível Tático (Gerência)</strong><br>
          <span style="color:var(--muted)">Decisões de médio prazo: orçamento do setor, metas mensais, treinamento</span><br>
          <span style="font-size:12px">📊 SIG fornece: indicadores de desempenho, comparativos mensais</span>
        </div>
        <div style="padding:14px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid rgba(52,211,153,.3);font-size:13px">
          ⚙️ <strong>Nível Operacional (Supervisão)</strong><br>
          <span style="color:var(--muted)">Decisões do dia a dia: quantidade a pedir, escala de funcionários</span><br>
          <span style="font-size:12px">📊 SIG fornece: estoque atual, pedidos do dia, presenças</span>
        </div>
      </div>
      <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
        <strong>📓 Copie — 3 Níveis de Decisão:</strong><br>
        Estratégico: longo prazo (diretoria) | Tático: médio prazo (gerência) | Operacional: dia a dia (supervisão)
      </div>`,

      `<h3 style="margin-bottom:10px;color:var(--accent)">🗃️ Cadastro de Informações no SIG</h3>
      <p>Para que o SIG funcione, é preciso <strong>cadastrar as informações corretamente</strong>. Dados incorretos geram relatórios errados e decisões ruins!</p>
      <div style="margin-top:12px;padding:14px;background:rgba(248,113,113,.08);border-radius:8px;border:1px solid rgba(248,113,113,.3);font-size:13px">
        ⚠️ <strong>Princípio GIGO:</strong> <em>Garbage In, Garbage Out</em><br>
        "Lixo que entra, lixo que sai" — se você cadastra dados errados, o sistema dará respostas erradas.
      </div>
      <p style="margin-top:12px;margin-bottom:8px">Boas práticas no cadastro de dados:</p>
      <div style="display:grid;gap:8px">
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          ✅ Padronizar o formato dos dados (datas, CEPs, telefones)
        </div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          ✅ Validar informações antes de salvar (campo obrigatório, tipo correto)
        </div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          ✅ Manter os dados atualizados (endereço, telefone, preço)
        </div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          ✅ Evitar duplicidades (mesmo cliente cadastrado duas vezes)
        </div>
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          ✅ Fazer backup regularmente para não perder os dados
        </div>
      </div>
      <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
        <strong>📓 Copie:</strong> GIGO: dados errados = resultados errados<br>
        Boas práticas: padronizar, validar, atualizar, sem duplicatas, fazer backup
      </div>`,

      `<h3 style="margin-bottom:10px;color:var(--accent)">🏗️ Elaborando um SIG para a Sua Organização</h3>
      <p>Como criar um <strong>Sistema de Informações Gerenciais</strong> adequado para cada tipo de empresa? Siga as etapas:</p>
      <div style="display:grid;gap:8px;margin-top:12px">
        <div style="padding:14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px;display:flex;gap:12px;align-items:flex-start">
          <span style="font-size:22px">1️⃣</span>
          <div><strong>Identificar as necessidades</strong><br><span style="color:var(--muted)">Que informações o gestor precisa? Quais decisões ele toma?</span></div>
        </div>
        <div style="padding:14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px;display:flex;gap:12px;align-items:flex-start">
          <span style="font-size:22px">2️⃣</span>
          <div><strong>Mapear as fontes de dados</strong><br><span style="color:var(--muted)">Onde os dados estão? Vendas, estoque, financeiro, clientes...</span></div>
        </div>
        <div style="padding:14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px;display:flex;gap:12px;align-items:flex-start">
          <span style="font-size:22px">3️⃣</span>
          <div><strong>Definir os relatórios necessários</strong><br><span style="color:var(--muted)">Quais indicadores? Relatório diário, semanal, mensal?</span></div>
        </div>
        <div style="padding:14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px;display:flex;gap:12px;align-items:flex-start">
          <span style="font-size:22px">4️⃣</span>
          <div><strong>Escolher as ferramentas</strong><br><span style="color:var(--muted)">Excel, ERP, BI (Business Intelligence), ou sistema próprio?</span></div>
        </div>
        <div style="padding:14px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid rgba(52,211,153,.3);font-size:13px;display:flex;gap:12px;align-items:flex-start">
          <span style="font-size:22px">5️⃣</span>
          <div><strong>Implantar, treinar e monitorar</strong><br><span style="color:var(--muted)">Treinar a equipe, cadastrar dados e acompanhar os resultados</span></div>
        </div>
      </div>
      <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
        <strong>📓 Copie — Etapas para criar um SIG:</strong><br>
        1. Necessidades → 2. Fontes → 3. Relatórios → 4. Ferramentas → 5. Implantação
      </div>`
    ],
    perguntas: [
      { pergunta: "O que significa a sigla SIG?", opcoes: [{texto:"Sistema de Integração Geral",correta:false},{texto:"Sistema de Informações Gerenciais",correta:true},{texto:"Software de Inteligência de Gestão",correta:false},{texto:"Sistema Integrado de Gerenciamento",correta:false}] },
      { pergunta: "Para que serve um SIG?", opcoes: [{texto:"Apenas para controlar o estoque da empresa",correta:false},{texto:"Para coletar, processar e apresentar informações que apoiam decisões gerenciais",correta:true},{texto:"Para substituir os funcionários da empresa",correta:false},{texto:"Para instalar o sistema operacional nos computadores",correta:false}] },
      { pergunta: "O princípio GIGO significa:", opcoes: [{texto:"Quando o sistema é muito lento precisa de upgrade",correta:false},{texto:"Dados errados geram resultados errados — lixo entra, lixo sai",correta:true},{texto:"O gerente deve supervisionar todos os dados pessoalmente",correta:false},{texto:"O SIG é gratuito para pequenas empresas",correta:false}] },
      { pergunta: "Qual nível de decisão é responsável por decisões de LONGO PRAZO como expandir a empresa?", opcoes: [{texto:"Operacional",correta:false},{texto:"Tático",correta:false},{texto:"Estratégico",correta:true},{texto:"Supervisório",correta:false}] },
      { pergunta: "A gerência de vendas decide as metas mensais do setor. Isso é uma decisão de nível:", opcoes: [{texto:"Estratégico",correta:false},{texto:"Tático",correta:true},{texto:"Operacional",correta:false},{texto:"Consultivo",correta:false}] },
      { pergunta: "Um supervisor decide quantos funcionários escalar no turno da tarde. Isso é nível:", opcoes: [{texto:"Estratégico",correta:false},{texto:"Tático",correta:false},{texto:"Operacional",correta:true},{texto:"Executivo",correta:false}] },
      { pergunta: "Qual NÃO é uma boa prática no cadastro de dados no SIG?", opcoes: [{texto:"Padronizar o formato das informações",correta:false},{texto:"Evitar duplicidade de cadastros",correta:false},{texto:"Fazer backup regularmente",correta:false},{texto:"Cadastrar dados sem verificar se estão corretos para economizar tempo",correta:true}] },
      { pergunta: "Qual é a primeira etapa para elaborar um SIG adequado à organização?", opcoes: [{texto:"Escolher as ferramentas tecnológicas",correta:false},{texto:"Treinar os funcionários",correta:false},{texto:"Identificar as necessidades de informação do gestor",correta:true},{texto:"Comprar um servidor novo",correta:false}] }
    ]
  },

  // ══════════════════════════════════════════════════════
  // AULA TIA-03 — COMUNICAÇÃO EMPRESARIAL E COMERCIAL
  // Cronograma PTD: 30/03 a 24/04
  // Competência 1 | Habilidades 1.1, 1.2, 1.3
  // ══════════════════════════════════════════════════════
  {
    id: 103,
    titulo: "Comunicação Empresarial e Comercial",
    descricao: "Conheça os meios de comunicação digital entre empresas, fornecedores e consumidores",
    icone: "📨",
    passos: [

      `<h3 style="margin-bottom:10px;color:var(--accent)">📨 Comunicação Empresarial na Era Digital</h3>
      <p>A <strong>comunicação empresarial</strong> é o conjunto de processos que a empresa usa para se comunicar internamente (entre setores) e externamente (com clientes e fornecedores).</p>
      <div style="margin-top:12px;padding:14px;background:rgba(79,142,247,.08);border-radius:10px;border:1px solid var(--border);font-size:13px;line-height:1.9">
        💡 <strong>Por que isso é TI?</strong> Hoje, quase toda comunicação empresarial passa por sistemas digitais: e-mail, ERP, chats corporativos, portais de fornecedores, aplicativos de atendimento...
      </div>
      <div style="display:grid;gap:8px;margin-top:12px">
        <div style="padding:10px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          🏢 <strong>Comunicação Interna</strong> — entre departamentos, colaboradores e lideranças<br>
          <span style="color:var(--muted)">Ex: e-mail corporativo, Slack, Teams, sistemas ERP</span>
        </div>
        <div style="padding:10px 14px;background:rgba(124,106,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          🌐 <strong>Comunicação Externa</strong> — com clientes, fornecedores e parceiros<br>
          <span style="color:var(--muted)">Ex: site, redes sociais, e-mail comercial, WhatsApp Business, EDI</span>
        </div>
      </div>
      <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
        <strong>📓 Copie:</strong> Comunicação interna: entre funcionários/setores<br>
        Comunicação externa: com clientes, fornecedores e parceiros<br>
        Ferramentas: e-mail, Teams, Slack, WhatsApp Business, redes sociais, EDI
      </div>`,

      `<h3 style="margin-bottom:10px;color:var(--accent)">🔗 Meios de Comunicação entre Fornecedores e Consumidores</h3>
      <p>A tecnologia revolucionou a forma como empresas se comunicam com quem fornece e quem compra:</p>
      <table style="width:100%;border-collapse:collapse;margin-top:12px;font-size:13px">
        <tr style="background:rgba(79,142,247,.15)">
          <th style="padding:9px;border:1px solid var(--border)">Meio</th>
          <th style="padding:9px;border:1px solid var(--border)">Uso</th>
          <th style="padding:9px;border:1px solid var(--border)">Exemplo</th>
        </tr>
        <tr>
          <td style="padding:9px;border:1px solid var(--border)">📧 E-mail corporativo</td>
          <td style="padding:9px;border:1px solid var(--border)">Comunicação formal com fornecedores e clientes</td>
          <td style="padding:9px;border:1px solid var(--border)">Pedidos, contratos, propostas</td>
        </tr>
        <tr>
          <td style="padding:9px;border:1px solid var(--border)">📱 WhatsApp Business</td>
          <td style="padding:9px;border:1px solid var(--border)">Atendimento rápido ao cliente</td>
          <td style="padding:9px;border:1px solid var(--border)">Confirmação de pedido, suporte</td>
        </tr>
        <tr>
          <td style="padding:9px;border:1px solid var(--border)">🌐 Portal do Fornecedor</td>
          <td style="padding:9px;border:1px solid var(--border)">Gestão digital de pedidos de compra</td>
          <td style="padding:9px;border:1px solid var(--border)">Portal de compras da empresa</td>
        </tr>
        <tr>
          <td style="padding:9px;border:1px solid var(--border)">📦 EDI</td>
          <td style="padding:9px;border:1px solid var(--border)">Troca automática de documentos entre sistemas</td>
          <td style="padding:9px;border:1px solid var(--border)">Nota Fiscal eletrônica automática</td>
        </tr>
        <tr>
          <td style="padding:9px;border:1px solid var(--border)">📣 Redes Sociais</td>
          <td style="padding:9px;border:1px solid var(--border)">Marketing e relacionamento com consumidores</td>
          <td style="padding:9px;border:1px solid var(--border)">Instagram, LinkedIn, Facebook</td>
        </tr>
      </table>
      <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
        <strong>📓 Copie:</strong> EDI = Eletronic Data Interchange (troca eletrônica automática de dados)<br>
        NF-e = Nota Fiscal eletrônica | WhatsApp Business = atendimento ágil
      </div>`,

      `<h3 style="margin-bottom:10px;color:var(--accent)">📍 Sistemas de Rastreamento de Produtos</h3>
      <p>Como a empresa sabe onde está cada produto, do fornecedor até o cliente? Isso é feito por <strong>sistemas de rastreamento</strong>:</p>
      <div style="display:grid;gap:8px;margin-top:12px">
        <div style="padding:12px 14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          📦 <strong>Código de Barras / QR Code</strong><br>
          <span style="color:var(--muted)">Identificam produtos e permitem leitura rápida em qualquer ponto da cadeia logística</span>
        </div>
        <div style="padding:12px 14px;background:rgba(124,106,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          📡 <strong>RFID (Radio Frequency Identification)</strong><br>
          <span style="color:var(--muted)">Chip que transmite dados sem contato — usado em estoques e controle de acesso</span>
        </div>
        <div style="padding:12px 14px;background:rgba(52,211,153,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          🗺️ <strong>GPS / Rastreamento de Frota</strong><br>
          <span style="color:var(--muted)">Localização em tempo real de veículos e cargas durante o transporte</span>
        </div>
        <div style="padding:12px 14px;background:rgba(251,191,36,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
          🖥️ <strong>TMS (Sistema de Gestão de Transporte)</strong><br>
          <span style="color:var(--muted)">Software que coordena todo o processo logístico e emite status ao cliente</span>
        </div>
      </div>
      <div style="margin-top:12px;padding:14px;background:rgba(79,142,247,.08);border-radius:8px;border:1px solid var(--border);font-size:13px">
        🛒 <strong>Exemplo prático:</strong> Quando você compra no site dos Correios e acompanha o pacote pelo aplicativo — isso é um sistema de rastreamento integrado com GPS + banco de dados + notificações automáticas!
      </div>
      <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
        <strong>📓 Copie:</strong> Código de barras / QR Code: identificação | RFID: sem contato<br>
        GPS: localização em tempo real | TMS: gestão completa do transporte
      </div>`,

      `<h3 style="margin-bottom:10px;color:var(--accent)">✉️ Correio Eletrônico Corporativo</h3>
      <p>O <strong>e-mail corporativo</strong> é um dos meios de comunicação mais importantes nas empresas. Diferente do e-mail pessoal, o corporativo segue regras e representa a organização.</p>
      <div style="display:grid;gap:12px;margin-top:12px">
        <div>
          <p style="font-weight:600;margin-bottom:6px;font-size:14px">📝 Estrutura de um e-mail profissional:</p>
          <div style="padding:12px;background:rgba(79,142,247,.05);border-radius:8px;border:1px solid var(--border);font-size:13px;line-height:2">
            <strong>Para:</strong> joao.silva@empresa.com.br<br>
            <strong>Cc:</strong> gerencia@empresa.com.br<br>
            <strong>Assunto:</strong> Pedido de Orçamento — Materiais de Escritório<br>
            <strong>Mensagem:</strong> Prezado João, conforme combinado em reunião...<br>
            <strong>Assinatura:</strong> Nome | Cargo | Telefone | Logotipo
          </div>
        </div>
        <div>
          <p style="font-weight:600;margin-bottom:6px;font-size:14px">✅ Boas práticas do e-mail corporativo:</p>
          <div style="display:grid;gap:6px">
            <div style="padding:8px 12px;background:rgba(52,211,153,.08);border-radius:6px;border:1px solid rgba(52,211,153,.2);font-size:13px">✅ Assunto claro e objetivo</div>
            <div style="padding:8px 12px;background:rgba(52,211,153,.08);border-radius:6px;border:1px solid rgba(52,211,153,.2);font-size:13px">✅ Linguagem formal e respeitosa</div>
            <div style="padding:8px 12px;background:rgba(52,211,153,.08);border-radius:6px;border:1px solid rgba(52,211,153,.2);font-size:13px">✅ Responder em até 24 horas</div>
            <div style="padding:8px 12px;background:rgba(52,211,153,.08);border-radius:6px;border:1px solid rgba(52,211,153,.2);font-size:13px">✅ Nunca usar e-mail corporativo para fins pessoais</div>
            <div style="padding:8px 12px;background:rgba(248,113,113,.08);border-radius:6px;border:1px solid rgba(248,113,113,.2);font-size:13px">❌ Evitar gírias, emojis excessivos e caps lock</div>
          </div>
        </div>
      </div>
      <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
        <strong>📓 Copie:</strong> E-mail corporativo = comunicação formal e oficial da empresa<br>
        Partes: Para / Cc / Assunto / Mensagem / Assinatura profissional
      </div>`,

      `<h3 style="margin-bottom:10px;color:var(--accent)">📱 Redes Sociais e Comunicação Comercial</h3>
      <p>As <strong>redes sociais</strong> se tornaram ferramentas poderosas de comunicação entre empresas e consumidores. Cada plataforma tem um perfil diferente:</p>
      <table style="width:100%;border-collapse:collapse;margin-top:12px;font-size:13px">
        <tr style="background:rgba(79,142,247,.15)">
          <th style="padding:9px;border:1px solid var(--border)">Rede Social</th>
          <th style="padding:9px;border:1px solid var(--border)">Uso Empresarial</th>
          <th style="padding:9px;border:1px solid var(--border)">Público</th>
        </tr>
        <tr>
          <td style="padding:9px;border:1px solid var(--border)">📸 Instagram</td>
          <td style="padding:9px;border:1px solid var(--border)">Divulgação visual de produtos e serviços</td>
          <td style="padding:9px;border:1px solid var(--border)">B2C (empresa → consumidor)</td>
        </tr>
        <tr>
          <td style="padding:9px;border:1px solid var(--border)">💼 LinkedIn</td>
          <td style="padding:9px;border:1px solid var(--border)">Networking, vagas, parcerias corporativas</td>
          <td style="padding:9px;border:1px solid var(--border)">B2B (empresa → empresa)</td>
        </tr>
        <tr>
          <td style="padding:9px;border:1px solid var(--border)">📘 Facebook</td>
          <td style="padding:9px;border:1px solid var(--border)">Comunidades, grupos, anúncios</td>
          <td style="padding:9px;border:1px solid var(--border)">B2C e B2B</td>
        </tr>
        <tr>
          <td style="padding:9px;border:1px solid var(--border)">🐦 X (Twitter)</td>
          <td style="padding:9px;border:1px solid var(--border)">Comunicação rápida, tendências, SAC</td>
          <td style="padding:9px;border:1px solid var(--border)">B2C</td>
        </tr>
        <tr>
          <td style="padding:9px;border:1px solid var(--border)">🎵 TikTok</td>
          <td style="padding:9px;border:1px solid var(--border)">Marketing viral e conteúdo jovem</td>
          <td style="padding:9px;border:1px solid var(--border)">B2C (público jovem)</td>
        </tr>
      </table>
      <div style="margin-top:12px;padding:12px;background:rgba(79,142,247,.08);border-left:3px solid var(--accent);border-radius:6px;font-size:13px">
        <strong>📓 Copie:</strong> B2C = Business to Consumer (empresa vende para consumidor final)<br>
        B2B = Business to Business (empresa vende para outra empresa)<br>
        LinkedIn: B2B | Instagram/TikTok: B2C | Facebook: ambos
      </div>`
    ],
    perguntas: [
      { pergunta: "O que é EDI na comunicação empresarial?", opcoes: [{texto:"Um tipo de rede social corporativa",correta:false},{texto:"Troca eletrônica automática de dados entre sistemas de diferentes empresas",correta:true},{texto:"Um sistema de videoconferência",correta:false},{texto:"Um software de planilhas",correta:false}] },
      { pergunta: "Qual tecnologia de rastreamento funciona SEM contato físico, usando ondas de rádio?", opcoes: [{texto:"Código de barras",correta:false},{texto:"GPS",correta:false},{texto:"RFID",correta:true},{texto:"QR Code",correta:false}] },
      { pergunta: "B2B significa:", opcoes: [{texto:"Business to Consumer — empresa para consumidor final",correta:false},{texto:"Business to Business — empresa para empresa",correta:true},{texto:"Back to Business — retorno às atividades",correta:false},{texto:"Big to Business — grande empresa para pequena",correta:false}] },
      { pergunta: "Qual rede social é mais indicada para networking, vagas de emprego e parcerias corporativas?", opcoes: [{texto:"Instagram",correta:false},{texto:"TikTok",correta:false},{texto:"LinkedIn",correta:true},{texto:"Twitter/X",correta:false}] },
      { pergunta: "Qual é uma BOA prática ao usar o e-mail corporativo?", opcoes: [{texto:"Usar gírias para parecer mais simpático",correta:false},{texto:"Escrever o assunto do e-mail em branco para o destinatário ver a surpresa",correta:false},{texto:"Usar o e-mail corporativo para conversas pessoais",correta:false},{texto:"Responder em até 24 horas com linguagem formal",correta:true}] },
      { pergunta: "Quando você acompanha um pacote dos Correios pelo aplicativo, qual conjunto de tecnologias está sendo usado?", opcoes: [{texto:"Apenas código de barras",correta:false},{texto:"GPS + banco de dados + notificações automáticas integrados",correta:true},{texto:"Apenas RFID",correta:false},{texto:"Redes sociais e e-mail",correta:false}] },
      { pergunta: "O que é comunicação INTERNA na empresa?", opcoes: [{texto:"Comunicação com clientes nas redes sociais",correta:false},{texto:"Comunicação entre setores, colaboradores e lideranças dentro da organização",correta:true},{texto:"Anúncios publicados no site da empresa",correta:false},{texto:"Troca de notas fiscais com fornecedores",correta:false}] },
      { pergunta: "Qual sistema gerencia todo o processo logístico e informa o cliente sobre o status do pedido?", opcoes: [{texto:"CRM",correta:false},{texto:"ERP",correta:false},{texto:"TMS (Sistema de Gestão de Transporte)",correta:true},{texto:"SIG",correta:false}] }
    ]
  }

);
// ══════════════════════════════════════════════════════════════════
// FIM DAS AULAS DO 1º BIMESTRE — TIA 2026
// ══════════════════════════════════════════════════════════════════
