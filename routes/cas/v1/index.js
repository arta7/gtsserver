const ctrl = require('../../../services/messaging/v1');
const schemaTypes = require('../../../lib/schemaTypes');

const tags = ['Messaging'];

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
  fastify.post('/submit', {
    schema: {
      tags,
      headers,
      body: {
        type: 'object',
        required: ['cellPhoneNumber'],
        properties: {
          cellPhoneNumber: schemaTypes.number,
        },
      },
      response: {
        ...schemaTypes.responses,
      },
    }
  }, ctrl.submit);

  fastify.post('/confirm', {
    schema: {
      tags,
      headers,
      body: {
        type: 'object',
        required: ['cellPhoneNumber', 'code'],
        properties: {
          cellPhoneNumber: schemaTypes.number,
          code: schemaTypes.number,
        },
      },
      response: {
        ...schemaTypes.responses,
      },
    }
  }, ctrl.confirm);

  next();
}