class PublicKeyNotValidError extends Error {
    constructor(code, message) {
        super('کلید عمومی معتبر نیست!');
        if (code) this.originCode = 1001;
        if (message) this.originMessage = message;
    };
};

module.exports = PublicKeyNotValidError;