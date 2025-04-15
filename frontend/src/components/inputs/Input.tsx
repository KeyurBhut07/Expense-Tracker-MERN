import React from 'react'

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  placeholder?: string;
  type?: string;
}



const Input: React.FC<InputProps> = ({ value, onChange, label, placeholder, type = 'text' }) => {
  return <div>Input</div>;
};

export default Input