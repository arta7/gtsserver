class UserExtraDataFindError extends Error {
    constructor(code, message) {
        super('واحد و یا گروه کاربری، کاربر مورد نظر یافت نشد!');
        if (code) this.originCode = 1002;
        if (message) this.originMessage = message;
    };
};

module.exports = UserExtraDataFindError;