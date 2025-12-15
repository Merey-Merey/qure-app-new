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
        <div className="w-2/5 h-full flex flex-col items-center p-8 lg:p-10 bg-gradient-to-b from-[#FCF8F5] to-[#E0EFBD]/30">
          <div className="max-w-sm mx-auto w-full">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 mb-8 text-[#2B865A] hover:text-[#24704A] transition-colors group text-sm"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              <ArrowLeft className="transform group-hover:-translate-x-1 transition-transform" width={16} height={16} />
              Назад
            </button>

            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#2B865A]/10 flex items-center justify-center">
                  <Folder className="text-[#2B865A]" width={20} height={20} />
                </div>
                <div>
                  <h1
                    className="text-xl lg:text-2xl font-bold leading-tight"
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      color: '#222021',
                      lineHeight: '1.2'
                    }}
                  >
                    Подкатегории
                  </h1>
                  <p
                    className="text-xs text-[#4D7059]"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    {category ? category.title : 'Загрузка...'} • {subcategories.length} подкатегорий
                  </p>
                </div>
              </div>

              <p
                className="text-sm text-[#4D7059] leading-relaxed mb-6"
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  lineHeight: '1.5'
                }}
              >
                Выберите интересующую подкатегорию для просмотра товаров. Все товары проходят строгий контроль качества.
              </p>

              <div className="relative mb-6">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Search width={16} height={16} className="text-[#989C99]" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Искать подкатегории..."
                  className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-[#F0F0F0] bg-white/50 hover:border-[#2B865A] focus:border-[#2B865A] focus:bg-white transition-colors text-sm"
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    color: '#222021',
                  }}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2.5 rounded-lg bg-white/50 backdrop-blur-sm">
                  <div className="w-8 h-8 rounded-lg bg-[#2B865A]/10 flex items-center justify-center flex-shrink-0">
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm text-[#222021] truncate">Удобная навигация</h3>
                    <p className="text-xs text-[#4D7059] truncate">Быстрый доступ к нужным товарам</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2.5 rounded-lg bg-white/50 backdrop-blur-sm">
                  <div className="w-8 h-8 rounded-lg bg-[#2B865A]/10 flex items-center justify-center flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                        stroke="#2B865A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm text-[#222021] truncate">Проверенные товары</h3>
                    <p className="text-xs text-[#4D7059] truncate">Все подкатегории содержат сертифицированные товары</p>
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

        <div className="w-3/5 h-full flex items-center justify-center p-8 lg:p-10">
          <div className="w-full max-w-4xl mx-auto">
            <div className="w-full rounded-xl bg-white/90 backdrop-blur-sm shadow-lg border border-white/20 p-6">
              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#2B865A]"></div>
                  <p className="mt-3 text-sm text-[#4D7059]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Загрузка подкатегорий...
                  </p>
                </div>
              ) : !category ? (
                <div className="text-center py-12">
                  <p className="text-base text-[#4D7059]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Категория не найдена
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2
                        className="text-lg lg:text-xl font-bold"
                        style={{
                          fontFamily: 'Manrope, sans-serif',
                          color: '#222021',
                        }}
                      >
                        {category.title}
                        <span className="text-sm font-normal text-[#4D7059] ml-2">
                          ({filteredSubcategories.length} подкатегорий)
                        </span>
                      </h2>
                      <p className="text-sm text-[#4D7059]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        Выберите подкатегорию для просмотра товаров
                      </p>
                    </div>

                    <button
                      onClick={() => navigate('/categories')}
                      className="px-4 py-2 rounded-lg border border-[#F0F0F0] hover:border-[#2B865A] transition-colors text-sm"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      Все категории
                    </button>
                  </div>

                  {filteredSubcategories.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="mb-6">
                        <svg className="w-16 h-16 mx-auto text-[#E0EFBD]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM4 10a6 6 0 1112 0 6 6 0 01-12 0z" clipRule="evenodd" />
                          <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3
                        className="text-lg font-bold mb-3"
                        style={{
                          fontFamily: 'Manrope, sans-serif',
                          color: '#222021',
                        }}
                      >
                        Подкатегории не найдены
                      </h3>
                      <p
                        className="text-sm text-[#4D7059] mb-6 max-w-md mx-auto"
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
                          className="px-4 py-2 rounded-lg bg-[#F8F8F8] text-[#635436] hover:bg-[#F0F0F0] transition-colors text-sm"
                          style={{ fontFamily: 'Manrope, sans-serif' }}
                        >
                          Сбросить поиск
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredSubcategories.map((sub) => (
                        <button
                          key={sub.slug}
                          onClick={() => navigate(`/categories/${slug}/${sub.slug}`)}
                          className="group relative rounded-lg border border-[#F0F0F0] bg-white p-4 hover:border-[#2B865A] hover:shadow-md transition-all duration-300 text-left"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#FCF8F5] to-[#E0EFBD] flex items-center justify-center flex-shrink-0">
                              <Folder className="text-[#2B865A]" width={20} height={20} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3
                                className="text-sm font-semibold mb-1.5 truncate"
                                style={{
                                  fontFamily: 'Manrope, sans-serif',
                                  color: '#222021',
                                }}
                              >
                                {sub.title}
                              </h3>
                              <p
                                className="text-xs text-[#4D7059]"
                                style={{ fontFamily: 'Manrope, sans-serif' }}
                              >
                                Просмотреть все товары
                              </p>
                            </div>
                          </div>
                          <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#2B865A]/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-[#2B865A] font-bold text-sm transform group-hover:translate-x-0.5 transition-transform">→</span>
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

      <div className=" min-h-[38vh] lg:hidden flex w-full items-center justify-center bg-background">
        <div
          className="w-[390px] h-[100vh] overflow-y-hidden relative overflow-x-hidden shadow-xl"
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
                    fontSize: '16px',
                    color: '#FFFFFF',
                  }}>
                    Все категории
                  </h1>
                </div>
                <div className="w-7"></div>
              </div>

              <div
                className="flex items-center gap-2 px-3 py-2.5"
                style={{
                  borderRadius: '10px',
                  backgroundColor: '#F7F2EB',
                }}
              >
                <Search width={14} height={14} style={{ color: '#989C99' }} />
                <input
                  type="text"
                  placeholder="Искать товары"
                  className="flex-1 bg-transparent outline-none placeholder:text-[#B4B7B5] text-sm"
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    color: '#222021',
                  }}
                />
              </div>
            </div>

            <div className="px-4 pt-4">
              <h2
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontWeight: 600,
                  fontSize: '18px',
                  color: '#222021',
                  marginBottom: '12px',
                }}
              >
                {category?.title}
              </h2>

              <div
                style={{
                  borderRadius: '16px',
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0px 4px 12px rgba(0,0,0,0.06)',
                  overflow: 'hidden',
                }}
              >
                {subcategories.map((sub) => (
                  <button
                    key={sub.slug}
                    onClick={() => navigate(`/categories/${slug}/${sub.slug}`)}
                    className="w-full flex items-center justify-between px-4 py-3"
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: '14px',
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
    </div>
  );
}