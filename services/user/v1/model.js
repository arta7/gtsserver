const sql = require('mssql');
const config = require('../../../config');

const dbName = `[${config.db.config.database}].dbo.`;

const inquiry = async (pageIndex = 0, pageSize = 255) => {
    const result = await config.db.connectionPool.request()
    .input('pageIndex', sql.SmallInt, pageIndex)
    .input('pageSize', sql.SmallInt, pageSize)
    // .query(`SELECT  U.[id]
    //         ,U.[userName]
    //         ,U.[firstName]
    //         ,U.[lastName]
    //         ,U.[nationalCode]
    //         ,U.[personelCode]
    //         ,U.[cellPhoneNumber]
    //         ,U.[email]
    //         ,U.[address]
    //         ,U.[isActive]
    //         ,U.[isDeleted] 
    //         ,UWO.workgroupId
    //     FROM ${dbName}S00_user U LEFT OUTER JOIN ${dbName}S00_user_workgroup_organization UWO ON
    //                 U.id = UWO.userId 
    //                 LEFT OUTER JOIN ${dbName}S00_workgroup W ON
    //                 UWO.workgroupId = W.id AND
    //                 W.isActive = 1 AND
    //                 W.isDeleted = 0
    //                 LEFT OUTER JOIN ${dbName}S00_organization O ON
    //                 UWO.organizationId = O.id AND
    //                 O.isActive = 1 AND
    //                 O.isDeleted = 0
    //     WHERE U.isDeleted = 0
    //     ORDER BY U.userName
    //     OFFSET @pageIndex ROWS FETCH NEXT @pageSize ROWS ONLY`);
    .execute(`${dbName}sp_S00_UserList`);
    return result.recordset;
};

const find = async (id) => {
    const result = await config.db.connectionPool.request()
    .input('id', sql.BigInt, id)
    .query(`SELECT	id, userName, firstName, lastName, nationalCode, personelCode, cellPhoneNumber, email, address, isActive
            FROM	${dbName}S00_user
            WHERE	id=@id
            AND		isDeleted=0`);

    return result.recordset[0];
};

const create = async (userName, password, firstName, lastName, nationalCode, personelCode, cellPhoneNumber, email, address, isActive, organizationId, workgroupId,UnitId) => {
    const result = await config.db.connectionPool.request()
    .input('userName', sql.NVarChar(50), userName)
    .input('password', sql.NVarChar(200), password)
    .input('firstName', sql.NVarChar(50), firstName)
    .input('lastName', sql.NVarChar(50), lastName)
    .input('nationalCode', sql.NChar(10), nationalCode)
    .input('personelCode', sql.NVarChar(10), personelCode)
    .input('cellPhoneNumber', sql.NChar(11), cellPhoneNumber)
    .input('email', sql.NVarChar(50), email)
    .input('address', sql.NVarChar(500), address)
    .input('isActive', sql.Bit, isActive)
    .input('UnitId', sql.BigInt, UnitId)
    .input('organizationId', sql.BigInt, organizationId)
    .input('workgroupId', sql.BigInt, workgroupId)
   
    .execute(`${dbName}sp_S00_user_signup`);
    // .query(`INSERT INTO ${dbName}S00_user(userName, password, firstName, lastName, nationalCode, personelCode, cellPhoneNumber, email, address, isActive, isDeleted)
    //         VALUES(@userName, @password, @firstName, @lastName, @nationalCode, @personelCode, @cellPhoneNumber, @email, @address, @isActive, 0) 
    //         SELECT @@IDENTITY AS id`);

    return result.recordset[0];
};

const extraDataCreate = async (id, extra) => {
    let rowCount = 0;
    for await (const element of extra) {
        const result = await config.db.connectionPool.request()
        .input('userId', sql.BigInt, id)
        .input('workgroupId', sql.BigInt, element.workgroupId)
        .input('organizationId', sql.BigInt, element.organizationId);
        // .query(`INSERT INTO ${dbName}S00_user_workgroup_organization(userId, workgroupId, organizationId)
        // VALUES(@userId, @workgroupId, @organizationId)`);

        rowCount += result.rowsAffected[0];
    }

    return rowCount;
};

