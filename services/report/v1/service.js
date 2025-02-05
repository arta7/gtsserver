const model = require('./model');
const  customErrors = require('../../../lib/custom_errors');
const uuid = require('uuid');
const fs = require('fs');
const path = require('path');
const Excel = require('exceljs');
// const Stimulsoft  = require('stimulsoft-reports-js');
const { filesCatalog, utils } = require('../../../lib');

const loadReport = async (fileType, exclusiveReportId, userId, workgroupId, organizationId, isManager, PageSize, PageNumber) => {
    let headers;
    const fileColArray = [];
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');
    // worksheet.getSheetValues().alignment = { readingOrder: 'rtl'};


    const columns = [{'fieldCaption': 'name','aliasName': 'p'}]//await getReportStructure(exclusiveReportId);
    const rows = [5, 10]//await getReportDate(exclusiveReportId, userId, workgroupId, organizationId, isManager, PageSize, PageNumber);

    columns.forEach(element => {
        fileColArray.push({
            header: element.fieldCaption,
            key: element.aliasName,
            width: 10
        });
    });
    
    worksheet.columns = fileColArray;

    rows.forEach(element => {
        worksheet.addRow(element);
    });
  
    switch(fileType) {
        case 'excel': 
            result = await workbook.xlsx.writeBuffer();
            headers = {
                'Content-Type': 'text/xlsx',
                'Content-Disposition': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }
            break;
        case 'csv':
            result = await workbook.csv.writeBuffer()
            headers = {
                'Content-Type': 'text/csv',
                'Content-Disposition': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }
            break;
        case 'pdf':
            // pdf.setCreationDate(fileColArray.toString(), 1, 1);
            // pdf.save("two-by-four.pdf");
            // headers = {
            //     'Content-Type': 'application/pdf',
            //     'Content-disposition': `attachment; filename=test.pdf`,
            // }
            break;
        default: 
            result = '';
            break;
    }

    return {data: Buffer.from(result).toString('base64'), headers};

        // const filePath = `${path.dirname(require.main.filename)}\\assets\\reports\\`;
    // workbook.commit();
    // workbook.xlsx.writeFile('./temp.xlsx').then(function() {
    //     // done
    //     console.log('file is written');
    // });
    // var fileName = 'FileName.xlsx';

    // response.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    // response.header("Content-Disposition", "attachment; filename=" + fileName);
   



    // Stimulsoft.Base.StiFontCollection.addOpentypeFontFile("Roboto-Black.ttf");

    // var report = new Stimulsoft.Report.StiReport();
    // report.loadFile(`${filePath}Report.MRT`);
    // report.renderAsync();
    // var pdfData = report.exportDocumentAsync(Stimulsoft.Report.StiExportFormat.Pdf);
    // var buffer = Buffer.from(pdfData).toString('base64');
    // // var buffer = Buffer.from(pdfData);
    // fs.writeFileSync(`${filePath}Report2.pdf`, buffer);

    // const promise =await new Promise((resolve) => {
    //     // finalPathFile = `${pathFile}.csv`;
    // const pdfData = "111";
    // const promise =await new Promise((resolve) => {
    //     report.renderAsync(() => {
    //         report.exportDocumentAsync((pdfData) => {
    //             let buffer = Buffer.from(pdfData);
    //             var buffer2 = Buffer.from(pdfData).toString('base64');                //  const id = uuid.v4();
    //         // fs.writeFileSync(`${filePath}Report2.pdf`, buffer);
    //         resolve(buffer)
    //         }, Stimulsoft.Report.StiExportFormat.Excel);
    //     });
    // });


    // tmp.file(async function _tempFileCreated(err, pathFile, fd, cleanupCallback) {
    //     if (err) throw err;

    //     finalPathFile = `${pathFile}.csv`;

    //     const report = new Stimulsoft.Report.StiReport();
    //     await report.loadFile(`${path.dirname(require.main.filename)}\\assets\\reports\\Report.MRT`);

    //     const pdfData = "111";
    //     report.renderAsync(() => {
    //         console.log("Report rendered. Pages count: ", report.renderedPages.count);
        
    //         // Export to PDF
    //         report.exportDocumentAsync((pdfData) => {
    //             let buffer = Buffer.from(pdfData);
    //             //  const id = uuid.v4();
    //             fs.writeFileSync(finalPathFile, buffer);
    //         }, Stimulsoft.Report.StiExportFormat.Csv);
    //     });

    //     // const fs.readFileSync(finalPathFile);

    //     return finalPathFile;
    //     // cleanupCallback();
    //   });
    // const result = await model.confirm(cellPhoneNumber, code);


    // const load = await report.loadFile(`${path.dirname(require.main.filename)}\\assets\\reports\\${fileId}.MRT`);

};

const remove = async (reportId) => {
    const result = await model.remove(reportId);

    if (!result) throw new customErrors.RemoveBaseDataError();

    return true;
};

const getComponentField = async (componentId) => {
    const result = await model.getComponentField(componentId);

    return result;
};


const getComponent = async (subSystemId, systemId) => {
    const result = utils.convertSqlJsonResult(await model.getComponent(subSystemId, systemId));

    return result;
};

const getReportDate = async (exclusiveReportId, userId, workgroupId, organizationId, isManager, PageSize, PageNumber) => {
    const result = await model.getReportDate(exclusiveReportId, userId, workgroupId, organizationId, isManager, PageSize, PageNumber);

    return result;
};

const getReportDetail = async (reportId) => {
    const result = utils.convertSqlJsonResult(await model.getReportDetail(reportId));

    return result;
};

const getReportList = async (componentId) => {
    const result = utils.convertSqlJsonResult(await model.getReportList(componentId));

    return result;
};

const getReportStructure = async (reportId) => {
    const result = utils.convertSqlJsonResult(await model.getReportStructure(reportId));

    return result;
};

const create = async (json) => {
    const result = await model.create(json);

    return result;
};

const getStatisticsReportData = async (subSystemId, statisticsReportId, userId, workgroupId, organizationId, isManager, json) => {
    const result = utils.convertSqlJsonResult(await model.getStatisticsReportData(subSystemId, statisticsReportId, userId, workgroupId, organizationId, isManager, json));

    return result;
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