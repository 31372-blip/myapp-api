const Freguesia = require('../models/Freguesia');

module.exports = async (req, res, next) => {
    try {
        const freguesia = await Freguesia.findById(req.params.id);
        if (!freguesia) {
            return res.status(404).json({ error: 'Freguesia não encontrada' });
        }

        req.freguesia = freguesia;
        next();
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao carregar freguesia' });
    }
};
