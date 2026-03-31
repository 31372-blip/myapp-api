const Processo = require('../models/Processo');
const processoResource = require('../resources/ProcessoResource');
const mongoose = require('mongoose');

// LISTAR PROCESSOS (Com paginação e relações completas)
exports.index = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;

        const total = await Processo.countDocuments();

        const processos = await Processo.find()
            .populate('user') // Traz o Fiscal
            .populate({
                path: 'rua',
                populate: { path: 'freguesia' } // Traz a Freguesia que está dentro da Rua
            })
            .populate('tipoPublicidade')
            .limit(limit)
            .skip(skip)
            .sort({ createdAt: -1 }); // Mais recentes primeiro

        return res.json({
            data: processos.map(processoResource),
            meta: {
                total,
                per_page: limit,
                current_page: page,
                last_page: Math.ceil(total / limit)
            }
        });

    } catch (error) {
        console.error("Erro no Index de Processos:", error);
        return res.status(500).json({ error: 'Erro ao listar processos' });
    }
};

// CRIAR PROCESSO
exports.store = async (req, res) => {
    try {
        // Criamos o processo associando o utilizador autenticado (req.user)
        const processo = await Processo.create({
            ...req.body,
            user: req.user.id
        });

        // Procuramos novamente para carregar todas as relações para o Resource
        const processoComRelacoes = await Processo.findById(processo._id)
            .populate('user')
            .populate({
                path: 'rua',
                populate: { path: 'freguesia' }
            })
            .populate('tipoPublicidade');

        return res.status(201).json(processoResource(processoComRelacoes));

    } catch (error) {
        console.error("Erro no Store de Processo:", error);
        return res.status(500).json({ 
            error: 'Erro ao criar processo',
            details: error.message 
        });
    }
};

// MOSTRAR UM PROCESSO
exports.show = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'ID inválido' });
        }

        const processo = await Processo.findById(req.params.id)
            .populate('user')
            .populate({
                path: 'rua',
                populate: { path: 'freguesia' }
            })
            .populate('tipoPublicidade');

        if (!processo) {
            return res.status(404).json({ error: 'Processo não encontrado' });
        }

        return res.json(processoResource(processo));

    } catch (error) {
        console.error("Erro no Show de Processo:", error);
        return res.status(500).json({ error: 'Erro ao procurar processo' });
    }
};

// ATUALIZAR PROCESSO
exports.update = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'ID inválido' });
        }

        const processo = await Processo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        .populate('user')
        .populate({
            path: 'rua',
            populate: { path: 'freguesia' }
        })
        .populate('tipoPublicidade');

        if (!processo) {
            return res.status(404).json({ error: 'Processo não encontrado' });
        }

        return res.status(200).json(processoResource(processo));

    } catch (error) {
        console.error("Erro no Update de Processo:", error);
        return res.status(500).json({ error: 'Erro ao atualizar processo' });
    }
};

// APAGAR PROCESSO
exports.destroy = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'ID inválido' });
        }

        const processo = await Processo.findByIdAndDelete(req.params.id);

        if (!processo) {
            return res.status(404).json({ error: 'Processo não encontrado' });
        }

        return res.status(200).json({ message: 'Processo removido com sucesso' });

    } catch (error) {
        console.error("Erro no Destroy de Processo:", error);
        return res.status(500).json({ error: 'Erro ao remover processo' });
    }
};