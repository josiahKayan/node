const jwt = require('jsonwebtoken');
const config = require('../config/config');

const auth = (req,res,next) =>{

    const token_header = req.headers.auth;

    if(!token_header) return res.status(401).send({ error: 'Erro de Autenticação'});

    jwt.verify(token_header, config.jwt_password,(err,data)=>{
        if(err) return res.send({ error: 'Token inválido'});
        return next();
    });


}

module.exports = auth;