// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Token não fornecido' });
        }

        const token = authHeader.split(' ')[1];

        // Verifica e decodifica o token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Busca o utilizador no MongoDB
        const user = await User.findById(decoded.id);
        if (!user) return res.status(401).json({ error: 'Utilizador não encontrado' });

        // Popula req.user
        req.user = {
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            nif: user.nif
        };

        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido ou expirado' });
    }
};
