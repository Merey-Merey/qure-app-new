import { useNavigate } from 'react-router-dom';
import OnboardingPage from '../pages/OnboardingPage';

export default function OnboardingRoute() {
  const navigate = useNavigate();

  const handleOnboardingDone = () => {
    navigate('/welcome', { replace: true });
  };

  return <OnboardingPage onDone={handleOnboardingDone} />;
}