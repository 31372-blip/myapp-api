const { body, validationResult } = require('express-validator');

exports.updateRuaRules = [
    body('rua')
        .optional()
        .trim()
        .notEmpty().withMessage('Rua é obrigatória')
        .isString().withMessage('Rua deve ser texto')
        .isLength({ max: 45 }).withMessage('Rua máximo 45 caracteres'),

    body('coordenada')
        .optional()
        .trim()
        .notEmpty().withMessage('Coordenada é obrigatória')
        .isString().withMessage('Coordenada deve ser texto')
        .isLength({ max: 45 }).withMessage('Coordenada máximo 45 caracteres'),

    body('freguesias_id')
        .optional()
        .notEmpty().withMessage('Freguesia é obrigatória')
        .isMongoId().withMessage('Freguesia inválida')
];

exports.validateUpdateRua = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    return next();
};