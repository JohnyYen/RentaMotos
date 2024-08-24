import * as PDFDocument from 'pdfkit'
import * as PDFTable from 'pdfkit-table';
export default function buildPDF( dataHeaders, dataRows,dataCallback?, endCallback?){
    const doc = new PDFDocument();
    //const table = new PDFDocumentWithTables(doc);
    //const table = new PDFTable(doc);
    doc.on('data', dataCallback);
    doc.on('end', endCallback);

    const tableArray = {
        headers: dataHeaders,
        rows: dataRows,
    };

   // doc.page.size = 'A4';
   // table.draw;
    
    doc.table(tableArray, {width: 300});
    doc.end();

    //return doc.buffer;
}