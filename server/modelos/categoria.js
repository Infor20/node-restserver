const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let categoriasSchema = new Schema({
    categoria: {
        type: String,
        required: [true, 'El descripcion de la categoria es obligatorio']
    },
    usuario_crea: {
        type: String,
        required: [true, 'El usuario es obligatorio']
    }
});

categoriasSchema.plugin(uniqueValidator, {
    messege: '{PATH} dede de ser unico'
});

module.exports = mongoose.model('Categoria', categoriasSchema);