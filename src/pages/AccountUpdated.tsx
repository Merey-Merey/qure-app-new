import { useNavigate } from 'react-router-dom';
import { CheckCircle, ShoppingBag, ArrowLeft } from 'iconoir-react';

export default function AccountUpdated() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-background">
      <div className="hidden md:flex w-full h-screen">
        <div className="w-2/5 h-full flex flex-col items-center p-12 xl:p-16 2xl:p-20 bg-gradient-to-b from-[#FCF8F5] to-[#E0EFBD]/30">
          <div className="max-w-md mx-auto w-full">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-3 mb-12 text-[#2B865A] hover:text-[#24704A] transition-colors group"
              style={{ fontFamily: 'Manrope, sans-serif', fontSize: '16px' }}
            >
              <ArrowLeft className="transform group-hover:-translate-x-1 transition-transform" width={20} height={20} />
              Назад
            </button>

            <div className="mb-12">
              <div className="w-20 h-20 rounded-full bg-[#2B865A]/10 flex items-center justify-center mb-8 mx-auto">
                <CheckCircle className="text-[#2B865A]" width={40} height={40} />
              </div>

              <h1
                className="text-3xl xl:text-4xl font-bold leading-tight mb-6 text-center"
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  color: '#222021',
                  lineHeight: '1.2'
                }}
              >
                Успешно обновлено!
              </h1>
              
              <p
                className="text-base xl:text-lg text-[#4D7059] leading-relaxed mb-8 text-center"
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  lineHeight: '1.5'
                }}
              >
                Ваши персональные данные сохранены. Теперь вы можете пользоваться всеми преимуществами персонализированного сервиса
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/50 backdrop-blur-sm">
                  <div className="w-12 h-12 rounded-lg bg-[#2B865A]/10 flex items-center justify-center">
                    <ShoppingBag className="text-[#2B865A]" width={24} height={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#222021]">Персональные рекомендации</h3>
                    <p className="text-sm text-[#4D7059]">Товары по вашим предпочтениям</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/50 backdrop-blur-sm">
                  <div className="w-12 h-12 rounded-lg bg-[#2B865A]/10 flex items-center justify-center">
                    <svg className="text-[#2B865A]" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#222021]">Быстрые покупки</h3>
                    <p className="text-sm text-[#4D7059]">Сохраненные данные для заказа</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/50 flex items-center justify-center shadow">
                <span 
                  className="text-[#2B865A] font-bold text-lg"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  Q
                </span>
              </div>
              <div>
                <h2 
                  className="text-lg font-bold text-[#2B865A]"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  Qure
                </h2>
                <p className="text-sm text-[#4D7059]">Health Assistant</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-3/5 h-full flex items-center justify-center p-12 xl:p-16 2xl:p-20">
          <div className="w-full max-w-2xl mx-auto">
            <div className="w-full rounded-2xl bg-white/90 backdrop-blur-sm shadow-xl border border-white/20 p-10 xl:p-12 overflow-hidden">
              <div className="relative mb-10">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-br from-[#2B865A]/5 to-[#E0EFBD]/20 blur-2xl"></div>
                
                <div className="relative z-10 w-full max-w-md mx-auto">
                  <img
                    src="/assets/images/sign-in-3.png"
                    alt="Данные обновлены"
                    className="w-full h-auto object-contain animate-float"
                    onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/500x500?text=Success')}
                  />
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h2
                    className="text-2xl xl:text-3xl font-bold text-center mb-4"
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      color: '#222021',
                    }}
                  >
                    Готово к покупкам!
                  </h2>
                  
                  <p
                    className="text-lg text-center text-[#4D7059] leading-relaxed"
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      lineHeight: '1.6'
                    }}
                  >
                    Настройки аккаунта успешно сохранены. Теперь вы можете пользоваться всеми преимуществами персонального подхода в интернет-магазине Qure.
                  </p>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={() => navigate('/profile')}
                    className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-[#2B865A] text-white font-semibold hover:bg-[#24704A] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                    style={{ 
                      fontFamily: 'Manrope, sans-serif', 
                      fontSize: '18px'
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H6C4.93913 15 3.92172 15.4214 3.17157 16.1716C2.42143 16.9217 2 17.9391 2 19V21M22 21V19C21.9993 18.1137 21.7044 17.2528 21.1614 16.5523C20.6184 15.8519 19.8581 15.3516 19 15.13M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"/>
                    </svg>
                    Перейти в личный кабинет
                  </button>

                  <button
                    onClick={() => navigate('/main-page')}
                    className="w-full flex items-center justify-center gap-3 py-4 rounded-xl border-2 border-[#2B865A] text-[#2B865A] font-semibold hover:bg-[#2B865A] hover:text-white transition-all duration-300 active:scale-[0.98]"
                    style={{ 
                      fontFamily: 'Manrope, sans-serif', 
                      fontSize: '18px'
                    }}
                  >
                    <ShoppingBag width={24} height={24} />
                    Начать покупки
                  </button>
                </div>

                <div className="pt-8 border-t border-gray-100">
                  <p className="text-sm text-[#4D7059] text-center" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Вы можете изменить настройки в любое время в разделе "Профиль"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden w-full h-full">
        <div className="w-[390px] h-[844px] border-[3px] overflow-y-auto rounded-[30px] border-divider-green-first shadow-xl relative mx-auto">
          <div
            className="flex h-[40px] w-full items-center px-4 pt-8"
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontWeight: 700,
              fontSize: '16px',
              lineHeight: '120%',
              letterSpacing: '0px',
              color: '#767B78',
            }}
          >
            <button onClick={() => navigate(-1)} aria-label="Назад">
              <ArrowLeft width={16} height={16} style={{ color: '#635436' }} />
            </button>
            <div className="w-[290px] text-center text-[#635436] ml-6 font-bold">Обновление данных</div>
          </div>

          <div
            className="mx-auto w-[390px] flex-1"
            style={{
              height: '638px',
              marginTop: '1rem',
              paddingTop: '36px',
              paddingRight: '16px',
              paddingBottom: '36px',
              paddingLeft: '16px',
            }}
          >
            <div className="flex h-full flex-col">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-[#2B865A]/10 flex items-center justify-center">
                  <CheckCircle className="text-[#2B865A]" width={40} height={40} />
                </div>
              </div>
              <h1
                className="mb-2 text-center"
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontWeight: 700,
                  fontSize: '27px',
                  lineHeight: '110%',
                  color: '#222021',
                  width: '358px',
                  marginTop: '10px',
                }}
              >
                Ваши данные обновлены!
              </h1>

              <p
                className="mb-6 text-center"
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '130%',
                  color: '#635436',
                  marginTop: '3px',
                }}
              >
                Настройки аккаунта успешно сохранены. <br />
                Теперь вы можете пользоваться всеми преимуществами.
              </p>

              <div className="flex justify-center mb-6">
                <img
                  src="/assets/images/sign-in-3.png"
                  alt="Данные обновлены"
                  className="w-64 h-64 object-contain"
                  onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/256x256?text=Success')}
                />
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#FCF8F5]">
                  <div className="w-10 h-10 rounded-lg bg-[#2B865A]/10 flex items-center justify-center">
                    <ShoppingBag className="text-[#2B865A]" width={20} height={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#222021] text-sm">Персональные рекомендации</h3>
                    <p className="text-xs text-[#4D7059]">Товары по вашим предпочтениям</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mt-auto">
                <button
                  onClick={() => navigate('/profile')}
                  className="w-full rounded-[100px] bg-[#2B865A] px-6 py-3 text-white font-bold transition-all"
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontWeight: 600,
                    fontSize: '14px',
                    lineHeight: '120%',
                    height: '48px',
                    boxShadow: '0px -2px 15.6px 0px #14652F33',
                  }}
                >
                  Перейти в личный кабинет
                </button>

                <button
                  onClick={() => navigate('/main-page')}
                  className="w-full rounded-[100px] border-2 border-[#2B865A] px-6 py-3 text-[#2B865A] font-bold transition-all hover:bg-[#2B865A] hover:text-white"
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontWeight: 600,
                    fontSize: '14px',
                    lineHeight: '120%',
                    height: '48px',
                  }}
                >
                  <div className="flex items-center justify-center gap-2">
                    <ShoppingBag width={16} height={16} />
                    Начать покупки
                  </div>
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
            transform: translateY(-10px);
          }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}