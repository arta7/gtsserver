// const config = require('../../../config');
// const customErrors = require('../../../lib/custom_errors');
const service = require('./service');
// const { utils, commonModules } = require('../../../lib');

const gardeshPayGetToken = async (req, res) => {
    const { amount, mobile, email } = req.body;

    const result = await service.gardeshPayGetToken(amount, mobile, email);

    res.send(result);
};

const gardeshPayRedirect = async (req, res) => {
    const { url, token } = req.params;

    const result = await service.gardeshPayRedirect(url, token);

    res.send(result);
};

const gardeshPayCallback = async (req, res) => {
    const { trackingNumber, invoiceNumber } = req.params;

    const result = await service.gardeshPayCallback(trackingNumber, invoiceNumber);

    res.send(result);
};

const gardeshPayVerify = async (req, res) => {
    const { trackingNumber } = req.body;

    const result = await service.gardeshPayVerify(trackingNumber);

    res.send(result);
};

module.exports = {
    gardeshPayVerify,
    gardeshPayRedirect,
    gardeshPayGetToken,
    gardeshPayCallback,
};