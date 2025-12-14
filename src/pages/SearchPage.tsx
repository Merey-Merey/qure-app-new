import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cart, Heart, Home, Search, User, ArrowLeft, X, Clock } from 'iconoir-react';
import { type Product } from '../mocks/products';
import { type Category } from '../mocks/categories';
import ProductCard from '../components/ProductCard';
import { API_URLS } from '../services/api';

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  // eslint-disable-next-line no-empty-pattern
  const [] = useState<string[]>(['аспирин', 'витамины', 'маска']);
  const [popularSearches] = useState<string[]>(['обезболивающее', 'витамин C', 'тонометр', 'антисептик']);
  const [showResults, setShowResults] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    Promise.all([
      fetch(API_URLS.categories),      
      fetch(API_URLS.products)           
    ]).then(([categoriesRes, productsRes]) => 
      Promise.all([categoriesRes.json(), productsRes.json()])
    ).then(([categoriesData, productsData]) => {
      setCategories(categoriesData);
      setProducts(productsData);
      setFilteredProducts(productsData.slice(0, 8));
      setLoading(false);
    }).catch(err => {
      console.error('Fetch error:', err);
      setLoading(false);
    });
    
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredProducts(products.slice(0, 8));
      setShowResults(false);
      return;
    }
    
    const searchTerms = searchQuery.toLowerCase().split(' ').filter(term => term.length > 0);
    
    const filtered = products.filter(product => {
      const title = product.title.toLowerCase();
      const subtitle = product.subtitle?.toLowerCase() || '';
      const description = product.description?.toLowerCase() || '';
      
      return searchTerms.some(term => 
        title.includes(term) || 
        subtitle.includes(term) || 
        description.includes(term)
      );
    });
    
    const sorted = filtered.sort((a, b) => {
      const aTitle = a.title.toLowerCase();
      const bTitle = b.title.toLowerCase();
      
      const aMatches = searchTerms.filter(term => aTitle.includes(term)).length;
      const bMatches = searchTerms.filter(term => bTitle.includes(term)).length;
      
      if (aMatches !== bMatches) {
        return bMatches - aMatches;
      }
            return (b.popularity || 0) - (a.popularity || 0);
    });
    
    setFilteredProducts(sorted);
    setShowResults(true);
    
    if (searchQuery.trim() && !searchHistory.includes(searchQuery.trim())) {
      const newHistory = [searchQuery.trim(), ...searchHistory.slice(0, 4)];
      setSearchHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    }
  }, [searchQuery, products, searchHistory]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    searchInputRef.current?.focus();
  };

  const clearSearch = () => {
    setSearchQuery('');
    setShowResults(false);
    searchInputRef.current?.focus();
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  const removeFromHistory = (index: number) => {
    const newHistory = searchHistory.filter((_, i) => i !== index);
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Загрузка...</div>;
  }

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
              Назад
            </button>

            <div className="mb-12">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-[#2B865A]/10 flex items-center justify-center">
                  <Search className="text-[#2B865A]" width={24} height={24} />
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
                    Поиск товаров
                  </h1>
                  <p
                    className="text-sm text-[#4D7059]"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    Находите нужные товары быстро и удобно
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
                Ищите лекарства, витамины, медицинские приборы и другие товары для здоровья. 
                Наш умный поиск поможет найти именно то, что вам нужно.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-white/50 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-[#2B865A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    {products.length}+
                  </div>
                  <div className="text-sm text-[#4D7059]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    товаров в каталоге
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white/50 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-[#2B865A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    {categories.length}
                  </div>
                  <div className="text-sm text-[#4D7059]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    категорий товаров
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/50 backdrop-blur-sm">
                  <div className="w-10 h-10 rounded-lg bg-[#2B865A]/10 flex items-center justify-center">
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#222021]">Умный поиск</h3>
                    <p className="text-sm text-[#4D7059]">Находит товары даже по части названия</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/50 backdrop-blur-sm">
                  <div className="w-10 h-10 rounded-lg bg-[#2B865A]/10 flex items-center justify-center">
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#222021]">Популярное</h3>
                    <p className="text-sm text-[#4D7059]">Смотрите, что ищут другие пользователи</p>
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
              <div className="relative mb-8">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Search width={20} height={20} className="text-[#989C99]" />
                </div>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Искать товары..."
                  className="w-full pl-12 pr-12 py-4 rounded-xl border-2 border-[#F0F0F0] bg-white hover:border-[#2B865A] focus:border-[#2B865A] focus:bg-white transition-colors"
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    color: '#222021',
                    fontSize: '16px'
                  }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#989C99] hover:text-[#FE5F55] transition-colors"
                  >
                    <X width={20} height={20} />
                  </button>
                )}
              </div>

              {showResults ? (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2
                      className="text-2xl xl:text-3xl font-bold"
                      style={{
                        fontFamily: 'Manrope, sans-serif',
                        color: '#222021',
                      }}
                    >
                      Результаты поиска
                      <span className="text-lg font-normal text-[#4D7059] ml-2">
                        ({filteredProducts.length} найдено)
                      </span>
                    </h2>
                    {filteredProducts.length > 0 && (
                      <button
                        onClick={() => navigate(`/search?q=${encodeURIComponent(searchQuery)}`)}
                        className="text-[#2B865A] font-semibold hover:text-[#24704A] transition-colors"
                        style={{ fontFamily: 'Manrope, sans-serif' }}
                      >
                        Показать все →
                      </button>
                    )}
                  </div>

                  {filteredProducts.length === 0 ? (
                    <div className="text-center py-16">
                      <div className="mb-6">
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
                        Ничего не найдено
                      </h3>
                      <p
                        className="text-lg text-[#4D7059] mb-8 max-w-md mx-auto"
                        style={{
                          fontFamily: 'Manrope, sans-serif',
                          lineHeight: '1.5'
                        }}
                      >
                        По запросу "{searchQuery}" ничего не найдено. Попробуйте изменить запрос или посмотрите популярные товары.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {filteredProducts.slice(0, 8).map((product) => (
                        <div
                          key={product.id}
                          onClick={() => navigate(`/product/${product.id}`)}
                          className="cursor-pointer transform hover:-translate-y-1 transition-transform duration-300"
                        >
                          <ProductCard product={product} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-8">
                  {searchHistory.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-lg" style={{ fontFamily: 'Manrope, sans-serif', color: '#222021' }}>
                          <Clock className="inline mr-2" width={16} height={16} />
                          История поиска
                        </h3>
                        <button
                          onClick={clearHistory}
                          className="text-sm text-[#4D7059] hover:text-[#2B865A] transition-colors"
                          style={{ fontFamily: 'Manrope, sans-serif' }}
                        >
                          Очистить
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {searchHistory.map((term, index) => (
                          <div key={index} className="flex items-center gap-2 group">
                            <button
                              onClick={() => handleSearch(term)}
                              className="px-4 py-2 rounded-full bg-[#F8F8F8] hover:bg-[#E7F0EA] text-[#222021] hover:text-[#2B865A] transition-colors"
                              style={{ fontFamily: 'Manrope, sans-serif' }}
                            >
                              {term}
                            </button>
                            <button
                              onClick={() => removeFromHistory(index)}
                              className="opacity-0 group-hover:opacity-100 text-[#989C99] hover:text-[#FE5F55] transition-all"
                            >
                              <X width={14} height={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="font-semibold text-lg mb-4" style={{ fontFamily: 'Manrope, sans-serif', color: '#222021' }}>
                      Популярные запросы
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {popularSearches.map((term, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearch(term)}
                          className="px-4 py-2 rounded-full bg-[#E7F0EA] hover:bg-[#2B865A] text-[#2B865A] hover:text-white transition-colors"
                          style={{ fontFamily: 'Manrope, sans-serif' }}
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold" style={{ fontFamily: 'Manrope, sans-serif', color: '#222021' }}>
                        Популярные категории
                      </h2>
                      <button
                        onClick={() => navigate('/categories')}
                        className="text-[#2B865A] font-semibold hover:text-[#24704A] transition-colors"
                        style={{ fontFamily: 'Manrope, sans-serif' }}
                      >
                        Все категории →
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categories.slice(0, 3).map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => navigate(`/categories/${cat.slug}`)}
                          className="group relative rounded-2xl bg-white border-2 border-[#F0F0F0] p-6 hover:border-[#2B865A] hover:shadow-lg transition-all duration-300"
                        >
                          <div className="aspect-square mb-4 overflow-hidden rounded-xl">
                            <img
                              src={cat.image}
                              alt={cat.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <h3
                            className="text-lg font-semibold text-center"
                            style={{
                              fontFamily: 'Manrope, sans-serif',
                              color: '#222021',
                            }}
                          >
                            {cat.title}
                          </h3>
                          <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-[#2B865A] font-bold">→</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
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
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => navigate(-1)}
                    className="flex items-center justify-center w-8 h-8"
                  >
                    <ArrowLeft width={20} height={20} style={{ color: '#FFFFFF' }} />
                  </button>
                  <div className="flex items-center gap-3">
                    <div style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: '14px',
                      color: '#FFFFFFCC',
                    }}>
                      г. Алматы
                    </div>
                    <button type="button" className="flex items-center gap-1 px-3 py-1 rounded-[16px] bg-[#E7F0EA]">
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
                </div>

                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <Search width={16} height={16} style={{ color: '#989C99' }} />
                  </div>
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Искать товары..."
                    className="w-full pl-10 pr-10 py-3 rounded-xl bg-white border-0 focus:outline-none"
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: '14px',
                      color: '#222021',
                    }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      onClick={clearSearch}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2"
                    >
                      <X width={16} height={16} style={{ color: '#989C99' }} />
                    </button>
                  )}
                </div>
              </div>

              <div className="px-4 pt-4 pb-6">
                {showResults ? (
                  <>
                    <div className="mb-4 flex items-center justify-between">
                      <h2 style={{
                        fontWeight: 600,
                        fontSize: '18px',
                        fontFamily: 'Manrope, sans-serif',
                        color: '#222021',
                      }}>
                        Найдено: {filteredProducts.length}
                      </h2>
                    </div>
                    
                    {filteredProducts.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="mb-4">
                          <svg className="w-16 h-16 mx-auto text-[#E0EFBD]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM4 10a6 6 0 1112 0 6 6 0 01-12 0z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p style={{
                          fontFamily: 'Manrope, sans-serif',
                          fontSize: '16px',
                          color: '#B4B7B5',
                          marginBottom: '8px',
                        }}>
                          Ничего не найдено
                        </p>
                        <p style={{
                          fontFamily: 'Manrope, sans-serif',
                          fontSize: '14px',
                          color: '#989C99',
                        }}>
                          По запросу "{searchQuery}"
                        </p>
                        <button
                          onClick={() => setSearchQuery('')}
                          className="mt-4 px-6 py-2 rounded-full bg-[#F8F8F8] text-[#635436] text-sm"
                          style={{ fontFamily: 'Manrope, sans-serif' }}
                        >
                          Очистить поиск
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-3">
                        {filteredProducts.map((product) => (
                          <div 
                            key={product.id} 
                            onClick={() => navigate(`/product/${product.id}`)}
                            className="cursor-pointer"
                          >
                            <ProductCard product={product} />
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {searchHistory.length > 0 && (
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-sm flex items-center gap-1" 
                            style={{ fontFamily: 'Manrope, sans-serif', color: '#222021' }}>
                            <Clock width={14} height={14} />
                            Недавний поиск
                          </h3>
                          <button
                            onClick={clearHistory}
                            className="text-xs text-[#4D7059]"
                            style={{ fontFamily: 'Manrope, sans-serif' }}
                          >
                            Очистить
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {searchHistory.map((term, index) => (
                            <div key={index} className="flex items-center gap-1 group">
                              <button
                                onClick={() => handleSearch(term)}
                                className="px-3 py-1.5 rounded-full bg-[#F8F8F8] text-[#222021] text-sm"
                                style={{ fontFamily: 'Manrope, sans-serif' }}
                              >
                                {term}
                              </button>
                              <button
                                onClick={() => removeFromHistory(index)}
                                className="opacity-0 group-hover:opacity-100"
                              >
                                <X width={12} height={12} style={{ color: '#989C99' }} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mb-6">
                      <h3 className="font-semibold text-sm flex items-center gap-1 mb-3" 
                        style={{ fontFamily: 'Manrope, sans-serif', color: '#222021' }}>
                        Популярные запросы
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {popularSearches.map((term, index) => (
                          <button
                            key={index}
                            onClick={() => handleSearch(term)}
                            className="px-3 py-1.5 rounded-full bg-[#E7F0EA] text-[#2B865A] text-sm"
                            style={{ fontFamily: 'Manrope, sans-serif' }}
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h2 style={{
                          fontWeight: 600,
                          fontSize: '18px',
                          fontFamily: 'Manrope, sans-serif',
                          color: '#222021',
                        }}>
                          Популярные категории
                        </h2>
                        <button type="button" style={{
                          fontFamily: 'Manrope, sans-serif',
                          fontSize: '12px',
                          color: '#2B865A',
                        }} onClick={() => navigate('/categories')}>
                          Все ›
                        </button>
                      </div>
                      <div className="flex gap-3 overflow-x-auto pb-2">
                        {categories.slice(0, 3).map((cat: Category) => (
                          <div
                            key={cat.id}
                            className="flex-shrink-0 cursor-pointer w-28"
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
                              fontSize: '12px',
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
                  </>
                )}
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
                { label: 'Главная\nстраница', icon: Home, path: '/main-page', active: false },
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
                      style={{ color: tab.active ? '#2B865A' : '#669B78' }}
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