const Rua = require('../models/Rua');
const ruaResource = require('../resources/RuaResource');

exports.index = async (req, res) => {
    try {
        const ruas = await Rua.find().populate('freguesia');

        return res.status(200).json(ruas.map(ruaResource));
    } catch (error) {
        console.error('Erro no Index de Ruas:', error);
        return res.status(500).json({ error: 'Erro ao listar ruas' });
    }
};

exports.show = async (req, res) => {
    try {
        return res.status(200).json(ruaResource(req.rua));
    } catch (error) {
        console.error('Erro no Show de Rua:', error);
        return res.status(500).json({ error: 'Erro ao mostrar rua' });
    }
};

exports.store = async (req, res) => {
    try {
        const rua = await Rua.create(req.body);

        const ruaComFreguesia = await Rua.findById(rua._id).populate('freguesia');

        return res.status(201).json(ruaResource(ruaComFreguesia));
    } catch (error) {
        console.error('Erro no Store de Rua:', error);
        return res.status(500).json({ error: 'Erro ao criar rua' });
    }
};

exports.update = async (req, res) => {
    try {
        const updatedRua = await Rua.findByIdAndUpdate(
            req.rua._id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        ).populate('freguesia');

        return res.status(200).json(ruaResource(updatedRua));
    } catch (error) {
        console.error('Erro no Update de Rua:', error);
        return res.status(500).json({ error: 'Erro ao atualizar rua' });
    }
};

exports.destroy = async (req, res) => {
    try {
        await Rua.findByIdAndDelete(req.rua._id);

        return res.status(200).json({ message: 'Rua removida com sucesso' });
    } catch (error) {
        console.error('Erro no Destroy de Rua:', error);
        return res.status(500).json({ error: 'Erro ao remover rua' });
    }
};