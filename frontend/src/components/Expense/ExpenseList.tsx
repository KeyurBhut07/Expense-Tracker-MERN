import React from 'react';
import { LuDownload } from 'react-icons/lu';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import moment from 'moment';

// Import your Transaction type
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

interface ExpenseListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
  onDowload: () => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({
  transactions,
  onDelete,
  onDowload,
}) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">All Expenses</h5>
        <button className="card-btn" onClick={onDowload}>
          <LuDownload className="text-base" /> Download
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {transactions.map((income) => (
          <TransactionInfoCard
            key={income._id}
            title={income.category}
            icon={income.icon}
            date={moment(income.date).format('Do MMM YYYY')}
            amount={income.amount}
            type="expense"
            onDelete={() => onDelete(income._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
