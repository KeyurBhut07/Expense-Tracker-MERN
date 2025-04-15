import { useState } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/inputs/Input';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Handle Login Form submit
  const handleLogin = (e: any) => {};
  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please enter your credentials to access your account.
        </p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
          />
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
