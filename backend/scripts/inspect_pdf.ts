
import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function inspectPdf() {
    const templatePath = path.join(process.cwd(), 'assets', 'contract_template.pdf');

    if (!fs.existsSync(templatePath)) {
        console.error("File not found:", templatePath);
        return;
    }

    const pdfBytes = fs.readFileSync(templatePath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const form = pdfDoc.getForm();
    const fields = form.getFields();

    console.log("Fields found in PDF:");
    fields.forEach(field => {
        console.log(`- ${field.getName()} (${field.constructor.name})`);
    });
}

inspectPdf().catch(console.error);
