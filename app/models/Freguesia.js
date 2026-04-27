const mongoose = require('mongoose');

const freguesiaSchema = new mongoose.Schema({
    freguesia: {
        type: String,
        required: true,
        trim: true,
        maxlength: 255
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Freguesia', freguesiaSchema);