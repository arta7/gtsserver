const ctrl = require('../../../services/sjm/v1');
const { schemaTypes, customTypes } = require('../../../lib');

const tags = ['SJM'];

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
  // fastify.get('/get-token', {
  //   schema: {
  //     tags,
  //     headers,
  //     response: {
  //       ...schemaTypes.responses,
  //     },
  //   },
  // }, ctrl.getToken);

  fastify.get('/get-mobile/:nationalCode', {
    schema: {
      tags,
      summary: 'A1- FRN-SJM-DOC-getMobile-1.0/ 1',
      headers,
      params: {
        type: 'object',
        required: ['nationalCode'],
        properties: {
          nationalCode: schemaTypes.string(10, 10),
          // sjmt: schemaTypes.string(100, 4090),
        },
      },
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.getMobile);

  fastify.get('/check-individual-sjm-status/:nationalCode', {
    schema: {
      tags,
      summary: 'A2- FRN-SJM-DOC-IS-1.0/ 1',
      headers,
      params: {
        type: 'object',
        required: ['nationalCode'],
        properties: {
          nationalCode: schemaTypes.string(10, 10),
          // sjmt: schemaTypes.string(100, 4090),
        },
      },
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.checkIndividualSjmStatus);

  fastify.get('/get-individual-sjm-status/:nationalCode', {
    schema: {
      tags,
      summary: 'A3- FRN-SJM-DOC-SS-1.1/ 1',
      headers,
      params: {
        type: 'object',
        required: ['nationalCode'],
        properties: {
          nationalCode: schemaTypes.string(10, 10),  
        },
      },
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.getIndividualSjmStatus);

  fastify.get('/countries', {
    schema: {
      tags,
      summary: 'A5- FRN-SJM-DOC-BS-2.2/ 2',
      headers,
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.getCountries);

  fastify.post('/provinces', {
    schema: {
      tags,
      summary: 'A5- FRN-SJM-DOC-BS-2.2/ 3',
      headers,
      body: {
        type: 'object',
        required: ['countryId'],
        properties: {
          countryId: schemaTypes.number,  
        },
      },
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.getProvinces);

  fastify.post('/cities', {
    schema: {
      tags,
      summary: 'A5- FRN-SJM-DOC-BS-2.2/ 4',
      headers,
      body: {
        type: 'object',
        required: ['countryId', 'provinceId'],
        properties: {
          countryId: schemaTypes.number,
          provinceId: schemaTypes.number,  
        },
      },
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.getCities);

  fastify.post('/sections', {
    schema: {
      tags,
      summary: 'A5- FRN-SJM-DOC-BS-2.2/ 5',
      headers,
      body: {
        type: 'object',
        required: ['countryId', 'provinceId', 'cityId'],
        properties: {
          countryId: schemaTypes.number,
          provinceId: schemaTypes.number,
          cityId: schemaTypes.number, 
        },
      },
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.getSections);

  fastify.get('/jobs', {
    schema: {
      tags,
      summary: 'A5- FRN-SJM-DOC-BS-2.2/ 6',
      headers,
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.getJobs);

  fastify.get('/banks', {
    schema: {
      tags,
      summary: 'A5- FRN-SJM-DOC-BS-2.2/ 7',
      headers,
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.getBanks);

  fastify.get('/financial-brokers', {
    schema: {
      tags,
      summary: 'A5- FRN-SJM-DOC-BS-2.2/ 8',
      headers,
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.getFinancialBrokers);

  fastify.get('/authenticate-offices', {
    schema: {
      tags,
      summary: 'A5- FRN-SJM-DOC-BS-2.2/ 9',
      headers,
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.getAuthenticateOffices);

  fastify.post('/kycOtp', {
    schema: {
      tags,
      summary: 'A6- FRN-SJM-DOC-KYC-3.5/ 1',
      headers,
      body: {
        type: 'object',
        required: ['nationalCode'],
        properties: {
          nationalCode: schemaTypes.string(10, 10),  
        },
      },
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.kycOtp);

  fastify.post('/get-profile', {
    schema: {
      tags,
      summary: 'A6- FRN-SJM-DOC-KYC-3.5/ 2',
      headers,
      body: {
        type: 'object',
        required: ['nationalCode', 'code'],
        properties: {
          nationalCode: schemaTypes.string(10, 10),
          code: schemaTypes.string(4, 10),
        },
      },
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.getProfile);

  fastify.get('/get-signature/:nationalCode', {
    schema: {
      tags,
      summary: 'A7- FRN-SJM-DOC-Sign-1.0/ 1',
      headers,
      params: {
        type: 'object',
        required: ['nationalCode'],
        properties: {
          nationalCode: schemaTypes.string(10, 10),
        },
      },
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.getSignature);

  fastify.get('/serve-file/:fileName', {
    schema: {
      tags,
      summary: 'A7- FRN-SJM-DOC-Sign-1.0/ 2',
      headers,
      params: {
        type: 'object',
        required: ['fileName'],
        properties: {
          fileName: schemaTypes.string(20, 4096),
        },
      },
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.serveFile);

  fastify.get('/get-services', {
    schema: {
      tags,
      summary: 'FRN-ACO-DOC-OnlinePaymentWithFGM-1.2/ 2',
      headers,
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.getServices);

  fastify.get('/get-services/:id', {
    schema: {
      tags,
      summary: 'FRN-ACO-DOC-OnlinePaymentWithFGM-1.2/ 3',
      headers,
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: schemaTypes.string(1, 500),
        },
      },
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.getServicesById);

  fastify.post('/get-payment-token', {
    schema: {
      tags,
      summary: 'FRN-ACO-DOC-OnlinePaymentWithFGM-1.2/ 4',
      headers,
      body: {
        type: 'object',
        required: ['serviceId', 'amount', 'isCalculatedAmount', 'orderId'],
        properties: {
          serviceId: schemaTypes.string(1, 500),
          amount: schemaTypes.number,
          isCalculatedAmount: schemaTypes.boolean,
          orderId: schemaTypes.string(0, 100)
        },
      },
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.getPaymentToken);

  fastify.post('/payments-verify', {
    schema: {
      tags,
      summary: 'FRN-ACO-DOC-OnlinePaymentWithFGM-1.2/ 5',
      headers,
      body: {
        type: 'object',
        required: ['paymentToken'],
        properties: {
          paymentToken: schemaTypes.string(50, 4096),
        },
      },
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.paymentsVerify);

  fastify.post('/check-payment-status', {
    schema: {
      tags,
      summary: 'FRN-ACO-DOC-OnlinePaymentWithFGM-1.2/ 6',
      headers,
      body: {
        type: 'object',
        required: ['orderId', 'serviceId'],
        properties: {
          orderId: schemaTypes.string(2,20),
          serviceId: schemaTypes.string(0, 500)
        },
      },
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.checkPaymentStatus);

  fastify.post('/payment-factor', {
    schema: {
      tags,
      summary: 'FRN-ACO-DOC-OnlinePaymentWithFGM-1.2/ 7',
      headers,
      body: {
        type: 'object',
        required: ['orderId', 'serviceId', 'fullName', 'nationalCode', 'mobile', 'address', 'profileOwnerType','postalCode'],
        properties: {
          orderId: schemaTypes.string(2,20),
          serviceId: schemaTypes.string(2,500),
          fullName: schemaTypes.string(2,50),
          nationalCode: schemaTypes.string(10,10),
          mobile: schemaTypes.string(11,11),
          address: schemaTypes.string(0,1000),
          profileOwnerType: schemaTypes.string(0,100),
          postalCode: schemaTypes.string(2,20),
        },
      },
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.paymentFactor);

  fastify.post('/authenticator-otp', {
    schema: {
      tags,
      summary: 'FRN-SJM-DOC-AT-4.4/ 1',
      headers,
      body: {
        type: 'object',
        required: ['traceCode', 'nationalCode'],
        properties: {
          traceCode: schemaTypes.string(2,20),
          nationalCode: schemaTypes.string(10,10),
        },
      },
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.authenticatorOtp);

  fastify.post('/get-individual-profile', {
    schema: {
      tags,
      summary: 'FRN-SJM-DOC-AT-4.4/ 2',
      headers,
      body: {
        type: 'object',
        required: ['traceCode', 'nationalCode', 'code'],
        properties: {
          traceCode: schemaTypes.string(2,20),
          nationalCode: schemaTypes.string(10,10),
          code: schemaTypes.string(4, 10),
        },
      },
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.getIndividualProfile);

  fastify.post('/authenticator-status', {
    schema: {
      tags,
      summary: 'FRN-SJM-DOC-AT-4.4/ 3',
      headers,
      body: {
        type: 'object',
        required: ['traceCode', 'nationalCode', 'issuerOtp', 'issuerReference', 'privatePersonImage', 'privatePersonSignature'],
        properties: {
          traceCode: schemaTypes.string(2,20),
          nationalCode: schemaTypes.string(10,10),
          issuerOtp: schemaTypes.string(20, 500),
          issuerReference: schemaTypes.string(1, 50),
          privatePersonImage: schemaTypes.string(100, 100000),
          privatePersonSignature: schemaTypes.string(100, 100000),
        },
      },
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.authenticatorStatus);

  fastify.post('/authenticator/profiles/postIds', {
    schema: {
      tags,
      summary: 'FRN-SJM-DOC-AT-4.4/ 4',
      headers,
      body: {
        type: 'array',
        items:{
          type: 'object',
          required: ['referenceNumber', 'uniqueIdentifier', 'postId'],
          properties: {  
            referenceNumber: schemaTypes.string(2,20),
            uniqueIdentifier: schemaTypes.string(10,10),
            postId: schemaTypes.string(10, 50),
          },
        },
      },
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.authenticatorPostIds);

  fastify.post('/entry-node-Otp', {
    schema: {
      tags,
      summary: 'FRN-SJM-DOC-Node-1.4/ 1-1',
      headers,
      body: {
        type: 'object',
        required: ['cellPhoneNumber'],
        properties: {
          cellPhoneNumber: schemaTypes.string(10, 10, '9000000000')
        },
      },
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.entryNodeOtp);

  fastify.post('/entry-node-services', {
    schema: {
      tags,
      summary: 'FRN-SJM-DOC-Node-1.4/ 1-2',
      headers,
      body: {
        type: 'object',
        required: ['cellPhoneNumber', 'nationalCode', 'code'],
        properties: {
          cellPhoneNumber: schemaTypes.string(10, 10, '9000000000'),
          nationalCode: schemaTypes.string(10, 10),
          code: schemaTypes.string(4, 7),
        },
      },
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.entryNodeServices);

  fastify.post('/entry-node-services/limit-profile', {
    schema: {
      tags,
      summary: 'FRN-SJM-DOC-Node-1.4/ 1-3',
      headers,
      body: {
        type: 'object',
        required: ['issuerOtp', 'nationalCode', 'cellPhoneNumber', 'serviceId', 'orderId'],
        properties: {
          issuerOtp: schemaTypes.string(20, 200),
          nationalCode: schemaTypes.string(10, 10),
          cellPhoneNumber: schemaTypes.string(10, 10, '9000000000'),
          serviceId: schemaTypes.string(4, 200),
          orderId: schemaTypes.string(5, 100),
        },
      },
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.limitProfile);

  fastify.post('/entry-node-services/profile-register', {
    schema: {
      tags,
      summary: 'FRN-SJM-DOC-Node-1.4/ 1-4',
      headers,
      body: {
        type: 'object',
        properties: {
          privatePerson: {
            type: 'object',
            required: ['nationalCode', 'firstName', 'lastName', 'fatherName', 'gender', 'serial', 'shNumber', 'birthDate', 'placeOfIssue', 'placeOfBirth'],
            properties: {
              nationalCode: schemaTypes.stringNu(10, 10),
              firstName: schemaTypes.stringFa(2, 40),
              lastName: schemaTypes.stringFa(2, 50),
              fatherName: schemaTypes.stringFa(2, 40),
              gender: schemaTypes.gender,
              seriShChar: schemaTypes.string(1, 3),
              seriSh: schemaTypes.stringNu(1, 2),
              serial: schemaTypes.stringNu(1, 6),
              shNumber: schemaTypes.stringNu(1, 10),
              birthDate: schemaTypes.string(10, 50, '1989-07-20T00:00:00.000Z'),
              placeOfIssue: schemaTypes.stringFa(0, 30),
              placeOfBirth: schemaTypes.stringFa(0, 30),
            },
          },
          address: {
            type: 'object',
            required: ['postalCode', 'countryId', 'provinceId', 'cityId', 'remnantAddress', 'alley', 'plaque', 'cityPrefix', 'tel'],
            properties: {
              postalCode: schemaTypes.stringNu(0, 10),
              countryId: schemaTypes.number,
              provinceId: schemaTypes.number,
              cityId: schemaTypes.number,
              sectionId: schemaTypes.number,
              remnantAddress: schemaTypes.stringFaNuSimbol(0, 100),
              alley: schemaTypes.stringFaNuSimbol(0, 50),
              plaque: schemaTypes.stringFaNuSimbol(0, 30),
              cityPrefix: schemaTypes.stringNu(3, 3),
              tel: schemaTypes.stringNu(8, 8),
              countryPrefix: schemaTypes.string(2, 4),
              emergencyMobile: schemaTypes.stringNu(10, 10, '9000000000'),
              emergencyTel: schemaTypes.stringNu(8, 8),
              emergencyTelCityPrefix: schemaTypes.stringNu(0, 3),
              email: schemaTypes.string(0, 50),
            },
          },
          payment: {
            type: 'object',
            required: ['amount', 'referenceNumber', 'saleReferenceId'],
            properties: {
              amount: schemaTypes.number,
              referenceNumber: schemaTypes.string(0, 30),
              saleReferenceId: schemaTypes.string(0, 30),
              discount: schemaTypes.number,
              dateTime: schemaTypes.string(0, 50, '2018-07-20T00:00:00.000Z'),
              serviceId: schemaTypes.string(0, 200),
              orderId: schemaTypes.string(0, 200),
            },
          },
          jobInfo: {
            type: 'object',
            required: ['jobId', 'companyAddress', 'companyPostalCode', 'companyEmail', 'companyCityPrefix', 'companyPhone'],
            properties: {
              jobId: schemaTypes.number,
              employmentDate: schemaTypes.string(10, 50, '2018-07-20T00:00:00.000Z'),
              companyName: schemaTypes.stringFa(0, 100),
              companyAddress: schemaTypes.stringFaNuSimbol(0, 300),
              companyPostalCode: schemaTypes.stringNu(10, 10),
              companyEmail: schemaTypes.string(0, 100),
              companyWebSite: schemaTypes.string(0, 100),
              companyCityPrefix: schemaTypes.stringNu(2, 3),
              companyPhone: schemaTypes.stringNu(4, 8),
              position: schemaTypes.stringFa(0, 50),
              companyFaxPrefix: schemaTypes.stringNu(2, 3),
              companyFax: schemaTypes.stringNu(8, 8),
              jobDescription: schemaTypes.stringFaNu(0, 60),
            },
          },
          bankingAccounts: {
            type: 'object',
            required: ['accountNumber', 'type', 'sheba', 'bankId', 'branchCode', 'branchName', 'branchCityId', 'isDefault'],
            properties: {
              accountNumber: schemaTypes.stringNu(0, 20),
              type: schemaTypes.accountType,
              sheba: schemaTypes.string(26, 26),
              bankId: schemaTypes.number,
              branchCode: schemaTypes.stringNu(0, 8),
              branchName: schemaTypes.stringFa(0, 60),
              branchCityId: schemaTypes.number,
              isDefault: schemaTypes.boolean,
            },
          },
          financialInfo: {
            type: 'object',
            required: ['transactionLevel', 'tradingKnowledgeLevel'],
            properties: {
              assetsValue: schemaTypes.number,
              inComingAverage: schemaTypes.number,
              sExchangeTransaction: schemaTypes.number,
              cExchangeTransaction: schemaTypes.number,
              outExchangeTransaction: schemaTypes.number,
              transactionLevel: schemaTypes.transactionLevel,
              tradingKnowledgeLevel: schemaTypes.knowledgeLevel,
            },
          },
          tradingCodes: {
            type: 'object',
            required: ['type'],
            properties: {
              type: schemaTypes.tradingType,
              firstPart: schemaTypes.string(0, 1),
              secondPart: schemaTypes.string(0, 7),
              thirdPart: schemaTypes.string(0, 3),
            },
          },
        },
      },
      response: {
        ...schemaTypes.responses,
      },
    },
  }, ctrl.profileRegister);

  next();
}