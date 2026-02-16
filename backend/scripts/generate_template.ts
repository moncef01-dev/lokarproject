
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function createTemplate() {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]); // A4
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const form = pdfDoc.getForm();

    const drawText = (text: string, x: number, y: number, size: number = 12) => {
        page.drawText(text, { x, y, size, font, color: rgb(0, 0, 0) });
    };

    const createField = (name: string, x: number, y: number, width: number = 200, height: number = 20) => {
        const textField = form.createTextField(name);
        textField.setText('');
        textField.addToPage(page, { x, y, width, height });
    };

    let y = 800;
    drawText('RENTAL CONTRACT', 200, y, 20);
    y -= 40;

    drawText('Client Details', 50, y);
    y -= 30;
    drawText('Name:', 50, y);
    createField('customer_name', 150, y);
    y -= 30;
    drawText('Address:', 50, y);
    createField('customer_address', 150, y);
    y -= 30;
    drawText('DOB:', 50, y);
    createField('customer_birth_date', 150, y);
    y -= 30;
    drawText('Phone:', 50, y);
    createField('customer_phone', 150, y);

    y -= 50;
    drawText('Agency Details', 50, y);
    y -= 30;
    drawText('Name:', 50, y);
    createField('agency_name', 150, y);
    y -= 30;
    drawText('Address:', 50, y);
    createField('agency_address', 150, y);
    y -= 30;
    drawText('Phone:', 50, y);
    createField('agency_office_phone', 150, y);

    y -= 50;
    drawText('Vehicle Details', 50, y);
    y -= 30;
    drawText('Car:', 50, y);
    createField('car_brand_model', 150, y);

    y -= 50;
    drawText('Rental Details', 50, y);
    y -= 30;
    drawText('Start Date:', 50, y);
    createField('rental_start_date', 150, y);
    y -= 30;
    drawText('End Date:', 50, y);
    createField('rental_end_date', 150, y);
    y -= 30;
    drawText('Days:', 50, y);
    createField('rental_days', 150, y);
    y -= 30;
    drawText('Price/Day:', 50, y);
    createField('price_per_day', 150, y);
    y -= 30;
    drawText('Total:', 50, y);
    createField('total_price', 150, y);

    const pdfBytes = await pdfDoc.save();
    const __filename = new URL(import.meta.url).pathname;
    const __dirname = path.dirname(__filename);
    // Adjust for Windows if needed, or just use process.cwd()
    const outputPath = path.join(process.cwd(), 'assets', 'contract_template.pdf');

    // Ensure directory exists
    if (!fs.existsSync(path.dirname(outputPath))) {
        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    }

    fs.writeFileSync(outputPath, pdfBytes);
    console.log('Template created at:', outputPath);
}

createTemplate().catch(console.error);
