class LoginFailedError extends Error {
    constructor(code, message) {
        super('امکان ورود به سامانه میسر نیست!');
        if (code) this.originCode = 1002;
        if (message) this.originMessage = message;
    };
};

module.exports = LoginFailedError;