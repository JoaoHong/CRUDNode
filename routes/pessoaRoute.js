const router = require("express").Router();

const { route } = require("express/lib/application");
const Pessoa = require('../models/Pessoa')

//CREATE - Pessoa
router.post('/', async (req, res) => {

    const {nome, salario, aprovado, ativo} = req.body

    if(!nome){
        res.status(422).json({error: 'O nome é obrigatorio'})
    }
    if(!salario){
        res.status(422).json({error: 'O salario é obrigatorio'})
    }


    const pessoa = {
        nome,
        salario,
        aprovado,
        ativo
    }

    //create

    try{
        
        await Pessoa.create(pessoa)

        res.status(201).json({message: 'Pessoa inserida com sucesso!'})
        return
    }
    catch(err){
        res.status(500).json({error: err})
    }

})


//READ - Listar todas Pessoas

router.get('/', async(req, res) => {

    try{

        const pessoas = await Pessoa.find()

        res.status(200).json(pessoas);
        return
    }
    catch(error){
        res.status(500).json({error: err})
    }
})

//READ - Listar apenas por Id

router.get('/:id', async(req, res) => {

    const id = req.params.id;


    try{
        const pessoa = await Pessoa.findOne({_id: id})

        if(!pessoa){
            res.status(422).json({message: "Pessoa não encontrada"})
            return
        }

        res.status(200).json(pessoa)
    }
    catch(error){
        res.status(500).json({error: error})
    }
})


//UPDATE - atualizacao de dados(PUT, PATCH)

router.patch('/:id', async(req, res) => {

    const id = req.params.id;

    const { nome, salario, aprovado, ativo} = req.body;

    const pessoa = {
        nome,
        salario,
        aprovado,
        ativo
    }

    try{

        const updatePessoa = await Pessoa.updateOne({_id: id}, pessoa)

        console.log(updatePessoa);

        if(updatePessoa.matchedCount === 0){
            res.status(422).json({message: "Pessoa não encontrada"})
            return
        }

        res.status(200).json(pessoa)
    }
    catch(error){
        res.status(500).json({error: error})
    }
})


//DELETE - deletar dados

router.delete('/:id', async (req, res) => {

    const id = req.params.id;

    const pessoa = await Pessoa.findOne({_id: id})

    if(!pessoa){
        res.status(422).json({message: "Pessoa não encontrada"})
        return
    }

    try{

        await Pessoa.deleteOne({_id: id})

        res.status(200).json({message: "Usuario removido com sucesso"})
    }
    catch(error){
        res.status(500).json({error: error})
    }

})


module.exports = router;