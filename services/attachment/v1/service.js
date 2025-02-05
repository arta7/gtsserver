const model = require('./model');
const { utils, commonModules } = require('../../../lib');
const  customErrors = require('../../../lib/custom_errors');
// const config = require('../../../config');

const remove = async (id) => {
    const result = await model.remove(id);
    if (!result) throw new customErrors.RemoveBaseDataError();

    return true;
};

const fetch = async (componentId, ownerId) => {
    const result =await model.fetch(componentId, ownerId);   

    return result;
};

const create = async (componentId, ownerId, fileName, fileExtension, fileContent, fileSize, attachmentType, componentName) => {
    const result = utils.convertSqlJsonResult(await model.create(componentId, ownerId, fileName, fileExtension, fileContent, fileSize, attachmentType, componentName));   

    return result;
};

const masterGridFetch = async (componentId, masterId) => {
    const result = utils.convertSqlJsonResult(await model.masterGridFetch(componentId, masterId));   

    return result;
};

module.exports = {
    remove,
    create,
    fetch,
    masterGridFetch,
};