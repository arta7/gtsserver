class OrganAlreadyExistCodeError extends Error {
    constructor(code, message) {
        super('امکان تعریف کد تکراری در یک زیرمجموعه میسر نیست!');
        if (code) this.originCode = 1008;
        if (message) this.originMessage = message;
    };
};

module.exports = OrganAlreadyExistCodeError;