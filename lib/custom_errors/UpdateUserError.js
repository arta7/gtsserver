class UpdateUserError extends Error {
    constructor(code, message) {
        super('امکان بروز رسانی اطلاعات کاربر میسر نیست!');
        if (code) this.originCode = 1010;
        if (message) this.originMessage = message;
    };
};

module.exports = UpdateUserError;