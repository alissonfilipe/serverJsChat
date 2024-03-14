const express = require('express')
const path = require('path');
const app = express()
const port = 3000;

//define o diretório dos arquivos estáticos
const diretorioEstatico = path.join(__dirname, '');

//
app.use(express.static(diretorioEstatico));


//iniciando o servidor
app.listen(port, () => {
    console.log('Servidor rodando em http://localhost:3000')
})

