const express = require('express');
const router = express.Router();
const path = require('path');

// Servir arquivos estáticos da pasta 'public'
router.use(express.static('public')); //garante que o html encontre os arquivos estáticos da pasta public

router.get('/', (req, res) => {
    //Envia um arquivo como resposta, e constrói o caminho absoluto para o arquivo que será enviado.
    res.sendFile(path.join(__dirname, '..', 'html', 'index.html'));

});

router.get('/login', (req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'html', 'login.html'));

})

module.exports = router;
