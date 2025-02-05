const sql = require('mssql');
const config = require('../../../config');

const dbName = `[${config.db.config.database}].dbo.`;
const tempDbName = `[${config.db.tempDb}].dbo.`;

const findUser = async (userName, password) => {
    const result = await config.db.connectionPool.request()
        .input('userName', sql.NVarChar, userName)
        .input('password', sql.NVarChar, password)
        .query(`SELECT  userName, firstName, lastName, nationalCode, personelCode, cellPhoneNumber, email, address, isActive
                FROM    ${dbName}S00_user
                WHERE   userName=@userName
                AND     password=@password
                AND     isActive=1
                AND     isDeleted=0`);

    return result.recordset[0];
};

const removeSession = async (sessionId) => {
    const result = await config.db.connectionPool.request()
        .input('sessionId', sql.NVarChar, sessionId)
        .query(`DELETE FROM ${tempDbName}${config.db.userSessionTable}
                WHERE sessionId=@sessionId`);

    return true;
};

const submitSession = async (userId, sessionId) => {
    const result = await config.db.connectionPool.request()
        .input('sessionId', sql.NVarChar, sessionId)
        .input('userId', sql.BigInt, userId)
        .input('db', sql.NVarChar, config.db.config.database)
        .query(`INSERT INTO ${tempDbName}${config.db.userSessionTable}(userId, sessionId, db)
                VALUES(@userId, @sessionId, @db)`);

    return result.rowsAffected[0];
};

module.exports = {
    findUser,
    removeSession,
    submitSession,
};