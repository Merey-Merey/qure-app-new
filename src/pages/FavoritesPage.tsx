// src/pages/FavoritesPage.tsx - КОМПАКТНЫЙ ДИЗАЙН
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Cart, Heart, Home, User, Search, ArrowLeft, Trash } from 'iconoir-react';
import type { Product } from '../mocks/products';
import ProductCard from '../components/ProductCard';

export default function FavoritesPage() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadData = () => {
      try {
        const favoritesData = localStorage.getItem('favorites');
        const cartData = localStorage.getItem('cart');
        if (favoritesData) setFavorites(JSON.parse(favoritesData));
        if (cartData) {
          const cart = JSON.parse(cartData);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setCartCount(cart.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0));
        }
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      }
    };

    loadData();
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  const filteredFavorites = favorites.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.subtitle?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const removeFromFavorites = (productId: string | number) => {
    const updated = favorites.filter(p => p.id !== productId);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  const isEmpty = filteredFavorites.length === 0;

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="hidden lg:flex w-full min-h-screen">
        {/* ✅ ЛЕВАЯ ПАНЕЛЬ - КОМПАКТНАЯ */}
        <div className="w-1/3 h-full flex flex-col items-center p-6 xl:p-8 bg-gradient-to-b from-[#FCF8F5] to-[#E0EFBD]/30">
          <div className="max-w-md mx-auto w-full">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 mb-6 text-[#2B865A] hover:text-[#24704A] transition-colors group text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>
              <ArrowLeft className="transform group-hover:-translate-x-1 transition-transform" width={16} height={16} />
              Назад
            </button>

            {/* ✅ СТАТИСТИКА ИЗБРАННОГО */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 shadow-sm mb-6">
              <h2 className="text-base font-bold mb-3" style={{ fontFamily: 'Manrope, sans-serif', color: '#222021' }}>
                Ваши избранные товары
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span style={{ fontFamily: 'Manrope, sans-serif', color: '#635436', fontSize: '13px' }}>Всего товаров</span>
                  <span className="text-base font-bold text-[#2B865A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    {favorites.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ fontFamily: 'Manrope, sans-serif', color: '#635436', fontSize: '13px' }}>В наличии</span>
                  <span className="font-semibold" style={{ fontFamily: 'Manrope, sans-serif', color: '#222021', fontSize: '14px' }}>
                    {favorites.filter(p => p.inStock).length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ fontFamily: 'Manrope, sans-serif', color: '#635436', fontSize: '13px' }}>Сумма</span>
                  <span className="font-semibold" style={{ fontFamily: 'Manrope, sans-serif', color: '#222021', fontSize: '14px' }}>
                    {favorites.reduce((sum, p) => sum + p.price, 0).toFixed(0)} ₸
                  </span>
                </div>
              </div>
            </div>

            {/* ✅ ПОИСК + ФИЛЬТРЫ */}
            <div className="mb-5">
              <label className="block text-xs font-semibold mb-1.5" style={{ fontFamily: 'Manrope, sans-serif', color: '#222021' }}>
                Поиск в избранном
              </label>
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-[#989C99]" width={16} height={16} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Найти товар по названию..."
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-200 bg-white/80 focus:border-[#2B865A] focus:ring-1 focus:ring-[#2B865A]/20 outline-none transition-all duration-300 text-sm"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                />
              </div>
            </div>

            {/* ✅ КНОПКА КОРЗИНЫ СО СЧЕТЧИКОМ */}
            <button 
              onClick={() => navigate('/cart')}
              className="w-full mb-5 py-2.5 px-3 rounded-lg bg-[#2B865A] text-white font-semibold hover:bg-[#24704A] transition-all flex items-center justify-center gap-1.5 relative text-sm"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              <Cart width={16} height={16} />
              Корзина ({cartCount})
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>

            <div className="flex items-center gap-2.5">
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

        {/* ✅ ПРАВАЯ ПАНЕЛЬ - КОМПАКТНАЯ */}
        <div className="w-2/3 h-full flex flex-col p-6 xl:p-8">
          <div className="max-w-6xl mx-auto w-full">
            <div className="w-full rounded-xl bg-white/90 backdrop-blur-sm shadow-lg border border-white/20 p-6 xl:p-8 min-h-[550px]">
              {isEmpty ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <img
                    src="/assets/images/favorite-item.png"
                    alt="Пустое избранное"
                    className="w-48 h-48 object-contain"
                    onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/192x192?text=Favorites+Empty')}
                  />
                  <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'Manrope, sans-serif', color: '#222021' }}>
                    В избранном пока пусто
                  </h2>
                  <p className="text-sm text-[#4D7059] mb-6 max-w-md" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Сохраняйте понравившиеся товары, чтобы не потерять их и быстро найти позже.
                  </p>
                  <button onClick={() => navigate('/main-page')} className="px-5 py-2 rounded-lg bg-[#2B865A] text-white font-semibold hover:bg-[#24704A] transition-all text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Перейти в каталог
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h1 className="text-xl xl:text-2xl font-bold" style={{ fontFamily: 'Manrope, sans-serif', color: '#222021' }}>
                        Избранные товары
                      </h1>
                      <p className="text-[#4D7059] mt-1 text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        {filteredFavorites.length} товаров
                      </p>
                    </div>
                  </div>

                  {searchQuery && (
                    <div className="mb-4 p-3 rounded-lg bg-[#FCF8F5] text-sm">
                      <p style={{ fontFamily: 'Manrope, sans-serif' }}>
                        "{searchQuery}": {filteredFavorites.length} товаров
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredFavorites.map((product) => (
                      <div key={product.id} className="group bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5">
                        <img src={product.image} alt={product.title} className="w-full h-40 rounded-lg object-cover mb-3 group-hover:scale-105 transition-transform" />
                        <h3 className="font-bold text-base mb-1.5 line-clamp-2" style={{ fontFamily: 'Manrope, sans-serif' }}>{product.title}</h3>
                        <p className="text-xs text-[#767B78] mb-3 line-clamp-1" style={{ fontFamily: 'Manrope, sans-serif' }}>{product.subtitle}</p>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xl font-bold text-[#2B865A]" style={{ fontFamily: 'Manrope, sans-serif' }}>{product.price} ₸</span>
                          <button
                            onClick={() => removeFromFavorites(product.id)}
                            className="p-1.5 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-all"
                          >
                            <Trash width={16} height={16} />
                          </button>
                        </div>
                        <button onClick={() => navigate(`/product/${product.id}`)} className="w-full py-2.5 bg-[#2B865A] text-white rounded-lg font-semibold hover:bg-[#24704A] transition-all text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>
                          Подробнее
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ✅ НИЖНЯЯ НАВИГАЦИЯ СО СЧЕТЧИКАМИ - КОМПАКТНАЯ */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg px-5 py-3">
          <div className="flex items-center gap-6">
            {[
              { label: 'Главная', icon: Home, path: '/main-page', count: 0 },
              { label: 'Избранное', icon: Heart, path: '/favorites', count: favorites.length, active: true },
              { label: 'Корзина', icon: Cart, path: '/cart', count: cartCount },
              { label: 'Профиль', icon: User, path: '/profile', count: 0 },
            ].map(({ icon: Icon, path, label, count, active }) => (
              <button key={path} onClick={() => navigate(path)} className={`flex flex-col items-center gap-0.5 transition-all ${active ? 'scale-105' : 'hover:scale-102'}`}>
                <div className={`p-2 rounded-full relative ${active ? 'bg-[#2B865A]/10' : ''}`}>
                  <Icon width={18} height={18} className={active ? 'text-[#2B865A]' : 'text-[#669B78]'} />
                  {count > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#FE5F55] text-white text-[10px] rounded-full w-3.5 h-3.5 flex items-center justify-center">
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
      <div className="lg:hidden flex min-h-screen w-full items-center justify-center bg-background">
        <div
          className="w-[390px] h-[750px] overflow-y-hidden relative overflow-hidden shadow-xl"
          style={{
            background: 'linear-gradient(191.14deg, #FCF8F5 6.45%, #E0EFBD 94.12%)',
          }}
        >
          <div className="h-full overflow-y-auto pb-[80px]">
            <div
              style={{
                backgroundColor: '#2B865A',
                paddingTop: '40px',
                paddingBottom: '16px',
                paddingLeft: '16px',
                paddingRight: '16px',
              }}
            >
              <h1
                className="text-center mb-3"
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#FFFFFF',
                }}
              >
                Избранные товары
              </h1>

              <div
                className="flex items-center gap-2 px-3"
                style={{
                  height: '34px',
                  borderRadius: '10px',
                  backgroundColor: '#F7F2EB',
                }}
              >
                <Search width={14} height={14} style={{ color: '#989C99' }} />
                <input
                  type="text"
                  placeholder="Искать товар"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent outline-none placeholder:text-[#B4B7B5]"
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: '13px',
                    color: '#222021',
                  }}
                />
              </div>
            </div>

            {isEmpty ? (
              <div className="flex flex-col items-center px-6 pt-16 text-center">
                <img
                  src="/assets/images/favorite-item.png"
                  alt="Пустое избранное"
                  className="mb-8 max-w-[180px]"
                />
                <h2
                  className="mb-4 text-center text-[24px] font-semibold leading-[110%]"
                  style={{ fontFamily: 'Manrope, sans-serif', color: '#222021' }}
                >
                  В избранном пока пусто
                </h2>
                <p
                  className="mb-8 text-center text-sm leading-[130%] text-[#4D7059]"
                  style={{ fontFamily: 'Manrope, sans-serif', width: '320px' }}
                >
                  Вы пока что не добавили ничего в избранное. Перейдите в каталог, чтобы найти товары.
                </p>
                <button
                  onClick={() => navigate('/main-page')}
                  className="mb-3 w-full max-w-[150px] rounded-[16px] bg-[#2B865A] px-5 py-2.5 text-white font-normal text-sm"
                  style={{
                    color: '#FCF6E6',
                    fontFamily: 'Manrope, sans-serif',
                    lineHeight: '130%',
                    boxShadow: '0px -1px 12px 0px #14652F33',
                  }}
                >
                  В каталог →
                </button>
              </div>
            ) : (
              <div className="px-3 pt-3 pb-5">
                <div className="flex items-center justify-between mb-3">
                  <button
                    type="button"
                    className="px-2.5 py-1.5 rounded-[14px] bg-[#F4EDE6] hover:bg-[#E9DECD] transition-colors text-xs"
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      color: '#222021',
                    }}
                  >
                    Фильтры
                  </button>
                  <button
                    type="button"
                    className="px-2.5 py-1.5 rounded-[14px] bg-[#F4EDE6] hover:bg-[#E9DECD] transition-colors text-xs"
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      color: '#222021',
                    }}
                  >
                    Сортировка
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {filteredFavorites.map((product: Product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div
            className="absolute left-0 right-0 bottom-0 flex items-center justify-around"
            style={{
              marginLeft: '10px',
              width: '366px',
              bottom: '8px',
              height: '68px',
              padding: '8px 12px 16px',
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: '20px',
              borderTopRightRadius: '20px',
              boxShadow: '0px -3px 12px rgba(0,0,0,0.06)',
            }}
          >
            {[
              { label: 'Главная\nстраница', icon: Home, path: '/main-page', active: false },
              { label: 'Избранное', icon: Heart, path: '/favorites', active: true },
              { label: 'Корзина', icon: Cart, path: '/cart', active: false },
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
                    gap: '3px',
                    whiteSpace: 'pre-line',
                  }}
                >
                  <div
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: '999px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: tab.active ? '#2B865A' : 'transparent',
                    }}
                  >
                    <IconComponent
                      width={16}
                      height={16}
                      style={{
                        color: tab.active ? '#FFFFFF' : '#669B78',
                      }}
                    />
                  </div>
                  <span
                    style={{
                      lineHeight: '1.1',
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: '9px',
                      fontWeight: tab.active ? 700 : 500,
                      color: tab.active ? '#2B865A' : '#669B78',
                      textAlign: 'center',
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