const update = async (id, userName, password, firstName, lastName, nationalCode, personelCode, cellPhoneNumber, email, address, isActive,UnitId) => {
    let query = `UPDATE ${dbName}S00_user SET `;

    if (userName) query += 'userName=@userName,';
    if (password) query += 'password=@password,';
    if (firstName) query += 'firstName=@firstName,';
    if (lastName) query += 'lastName=@lastName,';
    if (nationalCode) query += 'nationalCode=@nationalCode,';
    if (personelCode) query += 'personelCode=@personelCode,';
    if (cellPhoneNumber) query += 'cellPhoneNumber=@cellPhoneNumber,';
    if (email) query += 'email=@email,';
    if (address) query += 'address=@address,';
    if (isActive !== null && isActive !== undefined) query += 'isActive=@isActive,';
    if (UnitId) query += 'UnitId=@UnitId,';
    // remove ',' from the latest set prop
    query = query.slice(0, query.length-1);

    query += ' WHERE id=@id';
    
    const result = await config.db.connectionPool.request()
    .input('id', sql.BigInt, id)
    .input('userName', sql.NVarChar(50), userName)
    .input('password', sql.NVarChar(200), password)
    .input('firstName', sql.NVarChar(50), firstName)
    .input('lastName', sql.NVarChar(50), lastName)
    .input('nationalCode', sql.NChar(10), nationalCode)
    .input('personelCode', sql.NVarChar(10), personelCode)
    .input('cellPhoneNumber', sql.NChar(11), cellPhoneNumber)
    .input('email', sql.NVarChar(50), email)
    .input('address', sql.NVarChar(500), address)
    .input('isActive', sql.Bit, isActive)
    .input('UnitId', sql.BigInt, UnitId)
    .query(query);

    return result.rowsAffected[0];
};

const remove = async (id) => {
    const result = await config.db.connectionPool.request()
    .input('id', sql.BigInt, id)
    .query(`UPDATE ${dbName}S00_user
            SET     isDeleted=1
            WHERE	id=@id`);

    return result.rowsAffected[0];
};

const updateUser = async (UserId,UnitId) => {
    const result = await config.db.connectionPool.request()
    .input('UserId', sql.BigInt, UserId)
    .input('UnitId', sql.BigInt, UnitId)
    .execute(`${dbName}sp_S00_User_Update`);

    return result.rowsAffected[0];
}

const updateUnits = async (UserId,json) => {
    const result = await config.db.connectionPool.request()
    .input('UserId', sql.BigInt, UserId)
    .input('json', sql.NVarChar(5000), json)
    .execute(`${dbName}sp_S00_insertUser_workgroup_organization`);

    return result.rowsAffected[0];
};

const extraDataRemove = async (id) => {
    const result = await config.db.connectionPool.request()
    .input('userId', sql.BigInt, id)
    .query(`DELETE ${dbName}S00_user_workgroup_organization 
            WHERE userId=@userId`);

    return true;
};

const findByUserName = async (userName) => {
    const result = await config.db.connectionPool.request()
    .input('userName', sql.NVarChar(50), userName)
    .execute(`${dbName}sp_S00_getUserInfo`);
    // .query(`SELECT  u.*, wo.organizationId, wo.workgroupId, w.isManager
    //         FROM	${dbName}S00_user u, ${dbName}S00_user_workgroup_organization wo, ${dbName}S00_workgroup w
    //         WHERE	u.id = wo.userId
    //         AND		wo.workgroupId=w.id
    //         AND     userName=@userName
    //         AND     u.isActive=1
    //         AND		u.isDeleted=0
    //         AND		w.isActive=1
    //         AND		w.isDeleted=0`);

    return result.recordset[0];
};

const findUserExtraData = async (id) => {
    const result = await config.db.connectionPool.request()
    .input('id', sql.BigInt, id)
    .query(`SELECT	*
            FROM	${dbName}S00_user_workgroup_organization
            WHERE	userId=@id`);

    return result.recordset;
};

const organizationFind = async (id) => {
    const result = await config.db.connectionPool.request()
    .input('id', sql.BigInt, id)
    .query(`SELECT	wo.*, parentId, code, name, isActive, isDeleted
            FROM	${dbName}S00_user_workgroup_organization wo inner join ${dbName}S00_organization o
            ON		wo.organizationId=o.id
            WHERE	userId=@id
            AND		o.isDeleted=0
            AND		o.isActive=1`);

    return result.recordset;
};

const getUserWorkGroup = async (UserId) => {
    const result = await config.db.connectionPool.request()
    .input('UserId', sql.BigInt, UserId)
    .execute(`${dbName}sp_S00_getUserWorkGroup`);

    return result.recordset;
};

const workgroupFind = async (id) => {
    const result = await config.db.connectionPool.request()
    .input('id', sql.BigInt, id)
    .query(`SELECT	wo.*, name, isManager, isActive, isDeleted
            FROM	${dbName}S00_user_workgroup_organization wo inner join ${dbName}S00_workgroup w
            ON		wo.organizationId=w.id
            WHERE	userId=@id
            AND		w.isDeleted=0
            AND		w.isActive=1`);

    return result.recordset;
};

module.exports = {
    find,
    update,
    create,
    remove,
    inquiry,
    workgroupFind,
    findByUserName,
    extraDataCreate,
    extraDataRemove,
    organizationFind,
    findUserExtraData,
    updateUser,
    updateUnits,
    getUserWorkGroup
};