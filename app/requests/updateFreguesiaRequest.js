const { body, validationResult } = require('express-validator');

exports.updateFreguesiaRules = [
    body('freguesia')
        .optional()
        .notEmpty().withMessage('Freguesia não pode estar vazia')
        .isString().withMessage('Freguesia deve ser texto')
        .isLength({ max: 255 }).withMessage('Máximo 255 caracteres')
];

exports.validateUpdateFreguesia = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    next();
};
