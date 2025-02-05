class DatabaseConnectionError extends Error {
    constructor(code, message) {
        super('خطا در برقراری ارتباط با بانک اطلاعاتی!');
        if(code) this.originCode = 1000;
        if(message) this.originMessage = message;
    }
}

module.exports = DatabaseConnectionError;