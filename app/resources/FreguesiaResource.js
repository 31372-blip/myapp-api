module.exports = (freguesia) => {
    if (!freguesia) {
        return {};
    }
    
    return {
        id: freguesia._id,
        freguesia: freguesia.freguesia,
        created_at: freguesia.createdAt || null,
        updated_at: freguesia.updatedAt || null
    };
};