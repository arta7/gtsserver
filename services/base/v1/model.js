const config = require('../../../config');
const sql = require('mssql');

const dbName = `[${config.db.config.database}].dbo.`;

const systemInquiry = async () => {
    const result = await config.db.connectionPool.request()
    .query(`SELECT	s.*, ss.id subId, ss.name subName, ss.systemId, ss.icon subIcon, ss.routPath subPath, ss.sortOrder subSort, ss.isActive subIsActive
            FROM	${dbName}S00_system AS s LEFT JOIN ${dbName}S00_subSystem AS ss
            ON		s.id=ss.systemId
            WHERE 	s.isActive=1
            AND		ss.isActive=1`);

    return result.recordset;
};

const organizationCreate = async (parentId, code, name, isActive) => {
    const result = await config.db.connectionPool.request()
    .input('parentId', sql.BigInt, parentId)
    .input('code', sql.NVarChar(50), code)
    .input('name', sql.NVarChar(100), name)
    .input('isActive', sql.Bit, isActive)
    .query(`INSERT INTO ${dbName}S00_organization(parentId, code, name, isActive, isDeleted)
            VALUES(@parentId, @code, @name, @isActive, 0)`);

    return result.rowsAffected[0];
};

const organizationFindByCode = async (parentId, code) => {
    const result = await config.db.connectionPool.request()
    .input('parentId', sql.BigInt, parentId)
    .input('code', sql.NVarChar(50), code)
    .query(`SELECT	*
            FROM	${dbName}S00_organization
            WHERE	parentId=@parentId
            AND     code=@code
            AND     isDeleted=0`);

    return result.recordset[0];
};

const organizationInquiry = async () => {
    const result = await config.db.connectionPool.request()
    .query(`SELECT	id, parentId, code, name, isActive
            FROM	${dbName}S00_organization
            WHERE	isDeleted=0
            ORDER BY LEN(Code), Code`);

    return result.recordset;
};

const organizationFindById = async (id) => {
    const result = await config.db.connectionPool.request()
    .input('id', sql.BigInt, id)
    .query(`SELECT	id, parentId, code, name, isActive
            FROM	${dbName}S00_organization
            WHERE	id=@id
            AND     isDeleted=0`);

    return result.recordset[0];
};

const organizationRelatedFindById = async (parentId) => {
    const result = await config.db.connectionPool.request()
    .input('parentId', sql.BigInt, parentId)
    .query(`SELECT	id, parentId, code, name, isActive
            FROM	${dbName}S00_organization
            WHERE	parentId=@parentId
            AND     isDeleted=0`);

    return result.recordset;
};

const organizationUpdate = async (id, parentId, code, name, isActive) => {
    let query = `UPDATE ${dbName}S00_organization SET `;

    if (parentId) query += 'parentId=@parentId,';
    if (code) query += 'code=@code,';
    if (name) query += 'name=@name,';
    if (isActive !== null && isActive !== undefined) query += 'isActive=@isActive,';
    
    // remove ',' from the latest set prop
    query = query.slice(0, query.length-1);

    query += ' WHERE id=@id';
    
    const result = await config.db.connectionPool.request()
    .input('id', sql.BigInt, id)
    .input('parentId', sql.BigInt, parentId)
    .input('code', sql.NVarChar(50), code)
    .input('name', sql.NVarChar(100), name)
    .input('isActive', sql.Bit, isActive)
    .query(query);

    return result.rowsAffected[0];
};

const organizationRelatedUpdate = async (id, isActive) => {
    const result = await config.db.connectionPool.request()
    .input('id', sql.BigInt, id)
    .input('isActive', sql.Bit, isActive)
    .query(`UPDATE ${dbName}S00_organization
            SET     isActive=@isActive
            WHERE	parentId=@id`);

    return result.rowsAffected[0];
};

const organizationRemove = async (id) => {
    const result = await config.db.connectionPool.request()
    .input('id', sql.BigInt, id)
    .query(`UPDATE ${dbName}S00_organization
            SET     isDeleted=1
            WHERE	id=@id`);

    return result.rowsAffected[0];
};

