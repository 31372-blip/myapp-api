const { body, validationResult } = require('express-validator');

exports.updateProcessoRules = [
    body('processo')
        .optional()
        .trim()
        .notEmpty().withMessage('Processo é obrigatório')
        .isString().withMessage('Processo deve ser texto')
        .isLength({ max: 45 }).withMessage('Máximo 45 caracteres'),

    body('alvara')
        .optional()
        .trim()
        .notEmpty().withMessage('Alvará é obrigatório')
        .isString().withMessage('Alvará deve ser texto')
        .isLength({ max: 45 }).withMessage('Máximo 45 caracteres'),

    body('alojamentoLocal')
        .optional()
        .trim()
        .notEmpty().withMessage('Alojamento Local é obrigatório')
        .isString().withMessage('Alojamento Local deve ser texto')
        .isLength({ max: 10 }).withMessage('Máximo 10 caracteres'),

    body('validade')
        .optional()
        .notEmpty().withMessage('Validade é obrigatória')
        .isIn(['valido', 'invalido']).withMessage('Valor inválido')
];

exports.validateUpdateProcesso = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    return next();
};