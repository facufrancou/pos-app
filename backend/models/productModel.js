const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../data/products.json');

function getProducts() {
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
    return db.products;
}

function getProductById(id) {
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
    return db.products.find(p => p.id === id);
}

function updateProduct(id, updates) {
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
    const product = db.products.find(p => p.id === id);
    if (product) {
        Object.assign(product, updates);
        fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
        return product;
    }
    return null;
}

function addProduct(name, price, stock) {
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
    const newProduct = {
        id: db.products.length + 1,
        name,
        price,
        stock
    };
    db.products.push(newProduct);
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    return newProduct;
}

function deleteProduct(id) {
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
    const productIndex = db.products.findIndex(p => p.id === id);
    if (productIndex !== -1) {
        db.products.splice(productIndex, 1);
        fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
        return true;
    }
    return false;
}

module.exports = {
    getProducts,
    getProductById,
    updateProduct,
    addProduct,
    deleteProduct
};
