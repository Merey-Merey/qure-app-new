import { useCartLocal } from '../hooks/useCartLocal';
import { useNavigate } from 'react-router-dom';
import { Cart, Heart, Home, Search, User, MapPin, Filter, Star } from 'iconoir-react';
import { type Category } from '../mocks/categories';
import { type Product } from '../mocks/products';
import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { API_URLS } from '../services/api';

export default function MainPage() {
  const navigate = useNavigate();
  const { cartCount, favoritesCount, addToCart, toggleFavorite } = useCartLocal(); 
  
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
    return <div className="flex items-center justify-center min-h-screen text-sm">Загрузка...</div>;
  }

  const DesktopProductCard = ({ product }: { product: Product }) => {
    const navigate = useNavigate();

    const isFavorite = () => {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return favorites.some((item: any) => item.id === product.id);
    };

    const handleAddToCart = (e: React.MouseEvent) => {
      e.stopPropagation();
      addToCart(product); 
      navigate('/cart');
    };

    const handleFavorite = (e: React.MouseEvent) => {
      e.stopPropagation();
      toggleFavorite(product); 
    };

    return (
      <div 
        className="group cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 overflow-hidden border border-gray-100"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <div className="relative h-48 bg-gradient-to-br from-[#FCF8F5] to-[#E0EFBD]/30">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
          />
          
          {product.discountPercent && (
            <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-[#E7F0EA] text-[#2B865A] font-semibold text-xs">
              -{product.discountPercent}%
            </div>
          )}
          
          {product.prescriptionRequired && (
            <div className="absolute top-2 left-2 px-2 py-1 rounded-full bg-[#FFE0E0] text-[#FE5F55] font-medium text-xs">
              По рецепту
            </div>
          )}
          
          <button 
            onClick={handleFavorite}
            className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white hover:scale-110 transition-all"
          >
            <Heart 
              width={16} 
              height={16} 
              className={isFavorite() 
                ? 'text-[#FE5F55] fill-current' 
                : 'text-gray-400 hover:text-[#FE5F55]'}
            />
          </button>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-[#222021] mb-1.5 line-clamp-2 text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>
            {product.title}
          </h3>
          
          <p className="text-xs text-[#635436] mb-2.5 line-clamp-1" style={{ fontFamily: 'Manrope, sans-serif' }}>
            {product.subtitle}
          </p>
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-[#2B865A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                {product.price} ₸
              </span>
              {product.oldPrice && (
                <span className="text-xs text-gray-400 line-through" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {product.oldPrice} ₸
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-0.5">
              <Star width={12} height={12} className="text-yellow-400 fill-yellow-400" />
              <span className="text-xs text-gray-600">4.8</span>
            </div>
          </div>
          
          <button 
            onClick={handleAddToCart}
            className="w-full py-2.5 rounded-lg bg-[#2B865A] text-white font-semibold hover:bg-[#24704A] transition-colors text-sm"
          >
            🛒 В корзину
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full min-h-screen bg-background">
      <div className="hidden md:block w-full h-full">
        <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/main-page')}>
                <div className="w-8 h-8 rounded-lg bg-[#2B865A]/10 flex items-center justify-center">
                  <span className="text-[#2B865A] font-bold text-lg" style={{ fontFamily: 'Manrope, sans-serif' }}>Q</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#2B865A]" style={{ fontFamily: 'Manrope, sans-serif' }}>Qure</h2>
                  <p className="text-xs text-[#4D7059]" style={{ fontFamily: 'Manrope, sans-serif' }}>Health Assistant</p>
                </div>
              </div>

              <div className="flex-1 max-w-2xl mx-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" width={16} height={16} />
                  <input
                    type="text"
                    placeholder="Искать товары, категории..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-gray-100 focus:outline-none focus:ring-1 focus:ring-[#2B865A]/50 focus:bg-white text-sm"
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

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-[#2B865A] text-sm">
                  <MapPin width={16} height={16} />
                  <span className="font-medium" style={{ fontFamily: 'Manrope, sans-serif' }}>г. Алматы</span>
                </div>
                
                <button 
                  onClick={() => navigate('/favorites')}
                  className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E7F0EA] text-[#2B865A] font-semibold hover:bg-[#2B865A] hover:text-white transition-colors text-sm"
                >
                  <Heart width={16} height={16} />
                  <span>{favoritesCount}</span>
                  {favoritesCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#FE5F55] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                      {favoritesCount > 99 ? '99+' : favoritesCount}
                    </span>
                  )}
                </button>
                
                <button 
                  onClick={() => navigate('/cart')}
                  className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2B865A] text-white font-semibold hover:shadow-md transition-all text-sm"
                >
                  <Cart width={16} height={16} />
                  <span>{cartCount}</span>
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                      {cartCount > 99 ? '99+' : cartCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#222021]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Популярные категории
                </h2>
                <button
                  onClick={() => navigate('/categories')}
                  className="text-[#2B865A] font-semibold hover:text-[#24704A] transition-colors flex items-center gap-1 text-sm"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  Все категории <span>→</span>
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {categories.map((cat) => (
                  <div key={cat.id} onClick={() => navigate(`/categories/${cat.slug}`)} className="group cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 overflow-hidden border border-gray-100">
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-[#222021] mb-2.5" style={{ fontFamily: 'Manrope, sans-serif' }}>{cat.title}</h3>
                      <div className="relative h-40 rounded-lg overflow-hidden">
                        <img src={cat.image} alt={cat.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                      <div className="mt-3 text-[#2B865A] font-medium flex items-center justify-between text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        <span>Смотреть товары</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#222021]" style={{ fontFamily: 'Manrope, sans-serif' }}>Популярные товары</h2>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-sm">
                    <Filter width={14} height={14} />
                    <span style={{ fontFamily: 'Manrope, sans-serif' }}>Фильтры</span>
                  </button>
                  <button onClick={() => navigate('/categories')} className="text-[#2B865A] font-semibold hover:text-[#24704A] transition-colors flex items-center gap-1 text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Все товары <span>→</span>
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {products.map((product) => (
                  <DesktopProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-sm border-t border-gray-100">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-around py-3">
              {[
                { label: 'Главная', icon: Home, path: '/main-page', active: true, count: 0 },
                { label: 'Избранное', icon: Heart, path: '/favorites', active: false, count: favoritesCount },
                { label: 'Корзина', icon: Cart, path: '/cart', active: false, count: cartCount },
                { label: 'Профиль', icon: User, path: '/profile', active: false, count: 0 },
              ].map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button key={tab.path} onClick={() => navigate(tab.path)} className="flex flex-col items-center gap-0.5 p-1.5 rounded-lg hover:bg-gray-50 transition-colors group relative">
                    <div className="relative">
                      <IconComponent
                        width={20}
                        height={20}
                        className={tab.active ? 'text-[#2B865A]' : 'text-gray-400 group-hover:text-[#2B865A]'}
                      />
                      {tab.count > 0 && (
                        <span className="absolute -top-1 -right-1 bg-[#FE5F55] text-white text-[10px] rounded-full w-3.5 h-3.5 flex items-center justify-center">
                          {tab.count > 99 ? '99+' : tab.count}
                        </span>
                      )}
                    </div>
                    <span className={`text-[11px] font-medium ${tab.active ? 'text-[#2B865A]' : 'text-gray-500'} group-hover:text-[#2B865A]`} style={{ fontFamily: 'Manrope, sans-serif' }}>
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
            <div className="h-full overflow-y-auto pb-[80px]">
              <div style={{
                backgroundColor: '#2B865A',
                borderBottomLeftRadius: '24px',
                borderBottomRightRadius: '24px',
                paddingTop: '40px',
                paddingBottom: '20px',
                paddingLeft: '16px',
                paddingRight: '16px',
              }}>
                <div className="flex items-center justify-end gap-2 mb-3">
                  <div style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: '13px',
                    color: '#FFFFFFCC',
                  }}>
                    г. Алматы
                  </div>
                  <button
                    type="button"
                    className="flex items-center gap-1 px-2.5 py-1 rounded-[14px] bg-[#E7F0EA]"
                  >
                    <span style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontWeight: 600,
                      fontSize: '12px',
                      color: '#2B865A',
                    }}>
                      170 Q
                    </span>
                  </button>
                </div>
                
                <div className="relative">
                  <div 
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white/90 backdrop-blur-sm cursor-pointer"
                    onClick={() => navigate('/search')}
                  >
                    <Search width={14} height={14} style={{ color: '#989C99' }} />
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

              <div className="px-3 pt-3 pb-5">
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-3">
                    <h2 style={{
                      fontWeight: 600,
                      fontSize: '18px',
                      fontFamily: 'Manrope, sans-serif',
                      color: '#222021',
                    }}>
                      Популярные категории
                    </h2>
                    <button
                      type="button"
                      style={{
                        fontFamily: 'Manrope, sans-serif',
                        fontSize: '13px',
                        color: '#2B865A',
                      }}
                      onClick={() => navigate('/categories')}
                    >
                      Все ›
                    </button>
                  </div>

                  <div className="flex gap-2.5 overflow-x-auto pb-2">
                    {categories.slice(0, 3).map((cat: Category) => (
                      <div
                        key={cat.id}
                        className="flex-shrink-0 cursor-pointer w-28"
                        onClick={() => navigate(`/categories/${cat.slug}`)}
                        style={{
                          border: '1px solid #F4EDE6',
                          borderRadius: '14px',
                          padding: '10px',
                          backgroundColor: '#FFFDF9',
                          boxShadow: '0px 1px 6px rgba(0,0,0,0.04)',
                        }}
                      >
                        <img
                          src={cat.image}
                          alt={cat.title}
                          style={{
                            width: '100%',
                            height: '60px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                            marginBottom: '6px',
                          }}
                        />
                        <p style={{
                          fontFamily: 'Manrope, sans-serif',
                          fontSize: '13px',
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
                    fontSize: '18px',
                    fontFamily: 'Manrope, sans-serif',
                    color: '#222021',
                    marginBottom: '10px',
                  }}>
                    Популярные товары
                  </h2>
                  <div className="grid grid-cols-2 gap-2.5">
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
              bottom: '8px',
              height: '68px',
              padding: '8px 12px 16px',
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: '20px',
              borderTopRightRadius: '20px',
              boxShadow: '0px -3px 12px rgba(0,0,0,0.06)',
            }}>
              {[
                { label: 'Главная\nстраница', icon: Home, path: '/main-page', active: true, count: 0 },
                { label: 'Избранное', icon: Heart, path: '/favorites', active: false, count: favoritesCount },
                { label: 'Корзина', icon: Cart, path: '/cart', active: false, count: cartCount },
                { label: 'Личный\nкабинет', icon: User, path: '/profile', active: false, count: 0 },
              ].map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.path}
                    type="button"
                    onClick={() => navigate(tab.path)}
                    className="relative flex flex-col items-center gap-0.5 p-1.5"
                    style={{
                      whiteSpace: 'pre-line',
                    }}
                  >
                    <div className="relative">
                      <IconComponent
                        width={18}
                        height={18}
                        style={{
                          color: tab.active ? '#2B865A' : '#669B78',
                        }}
                      />
                      {tab.count > 0 && (
                        <span className="absolute -top-1 -right-1 bg-[#FE5F55] text-white text-[10px] rounded-full w-3.5 h-3.5 flex items-center justify-center">
                          {tab.count > 9 ? '9+' : tab.count}
                        </span>
                      )}
                    </div>
                    <span
                      style={{
                        lineHeight: '1.1',
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
    </div>
  );
}