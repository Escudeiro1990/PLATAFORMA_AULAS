const express = require('express');
const multer  = require('multer');
const nodemailer = require('nodemailer');
const { createClient } = require('@libsql/client');
const crypto = require('crypto');
const { promisify } = require('util');
const scrypt = promisify(crypto.scrypt);

// Multer: armazena arquivo em memória (sem disco — compatível com Render)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB
  fileFilter: (req, file, cb) => {
    const ok = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ];
    const ext = (file.originalname || '').split('.').pop().toLowerCase();
    if (ok.includes(file.mimetype) && ['pdf', 'doc', 'docx', 'xls', 'xlsx'].includes(ext)) return cb(null, true);
    cb(new Error('Apenas PDF, Word (.doc/.docx) ou Excel (.xls/.xlsx) são permitidos.'));
  },
});

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', 1); // atrás do proxy do Render: req.ip passa a ser o IP real do cliente
// Política de conteúdo: as páginas só carregam scripts, estilos, fontes e imagens de origens conhecidas
// e só falam com o próprio servidor. Isso limita o estrago de um eventual script injetado.
const CSP_BASE = [
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "img-src 'self' data: blob:",
  "connect-src 'self'",
  "font-src 'self' https://fonts.gstatic.com data:",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
];
function cspPara(caminho) {
  // o laboratório do curso executa o código que o próprio aluno digita (precisa de 'unsafe-eval')
  const eval_ = caminho === '/curso.html' ? " 'unsafe-eval'" : '';
  return CSP_BASE.concat(`script-src 'self' 'unsafe-inline'${eval_} https://cdnjs.cloudflare.com`).join('; ');
}
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'same-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');
  res.setHeader('Content-Security-Policy', cspPara(req.path));
  if (req.secure) res.setHeader('Strict-Transport-Security', 'max-age=15552000; includeSubDomains');
  next();
});

// Conexão com Turso (SQLite na nuvem)
const db = createClient({
  url: process.env.TURSO_URL,
  authToken: process.env.TURSO_TOKEN,
});

// Wrapper para manter compatibilidade com a API do sqlite3
const dbRun = (sql, params = []) => db.execute({ sql, args: params });
const dbGet = async (sql, params = []) => {
  const result = await db.execute({ sql, args: params });
  return result.rows[0] || null;
};
const dbAll = async (sql, params = []) => {
  const result = await db.execute({ sql, args: params });
  return result.rows;
};


// ═══════════════════════════════════════════════
// SEGURANÇA: senhas com hash, sessão assinada e limite de tentativas
// ═══════════════════════════════════════════════
const SESSION_SECRET = process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex');
if (!process.env.SESSION_SECRET) console.warn('⚠️  SESSION_SECRET não definido: as sessões dos alunos serão perdidas a cada reinício. Defina essa variável de ambiente.');
const SESSAO_HORAS = 12;

// Senha: scrypt com sal. Formato guardado: scrypt$<sal em hex>$<hash em hex>
async function hashSenha(senha) {
  const sal = crypto.randomBytes(16);
  const h = await scrypt(String(senha), sal, 64);
  return 'scrypt$' + sal.toString('hex') + '$' + h.toString('hex');
}
function ehHash(s) { return typeof s === 'string' && s.startsWith('scrypt$'); }
async function conferirSenha(senha, guardada) {
  if (senha === undefined || senha === null || senha === '' || !guardada) return false;
  if (ehHash(guardada)) {
    const partes = guardada.split('$');
    const esperado = Buffer.from(partes[2] || '', 'hex');
    if (!esperado.length) return false;
    const calc = await scrypt(String(senha), Buffer.from(partes[1], 'hex'), esperado.length);
    return crypto.timingSafeEqual(calc, esperado);
  }
  // legado (texto puro, antes da migração): compara sem vazar tempo
  const a = Buffer.from(String(senha)), b = Buffer.from(String(guardada));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

// Sessão do aluno: token assinado com HMAC (nome, rm, turma e validade)
function criarToken(aluno) {
  const payload = Buffer.from(JSON.stringify({
    role: 'aluno', nome: aluno.nome, rm: aluno.rm || '', turma: aluno.turma || '',
    exp: Date.now() + SESSAO_HORAS * 3600 * 1000
  })).toString('base64url');
  const sig = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('base64url');
  return payload + '.' + sig;
}
function lerToken(token) {
  if (!token || typeof token !== 'string' || token.indexOf('.') < 1) return null;
  const [payload, sig] = token.split('.');
  const esperado = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('base64url');
  const a = Buffer.from(sig || ''), b = Buffer.from(esperado);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const d = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return d.exp > Date.now() ? d : null;
  } catch (e) { return null; }
}
// Sessão do professor: dura 8 h e deixa de valer se a senha ou o usuário mudarem
const SESSAO_PROF_HORAS = 8;
async function svProfessor() {
  const rows = await dbAll(`SELECT chave, valor FROM configuracoes WHERE chave IN ('prof_usuario','prof_senha')`);
  const cfg = {};
  rows.forEach(r => { cfg[r.chave] = r.valor; });
  return crypto.createHash('sha256').update(String(cfg['prof_usuario']) + '|' + String(cfg['prof_senha'])).digest('hex').slice(0, 16);
}
function criarTokenProf(usuario, sv) {
  const payload = Buffer.from(JSON.stringify({ role: 'prof', u: usuario, sv, exp: Date.now() + SESSAO_PROF_HORAS * 3600 * 1000 })).toString('base64url');
  const sig = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('base64url');
  return payload + '.' + sig;
}
function bearer(req) {
  const h = req.get('authorization') || '';
  return h.startsWith('Bearer ') ? h.slice(7) : '';
}
function exigirAluno(req, res, next) {
  const d = lerToken(bearer(req));
  if (!d || d.role !== 'aluno') return res.status(401).json({ erro: 'Sessão expirada. Faça login novamente.', relogin: true });
  req.alunoAuth = d;
  next();
}

// Limite de tentativas (em memória): evita adivinhar senha por força bruta
const tentativas = new Map();
function bloqueado(chave, max = 10) {
  const t = tentativas.get(chave);
  return !!t && t.ate > Date.now() && t.n >= max;
}
function falhou(chave, janelaMs = 10 * 60 * 1000) {
  const agora = Date.now();
  let t = tentativas.get(chave);
  if (!t || t.ate < agora) t = { n: 0, ate: agora + janelaMs };
  t.n++;
  tentativas.set(chave, t);
}
function limparTentativas(chave) { tentativas.delete(chave); }
setInterval(() => { const a = Date.now(); for (const [k, v] of tentativas) if (v.ate < a) tentativas.delete(k); }, 60 * 1000).unref();

function erroInterno(e) {
  console.error('Erro interno:', e && e.message ? e.message : e);
  return 'Erro interno. Tente novamente em instantes.';
}
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// Converte senhas que ainda estão em texto puro (professor e alunos) para hash
async function migrarSenhas() {
  const prof = await dbGet(`SELECT valor FROM configuracoes WHERE chave = 'prof_senha'`);
  if (prof && !ehHash(prof.valor)) {
    await dbRun(`UPDATE configuracoes SET valor = ? WHERE chave = 'prof_senha'`, [await hashSenha(prof.valor)]);
    console.log('🔐 Senha do professor convertida para hash.');
  }
  const alunos = await dbAll(`SELECT id, senha FROM alunos`);
  let n = 0;
  for (const a of alunos) {
    if (a.senha && !ehHash(a.senha)) {
      await dbRun(`UPDATE alunos SET senha = ? WHERE id = ?`, [await hashSenha(a.senha), a.id]);
      n++;
    }
  }
  if (n) console.log(`🔐 ${n} senha(s) de alunos convertidas para hash.`);
}

