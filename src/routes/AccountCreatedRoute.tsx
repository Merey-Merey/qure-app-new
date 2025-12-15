import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import AccountCreatedPage from '../pages/AccountCreatedPage';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'user';
}

export default function AccountCreatedRoute() {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/account-settings');
  };

  useEffect(() => {
    const tempUserId = localStorage.getItem('tempUserId');
    if (tempUserId) {
      const users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
      const user = users.find((u) => u.id === Number(tempUserId));
      if (user) {
        localStorage.setItem('userId', tempUserId);
      }
    }
  }, []);

  return <AccountCreatedPage onContinue={handleContinue} />;
}
