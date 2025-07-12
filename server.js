const express = require('express')

const app = express();
const PORT = 3000;

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/sugestao', (req, res) => {
    const { nome, ingredientes } = req.query;

    res.send(`
        <h1>Sugestão enviada! Agradecemos pela sua participação.</h1>
        <p><strong>Nome do lanche:</strong> ${nome}</p>
        <p><strong>Ingredientes:</strong> ${ingredientes}</p>
        <a href="/">Voltar para a página inicial</a>
    `);
});

app.get('/contato', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'contato.html'));
});

app.post('/contato', (req, res) => {
  const { nome, email, assunto, mensagem } = req.body;

  res.send(`
    <h1>Sua mensagem acabou de ser enviada com sucesso!</h1>
    <p><strong>Nome:</strong> ${nome}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Assunto:</strong> ${assunto}</p>
    <p><strong>Mensagem:</strong> ${mensagem}</p>
    <a href="/">Voltar para a página inicial</a>
  `);
});

const fs = require('fs');

app.get('/api/lanches', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'data', 'lanches.json');

  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao ler o arquivo de lanches' });
    }

    const lanches = JSON.parse(data);
    res.json(lanches);
  });
});

app.listen(PORT, () => {
    console.log(`Servidor da DevBurger rodando em localhost:${PORT}`);
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});