import { useNavigate } from 'react-router-dom';
import { Cart, Heart, Home, User, ArrowLeft, Settings, ShoppingBag, Bell,  Headset, LogOut } from 'iconoir-react';
import { useProfileStore } from '../store/profile';
import { useAuthStore } from '../store/auth';
import { useEffect, useState } from 'react';


export default function ProfilePage() {

  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const profile = useProfileStore((s) => s.profile);
  const [, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  if (!profile) {
    navigate('/profile/personal');
    return null;
  }

  const handleLogout = () => {
    useProfileStore.setState({ profile: null });
    logout();
    navigate('/welcome');
  };

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="hidden lg:flex w-full h-screen">
        <div className="w-1/3 h-full flex flex-col items-center p-8 xl:p-12 bg-gradient-to-b from-[#FCF8F5] to-[#E0EFBD]/30">
          <div className="max-w-md mx-auto w-full">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-3 mb-8 text-[#2B865A] hover:text-[#24704A] transition-colors group"
              style={{ fontFamily: 'Manrope, sans-serif', fontSize: '16px' }}
            >
              <ArrowLeft className="transform group-hover:-translate-x-1 transition-transform" width={20} height={20} />
              Назад
            </button>

            <div className="flex flex-col items-center mb-12">
              <div className="relative mb-6">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#2B865A] to-[#E0EFBD] p-1">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                    {profile.avatarFile ? (
                      <img
                        src={URL.createObjectURL(profile.avatarFile)}
                        alt="Аватар"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-[#2B865A]/10 flex items-center justify-center">
                        <User className="text-[#2B865A]" width={40} height={40} />
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => navigate('/profile/personal')}
                  className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <Settings className="text-[#2B865A]" width={16} height={16} />
                </button>
              </div>

              <h1
                className="text-2xl xl:text-3xl font-bold text-center mb-2"
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  color: '#222021',
                }}
              >
                {profile.name}
              </h1>
              
              <p
                className="text-base text-[#4D7059] text-center mb-8"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                Добро пожаловать в личный кабинет
              </p>

              <div className="grid grid-cols-3 gap-4 w-full mb-8">
                {[
                  { label: 'Бонусы', value: `${profile.bonuses}₸`, icon: '🎁' },
                  { label: 'Избранное', value: profile.favoritesCount, icon: '❤️' },
                  { label: 'Заказы', value: profile.ordersCount, icon: '📦' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <div
                      className="text-sm text-[#635436] mb-1"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      {item.label}
                    </div>
                    <div
                      className="text-xl font-bold text-[#2B865A]"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>

              

              <div className="flex items-center gap-3 mt-auto pt-8">
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
        </div>

        <div className="w-2/3 h-full flex items-center justify-center p-8 xl:p-12">
          <div className="w-full max-w-3xl mx-auto">
            <div className="w-full rounded-2xl bg-white/90 backdrop-blur-sm shadow-xl border border-white/20 p-8 xl:p-10">
              <h2
                className="text-2xl xl:text-3xl font-bold mb-8"
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  color: '#222021',
                }}
              >
                Настройки и управление
              </h2>

              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  {
                    title: 'Персональные данные',
                    description: 'Имя, контакты, пароль',
                    icon: <User className="text-[#2B865A]" width={24} height={24} />,
                    action: () => navigate('/profile/personal'),
                    color: 'bg-[#2B865A]/5'
                  },
                  {
                    title: 'Уведомления',
                    description: 'Настройка оповещений',
                    icon: <Bell className="text-[#2B865A]" width={24} height={24} />,
                    action: () => {},
                    color: 'bg-[#2B865A]/5'
                  },
                  {
                    title: 'История заказов',
                    description: 'Все ваши покупки',
                    icon: <ShoppingBag className="text-[#2B865A]" width={24} height={24} />,
                    action: () => {},
                    color: 'bg-[#2B865A]/5'
                  },
                  {
                    title: 'Избранное',
                    description: 'Сохраненные товары',
                    icon: <Heart className="text-[#2B865A]" width={24} height={24} />,
                    action: () => navigate('/favorites'),
                    color: 'bg-[#2B865A]/5'
                  },
                ].map((item) => (
                  <button
                    key={item.title}
                    onClick={item.action}
                    className="flex flex-col items-start p-6 rounded-xl bg-white border border-gray-100 hover:border-[#2B865A] hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className={`w-12 h-12 rounded-lg ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      {item.icon}
                    </div>
                    <h3
                      className="font-semibold text-lg mb-2 text-left"
                      style={{
                        fontFamily: 'Manrope, sans-serif',
                        color: '#222021',
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-sm text-[#4D7059] text-left"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      {item.description}
                    </p>
                  </button>
                ))}
              </div>

              <div className="space-y-4 mb-8">
                <button
                  onClick={() => {}}
                  className="w-full flex items-center justify-between p-4 rounded-xl bg-[#FCF8F5] hover:bg-white hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <Headset className="text-[#2B865A]" width={20} height={20} />
                    <span
                      style={{
                        fontFamily: 'Manrope, sans-serif',
                        fontSize: '16px',
                        color: '#222021',
                      }}
                    >
                      Поддержка
                    </span>
                  </div>
                  <span className="text-[#2B865A] transform group-hover:translate-x-1 transition-transform">›</span>
                </button>

                <button
                  onClick={() => {}}
                  className="w-full flex items-center justify-between p-4 rounded-xl bg-[#FCF8F5] hover:bg-white hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <span
                      style={{
                        fontFamily: 'Manrope, sans-serif',
                        fontSize: '16px',
                        color: '#222021',
                      }}
                    >
                      Пользовательское соглашение
                    </span>
                  </div>
                  <span className="text-[#2B865A] transform group-hover:translate-x-1 transition-transform">›</span>
                </button>
              </div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-3 py-4 rounded-xl border-2 border-[#FE5F55] text-[#FE5F55] hover:bg-[#FE5F55] hover:text-white transition-all duration-300 group mt-8"
              >
                <LogOut className="transform group-hover:scale-110 transition-transform" width={20} height={20} />
                <span
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: '16px',
                    fontWeight: 500,
                  }}
                >
                  Выйти из аккаунта
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 w-auto bg-white/90 backdrop-blur-sm rounded-full shadow-2xl border border-white/20 px-6 py-4">
          <div className="flex items-center gap-8">
            {[
              { label: 'Главная', icon: Home, path: '/main-page' },
              { label: 'Избранное', icon: Heart, path: '/favorites' },
              { label: 'Корзина', icon: Cart, path: '/cart' },
              { label: 'Профиль', icon: User, path: '/profile' },
            ].map((tab) => {
              const IconComponent = tab.icon;
              const isActive = tab.path === '/profile';
              return (
                <button
                  key={tab.path}
                  onClick={() => navigate(tab.path)}
                  className={`flex flex-col items-center gap-1 transition-all duration-300 ${isActive ? 'scale-110' : 'hover:scale-105'}`}
                >
                  <div className={`p-3 rounded-full ${isActive ? 'bg-[#2B865A]/10' : ''}`}>
                    <IconComponent
                      width={20}
                      height={20}
                      className={isActive ? 'text-[#2B865A]' : 'text-[#669B78]'}
                    />
                  </div>
                  <span
                    className={`text-xs font-medium ${isActive ? 'text-[#2B865A] font-bold' : 'text-[#669B78]'}`}
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="lg:hidden flex min-h-screen w-full items-center justify-center bg-background">
        <div className="w-[390px] h-[750px] overflow-y-hidden relative shadow-xl">
          <div className="h-full overflow-y-auto pb-[92px]">
            <div
              style={{
                backgroundColor: '#2B865A',
                borderBottomLeftRadius: '32px',
                borderBottomRightRadius: '32px',
                paddingTop: '46px',
                paddingBottom: '16px',
                paddingLeft: '16px',
                paddingRight: '16px',
              }}
            >
              <h1
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontWeight: 600,
                  fontSize: '18px',
                  color: '#FFFFFF',
                  textAlign: 'center',
                }}
              >
                Личный кабинет
              </h1>
            </div>

            <div className="px-4 pt-4">
              {user?.role === 'admin' && (
                <button
                  onClick={() => navigate('/admin')}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-[16px] bg-white shadow-sm mb-4 border border-[#F8F8F8] hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#FE5F55]/10 flex items-center justify-center">
                      <span className="text-[#FE5F55]">⚙️</span>
                    </div>
                    <span style={{ fontSize: '15px', color: '#222021', fontWeight: 500 }}>
                      Админ панель
                    </span>
                  </div>
                  <span style={{ color: '#2B865A' }}>›</span>
                </button>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '999px',
                    backgroundColor: profile.avatarFile ? '#F4EDE6' : '#F4EDE6',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {profile.avatarFile ? (
                    <img
                      src={URL.createObjectURL(profile.avatarFile)}
                      alt="Аватар"
                      style={{
                        width: '56px',
                        height: '56px',
                        objectFit: 'cover',
                        borderRadius: '999px',
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '999px',
                        backgroundColor: '#D0E0D5',
                      }}
                    />
                  )}
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: '14px',
                      color: '#635436',
                    }}
                  >
                    Добрый день,
                  </p>
                  <p
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontWeight: 700,
                      fontSize: '22px',
                      color: '#222021',
                    }}
                  >
                    {profile.name}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-6">
                {[
                  { label: 'Бонусы', value: `${profile.bonuses}₸` },
                  { label: 'Избранное', value: profile.favoritesCount },
                  { label: 'Заказы', value: profile.ordersCount },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      borderRadius: '16px',
                      backgroundColor: '#FFFFFF',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.04)',
                      padding: '10px 8px',
                      textAlign: 'center',
                    }}
                  >
                    <p
                      style={{
                        fontFamily: 'Manrope, sans-serif',
                        fontSize: '12px',
                        color: '#635436',
                        marginBottom: '4px',
                      }}
                    >
                      {item.label}
                    </p>
                    <p
                      style={{
                        fontFamily: 'Manrope, sans-serif',
                        fontWeight: 700,
                        fontSize: '20px',
                        color: '#2B865A',
                      }}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mb-4">
                <button
                  onClick={() => navigate('/profile/personal')}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-[16px] bg-white shadow-sm hover:bg-gray-50 transition-colors"
                >
                  <span
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: '15px',
                      color: '#222021',
                    }}
                  >
                    Персональные данные
                  </span>
                  <span style={{ color: '#2B865A' }}>›</span>
                </button>

                <button className="w-full flex items-center justify-between px-4 py-3 rounded-[16px] bg-white shadow-sm hover:bg-gray-50 transition-colors">
                  <span
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: '15px',
                      color: '#222021',
                    }}
                  >
                    Настройка уведомлений и доступ…
                  </span>
                  <span style={{ color: '#2B865A' }}>›</span>
                </button>

                <button className="w-full flex items-center justify-between px-4 py-3 rounded-[16px] bg-white shadow-sm hover:bg-gray-50 transition-colors">
                  <span
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: '15px',
                      color: '#222021',
                    }}
                  >
                    История заказов
                  </span>
                  <span style={{ color: '#2B865A' }}>›</span>
                </button>
              </div>

              <button
                className="mt-4 w-full flex items-center justify-between px-4 py-3 rounded-[16px] bg-white shadow-sm hover:bg-gray-50 transition-colors"
              >
                <span
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: '15px',
                    color: '#222021',
                  }}
                >
                  Поддержка
                </span>
                <span style={{ color: '#2B865A' }}>›</span>
              </button>

              <button
                className="mt-2 w-full flex items-center justify-between px-4 py-3 rounded-[16px] bg-white shadow-sm hover:bg-gray-50 transition-colors"
              >
                <span
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: '15px',
                    color: '#222021',
                  }}
                >
                  Пользовательское соглашение
                </span>
                <span style={{ color: '#2B865A' }}>›</span>
              </button>

              <button
                onClick={handleLogout}
                className="mt-4 w-full text-left px-4 py-3 hover:bg-gray-50 rounded-[16px] transition-colors"
              >
                <span
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: '15px',
                    color: '#FE5F55',
                  }}
                >
                  Выйти из аккаунта
                </span>
              </button>
            </div>
          </div>

          <div
            className="absolute left-0 right-0 bottom-0 flex items-center justify-around"
            style={{
              marginLeft: '10px',
              width: '366px',
              bottom: '10px',
              height: '80px',
              padding: '10px 16px 20px',
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: '24px',
              borderTopRightRadius: '24px',
              boxShadow: '0px -4px 16px rgba(0,0,0,0.06)',
            }}
          >
            {[
              { label: 'Главная\nстраница', icon: Home, path: '/main-page', active: false },
              { label: 'Избранное', icon: Heart, path: '/favorites', active: false },
              { label: 'Корзина', icon: Cart, path: '/cart', active: false },
              { label: 'Личный\nкабинет', icon: User, path: '/profile', active: true },
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.path}
                  onClick={() => navigate(tab.path)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    whiteSpace: 'pre-line',
                  }}
                >
                  <IconComponent
                    width={20}
                    height={20}
                    style={{
                      color: tab.active ? '#2B865A' : '#669B78',
                    }}
                  />
                  <span
                    style={{
                      lineHeight: '1.2',
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: '10px',
                      fontWeight: tab.active ? 700 : 500,
                      color: tab.active ? '#2B865A' : '#669B78',
                    }}
                  >
                    {tab.label}
                </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}