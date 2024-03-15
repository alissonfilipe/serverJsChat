const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Define o diretório dos arquivos estáticos
const diretorioEstatico = path.join(__dirname, '');

// Middleware para processar JSON e formulários URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos
app.use(express.static(diretorioEstatico));

// Rota para receber mensagens do cliente
app.post('/mensagens', (req, res) => {
    const mensagem = req.body.message; // Supondo que o campo da mensagem tenha o nome 'message'
    console.log('Mensagem recebida:', mensagem);
    // Aqui você pode adicionar lógica para armazenar a mensagem no banco de dados, enviar para outros clientes, etc.
    res.status(200).send('Mensagem recebida com sucesso!');
});

// Iniciando o servidor
app.listen(port, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
