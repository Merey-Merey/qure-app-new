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
        <div className="w-2/5 h-full flex flex-col items-center justify-center p-8 lg:p-10 bg-gradient-to-b from-[#FCF8F5] to-[#E0EFBD]/30">
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
              <div className="flex items-center justify-between mb-6">
                <div className="text-xs font-medium text-[#2B865A]">Шаг 3 из 3</div>
                <div className="flex gap-1">
                  <div className="w-6 h-1.5 rounded-full bg-gray-300"></div>
                  <div className="w-6 h-1.5 rounded-full bg-gray-300"></div>
                  <div className="w-6 h-1.5 rounded-full bg-[#2B865A]"></div>
                </div>
              </div>

              <h1
                className="text-xl lg:text-2xl font-bold leading-tight mb-4"
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  color: '#222021',
                  lineHeight: '1.2'
                }}
              >
                Геолокация для лучшего обслуживания
              </h1>
              
              <p
                className="text-sm text-[#4D7059] leading-relaxed mb-6"
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  lineHeight: '1.3'
                }}
              >
                Разрешите доступ к геолокации, чтобы мы могли показывать актуальный ассортимент для вашего местоположения и предлагать ближайшие аптеки.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2.5 rounded-lg bg-white/50 backdrop-blur-sm">
                  <div className="w-8 h-8 rounded-lg bg-[#2B865A]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-[#2B865A]" width={16} height={16} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm text-[#222021] truncate">Ближайшие аптеки</h3>
                    <p className="text-xs text-[#4D7059] truncate">Находите аптеки рядом с вами</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-2.5 rounded-lg bg-white/50 backdrop-blur-sm">
                  <div className="w-8 h-8 rounded-lg bg-[#2B865A]/10 flex items-center justify-center flex-shrink-0">
                    <Compass className="text-[#2B865A]" width={16} height={16} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm text-[#222021] truncate">Актуальный ассортимент</h3>
                    <p className="text-xs text-[#4D7059] truncate">Товары доступные в вашем городе</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-2.5 rounded-lg bg-white/50 backdrop-blur-sm">
                  <div className="w-8 h-8 rounded-lg bg-[#2B865A]/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="text-[#2B865A]" width={16} height={16} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm text-[#222021] truncate">Безопасность данных</h3>
                    <p className="text-xs text-[#4D7059] truncate">Ваша геолокация защищена</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-3 rounded-lg bg-white/30 backdrop-blur-sm">
              <p className="text-xs text-[#4D7059]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Ваша геолокация используется только для улучшения сервиса. Мы не передаем ваши данные третьим лицам.
              </p>
            </div>
          </div>
        </div>

        <div className="w-3/5 h-full flex items-center justify-center p-8 lg:p-10">
          <div className="w-full max-w-md mx-auto">
            <div className="w-full rounded-xl bg-white/90 backdrop-blur-sm shadow-lg border border-white/20 p-6 lg:p-8">
              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-full bg-[#2B865A]/10 flex items-center justify-center mx-auto mb-3">
                  <MapPin className="text-[#2B865A]" width={24} height={24} />
                </div>
                
                <h2
                  className="text-lg lg:text-xl font-bold mb-3"
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    color: '#222021',
                  }}
                >
                  Разрешите доступ к геолокации
                </h2>
                
                <p
                  className="text-xs text-[#635436] mb-4"
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                  }}
                >
                  Чтобы мы могли точнее показывать вам доступный ассортимент для вашего местоположения
                </p>
              </div>

              <div className="mb-6">
                <div className="relative rounded-xl overflow-hidden border border-gray-200">
                  <div className="h-48 bg-gradient-to-br from-[#F0F7E8] to-[#E0EFBD] flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center mx-auto mb-2 shadow-md">
                        <MapPin className="text-[#2B865A]" width={20} height={20} />
                      </div>
                      <p className="text-[#4D7059] font-medium text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        Ваше местоположение
                      </p>
                    </div>
                    
                    <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-[#2B865A]"></div>
                    <div className="absolute top-8 right-8 w-2 h-2 rounded-full bg-[#FE5F55]"></div>
                    <div className="absolute bottom-8 left-8 w-2 h-2 rounded-full bg-[#2B865A]"></div>
                    <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-[#FE5F55]"></div>
                  </div>
                  
                  <div className="absolute inset-0 border-2 border-transparent">
                    <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-[#2B865A] rounded-tl-md"></div>
                    <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-[#2B865A] rounded-tr-md"></div>
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-[#2B865A] rounded-bl-md"></div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-[#2B865A] rounded-br-md"></div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-base font-semibold text-[#222021] mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Ближайшие аптеки с вашими товарами
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-gray-50">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#2B865A]"></div>
                      <div>
                        <p className="font-medium text-sm text-[#222021]" style={{ fontFamily: 'Manrope, sans-serif' }}>Аптека №1</p>
                        <p className="text-xs text-[#635436]" style={{ fontFamily: 'Manrope, sans-serif' }}>1.2 км</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-50">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#FE5F55]"></div>
                      <div>
                        <p className="font-medium text-sm text-[#222021]" style={{ fontFamily: 'Manrope, sans-serif' }}>Аптека №2</p>
                        <p className="text-xs text-[#635436]" style={{ fontFamily: 'Manrope, sans-serif' }}>2.5 км</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full rounded-lg px-3 py-2.5 text-sm font-semibold transition-all duration-300 bg-[#2B865A] text-white shadow hover:shadow-md hover:bg-[#24704A] active:scale-[0.98]"
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  height: '44px',
                }}
              >
                Разрешить и завершить
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden w-full h-full">
        <div className="w-full h-full overflow-y-auto bg-white">
          <div className="flex items-center px-4 pt-4">
            <button onClick={handleBack} aria-label="Назад" className="p-2">
              <ArrowLeft width={14} height={14} style={{ color: '#635436' }} />
            </button>
            <div className="flex-1 text-center text-sm font-bold text-[#635436] px-4">
              Настройки аккаунта
            </div>
          </div>

          <div className="p-4">
            <div className="flex justify-center mb-4">
              <div className="inline-flex items-center justify-center rounded-md px-3 py-1 bg-[#E7F0EA]">
                <span className="text-xs font-normal text-[#4D7059]">Шаг 3/3</span>
              </div>
            </div>

            <h1 className="text-xl font-semibold text-center mb-2 text-black">
              Разрешите использовать вашу геолокацию
            </h1>
            
            <p className="text-xs text-center text-[#635436] mb-4">
              Чтобы мы могли точнее показывать вам доступный ассортимент для вашего местоположения, разрешите приложению доступ к геолокации.
            </p>

            <div className="flex justify-center gap-2 mb-6">
              <div className="h-1 w-[30%] rounded-full bg-[#D0E0D5]"></div>
              <div className="h-1 w-[30%] rounded-full bg-[#D0E0D5]"></div>
              <div className="h-1 w-[30%] rounded-full bg-[#2B865A]"></div>
            </div>

            <div className="rounded-lg border border-[#D0E0D5] overflow-hidden mb-6">
              <div className="h-64 bg-gradient-to-br from-[#F0F7E8] to-[#E0EFBD] flex items-center justify-center">
                <div className="text-center">
                  <div className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center mx-auto mb-2 shadow-md">
                    <MapPin className="text-[#2B865A]" width={20} height={20} />
                  </div>
                  <p className="text-sm font-medium text-[#4D7059]">
                    Карта вашего местоположения
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-semibold text-[#222021] mb-3">Ближайшие аптеки</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#2B865A]"></div>
                    <span className="text-sm font-medium">Аптека №1</span>
                  </div>
                  <span className="text-xs text-[#635436]">1.2 км</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#FE5F55]"></div>
                    <span className="text-sm font-medium">Аптека №2</span>
                  </div>
                  <span className="text-xs text-[#635436]">2.5 км</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full rounded-[20px] bg-[#2B865A] px-4 py-2.5 text-white font-semibold text-sm shadow hover:bg-[#24704A]"
            >
              Разрешить и завершить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}