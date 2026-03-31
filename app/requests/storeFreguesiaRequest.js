const { body, validationResult } = require('express-validator');

exports.storeFreguesiaRules = [
    body('freguesia')
        .notEmpty().withMessage('Freguesia é obrigatória')
        .isString().withMessage('Freguesia deve ser texto')
        .isLength({ max: 255 }).withMessage('Máximo 255 caracteres')
];

exports.validateStoreFreguesia = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    next();
};
