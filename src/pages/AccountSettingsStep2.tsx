import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell,  Heart } from 'iconoir-react';

export default function AccountSettingsStep2() {
  const navigate = useNavigate();

  const [orderStatus, setOrderStatus] = useState(true);
  const [personalRecs, setPersonalRecs] = useState(false);
  const [promotions, setPromotions] = useState(false);
  const [favorites, setFavorites] = useState(true);

  const handleSubmit = () => {
    navigate('/account-settings/step3');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-background">
      <div className="hidden md:flex w-full h-screen">
        <div className="w-2/5 h-full flex flex-col items-center justify-center p-12 xl:p-16 2xl:p-20 bg-gradient-to-b from-[#FCF8F5] to-[#E0EFBD]/30">
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
              <div className="flex items-center justify-between mb-8">
                <div className="text-sm font-medium text-[#2B865A]">Шаг 2 из 3</div>
                <div className="flex gap-1">
                  <div className="w-8 h-2 rounded-full bg-gray-300"></div>
                  <div className="w-8 h-2 rounded-full bg-[#2B865A]"></div>
                  <div className="w-8 h-2 rounded-full bg-gray-300"></div>
                </div>
              </div>

              <h1
                className="text-3xl xl:text-4xl font-bold leading-tight mb-6"
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  color: '#222021',
                  lineHeight: '1.2'
                }}
              >
                Настройка уведомлений
              </h1>
              
              <p
                className="text-base xl:text-lg text-[#4D7059] leading-relaxed mb-8"
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  lineHeight: '1.5'
                }}
              >
                Выберите, какие уведомления вы хотите получать. Мы будем держать вас в курсе всех важных событий.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/50 backdrop-blur-sm">
                  <div className="w-10 h-10 rounded-lg bg-[#2B865A]/10 flex items-center justify-center">
                    <Bell className="text-[#2B865A]" width={20} height={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#222021]">Контроль уведомлений</h3>
                    <p className="text-sm text-[#4D7059]">Получайте только то, что важно для вас</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/50 backdrop-blur-sm">
                  <div className="w-10 h-10 rounded-lg bg-[#2B865A]/10 flex items-center justify-center">
                    <Heart className="text-[#2B865A]" width={20} height={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#222021]">Индивидуальный подход</h3>
                    <p className="text-sm text-[#4D7059]">Рекомендации по вашим интересам</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 rounded-xl bg-white/30 backdrop-blur-sm">
              <p className="text-sm text-[#4D7059]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Подробно настроить все уведомления вы сможете в своем личном кабинете в любое время.
              </p>
            </div>
          </div>
        </div>

        <div className="w-3/5 h-full flex items-center justify-center p-12 xl:p-16 2xl:p-20">
          <div className="w-full max-w-2xl mx-auto">
            <div className="w-full rounded-2xl bg-white/90 backdrop-blur-sm shadow-xl border border-white/20 p-10 xl:p-12">
              <h2
                className="text-2xl xl:text-3xl font-bold text-center mb-8"
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  color: '#222021',
                }}
              >
                Выберите уведомления
              </h2>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-[#2B865A] transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#2B865A]/10 flex items-center justify-center">
                      <Bell className="text-[#2B865A]" width={24} height={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#222021]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        Уведомления о статусе заказа
                      </h3>
                      <p className="text-sm text-[#635436]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        Получать обновления о ваших заказах
                      </p>
                    </div>
                  </div>
                  
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={orderStatus}
                      onChange={() => setOrderStatus(!orderStatus)}
                      className="sr-only"
                    />
                    <div className={`w-14 h-7 rounded-full transition-colors duration-200 ${orderStatus ? 'bg-[#2B865A]' : 'bg-gray-300'}`}>
                      <div className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-200 ${orderStatus ? 'translate-x-7' : 'translate-x-0'}`} />
                    </div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-[#2B865A] transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#2B865A]/10 flex items-center justify-center">
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#222021]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        Персональные рекомендации
                      </h3>
                      <p className="text-sm text-[#635436]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        Не чаще чем 2 раза в неделю
                      </p>
                    </div>
                  </div>
                  
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={personalRecs}
                      onChange={() => setPersonalRecs(!personalRecs)}
                      className="sr-only"
                    />
                    <div className={`w-14 h-7 rounded-full transition-colors duration-200 ${personalRecs ? 'bg-[#2B865A]' : 'bg-gray-300'}`}>
                      <div className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-200 ${personalRecs ? 'translate-x-7' : 'translate-x-0'}`} />
                    </div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-[#2B865A] transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#2B865A]/10 flex items-center justify-center">
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#222021]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        Скидки и акции
                      </h3>
                      <p className="text-sm text-[#635436]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        Не чаще чем 2 раза в неделю
                      </p>
                    </div>
                  </div>
                  
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={promotions}
                      onChange={() => setPromotions(!promotions)}
                      className="sr-only"
                    />
                    <div className={`w-14 h-7 rounded-full transition-colors duration-200 ${promotions ? 'bg-[#2B865A]' : 'bg-gray-300'}`}>
                      <div className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-200 ${promotions ? 'translate-x-7' : 'translate-x-0'}`} />
                    </div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-[#2B865A] transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#2B865A]/10 flex items-center justify-center">
                      <Heart className="text-[#2B865A]" width={24} height={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#222021]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        Уведомления об избранных товарах
                      </h3>
                      <p className="text-sm text-[#635436]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        Об изменениях цен и наличии товаров
                      </p>
                    </div>
                  </div>
                  
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={favorites}
                      onChange={() => setFavorites(!favorites)}
                      className="sr-only"
                    />
                    <div className={`w-14 h-7 rounded-full transition-colors duration-200 ${favorites ? 'bg-[#2B865A]' : 'bg-gray-300'}`}>
                      <div className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-200 ${favorites ? 'translate-x-7' : 'translate-x-0'}`} />
                    </div>
                  </label>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full rounded-xl px-6 py-4 text-lg font-bold transition-all duration-300 mt-10 bg-[#2B865A] text-white shadow hover:shadow-lg hover:scale-[1.02] hover:bg-[#24704A] active:scale-[0.98]"
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  height: '56px',
                }}
              >
                Далее
              </button>
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
              color: '#767B78',
            }}
          >
            <button onClick={() => navigate(-1)} aria-label="Назад">
              <ArrowLeft width={16} height={16} style={{ color: '#635436' }} />
            </button>
            <div className="w-[290px] text-center text-[#635436] ml-6 font-bold">
              Настройки аккаунта
            </div>
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
              <div
                className="inline-flex items-center justify-center rounded-[8px] mx-auto"
                style={{
                  width: '90px',
                  height: '26px',
                  background: '#E7F0EA',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '130%',
                  color: '#2B865A',
                }}
              >
                Шаг 2/3
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
                Основная информация
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
                Заполните ваши персональные данные, <br /> чтобы мы могли создавать для вас полезные подборки и рекомендации
              </p>

              <div className="mb-6 flex justify-evenly">
                <div className="h-1 w-[30%] rounded-full bg-[#D0E0D5]"></div>
                <div className="h-1 w-[30%] rounded-full bg-[#2B865A]"></div>
                <div className="h-1 w-[30%] rounded-full bg-[#D0E0D5]"></div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p
                    className="text-base font-medium mt-4"
                    style={{ fontFamily: 'Manrope, sans-serif', color: '#222021', fontWeight: 500 }}
                  >
                    Уведомления о статусе заказа
                  </p>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={orderStatus}
                      onChange={() => setOrderStatus(!orderStatus)}
                      className="sr-only"
                    />
                    <div
                      className="w-10 h-6 rounded-full"
                      style={{
                        background: orderStatus ? '#2B865A' : '#F4EDE6',
                        transition: 'background-color 0.2s',
                      }}
                    >
                      <div
                        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                          orderStatus ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <p
                    className="text-base font-medium"
                    style={{ fontFamily: 'Manrope, sans-serif', color: '#222021', fontWeight: 500 }}
                  >
                    Персональные рекомендации
                  </p>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={personalRecs}
                      onChange={() => setPersonalRecs(!personalRecs)}
                      className="sr-only"
                    />
                    <div
                      className="w-10 h-6 rounded-full"
                      style={{
                        background: personalRecs ? '#2B865A' : '#F4EDE6',
                        transition: 'background-color 0.2s',
                      }}
                    >
                      <div
                        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                          personalRecs ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </div>
                  </label>
                </div>
                <p
                  style={{
                    fontFamily: 'Manrope',
                    fontWeight: 500,
                    fontSize: '12px',
                    lineHeight: '120%',
                    letterSpacing: '0px',
                    color: '#635436',
                    marginTop: '5px',
                  }}
                >
                  Не чаще чем 2 раза в неделю
                </p>

                <div className="flex items-center justify-between">
                  <p
                    className="text-base font-medium"
                    style={{ fontFamily: 'Manrope, sans-serif', color: '#222021', fontWeight: 500 }}
                  >
                    Скидки и акции
                  </p>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={promotions}
                      onChange={() => setPromotions(!promotions)}
                      className="sr-only"
                    />
                    <div
                      className="w-10 h-6 rounded-full"
                      style={{
                        background: promotions ? '#2B865A' : '#F4EDE6',
                        transition: 'background-color 0.2s',
                      }}
                    >
                      <div
                        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                          promotions ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </div>
                  </label>
                </div>
                <p
                  style={{
                    fontFamily: 'Manrope',
                    fontWeight: 500,
                    fontSize: '12px',
                    lineHeight: '120%',
                    letterSpacing: '0px',
                    color: '#635436',
                    marginTop: '5px',
                  }}
                >
                  Не чаще чем 2 раза в неделю
                </p>

                <div className="flex items-center justify-between">
                  <p
                    className="text-base font-medium"
                    style={{ fontFamily: 'Manrope, sans-serif', color: '#222021', fontWeight: 500 }}
                  >
                    Уведомления о избранных товарах
                  </p>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={favorites}
                      onChange={() => setFavorites(!favorites)}
                      className="sr-only"
                    />
                    <div
                      className="w-10 h-6 rounded-full"
                      style={{
                        background: favorites ? '#2B865A' : '#F4EDE6',
                        transition: 'background-color 0.2s',
                      }}
                    >
                      <div
                        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                          favorites ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </div>
                  </label>
                </div>
              </div>

              <p
                className="mt-6 mb-6 text-left text-sm"
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  color: '#635436',
                }}
              >
                Подробно настроить все уведомления вы сможете <br /> в своем личном кабинете.
              </p>

              <button
                onClick={handleSubmit}
                className="mt-52 mb-6 w-full rounded-[100px] bg-[#2B865A] px-6 py-3 text-white font-bold"
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontWeight: 600,
                  fontSize: '14px',
                  lineHeight: '120%',
                  height: '40px',
                  width: '170px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  boxShadow: '0px -2px 15.6px 0px #14652F33',
                }}
              >
                Далее
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}