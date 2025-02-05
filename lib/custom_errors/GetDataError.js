class GetDataError extends Error {
    constructor(code, message) {
        super('امکان بازیابی اطلاعات میسر نیست!');
        if(code) this.originCode = 1000;
        if(message) this.originMessage = message;
    }
}

module.exports = GetDataError;