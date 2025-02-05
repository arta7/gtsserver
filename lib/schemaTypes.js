const schemaTypes = {
    string: function (minLength, maxLength, example = 'string') {
        return {
            type: 'string',
            minLength,
            maxLength,
            example,
        }
    },
    stringNu: function (minLength, maxLength, example = 'string') {
        return {
            type: 'string',
            minLength,
            maxLength,
            example,
            pattern: '^[0-9]*$',
        }
    },
    stringFa: function (minLength, maxLength, example = 'string') {
        return {
            type: 'string',
            minLength,
            maxLength,
            example,
            pattern: '^[\u0600-\u06FF\]*$',
        }
    },
    stringFaNu: function (minLength, maxLength, example = 'string') {
        return {
            type: 'string',
            minLength,
            maxLength,
            example,
            pattern: '^[\u0600-\u06FF\0-9]+$',
        }
    },
    stringFaNuSimbol: function (minLength, maxLength, example = 'string') {
        return {
            type: 'string',
            minLength,
            maxLength,
            example,
            pattern: '^[\u0600-\u06FF\0-9.-،]+$',
        }
    },
    number: {
        type: 'number'
    },
    short: {
        type: 'number',
        minimum: 0,
        maximum: 255,
    },
    boolean: {
        type: 'boolean'
    },
    ip: {
        type: 'string',
        pattern: '^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$',
        example: '192.168.1.1',
    },
    array: {
        type: 'array'
    },
    gender: {
        enum: ['Male', 'Female'],
        example: 'Male or Female'
    },
    accountType: {
        enum: ['shortTermAccount' , 'currentAccount', 'savingAccoun'],
        example: 'shortTermAccount or currentAccount or savingAccoun'
    },
    tradingType: {
        enum: ['energy', 'product', 'stockExchange'],
        example: 'energy or product or stockExchange'
    },
    transactionLevel: {
        enum:  ['one', 'two', 'three', 'four', 'five'],
        example: 'one or two or three or four or five'
    },
    knowledgeLevel: {
        enum:  ['excellent', 'good', 'medium', 'low', 'veryLow'],
        example: 'excellent or good or medium or low or veryLow'
    },
    fileType: {
        enum: ['excel', 'pdf'],
        example: 'excel or pdf'
    },
    responses: {
        500: {
            type: 'object',
            properties: {
                message: {
                    type: 'string',
                },
            },
        },
        400: {
            type: 'object',
            properties: {
                message: {
                    type: 'string',
                },
            },
        },
    },
};

// const stringRejex = (patternType) => {
//     let rejex = '';
//     switch(patternType) {
//         case 'fa':
//             rejex = ;
//             break;
//         case 'fa-nu':
//             rejex = '^[0-9][\u0600-\u06FF\s]+$'
//             break;
//         default: null;
//     }
//     return rejex;
// };

module.exports = schemaTypes;