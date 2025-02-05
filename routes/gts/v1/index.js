const ctrl = require('../../../services/gts/v1');
const { schemaTypes, customTypes } = require('../../../lib');

const tags = ['GTS'];

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
  fastify.post('/component-data/fetch', {
    schema: {
      tags,
      summary: '>> sp_S00_getComponentData use in db',
      headers,
      body: {
        type: 'object',
        required: ['componentId','userId'],
        properties: {
          componentId: schemaTypes.number,
          masterId: schemaTypes.number,
          masterParentId: schemaTypes.number,
          userId: schemaTypes.number,
          workgroupId: schemaTypes.number,
          organizationId: schemaTypes.number,
          isManager: schemaTypes.boolean,
          PageSize: schemaTypes.number,
          PageNumber: schemaTypes.number,
        },
      },
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.fetch);

  fastify.post('/component-data/create', {
    schema: {
      tags,
      summary: '>> sp_S00_insertComponentData use in db',
      headers,
      body: {
        type: 'object',
        required: ['componentId', 'json','UserId'],
        properties: {
          componentId: schemaTypes.number,
          json: schemaTypes.string(0,4096),
          UserId: schemaTypes.number
        },
      },
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.create);
  
  fastify.delete('/component-data/remove/:componentId/:masterId', {
    schema: {
      tags,
      summary: '>> sp_S00_deleteComponentData use in db',
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
  }, ctrl.remove);
  
  fastify.get('/base/login-page-info/fetch', {
    schema: {
      tags,
      summary: '>> sp_S00_getLoginPageInfo use in db',
      headers,
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.fetchLoginPageInfo);
  
  fastify.post('/base/login-page-info/create', {
    schema: {
      tags,
      summary: '>> sp_S00_insertLoginPageInfo use in db',
      headers,
      body: {
        type: 'object',
        required: ['json'],
        properties: {
          json: schemaTypes.string(0, 9007199254740992),
        },
      },
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.createLoginPageInfo);

  fastify.post('/various-data/fetch', {
    schema: {
      tags,
      summary: '>> sp_S00_getVariousData use in db',
      headers,
      body: {
        type: 'object',
        required: ['json'],
        properties: {
          json: schemaTypes.string(0, 9007199254740992),
          userId: schemaTypes.number,
          workgroupId: schemaTypes.number, 
          organizationId: schemaTypes.number,
          isManager: schemaTypes.boolean,
          PageSize: schemaTypes.number,
          PageNumber: schemaTypes.number
        },
      },
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.fetchVariousData);

  fastify.post('/various-data/create', {
    schema: {
      tags,
      summary: '>> sp_S00_insertVariousData use in db',
      headers,
      body: {
        type: 'object',
        required: ['json'],
        properties: {
          json: schemaTypes.string(0, 9007199254740992),
        },
      },
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.createVariousData);


  next();
}