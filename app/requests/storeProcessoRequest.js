const { body, validationResult } = require('express-validator');
const Rua = require('../models/Rua');
const TipoPublicidade = require('../models/TipoPublicidade');

exports.storeProcessoRules = [
    body('processo')
        .trim()
        .notEmpty().withMessage('Número do processo é obrigatório')
        .isString().withMessage('Número do processo deve ser texto')
        .isLength({ max: 45 }).withMessage('Número do processo máximo 45 caracteres'),

    body('alvara')
        .trim()
        .notEmpty().withMessage('Alvará é obrigatório')
        .isString().withMessage('Alvará deve ser texto')
        .isLength({ max: 45 }).withMessage('Alvará máximo 45 caracteres'),

    body('alojamentoLocal')
        .trim()
        .notEmpty().withMessage('Alojamento Local é obrigatório')
        .isString().withMessage('Alojamento Local deve ser texto')
        .isLength({ max: 10 }).withMessage('Alojamento Local máximo 10 caracteres'),

    body('validade')
        .notEmpty().withMessage('Validade é obrigatória')
        .isIn(['valido', 'invalido']).withMessage('Validade deve ser "valido" ou "invalido"'),

    body('rua')
        .notEmpty().withMessage('Rua é obrigatória')
        .isMongoId().withMessage('ID de rua inválido')
        .bail()
        .custom(async (value) => {
            const rua = await Rua.findById(value);

            if (!rua) {
                throw new Error('Rua não existe');
            }
        }),

    body('tipoPublicidade')
        .notEmpty().withMessage('Tipo de publicidade é obrigatório')
        .isMongoId().withMessage('ID de tipo de publicidade inválido')
        .bail()
        .custom(async (value) => {
            const tipo = await TipoPublicidade.findById(value);

            if (!tipo) {
                throw new Error('Tipo de publicidade não existe');
            }
        })
];

exports.validateStoreProcesso = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    return next();
};