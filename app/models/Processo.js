const mongoose = require('mongoose');

const processoSchema = new mongoose.Schema({
    processo: {
        type: String,
        required: true,
        trim: true
    },

    alvara: {
        type: String,
        required: false
    },

    alojamentoLocal: {
        type: String,
        required: false
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
        required: false
    },

    tipoPublicidade: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TipoPublicidade',
        required: false
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Processo', processoSchema);
