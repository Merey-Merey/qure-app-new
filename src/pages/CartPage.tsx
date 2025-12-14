import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cart, Heart, Home, User, Trash, ArrowLeft, Plus, Minus } from 'iconoir-react';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const navigate = useNavigate();
  const { items, changeQty, removeItem } = useCart();
  const [, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const total = items.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const available = items.filter((p) => !p.prescriptionRequired);
  const needRx = items.filter((p) => p.prescriptionRequired);
  const isEmpty = items.length === 0;

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="hidden lg:flex w-full min-h-screen">
        <div className="w-2/5 h-full flex flex-col items-center p-8 xl:p-12 bg-gradient-to-b from-[#FCF8F5] to-[#E0EFBD]/30">
          <div className="max-w-md mx-auto w-full">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-3 mb-8 text-[#2B865A] hover:text-[#24704A] transition-colors group"
              style={{ fontFamily: 'Manrope, sans-serif', fontSize: '16px' }}
            >
              <ArrowLeft className="transform group-hover:-translate-x-1 transition-transform" width={20} height={20} />
              Назад
            </button>

            <div className="mb-12">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2
                    className="text-lg font-bold"
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      color: '#222021',
                    }}
                  >
                    Ваша корзина
                  </h2>
                  <div className="px-4 py-2 rounded-full bg-[#2B865A]/10">
                    <span
                      className="text-[#2B865A] font-semibold"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      {items.length} товара
                    </span>
                  </div>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between items-center">
                    <span
                      style={{
                        fontFamily: 'Manrope, sans-serif',
                        color: '#635436',
                      }}
                    >
                      Товары ({available.length})
                    </span>
                    <span
                      className="font-semibold"
                      style={{
                        fontFamily: 'Manrope, sans-serif',
                        color: '#222021',
                      }}
                    >
                      {available.reduce((sum, p) => sum + p.price * p.quantity, 0).toFixed(0)} ₸
                    </span>
                  </div>
                  
                  {needRx.length > 0 && (
                    <div className="flex justify-between items-center">
                      <span
                        style={{
                          fontFamily: 'Manrope, sans-serif',
                          color: '#635436',
                        }}
                      >
                        Требуют рецепта ({needRx.length})
                      </span>
                      <span
                        className="font-semibold"
                        style={{
                          fontFamily: 'Manrope, sans-serif',
                          color: '#222021',
                        }}
                      >
                        {needRx.reduce((sum, p) => sum + p.price * p.quantity, 0).toFixed(0)} ₸
                      </span>
                    </div>
                  )}

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span
                        className="text-lg font-bold"
                        style={{
                          fontFamily: 'Manrope, sans-serif',
                          color: '#222021',
                        }}
                      >
                        Итого
                      </span>
                      <span
                        className="text-2xl font-bold text-[#2B865A]"
                        style={{ fontFamily: 'Manrope, sans-serif' }}
                      >
                        {total.toFixed(0)} ₸
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/50 backdrop-blur-sm">
                  <div className="w-10 h-10 rounded-lg bg-[#2B865A]/10 flex items-center justify-center">
                    <svg className="text-[#2B865A]" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#222021]">Бесплатная доставка</h3>
                    <p className="text-sm text-[#4D7059]">При заказе от 10 000 ₸</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/50 backdrop-blur-sm">
                  <div className="w-10 h-10 rounded-lg bg-[#2B865A]/10 flex items-center justify-center">
                    <svg className="text-[#2B865A]" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 15V3M12 15L8 11M12 15L16 11M2 17L3.785 19.085C4.14449 19.5489 4.64251 19.8953 5.214 20.077M22 17L20.215 19.085C19.8555 19.5489 19.3575 19.8953 18.786 20.077" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#222021]">Быстрая доставка</h3>
                    <p className="text-sm text-[#4D7059]">1-2 дня по Алматы</p>
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

        <div className="w-3/5 h-full flex flex-col p-8 xl:p-12">
          <div className="max-w-4xl mx-auto w-full">
            <div className="w-full rounded-2xl bg-white/90 backdrop-blur-sm shadow-xl border border-white/20 p-8 xl:p-10 min-h-[600px]">
              {isEmpty ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="mb-8">
                    <img
                      src="/assets/images/empty-basket.png"
                      alt="Пустая корзина"
                      className="w-64 h-64 object-contain"
                      onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/256x256?text=Empty+Basket')}
                    />
                  </div>
                  
                  <h2
                    className="text-2xl xl:text-2xl font-bold mb-4"
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      color: '#222021',
                    }}
                  >
                    Ваша корзина пуста
                  </h2>
                  
                  <p
                    className="text-base text-[#4D7059] mb-8 max-w-md"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    Вы пока что не добавили ничего в корзину. Перейдите в каталог, чтобы найти товары для вашего здоровья.
                  </p>

                  <button
                    onClick={() => navigate('/main-page')}
                    className="px-6 py-2 rounded-xl bg-[#2B865A] text-white font-semibold hover:bg-[#24704A] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                    style={{ 
                      fontFamily: 'Manrope, sans-serif', 
                      fontSize: '14px'
                    }}
                  >
                    Перейти в каталог →
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  {available.length > 0 && (
                    <div>
                      <h2
                        className="text-xl font-bold mb-4"
                        style={{
                          fontFamily: 'Manrope, sans-serif',
                          color: '#222021',
                        }}
                      >
                        Доступны к заказу
                      </h2>
                      <div className="space-y-4">
                        {available.map((p) => (
                          <div
                            key={p.id}
                            className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-100 hover:border-[#2B865A] hover:shadow-lg transition-all duration-300"
                          >
                            <img
                              src={p.image}
                              alt={p.title}
                              className="w-20 h-20 rounded-xl object-cover"
                            />
                            <div className="flex-1">
                              <h3
                                className="font-semibold mb-1"
                                style={{
                                  fontFamily: 'Manrope, sans-serif',
                                  color: '#222021',
                                }}
                              >
                                {p.title}
                              </h3>
                              <p
                                className="text-sm text-[#8A8A8A] mb-2"
                                style={{ fontFamily: 'Manrope, sans-serif' }}
                              >
                                {p.subtitle}
                              </p>
                              <div className="flex items-center justify-between">
                                <span
                                  className="text-lg font-bold text-[#2B865A]"
                                  style={{ fontFamily: 'Manrope, sans-serif' }}
                                >
                                  {p.price} ₸
                                </span>
                                <div className="flex items-center gap-4">
                                  <div className="flex items-center gap-3 bg-[#F8F8F8] rounded-full px-4 py-2">
                                    <button
                                      onClick={() => changeQty(p.id, -1)}
                                      className="text-[#2B865A] hover:text-[#24704A] transition-colors"
                                    >
                                      <Minus width={16} height={16} />
                                    </button>
                                    <span className="font-medium" style={{ fontFamily: 'Manrope, sans-serif' }}>
                                      {p.quantity} шт
                                    </span>
                                    <button
                                      onClick={() => changeQty(p.id, 1)}
                                      className="text-[#2B865A] hover:text-[#24704A] transition-colors"
                                    >
                                      <Plus width={16} height={16} />
                                    </button>
                                  </div>
                                  <button
                                    onClick={() => removeItem(p.id)}
                                    className="p-2 rounded-lg bg-[#FFF0F0] hover:bg-[#FFE8E6] transition-colors"
                                  >
                                    <Trash className="text-[#FE5F55]" width={18} height={18} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {needRx.length > 0 && (
                    <div>
                      <h2
                        className="text-xl font-bold mb-4"
                        style={{
                          fontFamily: 'Manrope, sans-serif',
                          color: '#222021',
                        }}
                      >
                        Требуют подтверждения рецепта
                      </h2>
                      <div className="space-y-4">
                        {needRx.map((p) => (
                          <div
                            key={p.id}
                            className="p-4 rounded-xl border border-[#FFE8E6] bg-[#FFF5F4] hover:shadow-lg transition-all duration-300"
                          >
                            <div className="flex items-center gap-4 mb-4">
                              <img
                                src={p.image}
                                alt={p.title}
                                className="w-20 h-20 rounded-xl object-cover"
                              />
                              <div className="flex-1">
                                <h3
                                  className="font-semibold mb-1"
                                  style={{
                                    fontFamily: 'Manrope, sans-serif',
                                    color: '#222021',
                                  }}
                                >
                                  {p.title}
                                </h3>
                                <p
                                  className="text-sm text-[#8A8A8A] mb-2"
                                  style={{ fontFamily: 'Manrope, sans-serif' }}
                                >
                                  {p.subtitle}
                                </p>
                                <div className="flex items-center justify-between">
                                  <span
                                    className="text-lg font-bold text-[#2B865A]"
                                    style={{ fontFamily: 'Manrope, sans-serif' }}
                                  >
                                    {p.price} ₸
                                  </span>
                                  <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-3 bg-white rounded-full px-4 py-2">
                                      <button
                                        onClick={() => changeQty(p.id, -1)}
                                        className="text-[#2B865A] hover:text-[#24704A] transition-colors"
                                      >
                                        <Minus width={16} height={16} />
                                      </button>
                                      <span className="font-medium" style={{ fontFamily: 'Manrope, sans-serif' }}>
                                        {p.quantity} шт
                                      </span>
                                      <button
                                        onClick={() => changeQty(p.id, 1)}
                                        className="text-[#2B865A] hover:text-[#24704A] transition-colors"
                                      >
                                        <Plus width={16} height={16} />
                                      </button>
                                    </div>
                                    <button
                                      onClick={() => removeItem(p.id)}
                                      className="p-2 rounded-lg bg-white hover:bg-gray-50 transition-colors"
                                    >
                                      <Trash className="text-[#FE5F55]" width={18} height={18} />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-lg bg-[#FFE8E6]">
                              <div className="flex items-center gap-2">
                                <span
                                  className="text-sm"
                                  style={{
                                    fontFamily: 'Manrope, sans-serif',
                                    color: '#FE5F55',
                                  }}
                                >
                                  Требуется рецепт от врача
                                </span>
                              </div>
                              <button
                                className="px-4 py-2 rounded-full bg-[#FE5F55] text-white font-semibold hover:bg-[#E54C42] transition-colors"
                                style={{ fontFamily: 'Manrope, sans-serif', fontSize: '14px' }}
                              >
                                Подтвердить
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {!isEmpty && (
                    <div className="sticky bottom-0 pt-8 border-t border-gray-200 bg-white/90 backdrop-blur-sm">
                      <button
                        onClick={() => navigate('/checkout')}
                        className="w-full py-4 rounded-xl bg-[#2B865A] text-white font-bold hover:bg-[#24704A] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-4"
                        style={{ 
                          fontFamily: 'Manrope, sans-serif', 
                          fontSize: '18px'
                        }}
                      >
                        <span>Перейти к оформлению</span>
                        <span className="text-xl">• {total.toFixed(0)} ₸</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
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
              const isActive = tab.path === '/cart';
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
        <div className="w-[390px] h-[750px] overflow-y-hidden relative overflow-hidden shadow-xl"  
          style={{
            background: 'linear-gradient(191.14deg, #FCF8F5 6.45%, #E0EFBD 94.12%)',
          }}>
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
                Корзина
              </h1>
            </div>

            {isEmpty ? (
              <div className="px-6 pt-10 flex flex-col items-center text-center">
                <img
                  src="/assets/images/empty-basket.png"
                  alt="Пустая корзина"
                  style={{ width: '260px', height: '260px', objectFit: 'contain' }}
                />
                <h2
                  style={{
                    marginTop: '16px',
                    fontFamily: 'Manrope, sans-serif',
                    fontWeight: 600,
                    fontSize: '20px',
                    color: '#222021',
                  }}
                >
                  В корзине пока пусто
                </h2>
                <p
                  style={{
                    marginTop: '8px',
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: '14px',
                    color: '#7A7A7A',
                  }}
                >
                  Вы пока что не добавили ничего в корзину. Перейдите в каталог, чтобы найти товары.
                </p>
                <button
                  onClick={() => navigate('/main-page')}
                  style={{
                    marginTop: '24px',
                    width: '100%',
                    height: '44px',
                    borderRadius: '22px',
                    backgroundColor: '#2B865A',
                    color: '#FFFFFF',
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: '16px',
                    fontWeight: 600,
                  }}
                >
                  В каталог →
                </button>
              </div>
            ) : (
              <div className="px-4 pt-12 pb-4">
                <h2
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontWeight: 700,
                    fontSize: '18px',
                    color: '#222021',
                    marginBottom: '8px',
                  }}
                >
                  Доступны к заказу
                </h2>

                {available.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      borderRadius: '16px',
                      backgroundColor: '#FFFDF9',
                      boxShadow: '0px 4px 12px rgba(0,0,0,0.04)',
                      padding: '12px',
                      marginBottom: '10px',
                    }}
                  >
                    <div className="flex gap-3">
                      <img
                        src={p.image}
                        alt={p.title}
                        style={{
                          width: '64px',
                          height: '64px',
                          borderRadius: '8px',
                          objectFit: 'cover',
                        }}
                      />
                      <div className="flex-1">
                        <p
                          style={{
                            fontFamily: 'Manrope, sans-serif',
                            fontSize: '14px',
                            fontWeight: 600,
                            color: '#222021',
                            marginBottom: '4px',
                          }}
                        >
                          {p.title}
                        </p>
                        <p
                          style={{
                            fontFamily: 'Manrope, sans-serif',
                            fontSize: '12px',
                            color: '#8A8A8A',
                            marginBottom: '8px',
                          }}
                        >
                          {p.subtitle}
                        </p>
                        <div className="flex items-center justify-between">
                          <span
                            style={{
                              fontFamily: 'Manrope, sans-serif',
                              fontSize: '16px',
                              fontWeight: 700,
                              color: '#2B865A',
                            }}
                          >
                            {p.price} ₸
                          </span>
                          <div className="flex items-center gap-2">
                            <div
                              className="flex items-center gap-3"
                              style={{
                                borderRadius: '999px',
                                border: '1px solid #E0E0E0',
                                padding: '4px 10px',
                              }}
                            >
                              <button onClick={() => changeQty(p.id, -1)}>-</button>
                              <span>{p.quantity} шт</span>
                              <button onClick={() => changeQty(p.id, 1)}>+</button>
                            </div>
                            <button
                              onClick={() => removeItem(p.id)}
                              aria-label="Удалить товар"
                              className="p-2 rounded-full bg-white"
                              style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.08)' }}
                            >
                              <Trash
                                width={16}
                                height={16}
                                style={{ color: '#FE5F55' }}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {!p.prescriptionRequired && (
                      <div
                        style={{
                          marginTop: '8px',
                          display: 'inline-block',
                          padding: '4px 10px',
                          borderRadius: '999px',
                          backgroundColor: '#E7F5EC',
                          fontFamily: 'Manrope, sans-serif',
                          fontSize: '11px',
                          color: '#2B865A',
                        }}
                      >
                        Рецепт подтвержден
                      </div>
                    )}
                  </div>
                ))}
                {needRx.length > 0 && (
                  <>
                    <h2
                      style={{
                        fontFamily: 'Manrope, sans-serif',
                        fontWeight: 700,
                        fontSize: '18px',
                        color: '#222021',
                        marginTop: '16px',
                        marginBottom: '8px',
                      }}
                    >
                      Требуется рецепт
                    </h2>

                    {needRx.map((p) => (
                      <div
                        key={p.id}
                        style={{
                          borderRadius: '16px',
                          backgroundColor: '#FFF5F4',
                          boxShadow: '0px 4px 12px rgba(0,0,0,0.04)',
                          padding: '12px',
                          marginBottom: '10px',
                        }}
                      >
                        <div className="flex gap-3">
                          <img
                            src={p.image}
                            alt={p.title}
                            style={{
                              width: '64px',
                              height: '64px',
                              borderRadius: '8px',
                              objectFit: 'cover',
                            }}
                          />
                          <div className="flex-1">
                            <p
                              style={{
                                fontFamily: 'Manrope, sans-serif',
                                fontSize: '14px',
                                fontWeight: 600,
                                color: '#222021',
                                marginBottom: '4px',
                              }}
                            >
                              {p.title}
                            </p>
                            <p
                              style={{
                                fontFamily: 'Manrope, sans-serif',
                                fontSize: '12px',
                                color: '#8A8A8A',
                                marginBottom: '8px',
                              }}
                            >
                              {p.subtitle}
                            </p>
                            <div className="flex items-center justify-between">
                              <span
                                style={{
                                  fontFamily: 'Manrope, sans-serif',
                                  fontSize: '16px',
                                  fontWeight: 700,
                                  color: '#2B865A',
                                }}
                              >
                                {p.price} ₸
                              </span>
                              <div className="flex items-center gap-2">
                                <div
                                  className="flex items-center gap-3"
                                  style={{
                                    borderRadius: '999px',
                                    border: '1px solid #E0E0E0',
                                    padding: '4px 10px',
                                  }}
                                >
                                  <button onClick={() => changeQty(p.id, -1)}>-</button>
                                  <span>{p.quantity} шт</span>
                                  <button onClick={() => changeQty(p.id, 1)}>+</button>
                                </div>

                                <button
                                  onClick={() => removeItem(p.id)}
                                  aria-label="Удалить товар"
                                  className="p-2 rounded-full bg-white"
                                  style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.08)' }}
                                >
                                  <Trash
                                    width={16}
                                    height={16}
                                    style={{ color: '#FE5F55' }}
                                  />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          style={{
                            marginTop: '8px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '8px 10px',
                            borderRadius: '12px',
                            backgroundColor: '#FFE8E6',
                          }}
                        >
                          <span
                            style={{
                              fontFamily: 'Manrope, sans-serif',
                              fontSize: '12px',
                              color: '#FE5F55',
                            }}
                          >
                            Необходимо подтвердить наличие рецепта от врача
                          </span>
                          <button
                            type="button"
                            style={{
                              padding: '6px 10px',
                              borderRadius: '999px',
                              backgroundColor: '#FE5F55',
                              color: '#FFFFFF',
                              fontFamily: 'Manrope, sans-serif',
                              fontSize: '12px',
                              fontWeight: 600,
                            }}
                          >
                            Подтвердить
                          </button>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>

          {!isEmpty && (
            <div
              style={{
                position: 'absolute',
                left: 12,
                right: 12,
                bottom: 90,
                height: '52px',
                borderRadius: '999px',
                backgroundColor: '#2B865A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 18px',
                color: '#FFFFFF',
                fontFamily: 'Manrope, sans-serif',
              }}
            >
              <span style={{ fontSize: '14px' }}>{items.length} товара</span>
              <button
                onClick={() => navigate('/checkout')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: '14px',
                  fontWeight: 600,
                }}
              >
                Оформить заказ
                <span>{total.toFixed(0)} ₸</span>
              </button>
            </div>
          )}

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
              { label: 'Корзина', icon: Cart, path: '/cart', active: true },
              { label: 'Личный\nкабинет', icon: User, path: '/profile', active: false },
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