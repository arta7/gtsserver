class UserNotFoundError extends Error {
    constructor(code, message) {
        super('کاربر مورد نظر یافت نشد!');
        if (code) this.originCode = 1003;
        if (message) this.originMessage = message;
    };
};

module.exports = UserNotFoundError;