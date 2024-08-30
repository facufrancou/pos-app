const { getSales, addSale } = require('../models/saleModel');

function processSale(req, res) {
    const sale = req.body;

    if (!sale.items || sale.items.length === 0) {
        return res.status(400).json({ error: 'La venta debe incluir al menos un producto' });
    }

    const newSale = addSale(sale);
    res.status(201).json(newSale);
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
