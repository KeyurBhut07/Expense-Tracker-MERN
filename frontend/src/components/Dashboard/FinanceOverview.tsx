import React from 'react';
import CustomePieChart from '../Charts/CustomePieChart';

const COLORS = ['#875CF5', '#FF6908', '#FA2C37'];

interface FinanceOverviewProps {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
}

const FinanceOverview: React.FC<FinanceOverviewProps> = ({
  totalBalance,
  totalIncome,
  totalExpense,
}) => {
  const balanceData = [
    { name: 'Total Balance', amount: totalBalance },
    { name: 'Total Income', amount: totalIncome },
    { name: 'Total Expense', amount: totalExpense },
  ];
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg"> Financial Overview</h5>
      </div>

      <CustomePieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={`${totalBalance}`}
        colors={COLORS}
        showTextAnchor={true}
      />
    </div>
  );
};

export default FinanceOverview;
