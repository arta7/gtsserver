const config = require('../../../config');
const { commonModules } = require('../../../lib');

const getToken = async () => {
    const body = {
        username: config.providers.sjm.username,
        password: config.providers.sjm.password,
    };
    const result = await commonModules.request('get', `accessToken`, {'Content-Type': 'application/json-patch+json'}, undefined, body);

    return result;
};

const checkIndividualSjmStatus = async (nationalCode) => {
    const result = await commonModules.request('get', `/profiles/${nationalCode}/isSejami`);

    // await axios({
    //     method: 'get',
    //     url: `${config.providers.sjm.baseUrl}/profiles/${nationalCode}/isSejami`,
    //     headers: {
    //         'accept': 'application/json',
    //         'Authorization':`Bearer ${token}`
    //     },
    // }).then(function (res) {
    //     result = res;
    // }).catch(function (err) {
    //     result = err.response.data.error;
    // });
    
    // if (result && result.status === 200 && result.statusText === 'OK') result= result?.data?.data;

    return result;
};

const getIndividualSjmStatus = async (nationalCode) => {
    const result = await commonModules.request('get', `/profiles/${nationalCode}/sejamStatus`);

    // await axios({
    //     method: 'get',
    //     url: `${config.providers.sjm.baseUrl}/profiles/${nationalCode}/sejamStatus`,
    //     headers: {
    //         'accept': 'application/json',
    //         'Authorization':`Bearer ${token}`
    //     },
    // }).then(function (res) {
    //     result = res;
    // }).catch(function (err) {
    //     result = err.response.data.error;
    // });
    
    // if (result && result.status === 200 && result.statusText === 'OK') result= result?.data?.data;

    return result;
};

const getCountries = async () => {
    const result = await commonModules.request('get', `/countries`);

    // await axios({
    //     method: 'get',
    //     url: `${config.providers.sjm.baseUrl}/countries`,
    //     headers: {
    //         'accept': 'application/json',
    //         'Authorization':`Bearer ${token}`
    //     },
    // }).then(function (res) {
    //     result = res;
    // }).catch(function (err) {
    //     result = err.response.data.error;
    // });
    
    // if (result && result.status === 200 && result.statusText === 'OK') result= result?.data?.data;

    return result;
};

const getProvinces = async (countryId) => {
    const result = await commonModules.request('get', `/countries/${countryId}/provinces`);

    // await axios({
    //     method: 'get',
    //     url: `${config.providers.sjm.baseUrl}/countries/${countryId}/provinces`,
    //     headers: {
    //         'accept': 'application/json',
    //         'Authorization':`Bearer ${token}`
    //     },
    // }).then(function (res) {
    //     result = res;
    // }).catch(function (err) {
    //     result = err.response.data.error;
    // });
    
    // if (result && result.status === 200 && result.statusText === 'OK') result= result?.data?.data;

    return result;
};

const getCities = async (countryId, provinceId) => {
    const result = await commonModules.request('get', `/countries/${countryId}/provinces/${provinceId}/cities`);

    // await axios({
    //     method: 'get',
    //     url: `${config.providers.sjm.baseUrl}/countries/${countryId}/provinces/${provinceId}/cities`,
    //     headers: {
    //         'accept': 'application/json',
    //         'Authorization':`Bearer ${token}`
    //     },
    // }).then(function (res) {
    //     result = res;
    // }).catch(function (err) {
    //     result = err.response.data.error;
    // });
    
    // if (result && result.status === 200 && result.statusText === 'OK') result= result?.data?.data;

    return result;
};

const getSections = async (countryId, provinceId, cityId) => {
    const result = await commonModules.request('get', `/countries/${countryId}/provinces/${provinceId}/cities/${cityId}/sections`);

    // await axios({
    //     method: 'get',
    //     url: `${config.providers.sjm.baseUrl}/countries/${countryId}/provinces/${provinceId}/cities/${cityId}/sections`,
    //     headers: {
    //         'accept': 'application/json',
    //         'Authorization':`Bearer ${token}`
    //     },
    // }).then(function (res) {
    //     result = res;
    // }).catch(function (err) {
    //     result = err.response.data.error;
    // });
    
    // if (result && result.status === 200 && result.statusText === 'OK') result= result?.data?.data;

    return result;
};

