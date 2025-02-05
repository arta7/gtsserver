const sql = require('mssql');
const config = require('../../../config');

const dbName = `[${config.db.config.database}].dbo.`;
const tempDbName = `[${config.db.tempDb}].dbo.`;

const submit = async (cellPhoneNumber, code) => {
    const result = await config.db.connectionPool.request()
    .input('code', sql.Int, code)
    .input('cellPhoneNumber', sql.BigInt, cellPhoneNumber)
    .query(`INSERT INTO ${tempDbName}S00_messaging(cellPhoneNumber, smsCode)
            VALUES(@cellPhoneNumber, @code)`);

    return result.rowsAffected[0];
};

const confirm = async (cellPhoneNumber, code) => {
    const result = await config.db.connectionPool.request()
    .input('code', sql.Int, code)
    .input('cellPhoneNumber', sql.BigInt, cellPhoneNumber)
    .query(`SELECT  *
            FROM    ${tempDbName}S00_messaging
            WHERE   cellPhoneNumber=@cellPhoneNumber
            AND     smsCode=@code`);

    return result.recordset[0];
};

const find = async (cellPhoneNumber) => {
    const result = await config.db.connectionPool.request()
    .input('cellPhoneNumber', sql.BigInt, cellPhoneNumber)
    .query(`SELECT  *
            FROM    ${tempDbName}S00_messaging
            WHERE   cellPhoneNumber=@cellPhoneNumber`);

    return result.recordset[0];
};

const update = async (cellPhoneNumber, code) => {
    const result = await config.db.connectionPool.request()
    .input('code', sql.Int, code)
    .input('cellPhoneNumber', sql.BigInt, cellPhoneNumber)
    .query(`UPDATE ${tempDbName}S00_messaging
            SET     smsCode=@code
            WHERE   cellPhoneNumber=@cellPhoneNumber`);

    return result.rowsAffected[0];
};

module.exports = {
    find,
    update,
    submit,
    confirm,
};