import React, { useEffect, useState } from 'react';
import { prepareExpenseLineChartData } from '../../utils/helper';
import { LuPlus } from 'react-icons/lu';
import CustomeLineChart from '../Charts/CustomeLineChart';

export interface Transaction {
  _id: string;
  userId: string;
  icon: string;
  category: string;
  amount: number;
  date: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ExpenseOverviewProps {
  transactions: Transaction[];
  onAddExpense: () => void;
}

const ExpenseOverview: React.FC<ExpenseOverviewProps> = ({
  transactions,
  onAddExpense,
}) => {
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    const result: any = prepareExpenseLineChartData(transactions);
    setChartData(result);
    return () => {};
  }, [transactions]);
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div className="">
          <h5 className="text-lg">Expense Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your spending over time and gain insights you money goes.
          </p>
        </div>
        <button className="add-btn" onClick={onAddExpense}>
          <LuPlus className="text-lg" /> Add Expense
        </button>
      </div>
      <div className="mt-10">
        <CustomeLineChart data={chartData} />
      </div>
    </div>
  );
};

export default ExpenseOverview;