const getJobs = async () => {
    const result = await commonModules.request('get', `/jobs`);

    // await axios({
    //     method: 'get',
    //     url: `${config.providers.sjm.baseUrl}/jobs`,
    //     headers: {
    //         'accept': 'application/json',
    //         'Authorization':`Bearer ${token}`
    //     },
    // }).then(function (res) {
    //     result = res;
    // }).catch(function (err) {
    //     result = err.response.data.error;
    // });
    
    // if (result && result.status === 200 && result.statusText === 'OK') result= result?.data?.data;

    return result;
};

const getBanks = async () => {
    const result = await commonModules.request('get', `/banks`);

    // await axios({
    //     method: 'get',
    //     url: `${config.providers.sjm.baseUrl}/banks`,
    //     headers: {
    //         'accept': 'application/json',
    //         'Authorization':`Bearer ${token}`
    //     },
    // }).then(function (res) {
    //     result = res;
    // }).catch(function (err) {
    //     result = err.response.data.error;
    // });
    
    // if (result && result.status === 200 && result.statusText === 'OK') result= result?.data?.data;

    return result;
};

const getFinancialBrokers = async () => {
    const result = await commonModules.request('get', `/financialbrokers`);

    // await axios({
    //     method: 'get',
    //     url: `${config.providers.sjm.baseUrl}/financialbrokers`,
    //     headers: {
    //         'accept': 'application/json',
    //         'Authorization':`Bearer ${token}`
    //     },
    // }).then(function (res) {
    //     result = res;
    // }).catch(function (err) {
    //     result = err.response.data.error;
    // });
    
    // if (result && result.status === 200 && result.statusText === 'OK') result= result?.data?.data;

    return result;
};

const getAuthenticateOffices = async () => {
    const result = await commonModules.request('get', `/authenticateoffices`);

    // await axios({
    //     method: 'get',
    //     url: `${config.providers.sjm.baseUrl}/authenticateoffices`,
    //     headers: {
    //         'accept': 'application/json',
    //         'Authorization':`Bearer ${token}`
    //     },
    // }).then(function (res) {
    //     result = res;
    // }).catch(function (err) {
    //     result = err.response.data.error;
    // });
    
    // if (result && result.status === 200 && result.statusText === 'OK') result= result?.data?.data;

    return result;
};

const kycOtp = async (nationalCode) => {
    const body= {
        uniqueIdentifier: nationalCode,
    };

    const result = await commonModules.request('post', `/kycOtp`, undefined, undefined, body);

    return result;
};

const getProfile = async (nationalCode, code) => {
    const result = await commonModules.request('get', `/servicesWithOtp/profiles/${nationalCode}?otp=${code}`);

    // await axios({
    //     method: 'get',
    //     url: `${config.providers.sjm.baseUrl}/servicesWithOtp/profiles/${nationalCode}?otp=${code}`,
    //     headers: {
    //         'accept': 'application/json',
    //         'Authorization':`Bearer ${token}`
    //     }
    // }).then(function (res) {
    //     result = res;
    // }).catch(function (err) {
    //     result = err.response.data.error;
    // });
    
    // if (result && result.status === 200 && result.statusText === 'OK') result= result?.data?.data;

    return result;
};

const getSignature = async (nationalCode) => {
    const result = await commonModules.request('get', `/profiles/${nationalCode}/privatePerson/signature`, undefined, undefined);

    return result;
};

const serveFile = async (fileName) => {
    const result = await commonModules.request('get', `/files/serveFile/${fileName}`, undefined, undefined, undefined, false);

    return {file: result};
};

const getMobile = async (nationalCode) => {
    const result = await commonModules.request('get', `/profiles/servicesWithPermanentOtp/${nationalCode}/mobile`);

    // await axios({
    //     method: 'get',
    //     url: `${config.providers.sjm.baseUrl}/profiles/servicesWithPermanentOtp/${nationalCode}/mobile`,
    //     headers: {
    //         'accept': 'application/json',
    //         'Authorization':`Bearer ${token}`
    //     }
    // }).then(function (res) {
    //     result = res;
    // }).catch(function (err) {
    //     result = err.response.data.error;
    // });
    
    // if (result && result.status === 200 && result.statusText === 'OK') result = result?.data?.data;

    return result;
};

