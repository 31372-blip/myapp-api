const mongoose = require('mongoose');
const Freguesia = require('../models/Freguesia');

module.exports = async (req, res, next) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ error: 'ID de freguesia inválido' });
        }

        const freguesia = await Freguesia.findById(req.params.id);

        if (!freguesia) {
            return res.status(404).json({ error: 'Freguesia não encontrada' });
        }

        req.freguesia = freguesia;
        return next();
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao carregar freguesia' });
    }
};