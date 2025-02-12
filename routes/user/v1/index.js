const ctrl = require('../../../services/user/v1');
const { schemaTypes, customTypes } = require('../../../lib');

const tags = ['User'];

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
  fastify.get('/inquiry', {
      schema: {
        tags,
        headers,
        querystring: {
          type: 'object',
          properties: {
            pageIndex: schemaTypes.short,
            pageSize: schemaTypes.short,
          },
        },
        response: {
          ...schemaTypes.responses,
        },
      },
  }, ctrl.inquiry);

  //TODO get data from [S00_user_workgroup_organization]
  fastify.get('/find/:id', {
      schema: {
        tags,
        headers,
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: schemaTypes.number,
          }
        },
        response: {
          ...schemaTypes.responses,
        },
      },
  }, ctrl.find);

  
  fastify.post('/register', {
    schema: {
      tags,
      summary: 'sp_S00_user_signup us in db',
      headers,
      body: {
        type: 'object',
        required: ['userName', 'password', 'rePassword', 'isActive','UnitId'],
        properties: {
          userName: schemaTypes.string(3, 50),
          password: schemaTypes.string(3, 200),
          rePassword: schemaTypes.string(3, 200),
          firstName: schemaTypes.string(0, 50),
          lastName: schemaTypes.string(0, 50),
          nationalCode: schemaTypes.string(0, 10),
          personelCode: schemaTypes.string(0, 10),
          cellPhoneNumber: schemaTypes.string(0, 11),
          email: schemaTypes.string(0, 50),
          address: schemaTypes.string(0, 500),
          isActive: schemaTypes.boolean,
          workgroupId: schemaTypes.number,
          organizationId: schemaTypes.number,
          UnitId: schemaTypes.number,
        },
      },
      response: {
        ...schemaTypes.responses,
      },
    }
  }, ctrl.create);

  fastify.post('/updateOrganization', {
    schema: {
      tags,
      summary: 'sp_S00_User_Update us in db',
      headers,
      body: {
        type: 'object',
        required: ['UserId', 'UnitId'],
        properties: {
          UserId: schemaTypes.number,
          UnitId: schemaTypes.number
        },
      },
      response: {
        ...schemaTypes.responses,
      },
    }
  }, ctrl.updateUser);

  fastify.post('/updateUnits', {
    schema: {
      tags,
      summary: 'sp_S00_insertUser_workgroup_organization us in db',
      headers,
      body: {
        type: 'object',
        required: ['UserId', 'json'],
        properties: {
          UserId: schemaTypes.number,
         json:schemaTypes.string(0,5000)
        },
      },
      response: {
        ...schemaTypes.responses,
      },
    }
  }, ctrl.updateUnits);

  fastify.post('/getUserWorkGroup', {
    schema: {
      tags,
      summary: 'sp_S00_getUserWorkGroup us in db',
      headers,
      body: {
        type: 'object',
        required: ['UserId'],
        properties: {
          UserId: schemaTypes.number
        },
      },
      response: {
        ...schemaTypes.responses,
      },
    }
  }, ctrl.getUserWorkGroup);

  fastify.post('/register/extra', {
    schema: {
      tags,
      headers,
      body: {
        type: 'object',
        required: ['id', 'extra'],
        properties: {
          id: schemaTypes.number,
          extra: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                organizationId: schemaTypes.number,
                workgroupId: schemaTypes.number,
              },
            },
          }
        },        
      },
      response: {
        ...schemaTypes.responses,
      },
    }
  }, ctrl.extraDataCreate);

  //TODO get data from [S00_user_workgroup_organization]
  fastify.put('/change/:id', {
    schema: {
      tags,
      headers,
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: schemaTypes.number,
        },
      },
      body: {
        type: 'object',
        properties: {
          userName: schemaTypes.string(0, 50),
          password: schemaTypes.string(0, 200),
          rePassword: schemaTypes.string(0, 200),
          firstName: schemaTypes.string(0, 50),
          lastName: schemaTypes.string(0, 50),
          nationalCode: schemaTypes.string(0, 10),
          personelCode: schemaTypes.string(0, 10),
          cellPhoneNumber: schemaTypes.string(0, 11),
          email: schemaTypes.string(0, 50),
          address: schemaTypes.string(0, 500),
          isActive: schemaTypes.boolean,
          UnitId :schemaTypes.number
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
    }
  }, ctrl.update);

  //TODO get data from [S00_user_workgroup_organization]
  fastify.delete('/remove/:id', {
    schema: {
      tags,
      headers,
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: schemaTypes.number,
        }
      },
      response: {
        ...schemaTypes.responses,
      },
    }
  }, ctrl.remove);

  fastify.get('/organization/find/:id', {
    schema: {
      tags,
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
  }, ctrl.organizationFind);

  fastify.get('/workgroup/find/:id', {
    schema: {
      tags,
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
  }, ctrl.workgroupFind);

  next();
}