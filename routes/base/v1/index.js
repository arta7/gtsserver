const ctrl = require('../../../services/base/v1');
const { schemaTypes, customTypes } = require('../../../lib');

const tags = ['Base Data'];

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
  fastify.get('/system/inquiry', {
    schema: {
      tags,
      summary: '>> sp_S00_getMenuItems use in db',
      headers,
      response: {
        ...schemaTypes.responses,
      }
    },
  }, ctrl.systemInquiry);


  fastify.post('/system/inquiry2', {
    schema: {
      tags,
      summary: '>> sp_S00_getMenuItems2 use in db',
      headers,
      body: {
        type: 'object',
        required: ['UserId'],
        properties: {
          parentId: schemaTypes.number
        },
      },
      response: {
        ...schemaTypes.responses,
      }
    },
  }, ctrl.menuItemsFetchWithId);

  fastify.post('/organization/create', {
    schema: {
      tags,
      headers,
      body: {
        type: 'object',
        required: ['parentId', 'code', 'name', 'isActive'],
        properties: {
          parentId: schemaTypes.number,
          code: schemaTypes.string(3, 50),
          name: schemaTypes.string(3, 100),
          isActive: schemaTypes.boolean,
        },
      },
      response: {
        ...schemaTypes.responses,
      }
    },
  }, ctrl.organizationCreate);

  fastify.get('/organization/inquiry', {
    schema: {
      tags,
      headers,
      response: {
        ...schemaTypes.responses,
      }
    },
  }, ctrl.organizationInquiry);

  fastify.put('/organization/change/:id', {
    schema: {
      tags,
      headers,
      params: {
        type: 'object',
        properties: {
          id: schemaTypes.number
        },
      },
      body: {
        type: 'object',
        required: ['parentId'],
        properties: {
          parentId: schemaTypes.number,
          code: schemaTypes.string(3, 50),
          name: schemaTypes.string(3, 100),
          isActive: schemaTypes.boolean,
        },
      },
      response: {
        ...schemaTypes.responses,
      }
    },
  }, ctrl.organizationUpdate);

  fastify.delete('/organization/remove/:id', {
    schema: {
      tags,
      headers,
      params: {
        type: 'object',
        properties: {
          id: schemaTypes.number
        },
      },
      response: {
        ...schemaTypes.responses,
      }
    },
  }, ctrl.organizationRemove);

  fastify.get('/organization/find/:parentId', {
    schema: {
      tags,
      headers,
      params: {
        type: 'object',
        properties: {
          parentId: schemaTypes.number
        },
      },
      response: {
        ...schemaTypes.responses,
      }
    },
  }, ctrl.organizationRelatedFindById);

  fastify.post('/workgroup/create', {
    schema: {
      tags,
      headers,
      body: {
        type: 'object',
        required: ['name', 'isManager', 'isActive'],
        properties: {
          name: schemaTypes.string(3, 50),
          isManager: schemaTypes.boolean,
          isActive: schemaTypes.boolean,
        },
      },
      response: {
        ...schemaTypes.responses,
      }
    },
  }, ctrl.workgroupCreate);

  fastify.put('/workgroup/change/:id', {
    schema: {
      tags,
      headers,
      params: {
        type: 'object',
        properties: {
          id: schemaTypes.number
        },
      },
      body: {
        type: 'object',
        properties: {
          id: schemaTypes.number,
          name: schemaTypes.string(3, 50),
          isManager: schemaTypes.boolean,
          isActive: schemaTypes.boolean
          //,UnitId:schemaTypes.number,
        },
      },
      response: {
        ...schemaTypes.responses,
      }
    },
  }, ctrl.workgroupUpdate);

  fastify.post('/workgroup/componnent/create', {
    schema: {
      tags,
      headers,
      body: {
        type: 'object',
        required: ['workgroupId', 'componentIds'],
        properties: {
          workgroupId: schemaTypes.number,
          componentIds: {
            type: 'array',
            items: schemaTypes.number,
          },
        },
      },
      response: {
        ...schemaTypes.responses,
      }
    },
  }, ctrl.workgroupComponentCreate);

  fastify.post('/workgroup/component/Delete', {
    schema: {
      tags,
      headers,
      body: {
        type: 'object',
        required: ['workgroupId'],
        properties: {
          workgroupId: schemaTypes.number,
        },
      },
      response: {
        ...schemaTypes.responses,
      }
    },
  }, ctrl.workgroupComponentDelete);

  fastify.put('/workgroup/componnent/change/:workgroupId', {
    schema: {
      tags,
      headers,
      params: {
        type: 'object',
        required: ['workgroupId'],
        properties: {
          workgroupId: schemaTypes.number
        },
      },
      body: {
        type: 'object',
        required: ['componentIds'],
        properties: {
          componentIds: {
            type: 'array',
            items: schemaTypes.number,
          },
        },
      },
      response: {
        ...schemaTypes.responses,
      }
    },
  }, ctrl.workgroupComponentUpdate);

  fastify.get('/workgroup/inquiry', {
    schema: {
      tags,
      headers,
      response: {
        ...schemaTypes.responses,
      }
    },
  }, ctrl.workgroupInquiry);

  fastify.delete('/workgroup/remove/:id', {
    schema: {
      tags,
      headers,
      params: {
        type: 'object',
        properties: {
          id: schemaTypes.number
        },
      },
      response: {
        ...schemaTypes.responses,
      }
    },
  }, ctrl.workgroupRemove);

  fastify.get('/definition/inquiry', {
    schema: {
      tags,
      headers,
      response: {
        ...schemaTypes.responses,
      }
    },
  }, ctrl.definitionInquiry);

  fastify.post('/definition/create', {
    schema: {
      tags,
      headers,
      body: {
        type: 'object',
        required: ['name', 'baseDefinitionType', 'subSystems'],
        properties: {
          name: schemaTypes.string(3, 100),
          baseDefinitionType: schemaTypes.short,
          sortOrder: schemaTypes.number,
          // isFixed: schemaTypes.boolean,
          subSystems: {
            type: 'array',
            items: schemaTypes.number,
          },
        },
      },
      response: {
        ...schemaTypes.responses,
      }
    },
  }, ctrl.definitionCreate);

  fastify.put('/definition/change/:id', {
    schema: {
      tags,
      headers,
      params: {
        type: 'object',
        properties: {
          id: schemaTypes.number
        },
      },
      body: {
        type: 'object',
        properties: {
          name: schemaTypes.string(3, 100),
          baseDefinitionType: schemaTypes.short,
        },
      },
      response: {
        ...schemaTypes.responses,
      }
    },
  }, ctrl.definitionUpdate);

  fastify.delete('/definition/remove/:id', {
    schema: {
      tags,
      headers,
      params: {
        type: 'object',
        properties: {
          id: schemaTypes.number
        },
      },
      response: {
        ...schemaTypes.responses,
      }
    },
  }, ctrl.definitionRemove);

  fastify.get('/dictionary/inquiry/:type', {
    schema: {
      tags,
      headers,
      params: {
        type: 'object',
        required: ['type'],
        properties: {
          type: schemaTypes.string(1, 10),
        },
      },
      response: {
        ...schemaTypes.responses,
      }
    },
  }, ctrl.dictionaryInquiry);

  fastify.get('/rule/inquiry', {
    schema: {
      tags,
      headers,
      response: {
        ...schemaTypes.responses,
      }
    },
  }, ctrl.ruleInquiry);

  fastify.get('/fileds/find', {
    schema: {
      tags,
      headers,
      querystring: {
        type: 'object',
        required: ['componentId'],
        properties: {
          componentId: schemaTypes.number,
        },
      },
      response: {
        ...schemaTypes.responses,
      }
    },
  }, ctrl.filedsFind);

  fastify.get('/base-type/inquiry', {
    schema: {
      tags,
      headers,
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.baseTypeInquiry);

  fastify.get('/sub-system/base-type/find/:id', {
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
  }, ctrl.subSystemBaseTypeFind);

  fastify.get('/component/get-dropdown-data', {
    schema: {
      tags,
      summary: 'sp_S00_getDropDownData use in db',
      headers,
      querystring: {
        type: 'object',
        required: ['uiComponentId'],
        properties: {
          uiComponentId: schemaTypes.number,
          masterSelecteItemId: schemaTypes.number,
          masterId: schemaTypes.number,
          masterParentId: schemaTypes.number,
          masterSelectedItemValue: schemaTypes.number,
        },
      },
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.getDropdownData);

  fastify.get('/component/structure/find', {
    schema: {
      tags,
      summary: '>> sp_S00_getComponentChildren use in db',
      headers,
      querystring: {
        type: 'object',
        required: ['subId'],
        properties: {
          subId: schemaTypes.number,
          componentId: schemaTypes.number,
        },
      },
      response: {
        ...schemaTypes.responses,
      }
    },
  }, ctrl.componentStructureFind);

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
  }, ctrl.componentDataCreate);

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
  }, ctrl.componentDataFind);

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
  }, ctrl.componentDataUpdate);
  
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
  }, ctrl.componentDataRemove);

  fastify.get('/menu/items/fetch', {
    schema: {
      tags,
      summary: '>> sp_S00_getMenuItems use in db',
      headers,
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.menuItemsFetch);

  

  next();
}