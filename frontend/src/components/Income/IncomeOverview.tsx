import React, { useEffect, useState } from 'react';
import { prepareIncomeBarChartData } from '../../utils/helper';
import { LuPlus } from 'react-icons/lu';
import CustomeBarChart from '../Charts/CustomeBarChart';

export interface Transaction {
  _id: string;
  userId: string;
  icon: string;
  source: string;
  amount: number;
  date: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface IncomeOverviewProps {
  transactions: Transaction[];
  onAddIncome: () => void;
}

const IncomeOverview: React.FC<IncomeOverviewProps> = ({
  transactions,
  onAddIncome,
}: any) => {
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    const result: any = prepareIncomeBarChartData(transactions);
    setChartData(result);
    return () => {};
  }, [transactions]);
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div className="">
          <h5 className="text-lg">Income Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your earnings over time and analyze your income trends.
          </p>
        </div>
        <button className="add-btn" onClick={onAddIncome}>
          <LuPlus className="text-lg" /> Add Income
        </button>
      </div>
      <div className="mt-10">
        <CustomeBarChart data={chartData} />
      </div>
    </div>
  );
};

export default IncomeOverview;
