// const uuid = require('uuid');
// const messaging = require('../../../lib/messageing');
// const customErrors = require('../../../lib/custom_errors');
const service = require('./service');

const remove = async (req, res) => {
    const { id } = req.params;

    await service.remove(id);

    res.status(204).send('');
};

const fetch = async (req, res) => {
    const { componentId, ownerId } = req.params;

    const result = await service.fetch(componentId, ownerId);

    res.send(result);
};

const create = async (req, res) => {
    const { componentId, ownerId, fileName, fileExtension, fileContent, fileSize, attachmentType, componentName } = req.body;

    const result = await service.create(componentId, ownerId, fileName, fileExtension, fileContent, fileSize, attachmentType, componentName);

    res.send(result);
};

const masterGridFetch = async (req, res) => {
    const { componentId, masterId } = req.params;

    const result = await service.masterGridFetch(componentId, masterId);

    res.send(result);
};

module.exports = {
    remove,
    create,
    fetch,
    masterGridFetch,
};