const express = require('express');
const { isAuthenticate } = require('../middleware/authMiddleware');
const routes = express.Router();
const dashboardControllers = require('../controllers/dashboard');

routes.get('/', isAuthenticate, dashboardControllers.getDashboardData);

module.exports = routes;
