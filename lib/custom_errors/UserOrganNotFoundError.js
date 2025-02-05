class UserOrganNotFoundError extends Error {
    constructor(code, message) {
        super('واحد کاربر انتخابی یافت نشد!');
        if (code) this.originCode = 1012;
        if (message) this.originMessage = message;
    };
};

module.exports = UserOrganNotFoundError;