const { default: mongoose } = require("mongoose");

const Pessoa = mongoose.model('Pessoa', {
    nome: String,
    salario: Number,
    aprovado: Boolean,
    ativo: Boolean,
})

module.exports = Pessoa