const ctrl = require('../../../services/authentication/v1');
const { schemaTypes, customTypes } = require('../../../lib');

const tags = ['Authorization'];

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
  fastify.post('/login', {
    schema: {
      tags,
      headers,
      body: {
        type: 'object',
        required: ['userName', 'password'],
        properties: {
          userName: schemaTypes.string(3, 50),
          password: schemaTypes.string(3, 200),
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            ...customTypes.userProps,
          },
        },
        ...schemaTypes.responses,
      },
    },
  }, ctrl.login);

  fastify.post('/logout', {
    schema: {
      tags,
      headers,
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.logout);

  fastify.get('/get-token', {
    schema: {
      tags,
      headers: {
        type: 'object',
        required: ['publicKey'],
        properties: {
          publicKey: schemaTypes.string(50, 4069),
        },
      },
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.getToken);

  fastify.get('/check-login-status', {
    schema: {
      tags,
      headers,
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.checkLoginStatus);

  next();
}