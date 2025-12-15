import { useNavigate } from 'react-router-dom';
import { CheckCircle, ShoppingBag } from 'iconoir-react';

interface AccountCreatedPageProps {
  onContinue: () => void;
}

export default function AccountCreatedPage({ onContinue }: AccountCreatedPageProps) {
  const navigate = useNavigate();

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
        <div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vh] rounded-full bg-gradient-to-r from-white/10 to-transparent blur-2xl"></div>
      </div>

      <div className="relative z-10 w-full h-screen">
        <div className="hidden md:flex w-full h-full">
          <div className="w-1/2 h-full flex flex-col items-center justify-center p-12 xl:p-16 2xl:p-20">
            <div className="max-w-2xl mx-auto w-full">
              <div className="flex items-center gap-3 mb-12">
                <div className="w-12 h-12 rounded-2xl bg-white/50 flex items-center justify-center shadow-lg">
                  <span 
                    className="text-[#2B865A] font-bold text-2xl"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    Q
                  </span>
                </div>
                <div>
                  <h2 
                    className="text-2xl font-bold text-[#2B865A]"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    Qure
                  </h2>
                  <p className="text-[#4D7059]">Health Assistant</p>
                </div>
              </div>

              <div className="mb-12">
                <div className="flex items-center gap-3 mb-8">
                  <CheckCircle className="text-[#2B865A]" width={32} height={32} />
                  <h1
                    className="text-4xl xl:text-4xl 2xl:text-6xl font-bold"
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      color: '#222021',
                    }}
                  >
                    Ваш аккаунт создан!
                  </h1>
                </div>
                
                <p
                  className="text-xl xl:text-base text-[#4D7059] leading-relaxed mb-12"
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    lineHeight: '1.3'
                  }}
                >
                  Теперь вы можете совершать покупки в интернет магазине Qure.<br />
                  Заполните анкету в личном кабинете, чтобы рекомендации были более точными.
                </p>

                <div className="grid grid-cols-2 gap-6 mb-12">
                  <div className="flex flex-col p-6 rounded-2xl bg-white/30 backdrop-blur-sm">
                    <div className="w-12 h-12 rounded-xl bg-[#2B865A]/10 flex items-center justify-center mb-4">
                    </div>
                    <h3 className="font-semibold text-[#222021] text-base mb-2">Персональные рекомендации</h3>
                    <p className="text-sm text-[#4D7059]">Подходящие товары именно для вас</p>
                  </div>
                  
                  <div className="flex flex-col p-6 rounded-2xl bg-white/30 backdrop-blur-sm">
                    <div className="w-12 h-12 rounded-xl bg-[#2B865A]/10 flex items-center justify-center mb-4">
                      <ShoppingBag className="text-[#2B865A]" width={24} height={24} />
                    </div>
                    <h3 className="font-semibold text-[#222021] text-base mb-2">Быстрые покупки</h3>
                    <p className="text-sm text-[#4D7059]">Оформление заказа в 1 клик</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-8">
                <div className="text-center">
                  <div className="text-1xl font-bold text-[#2B865A]">5000+</div>
                  <div className="text-sm text-[#4D7059]">Товаров</div>
                </div>
                <div className="text-center">
                  <div className="text-1xl font-bold text-[#2B865A]">100%</div>
                  <div className="text-sm text-[#4D7059]">Качество</div>
                </div>
                <div className="text-center">
                  <div className="text-1xl font-bold text-[#2B865A]">24/7</div>
                  <div className="text-sm text-[#4D7059]">Поддержка</div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-1/2 h-full relative flex flex-col items-center justify-center p-12 xl:p-16 2xl:p-20">
            <div className="flex-1 w-full flex items-center justify-center mb-12">
              <div className="relative w-full max-h-[45vh]">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#2B865A]/5 to-[#E0EFBD]/20"></div>
                
                <img
                  src="/assets/images/sign-in-3.png"
                  alt="Account Created"
                  className="relative z-10  object-contain animate-float w-9/12 ml-16"
                  onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/600x600?text=Account+Created')}
                />
              </div>
            </div>

            <div className="w-full max-w-md mx-auto flex flex-col items-center gap-6 z-20">
              <button
                onClick={onContinue}
                className="group flex items-center justify-center gap-4 w-full px-6 py-3 rounded-full bg-[#2B865A] text-white font-semibold hover:bg-[#24704A] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform active:scale-95"
                style={{ 
                  fontFamily: 'Manrope, sans-serif', 
                  fontSize: '16px'
                }}
              >
                Заполнить анкету
              </button>

              <button
                onClick={() => navigate('/main-page')}
                className="group flex items-center justify-center gap-4 w-full px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border-2 border-[#2B865A] text-[#2B865A] font-semibold hover:bg-white hover:shadow-xl transition-all duration-300 active:scale-95"
                style={{ 
                  fontFamily: 'Manrope, sans-serif', 
                  fontSize: '16px'
                }}
              >
                <ShoppingBag className="transform group-hover:scale-110 transition-transform" width={24} height={24} />
                Начать покупки
              </button>
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
            <div className="w-full h-full overflow-hidden">
              <div className="w-full h-full shadow-xl">
                <div className="flex h-full flex-col p-6 pb-5 justify-between">
                  <div className="flex-1 flex flex-col items-center translate-y-6">
                    <div
                      className="mb-8 flex h-[300px] w-[300px] items-center justify-center"
                    >
                      <img src="/assets/images/sign-in-3.png" alt="Account Created" />
                    </div>

                    <h1
                      className="mb-5 text-center text-[28px] font-semibold leading-[110%]"
                      style={{ fontFamily: 'Manrope, sans-serif', color: '#222021' }}
                    >
                      Ваш аккаунт создан!
                    </h1>

                    <p
                      className="mb-7 text-center text-base leading-[130%] text-[#4D7059]"
                      style={{ fontFamily: 'Manrope, sans-serif', maxWidth: '325px' }}
                    >
                      Теперь вы можете совершать покупки <br /> в интернет магазине Qure. <br /> Заполните анкету в личном кабинете, чтобы рекомендации были более точными
                    </p>
                    <button
                      onClick={onContinue}
                      className="mb-3 w-full max-w-[240px] rounded-[30px] bg-[#2B865A] px-6 py-3 text-white font-medium hover:bg-[#24704A] transition-colors"
                      style={{
                        fontFamily: 'Manrope, sans-serif',
                        fontSize: '14px',
                        lineHeight: '120%',
                        boxShadow: '0px -2px 15.6px 0px #14652F33',
                      }}
                    >
                      Заполнить анкету
                    </button>

                    <button
                      onClick={() => navigate('/main-page')}
                      className="w-full max-w-[240px] rounded-[30px] border border-[#2B865A] px-6 py-3 text-[#2B865A] font-medium hover:bg-[#2B865A] hover:text-white transition-colors"
                      style={{
                        fontFamily: 'Manrope, sans-serif',
                        fontSize: '14px',
                        lineHeight: '120%',
                      }}
                    >
                      Начать покупки
                    </button>
                  </div>
                </div>
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