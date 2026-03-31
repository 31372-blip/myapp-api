const userResource = require('./UserResource');
const ruaResource = require('./RuaResource');
const tipoPublicidadeResource = require('./TipoPublicidadeResource');

module.exports = (processo) => {
    if (!processo) return null;

    return {
        id: processo._id,
        processo: processo.processo,
        alvara: processo.alvara || null,
        alojamento_local: processo.alojamentoLocal || null, // Padronizado para underscore
        validade: processo.validade,
        
        // Verificação de segurança: só chama o resource se for um objeto (populado)
        user: (processo.user && typeof processo.user === 'object') 
            ? userResource(processo.user) 
            : processo.user,

        rua: (processo.rua && typeof processo.rua === 'object') 
            ? ruaResource(processo.rua) 
            : processo.rua,

        tipo_publicidade: (processo.tipoPublicidade && typeof processo.tipoPublicidade === 'object')
            ? tipoPublicidadeResource(processo.tipoPublicidade)
            : processo.tipoPublicidade,

        created_at: processo.createdAt,
        updated_at: processo.updatedAt
    };
};