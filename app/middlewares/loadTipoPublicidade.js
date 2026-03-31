const TipoPublicidade = require('../models/TipoPublicidade');

module.exports = async (req, res, next) => {
    try {
        const tipoPublicidade = await TipoPublicidade.findById(req.params.id).populate('processos');

        if (!tipoPublicidade) {
            return res.status(404).json({ error: 'Tipo de publicidade não encontrado' });
        }

        req.tipoPublicidade = tipoPublicidade;
        next();
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao carregar tipo de publicidade' });
    }
};
