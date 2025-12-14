import { useNavigate } from 'react-router-dom';
import { LogIn, UserPlus, Shield, Truck, CreditCard } from 'iconoir-react';

export default function WelcomeScreen() {
  const navigate = useNavigate();

  const handleLogin = () => navigate('/login');
  const handleRegister = () => navigate('/register');

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'linear-gradient(191.14deg, #FCF8F5 6.45%, #E0EFBD 94.12%)',
        }}
      >
        <div className="hidden md:block absolute top-20 left-20 w-80 h-80 rounded-full bg-gradient-to-br from-[#2B865A]/5 to-transparent blur-3xl"></div>
        <div className="hidden md:block absolute bottom-20 right-20 w-96 h-96 rounded-full bg-gradient-to-tr from-[#E0EFBD]/30 to-transparent blur-3xl"></div>
        <div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] rounded-full bg-gradient-to-r from-white/10 to-transparent blur-2xl"></div>
      </div>

      <div className="relative z-10 w-full h-screen">
        <div className="hidden md:flex w-full h-full">
          <div className="w-1/2 h-full flex flex-col items-center justify-center p-12 xl:p-20 2xl:p-24">
            <div className="max-w-2xl mx-auto">
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-8">
                  <div>
                    <h2 
                      className="text-3xl font-bold text-[#2B865A]"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      Qure
                    </h2>
                    <p className="text-lg text-[#4D7059]">Health Assistant</p>
                  </div>
                </div>
                
                <h1
                  className="text-6xl xl:text-5xl 2xl:text-7xl font-bold leading-none mb-8"
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    color: '#222021',
                    lineHeight: '0.9'
                  }}
                >
                  Добро пожаловать!
                </h1>
                
                <p
                  className="text-2xl xl:text-xl leading-relaxed"
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontWeight: 500,
                    color: '#4D7059',
                    lineHeight: '1.2'
                  }}
                >
                  Авторизируйтесь, чтобы войти в свой аккаунт. <br />
                  Если у вас нет аккаунта, создайте его прямо сейчас.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-12">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/30 backdrop-blur-sm">
                  <div className="w-12 h-12 rounded-xl bg-[#2B865A]/10 flex items-center justify-center">
                    <Shield className="text-[#2B865A]" width={24} height={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#222021]">Безопасно</h3>
                    <p className="text-sm text-[#4D7059]">Защита данных</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/30 backdrop-blur-sm">
                  <div className="w-12 h-12 rounded-xl bg-[#2B865A]/10 flex items-center justify-center">
                    <Truck className="text-[#2B865A]" width={24} height={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#222021]">Быстро</h3>
                    <p className="text-sm text-[#4D7059]">Доставка за 2 часа</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/30 backdrop-blur-sm">
                  <div className="w-12 h-12 rounded-xl bg-[#2B865A]/10 flex items-center justify-center">
                    <CreditCard className="text-[#2B865A]" width={24} height={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#222021]">Удобно</h3>
                    <p className="text-sm text-[#4D7059]">Любые платежи</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-8 text-center">
                <div>
                  <div className="text-2xl font-bold text-[#2B865A]">5000+</div>
                  <div className="text-sm text-[#4D7059]">Товаров</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#2B865A]">24/7</div>
                  <div className="text-sm text-[#4D7059]">Поддержка</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#2B865A]">100%</div>
                  <div className="text-sm text-[#4D7059]">Качество</div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-1/2 h-full relative flex flex-col items-center justify-center p-12 xl:p-20 2xl:p-24">
            <div className="flex-1 w-full flex items-center justify-center mb-12">
              <div className="relative w-full h-full max-h-[60vh]">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50vh] h-[50vh] rounded-full bg-gradient-to-br from-[#2B865A]/5 to-[#E0EFBD]/20"></div>
                
                <img
                  src="/assets/images/welcome-illustration.png"
                  alt="Welcome Illustration"
                  className="relative z-10 w-full h-full object-contain animate-float"
                  onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/800x800?text=Welcome')}
                  style={{ pointerEvents: 'none' }}
                />
              </div>
            </div>
            <div className="w-full max-w-md mx-auto flex flex-col items-center gap-6 z-20">
              <button
                onClick={handleLogin}
                className="group flex items-center justify-center gap-4 w-full  py-4 rounded-full bg-[#2B865A] text-white font-semibold hover:bg-[#24704A] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform active:scale-95"
                style={{ 
                  fontFamily: 'Manrope, sans-serif', 
                  fontSize: '16px',
                  cursor: 'pointer'
                }}
              >
                <LogIn className="transform group-hover:translate-x-1 transition-transform" width={24} height={24} />
                Войти в аккаунт
              </button>

              <button
                onClick={handleRegister}
                className="group flex items-center justify-center gap-4 w-full  py-4 rounded-full bg-white/80 backdrop-blur-sm border-2 border-[#2B865A] text-[#2B865A] font-semibold hover:bg-white hover:shadow-xl transition-all duration-300 active:scale-95"
                style={{ 
                  fontFamily: 'Manrope, sans-serif', 
                  fontSize: '16px',
                  cursor: 'pointer'
                }}
              >
                <UserPlus className="transform group-hover:scale-110 transition-transform" width={24} height={24} />
                Создать аккаунт
              </button>

              <p className="text-center text-[#4D7059] mt-4" style={{ fontFamily: 'Manrope, sans-serif', fontSize: '12px' }}>
                Присоединяйтесь к 50,000+ довольных пользователей
              </p>
            </div>
          </div>
        </div>
        <div className="md:hidden w-full h-full overflow-hidden">
          <div
            className="w-full h-full"
            style={{
              background: 'linear-gradient(191.14deg, #FCF8F5 6.45%, #E0EFBD 94.12%)',
            }}
          >
            <div className="flex h-full flex-col p-6 pb-5">
              <div className="flex flex-1 flex-col items-center translate-y-6">
                <div
                  className="mb-8 flex h-[320px] w-[320px] items-center justify-center"
                >
                  <img 
                    src="/assets/images/welcome-illustration.png"
                    alt="Welcome Illustration"
                    className="w-full h-full object-contain animate-float"
                  />
                </div>

                <h1
                  className="w-[358px] text-center"
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontWeight: 800,
                    fontSize: '40px',
                    lineHeight: '110%',
                    letterSpacing: '-1px',
                    color: '#222021',
                  }}
                >
                  Добро пожаловать!
                </h1>
                <p
                  className="mt-4 w-[360px] text-center"
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontWeight: 500,
                    fontSize: '16px',
                    lineHeight: '130%',
                    letterSpacing: '0px',
                    color: '#4D7059',
                  }}
                >
                  Авторизируйтесь, чтобы войти в свой аккаунт. Если у вас нет аккаунта, создайте его
                </p>
              </div>

              <div className="flex w-full max-w-[320px] flex-col items-center gap-4 mb-28 translate-y-12 mx-auto">
                <button
                  onClick={handleLogin}
                  className="flex w-[240px] items-center justify-center rounded-[100px] px-6 py-3 hover:bg-[#24704A] transition-colors"
                  style={{
                    height: '40px',
                    background: '#2B865A',
                    boxShadow: '0px -2px 15.6px 0px #14652F33',
                    fontFamily: 'Manrope, sans-serif',
                    fontWeight: 700,
                    fontSize: '14px',
                    lineHeight: '120%',
                    letterSpacing: '0px',
                    color: '#FCF6E6',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Войти
                </button>

                <button
                  onClick={handleRegister}
                  className="flex w-[241px] items-center justify-center rounded-[100px] px-6 py-3 hover:bg-[#2B865A] hover:text-white transition-colors"
                  style={{
                    height: '40px',
                    background: 'transparent',
                    border: '1px solid #2B865A',
                    fontFamily: 'Manrope, sans-serif',
                    fontWeight: 500,
                    fontSize: '14px',
                    lineHeight: '130%',
                    letterSpacing: '0px',
                    color: '#2B865A',
                    cursor: 'pointer',
                  }}
                >
                  Зарегистрироваться
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}