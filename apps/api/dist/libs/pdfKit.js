"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = buildPDF;
const pdfkit_table_1 = require("pdfkit-table");
function buildPDF(dataCallback, endCallback, dataHeaders, dataRows) {
    const doc = new pdfkit_table_1.default();
    console.log(doc);
    const tableArray = {
        headers: dataHeaders,
        rows: dataRows,
    };
    doc.table(tableArray, { width: 300 });
}
//# sourceMappingURL=pdfKit.js.map