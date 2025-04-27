import { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import IncomeOverview from '../../components/Income/IncomeOverview';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATH } from '../../utils/apiPaths';
import Modal from '../../components/Modal';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import toast from 'react-hot-toast';
import IncomeList from '../../components/Income/IncomeList';
import DeleteAlert from '../../components/DeleteAlert';
import { useUserAuth } from '../../hooks/useUserAuth';

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

const Income = () => {
  useUserAuth();
  const [openAddIncome, setOpenAddIncomeModel] = useState(false);
  const [incomeData, setIncomeData] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  // Get All Income
  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get<Transaction[]>(
        `${API_PATH.INCOME.GET_ALL_INCOME}`
      );
      if (response?.data) {
        setIncomeData(response?.data);
      }
    } catch (error) {
      console.log('Something went wrong.', error);
    } finally {
      setLoading(false);
    }
  };

  // Add Income
  const handleAddIncome = async (income: any) => {
    const { source, amount, date, icon } = income;

    // validation check
    if (!source.trim()) {
      toast.error('Source is required.');
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
      await axiosInstance.post(API_PATH.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon,
      });
      setOpenAddIncomeModel(false);
      toast.success('Income added successfully.');
      fetchIncomeDetails();
    } catch (error: any) {
      console.log('Error addin income', error?.response?.data?.message);
    }
  };

  // Delete Income
  const deleteIncome = async (id: any) => {
    try {
      await axiosInstance.delete(API_PATH.INCOME.DELETE_INCOME(id));
      setOpenDeleteAlert({
        show: false,
        data: null,
      });
      toast.success('Income details deleted successfully.');
      fetchIncomeDetails();
    } catch (error) {
      console.log('Error deleting income.');
    }
  };

  // Handle Dowload income details
  const handleDownloadIncomeDetails = async () => {};

  useEffect(() => {
    fetchIncomeDetails();

    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModel(true)}
            />
          </div>

          <IncomeList
            transactions={incomeData}
            onDelete={(id: any) => {
              setOpenDeleteAlert({ show: true, data: id });
            }}
            onDowload={handleDownloadIncomeDetails}
          />
        </div>
        <Modal
          isOpen={openAddIncome}
          onClose={() => setOpenAddIncomeModel(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Incom Delete"
        >
          <DeleteAlert
            content="Are you sure you want to delete this income?"
            onDelete={() => deleteIncome(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Income;
