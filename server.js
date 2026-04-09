const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database('./dados.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS progresso (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, aula TEXT, nota INTEGER)`);
  db.run(`CREATE TABLE IF NOT EXISTS alunos (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT UNIQUE, rm TEXT UNIQUE, senha TEXT, turma TEXT, disciplina TEXT)`);
  db.run(`CREATE TABLE IF NOT EXISTS configuracoes (chave TEXT PRIMARY KEY, valor TEXT)`);
  db.run(`CREATE TABLE IF NOT EXISTS aulas_habilitadas (id INTEGER PRIMARY KEY AUTOINCREMENT, aluno_id INTEGER, aula_id INTEGER, UNIQUE(aluno_id, aula_id))`);
  db.run(`CREATE TABLE IF NOT EXISTS tentativas_print (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, turma TEXT, aula TEXT, horario TEXT)`);

  db.run(`INSERT OR IGNORE INTO configuracoes (chave, valor) VALUES ('bloqueio_ativo', '0')`);
  db.run(`INSERT OR IGNORE INTO configuracoes (chave, valor) VALUES ('horario_inicio', '07:00')`);
  db.run(`INSERT OR IGNORE INTO configuracoes (chave, valor) VALUES ('horario_fim', '12:50')`);
  db.run(`INSERT OR IGNORE INTO configuracoes (chave, valor) VALUES ('prof_usuario', 'professor')`);
  db.run(`INSERT OR IGNORE INTO configuracoes (chave, valor) VALUES ('prof_senha', 'prof1234')`);
  db.run(`INSERT OR IGNORE INTO configuracoes (chave, valor) VALUES ('prof_nome', 'Marco Escudeiro')`);
  db.run(`INSERT OR IGNORE INTO configuracoes (chave, valor) VALUES ('turmas', '1ºA,1ºB,2ºA,2ºB,3ºA,3ºB')`);
  db.run(`INSERT OR IGNORE INTO configuracoes (chave, valor) VALUES ('disciplinas', 'Projetos de TIC')`);
  // Migrações seguras para colunas novas
  db.run(`ALTER TABLE alunos ADD COLUMN rm TEXT`, () => {});
  db.run(`ALTER TABLE alunos ADD COLUMN turma TEXT`, () => {});
  db.run(`ALTER TABLE alunos ADD COLUMN disciplina TEXT`, () => {});
});

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));
app.use(express.static('public'));

function horarioBrasilia() {
  const agora = new Date();
  const utc = agora.getTime() + agora.getTimezoneOffset() * 60000;
  return new Date(utc - 3 * 3600000);
}

function verificarHorario(req, res, next) {
  db.get(`SELECT valor FROM configuracoes WHERE chave = 'bloqueio_ativo'`, [], (err, row) => {
    if (!row || row.valor !== '1') return next();
    db.all(`SELECT chave, valor FROM configuracoes WHERE chave IN ('horario_inicio','horario_fim')`, [], (err2, rows) => {
      const cfg = {};
      (rows || []).forEach(r => { cfg[r.chave] = r.valor; });
      const inicio = cfg['horario_inicio'] || '07:00';
      const fim    = cfg['horario_fim']    || '12:50';
      const br = horarioBrasilia();
      const minAgora = br.getHours() * 60 + br.getMinutes();
      const [hi, mi] = inicio.split(':').map(Number);
      const [hf, mf] = fim.split(':').map(Number);
      if (minAgora < hi * 60 + mi || minAgora > hf * 60 + mf) {
        return res.status(403).json({ erro: `Acesso bloqueado. Horário permitido: ${inicio} às ${fim}.`, foraDaHora: true, horario_inicio: inicio, horario_fim: fim });
      }
      next();
    });
  });
}

function verificarProfessor(usuario, senha, callback) {
  db.all(`SELECT chave, valor FROM configuracoes WHERE chave IN ('prof_usuario','prof_senha')`, [], (err, rows) => {
    if (err) return callback(false);
    const cfg = {};
    rows.forEach(r => { cfg[r.chave] = r.valor; });
    callback(usuario === cfg['prof_usuario'] && senha === cfg['prof_senha']);
  });
}

// LOGIN PROFESSOR
app.post('/login-professor', (req, res) => {
  const { usuario, senha } = req.body;
  verificarProfessor(usuario, senha, (ok) => {
    if (!ok) return res.status(401).json({ erro: 'Usuário ou senha incorretos.' });
    db.get(`SELECT valor FROM configuracoes WHERE chave = 'prof_nome'`, [], (err, row) => {
      res.json({ ok: true, nome: row ? row.valor : 'Professor' });
    });
  });
});

// DADOS DO PROFESSOR
app.get('/professor-dados', (req, res) => {
  const { usuario, senha } = req.query;
  verificarProfessor(usuario, senha, (ok) => {
    if (!ok) return res.status(401).json({ erro: 'Não autorizado.' });
    db.all(`SELECT chave, valor FROM configuracoes WHERE chave IN ('prof_usuario','prof_nome')`, [], (err, rows) => {
      const cfg = {};
      rows.forEach(r => { cfg[r.chave] = r.valor; });
      res.json({ usuario: cfg['prof_usuario'], nome: cfg['prof_nome'] || 'Professor' });
    });
  });
});

