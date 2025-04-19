const express = require('express');
const routes = express.Router();
const expenseControllers = require('../controllers/expense');
const { isAuthenticate } = require('../middleware/authMiddleware');

routes.post('/add', isAuthenticate, expenseControllers.addExpense);
routes.get('/get', isAuthenticate, expenseControllers.getAllExpense);
routes.post(
  '/downloadexcel',
  isAuthenticate,
  expenseControllers.dowloandExpenseExcel
);
routes.delete('/:id', isAuthenticate, expenseControllers.deleteExpense);

module.exports = routes;
