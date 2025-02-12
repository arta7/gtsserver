const model = require('./model');
// const setConsoleLog  = require('../../../lib/setConsoleLog');
const  customErrors = require('../../../lib/custom_errors');
const { utils } = require('../../../lib');

const inquiry = async (pageIndex, pageSize) => {
    const result = await model.inquiry(pageIndex, pageSize);

    return result;
};

const find = async (id) => {
    const result = await model.find(id);

    return result;
};

const create = async (userName, password, firstName, lastName, nationalCode, personelCode, cellPhoneNumber, email, address, isActive, organizationId, workgroupId,UnitId) => {
   
      console.log('UnitId',UnitId)
     const result = await model.create(userName, password, firstName, lastName, nationalCode, personelCode, cellPhoneNumber, email, address, isActive, organizationId, workgroupId,UnitId);
    console.log('result create',result)
    if (!result) throw new customErrors.CreateUserError();

    return result;
};

const extraDataCreate = async (id, extra) => {
    model.extraDataRemove(id);
    const result = await model.extraDataCreate(id, extra);
    if (!result) throw new customErrors.CreateUserError();

    return true;
};

const update = async (id, userName, password, firstName, lastName, nationalCode, personelCode, cellPhoneNumber, email, address, isActive,UnitId) => {
    const result = await model.update(id, userName, password, firstName, lastName, nationalCode, personelCode, cellPhoneNumber, email, address, isActive,UnitId);
    if (!result) throw new customErrors.UpdateUserError();

    return true;
};

const remove = async (id) => {
    const result = await model.remove(id);
    if (!result) throw new customErrors.RemoveUserError();

    return true;
};

const updateUser = async (UserId,UnitId) => {
    const result = await model.updateUser(UserId,UnitId);
    if (!result) throw new customErrors.RemoveUserError();

    return true;
};

const updateUnits = async (UserId,json) => {
    const result = await model.updateUnits(UserId,json);
    if (!result) throw new customErrors.RemoveUserError();

    return true;
};

const findByUserName = async (userName) => {
    const result = utils.convertSqlJsonResult(await model.findByUserName(userName), true);

    return result;
};

const findUserExtraData = async (id) => {
    const result = await model.findUserExtraData(id);

    return result;
};

const organizationFind = async (id) => {
    const result = await model.organizationFind(id);

    return result;
};

const getUserWorkGroup = async (UserId) => {
    const result = await model.getUserWorkGroup(UserId);

    return result;
};

const workgroupFind = async (id) => {
    const result = await model.workgroupFind(id);

    return result;
};


module.exports = {
    find,
    update,
    create,
    remove,
    inquiry,
    workgroupFind,
    findByUserName,
    extraDataCreate,
    organizationFind,
    findUserExtraData,
    updateUser,
    updateUnits,
    getUserWorkGroup
};