const mongoose = require('mongoose');

const processoSchema = new mongoose.Schema({
    processo: {
        type: String,
        required: true,
        trim: true,
        maxlength: 45
    },

    alvara: {
        type: String,
        trim: true,
        maxlength: 45,
        default: null
    },

    alojamentoLocal: {
        type: String,
        trim: true,
        maxlength: 10,
        default: null
    },

    validade: {
        type: String,
        enum: ['valido', 'invalido'],
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    rua: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rua',
        required: true
    },

    tipoPublicidade: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TipoPublicidade',
        required: true
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Processo', processoSchema);