import { useNavigate } from 'react-router-dom';
import { Home, Cart } from 'iconoir-react';

export default function OrderSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#E7F0EA] to-[#D4E8D0] flex items-center justify-center p-4">
      <div className="max-w-sm w-full bg-white rounded-2xl shadow-xl p-6 text-center">
        <div className="w-20 h-20 mx-auto mb-4 bg-[#2B865A]/10 rounded-xl flex items-center justify-center">
          <svg className="w-10 h-10 text-[#2B865A]" fill="none" viewBox="0 0 24 24">
            <path d="M9 12L11 14L15 10M21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12C3 7.03 7.03 3 12 3C16.97 3 21 7.03 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-[#222021] mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>
          Заказ оформлен!
        </h1>
        
        <p className="text-sm text-[#4D7059] mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
          Ваш заказ успешно принят. Номер заказа будет отправлен на email.
        </p>

        <div className="space-y-3">
          <button
            onClick={() => navigate('/main-page')}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-[#2B865A] text-white rounded-lg font-semibold hover:bg-[#24704A] transition-all duration-300 shadow-md text-sm"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            <Home width={18} height={18} />
            Продолжить покупки
          </button>
          
          <button
            onClick={() => navigate('/cart')}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 border-2 border-[#2B865A] text-[#2B865A] rounded-lg font-semibold hover:bg-[#2B865A] hover:text-white transition-all duration-300 text-sm"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            <Cart width={18} height={18} />
            Новый заказ
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 mt-6 p-3 bg-[#2B865A]/5 rounded-lg">
          <div className="w-7 h-7 rounded-md bg-[#2B865A]/20 flex items-center justify-center">
            <span className="text-[#2B865A] font-bold text-xs" style={{ fontFamily: 'Manrope, sans-serif' }}>Q</span>
          </div>
          <span className="text-xs text-[#4D7059]" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Qure • Health Assistant
          </span>
        </div>
      </div>
    </div>
  );
}