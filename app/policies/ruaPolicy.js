const isAdmin = (user) => {
    return user && user.isAdmin === true;
};

exports.viewAny = () => true;
exports.view = () => true;

exports.create = isAdmin;
exports.update = isAdmin;
exports.delete = isAdmin;
exports.restore = isAdmin;
exports.forceDelete = isAdmin;