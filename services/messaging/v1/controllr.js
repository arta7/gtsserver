const uuid = require('uuid');
const messaging = require('../../../lib/messageing');
const customErrors = require('../../../lib/custom_errors');
const service = require('./service');
const { utils, commonModules } = require('../../../lib');

const submit = async (req, res) => {
    const { cellPhoneNumber } = req.body;

    const code = utils.generateCode();

    const result = await service.submitSMS(cellPhoneNumber, messaging.providerMessage.meliPayamak.login, code);
    console.log('result',result)
    res.send(result);
};

const confirm = async (req, res) => {
    const { cellPhoneNumber, code } = req.body;

    const result = await service.confirm(cellPhoneNumber, code);
    if (!result) throw new customErrors.SmsCodeNotValidError();

    res.status(204).send('');
};


module.exports = {
    submit,
    confirm,
};