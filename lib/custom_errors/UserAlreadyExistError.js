class UserAlreadyExistError extends Error {
    constructor(code, message) {
        super('نام کاربری تکراری است!');
        if (code) this.originCode = 1006;
        if (message) this.originMessage = message;
    };
};

module.exports = UserAlreadyExistError;