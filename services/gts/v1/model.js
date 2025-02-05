const sql = require('mssql');
const config = require('../../../config');

const dbName = `[${config.db.config.database}].dbo.`;
const tempDbName = `[${config.db.tempDb}].dbo.`;

const fetch = async (componentId, masterId, masterParentId, userId, workgroupId, organizationId, isManager, PageSize, PageNumber) => {
    const result = await config.db.connectionPool.request()
    .input('componentId', sql.BigInt, componentId)
    .input('masterId', sql.BigInt, masterId)
    .input('masterParentId', sql.BigInt, masterParentId)
    .input('userId', sql.BigInt, userId)
    .input('workgroupId', sql.BigInt, workgroupId)
    .input('organizationId', sql.BigInt, organizationId)
    .input('isManager', sql.BigInt, isManager)
    .input('PageSize', sql.Int, PageSize)
    .input('PageNumber', sql.Int, PageNumber)
    .execute(`${dbName}sp_S00_getComponentData`);

    return result.recordset;
};

const create = async (componentId, json,UserId) => {
    const result = await config.db.connectionPool.request()
    .input('componentId', sql.BigInt, componentId)
    .input('json', sql.NVarChar(sql.MAX), json)
    .input('UserId', sql.BigInt, UserId)
    .execute(`${dbName}sp_S00_insertComponentData`);

    return result.recordset[0];
};

const remove = async (componentId, masterId) => {
    const result = await config.db.connectionPool.request()
    .input('componentId', sql.BigInt, componentId)
    .input('masterId', sql.BigInt, masterId)
    .execute(`${dbName}sp_S00_deleteComponentData`);

    return result.rowsAffected[0];
};

const fetchLoginPageInfo = async () => {
    const result = await config.db.connectionPool.request()
    .execute(`${dbName}sp_S00_getLoginPageInfo`);

    return result.recordset[0];
};

const createLoginPageInfo = async (json) => {
    const result = await config.db.connectionPool.request()
    .input('json', sql.NVarChar(sql.MAX), json)
    .execute(`${dbName}sp_S00_insertLoginPageInfo`);

    // return result.recordset[0];
    
    return result.rowsAffected[0];
};

const fetchVariousData = async (json, userId, workgroupId, organizationId, isManager, PageSize, PageNumber) => {
    const result = await config.db.connectionPool.request()
    .input('json', sql.NVarChar(sql.MAX), json)
    .input('userId', sql.BigInt, userId)
    .input('workgroupId', sql.BigInt, workgroupId)
    .input('organizationId', sql.BigInt, organizationId)
    .input('isManager', sql.Bit, isManager)
    .input('PageSize', sql.Int, PageSize)
    .input('PageNumber', sql.BigInt, PageNumber)
    .execute(`${dbName}sp_S00_getVariousData`);

    return result.recordset[0];
};

const createVariousData = async (json) => {
    const result = await config.db.connectionPool.request()
    .input('json', sql.NVarChar(sql.MAX), json)
    .execute(`${dbName}sp_S00_insertVariousData`);

    return result.rowsAffected[0];
};

module.exports = {
    fetch,
    create,
    remove,
    fetchVariousData,
    createVariousData,
    fetchLoginPageInfo,
    createLoginPageInfo,
};