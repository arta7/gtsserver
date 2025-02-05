class LoginFailedError extends Error {
    constructor(code, message) {
        super('نام کاربری و یا رمز عبور صحیح نیست!');
        if (code) this.originCode = 1002;
        if (message) this.originMessage = message;
    };
};

module.exports = LoginFailedError;