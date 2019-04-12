const express = require('express');
const router = express.Router();


router.get('/',(req,res) =>{
    return res.send({message:"Na raiz GET usuarios"});
});

router.post('/',(req,res) =>{
    return res.send({message:"Na raiz POST usuarios"});
});

router.post('/create',(req, res)=>{
    return res.send({message:"Seu usuário foi criado"});
})


module.exports = router; 