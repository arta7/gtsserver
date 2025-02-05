// const model = require('./model');
// const { utils } = require('../../../lib');
// const customErrors = require('../../../lib/custom_errors');
const uuid = require('uuid');
const { commonModules } = require('../../../lib');
const config = require('../../../config')

const gardeshPayGetToken = async (amount, mobile, email) => {
    const body = {
        amount, 
        mobile, 
        email,
        invoiceNumber: uuid.v4(),
        invoiceDate:new Date().toISOString().substring(0, 19),
        callback: config.providers.gardeshPay.callBackUrl,
    };

    const result = await commonModules.request('post', `/provider/payment/getToken`, undefined, undefined, body, undefined, 'GP');

    return result;
};

const gardeshPayRedirect = async (url, token) => {
    const result = await commonModules.request('get', `/${url}/${token}`, undefined, undefined, undefined, undefined, 'GP');

    return result;
};

const gardeshPayCallback = async (trackingNumber, invoiceNumber) => {
    const route = `/${config.providers.gardeshPay.callBackUrl}?trackingNumber=${trackingNumber}&invoiceNumber=${invoiceNumber}`;

    const result = await commonModules.request('get', route, undefined, undefined, undefined, undefined, 'GP');

    return result;
};

const gardeshPayVerify = async (trackingNumber) => {
    const result = await commonModules.request('post', '/provider/payment/verify', undefined, undefined, { trackingNumber }, undefined, 'GP');

    return result;
};

module.exports = {
    gardeshPayVerify,
    gardeshPayRedirect,
    gardeshPayGetToken,
    gardeshPayCallback,
};