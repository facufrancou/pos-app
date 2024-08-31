const express = require('express');
const cors = require('cors');
const path = require('path');  // Importa el módulo 'path'

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const saleRoutes = require('./routes/saleRoutes');
const cashRegisterRoutes = require('./routes/cashRegisterRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/cash-register', cashRegisterRoutes);

// Sirve los archivos de ticket desde el directorio 'tickets'
app.use('/tickets', express.static(path.join(__dirname, 'tickets')));

module.exports = app;
