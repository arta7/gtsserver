const model = require('./model');
const customErrors = require('../../../lib/custom_errors');
const config = require('../../../config');

const inquiry = async (organs, pageIndex, pageSize, subId, filters, sorting) => {
    const result = await model.inquiry(organs, pageIndex, pageSize, subId, filters, sorting);
    
    return result;
};

const getComponentData = async (componentId, masterId, masterParentId, userId, workgroupId, organizationId, filter, sortOrderList, isManager) => {
    const result = await model.getComponentData(componentId, masterId, masterParentId, userId, workgroupId, organizationId, filter, sortOrderList, isManager);

    return result;
};

const componentInquiry = async (componentId, queryType) => {
    const obj = config.db.tableCrudObject.find((f) => f.componentId == componentId && f.queryType == queryType);
    if (!obj) throw new customErrors.GetDataError();

    const result = await model.componentInquiry(obj);

    return result;
};

const create = async (componentId, subSystemId, tableName, condition, queryType, params) => {
    if (!params || (Array.isArray(params) && !params.length)) throw new customErrors.CurrectInputDataError();

    const obj = await model.getCrudQuery(componentId, subSystemId, tableName, queryType, condition);
    if (!obj) throw new customErrors.GetDataError();

    const  result = await model.create(params, obj);
    if (!result) throw new customErrors.CreateDataError();

    return true;
};

const find = async (componentId, subSystemId, tableName, condition, queryType, params) => {
    if (!params || (Array.isArray(params) && !params.length)) throw new customErrors.CurrectInputDataError();
    
    const obj = await model.getCrudQuery(componentId, subSystemId, tableName, queryType, condition);
    if (!obj) throw new customErrors.GetDataError();

    const  result = await model.find(params, obj);
    if (!result) throw new customErrors.CreateDataError();

    return result;
};

const update = async (componentId, subSystemId, tableName, condition, queryType, params) => {
    if (!params || (Array.isArray(params) && !params.length)) throw new customErrors.CurrectInputDataError();

    const obj = await model.getCrudQuery(componentId, subSystemId, tableName, queryType, condition);
    if (!obj) throw new customErrors.GetDataError();

    const result = await model.update(params, obj);

    return true;
};

const remove = async (componentId, subSystemId, tableName, condition, queryType, params) => {
    if (!params || (Array.isArray(params) && !params.length)) throw new customErrors.CurrectInputDataError();
    
    const obj = await model.getCrudQuery(componentId, subSystemId, tableName, queryType, condition);
    if (!obj) throw new customErrors.GetDataError();

    const result = await model.remove(params, obj);
    if (!result) throw new customErrors.RemoveUserError();

    return true;
};

module.exports = {
    find,
    update,
    create,
    remove,
    inquiry,
    componentInquiry,
    getComponentData,
};