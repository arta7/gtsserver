class UpdateBaseDataError extends Error {
    constructor(code, message) {
        super('امکان بروز رسانی اطلاعات میسر نیست!');
        if (code) this.originCode = 1011;
        if (message) this.originMessage = message;
    };
};

module.exports = UpdateBaseDataError;