// ALTERAR DADOS DO PROFESSOR
app.post('/professor-alterar', (req, res) => {
  const { usuario, senha, novo_usuario, novo_nome, nova_senha } = req.body;
  verificarProfessor(usuario, senha, (ok) => {
    if (!ok) return res.status(401).json({ erro: 'Senha atual incorreta.' });
    const stmt = db.prepare(`INSERT OR REPLACE INTO configuracoes (chave, valor) VALUES (?, ?)`);
    if (novo_usuario && novo_usuario.trim()) stmt.run('prof_usuario', novo_usuario.trim());
    if (nova_senha   && nova_senha.trim())   stmt.run('prof_senha',   nova_senha.trim());
    if (novo_nome    && novo_nome.trim())    stmt.run('prof_nome',    novo_nome.trim());
    stmt.finalize();
    res.json({ ok: true });
  });
});

// CONFIGURAÇÕES (público)
app.get('/configuracoes', (req, res) => {
  db.all(`SELECT chave, valor FROM configuracoes`, [], (err, rows) => {
    if (err) return res.status(500).json({ erro: err.message });
    const cfg = {};
    rows.forEach(r => { cfg[r.chave] = r.valor; });
    res.json(cfg);
  });
});

// SALVAR CONFIGURAÇÕES DE HORÁRIO
app.post('/configuracoes', (req, res) => {
  const { usuario, senha, bloqueio_ativo, horario_inicio, horario_fim } = req.body;
  verificarProfessor(usuario, senha, (ok) => {
    if (!ok) return res.status(401).json({ erro: 'Não autorizado.' });
    const stmt = db.prepare(`INSERT OR REPLACE INTO configuracoes (chave, valor) VALUES (?, ?)`);
    stmt.run('bloqueio_ativo', bloqueio_ativo !== undefined ? String(bloqueio_ativo) : '0');
    stmt.run('horario_inicio', horario_inicio || '07:00');
    stmt.run('horario_fim',    horario_fim    || '12:50');
    stmt.finalize();
    res.json({ ok: true });
  });
});

// CADASTRO DE ALUNO
app.post('/cadastro', verificarHorario, (req, res) => {
  const { nome, rm, senha, turma, disciplina } = req.body;
  if (!nome || !rm || !senha) return res.status(400).json({ erro: 'Nome, RM e senha são obrigatórios.' });
  db.run(`INSERT INTO alunos (nome, rm, senha, turma, disciplina) VALUES (?, ?, ?, ?, ?)`,
    [nome.trim(), rm.trim(), senha, turma || '', disciplina || ''],
    function (err) {
      if (err) {
        if (err.message.includes('UNIQUE')) {
          if (err.message.includes('nome')) return res.status(409).json({ erro: 'Esse nome já está cadastrado. Faça login.' });
          return res.status(409).json({ erro: 'Esse RM já está cadastrado.' });
        }
        return res.status(500).json({ erro: err.message });
      }
      res.json({ ok: true });
    });
});

// LOGIN DE ALUNO
app.post('/login-aluno', verificarHorario, (req, res) => {
  const { nome, identificador, senha } = req.body;
  // Aceita login por nome (legado) ou pelo novo campo "identificador" (RM ou nome)
  const login = (identificador || nome || '').trim();
  if (!login || !senha) return res.status(400).json({ erro: 'Preencha todos os campos.' });

  // Tenta primeiro por RM, depois por nome
  db.get(`SELECT * FROM alunos WHERE rm = ? AND senha = ?`, [login, senha], (err, row) => {
    if (row) return res.json({ ok: true, nome: row.nome, rm: row.rm, turma: row.turma || '', disciplina: row.disciplina || '' });
    // Não achou por RM, tenta por nome
    db.get(`SELECT * FROM alunos WHERE nome = ? AND senha = ?`, [login, senha], (err2, row2) => {
      if (err2) return res.status(500).json({ erro: err2.message });
      if (!row2) return res.status(401).json({ erro: 'RM/Nome ou senha incorretos.' });
      res.json({ ok: true, nome: row2.nome, rm: row2.rm, turma: row2.turma || '', disciplina: row2.disciplina || '' });
    });
  });
});

// SALVAR PROGRESSO
app.post('/salvar', verificarHorario, (req, res) => {
  const { nome, aula, nota } = req.body;
  db.run(`INSERT INTO progresso (nome, aula, nota) VALUES (?, ?, ?) ON CONFLICT DO NOTHING`, [nome, aula, nota], function (err) {
    if (err) return res.status(500).json({ erro: err.message });
    db.run(`UPDATE progresso SET nota = ? WHERE nome = ? AND aula = ?`, [nota, nome, aula], function (err2) {
      if (err2) return res.status(500).json({ erro: err2.message });
      res.json({ ok: true });
    });
  });
});

// LISTAR PROGRESSO
app.get('/dados', (req, res) => {
  db.all(`SELECT p.*, a.rm FROM progresso p LEFT JOIN alunos a ON p.nome = a.nome ORDER BY p.nome, p.aula`, [], (err, rows) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(rows);
  });
});

// LISTAR ALUNOS
app.get('/alunos', (req, res) => {
  db.all(`SELECT id, nome, rm, turma, disciplina FROM alunos ORDER BY nome`, [], (err, rows) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(rows);
  });
});

