import React, { useEffect, useState } from 'react';
import { prepareExpenseBarChartData } from '../../utils/helper';
import CustomeBarChart from '../Charts/CustomeBarChart';

// Define a single transaction type
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

// Props for RecentTransactions
interface RecentTransactionsProps {
  data: Transaction[] | undefined;
}
const Last30DaysExpenses: React.FC<RecentTransactionsProps> = ({ data }) => {
  const [chartData, setChartData] = useState<any>([]);

  useEffect(() => {
    if (!data) return;
    const result = prepareExpenseBarChartData(data);
    setChartData(result);
    return () => {};
  }, [data]);
  return (
    <div className="card col-span-1">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 30 Days Transactions</h5>
      </div>

      <CustomeBarChart data={chartData} />
    </div>
  );
};

export default Last30DaysExpenses;
