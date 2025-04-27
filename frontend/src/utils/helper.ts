import moment from 'moment';
import { Transaction } from '../components/Dashboard/RecentTransactions';

export const validateEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getInitials = (name: string): string => {
  const words = name.trim().split(' ');
  if (words.length === 1) return words[0].charAt(0).toUpperCase();
  return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
};

export const addThousandsSeparator = (num: number) => {
  if (num == null || isNaN(num)) return '';
  const [integerPart, fractionalPart] = num.toString().split('.');
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return fractionalPart
    ? `${fractionalPart}.${fractionalPart}`
    : formattedInteger;
};

export const prepareExpenseBarChartData = (data: Transaction[] = []) => {
  if (!data) return;
  const chartData = data?.map((item: any) => ({
    category: item?.category,
    amount: item?.amount,
  }));
  return chartData;
};

export const prepareIncomeBarChartData = (data: Transaction[] = []) => {
  const sortData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const chartData = sortData.map((item) => ({
    month: moment(item.date).format('Do MM'),
    amount: item.amount,
    source: item.source,
  }));

  return chartData
};
