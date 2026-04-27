const Freguesia = require('../models/Freguesia');
const freguesiaPolicy = require('../policies/freguesiaPolicy');
const freguesiaResource = require('../resources/FreguesiaResource');

exports.index = async (req, res) => {
    try {
        if (!freguesiaPolicy.viewAny(req.user)) {
            return res.status(403).json({ error: 'Não autorizado' });
        }

        const freguesias = await Freguesia.find();

        return res.status(200).json(freguesias.map(freguesiaResource));
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao buscar freguesias' });
    }
};

exports.show = async (req, res) => {
    try {
        if (!freguesiaPolicy.view(req.user, req.freguesia)) {
            return res.status(403).json({ error: 'Não autorizado' });
        }

        return res.status(200).json(freguesiaResource(req.freguesia));
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao buscar freguesia' });
    }
};

exports.store = async (req, res) => {
    try {
        if (!freguesiaPolicy.create(req.user)) {
            return res.status(403).json({ error: 'Não autorizado' });
        }

        const freguesia = await Freguesia.create(req.body);

        return res.status(201).json(freguesiaResource(freguesia));
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao criar freguesia' });
    }
};

exports.update = async (req, res) => {
    try {
        if (!freguesiaPolicy.update(req.user, req.freguesia)) {
            return res.status(403).json({ error: 'Não autorizado' });
        }

        const updated = await Freguesia.findByIdAndUpdate(
            req.freguesia._id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        return res.status(200).json(freguesiaResource(updated));
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao atualizar freguesia' });
    }
};

exports.destroy = async (req, res) => {
    try {
        if (!freguesiaPolicy.delete(req.user, req.freguesia)) {
            return res.status(403).json({ error: 'Não autorizado' });
        }

        await Freguesia.findByIdAndDelete(req.freguesia._id);

        return res.status(200).json({ message: 'Freguesia removida com sucesso' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao remover freguesia' });
    }
};