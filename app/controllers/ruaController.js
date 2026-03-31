const Rua = require('../models/Rua');
const ruaResource = require('../resources/RuaResource');

/**
 * LISTAR RUAS
 * Retorna todas as ruas com os dados da freguesia associada.
 */
exports.index = async (req, res) => {
    try {
        const ruas = await Rua.find().populate('freguesia');
        return res.json(ruas.map(ruaResource));
    } catch (error) {
        console.error("Erro no Index de Ruas:", error);
        return res.status(500).json({ error: 'Erro ao listar ruas' });
    }
};

/**
 * MOSTRAR UMA RUA
 * O middleware loadRua já fornece o ID em req.rua._id.
 */
exports.show = async (req, res) => {
    try {
        const rua = await Rua.findById(req.rua._id).populate('freguesia');
        
        if (!rua) {
            return res.status(404).json({ error: 'Rua não encontrada' });
        }

        return res.json(ruaResource(rua));
    } catch (error) {
        console.error("Erro no Show de Rua:", error);
        return res.status(500).json({ error: 'Erro ao mostrar rua' });
    }
};

/**
 * CRIAR RUA
 * Cria a rua e faz o populate para devolver o objeto completo no Resource.
 */
exports.store = async (req, res) => {
    try {
        const rua = await Rua.create(req.body);
        
        // Populamos a freguesia para que o Resource mostre o nome e não apenas o ID
        const ruaComFreguesia = await Rua.findById(rua._id).populate('freguesia');

        return res.status(201).json(ruaResource(ruaComFreguesia));
    } catch (error) {
        console.error("Erro no Store de Rua:", error);
        return res.status(500).json({ 
            error: 'Erro ao criar rua', 
            details: error.message 
        });
    }
};

/**
 * ATUALIZAR RUA
 */
exports.update = async (req, res) => {
    try {
        const updatedRua = await Rua.findByIdAndUpdate(
            req.rua._id, 
            req.body, 
            { new: true }
        ).populate('freguesia');

        if (!updatedRua) {
            return res.status(404).json({ error: 'Rua não encontrada' });
        }

        return res.status(200).json(ruaResource(updatedRua));
    } catch (error) {
        console.error("Erro no Update de Rua:", error);
        return res.status(500).json({ error: 'Erro ao atualizar rua' });
    }
};

/**
 * REMOVER RUA
 */
exports.destroy = async (req, res) => {
    try {
        const rua = await Rua.findByIdAndDelete(req.rua._id);

        if (!rua) {
            return res.status(404).json({ error: 'Rua não encontrada' });
        }

        return res.status(200).json({ message: 'Rua removida com sucesso' });
    } catch (error) {
        console.error("Erro no Destroy de Rua:", error);
        return res.status(500).json({ error: 'Erro ao remover rua' });
    }
};