const { buscarDadoServices, buscarDadosServices } = require('../services/services');

async function buscarDadoController(req, res) {
    const { imdbID } = req.body;
    const resposta = await buscarDadoServices(imdbID);
    res.send(resposta);
}

async function buscarDadosController(req, res) {
    const { title, year, type, plot } = req.body;
    const resposta = await buscarDadosServices(title, year, type, plot);
    res.send(resposta); // Envia o JSON de resposta para o front
}

module.exports = { buscarDadoController, buscarDadosController };
