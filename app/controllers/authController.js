const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

exports.register = async (req, res) => {
    try {
        const { name, email, password, nif } = req.body;

        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(409).json({ error: 'Email já registado' });
        }

        const nifExists = await User.findOne({ nif });
        if (nifExists) {
            return res.status(409).json({ error: 'NIF já registado' });
        }

        const user = await User.create({ name, email, password, nif });

        const token = generateToken(user);

        return res.status(201).json({ user, token });

    } catch (error) {
        console.error('Erro no Register:', error);
        return res.status(500).json({ error: 'Erro ao registar utilizador' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        const match = await user.comparePassword(password);
        if (!match) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        const token = generateToken(user);

        return res.status(200).json({ user, token });

    } catch (error) {
        console.error('Erro no Login:', error);
        return res.status(500).json({ error: 'Erro ao autenticar' });
    }
};

exports.logout = async (req, res) => {
    return res.status(200).json({ message: 'Logout efetuado com sucesso' });
};