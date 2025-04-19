const Users = require('../models/Users');
const Incomes = require('../models/Income');
const xlsx = require('xlsx');

const addIncome = async (req, res) => {
  try {
    const userId = req.user._id;
    const { icon, source, amount, date } = req.body;
    const newIncome = new Incomes({
      icon,
      source,
      amount,
      date,
      userId,
    });
    await newIncome.save();
    res.status(201).json(newIncome);
  } catch (error) {
    res.status(500).json({ message: 'Error adding income' });
  }
};

const getAllIncome = async (req, res) => {
  try {
    const userId = req.user._id;
    const income = await Incomes.find({ userId }).sort({ date: -1 });
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching income' });
  }
};

const dowloandIncomeExcel = async (req, res) => {
  try {
    const userId = req.user._id;
    const income = await Incomes.find({ userId }).sort({ date: -1 });
    const data = income.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, 'Income');
    xlsx.writeFile(wb, 'income_details.xlsx');
    res.download('income_details.xlsx');
  } catch (error) {
    res.status(500).json({ message: 'Error dowloanding income excel' });
  }
};

const deleteIncome = async (req, res) => {
  try {
    await Incomes.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Income deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error delete income' });
  }
};

module.exports = {
  addIncome,
  getAllIncome,
  dowloandIncomeExcel,
  deleteIncome,
};
