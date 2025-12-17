import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ 
  children, 
  adminOnly = false 
}: { 
  children: React.ReactNode;
  adminOnly?: boolean;
}) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};