const organizationRelatedRemove = async (id) => {
    const result = await config.db.connectionPool.request()
    .input('id', sql.BigInt, id)
    .query(`UPDATE ${dbName}S00_organization
            SET     isDeleted=1
            WHERE	parentId=@id`);

    return result.rowsAffected[0];
};

const workgroupFindByName = async (name) => {
    const result = await config.db.connectionPool.request()
    .input('name', sql.NVarChar(50), name)
    .query(`SELECT	id, name, isManager, isActive
            FROM	${dbName}S00_workgroup
            WHERE	name LIKE @name
            AND     isDeleted=0`);

    return result.recordset[0];
};

const workgroupFindById = async (id) => {
    const result = await config.db.connectionPool.request()
    .input('id', sql.BigInt, id)
    .query(`SELECT	id, name, isManager, isActive
            FROM	${dbName}S00_workgroup
            WHERE	id=@id
            AND     isDeleted=0`);

    return result.recordset[0];
};

const workgroupCreate = async (name, isManager, isActive) => {
    const result = await config.db.connectionPool.request()
    .input('name', sql.NVarChar(50), name)
    .input('isActive', sql.Bit, isActive)
    .input('isManager', sql.BigInt, isManager)
    .query(`INSERT INTO ${dbName}S00_workgroup(name, isManager, isActive, isDeleted)
            VALUES(@name, @isManager, @isActive, 0) SELECT SCOPE_IDENTITY() AS workgroupId`);

    return result.recordset[0];
};

const workgroupComponentCreate = async (componentIds, workgroupId) => {
    let result = 0;
        for await(const componentId of componentIds) {
        await config.db.connectionPool.request()
        .input('componentId', sql.BigInt, componentId)
        .input('workgroupId', sql.BigInt, workgroupId)
        .query(`INSERT INTO ${dbName}S00_workgroup_component(componentId, workgroupId)
                VALUES(@componentId, @workgroupId)`);

        result += 1;
    };

    return result;
};

const workgroupComponentDelete = async (workgroupId) => {
    const result = await config.db.connectionPool.request()
    .input('workgroupId', sql.BigInt, workgroupId)
    .query(`DELETE ${dbName}S00_workgroup_component 
            WHERE workgroupId=@workgroupId`);

              return result;
};

const workgroupComponentRemove = async (workgroupId) => {
    const result = await config.db.connectionPool.request()
    .input('workgroupId', sql.BigInt, workgroupId)
    .query(`DELETE ${dbName}S00_workgroup_component 
            WHERE workgroupId=@workgroupId`);

    return result.rowsAffected[0];
};

const workgroupInquiry = async () => {
    const result = await config.db.connectionPool.request()
    .query(`SELECT	id, name, isManager, isActive
            FROM	${dbName}S00_workgroup
            WHERE	isDeleted=0`);

    return result.recordset;
};

const workgroupUpdate = async (id, name, isManager, isActive) => {
    let query = `UPDATE ${dbName}S00_workgroup SET `;

    if (name) query += 'name=@name,';
    if (isManager !== null || isManager !== undefined) query += 'isManager=@isManager,';
    if (isActive !== null && isActive !== undefined) query += 'isActive=@isActive,';
    // remove ',' from the latest set prop
    query = query.slice(0, query.length-1);

    query += ' WHERE id=@id';
    
    const result = await config.db.connectionPool.request()
    .input('id', sql.BigInt, id)
    .input('name', sql.NVarChar(50), name)
    .input('isManager', sql.Bit, isManager)
    .input('isActive', sql.Bit, isActive)
    .query(query);

    return result.rowsAffected[0];
};

const workgroupRemove = async (id) => {
    const result = await config.db.connectionPool.request()
    .input('id', sql.BigInt, id)
    .query(`UPDATE ${dbName}S00_workgroup
            SET     isDeleted=1
            WHERE	id=@id`);

    return result.rowsAffected[0];
};

