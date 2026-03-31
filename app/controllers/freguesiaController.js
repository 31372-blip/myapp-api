const Freguesia = require("../models/Freguesia");
const freguesiaPolicy = require("../policies/freguesiaPolicy");
const freguesiaResource = require("../resources/FreguesiaResource");

// LISTAR
exports.index = async (req, res) => {
    try {
        if (!freguesiaPolicy.viewAny(req.user)) {
            return res.status(403).json({ message: "Não autorizado" });
        }

        const freguesias = await Freguesia.find();
        return res.json(freguesias.map(freguesiaResource));

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao buscar freguesias" });
    }
};

// MOSTRAR
exports.show = async (req, res) => {
    try {
        // Se usares o loadFreguesia nas rotas, podes usar req.freguesia._id
        const freguesia = await Freguesia.findById(req.params.id);

        if (!freguesia) {
            return res.status(404).json({ message: "Freguesia não encontrada" });
        }

        if (!freguesiaPolicy.view(req.user, freguesia)) {
            return res.status(403).json({ message: "Não autorizado" });
        }

        return res.json(freguesiaResource(freguesia));

    } catch (error) {
        return res.status(500).json({ message: "Erro ao buscar freguesia" });
    }
};

// CRIAR
exports.store = async (req, res) => {
    try {
        if (!freguesiaPolicy.create(req.user)) {
            return res.status(403).json({ message: "Não autorizado" });
        }

        const freguesia = await Freguesia.create(req.body);
        return res.status(201).json(freguesiaResource(freguesia));

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao criar freguesia", details: error.message });
    }
};

// ATUALIZAR
exports.update = async (req, res) => {
    try {
        const freguesia = await Freguesia.findById(req.params.id);

        if (!freguesia) return res.status(404).json({ message: "Freguesia não encontrada" });

        if (!freguesiaPolicy.update(req.user, freguesia)) {
            return res.status(403).json({ message: "Não autorizado" });
        }

        const updated = await Freguesia.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).json(freguesiaResource(updated));

    } catch (error) {
        return res.status(500).json({ message: "Erro ao atualizar freguesia" });
    }
};

// REMOVER
exports.destroy = async (req, res) => {
    try {
        const freguesia = await Freguesia.findById(req.params.id);

        if (!freguesia) return res.status(404).json({ message: "Freguesia não encontrada" });

        if (!freguesiaPolicy.delete(req.user, freguesia)) {
            return res.status(403).json({ message: "Não autorizado" });
        }

        await Freguesia.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "Freguesia removida" });

    } catch (error) {
        return res.status(500).json({ message: "Erro ao remover freguesia" });
    }
};