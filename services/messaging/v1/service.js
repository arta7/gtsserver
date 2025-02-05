const axios = require('axios');
const parse = require('xml-parser');
const model = require('./model');
const config = require('../../../config');
const  customErrors = require('../../../lib/custom_errors');
const { utils, commonModules } = require('../../../lib');

const submit = async (cellPhoneNumber, msg, code) => {
    let data = '';
    const params = {
        username: config.providers.meliPayamak.username,
        password: config.providers.meliPayamak.password,
        to: `0${cellPhoneNumber}`,
        from: config.providers.meliPayamak.providerNumber,
        text: `${msg}${code}`,
        isflash: false 
    };

    let response = await commonModules.request('get', '/SendSimpleSMS', undefined, params, undefined, false, 'MESSAGING');
    if (response) {
        data = parse(response);
        data = data?.root?.children[0]?.content;
        if (data) {
            const result = await model.find(cellPhoneNumber);
            if (result) await model.update(cellPhoneNumber, code);
            else await model.submit(cellPhoneNumber, code);
        }
    }

    return {content: data};
};


const submitSMS = async (cellPhoneNumber, msg, code) => {
    let params = '';
    const data = {
        "mobile": `${cellPhoneNumber}`,
    "templateId": 123456,
    "parameters": [
      {
        "name": "Code",
        "value": `${msg}${code}`
      }
    ]
    };

    let response = await commonModules.requestSMS('post', '/verify', undefined, params, data);
    // console.log('response SMS',response)
    if (response) {
        // console.log('response SMS',response)
         var  data1 = response;
           console.log('data1',data1)
        //  if (data1) 
            {
         const result = await model.find(cellPhoneNumber.toString());
        //  console.log('result find',result)
            if (result) await model.update(cellPhoneNumber.toString(), code.toString());
            
            else await model.submit(cellPhoneNumber.toString(), code.toString());
        }
    }

    return {content: data};
};

const confirm = async (cellPhoneNumber, code) => {
    const result = await model.confirm(cellPhoneNumber, code);

    return result;
};

module.exports = {
    submit,
    confirm,
    submitSMS
};