import { useNavigate } from 'react-router-dom';
import { Cart, Heart, Home, Search, User, ArrowLeft, Menu } from 'iconoir-react';
import { useState, useEffect } from 'react';
import { API_URLS } from '../services/api';

interface Category {
  id: number;
  slug: string;
  title: string;
  image: string;
  description?: string;
  productsCount?: number;
  subcategories?: Array<{
    id: number;
    title: string;
    slug: string;
  }>;
}

export default function AllCategoriesPage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch(API_URLS.categories)
      .then(res => res.json())
      .then(data => {
        setCategories(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Categories fetch error:', err);
        setLoading(false);
      });
  }, []);

  const filteredCategories = categories.filter(cat =>
    cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (cat.description && cat.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) return <div className="flex items-center justify-center min-h-screen text-sm">Загрузка...</div>;

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="hidden lg:flex w-full min-h-screen">
        <div className="w-1/3 h-full flex flex-col items-center p-6 xl:p-8 bg-gradient-to-b from-[#FCF8F5] to-[#E0EFBD]/30">
          <div className="max-w-sm mx-auto w-full">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 mb-6 text-[#2B865A] hover:text-[#24704A] transition-colors group text-sm"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              <ArrowLeft className="transform group-hover:-translate-x-1 transition-transform" width={16} height={16} />
              Назад
            </button>

            <div className="mb-8">
              <div className="mb-6">
                <h2
                  className="text-lg font-bold mb-3"
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    color: '#222021',
                  }}
                >
                  Категории товаров
                </h2>

                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#989C99]"
                    width={16}
                    height={16}
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Найти категорию..."
                    className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-200 bg-white/80 focus:border-[#2B865A] focus:ring-2 focus:ring-[#2B865A]/20 outline-none transition-all duration-300 text-sm"
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                    }}
                  />
                </div>

                {searchQuery && (
                  <div className="mt-2 p-2 rounded-lg bg-[#FCF8F5]">
                    <p className="text-xs" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      Найдено категорий: <span className="font-semibold">{filteredCategories.length}</span>
                    </p>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <h3
                  className="font-semibold text-base mb-3"
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    color: '#222021',
                  }}
                >
                  Популярные категории
                </h3>

                <div className="space-y-2">
                  {categories.slice(0, 5).map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => navigate(`/categories/${cat.slug}`)}
                      className="flex items-center gap-3 w-full p-2.5 rounded-lg bg-white/80 hover:bg-white hover:shadow-md transition-all duration-300 text-left group"
                    >
                      <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={cat.image}
                          alt={cat.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4
                          className="font-medium text-sm truncate"
                          style={{ fontFamily: 'Manrope, sans-serif' }}
                        >
                          {cat.title}
                        </h4>
                        <p
                          className="text-xs text-[#4D7059]"
                          style={{ fontFamily: 'Manrope, sans-serif' }}
                        >
                          {cat.productsCount || 0} товаров
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md">
                <h3
                  className="font-semibold text-base mb-3"
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    color: '#222021',
                  }}
                >
                  Всего категорий
                </h3>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>Основные категории</span>
                    <span className="font-semibold text-sm text-[#2B865A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      {categories.length}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>Подкатегории</span>
                    <span className="font-semibold text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      {categories.reduce((sum, cat) => sum + (cat.subcategories?.length || 0), 0)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/50 flex items-center justify-center shadow">
                <span
                  className="text-[#2B865A] font-bold text-base"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  Q
                </span>
              </div>
              <div>
                <h2
                  className="text-base font-bold text-[#2B865A]"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  Qure
                </h2>
                <p className="text-xs text-[#4D7059]">Health Assistant</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-2/3 h-full flex flex-col p-6 xl:p-8">
          <div className="max-w-4xl mx-auto w-full">
            <div className="w-full rounded-xl bg-white/90 backdrop-blur-sm shadow-lg border border-white/20 p-6 min-h-[500px]">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1
                    className="text-xl lg:text-2xl font-bold"
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      color: '#222021',
                    }}
                  >
                    Все категории товаров
                  </h1>
                  <p
                    className="text-sm text-[#4D7059] mt-1"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    Выберите интересующую вас категорию для просмотра товаров
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1 px-3 py-2 rounded-lg bg-white border border-gray-200 hover:border-[#2B865A] hover:shadow-md transition-all duration-300 text-sm">
                    <Menu className="text-[#2B865A]" width={16} height={16} />
                    <span style={{ fontFamily: 'Manrope, sans-serif' }}>Меню</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCategories.length === 0 ? (
                  <div className="col-span-3 text-center py-8">
                    <p
                      className="text-base text-[#4D7059]"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      Категории не найдены
                    </p>
                  </div>
                ) : (
                  filteredCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => navigate(`/categories/${cat.slug}`)}
                      className="group relative overflow-hidden rounded-lg bg-white border border-gray-100 hover:border-[#2B865A] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                      style={{ height: '220px' }}
                    >
                      <div className="relative h-28 overflow-hidden">
                        <img
                          src={cat.image}
                          alt={cat.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                        <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-white/90 backdrop-blur-sm">
                          <span
                            className="text-xs font-semibold text-[#2B865A]"
                            style={{ fontFamily: 'Manrope, sans-serif' }}
                          >
                            {cat.productsCount || 0} товаров
                          </span>
                        </div>
                      </div>

                      <div className="p-3">
                        <h3
                          className="text-sm font-semibold mb-1.5 text-left group-hover:text-[#2B865A] transition-colors truncate"
                          style={{
                            fontFamily: 'Manrope, sans-serif',
                            color: '#222021',
                          }}
                        >
                          {cat.title}
                        </h3>

                        {cat.description && (
                          <p
                            className="text-xs text-[#635436] mb-2 text-left line-clamp-2"
                            style={{ fontFamily: 'Manrope, sans-serif' }}
                          >
                            {cat.description}
                          </p>
                        )}

                        {cat.subcategories && cat.subcategories.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {cat.subcategories.slice(0, 2).map((subcat: { id: number; title: string; slug: string }) => (
                              <span
                                key={subcat.id}
                                className="px-1.5 py-0.5 text-xs rounded bg-[#F4EDE6] text-[#635436]"
                                style={{ fontFamily: 'Manrope, sans-serif' }}
                              >
                                {subcat.title}
                              </span>
                            ))}
                            {cat.subcategories.length > 2 && (
                              <span
                                className="px-1.5 py-0.5 text-xs rounded bg-[#E7F0EA] text-[#2B865A]"
                                style={{ fontFamily: 'Manrope, sans-serif' }}
                              >
                                +{cat.subcategories.length - 2}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </button>
                  ))
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => navigate('/main-page')}
                  className="w-full py-3 rounded-lg bg-[#2B865A] text-white font-semibold hover:bg-[#24704A] transition-all duration-300 shadow-md hover:shadow-lg text-sm"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  Вернуться на главную
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-auto bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-white/20 px-4 py-3">
          <div className="flex items-center gap-6">
            {[
              { label: 'Главная', icon: Home, path: '/main-page' },
              { label: 'Избранное', icon: Heart, path: '/favorites' },
              { label: 'Корзина', icon: Cart, path: '/cart' },
              { label: 'Профиль', icon: User, path: '/profile' },
            ].map((tab) => {
              const IconComponent = tab.icon;
              const isActive = tab.path === '/main-page';
              return (
                <button
                  key={tab.path}
                  onClick={() => navigate(tab.path)}
                  className={`flex flex-col items-center gap-1 transition-all duration-300 ${isActive ? 'scale-110' : 'hover:scale-105'}`}
                >
                  <div className={`p-2 rounded-full ${isActive ? 'bg-[#2B865A]/10' : ''}`}>
                    <IconComponent
                      width={18}
                      height={18}
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

      <div className="lg:hidden flex min-h-[40vh] w-full items-center justify-center bg-background overflow-hidden ">
        <div className="w-full h-full pb-20">
          <div
            style={{
              backgroundColor: '#2B865A',
              borderBottomLeftRadius: '20px',
              borderBottomRightRadius: '20px',
              paddingBottom: '20px',
              paddingLeft: '16px',
              paddingRight: '16px',
              paddingTop: '36px',
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center justify-center w-7 h-7"
              >
                <ArrowLeft width={16} height={16} style={{ color: '#FFFFFF' }} />
              </button>
              <div className="flex-1 text-center">
                <h1 style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontWeight: 500,
                  fontSize: '20px',
                  color: '#FFFFFF',
                }}>
                  Все категории
                </h1>
              </div>
              <div className="w-7"></div>
            </div>

            <div className="flex items-center gap-2">
              <div
                className="flex flex-1 items-center gap-2 px-3 py-2.5"
                style={{
                  borderRadius: '10px',
                  backgroundColor: '#F7F2EB',
                }}
              >
                <Search width={14} height={14} style={{ color: '#989C99' }} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Искать товары"
                  className="flex-1 bg-transparent outline-none placeholder:text-[#B4B7B5] text-sm"
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    color: '#222021',
                  }}
                />
              </div>
            </div>
          </div>

          <div className="h-full overflow-y-auto px-4 pt-4 pb-6">
            <div className="grid grid-cols-2 gap-3">
              {filteredCategories.length === 0 ? (
                <div className="col-span-2 text-center py-8">
                  <p
                    className="text-sm text-[#4D7059]"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    Категории не найдены
                  </p>
                </div>
              ) : (
                filteredCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => navigate(`/categories/${cat.slug}`)}
                    style={{
                      border: '1px solid #F4EDE6',
                      borderRadius: '12px',
                      padding: '8px',
                      textAlign: 'left',
                      boxShadow: '0px 4px 8px rgba(0,0,0,0.04)',
                      backgroundColor: '#FFFDF9',
                      height: '150px',
                    }}
                  >
                    <p
                      style={{
                        fontFamily: 'Manrope, sans-serif',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#635436',
                        marginBottom: '6px',
                        lineHeight: '120%',
                      }}
                    >
                      {cat.title}
                    </p>
                    <img
                      src={cat.image}
                      alt={cat.title}
                      style={{
                        width: '100%',
                        height: 'calc(100% - 24px)',
                        objectFit: 'cover',
                        borderRadius: '8px',
                      }}
                    />
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        <div
          className="fixed left-0 right-0 bottom-0 flex items-center justify-around"
          style={{
            height: '70px',
            padding: '10px 16px',
            backgroundColor: '#FFFFFF',
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px',
            boxShadow: '0px -4px 12px rgba(0,0,0,0.06)',
          }}
        >
          {[
            { label: 'Главная\nстраница', icon: Home, path: '/main-page', active: true },
            { label: 'Избранное', icon: Heart, path: '/favorites', active: false },
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
                <IconComponent
                  width={18}
                  height={18}
                  style={{
                    color: tab.active ? '#2B865A' : '#669B78',
                  }}
                />
                <span
                  style={{
                    lineHeight: '1.2',
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: '9px',
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
  );
}