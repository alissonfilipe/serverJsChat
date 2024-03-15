const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Define o diretório dos arquivos estáticos
const diretorioEstatico = path.join(__dirname, '');

// Objeto para armazenar informações dos usuários conectados
const usuariosConectados = {};

// Middleware para processar JSON e formulários URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para imprimir mensagem no console quando alguém se conecta
app.use((req, res, next) => {
    console.log('Nova conexão:', req.ip); // Imprime o IP da pessoa que se conectou
    next(); // Chama o próximo middleware na cadeia
});

// Servir arquivos estáticos
app.use(express.static(diretorioEstatico));

// Rota para receber mensagens do cliente e enviar para o destinatário
app.post('/mensagens', (req, res) => {
    const nomeUsuarioDestinatario = req.body.destinatario; // Campo do destinatário no corpo da requisição
    const mensagem = req.body.message; // Campo da mensagem no corpo da requisição
    
    if (nomeUsuarioDestinatario && usuariosConectados[nomeUsuarioDestinatario]) {
        // Enviar a mensagem para o destinatário
        const idConexaoDestinatario = usuariosConectados[nomeUsuarioDestinatario];
        // Aqui você pode enviar a mensagem para o destinatário usando WebSockets, por exemplo
        console.log(`Enviando mensagem para ${nomeUsuarioDestinatario}:`, mensagem);
        res.status(200).send('Mensagem enviada com sucesso!');
    } else {
        res.status(404).send('Destinatário não encontrado ou não está conectado.');
    }
});

// Rota para registrar a conexão de um usuário
app.post('/conectar', (req, res) => {
    const nomeUsuario = req.body.nome; // Campo do nome de usuário no corpo da requisição
    const idConexao = req.ip; // Identificador de conexão usando o IP
    
    if (nomeUsuario && idConexao) {
        usuariosConectados[nomeUsuario] = idConexao;
        console.log('Novo usuário conectado:', nomeUsuario);
        res.status(200).send('Conexão estabelecida com sucesso!');
    } else {
        res.status(400).send('Nome de usuário ou identificador de conexão ausentes na requisição.');
    }
});

// Iniciando o servidor
app.listen(port, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
