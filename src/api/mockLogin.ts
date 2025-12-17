interface User {
  id: number | string;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  createdAt?: string;
}

export const mockLogin = async (email: string, password: string): Promise<{
  success: boolean;
  data?: {
    id: number | string;
    name: string;
    email: string;
    role: 'user' | 'admin';
  };
  token?: string;
  error?: string;
}> => {
  const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find((u: User) => u.email === email && u.password === password);
  
  if (user) {
    return {
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: `user-jwt-${user.id}-${Date.now()}`,
    };
  }

  if (email === 'admin@qure.kz' && password === 'admin123') {
    return {
      success: true,
      data: {
        id: 0,
        name: 'Администратор',
        email,
        role: 'admin',
      },
      token: `admin-jwt-${Date.now()}`,
    };
  }

  return { success: false, error: 'Invalid credentials' };
};
