const disciplinaEl = document.getElementById('disciplina');
const serieEl = document.getElementById('serie');
const temaEl = document.getElementById('tema');
const objetivoEl = document.getElementById('objetivo');
const previewEl = document.getElementById('preview');
const historicoEl = document.getElementById('historico');
const filtroDisciplinaEl = document.getElementById('filtroDisciplina');
const listaLivrosEl = document.getElementById('listaLivros');

const btnAtividade = document.getElementById('btnAtividade');
const btnQuestoes = document.getElementById('btnQuestoes');
const btnTexto = document.getElementById('btnTexto');
const btnSalvar = document.getElementById('btnSalvar');
const btnBaixar = document.getElementById('btnBaixar');
const btnLimpar = document.getElementById('btnLimpar');

const livros = [
  {
    titulo: 'OpenStax - Algebra and Trigonometry 2e',
    disciplina: 'Matemática',
    licenca: 'Creative Commons',
    link: 'https://openstax.org/details/books/algebra-and-trigonometry-2e'
  },
  {
    titulo: 'OpenStax - Biology 2e',
    disciplina: 'Biologia',
    licenca: 'Creative Commons',
    link: 'https://openstax.org/details/books/biology-2e'
  },
  {
    titulo: 'OpenStax - Chemistry 2e',
    disciplina: 'Química',
    licenca: 'Creative Commons',
    link: 'https://openstax.org/details/books/chemistry-2e'
  },
  {
    titulo: 'Domínio Público - Iracema',
    disciplina: 'Português',
    licenca: 'Domínio público',
    link: 'http://www.dominiopublico.gov.br/pesquisa/DetalheObraForm.do?select_action=&co_obra=1965'
  },
  {
    titulo: 'Wikibooks - High School Geography',
    disciplina: 'Geografia',
    licenca: 'CC BY-SA',
    link: 'https://en.wikibooks.org/wiki/High_School_Geography'
  }
];

let conteudoAtual = '';

function contexto() {
  return {
    disciplina: disciplinaEl.value,
    serie: serieEl.value,
    tema: temaEl.value.trim() || 'Tema a definir',
    objetivo: objetivoEl.value.trim() || 'Fixar os principais conceitos da aula'
  };
}

function marcarBotao(botaoAtivo) {
  [btnAtividade, btnQuestoes, btnTexto].forEach((btn) => btn.classList.remove('primary'));
  [btnAtividade, btnQuestoes, btnTexto].forEach((btn) => btn.classList.add('secondary'));
  botaoAtivo.classList.remove('secondary');
  botaoAtivo.classList.add('primary');
}

function renderAtividade() {
  const { disciplina, serie, tema, objetivo } = contexto();
  conteudoAtual = `Atividade\n${disciplina} - ${serie}\nTema: ${tema}\nObjetivo: ${objetivo}`;
  previewEl.innerHTML = `
    <h3>Atividade pronta</h3>
    <p><strong>${disciplina}</strong> • ${serie}</p>
    <p><strong>Tema:</strong> ${tema}</p>
    <p><strong>Objetivo:</strong> ${objetivo}</p>
    <ol>
      <li>Abertura com pergunta norteadora.</li>
      <li>Exercício prático guiado.</li>
      <li>Fechamento e síntese da aula.</li>
    </ol>
  `;
  marcarBotao(btnAtividade);
}

function renderQuestoesAdaptadas() {
  const { disciplina, serie, tema, objetivo } = contexto();
  conteudoAtual = `Questões adaptadas\n${disciplina} - ${serie}\nTema: ${tema}\nObjetivo: ${objetivo}`;
  previewEl.innerHTML = `
    <h3>Questões adaptadas</h3>
    <p><strong>${disciplina}</strong> • ${serie}</p>
    <p><strong>Tema:</strong> ${tema}</p>
    <ul>
      <li><strong>Nível 1:</strong> definição principal e exemplo resolvido.</li>
      <li><strong>Nível 2:</strong> aplicação em situação do cotidiano.</li>
      <li><strong>Nível 3:</strong> questão de raciocínio com justificativa.</li>
    </ul>
    <p class="muted">Objetivo pedagógico: ${objetivo}</p>
  `;
  marcarBotao(btnQuestoes);
}

function renderTextoSimplificado() {
  const { disciplina, serie, tema, objetivo } = contexto();
  conteudoAtual = `Texto simplificado\n${disciplina} - ${serie}\nTema: ${tema}\nObjetivo: ${objetivo}`;
  previewEl.innerHTML = `
    <h3>Texto simplificado</h3>
    <p><strong>${disciplina}</strong> • ${serie}</p>
    <p><strong>Tema:</strong> ${tema}</p>
    <p>
      Este resumo apresenta o conteúdo de forma clara, com linguagem simples e
      exemplos diretos para facilitar a compreensão dos estudantes.
    </p>
    <p class="muted">Objetivo pedagógico: ${objetivo}</p>
  `;
  marcarBotao(btnTexto);
}

function salvarNoHistorico() {
  if (!conteudoAtual) {
    previewEl.insertAdjacentHTML('beforeend', '<p class="success">Gere um conteúdo antes de salvar.</p>');
    return;
  }

  const { disciplina, serie, tema } = contexto();
  const item = document.createElement('li');
  item.className = 'history-item';
  item.textContent = `${disciplina} • ${serie} • ${tema}`;

  const vazio = historicoEl.querySelector('.muted');
  if (vazio) {
    vazio.parentElement.removeChild(vazio);
  }

  historicoEl.prepend(item);
}

function baixarConteudo() {
  if (!conteudoAtual) {
    previewEl.insertAdjacentHTML('beforeend', '<p class="success">Gere um conteúdo para baixar.</p>');
    return;
  }

  const blob = new Blob([conteudoAtual], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'material-eduplanner.txt';
  link.click();
  URL.revokeObjectURL(url);
}

function limparCampos() {
  temaEl.value = '';
  objetivoEl.value = '';
  conteudoAtual = '';
  previewEl.innerHTML = '<p>Campos limpos. Preencha novamente para gerar o material.</p>';
}

function renderLivros() {
  const filtro = filtroDisciplinaEl.value;
  const filtrados = livros.filter((livro) => filtro === 'todas' || livro.disciplina === filtro);

  if (!filtrados.length) {
    listaLivrosEl.innerHTML = '<p class="muted">Nenhum livro encontrado.</p>';
    return;
  }

  listaLivrosEl.innerHTML = filtrados
    .map(
      (livro) => `
      <article class="book-item">
        <h3>${livro.titulo}</h3>
        <p>${livro.disciplina} • Licença: ${livro.licenca}</p>
        <a href="${livro.link}" target="_blank" rel="noopener noreferrer">Acessar material</a>
      </article>
    `
    )
    .join('');
}

btnAtividade.addEventListener('click', renderAtividade);
btnQuestoes.addEventListener('click', renderQuestoesAdaptadas);
btnTexto.addEventListener('click', renderTextoSimplificado);
btnSalvar.addEventListener('click', salvarNoHistorico);
btnBaixar.addEventListener('click', baixarConteudo);
btnLimpar.addEventListener('click', limparCampos);
filtroDisciplinaEl.addEventListener('change', renderLivros);

renderLivros();
