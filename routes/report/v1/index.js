const ctrl = require('../../../services/report/v1');
const { schemaTypes, customTypes } = require('../../../lib');

const tags = ['Report'];

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
  fastify.post('/loadReport', {
      schema: {
        tags,
        headers,
        body: {
          type: 'object',
          required: ['fileType', 'exclusiveReportId', 'userId', 'workgroupId', 'organizationId', 'isManager'],
          properties: {
            fileType: schemaTypes.fileType,
            exclusiveReportId: schemaTypes.number,
            userId: schemaTypes.number,
            workgroupId: schemaTypes.number,
            organizationId: schemaTypes.number,
            isManager: schemaTypes.boolean,
            // PageSize: schemaTypes.number,
            // PageNumber: schemaTypes.number,
          },
        },
        response: {
          ...schemaTypes.responses,
        },
      },
  }, ctrl.loadReport);

  fastify.delete('/remove/:reportId', {
      schema: {
        tags,
        summary: '>> sp_S00_deleteExclusiveReport use in db',
        headers,
        params: {
          type: 'object',
          required: ['reportId'],
          properties: {
            reportId: schemaTypes.number,
          },
        },
        response: {
          ...schemaTypes.responses,
        },
      },
  }, ctrl.remove);

  fastify.get('/get-component/:systemId/:subSystemId', {
    schema: {
      tags,
      summary: '>> sp_S00_getComponentForExclusiveReport use in db',
      headers,
      params: {
        type: 'object',
        required: ['subSystemId', 'systemId'],
        properties: {
          subSystemId: schemaTypes.number,
          systemId: schemaTypes.number
        },
      },
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.getComponent);

  fastify.get('/get-component-field/:componentId', {
    schema: {
      tags,
      summary: '>> sp_S00_getComponentFieldForExclusiveReport use in db',
      headers,
      params: {
        type: 'object',
        required: ['componentId'],
        properties: {
          componentId: schemaTypes.number,
        },
      },
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.getComponentField);

  fastify.post('/get-report-data', {
    schema: {
      tags,
      summary: '>> sp_S00_getExclusiveReportData use in db',
      headers,
      body: {
        type: 'object',
        required: ['exclusiveReportId', 'userId', 'workgroupId', 'organizationId', 'isManager', 'PageSize', 'PageNumber'],
        properties: {
          exclusiveReportId: schemaTypes.number,
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
  }, ctrl.getReportDate);

  fastify.get('/get-report-detail/:reportId', {
    schema: {
      tags,
      summary: '>> sp_S00_getExclusiveReportDetail use in db',
      headers,
      params: {
        type: 'object',
        required: ['reportId'],
        properties: {
          reportId: schemaTypes.number,
        },
      },
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.getReportDetail);

  fastify.get('/get-report-list/:componentId', {
    schema: {
      tags,
      summary: '>> sp_S00_getExclusiveReportList use in db',
      headers,
      params: {
        type: 'object',
        required: ['componentId'],
        properties: {
          componentId : schemaTypes.number,
        },
      },
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.getReportList);

  fastify.get('/get-report-structure/:reportId', {
    schema: {
      tags,
      summary: '>> sp_S00_getExclusiveReportStructure use in db',
      headers,
      params: {
        type: 'object',
        required: ['reportId'],
        properties: {
          reportId : schemaTypes.number,
        },
      },
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.getReportStructure);

  fastify.post('/create', {
    schema: {
      tags,
      summary: '>> sp_S00_insertExclusiveReport use in db',
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
  }, ctrl.create);

  fastify.post('/get-specific-report-data', {
    schema: {
      tags,
      summary: '>> sp_S00_getStatisticsReportData use in db',
      headers,
      body: {
        type: 'object',
        required: ['userId', 'workgroupId' , 'organizationId'],
        properties: {
          subSystemId: schemaTypes.number,
	        statisticsReportId: schemaTypes.number,
	        userId: schemaTypes.number,
	        workgroupId: schemaTypes.number,
	        organizationId: schemaTypes.number,
	        isManager: schemaTypes.boolean,
	        json: schemaTypes.string(0, 9007199254740992),
        },
      },
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.getStatisticsReportData);

  next();
}