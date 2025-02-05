const model = require('./model');
const setConsoleLog  = require('../../../lib/setConsoleLog');
const customErrors = require('../../../lib/custom_errors');
const { utils } = require('../../../lib');

const systemInquiry = async () => {
    const result = await model.systemInquiry();
    
    return result;
};

const organizationCreate = async (parentId, code, name, isActive) => {
    const result = await model.organizationCreate(parentId, code, name, isActive);
    if (!result) throw new customErrors.CreateBaseDateError();
    
    return result;
};

const organizationFindByCode = async (parentId, code) => {
    const result = await model.organizationFindByCode(parentId, code);

    return result;
};

const organizationFindById = async (id) => {
    const result = await model.organizationFindById(id);

    return result;
};

const organizationRelatedFindById = async (parentId) => {
    const result = await model.organizationRelatedFindById(parentId);

    return result;
};

const organizationInquiry = async () => {
    const result = await model.organizationInquiry();

    return result;
};

const organizationUpdate = async (id, parentId, code, name, isActive) => {
    const result = await model.organizationUpdate(id, parentId, code, name, isActive);
    if (!result) throw new customErrors.UpdateBaseDataError();

    if (isActive !== null && isActive !== undefined) await model.organizationRelatedUpdate(id, isActive);   
    
    return result;
};

const organizationRemove = async (id) => {
    const result = await model.organizationRemove(id);
    if (!result) throw new customErrors.RemoveBaseDataError();

    await model.organizationRelatedRemove(id);

    return result;
};

const workgroupFindByName = async (name) => {
    const result = await model.workgroupFindByName(name);

    return result;
};

const workgroupFindById = async (id) => {
    const result = await model.workgroupFindById(id);

    return result;
};

const workgroupCreate = async (name, isManager, isActive) => {
    const result = await model.workgroupCreate(name, isManager, isActive);
    if (!result) throw new customErrors.CreateBaseDateError();

    // if (componentIds && Array.isArray(componentIds) && componentIds.length && result)
    //     await model.workgroupComponentCreate(componentIds, result.workgroupId);

    return result;
};

const workgroupComponentCreate = async (workgroupId, componentIds) => {
    const result = await model.workgroupComponentCreate(componentIds, workgroupId);
    if (!result) throw new customErrors.CreateBaseDateError();

    return result;
};

const workgroupComponentDelete = async (workgroupId) => {
    const result = await model.workgroupComponentDelete(workgroupId);
    if (!result) throw new customErrors.CreateBaseDateError();

    return result;
};

const workgroupInquiry = async () => {
    const result = await model.workgroupInquiry();

    return result;
};

const workgroupUpdate = async (id, name, isManager, isActive) => {
    const result = await model.workgroupUpdate(id, name, isManager, isActive);
    if (!result) throw new customErrors.UpdateBaseDataError();
    // if (componentIds && Array.isArray(componentIds) && componentIds.length && id && result) {
    //     await model.workgroupComponentRemove(id);
    //     await model.workgroupComponentCreate(componentIds, id);
    // }

    return result;
};

const workgroupComponentUpdate = async (workgroupId, componentIds) => {
    await model.workgroupComponentRemove(workgroupId);
    await model.workgroupComponentCreate(componentIds, workgroupId);    

    return true;
};

const workgroupRemove = async (id) => {
    await model.workgroupComponentRemove(id);
    const result = await model.workgroupRemove(id);
    if (!result) throw new customErrors.RemoveBaseDataError();

    return result;
};

const definitionInquiry = async () => {
    const result = await model.definitionInquiry();

    return result;
};

const definitionByName = async (name) => {
    const result = await model.definitionByName(name);

    return result;
};

const definitionCreate = async (name, baseDefinitionType, sortOrder, subSystems) => {
    const result = await model.definitionCreate(name, baseDefinitionType, sortOrder);
    if (!result) throw new customErrors.CreateBaseDateError();

    await model.subSystemdefinitionCreate(result.id, subSystems);

    return true;
};

const definitionById = async (id) => {
    const result = await model.definitionById(id);

    return result;
};

const definitionUpdate = async (id, name, baseDefinitionType) => {
    const result = await model.definitionUpdate(id, name, baseDefinitionType);

    return result;
};

const definitionRemove = async (id) => {
    const result = await model.definitionRemove(id);
    if (!result) throw new customErrors.RemoveBaseDataError();

    return result;
};

const dictionaryInquiry = async (type) => {
    const result = await model.dictionaryInquiry(type);

    return result;
};

const ruleInquiry = async () => {
    const result = await model.ruleInquiry();

    return result;
};

const componentStructureFind = async (subId, componentId) => {
    const result = utils.convertSqlJsonResult(await model.componentStructureFind(subId, componentId));

    return result;
};

const componentInquiry = async () => {
    const result = await model.componentInquiry();
        
    return result;
};

const filedsFind= async (componentId) => {
    const result = await model.filedsFind(componentId);
        
    return result;
};

const baseTypeInquiry= async (componentId) => {
    const result = await model.baseTypeInquiry();
        
    return result;
};

const subSystemBaseTypeFind= async (id) => {
    const result = await model.subSystemBaseTypeFind(id);
        
    return result;
};

const getDropdownData= async (uiComponentId, masterSelecteItemId, masterId, masterParentId, masterSelectedItemValue) => {
    const result = await model.getDropdownData(uiComponentId, masterSelecteItemId, masterId, masterParentId, masterSelectedItemValue);
        
    return result;
};

const menuItemsFetch = async () => {
    const result = utils.convertSqlJsonResult(await model.menuItemsFetch());

    return result;
};

const menuItemsFetchWithId = async (UserId) => {
    const result = utils.convertSqlJsonResult(await model.menuItemsFetchWithId(UserId));

    return result;
};

module.exports = {
    filedsFind,
    ruleInquiry,
    systemInquiry,
    menuItemsFetch,
    definitionById,
    baseTypeInquiry,
    workgroupCreate,
    workgroupRemove,
    workgroupUpdate,
    getDropdownData,
    definitionRemove,
    definitionUpdate,
    componentInquiry,
    workgroupInquiry,
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
    organizationFindByCode,
    componentStructureFind,
    workgroupComponentCreate,
    workgroupComponentUpdate,
    organizationRelatedFindById,
    workgroupComponentDelete,
    menuItemsFetchWithId
};