// ALTERAR DADOS DE ALUNO (professor)
app.post('/aluno-alterar', (req, res) => {
  const { usuario, senha, aluno_id, novo_nome, novo_rm, nova_senha, nova_turma, nova_disciplina } = req.body;
  verificarProfessor(usuario, senha, (ok) => {
    if (!ok) return res.status(401).json({ erro: 'Não autorizado.' });
    db.get(`SELECT * FROM alunos WHERE id = ?`, [aluno_id], (err, aluno) => {
      if (err || !aluno) return res.status(404).json({ erro: 'Aluno não encontrado.' });
      const nome       = (novo_nome  && novo_nome.trim())  ? novo_nome.trim()  : aluno.nome;
      const rm         = (novo_rm    && novo_rm.trim())    ? novo_rm.trim()    : aluno.rm;
      const sa         = (nova_senha && nova_senha.trim()) ? nova_senha.trim() : aluno.senha;
      const turma      = nova_turma      !== undefined ? nova_turma      : (aluno.turma      || '');
      const disciplina = nova_disciplina !== undefined ? nova_disciplina : (aluno.disciplina || '');
      db.run(`UPDATE alunos SET nome = ?, rm = ?, senha = ?, turma = ?, disciplina = ? WHERE id = ?`,
        [nome, rm, sa, turma, disciplina, aluno_id],
        function (err2) {
          if (err2) {
            if (err2.message.includes('UNIQUE')) return res.status(409).json({ erro: 'Nome ou RM já em uso.' });
            return res.status(500).json({ erro: err2.message });
          }
          if (nome !== aluno.nome) db.run(`UPDATE progresso SET nome = ? WHERE nome = ?`, [nome, aluno.nome]);
          res.json({ ok: true });
        });
    });
  });
});

// AULAS HABILITADAS (por id do aluno)
app.get('/aulas-habilitadas/:aluno_id', (req, res) => {
  db.all(`SELECT aula_id FROM aulas_habilitadas WHERE aluno_id = ?`, [req.params.aluno_id], (err, rows) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(rows.map(r => r.aula_id));
  });
});

// AULAS HABILITADAS PELO NOME (menu do aluno)
app.get('/aulas-do-aluno', (req, res) => {
  const { nome } = req.query;
  db.get(`SELECT id FROM alunos WHERE nome = ?`, [nome], (err, aluno) => {
    if (err || !aluno) return res.json([]);
    db.all(`SELECT aula_id FROM aulas_habilitadas WHERE aluno_id = ?`, [aluno.id], (err2, rows) => {
      if (err2) return res.json([]);
      res.json(rows.map(r => r.aula_id));
    });
  });
});

// SALVAR AULAS HABILITADAS (professor)
app.post('/aulas-habilitadas', (req, res) => {
  const { usuario, senha, aluno_id, aulas } = req.body;
  verificarProfessor(usuario, senha, (ok) => {
    if (!ok) return res.status(401).json({ erro: 'Não autorizado.' });
    db.run(`DELETE FROM aulas_habilitadas WHERE aluno_id = ?`, [aluno_id], (err) => {
      if (err) return res.status(500).json({ erro: err.message });
      if (!aulas || aulas.length === 0) return res.json({ ok: true });
      const stmt = db.prepare(`INSERT OR IGNORE INTO aulas_habilitadas (aluno_id, aula_id) VALUES (?, ?)`);
      aulas.forEach(aid => stmt.run(aluno_id, aid));
      stmt.finalize();
      res.json({ ok: true });
    });
  });
});

// REGISTRAR TENTATIVA DE PRINT
app.post('/registrar-print', (req, res) => {
  const { nome, turma, aula } = req.body;
  const horario = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
  db.run(`INSERT INTO tentativas_print (nome, turma, aula, horario) VALUES (?, ?, ?, ?)`,
    [nome || 'Desconhecido', turma || '', aula || '', horario],
    (err) => {
      if (err) return res.status(500).json({ erro: err.message });
      res.json({ ok: true });
    });
});

// LISTAR TENTATIVAS DE PRINT
app.get('/tentativas-print', (req, res) => {
  const { usuario, senha } = req.query;
  verificarProfessor(usuario, senha, (ok) => {
    if (!ok) return res.status(401).json({ erro: 'Não autorizado.' });
    db.all(`SELECT * FROM tentativas_print ORDER BY id DESC`, [], (err, rows) => {
      if (err) return res.status(500).json({ erro: err.message });
      res.json(rows);
    });
  });
});

// LIMPAR TENTATIVAS DE PRINT
app.delete('/tentativas-print', (req, res) => {
  const { usuario, senha } = req.query;
  verificarProfessor(usuario, senha, (ok) => {
    if (!ok) return res.status(401).json({ erro: 'Não autorizado.' });
    db.run(`DELETE FROM tentativas_print`, [], (err) => {
      if (err) return res.status(500).json({ erro: err.message });
      res.json({ ok: true });
    });
  });
});

