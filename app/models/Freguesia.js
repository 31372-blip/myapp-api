const mongoose = require('mongoose');

const freguesiaSchema = new mongoose.Schema({
    freguesia: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Freguesia', freguesiaSchema);
