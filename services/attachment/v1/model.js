const sql = require('mssql');
const config = require('../../../config');

const dbName = `[${config.db.config.database}].dbo.`;

const remove = async (id) => {
    const result = await config.db.connectionPool.request()
    .input('id', sql.BigInt, id)
    .execute(`${dbName}sp_S00_deleteAttachment`);

    return result.rowsAffected[0];
};

const fetch = async (componentId, ownerId) => {
    const result = await config.db.connectionPool.request()
    .input('componentId', sql.BigInt, componentId)
    .input('ownerId', sql.BigInt, ownerId)
    .execute(`${dbName}sp_S00_getAttachment`);

    return result.recordset;
};

const create = async (componentId, ownerId, fileName, fileExtension, fileContent, fileSize, attachmentType, componentName) => {
    const result = await config.db.connectionPool.request()
    .input('componentId', sql.BigInt, componentId)
    .input('ownerId', sql.BigInt, ownerId)
    .input('fileName', sql.NVarChar(100), fileName)
    .input('fileExtension', sql.NVarChar(5), fileExtension)
    .input('fileContent', sql.NVarChar(sql.MAX), fileContent)
    .input('fileSize', sql.Int, fileSize)
    .input('attachmentType', sql.NVarChar(100), attachmentType)
    .input('componentName', sql.NVarChar(100), componentName)
    .execute(`${dbName}sp_S00_insertAttachment`);

    return result.recordset[0];
};

const masterGridFetch = async (componentId, masterId) => {
    const result = await config.db.connectionPool.request()
    .input('componentId', sql.BigInt, componentId)
    .input('masterId', sql.BigInt, masterId)
    .execute(`${dbName}sp_S00_getMasterGridAttachment`);

    return result.recordset[0];
};

module.exports = {
    remove,
    create,
    fetch,
    masterGridFetch,
}