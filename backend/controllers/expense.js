const Users = require('../models/Users');
const Expenses = require('../models/Expense');
const xlsx = require('xlsx');

const addExpense = async (req, res) => {
  try {
    const userId = req.user._id;
    const { icon, category, amount, date } = req.body;
    const newExpense = new Expenses({
      icon,
      category,
      amount,
      date,
      userId,
    });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: 'Error adding Expense' });
  }
};

const getAllExpense = async (req, res) => {
  try {
    const userId = req.user._id;
    const Expense = await Expenses.find({ userId }).sort({ date: -1 });
    res.status(200).json(Expense);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Expense' });
  }
};

const dowloandExpenseExcel = async (req, res) => {
  try {
    const userId = req.user._id;
    const Expense = await Expenses.find({ userId }).sort({ date: -1 });
    const data = Expense.map((item) => ({
      Category: item.category,
      Amount: item.amount,
      Date: item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, 'Expense');
    xlsx.writeFile(wb, 'Expense_details.xlsx');
    res.download('Expense_details.xlsx');
  } catch (error) {
    res.status(500).json({ message: 'Error dowloanding Expense excel' });
  }
};

const deleteExpense = async (req, res) => {
  try {
    await Expenses.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error delete Expense' });
  }
};

module.exports = {
  addExpense,
  getAllExpense,
  dowloandExpenseExcel,
  deleteExpense,
};
