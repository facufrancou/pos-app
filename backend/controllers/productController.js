const { getProducts, getProductById, updateProduct, addProduct, deleteProduct } = require('../models/productModel');

function listProducts(req, res) {
    const products = getProducts();
    res.json(products);
}

function getProductByIdController(req, res) {
    const { id } = req.params;
    const product = getProductById(parseInt(id));
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
}

function modifyProduct(req, res) {
    const { id } = req.params;
    const updates = req.body;

    const updatedProduct = updateProduct(parseInt(id), updates);
    if (updatedProduct) {
        res.json(updatedProduct);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
}

function createProduct(req, res) {
    const { name, price, stock } = req.body;

    if (!name || price == null || stock == null) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    const newProduct = addProduct(name, price, stock);
    res.status(201).json(newProduct);
}

function removeProduct(req, res) {
    const { id } = req.params;
    const deleted = deleteProduct(parseInt(id));
    if (deleted) {
        res.status(204).send();
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
}

module.exports = {
    listProducts,
    getProductByIdController,
    modifyProduct,
    createProduct,
    removeProduct
};
