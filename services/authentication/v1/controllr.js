const uuid = require('uuid');
const config = require('../../../config');
const customErrors = require('../../../lib/custom_errors');
const service = require('./service');
const userService = require('../../user/v1/service');
const { utils } = require('../../../lib');

const login = async (req, res) => {
    const { sessionInfo } = req.headers;
    let { userName, password } = req.body;
    userName = userName.toLowerCase()

    let userInfo = await userService.findByUserName(userName);
    if (!userInfo) throw new customErrors.UserNotFoundError();
    userInfo = userInfo[0];

    userInfo = {
        ...userInfo,
        pd: utils.messedUpSignData({ 
            nationalCode: userInfo.nationalCode,
            cellPhoneNumber: userInfo.cellPhoneNumber,
        })
    }

    const passwordValidate =await utils.decryptData(password, userInfo.password);
    if (!passwordValidate) throw new customErrors.PasswordNotValidError();

    if (!sessionInfo|| !sessionInfo.currentSession ) await service.submitSession(Number(userInfo.id), sessionInfo.sessionId);

    
    res.send(userInfo);
};

const logout = async (req, res) => {
    const { sessionInfo } = req.headers;

    if (sessionInfo) service.removeSession(sessionInfo.sessionId);

    res.status(204).send('');
};

const getToken = (req, res) => {
    const { publickey } = req.headers;
    const sessionId = uuid.v4();
    let extractedKey;
    
    // Extracts the public key and takes a word to check the validity of the public key
    if (publickey.length >= config.appId.length) {
        extractedKey = `${publickey.substring(1,3)}${publickey.substring(4,5)}i${publickey.substring(8,10)}${publickey.substring(12,14)}${publickey.substring(18,19)}`;
        extractedKey = extractedKey.replace('0','u').toLowerCase();
    }

    if ((extractedKey !== config.appId) || (publickey !== process.env.PUBLIC_KEY)) throw new customErrors.PublicKeyNotValidError();

    const access_token = utils.signData({ sid: sessionId });

    res.send({ access_token });
};

const checkLoginStatus = (req, res) => {

    res.status(204).send('');
};

module.exports = {
    login,
    logout,
    getToken,
    checkLoginStatus,
};