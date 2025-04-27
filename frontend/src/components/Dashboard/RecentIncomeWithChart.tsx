import React, { useEffect, useState } from 'react';
import CustomePieChart from '../Charts/CustomePieChart';

const COLORS = ['#875CF5', '#FA2C37', '#FF6900', '#4f39f6'];

export interface Transaction {
  _id: string;
  userId: string;
  icon: string;
  category?: string;
  source?: string;
  amount: number;
  date: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  type?: 'income' | 'expense';
}

export interface RecentIncome {
  totalIncome: number;
  data: Transaction[];
}

const RecentIncomeWithChart: React.FC<RecentIncome> = ({
  data,
  totalIncome,
}) => {
  const [chartData, setChartData] = useState<any[]>([]);
  const prepareChartData = () => {
    const dataArr = data?.map((item) => ({
      name: item.source,
      amount: item.amount,
    }));
    setChartData(dataArr);
  };

  useEffect(() => {
    prepareChartData();
    return () => {};
  }, [data]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 60 Days Income</h5>
      </div>

      <CustomePieChart
        data={chartData}
        label="Total Income"
        totalAmount={`₹ ${totalIncome}`}
        colors={COLORS}
        showTextAnchor
      />
    </div>
  );
};

export default RecentIncomeWithChart;
