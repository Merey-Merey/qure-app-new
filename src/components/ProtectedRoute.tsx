// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('user' | 'admin')[]; 
}

const ProtectedRoute = ({ children, allowedRoles = ['user', 'admin'] }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Загрузка...</div>; 
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/main-page" replace />;
  }

  // Все проверки пройдены — показываем запрошенную страницу
  return <>{children}</>;
};

export default ProtectedRoute;