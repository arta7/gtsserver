const uuid = require('uuid');
const customErrors = require('../../../lib/custom_errors');
const service = require('./service');
const { utils, commonModules } = require('../../../lib');
const config = require('../../../config');

const checkIndividualSjmStatus = async (req, res) => {
    const { nationalCode } = req.params;

    const result = await service.checkIndividualSjmStatus(nationalCode);

    res.send(result);
};

const getIndividualSjmStatus = async (req, res) => {
    const { nationalCode } = req.params;

    const result = await service.getIndividualSjmStatus(nationalCode);

    res.send(result);
};

const getCountries = async (req, res) => {
    const result = await service.getCountries();

    res.send(result);
};

const getProvinces = async (req, res) => {
    const { countryId } = req.body;

    const result = await service.getProvinces(countryId);

    res.send(result);
};

const getCities = async (req, res) => {
    const { countryId, provinceId } = req.body;

    const result = await service.getCities(countryId, provinceId);

    res.send(result);
};

const getSections = async (req, res) => {
    const { countryId, provinceId, cityId } = req.body;

    const result = await service.getSections(countryId, provinceId, cityId);

    res.send(result);
};

const getJobs = async (req, res) => {
    const result = await service.getJobs();

    res.send(result);
};

const getBanks = async (req, res) => {
    const result = await service.getBanks();

    res.send(result);
};

const getFinancialBrokers = async (req, res) => {
    const result = await service.getFinancialBrokers();

    res.send(result);
};

const getAuthenticateOffices = async (req, res) => {
    const result = await service.getAuthenticateOffices();

    res.send(result);
};

const kycOtp = async (req, res) => {
    const { nationalCode } = req.body;

    const result = await service.kycOtp(nationalCode);

    res.send(result);
};

const getProfile = async (req, res) => {
    const { nationalCode, code } = req.body;

    const result = await service.getProfile(nationalCode, code);

    res.send(result);
};

const getSignature = async (req, res) => {
    const { nationalCode } = req.params;

    const result = await service.getSignature(nationalCode);

    res.send(result);
};

const serveFile = async (req, res) => {
    const { fileName } = req.params;

    const result= await service.serveFile(fileName);

    res.send(result);
};

const getMobile = async (req, res) => {
    const { nationalCode } = req.params;

    const result= await service.getMobile(nationalCode);

    res.send(result);
};

const getServices = async (req, res) => {
    const result= await service.getServices();

    res.send(result);
};

const getServicesById = async (req, res) => {
    const { id } = req.params;

    const result= await service.getServicesById(id);

    res.send(result);
};

const getPaymentToken = async (req, res) => {
    const { serviceId, amount, isCalculatedAmount, orderId } = req.body;

    const result= await service.getPaymentToken(serviceId, amount, isCalculatedAmount, orderId);

    res.send(result);
};

const paymentsVerify = async (req, res) => {
    const { paymentToken } = req.body;

    const result= await service.paymentsVerify(paymentToken);

    res.send(result);
};

const checkPaymentStatus = async (req, res) => {
    const { orderId, serviceId } = req.body;

    const result= await service.checkPaymentStatus(orderId, serviceId);

    res.send(result);
};

const paymentFactor = async (req, res) => {
    const { 
        orderId, serviceId, fullName, nationalCode, mobile, address, profileOwnerType, postalCode
    } = req.body;

    const result= await service.paymentFactor(orderId, serviceId, fullName, nationalCode, mobile, address, profileOwnerType, postalCode);

    res.send(result);
};

const authenticatorOtp = async (req, res) => {
    const { traceCode, nationalCode } = req.body;

    const result= await service.authenticatorOtp(traceCode, nationalCode);

    res.send(result);
};

const getIndividualProfile = async (req, res) => {
    const { traceCode, nationalCode, code } = req.body;

    const result= await service.getIndividualProfile(traceCode, nationalCode, code);

    res.send(result);
};

const authenticatorStatus = async (req, res) => {
    const {
        traceCode, nationalCode, issuerOtp, issuerReference, privatePersonImage, privatePersonSignature
     } = req.body;

    const result= await service.getIndividualProfile(traceCode, nationalCode, issuerOtp, issuerReference, privatePersonImage, privatePersonSignature);

    res.send(result);
};

const authenticatorPostIds = async (req, res) => {
    const { body } = req;

    const result= await service.authenticatorPostIds(body);

    res.send(result);
};

const entryNodeOtp = async (req, res) => {
    const { cellPhoneNumber } = req.body;

    const result= await service.entryNodeOtp(cellPhoneNumber);

    res.send(result);
};

const entryNodeServices = async (req, res) => {
    const { cellPhoneNumber, nationalCode, code } = req.body;

    const result= await service.entryNodeServices(cellPhoneNumber, nationalCode, code);

    res.send(result);
};

const limitProfile = async (req, res) => {
    const {
         issuerOtp, cellPhoneNumber, nationalCode, serviceId, orderId
     } = req.body;

    const result= await service.limitProfile(issuerOtp, cellPhoneNumber, nationalCode, serviceId, orderId);

    res.send(result);
};

const profileRegister = async (req, res) => {
    const { body } = req;

    // const result= await service.profileRegister(body);

    res.send(result);
};

module.exports = {
    // getToken,
    kycOtp,
    getJobs,
    getBanks,
    getMobile,
    getCities,
    serveFile,
    getProfile,
    getSections,
    getServices,
    getSignature,
    getCountries,
    limitProfile,
    entryNodeOtp,
    getProvinces,
    paymentFactor,
    paymentsVerify,
    getPaymentToken,
    getServicesById,
    profileRegister,
    authenticatorOtp,
    entryNodeServices,
    checkPaymentStatus,
    authenticatorStatus,
    getFinancialBrokers,
    getIndividualProfile,
    authenticatorPostIds,
    getAuthenticateOffices,
    getIndividualSjmStatus,
    checkIndividualSjmStatus,
};