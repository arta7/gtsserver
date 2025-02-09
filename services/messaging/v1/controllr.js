const uuid = require('uuid');
const messaging = require('../../../lib/messageing');
const customErrors = require('../../../lib/custom_errors');
const service = require('./service');
const { utils, commonModules } = require('../../../lib');

const submit = async (req, res) => {
    const { cellPhoneNumber } = req.body;

    const code = utils.generateCode();

    const result = await service.submitSMS(cellPhoneNumber, messaging.providerMessage.meliPayamak.login, code);
    if(result == false) throw new customErrors.SmsCodeNotExpireError();
    // console.log('result show message',result)
    res.send(result);
};

const confirm = async (req, res) => {
    const { cellPhoneNumber, code } = req.body;

    const result = await service.confirm(cellPhoneNumber, code);
    console.log('result confirm 2',result)
    if (!result) throw new customErrors.SmsCodeNotValidError();
   
    res.send(result);
};


module.exports = {
    submit,
    confirm,
};