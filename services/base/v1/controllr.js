const service = require('./service');
const docService = require('../../document/v1/service');
const customErrors = require('../../../lib/custom_errors');
const { utils } = require('../../../lib');

const systemInquiry = async (req, res) => {
    // let result = [];
    // const systems = await service.systemInquiry();

    // const components = await service.componentInquiry();

    // if (systems) {
    //     systems.forEach((item) => {
    //         let system = result.find((f) => f.system.id === item.id);
    //         if (!system) {
    //             result.push({
    //                 system: {
    //                     id: item.id,
    //                     caption: item.name,
    //                     code: item.code,
    //                     sortOrder: item.sortOrder,
    //                     routPath: item.routPath,
    //                     icon: item.icon,
    //                     isActive: item.isActive,
    //                     subSystems: [],
    //                 },
    //             });
    //         } 

    //         if (item.subId) { 
    //             system = result.find((f) => f.system.id === item.systemId).system;
    //             if (system) {
    //                 const children = components.filter((f) => f.subSystemId === item.subId && f.componentType === 0);

    //                 system.subSystems.push({
    //                     id: item.subId,
    //                     caption: item.subName,
    //                     icon: item.subIcon,
    //                     routPath: item.subPath,
    //                     sortOrder: item.subSort,
    //                     isActive: item.subIsActive,
    //                     children,
    //                 });
    //             }
    //         }     
    //     });
    // }
    const result = await service.menuItemsFetch();
    
    res.send(result);
};



const organizationCreate = async (req, res) => {
    const { parentId, code, name, isActive } = req.body;

    const result = await service.organizationFindByCode(parentId, code);
    if (result) throw new customErrors.OrganAlreadyExistCodeError();

    await service.organizationCreate(parentId, code, name, isActive);

    res.status(204).send('');
};

const organizationInquiry = async (req, res) => {
    const organs = await service.organizationInquiry();
    
    const result = utils.treeObjectGenerator(organs);

    res.send(result);
};

const organizationUpdate = async (req, res) => {
    const { id } = req.params;
    const { parentId, code, name, isActive } = req.body;

    let result = await service.organizationFindById(id);
    if (!result) throw new customErrors.BaseDataNotFoundError();

    result = await service.organizationFindByCode(parentId, code);
    if (result) throw new customErrors.OrganAlreadyExistCodeError();

    await service.organizationUpdate(id, parentId, code, name, isActive);

    res.status(204).send('');
};

const organizationRemove = async (req, res) => {
    const { id } = req.params;

    const result = await service.organizationFindById(id);
    if (!result) throw new customErrors.BaseDataNotFoundError();

    await service.organizationRemove(id);

    res.status(204).send('');
};

const organizationRelatedFindById = async (req, res) => {
    const { parentId } = req.params;

    const result = await service.organizationRelatedFindById(parentId);
    if (!result) throw new customErrors.BaseDataNotFoundError();

    res.send(result);
};

const workgroupCreate = async (req, res) => {
    const { name, isManager, isActive } = req.body;

    const result = await service.workgroupFindByName(name);
    if (result) throw new customErrors.BaseDataAlreadyExistError();

    await service.workgroupCreate(name, isManager, isActive);

    res.status(204).send('');
};

const workgroupUpdate = async (req, res) => {
    // const { id } = req.params;
    const {id, name, isManager, isActive } = req.body;

    // let result = await service.workgroupFindByName(name);
    // if (result) throw new customErrors.BaseDataAlreadyExistError();

    result = await service.workgroupFindById(id);
    if (!result) throw new customErrors.BaseDataNotFoundError();

    await service.workgroupUpdate(id, name, isManager, isActive);

    res.status(204).send('');
};

const workgroupComponentCreate = async (req, res) => {
    const { workgroupId, componentIds } = req.body;

    await service.workgroupComponentCreate(workgroupId, componentIds);

    res.status(204).send('');
};

const workgroupComponentDelete = async (req, res) => {
    const { workgroupId } = req.body;

    await service.workgroupComponentDelete(workgroupId);

    res.status(204).send('');
};

const workgroupComponentUpdate = async (req, res) => {
    const { workgroupId } = req.params;
    const { componentIds } = req.body;

    await service.workgroupComponentUpdate(workgroupId, componentIds);

    res.status(204).send('');
};

