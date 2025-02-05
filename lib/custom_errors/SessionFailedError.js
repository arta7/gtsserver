class SessionFailedError extends Error {
    constructor(code, message) {
        super('UnAuthorized');
        if (code) this.originCode = 1004;
        if (message) this.originMessage = message;
    };
};

module.exports = SessionFailedError;