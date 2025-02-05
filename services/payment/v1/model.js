// const sql = require('mssql');
// const config = require('../../../config');

// const dbName = `[${config.db.config.database}].dbo.`;
// const tempDbName = `[${config.db.tempDb}].dbo.`;

// const fetch = async (componentId, masterId, masterParentId, userId, workgroupId, organizationId, isManager) => {
//     const result = await config.db.connectionPool.request()
//     .input('componentId', sql.BigInt, componentId)
//     .input('masterId', sql.BigInt, masterId)
//     .input('masterParentId', sql.BigInt, masterParentId)
//     .input('userId', sql.BigInt, userId)
//     .input('workgroupId', sql.BigInt, workgroupId)
//     .input('organizationId', sql.BigInt, organizationId)
//     .input('isManager', sql.BigInt, isManager)
//     .execute(`${dbName}sp_S00_getComponentData`);

//     return result.recordset;
// };

// const create = async (componentId, json) => {
//     const result = await config.db.connectionPool.request()
//     .input('componentId', sql.BigInt, componentId)
//     .input('json', sql.NVarChar(sql.MAX), json)
//     .execute(`${dbName}sp_S00_insertComponentData`);

//     return result.recordset[0];
// };

// const remove = async (componentId, masterId) => {
//     const result = await config.db.connectionPool.request()
//     .input('componentId', sql.BigInt, componentId)
//     .input('masterId', sql.BigInt, masterId)
//     .execute(`${dbName}sp_S00_deleteComponentData`);

//     return result.rowsAffected[0];
// };

// module.exports = {
//     fetch,
//     create,
//     remove,
// };