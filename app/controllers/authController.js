const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { name, email, password, nif } = req.body;

        // 1. Verificar se email já existe
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(409).json({ error: 'Email já registado' });
        }

        // 2. Verificar se NIF já existe
        if (nif) {
            const nifExists = await User.findOne({ nif });
            if (nifExists) {
                return res.status(409).json({ error: 'NIF já registado' });
            }
        }

        // 3. Criar utilizador
        // Se o erro for aqui, o console.log(error) no catch vai dizer-nos porquê
        const user = await User.create({ name, email, password, nif });

        // 4. Verificar se o JWT_SECRET existe antes de assinar
        if (!process.env.JWT_SECRET) {
            throw new Error("Falta definir JWT_SECRET no ficheiro .env");
        }

        // 5. Criar token JWT
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({ user, token });

    } catch (error) {
        // ISTO É O MAIS IMPORTANTE: vê o que aparece no terminal agora
        console.error("DETALHE DO ERRO:", error);
        
        // Retornamos a mensagem real para o Insomnia para saberes o que falhou
        res.status(500).json({ 
            error: 'Erro ao registar utilizador',
            message: error.message 
        });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Procurar utilizador
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        // Verificar password
        const match = await user.comparePassword(password);
        if (!match) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        // Criar token
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ user, token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao autenticar' });
    }
};


// Logout (JWT é stateless)
exports.logout = async (req, res) => {
    res.json({ message: 'Logout efetuado com sucesso' });
};
