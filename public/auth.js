/* auth.js: liga as páginas atuais à segurança do servidor, sem mudar o resto do código.
 *
 * O que faz:
 *  1. Guarda o token de sessão do aluno (/login-aluno, /cadastro) e o do professor (/login-professor).
 *  2. Envia o token do aluno (Authorization: Bearer) e o do professor (X-Prof-Token) em todo fetch para o próprio site.
 *     A senha do professor não fica guardada no navegador: só o token, que vale 8 horas.
 *  3. Sessões antigas (que guardavam a senha) continuam funcionando enquanto existirem: a senha vai em cabeçalho,
 *     nunca na URL.
 *  4. Se a sessão expirar, volta para a tela de login.
 *
 * Inclua esta linha logo depois de <head> em cada página que chama o servidor:
 *   <script src="auth.js"></script>
 */
(function () {
  var nativeFetch = window.fetch.bind(window);

  function lerJSON(chave) {
    try { return JSON.parse(localStorage.getItem(chave) || 'null'); } catch (e) { return null; }
  }

  // espera o token ser salvo antes de entregar a resposta: evita corrida com o redirecionamento da página
  function guardarToken(res, chave) {
    return res.clone().json()
      .then(function (d) { if (d && d.token) localStorage.setItem(chave, d.token); })
      .catch(function () { /* resposta sem JSON: nada a guardar */ })
      .then(function () { return res; });
  }

  window.fetch = function (input, init) {
    var url = null;
    try {
      if (typeof input === 'string' || input instanceof URL) {
        url = new URL(String(input), location.href);
        if (url.origin !== location.origin) url = null; // só mexe em chamadas ao próprio site
      }
    } catch (e) { url = null; }

    var enviouTokenProf = false;
    if (url) {
      init = Object.assign({}, init || {});
      var headers = new Headers(init.headers || {});

      var token = localStorage.getItem('token_aluno');
      if (token && !headers.has('Authorization')) headers.set('Authorization', 'Bearer ' + token);

      var prof = lerJSON('professor');
      if (prof && prof.usuario) {
        var tp = localStorage.getItem('prof_token');
        if (tp) {
          headers.set('X-Prof-Token', tp);
          enviouTokenProf = true;
        } else if (prof.senha && prof.senha !== '__token__') {
          headers.set('X-Prof-Usuario', encodeURIComponent(prof.usuario));
          headers.set('X-Prof-Senha', encodeURIComponent(prof.senha));
        }
        url.searchParams.delete('usuario');
        url.searchParams.delete('senha');
      }

      init.headers = headers;
      input = url.pathname + url.search;
    }

    return nativeFetch(input, init).then(function (res) {
      if (!url) return res;
      var caminho = url.pathname;
      if (res.ok && (caminho === '/login-aluno' || caminho === '/cadastro')) return guardarToken(res, 'token_aluno');
      if (res.ok && caminho === '/login-professor') return guardarToken(res, 'prof_token');
      if (res.status === 401) {
        // sessão do professor vencida (o login e a troca de senha respondem 401 por senha errada: não contam)
        if (enviouTokenProf && caminho !== '/login-professor' && caminho !== '/professor-alterar') {
          localStorage.removeItem('prof_token');
          localStorage.removeItem('professor');
          if (!/\/(index\.html)?$/.test(location.pathname)) location.href = '/index.html';
          return res;
        }
        res.clone().json().then(function (d) {
          if (d && d.relogin) {
            localStorage.removeItem('token_aluno');
            if (!/\/(index\.html)?$/.test(location.pathname)) location.href = '/index.html';
          }
        }).catch(function () { /* ignora */ });
      }
      return res;
    });
  };
})();
