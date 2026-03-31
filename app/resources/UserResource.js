module.exports = (user) => {
    if (!user) return null;

    return {
        id: user._id,
        name: user.name,
        email: user.email,
        created_at: user.createdAt,
        updated_at: user.updatedAt
    };
};
