const PDFDocument = require('pdfkit-table');

export function buildPDF( dataHeaders, dataRows, response, dataCallback?, endCallback?){
    const doc = new PDFDocument();
    //const table = new PDFDocumentWithTables(doc);
    //const table = new PDFTable(doc);
    //doc.on('data', dataCallback);
    //doc.on('end', endCallback);
    doc.pipe(response);
    const tableArray = {
        headers: dataHeaders,
        rows: dataRows,
    };

   // doc.page.size = 'A4';
   // table.draw;
    
    doc.table(tableArray);
    doc.end();

    //return doc.buffer;
}

export default async function generatePDF(dataHeader, dataRows){
    const pdfBuffer : Buffer = await new Promise(resolve => {
        const doc = new PDFDocument({
            size: "LETTER",
            bufferPage: true
        });
        
        const tableArray = {
            headers: dataHeader,
            rows: dataRows,
        };

        doc.table(tableArray, {width: 300});

        const buffer = [];
        doc.on('data', buffer.push.bind(buffer));
        doc.on('end', () => {
            const data = Buffer.concat(buffer);
            resolve(data);
        })

        doc.end();
    })

    return pdfBuffer;
}