const getServices = async () => {
    const result = await commonModules.request('get', `/services`, undefined, undefined, undefined, undefined, 'SJM-PAYMENT');

    // await axios({
    //     method: 'get',
    //     url: `${config.providers.sjm.baseUrl}/services`,
    //     headers: {
    //         'accept': 'application/json',
    //         'Authorization':`Bearer ${token}`
    //     }
    // }).then(function (res) {
    //     result = res;
    // }).catch(function (err) {
    //     result = err.response?.data?.error;
    // });
    
    // if (result && result.status === 200 && result.statusText === 'OK') result = result?.data?.data;

    return result;
};

const getServicesById = async (id) => {
    const result = await commonModules.request('get', `/services/${id}`, undefined, undefined, undefined, undefined, 'SJM-PAYMENT');

    // await axios({
    //     method: 'get',
    //     url: `${config.providers.sjm.baseUrl}/services/${id}`,
    //     headers: {
    //         'accept': 'application/json',
    //         'Authorization':`Bearer ${token}`
    //     }
    // }).then(function (res) {
    //     result = res;
    // }).catch(function (err) {
    //     result = err.response?.data?.error;
    // });
    
    // if (result && result.status === 200 && result.statusText === 'OK') result = result?.data?.data;

    return result;
};

const getPaymentToken = async (serviceId, amount, isCalculatedAmount, orderId) => {
    const body = {
        username: config.providers.sjm.paymentUsername,
        password: config.providers.sjm.paymentPassword,
        serviceId,
        amount,
        isCalculatedAmount,
        orderId,
        callbackUrl: config.providers.sjm.paymentCallBackUrl,
        signData: config.providers.sjm.paymentSignData,
    };

    const result = await commonModules.request('post', `/accessToken/paymentToken`, {'Content-Type': 'application/json-patch+json'}, undefined, body, undefined, 'SJM-PAYMENT');

    return result;
};

const paymentsVerify = async (paymentToken) => {
    const body = {
        token: paymentToken
    };

    const result = await commonModules.request('post', `/payments/verify`,{'Content-Type': 'application/json-patch+json'}, undefined, body, undefined, 'SJM-PAYMENT');
    // await axios({
    //     method: 'post',
    //     url: `${config.providers.sjm.baseUrl}/payments/verify`,
    //     headers: {
    //         'accept': 'application/json',
    //         'Content-Type': 'application/json-patch+json',
    //         'Authorization':`Bearer ${token}`
    //     },
    //     data: {
    //         token: paymentToken
    //     },
    // }).then(function (res) {
    //     result = res;
    // }).catch(function (err) {
    //     result = err.response?.data?.error;
    // });
    
    // if (result && result.status === 200 && result.statusText === 'OK') result = result?.data?.data;

    return result;
};

const checkPaymentStatus = async (orderId, serviceId) => {
    const result = await commonModules.request('get', `/payments/${orderId}/${serviceId}/paymentStatus`, undefined, undefined, undefined, undefined, 'SJM-PAYMENT');
    // await axios({
    //     method: 'get',
    //     url: `${config.providers.sjm.baseUrl}/payments/${orderId}/${serviceId}/paymentStatus`,
    //     headers: {
    //         'accept': 'application/json',
    //         'Authorization':`Bearer ${token}`
    //     },
    // }).then(function (res) {
    //     result = res;
    // }).catch(function (err) {
    //     result = err.response?.data?.error;
    // });
    
    // if (result && result.status === 200 && result.statusText === 'OK') result = result?.data?.data;

    return result;
};

const paymentFactor = async (orderId, serviceId, fullName, nationalCode, mobile, address, profileOwnerType, postalCode) => {
    const body = {
        orderId,
        serviceId,
        fullName,
        uniqueIdentifier: nationalCode,
        mobile,
        address,
        profileOwnerType,
        postalCode,
    };

    const result = await commonModules.request('post', `/payments/factor`, undefined, undefined, body, undefined, 'SJM-PAYMENT');
    // await axios({
    //     method: 'post',
    //     url: `${config.providers.sjm.baseUrl}/payments/factor`,
    //     headers: {
    //         'accept': 'application/json',
    //         'Authorization':`Bearer ${token}`
    //     },
    //     data: {
    //         orderId,
    //         serviceId,
    //         fullName,
    //         uniqueIdentifier: nationalCode,
    //         mobile,
    //         address,
    //         profileOwnerType,
    //         postalCode,
    //     }
    // }).then(function (res) {
    //     result = res;
    // }).catch(function (err) {
    //     result = err.response?.data?.error;
    // });
    
    // if (result && result.status === 200 && result.statusText === 'OK') result = result?.data?.data;

    return result;
};

