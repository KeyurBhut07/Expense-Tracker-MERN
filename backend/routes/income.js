const express = require('express');
const routes = express.Router();
const incomeControllers = require('../controllers/income');
const { isAuthenticate } = require('../middleware/authMiddleware');

routes.post('/add', isAuthenticate, incomeControllers.addIncome);
routes.get('/get', isAuthenticate, incomeControllers.getAllIncome);
routes.post(
  '/downloadexcel',
  isAuthenticate,
  incomeControllers.dowloandIncomeExcel
);
routes.delete('/:id', isAuthenticate, incomeControllers.deleteIncome);

module.exports = routes;
