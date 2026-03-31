const Processo = require('../models/Processo');

module.exports = async (req, res, next) => {
    try {
        const processo = await Processo.findById(req.params.id)
            .populate('user')
            .populate('rua')
            .populate('tipoPublicidade');

        if (!processo) {
            return res.status(404).json({ error: 'Processo não encontrado' });
        }

        req.processo = processo;
        next();
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao carregar processo' });
    }
};
