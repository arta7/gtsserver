class CreateBaseDateError extends Error {
    constructor(code, message) {
        super('امکان تعریف اطلاعات پایه میسر نیست!');
        if(code) this.originCode = 1007;
        if(message) this.originMessage = message;
    }
}

module.exports = CreateBaseDateError;