const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // 1. Ir buscar o token ao Header da requisição
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    // O formato costuma ser "Bearer <token>"
    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
        return res.status(401).json({ error: 'Erro no formato do token' });
    }

    const [scheme, token] = parts;

    // 2. Verificar se o token é válido
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Token inválido ou expirado' });

        // 3. Guardar o ID do utilizador para usar nas próximas funções
        req.userId = decoded.id;
        req.userIsAdmin = decoded.isAdmin;
        
        return next(); // Pode seguir para a rota!
    });
};