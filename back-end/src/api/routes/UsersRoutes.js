const { Router } = require('express');

const usersController = require('../controllers/UsersController');

const usersRoutes = Router();

usersRoutes.post('/login', usersController.login);
usersRoutes.post('/register', usersController.register);
usersRoutes.get('/sellers', usersController.getSellers);
usersRoutes.post('/admin/register', usersController.registerByAdmin);

module.exports = usersRoutes;