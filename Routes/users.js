const express = require('express');
const router = express.Router();
const Users = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');


const createUserToken = ( userId ) =>{
    return jwt.sign({ id:userId},config.jwt_password,{expiresIn: config.jwt_time});
}

router.get('/', async(req,res) =>{
    try{
        const users = await Users.find({});
        return res.status(200).send(users);
    }
    catch(err){
        return res.status(500).send({ message: "Erro ao listar usuários" });
    }
});


router.post('/create', async  (req,res) =>{
    const { email, password } = req.body;

    if( !email || !password   ) return res.send({ error:'Dados insuficientes!'  });

    try{
        if( await Users.findOne({email: email}))  return res.send({error:'Usuario já existe'});

        const user = await Users.create({email:email,password:password});

        user.password = undefined;

        return res.status(201).send({user, token:createUserToken(user.id)});

    }
    catch(err){
        return res.status(500).send({ error:'Erro ao buscar usuário!'  });
    }


});


router.post('/auth', async (req,res)=>{

    const {email, password} = req.body;

    if( !email || !password   ) return res.status(400).send({ error:'Dados insuficientes!'  });

    try {
        
        const user = await Users.findOne({email}).select('+password');

        if(  !user  ) return res.status(400).send({error:'Usuario não existe'});

        const pass_ok = await bcrypt.compare(password, user.password);

        if(!pass_ok) return res.status(401).send({error: "Erro ao autenticar o usuário"});

        user.password = undefined;

        return res.send({user,token:createUserToken(user.id)});
            
    } catch (error) {
        return res.status(500).send({ error:'Erro ao buscar usuário!'  });
    }

});

// router.post('/auth',(req,res)=>{

//     const {email, password} = req.body;

//     if( !email || !password   ) return res.send({ error:'Dados insuficientes!'  });

//     Users.findOne({email}, (err,data)=>{
        
//         if(err) return res.send({ error:'Error  ao buscar usuario'});
//         if(!data) return res.send({error:'Usuario não existe'});

//         bcrypt.compare(password, data.password, (err,same)=>{
//             if(!same) return res.send({error: "Erro ao autenticar o usuário"});

//             data.password = undefined;

//             return res.send(data);
            
//         })
        

//     }).select('+password');
// });

module.exports = router; 