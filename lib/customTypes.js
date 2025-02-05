const schemaTypes = require('./schemaTypes');

const customTypes = {
    userProps: {
        id: schemaTypes.number,
        userName: schemaTypes.string(3, 50),
        firstName: schemaTypes.string(3, 50),
        lastName: schemaTypes.string(3, 50),
        personelCode: schemaTypes.string(3, 10),
        isActive: schemaTypes.boolean,
        workgroups: schemaTypes.array,
        pd: schemaTypes.string(0, 4000),
    },
};

module.exports = customTypes;