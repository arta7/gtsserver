const uuid = require('uuid');
const config = require('../../../config');
const customErrors = require('../../../lib/custom_errors');
const service = require('./service');
const { utils, commonModules } = require('../../../lib');

const fetch = async (req, res) => {
    const { 
        componentId, masterId, masterParentId, userId, workgroupId, organizationId, isManager, PageSize, PageNumber,
    } = req.body;

    const result = await service.fetch(componentId, masterId, masterParentId, userId, workgroupId, organizationId, isManager, PageSize, PageNumber);

    res.send(result);
};

const create = async (req, res) => {
    const { componentId, json,UserId } = req.body;


    console.log('json data',json)

    const result = await service.create(componentId, json,UserId);

    res.send(result);
};

const remove = async (req, res) => {
    const { componentId, masterId } = req.params;

    const result = await service.remove(componentId, masterId);

    res.status(204).send('');
};

const fetchLoginPageInfo = async (req, res) => {
    const result = await service.fetchLoginPageInfo();

    res.send(result);
};

const createLoginPageInfo = async (req, res) => {
    const { json } = req.body;

    const result = await service.createLoginPageInfo(json);

    res.send(result);
};

const fetchVariousData = async (req, res) => {
    const { 
        json, userId, workgroupId, organizationId, isManager, PageSize, PageNumber,
    } = req.body;

    const result = await service.fetchVariousData(json, userId, workgroupId, organizationId, isManager, PageSize, PageNumber);

    res.send(result);
};

const createVariousData = async (req, res) => {
    const { json } = req.body;

    const result = await service.createVariousData(json);

    res.send(result);
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