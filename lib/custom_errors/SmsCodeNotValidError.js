class SmsCodeNotValidError extends Error {
    constructor(code, message) {
        super('کد وارد شده صحیح نیست !');
        if(code) this.originCode = 2000;
        if(message) this.originMessage = message;
    }
}

module.exports = SmsCodeNotValidError;