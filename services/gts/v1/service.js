const model = require('./model');
const { utils } = require('../../../lib');
const customErrors = require('../../../lib/custom_errors');

const fetch = async (componentId, masterId, masterParentId, userId, workgroupId, organizationId, isManager, PageSize, PageNumber) => {
    const result = await model.fetch(componentId, masterId, masterParentId, userId, workgroupId, organizationId, isManager, PageSize, PageNumber);

    return result;
};

const create = async (componentId, json,UserId) => {
    const result = utils.convertSqlJsonResult(await model.create(componentId, json,UserId));

    return result;
};

const remove = async (componentId, masterId) => {
    const result = await model.remove(componentId, masterId);

    if (!result) throw new customErrors.RemoveBaseDataError();

    return true;
};

const fetchLoginPageInfo = async () => {
    // const result =  await model.fetchLoginPageInfo();
    const result =  utils.convertSqlJsonResult(await model.fetchLoginPageInfo());

    return result;
};

const createLoginPageInfo = async (json) => {
    // const result = utils.convertSqlJsonResult(await model.createLoginPageInfo(json));
    const result = await model.createLoginPageInfo(json)
    
    return result;
};

const fetchVariousData = async (json, userId, workgroupId, organizationId, isManager, PageSize, PageNumber) => {
    const result = utils.convertSqlJsonResult(await model.fetchVariousData(json, userId, workgroupId, organizationId, isManager, PageSize, PageNumber));
    
    return result;
};

const createVariousData = async (json) => {
    const result = await model.createVariousData(json);
    
    return result;
};

module.exports = {
    fetch,
    create,
    remove,
    fetchVariousData,
    createVariousData,
    fetchLoginPageInfo,
    createLoginPageInfo,
};