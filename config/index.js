const env = require('dotenv');
const { version } = require('../package.json');

env.config();

const config = {
    server: {
        port: Number(process.env.PORT),
        host: process.env.HOST,
        baseUrl: `http://${process.env.HOST}`,
    },
    db: {
        config: {
            server: process.env.BD_SERVER,
            port: Number(process.env.DB_PORT),
            database: process.env.DB_NAME,
            user: process.env.DB_USER_NAME,
            password: process.env.DB_PASSWORD,
            pool: {
                max: 10,
                min: 0,
                idleTimeoutMillis: 30000
            },
              options: {
                encrypt: false, // for azure
                trustServerCertificate: false // change to true for local dev / self-signed certs
            },
        },
        connectionPool: null,
        tempDb: process.env.TEMP_DB_NAME,
        userSessionTable: process.env.USER_SESSTION_TABLE,
        tableCrudObject: null,
    },
    providers: {
        meliPayamak: {
            username: process.env.MELI_PAYAMAK_USER_NAME,
            password: process.env.MELI_PAYAMAK_PASSWORD,
            providerNumber: process.env.MELI_PAYAMAK_PROVIDER_NUMBER,
            baseUrl: process.env.MELI_PAYAMAK_BASE_URL,
            
        },
        sjm: {
            username: process.env.SJM_USER_NAME,
            password: process.env.SJM_PASSWORD,
            baseUrl: process.env.SJM_BASE_URL,
            state: process.env.SJM_RUN_STATE,
            paymentCallBackUrl: process.env.SJM_PAYMENT_CALLBACK_URL,
            paymentPassword: process.env.SJM_PAYMENT_PASSWORD,
            paymentUsername: process.env.SJM_PAYMENT_USER_NAME,
            paymentBaseUrl: process.env.SJM_PAYMENT_BASE_URL,
            paymentSignData: process.env.SJM_PAYMENT_SIGN_DATA,
        },
        gardeshPay: {
            baseUrl: process.env.GP_BASE_URL,
            callBackUrl: process.env.GP_CALLBACK_URL,
            token: process.env.GP_TOKEN,
        },
    },
    documentation: {
        swagger: {
            info: {
                version,
                title: 'Juridical Service',
                description: 'Juridical service swaggger'
            },
            host: process.env.baseUrl,
            schemes: ['http'],
            consumes: ['application/json'],
            produces: ['application/json'],
        },
        exposeRoute: true,
    },
    appId: process.env.APP_ID,
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY,
    passwordSaltRound: Number(process.env.PASSWORD_SALT_ROUND),
    sessionCtrl: process.env.SESSION_CONTROLER,
};

module.exports = config;