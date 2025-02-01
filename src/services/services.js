const { buscarDado } = require('../persistence/omdb.api')

const buscarDadoServices = (title, year, typeContent, plot) => {
    const contentJson = buscarDado(title, year, typeContent, plot) // um JSON, recebido da busca feita no omdb.api.js
    return contentJson // aqui já é o objeto javacript
}

module.exports = { buscarDadoServices }