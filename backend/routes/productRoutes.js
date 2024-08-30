const express = require('express');
const { listProducts, getProductByIdController, modifyProduct, createProduct, removeProduct } = require('../controllers/productController');
const router = express.Router();

router.get('/', listProducts);
router.get('/:id', getProductByIdController);
router.put('/:id', modifyProduct);
router.post('/', createProduct);
router.delete('/:id', removeProduct);

module.exports = router;
