const axios = require('axios');
let response

async function buscarDado(title, year, typeContent, plot) { // retorna o primeiro melhor resultado
    try {
        const url = `http://www.omdbapi.com/?t=${title}&y=${year}&type=${typeContent}&plot=${plot}&apikey=2893807f`;
        response = await axios.get(url)
        
        return response.data
    } catch(error) {
        response = error
        console.error(response)

        return response
    }
}

module.exports = { buscarDado };