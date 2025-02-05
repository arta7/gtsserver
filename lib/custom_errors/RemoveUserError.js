class RemoveUserError extends Error {
    constructor(code, message) {
        super('امکان حذف کاربر مورد نظر میسر نیست!');
        if (code) this.originCode = 1012;
        if (message) this.originMessage = message;
    };
};

module.exports = RemoveUserError;