/* const { getSales, addSale } = require('../models/saleModel');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Función para generar el ticket en formato PDF
function generarTicketPDF(venta) {
    if (venta.total === undefined) {
        throw new Error("El total de la venta no está definido");
    }

    const doc = new PDFDocument();
    const nombreArchivo = path.join(__dirname, `../tickets/ticket_${venta.id}.pdf`);

    // Crear directorio si no existe
    if (!fs.existsSync(path.join(__dirname, '../tickets'))) {
        fs.mkdirSync(path.join(__dirname, '../tickets'));
    }

    // Configurar el archivo de salida
    doc.pipe(fs.createWriteStream(nombreArchivo));

    // Información del ticket
    doc.fontSize(20).text('TICKET DE VENTA', { align: 'center' });
    doc.moveDown();

    doc.fontSize(12).text(`Fecha: ${new Date(venta.date).toLocaleString()}`);
    doc.text(`ID de Venta: ${venta.id}`);
    doc.text(`Punto de Venta: ${venta.punto_vta}`);
    doc.moveDown();

    doc.text('Productos:', { underline: true });
    venta.items.forEach(item => {
        doc.text(`${item.quantity} x ${item.name} - $${item.price.toFixed(2)} = $${(item.quantity * item.price).toFixed(2)}`);
    });

    doc.moveDown();
    doc.fontSize(10).text(`Total: $${venta.total.toFixed(2)}`, { align: 'right' });

    // Finalizar el PDF
    doc.end();

    
    return nombreArchivo;
}

// Función para procesar una venta y generar el ticket
async function processSale(req, res) {
    const venta = req.body;

    if (!venta.items || venta.items.length === 0) {
        return res.status(400).json({ error: 'La venta debe incluir al menos un producto' });
    }

    // Calcular el total de la venta
    venta.total = venta.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Agregar la venta al sistema
    const newSale = addSale(venta);

    // Generar el ticket en PDF
    const ticketPath = generarTicketPDF(newSale);
    let linkTicket = `/tickets/ticket_${venta.id}.pdf`
    console.log(linkTicket)
    // Responder con los detalles de la venta y la ruta del ticket
    res.status(201).json({ venta: newSale, linkTicket });
}

// Función para obtener las ventas diarias (si la necesitas)
function getDailySales(req, res) {
    const sales = getSales();
    const today = new Date().toISOString().split('T')[0];  // Obtener la fecha de hoy en formato YYYY-MM-DD
    const dailySales = sales.filter(sale => sale.date.startsWith(today));

    res.json(dailySales);
}

module.exports = {
    processSale,
    getDailySales
};
 */
const { getSales, addSale } = require('../models/saleModel');
const { updateProduct } = require('../models/productModel');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

function generarTicketPDF(venta) {
    if (venta.total === undefined) {
        throw new Error("El total de la venta no está definido");
    }

    const doc = new PDFDocument();
    const nombreArchivo = path.join(__dirname, `../tickets/ticket_${venta.id}.pdf`);

    if (!fs.existsSync(path.join(__dirname, '../tickets'))) {
        fs.mkdirSync(path.join(__dirname, '../tickets'));
    }

    doc.pipe(fs.createWriteStream(nombreArchivo));

    doc.fontSize(20).text('TICKET DE VENTA', { align: 'center' });
    doc.moveDown();

    doc.fontSize(12).text(`Fecha: ${new Date(venta.date).toLocaleString()}`);
    doc.text(`ID de Venta: ${venta.id}`);
    doc.text(`Punto de Venta: ${venta.punto_vta}`);
    doc.moveDown();

    doc.text('Productos:', { underline: true });
    venta.items.forEach(item => {
        doc.text(`${item.quantity} x ${item.name} - $${item.price.toFixed(2)} = $${(item.quantity * item.price).toFixed(2)}`);
    });

    doc.moveDown();
    doc.fontSize(14).text(`Total: $${venta.total.toFixed(2)}`, { align: 'right' });

    doc.end();

    console.log(`Ticket generado: ${nombreArchivo}`);
    return nombreArchivo;
}

async function processSale(req, res) {
    const venta = req.body;

    if (!venta.items || venta.items.length === 0) {
        return res.status(400).json({ error: 'La venta debe incluir al menos un producto' });
    }

    // Calcular el total de la venta
    venta.total = venta.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Descontar el stock
    venta.items.forEach(item => {
        const product = updateProduct(item.id, { stock: item.stock - item.quantity });
        if (!product) {
            return res.status(404).json({ error: `Producto con ID ${item.id} no encontrado` });
        }
    });

    // Agregar la venta al sistema
    const newSale = addSale(venta);

    // Generar el ticket en PDF
    const ticketPath = generarTicketPDF(newSale);
    let linkTicket = `/tickets/ticket_${venta.id}.pdf`
    console.log(linkTicket)
    // Responder con los detalles de la venta y la ruta del ticket
    res.status(201).json({ venta: newSale, linkTicket });
}

function getDailySales(req, res) {
    const sales = getSales();
    const today = new Date().toISOString().split('T')[0];
    const dailySales = sales.filter(sale => sale.date.startsWith(today));
    res.json(dailySales);
}

module.exports = {
    processSale,
    getDailySales
};
