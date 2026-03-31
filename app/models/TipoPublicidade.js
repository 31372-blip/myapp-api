const mongoose = require('mongoose');

const tipoPublicidadeSchema = new mongoose.Schema({
    publicidade: {
        type: String,
        required: true,
        trim: true
    },
    processos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Processo' }]
}, {
    timestamps: true
});

module.exports = mongoose.model('TipoPublicidade', tipoPublicidadeSchema);