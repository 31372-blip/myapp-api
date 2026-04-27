const mongoose = require('mongoose');
const TipoPublicidade = require('../models/TipoPublicidade');

module.exports = async (req, res, next) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ error: 'ID de tipo de publicidade inválido' });
        }

        const tipoPublicidade = await TipoPublicidade.findById(req.params.id).populate('processos');

        if (!tipoPublicidade) {
            return res.status(404).json({ error: 'Tipo de publicidade não encontrado' });
        }

        req.tipoPublicidade = tipoPublicidade;
        return next();
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao carregar tipo de publicidade' });
    }
};