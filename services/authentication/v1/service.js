const model = require('./model');
const customErrors = require('../../../lib/custom_errors');

const findUser = async (userName, password) => {
    const result = await model.findUser(userName, password);

    return result;
};

const removeSession = async (sessionId) => {
    const result = await model.removeSession(sessionId);

    return result;
};

const submitSession = async (userId, sessionId) => {
    const result = await model.submitSession(userId, sessionId);

    return result;
};

module.exports = {
    findUser,
    removeSession,
    submitSession,
};