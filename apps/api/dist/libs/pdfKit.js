"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPDF = buildPDF;
exports.default = generatePDF;
const PDFDocument = require('pdfkit-table');
function buildPDF(dataHeaders, dataRows, response, dataCallback, endCallback) {
    const doc = new PDFDocument();
    doc.pipe(response);
    const tableArray = {
        headers: dataHeaders,
        rows: dataRows,
    };
    doc.table(tableArray);
    doc.end();
}
async function generatePDF(dataHeader, dataRows) {
    const pdfBuffer = await new Promise(resolve => {
        const doc = new PDFDocument({
            size: "LETTER",
            bufferPage: true,
            layout: "portrait",
        });
        doc.moveTo(0, 0, 0);
        const tableArray = {
            headers: dataHeader,
            rows: dataRows,
        };
        doc.table(tableArray, { width: 300, align: 'center', valign: 'middle', fontSize: 14 });
        const buffer = [];
        doc.on('data', buffer.push.bind(buffer));
        doc.on('end', () => {
            const data = Buffer.concat(buffer);
            resolve(data);
        });
        doc.end();
    });
    return pdfBuffer;
}
//# sourceMappingURL=pdfKit.js.map