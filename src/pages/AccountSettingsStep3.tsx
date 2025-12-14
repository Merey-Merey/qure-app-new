import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Shield, Compass } from 'iconoir-react';

export default function AccountSettingsStep3() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/account-updated');
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
                <div className="text-sm font-medium text-[#2B865A]">Шаг 3 из 3</div>
                <div className="flex gap-1">
                  <div className="w-8 h-2 rounded-full bg-gray-300"></div>
                  <div className="w-8 h-2 rounded-full bg-gray-300"></div>
                  <div className="w-8 h-2 rounded-full bg-[#2B865A]"></div>
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
                Геолокация для лучшего обслуживания
              </h1>
              
              <p
                className="text-base xl:text-lg text-[#4D7059] leading-relaxed mb-8"
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  lineHeight: '1.5'
                }}
              >
                Разрешите доступ к геолокации, чтобы мы могли показывать актуальный ассортимент для вашего местоположения и предлагать ближайшие аптеки.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/50 backdrop-blur-sm">
                  <div className="w-10 h-10 rounded-lg bg-[#2B865A]/10 flex items-center justify-center">
                    <MapPin className="text-[#2B865A]" width={20} height={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#222021]">Ближайшие аптеки</h3>
                    <p className="text-sm text-[#4D7059]">Находите аптеки рядом с вами</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/50 backdrop-blur-sm">
                  <div className="w-10 h-10 rounded-lg bg-[#2B865A]/10 flex items-center justify-center">
                    <Compass className="text-[#2B865A]" width={20} height={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#222021]">Актуальный ассортимент</h3>
                    <p className="text-sm text-[#4D7059]">Товары доступные в вашем городе</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/50 backdrop-blur-sm">
                  <div className="w-10 h-10 rounded-lg bg-[#2B865A]/10 flex items-center justify-center">
                    <Shield className="text-[#2B865A]" width={20} height={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#222021]">Безопасность данных</h3>
                    <p className="text-sm text-[#4D7059]">Ваша геолокация защищена</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 rounded-xl bg-white/30 backdrop-blur-sm">
              <p className="text-sm text-[#4D7059]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Ваша геолокация используется только для улучшения сервиса. Мы не передаем ваши данные третьим лицам.
              </p>
            </div>
          </div>
        </div>

        <div className="w-3/5 h-full flex items-center justify-center p-12 xl:p-16 2xl:p-20">
          <div className="w-full max-w-2xl mx-auto">
            <div className="w-full rounded-2xl bg-white/90 backdrop-blur-sm shadow-xl border border-white/20 p-10 xl:p-12">
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-[#2B865A]/10 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="text-[#2B865A]" width={32} height={32} />
                </div>
                
                <h2
                  className="text-2xl xl:text-3xl font-bold mb-4"
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    color: '#222021',
                  }}
                >
                  Разрешите доступ к геолокации
                </h2>
                
                <p
                  className="text-base text-[#635436] mb-6"
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                  }}
                >
                  Чтобы мы могли точнее показывать вам доступный ассортимент для вашего местоположения
                </p>
              </div>

              <div className="mb-8">
                <div className="relative rounded-2xl overflow-hidden border border-gray-200">
                  <div className="h-64 bg-gradient-to-br from-[#F0F7E8] to-[#E0EFBD] flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center mx-auto mb-3 shadow-md">
                        <MapPin className="text-[#2B865A]" width={24} height={24} />
                      </div>
                      <p className="text-[#4D7059] font-medium" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        Ваше местоположение
                      </p>
                    </div>
                    
                    <div className="absolute top-6 left-6 w-3 h-3 rounded-full bg-[#2B865A]"></div>
                    <div className="absolute top-10 right-10 w-3 h-3 rounded-full bg-[#FE5F55]"></div>
                    <div className="absolute bottom-10 left-10 w-3 h-3 rounded-full bg-[#2B865A]"></div>
                    <div className="absolute bottom-6 right-6 w-3 h-3 rounded-full bg-[#FE5F55]"></div>
                  </div>
                  
                  <div className="absolute inset-0 border-4 border-transparent">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#2B865A] rounded-tl-lg"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#2B865A] rounded-tr-lg"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#2B865A] rounded-bl-lg"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#2B865A] rounded-br-lg"></div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-[#222021] mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Ближайшие аптеки с вашими товарами
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-[#2B865A]"></div>
                      <div>
                        <p className="font-medium text-[#222021]" style={{ fontFamily: 'Manrope, sans-serif' }}>Аптека №1</p>
                        <p className="text-sm text-[#635436]" style={{ fontFamily: 'Manrope, sans-serif' }}>1.2 км</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-[#FE5F55]"></div>
                      <div>
                        <p className="font-medium text-[#222021]" style={{ fontFamily: 'Manrope, sans-serif' }}>Аптека №2</p>
                        <p className="text-sm text-[#635436]" style={{ fontFamily: 'Manrope, sans-serif' }}>2.5 км</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full rounded-xl px-6 py-4 text-lg font-bold transition-all duration-300 bg-[#2B865A] text-white shadow hover:shadow-lg hover:scale-[1.02] hover:bg-[#24704A] active:scale-[0.98]"
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  height: '56px',
                }}
              >
                Разрешить и завершить
              </button>

              <p className="text-center text-sm text-[#635436] mt-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Вы можете изменить настройки геолокации в любое время
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden w-full h-full">
        <div className="w-[390px] h-[844px] overflow-y-auto rounded-[30px] border-[3px] border-divider-green-first shadow-xl relative mx-auto">
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
                  color: '#4D7059',
                }}
              >
                Шаг 3/3
              </div>
              <h1
                className="mb-2 text-center"
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontWeight: 600,
                  fontSize: '28px',
                  lineHeight: '110%',
                  color: '#000000',
                  width: '358px',
                  marginTop: '15px',
                }}
              >
                Разрешите использовать вашу геолокацию
              </h1>
              <p
                className="mb-6 text-center"
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontWeight: 500,
                  fontSize: '14px',
                  lineHeight: '130%',
                  color: '#635436',
                  marginTop: '8px',
                }}
              >
                Чтобы мы могли точнее показывать вам доступный ассортимент для вашего местоположения, разрешите приложению доступ к геолокации.
              </p>
              <div className="mb-6 flex justify-evenly">
                <div className="h-1 w-[30%] rounded-full bg-[#D0E0D5]"></div>
                <div className="h-1 w-[30%] rounded-full bg-[#D0E0D5]"></div>
                <div className="h-1 w-[30%] rounded-full bg-[#2B865A]"></div>
              </div>

              <div className="mt-6 rounded-[12px] border border-[#D0E0D5]">
                <div
                  className="w-full h-[350px] flex items-center justify-center"
                >
                  <img src="/assets/images/map.png" alt="" />
                </div>
              </div>
              <button
                onClick={handleSubmit}
                className="mt-16 mb-6 w-full rounded-[100px] bg-[#2B865A] px-6 py-3 text-white font-bold"
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