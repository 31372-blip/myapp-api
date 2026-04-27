const { body, validationResult } = require('express-validator');

exports.storeUserRules = [
    body('name')
        .trim()
        .notEmpty().withMessage('Nome é obrigatório')
        .isString().withMessage('Nome deve ser texto')
        .isLength({ max: 100 }).withMessage('Nome máximo 100 caracteres'),

    body('email')
        .trim()
        .notEmpty().withMessage('Email é obrigatório')
        .isEmail().withMessage('Email inválido')
        .normalizeEmail(),

    body('password')
        .notEmpty().withMessage('Password é obrigatória')
        .isLength({ min: 6 }).withMessage('Password deve ter pelo menos 6 caracteres'),

    body('nif')
        .trim()
        .notEmpty().withMessage('NIF é obrigatório')
        .isLength({ min: 9, max: 9 }).withMessage('NIF deve ter 9 dígitos')
        .isNumeric().withMessage('NIF deve conter apenas números')
];

exports.validateStoreUser = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    return next();
};