// RELATÓRIO COMPLETO
app.get('/relatorio', (req, res) => {
  const { usuario, senha } = req.query;
  verificarProfessor(usuario, senha, (ok) => {
    if (!ok) return res.status(401).json({ erro: 'Não autorizado.' });
    db.all(`
      SELECT a.id, a.nome, a.rm, a.turma, a.disciplina,
        COUNT(p.id) as aulas_concluidas,
        ROUND(AVG(p.nota), 1) as media_nota,
        MAX(p.nota) as melhor_nota,
        MIN(p.nota) as pior_nota
      FROM alunos a
      LEFT JOIN progresso p ON a.nome = p.nome
      GROUP BY a.id ORDER BY a.turma, a.nome
    `, [], (err, rows) => {
      if (err) return res.status(500).json({ erro: err.message });
      db.all(`SELECT * FROM progresso ORDER BY nome, aula`, [], (err2, prog) => {
        if (err2) return res.status(500).json({ erro: err2.message });
        res.json({ alunos: rows, progresso: prog });
      });
    });
  });
});

// EXCLUIR ALUNO (remove cadastro + progresso + aulas habilitadas)
app.delete('/aluno/:id', (req, res) => {
  const { usuario, senha } = req.query;
  const id = req.params.id;
  verificarProfessor(usuario, senha, (ok) => {
    if (!ok) return res.status(401).json({ erro: 'Não autorizado.' });
    db.get(`SELECT nome FROM alunos WHERE id = ?`, [id], (err, aluno) => {
      if (err || !aluno) return res.status(404).json({ erro: 'Aluno não encontrado.' });
      const nome = aluno.nome;
      db.run(`DELETE FROM aulas_habilitadas WHERE aluno_id = ?`, [id], () => {
        db.run(`DELETE FROM progresso WHERE nome = ?`, [nome], () => {
          db.run(`DELETE FROM alunos WHERE id = ?`, [id], function (err2) {
            if (err2) return res.status(500).json({ erro: err2.message });
            res.json({ ok: true, nome });
          });
        });
      });
    });
  });
});

// HABILITAR AULAS PARA TURMA INTEIRA
app.post('/aulas-turma', (req, res) => {
  const { usuario, senha, turma, aulas } = req.body;
  verificarProfessor(usuario, senha, (ok) => {
    if (!ok) return res.status(401).json({ erro: 'Não autorizado.' });
    db.all(`SELECT id FROM alunos WHERE turma = ?`, [turma], (err, alunos) => {
      if (err) return res.status(500).json({ erro: err.message });
      if (!alunos || alunos.length === 0) return res.json({ ok: true, afetados: 0 });
      let pendentes = alunos.length;
      let afetados = 0;
      alunos.forEach(a => {
        db.run(`DELETE FROM aulas_habilitadas WHERE aluno_id = ?`, [a.id], () => {
          if (!aulas || aulas.length === 0) {
            afetados++;
            if (--pendentes === 0) res.json({ ok: true, afetados });
            return;
          }
          const stmt = db.prepare(`INSERT OR IGNORE INTO aulas_habilitadas (aluno_id, aula_id) VALUES (?, ?)`);
          aulas.forEach(aid => stmt.run(a.id, aid));
          stmt.finalize(() => {
            afetados++;
            if (--pendentes === 0) res.json({ ok: true, afetados });
          });
        });
      });
    });
  });
});

// APAGAR PROGRESSO
app.delete('/progresso/:nome', (req, res) => {
  const nome = decodeURIComponent(req.params.nome);
  db.run(`DELETE FROM progresso WHERE nome = ?`, [nome], function (err) {
    if (err) return res.status(500).json({ erro: err.message });
    res.json({ ok: true, apagados: this.changes });
  });
});

app.delete('/progresso/:nome/:aula', (req, res) => {
  const nome = decodeURIComponent(req.params.nome);
  const aula = decodeURIComponent(req.params.aula);
  db.run(`DELETE FROM progresso WHERE nome = ? AND aula = ?`, [nome, aula], function (err) {
    if (err) return res.status(500).json({ erro: err.message });
    res.json({ ok: true, apagados: this.changes });
  });
});


// SALVAR TURMAS E DISCIPLINAS (professor)
app.post('/turmas-disciplinas', (req, res) => {
  const { usuario, senha, turmas, disciplinas } = req.body;
  verificarProfessor(usuario, senha, (ok) => {
    if (!ok) return res.status(401).json({ erro: 'Não autorizado.' });
    const stmt = db.prepare(`INSERT OR REPLACE INTO configuracoes (chave, valor) VALUES (?, ?)`);
    if (turmas     !== undefined) stmt.run('turmas',     turmas);
    if (disciplinas !== undefined) stmt.run('disciplinas', disciplinas);
    stmt.finalize();
    res.json({ ok: true });
  });
});

app.listen(3000, () => console.log('🚀 Servidor rodando em http://localhost:3000'));

// ═══════════════════════════════════════════════
// MÓDULO DE PROVAS
// ═══════════════════════════════════════════════

