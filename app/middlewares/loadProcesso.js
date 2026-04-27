const mongoose = require('mongoose');
const Processo = require('../models/Processo');

module.exports = async (req, res, next) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ error: 'ID de processo inválido' });
        }

        const processo = await Processo.findById(req.params.id)
            .populate('user')
            .populate('rua')
            .populate('tipoPublicidade');

        if (!processo) {
            return res.status(404).json({ error: 'Processo não encontrado' });
        }

        req.processo = processo;
        return next();
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao carregar processo' });
    }
};