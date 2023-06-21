const { Router } = require('express');

const usersController = require('../controllers/UsersController');

const adminRoutes = Router();

adminRoutes.post('/register', usersController.registerByAdmin);

module.exports = adminRoutes;