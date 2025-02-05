class CreateDataError extends Error {
    constructor(code, message) {
        super('امکان ذخیره اطلاعات میسر نیست!');
        if(code) this.originCode = 1005;
        if(message) this.originMessage = message;
    }
}

module.exports = CreateDataError;