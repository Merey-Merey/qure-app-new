// src/routes/AccountCreatedRoute.tsx
import { useNavigate } from 'react-router-dom';
import AccountCreatedPage from '../pages/AccountCreatedPage';

export default function AccountCreatedRoute() {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/account-settings');
  };

  return <AccountCreatedPage onContinue={handleContinue} />;
}