const sql = require ('mssql');
const config = require('./config');
const { commonModules } = require('./lib');
const setConsoleLog  = require('./lib/setConsoleLog');
const customError = require('./lib/custom_errors');

const sqlConnection = async () => {
    let result;
    try {
        result = await sql.connect(config.db.config);

        if (result._connected) {
            setConsoleLog('Database connection is running on port:', config.db.config.port);
            
            config.db.connectionPool = result;

            await commonModules.createTable(config.db.userSessionTable);
            // config.db.tableCrudObject = await commonModules.tableCrudQueryInquiry();
        }
    } catch (e) {
        throw new customError.DatabaseConnectionError(e.code, e.message);
    }
};

module.exports = {
    sqlConnection,
}