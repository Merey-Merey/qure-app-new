import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { ArrowLeft, CreditCard, MapPin, ShoppingBag, Calendar, ShieldCheck, Phone } from 'iconoir-react';

interface Product {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  image: string;
  quantity?: number;
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [cart, setCart] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('1-2 дня');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem('cart');
        
        if (savedCart) {
          let parsedCart: Product[] = JSON.parse(savedCart);
          
          parsedCart = parsedCart.map(item => ({
            ...item,
            quantity: item.quantity || 1,
            image: item.image || '/assets/images/vit.png'
          }));
          
          setCart(parsedCart);
        }
      } catch (error) {
        console.error('Ошибка корзины:', error);
        setCart([]);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, []);

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const deliveryFee = totalPrice < 5000 ? 1500 : 0;
  const discount = totalPrice > 10000 ? 1000 : 0;
  const finalPrice = totalPrice + deliveryFee - discount;

  const handleOrder = async () => {
    if (!address || !phone) {
      alert('Заполните адрес доставки и телефон');
      return;
    }
    
    setIsProcessing(true);
    
    // Имитация процесса оформления заказа
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    localStorage.setItem('lastOrder', JSON.stringify({
      total: finalPrice,
      date: new Date().toLocaleString(),
      items: cart.length,
      address,
      phone
    }));

    // Очищаем корзину
    localStorage.removeItem('cart');
    
    navigate('/order-success');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F8F5F2] via-white to-[#E8F4E8] flex flex-col items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-t-[#2B865A] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        </div>
        <p className="mt-6 text-[#4D7059] text-lg font-medium">Загрузка корзины...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F5F2] via-white to-[#E8F4E8] py-8 px-4 md:py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 md:mb-12">
          <button 
            onClick={() => navigate(-1)}
            className="group flex items-center gap-3 text-[#2B865A] hover:text-[#24704A] transition-all duration-300 mb-6"
          >
            <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:-translate-x-1 transition-all">
              <ArrowLeft width={20} height={20} />
            </div>
            <span className="text-lg font-medium">Назад</span>
          </button>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-2xl md:text-2xl font-bold text-[#222021] mb-3">Оформление заказа</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-[#2B865A]/10 rounded-full">
                  <ShoppingBag width={16} height={16} className="text-[#2B865A]" />
                  <span className="text-sm font-medium text-[#2B865A]">
                    {cart.length} {cart.length === 1 ? 'товар' : cart.length < 5 ? 'товара' : 'товаров'}
                  </span>
                </div>
                {user && (
                  <div className="text-sm text-[#767B78]">
                    Для {user.email}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/80 flex items-center justify-center shadow-sm">
                <ShieldCheck width={24} height={24} className="text-[#2B865A]" />
              </div>
              <div>
                <p className="text-sm text-[#767B78]">Безопасная оплата</p>
                <p className="font-medium text-[#222021]">SSL-шифрование</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Левая колонка - Информация о заказе */}
          <div className="lg:col-span-2 space-y-8">
            {/* Контактная информация */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <h2 className="text-xl font-bold mb-6 text-[#222021] pb-4 border-b border-[#F0F0F0]">
                Контактная информация
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-lg font-semibold mb-3">
                    <Phone width={20} height={20} className="text-[#2B865A]" />
                    Номер телефона
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+7 (777) 123-45-67"
                    className="w-full p-4 border-2 border-[#F0F0F0] rounded-xl focus:border-[#2B865A] focus:outline-none bg-white/50 transition-all"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-lg font-semibold mb-3">
                    <MapPin width={20} height={20} className="text-[#2B865A]" />
                    Адрес доставки
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="ул. Абая 123, кв. 45, подъезд 3, этаж 5"
                    className="w-full p-4 border-2 border-[#F0F0F0] rounded-xl focus:border-[#2B865A] focus:outline-none bg-white/50 transition-all"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-lg font-semibold mb-3">
                    <Calendar width={20} height={20} className="text-[#2B865A]" />
                    Время доставки
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { label: 'Сегодня', value: 'сегодня', time: '2-4 часа', price: 2000 },
                      { label: 'Завтра', value: 'завтра', time: 'утро/вечер' },
                      { label: '1-2 дня', value: '1-2 дня', time: 'бесплатно' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setDeliveryTime(option.value)}
                        className={` rounded-xl border-2 transition-all ${
                          deliveryTime === option.value
                            ? 'border-[#2B865A] bg-[#2B865A]/5 shadow-sm'
                            : 'border-[#F0F0F0] hover:border-[#2B865A]/50'
                        }`}
                      >
                        <div className="font-semibold text-[#222021]">{option.label}</div>
                        <div className="text-sm text-[#767B78] mt-1">{option.time}</div>
                        {option.price && (
                          <div className="text-[#2B865A] font-medium mt-2">{option.price} ₸</div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Товары в корзине */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <h2 className="text-xl font-bold mb-6 text-[#222021] pb-4 border-b border-[#F0F0F0]">
                Товары в корзине
              </h2>
              
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#F0F7F4] to-[#E0EFBD] flex items-center justify-center">
                    <ShoppingBag width={48} height={48} className="text-[#2B865A]/50" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#222021] mb-3">Корзина пуста</h3>
                  <p className="text-lg text-[#767B78] mb-8 max-w-md mx-auto">
                    Добавьте товары из каталога, чтобы продолжить оформление заказа
                  </p>
                  <button 
                    onClick={() => navigate('/main-page')}
                    className="group inline-flex items-center gap-3 bg-[#2B865A] text-white px-8 py-4 rounded-xl hover:bg-[#24704A] hover:shadow-lg transition-all duration-300"
                  >
                    <span className="text-lg font-semibold">Перейти к покупкам</span>
                    <div className="transform group-hover:translate-x-1 transition-transform">→</div>
                  </button>
                </div>
              ) : (
                <div className="space-y-4 w-1/2">
                  {cart.map((item) => (
                    <div key={item.id} className="group flex gap-4 p-4  rounded-xl border border-[#F0F0F0] hover:border-[#2B865A]/30 hover:shadow-sm transition-all">
                      <div className="relative">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-24 h-24 rounded-xl object-cover shadow-sm"
                          onError={(e) => {
                            e.currentTarget.src = '/assets/images/vit.png';
                          }}
                        />
                        {item.quantity && item.quantity > 1 && (
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#2B865A] text-white rounded-full flex items-center justify-center text-sm font-bold">
                            ×{item.quantity}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[#222021] text-lg mb-1">{item.title}</h3>
                        <p className="text-xs text-[#767B78] mb-3">{item.subtitle}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-base font-bold text-[#2B865A]">
                            {(item.price * (item.quantity || 1)).toLocaleString()} ₸
                          </span>
                          <button 
                            onClick={() => {
                              const updatedCart = cart.filter(p => p.id !== item.id);
                              setCart(updatedCart);
                              localStorage.setItem('cart', JSON.stringify(updatedCart));
                            }}
                            className="text-xs text-[#FE5F55] hover:text-[#d94c43] transition-colors"
                          >
                            Удалить
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Правая колонка - Итог заказа */}
          <div className="space-y-8">
            {/* Способы оплаты */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <h2 className="text-xl font-bold mb-6 text-[#222021] pb-4 border-b border-[#F0F0F0]">
                Способ оплаты
              </h2>
              
              <div className="space-y-3">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    paymentMethod === 'card'
                      ? 'border-[#2B865A] bg-[#2B865A]/5'
                      : 'border-[#F0F0F0] hover:border-[#2B865A]/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      paymentMethod === 'card' ? 'bg-[#2B865A]' : 'bg-[#F0F7F4]'
                    }`}>
                      <CreditCard width={24} height={24} className={paymentMethod === 'card' ? 'text-white' : 'text-[#2B865A]'} />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-[#222021]">Картой онлайн</div>
                      <p className="text-sm text-[#767B78] mt-1">Visa, Mastercard, Kaspi</p>
                    </div>
                    {paymentMethod === 'card' && (
                      <div className="w-6 h-6 rounded-full bg-[#2B865A] flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      </div>
                    )}
                  </div>
                </button>

                <button
                  onClick={() => setPaymentMethod('cash')}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    paymentMethod === 'cash'
                      ? 'border-[#2B865A] bg-[#2B865A]/5'
                      : 'border-[#F0F0F0] hover:border-[#2B865A]/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      paymentMethod === 'cash' ? 'bg-[#2B865A]' : 'bg-[#F0F7F4]'
                    }`}>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-[#222021]">Наличными курьеру</div>
                      <p className="text-sm text-[#767B78] mt-1">При получении заказа</p>
                    </div>
                    {paymentMethod === 'cash' && (
                      <div className="w-6 h-6 rounded-full bg-[#2B865A] flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      </div>
                    )}
                  </div>
                </button>
              </div>
            </div>

            {/* Итог заказа */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 sticky top-8">
              <h2 className="text-lg font-bold mb-6 text-[#222021] pb-4 border-b border-[#F0F0F0]">
                Итог заказа
              </h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between">
                  <span className="text-[#767B78]">Товары ({cart.length})</span>
                  <span className="font-medium">{totalPrice.toLocaleString()} ₸</span>
                </div>
                
                {deliveryFee > 0 ? (
                  <div className="flex justify-between">
                    <span className="text-[#767B78]">Доставка</span>
                    <span className="font-medium">{deliveryFee.toLocaleString()} ₸</span>
                  </div>
                ) : (
                  <div className="flex justify-between text-[#2B865A]">
                    <span>Доставка</span>
                    <span className="font-medium">Бесплатно</span>
                  </div>
                )}
                
                {discount > 0 && (
                  <div className="flex justify-between text-[#FE5F55]">
                    <span>Скидка</span>
                    <span className="font-medium">-{discount.toLocaleString()} ₸</span>
                  </div>
                )}

                <div className="pt-4 border-t border-[#F0F0F0]">
                  <div className="flex justify-between text-base font-bold">
                    <span>Итого к оплате</span>
                    <span className="text-xl text-[#2B865A]">{finalPrice.toLocaleString()} ₸</span>
                  </div>
                </div>

                {totalPrice < 5000 && (
                  <div className="p-3 bg-gradient-to-r from-[#E0EFBD] to-[#D4E8C4] rounded-lg">
                    <p className="text-sm text-[#4D7059]">
                      Добавьте товаров ещё на {(5000 - totalPrice).toLocaleString()} ₸ для бесплатной доставки
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={handleOrder}
                disabled={!address || !phone || cart.length === 0 || isProcessing}
                className={`w-full py-4 rounded-xl text-base font-bold transition-all relative overflow-hidden group ${
                  !address || !phone || cart.length === 0 || isProcessing
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#2B865A] to-[#24704A] text-white hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
                }`}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Оформляем заказ...</span>
                  </div>
                ) : cart.length === 0 ? (
                  'Корзина пуста'
                ) : (
                  <>
                    <span className="relative z-10">Оплатить {finalPrice.toLocaleString()} ₸</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#24704A] to-[#1B5C3C] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </>
                )}
              </button>

              <div className="mt-6 pt-6 border-t border-[#F0F0F0]">
                <div className="flex items-start gap-3">
                  <ShieldCheck width={20} height={20} className="text-[#2B865A] flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-[#767B78]">
                      Ваши данные защищены. Мы не передаем информацию третьим лицам
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}