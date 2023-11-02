// config. inicial
require("dotenv").config();
const express = require('express')
const { default: mongoose } = require('mongoose')
const app = express()



// leitura JSON / middleware
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

//rotas da API

const pessoaRoute = require('./routes/pessoaRoute')

app.use('/pessoa', pessoaRoute)


// init / endpoint
app.get('/', (req, res) => {
    // retorno da requisicao 

    res.json({message: 'Olá Mundo!'})
})


// Variaveis para connectionString
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;


// entrega de porta
mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASS}@crudnodejs.75rkia5.mongodb.net/?retryWrites=true&w=majority`
    )
.then(() =>{
    console.log("Conectado ao MongoDB!")
    app.listen(3001)
})
.catch((err) => {
    console.log(err)
})
