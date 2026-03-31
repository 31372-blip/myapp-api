const { body, validationResult } = require('express-validator');

exports.updateProcessoRules = [
    body('processo').optional().isString().isLength({ max: 45 }),
    body('alvara').optional().isString().isLength({ max: 45 }),
    body('alojamentoLocal').optional().isString().isLength({ max: 10 }),
    body('validade').optional().isIn(['valido', 'invalido']),
];

exports.validateUpdateProcesso = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json({ errors: errors.array() });
    next();
};
