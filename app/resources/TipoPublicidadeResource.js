const processoResource = require('./ProcessoResource');

const tipoPublicidadeResource = (tipoPublicidade) => {
    // Verificação de segurança caso o objeto venha vazio
    if (!tipoPublicidade) return null;

    return {
        id: tipoPublicidade._id,
        publicidade: tipoPublicidade.publicidade,
        // Verificamos se processos existe e é um array antes de fazer o .map
        processos: (Array.isArray(tipoPublicidade.processos) && tipoPublicidade.processos.length > 0)
            ? tipoPublicidade.processos.map(p => processoResource(p))
            : [],
        created_at: tipoPublicidade.createdAt,
        updated_at: tipoPublicidade.updatedAt
    };
};

module.exports = tipoPublicidadeResource;