import React from 'react';
import { LuArrowRight } from 'react-icons/lu';
import moment from 'moment';
import TransactionInfoCard from '../Cards/TransactionInfoCard';

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

const RecentTransactions: React.FC<RecentTransactionsProps> = ({
  transactions,
  onSeeMore,
}) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between ">
        <h5 className="text-lg"> Recent Transaction</h5>
        <button className="card-btn" onClick={onSeeMore}>
          See All
          <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {transactions?.slice(0, 5)?.map((item) => (
          <TransactionInfoCard
            key={item._id}
            title={
              item.type == 'expense' ? item.category || '' : item.source || ''
            }
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

export default RecentTransactions;
