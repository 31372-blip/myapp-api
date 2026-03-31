const { body, validationResult } = require('express-validator');

exports.storeUserRules = [
    body('name').notEmpty().withMessage('Nome é obrigatório').isString(),
    body('email').notEmpty().withMessage('Email é obrigatório').isEmail().withMessage('Email inválido'),
    body('password').notEmpty().withMessage('Password é obrigatória').isLength({ min: 6 }).withMessage('Password deve ter pelo menos 6 caracteres'),
    body('nif').notEmpty().withMessage('NIF é obrigatório').isLength({ min: 9, max: 9 }).withMessage('NIF deve ter 9 dígitos')
];

exports.validateStoreUser = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    next();
};