const definitionInquiry = async () => {
    const result = await config.db.connectionPool.request()
    .query(`SELECT	id, baseDefinitionType, name, sortOrder
            FROM	${dbName}S00_baseDefinition
            WHERE	isDeleted=0`);

    return result.recordset;
};

const definitionByName = async (name) => {
    const result = await config.db.connectionPool.request()
    .input('name', sql.NVarChar(50), name)
    .query(`SELECT	id, baseDefinitionType, name, sortOrder
            FROM	${dbName}S00_baseDefinition
            WHERE	name LIKE @name
            AND     isDeleted=0`);

    return result.recordset[0];
};

const definitionCreate = async (name, baseDefinitionType, sortOrder) => {
    const result = await config.db.connectionPool.request()
    .input('name', sql.NVarChar(100), name)
    .input('baseDefinitionType', sql.TinyInt, baseDefinitionType)
    .input('sortOrder', sql.Int, sortOrder)
    // .input('isFixed', sql.Bit, isFixed)
    .query(`INSERT INTO ${dbName}S00_baseDefinition(name, baseDefinitionType, sortOrder, isDeleted)
            VALUES(@name, @baseDefinitionType, @sortOrder, 0)
            SELECT @@IDENTITY AS id`);

    return result.recordset[0];
};

const definitionById = async (id) => {
    const result = await config.db.connectionPool.request()
    .input('id', sql.BigInt, id)
    .query(`SELECT	id, baseDefinitionType, name, sortOrder
            FROM	${dbName}S00_baseDefinition
            WHERE	id=@id
            AND     isDeleted=0`);

    return result.recordset[0];
};

const definitionUpdate = async (id, name, baseDefinitionType) => {
    let query = `UPDATE ${dbName}S00_baseDefinition SET `;

    if (name) query += 'name=@name,';
    if (baseDefinitionType) query += 'baseDefinitionType=@baseDefinitionType,';
    // remove ',' from the latest set prop
    query = query.slice(0, query.length-1);

    query += ' WHERE id=@id';
    
    const result = await config.db.connectionPool.request()
    .input('id', sql.BigInt, id)
    .input('name', sql.NVarChar(100), name)
    .input('baseDefinitionType', sql.TinyInt, baseDefinitionType)
    .input('sortOrder', sql.Int, sortOrder)
    .query(query);

    return result.rowsAffected[0];
};

const definitionRemove = async (id) => {
    const result = await config.db.connectionPool.request()
    .input('id', sql.BigInt, id)
    .query(`UPDATE ${dbName}S00_baseDefinition
            SET     isDeleted=1
            WHERE	id=@id`);

    return result.rowsAffected[0];
};

const dictionaryInquiry = async (type) => {
    const result = await config.db.connectionPool.request()
    .input('type', sql.NVarChar(10), type)
    .query(`SELECT	*
            FROM	${dbName}Dictionary
            WHERE	valueType=@type`);

    return result.recordset;
};

const ruleInquiry = async () => {
    const result = await config.db.connectionPool.request()
    .query(`SELECT	*
            FROM	((${dbName}S00_system AS s LEFT JOIN ${dbName}S00_subSystem AS ss
            ON		s.id=ss.systemId)LEFT JOIN ${dbName}S00_rule AS r 
            ON		r.subSytemId=ss.id)`);

    return result.recordset;
};

// const componentFind = async (subId, componentId) => {
//     let query = `SELECT	id, subSystemId, parentId, componentType, componentName, caption, sortOrder, isActive
//                     FROM	${dbName}S00_component
//                     WHERE	subSystemId=@subId`;

//     if (componentId) query += ` AND id=@componentId`;

//     const result = await config.db.connectionPool.request()
//     // componentId.forEach(element => {
//         .input('subId', sql.BigInt, subId)
//         .input('componentId', sql.BigInt, componentId)
//     // });

//     .query(query);