// Inicializar tabelas
async function initDB() {
  await dbRun(`CREATE TABLE IF NOT EXISTS progresso (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, aula TEXT, nota INTEGER)`);
  await dbRun(`CREATE TABLE IF NOT EXISTS alunos (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT UNIQUE, rm TEXT UNIQUE, senha TEXT, turma TEXT, disciplina TEXT, email TEXT)`);
  await dbRun(`ALTER TABLE alunos ADD COLUMN email TEXT`).catch(() => {});
  await dbRun(`CREATE TABLE IF NOT EXISTS reset_tokens (id INTEGER PRIMARY KEY AUTOINCREMENT, aluno_id INTEGER NOT NULL, token TEXT NOT NULL, expira_em TEXT NOT NULL)`);
  await dbRun(`CREATE TABLE IF NOT EXISTS configuracoes (chave TEXT PRIMARY KEY, valor TEXT)`);
  await dbRun(`CREATE TABLE IF NOT EXISTS aulas_habilitadas (id INTEGER PRIMARY KEY AUTOINCREMENT, aluno_id INTEGER, aula_id INTEGER, UNIQUE(aluno_id, aula_id))`);
  await dbRun(`CREATE TABLE IF NOT EXISTS tentativas_print (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, turma TEXT, aula TEXT, horario TEXT)`);
  await dbRun(`CREATE TABLE IF NOT EXISTS provas (id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT NOT NULL, descricao TEXT, turma TEXT, ativa INTEGER DEFAULT 0, criada_em TEXT, tempo_limite INTEGER DEFAULT 0)`);
  await dbRun(`CREATE TABLE IF NOT EXISTS prova_questoes (id INTEGER PRIMARY KEY AUTOINCREMENT, prova_id INTEGER NOT NULL, ordem INTEGER NOT NULL, pergunta TEXT NOT NULL, tipo TEXT DEFAULT 'multipla', opcao_a TEXT, opcao_b TEXT, opcao_c TEXT, opcao_d TEXT, correta TEXT)`);
  await dbRun(`CREATE TABLE IF NOT EXISTS prova_respostas (id INTEGER PRIMARY KEY AUTOINCREMENT, prova_id INTEGER NOT NULL, aluno_nome TEXT NOT NULL, aluno_rm TEXT, turma TEXT, nota REAL, acertos INTEGER, total INTEGER, respondida_em TEXT, UNIQUE(prova_id, aluno_nome))`);
  await dbRun(`CREATE TABLE IF NOT EXISTS prova_respostas_detalhe (id INTEGER PRIMARY KEY AUTOINCREMENT, prova_id INTEGER NOT NULL, aluno_nome TEXT NOT NULL, questao_id INTEGER NOT NULL, resposta_marcada TEXT, correta INTEGER DEFAULT 0, nota_manual REAL)`);
  await dbRun(`CREATE TABLE IF NOT EXISTS prova_respostas_foto (id INTEGER PRIMARY KEY AUTOINCREMENT, prova_id INTEGER, aluno_nome TEXT NOT NULL, aluno_rm TEXT, turma TEXT, foto_base64 TEXT, texto_respostas TEXT, modo_envio TEXT DEFAULT 'foto', nota_manual REAL, comentario TEXT, status TEXT DEFAULT 'pendente', enviado_em TEXT, corrigido_em TEXT)`);
  await dbRun(`CREATE TABLE IF NOT EXISTS aulas_restricao (aluno_id INTEGER PRIMARY KEY, ativa INTEGER DEFAULT 0)`);
  await dbRun(`CREATE TABLE IF NOT EXISTS atividades_janelas (id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT NOT NULL, descricao TEXT, turma TEXT NOT NULL, data_envio TEXT NOT NULL, ativa INTEGER DEFAULT 1, criada_em TEXT)`);
  await dbRun(`CREATE TABLE IF NOT EXISTS atividades_envios (id INTEGER PRIMARY KEY AUTOINCREMENT, janela_id INTEGER NOT NULL, aluno_nome TEXT NOT NULL, aluno_rm TEXT, turma TEXT, arquivo_nome TEXT, arquivo_base64 TEXT, enviado_em TEXT, nota REAL, comentario TEXT, UNIQUE(janela_id, aluno_nome))`);
  await dbRun(`ALTER TABLE atividades_envios ADD COLUMN nota REAL`).catch(() => {});
  await dbRun(`ALTER TABLE atividades_envios ADD COLUMN comentario TEXT`).catch(() => {});
  // Curso de Programação Web: progresso por etapa, validação oral e liberação por turma
  await dbRun(`CREATE TABLE IF NOT EXISTS curso_progresso (aluno_nome TEXT PRIMARY KEY, aluno_rm TEXT, turma TEXT, doc TEXT, atualizado_em INTEGER)`);
  await dbRun(`CREATE TABLE IF NOT EXISTS curso_validacoes (aluno_nome TEXT NOT NULL, modulo INTEGER NOT NULL, validado_em INTEGER, PRIMARY KEY (aluno_nome, modulo))`);
  await dbRun(`CREATE TABLE IF NOT EXISTS curso_liberacao (turma TEXT NOT NULL, modulo INTEGER NOT NULL, PRIMARY KEY (turma, modulo))`);

  // Configurações padrão
  const configs = [
    ['bloqueio_ativo', '0'], ['horario_inicio', '07:00'], ['horario_fim', '12:50'],
    ['prof_usuario', 'professor'],
    ['prof_nome', 'Professor'], ['turmas', '1ºA,1ºB,2ºA,2ºB,3ºA,3ºB'],
    ['disciplinas', 'Projetos de TIC']
  ];
  for (const [chave, valor] of configs) {
    await dbRun(`INSERT OR IGNORE INTO configuracoes (chave, valor) VALUES (?, ?)`, [chave, valor]);
  }
  const jaTemSenha = await dbGet(`SELECT valor FROM configuracoes WHERE chave = 'prof_senha'`);
  if (!jaTemSenha) {
    const inicial = process.env.PROF_SENHA_INICIAL || crypto.randomBytes(9).toString('base64url');
    await dbRun(`INSERT INTO configuracoes (chave, valor) VALUES ('prof_senha', ?)`, [await hashSenha(inicial)]);
    if (!process.env.PROF_SENHA_INICIAL) console.log(`🔑 Senha inicial do professor (anote e troque no painel): ${inicial}`);
  }
  await migrarSenhas();
  console.log('✅ Banco de dados inicializado!');
}

initDB().catch(console.error);

// Corpo das requisições: 300 KB por padrão. Só as rotas de foto de prova e de criação de provas aceitam mais.
const jsonGrande = express.json({ limit: '20mb' });
const jsonPadrao = express.json({ limit: '300kb' });
app.use((req, res, next) => (req.path === '/prova-foto-upload' || req.path.startsWith('/provas') ? jsonGrande : jsonPadrao)(req, res, next));
app.use(express.urlencoded({ extended: true, limit: '300kb' }));
app.use(express.static('public'));

function horarioBrasilia() {
  const agora = new Date();
  const utc = agora.getTime() + agora.getTimezoneOffset() * 60000;
  return new Date(utc - 3 * 3600000);
}

async function verificarHorarioAsync(req, res, next) {
  try {
    const row = await dbGet(`SELECT valor FROM configuracoes WHERE chave = 'bloqueio_ativo'`);
    if (!row || row.valor !== '1') return next();
    const rows = await dbAll(`SELECT chave, valor FROM configuracoes WHERE chave IN ('horario_inicio','horario_fim')`);
    const cfg = {};
    rows.forEach(r => { cfg[r.chave] = r.valor; });
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
  } catch(e) { next(); }
}
const verificarHorario = verificarHorarioAsync;

// Prova de identidade do professor, em ordem de preferência:
//  1. token de sessão (X-Prof-Token), emitido no login;
//  2. usuário e senha (cabeçalhos X-Prof-Usuario / X-Prof-Senha, ou corpo/consulta: legado).
// Com { exigirSenha: true } (login e troca de senha) só vale a senha: o token não basta.
async function verificarProfessorAsync(usuario, senha, req, opcoes) {
  const exigirSenha = !!(opcoes && opcoes.exigirSenha);
  if (req && !exigirSenha) {
    const tk = req.get('x-prof-token');
    if (tk) {
      const d = lerToken(tk);
      if (d && d.role === 'prof' && d.sv === await svProfessor()) return true;
    }
  }
  if (req) {
    const hu = req.get('x-prof-usuario'), hs = req.get('x-prof-senha');
    if (hu !== undefined && hs !== undefined) {
      try { usuario = decodeURIComponent(hu); senha = decodeURIComponent(hs); } catch (e) { /* mantém o que veio */ }
    }
  }
  if (!usuario && !senha) return false; // sem credenciais: não conta como tentativa
  if (senha === '__token__') return false; // marcador usado pelas páginas quando a sessão é por token
  const chave = 'prof:' + ((req && req.ip) || '?');
  if (bloqueado(chave, 15)) return false;
  const rows = await dbAll(`SELECT chave, valor FROM configuracoes WHERE chave IN ('prof_usuario','prof_senha')`);
  const cfg = {};
  rows.forEach(r => { cfg[r.chave] = r.valor; });
  const okUsuario = typeof usuario === 'string' && usuario === cfg['prof_usuario'];
  const okSenha = await conferirSenha(senha, cfg['prof_senha']);
  if (okUsuario && okSenha) { limparTentativas(chave); return true; }
  falhou(chave);
  return false;
}
async function exigirProfessor(req, res) {
  const ok = await verificarProfessorAsync(req.query.usuario, req.query.senha, req);
  if (!ok) { res.status(401).json({ erro: 'Não autorizado.' }); return false; }
  return true;
}

