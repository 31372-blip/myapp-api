const Rua = require('../models/Rua');

module.exports = async (req, res, next) => {
    try {
        const rua = await Rua.findById(req.params.id).populate('freguesia');

        if (!rua) {
            return res.status(404).json({ error: 'Rua não encontrada' });
        }

        req.rua = rua;
        next();
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao carregar rua' });
    }
};
