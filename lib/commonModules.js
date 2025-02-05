const axios = require('axios');
const utils = require('./utils');
const service = require('../services/v1');
const customErrors = require('./custom_errors');
const config = require('../config');
// const env = require('dotenv');

// env.config();

let TOKEN;
let PAYMENT_TOKEN;

const request = async (method, route, headers, params, data, isPureRes = true, type) => {
    let url;
    let token;

    switch(type){
        case 'SJM':
            url = config.providers.sjm.baseUrl;
            token = TOKEN;
        break;
        case 'SJM-PAYMENT':
            url = config.providers.sjm.paymentBaseUrl;
            token = PAYMENT_TOKEN;
        break;
        case 'MESSAGING':
            url = config.providers.meliPayamak.baseUrl;
        break;
        case 'GP':
            url = config.providers.gardeshPay.baseUrl;
        break;
        case 'MESSAGINGSMS':
            url = config.providers.meliPayamak.baseUrl;
        break;
        default: 
            url = config.providers.sjm.baseUrl;
            token = TOKEN;
    }

    let result = await axios({
        method,
        url: `${url}${route}`,
        headers: {
            // 'accept': 'application/json',
            // 'Authorization':`Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'text/plain',
            'x-api-key': 'YOUR_SANDBOX_API_KEY',
            ...headers,
        },
        params,
        data
    }).then(function (res) {
        return res;
    }).catch(function (err) {
        return err.response?.data ?? {providerError: err.message};
    });
    
    if (result && result.status === 200 && result.statusText === 'OK') {
        if (isPureRes) result = result?.data?.data;
        else result = result?.data;
    } else if (result && [204, 202].includes(result.status)) result = true;

    return result
};



const requestSMS = async (method, route, headers, params, data) => {
    let url;


        url = 'https://api.sms.ir/v1/send/verify';
        // api = process.env.;
console.log('data',data)
    let result = await axios({
        method,
        url: `${url}`,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'text/plain',
            'x-api-key': 'bcZXZtcCGzoOaC9BVY2fs0TijH6r67k1eaRCNZpTEdXEkk5c'
        },
        data
    }).then(function (res) {
        console.log('res',res)
        return res;
    }).catch(function (err) {
        return err.response?.data ?? {providerError: err.message};
    });
    
    if (result && result.status === 200 && result.statusText === 'OK') {
   
        result = result?.data?.data;

    } else if (result && [204, 202].includes(result.status)) result = true;

    return result
};



const getToken = async () => {
    const body = {
        username: config.providers.sjm.username,
        password: config.providers.sjm.password,
    };
    const result = await request('post', `/accessToken`, {'Content-Type': 'application/json-patch+json'}, undefined, body);

    return result;
};

const getPaymentAccessToken = async () => {
    const body = {
        username: config.providers.sjm.paymentUsername,
        password: config.providers.sjm.paymentPassword,
    };
    const result = await request('post', `/accessToken`, {'Content-Type': 'application/json'}, undefined, body, undefined, 'SJM-PAYMENT');

    return result;
};

const touchToken = async () => {
    console.log('[...], touchToken called');
    TOKEN = (await getToken())?.accessToken;

    console.log('[...], getPaymentAccessToken called');
    PAYMENT_TOKEN = (await getPaymentAccessToken())?.accessToken;
};

const createTable = async (tbName) => {
    await service.createTable(tbName);
};

const tableCrudQueryInquiry = async () => {
    const result = await service.tableCrudQueryInquiry();

    return result;
};

const findSession = async (reply, authorization, curSessionCheck = true) => {
    let result = {} ;

    if (authorization) {
        result.sessionId = (utils.unSignData(authorization)).sid;

        const sessionInfo = await service.findSession(result.sessionId);
        if (sessionInfo) {
            result.currentSession = sessionInfo.sessionId;
            result.uid = sessionInfo.userId;
        } else if (!sessionInfo && curSessionCheck) {
             throw new customErrors.SessionFailedError();
        }
    }

    return result;
};

( async () => {        
    await service.createDirectory('assets');
    await service.createDirectory('assets\\reports');

    if (config.providers.sjm.state === 'START') {
        await touchToken();

        setInterval( async () => {
            await touchToken();
        }, 760*10000); // 2 houres
    }
})();

module.exports = {
    request,
    createTable,
    findSession,
    tableCrudQueryInquiry,
    requestSMS
};