//     return result.recordset;
// };

const componentStructureFind = async (subId, componentId) => {
    const result = await config.db.connectionPool.request()
    .input('subSystemId', sql.BigInt, subId)
    .input('componentId', sql.BigInt, componentId)
    .execute(`${dbName}sp_S00_getComponentChildren`);

    return result.recordset[0];
};

const componentInquiry = async (type) => {
    const result = await config.db.connectionPool.request()
    .input('type', sql.TinyInt, type)
    .query(`SELECT	*
            FROM	${dbName}S00_component
            WHERE   isActive=1`);

    return result.recordset;
};

const filedsFind = async (componentId) => {
    const result = await config.db.connectionPool.request()
    .input('componentId', sql.BigInt, componentId)
    .query(`SELECT	*
            FROM	${dbName}S00_component_field
            WHERE   isActive=1
            AND     componentId=@componentId`);

    return result.recordset;
};

const subSystemdefinitionCreate = async (definitionId, subSystems) => {
    let result = 0;
    for await(const subId of subSystems) {
        await config.db.connectionPool.request()
        .input('subSystemId', sql.BigInt, subId)
        .input('definitionId', sql.BigInt, definitionId)
        .query(`INSERT INTO ${dbName}S00_subSystem_baseDefinition(subSystemId, baseDefinitionId)
                VALUES(@subSystemId, @definitionId)`);

        result += 1;
    };   

    return result;
};

const baseTypeInquiry = async () => {
    const result = await config.db.connectionPool.request()
    .query(`SELECT	*
            FROM	${dbName}S00_baseType`);

    return result.recordset;
};

const subSystemBaseTypeFind = async (id) => {
    const result = await config.db.connectionPool.request()
    .input('id', sql.BigInt, id)
    .query(`SELECT	*
            FROM	${dbName}S00_subSystem_baseType
            WHERE   baseTypeId=@id`);

    return result.recordset;
};

const getDropdownData = async (uiComponentId, masterSelecteItemId, masterId, masterParentId, masterSelectedItemValue) => {
    const result = await config.db.connectionPool.request()
    .input('uiComponentId', sql.BigInt, uiComponentId)
    .input('masterSelecteItemId', sql.BigInt, masterSelecteItemId)
    .input('masterId', sql.BigInt, masterId)
    .input('masterParentId', sql.BigInt, masterParentId)
    .input('masterSelectedItemValue', sql.Float, masterSelectedItemValue)
    .execute(`${dbName}sp_S00_getDropDownData`);

    return result.recordset;
};

const menuItemsFetch = async () => {
    const result = await config.db.connectionPool.request()
    .execute(`${dbName}sp_S00_getMenuItems`);

    return result.recordset[0];
};

const menuItemsFetchWithId = async (UserId) => {
    const result = await config.db.connectionPool.request()
    .input('UserId', sql.BigInt, UserId)
    .execute(`${dbName}sp_S00_getMenuItems2`);

    return result.recordset[0];
};

module.exports = {
    filedsFind,
    ruleInquiry,
    systemInquiry,
    menuItemsFetch,
    definitionById,
    baseTypeInquiry,
    workgroupCreate,
    workgroupUpdate,
    workgroupRemove,
    getDropdownData,
    workgroupInquiry,
    definitionRemove,
    componentInquiry,
    definitionUpdate,
    definitionByName,
    definitionCreate,
    dictionaryInquiry,
    definitionInquiry,
    workgroupFindById,
    organizationCreate,
    organizationUpdate,
    organizationRemove,
    workgroupFindByName,
    organizationInquiry,
    organizationFindById,
    subSystemBaseTypeFind,
    componentStructureFind,
    organizationFindByCode,
    workgroupComponentRemove,
    workgroupComponentCreate,
    subSystemdefinitionCreate,
    organizationRelatedUpdate,
    organizationRelatedRemove,
    organizationRelatedFindById,
    workgroupComponentDelete,
    menuItemsFetchWithId
};