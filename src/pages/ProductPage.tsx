// src/pages/ProductPage.tsx - ✅ useCartLocal + МОБИЛЬНАЯ ВЕРСИЯ!
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Cart, Heart, Home, Search, User, ArrowLeft, Star, Package, Shield, Truck, Check } from 'iconoir-react';
import { type Product } from '../mocks/products';
import { type Category } from '../mocks/categories';
import { useCartLocal } from '../hooks/useCartLocal'; // ✅ ИМПОРТ!
import ProductCard from '../components/ProductCard';
import { API_URLS } from '../services/api';

type TabKey = 'instruction' | 'analogs' | 'forms' | 'specs';

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleFavorite, cartCount, favoritesCount } = useCartLocal(); // ✅ useCartLocal!

  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(1);
  const [activeTab, setActiveTab] = useState<TabKey>('instruction');
  const [isFavorite, setIsFavorite] = useState(false);

  // ✅ Загрузка продукта
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
    return <div className="flex items-center justify-center min-h-screen">Загрузка...</div>;
  }

  if (!product) {
    return <div className="flex items-center justify-center min-h-screen">Товар не найден</div>;
  }

  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => Math.max(1, c - 1));

  // ✅ Добавление в корзину с количеством
  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity: count,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any); // ✅ useCartLocal с count!
    navigate('/cart');
  };

  // ✅ ФУНКЦИЯ ИЗБРАННОГО
  const handleToggleFavorite = () => {
    toggleFavorite(product);
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-background">
      {/* ✅ ДЕСКТОП ВЕРСИЯ */}
      <div className="hidden md:flex w-full h-screen">
        <div className="w-2/5 h-full flex flex-col items-center p-12 xl:p-16 2xl:p-20 bg-gradient-to-b from-[#FCF8F5] to-[#E0EFBD]/30">
          <div className="max-w-md mx-auto w-full">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-3 mb-12 text-[#2B865A] hover:text-[#24704A] transition-colors group"
              style={{ fontFamily: 'Manrope, sans-serif', fontSize: '16px' }}
            >
              <ArrowLeft className="transform group-hover:-translate-x-1 transition-transform" width={20} height={20} />
              Назад к товарам
            </button>

            <div className="mb-12">
              <div className="flex items-start gap-6 mb-8">
                <div className="w-32 h-32 rounded-2xl overflow-hidden bg-white shadow-lg">
                  <img src={product.image} alt={product.title} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl xl:text-3xl font-bold leading-tight mb-2" style={{ fontFamily: 'Manrope, sans-serif', color: '#222021', lineHeight: '1.2' }}>
                    {product.title}
                  </h1>
                  <p className="text-base text-[#4D7059] mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    {product.subtitle}
                  </p>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} width={16} height={16} className={star <= 4 ? 'text-[#FFC107] fill-current' : 'text-[#E0E0E0]'} />
                      ))}
                    </div>
                    <span className="text-sm text-[#635436]" style={{ fontFamily: 'Manrope, sans-serif' }}>4.2 (124 отзыва)</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-8 p-6 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="flex items-end gap-3">
                      <span className="text-3xl font-bold text-[#2B865A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        {product.price} ₸
                      </span>
                      {product.oldPrice && (
                        <span className="text-lg line-through text-[#B4B7B5]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                          {product.oldPrice} ₸
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[#4D7059] mt-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      В наличии • Доставка 1-2 дня
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-3 bg-[#F8F8F8] rounded-full px-4 py-2">
                      <button onClick={decrement} className="w-8 h-8 flex items-center justify-center text-[#635436] hover:text-[#2B865A] rounded-full hover:bg-white transition-colors">-</button>
                      <span className="text-lg font-semibold min-w-[40px] text-center" style={{ fontFamily: 'Manrope, sans-serif', color: '#222021' }}>{count}</span>
                      <button onClick={increment} className="w-8 h-8 flex items-center justify-center text-[#635436] hover:text-[#2B865A] rounded-full hover:bg-white transition-colors">+</button>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button 
                    onClick={handleAddToCart}
                    className="flex-1 py-4 rounded-xl bg-[#2B865A] text-white font-semibold hover:bg-[#24704A] hover:shadow-lg transition-all duration-300"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    Добавить в корзину ({count})
                  </button>
                  <button
                    onClick={handleToggleFavorite}
                    className="w-14 h-14 rounded-xl border-2 border-[#F0F0F0] flex items-center justify-center hover:border-[#2B865A] transition-colors"
                  >
                    <Heart width={24} height={24} className={isFavorite ? 'text-[#FE5F55] fill-current' : 'text-[#635436]'} />
                  </button>
                </div>
              </div>

              {/* Преимущества */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/50 backdrop-blur-sm">
                  <div className="w-10 h-10 rounded-lg bg-[#2B865A]/10 flex items-center justify-center">
                    <Shield className="text-[#2B865A]" width={20} height={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#222021]">Гарантия качества</h3>
                    <p className="text-sm text-[#4D7059]">Все товары сертифицированы</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/50 backdrop-blur-sm">
                  <div className="w-10 h-10 rounded-lg bg-[#2B865A]/10 flex items-center justify-center">
                    <Truck className="text-[#2B865A]" width={20} height={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#222021]">Бесплатная доставка</h3>
                    <p className="text-sm text-[#4D7059]">При заказе от 10 000 ₸</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/50 flex items-center justify-center shadow">
                  <span className="text-[#2B865A] font-bold text-lg" style={{ fontFamily: 'Manrope, sans-serif' }}>Q</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#2B865A]" style={{ fontFamily: 'Manrope, sans-serif' }}>Qure</h2>
                  <p className="text-sm text-[#4D7059]">Health Assistant</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-3/5 h-full flex items-center justify-center p-12 xl:p-16 2xl:p-20">
          {/* Табы и контент */}
          <div className="w-full max-w-6xl mx-auto">
            <div className="w-full rounded-2xl bg-white/90 backdrop-blur-sm shadow-xl border border-white/20 p-8">
              {/* Табы */}
              <div className="mb-8">
                <div className="flex gap-6 border-b border-[#F0F0F0] pb-4">
                  {[
                    { key: 'instruction', label: 'Инструкция', icon: '📋' },
                    { key: 'analogs', label: 'Аналоги', icon: '⚖️' },
                    { key: 'forms', label: 'Формы выпуска', icon: '💊' },
                    { key: 'specs', label: 'Характеристики', icon: '📊' },
                  ].map((tab) => (
                    <button
                      key={tab.key as string}
                      onClick={() => setActiveTab(tab.key as TabKey)}
                      className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 ${
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

                {/* Контент табов */}
                <div className="mt-8">
                  {activeTab === 'instruction' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Manrope, sans-serif', color: '#222021' }}>
                          Способ применения и дозы
                        </h3>
                        <div className="space-y-4 text-[#4D7059]" style={{ fontFamily: 'Manrope, sans-serif', lineHeight: '1.6' }}>
                          <p><strong>Взрослым:</strong> обычная доза 250 мг 2 раза в день 7 дней. При необходимости до 500 мг 2 раза в день до 14 дней при тяжёлых инфекциях.</p>
                          <p><strong>Детям:</strong> дозировка рассчитывается исходя из массы тела, по назначению врача.</p>
                          <div className="p-4 rounded-xl bg-[#E7F0EA]">
                            <p className="font-semibold text-[#2B865A]">⚠️ Важно:</p>
                            <p>Принимать за 1 час до еды или через 2 часа после еды. Не разжевывать, запивать достаточным количеством воды.</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Manrope, sans-serif', color: '#222021' }}>
                          Условия хранения
                        </h3>
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-[#FCF8F5]">
                          <Package className="text-[#2B865A] mt-1" />
                          <p className="text-[#4D7059]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                            Хранить в недоступном для детей месте, при комнатной температуре (15-25°C).<br />
                            Срок годности: 3 года с даты производства.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'analogs' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Manrope, sans-serif', color: '#222021' }}>
                        Аналоги препарата
                      </h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="p-4 rounded-xl border-2 border-[#F0F0F0] hover:border-[#2B865A] transition-colors">
                            <div className="flex items-center gap-3">
                              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#FCF8F5] to-[#E0EFBD] flex items-center justify-center">
                                <span className="text-[#2B865A] font-bold">А{i}</span>
                              </div>
                              <div>
                                <h4 className="font-semibold text-[#222021]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                                  Аналог препарата {i}
                                </h4>
                                <p className="text-sm text-[#4D7059]" style={{ fontFamily: 'Manrope, sans-serif' }}>
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
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Manrope, sans-serif', color: '#222021' }}>
                        Формы выпуска
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-xl bg-[#F8F8F8]">
                          <div>
                            <p className="font-semibold text-[#222021]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                              Таблетки в плёночной оболочке
                            </p>
                            <p className="text-sm text-[#4D7059]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                              Упаковка 30 шт
                            </p>
                          </div>
                          <Check className="text-[#2B865A]" />
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-xl border-2 border-[#F0F0F0]">
                          <div>
                            <p className="font-semibold text-[#222021]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                              Капсулы
                            </p>
                            <p className="text-sm text-[#4D7059]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                              Упаковка 20 шт
                            </p>
                          </div>
                          <span className="text-[#B4B7B5]">—</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'specs' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Manrope, sans-serif', color: '#222021' }}>
                        Технические характеристики
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div className="flex justify-between py-2 border-b border-[#F0F0F0]">
                            <span className="text-[#635436]" style={{ fontFamily: 'Manrope, sans-serif' }}>Форма выпуска</span>
                            <span className="font-semibold text-[#222021]" style={{ fontFamily: 'Manrope, sans-serif' }}>Таблетки</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-[#F0F0F0]">
                            <span className="text-[#635436]" style={{ fontFamily: 'Manrope, sans-serif' }}>Активное вещество</span>
                            <span className="font-semibold text-[#222021]" style={{ fontFamily: 'Manrope, sans-serif' }}>Кларитромицин</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-[#F0F0F0]">
                            <span className="text-[#635436]" style={{ fontFamily: 'Manrope, sans-serif' }}>Дозировка</span>
                            <span className="font-semibold text-[#222021]" style={{ fontFamily: 'Manrope, sans-serif' }}>500 мг</span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between py-2 border-b border-[#F0F0F0]">
                            <span className="text-[#635436]" style={{ fontFamily: 'Manrope, sans-serif' }}>Количество в упаковке</span>
                            <span className="font-semibold text-[#222021]" style={{ fontFamily: 'Manrope, sans-serif' }}>30 шт</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-[#F0F0F0]">
                            <span className="text-[#635436]" style={{ fontFamily: 'Manrope, sans-serif' }}>Производитель</span>
                            <span className="font-semibold text-[#222021]" style={{ fontFamily: 'Manrope, sans-serif' }}>Вертекс, Россия</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-[#F0F0F0]">
                            <span className="text-[#635436]" style={{ fontFamily: 'Manrope, sans-serif' }}>Срок годности</span>
                            <span className="font-semibold text-[#222021]" style={{ fontFamily: 'Manrope, sans-serif' }}>3 года</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Категории и похожие товары */}
              <div className="mb-10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold" style={{ fontFamily: 'Manrope, sans-serif', color: '#222021' }}>
                    Популярные категории
                  </h2>
                  <button onClick={() => navigate('/categories')} className="text-[#2B865A] font-semibold hover:text-[#24704A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Все категории →
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categories.map((cat) => (
                    <button key={cat.id} onClick={() => navigate(`/categories/${cat.slug}`)} className="group relative rounded-2xl bg-white border-2 border-[#F0F0F0] p-6 hover:border-[#2B865A] hover:shadow-lg transition-all duration-300">
                      <div className="aspect-square mb-4 overflow-hidden rounded-xl">
                        <img src={cat.image} alt={cat.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <h3 className="text-lg font-semibold text-center" style={{ fontFamily: 'Manrope, sans-serif', color: '#222021' }}>
                        {cat.title}
                      </h3>
                      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-[#2B865A] font-bold">→</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold" style={{ fontFamily: 'Manrope, sans-serif', color: '#222021' }}>
                    Похожие товары
                  </h2>
                  <button onClick={() => navigate(`/categories/${product.categorySlug}/${product.subSlug}`)} className="text-[#2B865A] font-semibold hover:text-[#24704A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Все товары →
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* ✅ МОБИЛЬНАЯ ВЕРСИЯ */}
      <div className="md:hidden w-full min-h-screen bg-background">
        <div className="flex min-h-screen w-full items-center justify-center">
          <div className="w-[390px] h-[844px] overflow-y-auto relative shadow-xl bg-white">
            {/* Мобильный хедер */}
            <div style={{
              backgroundColor: '#2B865A',
              borderBottomLeftRadius: '32px',
              borderBottomRightRadius: '32px',
              paddingTop: '46px',
              paddingBottom: '24px',
              paddingLeft: '16px',
              paddingRight: '16px',
            }}>
              <div className="flex items-center justify-between mb-4">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2">
                  <ArrowLeft width={20} height={20} style={{ color: 'white' }} />
                  <span style={{ fontFamily: 'Manrope, sans-serif', color: 'white', fontSize: '16px' }}>Назад</span>
                </button>
                <div className="flex items-center gap-3">
                  <div style={{ fontFamily: 'Manrope, sans-serif', color: '#FFFFFFCC', fontSize: '14px' }}>
                    г. Алматы
                  </div>
                  <button type="button" className="flex items-center gap-1 px-3 py-1 rounded-[16px] bg-[#E7F0EA]">
                    <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 600, fontSize: '13px', color: '#2B865A' }}>
                      170 Q
                    </span>
                  </button>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex flex-1 items-center gap-2 px-3" style={{ height: '37px', borderRadius: '10px', backgroundColor: '#F7F2EB' }}>
                  <Search width={16} height={16} style={{ color: '#989C99' }} />
                  <input type="text" placeholder="Искать товары" className="flex-1 bg-transparent outline-none placeholder:text-[#B4B7B5]" style={{ fontFamily: 'Manrope, sans-serif', fontSize: '14px', color: '#222021' }} />
                </div>
                <button onClick={handleToggleFavorite} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20">
                  <Heart width={20} height={20} style={{ color: isFavorite ? '#FE5F55' : '#FFFFFF' }} />
                </button>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white/90 rounded-2xl mt-4">
                <img src={product.image} alt={product.title} style={{ width: '80px', height: '80px', borderRadius: '16px', objectFit: 'cover' }} />
                <div className="flex-1">
                  <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: '18px', fontWeight: 700, color: '#222021', marginBottom: '4px' }}>
                    {product.title}
                  </h1>
                  <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '14px', color: '#635436' }}>
                    {product.subtitle}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 space-y-6">
              <div className="relative">
                <img src={product.image} alt={product.title} className="w-full h-48 object-contain mb-4 rounded-xl bg-white p-4 shadow-sm" />
                {product.oldPrice && (
                  <div className="absolute top-2 right-2 px-3 py-1 rounded-full bg-[#FE5F55] text-white text-xs font-semibold" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Скидка
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} width={14} height={14} className={star <= 4 ? 'text-[#FFC107] fill-current' : 'text-[#E0E0E0]'} />
                  ))}
                </div>
                <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: '12px', color: '#635436' }}>
                  4.2 (124 отзыва)
                </span>
              </div>

              {/* Цена и счетчик */}
              <div className="p-4 bg-[#FCF8F5] rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-end gap-3">
                    <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: '24px', fontWeight: 700, color: '#2B865A' }}>
                      {product.price} ₸
                    </span>
                    {product.oldPrice && (
                      <span className="line-through" style={{ fontFamily: 'Manrope, sans-serif', fontSize: '16px', color: '#B4B7B5' }}>
                        {product.oldPrice} ₸
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-[#4D7059]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    В наличии
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1 flex items-center gap-3 bg-white rounded-full px-4 py-2">
                    <button onClick={decrement} style={{ fontFamily: 'Manrope, sans-serif', fontSize: '18px', color: '#222021' }}>
                      -
                    </button>
                    <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: '16px', color: '#222021', flex: 1, textAlign: 'center' }}>
                      {count} шт
                    </span>
                    <button onClick={increment} style={{ fontFamily: 'Manrope, sans-serif', fontSize: '18px', color: '#222021' }}>
                      +
                    </button>
                  </div>
                  <button 
                    onClick={handleAddToCart}
                    className="flex-1 py-3 rounded-full bg-[#2B865A] text-white font-semibold"
                    style={{ fontFamily: 'Manrope, sans-serif', fontSize: '14px' }}
                  >
                    🛒 В корзину
                  </button>
                </div>
              </div>

              {/* Сердечко */}
              <button 
                onClick={handleToggleFavorite}
                className="w-full py-3 border-2 border-[#F0F0F0] rounded-2xl flex items-center justify-center gap-2 hover:border-[#2B865A]"
              >
                <Heart width={24} height={24} className={isFavorite ? 'text-[#FE5F55] fill-current' : 'text-[#635436]'} />
                <span style={{ fontFamily: 'Manrope, sans-serif' }}>В избранное</span>
              </button>

              {/* Преимущества */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="flex items-center gap-2 p-3 rounded-xl bg-[#E7F0EA]">
                  <Shield width={16} height={16} className="text-[#2B865A]" />
                  <span className="text-xs text-[#2B865A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Гарантия качества
                  </span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-[#E7F0EA]">
                  <Truck width={16} height={16} className="text-[#2B865A]" />
                  <span className="text-xs text-[#2B865A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Бесплатная доставка
                  </span>
                </div>
              </div>

              {/* Табы мобильные */}
              <div className="flex gap-2 border-b border-[#F0ECE6] pb-2 overflow-x-auto">
                {[
                  { key: 'instruction', label: 'Инструкция' },
                  { key: 'analogs', label: 'Аналоги' },
                  { key: 'forms', label: 'Формы' },
                  { key: 'specs', label: 'Характеристики' },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key as TabKey)}
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: '13px',
                      fontWeight: activeTab === tab.key ? 600 : 500,
                      color: activeTab === tab.key ? '#2B865A' : '#635436',
                      borderBottom: activeTab === tab.key ? '2px solid #2B865A' : '2px solid transparent',
                      paddingBottom: '4px',
                      paddingLeft: '8px',
                      paddingRight: '8px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Контент табов - упрощенный */}
              <div className="mt-3 text-sm p-3 bg-[#FCF8F5] rounded-xl" style={{ fontFamily: 'Manrope, sans-serif', color: '#222021' }}>
                {activeTab === 'instruction' && (
                  <>
                    <p className="mb-2">
                      <strong>Взрослым:</strong> обычная доза 250 мг 2 раза в день 7 дней.
                    </p>
                    <p>
                      <strong>Условия хранения:</strong> хранить в недоступном для детей месте, при комнатной температуре.
                    </p>
                  </>
                )}

                {activeTab === 'analogs' && (
                  <p>Здесь будут аналоги препарата из вашего API / моков.</p>
                )}

                {activeTab === 'forms' && (
                  <p>Форма выпуска: таблетки в плёночной оболочке.</p>
                )}

                {activeTab === 'specs' && (
                  <div className="space-y-1 text-[13px]">
                    <p>Форма выпуска: таблетки в плёночной оболочке.</p>
                    <p>Активное вещество: Кларитромицин.</p>
                    <p>Количество: 30 шт.</p>
                    <p>Дозировка: 500 мг.</p>
                  </div>
                )}
              </div>

              {/* Категории */}
              <div className="px-0 pt-4 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 style={{ fontWeight: 600, fontSize: '18px', fontFamily: 'Manrope, sans-serif', color: '#222021' }}>
                    Популярные категории
                  </h2>
                  <button type="button" style={{ fontFamily: 'Manrope, sans-serif', fontSize: '12px', color: '#2B865A' }} onClick={() => navigate('/categories')}>
                    Все ›
                  </button>
                </div>

                <div className="flex gap-3 overflow-x-auto pb-2">
                  {categories.map((cat) => (
                    <div key={cat.id} className="flex-shrink-0 w-32" style={{ border: '1px solid #F4EDE6', borderRadius: '16px', padding: '12px', backgroundColor: '#FFFDF9', boxShadow: '0px 2px 8px rgba(0,0,0,0.04)' }}>
                      <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '14px', fontWeight: 600, color: '#635436', marginBottom: '8px', height: '40px', overflow: 'hidden' }}>
                        {cat.title}
                      </p>
                      <img src={cat.image} alt={cat.title} style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Похожие товары */}
              <div className="px-0 pt-2 pb-6">
                <h2 className="mb-3" style={{ fontWeight: 600, fontSize: '18px', fontFamily: 'Manrope, sans-serif', color: '#222021' }}>
                  Популярные товары
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {relatedProducts.map((p) => (
                    <div key={p.id} onClick={() => navigate(`/product/${p.id}`)} className="cursor-pointer">
                      <ProductCard product={p} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ✅ МОБИЛЬНАЯ НАВИГАЦИЯ СО СЧЕТЧИКАМИ */}
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-around" style={{
              height: '80px',
              padding: '10px 16px 20px',
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: '24px',
              borderTopRightRadius: '24px',
              boxShadow: '0px -4px 16px rgba(0,0,0,0.06)',
            }}>
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
                      <IconComponent width={20} height={20} style={{ color: tab.active ? '#2B865A' : '#669B78' }} />
                      {tab.count > 0 && (
                        <span className="absolute -top-1 -right-1 bg-[#FE5F55] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                          {tab.count}
                        </span>
                      )}
                    </div>
                    <span style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: '10px',
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
    </div>
  );
}