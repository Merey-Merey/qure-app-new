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

  if (loading) return <div className="flex items-center justify-center min-h-screen">Загрузка...</div>;

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
              <div className="mb-8">
                <h2
                  className="text-xl font-bold mb-4"
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    color: '#222021',
                  }}
                >
                  Категории товаров
                </h2>
                
                <div className="relative">
                  <Search 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#989C99]" 
                    width={20} 
                    height={20} 
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Найти категорию..."
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 bg-white/80 focus:border-[#2B865A] focus:ring-2 focus:ring-[#2B865A]/20 outline-none transition-all duration-300"
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: '16px',
                    }}
                  />
                </div>
                
                {searchQuery && (
                  <div className="mt-3 p-3 rounded-lg bg-[#FCF8F5]">
                    <p className="text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      Найдено категорий: <span className="font-semibold">{filteredCategories.length}</span>
                    </p>
                  </div>
                )}
              </div>

              <div className="mb-8">
                <h3
                  className="font-semibold text-lg mb-4"
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
                      className="flex items-center gap-3 w-full p-3 rounded-xl bg-white/80 hover:bg-white hover:shadow-lg transition-all duration-300 text-left group"
                    >
                      <div className="w-10 h-10 rounded-lg overflow-hidden">
                        <img
                          src={cat.image}
                          alt={cat.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div>
                        <h4
                          className="font-medium"
                          style={{ fontFamily: 'Manrope, sans-serif' }}
                        >
                          {cat.title}
                        </h4>
                        <p
                          className="text-sm text-[#4D7059]"
                          style={{ fontFamily: 'Manrope, sans-serif' }}
                        >
                          {cat.productsCount || 0} товаров
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <h3
                  className="font-semibold text-lg mb-4"
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    color: '#222021',
                  }}
                >
                  Всего категорий
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span style={{ fontFamily: 'Manrope, sans-serif' }}>Основные категории</span>
                    <span className="font-semibold text-[#2B865A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      {categories.length}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span style={{ fontFamily: 'Manrope, sans-serif' }}>Подкатегории</span>
                    <span className="font-semibold" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      {categories.reduce((sum, cat) => sum + (cat.subcategories?.length || 0), 0)}
                    </span>
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

        <div className="w-2/3 h-full flex flex-col p-8 xl:p-12">
          <div className="max-w-6xl mx-auto w-full">
            <div className="w-full rounded-2xl bg-white/90 backdrop-blur-sm shadow-xl border border-white/20 p-8 xl:p-10 min-h-[600px]">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1
                    className="text-2xl xl:text-3xl font-bold"
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      color: '#222021',
                    }}
                  >
                    Все категории товаров
                  </h1>
                  <p
                    className="text-[#4D7059] mt-1"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    Выберите интересующую вас категорию для просмотра товаров
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white border border-gray-200 hover:border-[#2B865A] hover:shadow-lg transition-all duration-300">
                    <Menu className="text-[#2B865A]" width={18} height={18} />
                    <span style={{ fontFamily: 'Manrope, sans-serif' }}>Меню</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCategories.length === 0 ? (
                  <div className="col-span-3 text-center py-12">
                    <p
                      className="text-lg text-[#4D7059]"
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
                      className="group relative overflow-hidden rounded-2xl bg-white border border-gray-100 hover:border-[#2B865A] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                      style={{ height: '280px' }}
                    >
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={cat.image}
                          alt={cat.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        
                        <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm">
                          <span
                            className="text-sm font-semibold text-[#2B865A]"
                            style={{ fontFamily: 'Manrope, sans-serif' }}
                          >
                            {cat.productsCount || 0} товаров
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-5">
                        <h3
                          className="text-lg font-semibold mb-2 text-left group-hover:text-[#2B865A] transition-colors"
                          style={{
                            fontFamily: 'Manrope, sans-serif',
                            color: '#222021',
                          }}
                        >
                          {cat.title}
                        </h3>
                        
                        {cat.description && (
                          <p
                            className="text-sm text-[#635436] mb-3 text-left line-clamp-2"
                            style={{ fontFamily: 'Manrope, sans-serif' }}
                          >
                            {cat.description}
                          </p>
                        )}
                        
                        {cat.subcategories && cat.subcategories.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {cat.subcategories.slice(0, 2).map((subcat: { id: number; title: string; slug: string }) => (
                              <span
                                key={subcat.id}
                                className="px-2 py-1 text-xs rounded-lg bg-[#F4EDE6] text-[#635436]"
                                style={{ fontFamily: 'Manrope, sans-serif' }}
                              >
                                {subcat.title}
                              </span>
                            ))}
                            {cat.subcategories.length > 2 && (
                              <span
                                className="px-2 py-1 text-xs rounded-lg bg-[#E7F0EA] text-[#2B865A]"
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

              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex gap-4">
                  <button
                    onClick={() => navigate('/main-page')}
                    className="flex-1 py-4 rounded-xl bg-[#2B865A] text-white font-semibold hover:bg-[#24704A] transition-all duration-300 shadow-lg hover:shadow-xl"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    Вернуться на главную
                  </button>
                  
            
                </div>
              </div>
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
              const isActive = tab.path === '/main-page';
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
                borderBottomLeftRadius: '32px',
                borderBottomRightRadius: '32px',
                paddingBottom: '24px',
                paddingLeft: '16px',
                paddingRight: '16px',
              }}
            >
              <button
                onClick={() => navigate(-1)}
                style={{ 
                  color: 'white', 
                  fontSize: 18, 
                  transform: 'translateY(30px)', 
                  fontWeight: 100 
                }}
              >
                ←
              </button>
              <h1
                style={{
                  marginBottom: '14px',
                  marginTop: '8px',
                  fontFamily: 'Manrope, sans-serif',
                  fontWeight: 500,
                  fontSize: '16px',
                  color: '#FFFFFF',
                  textAlign: 'center',
                }}
              >
                Все категории
              </h1>
              
              <div className="flex items-center gap-2">
                <div
                  className="flex flex-1 items-center gap-2 px-3"
                  style={{
                    height: '37px',
                    borderRadius: '10px',
                    backgroundColor: '#F7F2EB',
                  }}
                >
                  <Search width={16} height={16} style={{ color: '#989C99' }} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Искать товары"
                    className="flex-1 bg-transparent outline-none placeholder:text-[#B4B7B5]"
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: '14px',
                      color: '#222021',
                    }}
                  />
                </div>
              </div>
            </div>
            
            <div className="h-full overflow-y-auto px-4 pt-4 pb-6">
              <div className="grid grid-cols-2 gap-3">
                {filteredCategories.length === 0 ? (
                  <div className="col-span-2 text-center py-12">
                    <p
                      className="text-[#4D7059]"
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
                        borderRadius: '16px',
                        padding: '10px',
                        textAlign: 'left',
                        boxShadow: '0px 4px 12px rgba(0,0,0,0.04)',
                        backgroundColor: '#FFFDF9',
                        height: '180px',
                      }}
                    >
                      <p
                        style={{
                          width: '123px',
                          fontFamily: 'Manrope, sans-serif',
                          fontSize: '18px',
                          fontWeight: 600,
                          color: '#635436',
                          marginBottom: '8px',
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
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: '12px',
                        }}
                      />
                    </button>
                  ))
                )}
              </div>
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