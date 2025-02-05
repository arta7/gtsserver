class NotSamePassword extends Error {
    constructor(code, message) {
        super('عدم تطابق پسورد!');
        if (code) this.originCode = 1002;
        if (message) this.originMessage = message;
    };
};

module.exports = NotSamePassword;