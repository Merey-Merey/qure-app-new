// src/pages/CartPage.tsx - ✅ КОМПАКТНЫЙ ДИЗАЙН
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cart, Heart, Home, User, Trash, ArrowLeft, Plus, Minus } from 'iconoir-react';
import { useCartLocal } from '../hooks/useCartLocal';

export default function CartPage() {
  const navigate = useNavigate();
  const { cart: items, changeQty, removeFromCart, cartCount, favoritesCount } = useCartLocal();
  const [, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => setIsDesktop(window.innerWidth >= 1024);
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const total = items.reduce((sum, p) => sum + p.price * (p.quantity || 1), 0);
  const available = items.filter(p => !p.prescriptionRequired);
  const needRx = items.filter(p => p.prescriptionRequired);
  const isEmpty = items.length === 0;

  return (
    <div className="w-full min-h-screen bg-background">
      {/* ✅ ДЕСКТОП ВЕРСИЯ - КОМПАКТНЫЙ ДИЗАЙН */}
      <div className="hidden lg:flex w-full min-h-screen">
        <div className="w-2/5 h-full flex flex-col items-center p-6 xl:p-8 bg-gradient-to-b from-[#FCF8F5] to-[#E0EFBD]/30">
          <div className="max-w-md mx-auto w-full">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 mb-6 text-[#2B865A] hover:text-[#24704A] transition-colors group text-sm"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              <ArrowLeft className="transform group-hover:-translate-x-1 transition-transform" width={16} height={16} />
              Назад
            </button>

            <div className="mb-10">
              {/* ✅ СТАТИСТИКА КОРЗИНЫ */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 shadow-sm mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-bold" style={{ fontFamily: 'Manrope, sans-serif', color: '#222021' }}>
                    Ваша корзина
                  </h2>
                  <div className="px-3 py-1 rounded-full bg-[#2B865A]/10">
                    <span className="text-[#2B865A] font-semibold text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      {items.length} товара
                    </span>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span style={{ fontFamily: 'Manrope, sans-serif', color: '#635436', fontSize: '13px' }}>
                      Товары ({available.length})
                    </span>
                    <span className="font-semibold" style={{ fontFamily: 'Manrope, sans-serif', color: '#222021', fontSize: '14px' }}>
                      {available.reduce((sum, p) => sum + p.price * (p.quantity || 1), 0).toFixed(0)} ₸
                    </span>
                  </div>
                  
                  {needRx.length > 0 && (
                    <div className="flex justify-between items-center">
                      <span style={{ fontFamily: 'Manrope, sans-serif', color: '#635436', fontSize: '13px' }}>
                        Требуют рецепта ({needRx.length})
                      </span>
                      <span className="font-semibold" style={{ fontFamily: 'Manrope, sans-serif', color: '#222021', fontSize: '14px' }}>
                        {needRx.reduce((sum, p) => sum + p.price * (p.quantity || 1), 0).toFixed(0)} ₸
                      </span>
                    </div>
                  )}

                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-base font-bold" style={{ fontFamily: 'Manrope, sans-serif', color: '#222021' }}>
                        Итого
                      </span>
                      <span className="text-xl font-bold text-[#2B865A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        {total.toFixed(0)} ₸
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ✅ ПРЕИМУЩЕСТВА */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50 backdrop-blur-sm">
                  <div className="w-8 h-8 rounded-md bg-[#2B865A]/10 flex items-center justify-center">
                    <svg className="text-[#2B865A]" width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[#222021] text-sm">Бесплатная доставка</h3>
                    <p className="text-xs text-[#4D7059]">При заказе от 10 000 ₸</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50 backdrop-blur-sm">
                  <div className="w-8 h-8 rounded-md bg-[#2B865A]/10 flex items-center justify-center">
                    <svg className="text-[#2B865A]" width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M12 15V3M12 15L8 11M12 15L16 11M2 17L3.785 19.085C4.14449 19.5489 4.64251 19.8953 5.214 20.077M22 17L20.215 19.085C19.8555 19.5489 19.3575 19.8953 18.786 20.077" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[#222021] text-sm">Быстрая доставка</h3>
                    <p className="text-xs text-[#4D7059]">1-2 дня по Алматы</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/50 flex items-center justify-center shadow">
                <span className="text-[#2B865A] font-bold text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>Q</span>
              </div>
              <div>
                <h2 className="text-sm font-bold text-[#2B865A]" style={{ fontFamily: 'Manrope, sans-serif' }}>Qure</h2>
                <p className="text-xs text-[#4D7059]">Health Assistant</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-3/5 h-full flex flex-col p-6 xl:p-8">
          <div className="max-w-4xl mx-auto w-full">
            <div className="w-full rounded-xl bg-white/90 backdrop-blur-sm shadow-lg border border-white/20 p-6 xl:p-8 min-h-[550px]">
              {isEmpty ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="mb-6">
                    <img
                      src="/assets/images/empty-basket.png"
                      alt="Пустая корзина"
                      className="w-48 h-48 object-contain"
                      onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/192x192?text=Empty+Basket')}
                    />
                  </div>
                  <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'Manrope, sans-serif', color: '#222021' }}>
                    Ваша корзина пуста
                  </h2>
                  <p className="text-sm text-[#4D7059] mb-6 max-w-md" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Вы пока что не добавили ничего в корзину. Перейдите в каталог, чтобы найти товары для вашего здоровья.
                  </p>
                  <button
                    onClick={() => navigate('/main-page')}
                    className="px-5 py-2 rounded-lg bg-[#2B865A] text-white font-semibold hover:bg-[#24704A] transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] text-sm"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    Перейти в каталог →
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* ✅ ДОСТУПНЫЕ ТОВАРЫ */}
                  {available.length > 0 && (
                    <div>
                      <h2 className="text-lg font-bold mb-3" style={{ fontFamily: 'Manrope, sans-serif', color: '#222021' }}>
                        Доступны к заказу
                      </h2>
                      <div className="space-y-3">
                        {available.map((p) => (
                          <div
                            key={p.id}
                            className="flex items-center gap-3 p-3 rounded-lg bg-white border border-gray-100 hover:border-[#2B865A] hover:shadow-md transition-all duration-300"
                          >
                            <img src={p.image} alt={p.title} className="w-16 h-16 rounded-lg object-cover" />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold mb-1 text-sm" style={{ fontFamily: 'Manrope, sans-serif', color: '#222021' }}>
                                {p.title}
                              </h3>
                              <p className="text-xs text-[#8A8A8A] mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                                {p.subtitle}
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="text-base font-bold text-[#2B865A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                                  {p.price} ₸
                                </span>
                                <div className="flex items-center gap-3">
                                  <div className="flex items-center gap-2 bg-[#F8F8F8] rounded-full px-3 py-1.5">
                                    <button onClick={() => changeQty(p.id, -1)} className="w-6 h-6 flex items-center justify-center text-[#2B865A] hover:text-[#24704A] transition-colors text-sm">
                                      <Minus width={14} height={14} />
                                    </button>
                                    <span className="font-medium text-sm" style={{ fontFamily: 'Manrope, sans-serif', minWidth: '24px', textAlign: 'center' }}>
                                      {p.quantity || 1}
                                    </span>
                                    <button onClick={() => changeQty(p.id, 1)} className="w-6 h-6 flex items-center justify-center text-[#2B865A] hover:text-[#24704A] transition-colors text-sm">
                                      <Plus width={14} height={14} />
                                    </button>
                                  </div>
                                  <button onClick={() => removeFromCart(p.id)} className="p-1.5 rounded-md bg-[#FFF0F0] hover:bg-[#FFE8E6] transition-colors">
                                    <Trash className="text-[#FE5F55]" width={14} height={14} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ✅ ТОВАРЫ ПО РЕЦЕПТУ */}
                  {needRx.length > 0 && (
                    <div>
                      <h2 className="text-lg font-bold mb-3" style={{ fontFamily: 'Manrope, sans-serif', color: '#222021' }}>
                        Требуют подтверждения рецепта
                      </h2>
                      <div className="space-y-3">
                        {needRx.map((p) => (
                          <div key={p.id} className="p-3 rounded-lg border border-[#FFE8E6] bg-[#FFF5F4] hover:shadow-md transition-all duration-300">
                            <div className="flex items-center gap-3 mb-3">
                              <img src={p.image} alt={p.title} className="w-16 h-16 rounded-lg object-cover" />
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold mb-1 text-sm" style={{ fontFamily: 'Manrope, sans-serif', color: '#222021' }}>
                                  {p.title}
                                </h3>
                                <p className="text-xs text-[#8A8A8A] mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                                  {p.subtitle}
                                </p>
                                <div className="flex items-center justify-between">
                                  <span className="text-base font-bold text-[#2B865A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                                    {p.price} ₸
                                  </span>
                                  <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-2 bg-white rounded-full px-3 py-1.5">
                                      <button onClick={() => changeQty(p.id, -1)} className="w-6 h-6 flex items-center justify-center text-[#2B865A] hover:text-[#24704A] transition-colors text-sm">
                                        <Minus width={14} height={14} />
                                      </button>
                                      <span className="font-medium text-sm" style={{ fontFamily: 'Manrope, sans-serif', minWidth: '24px', textAlign: 'center' }}>
                                        {p.quantity || 1}
                                      </span>
                                      <button onClick={() => changeQty(p.id, 1)} className="w-6 h-6 flex items-center justify-center text-[#2B865A] hover:text-[#24704A] transition-colors text-sm">
                                        <Plus width={14} height={14} />
                                      </button>
                                    </div>
                                    <button onClick={() => removeFromCart(p.id)} className="p-1.5 rounded-md bg-white hover:bg-gray-50 transition-colors">
                                      <Trash className="text-[#FE5F55]" width={14} height={14} />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between p-2 rounded-md bg-[#FFE8E6]">
                              <span className="text-xs" style={{ fontFamily: 'Manrope, sans-serif', color: '#FE5F55' }}>
                                Требуется рецепт от врача
                              </span>
                              <button className="px-3 py-1.5 rounded-full bg-[#FE5F55] text-white font-semibold hover:bg-[#E54C42] transition-colors text-xs" style={{ fontFamily: 'Manrope, sans-serif' }}>
                                Подтвердить
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ✅ КНОПКА ОФОРМЛЕНИЯ */}
                  {!isEmpty && (
                    <div className="sticky bottom-0 pt-6 border-t border-gray-200 bg-white/90 backdrop-blur-sm mt-4">
                      <button
                        onClick={() => navigate('/checkout')}
                        className="w-full py-3 rounded-lg bg-[#2B865A] text-white font-bold hover:bg-[#24704A] transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3 text-base"
                        style={{ fontFamily: 'Manrope, sans-serif' }}
                      >
                        <span>Перейти к оформлению</span>
                        <span className="text-lg">• {total.toFixed(0)} ₸</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ✅ ДЕСКТОП НАВИГАЦИЯ - КОМПАКТНАЯ */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-full shadow-xl px-5 py-3">
          <div className="flex items-center gap-6">
            {[
              { label: 'Главная', icon: Home, path: '/main-page', count: 0 },
              { label: 'Избранное', icon: Heart, path: '/favorites', count: favoritesCount },
              { label: 'Корзина', icon: Cart, path: '/cart', count: cartCount, active: true },
              { label: 'Профиль', icon: User, path: '/profile', count: 0 },
            ].map(({ label, icon: Icon, path, count, active = false }) => (
              <button key={path} onClick={() => navigate(path)} className={`flex flex-col items-center gap-0.5 transition-all duration-300 ${active ? 'scale-105' : 'hover:scale-102'}`}>
                <div className={`p-2 rounded-full relative ${active ? 'bg-[#2B865A]/10' : ''}`}>
                  <Icon width={18} height={18} className={active ? 'text-[#2B865A]' : 'text-[#669B78]'} />
                  {count > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#FE5F55] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                      {count > 99 ? '99+' : count}
                    </span>
                  )}
                </div>
                <span className={`text-[10px] font-medium ${active ? 'text-[#2B865A] font-bold' : 'text-[#669B78]'}`} style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ✅ МОБИЛЬНАЯ ВЕРСИЯ - КОМПАКТНАЯ */}
      <div className="lg:hidden w-full min-h-screen bg-background">
        <div className="flex min-h-screen w-full items-center justify-center">
          <div className="w-[390px] h-[844px] overflow-y-auto relative shadow-xl bg-white">
            {/* Мобильный хедер */}
            <div style={{
              backgroundColor: '#2B865A',
              borderBottomLeftRadius: '24px',
              borderBottomRightRadius: '24px',
              paddingTop: '40px',
              paddingBottom: '20px',
              paddingLeft: '16px',
              paddingRight: '16px',
            }}>
              <div className="flex items-center justify-between mb-3">
                <button onClick={() => navigate(-1)} className="flex items-center gap-1.5">
                  <ArrowLeft width={18} height={18} style={{ color: 'white' }} />
                  <span style={{ fontFamily: 'Manrope, sans-serif', color: 'white', fontSize: '14px' }}>Назад</span>
                </button>
                <div style={{ fontFamily: 'Manrope, sans-serif', color: '#FFFFFFCC', fontSize: '13px' }}>
                  г. Алматы
                </div>
              </div>
              
              <div className="bg-white/90 rounded-xl p-3">
                <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: '18px', fontWeight: 700, color: '#222021', marginBottom: '6px' }}>
                  Корзина
                </h1>
                <div className="flex items-center justify-between">
                  <span style={{ fontFamily: 'Manrope, sans-serif', color: '#635436', fontSize: '13px' }}>{items.length} товаров</span>
                  <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: '16px', fontWeight: 700, color: '#2B865A' }}>
                    {total.toFixed(0)} ₸
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3 space-y-3 pb-20">
              {isEmpty ? (
                <div className="flex flex-col items-center justify-center text-center py-16">
                  <Cart width={48} height={48} style={{ color: '#D1D5DB' }} />
                  <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: '18px', fontWeight: 700, color: '#222021', margin: '12px 0' }}>
                    Корзина пуста
                  </h2>
                  <p style={{ fontFamily: 'Manrope, sans-serif', color: '#6B7280', marginBottom: '20px', fontSize: '14px' }}>
                    Добавьте товары из каталога
                  </p>
                  <button
                    onClick={() => navigate('/main-page')}
                    className="px-6 py-2.5 rounded-xl bg-[#2B865A] text-white font-semibold text-sm"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    В каталог
                  </button>
                </div>
              ) : (
                <>
                  {available.map((p) => (
                    <div key={p.id} className="p-3 bg-white rounded-xl shadow-xs border">
                      <div className="flex items-center gap-2.5">
                        <img src={p.image} alt={p.title} className="w-14 h-14 rounded-lg object-cover" />
                        <div className="flex-1 min-w-0">
                          <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: '14px', fontWeight: 600, color: '#222021', marginBottom: '2px' }}>
                            {p.title}
                          </h3>
                          <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>
                            {p.subtitle}
                          </p>
                          <div className="flex items-center justify-between">
                            <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: '16px', fontWeight: 700, color: '#2B865A' }}>
                              {p.price} ₸
                            </span>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1.5 bg-[#F8F8F8] rounded-full px-2 py-1">
                                <button onClick={() => changeQty(p.id, -1)} className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-sm">-</button>
                                <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 600, fontSize: '13px', minWidth: '20px', textAlign: 'center' }}>{p.quantity || 1}</span>
                                <button onClick={() => changeQty(p.id, 1)} className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-sm">+</button>
                              </div>
                              <button onClick={() => removeFromCart(p.id)} className="p-1 rounded-md bg-red-50">
                                <Trash width={16} height={16} style={{ color: '#FE5F55' }} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {needRx.length > 0 && (
                    <div>
                      <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: '14px', fontWeight: 600, color: '#FE5F55', marginBottom: '8px' }}>
                        Требуют рецепт ({needRx.length})
                      </h3>
                      {needRx.map((p) => (
                        <div key={p.id} className="p-3 bg-red-50 rounded-xl border border-red-200">
                          <div className="flex items-center justify-between">
                            <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: '13px' }}>{p.title}</span>
                            <span style={{ fontFamily: 'Manrope, sans-serif', color: '#FE5F55', fontWeight: 600, fontSize: '12px' }}>Рецепт нужен</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
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
                { label: 'Корзина', icon: Cart, path: '/cart', count: cartCount, active: true },
                { label: 'Профиль', icon: User, path: '/profile', count: 0 },
              ].map(({ label, icon: Icon, path, count, active = false }) => (
                <button key={path} onClick={() => navigate(path)} className="relative flex flex-col items-center gap-0.5">
                  <div className="relative">
                    <Icon width={18} height={18} style={{ color: active ? '#2B865A' : '#669B78' }} />
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

            {/* ✅ КНОПКА ОФОРМЛЕНИЯ МОБИЛЬНАЯ */}
            {!isEmpty && (
              <div className="absolute bottom-20 left-3 right-3">
                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full py-3 rounded-xl bg-[#2B865A] text-white font-bold text-base shadow-md"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  Оформить • {total.toFixed(0)} ₸
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}