const express = require('express');
const routes = express.Router();
const authControllers = require('../controllers/auth');

routes.post('/register', authControllers.register);

routes.post('/login', authControllers.login);

routes.post('/getUser', authControllers.getUserInfo);

module.exports = routes;
