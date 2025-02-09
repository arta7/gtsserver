class SmsCodeNotExpireError extends Error {
    constructor(message) {
        super('کد قبلا برای شما ارسال شده است');
        if(message) this.originMessage = message;
    }
}

module.exports = SmsCodeNotExpireError;