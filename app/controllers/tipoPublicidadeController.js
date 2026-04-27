const TipoPublicidade = require('../models/TipoPublicidade');
const tipoPublicidadeResource = require('../resources/TipoPublicidadeResource');

// LISTAR TIPOS DE PUBLICIDADE
exports.index = async (req, res) => {
    try {
        const tipos = await TipoPublicidade.find().populate('processos');

        return res.status(200).json(tipos.map(tipoPublicidadeResource));
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao listar tipos de publicidade' });
    }
};

// MOSTRAR UM TIPO DE PUBLICIDADE
exports.show = async (req, res) => {
    try {
        return res.status(200).json(tipoPublicidadeResource(req.tipoPublicidade));
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao mostrar tipo de publicidade' });
    }
};

// CRIAR TIPO DE PUBLICIDADE
exports.store = async (req, res) => {
    try {
        const tipoPublicidade = await TipoPublicidade.create(req.body);

        return res.status(201).json(tipoPublicidadeResource(tipoPublicidade));
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao criar tipo de publicidade' });
    }
};

// ATUALIZAR TIPO DE PUBLICIDADE
exports.update = async (req, res) => {
    try {
        const updatedTipo = await TipoPublicidade.findByIdAndUpdate(
            req.tipoPublicidade._id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        ).populate('processos');

        return res.status(200).json(tipoPublicidadeResource(updatedTipo));
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao atualizar tipo de publicidade' });
    }
};

// REMOVER TIPO DE PUBLICIDADE
exports.destroy = async (req, res) => {
    try {
        await TipoPublicidade.findByIdAndDelete(req.tipoPublicidade._id);

        return res.status(200).json({ message: 'Tipo de publicidade removido com sucesso' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao remover tipo de publicidade' });
    }
};