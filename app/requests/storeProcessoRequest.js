const { body, validationResult } = require('express-validator');
const Rua = require('../models/Rua');
const TipoPublicidade = require('../models/TipoPublicidade');

exports.storeProcessoRules = [
    body('processo')
        .notEmpty().withMessage('Número do processo é obrigatório')
        .isString().isLength({ max: 45 }),
        
    body('alvara')
        .notEmpty().withMessage('Alvará é obrigatório')
        .isString().isLength({ max: 45 }),
        
    body('alojamentoLocal')
        .notEmpty().withMessage('Alojamento Local é obrigatório')
        .isString().isLength({ max: 10 }),
        
    body('validade')
        .notEmpty().withMessage('Validade é obrigatória')
        .isIn(['valido', 'invalido']).withMessage('Validade deve ser "valido" ou "invalido"'),

    // ALTERADO: de 'rua_id' para 'rua'
    body('rua')
        .notEmpty().withMessage('Rua é obrigatória')
        .isMongoId().withMessage('ID de rua inválido')
        .custom(async (value) => {
            const rua = await Rua.findById(value);
            if (!rua) throw new Error('Rua não existe');
        }),

    // ALTERADO: de 'tipo_publicidade_id' para 'tipoPublicidade'
    body('tipoPublicidade')
        .notEmpty().withMessage('Tipo de publicidade é obrigatório')
        .isMongoId().withMessage('ID de tipo de publicidade inválido')
        .custom(async (value) => {
            const tipo = await TipoPublicidade.findById(value);
            if (!tipo) throw new Error('Tipo de publicidade não existe');
        })
];

exports.validateStoreProcesso = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
};
