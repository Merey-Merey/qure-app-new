import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, Shield } from 'iconoir-react';
import { useAuth } from '../context/useAuth';

interface FormData {
  email: string;
  password: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  role: 'user' | 'admin';
  createdAt?: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      setError('Заполните все поля');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]') as User[];
      const storedUser = storedUsers.find((u) => u.email === formData.email && u.password === formData.password);

      let userData: User;
      let token: string;

      if (storedUser) {
        userData = {
          id: storedUser.id,
          name: storedUser.name,
          email: storedUser.email,
          role: storedUser.role,
        };
        token = `user-jwt-${storedUser.id}-${Date.now()}`;
      } else if (formData.email === 'admin@qure.kz' && formData.password === 'admin123') {
        userData = {
          id: 0,
          name: 'Администратор',
          email: formData.email,
          role: 'admin',
        };
        token = `admin-jwt-${Date.now()}`;
      } else {
        throw new Error('Неверный email или пароль');
      }

      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', token);
      localStorage.setItem('authToken', token);
      localStorage.setItem('userId', userData.id.toString());

      login(userData, token);

      setTimeout(() => {
        if (userData.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/main-page');
        }
      }, 1500);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка авторизации');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name as keyof FormData]: value }));
    setError(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'linear-gradient(191.14deg, #FCF8F5 6.45%, #E0EFBD 94.12%)',
        }}
      >
        <div className="hidden md:block absolute top-10 left-10 w-64 h-64 rounded-full bg-gradient-to-br from-[#2B865A]/5 to-transparent blur-3xl"></div>
        <div className="hidden md:block absolute bottom-10 right-10 w-80 h-80 rounded-full bg-gradient-to-tr from-[#E0EFBD]/30 to-transparent blur-3xl"></div>
        <div className="hidden md:block absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-white/10 to-transparent blur-2xl"></div>
      </div>

      <div className="relative z-10 w-full h-screen">
        {/* DESKTOP - Уменьшено */}
        <div className="hidden md:flex w-full h-full">
          <div className="w-2/5 h-full flex flex-col items-center justify-center p-8 lg:p-10">
            <div className="max-w-sm mx-auto w-full">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 mb-8 text-[#2B865A] hover:text-[#24704A] transition-colors group text-sm"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                <ArrowLeft className="transform group-hover:-translate-x-1 transition-transform" width={16} height={16} />
                Назад
              </button>

              <div className="mb-8">
                <h1
                  className="text-2xl lg:text-3xl font-bold leading-tight mb-4"
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    color: '#222021',
                    lineHeight: '1.2'
                  }}
                >
                  Войдите в личный кабинет
                </h1>
                
                <p
                  className="text-sm lg:text-base text-[#4D7059] leading-relaxed mb-6"
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontWeight: 500,
                    lineHeight: '1.5'
                  }}
                >
                  Введите email и пароль для входа в систему
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2.5 rounded-lg bg-white/30 backdrop-blur-sm">
                    <div className="w-8 h-8 rounded-lg bg-[#2B865A]/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="text-[#2B865A]" width={16} height={16} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-sm text-[#222021] truncate">Email авторизация</h3>
                      <p className="text-xs text-[#4D7059] truncate">Быстрый и удобный вход</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-2.5 rounded-lg bg-white/30 backdrop-blur-sm">
                    <div className="w-8 h-8 rounded-lg bg-[#2B865A]/10 flex items-center justify-center flex-shrink-0">
                      <Lock className="text-[#2B865A]" width={16} height={16} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-sm text-[#222021] truncate">Безопасность</h3>
                      <p className="text-xs text-[#4D7059] truncate">Надежная защита паролем</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-2.5 rounded-lg bg-white/30 backdrop-blur-sm">
                    <div className="w-8 h-8 rounded-lg bg-[#2B865A]/10 flex items-center justify-center flex-shrink-0">
                      <Shield className="text-[#2B865A]" width={16} height={16} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-sm text-[#222021] truncate">Уникальные аккаунты</h3>
                      <p className="text-xs text-[#4D7059] truncate">Каждый пользователь со своими данными</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-white/50 flex items-center justify-center shadow">
                  <span className="text-[#2B865A] font-bold text-base" style={{ fontFamily: 'Manrope, sans-serif' }}>Q</span>
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#2B865A]" style={{ fontFamily: 'Manrope, sans-serif' }}>Qure</h2>
                  <p className="text-xs text-[#4D7059]">Health Assistant</p>
                </div>
              </div>
            </div>
          </div>

          {/* Форма - Уменьшено */}
          <div className="w-3/5 h-full flex items-center justify-center p-8 lg:p-10">
            <div className="w-full max-w-sm mx-auto">
              <div className="w-full rounded-xl bg-white/90 backdrop-blur-sm shadow-lg border border-white/20 p-6 lg:p-8">
                <div className="mb-6">
                  <h2 className="text-xl lg:text-2xl font-bold text-center mb-3 text-[#222021]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Авторизация
                  </h2>
                  <p className="text-sm text-center text-[#767B78] mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Введите email и пароль для входа
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-base font-semibold mb-2 text-[#222021]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <Mail className="text-[#989C99]" width={16} height={16} />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        className="w-full rounded-lg border border-[#F0F0F0] bg-white/50 pl-10 pr-3 py-2.5 text-sm hover:border-[#2B865A] focus:border-[#2B865A] focus:bg-white text-[#222021]"
                        style={{ height: '44px', fontFamily: 'Manrope, sans-serif' }}
                        placeholder="Введите ваш email"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-base font-semibold mb-2 text-[#222021]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      Пароль
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <Lock className="text-[#989C99]" width={16} height={16} />
                      </div>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        className="w-full rounded-lg border border-[#F0F0F0] bg-white/50 pl-10 pr-3 py-2.5 text-sm hover:border-[#2B865A] focus:border-[#2B865A] focus:bg-white text-[#222021]"
                        style={{ height: '44px', fontFamily: 'Manrope, sans-serif' }}
                        placeholder="Введите ваш пароль"
                      />
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-xs flex items-center gap-1" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      <span>⚠</span> {error}
                    </p>
                  </div>
                )}

                <button
                  onClick={handleLogin}
                  disabled={isLoading || !formData.email || !formData.password}
                  className={`w-full rounded-lg px-4 py-2.5 text-base font-semibold transition-all duration-300 mt-6 ${
                    isLoading || !formData.email || !formData.password
                      ? 'bg-[#F8F8F8] text-[#D1D3D2] cursor-not-allowed'
                      : 'bg-[#2B865A] text-white shadow hover:shadow-md hover:bg-[#24704A] active:scale-[0.98]'
                  }`}
                  style={{ height: '44px', fontFamily: 'Manrope, sans-serif' }}
                >
                  {isLoading ? 'Вход...' : 'Войти'}
                </button>

                <div className="text-center mt-4">
                  <p className="text-sm text-[#767B78]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Нет аккаунта?{' '}
                    <button
                      onClick={() => navigate('/register')}
                      className="font-semibold text-[#2B865A] hover:text-[#24704A] transition-colors"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      Зарегистрируйтесь
                    </button>
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F0F0F0]">
                  <p className="text-xs text-center text-[#767B78]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Нажимая кнопку, вы соглашаетесь с{' '}
                    <button className="text-[#2B865A] hover:underline" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      политикой конфиденциальности
                    </button>{' '}
                    и{' '}
                    <button className="text-[#2B865A] hover:underline" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      условиями использования
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE - Уменьшено */}
        <div className="md:hidden w-full h-full">
          <div className="w-full h-full" style={{
            background: 'linear-gradient(191.14deg, #FCF8F5 6.45%, #E0EFBD 94.12%)',
          }}>
            <div className="flex items-center px-4 pt-4">
              <button onClick={handleBack} aria-label="Назад" className="p-2">
                <ArrowLeft width={14} height={14} style={{ color: '#767B78' }} />
              </button>
              <div className="flex-1 text-center text-sm text-[#767B78] px-4">Авторизация</div>
            </div>

            <div className="p-4">
              <h1 className="text-xl font-bold text-center mb-3 text-[#222021]">
                Войдите в личный кабинет
              </h1>

              <p className="text-center text-sm text-[#767B78] mb-6">
                Введите email и пароль для входа
              </p>

              <div className="space-y-3 mb-6">
                <div>
                  <label className="block text-xs font-semibold mb-1.5 text-[#222021]">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-[10px] border border-[#F8F8F8] px-3 py-2.5 bg-white text-sm"
                    placeholder="Введите email"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5 text-[#222021]">
                    Пароль
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full rounded-[10px] border border-[#F8F8F8] px-3 py-2.5 bg-white text-sm"
                    placeholder="Введите пароль"
                  />
                </div>
              </div>

              {error && (
                <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-xs">{error}</p>
                </div>
              )}

              <button
                onClick={handleLogin}
                disabled={isLoading}
                className={`w-full rounded-[20px] px-4 py-2.5 font-semibold text-sm ${
                  isLoading
                    ? 'bg-[#F8F8F8] text-[#D1D3D2]'
                    : 'bg-[#2B865A] text-white hover:bg-[#24704A]'
                }`}
              >
                {isLoading ? 'Вход...' : 'Войти'}
              </button>

              <div className="text-center mt-4">
                <button
                  onClick={() => navigate('/register')}
                  className="text-[#2B865A] hover:text-[#24704A] text-xs"
                >
                  Нет аккаунта? Зарегистрируйтесь
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}