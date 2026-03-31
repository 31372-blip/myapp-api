module.exports = (freguesia) => {
    if (!freguesia) return null;
    
    return {
        id: freguesia._id,
        freguesia: freguesia.freguesia,
        created_at: freguesia.createdAt,
        updated_at: freguesia.updatedAt
    };
};
