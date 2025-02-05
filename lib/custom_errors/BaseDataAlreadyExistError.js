class BaseDataAlreadyExistError extends Error {
    constructor(code, message) {
        super('اطلاعات وارد شده تکراری است!');
        if(code) this.originCode = 1012;
        if(message) this.originMessage = message;
    }
}

module.exports = BaseDataAlreadyExistError;