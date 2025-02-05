const sql = require('mssql');
const config = require('../../config');

const dbName = `[${config.db.config.database}].dbo.`;
const tempDbName = `[${config.db.tempDb}].dbo.`;

const createTable = async (tbName) => {
    const result = await config.db.connectionPool.request()
    .query(`USE tempdb
            IF (OBJECT_ID('${tbName}') IS NULL )
            BEGIN
                CREATE TABLE dbo.${tbName}
                (
                sessionId nvarchar(200) NULL,
                userId bigint NULL,
                db nvarchar(200) NULL
                )
                ALTER TABLE dbo.${tbName} SET (LOCK_ESCALATION = TABLE)
            END  
            IF (OBJECT_ID('dbo.S00_messaging') IS NULL )
            BEGIN
                CREATE TABLE dbo.S00_messaging
                (
                cellPhoneNumber bigint NULL,
                smsCode int NULL
                )
                ALTER TABLE dbo.S00_messaging SET (LOCK_ESCALATION = TABLE)
            END`);

    return true;
};

const findSession = async (sessionId) => {
    const result = await config.db.connectionPool.request()
        .input('sessionId', sql.NVarChar, sessionId)
        .input('db', sql.NVarChar, config.db.config.database)
        .query(`SELECT * FROM ${tempDbName}${config.db.userSessionTable}
                WHERE  sessionId=@sessionId
                AND    db=@db`);

    return result.recordset[0];
};

// const tableCrudQueryInquiry = async (componentId, queryType) => {
//     const result = await config.db.connectionPool.request()
//     .execute(`${dbName}sp_S00_getCRUDQuery`);

//     return result.recordset;
// };

module.exports = {
    createTable,
    findSession,
    // tableCrudQueryInquiry,
};