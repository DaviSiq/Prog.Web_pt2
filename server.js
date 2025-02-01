const express = require('express');
const router = require('./src/routes/routes');
const frontendRouter = require('./public/frontendRoutes/frontEndRoutes');
const app = express();

// Servir arquivos estáticos da pasta 'public'

app.use(express.json());
app.use('/', frontendRouter);//caminho definido para o frontEndRoutes
app.use('/api', router); //caminho para o 'back-end'/api

const port = 3000;

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

