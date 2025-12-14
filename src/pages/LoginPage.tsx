import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, Shield } from 'iconoir-react';
import { useAuth } from '../context/useAuth';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
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
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const storedUser = storedUsers.find(
        (u: any) => u.email === formData.email && u.password === formData.password
      );

      if (storedUser) {
        const userData = {
          id: storedUser.id,
          name: storedUser.name,
          email: storedUser.email,
          role: storedUser.role,
        };

        const token = `fake-jwt-token-${userData.id}`;
        login(userData, token);

        if (userData.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/main-page');
        }
        return;
      }

      if (formData.email === 'admin@qure.kz' && formData.password === 'admin123') {
        const adminData = {
          id: 1,
          name: 'Администратор',
          email: formData.email,
          role: 'admin' as const,
        };

        const token = 'fake-jwt-token-admin';
        login(adminData, token);
        navigate('/admin');
        return;
      }

      throw new Error('Неверный email или пароль');

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
    setFormData(prev => ({ ...prev, [name]: value }));
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
        <div className="hidden md:flex w-full h-full">
          <div className="w-2/5 h-full flex flex-col items-center justify-center p-12 xl:p-16 2xl:p-20">
            <div className="max-w-md mx-auto w-full">
              <button
                onClick={handleBack}
                className="flex items-center gap-3 mb-10 text-[#2B865A] hover:text-[#24704A] transition-colors group"
                style={{ fontFamily: 'Manrope, sans-serif', fontSize: '16px' }}
              >
                <ArrowLeft className="transform group-hover:-translate-x-1 transition-transform" width={20} height={20} />
                Назад
              </button>

              <div className="mb-10">
                <h1
                  className="text-3xl xl:text-4xl font-bold leading-tight mb-6"
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    color: '#222021',
                    lineHeight: '1.2'
                  }}
                >
                  Войдите в <br /> личный кабинет
                </h1>
                
                <p
                  className="text-base xl:text-lg text-[#4D7059] leading-relaxed mb-8"
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontWeight: 500,
                    lineHeight: '1.5'
                  }}
                >
                  Введите email и пароль для входа в систему
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 rounded-xl bg-white/30 backdrop-blur-sm">
                    <div className="w-10 h-10 rounded-lg bg-[#2B865A]/10 flex items-center justify-center">
                      <Mail className="text-[#2B865A]" width={20} height={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#222021]">Email авторизация</h3>
                      <p className="text-sm text-[#4D7059]">Быстрый и удобный вход</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-3 rounded-xl bg-white/30 backdrop-blur-sm">
                    <div className="w-10 h-10 rounded-lg bg-[#2B865A]/10 flex items-center justify-center">
                      <Lock className="text-[#2B865A]" width={20} height={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#222021]">Безопасность</h3>
                      <p className="text-sm text-[#4D7059]">Надежная защита паролем</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-3 rounded-xl bg-white/30 backdrop-blur-sm">
                    <div className="w-10 h-10 rounded-lg bg-[#2B865A]/10 flex items-center justify-center">
                      <Shield className="text-[#2B865A]" width={20} height={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#222021]">Уникальные аккаунты</h3>
                      <p className="text-sm text-[#4D7059]">Каждый пользователь со своими данными</p>
                    </div>
                  </div>
                </div>

        
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/50 flex items-center justify-center shadow">
                  <span className="text-[#2B865A] font-bold text-lg">Q</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#2B865A]">Qure</h2>
                  <p className="text-sm text-[#4D7059]">Health Assistant</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-3/5 h-full flex items-center justify-center p-12 xl:p-16 2xl:p-20">
            <div className="w-full max-w-lg mx-auto">
              <div className="w-full rounded-2xl bg-white/90 backdrop-blur-sm shadow-xl border border-white/20 p-10 xl:p-12">
                <div className="mb-8">
                  <h2 className="text-2xl xl:text-3xl font-bold text-center mb-4 text-[#222021]">
                    Авторизация
                  </h2>
                  <p className="text-base text-center text-[#767B78] mb-6">
                    Введите email и пароль для входа
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-lg font-semibold mb-3 text-[#222021]">
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <Mail className="text-[#989C99]" width={20} height={20} />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        className="w-full rounded-xl border-2 border-[#F0F0F0] bg-white/50 pl-12 pr-4 py-4 text-base hover:border-[#2B865A] focus:border-[#2B865A] focus:bg-white text-[#222021]"
                        style={{ height: '52px' }}
                        placeholder="Введите ваш email"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-lg font-semibold mb-3 text-[#222021]">
                      Пароль
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <Lock className="text-[#989C99]" width={20} height={20} />
                      </div>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        className="w-full rounded-xl border-2 border-[#F0F0F0] bg-white/50 pl-12 pr-4 py-4 text-base hover:border-[#2B865A] focus:border-[#2B865A] focus:bg-white text-[#222021]"
                        style={{ height: '52px' }}
                        placeholder="Введите ваш пароль"
                      />
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm flex items-center gap-2">
                      <span>⚠</span> {error}
                    </p>
                  </div>
                )}

                <button
                  onClick={handleLogin}
                  disabled={isLoading || !formData.email || !formData.password}
                  className={`w-full rounded-xl px-6 py-4 text-lg font-bold transition-all duration-300 mt-8 ${
                    isLoading || !formData.email || !formData.password
                      ? 'bg-[#F8F8F8] text-[#D1D3D2] cursor-not-allowed'
                      : 'bg-[#2B865A] text-white shadow hover:shadow-lg hover:scale-[1.02] hover:bg-[#24704A] active:scale-[0.98]'
                  }`}
                  style={{ height: '56px' }}
                >
                  {isLoading ? 'Вход...' : 'Войти'}
                </button>

                <div className="text-center mt-6">
                  <p className="text-base text-[#767B78]">
                    Нет аккаунта?{' '}
                    <button
                      onClick={() => navigate('/register')}
                      className="font-bold text-[#2B865A] hover:text-[#24704A] transition-colors"
                    >
                      Зарегистрируйтесь
                    </button>
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-[#F0F0F0]">
                  <p className="text-sm text-center text-[#767B78]">
                    Нажимая кнопку, вы соглашаетесь с{' '}
                    <button className="text-[#2B865A] hover:underline">
                      политикой конфиденциальности
                    </button>{' '}
                    и{' '}
                    <button className="text-[#2B865A] hover:underline">
                      условиями использования
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:hidden w-full h-full">
          <div className="w-full h-full" style={{
            background: 'linear-gradient(191.14deg, #FCF8F5 6.45%, #E0EFBD 94.12%)',
          }}>
            <div className="flex h-[40px] w-full items-center px-4 pt-8">
              <button onClick={handleBack} aria-label="Назад">
                <ArrowLeft width={16} height={16} style={{ color: '#767B78' }} />
              </button>
              <div className="w-[320px] text-center text-[#767B78]">Авторизация</div>
            </div>

            <div className="p-6">
              <h1 className="text-2xl font-bold text-center mb-4 text-[#222021]">
                Войдите в личный кабинет
              </h1>

              <p className="text-center text-[#767B78] mb-6">
                Введите email и пароль для входа
              </p>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-[#222021]">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-[12px] border border-[#F8F8F8] px-4 py-3 bg-white"
                    placeholder="Введите email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-[#222021]">
                    Пароль
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full rounded-[12px] border border-[#F8F8F8] px-4 py-3 bg-white"
                    placeholder="Введите пароль"
                  />
                </div>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <button
                onClick={handleLogin}
                disabled={isLoading}
                className={`w-full rounded-[100px] px-6 py-3 font-bold ${
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
                  className="text-[#2B865A] hover:text-[#24704A] text-sm"
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