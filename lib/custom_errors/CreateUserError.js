class CreateUserError extends Error {
    constructor(code, message) {
        super('امکان تعریف کاربر جدید میسر نیست!');
        if(code) this.originCode = 1005;
        if(message) this.originMessage = message;
    }
}

module.exports = CreateUserError;