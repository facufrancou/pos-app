const express = require('express');
const { processSale, getDailySales } = require('../controllers/saleController');
const router = express.Router();

router.post('/', processSale);
router.get('/daily', getDailySales);

module.exports = router;
