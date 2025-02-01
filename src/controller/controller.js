const { buscarDadoServices } = require('../services/services');

async function buscarDadoController(req, res) {
    const {title, year, type, plot} = req.body;
    const resposta = await buscarDadoServices(title, year, type, plot)
    //recebe um JSON
    //envia JSON para o front
    console.log(resposta);
    res.send(resposta)
}

module.exports = { buscarDadoController }
