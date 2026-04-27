const mongoose = require('mongoose');

const ruaSchema = new mongoose.Schema({
    rua: {
        type: String,
        required: true,
        trim: true,
        maxlength: 45
    },

    coordenada: {
        type: String,
        trim: true,
        maxlength: 45,
        default: null
    },

    freguesia: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Freguesia',
        required: true
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Rua', ruaSchema);