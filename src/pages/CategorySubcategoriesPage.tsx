import { useNavigate, useParams } from 'react-router-dom';
import { type Category } from '../mocks/categories';
import { Cart, Heart, Home, User, ArrowLeft, Search, Folder } from 'iconoir-react';
import { useState, useEffect } from 'react';
import { API_URLS } from '../services/api';

type Subcategory = {
  id: string;
  slug: string;
  title: string;
  parentSlug: string;
};

export default function CategorySubcategoriesPage() {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    Promise.all([
      fetch(API_URLS.categories).then(res => res.json()),   
      fetch(API_URLS.subcategories).then(res => res.json()) 
    ]).then(([categoriesData, subcategoriesData]) => {       
      const foundCategory = categoriesData.find((c: Category) => c.slug === slug);
      const foundSubcategories = subcategoriesData.filter((s: Subcategory) => s.parentSlug === slug);
      
      setCategory(foundCategory as Category);
      setSubcategories(foundSubcategories);
      setLoading(false);
    }).catch(err => {
      console.error('Fetch error:', err);
      setLoading(false);
    });
  }, [slug]);

  const filteredSubcategories = subcategories.filter(sub =>
    sub.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-background">
      <div className="hidden md:flex w-full h-screen">
        <div className="w-2/5 h-full flex flex-col items-center p-12 xl:p-16 2xl:p-20 bg-gradient-to-b from-[#FCF8F5] to-[#E0EFBD]/30">
          <div className="max-w-md mx-auto w-full">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-3 mb-12 text-[#2B865A] hover:text-[#24704A] transition-colors group"
              style={{ fontFamily: 'Manrope, sans-serif', fontSize: '16px' }}
            >
              <ArrowLeft className="transform group-hover:-translate-x-1 transition-transform" width={20} height={20} />
              Назад к категориям
            </button>

            <div className="mb-12">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-[#2B865A]/10 flex items-center justify-center">
                  <Folder className="text-[#2B865A]" width={24} height={24} />
                </div>
                <div>
                  <h1
                    className="text-2xl xl:text-3xl font-bold leading-tight"
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      color: '#222021',
                      lineHeight: '1.2'
                    }}
                  >
                    Подкатегории
                  </h1>
                  <p
                    className="text-sm text-[#4D7059]"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    {category ? category.title : 'Загрузка...'} • {subcategories.length} подкатегорий
                  </p>
                </div>
              </div>
              
              <p
                className="text-base xl:text-lg text-[#4D7059] leading-relaxed mb-8"
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  lineHeight: '1.5'
                }}
              >
                Выберите интересующую подкатегорию для просмотра товаров. Все товары проходят строгий контроль качества.
              </p>

              <div className="relative mb-6">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Search width={20} height={20} className="text-[#989C99]" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Искать подкатегории..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-[#F0F0F0] bg-white/50 hover:border-[#2B865A] focus:border-[#2B865A] focus:bg-white transition-colors"
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    color: '#222021',
                    fontSize: '16px'
                  }}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/50 backdrop-blur-sm">
                  <div className="w-10 h-10 rounded-lg bg-[#2B865A]/10 flex items-center justify-center">
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#222021]">Удобная навигация</h3>
                    <p className="text-sm text-[#4D7059]">Быстрый доступ к нужным товарам</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/50 backdrop-blur-sm">
                  <div className="w-10 h-10 rounded-lg bg-[#2B865A]/10 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                        stroke="#2B865A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#222021]">Проверенные товары</h3>
                    <p className="text-sm text-[#4D7059]">Все подкатегории содержат сертифицированные товары</p>
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

        <div className="w-3/5 h-full flex items-center justify-center p-12 xl:p-16 2xl:p-20">
          <div className="w-full max-w-6xl mx-auto">
            <div className="w-full rounded-2xl bg-white/90 backdrop-blur-sm shadow-xl border border-white/20 p-8">
              {loading ? (
                <div className="text-center py-16">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2B865A]"></div>
                  <p className="mt-4 text-[#4D7059]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Загрузка подкатегорий...
                  </p>
                </div>
              ) : !category ? (
                <div className="text-center py-16">
                  <p className="text-lg text-[#4D7059]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Категория не найдена
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2
                        className="text-2xl xl:text-3xl font-bold"
                        style={{
                          fontFamily: 'Manrope, sans-serif',
                          color: '#222021',
                        }}
                      >
                        {category.title}
                        <span className="text-lg font-normal text-[#4D7059] ml-2">
                          ({filteredSubcategories.length} подкатегорий)
                        </span>
                      </h2>
                      <p className="text-[#4D7059]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        Выберите подкатегорию для просмотра товаров
                      </p>
                    </div>
                    
                    <button
                      onClick={() => navigate('/categories')}
                      className="px-6 py-3 rounded-xl border-2 border-[#F0F0F0] hover:border-[#2B865A] transition-colors"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      Все категории
                    </button>
                  </div>

                  {filteredSubcategories.length === 0 ? (
                    <div className="text-center py-16">
                      <div className="mb-8">
                        <svg className="w-24 h-24 mx-auto text-[#E0EFBD]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM4 10a6 6 0 1112 0 6 6 0 01-12 0z" clipRule="evenodd" />
                          <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3
                        className="text-xl font-bold mb-4"
                        style={{
                          fontFamily: 'Manrope, sans-serif',
                          color: '#222021',
                        }}
                      >
                        Подкатегории не найдены
                      </h3>
                      <p
                        className="text-lg text-[#4D7059] mb-8 max-w-md mx-auto"
                        style={{
                          fontFamily: 'Manrope, sans-serif',
                          lineHeight: '1.5'
                        }}
                      >
                        {searchQuery ? `По запросу "${searchQuery}" ничего не найдено` : 'В этой категории пока нет подкатегорий'}
                      </p>
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery('')}
                          className="px-6 py-3 rounded-xl bg-[#F8F8F8] text-[#635436] hover:bg-[#F0F0F0] transition-colors"
                          style={{ fontFamily: 'Manrope, sans-serif' }}
                        >
                          Сбросить поиск
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredSubcategories.map((sub) => (
                        <button
                          key={sub.slug}
                          onClick={() => navigate(`/categories/${slug}/${sub.slug}`)}
                          className="group relative rounded-xl border-2 border-[#F0F0F0] bg-white p-6 hover:border-[#2B865A] hover:shadow-lg transition-all duration-300 text-left"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#FCF8F5] to-[#E0EFBD] flex items-center justify-center">
                              <Folder className="text-[#2B865A]" width={24} height={24} />
                            </div>
                            <div className="flex-1">
                              <h3
                                className="text-lg font-semibold mb-2"
                                style={{
                                  fontFamily: 'Manrope, sans-serif',
                                  color: '#222021',
                                }}
                              >
                                {sub.title}
                              </h3>
                              <p
                                className="text-sm text-[#4D7059]"
                                style={{ fontFamily: 'Manrope, sans-serif' }}
                              >
                                Просмотреть все товары
                              </p>
                            </div>
                          </div>
                          <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#2B865A]/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-[#2B865A] font-bold transform group-hover:translate-x-1 transition-transform">→</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden w-full h-full">
        <div className="flex min-h-screen w-full items-center justify-center bg-background">
          <div className="w-[390px] h-[750px] overflow-y-hidden relative overflow-hidden shadow-xl">
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
                type="button"
                onClick={() => navigate(-1)}
                style={{ color: 'white', fontSize: 18, transform: 'translateY(30px)', fontWeight: 100 }}
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

              <div
                className="mt-4 flex items-center gap-2 px-3"
                style={{
                  height: '37px',
                  borderRadius: '10px',
                  backgroundColor: '#F7F2EB',
                }}
              >
                <input
                  type="text"
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

            <div className="h-full overflow-y-auto pb-[92px]">
              <div className="px-4 pt-4">
                <h2
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontWeight: 700,
                    fontSize: '20px',
                    color: '#222021',
                    marginBottom: '12px',
                  }}
                >
                  {category?.title}
                </h2>

                <div
                  style={{
                    borderRadius: '24px',
                    backgroundColor: '#FFFFFF',
                    boxShadow: '0px 4px 16px rgba(0,0,0,0.06)',
                    padding: '4px 0',
                  }}
                >
                  {subcategories.map((sub) => (
                    <button
                      key={sub.slug}
                      type="button"
                      onClick={() => navigate(`/categories/${slug}/${sub.slug}`)}
                      className="w-full flex items-center justify-between px-4 py-3"
                      style={{
                        fontFamily: 'Manrope, sans-serif',
                        fontSize: '16px',
                        color: '#222021',
                        borderBottom: '1px solid #F0F0F0',
                      }}
                    >
                      <span>{sub.title}</span>
                      <span style={{ color: '#B4B7B5' }}>›</span>
                    </button>
                  ))}
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
                    type="button"
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
    </div>
  );
}