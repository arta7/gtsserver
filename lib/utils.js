const sql = require('mssql');
const config = require('../config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const customErrors = require('./custom_errors');

const signData = (data) => {
    const result = jwt.sign(data, config.privateKey);

    return result;
};

const unSignData = (data) => {
    const token = data.split(' ').slice(1,2).join();
    const result = jwt.verify(token, config.privateKey);

    return result;
};

const messedUpSignData = (data) => {
    // let result = jwt.sign(data, config.privateKey);
    // result = `${result.substring(0 , result.indexOf('.') + 5)}${(Math.random() + 1).toString(36).substring(7)}${result.substring(result.indexOf('.'))}`;

    result = `${(Math.random() + 1).toString(36).substring(2,7)}${Buffer.from(JSON.stringify(data)).toString('base64')}`;
    return result;
};

const checkTokenExpStatus = (token) => {
    let status = false;

    if (token) {
        const result = jwt.decode(token);
        const curTimeStamp = Math.floor(Date.now() / 1000);
        if (result.exp >= curTimeStamp) status =  true;
    }
    
    return status;
};

const encryptData = async (data) => {
    const result = bcrypt.hashSync(data, config.passwordSaltRound);

    return result;
} 

const decryptData = async (data, hashData) => {
    const result = bcrypt.compareSync(data, hashData);

    return result;
} 

const convertSqlJsonResult = (obj, nullIf = false) => {
    if (!obj) return '';
    
    const [key, value]= Object.entries(obj)[0];

    if (!value) {
        if(!nullIf) return [];//throw new customErrors.BaseDataNotFoundError();
        
        return value;
    }

    return JSON.parse(value);
}

const treeObjectGenerator = (array) => {
    if (array) {
        const len = array.length;

        for (let i=0 ; i<len; i++) {
            const item = array[i];

            if (item.parentId && item.parentId !== null) {
                const obj = array.find((f) => f.id === item.parentId);
                if (obj && obj.children) obj.children.push(item);
                else obj.children = [item];
            }
        }
    }

    return array[0];
}

const dataTypeWrapper = (key, value, parameters, defaultValues) => {
    let type;
    let defValue;
    let defValues;
    let parameterType;

    // if (defaultValues) {
    //     for (const item of defaultValues.split(',')) {
    //         defValues = item.split('=');
    //         if (defValues[0].trim() !== key) {
    //             defValue = defValues[1];
    //         }
    //     }
    // }

    for (const element of parameters.split(',')) {
        const array = element.split('=');
        if (array[0].trim() === key) {
            parameterType = array[1].trim();

            break;
        }
    }
    
    switch(parameterType) {
        case 'bigint':
            type = sql.BigInt;
            value = Number(value);
            break;
        case 'tinyint':
            type = sql.TinyInt;
            value = Number(value);
            break;
        case 'smallint':
            type = sql.SmallInt;
            value = Number(value);
            break;
        case 'float':
            type = sql.Float;
            value = Number(value);
            break;
        case 'int':
            type = sql.Int;
            value = Number(value);
            break;
        case 'bit':
            type = sql.Bit;
            value = JSON.parse(value);
            break;
        case 'nvarchar':
            type = sql.NVarChar;
            break;
        case 'nchar':
            type = sql.NChar;
            break;
        case 'varchar':
            type = sql.VarChar;
            break;
        default:
            type = sql.NVarChar;
    }

    return { type , value };
};

const generateCode = () => {
    return Math.floor(10000 + Math.random() * 90000);
};

module.exports = {
    signData,
    encryptData,
    unSignData,
    decryptData,
    generateCode,
    dataTypeWrapper,
    messedUpSignData,
    checkTokenExpStatus,
    treeObjectGenerator,
    convertSqlJsonResult,
};
