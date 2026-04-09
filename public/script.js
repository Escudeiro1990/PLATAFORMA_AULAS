function proxima(etapa) {
  document.getElementById("etapa" + etapa).classList.remove("ativa");

  if (etapa < 3) {
    document.getElementById("etapa" + (etapa + 1)).classList.add("ativa");
  } else {
    document.getElementById("quiz").classList.add("ativa");
  }
}

function responder(botao, correto) {
  const resultado = document.getElementById("resultado");
  const botoes = document.querySelectorAll(".opcao");

  // trava todos os botões
  botoes.forEach(b => b.disabled = true);

  if (correto) {
    botao.classList.add("correto");
    resultado.innerHTML = "✅ Correto! A aba Inserir permite adicionar tabelas.";
    salvar(10);
  } else {
    botao.classList.add("errado");
    resultado.innerHTML = "❌ Errado! A resposta correta é 'Inserir'.";

    // encontra o botão correto (pelo atributo)
    botoes.forEach(b => {
      if (b.getAttribute("onclick").includes("true")) {
        b.classList.add("correto");
      }
    });
  }
}

function salvar(nota) {
  const nome = localStorage.getItem("aluno");

  fetch('/salvar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nome: nome,
      aula: 'Word Básico',
      nota: nota
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log("Salvo:", data);
  })
  .catch(err => {
    console.error("Erro:", err);
  });
}