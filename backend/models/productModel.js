const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../data/products.json');

function getProducts() {
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
    return db.products;
}

function updateProduct(id, updates) {
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
    const product = db.products.find(p => p.id === id);
    if (product) {
        Object.assign(product, updates); // Actualiza el producto con los nuevos datos
        fs.writeFileSync(dbPath, JSON.stringify(db, null, 2)); // Guarda los cambios en el archivo JSON
        return product;
    }
    return null;
}

module.exports = {
    getProducts,
    updateProduct,
};
