const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const auth = require('./middlewares/auth');
const config = require('./config/config');

//String de conexão
const url = config.bd_string;

// const options = {  recconectTries: Number.MAX_VALUE, recconectInterval: 500, poolSize:5, useNewUrlParser:true };
const options = {   poolSize:5, useNewUrlParser:true };

mongoose.connect(url , options);

mongoose.set('useCreateIndex',true);

mongoose.connection.on('error',(err)=>{
    console.log('Erro de conexão'+err);
});

mongoose.connection.on('disconnect',(err)=>{
    console.log('Disconectado '+err);
});

mongoose.connection.on('connected',()=>{
    console.log('Aplicação conectada ');
});

//BODY PARSER
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const indexRoute = require('./Routes');
const usersRoute = require('./Routes/users');

app.use('/',indexRoute);

app.use('/users',usersRoute);



app.listen(3000);

module.exports = app; 