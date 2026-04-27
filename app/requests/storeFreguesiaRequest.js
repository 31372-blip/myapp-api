const { body, validationResult } = require('express-validator');

exports.updateFreguesiaRules = [
    body('freguesia')
        .optional()
        .trim()
        .notEmpty().withMessage('Freguesia não pode ser vazia')
        .isString().withMessage('Freguesia deve ser texto')
        .isLength({ max: 255 }).withMessage('Máximo 255 caracteres')
        .escape()
];

exports.validateUpdateFreguesia = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    return next();
};