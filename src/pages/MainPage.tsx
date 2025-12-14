// src/pages/MainPage.tsx
import { useNavigate } from 'react-router-dom';
import { Cart, Heart, Home, Search, User, MapPin, Menu, Filter, Star } from 'iconoir-react';
import { type Category } from '../mocks/categories';
import { type Product } from '../mocks/products';
import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { API_URLS } from '../services/api';

export default function MainPage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URLS.categories)
      .then(res => res.json())
      .then(data => {
        setCategories(data.slice(0, 6));
        setLoading(false);
      })
      .catch(err => {
        console.error('Categories fetch error:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch(API_URLS.products)
      .then(res => res.json())
      .then(data => setProducts(data.slice(0, 12)))
      .catch(err => console.error('Products fetch error:', err));
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Загрузка...</div>;
  }

  const DesktopProductCard = ({ product }: { product: Product }) => {
    return (
      <div 
        className="group cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-gray-100"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <div className="relative h-56 bg-gradient-to-br from-[#FCF8F5] to-[#E0EFBD]/30">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          />
          
          {product.discountPercent && (
            <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#E7F0EA] text-[#2B865A] font-semibold text-sm">
              -{product.discountPercent}%
            </div>
          )}
          
          {product.prescriptionRequired && (
            <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#FFE0E0] text-[#FE5F55] font-medium text-xs">
              По рецепту
            </div>
          )}
          
          <button className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white hover:scale-110 transition-all">
            <Heart width={20} height={20} className="text-gray-400 hover:text-[#FE5F55]" />
          </button>
        </div>
        
        <div className="p-5">
          <h3 
            className="font-semibold text-[#222021] mb-2 line-clamp-2"
            style={{ fontFamily: 'Manrope, sans-serif', fontSize: '16px' }}
          >
            {product.title}
          </h3>
          
          <p 
            className="text-sm text-[#635436] mb-3 line-clamp-1"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            {product.subtitle}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span 
                className="text-xl font-bold text-[#2B865A]"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                {product.price} ₸
              </span>
              {product.oldPrice && (
                <span 
                  className="text-sm text-gray-400 line-through"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  {product.oldPrice} ₸
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-1">
              <Star width={14} height={14} className="text-yellow-400 fill-yellow-400" />
              <span className="text-sm text-gray-600">4.8</span>
            </div>
          </div>
          
          <button className="w-full mt-4 py-3 rounded-xl bg-[#2B865A] text-white font-semibold hover:bg-[#24704A] transition-colors">
            В корзину
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full min-h-screen bg-background">
      <div className="hidden md:block w-full h-full">
        <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-8 py-4">
            <div className="flex items-center justify-between">
              <div 
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => navigate('/main-page')}
              >
                <div className="w-10 h-10 rounded-xl bg-[#2B865A]/10 flex items-center justify-center">
                  <span className="text-[#2B865A] font-bold text-xl" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Q
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#2B865A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Qure
                  </h2>
                  <p className="text-sm text-[#4D7059]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Health Assistant
                  </p>
                </div>
              </div>

              <div className="flex-1 max-w-2xl mx-8">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" width={20} height={20} />
                  <input
                    type="text"
                    placeholder="Искать товары, категории..."
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#2B865A]/50 focus:bg-white"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        const input = e.target as HTMLInputElement;
                        if (input.value.trim()) {
                          navigate(`/search?q=${encodeURIComponent(input.value)}`);
                        } else {
                          navigate('/search');
                        }
                      }
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-[#2B865A]">
                  <MapPin width={20} height={20} />
                  <span className="font-medium" style={{ fontFamily: 'Manrope, sans-serif' }}>г. Алматы</span>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#E7F0EA] text-[#2B865A] font-semibold hover:bg-[#2B865A] hover:text-white transition-colors">
                  <span>170 Q</span>
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Menu width={24} height={24} className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-24 pb-20">
          <div className="max-w-7xl mx-auto px-8">
            <div className="mb-12">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-[#222021]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Популярные категории
                </h2>
                <button
                  onClick={() => navigate('/categories')}
                  className="text-[#2B865A] font-semibold hover:text-[#24704A] transition-colors flex items-center gap-2"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  Все категории
                  <span>→</span>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-6">
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    onClick={() => navigate(`/categories/${cat.slug}`)}
                    className="group cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-gray-100"
                  >
                    <div className="p-6">
                      <h3 
                        className="text-xl font-semibold text-[#222021] mb-3" 
                        style={{ fontFamily: 'Manrope, sans-serif' }}
                      >
                        {cat.title}
                      </h3>
                      <div className="relative h-48 rounded-xl overflow-hidden">
                        <img
                          src={cat.image}
                          alt={cat.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                      <div 
                        className="mt-4 text-[#2B865A] font-medium flex items-center justify-between"
                        style={{ fontFamily: 'Manrope, sans-serif' }}
                      >
                        <span>Смотреть товары</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-[#222021]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Популярные товары
                </h2>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                    <Filter width={16} height={16} />
                    <span style={{ fontFamily: 'Manrope, sans-serif' }}>Фильтры</span>
                  </button>
                  <button
                    onClick={() => navigate('/categories')}
                    className="text-[#2B865A] font-semibold hover:text-[#24704A] transition-colors flex items-center gap-2"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    Все товары
                    <span>→</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                {products.map((product) => (
                  <DesktopProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-100">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-around py-4">
              {[
                { label: 'Главная', icon: Home, path: '/main-page', active: true },
                { label: 'Избранное', icon: Heart, path: '/favorites', active: false },
                { label: 'Корзина', icon: Cart, path: '/cart', active: false },
                { label: 'Профиль', icon: User, path: '/profile', active: false },
              ].map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.path}
                    onClick={() => navigate(tab.path)}
                    className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <IconComponent
                      width={24}
                      height={24}
                      className={tab.active ? 'text-[#2B865A]' : 'text-gray-400 group-hover:text-[#2B865A]'}
                    />
                    <span
                      className={`text-xs font-medium ${tab.active ? 'text-[#2B865A]' : 'text-gray-500'} group-hover:text-[#2B865A]`}
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
      </div>

      <div className="md:hidden w-full h-full">
        <div className="flex min-h-screen w-full items-center justify-center bg-background">
          <div className="w-[390px] h-[844px] overflow-y-hidden relative overflow-hidden shadow-xl">
            <div className="h-full overflow-y-auto pb-[92px]">
              <div style={{
                backgroundColor: '#2B865A',
                borderBottomLeftRadius: '32px',
                borderBottomRightRadius: '32px',
                paddingTop: '46px',
                paddingBottom: '24px',
                paddingLeft: '16px',
                paddingRight: '16px',
              }}>
                <div className="flex items-center justify-end gap-2 mb-4">
                  <div style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: '14px',
                    color: '#FFFFFFCC',
                  }}>
                    г. Алматы
                  </div>

                  <button
                    type="button"
                    className="flex items-center gap-1 px-3 py-1 rounded-[16px] bg-[#E7F0EA]"
                  >
                    <span style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontWeight: 600,
                      fontSize: '13px',
                      color: '#2B865A',
                    }}>
                      170 Q
                    </span>
                  </button>
                </div>
                
                <div className="relative">
                  <div 
                    className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/90 backdrop-blur-sm cursor-pointer"
                    onClick={() => navigate('/search')}
                  >
                    <Search width={16} height={16} style={{ color: '#989C99' }} />
                    <div className="flex-1">
                      <div 
                        className="text-sm text-[#B4B7B5]"
                        style={{ fontFamily: 'Manrope, sans-serif' }}
                      >
                        Искать товары
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-4 pt-4 pb-6">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 style={{
                      fontWeight: 600,
                      fontSize: '20px',
                      fontFamily: 'Manrope, sans-serif',
                      color: '#222021',
                    }}>
                      Популярные категории
                    </h2>
                    <button
                      type="button"
                      style={{
                        fontFamily: 'Manrope, sans-serif',
                        fontSize: '14px',
                        color: '#2B865A',
                      }}
                      onClick={() => navigate('/categories')}
                    >
                      Все ›
                    </button>
                  </div>

                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {categories.slice(0, 3).map((cat: Category) => (
                      <div
                        key={cat.id}
                        className="flex-shrink-0 cursor-pointer w-32"
                        onClick={() => navigate(`/categories/${cat.slug}`)}
                        style={{
                          border: '1px solid #F4EDE6',
                          borderRadius: '16px',
                          padding: '12px',
                          backgroundColor: '#FFFDF9',
                          boxShadow: '0px 2px 8px rgba(0,0,0,0.04)',
                        }}
                      >
                        <img
                          src={cat.image}
                          alt={cat.title}
                          style={{
                            width: '100%',
                            height: '70px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                            marginBottom: '8px',
                          }}
                        />
                        <p style={{
                          fontFamily: 'Manrope, sans-serif',
                          fontSize: '14px',
                          fontWeight: 600,
                          color: '#635436',
                          textAlign: 'center',
                        }}>
                          {cat.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 style={{
                    fontWeight: 600,
                    fontSize: '20px',
                    fontFamily: 'Manrope, sans-serif',
                    color: '#222021',
                    marginBottom: '12px',
                  }}>
                    Популярные товары
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    {products.slice(0, 4).map((product) => (
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
            </div>

            <div className="absolute left-0 right-0 bottom-0 flex items-center justify-around" style={{
              marginLeft: '10px',
              width: '366px',
              bottom: '10px',
              height: '80px',
              padding: '10px 16px 20px',
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: '24px',
              borderTopRightRadius: '24px',
              boxShadow: '0px -4px 16px rgba(0,0,0,0.06)',
            }}>
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