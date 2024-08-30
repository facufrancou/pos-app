const express = require('express');
const { getCashRegisterData, addExpenseController } = require('../controllers/cashRegisterController');
const router = express.Router();

router.get('/close', getCashRegisterData);
router.post('/expenses', addExpenseController);

module.exports = router;
