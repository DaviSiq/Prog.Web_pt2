const { buscarDado, buscarDados } = require('../persistence/omdb.api')

const buscarDadoServices = async (imdbID) => {
    const contentJson = await buscarDado(imdbID);
    return contentJson;  // Aqui retornamos o objeto JavaScript recebido da busca do filme específico.
}

const buscarDadosServices = async (title, year, typeContent, plot) => {
    const contentJson = await buscarDados(title, year, typeContent, plot);
    return contentJson;  // Aqui retornamos o objeto JavaScript com os filmes similares.
}

module.exports = { buscarDadoServices, buscarDadosServices };
