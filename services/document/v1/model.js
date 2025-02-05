const sql = require('mssql');
const config = require('../../../config');
const setConsoleLog = require('../../../lib/setConsoleLog');
const utils = require('../../../lib/utils');

const dbName = `[${config.db.config.database}].dbo.`;

const inquiry = async (organs, pageIndex, pageSize, subId, filters, sorting) => {
    let result = {};
    const offset = ` OFFSET ${pageIndex} ROWS FETCH NEXT ${pageSize} ROWS ONLY`;

    result.totalCount = (await fileRowsCountFind(organs)).count;

    const request = config.db.connectionPool.request();

    let query = `SELECT	*
                FROM	${dbName}S01_file
                WHERE	isDeleted=0
                AND     subSystemId=@subId
                AND     organizationId in (`;

    organs?.forEach((element) => {
        query += `${Number(element.organizationId)},`;
    });
    // Remove last ','
    query = query.slice(0, query.length-1).concat(')');

    filters?.forEach((element) => {
        request.input(element.key, element.value)
        query += ` AND ${element.key}=@${element.key}`;
    });

    if (sorting && sorting.length) {
        query += ' ORDER BY ';
        sorting.forEach((element) => {
            request.input(element.key, element.key)
            .input(element.value, element.value);
            query += `${element.key} ${element.value},`;
        });
        // Remove last ','
        query = query.slice(0, query.length-1).concat(offset);
    } else query += ` ORDER BY id${offset}`;

    result.data = (await request
        .input('subId', sql.BigInt, subId)
        .query(query))?.recordset;

    return result;
};

const fileRowsCountFind = async (organs) => {
    let query = `SELECT	COUNT(id) as count
                FROM	${dbName}S01_file
                WHERE	isDeleted=0
                AND     organizationId in (`;

    organs?.forEach((element) => {
        query += `${Number(element.organizationId)},`;
    });
    // Remove last ','
    query = query.slice(0, query.length-1).concat(')');

    const result = await config.db.connectionPool.request()
    .query(query);

    return result.recordset[0];
};

const getComponentData = async (componentId, masterId, masterParentId, userId, workgroupId, organizationId, filter, sortOrderList, isManager) => {
    const result = await config.db.connectionPool.request()
    .input('componentId', sql.BigInt, componentId)
    .input('masterId', sql.BigInt, masterId)
    .input('masterParentId', sql.BigInt, masterParentId)
    .input('userId', sql.BigInt, userId)
    .input('workgroupId', sql.BigInt, workgroupId)
    .input('organizationId', sql.BigInt, organizationId)
    .input('isManager', sql.BigInt, isManager)
    .input('filter', sql.NVarChar(sql.MAX), filter)
    .input('sortOrderList', sql.NVarChar(sql.MAX), sortOrderList)
    .execute(`${dbName}sp_S00_getComponentData`);

    return result.recordset[0];
};

const getCrudQuery = async (componentId, subSystemId, tableName, queryType, condition) => {
    const result = await config.db.connectionPool.request()
    .input('componentId', sql.BigInt, componentId)
    .input('subSystemId', sql.BigInt, subSystemId)
    .input('tableName', sql.NVarChar(50), tableName)
    .input('queryType', sql.TinyInt, queryType)
    .input('condition', sql.NVarChar(50), condition)
    .execute(`${dbName}sp_S00_getCRUDQuery`);

    return result.recordset[0];
};

const create = async (params, obj) => {
    let result;
    const request = await config.db.connectionPool.request();
    
    params.forEach((element) => {
        const { type, value } = utils.dataTypeWrapper(element.key, element.value, obj.parameterListWithDataType);

        request.input(element.key, type, value);
    });   
    
    result = (await request.query(obj.queryTemplate).then().catch(err => {
        setConsoleLog(err.message, JSON.stringify(request.parameters));
    }))?.rowsAffected[0];

    return result;
};

const componentInquiry = async (obj) => {
    const result = (await config.db.connectionPool.request()
    .query(obj.queryTemplate).then().catch(err => {
        setConsoleLog(err.message, JSON.stringify(request.parameters));
    }))?.recordset;

    return result;
};

const find = async (params, obj) => {
    const request = await config.db.connectionPool.request();
    
    params.forEach((element) => {
        if (element.key) {
            const { type, value } = utils.dataTypeWrapper(element.key, element.value, obj.parameterListWithDataType);

            request.input(element.key, type, value);
        }
    });   
    
    const result = (await request.query(obj.queryTemplate).then().catch(err => {
        setConsoleLog(err.message, JSON.stringify(request.parameters));
    }))?.recordset;

    return result;
};

const update = async (params, obj) => {
    const request = await config.db.connectionPool.request();
    
    params.forEach((element) => {
        const { type, value } = utils.dataTypeWrapper(element.key, element.value, obj.parameterListWithDataType, obj.defaultValues);

        request.input(element.key, type, value);
    });   
    
    const result = (await request.query(obj.queryTemplate).then().catch(err => {
        setConsoleLog(err.message, JSON.stringify(request.parameters));
    }))?.rowsAffected[0];

    return result;    
};

const remove = async (params, obj) => {
    const request = await config.db.connectionPool.request();
    
    params.forEach((element) => {
        const { type, value } = utils.dataTypeWrapper(element.key, element.value, obj.parameterListWithDataType);

        request.input(element.key, type, value);
    });   
    
    const result = (await request.query(obj.queryTemplate).then().catch(err => {
        setConsoleLog(err.message, JSON.stringify(request.parameters));
    }))?.rowsAffected[0];

    return result;
};

module.exports = {
    find,
    update,
    create,
    remove,
    inquiry,
    getCrudQuery,
    componentInquiry,
    getComponentData,
};