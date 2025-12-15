// src/pages/ProfilePage.tsx - КОМПАКТНЫЙ ДИЗАЙН
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Cart,
  Heart,
  Home,
  User,
  ArrowLeft,
  Settings,
  ShoppingBag,
  Bell,
  Headset,
  LogOut,
} from 'iconoir-react';
import { useProfileStore } from '../store/profile';
import { useAuthStore } from '../store/auth';
import { useCartLocal } from '../hooks/useCartLocal';

export default function ProfilePage() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const profile = useProfileStore((s) => s.profile);
  const { cartCount, favoritesCount } = useCartLocal();
  const [, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (!profile && window.innerWidth < 1024) {
      navigate('/profile/personal', { replace: true });
    }
  }, [profile, navigate]);

  const handleLogout = () => {
    useProfileStore.setState({ profile: null });
    logout();
    navigate('/welcome');
  };

  if (!profile) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background">
        <div className="text-center space-y-3">
          <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '14px', color: '#767B78' }}>
            Профиль ещё не заполнен.
          </p>
          <button
            onClick={() => navigate('/profile/personal')}
            className="px-5 py-2.5 rounded-[80px] bg-[#2B865A] text-white font-semibold text-sm"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            Перейти к заполнению персональных данных
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-background">
      {/* ✅ ДЕСКТОП - КОМПАКТНАЯ */}
      <div className="hidden lg:flex w-full h-screen">
        {/* Левая колонка */}
        <div className="w-1/3 h-full flex flex-col items-center p-6 xl:p-8 bg-gradient-to-b from-[#FCF8F5] to-[#E0EFBD]/30">
          <div className="max-w-md mx-auto w-full">
            <button
              onClick={() => navigate('/main-page')}
              className="flex items-center gap-2 mb-6 text-[#2B865A] hover:text-[#24704A] transition-colors group text-sm"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              <ArrowLeft className="transform group-hover:-translate-x-1 transition-transform" width={16} height={16} />
              Назад
            </button>

            <div className="flex flex-col items-center mb-10">
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#2B865A] to-[#E0EFBD] p-1">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                    {profile.avatarFile ? (
                      <img src={URL.createObjectURL(profile.avatarFile)} alt="Аватар" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-[#2B865A]/10 flex items-center justify-center">
                        <User className="text-[#2B865A]" width={32} height={32} />
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => navigate('/profile/personal')}
                  className="absolute bottom-1.5 right-1.5 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <Settings className="text-[#2B865A]" width={14} height={14} />
                </button>
              </div>

              <h1 className="text-xl font-bold text-center mb-1.5" style={{ fontFamily: 'Manrope, sans-serif', color: '#222021' }}>
                {profile.name}
              </h1>
              <p className="text-sm text-[#4D7059] text-center mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Добро пожаловать в личный кабинет
              </p>

              <div className="grid grid-cols-3 gap-3 w-full mb-6">
                {[
                  { label: 'Избранное', value: favoritesCount, icon: '❤️' },
                  { label: 'Корзина', value: cartCount, icon: '🛒' },
                  { label: 'Заказы', value: profile.ordersCount || 0, icon: '📦' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-white/80 backdrop-blur-sm rounded-lg p-3 text-center shadow-md hover:shadow-lg transition-shadow duration-300 group cursor-default"
                  >
                    <div className="text-xl mb-1.5">{item.icon}</div>
                    <div className="text-xs text-[#635436] mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      {item.label}
                    </div>
                    <div className="text-lg font-bold text-[#2B865A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2.5 mt-auto pt-6">
                <div className="w-8 h-8 rounded-lg bg-white/50 flex items-center justify-center shadow">
                  <span className="text-[#2B865A] font-bold text-base" style={{ fontFamily: 'Manrope, sans-serif' }}>Q</span>
                </div>
                <div>
                  <h2 className="text-sm font-bold text-[#2B865A]" style={{ fontFamily: 'Manrope, sans-serif' }}>Qure</h2>
                  <p className="text-xs text-[#4D7059]">Health Assistant</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Правая колонка */}
        <div className="w-2/3 h-full flex items-center justify-center p-6 xl:p-8">
          <div className="w-full max-w-3xl mx-auto">
            <div className="w-full rounded-xl bg-white/90 backdrop-blur-sm shadow-lg border border-white/20 p-6 xl:p-8">
              <h2 className="text-xl font-bold mb-6" style={{ fontFamily: 'Manrope, sans-serif', color: '#222021' }}>
                Настройки и управление
              </h2>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  {
                    title: 'Персональные данные',
                    description: 'Имя, контакты, пароль',
                    icon: <User className="text-[#2B865A]" width={20} height={20} />,
                    action: () => navigate('/profile/personal'),
                  },
                  {
                    title: 'Уведомления',
                    description: 'Настройка оповещений',
                    icon: <Bell className="text-[#2B865A]" width={20} height={20} />,
                    action: () => {},
                  },
                  {
                    title: 'История заказов',
                    description: 'Все ваши покупки',
                    icon: <ShoppingBag className="text-[#2B865A]" width={20} height={20} />,
                    action: () => navigate('/checkout'),
                  },
                  {
                    title: 'Избранное',
                    description: 'Сохраненные товары',
                    icon: <Heart className="text-[#FE5F55] fill-current" width={20} height={20} />,
                    action: () => navigate('/favorites'),
                  },
                ].map((item) => (
                  <button
                    key={item.title}
                    onClick={item.action}
                    className="flex flex-col items-start p-4 rounded-lg bg-white border border-gray-100 hover:border-[#2B865A] hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-md bg-[#2B865A]/5 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      {item.icon}
                    </div>
                    <h3 className="font-semibold text-base mb-1.5 text-left" style={{ fontFamily: 'Manrope, sans-serif', color: '#222021' }}>
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#4D7059] text-left" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      {item.description}
                    </p>
                  </button>
                ))}
              </div>

              <div className="space-y-3 mb-6">
                <button className="w-full flex items-center justify-between p-3 rounded-lg bg-[#FCF8F5] hover:bg-white hover:shadow-md transition-all duration-300 group">
                  <div className="flex items-center gap-2.5">
                    <Headset className="text-[#2B865A]" width={16} height={16} />
                    <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: '14px', color: '#222021' }}>
                      Поддержка
                    </span>
                  </div>
                  <span className="text-[#2B865A] transform group-hover:translate-x-1 transition-transform">›</span>
                </button>

                <button className="w-full flex items-center justify-between p-3 rounded-lg bg-[#FCF8F5] hover:bg-white hover:shadow-md transition-all duration-300 group">
                  <div className="flex items-center gap-2.5">
                    <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: '14px', color: '#222021' }}>
                      Пользовательское соглашение
                    </span>
                  </div>
                  <span className="text-[#2B865A] transform group-hover:translate-x-1 transition-transform">›</span>
                </button>
              </div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2.5 py-3 rounded-lg border-2 border-[#FE5F55] text-[#FE5F55] hover:bg-[#FE5F55] hover:text-white transition-all duration-300 group mt-6 text-sm"
              >
                <LogOut className="transform group-hover:scale-110 transition-transform" width={16} height={16} />
                <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 500 }}>
                  Выйти из аккаунта
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* ✅ ДЕСКТОП НАВИГАЦИЯ - КОМПАКТНАЯ */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg px-5 py-3">
          <div className="flex items-center gap-6">
            {[
              { label: 'Главная', icon: Home, path: '/main-page', count: 0 },
              { label: 'Избранное', icon: Heart, path: '/favorites', count: favoritesCount },
              { label: 'Корзина', icon: Cart, path: '/cart', count: cartCount },
              { label: 'Профиль', icon: User, path: '/profile', active: true },
            ].map(({ label, icon: IconComponent, path, count, active = false }) => (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={`flex flex-col items-center gap-0.5 ${active ? 'scale-105' : 'hover:scale-102'}`}
              >
                <div className={`p-2 rounded-full relative ${active ? 'bg-[#2B865A]/10' : ''}`}>
                  <IconComponent width={18} height={18} className={active ? 'text-[#2B865A]' : 'text-[#669B78]'} />
                  {count > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#FE5F55] text-white text-[10px] rounded-full w-3.5 h-3.5 flex items-center justify-center">
                      {count > 99 ? '99+' : count}
                    </span>
                  )}
                </div>
                <span className={`text-[10px] ${active ? 'text-[#2B865A] font-bold' : 'text-[#669B78]'}`} style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ✅ МОБИЛЬНАЯ - КОМПАКТНАЯ */}
      <div className="lg:hidden flex min-h-screen w-full items-center justify-center bg-background">
        <div className="w-[390px] h-[844px] overflow-y-auto relative shadow-xl bg-white">
          <div style={{
            backgroundColor: '#2B865A',
            borderBottomLeftRadius: '24px',
            borderBottomRightRadius: '24px',
            paddingTop: '40px',
            paddingBottom: '20px',
            paddingLeft: '16px',
            paddingRight: '16px',
          }}>
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => navigate(-1)} className="flex items-center gap-1.5">
                <ArrowLeft width={18} height={18} style={{ color: 'white' }} />
                <span style={{ fontFamily: 'Manrope, sans-serif', color: 'white', fontSize: '14px' }}>Назад</span>
              </button>
              <div style={{ fontFamily: 'Manrope, sans-serif', color: '#FFFFFFCC', fontSize: '13px' }}>
                г. Алматы
              </div>
            </div>
            
            <div className="bg-white/90 rounded-xl p-3">
              <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: '18px', fontWeight: 700, color: '#222021' }}>
                Личный кабинет
              </h1>
            </div>
          </div>

          <div className="p-3 space-y-3 pb-20">
            {user?.role === 'admin' && (
              <button
                onClick={() => navigate('/admin')}
                className="w-full flex items-center justify-between px-3 py-3 rounded-xl bg-white shadow-xs border border-[#F8F8F8] hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#FE5F55]/10 flex items-center justify-center">
                    <span className="text-[#FE5F55] text-base">⚙️</span>
                  </div>
                  <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: '14px', fontWeight: 600, color: '#222021' }}>
                    Админ панель
                  </span>
                </div>
                <span style={{ color: '#2B865A', fontSize: '16px' }}>›</span>
              </button>
            )}

            <div className="flex items-center gap-3 mb-4">
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '999px',
                background: 'linear-gradient(135deg, #2B865A 0%, #E0EFBD 100%)',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {profile.avatarFile ? (
                  <img src={URL.createObjectURL(profile.avatarFile)} alt="Аватар" style={{ width: '56px', height: '56px', objectFit: 'cover', borderRadius: '999px' }} />
                ) : (
                  <User style={{ color: 'white', width: '24px', height: '24px' }} />
                )}
              </div>
              <div>
                <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '13px', color: '#635436' }}>
                  Добрый день,
                </p>
                <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '18px', color: '#222021' }}>
                  {profile.name}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 mb-4">
              {[
                { label: 'Избранное', value: favoritesCount, icon: '❤️' },
                { label: 'Корзина', value: cartCount, icon: '🛒' },
                { label: 'Заказы', value: profile.ordersCount || 0, icon: '📦' },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-xl bg-white shadow-xs border border-[#F0F0F0] hover:shadow-sm transition-all">
                  <div className="text-xl mb-1.5">{item.icon}</div>
                  <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '11px', color: '#635436' }}>{item.label}</p>
                  <p style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '18px', color: '#2B865A' }}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-1.5">
              <button
                onClick={() => navigate('/profile/personal')}
                className="w-full flex items-center justify-between px-3 py-3 rounded-xl bg-white shadow-xs hover:shadow-sm transition-all"
              >
                <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: '14px', fontWeight: 600, color: '#222021' }}>
                  Персональные данные
                </span>
                <span style={{ color: '#2B865A', fontSize: '18px' }}>›</span>
              </button>

              <button
                onClick={() => navigate('/profile/orders')}
                className="w-full flex items-center justify-between px-3 py-3 rounded-xl bg-white shadow-xs hover:shadow-sm transition-all"
              >
                <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: '14px', fontWeight: 600, color: '#222021' }}>
                  История заказов
                </span>
                <span style={{ color: '#2B865A', fontSize: '18px' }}>›</span>
              </button>

              <button
                onClick={() => navigate('/favorites')}
                className="w-full flex items-center justify-between px-3 py-3 rounded-xl bg-white shadow-xs hover:shadow-sm transition-all"
              >
                <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: '14px', fontWeight: 600, color: '#222021' }}>
                  Избранное ({favoritesCount})
                </span>
                <span style={{ color: '#2B865A', fontSize: '18px' }}>›</span>
              </button>

              <button
                onClick={() => navigate('/cart')}
                className="w-full flex items-center justify-between px-3 py-3 rounded-xl bg-[#F8F8F8] shadow-xs hover:shadow-sm transition-all"
              >
                <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: '14px', fontWeight: 600, color: '#222021' }}>
                  Корзина ({cartCount})
                </span>
                <span style={{ color: '#2B865A', fontSize: '18px' }}>›</span>
              </button>

              <button className="w-full flex items-center justify-between px-3 py-3 rounded-xl bg-white shadow-xs hover:shadow-sm transition-all">
                <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: '14px', fontWeight: 600, color: '#222021' }}>
                  Поддержка
                </span>
                <span style={{ color: '#2B865A', fontSize: '18px' }}>›</span>
              </button>

              <button className="w-full flex items-center justify-between px-3 py-3 rounded-xl bg-white shadow-xs hover:shadow-sm transition-all">
                <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: '14px', fontWeight: 600, color: '#222021' }}>
                  Пользовательское соглашение
                </span>
                <span style={{ color: '#2B865A', fontSize: '18px' }}>›</span>
              </button>
            </div>

            <button
              onClick={handleLogout}
              className="mt-4 w-full py-3 rounded-xl border-2 border-[#FE5F55] text-[#FE5F55] font-semibold hover:bg-[#FE5F55] hover:text-white transition-all text-sm"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              Выйти из аккаунта
            </button>
          </div>

          {/* ✅ МОБИЛЬНАЯ НАВИГАЦИЯ - КОМПАКТНАЯ */}
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-around" style={{
            height: '68px',
            padding: '8px 12px 16px',
            backgroundColor: '#FFFFFF',
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px',
            boxShadow: '0px -3px 12px rgba(0,0,0,0.06)',
          }}>
            {[
              { label: 'Главная', icon: Home, path: '/main-page', count: 0 },
              { label: 'Избранное', icon: Heart, path: '/favorites', count: favoritesCount },
              { label: 'Корзина', icon: Cart, path: '/cart', count: cartCount },
              { label: 'Профиль', icon: User, path: '/profile', active: true },
            ].map(({ label, icon: IconComponent, path, count, active = false }) => (
              <button key={path} onClick={() => navigate(path)} className="relative flex flex-col items-center gap-0.5">
                <div className="relative">
                  <IconComponent width={18} height={18} style={{ color: active ? '#2B865A' : '#669B78' }} />
                  {count > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#FE5F55] text-white text-[10px] rounded-full w-3.5 h-3.5 flex items-center justify-center">
                      {count > 9 ? '9+' : count}
                    </span>
                  )}
                </div>
                <span style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: '9px',
                  fontWeight: active ? 700 : 500,
                  color: active ? '#2B865A' : '#669B78',
                }}>
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}