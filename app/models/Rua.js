const mongoose = require('mongoose');

const ruaSchema = new mongoose.Schema({
    rua: {
        type: String,
        required: true,
        trim: true
    },

    coordenada: {
        type: String,
        required: false
    },

    freguesia: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Freguesia',
        required: false
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Rua', ruaSchema);
