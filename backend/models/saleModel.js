const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../data/sales.json');

function getSales() {
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
    return db.sales;
}

function addSale(sale) {
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
    sale.id = db.sales.length + 1;
    sale.date = new Date().toISOString();
    db.sales.push(sale);
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    return sale;
}

module.exports = {
    getSales,
    addSale
};
