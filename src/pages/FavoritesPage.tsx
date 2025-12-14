// src/pages/FavoritesPage.tsx
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Cart, Heart, Home, User, Search, ArrowLeft, Filter, Sort } from 'iconoir-react';
import { useFavorites } from '../store/favorites'; 
import ProductCard from '../components/ProductCard';
import type { Product } from '../mocks/products';
import { useProfileStore } from '../store/profile';

export default function FavoritesPage() {
  const navigate = useNavigate();
  const { favorites } = useFavorites(); 
  const setFavoritesCount = useProfileStore((s) => s.setFavoritesCount);
  const [, setIsDesktop] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    setFavoritesCount(favorites.length);
  }, [favorites.length, setFavoritesCount]);

  const isEmpty = favorites.length === 0;
  const filteredFavorites = favorites.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.subtitle?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="hidden lg:flex w-full min-h-screen">
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

            <div className="mb-12">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-8">
                <h2
                  className="text-lg font-bold mb-4"
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    color: '#222021',
                  }}
                >
                  Ваши избранные товары
                </h2>
                
                <div className="space-y-4 text-base">
                  <div className="flex items-center justify-between">
                    <span
                      style={{
                        fontFamily: 'Manrope, sans-serif',
                        color: '#635436',
                      }}
                    >
                      Всего товаров
                    </span>
                    <span
                      className="text-lg font-bold text-[#2B865A]"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      {favorites.length}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span
                      style={{
                        fontFamily: 'Manrope, sans-serif',
                        color: '#635436',
                      }}
                    >
                      Товаров сейчас в наличии
                    </span>
                    <span
                      className="font-semibold"
                      style={{
                        fontFamily: 'Manrope, sans-serif',
                        color: '#222021',
                      }}
                    >
                      {favorites.filter(p => p.inStock).length}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span
                      style={{
                        fontFamily: 'Manrope, sans-serif',
                        color: '#635436',
                      }}
                    >
                      Суммарная стоимость
                    </span>
                    <span
                      className="font-semibold"
                      style={{
                        fontFamily: 'Manrope, sans-serif',
                        color: '#222021',
                      }}
                    >
                      {favorites.reduce((sum, p) => sum + p.price, 0).toFixed(0)} ₸
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    color: '#222021',
                  }}
                >
                  Поиск в избранном
                </label>
                <div className="relative">
                  <Search 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#989C99]" 
                    width={18} 
                    height={18} 
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Найти товар по названию..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white/80 focus:border-[#2B865A] focus:ring-2 focus:ring-[#2B865A]/20 outline-none transition-all duration-300"
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: '14px',
                    }}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3
                  className="font-semibold text-sm"
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    color: '#222021',
                  }}
                >
                  Фильтры
                </h3>
                
                <div className="space-y-2 text-sm">
                  <button className="flex items-center gap-3 w-full p-3 rounded-xl bg-white/80 hover:bg-white hover:shadow-lg transition-all duration-300">
                    <div className="w-6 h-6 rounded-md border border-gray-300"></div>
                    <span style={{ fontFamily: 'Manrope, sans-serif' }}>Только в наличии</span>
                  </button>
                  
                  <button className="flex items-center gap-3 w-full p-3 rounded-xl bg-white/80 hover:bg-white hover:shadow-lg transition-all duration-300">
                    <div className="w-6 h-6 rounded-md border border-gray-300"></div>
                    <span style={{ fontFamily: 'Manrope, sans-serif' }}>Требуют рецепта</span>
                  </button>
                  
                  <button className="flex items-center gap-3 w-full p-3 rounded-xl bg-white/80 hover:bg-white hover:shadow-lg transition-all duration-300">
                    <div className="w-6 h-6 rounded-md border border-gray-300"></div>
                    <span style={{ fontFamily: 'Manrope, sans-serif' }}>С акцией</span>
                  </button>
                </div>
              </div>

              <div className="mt-6">
                <h3
                  className="font-semibold text-sm mb-3"
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    color: '#222021',
                  }}
                >
                  Сортировка
                </h3>
                
                <div className="space-y-2 text-sm">
                  {[
                    { label: 'По цене (возрастание)', value: 'price-asc' },
                    { label: 'По цене (убывание)', value: 'price-desc' },
                    { label: 'По алфавиту', value: 'alphabetical' },
                    { label: 'По дате добавления', value: 'date' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      className="w-full p-3 rounded-xl bg-white/80 hover:bg-white hover:shadow-lg transition-all duration-300 text-left"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      {option.label}
                    </button>
                  ))}
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

        <div className="w-2/3 h-full flex flex-col p-8 xl:p-12">
          <div className="max-w-6xl mx-auto w-full">
            <div className="w-full rounded-2xl bg-white/90 backdrop-blur-sm shadow-xl border border-white/20 p-8 xl:p-10 min-h-[600px]">
              {isEmpty ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="mb-8">
                    <img
                      src="/assets/images/favorite-item.png"
                      alt="Пустое избранное"
                      className="w-64 h-64 object-contain"
                      onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/256x256?text=Favorites+Empty')}
                    />
                  </div>
                  
                  <h2
                    className="text-2xl xl:text-2xl font-bold mb-4"
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      color: '#222021',
                    }}
                  >
                    В избранном пока пусто
                  </h2>
                  
                  <p
                    className="text-base text-[#4D7059] mb-8 max-w-md"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    Сохраняйте понравившиеся товары, чтобы не потерять их и быстро найти позже.
                  </p>

                  <div className="flex gap-4">
                    <button
                      onClick={() => navigate('/main-page')}
                      className="px-6 py-2 rounded-xl bg-[#2B865A] text-white font-semibold hover:bg-[#24704A] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                      style={{ 
                        fontFamily: 'Manrope, sans-serif', 
                        fontSize: '12px'
                      }}
                    >
                      Перейти в каталог
                    </button>
                    
                    <button
                      onClick={() => navigate('/cart')}
                      className="px-6 py-2 rounded-xl border-2 border-[#2B865A] text-[#2B865A] font-semibold hover:bg-[#2B865A] hover:text-white transition-all duration-300 active:scale-[0.98]"
                      style={{ 
                        fontFamily: 'Manrope, sans-serif', 
                        fontSize: '12px'
                      }}
                    >
                      Перейти в корзину
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h1
                        className="text-2xl xl:text-3xl font-bold"
                        style={{
                          fontFamily: 'Manrope, sans-serif',
                          color: '#222021',
                        }}
                      >
                        Избранные товары
                      </h1>
                      <p
                        className="text-[#4D7059] mt-1"
                        style={{ fontFamily: 'Manrope, sans-serif' }}
                      >
                        {filteredFavorites.length} товаров в избранном
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white border border-gray-200 hover:border-[#2B865A] hover:shadow-lg transition-all duration-300">
                        <Filter className="text-[#2B865A]" width={18} height={18} />
                        <span style={{ fontFamily: 'Manrope, sans-serif' }}>Фильтры</span>
                      </button>
                      
                      <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white border border-gray-200 hover:border-[#2B865A] hover:shadow-lg transition-all duration-300">
                        <Sort className="text-[#2B865A]" width={18} height={18} />
                        <span style={{ fontFamily: 'Manrope, sans-serif' }}>Сортировка</span>
                      </button>
                    </div>
                  </div>

                  {searchQuery && (
                    <div className="mb-6 p-4 rounded-xl bg-[#FCF8F5]">
                      <p style={{ fontFamily: 'Manrope, sans-serif' }}>
                        Результаты поиска по запросу "<span className="font-semibold">{searchQuery}</span>": {filteredFavorites.length} товаров
                      </p>
                    </div>
                  )}

                  {filteredFavorites.length === 0 ? (
                    <div className="text-center py-12">
                      <p
                        className="text-lg text-[#4D7059]"
                        style={{ fontFamily: 'Manrope, sans-serif' }}
                      >
                        По вашему запросу ничего не найдено
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredFavorites.map((product: Product) => (
                        <div key={product.id} className="transform hover:-translate-y-1 transition-transform duration-300">
                          <ProductCard product={product} />
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <div className="flex gap-4">
                      <button
                        onClick={() => navigate('/cart')}
                        className="flex-1 py-4 rounded-xl bg-[#2B865A] text-white font-semibold hover:bg-[#24704A] transition-all duration-300 shadow-lg hover:shadow-xl"
                        style={{ fontFamily: 'Manrope, sans-serif' }}
                      >
                        Перейти в корзину
                      </button>
                      
                      <button
                        onClick={() => navigate('/main-page')}
                        className="flex-1 py-4 rounded-xl border-2 border-[#2B865A] text-[#2B865A] font-semibold hover:bg-[#2B865A] hover:text-white transition-all duration-300"
                        style={{ fontFamily: 'Manrope, sans-serif' }}
                      >
                        Продолжить покупки
                      </button>
                    </div>
                  </div>
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
              const isActive = tab.path === '/favorites';
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
        <div
          className="w-[390px] h-[750px] overflow-y-hidden relative overflow-hidden shadow-xl"
          style={{
            background: 'linear-gradient(191.14deg, #FCF8F5 6.45%, #E0EFBD 94.12%)',
          }}
        >
          <div className="h-full overflow-y-auto pb-[92px]">
            <div
              style={{
                backgroundColor: '#2B865A',
                paddingTop: '46px',
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
                  height: '37px',
                  borderRadius: '10px',
                  backgroundColor: '#F7F2EB',
                }}
              >
                <Search width={16} height={16} style={{ color: '#989C99' }} />
                <input
                  type="text"
                  placeholder="Искать товар"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent outline-none placeholder:text-[#B4B7B5]"
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: '14px',
                    color: '#222021',
                  }}
                />
              </div>
            </div>

            {isEmpty ? (
              <div className="flex flex-col items-center px-6 pt-20 text-center">
                <img
                  src="/assets/images/favorite-item.png"
                  alt="Пустое избранное"
                  className="mb-10 max-w-[220px]"
                />
                <h2
                  className="mb-5 text-center text-[28px] font-semibold leading-[110%]"
                  style={{ fontFamily: 'Manrope, sans-serif', color: '#222021' }}
                >
                  В избранном пока пусто
                </h2>
                <p
                  className="mb-11 text-center text-base leading-[130%] text-[#4D7059]"
                  style={{ fontFamily: 'Manrope, sans-serif', width: '358px' }}
                >
                  Вы пока что не добавили ничего в избранное. Перейдите в каталог,
                  чтобы найти товары.
                </p>
                <button
                  onClick={() => navigate('/main-page')}
                  className="mb-3 w-full max-w-[170px] rounded-[18px] bg-[#2B865A] px-6 py-3 text-white font-normal"
                  style={{
                    color: '#FCF6E6',
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: '16px',
                    lineHeight: '130%',
                    boxShadow: '0px -2px 15.6px 0px #14652F33',
                  }}
                >
                  В каталог →
                </button>
              </div>
            ) : (
              <div className="px-4 pt-4 pb-6">
                <div className="flex items-center justify-between mb-4">
                  <button
                    type="button"
                    className="px-3 py-2 rounded-[16px] bg-[#F4EDE6] hover:bg-[#E9DECD] transition-colors"
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: '13px',
                      color: '#222021',
                    }}
                  >
                    Фильтры
                  </button>
                  <button
                    type="button"
                    className="px-3 py-2 rounded-[16px] bg-[#F4EDE6] hover:bg-[#E9DECD] transition-colors"
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: '13px',
                      color: '#222021',
                    }}
                  >
                    Сортировка
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
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
                    gap: '4px',
                    whiteSpace: 'pre-line',
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: '999px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: tab.active ? '#2B865A' : 'transparent',
                    }}
                  >
                    <IconComponent
                      width={18}
                      height={18}
                      style={{
                        color: tab.active ? '#FFFFFF' : '#669B78',
                      }}
                    />
                  </div>
                  <span
                    style={{
                      lineHeight: '1.2',
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: '10px',
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