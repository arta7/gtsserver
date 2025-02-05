class CurrectInputDataError extends Error {
    constructor(code, message) {
        super('اطلاعات وارد شده صحیح نیست!');
        if(code) this.originCode = 1000;
        if(message) this.originMessage = message;
    }
}

module.exports = CurrectInputDataError;