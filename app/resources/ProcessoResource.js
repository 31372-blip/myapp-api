const userResource = require('./UserResource');
const ruaResource = require('./RuaResource');
const tipoPublicidadeResource = require('./TipoPublicidadeResource');

module.exports = (processo) => {
    if (!processo) {
        return {};
    }

    return {
        id: processo._id,
        processo: processo.processo,
        alvara: processo.alvara || null,
        alojamento_local: processo.alojamentoLocal || null,
        validade: processo.validade,

        user: (processo.user && typeof processo.user === 'object')
            ? userResource(processo.user)
            : processo.user,

        rua: (processo.rua && typeof processo.rua === 'object')
            ? ruaResource(processo.rua)
            : processo.rua,

        tipo_publicidade: (processo.tipoPublicidade && typeof processo.tipoPublicidade === 'object')
            ? tipoPublicidadeResource(processo.tipoPublicidade)
            : processo.tipoPublicidade,

        created_at: processo.createdAt || null,
        updated_at: processo.updatedAt || null
    };
};