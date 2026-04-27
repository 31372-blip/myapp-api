const { body, validationResult } = require('express-validator');
const Freguesia = require('../models/Freguesia');

exports.storeRuaRules = [
    body('rua')
        .trim()
        .notEmpty().withMessage('Rua é obrigatória')
        .isString().withMessage('Rua deve ser texto')
        .isLength({ max: 45 }).withMessage('Rua máximo 45 caracteres'),

    body('coordenada')
        .trim()
        .notEmpty().withMessage('Coordenada é obrigatória')
        .isString().withMessage('Coordenada deve ser texto')
        .isLength({ max: 45 }).withMessage('Coordenada máximo 45 caracteres'),

    body('freguesia')
        .notEmpty().withMessage('Freguesia é obrigatória')
        .isMongoId().withMessage('ID de freguesia inválido')
        .bail()
        .custom(async (value) => {
            const freguesia = await Freguesia.findById(value);
            if (!freguesia) {
                throw new Error('Freguesia inválida ou não existe');
            }
        })
];

exports.validateStoreRua = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    return next();
};