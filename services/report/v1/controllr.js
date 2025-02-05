// const uuid = require('uuid');
// const messaging = require('../../../lib/messageing');
// const customErrors = require('../../../lib/custom_errors');
const service = require('./service');

const loadReport = async (req, res) => {
    const { 
        fileType, exclusiveReportId, userId, workgroupId, organizationId, isManager, PageSize, PageNumber,
     } = req.body;

    const result = await service.loadReport(fileType, exclusiveReportId, userId, workgroupId, organizationId, isManager, PageSize, PageNumber);

    res.send(result);
};

const remove = async (req, res) => {
    const { reportId } = req.params;

    const result = await service.remove(reportId);

    res.send(result);
};

const getComponentField = async (req, res) => {
    const { componentId } = req.params;

    const result = await service.getComponentField(componentId);

    res.send(result);
};

const getComponent = async (req, res) => {
    const { subSystemId, systemId } = req.params;

    const result = await service.getComponent(subSystemId, systemId);

    res.send(result);
};

const getReportDate = async (req, res) => {
    const { 
        exclusiveReportId, userId, workgroupId, organizationId, isManager, PageSize, PageNumber,
     } = req.body;

    const result = await service.getReportDate(exclusiveReportId, userId, workgroupId, organizationId, isManager, PageSize, PageNumber);

    res.send(result);
};

const getReportDetail = async (req, res) => {
    const { reportId } = req.params;

    const result = await service.getReportDetail(reportId);

    res.send(result);
};

const getReportList = async (req, res) => {
    const { componentId } = req.params;

    const result = await service.getReportList(componentId);

    res.send(result);
};

const getReportStructure = async (req, res) => {
    const { reportId } = req.params;

    const result = await service.getReportStructure(reportId);

    res.send(result);
};

const create = async (req, res) => {
    const { json } = req.body;

    const result = await service.create(json);

    res.send(result);
};

const getStatisticsReportData = async (req, res) => {
    const { 
        subSystemId, statisticsReportId, userId, workgroupId, organizationId, isManager, json,
     } = req.body;

    const result = await service.getStatisticsReportData(subSystemId, statisticsReportId, userId, workgroupId, organizationId, isManager, json);

    res.send(result);
};

module.exports = {
    remove,
    create,
    loadReport,
    getComponent,
    getReportDate,
    getReportList,
    getReportDetail,
    getComponentField,
    getReportStructure,
    getStatisticsReportData,
};