const authenticatorOtp = async (traceCode, nationalCode) => {
    const body = {
        traceCode,
        uniqueIdentifier: nationalCode
    };

    const result = await commonModules.request('post', `/authenticatorOtp`, {'Content-Type': 'application/json-patch+json'}, undefined, body);

    // await axios({
    //     method: 'post',
    //     url: `${config.providers.sjm.baseUrl}/authenticatorOtp`,
    //     headers: {
    //         'accept': 'application/json',
    //         'Content-Type': 'application/json-patch+json',
    //         'Authorization':`Bearer ${token}`
    //     },
    //     data:{
    //         traceCode,
    //         uniqueIdentifier: nationalCode
    //     }
    // }).then(function (res) {
    //     result = res;
    // }).catch(function (err) {
    //     result = err.response?.data?.error;
    // });
    
    // if (result && result.status === 200 && result.statusText === 'OK') result = result?.data?.data;

    return result;
};

const getIndividualProfile = async (traceCode, nationalCode, code) => {
    // let result;

    // await axios({
    //     method: 'get',
    //     url: `${config.providers.sjm.baseUrl}/authenticator/profiles/${nationalCode}?otp=${code}&traceCode=${traceCode}`,
    //     headers: {
    //         'accept': 'application/json',
    //         'Authorization':`Bearer ${token}`
    //     }
    // }).then(function (res) {
    //     result = res;
    // }).catch(function (err) {
    //     result = err.response?.data?.error;
    // });
    
    // if (result && result.status === 200 && result.statusText === 'OK') result = result?.data?.data;

    const result = await commonModules.request('get', `/authenticator/profiles/${nationalCode}?otp=${code}&traceCode=${traceCode}`, undefined, undefined);

    return result;
};

const authenticatorStatus = async (traceCode, nationalCode, issuerOtp, issuerReference, privatePersonImage, privatePersonSignature) => {
    const body = {
        issuerReference,
        privatePersonImage,
        privatePersonSignature
    };
    
    const result = await commonModules.request('post', `/authenticator/profiles/${nationalCode}/status?issuerOtp=${issuerOtp}&traceCode=${traceCode}`,
    {'Content-Type': 'application/json-patch+json'}, undefined, body);

    return result;
};

const authenticatorPostIds = async (body) => {
    const result = await commonModules.request('post', `/authenticator/profiles/postIds`, {'Content-Type': 'application/json-patch+json'}, undefined, body);

    return result;
};

const entryNodeOtp = async (cellPhoneNumber) => {
    const body = {
        mobile: cellPhoneNumber
    };

    const result = await commonModules.request('post', `/entryNodeOtp`, {'Content-Type': 'application/json-patch+json'}, undefined, body);

    return result;
};

const entryNodeServices = async (cellPhoneNumber, nationalCode, code) => {
    const result = await commonModules.request('get', `/entryNodeServices/profiles/${nationalCode}?mobile=${cellPhoneNumber}&otp=${code}`);

    return result;
};

const limitProfile = async (issuerOtp, cellPhoneNumber, nationalCode, serviceId, orderId) => {
    const body = {
        issuerOtp, 
        cellPhoneNumber, 
        nationalCode, 
        serviceId, 
        orderId
    };

    const result = await commonModules.request('post', `/entryNodeServices/limitProfile`, {'Content-Type': 'application/json-patch+json'}, undefined, body);

    return result;
};

const profileRegister = async (body) => {
    const result = await commonModules.request('get', '/entryNodeServices/profile', {'Content-Type': 'application/json-patch+json'}, undefined, body);

    return result;
};

module.exports = {
    kycOtp,
    getJobs,
    getBanks,
    getToken,
    getMobile,
    getCities,
    serveFile,
    getProfile,
    getServices,
    getSections,
    getSignature,
    entryNodeOtp,
    getCountries,
    limitProfile,
    getProvinces,
    paymentFactor,
    paymentsVerify,
    profileRegister,
    getServicesById,
    getPaymentToken,
    authenticatorOtp,
    entryNodeServices,
    checkPaymentStatus,
    authenticatorStatus,
    getFinancialBrokers,
    authenticatorPostIds,
    getIndividualProfile,
    getAuthenticateOffices,
    getIndividualSjmStatus,
    checkIndividualSjmStatus,
};