// LOGIN PROFESSOR
app.post('/login-professor', async (req, res) => {
  try {
    const { usuario, senha } = req.body;
    const ok = await verificarProfessorAsync(usuario, senha, req, { exigirSenha: true });
    if (!ok) return res.status(401).json({ erro: 'Usuário ou senha incorretos.' });
    const row = await dbGet(`SELECT valor FROM configuracoes WHERE chave = 'prof_nome'`);
    res.json({ ok: true, nome: row ? row.valor : 'Professor', token: criarTokenProf(usuario, await svProfessor()) });
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});

// DADOS DO PROFESSOR
app.get('/professor-dados', async (req, res) => {
  try {
    const { usuario, senha } = req.query;
    const ok = await verificarProfessorAsync(usuario, senha, req);
    if (!ok) return res.status(401).json({ erro: 'Não autorizado.' });
    const rows = await dbAll(`SELECT chave, valor FROM configuracoes WHERE chave IN ('prof_usuario','prof_nome')`);
    const cfg = {};
    rows.forEach(r => { cfg[r.chave] = r.valor; });
    res.json({ usuario: cfg['prof_usuario'], nome: cfg['prof_nome'] || 'Professor' });
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});

// ALTERAR DADOS DO PROFESSOR
app.post('/professor-alterar', async (req, res) => {
  try {
    const { usuario, senha, novo_usuario, novo_nome, nova_senha } = req.body;
    const ok = await verificarProfessorAsync(usuario, senha, req, { exigirSenha: true });
    if (!ok) return res.status(401).json({ erro: 'Senha atual incorreta.' });
    if (nova_senha && nova_senha.trim().length < 8) return res.status(400).json({ erro: 'A nova senha do professor deve ter pelo menos 8 caracteres.' });
    if (novo_usuario && novo_usuario.trim()) await dbRun(`INSERT OR REPLACE INTO configuracoes (chave, valor) VALUES (?, ?)`, ['prof_usuario', novo_usuario.trim()]);
    if (nova_senha   && nova_senha.trim())   await dbRun(`INSERT OR REPLACE INTO configuracoes (chave, valor) VALUES (?, ?)`, ['prof_senha', await hashSenha(nova_senha.trim())]);
    if (novo_nome    && novo_nome.trim())    await dbRun(`INSERT OR REPLACE INTO configuracoes (chave, valor) VALUES (?, ?)`, ['prof_nome',    novo_nome.trim()]);
    res.json({ ok: true });
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});

// CONFIGURAÇÕES (público)
app.get('/configuracoes', async (req, res) => {
  try {
    const rows = await dbAll(`SELECT chave, valor FROM configuracoes WHERE chave NOT IN ('prof_usuario','prof_senha')`);
    const cfg = {};
    rows.forEach(r => { cfg[r.chave] = r.valor; });
    res.json(cfg);
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});

// SALVAR CONFIGURAÇÕES DE HORÁRIO
app.post('/configuracoes', async (req, res) => {
  try {
    const { usuario, senha, bloqueio_ativo, horario_inicio, horario_fim } = req.body;
    const ok = await verificarProfessorAsync(usuario, senha, req);
    if (!ok) return res.status(401).json({ erro: 'Não autorizado.' });
    await dbRun(`INSERT OR REPLACE INTO configuracoes (chave, valor) VALUES (?, ?)`, ['bloqueio_ativo', bloqueio_ativo !== undefined ? String(bloqueio_ativo) : '0']);
    await dbRun(`INSERT OR REPLACE INTO configuracoes (chave, valor) VALUES (?, ?)`, ['horario_inicio', horario_inicio || '07:00']);
    await dbRun(`INSERT OR REPLACE INTO configuracoes (chave, valor) VALUES (?, ?)`, ['horario_fim', horario_fim || '12:50']);
    res.json({ ok: true });
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});

// CADASTRO DE ALUNO
app.post('/cadastro', verificarHorario, async (req, res) => {
  try {
    const { nome, rm, senha, turma, disciplina } = req.body;
    if (!nome || !rm || !senha) return res.status(400).json({ erro: 'Nome, RM e senha são obrigatórios.' });
    if (String(senha).length < 4) return res.status(400).json({ erro: 'A senha deve ter pelo menos 4 caracteres.' });
    if (!/^[\p{L}\p{M}0-9 .'’-]{2,80}$/u.test(String(nome).trim())) return res.status(400).json({ erro: 'Nome inválido. Use apenas letras, números, espaço, ponto, hífen e apóstrofo (até 80 caracteres).' });
    if (!/^[A-Za-z0-9._-]{1,20}$/.test(String(rm).trim())) return res.status(400).json({ erro: 'RM inválido. Use letras, números, ponto, hífen ou sublinhado (até 20 caracteres).' });
    for (const [rotulo, valor, chave] of [['Turma', turma, 'turmas'], ['Disciplina', disciplina, 'disciplinas']]) {
      if (valor) {
        const cfgRow = await dbGet(`SELECT valor FROM configuracoes WHERE chave = ?`, [chave]);
        const lista = cfgRow ? String(cfgRow.valor).split(',').map(x => x.trim()) : [];
        if (lista.length && !lista.includes(String(valor).trim())) return res.status(400).json({ erro: rotulo + ' inválida.' });
      }
    }
    await dbRun(`INSERT INTO alunos (nome, rm, senha, turma, disciplina) VALUES (?, ?, ?, ?, ?)`, [nome.trim(), rm.trim(), await hashSenha(senha), turma || '', disciplina || '']);
    const novo = { nome: nome.trim(), rm: rm.trim(), turma: turma || '' };
    res.json({ ok: true, token: criarToken(novo), nome: novo.nome, rm: novo.rm, turma: novo.turma, disciplina: disciplina || '' });
  } catch(e) {
    if (e.message && e.message.includes('UNIQUE')) {
      if (e.message.includes('nome')) return res.status(409).json({ erro: 'Esse nome já está cadastrado. Faça login.' });
      return res.status(409).json({ erro: 'Esse RM já está cadastrado.' });
    }
    res.status(500).json({ erro: erroInterno(e) });
  }
});

// LOGIN DE ALUNO
app.post('/login-aluno', verificarHorario, async (req, res) => {
  try {
    const { nome, identificador, senha } = req.body;
    const login = (identificador || nome || '').trim();
    if (!login || !senha) return res.status(400).json({ erro: 'Preencha todos os campos.' });
    const chave = 'la:' + req.ip + ':' + login.toLowerCase();
    if (bloqueado(chave, 8)) return res.status(429).json({ erro: 'Muitas tentativas. Aguarde alguns minutos e tente de novo.' });
    let row = await dbGet(`SELECT * FROM alunos WHERE rm = ?`, [login]);
    if (!row) row = await dbGet(`SELECT * FROM alunos WHERE nome = ?`, [login]);
    if (!row || !(await conferirSenha(senha, row.senha))) { falhou(chave); return res.status(401).json({ erro: 'RM/Nome ou senha incorretos.' }); }
    limparTentativas(chave);
    res.json({ ok: true, token: criarToken(row), nome: row.nome, rm: row.rm, turma: row.turma || '', disciplina: row.disciplina || '' });
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});

// SALVAR PROGRESSO
app.post('/salvar', verificarHorario, exigirAluno, async (req, res) => {
  try {
    const { aula, nota } = req.body;
    const nome = req.alunoAuth.nome; // a identidade vem da sessão, não do que o navegador envia
    await dbRun(`INSERT INTO progresso (nome, aula, nota) VALUES (?, ?, ?) ON CONFLICT DO NOTHING`, [nome, aula, nota]);
    await dbRun(`UPDATE progresso SET nota = ? WHERE nome = ? AND aula = ?`, [nota, nome, aula]);
    res.json({ ok: true });
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});

// LISTAR PROGRESSO
app.get('/dados', async (req, res) => {
  try {
    if (await verificarProfessorAsync(req.query.usuario, req.query.senha, req)) {
      const todos = await dbAll(`SELECT p.*, a.rm FROM progresso p LEFT JOIN alunos a ON p.nome = a.nome ORDER BY p.nome, p.aula`);
      return res.json(todos);
    }
    const d = lerToken(bearer(req));
    if (!d) return res.status(401).json({ erro: 'Sessão expirada. Faça login novamente.', relogin: true });
    const rows = await dbAll(`SELECT p.*, a.rm FROM progresso p LEFT JOIN alunos a ON p.nome = a.nome WHERE p.nome = ? ORDER BY p.aula`, [d.nome]);
    res.json(rows);
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});

// LISTAR ALUNOS
app.get('/alunos', async (req, res) => {
  try {
    if (!(await exigirProfessor(req, res))) return;
    const rows = await dbAll(`SELECT id, nome, rm, turma, disciplina FROM alunos ORDER BY nome`);
    res.json(rows);
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});

// ALTERAR DADOS DE ALUNO (professor)
app.post('/aluno-alterar', async (req, res) => {
  try {
    const { usuario, senha, aluno_id, novo_nome, novo_rm, nova_senha, nova_turma, nova_disciplina, novo_email } = req.body;
    const ok = await verificarProfessorAsync(usuario, senha, req);
    if (!ok) return res.status(401).json({ erro: 'Não autorizado.' });
    const aluno = await dbGet(`SELECT * FROM alunos WHERE id = ?`, [aluno_id]);
    if (!aluno) return res.status(404).json({ erro: 'Aluno não encontrado.' });
    const nomeNovo  = (novo_nome  && novo_nome.trim())  ? novo_nome.trim()  : aluno.nome;
    const rm        = (novo_rm    && novo_rm.trim())    ? novo_rm.trim()    : aluno.rm;
    const sa        = (nova_senha && nova_senha.trim()) ? await hashSenha(nova_senha.trim()) : aluno.senha;
    const turma     = nova_turma      !== undefined ? nova_turma      : (aluno.turma      || '');
    const disciplina= nova_disciplina !== undefined ? nova_disciplina : (aluno.disciplina || '');
    const email     = novo_email      !== undefined ? novo_email      : (aluno.email      || '');
    await dbRun(`UPDATE alunos SET nome = ?, rm = ?, senha = ?, turma = ?, disciplina = ?, email = ? WHERE id = ?`, [nomeNovo, rm, sa, turma, disciplina, email, aluno_id]);
    if (nomeNovo !== aluno.nome) await dbRun(`UPDATE progresso SET nome = ? WHERE nome = ?`, [nomeNovo, aluno.nome]);
    res.json({ ok: true });
  } catch(e) {
    if (e.message && e.message.includes('UNIQUE')) return res.status(409).json({ erro: 'Nome ou RM já em uso.' });
    res.status(500).json({ erro: erroInterno(e) });
  }
});

// AULAS HABILITADAS (por id do aluno)
app.get('/aulas-habilitadas/:aluno_id', async (req, res) => {
  try {
    if (!(await exigirProfessor(req, res))) return;
    const rows = await dbAll(`SELECT aula_id FROM aulas_habilitadas WHERE aluno_id = ?`, [req.params.aluno_id]);
    res.json(rows.map(r => r.aula_id));
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});

// AULAS HABILITADAS PELO NOME (menu do aluno)
app.get('/aulas-do-aluno', exigirAluno, async (req, res) => {
  try {
    const nome = req.alunoAuth.nome;
    const aluno = await dbGet(`SELECT id FROM alunos WHERE nome = ?`, [nome]);
    if (!aluno) return res.json([]);
    const rows = await dbAll(`SELECT aula_id FROM aulas_habilitadas WHERE aluno_id = ?`, [aluno.id]);
    res.json(rows.map(r => r.aula_id));
  } catch(e) { res.json([]); }
});

// SALVAR AULAS HABILITADAS (professor)
app.post('/aulas-habilitadas', async (req, res) => {
  try {
    const { usuario, senha, aluno_id, aulas } = req.body;
    const ok = await verificarProfessorAsync(usuario, senha, req);
    if (!ok) return res.status(401).json({ erro: 'Não autorizado.' });
    await dbRun(`DELETE FROM aulas_habilitadas WHERE aluno_id = ?`, [aluno_id]);
    if (aulas && aulas.length > 0) {
      for (const aid of aulas) {
        await dbRun(`INSERT OR IGNORE INTO aulas_habilitadas (aluno_id, aula_id) VALUES (?, ?)`, [aluno_id, aid]);
      }
    }
    res.json({ ok: true });
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});

// REGISTRAR TENTATIVA DE PRINT
app.post('/registrar-print', exigirAluno, async (req, res) => {
  try {
    const { aula } = req.body;
    const nome = req.alunoAuth.nome, turma = req.alunoAuth.turma;
    const horario = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    await dbRun(`INSERT INTO tentativas_print (nome, turma, aula, horario) VALUES (?, ?, ?, ?)`, [nome || 'Desconhecido', turma || '', aula || '', horario]);
    res.json({ ok: true });
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});

// LISTAR TENTATIVAS DE PRINT
app.get('/tentativas-print', async (req, res) => {
  try {
    const { usuario, senha } = req.query;
    const ok = await verificarProfessorAsync(usuario, senha, req);
    if (!ok) return res.status(401).json({ erro: 'Não autorizado.' });
    const rows = await dbAll(`SELECT * FROM tentativas_print ORDER BY id DESC`);
    res.json(rows);
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});

// LIMPAR TENTATIVAS DE PRINT
app.delete('/tentativas-print', async (req, res) => {
  try {
    const { usuario, senha } = req.query;
    const ok = await verificarProfessorAsync(usuario, senha, req);
    if (!ok) return res.status(401).json({ erro: 'Não autorizado.' });
    await dbRun(`DELETE FROM tentativas_print`);
    res.json({ ok: true });
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});

// RELATÓRIO COMPLETO
app.get('/relatorio', async (req, res) => {
  try {
    const { usuario, senha } = req.query;
    const ok = await verificarProfessorAsync(usuario, senha, req);
    if (!ok) return res.status(401).json({ erro: 'Não autorizado.' });
    const alunos = await dbAll(`SELECT a.id, a.nome, a.rm, a.turma, a.disciplina, COUNT(p.id) as aulas_concluidas, ROUND(AVG(p.nota), 1) as media_nota, MAX(p.nota) as melhor_nota, MIN(p.nota) as pior_nota FROM alunos a LEFT JOIN progresso p ON a.nome = p.nome GROUP BY a.id ORDER BY a.turma, a.nome`);
    const prog = await dbAll(`SELECT * FROM progresso ORDER BY nome, aula`);
    res.json({ alunos, progresso: prog });
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});

// EXCLUIR ALUNO
app.delete('/aluno/:id', async (req, res) => {
  try {
    const { usuario, senha } = req.query;
    const ok = await verificarProfessorAsync(usuario, senha, req);
    if (!ok) return res.status(401).json({ erro: 'Não autorizado.' });
    const aluno = await dbGet(`SELECT nome FROM alunos WHERE id = ?`, [req.params.id]);
    if (!aluno) return res.status(404).json({ erro: 'Aluno não encontrado.' });
    await dbRun(`DELETE FROM aulas_habilitadas WHERE aluno_id = ?`, [req.params.id]);
    await dbRun(`DELETE FROM progresso WHERE nome = ?`, [aluno.nome]);
    await dbRun(`DELETE FROM alunos WHERE id = ?`, [req.params.id]);
    res.json({ ok: true, nome: aluno.nome });
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});

// HABILITAR AULAS PARA TURMA INTEIRA
app.post('/aulas-turma', async (req, res) => {
  try {
    const { usuario, senha, turma, aulas } = req.body;
    const ok = await verificarProfessorAsync(usuario, senha, req);
    if (!ok) return res.status(401).json({ erro: 'Não autorizado.' });
    const alunos = await dbAll(`SELECT id FROM alunos WHERE turma = ?`, [turma]);
    if (!alunos || alunos.length === 0) return res.json({ ok: true, afetados: 0 });
    for (const a of alunos) {
      await dbRun(`DELETE FROM aulas_habilitadas WHERE aluno_id = ?`, [a.id]);
      if (aulas && aulas.length > 0) {
        for (const aid of aulas) {
          await dbRun(`INSERT OR IGNORE INTO aulas_habilitadas (aluno_id, aula_id) VALUES (?, ?)`, [a.id, aid]);
        }
      }
    }
    res.json({ ok: true, afetados: alunos.length });
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});

// APAGAR PROGRESSO
app.delete('/progresso/:nome', async (req, res) => {
  try {
    if (!(await exigirProfessor(req, res))) return;
    const nome = decodeURIComponent(req.params.nome);
    const result = await dbRun(`DELETE FROM progresso WHERE nome = ?`, [nome]);
    res.json({ ok: true });
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});

app.delete('/progresso/:nome/:aula', async (req, res) => {
  try {
    if (!(await exigirProfessor(req, res))) return;
    const nome = decodeURIComponent(req.params.nome);
    const aula = decodeURIComponent(req.params.aula);
    await dbRun(`DELETE FROM progresso WHERE nome = ? AND aula = ?`, [nome, aula]);
    res.json({ ok: true });
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});

// SALVAR TURMAS E DISCIPLINAS
app.post('/turmas-disciplinas', async (req, res) => {
  try {
    const { usuario, senha, turmas, disciplinas } = req.body;
    const ok = await verificarProfessorAsync(usuario, senha, req);
    if (!ok) return res.status(401).json({ erro: 'Não autorizado.' });
    if (turmas     !== undefined) await dbRun(`INSERT OR REPLACE INTO configuracoes (chave, valor) VALUES (?, ?)`, ['turmas', turmas]);
    if (disciplinas !== undefined) await dbRun(`INSERT OR REPLACE INTO configuracoes (chave, valor) VALUES (?, ?)`, ['disciplinas', disciplinas]);
    res.json({ ok: true });
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});

// ═══════════════════════════════════════════════
// MÓDULO DE PROVAS
// ═══════════════════════════════════════════════

// CRIAR PROVA
app.post('/provas', async (req, res) => {
  try {
    const { usuario, senha, titulo, descricao, turma, tempo_limite, questoes } = req.body;
    const ok = await verificarProfessorAsync(usuario, senha, req);
    if (!ok) return res.status(401).json({ erro: 'Não autorizado.' });
    if (!titulo || !questoes || questoes.length === 0) return res.status(400).json({ erro: 'Título e questões são obrigatórios.' });
    const criada_em = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    const result = await dbRun(`INSERT INTO provas (titulo, descricao, turma, ativa, criada_em, tempo_limite) VALUES (?,?,?,0,?,?)`, [titulo, descricao || '', turma || '', criada_em, tempo_limite || 0]);
    const provaId = Number(result.lastInsertRowid);
    for (let i = 0; i < questoes.length; i++) {
      const q = questoes[i];
      const tipo = q.tipo || 'multipla';
      await dbRun(`INSERT INTO prova_questoes (prova_id, ordem, pergunta, tipo, opcao_a, opcao_b, opcao_c, opcao_d, correta) VALUES (?,?,?,?,?,?,?,?,?)`, [provaId, i + 1, q.pergunta, tipo, q.opcao_a||'', q.opcao_b||'', q.opcao_c||'', q.opcao_d||'', q.correta||'']);
    }
    res.json({ ok: true, id: provaId });
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});

// LISTAR PROVAS (professor)
app.get('/provas', async (req, res) => {
  try {
    const { usuario, senha } = req.query;
    const ok = await verificarProfessorAsync(usuario, senha, req);
    if (!ok) return res.status(401).json({ erro: 'Não autorizado.' });
    const rows = await dbAll(`SELECT p.*, COUNT(q.id) as num_questoes FROM provas p LEFT JOIN prova_questoes q ON q.prova_id = p.id GROUP BY p.id ORDER BY p.id DESC`);
    res.json(rows);
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});

// LISTAR PROVAS ATIVAS PARA ALUNO
app.get('/provas-aluno', exigirAluno, async (req, res) => {
  try {
    const turma = req.alunoAuth.turma;
    const rows = await dbAll(`SELECT id, titulo, descricao, tempo_limite FROM provas WHERE ativa = 1 AND (turma = '' OR turma IS NULL OR turma = ?)`, [turma || '']);
    res.json(rows);
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});

// VERIFICAR SE HÁ PROVA ATIVA
app.get('/tem-prova-ativa', exigirAluno, async (req, res) => {
  try {
    const turma = req.alunoAuth.turma;
    const rows = await dbAll(`SELECT id FROM provas WHERE ativa = 1 AND (turma = '' OR turma IS NULL OR turma = ?)`, [turma || '']);
    res.json({ temProva: rows.length > 0 });
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});

// VERIFICAR SE ALUNO JÁ FEZ A PROVA
app.get('/prova-status', exigirAluno, async (req, res) => {
  try {
    const { prova_id } = req.query;
    const aluno = req.alunoAuth.nome;
    const row = await dbGet(`SELECT * FROM prova_respostas WHERE prova_id = ? AND aluno_nome = ?`, [prova_id, aluno]);
    res.json({ feita: !!row, resultado: row || null });
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});

// BUSCAR QUESTÕES DE UMA PROVA (sem gabarito)
app.get('/prova-questoes/:id', verificarHorario, exigirAluno, async (req, res) => {
  try {
    const provaId = req.params.id;
    const prova = await dbGet(`SELECT * FROM provas WHERE id = ? AND ativa = 1`, [provaId]);
    if (!prova) return res.status(404).json({ erro: 'Prova não encontrada ou inativa.' });
    const qs = await dbAll(`SELECT id, ordem, pergunta, tipo, opcao_a, opcao_b, opcao_c, opcao_d FROM prova_questoes WHERE prova_id = ? ORDER BY ordem`, [provaId]);
    res.json({ prova: { id: prova.id, titulo: prova.titulo, descricao: prova.descricao, tempo_limite: prova.tempo_limite }, questoes: qs });
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});

// SUBMETER PROVA (aluno responde)
app.post('/prova-submeter', verificarHorario, exigirAluno, async (req, res) => {
  try {
    const { prova_id, respostas } = req.body;
    const aluno_nome = req.alunoAuth.nome, aluno_rm = req.alunoAuth.rm, turma = req.alunoAuth.turma;
    const existing = await dbGet(`SELECT id FROM prova_respostas WHERE prova_id = ? AND aluno_nome = ?`, [prova_id, aluno_nome]);
    if (existing) return res.status(409).json({ erro: 'Você já respondeu esta prova. Não é possível refazer.' });
    const questoes = await dbAll(`SELECT id, tipo, correta FROM prova_questoes WHERE prova_id = ? ORDER BY ordem`, [prova_id]);
    let acertos = 0, multiplas = 0, temDissertativa = false;
    const detalhes = questoes.map(q => {
      const marcada = respostas[q.id] || '';
      const tipo = q.tipo || 'multipla';
      if (tipo === 'dissertativa') { temDissertativa = true; return { questao_id: q.id, resposta_marcada: marcada, correta: -1 }; }
      multiplas++;
      const ok = marcada.toLowerCase() === (q.correta||'').toLowerCase() ? 1 : 0;
      if (ok) acertos++;
      return { questao_id: q.id, resposta_marcada: marcada, correta: ok };
    });
    const nota = multiplas > 0 ? Math.round((acertos / multiplas) * 10 * 10) / 10 : (temDissertativa ? null : 0);
    const respondida_em = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    await dbRun(`INSERT INTO prova_respostas (prova_id, aluno_nome, aluno_rm, turma, nota, acertos, total, respondida_em) VALUES (?,?,?,?,?,?,?,?)`, [prova_id, aluno_nome, aluno_rm || '', turma || '', nota, acertos, questoes.length, respondida_em]);
    for (const d of detalhes) {
      await dbRun(`INSERT INTO prova_respostas_detalhe (prova_id, aluno_nome, questao_id, resposta_marcada, correta) VALUES (?,?,?,?,?)`, [prova_id, aluno_nome, d.questao_id, d.resposta_marcada, d.correta]);
    }
    res.json({ ok: true, nota, acertos, total: questoes.length, temDissertativa });
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});

// ATIVAR / DESATIVAR PROVA
app.post('/prova-ativar', async (req, res) => {
  try {
    const { usuario, senha, prova_id, ativa } = req.body;
    const ok = await verificarProfessorAsync(usuario, senha, req);
    if (!ok) return res.status(401).json({ erro: 'Não autorizado.' });
    await dbRun(`UPDATE provas SET ativa = ? WHERE id = ?`, [ativa ? 1 : 0, prova_id]);
    res.json({ ok: true });
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});

// RESULTADOS DE UMA PROVA (professor)
app.get('/prova-resultados/:id', async (req, res) => {
  try {
    const { usuario, senha } = req.query;
    const ok = await verificarProfessorAsync(usuario, senha, req);
    if (!ok) return res.status(401).json({ erro: 'Não autorizado.' });
    const rows = await dbAll(`SELECT * FROM prova_respostas WHERE prova_id = ? ORDER BY nota DESC`, [req.params.id]);
    res.json(rows);
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});

// BUSCAR QUESTÕES COM GABARITO (professor)
app.get('/prova-questoes-gabarito/:id', async (req, res) => {
  try {
    const { usuario, senha } = req.query;
    const ok = await verificarProfessorAsync(usuario, senha, req);
    if (!ok) return res.status(401).json({ erro: 'Não autorizado.' });
    const rows = await dbAll(`SELECT * FROM prova_questoes WHERE prova_id = ? ORDER BY ordem`, [req.params.id]);
    res.json(rows);
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});

// BUSCAR RESPOSTAS DISSERTATIVAS
app.get('/prova-respostas-dissertativas', async (req, res) => {
  try {
    const { prova_id, aluno, usuario, senha } = req.query;
    const ok = await verificarProfessorAsync(usuario, senha, req);
    if (!ok) return res.status(401).json({ erro: 'Não autorizado.' });
    const rows = await dbAll(`SELECT pq.id as questao_id, pq.pergunta, pq.tipo, prd.resposta_marcada, prd.nota_manual FROM prova_questoes pq LEFT JOIN prova_respostas_detalhe prd ON prd.questao_id = pq.id AND prd.aluno_nome = ? WHERE pq.prova_id = ? AND pq.tipo = 'dissertativa' ORDER BY pq.ordem`, [aluno, prova_id]);
    res.json(rows);
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});

// SALVAR NOTAS MANUAIS DE QUESTÕES DISSERTATIVAS
app.post('/prova-corrigir-dissertativa', async (req, res) => {
  try {
    const { usuario, senha, prova_id, aluno_nome, notas } = req.body;
    const ok = await verificarProfessorAsync(usuario, senha, req);
    if (!ok) return res.status(401).json({ erro: 'Não autorizado.' });
    const ids = Object.keys(notas);
    if (!ids.length) return res.json({ ok: true });
    for (const qid of ids) {
      await dbRun(`UPDATE prova_respostas_detalhe SET nota_manual = ? WHERE prova_id = ? AND aluno_nome = ? AND questao_id = ?`, [notas[qid], prova_id, aluno_nome, qid]);
    }
    const qs = await dbAll(`SELECT pq.tipo, prd.correta as acertou, prd.nota_manual FROM prova_questoes pq LEFT JOIN prova_respostas_detalhe prd ON prd.questao_id = pq.id AND prd.aluno_nome = ? WHERE pq.prova_id = ?`, [aluno_nome, prova_id]);
    let somaMultipla = 0, totalMultipla = 0, somaDiss = 0, totalDiss = 0;
    qs.forEach(q => {
      if ((q.tipo || 'multipla') === 'multipla') { totalMultipla++; if (q.acertou === 1) somaMultipla++; }
      else { totalDiss++; if (q.nota_manual !== null && q.nota_manual !== undefined) somaDiss += q.nota_manual; }
    });
    const total = totalMultipla + totalDiss;
    let notaFinal = null;
    if (total > 0) {
      const ptMultipla = totalMultipla > 0 ? (somaMultipla / totalMultipla) * 10 * (totalMultipla / total) : 0;
      const ptDiss = totalDiss > 0 ? (somaDiss / totalDiss) * (totalDiss / total) : 0;
      notaFinal = Math.round((ptMultipla + ptDiss) * 10) / 10;
    }
    await dbRun(`UPDATE prova_respostas SET nota = ? WHERE prova_id = ? AND aluno_nome = ?`, [notaFinal, prova_id, aluno_nome]);
    res.json({ ok: true, notaFinal });
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});

// EXCLUIR PROVA
app.delete('/prova/:id', async (req, res) => {
  try {
    const { usuario, senha } = req.query;
    const ok = await verificarProfessorAsync(usuario, senha, req);
    if (!ok) return res.status(401).json({ erro: 'Não autorizado.' });
    const id = req.params.id;
    await dbRun(`DELETE FROM prova_respostas_detalhe WHERE prova_id = ?`, [id]);
    await dbRun(`DELETE FROM prova_respostas WHERE prova_id = ?`, [id]);
    await dbRun(`DELETE FROM prova_questoes WHERE prova_id = ?`, [id]);
    await dbRun(`DELETE FROM provas WHERE id = ?`, [id]);
    res.json({ ok: true });
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});

// EDITAR PROVA
app.put('/provas/:id', async (req, res) => {
  try {
    const { usuario, senha, titulo, descricao, turma, tempo_limite, questoes } = req.body;
    const ok = await verificarProfessorAsync(usuario, senha, req);
    if (!ok) return res.status(401).json({ erro: 'Não autorizado.' });
    const id = req.params.id;
    await dbRun(`UPDATE provas SET titulo=?, descricao=?, turma=?, tempo_limite=? WHERE id=?`, [titulo, descricao || '', turma || '', tempo_limite || 0, id]);
    if (questoes && questoes.length > 0) {
      await dbRun(`DELETE FROM prova_questoes WHERE prova_id = ?`, [id]);
      for (let i = 0; i < questoes.length; i++) {
        const q = questoes[i];
        await dbRun(`INSERT INTO prova_questoes (prova_id, ordem, pergunta, tipo, opcao_a, opcao_b, opcao_c, opcao_d, correta) VALUES (?,?,?,?,?,?,?,?,?)`, [id, i + 1, q.pergunta, q.tipo||'multipla', q.opcao_a||'', q.opcao_b||'', q.opcao_c||'', q.opcao_d||'', q.correta||'']);
      }
    }
    res.json({ ok: true });
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});

// ═══════════════════════════════════════════════
// MÓDULO: UPLOAD DE RESPOSTAS DE PROVA IMPRESSA
// ═══════════════════════════════════════════════

// ALUNO ENVIA FOTO OU TEXTO DE RESPOSTA
app.post('/prova-foto-upload', exigirAluno, async (req, res) => {
  try {
    const { prova_id, foto_base64, texto_respostas, modo_envio } = req.body;
    const aluno_nome = req.alunoAuth.nome, aluno_rm = req.alunoAuth.rm, turma = req.alunoAuth.turma;
    if (!aluno_nome) return res.status(400).json({ erro: 'Nome do aluno obrigatório.' });
    if (!foto_base64 && !texto_respostas) return res.status(400).json({ erro: 'Envie uma foto ou escreva as respostas.' });
    const enviado_em = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    const modo = modo_envio || (foto_base64 ? 'foto' : 'texto');
    const result = await dbRun(`INSERT INTO prova_respostas_foto (prova_id, aluno_nome, aluno_rm, turma, foto_base64, texto_respostas, modo_envio, status, enviado_em) VALUES (?,?,?,?,?,?,?,?,?)`, [prova_id || null, aluno_nome, aluno_rm || '', turma || '', foto_base64 || null, texto_respostas || null, modo, 'pendente', enviado_em]);
    res.json({ ok: true, id: Number(result.lastInsertRowid) });
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});

// PROFESSOR LISTA FOTOS PENDENTES
app.get('/prova-fotos', async (req, res) => {
  try {
    const { usuario, senha, status } = req.query;
    const ok = await verificarProfessorAsync(usuario, senha, req);
    if (!ok) return res.status(401).json({ erro: 'Não autorizado.' });
    const sql = status
      ? `SELECT id, prova_id, aluno_nome, aluno_rm, turma, nota_manual, comentario, status, enviado_em, corrigido_em FROM prova_respostas_foto WHERE status = ? ORDER BY id DESC`
      : `SELECT id, prova_id, aluno_nome, aluno_rm, turma, nota_manual, comentario, status, enviado_em, corrigido_em FROM prova_respostas_foto ORDER BY id DESC`;
    const rows = status ? await dbAll(sql, [status]) : await dbAll(sql);
    res.json(rows);
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});

// PROFESSOR BUSCA FOTO ESPECÍFICA
app.get('/prova-foto/:id', async (req, res) => {
  try {
    const { usuario, senha } = req.query;
    const ok = await verificarProfessorAsync(usuario, senha, req);
    if (!ok) return res.status(401).json({ erro: 'Não autorizado.' });
    const row = await dbGet(`SELECT * FROM prova_respostas_foto WHERE id = ?`, [req.params.id]);
    if (!row) return res.status(404).json({ erro: 'Não encontrado.' });
    res.json(row);
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});

// PROFESSOR CORRIGE FOTO
app.post('/prova-foto-corrigir', async (req, res) => {
  try {
    const { usuario, senha, foto_id, nota_manual, comentario } = req.body;
    const ok = await verificarProfessorAsync(usuario, senha, req);
    if (!ok) return res.status(401).json({ erro: 'Não autorizado.' });
    const corrigido_em = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    await dbRun(`UPDATE prova_respostas_foto SET nota_manual = ?, comentario = ?, status = 'corrigida', corrigido_em = ? WHERE id = ?`, [nota_manual, comentario || '', corrigido_em, foto_id]);
    res.json({ ok: true });
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});

// ═══════════════════════════════════════════════
// NOTAS DO ALUNO
// ═══════════════════════════════════════════════
app.get('/minhas-notas', exigirAluno, async (req, res) => {
  try {
    const aluno = req.alunoAuth.nome;
    if (!aluno) return res.status(400).json({ erro: 'Nome do aluno obrigatório.' });
    const online = await dbAll(`SELECT pr.prova_id, p.titulo, pr.nota, pr.acertos, pr.total, pr.respondida_em, 'online' as tipo FROM prova_respostas pr JOIN provas p ON p.id = pr.prova_id WHERE pr.aluno_nome = ? ORDER BY pr.respondida_em DESC`, [aluno]);
    const impressas = await dbAll(`SELECT f.id as prova_id, f.nota_manual as nota, NULL as acertos, NULL as total, f.corrigido_em as respondida_em, f.modo_envio, f.comentario, f.status, 'impressa' as tipo FROM prova_respostas_foto f INNER JOIN provas p ON p.id = f.prova_id WHERE f.aluno_nome = ? ORDER BY f.enviado_em DESC`, [aluno]);
    res.json({ online: online || [], impressas: impressas || [] });
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});

// ═══════════════════════════════════════════════════════════════
// MÓDULO: ATIVIDADES — ENVIO DE ARQUIVOS POR TURMA/DATA
// ═══════════════════════════════════════════════════════════════

// PROFESSOR: criar janela de envio
app.post('/atividades-janela', async (req, res) => {
  try {
    const { usuario, senha, titulo, descricao, turma, data_envio } = req.body;
    const ok = await verificarProfessorAsync(usuario, senha, req);
    if (!ok) return res.status(401).json({ erro: 'Não autorizado.' });
    if (!titulo || !turma || !data_envio)
      return res.status(400).json({ erro: 'Título, turma e data são obrigatórios.' });
    const criada_em = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    const result = await dbRun(
      `INSERT INTO atividades_janelas (titulo, descricao, turma, data_envio, ativa, criada_em) VALUES (?,?,?,?,1,?)`,
      [titulo, descricao || '', turma, data_envio, criada_em]
    );
    res.json({ ok: true, id: Number(result.lastInsertRowid) });
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});

// PROFESSOR: listar todas as janelas
app.get('/atividades-janelas', async (req, res) => {
  try {
    const { usuario, senha } = req.query;
    const ok = await verificarProfessorAsync(usuario, senha, req);
    if (!ok) return res.status(401).json({ erro: 'Não autorizado.' });
    const rows = await dbAll(
      `SELECT j.*, COUNT(e.id) AS total_envios
       FROM atividades_janelas j
       LEFT JOIN atividades_envios e ON e.janela_id = j.id
       GROUP BY j.id ORDER BY j.data_envio DESC`
    );
    res.json(rows);
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});

// PROFESSOR: ativar / desativar janela
app.post('/atividades-janela-ativar', async (req, res) => {
  try {
    const { usuario, senha, janela_id, ativa } = req.body;
    const ok = await verificarProfessorAsync(usuario, senha, req);
    if (!ok) return res.status(401).json({ erro: 'Não autorizado.' });
    await dbRun(`UPDATE atividades_janelas SET ativa = ? WHERE id = ?`, [ativa ? 1 : 0, janela_id]);
    res.json({ ok: true });
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});

// PROFESSOR: excluir janela (e envios vinculados)
app.delete('/atividades-janela/:id', async (req, res) => {
  try {
    const { usuario, senha } = req.query;
    const ok = await verificarProfessorAsync(usuario, senha, req);
    if (!ok) return res.status(401).json({ erro: 'Não autorizado.' });
    const id = req.params.id;
    await dbRun(`DELETE FROM atividades_envios WHERE janela_id = ?`, [id]);
    await dbRun(`DELETE FROM atividades_janelas WHERE id = ?`, [id]);
    res.json({ ok: true });
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});

// PROFESSOR: ver envios de uma janela
app.get('/atividades-envios/:janela_id', async (req, res) => {
  try {
    const { usuario, senha } = req.query;
    const ok = await verificarProfessorAsync(usuario, senha, req);
    if (!ok) return res.status(401).json({ erro: 'Não autorizado.' });
    const rows = await dbAll(
      `SELECT id, janela_id, aluno_nome, aluno_rm, turma, arquivo_nome, enviado_em FROM atividades_envios WHERE janela_id = ? ORDER BY enviado_em ASC`,
      [req.params.janela_id]
    );
    res.json(rows);
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});

// PROFESSOR: baixar arquivo de um envio
app.get('/atividade-download/:id', async (req, res) => {
  try {
    const { usuario, senha } = req.query;
    const ok = await verificarProfessorAsync(usuario, senha, req);
    if (!ok) return res.status(401).json({ erro: 'Não autorizado.' });
    const row = await dbGet(`SELECT * FROM atividades_envios WHERE id = ?`, [req.params.id]);
    if (!row || !row.arquivo_base64) return res.status(404).json({ erro: 'Arquivo não encontrado.' });
    const buf = Buffer.from(row.arquivo_base64, 'base64');
    const ext = (row.arquivo_nome || '').split('.').pop().toLowerCase();
    const mime = ext === 'pdf'  ? 'application/pdf'
               : ext === 'docx' ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
               : ext === 'doc'  ? 'application/msword'
               : ext === 'xlsx' ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
               : ext === 'xls'  ? 'application/vnd.ms-excel'
               : 'application/octet-stream';
    const nomeSeguro = String(row.arquivo_nome || 'arquivo').replace(/[\r\n"\\]/g, '_');
    res.setHeader('Content-Disposition', `attachment; filename*=UTF-8''${encodeURIComponent(nomeSeguro)}`);
    res.setHeader('Content-Type', mime);
    res.send(buf);
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});

// PROFESSOR: salvar nota de um envio
app.post('/atividade-nota', async (req, res) => {
  try {
    const { usuario, senha, envio_id, nota, comentario } = req.body;
    const ok = await verificarProfessorAsync(usuario, senha, req);
    if (!ok) return res.status(401).json({ erro: 'Não autorizado.' });
    await dbRun(`UPDATE atividades_envios SET nota = ?, comentario = ? WHERE id = ?`, [nota, comentario || '', envio_id]);
    res.json({ ok: true });
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});

// ALUNO: ver notas de atividades enviadas
app.get('/minhas-atividades', exigirAluno, async (req, res) => {
  try {
    const aluno = req.alunoAuth.nome;
    if (!aluno) return res.status(400).json({ erro: 'Nome obrigatório.' });
    const rows = await dbAll(
      `SELECT e.id, j.titulo, e.arquivo_nome, e.enviado_em, e.nota, e.comentario
       FROM atividades_envios e JOIN atividades_janelas j ON j.id = e.janela_id
       WHERE e.aluno_nome = ? ORDER BY e.enviado_em DESC`, [aluno]
    );
    res.json(rows);
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});

// ALUNO: verificar se há janela aberta para sua turma hoje
app.get('/atividade-hoje', exigirAluno, async (req, res) => {
  try {
    const turma = req.alunoAuth.turma;
    const hoje = new Date().toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    const rows = await dbAll(
      `SELECT id, titulo, descricao FROM atividades_janelas WHERE ativa = 1 AND turma = ? AND data_envio = ?`,
      [turma, hoje]
    );
    res.json(rows);
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});

// ALUNO: verificar se já enviou para esta janela
app.get('/atividade-status', exigirAluno, async (req, res) => {
  try {
    const { janela_id } = req.query;
    const aluno = req.alunoAuth.nome;
    const row = await dbGet(
      `SELECT id, arquivo_nome, enviado_em FROM atividades_envios WHERE janela_id = ? AND aluno_nome = ?`,
      [janela_id, aluno]
    );
    res.json({ enviado: !!row, envio: row || null });
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});

// ALUNO: enviar arquivo (salvo em base64 no Turso)
app.post('/atividade-enviar', exigirAluno, upload.single('arquivo'), async (req, res) => {
  try {
    const { janela_id } = req.body;
    const aluno_nome = req.alunoAuth.nome, aluno_rm = req.alunoAuth.rm, turma = req.alunoAuth.turma;
    if (!aluno_nome) return res.status(400).json({ erro: 'Nome do aluno obrigatório.' });
    if (!req.file)   return res.status(400).json({ erro: 'Nenhum arquivo recebido.' });
    if (!janela_id)  return res.status(400).json({ erro: 'Janela inválida.' });
    const janela = await dbGet(`SELECT id FROM atividades_janelas WHERE id = ? AND ativa = 1`, [janela_id]);
    if (!janela) return res.status(403).json({ erro: 'Esta janela de envio está fechada.' });
    const arquivo_base64 = req.file.buffer.toString('base64');
    const enviado_em = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    await dbRun(
      `INSERT INTO atividades_envios (janela_id, aluno_nome, aluno_rm, turma, arquivo_nome, arquivo_base64, enviado_em)
       VALUES (?,?,?,?,?,?,?)
       ON CONFLICT(janela_id, aluno_nome) DO UPDATE SET
         arquivo_nome   = excluded.arquivo_nome,
         arquivo_base64 = excluded.arquivo_base64,
         enviado_em     = excluded.enviado_em`,
      [janela_id, aluno_nome, aluno_rm || '', turma || '', req.file.originalname, arquivo_base64, enviado_em]
    );
    res.json({ ok: true });
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});

// ═══════════════════════════════════════════════════════════════
// RECUPERAÇÃO DE SENHA
// ═══════════════════════════════════════════════════════════════

// PROFESSOR: redefinir senha de um aluno diretamente
app.post('/professor-redefinir-senha', async (req, res) => {
  try {
    const { usuario, senha, aluno_id, nova_senha } = req.body;
    const ok = await verificarProfessorAsync(usuario, senha, req);
    if (!ok) return res.status(401).json({ erro: 'Não autorizado.' });
    if (!nova_senha || nova_senha.trim().length < 4)
      return res.status(400).json({ erro: 'A nova senha deve ter pelo menos 4 caracteres.' });
    await dbRun(`UPDATE alunos SET senha = ? WHERE id = ?`, [await hashSenha(nova_senha.trim()), aluno_id]);
    res.json({ ok: true });
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});

// ALUNO: solicitar recuperação de senha por e-mail
app.post('/recuperar-senha', async (req, res) => {
  try {
    const { rm, email } = req.body;
    if (!rm || !email) return res.status(400).json({ erro: 'RM e e-mail são obrigatórios.' });

    const chave = 'rs:' + req.ip;
    if (bloqueado(chave, 20)) return res.status(429).json({ erro: 'Muitas solicitações. Aguarde alguns minutos.' });
    falhou(chave, 15 * 60 * 1000); // toda solicitação conta

    // Resposta igual para qualquer caso: não revela se o RM existe
    const resposta = { ok: true, mensagem: 'Se os dados estiverem corretos, você receberá um e-mail com o link.' };
    const aluno = await dbGet(`SELECT * FROM alunos WHERE rm = ?`, [String(rm).trim()]);
    if (!aluno || !aluno.email || aluno.email.toLowerCase() !== String(email).toLowerCase()) return res.json(resposta);

    // Token aleatório forte; no banco fica só o hash dele
    const token = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    const expira = new Date(Date.now() + 30 * 60 * 1000).toISOString(); // 30 minutos
    await dbRun(`DELETE FROM reset_tokens WHERE aluno_id = ?`, [aluno.id]);
    await dbRun(`INSERT INTO reset_tokens (aluno_id, token, expira_em) VALUES (?,?,?)`, [aluno.id, tokenHash, expira]);

    const baseUrl = process.env.BASE_URL || 'https://plataforma-aulas.onrender.com';
    const link = `${baseUrl}/redefinir-senha.html?token=${token}`;

    const transporter = nodemailer.createTransport({
      host:   process.env.EMAIL_HOST,
      port:   parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_PORT === '465',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
    });

    await transporter.sendMail({
      from: `"Plataforma Aulas" <${process.env.EMAIL_USER}>`,
      to: aluno.email,
      subject: '🔐 Recuperação de senha — Plataforma Aulas',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto;padding:30px;background:#1a1a2e;color:#e2e8f0;border-radius:12px">
          <h2 style="color:#4f8ef7;margin-bottom:16px">🔐 Recuperação de Senha</h2>
          <p>Olá, <strong>${escapeHtml(aluno.nome)}</strong>!</p>
          <p>Recebemos uma solicitação para redefinir sua senha. Clique no botão abaixo:</p>
          <div style="text-align:center;margin:28px 0">
            <a href="${link}" style="background:#4f8ef7;color:#fff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:16px">
              Redefinir minha senha
            </a>
          </div>
          <p style="font-size:13px;color:#94a3b8">⏱️ Este link expira em <strong>30 minutos</strong>.</p>
          <p style="font-size:13px;color:#94a3b8">Se você não solicitou isso, ignore este e-mail.</p>
        </div>
      `
    });

    res.json(resposta);
  } catch(e) {
    console.error('Erro ao enviar e-mail:', e.message);
    res.status(500).json({ erro: 'Erro ao enviar e-mail. Fale com o professor.' });
  }
});

// ALUNO: verificar token e redefinir senha
app.post('/redefinir-senha', async (req, res) => {
  try {
    const { token, nova_senha } = req.body;
    if (!token || !nova_senha || nova_senha.trim().length < 4)
      return res.status(400).json({ erro: 'Dados inválidos. A senha deve ter pelo menos 4 caracteres.' });

    const tokenHash = crypto.createHash('sha256').update(String(token)).digest('hex');
    const registro = await dbGet(`SELECT * FROM reset_tokens WHERE token = ?`, [tokenHash]);
    if (!registro) return res.status(400).json({ erro: 'Link inválido ou já utilizado.' });
    if (new Date(registro.expira_em) < new Date())
      return res.status(400).json({ erro: 'Link expirado. Solicite um novo.' });

    await dbRun(`UPDATE alunos SET senha = ? WHERE id = ?`, [await hashSenha(nova_senha.trim()), registro.aluno_id]);
    await dbRun(`DELETE FROM reset_tokens WHERE token = ?`, [tokenHash]);
    res.json({ ok: true });
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});


// ═══════════════════════════════════════════════════════════════
// CURSO DE PROGRAMAÇÃO WEB
// ═══════════════════════════════════════════════════════════════
const MODULOS_CURSO = 5;
function numeroLimitado(v, max) { const n = Number(v); return Number.isFinite(n) ? Math.max(0, Math.min(n, max)) : 0; }
const ID_ETAPA = /^[A-Za-z0-9_-]{1,40}$/;

// Aceita só o formato esperado do progresso (o navegador não é confiável) e limita tamanhos
function limparDocCurso(d) {
  d = (d && typeof d === 'object' && !Array.isArray(d)) ? d : {};
  const mapa = (src, fn, max) => {
    const r = {}; let n = 0;
    for (const k of Object.keys(src && typeof src === 'object' ? src : {})) {
      if (!ID_ETAPA.test(k) || n++ >= (max || 80)) continue;
      r[k] = fn(src[k]);
    }
    return r;
  };
  const out = { v: 2 };
  out.done    = mapa(d.done,   v => numeroLimitado(v, 4e12) || Date.now());
  out.cur     = numeroLimitado(d.cur, 200);
  out.tries   = mapa(d.tries,  v => numeroLimitado(v, 9999));
  out.hints   = mapa(d.hints,  v => numeroLimitado(v, 9999));
  out.assist  = mapa(d.assist, () => 1);
  out.notes   = mapa(d.notes,  v => String(v == null ? '' : v).slice(0, 400), 20);
  out.wrong   = mapa(d.wrong,  w => {
    const r = {}; let i = 0;
    for (const k of Object.keys(w && typeof w === 'object' ? w : {})) { if (i++ >= 8) break; r[String(k).slice(0, 24)] = numeroLimitado(w[k], 9999); }
    return r;
  });
  out.help    = (typeof d.help === 'string' && ID_ETAPA.test(d.help)) ? d.help : '';
  out.helpTs  = out.help ? numeroLimitado(d.helpTs, 4e12) : 0;
  const lab = d.lab && typeof d.lab === 'object' ? d.lab : {};
  out.lab = { gav: numeroLimitado(lab.gav, 100), dom: numeroLimitado(lab.dom, 100), prac: numeroLimitado(lab.prac, 100), quiz: numeroLimitado(lab.quiz, 100) };
  out.upd = Date.now();
  return out;
}

// ALUNO: carrega o próprio progresso, as validações do professor e os módulos liberados para a turma
app.get('/curso/estado', exigirAluno, async (req, res) => {
  try {
    const { nome, turma } = req.alunoAuth;
    const row = await dbGet(`SELECT doc FROM curso_progresso WHERE aluno_nome = ?`, [nome]);
    let doc = null;
    if (row) { try { doc = JSON.parse(row.doc); } catch (e) { doc = null; } }
    const val = await dbAll(`SELECT modulo, validado_em FROM curso_validacoes WHERE aluno_nome = ?`, [nome]);
    const lib = await dbAll(`SELECT modulo FROM curso_liberacao WHERE turma = ? ORDER BY modulo`, [turma]);
    const validados = {};
    val.forEach(v => { validados[v.modulo] = Number(v.validado_em) || 0; });
    // sem nenhuma linha para a turma = o professor nunca configurou = tudo liberado
    res.json({ doc, validados, liberados: lib.length ? lib.map(l => Number(l.modulo)) : null });
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});

// ALUNO: salva o próprio progresso
app.put('/curso/progresso', exigirAluno, async (req, res) => {
  try {
    const { nome, rm, turma } = req.alunoAuth;
    const chave = 'cp:' + nome;
    if (bloqueado(chave, 1000)) return res.status(429).json({ erro: 'Muitas gravações. Aguarde um pouco.' });
    falhou(chave);
    const doc = limparDocCurso(req.body && req.body.doc);
    await dbRun(
      `INSERT INTO curso_progresso (aluno_nome, aluno_rm, turma, doc, atualizado_em) VALUES (?,?,?,?,?)
       ON CONFLICT(aluno_nome) DO UPDATE SET aluno_rm = excluded.aluno_rm, turma = excluded.turma, doc = excluded.doc, atualizado_em = excluded.atualizado_em`,
      [nome, rm || '', turma || '', JSON.stringify(doc), Date.now()]
    );
    res.json({ ok: true });
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});

// PROFESSOR: tudo da turma (progresso, validações, liberação e quem ainda não começou)
app.get('/curso/turma', async (req, res) => {
  try {
    if (!(await exigirProfessor(req, res))) return;
    const prog = await dbAll(`SELECT aluno_nome, aluno_rm, turma, doc, atualizado_em FROM curso_progresso ORDER BY atualizado_em DESC`);
    const val = await dbAll(`SELECT aluno_nome, modulo, validado_em FROM curso_validacoes`);
    const lib = await dbAll(`SELECT turma, modulo FROM curso_liberacao ORDER BY turma, modulo`);
    const alunos = await dbAll(`SELECT nome, rm, turma FROM alunos ORDER BY nome`);
    const cfg = await dbGet(`SELECT valor FROM configuracoes WHERE chave = 'turmas'`);
    const validacoes = {};
    val.forEach(v => { (validacoes[v.aluno_nome] = validacoes[v.aluno_nome] || {})[v.modulo] = Number(v.validado_em) || 0; });
    const liberacao = {};
    lib.forEach(l => { (liberacao[l.turma] = liberacao[l.turma] || []).push(Number(l.modulo)); });
    res.json({
      progresso: prog.map(p => { let doc = null; try { doc = JSON.parse(p.doc); } catch (e) { /* doc inválido */ } return { aluno_nome: p.aluno_nome, aluno_rm: p.aluno_rm, turma: p.turma, doc, atualizado_em: Number(p.atualizado_em) || 0 }; }),
      validacoes, liberacao, alunos,
      turmas: cfg ? String(cfg.valor).split(',').map(x => x.trim()).filter(Boolean) : []
    });
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});

// PROFESSOR: validar (ou desfazer a validação de) um módulo de um aluno
app.post('/curso/validar', async (req, res) => {
  try {
    const { usuario, senha, aluno_nome, modulo, validado } = req.body;
    if (!(await verificarProfessorAsync(usuario, senha, req))) return res.status(401).json({ erro: 'Não autorizado.' });
    const m = Number(modulo);
    if (!aluno_nome || !Number.isInteger(m) || m < 0 || m >= MODULOS_CURSO) return res.status(400).json({ erro: 'Dados inválidos.' });
    if (validado) await dbRun(`INSERT OR REPLACE INTO curso_validacoes (aluno_nome, modulo, validado_em) VALUES (?,?,?)`, [String(aluno_nome), m, Date.now()]);
    else await dbRun(`DELETE FROM curso_validacoes WHERE aluno_nome = ? AND modulo = ?`, [String(aluno_nome), m]);
    res.json({ ok: true });
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});

// PROFESSOR: liberar módulos para uma turma (lista vazia = voltar a liberar tudo)
app.post('/curso/liberacao', async (req, res) => {
  try {
    const { usuario, senha, turma, modulos } = req.body;
    if (!(await verificarProfessorAsync(usuario, senha, req))) return res.status(401).json({ erro: 'Não autorizado.' });
    if (!turma || typeof turma !== 'string' || !Array.isArray(modulos)) return res.status(400).json({ erro: 'Dados inválidos.' });
    const validos = [...new Set(modulos.map(Number).filter(n => Number.isInteger(n) && n >= 0 && n < MODULOS_CURSO))];
    await dbRun(`DELETE FROM curso_liberacao WHERE turma = ?`, [turma]);
    for (const m of validos) await dbRun(`INSERT INTO curso_liberacao (turma, modulo) VALUES (?,?)`, [turma, m]);
    res.json({ ok: true, modulos: validos });
  } catch(e) { res.status(500).json({ erro: erroInterno(e) }); }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
