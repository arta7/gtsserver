class BaseDataNotFoundError extends Error {
    constructor(code, message) {
        super('اطلاعات مورد نظر یافت نشد!');
        if(code) this.originCode = 1009;
        if(message) this.originMessage = message;
    }
}

module.exports = BaseDataNotFoundError;