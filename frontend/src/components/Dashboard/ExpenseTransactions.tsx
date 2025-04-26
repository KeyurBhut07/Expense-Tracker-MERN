import { LuArrowRight } from 'react-icons/lu';
import React from 'react';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import moment from 'moment';

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
  transactions: Transaction[] | undefined;
  onSeeMore: () => void;
}

export const ExpenseTransactions: React.FC<RecentTransactionsProps> = ({
  transactions,
  onSeeMore,
}) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Expense</h5>
        <button className="card-btn" onClick={onSeeMore}>
          See All
          <LuArrowRight className="text-base" />
        </button>
      </div>
      <div className="mt-6">
        {transactions?.slice(0, 5)?.map((item) => (
          <TransactionInfoCard
            key={item._id}
            title={item.category || ''}
            icon={item.icon}
            date={moment(item.date).format('Do MMM YYYY')}
            amount={item.amount}
            type={item.type || 'expense'}
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};
