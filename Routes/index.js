const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');


router.get('/',auth,(req,res) =>{
    return res.send({message:"Na raiz GET"});
});

router.post('/',(req,res) =>{
    return res.send({message:"Na raiz POST"});
});

module.exports = router; 