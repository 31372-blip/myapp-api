const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true
    },

    nif: {
        type: String,
        required: true,
        unique: true
    },

    isAdmin: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
});

// 🔐 Hash automático antes de guardar
userSchema.pre('save', async function() {
    // 1. Verifica se a password foi modificada
    if (!this.isModified('password')) return;

    try {
        // 2. Encripta (Garante que estás a usar bcryptjs como falamos)
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        
        // Com async/await, NÃO chamamos o next(). 
        // O simples fim da função indica ao Mongoose que pode continuar.
    } catch (error) {
        // Se houver erro, lançamos o erro para ser apanhado pelo catch do Controller
        throw error;
    }
});


// 🔒 Método para comparar password (login)
userSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare(password, this.password);
};


// ❌ Remove password quando fizer res.json()
userSchema.methods.toJSON = function() {
    const user = this.toObject();
    delete user.password;
    return user;
};

module.exports = mongoose.model('User', userSchema);
