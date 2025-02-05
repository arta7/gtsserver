const service = require('./service');
const userService = require('../../user/v1/service');
const customErrors = require('../../../lib/custom_errors');

const inquiry = async (req, res) => {
    const { sessionInfo } = req.headers;
    const { pageIndex, pageSize, subId, filters, sorting } = req.body;

    if (!sessionInfo.uid) throw new customErrors.UserNotFoundError();

    const organs = (await userService.findUserExtraData(Number(sessionInfo.uid)));
    if (!organs) throw new customErrors.UserOrganNotFoundError();

    const result = await service.inquiry(organs, pageIndex, pageSize, subId, filters, sorting);

    res.send(result);
};

const getComponentData = async (req, res) => {
    const { 
        componentId, masterId, masterParentId, userId, workgroupId, organizationId, isManager, filter, sortOrderList
    } = req.body;

    const result = await service.getComponentData(componentId, masterId, masterParentId, userId, workgroupId, organizationId, filter, sortOrderList, isManager);

    res.send(result);
};


const create = async (req, res) => {
    const { componentId, subSystemId, tableName, params } = req.body;

    await service.create(componentId, subSystemId, tableName, null, 0, params);

    res.status(204).send('');
};

const componentInquiry = async (req, res) => {
    const { componentId, queryType } = req.params;

    const result = await service.componentInquiry(componentId, queryType);

    res.send(result);
};

const find = async (req, res) => {
    const { componentId, subSystemId, tableName, condition, params } = req.body;

    const result = await service.find(componentId, subSystemId, tableName, condition, 1, params);

    res.send(result);
};

const update = async (req, res) => {
    const { componentId, subSystemId, tableName, params } = req.body;

    await service.update(componentId, subSystemId, tableName, 'ById', 2, params);

    res.status(204).send('');
};

const remove = async (req, res) => {
    const { componentId, subSystemId, tableName, params } = req.body;

    await service.remove(componentId, subSystemId, tableName, 'ById', 3, params);

    res.status(204).send('');
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