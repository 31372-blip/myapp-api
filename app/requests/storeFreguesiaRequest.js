const { body, validationResult } = require('express-validator');

exports.storeFreguesiaRules = [
    body('freguesia')
        .trim()
        .notEmpty().withMessage('Freguesia é obrigatória')
        .isString().withMessage('Freguesia deve ser texto')
        .isLength({ max: 255 }).withMessage('Máximo 255 caracteres')
        .escape()
];

exports.validateStoreFreguesia = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    return next();
};