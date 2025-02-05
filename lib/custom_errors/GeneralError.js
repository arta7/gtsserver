class GeneralError extends Error {
    constructor(code, message) {
        super('خطای غیر منتظره!');
        if(code) this.originCode = 1000;
        if(message) this.originMessage = message;
    }
}

module.exports = GeneralError;