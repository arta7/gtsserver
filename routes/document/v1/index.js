const ctrl = require('../../../services/document/v1');
const schemaTypes = require('../../../lib/schemaTypes');

const tags = ['Document'];

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
  fastify.post('/inquiry', {
    schema: {
      tags,
      headers,
      body: {
        type: 'object',
        required: ['subId'],
        properties: {
          pageIndex: schemaTypes.short,
          pageSize: schemaTypes.short,
          subId: schemaTypes.number,
          filters: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                key: schemaTypes.string(0,50),
                value: schemaTypes.string(0,50),
              },
            },
          },
          sorting: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                key: schemaTypes.string(0,50),
                value: schemaTypes.string(0,50),
              },
            },
          },
        },
      },
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.inquiry);

  fastify.post('/get-component-data', {
    schema: {
      tags,
      headers,
      body: {
        type: 'object',
        required: ['componentId'],
        properties: {
          componentId: schemaTypes.number,
          masterId: schemaTypes.number,
          masterParentId: schemaTypes.number,
          userId: schemaTypes.number,
          workgroupId: schemaTypes.number,
          organizationId: schemaTypes.number,
          isManager: schemaTypes.boolean,
          filter: schemaTypes.string(0, 4069),
          sortOrderList: schemaTypes.string(0, 4069),
        },
      },
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.getComponentData);

  fastify.post('/component/data/create', {
    schema: {
      tags,
      headers,
      body: {
        type: 'object',
        required: ['componentId', 'subSystemId', 'tableName', 'params'],
        properties: {
          componentId: schemaTypes.number,
          subSystemId: schemaTypes.number,
          tableName: schemaTypes.string(1, 255),
          params: {
            type: 'array',
            items: {
              type: 'object',
              properties:{
                key: schemaTypes.string(1, 255),
                value: schemaTypes.string(1, 4096)
              },
            },
          },
        },
      },
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.create);

  // fastify.get('/component-data/inquiry/:componentId/:queryType', {
  //   schema: {
  //     tags,
  //     headers,
  //     params: {
  //       type: 'object',
  //       required: ['componentId', 'queryType'],
  //       properties: {
  //         componentId: schemaTypes.number,
  //         queryType: schemaTypes.short,
  //       },
  //     },
  //     response: {
  //       ...schemaTypes.responses,
  //     },
  //   },
  // }, ctrl.componentInquiry);

  fastify.post('/component/data/find', {
    schema: {
      tags,
      headers,
      body: {
        type: 'object',
        required: ['componentId', 'subSystemId', 'condition', 'tableName', 'params'],
        properties: {
          componentId: schemaTypes.number,
          subSystemId: schemaTypes.number,
          condition: schemaTypes.string(1, 255),
          tableName: schemaTypes.string(1, 255),
          params: {
            type: 'array',
            items: {
              type: 'object',
              properties:{
                key: schemaTypes.string(1, 255),
                value: schemaTypes.string(1, 4096)
              },
            },
          },
        },
      },
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.find);

  fastify.put('/component/data/change', {
    schema: {
      tags,
      headers,
      body: {
        type: 'object',
        required: ['componentId', 'subSystemId', 'tableName', 'params'],
        properties: {
          componentId: schemaTypes.number,
          subSystemId: schemaTypes.number,
          tableName: schemaTypes.string(1, 255),
          params: {
            type: 'array',
            items: {
              type: 'object',
              properties:{
                key: schemaTypes.string(1, 255),
                value: schemaTypes.string(1, 4096)
              },
            },
          },
        },
      },
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.update);

  fastify.delete('/component/data/remove', {
    schema: {
      tags,
      headers,
      body: {
        type: 'object',
        required: ['componentId', 'subSystemId', 'tableName', 'params'],
        properties: {
          componentId: schemaTypes.number,
          subSystemId: schemaTypes.number,
          tableName: schemaTypes.string(1, 255),
          params: {
            type: 'array',
            items: {
              type: 'object',
              properties:{
                key: schemaTypes.string(1, 255),
                value: schemaTypes.string(1, 4096)
              },
            },
          },
        },
      },
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.remove);

  next();
}