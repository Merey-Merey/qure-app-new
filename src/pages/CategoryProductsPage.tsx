import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { type Product } from '../mocks/products';
import ProductCard from '../components/ProductCard';
import { Cart, Heart, Home, Search, User, ArrowLeft, Filter, Sort, MapPin } from 'iconoir-react';
import { API_URLS } from '../services/api';

type Subcategory = {
  id: string;
  slug: string;
  title: string;
  parentSlug: string;
};

export default function CategoryProductsPage() {
  const navigate = useNavigate();
  const { slug, subSlug } = useParams<{ slug: string; subSlug: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [subcategory, setSubcategory] = useState<Subcategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'title' | 'price' | 'popularity'>('title');

  useEffect(() => {
    Promise.all([
      fetch(API_URLS.products),
      fetch(API_URLS.subcategories)
    ]).then(([productsRes, subcategoriesRes]) => 
      Promise.all([productsRes.json(), subcategoriesRes.json()])
    ).then(([productsData, subcategoriesData]) => {
      const filteredProducts = productsData.filter((p: Product) => 
        p.categorySlug === slug && p.subSlug === subSlug
      );
      const foundSubcategory = subcategoriesData.find((s: Subcategory) => 
        s.parentSlug === slug && s.slug === subSlug
      );
      setProducts(filteredProducts);
      setSubcategory(foundSubcategory as Subcategory);
      setLoading(false);
    }).catch(err => {
      console.error('Fetch error:', err);
      setLoading(false);
    });
  }, [slug, subSlug]);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.subtitle?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'price') {
      return a.price - b.price;
    } else {
      return a.title.localeCompare(b.title); 
    }
  });

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Загрузка...</div>;
  }

  if (!subcategory) {
    return null;
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-background">
      <div className="hidden md:flex w-full h-screen">
        <div className="w-2/5 h-full flex flex-col items-center p-8 lg:p-10 xl:p-12 bg-gradient-to-b from-[#FCF8F5] to-[#E0EFBD]/30">
          <div className="max-w-sm mx-auto w-full">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 mb-8 text-[#2B865A] hover:text-[#24704A] transition-colors group text-sm"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              <ArrowLeft className="transform group-hover:-translate-x-1 transition-transform" width={16} height={16} />
              Назад к подкатегориям
            </button>

            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#2B865A]/10 flex items-center justify-center">
                  <Filter className="text-[#2B865A]" width={20} height={20} />
                </div>
                <div>
                  <h1
                    className="text-xl xl:text-2xl font-bold leading-tight"
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      color: '#222021',
                      lineHeight: '1.2'
                    }}
                  >
                    {subcategory.title}
                  </h1>
                  <p
                    className="text-xs text-[#4D7059]"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    {products.length} товар{products.length % 10 === 1 ? '' : 'ов'} в категории
                  </p>
                </div>
              </div>
              
              <p
                className="text-sm xl:text-base text-[#4D7059] leading-relaxed mb-6"
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  lineHeight: '1.5'
                }}
              >
                Все товары проверены на соответствие стандартам качества. Подбирайте лучшее для вашего здоровья.
              </p>

              <div className="relative mb-4">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Search width={16} height={16} className="text-[#989C99]" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Искать товары..."
                  className="w-full pl-10 pr-3 py-3 rounded-lg border border-[#F0F0F0] bg-white/50 hover:border-[#2B865A] focus:border-[#2B865A] focus:bg-white transition-colors text-sm"
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    color: '#222021',
                  }}
                />
              </div>

              <div className="space-y-3 mb-6">
                <div>
                  <label className="block text-xs font-semibold mb-1.5 text-[#222021]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Сортировка
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'title' | 'price' | 'popularity')}
                    className="w-full rounded-lg border border-[#F0F0F0] bg-white/50 px-3 py-2 hover:border-[#2B865A] transition-colors text-sm"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    <option value="title">По названию</option>
                    <option value="price">По цене</option>
                    <option value="popularity">По популярности</option>
                  </select>
                </div>
                
                <button className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg border border-[#F0F0F0] bg-white/50 hover:border-[#2B865A] transition-colors text-sm">
                  <Filter width={14} height={14} />
                  <span style={{ fontFamily: 'Manrope, sans-serif' }}>Дополнительные фильтры</span>
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50 backdrop-blur-sm">
                  <div className="w-8 h-8 rounded-md bg-[#2B865A]/10 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z" 
                        stroke="#2B865A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#222021] text-sm">Гарантия качества</h3>
                    <p className="text-xs text-[#4D7059]">Все товары сертифицированы</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50 backdrop-blur-sm">
                  <div className="w-8 h-8 rounded-md bg-[#2B865A]/10 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" 
                        stroke="#2B865A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#222021] text-sm">Доставка по городу</h3>
                    <p className="text-xs text-[#4D7059]">Бесплатно при заказе от 10 000 ₸</p>
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

        <div className="w-3/5 h-full flex items-center justify-center p-8 lg:p-10 xl:p-12">
          <div className="w-full max-w-5xl mx-auto">
            <div className="w-full rounded-xl bg-white/90 backdrop-blur-sm shadow-lg border border-white/20 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2
                    className="text-xl xl:text-2xl font-bold"
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      color: '#222021',
                    }}
                  >
                    Все товары
                    <span className="text-sm font-normal text-[#4D7059] ml-2">
                      ({filteredProducts.length} найдено)
                    </span>
                  </h2>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <MapPin width={14} height={14} className="text-[#4D7059]" />
                    <span className="text-xs text-[#4D7059]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      г. Алматы
                    </span>
                    <div className="ml-3 px-2 py-0.5 rounded-full bg-[#E7F0EA] border border-[#2B865A]/20">
                      <span className="text-xs font-semibold text-[#2B865A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        170 Q
                      </span>
                    </div>
                  </div>
                </div>
                
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="px-3 py-1.5 rounded-lg border border-[#F0F0F0] hover:border-[#2B865A] transition-colors text-sm"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    Сбросить поиск
                  </button>
                )}
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="mb-6">
                    <svg className="w-20 h-20 mx-auto text-[#E0EFBD]" fill="currentColor" viewBox="0 0 20 20">
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
                    Товары не найдены
                  </h3>
                  <p
                    className="text-sm text-[#4D7059] mb-6 max-w-md mx-auto"
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      lineHeight: '1.5'
                    }}
                  >
                    {searchQuery ? `По запросу "${searchQuery}" ничего не найдено` : 'В этой категории пока нет товаров'}
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <button
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#F0F0F0] bg-white hover:border-[#2B865A] transition-colors text-sm"
                        style={{ fontFamily: 'Manrope, sans-serif' }}
                      >
                        <Filter width={14} height={14} />
                        Фильтры
                      </button>
                      <div className="relative">
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value as 'title' | 'price' | 'popularity')}
                          className="px-3 py-1.5 rounded-lg border border-[#F0F0F0] bg-white hover:border-[#2B865A] transition-colors appearance-none pr-7 text-sm"
                          style={{ fontFamily: 'Manrope, sans-serif' }}
                        >
                          <option value="title">По названию</option>
                          <option value="price">По цене</option>
                          <option value="popularity">По популярности</option>
                        </select>
                        <Sort className="absolute right-2.5 top-1/2 transform -translate-y-1/2 pointer-events-none" width={14} height={14} />
                      </div>
                    </div>
                    <p className="text-xs text-[#4D7059]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      Показано {sortedProducts.length} из {products.length} товаров
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {sortedProducts.map((product) => (
                      <div
                        key={product.id}
                        className="transform hover:-translate-y-1 transition-transform duration-300 cursor-pointer"
                        onClick={() => navigate(`/product/${product.id}`)}
                      >
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
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
                paddingTop: '10px',
                paddingBottom: '16px',
                paddingLeft: '16px',
                paddingRight: '16px',
              }}
            >
              <button
                type="button"
                onClick={() => navigate(-1)}
                style={{ 
                  color: 'white', 
                  fontSize: 18, 
                  transform: 'translateY(30px)', 
                  fontWeight: 100,
                  position: 'absolute',
                  left: 16
                }}
              >
                ←
              </button>
              <div style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: '14px',
                color: '#FFFFFFCC',
                opacity: 0.9,
                textAlign: 'center',
                marginTop: 40
              }}>
                г. Алматы
              </div>
              <button type="button" className="flex items-center gap-1 px-2 rounded-[16px] bg-[#E7F0EA] border border-white/40 ml-auto" style={{marginTop: -20}}>
                <span style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontWeight: 600,
                  fontSize: '13px',
                  color: '#2B865A',
                }}>
                  170 Q
                </span>
              </button>

              <div className="flex items-center gap-2 mt-4">
                <div className="flex flex-1 items-center gap-2 px-3" style={{
                  height: '37px',
                  borderRadius: '10px',
                  backgroundColor: '#F7F2EB',
                }}>
                  <Search width={16} height={16} style={{ color: '#989C99' }} />
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
            </div>

            <div className="h-full overflow-y-auto pb-[92px]">
              <div className="px-4 pt-4">
                <h2 style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontWeight: 700,
                  fontSize: '20px',
                  color: '#222021',
                }}>
                  {subcategory.title}
                </h2>
                <p style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: '14px',
                  color: '#8A8A8A',
                  marginBottom: '12px',
                }}>
                  {products.length} товаров
                </p>

                <div className="flex gap-2 mb-4">
                  <button
                    type="button"
                    className="flex-1"
                    style={{
                      borderRadius: '20px',
                      border: '1px solid #E0E0E0',
                      padding: '8px 12px',
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                    }}
                  >
                    Фильтры
                  </button>
                  <button
                    type="button"
                    className="flex-1"
                    style={{
                      borderRadius: '20px',
                      border: '1px solid #E0E0E0',
                      padding: '8px 12px',
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                    }}
                  >
                    Сортировка
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="cursor-pointer"
                    >
                      <ProductCard product={product} />
                    </div>
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
                    <span style={{
                      lineHeight: '1.2',
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: '10px',
                      fontWeight: tab.active ? 700 : 500,
                      color: tab.active ? '#2B865A' : '#669B78',
                    }}>
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