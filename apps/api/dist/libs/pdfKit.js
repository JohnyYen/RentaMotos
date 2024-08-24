"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = buildPDF;
const PDFDocument = require("pdfkit");
function buildPDF(dataHeaders, dataRows, dataCallback, endCallback) {
    const doc = new PDFDocument();
    doc.on('data', dataCallback);
    doc.on('end', endCallback);
    const tableArray = {
        headers: dataHeaders,
        rows: dataRows,
    };
    doc.table(tableArray, { width: 300 });
    doc.end();
}
//# sourceMappingURL=pdfKit.js.map