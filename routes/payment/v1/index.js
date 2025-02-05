const ctrl = require('../../../services/payment/v1');
const { schemaTypes } = require('../../../lib');

const tags = ['PAYMENT'];

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
  fastify.post('/gardesh-pay/get-token', {
    schema: {
      tags,
      // summary: '>> sp_S00_getComponentData use in db',
      headers,
      body: {
        type: 'object',
        required: ['amount'],
        properties: {
          amount: schemaTypes.stringNu(0, 20),
          // invoiceNumber: schemaTypes.string(0, 100),
          // invoiceDate: schemaTypes.string(0, 50, 'YYYY-MM-DDTHH:mm:ss'),
          mobile: schemaTypes.stringNu(11, 11),
          email: schemaTypes.string(0, 100),
        },
      },
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.gardeshPayGetToken);

  fastify.get('/gardesh-pay/redirect/:url/:token', {
    schema: {
      tags,
      summary: 'Url and token given last step should be joined with a forward slash and then redirected to',
      headers,
      params: {
        type: 'object',
        required: ['url', 'token'],
        properties: {
          url: schemaTypes.string(20, 500),
          token: schemaTypes.string(10, 2000)
        },
      },
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.gardeshPayRedirect);

  fastify.get('/gardesh-pay/callback/:trackingNumber/:invoiceNumber', {
    schema: {
      tags,
      // summary: '>> sp_S00_getComponentData use in db',
      headers,
      params: {
        type: 'object',
        required: ['trackingNumber', 'invoiceNumber'],
        properties: {
          trackingNumber: schemaTypes.string(0, 100),
          invoiceNumber: schemaTypes.string(0, 100),
        },
      },
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.gardeshPayCallback);

  fastify.post('/gardesh-pay/verify', {
    schema: {
      tags,
      // summary: '>> sp_S00_getComponentData use in db',
      headers,
      body: {
        type: 'object',
        required: ['trackingNumber'],
        properties: {
          trackingNumber: schemaTypes.string(1, 100),
        },
      },
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.gardeshPayVerify);
  
  next();
}