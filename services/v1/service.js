const fs = require('fs');
const path = require('path');
const model = require('./model');
const setConsoleLog  = require('../../lib/setConsoleLog');
const customErrors = require('../../lib/custom_errors');

const createTable = async (tbName) => {
    await model.createTable(tbName);
    
    return true;
};

const tableCrudQueryInquiry = async () => {
    const result = await model.tableCrudQueryInquiry();
    
    return result;
};

const findSession = async (sessionId) => {
    const result = await model.findSession(sessionId);
    
    return result;
};

const createDirectory = async (folderPath) => {
    const dir =`${path.dirname(require.main.filename)}\\${folderPath}`;
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
}

module.exports = {
    createTable,
    findSession,
    createDirectory,
    tableCrudQueryInquiry,
};