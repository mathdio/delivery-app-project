const { Router } = require('express');

const usersController = require('../controllers/UsersController');

const adminRoutes = Router();

adminRoutes.post('/register', usersController.registerByAdmin);
adminRoutes.get('/users', usersController.getUsersToManage);

module.exports = adminRoutes;