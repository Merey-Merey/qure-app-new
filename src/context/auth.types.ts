// src/context/auth.types.ts
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface AuthContextType {
  user: User | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
  isLoading: boolean;
}