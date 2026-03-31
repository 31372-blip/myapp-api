const freguesiaResource = require('./FreguesiaResource');

module.exports = (rua) => {
    if (!rua) return null;

    return {
        id: rua._id,
        rua: rua.rua,
        coordenada: rua.coordenada || null,
        freguesia: (rua.freguesia && typeof rua.freguesia === 'object') 
            ? freguesiaResource(rua.freguesia) 
            : rua.freguesia,
        created_at: rua.createdAt,
        updated_at: rua.updatedAt
    };
};