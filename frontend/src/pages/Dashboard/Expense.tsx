import { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useUserAuth } from '../../hooks/useUserAuth';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATH } from '../../utils/apiPaths';
import toast from 'react-hot-toast';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import Modal from '../../components/Modal';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import DeleteAlert from '../../components/DeleteAlert';
import ExpenseList from '../../components/Expense/ExpenseList';

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

const Expense = () => {
  useUserAuth();
  const [openAddExpenseModel, setOpenAddExpenseModel] = useState(false);
  const [expenseData, setExpenseData] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  // Get All Expense
  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get<Transaction[]>(
        `${API_PATH.EXPENSE.GET_ALL_EXPENSE}`
      );
      if (response?.data) {
        setExpenseData(response?.data);
      }
    } catch (error) {
      console.log('Something went wrong.', error);
    } finally {
      setLoading(false);
    }
  };

  // Add Expense
  const handleAddExpense = async (income: any) => {
    const { category, amount, date, icon } = income;

    // validation check
    if (!category.trim()) {
      toast.error('Category is required.');
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error('Amount should be a valid number greater than 0.');
      return;
    }
    if (!date) {
      toast.error('Date is required.');
      return;
    }

    try {
      await axiosInstance.post(API_PATH.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      });
      setOpenAddExpenseModel(false);
      toast.success('Expense added successfully.');
      fetchExpenseDetails();
    } catch (error: any) {
      console.log('Error adding expense', error?.response?.data?.message);
    }
  };

  // Delete Expense
  const deleteExpense = async (id: any) => {
    try {
      await axiosInstance.delete(API_PATH.EXPENSE.DELETE_EXPENSE(id));
      setOpenDeleteAlert({
        show: false,
        data: null,
      });
      toast.success('Expense details deleted successfully.');
      fetchExpenseDetails();
    } catch (error) {
      console.log('Error deleting expense.');
    }
  };

  // Handle Dowload expense details
  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.post(
        API_PATH.EXPENSE.DOWLOAND_EXPENSE,
        {
          responseType: 'blob',
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'expense_details.xlsx');
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log('Error Downloading expense detail', error);
      toast.error('Failed to download. Please try after sometime.');
    }
  };

  useEffect(() => {
    fetchExpenseDetails();

    return () => {};
  }, []);
  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <ExpenseOverview
              transactions={expenseData}
              onAddExpense={() => setOpenAddExpenseModel(true)}
            />
          </div>
          <ExpenseList
            transactions={expenseData}
            onDelete={(id: any) => {
              setOpenDeleteAlert({ show: true, data: id });
            }}
            onDowload={handleDownloadExpenseDetails}
          />
        </div>
        <Modal
          isOpen={openAddExpenseModel}
          onClose={() => setOpenAddExpenseModel(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Expense Delete"
        >
          <DeleteAlert
            content="Are you sure you want to delete this expense?"
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Expense;
