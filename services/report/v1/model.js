const sql = require('mssql');
const config = require('../../../config');

const dbName = `[${config.db.config.database}].dbo.`;
const tempDbName = `[${config.db.tempDb}].dbo.`;

const remove = async (reportId) => {
    const result = await config.db.connectionPool.request()
    .input('exclusiveReportId', sql.BigInt, reportId)
    .execute(`${dbName}sp_S00_deleteExclusiveReport`);

    return result.rowsAffected[0];
};

const getComponentField = async (componentId) => {
    const result = await config.db.connectionPool.request()
    .input('componentId', sql.BigInt, componentId)
    .execute(`${dbName}sp_S00_getComponentFieldForExclusiveReport`);

    return result.recordset;
};

const getComponent = async (subSystemId, systemId) => {
    const result = await config.db.connectionPool.request()
    .input('subSystemId', sql.BigInt, subSystemId)
    .input('systemId', sql.BigInt, systemId)
    .execute(`${dbName}sp_S00_getComponentForExclusiveReport`);

    return result.recordset[0];
};

const getReportDate = async (exclusiveReportId, userId, workgroupId, organizationId, isManager, PageSize, PageNumber) => {
    const result = await config.db.connectionPool.request()
    .input('exclusiveReportId', sql.BigInt, exclusiveReportId)
    .input('userId', sql.BigInt, userId)
    .input('workgroupId', sql.BigInt, workgroupId)
    .input('organizationId', sql.BigInt, organizationId)
    .input('isManager', sql.BigInt, isManager)
    .input('PageSize', sql.BigInt, PageSize)
    .input('PageNumber', sql.BigInt, PageNumber)
    .execute(`${dbName}sp_S00_getExclusiveReportData`);

    return result.recordset;
};

const getReportDetail = async (reportId) => {
    const result = await config.db.connectionPool.request()
    .input('exclusiveReportId', sql.BigInt, reportId)
    .execute(`${dbName}sp_S00_getExclusiveReportDetail`);

    return result.recordset[0];
};

const getReportList = async (componentId) => {
    const result = await config.db.connectionPool.request()
    .input('componentId', sql.BigInt, componentId)
    .execute(`${dbName}sp_S00_getExclusiveReportList`);

    return result.recordset[0];
};

const getReportStructure = async (reportId) => {
    const result = await config.db.connectionPool.request()
    .input('exclusiveReportId', sql.BigInt, reportId)
    .execute(`${dbName}sp_S00_getExclusiveReportStructure`);
    
    return result.recordset[0];
};

const create = async (json) => {
    const result = await config.db.connectionPool.request()
    .input('json', sql.NVarChar(sql.MAX), json)
    .execute(`${dbName}sp_S00_insertExclusiveReport`);
    
    return result.rowsAffected[0];
};

const getStatisticsReportData = async (subSystemId, statisticsReportId, userId, workgroupId, organizationId, isManager, json) => {
    const result = await config.db.connectionPool.request()
    .input('subSystemId', sql.BigInt, subSystemId)
    .input('statisticsReportId', sql.BigInt, statisticsReportId)
    .input('userId', sql.BigInt, userId)
    .input('workgroupId', sql.BigInt, workgroupId)
    .input('organizationId', sql.BigInt, organizationId)
    .input('isManager', sql.Bit, isManager)
    .input('json', sql.NVarChar(sql.MAX), json)
    .execute(`${dbName}sp_S00_getStatisticsReportData`);
    
    return result.recordset[0];
};

module.exports = {
    create,
    remove,
    getComponent,
    getReportDate,
    getReportList,
    getReportDetail,
    getComponentField,
    getReportStructure,
    getStatisticsReportData,
};