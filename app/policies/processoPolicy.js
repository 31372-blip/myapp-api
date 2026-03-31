exports.viewAny = (user) => true;
exports.create = (user) => true;

exports.view = (user, processo) => {
    return user.id === processo.user_id || user.isAdmin;
};

exports.update = exports.view;
exports.delete = exports.view;
exports.restore = exports.view;
exports.forceDelete = exports.view;