// Criar tabelas de provas
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS provas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    descricao TEXT,
    turma TEXT,
    ativa INTEGER DEFAULT 0,
    criada_em TEXT,
    tempo_limite INTEGER DEFAULT 0
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS prova_questoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    prova_id INTEGER NOT NULL,
    ordem INTEGER NOT NULL,
    pergunta TEXT NOT NULL,
    tipo TEXT DEFAULT 'multipla',
    opcao_a TEXT,
    opcao_b TEXT,
    opcao_c TEXT,
    opcao_d TEXT,
    correta TEXT,
    FOREIGN KEY(prova_id) REFERENCES provas(id)
  )`);
  // Migração: adiciona coluna 'tipo' se não existir (banco já criado)
  db.run(`ALTER TABLE prova_questoes ADD COLUMN tipo TEXT DEFAULT 'multipla'`, () => {});

  db.run(`CREATE TABLE IF NOT EXISTS prova_respostas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    prova_id INTEGER NOT NULL,
    aluno_nome TEXT NOT NULL,
    aluno_rm TEXT,
    turma TEXT,
    nota REAL,
    acertos INTEGER,
    total INTEGER,
    respondida_em TEXT,
    UNIQUE(prova_id, aluno_nome)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS prova_respostas_detalhe (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    prova_id INTEGER NOT NULL,
    aluno_nome TEXT NOT NULL,
    questao_id INTEGER NOT NULL,
    resposta_marcada TEXT,
    correta INTEGER DEFAULT 0
  )`);
});

// CRIAR PROVA
app.post('/provas', (req, res) => {
  const { usuario, senha, titulo, descricao, turma, tempo_limite, questoes } = req.body;
  verificarProfessor(usuario, senha, (ok) => {
    if (!ok) return res.status(401).json({ erro: 'Não autorizado.' });
    if (!titulo || !questoes || questoes.length === 0)
      return res.status(400).json({ erro: 'Título e questões são obrigatórios.' });
    const criada_em = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    db.run(`INSERT INTO provas (titulo, descricao, turma, ativa, criada_em, tempo_limite) VALUES (?,?,?,0,?,?)`,
      [titulo, descricao || '', turma || '', criada_em, tempo_limite || 0],
      function(err) {
        if (err) return res.status(500).json({ erro: err.message });
        const provaId = this.lastID;
        const stmt = db.prepare(`INSERT INTO prova_questoes (prova_id, ordem, pergunta, tipo, opcao_a, opcao_b, opcao_c, opcao_d, correta) VALUES (?,?,?,?,?,?,?,?,?)`);
        questoes.forEach((q, i) => {
          const tipo = q.tipo || 'multipla';
          stmt.run(provaId, i + 1, q.pergunta, tipo, q.opcao_a||'', q.opcao_b||'', q.opcao_c||'', q.opcao_d||'', q.correta||'');
        });
        stmt.finalize(() => res.json({ ok: true, id: provaId }));
      }
    );
  });
});

// LISTAR PROVAS (professor)
app.get('/provas', (req, res) => {
  const { usuario, senha } = req.query;
  verificarProfessor(usuario, senha, (ok) => {
    if (!ok) return res.status(401).json({ erro: 'Não autorizado.' });
    db.all(`SELECT p.*, COUNT(q.id) as num_questoes FROM provas p LEFT JOIN prova_questoes q ON q.prova_id = p.id GROUP BY p.id ORDER BY p.id DESC`, [], (err, rows) => {
      if (err) return res.status(500).json({ erro: err.message });
      res.json(rows);
    });
  });
});

// LISTAR PROVAS ATIVAS PARA ALUNO
app.get('/provas-aluno', (req, res) => {
  const { turma } = req.query;
  // Mostra a prova se: prova não tem turma (vale pra todos) OU turma da prova bate com a do aluno
  db.all(`SELECT id, titulo, descricao, tempo_limite FROM provas WHERE ativa = 1 AND (turma = '' OR turma IS NULL OR turma = ?)`, [turma || ''], (err, rows) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(rows);
  });
});

// VERIFICAR SE HÁ PROVA ATIVA PARA A TURMA (sem bloqueio de horário)
app.get('/tem-prova-ativa', (req, res) => {
  const { turma } = req.query;
  db.all(`SELECT id FROM provas WHERE ativa = 1 AND (turma = '' OR turma IS NULL OR turma = ?)`, [turma || ''], (err, rows) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json({ temProva: rows.length > 0 });
  });
});

// VERIFICAR SE ALUNO JÁ FEZ A PROVA
app.get('/prova-status', (req, res) => {
  const { prova_id, aluno } = req.query;
  db.get(`SELECT * FROM prova_respostas WHERE prova_id = ? AND aluno_nome = ?`, [prova_id, aluno], (err, row) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json({ feita: !!row, resultado: row || null });
  });
});

// BUSCAR QUESTÕES DE UMA PROVA (sem gabarito)
app.get('/prova-questoes/:id', verificarHorario, (req, res) => {
  const provaId = req.params.id;
  db.get(`SELECT * FROM provas WHERE id = ? AND ativa = 1`, [provaId], (err, prova) => {
    if (err || !prova) return res.status(404).json({ erro: 'Prova não encontrada ou inativa.' });
    db.all(`SELECT id, ordem, pergunta, tipo, opcao_a, opcao_b, opcao_c, opcao_d FROM prova_questoes WHERE prova_id = ? ORDER BY ordem`, [provaId], (err2, qs) => {
      if (err2) return res.status(500).json({ erro: err2.message });
      res.json({ prova: { id: prova.id, titulo: prova.titulo, descricao: prova.descricao, tempo_limite: prova.tempo_limite }, questoes: qs });
    });
  });
});

// SUBMETER PROVA (aluno responde)
app.post('/prova-submeter', verificarHorario, (req, res) => {
  const { prova_id, aluno_nome, aluno_rm, turma, respostas } = req.body;
  // Verifica se já foi feita
  db.get(`SELECT id FROM prova_respostas WHERE prova_id = ? AND aluno_nome = ?`, [prova_id, aluno_nome], (err, existing) => {
    if (existing) return res.status(409).json({ erro: 'Você já respondeu esta prova. Não é possível refazer.' });
    // Busca gabarito
    db.all(`SELECT id, tipo, correta FROM prova_questoes WHERE prova_id = ? ORDER BY ordem`, [prova_id], (err2, questoes) => {
      if (err2) return res.status(500).json({ erro: err2.message });
      let acertos = 0;
      let multiplas = 0;
      let temDissertativa = false;
      const detalhes = questoes.map(q => {
        const marcada = respostas[q.id] || '';
        const tipo = q.tipo || 'multipla';
        if (tipo === 'dissertativa') {
          temDissertativa = true;
          return { questao_id: q.id, resposta_marcada: marcada, correta: -1 }; // -1 = pendente correção
        } else {
          multiplas++;
          const ok = marcada.toLowerCase() === (q.correta||'').toLowerCase() ? 1 : 0;
          if (ok) acertos++;
          return { questao_id: q.id, resposta_marcada: marcada, correta: ok };
        }
      });
      // Nota: calcula só sobre múltipla escolha; dissertativas ficam pendentes (nota null se só dissertativas)
      const nota = multiplas > 0 ? Math.round((acertos / multiplas) * 10 * 10) / 10 : (temDissertativa ? null : 0);
      const respondida_em = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
      db.run(`INSERT INTO prova_respostas (prova_id, aluno_nome, aluno_rm, turma, nota, acertos, total, respondida_em) VALUES (?,?,?,?,?,?,?,?)`,
        [prova_id, aluno_nome, aluno_rm || '', turma || '', nota, acertos, questoes.length, respondida_em],
        function(err3) {
          if (err3) return res.status(500).json({ erro: err3.message });
          const stmt = db.prepare(`INSERT INTO prova_respostas_detalhe (prova_id, aluno_nome, questao_id, resposta_marcada, correta) VALUES (?,?,?,?,?)`);
          detalhes.forEach(d => stmt.run(prova_id, aluno_nome, d.questao_id, d.resposta_marcada, d.correta));
          stmt.finalize(() => res.json({ ok: true, nota, acertos, total: questoes.length, temDissertativa }));
        }
      );
    });
  });
});

// ATIVAR / DESATIVAR PROVA
app.post('/prova-ativar', (req, res) => {
  const { usuario, senha, prova_id, ativa } = req.body;
  verificarProfessor(usuario, senha, (ok) => {
    if (!ok) return res.status(401).json({ erro: 'Não autorizado.' });
    db.run(`UPDATE provas SET ativa = ? WHERE id = ?`, [ativa ? 1 : 0, prova_id], (err) => {
      if (err) return res.status(500).json({ erro: err.message });
      res.json({ ok: true });
    });
  });
});

// RESULTADOS DE UMA PROVA (professor)
app.get('/prova-resultados/:id', (req, res) => {
  const { usuario, senha } = req.query;
  verificarProfessor(usuario, senha, (ok) => {
    if (!ok) return res.status(401).json({ erro: 'Não autorizado.' });
    db.all(`SELECT * FROM prova_respostas WHERE prova_id = ? ORDER BY nota DESC`, [req.params.id], (err, rows) => {
      if (err) return res.status(500).json({ erro: err.message });
      res.json(rows);
    });
  });
});

// BUSCAR QUESTÕES COM GABARITO (professor)
app.get('/prova-questoes-gabarito/:id', (req, res) => {
  const { usuario, senha } = req.query;
  verificarProfessor(usuario, senha, (ok) => {
    if (!ok) return res.status(401).json({ erro: 'Não autorizado.' });
    db.all(`SELECT * FROM prova_questoes WHERE prova_id = ? ORDER BY ordem`, [req.params.id], (err, rows) => {
      if (err) return res.status(500).json({ erro: err.message });
      res.json(rows);
    });
  });
});

// EXCLUIR PROVA

// BUSCAR RESPOSTAS DISSERTATIVAS DE UM ALUNO (professor corrigir)
app.get('/prova-respostas-dissertativas', (req, res) => {
  const { prova_id, aluno, usuario, senha } = req.query;
  verificarProfessor(usuario, senha, (ok) => {
    if (!ok) return res.status(401).json({ erro: 'Não autorizado.' });
    db.all(
      `SELECT pq.id as questao_id, pq.pergunta, pq.tipo, prd.resposta_marcada, prd.nota_manual
       FROM prova_questoes pq
       LEFT JOIN prova_respostas_detalhe prd
         ON prd.questao_id = pq.id AND prd.aluno_nome = ?
       WHERE pq.prova_id = ? AND (pq.tipo = 'dissertativa' OR pq.tipo IS NULL AND prd.correta = -1)
       ORDER BY pq.ordem`,
      [aluno, prova_id],
      (err, rows) => {
        if (err) return res.status(500).json({ erro: err.message });
        // Filter only dissertativas
        const dissertativas = rows.filter(r => r.tipo === 'dissertativa');
        res.json(dissertativas);
      }
    );
  });
});

// SALVAR NOTAS MANUAIS DE QUESTÕES DISSERTATIVAS
app.post('/prova-corrigir-dissertativa', (req, res) => {
  const { usuario, senha, prova_id, aluno_nome, notas } = req.body;
  verificarProfessor(usuario, senha, (ok) => {
    if (!ok) return res.status(401).json({ erro: 'Não autorizado.' });
    // Add nota_manual column if not exists (migration)
    db.run(`ALTER TABLE prova_respostas_detalhe ADD COLUMN nota_manual REAL`, () => {});

    const ids = Object.keys(notas);
    if (!ids.length) return res.json({ ok: true });

    let done = 0;
    ids.forEach(qid => {
      const nota = notas[qid];
      db.run(
        `UPDATE prova_respostas_detalhe SET nota_manual = ? WHERE prova_id = ? AND aluno_nome = ? AND questao_id = ?`,
        [nota, prova_id, aluno_nome, qid],
        () => {
          done++;
          if (done === ids.length) {
            // Recalculate final nota: avg of multipla acertos + dissertativa manual notes
            db.all(
              `SELECT pq.tipo, pq.correta, prd.resposta_marcada, prd.correta as acertou, prd.nota_manual
               FROM prova_questoes pq
               LEFT JOIN prova_respostas_detalhe prd ON prd.questao_id = pq.id AND prd.aluno_nome = ?
               WHERE pq.prova_id = ?`,
              [aluno_nome, prova_id],
              (err2, qs) => {
                if (err2) return res.json({ ok: true });
                let somaMultipla = 0, totalMultipla = 0;
                let somaDiss = 0, totalDiss = 0;
                qs.forEach(q => {
                  if ((q.tipo || 'multipla') === 'multipla') {
                    totalMultipla++;
                    if (q.acertou === 1) somaMultipla++;
                  } else {
                    totalDiss++;
                    if (q.nota_manual !== null && q.nota_manual !== undefined) somaDiss += q.nota_manual;
                  }
                });
                // Nota final: média ponderada (cada questão vale igual)
                const total = totalMultipla + totalDiss;
                let notaFinal = null;
                if (total > 0) {
                  const ptMultipla = totalMultipla > 0 ? (somaMultipla / totalMultipla) * 10 * (totalMultipla / total) : 0;
                  const ptDiss = totalDiss > 0 ? (somaDiss / totalDiss) * (totalDiss / total) : 0;
                  notaFinal = Math.round((ptMultipla + ptDiss) * 10) / 10;
                }
                db.run(
                  `UPDATE prova_respostas SET nota = ? WHERE prova_id = ? AND aluno_nome = ?`,
                  [notaFinal, prova_id, aluno_nome],
                  () => res.json({ ok: true, notaFinal })
                );
              }
            );
          }
        }
      );
    });
  });
});

app.delete('/prova/:id', (req, res) => {
  const { usuario, senha } = req.query;
  verificarProfessor(usuario, senha, (ok) => {
    if (!ok) return res.status(401).json({ erro: 'Não autorizado.' });
    const id = req.params.id;
    db.run(`DELETE FROM prova_respostas_detalhe WHERE prova_id = ?`, [id], () => {
      db.run(`DELETE FROM prova_respostas WHERE prova_id = ?`, [id], () => {
        db.run(`DELETE FROM prova_questoes WHERE prova_id = ?`, [id], () => {
          db.run(`DELETE FROM provas WHERE id = ?`, [id], function(err) {
            if (err) return res.status(500).json({ erro: err.message });
            res.json({ ok: true });
          });
        });
      });
    });
  });
});

// EDITAR PROVA (substitui questoes)
app.put('/provas/:id', (req, res) => {
  const { usuario, senha, titulo, descricao, turma, tempo_limite, questoes } = req.body;
  verificarProfessor(usuario, senha, (ok) => {
    if (!ok) return res.status(401).json({ erro: 'Não autorizado.' });
    const id = req.params.id;
    db.run(`UPDATE provas SET titulo=?, descricao=?, turma=?, tempo_limite=? WHERE id=?`,
      [titulo, descricao || '', turma || '', tempo_limite || 0, id], (err) => {
        if (err) return res.status(500).json({ erro: err.message });
        if (!questoes || questoes.length === 0) return res.json({ ok: true });
        db.run(`DELETE FROM prova_questoes WHERE prova_id = ?`, [id], () => {
          const stmt = db.prepare(`INSERT INTO prova_questoes (prova_id, ordem, pergunta, tipo, opcao_a, opcao_b, opcao_c, opcao_d, correta) VALUES (?,?,?,?,?,?,?,?,?)`);
          questoes.forEach((q, i) => stmt.run(id, i + 1, q.pergunta, q.opcao_a, q.opcao_b, q.opcao_c, q.opcao_d, q.correta));
          stmt.finalize(() => res.json({ ok: true }));
        });
      }
    );
  });
});

// ═══════════════════════════════════════════════
// MÓDULO: UPLOAD DE RESPOSTAS DE PROVA IMPRESSA
// ═══════════════════════════════════════════════

const path = require('path');
const fs = require('fs');

// Tabela de respostas de prova impressa
db.serialize(() => {
  // Migração: adiciona coluna texto_respostas se não existir
  db.run(`ALTER TABLE prova_respostas_foto ADD COLUMN texto_respostas TEXT`, () => {});
  db.run(`ALTER TABLE prova_respostas_foto ADD COLUMN modo_envio TEXT DEFAULT 'foto'`, () => {});

  db.run(`CREATE TABLE IF NOT EXISTS prova_respostas_foto (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    prova_id INTEGER,
    aluno_nome TEXT NOT NULL,
    aluno_rm TEXT,
    turma TEXT,
    foto_base64 TEXT,
    texto_respostas TEXT,
    modo_envio TEXT DEFAULT 'foto',
    nota_manual REAL,
    comentario TEXT,
    status TEXT DEFAULT 'pendente',
    enviado_em TEXT,
    corrigido_em TEXT
  )`);
});

// ALUNO ENVIA FOTO OU TEXTO DE RESPOSTA
app.post('/prova-foto-upload', (req, res) => {
  const { prova_id, aluno_nome, aluno_rm, turma, foto_base64, texto_respostas, modo_envio, prova_titulo } = req.body;
  if (!aluno_nome) return res.status(400).json({ erro: 'Nome do aluno obrigatório.' });
  if (!foto_base64 && !texto_respostas) return res.status(400).json({ erro: 'Envie uma foto ou escreva as respostas.' });
  const enviado_em = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
  const modo = modo_envio || (foto_base64 ? 'foto' : 'texto');
  db.run(
    `INSERT INTO prova_respostas_foto (prova_id, aluno_nome, aluno_rm, turma, foto_base64, texto_respostas, modo_envio, status, enviado_em) VALUES (?,?,?,?,?,?,?,?,?)`,
    [prova_id || null, aluno_nome, aluno_rm || '', turma || '', foto_base64 || null, texto_respostas || null, modo, 'pendente', enviado_em],
    function(err) {
      if (err) return res.status(500).json({ erro: err.message });
      res.json({ ok: true, id: this.lastID });
    }
  );
});

// PROFESSOR LISTA FOTOS PENDENTES
app.get('/prova-fotos', (req, res) => {
  const { usuario, senha, status } = req.query;
  verificarProfessor(usuario, senha, (ok) => {
    if (!ok) return res.status(401).json({ erro: 'Não autorizado.' });
    const filtro = status ? `WHERE status = ?` : `WHERE 1=1`;
    const params = status ? [status] : [];
    db.all(`SELECT id, prova_id, aluno_nome, aluno_rm, turma, nota_manual, comentario, status, enviado_em, corrigido_em FROM prova_respostas_foto ${filtro} ORDER BY id DESC`, params, (err, rows) => {
      if (err) return res.status(500).json({ erro: err.message });
      res.json(rows);
    });
  });
});

// PROFESSOR BUSCA FOTO ESPECÍFICA (com base64)
app.get('/prova-foto/:id', (req, res) => {
  const { usuario, senha } = req.query;
  verificarProfessor(usuario, senha, (ok) => {
    if (!ok) return res.status(401).json({ erro: 'Não autorizado.' });
    db.get(`SELECT * FROM prova_respostas_foto WHERE id = ?`, [req.params.id], (err, row) => {
      if (err || !row) return res.status(404).json({ erro: 'Não encontrado.' });
      res.json(row);
    });
  });
});

// PROFESSOR CORRIGE FOTO (salva nota e comentário)
app.post('/prova-foto-corrigir', (req, res) => {
  const { usuario, senha, foto_id, nota_manual, comentario } = req.body;
  verificarProfessor(usuario, senha, (ok) => {
    if (!ok) return res.status(401).json({ erro: 'Não autorizado.' });
    const corrigido_em = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    db.run(
      `UPDATE prova_respostas_foto SET nota_manual = ?, comentario = ?, status = 'corrigida', corrigido_em = ? WHERE id = ?`,
      [nota_manual, comentario || '', corrigido_em, foto_id],
      (err) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.json({ ok: true });
      }
    );
  });
});

// ═══════════════════════════════════════════════
// NOTAS DO ALUNO (prova online + prova impressa)
// ═══════════════════════════════════════════════

app.get('/minhas-notas', (req, res) => {
  const { aluno } = req.query;
  if (!aluno) return res.status(400).json({ erro: 'Nome do aluno obrigatório.' });

  // Notas de provas online
  const sqlOnline = `
    SELECT pr.prova_id, p.titulo, pr.nota, pr.acertos, pr.total, pr.respondida_em,
           'online' as tipo
    FROM prova_respostas pr
    JOIN provas p ON p.id = pr.prova_id
    WHERE pr.aluno_nome = ?
    ORDER BY pr.respondida_em DESC
  `;

  // Notas de provas impressas (fotos/texto)
  const sqlImpresso = `
    SELECT id as prova_id, prova_titulo as titulo, nota_manual as nota,
           NULL as acertos, NULL as total, corrigido_em as respondida_em,
           modo_envio, comentario, status,
           'impressa' as tipo
    FROM prova_respostas_foto
    WHERE aluno_nome = ?
    ORDER BY enviado_em DESC
  `;

  db.all(sqlOnline, [aluno], (err, online) => {
    if (err) return res.status(500).json({ erro: err.message });
    db.all(sqlImpresso, [aluno], (err2, impressas) => {
      if (err2) return res.status(500).json({ erro: err2.message });
      res.json({ online: online || [], impressas: impressas || [] });
    });
  });
});
