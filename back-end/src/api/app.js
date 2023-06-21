const express = require('express');
require('express-async-errors');
const cors = require('cors');
const productsRoutes = require('./routes/ProductsRoutes');
const usersRoutes = require('./routes/UsersRoutes');
const salesRoutes = require('./routes/SalesRoutes');
const adminRoutes = require('./routes/AdminRoutes');
const auth = require('./middlewares/auth');
const ErrorMiddleware = require('./middlewares/ErrorMiddleware');

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static('public'));

app.use('/users', usersRoutes);
app.use('/products', productsRoutes);
app.use('/sales', auth, salesRoutes);
app.use('/admin', auth, adminRoutes);

app.use(ErrorMiddleware);

module.exports = app;
