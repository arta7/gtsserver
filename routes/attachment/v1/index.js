const ctrl = require('../../../services/attachment/v1');
const { schemaTypes, customTypes } = require('../../../lib');

const tags = ['Attachment'];

const tokenHeader = {
    authorization: { type: 'string', maxLength: 4096 },
};

const headers = {
    type: 'object',
    required: ['authorization'],
    properties: {
      ...tokenHeader,
    }
};

module.exports = (fastify, options, next) => {
  fastify.delete('/remove/:id', {
    schema: {
      tags,
      summary: '>> sp_S00_deleteAttachment use in db',
      headers,
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: schemaTypes.number,
        },
      },
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.remove);

  fastify.get('/fetch/:componentId/:ownerId', {
    schema: {
      tags,
      summary: '>> sp_S00_getAttachment use in db',
      headers,
      params: {
        type: 'object',
        required: ['componentId', 'ownerId'],
        properties: {
          componentId: schemaTypes.number,
          ownerId: schemaTypes.number,
        },
      },
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.fetch);

  fastify.post('/create', {
    schema: {
      tags,
      summary: '>> sp_S00_insertAttachment use in db',
      headers,
      body: {
        type: 'object',
        required: ['componentId', 'ownerId', 'fileName', 'fileExtension', 'fileContent', 'fileSize', 'attachmentType', 'componentName'],
        properties: {
          componentId: schemaTypes.number,
          ownerId: schemaTypes.number,
          fileName: schemaTypes.string(2, 100),
          fileExtension: schemaTypes.string(1, 5),
          fileContent: schemaTypes.string(2, 2147483647),
          fileSize: schemaTypes.number,
          attachmentType: schemaTypes.string(2, 100),
          componentName: schemaTypes.string(2, 100),
        },
      },
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.create);

  fastify.get('/master-grid/fetch/:componentId/:masterId', {
    schema: {
      tags,
      summary: '>> sp_S00_getMasterGridAttachment use in db',
      headers,
      params: {
        type: 'object',
        required: ['componentId', 'masterId'],
        properties: {
          componentId: schemaTypes.number,
          masterId: schemaTypes.number,
        },
      },
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.masterGridFetch);

  next();
}