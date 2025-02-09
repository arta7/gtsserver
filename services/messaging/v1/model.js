const sql = require('mssql');
const config = require('../../../config');

const dbName = `[${config.db.config.database}].dbo.`;
const tempDbName = `[${config.db.config.database}].dbo.`;

const submit = async (cellPhoneNumber, code) => {
    var date = new Date();
    console.log('date',date)
    const result = await config.db.connectionPool.request()

    .input('code', sql.NVarChar(10), code.toString())
    .input('cellPhoneNumber', sql.NVarChar(12), cellPhoneNumber.toString())
    .input('date', sql.DateTime, date)
    .query(`INSERT INTO ${tempDbName}S00_messaging(cellPhoneNumber, smsCode,CodeDate)
            VALUES(@cellPhoneNumber, @code,@date)`);

    return result.rowsAffected[0];
};

const confirm = async (cellPhoneNumber, code) => {
    
    const result = await config.db.connectionPool.request()
    .input('code', sql.NVarChar(10), code.toString())
    .input('cellPhoneNumber', sql.NVarChar(12), cellPhoneNumber.toString())
    .query(`SELECT  *
            FROM    ${tempDbName}S00_messaging
            WHERE   cellPhoneNumber=@cellPhoneNumber
            AND     smsCode=@code`);

    return result.recordset[0];
};

const find = async (cellPhoneNumber) => {
    const result = await config.db.connectionPool.request()
    .input('cellPhoneNumber', sql.NVarChar(12), cellPhoneNumber)
    .query(`SELECT  *
            FROM    ${tempDbName}S00_messaging
            WHERE   cellPhoneNumber=@cellPhoneNumber`);
    return result?.recordset[0];
};

const findDate = async (cellPhoneNumber) => {
    var date = new Date();
    const result = await config.db.connectionPool.request()
    .input('cellPhoneNumber', sql.NVarChar(12), cellPhoneNumber)
    .input('date', sql.DateTime, date)
    .query(`SELECT  *
            FROM    ${tempDbName}S00_messaging
            WHERE   cellPhoneNumber=@cellPhoneNumber AND DATEDIFF(hour, CodeDate, @date) > 24`);

            console.log('cellPhoneNumber find',result)
    return result?.recordset[0];
};

const update = async (cellPhoneNumber, code) => {
    var date = new Date();
    const result = await config.db.connectionPool.request()
    .input('code', sql.NVarChar(10), code)
    .input('cellPhoneNumber', sql.NVarChar(12), cellPhoneNumber)
    .input('date', sql.DateTime, date)
    .query(`UPDATE ${tempDbName}S00_messaging
            SET     smsCode=@code,CodeDate=@date
            WHERE   cellPhoneNumber=@cellPhoneNumber`);

    return result.rowsAffected[0];
};

module.exports = {
    find,
    update,
    submit,
    confirm,
    findDate
};