exports.viewAny = () => true;
exports.create = () => true;

exports.view = (user, processo) => {
    return user && processo && (
        user.isAdmin === true ||
        user._id.toString() === processo.user.toString()
    );
};

exports.update = exports.view;
exports.delete = exports.view;
exports.restore = exports.view;
exports.forceDelete = exports.view;