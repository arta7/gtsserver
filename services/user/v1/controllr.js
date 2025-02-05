const service = require('./service');
const { utils, commonModules } = require('../../../lib');
const  customErrors = require('../../../lib/custom_errors');

const inquiry = async (req, res) => {
    const { pageIndex, pageSize } = req.query;

    const result = await service.inquiry(pageIndex, pageSize);

    res.send(result);
};

const find = async (req, res) => {
    const { id } = req.params;

    const result = await service.find(id);

    res.send(result);
};

const create = async (req, res) => {
    let { 
        userName, password, rePassword, firstName, lastName, nationalCode, personelCode, cellPhoneNumber, email, address, isActive, organizationId, workgroupId,UnitId
    } = req.body;
    
    if (password !== rePassword) throw new customErrors.NotSamePassword();
    
    userName = userName.toLowerCase()
    password = await utils.encryptData(password); 

    const userInfo = await service.findByUserName(userName);
    if (userInfo) throw new customErrors.UserAlreadyExistError();

    const result = await service.create(userName, password, firstName, lastName, nationalCode, personelCode, cellPhoneNumber, email, address, isActive, organizationId, workgroupId,UnitId);

    res.status(200).send(result);
};

const extraDataCreate = async (req, res) => {
    let { id, extra } = req.body;
        
    const userInfo = await service.find(id);
    if (!userInfo) throw new customErrors.UserNotFoundError();

    if (!extra || !Array.isArray(extra) || (Array.isArray(extra) && !extra.length)) throw new customErrors.CurrectInputDataError();
    
    const userExtras = await service.findUserExtraData(id);
    if (!userExtras) throw new customErrors.UserExtraDataFindError();

    extra.forEach(element => {
        const result = userExtras.find((f) => Number(f.organizationId) === element.organizationId && Number(f.workgroupId) === element.workgroupId);
        if (result) throw new customErrors.BaseDataAlreadyExistError();
    });

    await service.extraDataCreate(id, extra);

    res.status(204).send('');
};

const update = async (req, res) => {
    const { id } = req.params;
    let { 
        userName, password, rePassword, firstName, lastName, nationalCode, personelCode, cellPhoneNumber, email, address, isActive,UnitId
    } = req.body;
        
    if (password) {
        if (password !== rePassword) throw new customErrors.NotSamePassword();
        password = await utils.encryptData(password); 
    }

    let userInfo = await service.find(id);
    if (!userInfo) throw new customErrors.UserNotFoundError();

    const updated = await service.update(id, userName, password, firstName, lastName, nationalCode, personelCode, cellPhoneNumber, email, address, isActive,UnitId);

    if(updated) {
        userInfo = await service.find(id);
        userInfo = {
            ...userInfo,
            pd: utils.messedUpSignData({ 
                nationalCode: userInfo.nationalCode,
                cellPhoneNumber: userInfo.cellPhoneNumber,
            })
        }
    }

    res.send(userInfo);
};

const remove = async (req, res) => {
    const { id } = req.params;

    const userInfo = await service.find(id);
    if (!userInfo) throw new customErrors.UserNotFoundError();

    await service.remove(id);

    res.status(204).send('');
};

const updateUser = async (req, res) => {
    const { UserId,UnitId } = req.body;

    const result =  await service.updateUser(UserId,UnitId);

    res.status(200).send(result);
};

const updateUnits = async (req, res) => {
    const { UserId,json } = req.body;

    const result =  await service.updateUnits(UserId,json);

    res.status(200).send(result);
};


const organizationFind = async (req, res) => {
    const { id } = req.params;

    const result = await service.organizationFind(id);
    if (!result) throw new customErrors.UserNotFoundError();

    res.send(result);
};

const getUserWorkGroup = async (req, res) => {
    const { UserId } = req.body;

    const result = await service.getUserWorkGroup(UserId);
    if (!result) throw new customErrors.UserNotFoundError();

    res.send(result);
};

const workgroupFind = async (req, res) => {
    const { id } = req.params;

    const result = await service.workgroupFind(id);
    if (!result) throw new customErrors.UserNotFoundError();

    res.send(result);
};

module.exports = {
    find,
    update,
    create,
    remove,
    inquiry,
    workgroupFind,
    extraDataCreate,
    organizationFind,
    updateUser,
    updateUnits,
    getUserWorkGroup
};