const workgroupInquiry = async (req, res) => {
    const result = await service.workgroupInquiry();
    if (!result) throw new customErrors.BaseDataNotFoundError();

    res.send(result);
};

const workgroupRemove = async (req, res) => {
    const { id } = req.params;

    const result = await service.workgroupFindById(id);
    if (!result) throw new customErrors.BaseDataNotFoundError();

    await service.workgroupRemove(id);

    res.status(204).send('');
};

const definitionInquiry = async (req, res) => {
    const result = await service.definitionInquiry();

    res.send(result);
};

const definitionCreate = async (req, res) => {
    const { name, baseDefinitionType, sortOrder, subSystems } = req.body;

    const result = await service.definitionByName(name);
    if (result) throw new customErrors.BaseDataAlreadyExistError();

    await service.definitionCreate(name, baseDefinitionType, sortOrder, subSystems);

    res.status(204).send('');
};

const definitionUpdate = async (req, res) => {
    const { id } = req.params;
    const { name, baseDefinitionType } = req.body;

    let result = await service.definitionByName(name);
    if (result) throw new customErrors.BaseDataAlreadyExistError();

    result = await service.definitionById(id);
    if (!result) throw new customErrors.BaseDataNotFoundError();

    await service.definitionUpdate(id, name, baseDefinitionType);

    res.status(204).send('');
};

const definitionRemove = async (req, res) => {
    const { id } = req.params;

    const result = await service.definitionById(id);
    if (!result) throw new customErrors.BaseDataNotFoundError();

    await service.definitionRemove(id);

    res.status(204).send('');
};

const dictionaryInquiry = async (req, res) => {
    const { type } = req.params;

    const result = await service.dictionaryInquiry(type);

    res.send(result);
};

const ruleInquiry = async (req, res) => {
    const result = await service.ruleInquiry();

    res.send(result);
};

const componentStructureFind = async (req, res) => {
    const { subId, componentId } = req.query;
    // let result = [];

    const result = await service.componentStructureFind(subId, componentId);

    // If was not menu
    // if (componentId) {
    //     components.forEach((item) => {
    //         const component = result.find((f) => f.subSystemId === item.subSystemId && f.parentId === item.parentId && f.id === item.id);

    //         if (!component) {
    //             result.push({
    //                 id: item.id,
    //                 subSystemId: item.subSystemId,
    //                 parentId: item.parentId,
    //                 componentType: item.componentType,
    //                 componentName: item.componentName,
    //                 caption: item.caption,
    //                 sortOrder: item.sortOrder,
    //                 routPath: item.routPath,
    //                 icon: item.icon,
    //                 submitAPI: item.submitAPI,
    //                 fetchDataAPI: item.fetchDataAPI,
    //                 fields: [
    //                     {
    //                         fieldId: item.fieldId,
    //                         aliasName: item.aliasName,
    //                         dataType: item.dataType,
    //                         fieldSortOrder: item.fieldSortOrder,
    //                         fieldCaption: item.fieldCaption,
    //                         fieldDescription: item.fieldDescription,
    //                         isReadOnly: item.isReadOnly,
    //                         isVisible: item.isVisible,
    //                         isVisibleInGrid: item.isVisibleInGrid,
    //                         isMandatory: item.isMandatory,
    //                         isUnique: item.isUnique,
    //                         uniquenessCheckAPI: item.uniquenessCheckAPI,
    //                         needToValidate: item.needToValidate,
    //                         validationRule:item.validationRule,
    //                         maxLen: item.maxLen,
    //                         minLen: item.minLen,
    //                         useInSaveMethod: item.useInSaveMethod,
    //                         masterFieldId: item.masterFieldId,
    //                         uiComponentType: item.uiComponentType,
    //                         isEnabled: item.isEnabled,
    //                         neverVisible: item.neverVisible,
    //                         uiComponentId: item.uiComponentId,
    //                         masterFieldAliasName: item.masterFieldAliasName,
    //                         attachedField: item.attachedField,
    //                         hasAttachment: item.hasAttachment,
    //                     },
    //                 ],
    //             }) 
    //         } else {
    //             component.fields.push({
    //                 fieldId: item.fieldId,
    //                 aliasName: item.aliasName,
    //                 dataType: item.dataType,
    //                 fieldSortOrder: item.fieldSortOrder,
    //                 fieldCaption: item.fieldCaption,
    //                 fieldDescription: item.fieldDescription,
    //                 isReadOnly: item.isReadOnly,
    //                 isVisible: item.isVisible,
    //                 isVisibleInGrid: item.isVisibleInGrid,
    //                 isMandatory: item.isMandatory,
    //                 isUnique: item.isUnique,
    //                 uniquenessCheckAPI: item.uniquenessCheckAPI,
    //                 needToValidate: item.needToValidate,
    //                 validationRule:item.validationRule,
    //                 maxLen: item.maxLen,
    //                 minLen: item.minLen,
    //                 useInSaveMethod: item.useInSaveMethod,
    //                 masterFieldId: item.masterFieldId,
    //                 uiComponentType: item.uiComponentType,
    //                 isEnabled: item.isEnabled,
    //                 neverVisible: item.neverVisible,
    //                 uiComponentId: item.uiComponentId,
    //                 masterFieldAliasName: item.masterFieldAliasName,
    //                 attachedField: item.attachedField,
    //                 hasAttachment: item.hasAttachment,
    //             });
    //         }
    //     });
    // } else result = components;
 
    res.send(result);
};

