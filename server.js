const fastify = require('fastify')({ logger: true,bodyLimit: 12485760 });
const swagger = require('@fastify/swagger');
const helmet = require('@fastify/helmet');
const cors = require('@fastify/cors');
const config = require('./config');
const { commonModules } = require('./lib');
const customErrors = require('./lib/custom_errors');
const setConsoleLog  = require('./lib/setConsoleLog');
const gts = require('./routes/gts/v1');
const sjm = require('./routes/sjm/v1');
const base = require('./routes/base/v1');
const user = require('./routes/user/v1');
const doc = require('./routes/document/v1');
const messaging = require('./routes/messaging/v1');
const auth = require('./routes/authentication/v1');
const payment = require('./routes/payment/v1');
const report = require('./routes/report/v1');
const attachment = require('./routes/attachment/v1');

fastify.register(cors, {
    origin: '*',//'http://193.151.134.67',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    hook: 'onRequest',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: false,
    exposedHeaders: null,
    allowedHeaders: null,
    maxAge: null,
    preflight: true,
    strictPreflight: true
});
// fastify.register(helmet, { 
//     contentSecurityPolicy: {
//         directives: {
//             defaultSrc: ["'self'"],
//             scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
//             connectSrc: config.server.baseUrl,
//             styleSrc: ["'self'", "'unsafe-inline'"],
//             imgSrc: ["'self'"],
//         },
//     },
//  });
fastify.register(gts, { prefix: '/gts/v1/api' });
fastify.register(sjm, { prefix: '/sjm/v1/api' });
fastify.register(auth, { prefix: '/auth/v1/api' });
fastify.register(base, { prefix: '/base/v1/api' });
fastify.register(user, { prefix: '/user/v1/api' });
fastify.register(doc, { prefix: '/document/v1/api' });
fastify.register(report, { prefix: '/report/v1/api' });
fastify.register(payment, { prefix: '/payment/v1/api' });
fastify.register(messaging, { prefix: '/messageing/v1/api' });
fastify.register(attachment, { prefix: '/attachment/v1/api' });

const notCheckSessionUrls = [
    '/user/v1/api/register',
    '/auth/v1/api/login',
    '/auth/v1/api/updateOrganization',
    '/auth/v1/api/getUserWorkGroup',
    '/auth/v1/api/updateUnits',
    '/messageing/v1/api/submit',
    '/messageing/v1/api/confirm',
    '/auth/v1/api/get-token',
    '/gts/v1/api/base/login-page-info/fetch'
];

const swaggerUrls = [
    '/documentation/static/index.html',
    '/documentation/static/swagger-ui.css',
    '/documentation/static/swagger-ui-bundle.js',
    '/documentation/static/swagger-ui-standalone-preset.js',
    '/documentation/static/swagger-ui.css.map',
    '/documentation/static/swagger-ui-bundle.js.map',
    '/documentation/static/swagger-ui-standalone-preset.js.map',
    '/documentation/uiConfig',
    '/documentation/static/favicon-32x32.png',
    '/documentation/initOAuth',
    '/documentation/json',
    '/report/v1/api/loadReport/*',
];
// To check session before execute request and extract autorization
fastify.addHook('preValidation', async (request, reply) => {
    let curSessionCheck = false;
    // Not check in login and register
    if (!notCheckSessionUrls.includes(request.url) && !swaggerUrls.includes(request.url)) curSessionCheck = true;

    request.headers.sessionInfo =await commonModules.findSession(reply, request.headers.authorization, curSessionCheck);
});

fastify.addHook("onError", async (req, res, err) => {
    if (err.message === "UnAuthorized") res.statusCode = 401;
    if(err?.code === 'EREQUEST') {
        setConsoleLog(err.message);
        const error = new customErrors.GeneralError();
        err.message = error.message;
    }
});

fastify.addHook('onSend', (request, reply, payload, done) => {
    let newPayload;

    if (payload  && !swaggerUrls.includes(request.url)) {
        let result;

        payload = JSON.parse(payload);
        if (payload.status && ![200, 201, 204].includes(payload.status)) throw Error(payload?.result?.message);
        if (payload?.headers) reply.headers(payload.headers)

        if (Array.isArray(payload)) result = payload
        else result = {...payload };
        
        newPayload = {
            status: payload.status ? payload.status : reply.statusCode,
            result,
        };

        newPayload = JSON.stringify(newPayload);
    }

    done(null, newPayload);
});

const start = async () => {
    await fastify.ready(async (err) => {
        if (!err) {
            fastify.listen({port: config.server.port, host: config.server.host}, (err) => {  
                if (!err) {                   
                    setConsoleLog('Server is running on port:', config.server.port);
                } else {
                    setConsoleLog('Server is down', err);
        
                    process.exit(1);
                }
            });
        } else {
            setConsoleLog('Server is down', err);
        
            process.exit(1);
        }
    });

    if (process.env.ENVIRONMENT === 'development') fastify.register(swagger, config.documentation);
};

module.exports = {
    start,
};