const express = require('express');
const { buscarDados, buscarDadoController,  buscarDadosController } = require('../controller/controller');

const router = express.Router();

router.post('/buscar', buscarDadoController)

// Rota para buscar sugestões de filmes
router.post('/buscar-sugestoes', buscarDadosController);

module.exports = router;