const filedsFind = async (req, res) => {
    const { componentId } = req.query;

    const result = await service.filedsFind(componentId);

    res.send(result);
};

const baseTypeInquiry = async (req, res) => {
    const result = await service.baseTypeInquiry();

    res.send(result);
};

const subSystemBaseTypeFind = async (req, res) => {
    const { id } = req.params;

    const result = await service.subSystemBaseTypeFind(id);

    res.send(result);
};

const getDropdownData = async (req, res) => {
    const { 
        uiComponentId, masterSelecteItemId, masterId, masterParentId, masterSelectedItemValue,
    } = req.query;

    const result = await service.getDropdownData(uiComponentId, masterSelecteItemId, masterId, masterParentId, masterSelectedItemValue);

    res.send(result);
};

const componentDataCreate = async (req, res) => {
    const { componentId, subSystemId, tableName, params } = req.body;

    await docService.create(componentId, subSystemId, tableName, null, 0, params);

    res.status(204).send('');
};

const componentDataFind = async (req, res) => {
    const { componentId, subSystemId, tableName, condition, params } = req.body;

    const result = await docService.find(componentId, subSystemId, tableName, condition, 1, params);

    res.send(result);
};

const componentDataUpdate = async (req, res) => {
    const { componentId, subSystemId, tableName, params } = req.body;

    await docService.update(componentId, subSystemId, tableName, 'ById', 2, params);

    res.status(204).send('');
};

const componentDataRemove = async (req, res) => {
    const { componentId, subSystemId, tableName, params } = req.body;

    await docService.remove(componentId, subSystemId, tableName, 'ById', 3, params);

    res.status(204).send('');
};


const menuItemsFetch = async (req, res) => {

    const result = await service.menuItemsFetch();

    res.send(result);
};

const menuItemsFetchWithId = async (req, res) => {
    const { UserId } = req.body;
    const result = await service.menuItemsFetchWithId(UserId);

    res.send(result);
};

module.exports = {
    filedsFind,
    ruleInquiry,
    systemInquiry,
    menuItemsFetch,
    baseTypeInquiry,
    workgroupCreate,
    workgroupRemove,
    workgroupUpdate,
    getDropdownData,
    definitionRemove,
    workgroupInquiry,
    definitionCreate,
    definitionUpdate,
    dictionaryInquiry,
    definitionInquiry,
    componentDataFind,
    organizationCreate,
    organizationUpdate,
    organizationRemove,
    organizationInquiry,
    componentDataRemove,
    componentDataUpdate,
    componentDataCreate,
    subSystemBaseTypeFind,
    componentStructureFind,
    workgroupComponentUpdate,
    workgroupComponentCreate,
    organizationRelatedFindById,
    workgroupComponentDelete,
    menuItemsFetchWithId
};