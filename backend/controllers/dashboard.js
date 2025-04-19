const Incomes = require('../models/Income');
const Expenses = require('../models/Expense');
const { isValidObjectId, Types } = require('mongoose');

const getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id;
    const userObjectId = new Types.ObjectId(String(userId));

    // Fetch total Income & Expenses
    const totalIncome = await Incomes.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    const totalExpense = await Expenses.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    // Get income transcation in the last 60 days
    const last60DaysIncomeTransaction = await Incomes.find({
      userId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    // Get total income for last 60 days
    const incomeLast60Days = last60DaysIncomeTransaction.reduce(
      (sum, trnaction) => sum + trnaction.amount,
      0
    );

    // Get expense transcation in the last 30 days
    const last30DaysExpenseTransaction = await Expenses.find({
      userId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    // Get total income for last 60 days
    const expenseLast30Days = last30DaysExpenseTransaction.reduce(
      (sum, trnaction) => sum + trnaction.amount,
      0
    );

    // Fetch last 5 transction (income + expense)
    // Fetch last 5 transactions (income + expense)
    const incomeTxns = await Incomes.find({ userId })
      .sort({ date: -1 })
      .limit(5);

    const expenseTxns = await Expenses.find({ userId })
      .sort({ date: -1 })
      .limit(5);

    const lastTransactions = [
      ...incomeTxns.map((txn) => ({
        ...txn.toObject(),
        type: 'income',
      })),
      ...expenseTxns.map((txn) => ({
        ...txn.toObject(),
        type: 'expense',
      })),
    ].sort((a, b) => new Date(b.date) - new Date(a.date)); // Ensure date is Date object

    // Final response
    res.json({
      totalBalance:
        (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
      totalIncome: totalIncome[0]?.total || 0,
      totalExpense: totalExpense[0]?.total || 0,
      last30DaysExpense: {
        total: expenseLast30Days,
        transactions: last30DaysExpenseTransaction,
      },
      last60DaysIncomeTransaction: {
        total: incomeLast60Days,
        transactions: last60DaysIncomeTransaction,
      },
      recentTransactions: lastTransactions,
    });
  } catch (error) {
    console.log('error: ', error);
    res.status(500).json({ message: 'Error in dashboard' });
  }
};

module.exports = {
  getDashboardData,
};
