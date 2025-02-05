class RemoveBaseDataError extends Error {
    constructor(code, message) {
        super('امکان حذف اطلاعات مورد نظر میسر نیست!');
        if (code) this.originCode = 1013;
        if (message) this.originMessage = message;
    };
};

module.exports = RemoveBaseDataError;