import React, { useState } from 'react';
import Input from '../inputs/Input';
import EmojiPickerPopup from '../EmojiPickerPopup';

interface AddExpenseFormProps {
  onAddExpense: (income: any) => void;
}
interface ExpenseFormData {
  category: string;
  amount: string;
  date: string;
  icon: string;
}

const AddExpenseForm: React.FC<AddExpenseFormProps> = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    category: '',
    amount: '',
    date: '',
    icon: '',
  });

  const handleChange = (key: keyof ExpenseFormData, value: string) => {
    setExpense((prev) => ({ ...prev, [key]: value }));
  };
  return (
    <div>
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(selectedIcon: any) => handleChange('icon', selectedIcon)}
      />
      <Input
        value={expense.category}
        onChange={({ target }) => handleChange('category', target.value)}
        label="Expense Category"
        placeholder="Movie, Travel, etc"
        type="text"
      />
      <Input
        value={expense.amount}
        onChange={({ target }) => handleChange('amount', target.value)}
        label="Amount"
        placeholder=""
        type="text"
      />
      <Input
        value={expense.date}
        onChange={({ target }) => handleChange('date', target.value)}
        label="Date"
        placeholder=""
        type="date"
      />
      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={() => onAddExpense(expense)}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
