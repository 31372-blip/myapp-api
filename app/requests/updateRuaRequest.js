const { body, validationResult } = require('express-validator');
const Rua = require('../models/Rua');

exports.updateRuaRules = [
    body('rua')
        .optional()
        .notEmpty().withMessage('Rua é obrigatória')
        .isString().withMessage('Rua deve ser texto')
        .isLength({ max: 45 }).withMessage('Rua máximo 45 caracteres'),

    body('coordenada')
        .optional()
        .notEmpty().withMessage('Coordenada é obrigatória')
        .isString().withMessage('Coordenada deve ser texto')
        .isLength({ max: 45 }).withMessage('Coordenada máximo 45 caracteres'),

    body('freguesias_id')
        .optional()
        .notEmpty().withMessage('Freguesia é obrigatória')
        .isInt().withMessage('Freguesia inválida')
];

exports.validateUpdateRua = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    next();
};
    