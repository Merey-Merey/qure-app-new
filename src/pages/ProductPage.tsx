import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Cart, Heart, Home, Search, User, ArrowLeft, Star, Shield, Truck, Check } from 'iconoir-react';
import { type Product } from '../mocks/products';
import { type Category } from '../mocks/categories';
import { useCartLocal } from '../hooks/useCartLocal';
import ProductCard from '../components/ProductCard';
import { API_URLS } from '../services/api';

type TabKey = 'instruction' | 'analogs' | 'forms' | 'specs';

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleFavorite, cartCount, favoritesCount } = useCartLocal();

  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(1);
  const [activeTab, setActiveTab] = useState<TabKey>('instruction');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`${API_URLS.products}/${id}`),
      fetch(API_URLS.categories),
      fetch(API_URLS.products),
    ])
      .then(([productRes, categoriesRes, productsRes]) =>
        Promise.all([productRes.json(), categoriesRes.json(), productsRes.json()])
      )
      .then(([productData, categoriesData, productsData]) => {
        setProduct(productData);
        setCategories(categoriesData.slice(0, 3));
        setRelatedProducts(productsData.slice(0, 6));
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen text-sm">Загрузка...</div>;
  }

  if (!product) {
    return <div className="flex items-center justify-center min-h-screen text-sm">Товар не найден</div>;
  }

  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => Math.max(1, c - 1));

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity: count,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
    navigate('/cart');
  };

  const handleToggleFavorite = () => {
    toggleFavorite(product);
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="relative w-full min-h-screen  bg-background">
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
              <div className="flex items-start gap-4 mb-6">
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-white shadow-md flex-shrink-0">
                  <img src={product.image} alt={product.title} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-lg lg:text-xl font-bold leading-tight mb-2" style={{ fontFamily: 'Manrope, sans-serif', color: '#222021', lineHeight: '1.2' }}>
                    {product.title}
                  </h1>
                  <p className="text-sm text-[#4D7059] mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    {product.subtitle}
                  </p>
                  <div className="flex items-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} width={14} height={14} className={star <= 4 ? 'text-[#FFC107] fill-current' : 'text-[#E0E0E0]'} />
                    ))}
                    <span className="text-xs text-[#635436]" style={{ fontFamily: 'Manrope, sans-serif' }}>4.2 (124)</span>
                  </div>
                </div>
              </div>

              <div className="mb-6 p-4 rounded-xl bg-white/80 backdrop-blur-sm shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-end gap-2">
                      <span className="text-xl font-bold text-[#2B865A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        {product.price} ₸
                      </span>
                      {product.oldPrice && (
                        <span className="text-sm line-through text-[#B4B7B5]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                          {product.oldPrice} ₸
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#4D7059] mt-1" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      В наличии
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 bg-[#F8F8F8] rounded-full px-3 py-1.5">
                      <button onClick={decrement} className="w-6 h-6 flex items-center justify-center text-[#635436] hover:text-[#2B865A] rounded-full hover:bg-white transition-colors text-sm">-</button>
                      <span className="text-sm font-semibold min-w-[30px] text-center" style={{ fontFamily: 'Manrope, sans-serif', color: '#222021' }}>{count}</span>
                      <button onClick={increment} className="w-6 h-6 flex items-center justify-center text-[#635436] hover:text-[#2B865A] rounded-full hover:bg-white transition-colors text-sm">+</button>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-2.5 rounded-lg bg-[#2B865A] text-white font-semibold hover:bg-[#24704A] hover:shadow-md transition-all duration-300 text-sm"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    В корзину ({count})
                  </button>
                  <button
                    onClick={handleToggleFavorite}
                    className="w-12 h-12 rounded-lg border border-[#F0F0F0] flex items-center justify-center hover:border-[#2B865A] transition-colors"
                  >
                    <Heart width={20} height={20} className={isFavorite ? 'text-[#FE5F55] fill-current' : 'text-[#635436]'} />
                  </button>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 p-2.5 rounded-lg bg-white/50 backdrop-blur-sm">
                  <div className="w-8 h-8 rounded-lg bg-[#2B865A]/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="text-[#2B865A]" width={16} height={16} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm text-[#222021] truncate">Гарантия качества</h3>
                    <p className="text-xs text-[#4D7059] truncate">Все товары сертифицированы</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2.5 rounded-lg bg-white/50 backdrop-blur-sm">
                  <div className="w-8 h-8 rounded-lg bg-[#2B865A]/10 flex items-center justify-center flex-shrink-0">
                    <Truck className="text-[#2B865A]" width={16} height={16} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm text-[#222021] truncate">Бесплатная доставка</h3>
                    <p className="text-xs text-[#4D7059] truncate">При заказе от 10 000 ₸</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-white/50 flex items-center justify-center shadow">
                  <span className="text-[#2B865A] font-bold text-base" style={{ fontFamily: 'Manrope, sans-serif' }}>Q</span>
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#2B865A]" style={{ fontFamily: 'Manrope, sans-serif' }}>Qure</h2>
                  <p className="text-xs text-[#4D7059]">Health Assistant</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-3/5 h-full flex items-center justify-center p-8 lg:p-10">
          <div className="w-full max-w-4xl mx-auto">
            <div className="w-full rounded-xl bg-white/90 backdrop-blur-sm shadow-lg border border-white/20 p-6">
              <div className="mb-6">
                <div className="flex gap-4 border-b border-[#F0F0F0] pb-3">
                  {[
                    { key: 'instruction', label: 'Инструкция', icon: '📋' },
                    { key: 'analogs', label: 'Аналоги', icon: '⚖️' },
                    { key: 'forms', label: 'Формы', icon: '💊' },
                    { key: 'specs', label: 'Характеристики', icon: '📊' },
                  ].map((tab) => (
                    <button
                      key={tab.key as string}
                      onClick={() => setActiveTab(tab.key as TabKey)}
                      className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 text-sm ${
                        activeTab === tab.key
                          ? 'bg-[#2B865A] text-white'
                          : 'text-[#635436] hover:bg-[#F8F8F8]'
                      }`}
                      style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 500 }}
                    >
                      <span>{tab.icon}</span>
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="mt-6">
                  {activeTab === 'instruction' && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-bold mb-3" style={{ fontFamily: 'Manrope, sans-serif', color: '#222021' }}>
                          Способ применения
                        </h3>
                        <div className="space-y-3 text-sm text-[#4D7059]" style={{ fontFamily: 'Manrope, sans-serif', lineHeight: '1.6' }}>
                          <p><strong>Взрослым:</strong> обычная доза 250 мг 2 раза в день 7 дней.</p>
                          <p><strong>Детям:</strong> дозировка рассчитывается по массе тела.</p>
                          <div className="p-3 rounded-lg bg-[#E7F0EA]">
                            <p className="font-semibold text-sm text-[#2B865A]">⚠️ Важно:</p>
                            <p className="text-xs">Принимать за 1 час до еды или через 2 часа после еды.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'analogs' && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold mb-3" style={{ fontFamily: 'Manrope, sans-serif', color: '#222021' }}>
                        Аналоги
                      </h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="p-3 rounded-lg border border-[#F0F0F0] hover:border-[#2B865A] transition-colors">
                            <div className="flex items-center gap-2">
                              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#FCF8F5] to-[#E0EFBD] flex items-center justify-center">
                                <span className="text-[#2B865A] font-bold text-sm">А{i}</span>
                              </div>
                              <div className="min-w-0">
                                <h4 className="font-semibold text-sm text-[#222021] truncate" style={{ fontFamily: 'Manrope, sans-serif' }}>
                                  Аналог {i}
                                </h4>
                                <p className="text-xs text-[#4D7059]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                                  От 1 500 ₸
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'forms' && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold mb-3" style={{ fontFamily: 'Manrope, sans-serif', color: '#222021' }}>
                        Формы выпуска
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-[#F8F8F8]">
                          <div>
                            <p className="font-semibold text-sm text-[#222021]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                              Таблетки
                            </p>
                            <p className="text-xs text-[#4D7059]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                              Упаковка 30 шт
                            </p>
                          </div>
                          <Check className="text-[#2B865A]" width={16} height={16} />
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'specs' && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold mb-3" style={{ fontFamily: 'Manrope, sans-serif', color: '#222021' }}>
                        Характеристики
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <div className="flex justify-between py-2 border-b border-[#F0F0F0]">
                            <span className="text-xs text-[#635436]" style={{ fontFamily: 'Manrope, sans-serif' }}>Форма выпуска</span>
                            <span className="font-semibold text-sm text-[#222021]" style={{ fontFamily: 'Manrope, sans-serif' }}>Таблетки</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-[#F0F0F0]">
                            <span className="text-xs text-[#635436]" style={{ fontFamily: 'Manrope, sans-serif' }}>Дозировка</span>
                            <span className="font-semibold text-sm text-[#222021]" style={{ fontFamily: 'Manrope, sans-serif' }}>500 мг</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between py-2 border-b border-[#F0F0F0]">
                            <span className="text-xs text-[#635436]" style={{ fontFamily: 'Manrope, sans-serif' }}>Количество</span>
                            <span className="font-semibold text-sm text-[#222021]" style={{ fontFamily: 'Manrope, sans-serif' }}>30 шт</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-[#F0F0F0]">
                            <span className="text-xs text-[#635436]" style={{ fontFamily: 'Manrope, sans-serif' }}>Срок годности</span>
                            <span className="font-semibold text-sm text-[#222021]" style={{ fontFamily: 'Manrope, sans-serif' }}>3 года</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold" style={{ fontFamily: 'Manrope, sans-serif', color: '#222021' }}>
                    Популярные категории
                  </h2>
                  <button onClick={() => navigate('/categories')} className="text-sm text-[#2B865A] font-semibold hover:text-[#24704A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Все →
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories.map((cat) => (
                    <button key={cat.id} onClick={() => navigate(`/categories/${cat.slug}`)} className="group relative rounded-lg bg-white border border-[#F0F0F0] p-3 hover:border-[#2B865A] hover:shadow-md transition-all duration-300">
                      <div className="aspect-square mb-2 overflow-hidden rounded-lg">
                        <img src={cat.image} alt={cat.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <h3 className="text-sm font-semibold text-center truncate" style={{ fontFamily: 'Manrope, sans-serif', color: '#222021' }}>
                        {cat.title}
                      </h3>
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-[#2B865A] font-bold text-xs">→</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold" style={{ fontFamily: 'Manrope, sans-serif', color: '#222021' }}>
                    Похожие товары
                  </h2>
                  <button onClick={() => navigate(`/categories/${product.categorySlug}/${product.subSlug}`)} className="text-sm text-[#2B865A] font-semibold hover:text-[#24704A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Все →
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {relatedProducts.map((p) => (
                    <div key={p.id} onClick={() => navigate(`/product/${p.id}`)} className="cursor-pointer transform hover:-translate-y-1 transition-transform duration-300">
                      <ProductCard product={p} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden w-full min-h-screen bg-background">
        <div className="flex min-h-screen w-full items-center justify-center">
          <div className="w-full h-full overflow-y-auto pb-20 bg-white">
            <div style={{
              backgroundColor: '#2B865A',
              borderBottomLeftRadius: '20px',
              borderBottomRightRadius: '20px',
              paddingTop: '36px',
              paddingBottom: '20px',
              paddingLeft: '16px',
              paddingRight: '16px',
            }}>
              <div className="flex items-center justify-between mb-3">
                <button onClick={() => navigate(-1)} className="flex items-center gap-1">
                  <ArrowLeft width={16} height={16} style={{ color: 'white' }} />
                  <span style={{ fontFamily: 'Manrope, sans-serif', color: 'white', fontSize: '14px' }}>Назад</span>
                </button>
                <div className="flex items-center gap-2">
                  <div style={{ fontFamily: 'Manrope, sans-serif', color: '#FFFFFFCC', fontSize: '12px' }}>
                    г. Алматы
                  </div>
                  <button type="button" className="flex items-center gap-1 px-2 py-1 rounded-[14px] bg-[#E7F0EA]">
                    <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 600, fontSize: '11px', color: '#2B865A' }}>
                      170 Q
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <div className="flex flex-1 items-center gap-2 px-3 py-2" style={{ borderRadius: '8px', backgroundColor: '#F7F2EB' }}>
                  <Search width={14} height={14} style={{ color: '#989C99' }} />
                  <input type="text" placeholder="Искать товары" className="flex-1 bg-transparent outline-none placeholder:text-[#B4B7B5] text-sm" style={{ fontFamily: 'Manrope, sans-serif', color: '#222021' }} />
                </div>
                <button onClick={handleToggleFavorite} className="w-9 h-9 flex items-center justify-center rounded-full bg-white/20">
                  <Heart width={18} height={18} style={{ color: isFavorite ? '#FE5F55' : '#FFFFFF' }} />
                </button>
              </div>
            </div>

            <div className="p-4 space-y-4">
              <div className="relative">
                <img src={product.image} alt={product.title} className="w-full h-40 object-contain mb-3 rounded-lg bg-white p-3 shadow-sm" />
                {product.oldPrice && (
                  <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-[#FE5F55] text-white text-xs font-semibold" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Скидка
                  </div>
                )}
              </div>

              <div className="flex items-center gap-1 mb-3">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} width={12} height={12} className={star <= 4 ? 'text-[#FFC107] fill-current' : 'text-[#E0E0E0]'} />
                  ))}
                </div>
                <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: '11px', color: '#635436' }}>
                  4.2 (124)
                </span>
              </div>

              <div className="p-3 bg-[#FCF8F5] rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-end gap-2">
                    <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: '20px', fontWeight: 700, color: '#2B865A' }}>
                      {product.price} ₸
                    </span>
                    {product.oldPrice && (
                      <span className="line-through" style={{ fontFamily: 'Manrope, sans-serif', fontSize: '14px', color: '#B4B7B5' }}>
                        {product.oldPrice} ₸
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-[#4D7059]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    В наличии
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex-1 flex items-center gap-2 bg-white rounded-full px-3 py-1.5">
                    <button onClick={decrement} style={{ fontFamily: 'Manrope, sans-serif', fontSize: '16px', color: '#222021', minWidth: '24px' }}>
                      -
                    </button>
                    <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: '14px', color: '#222021', flex: 1, textAlign: 'center' }}>
                      {count} шт
                    </span>
                    <button onClick={increment} style={{ fontFamily: 'Manrope, sans-serif', fontSize: '16px', color: '#222021', minWidth: '24px' }}>
                      +
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-2.5 rounded-full bg-[#2B865A] text-white font-semibold text-sm"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    🛒 В корзину
                  </button>
                </div>
              </div>

              <button
                onClick={handleToggleFavorite}
                className="w-full py-2.5 border border-[#F0F0F0] rounded-xl flex items-center justify-center gap-1 hover:border-[#2B865A] text-sm"
              >
                <Heart width={18} height={18} className={isFavorite ? 'text-[#FE5F55] fill-current' : 'text-[#635436]'} />
                <span style={{ fontFamily: 'Manrope, sans-serif' }}>В избранное</span>
              </button>

              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="flex items-center gap-1.5 p-2 rounded-lg bg-[#E7F0EA]">
                  <Shield width={14} height={14} className="text-[#2B865A]" />
                  <span className="text-xs text-[#2B865A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Гарантия
                  </span>
                </div>
                <div className="flex items-center gap-1.5 p-2 rounded-lg bg-[#E7F0EA]">
                  <Truck width={14} height={14} className="text-[#2B865A]" />
                  <span className="text-xs text-[#2B865A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Доставка
                  </span>
                </div>
              </div>

              <div className="flex gap-1 border-b border-[#F0ECE6] pb-2 overflow-x-auto">
                {[
                  { key: 'instruction', label: 'Инструкция' },
                  { key: 'analogs', label: 'Аналоги' },
                  { key: 'forms', label: 'Формы' },
                  { key: 'specs', label: 'Характеристики' },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as TabKey)}
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: '12px',
                      fontWeight: activeTab === tab.key ? 600 : 500,
                      color: activeTab === tab.key ? '#2B865A' : '#635436',
                      borderBottom: activeTab === tab.key ? '2px solid #2B865A' : '2px solid transparent',
                      paddingBottom: '3px',
                      paddingLeft: '6px',
                      paddingRight: '6px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="mt-2 text-xs p-2.5 bg-[#FCF8F5] rounded-lg" style={{ fontFamily: 'Manrope, sans-serif', color: '#222021' }}>
                {activeTab === 'instruction' && (
                  <>
                    <p className="mb-1.5">
                      <strong>Взрослым:</strong> 250 мг 2 раза в день 7 дней.
                    </p>
                    <p>
                      <strong>Хранение:</strong> при комнатной температуре.
                    </p>
                  </>
                )}
                {activeTab === 'analogs' && (
                  <p>Аналоги препарата из вашего API</p>
                )}
                {activeTab === 'forms' && (
                  <p>Форма выпуска: таблетки</p>
                )}
                {activeTab === 'specs' && (
                  <div className="space-y-1">
                    <p>Форма: таблетки</p>
                    <p>Вещество: Кларитромицин</p>
                    <p>Количество: 30 шт</p>
                  </div>
                )}
              </div>

              <div className="pt-3">
                <div className="flex items-center justify-between mb-3">
                  <h2 style={{ fontWeight: 600, fontSize: '16px', fontFamily: 'Manrope, sans-serif', color: '#222021' }}>
                    Популярные категории
                  </h2>
                  <button type="button" style={{ fontFamily: 'Manrope, sans-serif', fontSize: '11px', color: '#2B865A' }} onClick={() => navigate('/categories')}>
                    Все ›
                  </button>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-1">
                  {categories.map((cat) => (
                    <div key={cat.id} className="flex-shrink-0 w-28" style={{ border: '1px solid #F4EDE6', borderRadius: '12px', padding: '10px', backgroundColor: '#FFFDF9', boxShadow: '0px 2px 6px rgba(0,0,0,0.04)' }}>
                      <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '12px', fontWeight: 600, color: '#635436', marginBottom: '6px', height: '32px', overflow: 'hidden', lineHeight: '1.2' }}>
                        {cat.title}
                      </p>
                      <img src={cat.image} alt={cat.title} style={{ width: '100%', height: '60px', objectFit: 'cover', borderRadius: '6px' }} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3">
                <h2 className="mb-2" style={{ fontWeight: 600, fontSize: '16px', fontFamily: 'Manrope, sans-serif', color: '#222021' }}>
                  Похожие товары
                </h2>
                <div className="grid grid-cols-2 gap-2">
                  {relatedProducts.slice(0, 4).map((p) => (
                    <div key={p.id} onClick={() => navigate(`/product/${p.id}`)} className="cursor-pointer">
                      <ProductCard product={p} />
                    </div>
                  ))}
                </div>
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
              { label: 'Главная\nстраница', icon: Home, path: '/main-page', active: false, count: 0 },
              { label: 'Избранное', icon: Heart, path: '/favorites', active: false, count: favoritesCount },
              { label: 'Корзина', icon: Cart, path: '/cart', active: false, count: cartCount },
              { label: 'Личный\nкабинет', icon: User, path: '/profile', active: false, count: 0 },
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.path}
                  onClick={() => navigate(tab.path)}
                  className="relative flex flex-col items-center gap-1"
                  style={{ whiteSpace: 'pre-line' }}
                >
                  <div className="relative">
                    <IconComponent width={18} height={18} style={{ color: tab.active ? '#2B865A' : '#669B78' }} />
                    {tab.count > 0 && (
                      <span className="absolute -top-1 -right-1 bg-[#FE5F55] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                        {tab.count}
                      </span>
                    )}
                  </div>
                  <span style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: '9px',
                    fontWeight: tab.active ? 700 : 500,
                    color: tab.active ? '#2B865A' : '#669B78',
                    lineHeight: '1.2',
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
  );
}