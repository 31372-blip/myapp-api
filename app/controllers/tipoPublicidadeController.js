const TipoPublicidade = require('../models/TipoPublicidade');
const tipoPublicidadeResource = require('../resources/TipoPublicidadeResource');

// LISTAR TIPOS DE PUBLICIDADE
exports.index = async (req, res) => {
    try {
        const tipos = await TipoPublicidade.find().populate('processos');
        return res.json(tipos.map(tipoPublicidadeResource));
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao listar tipos de publicidade' });
    }
};

// MOSTRAR UM TIPO DE PUBLICIDADE
exports.show = async (req, res) => {
    try {
        // O loadTipoPublicidade (na rota) já garante que req.tipoPublicidade existe
        const tipo = await TipoPublicidade.findById(req.tipoPublicidade._id).populate('processos');
        
        if (!tipo) return res.status(404).json({ error: 'Tipo de publicidade não encontrado' });

        return res.json(tipoPublicidadeResource(tipo));
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao mostrar tipo de publicidade' });
    }
};

// CRIAR TIPO DE PUBLICIDADE
exports.store = async (req, res) => {
    try {
        const tipoPublicidade = await TipoPublicidade.create(req.body);

        // Populate opcional (normalmente um novo tipo nasce sem processos associados)
        const tipoComProcessos = await TipoPublicidade.findById(tipoPublicidade._id).populate('processos');

        return res.status(201).json(tipoPublicidadeResource(tipoComProcessos));
    } catch (error) {
        console.error("Erro no Store:", error); 
        return res.status(500).json({ 
            error: 'Erro ao criar tipo de publicidade',
            details: error.message 
        });
    }
};

// ATUALIZAR TIPO DE PUBLICIDADE
exports.update = async (req, res) => {
    try {
        const updatedTipo = await TipoPublicidade.findByIdAndUpdate(
            req.tipoPublicidade._id,
            req.body,
            { new: true }
        ).populate('processos');

        if (!updatedTipo) return res.status(404).json({ error: 'Tipo de publicidade não encontrado' });

        return res.status(200).json(tipoPublicidadeResource(updatedTipo));
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao atualizar tipo de publicidade' });
    }
};

// REMOVER TIPO DE PUBLICIDADE
exports.destroy = async (req, res) => {
    try {
        const tipo = await TipoPublicidade.findByIdAndDelete(req.tipoPublicidade._id);
        
        if (!tipo) return res.status(404).json({ error: 'Tipo de publicidade não encontrado' });

        return res.status(200).json({ message: 'Tipo de publicidade removido' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao remover tipo de publicidade' });
    }
};