const { body, validationResult } = require('express-validator');

exports.updateTipoPublicidadeRules = [
    body('publicidade')
        .optional()
        .notEmpty().withMessage('Publicidade é obrigatória')
        .isString().withMessage('Publicidade deve ser texto')
        .isLength({ max: 45 }).withMessage('Máximo 45 caracteres')
];

exports.validateUpdateTipoPublicidade = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    next();
};